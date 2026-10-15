// Gör favikon, hemskärmsikon och delningsbild ur kundens egen logotyp och foto (inga påhittade bilder).
// Användning: node skript/ikoner.mjs <logotyp.png> <bakgrund #hex> <foto.png> <yta #hex> <utkatalog>
import sharp from 'sharp';
import { join } from 'node:path';
const [logo, bg, foto, yta, ut] = process.argv.slice(2);
const ruta = async (storlek, fil) => {
  const marke = await sharp(logo).resize(Math.round(storlek * 0.72), Math.round(storlek * 0.72), { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } }).png().toBuffer();
  await sharp({ create: { width: storlek, height: storlek, channels: 4, background: bg } }).composite([{ input: marke, gravity: 'center' }]).png().toFile(join(ut, fil));
};
await ruta(48, 'favicon.png');
await ruta(180, 'apple-touch-icon.png');
const person = await sharp(foto).resize({ height: 600, fit: 'inside' }).png().toBuffer();
const marke = await sharp(logo).resize(200, 200, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } }).png().toBuffer();
const markeRuta = await sharp({ create: { width: 280, height: 280, channels: 4, background: bg } }).composite([{ input: marke, gravity: 'center' }]).png().toBuffer();
await sharp({ create: { width: 1200, height: 630, channels: 4, background: yta } })
  .composite([{ input: markeRuta, left: 140, top: 175 }, { input: person, left: 640, top: 30 }]).png().toFile(join(ut, 'delning.png'));
console.log('favicon.png, apple-touch-icon.png och delning.png i', ut);
