// Bilderna till Nortropics enkät (skript/enkat/Kod.gs): första vyn i mobil för varje sajt, och testets enkat.json.
// Användning från repots rot:
//   node skript/enkat-bilder.mjs <utkatalog> --fraga "Om du behövde en kiropraktor i Malmö: hos vilket företag skulle du hellre boka?" \
//     --alt "vår sajt=http://127.0.0.1:4322/" --alt "originalet=https://torsokliniken.se/"
// Varje alternativ får en neutral etikett (Sajt X, Y, Z) och en bild x.jpg, y.jpg, z.jpg. Vilken sajt som är vilken står bara i
// "kalla" i enkat.json, som formuläret inte visar. Bilderna är 390 × 844 CSS-px (en vanlig mobil) med dubbel upplösning,
// nedskalade till 600 px breda JPEG, så att de syns skarpt i formuläret utan att bli tunga.
// Kakrutor stängs med knappen för att neka (eller godkänna, om nej saknas), och byråns kvitto efter svaret med Stäng.
// Utkatalogen ska ligga utanför repot: bilderna visar kundens sajt (BESLUT.md 2026-10-17: bara i en sluten krets).
import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { chromium } from 'playwright';
import sharp from 'sharp';

const args = process.argv.slice(2);
const ut = args.shift();
const alt = [], opt = { fraga: '', titel: 'Snabb fråga, en minut', notering: 'Inga rätt eller fel. Bilderna är privata, så sprid dem inte.' };
for (let i = 0; i < args.length; i++) {
  if (args[i] === '--alt') { const [kalla, ...url] = args[++i].split('='); alt.push({ kalla, url: url.join('=') }); }
  else if (args[i] === '--fraga') opt.fraga = args[++i];
  else if (args[i] === '--titel') opt.titel = args[++i];
}
if (!ut || alt.length < 2 || !opt.fraga) {
  console.error('Användning: node skript/enkat-bilder.mjs <utkatalog> --fraga "…" --alt "namn=url" --alt "namn=url"');
  process.exit(1);
}
mkdirSync(ut, { recursive: true });

const KNAPPAR = /^(neka alla|neka|avvisa alla|avvisa|endast nödvändiga|bara nödvändiga|godkänn alla|godkänn|acceptera alla|acceptera|jag förstår|ok)$/i;
const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true, locale: 'sv-SE' });
const page = await ctx.newPage();
const bokstaver = ['x', 'y', 'z', 'w'];
const poster = [];
for (const [i, a] of alt.entries()) {
  await page.goto(a.url, { waitUntil: 'networkidle', timeout: 45000 }).catch(() => {});
  await page.evaluate(() => document.fonts?.ready).catch(() => {});
  for (const knapp of await page.getByRole('button').all()) {
    const t = ((await knapp.textContent().catch(() => '')) || '').trim();
    if (KNAPPAR.test(t) && (await knapp.isVisible().catch(() => false))) { await knapp.click().catch(() => {}); break; }
  }
  // Byråns ruta visar ett kvitto efter svaret; det stängs också.
  await page.waitForTimeout(300);
  const stang = page.getByRole('button', { name: /^stäng$/i }).first();
  if (await stang.isVisible().catch(() => false)) await stang.click().catch(() => {});
  await page.waitForTimeout(800);
  const fil = `${bokstaver[i]}.jpg`;
  await sharp(await page.screenshot()).resize({ width: 600 }).jpeg({ quality: 80, mozjpeg: true }).toFile(join(ut, fil));
  poster.push({ etikett: `Sajt ${bokstaver[i].toUpperCase()}`, bild: fil, kalla: a.kalla, url: a.url });
  console.log(`${fil}: ${a.kalla} (${a.url})`);
}
await browser.close();
writeFileSync(join(ut, 'enkat.json'), JSON.stringify({ titel: opt.titel, fraga: opt.fraga, notering: opt.notering, alternativ: poster }, null, 1));
console.log(`enkat.json och ${poster.length} bilder i ${ut}`);
