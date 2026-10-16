# Motion

Delfil till `SKILL.md`. Den gäller när och hur Motion (paketet `motion`, tidigare Framer Motion) används i Astro med React-öar, vad det kostar och vad som är förbjudet. Valet mellan CSS, WAAPI, Motion och GSAP står i [verktyg.md](verktyg.md), och reducerad rörelse i [reducerad.md](reducerad.md). Underlaget med citat och mätningar finns i `kunskap/research/2026-10-16_tailwind-och-motion-i-astro.md` (*researchen* nedan).

**Utkast 2026-10-16.** Allt nedan är förslag till Johnny tills han sagt ja.

## Redan beslutat (→ guiden)

- Sparsam rörelse är standard. Måttlig är ett tillval, och expressiv kräver Johnnys ja i briefen (`BESLUT.md` 2026-10-15; → `guide/2-6-rorelse.md`).
- Ingen text börjar på `opacity: 0`, och första skärmen animeras aldrig in. Måttlig rörelse börjar från minst 70 % opacitet (→ `guide/2-6-rorelse.md`).
- React och Motion är tillåtna. Krockar med reglerna tas upp med Johnny när de uppstår (`BESLUT.md` 2026-10-16).

## När

| Budget | Motion | Varför |
|---|---|---|
| Sparsam | Ingen. CSS gör tillståndsbytena (`transition`, `@starting-style`) | Allt i budgeten är tillståndsbyten, och de är Baseline i CSS. 📄 web-features 3.43.0 |
| Måttlig | Vanilla `inView` + `animate` från `motion/mini`, eller CSS, för in-animationer under första skärmen | 3,6 kB med gzip mot 29 kB och mer för React-varianten. 🔧 researchen §6.3 |
| Expressiv | Motion för React i en ö | Fjädrar, sekvenser och scroll; bara med Johnnys ja |
| Alla | Motion för React i en ö som redan finns för interaktionen: utgång när ett element tas bort (`AnimatePresence`), layout (`layout`, `layoutId`) och drag | Det klarar inte CSS. 📄 motion.dev/docs/react |

En React-ö laddas aldrig för rörelsens skull (→ [verktyg.md](verktyg.md)).

## Hur mycket

**JavaScript för rörelse per sida (förslag):**

| Budget | Gräns |
|---|---|
| Sparsam | 0 kB |
| Måttlig | Högst cirka 4 kB med gzip |
| Expressiv | Redovisas, och sidan mäts i Lighthouse före och efter (N1-kontroll 9, → `guide/2-8-teknik-och-kvalitet.md`) |

**Uppmätt med rolldown, som Astro 7 använder, och gzip:** 🔧 researchen §6.3

| Vad | Storlek |
|---|---|
| `react` + `react-dom/client` | 67,8 kB |
| `motion` (hela komponenten) | 42,9 kB ovanpå React |
| `m` + `LazyMotion` + `domAnimation` | 29,3 kB ovanpå React |
| `domAnimation` laddad efteråt | 14,6 kB först och 17,8 kB efteråt |
| Vanilla `inView` + `animate` mini (esbuild) | 3,6 kB |

## Vad som ska vara sant i en ö med Motion

1. **Den laddar smalt.** `LazyMotion` med `strict`, komponenten `m` och `domAnimation`. `domMax` (+38 kB) används bara för layout och drag. 📄 motion.dev/docs/react-reduce-bundle-size.
2. **Kitet styr övergången.** Högst upp i ön ligger `<MotionConfig reducedMotion="user" transition={…}>` med kitets längd och kurva. Utan angiven övergång animeras x och y med en fjäder som går cirka 12 % förbi målet. 🔧 `motion-dom`, `default-transitions.mjs`; researchen §6.7.
3. **Serverns HTML är slutläget.** I allt som renderas på servern är `initial` antingen `false` eller samma som slutläget. Motion skriver `initial` som style-attribut i HTML:en, också inom `reducedMotion="user"`, och CSP:n stoppar attributet. 🔧 researchen §6.5.
4. **Bara transform, opacitet och färg rör sig.** Inga CSS-variabler animeras (*"isn't hardware accelerated"*), och ingen layout. 📄 motion.dev/docs/performance. De oberoende transformerna (`x`, `y`, `scale`) är hårdvaruaccelererade sedan Motion 14.2.0 (2026-10-13), så de får användas. Kowalskis råd att skriva hela `transform`-strängen för att slippa tappade bildrutor gäller äldre versioner. 📄 Motion, `CHANGELOG.md` 14.2.0 och ai-kit `best-practices/index.md` (`b7e2c68`).
5. **Gester sitter på kontroller.** `whileHover` och `whileTap` används bara på `button` och `a`. Motion lägger till `tabindex="0"`. 🔧 researchen §6.5.
6. **Vanilla-anrop följer inställningen.** Före varje `animate` eller `inView` läses `matchMedia('(prefers-reduced-motion: reduce)')`, och ett byte följs med `change`. Motions dokumentation för vanilla-API:t säger inget om reducerad rörelse. 📄 motion.dev/docs/animate, /inview; WCAG SCR40.
7. **Ön laddas när den behövs.** `client:visible` eller `client:idle` används hellre än `client:load`, om interaktionen inte behövs direkt. 📄 docs.astro.build, *Framework components*.
8. **En fjäder som ska ta över farten från en gest anges med fysik** (`stiffness`, `damping`, `mass`). En fjäder med `duration` eller `bounce` räknas som tidsstyrd och börjar från fart noll, så en avbruten dragning tappar farten. Kowalskis recept för dra för att stänga, `{ type: "spring", duration: 0.5, bounce: 0.2 }`, gör därför inte det det lovar. 📄 Motion, `motion-dom/src/animation/generators/spring.ts` (*"Time-defined springs ignore inherited velocity"*, commit `2d27b04`); Kowalski-ärende #32 (öppet). Sällan aktuellt: dragning hör till expressiv budget och kräver ett tryckalternativ (WCAG 2.5.7).

## Förbud

- Ingen React-ö för att få rörelse.
- Ingen `initial` med lägre opacitet än slutläget, och ingen förflyttning i `initial`, i en ö som renderas på servern.
- Ingen standardövergång i sparsam och måttlig budget. Övergången anges alltid, utan studs (`bounce: 0` eller tween). → `SKILL.md`, *Förbud* om studsande kurvor.
- Ingen animerad oskärpa (`filter: blur`), oavsett inställning. WCAG:s errata räknar oskärpa som rörelse. 📄 Understanding 2.3.3.
- Inga oändliga animationer (`repeat: Infinity`, `infinite`) utan en synlig paus. 📄 WCAG 2.2.2.
- Inga komponenter från Aceternity eller Magic UI med text som animeras in, bakgrunder som rör sig utan slut eller canvas och WebGL (glob, partiklar), utom i expressiv budget med Johnnys ja. 📄 källkoden; researchen §4.7.
- Ingen mjuk scroll och högst en parallax (→ `guide/2-6-rorelse.md`). `useScroll` kopplas aldrig till scrollens fart.
- Ingen `motion.div` i en ö som ska vara smal. Komponenten `m` används, och `LazyMotion strict` stoppar misstaget. 📄 motion.dev/docs/react-reduce-bundle-size.

## Kontroller

Lägg dem i kontrollistan i `SKILL.md` när Johnny sagt ja.

| Kontroll | Hur |
|---|---|
| Synligt utan rörelse | M: helsidesbild utan JavaScript och med `reduce`; allt innehåll syns (→ `SKILL.md`, punkt 10) |
| `initial` i serverns HTML | M: sök i den byggda HTML:en efter `style="opacity:0` och `style="…transform` i öar |
| Statisk sökning i öarna | M: `initial={{` med opacitet under 0,7 eller transform, `repeat: Infinity`, `filter`, `motion.` utanför `LazyMotion`, `<MotionConfig` saknas |
| JavaScript för rörelse | M: storleken per sida mot budgeten ovan |
| Prestanda | M: Lighthouse före och efter den första ön med Motion |

## Källor

- Motion: [Reduce bundle size](https://motion.dev/docs/react-reduce-bundle-size), [Accessibility](https://motion.dev/docs/react-accessibility), [Motion component](https://motion.dev/docs/react-motion-component), [Layout animations](https://motion.dev/docs/react-layout-animations), [Scroll animations](https://motion.dev/docs/react-scroll-animations), [Performance](https://motion.dev/docs/performance), [animate](https://motion.dev/docs/animate), [inView](https://motion.dev/docs/inview); Perry, [Web animation performance tier list](https://motion.dev/magazine/web-animation-performance-tier-list) (2025-11-05). Paketet `motion` 14.3.0, MIT, lästa 2026-10-16.
- Egna prov 2026-10-16: storlekar med rolldown 1.2.14 och esbuild 0.28.2; serverrendering med `react-dom/server` 19.3.1 (researchen §6.3, §6.5).
- W3C: [Understanding 2.3.3](https://www.w3.org/WAI/WCAG22/Understanding/animation-from-interactions.html) med C39 och SCR40; [Understanding 2.2.2](https://www.w3.org/WAI/WCAG22/Understanding/pause-stop-hide.html).
- Astro: [Framework components](https://docs.astro.build/en/guides/framework-components/); MDN: [style-src](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Content-Security-Policy/style-src).
- Emil Kowalski, [You don't need animations](https://emilkowal.ski/ui/you-dont-need-animations); Josh W. Comeau, [Accessible animations in React](https://www.joshwcomeau.com/react/prefers-reduced-motion/); NN/g, Laubheimer, [Duration and motion characteristics](https://www.nngroup.com/articles/animation-duration/) (2020).
