# WCAG-EM Report Tool och web-vitals

Två verktyg i ett kort, med ett avsnitt var. Allt är läst 2026-10-16.

---

## 1. WCAG-EM Report Tool (och WCAG-EM 2.0)

**Källa:**
- **Metoden:** [WCAG-EM 2.0](https://www.w3.org/TR/WCAG-EM/), W3C Group Note 2026-07-23 (versionen [NOTE-wcag-em-2-20260723](https://www.w3.org/TR/2026/NOTE-wcag-em-2-20260723/)).
- **Verktyget:** https://www.w3.org/WAI/eval/report-tool/, **version 4.1.0 (2026-08-11)**.
- **Repot:** https://github.com/w3c/wai-wcag-em-report-tool, senaste commit 2026-08-12.
  - Lästa filer: `README.md`, release 4.1.0, `LICENSE` och språkfilerna `src/locales/en/PAGES/START.json`, `REPORT.json`, `SCOPE.json`, `UI/IMPORT.json` och `WCAG.json`.
- **Ärenden:** sök-API:t.

**Licens:**
- W3C Software Notice and License. Behåll upphovsrättsnotisen och länken till licensen, och ange ändringar om koden sprids.
- Vi använder webbverktyget och sprider inget.
- WCAG-EM-texten omfattas av W3C:s dokumentlicens. Vi skriver med egna ord.

**Vad det är:**
- W3C:s webbverktyg som för utvärderaren genom WCAG-EM:s fem steg och gör en rapport av fynden.
- Det gör **inga automatiska kontroller**. Det är för den som kan WCAG och hjälpmedel (`START.json`, ABOUT_2).

**Hur det fungerar:**
- **WCAG-EM 2.0, stegen:**
  1. Avgränsa: omfång, konformitetsmål, baslinje för tillgänglighetsstöd och tilläggskrav.
  2. Utforska: vanliga vyer, väsentliga funktioner, typer av sampel och teknologier.
  3. Urval: strukturerat urval, slumpurval (10 % av det strukturerade, utöver det) och kompletta processer.
  4. Utvärdera: initiala sampel, processerna och jämförelse mellan urvalen.
  5. Rapportera. Bara 5.1 är obligatoriskt: utvärderare, beställare och datum; omfång; teknologier; urval; utfall med minst ett exempel per kriterium som inte uppfylls.
- **Verktyget:**
  - WCAG 2.2 är förvalt (2.1 och 2.0 går att välja), med 2.4.11, 2.5.8 och 3.3.8 med flera.
  - Utfall per kriterium: Not checked, Pass, Failed, Not applicable eller Cannot tell.
  - Fält med Markdown.
  - Allt körs **lokalt i webbläsaren**. Inget sparas på server och inget sparas automatiskt. Rapporten laddas ned som **HTML eller JSON** och kan läsas in igen ("Open report").
  - Resultat i **EARL/JSON** kan importeras (`UI/IMPORT.json`). ⚠️ Exportens exakta schema har jag inte läst.

**Kvalitet och underhåll:**
- 96 stjärnor, 84 forks, 29 bidragsgivare och 74 öppna ärenden och PR:er enligt GitHub-API:t 2026-10-16 (bidragsgivare med `anon=1`; öppna ärenden räknas ihop med PR:er). I git-historiken: 2 228 commits och 36 mänskliga författaradresser, 5 av dem under 2026. 10 commits under 2026.
- Underhålls av W3C WAI (EOWG). Version 4.1.0 anpassade terminologin till WCAG-EM 2. Det gamla repot `w3c/wcag-em-report-tool` är arkiverat.
- 61 öppna ärenden, mest önskemål:
  - [#56](https://github.com/w3c/wai-wcag-em-report-tool/issues/56): spara i local storage. Öppen sedan 2014. Data försvinner alltså om fliken stängs utan nedladdning.
  - [#72](https://github.com/w3c/wai-wcag-em-report-tool/issues/72): versionering av rapporter.
  - [#106](https://github.com/w3c/wai-wcag-em-report-tool/issues/106): hur stor sajt metoden är tänkt för.

**Det bästa vi kan ta:**
- Rapportens minimum (WCAG-EM 2.0, 5.1) som mall för vår lanseringsrapport, även när verktyget inte används.
- JSON-exporten som arkivformat per granskning, sparad i `sites/<namn>/`.
- Utfallet **Cannot tell**, som ärlig markering för det som varken kunnat godkännas eller underkännas. Det motsvarar axe:s `incomplete`.

**Var det hamnar hos oss:**
- **Senare, N3:** vid lansering och därefter årligen. På en sajt med 5–15 sidor blir urvalet i praktiken hela sajten plus nyckelresorna (ring, kontakta, boka).
- Rapporten ligger till grund för kundens tillgänglighetsredogörelse.

**Passar vår stack?**
- Ja, verktyget är oberoende av stack.
- **React-öar:** baslinjen för tillgänglighetsstöd (steg 1.3) ska ange vilka webbläsare och hjälpmedel som prövats. Öarnas beteende efter hydrering ska ingå i urvalet (steg 2.2 och 3.3).

**Risker och flaggor:**
- Data försvinner om den inte laddas ned (#56).
- Ingen telemetri är dokumenterad. Ingen betalvägg.

**Inloggning:**
- Ingen.

---

## 2. web-vitals

**Källa:**
- https://github.com/GoogleChrome/web-vitals, main vid commit `d90bf53` (2026-10-15).
  - Lästa filer: `README.md` (användning, `ReportOpts`, `onINP`, attributionstyperna, byggen, webbläsarstöd och begränsningar), `CHANGELOG.md` v6.0.0–6.2.3, `src/onINP.ts` (rad 39–200) och `src/lib/InteractionManager.ts` (rad 32–160).
- npm **6.2.3** (2026-10-05).
- **Mätning utan bibliotek:**
  - [MDN PerformanceObserver.observe()](https://developer.mozilla.org/en-US/docs/Web/API/PerformanceObserver/observe) (uppd. 2025-06-23)
  - [MDN LayoutShift](https://developer.mozilla.org/en-US/docs/Web/API/LayoutShift) (uppd. 2026-10-05)
  - [web.dev INP](https://web.dev/articles/inp) (uppd. 2025-09-02)
  - [web.dev CLS](https://web.dev/articles/cls) (uppd. 2023-04-12)

**Licens:**
- Apache-2.0. Det finns ingen NOTICE-fil.
- Kopierar vi logik ur `src/` ska licenstexten följa med och ändringar märkas.
- Egen kod som följer webbstandarderna är fri.

**Vad det är:**
- Googles lilla bibliotek (cirka 3 KB efter brotli; attributionsbygget cirka 1,5 KB mer) som mäter LCP, INP, CLS, FCP och TTFB som Chrome och CrUX gör.
- Det finns i ett standardbygge och i ett **attributionsbygge** som förklarar orsakerna.

**Hur det fungerar:**
- **`onINP(cb, opts)`:**
  - Grupperar `event`-poster på `interactionId` och sparar de 10 längsta interaktionerna (`InteractionManager.ts`, `MAX_INTERACTIONS_TO_CONSIDER = 10`).
  - `durationThreshold` är 40 ms som standard (`onINP.ts`, rad 47).
  - `reportAllChanges` anropar bara när INP-värdet ändras, inte vid varje interaktion.
- **Attributionsbygget** (`web-vitals/attribution`): `inputDelay`, `processingDuration`, `presentationDelay`, `interactionTarget`, `longAnimationFrameEntries`, `longestScript` med flera.
- **v6.0.0 (2026-07-21):** stöd för soft navigations. `includeProcessedEventEntries` är som standard `false`.
- **Webbläsarstöd** (README): `onINP` i Chromium, Firefox och Safari. `onCLS` **bara i Chromium**. Inget mått ser in i iframes.
- **Utan bibliotek, i Playwright:**
  - Registrera i `page.addInitScript` före navigeringen.
  - **INP:** `observe({type:'event', durationThreshold:16, buffered:true})`. 16 är minimum, och värden avrundas till 8 ms. Gruppera på `interactionId > 0` och ta den längsta posten per interaktion.
  - **CLS:** `observe({type:'layout-shift', buffered:true})`. Hoppa över poster med `hadRecentInput` (500 ms efter diskret input). Sessionsfönster under 1 s, högst 5 s. Det största fönstret är CLS.
  - Förskjutningar som en klickad meny orsakar inom 500 ms räknas inte, och måste mätas separat.

**Kvalitet och underhåll:**
- 8 648 stjärnor, 537 forks, 41 bidragsgivare och 14 öppna ärenden och PR:er enligt GitHub-API:t 2026-10-16 (bidragsgivare med `anon=1`; öppna ärenden räknas ihop med PR:er). I git-historiken: 604 commits och 42 mänskliga författaradresser, 10 av dem under 2026. 93 commits under 2026.
- Senaste commit 2026-10-15 ("Report pending INP entries when the page hides…"). Utgåvor ungefär var tredje vecka.
- 10 öppna ärenden:
  - [#335](https://github.com/GoogleChrome/web-vitals/issues/335): målet för INP kan vara `null`.
  - [#689](https://github.com/GoogleChrome/web-vitals/issues/689): Firefox anger ibland fel LCP-element.
  - Nyligen rättat: minnesläckor i INP (v6.2.2, v6.2.3) och negativ `inputDelay` (v6.2.1).
- **Brus i headless:** byggsessionen mätte 150–190 ms INP på en tom sida i headless. ⚠️ Iakttagelsen är byggsessionens egen. Jag hittade ingen källa som förklarar den (webbsökning 2026-10-16). Tolkning: presentationsfördröjningen, alltså tiden till nästa bildruta, beror på hur headless ritar och är därför opålitlig. `inputDelay` och `processingDuration` speglar sidans egen kod.

**Det bästa vi kan ta:**
- **Uppdelningen i tre delar** (README, `INPAttribution`) räknad direkt ur Event Timing-posten:
  - indröjning = `processingStart − startTime`
  - bearbetning = `processingEnd − processingStart`
  - presentation = `startTime + duration − processingEnd`
- Grupperingen på `interactionId` och längsta post per interaktion (`InteractionManager.ts`). Det är logiken att efterbilda utan bibliotek.

**Var det hamnar hos oss:**
- **Kontroll (N2) i kontrollskriptet:** INP och CLS i Playwright-resorna (meny, telefonlänk, formulär, samtyckesruta) med PerformanceObserver och utan bibliotek.
  - **Stopp:** indröjning + bearbetning per interaktion ≤ ett eget startvärde, förslagsvis 100 ms. Halva tröskeln 200 ms lämnar plats för presentationen, men det värdet saknar källa och ska kalibreras.
  - CLS ≤ 0,1 i Chromium.
  - `duration` (hela INP) rapporteras men stoppar inte, på grund av bruset i headless.
- Bibliotekets attributionsbygge används inte på kundsajterna. RUM är en senare fråga, och det kräver samtyckesbedömning.

**Passar vår stack?**
- Ja. Allt går med Playwright 1.64.1, som redan finns.
- CLS bara i Chromium. ⚠️ INP i Playwrights WebKit är inte prövat.
- **React-öar:** hydreringen är den troligaste källan till hög indröjning. En ö med `client:visible` som hydreras medan besökaren skrollar eller klickar ger långa uppgifter precis vid interaktionen. Resorna ska därför klicka på varje ö *direkt* efter att den blivit synlig, inte bara efter att den hydrerats färdigt. Tolkning.

**Risker och flaggor:**
- Inga i labbet.
- Används biblioteket som RUM på kundsajter skickar det data till ett eget mål, och det kräver samtyckesbedömning (lager 9).
- Ingen telemetri. Ingen betalvägg.

**Inloggning:**
- Ingen.
- Fältdata via CrUX eller PageSpeed Insights API kräver en API-nyckel från Google Cloud, alltså Johnnys konto. Småsajter når sällan CrUX-tröskeln.
