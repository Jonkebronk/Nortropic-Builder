// Kontrollskriptet: de tio N1-kontrollerna i guide/2-8-teknik-och-kvalitet.md mot sajtens lokala bygge, med tilläggen efter
// kvalitetsgranskningen 2026-10-16 (sites/<sajt>/kvalitetsgranskning-2026-10-16.jsonl, K15, K16, T1, T2, D4, T8 och J14):
// 1b astro check; 2c HTML-validering med html-validate; 3b fokus som inte skyms, med Tab genom sidorna med och utan samtyckesruta;
// 5b samtycke till bilder av personer; 8b fokusringens kontrast; 10b och 10c ett varv mot Worker-uppsättningen med wrangler dev.
// 404-sidan (/finns-inte/, status 404) prövas för konsolfel, reflow, Tab och axe, men inte för titel, sitemap eller Lighthouse.
// Därtill N2-kontrollerna ur andra varvets förslag, byggda 2026-10-16 (BESLUT.md 2026-10-16, *Kompetensinventeringen görs klar*): rapport
// om inte en norm eller två oberoende primärkällor bär regeln. Registret och grunden per kontroll: guide/bilaga-c-kontroller.md.
// Användning från repots rot: node skript/kontroll.mjs sites/<namn>. SNABB=1 hoppar över Lighthouse (kontroll 9 och 9b) och inget annat;
// SLUT=1 är slutkontrollen: Lighthouse mäter varje sida fem gånger i stället för tre (BESLUT.md 2026-10-16, frågelistan efter tredje
// varvet, punkt 46); BARA_N1=1 hoppar över N2-kontrollerna. Felbanken: node skript/kontroll.mjs --felbank [nr …] kör N2-kontrollerna mot
// skript/felbank/, där varje kontroll ska fallera på sin felsida och gå igenom på ren.html och ren-2.html. Ett felfall med stopp: true ska ge
// minst ett stoppande fynd, och ett med stopp: false bara rapporterande fynd.
// Utfall per kontroll: ok, fel eller läsning. Avslutas med kod 1 om en stoppande kontroll faller. Resultatet, med verktygens versioner,
// skrivs i sites/<sajt>/kontroller/senaste.json och sparas också som kontroller/<tid>.json, så att mätningar går att jämföra över tid.
import { spawnSync, spawn } from 'node:child_process';
import { createServer } from 'node:http';
import { createServer as tcpServer } from 'node:net';
import { gzipSync } from 'node:zlib';
import { tmpdir, loadavg, cpus } from 'node:os';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';
import { randomBytes } from 'node:crypto';
import { readFileSync, existsSync, readdirSync, statSync, writeFileSync, mkdirSync, mkdtempSync, rmSync } from 'node:fs';
import { join, extname, relative, resolve, sep, dirname } from 'node:path';
import { chromium, webkit } from 'playwright';
import AxeBuilder from '@axe-core/playwright';
import lighthouse from 'lighthouse';
import desktopConfig from 'lighthouse/core/config/desktop-config.js';
import * as chromeLauncher from 'chrome-launcher';
import { HtmlValidate, StaticConfigLoader } from 'html-validate';

const skriptKatalog = dirname(fileURLToPath(import.meta.url));
const kraver = createRequire(import.meta.url);
// Taggarna för axe. axe-core har ingen regel med taggen wcag22a (axe-core 4.14.0: axe.getRules() och doc/API.md, *Axe-core Tags*, som
// listar wcag2a, wcag2aa, wcag21a, wcag21aa och wcag22aa); den enda regeln för WCAG 2.2, target-size, har wcag22aa.
const AXE_TAGGAR = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'];
const typer = { '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript', '.png': 'image/png', '.jpg': 'image/jpeg', '.webp': 'image/webp', '.avif': 'image/avif', '.svg': 'image/svg+xml', '.woff2': 'font/woff2', '.woff': 'font/woff', '.xml': 'application/xml', '.txt': 'text/plain', '.ico': 'image/x-icon', '.webmanifest': 'application/manifest+json' };
// Lighthouse mäter varje sida tre gånger, och fem vid slutkontrollen (SLUT=1); medianen räknas (9 och 9b).
const MATVARV = process.env.SLUT ? 5 : 3, MATVARV_ORD = MATVARV === 5 ? 'fem' : 'tre';
// TBT stoppar bara när ingen annan last finns på maskinen (punkt 46): andra processer än skriptet, dess barn och dess förfäder får
// tillsammans använda högst så här många procent av en kärna i varje stickprov under mätningen (🔧 startvärde 2026-10-16: en ledig Mac
// gav cirka 30 %, och en annan session med Playwright igång 70–90 %).
const LEDIG_CPU = 50;
// Länkar som lämnar sajten för en karta, recensioner eller sociala medier: ny flik på datorn, samma flik på mobilen (kontroll 2b).
const lamnar = /google\.[a-z.]+\/maps|maps\.google\.|maps\.apple\.com|g\.page\/|goo\.gl\/maps|facebook\.com|instagram\.com|linkedin\.com|openstreetmap\.org/;
// Hjälpfunktionerna som N2-kontrollerna kör i sidan (iSidan). De skickas som text, så att de fungerar trots sidans CSP.
const SIDHJALP = [hSynlig, hNamn, hText, hDold, hRullbar, hTextnoder, hRader, hUtanfor, hHopplank, hDeladeOrd].map((f) => f.toString()).join('\n');

if (process.argv[2] === '--felbank') await felbank(process.argv.slice(3));

const sajt = process.argv[2];
if (!sajt || !existsSync(join(sajt, 'package.json'))) { console.error('Ange sajtens katalog, t.ex. sites/<sajt>, eller --felbank'); process.exit(2); }
const dist = join(sajt, 'dist');
const fakta = readFileSync(join(sajt, 'fakta.md'), 'utf8');
const res = [];
const lagg = (nr, namn, typ, ok, detalj) => res.push({ nr, namn, typ, niva: 'N1', utfall: ok === null ? 'läsning' : ok ? 'ok' : 'fel', detalj });
const verktyg = verktygsversioner(sajt);

// 1. Bygget
const bygg = spawnSync('npx', ['astro', 'build'], { cwd: sajt, encoding: 'utf8' });
lagg(1, 'astro build utan fel', 'Stopp', bygg.status === 0, bygg.status === 0 ? 'bygget gick igenom' : (bygg.stderr || bygg.stdout).slice(-400));
if (bygg.status !== 0) skrivUt();

// 1b. Typkontrollen. astro build typkontrollerar inte, så astro check körs för sig (Astro, TypeScript: astro build "will not run any
// type checking"; kvalitetsgranskningen K15). Den kräver tsconfig.json och @astrojs/check i sajten; utan dem frågar astro check om installation.
if (existsSync(join(sajt, 'tsconfig.json')) && existsSync(join(sajt, 'node_modules', '@astrojs', 'check', 'package.json'))) {
  const typ = spawnSync('npx', ['astro', 'check'], { cwd: sajt, encoding: 'utf8', timeout: 300000, env: { ...process.env, NO_COLOR: '1', FORCE_COLOR: '0', ASTRO_TELEMETRY_DISABLED: '1' } });
  const ut = `${typ.stdout}\n${typ.stderr}`.replace(/\x1b\[[0-9;]*m/g, '');
  const summa = ut.match(/(\d+) errors?\s*-\s*(\d+) warnings?\s*-\s*(\d+) hints?/);
  const felrader = ut.split('\n').filter((r) => /:\d+:\d+ - error/.test(r)).map((r) => r.trim());
  const sammanfattning = summa ? `${summa[1]} fel, ${summa[2]} varningar, ${summa[3]} tips` : '';
  lagg('1b', 'astro check utan fel', 'Stopp', typ.status === 0, typ.status === 0 ? sammanfattning || 'inga fel'
    : `${sammanfattning}${felrader.length ? ': ' + felrader.slice(0, 3).join(' | ') : ': ' + ut.replace(/\s+/g, ' ').slice(-300)}`);
} else lagg('1b', 'astro check utan fel', 'Stopp', null, 'prövas inte: sajten saknar tsconfig.json eller @astrojs/check i node_modules');

// Liten statisk server för dist, så att inget beror på Astros bakgrundsprocesser. Den komprimerar text med gzip,
// som en riktig värd gör, så att Lighthouse mäter det besökaren får.
const { server, bas } = await statiskServer(dist);

// Sidorna hämtas ur sitemap.xml; utan den blir kontroll 7 fel och alla byggda sidor prövas.
const sitemapFil = join(dist, 'sitemap.xml');
let sidor = [];
if (existsSync(sitemapFil)) sidor = [...readFileSync(sitemapFil, 'utf8').matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => new URL(m[1]).pathname);
else sidor = allaFiler(dist).filter((f) => f.endsWith('index.html')).map((f) => '/' + relative(dist, f).replace(/index\.html$/, ''));
// 404-sidan står medvetet inte i sitemap.xml, men besökaren hamnar där. Den prövas för konsolfel, reflow, Tab och axe (K16).
const fyra = '/finns-inte/';
const alla = [...sidor, fyra];

const browser = await chromium.launch();
verktyg.chromium = browser.version();
const per = {};
for (const sida of alla) {
  const url = bas + sida; const r = (per[sida] = { status: 0, konsol: [], bilder: [], axe: [], reflow: 0, titel: '', beskrivning: '', h1: 0, forstaTel: false, forstaBoka: false, text: '', citat: [], nyFlik: [], integritet: false, tillganglighet: false, orgnr: false, form: 'okand', fotText: '', fotTel: [], kakor: [], fokuserade: 0, skymda: new Set(), ringar: new Map(), ringarRaknade: new Set(), ringarBild: new Set() });
  for (const [b, h, mobil] of [[320, 700, true], [375, 812, true], [1280, 800, false]]) {
    const ctx = await browser.newContext({ viewport: { width: b, height: h }, isMobile: mobil, hasTouch: mobil, locale: 'sv-SE' });
    const page = await ctx.newPage();
    if (b === 375) {
      // På 404-sidan loggar Chrome själva sidans status 404 som konsolfel; det är det väntade svaret och räknas inte.
      page.on('console', (m) => { if (m.type() === 'error' && !(sida === fyra && m.location().url === url && /status of 404/.test(m.text()))) r.konsol.push(m.text().slice(0, 160)); });
      page.on('pageerror', (e) => r.konsol.push(String(e).slice(0, 160)));
      page.on('response', (s) => { if (s.request().resourceType() === 'image' && s.status() >= 400) r.bilder.push(`${s.status()} ${s.url()}`); });
    }
    const svar = await page.goto(url, { waitUntil: 'networkidle' });
    if (b === 375) r.status = svar?.status() ?? 0;
    await page.evaluate(() => document.fonts.ready);
    // Reflow mäts mot documentElement.clientWidth och sidbredden, inte mot innerWidth: i mobilläget växer innerWidth med innehållet
    // (321 när sidan spiller över 320) och döljer då överflödet (kvalitetsgranskningen D4).
    if (b === 320) r.reflow = await page.evaluate((b) => { const d = document.documentElement; return d.scrollWidth > Math.min(d.clientWidth, b) ? d.scrollWidth : 0; }, b);
    if (b === 375) {
      const d = await page.evaluate(() => {
        const synligOvanVikningen = (e) => { const q = e.getBoundingClientRect(), s = getComputedStyle(e); return q.width > 0 && q.height > 0 && q.top >= 0 && q.bottom <= innerHeight && s.visibility !== 'hidden' && s.display !== 'none'; };
        const trasiga = [...document.images].filter((i) => i.complete && i.naturalWidth === 0).map((i) => i.currentSrc || i.src);
        return {
          titel: document.title, beskrivning: document.querySelector('meta[name="description"]')?.content || '', h1: document.querySelectorAll('h1').length,
          forstaTel: [...document.querySelectorAll('a[href^="tel:"]')].some(synligOvanVikningen),
          forstaBoka: [...document.querySelectorAll('a')].some((a) => /boka/i.test(a.textContent) && synligOvanVikningen(a)),
          integritet: !!document.querySelector('footer a[href*="/integritet"]'), tillganglighet: !!document.querySelector('footer a[href*="/tillganglighet"]'),
          orgnr: /Organisationsnummer\D{0,3}\d{6}-?\d{4}/.test(document.querySelector('footer')?.innerText || ''), form: document.querySelector('footer')?.dataset.foretagsform || 'okand',
          fotText: document.querySelector('footer')?.innerText || '', fotTel: [...(document.querySelector('footer')?.querySelectorAll('a[href^="tel:"]') || [])].map((a) => a.getAttribute('href')),
          text: document.body.innerText, citat: [...document.querySelectorAll('blockquote')].map((q) => q.innerText.trim()), trasiga,
        };
      });
      Object.assign(r, d); r.bilder.push(...d.trasiga);
      r.kakor = (await ctx.cookies()).map((c) => c.name);
    }
    if (b !== 320) {
      const nyFlik = !mobil;
      const fel = await page.evaluate(([m, ny]) => [...document.querySelectorAll('a[href]')].filter((a) => new RegExp(m).test(a.href) && (a.target === '_blank') !== ny).map((a) => a.href), [lamnar.source, nyFlik]);
      r.nyFlik.push(...fel.map((h) => `${b}px öppnas i ${nyFlik ? 'samma' : 'ny'} flik: ${h.slice(0, 70)}`));
    }
    if (b !== 320) {
      const axe = await new AxeBuilder({ page }).withTags(AXE_TAGGAR).analyze();
      for (const v of axe.violations) r.axe.push(`${b}px ${v.id}: ${v.nodes.length} st`);
    }
    // 3b och 8b. Tab genom sidan med rutan öppen, som vid första besöket, och med ett sparat nej (rutans version ur data-version och
    // tiden nu, så att valet gäller), där rutan är stängd. Utan ruta tabbas sidan också bakåt från slutet, eftersom ett klibbigt
    // sidhuvud skymmer det som rullas in uppifrån. Varven går samtidigt i egna fönster med prefers-reduced-motion: reduce, så att
    // rullningen är klar direkt; sajten kan ha scroll-behavior: smooth, och samtyckesrutan rullar själv fram det som hamnar bakom den.
    if (b !== 320) {
      const ruta = await page.evaluate(() => { const e = document.querySelector('[data-samtycke-ruta]'); return e ? { version: Number(e.dataset.version || 1), kategorier: [...e.querySelectorAll('input[name]')].map((i) => i.name), synlig: !!e.checkVisibility?.() } : null; });
      const varv = async (medRuta, tangent) => {
        const ctx2 = await browser.newContext({ viewport: { width: b, height: h }, isMobile: mobil, hasTouch: mobil, locale: 'sv-SE', reducedMotion: 'reduce' });
        if (ruta && !medRuta) await ctx2.addInitScript(({ version, kategorier }) => {
          try { localStorage.setItem('samtycke', JSON.stringify({ ...Object.fromEntries(kategorier.map((k) => [k, false])), version, tid: new Date().toISOString() })); } catch { /* ram utan lagring */ }
        }, ruta);
        const p2 = await ctx2.newPage();
        await p2.goto(url, { waitUntil: 'networkidle' });
        await p2.evaluate(() => document.fonts.ready);
        const synlig = !!ruta && (await p2.locator('[data-samtycke-ruta]').isVisible());
        if (synlig !== medRuta) r.skymda.add(`${b}px: samtyckesrutan ${medRuta ? 'visas inte vid första besöket' : 'visas trots ett sparat nej'}, så varvet ${medRuta ? 'med' : 'utan'} ruta gick inte att göra`);
        else await tabba(p2, r, `${b}px${medRuta ? ' med ruta' : ''}`, tangent);
        await ctx2.close();
      };
      await Promise.all([ruta?.synlig && varv(true, 'Tab'), varv(false, 'Tab'), varv(false, 'Shift+Tab')]);
    }
    await ctx.close();
  }
}
await browser.close();

// 2. Konsolfel och bilder. Varje sida ska svara 200, och 404-sidan 404.
const k2 = alla.flatMap((s) => [...(per[s].status !== (s === fyra ? 404 : 200) ? [`${s} svarar ${per[s].status}`] : []), ...per[s].konsol.map((x) => `${s} konsol: ${x}`), ...per[s].bilder.map((x) => `${s} bild: ${x}`)]);
lagg(2, 'Inga konsolfel; alla bilder laddas', 'Rapport', k2.length === 0, k2.length ? k2.slice(0, 6).join(' | ') : `${alla.length} sidor med 404-sidan utan fel`);
const k2b = sidor.flatMap((s) => per[s].nyFlik.map((x) => `${s} ${x}`));
lagg('2b', 'Kartor, recensioner och sociala medier: ny flik på datorn, samma flik på mobilen', 'Rapport', k2b.length === 0, k2b.length ? k2b.slice(0, 6).join(' | ') : `${sidor.length} sidor i 375 och 1280 px`);
// 2c. HTML-validering av alla byggda sidor med html-validate och förinställningen recommended (kvalitetsgranskningen K16). Fel per regel.
// Klassen telefon i biblioteket sätter white-space: nowrap på tel:-länkar, vilket är det tel-non-breaking vill uppnå; regeln ser bara inline-stil.
const hv = new HtmlValidate(new StaticConfigLoader({ extends: ['html-validate:recommended'], rules: { 'tel-non-breaking': ['error', { ignoreClasses: ['telefon'] }] } }));
const htmlFiler = allaFiler(dist).filter((f) => f.endsWith('.html'));
// Godtaget: role="list" på listor utan punkter, eftersom VoiceOver i Safari annars läser dem som vanlig text (WebKit, bugg 170179;
// kvalitetsgranskningen T13). html-validate kallar det redundant eller föreslår <ul> för en <ol>. De räknas för sig.
const godtaget = (m) => (m.ruleId === 'no-redundant-role' && /role "list"/.test(m.message)) || (m.ruleId === 'prefer-native-element' && /<ul>/.test(m.message));
const perRegel = {}, hvSidor = new Set(); let hvFel = 0, hvGodtaget = 0;
for (const f of htmlFiler) for (const m of (await hv.validateFile(f)).results.flatMap((x) => x.messages)) if (m.severity === 2) { if (godtaget(m)) { hvGodtaget++; continue; } perRegel[m.ruleId] = (perRegel[m.ruleId] || 0) + 1; hvFel++; hvSidor.add(relative(dist, f)); }
lagg('2c', 'HTML-validering med html-validate (recommended)', 'Rapport', hvFel === 0, hvFel ? `${hvFel} fel på ${hvSidor.size} av ${htmlFiler.length} sidor: ${Object.entries(perRegel).sort((a, b) => b[1] - a[1]).map(([k, n]) => `${k} ${n}`).join(', ')}` : `${htmlFiler.length} sidor utan fel${hvGodtaget ? ` (${hvGodtaget} godtagna role="list")` : ''}`);

// 3. Reflow i 320 px
const k3 = alla.filter((s) => per[s].reflow);
lagg(3, 'Ingen horisontell scroll i 320 px', 'Stopp', k3.length === 0, k3.length ? `scrollar i sidled: ${k3.map((s) => `${s} (${per[s].reflow} px)`).join(', ')}` : `${alla.length} sidor med 404-sidan`);
// 3b. Fokus skyms inte helt av sidans eget innehåll, t.ex. ett fast sidhuvud, en knapplist eller samtyckesrutan (WCAG 2.2, 2.4.11 Focus Not
// Obscured (Minimum), AA; Understanding 2.4.11: "A notification implemented as sticky content, such as a cookie banner, will fail";
// kvalitetsgranskningen T1). Skymt betyder att ingen av nio punkter över elementet träffar det med elementFromPoint.
const k3b = alla.flatMap((s) => [...per[s].skymda].sort().map((x) => `${s} ${x}`));
const fokuserade = alla.reduce((n, s) => n + per[s].fokuserade, 0);
lagg('3b', 'Fokus skyms inte (WCAG 2.4.11), Tab i 375 och 1280 px med och utan samtyckesruta', 'Stopp', k3b.length === 0, k3b.length ? `${k3b.length} helt skymda: ${k3b.slice(0, 8).join(' | ')}${k3b.length > 8 ? ' | …' : ''}` : `${fokuserade} fokuseringar på ${alla.length} sidor, inga skymda`);

// 4. Den primära handlingen hela vägen
const telFakta = (fakta.match(/\|\s*Telefon\s*\|\s*([0-9 -]+)\|/) || [])[1]?.replace(/\D/g, '');
const startHtml = existsSync(join(dist, 'index.html')) ? readFileSync(join(dist, 'index.html'), 'utf8') : '';
const telLankar = [...startHtml.matchAll(/href="tel:([^"]+)"/g)].map((m) => m[1].replace(/\D/g, '').replace(/^46/, '0'));
const bokaLank = (startHtml.match(/href="(https?:\/\/[^"]*onlinebooking[^"]*)"/) || [])[1];
let bokaSvar = 'ingen bokningslänk på startsidan';
if (bokaLank) { try { const s = await fetch(bokaLank, { redirect: 'follow' }); bokaSvar = `${s.status} ${bokaLank}`; } catch (e) { bokaSvar = `fel: ${e.message}`; } }
const telOk = !!telFakta && telLankar.length > 0 && telLankar.every((t) => t === telFakta);
const bokaOk = /^2\d\d /.test(bokaSvar);
lagg(4, 'Den primära handlingen fungerar hela vägen', 'Stopp', telOk && bokaOk, `tel: ${telLankar.length} länkar ${telOk ? 'med numret ur fakta.md' : `som inte stämmer med fakta.md (${telFakta})`}; bokning: ${bokaSvar}`);
const syn = sidor.filter((s) => !(per[s].forstaTel && per[s].forstaBoka));
lagg('4b', 'Kontaktvägen och tel:-länken på mobilens första skärm (375 px)', 'Rapport', syn.length === 0, syn.length ? `saknas ovan vikningen: ${syn.join(', ')}` : 'boka och ring syns utan scroll på alla sidor');

// 5. Faktapåståenden mot fakta.md: en läsning. Skriptet listar siffror och citat som inte finns i fakta.md, som stöd.
const norm = (t) => t.toLowerCase().replace(/\s+/g, ' ');
const faktaSiffror = new Set((fakta.match(/\d+(?:[.,:]\d+)*/g) || []).map((x) => x.replace(/[.:]/g, ',')));
const saknade = new Set();
for (const s of sidor) for (const t of per[s].text.match(/\d+(?:[.,:]\d+)*/g) || []) { const n = t.replace(/[.:]/g, ','); if (!faktaSiffror.has(n)) saknade.add(n); }
const saknadeCitat = sidor.flatMap((s) => per[s].citat).map((c) => c.replace(/^[”"“]|[”"“]$/g, '')).filter((c) => !norm(fakta).includes(norm(c)));
lagg(5, 'Varje faktapåstående finns i fakta.md', 'Stopp, läsning', null, `stöd: siffror som saknas i fakta.md: ${saknade.size ? [...saknade].join(', ') : 'inga'}; citat som saknas: ${saknadeCitat.length ? saknadeCitat.join(' | ') : 'inga'}`);
// 5b. Bilder av personer kräver samtycke, och samtycket står i fakta.md (lag (1978:800) om namn och bild i reklam, 1 §; BESLUT.md 2026-10-16;
// kvalitetsgranskningen J14). En rad som börjar med "| Samtycke" och säger okänt stoppar publiceringen.
const samtyckesrader = fakta.split('\n').map((rad, i) => ({ rad: rad.trim(), nr: i + 1 })).filter((x) => /^\|\s*Samtycke/i.test(x.rad));
const k5b = samtyckesrader.filter((x) => /okänt/i.test(x.rad));
lagg('5b', 'Bilder av personer har samtycke i fakta.md', 'Stopp', k5b.length === 0, k5b.length ? k5b.map((x) => `fakta.md rad ${x.nr}: ${x.rad.slice(0, 110)}`).join(' | ') : `${samtyckesrader.length} ${samtyckesrader.length === 1 ? 'rad' : 'rader'} om samtycke, inget okänt`);

// 6. Platshållare
const platshallare = [];
for (const f of allaFiler(dist).filter((f) => f.endsWith('.html'))) {
  const t = readFileSync(f, 'utf8').replace(/till exempel|t\.ex\./gi, '');
  for (const m of t.matchAll(/\[\[PLATSHÅLLARE[^\]]*\]\]|lorem ipsum|placeholder|platshållare|\bexempel\w*/gi)) platshallare.push(`${relative(dist, f)}: ${m[0]}`);
}
lagg(6, 'Inga platshållare i bygget', 'Stopp', platshallare.length === 0, platshallare.length ? platshallare.slice(0, 6).join(' | ') : 'noll träffar');
// 6b. Sidfoten (BESLUT.md 2026-10-16): länk till Integritet och kakor, och organisationsnumret när företaget är ett bolag.
// En enskild firmas organisationsnummer är ägarens personnummer och visas inte.
const k6b = [];
for (const [falt, namn] of [['integritet', 'länk till integritetssidan']]) {
  const utan = sidor.filter((s) => !per[s][falt]); if (utan.length) k6b.push(`${namn} saknas på ${utan.length === sidor.length ? 'alla sidor' : utan.join(', ')}`);
}
const form = per[sidor[0]]?.form;
if (form === 'okand') k6b.push('företagsformen är okänd, så det går inte att avgöra om organisationsnumret ska visas');
else if (form === 'bolag' && sidor.some((s) => !per[s].orgnr)) k6b.push('organisationsnumret saknas, och företaget är ett bolag');
// Telefonen och adressen ur fakta.md står i sidfoten på varje sida (guide 2-3, N1: telefon, adress och mejl på varje sida; frågelistan
// efter tredje varvet, punkt 49). Telefonen jämförs som siffror (0 eller +46), adressen som gatan före första kommatecknet.
const pa = (sidlista) => (sidlista.length === sidor.length ? 'alla sidor' : sidlista.join(', '));
if (telFakta) { const utan = sidor.filter((s) => !sidfotHarTelefon(per[s].fotText, per[s].fotTel, telFakta)); if (utan.length) k6b.push(`telefonen ur fakta.md saknas i sidfoten på ${pa(utan)}`); }
for (const gata of faktaGator(fakta)) { const utan = sidor.filter((s) => !normText(per[s].fotText).includes(normText(gata))); if (utan.length) k6b.push(`adressen ”${gata}” saknas i sidfoten på ${pa(utan)}`); }
lagg('6b', 'Integritetspolicy, organisationsnummer, telefon och adress i sidfoten', 'Rapport', k6b.length === 0, k6b.length ? k6b.join('; ') : `${sidor.length} sidor, med telefon${faktaGator(fakta).length ? ' och adress' : ''} ur fakta.md`);

// 6c. Kakor och samtycke (9 kap. 28 § LEK; PTS; BESLUT.md 2026-10-16). Inga kakor sätts vid ett besök utan svar, på någon sida.
// Har sajten en samtyckesruta prövas den på startsidan: inget körs före svaret, Godkänn och Neka ser likadana ut, ett nej håller
// efter omladdning, Kakinställningar öppnar valen igen och ett ja aktiverar skripten. Har rutan en logg tar den emot ett ja men
// inte ett nej (GDPR art. 5.1 c och 7.1; kvalitetsgranskningen J3: id och logg bara när något är ja eller ett ja återkallas).
// Efter ett svar visar rutan en bekräftelse, så rutans synlighet prövas först efter omladdning.
const k6c = [];
const medKakor = sidor.filter((s) => per[s].kakor.length);
if (medKakor.length) k6c.push(`kakor utan svar på ${medKakor.map((s) => `${s} (${per[s].kakor.join(', ')})`).join(', ')}`);
let harRuta = false;
{
  const b6 = await chromium.launch();
  const ctx = await b6.newContext({ viewport: { width: 375, height: 812 }, isMobile: true, hasTouch: true, locale: 'sv-SE' });
  const p = await ctx.newPage();
  await p.goto(bas + '/', { waitUntil: 'networkidle' });
  const korda = () => p.evaluate(() => Object.keys(document.documentElement.dataset).filter((k) => /^(samtycke|provtagg)[A-Z]/.test(k)));
  const kakor = async () => (await ctx.cookies()).map((c) => c.name);
  harRuta = (await p.locator('[data-samtycke-ruta]').count()) > 0;
  const vilande = await p.locator('script[type="text/plain"][data-samtycke]').count();
  if (!harRuta && vilande) k6c.push('skript som kräver samtycke finns, men ingen samtyckesruta');
  if (harRuta) {
    const ruta = p.locator('[data-samtycke-ruta]');
    const google = (await ruta.getAttribute('data-google')) === 'ja', logg = await ruta.getAttribute('data-logg');
    const signaler = () => p.evaluate(() => (window.dataLayer || []).filter((a) => a[0] === 'consent').map((a) => `${a[1]}:${a[2].analytics_storage}/${a[2].ad_storage}`));
    const poster = []; p.on('request', (r) => { if (logg && new URL(r.url()).pathname === logg && r.method() === 'POST') poster.push(r.postData()); });
    if (google && !(await signaler()).includes('default:denied/denied')) k6c.push('Consent Mode: inget förval med nekat före svaret');
    if (!(await ruta.isVisible())) k6c.push('rutan visas inte vid första besöket');
    if ((await korda()).length) k6c.push('skript körda före svaret');
    const utseende = (v) => p.locator(`[data-samtycke-svar="${v}"]`).evaluate((e) => {
      const s = getComputedStyle(e), r = e.getBoundingClientRect();
      return [Math.round(r.width), Math.round(r.height), s.backgroundColor, s.color, s.borderColor, s.fontSize, s.fontWeight].join(' ');
    });
    const [ja, nej] = [await utseende('ja'), await utseende('nej')];
    if (ja !== nej) k6c.push(`Godkänn och Neka ser olika ut (${ja} mot ${nej})`);
    await p.locator('[data-samtycke-svar="nej"]').click(); await p.waitForTimeout(300);
    const nejPoster = poster.length; let jaPoster = null;
    if (logg && nejPoster) k6c.push(`ett nej loggades (${nejPoster} anrop)`);
    await p.reload({ waitUntil: 'networkidle' });
    if (await p.locator('[data-samtycke-ruta]').isVisible()) k6c.push('rutan visas igen efter nej');
    if ((await korda()).length) k6c.push('skript körda efter nej');
    if ((await kakor()).length) k6c.push(`kakor efter nej: ${(await kakor()).join(', ')}`);
    const installningar = p.locator('[data-samtycke-installningar]');
    if (!(await installningar.count())) k6c.push('knappen för cookieinställningar saknas');
    else {
      await installningar.first().click();
      if (!(await p.locator('[data-samtycke-ruta]').isVisible())) k6c.push('knappen för cookieinställningar öppnar inte rutan');
      else {
        await p.locator('[data-samtycke-svar="ja"]').click(); await p.waitForTimeout(300);
        jaPoster = poster.length - nejPoster;
        if (!(await korda()).length) k6c.push('skripten körs inte efter ja');
        if (google && !(await signaler()).includes('update:granted/granted')) k6c.push('Consent Mode: ingen uppdatering efter ja');
      }
    }
    if (logg && jaPoster !== null && jaPoster !== 1) k6c.push(`loggen fick ${jaPoster} anrop för ett ja, väntat 1`);
    await p.goto(bas + '/integritet/', { waitUntil: 'networkidle' });
    if (vilande && !(await p.locator('.kaklista').count())) k6c.push('kaklistan saknas på integritetssidan');
  }
  await b6.close();
}
lagg('6c', 'Inga kakor utan samtycke' + (harRuta ? '; samtyckesrutan följer PTS' : ''), 'Stopp', k6c.length === 0, k6c.length ? k6c.join('; ') : harRuta ? `inga kakor på ${sidor.length} sidor; inget före svaret, lika knappar, nej håller och loggas inte, ja aktiverar och loggas, Consent Mode och kaklistan` : `inga kakor på ${sidor.length} sidor`);

// 7. Titel, beskrivning, sitemap och h1
const titlar = sidor.map((s) => per[s].titel), besk = sidor.map((s) => per[s].beskrivning);
const unika = (a) => a.every((x) => x) && new Set(a).size === a.length;
const k7 = [];
if (!existsSync(sitemapFil)) k7.push('sitemap.xml saknas');
if (!unika(titlar)) k7.push('titlar saknas eller är dubbletter');
if (!unika(besk)) k7.push('metabeskrivningar saknas eller är dubbletter');
lagg(7, 'Unik titel och beskrivning per sida; sitemap.xml finns', 'Stopp', k7.length === 0, k7.length ? k7.join('; ') : `${sidor.length} sidor, sitemap.xml finns`);
const h1fel = sidor.filter((s) => per[s].h1 !== 1);
lagg('7b', 'En h1 per sida', 'Rapport', h1fel.length === 0, h1fel.length ? h1fel.map((s) => `${s}: ${per[s].h1}`).join(', ') : 'en h1 på varje sida');
// 7c. robots.txt stänger inte ute sökrobotarna (BESLUT.md 2026-10-16). Gruppen för roboten gäller, annars gruppen för *.
// Applebot följer Googlebots regler när den saknar en egen grupp (Apple, support.apple.com/en-us/119829). Claude-SearchBot är sökningen i
// Claude (Anthropic, support.claude.com, artikel 8896518; frågelistan efter tredje varvet, punkt 11).
const robotsFil = join(dist, 'robots.txt');
const sokrobotar = ['Googlebot', 'Bingbot', 'OAI-SearchBot', 'PerplexityBot', 'Claude-SearchBot', 'Applebot', 'Google-Extended'];
const k7c = existsSync(robotsFil) ? utestangda(readFileSync(robotsFil, 'utf8'), sokrobotar) : ['robots.txt saknas'];
lagg('7c', 'robots.txt släpper in sökrobotarna', 'Rapport', k7c.length === 0, k7c.length ? `stängs ute: ${k7c.join(', ')}` : `${sokrobotar.join(', ')} släpps in`);

// 8. axe
const k8 = alla.flatMap((s) => per[s].axe.map((v) => `${s} ${v}`));
lagg(8, 'axe WCAG 2.2 A/AA: 0 fel', 'Stopp', k8.length === 0, k8.length ? k8.slice(0, 8).join(' | ') : `0 fel på ${alla.length} sidor med 404-sidan i 375 och 1280 px`);
// 8b. Fokusringen har kontrast 3:1 mot bakgrunden intill (WCAG 2.2, 1.4.11 Non-text Contrast; Understanding 1.4.11: fokusindikatorn
// mot "the adjacent background"; guide 2-8, Kodstandard; kvalitetsgranskningen T2). Ringen är outline, annars box-shadow. Bakgrunden
// är närmaste förfaders färg (elementets egen vid negativ outline-offset eller inset-skugga). Webbläsarens egen ring är undantagen,
// och bilder bakom räknas inte.
const k8b = alla.flatMap((s) => [...per[s].ringar.values()].sort().map((x) => `${s} ${x}`));
const ringarRaknade = alla.reduce((n, s) => n + per[s].ringarRaknade.size, 0), ringarBild = alla.reduce((n, s) => n + per[s].ringarBild.size, 0);
lagg('8b', 'Fokusringen har kontrast 3:1 mot bakgrunden (WCAG 1.4.11)', 'Rapport', k8b.length === 0, `${k8b.length ? `${k8b.length} under 3:1 eller utan ring: ${k8b.slice(0, 8).join(' | ')}${k8b.length > 8 ? ' | …' : ''}` : `${ringarRaknade} fokuserade element i 375 och 1280 px når 3:1`}${ringarBild ? `; ${ringarBild} med bild bakom räknades inte` : ''}`);

// N2-kontrollerna (registret: guide/bilaga-c-kontroller.md). De som går mot Worker-uppsättningen körs i varvet med wrangler dev nedan,
// och 9b körs med Lighthouse.
const miljo = { bas, rot: dist, sajt, sidor, alla, fakta, start: '/', sitemap: sitemapFil, robots: robotsFil, headersFil: join(dist, '_headers'),
  sidkarta: existsSync(join(sajt, 'sidkarta.md')) ? lasSidkarta(readFileSync(join(sajt, 'sidkarta.md'), 'utf8')) : null,
  kallor: allaFiler(join(sajt, 'src')).filter((f) => /\.(astro|[cm]?[jt]sx?|svelte|vue)$/.test(f)), kallrot: sajt };
if (!process.env.BARA_N1) await korNya(miljo);

// SNABB=1 hoppar över Lighthouse vid snabba prov under arbetet; den riktiga körningen görs utan.
if (process.env.SNABB) { lagg(9, 'Lighthouse', 'Rapport', null, 'hoppades över (SNABB=1)'); }
else {
// 9. Lighthouse: 100 i alla fyra kategorier, i mobil och dator (Johnny 2026-10-16). En första körning värmer upp Chrome och
// räknas inte, eftersom den första sidan efter start kan få lägre prestanda. Varje sida mäts sedan tre gånger, och fem med SLUT=1,
// och medianen räknas, eftersom en enskild körning varierar (Lighthouse, docs/variability.md: medianen av fem är dubbelt så stabil som en).
// 404-sidan mäts inte: Lighthouse underkänner SEO för en sida med status 404. Maskinens last skrivs med, eftersom prestandan
// varierar med den (variability.md); är lasten högre än antalet kärnor är prestandan osäker (förslaget 9c). Andra processers
// CPU under mätningen avgör om TBT får stoppa (9b).
const lh = await lighthouseMat(bas, sidor);
const last = loadavg()[0], karnor = cpus().length;
const lastText = `; lasten ${last.toFixed(1)} av ${karnor} kärnor${last > karnor ? ', så prestandan är osäker' : ''}; TBT på en tom sida ${Math.round(lh.brus)} ms; ${annanLastText(lh)}`;
const k9 = lh.filter((x) => x.prestanda < 100 || x.tillganglighet < 100 || x.praxis < 100 || x.seo < 100);
lagg(9, `Lighthouse 100 i prestanda, tillgänglighet, praxis och SEO (median av ${MATVARV_ORD})`, 'Rapport', k9.length === 0, (k9.length ? 'under 100: ' + k9.map((x) => `${x.sida} ${x.namn} (${x.prestanda}/${x.tillganglighet}/${x.praxis}/${x.seo})`).join(', ') : `${lh.length} mätningar, alla 100`) + lastText);
if (!process.env.BARA_N1) laggNy('9b', lighthouseFynd(lh), { okText: `${lh.length} mätningar inom LCP 2 500 ms, CLS 0,1 och TBT 200 ms${lastText}`, antalSidor: sidor.length });
}

// 10. Hemligheter i repot och i bygget
const monster = [/AKIA[0-9A-Z]{16}/, /sk-(?:ant-|live_|proj-)?[A-Za-z0-9_-]{20,}/, /gh[pousr]_[A-Za-z0-9]{30,}/, /AIza[0-9A-Za-z_-]{35}/, /AQ\.[A-Za-z0-9_-]{30,}/, /xox[baprs]-[A-Za-z0-9-]{10,}/, /-----BEGIN [A-Z ]*PRIVATE KEY-----/, /(?:api[_-]?key|secret|token)["'\s]*[:=]\s*["'][A-Za-z0-9_\-]{16,}["']/i];
const repoFiler = spawnSync('git', ['ls-files'], { cwd: sajt, encoding: 'utf8' }).stdout.split('\n').filter(Boolean).map((f) => join(sajt, f));
const k10 = [];
for (const f of [...repoFiler, ...allaFiler(dist).filter((f) => /\.(html|js|map|css|xml|txt|json)$/.test(f))]) {
  if (!existsSync(f) || statSync(f).size > 5e6 || /\.(png|jpe?g|webp|avif|woff2?)$/.test(f)) continue;
  const t = readFileSync(f, 'utf8'); for (const m of monster) if (m.test(t)) k10.push(`${relative(sajt, f)} (${m.source.slice(0, 14)}…)`);
}
lagg(10, 'Inga hemligheter i repot eller i bygget', 'Stopp', k10.length === 0, k10.length ? k10.slice(0, 6).join(', ') : `${repoFiler.length} filer i repot och bygget genomsökta`);

// 10b och 10c. Ett varv mot Worker-uppsättningen med wrangler dev, så som sajten körs när den publiceras (kvalitetsgranskningen K16).
// Den lilla servern ovan visar 404.html och sätter inga huvuden, så den kan inte visa hur Workern svarar.
// 10b (stopp): en okänd adress ger status 404 med den designade sidan, inte en tom kropp (guide 2-3 och 2-4; fallgrop 178).
// 10c (rapport): säkerhetshuvudena (guide 2-8, Publicering; Cloudflare, Headers för Workers static assets), Cache-Control med
// immutable på /_astro/, där filnamnen har innehållets hash, och 301 för omdirigeringarna i public/_redirects (guide 2-8, Vid ombyggnad;
// Cloudflare, Redirects: utan angiven status blir det 302). N2-kontrollerna 10c+ (CORP) och 10f (Fetch Metadata) körs i samma varv.
if (!existsSync(join(sajt, 'wrangler.jsonc'))) lagg('10b', 'Worker-uppsättningen: okänd adress ger 404 med den designade sidan', 'Stopp', null, 'prövas inte: sajten saknar wrangler.jsonc, så varvet med wrangler dev (10b och 10c) görs inte');
else await workerVarv();

server.close();
skrivUt();

// Tab genom sidan med tangenten (Tab eller Shift+Tab) tills fokus lämnar sidan eller kommer tillbaka. Varje fokuserat element mäts av
// matFokus i sidan. En iframe är det fokuserade elementet så länge fokus är inne i den, och räknas en gång. Shift+Tab börjar längst ned,
// som efter ett varv framåt; i en riktig webbläsare går Shift+Tab högst upp till adressfältet.
async function tabba(page, r, lage, tangent) {
  await page.evaluate((ned) => { document.activeElement?.blur?.(); window.__kontroll = undefined; scrollTo({ top: ned ? document.documentElement.scrollHeight : 0, left: 0, behavior: 'instant' }); }, tangent !== 'Tab');
  for (let i = 0, igen = 0; i < 400; i++) {
    await page.keyboard.press(tangent);
    const m = await page.evaluate(matFokus);
    if (m.slut || m.runt || (m.igen && ++igen > 50)) break;
    if (m.igen) continue;
    igen = 0; r.fokuserade++;
    if (m.skymd) r.skymda.add(`${lage}${tangent === 'Tab' ? '' : ' bakåt'}: ${m.namn} ${m.skymd === 'utanför' ? 'ligger utanför skärmen' : `skyms av ${m.skymd}`}`);
    const nyckel = `${lage.split(' ')[0]} ${m.namn}`;
    if (m.ring?.bild) r.ringarBild.add(nyckel);
    else if (m.ring?.saknas) r.ringar.set(nyckel, `${nyckel}: ingen outline eller skugga vid fokus`);
    else if (m.ring?.kvot !== undefined) {
      // Samma namn kan finnas på två ställen med olika bakgrund, t.ex. i texten och i sidfoten; båda räknas.
      const n = `${nyckel} ${m.ring.bakgrund}`; r.ringarRaknade.add(n);
      if (m.ring.kvot < 3) r.ringar.set(n, `${nyckel}: ${String(m.ring.kvot).replace('.', ',')}:1 (${m.ring.farg} mot ${m.ring.bakgrund})`);
    }
  }
}

// Körs i sidan efter varje tangenttryck. Väntar tills scrollningen har stannat (samma läge i fyra bildrutor i rad, högst 2 s), eftersom
// sajten kan ha scroll-behavior: smooth, och mäter sedan det fokuserade elementet: om det är helt skymt (3b) och fokusringens kontrast (8b).
function matFokus() {
  const k = (window.__kontroll ??= { sett: new WeakSet(), forra: null });
  const e = document.activeElement;
  if (!e || e === document.body || e === document.documentElement) return { slut: true };
  if (e === k.forra) return { igen: true };
  if (k.sett.has(e)) return { runt: true };
  k.sett.add(e); k.forra = e;
  const namn = (x, medText) => {
    const t = medText ? (x.getAttribute('aria-label') || x.textContent || x.getAttribute('title') || '').replace(/\s+/g, ' ').trim().slice(0, 40) : '';
    return `${x.tagName.toLowerCase()}${x.id ? '#' + x.id : x.classList[0] ? '.' + x.classList[0] : ''}${t ? ` ”${t}”` : ''}`;
  };
  return new Promise((klar) => {
    let forra = '', lika = 0; const start = performance.now();
    const steg = () => {
      const q = e.getBoundingClientRect(), lage = `${scrollX},${scrollY},${visualViewport?.offsetTop},${q.top},${q.left}`;
      lika = lage === forra ? lika + 1 : 0; forra = lage;
      if (lika < 4 && performance.now() - start < 2000) return requestAnimationFrame(steg);
      klar({ namn: namn(e, true), skymd: skymd(), ring: ring() });
    };
    requestAnimationFrame(steg);
  });

  // 5 × 5 punkter över den del av elementet som ligger i den synliga vyn (visualViewport; i mobilläget kan layoutvyn vara större när
  // sidan spiller över), med kanterna en pixel in, så att en synlig remsa räknas: 2.4.11 fäller bara det som är helt skymt.
  // En punkt räknas som synlig när den träffar elementet, något i det, en förfader (ett mellanrum i elementet) eller dess etikett.
  // Ett visuellt dolt fält utan etikett mäts inte.
  function skymd() {
    const egna = [e, ...(e.labels || [])];
    let q = e.getBoundingClientRect();
    if (q.width * q.height < 4) { if (!e.labels?.length) return ''; q = e.labels[0].getBoundingClientRect(); }
    const v = window.visualViewport ?? { offsetLeft: 0, offsetTop: 0, width: innerWidth, height: innerHeight };
    const x0 = Math.max(q.left, v.offsetLeft), x1 = Math.min(q.right, v.offsetLeft + v.width), y0 = Math.max(q.top, v.offsetTop), y1 = Math.min(q.bottom, v.offsetTop + v.height);
    if (x1 - x0 < 1 || y1 - y0 < 1) return 'utanför';
    const steg = (a, b) => [a + 0.5, a + (b - a) / 4, (a + b) / 2, a + (3 * (b - a)) / 4, b - 0.5];
    const over = [];
    for (const y of steg(y0, y1)) for (const x of steg(x0, x1)) {
      const t = document.elementFromPoint(x, y);
      if (t && egna.some((z) => z === t || z.contains(t) || t.contains(z))) return '';
      if (t) over.push(t);
    }
    // Det som skymmer anges som närmaste fasta eller klibbiga förfader till det som träffades i mitten, annars det som träffades.
    let t = over[12] ?? over[0];
    for (let x = t; x; x = x.parentElement) if (/fixed|sticky/.test(getComputedStyle(x).position)) { t = x; break; }
    return t ? namn(t, false) : 'okänt';
  }

  // Färger görs om till sRGB med en canvas, så att också oklch() och color() går att räkna. Kontrasten med WCAG:s formel.
  function ring() {
    if (e.tagName === 'IFRAME') return null;
    const s = getComputedStyle(e);
    if (s.outlineStyle === 'auto') return null;
    const c = document.createElement('canvas').getContext('2d', { willReadFrequently: true });
    const rgba = (f) => { c.clearRect(0, 0, 1, 1); c.fillStyle = '#000'; c.fillStyle = f; c.fillRect(0, 0, 1, 1); const d = c.getImageData(0, 0, 1, 1).data; return [d[0], d[1], d[2], d[3] / 255]; };
    let farg = null, inne = false;
    if (s.outlineStyle !== 'none' && parseFloat(s.outlineWidth) > 0 && rgba(s.outlineColor)[3] > 0) { farg = rgba(s.outlineColor); inne = parseFloat(s.outlineOffset) < 0; }
    else if (s.boxShadow !== 'none') {
      const f = s.boxShadow.match(/^(?:[a-z-]+\([^)]*\)|#[0-9a-f]+)/i)?.[0];
      if (f && rgba(f)[3] > 0) { farg = rgba(f); inne = /inset/.test(s.boxShadow); }
    }
    if (!farg) return { saknas: true };
    const lager = [];
    for (let x = inne ? e : e.parentElement; x; x = x.parentElement) {
      const st = getComputedStyle(x);
      if (st.backgroundImage !== 'none') return { bild: true };
      const f = rgba(st.backgroundColor);
      if (f[3] > 0) lager.push(f);
      if (f[3] >= 1) break;
    }
    const pa = (a, b) => [0, 1, 2].map((i) => a[i] * a[3] + b[i] * (1 - a[3])).concat(1);
    let bakgrund = [255, 255, 255, 1];
    for (const l of lager.reverse()) bakgrund = pa(l, bakgrund);
    const fram = pa(farg, bakgrund);
    const lum = (f) => { const [r, g, b] = f.map((v) => (v /= 255) <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4); return 0.2126 * r + 0.7152 * g + 0.0722 * b; };
    const [l1, l2] = [lum(fram.slice(0, 3)), lum(bakgrund.slice(0, 3))].sort((a, b) => b - a);
    const hex = (f) => '#' + f.slice(0, 3).map((v) => Math.round(v).toString(16).padStart(2, '0')).join('');
    return { kvot: Math.floor(((l1 + 0.05) / (l2 + 0.05)) * 100) / 100, farg: hex(fram), bakgrund: hex(bakgrund) };
  }
}

// Kontroll 10b och 10c. wrangler dev startas på en ledig port med en egen tillfällig lagring, och hela processgruppen (wrangler och
// workerd) stoppas efteråt, också vid fel eller avbrott.
async function workerVarv() {
  const ledigPort = () => new Promise((klar) => { const s = tcpServer(); s.listen(0, '127.0.0.1', () => { const p = s.address().port; s.close(() => klar(p)); }); });
  const [port, inspektor] = [await ledigPort(), await ledigPort()];
  const lagring = mkdtempSync(join(tmpdir(), 'kontroll-wrangler-'));
  const bin = resolve(sajt, 'node_modules', '.bin', 'wrangler');
  const [kommando, forst] = existsSync(bin) ? [bin, []] : ['npx', ['wrangler']];
  const w = spawn(kommando, [...forst, 'dev', '--ip', '127.0.0.1', '--port', String(port), '--inspector-port', String(inspektor), '--persist-to', lagring, '--show-interactive-dev-session=false'],
    { cwd: sajt, detached: true, stdio: ['ignore', 'pipe', 'pipe'], env: { ...process.env, WRANGLER_SEND_METRICS: 'false', NO_COLOR: '1' } });
  let logg = '', slut = false;
  for (const strom of [w.stdout, w.stderr]) strom.on('data', (d) => { logg = (logg + d).slice(-3000); });
  const avslutad = new Promise((klar) => { w.on('exit', () => { slut = true; klar(); }); w.on('error', (e) => { logg += String(e); slut = true; klar(); }); });
  const dod = () => { try { process.kill(-w.pid, 'SIGKILL'); } catch { /* gruppen finns inte längre */ } };
  const avbryt = () => { dod(); process.exit(130); };
  process.once('exit', dod); process.once('SIGINT', avbryt); process.once('SIGTERM', avbryt);
  const namn10b = 'Worker-uppsättningen: okänd adress ger 404 med den designade sidan';
  try {
    const url = `http://127.0.0.1:${port}`;
    let uppe = false;
    for (const start = Date.now(); !uppe && !slut && Date.now() - start < 90000;) {
      try { await (await fetch(url + '/', { redirect: 'manual' })).arrayBuffer(); uppe = true; } catch { await new Promise((klar) => setTimeout(klar, 300)); }
    }
    if (!uppe) return lagg('10b', namn10b, 'Stopp', false, `wrangler dev startade inte: ${logg.replace(/\s+/g, ' ').trim().slice(-300)}`);
    const hamta = async (p) => { const s = await fetch(url + p, { redirect: 'manual' }); return { status: s.status, h: s.headers, text: await s.text() }; };
    const titel = (t) => t.match(/<title>([^<]*)<\/title>/)?.[1].trim();
    const fil404 = join(dist, '404.html'), ratt = existsSync(fil404) ? titel(readFileSync(fil404, 'utf8')) : undefined;
    const s404 = await hamta(fyra), t404 = titel(s404.text);
    const ok404 = s404.status === 404 && !!ratt && t404 === ratt;
    lagg('10b', namn10b, 'Stopp', ok404, `${fyra} ger status ${s404.status} och ${s404.text.trim().length ? (t404 ? `titeln ”${t404}”` : 'en sida utan titel') : 'en tom kropp'}${ok404 ? '' : ratt ? `; väntat 404 med ”${ratt}”` : '; dist/404.html saknas'}`);

    const k10c = [];
    const huvuden = [['X-Content-Type-Options', (v) => /nosniff/i.test(v)], ['Referrer-Policy'], ['Permissions-Policy'], ['Strict-Transport-Security', (v) => /max-age=\d+/i.test(v)], ['Content-Security-Policy', (v) => /frame-ancestors/i.test(v), 'Content-Security-Policy med frame-ancestors']];
    for (const [p, s] of [['/', await hamta('/')], [fyra, s404]]) {
      const saknas = huvuden.filter(([n, prov]) => { const v = s.h.get(n); return !v || (prov && !prov(v)); }).map(([n, , text]) => text || n);
      if (saknas.length) k10c.push(`${p === fyra ? '404-sidan' : p} saknar ${saknas.join(', ')}`);
    }
    const astroFil = allaFiler(join(dist, '_astro')).sort((a, b) => statSync(a).size - statSync(b).size)[0];
    if (!astroFil) k10c.push('inga filer under /_astro/');
    else {
      const p = '/' + relative(dist, astroFil).split(sep).join('/'), s = await hamta(p), cc = s.h.get('cache-control');
      if (!/immutable/i.test(cc || '')) k10c.push(`${p} har Cache-Control ${cc ? `”${cc}”` : 'saknas'} utan immutable`);
    }
    const omdirFil = join(sajt, 'public', '_redirects');
    let omdir = 0;
    if (existsSync(omdirFil)) for (const rad of readFileSync(omdirFil, 'utf8').split('\n').map((x) => x.trim()).filter((x) => x && !x.startsWith('#')).slice(0, 30)) {
      const fran = rad.split(/\s+/)[0];
      if (!fran.startsWith('/')) continue;
      const s = await hamta(fran.replace(/\*/g, 'prov').replace(/:[a-z]\w*/gi, 'prov')); omdir++;
      if (s.status !== 301) k10c.push(`${fran} ger ${s.status}, inte 301`);
    }
    lagg('10c', 'Worker-uppsättningen: säkerhetshuvuden, immutable på /_astro/ och 301 för omdirigeringar', 'Rapport', k10c.length === 0,
      k10c.length ? k10c.join('; ') : `huvudena på / och 404-sidan, immutable på /_astro/, ${existsSync(omdirFil) ? `${omdir} omdirigeringar med 301` : 'ingen public/_redirects'}`);
    if (!process.env.BARA_N1) for (const k of nyaKontroller().filter((x) => x.arbetare)) {
      laggNy(k.nr, await korKontroll(k, { ...miljo, bas: url, hamta: (p, init) => fetch(url + p, { redirect: 'manual', ...init }) }), { okText: k.okText, antalSidor: sidor.length });
    }
  } catch (e) {
    lagg('10b', namn10b, 'Stopp', false, `varvet med wrangler dev föll: ${String(e).slice(0, 200)}`);
  } finally {
    try { process.kill(-w.pid, 'SIGTERM'); } catch { /* redan stoppad */ }
    await Promise.race([avslutad, new Promise((klar) => setTimeout(klar, 5000))]);
    dod();
    process.removeListener('exit', dod); process.removeListener('SIGINT', avbryt); process.removeListener('SIGTERM', avbryt);
    rmSync(lagring, { recursive: true, force: true });
  }
}

// Vilka av robotarna som stängs ute från hela sajten. Gruppen för roboten gäller, annars gruppen för *.
function utestangda(text, robotar) {
  const grupper = []; let g = null, iRegler = false;
  for (const rad of text.split(/\r?\n/).map((r) => r.replace(/#.*/, '').trim()).filter(Boolean)) {
    const [nyckel, ...rest] = rad.split(':'); const v = rest.join(':').trim(); const k = nyckel.trim().toLowerCase();
    if (k === 'user-agent') { if (!g || iRegler) { g = { agenter: [], disallow: [], allow: [] }; grupper.push(g); iRegler = false; } g.agenter.push(v.toLowerCase()); }
    else if (g && (k === 'disallow' || k === 'allow')) { iRegler = true; if (v) g[k].push(v); }
  }
  const grupp = (ua) => grupper.find((x) => x.agenter.includes(ua.toLowerCase()));
  return robotar.filter((bot) => {
    const x = grupp(bot) ?? (bot === 'Applebot' ? grupp('Googlebot') : undefined) ?? grupp('*');
    return x && x.disallow.includes('/') && !x.allow.includes('/');
  });
}
// 6b. Gatorna i fakta.md: raderna Adress och Mottagning …, gatan före första kommatecknet (Storgatan 1, 111 22 Ort → Storgatan 1).
function faktaGator(text) {
  return [...text.matchAll(/^\|\s*(?:Adress|Mottagning)[^|]*\|\s*([^|]+?)\s*\|/gim)].map((x) => x[1].split(',')[0].trim()).filter((g) => /\p{L}/u.test(g) && /\d/.test(g));
}
// 6b. Telefonen ur fakta.md (siffror, med 0 först) i sidfotens text eller i en tel:-länk där, med 0 eller +46.
function sidfotHarTelefon(fotText, fotTel, tel) {
  const s = `${String(fotText).replace(/\D/g, '')} ${(fotTel || []).map((h) => String(h).replace(/\D/g, '')).join(' ')}`;
  return s.includes(tel) || s.includes('46' + tel.replace(/^0/, ''));
}
// 9 och 9b. Hur mycket CPU andra processer än skriptet använder: summan av ps %cpu (procent av en kärna) för allt utom skriptet, dess
// barn (Chrome, wrangler) och dess förfäder (skalet och sessionen som startade det), med de som använder mest.
function annanLast() {
  const ps = spawnSync('ps', ['-A', '-o', 'pid=,ppid=,pcpu=,comm='], { encoding: 'utf8', env: { ...process.env, LC_ALL: 'C' } });
  const rader = (ps.stdout || '').trim().split('\n').map((r) => r.trim().match(/^(\d+)\s+(\d+)\s+([\d.]+)\s+(.*)$/)).filter(Boolean)
    .map((x) => ({ pid: Number(x[1]), ppid: Number(x[2]), cpu: Number(x[3]), namn: x[4].split('/').pop() }));
  if (!rader.length) return { summa: null, topp: [] };
  const perPid = new Map(rader.map((r) => [r.pid, r])), egna = new Set([process.pid]);
  for (let p = perPid.get(process.pid)?.ppid; p && p !== 1 && !egna.has(p); p = perPid.get(p)?.ppid) egna.add(p);
  for (let andrad = true; andrad;) { andrad = false; for (const r of rader) if (!egna.has(r.pid) && r.ppid !== 1 && egna.has(r.ppid)) { egna.add(r.pid); andrad = true; } }
  const andra = rader.filter((r) => !egna.has(r.pid) && r.pid > 1).sort((a, b) => b.cpu - a.cpu);
  return { summa: Math.round(andra.reduce((s, r) => s + r.cpu, 0)), topp: andra.slice(0, 3).filter((r) => r.cpu >= 5).map((r) => `${r.namn} ${Math.round(r.cpu)} %`) };
}
function annanLastText(lh) {
  if (lh.annan?.summa === null || lh.annan?.summa === undefined) return 'andra processers last gick inte att läsa, så TBT rapporterar';
  return `andra processer upp till ${lh.annan.summa} % av en kärna${lh.annan.topp.length ? ` (${lh.annan.topp.join(', ')})` : ''}, så TBT ${lh.ledig ? 'kan stoppa' : 'rapporterar'}`;
}
function allaFiler(d) { return existsSync(d) ? readdirSync(d, { withFileTypes: true }).flatMap((e) => e.isDirectory() ? allaFiler(join(d, e.name)) : [join(d, e.name)]) : []; }
function skrivUt() {
  console.log(`Kontrollskriptet mot ${sajt} – ${new Date().toLocaleString('sv-SE')}`);
  console.log(`Verktyg: ${Object.entries(verktyg).map(([k, v]) => `${k} ${v}`).join(', ')}`);
  const rad = (r) => console.log(`${String(r.nr).padEnd(4)} ${r.utfall.padEnd(8)} ${r.typ.padEnd(15)} ${r.namn} – ${r.detalj}`);
  const n2 = res.filter((r) => r.niva === 'N2').sort((a, b) => a.ix - b.ix);
  res.filter((r) => r.niva !== 'N2').forEach(rad);
  if (n2.length) { console.log('\nN2-kontrollerna (förslagen ur andra varvet, guide/bilaga-c-kontroller.md):'); n2.forEach(rad); }
  const stopp = res.filter((r) => (r.stoppar ?? r.typ.startsWith('Stopp')) && r.utfall === 'fel');
  console.log(stopp.length ? `\n${stopp.length} stoppande kontroller faller: ${stopp.map((r) => r.nr).join(', ')}` : '\nInga stoppande kontroller faller.');
  const tid = new Date().toISOString();
  const ut = JSON.stringify({ tid, versioner: verktyg, resultat: res }, null, 1);
  mkdirSync(join(sajt, 'kontroller'), { recursive: true });
  writeFileSync(join(sajt, 'kontroller', 'senaste.json'), ut);
  writeFileSync(join(sajt, 'kontroller', `${tid.replace(/[:.]/g, '-')}.json`), ut);
  process.exit(stopp.length ? 1 : 0);
}

// ---------------------------------------------------------------------------------------------------------------------------------
// Gemensamt för N1, N2 och felbanken

// Liten statisk server. huvuden(p) lägger till svarshuvuden per sökväg, och extra(req, svar) kan svara själv (felbanken).
async function statiskServer(rot, { huvuden = () => ({}), extra } = {}) {
  const s = createServer(async (req, svar) => {
    if (extra && (await extra(req, svar))) return;
    const p = decodeURIComponent(new URL(req.url, 'http://x').pathname);
    let fil = join(rot, p); if (existsSync(fil) && statSync(fil).isDirectory()) fil = join(fil, 'index.html');
    if (!existsSync(fil)) { const f = join(rot, '404.html'); svar.writeHead(404, { 'content-type': typer['.html'] }); return svar.end(existsSync(f) ? readFileSync(f) : 'saknas'); }
    const typ = typer[extname(fil)] || 'application/octet-stream', data = readFileSync(fil), extraHuvuden = huvuden(p);
    if (/text|xml|javascript|svg/.test(typ) && /gzip/.test(req.headers['accept-encoding'] || '')) { svar.writeHead(200, { 'content-type': typ, 'content-encoding': 'gzip', vary: 'accept-encoding', ...extraHuvuden }); return svar.end(gzipSync(data)); }
    svar.writeHead(200, { 'content-type': typ, ...extraHuvuden }); svar.end(data);
  });
  await new Promise((r) => s.listen(0, '127.0.0.1', r));
  return { server: s, bas: `http://127.0.0.1:${s.address().port}` };
}

// Versionerna av verktygen, så att en mätning går att jämföra med en senare (andra varvet, bevakningen B6).
function verktygsversioner(sajtKatalog) {
  const v = (paket, rot = skriptKatalog) => { try { return JSON.parse(readFileSync(join(rot, 'node_modules', paket, 'package.json'), 'utf8')).version; } catch { return 'saknas'; } };
  const ut = { node: process.version, playwright: v('playwright'), 'axe-core': v('axe-core'), '@axe-core/playwright': v('@axe-core/playwright'), lighthouse: v('lighthouse'), 'html-validate': v('html-validate'), 'chrome-launcher': v('chrome-launcher'), csp_evaluator: v('csp_evaluator') };
  if (sajtKatalog) Object.assign(ut, { astro: v('astro', sajtKatalog), wrangler: v('wrangler', sajtKatalog) });
  return ut;
}

// Lighthouse mot sidorna: en uppvärmning och sedan varv körningar per sida och läge, med medianen av poängen och mätvärdena (9 och 9b).
// Andra processers CPU läses före, efter brusgolvet och efter varje sida och läge; maskinen räknas som ledig när varje stickprov är
// under LEDIG_CPU (lh.ledig), och det högsta står i lh.annan.
async function lighthouseMat(basUrl, sidlista, { varv = MATVARV, lagen = [['mobil', undefined], ['dator', desktopConfig]] } = {}) {
  const stickprov = [annanLast()];
  const chrome = await chromeLauncher.launch({ chromePath: chromium.executablePath(), chromeFlags: ['--headless=new'] });
  try {
    const kat = ['performance', 'accessibility', 'best-practices', 'seo'];
    const korning = async (url, conf) => (await lighthouse(url, { port: chrome.port, output: 'json', logLevel: 'error', onlyCategories: kat }, conf)).lhr;
    await korning(basUrl + sidlista[0]);
    const median = (a) => [...a].sort((x, y) => x - y)[Math.floor(a.length / 2)];
    // Brusgolvet: TBT på en tom sida i samma Chrome och läge. På en belastad maskin får också en tom sida hundratals ms
    // (felbanken 2026-10-16: 32, 83 och 450 ms vid lasten 4 av 8 kärnor), och då är sidornas TBT inte att lita på.
    const tom = createServer((q, r) => { r.writeHead(200, { 'content-type': typer['.html'] }); r.end('<!doctype html><html lang="sv"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>Tom</title></head><body><p>Tom sida.</p></body></html>'); });
    await new Promise((k) => tom.listen(0, '127.0.0.1', k));
    const brus = []; for (let i = 0; i < varv; i++) brus.push((await korning(`http://127.0.0.1:${tom.address().port}/`)).audits['total-blocking-time']?.numericValue ?? 0);
    tom.close();
    const lh = []; lh.brus = median(brus); stickprov.push(annanLast());
    for (const s of sidlista) for (const [namn, conf] of lagen) {
      const v = []; for (let i = 0; i < varv; i++) v.push(await korning(basUrl + s, conf));
      stickprov.push(annanLast());
      const p = (k) => median(v.map((c) => Math.round((c.categories[k].score ?? 0) * 100)));
      const m = (a) => median(v.map((c) => c.audits[a]?.numericValue ?? 0));
      const g = (a) => v.map((c) => c.audits[a]?.score).filter((x) => typeof x === 'number');
      lh.push({ sida: s, namn, prestanda: p('performance'), tillganglighet: p('accessibility'), praxis: p('best-practices'), seo: p('seo'), lcp: m('largest-contentful-paint'), cls: m('cumulative-layout-shift'), tbt: m('total-blocking-time'), bfcache: g('bf-cache'), lcpUpptackt: g('lcp-discovery-insight') });
    }
    const lasta = stickprov.filter((x) => x.summa !== null);
    lh.annan = lasta.length === stickprov.length ? lasta.reduce((a, x) => (x.summa > a.summa ? x : a)) : { summa: null, topp: [] };
    lh.ledig = lh.annan.summa !== null && lh.annan.summa < LEDIG_CPU;
    return lh;
  } finally { await chrome.kill(); }
}
// 9b. LCP ≤ 2 500 ms och CLS ≤ 0,1 (web.dev, Core Web Vitals; guide 2-8, N2: Prestanda i labb) stoppar i mobil och rapporteras i dator.
// TBT ≤ 200 ms stoppar i mobil bara när maskinen är ledig (lh.ledig) och rapporterar annars (punkt 46). Brusgolvet står kvar: ger en
// tom sida i samma Chrome och läge över 50 ms TBT blir sidornas TBT en läsning. bfcache och LCP-bildens upptäckt rapporteras (web.dev,
// bfcache; Lighthouse lcp-discovery-insight).
function lighthouseFynd(lh) {
  const ut = [], osaker = lh.brus > 50;
  for (const x of lh) {
    const over = [x.lcp > 2500 && `LCP ${Math.round(x.lcp)} ms`, x.cls > 0.1 && `CLS ${x.cls.toFixed(3).replace('.', ',')}`].filter(Boolean);
    if (over.length) ut.push({ sida: x.sida, text: `${x.namn}: ${over.join(', ')}`, stopp: x.namn === 'mobil' });
    if (!osaker && x.tbt > 200) ut.push({ sida: x.sida, text: `${x.namn}: TBT ${Math.round(x.tbt)} ms${x.namn === 'mobil' && !lh.ledig ? ' (rapport: annan last på maskinen)' : ''}`, stopp: x.namn === 'mobil' && lh.ledig });
    if (osaker && x.tbt > 200) ut.push({ sida: x.sida, text: `${x.namn}: TBT ${Math.round(x.tbt)} ms är osäker, eftersom en tom sida gav ${Math.round(lh.brus)} ms`, info: true });
    if (x.bfcache.some((s) => s < 1)) ut.push({ sida: x.sida, text: `${x.namn}: sidan kan inte läggas i bfcache` });
    if (x.lcpUpptackt.some((s) => s < 1)) ut.push({ sida: x.sida, text: `${x.namn}: LCP-bilden upptäcks sent (lcp-discovery-insight)` });
  }
  return ut;
}

// ---------------------------------------------------------------------------------------------------------------------------------
// N2-kontrollerna. Varje kontroll har nr, namn, typ och felbank (felsidor i skript/felbank/ där den ska fallera) och antingen
// vyer + sida (körs i en ny webbläsarflik per sida och vy) eller kor (hela sajten på en gång). Ett fynd är { text, stopp?, info? };
// info räknas inte som fel. En kontroll av typen Stopp stoppar med alla sina fynd, andra bara med fynd som har stopp: true.
// Stopp eller rapport följer BESLUT.md 2026-10-16, *Frågelistan efter tredje varvet avgörs*, punkt 45: stopp för 3f, 14 och 13c
// (transition: all och layoutegenskaper), rapport för 4c, 8f, 8i, 10d–10f, 11 och studs.
function nyaKontroller() {
  const vy = (bredd, hojd, mobil, extra = {}) => ({ namn: `${bredd} px`, bredd, hojd, mobil, ...extra });
  const V320 = vy(320, 700, true), V375 = vy(375, 812, true), V1024 = vy(1024, 768, false), V1280 = vy(1280, 800, false);
  const fel = (...sidor) => [{ sidor: sidor.map((s) => `/fel-${s}.html`) }];
  return [
    // 2d. Formulärfält: etikett (WCAG F68, 1.3.1 och 4.1.2) och giltig autocomplete (WCAG F107, 1.3.5), med html-validates regler.
    { nr: '2d', namn: 'Formulärfält har etikett och giltig autocomplete', typ: 'Stopp', kor: k2d, felbank: fel('2d') },
    // 2e. Datatabeller: rubrikceller i en sammansatt tabell har scope (H63), och varje datatabell har ett namn (H39). Teknikerna är tillräckliga, inte krav.
    { nr: '2e', namn: 'Datatabeller har scope och namn', typ: 'Rapport', kor: k2e, felbank: fel('2e') },
    // 2g. Trusted Types-prov: sidan körs med require-trusted-types-for 'script', utan och med samtycke; 0 överträdelser (W3C Trusted Types).
    { nr: '2g', namn: 'Trusted Types-prov utan överträdelser', typ: 'Rapport', vyer: [V1280], fore: fore2g, sida: sida2g, felbank: fel('2g') },
    // 3c. Ingen klippning på roten: html och body har inte overflow-x hidden eller clip, och inget synligt slutar till höger om fönstret i 320 px (WCAG 1.4.10).
    { nr: '3c', namn: 'Ingen klippning på roten i 320 px', typ: 'Stopp', vyer: [V320], sida: sida3c, felbank: fel('3c') },
    // 3d. Större text: grundstorleken 24 och 32 px via CDP Page.setFontSizes i 375 px (WCAG 1.4.4 i andan; Understanding 1.4.4, F69).
    { nr: '3d', namn: 'Större text (24 och 32 px) i 375 px', typ: 'Rapport', vyer: [V375], sida: sida3d, felbank: fel('3d') },
    // 3e. Sidhuvudet på en rad i 1024 och 1280 px: inget bryts, inget överlappar (kvalitetsgruppens fynd N1, andra varvet).
    { nr: '3e', namn: 'Sidhuvudet på en rad i 1024 och 1280 px', typ: 'Rapport', vyer: [V1024, V1280], sida: sida3e, felbank: fel('3e') },
    // 3f. Säkra ytor: med viewport-fit=cover använder stilarna env(safe-area-inset-left) och -right (WebKit, Designing Websites for iPhone X).
    { nr: '3f', namn: 'Säkra ytor med viewport-fit=cover', typ: 'Stopp', kor: k3f, felbank: [{ sidor: ['/fel-3f.html'], stopp: true }] },
    // 4c. Accenten: i varje fönster högst en sorts handling fylld med accentfärgen, och accenten bara på handlingar (BESLUT G3 och G5).
    { nr: '4c', namn: 'Accentfyllning: en sorts handling per fönster, bara på handlingar', typ: 'Rapport', vyer: [V375, V1280], sida: sida4c, felbank: fel('4c') },
    // 4d. Ingen ruta över första skärmen vid ankomst utom samtyckesrutan (guide 2-4, N1; tröskeln 30 % är andra varvets, ⚠️ egen).
    { nr: '4d', namn: 'Ingen ruta över första skärmen utom samtycket', typ: 'Rapport', vyer: [V375, V1280], sida: sida4d, felbank: fel('4d') },
    // 7d. Mikrotypografi: hårt mellanslag i tal och enhet, tusental, datum och telefonnummer; inga tre punkter eller raka citattecken.
    { nr: '7d', namn: 'Mikrotypografi', typ: 'Rapport', vyer: [V1280], sida: sida7d, felbank: fel('7d') },
    // 7e. Söksträngen på sin sida: varje söksträng i sidkartan finns i sidans h1, h2 eller första stycke (guide 2-3, N1).
    { nr: '7e', namn: 'Söksträngen finns på sin sida', typ: 'Rapport', vyer: [V1280], krav: (m) => (m.sidkarta ? null : 'ingen sidkarta.md'), sida: sida7e, felbank: fel('7e') },
    // 7f. Inga understrukna mellanrum: ingen länk har ett synligt mellanslag före en ikon (flödet F2, andra varvet).
    { nr: '7f', namn: 'Inga understrukna mellanrum före en ikon', typ: 'Rapport', vyer: [V1280], sida: sida7f, felbank: fel('7f') },
    // 7g. Inget långt tankstreck (—) i synlig text (guide 2-7, C68; Språkrådet, Myndigheternas skrivregler 13.8; punkt 30).
    { nr: '7g', namn: 'Inget långt tankstreck i synlig text', typ: 'Rapport', vyer: [V1280], sida: sida7g, felbank: fel('7g') },
    // 8c. axe med WCAG 2.2 A/AA i WebKit (guide 2-8, N2: Tillgänglighet, C86).
    { nr: '8c', namn: 'axe i WebKit', typ: 'Stopp', vyer: [vy(375, 812, true, { motor: 'webkit' }), vy(1280, 800, false, { motor: 'webkit' })], sida: sida8c, felbank: fel('8c') },
    // 8d. axe med menyn öppen (guide 2-8, N2: Tillgänglighet, C86). Samtyckesrutan öppen prövas redan i 8; formulärfel saknas.
    { nr: '8d', namn: 'axe med menyn öppen', typ: 'Stopp', vyer: [V375], sida: sida8d, felbank: fel('8d') },
    // 8e. axe best-practice som rapport; incomplete listas som läsning (axe-core API).
    { nr: '8e', namn: 'axe best-practice (incomplete som läsning)', typ: 'Rapport', vyer: [V375, V1280], sida: sida8e, felbank: fel('8e') },
    // 8f. Menyer och dialoger med tangentbordet: Enter öppnar, Escape stänger, fokus tillbaka (WCAG 2.1.1, 2.4.3; APG).
    { nr: '8f', namn: 'Menyer och dialoger: Enter, Escape och fokus tillbaka', typ: 'Rapport', vyer: [V375, V1280], sida: sida8f, felbank: fel('8f') },
    // 8g. Textavstånd enligt WCAG 1.4.12: ingen text klipps (stopp); sidledsscroll rapporteras.
    { nr: '8g', namn: 'Textavstånd (WCAG 1.4.12)', typ: 'Stopp (klippt text), rapport (sidledsscroll)', vyer: [vy(375, 812, true, { ctx: { bypassCSP: true } }), vy(1280, 800, false, { ctx: { bypassCSP: true } })], sida: sida8g, felbank: fel('8g') },
    // 8h. Forced colors: fokus syns som outline, och knappar och fält har kant (MDN, forced-colors; WCAG 2.4.7 och 1.4.11).
    { nr: '8h', namn: 'Forced colors: fokus och kanter', typ: 'Rapport', vyer: [V1280], sida: sida8h, felbank: fel('8h') },
    // 8i. Konsekvent navigering och hjälp: menyn, sidfoten och kontaktvägarna i samma ordning på alla sidor (WCAG 3.2.3 och 3.2.6).
    { nr: '8i', namn: 'Konsekvent navigering och hjälp', typ: 'Rapport', vyer: [V1280], sida: sida8i, samman: samman8i, felbank: [{ sidor: ['/fel-8i-a.html', '/fel-8i-b.html'] }] },
    // 8l. Dialoger har namn (WCAG 4.1.2; APG Dialog; axe aria-dialog-name är best-practice).
    { nr: '8l', namn: 'Dialoger har namn', typ: 'Rapport', vyer: [V1280], sida: sida8l, felbank: fel('8l') },
    // 8m. Namn och landmärken: inget namn innehåller rollen, ett namn som räknar upp innehåll stämmer, samma länknamn går till samma mål (WCAG 2.4.4, 2.4.6; APG).
    { nr: '8m', namn: 'Namn på landmärken och länkar', typ: 'Rapport', vyer: [V1280], sida: sida8m, felbank: fel('8m') },
    // 8n. Ingen rubrik i summary (O'Hara; MWG) och ingen betydelsebärande text i CSS content (WCAG F87).
    { nr: '8n', namn: 'Ingen rubrik i summary och ingen text i CSS content', typ: 'Rapport', vyer: [V1280], sida: sida8n, felbank: fel('8n') },
    // 8o. Hover och tryck: varje sorts länk och knapp ändras vid hover i 1280 px, och inget hover-läge står kvar efter ett tryck i 375 px (Vercel; Krehel).
    { nr: '8o', namn: 'Hover och tryck', typ: 'Rapport', vyer: [V1280, V375], sida: sida8o, felbank: fel('8o') },
    // 8p. 44 × 44 på pekskärm: knappar, menyknappen och fristående länkar, också sidfotens och menyns länklistor, i 375 px med pekskärm
    // (Apple HIG, Accessibility; WCAG 2.2, 2.5.5, AAA; C36; punkt 16). Golvet 24 × 24 (2.5.8) prövas av axe i 8 och 8c.
    { nr: '8p', namn: 'Träffytor 44 × 44 px på pekskärm', typ: 'Rapport', vyer: [V375], sida: sida8p, felbank: fel('8p') },
    // 8q. Besökta länkar syns: stilmallen har en regel för :visited med en färg (NN/g, 113 Design Guidelines; MDN, Privacy and the
    // :visited selector: getComputedStyle svarar som om länken är obesökt, så stilmallen läses; punkt 44).
    { nr: '8q', namn: 'Stilmallen har en regel för :visited', typ: 'Rapport', kor: k8q, felbank: fel('8q') },
    // 9b. Lighthouses mätvärden ur samma körningar som 9 (C79). Körs med Lighthouse och hoppas över med SNABB=1.
    { nr: '9b', namn: `LCP, CLS och TBT (median av ${MATVARV_ORD}); bfcache och LCP-bildens upptäckt`, typ: 'Stopp (LCP och CLS i mobil; TBT i mobil när maskinen är ledig), rapport (dator, TBT under last, bfcache, upptäckt)', lighthouse: true, kor: k9b, felbank: fel('9b') },
    // 9f. Prioritet och video: högst en fetchpriority="high", aldrig med loading="lazy"; video med mått, poster och preload (web.dev; MDN).
    { nr: '9f', namn: 'Prioritet och video', typ: 'Rapport', kor: k9f, felbank: fel('9f') },
    // 10c+. CORP på sidorna och /_astro/ (MDN; OWASP Secure Headers). Körs mot wrangler dev.
    { nr: '10c+', namn: 'Cross-Origin-Resource-Policy på sidorna och /_astro/', typ: 'Rapport', arbetare: true, kor: k10cPlus, okText: 'CORP same-origin eller same-site', felbank: fel('10c') },
    // 10d. CSP-lint med csp-evaluator på sidans policyer (meta och _headers): 0 HIGH och 0 syntaxfel (OWASP CSP Cheat Sheet).
    { nr: '10d', namn: 'CSP-lint (csp-evaluator)', typ: 'Rapport', kor: k10d, felbank: fel('10d') },
    // 10e. Farliga DOM-sänkor i källkoden (W3C Trusted Types listar sänkorna; OWASP DOM XSS Prevention ⚠️).
    { nr: '10e', namn: 'Inga farliga DOM-sänkor i källkoden', typ: 'Rapport', kor: k10e, felbank: fel('10e') },
    // 10f. Fetch Metadata och ursprung på POST-mottagarna, mot wrangler dev (OWASP CSRF Cheat Sheet; W3C Fetch Metadata).
    { nr: '10f', namn: 'Fetch Metadata och ursprung på POST-mottagarna', typ: 'Rapport', arbetare: true, kor: k10f, okText: 'cross-site och fel Origin ger 403, rätt Origin släpps igenom, GET ger 405', felbank: fel('10f') },
    // 11. Interna länkar och ankare i bygget: 0 trasiga (guide 2-8, N2; C81). Egen genomgång av dist, eftersom lychee inte är installerat.
    { nr: '11', namn: 'Interna länkar och ankare', typ: 'Rapport', kor: k11, felbank: fel('11') },
    // 12. Strukturerad data mot fakta.md: name och address finns, telefonen stämmer (stopp); uppgifterna syns i texten (rapport) (Google, Local business; C84).
    { nr: '12', namn: 'Strukturerad data mot fakta.md', typ: 'Stopp (namn, adress, telefon), rapport (syns i texten)', kor: k12, felbank: fel('12') },
    // 12b. Kanonisk https-adress till sig själv och ingen noindex (stopp); og:url, og:image, sitemapens adress och länkarnas form (rapport) (Google; C83).
    { nr: '12b', namn: 'Kanonisk adress, noindex och Open Graph', typ: 'Stopp (kanonisk, noindex), annars rapport', kor: k12b, felbank: fel('12b') },
    // 12c. Sitemapen: varje adress finns och är sin egen kanoniska, sidor som nås från startsidan står i den, robots.txt har Sitemap (Google,
    // Build a sitemap); en sida i sitemapen som inte nås med länkar från startsidan är föräldralös och stoppar (C24; Google, crawlbara länkar).
    { nr: '12c', namn: 'Sitemapen och genomsökningen', typ: 'Rapport; stopp för en föräldralös sida (C24)', kor: k12c, felbank: [{ sidor: ['/fel-12c.html'], miljo: { sitemap: 'fel-12c-sitemap.xml', robots: 'fel-12c-robots.txt' } }] },
    // 12d. lastmod per adress, och inte samma på alla när sitemapen har fler än tre adresser (Google, Build a sitemap).
    { nr: '12d', namn: 'lastmod i sitemapen', typ: 'Rapport', kor: k12d, felbank: [{ sidor: ['/fel-12d.html'], miljo: { sitemap: 'fel-12d-sitemap.xml' } }] },
    // 12e. Huvudet i byggd HTML: titel, beskrivning och kanonisk adress (och JSON-LD på startsidan) finns före JavaScript (Google, JavaScript SEO basics).
    { nr: '12e', namn: 'Huvudet finns i den byggda HTML:en', typ: 'Rapport', kor: k12e, felbank: fel('12e') },
    // 12f. HTML under 2 MB per sida; pushState och replaceState granskas (Google Search Central-bloggen 2026-03-31; spam policies).
    { nr: '12f', namn: 'Storlek och historik', typ: 'Rapport', kor: k12f, felbank: fel('12f') },
    // 12g. JSON-LD i detalj: @context https://schema.org, absoluta adresser, inga platshållare (Google, riktlinjerna; claude-seo).
    { nr: '12g', namn: 'JSON-LD i detalj', typ: 'Rapport', kor: k12g, felbank: fel('12g') },
    // 12h. Favicon (kvadratisk, helst större än 48 × 48 px), apple-touch-icon och webbmanifest finns (Google, Favicon in Search; punkt 25).
    { nr: '12h', namn: 'Favicon, apple-touch-icon och webbmanifest', typ: 'Rapport', kor: k12h, felbank: fel('12h') },
    // 13. Byggd CSS: ingen tidslinje i animation-förkortningen och ingen förkortning som Chromium avvisar, animation-timeline efter
    // animation, @starting-style efter sin regel, allow-discrete med reserv (MDN, animation, @starting-style och transition-behavior; C58b).
    { nr: '13', namn: 'Byggd CSS: tidslinje, ordning och reserv', typ: 'Rapport', kor: k13, felbank: fel('13') },
    // 13b. Rullist, mask, justering och forced-color-adjust (MDN; WCAG 1.4.3).
    { nr: '13b', namn: 'Rullist, mask, justerad text och forced-color-adjust', typ: 'Rapport', vyer: [V375, V1280], sida: sida13b, felbank: fel('13b') },
    // 13c. Rörelse i byggd CSS (C58): inte transition: all, bara transform, opacitet och färg, inga studsande kurvor, scroll-drivet och
    // scroll-behavior: smooth inom no-preference (guide 2-6). transition: all och animerade layoutegenskaper stoppar (web.dev, Basques och
    // Andrew 2020; Motion; GSAP; punkt 15 b och 45); övrigt rapporteras.
    { nr: '13c', namn: 'Rörelse i byggd CSS (C58)', typ: 'Stopp (transition: all och layoutegenskaper), rapport (studs, andra egenskaper, scroll-drivet, smooth)', kor: k13c, felbank: [{ sidor: ['/fel-13c.html'], stopp: true }, { sidor: ['/fel-13c-studs.html'], stopp: false }] },
    // 13d. Reducerad rörelse (C56): med reduce ändrar ingen animation transform, translate, scale, rotate eller filter, och ingen scroll-driven animation är aktiv.
    { nr: '13d', namn: 'Reducerad rörelse: inget förflyttas (C56)', typ: 'Rapport', vyer: [vy(375, 812, true, { ctx: { reducedMotion: 'reduce' } }), vy(1280, 800, false, { ctx: { reducedMotion: 'reduce' } })], sida: sida13d, felbank: fel('13d') },
    // 13e. Fem sekunder (C57): skärmbilder efter 6 och 7 s utan interaktion är lika, eller så finns en pausknapp (WCAG 2.2.2).
    { nr: '13e', namn: 'Inget rör sig efter fem sekunder utan paus (C57)', typ: 'Rapport', vyer: [V375, V1280], sida: sida13e, felbank: fel('13e') },
    // 13f. Första skärmen står still: h1 och ingressen syns från första bildrutan, och fasta element byter inte läge eller opacitet
    // under första sekunden (guide 2-6; Apple HIG, Launching; NN/g).
    { nr: '13f', namn: 'Första skärmen står still', typ: 'Rapport', vyer: [V375, V1280], fore: fore13f, sida: sida13f, felbank: fel('13f') },
    // 13g. Ingen text börjar osynlig: utan JavaScript har ingen text opacitet 0 (guide 2-6, N1).
    { nr: '13g', namn: 'Ingen text osynlig utan JavaScript', typ: 'Rapport', vyer: [vy(375, 812, true, { ctx: { javaScriptEnabled: false } }), vy(1280, 800, false, { ctx: { javaScriptEnabled: false } })], sida: sida13g, felbank: fel('13g') },
    // 13h. h1 animeras inte in: under de första tre sekunderna har varken h1, något i den eller något runt den en animation på opacitet,
    // läge, form eller klippning (också med fördröjning eller scroll-driven), och h1:s opacitet och transform står still (NN/g, Homepage
    // Design 5.3 och 113 Design Guidelines; punkt 44).
    { nr: '13h', namn: 'h1 animeras inte in', typ: 'Rapport', vyer: [V375, V1280], fore: fore13h, sida: sida13h, felbank: fel('13h') },
    // 14. Inga förfrågningar till andra ursprung vid första laddningen utan svar på samtycket (guide 2-8, N1, tredje part).
    { nr: '14', namn: 'Inga förfrågningar till andra ursprung vid laddning', typ: 'Stopp', vyer: [V375], fore: fore14, sida: (page, { minne }) => [...minne.andra].map((o) => `förfrågan till ${o}`), felbank: [{ sidor: ['/fel-14.html'], stopp: true }] },
  ];
}

// Kör en N2-kontroll i miljön (sajten eller felbanken) och ger fynden. Ett fel i själva kontrollen blir ett fynd, aldrig ok.
async function korKontroll(k, m) {
  const markera = (f) => ({ ...f, stopp: f.stopp ?? (k.typ === 'Stopp') });
  try {
    const krav = k.krav?.(m); if (krav) return [{ text: `prövas inte: ${krav}`, info: true }];
    if (k.kor) return normalisera(await k.kor(m)).map(markera);
    const sidlista = m.alla;
    const jobb = k.vyer.flatMap((v) => sidlista.map((s) => [v, s]));
    const svar = await parallellt(jobb, 4, async ([v, s]) => [v, s, await provaSida(k, v, s, m)]);
    if (k.samman) {
      const per = {}; const ut = [];
      for (const [v, s, r] of svar) { if (Array.isArray(r)) ut.push(...normalisera(r).map((f) => ({ ...f, sida: s }))); else (per[v.namn] ??= {})[s] = r; }
      return [...ut, ...normalisera(k.samman(per, m))].map(markera);
    }
    return svar.flatMap(([v, s, r]) => normalisera(r).map((f) => markera({ ...f, sida: f.sida ?? s, vy: k.vyer.length > 1 ? v.namn : undefined })));
  } catch (e) { return [{ text: `kontrollen föll: ${String(e).split('\n')[0].slice(0, 200)}` }]; }
}
function normalisera(r) { return (r || []).map((x) => (typeof x === 'string' ? { text: x } : x)); }
async function parallellt(lista, n, fn) {
  const ut = []; let i = 0;
  await Promise.all(Array.from({ length: Math.min(n, lista.length) }, async () => { while (i < lista.length) { const j = i++; ut[j] = await fn(lista[j], j); } }));
  return ut;
}
// En sida i en ny flik med vyns storlek. fore(ctx, page, miljö, minne) körs före laddningen.
async function provaSida(k, v, s, m) {
  const b = v.motor === 'webkit' ? await (m.webkitP ??= webkit.launch()) : m.browser;
  const ctx = await b.newContext({ viewport: { width: v.bredd, height: v.hojd }, isMobile: v.mobil, hasTouch: v.mobil, locale: 'sv-SE', ...(v.ctx || {}) });
  const minne = {};
  try {
    const page = await ctx.newPage();
    if (k.fore) await k.fore(ctx, page, m, minne);
    await page.goto(m.bas + s, { waitUntil: 'networkidle', timeout: 45000 });
    await page.evaluate(() => document.fonts?.ready).catch(() => {});
    return await k.sida(page, { sida: s, vy: v, miljo: m, minne, ctx });
  } catch (e) { return [{ text: `kunde inte prövas: ${String(e).split('\n')[0].slice(0, 160)}` }]; }
  finally { await ctx.close().catch(() => {}); }
}
// Kör fn i sidan med hjälpfunktionerna (SIDHJALP). Uttrycket skickas som text, vilket sidans CSP inte stoppar.
function iSidan(page, fn, arg = null) { return page.evaluate(`(async () => {\n${SIDHJALP}\nreturn await (${fn.toString()})(${JSON.stringify(arg)});\n})()`); }
async function bildrutor(page, n = 2) { await page.evaluate((n) => new Promise((k) => { const f = (i) => (i ? requestAnimationFrame(() => f(i - 1)) : k()); f(n); }), n); }

// Grupperar fynd med samma text och anger sidorna.
function sammanfatta(fynd, antalSidor) {
  const grupper = new Map();
  for (const f of fynd) {
    const t = `${f.vy ? f.vy + ': ' : ''}${f.text}`;
    const g = grupper.get(t) ?? grupper.set(t, { text: t, sidor: [] }).get(t);
    if (f.sida && !g.sidor.includes(f.sida)) g.sidor.push(f.sida);
  }
  return [...grupper.values()].map((g) => (g.sidor.length ? `${g.text} (${g.sidor.length > 1 && g.sidor.length >= antalSidor ? 'alla sidor' : g.sidor.join(', ')})` : g.text));
}
function laggNy(nr, fynd, { okText = '', antalSidor = 0 } = {}) {
  const lista = nyaKontroller(); const ix = lista.findIndex((k) => k.nr === nr); const k = lista[ix];
  const riktiga = fynd.filter((f) => !f.info), info = fynd.filter((f) => f.info);
  const rader = sammanfatta(riktiga, antalSidor), inforader = sammanfatta(info, antalSidor);
  res.push({ nr, namn: k.namn, typ: k.typ, niva: 'N2', ix, utfall: riktiga.length ? 'fel' : 'ok', stoppar: riktiga.some((f) => f.stopp),
    detalj: riktiga.length ? `${rader.length} fynd: ${rader.slice(0, 8).join(' | ')}${rader.length > 8 ? ' | …' : ''}${inforader.length ? '; läsning: ' + inforader.slice(0, 3).join(' | ') : ''}`
      : `${okText || 'inga fynd'}${inforader.length ? '; läsning: ' + inforader.slice(0, 4).join(' | ') : ''}`, fynd: rader, info: inforader });
}
async function korNya(m) {
  m.browser = await chromium.launch();
  try {
    for (const k of nyaKontroller()) {
      if (k.arbetare || k.lighthouse) continue;
      const t0 = Date.now();
      const fynd = await korKontroll(k, m);
      const antal = k.kor ? m.sidor.length : m.alla.length;
      laggNy(k.nr, fynd, { okText: k.okText || (k.vyer ? `${antal} sidor i ${k.vyer.map((v) => v.namn.replace(' px', '')).join(' och ')} px` : `${antal} sidor`), antalSidor: antal });
      if (process.env.VISA_TID) console.error(`${k.nr}: ${((Date.now() - t0) / 1000).toFixed(1)} s`);
    }
  } finally {
    await m.browser.close();
    if (m.webkitP) { const w = await m.webkitP; verktyg.webkit = w.version(); await w.close(); }
  }
}

// ---------------------------------------------------------------------------------------------------------------------------------
// Felbanken: varje N2-kontroll mot sin felsida (ska ge minst ett fynd) och mot ren.html och ren-2.html (ska ge noll fynd).
async function felbank(urval) {
  const rot = join(skriptKatalog, 'felbank');
  let stor = null;
  const extra = async (req, svar) => {
    const p = new URL(req.url, 'http://x').pathname;
    // En stor bild (brus som inte går att komprimera) för 9b: LCP-bilden tar flera sekunder i Lighthouses mobilnät.
    if (p === '/stor.png') {
      stor ??= await (await import('sharp')).default(randomBytes(900 * 900 * 3), { raw: { width: 900, height: 900, channels: 3 } }).png().toBuffer();
      svar.writeHead(200, { 'content-type': 'image/png' }); svar.end(stor); return true;
    }
    // POST-mottagare för 10f: /fel-logg tar emot allt, /ren-logg följer OWASP och Fetch Metadata.
    if (p === '/fel-logg') { req.resume(); svar.writeHead(204); svar.end(); return true; }
    if (p === '/ren-logg') {
      req.resume();
      const ursprung = `http://${req.headers.host}`;
      const status = req.method !== 'POST' ? 405 : req.headers['sec-fetch-site'] === 'cross-site' || req.headers.origin !== ursprung ? 403 : 204;
      svar.writeHead(status, status === 405 ? { allow: 'POST' } : {}); svar.end(); return true;
    }
    return false;
  };
  const { server: s, bas: b } = await statiskServer(rot, { extra, huvuden: (p) => (p.startsWith('/ren') ? { 'cross-origin-resource-policy': 'same-origin' } : {}) });
  const brow = await chromium.launch();
  const lista = nyaKontroller().filter((k) => !urval.length || urval.includes(k.nr));
  let fel = 0; const wk = {};
  console.log(`Felbanken (${rot}) – ${new Date().toLocaleString('sv-SE')}`);
  console.log(`Verktyg: ${Object.entries({ ...verktygsversioner(), chromium: brow.version() }).map(([k, v]) => `${k} ${v}`).join(', ')}\n`);
  for (const k of lista) {
    if (!(k.felbank || []).length) { fel++; console.log(`${k.nr.padEnd(5)} FEL  saknar felsida`); continue; }
    for (const fall of [...k.felbank.map((f) => ({ ...f, ska: 'fel' })), { sidor: ['/ren.html', '/ren-2.html'], ska: 'ren' }]) {
      const over = fall.miljo || {};
      const m = { bas: b, rot, browser: brow, sidor: fall.sidor, alla: fall.sidor, start: fall.sidor[0], felbank: true,
        fakta: readFileSync(join(rot, 'fakta.md'), 'utf8'), sidkarta: lasSidkarta(readFileSync(join(rot, 'sidkarta.md'), 'utf8')),
        kallor: fall.sidor.map((x) => join(rot, x)), kallrot: rot, headersFil: join(rot, '_headers-saknas'),
        sitemap: join(rot, over.sitemap || 'ren-sitemap.xml'), robots: join(rot, over.robots || 'ren-robots.txt'),
        hamta: (p, init) => fetch(b + p, { redirect: 'manual', ...init }), webkitP: wk.p };
      const t0 = Date.now();
      const fynd = await korKontroll(k, m);
      if (m.webkitP) wk.p = m.webkitP;
      const riktiga = fynd.filter((f) => !f.info), stoppande = riktiga.filter((f) => f.stopp).length;
      // stopp: true kräver minst ett stoppande fynd, stopp: false att inget fynd stoppar.
      const ok = fall.ska === 'fel' ? riktiga.length > 0 && (fall.stopp === undefined || (fall.stopp ? stoppande > 0 : stoppande === 0)) : riktiga.length === 0;
      if (!ok) fel++;
      const visa = sammanfatta(fall.ska === 'fel' && !riktiga.length ? fynd : riktiga, fall.sidor.length);
      const vad = fall.ska === 'ren' ? 'ren    ' : fall.stopp === true ? 'stoppar' : fall.stopp === false ? 'rapport' : 'fångar ';
      console.log(`${k.nr.padEnd(5)} ${(ok ? 'ok' : 'FEL').padEnd(4)} ${vad} ${fall.sidor.join(' ').padEnd(30)} ${riktiga.length} fynd${stoppande ? ` (${stoppande} stoppar)` : ''}${visa.length ? ': ' + visa.slice(0, 3).join(' | ').slice(0, 300) : ''} (${((Date.now() - t0) / 1000).toFixed(1)} s)`);
    }
  }
  await brow.close(); if (wk.p) await (await wk.p).close(); s.close();
  console.log(fel ? `\n${fel} fall gick inte som de skulle.` : `\nAlla ${lista.length} kontroller fångar sitt fel och ger noll fynd på ren.html och ren-2.html.`);
  process.exit(fel ? 1 : 0);
}

// ---------------------------------------------------------------------------------------------------------------------------------
// Filer och HTML

function sidfil(rot, s) {
  const p = decodeURIComponent(s.split(/[?#]/)[0]);
  for (const f of [join(rot, p), join(rot, p, 'index.html'), join(rot, p.replace(/\/$/, '') + '.html')]) if (existsSync(f) && statSync(f).isFile()) return f;
  if (s === '/finns-inte/' && existsSync(join(rot, '404.html'))) return join(rot, '404.html');
  return null;
}
function lasSida(m, s) { const f = sidfil(m.rot, s); return f ? readFileSync(f, 'utf8') : ''; }
function taggar(html, namn) { return [...html.matchAll(new RegExp(`<${namn}\\b[^>]*>`, 'gi'))].map((x) => x[0]); }
function attr(tag, namn) { const x = tag.match(new RegExp(`\\s${namn}\\s*=\\s*(?:"([^"]*)"|'([^']*)'|([^\\s"'>]+))`, 'i')); return x ? avkoda(x[1] ?? x[2] ?? x[3]) : null; }
function avkoda(t) { return String(t).replace(/&quot;/g, '"').replace(/&#39;|&apos;/g, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&nbsp;/g, ' ').replace(/&#x([0-9a-f]+);/gi, (_, h) => String.fromCodePoint(parseInt(h, 16))).replace(/&#(\d+);/g, (_, d) => String.fromCodePoint(Number(d))).replace(/&amp;/g, '&'); }
function rensa(p) { return decodeURIComponent(p).replace(/index\.html$/, ''); }
function normText(t) { return String(t).toLowerCase().replace(/[\s ]+/g, ' ').trim(); }
function huvudAv(html) {
  const meta = (nyckel, varde) => { const t = taggar(html, 'meta').find((x) => (attr(x, nyckel) || '').toLowerCase() === varde); return t ? attr(t, 'content') ?? '' : null; };
  const lank = (rel) => { const t = taggar(html, 'link').find((x) => (attr(x, 'rel') || '').toLowerCase().split(/\s+/).includes(rel)); return t ? attr(t, 'href') ?? '' : null; };
  return { titel: html.match(/<title[^>]*>([^<]*)<\/title>/i)?.[1]?.trim() || null, beskrivning: meta('name', 'description'), kanonisk: lank('canonical'), ogUrl: meta('property', 'og:url'),
    ogBild: meta('property', 'og:image'), robots: meta('name', 'robots'), viewport: meta('name', 'viewport'), csp: meta('http-equiv', 'content-security-policy') };
}
function synligText(html) { return avkoda(html.replace(/<(script|style|template|noscript)\b[\s\S]*?<\/\1>/gi, ' ').replace(/<[^>]+>/g, ' ')).replace(/[\s ]+/g, ' '); }
function sidansJsonld(html) {
  return [...html.matchAll(/<script\b[^>]*type\s*=\s*["']?application\/ld\+json["']?[^>]*>([\s\S]*?)<\/script>/gi)].map((x) => { try { return JSON.parse(x[1]); } catch (e) { return { __fel: String(e).slice(0, 80) }; } });
}
function plattaJsonld(x) { const ut = []; const g = (o) => { if (Array.isArray(o)) return o.forEach(g); if (!o || typeof o !== 'object') return; ut.push(o); for (const v of Object.values(o)) if (v && typeof v === 'object') g(v); }; g(x); return ut; }
function sidansCss(rot, html) {
  const ut = [];
  for (const t of taggar(html, 'link')) {
    if (!(attr(t, 'rel') || '').toLowerCase().split(/\s+/).includes('stylesheet')) continue;
    const h = attr(t, 'href'); if (!h || /^(https?:)?\/\//.test(h)) continue;
    const f = join(rot, decodeURIComponent(h.split(/[?#]/)[0])); if (existsSync(f)) ut.push({ namn: h, text: readFileSync(f, 'utf8') });
  }
  for (const x of html.matchAll(/<style\b[^>]*>([\s\S]*?)<\/style>/gi)) ut.push({ namn: '<style>', text: x[1] });
  return ut;
}
function sidansJs(rot, html) {
  const ut = [];
  for (const x of html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/gi)) {
    const typ = (attr(x[0], 'type') || '').toLowerCase(); if (typ && !/javascript|module/.test(typ)) continue;
    const src = attr(`<script ${x[1]}>`, 'src');
    if (src) { if (/^(https?:)?\/\//.test(src)) continue; const f = join(rot, decodeURIComponent(src.split(/[?#]/)[0])); if (existsSync(f)) ut.push({ namn: src, text: readFileSync(f, 'utf8') }); }
    else if (x[2].trim()) ut.push({ namn: 'inline-skript', text: x[2] });
  }
  return ut;
}
// Alla stilmallar som sidorna använder, en gång var.
function cssFiler(m) {
  const ut = new Map();
  // Inbäddade stilar som är lika på flera sidor räknas en gång, med den första sidan som namn.
  for (const s of m.alla) for (const c of sidansCss(m.rot, lasSida(m, s))) { const nyckel = c.namn === '<style>' ? `<style>${c.text}` : c.namn; if (!ut.has(nyckel)) ut.set(nyckel, { ...c, namn: c.namn === '<style>' ? `<style> på ${s}` : c.namn }); }
  return [...ut.values()];
}
// Sidkartan: söksträngarna (numrerad lista under ## Söksträngar) och tabellen med kolumnerna Adress och Söksträngar
// (nummer ur listan eller strängarna själva, som i .claude/skills/struktur/sidkarta.md).
function lasSidkarta(text) {
  const nummer = {};
  const avsnitt = text.split(/^## /m).find((a) => /^Söksträngar/i.test(a));
  if (avsnitt) for (const x of avsnitt.matchAll(/^\s*(\d+)\.\s+(.+)$/gm)) nummer[x[1]] = x[2].trim();
  let kol = null; const ut = [];
  for (const r of text.split('\n').filter((x) => /^\s*\|/.test(x))) {
    const c = r.trim().replace(/^\||\|$/g, '').split('|').map((x) => x.trim());
    if (c.some((x) => /^Adress$/i.test(x)) && c.some((x) => /Söksträng/i.test(x))) { kol = { adress: c.findIndex((x) => /^Adress$/i.test(x)), sok: c.findIndex((x) => /Söksträng/i.test(x)) }; continue; }
    if (!kol || c.every((x) => /^:?-+:?$/.test(x))) continue;
    const adress = ((c[kol.adress] || '').match(/`([^`]+)`/) || [, c[kol.adress] || ''])[1].trim(), cell = (c[kol.sok] || '').trim();
    if (!adress.startsWith('/') || /^[–-]?$/.test(cell)) continue;
    const strangar = (/^[\d,\s]+$/.test(cell) ? cell.split(/[,\s]+/).filter(Boolean).map((n) => nummer[n]).filter(Boolean) : [cell])
      .flatMap((x) => x.split(',')).map((x) => x.trim()).filter((x) => x && !/^[–-]$/.test(x) && !/[[\]…]/.test(x));
    ut.push({ adress, strangar });
  }
  return ut;
}

// ---------------------------------------------------------------------------------------------------------------------------------
// N2-kontrollerna som läser filer

async function k2d(m) {
  const hv2 = new HtmlValidate(new StaticConfigLoader({ rules: { 'input-missing-label': 'error', 'valid-autocomplete': 'error' } }));
  const ut = [];
  for (const s of m.sidor) { const f = sidfil(m.rot, s); if (!f) continue; for (const x of (await hv2.validateFile(f)).results.flatMap((r) => r.messages)) if (x.severity === 2) ut.push({ sida: s, text: `${x.ruleId}: ${x.message}` }); }
  return ut;
}
async function k2e(m) {
  const hv2 = new HtmlValidate(new StaticConfigLoader({ rules: { 'wcag/h63': 'error' } }));
  const ut = [];
  for (const s of m.sidor) {
    const f = sidfil(m.rot, s); if (!f) continue;
    for (const x of (await hv2.validateFile(f)).results.flatMap((r) => r.messages)) if (x.severity === 2) ut.push({ sida: s, text: `wcag/h63: ${x.message}` });
    for (const t of readFileSync(f, 'utf8').matchAll(/<table\b([^>]*)>([\s\S]*?)<\/table>/gi)) {
      if (/role\s*=\s*["']?(presentation|none)/i.test(t[1])) continue;
      if (!/<caption\b/i.test(t[2]) && !/aria-label(ledby)?\s*=/i.test(t[1])) ut.push({ sida: s, text: 'datatabell utan caption eller aria-labelledby' });
    }
  }
  return ut;
}
function k3f(m) {
  const ut = [];
  for (const s of m.alla) {
    const html = lasSida(m, s); if (!taggar(html, 'meta').some((t) => (attr(t, 'name') || '').toLowerCase() === 'viewport' && /viewport-fit\s*=\s*cover/i.test(attr(t, 'content') || ''))) continue;
    const css = sidansCss(m.rot, html).map((x) => x.text).join('\n');
    const saknas = ['left', 'right'].filter((k) => !css.includes(`safe-area-inset-${k}`));
    if (saknas.length) ut.push({ sida: s, text: `viewport-fit=cover, men stilarna använder inte ${saknas.map((k) => `env(safe-area-inset-${k})`).join(' eller ')}` });
  }
  return ut;
}
async function k9b(m) { return lighthouseFynd(await lighthouseMat(m.bas, m.sidor, { lagen: [['mobil', undefined]] })); }
function k9f(m) {
  const ut = [];
  for (const s of m.alla) {
    const html = lasSida(m, s);
    const hog = ['img', 'link', 'script', 'iframe', 'source'].flatMap((n) => taggar(html, n)).filter((t) => (attr(t, 'fetchpriority') || '').toLowerCase() === 'high');
    if (hog.length > 1) ut.push({ sida: s, text: `${hog.length} element med fetchpriority="high"` });
    for (const t of hog) if ((attr(t, 'loading') || '').toLowerCase() === 'lazy') ut.push({ sida: s, text: `fetchpriority="high" och loading="lazy" på samma element: ${t.slice(0, 70)}` });
    for (const t of taggar(html, 'video')) {
      const saknas = ['width', 'height', 'poster'].filter((a) => attr(t, a) === null);
      const pre = attr(t, 'preload'); if (pre === null || pre === '' || pre.toLowerCase() === 'auto') saknas.push('preload som inte är auto');
      if (saknas.length) ut.push({ sida: s, text: `video utan ${saknas.join(', ')}` });
    }
  }
  return ut;
}
async function k10cPlus(m) {
  const astro = allaFiler(join(m.rot, '_astro')).sort((a, b) => statSync(a).size - statSync(b).size)[0];
  const ut = [];
  for (const p of [...m.sidor, ...(astro ? ['/' + relative(m.rot, astro).split(sep).join('/')] : [])]) {
    const s = await m.hamta(p); await s.arrayBuffer(); const v = s.headers.get('cross-origin-resource-policy');
    if (!v) ut.push({ sida: p, text: 'saknar Cross-Origin-Resource-Policy' });
    else if (!/^(same-origin|same-site)$/i.test(v.trim())) ut.push({ sida: p, text: `har Cross-Origin-Resource-Policy: ${v}` });
  }
  return ut;
}
function cspIHeaders(fil) {
  if (!fil || !existsSync(fil)) return () => [];
  const block = []; let b = null;
  for (const rad of readFileSync(fil, 'utf8').split('\n')) {
    if (!rad.trim() || rad.trim().startsWith('#')) continue;
    if (!/^\s/.test(rad)) { b = { monster: new RegExp('^' + rad.trim().replace(/[.+?^${}()|[\]\\]/g, '\\$&').replace(/\*/g, '.*') + '$'), csp: [] }; block.push(b); }
    else if (b) { const [n, ...v] = rad.trim().split(':'); if (n.trim().toLowerCase() === 'content-security-policy') b.csp.push(v.join(':').trim()); }
  }
  return (p) => block.filter((x) => x.monster.test(p)).flatMap((x) => x.csp);
}
function k10d(m) {
  const { CspParser } = kraver('csp_evaluator/dist/parser.js');
  const { evaluateForFailure, evaluateForSyntaxErrors } = kraver('csp_evaluator/dist/lighthouse/lighthouse_checks.js');
  const { Severity } = kraver('csp_evaluator/dist/finding.js');
  const huvud = cspIHeaders(m.headersFil), ut = [];
  for (const s of m.alla) {
    const html = lasSida(m, s); if (!html) continue;
    const policyer = [...taggar(html, 'meta').filter((t) => (attr(t, 'http-equiv') || '').toLowerCase() === 'content-security-policy').map((t) => attr(t, 'content') || ''), ...huvud(s)].filter(Boolean);
    if (!policyer.length) { ut.push({ sida: s, text: 'ingen CSP i meta eller _headers' }); continue; }
    const tolkade = policyer.map((p) => new CspParser(p).csp);
    for (const f of evaluateForFailure(tolkade)) if (f.severity === Severity.HIGH) ut.push({ sida: s, text: `HIGH ${f.directive}: ${f.description.slice(0, 120)}` });
    evaluateForSyntaxErrors(tolkade).forEach((l, i) => l.forEach((f) => ut.push({ sida: s, text: `syntaxfel i policy ${i + 1}: ${f.description.slice(0, 120)}` })));
  }
  return ut;
}
function k10e(m) {
  const sankor = [[/\.innerHTML\s*\+?=(?!=)/, 'innerHTML'], [/\.outerHTML\s*=(?!=)/, 'outerHTML'], [/\binsertAdjacentHTML\s*\(/, 'insertAdjacentHTML'], [/\bdocument\.write(?:ln)?\s*\(/, 'document.write'],
    [/(?<![\w.$])eval\s*\(/, 'eval'], [/\bnew\s+Function\s*\(/, 'new Function'], [/dangerouslySetInnerHTML/, 'dangerouslySetInnerHTML'], [/\bset(?:Timeout|Interval)\s*\(\s*['"`]/, 'setTimeout eller setInterval med sträng']];
  const blank = (x) => x.replace(/[^\n]/g, ' ');
  const ut = [];
  for (const f of m.kallor) {
    if (!existsSync(f)) continue;
    const t = readFileSync(f, 'utf8').replace(/\/\*[\s\S]*?\*\//g, blank).replace(/<!--[\s\S]*?-->/g, blank).replace(/(^|[^:\w"'`\\])\/\/[^\n]*/g, (x, a) => a + blank(x.slice(a.length)));
    t.split('\n').forEach((rad, i) => { for (const [re, namn] of sankor) if (re.test(rad)) ut.push({ text: `${relative(m.kallrot, f)}:${i + 1}: ${namn}` }); });
  }
  return ut;
}
async function k10f(m) {
  const punkter = new Set();
  for (const s of m.sidor) {
    const html = lasSida(m, s);
    for (const t of taggar(html, '[a-z][a-z0-9-]*')) { const l = attr(t, 'data-logg'); if (l?.startsWith('/')) punkter.add(l); }
    for (const t of taggar(html, 'form')) if ((attr(t, 'method') || '').toLowerCase() === 'post') { const a = attr(t, 'action'); if (a?.startsWith('/')) punkter.add(a); }
  }
  if (!punkter.size) return [{ text: 'inga POST-mottagare i sidorna', info: true }];
  const ursprung = new URL(m.bas).origin, ut = [];
  const post = (p, h) => m.hamta(p, { method: 'POST', headers: { 'content-type': 'application/json', ...h }, body: '{}' });
  for (const p of punkter) {
    const a = await post(p, { origin: ursprung, 'sec-fetch-site': 'cross-site', 'sec-fetch-mode': 'cors' }); await a.arrayBuffer();
    if (a.status !== 403) ut.push({ text: `${p}: POST med Sec-Fetch-Site: cross-site ger ${a.status}, inte 403` });
    const b = await post(p, { origin: 'https://annan-sajt.invalid' }); await b.arrayBuffer();
    if (b.status !== 403) ut.push({ text: `${p}: POST med fel Origin ger ${b.status}, inte 403` });
    const c = await post(p, { origin: ursprung }); await c.arrayBuffer();
    if (c.status === 403) ut.push({ text: `${p}: POST med rätt Origin och utan Sec-Fetch-* ger 403` });
    const d = await m.hamta(p, { method: 'GET' }); await d.arrayBuffer();
    if (d.status !== 405) ut.push({ text: `${p}: GET ger ${d.status}, inte 405` });
  }
  return ut;
}
function k11(m) {
  const filer = m.felbank ? m.sidor.map((s) => sidfil(m.rot, s)).filter(Boolean) : allaFiler(m.rot).filter((f) => f.endsWith('.html'));
  const ut = [], idCache = new Map();
  const idn = (f) => { if (!idCache.has(f)) idCache.set(f, new Set([...readFileSync(f, 'utf8').matchAll(/\s(?:id|name)\s*=\s*["']?([^"'\s>]+)/gi)].map((x) => avkoda(x[1])))); return idCache.get(f); };
  for (const f of filer) {
    const html = readFileSync(f, 'utf8');
    const sida = '/' + relative(m.rot, f).split(sep).join('/').replace(/index\.html$/, '');
    const kanon = huvudAv(html).kanonisk; let egen = null; try { egen = kanon ? new URL(kanon).origin : null; } catch { /* relativ */ }
    const vardet = new Set();
    for (const t of [...taggar(html, 'a'), ...taggar(html, 'link'), ...taggar(html, 'img'), ...taggar(html, 'script'), ...taggar(html, 'source'), ...taggar(html, 'area')]) {
      if (/^<link/i.test(t) && /\b(canonical|alternate)\b/i.test(attr(t, 'rel') || '')) continue;
      for (const v of [attr(t, 'href'), attr(t, 'src')].filter(Boolean)) {
        if (/^(tel|mailto|javascript|data|sms):/i.test(v) || v === '#' || vardet.has(v)) continue; vardet.add(v);
        let u; try { u = new URL(v, 'http://intern' + sida); } catch { ut.push({ sida, text: `ogiltig adress ${v}` }); continue; }
        if (u.host !== 'intern' && u.origin !== egen) continue;
        const p = u.pathname; if (p.startsWith('/cdn-cgi/')) continue;
        const mal = p === sida ? f : sidfil(m.rot, p);
        if (!mal) { ut.push({ sida, text: `trasig länk: ${v}` }); continue; }
        const frag = decodeURIComponent(u.hash.slice(1));
        if (frag && frag !== 'top' && mal.endsWith('.html') && !idn(mal).has(frag)) ut.push({ sida, text: `ankaret finns inte: ${v}` });
      }
    }
  }
  return ut;
}
function k12(m) {
  const ut = [], siffror = (t) => String(t).replace(/\D/g, '').replace(/^46/, '0');
  const tel = (m.fakta.match(/\|\s*Telefon\s*\|\s*([0-9 +()-]+)\|/) || [])[1]; const telF = tel ? siffror(tel) : null;
  // Typerna under LocalBusiness som sajterna kan använda (schema.org; utan vokabulären är listan ungefärlig). Organization och
  // MedicalOrganization kräver ingen adress hos Google och räknas inte.
  const foretagstyp = /^(LocalBusiness|ProfessionalService|Physician|Dentist|Optician|Pharmacy|Physiotherapy|Plumber|Electrician|Locksmith|HousePainter|RoofingContractor|GeneralContractor|HVACBusiness|MovingCompany|AutoRepair|Attorney|Notary|AccountingService|RealEstateAgent|TravelAgency|DaySpa|HealthClub|ChildCare|DryCleaningOrLaundry)$|(Business|Store|Shop|Clinic|Restaurant|CafeOrCoffeeShop|Bakery|Hotel|Salon|Agency|Contractor)$/;
  for (const s of m.sidor) {
    const html = lasSida(m, s); if (!html) continue;
    const text = synligText(html), textN = normText(text), textSiffror = text.replace(/[\s \-–()]/g, '');
    for (const block of sidansJsonld(html)) {
      if (block.__fel) { ut.push({ sida: s, text: `JSON-LD går inte att läsa: ${block.__fel}`, stopp: true }); continue; }
      for (const o of plattaJsonld(block)) {
        const typer2 = [].concat(o['@type'] || []), typ = typer2.join(', '); if (!typ || !(typer2.some((t) => foretagstyp.test(t)) || ('address' in o && 'telephone' in o))) continue;
        if (!o.name) ut.push({ sida: s, text: `${typ} saknar name`, stopp: true });
        const adr = [].concat(o.address || [])[0];
        if (!adr || (typeof adr === 'object' && !adr.streetAddress)) ut.push({ sida: s, text: `${typ} saknar address med streetAddress`, stopp: true });
        if (o.telephone && telF && siffror(o.telephone) !== telF) ut.push({ sida: s, text: `${typ}: telefonen ${o.telephone} är inte numret i fakta.md`, stopp: true });
        if (o.name && !textN.includes(normText(o.name))) ut.push({ sida: s, text: `namnet ”${o.name}” syns inte i sidans text`, stopp: false });
        if (adr?.streetAddress && !textN.includes(normText(adr.streetAddress))) ut.push({ sida: s, text: `adressen ”${adr.streetAddress}” syns inte i sidans text`, stopp: false });
        if (o.telephone && !textSiffror.includes(siffror(o.telephone)) && !textSiffror.includes('+46' + siffror(o.telephone).slice(1))) ut.push({ sida: s, text: `telefonen ${o.telephone} syns inte i sidans text`, stopp: false });
      }
    }
  }
  return ut;
}
function k12b(m) {
  const loc = new Map();
  if (existsSync(m.sitemap)) for (const x of readFileSync(m.sitemap, 'utf8').matchAll(/<loc>([^<]+)<\/loc>/g)) { try { loc.set(rensa(new URL(x[1].trim()).pathname), x[1].trim()); } catch { /* 12c */ } }
  const sidvagar = new Set(m.sidor.map(rensa)), ut = [];
  for (const s of m.sidor) {
    const html = lasSida(m, s); if (!html) continue; const h = huvudAv(html);
    if (!h.kanonisk) ut.push({ sida: s, text: 'kanonisk adress saknas', stopp: true });
    else {
      let u = null; try { u = new URL(h.kanonisk); } catch { /* relativ */ }
      if (!u) ut.push({ sida: s, text: `kanonisk adress är inte absolut: ${h.kanonisk}`, stopp: true });
      else {
        if (u.protocol !== 'https:') ut.push({ sida: s, text: `kanonisk adress är inte https: ${h.kanonisk}`, stopp: true });
        if (rensa(u.pathname) !== rensa(s)) ut.push({ sida: s, text: `kanonisk adress pekar på ${u.pathname}`, stopp: true });
        if (h.ogUrl !== null && h.ogUrl !== h.kanonisk) ut.push({ sida: s, text: `og:url ${h.ogUrl} är inte den kanoniska adressen`, stopp: false });
        const l = loc.get(rensa(s)); if (l && l !== h.kanonisk) ut.push({ sida: s, text: `sitemapens adress ${l} är inte den kanoniska`, stopp: false });
      }
    }
    if (/noindex/i.test(h.robots || '')) ut.push({ sida: s, text: 'meta robots noindex', stopp: true });
    if (h.ogUrl === null) ut.push({ sida: s, text: 'og:url saknas', stopp: false });
    if (!h.ogBild) ut.push({ sida: s, text: 'og:image saknas', stopp: false });
    for (const t of taggar(html, 'a')) {
      const v = attr(t, 'href'); if (!v || !v.startsWith('/') || v.startsWith('//')) continue;
      const p = v.split(/[?#]/)[0]; if (p && !p.endsWith('/') && !extname(p) && sidvagar.has(p + '/')) ut.push({ sida: s, text: `länk till ${p} i stället för ${p}/`, stopp: false });
    }
  }
  return ut;
}
function genomsok(rot, start) {
  const ko = [start], sett = new Set([start]);
  while (ko.length) {
    const s = ko.shift(), f = sidfil(rot, s); if (!f || !f.endsWith('.html')) continue;
    for (const t of taggar(readFileSync(f, 'utf8'), 'a')) {
      const v = attr(t, 'href'); if (!v) continue; let u; try { u = new URL(v, 'http://intern' + s); } catch { continue; }
      if (u.host !== 'intern' || sett.has(u.pathname) || (extname(u.pathname) && extname(u.pathname) !== '.html') || !sidfil(rot, u.pathname)) continue;
      sett.add(u.pathname); ko.push(u.pathname);
    }
  }
  return [...sett];
}
function k12c(m) {
  if (!existsSync(m.sitemap)) return [{ text: 'sitemap.xml saknas' }];
  const ut = [], sett = new Set();
  for (const x of readFileSync(m.sitemap, 'utf8').matchAll(/<loc>([^<]+)<\/loc>/g)) {
    const l = x[1].trim(); let p; try { p = new URL(l).pathname; } catch { ut.push({ text: `ogiltig adress i sitemapen: ${l}` }); continue; }
    sett.add(rensa(p)); const f = sidfil(m.rot, p);
    if (!f) { ut.push({ text: `${p} står i sitemapen men finns inte i bygget` }); continue; }
    const h = huvudAv(readFileSync(f, 'utf8'));
    if (h.kanonisk && h.kanonisk !== l) ut.push({ text: `${p} har en annan kanonisk adress än sitemapens (${h.kanonisk})` });
    if (/noindex/i.test(h.robots || '')) ut.push({ text: `${p} står i sitemapen men har noindex` });
  }
  const nadda = genomsok(m.rot, m.start);
  for (const p of nadda) {
    if (sett.has(rensa(p))) continue; const f = sidfil(m.rot, p);
    if (!/noindex/i.test(huvudAv(f ? readFileSync(f, 'utf8') : '').robots || '')) ut.push({ text: `${p} nås från startsidan men står inte i sitemapen` });
  }
  // C24: ingen föräldralös sida. En sida i sitemapen som länkarna från startsidan inte når (Google, crawlbara länkar) stoppar.
  const naddaRensade = new Set(nadda.map(rensa));
  for (const p of sett) if (!naddaRensade.has(p) && sidfil(m.rot, p)) ut.push({ text: `${p} står i sitemapen men nås inte med länkar från startsidan (föräldralös sida, C24)`, stopp: true });
  if (!existsSync(m.robots) || !/^\s*sitemap\s*:/im.test(readFileSync(m.robots, 'utf8'))) ut.push({ text: 'robots.txt saknar en Sitemap-rad' });
  return ut;
}
function k12d(m) {
  if (!existsSync(m.sitemap)) return [];
  const urls = [...readFileSync(m.sitemap, 'utf8').matchAll(/<url>([\s\S]*?)<\/url>/g)].map((x) => x[1]);
  const lm = urls.map((u) => u.match(/<lastmod>([^<]+)<\/lastmod>/)?.[1]?.trim()), ut = [];
  const utan = lm.filter((x) => !x).length; if (utan) ut.push({ text: `lastmod saknas på ${utan} av ${urls.length} adresser` });
  if (urls.length > 3 && !utan && new Set(lm).size === 1) ut.push({ text: `alla ${urls.length} adresser har samma lastmod (${lm[0]})` });
  return ut;
}
function k12e(m) {
  const ut = [];
  for (const s of m.sidor) {
    const html = lasSida(m, s); if (!html) continue; const h = huvudAv(html);
    for (const [k, n] of [['titel', '<title>'], ['beskrivning', 'metabeskrivningen'], ['kanonisk', 'den kanoniska adressen']]) if (!h[k]) ut.push({ sida: s, text: `${n} saknas i den byggda HTML:en` });
    if (s === m.start && !sidansJsonld(html).length) ut.push({ sida: s, text: 'JSON-LD saknas i den byggda HTML:en' });
    for (const { namn, text } of sidansJs(m.rot, html)) for (const [re, vad] of [[/document\.title\s*=(?!=)/, 'document.title'], [/(?:querySelector(?:All)?|getElementsBy\w+)\(\s*['"`][^'"`]*(?:canonical|robots|description)/i, 'den kanoniska adressen, robots eller beskrivningen']]) if (re.test(text)) ut.push({ sida: s, text: `${namn} ändrar ${vad}` });
  }
  return ut;
}
function k12f(m) {
  const ut = [];
  for (const s of m.sidor) {
    const f = sidfil(m.rot, s); if (!f) continue; const st = statSync(f).size;
    if (st > 2 * 1024 * 1024) ut.push({ sida: s, text: `HTML:en är ${(st / 1048576).toFixed(1).replace('.', ',')} MB` });
    for (const { namn, text } of sidansJs(m.rot, readFileSync(f, 'utf8'))) if (/history\.(?:push|replace)State\s*\(/.test(text)) ut.push({ sida: s, text: `${namn} anropar history.pushState eller replaceState; det ska bara ske efter en handling` });
  }
  return ut;
}
function k12g(m) {
  const nycklar = ['url', 'image', 'logo', '@id', 'sameAs', 'item', 'contentUrl', 'thumbnailUrl', 'hasMap', 'mainEntityOfPage', 'photo'], ut = [];
  for (const s of m.sidor) for (const block of sidansJsonld(lasSida(m, s))) {
    if (block.__fel) continue;
    for (const b of [].concat(block)) { const c = b['@context']; if (c === undefined || !/^https:\/\/schema\.org\/?$/.test(String(c))) ut.push({ sida: s, text: `@context är ${c === undefined ? 'inte angivet' : JSON.stringify(c)}, inte https://schema.org` }); }
    for (const o of plattaJsonld(block)) for (const [k, v] of Object.entries(o)) {
      if (nycklar.includes(k)) for (const x of [].concat(v)) if (typeof x === 'string' && !/^https?:\/\//.test(x)) ut.push({ sida: s, text: `${k} är inte en absolut adress: ${x}` });
      if (typeof v === 'string' && /\[\[|platshållare|lorem ipsum|example\.(?:com|org)|\bTODO\b/i.test(v)) ut.push({ sida: s, text: `platshållare i ${k}: ${v.slice(0, 50)}` });
    }
  }
  return ut;
}

// 12h. Ikonerna i varje sidas huvud: <link rel="icon"> där minst en är kvadratisk och helst större än 48 × 48 px (SVG räknas som skalbar),
// <link rel="apple-touch-icon"> och <link rel="manifest"> med giltig JSON, och filerna finns (Google, Favicon in Search).
async function k12h(m) {
  const ut = [], matt = new Map();
  const fil = (href, s) => { try { const u = new URL(href, 'http://intern' + s); return u.host === 'intern' ? sidfil(m.rot, u.pathname) : null; } catch { return null; } };
  for (const s of m.sidor) {
    const html = lasSida(m, s); if (!html) continue;
    const lankar = taggar(html, 'link').map((t) => ({ rel: (attr(t, 'rel') || '').toLowerCase().split(/\s+/), href: attr(t, 'href') })).filter((l) => l.href);
    const ikoner = lankar.filter((l) => l.rel.includes('icon')), apple = lankar.filter((l) => l.rel.includes('apple-touch-icon') || l.rel.includes('apple-touch-icon-precomposed')), manifest = lankar.filter((l) => l.rel.includes('manifest'));
    if (!ikoner.length) ut.push({ sida: s, text: 'ingen <link rel="icon">' });
    else {
      const storlekar = [];
      for (const l of ikoner) {
        const f = fil(l.href, s); if (!f) { ut.push({ sida: s, text: `ikonen ${l.href} finns inte i bygget` }); continue; }
        if (!matt.has(f)) matt.set(f, await bildMatt(f)); const x = matt.get(f); if (x) storlekar.push(x);
      }
      const kvadrat = storlekar.filter((x) => Math.abs(x.b - x.h) < 0.5);
      if (storlekar.length && !kvadrat.length) ut.push({ sida: s, text: `ingen kvadratisk favicon (${storlekar.map((x) => `${x.b} × ${x.h}`).join(', ')})` });
      else if (kvadrat.length && !kvadrat.some((x) => x.skalbar || x.b > 48)) ut.push({ sida: s, text: `favicon högst ${Math.max(...kvadrat.map((x) => x.b))} px; helst större än 48 × 48 px` });
    }
    if (!apple.length) ut.push({ sida: s, text: 'ingen <link rel="apple-touch-icon">' });
    for (const l of apple) if (!fil(l.href, s)) ut.push({ sida: s, text: `apple-touch-icon ${l.href} finns inte i bygget` });
    if (!manifest.length) ut.push({ sida: s, text: 'inget webbmanifest (<link rel="manifest">, site.webmanifest)' });
    for (const l of manifest) {
      const f = fil(l.href, s); if (!f) { ut.push({ sida: s, text: `webbmanifestet ${l.href} finns inte i bygget` }); continue; }
      try { JSON.parse(readFileSync(f, 'utf8')); } catch { ut.push({ sida: s, text: `webbmanifestet ${l.href} är inte giltig JSON` }); }
    }
  }
  return ut;
}
// Bredd och höjd för en ikonfil: PNG och ICO ur huvudet, SVG ur viewBox eller width och height (skalbar), annat med sharp.
async function bildMatt(f) {
  const b = readFileSync(f), typ = extname(f).toLowerCase();
  if (b.length > 24 && b.readUInt32BE(0) === 0x89504e47) return { b: b.readUInt32BE(16), h: b.readUInt32BE(20) };
  if (typ === '.ico' && b.length >= 22 && b.readUInt16LE(2) === 1) { let st = { b: 0, h: 0 }; for (let i = 0; i < b.readUInt16LE(4) && 6 + 16 * i + 2 <= b.length; i++) { const x = { b: b[6 + 16 * i] || 256, h: b[7 + 16 * i] || 256 }; if (x.b * x.h > st.b * st.h) st = x; } return st.b ? st : null; }
  if (typ === '.svg') {
    const t = b.toString('utf8'), rot = t.match(/<svg\b[^>]*>/i)?.[0] || '';
    const vb = (attr(rot, 'viewBox') || '').trim().split(/[\s,]+/).map(Number);
    if (vb.length === 4 && vb[2] > 0 && vb[3] > 0) return { b: vb[2], h: vb[3], skalbar: true };
    const [w, h] = [parseFloat(attr(rot, 'width')), parseFloat(attr(rot, 'height'))]; return w > 0 && h > 0 ? { b: w, h, skalbar: true } : null;
  }
  try { const x = await (await import('sharp')).default(b).metadata(); return x.width ? { b: x.width, h: x.height } : null; } catch { return null; }
}
// 8q. En regel för :visited med en färgegenskap i någon av sidornas stilmallar. Webbläsaren låter bara färger ändras för :visited, och
// getComputedStyle svarar som om länken är obesökt (MDN, Privacy and the :visited selector), så stilmallen läses i stället för sidan.
function k8q(m) {
  const farg = /^(color|background-color|background|border(-(top|right|bottom|left|block|inline)(-(start|end))?)?(-color)?|outline(-color)?|text-decoration(-color)?|text-emphasis-color|column-rule(-color)?|caret-color|fill|stroke)$/;
  for (const { text } of cssFiler(m)) for (const r of tolkaCss(text)) if (/:visited\b/i.test(forfader(r).concat(r.val).join(' ')) && r.dekl.some((d) => farg.test(d.p))) return [];
  return [{ text: 'ingen regel för :visited med en färg i stilmallarna, så besökta länkar ser ut som obesökta' }];
}

// En enkel tolk för byggd (minifierad) CSS: regler i dokumentordning med selektor, förfäder (at-regler och nästling) och deklarationer.
// Varje deklaration får ett löpnummer i, så att ordningen går att jämföra över regler.
function tolkaCss(text) {
  text = text.replace(/\/\*[\s\S]*?\*\//g, '');
  const regler = [], rotNod = { val: '', far: null, dekl: [] }, stack = [rotNod];
  let buf = '', paren = 0, str = null, i2 = 0;
  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    if (str) { buf += ch; if (ch === '\\') buf += text[++i] ?? ''; else if (ch === str) str = null; continue; }
    if (ch === '"' || ch === "'") { str = ch; buf += ch; continue; }
    if (ch === '(') paren++; else if (ch === ')') paren = Math.max(0, paren - 1);
    if (paren > 0) { buf += ch; continue; }
    if (ch === '{') { const nod = { val: buf.trim().replace(/\s+/g, ' '), far: stack.at(-1), dekl: [], i: i2++ }; regler.push(nod); stack.push(nod); buf = ''; continue; }
    if (ch === ';' || ch === '}') {
      const d = buf.trim(); buf = '';
      if (d && !d.startsWith('@')) { const k = d.indexOf(':'); if (k > 0) stack.at(-1).dekl.push({ p: d.slice(0, k).trim().toLowerCase(), v: d.slice(k + 1).replace(/!important\s*$/i, '').trim(), i: i2++ }); }
      if (ch === '}' && stack.length > 1) stack.pop();
      continue;
    }
    buf += ch;
  }
  return regler;
}
function forfader(r) { const ut = []; for (let x = r.far; x && x.val; x = x.far) ut.unshift(x.val); return ut; }
function delaPa(v, tecken) { const ut = []; let d = 0, b = ''; for (const ch of v) { if (ch === '(') d++; if (ch === ')') d--; if (ch === tecken && d === 0) { ut.push(b); b = ''; } else b += ch; } ut.push(b); return ut.map((x) => x.trim()).filter(Boolean); }
function iStartStil(r) { for (let x = r; x && x.val; x = x.far) if (/^@starting-style/i.test(x.val)) return true; return false; }
function egenSelektor(r) { for (let x = r; x && x.val; x = x.far) if (!x.val.startsWith('@') && !x.val.startsWith('&')) return x.val; return ''; }
function sammanhang(r) { return forfader(r).filter((x) => x.startsWith('@') && !/^@starting-style/i.test(x)).join(' / '); }

async function k13(m) {
  const ut = [], forkortningar = new Map();
  for (const { namn, text } of cssFiler(m)) {
    const regler = tolkaCss(text);
    for (const r of regler) {
      const anim = r.dekl.filter((d) => d.p === 'animation');
      for (const d of anim) forkortningar.set(d.v, `${namn}: ${r.val}`);
      for (const t of r.dekl.filter((d) => d.p === 'animation-timeline')) if (anim.some((a) => a.i > t.i)) ut.push({ text: `${namn}: ${r.val}: animation-timeline står före animation, som nollställer den` });
      for (const d of r.dekl.filter((x) => x.p === 'transition' && /allow-discrete/.test(x.v))) if (!r.dekl.some((x) => x.p === 'transition' && x.i < d.i && !/allow-discrete/.test(x.v))) ut.push({ text: `${namn}: ${r.val}: transition med allow-discrete utan en transition utan den före (reserv)` });
    }
    const vanliga = regler.filter((r) => !r.val.startsWith('@') && !iStartStil(r));
    for (const st of regler.filter((r) => iStartStil(r) && r.dekl.length)) {
      const sel = egenSelektor(st), ctx = sammanhang(st);
      for (const d of st.dekl) if (vanliga.some((v) => egenSelektor(v) === sel && sammanhang(v) === ctx && v.dekl.some((x) => x.p === d.p && x.i > d.i))) { ut.push({ text: `${namn}: @starting-style för ${sel} (${d.p}) står före sin vanliga regel, som då vinner` }); break; }
    }
  }
  if (forkortningar.size) {
    const ctx = await m.browser.newContext(); const p = await ctx.newPage();
    const avvisade = await p.evaluate((l) => l.filter((v) => !CSS.supports('animation', v)), [...forkortningar.keys()]); await ctx.close();
    for (const [v, var_] of forkortningar) {
      const tl = /\b(?:view|scroll)\s*\(/.test(v), nej = avvisade.includes(v);
      if (tl || nej) ut.push({ text: `${var_} { animation: ${v.slice(0, 70)} }: ${tl ? 'tidslinjen står i förkortningen' : 'ogiltig'}${nej ? ', och Chromium avvisar hela deklarationen' : ''}` });
    }
  }
  return ut;
}
async function k13c(m) {
  const tillatna = /^(transform|translate|scale|rotate|opacity|color|background-color|border(-(top|right|bottom|left|block|inline)(-(start|end))?)?-color|outline-color|text-decoration-color|fill|stroke|caret-color|accent-color|animation-timing-function|animation-composition)$/;
  const diskreta = /^(display|overlay|visibility|content-visibility)$/;
  const tid = /^-?[\d.]+m?s$/i, kurva = /^(ease|ease-in|ease-out|ease-in-out|linear|step-start|step-end|(cubic-bezier|steps|linear)\(.*\))$/i;
  const nopref = (r) => forfader(r).some((x) => /prefers-reduced-motion\s*:\s*no-preference/i.test(x));
  // Layoutegenskaper: de som flyttar eller ändrar storlek på rutor och därför kräver ny layout i varje bildruta (web.dev, Basques och
  // Andrew 2020). transition: all och animerade layoutegenskaper stoppar; andra egenskaper utöver transform, opacitet och färg rapporteras.
  const layout = /^(width|height|(min|max)-(width|height)|((min|max)-)?(inline|block)-size|top|right|bottom|left|inset(-.+)?|margin(-.+)?|padding(-.+)?|border(-(top|right|bottom|left|block|inline)(-(start|end))?)?(-width)?|font|font-size|line-height|letter-spacing|word-spacing|gap|row-gap|column-gap|flex(-basis|-grow|-shrink)?|grid-template(-columns|-rows)?|grid-(row|column)(-start|-end)?)$/;
  const ut = new Map(), lagg2 = (t, stopp = false) => ut.set(t, { text: t, stopp });
  for (const { namn, text } of cssFiler(m)) {
    for (const r of tolkaCss(text)) {
      const iKeyframes = forfader(r).some((x) => /^@(-webkit-)?keyframes/i.test(x));
      for (const d of r.dekl) {
        if (iKeyframes && !d.p.startsWith('--') && !tillatna.test(d.p)) lagg2(`${namn}: @keyframes ${forfader(r).find((x) => /keyframes/i.test(x)).split(/\s+/)[1]} animerar ${d.p}${layout.test(d.p) ? ' (layoutegenskap)' : ''}`, layout.test(d.p));
        if (d.p === 'transition-property') for (const e of delaPa(d.v, ',')) { if (e === 'all') lagg2(`${namn}: ${r.val}: transition-property: all`, true); else if (!tillatna.test(e) && !diskreta.test(e) && e !== 'none' && !e.startsWith('var(')) lagg2(`${namn}: ${r.val}: övergång på ${e}${layout.test(e) ? ' (layoutegenskap)' : ''}`, layout.test(e)); }
        if (d.p === 'transition') for (const del of delaPa(d.v, ',')) {
          const tok = delaPa(del, ' ').filter((x) => !tid.test(x) && !kurva.test(x) && !/^(allow-discrete|normal)$/i.test(x));
          if (tok.some((x) => x.startsWith('var('))) continue;
          const e = tok[0] || 'all';
          if (e === 'all') lagg2(`${namn}: ${r.val}: transition: ${del.slice(0, 40)} (all${tok[0] ? '' : ' utan angiven egenskap'})`, true);
          else if (!tillatna.test(e) && !diskreta.test(e) && e !== 'none') lagg2(`${namn}: ${r.val}: övergång på ${e}${layout.test(e) ? ' (layoutegenskap)' : ''}`, layout.test(e));
        }
        for (const x of d.v.matchAll(/cubic-bezier\(([^)]*)\)/gi)) { const [, y1, , y2] = x[1].split(',').map(Number); if (y1 < 0 || y1 > 1 || y2 < 0 || y2 > 1) lagg2(`${namn}: ${r.val} ${d.p}: studsande kurva cubic-bezier(${x[1]})`); }
        for (const x of d.v.matchAll(/\blinear\(([^)]*)\)/gi)) if (delaPa(x[1], ',').some((pkt) => { const n = Number(pkt.split(/\s+/)[0]); return n < 0 || n > 1; })) lagg2(`${namn}: ${r.val} ${d.p}: studsande kurva linear(${x[1].slice(0, 30)})`);
        if (d.p === 'animation-timeline' && !/^(auto|none)$/i.test(d.v) && !nopref(r)) lagg2(`${namn}: ${r.val}: scroll-driven animation utanför prefers-reduced-motion: no-preference`);
        if (d.p === 'scroll-behavior' && /smooth/i.test(d.v) && !nopref(r)) lagg2(`${namn}: ${r.val}: scroll-behavior: smooth utanför prefers-reduced-motion: no-preference`);
      }
      if (/^@view-transition/i.test(r.val) && !nopref(r)) lagg2(`${namn}: @view-transition utanför prefers-reduced-motion: no-preference`);
    }
  }
  return [...ut.values()];
}

// ---------------------------------------------------------------------------------------------------------------------------------
// N2-kontrollerna som körs i sidan

async function fore2g(ctx, page, m, minne) {
  minne.konsol = [];
  await ctx.addInitScript(() => { window.__tt = []; document.addEventListener('securitypolicyviolation', (e) => window.__tt.push(`${e.violatedDirective} ${String(e.sourceFile || '').split('/').pop()}:${e.lineNumber} ${e.sample || ''}`.trim().slice(0, 120))); });
  const ursprung = new URL(m.bas).origin;
  await ctx.route((u) => u.origin === ursprung, async (route) => {
    if (route.request().resourceType() !== 'document') return route.continue();
    const svar = await route.fetch(); const h = { ...svar.headers() }; delete h['content-encoding']; delete h['content-length'];
    return route.fulfill({ response: svar, headers: { ...h, 'content-security-policy': "require-trusted-types-for 'script'" } });
  });
  page.on('console', (x) => { if (x.type() === 'error' && /Trusted ?(Types|HTML|Script)/i.test(x.text())) minne.konsol.push(x.text().slice(0, 120)); });
}
async function sida2g(page, { minne }) {
  const ut = new Set(await page.evaluate(() => window.__tt || []));
  // Med samtycke: ett sparat ja i alla kategorier, så att skripten som väntar på samtycke också körs.
  const ruta = await page.evaluate(() => { const e = document.querySelector('[data-samtycke-ruta]'); return e ? { version: Number(e.dataset.version || 1), kategorier: [...e.querySelectorAll('input[name]')].map((i) => i.name) } : null; });
  if (ruta) {
    await page.evaluate(({ version, kategorier }) => localStorage.setItem('samtycke', JSON.stringify({ ...Object.fromEntries(kategorier.map((k) => [k, true])), version, tid: new Date().toISOString() })), ruta);
    await page.reload({ waitUntil: 'networkidle' }); await page.waitForTimeout(300);
    for (const x of await page.evaluate(() => window.__tt || [])) ut.add(`med samtycke: ${x}`);
  }
  for (const x of minne.konsol) ut.add(x);
  return [...ut];
}
function sida3c(page, { vy }) {
  return iSidan(page, (bredd) => {
    const ut = [];
    for (const e of [document.documentElement, document.body]) { const v = getComputedStyle(e).overflowX; if (/hidden|clip/.test(v)) ut.push(`${e.tagName.toLowerCase()} har overflow-x: ${v}`); }
    for (const x of hUtanfor(Math.min(document.documentElement.clientWidth, bredd)).slice(0, 6)) ut.push(`slutar utanför fönstret: ${x}`);
    return ut;
  }, vy.bredd);
}
async function sida3d(page, { vy }) {
  const ut = [];
  const hopp16 = await iSidan(page, () => hHopplank());
  const cdp = await page.context().newCDPSession(page);
  for (const storlek of [24, 32]) {
    await cdp.send('Page.setFontSizes', { fontSizes: { standard: storlek } });
    await page.reload({ waitUntil: 'networkidle' }); await page.evaluate(() => document.fonts?.ready); await bildrutor(page);
    const r = await iSidan(page, (bredd) => {
      const d = document.documentElement, b = Math.min(d.clientWidth, bredd);
      return { scroll: d.scrollWidth > b ? d.scrollWidth - b : 0, utanfor: hUtanfor(b).slice(0, 4), hopp: hHopplank(), delade: hDeladeOrd().slice(0, 4) };
    }, vy.bredd);
    if (r.scroll) ut.push(`${storlek} px: sidledsscroll ${r.scroll} px`);
    for (const x of r.utanfor) ut.push(`${storlek} px: utanför fönstret: ${x}`);
    if (r.hopp && !hopp16) ut.push(`${storlek} px: hopplänken ${r.hopp} syns utan fokus`);
    for (const x of r.delade) ut.push(`${storlek} px: ord delat utan bindestreck: ${x}`);
  }
  return ut;
}
function sida3e(page) {
  return iSidan(page, () => {
    const h = [...document.querySelectorAll('header, [role="banner"]')].find(hSynlig); if (!h) return [];
    const iFonster = (q) => q.bottom > 0 && q.top < innerHeight && q.right > 0 && q.left < innerWidth;
    const delar = [...h.querySelectorAll('a[href], button')].filter((e) => hSynlig(e) && !hDold(e) && iFonster(e.getBoundingClientRect()));
    const yta = (e) => {
      const q = e.getBoundingClientRect(); let [l, t, r, b] = [q.left, q.top, q.right, q.bottom];
      for (const n of hTextnoder(e)) { if (!hSynlig(n.parentElement)) continue; const rr = document.createRange(); rr.selectNodeContents(n); for (const x of rr.getClientRects()) if (x.width > 0.5) { l = Math.min(l, x.left); t = Math.min(t, x.top); r = Math.max(r, x.right); b = Math.max(b, x.bottom); } }
      return { l, t, r, b };
    };
    const ytor = delar.map(yta), ut = [];
    if (delar.length > 1) {
      const lagst = ytor.reduce((a, x, i) => (x.t > ytor[a].t ? i : a), 0), hogst = ytor.reduce((a, x, i) => (x.b < ytor[a].b ? i : a), 0);
      if (ytor[lagst].t >= ytor[hogst].b - 1) ut.push(`delarna står på flera rader: ${hNamn(delar[lagst])} under ${hNamn(delar[hogst])}`);
      for (let i = 0; i < delar.length; i++) for (let j = i + 1; j < delar.length; j++) {
        if (delar[i].contains(delar[j]) || delar[j].contains(delar[i])) continue;
        const a = ytor[i], b = ytor[j];
        if (Math.min(a.r, b.r) - Math.max(a.l, b.l) > 1 && Math.min(a.b, b.b) - Math.max(a.t, b.t) > 1) ut.push(`${hNamn(delar[i])} överlappar ${hNamn(delar[j])}`);
      }
    }
    for (const e of delar) { const n = Math.max(0, ...hTextnoder(e).filter((x) => hSynlig(x.parentElement)).map(hRader)); if (n > 1) ut.push(`${hNamn(e)} bryts på ${n} rader`); }
    return ut;
  });
}
async function sida4c(page, { vy }) {
  const tok = await iSidan(page, () => {
    const kit = document.querySelector('[data-kit]') || document.documentElement;
    const t = getComputedStyle(kit).getPropertyValue('--k-accent').trim() || getComputedStyle(document.documentElement).getPropertyValue('--k-accent').trim();
    if (!t) return null;
    const c = document.createElement('canvas').getContext('2d', { willReadFrequently: true });
    const rgba = (f) => { c.clearRect(0, 0, 1, 1); c.fillStyle = '#000'; c.fillStyle = f; c.fillRect(0, 0, 1, 1); const d = c.getImageData(0, 0, 1, 1).data; return [d[0], d[1], d[2], d[3] / 255]; };
    const a = rgba(t), lik = (f) => f[3] >= 0.9 && Math.max(...[0, 1, 2].map((i) => Math.abs(f[i] - a[i]))) <= 3;
    window.__accent = [...document.body.querySelectorAll('*')].filter((e) => lik(rgba(getComputedStyle(e).backgroundColor)));
    return t;
  });
  if (!tok) return [{ text: 'ingen accenttoken (--k-accent) att jämföra med', info: true }];
  const ut = new Map(), sorter = new Set();
  for (let y = 0, varv = 0; varv < 60; y += Math.round(vy.hojd * 0.8), varv++) {
    await page.evaluate((y) => scrollTo({ top: y, behavior: 'instant' }), y); await page.waitForTimeout(150); await bildrutor(page);
    const r = await iSidan(page, () => {
      const mal = (a) => { if (/^(tel|mailto):/i.test(a.href)) return a.href.split(':')[0] + ':'; const u = new URL(a.href, location.href); return u.origin === location.origin ? u.pathname : u.origin + u.pathname; };
      const s = new Set(), ytor = [];
      for (const e of window.__accent) {
        if (!hSynlig(e)) continue; const q = e.getBoundingClientRect(); if (q.bottom <= 0 || q.top >= innerHeight || q.right <= 0 || q.left >= innerWidth) continue;
        const h = e.closest('a[href], button, [role="button"], input[type="submit"], input[type="button"], summary');
        if (!h) ytor.push(hNamn(e)); else s.add(h.matches('a[href]') ? mal(h) : `${h.tagName.toLowerCase()} ”${hText(h, 30)}”`);
      }
      return { sorter: [...s], ytor, slut: scrollY + innerHeight >= document.documentElement.scrollHeight - 2 };
    });
    r.sorter.forEach((x) => sorter.add(x));
    if (r.sorter.length > 1) ut.set('f' + r.sorter.sort().join('|'), `${r.sorter.length} sorters handlingar fyllda med accent i samma fönster: ${r.sorter.join(', ')}`);
    for (const x of r.ytor) ut.set('y' + x, `${x} är fylld med accent men är ingen handling`);
    if (r.slut) break;
  }
  return [...[...ut.values()].map((text) => ({ text })), ...(sorter.size ? [{ text: `fylld med accent: ${[...sorter].join(', ')}`, info: true }] : [])];
}
async function sida4d(page) {
  await page.waitForTimeout(500);
  return iSidan(page, () => {
    const yta = innerWidth * innerHeight, ut = [], flaggade = [];
    for (const e of document.body.querySelectorAll('*')) {
      const s = getComputedStyle(e); if (s.position !== 'fixed' && !e.matches(':modal, :popover-open')) continue;
      if (!hSynlig(e) || e.closest('[data-samtycke-ruta]') || e.querySelector('[data-samtycke-ruta]') || flaggade.some((f) => f.contains(e))) continue;
      const q = e.getBoundingClientRect(), b = Math.max(0, Math.min(q.right, innerWidth) - Math.max(q.left, 0)), h = Math.max(0, Math.min(q.bottom, innerHeight) - Math.max(q.top, 0));
      if (b * h > 0.3 * yta) { flaggade.push(e); ut.push(`${hNamn(e)} täcker ${Math.round((100 * b * h) / yta)} % av första skärmen`); }
    }
    return ut;
  });
}
function sida7d(page) {
  return iSidan(page, () => {
    const enheter = 'kr|kronor|%|procent|min|minuter|tim|timmar|h|km|mil|m|cm|mm|kg|g|st|år|månader|dagar|sek|°C|m²|kvm';
    const manader = 'januari|februari|mars|april|maj|juni|juli|augusti|september|oktober|november|december|jan|feb|mar|apr|jun|jul|aug|sep|sept|okt|nov|dec';
    const monster = [
      [new RegExp(`(?<![\\d,.])\\d+(?:[,.]\\d+)? (?:${enheter})(?![\\p{L}\\d])`, 'u'), 'tal och enhet med vanligt mellanslag'],
      [/(?<![\d,.])\d{1,3}(?: \d{3})+(?![\d,])/, 'tusental med vanligt mellanslag'],
      [new RegExp(`(?<![\\d])\\d{1,2} (?:${manader})(?![\\p{L}])`, 'iu'), 'datum med vanligt mellanslag'],
      [/(?:\+46|(?<!\d)0)\d{1,3}[- ]?\d{2,3}(?: \d{2,3}){1,3}(?!\d)/, 'telefonnummer med vanligt mellanslag'],
      [/\.\.\./, 'tre punkter i stället för …'], [/"/, 'raka citattecken i stället för ”'],
    ];
    const ut = new Set();
    for (const n of hTextnoder()) {
      const e = n.parentElement; if (!hSynlig(e) || e.closest('code, pre, kbd, samp')) continue;
      const ws = getComputedStyle(e).whiteSpace;
      for (const [re, typ] of monster) { const t = n.textContent.match(re); if (!t || (/mellanslag/.test(typ) && /nowrap|pre/.test(ws))) continue; ut.add(`${typ}: ”${t[0]}”`); }
    }
    return [...ut];
  });
}
async function sida7e(page, { sida, miljo }) {
  const rad = miljo.sidkarta.find((r) => rensa(r.adress).replace(/\/$/, '') === rensa(sida).replace(/\/$/, '')); if (!rad?.strangar.length) return [];
  const t = await iSidan(page, () => { const m = document.querySelector('main') || document.body; const p = [...m.querySelectorAll('p')].find((x) => hText(x, 600).length >= 20); return [...document.querySelectorAll('h1')].map((x) => hText(x, 300)).concat([...m.querySelectorAll('h2')].map((x) => hText(x, 300)), p ? [hText(p, 600)] : []).join(' \n '); });
  const stopp = new Set(['i', 'och', 'på', 'för', 'en', 'ett', 'med', 'till', 'av', 'eller', 'vid', 'om', 'den', 'det', 'du', 'som', 'nära']);
  const stam = (o) => { for (const s of ['arna', 'erna', 'orna', 'ens', 'ets', 'ar', 'er', 'or', 'en', 'et', 'na', 'a', 'e', 'n', 's']) if (o.endsWith(s) && o.length - s.length >= 4) return o.slice(0, -s.length); return o; };
  const ord = t.toLowerCase().match(/[\p{L}\d]+/gu) || [];
  const finns = (lista) => lista.map((o) => o.toLowerCase()).filter((o) => !stopp.has(o)).every((o) => ord.some((w) => w.startsWith(stam(o))));
  const alternativ = (s) => { const ut = []; let forra = null; for (const d of s.split(/\s*\/\s*/).filter(Boolean)) { const o = d.split(/\s+/); if (o.length === 1 && forra) ut.push([...forra.slice(0, -1), o[0]]); else { ut.push(o); forra = o; } } return ut; };
  return rad.strangar.filter((s) => !alternativ(s).some(finns)).map((s) => `”${s}” finns inte i h1, h2 eller första stycket`);
}
function sida7f(page) {
  return iSidan(page, () => {
    const ut = new Set();
    for (const a of document.querySelectorAll('a[href]')) {
      if (!hSynlig(a)) continue;
      const ikoner = [...a.querySelectorAll('svg, img')].filter((i) => !i.parentElement.closest('svg') && getComputedStyle(i).display !== 'none'); if (!ikoner.length) continue;
      const w = document.createTreeWalker(a, NodeFilter.SHOW_TEXT | NodeFilter.SHOW_ELEMENT); let forra = null;
      for (let n = w.nextNode(); n; n = w.nextNode()) {
        if (n.nodeType === 3) { if (!n.parentElement.closest('svg')) forra = n; continue; }
        if (!ikoner.includes(n)) continue;
        if (forra && /\s$/.test(forra.textContent)) {
          const t = forra.textContent, r = document.createRange(); r.setStart(forra, t.search(/\s+$/)); r.setEnd(forra, t.length);
          const bredd = [...r.getClientRects()].reduce((s, x) => s + x.width, 0);
          let under = false; for (let x = forra.parentElement; x; x = x.parentElement) { if (getComputedStyle(x).textDecorationLine.includes('underline')) { under = true; break; } if (x === a) break; }
          if (bredd > 0.5 && under) ut.add(`${hNamn(a)}: understruket mellanrum före ikonen`);
        }
        forra = null;
      }
    }
    return [...ut];
  });
}
// 7g. Långt tankstreck (—) i synlig text; ett utdrag runt varje.
function sida7g(page) {
  return iSidan(page, () => {
    const ut = new Set();
    for (const n of hTextnoder()) {
      const e = n.parentElement; if (!hSynlig(e) || hDold(e) || e.closest('code, pre, kbd, samp')) continue;
      const t = n.textContent.replace(/\s+/g, ' ');
      for (const x of t.matchAll(/—/g)) ut.add(`långt tankstreck: ”${t.slice(Math.max(0, x.index - 30), x.index + 30).trim()}”`);
    }
    return [...ut];
  });
}
async function sida8c(page) { return (await new AxeBuilder({ page }).withTags(AXE_TAGGAR).analyze()).violations.map((v) => `${v.id}: ${v.nodes.length} st`); }
async function sida8d(page) {
  const knapp = page.locator('button[popovertarget]:not([popovertargetaction="hide"]), button[aria-controls][aria-expanded="false"]').filter({ visible: true }).first();
  if (!(await knapp.count())) return [];
  await knapp.click(); await page.waitForTimeout(400);
  return (await new AxeBuilder({ page }).withTags(AXE_TAGGAR).analyze()).violations.map((v) => `med menyn öppen ${v.id}: ${v.nodes.length} st`);
}
async function sida8e(page) {
  const bp = await new AxeBuilder({ page }).withTags(['best-practice']).analyze();
  const wc = await new AxeBuilder({ page }).withTags(AXE_TAGGAR).analyze();
  return [...bp.violations.map((v) => `${v.id}: ${v.nodes.length} st`), ...wc.incomplete.map((v) => ({ text: `att läsa (incomplete) ${v.id}: ${v.nodes.length} st`, info: true }))];
}
async function sida8f(page) {
  const sel = 'button[popovertarget]:not([popovertargetaction="hide"]), button[aria-haspopup]:not([aria-haspopup="false"]), button[aria-expanded][aria-controls]';
  const ut = [], n = await page.locator(sel).count();
  for (let i = 0; i < n; i++) {
    const b = page.locator(sel).nth(i);
    if (!(await b.isVisible())) continue;
    const info = await b.evaluate((e) => { const id = e.getAttribute('popovertarget') || e.getAttribute('aria-controls'); const m = id && document.getElementById(id); return { namn: (e.getAttribute('aria-label') || e.innerText).trim().slice(0, 30), meny: !!m && (m.matches('dialog, [role="dialog"], [role="menu"], [popover], [aria-modal]') || e.hasAttribute('aria-haspopup')) }; });
    if (!info.meny) continue;
    const oppen = () => b.evaluate((e) => { const id = e.getAttribute('popovertarget') || e.getAttribute('aria-controls'); const m = id && document.getElementById(id); if (e.hasAttribute('popovertarget')) return !!m?.matches(':popover-open'); return e.getAttribute('aria-expanded') === 'true' && (!m || m.checkVisibility()); });
    if (await oppen()) continue;
    await b.focus(); await page.keyboard.press('Enter'); await page.waitForTimeout(350);
    if (!(await oppen())) { ut.push(`”${info.namn}” öppnas inte med Enter`); continue; }
    await page.keyboard.press('Escape'); await page.waitForTimeout(350);
    if (await oppen()) { ut.push(`”${info.namn}” stängs inte med Escape`); continue; }
    if (!(await b.evaluate((e) => document.activeElement === e))) ut.push(`fokus går inte tillbaka till ”${info.namn}” när den stängs med Escape`);
  }
  return ut;
}
async function sida8g(page, { vy }) {
  // Värdena ur WCAG 2.2, 1.4.12 Text Spacing (radavstånd 1,5, stycken 2 gånger, bokstäver 0,12 och ord 0,16 gånger textstorleken).
  await page.addStyleTag({ content: '* { line-height: 1.5 !important; letter-spacing: 0.12em !important; word-spacing: 0.16em !important; } p { margin-bottom: 2em !important; }' });
  await page.waitForTimeout(200); await bildrutor(page);
  const r = await iSidan(page, (bredd) => {
    const d = document.documentElement, b = Math.min(d.clientWidth, bredd), klippt = new Set();
    for (const n of hTextnoder()) {
      const e = n.parentElement; if (hDold(e) || !hSynlig(e)) continue;
      const rr = document.createRange(); rr.selectNodeContents(n); const q = [...rr.getClientRects()].filter((x) => x.width > 0.5); if (!q.length) continue;
      for (let x = e; x && x !== document.body && x !== d; x = x.parentElement) {
        const s = getComputedStyle(x); if (s.overflowX === 'visible' && s.overflowY === 'visible') continue;
        if (/auto|scroll/.test(s.overflowX + s.overflowY)) break;
        const k = x.getBoundingClientRect(); if (k.width <= 2 || k.height <= 2) break;
        if (q.some((t) => t.right > k.right + 1 || t.bottom > k.bottom + 1 || t.left < k.left - 1 || t.top < k.top - 1)) klippt.add(`${hNamn(e)} klipps av ${hNamn(x, false)}`);
        break;
      }
    }
    return { scroll: d.scrollWidth > b ? d.scrollWidth - b : 0, klippt: [...klippt].slice(0, 6) };
  }, vy.bredd);
  return [...r.klippt.map((text) => ({ text, stopp: true })), ...(r.scroll ? [{ text: `sidledsscroll ${r.scroll} px med WCAG:s textavstånd`, stopp: false }] : [])];
}
async function sida8h(page) {
  // Knappar och fält i vanligt läge: det som har en egen fyllning skiljer sig från bakgrunden och behöver en kant när färgerna tvingas.
  await iSidan(page, () => {
    const c = document.createElement('canvas').getContext('2d', { willReadFrequently: true });
    const rgba = (f) => { c.clearRect(0, 0, 1, 1); c.fillStyle = '#000'; c.fillStyle = f; c.fillRect(0, 0, 1, 1); return [...c.getImageData(0, 0, 1, 1).data]; };
    const bakom = (e) => { for (let x = e.parentElement; x; x = x.parentElement) { const f = rgba(getComputedStyle(x).backgroundColor); if (f[3] > 200) return f.join(); } return '255,255,255,255'; };
    let i = 0;
    for (const e of document.querySelectorAll('a[href], button, [role="button"], input:not([type="hidden"], [type="checkbox"], [type="radio"]), select, textarea')) {
      // Det som ligger ovanför eller till vänster om sidan, som en hopplänk som syns först vid fokus, räknas inte.
      if (!hSynlig(e)) continue; const q = e.getBoundingClientRect(); if (q.bottom + scrollY <= 0 || q.right + scrollX <= 0) continue; const f = rgba(getComputedStyle(e).backgroundColor);
      if (e.matches('input, select, textarea') || (f[3] > 128 && f.join() !== bakom(e))) e.dataset.kontrollKnapp = String(i++);
    }
  });
  await page.emulateMedia({ forcedColors: 'active' }); await page.waitForTimeout(200);
  const ut = new Set(await iSidan(page, () => [...document.querySelectorAll('[data-kontroll-knapp]')].filter((e) => { const s = getComputedStyle(e); return ['Top', 'Right', 'Bottom', 'Left'].every((k) => s[`border${k}Style`] === 'none' || parseFloat(s[`border${k}Width`]) === 0); }).map((e) => `${hNamn(e)} har ingen kant i forced colors`)));
  await page.evaluate(() => { document.activeElement?.blur?.(); scrollTo(0, 0); });
  const sett = new Set();
  for (let i = 0; i < 150; i++) {
    await page.keyboard.press('Tab');
    const f = await iSidan(page, () => { const e = document.activeElement; if (!e || e === document.body) return null; if (!window.__f8h) window.__f8h = new WeakSet(); if (window.__f8h.has(e)) return { runt: true }; window.__f8h.add(e); const s = getComputedStyle(e); return { namn: hNamn(e), ring: s.outlineStyle === 'auto' || (s.outlineStyle !== 'none' && parseFloat(s.outlineWidth) > 0) }; });
    if (!f || f.runt) break;
    if (!f.ring && !sett.has(f.namn)) { sett.add(f.namn); ut.add(`${f.namn} har ingen outline vid fokus i forced colors`); }
  }
  return [...ut];
}
function sida8i(page) {
  return iSidan(page, () => {
    const lankar = (r) => (r ? [...r.querySelectorAll('a[href]')].filter(hSynlig).map((a) => `${hText(a, 40)} → ${/^(tel|mailto):/i.test(a.href) ? a.href.split(':')[0] : new URL(a.href).pathname}`) : []);
    const huvud = document.querySelector('header, [role="banner"]'), fot = document.querySelector('footer, [role="contentinfo"]');
    const slag = (a) => (/^tel:/i.test(a.href) ? 'telefon' : /^mailto:/i.test(a.href) ? 'e-post' : /\/kontakt/i.test(new URL(a.href).pathname) ? 'kontaktsidan' : null);
    const hjalp = [huvud, fot].flatMap((r) => (r ? [...r.querySelectorAll('a[href]')].filter(hSynlig).map(slag).filter(Boolean) : [])).filter((x, i, a) => a.indexOf(x) === i);
    return { nav: lankar(huvud?.querySelector('nav') || huvud), sidfot: lankar(fot), hjalp };
  });
}
function samman8i(per) {
  const ut = [], namn = { nav: 'menyn', sidfot: 'sidfoten', hjalp: 'kontaktvägarna' };
  for (const sidor of Object.values(per)) {
    const lista = Object.entries(sidor); if (lista.length < 2) continue;
    const [s0, d0] = lista[0];
    for (const [s, d] of lista.slice(1)) for (const del of Object.keys(namn)) {
      const a = d0[del].filter((x) => d[del].includes(x)), b = d[del].filter((x) => d0[del].includes(x));
      if (a.join('|') !== b.join('|')) ut.push({ sida: s, text: `${namn[del]} står i en annan ordning än på ${s0}` });
    }
  }
  return ut;
}
function sida8l(page) {
  return iSidan(page, () => [...document.querySelectorAll('dialog, [role="dialog"], [role="alertdialog"]')].filter((d) => {
    const ids = (d.getAttribute('aria-labelledby') || '').split(/\s+/).filter(Boolean);
    return !(ids.map((i) => document.getElementById(i)?.textContent || '').join(' ').trim() || (d.getAttribute('aria-label') || '').trim() || (d.getAttribute('title') || '').trim());
  }).map((d) => `${hNamn(d, false)} saknar namn`));
}
function sida8m(page) {
  return iSidan(page, () => {
    const ut = [];
    const roll = (e) => e.getAttribute('role') || ({ NAV: 'navigation', MAIN: 'main', ASIDE: 'complementary', HEADER: 'banner', FOOTER: 'contentinfo', SECTION: 'region', FORM: 'form', SEARCH: 'search' })[e.tagName];
    const rollord = { navigation: /navigation|navigering/i, region: /\bregion\b/i, complementary: /kompletterande|complementary/i, banner: /\bbanner\b/i, contentinfo: /contentinfo/i, main: /\bmain\b|huvudinnehåll/i, search: /\bsearch\b/i, form: /formulär/i };
    const namnAv = (e) => { const ids = (e.getAttribute('aria-labelledby') || '').split(/\s+/).filter(Boolean); return (ids.map((i) => document.getElementById(i)?.textContent || '').join(' ') || e.getAttribute('aria-label') || '').replace(/\s+/g, ' ').trim(); };
    for (const e of document.querySelectorAll('nav, main, aside, header, footer, section[aria-label], section[aria-labelledby], form[aria-label], form[aria-labelledby], search, [role="navigation"], [role="region"], [role="complementary"], [role="search"], [role="banner"], [role="contentinfo"]')) {
      const n = namnAv(e); if (!n) continue;
      if (rollord[roll(e)]?.test(n)) ut.push(`${hNamn(e, false)}: namnet ”${n}” innehåller rollen`);
      const delar = n.toLowerCase().split(/\s*(?:,|\boch\b|\beller\b|&)\s*/).map((x) => x.trim()).filter(Boolean);
      if (delar.length > 1) { const t = (e.innerText || e.textContent || '').toLowerCase(); const saknas = delar.filter((d) => !t.includes(d.slice(0, Math.max(3, d.length - 2)))); if (saknas.length) ut.push(`${hNamn(e, false)}: namnet ”${n}” nämner ${saknas.map((x) => `”${x}”`).join(', ')}, som inte finns i innehållet`); }
    }
    const mal = new Map();
    for (const a of document.querySelectorAll('a[href]')) {
      if (!hSynlig(a)) continue; const nm = hText(a, 80).toLowerCase(); if (!nm) continue;
      const u = new URL(a.href, location.href), m = /^(tel|mailto):/i.test(a.href) ? a.href : u.origin + u.pathname + u.search;
      (mal.get(nm) ?? mal.set(nm, new Set()).get(nm)).add(m);
    }
    for (const [nm, s] of mal) if (s.size > 1) ut.push(`länkarna med namnet ”${nm}” går till ${s.size} olika mål`);
    return ut;
  });
}
function sida8n(page) {
  return iSidan(page, () => {
    const ut = [];
    for (const s of document.querySelectorAll('summary')) for (const h of s.querySelectorAll('h1, h2, h3, h4, h5, h6, [role="heading"]')) ut.push(`rubrik i summary: ${hNamn(h)}`);
    for (const e of document.body.querySelectorAll('*')) for (const p of ['::before', '::after']) {
      const c = getComputedStyle(e, p).content; if (!c || c === 'none' || c === 'normal') continue;
      const t = [...c.matchAll(/"((?:[^"\\]|\\.)*)"/g)].map((x) => x[1]).join('');
      if (/[\p{L}\d]{2,}/u.test(t)) ut.push(`text i CSS content: ${hNamn(e, false)}${p} ”${t.slice(0, 30)}”`);
    }
    return ut;
  });
}
async function sida8o(page, { vy, miljo }) {
  const sett = (miljo.hoverSett ??= new Set()), ut = [], mobil = vy.mobil;
  const typer = await iSidan(page, () => {
    const typ = (e) => `${e.tagName.toLowerCase()}${e.classList[0] ? '.' + e.classList[0] : ` i ${e.parentElement?.closest('[class]')?.classList[0] || e.parentElement?.tagName.toLowerCase()}`}`;
    const ut = [];
    for (const e of document.querySelectorAll('a[href], button, summary, [role="button"]')) { if (!hSynlig(e) || hDold(e)) continue; const t = typ(e); if (!ut.includes(t)) { e.dataset.kontrollHover = String(ut.length); ut.push(t); } }
    return ut;
  });
  const sig = (el, utanFokus) => el.evaluate((e, uf) => [e, ...e.querySelectorAll('*'), e.parentElement].filter(Boolean).map((x) => { const s = getComputedStyle(x); return [s.color, s.backgroundColor, s.textDecorationLine, s.textDecorationColor, s.textDecorationThickness, s.borderColor, s.transform, s.opacity, s.filter, s.textUnderlineOffset, ...(uf ? [] : [s.boxShadow, s.outlineStyle, s.outlineColor])].join('|'); }).join('#'), utanFokus);
  if (mobil) await page.evaluate(() => document.addEventListener('click', (e) => e.preventDefault(), true));
  for (let i = 0; i < typer.length; i++) {
    const nyckel = `${mobil ? 'tryck' : 'hover'} ${typer[i]}`; if (sett.has(nyckel)) continue; sett.add(nyckel);
    const el = page.locator(`[data-kontroll-hover="${i}"]`);
    try {
      await el.scrollIntoViewIfNeeded({ timeout: 3000 });
      if (!mobil) {
        await page.mouse.move(0, 0); await page.waitForTimeout(80); const fore = await sig(el, false);
        await el.hover({ force: true, timeout: 3000 }); await page.waitForTimeout(600);
        if (fore === (await sig(el, false))) ut.push(`ingen hover på ${typer[i]} ”${await el.evaluate((e) => (e.innerText || e.getAttribute('aria-label') || '').trim().slice(0, 30))}”`);
      } else {
        const fore = await sig(el, true);
        await el.tap({ force: true, timeout: 3000 }); await page.waitForTimeout(600);
        await page.evaluate(() => document.activeElement?.blur?.()); await page.waitForTimeout(400);
        if (fore !== (await sig(el, true))) ut.push(`hover-läget står kvar efter tryck på ${typer[i]}`);
      }
    } catch { /* elementet gick inte att nå; prövas på en annan sida */ sett.delete(nyckel); }
  }
  return ut;
}
// 8p. Träffytor i 375 px med pekskärm. Mäts: knappar (button, role=button, input-knappar, summary) och fristående länkar, alltså länkar
// vars närmaste block inte har annan text än länkar och knappar (en länk i löptext är undantagen, som i WCAG 2.5.8). En yta under
// 44 × 44 px prövas med elementFromPoint i en ruta på 44 × 44 runt mitten, så att en träffyta som vidgats (t.ex. med ::after) räknas.
// Sedan öppnas menyn, som i 8d, och länkarna och knapparna i den mäts.
async function sida8p(page) {
  const mat = (rotId) => iSidan(page, (rotId) => {
    const rot = rotId ? document.getElementById(rotId) : document.body; if (!rot) return [];
    const blockAv = (e) => { for (let x = e.parentElement; x && x !== document.body; x = x.parentElement) if (!/^(inline|contents)/.test(getComputedStyle(x).display)) return x; return document.body; };
    const iLopText = (e) => {
      const w = document.createTreeWalker(blockAv(e), NodeFilter.SHOW_TEXT);
      for (let n = w.nextNode(); n; n = w.nextNode()) { const p = n.parentElement; if (p.closest('a[href], button, [role="button"], script, style, noscript, template') || !hSynlig(p)) continue; if (/[\p{L}\d]/u.test(n.textContent)) return true; }
      return false;
    };
    const vidgad = (e) => {
      e.scrollIntoView({ block: 'center', inline: 'nearest', behavior: 'instant' });
      const q = e.getBoundingClientRect(), cx = (q.left + q.right) / 2, cy = (q.top + q.bottom) / 2, bredd = document.documentElement.clientWidth;
      return [[-1, -1], [0, -1], [1, -1], [-1, 0], [1, 0], [-1, 1], [0, 1], [1, 1]].every(([dx, dy]) => {
        const x = Math.min(Math.max(cx + dx * 21.5, 0.5), bredd - 0.5), y = Math.min(Math.max(cy + dy * 21.5, 0.5), innerHeight - 0.5);
        const t = document.elementFromPoint(x, y); return !!t && (t === e || e.contains(t));
      });
    };
    const ut = [];
    for (const e of rot.querySelectorAll('a[href], button, [role="button"], input[type="submit"], input[type="button"], input[type="reset"], summary')) {
      if (!hSynlig(e) || hDold(e) || e.matches(':disabled')) continue;
      const q = e.getBoundingClientRect(); if (q.bottom + scrollY <= 0 || q.right + scrollX <= 0) continue;
      if (e.matches('a[href]') && iLopText(e)) continue;
      if (q.width >= 43.5 && q.height >= 43.5) continue;
      if (vidgad(e)) continue;
      ut.push(`${hNamn(e)}: ${Math.round(q.width)} × ${Math.round(q.height)} px${Math.min(q.width, q.height) < 24 ? ', under golvet 24 × 24' : ''}`);
    }
    return ut;
  }, rotId);
  const ut = await mat(null);
  const knapp = page.locator('button[popovertarget]:not([popovertargetaction="hide"]), button[aria-controls][aria-expanded="false"]').filter({ visible: true }).first();
  if (await knapp.count()) {
    const id = await knapp.evaluate((e) => e.getAttribute('popovertarget') || e.getAttribute('aria-controls'));
    await page.evaluate(() => scrollTo({ top: 0, behavior: 'instant' }));
    await knapp.click(); await page.waitForTimeout(400);
    for (const x of await mat(id)) ut.push(`med menyn öppen: ${x}`);
  }
  return ut;
}
function sida13b(page) {
  return iSidan(page, () => {
    const ut = new Set();
    for (const e of [document.documentElement, ...document.body.querySelectorAll('*')]) {
      const s = getComputedStyle(e);
      if (s.scrollbarWidth === 'none') { const rot = e === document.documentElement || e === document.body; const rullar = rot ? document.documentElement.scrollHeight > innerHeight + 1 : (/auto|scroll/.test(s.overflowY) && e.scrollHeight > e.clientHeight + 1) || (/auto|scroll/.test(s.overflowX) && e.scrollWidth > e.clientWidth + 1); if (rullar) ut.add(`scrollbar-width: none på ${hNamn(e, false)}, som rullar`); }
      const mask = s.maskImage || s.webkitMaskImage; if (mask && mask !== 'none' && (e.innerText || '').trim()) ut.add(`mask-image på ${hNamn(e, false)}, som har text`);
      if (/justify/.test(s.textAlign) && [...e.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim())) ut.add(`text-align: justify på ${hNamn(e, false)}`);
      if (s.forcedColorAdjust === 'none') ut.add(`forced-color-adjust: none på ${hNamn(e, false)}`);
    }
    return [...ut];
  });
}
async function sida13d(page, { vy }) {
  const samla = () => page.evaluate(() => {
    const s = (window.__c56 ??= new Set());
    const namn = (x) => (x ? `${x.tagName.toLowerCase()}${x.id ? '#' + x.id : x.classList[0] ? '.' + x.classList[0] : ''}` : '?');
    for (const a of document.getAnimations()) {
      const t = namn(a.effect?.target) + (a.effect?.pseudoElement || '');
      if (a.timeline && typeof DocumentTimeline !== 'undefined' && !(a.timeline instanceof DocumentTimeline)) s.add(`${t}: scroll-driven animation är aktiv`);
      const props = new Set((a.effect?.getKeyframes?.() || []).flatMap((k) => Object.keys(k)));
      const rorliga = [...props].filter((p) => /^(transform|translate|scale|rotate|filter|offsetPath|offsetDistance|top|left|right|bottom|inset|margin\w*|width|height)$/.test(p));
      if (rorliga.length) s.add(`${t}: ${a.animationName || a.transitionProperty || 'animation'} ändrar ${rorliga.join(', ')}`);
    }
    return [...s];
  });
  await samla();
  const h = await page.evaluate(() => document.documentElement.scrollHeight);
  for (let y = 0; y < h + vy.hojd; y += Math.round(vy.hojd * 0.7)) { await page.evaluate((y) => scrollTo({ top: y, behavior: 'instant' }), y); await samla(); await page.waitForTimeout(60); await samla(); }
  await page.evaluate(() => scrollTo({ top: 0, behavior: 'instant' })); await page.waitForTimeout(60);
  return (await samla()).map((x) => `${x} trots reducerad rörelse`);
}
async function sida13e(page) {
  await page.waitForTimeout(6000);
  const a = await page.screenshot(); await page.waitForTimeout(1000); const b = await page.screenshot();
  if (a.equals(b)) return [];
  const paus = await iSidan(page, () => [...document.querySelectorAll('button, [role="button"]')].some((b) => hSynlig(b) && /paus|stoppa|pause|stop/i.test(`${b.getAttribute('aria-label') || ''} ${b.innerText}`)));
  return paus ? [] : ['sidan ändras fortfarande efter 6 s, och ingen pausknapp finns'];
}
async function fore13f(ctx) {
  await ctx.addInitScript(() => {
    const prov = (window.__forsta = []), t0 = performance.now(); let fasta = null, text = null;
    const namn = (x) => `${x.tagName.toLowerCase()}${x.id ? '#' + x.id : x.classList[0] ? '.' + x.classList[0] : ''}`;
    const op = (e) => { let o = 1; for (let x = e; x && x.nodeType === 1; x = x.parentElement) o *= Number(getComputedStyle(x).opacity); return o; };
    const steg = () => {
      if (document.body && document.readyState !== 'loading') {
        fasta ??= [...document.body.querySelectorAll('*')].filter((e) => /fixed|sticky/.test(getComputedStyle(e).position));
        if (!text) { const h1 = document.querySelector('h1'), m = document.querySelector('main') || document.body; const p = [...m.querySelectorAll('p')].find((x) => x.textContent.trim().length >= 20 && x.getBoundingClientRect().top < innerHeight); text = [h1, p].filter(Boolean); }
        prov.push({ t: performance.now() - t0, text: text.map((e) => ({ namn: namn(e), op: op(e), anim: e.getAnimations().some((a) => a.playState === 'running') })), fasta: fasta.map((e) => { const q = e.getBoundingClientRect(); return { namn: namn(e), x: q.left, y: q.top, op: op(e), syns: q.width > 0 && q.height > 0 && getComputedStyle(e).display !== 'none' }; }) });
      }
      if (performance.now() - t0 < 1200) requestAnimationFrame(steg);
    };
    requestAnimationFrame(steg);
  });
}
async function sida13f(page) {
  await page.waitForFunction(() => (window.__forsta?.at(-1)?.t ?? 0) >= 1150, null, { timeout: 5000 }).catch(() => {});
  const prov = await page.evaluate(() => window.__forsta || []), ut = new Set(), lagst = new Map();
  for (const p of prov) for (const t of p.text) { lagst.set(t.namn, Math.min(lagst.get(t.namn) ?? 1, t.op)); if (t.anim) ut.add(`${t.namn} animeras under första sekunden`); }
  // En text som tonas (opaciteten ändras) eller börjar nästan osynlig fälls; en fast dämpning, som en överrad med opacitet 0,9, gör det inte.
  const hogst = new Map(); for (const p of prov) for (const t of p.text) hogst.set(t.namn, Math.max(hogst.get(t.namn) ?? 0, t.op));
  for (const [n, op] of lagst) if (op < 0.5 || hogst.get(n) - op > 0.05) ut.add(`${n} har opacitet ned till ${op.toFixed(2).replace('.', ',')} under första sekunden`);
  const antal = Math.max(0, ...prov.map((p) => p.fasta.length));
  for (let i = 0; i < antal; i++) {
    const s = prov.map((p) => p.fasta[i]).filter((x) => x?.syns); if (s.length < 2) continue;
    const spann = (k) => Math.max(...s.map((x) => x[k])) - Math.min(...s.map((x) => x[k]));
    if (spann('x') > 1 || spann('y') > 1 || spann('op') > 0.01) ut.add(`${s[0].namn} (fast eller klibbig) rör sig eller tonas under första sekunden`);
  }
  return [...ut];
}
function sida13g(page) {
  return iSidan(page, () => {
    const ut = new Set();
    for (const n of hTextnoder()) {
      const e = n.parentElement; if (!e.checkVisibility?.({ visibilityProperty: true })) continue;
      const q = e.getBoundingClientRect(); if (q.width < 2 || q.height < 2) continue;
      let o = 1; for (let x = e; x && x.nodeType === 1; x = x.parentElement) o *= Number(getComputedStyle(x).opacity);
      if (o < 0.05) ut.add(`${hNamn(e)} har opacitet ${o.toFixed(2).replace('.', ',')} utan JavaScript`);
    }
    return [...ut];
  });
}
// 13h. Under de första tre sekunderna, i varje bildruta: animationer (CSS, övergångar och Web Animations, också i fördröjning och
// scroll-drivna) på h1, på något i h1 eller på något runt h1 som ändrar opacitet, läge, form, klippning eller storlek, och h1:s egen
// opacitet (med förfäderna) och transform. Animeringar med JavaScript som skriver stilen direkt syns som en ändrad opacitet eller transform.
async function fore13h(ctx) {
  await ctx.addInitScript(() => {
    const t0 = performance.now(), sedda = new WeakSet(), r = (window.__h1in = { klar: false, anim: [], andras: false });
    const inEgenskap = /^(opacity|transform|translate|scale|rotate|filter|clip-?path|clip|top|left|right|bottom|inset|margin.*|padding.*|width|height|max-?height|max-?width|letter-?spacing|visibility)$/i;
    const namn = (x) => `${x.tagName.toLowerCase()}${x.id ? '#' + x.id : x.classList[0] ? '.' + x.classList[0] : ''}`;
    let forsta = null;
    const steg = () => {
      const h1 = document.querySelector('h1');
      if (h1) {
        const runt = []; for (let x = h1.parentElement; x && x !== document.documentElement; x = x.parentElement) runt.push(x);
        for (const a of document.getAnimations()) {
          if (sedda.has(a)) continue; const m = a.effect?.target; if (!m) continue;
          const var_ = m === h1 ? 'h1' : h1.contains(m) ? `${namn(m)} i h1` : runt.includes(m) ? `${namn(m)} runt h1` : null; if (!var_) continue;
          const props = [...new Set((a.effect.getKeyframes?.() || []).flatMap((k) => Object.keys(k)))].filter((p) => inEgenskap.test(p));
          if (!props.length) continue;
          sedda.add(a); r.anim.push(`${var_}: ${a.animationName || a.transitionProperty || 'animation'} (${props.join(', ')})${a.timeline && typeof DocumentTimeline !== 'undefined' && !(a.timeline instanceof DocumentTimeline) ? ', scroll-driven' : ''}`);
        }
        let op = 1; for (let x = h1; x && x.nodeType === 1; x = x.parentElement) op *= Number(getComputedStyle(x).opacity);
        const s = getComputedStyle(h1), sig = [op.toFixed(2), s.transform, s.translate, s.scale, s.rotate, s.filter, s.clipPath].join('|');
        if (forsta === null) forsta = sig; else if (sig !== forsta) r.andras = true;
      }
      if (performance.now() - t0 < 3000) requestAnimationFrame(steg); else r.klar = true;
    };
    requestAnimationFrame(steg);
  });
}
async function sida13h(page) {
  await page.waitForFunction(() => window.__h1in?.klar, null, { timeout: 8000 }).catch(() => {});
  const r = await page.evaluate(() => window.__h1in || null);
  if (!r) return [{ text: 'mätningen startade inte', info: true }];
  const ut = r.anim.map((x) => `${x} animeras under de första tre sekunderna`);
  if (r.andras && !ut.length) ut.push('h1 ändrar opacitet eller transform under de första tre sekunderna');
  return ut;
}
async function fore14(ctx, page, m, minne) {
  minne.andra = new Set(); const ursprung = new URL(m.bas).origin;
  await ctx.route(() => true, (route) => {
    const u = route.request().url(); if (/^(data|blob|about):/.test(u) || new URL(u).origin === ursprung) return route.continue();
    minne.andra.add(new URL(u).origin); return route.abort();
  });
}

// ---------------------------------------------------------------------------------------------------------------------------------
// Hjälpfunktioner som körs i sidan (SIDHJALP). De får inte använda något utanför sig själva och varandra.

function hSynlig(e) {
  if (!e || !e.getBoundingClientRect) return false;
  if (e.checkVisibility && !e.checkVisibility({ visibilityProperty: true, opacityProperty: true })) return false;
  const q = e.getBoundingClientRect(); return q.width > 1 && q.height > 1;
}
function hNamn(x, medText = true) {
  const t = medText ? hText(x, 40) : '';
  return `${x.tagName.toLowerCase()}${x.id ? '#' + x.id : x.classList?.[0] ? '.' + x.classList[0] : ''}${t ? ` ”${t}”` : ''}`;
}
function hText(x, n = 60) { return String(x.getAttribute?.('aria-label') || x.innerText || x.textContent || '').replace(/\s+/g, ' ').trim().slice(0, n); }
function hDold(e) { return !!e.closest('[aria-hidden="true"]'); }
function hRullbar(e) { for (let x = e.parentElement; x && x !== document.body && x !== document.documentElement; x = x.parentElement) if (/auto|scroll/.test(getComputedStyle(x).overflowX)) return true; return false; }
// Utan filterfunktion i TreeWalker, eftersom sidans skript (och därmed återanrop) kan vara avstängda (13g).
function hTextnoder(rot = document.body) {
  const w = document.createTreeWalker(rot, NodeFilter.SHOW_TEXT), ut = [];
  for (let n = w.nextNode(); n; n = w.nextNode()) if (n.textContent.trim() && !n.parentElement.closest('script, style, noscript, template')) ut.push(n);
  return ut;
}
// Hur många rader en textnod ligger på: rektanglar som överlappar i höjdled är samma rad.
function hRader(n) {
  const r = document.createRange(); r.selectNodeContents(n);
  const q = [...r.getClientRects()].filter((x) => x.width > 0.5 && x.height > 0.5).sort((a, b) => a.top - b.top);
  let rader = 0, botten = -Infinity;
  for (const x of q) { if (x.top >= botten - 2) { rader++; botten = x.bottom; } else botten = Math.max(botten, x.bottom); }
  return rader;
}
// Synliga element med egen text eller som går att använda och som slutar till höger om fönstret. Element i en behållare som rullar i
// sidled och sådant som är dolt för hjälpmedel räknas inte.
function hUtanfor(bredd) {
  const ut = new Map();
  for (const n of hTextnoder()) {
    const e = n.parentElement; if (ut.has(e) || hDold(e) || !hSynlig(e) || hRullbar(e)) continue;
    const r = document.createRange(); r.selectNodeContents(n);
    const hoger = Math.max(-Infinity, ...[...r.getClientRects()].filter((x) => x.width > 0.5).map((x) => x.right));
    if (hoger > bredd + 1) ut.set(e, Math.round(hoger - bredd));
  }
  for (const e of document.querySelectorAll('a[href], button, input, select, textarea, [tabindex]:not([tabindex="-1"])')) {
    if (ut.has(e) || hDold(e) || !hSynlig(e) || hRullbar(e)) continue;
    const q = e.getBoundingClientRect(); if (q.right > bredd + 1 && q.left < bredd) ut.set(e, Math.round(q.right - bredd));
  }
  return [...ut].map(([e, px]) => `${hNamn(e)} (${px} px)`);
}
// Hopplänken: den första länken till ett ankare före main. Ger null utan hopplänk, '' när den inte syns och namnet när den syns utan fokus.
function hHopplank() {
  const main = document.querySelector('main');
  const lank = [...document.querySelectorAll('a[href^="#"]')].find((a) => a.getAttribute('href').length > 1 && (!main || a.compareDocumentPosition(main) & Node.DOCUMENT_POSITION_FOLLOWING));
  if (!lank || document.activeElement === lank) return null;
  const s = getComputedStyle(lank); if (s.visibility === 'hidden' || Number(s.opacity) === 0) return '';
  const q = lank.getBoundingClientRect(), x0 = Math.max(q.left, 0), x1 = Math.min(q.right, innerWidth), y0 = Math.max(q.top, 0), y1 = Math.min(q.bottom, innerHeight);
  if (x1 - x0 < 1 || y1 - y0 < 1) return '';
  for (const y of [y0 + 0.5, (y0 + y1) / 2, y1 - 0.5]) for (const x of [x0 + 0.5, (x0 + x1) / 2, x1 - 0.5]) { const t = document.elementFromPoint(x, y); if (t && (t === lank || lank.contains(t))) return hNamn(lank); }
  return '';
}
// Ord i h1–h3 som delas på två rader utan att ett bindestreck visas: hyphens inte auto, och ordet saknar mjukt och hårt bindestreck.
function hDeladeOrd() {
  const ut = [];
  for (const h of document.querySelectorAll('h1, h2, h3')) {
    if (!hSynlig(h)) continue;
    const bind = getComputedStyle(h).hyphens;
    for (const n of hTextnoder(h)) for (const x of n.textContent.matchAll(/\S+/g)) {
      const ord = x[0]; if (bind === 'auto' || ord.includes('-') || (ord.includes('­') && bind !== 'none')) continue;
      const r = document.createRange(); r.setStart(n, x.index); r.setEnd(n, x.index + ord.length);
      const q = [...r.getClientRects()].filter((y) => y.width > 0.5);
      if (q.length > 1 && Math.max(...q.map((y) => y.top)) - Math.min(...q.map((y) => y.top)) > q[0].height / 2) ut.push(`${hNamn(h, false)} ”${ord.replace(/­/g, '')}”`);
    }
  }
  return ut;
}
