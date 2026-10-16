# chrome-devtools

**Källa:** allt läst 2026-10-16.
- https://github.com/ChromeDevTools/chrome-devtools-mcp, main vid commit `382f441` (2026-10-16).
  - Lästa filer: `README.md`, `docs/tool-reference.md`, `docs/configuration.md`, `docs/design-principles.md`, `docs/client-configurations.md` (Claude Code), `docs/troubleshooting.md` (rubriker), `SECURITY.md`, `CHANGELOG.md` (1.11.0), `skills/a11y-debugging/SKILL.md`, `skills/debug-optimize-lcp/SKILL.md` (början) och `package.json`.
- npm: `chrome-devtools-mcp` **1.11.0** (2026-10-15). Kräver Node `^20.19 || ^22.12 || >=23`.
- GitHub-ärenden: sökning via API:t (öppna, sorterade på reaktioner) plus #1955, som lästes på webben.

**Licens:**
- Apache-2.0. Det finns ingen NOTICE-fil.
- Vi kör verktyget och sprider inget, så det ställs inga krav i praktiken.
- Kopierar vi kod eller text ur repot, till exempel snippets ur `skills/`, ska licenstexten följa med och ändringar anges i filen.
- Lighthouse 13.5.0 är buntad, och dess licenstexter läggs till vid paketeringen (`scripts/append-lighthouse-notices.ts`).

**Vad det är:**
- Googles MCP-server, och sedan en tid även CLI, som låter en agent styra och läsa av en riktig Chrome genom DevTools-protokollet (via Puppeteer).
- Den ger spårningar med prestandainsikter, nätverk, konsol, skärmbilder, tillgänglighetsträdet och en Lighthouse-granskning utan prestandakategori.

**Hur det fungerar:**
- **Verktyg:** 59 verktyg i elva kategorier. Som standard är 46 påslagna: input, navigering, emulering, prestanda, nätverk, felsökning och minne. Tillägg, Third-party, WebMCP och PWA är avstängda (`tool-reference.md`).
- **Viktigast för oss:**
  - `lighthouse_audit` ger tillgänglighet, SEO, best practices och "agentic browsing", men **inte prestanda**.
    - Lägen: `navigation` (laddar om) eller `snapshot` (nuvarande tillstånd). Enhet: `mobile` eller `desktop`.
    - Rapporten sparas på disk. Sedan 1.11.0 kommer fallerade granskningar och noder med direkt i svaret.
  - `performance_start_trace` och `performance_stop_trace` (med `reload`, `autoStop`, `ignoreCache`, `filePath`) och `performance_analyze_insight` (t.ex. `LCPBreakdown`, `RenderBlocking`, `DocumentLatency`).
  - `emulate`: CPU-strypning, nätprofil, viewport, färgschema, `forced-colors`, `prefers-contrast`, `prefers-reduced-motion`, geoposition och extra huvuden. **Varje anrop ersätter de tidigare inställningarna**, utom huvudena.
  - `take_snapshot` (tillgänglighetsträdet med `uid`), `list_console_messages` (filter `types`, även de tre senaste navigeringarna), `list_network_requests` och `get_network_request` (huvuden, även `Set-Cookie`).
- **Inbyggda skills** (`skills/`):
  - `a11y-debugging` arbetar i den här ordningen: Lighthouse, Chromes egna "issues" i konsolen (`types: ["issue"]`), tillgänglighetsträdet, etiketter, Tab-ordning, klickytor och kontrast.
  - `debug-optimize-lcp` delar LCP i fyra delar: TTFB, laddningsfördröjning, laddningstid och renderingsfördröjning.
- **Flaggor för integritet och isolering** (`configuration.md`):
  - `--no-performance-crux`: skickar inga URL:er till CrUX (standard är på).
  - `--no-usage-statistics`: **statistiken till Google är på som standard.** Den stängs också av med miljövariabeln `CHROME_DEVTOOLS_MCP_NO_USAGE_STATISTICS` eller `CI`.
  - `CHROME_DEVTOOLS_MCP_NO_UPDATE_CHECKS`: stänger av uppslagen mot npm.
  - `--isolated`: tillfällig profil som raderas efteråt.
  - `--redact-network-headers` (standard av), `--allowed-url-pattern` / `--blocked-url-pattern`, `--no-javascript-evaluation`, `--file-navigations=false` och `--filesystem-root`.
- **Designprinciper:** semantiska sammanfattningar i stället för rå JSON, stora data som filreferenser, små deterministiska byggstenar.

**Kvalitet och underhåll:**
- Repot: 53 645 stjärnor, 6 775 forks, 147 bidragsgivare och 174 öppna ärenden och PR:er enligt GitHub-API:t 2026-10-16 (bidragsgivare med `anon=1`; öppna ärenden räknas ihop med PR:er). I git-historiken: 1 426 commits, varav 1 050 under 2026. 152 unika mänskliga författaradresser i git-historiken, 117 av dem under 2026 (räknat ur en trädlös klon; inte GitHubs bidragsgivarlista).
- Senaste commit 2026-10-16. Utgåvor ungefär varannan vecka (1.7.0 2026-08-10 till 1.11.0 2026-10-15).
- 124 öppna ärenden. De mest reagerade gäller hängningar med många flikar (#1921) och önskemål om funktioner.
- **Kända problem som rör oss:**
  - [#1955](https://github.com/ChromeDevTools/chrome-devtools-mcp/issues/1955) (stängd 2026-05-22): CPU-strypning från `emulate` tillämpades inte under spårning, så LCP blev 3–6 gånger för snabb. Rättad i PR #2092 och #2096, som ingår i **1.1.0 (2026-05-26)** enligt `CHANGELOG.md`. Version 1.11.0 har alltså rättelsen.
  - Öppna sedan 2026-10-06: [#2967](https://github.com/ChromeDevTools/chrome-devtools-mcp/issues/2967) (granskning av en sida som inte laddar ger ett normalt svar utan `runtimeError`), [#2968](https://github.com/ChromeDevTools/chrome-devtools-mcp/issues/2968) (navigeringsläget tappar emulerad skalfaktor och skärmstorlek) och [#2966](https://github.com/ChromeDevTools/chrome-devtools-mcp/issues/2966) (en ogiltig viewport ligger kvar och felrapporteras).
  - **Följd:** läs inte ett MCP-mätvärde som grind. Kontrollera alltid att emuleringen faktiskt gäller.
- `SECURITY.md`: verktyget litar på arbetskatalogen och miljön. Sidinnehåll returneras som det är, och projektet räknar inte promptinjektion via sidinnehåll som sårbarhet ("prefer using this server with trusted web content").

**Det bästa vi kan ta:**
- Arbetsordningen i `skills/a11y-debugging/SKILL.md`. Särskilt Chromes egna problemrapporter via `list_console_messages` med `types: ["issue"]` och `includePreservedMessages: true`. De fångar saknade etiketter och ogiltig ARIA utan egen kod, och passar som diagnossteg när axe fallerat.
- LCP-uppdelningen i `skills/debug-optimize-lcp/SKILL.md`, steg 1–3 (spårning med `reload` och `autoStop`, sedan `LCPBreakdown`, `RenderBlocking` och `LCPDiscovery`).
- Startraden till `.mcp.json` eller användarnivån: `npx -y chrome-devtools-mcp@1.11.0 --isolated --no-usage-statistics --no-performance-crux --headless`.
  - Låst version i stället för `@latest`, så att startsäkringen ser bytet.
  - **Pröva `--redact-network-headers`** när Access-huvuden förekommer.

**Var det hamnar hos oss:**
- **MCP, för diagnos och inte som grind.** Startflaggorna ovan. Kvalitetsskillens delfil `kontroller.md` får avsnittet "När en kontroll fallerar".
- **Kontrollerna:** kontrollskriptet (`skript/kontroll.mjs`) kör redan Lighthouse 13.5.0 och axe direkt med Playwright. MCP:n behövs alltså inte för själva kontrollerna.
- **Användning:** spårning med `LCPBreakdown` när Lighthouse-prestanda < 100, Chromes problemrapporter och `take_snapshot` när axe eller tangentbordskontrollen fallerar.
- **React-öar:** en spårning visar vad hydreringen kostar. Långa uppgifter vid `client:visible` syns i spårningen, och insikten för INP pekar ut vilket skript som blockerar.

**Passar vår stack?**
- Ja, för Chromium-diagnos av byggd sajt (`astro preview` eller kontrollskriptets lilla server).
- Den täcker bara Chrome, alltså inte WebKit.
- Prestandasiffror från MCP:n är inte jämförbara med kontrollskriptets Lighthouse-median.

**Risker och flaggor:**
- Telemetri är på som standard; flaggan måste sättas.
- CrUX-anrop skickar URL:er till Google; flaggan måste sättas.
- `@latest` i startraden byter version utan att vi märker det.
- Promptinjektion från sidinnehåll: kör bara mot våra egna sajter.
- `--autoConnect`/`--browserUrl` mot Johnnys vanliga Chrome skulle exponera inloggade sessioner. Använd `--isolated`.
- Ingen betalvägg.

**Inloggning:**
- Ingen. Med `--isolated` finns inga inloggade sessioner i webbläsaren.
- Access-skyddade förhandsvisningar kräver service token som huvud (`emulate.extraHttpHeaders`). Det är en hemlighet, och den ska inte hamna i loggar.
