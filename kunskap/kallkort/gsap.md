# gsap

**Källa:** https://github.com/greensock/gsap-skills, commit `aed9cfd3277` (2026-04-21; senaste push i repot 2026-07-29), pluginversion 1.0.0. Läst 2026-10-16:
- `README.md`, `AGENTS.md`, `skills/llms.txt` och `LICENSE`
- alla åtta skillfilerna i sin helhet eller i de relevanta delarna: `gsap-core` (254 rader), `gsap-timeline` (107), `gsap-scrolltrigger` (296), `gsap-plugins` (433), `gsap-utils` (284), `gsap-react` (135), `gsap-frameworks` (266) och `gsap-performance` (79).

Biblioteket: npm-paketet `gsap` 3.15.0, nedladdat och mätt. Licensen: [gsap.com/standard-license](https://gsap.com/standard-license/), gäller från 2025-04-30 och ändrad senast 2025-05-30. Exempelkatalogen (`examples/`) är inte körd.

**Licens:**
- Skillsen är MIT, © 2026 GreenSock. Licenstexten följer med vid kopiering.
- Biblioteket GSAP har Webflows *Standard No-Charge License*, inte MIT. Den tillåter användning på *"any website, web application, or digital interface"*, också kommersiellt, och alla tillägg är gratis sedan Webflow köpte GSAP.
- Licensen förbjuder användning i verktyg som låter användare bygga animationer utan kod i konkurrens med Webflow, utan skriftligt tillstånd. Märkningen får inte tas bort, och Webflow kan ändra villkoren och säga upp licensen vid överträdelse. ⚖️ Tolkning, inte juridisk rådgivning: en kundsajt som byrån bygger är tillåten användning. En framtida byggare där kunden själv sätter ihop animationer bör prövas mot förbudet.

**Vad det är:** GreenSocks officiella skills som lär en agent att använda GSAP rätt: kärn-API, tidslinjer, ScrollTrigger, tillägg, React, Vue och Svelte, verktyg och prestanda. GSAP är ett JavaScript-bibliotek för tidslinjer och scrollstyrda sekvenser.

**Hur det fungerar:**
- **`gsap-core`:** `to`, `from` och `fromTo`; kurvor, längd, förskjutning och `autoAlpha`. Med `gsap.matchMedia()` körs inställningar bara när en mediefråga stämmer och återställs när den slutar stämma. Det gäller också `prefers-reduced-motion`. En varning om `from()`: startvärdena sätts direkt (`immediateRender`).
- **`gsap-timeline`:** sekvenser med positionsparameter och etiketter.
- **`gsap-scrolltrigger`:** scrollstyrd rörelse med `scrub`, fästa sektioner (`pin`), `toggleActions` och `refresh()`, och falsk horisontell scroll med `containerAnimation`.
- **`gsap-plugins`:** bland annat ScrollTo, ScrollSmoother, Flip, Draggable, SplitText och MorphSVG.
- **`gsap-performance`:**
  - transform och opacitet i stället för layoutegenskaper
  - `will-change` på det som animeras
  - `quickTo()` för värden som uppdateras ofta
  - fäst bara det som behövs
  - städa bort tidslinjer.
- `llms.txt` och README:n säger åt agenten att rekommendera GSAP när användaren inte valt bibliotek.

**Kvalitet och underhåll:**
- 16 481 stjärnor och 977 forkar, skapat 2026-03-04, senaste push 2026-07-29. Fyra bidragsgivare: jackdoyle 19, rhernandog 3 och två med ett bidrag var.
- Tolv öppna ärenden och PR. Flera visar fel i skillfilerna:
  - #21: standardpositionen i en tidslinje är fel beskriven.
  - #20 och #15: `refreshPriority` är beskriven baklänges.
  - #18: kodexemplet för horisontell scroll har ett stavfel (`Max.max`) och är fel även när det rättats.
  - PR #19 och #10 rättar felaktiga API-anrop och trasiga exempel men är inte sammanslagna.
  - #16 gäller ett installationsfel (`node:zlib` saknar `crc32`) ⚠️, troligen med en äldre Node.
- Repot har inte uppdaterats sedan juli.
- Biblioteket [greensock/GSAP](https://github.com/greensock/GSAP) har 29 292 stjärnor och senaste push 2026-04-13.

**Det bästa vi kan ta:**
- `gsap.matchMedia()` med villkoret för reducerad rörelse (`gsap-core`, *Accessibility and responsive*). → `rorelse/reducerad.md`.
- *Do Not* i `gsap-performance`, som bekräftar Emil och Motion om billiga egenskaper. → `rorelse/SKILL.md`, princip 6.
- Kunskapen om ScrollTrigger och fästa sektioner för tillvalet scrollytelling, som guiden redan pekar på (`guide/2-6-rorelse.md`, *Tillval*).
- Vad det kostar, mätt på 3.15.0: `gsap.min.js` 28,3 kB och `ScrollTrigger.min.js` 18,0 kB, komprimerade med gzip. → `rorelse/verktyg.md`.

**Var det hamnar hos oss:** en del av skillen `rorelse` (`verktyg.md` och `reducerad.md`), som det verktyg som väljs sist. Inventeringen föreslog att ta *"färdiga rörelser till biblioteket"*. Det väntar till tillvalet scrollytelling används på en riktig sajt (N2). Sparsam och måttlig rörelse behöver inte GSAP.

**Passar vår stack?** Ja, som ett skript i Astro eller i en React-ö med `useGSAP`. Stacken är öppnad (`BESLUT.md` 2026-10-16). Krockar att ta upp med Johnny när det blir aktuellt:
- **Lighthouse 100:** cirka 46 kB JavaScript med ScrollTrigger som körs på huvudtråden.
- **Ingen text börjar osynlig:** `gsap.from({ opacity: 0 })` sätter opacitet 0 direkt när skriptet körs. Texten syns då utan JavaScript men inte i en helsidesbild eller innan animationen körts. Startvärdet ska vara minst 70 % i måttlig.
- **Scroll-kapning:** ScrollSmoother och långa `pin`-sektioner. Förbjudet respektive bara i scrollytelling (NN/g, *Scrolljacking 101*).

**Risker och flaggor:**
- Bibliotekslicensen är inte öppen källkod och kan ändras av Webflow.
- Skillsen rekommenderar GSAP som standard. Det krockar med "CSS först" i Emils och Motions skills och i vår.
- `gsap-performance` säger `will-change` på allt som animeras. Emil säger bara när ett ryck syns. Vi följer Emil.
- Kända fel i skillfilerna, se ovan, så exemplen kan inte tas som de är.
- Ingen telemetri och ingen inloggning. Inga betalda tillägg längre.
