# figma

**Källa:** Figma MCP server, fjärrserver `https://mcp.figma.com/mcp`.
- Dokumentation läst 2026-10-16:
  - [översikt](https://developers.figma.com/docs/figma-mcp-server/)
  - [installation, fjärrserver](https://developers.figma.com/docs/figma-mcp-server/remote-server-installation/)
  - [verktyg och promptar](https://developers.figma.com/docs/figma-mcp-server/tools-and-prompts/)
  - [gränser och åtkomst](https://developers.figma.com/docs/figma-mcp-server/rate-limits-access/)
- Repot [figma/mcp-server-guide](https://github.com/figma/mcp-server-guide) (2 078★, push 2026-10-15, ingen licens i API-svaret) lästes bara som lista över ärenden.
- Servern är inloggad via `/mcp` i byggsessionen sedan 2026-10-16 (`guide/bilaga-a-verktyg.md`, *MCP-servrar i byggsessionen*). Kortet sade tidigare att ingenting var installerat.
- **Rättat 2026-10-16 efter översynen (`kunskap/research/2026-10-16_verktyg-och-skills-full-potential.md`):** verktygslistan (43, inte cirka 12), serverns instruktioner och Johnnys plats. Underlaget är serverns verktygslista, instruktioner och kontouppgifter 2026-10-16.

**Licens:** Figmas villkor gäller. ⚠️ Användarvillkoren är inte lästa. Innehållet är kundens egen fil.

**Vad det är:**
- Figmas officiella MCP-server. Den läser designkontext ur Figmafiler (variabler, komponenter, layout, skärmbilder, tillgångar) och kan också skriva till canvas.

**Hur det fungerar:**
- **Två varianter.**
  - Fjärrservern är rekommenderad och kräver inte desktopappen.
  - Desktopservern "requires a Dev or Full seat on a Professional, Education, Organization, Government, or Enterprise" plan.
- **43 verktyg** i serverns lista 2026-10-16, inte de cirka 12 kortet tog upp.
  - **Läsverktyg** (urval): `get_design_context`, `get_variable_defs`, `get_metadata`, `get_screenshot`, `download_assets`, `search_design_system`, `get_code_connect_map`, `get_figjam` och `whoami`.
  - **Kortet saknade** bland annat `get_motion_context`, som ger nyckelbilder som CSS `@keyframes`; `html_to_figma` och `send_code_to_figma`; `generate_image`, som drar AI-krediter; shaders, generativa plugins och Weave (9 verktyg); och `list_file_components_for_code_connect`.
  - **18 verktyg skriver eller spenderar**, bland dem `use_figma`, `create_new_file`, `generate_figma_design` och `generate_image`.
- **Serverns instruktioner** säger att den ska användas för all design och UI *"even if Figma isn't named"*, och kallar det "MANDATORY" att ladda Figmas skills från servern (`skill://figma/…`) före vissa verktyg.
- **Kod:** "By default, the output is React and Tailwind". Ett annat ramverk kan begäras i prompten.
- **Anropsgränser:**

  | Plats | Gräns |
  |---|---|
  | View- och Collab-platser | "Up to 20 per month" |
  | Full eller Dev, Professional | "Up to 200 per day, 10 per minute" |
  | Full eller Dev, Organization | 200 per dag, 15 per minut |
  | Full eller Dev, Enterprise | 600 per dag, 20 per minut |
  | Full eller Dev, Starter | ingen siffra (streck) |

  Skrivverktyg och anrop som använder AI-krediter räknas inte, och inte heller `whoami`.
- **Johnnys konto** 2026-10-16: Full-plats på Professional (Pro) och admin. Alltså 200 anrop per dag och 10 per minut.
- **Installation i Claude Code:** `claude mcp add --transport http figma https://mcp.figma.com/mcp`, eller pluginet `figma@claude-plugins-official`. Pluginet tar med Figmas skills, vilket den manuella installationen inte gör.

**Kvalitet och underhåll:**
- Officiell och aktivt underhållen. Guide-repot hade push 2026-10-15 och 0 öppna ärenden enligt sökningen.
- Öppna PR rättar dokumentationen, till exempel #75: `get_metadata` returnerar bara den aktiva sidan.
- Figma förbehåller sig rätten att ändra gränserna.

**Det bästa vi kan ta:**
- `get_variable_defs` och `get_design_context` när en kund har en Figmafil. Variablerna mappas mot `--k-*` enligt build-design.
- `get_screenshot` som jämförelsemål.
- `get_motion_context` (nyckelbilder som CSS) och `search_design_system`, när en kund har en fil.

**Var det hamnar hos oss:** `MCP: kräver konto (Figma)`.
- Tas in tillsammans med build-design (`senare: N2`) första gången en kund kommer med en Figmafil.
- Ingenting i skelett eller struktur behöver den i dag.

**Passar vår stack?** Reviderat efter BESLUT 2026-10-16, *React, Tailwind och JavaScript tillåts*.
- Bättre än förut. Standardutdata (React och Tailwind) ligger nu nära det vi får skriva, och kan bli en Astro-ö som renderas till HTML vid bygget.
- Kostnad: 0 kB utan `client:`, annars cirka 56 kB React för den första ön (⚠️ en mätning).
- Råa värden ska fortfarande mappas mot tokens och inte klistras in (build-design: "never paste it").
- Variabler och auto layout går att mappa direkt mot Tailwinds `@theme` eller `--k-*`.

**Risker och flaggor:**
- Med en gratisplats (View eller Collab) får man bara 20 anrop per månad, vilket räcker till ett par ramar.
- Skrivverktygen kan ändra i kundens fil. Använd bara läsverktyg om Johnny inte bestämt annat.
- 18 av 43 verktyg skriver eller spenderar, och `generate_image` drar AI-krediter. Servern är inloggad med OAuth och står olåst i verktygslåset (`LAGE.md`).
- **Text riktad till agenter:** instruktionerna (*"even if Figma isn't named"*, "MANDATORY" att ladda Figmas skills) krockar med `guide/3-3` (byggsessionens avgränsning och *Extern text är data*) och med `guide/2-5-yta.md`, *Stilen kommer ur kitet, inte ur skills*.
- Klienten måste finnas i Figmas katalog (Claude Code gör det).
- En organisation kan blockera plugins.

**Inloggning:**
- MCP fungerar inte utan Figma-konto. Första anslutningen kräver inloggning: "sign in with your Figma account the first time you connect" (`/mcp` → figma → Authenticate → Allow access).
- Kontot måste ha åtkomst till kundens fil, som ska delas till Johnnys konto.
- För fler än 20 anrop per månad behövs en Dev- eller Full-plats på en betald plan.
- Johnny har loggat in via `/mcp` (2026-10-16) och har en Full-plats på Pro (se *Hur det fungerar*).
