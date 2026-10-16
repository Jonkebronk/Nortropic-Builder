# refero

**Källa:** Refero MCP, `https://api.refero.design/mcp` (HTTP), enligt `mcp.json` i https://github.com/referodesign/refero_skill (commit `2382e51`, 2026-10-12).
- Dokumentation läst 2026-10-16:
  - [Getting started](https://doc.refero.design/mcp/getting-started)
  - [Tools](https://doc.refero.design/mcp/tools)
  - [Plans](https://doc.refero.design/help/plans)
  - [Skill overview](https://doc.refero.design/skill/overview)
- ⚠️ refero.design/pricing och refero.design/terms gav bara sidtiteln vid hämtning (sidorna renderas med JS), så priser och användarvillkor är inte lästa.
- Ingenting är installerat.

**Licens:** ingen öppen licens för innehållet. Tjänsten är en prenumeration.
- "Each subscription is licensed to one user" och "Sharing credentials or providing access to others is not allowed" (plans).
- ⚠️ Vad användarvillkoren säger om skärmbilderna (kommersiell användning, kopiering) gick inte att läsa.

**Vad det är:**
- En MCP-server, bara för läsning, mot Referos kurerade katalog.
- Innehåll: designstilar från marknads- och produktsajter, "150,000+ real app screens" och "6,000+ user flows" (README), samt sajter och iOS-appar.

**Hur det fungerar:** tio verktyg enligt docs/tools.
- `refero_search_site`, `refero_search_app`
- `refero_search_styles`, `refero_get_style` (upp till 10 id)
- `refero_search_screens` (`platform` `web` eller `ios`), `refero_get_screen`, `refero_get_similar_screens` (1–20)
- `refero_get_screen_image` (`thumbnail` eller `full`)
- `refero_search_flows`, `refero_get_flow`

Data stannar på servern ("Only the results your agent requested come back").

Gräns: "up to 8,000 MCP tool calls per monthly usage period" per licensierad användare. Högre gränser kräver en separat företagslösning.

**Kvalitet och underhåll:**
- Skill-repot har 311★ och 1 bidragsgivare.
- Issue #1 (öppen) visar att verktygsnamnen har ändrats tidigare (`_tool`-suffix, `get_design_guidance` borttaget). Dagens docs och `mcp-tools.md` stämmer i stort sett överens.
- Servern finns i det officiella MCP-registret (PR #8, `server.json`).
- ⚠️ Driftstatus och ändringslogg för servern hittades inte.

**Det bästa vi kan ta:**
- `refero_search_styles` och `refero_get_style` för stilriktning (visual thesis, tokens, sektionsrytm, do/don't) när ett stilkit tas fram.
- `refero_search_screens` (`web`) för sektionsmönster.

**Var det hamnar hos oss:** `MCP: kräver konto (Refero Pro, Team eller Lifetime, betald, OAuth)`.
- Väntar på Johnny (BESLUT 2026-10-16: MCP-servrar som kräver konto eller nyckel väntar på honom).
- Om den tas in hör den till lager 5 (stilkit) och lager 4 (sektionsmönster).

**Passar vår stack?**
- Stilkatalogen gäller "web marketing/product pages … SaaS websites" och täcker inte dashboards eller appar som stilsystem.
- ⚠️ Hur bra den täcker svenska kliniker, hantverkare och kaféer är okänt och kräver konto att pröva.
- Reviderat efter BESLUT 2026-10-16, *React, Tailwind och JavaScript tillåts*:
  - Resultaten är text och bilder och kostar 0 kB på sajten.
  - Stilarnas "component/code examples" (Tailwind och React) kan nu tas in i biblioteket, med licens per komponent. ⚠️ Referos villkor för kodexemplen är inte lästa.
  - En komponent som behöver `client:` kostar cirka 56 kB React för första ön (⚠️ en mätning).

**Risker och flaggor:**
- Betalvägg: Free saknar MCP, och "Refero does not currently offer a free trial".
- Licensen är per användare. Johnnys konto får inte delas.
- Okända villkor för skärmbilder.
- Överlappar Mobbin (se mobbin-mcp-kortet). Köp en, inte båda, tills behovet är visat.

**Inloggning:**
- **Utan konto:** skillens metod och hantverksfiler (gratis, MIT).
- **Med Free-konto på webben:** "Search with limited results", ingen MCP, inget Figma-plugin.
- **Pro, Team eller Lifetime krävs för:** fulla sökresultat, flöden, nedladdning, Figma-plugin och MCP.
- **Johnny behöver:** köpa planen och första gången logga in via OAuth i webbläsaren när klienten ansluter (`/mcp` → refero → Authenticate). Alternativet är en Bearer-token i konfigurationen, som då är en hemlighet och ska ligga utanför repot.
