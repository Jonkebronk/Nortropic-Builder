# MDN MCP

**Källa:** allt läst 2026-10-16.
- https://github.com/mdn/mcp, HEAD `dfecbe769d5bd48df310251c8e49e80540aac6d4` (2026-10-13, `git ls-remote`). Lästa i sin helhet: `README.md`, `INSTRUCTIONS.md`, `SECURITY.md`, `package.json`, `index.js`, `server.js`, `transport.js`, `tools/search.js`, `tools/get-doc.js` (rad 1–140), `tools/get-compat.js`, `glean/glean.js`, `glean/metrics.yaml`, `logging/mixin.js` och `sentry/`. Git-historiken utan beroendebyten. Ärendena #98, #201 och #231 och de öppna PR:erna #275 och #276.
- [developer.mozilla.org/en-US/mcp](https://developer.mozilla.org/en-US/mcp), sidan om servern (saknar datum).
- Den låsta verktygslistan `inventering/mcp-verktyg/mdn.json` och byggsessionens konfiguration (lokal scope).
- MDN:s publika data, för att se vad servern bygger på: `index.json` för `popover` och BCD-API:t för `html.global_attributes.popover`.
- ⚠️ Inte lästa: Mozillas [integritetsmeddelande för webbplatser](https://www.mozilla.org/en-US/privacy/websites/) och [Acceptable Use Policy](https://www.mozilla.org/en-US/about/legal/acceptable-use/) i sin helhet. Hur länge serverloggarna sparas. Om `get-doc` tar med Baseline-bannern i sin markdown (`renderSimplified` i `@mdn/fred` är inte läst).

**Licens:** koden är MPL-2.0 (`LICENSE`, `package.json`). Det är copyleft per fil och gäller bara den som sprider koden. Vi använder Mozillas värdade server och sprider inget. Svaren är MDN-innehåll: prosan är CC-BY-SA 2.5 och kodexempel från 2010-08-20 och senare är CC0 ([mdn/content, LICENSE.md](https://github.com/mdn/content/blob/main/LICENSE.md)). Vi destillerar med egna ord och länkar till MDN, så inga villkor utlöses.

## Vad det är
Mozillas egen MCP-server för MDN Web Docs. README: *"This is an experimental MCP server that provides access to MDN's search, documentation, and browser compatibility data."* Den körs som värdad tjänst på `https://mcp.mdn.mozilla.net/` och kräver inget konto. Version 0.0.1 i `package.json`. Servern finns inte i det officiella MCP-registret. Där finns i stället tredjepartsservrar med liknande namn (`mrfentmen/mdn-search-mcp`, `pipeworx-io/mdn-search`; registrets sökning 2026-10-16).

## Hur det fungerar
- **Tre verktyg**, alla med `readOnlyHint: true`, `destructiveHint: false` och `openWorldHint: false` (`mdn.json`):
  - `search` frågar `developer.mozilla.org/api/v1/search` och hämtar sidornas metadata. Svaret har titel, sökväg, sammanfattning och BCD-nyckel (`tools/search.js:32–83`).
  - `get-doc` hämtar sidans `index.json`, gör om den till markdown och sätter BCD-nyckeln överst. Den vägrar andra värdar än MDN och följer högst fem omdirigeringar (`tools/get-doc.js:46–64`).
  - `get-compat` hämtar Browser Compatibility Data från `bcd.developer.mozilla.org` för en nyckel som måste matcha `^[a-zA-Z0-9._-]+$` (`tools/get-compat.js:23–36`).
- **Instruktionerna** (`INSTRUCTIONS.md`, skickas vid `initialize`) säger att verktygen ger *"more accurate, up-to-date information compared to your general knowledge"* och att BCD-nycklar inte ska gissas.
- **Statslös:** en ny server per anrop och JSON i stället för SSE (`transport.js:10–15`).
- **Baseline:** `get-compat` ger versionsstöd per webbläsare, inte Baseline-status. MDN:s `index.json` har fältet `baseline`. För `popover` står där sidans datum 2024-04-16 med asterisk och funktionens datum 2025-01-27 enligt web-features. Det är samma skillnad som `kvalitet/modern-html-css.md:25` märker ⚠️.
- **Data som lämnar Macen:**
  - **Glean** registrerar sökväg, BCD-nyckel, antal träffar, bästa träffens sökväg och klientens User-Agent, men inte frågetexten (`glean/metrics.yaml`; ärende #98: *"don't record any user-supplied data (such as a user-supplied path, or search query)"*). Huvudet `X-Moz-1st-Party-Data-Opt-Out: 1` stänger av Glean helt (`glean/glean.js:36–38`).
  - **Serverloggen** skriver *varje* verktygsanrop med argumenten, alltså frågetexten, och User-Agent: `tool=${name} args=${JSON.stringify(args)} user-agent=…` (`logging/mixin.js:22–24`). Huvudet stänger inte av den. README: *"we will be storing data about the queries we receive"*.
  - **Sentry** får fel om `SENTRY_DSN` är satt (`sentry/init.js`).

## Kvalitet och underhåll
- 192 stjärnor, 12 forkar, 3 öppna ärenden och PR:er, skapad 2025-10-03, senaste push 2026-10-14 (GitHubs API 2026-10-16). Fem mänskliga bidragsgivare. Leo McArdle står för 35 och Claas Augner för 13 commits; Dependabot för 190.
- Utvecklingen är jämn sedan november 2025: verktygen, BCD-nycklar i svaren, annoteringar (2026-04-08), Glean (2026-04-10) och omdirigeringar (2026-07-16). Testerna kräver 100 % radtäckning (`package.json`).
- **Kända problem:**
  - [#231](https://github.com/mdn/mcp/issues/231): servern gav 4–5 gånger högre processorlast i en Claude Code som inte gjorde något. Rättat i commit `284bc79` (2026-10-05, #274): GET med SSE får 405 i stället för en omdirigering som gav en ändlös återanslutning.
  - [#201](https://github.com/mdn/mcp/issues/201) och PR #276: CORS stoppar klienter i webbläsaren. Det rör inte Claude Code.
- README: *"As this MCP server is experimental, it may be withdrawn at any time."*

## Det bästa vi kan ta
1. **BCD per webbläsare utan att gissa nyckeln:** först `search`, sedan `get-compat` med nyckeln ur svaret. Det ger exakta versioner för Safari på iOS, som Baseline-etiketten inte visar.
2. **Två källor för status:** MDN-sidans `baseline` och web-features skiljer sig ibland (popover ovan). Den regel som `modern-html-css.md:17` och `:78` redan har gäller: status slås upp i båda, och skillnaden märks ⚠️.
3. **Facit är web-features, inte servern.** Paketet ligger lokalt (`skript/node_modules`, 3.43.0 enligt `kvalitet/kallor.md:24`) och är deterministiskt. Servern ger snabbare text och källänk, men en kontroll bygger aldrig på ett svar från den.

## Var det hamnar hos oss
**Beslut** (Johnny omkring 17.40, *"Ja på alla"*): *MCP: ta in (efter provet; med huvudet X-Moz-1st-Party-Data-Opt-Out: 1)*. Jag håller med. Ett tillägg föreslås till Johnny: huvudet stänger bara av Glean, inte serverloggen med frågetexten. Därför står aldrig kunduppgifter eller sajtens adresser i en fråga till servern, samma regel som för Astro Docs.
- Servern hör till skillen **kvalitet**, `modern-html-css.md`, som slagverktyg när status ska slås upp. Den nämns inte där i dag. Förslag: en rad i *Källor* om att MDN-servern får användas för uppslag och att web-features är facit.
- Tabellen *Status enligt MDN:s Baseline-banner* i `modern-html-css.md` och luckorna 4.4 (Popover), P47 och P57 är de påståenden servern ska pröva.
- **Provet mot övningssajten:** sex frågor där guiden eller skillsen påstår något om stöd: Popover, Invoker Commands, scroll-drivna animationer (P57), `@view-transition` mellan dokument (P34), `<details name>` och `text-wrap: pretty`. En ren delagent svarar med och utan servern. Facit tas ur web-features. **Nytta:** rätt status med källänk i fler fall, eller med färre steg än WebFetch. **Annars:** ta bort servern (`andra-varvet/mcp-jamforelse.md`, *MDN MCP*).

## Passar vår stack?
Ja. Servern rör inte sajten och kräver ingenting installerat, eftersom den är värdad. Den svarar om HTML, CSS och webb-API:er, alltså det Astro skriver ut och det React-öarna använder. Den vet ingenting om Astro, Tailwind eller Cloudflare.

## Risker och flaggor
- **Frågetexten loggas** även med huvudet (`logging/mixin.js:22–24`). Hur länge loggen sparas står inte någonstans ⚠️.
- **Experimentell och kan dras tillbaka.** Inget i flödet får hänga på den.
- **Instruktioner till modellen** följer med varje start (`INSTRUCTIONS.md`). De är harmlösa i dag. Verktygslåset (`skript/mcp-verktygslas.py`) rapporterar om de ändras.
- **Förväxling:** registrets `mdn-search`-servrar är inte Mozillas. Installera bara från `mcp.mdn.mozilla.net`.
- Ingen betalvägg, ingen inloggning. Villkoren är Mozillas Acceptable Use Policy ⚠️ (inte läst).

## Inloggning
Inget konto, ingen nyckel och ingen OAuth. Servern kräver bara huvudet för att slippa Glean. I byggsessionen är den inlagd i lokal scope (`~/.claude-bygg/.claude.json`, under repots sökväg) som `http`, `https://mcp.mdn.mozilla.net/`, med huvudet `X-Moz-1st-Party-Data-Opt-Out: 1`. Samma huvud står i `inventering/mcp-servrar.json`, och verktygslistan är låst i `inventering/mcp-verktyg/mdn.json`. Johnny behöver inte göra något.
