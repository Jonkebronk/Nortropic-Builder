# motion

*Posten med typen MCP (Motion, motion.dev). Skillen med samma namn har ett eget kort: `motion-skill.md`.*

**Källa:** https://github.com/motiondivision/ai-kit, `plugins/motion/mcp.json`, `skills/motion/SKILL.md`, `codex/index.md`, `performance-audit/index.md`, `transition-preview/index.md` och `agents/motion-reviewer.md`, commit `b7e2c68fb3b` (2026-10-15), version 7.0.1. Läst 2026-10-16 tillsammans med [motion.dev/docs/ai-kit](https://motion.dev/docs/ai-kit), [motion.dev/plus](https://motion.dev/plus) och ärendena #1, #2 och #4. Servrarna anropades inte, och vi loggade inte in.

**Licens:**
- Pluginet anger MIT, men repot saknar LICENSE-fil ⚠️.
- Servrarna är en tjänst från Motion B.V. Inga villkor för själva MCP-tjänsten hittades ⚠️.
- Motion+ är betalt. Koden som Motion+ ger är MIT när den väl ligger i sajten (*"once you've added code to your site, it's yours forever"*). Den som säljer vidare Motion+-funktioner behöver en *Builder's Licence*.

**Vad det är:** två fjärrservrar för MCP som pluginet registrerar:
- **Motion** (`https://mcp.motion.dev`) är öppen utan konto.
- **Motion+** (`https://mcp.motion.dev/plus`) kräver inloggning med OAuth från redigeraren och ett konto med Motion+.

**Hur det fungerar:**
- **Gratis, utan konto:** `search-motion-docs` söker i dokumentationen för `js`, `react` eller `vue` och ger titel, beskrivning, API:er, MotionScore och en länk till den publika demon för exempel och Motion UI. Dokumentationssökningen blev öppen för alla i version 7.0.0 (2026-07-28). Enligt skillen och `codex/index.md` finns också `generate-css-easing` här, som gör fjädrar och studsar till `linear()`.
- **Kräver Motion+:**
  - `search-motion-source` ger källkoden till 450–500+ exempel och Motion UI, med cirka 50 sektioner.
  - `save-transition` och `open-transition-editor` ger övergångsredigeraren.
  - Metoden för MotionScore-granskningen (`motion://skills/performance-audit`) och körtidsgranskningen `npx motionscore <url> --agent`.
- **Motstridigt:** motion.dev/docs/ai-kit räknar genereringen av CSS-fjädrar till Motion+, medan skillen och `codex/index.md` från 2026-10-15 lägger den på den öppna servern ⚠️.
- Ett gratis konto behövs för att spara en övergång.

**Vad som bara syns inloggad:**
- källkoden till exemplen och Motion UI
- MotionScore-metoden och betygen
- övergångsredigeraren
- Motion+-delarna av dokumentationen
- historiken för sparade granskningar.

Johnny behöver ett Motion+-konto för detta. Planerna är **Solo**, en engångsavgift för en person (sidans strukturerade data anger 399 USD ⚠️; priset visas inte i klartext), och **Team**, årsavgift per plats för två eller fler: *"Usage by more than one person requires a Team package."*

**Kvalitet och underhåll:**
- `ai-kit`: 38 stjärnor, två bidragsgivare och senaste push 2026-10-16. Ändringsloggen har täta versioner: 6.2.0 2026-07-23, 7.0.0 2026-07-28 och 7.0.1 2026-10-15.
- Kända problem:
  - #1 (stängt): inloggningen till Motion+ misslyckades med `invalid_target`.
  - #2 (öppet): en oautentiserad GET svarar 200 utan MCP-huvudet och döljer inloggningskravet (401).
  - #4: Matt Perry bekräftar att gratisanvändare kan använda kitet, men granskningarna och källkoden kräver Motion+.

**Det bästa vi kan ta:**
- Utan konto: inget som vi inte redan får ur dokumentationen på motion.dev, som går att läsa direkt. Fjädergeneratorn ersätts av Open Props färdiga `--ease-spring-*`.
- Med Motion+: färdiga exempel och sektioner till biblioteket (inventeringens förslag: *Extrahera – rörelser till biblioteket*) och MotionScore som andra omdöme om prestanda.

**Var det hamnar hos oss:** ingenstans nu. Servern installeras inte (uppdraget förbjuder det, och den öppna delen ger lite). Den betalda delen väntar på att Johnny väljer att köpa Motion+. Beslut: `MCP: kräver konto (Motion+)`.

**Passar vår stack?** Exemplen och Motion UI är till stor del React-komponenter, som nu får användas som öar (`BESLUT.md` 2026-10-16). De kostar React plus Motion, cirka 80–120 kB per sida med ön. Det krockar med Lighthouse 100 och med budgeten sparsam, och tas upp med Johnny. Övergångsredigeraren ger kurvor och längder som kan föras in i kitets tokens.

**Risker och flaggor:**
- **Betalvägg och inloggning** med OAuth mot en extern tjänst.
- **Data till Motion:** körtidsgranskningen erbjuder att spara rapporten i kontot. Den innehåller adresser och kod från sajten. Inga kunddata får följa med. Förhandsadresser bakom Access går inte att granska utifrån.
- **Leverantörsberoende:** metoden levereras live från servern och ändras när Motion ändrar den, så ett betyg är inte stabilt över tid.
- **Inloggningsfel** i ärende #1 och #2.
- **Krock:** regelfilen säger åt agenten att använda Motion-skillen och servern först för all rörelse.
