# Spårbarhet: `guide/2-6-rorelse.md`

Radnummer avser `historik/IMPLEMENTERINGSGUIDE-v0.74.md`. "Flyttat till annan fil" anger var innehållet hör hemma enligt hemvisttabellen i `konsolidering/skrivregler.md`; de filerna skrivs av andra. Skrivet 2026-10-15.

## v0.74 mot v1.0

| v0.74-avsnitt (rader) | Var det hamnade (fil, avsnitt) | Struket och varför | Flyttat till annan fil |
|---|---|---|---|
| §1 flödet, steget "Animationer" (97) | 2-6 ingressen: rörelse som förbättring | Animationer som eget standardsteg struket: standarden är flersidig sajt (beslut 2026-10-15) | Flödet → `guide/README.md` |
| Brief 3b rörelsebudget (307) | 2-6 Rörelsebudget (D11) | – | Briefmallen → `2-1` |
| Fas 3 oönskade småanimationer (381) | 2-6 Rörelsebudget, första sajten sparsam (byggaren lägger inte till egen rörelse) [N1]; Policyn, rörelse bara ur biblioteket [N2] | "Animationer hör till fas 5" ersatt: rörelse kommer ur biblioteket | – |
| Fas 5 åtgärd och exempel (437–440) | 2-6 Tillval, scrollytelling på startsidan | Scrollytelling som standardsteg struket (beslut 2026-10-15, analysen M13) | – |
| Fas 5 scrollytelling-skillens regler (441–448) | 2-6 Policyn (reducerad rörelse, transform och opacitet, scroll-kapning, parallax); Tillval (`svh`, teknikval) | "Hoppa över animationer helt" vid reduce preciserat: opacitet och färg får stå kvar (webb-pros byggstandard 3.5) | – |
| Fas 5 djup genom lager (447) | 2-6 Tillval [N4], på bänken | – | – |
| Fas 5 egen gren (449) | 2-6 Tillval | – | – |
| Fas 5 grind (450) | 2-6 Kontroll | – | Bygge och konsolfel → `2-8` |
| Fas 5 Scroll World (452–458) | 2-6 Tillval [N4] | "Valet i briefen mellan scrollytelling och Scroll World" ersatt av tillval med undantag i briefen | – |
| Fas 5 Scrollcraft (460) | 2-6 Tillval [N4] | – | Caliper → `3-2` |
| Fas 5 Remotion (462) | 2-6 Tillval [N3] | – | Text i video → `2-7` |
| Fas 5 rörlig grafik ovanpå video, X-ray-läget (464–465) | 2-6 Tillval [N4] | – | Kontrollen vid publicering → `2-8` |
| Fas 5 Refero, Mobbin, Land-book, Coolors, gallerier, typsnitt (466–469) | – | – | → `2-5` (designkällor; analysen §6.1) |
| Fas 5 mikrointeraktioner (470) | 2-6 Små interaktioner | Lottie: dotLottie avstås (researchen), undantag för kundens egna filer | Licens per fil → `2-5` |
| Fas 5 Aceternity, React Bits (471), godly/21st/Awwwards (473) | – | – | → `2-5` |
| Fas 5 ett blickfång (472) | 2-6 Ett blickfång [N2] | – | Video, format, undertexter → `2-7` |
| Fas 5 UI Skills-MCP (475) | 2-6 Små interaktioner (installeras inte) | Tillvalet struket: skills som laddas automatiskt gör flödet mindre förutsägbart (v0.74:s egen reservation) | – |
| Fas 5 img2threejs (477) | 2-6 Tillval [N4] | – | – |
| Fas 5 små interaktioner, Emils *Animate* (479–483) | 2-6 Små interaktioner | "Körs efter scrollytelling i samma fas" struket: ingen fas 5 som standard | – |
| Fas 5 Emils regler som mätbara kontroller (484–494) | 2-6 Små interaktioner (instruktioner); Kontroll (statisk sökning som underlag) | Låsta kontroller → instruktioner (en källa, analysen §4.2). Konflikten om ease-in vid utgång noterad (NN/g går före) | – |
| Fas 5 optimering, animation vocabulary, Emils nio skills (496–498) | 2-6 Tillval (optimering); Små interaktioner (destilleras) | – | – |
| Fas 6 specialisten Berättelse och tempo, sömlösa loopar (506) | 2-6 Kontroll, tjänar rörelsen innehållet | – | Specialistmodellen → `3-2` |
| Fas 6 passar rörelsen målgruppen (508) | 2-6 Rörelsebudget; Kontroll | Låst kriterium → granskningskriterium (en källa; WCAG 2.3.3 och NN/g stöder inte nivåerna, analysen §4.2) | Konverteringsspecialisten → `3-2` |
| Fas 6 kriterier och exemplet med stjärnorna (527, 531) | 2-6 Kontroll | "Berättelsen flyter mellan kapitlen" gäller bara tillvalet scrollytelling | Texter läses bra → `2-7` |
| Fas 6 prestanda vid scroll, CLS (532) | 2-6 Kontroll (hänvisning) | – | → `2-8` |
| Fas 6 video i stället för skärmdumpar (533–535) | 2-6 Kontroll | – | Utfallet *för lite information* → `3-2` |
| Fas 6b standarden, `prefers-reduced-motion` (571) | 2-6 Policyn (D11) | – | Kodstandarden → `2-8` |
| §7.2 grindrad "5 Animationer" (1022) | 2-6 Kontroll | – | Grindmekanismen → `3-1` |
| §7.6 ändrade animationer ger full granskning (1156) | – | – | → `3-2` |
| §8.6 xhigh för animationer (1309) | 2-6 Kompetens (hänvisning) | – | → `3-3` |
| §10.3 standard: reduced motion (1489) | 2-6 Kontroll, grind | – | – |
| §11.3 kunskapsområdet Rörelse (1593) | 2-6 Kompetens, förankring | – | – |
| §11.11 referenssajter, teknikbeskrivningar (1658); fas 2 teknikbeskrivningar (363) | 2-6 Effekter från referenser | "Aldrig kod" → öppen fråga i licensbeslutet (bilaga E) | REA-piloten → `3-3` |
| §12 rader: `scrollytelling` (1828), UI Skills (1839), img2threejs (1843), Scrollcraft (1855), Emil Kowalski (1864), GSAP i raden Grill Me m.fl. (1893), `scroll-world` (1901) | 2-6 där verktyget används | – | – |
| §12 skelettet `story-review` (1919–1933) | – | Struket: skrivet för en scrollytelling-sajt (analysen M11) | Granskarens skill → `3-2` |
| §14 scrollytelling eller Scroll World (2161) | 2-6 Tillval | Avgjord: båda är tillval (beslut 2026-10-15) | – |
| §14 sajttyper (2155) | 2-6 ingressen | Avgjord av beslutet 2026-10-15 | Vägar A–D → `2-2` |

## Fallgropar från §13

| Nr | I 2-6 |
|---|---|
| 4 | Rörelsebudget, *Den första sajten har budgeten sparsam* (byggaren lägger inte till egen rörelse) |
| 5 | Rörelsebudget, varför |
| 6 | Indirekt: rörelse ur biblioteket kortar steget (tidsbudgeten → `3-1`) |
| 55 | Kontroll, rörelse granskas på video |
| 164 | Rörelsebudget |
| 177 | Licens per fil för Lottie och rörelser (hemvist `2-5`) |

Inte i 2-6: 195 (text i video) → `2-7`; 165 (Astra) → `3-3`.

## Nytt i v1.0 som inte fanns i v0.74

WCAG 2.2.2 och 2.3.1 som grind och kriterium, oskärpa som rörelse, ingen text på `opacity: 0` (regeln om innehåll utan JavaScript bor i `2-4`), `@view-transition`, Motions vanilla-API, scroll-drivna animationer inom `@supports`, Open Props, avstådda bibliotek, inga automatiska karuseller och budgetnivåernas innehåll (förslag).

## Karta, beslut och research som använts

- `BESLUT.md` 2026-10-15 (sajttyp: flersidig standard, scrollytelling tillval).
- `historik/karta/6-rorelse.md` hela; `historik/principer.md`, nu `guide/README.md`, princip 7 (full autonomi bara med entydigt mått).
- `kunskap/research/2026-10-15_kompetensluckor-anteckningar/lager-6-7-rorelse-innehall.md` §6 (Remotion), §7 (policy, WCAG 2.2.2 och 2.3.3, NN/g, verktyg), §8 (förankring, kandidatregister).
- `kunskap/research/2026-10-15_kompetensluckor-och-kandidater-per-lager.md`, lager 4 (GOV.UK, AstroWind) och lager 6.
- `inventering/inventering.json`, lager 6.
- `kunskap/research/2026-10-14_stitch-och-verktyg.md` (scrollytelling-skillens licens).
- `kunskap/research/2026-10-15_guide-konsolideringsanalys.md` §2 (D11), §3.1 (M13), §4.2 (Emils regler, rörelsebudgeten).
- Webb-pros `kunskap/byggstandard.md` 3.5 (reducerad rörelse, 0,01 ms-återställningen, testet efter 6 och 7 sekunder, WCAG 2.3.1) och `kunskap/designregler.md` (ägarbeslutet mot karuseller).

## Ommärkning 2026-10-15

Efter granskningen (`konsolidering/granskning-v1.0.md`) och tillägget kl. 14.30 i `konsolidering/skrivregler.md`. N1 gick från 18 punkter till **2**. I den första sajten gäller bara budgeten *sparsam* och `prefers-reduced-motion`; nivåerna måttlig och expressiv är N2. Inget är struket utom dubbletter; allt annat är flyttat till N2 eller sammanslaget.

### Kvar i N1

| N1-punkt i 2-6 | Sammanslaget med (tidigare egna punkter) |
|---|---|
| `prefers-reduced-motion` respekteras | – (underpunkterna om `matchMedia` och `no-preference` märkta [N2]) |
| Den första sajten har budgeten sparsam (ny) | *Byggaren lägger inte till egen rörelse* (fallgrop 4); inga in-animationer, automatiska karuseller, parallax eller blickfång; sidövergångar väntar till sajt 2 eftersom de är en öppen fråga |

### Flyttat från N1 till N2

*Innehållet syns utan JavaScript* (omskriven till *Ingen text börjar på `opacity: 0`*; själva regeln → `2-4`) · *Rörelse som pågår mer än fem sekunder kan pausas* · *Inget blinkar tre gånger per sekund* · *Längd och kurvor* · *Animera transform, opacitet och färg* · *Ingen scroll-kapning och högst en parallax* · *Inga automatiska karuseller* · *Rörelse kommer bara ur bibliotekets färdiga rörelser* (resten av den tidigare punkten om egen rörelse) · *Briefen anger sparsam, måttlig eller expressiv* (källäget infogat i punkten) · *Vad nivåerna tillåter* · Kontroll: *Reducerad rörelse – grind*, *Fem sekunder – grind*, konsolfel med reducerad rörelse · *Passar rörelsen målgruppen och budgeten?* · Hur självgående: *Självgående inom policyn*, *Budgeten expressiv och blickfånget* (den inbäddade [N2]-märkningen om tillval blev en egen punkt). WCAG 2.2.2 och 2.3.1 är nivå A och ingår i golvet (`2-8`); policyns inledning säger att budgeten sparsam uppfyller dem i den första sajten. *Avstå*-listan och *Vad som kommer ut* fick märket [N2]; första sajtens resultat står i löptext.

### Granskningsfynd som åtgärdats

| Fynd | Åtgärd |
|---|---|
| 1.1, raden för `2-6` 27–33 | Bara *sparsam* i N1; tabellen med tre nivåer N2 |
| 1.1, automatiska kontroller (`2-6` 96–99) | De fyra kontrollerna är N2 eller hänvisningar; N1 har inga egna rörelsekontroller utöver de tio i `2-8` |
| 1.3, punkt 2 (rörelsebudgeten i briefen) | Oförändrat att budgeten står i briefen, under *ton och intryck* som i skrivreglernas tillägg (briefmallen ägs av `2-1`) |
| 1.5, lekfulla hinder (fallgrop 120) | 2-6 nämnde dem inte och hänvisade inte till sig själv; inget att ta bort. Hemvisten är `3-2` som granskningskriterium. Spårbarheten för `2-3` och `3-2` pekar felaktigt hit |
| 2.2, HTML först och utan JavaScript (`2-6` 11, 98) | Regeln → `2-4`, kontrollen → `2-8`; kvar i 2-6 är bara det rörelsespecifika (`opacity: 0`) |
| 2.4, öppna frågor | Hänvisar till `bilaga-e-oppna-fragor.md` vid budgetnivåerna, sidövergångar inom `no-preference`, Remotion (fler än tre anställda, 5.0), Scroll Worlds licens och kod från andras sajter, och i öppet-raden. Frågorna läggs in i bilagan av samordnaren |
| Hänvisningar | `karta/6-rorelse.md` → `historik/karta/6-rorelse.md`; `principer.md` → `guide/README.md`, princip 7; `guide/bilaga-e-…` → `bilaga-e-oppna-fragor.md`; byggplanen → `5-byggplan.md`, steg 3 |

**Följer med i andra filer:** `bilaga-c-kontroller.md` har C45–C49 som N1; de är nu N2 (C49 i 2-6).
