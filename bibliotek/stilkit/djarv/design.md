# Stilkit: Djärv och egen

**Personlighet:** självsäker och omisskännlig. Stora versaler, svarta konturer, en mörk förstavy och en etikett som sticker ut, med orange bara på det man ska trycka på.
**Passar:** verksamheter som vill synas och skilja sig från branschen, som bagerier, barberare, butiker och yngre kliniker.
**Passar inte:** vård och kliniker där lugn och förtroende väger tyngst läste den orange versionen fel, "som en padelhall eller en energidryck" (Johnnys dom 2026-10-15, nedan; G13). Om den mörka versionen läses rätt för en klinik avgör Johnny på provsidan (G9). Förslag: inte heller formella yrken som advokat och revisor.
**Stämning:** djärv, glad, egen, energisk.

| Del | Värde |
|---|---|
| Färger | Benvit bakgrund `#f8f8f2`, bläck `#112229` (också förstavyn), orange `#ff6b35` på knappar med bläcktext (5,77:1), orange text `#c2380c` (5,1:1) på länkar och en dämpad sand `#e9e7dc` för ytor. Ingen rosa och inga färgade kort |
| Färgstrategi | Återhållsam med en mörk förstavy, närmast engagerad (`yta/farg.md`). Orange bara på knappar och länkar (G3; G9) |
| Typsnitt | Bricolage Grotesque 800 i versaler (rubriker) och Inter 400 och 600 (brödtext), SIL Open Font License 1.1, självhostade via Fontsource. Versalrubrikerna har radhöjd 1,05 och spärrning 0,05 em (C53) |
| Avstånd | Tätare, med sektioner på 3,5–6 rem och stor typografi |
| Radie | Piller med 2 px bläckkant och 28 px på kort |
| Bildbehandling | Foton med 28 px radie. Porträttet i förstavyn står på en benvit yta med 2 px ljus kontur mot den mörka förstavyn |
| Avdelare mellan sektioner | Tonbyte, med den mörka förstavyn och mörka sektioner som de starkaste skiftena, och bläckkonturer runt korten (`.kort`) |
| Rörelse | Sparsam som standard, måttlig som tillval för kitet (`guide/2-6-rorelse.md`, N1). 220 ms med en liten studs i kurvan. Med `reduce` stängs animationerna av, bara färg, bakgrund, kant och opacitet får övergång, knapparna rör sig inte och den mjuka rullningen stängs av (`bibliotek/src/styles/bas.css`) |
| Ökad kontrast | Med `prefers-contrast: more` får dämpad text textfärgen. Kanterna är redan bläck (15:1 mot bakgrunden) och 2 px och ändras inte (`kit.css`) |
| Mörkt läge | Inget, inte nu (`BESLUT.md` 2026-10-16, *Frågelistan efter tredje varvet avgörs*, punkt 22). Den mörka förstavyn är en sektion, inte ett mörkt läge |
| Ikoner | Lucide, ISC |

**Bärande drag** och var de bor i `kit.css`:
1. **Versalrubrikerna i Bricolage Grotesque 800:** `--k-font-rubrik`, `--k-rubrik-vikt`, `--k-rubrik-versaler`, `--k-rubrik-spatiering` och `--k-rubrik-radhojd`.
2. **De svarta konturerna på 2 px:** `--k-kantlinje` och `--k-linje`, på `.kort` och `.forstavy__bildyta`.
3. **Den mörka förstavyn:** `--k-forstavy-bg: var(--k-mork)` och `--k-forstavy-text`.
4. **Den runda, lutande etiketten:** `.markering`.

**Det som fyller platsen när dekoren är borta** (förslag): skalan, med de stora versalrubrikerna, och färgytan i den mörka förstavyn.

**Kräver av kunden** (förslag): foton med tydliga motiv som tål en mörk förstavy och en kontur, och korta namn och rubriker, eftersom versaler i 800 med spärrning tar plats (h1 upp till 4,1 rem).

**Antimönster:**
- Orange som yta, förstavy eller fotoram; rosa som bakgrund; färgade kort (Johnnys dom 2026-10-15; `BESLUT.md` 2026-10-16, G9).
- Förslag: versaler i löptext och mer än en lutande etikett per skärm.

**Fallgropar:**
- Stilen läses som en annan bransch (Johnnys dom 2026-10-15; G13).
- Versalrubriker med för tät radhöjd och utan spärrning. Under 1,0 möts raderna (`yta/typografi.md`), och C53 kräver 5–12 % spärrning (`guide/bilaga-c-kontroller.md`). Rättat 2026-10-17, se nedan.
- Kurvan studsar (`--k-kurva`, 1,2 i slutet), och sparsam rörelse har inga studsar (`rorelse/SKILL.md`, princip 5). Studsen hör till måttlig.
- Spärrningen gör versalrubrikerna cirka 5 % bredare, och ett långt ord kan då brytas mitt i ordet. Med h1 upp till 5 rem bröts *i Exempelstad* (hårt mellanslag) så i 360–375 och 900–1920 px. Under 352 px avstavas rubrikerna automatiskt (`bibliotek/src/styles/bas.css`). Prövat med Playwright i Chromium och WebKit 2026-10-17.

**Skillnaden mot de andra kiten** på tre axlar; två kit delar högst en (`guide/2-5-yta.md`). Ljusheten och nyansen är uträknade i OKLCH 2026-10-17.

| Axel | Djärv | Lugn | Varm |
|---|---|---|---|
| Förstavyns ljushet | mörk, bläck (L 0,24) | ljus, varmvit (L 0,97) | ljus, beige (L 0,95) |
| Rubrikstil | sans 800, versaler | sans 600, gemener | serif (Fraunces 560), gemener |
| Accentnyans | orange, 39° | terrakotta, 44° | skogsgrön, 138° |

- Mot Lugn delar Djärv accentnyansen (39° mot 44°); förstavyn och rubrikstilen skiljer.
- Mot Varm delar Djärv ingen axel.

**Typsnittet framåt:** systemtypsnittet som brödtext, med kitets typsnitt i rubrikerna, prövas när ett nytt kit tas fram; Djärv ändras inte för det (`BESLUT.md` 2026-10-16, punkt 22).

**Referenser i Johnnys måttstock:**
- **Lamanna's Bakery:** "Rött/gult, stjärnknappar." Det starka orange blocket och mod med färg kommer härifrån.
- **Bernice Bakery:** "Rosa/blå färger och de rundade korten." Rosa och blått, de stora rundade korten, versalerna och den runda etiketten kommer härifrån.
- **Rendezvous Barbers:** "Orange/serif-identiteten är helt egen." Orangen och känslan av en egen identitet kommer härifrån.

Uppmätt med Playwright 2026-10-15. Ingen identitet, text eller bild är lånad.

**Johnnys dom 2026-10-15: underkänt, men nära.** Utförandet var det mest genomarbetade, men orange helskärm, rosa fotoram och versaler läses "som en padelhall eller en energidryck" för en kiropraktor. *För godkänt:* behåll typsnittet och de svarta konturerna, byt den orange förstavyn mot den mörka marinen eller den beige bakgrunden, ta bort rosa som bakgrundsfärg och använd orange bara till knappar och länkar.

**Ändrat 2026-10-16 efter domen** (`BESLUT.md` 2026-10-16, G9; Johnnys "för godkänt" ordagrant):
- Typsnittet och de svarta konturerna är kvar.
- Förstavyn är den mörka marinen från sidfoten, med benvit text, i stället för orange.
- Rosa är borta som bakgrund, både i porträttytan, etiketten och korten, och behandlingskorten är vita med kontur.
- Orange används bara till knappar och länkar.
- Etiketten är vit med kontur.

**Ändrat 2026-10-17** (`BESLUT.md` 2026-10-16, *Frågelistan efter tredje varvet avgörs*, punkt 18 a):
- Versalrubrikerna har radhöjd 1,05 i stället för 1,0 och spärrning 0,05 em i stället för −0,005 em, enligt C53 och `yta/typografi.md` (1,02–1,08). Inget undantag från C53.
- h1 är sänkt från `clamp(2.5rem, 1.3rem + 4.6vw, 5rem)` till `clamp(2.25rem, 1rem + 4vw, 4.5rem)`, så att inget ord på provsidan bryts mitt i ordet i 353–1920 px (Chromium och WebKit). Med övningssajtens *och Trelleborg* bröts ordet ändå i 1024–1920 px, så h1 är `clamp(2rem, 1rem + 3.6vw, 4.1rem)` (mätt i Chromium 2026-10-17 i 320–1920 px).
- **Ändringarna döms av Johnny på provsidan (G9).**
- `prefers-contrast: more` (punkt 22, ovan).

Provsidan väntar på Johnnys nya dom.

**Johnnys godkännande:** ej godkänt. Underkänt men nära 2026-10-15; provsidan efter ändringarna väntar på hans dom (G9).

Fälten *Passar inte*, färgstrategi, bildbehandling, avdelare, ökad kontrast, mörkt läge, bärande drag, det som fyller platsen, kräver, antimönster, fallgropar och skillnaden mot de andra kiten lades till 2026-10-17 (`BESLUT.md` 2026-10-16, *Frågelistan efter tredje varvet avgörs*, punkt 19 och 22). Det som är märkt *förslag* är Claudes bedömning och visas för Johnny.
