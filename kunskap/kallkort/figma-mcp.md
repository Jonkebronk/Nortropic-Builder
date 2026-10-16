# figma

**Källa:** Figma MCP server, fjärrserver `https://mcp.figma.com/mcp`.
- Dokumentation läst 2026-10-16:
  - [översikt](https://developers.figma.com/docs/figma-mcp-server/)
  - [installation, fjärrserver](https://developers.figma.com/docs/figma-mcp-server/remote-server-installation/)
  - [verktyg och promptar](https://developers.figma.com/docs/figma-mcp-server/tools-and-prompts/)
  - [gränser och åtkomst](https://developers.figma.com/docs/figma-mcp-server/rate-limits-access/)
- Repot [figma/mcp-server-guide](https://github.com/figma/mcp-server-guide) (2 078★, push 2026-10-15, ingen licens i API-svaret) lästes bara som lista över ärenden.
- Ingenting är installerat.

**Licens:** Figmas villkor gäller. ⚠️ Användarvillkoren är inte lästa. Innehållet är kundens egen fil.

**Vad det är:**
- Figmas officiella MCP-server. Den läser designkontext ur Figmafiler (variabler, komponenter, layout, skärmbilder, tillgångar) och kan också skriva till canvas.

**Hur det fungerar:**
- **Två varianter.**
  - Fjärrservern är rekommenderad och kräver inte desktopappen.
  - Desktopservern "requires a Dev or Full seat on a Professional, Education, Organization, Government, or Enterprise" plan.
- **Läsverktyg** (urval): `get_design_context`, `get_variable_defs`, `get_metadata`, `get_screenshot`, `download_assets`, `search_design_system`, `get_code_connect_map`, `get_figjam` och `whoami`. Skrivverktyg finns också, bland annat `use_figma`, `create_new_file` och `generate_figma_design`.
- **Kod:** "By default, the output is React and Tailwind". Ett annat ramverk kan begäras i prompten.
- **Anropsgränser:**

  | Plats | Gräns |
  |---|---|
  | View- och Collab-platser | "Up to 20 per month" |
  | Full eller Dev, Professional | "Up to 200 per day, 10 per minute" |
  | Full eller Dev, Organization | 200 per dag, 15 per minut |
  | Full eller Dev, Enterprise | 600 per dag, 20 per minut |
  | Full eller Dev, Starter | ingen siffra (streck) |

  Skrivverktyg och anrop som använder AI-krediter räknas inte.
- **Installation i Claude Code:** `claude mcp add --transport http figma https://mcp.figma.com/mcp`, eller pluginet `figma@claude-plugins-official`. Pluginet tar med Figmas skills, vilket den manuella installationen inte gör.

**Kvalitet och underhåll:**
- Officiell och aktivt underhållen. Guide-repot hade push 2026-10-15 och 0 öppna ärenden enligt sökningen.
- Öppna PR rättar dokumentationen, till exempel #75: `get_metadata` returnerar bara den aktiva sidan.
- Figma förbehåller sig rätten att ändra gränserna.

**Det bästa vi kan ta:**
- `get_variable_defs` och `get_design_context` när en kund har en Figmafil. Variablerna mappas mot `--k-*` enligt build-design.
- `get_screenshot` som jämförelsemål.

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
- Klienten måste finnas i Figmas katalog (Claude Code gör det).
- En organisation kan blockera plugins.

**Inloggning:**
- MCP fungerar inte utan Figma-konto. Första anslutningen kräver inloggning: "sign in with your Figma account the first time you connect" (`/mcp` → figma → Authenticate → Allow access).
- Kontot måste ha åtkomst till kundens fil, som ska delas till Johnnys konto.
- För fler än 20 anrop per månad behövs en Dev- eller Full-plats på en betald plan.
- **Johnny behöver** logga in och godkänna, och ta ställning till plats och plan när en kund faktiskt har en fil.
