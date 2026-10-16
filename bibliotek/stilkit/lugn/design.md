# Stilkit: Lugn och luftig

**Personlighet:** lugn, saklig och omtänksam. Mycket luft, få färger och en tydlig knapp.
**Passar:** kliniker och vård, tandläkare, terapeuter, frisörer och skönhet med en lugn och dyr känsla.
**Passar inte** (förslag): verksamheter där tempo, energi eller jour är det kunden köper, som gym, padel, bilverkstad och låssmed med jour, och firmor som vill sticka ut i sin bransch. Luften och den enda accenten läses då som vård eller skönhet (G13; jämför Johnnys dom över Djärv nedan).
**Stämning:** lugn, ren, trygg, exklusiv utan att vara kall.

| Del | Värde |
|---|---|
| Färger | Varmvit bakgrund `#f6f3ee`, mörkgrön text `#22382f`, terrakotta accent `#a4532e` (5,45:1 med vit text) |
| Färgstrategi | Återhållsam: tonade neutraler och en accent, som bara står på handlingar (G3; `yta/farg.md`) |
| Typsnitt | Instrument Sans 400 och 600, SIL Open Font License 1.1, självhostat via `@fontsource/instrument-sans`. Brödtextens radhöjd 1,7 (inom regeln 1,45–1,7, `yta/typografi.md`) |
| Avstånd | Luftigt, med sektioner på 4–6,25 rem (minskat efter Johnnys dom 2026-10-15, *i största laget*) |
| Radie | 10 px på knappar och 14 px på kort |
| Bildbehandling | Foton med 14 px radie. Porträttet i förstavyn står på en mjuk sandyta i valvform: rund topp och 14 px nertill |
| Avdelare mellan sektioner | Luft och tonbyte mellan bakgrunden, den vita ytan och sanden (bibliotekets `data-yta`). Kitet har inga egna linjer mellan sektioner; tunna linjer finns i markeringen och sidfoten |
| Rörelse | Sparsam som standard (`BESLUT.md` 2026-10-15). 400 ms med mjuk inbromsning. Med `reduce` stängs animationerna av, bara färg, bakgrund, kant och opacitet får övergång, knapparna rör sig inte och den mjuka rullningen stängs av (`bibliotek/src/styles/bas.css`) |
| Ökad kontrast | Med `prefers-contrast: more` får dämpad text textfärgen och linjerna blir 60 % textfärg, 3,9:1 mot bakgrunden (`kit.css`; WCAG 2.2, 1.4.11) |
| Mörkt läge | Inget, inte nu (`BESLUT.md` 2026-10-16, *Frågelistan efter tredje varvet avgörs*, punkt 22) |
| Ikoner | Lucide, ISC |

**Bärande drag** och var de bor i `kit.css`:
1. **Luften:** sektionsavståndet `--k-sektion` (4–6,25 rem), det största steget `--k-a7` (4 rem) och brödtextens radhöjd `--k-radhojd` (1,7).
2. **Det lugna rubrikmåttet:** Instrument Sans 600 med −0,015 em och radhöjd 1,1, h1 upp till 4,1 rem (`--k-font-rubrik`, `--k-rubrik-vikt`, `--k-rubrik-spatiering`, `--k-rubrik-radhojd`, `--k-h1`).
3. **Porträttet i valvform på sand:** `.forstavy__bildyta` med `--k-dekor`.
4. **Markeringen som piller med tunn linje:** `.markering` med `--k-linje`.

**Det som fyller platsen när dekoren är borta** (förslag): luften och rubrikmåttet, och ett riktigt porträtt. Aldrig en ny dekor (`yta/stilriktningar.md`).

**Kräver av kunden** (förslag): ett lugnt porträtt av behandlaren eller en person i verksamheten, i ljus miljö, och ljusa foton av lokalen. Utan porträtt blir valvytan en tom sandform; då beställs porträttet eller väljs ett annat kit (`yta/stilriktningar.md`, *Ett kit väljs inte för en kund som saknar det som kitet kräver*).

**Antimönster** (förslag): en andra accentfärg; accenten som yta eller dekor (G3); skuggor och gradienter som dekor; tät radhöjd i brödtexten.

**Fallgropar:**
- Sektionsavstånden blir för stora på datorn (Johnnys dom 2026-10-15, *i största laget*; minskat).
- Prisetiketten skär in i fotot på mobilen (Johnnys dom 2026-10-15).
- Terrakotta på varmvitt är det utseende som taste kallar mest igenkännbart genererat (en källa och en persons smak). Lugn med det djupa gröna visas bredvid dagens accent, och Johnny dömer accenten vid sin premiumkontroll; kitet ändras inte före det (`BESLUT.md` 2026-10-16, *Frågelistan efter tredje varvet avgörs*, punkt 8).
- 400 ms är längre än rörelseskillens 100–160 ms för återkoppling (`rorelse/SKILL.md`, princip 4). Rörelsetokens per kit står som öppen fråga (P33; frågelistan, punkt 15 d).

**Skillnaden mot de andra kiten** på tre axlar; två kit delar högst en (`guide/2-5-yta.md`). Ljusheten och nyansen är uträknade i OKLCH 2026-10-17.

| Axel | Lugn | Varm | Djärv |
|---|---|---|---|
| Förstavyns ljushet | ljus, varmvit (L 0,97) | ljus, beige (L 0,95) | mörk, bläck (L 0,24) |
| Rubrikstil | sans 600, gemener | serif (Fraunces 560), gemener | sans 800, versaler |
| Accentnyans | terrakotta, 44° | skogsgrön, 138° | orange, 39° |

- Mot Varm delar Lugn förstavyns ljushet; rubrikstil och accent skiljer.
- Mot Djärv delar Lugn accentnyansen (44° mot 39°); förstavyn och rubrikstilen skiljer.
- ⚠️ Förslag: byts Lugns accent till det djupa gröna (punkt 8) delar Lugn och Varm två axlar, ljus förstavy och grön accent, och regeln bryts. Det bör vägas in när Johnny dömer accenten.

**Typsnittet framåt:** systemtypsnittet som brödtext, med kitets typsnitt i rubrikerna, prövas när ett nytt kit tas fram; Lugn ändras inte (`BESLUT.md` 2026-10-16, punkt 22).

**Referenser i Johnnys måttstock** (`mattstock/mattstock.md`; referenserna i `guide/2-5-yta.md`):
- **Stångå Tandklinik:** "Lugn färgskala, bra luft." Paletten med mörkgrönt och terrakotta och Instrument Sans kommer härifrån.
- **Fungera:** "Lugn, luftig typografi." Det stora luftiga rubrikmåttet och de ljusa ytorna kommer härifrån.
- **Looking Good:** "Lugn, dyr känsla som passar kundgruppen." Återhållsamheten, med en accent och mycket vitt, kommer härifrån.

Uppmätt med Playwright 2026-10-15. Ingen identitet, text eller bild är lånad.

**Johnnys dom 2026-10-15: godkänt** (startsidan för den första övningssajten). Han noterade att prisetiketten skär in i fotot på mobilen och att sektionsavstånden på datorn är i största laget.

**Johnnys godkännande:** 2026-10-15 (domen ovan; `BESLUT.md` 2026-10-15, *Ytlagret*: varje kit är godkänt först när Johnny har sett dess provsida).

Fälten *Passar inte*, färgstrategi, bildbehandling, avdelare, ökad kontrast, mörkt läge, bärande drag, det som fyller platsen, kräver, antimönster, fallgropar och skillnaden mot de andra kiten lades till 2026-10-17 (`BESLUT.md` 2026-10-16, *Frågelistan efter tredje varvet avgörs*, punkt 19 och 22). Det som är märkt *förslag* är Claudes bedömning och visas för Johnny.
