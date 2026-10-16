# motion

*Posten med typen Skill (Motion, Matt Perry). MCP-posten med samma namn har ett eget kort: `motion-mcp.md`.*

**Källa:** https://github.com/motiondivision/ai-kit, `plugins/motion/skills/motion/`, commit `b7e2c68fb3b` (2026-10-15), version 7.0.1 enligt `CHANGELOG.md`. Läst 2026-10-16:
- `SKILL.md`
- `best-practices/` i sin helhet: `index.md`, `css-or-motion.md`, `motion.md` (vanilla), `react.md`, `vue.md` och `base-ui.md`
- `codex/index.md`, `css-spring/index.md`, `performance-audit/index.md` och `transition-preview/index.md`
- `agents/motion-reviewer.md`, `rules/motion.mdc`, plugin-README:n, repots `README.md` och `CHANGELOG.md`
- ärendena #1–#6.

Dokumentationen [motion.dev/docs](https://motion.dev/docs) lästes för `animate`, `inView`, *react-accessibility*, *react-reduce-bundle-size* och *ai-kit*. Biblioteket `motion` 14.3.0 från npm laddades ner och mättes.

**Licens:**
- Repot `ai-kit` har ingen LICENSE-fil, och GitHub visar ingen licens ⚠️. Pluginets `plugin.json` och paketet `motion-ai` anger MIT. Vi destillerar med egna ord och anger källan.
- Biblioteket `motion` är MIT, © 2024 Motion B.V.

**Vad det är:** Motions officiella skill för agenter, skriven av Motions upphovsman. Den ger bästa praxis för rörelse i CSS och i Motion (vanilla, React, Vue, Base UI och Radix) och pekar till dokumentationssökningen, generatorn för CSS-fjädrar, prestandagranskningen MotionScore och övergångsredigeraren via Motions MCP-servrar.

**Hur det fungerar:**
- **`best-practices/index.md`:**
  - transform, opacitet, `clip-path` och `filter` är hårdvaruaccelererade
  - layoutanimationer i stället för `width`/`height`/`top`/`left`
  - `will-change` bara när animationen annars förlorar accelerationen
  - fjädrar för fysisk rörelse som kan avbrytas
  - ingen överskjutning på en seriös sajt
  - 150–300 ms för små element och upp till cirka 500 ms för stora ytor
  - varje animation visar ett tillståndsbyte, en relation eller återkoppling, aldrig bara dekor
  - reducerad rörelse respekteras.
- **`css-or-motion.md`:** en tabell över när CSS räcker (färg, skugga och opacitet vid klassbyte, entré med `@starting-style`, enkla loopar, korta förskjutna listor) och när Motion behövs (utgång när ett element tas bort, layoutanimation, delat element, höjd till `auto`, drag, växlar som trycks ofta, entré vid scroll med `inView`). *"Pick the simplest tool that does the job well cross-browser."*
- **`react.md`:** `<MotionConfig reducedMotion="user">` stänger av transform- och layoutanimationer och behåller opacitet och färg.
- **`css-spring/index.md`:** fjädrar och studsar efterliknas med `linear()`. Längden man får tillbaka är längre än den man bad om, eftersom insvängningen räknas med. En `linear()`-fjäder kan inte avbrytas med bibehållen fart.
- **Nivåer:** bästa praxis och sökning är gratis; MotionScore, källkod till exempel och redigeraren kräver Motion+ (→ `motion-mcp.md`).

**Kvalitet och underhåll:**
- `ai-kit`: 38 stjärnor, fyra forkar, skapat 2026-07-27 och senaste push 2026-10-16. Två bidragsgivare: mattgperry 17 och claude 1.
- Biblioteket [motiondivision/motion](https://github.com/motiondivision/motion) har 34 187 stjärnor, är MIT och har dagliga sammanslagningar (senast 2026-10-16) och 38 öppna ärenden.
- Ärenden i `ai-kit`:
  - #5 (2026-10-15): oberoende transformer (`x`, `scale`) är nu hårdvaruaccelererade. Det säger emot Emils skills.
  - #2 (öppet) och #1 (stängt) gäller inloggningen till Motion+-servern.

**Det bästa vi kan ta:**
- Tabellen *CSS or Motion*. → `rorelse/verktyg.md`, *Välj verktyg*.
- Längderna och regeln om överskjutning på seriösa sajter. → `rorelse/matt.md` och *Förbud* i `rorelse/SKILL.md`. Det är en andra källa, oberoende av Emil, för att studs inte hör hemma på en seriös sajt.
- `MotionConfig reducedMotion="user"` för React-öar. → `rorelse/reducerad.md`.
- Storlekarna ur dokumentationen:
  - `animate` mini 3,2 kB och hybrid 22 kB
  - `inView` 0,5 kB
  - `m` med `LazyMotion` cirka 5 kB plus `domAnimation` 24 kB
  - hela `motion` för React 43 kB.
  → `rorelse/verktyg.md`.

**Var det hamnar hos oss:** destillerat i skillen `rorelse` (`verktyg.md`, `reducerad.md` och `matt.md`). Skillen installeras inte. Regelfilen `motion.mdc` säger åt agenten att alltid använda Motion-skillen först, också för ren CSS, och det krockar med vår skill.

**Passar vår stack?** Ja.
- Vanilla-API:t (`inView` och `animate`) fungerar som skript i Astro för in-animationer i måttlig budget: 0,5–3,7 kB per sida.
- Motion för React fungerar i React-öar, som nu är tillåtna (`BESLUT.md` 2026-10-16). Det kostar cirka 78 kB för React 19.3.1 (mätt) plus 5–43 kB för Motion. Det krockar med Lighthouse 100 om det laddas på sidor som inte behöver ön; tas upp med Johnny.
- Sparsam rörelse behöver inget av det.
- Vanilla-dokumentationen säger inget om reducerad rörelse ⚠️, så vi kontrollerar `matchMedia` själva.

**Risker och flaggor:**
- Repot saknar en egen licensfil ⚠️.
- Regelfilen `motion.mdc` (`alwaysApply: false`, glob för bland annat `*.astro` och `*.css`) vill styra all rörelse till Motion-skillen. Krock med vår skill; installeras inte.
- Påståendet om accelererade oberoende transformer krockar med Emils `animate` och `animation-performance`. Motions egen uppgift om sitt eget bibliotek väger tyngre.
- Ingen telemetri i skillfilerna. Den inloggade MotionScore-delen erbjuder att spara rapporter i kontot (→ `motion-mcp.md`).
