// Ritar en statisk kartbild ur OpenStreetMap med en markering i mitten, så att sajten kan visa en karta
// utan att ladda något från tredje part (guide/2-8-teknik-och-kvalitet.md: kartor som bild och länk).
// Användning: node skript/karta.mjs <lat> <lon> <zoom> <bredd> <höjd> <färg> <ut.png>
// Kräver källangivelsen "© OpenStreetMap-bidragsgivare" med länk till https://www.openstreetmap.org/copyright.
import sharp from 'sharp';
const [lat, lon, zoom, bredd, hojd, farg, ut] = process.argv.slice(2);
const z = Number(zoom), B = Number(bredd), H = Number(hojd);
const UA = 'Nortropic-Builder-kartbild/1.0 (+https://github.com/Nortropic/Nortropic-Builder)';
const n = 2 ** z;
const px = ((Number(lon) + 180) / 360) * n * 256;
const lr = (Number(lat) * Math.PI) / 180;
const py = ((1 - Math.log(Math.tan(lr) + 1 / Math.cos(lr)) / Math.PI) / 2) * n * 256;
const x0 = px - B / 2, y0 = py - H / 2;
const tx0 = Math.floor(x0 / 256), ty0 = Math.floor(y0 / 256), tx1 = Math.floor((x0 + B) / 256), ty1 = Math.floor((y0 + H) / 256);
const bitar = [];
for (let tx = tx0; tx <= tx1; tx++) for (let ty = ty0; ty <= ty1; ty++) {
  const s = await fetch(`https://tile.openstreetmap.org/${z}/${tx}/${ty}.png`, { headers: { 'User-Agent': UA } });
  if (!s.ok) throw new Error(`ruta ${z}/${tx}/${ty}: ${s.status}`);
  bitar.push({ input: Buffer.from(await s.arrayBuffer()), left: (tx - tx0) * 256, top: (ty - ty0) * 256 });
  await new Promise((r) => setTimeout(r, 150));
}
const helW = (tx1 - tx0 + 1) * 256, helH = (ty1 - ty0 + 1) * 256;
const hel = await sharp({ create: { width: helW, height: helH, channels: 4, background: '#f2efe9' } }).composite(bitar).png().toBuffer();
const nal = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="44" height="58" viewBox="0 0 44 58"><path d="M22 2C11 2 2 10.6 2 21.6 2 36 22 56 22 56s20-20 20-34.4C42 10.6 33 2 22 2z" fill="${farg}" stroke="#ffffff" stroke-width="3"/><circle cx="22" cy="21" r="7.5" fill="#ffffff"/></svg>`);
await sharp(hel)
  .extract({ left: Math.round(x0 - tx0 * 256), top: Math.round(y0 - ty0 * 256), width: B, height: H })
  .composite([{ input: nal, left: Math.round(B / 2 - 22), top: Math.round(H / 2 - 56) }])
  .png({ compressionLevel: 9 }).toFile(ut);
console.log(`${ut}: ${B}x${H}, zoom ${z}, ${bitar.length} kartrutor`);
