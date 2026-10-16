# Adobe Leonardo

**Källa:** https://github.com/adobe/leonardo, commit eb6481d (2026-07-08). npm: `@adobe/leonardo-contrast-colors` 1.1.0 (2026-02-18) och `@adobe/leonardo-mcp` 0.1.0 (2026-02-21). Lästa filer: `packages/contrast-colors/README.md`, `packages/mcp/README.md` (via npm-metadata), `skills/leonardo-colors/SKILL.md` och paketens `package.json`. Webbapp: https://leonardocolor.io ⚠️ inte öppnad. Läst 2026-10-16.

**Rättat 2026-10-16 efter översynen (`kunskap/research/2026-10-16_verktyg-och-skills-full-potential.md`):** `generate-theme` i Claude Code, OKLCH i biblioteket 1.1.0 och ⚠️ om `cli.js`. Underlaget är koden i `@adobe/leonardo-mcp` 0.1.0 och prov med de fyra verktygen och biblioteket 2026-10-16.

**Licens:** Apache-2.0 (biblioteket, MCP-servern och repot). Kräver att licens och NOTICE följer med om koden distribueras, och att ändringar märks. Vi kör den bara vid byggtid. Beroendet `apca-w3` 0.1.9 har licensen "Limited W3 License" (npm), se Risker.

**Vad det är:** Ett bibliotek som räknar fram färger mot en målkontrast i stället för tvärtom: du anger nyckelfärger och vilka kontrastkvoter du vill ha, och Leonardo hittar nyanserna. Till det finns en MCP-server och en agent-skill från Adobe.

**Hur det fungerar:**
- `BackgroundColor` (en per tema) och `Color` (förgrundsfärger) har `colorKeys` (en eller flera färger att interpolera mellan), `colorspace` (bland annat `OKLCH`, `LCH`, `CAM02`; föråldrat, #280) och `ratios` – en lista eller ett objekt med egna namn, till exempel `{ 'accent--text': 4.5 }`. Negativa kvoter ger färger ljusare än bakgrunden, för mörkt läge.
- `Theme` tar `colors`, `backgroundColor`, `lightness` (0–100), valfri `contrast` (multiplikator), `saturation`, `output` och `formula: 'wcag2'` (standard) eller `'wcag3'` (APCA).
- Utdata: `theme.contrastColors` (strukturerat), `contrastColorPairs` (platt objekt) och `contrastColorValues`. **I 1.1.0 är OKLCH-utdatan ogiltig** (`oklch(1, 0, 4485%)` i provet). Använd `output: "HEX"` och konvertera med Color.js.
- README:n varnar: "If 8.58 is input as the target ratio … the output will not be exact." Kvoten är ett minimum, så resultatet blir ibland något högre.
- MCP-servern: `npx -y @adobe/leonardo-mcp`, körs lokalt över stdio. Verktyg: `generate-theme`, `check-contrast` (WCAG 2 AA/AAA eller APCA), `convert-color` (bland annat OKLCH) och `create-palette`. Beroenden: bara `zod`, `@modelcontextprotocol/sdk` och biblioteket. Inget konto och ingen nyckel.
- **MCP 0.1.0 i Claude Code:** `generate-theme` fungerar inte, oavsett indata. `src/server.js` rad 55–58 lägger en lista i `structuredContent`, där MCP kräver ett objekt. `check-contrast`, `convert-color` och `create-palette` fungerar. `check-contrast` gav ett negativt tal för ett par (⚠️ teckenregeln är inte utredd).
- Agent-skillen `skills/leonardo-colors/SKILL.md` lär ut API:t i steg och laddar `references/api.md` vid behov. Dess exempel sätter CSS-variabler med JavaScript i webbläsaren (`document.documentElement.style.setProperty`) – det mönstret ska vi inte följa.

**Kvalitet och underhåll:** 2 157 stjärnor, 18 bidragsgivare, 63 öppna ärenden och PR:er. Senaste commit 2026-07-08; MCP-servern är en första version (0.1.0). De mest diskuterade ärendena gäller webbappen (#178, #179, #211). Ärenden som rör biblioteket: #202 "High severity vulnerabilities for ciebase > mout" (öppen sedan 2023; `ciebase` 0.1.1 från 2016 drar in `mout` ^0.11.1), #280 "backgroundcolor.js is using depreciated `colorspace`" (2026) och #148 om att ändra kontrasten mellan två givna färger. README:ns lista över utdataformat saknar OKLCH, men MCP-servern och koden har det (`lager-5-yta.md` §2). I 1.1.0 är den utdatan ogiltig (se *Hur det fungerar*).

**Det bästa vi kan ta:**
- Receptet i guiden 2-5 (Färgrecept): kundens accent som `colorKeys`, `formula: 'wcag2'`, namngivna kvoter per roll – cirka 1,05–1,5 för ytor, 3 för kanter och fokus, 4,5 för text, 7 om AAA önskas.
- MCP-verktyget `check-contrast` som snabb kontroll medan kit tas fram.
- Skillens steg 1–4 (installation, `Color`/`BackgroundColor`, `Theme`, läsa utdata) som underlag till ytskillens `farg.md`, med egna ord.

**Var det hamnar hos oss:** Ytskillen `farg.md` (recept och kvoter per roll), MCP-servern lokalt i projektet när kit tas fram eller kundens accent läggs in, och bibliotek vid byggtid i ett kitskript. Inget skeppas – sajten får färdiga värden i CSS.

**Passar vår stack?** Ja. Körs i Node vid byggtid eller av Claude via MCP; 0 byte JavaScript per sida. Med Tailwind 4 tillåtet (`BESLUT.md` 2026-10-16, kl. 12.28) går värdena via DTCG/Terrazzo eller direkt till `--k-*` och `@theme inline`. Översättning: Leonardos namn (`accent100`, egna kvotnamn) mappas till kitets roller (`--k-accent`, `--k-accent-text`, `--k-linje`, `--k-fokus`). Ingen krock med Lighthouse 100, *HTML först* eller rörelsereglerna.

**Risker och flaggor:**
- `apca-w3` följer med som beroende även när `wcag2` används. Licensen begränsar kommersiell användning utanför W3-avtalet (`lager-5-yta.md` §2, https://github.com/Myndex/apca-w3/blob/master/LICENSE.md). Den skeppas inte till sajten, men licensen är inte juridiskt bedömd (tolkning, inte juridisk rådgivning).
- Gammal kedja `ciebase` → `mout` med kända sårbarheter (#202). Påverkar bara byggmiljön; kör `npm audit` när paketet läggs till.
- MCP-servern är ung (0.1.0), och `generate-theme` är trasig i Claude Code. Ingen telemetri: koden läser bara sin egen `package.json` och gör inga nätverksanrop (andra varvet, `andra-varvet/mcp-jamforelse.md`, *Adobe Leonardo*).
- Ingen betalvägg och ingen inloggning.
