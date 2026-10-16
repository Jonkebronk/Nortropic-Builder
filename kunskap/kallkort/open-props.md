# Open Props

**Källa:** https://github.com/argyleink/open-props, grenen `main`, lästa 2026-10-16:
- `src/props.easing.js`, `src/props.animations.js`, `src/props.media.js` och `src/extra/transitions.css` (tillagd 2026-10-11 i PR #591), och `LICENSE`.
- De öppna ärendena om rörelse: #517, #470, #468, #465 och #390.

Lästa också: `readme.md` (47 rader: CDN-länkar, tokenfiler för Figma och Style Dictionary, och byggkommandon). npm-versionen är 1.7.23. Dokumentationssajten [open-props.style](https://open-props.style) lästes inte ⚠️; källfilerna räcker för rörelsen.

**Licens:** MIT, © 2021 Adam Argyle. Licenstexten ska följa med om filer kopieras. Kopierar vi bara värden in i kitets tokens anger vi källan.

**Vad det är:** ett bibliotek med färdiga CSS-variabler, *props*, för färg, storlekar, skuggor, kurvor, animationer och mediefrågor. För rörelsen är det kurvorna, animationerna och mediefrågorna som är intressanta.

**Hur det fungerar:**
- **`props.easing.js`:**
  - fem steg vardera av `--ease-*`, `--ease-in-*`, `--ease-out-*` och `--ease-in-out-*`
  - elastiska kurvor
  - `--ease-spring-1`–`5` och `--ease-bounce-1`–`5` som `linear()`
  - de klassiska kurvorna, till exempel `--ease-quint-out: cubic-bezier(.23,1,.32,1)`, som är samma kurva som Emil Kowalskis `--ease-out`, och `--ease-quart-in-out`, som är hans `--ease-in-out`.
- **`props.animations.js`:** färdiga keyframes. Sex av dem är oändliga: `spin`, `ping`, `blink`, `float`, `bounce` och `pulse`. Toningarna `fade-in-bloom` och `fade-out-bloom` använder `blur(20px)`.
- **`props.media.js`:** `--motionOK` och `--motionNotOK` som `@custom-media`. Det stöds inte i någon webbläsare utan byggsteg (BCD 2026-10-16: Firefox 148 bakom flagga), så det kräver PostCSS.
- **`src/extra/transitions.css`** (ny): in- och utgång för `[popover]`, `dialog` och `::backdrop` med `@starting-style` och `allow-discrete`, inom `--motionOK`, med 1 s opacitet.

**Kvalitet och underhåll:**
- 5 546 stjärnor och 218 forkar, skapat 2021-09-03, senaste push 2026-10-11. 63 bidragsgivare och 77 öppna ärenden och PR.
- Senaste GitHub-release är v1.6.0 (2023-09-29); npm har 1.7.23.
- Kända problem om rörelse:
  - #468: Shake-Y staplas inte i Safari.
  - #390: animationerna är inte logiska (riktning).
  - #470: dialogstilar efterfrågas, och det löstes delvis av #591.

**Det bästa vi kan ta:**
- Kurvvärden till kitets tokens: en andra namngiven källa för Emils kurvor och färdiga fjäderkurvor i `linear()` för måttlig och expressiv budget. → `rorelse/matt.md`.
- Mönstret i `transitions.css` för popover och `::backdrop`, men med kitets längd i stället för 1 s. → `rorelse/tillstand.md`, *Menypanel*.

**Var det hamnar hos oss:** inventeringens förslag var *Pröva*, med flaggan att de oändliga animationerna ska rensas bort. Beslut: bibliotek. Vi tar värdena in i kitets tokens och installerar inte paketet. Kunskapen står i skillen `rorelse`.

**Passar vår stack?** Ja, för värdena: de är ren CSS och passar våra egna `--k-*`-tokens. Själva paketet behövs inte, och `--motionOK` skulle kräva PostCSS i Astro; skriv mediefrågan direkt. Tailwind är tillåtet nu men behövs inte för detta.

**Risker och flaggor:**
- **Oändliga animationer** bryter mot WCAG 2.2.2 när de visas bredvid innehåll.
- **`blur(20px)`** är rörelse enligt erratan till WCAG 2.3.3 och dyrt i Safari.
- **1 s** i `transitions.css` är för långt (NN/g).
- **Studsande och elastiska kurvor** är förbjudna i sparsam.
- Ingen telemetri, ingen betalvägg och ingen inloggning.
