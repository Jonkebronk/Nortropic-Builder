# better-ui

**Källa:** https://github.com/jakubkrehel/skills, sökvägen `skills/better-ui/`. Läst 2026-10-16 vid commit `4c66b1fa86e9` (repot, 2026-10-12); senaste ändring i skillen är `da5f6d5974` (2026-10-05). Pluginversion 1.13.2. Det finns ingen ändringslogg och inga releaser.

Lästa filer: `SKILL.md`, `surfaces.md`, `icons.md`, `animations.md`, `enter-exit.md`, `icon-transitions.md`, `performance.md`, repots `README.md` och `AGENTS.md`. Jämförde också föregångaren https://github.com/jakubkrehel/make-interfaces-feel-better (commit `35545ea1512a`, 2026-08-29), som har samma värden.

Webbsidan https://jakub.kr/skills hänvisar till artikeln *Details That Make Interfaces Feel Better* på jakub.kr ⚠️ (artikeln inte läst; skillen är det som destilleras).

**Licens:** MIT, © 2026 Jakub Krehel (ur `LICENSE`). Upphovsrätts- och licenstexten ska följa med vid kopiering; vi skriver med egna ord och anger källan.

**Vad det är:** En kunskapsskill för detaljfinish med exakta värden: radier, optisk linjering, skuggor, bildkanter, ikontillstånd och rörelse. Den gäller först när interaktionen fungerar – ett finishfynd väger aldrig tyngre än ett trasigt beteende.

**Hur det fungerar:**
- **Kalibrering** (`SKILL.md`, *Exact values, optional polish*):
  - Värdena är exakta (0,96 är inte 0,95). Undantagen är de optiska justeringarna och 24px-gränsen för koncentriska radier, som bedöms för ögat.
  - En konsekvent projektstil, till exempel inga skuggor alls, är en preferens och inget fel.
  - Samma detalj gjord på två sätt i samma projekt är ett fel.
- **Koncentriska radier** (`surfaces.md`): yttre radie = inre + padding + kantbredd (inre 12px, padding 8px ger 20px). Över 24px padding blir lagren separata ytor med var sin radie.
- **Optisk linjering** (`surfaces.md`):
  - Ikonsidan av en knapp får 2px mindre padding (16/14px).
  - Play-triangeln flyttas 2px mot spetsen.
  - Asymmetriska ikoner rättas i SVG:ns viewBox, annars med 1px på omslaget.
- **Skuggor för djup, kanter för struktur** (`surfaces.md`):
  - Tre lager i ljust läge: `0 0 0 1px oklch(0 0 0 / 0.06)`, `0 1px 2px -1px oklch(0 0 0 / 0.06)`, `0 2px 4px 0 oklch(0 0 0 / 0.04)`. Hover: 0.08/0.08/0.06.
  - Mörkt läge: en ring `0 0 0 1px oklch(1 0 0 / 0.08)`, hover 0.13.
  - Alltid `border: 1px solid transparent` under skuggan, eftersom forced-colors tar bort skuggor.
  - Kanter behålls på avdelare, tabellceller, valt tillstånd och formulärfält.
- **Bildkant** (`surfaces.md`): `outline: 1px solid` med `outline-offset: -1px`, svart 10 % i ljust läge och vit 10 % i mörkt. Aldrig tonad neutral eller accent. Inte på genomskinliga bilder som logotyper.
- **Ikoner** (`icons.md`):
  - Strecket följer textvikten i renderade pixlar: 1,5px vid 400, 2px vid 500–600, 2,5px vid 700.
  - En ikonfamilj per yta. Inline-ikoner 1–1,25em.
  - `currentColor`, tillstånd via färg och opacitet (inaktiv 0,4). Kontur som standard, fylld som aktiv. I RTL speglas bara riktningsikoner.
- **Hover och scroll** (`SKILL.md`): hover bara i `@media (hover: hover)`; `-webkit-tap-highlight-color: transparent`; `overscroll-behavior: contain` i dialoger.
- **Rörelse** (`animations.md`, `enter-exit.md`, `icon-transitions.md`, `performance.md`):
  - tryck `scale: 0.96` på 150ms ease-out, aldrig på inaktiva knappar
  - täta interaktioner högst 150ms
  - transitions i stället för keyframes, aldrig `transition: all`
  - entré: 100ms förskjutning, opacity + blur 4px + 12px, 300ms
  - utgång: 150ms
  - ikonbyte: scale 0,25→1 och blur 4→0px, 300ms `cubic-bezier(0.2, 0, 0, 1)`
  - reduced motion: bara opacitet.

**Kvalitet och underhåll:**
- Samma repo som better-colors: 7 968 stjärnor, två bidragsgivare, senaste ändring i skillen 2026-10-05.
- Föregångaren make-interfaces-feel-better har 3 685 stjärnor, en bidragsgivare och 0 öppna ärenden.
- Kända problem:
  - #40, sidopunkt (stängt 2026-10-07): CSS-receptet för förskjuten entré saknade skydd för reduced motion. Dagens `enter-exit.md` har skyddet: grundanimationen tonar bara, och förflyttningen läggs i `no-preference`.
  - #27 och #35 (stängda som ”not planned” 2026-10-07): exemplen i `icon-transitions.md` har ikonknappar utan tillgängligt namn och ikoner utan `aria-hidden`. Det är **fortfarande så** i dagens fil (`<button>` på rad 16 och 50).
  - PR #21 (öppen): punkten om Tailwind 3 och 4 i `transition-transform` finns redan i main.

**Det bästa vi kan ta:**
- Koncentriska radier (`surfaces.md`, *Concentric border radius*): yttre radie = `calc(var(--k-radie-bild) + padding)`.
- Optisk linjering (`surfaces.md`, *Optical alignment*).
- Skuggrecepten med lager och transparent kant (`surfaces.md`, *Shadow recipes*). Kiten saknar skuggtokens i dag.
- Bildkanten (`surfaces.md`, *Image outlines*). Den passar 2-5:s bildregler för kundens foton.
- Strecktabellen och tillståndsfärgerna för ikoner (`icons.md`).
- `@media (hover: hover)` och `overscroll-behavior: contain` (`SKILL.md`).
- Tabellen *Before you finish* som sökmönster:
  - lika radie på förälder och barn med padding
  - skuggring utan `border`
  - palettfärgad outline på `img`
  - `transition: all`
  - `fill="#…"` i SVG
  - hover utanför `(hover: hover)`
  - tryckskala utan `:disabled`-undantag.

**Var det hamnar hos oss:**
- `.claude/skills/yta/detaljer.md`: radier, optisk linjering, skuggor, bildkant, ikonstreck och ikontillstånd, hover-frågan.
- `.claude/skills/yta/tokens.md`: nya tokens per kit, nämligen skuggnivå och hover-nivå i ljust läge, en ring i mörkt läge och bildkant, samt regeln att kortets radie räknas ur bildens radie och padding. Namnförslag i vår stil, t.ex. `--k-skugga`, `--k-skugga-hover`, `--k-bildkant` (förslag).
- `.claude/skills/yta/generiskt.md`: källans kalibrering stöder vår regel att AI-utseende i sig inte är ett fynd. En konsekvent stil är en preferens; bara samma detalj gjord på två sätt är ett fel.
- **Rörelseskillen, inte ytan:** tryck, entréer, utgångar och ikonbyten.
- **Kontroll:** sökmönstren går till designregelvakten som rapport.

**Passar vår stack?**
- **Direkt, noll JavaScript:** all yta (radier, skuggor, bildkant, ikonfärger, hover-frågan) är CSS och fungerar i Astro med `--k-*`. Med Tailwind 4, som nu är tillåtet, kan källans Tailwind-recept tas nästan som de är:
  - `outline outline-1 -outline-offset-1 outline-black/10 dark:outline-white/10`
  - `enabled:active:scale-[0.96]`
  - Tailwind 4:s `hover:` kompileras redan under `(hover: hover)`.
- **Ikoner:** `absoluteStrokeWidth` är en prop i lucide-react. Vi har lucide-static, där motsvarigheten är `vector-effect: non-scaling-stroke` på ikonens former, eller stroke-width = önskade px × 24 / visad storlek.
  - Med React tillåtet går lucide-react också. En React-komponent i Astro utan `client:`-direktiv renderas till HTML vid bygget och kostar ingen JavaScript.
  - Lucide har inga fyllda varianter, så källans kontur/fylld-par kräver Phosphor eller Tabler; kitet väljer familj.
- **Rörelserecepten:**
  - `AnimatePresence` och `motion.*` kräver en React-ö med Motion i webbläsaren: hela `motion`-komponenten är 43 kB, och `m` + `LazyMotion` är drygt 5 kB + 24 kB med `domAnimation` (motion.dev, *Reduce bundle size*).
  - Det finns CSS-varianter för allt i källan, och de kostar ingenting. Ta CSS-varianten först.
  - Temabytesreceptet (`animations.md`) är skrivet för React/Next och behövs bara om ett kit får mörkt läge med växlare.
- **Krockar som tas upp med Johnny (BESLUT 2026-10-16), inte stopp:**
  1. Den förskjutna entrén börjar med text på opacity 0, vilket krockar med ”ingen text som börjar osynlig” och kan fördröja LCP. Den måste bort från första skärmen.
  2. Oskärpa räknas som rörelse hos oss (2-6 [N1]).
  3. Budgeten *sparsam* tillåter bara tillståndsbyten.
  4. Tryckskalan 0,96 mot 2-6:s ”cirka 0,97”.
  5. En Motion-ö per sida drar ned Lighthouse-marginalen. Ytdelen har ingen sådan kostnad.

**Risker och flaggor:**
- Licens: ingen risk.
- Telemetri bara vid installation via `npx skills add` (avstängbart med `DISABLE_TELEMETRY=1`); vi installerar inte.
- Ingen betalvägg och ingen inloggning.
- Tillgänglighet: exemplen för ikonbyte saknar `aria-label` på knappen och `aria-hidden` på ikonerna (#27/#35, stängda utan rättning). Lägg till dem om exemplen används (WCAG 4.1.2).
- Accent: ”aktiv” ikonfärg får vara accent bara för tillstånd och handlingar (G3). Dekorikoner tar text- eller dämpad färg.
- Krock med andra skills:
  - Emils skills (tryck 0,97, studs 0,1–0,3, hover med `pointer: fine`).
  - Emils `animation-performance` avråder från att animera `box-shadow`, som källan gör på hover (150ms). Det spelar liten roll för enstaka kort.
  - Rörelseskillen avgör värdena.
