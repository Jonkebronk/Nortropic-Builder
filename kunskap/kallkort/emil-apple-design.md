# emil-apple-design

**Källa:** https://github.com/emilkowalski/skills, sökvägen `skills/apple-design/SKILL.md` (enda filen, 290 rader). Skillen heter `apple-design` i repot; commiten ”Rename skill back to apple-design” är från 2026-07-09. Läst 2026-10-16 vid commit `2d228630ba14` (repot, 2026-10-11); senaste ändring i skillen är `85e8e2363b` (2026-09-15). Det finns inga releaser och ingen ändringslogg.

Lästa filer: `SKILL.md`, repots `README.md` och `LICENSE`.

Skillen bygger på tre Apple-föredrag:
- *Designing Fluid Interfaces* (WWDC 2018)
- *The Details of UI Typography* (WWDC 2020)
- *Principles of great design* (WWDC26, session 250, Linda Dong och Doug LeMoine; developer.apple.com/videos/play/wwdc2026/250). Att föredraget finns, med samma åtta kapitel som skillen, är bekräftat via Apples sida och wwdcnotes.com.

⚠️ Själva föredragen har jag inte sett eller läst i utskrift. Skillens återgivning är alltså andrahand.

**Licens:** MIT, © 2026 Emil Kowalski (ur `LICENSE`). Upphovsrätts- och licenstexten ska följa med vid kopiering; vi skriver med egna ord och anger källan.

**Vad det är:** Apples sätt att formge och få gränssnitt att röra sig, översatt till webben med CSS, Pointer Events och fjäderbibliotek. Tyngdpunkten ligger på gester: att följa fingret, avbryta, ärva hastighet och kasta med momentum.

**Hur det fungerar:**
- **Gester och rörelse (§1–11):**
  - återkoppling vid tryck ned, inte vid släpp
  - drag följer pekaren 1:1 och respekterar greppunkten
  - allt går att avbryta, och ny rörelse startar från det värde som syns
  - fjädrar i stället för fasta längder: damping 1,0 som standard och 0,8 bara efter en gest med momentum
  - tabell: flytt 1,0/0,4 s, rotation 0,8/0,4, låda 0,8/0,3
  - hastigheten vid släpp lämnas över till fjädern
  - projektion med `(v/1000)·d/(1−d)`, d ≈ 0,998
  - gummiband vid kanter med konstant 0,55
  - in och ut längs samma väg, ursprung i utlösaren.
- **Material (§12):**
  - Genomskinliga lister: `backdrop-filter: blur(20px) saturate(180%)` på `rgba(255,255,255,0.6)`, med ljus överkant `rgba(255,255,255,0.4)`.
  - Lägg aldrig en ljus genomskinlig yta på en annan.
  - Större yta får mer oskärpa och djupare skugga.
  - Text på genomskinlig yta behöver högre kontrast och lite tyngre vikt.
  - Toning vid scrollkanten i stället för 1px-linje.
- **Ljud och haptik (§13):** samma bildruta, tydlig orsak, bara när det tillför något.
- **Tillgänglighet (§14):**
  - `prefers-reduced-motion` ger övertoning i stället för glid
  - `prefers-reduced-transparency` ger solid bakgrund
  - `prefers-contrast: more` ger solid bakgrund och tydlig kant
  - undvik svängningar kring 0,2 Hz och plötsliga ljushetshopp.
- **Typografi (§15):**
  - spärrningen följer storleken: stor text negativ (exempel −0,02em, radhöjd 1,05), liten text lätt positiv, brödtext nära 0
  - radhöjd omvänt mot storlek
  - hierarki ur vikt, storlek och radhöjd tillsammans
  - avstånd i rem/em
  - systemtypsnitt som standard.
- **Grundprinciper (§16):** Apples åtta principer (Purpose, Agency, Responsibility, Familiarity, Flexibility, Simplicity, Craft, Delight) och fyra taktiska regler: fyra sorters återkoppling, vägvisning (var är jag, vart kan jag gå, hur kommer jag ut), gruppering, och specifika etiketter i stället för allmänna som ”Hem”.

**Kvalitet och underhåll:**
- Samma repo som emil-design-eng: 46 586 stjärnor, tre bidragsgivare. PR tas bara emot från medarbetare.
- Kända problem:
  - #32 (öppet, 2026-10-11), punkt 1: fjädrarna med `duration` + `bounce` i Motion nollställer hastigheten från gesten, så överlämningen i §4–5 sker aldrig. Ärendet visar en omräkning till `stiffness`/`damping` som fungerar.
  - #32, punkt 2: §14:s `transform: none !important` under reduced motion lägger stängda lådor synligt på skärmen, eftersom `!important` vinner över inline-stilar och Web Animations.
  - #32, punkt 3: tabellen ”Concrete values Apple ships” stämmer exakt med en reimplementation från communityt (nathangitter/fluid-interfaces), inte med något Apple uttryckligen publicerat. Påståendet att Vaul använder projektion stämmer inte enligt ärendet.
  - PR #23 (ej hopslagen): Vibration API saknar stöd på vissa plattformar, och §13 nämner det inte.
- ✔ `prefers-reduced-transparency` stöds bara i Chrome och Edge från version 119, inte i Safari, iOS Safari eller Firefox (caniuse.com, läst 2026-10-16). Reservläget för genomskinliga ytor måste därför vara standardstilen, inte något som slås på av frågan.
- ⚠️ Gummibandskonstanten 0,55 har ingen Apple-källa i skillen.

**Det bästa vi kan ta:**
- Inget till ytskillen som inte redan täcks bättre: typografin (§15) täcks av better-typography, och systemtypsnitt som standard krockar med att kitet väljer.
- Om ett kit väljer genomskinligt sidhuvud kan tre materialregler (§12, §14) lyftas in i `detaljer.md`:
  1. aldrig ljus genomskinlig yta på en annan
  2. genomskinligt bara med en opak reserv som standard, eftersom Safari saknar `prefers-reduced-transparency`
  3. kontrasten mäts mot ljusaste och mörkaste innehållet bakom (better-colors `contrast.md`).
- För rörelseskillen, när dragbara ytor kommer: överlämning av hastighet, projektion och gummiband (§5, §6, §9), med rättningarna ur #32.

**Var det hamnar hos oss:**
- **Inte i ytskillen nu.**
- Gestdelen hör till rörelseskillen men behövs först när en sajt får dragbara lådor, mobilmenyer att svepa eller karuseller. Standardprodukten (2-6) har sparsam rörelse och inga automatiska karuseller.
- Grundprinciperna (§16) hör till lager 3 och 7, om någonstans.

**Passar vår stack?**
- **Med React och Motion (tillåtet sedan BESLUT 2026-10-16):** fjäder- och gestrecepten kan tas som de är i en React-ö (`client:visible`), efter rättningen i #32. Kostnad per sida:
  - Motion 43 kB (hela komponenten), eller `useAnimate` mini 3,3 kB (motion.dev, *Reduce bundle size*)
  - React-runtime i ön ⚠️ (inte uppmätt här).
  - Pointer Events går också utan bibliotek, i ett litet eget skript.
- **Noll JavaScript:** materialreglerna är ren CSS. `backdrop-filter` kostar renderingstid på svaga mobiler ⚠️ (inte uppmätt).
- **Krockar som tas upp med Johnny (BESLUT 2026-10-16), inte stopp:**
  1. Gester och fjädrar kräver JavaScript i webbläsaren, vilket krockar med *HTML först* och drar ned Lighthouse-marginalen.
  2. Fjädrar med studs (damping 0,8) mot 2-6:s ”inga studsande kurvor”.
  3. Systemtypsnitt som standard mot kitets Fontsource-typsnitt.
  4. ”Skriv inte ’Hem’” mot principen att kiten varierar ytan men inte konventionen (2-5 [N2]).
  5. Genomskinliga lister som standard: inget beslut hos oss; kitet får förbjuda glassmorfism (2-5 [N2]).

**Risker och flaggor:**
- Licens: ingen risk.
- Telemetri bara vid installation via `npx skills add` (avstängbart med `DISABLE_TELEMETRY=1`).
- Ingen betalvägg för skillen (nyhetsbrev och kurs marknadsförs i README:n och på emilkowal.ski, men behövs inte). Ingen inloggning.
- Källkvalitet: värdena presenteras som Apples men kommer enligt #32 från en reimplementation från communityt. Två recept är trasiga: fjädrar som tappar hastigheten, och `!important` som visar stängda lådor.
- Krock med andra skills:
  - Krehels better-ui (studs alltid 0, tryck 0,96).
  - Emils egen `emil-design-eng` (tryck 0,97 på 160ms mot 100ms här).
  - better-typography (brödtextens spärrning 0, inget systemtypsnitt som standard).
