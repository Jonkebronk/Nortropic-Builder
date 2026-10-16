# IBM Equal Access

**Källa:** allt läst 2026-10-16.
- https://github.com/IBMa/equal-access, grenen `main-4.x` (senaste commit 2026-10-15). Filerna hämtades råa från GitHub:
  - `accessibility-checker/README.md` och `accessibility-checker/src/README.md` (hela)
  - `accessibility-checker/src-ts/lib/ACEngineManager.ts` och `ACHelper.ts` (motorladdning och Playwright-grenen)
  - `common/module/src/config/ACConfigManager.ts`, `ACConstants.ts` och `IConfig.ts`
  - `accessibility-checker/test/mocha/aChecker.Playwright/…/aChecker.Content.Playwright.spec.mjs`
- npm: `accessibility-checker` **4.0.34** (2026-09-08), inklusive `scripts` och `dependencies` ur registret.
- Regelarkivet https://able.ibm.com/rules/archives.json, hämtat 2026-10-16. `latest` = "02 September 2026 Deployment (IBM 7.3)".
- IBM Telemetry: https://github.com/ibm-telemetry/telemetry-js, `README.md` (avsnitten om insamling och opt-out).
- Ärenden: sök-API:t, samt [#2550](https://github.com/IBMa/equal-access/issues/2550) som lästes på webben.

**Licens:**
- Apache-2.0 (README). Det finns ingen NOTICE-fil enligt fillistan.
- Att köra verktyget ställer inga krav. Kopierar vi regler eller kod ska licenstexten följa med och ändringar anges.

**Vad det är:**
- IBM:s öppna tillgänglighetsmotor ("ace") med en egen regeluppsättning, oberoende av axe.
- Paketet `accessibility-checker` kör den i Node-tester med Selenium, Puppeteer eller Playwright.
- Den har baselines för kända fynd och rapporter i JSON, CSV, HTML och XLSX.

**Hur det fungerar:**
- **API:**
  - `await aChecker.getCompliance(page, 'unik-etikett')` tar emot en Playwright-`page`.
  - Sedan `aChecker.assertCompliance(report)`, som ger 0 = ok, 1 = avviker från baseline, 2 = fynd på `failLevels` och −1 = fel.
  - Till sist `await aChecker.close()`. Utan den kan rapportfiler utebli.
- **Konfiguration** (`.achecker.yml`, `aceconfig.js` eller `aceconfig.mjs`):
  - `ruleArchive`: `latest`, ett datum-id eller `versioned`.
  - `policies`: `IBM_Accessibility`, `IBM_Accessibility_next`, `WCAG_2_2`, `WCAG_2_1` eller `WCAG_2_0`.
  - `failLevels`: standard `violation` + `potentialviolation`.
  - Övrigt: `reportLevels`, `outputFormat`, `baselineFolder`, `cacheFolder` och `label`.
- **Motorn hämtas över nätet vid varje körning:**
  - `ACConfigManager.ts` hämtar först `archives.json` från `ruleServer`. Standard är `https://cdn.jsdelivr.net/npm/accessibility-checker-engine`, med `@next/archives.json`.
  - Därefter, i läget INJECT, `${rulePack}/ace.js`, som körs med `eval` i sidan (`ACEngineManager.ts`, rad 20–92).
  - Det finns ingen reservväg utan nät: misslyckas hämtningen av arkivlistan, avbryts körningen.
  - Med `rulePack` och `ruleServer` kan en egen server pekas ut. ⚠️ Att det fungerar med en lokal kopia av `accessibility-checker-engine` är inte prövat.
- **CSP:** README varnar för att sidans CSP kan blockera motorn. Tolkning: i läget INJECT gör sidans `eval`-förbud troligen samma sak. Kör därför i en Playwright-kontext med `bypassCSP: true`. ⚠️ Inte prövat.
- **Telemetri:**
  - `postinstall: ibmtelemetry --config=telemetry.yml` körs vid `npm install`, men bara i CI-miljö eller container enligt telemetry-js. Den analyserar projektets källkod och skickar avidentifierade uppgifter till IBM: repo-URL, commit, paketnamn, beroenden och JSX-element från paketet.
  - Opt-out: `IBM_TELEMETRY_DISABLED='true'`.
  - Med `npm install --ignore-scripts` hoppas den över. Det hoppar också över nedladdningarna från `puppeteer` och `chromedriver`.
- **Beroenden:** `puppeteer ^25`, `chromedriver: "*"` (inte låst till någon version), `js-yaml`, `microdiff` och `write-excel-file`.
- `ignoreHTTPSErrors` sätter `NODE_TLS_REJECT_UNAUTHORIZED=0` för hela processen (`ACConfigManager.ts`). Använd den inte.

**Kvalitet och underhåll:**
- Repot: 784 stjärnor, 108 forks, 48 bidragsgivare och 145 öppna ärenden och PR:er enligt GitHub-API:t 2026-10-16 (bidragsgivare med `anon=1`; öppna ärenden räknas ihop med PR:er). I git-historiken: 5 998 commits och 54 mänskliga författaradresser, 7 av dem under 2026. 360 commits under 2026.
- Senaste commit 2026-10-15. Patchutgåvor ungefär varannan vecka (4.0.29 2026-07-14 till 4.0.34 2026-09-08). Regelarkivet uppdateras i samma takt.
- 143 öppna ärenden, mest regelfrågor med få reaktioner.
- **Kända problem med Playwright:**
  - [#2550](https://github.com/IBMa/equal-access/issues/2550): **verktyget slutade fungera med Playwright 1.60.0** (`page.executeAsync`). En användare rapporterade att 4.0.18 löste det, och ärendet stängdes 2026-06-01. Tolkning: Playwright-uppgraderingar kan bryta verktyget.
  - [#2578](https://github.com/IBMa/equal-access/issues/2578): inkapslade Playwright-sidor felidentifierades. Stängt 2026-06-03.
  - [#2579](https://github.com/IBMa/equal-access/issues/2579): motorns polyfills skriver på `String`/`Array`-prototyper och kraschade sidor som fryser inbyggda objekt. Stängt 2026-06-03.
  - Repots egna Playwright-test använder bara Chromium. ⚠️ WebKit är inte bekräftat.

**Det bästa vi kan ta:**
- **Två motorer, olika regler:** IBM:s policy `WCAG_2_2` som andra åsikt bredvid axe, utan att ändra axe-grinden.
- **Nivåerna:** `violation` är fel, `potentialviolation` och `manual` ska granskas. Det motsvarar axe:s `incomplete`, och båda kan gå till samma granskningskö.
- **Baseline-tanken** (`README.md`, *Baselines*): kända fynd sparas och bara avvikelser fäller. Det är samma idé som Playwrights fingerprints.

**Var det hamnar hos oss:**
- **Senare: prövning på N2.** Fyra veckor parallellt med axe i en separat körning, inte i kontrollskriptets stoppkontroller.
- **Inställningar:**
  - `IBM_TELEMETRY_DISABLED=true` och `npm install --ignore-scripts`.
  - `policies: [WCAG_2_2]`, `failLevels: [violation]`.
  - **Motorn låst:** `ruleArchive` satt till ett datum-id (t.ex. `02September2026`) i stället för `latest`. Pröva en lokal `rulePack` om nätberoendet stör.
  - `bypassCSP: true` i kontexten.
- **Behålls bara om** den hittar fel som axe missar på våra sidor.

**Passar vår stack?**
- Delvis. Den fungerar med Playwright i Chromium (repots egna test).
- Nätberoendet vid varje körning, telemetrin och de tunga beroendena (puppeteer och chromedriver) passar dåligt i ett låst kontrollskript.
- **React-öar:** som med axe ska skanningen ske efter hydreringen (vänta tills `astro-island[ssr]` saknas).

**Risker och flaggor:**
- **Telemetri** via `postinstall` i CI och containrar.
- **Nätberoende** till jsDelivr och able.ibm.com vid varje körning.
- `eval` av fjärrkod i sidan.
- `chromedriver` är inte låst till någon version.
- Playwright-uppgraderingar har brutit verktyget förut (#2550).
- Ingen betalvägg.

**Inloggning:**
- Ingen. IBM:s webbläsartillägg och verktygssidor kräver inte konto. Paketets nätanrop är anonyma.
