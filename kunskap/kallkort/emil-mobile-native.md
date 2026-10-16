# emil-mobile-native

**Källa:** https://github.com/emilkowalski/skills, sökvägen `skills/mobile-native/`.
- Läst 2026-10-16 vid commit `2d22863` (2026-10-11).
- Skillen har 2 commits, den senaste är `85e8e23` (2026-09-15, "Remove course mention").
- Lästa filer: `SKILL.md` (311 rader), repots `README.md` och `performance-cheatsheet.md`.
- Fakta kontrollerades mot [Chrome for Developers, 300 ms](https://developer.chrome.com/blog/300ms-tap-delay-gone-away) och [web.dev responsive basics](https://web.dev/articles/responsive-web-design-basics).

**Licens:** MIT, © 2026 Emil Kowalski.

**Vad det är:**
- En skill som rättar de detaljer som gör att en webbapp känns som "en webbsajt i en webbläsare" på telefonen: viewport, pek, scroll, safe areas och webbläsarens ram.
- Den anropas av modellen (ingen `disable-model-invocation`).
- Den börjar med en fast hälsningsrad.

**Hur det fungerar:**
- **Hårda regler.**
  1. Varje åtgärd har ett skäl.
  2. Mediafrågor i stället för att gissa enhet.
  3. Pek och mus samtidigt.
  4. **Zoom stängs aldrig av.**
  5. Testa på riktig hårdvara, eftersom emulering inte visar felen.
- **Symptomtabell med elva rader och en åtgärd per rad:**
  - `:hover` inom `(hover: hover) and (pointer: fine)` och tryckåterkoppling med `:active` (100–160 ms)
  - `-webkit-tap-highlight-color: transparent`
  - `100dvh` för appskal och `100svh` för hero
  - fält ≥16 px mot iOS-zoom, plus `inputmode`, `type` och `enterkeyhint`
  - `touch-action: manipulation`
  - `overscroll-behavior: none` på roten och `contain` i paneler
  - `viewport-fit=cover` och `env(safe-area-inset-*)`
  - `user-select: none` bara på kontroller
  - `touch-action: pan-y` eller hellre `scroll-snap` för karuseller
  - `theme-color` per färgschema
- **Baslinje** (viewport-tagg och CSS) och en tabell "Never Ship".
- **Utdata:** vad som var fel, vad som ändrades och vad som kräver en telefon för att verifieras.

**Kvalitet och underhåll:**
- 46 586★, 2 677 forkar, 3 bidragsgivare, push 2026-10-11.
- Issue #30 (öppen, 2026-10-08) säger att skillen saknar ett läge för bara läsning. "Apply the fixes" gör att en granskning tvingas improvisera.
- Fältet på 16 px mot iOS-zoom kommer från källan. ⚠️ Apples egen dokumentation är inte verifierad.

**Det bästa vi kan ta:**
- Viewport utan zoomspärr. Stöds av web.dev: "We don't recommend using these attributes".
- `min-height: 100svh` på hero, aldrig `100vh` (*§3*).
- Fält ≥16 px med `type="tel"`, `type="email"` och `autocomplete` (*§4*).
- Hovring inom capability-query och `:active` som tryckåterkoppling (*§1, §5*).
- `env(safe-area-inset-bottom)` på en sticky "Ring/Boka"-list (*§7*).
- `theme-color` per schema (*§10*).
- Testa på en riktig, några år gammal telefon (*§11*).

**Var det hamnar hos oss:**
- `skill: skelett`, delfil `skelett/mobil.md` (förslag): mobilbaslinjen med skälen.
- Testet på riktig telefon blir en manuell kontroll före leverans.

**Passar vår stack?** Reviderat efter BESLUT 2026-10-16, *React, Tailwind och JavaScript tillåts*.
- **Mer av skillen gäller nu.** När biblioteket får React-öar och Motion blir paragraferna om interaktion relevanta: tryckåterkoppling på `pointerdown`, `touch-action: pan-y`/`none` på dragbara karuseller och ark, och `overscroll-behavior: contain` i lådor och ark.
- **Tailwind-raden går att ta som den är.** `hover:` kompilerar redan till `@media (hover: hover)` i v4, enligt skillen.
- **Kostnad:** baslinjen (viewport, `100svh`, fält, hover-gating, safe area, `theme-color`) är CSS och HTML, alltså 0 kB JavaScript. Gestkomponenter kostar React-ön (cirka 56 kB gzip för den första ön, ⚠️ en mätning) plus Motion (43 kB, eller drygt 5 + 24 kB med `LazyMotion`, enligt motion.dev).
- **Står kvar som avvikelser för en dokumentsajt:**
  - `overscroll-behavior: none` på `html`. Emil säger själv att den ska bort på "a scrolling document".
  - `touch-action: manipulation` globalt. Fördröjningen är borta med `width=device-width` sedan Chrome 32 och iOS 9.3.
  - `user-select: none` på `a`. Det hindrar besökaren från att kopiera telefonnummer (härlett).
  - next-themes, som är Next-specifik (Astro har inget motsvarande inbyggt), och PWA-delarna.
- **Krockar att ta upp med Johnny:** dragbara karuseller och ark i stället för native `scroll-snap` och `<dialog>` kostar JavaScript och påverkar Lighthouse 100 och *HTML först*.

**Risker och flaggor:**
- Krock med Refero: Refero vill ha en avsiktligt synlig tap highlight, Emil `transparent`. Vi väljer synlig återkoppling.
- Skillen förutsätter att den får ändra koden.
- README länkar till ett nyhetsbrev. Ingen telemetri.

**Inloggning:** behövs inte.

**Slutligt förslag (skelett-struktur-beslut.json, 2026-10-16):** `skill: skelett`; mobilbaslinjen står i `.claude/skills/skelett/mobil.md`.
