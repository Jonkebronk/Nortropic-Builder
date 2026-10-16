# emil-animate

**Källa:** https://github.com/emilkowalski/skills, `skills/animate/SKILL.md` (207 rader) och `skills/animate/RECIPES.md` (324 rader). Läst 2026-10-16 vid repots commit `2d228630ba14` (2026-10-11). Senaste ändring i skillen är `85e8e2363b` (2026-09-15, "Remove course mention"); skillen skapades 2026-08-05 och har fyra commits. Inga releaser, taggar eller ändringslogg. Lästa också: repots `README.md`, `LICENSE`, `performance-cheatsheet.md`, artiklarna [You don't need animations](https://emilkowal.ski/ui/you-dont-need-animations) och [7 practical animation tips](https://emilkowal.ski/ui/7-practical-animation-tips) (odaterade), och ärendena #26, #28, #29 och #32.

**Licens:** MIT, © 2026 Emil Kowalski. Upphovsrätts- och licenstexten ska följa med vid kopiering. Vi skriver med egna ord och anger källan, så inget behöver följa med.

**Vad det är:** en byggskill som gör en begäran om rörelse till en färdig implementation. Den fattar besluten i en fast ordning: ska det röra sig alls, vilket syfte, vilket verktyg, vilka egenskaper, vilken kurva och längd, hur det avbryts och hur det går ut. Skillen ger hellre noll rader kod än en onödig animation.

**Hur det fungerar:**
- **Sju steg:**
  1. Frekvensgrinden: 100+ gånger om dagen ingen animation; tiotals gånger nästan omärklig; ibland standard; sällan "delight". Tangentbordsstyrt animeras aldrig.
  2. Syftet namnges: återkoppling, rumslig konsekvens, tillstånd, att undvika ryck, förklaring eller glädje (bara för sällsynta tillfällen).
  3. Billigaste verktyget: CSS-transition → `@starting-style` → CSS-animation → WAAPI → Motion.
  4. Egenskaper: bara transform och opacitet (plus `clip-path`), aldrig `scale(0)`, `transform-origin` vid utlösaren utom för modaler, procent i `translate`.
  5. Kurvor: ease-out in och ut, ease-in-out för förflyttning, `ease` för hover, `linear` för konstant. Aldrig ease-in. Tre egna kurvor: `cubic-bezier(0.23, 1, 0.32, 1)`, `(0.77, 0, 0.175, 1)` och `(0.32, 0.72, 0, 1)`. Längder: tryck 100–160 ms, tooltip 125–200, dropdown 150–250, modal och låda 200–500. Gränssnitt under 300 ms. Fjäder `{ type: "spring", duration: 0.5, bounce: 0.2 }`, studs 0,1–0,3.
  6. Avbrott: transitions före keyframes, utgång samma väg som entrén, asymmetrisk tajmning.
  7. Reducerad rörelse och hover-spärr levereras med animationen. Reducerad rörelse betyder mjukare, inte noll.
- **Hårda regler:** inga uppskattade värden, utöka kodbasens tokens i stället för att skapa parallella, billigaste verktyget.
- **RECIPES.md:** färdiga mönster för knapptryck, dropdown, tooltip, modal, låda, toast, dragspel, förskjuten grupp, håll för att bekräfta, flikindikator, avslöjande vid scroll, dra för att stänga, oskärpa som döljer en korstoning och WAAPI.
- **Utdata:** koden och sedan några rader: grindens utfall, ingredienserna och vad som måste känslokontrolleras (2–5 gånger långsammare, bildruta för bildruta, riktig enhet, nästa dag).

**Kvalitet och underhåll:**
- Repot har 46 586 stjärnor och 2 677 forkar, skapat 2026-03-16, senaste push 2026-10-11. Tre bidragsgivare: emilkowalski 55, cr2007 1 och CommanderClaude 1. Fyra öppna ärenden.
- Kända problem:
  - #28 (stängt 2026-09-03): när skillen inte utlöses skriver modellen animationen ändå, med påhittade kurvor och längder, och rapporterar att den lyckats. Mätt med 200 försök. Det talar för att vår rörelseskill behöver en beskrivning med vardagliga svenska ord.
  - #29 (öppet): `animate` säger åt modellen att anropa `pick-ui-library` och `review-animations`, som har `disable-model-invocation: true` och bara kan startas av användaren.
  - #32 (öppet): fjädrar med `duration` och `bounce` i Motion är tidsdefinierade och tappar farten från en gest. Det gäller samma fjäderform här.
  - Påståendet att Motions `x`/`y`/`scale` inte hårdvaruaccelereras säger emot Motions egen skill efter Motion-PR #5 (2026-10-15): *"independent transforms are hardware accelerated"*.

**Det bästa vi kan ta:**
- Ordningen i sju steg som ett beslutsstöd, *The Build Sequence*. → `rorelse/SKILL.md`, principerna 1, 2 och 10, och `granskning.md`, *Grinden*.
- Längdtabellen och kurvorna, steg 5. → `rorelse/matt.md`.
- Knapptryck, modal med bakgrund och dragspel ur `RECIPES.md`. → `rorelse/tillstand.md`.
- Tabellen *Never Ship*. → `rorelse/SKILL.md`, *Förbud*.

**Var det hamnar hos oss:** destillerat i skillen `rorelse` (`SKILL.md`, `matt.md`, `tillstand.md`, `verktyg.md`). Skillen installeras inte, eftersom inga tredjepartsskills används i kundbygget (`guide/bilaga-a-verktyg.md`).

**Passar vår stack?** Ja. Recepten är CSS och fungerar direkt i Astro och våra komponenter. Kurvorna och längderna måste översättas till kitets tokens (`--k-tid-snabb`, `--k-kurva-in`). Motion-delarna gäller React-öar, som nu är tillåtna (`BESLUT.md` 2026-10-16); de kostar cirka 78 kB för React plus Motion. Sparsam rörelse behöver dem inte. Recepten med `data-starting-style` förutsätter Base UI; vi använder `@starting-style` direkt.

**Risker och flaggor:**
- **Krock med NN/g:** "aldrig ease-in" mot NN/g:s och Materials accelererande utgång. Guiden låter NN/g gå före (`guide/2-6-rorelse.md`).
- **Studs:** skillen tillåter studs 0,1–0,3 vid lek, men guidens instruktion är strängare.
- Skillen förutsätter appar som används dagligen. På en företagssajt ses det mesta några gånger per besök, så frekvensgrinden måste läsas om (→ `granskning.md`).
- Ingen telemetri, ingen betalvägg och ingen inloggning. Kursnämnandet togs bort 2026-09-15.
