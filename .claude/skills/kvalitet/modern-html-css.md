# Modern HTML och CSS

Primitiverna (`<details name>`, `popover`-menyn, `<dialog>`) och regeln *HTML först* står i `guide/2-4-skelett.md`. Här står policyn för webbläsarstöd, statusen per funktion och vad som ska vara sant om de används.

## Policy för webbläsarstöd

Förslag till Johnny, ur modern-web-guidance (📄 [GoogleChrome/modern-web-guidance](https://github.com/GoogleChrome/modern-web-guidance), Apache-2.0; status ur web-features via MDN):

- **Baseline Widely available** används fritt.
- **Baseline Newly available** används med en reserv som håller innehållet och navigeringen användbara utan funktionen.
- **Limited availability** används bara som förbättring som ingen saknar.

Övningssajten följer redan mönstret: menyknappen göms med `@supports not selector(:popover-open)`, och sidfoten har alla sidor (`bibliotek/src/sektioner/Sidhuvud.astro`).

## Status per funktion

Status enligt MDN:s Baseline-banner, avstämd mot web-features 3.43.0 den 16 oktober 2026 (📄 [web-features](https://github.com/web-platform-dx/web-features)). Där MDN och web-features skiljer sig står ⚠️.

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
| `:has()`, `dvh`, `clamp()`, logiska egenskaper | Används redan i biblioteket | | MWG anger ingen status för `:has()` ⚠️ |
| `@starting-style`, `transition-behavior: allow-discrete` | Newly (2024-08) | In- och utgång för popover och dialog | Utan stöd visas panelen direkt |
| View transitions mellan dokument | Limited (Chrome 126, Safari 18.2) | Mjuk övergång mellan sidor | Förbättring; följer rörelsebudgeten |
| Scrollstyrd animering | Limited | Bara förbättring (→ `guide/2-6-rorelse.md`) | Innehållet syns utan den |
| `<dialog closedby>` | Inte Baseline (saknas i Safari) | Stänga vid klick utanför | Skript eller stängknapp krävs |
| `hidden="until-found"` | Limited | Sökbart dolt innehåll | |
| Speculation rules | Inte Baseline (bara Chromium) | Förhämtning | Astro har `prefetch` (→ sajtens `astro.config.mjs`). MWG:s guide gör agenter för aggressiva på Astro (📄 modern-web-guidance #945) |
| Anchor positioning | Limited ⚠️ | Används inte | |

## Regler ur modern-web-guidance

Med vår märkning: **[norm]** när guiden bygger på en standard, **[tumregel]** annars (📄 modern-web-guidance, guiderna per område):

- LCP-bilden i HTML:en med `fetchpriority="high"`, övriga bilder `loading="lazy"`, alltid `width` och `height`, alltid `sizes` med `srcset`. [norm via web.dev]
- Skript med `defer` eller som modul. Inget `@import` i CSS. Bara kritiska typsnitt förladdas, med `crossorigin`. [tumregel]
- Typografi i `rem`, enhetslös radhöjd, rotens teckenstorlek skrivs aldrig över, så att användarens inställning gäller. [norm via 1.4.4]
- Rörelse på `transform` och `opacity`. En global `0.01ms` för reducerad rörelse används inte. [tumregel; → `guide/2-6-rorelse.md`]
- Säkerhetshuvuden och hash-CSP för statisk HTML (→ `sakerhet.md`). [norm via OWASP]

## Förbud

- Ingen polyfill från en CDN vid sidladdning. Flera guider i modern-web-guidance föreslår det, och det är tredje part vid sidladdning (→ `guide/2-8-teknik-och-kvalitet.md`, *Samtycke och analys*).
- modern-web-guidance körs inte som skill i byggsessionen. Den kör `npx -y …@latest` vid varje uppgift och har telemetri påslagen som standard (`DISABLE_TELEMETRY=1` stänger av den). Guiderna läses som data när en fråga kräver det (📄 modern-web-guidance, README och `SKILL.md`).
- En funktion med status Limited bär aldrig innehåll eller navigering ensam.
