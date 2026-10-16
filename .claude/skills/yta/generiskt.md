# Generiskt och AI-mönster

Delfil till `SKILL.md`. Listorna mot "AI-slop" i externa skills, sammanslagna och lästa som hantverkskriterier. Genomgånget mot originalen i sin helhet 2026-10-16 (andra varvet): impeccable 4.5.2 och 4.6.0 med detektorns 59 regler, Hallmarks 58 grindar och anti-patterns, frontend-design.

## Grunden (→ beslut)

- **AI-utseende i sig är inget fynd.** Johnny godkände 4 av 7 AI-byggda sajter, och Claude dömde fel om fyra sajter just för att de såg AI-gjorda ut (`BESLUT.md` 2026-10-15; → `guide/2-5-yta.md`, *Konsekvens är inte karaktär*).
- **Generiskt betyder det måttstocken säger:** första skärmen säger inte vad, var och hur, och innehållet kunde höra till vem som helst (`mattstock/mattstock.md`, fråga 1 och 2).
- **Kiten varierar ytan, inte konventionen.** Besökare föredrar enkla, välbekanta sidor (→ `guide/2-5-yta.md`, N2).

Därför används listorna nedan så här: ett mönster är ett fynd bara när det har ett hantverksskäl (läsbarhet, hierarki, ärlighet, tillstånd, kontrast) eller strider mot ett beslut. Att mönstret är vanligt hos AI-byggda sajter räcker inte.

## Originalen själva stöder konventionen

- **impeccable 4.6.0 skalar ambitionen efter ytans uppgift.** Landningssidor får full satsning; där besökaren ska läsa eller utföra något syns ambitionen som precision och återhållsamhet, och mönster besökaren redan känner förtjänar sin plats. 📄 impeccable, `SKILL.md` 4.6.0.
- **"Välbekant och effektivt är ett legitimt mål, inte brist på mod."** När kategorins standard väljs blir konventionen åtagandet: två eller tre förebilder sätter hantverksnivån, och kanon utförs fullt ut, utan ironi och utan insmugglade egenheter. Det är vårt sätt att ta fram kit ur Johnnys godkända referenser. 📄 impeccable, `new-work.md`, *standing exit*.
- **Inom en sajt är konsekvens målet.** Hallmarks variationsgrindar (8, 20, 21, 32, 57) gäller mellan byggen; för en sajt med ett låst system vänder Hallmark själv regeln: sidorna ska dela tema, accent och typsnitt, och avvikelse från systemet är slop. 📄 Hallmark, `verbs/redesign.md`, *Multi-page flow*.

## Källorna motsäger varandra

Det stöder beslutet att inte döma på utseende. Exempel:
- Hallmarks egen exempelpalett är havrebeige med orange accent, som impeccable, frontend-design och taste kallar AI-typisk. Hallmark rekommenderar Fraunces som display; impeccable kallar Fraunces en reflex.
- frontend-design kallar tonad nästan-svart ett AI-tecken, medan Hallmark och taste-redesign föreskriver den. Hallmark underkänner ren vit; impeccable godtar neutral grå.
- Hallmark vill ha högst en skugga och aldrig staplade; Vercel, Refactoring UI och Krehel vill ha två lager (→ `detaljer.md`).
- taste-soft kräver små etiketter ovanför rubriker, som de andra förbjuder.
- Hallmark kräver `overflow-x: clip` på `html` och `body`. MDN varnar att klippt innehåll som får fokus då inte rullas fram (*"will not scroll into view, making it inaccessible to keyboard users"*), så vi kräver i stället att ingen sida har vågrät scroll. 📄 MDN, [overflow](https://developer.mozilla.org/en-US/docs/Web/CSS/overflow).

Källor: impeccable (Apache-2.0), [anthropics/skills](https://github.com/anthropics/skills) `frontend-design` (Apache-2.0), [Nutlope/hallmark](https://github.com/Nutlope/hallmark) (MIT), [Leonxlnx/taste-skill](https://github.com/Leonxlnx/taste-skill) (MIT).

## Det som skiljer premium från generiskt, där originalen är eniga

1. **Specificitet.** Kunde en annan verksamhet använda sektionen oförändrad, bara med ett annat namn? Då är innehållet generiskt, inte ytan. Bevisa i stället för att påstå: visa arbetet, platsen och människorna med detaljer en konkurrent inte kan klistra in. 📄 impeccable, `critique.md` och `new-work.md`; Hallmark, axeln *Specificity*; taste, konkurrenttestet.
2. **Ett ställningstagande.** Djärvheten läggs på ett ställe, och allt runt omkring är tyst och disciplinerat. Tyst utan avsikt blir generiskt: grå text på vitt, ett sans i en jämn vikt och ett rutnät av likadana kort. 📄 frontend-design, *Restraint*; impeccable 4.6.0, `quieter.md`; Hallmark, axlarna *Philosophy* och *Restraint*.
3. **Rytm.** Täthet, skala, bild och tystnad varierar inom en grammatik; en tät passage följs av en lugn, och sidan slutar i ett riktigt avslut. Samma avstånd överallt är en mall. Mer luft ovanför en rubrik än under. 📄 impeccable, `new-work.md` och regeln `monotonous-spacing`; Hallmark, grind 9.
4. **Det ingen ritade.** Webbläsarens egna ytor följer kitet: markering, textmarkör i fält, fokusring, understrykningens avstånd och tjocklek, tabulära siffror. "Den billigaste signalen på att en sida byggts och inte satts ihop." 📄 impeccable, `craft-floor.md`; taste; Hallmark.
5. **Ärligt material.** Riktiga bilder och tillgångar i stället för krom: gradienter, glas, generiska ikonbrickor och `clip-path`-polygoner där en tillgång hör hemma är "luckan i krom". Imiterat material – fasningar, prägling, stämplad metall eller krita i CSS – är enligt impeccable det enskilt mest pålitliga tecknet på maskingjord design. 📄 impeccable, `new-work.md` och `degraded/finish-reviewer.md`; Hallmark, grind 47.
6. **Hantverket i tillstånden.** Alla tillstånd finns och har mer kontrast än vilan; inget animeras som inte förklarar något. 📄 Hallmark, `interaction-and-states.md`; impeccable, `polish.md`; → `detaljer.md`.

**Karaktären kommer från kundens egna bilder, ord och lokala belägg**, inte från en ovanlig yta (→ `guide/2-5-yta.md`). **Fråga vilken bransch stilen hade passat.** Är svaret inte kundens bransch brister utförandet (→ `mallar/granskning.md`, G13). Fråga omvänt när ett kit tas fram: *kan stilen gissas ur branschen ensam?* Då har kitet landat i branschens standard (📄 impeccable, `new-work.md`, *Calibration*).

## Mönstren som hantverkskriterier

**Läsning:** *Fynd* = granskningskriterium med hantverksskäl · *Sökbart* = kan hittas i koden eller mätas · *Kitval* = får förbjudas i ett kits `design.md`, inte globalt · *Inget fynd* = krockar med ett beslut.

| Mönster | När det är ett fynd | Läsning | Källor |
|---|---|---|---|
| Många nästan lika storlekar, platt hierarki | Grannsteg under cirka 10 % eller storlekar utanför skalan; rubrikroller under 1,25 × varandra | Sökbart | impeccable (`flat-type-hierarchy`), Hallmark, taste; → `typografi.md` |
| Rubrik som är en hel mening, över tre rader på mobil | Alltid; rubriken ska gå att skumma. Displaystorlek med över cirka 40–50 tecken | Fynd | impeccable (`oversized-h1`), Hallmark, taste |
| Fler än två–tre typsnittsfamiljer | Alltid | Sökbart | frontend-design, Hallmark, taste; `mallar/granskning.md` |
| Spärrning tätare än −0,04 em, versaler utan spärrning | Alltid; detektorn larmar under −0,07 em (display −0,09) | Sökbart | impeccable, Hallmark; Butterick |
| Versalrubriker med radhöjd under 1,0 | Alltid | Sökbart | Hallmark, grind 55; → `typografi.md` |
| Gradienttext, lila-blå gradienter, glöd och halo utan förskjutning, radiell "spotlight" | Text som inte går att läsa eller mäta; dekor som drar blicken från handlingen | Sökbart, Kitval | impeccable, Hallmark, taste |
| Accent på stora ytor eller flera accentfärger | Alltid (G3) | Fynd | Hallmark, taste, impeccable; `BESLUT.md` G3 |
| Grå text på färgad yta | När kontrasten faller eller texten ser smutsig ut; sekundärtext tas ur ytans nyans | Sökbart | impeccable, taste |
| Glas och oskärpa som dekor | När texten över den inte kan mätas mot det som scrollar under | Fynd | impeccable, Hallmark, taste |
| Samma radie och samma grå skugga på allt | När radien inte följer hierarkin eller skuggan är ett lager ren svart | Fynd | frontend-design, taste-redesign; → `detaljer.md` |
| Hårlinje och bred skugga på samma föremål | Höjden anges en gång; detektorn larmar för minst tre kort i rad med hårlinje och skugga med oskärpa från 32 px | Fynd | impeccable (`gpt-thin-border-wide-shadow`), Hallmark |
| Kort i kort, tjock färgad sidokant på kort | Alltid; citatlinjen i textfärg är något annat | Fynd | impeccable, Hallmark |
| Sidan som en följd av kortnät | När varje sektion är ett rutnät av lika kort och kortet bara är en behållare; närhet, rubriker och avdelare räcker ofta | Fynd när villkoret gäller | impeccable (*cards are the lazy container*), frontend-design kluster 4 |
| Emoji eller tecken som ikoner, blandade ikonfamiljer eller streck | Alltid | Sökbart | impeccable, Hallmark, taste-redesign |
| Stämningsikoner (raket, sköld, gnistor, puls) | Alltid (G2) | Fynd | taste-redesign; `BESLUT.md` G2 |
| Ikon i cirkel eller bricka ovanför rubrik | Bara om brickan är i accent (G3), knappt syns så att ikonen ser indragen ut, eller ikonen inte föreställer tjänsten | Fynd när villkoret gäller | impeccable (`icon-tile-stack`), Hallmark, taste; G3 |
| Tre likadana kort i rad | Bara när innehållet kunde vara vems som helst | Fynd när villkoret gäller | impeccable, Hallmark, taste |
| Stor siffra med liten etikett som förstavy | När siffran är påhittad eller saknar ord som säger vad den betyder | Fynd | impeccable (*hero-metric*), Hallmark, grind 46 |
| Stegsiffror 01/02/03 utan verklig ordning | När det inte finns en ordning | Fynd | frontend-design, impeccable |
| Stockfoton av team, AI-bilder i Midjourney-stil, ritade webbläsar- eller mobilramar | När de visas som kundens egna eller döljer att material saknas | Fynd | Hallmark, taste-redesign; ärlighetsregeln i `guide/2-7-innehall.md` |
| Imiterat material: fasning, prägling, metall, krita, papper i CSS | Alltid när materialet inte finns i en riktig bild | Fynd | impeccable, `finish-reviewer` |
| Geometrisk mask (cirkel, polygon, radiell gradient) som ersätter ett motivs kontur | När ett foto "friläggs" med en form i stället för en riktig alfamask; en formad bildyta bakom ett frilagt motiv är något annat | Fynd | impeccable, `craft-floor.md` och regeln `organic-clip-path` |
| Randiga gradienter, rutnätsbakgrund, korn och brus | Rutnät bara där ytan är en karta eller ritning | Kitval | impeccable (`repeating-stripes-gradient`, `codex-grid-background`); taste-soft och Hallmark för korn |
| Pulserande prick, blinkande markör, löpande band | När inget faktiskt är levande; ett band som aldrig stannar kräver också en paus (WCAG 2.2.2) | Fynd | impeccable (`pulsing-dot`, `blinking-cursor`, `marquee`); Hallmark |
| Blandad bildbehandling, färgtvätt, duoton | När sidan har mer än en behandling | Fynd | taste, Hallmark; → `detaljer.md` |
| Fade-up på varje sektion, studsande kurvor, `transition: all`, webbläsarens `ease` | Alltid i sparsam rörelse; en studs i måttlig avgörs av Johnny (Djärv) | Sökbart | frontend-design, impeccable, Hallmark; → `guide/2-6-rorelse.md` |
| Samma avstånd mellan alla sektioner och inne i korten | När rytmen blir platt och inget skiljer grupp från sektion | Fynd | impeccable (`monotonous-spacing`), Hallmark, grind 9 |
| Bara vila och hover, inga tryck-, fokus- eller feltillstånd | Alltid | Sökbart | Hallmark, impeccable, taste-redesign; → `detaljer.md` |
| Påhittade siffror, omdömen, logotyper, platshållarnamn | Alltid | Sökbart | Hallmark, taste, impeccable; `guide/2-7-innehall.md` |
| Text mot skärmkanten, horisontell rullning, knapptext på två rader | Alltid; brödtext minst 16 px från kanten (12 px upp till 480 px bredd) | Sökbart | impeccable (`body-text-viewport-edge`), Hallmark (grind 34, 49) |
| Kursiv rubrik eller ett framhävt ord i rubriken | Aldrig i sig; Varms handskrivna accent bygger på en godkänd referens | Kitval | Hallmark (grind 38a), frontend-design, impeccable (`italic-serif-display`) |
| Gräddvit med terrakotta, beige med serif, mörk med neonaccent | Aldrig i sig; kiten Lugn och Varm bygger på godkända referenser (detektorns `cream-palette` träffar båda) | Inget fynd | frontend-design, impeccable, taste |
| Inter, Fraunces, IBM Plex, Instrument Sans eller Lucide som "AI-standard" | Aldrig; kitet väljer | Inget fynd | impeccable, Hallmark, taste; `BESLUT.md` 2026-10-15 |
| Överrad ovanför rubriken | Bara om den står i accent eller på varje sektion utan att säga något; aldrig i en egen kolumn bredvid rubriken | Kitval | frontend-design, impeccable (förbud), Hallmark (grind 54); G3 |
| Centrerad förstavy med två knappar, delad förstavy, standardordning, vanlig meny och sidfot | Aldrig i sig; frågan är om första skärmen säger vad, var och hur | Inget fynd | Hallmark (grind 6, 8, 42, 43), impeccable (`mode-persuade.md`), taste |
| Pil efter länktext, mittpunkt mellan uppgifter | Aldrig i sig; biblioteket har ett utförande för uppmaningar | Inget fynd | frontend-design; kvalitetsgranskningen 2026-10-16 (D20) |

## Det som skiljer premium från basic i detaljerna

- Webbläsarens egna ytor följer kitet: markering, textmarkör (`caret-color`) i fält, fokusring, understrykningens avstånd och tjocklek, tabulära siffror i tider och priser. 📄 impeccable, taste, Hallmark.
- Mer luft ovanför en rubrik än under den, och radbrytningar där inget ord blir ensamt. 📄 taste, impeccable; → `typografi.md`.
- Höjden anges en gång, med kant eller skugga; radien följer hierarkin; inre radie är yttre minus avståndet. 📄 impeccable, Hallmark, Krehel.
- Fält och knappar lika höga, kanten konstant i alla tillstånd, fokus som kontur med en genomskinlig kontur i vila, plats reserverad för hjälp- och feltext (`min-height: 1lh`), inaktivt med tre signaler. 📄 Hallmark, grind 39; formulären → `guide/2-8-teknik-och-kvalitet.md`.
- En bildbehandling och samma beskärningsformat på hela sidan; aldrig uppförstorat. 📄 taste; G1.
- Ljus text på mörk yta får något mer radavstånd och spärrning. Vikten justeras ett steg, men källorna är oense om riktningen (impeccable: tyngre vid behov; taste: lättare; Hallmark: 50 enheter lättare i mörkt läge), så det avgörs på kitets provsida. 📄 impeccable, `typeset.md`; taste, `references/type.md`; Hallmark, `color.md`.
- Reservtypsnitt med anpassade mått, så att laddningen inte flyttar texten. 📄 Hallmark, impeccable; → `typografi.md`.
- Varje dekor har ett ankare i innehållet: en etikett som säger ett pris, en siffra som är ett år. Dekor utan ankare är slop. 📄 Hallmark, grind 45.

## Så granskas ytan med originalens metod

Originalen kördes mot övningssajten 2026-10-16. Det här tar vi från dem; dömandet sker i måttstockens form (→ `guide/3-2-granskning-och-kalibrering.md`).

- **Designomdömet görs innan mätvärdena läses**, så att siffrorna inte styr blicken. impeccable kräver två isolerade bedömningar (design och detektor) i var sin delagent; görs båda i samma kontext står det överst i granskningen. 📄 impeccable, `critique.md`.
- **Ett detektor- eller mätfynd är bevis på ett fel, inte på kvalitet.** En ren mätning ersätter aldrig omdömet. 📄 impeccable, `polish.md`.
- **Allvar i tre nivåer för ytfynd:** skeppas som slop (hög), ser genererat ut (medel), smakfråga (låg); ett fynd mot ett kriterium med en källa får högst medel (→ `SKILL.md`, *Ut*). 📄 Hallmark, `verbs/audit.md`; impeccable P0–P3.
- **Detektorn och live-injektionen körs inte** (nedladdad binär, telemetri, skript i sidan). Reglerna med trösklar mäts i stället med Playwright på den renderade sidan, med trösklarna i tabellen ovan.
