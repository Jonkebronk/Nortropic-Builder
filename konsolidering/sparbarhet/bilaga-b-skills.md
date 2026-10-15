# Spårbarhet: `guide/bilaga-b-skills.md`

Var de delar av v0.74 som rör egna skills tog vägen. Radnummer avser `historik/IMPLEMENTERINGSGUIDE-v0.74.md`. Tredjepartsraderna i §12 spåras i `bilaga-a-verktyg.md`.

| v0.74 (rader) | Var det hamnade | Struket och varför | Flyttat till annan fil |
|---|---|---|---|
| §12 Skillify-metoden, fem steg (1787–1793) | *Så skapas en skill*: utkast och körning för hand [N1]; skill efter tre körningar [N2], i linje med `5-byggplan.md` och `3-4` | Steg 4 "prövas med eval / Caliper" breddat till skill-creator, `claude plugin eval` eller Caliper | Provet och regeln om verklig körning → `3-4`; steg 5, versionerat plugin → `3-4` |
| §12 "agenten föreslår, du beslutar, sedan låses det" (1793) | Steg 3, Johnny granskar | – | Principen → `guide/README.md` (princip 9) |
| §12 Förbud är erfarenhet (1795) | *Så skrivs en skill*: hänvisning | – | Regeln → `3-4` ("Förbud behålls, arbetsgången prövas"); fallgroparna som förbud → `bilaga-d-fallgropar.md` |
| §12 Vad, men inte hur (1797) | *Så skrivs en skill*: hänvisning och vad det betyder för N1-utkasten | – | Regeln, rensning vid ny modell och provet i säkert läge → `3-4` |
| §12 Så skrivs beskrivningen (1799) | *Så skrivs en skill*: ett jobb per skill, beskrivningen säger vad och när | Märkt *en källa – bänken* | Test av att rätt skill utlöses → `3-4` |
| §12 Förbehåll om läckt källkod (1801) | *Så skapas en skill*: inget läckt material | – | – |
| §12 Princip 1: byggar- och granskarskills hålls isär (1821) | *Så skrivs en skill*: byggare och granskare har skilda skills | – | Granskarisoleringen → `3-1` |
| §12 Princip 3: stilen från briefen och riktningen; aldrig flera stilskills (1823) | *Så skrivs en skill*: hänvisning | Ändrat efter beslutet 2026-10-15: stilen kommer från stilkitet | Regeln → `2-5` ("Stilen kommer ur kitet, inte ur skills") |
| §12 tabellrad `brief-interview` (1829) | `intervju` [N1] | – | – |
| §12 `stitch-review` (1830) | – | Struken (M11). Stitch används inte per sajt (beslut 2026-10-15); ersatt av `granska` | – |
| §12 `story-review` (1831) | Delfil i `granska` för scrollytelling-tillvalet [N4] | Som egen skill struken (M11); scrollytelling är tillval (beslut 2026-10-15) | – |
| §12 `write-checks` (1832) | `kvalitet` [N2] | I N1 ersatt av ett fast kontrollskript | Kontrollerna → `bilaga-c-kontroller.md` |
| §12 `auto-loop` (1833) | `lardomar` [N4] | – | Auto loopen → `3-4` |
| §12 `checkpoint-planner` (1834) | Tabellen *Vart v0.74:s planerade skills tog vägen* | Ingen egen skill: orkestreraren planerar checkpoints | → `3-1` |
| §12 `planvy` (1835) | Samma tabell | Ingen skill utan en vy | → `3-5-live-visning.md` |
| §12 `kod-kritiker` + `kod-rattare` (1836) | Samma tabell | Ersatta i N2 av `/code-review` en gång före publicering (analysen §7.3) | Rollerna → `3-2` |
| §12 LLM Wiki och `/ingest` som egen skill (1850) | `kunskap` [N4] | – | Kunskapsbasen → `3-4` |
| §12 "ett trettiotal egna skills" (1787) | Tabellen *Vart v0.74:s planerade skills tog vägen*; *Indelning och tak* | Antalet ersatt av ett tak på tolv | Roller → `3-1`, `3-2`, `4-foretaget.md`; mods → `3-5` |
| §12 Skelett `stitch-review/SKILL.md` (1903–1917) | Ersatt av `granska` [N1] | Struket (M11): helsidesskärmdumpar, Stitch-id ur `CLAUDE.md` (M7) | Bredder, fasta fält, tre utfall, JSON till grinden → `3-2`; horisontell scroll och klickytor → `bilaga-c-kontroller.md` |
| §12 Skelett `story-review/SKILL.md` (1919–1933) | Delfil i `granska` för scrollytelling [N4] | Struket (M11): utgår från en scrollytelling-sajt | Kriterierna för berättelse och rörelse → `3-2`, `2-6` |
| §3 Skillmappar i projektstrukturen (183–190) | – | – | → `bilaga-f-projektstruktur.md` |
| §8.7 Placeringsordningen, "skill = det du förklarat för femte gången", långa skills i flera filer (1264–1271) | *Indelning och tak*: lagerskills får dela upp sig i delfiler | – | Placeringsordningen → `3-4` |
| §8.8 Test av skills före utrullning, tre testfrågor, överlapp, upprepad kod till skript (1331–1339) | *Så skrivs en skill*: hänvisning | – | Testerna, skripten och pluginet → `3-4` |
| §10.6 `project-context`-skill som minne (1566) | Tabellen *Vart v0.74:s planerade skills tog vägen* | Ingen egen skill; briefen och stilkitet fyller rollen | – |
| §10.5 Orsaksklassning: processen rättas i skillens `SKILL.md` (1550–1559) | – | – | → `3-4` |
| §11.6 Expertmetoden: regler blir körbara granskare med checklista (1620–1624) | `granska` växer med delfiler | – | Expertgranskare → `3-2` |
| §16 steg 10–13, 17, 19: skapa `brief-interview`, `write-checks`, `checkpoint-planner`, `kod-kritiker`, auto loopen (2277–2286) | Skillernas nivåer i bilagan | – | Ordningen → `5-byggplan.md` |
| §6.2 Vilka mods vi bygger, utifrån sessionsloggarna (885) | – | – | → `3-5` |

## Fallgropar som tagits in

| Nr | Var i bilagan |
|---|---|
| 47 | *Indelning och tak*: målbilden tolv; regeln för taket står i `3-4` (fallgropen utan regel blev regel, analysen §6.3) |
| 48 | Hänvisning till `2-5`, där regeln bor |
| 61 | `granska`: bedömer alltid mot en referens (fallgropen utan regel blev regel, analysen §6.3) |
| 117 | *Så skapas en skill*: gör för hand först |
| 133, 144 | *Så skrivs en skill*: beskrivningen; testet → `3-4` |
| 134 | Hänvisning till `3-4`, där regeln bor |
| 143 | Hänvisning till `3-4`, där regeln bor |

Fallgrop 145 (rätta processen, inte bara utfallet) och 157 (ta inte bort hela skills) hör till rensning och lärande → `3-4`.

## Kartan, inventeringen och researchen som användes

- `karta/README.md`: kompetensen delas i tre, en skill per lager.
- `karta/1-strategi.md` till `karta/8-teknik-kvalitet.md`: varje lagerskill och vad den destilleras ur.
- `karta/flodet.md`: skill-creator mot baslinje, `/skill-doctor` före nya skills (regeln → `3-4`).
- `principer.md`: bara det som gjorts för hand tre gånger automatiseras; autonomi förtjänas.
- `BESLUT.md` 2026-10-13 (18:05, 18:41, 18:47, 18:52) och 2026-10-15.
- `LAGE.md`: ingen egen skill finns; överlapp med `nortropic-intake` är öppet.
- `inventering/inventering.json` (läst, inte ändrad): `bygga_sjalva` (AI-intervjun, branschmallarna, Serviceområde, svenska språkregler, den kalibrerade bedömaren, månadsrapporten), `borja_nu` (`/skill-doctor`), B- och K-id i tabellerna.
- Konsolideringsanalysen §4.3 (vad men inte hur, deterministiska skript), §6.3, §7.1 (antal skills), §7.3 (nivåerna), M9 och M11.
- `2026-10-15_webb-pro-genomgang.md`: 61 skills, 67 krockar; risk 5, verktygsladdning.
- Webb-pro (klonad, skrivskyddad): `kunskap/kundintervju.md`, `brief-mall.md`, `byggstandard.md` som underlag att destillera ur – inte kopierade.

## Avstämning mot de andra filerna

Bilagan skrevs samtidigt med lagerfilerna och flödesfilerna. Där samma sak redan stod på sin hemvist blev det en hänvisning här: vad men inte hur, förbud, test av skills, skript och `/skill-doctor` (`3-4`), stilskills (`2-5`). Skillify sattes till N2 i linje med `5-byggplan.md` ("Det som har gjorts för hand tre gånger blir kandidat till en skill") och `3-4`; i N1 finns bara utkast för bevakade steg. Lagerskillsens nivåer följer lagerfilerna (2-3, 2-4, 2-8: N2).

## Ommärkning 2026-10-15

Efter granskningen (`konsolidering/granskning-v1.0.md`) och tillägget kl. 14.30 i `konsolidering/skrivregler.md`. N1 i bilagan är nu bara de fyra skillutkasten, ett per steg i den omskrivna byggplanen (`5-byggplan.md`, steg 1–4); steg 5 och 6 görs för hand. Avsnittet *Första varvet* står nu först i bilagan. Inget är struket.

### Flyttat från N1

| Punkt | Före | Efter | Skäl |
|---|---|---|---|
| Varje steg körs för hand med ett kort utkast i skillformat | [N1] under *Så skapas en skill* | Inledningen till *Första varvet* (beskrivning) och fyra N1-punkter, en per utkast | Skrivreglerna: bilaga B har fyra N1-punkter, skillutkasten |
| Inget läckt material | [N1] | [N2] | Taket |
| Ett jobb per skill, beskrivningen säger vad och när | [N1] | [N2] | Taket |
| Byggare och granskare har skilda skills | [N1] | [N2] | Taket; i N1 är `bygg` och `granska` redan skilda, och granskarens isolering bor i `3-1` |
| `writing-for-agents` (B61) | [N1] | [N2] | Granskningen 1.1: hör ihop med skills, som är N2 |
| Målet är en skill per lager | [N1] | [N2] | Taket |
| Inga tredjepartsskills i kundbygget | [N1] | Hänvisning till `bilaga-a-verktyg.md`, urvalskriterierna | Dubblett av bilaga A:s första kriterium (*Bygg egna*) |
| `riktningar`: väljer bara bland befintliga stilkit | Begränsning i N1-utkastet | [N2], *Från sajt 2* | I N1 tar steget fram de tre minimala kiten |
| Funktionslistan `checkpoints.json` (raden `checkpoint-planner`) | [N4] | [N2] | Granskningen 1.2, i linje med `3-1` rad 19 |

### Utkasten anpassade till byggplanens steg 1–6

| Utkast | Ändring |
|---|---|
| `intervju` (steg 1) | De åtta kärnfrågorna i stället för hela intervjuguiden; briefen med sex rubriker, rörelsebudgeten under ton och intryck; `fakta.md` med källa per faktum. Sidkartan står inte i briefen utan i `sites/<namn>/sidkarta.md` och görs utanför utkastet (granskningen 1.3 punkt 1). Grill Me bara kritiskt, med skälet (granskningen 3.2). Öppna frågor med nummer: 1.2, 1.7 (intervjuns form, ny) och 2.5 |
| `riktningar` (steg 2) | Tar fram tre minimala stilkit – färg, typsnitt med licens, avstånd, radie och en kort `design.md` – och startsidans sektioner, en variant var. Riktningarna = startsidan i de tre kiten (granskningen 1.3 punkt 9). Stitch bara på provsidan i dator och mobil, aldrig med kundinnehåll |
| `bygg` (steg 3) | Standardsidorna; tacksida och integritetspolicy bara med formulär (öppet: fråga 1.8). Sidkartan läses ur `sidkarta.md` (granskningen 1.3 punkt 1). Ingen granskare – Johnny dömer direkt. Formulärkomponenten först med formulär [N2]. "Inga animationer utöver bibliotekets" → rörelse inom briefens rörelsebudget. "Bara sektioner ur biblioteket" → nya sektioner byggs så att de kan återanvändas, en variant var |
| `granska` (steg 4) | Markdownchecklista med element, förväntat, faktiskt och allvar i `reviews/` (granskningen 1.1, `3-2` 33–40). Fasta fält och tre utfall står inte längre i utkastet; hemvisten är `3-2`. Fynd mot ett kriterium med en källa får högst `medel` (granskningen 2.1 punkt 6). Johnnys domar i `domar.jsonl`. Granskningsmallen skrivs i steg 4 (granskningen 1.4 punkt 2) |
| *Inte skills i första varvet* | Ordnat efter stegen: kontrollskriptet i steg 3, research och sidkarta i steg 1, publicering i steg 5 om sajten publiceras (fråga 1.3), den första rapporten i steg 6 (ny rad, → `2-9`). Orkestreringen sker i huvudsessionen. Stilkit och bibliotek utöver första sajten görs i biblioteksarbetet |

### Hänvisningar

| Fynd eller regel | Åtgärd |
|---|---|
| Granskningen 2.3 punkt 7, planvyn | → `3-5-live-visning.md`, där den läggs in. Nivån anges där, inte i bilagan |
| Granskningen 2.3 punkt 7, angripare | → `3-2-granskning-och-kalibrering.md`, *Eval*, där den läggs in. Övriga roller i samma rad fördelade på sina hemvister: spanare och domare `3-1`, advisor `3-3`, specialister `3-2`, ärendeagent `4-foretaget.md` |
| Granskningen 2.3 punkt 1, `bilaga-d-fallgropar.md` | Skrivs parallellt; hänvisningen står kvar |
| Granskningen 2.3 punkt 1, `bilaga-c-kontroller.md` | Finns nu; hänvisningarna står kvar |
| Granskningen 3.2, `principer.md` | Skillify → `guide/README.md`, princip 8. "Självgående först efter några leveranser utan rättning" har ingen egen princip i README; källan är `historik/principer.md` (*Ordningen*), med hänvisning till princip 7 |
| `karta/README.md` | → `historik/karta/README.md` |
| Byggplanens steg | Utkasten och *Inte skills* hänvisar till `5-byggplan.md`, steg 1–6 |
