// Kontrollskriptet: de tio N1-kontrollerna i guide/2-8-teknik-och-kvalitet.md mot sajtens lokala bygge, med tilläggen efter
// kvalitetsgranskningen 2026-10-16 (sites/<sajt>/kvalitetsgranskning-2026-10-16.jsonl, K15, K16, T1, T2, D4, T8 och J14):
// 1b astro check; 2c HTML-validering med html-validate; 3b fokus som inte skyms, med Tab genom sidorna med och utan samtyckesruta;
// 5b samtycke till bilder av personer; 8b fokusringens kontrast; 10b och 10c ett varv mot Worker-uppsättningen med wrangler dev.
// 404-sidan (/finns-inte/, status 404) prövas för konsolfel, reflow, Tab och axe, men inte för titel, sitemap eller Lighthouse.
// Användning från repots rot: node skript/kontroll.mjs sites/<namn>. SNABB=1 hoppar över Lighthouse (kontroll 9) och inget annat.
// Utfall per kontroll: ok, fel eller läsning. Avslutas med kod 1 om en stoppande kontroll faller.
import { spawnSync, spawn } from 'node:child_process';
import { createServer } from 'node:http';
import { createServer as tcpServer } from 'node:net';
import { gzipSync } from 'node:zlib';
import { tmpdir } from 'node:os';
import { readFileSync, existsSync, readdirSync, statSync, writeFileSync, mkdirSync, mkdtempSync, rmSync } from 'node:fs';
import { join, extname, relative, resolve, sep } from 'node:path';
import { chromium } from 'playwright';
import AxeBuilder from '@axe-core/playwright';
import lighthouse from 'lighthouse';
import desktopConfig from 'lighthouse/core/config/desktop-config.js';
import * as chromeLauncher from 'chrome-launcher';
import { HtmlValidate, StaticConfigLoader } from 'html-validate';

const sajt = process.argv[2];
if (!sajt || !existsSync(join(sajt, 'package.json'))) { console.error('Ange sajtens katalog, t.ex. sites/<sajt>'); process.exit(2); }
const dist = join(sajt, 'dist');
const fakta = readFileSync(join(sajt, 'fakta.md'), 'utf8');
const res = [];
const lagg = (nr, namn, typ, ok, detalj) => res.push({ nr, namn, typ, utfall: ok === null ? 'läsning' : ok ? 'ok' : 'fel', detalj });

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
const typer = { '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript', '.png': 'image/png', '.jpg': 'image/jpeg', '.webp': 'image/webp', '.avif': 'image/avif', '.svg': 'image/svg+xml', '.woff2': 'font/woff2', '.woff': 'font/woff', '.xml': 'application/xml', '.txt': 'text/plain', '.ico': 'image/x-icon' };
const server = createServer((req, svar) => {
  let p = decodeURIComponent(new URL(req.url, 'http://x').pathname);
  let fil = join(dist, p); if (existsSync(fil) && statSync(fil).isDirectory()) fil = join(fil, 'index.html');
  if (!existsSync(fil)) { const s = join(dist, '404.html'); svar.writeHead(404, { 'content-type': typer['.html'] }); return svar.end(existsSync(s) ? readFileSync(s) : 'saknas'); }
  const typ = typer[extname(fil)] || 'application/octet-stream', data = readFileSync(fil);
  if (/text|xml|javascript|svg/.test(typ) && /gzip/.test(req.headers['accept-encoding'] || '')) { svar.writeHead(200, { 'content-type': typ, 'content-encoding': 'gzip', vary: 'accept-encoding' }); return svar.end(gzipSync(data)); }
  svar.writeHead(200, { 'content-type': typ }); svar.end(data);
});
await new Promise((r) => server.listen(0, '127.0.0.1', r));
const bas = `http://127.0.0.1:${server.address().port}`;

// Sidorna hämtas ur sitemap.xml; utan den blir kontroll 7 fel och alla byggda sidor prövas.
const sitemapFil = join(dist, 'sitemap.xml');
let sidor = [];
if (existsSync(sitemapFil)) sidor = [...readFileSync(sitemapFil, 'utf8').matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => new URL(m[1]).pathname);
else sidor = allaFiler(dist).filter((f) => f.endsWith('index.html')).map((f) => '/' + relative(dist, f).replace(/index\.html$/, ''));
// 404-sidan står medvetet inte i sitemap.xml, men besökaren hamnar där. Den prövas för konsolfel, reflow, Tab och axe (K16).
const fyra = '/finns-inte/';
const alla = [...sidor, fyra];

// Länkar som lämnar sajten för en karta, recensioner eller sociala medier: ny flik på datorn, samma flik på mobilen (kontroll 2b).
const lamnar = /google\.[a-z.]+\/maps|maps\.google\.|maps\.apple\.com|g\.page\/|goo\.gl\/maps|facebook\.com|instagram\.com|linkedin\.com|openstreetmap\.org/;

const browser = await chromium.launch();
const per = {};
for (const sida of alla) {
  const url = bas + sida; const r = (per[sida] = { status: 0, konsol: [], bilder: [], axe: [], reflow: 0, titel: '', beskrivning: '', h1: 0, forstaTel: false, forstaBoka: false, text: '', citat: [], nyFlik: [], integritet: false, tillganglighet: false, orgnr: false, form: 'okand', kakor: [], fokuserade: 0, skymda: new Set(), ringar: new Map(), ringarRaknade: new Set(), ringarBild: new Set() });
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
      const axe = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22a', 'wcag22aa']).analyze();
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
for (const [falt, namn] of [['integritet', 'länk till Integritet och kakor']]) {
  const utan = sidor.filter((s) => !per[s][falt]); if (utan.length) k6b.push(`${namn} saknas på ${utan.length === sidor.length ? 'alla sidor' : utan.join(', ')}`);
}
const form = per[sidor[0]]?.form;
if (form === 'okand') k6b.push('företagsformen är okänd, så det går inte att avgöra om organisationsnumret ska visas');
else if (form === 'bolag' && sidor.some((s) => !per[s].orgnr)) k6b.push('organisationsnumret saknas, och företaget är ett bolag');
lagg('6b', 'Integritetspolicy och organisationsnummer i sidfoten', 'Rapport', k6b.length === 0, k6b.length ? k6b.join('; ') : `${sidor.length} sidor`);

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
    if (!(await installningar.count())) k6c.push('knappen Kakinställningar saknas');
    else {
      await installningar.first().click();
      if (!(await p.locator('[data-samtycke-ruta]').isVisible())) k6c.push('Kakinställningar öppnar inte rutan');
      else {
        await p.locator('[data-samtycke-svar="ja"]').click(); await p.waitForTimeout(300);
        jaPoster = poster.length - nejPoster;
        if (!(await korda()).length) k6c.push('skripten körs inte efter ja');
        if (google && !(await signaler()).includes('update:granted/granted')) k6c.push('Consent Mode: ingen uppdatering efter ja');
      }
    }
    if (logg && jaPoster !== null && jaPoster !== 1) k6c.push(`loggen fick ${jaPoster} anrop för ett ja, väntat 1`);
    await p.goto(bas + '/integritet/', { waitUntil: 'networkidle' });
    if (vilande && !(await p.locator('.kaklista').count())) k6c.push('kaklistan saknas på Integritet och kakor');
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
// Applebot följer Googlebots regler när den saknar en egen grupp (Apple, support.apple.com/en-us/119829).
const robotsFil = join(dist, 'robots.txt');
const sokrobotar = ['Googlebot', 'Bingbot', 'OAI-SearchBot', 'PerplexityBot', 'Applebot', 'Google-Extended'];
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

// SNABB=1 hoppar över Lighthouse vid snabba prov under arbetet; den riktiga körningen görs utan.
if (process.env.SNABB) lagg(9, 'Lighthouse', 'Rapport', null, 'hoppades över (SNABB=1)');
else {
// 9. Lighthouse: 100 i alla fyra kategorier, i mobil och dator (Johnny 2026-10-16). En första körning värmer upp Chrome och
// räknas inte, eftersom den första sidan efter start kan få lägre prestanda. Varje sida mäts sedan tre gånger, och medianen
// räknas, eftersom en enskild körning varierar (Lighthouse, docs/variability.md: medianen av fem är dubbelt så stabil som en).
// 404-sidan mäts inte: Lighthouse underkänner SEO för en sida med status 404.
const chrome = await chromeLauncher.launch({ chromePath: chromium.executablePath(), chromeFlags: ['--headless=new'] });
const kat = ['performance', 'accessibility', 'best-practices', 'seo'];
const korning = async (url, conf) => (await lighthouse(url, { port: chrome.port, output: 'json', logLevel: 'error', onlyCategories: kat }, conf)).lhr.categories;
await korning(bas + sidor[0]);
const median = (a) => [...a].sort((x, y) => x - y)[Math.floor(a.length / 2)];
const lh = [];
for (const s of sidor) for (const [namn, conf] of [['mobil', undefined], ['dator', desktopConfig]]) {
  const varv = []; for (let i = 0; i < 3; i++) varv.push(await korning(bas + s, conf));
  const p = (k) => median(varv.map((c) => Math.round(c[k].score * 100)));
  lh.push({ sida: s, namn, prestanda: p('performance'), tillganglighet: p('accessibility'), praxis: p('best-practices'), seo: p('seo') });
}
await chrome.kill();
const k9 = lh.filter((x) => x.prestanda < 100 || x.tillganglighet < 100 || x.praxis < 100 || x.seo < 100);
lagg(9, 'Lighthouse 100 i prestanda, tillgänglighet, praxis och SEO (median av tre)', 'Rapport', k9.length === 0, k9.length ? 'under 100: ' + k9.map((x) => `${x.sida} ${x.namn} (${x.prestanda}/${x.tillganglighet}/${x.praxis}/${x.seo})`).join(', ') : `${lh.length} mätningar, alla 100`);
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
// Cloudflare, Redirects: utan angiven status blir det 302).
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
function allaFiler(d) { return existsSync(d) ? readdirSync(d, { withFileTypes: true }).flatMap((e) => e.isDirectory() ? allaFiler(join(d, e.name)) : [join(d, e.name)]) : []; }
function skrivUt() {
  console.log(`Kontrollskriptet mot ${sajt} – ${new Date().toLocaleString('sv-SE')}`);
  for (const r of res) console.log(`${String(r.nr).padEnd(3)} ${r.utfall.padEnd(8)} ${r.typ.padEnd(15)} ${r.namn} – ${r.detalj}`);
  const stopp = res.filter((r) => r.typ.startsWith('Stopp') && r.utfall === 'fel');
  console.log(stopp.length ? `\n${stopp.length} stoppande kontroller faller: ${stopp.map((r) => r.nr).join(', ')}` : '\nInga stoppande kontroller faller.');
  mkdirSync(join(sajt, 'kontroller'), { recursive: true });
  writeFileSync(join(sajt, 'kontroller', 'senaste.json'), JSON.stringify({ tid: new Date().toISOString(), resultat: res }, null, 1));
  process.exit(stopp.length ? 1 : 0);
}
