# 2.6 Rörelse

**Status:** konsoliderad v1.0, 2026-10-15; ommärkt 2026-10-15 efter granskningen. **Genomläst med Johnny 2026-10-15**; rättelserna står i `BESLUT.md`. Faktarättelser och förtydliganden med källa efter andra varvet införda 2026-10-16.

Rörelse är ett av lagren en webbyrå levererar utöver Garretts fem plan: övergångar, hover och rörelse vid scroll som stöder innehållet i stället för att stjäla uppmärksamhet. Standardprodukten är en vanlig flersidig företagssajt (`BESLUT.md` 2026-10-15), så rörelse är en förbättring ovanpå en sajt som fungerar utan den. Scrollytelling, Scroll World och rörlig grafik är tillval. Den första övningssajten byggs i två versioner, *sparsam* och *måttlig*, som Johnny dömer på video; den respekterar `prefers-reduced-motion`, och resten gäller från sajt 2.

## Vad byrån gör

### Policyn

WCAG 2.2 AA är golvet på alla nivåer (→ `2-8-teknik-och-kvalitet.md`), och kraven på nivå A nedan (2.2.2, 2.3.1) ingår i det. Med budgeten *sparsam* rör sig inget av sig självt, så de uppfylls redan i den första sajten; punkterna märkta N2 styr byggaren när budgeten blir större.

- [N1] **`prefers-reduced-motion` respekteras.** Med `reduce` förflyttas, skalas och roteras ingenting, varken vid laddning, scroll, hover, fokus eller i menyn. Opacitet och färg får stå kvar så att tillståndsbyten syns. Oskärpa räknas som rörelse. 📄 WCAG 2.3.3, tekniken C39 och erratan om oskärpa (`kunskap/research/2026-10-15_kompetensluckor-anteckningar/lager-6-7-rorelse-innehall.md` §7). Nivå AAA, över vårt golv, men C39 gör det nästan gratis.
  - [N2] Skript läser preferensen med `matchMedia` och följer ett byte medan sidan är öppen. 🔧
  - [N2] Scroll-drivna animationer och sidövergångar läggs inom `@media (prefers-reduced-motion: no-preference)`, eftersom en global återställning till 0,01 ms inte når dem (mätt i webb-pro 2026-10-12, webb-pros `kunskap/byggstandard.md` 3.5). ⚠️ Saknar primärkälla.
- [N1] **Ingen text börjar på `opacity: 0` i CSS**, så att innehållet syns även om en animation aldrig körs: utan JavaScript, med `reduce` och i en helsidesbild. Johnny och granskaren dömer på skärmbilder, och i måttstockens bilder syntes animationer som inte körts som tomma eller svarta partier (Kajens, Kierkegaard och We Care Car Care; `mattstock/mattstock.md`, *Gränser*). JavaScript-lagret är inte feltåligt (en källa – bänken; 📄 GOV.UK Service Manual, i `kunskap/research/2026-10-15_kompetensluckor-och-kandidater-per-lager.md`, lager 4). Regeln om HTML först och utan JavaScript → `2-4-skelett.md`.
- [N2] **Rörelse som pågår mer än fem sekunder kan pausas.** Det som startar automatiskt, varar över fem sekunder och visas bredvid annat innehåll får en knapp för att pausa, stoppa eller dölja. 📄 WCAG 2.2.2 (nivå A). Rörelse som startar när något scrollas in räknas som automatisk. 🔧
- [N2] **Inget blinkar mer än tre gånger per sekund.** 📄 WCAG 2.3.1 (nivå A); [Understanding 2.3.1](https://www.w3.org/WAI/WCAG22/Understanding/three-flashes-or-below-threshold.html), läst 2026-10-16.
- [N2] **Inget som bara går att dra.** En jämförelse före och efter, ett reglage eller en karusell går också att styra med ett tryck eller en knapp. 📄 WCAG 2.5.7 (nivå AA, alltså inom golvet; [Understanding 2.5.7](https://www.w3.org/WAI/WCAG22/Understanding/dragging-movements.html)).
- [N2] **Längd och kurvor:** de flesta animationer 100–500 ms, cirka 100 ms för enkel återkoppling och 200–300 ms för t.ex. en dialogruta; vid 500 ms känns det segt. Ease-out vid entré, ease-in vid utgång. 📄 NN/g, Laubheimer 2020 (`lager-6-7-rorelse-innehall.md` §7).
- [N2] **Animera transform, opacitet och färg på små ytor**, inte `width`, `height`, `top`, `left`, `margin` eller `padding`, och aldrig `transition: all`. `will-change` bara medan något rör sig. Annat ger ryck och sämre prestanda. Färg bara på små ytor, eftersom `color` målas om i varje bildruta (📄 Kowalski, `animation-performance`, `SKILL.md` rad 79; `BESLUT.md` 2026-10-16, *Frågelistan efter tredje varvet avgörs*). 📄 web.dev, Basques och Andrew, [How to create high-performance CSS animations](https://web.dev/articles/animations-guide) (2020: bara transform och opacitet; `top` och `left` tappade hälften av bildrutorna i deras prov); 🎥 scrollytelling-skillen (*Stitch-videon*); 🔧 webb-pros byggstandard 3.5.
- [N2] **Ingen scroll-kapning och högst en diskret parallax, med reserv.** Parallax, karuseller och scroll-kapning kan ge yrsel, illamående och migrän. 📄 NN/g; 🎥 scrollytelling-skillen. WCAG 2.3.3 nämner parallax som rörelse som sällan behövs.
- [N2] **Inga automatiska karuseller**, av samma skäl; rullar de över fem sekunder kräver de dessutom paus (WCAG 2.2.2). 📄 NN/g. Webb-pro hade ett ägarbeslut mot karuseller som inte är infört i `BESLUT.md`.
- [N2] **Rörelse kommer bara ur bibliotekets färdiga rörelser**, inom budgeten. Att byggaren inte lägger till egen rörelse gäller från den första sajten (→ *Rörelsebudget*).

### Rörelsebudget

Rörelsen hör till kitet (`2-5-yta.md`): varje kit har sina längder, kurvor och in-animationer i biblioteket, gjorda en gång med omsorg – långsamma och mjuka i *Lugn och luftig*, snabbare och tydligare i *Djärv och egen* (`BESLUT.md` 2026-10-15).

- [N1] **Den första övningssajten byggs i två versioner, *sparsam* och *måttlig*, och Johnny dömer dem på video** i mobil och dator, i normal och snabb scroll (inspelning med Playwright). Hans domar avgör standardbudgeten för de följande sajterna (`BESLUT.md` 2026-10-15). Hypotesen är Johnnys: lite välgjord rörelse ger premiumkänsla, så länge prestandan inte lider. Johnnys domar i måttstocken säger inget om rörelse, eftersom de gjordes på stillbilder. Den måttliga versionens scroll-drivna in-animationer kördes inte i bygget förrän felet rättades 2026-10-16 (*Sidövergångar och in-animationer*; om felet fanns i versionen Johnny dömde är inte prövat ⚠️), och Johnny dömer måttlig på video igen (`BESLUT.md` 2026-10-16, *Senaste version med verktygslås, Mobbin, måttlig rörelse på video …*).
- [N1] **Sparsam är standard; måttlig är ett tillval** för restaurang, café och kitet Djärv och egen, där stämningen är en del av varan. Den måttliga versionen börjar sektionerna från minst 70 % opacitet. Varför, i Johnnys ord: *"För vård, hantverkare och allt där kunden är ute efter en uppgift ska texten vara läsbar i samma ögonblick den syns."* Johnnys dom över den första övningssajten (`BESLUT.md` 2026-10-15, *Rörelse – sparsam som standard*).
  - *Sparsam*: bara tillståndsbyten – hover, fokus, menyn och kvittens när formuläret skickas. Inget startar av sig självt eller när något scrollas in, och sidövergångar väntar till sajt 2. Sidhuvud och knapplist som visas och göms vid scroll är tillåtna tillståndsbyten, eftersom de hjälper besökaren att nå Boka och Ring och står still med reducerad rörelse (`BESLUT.md` 2026-10-16, *Frågelistan efter tredje varvet avgörs*).
  - *Måttlig*: som sparsam, plus diskreta in-animationer och mikrointeraktioner ur kitets rörelser, på villkor: bara bibliotekets färdiga rörelser; bara transform, opacitet och färg, 100–500 ms med ease-out (*Policyn*); `reduce` respekteras; innehållet syns även om animationen aldrig körs (regeln ovan); **första skärmens text animeras aldrig in**, eftersom en text som tonas in från osynlig kan fördröja LCP och budskapet i måttstockens fråga 1 (NN/g avråder också från att animera logotyp, tagline och huvudrubrik: 📄 Wang, [Homepage Design: 5 Fundamental Principles](https://www.nngroup.com/articles/homepage-design-principles/), 2024, 5.3); och LCP och CLS blir inte sämre än i den sparsamma versionen (N1-kontroll 9, `2-8-teknik-och-kvalitet.md`). Inga automatiska karuseller, ingen parallax och inget blickfång.
  - Byggaren lägger aldrig till egen rörelse utöver kitets. Annars lägger Claude till småanimationer på eget initiativ, som bilder som zoomar och allt som tonas in vid scroll (fallgrop 4) (en källa – bänken; 🎥 *Stitch-videon*) – premium kommer av återhållsamhet och precision, inte av mängd. Briefen anger budgeten under ton och intryck (→ `2-1-strategi.md`). 🔧 (ommärkningen 2026-10-15)
- [N2] **Briefen anger sparsam, måttlig eller expressiv rörelse**, utifrån personen: ålder, ärende, enhet och brådska. En 70-åring som letar medicin vill inte scrolla genom en 3D-värld; en tonåring som köper hörlurar kan tycka att det är roligt 🎥 *Astra-videon*. Snyggt för fel person är också slop (fallgrop 164). Kitets standardbudget (→ `2-5-yta.md`) är utgångsläget. Källäget: nivåerna har en källa, en persons smak. WCAG 2.3.3 och NN/g stöder att rörelse ska vara återhållsam och gå att stänga av, men inte själva indelningen. Budgeten är ett granskningskriterium, inte en grind.
- [N2] **Vad nivåerna tillåter** (förslag 🔧; *öppet – se `bilaga-e-oppna-fragor.md`*). Policyn gäller på alla nivåer.

| Budget | Tillåtet |
|---|---|
| Sparsam | Tillståndsbyten (hover, fokus, meny, kvittens på formulär) och sidövergångar (sidövergångarna från sajt 2) |
| Måttlig | Som sparsam, plus in-animationer när sektioner kommer in i bild |
| Expressiv | Som måttlig, plus ett blickfång och scroll-drivna effekter |

Varför en budget: varje effekt kan se bra ut medan helheten blir jobbig för ögonen (fallgrop 5) 🎥 *Stitch-videon*.

### Ett blickfång

- [N2] **Högst ett blickfång per sajt**, en rörlig del som får sajten att sticka ut, t.ex. ett kort klipp i en egen sektion, som loop eller styrt av scroll 🎥 *Jack Roberts Claude Design 3.0-videon* (cirka 25 sekunder är en persons erfarenhet ⚠️). Bara med budgeten expressiv. Klippet är ljudlöst, har posterbild och synlig pausknapp, och vid `reduce` visas bara posterbilden. Text ligger i HTML. Undertexter → `2-7-innehall.md`; format och storlek → `.claude/skills/kvalitet/prestanda.md`, *Video*, och `.claude/skills/innehall/video.md`.

### Sidövergångar och in-animationer

- [N2] **Sidövergångar med `@view-transition { navigation: auto; }`** inom `no-preference`, utan JavaScript; Firefox visar vanlig navigering. Inte Astros `<ClientRouter />`, som Astro själv säger "will increasingly become unnecessary" och som gör sajten till en SPA (CSP → `2-8-teknik-och-kvalitet.md`). Sidövergångar inom `no-preference` är *öppet – se `bilaga-e-oppna-fragor.md`*.
- [N2] **In-animationer med Motions vanilla-API**, `animate` i mini-bygget (3,2 kB) och `inView` (0,5 kB), efter en `matchMedia`-kontroll. 📄 motion.dev, [animate](https://motion.dev/docs/animate) och [inView](https://motion.dev/docs/inview), lästa 2026-10-16.
- [N2] **Scroll-drivna CSS-animationer bara som förbättring**, inom `@supports (animation-timeline: view())` och `no-preference`, med synligt innehåll som grundläge. De är inte Baseline än: Chrome har dem sedan version 115 och Safari sedan 26, och Firefox får dem i version 159 den 27 oktober 2026 (📄 MDN:s kompatibilitetsdata, `css.properties.animation-timeline.view`, läst 2026-10-16). Den byggda CSS:en prövas: Lightning CSS slog ihop `animation` och `animation-timeline` till en förkortning som Chromium avvisar, så att den måttliga versionens in-animationer inte kördes i bygget. Skriv longhand (rättat i biblioteket 2026-10-16; → `.claude/skills/rorelse/sidbyten-och-scroll.md`, *Den byggda CSS:en*). 📄 MDN, [animation](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/animation); prövat i Chromium 156 med Lightning CSS 1.33 (andra varvet, rörelse).
- [N2] **Färdiga rörelser och easing-tokens i biblioteket** (→ `2-4-skelett.md`), t.ex. ur Open Props (MIT) utan dess oändliga animationer och oskärpa.
- [N2] **Avstå:** dotLottie (cirka 500 kB WASM, inget stöd för reducerad rörelse; undantag för kundens egna Lottie-filer), Lenis (scroll-kapning), AOS (inaktivt), animate.css (Hippocratic-licens), scroll-timeline-polyfillen (inaktiv) och astro-vtbot.

Källa för avsnittet: 📄 `lager-6-7-rorelse-innehall.md` §7.

### Små interaktioner

- [N2] **Små interaktioner gör sajten bra att använda**: kvittens när formuläret skickas, hover, mjuka tryck. Mest skillnad gör de i de funktionella delarna 🎥 *designskills-videon* (Emil Kowalskis *Animate*). Alltid inom budgeten.
- [N2] **Emils animationsregler är instruktioner** (lästa i original 2026-10-16, `kunskap/kallkort/emil-animate.md` och `emil-design-eng.md`; en källa – bänken där inget annat anges): ease-out in och ut (NN/g säger ease-in vid utgång och går före) · under 300 ms för små interaktioner (stämmer med NN/g) · knappar skalas till cirka 0,97 vid tryck · popup-fönster börjar på 0,9–0,95, aldrig noll · en popup växer från sin utlösare, utom modaler · inga animationer på element som används ofta · inga studsande eller elastiska kurvor (Emils skill tillåter lite studs vid lek; regeln här är strängare, → `.claude/skills/rorelse/SKILL.md`, princip 5).
- [N2] **Emils skills destilleras in i rörelseskillen.** *animation vocabulary* gör vaga beskrivningar till exakta ord 🎥 *designskills-videon*. UI Skills-MCP installeras inte: skills som laddas automatiskt gör flödet mindre förutsägbart 🎥 *Inspo-videon*.
- [N2] **Inspiration när biblioteket byggs:** LottieFiles (licens per fil), transitions.dev, 60fps.design, Motion Primitives 🎥 *Jack Roberts-videon 2*. Siffror som räknas upp visas färdiga vid `reduce`. 🔧

### Effekter från referenser

- [N2] **En effekt på en referenssajt beskrivs i ord och parametrar**, t.ex. "sektionen låses i cirka tre skärmhöjder, rubrikerna startar förskjutet, mjuk inbromsning". En skärmdump visar inte mekaniken, och en video bara att något rör sig. Härledda parametrar prövas i bygget innan de låses. 🔧 (efter arbetsgången i *REA-videon* 🎥). Steget Observe i ai-website-cloner-template (MIT) kan plocka isär hur en referens löser rörelse 📄 `2026-10-15_kompetensluckor-och-kandidater-per-lager.md`, lager 6. Kod från andras sajter får användas (`BESLUT.md` 2026-10-16).
- [N4] REA för detta prövas i sandlåda → `3-3-sakerhet-och-installningar.md`.

### Tillval

Väljs i briefen med skäl och godkänns av Johnny. Policyn gäller om inget undantag står i briefen.

- [N2] **Scrollytelling på startsidan:** startsidan blir en berättelse i kapitel som avslöjas vid scroll, övriga sidor är vanliga. Skillen `scrollytelling` (doodledood, MIT enligt README) 🎥 *Stitch-videon*; 📄 `kunskap/research/2026-10-14_stitch-och-verktyg.md`. Dess regler: berättelsen först, `svh` i stället för `vh` på mobil, CSS scroll-timeline eller IntersectionObserver först och GSAP ScrollTrigger bara för komplexa tidslinjer.
- [N2] **Tillvalets rörelse byggs på egen gren**, så att den godkända sajten ligger orörd tills rörelsen är godkänd 🎥 *Opus 5.5-videon*.
- [N2] **Optimera efter animationerna:** mät och behåll bara ändringar som inte försämrar rörelsen 🎥 *loop-nivåvideon*. Prestandagränserna → `2-8-teknik-och-kvalitet.md`.
- [N3] **Klipp med Remotion** (video från kod, plugin och skills i Claude Code) för blickfånget eller en kort film; text i klippet upprepas i HTML. Gratis för individer och vinstdrivande organisationer med upp till tre anställda, annars företagslicens, och licensen ändras i Remotion 5.0 📄 [LICENSE.md](https://github.com/remotion-dev/remotion/blob/main/LICENSE.md) (kontrollerad 2026-10-15); vad det betyder för byrån är *öppet – se `bilaga-e-oppna-fragor.md`*. remotion-dev/skills saknar licens i metadata. *Claude Motion* gör samma sak men är beta och bara för Team och Enterprise 🎥 *Claude Motion-videon*.
- [N4] **Scrollcraft:** scrollmotor med inbyggd kontroll av scrollpositioner via skärmdumpar 🎥 *Nate Herk 100-repon-videon* (upphovspersonens eget verktyg ⚠️). Prövas mot scrollytelling-skillen.
- [N4] **Scroll World:** en filmisk 3D-resa där scrollen för kameran genom AI-genererade klipp, med egna mobilklipp, från en videotjänst via MCP (Higgsfield, Manus som reserv) 🎥 *Opus 5.5-videon*. Den bryter mot policyn (scroll-kapning, tunga sidor) och kräver ett uttryckligt undantag i briefen. Kostnad per klipp och konto hos en videotjänst; läs Higgsfields villkor före kundmaterial (→ `2-5-yta.md`). ⚠️ Repots licens och innehåll är inte granskade – *öppet, se `bilaga-e-oppna-fragor.md`*.
- [N4] **Rörlig grafik i kod ovanpå video:** varje rörlig del har ett jobb, och loopar är sömlösa med samma första och sista bildruta 🎥 *Jack Roberts Motion Design-videon*. Läget som visar vad som är video och kod publiceras aldrig (→ `2-8-teknik-och-kvalitet.md`).
- [N4] **3D-objekt med img2threejs** kostar mycket tokens och tid, och första försöket blir sällan detaljerat nog 🎥 *repo-videon* ⚠️.
- [N4] **Djup genom lager**, separata plan för text, bakgrund, objekt och förgrund, står på bänken: en persons smak och i strid med regeln om en parallax 🎥 *Astra-videon*. Prövas mot en enkel effekt inom budgeten innan regeln ändras.

## Vad som kommer ut

Den första sajten ger budgeten *sparsam* i briefen och en sajt där bara tillståndsbyten rör sig och `prefers-reduced-motion` respekteras.

- [N2] Rörelsepolicyn i rörelseskillen, färdiga rörelser och easing-tokens i biblioteket och en standardbudget per kit.
- [N2] En rörelsebudget per sajt i briefen, sparsam, måttlig eller expressiv.
- [N2] Vid tillval: rörelsen på egen gren och video av scrollningen till granskningen.

## Kompetens och källor

- [N2] **Egen skill:** rörelseskillen (`.claude/skills/rorelse/`, sedan 2026-10-16), destillerad ur emil-animate, emil-animation-vocabulary, emil-design-eng, emil-find-animation-opportunities, emil-improve-animations, emil-review-animations, Emils animation-performance, motion och gsap, med policyn ovan, och jämförd med originalen regel för regel samma dag. Apples HIG om rörelse står i `apple-hig.md`. 📄 `historik/karta/6-rorelse.md`; `inventering/inventering.json`.

**Förankring:** WCAG 2.2.2, 2.3.1, 2.3.3 med C39 och 2.5.7, NN/g (Laubheimer 2020; Wang 2024), MDN:s kompatibilitetsdata och Interop 2026. 📄 `lager-6-7-rorelse-innehall.md` §7–8.

**Kandidater och beslut** (domarna i inventeringen; besluten i fältet `beslut`, `BESLUT.md` 2026-10-16, *Placeringarna i inventeringen blir beslut*): policyn blir kontroll; Emils skills, Motion och GSAP finns i rörelseskillen; scroll-drivna animationer och Open Props hör till biblioteket; `@view-transition` väntar till N2; Avstå enligt listan ovan. Effort för den som bygger animationer → `3-3-sakerhet-och-installningar.md`.

## Kontroll

Hur granskningen går till står i `3-2-granskning-och-kalibrering.md`. Här står vad rörelsen bedöms mot. Den första sajten har inga egna automatiska rörelsekontroller, eftersom N1 har högst tio kontroller (→ `2-8-teknik-och-kvalitet.md`); med budgeten *sparsam* finns lite att mäta, och Johnny dömer sajten.

**Mätbart**

- [N2] **Reducerad rörelse – grind (norm: WCAG 2.3.3, C39).** Sidan renderas med `reduce`, och ingenting förflyttas, skalas eller roteras.
- [N2] **Fem sekunder – grind (norm: WCAG 2.2.2).** Skärmbilder efter 6 och 7 sekunder utan interaktion är lika, eller så finns en pausknapp. 🔧 (metod från webb-pros byggstandard 3.5)
- [N2] Bygget går igenom utan konsolfel också med reducerad rörelse (konsolfelen i övrigt → `2-8-teknik-och-kvalitet.md`).
- [N2] **Statisk sökning som underlag:** durationer, studsande eller elastiska kurvor, `transition: all` och animerade egenskaper utöver transform, opacitet och färg. `transition: all` och layoutegenskaper stoppar (📄 web.dev 2020; Motion; GSAP); längder och kurvor bedöms men stoppar inte (bänken). (`BESLUT.md` 2026-10-16, *Frågelistan efter tredje varvet avgörs*)
- [N2] Bildfrekvens vid scroll och layoutskiften mäts (→ `2-8-teknik-och-kvalitet.md`).
- [N2] **Kontrollskriptet prövar rörelsen:** den byggda CSS:en (13: tidslinje i förkortningen, ordning och reserv; 13c: C58), reducerad rörelse (13d: C56), fem sekunder (13e: C57), första skärmen (13f) och text som börjar osynlig (13g). Registret: `bilaga-c-kontroller.md`.

Att allt innehåll syns utan JavaScript är regel i `2-4-skelett.md` och kontroll i `2-8-teknik-och-kvalitet.md`.

**Granskningskriterier**

- [N2] **Passar rörelsen målgruppen och budgeten?** (en källa – bänken; 🎥 *Astra-videon*.)
- [N2] **Rörelse granskas på video, inte på stillbilder.** I videon missade loopen en maskot som blinkade fel mellan två skärmdumpar (fallgrop 55) 🎥 *loop-nivåvideon*. Granskaren får inspelningar i normal och snabb scroll, dator och mobil, och med `reduce`. Det som ändå inte syns märks *för lite information* (→ `3-2-granskning-och-kalibrering.md`).
- [N2] **Tjänar rörelsen innehållet?** Överlast, tempo och flimmer vid snabb scroll, sömlösa loopar. I videon blev stjärnorna för många vid snabb scroll 🎥 *Stitch-videon*. Granskningen → `.claude/skills/rorelse/granskning.md`.

## Hur självgående

I den första sajten tittar Johnny på hela bygget och dömer de två rörelseversionerna på video (`5-byggplan.md`, steg 3).

- [N2] **Självgående inom policyn och biblioteket** (`historik/karta/6-rorelse.md`): byggaren använder bibliotekets rörelser inom budgeten, och Johnny ser resultatet i slutgranskningen.
- [N2] **Budgeten expressiv och blickfånget** godkänns av Johnny i briefen.
- [N2] **Tillval kräver också granskning på video.**
- [N4] **Full autonomi bara där måttet är entydigt:** reducerad rörelse, femsekundersregeln och prestanda (`guide/README.md`, princip 7).

*Öppet – se `bilaga-e-oppna-fragor.md`:* vad budgetnivåerna tillåter, sidövergångar inom `no-preference`, Remotion vid fler än tre anställda och i 5.0 och Scroll Worlds licens. Om kod från referenser får kopieras är avgjort (`BESLUT.md` 2026-10-16, *Referensregeln och kodregeln strukna*).
