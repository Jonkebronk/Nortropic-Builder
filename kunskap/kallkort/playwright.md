# playwright

**Källa:** allt läst 2026-10-16.
- **https://github.com/microsoft/playwright**, tagg `v1.64.1`:
  - `README.md` (hela, 318 rader)
  - `LICENSE`
  - `docs/src/api/params.md` (avsnitten om kontextalternativ)
  - `class-cdpsession.md`, `class-browsercontext.md` (`newCDPSession`) och `class-locator.md` (`ariaSnapshot`)
  - `packages/playwright-core/src/server/chromium/chromiumSwitches.ts` (hela)
- **npm:** `playwright` 1.64.1, publicerad 2026-10-14. Det är samma version som i `skript/package.json`. `next` är 1.65.0-alpha.
- **Dokumentation:**
  - [release notes](https://playwright.dev/docs/release-notes) (1.60–1.64)
  - [aria-snapshots](https://playwright.dev/docs/aria-snapshots)
  - [test-snapshots](https://playwright.dev/docs/test-snapshots)
  - [class-pageassertions](https://playwright.dev/docs/api/class-pageassertions)
  - [emulation](https://playwright.dev/docs/emulation)
  - [class-browser](https://playwright.dev/docs/api/class-browser)
  - [browsers](https://playwright.dev/docs/browsers)
- **https://github.com/microsoft/playwright-mcp**: `README.md` (1 662 rader, avsnitten om alternativ och säkerhet).
- **GitHubs API (kl. 13.17):** repo-data, antal bidragsgivare, sökning bland öppna ärenden (webkit tab, ariaSnapshot, toHaveScreenshot) och ärende #41808 med kommentarer.
- **Telemetri:** grep efter telemetri i npm-paketen `playwright` 1.64.1, `playwright-core` 1.64.1 och `@playwright/mcp` 0.0.83.
- **Läst men inte hämtat i sin helhet:** `skript/kontroll.mjs`.

**Licens:**
- Apache-2.0, © Microsoft. Kräver att licensen och eventuell NOTICE följer med om koden sprids vidare. Vi kör bara verktyget och sprider ingenting.
- Webbläsarna laddas ner från Microsofts CDN och har egna licenser. ⚠️ Dem har jag inte granskat.

**Vad det är:**
- Ett ramverk för automatisering och test som styr Chromium, Firefox och WebKit med ett gemensamt API. Det finns som bibliotek (`playwright`), som testkörare (`@playwright/test` eller `playwright/test`), som CLI för agenter och som MCP-server.
- Kontrollskriptet använder i dag biblioteket med Chromium, axe (`@axe-core/playwright` 4.14.0) och Lighthouse via Playwrights Chromium.

**Hur det fungerar:**
- **Version 1.64** (README och release notes):
  - Webbläsare: Chromium 156.0.8078.4, Firefox 157.0 och WebKit 27.2.
  - ⚠️ Källorna säger emot varandra om Chromium. README säger ”Uses Chrome for Testing by default”, medan browsers-sidan säger att Playwright som standard använder öppna Chromium-byggen.
  - Headless-läget använder ett separat ”chromium headless shell”. `channel: 'chromium'` ger det nya headless-läget.
  - Brytande ändringar i 1.64:
    - Enhetsbeskrivningar skickar nu med `screen`.
    - `--update-snapshots=missing` godkänner körningen.
    - Element i dolda iframes räknas som dolda.
  - I 1.63 togs Ubuntu 20.04 bort. I 1.63 kom också `reducedMotion`, `forcedColors` och `contrast` som fristående testalternativ.
- **ARIA-snapshot:**
  - `locator.ariaSnapshot()` finns i biblioteket sedan 1.49 och ger tillgänglighetsträdet som YAML: roll, namn och attribut som `level`, `checked`, `expanded`, `pressed`, `selected` och `disabled`.
  - `toMatchAriaSnapshot` jämför mot en mall. Matchningen är partiell, skiftlägeskänslig och ordningskänslig, och klarar regex på namn och `/url`.
  - `/children` kan vara `contain` (standard), `equal` eller `deep-equal`.
  - En snapshot delas mellan alla webbläsare.
  - Dokumentationen varnar att stora snapshots blir svårlästa och att uppdateringar som godkänns utan granskning döljer regressioner.
  - 1.63 lade till `ariaSnapshotJSON()`.
- **toHaveScreenshot:**
  - Basbildens namn innehåller webbläsare och plattform, till exempel `-chromium-darwin.png`.
  - Dokumentationen: ”Browser rendering can vary based on the host OS, version, settings, hardware”. Kör därför i samma miljö som basbilderna togs i.
  - Standardvärden: `animations: "disabled"`, `caret: "hide"`, `scale: "css"` och `threshold` 0,2. Det finns även `mask`, `stylePath` och `maxDiffPixels`/`maxDiffPixelRatio`.
  - Assertionen väntar tills två skärmbilder i rad är lika.
  - **Den kräver testköraren.** Källkoden kastar ”toHaveScreenshot() must be called during the test”. Med biblioteket, som `kontroll.mjs` använder, finns bara `page.screenshot()`.
  - Testköraren ingår i det installerade paketet som exporten `playwright/test`, så ingen ny installation behövs. ⚠️ Det är läst ur `package.json`, inte prövat.
- **Emulering** (`params.md`):
  - `colorScheme`, `reducedMotion` (`reduce`), `forcedColors` (`active`) och `contrast` (`more`) styr mediefrågorna. De sätts per kontext eller med `page.emulateMedia`.
  - Dokumentationen nämner inga begränsningar per webbläsare.
  - **`forcedColors` emulerar bara mediefrågan.** Det är inte Windows High Contrast med tvingade systemfärger. ⚠️ Det är min tolkning av ordalydelsen ”Emulates 'forced-colors' media feature”, inte prövat.
- **`bypassCSP`:** ”Toggles bypassing page's Content-Security-Policy. Defaults to `false`.” Används för att injicera hjälpskript på sidor med strikt CSP. Behåll standardläget i CSP-provet, annars prövas inte policyn.
- **CDP:** `newCDPSession` gäller bara Chromium (”CDP sessions are only supported on Chromium-based browsers”). Strypning av nät och CPU via CDP går alltså inte i WebKit eller Firefox.
- **bfcache är avstängd i Playwrights Chromium.** `chromiumSwitches.ts` (v1.64.1, rad 64) har `'--disable-back-forward-cache', // Avoids surprises like main request not being intercepted during page.goBack()`.
  - Det stämmer med det som syntes på övningssajten (BackForwardCacheDisabledByCommandLine).
  - Flaggan kan tas bort med startalternativet `ignoreDefaultArgs: ['--disable-back-forward-cache']`, som dokumentationen kallar ”Dangerous option; use with care”.
  - `PaintHolding` stängs också av (issue #28023), vilket kan påverka mätning av målning. ⚠️ Effekten är inte prövad.
  - Uppstarten stänger dessutom av anrop till Google (`OptimizationHints`, `NetworkTimeServiceQuerying` och `AimEnabled`).
- **WebKit och Tab:**
  - Playwrights WebKit är byggt från WebKits main-gren och ”doesn't work with the branded version of Safari” (browsers-sidan).
  - På macOS följer WebKit inställningen *tabFocusesLinks*. Enligt Apple *"pressing the Option key temporarily reverses this preference"* (https://developer.apple.com/documentation/webkit/wkpreferences/tabfocuseslinks). WebKits eget layouttest `fast/events/option-tab.html` kontrollerar att Alt/Option+Tab når länken men inte Tab.
  - På Linux (WebKitGTK) är `enable-tabs-to-links` sant som standard (https://webkitgtk.org/reference/webkit2gtk/stable/property.Settings.enable-tabs-to-links.html).
  - En PR i adobe/spectrum-web-components (#5833) säger att Playwright 1.53.1 tabbar till allt som standard. Det gäller troligen Linux-CI.
  - **Bekräftat i ärende #41808** (https://github.com/microsoft/playwright/issues/41808, öppet sedan 2026-07-16): Playwrights WebKit på Mac gör som Safari. Teamet anser att det är avsiktligt (”working as expected”).
  - Dokumentationen nämner det fortfarande inte.
  - ⚠️ Att Linux beter sig annorlunda är min slutsats av WebKitGTK:s standardvärde och Spectrum-PR:en. Någon i tråden frågar just det, och det är obesvarat.
- **INP i headless:**
  - web.dev: lab-INP beror helt på vilka interaktioner som görs. Utan interaktion rapporteras ingen INP, och TBT ”is not a substitute” (https://web.dev/articles/inp).
  - ⚠️ Brus i presentationsfördröjningen i headless (150–190 ms på en tom sida, enligt det som syntes på övningssajten) har jag inte hittat beskrivet i någon primärkälla.
- **Playwright MCP:**
  - Ingår i paketet sedan 1.62 (`npx playwright mcp`). Fristående paket: `@playwright/mcp` 0.0.83 (2026-09-28).
  - MCP:n läser tillgänglighetsträdet med referenser (`e5`) och behöver ingen bildmodell.
  - Alternativ: `--isolated`, `--headless`, `--browser` och `--caps` (vision, pdf, devtools …). `--allowed-origins` och `--blocked-origins` är enligt README ”*does not* serve as a security boundary”.
  - README: ”Playwright MCP is **not** a security boundary.”
  - WebMCP är påslaget som standard sedan 1.64 och stängs av med `--no-webmcp`.
  - **Telemetri:** README nämner ingen. Grep i paketen hittade ingen telemetrikod. Enda träffen var att Firefoxs egen telemetri stängs av i profilen.

**Kvalitet och underhåll:**
- **microsoft/playwright:**
  - 97 840 stjärnor och 6 629 forkar.
  - Senaste push 2026-10-16 09:51 UTC.
  - **822 bidragsgivare** (`contributors?per_page=1&anon=1`, sista sidan).
  - 192 öppna ärenden och PR.
  - Apache-2.0.
  - Källa: GitHubs API 2026-10-16 kl. 13.17.
  - Släpps ungefär varje månad. 1.65-alpha kom i dag.
- **microsoft/playwright-mcp:**
  - 38 227 stjärnor.
  - Senaste push 2026-10-08.
  - **71 bidragsgivare**.
  - 1 öppet ärende eller PR. Koden har flyttat in i huvudrepot.
- **Kända problem** (öppna ärenden, sökning via API):
  - **#41808 ”Webkit on MacOS won't tab between buttons”** (öppet, `P3-collecting-feedback`). Underhållaren dgozman: *"Playwright does the same as Safari on Mac … we think this is working as expected"*. Andra i tråden ber om en dokumentationsnotis eller en växel.
  - #43451: `ariaSnapshot()` skriver `~`, `.inf` och `.nan` utan citattecken, så snapshoten går inte att matcha tillbaka.
  - #39955: MCP-snapshoten tar med element utanför viewporten.
  - #41504: `toHaveScreenshot({ mask })` påverkas av sidans backdrop-stilar.
  - #42962: standardtypsnitt försvinner efter en skärmbild utanför viewporten (Chromium headless).
  - Källkoden pekar ut regressioner i Chromium som Playwright stänger av funktioner för: #41690 (Chromium 149, `origin`-huvud vid omdirigering) och #43242 (Chromium 155, preflight-omdirigering vid fångade anrop).
  - Skärmbilder skiljer sig mellan operativsystem (dokumentationen).
  - bfcache är avstängd.

**Det bästa vi kan ta:**
1. **ARIA-snapshot för navigation, sidhuvud och sidfot på varje sida, jämförd mellan sidorna.** Det ger ett körbart prov för 3.2.3 Consistent Navigation och 3.2.6 Consistent Help, som båda bygger på DOM-ordning. Det fångar också tappade namn och `aria-expanded` (4.1.2). Verktyg: `locator('header').ariaSnapshot()` i biblioteket, jämfört som text mellan sidorna. Ingen testkörare behövs.
2. **Tab-varvet i WebKit.** Kör det på macOS med `Alt+Tab` som tangent för WebKit, eller i Linux eller Docker, där vanlig Tab når länkar. Det ger det enda prov vi har på Safaris motor (WebKit-buggen med `role="list"` finns redan noterad i `kontroll.mjs`).
3. **toHaveScreenshot från N2.** Ett eget litet testprojekt med `playwright/test`, där basbilderna tas och jämförs i samma miljö, helst Docker eller samma Mac. Använd `animations: "disabled"` och `mask` på karta och dynamiskt innehåll.
4. **Emuleringsvarv:** `reducedMotion: 'reduce'` (används redan), `forcedColors: 'active'` med en skärmbild för att se att fokusringar och kanter finns kvar, och `colorScheme: 'dark'` om sajten har mörkt läge.
5. **bfcache-provet:** starta Chromium med `ignoreDefaultArgs: ['--disable-back-forward-cache']` i ett eget varv. Annars kan provet aldrig bli grönt.

**Var det hamnar hos oss (förslag):**
- Det befintliga verktyget i `skript/kontroll.mjs`. Kvalitetsskillens delfil `kontroller.md` anger vilka prov som körs: WebKit-varvet, ARIA-snapshot av navigation och sidfot, emuleringsvarven och toHaveScreenshot från N2.
- Skäl: proven körs redan i Playwright, och de tre nya kräver ingen ny installation.
- INP-mätning i headless bör **inte** bli en grind, eftersom bruset är för stort och web.dev säger att fältdata gäller. Låt Lighthouse TBT vara proxy och mät INP i fält efter lansering.

**Passar vår stack?**
- Ja. React-öar ändrar inget i Playwright.
- ARIA-snapshoten är särskilt värdefull när React-komponenter och Motion kommer in, eftersom de är där `aria-expanded` och namn brukar tappas.
- Kör proven på `client:visible`-öar efter skroll och hydrering. Använd `waitForFunction` eller ett ARIA-tillstånd, inte en fast väntan.
- Skärmbilder kräver `animations: "disabled"` och `reducedMotion` så att Motion inte ger brus.

**Risker och flaggor:**
- Licensen är okomplicerad.
- Webbläsarna laddas ner från Microsofts CDN. Ingen telemetri hittades.
- MCP-servern är ingen säkerhetsgräns. Använd `--isolated` och lokala adresser.
- Krockar:
  - bfcache är avstängd som standard.
  - `forcedColors` är bara en mediefråga.
  - Basbilder skiljer sig mellan Mac och Linux.
  - WebKit-Tab på macOS.
  - `toHaveScreenshot` och `toMatchAriaSnapshot` hör till testköraren, inte till biblioteket.

**Inloggning:** behövs inte. Allt är öppet: npm, GitHub och dokumentationen. MCP-servern kan använda en inloggad webbläsarprofil (`--user-data-dir`, extension-läge), men det ska vi inte göra. Johnny behöver inte logga in någonstans.
