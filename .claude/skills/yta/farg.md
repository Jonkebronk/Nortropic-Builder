# Färg

Delfil till `SKILL.md`. Färgsystemet i ett stilkit: roller, steg, kontrast och verktyg. Regler som redan står i guiden refereras och skrivs inte om.

## Redan beslutat (→ guiden)

- Kontrast enligt WCAG 2.2 AA är grind: text 4,5:1, stor text och gränssnitt 3:1 (→ `guide/2-5-yta.md`, *Kontroll*; C45 i `guide/bilaga-c-kontroller.md`).
- Accenten är till för handlingar: knappar, länkar och en markering som "I dag". Dekor får textfärgen eller den dämpade färgen (→ `guide/2-5-yta.md`, G3).
- Färgreceptet med OKLCH, Leonardo, Radix tolv steg och neutraler tonade mot accenten är N2 (→ `guide/2-5-yta.md`, *Färgrecept*). APCA är bara rådgivande.
- Den exakta varumärkesfärgen används bara där inget kontrastkrav gäller, till exempel i logotypen (→ `guide/2-5-yta.md`, N2).

## Färgstrategi: ett val per kit

- **Varje kit väljer en färgstrategi innan färgerna väljs:** *återhållsam* (tonade neutraler och en accent), *engagerad* (en mättad färg bär 30–60 % av ytan), *full palett* (3–4 namngivna roller) eller *genomfärgad* (ytan är färgen). Strategin står i kitets `design.md`. Varför: annars blir färgen utspridda accenter på en neutral bakgrund, som impeccable kallar kategorins standard. 📄 impeccable, `reference/new-work.md` §4 (Apache-2.0; en källa – bänken).
- **G3 gäller i alla strategier.** I en engagerad eller genomfärgad strategi bärs ytan av en dekorfärg eller en mörk sektion, aldrig av accenten; accenten stannar på handlingarna (→ `guide/2-5-yta.md`, G3). Lugn och Varm är återhållsamma; Djärvs mörka förstavy är närmast engagerad.
- **Ljust eller mörkt väljs ur användningsscenen**, inte ur branschen: vem som läser, var och i vilket ljus. Lokala tjänsteföretag läses mest i mobilen ute och i dagsljus, så kiten är ljusa. 📄 impeccable, `craft-floor.md` och `new-work.md` §4 (en källa – bänken).

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
| Slöja bakom meny och dialog | saknas (literal `rgb(0 0 0 / 0.35)` i `Sidhuvud.astro`) | – | – | dekor; texten ovanpå mäts mot slöjan |
| Fylld knapp | `--k-accent` | `--primary` | 9 | text på den 4,5:1 |
| Fylld knapp, hover | saknas | – | 10 | samma |
| Fylld knapp, tryck | saknas | – | 10–11 | samma |
| Länktext | `--k-accent-text` | – | 11 | 4,5:1 mot varje yta länken står på |
| Sekundär text | `--k-dampad` | `--muted-foreground` | 11 | 4,5:1 |
| Text | `--k-text` | `--foreground` | 12 | 4,5:1 |
| Text på fylld accent | `--k-pa-accent` | `--primary-foreground` | – | 4,5:1 |

Källor: Radix, [Understanding the scale](https://www.radix-ui.com/colors/docs/palette-composition/understanding-the-scale) (MIT); shadcn/ui, [Theming](https://ui.shadcn.com/docs/theming) (MIT); Krehel, `better-colors/palette-structure.md` och `token-naming.md` (MIT; slöjan som *overlay scrim*). Ta Radix roller, inte Radix värden: textstegen garanteras bara med APCA, och mätt med WCAG 2 ger steg 11 på steg 2 bara 4,25–4,43:1 för orange, bärnsten och gult och vit text på steg 9 bara 2,97:1 för orange (beräknat på `@radix-ui/colors` 3.0.0; ärende [#42](https://github.com/radix-ui/colors/issues/42)).

- **En roll per token.** En avdelartoken blir aldrig textfärg, och avdelare och kant är skilda roller även när värdet är lika. Varför: annars ändrar en justering av en kant plötsligt en text. 📄 Krehel, `token-naming.md`.
- **En betydelse per färg.** Nyanser inom cirka 15° i OKLCH läses som samma färg. En statusfärg (fel, varning, klart) ligger minst 15° från accenten, annars blandas den ihop med en handling. 📄 Krehel, `color-usage.md`, `palette-structure.md` (en källa – bänken).
- **Statusfärger bara när sajten visar tillståndet**, till exempel ett formulärfel. En andra accent finns bara när två saker måste skiljas åt på ett ögonkast; annars används fler steg av samma accent. 📄 Krehel, `palette-structure.md` (en källa – bänken; via yta-2).
- **Färg bär aldrig betydelse ensam.** Ett fel har också text eller ikon, en vald rad också vikt eller markering. 📄 WCAG 2.2, [1.4.1 Use of Color](https://www.w3.org/WAI/WCAG22/Understanding/use-of-color.html). Signalen ska också vara konsekvent: betyder accenten "går att trycka på" (G3), får en fristående länk i innehållet accenten, och understrykningen bär den i löptext. Navigering och sidfot är undantag, eftersom placeringen visar att det är länkar. 📄 Krehel, `color-usage.md` (en källa – bänken; via yta-2); NN/g, [Beyond Blue Links](https://www.nngroup.com/articles/clickable-elements/).
- **En fylld primärhandling per vy.** Övriga handlingar är sekundära (kontur) eller länkar. Varför: när allt är primärt pekar inget ut nästa steg. 📄 Krehel, `color-usage.md`; Refactoring UI, *Hierarchy is everything* (med egna ord; kommersiell).

## Accentens steg

- **Accenten har minst fyra steg:** fylld, hover, tryck och en subtil bakgrund. Ett kit med bara ett accentvärde kan inte visa tillstånd utan att uppfinna färger i komponenterna. 📄 Radix steg 3–5 och 9–10; Krehel, `palette-structure.md`; Vercel, [Web Interface Guidelines](https://vercel.com/design/guidelines): *":hover, :active, :focus have more contrast than rest state"* (MIT).
- **Stegen går bort från texten på fyllningen, och varje steg mäts med texten på.** Är `--k-pa-accent` ljus blir hover och tryck mörkare; är den mörk blir de ljusare. Varje steg har minst 4,5:1 mot sin text och mer kontrast än vilan. Varför: `bas.css` blandar i dag alltid mot `--k-text`, och i Djärv (bläcktext på orange) sjunker kontrasten från 5,77:1 i vila till 4,54:1 i hover och 3,66:1 i tryck; blandat mot `--k-bg` blir det 6,67 och 7,55:1. 📄 Vercel (*":hover, :active, :focus have more contrast than rest state"*); WCAG 2.2, Understanding 1.4.11 (en komponent får inte tappa kontrast vid hover); att 1.4.3 gäller tryckläget är tolkning ⚠️; beräkning av delagenten designsystem-uistyling 2026-10-16.
- **Stegen räknas i OKLCH, inte för ögat.** Hover är ett steg mörkare än fylld (cirka −0,04 till −0,06 i L), tryck ett till (omvänt när texten på fyllningen är mörk). Nyansen hålls konstant, och kroman sänks hellre än att nyansen vandrar. 📄 Krehel, `palette-generation.md`; Color.js för beräkningen ([colorjs.io](https://colorjs.io/), MIT). Värdena är en startpunkt (en källa – bänken).
- **Varumärkesfärgen hör till fyllningssteget om den klarar vit text.** Annars ligger den kvar för logotypen, och knappen fylls med ett mörkare steg i samma nyans. Mörka aldrig varumärket i smyg utan att det står som avvikelse i `sites/<namn>/design.md`. 📄 Krehel, `palette-generation.md`; → `guide/2-5-yta.md`, *Kundens identitet i kitet*.
- **Kundens färg är låst eller inpassad.** En avtalad varumärkesfärg i en grafisk profil hålls exakt, och rampen byggs ut från den. Annars får den landa på närmaste steg så att avstånden blir jämna, och ändringen skrivs som avvikelse i `sites/<namn>/design.md`. 📄 Krehel, `palette-generation.md` (*pinned or snapped*; via yta-2).
- **Kontrollen med HCT:s tonregel:** en skillnad på 40 i ton ger minst 3:1. Källan säger att 50 ger minst 4,5:1, men i värsta fall (ton 50 mot 100) blir det 4,48:1, så räkna med 51. Ton är L* i CIELAB, inte L i OKLCH, så regeln gäller bara värden räknade i HCT; slutkontrollen är alltid WCAG-formeln. 📄 Material Color Utilities, [Contrast for accessibility](https://github.com/material-foundation/material-color-utilities/blob/main/concepts/contrast_for_accessibility.md) (Apache-2.0).

## Rampen och neutralerna

- **En korrekt ramp:** L ändras jämnt i OKLCH, nyansen är konstant och kroman toppar i mitten. Den ljusa änden har finare steg. Ändarna når aldrig rent vitt eller svart. Stegen 50–200 ligger cirka 0,04–0,05 isär i L och mittstegen 0,07–0,10; grannsteg närmare än 0,03 är ett steg för mycket. 📄 Krehel, `palette-generation.md` och `palette-structure.md` (en källa – bänken; via yta-2).
- **Ren grå är ett fullgott val; en neutral tonad mot accenten är ett kitval, inte en rättelse.** Källorna är oense: Hallmark kräver kroma minst 0,005, impeccable och Krehel godtar neutral grå. Guidens *Färgrecept* (tonade neutraler) är ett recept för nya kit, inget fynd mot befintliga. 📄 Krehel; impeccable, `colorize.md`; Hallmark, `color.md`.
- **Nyanserna bestäms i förväg:** 8–10 gråtoner och 5–10 steg per färg, i nio steg 100–900 med basfärgen kring 500. 📄 Refactoring UI, [Building your color palette](https://refactoringui.com/previews/building-your-color-palette) (gratisutdrag; med egna ord).
- **Neutralerna bär 80–90 % av ytan.** En tonad neutral har kroma cirka 0,005–0,02 på accentens eller kitets nyans. Varm ton läses inbjudande, kall läses teknisk. Samma nyans genom hela neutralrampen. 📄 Krehel, `palette-structure.md`; Radix, [Composing a palette](https://www.radix-ui.com/colors/docs/palette-composition/composing-a-palette); → `guide/2-5-yta.md`, *Färgrecept*.
- **Inventera innan något läggs till.** Samla alla färgliteraler i ett kit, sortera på L, slå ihop färger som ligger närmare än cirka 0,02 i OKLab och ge varje kvarvarande färg en roll. 📄 Krehel, `palette-structure.md`.

## Mätning

- **Platshållartext och hjälptext har samma krav som annan text**, 4,5:1. 📄 WCAG 2.2, [Understanding 1.4.3](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html) (*"applies to text in the page, including placeholder text"*).
- **Hierarkin ska hålla utan färg.** Provsidan och sajten prövas i gråskala och med simulerad rödgrön färgblindhet (Chromes `Emulation.setEmulatedVisionDeficiency` med `achromatopsia` och `deuteranopia`): primärknappen ska fortfarande skilja sig från sekundärknappen, och ett tillstånd ska synas. 📄 WCAG 2.2, [1.4.1](https://www.w3.org/WAI/WCAG22/Understanding/use-of-color.html); impeccable, `colorize.md`; Hallmark, `color.md`.
- **Mät mot den yta färgen faktiskt står på**, kortet och inte sidan. Halvgenomskinliga ytor, `color-mix()` och opacitet mäts på det renderade resultatet, mot det ljusaste och det mörkaste som kan ligga bakom. 📄 Krehel, `contrast.md`; WCAG 2.2, [Understanding 1.4.3](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html).
- **Text på foto eller gradient mäts på det sämsta stället.** Finns inget lugnt område får texten en neutral slöja (svart eller kitets textfärg, 40–55 %) bara bakom texten, aldrig en färgad tonplatta. 📄 Krehel, `color-usage.md` och `contrast.md`; taste v2, `colour.md` §7; WCAG 2.2, Understanding 1.4.3 (via yta-2).
- **Textens färg väljs efter bakgrunden och mäts.** För en neutral bakgrund ligger WCAG 2:s skifte nära OKLCH L 0,56: där klarar både svart och vit text knappt 4,5:1. Vid L 0,65 ger svart 6,5:1 men vit bara 3,2:1. En fyllning som ska bära vit text ligger därför tydligt under skiftet, och en färgad fyllning mäts alltid. 📄 Krehel, `contrast.md`; beräkning med WCAG 2-formeln (yta-2, 2026-10-16).
- **Ett underkänt par lagas med L, inte nyansen**, och mäts om. 📄 Krehel, `contrast.md`.
- **Fokusringen mäts mot varje yta den korsar:** bakgrund, kort, mörk sektion och bild. 📄 WCAG 2.2, [1.4.11](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html) och [2.4.7](https://www.w3.org/WAI/WCAG22/Understanding/focus-visible.html).
- **Ytor som ska skiljas åt.** Kort mot sidans bakgrund och band mot band är dekor och har inget kontrastkrav. Är skillnaden under cirka 1,15:1 bör kortet få en kant eller en skugga (→ `detaljer.md`, *Ytor*). Tröskeln är härledd, inte en norm ⚠️.
- **En namngiven färg är ogenomskinlig.** Alfa är en modifierare för överlägg och skuggor, inte en färgroll; en kedja av halvgenomskinliga lager gör kontrasten beroende av vad som ligger under. 📄 impeccable, `colorize.md`; Hallmark, `color.md` (två skills, inga primärkällor – instruktion).
- **Accentens andel av första skärmen mäts och rapporteras**, men den är inget fynd så länge accenten bara ligger på handlingar (G3). Hallmark sätter taket till 3 % (`color.md`) och 5 % (grind 23) och vill inte ha stora fyllda knappar; på övningssajten är andelen 5,3 % i 375 px och 1,2 % i 1280 px, mest Boka-knappen och knapplisten. Källorna är oense (Material fyller primärknappen), så G3 avgör. 📄 Hallmark; `guide/2-5-yta.md`, G3.
- **Blanda helst i OKLab eller OKLCH.** `color-mix(in oklab, …)` och gradienter `in oklab` ger jämnare mellanlägen än sRGB. En tvåfärgad gradient som blir grå i mitten görs `in oklch` eller får ett tredje stopp. Färgrymden är ett kitval; en grå mitt är ett fynd. 📄 Krehel, `color-usage.md`; CSS Color 5, [color-mix()](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value/color-mix) (MDN).

## Mörka sektioner och lägen

- **En mörk sektion i ett ljust kit** (som Nästa steg) har egna roller: text, fokusring och knapp på mörk yta. Accenten mäts om mot den mörka ytan och används inte där den inte klarar 3:1 som knapp eller 4,5:1 som text. 📄 WCAG 1.4.3, 1.4.11.
- **En regel som sätter en mörk bakgrund sätter textfärgen i samma regel**, i stället för att lita på arvet. Det vanligaste felet i genererad kod är mörk text på en mörk yta som någon vänt. Sökbart. 📄 Hallmark, `interaction-and-states.md`, *When the surface flips* (en källa – bänken).
- **Statusfärgerna är roller i kitet** när sajten har formulär: fel (krävs), och klar, varning och information när de behövs, var och en med sin textfärg. 📄 impeccable, `colorize.md`; shadcn/ui, `--destructive` (→ `tokens.md`).
- **Mörkt läge för en hel sajt finns inte i något kit.** Kommer det: rollerna pekas om först, accenten blir 1–2 steg mindre mättad, och varje par mäts i båda lägena. `prefers-contrast: more` får ett eget block. 📄 Krehel, `palette-generation.md`, `color-usage.md` (senare nivå).

## Format och verktyg

- **Ett kit skrivs i en notation.** Ny färg i ett befintligt kit följer kitets notation (i dag hex), och ett nytt kit får skrivas i `oklch()` (→ `guide/2-5-yta.md`: OKLCH är ett bra format men inget krav). Att byta notation är en egen uppgift, aldrig en bieffekt. Notation, tonade neutraler och gradientens färgrymd är kitval, inte fynd. Utanför sRGB-gamut sänks kroman medan L och nyansen behålls. P3 är en förbättring i `@media (color-gamut: p3)`, aldrig grunden. 📄 Krehel, `better-colors/SKILL.md` och `color-formats.md` (via yta-2); [CSS Color 4](https://www.w3.org/TR/css-color-4/).
- Verktygen körs vid byggtid och skeppas aldrig: Color.js (konvertering, gamut, WCAG-kontrast), Adobe Leonardo med `wcag2` och målkvoter per roll, Radix verktyg för egna paletter som jämförelse. Detaljer och licenser → `tokens.md`, *Verktyg*.
