# Spårbarhet: `guide/4-foretaget.md`

Skrivet 2026-10-15 vid konsolideringen. Radnummer avser `historik/IMPLEMENTERINGSGUIDE-v0.74.md`.

## v0.74 rad för rad

| v0.74-avsnitt (rader) | Var det hamnade | Struket och varför | Flyttat till annan fil |
|---|---|---|---|
| §15 ingress (2193–2195): maskinen och företaget, Nates tolkning av Dario Amodei | Ingressen; *Källäget*; varför-satsen i *Erbjudandet → Fasta paket* (⚠️ Nates tolkning kvar) | Videoreferatet (skrivreglerna: inga referat) | – |
| Filtret (2197): automatiserad försäljning och support kräver upprepbart erbjudande | *Erbjudandet → Fasta paket*, som varför | – | – |
| §15.1 ingress (2199–2200): självgående flöde förutsätter standardiserat erbjudande | *Erbjudandet → Fasta paket* | – | – |
| Fasta paket (2201), exemplen "enkel sajt, sajt med scrollytelling, förvaltning per månad" | *Erbjudandet*; standardprodukten enligt besluten 2026-10-13 och 2026-10-15 | Exempelpaketen ersatta av beslutet (flersidig sajt som standard, scrollytelling tillval) | Scrollytelling (N2) och Scroll World (N4) → `2-6-rorelse.md`; sidor per kund → `2-2-omfattning.md` |
| Bekräftelsemejlet (2202) | *Ingår i alla paket* | Jack Roberts-referatet ("enhetligt överallt") | Innehållet → `2-7-innehall.md`; HTML i mejl (tabellayout, inbäddad CSS, textversion, test i mejlklienter, ⚠️ testverktyg) och formulärtestet (fas 8a) → `2-8-teknik-och-kvalitet.md` |
| Designad 404 (2203) | *Ingår i alla paket*, sedan ommärkningen bara en hänvisning | Citatet "hur man gör en sak …" kortat till regeln | Regeln, fallgrop 178 och källan (Jack Roberts-videon 2) → `2-3-struktur.md` 26 (ommärkningen); kontrollen att gamla adresser inte ger 404 (fas 0b) → `2-2`; bygget → `2-4-skelett.md` |
| Interaktiv prisuppskattning (2204) | *Tillval* | Referatet om takbilden | Prislogiken i faktabasen → `2-7` |
| Varumärkesbok (2205) | *Tillval*; "tillsammans med `design.md` (fas 2)" ändrat till "ur det valda stilkitet" (beslut 2026-10-15, stilkit) | – | Stilkit → `2-5-yta.md` |
| Testbriefar per paket i eval (2206) | *Erbjudandet*, [N4] | – | Eval → `3-2-granskning-och-kalibrering.md` |
| Önskemål utanför paketen (2207) | *Erbjudandet* | – | Föreslå–besluta–låsa → `README.md` (D7) |
| "Hänger ihop med trappan … ett löfte vi inte kan hålla" (2208) | Principen bärs av *Trappan av insatser* och kundavtalets åtagande ("aldrig lagenlig") | Meningen struken som upprepning | – |
| Tjänstetrappan, Nates fyra steg och "betald kartläggning" (2210) | *Tjänstetrappan* | Steget "utbildning" (ingick inte i vår trappa redan i v0.74) och referatet | – |
| Trappans tabell (2211–2215) | *Tjänstetrappan*, tabellen med nivåer | – | Kontrollerna (fas 6c) → `2-8`; var kunderna tappas (fas 1) och nordstjärnan → `2-1-strategi.md` (D26); före-måttet (fas 0b) → `2-2`; jämförelse mot förebild i siffror (fas 6) → `3-2`. "Samma kontroller ger den personliga inledningen" → *Kundflödet* |
| "En sajt är inte er begränsning just nu" (2216) | *Tjänstetrappan* | – | Utbudsbegränsning (fas 1) → `2-1` |
| "Ett steg säljs bara till den som stått på steget under … inget bygge utan nordstjärna" (2217) | *Tjänstetrappan*: nordstjärnan blir krav på **förvaltningsavtalet** (sedan ommärkningen en hänvisning); nytt: *Byrån förvaltar bara sajter den har byggt* | "Inget bygge utan nordstjärna" struket: grind med en källa som stoppar en första sajt (konsolideringsanalysen §4.2) | Kravet på förvaltningsavtalet → `2-1-strategi.md` 88 (D26; ommärkningen) |
| §15.2 ingress (2219–2220): supportagenten i videon | *Ärendeagenten*, en mening | Referatet | – |
| Klasstabellen (2221–2225) | *Ärendeagenten*, tabellen | "Ändrade … priser" i rutinklassen struket: motsade hög risk-raden i samma tabell (se *Motsägelser*) | Ändringsbrief och kö (fas 8b) → `2-9-drift-och-forvaltning.md`; faktabasen (§11.8) → `2-7` (D15); personuppgifter (§11.10) → `2-2`, `2-8` |
| Priser, erbjudanden, juridiska texter aldrig utan godkännande (2226) | *Ärendeagenten* | – | Pilotfasen och stoppen → `3-2` (D12, D18) |
| Klarspråk, ASD-STE100, språklagen (2227) | *Ärendeagenten* (tillämpningen: hjälpguide, ärendesvar, rapporter) | Jack Roberts-referatet; språklagen (gäller offentlig sektor) | Klarspråksregeln → `2-7` |
| Agenten skickar aldrig själv; släpps enligt stoppens villkor (2228) | *Ärendeagenten*, [N3] och [N4]; nytt krav om AI-upplysning (AI-förordningen art. 50.1) | – | Villkoren för att släppa stopp → `3-2` (D18) |
| Inga behörigheter, behörighetsgräns (2229) | *Ärendeagenten*, pekare | – | Behörighetstabellen → `3-1-orkestrering-och-roller.md` (D27) |
| Ärendet sparas med klass och beslut (2230) | *Ärendeagenten* | – | Kalibrering → `3-2` |
| Ärendet är kundens innehåll, personuppgifter (2231) | *Ärendeagenten*: otrustad indata, avsändarkontroll (`karta/9`) | – | Extern text (§7.3) → `3-3-sakerhet-och-installningar.md`; personuppgifter (§11.10) → `2-2`, `2-8` |
| §15.3 ingress (2233–2234): Clay hittar företag, "ej skickat" | *Kundflödet*, ingress | Referatet | – |
| Utkast, aldrig utskick (2235) | *Kundflödet* | – | – |
| Kvitton, inte portfolio (2236) | *Kundflödet*; "samtycke" bytt till "kundens godkännande" (D4) | "Alla bygger dem nu" | – |
| Inga demosajter av presumtiv kunds sajt (2237) | *Kundflödet*, med motivering ur referensregeln som gäller tills vidare | – | Referensregeln → `2-5`; licensfrågan → `bilaga-e-oppna-fragor.md` 2.1 |
| Varje påstående har en källa (2238) | *Kundflödet*, kontrollen | – | Beläggmekanismen (§8.6) → `3-1` (D2) |
| ⚠️ Lagar (2239) | *Kundflödet*, kravet (sammanslaget med 2247) | – | Lagkrav → `2-2` |
| ⚠️ Clay tredjepartsverktyg, sponsrad (2240) | *Kundflödet*, ingress; *Källäget* | – | Prövning av verktyget (§12) → `bilaga-a-verktyg.md` |
| Metoden: Clay via MCP, kedja av leverantörer, 80–90 % mot 30 %, 50 mottagare för 12 dollar (2242) | *Kundflödet*, ingress i en mening | Siffrorna och MCP-detaljerna: sponsorns siffror, och verktyget hör till bilaga A | `bilaga-a-verktyg.md` |
| Företagets kontext som filer (2244) | *Kundflödet*, sista punkten, [N2] | – | Mappen `foretag/` → `bilaga-f-projektstruktur.md` |
| Personlig inledning ur mätbara signaler (2245) | *Kundflödet* | – | Kontrollerna → `2-8` |
| Faktakontroll av utkast (2246) | *Kundflödet*, kontrollen (två oberoende källor enligt analysen §4.3) | Exemplet kortat till en parentes | Faktakontrollen som regel → `2-7` (D15) |
| ⚠️ Lagar, preciserat (2247) | *Kundflödet*, kravet; "liknande domäner" → *Inga extra avsändardomäner* | – | Lagkrav → `2-2`; juridiken med jurist → `bilaga-e-oppna-fragor.md` §5 |
| §15.4 smärta, person, löfte (2249–2250) | *Nischen*; personen beslutad (2026-10-13), smärta och löfte som Claudes förslag | "Etablerade konkurrenter har redan kunder och kapital" (kortat; varför-satsen "ett brett löfte blir generiskt" räcker) | – |
| En nisch gör flödet bättre (2251) | *Nischen → Branschen väljs efter belägg* | – | Branschmallar → `2-2` |
| Nisch efter belägg (2252) | *Nischen*; gäller nu bransch inom den beslutade målgruppen | – | – |
| "Vilken nisch är ditt beslut" (2253) | *Beslut* i ingressen; branschen öppen | Delvis avgjord: målgruppen (2026-10-13 17:48) | Öppna delen → `bilaga-e-oppna-fragor.md` §3 |
| §15.5 räkneexemplet 499 dollar, 168 kunder (2256) | – | Videoreferat utan regel | – |
| Första målet: fem betalande kunder (2256) | *Enhetsekonomi* | – | – |
| Kostnad per sajt och förvaltningsmånad (2257) | *Enhetsekonomi*, [N2]; hostingkostnad tillagd ur researchen | – | Tidsmätningen → `1-kundens-vag.md`; loggen → `3-1` |
| Priset förankras i alternativet (2258) | *Enhetsekonomi* | – | – |
| Värdebaserat pris, 10 %, räkneexempel (2259) | *Enhetsekonomi*; räknefelet rättat (se *Motsägelser*); nytt 🔧: tak under golv = kunden passar inte paketet | – | – |
| Minska omfattningen, inte priset (2260) | *Enhetsekonomi* | "Rabatter lär kunden att priset går att pressa" (🔧-påstående utan källa) | – |
| Kostnad mot pris per paket (2261) | *Enhetsekonomi* | – | Effort och modeller → `3-3` (D5) |
| Värdet för kunden; "kunden betalar för beviset" (2262) | *Enhetsekonomi*, sista punkten | Citatet: oklart vilken video det kommer från | Nordstjärnan → `2-1`; förvaltningsrapporten → `2-9` |
| §5.4 stoppen och pilotfasen (835–845) | – | – | `3-2` (D12, D13, D18). Inte min del. |
| §5.4 trappan av insatser (846) | *Trappan av insatser* | Citatet om arkitekturfel kortat | – |
| "Vi står på steg 3" (847) | *Trappan av insatser*; sedan ommärkningen "Byrån siktar på steg 3, sälja till företag; de första sajterna är steg 1–2" (granskningen 1.3, punkt 12) | – | – |
| Pilotfasen börjar lägre i trappan (848) | *Trappan av insatser*, [N1]; nytt: pilotsajterna blir exempelsajter; sedan ommärkningen märkt *Claudes förslag – öppet* | – | Frågan → `guide/bilaga-e-oppna-fragor.md` (anroparen lägger in den) |
| Kundavtal utöver biträdesavtalet (849) | *Trappan av insatser*, utökat ur researchen 2026-10-14 | – | Lagkrav per kund → `2-2` |
| Säkerheten löses inte på rutin (850) | *Trappan av insatser*, pekare | – | `2-8` (D19), `3-3` |
| Uppdelningen människa/modell/regel (852) | – | – | `3-1`/`3-2`. Inte min del. |
| §14 öppen fråga "Nisch och paket" (2189) | *Beslut* | Delvis avgjord | `bilaga-e-oppna-fragor.md` §3 |
| §14 Förvaltning – nivå och ändringsflöde (2171, 2173) | Pekare via kundavtalet och ärendeagenten | – | `bilaga-e-oppna-fragor.md` §3, `2-9` |

## Fallgropar ur §13

Inlagda som *varför* i rätt regel: **140** (trappan av insatser), **150** (fasta paket), **151** (agenten skickar inget, ingen behörighet), **152** (utkast, aldrig utskick), **153** (ingen demosajt), **154** och **156** (priser och villkor aldrig utan godkännande), **155** (inga massutskick), **167** (kontrollen av utkast), **168** (GDPR art. 14 och avregistrering), **171** (tjänstetrappan), **172** (bransch efter belägg), **173** (en sajt är inte er begränsning), **174** (minska omfattningen), **178** (designad 404), **183** (bekräftelsemejlet), **188** (aldrig "lagenlig" i kundavtalet).

Inte här: 158 och 159 (läckan, mål godkänt i förväg) → `2-1`; 193 (mejl i Outlook) → `2-8`.

## Kartan, analyserna och researchen som använts

- `BESLUT.md`: nischen 2026-10-13 17:48 och Innebär-raden (förvaltningen är produkten); sajttyp och stilkit 2026-10-15; referensregeln från webb-pro (2026-10-03) under *Licenserna*.
- `karta/9-drift-forvaltning.md`: samma grund för alla kunder, avsändarlistan, kundmejl som otrustad indata, Nortropic som personuppgiftsbiträde.
- `kunskap/research/2026-10-15_kompetensluckor-anteckningar/lager-9-drift-forvaltning.md` §4: ITIL 4:s ändringstyper och förslaget att prislistan är en standardändring (se *Motsägelser*). ITIL-kopplingen stod i ett utkast men ströks för längdens skull; klasserna motsvarar standardändring, serviceförfrågan och normal ändring.
- `kunskap/research/2026-10-15_guide-konsolideringsanalys.md`: §3.2 punkt 5 (nischen beslutad), §4.2 (nordstjärnan som krav på förvaltningsavtalet), §4.3 (faktakontroll har två källor), §4.4 (VAULT-, 1-person- och 5000-timmarsvideon är en källa), §6.3 (fallgropar som hör till företaget), D2, D4, D15, D18, D26, D27.
- `kunskap/research/2026-10-15_karta-mot-guide.md`: konflikt 6 (licens och demosajter), 9 (abonnemang eller trappa, huvudmått), 10 (sajttyp, nu avgjord).
- `kunskap/research/2026-10-15_kompetensluckor-och-kandidater-per-lager.md`, lager 1: enskild firmas uppgifter är personuppgifter, Hitta.se:s villkor, Googles EEA-villkor för Places.
- `kunskap/research/2026-10-14_dataoverforing-och-analys.md` §5.3 (biträdesavtal, konton i kundens namn); täcker inte kalla utskick.
- `kunskap/research/2026-10-14_cloudflare-stack.md` §6 (konto per kund) och §8 (priser).
- `kunskap/research/2026-10-14_tillganglighetslagen.md` (åtagandet i avtal, inte "lagenlig").
- `kunskap/research/2026-10-14_ai-forordningen-och-rattigheter.md` (art. 50.1 för automatiska svar; avtalsklausuler om AI-material).

## Motsägelser och rättelser

1. **Priser i två klasser.** v0.74 har "ändrade … priser" som rutinändring och "Priser" som hög risk i samma tabell (2223, 2225). Löst till hög risk, i linje med regeln på rad 2226.
2. **Kartan mot v0.74 om prislistan.** Anteckningarna till lager 9 föreslår prislistan som standardändring (automatiskt godkänd). Guiden behåller hög risk tills kalibreringen visar att klassningen håller. Båda leden har en källa; Johnny kan avgöra.
3. **Räknefel i §15.5 (2259).** "Fem förfrågningar, en av fem blir affär" ger en affär i månaden: 1 × 2 000 × 12 = 24 000 kr, inte 2 × 2 000 × 12 = 48 000 kr. Rättat.
4. **"Inget bygge utan nordstjärna"** (2217) gjorde nordstjärnan till en grind på bygget med en källa. Flyttad till förvaltningsavtalet enligt analysen §4.2.

## Till bilaga E

`bilaga-e-oppna-fragor.md` saknar frågan ur karta-mot-guide konflikt 9: säljs sajt och förvaltning som **ett abonnemang** eller som **en trappa av steg** med betald sajtgranskning först, och redovisar förvaltningen **en nordstjärna per kund** eller **kontakter från Google-profilen**? `4-foretaget.md` hänvisar dit. Inte införd här, eftersom bilagan är en annan skribents fil.

## Längd

Källtexten (2193–2263, 846–850 och de berörda fallgroparna) är cirka 2 600 ord; `4-foretaget.md` är cirka 1 800 ord, alltså omkring 70 %. Målet på 40 % nåddes inte: videoreferaten är strukna, men beslutsuppdateringen, källäget och juridiken ur researchen (kundavtal, kalla utskick, AI-förordningen) är nytt innehåll som uppdraget krävde.

## Ommärkning 2026-10-15

Efter granskningen (`konsolidering/granskning-v1.0.md`) och tillägget kl. 14.30 i `konsolidering/skrivregler.md` (4 företaget: 0–1 N1-punkt).

### N1

| Före | Efter | Vad som hände |
|---|---|---|
| 2: *Trappan av insatser* ("De första sajterna byggs utan betalning") och tjänstetrappans tabellrad *2. Bygge* | 1: *Trappan av insatser*, märkt *Claudes förslag – öppet* (granskningen 1.4, punkt 4) | Tabellraden *Bygge* [N1] → [N2]: att sälja ett bygge förutsätter en betalande kund, och de första sajterna är egna sajter eller pilotsajter. Raden säger nu att flödet byggs i N1 på dem; själva flödet är N1 i `1-kundens-vag.md` och `5-byggplan.md`. |

Om Johnny bestämmer att den första sajten är betald blir raden *Bygge* N1 igen och punkten i *Trappan av insatser* stryks eller skrivs om.

### Granskningsfynd som åtgärdats

| Fynd | Åtgärd i 4-foretaget |
|---|---|
| 1.2 Designad 404 | [N2]-punkten ersatt med en hänvisning i löptext till `2-3-struktur.md` (där 26 är [N1]). Inget tappas: 2-3 har regeln, fallgrop 178 och källan (Jack Roberts-videon 2). |
| 1.2 Scrollytelling som tillval | [N3] → [N2], hänvisning till `2-6-rorelse.md` (2-6 67 är [N2]). **Avvikelse från uppdraget:** Scroll World fick en egen rad med [N4], eftersom 2-6 72 märker den [N4]; samma nivå N2 för båda hade gett en ny motsägelse. |
| 1.3 punkt 12 | "Byrån står på steg 3." → "Byrån siktar på steg 3, sälja till företag; de första sajterna är steg 1–2." |
| 1.4 punkt 4 | "De första sajterna byggs utan betalning" märkt *Claudes förslag – öppet, se `guide/bilaga-e-oppna-fragor.md`* (anroparen lägger in frågan). |
| 2.2 Nordstjärnekravet för förvaltningsavtal | Punkten → "[N3] **Förvaltningsavtal kräver nordstjärna** (→ `2-1-strategi.md`)". Två detaljer stod bara här: "baslinjen får mätas första månaden" täcks av `2-1` 86 ("Saknas baslinjen … mäts första månaden efter lansering"); källan 🎥 konsult-videon står i `2-1` 85 men inte i 88 – `2-1`:s skribent kan lägga den i 88. |
| 2.3 punkt 8 | `karta/9` → `historik/karta/9-drift-forvaltning.md` (ärendeagenten, avsändarkontrollen). På raden om prislistan pekar hänvisningen i stället på kartans underlag, `kunskap/research/2026-10-15_kompetensluckor-anteckningar/lager-9-drift-forvaltning.md`, fråga 4: kartan själv nämner inte prislistan, men standardkatalogen i underlaget gör det. |
| 2.4 Prislistan som standardändring | Hänvisar till `guide/bilaga-e-oppna-fragor.md`; tills dess är priser hög risk. |
| 2.4 Abonnemang eller trappa; eget betalt granskningssteg | Hänvisar till `guide/bilaga-e-oppna-fragor.md` (anroparen lägger in frågorna). Raden var en omärkt listpunkt och blev löptext. |
| 3.1 Bilagor med filnamn | 6 × "bilaga E" → `guide/bilaga-e-oppna-fragor.md`; licensbeslutet med "fråga 2.1", kalla utskick med "avsnitt 5". |
| Övriga hänvisningar | `README.md` → "`guide/README.md`, princip 9" (föreslå–besluta–låsa); `karta/9-drift-forvaltning.md` → `historik/karta/9-drift-forvaltning.md` (*Byrån förvaltar bara sajter den har byggt*). |

Omärkta listrader blev löptext: "Eget betalt granskningssteg …" och "Värdet för kunden mäts med nordstjärnan …".

Avsnittet *Till bilaga E* ovan gäller fortfarande; anroparen för in frågorna (abonnemang eller trappa, huvudmått, prislistan som standardändring, betalning för de första sajterna).
