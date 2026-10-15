# Spårbarhet: `guide/3-4-larande-och-underhall.md`

Skrivet 2026-10-15 vid konsolideringen. Radnummer avser `historik/IMPLEMENTERINGSGUIDE-v0.74.md`. Dubblettgrupperna (D) och motsägelserna (M) avser `kunskap/research/2026-10-15_guide-konsolideringsanalys.md`.

## v0.74

| v0.74-avsnitt (rader) | Var det hamnade (fil, avsnitt) | Struket och varför | Flyttat till annan fil |
|---|---|---|---|
| Fas 8f Underhållsrutiner (709–718) | 3.4 *Underhållsrutiner* (tabell), *Rensning*, *Byggsystemet som plugin* | Siffran "20–30 rutiner om dagen" struken som detalj | Kön för arkitekturfynd och (vid ommärkningen) hela arkitekturgranskningen → `2-9-drift-och-forvaltning.md` |
| §8.1 Ny init (1183–1190) | 3.4 *`CLAUDE.md`* [N1]: skriv för hand | `CLAUDE_CODE_NEW_INIT` kvar som ⚠️ (finns inte i verifieringens lista) | – |
| §8.1 Ärvda regler (1192) | 3.4 *`CLAUDE.md`*, hänvisning | Förslaget att lägga flödets gemensamma regler i en `CLAUDE.md` ovanför sajtrepona struket: ersatt av pluginet (N4) och den öppna frågan om var flödets fil ligger (`bilaga-e-oppna-fragor.md`, fråga 2.3) | Kontrollen med `/doctor` → `3-3-sakerhet-och-installningar.md`, *Första sajten* (vid ommärkningen) |
| §8.5 Underhållstabellen (1222–1228) | 3.4 *Rensning*, verktyg; *Underhållsrutiner* | ⚠️ om `/doctor` löst (bundlad skill, verifieringen §9); `/skills` + T kvar som ⚠️ | – |
| §8.5 Rutin vid ny modell (1230–1238) | 3.4 *Rensning vid ny modell* [N2] (D17) | "Anthropic strök ~80 % vid Opus 5" (1231) struken som detalj; siffran står kvar som ⚠️ ur context-videon. Eval-sviten ersatt av Johnnys blinda dom tills eval finns (beslut 2026-10-15, synligt i varje steg) | Eval → `3-2-granskning-och-kalibrering.md` |
| §8.5 Äldre guider gäller fortfarande (1236) och 4b (1237) | 3.4 *Rensning* [N2] respektive [N4] | – | – |
| §8.5 Vad som behålls och prövas (1240–1246) | 3.4 *Rensning* [N2] | "Samma utfall som i context-videon … en oberoende iakttagelse" struken: båda är Nate Herks kanal, alltså en källa (bänken per primärkälla, `guide/README.md`) | – |
| §8.5 Halvårsvis (1248) | 3.4 *Rensning*, *Underhållsrutiner* | – | – |
| §8.5 Underlag för rensningen (1250–1255) | 3.4 *Rensning*, verktyg (siffrorna som ⚠️) | MCP-siffrorna (85 % färre tokens, evals 49→74 %) strukna här: overifierade, och de hör till regeln CLI före MCP | CLI före MCP → `2-5-yta.md`, `bilaga-a-verktyg.md` |
| §8.7 Grindar och instruktioner (1257–1262) | 3.4 *Var en regel hör hemma* [N1] | – | Vad som får vara grind → `guide/README.md` |
| §8.7 Placeringsordningen (1264–1271) | 3.4 *Var en regel hör hemma* [N1] | Notisen till konsolideringen (1271) utförd | – |
| §8.7 Mall för `CLAUDE.md` (1273–1279) | 3.4 *`CLAUDE.md`* [N1] (D22) | "Under ~300 rader" ersatt av högst 60 rader för första sajten (analysen §8.2) | – |
| §8.7 `CLAUDE.md` per nivå (1281–1285) | 3.4 *`CLAUDE.md`* [N2] | – | "Båda nivåerna är låsta" → `3-1` (låsningen) |
| §8.7 Stop-hook som skriver lärdomar (1287) | 3.4 *`CLAUDE.md`* [N1] | – | – |
| §8.7 Reservation om andras skills (1289) | – | – | Urval, Skill Spector, låsta versioner → `bilaga-a-verktyg.md` |
| §8.8 Plugin (1324–1330, 1340–1342) | 3.4 *Byggsystemet som versionerat plugin* [N4] | ⚠️ löst (verifieringen §4) | Isoleringshooks → `3-3` (även `3-1`) |
| §8.8 Test av skills (1331) | 3.4 *Formtest* [N2] | – | – |
| §8.8 Test av att rätt skill utlöses (1332–1335) | 3.4 *Triggningstest* [N2], instruktion *(en källa – bänken)* | Underkänner inte längre en version (analysen §4.2: primärkällan inte läst) | – |
| §8.8 Upprepad kod till låsta skript (1336–1339) | 3.4 *Skills* [N2] | Konvertering av Stitch-exporten struken ur exemplen: Stitch används inte per kundbygge (beslut 2026-10-15) | – |
| §3 Projektstruktur, rot- och sajt-`CLAUDE.md` (170, 214) | 3.4 *`CLAUDE.md`* | – | Projektstrukturen → `bilaga-f-projektstruktur.md` |
| §10.1 Låsning av `CLAUDE.md` och `init` från tredje part (1441–1447) | 3.4 *`CLAUDE.md`* [N1] (D22) | – | Låsningens mekanik och tabellen över låsta filer → `3-1-orkestrering-och-roller.md`; `design.md` förfinar sig inte → `3-3` (designregelvakten) och `2-5` |
| §10.3 Kontroller åldras (1474) | 3.4 *Var en regel hör hemma* [N2] | – | Kontrollerna → `bilaga-c-kontroller.md` |
| §10.5 Problemet och videons lösning (1515–1518) | 3.4 *Lärdomar blir förslag*, auto loop [N4] | – | – |
| §10.5 Vår variant, steg 1–5 (1520–1525) | 3.4 auto loop [N4] | **Omskrivet:** loopen skriver bara förslag, inte i `arbetssatt.md` (webb-pro-genomgången risk 4; README princip 10) | – |
| §10.5 steg 6, "släpp på det när eval visat sig pålitligt" (1526) | – | Struket: lärdomar beslutas alltid av Johnny | – |
| §10.5 steg 7, förbättringsjournal (1527) | 3.4 *Förbättringsjournal* [N2] | – | – |
| §10.5 Struktur för `arbetssatt.md` (1529–1534) | 3.4 `arbetssatt.md` [N4]; löpande förslag i `larande-forslag.md` [N2] | Task Observers exempel "ingen verklig kunds namn i en fil" struket: våra sajtfiler innehåller kundens namn | Task Observer → `bilaga-a-verktyg.md` |
| §10.5 Gate 4, slutgranskning (1536–1540) | – | – | Stopp 2, förhör, Ultra review, elementknuten feedback → `3-2` (D12, D13); Variate → `3-5-live-visning.md` |
| §10.5 "Din feedback skrivs direkt till `arbetssatt.md`" och skyddet för den rubriken (1541–1542) | 3.4 [N1] *En dom om smak gäller den sajten* | Struket: Johnnys ord blir inte mekanik (README princip 10; webb-pro-genomgången risk 4; uppdraget) | – |
| §10.5 Missade fynd (1544–1548) | 3.4 *Missade fynd* [N2]; *Nya låsta kontroller* [N2] | "Kontroller som missats blir nya standardkontroller" ändrat: bara objektivt fel som hänt mer än en gång, efter Johnnys beslut | Kalibreringen → `3-2`; drift → `2-9` |
| §10.5 Orsaksklassning och att backa (1550–1559) | 3.4 *Orsaken klassas*, *Backa med handlingar* [N2] | – | – |
| §10.5 avslutning (1561) | 3.4 auto loop [N4] | – | – |
| §10.6 Fler lärdomar (1563–1567) | 3.4 *En loop lönar sig när* [N2] | `project-context`-skillen struken: briefen och `design.md` fyller rollen | Ny byggagent per funktion → `3-1` (ny kontext per steg); en liten bit i taget → `guide/README.md` princip 8 |
| §11 inledning och §11.1 (1571–1578) | 3.4 *Kunskapsbasen*, ingress | – | Nielsens siffror för antal utvärderare (⚠️) och 3–5 granskare → `3-2` (M9); advise-project-approach → `2-2-omfattning.md` |
| §11.2 Tre villkor (1580–1583) | 3.4 *Kunskapsbasen* [N1], [N2] | "44 × 44 px" struket ur exemplet: tröskeln hör till kontrollerna, inte till kunskapsbasens princip | Klickytor → `2-4-skelett.md`, `2-8` |
| §11.3 Kunskapsområden (1585–1594) | 3.4 *Kunskapsbasen*, områdesraden | Tabellen komprimerad till en rad med hänvisningar | Respektive lagerfil |
| §11.4 Hur det kopplas in (1596–1601) | 3.4 *Kunskapsbasen*: källa per kriterium [N2], expertmetoden [N4], konfliktordning [N1] | – | Fas 6 med 3–5 granskare → `3-2` (M9); beslutskartan → `2-1-strategi.md` |
| §11.6 Kunskapsbasens innehåll, OKF, expertmetoden (1609–1630) | 3.4 *Kunskapsbasen* [N2], [N4] | `/ingest` som eget kommando struket: videons eget verktyg; intaget styrs av *Bevakning*. Att OKF:s officiella verktyg krävde BigQuery struket som detalj (formatet följs ändå) | Bänken (1626) → `guide/README.md` (D23) |
| §12 Så skapar vi egna skills (1787–1793) | 3.4 *Skills grundas i en verklig körning* [N2] | – | Metoden och listan över egna skills → `bilaga-b-skills.md` |
| §12 Förbud och *vad, men inte hur* (1795–1797) | 3.4 *Förbud behålls, arbetsgången prövas* [N2] (D17) | – | Beskrivningen av en skill → `bilaga-b-skills.md` |

## Fallgropar ur §13

| Nr | Var |
|---|---|
| 1 Skills i fel mapp | *Skills*, kontrollera att skillen syns (regel enligt analysen §6.3) |
| 12 Gamla `/init` fyller `CLAUDE.md` | *`CLAUDE.md`* |
| 13, 73 Inaktuella instruktioner | *Rensning vid ny modell* |
| 17 Samma misstag upprepas | Auto loop |
| 22 `CLAUDE.md` följs oftast, inte alltid | *Var en regel hör hemma* |
| 33 En skill kostar tokens utan att hjälpa | *Skills*: prov med och utan; `/skill-doctor` |
| 44 Ett dåligt resultat blir permanent regel | *Lärdomar blir förslag* |
| 47 Fler skills är inte bättre | *Skills*: tak (regel enligt analysen §6.3) |
| 65 Popularitet tas för passform | *Bevakning*, hänvisning; regeln bor i `bilaga-a-verktyg.md`, urvalskriterierna |
| 67 Litteratur ur minnet | *Kunskapsbasen* [N1] |
| 74 Kontroller som aldrig underkänner | *Var en regel hör hemma* |
| 83 Misslyckade förbättringar loggas inte | *Förbättringsjournal* |
| 84 `init` från tredje part skriver om `CLAUDE.md` | *`CLAUDE.md`* |
| 92 Kunskapsbas utan struktur | *Kunskapsbasen*, struktur |
| 101 Det granskarna missar glöms | *Missade fynd* |
| 104 Instruktioner rensas för att en guide säger det | *Rensning* |
| 112 Olika versioner av byggsystemet | *Plugin* |
| 113 Sajtspecifika regler i rotfilen | *`CLAUDE.md`* [N2] |
| 114 Ny version till alla sajter på en gång | *Plugin*, stegvis utrullning |
| 116 Hårda regler begravda mitt i `CLAUDE.md` | *`CLAUDE.md`*, ordning |
| 117 Skills skrivna efter hur man tror att man arbetar | *Skills grundas i en verklig körning* |
| 128 Tillval tas in på utlovade siffror | *Bevakning* |
| 132 `CLAUDE.md` från andra mappar | → `3-3`, *Första sajten* [N1] (flyttad vid ommärkningen); hänvisning i *`CLAUDE.md`* |
| 133 Skill med trasig frontmatter | *Formtest* |
| 134 Skills som styr *hur* i detalj | *Förbud behålls, arbetsgången prövas* |
| 135 En regel med en källa behandlas som säker | → `guide/README.md` (bänken) |
| 136 Råmaterialet sparas inte | *Kunskapsbasen* |
| 142 Spaghettikod genom förvaltningens ändringar | → `2-9-drift-och-forvaltning.md` (arkitekturgranskningen); hänvisning under *Underhållsrutiner* |
| 143 Samma kod genereras i varje bygge | *Skills*, låsta skript |
| 144 Överlappande beskrivningar | *Triggningstest* |
| 145 Utfallet rättas men inte processen | *Orsaken klassas* |
| 149 Be modellen återge sitt tänkande | *Backa med handlingar* |
| 157 Hela skills tas bort | *Rensning* |
| 189 Isoleringshooks i pluginets agenter | *Plugin* (regeln i `3-3`) |
| 97, 98 Skills utan säkerhetskontroll, automatiska uppdateringar | → `bilaga-a-verktyg.md` |

## Kartan och researchen

- `historik/karta/flodet.md`, *Bevakning* (sex källor, intagsregeln) och *Lärande* → 3.4 *Bevakning*, *Lärdomar blir förslag*.
- `kunskap/research/2026-10-15_kompetensluckor-anteckningar/flodet-loopar-bedomare.md` §1 (skill-creator, `claude plugin validate`, skillistans budget 1 %, `CLAUDE.md` i *Best practices*, hooks för regler som måste gälla, hookify och claude-md-management, *Harness design*), §4 (bevakningslistan och awesome-claude-codes tröskel), §5 (Simon Willison: lärande är människans uppdatering av harnessen).
- `kunskap/research/2026-10-15_webb-pro-genomgang.md` §4, risk 4 (Johnnys ord blir regler) och risk 5 (verktygsladdning) → *Lärdomar blir förslag*, *Skills*.
- `kunskap/research/2026-10-14_claude-code-verifiering.md` §4 (plugin, versionslåsning), §9 (`--safe-mode`, `/doctor`).
- `kunskap/research/2026-10-14_stitch-och-verktyg.md` (`.agents/skills`, Googles skills, Pococks skills).
- Konsolideringsanalysen §4.2 (tre testfrågor), §4.3 (deterministiska skript, Pococks skill), §4.4 (rensning och wiki bygger på samma primärkälla), §6.3 (fallgrop 1 och 47 blir regler), §8.2 (`CLAUDE.md` ≤ 60 rader), §9.3 (wikin regel för regel).
- Iakttagelser i sessionen 2026-10-15 (inte källor utifrån): Johnnys användarnivå har flera hundra skills och plugins, och `~/.claude/CLAUDE.md` innehåller en regel för ett annat projekt.

## Ommärkning 2026-10-15

Efter `konsolidering/granskning-v1.0.md` och tillägget 14.30 i `konsolidering/skrivregler.md`. N1 gick från 13 punkter till **2**.

**Kvar i N1:** *Ingen lärdom ändrar något av sig själv* (med *en dom om smak gäller den sajten* inbakad) och *Kort `CLAUDE.md`, skriven för hand* (med högst 60 rader, inte `/init` och att filen är skild från rotfilen inbakade).

**Flyttat från N1** (inget struket):

| Punkt | Ny nivå | Anmärkning |
|---|---|---|
| En dom om smak gäller den sajten | – | Sammanslagen med N1-punkten om lärdomar; hänvisar till `guide/README.md`, princip 10 |
| Efter första sajten: kort lista | N2 | Omformulerad till *Före andra sajten* |
| Billigast först | N2 | – |
| Grindar och instruktioner åldras olika | N2 | Sammanslagen med *en grind förnyas när den slutat underkänna* till en punkt, hemvisten för *kontroller åldras* (granskningen 2.2) |
| `CLAUDE.md`: ordning | N2 | – |
| `CLAUDE.md`: skriv för hand, inte `/init` | – | Inbakad i N1-punkten |
| Johnny godkänner varje ändring av `CLAUDE.md` | N2 | Inleds med "Förslag tills Johnny avgjort fråga 2.3 i `bilaga-e-oppna-fragor.md`:" (granskningen 1.3 punkt 8); N2 som låsningen i `3-1` |
| Två filer, två syften | – | Rotfilen och var flödets fil ligger inbakade i N1-punkten och förslagspunkten, med hänvisning till fråga 2.3 (granskningen 2.4) |
| Bara de skills första sajten använder | N2 | Taket står kvar här; avgränsningen från användarnivån är ny N1 i `3-3` |
| Källorna ligger i projektet; konfliktordning | N2 | Kunskapsbasen är N2 |

**Omärkta listpunkter som fått nivå:** *Verktyg* under *Rensning* [N2], *Material från andra används bara internt* [N2].

**Granskningsfynd som åtgärdats:**

| Fynd | Åtgärd |
|---|---|
| 1.2 / 2.2 Kontroller åldras (`3-2` rad 22: N3; här N2) | Hemvisten är här, N2, en punkt; agentskills.io-källan ur `3-2` tagen hit. `3-2` rad 22 behöver bli en hänvisning (ägs av `3-2`) |
| 1.3 punkt 8 `CLAUDE.md` | Se tabellen ovan |
| 2.2 Arkitekturgranskning kvartalsvis | Raden struken ur *Underhållsrutiner*; hänvisning till `2-9-drift-och-forvaltning.md`, där regeln står som N3 |
| 2.2 Stjärnor är inte passform | Ersatt med hänvisning till `bilaga-a-verktyg.md`, urvalskriterierna |
| 2.4 Var flödets `CLAUDE.md` ligger | Hänvisning till `bilaga-e-oppna-fragor.md`, fråga 2.3 |
| 3.2 / skrivreglerna: hänvisningar | `karta/flodet.md` → `historik/karta/flodet.md`; "README, princip 7" → "`guide/README.md`, princip 7" |
| Uppdraget: användarnivåns skills | Iakttagelsen (flera hundra skills, regeln för ett annat projekt i `~/.claude/CLAUDE.md`) flyttad till `3-3`, *Första sajten*; här står hänvisningar under *`CLAUDE.md`* och *Skills* |
