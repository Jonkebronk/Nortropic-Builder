# Utopia och Capsize

## Utopia (metod, kalkylatorer och utopia-core)

**Källa:** https://utopia.fyi/type/calculator/, https://utopia.fyi/space/calculator/, artikeln "Clamp" av Trys Mudford (2020-09-25) https://utopia.fyi/blog/clamp/. Kod: https://github.com/trys/utopia-core, commit 135c051 (2024-09-19), npm `utopia-core` 1.6.0 (2024-09-19); README och `src/index.ts` lästa. Läst 2026-10-16.

**Licens:** `utopia-core` anger ISC i `package.json`, men repot har ingen LICENSE-fil och GitHub visar ingen licens. ISC kräver att copyright- och licensnotisen följer med kopior. Kalkylatorernas utdata (CSS-värden) är våra.

**Vad det är:** En metod av James Gilyead och Trys Mudford (Clearleft) för flytande typografi och avstånd: man bestämmer en skala för minsta och största skärm, och webbläsaren interpolerar mellan dem med `clamp()`. "not a product, a plugin, or a framework" (utopia.fyi).

**Hur det fungerar:**
- Formeln (artikeln "Clamp"): "Slope = (MaxSize - MinSize) / (MaxWidth - MinWidth)", "yIntersection = (-1 * MinWidth) * Slope + MinSize", och värdet blir `clamp(MinSize[rem], yIntersection[rem] + Slope * 100vw, MaxSize[rem])`. Exempel: 1rem–2rem över 320–1440 px ger `clamp(1rem, 0.7143rem + 1.4286vw, 2rem)`.
- `utopia-core` använder samma formel men enheten `vi` som standard (`cqi` för containrar) och avrundar till fyra decimaler (`src/index.ts`).
- Typkalkylatorn ger stegen `--step--2` … `--step-5`, till exempel `--step-0: clamp(1.125rem, 1.0739rem + 0.2273vw, 1.25rem)` för 360 px/18 px/1,2 och 1240 px/20 px/1,25.
- Space-kalkylatorn: basstorleken (18→20 px) gånger multiplikatorer ger storlekarna 3xs (0,25), 2xs (0,5), xs (0,75), s (1), m (1,5), l (2), xl (3), 2xl (4) och 3xl (6). "One-up pairs" interpolerar mellan två grannsteg, till exempel `--space-s-m: clamp(1.125rem, 0.8182rem + 1.3636vw, 1.875rem)`, och "custom pairs" mellan valfria steg ("introduce more dramatic space variance between different viewport sizes").
- `calculateTypeScale()` returnerar `wcagViolation` för steg som inte går att förstora till 200 % (WCAG 1.4.4). Funktionen `checkWCAG` räknar med zoom upp till fem gånger. `calculateSpaceScale()` ger `sizes`, `oneUpPairs` och `customPairs`; `calculateClamp()` en enskild `clamp()`.
- Barvians regel (Smashing Magazine 2023-11-07, https://www.smashingmagazine.com/2023/11/addressing-accessibility-concerns-fluid-type/): "The maximum value must be less than or equal to 2.5 times the minimum value." Då klarar texten 1.4.4 "at least on all modern browsers", och regeln gäller också icke-flytande responsiv typ. Han rekommenderar `rem`.

**Kvalitet och underhåll:** `utopia-core` har 139 stjärnor, 4 bidragsgivare och 3 öppna ärenden (#6 egna stegnamn, #7 rutnätsfunktion); senaste commit 2024-09-19. Litet men färdigt bibliotek med en enda uppgift.

## Capsize

**Källa:** https://github.com/seek-oss/capsize, commit 1fcf40a (2026-10-15). npm: `@capsizecss/core` 4.1.3 (2025-11-12), `@capsizecss/metrics` 4.4.0 (2026-10-15), `@capsizecss/unpack` 4.0.1 (2026-06-12). Lästa: README, `packages/metrics/README.md` och `packages/core/src/createStyleObject.ts`. Läst 2026-10-16.

**Licens:** MIT.

**Vad det är:** Ett bibliotek som använder typsnittets egna mått för att storleksbestämma text efter versalhöjd och skära bort luften ovanför versalerna och under baslinjen. Det skapar också metrikanpassade reservtypsnitt mot layoutskift.

**Hur det fungerar:**
- `createStyleObject({ fontSize | capHeight, leading | lineGap, fontMetrics })` ger `fontSize`, `lineHeight` och två pseudoelement: `::before` med negativ `marginBottom` och `::after` med negativ `marginTop`, båda `display: 'table'` (källkoden). `createStyleString` ger samma som CSS-text. README varnar för att lägga andra layoutstilar på samma element.
- `createFontStack` skriver `@font-face` med `ascent-override`, `descent-override`, `line-gap-override` och `size-adjust` för reserver som Arial, vilket "can dramatically improve the Cumulative Layout Shift".
- `@capsizecss/metrics` har mått för system- och Google-typsnitt per vikt; `@capsizecss/unpack` läser mått ur egna filer. `xWidthAvg` för subset `latin` bygger på teckenfrekvens i engelska Wikinews; bara `latin` och `thai` finns.
- Jämförelse med CSS `text-box: trim-both cap alphabetic`: samma effekt (kanterna hamnar vid versalhöjd och baslinje) utan pseudoelement och utan typsnittsmått. MDN visar "Baseline 2026, Newly available … Since August 2026" (https://developer.mozilla.org/en-US/docs/Web/CSS/text-box). MDN:s kompatibilitetsdata 8.1.6 (2026-10-15) anger Chrome 133, Firefox 154 och Safari 18.2. Paketet `web-features` 3.43.0 (2026-10-15) saknar ännu Firefox för funktionen och kallar den inte Baseline – källorna går isär under några dagar.

**Kvalitet och underhåll:** 1 732 stjärnor, 23 bidragsgivare, 9 öppna ärenden och PR:er, senaste release 2026-10-15. Kända problem: #121 "Supporting rem as fontSize and lineheight" (öppen sedan 2023 – Capsize räknar i px), #42 "Different rendering on windows", #173 mått för alla vikter, #216 importfel mot fontkit (2024).

## Gemensamt för posten

**Det bästa vi kan ta:**
- Utopias formel och space pairs som standard för kitens skalor: `--k-step-*` för typ och `--k-space-*` plus par som `--k-space-s-m` för sektionsavstånd. Dagens kit har redan `clamp()` för rubriker och `--k-sektion`, men inte från en gemensam skala.
- `wcagViolation` ur `utopia-core` och Barvians 2,5× som automatisk kontroll per steg.
- `text-box: trim-both cap alphabetic` på knappar, etiketter och rubriker som progressiv förbättring i stället för Capsizes pseudoelement.
- Capsize-mått (`@capsizecss/metrics`/`unpack`) bara där vi räknar reservtypsnitt själva; med Astros Fonts API sker det redan.

**Var det hamnar hos oss:** Ytskillen `typografi.md` (skala, 2,5×-regeln, `text-box`) och `tokens.md` (hur `clamp()` byggs ur min/max). Kontroll: ett skript som läser kitens steg och stoppar om max > 2,5 × min eller om `wcagViolation` inte är `null`. `utopia-core` som byggberoende; Capsize behövs inte som eget beroende om Fonts API används.

**Passar vår stack?** Ja. Utopia ger ren CSS och 0 byte JavaScript; Capsize körs bara vid byggtid. Med Tailwind 4 tillåtet (`BESLUT.md` 2026-10-16, kl. 12.28) kan stegen också läggas i `@theme` som `--text-step-0` och `--spacing-s-m`, så att utilities som `text-step-0` fungerar. Översättning: Utopias namn (`--step-0`, `--space-s-m`) får prefixet `--k-`; `vi` eller `vw` väljs en gång. I DTCG blir varje steg två `dimension`-tokens (min och max) som en Terrazzo-transform gör till `clamp()`.

**Risker och flaggor:**
- `utopia-core` saknar LICENSE-fil och har inte ändrats sedan 2024.
- Capsizes pseudoelement krockar med annan layout på samma element och räknar i px (#121); använd hellre `text-box`.
- `ascent-override`/`descent-override` stöds inte i Safari enligt MDN:s data, så reservtypsnittens höjd stämmer inte där; `size-adjust` gör det (Safari 17).
- Ingen telemetri, betalvägg eller inloggning.
