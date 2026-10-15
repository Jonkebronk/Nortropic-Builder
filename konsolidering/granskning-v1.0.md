# Granskning av guiden v1.0

**Status:** oberoende granskning 2026-10-15. Ögonblicksbild kl. 14.05; bilaga A, B och F och `n1-forsta-sajten.md` ändrades medan granskningen pågick. Inget i `guide/` är ändrat. Radnummer avser filerna vid ögonblicksbilden. Bilaga C och D finns inte än och är inte granskade.

Underlag: `konsolidering/skrivregler.md`, `BESLUT.md`, alla filer i `guide/`, `konsolidering/sparbarhet/`, `historik/IMPLEMENTERINGSGUIDE-v0.74.md`, konsolideringsanalysen (§4, §7, §8) och webb-pro-genomgången (§4).

Frågorna i uppdraget (1–9) står i hakparentes vid varje fynd.

## Det allvarligaste i korthet

1. **N1 är inte en första sajt i små steg** [6]. Cirka 320 N1-märkta punkter, ett 25-tal grindar och ett trettiotal N1-kontroller, mot analysens tio kontroller (§7.4). Biblioteket och tre fullständiga stilkit ska godkännas innan Johnny ser något av verksamhetens sajt.
2. **Byggplanen och lagerfilerna säger olika nivåer om samma sak** [1]. Gäller bland annat staging bakom Access, låsningen, kalibreringen, specialisterna och de schemalagda kontrollerna.
3. **Tre motsägelser i sak** [1, 4]: om sidkartan och rörelsebudgeten står i briefen, om Stitch får användas per kund (strider mot beslutet 2026-10-15) och vad *klart* betyder.
4. **Innehåll har tappats** [7]. Fem av 15 stickprov saknas helt. Fallgrop 24, 78, 120 och 135 nämns varken i guiden eller i spårbarheten, och rad 320–326, 335 och 340–347 i v0.74 saknar spårbarhetsrad.
5. **14 filer pekar på `bilaga-c-kontroller.md`**, som inte finns [3]. Därför är N1-kontrollerna inte definierade på ett ställe, och den genererade `n1-forsta-sajten.md` visar inte de tio N1-kontrollerna alls.
6. **15 öppna frågor som filerna hänvisar till saknas i bilaga E** [8].

---

## 1. Allvarligt

### 1.1 N1 är för stort [6]

**Räkning** (märkningen `[N1` i löptext, punktlistor och numrerade listor, plus tabellrader med nivå N1):

| Fil | `[N1]` | N1 i tabeller | Därtill |
|---|---|---|---|
| `1-kundens-vag.md` | 2 | – | |
| `2-1-strategi.md` | 22 | – | intervjuguide med 10 ämnen, 8 kärnfrågor, briefmall med 11 rubriker |
| `2-2-omfattning.md` | 26 | 5 | |
| `2-3-struktur.md` | 25 | – | standardsajt med 8 sidor |
| `2-4-skelett.md` | 34 | – | 13 sektioner med 17 varianter, 6 mallar |
| `2-5-yta.md` | 41 | – | 11 kitaxlar, 3 kit |
| `2-6-rorelse.md` | 18 | – | |
| `2-7-innehall.md` | 31 | 6 | |
| `2-8-teknik-och-kvalitet.md` | 32 | 10 kontroller | |
| `2-9-drift-och-forvaltning.md` | 2 | – | |
| `3-1-orkestrering-och-roller.md` | 17 | 12 | |
| `3-2-granskning-och-kalibrering.md` | 25 | – | 6 stopp |
| `3-3-sakerhet-och-installningar.md` | 14 | 2 | |
| `3-4-larande-och-underhall.md` | 13 | – | |
| `3-5-live-visning.md` | 5 | – | |
| `4-foretaget.md` | 2 | – | |
| `5-byggplan.md` | 1 | – | 8 filer före steg 1 |
| `bilaga-a-verktyg.md` | 9 | 23 | |
| `bilaga-b-skills.md` | 9 | – | 4 skillutkast |
| `bilaga-f-projektstruktur.md` | – | 17 sökvägar | |

Totalt finns cirka 320 märkta punkter och 35 tabellrader i lager-, flödes- och företagsfilerna. `n1-forsta-sajten.md` räknar 299, eftersom `konsolidering/bygg_n1.py` bara läser punktlistor (se 3.3).

**Grindar och kontroller i N1:** ett 25-tal regler kallas låst kontroll, grind eller *lyft – får vara grind*. Automatiska kontroller finns i sex filer: 10 i `2-8` (rad 132–143), 4 i `2-2` (rad 131–134), 4 i `2-3` (rad 99–102), 6 i `2-4` (rad 167–173), 1 i `2-5` (rad 147), 4 i `2-6` (rad 96–99) och 2 i `2-7` (rad 103, 107). Det blir ett trettiotal. Analysen §7.4 hade tio, och `2-8` rad 130 säger själv *"Bara kontroller som mäter något kunden märker (konsolideringsanalysen §7.4)"*.

**Mot webb-pros misstag** (`kunskap/research/2026-10-15_webb-pro-genomgang.md` §4):

- *Risk 1, maskinen före sajten*, kommer tillbaka som **biblioteket före sajten**. `5-byggplan.md` steg 2 kräver ett sektionsbibliotek som Johnny godkänner sektion för sektion och variant för variant (`2-4` rad 47, 95, 178), plus ett stilkit. Ett kit har elva axlar, en `design.md` med tio fält, en Stitch-utforskning med cirka tio varianter och en provsida med två verksamheters innehåll (`2-5` rad 20, 24, 43–50, 82). Steg 3 kräver två kit till. Johnny ser verksamhetens sajt först i steg 3. Före steg 1 ska åtta filer finnas (`5-byggplan` rad 17–26), bland dem kontrollskriptet och granskningsmallen, som används först i steg 4 och 5.
- *Planeringen före bygget är tung* (genomgången, *Fler risker*). I N1 ingår intervjuguidens tio ämnen, research i register och sociala medier, MoSCoW för varje sida, sektion och funktion, 10–15 trianguliserade toppuppgifter, söksträngar före sidkartan, sidkarta i Mermaid, 2–4 nyckelresor, wireframes för varje sidtyp med två alternativ för startsidan och texter skrivna före riktningarna.
- *Risk 5, verktygsladdning:* bilaga A har 23 rader på N1, bland dem Refero, Mobbin, 21st.dev, godly, Land-book, Coolors, sex sektionsgallerier, typsnittskällor, Googles stitch-skills, Stitchs bildgenerator, Chrome DevTools MCP och Skill Spector.
- *Rören:* ett trettiotal N1-kontroller, fasta JSON-fält per fynd (`3-2` rad 33), `state.json` med sex fält, överlämningsfiler per steg, låsning med `git diff` (`3-1` rad 18, 32, 125) – medan Johnny enligt analysen §7.3 tittar på hela bygget och det sker interaktivt.
- Rättat jämfört med webb-pro: eval mäter Johnnys dom (`3-2` rad 105), det finns en granskare (`3-2` rad 28), Johnnys ord blir inte regler (README princip 10) och varje steg ger något att se (`5-byggplan`).

**Slutsats:** N1 som helhet är inte en realistisk första sajt i små steg (beslut 2026-10-13). Det är ett välordnat register där nästan allt fått etiketten *första sajten*.

**Förslag, flytta till N2:**

| Fil, rad | Nu i N1 | I N1 i stället |
|---|---|---|
| `2-1` 14 | Research i register, sociala medier och omdömen före samtalet | Läs kundens sajt och Google-profil |
| `2-1` 47–60 | Intervjuguidens tabell A–J med fem kolumner | De 8 kärnfrågorna (rad 64–71) |
| `2-1` 92–113 | Briefmall med 11 rubriker | 6 rubriker: sammanfattning, nordstjärna, besökare, primär handling, ton, får inte påstås |
| `2-2` 20 | Triangulerade toppuppgifter, 10–15 rangordnade | Ägaren nämner 3–5 |
| `2-2` 24, 131 | MoSCoW per sida, sektion och funktion; automatisk kontroll | "Inte nu"-listan (rad 25) |
| `2-3` 32 | Mermaid | Tabellen |
| `2-3` 73, 99, 101, 102 | 2–4 nyckelresor; kontroller för föräldralösa sidor, sidkarta mot faktabas och klickdjup | En nyckelresa (= `2-8` kontroll 4) |
| `2-4` 28–45 | 13 sektioner, 2 varianter för tre av dem | De sektioner som start, en tjänst och kontakt behöver, en variant var |
| `2-4` 95, 97, 99 | Provsida i fyra bredder × varianter × kit; värsta fall; isolerade agenter och kritiker per variant | Provsida i 375 och 1280 px |
| `2-4` 117–120 | Wireframes för varje sidtyp, två startsidealternativ | Riktningarna visar startsidan (som bilaga B rad 49) |
| `2-4` 170–173 | Utan JS, överlapp, skelettplan som automatiska kontroller | Johnny ser sajten |
| `2-5` 20, 24 | 11 kitaxlar; `design.md` med 10 fält | Färg, typsnitt, avstånd, radie; kort `design.md` (personlighet, typsnitt med licens, referenser) |
| `2-5` 49, 81–84 | Provsida med två verksamheters innehåll; fyra av sex Stitch-regler | Stitch på provsidan i dator och mobil |
| `2-6` 27–33 | Tre budgetnivåer | Bara *sparsam* i N1 |
| `2-7` 12, 47, 48 | Tre metadatafält per faktapost; bildbeställning med minst tre bilder per kategori; sex fält per bildpost | `kalla` per faktum; källa och licens per bild |
| `2-8` 71–80 | Publiceringen | Märk *N1 om sajten publiceras* (bilaga E 1.3), som bilaga A redan gör |
| `2-8` 76, 116 | CSP med hashar; Lighthouse CI pinnad; Chrome DevTools MCP | `_headers` med grundhuvudena; Playwright och axe |
| `3-1` 9, 18, 32, 113–118, 125 | Byggare som delagent per steg; `state.json`; överlämningsfiler; låsning i lager 1 | Interaktiv huvudsession, granskaren som enda delagent, `progress.md` med tid per steg |
| `3-2` 33–40 | Fynd som JSON med nio fält | Markdownlista: element, förväntat, faktiskt, allvar |
| Bilaga A | 23 rader på N1 | Stitch-CLI, Inspo, Astro, Playwright, axe, Lucide; Cloudflare och GitHub om sajten publiceras |
| Bilaga B 21 | `writing-for-agents` | Hör ihop med skills, som är N2 |

**Förslag till regel** i `guide/README.md` under *Nivåer*: *"N1 har högst 60 punkter och högst tio kontroller (konsolideringsanalysen §7.4). En ny N1-punkt kräver att en annan flyttas till N2."*

### 1.2 Byggplanen och lagerfilerna säger olika nivåer [1]

| Sak | Säger | Säger emot | Förslag |
|---|---|---|---|
| Staging bakom Access | `5-byggplan` 43 (steg 6), `2-8` 72: N1 | `5-byggplan` 54: N2 | I raden för N2 i `5-byggplan`: "staging bakom Access" → "staging med egna databasresurser" |
| Låsning av brief och kontroller | `3-1` 115–118, 125: N1 | `5-byggplan` 54: N2 (som analysen §7.3) | Sätt N2 i `3-1` (Johnny tittar i N1) |
| Kalibrering | `3-2` 117 och `5-byggplan` steg 5: N1; `3-2` 118–131: N2 | `5-byggplan` 55: N3 | `5-byggplan` 55: "kalibrering när Johnnys domar finns" → "omkalibrering vid modellbyte (3-2)" |
| Specialistgranskare | `3-2` 46: N2 | `5-byggplan` 56: N4 | Flytta till raden för N2 i `5-byggplan`, med villkoret ur `3-2` |
| Schemalagda kontroller | `2-9` 17–24, `5-byggplan` 55: N3 | `5-byggplan` 44 (steg 7, N1): "Schemalagda kontroller och rapporten"; `2-8` 167: N4 | `5-byggplan` 44 → "Rapporten, gjord för hand med Claude (`2-9`)"; `2-8` 167 `[N4]` → `[N3]` |
| Visuell regression | `2-9` 55, bilaga A 141: N3 | `2-8` 167: N4 | N3 |
| Designad 404 | `2-3` 26: N1 | `4-foretaget` 30: N2 | `4` 30: ändra till en hänvisning till `2-3` |
| Scrollytelling som tillval | `2-6` 67: N2 | `4-foretaget` 34: N3 | Samma nivå; hemvisten är `2-6` |
| Konton i kundens namn | `2-2` 61, `2-8` 26, `3-3` 27: N1 (Cloudflare) | `2-2` 68: N3 | `2-2` 68: "[N3] Kontona ligger på kundens namn" → "[N1] för Cloudflare och domän, [N3] för övriga konton" |
| `/security-review` | `2-8` 88: N1 | Bilaga A 236 och `3-3` 107: N2 | Välj en nivå |
| Monitor | `3-3` 76: N2 | Bilaga A 241: N4 (kolumnen *Var* säger `3-1`, regeln står i `3-3`) | N2, Var = 3-3 |
| Funktionslistan `checkpoints.json` | `3-1` 19: N2 | Bilaga B 109: N4 | N2 |
| Varianter av isolerade agenter och kritiker | `2-4` 99: N1 | `2-5` 51, 57–61: N2, och "används … för layoutvarianter (→ 2-4)" | N2 |
| Blickprov, femsekunderstest | `2-4` 172, `2-7` 30: N1 | `2-5` 159: N2 | Se dubbletter (2.2) |
| Agenten som orsakat en avvikelse rör inte baslinjen | `2-8` 174: N2 | `2-9` 55: N3 | N3 (gäller förvaltningen) |
| Kontroller åldras | `3-4` 31: N2 | `3-2` 22: N3 | Se dubbletter |
| `fakta/` med en fil per faktum | `2-7` 16: N3 | Bilaga F 49: N2 | N3 |
| `public/_headers` | `2-8` 76, 105: N1 | Bilaga F 59: N2 | N1 |
| `progress.md` | `3-1` 18: N1 | Bilaga F 60: N2 | N1 |
| Låsning av `CLAUDE.md` | `3-4` 39: N1 | `3-1` 120: N2; bilaga E 2.3: öppen | Se 1.3, punkt 8 |
| Stjärnor och kostnad i tre lägen | Bilaga A 22–23: N1 | `2-2` 34–35: N2 | N2 |
| Integritetspolicy och tacksida | `2-3` 22–24: N1 i standardsajten | `2-8` 62, 108: N2 (med formulär); formulär N2 (`2-8` 43) | `2-3`: märk tacksidan "bara med formulär"; avgör om policyn behövs utan formulär |

### 1.3 Motsägelser i sak [1]

1. **Sidkartan i briefen.** `2-1` 115: *"Inte i briefen: sidkarta (→ 2-3)"*. Mot det står `2-3` 32 (*"Den skrivs som Mermaid-diagram plus tabell i briefen"*) och bilaga B 38 och 57 (*"brief.md … med primär handling och sidkarta"*, *"briefen med sidkarta"*). Förslag `2-3` 32: "i briefen" → "i `sites/<namn>/sidkarta.md`"; bilaga B 38 och 57 likaså; lägg filen i bilaga F.
2. **Rörelsebudgeten i briefen.** `2-1` 115 räknar *rörelsebudget* till det som inte står i briefen. Mot det står `2-6` 25 (*"Budgeten sätts i briefen"*), 65, 80 och 112 och `2-5` 91. Förslag: stryk "rörelsebudget (→ `guide/2-6-rorelse.md`)" ur `2-1` 115 och lägg till i briefmallens avsnitt 7: "Ton och intryck – …, rörelsebudget (sparsam, måttlig eller expressiv)".
3. **Vad *klart* betyder.** README 63 (princip 1) och `5-byggplan` 5: *"Ett steg är klart när Johnny dömt resultatet, inte när kontrollerna går igenom."* Mot det står `3-2` 13: *"En kontroll avgör om ett steg är klart"*. Förslag `3-2` 13: "avgör om ett steg är klart" → "avgör om ett steg är redo för Johnnys dom".
4. **44 px.** `2-4` 168 lägger *"Nortropics nivå … 44 × 44 px (kartan)"* i en punkt som heter *Låst kontroll*. `2-8` 37 säger att 44 px *"får stå som granskningskriterier, inte som kontroller"*. Förslag: dela `2-4` 168 i "Låst kontroll: klickytor minst 24 × 24 CSS-px (2.5.8)" och "Granskningskriterium: 44 × 44 px för knappar, menyknappen och fristående länkar (kartan; 2.5.5 är AAA)".
5. **Lucide och Inter.** `2-5` 29 (*"Lucide som standard"*) och bilaga A 58 (*"N1, standard i kiten"*) står mot `3-3` 57 (*"Om de ska vara standard i stilkiten är öppet"*). Antingen stryks "är öppet" i `3-3`, eller så blir det "Lucide som förslag" i `2-5` och frågan förs in i bilaga E.
6. **Visningsbredderna.** `2-4` 95 har 320, 375, 768 och 1280; `2-4` 171 har 375, 768, 1280 och 1920; `3-2` 30 har 375, 768 och 1280; `2-8` 136 har 320 och 375. Förslag: en uppsättning i bilaga C, till exempel *320 (bara reflow), 375, 768, 1280; 1920 från N2*, och hänvisningar dit från de andra filerna.
7. **Vad Johnny ser i steg 2.** `1-kundens-vag` 14 och `2-3` 84 säger sidkarta och söksträngar. `3-2` 79 (stopp 2) säger sidkarta och kontroller. `2-4` 120 lägger wireframes i *"kundens väg, steg 2"*. Förslag `1-kundens-vag` 14: "Sidkartan och de viktigaste söksträngarna" → "Sidkartan, söksträngarna och varje kontroll i en mening"; wireframes enligt 1.1.
8. **`CLAUDE.md`.** `3-4` 39 (N1) säger *"Johnny godkänner varje ändring"*, `3-1` 120 låser filen först i N2 och bilaga E 2.3 kallar frågan öppen. Förslag `3-4` 39: inled med "Förslag tills Johnny avgjort fråga 2.3:".
9. **Riktningarnas omfång.** Bilaga B 49 säger *"startsidan i tre stilkit"*. `2-5` 92 säger *"på samma sidor"* och `2-4` 120 *"samma wireframes med tre stilkit"*. Förslag: startsidan i N1; ändra `2-4` 120 till det.
10. **Granskaren i det första bygget.** I `5-byggplan` 41–42 byggs sajten i steg 4 och granskaren först i steg 5. `1-kundens-vag` 17 och `3-2` 42 (N1) förutsätter att granskaren körs i bygget. Förslag: lägg till i `5-byggplan` steg 4: "Utan granskare; Johnny dömer direkt. Från steg 5 gäller `3-2`."
11. **Grinden för briefen.** `2-1` 132 gör kundens bekräftelse till grind. `3-1` 52 (grindtabellen) kräver bara Johnnys godkännande. Förslag `3-1` 52: "Johnnys godkännande" → "kundens bekräftelse och Johnnys godkännande".
12. **"Byrån står på steg 3"** (`4-foretaget` 13) går att läsa på två sätt: filen har två trappor, och i tjänstetrappan (rad 42–46) är steg 3 förvaltning. Meningen går också emot *"De första sajterna byggs utan betalning"*. Förslag: "Byrån står på steg 3." → "Byrån siktar på steg 3, sälja till företag; de första sajterna är steg 1–2."
13. **Kundens referenser** står i `2-5` 137 under *"Designkällor när kit tas fram, aldrig i kundbygget"*, men de finns bara per kund och styr valet av kit (`2-5` 91). Förslag: flytta raden till *Tre riktningar*.
14. **Inställningar som avgörs fast frågan är öppen.** `3-3` 85 sätter `askUserQuestionTimeout` till *never* i N1, och `3-3` 86 säger *auto mode i N2*. Bilaga E §3 räknar båda som öppna. Förslag: märk dem "förslag" i `3-3`.

### 1.4 Avvikelser från BESLUT.md [4]

1. **Stitch vid kundbygge** (2026-10-15, "Stitch inom stilkit"):
   - `2-5` 35: *"[N2] Vid ombyggnad kan Stitch importera färger och typografi från kundens egen sajt"*.
   - `2-5` 108: *"[N2] Redesign med skärmdump i Stitch är tillåten med kundens egen sajt"*.

   Båda strider mot beslutet, mot `2-2` 51 (*"gäller inte längre"*) och mot `2-5` 83 (*"inget kundinnehåll skickas till Stitch"*). Förslag `2-5` 35 → "[N2] Vid ombyggnad läses kundens färger och typsnitt ur sajtens beräknade stilar med Playwright och blir accent och godkända avvikelser i `sites/<namn>/design.md`." Stryk `2-5` 108.
2. **Små steg** (2026-10-13). N1 är för stort (1.1), och förberedelserna kräver osynlig mekanik före steg 1 (`5-byggplan` 17–26). Förslag: flytta *kontrollskript* och *granskningsmall* från tabellen *Filer som behövs innan steg 1* till steg 4 och steg 5.
3. **Flödet först med synligt resultat:** följs i `5-byggplan` och `3-1` 14. Undantaget är formuleringen i `3-2` 13 (1.3, punkt 3).
4. **Affärsbeslut som saknas i BESLUT.md.** `4-foretaget` 13 (*"[N1] De första sajterna byggs utan betalning"*) är Claudes regel ur en källa men styr den första kundrelationen. Förslag: märk den "Claudes förslag" och lägg frågan i bilaga E 1.1.
5. **Följs:** Johnny ser riktningarna först och sedan kunden (`1` 15, `2-5` 94–95, `3-2` 80, bilaga B 47). Flersidig sajt som standard (`2-3` 11). Intervjuande AI med kunden och öppna frågor (`2-1` 13–17). Förvaltningen som produkt (`2-9` 5, README 7). Cloudflare (`2-8` 20). Claude Design inte designmotor (`2-5` 13, bilaga A 65). Referensregeln skriven som skrivreglerna kräver (`2-5` 105).

### 1.5 Tappat innehåll – stickprov [7]

| # | Regel i v0.74 (rad) | I v1.0 |
|---|---|---|
| 1 | Granskaren med färsk kontext (§5.2, 781–) | Ja, `3-1` 77 |
| 2 | Skyddshooken stoppar radering utanför sajtens mapp (§7.3) | Ja, `3-3` 43 |
| 3 | Körbara kontroller skrivs före bygget och ska fallera (§10.3) | Ja, `3-2` 18 |
| 4 | 301 utan kedjor vid ombyggnad (fas 0b) | Ja, `2-2` 46 |
| 5 | Ärlighetsregeln för bilder (§11.9) | Ja, `2-7` 49 |
| 6 | Mallen kräver inget samtycke (§11.10) | Ja, `2-8` 60 |
| 7 | Förhandsadressen bakom Access (fas 7) | Ja, `2-8` 72 |
| 8 | "Ändra bara filerna i uppdraget" (§8.6) | Ja, `3-3` 123 |
| 9 | Kalibrering med TPR och TNR, frusen prompt (§9.6) | Ja, `3-2` 119 |
| 10 | Hög risk går till Johnny i ärendeagenten (§15.2) | Ja, `4` 60 |
| 11 | **Adversarial granskning av planen**, angripare med högst 3 omgångar (fas 1b, 340–345) | **Nej.** Ingen spårbarhetsrad. Bilaga B 115 hänvisar "angripare" till `3-1` och `3-2`, men ordet finns inte där. |
| 12 | **"Är planeringen för tung?"**, smal variant prövad i eval (fas 1b, 320–324) | **Nej**, ingen spårbarhetsrad. Det är det enda stället i v0.74 som prövar planeringens storlek – relevant för 1.1. |
| 13 | **Lekfulla hinder före den primära handlingen** (fas 6, 540; fallgrop 120) | **Nej.** Spårbarheten för `2-3` (rad 15) och `3-2` (rad 39) skickar den till `2-6`, men den finns inte där. |
| 14 | **Avstämning mellan löften och resultat** (fas 7, 615; fallgrop 78) | **Delvis**, `3-2` 95: "vad som inte blev av". Spårbarheten för `2-8` (rad 57) och `2-8` 84 hänvisar till `3-2`, men där saknas den isolerade avstämningen mot brief och beslutskarta. |
| 15 | **Spritt pass för kantfall**, sex perspektiv (fas 1b, 325) | **Delvis.** Bara *innehåll i värsta fall* (`2-4` 97). Resten skickas av spårbarheten för `2-4` (rad 11) till `3-1`, `3-2` och bilaga C, men finns inte där. |

Därtill:

- **Planvyn** (fas 1b, 326; fallgrop 24) hänvisas av bilaga B 110 till `3-5`, där den inte finns. Närmast kommer `3-5` 30, *"Utan mods"*.
- **Täckningstabellen** (fas 1b, 335) har ingen spårbarhetsrad. Den finns delvis i `3-1` 41, *"Inget släpps tyst"*.
- **Fallgroparna** 24, 78, 120 och 135 (*"En regel med en enda källa behandlas som säker"*) nämns varken i guiden eller i spårbarheten. Övriga 192 finns.
- **Spårbarhetsfil saknas** för `README.md` (v0.74 §1), `1-kundens-vag.md`, `5-byggplan.md` (§16), `bilaga-e-oppna-fragor.md` (§14) och `bilaga-f-projektstruktur.md` (§3). Skrivreglerna kräver en per fil.

Orsaken är att fas 1b delades på `2-3`, `2-4`, `2-5` och `3-2` utan att någon ägde resten. Kolumnen *flyttat till annan fil* kontrolleras inte mot målfilen.

**Förslag:**

- Lägg lekfulla hinder som granskningskriterium i `3-2`, i checklistans exempelrad om den primära handlingen.
- Lägg avstämningen mot löftena som [N2] i `3-2`, *Slutgranskningen*.
- Lägg den adversariala granskningen av planen och den smala varianten som [N4] i `3-2` *Eval*, eller stryk dem med skäl i en spårbarhetsrad.
- Lägg kantfallsperspektiven i bilaga C som [N2].
- Lägg planvyn i `3-5` 30.
- Kör en kontroll som för varje rad med *→ fil* i spårbarheten söker efter nyckelordet i målfilen.

---

## 2. Medel

### 2.1 Grindregeln [5]

README 94: låst kontroll eller grind kräver en norm eller två oberoende primärkällor.

1. **`2-8` 142, Lighthouse ≥ 90 (N1-kontroll 9).** Grunden anges som *"Lighthouses egen skala, 90–100 = Good"*, men bilaga A 135 säger *"Tröskeln 90 har en källa ($10K Website Kit)"*. Skalan beskriver färgband; den kräver inte 90. Förslag: kalla grunden "leverantörens dokumentation" i båda filerna och skriv i bilaga C att tröskeln är vald. Alternativet är att kontrollen rapporterar men inte stoppar.
2. **`2-7` 108, inget långt tankstreck, *"Låst kontroll, två källor"*.** Källorna är Nate Herks video (sex-färdigheter-videon, om engelsk AI-text) och Kunskapsbladet, en andrahandskälla där originalet inte är läst (`2-7` 29). Ingen av dem är en primärkälla för svensk typografi. Förslag: läs Språkrådets *Svenska skrivregler*; till dess "granskningsförslag (en källa – bänken)".
3. **`2-8` 139, platshållare stoppar publicering (N1-kontroll 6).** Grunden är en video (*"behålls, låg risk"*). Förslag: grunda den i faktakontrollen, som har tre källor – en platshållare är ett obekräftat faktum – och skriv det.
4. **`2-8` 135 (kontroll 2, *"Inga konsolfel; alla bilder laddas"*, bara 🔧) och `2-8` 140 (kontroll 7, *"en `h1` per sida … 🔧"*).** Grindar utan norm. Förslag: kalla dem kodstandard i bilaga C och märk dem uttryckligen som egna val, eller låt dem rapportera.
5. **Automatiska kontroller vars status inte framgår:**
   - `2-2` 131–132 (källa: kartan)
   - `2-3` 101 (🔧)
   - `2-4` 170 (*"en källa – bänken"*), 171 (🔧) och 173 (🔧)

   De står under *Kontroll* i N1 och kontrolleras automatiskt. Kommer de in i N1-skriptet blir de grindar (`5-byggplan` steg 4: *"Klart när kontrollerna går igenom"*). Förslag: skriv "rapporterar, stoppar inte" eller flytta dem till N2 (1.1).
6. **Bakväg via allvarsgraden.** I `3-1` 55 kräver grinden *granskning* att `hög` = 0, och i `3-2` 42 hindrar `hög` att steget blir klart för Johnny. Kriterier med en källa – *Fem tecken på AI-slop* (`2-5` 156) och femsekunderstestet (`2-4` 172) – kan ge `hög` och fungerar då som grindar. Förslag i `3-2` 41: "Fynd mot ett kriterium med en källa får högst allvaret `medel`."
7. **`2-3` 100, nyckelresor som låst kontroll.** Loop-videon och Coding Sloth-videon stöder *körbara kontroller före bygget* (analysen §4.3), inte nyckelresor i mobil- och datorbredd. Det håller, men skriv: "två källor för körbara kontroller; resorna är egen tillämpning 🔧".
8. **Håller:** `2-1` 132 (GOV.UK och Anthropics `smb-onboard`), `2-5` 147, `2-6` 96–97, `2-7` 103 och 107, `2-2` 133, `3-1` 39, 77 och 111 och `3-2` 18.

### 2.2 Dubbletter som bryter "en plats per sak" [2]

| Regel | Fullt beskriven i | Förslag till hemvist |
|---|---|---|
| Jämförelse mot förebild i siffror (samma exempel −0,01em/−0,03em, fallgrop 194) | `2-5` 158, `3-2` 53 | `3-2`; `2-5` hänvisar |
| Inget förvaltningsavtal utan nordstjärna, "kravet ligger på avtalet, inte på briefen" | `2-1` 88, `4-foretaget` 48 | `2-1` (skrivreglerna, D26); `4` 48 → "Förvaltningsavtal kräver nordstjärna (→ `2-1`)" |
| Femsekunderstest och blickprov | `2-4` 172, `2-5` 159, `2-7` 30 | `2-4`; övriga hänvisar |
| Tillsyn efter konsekvens och räckvidd, med rabattkodsincidenten | `2-9` 71–82 (tabell), `3-1` 107 | `3-1` (roller och behörigheter, D1/D27); tabellen flyttar dit |
| Variate publiceras aldrig (`up`/`end`, markören) | `2-5` 100–101, `3-5` 19–20, `2-8` 83 | Verktyget i `3-5`, kontrollen i `2-8`; stryk ur `2-5` |
| Kontroller åldras och förnyas (fallgrop 74) | `3-2` 22, `3-4` 30–31 | `3-4` |
| Arkitekturgranskning kvartalsvis med Pococks skill | `2-9` 23, `3-4` 78 | `2-9` (kundsajter); stryk raden i `3-4` |
| Innehåll skilt från design (Websites for Normal People) | `2-4` 52, `2-7` 20, `2-8` 23 | `2-7` (texter) eller `2-4` (komponenter); en av dem |
| Inget UI-komponentbibliotek, marknadsförings-UI (fallgrop 96) | `2-4` 22, `2-8` 22 | `2-4` |
| HTML först och utan JavaScript | `2-4` 56, 98, 170, `2-6` 11, 98, `2-8` 24 | `2-4` 56 som regel, `2-8` som kontroll |
| Sektion för sektion i full upplösning (fallgrop 147) | `2-5` 157, `3-2` 30 | `3-2` |
| Antimönster per kit; Inter, Geist och Lucide | `2-5` 26, `3-3` 57 | `2-5`; `3-3` behåller bara vaktens mekanik |
| Stjärnor är inte passform (fallgrop 65) | `2-2` 35, bilaga A 22, `3-4` 83 | Bilaga A, urvalskriterierna |

### 2.3 Trasiga hänvisningar [3]

1. **`bilaga-c-kontroller.md` finns inte.** Den hänvisas till från README 37 och 94, `2-3` 97, `2-4` 165, `2-7` 99, `2-8` 126, `3-1` 46, `3-2` 12, `3-3` 28, `3-4` 31, `5-byggplan` 25, bilaga A 130, bilaga B 75 och 117 och bilaga F 24. **`bilaga-d-fallgropar.md`** finns inte (README 38, bilaga B 18). Skrivs de, måste bilaga C avgöra vilka av de ett trettiotal N1-kontrollerna som är N1 (1.1).
2. **`2-9` 34:** *"(planens steg 7)"* → "(`5-byggplan.md`, steg 7)".
3. **`2-8` 104:** *"404-sidans utformning → `2-5`"*. Den står i `2-3` 26 och `2-4` 113. → "→ `2-3`, `2-4`".
4. **`2-8` 84:** *"Avstämningen mellan briefens löften och den färdiga sajten → `3-2`"* – finns inte där (1.5, punkt 14).
5. **`2-8` 100:** *"Kantfallen → `2-2`"* – ordet finns inte i `2-2`. Spårbarheten för bilaga A (rad 41) skickar kantfallen för bokning till `2-1`, där de inte heller finns.
6. **`2-8` 174:** *"→ `3-1`"* för att agenten som orsakat en avvikelse inte får uppdatera baslinjen – `3-1` nämner inte baslinjen.
7. **Bilaga B 110 och 115:** planvyn → `3-5` och angripare → `3-1`, `3-2` – finns inte (1.5).
8. **`4-foretaget` 64 och 68:** *"`karta/9`"* är inget filnamn → `karta/9-drift-forvaltning.md`.
9. **`3-1` 126:** `scripts/godkann-kontroller.mjs`, men bilaga F 24 har mappen `skript/`.
10. **`2-4` 136:** *"`bilaga-e-oppna-fragor.md`, avsnitt 4"* om layoutvarianter med Stitch. Avsnitt 4 frågar om wireframes, inte om layoutvarianter till biblioteket.
11. **Platsen för `historik/`.** README 120, bilaga F 32 och rotens `README.md` och `CLAUDE.md` säger att `historik/` innehåller kartan och principerna. De ligger i roten (`karta/`, `principer.md`). Guiden länkar dit 42 respektive 8 gånger. Flyttas de som texten säger går 50 länkar sönder; flyttas de inte är texten fel.
12. **Videornas kortnamn.** Guiden använder ett åttiotal kortnamn, men `kunskap/kallor.md` har ingen nyckel, trots README 106 (*"titel, datum och adress i `kunskap/kallor.md`"*). Det är tvetydigt:
    - *Skills-videon* (AI LABS, Variate) och *skills-videon* (Nate Herk) är olika videor och skiljs bara åt av versalen (`2-5` 100 mot `2-4` 23).
    - *repo-videon* och *Jack Roberts repo-video* kan förväxlas.
    - Det står inte vad *Jack Roberts-videon 2, 3 och 4* syftar på.

    Förslag: en kolumn *Kortnamn* i `kallor.md`.
13. **`n1-forsta-sajten.md`** saknas i README:s innehållstabell (rad 13–40).

### 2.4 Öppna frågor som saknas i bilaga E [8]

| Fil, rad | Fråga |
|---|---|
| `2-1` 143 | Omfattas Grounding Lite av Places-villkoren? |
| `2-2` 15, 144 | Vilka branscher får mall först? (Bilaga E §3 har bara "bransch, paket och priser" för nischen.) |
| `2-5` 53, 170 | Vilka kit, och hur många, i första varvet? |
| `2-5` 170 | Terrazzo och `[data-kit]` (teknisk fråga, hör till §4) |
| `2-5` 170 | Fontshares villkor och reserverade typsnittsnamn |
| `3-3` 57 | Inter och Lucide som standard i kiten (`LAGE.md`, öppen fråga 5) |
| `2-6` 114 | Vad budgetnivåerna tillåter |
| `2-6` 114 | Sidövergångar inom `no-preference` |
| `2-6` 114 | Remotion vid fler än tre anställda och i 5.0 |
| `2-6` 114 | Scroll Worlds licens (§3 nämner bara när tillvalet erbjuds) |
| `2-6` 60, 114 | Får kod från andras sajter kopieras? (Fråga 2.1 gäller design, inte kod.) |
| `2-7` 27 | Intervjuns form: text eller röst (`LAGE.md`, öppen fråga 4; 1.2 gäller vem som svarar) |
| `2-9` 36 | Förvaltningens huvudmått: nordstjärnan eller kontakterna från Google-profilen (karta-mot-guide, punkt 9) |
| `2-9` 49, `4` 64 | Prislistan som standardändring (kartans förslag) |
| `3-5` 19 | Variate och liknande verktyg i kundbygget eller bara i biblioteket (karta-mot-guide, konflikt 8) |
| `4` 7, 50 | Abonnemang eller trappa; eget betalt granskningssteg (karta-mot-guide, konflikt 9) |

Delvis täckta: `2-9` 130 (standardändringar utan Johnnys klick) av *Autonomi* i §3. `3-4` 40 och bilaga F 72 (var flödets `CLAUDE.md` ligger) av 2.3, som bara frågar vem som får ändra filen. Bilaga E §3 saknar dessutom två frågor ur v0.74 §14: planvyn och checkpointstorleken (den senare står som instruktion i `3-1` 33 och kan strykas med en rad).

---

## 3. Lågt

### 3.1 Språk och form [9]

- **Långa tankstreck:** inga i `guide/`, utom där strecket är ämnet (`2-7` 29 och 108). `kunskap/kallor.md` har 75 långa tankstreck, men den ligger utanför `guide/`.
- **Versaler som betoning:** inga. Versalorden är förkortningar och filnamn (WCAG, ITIL, `CLAUDE.md`).
- **Mallens fem rubriker:** finns i alla nio lagerfiler. I `2-1` 98–112 står briefmallens `##`-rubriker i ett kodblock, vilket är rätt för läsaren men läses fel av generatorn (3.3).
- **Hänvisningar till bilagor:** `2-9` (15 gånger) och `4-foretaget` (6 gånger) skriver "bilaga E" och "bilaga A" utan filnamn, medan övriga filer skriver `bilaga-e-oppna-fragor.md`. Förslag: samma form överallt.
- **Kortnamnen** stavas olika: *"4 Ways"-videon* och *4 Ways-videon*, *Mods-videon 2* och *mods-videon 2*.
- **Fet stil som betoning** av ett ord, t.ex. `4-foretaget` 9 (*"**en** källa"*), går emot klarspråksregeln utan att bryta skrivreglerna. Inget att ändra.

### 3.2 Övriga iakttagelser

- **`principer.md` i stället för README.** `2-4` 17, `2-5` 155, `2-6` 113, `2-9` 130, `3-2` 89 och bilaga B 12–13 hänvisar till `principer.md`, medan README 61 säger att principerna nu bor i README. → "README, princip N".
- **Integritetspolicyn utan formulär:** se 1.2, sista raden. Webbserverns loggar hos Cloudflare innehåller IP-adresser, så frågan behöver ett svar, inte bara en nivå.
- **Grill Me** står i bilaga A 203 som *"N1 som källa till `intervju`"* men i bilaga B 41 som *"bara kritiskt"*. Skillen intervjuar användaren, inte kunden. → N2, bara kritiskt.

### 3.3 Den genererade N1-filen

`konsolidering/bygg_n1.py` läser bara rader som börjar med `- [N1`. Därför saknar `n1-forsta-sajten.md`:

- de tio N1-kontrollerna i `2-8` (tabellen rad 132–143)
- kitprocessen i `2-5` 43–50 (numrerad lista)
- låsningen i `3-1` 125
- intervjuguiden och briefmallen (`2-1` 47 och 92, löptext)
- tabellraderna i `2-2`, `2-7`, `3-1` och `3-3`
- `5-byggplan.md` och bilaga A

Den som läser N1-sammanfattningen ser alltså varken kontrollerna eller kitarbetet, som är de mest konkreta delarna av N1.

Därtill:

- Skriptet läser `##` inne i kodblock som avsnittsrubriker (`2-1` 98–112).
- Det skriver avsnittsetiketten utan tom rad före, så att *\*Vad som kommer ut\** smälter ihop med föregående listpunkt (rad 31 i den genererade filen).

Förslag: läs också `^\s*\d+\. \[N1` och tabellrader med `| N1 |` eller `[N1]`, hoppa över kodblock och lägg en tom rad före varje etikett.
