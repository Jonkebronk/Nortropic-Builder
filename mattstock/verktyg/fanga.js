// Fångar skärmbilder av sajterna i urval.json:
//   <id>-d.jpg   dator, första skärmen (1280×800) – miniatyr och första intryck
//   <id>-hel.jpg dator, hela startsidan (högst MAXD px)
//   <id>-m.jpg   mobil, hela startsidan (390 px bred, högst MAXM px)
// Kör: npm install && npx playwright install chromium && node fanga.js [id ...]
// Läser ../urval.json; bilderna hamnar i skarmar/ (utanför git).
const { chromium, devices } = require('playwright');
const fs = require('fs');
const path = require('path');

const KAND = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'urval.json'), 'utf8'));
const UT = path.join(__dirname, 'skarmar');
fs.mkdirSync(UT, { recursive: true });
const bara = process.argv.slice(2);
const MAXD = 7000;
const MAXM = 4500;

const COOKIE = /^(jag )?(godkänn(er)?|acceptera(r)?|tillåt|accept|allow|ok|okej|jag förstår|i agree|agree|got it|förstått)( alla| all)?( cookies| kakor)?( och stäng)?!?$/i;

async function bortCookies(page) {
  for (let i = 0; i < 2; i++) {
    for (const f of page.frames()) {
      try {
        const knappar = await f.$$('button, a[role=button], [role=button], input[type=button], input[type=submit], a.button, a.btn');
        for (const k of knappar) {
          const t = ((await k.innerText().catch(() => '')) || (await k.getAttribute('value')) || '').trim().replace(/\s+/g, ' ');
          if (t && t.length < 40 && COOKIE.test(t) && (await k.isVisible().catch(() => false))) {
            await k.click({ timeout: 1500 }).catch(() => {});
            await page.waitForTimeout(700);
            return true;
          }
        }
      } catch {}
    }
    await page.waitForTimeout(800);
  }
  return false;
}

// Scrolla igenom sidan så att lat laddade bilder och inglidande sektioner visas.
async function genomScrolla(page, max) {
  const steg = 500;
  for (let y = 0; y < max; y += steg) {
    const h = await page.evaluate(() => document.documentElement.scrollHeight).catch(() => 0);
    if (y > h) break;
    await page.evaluate((yy) => window.scrollTo(0, yy), y).catch(() => {});
    await page.waitForTimeout(180);
  }
  await page.evaluate(() => window.scrollTo(0, 0)).catch(() => {});
  await page.waitForLoadState('networkidle', { timeout: 5000 }).catch(() => {});
  await page.waitForTimeout(900);
}

// Sajter som scrollar inuti en egen behållare (t.ex. Durable) ger bara en skärmhöjd.
// Lossa behållaren och dess föräldrar så att hela sidan hamnar i dokumentflödet.
async function lossaScroll(page) {
  return page.evaluate(() => {
    const rullar = [...document.querySelectorAll('body *')].filter((e) => {
      const st = getComputedStyle(e);
      return /(auto|scroll)/.test(st.overflowY) && e.scrollHeight > e.clientHeight + 100 && e.clientHeight > window.innerHeight * 0.5;
    });
    const losa = new Set([document.documentElement, document.body]);
    for (const e of rullar) for (let x = e; x && x !== document.documentElement; x = x.parentElement) losa.add(x);
    for (const e of losa) {
      e.style.setProperty('height', 'auto', 'important');
      e.style.setProperty('max-height', 'none', 'important');
      e.style.setProperty('overflow', 'visible', 'important');
    }
    return rullar.length;
  }).catch(() => 0);
}

async function fanga(browser, s, typ) {
  const mobil = typ === 'mobil';
  const ctx = mobil
    ? await browser.newContext({ ...devices['iPhone 13'], deviceScaleFactor: 2, locale: 'sv-SE' })
    : await browser.newContext({ viewport: { width: 1280, height: 800 }, locale: 'sv-SE' });
  const page = await ctx.newPage();
  page.setDefaultTimeout(15000);
  try {
    await page.goto(s.url, { waitUntil: 'domcontentloaded', timeout: 30000 });
    await page.waitForLoadState('networkidle', { timeout: 8000 }).catch(() => {});
    await page.waitForTimeout(1500);
    await bortCookies(page);
    await page.waitForTimeout(500);
    if (!mobil) {
      await page.screenshot({ path: path.join(UT, `${s.id}-d.jpg`), type: 'jpeg', quality: 70 });
    }
    const max = mobil ? MAXM : MAXD;
    const vp0 = page.viewportSize();
    const h0 = await page.evaluate(() => document.documentElement.scrollHeight);
    if (h0 <= vp0.height + 50) await lossaScroll(page);
    await genomScrolla(page, max);
    const vp = page.viewportSize();
    const h = await page.evaluate(() => document.documentElement.scrollHeight);
    const hojd = Math.max(vp.height, Math.min(h, max));
    await page.screenshot({
      path: path.join(UT, `${s.id}-${mobil ? 'm' : 'hel'}.jpg`),
      type: 'jpeg', quality: mobil ? 55 : 60, fullPage: true,
      clip: { x: 0, y: 0, width: vp.width, height: hojd },
    });
    return { status: 'ok', hojd, sidhojd: h };
  } catch (e) {
    return { status: 'fel: ' + String(e.message).split('\n')[0] };
  } finally {
    await ctx.close();
  }
}

// Hård gräns per fångst: en sajt som hänger får inte stoppa resten.
function medGrans(lofte, ms) {
  return Promise.race([lofte, new Promise((r) => setTimeout(() => r({ status: 'fel: tidsgräns' }), ms))]);
}

(async () => {
  const browser = await chromium.launch();
  const loggfil = path.join(__dirname, 'fangst-logg.json');
  const logg = fs.existsSync(loggfil) ? JSON.parse(fs.readFileSync(loggfil, 'utf8')) : {};
  const klar = (id) => logg[id] && logg[id].dator.status === 'ok' && logg[id].mobil.status === 'ok';
  const jobb = KAND.filter((s) => (bara.length ? bara.includes(s.id) : !klar(s.id)));
  // Fyra sajter åt gången
  for (let i = 0; i < jobb.length; i += 4) {
    await Promise.all(jobb.slice(i, i + 4).map(async (s) => {
      const d = await medGrans(fanga(browser, s, 'dator'), 120000);
      const m = await medGrans(fanga(browser, s, 'mobil'), 120000);
      logg[s.id] = { url: s.url, dator: d, mobil: m };
      fs.writeFileSync(loggfil, JSON.stringify(logg, null, 2));
      console.log(s.id, d.status, d.sidhojd || '', '|', m.status, m.sidhojd || '');
    }));
  }
  fs.writeFileSync(loggfil, JSON.stringify(logg, null, 2));
  await Promise.race([browser.close(), new Promise((r) => setTimeout(r, 5000))]);
  process.exit(0);
})();
