# Color.js och Radix tolv steg

## Color.js

**Källa:** https://github.com/color-js/color.js, commit a46e7fa (2026-10-15). npm `colorjs.io` 0.7.1 (2026-07-24). Dokumentation: https://colorjs.io/docs/contrast och https://colorjs.io/docs/gamut-mapping. README läst i sin helhet. Läst 2026-10-16.

**Licens:** MIT. Licenstexten följer med om koden distribueras; vi kör den vid byggtid.

**Vad det är:** Ett färgbibliotek av två av redaktörerna för CSS Color-specifikationerna (Lea Verou och Chris Lilley). Det kan alla färgrymder i CSS Color 4, räknar kontrast med flera metoder och gör riktig gamut-mappning i stället för att klippa.

**Hur det fungerar:**
- `new Color("oklch(0.62 0.14 45)")`, `.to("srgb")`, `.toString({ format: "hex" })`.
- Kontrast: `c1.contrast(c2, "WCAG21")` eller `c1.contrastWCAG21(c2)`. Algoritmerna är `WCAG21`, `APCA`, `Lstar`, `DeltaPhi`, `Weber` och `Michelson`. "You need to provide a contrast algorithm" – det finns ingen standard. För APCA spelar ordningen text/bakgrund roll.
- Gamut: `inGamut()` kontrollerar, `toGamut()` mappar. Standardmetoden `"css"` "uses the binary search algorithm from CSS Color Module Level 4", och "The mapping is done in the Oklch space".
- Procedurellt, tree-shakeable API för mindre paket.

**Kvalitet och underhåll:** 2 313 stjärnor, 51 bidragsgivare, 96 öppna ärenden och PR:er, senaste commit 2026-10-15. Används av Sass, Open Props och axe (README). Kända problem: #301 "High chroma `oklch` conversions to `srgb` can have significant hue and/or saturation loss" (öppen sedan 2023), #665 saknade nyansvärden vid Lch→Lab (2025), #645 om avrundning. Version under 1.0, så API:t kan ändras.

## Radix tolv steg

**Källa:** https://github.com/radix-ui/colors, commit dbdb854 (2025-12-17). npm `@radix-ui/colors` 3.0.0 (2023-10-02). Dokumentation: https://www.radix-ui.com/colors/docs/palette-composition/understanding-the-scale, …/composing-a-palette och …/overview/custom-palettes. Läst 2026-10-16.

**Licens:** MIT, "Copyright © 2022-present WorkOS". Färgvärden och modellen får användas fritt med licensnotisen.

**Vad det är:** En färgskala i tolv steg där varje steg har en bestämd roll. Det gör skalan till ett kontrakt: komponenter väljer steg efter roll, inte efter utseende.

**Hur det fungerar (rollerna, ordagrant ur docs):** 1 "App background", 2 "Subtle background", 3 "UI element background", 4 "Hovered UI element background", 5 "Active / Selected UI element background", 6 "Subtle borders and separators", 7 "UI element border and focus rings", 8 "Hovered UI element border", 9 "Solid backgrounds", 10 "Hovered solid backgrounds", 11 "Low-contrast text", 12 "High-contrast text". "Most step 9 colors are designed for white foreground text", men Sky, Mint, Lime, Yellow och Amber är gjorda för mörk text. Steg 11 och 12 "are guaranteed to Lc 60 and Lc 90 APCA contrast ratio on top of a step 2 background". Gråskalan väljs efter accentens nyans ("natural pairing").

**Kvalitet och underhåll:** 1 697 stjärnor, 11 bidragsgivare, 6 öppna ärenden, ingen ny paketversion sedan 2023. Kända problem: #42 "Some color scales (Yellow, Amber, Orange) do not meet the specified 4.5:1 contrast ratio guideline" (öppen, 2024), #30 "Not enough contrast on color 9 according to lighthouse" och #12 om steg 9–10. Ärende #42 citerar en äldre docs-text som lovade 4,5:1 på steg 3; dagens docs lovar bara APCA-värden.

**Egen kontroll (WCAG 2, ljusa skalor ur paketet 3.0.0, räknat 2026-10-16):**

| Skala | Steg 11 på 2 | Steg 9 mot vit text | Steg 7 på 1 |
|---|---|---|---|
| orange | 4,25 | 2,97 | 1,84 |
| amber | 4,43 | 1,58 | 1,68 |
| yellow | 4,42 | 1,26 | 1,63 |
| blue | 4,53 | 3,26 | 1,75 |
| grass | 4,82 | 3,03 | 1,79 |
| gray | 5,62 | 3,32 | 1,53 |

Slutsats (egen): rollerna är bra, men värdena klarar inte WCAG 2 AA rakt av – steg 11 underskrider 4,5:1 i tre skalor, vit text på steg 9 klarar högst 3:1 (stor text), och steg 7 som kant eller fokusring når inte 3:1 (WCAG 1.4.11).

## Gemensamt för posten

**Det bästa vi kan ta:**
- Radix tolv roller som kontrakt för kitens färgroller (ytskillen `farg.md`): bakgrund 1–2, komponentytor 3–5, kanter 6–8, solid accent 9–10, text 11–12.
- Color.js som mätinstrument: OKLCH-konvertering, `toGamut()` till sRGB för hex-reserven, och `contrast(…, "WCAG21")` för varje rollpar. Samma bibliotek används inuti Terrazzo (`@terrazzo/parser` beror på `colorjs.io`).

**Var det hamnar hos oss:** Ytskillen `farg.md` (rollerna och receptet) och kontroll – ett kitskript med Color.js som räknar kontrast per rollpar och skriver värdena i kitets `design.md`. Radix färgvärden används inte; bara modellen.

**Passar vår stack?** Ja, båda vid byggtid och 0 byte JavaScript per sida. Med Tailwind 4 tillåtet (`BESLUT.md` 2026-10-16, kl. 12.28) kan rollerna bli `@theme inline`-färger, men de ska ändå peka på `--k-*`. Översättning: våra roller heter i dag `--k-bg`, `--k-yta`, `--k-text`, `--k-dampad`, `--k-linje`, `--k-accent`, `--k-pa-accent`, `--k-fokus` – de motsvarar ungefär steg 1, 2, 12, 11, 6, 9, 9-text och 7–8.

**Risker och flaggor:**
- Radix lovar APCA, inte WCAG 2; guiden kräver WCAG 2.2 AA. Varje par måste mätas om (tabellen ovan).
- Color.js under 1.0 och #301 (hue-förlust vid hög kroma) – kontrollera visuellt när en mycket mättad kundfärg mappas till sRGB.
- Ingen telemetri, betalvägg eller inloggning i någon av dem.
