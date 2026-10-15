# Lager 5 – Yta: kandidater per lucka och källor att destillera Yta-skillen ur (läge oktober 2026)

*GitHub-data (stjärnor, licens, senaste push) hämtades via GitHub-API **2026-10-13**. "Licens" är GitHubs metadata. Om LICENSE-filen säger något annat anges det. Domarna är **Ta in**, **Pröva**, **Bevaka** och **Avstå**. "Byggtid" betyder att verktyget bara körs när sektionsbiblioteket eller kiten byggs. "Destillera" betyder att principer och värden skrivs in i Nortropics egna kit eller i Yta-skillen. "Skeppas" betyder att något hamnar i den färdiga sajten, och det får bara vara CSS, typsnittsfiler och SVG. Skills som redan finns i inventariet (better-*, ui-ux-pro-max, emil-*, impeccable, hallmark, taste-*, Inspo-MCP) föreslås inte igen.*

## 1. Vad är status för W3C DTCG-formatet 2025–2026, vilka verktyg implementerar det, och vilket passar bäst för Astro + Tailwind 4?

### Takeaway
DTCG nådde sin första stabila version, **2025.10**, som "Final Community Group Report" den 28 oktober 2025. Den består av modulerna Format, Color och Resolver, men är uttryckligen ingen W3C-standard. **Terrazzo** passar bäst för Astro + Tailwind 4. Verktyget hette tidigare Cobalt och är stabilt sedan 2.x 2026. Det klarar 2025.10-resolvers, har en officiell Tailwind v4-plugin som skriver `@theme` och har inbyggd WCAG-kontrastlint. **Style Dictionary** har störst ekosystem men saknar fullt stöd för 2025.10 och har inget Tailwind-format.

### Cited Findings
**Standarden**
- Version 2025.10 tillkännagavs den 28 oktober 2025 som "the first stable version". Den beskrivs som "a production-ready, vendor-neutral format for sharing design decisions across tools and platforms". Den täcker teman och flera varumärken (ljust och mörkt läge, tillgänglighetsvarianter, varumärkesteman "without duplicating files"), färg i Display P3, Oklch och CSS Color Module 4, alias och arv samt generering för flera plattformar — [W3C Design Tokens CG](https://www.w3.org/community/design-tokens/2025/10/28/design-tokens-specification-reaches-first-stable-version/)
- Gruppen anger Style Dictionary, Tokens Studio och Terrazzo som referensimplementationer. Penpot, Figma, Sketch, Framer, Knapsack, Supernova och zeroheight stöder eller implementerar formatet — [W3C Design Tokens CG](https://www.w3.org/community/design-tokens/2025/10/28/design-tokens-specification-reaches-first-stable-version/)
- Omslaget säger "Final Community Group Report" (28 October 2025). Texten säger "It is not a W3C Standard nor is it on the W3C Standards Track." och "This specification is considered stable." Statusavsnittet kallar samtidigt dokumentet "Candidate Recommendation", så dokumentet ger två motstridiga etiketter. Modulerna är Format, Color och Resolver — [Design Tokens TR 2025.10](https://www.designtokens.org/tr/2025.10/)
- Format-modulen definierar de primitiva typerna `color`, `dimension`, `fontFamily`, `fontWeight`, `duration`, `cubicBezier` och `number` samt de sammansatta `strokeStyle`, `border`, `transition`, `shadow`, `gradient` och `typography`. Filändelserna är `.tokens` och `.tokens.json` och mediatypen `application/design-tokens+json`. Alias skrivs som `{group.token}` eller med `$ref` (JSON Pointer) — [Format 2025.10](https://www.designtokens.org/tr/2025.10/format/)
- Om dimensioner säger specen: "The value MUST be an object containing a numeric value (integer or floating-point) and unit of measurement ("px" or "rem")" — [Format 2025.10](https://www.designtokens.org/tr/2025.10/format/)
- I Color-modulen är `$value` ett objekt med `colorSpace` (bland annat `srgb`, `hsl`, `hwb`, `lab`, `lch`, `oklab`, `oklch`, `display-p3`, `rec2020`), `components`, valfri `alpha` och valfri `hex`-reserv — [Color 2025.10](https://www.designtokens.org/tr/2025.10/color/)
- Resolver-modulen har "sets" som alltid gäller och "modifiers" med "contexts" (till exempel `light`/`dark`) och ett `default`. Lagerordningen styrs av `resolutionOrder`, där "tokens later in the array overriding any tokens that came before them". Verktyget tar emot "inputs" som `{ "theme": "dark" }` — [Resolver 2025.10](https://www.designtokens.org/tr/2025.10/resolver/)
- Spec-repot design-tokens/community-group har 2 148 stjärnor, licens "Other" och senaste push 2026-09-08 — [GitHub](https://github.com/design-tokens/community-group)

**Verktyg (kandidatkort)**

| Kandidat | Stjärnor · licens · senaste push | Vad den gör (verifierat) | Förankring |
|---|---|---|---|
| **Terrazzo** (CLI + plugins) | 475 · MIT · 2026-10-13 ([repo](https://github.com/terrazzoapp/terrazzo)) | "Use DTCG tokens JSON to generate code for web, mobile, native apps, and more" ([repo](https://github.com/terrazzoapp/terrazzo)). Integrationer finns för CSS, CSS-in-JS, Sass, JS/TS, Storybook, Swift, Tailwind och Vanilla Extract ([docs](https://terrazzo.app/docs/)). Verktyget släpptes 2021 som "Cobalt". Release candidate för 2.0 kom 2026-03-08 med stöd för "Token Resolvers", "$extends" och "$refs" ([blogg](https://terrazzo.app/blog/release-candidate-2-0/)). Senaste version av `@terrazzo/cli` på npm är 2.8.0 ([jsDelivr](https://data.jsdelivr.com/v1/packages/npm/@terrazzo/cli)) | DTCG 2025.10 inklusive Resolver |
| **Style Dictionary** | 4 858 · Apache-2.0 · 2026-10-10 ([repo](https://github.com/style-dictionary/style-dictionary)) | "As of version 4, Style Dictionary has first-class support for the DTCG format". Fullt stöd för 2025.10 är "a work in progress in v5" ([docs](https://styledictionary.com/info/dtcg/)). Issue #1590, "Support for DTCG v2025.10", är öppen sedan 2025-11-04 och uppdaterades senast 2026-10-12 ([issue](https://github.com/style-dictionary/style-dictionary/issues/1590)). Senaste version på npm är 5.5.2 ([jsDelivr](https://data.jsdelivr.com/v1/packages/npm/style-dictionary)). Det finns inget fördefinierat Tailwind-format. `css/variables` har `selector` (sträng eller array) och `outputReferences` ([formats](https://styledictionary.com/reference/hooks/formats/predefined/)) | DTCG på v4-nivå |
| **Tokens Studio for Figma** + **sd-transforms** | 1 623 · MIT · 2026-10-13 ([plugin](https://github.com/tokens-studio/figma-plugin)); 251 · MIT · 2025-12-10 ([sd-transforms](https://github.com/tokens-studio/sd-transforms)) | Figma-plugin plus transforms för Style Dictionary. Free-planen ger "1 theme group with 2 theme options", Team kostar €39/mån (årsvis) och Organization €499/mån ([pricing](https://tokens.studio/pricing)). **Flagga: temafunktionerna är kommersiell SaaS** | DTCG-referensimplementation |
| tokens-studio/sd-tailwindv4 | 15 · ingen licens angiven · 2025-07-03 ([repo](https://github.com/tokens-studio/sd-tailwindv4)) | "Example of a style-dictionary workflow implementation to Tailwind V4" | – |
| style-dictionary-utils | 228 · MIT · 2026-02-03 ([repo](https://github.com/lukasoppermann/style-dictionary-utils)) | "A package of transforms, formats, filters, etc." för Style Dictionary | – |
| **Penpot** (inbyggda design tokens) | 61 006 · MPL-2.0 · 2026-10-13 ([repo](https://github.com/penpot/penpot)) | "Penpot Design Tokens adhere to the Design Tokens Format Module". Har sets där den sista vinner och teman som är "multidimensional". JSON kan importeras och exporteras ([guide](https://help.penpot.app/user-guide/design-systems/design-tokens/)) | DTCG Format |

**Detaljer om Terrazzo + Tailwind 4**
- `@terrazzo/plugin-tailwind` "can generate a Tailwind v4 Theme from your design tokens". Den körs tillsammans med `plugin-css`, och `npx tz build` skriver `tokens/tailwind-theme.css` med ett `@theme`-block. Tokens mappas via objekt, arrayer eller globmönster (picomatch). En typografitoken `tiny` blir `--text-tiny` och `--text-tiny--line-height`. Plugin:en använder en mallfil där till exempel `@tz (theme: "dark");` injicerar resolverns utdata. "Every permutation used in the template must also be listed in plugin-css's permutations" — [Terrazzo Tailwind](https://terrazzo.app/docs/integrations/tailwind/)
- Senaste version av `@terrazzo/plugin-tailwind` på npm är 2.8.0 — [jsDelivr](https://data.jsdelivr.com/v1/packages/npm/@terrazzo/plugin-tailwind)
- Lintern har 27 inbyggda regler. Bland dem finns `a11y/min-contrast` ("Ensure minimum WCAG 2.2 contrast given token pairs", nivå AA eller AAA, med flaggan `largeText`), `a11y/min-font-size` (`minSizePx`/`minSizeRem`), `core/max-gamut`, `core/colorspace`, `core/consistent-naming`, `core/required-modes`, `core/descriptions` och `core/duplicate-values`. APCA nämns inte — [Terrazzo lint](https://terrazzo.app/docs/linting/)
- Leverantören hävdar att Terrazzo "is the only tool that supports the full DTCG format". Samma docs-sida säger att resolvers kommer i 2.0, vilket är inaktuellt eftersom 2.x redan är släppt — [Terrazzo docs](https://terrazzo.app/docs/); [RC-blogg](https://terrazzo.app/blog/release-candidate-2-0/)

**Mottagarsidan: Tailwind 4**
- Tailwind v4.0 kom den 22 januari 2025. Konfigurationen är CSS-first i `@theme`, och v4 "takes all of your design tokens and makes them available as CSS variables by default". Hela standardpaletten flyttades "from `rgb` to `oklch`" — [Tailwind v4.0](https://tailwindcss.com/blog/tailwindcss-v4)
- Namnrymderna är bland annat `--color-*`, `--font-*`, `--text-*`, `--font-weight-*`, `--tracking-*`, `--leading-*`, `--breakpoint-*`, `--container-*`, `--spacing-*`, `--radius-*`, `--shadow-*`, `--inset-shadow-*`, `--drop-shadow-*`, `--blur-*`, `--ease-*` och `--animate-*`. Dokumentationen säger: "Use `@theme` when you want a design token to map directly to a utility class, and use `:root` for defining regular CSS variables that shouldn't have corresponding utility classes". Med `@theme inline` använder utilityn variabelns *värde*. `--color-*: initial` och `--*: initial` tar bort standardtemat — [Tailwind theme](https://tailwindcss.com/docs/theme)

**Arkitekturprincip**
- Brad Frost (11 juli 2022) beskriver tre token-nivåer. Tier 1-tokens "define the theme's design properties in the abstract", Tier 2 är "a semantic theme layer that map Tier-1 tokens to high-level usage", och Tier 3 är komponenttokens. Teman delar "the same bones" och byter bara värden i ett eget lager — [Brad Frost](https://bradfrost.com/blog/post/the-many-faces-of-themeable-design-systems/)

### Inferences
- **Föreslagen pipeline (byggtid → skeppas):**
  1. `tokens/base.tokens.json` innehåller Tier 1: OKLCH-färger, typsnittsfamiljer och dimensioner i rem.
  2. `tokens/kit-<namn>.tokens.json` innehåller Tier 2, de semantiska rollerna per stilkit.
  3. `resolver.json` har en modifier `kit` med contexts som `traditionell`, `stram`, `varm` och `lekfull`, och vid behov en modifier `mode` för ljust och mörkt läge.
  4. `tz build` kör `plugin-css` (en permutation per kit) och `plugin-tailwind` och skriver `tailwind-theme.css`.
  5. `tz lint` kör `a11y/min-contrast` (AA) på alla text- och bakgrundspar och `a11y/min-font-size`.
  6. Bara CSS skeppas. Resolver-modellen motsvarar exakt "ett system, flera kit".
- **Flytande värden ryms inte i standarden.** DTCG-dimensioner tillåter bara `px` och `rem`, och typografitokens använder dimensioner. Därför kan `clamp()`-skalor inte uttryckas som standardtokens. Lagra min- och maxvärden som två tokens (eller i `$extensions`) och generera `clamp()` i en egen Terrazzo-plugin eller transform, se avsnitt 3.
- **Byte av kit i webbläsaren** (tre riktningar på samma innehåll) kräver att utilities refererar CSS-variabler som skrivs över per selektor, till exempel `[data-kit="stram"]`. Använd shadcn-mönstret: råa variabler i `:root`/selektor och mappning via `@theme inline` (`--color-primary: var(--primary)`). Alternativet är tre separata byggen. Jag har inte verifierat att Terrazzos `plugin-css`-permutationer kan knytas direkt till attributselektorer. Det behöver ett snabbt prov.

| Kandidat | Lucka | Passform (statisk Astro · TW4 · egna typsnitt · svenska) | Används som | Dom |
|---|---|---|---|---|
| DTCG 2025.10 som källformat | Token-pipeline | Neutral JSON. `oklch` matchar TW4, och resolvern passar kit × läge | Destillera (schema för kit) | **Ta in**: stabilt och leverantörsneutralt, med rätt modell för flera kit på samma komponenter |
| Terrazzo | Token-pipeline | Officiell `@theme`-utdata för TW4, CSS-variabler och WCAG-lint. Påverkar inte svensk text | Byggtid | **Ta in**: enda verktyget som har både 2025.10-resolvers och en TW4-plugin. Litet community (475 stjärnor), så lås versioner |
| Style Dictionary v5 | Token-pipeline | TW4-formatet måste skrivas själv, och 2025.10-stödet är ofullständigt | Byggtid (reserv) | **Bevaka**: byt om #1590 stängs och Terrazzo stagnerar |
| Tokens Studio + sd-transforms | Token-pipeline | Bygger på Figma, och temafunktionerna kostar | – | **Avstå**: Nortropic har inget Figma-steg |
| Penpot tokens | Visuell redigering av kit | Öppen källkod, DTCG-JSON | Byggtid (manuellt) | **Bevaka**: blir relevant först om en mänsklig designer ska redigera kiten visuellt |
| sd-tailwindv4 / style-dictionary-utils | Token-pipeline | Bara relevanta om Style Dictionary väljs | – | **Avstå** |

### Gaps
- Jag har inte provat om Terrazzos `plugin-css`-permutationer kan ge `[data-kit=…]`-selektorer. Dokumentationen nämner permutationer men visar ingen selektormappning i källorna jag läste.
- Jag kunde inte läsa issue #1590:s brödtext (API-hämtningen misslyckades). Det är alltså okänt exakt vilka 2025.10-delar Style Dictionary saknar och när v5 ska bli klart.
- Jag har inte verifierat hur väl Tokens Studio och Penpot följer 2025.10 (Resolver, nytt färgobjekt).
- Sökbudgeten för webbsökning tog slut mot slutet av uppdraget. Senare kontroller gjordes därför bara med hämtningar och GitHub-API.

## 2. Vilka färgverktyg ger tillgängliga paletter från en varumärkesfärg (Leonardo, Radix Colors, Material/HCT, APCA vs WCAG 2, OKLCH-generatorer)?

### Takeaway
Gör **WCAG 2.2 AA** till hård spärr: 4,5:1 för text och 3:1 för stor text och UI-delar. **APCA** ska bara vara ett rådgivande mått. APCA ströks ur WCAG 3-utkastet 2023, WCAG 3:s kontrastalgoritm är fortfarande obestämd (troligen klar tidigast omkring 2030), och apca-w3 har en restriktiv licens. Generera skalor med **Adobe Leonardo**, som räknar fram färger mot målkontrast, är Apache-2.0 och nu har en officiell MCP-server och en agent-skill. Ordna skalorna efter **Radix 12-stegsroller** och använd **HCT:s tonregel** som snabbkontroll: en tonskillnad på 40 ger minst 3:1 och 50 ger minst 4,5:1.

### Cited Findings
**Normer och status**
- WCAG 2.2 SC 1.4.3 (AA) kräver "a contrast ratio of at least 4.5:1". Stor text kräver 3:1, och logotyper är undantagna. Stor text är 18 pt eller 14 pt fet, vilket motsvarar ungefär 24 px respektive 18,5 px. AAA (1.4.6) kräver 7:1 — [W3C Understanding 1.4.3](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html)
- SC 1.4.11 (AA) kräver "a contrast ratio of at least 3:1 against adjacent color(s)" för det som behövs för att identifiera UI-komponenter och deras tillstånd, och för grafiska objekt — [W3C Understanding 1.4.11](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html)
- Läget för WCAG 3 i april 2026: kontrasttestet är "Exploratory", och "The contrast algorithm used in WCAG 3 is yet to be determined." APCA markerades för borttagning tidigt 2023 och togs bort ur juliutkastet 2023. WCAG 3 är "years away from being done, perhaps 2030 at the soonest" — [Adrian Roselli](https://adrianroselli.com/2026/04/wcag3-contrast-as-of-april-2026.html)
- Källorna går isär: Color.js-dokumentationen skriver fortfarande att "APCA is being evaluated for use in version 3". Den kritiserar också WCAG 2.1 för "numerous false positive and false negative results, particularly in dark mode" — [Color.js contrast](https://colorjs.io/docs/contrast). Det motsägs av [Roselli](https://adrianroselli.com/2026/04/wcag3-contrast-as-of-april-2026.html). Vercels riktlinjer säger "Prefer APCA over WCAG 2 for more accurate perceptual contrast" — [Vercel](https://vercel.com/design/guidelines)
- apca-w3 är licensierad till W3/AGWG "for use with WCAG accessibility guidelines for web-delivered and web-based content only". Licensen säger också: "Commercial use is prohibited without a written and signed commercial license agreement, except as provided by the W3 cooperative agreement for web content only." Den som använder koden måste alltid hålla den uppdaterad, och filer utanför W3-avtalet är "licensed under the AGPU v3 License" (sic). **Flagga: restriktiv och AGPL-liknande licens** — [apca-w3 LICENSE](https://github.com/Myndex/apca-w3/blob/master/LICENSE.md)
- Juridiskt sammanhang: enligt lag (2023:254) 10 § gäller att "Tjänster som tillhandahålls av mikroföretag behöver inte uppfylla tillgänglighetskraven". Ett mikroföretag har färre än tio anställda och en omsättning eller balansomslutning på högst 2 miljoner euro. Lagen omfattar bland annat e-handelstjänster och trädde i kraft den 28 juni 2025 — [lagen.nu](https://lagen.nu/2023:254)

**Kandidatkort**

| Kandidat | Stjärnor · licens · senaste push | Vad den gör (verifierat) | Förankring |
|---|---|---|---|
| **Adobe Leonardo**: `@adobe/leonardo-contrast-colors` 1.1.0, `@adobe/leonardo-mcp`, agent-skill | 2 155 · Apache-2.0 · 2026-07-08 ([repo](https://github.com/adobe/leonardo)) | "Generate colors based on a desired contrast ratio". En `Theme` har `lightness`, `contrast`, `saturation` och `ratios` per färg ([README](https://github.com/adobe/leonardo/blob/main/packages/contrast-colors/README.md)). Typen `ContrastFormula = 'wcag2' \| 'wcag3'`, där wcag3 betyder APCA ([index.d.ts](https://github.com/adobe/leonardo/blob/main/packages/contrast-colors/index.d.ts)). MCP-servern har verktygen `generate-theme`, `check-contrast`, `convert-color` (inklusive OKLCH) och `create-palette`, och en agent-skill finns i `skills/leonardo-colors/` ([MCP README](https://github.com/adobe/leonardo/blob/main/packages/mcp/README.md)). Beroenden: `apca-w3` och `chroma-js` ([package.json](https://github.com/adobe/leonardo/blob/main/packages/contrast-colors/package.json)). README:ns lista över utdataformat saknar OKLCH, men koden har `OKLCH` som färgrymd ([utils.js](https://github.com/adobe/leonardo/blob/main/packages/contrast-colors/lib/utils.js)) och ett test som heter "should generate 8 colors in OKLCh" ([test](https://github.com/adobe/leonardo/blob/main/packages/contrast-colors/test/createScale.test.js)), så README:n är inaktuell | WCAG 2-kvoter (APCA som tillval) |
| **Radix Colors** | 1 696 · MIT · 2025-12-17 ([repo](https://github.com/radix-ui/colors)) | Skalan har tolv steg med fasta roller: 1 appbakgrund, 2 subtil bakgrund, 3–5 komponentbakgrund (normal, hover, aktiv), 6–8 kanter och fokusringar, 9–10 solida bakgrunder, 11 lågkontrasttext och 12 högkontrasttext. Steg 11 och 12 är "guaranteed to Lc 60 and Lc 90 APCA contrast ratio on top of a step 2 background" ([scale](https://www.radix-ui.com/colors/docs/palette-composition/understanding-the-scale)). Ett verktyg för egna paletter genererar steg 1–12 med alfavarianter, wide-gamut-definitioner och "the closest sRGB fallbacks" ([custom](https://www.radix-ui.com/colors/docs/overview/custom-palettes)). Regel för gråskala: "choose the gray scale which is saturated with the hue closest to your accent hue" ([composing](https://www.radix-ui.com/colors/docs/palette-composition/composing-a-palette)) | APCA (inte WCAG 2) |
| **Material Color Utilities (HCT)** | 2 283 · Apache-2.0 · 2026-08-21 ([repo](https://github.com/material-foundation/material-color-utilities)) | HCT är "A new color space (hue, chrome, tone) based on CAM16 x L*". Modulen `scheme` kan "Create static and dynamic color schemes from a single color", och `dislike` kan "Check and fix universally disliked colors" ([README](https://github.com/material-foundation/material-color-utilities)). "a difference of 40 in tone guarantees a WCAG contrast ratio ≥ 3.0; a difference of 50 in tone guarantees a contrast ratio ≥ 4.5" ([concepts](https://github.com/material-foundation/material-color-utilities/blob/main/concepts/contrast_for_accessibility.md)) | WCAG 2 via L* |
| **Color.js** | 2 312 · MIT · 2026-10-12 ([repo](https://github.com/color-js/color.js)) | "Color conversion & manipulation library by the editors of the CSS Color specifications". Kontrastalgoritmerna är `WCAG21`, `APCA`, `Lstar`, `DeltaPhi`, `Weber` och `Michelson`. För APCA spelar argumentordningen roll ([contrast](https://colorjs.io/docs/contrast)) | CSS Color 4/5 |
| culori | 1 241 · MIT · 2026-07-02 ([repo](https://github.com/Evercoder/culori)) | "A comprehensive color library for JavaScript" (oklab, lab, med mera) | – |
| oklch-picker (oklch.com) | 2 007 · GitHub "Other", LICENSE-filen är MIT · 2026-10-05 ([repo](https://github.com/evilmartians/oklch-picker), [LICENSE](https://github.com/evilmartians/oklch-picker/blob/main/LICENSE)) | "Color Picker for LCH", ett webbverktyg | OKLCH |
| Harmony (Evil Martians) | 248 · MIT · 2026-07-25 ([repo](https://github.com/evilmartians/harmony)) | "Uses OKLCH and APCA for highly consistent color shades". Har P3-varianter och "can work as drop-in replacement for the Tailwind color palette", i Tailwind v4 via `@evilmartians/harmony/tailwind.css` | OKLCH + APCA |
| apcach | 189 · MIT · 2025-02-04 ([repo](https://github.com/antiflasher/apcach)) | "JS color calculator for composing colors with consistent APCA contrast ratio". Beror på `apca-w3` och `culori` ([package.json](https://github.com/antiflasher/apcach/blob/main/package.json)) | APCA |
| Huetone | 456 · MIT · **2023-11-19 (inaktiv)** ([repo](https://github.com/ardov/huetone)) | "A tool to create accessible color systems" | – |
| tints.dev | 1 276 · "Other" · 2026-09-10 ([repo](https://github.com/SimeonGriggs/tints.dev)) | "11-color Palette Generator and API for Tailwind CSS" | Tailwinds stegskala |
| SAPC-APCA / apca-w3 | 589 · "Other" · 2026-07-25 ([repo](https://github.com/Myndex/SAPC-APCA)); 214 · "Other" · 2026-05-06 ([repo](https://github.com/Myndex/apca-w3)) | APCA:s referensalgoritm | APCA |

- Vercel ger två relevanta detaljregler: neutrala färger på färgade bakgrunder ska tonas ("tint borders/shadows/text toward the same hue"), och ":hover, :active, :focus have more contrast than rest state" — [Vercel](https://vercel.com/design/guidelines)

### Inferences
- **Färgrecept per kit, körs vid byggtid:**
  1. Konvertera kundens varumärkesfärg till OKLCH med Color.js.
  2. Kör Leonardo `Theme` med `formula: 'wcag2'` och målkvoter per roll: cirka 1,05–1,5 för ytor, 3 för kanter och UI-delar, 4,5 för text och 7 för brödtext om man siktar på AAA.
  3. Mappa resultatet till Radix 12 roller.
  4. Tona de neutrala färgerna mot accentens nyans, enligt Radix "natural pairing" och Vercels regel.
  5. Låt Terrazzos `a11y/min-contrast` spärra bygget.
  6. Kontrollera nyanstrappan snabbt med HCT-regeln (Δ40 eller Δ50).
  7. Använd varumärkets exakta färg bara där inget kontrastkrav gäller, till exempel i logotyper som WCAG undantar.
  8. Färdiga OKLCH-värden skeppas som CSS. Ingen färgmotor följer med till sajten.
- **APCA** kan fungera som en andra åsikt i interna verktyg, till exempel för stor display-typ eller ljus text på mörk bakgrund. APCA-koden ska inte skeppas. Leonardo drar in `apca-w3` som beroende vid byggtid även med `wcag2`. Det är troligen låg risk eftersom inget skeppas, men licensen bör bedömas.
- **Juridik kontra kvalitet:** de flesta av Nortropics kunder är mikroföretag, så tillgänglighetskraven gäller dem troligen inte enligt 2023:254 10 §. Därför är WCAG 2.2 AA ett kvalitetsgolv som Nortropic väljer, inte ett lagkrav. Det är också den mätbara norm som verktygen (Terrazzo, Leonardo, Color.js) stöder.

| Kandidat | Lucka | Passform | Används som | Dom |
|---|---|---|---|---|
| WCAG 2.2 AA (1.4.3 + 1.4.11) | Kontrastnorm | Mätbar och stöds av verktygen | Destillera (hård spärr) | **Ta in**: den enda stabila och normativa kontrastmetriken |
| Leonardo (lib + MCP + skill) | Kontraststyrd palett | OKLCH-interpolation, WCAG 2-kvoter, MCP passar Claude Code | Byggtid | **Ta in**: genererar färger direkt mot målkontrast. Använd `wcag2` |
| Radix 12-stegsmodellen | Skal-kontrakt | Rollerna mappas rakt på semantiska tokens | Destillera | **Ta in**: ger ett tydligt kontrakt för vilket steg som är till vad |
| Radix verktyg för egna paletter | Palett från en färg | Bara webbverktyg, ger P3 och sRGB-reserv | Byggtid (manuellt) | **Pröva**: en jämförelse mot Leonardos utdata |
| Material Color Utilities / HCT | Kontrastregel och schema | Biblioteket präglas av Material Design | Destillera regeln | **Pröva**: tonregeln Δ40/Δ50 tas in. Biblioteket i sig behövs inte |
| Color.js | Konvertering och kontrollmätning | ESM, skrivet av CSS-specens redaktörer | Byggtid | **Ta in**: en motor för konvertering, gamut och kontrast |
| culori | Samma som Color.js | Överlappar Color.js | – | **Avstå**: dubblett |
| oklch.com | Manuellt val | Webb-UI | Byggtid (manuellt) | **Pröva**: för att finjustera nyanser |
| Harmony | Färdig neutral- och semantisk palett | Drop-in i TW4, OKLCH | Destillera eller byggtid | **Pröva**: APCA-balanserad, så verifiera mot WCAG 2 |
| APCA (apca-w3/SAPC) | Perceptuell kontrast | Licensrisk, ingen normstatus | Rådgivande | **Bevaka**: ta upp igen om WCAG 3 väljer en algoritm |
| apcach | APCA-komponering | APCA-only, licenskedja | – | **Avstå** |
| Huetone | Palettverktyg | Inaktiv sedan 2023 | – | **Avstå** |
| tints.dev | Tailwind-stegskala | Inte styrd mot kontrast, licens "Other" | – | **Avstå** |

### Gaps
- Materials artikel "The science of color & design" renderas med JavaScript och kunde inte läsas.
- Jag hittade ingen oberoende jämförelse av Leonardo, Radix och HCT för små varumärkespaletter. Ett A/B-prov på tre riktiga kundfärger behövs.
- APCA:s nivåtabeller (Bronze/Silver, Lc-mål per textstorlek) samlades inte in.
- Licensfrågan kring att `apca-w3` är ett transitivt beroende i Leonardo är inte bedömd juridiskt.

## 3. Vilka typografiverktyg hjälper (Utopia, Capsize, Fontsource, subsetting, variabla typsnitt), och vilka öppna typsnitt med bra svenskt stöd och tillåtande licens rekommenderas?

### Takeaway
Astro 6:s inbyggda **Fonts API** tillsammans med **Fontsource** löser självhostningen. API:t var experimentellt från 5.7 och är inbyggt i Astro 6, släppt 10 mars 2026. Filerna laddas ned vid bygget och serveras från sajten, och metrikbaserade reservtypsnitt genereras. Fontsource-subsetet "latin" täcker åäö samt ” – …. **Utopia**-metoden ger flytande typografi när Barvians regel följs: maxvärdet får vara högst 2,5 gånger minvärdet. **Capsize** står för typsnittsmetriken. Undvik glyphhanger, som är arkiverat, och fluid-tailwind, som saknar stöd för Tailwind v4.

### Cited Findings
**Självhostning och reservtypsnitt**
- Astros Fonts API "focuses on performance and privacy by downloading and caching fonts so they're served from your site". Vid bygget kopieras filerna till `_astro/fonts`. API:t har inbyggt stöd för "Adobe, Bunny, Fontshare, Fontsource, Google, Google Icons and NPM" och för lokala filer. Det "automatically tries to generate optimized fallback fonts" från den sista generiska reserven, och det går att stänga av med `optimizedFallbacks: false`. Subsets anges som `subsets: ["latin", "latin-ext"]`. `preload` sätts på `<Font />`, och dokumentationen varnar för att använda det för mycket — [Astro docs](https://docs.astro.build/en/guides/fonts/)
- Det experimentella API:t är "Added in: astro@5.7.0" — [Astro v5 docs](https://v5.docs.astro.build/en/reference/experimental-flags/fonts/). Astro 6.0 släpptes 10 mars 2026: "Astro 6 adds a built-in Fonts API" som "downloads the font files, generates optimized fallback fonts, and adds the right preload hints". Cloudflare-adaptern kör nu `workerd` "at every stage: development, prerendering, and production" — [Astro 6](https://astro.build/blog/astro-6/)
- Astro har 63 205 stjärnor, GitHub-licens "Other" och senaste push 2026-10-13 — [GitHub](https://github.com/withastro/astro)
- Fontsource har 6 193 stjärnor, licens MIT och senaste push 2026-10-12. Beskrivningen är "Self-host Open Source fonts in neatly bundled NPM packages" ([repo](https://github.com/fontsource/fontsource)). Dokumentationen säger att "Fonts remain version locked" och att "Google does track the usage of their fonts" ([intro](https://fontsource.org/docs/getting-started/introduction)). Variabla typsnitt finns som `@fontsource-variable/...` med standardaxlarna `wght, wdth, slnt, opsz, ital`, och "The CSS also uses `unicode-range`, so browsers fetch only the character sets used on the page" ([variable](https://fontsource.org/docs/getting-started/variable)). Paketens CSS har `font-display: swap` ([Inter latin-400.css](https://cdn.jsdelivr.net/npm/@fontsource/inter@5/latin-400.css))
- Inters latin-subset har bland annat `unicode-range` `U+0000-00FF` och `U+2000-206F`. Latin-ext har bland annat `U+0100-02BA` — [Fontsource Inter CSS](https://cdn.jsdelivr.net/npm/@fontsource/inter@5/index.css)
- å, ä, ö, Å, Ä och Ö är U+00E5, U+00E4, U+00F6, U+00C5, U+00C4 och U+00D6 i blocket Latin-1 Supplement (U+0080–U+00FF) — [Wikipedia](https://en.wikipedia.org/wiki/Latin-1_Supplement)
- Nordsamiska har tilläggsbokstäverna Á, Č, Đ, Ŋ, Š, Ŧ och Ž. Lulesamiska har Á, Ŋ, Æ/Ä och Å. Sydsamiska har Ï, Æ, Ö och Å — [SNL](https://snl.no/samiske_alfabet)
- Capsize har 1 732 stjärnor, licens MIT och senaste push 2026-09-15. Med det "text can now be sized according to the height of its capital letters while trimming the space above capital letters and below the baseline". `createFontStack` skapar metrikbaserade `@font-face` med `ascent-override`, `descent-override` och `size-adjust`, vilket "can dramatically improve the Cumulative Layout Shift". `@capsizecss/metrics` innehåller metrik för Google- och systemtypsnitt, och `@capsizecss/unpack` läser egna filer. Med flaggan `subset` skalas reserven efter teckenfrekvens — [Capsize](https://github.com/seek-oss/capsize)
- fontaine har 2 001 stjärnor, licens MIT och senaste push 2026-10-13. Beskrivningen är "Automatic font fallback based on font metrics". Det är en Vite-plugin som fungerar via Astros `vite.plugins` och använder metrik från Capsize — [fontaine](https://github.com/unjs/fontaine)
- CSS-egenskaperna `text-box-trim`, `text-box-edge` och kortformen `text-box` blev "Baseline Newly available" i augusti 2026, med Firefox 154 — [web.dev](https://web.dev/blog/web-platform-08-2026)

**Subsetting, språkstöd och licens**

| Kandidat | Stjärnor · licens · senaste push | Vad den gör |
|---|---|---|
| glyphhanger | 1 123 · MIT · 2021-07-01 · **arkiverad** ([repo](https://github.com/filamentgroup/glyphhanger)) | "It can subset web fonts. It can find unicode-ranges for you automatically" |
| subfont | 1 636 · MIT · 2026-09-20 ([repo](https://github.com/Munter/subfont)) | "Aggressive subsetting based on your font use, self-hosting of Google fonts and preloading" |
| subset-font | 155 · BSD-3-Clause · 2026-09-20 ([repo](https://github.com/papandreou/subset-font)) | Subsetting "using the wasm build of harfbuzz/hb-subset" |
| fonttools (pyftsubset) | 5 292 · MIT · 2026-10-13 ([repo](https://github.com/fonttools/fonttools)) | "A library to manipulate font files from Python" |
| fontbakery | 705 · Apache-2.0 · 2025-11-04 ([repo](https://github.com/fonttools/fontbakery)) | "A font quality assurance tool for everyone" |
| Hyperglot | 207 · Apache-2.0 · 2026-09-03 ([repo](https://github.com/rosettatype/hyperglot)) | "a database and tools for detecting language support in fonts" |
| Shaperglot | 56 · Apache-2.0 · 2026-09-09 ([repo](https://github.com/googlefonts/shaperglot)) | "Test font files for language support" |

- Ur OFL-FAQ:
  - Ett formatbyte räknas som modifiering, men en WOFF-komprimering där inget annat ändras får behålla namnet (2.2, 2.2.1).
  - "Removing any parts of the font when delivering a webfont to a browser" är modifiering, vilket "would not normally allow the use of RFNs" (2.6). Undantaget är optimering som bevarar "Functional Equivalence" (2.7).
  - Typsnitt får ligga på samma server som sajten, och det är "explicitly allowed by the licensing model because it is distribution" (2.1).
  — [OFL-FAQ](https://openfontlicense.org/ofl-faq/)

**Flytande typografi**
- Utopia är skapat av James Gilyead och Trys Mudford med stöd av Clearleft och är "not a product, a plugin, or a framework". Principen är: "Tell the browser to interpolate between the two scales, based on the current viewport width" — [utopia.fyi](https://utopia.fyi/). Kalkylatorn ger `--step--2` till `--step-5` som `clamp()`-uttryck, till exempel `--step-0: clamp(1.125rem, 1.0739rem + 0.2273vw, 1.25rem);`, med indata 360 px/18 px/1.2 och 1240 px/20 px/1.25 — [Utopia type calculator](https://utopia.fyi/type/calculator/)
- utopia-core ("Utopia.fyi fluid calculations", JS/TS) har 139 stjärnor och senaste push 2024-09-19. GitHub visar ingen licens, men `package.json` anger ISC och version 1.6.0 ([repo](https://github.com/trys/utopia-core), [package.json](https://github.com/trys/utopia-core/blob/main/package.json)). utopia-core-scss har 101 stjärnor, ingen licens angiven och senaste push 2025-12-19 ([repo](https://github.com/trys/utopia-core-scss)). postcss-utopia har 26 stjärnor, licens MIT och senaste push 2024-05-30 ([repo](https://github.com/trys/postcss-utopia))
- Maxwell Barvian (Smashing, 7 november 2023) visar att typ baserad på vw inte skalas vid zoomning, vilket riskerar att bryta WCAG 1.4.4. Hans regel är: "The maximum value must be less than or equal to 2.5 times the minimum value." — [Smashing Magazine](https://www.smashingmagazine.com/2023/11/addressing-accessibility-concerns-fluid-type/)
- fluid-tailwind har 1 780 stjärnor, licens MIT och senaste push 2025-03-17. Issue #66, "Tailwind v4 Compatibility?", är öppen sedan 2024-12-18, har 57 kommentarer och uppdaterades senast 2026-06-01 ([issue](https://github.com/barvian/fluid-tailwind/issues/66)). tailwind-utopia har 114 stjärnor, licens MIT och senaste push 2024-01-27 ([repo](https://github.com/cwsdigital/tailwind-utopia)). tailwindcss-fluid-type har 368 stjärnor, licens MIT och senaste push 2024-11-29 ([repo](https://github.com/davidhellmann/tailwindcss-fluid-type)). fluidity-tailwind har 0 stjärnor och skapades 2026-09-06 ([repo](https://github.com/dnunez24/fluidity-tailwind))

**Öppna typsnitt (verifierat)**

| Typsnitt | Repo: stjärnor · licens · senaste push | Fontsource-metadata |
|---|---|---|
| Inter | 19 968 · OFL-1.1 · 2024-11-19 ([repo](https://github.com/rsms/inter)) | Variabelt, vikter 100–900, kursiv. Subsets: cyrillic, greek, latin, latin-ext, vietnamese med flera ([API](https://api.fontsource.org/v1/fonts/inter)) |
| IBM Plex | 11 691 · OFL-1.1 · 2026-10-13 ([repo](https://github.com/IBM/plex)) | Ej kontrollerat |
| Source Serif | 2 396 · OFL-1.1 · 2026-10-06 ([repo](https://github.com/adobe-fonts/source-serif)) | Repot har topic "variable-fonts". Fontsource ej kontrollerat |
| Fraunces | 768 · OFL-1.1 · 2026-02-11 ([repo](https://github.com/undercasetype/Fraunces)) | Serif, variabelt, vikter 100–900, kursiv. Subsets: latin, latin-ext, vietnamese ([API](https://api.fontsource.org/v1/fonts/fraunces)) |
| Familjen Grotesk (Familjen STHLM) | 99 · OFL-1.1 · 2023-06-17 ([repo](https://github.com/Familjen-Sthlm/Familjen-Grotesk)) | Variabelt, vikter 400–700, kursiv. Subsets: latin, latin-ext, vietnamese ([API](https://api.fontsource.org/v1/fonts/familjen-grotesk)) |
| Atkinson Hyperlegible Next | Googlefonts-repot för första versionen är arkiverat ([repo](https://github.com/googlefonts/atkinson-hyperlegible)) | OFL-1.1, variabelt, vikter 200–800, kursiv. Subsets: latin, latin-ext ([API](https://api.fontsource.org/v1/fonts/atkinson-hyperlegible-next)) |
| Fontshare (ITF) | – | Typsnitten är "100% free for personal and commercial use" men "still controlled by an ITF EULA". **Flagga: egen EULA, inte OFL** ([ITF](https://www.indiantypefoundry.com/news/introducing-fontshare)) |

### Inferences
- **Typsnittsflöde:**
  1. Vid byggtid väljer kitet typsnitt ur en kuraterad OFL-lista.
  2. `astro.config` använder `fontProviders.fontsource()` och `subsets: ["latin"]` som standard. Svenska åäö samt ”, – och … ligger i `U+0000-00FF` och `U+2000-206F`.
  3. `latin-ext` läggs till när samiska namn eller ortnamn kan förekomma, vilket är troligt i Norrbotten, eftersom Č, Đ, Ŋ, Š, Ŧ och Ž ligger i `U+0100–017F`.
  4. Använd en variabel fil per stil och förladda bara brödtextens fil.
  5. Inga tredjepartsanrop görs när sidan laddas.
- **Undvik subsetting efter vilka glyfer som används** (glyphhanger, subfont). Kunderna redigerar innehåll efter lansering, och nya tecken kan då saknas. Fontsources färdiga subsets per unicode-range är säkrare och ändrar inte originalfilen, vilket också minskar risken med RFN (OFL 2.6). fonttools och subset-font behövs bara för egna typsnitt som inte finns hos Fontsource.
- **Kvalitetskontroll när ett typsnitt tas in i ett kit:** kör Hyperglot mot svenska och nordsamiska. Gör det en gång per typsnitt, inte per sajt.
- **Flytande skala per kit:**
  1. Räkna fram `--step-n` med utopia-core, eller med samma formel i en egen Terrazzo-plugin. Indata: minsta och största viewport, basstorlek och skalförhållande per kit.
  2. Kontrollera att max/min ≤ 2,5 för varje steg (Barvian).
  3. Mappa stegen till Tailwinds `--text-*` så att `text-step-2` och liknande blir utilities.
  4. Skeppa bara `clamp()`-uttrycken.
- **Vertikal rytm:** använd Capsize-metrik eller `@capsizecss/unpack` vid byggtid för radhöjd och cap-height. Använd `text-box-trim` som progressiv förbättring (Baseline sedan augusti 2026). Astros egen fallback-generering gör fontaine överflödigt för typsnitt som går via Fonts API.

| Kandidat | Lucka | Passform | Används som | Dom |
|---|---|---|---|---|
| Astro Fonts API (Astro 6) | Självhostning | Inbyggt, laddar ned vid bygget, reservtypsnitt och preload | Byggtid → skeppar filer | **Ta in**: löser självhostning, CLS och preload på ett ställe |
| Fontsource | Typsnittskälla | Versionslåst, unicode-range, variabla paket | Byggtid | **Ta in**: färdiga och korrekta subsets för svenska |
| Utopia (metod) + utopia-core | Flytande typ och mellanrum | Ger CSS-variabler som kan mappas till TW4 `--text-*` | Destillera och byggtid | **Ta in**: etablerad metod. Kombinera med regeln om högst 2,5× |
| Barvians 2,5×-regel | Tillgänglig flytande typ | Kan kontrolleras automatiskt | Destillera | **Ta in**: en enkel lintregel |
| Capsize | Metrik och reservtypsnitt | `metrics`/`unpack`, `createFontStack` | Byggtid | **Ta in**: metrik för rytm och reservtypsnitt för egna lokala typsnitt |
| fontaine | Reservtypsnitt | Överlappar Astros fallback | Byggtid | **Bevaka**: bara om Fonts API inte används |
| `text-box-trim` | Trim av text | Baseline sedan augusti 2026 | Skeppas (CSS) | **Pröva**: progressiv förbättring för knappar och rubriker |
| Hyperglot | Språkstöd | CLI i Python | Byggtid (QA) | **Pröva**: verifierar svenska och samiska per typsnitt |
| fonttools / subset-font | Egna typsnitt | Python eller wasm | Byggtid | **Pröva** (fonttools), **Bevaka** (subset-font) |
| subfont | Aggressiv subsetting | Riskabelt när kunden redigerar innehåll | – | **Avstå** |
| glyphhanger | Subsetting | Arkiverat 2021 | – | **Avstå** |
| fluid-tailwind / tailwind-utopia / tailwindcss-fluid-type / fluidity-tailwind | Flytande TW | Saknar stöd för TW4, är inaktiva eller saknar användare | – | **Avstå** |
| fontbakery / Shaperglot | QA för typsnitt | Gjorda för typsnittsproducenter | – | **Avstå** / **Bevaka** |
| Inter, Source Serif, Fraunces, Familjen Grotesk, Atkinson Hyperlegible Next, IBM Plex | Typsnittslista | OFL, latin-ext och variabla (utom Plex och Source Serif där det inte kontrollerades) | Destillera (lista per kit) | **Ta in** som kuraterad lista. Familjen Grotesk ger en svensk berättelse, och Atkinson passar kunder inom vård och omsorg (slutsats) |
| Fontshare | Typsnittskälla | EULA, villkoren för självhostning är inte verifierade | – | **Avstå** |

### Gaps
- Det är inte bekräftat ordagrant att Fonts API är "stable" i Astro 6, bara att det är "built-in". Det är inte heller dokumenterat om Astros fallback-generering bygger på Capsize eller fontaine.
- Jag har inte kontrollerat om varje typsnitt har Reserved Font Names, och inte heller Fontsource-subsets för IBM Plex och Source Serif.
- Utopias space-kalkylator (space pairs) lästes inte i detalj.
- Inga filstorlekar mättes, varken för variabla och statiska filer eller per subset.
- ITF:s EULA för Fontshare lästes inte, så villkoren för självhostning och omdistribution är okända.

## 4. Vilka ikonbibliotek passar en statisk Astro-sajt (Lucide, Tabler, Phosphor, Iconify/astro-icon) med avseende på licens, storlek och stilkonsekvens?

### Takeaway
**Lucide via `@lucide/astro`** bör vara standard. Det har licens ISC, omkring 1 900 ikoner, 24-rutnät med 2 px streck och renderas som inline-SVG utan JavaScript. **astro-icon med `@iconify-json/*`** fungerar som leveranslager när ett kit behöver en annan familj, till exempel Tabler eller Phosphor. Det kräver en licens-allowlist, eftersom Iconify blandar MIT-, ISC- och Apache-set med GPL- och CC BY-set. Varje kit ska ha en ikonfamilj, aldrig flera blandade.

### Cited Findings

| Kandidat | Stjärnor · licens · senaste push | Vad den gör (verifierat) |
|---|---|---|
| **Lucide** + `@lucide/astro` | 24 982 · GitHub "Other". LICENSE-filen anger ISC, plus MIT för ikoner härledda från Feather · 2026-10-13 ([repo](https://github.com/lucide-icons/lucide), [LICENSE](https://github.com/lucide-icons/lucide/blob/main/LICENSE)) | Sajten visar "Search 1882 icons" och v1.56.0. Demot visar "Stroke width" 2px och "Size" 24px ([lucide.dev](https://lucide.dev/)). I v1 togs alla varumärkesikoner bort med hänvisning till Simple Icons, "`aria-hidden` is now set by default on icons" och UMD-bygget togs bort ([v1-guide](https://lucide.dev/guide/version-1)). I Astro gäller: "Each icon can be imported as an Astro component, which renders an inline SVG element", och biblioteket är "completely tree-shakable" ([Astro-guide](https://lucide.dev/guide/astro/getting-started)). Senaste version av `@lucide/astro` på npm är 1.24.0 ([jsDelivr](https://data.jsdelivr.com/v1/packages/npm/@lucide/astro)) |
| **Tabler Icons** | 22 274 · MIT · 2026-10-10 ([repo](https://github.com/tabler/tabler-icons)) | 6 238 ikoner, varav 5 184 outline och 1 054 filled. "Each icon is designed on a 24x24 grid with a 2px stroke". Streckbredden kan ändras via CSS. Det finns färdiga paket `@tabler/icons-astro` och `@tabler/icons-sprite` |
| **Phosphor** | homepage-repot: 7 636 · MIT · 2026-08-26 ([repo](https://github.com/phosphor-icons/homepage)); core: 389 · MIT · 2026-01-06 ([repo](https://github.com/phosphor-icons/core)) | "1,248 icons and counting", "6 weights: Thin, Light, Regular, Bold, Fill, and Duotone" och "Designed at 16 x 16px". README:ns exempel för vanilla-webb laddar ikonfontens CSS från jsDelivr-CDN. Communitypaketet `SeanMcP/phosphor-astro` finns ([README](https://github.com/phosphor-icons/homepage)) |
| Heroicons | 23 865 · MIT · 2026-05-12 ([repo](https://github.com/tailwindlabs/heroicons)) | "A set of free MIT-licensed high-quality SVG icons for UI development" |
| **Iconify** (ramverk och ikonset) | iconify: 6 361 · MIT · 2026-10-13 ([repo](https://github.com/iconify/iconify)); icon-sets: 1 061 · ingen licens i metadata · 2026-10-13 ([repo](https://github.com/iconify/icon-sets)) | "over 200 icon sets and ~300k icons". "License is per icon set, not per icon" ([docs](https://iconify.design/docs/icons/icon-set-basics.html)). **GPL-set:** `gridicons` (GPL-2.0-only) och `wordpress` (GPL-2.0-or-later). **CC BY 4.0-set med krav på attribution:** bland annat `solar`, hela `streamline`-familjen, `fa7-solid`/`fa7-regular`, `iconamoon`, `basil`, `ci`, `cil`, `nrk` och `pepicons-*`. `lucide` är ISC. `tabler`, `ph`, `heroicons`, `iconoir` och `bi` är MIT. `mdi`, `material-symbols`, `ri`, `mingcute` och `uil` är Apache-2.0 ([collections.json](https://raw.githubusercontent.com/iconify/icon-sets/master/collections.json); filen lästes bara delvis) |
| `@iconify/tailwind4` | – | `@plugin "@iconify/tailwind4";`. Ikonen renderas som CSS-mask ("so icon uses same color as text") eller som bakgrund. Ikonseten installeras lokalt ([docs](https://iconify.design/docs/usage/css/tailwind/tailwind4/)) |
| **astro-icon** | 1 445 · GitHub "Other", LICENSE-filen är MIT · 2026-08-25 ([repo](https://github.com/natemoo-re/astro-icon), [LICENSE](https://github.com/natemoo-re/astro-icon/blob/main/LICENSE)) | "Automatically embed custom svg icons", "Support for all @iconify-json/* packages", "Deduplicated sprites with zero overhead" och "Fully dynamic icon references without imports" ([astroicon.dev](https://www.astroicon.dev/)) |
| unplugin-icons | 4 951 · MIT · 2026-09-11 ([repo](https://github.com/unplugin/unplugin-icons)) | "Access thousands of icons as components on-demand universally" |
| Simple Icons | 26 005 · CC0-1.0 · 2026-10-13 ([repo](https://github.com/simple-icons/simple-icons)) | "SVG icons for popular brands" |

- Vercels regler för ikoner: ikonknappar utan text ska "Provide a descriptive `aria-label`". Om den synliga ytan är mindre än 24 px ska träffytan utökas till minst 24 px. Ikoner och text som paras ihop ska justeras i "weight, size, spacing, or color so they don't clash" — [Vercel](https://vercel.com/design/guidelines)

### Inferences
- **Ikonsystemet:**
  1. Varje kit har en `icon.family`-token (lucide, tabler eller ph) och en `icon.stroke`-token (1,5 eller 2). Lucide och Tabler delar 24-rutnät och 2 px streck, så de kan byta plats utan att layouten ändras.
  2. Storleken knyts till typskalan som `1em`, eller ett `--step-n`-värde för större ikoner.
  3. Phosphors vikter (Light, Regular, Duotone) kan ge "varm" eller "lekfull" personlighet utan att man byter familj.
  4. Allt levereras som inline-SVG eller sprite vid byggtid via astro-icon, eller via `@lucide/astro` för Lucide.
  5. Ingen ikonfont och ingen CDN används. Phosphors standardexempel bryter mot självhostningsprincipen.
- **Licens-allowlist för `@iconify-json`:** tillåt `lucide`, `tabler`, `ph`, `heroicons`, `iconoir` och `simple-icons`. Blockera GPL- och CC BY-set i en CI-kontroll av `package.json`.
- **Varumärkeslogotyper** för sociala länkar i sidfoten hämtas ur Simple Icons, eftersom Lucide v1 saknar dem. Varumärkesägarnas egna regler gäller oberoende av att Simple Icons är CC0 (slutsats, inte verifierat).

| Kandidat | Lucka | Passform | Används som | Dom |
|---|---|---|---|---|
| Lucide + `@lucide/astro` | Ikonsystem (standard) | Inline-SVG, inget JS, ISC, aria-hidden som standard | Byggtid → SVG | **Ta in**: störst aktivt community och konsekvent rutnät |
| astro-icon | Leveranslager | Lokala SVG och alla Iconify-set, dedupliceringssprite | Byggtid → SVG | **Ta in**: ett API för alla kitets familjer och egna SVG |
| Iconify-set (`@iconify-json/*`) | Ikonkällor | Licens per set | Byggtid | **Ta in med allowlist**: blockera GPL och CC BY |
| Tabler Icons | Alternativ familj | Samma rutnät som Lucide, 6 238 ikoner, MIT | Byggtid → SVG | **Pröva**: till ett "robust" eller "traditionellt" kit |
| Phosphor | Alternativ familj | Sex vikter, MIT. Ikonfont och CDN i standardexemplet | Byggtid → SVG via Iconify | **Pröva**: till "varma" och "lekfulla" kit |
| `@iconify/tailwind4` | Dekorativa ikoner | CSS-mask, ingen inline-SVG | Skeppas (CSS) | **Pröva**: bara för rent dekorativa ikoner |
| Simple Icons | Varumärkeslogotyper | CC0 | Byggtid → SVG | **Pröva** |
| Heroicons | Ikonfamilj | Mindre set som överlappar Lucide | – | **Avstå** |
| unplugin-icons | Leveranslager | Överlappar astro-icon | – | **Avstå** |

### Gaps
- Inga byte-storlekar per ikon eller sprite mättes.
- `SeanMcP/phosphor-astro` verifierades inte (stjärnor och aktivitet).
- Versionsnumren skiljer sig mellan lucide.dev (v1.56.0) och `@lucide/astro` (1.24.0). Paketen versioneras troligen separat, men det är inte verifierat.
- Iconifys `collections.json` lästes bara delvis, eftersom filen klipptes. Fler GPL- och CC BY-set kan finnas.

## 5. Finns det öppna samlingar av token-teman eller stilförinställningar som kan bli startpunkt för 3–5 kuraterade stilkit, och vilka visuella egenskaper höjer enligt evidensen upplevd kvalitet och förtroende?

### Takeaway
Ingen öppen temasamling kan användas rakt av som Nortropic-kit. Tre källor ger däremot användbara mönster:
- **GoDaddy Go**: fem "design styles" som inställningsfiler. **GPL-2.0, så studera men kopiera inte.**
- **Flowbite v4**: fem Tailwind 4-teman under MIT-licens: default, minimal, enterprise, playful och mono.
- **daisyUI 5**: ett kompakt temaschema med radie per elementklass, depth och noise.

Evidensen pekar åt samma håll. Utseendet dominerar trovärdighetsbedömningar och förekom i 46,1 % av kommentarerna i en studie. Förstaintrycket bildas på 17–50 ms och gynnar enkla sidor som liknar det man väntar sig. Estetik förlåter bara små brister.

### Cited Findings
**Temasamlingar och förinställningar**

| Kandidat | Stjärnor · licens · senaste push | Vad den innehåller (verifierat) |
|---|---|---|
| **GoDaddy Go** | 338 · **GPL-2.0** · 2026-02-06 ([repo](https://github.com/godaddy-wordpress/go)) | Under `.dev/assets/design-styles/` finns fem mappar: modern, playful, traditional, trendy och welcoming. Var och en har en `settings.scss` med CSS-variabler. **traditional:** `--go--type-ratio: 1.275`, rubriker i "Crimson Text" 400, brödtext i "Nunito Sans", knappradie 4px ([fil](https://github.com/godaddy-wordpress/go/blob/master/.dev/assets/design-styles/traditional/settings.scss)). **modern:** skalförhållande 1.3, rubriker i "Heebo" 800, brödtext i "Fira Code", knappradie 0, versala knappar med 3px spärrning ([fil](https://github.com/godaddy-wordpress/go/blob/master/.dev/assets/design-styles/modern/settings.scss)). **playful:** skalförhållande 1.215, "Poppins" 600 med "Quicksand", knappradie 5px ([fil](https://github.com/godaddy-wordpress/go/blob/master/.dev/assets/design-styles/playful/settings.scss)) |
| **Flowbite v4-teman** | 9 366 · MIT (koden), dokumentationen CC BY 3.0 · 2026-06-27 ([repo](https://github.com/themesberg/flowbite)) | Fem teman, default, minimal, enterprise, playful och mono, importeras med till exempel `@import "flowbite/src/themes/minimal";`. Varje tema importerar sitt typsnitt från Google Fonts ([theming](https://flowbite.com/docs/customize/theming/)). `playful.css` är ett `@theme` med `--font-sans: 'Shantell Sans'`, radier (`--radius-sm: 10px`, `--radius-base: 20px`), semantiska färger (`--color-brand`, `--color-fg-brand`, `--color-neutral-*`) som pekar på Tailwinds palett, och överskrivningar i `.dark` ([fil](https://github.com/themesberg/flowbite/blob/main/src/themes/playful.css)) |
| **daisyUI 5** | 42 582 · MIT · 2026-10-13 ([repo](https://github.com/saadeghi/daisyui)) | 35 inbyggda teman. Ett tema består av 20 färgvariabler (base-100/200/300/content, primary/-content och så vidare till error/-content) samt `--radius-selector`, `--radius-field`, `--radius-box`, `--size-selector`, `--size-field`, `--border`, `--depth` och `--noise`. Egna teman skrivs med `@plugin "daisyui/theme" {…}` i TW4-CSS ([themes](https://daisyui.com/docs/themes/)) |
| **shadcn/ui-teman** | 125 505 · MIT · 2026-10-12 ([repo](https://github.com/shadcn-ui/ui)) | Tokens i `:root` och `.dark`: `--background/--foreground`, `--primary/--primary-foreground`, `--muted`, `--accent`, `--destructive`, `--border`, `--input`, `--ring`, `--chart-1..5` och `--radius`. Exemplen använder oklch. Basfärgerna är "Neutral, Stone, Zinc, Mauve, Olive, Mist, and Taupe". Tokens mappas via `@theme inline` (`--color-primary: var(--primary);`) ([theming](https://ui.shadcn.com/docs/theming)) |
| tweakcn | 10 444 · Apache-2.0 · 2026-09-03 ([repo](https://github.com/jnsahaj/tweakcn)) | "A visual no-code theme editor for shadcn/ui components", med topic tailwindcss-v4 |
| Radix Themes | 8 764 · MIT · 2026-04-11 ([repo](https://github.com/radix-ui/themes)) | Ett React-komponentbibliotek. `<Theme accentColor grayColor panelBackground scaling radius>` ([docs](https://www.radix-ui.com/themes/docs/theme/overview)) |
| Open Props | 5 540 · MIT · 2026-10-11 ([repo](https://github.com/argyleink/open-props)) | CSS custom properties för färger ("16 supercharged `oklch` variables"), gradienter, skuggor, typografi, easing, animationer, storlekar, radier, z-index och media queries. Teman light, dark, dim och purple. Med `postcss-jit-props` gäller "Only ship the props you use" ([open-props.style](https://open-props.style/)) |

**Evidens om kvalitet och förtroende**
- Stanfords riktlinjer (B.J. Fogg, maj 2002) bygger på "three years of research that included over 4,500 people". Bland de tio riktlinjerna finns: "Design your site so it looks professional (or is appropriate for your purpose)", "Show that there's a real organization behind your site", "Make it easy to contact you" och "Avoid errors of all types, no matter how small they seem" — [Stanford Web Credibility](https://credibility.stanford.edu/guidelines/index.html)
- Consumer WebWatch-studien från oktober 2002 hade 2 684 deltagare. "Design look" förekom i 46,1 % av kommentarerna, den vanligaste kategorin, före informationsstruktur och informationsfokus — [Consumer Reports](https://advocacy.consumerreports.org/research/how-do-people-evaluate-a-web-sites-credibility). Sidan namnger inte studiens författare.
- Kate Moran (NN/g, 3 februari 2024) definierar the aesthetic-usability effect som "users' tendency to perceive attractive products as more usable". Ursprunget är Kurosu och Kashimura 1995, med 252 deltagare och 26 bankomatvarianter. "A pretty design can make users forgiving of minor usability problems, but not of large ones." — [NN/g](https://www.nngroup.com/articles/aesthetic-usability-effect/)
- Aurora Harley (NN/g, 8 maj 2016) beskriver fyra trovärdighetsfaktorer:
  - Designkvalitet: "The first step to garnering trust is to make your site appear legitimate and professional". Det inkluderar stavfel och småfel.
  - Öppen redovisning av priser och kontaktuppgifter.
  - Heltäckande, korrekt och aktuellt innehåll.
  - Koppling till resten av webben, som recensioner och sociala medier.

  — [NN/g](https://www.nngroup.com/articles/trustworthy-design/)
- Tuch m.fl. 2012, refererat i Googles blogg: användare fäller ett estetiskt omdöme på omkring 17–50 ms. Hög visuell komplexitet sänker upplevd skönhet "even if the design is familiar", och okonventionell design sänker också intrycket. Rådet är: "Go for simple and familiar if you want to appeal to your users' sense of beauty." — [Google Research blog](https://research.google/blog/users-love-simple-and-familiar-designs-why-websites-need-to-make-a-great-first-impression/)
- Reinecke och Gajos (CHI '14) samlade omkring 2,4 miljoner betyg från nästan 40 000 deltagare. Hur mycket färg och komplexitet som uppskattas varierar mellan grupper: "Females, for example, liked colorful websites more than males" och "A high education level generally lowers this preference for colorfulness" — [Harvard](https://eecs.harvard.edu/~kgajos/papers/2014/reinecke14visual.shtml)
- Jakob Nielsen (NN/g, 31 oktober 2010, granskad 2026): porträtt av "real people who actually work at the company" fick 10 % mer betraktelsetid än biografierna. Stockbilder ignorerades som "pure filler", och det som fungerar är "information-carrying images" — [NN/g](https://www.nngroup.com/articles/photos-as-web-content/)

### Inferences
- **Förslag på schema för kit:** varje kit är en DTCG-modifier som sätter ett slutet antal axlar. Axlarna bygger på Go, Flowbite, daisyUI, Radix Themes och Brad Frosts Tier 2.
  1. `font.heading`, `font.body` och vikter, ur den kuraterade OFL-listan.
  2. `type.ratio` (min och max). Go använder 1,215–1,3, vilket ger en rimlig bandbredd.
  3. `type.base` och `leading`.
  4. `radius.{field,box,button}`, med daisyUI:s indelning i elementklasser.
  5. `border.width`.
  6. `depth`/`shadow`, med minst två lager.
  7. `texture`/`noise`.
  8. `button.case`/`tracking`. Gos modern-stil använder versaler och 3 px spärrning.
  9. `nav.style`.
  10. `color.neutralTint` och `color.accentStrategy`.
  11. `icon.family`/`stroke`.
  12. `image.treatment`.

  Allt annat, som komponenter och spacing-logik, är gemensamt.
- **Föreslagna 3–5 kit:**
  - **Trygg och traditionell:** serifrubriker, liten radie, lugn neutral palett.
  - **Stram och modern:** grotesk, radie 0–2 px, versala etiketter.
  - **Varm och välkomnande:** mjuk radie, varmtonade neutraler, Phosphor Regular.
  - **Lekfull** (valfri): stor radie, mer färg.

  Namnen och ungefärliga värden kommer från Gos stilar och Flowbites teman. Kundens tre riktningar blir tre av kiten på samma innehåll.
- **Evidensen omsatt i regler:**
  - Håll layouten konventionell: telefon och CTA i sidhuvudet, därefter tjänster, referenser och kontakt. Det följer av prototypikalitet.
  - Håll den visuella komplexiteten låg.
  - Lägg kraft på detaljpolish, eftersom 46,1 % av kommentarerna gällde utseende och småfel räknas.
  - Använd riktiga foton av ägare, personal och utförda jobb i stället för stockbilder.
  - Visa kontaktuppgifter och priser tydligt. Det är en innehållsfråga, men den kräver att det finns plats i designen.
  - Variera färgrikedomen efter målgrupp. Det stöds av Reinecke och Gajos, men studien gäller inte svenska småföretag.
- **Licensflagga:** Go är GPL-2.0. Använd bara mönstret (parametrar och axlar) och kopiera inga filer. Flowbites och daisyUI:s teman är MIT och kan tas som utgångsvärden, men måste tokeniseras om till DTCG, och Google Fonts-importerna måste bytas mot Fontsource.

| Kandidat | Lucka | Passform | Används som | Dom |
|---|---|---|---|---|
| GoDaddy Go design-styles | Kuraterad källa för kit | Exakt rätt mönster, men WordPress, SCSS och **GPL-2.0** | Destillera parametrar, kopiera ingen kod | **Pröva**, bara som referens: ger kit-axlarna och rimliga värden |
| Flowbite v4-teman | Startvärden för kit | Färdigt TW4 `@theme`, MIT. Google Fonts-import och Tailwinds palett | Destillera | **Pröva**: fem personligheter i rätt format |
| daisyUI 5:s temaschema | Kit-axlar | Kompakt schema med radie per elementklass, depth och noise | Destillera schemat (inte komponenterna) | **Pröva** |
| shadcn-konventionen X / X-foreground | Semantisk namngivning | Varje par blir ett kontrasttest. Fungerar med `@theme inline` | Destillera | **Ta in**: de facto-standard som AI-verktyg också känner igen |
| tweakcn | Visuell kit-redigerare | Webbverktyg, TW4, oklch | Byggtid (manuellt) | **Pröva** |
| Open Props | Primitiva värden (skuggor, easing) | Ett andra tokensystem bredvid TW4 | Destillera urval | **Pröva**: bara skugg- och easing-värden |
| Radix Themes | Komponentteman | Kräver React | – | **Avstå** |
| Stanford, NN/g, Tuch, Reinecke | Evidens | – | Destillera ("varför" i Yta-skillen) | **Ta in** |

### Gaps
- Squarespace Blueprint och GoDaddys AI-flöde verifierades inte i primärkällor.
- Jag hittade ingen studie om svenska eller nordiska småföretagssajter. Reinecke och Gajos abstract nämner inga nordiska resultat, och hela artikeln lästes inte.
- Jag utvärderade ingen licensierad bildkälla och ingen metod för bildstil, som fotoriktlinjer eller bildbehandling per kit.
- Flowbites `minimal.css`, `enterprise.css` och `mono.css` och Gos `trendy`- och `welcoming`-filer lästes inte.
- Jag verifierade inte Radix Themes tillåtna radievärden eller status för Open Props v2.

## 6. Vilka 1–3 auktoritativa best practice-källor bör Yta-skillen destilleras ur, och hur ser en mätbar checklista för premium kontra basic ut?

### Takeaway
Yta-skillen bör destilleras ur tre källor:
- **Refactoring UI** för systemtänket: begränsa valen och definiera skalor i förväg.
- **Butterick's Practical Typography** för numeriska typografiregler.
- **Vercels Web Interface Guidelines** för mätbara detaljregler.

**WCAG 2.2** och **Språkrådets** skrivregler fungerar som norm för kontrast och svensk mikrotypografi. Tillsammans ger de en checklista på ungefär 25 mätbara punkter. En basic sajt faller oftast på detaljerna: siffror, citattecken, skuggor, radier och ikonkonsekvens.

### Cited Findings
- **Refactoring UI** (Adam Wathan och Steve Schoger) är en PDF på 218 sidor. Bland kapitlen finns "Choose a personality", "Limit your choices", "Establish a spacing and sizing system", "Establish a type scale", "Define your shades up front", "Greys don't have to be grey", "Accessible doesn't have to mean ugly", "Use shadows to convey elevation", "Shadows can have two parts", "Use fewer borders" och "Use good photos". **Kommersiell produkt** — [refactoringui.com](https://www.refactoringui.com/)
- **Practical Typography** ger dessa regler: brödtext "15–25 pixels on the web", "Line spacing should be 120–145% of the point size", "The average line length should be 45–90 characters (including spaces)", "Use 5–12% extra letterspacing with all caps and small caps", "Kerning should always be turned on", "Use bold or italic as little as possible, and not together" och "Use centered text sparingly". Den säger också "Avoid goofy fonts, monospaced fonts, most free fonts, and system fonts", vilket är en åsikt som står mot att använda professionella OFL-typsnitt — [Butterick](https://practicaltypography.com/summary-of-key-rules.html)
- **Vercel Web Interface Guidelines** (repot har 971 stjärnor, licens MIT, senaste push 2026-10-05) innehåller bland annat:
  - "Use `font-variant-numeric: tabular-nums`"
  - "`…` over three periods"
  - "Prefer curly quotes"
  - "Use a non-breaking space `&nbsp;` to keep units, shortcuts & names together"
  - "Instead of `10MB` say `10 MB`"
  - "Ship only the code points/scripts you use via unicode-range"
  - ":hover, :active, :focus have more contrast than rest state"
  - "Don't rely on color alone"
  - "Set explicit image dimensions & reserve space"
  - "Preload only above-the-fold images; lazy-load the rest"
  - "Mimic ambient + direct light with at least two layers"
  - "Combine borders & shadows; semi-transparent borders improve edge clarity"
  - "Child radius ≤ parent radius & concentric so curves align"
  - "Adjust ±1px when perception beats geometry"
  - "Every element aligns with something intentionally"

  — [Vercel](https://vercel.com/design/guidelines); [repo](https://github.com/vercel-labs/web-interface-guidelines)
- **Språkrådet, Snabba skrivregler (2024)** säger:
  - Det svenska citattecknet är ”ord”, med samma form i början och slutet.
  - Tankstreck skrivs utan mellanslag mellan siffror och i intervall ("öppet 9–18") men med mellanslag när det markerar paus.
  - Mellan siffergrupper står ett mellanslag (210 000 000).
  - Decimaltal skrivs med komma.
  - Klockslag skrivs med punkt (20.30).
  - Exempel på belopp och procent: 50 %, 7,50 kr.

  — [Språkrådet (kopia hos Chalmers)](https://writing.chalmers.se/wp-content/uploads/2024/06/Snabba-skrivregler-Sprakradet-1.pdf)
- **Atomic Design** (Brad Frost, 2016) delar in gränssnitt i atoms, molecules, organisms, templates och pages. Organisms är "relatively complex UI components composed of groups of molecules and/or atoms and/or other organisms" — [Atomic Design kap. 2](https://atomicdesign.bradfrost.com/chapter-2/)

### Inferences
**Rekommenderade källor att destillera:**
1. Refactoring UI. Den stöder strategin "designern bygger systemet, AI:n väljer inom det". Den är betald, så den ska destilleras med egna ord.
2. Practical Typography, för siffrorna.
3. Vercels Web Interface Guidelines, för detaljreglerna. MIT-licensen tillåter bearbetning.

Normerande tillägg är WCAG 2.2 (1.4.3 och 1.4.11) och Språkrådet. Brad Frosts themeable-artikel ger arkitekturen (Tier 1–3).

**Konflikter som skillen måste lösa:**
- Vercels "curly quotes (“ ”)" ska bli ”…” på svenska.
- Vercels APCA-preferens underordnas WCAG 2.2 AA, se avsnitt 2.
- Butterick avråder från "free fonts". Det tolkas som att använda kuraterade, professionella OFL-typsnitt och aldrig systemtypsnitt som visningstypsnitt.

**Utkast till mätbar checklista för premium kontra basic.** Varje rad kan i huvudsak kontrolleras automatiskt med token-lint, CSS-analys eller DOM-kontroll.

| # | Kontroll | Tröskel för premium | Mätning | Källa |
|---|---|---|---|---|
| 1 | Kontrast för text | ≥ 4,5:1, och ≥ 3:1 för stor text (≥ 24 px eller ≥ 18,5 px fet) | Terrazzo `a11y/min-contrast` | [WCAG 1.4.3](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html) |
| 2 | Kontrast för UI och grafik (fokusring, inmatningsfält, informationsbärande ikoner) | ≥ 3:1 | Token-par i lint | [WCAG 1.4.11](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html) |
| 3 | Tillstånd | hover, active och focus har högre kontrast än viloläget | Token-diff | [Vercel](https://vercel.com/design/guidelines) |
| 4 | Neutraler | Tonade mot accentens nyans, ingen ren grå på färgad yta | OKLCH-kroma > 0 och nyans nära accentens | [Vercel](https://vercel.com/design/guidelines), [Radix](https://www.radix-ui.com/colors/docs/palette-composition/composing-a-palette) |
| 5 | Färgskalor | Definierade i förväg med fasta roller, inga ad hoc-hexvärden i komponenter | Leta efter literaler utanför tokens | [Refactoring UI](https://www.refactoringui.com/), [Radix](https://www.radix-ui.com/colors/docs/palette-composition/understanding-the-scale) |
| 6 | Brödtextstorlek | 15–25 px. Nortropics mål är ≥ 16 px på mobil | `a11y/min-font-size` | [Butterick](https://practicaltypography.com/summary-of-key-rules.html) |
| 7 | Radlängd | 45–90 tecken | `max-width` i `ch` på textkolumner | [Butterick](https://practicaltypography.com/summary-of-key-rules.html) |
| 8 | Radavstånd för brödtext | 1,2–1,45 | `--leading` i tokens | [Butterick](https://practicaltypography.com/summary-of-key-rules.html) |
| 9 | Spärrning av versaler | +5–12 % (0,05–0,12 em) | CSS-analys av `uppercase` | [Butterick](https://practicaltypography.com/summary-of-key-rules.html) |
| 10 | Flytande typ | max ≤ 2,5 × min per steg | Kontroll i token-bygget | [Barvian](https://www.smashingmagazine.com/2023/11/addressing-accessibility-concerns-fluid-type/) |
| 11 | Typskala | Ett skalförhållande per kit och inga storlekar utanför skalan | Leta efter literaler | [Refactoring UI](https://www.refactoringui.com/), [Go settings](https://github.com/godaddy-wordpress/go/blob/master/.dev/assets/design-styles/traditional/settings.scss) |
| 12 | Siffror i priser och tabeller | `tabular-nums` | CSS-analys | [Vercel](https://vercel.com/design/guidelines) |
| 13 | Svensk mikrotypografi | ”…”, tankstreck i intervall, 10 000, decimalkomma, 14.30, 50 %, 7,50 kr | Regex på innehållet | [Språkrådet](https://writing.chalmers.se/wp-content/uploads/2024/06/Snabba-skrivregler-Sprakradet-1.pdf) |
| 14 | Hårt mellanslag mellan tal och enhet | "10 MB", "50 %", "7,50 kr" ska inte kunna radbrytas | Regex | [Vercel](https://vercel.com/design/guidelines) |
| 15 | Ellips | Tecknet `…` i stället för tre punkter | Regex | [Vercel](https://vercel.com/design/guidelines) |
| 16 | Typsnitt | Självhostade, inga tredjepartsanrop, subsets via unicode-range, preload av brödtextens typsnitt, reservtypsnitt anpassat efter metrik | Nätverkslogg vid bygget och CLS | [Astro](https://docs.astro.build/en/guides/fonts/), [Vercel](https://vercel.com/design/guidelines), [Capsize](https://github.com/seek-oss/capsize) |
| 17 | Svenska och samiska tecken | Kitets typsnitt täcker sv och, vid behov, nordsamiska | Hyperglot | [Hyperglot](https://github.com/rosettatype/hyperglot), [SNL](https://snl.no/samiske_alfabet) |
| 18 | Mellanrum | Bara värden från spacing-skalan | Leta efter literaler (TW4 `--spacing`) | [Refactoring UI](https://www.refactoringui.com/), [Tailwind theme](https://tailwindcss.com/docs/theme) |
| 19 | Nästlade radier | Barnets radie ≤ förälderns, koncentriska | CSS-analys av komponentpar | [Vercel](https://vercel.com/design/guidelines) |
| 20 | Skuggor | Minst två lager (ambient och direkt) | Skugg-tokens | [Vercel](https://vercel.com/design/guidelines), [Refactoring UI](https://www.refactoringui.com/) |
| 21 | Kantlinjer | Få. Halvtransparenta kanter kombinerade med skugga | Granskning av tokens | [Vercel](https://vercel.com/design/guidelines), [Refactoring UI](https://www.refactoringui.com/) |
| 22 | Ikoner | En familj per sajt med samma rutnät och streck. Ikonknappar har `aria-label`. Träffytan är ≥ 24 px | DOM-kontroll | [Tabler](https://github.com/tabler/tabler-icons), [Lucide v1](https://lucide.dev/guide/version-1), [Vercel](https://vercel.com/design/guidelines) |
| 23 | Bilder | Explicita dimensioner. Bara bilder ovanför vecket förladdas, resten lazy-loadas | DOM-kontroll | [Vercel](https://vercel.com/design/guidelines) |
| 24 | Bildinnehåll | Riktiga människor och utförda jobb före stockbilder | Manuell granskning | [NN/g](https://www.nngroup.com/articles/photos-as-web-content/) |
| 25 | Felfrihet | Noll stavfel och noll trasiga länkar | Stavningskontroll och länkkontroll | [Stanford](https://credibility.stanford.edu/guidelines/index.html), [NN/g](https://www.nngroup.com/articles/trustworthy-design/) |
| 26 | Komplexitet och konvention | Konventionell disposition och få samtidiga betoningar | Manuell granskning | [Google/Tuch](https://research.google/blog/users-love-simple-and-familiar-designs-why-websites-need-to-make-a-great-first-impression/) |

- Raderna 1–2, 6, 8, 10 och 18–20 kan spärras redan i token-bygget med Terrazzo-lint och egna regler. Raderna 12–16 och 22–23 passar en kontroll efter bygget med regex och DOM. Raderna 24–26 är kvar för det mänskliga eller visuella omdömet. Nortropics befintliga taste-skills kan användas där, men som domare, inte som ytterligare regelkällor.

### Gaps
- Jag utvärderade inga automatiska kontrollverktyg (axe-core, Lighthouse, Playwright-skript, stylelint-regler) för checklistan. Det tillhör troligen lagret för kontroll och prov.
- Jag kontrollerade inte villkoren för att återanvända Butterick och Refactoring UI. Utgå från att de ska destilleras med egna ord, inte citeras längre.
- Jag hittade ingen empirisk studie som direkt kopplar enskilda detaljer, som tabulära siffror eller tvålagersskuggor, till upplevd kvalitet. Kopplingen bygger på de generella fynden om design look och estetik, och på slutsatser.
- Sökbudgeten för webbsökning tog slut mot slutet, så vissa sekundära kontroller gjordes inte. Det gäller till exempel Flowbites och daisyUI:s exakta licensvillkor för temafilerna utöver MIT-angivelsen och färska oberoende tester av Terrazzo.
