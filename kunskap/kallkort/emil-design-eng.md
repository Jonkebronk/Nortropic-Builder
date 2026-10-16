# emil-design-eng

**Källa:** https://github.com/emilkowalski/skills, sökvägen `skills/emil-design-eng/SKILL.md` (enda filen, 674 rader). Läst 2026-10-16 vid commit `2d228630ba14` (repot, 2026-10-11); senaste ändring i skillen är `85e8e2363b` (2026-09-15, ”Remove course mention”). Det finns inga releaser, inga taggar och ingen ändringslogg; historiken finns bara i commit-loggen.

Lästa filer: `SKILL.md`, repots `README.md`, `LICENSE` och `performance-cheatsheet.md`. Filen `.pl` i roten är tom. Sidan https://emilkowal.ski/skill lästes också; den har bara korta beskrivningar och installationskommandot.

**Licens:** MIT, © 2026 Emil Kowalski (ur `LICENSE`, tillagd 2026-06-21 efter ärende #2). Upphovsrätts- och licenstexten ska följa med vid kopiering; vi skriver med egna ord och anger källan.

Ärende #5 påpekade att licensen först bar fel upphovsman (”Matt Pocock”, kvar från en mall). Dagens `LICENSE` anger Emil Kowalski.

**Vad det är:** Emil Kowalskis huvudskill. Enligt README:n är den ”mostly animation, but also some design advice”. Den ger ett beslutsstöd för om och hur något ska röra sig, och kräver att granskningar skrivs som en tabell med kolumnerna Före, Efter och Varför.

**Hur det fungerar:**
- **Ska det röra sig?**
  - Något som används 100+ gånger om dagen (kortkommandon, kommandopalett) animeras aldrig.
  - Det som används tiotals gånger om dagen (hover, listnavigering) animeras knappt.
  - Modaler och notiser får standardrörelse; sällsynta tillfällen får ”delight”.
  - Det som startas från tangentbordet animeras aldrig.
- **Syfte:** rumslig konsekvens, tillstånd, förklaring, återkoppling eller att undvika ryck. ”Det ser coolt ut” räcker inte för något som syns ofta.
- **Kurvor:**
  - ease-out för in och ut, ease-in-out för förflyttning på skärmen, ease för hover och färg, linear för konstant rörelse.
  - Aldrig ease-in.
  - Egna kurvor: `cubic-bezier(0.23, 1, 0.32, 1)`, `cubic-bezier(0.77, 0, 0.175, 1)`, `cubic-bezier(0.32, 0.72, 0, 1)`.
- **Längder:** tryck 100–160ms; tooltip 125–200; dropdown 150–250; modal och låda 200–500. UI-animationer under 300ms.
- **Komponenter:**
  - tryck `scale(0.97)` på 160ms ease-out (intervall 0,95–0,98)
  - aldrig från `scale(0)`, börja på minst 0,9
  - popover från utlösaren (`transform-origin`), men modal centrerad
  - tooltip utan fördröjning när en annan redan är öppen
  - transitions i stället för keyframes för det som kan avbrytas
  - blur 2px för att dölja en ojämn övertoning
  - `@starting-style` för entréer.
- **Fjädrar:** `{ type: "spring", duration: 0.5, bounce: 0.2 }`; studs 0,1–0,3 och bara vid drag eller lek.
- **Övrigt:**
  - clip-path, gester, prestanda (bara transform och opacity)
  - reduced motion: färre och mjukare rörelser, inte noll
  - hover-rörelse bara i `(hover: hover) and (pointer: fine)`
  - förskjuten entré 30–80ms mellan element
  - granska i slowmotion och nästa dag.
- **Ytinnehåll är nästan obefintligt:** inga värden för färg, typografi, skuggor, kanter eller radier. README:n säger att skillsen rättar ”solid kant i stället för halvgenomskinlig skugga”, men det finns inte i SKILL.md.

**Kvalitet och underhåll:**
- 46 586 stjärnor och 2 677 forkar, skapat 2026-03-16, senaste push 2026-10-11.
- Tre bidragsgivare: emilkowalski 55 bidrag, cr2007 1 och CommanderClaude 1.
- Enligt en kommentar i #32 tar repot bara emot PR från medarbetare. Flera föreslagna rättningar ligger därför ohopslagna (PR #7, #18, #19, #23).
- Kända problem:
  - #26 (stängt 2026-08-18): exemplet `useSpring(mouseX * 0.1, …)` följer aldrig musen, eftersom `useSpring` läser ett vanligt tal bara en gång, som startvärde. PR #7 med rättningen slogs aldrig ihop, och exemplet är **oförändrat** i dagens fil (rad 160–172).
  - #32 (öppet, 2026-10-11): fjädrar med `duration` + `bounce` i Motion räknas som tidsdefinierade och nollställer hastigheten från en gest. Det gäller samma form i den här skillen.
  - #5 (stängt): påståendet att Motions `x`/`y`/`scale` inte är hårdvaruaccelererade är för absolut. Motions egen dokumentation (motion.dev/docs/performance) säger att oberoende transformer accelereras precis som `transform` ⚠️ (läst via sammanfattning). Påståendet står kvar i SKILL.md.
  - #29 (öppet): beskrivningen säger vad skillen är men inte när den ska användas.

**Avstämning mot vår guide:** 2-6, rad 62 säger att Emils regler bara lästs via sammanfattningen i *$10K Website Kit*. Mot originalet stämmer sammanfattningen i stort, med tre nyanser:
- Tryckskalan är 0,97 med intervallet 0,95–0,98.
- Popovers utgår från utlösaren, inte klickpunkten, och modaler är undantagna.
- Studs är inte förbjuden utan ska vara 0,1–0,3 och bara vid drag eller lek. 2-6:s förbud är strängare och står sig.

**Det bästa vi kan ta (till rörelseskillen, inte ytan):**
- Frekvenstabellen och syfteslistan (*The Animation Decision Framework*).
- Kurvorna och längdtabellen (*What easing should it use?*, *How fast should it be?*).
- Tryck, ingen `scale(0)`, popover från utlösaren och tooltip utan fördröjning (*Component Building Principles*).
- Granskningstabellen *Review Checklist* som sökmönster:
  - `transition: all`
  - `scale(0)`
  - `ease-in`
  - längd över 300ms på UI
  - hover utan mediefråga
  - keyframes på element som triggas ofta.

**Var det hamnar hos oss:**
- **Inte i ytskillen.** Det finns inget att destillera till `farg.md`, `typografi.md`, `detaljer.md`, `tokens.md` eller `generiskt.md`.
- Posten står i inventeringen som lager 5 (även 4 och 6) men hör till lager 6. Den bör bli en huvudkälla i rörelseskillen. 2-5, rad 118 listar den bland ytskillens källor; det bör flyttas till 2-6.
- **Kontroll:** sökmönstren passar 2-6 [N2] *Statisk sökning som underlag*, som redan finns.

**Passar vår stack?**
- **Direkt, noll JavaScript:** CSS-recepten (tryckskala, `@starting-style`, clip-path, transitions, `@media (hover: hover) and (pointer: fine)`, reduced motion) fungerar i Astro som de är.
- **Med React och Motion (tillåtet sedan BESLUT 2026-10-16):** `useSpring`, `motion.div` och fjäderrecepten kan tas nästan som de är, i en React-ö med `client:visible`. Kostnad i webbläsaren per sida: Motions fulla komponent 43 kB, `m` + `LazyMotion` drygt 5 kB + 24 kB, eller `useAnimate` mini 3,3 kB (motion.dev, *Reduce bundle size*). Till det kommer React-runtime i ön ⚠️ (inte uppmätt här).
- **Behöver rättas före användning:**
  - `useSpring`-exemplet (#26), till `useMotionValue` + `useTransform` + `useSpring`.
  - Fjädrar som ska ärva hastighet från en gest behöver fysikparametrar, inte `duration` + `bounce` (#32).
  - Base UI-specifikt (`var(--transform-origin)`, `data-starting-style`) gäller bara om vi använder Base UI.
- **Krockar som tas upp med Johnny (BESLUT 2026-10-16), inte stopp:**
  1. Ease-out vid utgång mot NN/g:s ease-in, som 2-6 låter gå före.
  2. Studs 0,1–0,3 mot 2-6:s ”inga studsande kurvor”.
  3. Förskjuten entré från `opacity: 0` mot ”ingen text som börjar osynlig” och LCP.
  4. Hover-exemplet `scale(1.05)` mot budgeten *sparsam*.
  5. En Motion-ö per sida mot Lighthouse 100 och *HTML först*.
  6. Lugn-kitets `--k-tid: 400ms` ligger över källans 300ms för UI, men inom 2-6:s 100–500ms.

**Risker och flaggor:**
- Licens: ingen risk.
- Telemetri gäller bara installation via `npx skills add` (anonym, avstängbart med `DISABLE_TELEMETRY=1`).
- Skillen öppnar med en fast hälsningsfras och kräver tabellformat. Det spelar ingen roll när vi destillerar.
- Ingen betalvägg för skillen. README:n och emilkowal.ski marknadsför ett nyhetsbrev (aiforui.dev/skills) och en betalkurs (aiforui.dev, ”Early access has closed”). Inget av det behövs, och vi loggar inte in.
- Installationskommandot skiljer sig: `npx skills add emilkowalski/skill` på webbsidan, `emilkowalski/skills` i README:n.
- Krock med andra skills:
  - Krehels better-ui (tryck 0,96, studs alltid 0, hover med bara `(hover: hover)`).
  - Emils egen `apple-design` (tryck 0,97 på 100ms).
  - Rörelseskillen väljer ett värde.
