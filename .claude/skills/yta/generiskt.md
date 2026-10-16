# Generiskt och AI-mönster

Delfil till `SKILL.md`. Listorna mot "AI-slop" i externa skills, sammanslagna och lästa som hantverkskriterier.

## Grunden (→ beslut)

- **AI-utseende i sig är inget fynd.** Johnny godkände 4 av 7 AI-byggda sajter, och Claude dömde fel om fyra sajter just för att de såg AI-gjorda ut (`BESLUT.md` 2026-10-15; → `guide/2-5-yta.md`, *Konsekvens är inte karaktär*).
- **Generiskt betyder det måttstocken säger:** första skärmen säger inte vad, var och hur, och innehållet kunde höra till vem som helst (`mattstock/mattstock.md`, fråga 1 och 2).
- **Kiten varierar ytan, inte konventionen.** Besökare föredrar enkla, välbekanta sidor (→ `guide/2-5-yta.md`, N2).

Därför används listorna nedan så här: ett mönster är ett fynd bara när det har ett hantverksskäl (läsbarhet, hierarki, ärlighet, tillstånd, kontrast) eller strider mot ett beslut. Att mönstret är vanligt hos AI-byggda sajter räcker inte.

## Källorna motsäger varandra

Det stöder beslutet att inte döma på utseende. Exempel: Hallmarks egen exempelpalett är havrebeige med orange accent, som impeccable, frontend-design och taste kallar AI-typisk; frontend-design kallar tonad nästan-svart ett AI-tecken, medan Hallmark och taste-redesign föreskriver den; taste-soft kräver små etiketter ovanför rubriker, som de andra förbjuder. Källor: impeccable (Apache-2.0), [anthropics/skills](https://github.com/anthropics/skills) `frontend-design` (Apache-2.0), [Nutlope/hallmark](https://github.com/Nutlope/hallmark) (MIT), [Leonxlnx/taste-skill](https://github.com/Leonxlnx/taste-skill) (MIT).

## Testet som fungerar: kunde det höra till någon annan?

- **Specificitetsfrågan:** kunde en annan verksamhet använda sektionen oförändrad, bara med ett annat namn? Då är det innehållet som är generiskt, inte ytan. 📄 impeccable, `critique` (*could an unrelated product use it unchanged*); taste, konkurrenttestet; Hallmark, axeln *Specificity*.
- **Karaktären kommer från kundens egna bilder, ord och lokala belägg**, inte från en ovanlig yta (→ `guide/2-5-yta.md`).
- **Fråga vilken bransch stilen hade passat.** Är svaret inte kundens bransch brister utförandet (→ `mallar/granskning.md`, G13).

## Mönstren som hantverkskriterier

**Läsning:** *Fynd* = granskningskriterium med hantverksskäl · *Sökbart* = kan hittas i koden eller mätas · *Kitval* = får förbjudas i ett kits `design.md`, inte globalt · *Inget fynd* = krockar med ett beslut.

| Mönster | När det är ett fynd | Läsning | Källor |
|---|---|---|---|
| Många nästan lika storlekar, platt hierarki | Grannsteg under cirka 10 % eller storlekar utanför skalan | Sökbart | impeccable, Hallmark, taste; → `typografi.md` |
| Rubrik som är en hel mening, över tre rader på mobil | Alltid; rubriken ska gå att skumma | Fynd | impeccable, Hallmark, taste |
| Fler än två–tre typsnittsfamiljer | Alltid | Sökbart | frontend-design, Hallmark, taste; `mallar/granskning.md` |
| Spärrning tätare än −0,04 em, versaler utan spärrning | Alltid | Sökbart | impeccable, Hallmark; Butterick |
| Gradienttext, lila-blå gradienter, glöd och halo utan förskjutning | Text som inte går att läsa eller mäta; dekor som drar blicken från handlingen | Sökbart, Kitval | impeccable, Hallmark, taste |
| Accent på stora ytor eller flera accentfärger | Alltid (G3) | Fynd | Hallmark, taste, impeccable; `BESLUT.md` G3 |
| Grå text på färgad yta | När kontrasten faller eller texten ser smutsig ut; sekundärtext tas ur ytans nyans | Sökbart | impeccable, taste |
| Glas och oskärpa som dekor | När texten över den inte kan mätas mot det som scrollar under | Fynd | impeccable, Hallmark, taste |
| Samma radie och samma grå skugga på allt | När radien inte följer hierarkin eller skuggan är ett lager ren svart | Fynd | frontend-design, taste-redesign; → `detaljer.md` |
| Kort i kort, tjock färgad sidokant på kort | Alltid; citatlinjen i textfärg är något annat | Fynd | impeccable, Hallmark |
| Kant och bred skugga på samma föremål | Höjden anges en gång | Fynd | impeccable, Hallmark |
| Emoji eller tecken som ikoner, blandade ikonfamiljer eller streck | Alltid | Sökbart | impeccable, Hallmark, taste-redesign |
| Stämningsikoner (raket, sköld, gnistor, puls) | Alltid (G2) | Fynd | taste-redesign; `BESLUT.md` G2 |
| Ikon i cirkel ovanför rubrik | Bara om cirkeln är i accent (G3), knappt syns så att ikonen ser indragen ut, eller ikonen inte föreställer tjänsten | Fynd när villkoret gäller | impeccable, Hallmark, taste; G3 |
| Tre likadana kort i rad | Bara när innehållet kunde vara vems som helst | Fynd när villkoret gäller | impeccable, Hallmark, taste |
| Stegsiffror 01/02/03 utan verklig ordning | När det inte finns en ordning | Fynd | frontend-design, impeccable |
| Stockfoton av team, AI-bilder i Midjourney-stil, ritade webbläsar- eller mobilramar | När de visas som kundens egna eller döljer att material saknas | Fynd | Hallmark, taste-redesign; ärlighetsregeln i `guide/2-7-innehall.md` |
| Blandad bildbehandling, färgtvätt, duoton | När sidan har mer än en behandling | Fynd | taste, Hallmark; → `detaljer.md` |
| Fade-up på varje sektion, studsande kurvor, `transition: all` | Alltid (sparsam rörelse) | Sökbart | frontend-design, impeccable, Hallmark; → `guide/2-6-rorelse.md` |
| Bara vila och hover, inga tryck-, fokus- eller feltillstånd | Alltid | Sökbart | Hallmark, impeccable, taste-redesign; → `detaljer.md` |
| Påhittade siffror, omdömen, logotyper, platshållarnamn | Alltid | Sökbart | Hallmark, taste, impeccable; `guide/2-7-innehall.md` |
| Text mot skärmkanten, horisontell rullning, knapptext på två rader | Alltid | Sökbart | impeccable, Hallmark |
| Gräddvit med terrakotta, beige med serif, mörk med neonaccent | Aldrig i sig; kiten Lugn och Varm bygger på godkända referenser | Inget fynd | frontend-design, impeccable, taste |
| Inter, Fraunces, IBM Plex, Instrument Sans eller Lucide som "AI-standard" | Aldrig; kitet väljer | Inget fynd | impeccable, Hallmark, taste; `BESLUT.md` 2026-10-15 |
| Överrad ovanför rubriken | Bara om den står i accent eller på varje sektion utan att säga något | Kitval | frontend-design, impeccable, Hallmark; G3 |
| Centrerad förstavy med två knappar, standardordning, vanlig meny och sidfot | Aldrig i sig; frågan är om första skärmen säger vad, var och hur | Inget fynd | Hallmark, taste |
| Pil efter länktext, mittpunkt mellan uppgifter | Aldrig i sig; biblioteket har ett utförande för uppmaningar | Inget fynd | frontend-design; kvalitetsgranskningen 2026-10-16 (D20) |
| Korn och brus | Kitval | Kitval | taste, impeccable mot; taste-soft, Hallmark för |

## Det som skiljer premium från basic enligt flera källor samtidigt

- Webbläsarens egna ytor följer kitet: markering, fokusring, understrykningens avstånd och tjocklek, tabulära siffror i tider och priser. 📄 impeccable, taste, Hallmark.
- Mer luft ovanför en rubrik än under den, och radbrytningar där inget ord blir ensamt. 📄 taste, impeccable; → `typografi.md`.
- Höjden anges en gång, med kant eller skugga; radien följer hierarkin; inre radie är yttre minus avståndet. 📄 impeccable, Hallmark, Krehel.
- Fält och knappar lika höga, kanten konstant i alla tillstånd, plats reserverad för feltext. 📄 Hallmark.
- En bildbehandling och samma beskärningsformat på hela sidan; aldrig uppförstorat. 📄 taste; G1.
- Ljus text på mörk yta får något mer radavstånd och spärrning. Vikten justeras ett steg, men källorna är oense om riktningen (impeccable: tyngre vid behov; taste: lättare), så det avgörs på kitets provsida. 📄 impeccable, `typeset.md`; taste, `references/type.md`.
- Reservtypsnitt med anpassade mått, så att laddningen inte flyttar texten. 📄 Hallmark, impeccable; → `typografi.md`.
