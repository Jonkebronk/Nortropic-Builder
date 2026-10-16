# Modern HTML och CSS

Primitiverna (`<details name>`, `popover`-menyn, `<dialog>`) och regeln *HTML först* står i `guide/2-4-skelett.md`. Här står policyn för webbläsarstöd, statusen per funktion och vad som ska vara sant om de används.

## Policy för webbläsarstöd

Förslag till Johnny, ur modern-web-guidance (📄 [GoogleChrome/modern-web-guidance](https://github.com/GoogleChrome/modern-web-guidance), Apache-2.0; status ur web-features):

- **Baseline Widely available** används fritt.
- **Baseline Newly available** används med en reserv som håller innehållet och navigeringen användbara utan funktionen.
- **Limited availability** används bara som förbättring som ingen saknar.

Övningssajten följer redan mönstret: menyknappen göms med `@supports not selector(:popover-open)`, och sidfoten har alla sidor (`bibliotek/src/sektioner/Sidhuvud.astro`).

## Status per funktion

Status enligt web-features, som är facit (📄 [web-features](https://github.com/web-platform-dx/web-features)). Översynen 2026-10-16 fann att alla 42 statusrader stämmer med web-features 3.43.0 (`kunskap/research/2026-10-16_verktyg-och-skills-full-potential.md`). MDN-MCP:n är släppt (`BESLUT.md` 2026-10-16, *Domarna över MCP-servrarna …*, 21.37). Där MDN visar något annat står ⚠️.

| Funktion | Status | Används till | Reserv eller villkor |
|---|---|---|---|
| `<dialog>` med `showModal()`, `::backdrop` | Widely | Modal dialog: inert bakgrund, Escape, `aria-modal` inbyggt | Stängknapp synlig; ingen `tabindex` på dialogen (📄 [MDN, dialog](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/dialog)) |
| `inert` | Widely | Gömda paneler och listor utanför fokus | |
| `<details>` och `<summary>` | Widely | Utfällbart utan skript | Rubrik inuti `<summary>` prövas med skärmläsare (→ `guide/2-4-skelett.md`) |
| `<details name>` | Newly (2024-09) | Dragspel där en öppnas i taget | Utan stöd öppnas flera; det skadar inget |
| `popover` och `popovertarget` | Newly ⚠️ (MDN 2024-04, web-features 2025-01) | Mobilmenyn, lätta paneler | `@supports not selector(:popover-open)` döljer knappen; länkarna finns i sidfoten |
| Invoker commands (`command`, `commandfor`) | Newly (2025-12) | Öppna dialog utan skript | Länk eller skript som reserv (→ `guide/2-4-skelett.md`, N2) |
| `loading="lazy"` på `img` och `iframe` | Widely (2026-06) | Bilder och ramar under första vyn | Aldrig på LCP-bilden. Fördröjer bara med JavaScript påslaget |
| `fetchpriority` | Newly (2024-10) | LCP-bilden | Utan stöd laddas den som vanligt |
| `font-display` | Widely | `swap` med reservmått, eller `optional` | |
| `:focus-visible` | Widely | Fokusring vid tangentbord | |
| `prefers-reduced-motion` | Widely | Rörelse av eller mindre (→ `guide/2-6-rorelse.md`) | |
| `forced-colors` | Widely (2025-03) | Ramar och fokus i högkontrast | `box-shadow` försvinner i läget |
| `color-scheme`, `light-dark()` | Widely, respektive Newly (2024-05) | Mörkt läge om kitet har ett | |
| `text-wrap: balance` | Newly (2024-05) ⚠️ | Rubriker; högst 6 rader i Chromium | Vanlig brytning |
| `text-wrap: pretty` | Limited (saknas i Firefox) | Stycken | Vanlig brytning |
| `content-visibility` | Newly ⚠️ (MDN 2024-09, web-features 2025-09) | Långa sidor | `auto` behåller innehållet i tillgänglighetsträdet |
| `scrollbar-gutter` | Newly (2024-12) | Undvika hopp när rullisten kommer | |
| Container queries (storlek) | Widely | Sektioner som ska fungera i olika bredder | Krävs för prov i fast behållare (→ `prov.md`) |
| `:has()` | Widely (2026-06) | Stil efter barnens tillstånd | Används redan i biblioteket |
| `dvh`, `clamp()`, logiska egenskaper | Används redan i biblioteket | | |
| `overflow: clip` | Widely (2025-03) | Klippa utan att skapa en rullbehållare | Aldrig på `html` eller `body` (→ *Regler*) |
| `<source>` med `width` och `height` i `<picture>` | Widely | Annan beskärning i mobilen utan layoutskift | |
| `:user-invalid` | Widely (2026-05) | Stil på fel efter att besökaren försökt | Bara om webbläsarens validering används (→ `formular.md`) |
| `inputmode`, `enterkeyhint` | Widely | Rätt tangentbord i mobilen | |
| `hyphens: auto` med `lang="sv"` | Widely (2026-03); svenska i Chrome 112, Firefox 8, Safari 5.1 (MDN BCD) | Avstavning av långa svenska ord i rubriker och smala spalter | Utan stöd bryts ordet där `overflow-wrap` tillåter |
| `mask-image` | Widely (2026-06) | Form och tonad kant på bild och dekor | Aldrig på en behållare med text |
| Alt-text i `content` (`content: "→" / ""`) | Newly (2024-07) | Dekortecken i CSS som inte ska läsas upp | En vanlig `content` före som reserv |
| `scrollbar-width`, `scrollbar-color` | Newly (2024-12 respektive 2025-12) | Rullist i kitets färger | Göms aldrig på en yta som scrollar |
| `field-sizing: content` | Newly (2026-06) | Textruta som växer | `min-block-size` och vanlig `resize` |
| `@starting-style` | Newly (2024-08) | Entré för popover och dialog | Utan stöd visas panelen direkt |
| `allow-discrete` i `transition` | Newly (2024-08) enligt web-features; longhanden `transition-behavior` Limited enligt MDN ⚠️ | Utgång för popover och dialog | `transition` skrivs först utan värdet, sedan med (→ *Regler*) |
| `overlay` i en övergång | Inte Baseline (bara Chromium) | Panelen ligger kvar i top layer under utgången | I Firefox och Safari lämnar panelen top layer direkt; ingen funktion får hänga på utgången |
| View transitions mellan dokument | Limited (Chrome 126, Safari 18.2) | Mjuk övergång mellan sidor | Förbättring; följer rörelsebudgeten |
| Scrollstyrd animering | Limited | Bara förbättring (→ `guide/2-6-rorelse.md`) | Innehållet syns utan den |
| `<dialog closedby>` | Inte Baseline (saknas i Safari) | Stänga vid klick utanför | Skript eller stängknapp krävs |
| `hidden="until-found"` | Limited | Sökbart dolt innehåll | `<details>` före; utan stöd visas innehållet. Elementet får inte ha `display` `none`, `contents` eller `inline` (📄 MDN, `hidden`) |
| Speculation rules | Inte Baseline (bara Chromium) | Förhämtning | Astro har `prefetch` (→ sajtens `astro.config.mjs`). MWG:s guide gör agenter för aggressiva på Astro (📄 modern-web-guidance-src #945) |
| Anchor positioning | Newly (2026-01) enligt MDN; Limited (bara Safari 27) enligt web-features 3.43.0 ⚠️ | Används inte | Som förbättring: utan stöd ligger panelen i sitt standardläge |
| `<meta name="text-scale" content="scale">` | Limited (Chrome 146) | Roten följer telefonens textstorlek | Tas in först när sajten är prövad med 24 och 32 px grundstorlek (→ `tillganglighet.md`) |
| `scheduler.yield()` | Limited (Chrome 129, Firefox 142) | Lämna över huvudtråden i långa uppgifter | Löfte runt `setTimeout` (→ `prestanda.md`) |

## Regler ur modern-web-guidance

Med vår märkning: **[norm]** när guiden bygger på en standard, **[tumregel]** annars (📄 modern-web-guidance, guiderna per område):

- LCP-bilden i HTML:en med `fetchpriority="high"`, övriga bilder `loading="lazy"`, alltid `width` och `height`, alltid `sizes` med `srcset`. [norm via web.dev]
- Skript med `defer` eller som modul. Inget `@import` i CSS. Bara kritiska typsnitt förladdas, med `crossorigin`. [tumregel]
- Typografi i `rem`, enhetslös radhöjd, rotens teckenstorlek skrivs aldrig över, så att användarens inställning gäller. [tumregel som stöder 1.4.4: kriteriet klaras också med zoom]
- **`animation-timeline` står efter `animation` i samma regel,** annars nollställer shorthanden tidslinjen och animationen blir tidsstyrd. Scrollstyrda regler ligger inom `@supports ((animation-timeline: view()) and (animation-range: entry))` ⚠️ (att `animation-range` sållar bort delvis stöd är MWG:s påstående). 📄 [MDN, animation-timeline](https://developer.mozilla.org/en-US/docs/Web/CSS/animation-timeline) [norm]
- **`@starting-style` står efter regeln för öppet läge.** De har samma specificitet, så fel ordning ger ingen entré. `transition` med `allow-discrete` skrivs två gånger, först utan värdet, så att övergången finns kvar där deklarationen kastas. 📄 [MDN, @starting-style](https://developer.mozilla.org/en-US/docs/Web/CSS/@starting-style); MDN, `transition-behavior` [norm, tumregel för reserven]
- **Klippning görs med `overflow: clip`, och `html` och `body` får aldrig `overflow-x: hidden` eller `clip`.** Klippning på roten döljer sidledsfel som kontroll 3 ska hitta, och `hidden` gör elementet till en rullbehållare som ett klibbigt sidhuvud fastnar i. 📄 MDN, `overflow` och `position` [tumregel]
- **`color-scheme` anger bara de lägen kitet har.** Utan mörkt kit är värdet `light`; `light dark` utan mörka värden gör fält och rullister mörka på en ljus sida. 📄 [MDN, color-scheme](https://developer.mozilla.org/en-US/docs/Web/CSS/color-scheme) [tumregel]
- **En knapp som inte skickar formuläret har `type="button"`.** Ett omdöme står i `<blockquote>` och källan utanför, gärna som `<figcaption>`; `<cite>` är för ett verks titel, aldrig en persons namn. 📄 HTML-standarden [norm]
- **När mobilen behöver en annan beskärning** används `<picture>` med `<source media>` som har egna `width` och `height`, så att rätt höjd reserveras. Astros `<Picture>` gör bara format ⚠️ (beskärning per källa med `getImage()` är inte prövad). 📄 HTML-standarden, `source` [norm]
- **Långa svenska ord i rubriker och smala spalter får `hyphens: auto`** (sidan har `lang="sv"`), så att ett tvångsbrott får bindestreck. `overflow-wrap: anywhere` är sista utvägen och bryter utan bindestreck: på övningssajten delades ortnamnet i `h1` och företagsnamnet i sidhuvudet mitt i ordet med 24 px grundstorlek i 375 px. 📄 MDN BCD, `hyphens` (svenska); Emil `break-ui` (felsignaturen) [tumregel]
- **Företagets namn, personnamn och gatuadresser kan få `translate="no"`,** så att webbläsarens översättning inte gör *Kungsgatan* till en engelsk gata som inte finns på kartan. Det gäller sajter där många besökare läser på ett annat språk. ⚠️ Inte prövat med Chromes översättning. 📄 Vercel, *Web Interface Guidelines*; [HTML-standarden, `translate`](https://html.spec.whatwg.org/multipage/dom.html#attr-translate) [tumregel]
- **Skript känner av funktioner på prototypen,** till exempel `'popover' in HTMLElement.prototype` och `'closedBy' in HTMLDialogElement.prototype`. 📄 MWG [tumregel]
- **Status slås upp i web-features, som är facit, aldrig i modern-web-guidances rader.** Raderna är genererade och har fel (anchor positioning, `transition-behavior`, `popover="hint"`). [tumregel]
- Rörelse på `transform` och `opacity`. En global `0.01ms` för reducerad rörelse används inte. [tumregel; → `guide/2-6-rorelse.md`]
- Säkerhetshuvuden och hash-CSP för statisk HTML (→ `sakerhet.md`). [norm via OWASP]

## Förbud

- Ingen polyfill eller bibliotek från ett annat ursprung vid sidladdning, inte heller villkorat. Flera guider i modern-web-guidance föreslår det, ofta som `@latest` från unpkg, esm.sh eller jsdelivr, och det är tredje part vid sidladdning (→ `guide/2-8-teknik-och-kvalitet.md`, *Samtycke och analys*). En självhostad polyfill används bara med Johnnys ja, och reserven utan den ska ändå hålla.
- Inga exempel ur modern-web-guidance tas in med `onclick=` eller annan inline-händelse; sajtens CSP stoppar dem (→ `sakerhet.md`).
- modern-web-guidance körs inte som skill i byggsessionen. Den kör `npx -y …@latest` vid varje uppgift och har telemetri påslagen som standard (`DISABLE_TELEMETRY=1` stänger av den). Guiderna läses som data när en fråga kräver det (📄 modern-web-guidance, README och `SKILL.md`).
- En funktion med status Limited bär aldrig innehåll eller navigering ensam.
