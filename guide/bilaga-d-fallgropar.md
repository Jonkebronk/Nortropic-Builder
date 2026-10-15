# Bilaga D – fallgropar

**Status:** konsoliderad v1.0, 2026-10-15; uppdaterad samma dag efter ommärkningen (`konsolidering/skrivregler.md`, tillägget kl. 14.30). Ur v0.74 §13 (`historik/IMPLEMENTERINGSGUIDE-v0.74.md`, rad 1937–2135).

Fallgroparna är 196 iakttagelser ur videorna och researchen: saker som gick fel för någon. De är inga regler. I v1.0 står de flesta som *varför* i den regel som hindrar felet, oftast med numret inom parentes, och i en skill blir de förbud (`bilaga-b-skills.md`). Den här bilagan visar var varje fallgrop tog vägen, så att inget försvann i konsolideringen. Är en fallgrop relevant för ett nytt problem, läs regeln i filen som anges, inte bara raden här.

**Förkortningar:** filerna i `guide/` skrivs utan ändelse (`2-5` = `2-5-yta.md`); 1 = `1-kundens-vag.md`, 4 = `4-foretaget.md`, A = `bilaga-a-verktyg.md`, B = `bilaga-b-skills.md`. Hemvisten står först. *Analysen* = `kunskap/research/2026-10-15_guide-konsolideringsanalys.md`.

## Sammanställning

| Utfall | Antal |
|---|---|
| Intagen som *varför* i en regel, med numret | 183 |
| Struken – dubblett, sammanslagen med en annan fallgrop i samma regel | 10 |
| Struken – inaktuell | 1 |
| Struken – Stitch stryks (`BESLUT.md` 2026-10-15) | 1 |
| Utan hemvist efter att Stitch ströks | 1 |
| Inte intagen men fortfarande relevant | 0 |
| **Summa** | **196** |

Fallgroparna om företaget – de som analysen §6.3 pekar ut (150–153, 167, 168, 171–174) och 140 – har hemvist i `4-foretaget.md`; 154–156 delas med förvaltningen i `2-9`. De sex som analysen §6.3 sa saknade regel har nu en: 1 (`3-4`, att skillen syns), 6 (tidsbudgeten i `1` och `3-1`), 29 (`2-5`, referensbilder utan överlägg), 47 (taket i `3-4` och B), 61 (`3-2`, varje bedömning har en referens) och 85 (`2-4` och `2-5`, konsekvens är inte karaktär).

## Alla 196

| Nr | Fallgrop | Var den tagits in |
|---|---|---|
| 1 | Skills i fel mapp | 3-4, 2-5 |
| 2 | Stilbyten mellan Stitch-designer | struken – inaktuell: ingen Stitch-design per sajt; kitets tokens ger samma stil på alla sidor (2-5) |
| 3 | Bara datordesign – sajten gick sönder på mobil | 2-4, 2-5, 2-8 |
| 4 | Oönskade småanimationer under bygget | 2-6 |
| 5 | För mycket animation i helheten | 2-6 |
| 6 | Långa körtider | 2-5 (varför); regeln: tidsbudgeten i 1 och stoppvillkoret i 3-1 |
| 7 | Mods syns inte i VS Code-tillägget | 3-5 |
| 8 | En ny mod försvinner efter sessionen | 3-5 |
| 9 | Claude säger klar för tidigt | 3-1 |
| 10 | Skyddsvakter stoppar nödvändiga raderingar | 3-3 (analysen: ≈ 115; egen rad i skyddshooken) |
| 11 | Nya meddelanden mitt i arbetet | 3-3 |
| 12 | Gamla `/init` fyller `CLAUDE.md` | 3-4 |
| 13 | Instruktioner blir inaktuella vid ny modell | 3-4 |
| 14 | En väntande fråga stoppar en obevakad session | 3-3, 2-9 |
| 15 | Agenten gör sina egna kontroller lättare | 3-1 |
| 16 | Kontrollerna går igenom men funktionen är inte inkopplad | 2-3, 2-8, 3-2 |
| 17 | Samma misstag upprepas varje runda | 3-4 |
| 18 | Modellen återgår till egna färger och typsnitt | 2-5, 2-4, 3-3 |
| 19 | Beskuren datorversion på mobil | struken – dubblett av nr 3 (samma regel i 2-4, 2-5, 2-8) |
| 20 | Formulär är den vanligaste säkerhetsrisken | 2-8 |
| 21 | Full granskning av varje liten ändring | 3-2 |
| 22 | `CLAUDE.md` följs oftast men inte alltid | 3-4, 3-1 |
| 23 | Lång kontext försämrar kvaliteten | 3-1 |
| 24 | Planfiler i JSON är svåra att granska | 3-5 |
| 25 | Sajten ser rätt ut men koden brister | 2-8, 3-2 |
| 26 | Automatiska commits skickar med hemligheter | 3-3 |
| 27 | Designskills är bara text | 2-5 |
| 28 | Referenser från fel bransch | 2-5 |
| 29 | Cookie-rutor i referensbilder | 2-5 |
| 30 | Riktiga referenser ger risk för kopiering | 2-5 |
| 31 | Byggaren bygger mot testet | 3-1 |
| 32 | Granskaren gissar när den bara har ja eller nej | 3-2 |
| 33 | En skill kostar tokens utan att hjälpa | A |
| 34 | Modellen stannar och frågar i en obevakad körning | 3-3, 2-9 |
| 35 | Modellen rättar sådant den inte ombetts röra | 3-3 |
| 36 | Hela filer skrivs om för små ändringar | 3-3 |
| 37 | Tyst byte till en svagare modell | 3-3 |
| 38 | Påhittade fakta | 2-7 (analysen: ≈ 167 och 180; tre regler) |
| 39 | Hög effort är inte alltid bättre | 3-3 |
| 40 | Rapporter utan länk eller skärmdump | struken – dubblett av nr 52 (samma regel i 3-1; 2-9 hänvisar) |
| 41 | Delade inloggningar mellan agenter | 3-1, 2-9 |
| 42 | Formulärtester når kunden | 2-8, 2-9 (analysen: ≈ 125; egen regel) |
| 43 | Agenten bygger mer än någon bett om | 3-3, 2-2 (analysen: ≈ 150; egen regel) |
| 44 | Ett dåligt resultat blir en permanent regel | 3-4 |
| 45 | Arbetsverktyg som Variate följer med till produktion | 2-8, 3-5 |
| 46 | Orkestreraren glömmer var flödet är | 3-1 |
| 47 | Fler skills är inte bättre | 3-4, B |
| 48 | Designskills med olika stil krockar | 2-5 |
| 49 | Referensbilder som tolkas till text tappar detaljer | 2-5 |
| 50 | Sidan leder inte till den primära handlingen | 2-3 |
| 51 | Tyst nedskärning av det svåra | 3-1, 3-2 |
| 52 | Agenten kryssar i sin egen ruta | 3-1 |
| 53 | Uppgifter delas ut en i taget | 3-1 |
| 54 | "Var noggrann" tappas först | 3-1 |
| 55 | Skärmdumpar kan inte granska rörelse | 2-6, 3-2 |
| 56 | Beteendegranskaren saknar facit för tillstånd | 2-3, 3-2 |
| 57 | `/loop` och `/goal` förväxlas | 3-1, 2-9 |
| 58 | Förhandsvisningslänkar läcker opublicerat innehåll | 2-8, 3-5 |
| 59 | Granskaren vet rundnumret | 3-2 |
| 60 | Planen har påhittade delar | 2-1 |
| 61 | Utan förebild hittar kritikern på en egen standard | 3-2, B |
| 62 | Full design innan layouten är vald | 2-4 |
| 63 | En felformaterad `design.md` | 2-5 |
| 64 | En rättningsrunda per kommentar | 3-2 |
| 65 | Popularitet tas för passform | 2-2, 3-4, A |
| 66 | "Gratis att börja" blir dyrt att driva | 2-2, 2-8, A |
| 67 | Litteratur citerad ur minnet | 3-4 |
| 68 | Kundens oskrivna regler syns inte | 2-1 |
| 69 | Sajten konverterar till en process som inte fungerar | 2-1 |
| 70 | Autonomi innan förtroende | 3-2, 2-9 |
| 71 | Fel i planen klarar alla grindar | 2-1 |
| 72 | Generiska prompter, agenter väntar på varandra | 3-1 |
| 73 | Gammal handledning står i vägen för en ny modell | struken – dubblett av nr 13 (samma regel i 3-4) |
| 74 | Kontroller som aldrig underkänner | 3-2, 3-4 |
| 75 | En inspirationsbild till generatorn ger en kopia | 2-5 |
| 76 | Hundratals agenter som går fel | 3-1 (analysen: ≈ 79 och 81; egen regel) |
| 77 | Varianter ur samma kontext är samma idé | 2-4, 2-5 |
| 78 | Utlovat men aldrig byggt | 3-2, 2-8 |
| 79 | Parallella agenter krockar på grenar, portar och beroenden | 3-1 (analysen: ≈ 76; samma regel som 81) |
| 80 | Hela chatten som överlämning | struken – dubblett av nr 23 (samma regel i 3-1) |
| 81 | Allt slås ihop på en gång | 3-1, 2-9 (analysen: ≈ 76; samma regel som 79) |
| 82 | En granskare med för många kriterier | 3-2 |
| 83 | Misslyckade förbättringar loggas inte | 3-4 |
| 84 | Ett tredjeparts-`init` skriver om `CLAUDE.md` | 3-4, A |
| 85 | Ett designsystem ger konsekvens, inte karaktär | 2-4, 2-5 |
| 86 | Agenten gissar kommandon och flaggor | utan hemvist – regeln var ett verktygsmanifest ur `stitch --help`, som försvann när Stitch ströks (`BESLUT.md` 2026-10-15). Förslag: ett manifest ur `--help` för varje CLI som flödet använder, i `3-4` |
| 87 | Slentriangodkännande | 3-2, 2-9 |
| 88 | Högsta effort ger inget mer än hög | struken – dubblett av nr 39 (samma regel i 3-3) |
| 89 | Billig modell för säkerhetsgranskning | 3-3, 2-8 |
| 90 | Billiga modeller eskalerar i onödan | 3-3 |
| 91 | Fel upptäcks först vid grinden | 3-3 |
| 92 | En kunskapsbas utan struktur | 3-4 |
| 93 | Briefen som faktabas | 2-7, 2-1, 2-9 |
| 94 | Genererade bilder som ser äkta ut | 2-7 |
| 95 | Bilder utan känd källa eller licens | 2-7, 2-5 |
| 96 | Komponentbibliotek för funktionellt UI på en marknadsföringssajt | 2-4, 2-8, A |
| 97 | Skills installeras utan säkerhetskontroll | A |
| 98 | En skill som uppdateras automatiskt | A, 2-9 |
| 99 | Instruktioner i externt innehåll följs | 3-3, 2-1, 2-9 |
| 100 | Vaga fynd från granskarna | 3-2 |
| 101 | Det granskarna missar glöms bort | 3-4 |
| 102 | Ombyggnad tappar gamla URL:er | 2-2, 2-8 |
| 103 | Gammalt innehåll förs över obekräftat | 2-7, 2-2 |
| 104 | Instruktioner rensas för att en guide säger det | 3-4 (analysen: ≈ 13; egen regel) |
| 105 | Fel sorts körning för uppgiften (arbetsflöde eller `/goal`) | 3-1 |
| 106 | Planen i kontextfönstret glöms | 3-1 |
| 107 | Behörighetsregler utspridda över guiden | 3-1 |
| 108 | Riskfyllda beslut gissas eller stoppar i onödan | 3-1 |
| 109 | Antimönster som bara står som text | 2-5, 3-3 |
| 110 | En förvaltningsändring flyttar något ingen bett om | 2-9 |
| 111 | En `design.md` som agenten själv fyller på | 2-5, 3-3 |
| 112 | Olika versioner av byggsystemet på olika maskiner | 3-4 |
| 113 | Sajtspecifika regler i rot-`CLAUDE.md` | 3-4 |
| 114 | Ny version av byggsystemet till alla sajter på en gång | 3-4 |
| 115 | Agenten antar att ett okänt kommando är ofarligt | 3-3 (analysen: ≈ 10; egen rad i skyddshooken) |
| 116 | Hårda regler begravda mitt i `CLAUDE.md` | 3-4 |
| 117 | Skills skrivna efter hur man tror att man arbetar | 3-4, B |
| 118 | Exakta beskrivningar till Stitch | struken – Stitch stryks (`BESLUT.md` 2026-10-15) |
| 119 | Redesign med andras sajter som stilguide | 2-5, 2-2 |
| 120 | Lekfulla hinder före den primära handlingen | 2-3, 3-2 |
| 121 | Förvaltning ser om sajten fungerar, inte om den hittas | 2-9 |
| 122 | Ingen grundläggande SEO | 2-8 |
| 123 | Statistik som laddas före samtycke | 2-8, 2-2 |
| 124 | Kunders hemligheter i ett gemensamt förråd | 3-3, 2-8, 2-9 |
| 125 | Formulär som mejlar utan att spara | 2-8 (analysen: ≈ 42; egen regel) |
| 126 | Publicering direkt till produktion | 2-8, 2-9 |
| 127 | Förväxlingspaket med en känd skills namn | A |
| 128 | Tillval tas in på utlovade siffror | 3-2, 3-4, A |
| 129 | Text som avslöjar AI | 2-7 (analysen: ≈ 169 och 196; tre regler i samma avsnitt) |
| 130 | Att bygga på härledda fynd som om de vore fakta | 2-1 |
| 131 | Integrationer missas vid ombyggnad | 2-2 |
| 132 | `CLAUDE.md` från andra mappar laddas osynligt | 3-3 |
| 133 | En skill med trasig frontmatter syns aldrig | 3-4, B |
| 134 | Skills som styr *hur* i detalj | 3-4 (analysen: ≈ 13; egen regel) |
| 135 | En regel med en enda källa behandlas som säker | 3-2 |
| 136 | Råmaterialet sparas inte | 3-4 |
| 137 | Cachen kallnar mitt i en lång körning | 3-5 |
| 138 | Kundmöte med andra kunders data synlig | 3-5, 2-1 |
| 139 | Granskare av smak som aldrig kalibrerats | 3-2 |
| 140 | Att hoppa över steg i trappan | 4 |
| 141 | Hemligheter i klientkoden | 2-8, 3-3 |
| 142 | Spaghettikod genom förvaltningens ändringar | 2-9, 2-8, 3-4 |
| 143 | Samma kod genereras i varje bygge | 2-4, 3-4 |
| 144 | Överlappande beskrivningar av skills | 3-4, A, B |
| 145 | Utfallet rättas men inte processen | 3-4, 2-9 |
| 146 | Låg effort för roller som måste söka | 3-3 |
| 147 | Visuell granskning av en nedskalad helsidesbild | 3-2 |
| 148 | Statusrapporter utan belägg | struken – dubblett av nr 52 (samma regel i 3-1) |
| 149 | Att be modellen återge sitt tänkande | 3-4 |
| 150 | Skräddarsydda åtaganden som flödet inte klarar | 4, 2-2 (analysen: ≈ 43; egen regel) |
| 151 | En agent gör återbetalningar, raderingar eller avtalsändringar | 4, 3-1 |
| 152 | Säljutskick utan godkännande eller källa | 4 |
| 153 | Demosajt av en presumtiv kunds sajt utan avtal | 4, 2-2 |
| 154 | En självgående agent tolkar en uppgift med stor räckvidd | 3-1, 4 |
| 155 | Massutskick via agent till kundens kundlista | struken – dubblett av nr 154 (samma regel i 2-9, 3-1, 4) |
| 156 | Ändrade priser eller villkor publiceras utan godkännande | 4, 2-9 |
| 157 | Hela skills tas bort | 3-4 |
| 158 | Att bygga det kunden beställer utan att leta efter läckan | 2-1 |
| 159 | Värde mäts utan ett mål som kunden godkänt i förväg | 2-1, 2-9 |
| 160 | Research med en enda prompt | 2-1 |
| 161 | Research blir kundfakta | 2-7, 2-1 |
| 162 | Att aldrig fråga vilket perspektiv som saknas | 3-2 |
| 163 | En tolkning tillskrivs originalets forskningsresultat | 2-1 |
| 164 | En rörelsenivå som inte passar målgruppen | 2-6 |
| 165 | Byta modell efter en enda YouTube-jämförelse | 3-3 |
| 166 | Komponenter med okänd licens | struken – dubblett av nr 95 (licens per tillgång i 2-5) |
| 167 | Påhittade resultat i säljutskick | 4 (analysen: ≈ 38 och 180; egen regel) |
| 168 | Kompletterade personuppgifter utan information enligt art. 14 | 4 |
| 169 | Långa tankstreck (—) i svensk sajttext | 2-7 (analysen: ≈ 129; egen regel och kontroll) |
| 170 | Referenser och avvisningar utan motivering | 3-2, 2-1, 2-5 |
| 171 | Att sälja förvaltning utan ett första kvitto | 4 |
| 172 | Nisch utan belägg eller erfarenhet | 4 |
| 173 | Fler förfrågningar till ett företag som inte kan ta emot fler | 4, 2-1, 2-9 |
| 174 | Rabatt i stället för mindre omfattning | 4, 2-2 |
| 175 | För mycket text per sektion | 2-4, 2-7 |
| 176 | Generiska löften i stället för konkreta detaljer | 2-7 |
| 177 | Typsnitt, ikoner eller animationer med okänd licens | struken – dubblett av nr 95 (licens per tillgång i 2-5) |
| 178 | En standard-404 från ramverket | 2-3, 2-8 |
| 179 | En sajt med bara en startsida | 2-3, 2-2 |
| 180 | Påhittat socialt bevis | 2-7 (analysen: ≈ 38; egen regel) |
| 181 | Publicerade platshållare | 2-8, 2-7 |
| 182 | Sökord tas fram först efter lansering | 2-3, 2-1 |
| 183 | Bekräftelsemejl med formulärtjänstens standardtext | 2-7, 2-8, 4 |
| 184 | Avstängd e-postbekräftelse vid registrering i produktion | 2-8 |
| 185 | Publika förhandsadresser utan Access | struken – dubblett av nr 58 (samma regel i 2-8, 2-9, 3-5, A) |
| 186 | Försök att köpa en .se-domän hos Cloudflare | 2-8, 2-2 |
| 187 | Supabase utan överföringsbedömning (TIA) | 2-8, 2-2, A |
| 188 | Att lova kunden en "lagenlig" sajt | 2-2, 2-8, 4 |
| 189 | Isoleringshooks i pluginets agentdefinitioner | 3-3, 3-1, 3-4, A |
| 190 | Att räkna med mods före Claude Code 2.1.287 | 3-5, A |
| 191 | Staging som delar databas med produktion | 2-8 |
| 192 | Säkerhetsgranskning kör målets kod utan sandlåda | 3-3, 2-8, A |
| 193 | Bekräftelsemejl som går sönder i Outlook | 2-8 |
| 194 | Jämförelse mot förebild utan mätvärden | 3-2 |
| 195 | Text inbränd i video eller bild | 2-7 |
| 196 | Rubriker och knappar i versaler | 2-7, 2-5 (analysen: ≈ 129; egen regel) |

## Dubbletterna i analysen §6.3

Analysen nämner 14 grupper. Där guiden lagt numren i samma regel är de sammanslagna ovan (*struken – dubblett*). Där guiden har kvar två regler står båda kvar, med en anteckning:

| Grupp | I guiden |
|---|---|
| 39 = 88 (effort) | En regel i `3-3`; 88 sammanslagen |
| 52 ≈ 148 ≈ 40 (status utan belägg) | En regel i `3-1` (belägg); 148 och 40 sammanslagna |
| 58 = 185 (förhandsadresser) | En regel i `2-8`; 185 sammanslagen |
| 95 = 166 = 177 (licens) | En regel, licens per tillgång i `2-5`; 166 och 177 sammanslagna |
| 154 ≈ 155 (räckvidd, massutskick) | En regel, tillsynen i `2-9` och `3-1`; 155 sammanslagen |
| 13 ≈ 73 ≈ 104 ≈ 134 (inaktuella instruktioner) | 13 och 73 en regel i `3-4`; 104 (rensa bara efter mätning) och 134 (vad, men inte hur) egna regler |
| 23 ≈ 80 (lång kontext) | En regel i `3-1`; 80 sammanslagen |
| 76 ≈ 79 ≈ 81 (parallella agenter) | 79 och 81 en regel i `3-1`; 76 egen regel (avgränsade flottor) |
| 43 ≈ 150 (bygga för mycket) | Två regler: promptregeln i `3-3` och fasta paket i `4` |
| 3 ≈ 19 (mobil) | En regel i `2-4`; 19 sammanslagen |
| 129 ≈ 169 ≈ 196 (AI-signaturer i text) | Samma avsnitt i `2-7`, tre regler: kriterium, låst kontroll, granskningsförslag |
| 38 ≈ 180 ≈ 167 (påhittade fakta) | Tre regler: faktaregeln och socialt bevis i `2-7`, säljutkast i `4` |
| 10 ≈ 115 (radering, okända kommandon) | Två rader i skyddshooken, `3-3` |
| 42 ≈ 125 (formulär) | Två regler i `2-8`: formulärtestet och spara först |

## Inte intagna och fortfarande relevanta

Inga. De fyra som saknades i guiden före ommärkningen 2026-10-15 (granskningen 1.5) är nu intagna med nummer:

- **24** *Planfiler i JSON är svåra att granska* → `3-5-live-visning.md`, *Planvyn* [N2].
- **78** *Utlovat men aldrig byggt* → `3-2-granskning-och-kalibrering.md`, *Avstämning mot löftena* [N2]; `2-8` hänvisar dit.
- **120** *Lekfulla hinder före den primära handlingen* → `2-3-struktur.md`, granskningskriterium [N2], och som exempel i granskarens checklista i `3-2` [N1].
- **135** *En regel med en enda källa behandlas som säker* → `3-2`, regeln att fynd mot ett kriterium med en källa får högst allvaret `medel` [N1]; bänken i `README.md`.

Fallgroparna är inga regler i sig. Ett nytt problem som liknar en fallgrop rättas i den regel som tabellen pekar på.
