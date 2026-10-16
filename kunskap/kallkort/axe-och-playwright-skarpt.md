# axe och Playwright, skärpt

**Källa:** allt läst 2026-10-16.
- **axe-core** https://github.com/dequelabs/axe-core, taggen **v4.14.0** (2026-10-05).
  - Lästa filer: `README.md` (bland annat "Supported Browsers"), `doc/rule-descriptions.md`, `doc/API.md` (resultattyper och `incomplete`) och `CHANGELOG.md` 4.14.0.
- **@axe-core/playwright** https://github.com/dequelabs/axe-core-npm, develop vid commit `55245d5` (2026-10-15).
  - Lästa filer: `packages/playwright/README.md`, `error-handling.md`, `CHANGELOG.md` och `test/axe-playwright.spec.ts`.
  - npm: `@axe-core/playwright` **4.14.0** (2026-10-15), Node ≥ 22.12, beroende `axe-core ~4.14.0`, peer `playwright-core >= 1.0.0`.
- **Playwright:** [Accessibility testing](https://playwright.dev/docs/accessibility-testing).
- **Astro:** `astro@7.4.0/dist/runtime/server/astro-island.js`, hämtad från unpkg (hydreringen, rad 145–192).
- **Vårt nuläge:** `skript/kontroll.mjs` rad 113 och 289–291, samt `skript/package.json`.
- **Ärenden:** sök-API:t i axe-core och axe-core-npm (öppna, sorterade på reaktioner, samt "webkit").

**Licens:**
- axe-core och @axe-core/playwright: MPL-2.0. Den är filbaserad, så ändrade MPL-filer som sprids ska finnas tillgängliga under MPL. Att köra dem som beroende i kontrollskriptet ställer inga krav.
- Playwright: Apache-2.0.

**Vad det är:**
- axe-core är Deques regelmotor för WCAG-kontroller i den renderade sidan.
- @axe-core/playwright kör den i en Playwright-sida och returnerar `violations`, `incomplete`, `passes` och `inapplicable`.
- "Skärpt" betyder: WCAG 2.2-taggarna påslagna, fler motorer, fler tillstånd och att `incomplete` läses.

**Hur det fungerar:**
- **Taggar** (`rule-descriptions.md` v4.14.0):
  - Bara `target-size` har taggen `wcag22aa`. Den är "disabled by default" tills WCAG 2.2 är mer spritt.
  - Ingen regel har taggen `wcag22a`.
  - Nytt i 4.14: `label-content-name-mismatch` är **påslagen som standard**, och `target-size` har fått taggarna `EN-301-549v4` och `EN-9.2.5.8`.
- **`incomplete`** (needs review, `API.md`): noder som varken kunde godkännas eller underkännas, antingen på grund av regelns tekniska gränser (bakgrundsbild, överlapp, pseudoelement) eller ett JS-fel. Deque håller dem separata för manuell granskning.
  - 4.14 flyttade fler fall dit: tomma inmatningsfält med låg kontrast, `scrollable-region-focusable` med negativ tabindex och värderoller i `label-content-name-mismatch`.
  - **En grind på bara `violations` släpper igenom dem tyst.**
- **AxeBuilder** (`packages/playwright/README.md`):
  - Metoderna är `withTags`, `withRules`, `disableRules`, `include`, `exclude` (hoppar över även underliggande element) och `options` (axe RunOptions, t.ex. `resultTypes`).
  - `analyze()` öppnar sedan 4.3 ett tomt fönster för att samla resultat från ramar. Popup-blockerare stör det (`error-handling.md`).
  - `setLegacyMode()` är en sista utväg. Den stänger av kontroll av ramar från andra ursprung och tas bort i v5.
- **Playwright om metoden:** interagera först, till exempel öppna menyn och vänta med `waitFor()`, och kör sedan axe, eftersom den bara ser sidans nuvarande tillstånd. Hantera kända fel med "fingerprints" (regel + CSS-mål) som snapshot i stället för hela `violations`.
- **WebKit:**
  - axe-core anger stöd för Safari 7+ ("Supported Browsers").
  - **Playwright-paketets egna tester startar bara Chromium** (`test/axe-playwright.spec.ts`). Playwrights dokumentation nämner inga motorer.
  - ⚠️ WebKit körs alltså inte uppströms, och ingen källa bekräftar att det fungerar. Det måste provas hos oss.

**Kvalitet och underhåll:**
- **axe-core:** 7 656 stjärnor, 963 forks, 272 bidragsgivare och 432 öppna ärenden och PR:er enligt GitHub-API:t 2026-10-16 (bidragsgivare med `anon=1`; öppna ärenden räknas ihop med PR:er). I git-historiken: 5 597 commits och 285 mänskliga författaradresser, 35 av dem under 2026. Senaste commit 2026-10-15. En minor-utgåva kommer var 3–5 månad. 407 öppna ärenden.
  - Kända problem: kontrast med överlappande genomskinliga element ([#3464](https://github.com/dequelabs/axe-core/issues/3464)), kontrast vid `-webkit-line-clamp` blir incomplete ([#3698](https://github.com/dequelabs/axe-core/issues/3698)) och Safari ignorerar versala `scope` ([#5456](https://github.com/dequelabs/axe-core/issues/5456), öppen 2026-10-09).
- **axe-core-npm:** 726 stjärnor, 78 forks, 39 bidragsgivare och 101 öppna ärenden och PR:er enligt GitHub-API:t 2026-10-16 (bidragsgivare med `anon=1`; öppna ärenden räknas ihop med PR:er). I git-historiken: 790 commits och 45 mänskliga författaradresser, 11 av dem under 2026. Senaste commit 2026-10-15. 95 öppna ärenden.
  - Kända problem: typkrock med uppdaterad `@playwright/test` ([#1087](https://github.com/dequelabs/axe-core-npm/issues/1087)), sporadiska `null`-fel i `frame.evaluate` ([#1137](https://github.com/dequelabs/axe-core-npm/issues/1137)), och fel kontrast med `forcedColors` + mörkt läge i Chromium ([#1067](https://github.com/dequelabs/axe-core-npm/issues/1067)).
  - Inga WebKit-specifika ärenden hittades.

**Det bästa vi kan ta:**
- **Nuläget i kontrollskriptet:**
  - Rad 113: `withTags([...'wcag22a','wcag22aa'])` i Chromium, 375 och 1280 px, med och utan samtyckesruta. Bara `violations` räknas.
  - **Redan rätt:** taggarna (taggen `wcag22a` är ofarlig men verkningslös) och flera bredder.
- **Nytt att lägga till:**
  1. **WebKit:** samma axe-varv med `webkit.launch()`. Playwright 1.64.1 finns redan i `skript/package.json`. ⚠️ Prova först. Om det fallerar i WebKit blir det en anmärkning, inte ett stopp.
  2. **Tillstånd:** meny öppen, formulär efter skick med fel, samtyckesrutans val öppna och dialog öppen. Varje tillstånd körs med `include()` på den öppnade delen.
  3. **`incomplete` läses:** skriv ut regel och mål per sida som "läsning" (ingen stopp-kontroll). Agenten eller människan avgör. Kontrastfall med bakgrundsbild hör dit.
  4. **Fingerprints** för godkända undantag (Playwright-dokumentationen), i stället för `disableRules`.
- **React-öar:**
  - En ö med `client:visible` hydreras först när den syns. Astro tar bort attributet `ssr` från `<astro-island>` när hydreringen är klar och skickar händelsen `astro:hydrate` (`astro-island.js`, rad 151–192).
  - **Skrolla därför till varje ö och vänta tills `document.querySelector('astro-island[ssr]')` är `null`.** Axe-varvet efter det granskar React-komponenten, inte bara den förrenderade HTML:en.
  - Kör båda: före hydreringen är det vad en besökare utan JS ser, efter är det vad React gör med fokus och ARIA.

**Var det hamnar hos oss:**
- **Kontroll (stopp) i kontrollskriptet (N2):**
  - Kontroll 8 med en extra WebKit-körning, tillstånden (meny öppen m.fl.) och öarna hydrerade.
  - `incomplete` som ny läsning (8c).
  - Regeln i `kontroller.md`: "0 violations är inte detsamma som tillgängligt". WCAG-EM vid lansering, se kortet för WCAG-EM.

**Passar vår stack?**
- Ja. Beroendena finns redan (`@axe-core/playwright` 4.14.0, `playwright` 1.64.1).
- WebKit är det enda osäkra: ⚠️ inget uppströmsstöd är bekräftat.
- React-komponenter granskas bara om varvet väntar på hydreringen.

**Risker och flaggor:**
- MPL-2.0 ställer inget krav vid vår användning.
- Ingen telemetri i axe-core eller @axe-core/playwright hittades.
- **Betalvägg:** Deques axe DevTools, axe MCP Server och "Axe Linter" är betalda eller separata produkter. Vi använder dem inte.
- Kontrastfel i tvingade färger och mörkt läge i Chromium kan vara falsklarm (#1067).

**Inloggning:**
- Ingen.
- Deques konto, Deque University-länkarna i resultaten och axe DevTools kräver konto, men inget av det behövs.
