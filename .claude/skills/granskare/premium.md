# Premiumkriterierna

Premiumpasset letar efter det som skiljer en sajt som håller från en som är **genomarbetad**: att uppgiften går att lösa, detaljfinish, slop, rörelse och gränssnittsfel. Kriterierna ger **fynd, aldrig dom** (SKILL.md, princip 1). Regler som redan bor i guiden står här som hänvisning (→), inte omskrivna.

Lagerskillsen har detaljerna och värdena: ytan i [yta/detaljer.md](../yta/detaljer.md), [yta/typografi.md](../yta/typografi.md) och [yta/generiskt.md](../yta/generiskt.md), rörelsen i [rorelse/granskning.md](../rorelse/granskning.md) och [rorelse/matt.md](../rorelse/matt.md), interaktionen i [skelett/interaktion.md](../skelett/interaktion.md) och tillgängligheten i [kvalitet/tillganglighet.md](../kvalitet/tillganglighet.md). Premiumpasset är granskarens snitt genom dem: det som syns i den byggda sajten. Krockar en rad här med en lagerskill gäller lagerskillen.

Varje rad: **id**, vad granskaren tittar efter, källan och **taket** för allvar. Taket följer `guide/3-2` (en källa ger högst `medel`) och vad besökaren förlorar. Belägget är alltid ett element i en skärmdump eller ett uppmätt värde.

## PU – uppgiften

Det besökaren kom för: kan hen göra det, steg för steg, och läser hen sidan i rätt ordning? Prövas i mobilen först, i 375 × 667 (en lägre telefon) och 375 × 812.

| Id | Titta efter | Källa | Tak |
|---|---|---|---|
| PU1 | **Kognitiv genomgång.** Gå den primära handlingen och varje toppuppgift i briefen steg för steg som en förstagångsbesökare i mobilen, och svara vid varje steg: försöker besökaren nå rätt sak här, ser hen att handlingen finns, kopplar hen den till det hen vill, och får hen begriplig återkoppling efteråt? Varje nej är ett fynd med steget och skärmbilden. Ett steg som lämnar sajten, som en extern bokning, slutar vid länken: står det vart den leder och vad som händer där? | 📄 Wharton, Rieman, Lewis och Polson 1994, *The Cognitive Walkthrough Method: A Practitioner's Guide* (i Nielsen och Mack, *Usability Inspection Methods*); 📄 Spencer 2000, *The Streamlined Cognitive Walkthrough Method* (CHI); webb-pros `GRANSKARE.md` (egen) | hög när handlingen inte går att slutföra, annars medel |
| PU2 | **Läsordningen.** I varje sektion är det största också det viktigaste, och den primära handlingen är det starkaste interaktiva elementet där den finns. Inget konkurrerar med den: en lika stark sekundärknapp, en accentfärgad dekor eller en navigation som drar blicken. Första skärmen prövas av blickprovet (→ `guide/2-4-skelett.md`, C34) | 📄 Anthropic, `design-critique` (*What draws the eye first?*, Apache-2.0); 📄 open-design, `critique` (*Visual hierarchy*, Apache-2.0) | medel |
| PU3 | **Rubrikerna bär sidan.** Läst ensamma säger sidans `h1` och `h2` vad verksamheten gör, var och vad besökaren kan göra eller få veta. En rubrik som bara är en etikett, eller som säger samma sak som rubriken före, är ett fynd | webb-pros `bygg-sajt`, steg 6 (*rubriktest*, egen); 📄 NN/g, Pernice 2019, *Text Scanning Patterns: Eyetracking Evidence* – en källa till metoden | medel |

## PF – detaljfinish

Det som syns först i full upplösning, sektion för sektion.

| Id | Titta efter | Källa | Tak |
|---|---|---|---|
| PF1 | **Rytm.** Samma mönster har samma avstånd: rubrik till innehåll, kortens inre luft, sektionsavstånd. Värdena kommer ur kitets skala, inte lösa px. Mät två instanser av samma mönster | 📄 Refactoring UI, *Establish a spacing and sizing system* (kommersiell, med egna ord); 📄 Vercel Web Interface Guidelines (MIT); → `guide/2-4-skelett.md` (`data-yta`), `2-5-yta.md` | medel |
| PF2 | **Linjering.** Varje element linjerar mot något: behållarens kant, rutnätet eller en granne. Ingen bild som flyter mitt i en kolumn medan texten är vänsterställd. Ikon och text i en knapp ser centrerade ut, inte bara är det | 📄 Vercel (*Every element aligns with something intentionally*; *Adjust ±1px when perception beats geometry*); 📄 Krehel, `better-ui` (*Align optically*) | medel |
| PF3 | **Typografisk finish.** Brödtext 45–75 tecken per rad. Rubriker utan ensamt sista ord och utan brytning inne i fasta uttryck (”leg. fysioterapeut”, ”Luleå och Piteå”). Ett tydligt steg mellan `h3` och brödtext. Versaler spärras 5–12 % | 📄 Bringhurst, *The Elements of Typographic Style* §2.1.2 (45–75, 66 som ideal); 📄 Butterick, *Practical Typography* (45–90; versaler); 📄 MDN, `text-wrap` (`balance`, `pretty`) | medel |
| PF4 | **Svensk mikrotypografi.** ”…” som citattecken, tankstreck utan mellanslag i intervall (9–18), klockslag med punkt (14.30), mellanslag i 10 000, 50 %, 450 kr, hårt mellanslag mellan tal och enhet, tabulära siffror där tider och priser står under varandra | 📄 Språkrådet, *Snabba skrivregler* (2024); 📄 Vercel (`tabular-nums`, hårt mellanslag) | låg |
| PF5 | **Bilder.** Inget foto kapas mitt i en person eller ett föremål i **någon** bredd (375, 768, 1024, 1280, 1440), inte bara i förstavyn. Ingen bild förstoras mer än cirka 1,4 gånger. Samma roll har samma bildförhållande och behandling över sajten | → `mallar/granskning.md`, fråga 3 (kapade foton); → `guide/2-5-yta.md` (1,4 gånger, G1); 📄 NN/g, *Photos as Web Content* | medel |
| PF6 | **Ikoner.** En familj, en eller två storlekar, samma synliga linjetjocklek bredvid samma textvikt. Ikonerna föreställer tjänsten | → `guide/2-5-yta.md` (sakliga ikoner, G2); 📄 Krehel, `better-ui/icons.md`; 📄 Hallmark, *slop-test* 30 (MIT) | medel |
| PF7 | **Ytor.** Inre radie plus utfyllnad är lika med yttre radie där ytor ligger i varandra. Skuggor i två lager eller inga. Kantlinjer få och lika för samma sorts kort på alla sidor | 📄 Krehel, `better-ui/surfaces.md`; 📄 Vercel (*Child radius ≤ parent radius & concentric*; två skugglager) – två källor | låg |
| PF8 | **Samma roll, samma form.** Knappar, fristående länkar, citat och kort ser likadana ut för samma roll på hela sajten. Samma detalj gjord på två sätt är ett fynd. Klart när dessa är jämförda över alla sidor: knappnivåerna (bara den primära handlingen är fylld accent), länkstilarna, tider och adresser (samma komponent, länkade överallt eller ingenstans), fotonas ram och sidornas slut | 📄 Nielsen, heuristik 4 *Consistency and standards* (NN/g); 📄 Krehel, `better-ui` (*The same detail done two ways*); 📄 Anthropic, `design-critique` (*Consistency*) | medel |
| PF9 | **Tillstånden syns.** Hover, tryck och fokus har tydligare kontrast än viloläget. Fokusringen syns direkt, utan att tonas in | 📄 Vercel (*:hover, :active, :focus have more contrast than rest state*); 📄 Hallmark, *slop-test* 15; fokusringens 3:1 → kontroll 8b (WCAG 2.2, 1.4.11) | medel |

## PS – slop

Bara mönster som kostar besökaren något. **Räknas inte som slop:** typsnittet Inter, en centrerad förstavy, konventionell ordning på sektionerna eller ett kortrutnät i sig. Kiten varierar ytan, inte konventionen (→ `guide/2-5-yta.md`; `BESLUT.md` 2026-10-15, *Astro statiskt; Inter och Lucide väljs per kit*).

| Id | Titta efter | Källa | Tak |
|---|---|---|---|
| PS1 | **Siffra eller påstående utan källa**, också dekorativ statistik ("15 års erfarenhet", "1 000 nöjda") som inte finns i `fakta.md` | → kontroll 5 (`kritisk`); 📄 Hallmark, *slop-test* 46; 📄 open-design, `craft/anti-ai-slop.md` (*Invented metrics*, Apache-2.0) | enligt kontroll 5 |
| PS2 | **Dekor utan innehåll.** Former, gnistor, glöd, mönster eller ikoner i cirklar som inte säger något om verksamheten | → `guide/2-5-yta.md` (G2); 📄 Hallmark, *slop-test* 45; 📄 open-design, `craft/anti-ai-slop.md` | medel |
| PS3 | **Accenten slutar peka.** Accent på dekor, eller accent som konkurrerar med den primära handlingen. Accentens andel av en vy mäts och rapporteras men är inget fynd så länge accenten bara ligger på handlingar (→ `yta/farg.md`; `BESLUT.md` 2026-10-16, *Motsägelserna i skillsen*) | → `guide/2-5-yta.md` (accenten är till för handlingar, G3); 📄 Hallmark, *slop-test* 23 (andelen som signal, cirka 5 % av en vy, inte som gräns); 📄 open-design (högst två synliga per skärm) | enligt `guide/3-2` |
| PS4 | **Mallfraser.** "Välkommen till", "Din partner för", "Läs mer" utan föremål, uppmaningar som inte säger vart de leder | → `mallar/granskning.md`, fråga 1–2; → `guide/2-7-innehall.md`; 📄 WCAG 2.2, 2.4.4 *Link Purpose* | medel |
| PS5 | **Överrad på varje sektion,** versaletiketter som upprepar rubriken under dem | 📄 Hallmark, `anti-patterns.md` (*Eyebrow on every section*) – en källa | låg |
| PS6 | **Kort i kort** eller kort med färgad kantlinje på ena sidan | 📄 Hallmark, *slop-test* 4–5; 📄 open-design, `craft/anti-ai-slop.md` (sin 5) – två källor | låg |
| PS7 | **Emoji som ikoner** eller två ikonbibliotek på samma sajt | 📄 Hallmark, *slop-test* 30; 📄 open-design (sin 3) – två källor | medel |

## PR – rörelse

Granskas på video i normal och snabb scroll, mobil och dator, med och utan `prefers-reduced-motion` (→ `guide/3-2`, *Rörelse granskas på video*). Policyn bor i `guide/2-6-rorelse.md`; här står vad granskaren tittar efter.

| Id | Titta efter | Källa | Tak |
|---|---|---|---|
| PR1 | **Reducerad rörelse.** Med `reduce` förflyttas, skalas, roteras och suddas ingenting. Opacitet och färg får stå kvar | → `guide/2-6-rorelse.md` (N1); 📄 WCAG 2.2, 2.3.3 | hög |
| PR2 | **Ingen text börjar osynlig.** Text syns i en skärmbild tagen direkt, utan JavaScript och med `reduce` | → `guide/2-6-rorelse.md` (N1) | hög |
| PR3 | **Rörelsen är motiverad och i budget:** den visar ett samband, ett tillstånd eller en kvittens. Sparsam är standard | → `BESLUT.md` 2026-10-15, *Rörelse – sparsam som standard*; 📄 Kowalski, `review-animations` (*Justified motion*) | medel |
| PR4 | **Tempo och kurva.** Gränssnittsrörelse under 300 ms, entré med ease-out, inga studsar eller översvängar på knappar, menyer och rutor | 📄 NN/g, Laubheimer 2020 (100–500 ms); 📄 Kowalski, `review-animations` (standard 3–4); 📄 Hallmark, *slop-test* 12. Utgången: → `guide/2-6-rorelse.md` (NN/g går före) | medel |
| PR5 | **Rätt egenskaper.** Bara `transform`, `opacity` och färg animeras, aldrig `transition: all` | → `guide/2-6-rorelse.md` (N2, statisk sökning); 📄 Kowalski (standard 7); 📄 Krehel, `better-ui` (*Transition only what changes*) | låg |
| PR6 | **Hover bara där det finns hover.** Hovereffekter ligger under `@media (hover: hover) and (pointer: fine)`, som i biblioteket, så att inget fastnar efter ett tryck på mobilen | 📄 Krehel, `better-ui` (*Hover effects only on hover-capable pointers*); 📄 Kowalski (standard 8) – två källor | medel |
| PR7 | **Täta handlingar animeras inte** eller högst cirka 150 ms: meny, flikar, knapptryck | 📄 Krehel, `better-ui` (*High-frequency interactions*); 📄 Kowalski (standard 2) | låg |
| PR8 | **Snabb scroll håller.** Inget som flimrar, hoppar eller dyker upp sent; sidhuvud och knapplist glider utan att täcka varandra; layoutskiftet är noll | → `guide/2-6-rorelse.md` (*Tjänar rörelsen innehållet?*); 📄 web.dev, *Cumulative Layout Shift* | medel |

## PG – gränssnittsfel

Det som går sönder i ett tillstånd. Prövas i webbläsaren: tangentbord, tryck, scroll och ändrad storlek.

| Id | Titta efter | Källa | Tak |
|---|---|---|---|
| PG1 | **Fasta element skymmer.** Sidhuvud, knapplist och samtyckesruta skymmer varken fokus, innehåll eller varandra, också efter en ankarlänk (`scroll-padding-top`) | 📄 WCAG 2.2, 2.4.11 *Focus Not Obscured (Minimum)*; → kontroll 3b; 📄 MDN, `scroll-padding` | hög |
| PG2 | **Menyn.** Öppnas och stängs med tangentbordet, Escape stänger, fokus går tillbaka till knappen, fokus vandrar inte bakom en panel som ser modal ut, och sidan bakom scrollar inte med (`overscroll-behavior: contain`) | 📄 W3C WAI-ARIA APG, *Dialog (Modal)* och *Disclosure*; 📄 Krehel, `better-ui` (*Contain scroll inside overlays*) | hög |
| PG3 | **Tryckytor** är minst 24 × 24 px med luft emellan, och helst 44 px för de viktigaste handlingarna | 📄 WCAG 2.2, 2.5.8 *Target Size (Minimum)* (AA) och 2.5.5 (AAA); 📄 Apple, *Human Interface Guidelines* (44 pt) | hög under 24 px, annars låg |
| PG4 | **Klickbar text på en rad.** Knappetiketter, menyval och uppmaningar bryts inte på två rader i någon bredd, och knappar i samma rad är lika höga | 📄 Hallmark, *slop-test* 36 och 49 – en källa | låg |
| PG5 | **Inget klipps eller överlappar** i 320–1440 px, i liggande mobil och vid 200 % textstorlek. Långa svenska sammansättningar bryts i stället för att spräcka spalten, enligt ytans regel: mjuka bindestreck och `hyphens: manual` i rubriker, `hyphens: auto` med `lang="sv"` i brödtext först efter prov (→ `yta/typografi.md`; `BESLUT.md` 2026-10-16, *Motsägelserna i skillsen*) | 📄 WCAG 2.2, 1.4.4 och 1.4.10; → kontroll 3 (320 px); 📄 MDN, `hyphens` | hög om innehåll försvinner, annars medel |
| PG6 | **Tillstånden besökaren möter är genomarbetade:** samtyckesrutan öppen och stängd, kartan före klick, 404, en tom eller misslyckad laddning. De ska se byggda ut, inte som rester | 📄 Krehel, `interface-review` (*the incomplete change*: tomt, laddar, fel) – en källa | medel |
| PG7 | **Samma handling heter och ser likadan ut överallt:** samma sida har samma namn i menyn, sidfoten, rubriken och titeln, och knapparna följer sidans primära handling | 📄 WCAG 2.2, 3.2.4 *Consistent Identification*; → `guide/2-3-struktur.md` (G4, G5) | hög vid brott mot G4/G5, annars medel |

## Källor och licenser

- Anthropic, [knowledge-work-plugins](https://github.com/anthropics/knowledge-work-plugins) (`design/skills/design-critique`), Apache-2.0, commit `33eeda1` (2026-10-15).
- Wharton m.fl. 1994 och Spencer 2000 om kognitiv genomgång; webb-pros `kritik/GRANSKARE.md` och `bygg-sajt` (egna, commit `668b03c`).
- Jakub Krehel, [skills](https://github.com/jakubkrehel/skills) (`better-interface`, `interface-review`, `better-ui`), MIT, commit `4c66b1f` (2026-10-12).
- Emil Kowalski, [skills](https://github.com/emilkowalski/skills) (`review-animations`), MIT, commit `2d22863` (2026-10-11).
- [Hallmark](https://github.com/Nutlope/hallmark) (`skills/hallmark/references/slop-test.md`, `anti-patterns.md`), MIT, commit `13ac0ec` (2026-08-06).
- [nexu-io/open-design](https://github.com/nexu-io/open-design) (`craft/anti-ai-slop.md`, `design-templates/critique/SKILL.md`), Apache-2.0, commit `78d5637` (2026-10-16).
- Vercel, [Web Interface Guidelines](https://vercel.com/design/guidelines) (MIT), via `kunskap/research/2026-10-15_kompetensluckor-anteckningar/lager-5-yta.md` §6.
- W3C, [WCAG 2.2](https://www.w3.org/TR/WCAG22/) och [WAI-ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/); MDN; web.dev; NN/g; Språkrådet; Bringhurst; Butterick; Refactoring UI. Böckerna och Refactoring UI destilleras med egna ord.
