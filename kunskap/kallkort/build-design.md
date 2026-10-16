# build-design

**Källa:** https://github.com/jakubkrehel/skills, sökvägen `skills/build-design/`.
- Läst 2026-10-16 vid commit `4c66b1f` (2026-10-12).
- Skillen kom till i PR #42 (2026-10-05). Mappen har 2 commits, den senaste är `da5f6d5` (2026-10-05).
- Lästa filer: `SKILL.md` (83 rader), `figma.md` (29) och `agents/openai.yaml`.
- Figmas verktygsnamn jämfördes mot https://developers.figma.com/docs/figma-mcp-server/tools-and-prompts/ (läst 2026-10-16).

**Licens:** MIT, © 2026 Jakub Krehel.

**Vad det är:**
- En skill som modellen anropar själv. Den bygger gränssnitt efter en Figmafil eller en designbild med projektets befintliga tokens och komponenter.
- Efteråt jämförs bygget mot designen.
- "The design decides". Allt designen inte visar räknas som avvikelse.

**Hur det fungerar:**
1. **Läs designen vid källan.**
   - En Figmalänk läses med Figma MCP. Leta efter verktyget innan du säger att det saknas. Om bara ett authenticate-verktyg finns är servern ansluten men utloggad.
   - En bild ger bara uppskattningar, och den antagna skalan ska anges.
2. **Mappa mot projektet.**
   - Variabel → token, rått värde → token eller närmaste token, märkt "rounded".
   - En komponentinstans → projektets komponent. Saknas den används vanlig markup, och avvikelsen listas.
   - Inga nya tokens eller godtyckliga värden. Fråga om avrundningen syns, det vill säga **mer än 2 px**, eller om en färg hamnar på ett annat steg.
3. **Bygg bara det som är ritat.** Tillstånd som inte är ritade listas som saknade. Inga följdändringar i grannkoden.
4. **Jämför** element för element vid varje ramsbredd. "Gap is 12px, design is 16px" är ett fynd, "feels tight" är det inte.
5. **Rapport** med kolumnerna Element, Design, Built och Status, plus listorna Unwired, Missing states och Domain conflicts.

`figma.md` beskriver verktygen och hur svaren ska tolkas:
- `get_design_context` returnerar som standard React och Tailwind som referens och ska aldrig klistras in.
- Variabelnamn går före råa värden, Code Connect före namnmatchning, auto layout före absoluta positioner.
- Tillgångar laddas ner, eftersom Figmas URL:er löper ut.

**Kvalitet och underhåll:**
- Ny skill (2 commits). Repot har 7 968★.
- Inga ärenden rör build-design.
- Verktygsnamnen i `figma.md` (`get_design_context`, `get_screenshot`, `get_variable_defs`, `get_metadata`) finns i Figmas aktuella verktygslista.

**Det bästa vi kan ta:**
- Gränsen på 2 px och regeln att bara bygga ritade tillstånd, som granskningsregler när en sektion byggs efter en referens eller ett stilkit.
- Rapporttabellen Design / Built / Status som format för "matchar bygget kitet?".
- Mappningstabellen (variabel → token → närmaste token), som passar vårt `--k-*`.

**Var det hamnar hos oss:** `senare: N2`, oförändrat efter stackbeslutet.
- Skälet var aldrig stacken. Ingen kundsajt har hittills kommit med en Figmafil ("Börja enkelt": ny mekanik ska kunna peka på sajten som behövde den).
- Skillen tas in tillsammans med Figma MCP första gången en kund har en fil.
- Jämförelseformatet kan redan nu användas i skelettets kontroll (`skelett/kontroll.md`, förslag).

**Passar vår stack?** Reviderat efter BESLUT 2026-10-16, *React, Tailwind och JavaScript tillåts*.
- Ja, bättre än förut. Figmas standardutdata (React och Tailwind) ligger nu nära det vi får skriva.
- En sådan komponent kan bli en Astro-ö som renderas till HTML vid bygget. Den kostar då 0 kB JavaScript utan `client:`-direktiv.
- Med `client:visible` kostar den cirka 56 kB gzip för React-körtiden om den är första ön på sidan. ⚠️ En mätning (bejamas/ui-benchmark).
- Skillens egen regel gäller fortfarande: referenskoden klistras inte in rått ("Translate … and never paste it"). Råa värden mappas mot tokens (Tailwinds `@theme` eller `--k-*`), och gränsen på 2 px gäller.
- Krock att ta upp med Johnny: en ritad interaktion (karusell, animerad hero) kräver ofta en klientö, vilket påverkar Lighthouse 100 och *HTML först*.

**Risker och flaggor:**
- Skillen förutsätter Figma MCP, som kräver Figma-konto och har en anropsgräns (se figma-mcp-kortet).
- Ingen telemetri i skillen.

**Inloggning:** skillen behöver ingen, men Figma MCP gör det (se figma-mcp-kortet).
