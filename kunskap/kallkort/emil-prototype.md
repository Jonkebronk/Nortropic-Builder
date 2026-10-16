# emil-prototype

**Källa:** https://github.com/emilkowalski/skills, sökvägen `skills/prototype/`.
- Läst 2026-10-16 vid commit `2d22863` (2026-10-11).
- Skillen har 3 commits, den senaste är `85e8e23` (2026-09-15).
- Lästa filer: `SKILL.md` (98 rader) och `PICKER.md` (197).

**Licens:** MIT, © 2026 Emil Kowalski. PICKER.md ska enligt skillen kopieras ordagrant, och då följer licenstexten med.

**Vad det är:**
- En utforskningsskill (user-invoked) som bygger 3–5 verkligt olika versioner av en del av gränssnittet.
- Versionerna läggs bakom en väljare så att användaren kan bläddra och välja.

**Hur det fungerar:**
- **Hårda regler:**
  1. Ingen produktionskod rörs under utforskningen.
  2. Varianterna skiljer sig på en namngiven axel: layout, täthet, personlighet, rörelse eller interaktionsmodell.
  3. Varje variant fungerar fullt ut, med riktigt innehåll.
  4. Väljaren är "chrome, not a contestant".
  5. Det som inte valts städas bort.
- **Faser:** Scope → Recon (stack, tokens, personlighet, kontext) → välj riktningar → harness (route eller fristående HTML) → verifiera och lämna över (tabell med "When it's the right choice" och "Its cost") → befordra.
- **Hantverkskrav på varje variant:** `ease-out` vid entré, under 300 ms, rätt `transform-origin`, bara `transform` och `opacity`, och reducerad rörelse.
- **PICKER.md:** en mörk "pill" längst ner i mitten med en glidande markering. Kommandona är `riff <variant>` och `keep <variant>`.

**Kvalitet och underhåll:**
- 46 586★.
- Issue #30 (öppen, 2026-10-08) pekar ut två brister:
  - Hantverkskravet täcker bara rörelse. I verklig användning släpptes en variant igenom med kontrasten 3,05:1 och 2,62:1, alltså under WCAG AA.
  - Väljarens koppling ger hydreringsfel i SSR-ramverk.
- Härlett: PICKER.md har `.proto-picker-item:hover` utan capability-query, vilket bryter mot Emils egen regel i mobile-native.

**Det bästa vi kan ta:**
- Ingenting som inte variant (Krehel) redan ger bättre. Krehels golv täcker kontrast, tangentbord, 320 px och 200 % zoom, väljaren styrs via URL-param, och bedömning sker vid både 375 och 1440 px.
- Möjligen rörelsekraven, men de hör till lager 6 (rörelse) och inte till skelett.

**Var det hamnar hos oss:** `släpp`, oförändrat efter stackbeslutet.
- Skälet var aldrig stacken. Skillen är en dubblett av better-variant, som bär metoden in i biblioteket, och Emils version saknar kontrastgolv (issue #30).
- Det enda nya värdet med Motion tillåtet är hantverkskraven på rörelse (`ease-out` vid entré, under 300 ms, `transform`/`opacity`, reducerad rörelse). De hör till rörelseskillen (lager 6) och Emils animate-skills, inte hit.

**Passar vår stack?** Reviderat efter BESLUT 2026-10-16, *React, Tailwind och JavaScript tillåts*.
- Nu ja. Recon-steget (Tailwind och ett rörelsebibliotek) och varianter i React med Motion stämmer med den öppnade stacken. Väljaren i PICKER.md fungerar i en förhandsvisning.
- Kostnaden ligger i varianterna, inte i väljaren: 0 kB utan `client:`, annars cirka 56 kB React (första ön, ⚠️ en mätning) plus Motion 43 kB, eller drygt 5 + 24 kB.
- Krock att ta upp med Johnny: Emils variantkrav handlar bara om rörelse. Krehels golv (kontrast, 320 px, 200 % zoom) behövs ändå.

**Risker och flaggor:**
- Kravet på ordagrann kopiering av väljaren låser in en design.
- Ingen telemetri.

**Inloggning:** behövs inte.
