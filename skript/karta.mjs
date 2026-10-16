// Ritar en statisk kartbild ur OpenStreetMaps data med en egen nål på läget, så att sajten kan visa en karta
// utan att ladda något från tredje part (guide/2-8-teknik-och-kvalitet.md: kartor som bild och länk).
// Stilen följer Johnnys beslut 2026-10-16 (Kvalitetsgranskningen, punkt 7): dämpad, i gråskala, egen nål i
// accentfärgen och skarp på retinaskärmar (fynden D8 och K13 i kvalitetsgranskningen).
//
// Kartan ritas som SVG ur OSM-data från Overpass API, inte ur rutorna på tile.openstreetmap.org. Två skäl:
// - Rutservern tillåter inte rutor som hämtas i förväg för senare bruk ("Offline use is not permitted on
//   tile.openstreetmap.org", operations.osmfoundation.org/policies/tiles/, läst 2026-10-16; vår tolkning).
// - Rutorna finns bara i 256 px med etiketter på ca 11 px. I dubbel upplösning blir gatunamnen då hälften så
//   stora, och förstorade rutor blir suddiga. Egna etiketter kan göras skarpa och stora nog för mobilen.
//
// Användning: node skript/karta.mjs --lat=<lat> --lon=<lon> --ut=<fil.png>
//   [--gata=<namn i OSM>] [--namn=8] [--zoom=16] [--bredd=720] [--hojd=440] [--skala=2] [--text=19]
//   [--farg=#b4471c] [--ny] [--overpass=<url>]
// zoom, bredd och höjd beskriver kartan i CSS-pixlar som en vanlig webbkarta (rutor på 256 px); skala 2 ritar
// den i dubbel upplösning (720×440 blir 1440×880), skarp upp till 720 CSS-px. text är gatunamnens storlek i
// samma CSS-pixlar. Läget hamnar mitt i bilden, där nålens spets pekar.
// Overpass-svaret sparas i skript/.cache/karta/ (git tar inte med det) och används igen i sju dagar; --ny
// hämtar på nytt. Overpass ber om en egen User-Agent, få anrop och cache (wiki.openstreetmap.org/wiki/Overpass_API).
// Kräver källangivelsen "© OpenStreetMap-bidragsgivare" med länk till https://www.openstreetmap.org/copyright (ODbL).
//
// Körs en gång per mottagning, med läget ur sajtens fakta.md. --gata är gatan som OpenStreetMap har vid läget, som kan skilja sig
// från adressens gatunamn:
//   node skript/karta.mjs --lat=<lat> --lon=<lon> --gata=<gata> --ut=sites/<sajt>/src/assets/karta-<ort>.png
import sharp from 'sharp';
import { createHash } from 'node:crypto';
import { mkdir, readFile, stat, writeFile } from 'node:fs/promises';

const arg = Object.fromEntries(process.argv.slice(2).map((a) => {
  const [k, ...v] = a.replace(/^--/, '').split('=');
  return [k, v.length ? v.join('=') : true];
}));
const lat = Number(arg.lat), lon = Number(arg.lon), ut = arg.ut;
const zoom = Number(arg.zoom ?? 16), skala = Number(arg.skala ?? 2), text = Number(arg.text ?? 19);
const B = Math.round(Number(arg.bredd ?? 720) * skala), H = Math.round(Number(arg.hojd ?? 440) * skala);
const farg = arg.farg ?? '#b4471c';
if (!Number.isFinite(lat) || !Number.isFinite(lon) || typeof ut !== 'string') {
  console.error('Användning: node skript/karta.mjs --lat=<lat> --lon=<lon> --ut=<fil.png> [--gata=<namn>] [--namn=8] [--zoom=16] [--bredd=720] [--hojd=440] [--skala=2] [--text=19] [--farg=#b4471c] [--ny] [--overpass=<url>]');
  process.exit(1);
}
const UA = 'Nortropic-Builder-kartbild/2.0 (+https://github.com/Nortropic/Nortropic-Builder)';
const s = (v) => v * skala; // CSS-pixlar till bildpunkter

// Färgerna: varm gråskala, något ljusare och med lägre kontrast än vanliga webbkartor, så att kartan ligger lugnt
// mot kitets ytor (--k-bg #f6f3ee, --k-linje #ddd6cc). Text i mörk grå med vit kant. Bara nålen har färg.
const F = {
  mark: '#f1efeb', gron: '#e4e5e0', vatten: '#dadfe1', hus: '#e3dfd8', huskant: '#d4cec5',
  vagkant: '#cec7bd', vag: '#ffffff', bana: '#b6b0a7', text: '#464d4a', halo: '#ffffff',
};

// Web Mercator, samma projektion som webbkartor: världens bredd i bildpunkter vid vald zoom och skala.
const V = 256 * 2 ** zoom * skala;
const tillX = (lo) => ((lo + 180) / 360) * V;
const tillY = (la) => { const r = (la * Math.PI) / 180; return ((1 - Math.log(Math.tan(r) + 1 / Math.cos(r)) / Math.PI) / 2) * V; };
const tillLon = (x) => (x / V) * 360 - 180;
const tillLat = (y) => (Math.atan(Math.sinh(Math.PI * (1 - (2 * y) / V))) * 180) / Math.PI;
const x0 = tillX(lon) - B / 2, y0 = tillY(lat) - H / 2;
const punkt = (p) => [tillX(p.lon) - x0, tillY(p.lat) - y0];

// Hämtar vägar, hus, grönytor, vatten och järnväg i ett område en fjärdedel större än bilden åt varje håll,
// så att linjer och ytor fortsätter ut över kanten.
const m = B / 4;
const bbox = [tillLat(y0 + H + m), tillLon(x0 - m), tillLat(y0 - m), tillLon(x0 + B + m)].map((v) => v.toFixed(6)).join(',');
const fraga = `[out:json][timeout:90];
(
  way[highway](${bbox});
  way[railway~"^(rail|light_rail|tram|subway|narrow_gauge)$"](${bbox});
  way[building](${bbox});
  way[landuse](${bbox}); way[leisure](${bbox}); way[natural](${bbox}); way[waterway](${bbox});
  relation[type=multipolygon][building](${bbox}); relation[type=multipolygon][landuse](${bbox});
  relation[type=multipolygon][leisure](${bbox}); relation[type=multipolygon][natural](${bbox});
);
out geom;`;
const cache = new URL(`.cache/karta/${createHash('sha1').update(fraga).digest('hex').slice(0, 16)}.json`, import.meta.url);
let data;
try {
  if (arg.ny || Date.now() - (await stat(cache)).mtimeMs > 7 * 864e5) throw new Error('gammal');
  data = JSON.parse(await readFile(cache, 'utf8'));
} catch {
  // Servern ber om exponentiell väntan när den är full (svar 429, 502–504): 15, 30 och 60 sekunder.
  for (let forsok = 0, vanta = 15; ; forsok++, vanta *= 2) {
    const svar = await fetch(arg.overpass ?? 'https://overpass-api.de/api/interpreter', {
      method: 'POST',
      headers: { 'User-Agent': UA, 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `data=${encodeURIComponent(fraga)}`,
    });
    if (svar.ok) { data = await svar.json(); break; }
    if (forsok === 3 || ![429, 502, 503, 504].includes(svar.status)) throw new Error(`Overpass svarade ${svar.status}`);
    console.log(`Overpass svarade ${svar.status}, väntar ${vanta} s`);
    await new Promise((r) => setTimeout(r, vanta * 1000));
  }
  await mkdir(new URL('.', cache), { recursive: true });
  await writeFile(cache, JSON.stringify(data));
}

// Sätter ihop vägstycken som möts i ändarna till längre linjer eller slutna ringar (multipolygoner och gator).
const lika = (a, b) => a.lat === b.lat && a.lon === b.lon;
function foga(delar) {
  const kvar = delar.filter((d) => d.length > 1).map((d) => d.slice()), klara = [];
  while (kvar.length) {
    let r = kvar.shift(), andrat = true;
    while (andrat && !lika(r[0], r.at(-1))) {
      andrat = false;
      for (let i = 0; i < kvar.length; i++) {
        const d = kvar[i];
        if (lika(r.at(-1), d[0])) r = r.concat(d.slice(1));
        else if (lika(r.at(-1), d.at(-1))) r = r.concat(d.slice(0, -1).reverse());
        else if (lika(r[0], d.at(-1))) r = d.concat(r.slice(1));
        else if (lika(r[0], d[0])) r = d.slice().reverse().concat(r.slice(1));
        else continue;
        kvar.splice(i, 1); andrat = true; break;
      }
    }
    klara.push(r);
  }
  return klara;
}
const sokvag = (pts, sluten) => pts.map(punkt).map(([x, y], i) => `${i ? 'L' : 'M'}${x.toFixed(1)} ${y.toFixed(1)}`).join('') + (sluten ? 'Z' : '');

// Sorterar elementen i lager: ytor, vatten, hus, vägar och järnväg.
const GRON = /^(park|garden|playground|pitch|recreation_ground|grass|meadow|village_green|cemetery|forest|wood|scrub|grassland|heath|allotments|golf_course|dog_park|nature_reserve)$/;
const ar = { ytor: [], vatten: [], hus: [], vattendrag: [], vagar: [], bana: [] };
for (const e of data.elements) {
  const t = e.tags ?? {};
  let ringar = [];
  if (e.type === 'way' && e.geometry) ringar = [e.geometry];
  else if (e.type === 'relation') ringar = foga((e.members ?? []).filter((d) => d.type === 'way' && d.geometry).map((d) => d.geometry));
  if (!ringar.length) continue;
  const sluten = ringar.every((r) => r.length > 3 && lika(r[0], r.at(-1)));
  const yta = sluten ? ringar.map((r) => sokvag(r, true)).join('') : null;
  if (t.highway && t.area !== 'yes' && e.type === 'way') ar.vagar.push({ t, pts: e.geometry });
  else if (t.highway && t.area === 'yes' && yta) ar.ytor.push({ d: yta, fyll: F.vag }); // torg och gågator som ytor
  else if (t.railway && e.type === 'way' && !t.tunnel) ar.bana.push(sokvag(e.geometry));
  else if (t.building && t.building !== 'no' && yta) ar.hus.push(yta);
  else if ((t.natural === 'water' || t.waterway === 'riverbank' || /^(reservoir|basin)$/.test(t.landuse ?? '')) && yta) ar.vatten.push(yta);
  else if (/^(river|stream|canal|ditch|drain)$/.test(t.waterway ?? '') && e.type === 'way' && t.tunnel !== 'culvert') ar.vattendrag.push({ d: sokvag(e.geometry), b: t.waterway === 'river' || t.waterway === 'canal' ? 6 : 2 });
  else if ((GRON.test(t.leisure ?? '') || GRON.test(t.landuse ?? '') || GRON.test(t.natural ?? '')) && yta) ar.ytor.push({ d: yta, fyll: F.gron });
}

// Vägarnas bredd i CSS-pixlar per klass, och vilka klasser som får namn utskrivna (lägre rang skrivs först).
const KLASS = {
  motorway: [9, 1], trunk: [9, 1], primary: [8, 1], secondary: [7.5, 2], tertiary: [7, 2],
  residential: [6, 3], unclassified: [6, 3], living_street: [5, 3], road: [5, 3], pedestrian: [5, 4],
  service: [3, 9], track: [2, 9], footway: [1.4, 9], path: [1.4, 9], cycleway: [1.4, 9], steps: [1.4, 9], bridleway: [1.4, 9],
};
const klass = (t) => KLASS[t.highway?.replace(/_link$/, '')] ?? null;
const lagerAv = (t) => Number(t.layer) || (t.bridge ? 1 : 0);
const vagar = ar.vagar.filter((v) => klass(v.t) && !v.t.tunnel && v.t.highway !== 'construction' && v.t.highway !== 'proposed')
  .sort((a, b) => lagerAv(a.t) - lagerAv(b.t) || klass(b.t)[0] - klass(a.t)[0]);
let vagSvg = '';
for (const lager of [...new Set(vagar.map((v) => lagerAv(v.t)))]) {
  const dessa = vagar.filter((v) => lagerAv(v.t) === lager);
  for (const v of dessa) { // kanter under, så att korsningar flyter ihop
    const [b] = klass(v.t);
    if (b >= 3) vagSvg += `<path d="${sokvag(v.pts)}" stroke="${F.vagkant}" stroke-width="${s(b + 1.6)}"/>`;
  }
  for (const v of dessa) {
    const [b] = klass(v.t);
    vagSvg += `<path d="${sokvag(v.pts)}" stroke="${F.vag}" stroke-width="${s(b)}"/>`; // gång- och cykelvägar utan kant
  }
}

// Nålen: droppform i accentfärgen med vit inre cirkel, tunn mörk kontur och en mjuk skugga under spetsen.
// Ritad i CSS-pixlar (48×66); spetsen ligger i (24, 62), som placeras exakt på läget mitt i bilden.
const nalSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="${s(48)}" height="${s(66)}" viewBox="0 0 48 66">
  <defs><filter id="sk" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="1.6"/></filter></defs>
  <ellipse cx="24" cy="62" rx="8" ry="3" fill="#000" opacity="0.28" filter="url(#sk)"/>
  <path d="M24 62C24 62 5 41 5 24.5A19 19 0 0 1 43 24.5C43 41 24 62 24 62Z" fill="${farg}" stroke="#22382f" stroke-opacity="0.75" stroke-width="1.4" stroke-linejoin="round"/>
  <circle cx="24" cy="24.5" r="7.5" fill="#ffffff"/>
</svg>`;
const nalRuta = { x: B / 2 - s(20), y: H / 2 - s(58), b: s(40), h: s(60) }; // där inga etiketter får ligga

// Gatunamnen: en etikett per namn, tecken för tecken längs gatan så att namnet följer även en svag kurva,
// aldrig upp och ner. Adressens gata (--gata, annars gatan närmast läget) skrivs först och så nära nålen som
// går, och krymps till 80 % om den annars inte får plats. Övriga följer efter vägklass och närhet till nålen,
// högst --namn stycken, utan att krocka med varandra, nålen eller kanten. Få namn håller kartan lugn, och de
// närmaste gatorna räcker för att hitta.
const typsnitt = 'Helvetica Neue, Helvetica, Arial, sans-serif';
const esc = (t) => t.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const matt = new Map();
async function textbredd(t, storlek) { // mäter "|t|" och drar av "||", så att mellanslag och kerning räknas
  const nyckel = `${t}|${storlek}`;
  if (!matt.has(nyckel)) {
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${Math.ceil(storlek * (t.length + 4))}" height="${Math.ceil(storlek * 2)}"><text x="${storlek}" y="${storlek * 1.4}" font-family="${typsnitt}" font-size="${storlek}" font-weight="500">${esc(`|${t}|`)}</text></svg>`;
    const { info } = await sharp(Buffer.from(svg)).trim().toBuffer({ resolveWithObject: true });
    matt.set(nyckel, info.width);
  }
  return matt.get(nyckel);
}
async function tecken(namn, storlek) { // varje teckens mitt och bredd, räknat från namnets början
  const noll = await textbredd('', storlek), kanter = [];
  for (let i = 0; i <= namn.length; i++) kanter.push((await textbredd(namn.slice(0, i), storlek)) - noll);
  return namn.split('').map((c, i) => ({ c, mitt: (kanter[i] + kanter[i + 1]) / 2, b: kanter[i + 1] - kanter[i] }));
}
const horn = (r) => {
  const c = Math.cos(r.a), si = Math.sin(r.a), hb = r.b / 2, hh = r.h / 2;
  const p = [[-hb, -hh], [hb, -hh], [hb, hh], [-hb, hh]].map(([u, v]) => [r.x + u * c - v * si, r.y + u * si + v * c]);
  p.ram = [Math.min(...p.map((q) => q[0])), Math.min(...p.map((q) => q[1])), Math.max(...p.map((q) => q[0])), Math.max(...p.map((q) => q[1]))];
  return p;
};
function krockar(p, q) { // separerande axlar för två roterade rektanglar, efter en snabb koll av omskrivna rutor
  if (p.ram[2] < q.ram[0] || q.ram[2] < p.ram[0] || p.ram[3] < q.ram[1] || q.ram[3] < p.ram[1]) return false;
  for (const poly of [p, q]) for (let i = 0; i < 4; i++) {
    const [ax, ay] = poly[i], [bx, by] = poly[(i + 1) % 4], nx = by - ay, ny = ax - bx;
    const proj = (pp) => pp.map(([x, y]) => x * nx + y * ny);
    const a = proj(p), b = proj(q);
    if (Math.max(...a) < Math.min(...b) || Math.max(...b) < Math.min(...a)) return false;
  }
  return true;
}
const avstandTillLinje = (px, py, pts) => Math.min(...pts.slice(1).map((q, i) => {
  const [ax, ay] = pts[i], [bx, by] = q, dx = bx - ax, dy = by - ay, l2 = dx * dx + dy * dy || 1;
  const u = Math.max(0, Math.min(1, ((px - ax) * dx + (py - ay) * dy) / l2));
  return Math.hypot(ax + u * dx - px, ay + u * dy - py);
}));
const langs = (l) => l.reduce((d, p, i) => (i ? [...d, d[i - 1] + Math.hypot(p[0] - l[i - 1][0], p[1] - l[i - 1][1])] : [0]), []);
function vid(l, d, m) { // punkten m bildpunkter in längs linjen
  m = Math.max(0, Math.min(d.at(-1), m));
  let i = 1;
  while (i < d.length - 1 && d[i] < m) i++;
  const u = (m - d[i - 1]) / (d[i] - d[i - 1] || 1);
  return [l[i - 1][0] + u * (l[i][0] - l[i - 1][0]), l[i - 1][1] + u * (l[i][1] - l[i - 1][1])];
}
const skillnad = (a, b) => { let v = Math.abs(a - b) % (2 * Math.PI); return v > Math.PI ? 2 * Math.PI - v : v; };
const inne = ([x, y]) => x > 0 && x < B && y > 0 && y < H;

const namngivna = new Map();
for (const v of vagar) {
  const k = klass(v.t);
  if (!v.t.name || k[1] > 4) continue;
  const g = namngivna.get(v.t.name) ?? { namn: v.t.name, rang: k[1], delar: [] };
  g.rang = Math.min(g.rang, k[1]); g.delar.push(v.pts); namngivna.set(v.t.name, g);
}
const grupper = [...namngivna.values()].map((g) => {
  const linjer = foga(g.delar).map((l) => l.map(punkt));
  const synliga = linjer.flatMap((l) => l.slice(1).map((p, i) => [l[i], p])).filter(([a, b]) => inne(a) && inne(b));
  const langd = synliga.reduce((sum, [a, b]) => sum + Math.hypot(b[0] - a[0], b[1] - a[1]), 0);
  const narhet = Math.min(...linjer.map((l) => avstandTillLinje(B / 2, H / 2, l)));
  const mitt = synliga.length ? [0, 1].map((k) => synliga.reduce((sum, [a, b]) => sum + a[k] + b[k], 0) / (2 * synliga.length)) : [B / 2, H / 2];
  return { ...g, linjer, langd, narhet, mitt };
}).filter((g) => g.langd > 0);
const narmast = grupper.find((g) => g.namn === arg.gata) ?? grupper.reduce((a, g) => (!a || g.narhet < a.narhet ? g : a), null);
if (arg.gata && narmast?.namn !== arg.gata) console.warn(`Gatan ${arg.gata} finns inte i OSM-datan; skriver ${narmast?.namn} först.`);
grupper.sort((a, b) => (b === narmast) - (a === narmast) || a.rang - b.rang || a.narhet - b.narhet);

const storlek = s(text), luft = s(3), kant = s(6), grader = Math.PI / 180;
const placerade = [horn({ x: nalRuta.x + nalRuta.b / 2, y: nalRuta.y + nalRuta.h / 2, a: 0, b: nalRuta.b, h: nalRuta.h })];
let halor = '', namn = '';
const utskrivna = [], max = Number(arg.namn ?? 8);
for (const g of grupper) {
  if (utskrivna.length >= max) break;
  const mal = g === narmast ? [B / 2, H / 2] : g.mitt;
  let basta = null;
  for (const f of g === narmast ? [1, 0.9, 0.8] : [1]) {
    const st = (g.rang <= 2 ? storlek * 1.06 : storlek) * f, th = st * 1.15;
    const tk = await tecken(g.namn, st), tb = tk.at(-1).mitt + tk.at(-1).b / 2 + 2 * luft;
    for (const l0 of g.linjer) for (const l of [l0, l0.slice().reverse()]) {
      const d = langs(l);
      for (let start = 0; start + tb <= d.at(-1); start += s(5)) {
        // Läsriktningen: kordan över namnet ska peka åt höger (nära lodräta läses nerifrån och upp).
        const [sx, sy] = vid(l, d, start), [ex, ey] = vid(l, d, start + tb), ka = Math.atan2(ey - sy, ex - sx);
        if (ka > 80 * grader || ka <= -100 * grader) continue;
        const glyfer = tk.map((t) => {
          const m = start + luft + t.mitt, [x, y] = vid(l, d, m);
          const [ax, ay] = vid(l, d, m - st * 0.6), [bx, by] = vid(l, d, m + st * 0.6);
          return { ...t, x, y, a: Math.atan2(by - ay, bx - ax) };
        });
        // Svängen: högst 25° mellan två tecken och 40° över hela namnet.
        if (glyfer.some((q, i) => i && skillnad(q.a, glyfer[i - 1].a) > 25 * grader)) continue;
        const sving = Math.max(...glyfer.map((q) => skillnad(q.a, glyfer[0].a)));
        if (sving > 40 * grader) continue;
        const rutor = glyfer.map((q) => horn({ x: q.x, y: q.y, a: q.a, b: q.b + st * 0.3, h: th }));
        if (rutor.some((r) => r.ram[0] < kant || r.ram[2] > B - kant || r.ram[1] < kant || r.ram[3] > H - kant)) continue;
        if (rutor.some((r) => placerade.some((p) => krockar(p, r)))) continue;
        const [mx, my] = vid(l, d, start + tb / 2);
        const poang = Math.hypot(mx - mal[0], my - mal[1]) + (sving / grader) * s(2) + Math.abs(Math.sin(ka)) * s(40); // rakt och vågrätt läses lättast
        if (!basta || poang < basta.poang) basta = { glyfer, rutor, st, poang };
      }
    }
    if (basta) break;
  }
  if (!basta) continue;
  placerade.push(...basta.rutor); utskrivna.push(g.namn);
  const { st } = basta;
  for (const q of basta.glyfer.filter((q) => q.c.trim())) {
    const t = `<text transform="translate(${q.x.toFixed(1)} ${q.y.toFixed(1)}) rotate(${(q.a / grader).toFixed(1)})" y="${(st * 0.36).toFixed(1)}" text-anchor="middle" font-size="${st.toFixed(1)}">${esc(q.c)}</text>`;
    halor += t; namn += t;
  }
}
const textSvg = `<g font-family="${typsnitt}" font-weight="500" stroke-linejoin="round">
  <g fill="none" stroke="${F.halo}" stroke-width="${(storlek * 0.24).toFixed(1)}">${halor}</g>
  <g fill="${F.text}">${namn}</g>
</g>`;

const karta = `<svg xmlns="http://www.w3.org/2000/svg" width="${B}" height="${H}" viewBox="0 0 ${B} ${H}">
  <rect width="${B}" height="${H}" fill="${F.mark}"/>
  <g stroke="none">${ar.ytor.map((y) => `<path d="${y.d}" fill="${y.fyll}" fill-rule="evenodd"/>`).join('')}</g>
  <g fill="${F.vatten}" fill-rule="evenodd">${ar.vatten.map((d) => `<path d="${d}"/>`).join('')}</g>
  <g fill="none" stroke="${F.vatten}" stroke-linecap="round">${ar.vattendrag.map((v) => `<path d="${v.d}" stroke-width="${s(v.b)}"/>`).join('')}</g>
  <g fill="${F.hus}" stroke="${F.huskant}" stroke-width="${s(0.8)}" fill-rule="evenodd">${ar.hus.map((d) => `<path d="${d}"/>`).join('')}</g>
  <g fill="none" stroke-linecap="round" stroke-linejoin="round">${vagSvg}</g>
  <g fill="none" stroke="${F.bana}" stroke-width="${s(1.6)}">${ar.bana.map((d) => `<path d="${d}"/>`).join('')}</g>
  ${textSvg}
</svg>`;

await sharp(Buffer.from(karta))
  .composite([{ input: Buffer.from(nalSvg), left: Math.round(B / 2 - s(24)), top: Math.round(H / 2 - s(62)) }])
  .png({ compressionLevel: 9, palette: true, colours: 128, effort: 10 })
  .toFile(ut);
console.log(`${ut}: ${B}x${H}, zoom ${zoom}, skala ${skala}, ${ar.hus.length} hus, ${vagar.length} vägar, gatunamn: ${utskrivna.join(', ')}`);
