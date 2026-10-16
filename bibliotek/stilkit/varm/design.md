# Stilkit: Varm och välkomnande

**Personlighet:** varm, personlig och jordnära, med en handskriven detalj som låter som en människa.
**Passar:** caféer, bagerier, massage och friskvård, små kliniker och hantverkare med en personlig ägare.
**Passar inte** (förslag): formella yrken där handstil och mjuka former kan läsas som oseriöst, som advokat, revisor och bank, och verksamheter som säljer teknik, fart eller jour. Kitet bär en person; en firma utan ansikte utåt får ett tomt porträtt (G13).
**Stämning:** varm, välkomnande, mjuk, hemtam.

| Del | Värde |
|---|---|
| Färger | Beige bakgrund `#f3ede2`, mörk text `#2a2620`, skogsgrön accent `#3f5a35` (7,27:1 med ljus text), salvia `#dce3d2` för ytor, ljus sand `#ebe1cf` bakom porträttet och terrakotta `#9c4f32` för den handskrivna detaljen |
| Färgstrategi | Återhållsam: tonade neutraler och en accent på handlingarna (G3; `yta/farg.md`). Terrakottan är en dekorfärg för den handskrivna detaljen och prisetiketten, inte en andra accent |
| Typsnitt | Fraunces (rubriker), Figtree 400 och 600 (brödtext) och Caveat 600 (handskrivet, bara på överraderna utanför förstavyn), alla SIL Open Font License 1.1, självhostade via Fontsource. Brödtextens radhöjd 1,65 (inom regeln 1,45–1,7, `yta/typografi.md`) |
| Avstånd | Mellan, med sektioner på 4–7 rem |
| Radie | Runda knappar och 22 px på kort |
| Bildbehandling | Foton med helt rund radie. Porträttet i förstavyn står i en organisk, nästan rund form på ljus sand |
| Avdelare mellan sektioner | Luft och tonbyte mellan beige, den ljusa ytan och salvian (bibliotekets `data-yta`); kitet har inga egna linjer mellan sektioner |
| Rörelse | Sparsam som standard, måttlig som tillval för café (`guide/2-6-rorelse.md`, N1). 350 ms, mjuk. Med `reduce` stängs animationerna av, bara färg, bakgrund, kant och opacitet får övergång, knapparna rör sig inte och den mjuka rullningen stängs av (`bibliotek/src/styles/bas.css`) |
| Ökad kontrast | Med `prefers-contrast: more` får dämpad text textfärgen och linjerna blir 60 % textfärg, 4,3:1 mot bakgrunden (`kit.css`; WCAG 2.2, 1.4.11) |
| Mörkt läge | Inget, inte nu (`BESLUT.md` 2026-10-16, *Frågelistan efter tredje varvet avgörs*, punkt 22) |
| Ikoner | Lucide, ISC |

**Bärande drag** och var de bor i `kit.css`:
1. **Serifen i rubrikerna:** Fraunces i vikt 560 (`--k-font-rubrik`, `--k-rubrik-vikt`).
2. **Porträttet i en organisk rund form på sand:** `.forstavy__bildyta` med `--k-dekor-ljus`.
3. **Den handskrivna överraden i terrakotta, utanför förstavyn:** `.overrad` med `--k-font-markering` och `--k-dekor-2`; förstavyn och sidtoppen återställer den till Figtree.
4. **De runda formerna:** `--k-radie-knapp` och `--k-radie-bild` (999 px), `--k-radie-kort` (22 px).

**Det som fyller platsen när dekoren är borta** (förslag): ett riktigt porträtt av ägaren och en personlig text i ägarens röst. Handstilen är signaturen och ska inte bytas mot fler dekorer.

**Kräver av kunden** (förslag): ett porträtt av ägaren eller personalen och en *Om oss* med något personligt att säga, så att handstilen har något att signera. Utan porträtt blir sandformen tom; då beställs porträttet eller väljs ett annat kit (`yta/stilriktningar.md`).

**Antimönster:**
- Handstilen i förstavyn, i knappar eller i löptext. Högst två typsnitt på första skärmen (Johnnys dom 2026-10-15; `BESLUT.md` 2026-10-16, G8).
- Förslag: accenten som yta eller dekor (G3), och terrakottan på något annat än den handskrivna detaljen och prisetiketten.

**Fallgropar:**
- Tre typsnitt på första skärmen (Johnnys dom 2026-10-15; rättat 2026-10-16).
- Den gröna knappen syns mindre mot en grågrön fotoyta (Johnnys dom 2026-10-15; porträttet ligger nu på sand).
- Förslag: handstilen glider tillbaka in i förstavyn när en ny sektion byggs, eftersom `.overrad` är handskriven överallt utom i förstavyn och sidtoppen.

**Skillnaden mot de andra kiten** på tre axlar; två kit delar högst en (`guide/2-5-yta.md`). Ljusheten och nyansen är uträknade i OKLCH 2026-10-17.

| Axel | Varm | Lugn | Djärv |
|---|---|---|---|
| Förstavyns ljushet | ljus, beige (L 0,95) | ljus, varmvit (L 0,97) | mörk, bläck (L 0,24) |
| Rubrikstil | serif (Fraunces 560), gemener | sans 600, gemener | sans 800, versaler |
| Accentnyans | skogsgrön, 138° | terrakotta, 44° | orange, 39° |

- Mot Lugn delar Varm förstavyns ljushet; rubrikstil och accent skiljer.
- Mot Djärv delar Varm ingen axel.
- ⚠️ Förslag: byts Lugns accent till det djupa gröna (frågelistan, punkt 8) delar Varm och Lugn två axlar. Det bör vägas in när Johnny dömer Lugns accent.

**Typsnittet framåt:** systemtypsnittet som brödtext, med kitets typsnitt i rubrikerna, prövas när ett nytt kit tas fram; Varm ändras inte (`BESLUT.md` 2026-10-16, punkt 22).

**Referenser i Johnnys måttstock:**
- **Kroppsbalans:** "Grön/beige palett, handritade knappar." Paletten och idén om en handgjord detalj kommer härifrån.
- **Kajens Café:** "Den handskrivna accenten." Den handskrivna raden i terrakotta och de runda knapparna kommer härifrån.
- **Pinchman's:** "En mjuk brun/beige identitet." Den varma beigen och serifen i rubrikerna kommer härifrån.

Uppmätt med Playwright 2026-10-15. Ingen identitet, text eller bild är lånad.

**Johnnys dom 2026-10-15: godkänt** (startsidan för den första övningssajten). Det som drog ner: tre typsnitt på första skärmen är ett för mycket, och den gröna knappen syns mindre mot den grågröna fotocirkeln.

**Ändrat 2026-10-16 efter domen** (`BESLUT.md` 2026-10-16, G8):
- Förstavyn har högst två typsnitt, Fraunces och Figtree. Handstilen Caveat finns bara på överraderna längre ner, som "Om oss", där den fungerar som en personlig signatur.
- Prisetiketten är satt i Figtree.
- Porträttet ligger på ljus sand i stället för salvia, så att den gröna knappen bredvid sticker ut.

Provsidan väntar på Johnnys dom över ändringarna (`BESLUT.md` 2026-10-16, G8 och G9).

**Johnnys godkännande:** 2026-10-15 (domen ovan; `BESLUT.md` 2026-10-15, *Ytlagret*: varje kit är godkänt först när Johnny har sett dess provsida). Ändringarna 2026-10-16 väntar på hans dom (G8).

Fälten *Passar inte*, färgstrategi, bildbehandling, avdelare, ökad kontrast, mörkt läge, bärande drag, det som fyller platsen, kräver, antimönster, fallgropar och skillnaden mot de andra kiten lades till 2026-10-17 (`BESLUT.md` 2026-10-16, *Frågelistan efter tredje varvet avgörs*, punkt 19 och 22). Det som är märkt *förslag* är Claudes bedömning och visas för Johnny.
