# Detaljer

Delfil till `SKILL.md`. Det som skiljer premium från basic: ytor, radier, skuggor, kanter, tillstånd, optisk linjering, ikoner, bilder och avstånd. Rörelsen i tillstånden (längder, kurvor, tryckskala) hör till rörelseskillen och `guide/2-6-rorelse.md`; här står vad som ska synas.

## Redan beslutat (→ guiden)

- Ikoner är sakliga och föreställer tjänsten; saknas en ikon ritas en egen i familjens stil (→ `guide/2-5-yta.md`, G2).
- En ikonfamilj per kit, inline-SVG; Lucide, Tabler eller Phosphor (→ `guide/2-5-yta.md`, N2).
- En bild förstoras högst cirka 1,4 gånger på en skärm med dubbel upplösning (→ `guide/2-5-yta.md`, G1).
- Ett foto som kapas mitt i personen eller föremålet brukar fälla en sajt (→ `mallar/granskning.md`, G6).
- Kartbilder är dämpade, i gråskala, med en egen nål i accentfärg (`BESLUT.md` 2026-10-16, kvalitetsgranskningen C7).
- Med `prefers-reduced-motion: reduce` förflyttas, skalas och roteras ingenting; färg och opacitet får byta (→ `guide/2-6-rorelse.md`, N1).

## Ytor

- **Ytorna har nivåer:** sidans bakgrund, kort, upphöjd yta (meny, dialog) och mörk sektion. Varje nivå är en token i kitet. 📄 Krehel, `better-colors/token-naming.md` (MIT); Material 3, [Elevation](https://m3.material.io/styles/elevation/overview).
- **En yta som ska läsas som eget föremål måste synas mot ytan under.** Skiljer sig två ytor bara lite i färg (under cirka 1,15:1), får den övre en kant eller en skugga. Färre kanter är bättre än många, men ett kort som flyter ihop med sidan är ingen yta. 📄 Refactoring UI, *Use fewer borders* (med egna ord); Vercel, [Web Interface Guidelines](https://vercel.com/design/guidelines): *semi-transparent borders improve edge clarity* (MIT). Tröskeln är härledd ⚠️.
- **Lägg aldrig en ljus genomskinlig yta på en annan.** Ett genomskinligt sidhuvud mäts mot det mörkaste och det ljusaste som kan scrolla under det, och blir solitt med `prefers-reduced-transparency: reduce` (stöds bara i Chromium-webbläsare, så det solida får inte vara enda skyddet). 📄 Emil Kowalski, `apple-design` (MIT); [Media Queries 5](https://www.w3.org/TR/mediaqueries-5/#prefers-reduced-transparency); [caniuse](https://caniuse.com/mdn-css_at-rules_media_prefers-reduced-transparency).

## Radier

- **Radien är en token per elementklass:** fält, knapp, kort, bild och piller. Ingen radie skrivs som literal i en sektion. 📄 daisyUI 5, [themes](https://daisyui.com/docs/themes/) (`--radius-field`, `--radius-box`, `--radius-selector`; MIT); Material 3:s formskala (0, 4, 8, 12, 16, 28 px och helt rund; material-web, Apache-2.0); → `guide/2-5-yta.md`, kitets axlar.
- **Nästlade radier är koncentriska:** yttre radie = inre radie + avstånd emellan + kantbredd. Vid mer än cirka 24 px emellan räknas de som separata ytor med egna radier. 📄 Krehel, `better-ui/surfaces.md`; Vercel (*child radius ≤ parent radius & concentric*).
- **Fokusringen följer elementets radie.** `outline` följer `border-radius` i moderna webbläsare, så fokusregeln sätter ingen egen radie som ändrar formen. 📄 MDN, [outline](https://developer.mozilla.org/en-US/docs/Web/CSS/outline).

## Skuggor och kanter

- **Skuggor ger djup, kanter ger struktur.** Kanter behålls på avdelare, tabellceller, formulärfält och valt tillstånd. 📄 Krehel, `better-ui/SKILL.md`.
- **En skugga har minst två lager:** ett tätt och mörkare nära föremålet och ett mjukt och ljusare längre bort, gärna med en ring på 1 px längst in. Startvärden för ljusa kit: `0 0 0 1px` / 0,06, `0 1px 2px -1px` / 0,06, `0 2px 4px` / 0,04; vid hover 0,08 / 0,08 / 0,06. 📄 Krehel, `better-ui/surfaces.md`; Refactoring UI, *Shadows can have two parts* (med egna ord); Vercel (*at least two layers*).
- **Skuggan tonas mot kitets nyans** på färgade bakgrunder, i stället för ren svart. 📄 Vercel (*tint borders/shadows toward the same hue*). Krehel använder neutral svart med låg alfa; båda fungerar, men kitet väljer en.
- **Skuggor är tokens i kitet** (till exempel `--k-skugga-1`, `--k-skugga-2`), aldrig literaler i en sektion. 📄 → C48 i `guide/bilaga-c-kontroller.md` (N2).
- **Under en skugga som ersätter en kant ligger `border: 1px solid transparent`**, eftersom läget forced-colors tar bort `box-shadow` men ritar kanten. 📄 Krehel, `surfaces.md`; MDN, [forced-colors](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/forced-colors).

## Tillstånd

Varje interaktivt element har de tillstånd det behöver, och varje tillstånd syns utan att färg är enda signal.

| Tillstånd | Vad som ska synas | Källa |
|---|---|---|
| Vila | Tydligt klickbart: knappform, understrykning eller pil | NN/g, [Beyond Blue Links](https://www.nngroup.com/articles/clickable-elements/) |
| Hover | Mer kontrast än vila: ett mörkare accentsteg på fyllda knappar, en svag fyllning på konturknappar, tjockare understrykning på länkar. Bara i `@media (hover: hover)` | Vercel; Krehel, `better-ui/SKILL.md`; Material 3 state layers: hover 8 % (material-web, tokenfilerna 34.0.21) |
| Fokus | `:focus-visible` med en ring på 2–3 px, avstånd 2–3 px, minst 3:1 mot varje yta den korsar. Fokus skyms aldrig av fasta lister | WCAG 2.2 [2.4.7](https://www.w3.org/WAI/WCAG22/Understanding/focus-visible.html), [2.4.11](https://www.w3.org/WAI/WCAG22/Understanding/focus-not-obscured-minimum.html), [2.4.13](https://www.w3.org/WAI/WCAG22/Understanding/focus-appearance.html) (AAA, mått) |
| Tryck | Ett steg till: mörkare än hover. Tryckskala (cirka 0,97) bara inom rörelsebudgeten och aldrig med `reduce` | Vercel; Material 3: tryck och fokus 10 %, inaktiv 38 %; → `guide/2-6-rorelse.md` |
| Vald eller aktuell | `aria-current` eller `aria-pressed` med vikt, understrykning eller accent (ett tillstånd får accent enligt G3) | Krehel, `color-usage.md`; WCAG 1.4.1 |
| Inaktiv | Sällan på en företagssajt. Om den finns: tydligt annorlunda (lägre opacitet, ingen hover, `cursor: not-allowed`) och en förklaring i närheten. WCAG undantar inaktiva kontroller från kontrastkravet | WCAG 1.4.3 (*incidental*); Krehel, `better-ui/icons.md` |

- **Tillståndsfärgerna är steg i kitet** (`--k-accent-hover`, `--k-accent-tryck`), inte uträknade i komponenten. 📄 → `farg.md`, *Accentens steg*.
- **Färgbyten i tillstånd är korta**, cirka 100–200 ms; 400 ms känns segt på en knapp. Längderna ägs av rörelseskillen. 📄 → `guide/2-6-rorelse.md` (NN/g: cirka 100 ms för enkel återkoppling).
- **Träffytan är minst 24 × 24 px**, och knappar och listrader i tumzonen hellre 44–48 px. 📄 WCAG 2.2 [2.5.8](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html); Vercel (*on mobile, the minimum size is 44px*); Apple HIG (44 pt standard, minst 28 pt); Material (48 dp).

## Optisk linjering

Det som är geometriskt rätt ser ibland fel ut. Justera för ögat, med 1–2 px.

- **Glyfen linjerar med texten, inte lådan runt den.** När en ikon står i en ljus cirkel eller ruta som knappt syns, ser ikonen indragen ut mot rubriken under. Antingen syns lådan tydligt, eller så linjeras glyfen mot textkanten. 📄 Vercel (*every element aligns with something intentionally; adjust ±1px when perception beats geometry*).
- **Ikonsidan i en knapp får cirka 2 px mindre utfyllnad än textsidan.** 📄 Krehel, `better-ui/surfaces.md`.
- **En ikon bredvid en rad text centreras mot gemenernas höjd eller den första raden**, inte mot hela textblocket. När texten bryts står ikonen kvar vid första raden (adresser) eller följer sista ordet (pil efter länktext). 📄 Krehel, `better-ui/icons.md`; härlett för pilen ⚠️.
- **Asymmetriska ikoner** (play-triangel, pil) flyttas mot sin tyngdpunkt, helst i SVG:ns `viewBox`. 📄 Krehel, `surfaces.md`.
- **Hängande citattecken** → `typografi.md`.

## Ikoner

- **Strecket följer textens vikt** i renderade pixlar: text i vikt 400 runt 14–16 px ger cirka 1,5 px, vikt 500–600 ger cirka 2 px. En ikon ritad i 24 px och visad i 16 px med `stroke-width="2"` blir 1,33 px; med `vector-effect: non-scaling-stroke` blir den exakt. 📄 Krehel, `better-ui/icons.md`.
- **Ikoner i löptext är 1–1,25 em**, fristående ett steg ur typskalan. 📄 Krehel, `icons.md`.
- **En egen ikon följer familjens ritregler.** För Lucide: rutnät 24 × 24, streck 2 px, runda ändar och hörn, minst 1 px luft mot kanten. Licenslistan har Lucides text (ISC) och Feathers (MIT). 📄 Lucide, [Icon design guide](https://lucide.dev/contribute/icon-design-guide); → `guide/2-5-yta.md`, G2.
- **Dekorikoner** har `aria-hidden="true"` och text- eller dämpad färg (→ G3). **Ikonknappar utan text** har `aria-label`. 📄 Vercel; Lucide v1 (`aria-hidden` som standard).
- **Kontur är standard; fylld ikon betyder aktiv** när familjen har fyllda varianter. 📄 Krehel, `icons.md`.
- **En ikon som inte känns igen på en sekund är fel ikon**, hur snygg den än är. Den prövas i blickprovet utan sin etikett, men står på sajten alltid med en synlig etikett. 📄 NN/g, [Icon Usability](https://www.nngroup.com/articles/icon-usability/); → C34 i `guide/bilaga-c-kontroller.md`.

## Bilder

- **Varje foto har bredd och höjd eller `aspect-ratio`**, så att platsen är reserverad. 📄 Vercel; web.dev, [CLS](https://web.dev/articles/cls).
- **En tunn inre kant på foton med ljus bakgrund**: `outline: 1px solid` med svart på cirka 10 % och `outline-offset: -1px`, så att fotot inte flyter ut i en ljus yta. Inte på frilagda foton, logotyper eller illustrationer. 📄 Krehel, `better-ui/surfaces.md` (en källa – bänken).
- **Frilagda foton har rena kanter.** Kanten granskas i 200 % mot både ljus och mörk yta: ingen ljus gloria, inga hackiga hårstrån, ingen kvarlämnad bakgrund. Ett motiv som slutar mitt i något tonas ut mot underkanten i stället för att få ett hårt snitt (`bibliotek/src/sektioner/Forstavy.astro`). 🔧 (Johnnys anteckningar 2026-10-15 och 2026-10-16; frilägget är ett bildverktygs jobb, → innehållsskillen).
- **Beskärningen slutar vid en naturlig linje**, aldrig mitt i ett ansikte, en hand eller ett föremål som bär budskapet. Hellre en tätare beskärning kring handlingen än ett helt foto som kapas av kortets kant. 📄 → G6 i `mallar/granskning.md`.
- **`mix-blend-mode: multiply` gömmer en vit fotobakgrund bara mot en färgad yta.** Mot en vit yta gör det ingenting. 📄 MDN, [mix-blend-mode](https://developer.mozilla.org/en-US/docs/Web/CSS/mix-blend-mode).
- **En bildbehandling per kit:** färg, dämpad, gråskala eller duoton, samma radie och samma kant. 📄 → `guide/2-5-yta.md`, kitets axlar.
- **Riktiga foton av människorna och arbetet går före stockbilder**, som ignoreras som utfyllnad. 📄 NN/g, [Photos as Web Content](https://www.nngroup.com/articles/photos-as-web-content/); → `guide/2-7-innehall.md` (ärlighetsregeln).

## Avstånd

- **Bara värden ur kitets avståndsskala** (`--k-a1` …), också i knappar och ikonmarginaler. 📄 Refactoring UI, *Establish a spacing and sizing system* (med egna ord); → C48.
- **Avståndet mellan grupper är minst dubbelt så stort som inom en grupp.** 📄 Krehel, `better-layout` (MIT); Gestalt, närhet. Layoutens regler i övrigt → skelettskillen och `guide/2-4-skelett.md`.
