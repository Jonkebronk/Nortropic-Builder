# design

**Källa:** https://github.com/nextlevelbuilder/ui-ux-pro-max-skill, sökvägen `.claude/skills/design/`. Jag läste den 2026-10-16 vid commit `56ea9cf` (repot, 2026-10-15). Skillen ändrades senast i `6166631` (2026-10-14, *fix(design): image extensions, failure exit status and --pro model id*, #532). Skillversion 2.1.0 enligt frontmatter, plugin 2.15.0.

Lästa filer:
- `SKILL.md` (333 rader, hela)
- `references/`: `design-routing.md`, `logo-design.md`, `logo-color-psychology.md`, `cip-design.md`, `cip-style-guide.md`, `cip-deliverable-guide.md` och början av `social-photos-design.md` och `icon-design.md`. `logo-style-guide.md`, `logo-prompt-engineering.md` och `cip-prompt-engineering.md` genomsökte jag efter licens, tillgänglighet och "i stil med". Slides- och bannerfilerna är kopior av posterna `slides` och `banner-design` (jag kontrollerade med diff).
- `scripts/logo/generate.py` (inläsning av nycklar, leverantörer och modeller), `scripts/icon/generate.py` (modell och nyckel) och storlekarna på alla skript (3 218 rader Python inklusive tester)
- repots `README.md`, `CLAUDE.md` och ärendena #156, #474 och #289

**Licens:** MIT, © 2024 Next Level Builder. Licenstexten följer med om kod eller text kopieras.

**Vad det är:** en paraplyskill för allt grafiskt utanför själva sajten: AI-genererade logotyper, identitetsprogram (CIP: visitkort, brevpapper, skyltar, fordon och kläder som mockupper), banners, SVG-ikoner, sociala bilder och presentationer. För varumärke, tokens och UI hänvisar den till syskonskillsen `brand`, `design-system` och `ui-styling`.

**Hur det fungerar:**
- **Logotyp:** `scripts/logo/search.py` gör en designbrief ur CSV-data (55 stilar, 30 paletter, 25 branscher) med BM25-sökning. Därefter genererar `scripts/logo/generate.py` bilder via Gemini (`gemini-2.5-flash-image` eller `gemini-3-pro-image`), Atlas Cloud (`api.atlascloud.ai`) eller MuAPI (`api.muapi.ai`), alltid på vit bakgrund.
- **Identitetsprogram:** `scripts/cip/generate.py` lägger kundens logotyp på mockupper genom bildredigering i Gemini. `render-html.py` gör en HTML-presentation av resultatet.
- **Ikoner:** `scripts/icon/generate.py` låter `gemini-3.1-pro-preview` skriva SVG som text.
- **Sociala bilder:** HTML/CSS i plattformsmått och skärmdump med headless Chrome, Playwright eller Puppeteer. Rapporten läggs i `plans/reports/`.
- **Nycklar:** `GEMINI_API_KEY`, `ATLASCLOUD_API_KEY` och `MUAPI_API_KEY`. Skripten läser också `.env` i skillmappen, `~/.claude/skills/.env` och `~/.claude/.env` på egen hand (`load_env()` i `logo/generate.py`).
- **Färgpsykologi och branschstandard** (`logo-color-psychology.md`): tabeller som *"Blue: Trust, stability"* och *"Food … Avoid: Blue (appetite suppressant)"*, utan källor.

**Kvalitet och underhåll:**
- Repot har 136 402 stjärnor och omkring 101 bidragsgivare och är mycket aktivt (push 2026-10-15). Skillens `author` är *claudekit*.
- **Premium:** enligt README ingår *"Brand Identity generation, Logo Design, Corporate Identity Programs (CIP), Banners, Presentation Slides, and custom Iconography"* i en betald premiumversion (uupm.cc). Den öppna skillen är alltså en del av ett säljerbjudande. ⚠️ Priset syns inte på uupm.cc.
- **Kända problem:**
  - #474 (rapporterat 2026-08-31, nu stängt): 22 hårdkodade sökvägar `~/.claude/skills/design/scripts/…` som fallerar vid plugininstallation, plus hänvisningar till claudekit-skills som inte följer med. Sökvägarna är rättade i dagens `SKILL.md`, men arbetsflödena hänvisar fortfarande till syskonskills.
  - #289: en automatisk granskning hittade tre säkerhetsfynd av medelnivå i CLI och skript. Rättningarna går via separata PR.
  - `references/slides-create.md` är fortfarande en stub (`<task>$ARGUMENTS</task>`).
- **Inga källor:** stilar, färgpsykologi och branschstandard saknar källor.

**Det bästa vi kan ta:**
- Listan i `cip-deliverable-guide.md`, *Core Identity* (primär logotyp i vektorformat, frizon, monokroma varianter, liggande och stående), som checklista för vad varumärkesboken ska visa om kundens befintliga logotyp. Det är lite, och [brandguidelines.net](https://brandguidelines.net) är redan guidens förebild.
- Inget annat. Generering av logotyp och identitet går emot guiden, och ikonerna ska vara sakliga och föreställa tjänsten (G2, `guide/2-5-yta.md`), inte genereras.

**Var det hamnar hos oss:** ingenstans (`släpp`). Delarna har egna poster: `banner-design` (senare: N3), `slides` (släpp) och syskonskillsen `brand`, `design-system`, `ui-styling` och `ui-ux-pro-max`. Logotypfrågan står som lucka L14 i `utanfor-luckor.md`.

**Passar vår stack?**
- Python med `google-genai` och Pillow, utanför vår Node- och Astrokedja.
- UI-delen (shadcn/ui, Tailwind) är tillåten sedan BESLUT 2026-10-16 (*React, Tailwind och JavaScript tillåts*), men den delen hör till posterna `ui-styling` och `design-system`.
- Sociala bilder via HTML och Playwright skulle fungera tekniskt med våra tokens, men ingen tjänst säljer dem i dag.

**Risker och flaggor:**
- **Mot beslut:**
  - *"Logotyper genereras inte"* (`guide/2-5-yta.md`, N2)
  - *"Inga genererade logotyper"* (`guide/4-foretaget.md`, Varumärkesbok)
  - ren AI-output saknar sannolikt upphovsrättsligt skydd (`kunskap/research/2026-10-14_ai-forordningen-och-rattigheter.md` §4, tolkning).
- **Dataflöde:** kundens namn och logotyp skickas till Google, Atlas Cloud eller MuAPI. Atlas Cloud och MuAPI är inte granskade som underbiträden.
- **Hemligheter:** skripten läser `~/.claude/.env` utan att fråga. Det krockar med regeln om hemligheter utanför repot och med byggsessionens avgränsning (`guide/3-3-sakerhet-och-installningar.md`).
- **Betalvägg:** den fulla versionen är premium.
- Ingen telemetri hittad i skripten.
- Krockar: 8, varav 5 höga (inventeringen).
- **Instruktion i skillen:** *"When scripts fail, try to fix them directly"* gör att agenten ändrar i skillens egna filer.
