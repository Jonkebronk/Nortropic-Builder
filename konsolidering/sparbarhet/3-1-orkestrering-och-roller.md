# Spårbarhet: `guide/3-1-orkestrering-och-roller.md`

Skrivet 2026-10-15 vid konsolideringen. Radnummer avser `historik/IMPLEMENTERINGSGUIDE-v0.74.md`. Rubrikerna i kolumn 2 är avsnitten i 3-1.

Längd: källavsnitten är cirka 31 kB, filen cirka 17 kB (ungefär 55 %). Den är längre än målet på 40 % eftersom kartans tillståndsmönster, researchens rättade behörighetsmodell och tillsynstabellen ur fas 8d (D27) har tillkommit.

## v0.74

| v0.74-avsnitt (rader) | Var det hamnade | Struket och varför | Flyttat till annan fil |
|---|---|---|---|
| §5 ingress (722–724) | Ingressen | – | – |
| §5 tabellen *fem delar i en självgående loop* (726–733) | – | Struken: en innehållsförteckning över guiden, som nu ersätts av 3-1 och 3-2 | – |
| §5.1 `/bygg-sajt`, `state.json` med exempel (735–747) | *Läget i filer* (`state.json` N1, `/bygg-sajt` N2) | Fältet `stitchProjectId` struket: Stitch används inte vid kundbygget (beslut 2026-10-15). `iterations` ersatt av `varv`; tid och kostnad tillagda (`1-kundens-vag.md`, `4-foretaget.md`) | `decisions` → beslutskartan (`2-1-strategi.md`) |
| §5.1 påminnelse om tillståndet (749–755) | *Läget i filer*, N2 | ⚠️ ersatt med 📄: hooktyperna och taket 10 000 tecken är verifierade (research 2026-10-14, konsolideringsanalysen §5.1) | – |
| §5.1 bred eller djup, tabellen, scheman, återupptagning (757–771) | *Orkestreraren*, N2 | Tabellens exempel strukna: de räknar upp delar som nu ligger på N2–N4 i andra filer. ⚠️ ersatt med 📄 (format, 16 agenter, varningsgränser) | Scheman för fynd → `3-2` |
| §5.1 `/goal` som drivare (773–777) | *Orkestreraren*, N2 | ⚠️ ersatt med 📄 (`/goal` finns sedan 2.1.139) | – |
| §5.1 styra från mobilen, Paseo (779) | – | – | `bilaga-a-verktyg.md` |
| §5.2 generatorn ≠ granskaren (781–782) | *Den som bygger dömer inte*, N1 | – | – |
| §5.2 granskaren ser inte projektets instruktioner (784) | *Den som bygger dömer inte*, N1, märkt en källa | Lagt till ⚠️: om delagenter laddar `CLAUDE.md` är inte kontrollerat | – |
| §5.2 granskaren vet inte vilken runda (786) | – | – | `3-2` *Granskaren* (enligt uppdraget) |
| §5.2 *kan agenten göra det, anta att den gör det* (788) | *Behörighet i verktyget*, N1 | – | – |
| §5.2 behörighetstabellen (790–803) | *Behörighet i verktyget*, rolltabellen med nivå | Kolumnen modell/effort struken här | Modell, effort, advisor → `3-3`; kodkritiker → `3-2`; säkerhetsgranskare → `2-8-teknik-och-kvalitet.md` |
| §5.2 hur tabellen genomförs, rättat (805–808) | *Behörighet i verktyget*, punkt 1–4 | "Skyddshooken avgör per anrop vilken agent som anropar" fick ⚠️: inte verifierat | Skyddshooken → `3-3` |
| §5.2 effort per roll (810) | – | – | `3-3` (D5) |
| §5.3 stoppvillkor, tabellen (812–818) | *Stoppvillkor* | "Stitch-inloggning ogiltig" generaliserad till inloggning, konto eller kunduppgift (Stitch inte per kundbygge). Tidsbudgeten tillagd (`1-kundens-vag.md`) | – |
| §5.3 advisor (820–823) | En rad i *Stoppvillkor*, N4 | – | `3-3` (hemvist D20) |
| §5.3 domare för riskfyllda beslut (825–833) | *Stoppvillkor*, *Domaren*, N4 | Tabellen med tre vägar komprimerad till en mening | Antaganden → `3-5-live-visning.md` |
| Fas 3, checkpoints från enkelt till komplext (392) | *Byggsteg och överlämning*, N1 | Exemplen ändrade från kapitel till sidor (flersidig sajt, beslut 2026-10-15) | – |
| Fas 3, planeras i fas 1b och visas i planvyn (393) | – | – | Planvyn hör till fas 1b, utanför denna fil |
| Fas 3, `checkpoints.json` (394) | *Läget i filer*, funktionslistan N2 (sammanförd med kartans `passes`-lista) | – | – |
| Fas 3, ny byggagent per checkpoint (395) | *Byggsteg och överlämning*, N1 | – | – |
| Fas 3, överlämningsdokument (396) | *Byggsteg och överlämning*, N1 | "Namnen på kontrollerna, inte testkoden" står i lager 4 (*Låsning*) | – |
| Fas 3, spanaren (397) | *Byggsteg och överlämning*, N2 | – | – |
| Fas 3, status bara av orkestreraren (398) | *Belägg och status*, N1 | – | – |
| Fas 3, storlek, minst ~10 minuter (399) | *Byggsteg och överlämning*, N2, instruktion | Grinden blev instruktion (konsolideringsanalysen §4.2) | – |
| Fas 3, parallellt arbete (400) | *Byggsteg och överlämning*, N4 | Unlazy-siffrorna (3–4 h mot 2 h) strukna: anekdot | – |
| Fas 3, inga obegränsade flottor (401) | *Orkestreraren*, *Avgränsade flottor* N4 | Kostnadssiffran för Bun-omskrivningen struken (en källa) | – |
| Fas 3, isolering av miljön, tabellen (402–407) | *Byggsteg och överlämning*, N4 | – | – |
| Fas 3, full isolering med sandlåda (408) | – | – | `3-3` (D10) |
| Fas 3, `/batch` (409) | *Byggsteg och överlämning*, N4 | ⚠️ ersatt: `/batch` finns och kräver git-repo (konsolideringsanalysen §5.1) | – |
| Fas 3, grind (410) | *Grindkontrollen*, tabellen, raden Bygge | – | – |
| §7.2 grindkontroll, funktion och logik (986–1000) | *Grindkontrollen*, N2 | – | – |
| §7.2 registrering och exit 2 (1002–1012) | *Grindkontrollen*, N2 | ⚠️ ersatt med 📄; spärren efter åtta blockeringar tillagd (research) | – |
| §7.2 grindar per fas (1014–1026) | *Grindkontrollen*, tabellen per steg | Fas 2 (Stitch-design) struken: Stitch inte per kundbygge. Raden "samma modell i alla rundor, annars `blocked`" struken som grind (en källa, konsolideringsanalysen §4.2) | Fas 5 (rörelse) → `2-6-rorelse.md`; fas 6b → `3-2`; modellbyte → `3-3` |
| §7.2 bevis per grind (1028–1032) | *Belägg och status*, N1 | – | Förvaltningens rapporter → `2-9-drift-och-forvaltning.md` |
| §7.2 övergivna grindar (1034) | *Grindkontrollen*, N2 | – | – |
| §8.6 standardtexten, raden "Innan du rapporterar framsteg" (1303) | *Belägg och status*, hänvisning | – | Ordalydelsen → `3-3` *Promptregler* |
| §8.3 `subtask` för granskare (1214) | *Den som bygger dömer inte*, N1 | – | – |
| Fas 8d, tillsyn efter konsekvens, tabellen och rabattkoden (663–673) | *Tillsyn efter konsekvens och räckvidd*, N3 (D27), med hela tabellen (flyttad från `2-9` vid ommärkningen, se nedan) | Siffrorna om listans storlek strukna (två versioner, en källa) | Övervakande agenter och läsrätt per kund → `2-9`, rolltabellen här |
| §10.1 grundprincipen (1428–1429) | *Den som bedöms får inte ändra domaren*, N1 | – | – |
| §10.1 *lucka i vår guide fram till v0.4* (1431) | – | Struken: historik | – |
| §10.1 domare som ska låsas, tabellen (1433–1452, delad i två) | *Den som bedöms…*, tabellen | Den trasiga tabellen sammanförd. `design.functional.md` ersatt av tillstånden i biblioteket | Kunskapsbasen → `3-4-larande-och-underhall.md` |
| §10.1 varför `CLAUDE.md` låses, `init` på egen gren (1443, 1446–1447) | Raden Agentinstruktionerna i tabellen | – | `3-4` (D22) |
| §10.1 `design.md` förfinar sig inte själv (1445) | Raden Stilkitet i tabellen | – | `2-5-yta.md` |
| §10.2 låsning i fyra lager (1454–1462) | *Den som bedöms…*, lager 1–3 | Ordningen ändrad: commit och jämförelse är N1, deny och skyddshook N2 | Skyddshooken → `3-3` |
| §10.2 lager 4, dolda kontroller (1464–1468) | *Den som bedöms…*, lager 4, N4 | Rättat enligt M4: utanför byggarens arbetskatalog, inte via agentens verktyg | – |
| §10.2 ⚠️ syntax för deny (1470) | – | ⚠️ löst: syntaxen verifierad (research 2026-10-14) | – |
| §12 Graft, aldrig aktiv för granskare (1899) | *Den som bygger dömer inte*, N2 | – | Verktyget → `bilaga-a-verktyg.md` |

## Fallgropar ur §13

| Nr | Var |
|---|---|
| 9 Claude säger klar för tidigt | *Belägg och status* |
| 15 Agenten gör sina kontroller lättare | *Den som bedöms får inte ändra domaren* |
| 22 Instruktioner följs oftast men inte alltid | *Behörighet i verktyget* |
| 23 Lång kontext försämrar kvaliteten | *Byggsteg och överlämning* |
| 31 Byggaren bygger mot testet | Lager 4, dolda kontroller |
| 40 Rapporter utan länk eller skärmdump | *Belägg och status* |
| 41 Delade inloggningar | Tillsyn efter konsekvens |
| 46 Orkestreraren glömmer var flödet är | *Läget i filer* |
| 51 Tyst nedskärning | *Belägg och status*, *Inget släpps tyst* |
| 52 Agenten kryssar i sin egen ruta | *Belägg och status* |
| 53 Uppgifter delas ut en i taget | Parallella steg |
| 54 "Var noggrann" tappas först | *Byggsteg och överlämning* |
| 57 `/loop` och `/goal` förväxlas | *Orkestreraren* |
| 72 Generiska prompter, ingen namngiven roll | Rolltabellen |
| 76 Hundratals agenter som går fel | *Avgränsade flottor* |
| 79 Parallella agenter krockar | Parallella steg |
| 80 Hela chatten som överlämning | *Byggsteg och överlämning* |
| 81 Allt slås ihop på en gång | Parallella steg |
| 105 Arbetsflöde för en djup uppgift | *Bred eller djup* |
| 106 Planen i kontextfönstret | *Läget i filer* |
| 107 Behörighetsregler utspridda | Rolltabellen |
| 108 Riskfyllda beslut gissas | *Domaren* |
| 148 Statusrapporter utan belägg | *Belägg och status* |
| 151, 154, 155 Agent som agerar i stället för att lämna utkast; rabattkoden; massutskick | Tillsyn efter konsekvens |
| 189 Isoleringshooks i plugin-agenter | *Behörighet i verktyget*, punkt 3 |

## Kartan, principerna och researchen

| Underlag | Var |
|---|---|
| `historik/karta/flodet.md`, *Loopen* (försök, kontroll, klart, nytt försök eller Johnny; hook-skriptet räknar varven) | *Loopen*; *Grindkontrollen* N2 |
| `historik/karta/flodet.md`, *Tillståndet i filer* (funktionslista där bara `passes` ändras, progressfil, commit per varv; generatorn skriver inte i kriteriefiler) | *Läget i filer*; *Den som bedöms…* |
| `guide/README.md`, princip 1, 5, 8 (förr `principer.md`) | Ingressen, *Loopen*, *Den som bygger dömer inte* |
| `kunskap/research/2026-10-15_webb-pro-genomgang.md` (punkt 11, rören och vattnet) | Ingressen, *Loopen* |
| `kunskap/research/2026-10-14_claude-code-verifiering.md` (rad 7c, 6a–6c, 7a–7b, 2, 5) | *Behörighet i verktyget*, *Grindkontrollen*, *Orkestreraren*, *Läget i filer* |
| `kunskap/research/2026-10-15_kompetensluckor-anteckningar/flodet-loopar-bedomare.md` §1 (Stop-hookens spärr efter åtta block, `/goal`, Best practices, Anthropics långkörningsmönster) | *Grindkontrollen*, *Orkestreraren*, *Belägg och status*, *Den som bygger dömer inte* |
| Konsolideringsanalysen §2 D1, D2, D27; §3 M4, M7; §4.2–4.4; §5.1; §7.3 | Hela filen |

## Ommärkning 2026-10-15

Efter granskningen (`konsolidering/granskning-v1.0.md`) och skrivreglernas tillägg kl. 14.30. Nivåerna i tabellerna ovan gäller den första konsolideringen; där de skiljer gäller det här avsnittet. Inget är struket utom dubbletter, som ersatts med hänvisningar.

**N1 före och efter:** 17 punkter och 12 tabellrader före; 4 punkter och 1 tabellrad efter (granskarens rad i rolltabellen, samma regel som punkten under *Den som bygger dömer inte*).

### N1 som finns kvar

| Punkt | Vad den slår ihop |
|---|---|
| *Roller i första varvet* (ny formulering) | Ersätter *Fyra roller* i N1: huvudsessionen bygger medan Johnny tittar, granskaren är enda delagenten från `5-byggplan.md`, steg 4, Johnny dömer steg 3 direkt (granskningen 1.3, punkt 10) |
| *`progress.md` håller läget* | Ersätter `state.json` i N1; tid per steg (`1-kundens-vag.md`), det som gjordes för hand (`5-byggplan.md`) och *Inget släpps tyst* (fallgrop 51) inarbetade |
| *Redo för Johnnys dom bara med belägg* | N1-delen av *Bara orkestreraren skriver klar*, den omärkta punkten om promptens instruktion (standardtexten, `3-3`), *Varje påstående … länk eller skärmdump* (fallgrop 40) och *Orkestreraren kör kontrollskriptet efter varje varv* |
| *Granskaren är en separat delagent med färsk kontext* | Oförändrad i sak; "från steg 4" och "huvudsessionens logg" tillagda |
| Rolltabellen, raden Granskare | – |

### Flyttat från N1

| Punkt (före) | Nu |
|---|---|
| *Fyra roller i första varvet* | N2, *Fyra roller när Johnny inte tittar på varje varv* |
| *Varje steg är en loop*, tak 3 varv | N2; i N1 avgör Johnny direkt |
| *Varje steg slutar med något Johnny kan se* | Löptext med hänvisning till `guide/README.md`, princip 1, och `3-2` (dubblett av 3-2:s N1-punkt om att en kontroll aldrig hindrar att Johnny ser) |
| `state.json` (i *Läget i filer*) | N2, egen punkt |
| *Bygget delas i hela, synliga steg* | N2 |
| *Ny kontext per steg*, överlämningsfiler | N2 |
| *Bara orkestreraren skriver `klar`*, `state.json` → `bevis` | N2, *Bara orkestreraren sätter status*; belägg i N1 via `progress.md` |
| *Inget släpps tyst*; *Varje påstående … länk eller skärmdump*; *Orkestreraren kör kontrollskriptet* | Inarbetade i N1-punkterna ovan; hooken N2 |
| Stoppvillkoren, fem rader N1 | N2; i N1 frågar huvudsessionen Johnny direkt. Tidsstoppet i N1 bor i `1-kundens-vag.md`; raden heter nu *Steget går över sin tidsbudget* (N2, som där) |
| *Granskaren bedömer resultatet, inte instruktionerna* | N2 |
| *Det en roll inte behöver ska den inte kunna*; *Så sätts behörigheten* | N2; N1:s `permissions.deny` bor i `3-3` |
| *Minsta uppsättning* | Löptext med hänvisning till `3-3` (dubblett) |
| Rolltabellen: Orkestrerare, Byggare | N2 |
| *Byggaren kan inte ändra det som bedömer den* | N2; i N1 är skyddet att Johnny tittar (granskningen 1.2; konsolideringsanalysen §7.3) |
| Låsningstabellen: kontroller, checklista, brief och faktabas, stilkit | N2 |
| Låsningen, lager 1 (commit och `git diff`) | N2 |

### Granskningens fynd som åtgärdats

| Fynd | Åtgärd |
|---|---|
| 1.1, rad `3-1` 9, 18, 32, 113–118, 125 | Flyttat enligt förslaget: interaktiv huvudsession, granskaren som enda delagent, `progress.md` med tid per steg |
| 1.2, låsning av brief och kontroller | N2 |
| 1.2, funktionslistan `checkpoints.json` | N2 (oförändrad) |
| 1.2, låsning av `CLAUDE.md` | Raden i låsningstabellen hänvisar till `bilaga-e-oppna-fragor.md`, fråga 2.3 |
| 1.3, punkt 10 | Johnny dömer bygget direkt i steg 3; granskaren från steg 4 (rollpunkten och granskarpunkten) |
| 1.3, punkt 11 | Grindtabellen, raden Brief: "kundens bekräftelse och Johnnys godkännande" |
| 2.2, tillsyn efter konsekvens och räckvidd | Hela tabellen och rabattkodsexemplet ur `guide/2-9-drift-och-forvaltning.md` (v1.0, avsnittet *Behörigheter och tillsyn*, rad 71–82) bor nu i *Tillsyn efter konsekvens och räckvidd*. Källmärkningen sammanförd: VAULT-, 5000-timmars- och 1-person-videon, samma kanal – en källa; antalet mottagare ⚠️; ITIL 4 via sekundärkällor ⚠️. Meningen om att ge en nyckel som bara skapar utkast behölls. `2-9` ersätts med en hänvisning av en annan agent |
| 2.3, punkt 6 | Baslinjen för visuell regression är en egen rad i låsningstabellen (N3) med hänvisning till `2-9`, *Ändringar* |
| 2.3, punkt 9 | `scripts/godkann-kontroller.mjs` → `skript/godkann-kontroller.mjs` |
| Hänvisningar (skrivreglerna) | `karta/flodet.md` → `historik/karta/flodet.md`; "README, princip 8" → "`guide/README.md`, princip 8"; byggplanens steg enligt `5-byggplan.md`, steg 1–6 |
| Form | Låsningens numrerade lager blev märkta punkter; omärkta listpunkter (modellbyte, varvnummer, minsta uppsättning) blev märkta punkter eller löptext |

### Inte löst här

- `guide/bilaga-c-kontroller.md` anger fortfarande N1 för C116–C118 och C127–C130, som nu är N2, och C113 beskriver belägg i `state.json` (i N1 nu `progress.md`). Filen är inte min.
- `guide/n1-forsta-sajten.md` behöver genereras om med `konsolidering/bygg_n1.py`.
