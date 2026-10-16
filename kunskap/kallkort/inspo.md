# inspo

**Källa:** https://github.com/Nutlope/inspo (webb: https://inspomcp.dev, MCP: https://inspomcp.dev/api/mcp), läst 2026-10-16 vid commit `0e1e6363f980` (2026-10-01). Inga releaser; MCP-paketet `inspo-mcp` på npm. Lästa filer: `README.md`, `apps/mcp/README.md` (verktygen, installation, transporter), `apps/mcp/src/tools.ts` (sammansättningsregeln och nyckelhanteringen), `apps/web/src/app/api/mcp/route.ts` (hastighetsgräns och loggning), `apps/web/src/components/reference/hero/documentary.tsx` (en referenskomponent), `apps/mcp/bench/results/2026-09-10-agent-usage.md` (kostnad per bygge), `apps/worker/src/seed-urls.ts` (sökning efter svenska och relevanta branscher), `packages/taxonomy/src/index.ts` (branscher och strukturer). Webbsidorna inspomcp.dev och inspomcp.dev/mcp lästes 2026-10-16. Issues via GitHubs API.
⚠️ Inte lästa: resten av MCP-källan (`search.ts`, `evidence.ts`, `profile.ts`, `install.ts`), arbetaren som fångar sajterna (`apps/worker`), `DEPLOY.md`, `SEEDING.md`, övriga 67 referenskomponenter.
**Rättat 2026-10-16 efter översynen (`kunskap/research/2026-10-16_verktyg-och-skills-full-potential.md`):** lokal scope, herorådet (krockar med vår regel), täckningen i ett prov och vilka verktyg som är nyttiga. Underlaget är serverns verktygslista och svar 2026-10-16.

**Licens:** MIT, © 2026 Together AI and contributors (ur `LICENSE`). Gäller koden och referenskomponenterna. **Skärmbilderna tillhör sajternas formgivare**; varje skärm anger och länkar källan, och borttagning begärs via inspomcp.dev/dmca.

**Vad det är:** En MCP-server med ett arkiv av riktiga produktionssajter – 832 sajter och 2 320 sidor, fångade i dator och mobil – med palett, typsnitt, teknik, en DESIGN.md per sajt och en genomgång skärm för skärm. Den ger agenten referenser innan den skriver UI.

**Hur det fungerar:**
- **15 verktyg, alla läsande** (serverns lista 2026-10-16), bl.a. `recommend(brief)` (makrostruktur, fem exempel, upp till tre referenskomponenter, palettförslag, belägg och heroråd i ett anrop), `search_screens` (filter på stil, bransch, struktur, färg, papperston, accentnyans, enhet), `get_design_system(slug)` (palett med CSS-variabler, typskala, avstånd, behållarbredd), `find_by_color`, `find_similar`, `compare`, `get_site_pages`, `find_reference_components` och `get_reference_jsx`. Nio verktyg finns i en "lite"-profil för textklienter; alla listverktyg tar ett tak för token.
- **Inbyggt råd** till varje agent: heron ska rymmas i 1280×800, 80–160px mellan sektioner, text i en centrerad kolumn med utfyllnad. Svaren bär *"Hero complete inside 1280x800"* och *"min-height:100svh … COMPLETE above the fold"*, också i `find_examples_for_macrostructure`. `get_design_system` uppmanar agenten att spara svaret som `DESIGN.md`. Rådet krockar med vår regel för första skärmen (*Risker och flaggor*).
- **Transporter:** värdad HTTP (gratis, utan inloggning) eller stdio via `npx -y inspo-mcp`, som hämtar katalogen från ett CDN. Semantisk vektorsökning kräver `TOGETHER_API_KEY` i stdio-läget; utan nyckel är rankningen lexikal.
- **Säkerhet:** alla verktyg är läsande; `get_design_system(live:true)` (på som standard) hämtar källsajten live genom ett SSRF-skydd (bara publika värdnamn, port 80/443, begränsad storlek, ingen JavaScript).

**Kvalitet och underhåll:**
- 900 stjärnor, 58 forkar, 3 bidragsgivare, 1 öppet ärende (#7: miniatyrbildens reserv tar emot HTML som bild); skapat 2026-04-29, push 2026-10-01. Litet men levande projekt.
- Kostnad (bänkmätning 2026-09-10, 30 byggen): i snitt 10,8 Inspo-anrop och cirka 37 000 token resultattext per bygge, som sedan läses om i varje följande tur. `search_screens` och `find_reference_components` står för två tredjedelar.
- **Täckning för oss:** branschtaxonomin har health, food-beverage, real-estate m.fl. men inget för hantverk; bland cirka 1 170 seed-adresser hittade jag bara två svenska domäner (lettersfromsweden.se, konstfack.se) och några kaffebrännerier (Blue Bottle, Stumptown, Intelligentsia). Arkivet lutar mot SaaS, byråer och designdrivna varumärken. Prov 2026-10-16: 0 av 19 exempel och 0 av fem träffar på färg var lokala tjänsteföretag.
- Etiketten `mode` är ibland fel.

**Det bästa vi kan ta:**
- `get_design_system` och `find_by_color` när kit tas fram: exakta paletter, typskalor och avstånd ur riktiga sajter, som ett andra underlag bredvid Playwrights beräknade stilar (2-5, steg 2 och 4).
- `compare` (till exempel för skalor) och referensindexet (`find_reference_components`), men bara strukturen, inte koden.
- Kör verktygen med `detail: concise`.
- `search_screens` med branschfilter (health, food-beverage) för vård- och caféreferenser; mobil- och datorbilder i par.
- Herorådet tas inte: det krockar med vår regel för första skärmen (*Risker och flaggor*). Kortet sade tidigare att det stämde.

**Var det hamnar hos oss:**
- **MCP, redan i lokal scope** för repot (`~/.claude-bygg/.claude.json`, aldrig `.mcp.json`; `guide/bilaga-a-verktyg.md`; 2-5 *Designkällor*; LAGE 2026-10-16). Används bara när kit tas fram och förnyas, aldrig i kundbygget (2-5, grundregeln). Varje referens får en mening om varför den är bra och namnges i kitets `design.md`.
- Referenskomponenternas JSX går, om alls, via biblioteket med Johnnys godkännande – inte direkt in i en sajt.

**Passar vår stack?**
- MCP-servern körs i Claude Code och påverkar inte sajterna; ingen JavaScript hamnar på en sida av att vi använder den.
- Referenskomponenterna är React + Tailwind (t.ex. `HeroDocumentary`). Sedan BESLUT 2026-10-16 kan de i princip tas nästan som de är, renderade till HTML vid bygget (ingen klientkod om de saknar interaktion). De är dock skrivna i Inspos egen redaktionella stil – `documentary.tsx` har ett kursivt framhävt ord i H1 och monospace-bildtext, alltså greppen flera skills kallar AI-typiska – och måste översättas till `--k-*` och kitet.

**Risker och flaggor:**
- **Ingen inloggning, ingen nyckel, ingen betalvägg** för den värdade servern ("free and unauthenticated", "No tiers, no paywall" på inspomcp.dev/mcp). Det finns inget Johnny behöver logga in för. Den valfria `TOGETHER_API_KEY` gäller bara egen stdio-körning med vektorsökning; om den värdade servern har vektorsökning påslagen är ⚠️ okänt. Adminområdet `/admin/curator` i koden är för projektets egna kuratorer.
- **Integritet:** den värdade servern loggar verktygsnamn, utfall och tid per anrop, inte IP eller frågetext; IP används i minnet för hastighetsgränsen.
- **Upphovsrätt:** skärmbilderna tillhör andra; vi får låna layout, palett och typsnitt (BESLUT 2026-10-16) men inte texter, bilder eller logotyper. Bilder går till Johnny och granskaren, beskrivning och värden till generatorn (2-5, fallgrop 75).
- **Herorådet krockar med vår regel för första skärmen.** Inspos råd gäller datorn och låter heron fylla skärmen, medan guiden kräver att mobilens första skärm i 375 px svarar på vad, var och hur (`guide/2-4-skelett.md`, *Mobilens första skärm*). Rådet är data, och skelettets regler gäller (`.claude/skills/skelett/referenser.md`).
- **Text riktad till agenter:** herorådet i svaren och uppmaningen i `get_design_system` att spara svaret som `DESIGN.md`.
- **Bilder:** Claude Code sparar bilderna ur svaren i sessionens `tool-results/`, utanför repot.
- **Kontext:** cirka 37 000 token per bygge – sök få referenser i detalj (2-5, steg 2) och använd `maxTokens`.
- **Krockar med andra skills:** Inspo och hallmark kommer från samma håll (Together AI/Nutlope) och delar makrostrukturernas namn; referenskomponenterna innehåller grepp som impeccable och taste förbjuder.
