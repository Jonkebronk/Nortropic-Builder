// Statusskriptet: jämför statusen per funktion i .claude/skills/kvalitet/modern-html-css.md med web-features,
// som är facit (översynens punkt 18, kunskap/research/2026-10-16_verktyg-och-skills-full-potential.md; ersätter MDN-MCP:n,
// BESLUT.md 2026-10-16, 21.37). Körs i startsäkringen efter att web-features har gått till senaste version.
// Varje rad i tabellen har ett eller flera id i web-features (id, eller id@compat-nyckel när raden gäller en del av funktionen).
// Kontrollen per id: high kräver "Widely" (och månaden för baseline_high_date när raden skriver "Widely ("),
// low kräver "Newly" och månaden för baseline_low_date, false kräver "Limited" eller "Inte Baseline".
// En rad utan statusord ("Används redan i biblioteket") ska vara Widely.
// En rad som saknar id här, eller ett id som inte finns i web-features, rapporteras.
// Användning från repots rot: node skript/baseline.mjs
import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { features } from 'web-features';

const ROT = join(dirname(fileURLToPath(import.meta.url)), '..');
const SKILL = '.claude/skills/kvalitet/modern-html-css.md';
const VERSION = JSON.parse(readFileSync(join(ROT, 'skript/node_modules/web-features/package.json'), 'utf8')).version;

const ID = {
  '`<dialog>` med `showModal()`, `::backdrop`': ['dialog', 'backdrop'],
  '`inert`': ['inert'],
  '`<details>` och `<summary>`': ['details'],
  '`<details name>`': ['details-name'],
  '`popover` och `popovertarget`': ['popover'],
  'Invoker commands (`command`, `commandfor`)': ['invoker-commands'],
  '`loading="lazy"` på `img` och `iframe`': ['loading-lazy'],
  '`fetchpriority`': ['fetch-priority'],
  '`font-display`': ['font-display'],
  '`:focus-visible`': ['focus-visible'],
  '`prefers-reduced-motion`': ['prefers-reduced-motion'],
  '`forced-colors`': ['forced-colors'],
  '`color-scheme`, `light-dark()`': ['color-scheme', 'light-dark'],
  '`text-wrap: balance`': ['text-wrap-balance'],
  '`text-wrap: pretty`': ['text-wrap-pretty'],
  '`content-visibility`': ['content-visibility'],
  '`scrollbar-gutter`': ['scrollbar-gutter'],
  'Container queries (storlek)': ['container-queries'],
  '`:has()`': ['has'],
  '`dvh`, `clamp()`, logiska egenskaper': ['viewport-unit-variants', 'min-max-clamp', 'logical-properties'],
  '`overflow: clip`': ['overflow-clip'],
  '`<source>` med `width` och `height` i `<picture>`': ['source@html.elements.source.width', 'source@html.elements.source.height'],
  '`:user-invalid`': ['user-pseudos'],
  '`inputmode`, `enterkeyhint`': ['inputmode', 'enterkeyhint'],
  '`hyphens: auto` med `lang="sv"`': ['hyphens'],
  '`mask-image`': ['masks'],
  'Alt-text i `content` (`content: "→" / ""`)': ['alt-text-generated-content'],
  '`scrollbar-width`, `scrollbar-color`': ['scrollbar-width', 'scrollbar-color'],
  '`field-sizing: content`': ['field-sizing'],
  '`@starting-style`': ['starting-style'],
  '`allow-discrete` i `transition`': ['transition-behavior'],
  '`overlay` i en övergång': ['overlay'],
  'View transitions mellan dokument': ['cross-document-view-transitions'],
  'Scrollstyrd animering': ['scroll-driven-animations'],
  '`<dialog closedby>`': ['dialog-closedby'],
  '`hidden="until-found"`': ['hidden-until-found'],
  'Speculation rules': ['speculation-rules'],
  'Anchor positioning': ['anchor-positioning'],
  '`<meta name="text-scale" content="scale">`': ['meta-text-scale'],
  '`scheduler.yield()`': ['scheduler@api.Scheduler.yield'],
};

function status(id) {
  const [namn, nyckel] = id.split('@');
  const f = features[namn];
  if (!f || f.kind !== 'feature') return null;
  return nyckel ? f.status.by_compat_key?.[nyckel] ?? null : f.status;
}

const manad = (datum) => (datum || '').replace(/^≤/, '').slice(0, 7);
const statusord = /Widely|Newly|Limited|Inte Baseline/;

// Tabellen under "## Status per funktion"
const text = readFileSync(join(ROT, SKILL), 'utf8');
const avsnitt = text.split('## Status per funktion')[1]?.split('\n## ')[0] ?? '';
const rader = avsnitt.split('\n').filter((r) => r.startsWith('| ') && !r.startsWith('| Funktion') && !r.startsWith('|---'))
  .map((r) => r.split(' | ').map((c) => c.replace(/^\| /, '').trim()));

const fel = [], snart = [];
let ok = 0;
const sedda = new Set();
const om90 = new Date(Date.now() + 90 * 864e5).toISOString().slice(0, 10);
for (const [funktion, cell] of rader) {
  sedda.add(funktion);
  const ider = ID[funktion];
  if (!ider) { fel.push(`raden "${funktion}" saknar id i skript/baseline.mjs`); continue; }
  let radOk = true;
  for (const id of ider) {
    const s = status(id);
    if (!s) { fel.push(`${funktion}: id ${id} finns inte i web-features ${VERSION}`); radOk = false; continue; }
    const lag = manad(s.baseline_low_date), hog = manad(s.baseline_high_date);
    let ratt;
    if (!statusord.test(cell)) ratt = s.baseline === 'high';
    else if (s.baseline === 'high') ratt = cell.includes('Widely') && (!cell.includes('Widely (') || cell.includes(hog));
    else if (s.baseline === 'low') ratt = cell.includes('Newly') && cell.includes(lag);
    else ratt = cell.includes('Limited') || cell.includes('Inte Baseline');
    if (!ratt) {
      radOk = false;
      const facit = s.baseline === 'high' ? `Widely (${hog})` : s.baseline === 'low' ? `Newly (${lag})` : 'Limited';
      fel.push(`${funktion}: skillen säger "${cell}", web-features ${VERSION} säger ${facit} för ${id}`);
    }
    // Newly blir Widely 30 månader efter baseline_low_date; web-features räknar ut baseline_high_date först då.
    if (s.baseline === 'low' && s.baseline_low_date) {
      const d = new Date(s.baseline_low_date.replace(/^≤/, '')); d.setMonth(d.getMonth() + 30);
      const blir = d.toISOString().slice(0, 10);
      if (blir <= om90) snart.push(`${funktion} (${id}) blir Widely omkring ${blir.slice(0, 7)}`);
    }
  }
  if (radOk) ok++;
}
for (const f of Object.keys(ID)) if (!sedda.has(f)) fel.push(`id-raden "${f}" finns inte längre i tabellen; ta bort den ur skript/baseline.mjs`);

for (const f of fel) console.log(`⚠️ Baseline: ${f}`);
for (const s of snart) console.log(`snart: ${s}`);
console.log(`${ok} av ${rader.length} statusrader i ${SKILL} stämmer med web-features ${VERSION}`);
