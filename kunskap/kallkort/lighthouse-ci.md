# Lighthouse CI 0.15.1

**Källa:** allt läst 2026-10-16.
- https://github.com/GoogleChrome/lighthouse-ci, main vid commit `ebee453` (2025-06-25, den senaste).
  - Lästa filer: `README.md`, `docs/configuration.md` (collect, upload, assert och budgetar), `docs/version-policy.md`, `docs/troubleshooting.md` (rubriker), `packages/utils/src/presets/recommended.js`, `packages/utils/src/assertions.js` (rad 128–160), `packages/utils/src/budgets-converter.js` och `packages/cli/src/assert/assert.js`.
- npm: `@lhci/cli` **0.15.1** (2025-06-25), med beroendet exakt `lighthouse: 12.6.1`.
- Jämförelse: granskningslistan i `lighthouse` 13.5.0 i `skript/node_modules/lighthouse/core/config/default-config.js` (bara läst).
- Ärenden: [#1136](https://github.com/GoogleChrome/lighthouse-ci/issues/1136), [#1148](https://github.com/GoogleChrome/lighthouse-ci/issues/1148) och [#1134](https://github.com/GoogleChrome/lighthouse-ci/issues/1134), via sök-API:t.

**Licens:**
- Apache-2.0. Det finns ingen NOTICE-fil.
- Om vi bara kör verktyget ställs inga krav. Om vi kopierar förinställningar eller kod ska licenstexten följa med och ändringar märkas.

**Vad det är:**
- Googles verktyg för att köra Lighthouse flera gånger mot en sajt, slå ihop resultaten och fälla bygget på regler (assertions).
- Det har också en server för historik och statuskontroller i GitHub. Den behöver vi inte.

**Hur det fungerar:**
- **`collect`:**
  - `staticDistDir` startar en egen server för `dist/`. `numberOfRuns` är 3 som standard.
  - `method: node` kör lokalt. `psi` kör via PageSpeed Insights och fungerar bara mot publika sajter.
- **`assert`:**
  - Nivåerna är `off`, `warn` och `error`. Bara `error` ger felkod.
  - Det som kan kontrolleras är `minScore`, `maxLength` och `maxNumericValue`.
  - Aggregering: `median`, `optimistic` (standard), `pessimistic` och `median-run`.
  - `assertMatrix` ger olika regler per URL-mönster. `categories:<id>` kontrollerar kategoripoäng.
- **Budgetar:** `budgetsFile` översätts av LHCI självt till `resource-summary:<typ>:(size|count)` (`budgets-converter.js`). Det fungerar alltså fortfarande, trots att Lighthouse 12 tog bort sina egna budgetar. Enheten är KB i budget.json men byte i assertions.
- **`upload.target`:**
  - `filesystem` skriver `manifest.json` (med `isRepresentativeRun` och poäng per kategori) och rapporter i JSON och HTML.
  - `temporary-public-storage` lägger rapporterna publikt hos Google i några dagar.
- **En granskning som saknas räknas som fel:** finns ett granskningsid i en regel men inte i rapporten, blir utfallet `auditRan` = fel (`assertions.js`, rad 138–152).

**Kvalitet och underhåll:**
- Repot: 7 114 stjärnor, 724 forks, 127 bidragsgivare och 236 öppna ärenden och PR:er enligt GitHub-API:t 2026-10-16 (bidragsgivare med `anon=1`; öppna ärenden räknas ihop med PR:er). I git-historiken: 1 002 commits och 134 mänskliga författaradresser i historiken.
- **Ingen commit sedan 2025-06-25**, och ingen commit alls under 2026.
- 217 öppna ärenden. **Ärendet om Lighthouse 13-stöd ([#1136](https://github.com/GoogleChrome/lighthouse-ci/issues/1136), 2026-04-06) har 22 reaktioner och inget svar från underhållarna.** Den enda kommentaren kommer från en användare: "simple bump works".
- Docker-klientbilden bygger på Debian 11/Node 18 (EOL), och apt-get fungerar inte längre ([#1148](https://github.com/GoogleChrome/lighthouse-ci/issues/1148)).
- Enligt versionspolicyn är ett byte av Lighthouse-huvudversion en brytande ändring "1-2/year". Den har uteblivit i 16 månader. Tolkning: i praktiken ounderhållet.
- **Lighthouse 13 och förinställningen:** `lighthouse:recommended` har `error`-regler på granskningar som **inte finns i Lighthouse 13.5.0**, till exempel `offscreen-images`, `uses-optimized-images`, `uses-responsive-images`, `uses-text-compression`, `uses-rel-preconnect` och `efficient-animated-content`. Samma gäller varningsregler på `render-blocking-resources`, `modern-image-formats` och `uses-long-cache-ttl`. Med en npm `overrides` till Lighthouse 13 skulle förinställningen därför **fälla varje körning** på `auditRan`. Detta är kontrollerat mot källkoden, men ⚠️ inte provkört.

**Det bästa vi kan ta:**
- **Mönstret, inte paketet:** flera körningar med median, `error`/`warn`-nivåer, `maxNumericValue` per mätvärde och `resource-summary` per resurstyp (`docs/configuration.md`, avsnitten *assertions* och *budgetsFile*).
- `manifest.json`-formatet som förebild för hur kontrollskriptet sparar rapporter.
- Lighthouse 13.5.0 har fortfarande `resource-summary`, `total-byte-weight`, `bootup-time`, `mainthread-work-breakdown`, `unused-javascript`, `total-blocking-time` och `script-treemap-data` (`default-config.js`). Därmed går en **JavaScript-budget per sida** att läsa direkt ur `lhr.audits['resource-summary']`.

**Var det hamnar hos oss:**
- **Ersätt LHCI med Lighthouse-modulen som kontrollskriptet redan använder (13.5.0) plus egna regler. Pröva inte overrides.**
  - Kontroll 9 kör redan tre körningar och tar medianen i mobil och dator.
  - **Lägg till:** stopp på LCP ≤ 2 500 ms, CLS ≤ 0,1 och TBT ≤ 200 ms ur `lhr.audits[*].numericValue`, plus en **skriptbudget per sida** ur `resource-summary` (antal och byte för `script`). Gränsvärdet är ett eget startvärde som kalibreras mot övningssajten.
- **Varför inte overrides:** förinställningarna är byggda för Lighthouse 12 och fäller på saknade granskningar. Egna regler kräver lika mycket arbete men utan ett ounderhållet beroende och utan Node 18-bilden.
- **Nivå:** N2, som tillägg i kontroll 9. LHCI-posten i inventeringen bör ändras till "ersätts av egna regler i kontrollskriptet". Johnny avgör.

**Passar vår stack?**
- Tekniskt ja, eftersom `staticDistDir` passar `dist/`. Men den låsta Lighthouse 12.6.1 krockar med kontrollskriptets 13.5.0, och två Lighthouse-versioner ger olika poäng. Nej.
- **React-öar:** det som mäter hydreringen är TBT, `bootup-time` och `unused-javascript`. Lighthouse-modulen ger dem lika bra.

**Risker och flaggor:**
- Ounderhållet. Förinställningarna är inte kompatibla med Lighthouse 13.
- `temporary-public-storage` publicerar rapporter (kundsajter!) publikt.
- Docker-bilden är trasig.
- Ingen telemetri hittades.

**Inloggning:**
- Ingen för `filesystem`.
- GitHub-statuskontroller kräver GitHub App-token. LHCI-servern kräver egen drift. Vi behöver inget av det.
