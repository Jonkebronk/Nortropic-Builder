---
name: rorelse
description: Bestämmer och granskar rörelsen på en Nortropic-sajt – hover, tryck och fokus, menyer och paneler, sidbyten, in-animationer, längder och kurvor i kitet och reducerad rörelse – inom budgeten sparsam, måttlig eller expressiv; använd när något ska animeras eller få en övergång, när rörelsen känns seg, hackig eller för mycket, när kitets rörelsetokens ska sättas eller när rörelsen ska granskas.
---

# Rörelse

Lager 6. Rörelse är en förbättring ovanpå en sajt som fungerar utan den (→ `guide/2-6-rorelse.md`). Premium kommer av återhållsamhet och precision, inte av mängd. Skillen säger vad rörelsen ska uppnå och vad som är förbjudet. Reglerna som redan står i guiden refereras och skrivs inte om här.

**Budgeten är sparsam om inget annat väljs.** Måttlig är ett tillval för restaurang, café och kitet Djärv och egen. Expressiv kräver Johnnys godkännande i briefen. Johnnys skäl: *"För vård, hantverkare och allt där kunden är ute efter en uppgift ska texten vara läsbar i samma ögonblick den syns."* (`BESLUT.md` 2026-10-15, *Rörelse – sparsam som standard*)

## Syfte

Varje rörelse på sajten ska ha ett jobb besökaren märker: att knappen hörde trycket, att menyn kom från menyknappen, att sidan bytte tillstånd utan ryck. Allt annat tas bort. Skillen används både när rörelse byggs och när den granskas.

## In

- Briefen: rörelsebudgeten under *ton och intryck* (→ `guide/2-1-strategi.md`).
- Kitet: rörelsetokens i `bibliotek/stilkit/<kit>/kit.css` och *Rörelse* i `design.md`.
- Bibliotekets rörelser: `bibliotek/src/styles/rorelse.css`, `rorelse-mattlig.css` och sektionernas egna övergångar.
- Den körande sajten i 375 och 1280 px, med och utan `prefers-reduced-motion: reduce`.

## Ut

- **När rörelse byggs:** CSS (eller JavaScript där CSS inte räcker) med kitets tokens, där reducerad rörelse och hover-spärr ingår i samma ändring. Till varje rörelse en rad: element, utlösare, syfte, egenskaper, längd, kurva och vad som händer med `reduce`.
- **När rörelse granskas:** fynd i granskarens form – element, förväntat, faktiskt, allvar och källa – plus två till fem *avvisade kandidater*, alltså rörelser som prövades och valdes bort, med skälet (→ [granskning.md](granskning.md)).
- Video av rörelsen när budgeten är större än sparsam (→ `guide/2-6-rorelse.md`, *Kontroll*).

## Budgetarna i praktiken

Vad nivåerna tillåter står i guiden och är delvis öppet (→ `guide/2-6-rorelse.md`, *Rörelsebudget*; `guide/bilaga-e-oppna-fragor.md`). Så här läses de i bygget:

| Budget | Får röra sig | Får inte |
|---|---|---|
| Sparsam | Tillståndsbyten som besökaren utlöser: hover, tryck, fokus, meny och paneler, FAQ-ikonen, kvittens på formulär. Sidhuvud och knapplist som visas och göms vid scroll räknas hit som tolkning; förslag till Johnny 2026-10-16, inte beslutat | Inget som startar av sig självt vid laddning eller när något scrollas in. Sidbyten bara efter Johnnys dom på video ([sidbyten-och-scroll.md](sidbyten-och-scroll.md)) |
| Måttlig | Som sparsam, plus diskreta in-animationer under första skärmen, från minst 70 % opacitet, och mikrointeraktioner ur kitet | Första skärmens text och bild animeras aldrig in. LCP och CLS blir inte sämre än i sparsam |
| Expressiv | Som måttlig, plus ett blickfång och scroll-drivna effekter | Scroll-kapning. Mer än en parallax |

## Principer

1. **Varje rörelse har ett syfte som går att namnge:** återkoppling, tillståndsbyte, rumslig koppling eller att mildra ett ryck. Den som inte kan namnge syftet bygger inte rörelsen. 📄 NN/g, Laubheimer 2020, *The Role of Animation and Motion in UX*; 📄 Apple HIG, *Motion* (*"Don't add motion for the sake of adding motion"*); 📄 Kowalski, `animate` steg 2 (MIT).
2. **Frekvensen styr.** Det som används ofta får kortare och svagare rörelse eller ingen alls. Kortkommandon och fokushopp animeras aldrig. En meny som öppnas med Enter är ett vanligt knapptryck och följer menyns regler. 📄 NN/g, Laubheimer 2020, *Duration* (*"the more frequent the animation, the more subtle and shorter"*); 📄 Apple HIG (*"avoid adding motion to UI interactions that occur frequently"*); 📄 Kowalski, `animate` steg 1 och `find-animation-opportunities` (*Frequency*: kortkommandon, kommandopalett och fokushopp).
3. **Texten är läsbar i samma ögonblick den syns.** Ingen text börjar på `opacity: 0` (→ `guide/2-6-rorelse.md`, N1). Första skärmens text animeras aldrig in (→ samma fil, villkoren för måttlig). En korstoning mellan sidor, där två sidors text syns samtidigt, prövas på video innan den används ([sidbyten-och-scroll.md](sidbyten-och-scroll.md)). 📄 `BESLUT.md` 2026-10-15.
4. **Längder efter elementets storlek och syfte:** cirka 100–160 ms för återkoppling, 150–250 ms för små delar som vänds eller fälls ut och 200–300 ms för paneler. Inget i gränssnittet över 500 ms. Utgången är kortare än entrén. Tabellen står i [matt.md](matt.md). 📄 NN/g, Laubheimer 2020; 📄 Kowalski, `animate` steg 5; 📄 Material 3, `md.sys.motion`-tokens.
5. **Kurvor:** ease-out vid entré. Vid utgång en kortare längd med ease-in eller samma ease-out; guiden låter NN/g gå före Emil (→ `guide/2-6-rorelse.md`, *Små interaktioner*). Inga studsar i sparsam. Värdena står i [matt.md](matt.md). 📄 NN/g, Laubheimer 2020; 📄 Material 3, tokenparen *decelerate* och *accelerate*; 📄 Motion, `best-practices/index.md` (*"If a serious website … don't use overshoot"*, MIT).
6. **Bara billiga egenskaper:** transform, opacitet och färg, plus `clip-path` vid behov. Aldrig `transition: all` och aldrig layoutegenskaper (→ `guide/2-6-rorelse.md`, N2). `box-shadow` målas om i varje bildruta: en skugga som ska ändras ligger på ett pseudoelement som tonas, eller blir `filter: drop-shadow()`. Oskärpa över 20 px är dyr och räknas dessutom som rörelse. Ingen förflyttning drivs av en CSS-variabel på en förälder, eftersom alla barn då räknas om i varje bildruta. `will-change` bara när ett ryck eller tappade bildrutor syns. 📄 web.dev, Basques och Andrew, *How to create high-performance CSS animations* (2020); 📄 Kowalski, `animation-performance` (MIT); 📄 GSAP, `gsap-performance` (MIT); 📄 Motion, `best-practices/index.md`.
7. **Tokens, inga lösa värden.** Längder och kurvor kommer ur kitet. En komponent som skriver egna millisekunder eller egna `cubic-bezier` är ett fynd. Rörelsen hör till kitet (`BESLUT.md` 2026-10-15). 📄 Val Head, *Including Animation In Your Design System*, Smashing 2019; 📄 Kowalski, `animate` (*Hard Rules* 2–3).
8. **Reducerad rörelse och hover-spärr levereras med rörelsen,** inte senare. Med `reduce` förflyttas, skalas, roteras och suddas ingenting; färg och opacitet får stå kvar (→ `guide/2-6-rorelse.md`, N1). Mönstren står i [reducerad.md](reducerad.md). 📄 WCAG 2.3.3 med C39 och SCR40.
9. **Avbrytbart:** det som kan utlösas igen innan det är klart, som meny, knapplist och FAQ, byggs med `transition`, inte `@keyframes`. Besökaren behöver aldrig vänta på en animation. 📄 Kowalski, `review-animations` standard 6; 📄 Apple HIG (*"Let people cancel motion"*).
10. **Billigaste verktyget som räcker:** CSS först, sedan WAAPI, Motion och sist GSAP. Kostnaden i JavaScript per sida redovisas. React, Motion och GSAP är tillåtna (`BESLUT.md` 2026-10-16, *React, Tailwind och JavaScript tillåts*), men en hover eller ett tryck motiverar aldrig en React-ö. Valet står i [verktyg.md](verktyg.md). 📄 Motion, `best-practices/css-or-motion.md`; 📄 Kowalski, `animate` steg 3.
11. **Rörelsen bär kitets personlighet:** lugn är långsammare och mjukare och djärv är snabbare och tydligare. Skillnaden ligger i längden och kurvan, inte i fler effekter (→ `guide/2-6-rorelse.md`, *Rörelsebudget*). 📄 Val Head, *Designing Interface Animation*, kap. 9 (A List Apart 2016): *"Smaller movements read as more calm and subtle than larger more drastic movements."*
12. **Rörelse bedöms i rörelse:** på video, i 375 och 1280 px och med och utan `reduce` (→ `guide/2-6-rorelse.md`, *Kontroll*; `guide/bilaga-c-kontroller.md`, C61). Det som beror på känsla kontrolleras i slowmotion. 📄 Kowalski, `review-animations/STANDARDS.md` (*Debugging*).
13. **Seg mäts innan något ändras.** Skilj rörelsens längd från sidans svar: läs övergångens längd och fördröjning ur `getAnimations()`, och mät INP med delarna enligt `../kvalitet/prestanda.md` i en mobil med tryck och fyrdubbel CPU-strypning. Ligger tiden i inmatningsfördröjning eller bearbetning rättas skriptet, inte längden eller kurvan. På övningssajten tog första menyöppningen 135–138 ms i bearbetning när samtyckesrutan var öppen, med samma övergång som annars (övningssajtens `mcp-prov.md`, 2026-10-16). Hur det mäts: [granskning.md](granskning.md), *Mätning*. Mikroprov: [`kunskap/research/2026-10-16_mikroprov-lucka1.md`](../../../kunskap/research/2026-10-16_mikroprov-lucka1.md).

## Förbud

- Ingen text som börjar osynlig i CSS och ingen in-animation av första skärmen (→ `guide/2-6-rorelse.md`).
- Inget som rör sig av sig självt i mer än fem sekunder utan paus, och inget som blinkar mer än tre gånger per sekund. 📄 WCAG 2.2.2 och 2.3.1 (→ `guide/2-6-rorelse.md`).
- Inget som bara går att dra. En jämförelse före och efter, ett reglage eller en karusell går också att styra med ett tryck eller en knapp. 📄 WCAG 2.5.7 (AA).
- Ingen text delas i tecken eller ord för att animeras in (SplitText, Motions `splitText`), utom i expressiv budget med Johnnys ja. Texten ska vara läsbar direkt, och uppdelad text kräver egen hantering för skärmläsare. 📄 `BESLUT.md` 2026-10-15; 📄 GSAP, `gsap-plugins` (*SplitText*, `aria`).
- Ingen scroll-kapning och inga bibliotek för mjuk scroll, som Lenis och GSAP ScrollSmoother. Inga automatiska karuseller (→ `guide/2-6-rorelse.md`). 📄 NN/g, *Scrolljacking 101* (2023).
- Ingen `transition: all`, inga animerade layoutegenskaper och ingen entré från `scale(0)`. 📄 Kowalski, `animate` (*Never Ship*).
- Inga studsande eller elastiska kurvor i sparsam, alltså inget `cubic-bezier` med y över 1 eller under 0 och inga `bounce` eller `elastic`. 📄 Motion, `best-practices/index.md`; 📄 Kowalski, `animate` steg 5.
- Ingen hover-rörelse utanför `@media (hover: hover) and (pointer: fine)`. 📄 Kowalski, `mobile-native` och `animate` steg 7.
- Ingen rörelse som byggaren hittar på utanför kitet och biblioteket (→ `guide/2-6-rorelse.md`, fallgrop 4).
- Ingen oskärpa som animeras med `reduce`, och inga oändliga animationer ur Open Props. 📄 WCAG 2.3.3, erratan; 📄 Open Props, `props.animations.js`.
- Inga tredjepartsskills installerade i kundbygget. Emils, Motions och GSAP:s skills är destillerade här (→ `guide/bilaga-a-verktyg.md`).
- Motion+ och MotionScore kräver konto och används inte utan Johnny ([verktyg.md](verktyg.md)).

## Kontrollista mot en sajt

Kör i 375 och 1280 px på startsidan, en tjänstesida och kontaktsidan. Skriv varje punkt som klar, fynd eller *för lite information*.

1. **Inventering:** varje rörelse är listad med element, utlösare, egenskaper, längd och kurva, och listan ryms i briefens budget.
2. **Statisk sökning:** inga träffar på `transition: all`, layoutegenskaper i `transition` eller `@keyframes`, kurvor med y över 1, `infinite` eller längder över 300 ms på gränssnittsdelar. Bara rapport (→ `guide/bilaga-c-kontroller.md`, C58).
3. **Tokens:** inga millisekunder eller kurvor skrivna direkt i komponenterna.
4. **Hover:** varje klickbar sak ändrar sig synligt vid hover inom `(hover: hover) and (pointer: fine)`. Färgstegen kommer ur `yta` (→ `.claude/skills/yta/detaljer.md`).
5. **Tryck:** allt som går att trycka på ger kvittens inom cirka 100 ms (`:active`), på mobil och dator, också menylänkar och fristående länkar. Släppet går lika fort tillbaka, och inget hover-läge står kvar efter ett tryck på pekskärm.
6. **Fokus:** fokusringen syns direkt, utan fördröjning, och döljs inte av sidhuvud, knapplist eller samtyckesruta.
7. **Paneler:** menyn kommer från sin knapp eller kant med ease-out på 200–300 ms, går ut snabbare och samma väg, och bakgrunden tonas med panelen. Den går att stänga mitt i rörelsen.
8. **Reducerad rörelse:** med `reduce` förflyttas, skalas och roteras ingenting. Panelen syns direkt eller tonas in, och knapplisten tonas (→ C56).
9. **Fem sekunder:** skärmbilder av fönstret efter 6 och 7 sekunder utan interaktion är lika (→ C57). Ta bilder av fönstret, inte helsidesbilder; helsidesbilder ändrar fönstret och kan ge falskt utslag.
10. **Synligt utan rörelse:** en helsidesbild med `reduce` och en utan JavaScript visar allt innehåll.
11. **Sidbyten:** inga utan Johnnys val. Om de finns: inom `no-preference`, med stilla sidhuvud, högst 200 ms och prövade på video ([sidbyten-och-scroll.md](sidbyten-och-scroll.md)).
12. **Prestanda:** LCP och CLS är inte sämre än utan rörelsen (→ `guide/2-8-teknik-och-kvalitet.md`, N1-kontroll 9). JavaScript för rörelse är redovisat per sida.
13. **Byggd CSS:** varje scroll-driven regel finns kvar efter minifieringen, med `animation-timeline` som egen deklaration, och animationen har ett namn i den byggda sidan (→ [sidbyten-och-scroll.md](sidbyten-och-scroll.md), *Den byggda CSS:en*). Gäller måttlig och expressiv.

## Delfiler

| Fil | Innehåll |
|---|---|
| [matt.md](matt.md) | Längder per element, kurvor, utgång mot entré, förslag till rörelsetokens per kit |
| [tillstand.md](tillstand.md) | Den sparsamma rörelsen komponent för komponent: knappar, länkar, fokus, meny, knapplist, sidhuvud, samtyckesruta, FAQ, formulär och ankarlänkar |
| [reducerad.md](reducerad.md) | WCAG 2.2.2, 2.3.1 och 2.3.3, vad som räknas som rörelse, mönster i CSS, Motion och GSAP, och hur det provas |
| [sidbyten-och-scroll.md](sidbyten-och-scroll.md) | `@view-transition`, scroll-drivna animationer och in-animationer i måttlig |
| [verktyg.md](verktyg.md) | CSS, WAAPI, Motion, GSAP och Open Props: när, vad det kostar i JavaScript, licenser och vad vi avstår |
| [granskning.md](granskning.md) | Hur rörelse granskas: grinden, standarderna, åtgärdsordningen och formen på fynden |
| [ordlista.md](ordlista.md) | Svenska ord för rörelseeffekter, så att en referens kan beskrivas exakt |
| [motion.md](motion.md) | Motion i React-öar och dess JavaScript-API: valordningen CSS, `animate()` och Motion för React, LazyMotion, reducerad rörelse och budget per nivå (ur `kunskap/research/2026-10-16_tailwind-och-motion-i-astro.md`) |
| [apple-hig.md](apple-hig.md) | Apples HIG för rörelsen: rörelse som aldrig bär ensam, samma väg in och ut, inget som rör sig vid laddning, HIG:s lista för reducerad rörelse och vad som gäller för Emil Kowalskis `apple-design` |

## Källor

- Emil Kowalski, [emilkowalski/skills](https://github.com/emilkowalski/skills) (MIT, commit `2d22863`, läst 2026-10-16): `animate`, `animation-vocabulary`, `emil-design-eng`, `find-animation-opportunities`, `improve-animations`, `review-animations`, `animation-performance` och `mobile-native`. Destillerat med egna ord. Jämfört regel för regel med webb-pros kopior 2026-10-16 (commit `e8a175d`, samma text som `2d22863`).
- Motion, [motiondivision/ai-kit](https://github.com/motiondivision/ai-kit), skillen `motion` (paketet MIT, commit `b7e2c68`), [motion.dev/docs](https://motion.dev/docs), `CHANGELOG.md` och källan i [motiondivision/motion](https://github.com/motiondivision/motion) (commit `2d27b04`, 2026-10-16).
- web.dev: Basques och Andrew, [How to create high-performance CSS animations](https://web.dev/articles/animations-guide) (2020). MDN: [animation](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/animation). W3C: [Understanding 2.3.1](https://www.w3.org/WAI/WCAG22/Understanding/three-flashes-or-below-threshold.html) och [Understanding 2.5.7](https://www.w3.org/WAI/WCAG22/Understanding/dragging-movements.html).
- GreenSock, [greensock/gsap-skills](https://github.com/greensock/gsap-skills) (MIT, commit `aed9cfd`). GSAP-biblioteket har en egen licens ([verktyg.md](verktyg.md)).
- [Open Props](https://github.com/argyleink/open-props) (MIT), `props.easing.js` och `props.media.js`.
- W3C: [Understanding 2.2.2](https://www.w3.org/WAI/WCAG22/Understanding/pause-stop-hide.html), [Understanding 2.3.3](https://www.w3.org/WAI/WCAG22/Understanding/animation-from-interactions.html), [CSS View Transitions 1](https://www.w3.org/TR/css-view-transitions-1/).
- MDN: [@view-transition](https://developer.mozilla.org/en-US/docs/Web/CSS/@view-transition) och [browser-compat-data](https://github.com/mdn/browser-compat-data) (commit `078588a`, 2026-10-16). Chrome for Developers: [Cross-document view transitions](https://developer.chrome.com/docs/web-platform/view-transitions/cross-document).
- NN/g: Laubheimer, [Duration and Motion Characteristics](https://www.nngroup.com/articles/animation-duration/) (2020) och [The Role of Animation and Motion in UX](https://www.nngroup.com/articles/animation-purpose-ux/) (2020); Kendrick, [Microinteractions](https://www.nngroup.com/articles/microinteractions/) (2018); Paul, [Scrolljacking 101](https://www.nngroup.com/articles/scrolljacking-101/) (2023).
- Val Head: [Designing Safer Web Animation for Motion Sensitivity](https://alistapart.com/article/designing-safer-web-animation-for-motion-sensitivity/) (A List Apart 2015, uppdaterad 2020), [kap. 9 ur *Designing Interface Animation*](https://alistapart.com/article/designing-interface-animation) (2016), [Including Animation In Your Design System](https://www.smashingmagazine.com/2019/02/animation-design-system/) (2019). Boken i sin helhet är inte läst ⚠️.
- Material 3: `md.sys.motion`-tokens ur [material-web](https://github.com/material-components/material-web) (Apache-2.0). Apple: [HIG Motion](https://developer.apple.com/design/human-interface-guidelines/motion).
