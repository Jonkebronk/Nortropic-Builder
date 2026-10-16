# emil-review-animations

**Källa:** https://github.com/emilkowalski/skills, `skills/review-animations/SKILL.md` (120 rader) och `STANDARDS.md` (187 rader). Läst 2026-10-16 vid repots commit `2d228630ba14` (2026-10-11). Senaste ändring är `85e8e2363b` (2026-09-15); skillen skapades 2026-06-18 och har fem commits, flest av de fem.

**Licens:** MIT, © 2026 Emil Kowalski. Vi destillerar med egna ord och anger källan.

**Vad det är:** en granskningsskill som bedömer rörelsekod mot en hög hantverksnivå. Grundhållningen är att flagga; godkännande måste förtjänas. Den granskar bara rörelse, inte annan kod.

**Hur det fungerar:**
- **Tio standarder:**
  1. motiverad rörelse
  2. rätt för frekvensen
  3. inbromsande kurva
  4. gränssnitt under 300 ms
  5. rätt ursprung, aldrig `scale(0)`
  6. avbrytbar
  7. bara grafikkortets egenskaper
  8. tillgänglig: reducerad rörelse och hover-spärr
  9. asymmetrisk in och ut
  10. sammanhållen personlighet.
- En lista med utlösare som flaggas direkt, till exempel `transition: all`, ease-in, `scale(0)`, keyframes på toasts och ospärrad hover.
- **Åtgärdsordningen** i nio steg: ta bort, minska, byt kurva, rätta ursprunget, gör avbrytbar, flytta till grafikkortet, asymmetri, puts och tillgänglighet.
- **Utdata:** en tabell med Före, Efter och Varför och en dom per nivå, som slutar i *Block* eller *Approve*.
- `STANDARDS.md` har värdena: frekvenstabell, kurvor, längder, fysik, fjädrar, avbrott, asymmetri, prestanda, transform och `clip-path`, gester, oskärpa, förskjutning, tillgänglighet, felsökning i slowmotion och sammanhang.
- Frontmatter har `disable-model-invocation: true`, så bara användaren kan starta den med `/review-animations`.

**Kvalitet och underhåll:** samma repo som `emil-animate`: 46 586 stjärnor, tre bidragsgivare och senaste push 2026-10-11. Ärende #29 (öppet): andra skills säger åt modellen att använda den här, men den kan inte startas av modellen.

**Det bästa vi kan ta:**
- De tio standarderna. → `rorelse/granskning.md`, *Vad som bedöms*.
- Åtgärdsordningen. → `rorelse/granskning.md` och granskarskillens *Den billigaste åtgärden först*, som redan citerar den.
- Felsökningen: 2–5 gånger långsammare, bildruta för bildruta, riktig enhet och nästa dag. → `rorelse/granskning.md`, *Fyndens form*; `SKILL.md`, princip 12.
- Underlag till granskarens premiumgrupp för rörelse (inventeringens kommentar: "Underlag till bedömaren").

**Var det hamnar hos oss:** destillerat i skillen `rorelse` (`granskning.md`), som granskaren pekar på. Skillen installeras inte. Byggare och granskare har skilda skills, och en extern granskningsskill installeras aldrig fristående (`guide/bilaga-b-skills.md`).

**Passar vår stack?** Ja. Standarderna gäller CSS lika väl som Motion. Allvarsgraden *Block* översätts till guidens allvar. Fynd som bara bygger på Emils regler får högst `medel` så länge de har en källa (`guide/bilaga-b-skills.md`).

**Risker och flaggor:**
- "Default to flagging" ger många fynd. Hos oss sållas de mot budgeten och Johnnys beslut.
- Krocken om ease-in vid utgång, som i `emil-animate`.
- Ingen telemetri, ingen betalvägg och ingen inloggning.
