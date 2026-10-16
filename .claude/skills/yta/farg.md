# Färg

Delfil till `SKILL.md`. Färgsystemet i ett stilkit: roller, steg, kontrast och verktyg. Regler som redan står i guiden refereras och skrivs inte om.

## Redan beslutat (→ guiden)

- Kontrast enligt WCAG 2.2 AA är grind: text 4,5:1, stor text och gränssnitt 3:1 (→ `guide/2-5-yta.md`, *Kontroll*; C45 i `guide/bilaga-c-kontroller.md`).
- Accenten är till för handlingar: knappar, länkar och en markering som "I dag". Dekor får textfärgen eller den dämpade färgen (→ `guide/2-5-yta.md`, G3).
- Färgreceptet med OKLCH, Leonardo, Radix tolv steg och neutraler tonade mot accenten är N2 (→ `guide/2-5-yta.md`, *Färgrecept*). APCA är bara rådgivande.
- Den exakta varumärkesfärgen används bara där inget kontrastkrav gäller, till exempel i logotypen (→ `guide/2-5-yta.md`, N2).

## Roller: varje färg har ett jobb

Ett kit definierar färgerna som roller, inte som lösa värden. Sektionerna läser bara rollerna. Tabellen visar bibliotekets namn i dag, shadcn-namnet som guiden siktar på i N2 och Radix-steget som anger rollen.

| Roll | Bibliotekets token i dag | shadcn (N2) | Radix-steg | Krav |
|---|---|---|---|---|
| Sidans bakgrund | `--k-bg` | `--background` | 1 | – |
| Kort och upphöjd yta | `--k-yta` | `--card` | 2 | – |
| Dekoryta (bildyta, band) | `--k-dekor` | `--muted` | 3 | – |
| Subtil accentbakgrund för tillstånd (vald rad, "I dag") | saknas | `--accent` | 3–4 | text på den 4,5:1 |
| Avdelare och kortkant | `--k-linje` | `--border` | 6 | dekor, inget krav |
| Fältets kant | saknas | `--input` | 7–8 | 3:1 mot ytan (1.4.11) |
| Fokusring | `--k-fokus` | `--ring` | 8 | 3:1 mot varje yta den korsar |
| Fylld knapp | `--k-accent` | `--primary` | 9 | text på den 4,5:1 |
| Fylld knapp, hover | saknas | – | 10 | samma |
| Fylld knapp, tryck | saknas | – | 10–11 | samma |
| Länktext | `--k-accent-text` | – | 11 | 4,5:1 mot varje yta länken står på |
| Sekundär text | `--k-dampad` | `--muted-foreground` | 11 | 4,5:1 |
| Text | `--k-text` | `--foreground` | 12 | 4,5:1 |
| Text på fylld accent | `--k-pa-accent` | `--primary-foreground` | – | 4,5:1 |

Källor: Radix, [Understanding the scale](https://www.radix-ui.com/colors/docs/palette-composition/understanding-the-scale) (MIT); shadcn/ui, [Theming](https://ui.shadcn.com/docs/theming) (MIT); Krehel, `better-colors/palette-structure.md` och `token-naming.md` (MIT). Ta Radix roller, inte Radix värden: textstegen garanteras bara med APCA, och mätt med WCAG 2 ger steg 11 på steg 2 bara 4,25–4,43:1 för orange, bärnsten och gult och vit text på steg 9 bara 2,97:1 för orange (beräknat på `@radix-ui/colors` 3.0.0; ärende [#42](https://github.com/radix-ui/colors/issues/42)).

- **En roll per token.** En avdelartoken blir aldrig textfärg, och avdelare och kant är skilda roller även när värdet är lika. Varför: annars ändrar en justering av en kant plötsligt en text. 📄 Krehel, `token-naming.md`.
- **En betydelse per färg.** Nyanser inom cirka 15° i OKLCH läses som samma färg. En statusfärg (fel, varning, klart) ligger minst 15° från accenten, annars blandas den ihop med en handling. 📄 Krehel, `color-usage.md`, `palette-structure.md` (en källa – bänken).
- **Färg bär aldrig betydelse ensam.** Ett fel har också text eller ikon, en vald rad också vikt eller markering. 📄 WCAG 2.2, [1.4.1 Use of Color](https://www.w3.org/WAI/WCAG22/Understanding/use-of-color.html).
- **En fylld primärhandling per vy.** Övriga handlingar är sekundära (kontur) eller länkar. Varför: när allt är primärt pekar inget ut nästa steg. 📄 Krehel, `color-usage.md`; Refactoring UI, *Hierarchy is everything* (med egna ord; kommersiell).

## Accentens steg

- **Accenten har minst fyra steg:** fylld, hover, tryck och en subtil bakgrund. Ett kit med bara ett accentvärde kan inte visa tillstånd utan att uppfinna färger i komponenterna. 📄 Radix steg 3–5 och 9–10; Krehel, `palette-structure.md`; Vercel, [Web Interface Guidelines](https://vercel.com/design/guidelines): *":hover, :active, :focus have more contrast than rest state"* (MIT).
- **Stegen räknas i OKLCH, inte för ögat.** Hover är ett steg mörkare än fylld (cirka −0,04 till −0,06 i L), tryck ett till. Nyansen hålls konstant, och kroman sänks hellre än att nyansen vandrar. 📄 Krehel, `palette-generation.md`; Color.js för beräkningen ([colorjs.io](https://colorjs.io/), MIT). Värdena är en startpunkt (en källa – bänken).
- **Varumärkesfärgen hör till fyllningssteget om den klarar vit text.** Annars ligger den kvar för logotypen, och knappen fylls med ett mörkare steg i samma nyans. Mörka aldrig varumärket i smyg utan att det står som avvikelse i `sites/<namn>/design.md`. 📄 Krehel, `palette-generation.md`; → `guide/2-5-yta.md`, *Kundens identitet i kitet*.
- **Kontrollen med HCT:s tonregel:** en skillnad på 40 i ton ger minst 3:1. Källan säger att 50 ger minst 4,5:1, men i värsta fall (ton 50 mot 100) blir det 4,48:1, så räkna med 51. Ton är L* i CIELAB, inte L i OKLCH, så regeln gäller bara värden räknade i HCT; slutkontrollen är alltid WCAG-formeln. 📄 Material Color Utilities, [Contrast for accessibility](https://github.com/material-foundation/material-color-utilities/blob/main/concepts/contrast_for_accessibility.md) (Apache-2.0).

## Rampen och neutralerna

- **En korrekt ramp:** L ändras jämnt i OKLCH, nyansen är konstant och kroman toppar i mitten. Den ljusa änden har finare steg. Ändarna når aldrig rent vitt eller svart. 📄 Krehel, `palette-generation.md` (en källa – bänken).
- **Nyanserna bestäms i förväg:** 8–10 gråtoner och 5–10 steg per färg, i nio steg 100–900 med basfärgen kring 500. 📄 Refactoring UI, [Building your color palette](https://refactoringui.com/previews/building-your-color-palette) (gratisutdrag; med egna ord).
- **Neutralerna bär 80–90 % av ytan.** En tonad neutral har kroma cirka 0,005–0,02 på accentens eller kitets nyans. Varm ton läses inbjudande, kall läses teknisk. Samma nyans genom hela neutralrampen. 📄 Krehel, `palette-structure.md`; Radix, [Composing a palette](https://www.radix-ui.com/colors/docs/palette-composition/composing-a-palette); → `guide/2-5-yta.md`, *Färgrecept*.
- **Inventera innan något läggs till.** Samla alla färgliteraler i ett kit, sortera på L, slå ihop färger som ligger närmare än cirka 0,02 i OKLab och ge varje kvarvarande färg en roll. 📄 Krehel, `palette-structure.md`.

## Mätning

- **Mät mot den yta färgen faktiskt står på**, kortet och inte sidan. Halvgenomskinliga ytor, `color-mix()` och opacitet mäts på det renderade resultatet, mot det ljusaste och det mörkaste som kan ligga bakom. 📄 Krehel, `contrast.md`; WCAG 2.2, [Understanding 1.4.3](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html).
- **Ett underkänt par lagas med L, inte nyansen**, och mäts om. 📄 Krehel, `contrast.md`.
- **Fokusringen mäts mot varje yta den korsar:** bakgrund, kort, mörk sektion och bild. 📄 WCAG 2.2, [1.4.11](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html) och [2.4.7](https://www.w3.org/WAI/WCAG22/Understanding/focus-visible.html).
- **Ytor som ska skiljas åt.** Kort mot sidans bakgrund och band mot band är dekor och har inget kontrastkrav. Är skillnaden under cirka 1,15:1 bör kortet få en kant eller en skugga (→ `detaljer.md`, *Ytor*). Tröskeln är härledd, inte en norm ⚠️.
- **Blanda i OKLab eller OKLCH.** `color-mix(in oklab, …)` och gradienter `in oklab` ger jämnare mellanlägen än sRGB. En tvåfärgad gradient som blir grå i mitten görs `in oklch` eller får ett tredje stopp. 📄 Krehel, `color-usage.md`; CSS Color 5, [color-mix()](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value/color-mix) (MDN).

## Mörka sektioner och lägen

- **En mörk sektion i ett ljust kit** (som Nästa steg) har egna roller: text, fokusring och knapp på mörk yta. Accenten mäts om mot den mörka ytan och används inte där den inte klarar 3:1 som knapp eller 4,5:1 som text. 📄 WCAG 1.4.3, 1.4.11.
- **Mörkt läge för en hel sajt finns inte i något kit.** Kommer det: rollerna pekas om först, accenten blir 1–2 steg mindre mättad, och varje par mäts i båda lägena. `prefers-contrast: more` får ett eget block. 📄 Krehel, `palette-generation.md`, `color-usage.md` (senare nivå).

## Format och verktyg

- Ny färg skrivs i `oklch()`; hex-reserv är frivillig (→ `guide/2-5-yta.md`, en källa – bänken). Utanför sRGB-gamut: sänk kroman, behåll L och nyans. P3 är en förbättring i `@media (color-gamut: p3)`, aldrig grunden. 📄 Krehel, `color-formats.md`; [CSS Color 4](https://www.w3.org/TR/css-color-4/).
- Verktygen körs vid byggtid och skeppas aldrig: Color.js (konvertering, gamut, WCAG-kontrast), Adobe Leonardo med `wcag2` och målkvoter per roll, Radix verktyg för egna paletter som jämförelse. Detaljer och licenser → `tokens.md`, *Verktyg*.
