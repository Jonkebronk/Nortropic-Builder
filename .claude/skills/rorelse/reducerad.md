# Reducerad rörelse och WCAG

Delfil till `SKILL.md`. Regeln att `prefers-reduced-motion` respekteras står i guiden och gäller från den första sajten (→ `guide/2-6-rorelse.md`, *Policyn*). Kontrollerna är C56 och C57 (→ `guide/bilaga-c-kontroller.md`). Här står vad normerna säger, vad som räknas som rörelse och hur det byggs och provas.

## Normerna

| Kriterium | Nivå | Kärnan | Källa |
|---|---|---|---|
| 2.2.2 Pausa, stoppa, dölja | A | Det som rör sig, blinkar eller rullar, startar automatiskt, varar mer än fem sekunder och visas bredvid annat innehåll ska gå att pausa, stoppa eller dölja. Det som startar när något scrollas in räknas som automatiskt. En laddningsanimation som inte visas bredvid annat innehåll kan vara nödvändig | 📄 [Understanding 2.2.2](https://www.w3.org/WAI/WCAG22/Understanding/pause-stop-hide.html); misslyckanden F16, F112, F50 och F7 |
| 2.3.1 Tre blinkningar | A | Inget blinkar mer än tre gånger per sekund; exakt tre godkänns | 📄 [Understanding 2.3.1](https://www.w3.org/WAI/WCAG22/Understanding/three-flashes-or-below-threshold.html), läst 2026-10-16 |
| 2.5.7 Dragrörelser | AA | Allt som styrs genom att dra går också att göra med ett enda tryck, utom när dragningen är nödvändig. Gäller reglage, karuseller och jämförelser före och efter | 📄 [Understanding 2.5.7](https://www.w3.org/WAI/WCAG22/Understanding/dragging-movements.html), läst 2026-10-16 |
| 2.3.3 Animation från interaktion | AAA | *"Motion animation triggered by interaction can be disabled, unless the animation is essential"* | 📄 [Understanding 2.3.3](https://www.w3.org/WAI/WCAG22/Understanding/animation-from-interactions.html); teknikerna C39 (CSS) och SCR40 (JavaScript) |

2.3.3 ligger över vårt golv, WCAG 2.2 AA, men C39 gör det nästan gratis, och guiden kräver det från N1.

## Vad som räknas som rörelse

- **Rörelse:** förflyttning, skalning, rotation och oskärpa, alltså det som ändrar upplevd storlek, form eller läge. Erratan till 2.3.3 tar bort undantaget för oskärpa: *"Amending the definition to not exclude blurring"*. 📄 Understanding 2.3.3.
- **Inte rörelse:** färg och opacitet som inte ändrar storlek, form eller läge, och något som visas direkt utan övergång. 📄 Understanding 2.3.3.
- **Särskilt riskabelt** för personer med vestibulära besvär 📄 Val Head, *Designing Safer Web Animation for Motion Sensitivity* (A List Apart 2015, uppdaterad 2020):
  - stora rörelser i förhållande till skärmen, som en övergång som täcker hela skärmen
  - parallax och scroll-kapning
  - rörelse åt ett annat håll än scrollen
  - zoom och skalning över en stor yta
  - stora rotationer i 3D.
- 📄 Apple HIG, *Motion*, avsnittet *visionOS* (skrivet för headset, men om samma känslighet): undvik svängningar runt 0,2 Hz, ge en stillastående referensram och tona ut och in i stället för att flytta något stort.

## Mönster

**I CSS (C39).** Grundläget står still, och rörelsen läggs inom `no-preference`:

```css
.knapp:active { background-color: var(--k-accent-tryck); }   /* färg: står kvar med reduce */
@media (prefers-reduced-motion: no-preference) {
  .knapp { transition: transform var(--k-tid-snabb) var(--k-kurva-in); }
  .knapp:active { transform: scale(0.97); }                     /* skala: bara utan reduce */
}
```

- Den globala återställningen i `bibliotek/src/styles/bas.css` tar bort alla `animation` och behåller bara övergångar av färg och opacitet. Det är rätt nivå – mjukare, inte noll. 📄 Kowalski, `animate` steg 7: *"keep transitions that aid comprehension, remove movement"*.
- Den globala återställningen når inte sidbyten med `@view-transition` och inte scroll-drivna animationer som läggs till senare. De skrivs därför alltid inom `no-preference` (→ `guide/2-6-rorelse.md`, N2 ⚠️, och [sidbyten-och-scroll.md](sidbyten-och-scroll.md)).
- Ny rörelse skrivs inom `no-preference` även när en global återställning finns. Då står det i koden vilket grundläge som gäller. 🔧

**I JavaScript (SCR40).** Läs preferensen med `matchMedia('(prefers-reduced-motion: reduce)')` innan något animeras, och följ ändringar med `change`, eftersom inställningen kan bytas medan sidan är öppen (→ `guide/2-6-rorelse.md`, N2).

**Motion för React.** `<MotionConfig reducedMotion="user">` följer systemets inställning. Den stänger av transformer och layoutanimationer men behåller opacitet och `backgroundColor`. 📄 [motion.dev/docs/react-accessibility](https://motion.dev/docs/react-accessibility).

**Motions vanilla-API** (`animate`, `inView`). Dokumentationen säger inget om att det tar hänsyn till inställningen ⚠️. Kontrollera själv med `matchMedia` innan anropet. 📄 motion.dev/docs/animate och /inview, lästa 2026-10-16.

**GSAP.** `gsap.matchMedia()` med ett villkor för `(prefers-reduced-motion: reduce)` kör inställningarna bara när villkoret stämmer och återställer dem när det slutar stämma. 📄 GSAP, `gsap-core/SKILL.md`, *Accessibility and responsive* (MIT).

**Genomskinlighet.** `prefers-reduced-transparency: reduce` kan ta bort `backdrop-filter` och göra ytor täckande. Det stöds i Chrome 118 och Firefox 113 men inte i Safari (MDN browser-compat-data, 2026-10-16). 📄 Apple HIG via Kowalski, `apple-design` §14. Inget krav; ett tillägg där sajten har genomskinliga ytor.

## Så provas det

- Playwright med `reducedMotion: 'reduce'`: följ panelens läge bildruta för bildruta med `requestAnimationFrame` i sidan. Med `reduce` står `transform` på `none` hela tiden, och bara opaciteten ändras.
- C57: ta två skärmbilder av fönstret, efter 6 och 7 sekunder utan interaktion, och jämför dem. Använd inte helsidesbilder. På mobilen ändrar de fönstrets höjd, vilket kan starta knapplisten, och då skiljer sig bilderna utan att något rör sig av sig självt. Uppmätt på övningssajten 2026-10-16.
- En helsidesbild med `reduce` och en utan JavaScript ska visa allt innehåll (→ `guide/2-6-rorelse.md`, N1).
- Video med `reduce` till granskningen när budgeten är större än sparsam (C61).
