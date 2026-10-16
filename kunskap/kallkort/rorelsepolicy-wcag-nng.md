# Rörelsepolicy ur WCAG och NN/g

**Källa:** lästa 2026-10-16:
- W3C [Understanding 2.2.2 Pause, Stop, Hide](https://www.w3.org/WAI/WCAG22/Understanding/pause-stop-hide.html) och [Understanding 2.3.3 Animation from Interactions](https://www.w3.org/WAI/WCAG22/Understanding/animation-from-interactions.html), med teknikerna C39 och SCR40 och misslyckandena F16, F112, F50 och F7.
- NN/g:
  - Laubheimer, [Executing UX Animations: Duration and Motion Characteristics](https://www.nngroup.com/articles/animation-duration/) (2020-02-09), med ordagranna citat kontrollerade
  - Laubheimer, [The Role of Animation and Motion in UX](https://www.nngroup.com/articles/animation-purpose-ux/) (2020-01-12)
  - Kendrick, [Microinteractions in User Experience](https://www.nngroup.com/articles/microinteractions/) (2018-10-21)
  - Paul, [Scrolljacking 101](https://www.nngroup.com/articles/scrolljacking-101/) (2023-08-06).
- Kompletterande: Val Head, [Designing Safer Web Animation for Motion Sensitivity](https://alistapart.com/article/designing-safer-web-animation-for-motion-sensitivity/) (A List Apart 2015, uppdaterad 2020); [Apple HIG, Motion](https://developer.apple.com/design/human-interface-guidelines/motion), läst som JSON.
- 2.3.1 lästes inte på nytt ⚠️. Den står redan i guiden via webb-pros byggstandard.

**Licens:**
- W3C-dokumenten: W3C Document License; citat med källa går bra.
- NN/g, A List Apart och Apple: upphovsrättsskyddade texter. Vi citerar kort och skriver med egna ord.

**Vad det är:** en rörelsepolicy med normer och forskning som grund. Den består av WCAG:s krav på paus och reducerad rörelse och NN/g:s mått för längd, kurva och syfte. Inventeringen sammanfattar den som *"längd 100–500 ms, paus för rörelse som pågår längre än fem sekunder och reducerad rörelse"*.

**Hur det fungerar:**
- **2.2.2 (A):** det som rör sig, blinkar eller rullar, startar automatiskt, varar mer än fem sekunder och visas bredvid annat innehåll ska kunna pausas, stoppas eller döljas. Det som startar när något scrollas in räknas som automatiskt. Om innehållet uppdateras automatiskt finns inget femsekundersundantag.
- **2.3.3 (AAA):** *"Motion animation triggered by interaction can be disabled, unless the animation is essential."*
  - Rörelse är förflyttning, skalning, rotation och, efter erratan, oskärpa. Färg och opacitet är inte rörelse.
  - Parallax är ett exempel på rörelse som sällan behövs.
- **NN/g, längd och kurva:**
  - 100–500 ms
  - cirka 100 ms för enkel återkoppling och 200–300 ms för en modal
  - *"At 500ms, animations start to feel like a real drag"*
  - utgången kortare än entrén
  - ease-out vid entré
  - linjär rörelse ser onaturlig ut
  - ju oftare, desto kortare och svagare.
- **NN/g, syfte:** återkoppling, tillståndsbyte, navigering och signaler. Rörelsen ska vara *"unobtrusive, brief, and subtle"* och undvika dekor och väntetid.
- **NN/g, scroll-kapning:** scroll-kapning ger mer besvär än nytta, är värst på mobilen och ska inte bära viktigt innehåll.

**Kvalitet och underhåll:** WCAG 2.2 är en W3C-rekommendation och normen i EN 301 549 och i tillgänglighetslagen (→ `kunskap/research/2026-10-14_tillganglighetslagen.md`). NN/g bygger på användartester; artiklarna är från 2018–2023 och är fortfarande publicerade.

**Det bästa vi kan ta:**
- Normtexterna och vad som räknas som rörelse. → `rorelse/reducerad.md`.
- Måtten. → `rorelse/matt.md`.
- Syftena. → `rorelse/SKILL.md`, princip 1, och `granskning.md`.
- Val Heads lista över vad som utlöser besvär och Apples råd om svängningar runt 0,2 Hz. → `rorelse/reducerad.md`.
- **En andra oberoende källa** för flera av Emils regler i guiden: 100–500 ms och ease-out vid entré (NN/g tillsammans med Kowalski). Det gör att delar av C58 kan lyftas från bänken (*Förslag till Johnny* i revisionen).

**Var det hamnar hos oss:** policyn står redan i guiden (`guide/2-6-rorelse.md`, *Policyn*; `guide/bilaga-c-kontroller.md`, C56 och C57). Skillen `rorelse` refererar den och lägger till mönster och provmetoder. Kontrollerna C56 och C57 körs med kontrollskriptet från sajt 2. Beslut: skill, med kontrollerna som redan finns.

**Passar vår stack?** Ja. CSS-mediefrågan fungerar direkt. För React-öar finns `MotionConfig reducedMotion="user"`, och för GSAP `gsap.matchMedia()`.

**Risker och flaggor:**
- 2.3.3 är AAA, över vårt golv. Guiden kräver det ändå från N1, eftersom C39 gör det nästan gratis.
- NN/g säger ease-in vid utgång och Kowalski aldrig ease-in. Guiden låter NN/g gå före.
- Inga flaggor för licens, telemetri eller inloggning.
