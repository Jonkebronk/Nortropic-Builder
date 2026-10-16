# Verktyg – när CSS räcker och när Motion eller GSAP behövs

Delfil till `SKILL.md`. React, Tailwind, Motion och GSAP är tillåtna, och Astro står kvar med React som öar (`BESLUT.md` 2026-10-16, *React, Tailwind och JavaScript tillåts*). Det billigaste verktyget som räcker väljs, och kostnaden redovisas. Krockar med Lighthouse 100, *HTML först* och rörelsereglerna tas upp med Johnny; de stoppar inte.

## Välj verktyg

| Behov | Verktyg | JavaScript per sida | Reducerad rörelse |
|---|---|---|---|
| Hover, tryck, fokus, ett tillstånd som styrs med en klass eller ett attribut | CSS `transition` | 0 | `@media`-regel (C39) |
| Entré när något visas, utan JavaScript, som en popover | CSS `@starting-style` och `transition-behavior: allow-discrete` | 0 | `@media`-regel |
| Förbestämd rörelse som ska vara mjuk medan sidan laddar | CSS `@keyframes` (går utanför huvudtråden) | 0 | `@media`-regel |
| Sidbyte | CSS `@view-transition` ([sidbyten-och-scroll.md](sidbyten-och-scroll.md)) | 0 | Regeln inom `no-preference` |
| Rörelse som följer scrollen | CSS `animation-timeline` | 0 | Regeln inom `no-preference` och `@supports` |
| Styrning från skript med CSS:ens prestanda | WAAPI, `element.animate()` | Några rader | `matchMedia` (SCR40) |
| In-animation när något scrollas in, sekvenser, fjädrar | Motion vanilla: `inView` 0,5 kB, `animate` mini 3,2 kB, hybrid 22 kB | 0,5–22 kB | `matchMedia` själv ⚠️ ([reducerad.md](reducerad.md)) |
| Rörelse i en React-ö som redan finns: utgång när ett element tas bort, layoutanimation, drag | Motion för React: `m` med `LazyMotion` cirka 5 kB plus `domAnimation` 24 kB, eller hela `motion` 43 kB | 5–43 kB plus React | `<MotionConfig reducedMotion="user">` |
| Långa tidslinjer, scrollytelling med fästa sektioner | GSAP och ScrollTrigger | 28 + 18 kB | `gsap.matchMedia()` |

**Källor till tabellen:**
- Valordningen: 📄 Kowalski, `animate` steg 3 (MIT); 📄 Motion, `best-practices/css-or-motion.md` (*"Pick the simplest tool that does the job well cross-browser"*).
- Motions storlekar: 📄 motion.dev/docs/animate, /inview och /react-reduce-bundle-size, lästa 2026-10-16. Motion anger storlekarna själv; de är inte mätta här.
- GSAP: mätt 2026-10-16 på `gsap` 3.15.0 från npm; `gsap.min.js` 28,3 kB och `ScrollTrigger.min.js` 18,0 kB komprimerade med gzip.
- React-ön: mätt 2026-10-16 på `react` och `react-dom` 19.3.1: klientdelen är cirka 78 kB minifierad och komprimerad med gzip (75,0 + 3,5 kB). Det kommer före Motions egen kostnad.

**Därför:**
- Sparsam rörelse behöver aldrig JavaScript för rörelsen. Alla tillstånd i [tillstand.md](tillstand.md) är CSS.
- En React-ö laddas för interaktionen, aldrig för rörelsen. Rörelsen i en ö som ändå finns får använda Motion för React.
- Motion är bättre än CSS när rörelsen kan avbrytas av gester, när ett element ska animeras ut innan det tas bort och när en layout ändras. 📄 Motion, `css-or-motion.md`.
- GSAP väljs för tillvalet scrollytelling (→ `guide/2-6-rorelse.md`, *Tillval*) och för långa tidslinjer. GSAP:s egna skills rekommenderar GSAP som standard när inget bibliotek är valt; det gäller inte hos oss.

## Om GSAP används

Bara i tillvalet scrollytelling eller för en lång tidslinje (→ *Därför* ovan). Det här ska vara sant, ur GreenSocks egna skills (📄 `greensock/gsap-skills`, MIT, `aed9cfd`):
- **Allt ligger i `gsap.matchMedia()`** med villkoret `(prefers-reduced-motion: no-preference)`, så att rörelsen återställs när villkoret slutar gälla (→ [reducerad.md](reducerad.md)). 📄 `gsap-core`.
- **`gsap.from()` sätter startläget direkt** när skriptet körs (`immediateRender`). På text betyder det att texten blir genomskinlig tills animationen kört: aldrig på första skärmen, och startvärdet minst 0,7 (→ `guide/2-6-rorelse.md`). `autoAlpha: 0` gömmer dessutom elementet med `visibility: hidden`. 📄 `gsap-core`.
- **ScrollTrigger sitter på tidslinjen eller en tween högst upp,** aldrig på en tween inuti en tidslinje. `scrub` och `toggleActions` används inte på samma utlösare. 📄 `gsap-scrolltrigger`, `gsap-timeline`.
- **`ScrollTrigger.refresh()` efter att typsnitt och bilder laddats,** och utlösarna skapas uppifrån och ned. Annars hamnar start och slut fel. 📄 `gsap-scrolltrigger`.
- **Inga `markers` och ingen GSDevTools** i det som publiceras. 📄 `gsap-scrolltrigger`, `gsap-plugins`.
- **Fästa sektioner (`pin`) bara i scrollytelling,** och falsk vågrät scroll med `ease: "none"`. ScrollSmoother används inte (→ *Avstå*). 📄 `gsap-scrolltrigger`; 📄 NN/g, *Scrolljacking 101*.
- **Draggable får ett tryckalternativ.** 📄 WCAG 2.5.7 (AA).
- **Exemplen tas inte som de är.** Rättelserna i PR #8, #10 och #19 var fortfarande inte sammanslagna 2026-10-16, och exemplet för vågrät scroll i `gsap-scrolltrigger` ger ett fel. 📄 github.com/greensock/gsap-skills/pulls.

## Licenser och villkor

| Verktyg | Licens | Vad den kräver |
|---|---|---|
| Motion (`motion` på npm) | MIT | Licenstexten följer med koden |
| Motion+ (exempel, Motion UI, MotionScore, övergångsredigeraren) | Betald: Solo, en engångsavgift, och Team, årsavgift per plats för två eller fler. *"Usage by more than one person requires a Team package."* Koden från Motion+ är MIT när den väl ligger i sajten. Den som säljer vidare Motion+-funktioner behöver en *Builder's Licence* | Konto och betalning. Johnny avgör ⚠️ (priset 399 USD för Solo syns bara i sidans strukturerade data) 📄 motion.dev/plus |
| GSAP med alla tillägg | Webflows *Standard No-Charge License* (gäller från 2025-04-30), inte MIT | Fri för kommersiellt bruk på webbplatser. Får inte användas i verktyg som låter användare bygga animationer utan kod i konkurrens med Webflow. Webflow kan ändra villkoren och säga upp licensen vid överträdelse. ⚖️ Tolkning, inte juridisk rådgivning: en kundsajt är tillåten användning. 📄 gsap.com/standard-license |
| Open Props | MIT | Licenstexten följer med |
| Emils, Motions och GSAP:s skills | MIT (Motions repo saknar egen LICENSE-fil; paketet `motion-ai` är MIT ⚠️) | Destilleras med egna ord och källa |

## Open Props

- **Ta:** kurvorna ur `props.easing.js`, till exempel `--ease-out-3`, `--ease-quint-out` och `--ease-spring-1`, och idén om `--motionOK`. Den nya receptfilen `src/extra/transitions.css` (2026-10-11) visar popover- och dialogövergångar i ren CSS.
- **Ta inte:**
  - de oändliga animationerna (`spin`, `ping`, `blink`, `float`, `bounce` och `pulse`), som bryter mot WCAG 2.2.2 när de visas bredvid innehåll
  - toningarna med `blur(20px)`, eftersom oskärpa räknas som rörelse
  - receptfilens 1 s, som är för långt (NN/g).
- `--motionOK` är en `@custom-media`, och den stöds inte i någon webbläsare utan byggsteg (Firefox 148 bakom flagga; MDN browser-compat-data 2026-10-16). Den kräver PostCSS. Skriv `@media (prefers-reduced-motion: no-preference)` direkt i stället. 📄 `props.media.js` (MIT).

## Motions AI Kit och MCP-servrar

- **Gratis, utan konto:** skillen med bästa praxis och sökningen i Motions dokumentation (från version 7.0.0, 2026-07-28). 📄 `motiondivision/ai-kit`, `CHANGELOG.md` och `plugins/motion/skills/motion/SKILL.md`.
- **Kräver Motion+:** MotionScore-granskningen, källkoden till exempel och Motion UI, övergångsredigeraren och Motion+-delarna av dokumentationen. Inloggningen görs från redigeraren mot `https://mcp.motion.dev/plus`. 📄 samma filer; motion.dev/docs/ai-kit.
- **Motstridigt:** skillen säger att genereringen av CSS-fjädrar fungerar utan konto, men motion.dev/docs/ai-kit räknar den till Motion+ ⚠️.
- **Hos oss:** inte installerat. Dokumentationen går att läsa på motion.dev, och bästa praxis är destillerad här. MotionScore och exemplen kräver att Johnny skaffar Motion+.

## Avstå

Listan står i guiden: dotLottie, Lenis, AOS, animate.css, scroll-timeline-polyfillen och astro-vtbot (→ `guide/2-6-rorelse.md`, *Avstå*). Till den läggs:
- GSAP:s **ScrollSmoother**, som är mjuk scroll och därmed scroll-kapning. 📄 NN/g, *Scrolljacking 101*.
- Komponenter från 21st.dev, Aceternity och React Bits som animerar text in vid laddning, rör sig i bakgrunden utan slut eller spårar muspekaren. De är tillåtna i stacken men bryter mot rörelsereglerna och tas upp med Johnny innan de används.
