# emil-improve-animations

**Källa:** https://github.com/emilkowalski/skills, `skills/improve-animations/SKILL.md` (109 rader), `AUDIT.md` (115 rader) och `PLAN-TEMPLATE.md` (73 rader). Läst 2026-10-16 vid repots commit `2d228630ba14` (2026-10-11). Senaste ändring är `85e8e2363b` (2026-09-15); skillen skapades 2026-07-11 och har fyra commits.

**Licens:** MIT, © 2026 Emil Kowalski. Vi destillerar med egna ord och anger källan.

**Vad det är:** en rådgivarskill som granskar all rörelse i en kodbas, prioriterar fynden och skriver fristående åtgärdsplaner som en annan agent, gärna en billigare modell, kan utföra. Den ändrar ingen källkod själv.

**Hur det fungerar:**
- **Fyra faser:**
  1. **Kartläggning:** stack, var rörelsen bor, befintliga tokens, personlighet och en frekvenskarta.
  2. **Granskning** i åtta kategorier, gärna med en delagent per kategori:
     - syfte och frekvens
     - kurvor och längder
     - fysik och ursprung
     - avbrott
     - prestanda
     - tillgänglighet
     - sammanhang och tokens
     - missade tillfällen.
  3. **Sållning:** varje fynd kontrolleras mot sin rad i koden, och det som är avsiktligt tas bort.
  4. **Planer** i `plans/` med exakta värden, nuvarande kod, mål, repots konventioner och hur känslan kontrolleras.
- Djupet styrs med `quick`, `standard` och `deep`. Allvaret är HIGH, MEDIUM eller LOW.
- `AUDIT.md` har värdena att citera. Bland dem att `box-shadow` och oskärpa är dyra och att fem nästan likadana kurvor ska slås ihop till tokens.
- Beslut som redan är fattade och dokumenterade ska inte prövas om.

**Kvalitet och underhåll:** samma repo som `emil-animate`: 46 586 stjärnor, tre bidragsgivare och senaste push 2026-10-11. Inga ärenden gäller just den här skillen.

**Det bästa vi kan ta:**
- De åtta kategorierna. → `rorelse/granskning.md`, tabellen *Vad som bedöms*.
- Kategorin *Cohesion & tokens*: lösa kurvor och längder ska bli tokens. → revisionens fynd R2 och förslaget i `rorelse/matt.md`.
- Sållningen: kontrollera varje fynd i koden innan det rapporteras. Det stämmer med granskarens regler (→ `guide/3-2-granskning-och-kalibrering.md`).
- Regeln att inte pröva om fattade beslut. Hos oss betyder den `BESLUT.md`.

**Var det hamnar hos oss:** destillerat i skillen `rorelse` (`granskning.md`). Inventeringen föreslog ett byggverktyg. Planformen behövs inte, eftersom åtgärderna hos oss görs i huvudsessionen medan Johnny tittar (`guide/5-byggplan.md`), och revisionen pekar redan ut fil och rad.

**Passar vår stack?** Ja, för det som är CSS. Kategorierna om Framer Motions förkortningar och React-tillstånd gäller bara React-öar. `plans/`-katalogen och arbetsträden passar inte vårt flöde.

**Risker och flaggor:**
- Varianten `execute` startar en delagent som ändrar kod i ett arbetsträd. Det används inte, eftersom Johnny godkänner ändringar.
- Ingen telemetri, ingen betalvägg och ingen inloggning.
