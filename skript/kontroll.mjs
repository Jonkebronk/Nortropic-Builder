// Kontrollskriptet: de tio N1-kontrollerna i guide/2-8-teknik-och-kvalitet.md mot sajtens lokala bygge.
// Användning från repots rot: node skript/kontroll.mjs sites/<namn>
// Utfall per kontroll: ok, fel eller läsning. Avslutas med kod 1 om en stoppande kontroll faller.
import { spawnSync } from 'node:child_process';
import { createServer } from 'node:http';
import { gzipSync } from 'node:zlib';
import { readFileSync, existsSync, readdirSync, statSync, writeFileSync, mkdirSync } from 'node:fs';
import { join, extname, relative } from 'node:path';
import { chromium } from 'playwright';
import AxeBuilder from '@axe-core/playwright';
import lighthouse from 'lighthouse';
import desktopConfig from 'lighthouse/core/config/desktop-config.js';
import * as chromeLauncher from 'chrome-launcher';

const sajt = process.argv[2];
if (!sajt || !existsSync(join(sajt, 'package.json'))) { console.error('Ange sajtens katalog, t.ex. sites/torsokliniken'); process.exit(2); }
const dist = join(sajt, 'dist');
const fakta = readFileSync(join(sajt, 'fakta.md'), 'utf8');
const res = [];
const lagg = (nr, namn, typ, ok, detalj) => res.push({ nr, namn, typ, utfall: ok === null ? 'läsning' : ok ? 'ok' : 'fel', detalj });

// 1. Bygget
const bygg = spawnSync('npx', ['astro', 'build'], { cwd: sajt, encoding: 'utf8' });
lagg(1, 'astro build utan fel', 'Stopp', bygg.status === 0, bygg.status === 0 ? 'bygget gick igenom' : (bygg.stderr || bygg.stdout).slice(-400));
if (bygg.status !== 0) skrivUt();

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

// Länkar som lämnar sajten för en karta, recensioner eller sociala medier: ny flik på datorn, samma flik på mobilen (kontroll 2b).
const lamnar = /google\.[a-z.]+\/maps|maps\.google\.|maps\.apple\.com|g\.page\/|goo\.gl\/maps|facebook\.com|instagram\.com|linkedin\.com|openstreetmap\.org/;

const browser = await chromium.launch();
const per = {};
for (const sida of sidor) {
  const url = bas + sida; const r = (per[sida] = { konsol: [], bilder: [], axe: [], reflow: false, titel: '', beskrivning: '', h1: 0, forstaTel: false, forstaBoka: false, text: '', citat: [], nyFlik: [], integritet: false, tillganglighet: false, orgnr: false, form: 'okand' });
  for (const [b, h, mobil] of [[320, 700, true], [375, 812, true], [1280, 800, false]]) {
    const ctx = await browser.newContext({ viewport: { width: b, height: h }, isMobile: mobil, hasTouch: mobil, locale: 'sv-SE' });
    const page = await ctx.newPage();
    if (b === 375) {
      page.on('console', (m) => { if (m.type() === 'error') r.konsol.push(m.text().slice(0, 160)); });
      page.on('pageerror', (e) => r.konsol.push(String(e).slice(0, 160)));
      page.on('response', (s) => { if (s.request().resourceType() === 'image' && s.status() >= 400) r.bilder.push(`${s.status()} ${s.url()}`); });
    }
    await page.goto(url, { waitUntil: 'networkidle' });
    await page.evaluate(() => document.fonts.ready);
    if (b === 320) r.reflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
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
    await ctx.close();
  }
}
await browser.close();

// 2. Konsolfel och bilder
const k2 = sidor.flatMap((s) => [...per[s].konsol.map((x) => `${s} konsol: ${x}`), ...per[s].bilder.map((x) => `${s} bild: ${x}`)]);
lagg(2, 'Inga konsolfel; alla bilder laddas', 'Rapport', k2.length === 0, k2.length ? k2.slice(0, 6).join(' | ') : `${sidor.length} sidor utan fel`);
const k2b = sidor.flatMap((s) => per[s].nyFlik.map((x) => `${s} ${x}`));
lagg('2b', 'Kartor, recensioner och sociala medier: ny flik på datorn, samma flik på mobilen', 'Rapport', k2b.length === 0, k2b.length ? k2b.slice(0, 6).join(' | ') : `${sidor.length} sidor i 375 och 1280 px`);

// 3. Reflow i 320 px
const k3 = sidor.filter((s) => per[s].reflow);
lagg(3, 'Ingen horisontell scroll i 320 px', 'Stopp', k3.length === 0, k3.length ? `scrollar i sidled: ${k3.join(', ')}` : `${sidor.length} sidor`);

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
const k8 = sidor.flatMap((s) => per[s].axe.map((v) => `${s} ${v}`));
lagg(8, 'axe WCAG 2.2 A/AA: 0 fel', 'Stopp', k8.length === 0, k8.length ? k8.slice(0, 8).join(' | ') : `0 fel på ${sidor.length} sidor i 375 och 1280 px`);

// 9. Lighthouse: 100 i alla fyra kategorier, i mobil och dator (Johnny 2026-10-16). En första körning värmer upp Chrome och
// räknas inte, eftersom den första sidan efter start kan få lägre prestanda. Varje sida mäts sedan tre gånger, och medianen
// räknas, eftersom en enskild körning varierar (Lighthouse, docs/variability.md: medianen av fem är dubbelt så stabil som en).
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

// 10. Hemligheter i repot och i bygget
const monster = [/AKIA[0-9A-Z]{16}/, /sk-(?:ant-|live_|proj-)?[A-Za-z0-9_-]{20,}/, /gh[pousr]_[A-Za-z0-9]{30,}/, /AIza[0-9A-Za-z_-]{35}/, /AQ\.[A-Za-z0-9_-]{30,}/, /xox[baprs]-[A-Za-z0-9-]{10,}/, /-----BEGIN [A-Z ]*PRIVATE KEY-----/, /(?:api[_-]?key|secret|token)["'\s]*[:=]\s*["'][A-Za-z0-9_\-]{16,}["']/i];
const repoFiler = spawnSync('git', ['ls-files'], { cwd: sajt, encoding: 'utf8' }).stdout.split('\n').filter(Boolean).map((f) => join(sajt, f));
const k10 = [];
for (const f of [...repoFiler, ...allaFiler(dist).filter((f) => /\.(html|js|map|css|xml|txt|json)$/.test(f))]) {
  if (!existsSync(f) || statSync(f).size > 5e6 || /\.(png|jpe?g|webp|avif|woff2?)$/.test(f)) continue;
  const t = readFileSync(f, 'utf8'); for (const m of monster) if (m.test(t)) k10.push(`${relative(sajt, f)} (${m.source.slice(0, 14)}…)`);
}
lagg(10, 'Inga hemligheter i repot eller i bygget', 'Stopp', k10.length === 0, k10.length ? k10.slice(0, 6).join(', ') : `${repoFiler.length} filer i repot och bygget genomsökta`);

server.close();
skrivUt();

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
