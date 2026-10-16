# Tailwind 4 och Motion i Astro med React-öar

Research 2026-10-16 på Johnnys uppdrag. Frågan: hur Nortropic bör arbeta med Tailwind CSS 4 och Motion (tidigare Framer Motion) nu när React, Tailwind och Motion är tillåtna (`BESLUT.md` 2026-10-16, *React, Tailwind och JavaScript tillåts*). Johnny bad om dokumentation, bästa praxis och öppen källkod. Det som står här är underlag och förslag. Besluten är Johnnys.

**Märkning:**
- 📄 primärkälla, alltså leverantören, standarden eller källkoden
- 🔧 eget prov eller egen mätning; metoden står vid resultatet
- ⚠️ overifierat: andrahandskälla, källor som går isär eller inte provat
- ⚖️ tolkning, inte juridisk rådgivning

**Metod:** Dokumentationen lästes med WebFetch, versionerna med `npm view` och källkoden med `gh api` och `curl` från GitHub. Alla länkar lästes 2026-10-16; publiceringsdatum anges där sidan har ett. Mätningarna gjordes i scratch, med paketen installerade utan installationsskript:
- storlekar med rolldown 1.2.14, samma bundlare som Vite i Astro 7, och med esbuild 0.28.2, minifierat och komprimerat med gzip -9 och brotli 11
- serverrenderingen med `react-dom/server` 19.3.1
- temafilen kompilerad med `@tailwindcss/cli` 4.3.3 mot en provsida.

**Andra underlag:** `.claude/skills/yta/tokens.md` har redan aliaslagret med shadcn-namn, och `.claude/skills/rorelse/verktyg.md` har valordningen CSS före Motion. Den här filen fördjupar Tailwind- och Motion-delen och skriver inte om dem.

## Sammanfattning

1. **Tailwind 4 konfigureras i CSS.** `@theme` skapar både klasser och CSS-variabler. Ett tema som pekar på andra variabler ska skrivas `@theme inline`, annars räknas värdet ut i `:root` och följer inte ett kit som byts längre ner i sidan. 📄
2. **Kitet kan styra Tailwind utan att Tailwind får egna värden.** I provet pekade en fil med `@theme inline` bara på `--k-*`:
   - `bg-primary` blev `var(--k-accent)` och `p-a4` blev `var(--k-a4)`.
   - `text-h1` fick storlek, radhöjd, spärrning och vikt ur kitet.
   - Med standardpaletten borttagen gav `bg-zinc-900`, `shadow-md` och `animate-spin` ingen CSS alls. 🔧
3. **Vår egen CSS måste ligga i kaskadlager.** CSS utan lager vinner alltid över Tailwinds klasser, oavsett specificitet. 📄 MDN
4. **Tailwinds Preflight passar inte vår grund.** Den tar bort länkarnas understrykning och listornas punkter. Förslaget tar med Tailwinds tema och klasser, men bara två regler ur Preflight. 🔧
5. **Komponenter från shadcn, 21st.dev, Aceternity och Magic UI måste kläs om innan de används.** Exempel ur källkoden:
   - shadcn:s knapp har `transition-all` och tar bort konturen. Fokus visas med en skugga på 50 % opacitet, som försvinner i forced colors och ger cirka 2:1 i kontrast i vårt kit.
   - Magic UI:s BlurFade börjar på `opacity: 0` med oskärpa.
   - Magic UI:s NumberTicker visar 0 i HTML:en och formaterar talen på amerikanska. 📄 🔧
6. **tailwind-merge känner inte våra namn.** Utan inställning ger `twMerge("text-h1 text-text")` bara `text-text`, så rubrikstorleken försvinner tyst. Med kitets namn i `extendTailwindMerge` blir det rätt. 🔧
7. **Motion för React kostar 29–43 kB gzip ovanpå React, som själv är 68 kB.** Vanilla-API:ts `inView` och `animate` mini kostar 3,6 kB tillsammans. 🔧
8. **Motion skriver `initial` i serverns HTML.** `initial={{ opacity: 0 }}` blir `style="opacity:0"`, också inom `MotionConfig reducedMotion="user"`. Utan JavaScript syns texten aldrig. Det krockar med regeln att ingen text börjar osynlig. 🔧
9. **Motions standardövergång studsar.** Utan angiven övergång animeras x och y med en fjäder som går cirka 12 % förbi målet. 🔧 ur källkoden
10. **CSS räcker för sparsam och måttlig rörelse.** `@starting-style`, `transition-behavior` och `linear()` är Baseline. Sidbyten mellan dokument och scroll-drivna animationer saknas i Firefox. 📄 web-features

## 1. Versionerna och underhållet

Startsäkringen håller paketen på senaste version (`BESLUT.md` 2026-10-15 och 2026-10-16). Alla siffror kommer från `npm view <paket> version license time`.

| Paket | Version | Släppt | Licens | Underhåll |
|---|---|---|---|---|
| `tailwindcss`, `@tailwindcss/vite` | 4.3.3 | 2026-07-16 | MIT | Tailwind Labs gick till Shopify 2026-09-09: *"Everything will always be MIT-licensed"* och *"our team will continue to lead and maintain these projects"* 📄 [bloggen](https://tailwindcss.com/blog/tailwind-is-joining-shopify) |
| `prettier-plugin-tailwindcss` | 0.8.1 | 2026-07-15 | MIT | Tailwind Labs |
| `eslint-plugin-better-tailwindcss` | 4.9.1 | 2026-10-13 | MIT | Aktivt; peer `eslint` upp till 10 och `tailwindcss` ^3.3 eller ^4.1.17 |
| `tailwind-merge` | 3.7.0 | 2026-09-12 | MIT | *"Supports Tailwind v4.0 up to v4.3"* 📄 [README](https://github.com/dcastil/tailwind-merge) |
| `clsx` | 2.1.1 | 2024-04-23 | MIT | Inga släpp sedan 2024; 0,2 kB och klar |
| `class-variance-authority` (CVA) | 0.7.1 | 2024-11-26 | Apache-2.0 | Stabil linje som shadcn använder. Efterföljaren `cva` är 1.0.0-beta.12 (2026-09-17, MIT). Repot hade commits 2026-10-16 |
| `tailwind-variants` | 3.3.1 | 2026-08-03 | MIT | Kräver `tailwind-merge` 3 eller senare |
| `tw-animate-css` | 1.4.0 | 2025-09-24 | MIT | Används av shadcn |
| `motion`, `framer-motion` | 14.3.0 | 2026-10-15 | MIT | Släpps samtidigt |
| `@terrazzo/cli`, `plugin-css`, `plugin-tailwind` | 2.9.0 | 2026-10-14 | MIT | Aktivt |
| `style-dictionary` | 5.6.1 | 2026-10-10 | Apache-2.0 | Aktivt |
| `@21st-dev/magic` | 0.2.3 | 2026-09-09 | ISC | Kompatibilitetslager för 21st MCP |
| `astro` / `@astrojs/react` / `react` | 7.4.0 / 7.1.0 / 19.3.1 | – | MIT | Astro 7.4.0 beror på `vite` ^8.3.4; `@tailwindcss/vite` tar `vite` ^5.2–^8 |

`eslint-plugin-tailwindcss` 4.4.0 (2026-08-21, MIT) är ett alternativ som inte är granskat här ⚠️.

## 2. Tailwind 4

### 2.1 Konfigurationen ligger i CSS

- **En rad startar Tailwind:** `@import "tailwindcss";` ersätter direktiven `@tailwind`. En `tailwind.config.js` hittas inte längre automatiskt och laddas bara med `@config`. Alternativen `corePlugins`, `safelist` och `separator` finns inte i v4; `@source inline()` ersätter `safelist`. 📄 [Upgrade guide](https://tailwindcss.com/docs/upgrade-guide)
- **Klasserna hittas genom att filerna läses som text.** Tailwind läser alla filer utom de i `.gitignore`, `node_modules`, binärfiler, CSS-filer och låsfiler. Andra kataloger läggs till med `@source`, och `@source not` utesluter. 📄 [Detecting classes](https://tailwindcss.com/docs/detecting-classes-in-source-files)
- **Klassnamn byggs aldrig ihop.** Rubriken i dokumentationen lyder *"Don't construct class names dynamically"*, och lösningen är *"Always map props to static class names"*. `bg-${color}-600` ger ingen CSS. 📄 samma sida
- **Ingen förprocessor.** Tailwind 4 *"is not designed to be used with CSS preprocessors like Sass, Less, or Stylus"*. 📄 [Compatibility](https://tailwindcss.com/docs/compatibility)

### 2.2 `@theme` och tokens

- **`@theme` skapar klasser.** *"Theme variables aren't just CSS variables — they also instruct Tailwind to create new utility classes"*. Varje namnrymd ger sina klasser: `--color-*`, `--font-*`, `--text-*`, `--font-weight-*`, `--tracking-*`, `--leading-*`, `--breakpoint-*`, `--container-*`, `--spacing-*`, `--radius-*`, `--shadow-*`, `--ease-*`, `--animate-*` och fler. 📄 [Theme variables](https://tailwindcss.com/docs/theme)
- **Bara de variabler som används skrivs ut.** *"By default only used CSS variables will be generated in the final CSS output"*. `@theme static` skriver ut alla. 📄 samma sida
- **En namnrymd töms med `initial`.** `--color-*: initial;` tar bort hela standardpaletten, och `--*: initial;` tar bort hela standardtemat. 📄 samma sida
- **`@theme` måste stå på toppnivå**, inte under en selektor eller en mediafråga. 📄 samma sida
- **`@theme inline` behövs när ett tema pekar på andra variabler.** *"Without using `inline`, your utility classes might resolve to unexpected values because of how variables are resolved in CSS."* En variabel räknas ut där den definieras. Står `--color-primary: var(--k-accent)` i `:root`, men `--k-accent` först finns på `[data-kit="lugn"]`, blir värdet tomt. Med `inline` skriver Tailwind `var(--k-accent)` direkt i klassen. 📄 samma sida
- **Avstånd räknas ur en multiplikator.** `--spacing-*` ger namngivna steg, och siffror räknas som `calc(var(--spacing) * 4)` med `--spacing: 0.25rem`. 📄 [Functions and directives](https://tailwindcss.com/docs/functions-and-directives), `--spacing()`
- **En storlek kan bära radhöjd, spärrning och vikt.** `--text-h1--line-height`, `--text-h1--letter-spacing` och `--text-h1--font-weight` följde med i provet. Dokumentationen visar bara mönstret i standardtemat. 🔧 avsnitt 3.2
- **`var()` fungerar inte i villkoret för en mediafråga eller containerfråga.** MDN: *"The var() function cannot be used in property names, selectors or anything else besides property values."* Därför kan kitets variabler inte bli `--breakpoint-*` eller `--container-*`. 📄 [MDN, var()](https://developer.mozilla.org/en-US/docs/Web/CSS/var)

### 2.3 `@utility`, `@variant`, `@custom-variant`, `@apply` och `@reference`

📄 [Functions and directives](https://tailwindcss.com/docs/functions-and-directives) och [Adding custom styles](https://tailwindcss.com/docs/adding-custom-styles), om inget annat anges.

- **`@utility` lägger till en egen klass som fungerar med varianter** (`hover:`, `lg:`) och hamnar i lagret `utilities`. Funktionella klasser läser värdet med `--value()`, och från 4.3 kan de ha ett standardvärde med `--default()`. 📄 [v4.3](https://tailwindcss.com/blog/tailwindcss-v4-3) (2026-05-08)
- **`@custom-variant` lägger till en egen variant**, till exempel `@custom-variant theme-midnight (&:where([data-theme="midnight"] *));`. En variant kan nästla mediafrågor med `@slot`.
- **`@variant` använder en variant i egen CSS.** Från 4.3 går det att stapla och kombinera: `@variant hover:focus` och `@variant hover, focus`. 📄 v4.3
- **`@apply` är till för andras kod.** *"This is useful when you need to write custom CSS (like to override the styles in a third-party library)"*.
- **`@reference` behövs för `@apply` i en komponents `<style>`.** Stilblock i Vue, Svelte och Astro *"are each processed by your build tooling totally separately"*. Tailwind rekommenderar *"avoiding `<style>` blocks in your components"*, eller CSS-variabler i stället för `@apply`, *"which don't require Tailwind to process your component CSS at all"*. 📄 [Compatibility](https://tailwindcss.com/docs/compatibility)

### 2.4 Klasser först, och när en komponent eller `@apply`

📄 [Styling with utility classes](https://tailwindcss.com/docs/styling-with-utility-classes)

- **Skälen för klasser:** fortare arbete, säkrare ändringar, enklare underhåll, flyttbar kod och CSS som slutar växa (*"Your CSS stops growing"*).
- **Upprepning löses i första hand med en komponent:** *"the best strategy is to create a component if you're using a front-end framework like React, Svelte, or Vue, or a template partial"*.
- **Egen CSS är okej för ett enda element.** *"writing some custom CSS is totally fine when a template partial feels heavy-handed"*, men *"for anything that's more complicated than just a single HTML element, we highly recommend using template partials"*.
- **Sidan nämner inte `@apply`.** Exemplet på egen CSS använder variabler i `@layer components`.
- **Två klasser för samma egenskap läggs aldrig på samma element.** *"you should just never add two conflicting classes to the same element"*. En komponent ska i stället ha *"specific props for styling customizations instead of letting consumers add extra classes"*.
- **tailwind-merge är en nödutgång.** Dess upphovsman skriver *"Think of tailwind-merge as an escape hatch rather than the primary tool to handle style variants"*. 📄 [When and how to use it](https://github.com/dcastil/tailwind-merge/blob/main/packages/tailwind-merge/docs/when-and-how-to-use-it.md)

### 2.5 Containerfrågor

- **Containerfrågor finns i kärnan.** `@container` märker föräldern, och `@md:` gäller när containern är minst 28rem. `@max-md:`, intervall som `@sm:@max-md:` och namngivna containrar (`@container/main`, `@sm/main:`) finns också. Från 4.3 finns `@container-size` för frågor om höjd. Standardstorlekarna går från 16rem till 80rem. 📄 [Responsive design](https://tailwindcss.com/docs/responsive-design)
- **Webbläsarstödet är brett.** Containerfrågor är Baseline brett tillgängligt sedan 2025-08-14. 📄 web-features 3.43.0
- **För oss:** ett kort eller en sektion som ska fungera i olika bredder svarar på sin plats i sidan, inte på fönstret.

### 2.6 Mörkt läge

- `dark:` följer `prefers-color-scheme` som standard. Med `@custom-variant dark (&:where([data-theme=dark], [data-theme=dark] *));` styrs läget av ett attribut. 📄 [Dark mode](https://tailwindcss.com/docs/dark-mode)
- Kiten har inget mörkt läge, och `data-yta="mork"` gäller enskilda sektioner. En egen variant för mörka sektioner räcker (avsnitt 3).

### 2.7 Astro och Vite-pluginet

- **Installationen:** `npm install tailwindcss @tailwindcss/vite`, `vite: { plugins: [tailwindcss()] }` i `astro.config.mjs` och en CSS-fil med `@import "tailwindcss";` som sidan importerar. 📄 [Install Tailwind with Astro](https://tailwindcss.com/docs/installation/framework-guides/astro)
- **Astros gamla integration gäller bara Tailwind 3.** `astro add tailwind` installerar *"the official Vite Tailwind plugin"*. Integrationen `@astrojs/tailwind` behövs bara för Tailwind 3 (*"only used for legacy Tailwind 3 compatibility"*). 📄 [Astro, Styling](https://docs.astro.build/en/guides/styling/)
- **Astros stilar utan lager vinner.** Om sina bildstilar skriver Astro att Tailwinds regler *"are always lower specificity than rules that don't use layers"*, och att *"Astro's styling will take precedence over Tailwind styling"*. 📄 [Astro, Images](https://docs.astro.build/en/guides/images/) Detsamma gäller ett `<style>` i en Astro-komponent och vår nuvarande `bas.css` (avsnitt 3.3).
- **En React-komponent utan `client:*` blir ren HTML.** *"By default, your framework components will only render on the server, as static HTML."* 📄 [Astro, Framework components](https://docs.astro.build/en/guides/framework-components/) En knapp från shadcn i en `.astro`-fil kostar alltså ingen JavaScript.
- **All CSS läggs i varje sida.** Biblioteket har `build.inlineStylesheets: 'always'` (`bibliotek/astro.config.mjs`). Tailwind gör en enda stilmall av alla klasser som hittas, så varje sida bär alla klasser som används någonstans på sajten.

### 2.8 Prestanda och storlek

- **Bygget är snabbt.** I Tailwind 4.0 tog ett helt bygge av Catalyst 100 ms mot 378 ms i v3.4. 📄 [Tailwind CSS v4.0](https://tailwindcss.com/blog/tailwindcss-v4) (2025-01-22)
- **Moderna webbläsare krävs.** *"Tailwind CSS v4.0 is designed for Safari 16.4+, Chrome 111+, and Firefox 128+"*. Tailwind *"depend[s] on modern CSS features like `@property` and `color-mix()`"* och *"will not work in older browsers"*. 📄 [Upgrade guide](https://tailwindcss.com/docs/upgrade-guide) Registrerade variabler (`@property`) är Baseline sedan 2024-07-09, men inte brett tillgängliga. 📄 web-features 3.43.0. Hur många besökare som har äldre webbläsare är inte undersökt ⚠️.
- **Storleken i vårt prov:** 🔧
  - Kitet, `bas.css` och `rorelse.css` genom Tailwind utan en enda klass: 7,2 kB minifierat och 2,4 kB med gzip.
  - Med cirka 45 klasser på provsidan: 13,8 kB och 3,9 kB.
  - Kostnaden följer alltså antalet klasser som används på hela sajten, inte på sidan.

### 2.9 Uppgradering från v3

Vi uppgraderar inget, men komponenter skrivna för Tailwind 3 ser annorlunda ut i v4 utan att något felmeddelande syns. 📄 [Upgrade guide](https://tailwindcss.com/docs/upgrade-guide)

- **Namn har bytt betydelse:**
  - `shadow-sm` heter `shadow-xs`, och `shadow` heter `shadow-sm`
  - `rounded-sm` heter `rounded-xs`, och `rounded` heter `rounded-sm`
  - `outline-none` heter `outline-hidden`, och `ring` heter `ring-3`.
- **Standardvärden har ändrats:**
  - kanter och ringar har `currentColor` i stället för grått och blått
  - `ring` är 1 px i stället för 3 px.
- **`hover:` gäller bara enheter som kan hovra**, och Tailwind rekommenderar *"treating hover functionality as an enhancement"*.
- **Syntaxen har ändrats:**
  - `!` står sist
  - variabler skrivs `bg-(--x)`
  - staplade varianter läses från vänster till höger.
- **Verktyget `npx @tailwindcss/upgrade`** kräver Node 20 eller senare.

## 3. Våra tokens i Tailwind

### 3.1 Principen

Kitet är den enda källan: `--k-*` under `[data-kit="…"]` (`bibliotek/stilkit/lugn/kit.css`). Tailwind får namn som pekar på kitet, inga egna värden. Det är samma mönster som shadcn och AstroPaper använder:
- **shadcn** mappar sina roller med `@theme inline { --color-primary: var(--primary); … }`. 📄 [shadcn, apps/v4/app/globals.css](https://github.com/shadcn-ui/ui/blob/main/apps/v4/app/globals.css)
- **AstroPaper** (MIT, 5 132 stjärnor, senaste commit 2026-10-08) gör likadant med `[data-theme]`. 📄 [src/styles/theme.css](https://github.com/satnaing/astro-paper/blob/main/src/styles/theme.css)

Förslaget står i `tailwind-tema-lugn.css` i premiumpassets scratch-katalog, inte i repot. Det har två slags namn:
- **shadcn-namnen** (`primary`, `muted-foreground`, `border`, `ring`, `text-sm`, `rounded-md`), så att komponenter från shadcn och 21st.dev ärver kitet
- **kitets egna namn** (`bg-yta`, `text-dampad`, `p-a4`, `text-h1`, `rounded-knapp`, `ease-kit`) för vår egen kod.

### 3.2 Provet 🔧

Filen kompilerades med `@tailwindcss/cli` 4.3.3 mot en provsida med cirka 45 klasser och en kopia av kitet, `bas.css` och `rorelse.css`.

| Klass | Blev |
|---|---|
| `bg-primary`, `text-primary-foreground` | `var(--k-accent)`, `var(--k-pa-accent)` |
| `p-a4`, `gap-a5`, `py-sektion` | `var(--k-a4)`, `var(--k-a5)`, `var(--k-sektion)` |
| `text-h1` | `font-size: var(--k-h1)`, radhöjd, spärrning och vikt ur kitet, som en enskild klass kan ändra |
| `text-sm` (shadcn) | `var(--k-mindre)` |
| `rounded-md` (shadcn) | `var(--k-radie-knapp)` |
| `transition` | `var(--k-tid)` och `var(--k-kurva)`, så att ingen komponent skriver egna millisekunder |
| `bg-zinc-900`, `text-white`, `shadow-md`, `shadow-xs`, `rounded-2xl`, `animate-spin`, `animate-pulse`, `ease-out`, `bg-destructive` | ingen CSS |
| `bg-transparent`, `bg-current` | finns kvar |
| `p-5` | `calc(var(--spacing) * 5)`, alltså ett värde utanför kitet |
| `outline-hidden` | `outline-style: none`, plus en genomskinlig kontur i `forced-colors: active` |
| `rorelse-hover:-translate-y-px` | bara inom `prefers-reduced-motion: no-preference`, `hover: hover` och `pointer: fine` |

- **Lagren låg i rätt ordning:** `kit, theme, base, components, utilities`.
- **Inte provat:** ett Astro-bygge, en webbläsare och eslint-pluginets igenkänning av våra klasser ⚠️.

### 3.3 Lager och Preflight

- **Lagren avgör, inte specificiteten.** *"Styles that are not defined in a layer always override styles declared in named and anonymous layers."* Ett senare lager vinner över ett tidigare, men *"the priority is reversed when the `!important` flag is used"*. 📄 [MDN, @layer](https://developer.mozilla.org/en-US/docs/Web/CSS/@layer)
  - Följd: så länge `bas.css` saknar lager kan ingen Tailwind-klass ändra `.knapp` eller `.kort`.
  - Följd: `outline-none` i en komponent, som ligger i `utilities`, slår ut vår fokusring i `:focus-visible` om den ligger i ett tidigare lager.
  - Följd: `animation: none !important` i reduce-regeln i `bas.css` vinner över allt som ligger i senare lager, också `tw-animate-css`.
- **Preflight ligger i `base`** och bygger på modern-normalize. 📄 [Preflight](https://tailwindcss.com/docs/preflight) Ur `tailwindcss/preflight.css` 4.3.3: 🔧
  - `a { color: inherit; text-decoration: inherit; }` – länkarna tappar understrykningen, som WCAG 1.4.1 kan kräva.
  - `ol, ul, menu { list-style: none; }` – listor tappar punkterna. Tailwind skriver själv att sådana listor *"are not announced as lists by VoiceOver"* och föreslår `role="list"`. 📄 Preflight
  - `h1–h6 { font-size: inherit; font-weight: inherit; }`.
  - Formulärdelar ärver typsnitt och färg och får genomskinlig bakgrund.
  - `[hidden]:where(:not([hidden="until-found"])) { display: none !important; }`.
- **Preflight går att utesluta:** importera `tailwindcss/theme.css` och `tailwindcss/utilities.css` med `layer()` och utelämna `preflight.css`. 📄 Preflight

### 3.4 DTCG, Terrazzo och Style Dictionary

- **DTCG 2025.10** är en *"Final Community Group Report"* från 28 oktober 2025 och *"not a W3C Standard nor is it on the W3C Standards Track"*. 📄 [designtokens.org/tr/2025.10](https://www.designtokens.org/tr/2025.10/)
  - En dimension har värde och enhet, och *"`$value.unit` may only be `"px"` or `"rem"`"*. `clamp()` kan alltså inte vara en token.
  - Längder får vara `ms` eller `s`. `cubicBezier` är fyra tal med x mellan 0 och 1.
  - Alias skrivs `{color.accent}` eller med JSON Pointer i `$ref`. 📄 [Format](https://www.designtokens.org/tr/2025.10/format/)
- **Resolvern** har *sets*, *modifiers* med *contexts* och en `resolutionOrder`. Exemplet är en modifier `theme` med ljust, mörkt och hög kontrast. Inget exempel gäller flera varumärken. Kitet blir en modifier `kit`. 📄 [Resolver](https://www.designtokens.org/tr/2025.10/resolver/)
- **Terrazzo 2.9.0:**
  - `@terrazzo/plugin-css` gör CSS-variabler. Varje kombination av modifiers (*permutation*) får en `prepare`-funktion som lägger in variablerna i en egen selektor. Exemplen använder `[data-theme="…"]`; `[data-kit="…"]` är vår anpassning och inte provad ⚠️. 📄 [Terrazzo, CSS](https://terrazzo.app/docs/integrations/css/)
  - `@terrazzo/plugin-tailwind` skriver ett `@theme` med uträknade värden per kombination, i en mall med `@tz` inuti `@variant`. Dokumentationen nämner inte `@theme inline` ⚠️. 📄 [Terrazzo, Tailwind](https://terrazzo.app/docs/integrations/tailwind/)
  - **Följd:** pluginet för Tailwind bakar in kitets värden, alltså motsatsen till vårt förslag. Terrazzo behövs för att bygga `kit.css`, men kopplingen till Tailwind är samma handskrivna fil för alla kit, eftersom den bara innehåller namn. Förslag.
- **Style Dictionary 5.6.1** har *"first-class support for the DTCG format"* sedan v4, men *"the latest format 2025.10 does not have full support yet"*. Arbetet pågår i v5. Något officiellt format för Tailwind 4 hittades inte ⚠️. 📄 [Style Dictionary, DTCG](https://styledictionary.com/info/dtcg/) Guidens val av Terrazzo (`guide/2-5-yta.md`) står sig, också för kontrastlinten.

## 4. Ekosystemet

### 4.1 Sortering med prettier-plugin-tailwindcss

📄 [README](https://github.com/tailwindlabs/prettier-plugin-tailwindcss)

- **Stilmallen måste anges för Tailwind 4:** *"When using Tailwind CSS v4 you must specify your CSS file entry point"* med `tailwindStylesheet`.
- **Klasser i funktionsanrop sorteras** med `tailwindFunctions`, till exempel `["cn", "cva", "clsx"]`.
- **Pluginet laddas sist:** *"`prettier-plugin-tailwindcss` must be loaded last"*. `prettier-plugin-astro` står bland pluginen det samarbetar med.
- **Dubbletter och onödiga mellanslag tas bort automatiskt.**
- AstroPaper använder `["prettier-plugin-astro", "prettier-plugin-tailwindcss"]`. 📄 [.prettierrc](https://github.com/satnaing/astro-paper/blob/main/.prettierrc)

### 4.2 Linting med eslint-plugin-better-tailwindcss

📄 [README](https://github.com/schoero/eslint-plugin-better-tailwindcss) och [docs](https://github.com/schoero/eslint-plugin-better-tailwindcss/tree/main/docs)

- **Reglerna för korrekthet:**
  - `no-unknown-classes`, *"Report classes not registered with Tailwind CSS"*
  - `no-conflicting-classes` (bara v4)
  - `no-concatenated-classes`
  - `no-restricted-classes`, med reguljära uttryck och egna meddelanden.
- **Stilreglerna** innehåller bland annat `enforce-canonical-classes` och `no-deprecated-classes`, båda bara för v4.
- **Inställningen `entryPoint`** pekar på CSS-filen för v4. Med `detectComponentClasses` räknas klasser i lagret `components` som kända.
- **Astro stöds** via `astro-eslint-parser`. Pluginet läser redan `cn`, `cva`, `tv`, `clsx` och `twMerge`.
- **Krock med Prettier:** radbrytningsregeln kan ge *"an endless conflict"* med Prettier. Sortering finns i båda verktygen. Vi använder en av dem.

### 4.3 clsx, tailwind-merge och `cn()`

- **`cn()` är clsx plus tailwind-merge,** som i varje shadcn-projekt. tailwind-merge rekommenderar att `twMerge` importeras från en egen fil, eftersom *"the default `twMerge` only knows the default Tailwind theme"*. 📄 [Configuration](https://github.com/dcastil/tailwind-merge/blob/main/packages/tailwind-merge/docs/configuration.md)
- **Egna namn måste registreras:** *"If you modified one of the theme namespaces … you need to add the variable names to the `theme` object in tailwind-merge as well"*. 📄 samma sida
- **Provet 🔧:**
  - Utan inställning blev `"text-h1 text-text"` bara `text-text`, och `"p-a4 p-a5"` lämnades orörd.
  - Med `text`, `spacing` och `radius` utökade med kitets namn blev resultaten rätt (`text-h1 text-text`, `p-a5`, `rounded-kort`).
- **Kostnad:** tailwind-merge anger cirka 7 kB med gzip, och vi mätte 8,5 kB. Den har också skäl mot sig: *"Might give too much freedom to users of a component"*. 📄 [When and how to use it](https://github.com/dcastil/tailwind-merge/blob/main/packages/tailwind-merge/docs/when-and-how-to-use-it.md)

### 4.4 Varianter med CVA eller tailwind-variants

- **CVA** samlar en komponents varianter i ett objekt: grundklasser, `variants`, `compoundVariants` och `defaultVariants`, med typen `VariantProps`. Den *"joins class names but does not resolve conflicting Tailwind CSS utilities"*. 📄 [cva.style, Variants](https://cva.style/docs/getting-started/variants) och [Installation](https://github.com/joe-bell/cva/blob/main/docs/src/content/docs/getting-started/installation.mdx)
- **Två sätt att lösa krockar:** antingen `twMerge` runt CVA, eller ett recept med en `base:`-variant i ett nästlat lager under de vanliga klasserna. Med receptet vinner en vanlig klass utan att något slås ihop när sidan körs, men *"Conditional defaults lose too"*. 📄 samma sida
- **Storlek 🔧 (esbuild, gzip):**

  | Paket | Storlek |
  |---|---|
  | `class-variance-authority` | 0,6 kB |
  | `tailwind-variants` | 12,9 kB, med tailwind-merge inräknat |
  | `tailwind-variants/lite` | 3,7 kB |
  | `clsx` | 0,2 kB |
- **Val:** CVA är minst och används av shadcn. tailwind-variants har *slots* för komponenter i flera delar, men behövs inte för en knapp.

### 4.5 shadcn/ui

📄 [Theming](https://ui.shadcn.com/docs/theming), [Tailwind v4](https://ui.shadcn.com/docs/tailwind-v4), [Astro](https://ui.shadcn.com/docs/installation/astro) och källkoden (MIT, commit 2026-10-16)

- **Temat:**
  - *"We use semantic background and foreground pairs"*.
  - Variablerna ligger i `:root` och `.dark`, och `@theme inline` gör dem till klasser.
  - `--radius` är 0.625rem, och `--radius-sm` till `--radius-4xl` räknas ur den med `calc()`.
  - Färgerna är OKLCH.
  - `tw-animate-css` har ersatt `tailwindcss-animate`, och varje del har attributet `data-slot`.
- **Med `cssVariables: false` byts temat mot fasta klasser** som `bg-zinc-950`. Den inställningen används inte hos oss.
- **I Astro:** mallen `with-tailwindcss` med React, sedan `shadcn init`. Exemplet använder `<Button>` utan `client:*`.
- **Knappen** (`registry/new-york-v4/ui/button.tsx`) har:
  - `transition-all`, `outline-none` och fokus som `focus-visible:ring-[3px] focus-visible:ring-ring/50`
  - höjden `h-9` (36 px) som standard.
- **Fokusringen i vårt kit:** accent på 50 % ger ungefär 2,1:1 mot vit yta, mot 5,5:1 för full accent 🔧 (sRGB-blandning; Tailwind blandar i oklab, så värdet är ungefärligt ⚠️). Ringen är en `box-shadow`, och i forced colors är *"`box-shadow` … forced to 'none'"*. 📄 [MDN, forced-colors](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/forced-colors)
- **`tw-animate-css` 1.4.0 har ingen regel för `prefers-reduced-motion`** (sökt i `dist/tw-animate.css`). 🔧 Vår globala reduce-regel stoppar dess animationer.

### 4.6 21st.dev och Magic MCP

- **Vad det är:** Magic MCP heter nu 21st MCP. README:n beskriver den som *"search 10,000+ React/Tailwind components"*, och sidan på 21st.dev säger 12 000+. 📄 [magic-mcp](https://github.com/21st-dev/magic-mcp), [21st.dev/mcp](https://21st.dev/mcp)
- **Kostnad:** en API-nyckel krävs. Sökningen är gratis, men att hämta en komponent (`get_component`) och att generera (`generate`) kostar. Priserna står inte på sidan ⚠️.
- **Villkoren:** innehållet ägs av *"their respective authors and 21st Labs Inc."*. Komponenter som bygger på öppen källkod ska behålla sin licens och ge synlig kreditering. 📄 [21st.dev/terms](https://21st.dev/terms) Hur vi krediterar beslutades 2026-10-16 (`BESLUT.md`, *En minimal kreditering för komponenter från 21st.dev*).
- **Stylingen:** komponenterna är React och Tailwind. Om varje komponent använder shadcn-variabler eller fasta paletter varierar och är inte granskat ⚠️.

### 4.7 Aceternity UI och Magic UI

- **Aceternity UI** är *"200+ production-ready components, blocks and templates built with React, Tailwind CSS and Motion"* och installeras med shadcn-CLI:n. Exempel: Background Beams, Sparkles, Aurora Background, Lamp Effect, Macbook Scroll, Wavy Background. 📄 [ui.aceternity.com](https://ui.aceternity.com/)
  - Licensen säger *"You can create unlimited end products for yourself or your clients"* och *"You cannot re-distribute the Item … or its source files"*. 📄 [Licence](https://ui.aceternity.com/licence)
  - Om licensen också gäller de fria komponenterna står inte separat ⚠️.
- **Magic UI** är MIT (repot har 22 689 stjärnor och senaste commit 2026-10-11) och riktar sig till landningssidor. 📄 [magicuidesign/magicui](https://github.com/magicuidesign/magicui) Ur `registry.json` och källkoden: 🔧
  - `globe` kräver `cobe`, som ritar på en canvas, och `motion`.
  - `marquee` och `shimmer-button` har oändliga animationer (`infinite`). Marquee pausar bara vid hover, vilket inte uppfyller WCAG 2.2.2 med tangentbord eller pekskärm (tolkning).
  - `blur-fade` börjar på `opacity: 0` och `blur(6px)`.
  - `number-ticker` skriver startvärdet (0) i HTML:en och formaterar med `Intl.NumberFormat("en-US")`.
  - `text-animate`, `animated-beam` och `blur-fade` kräver `motion`.
- **Premiumkänsla mot tyngd:** biblioteken är byggda för landningssidor med expressiv rörelse. Det som håller måttet efter omklädning är layoutblock, som bento-rutnät och kort. Det som är tungt eller bryter mot reglerna är canvas och WebGL (glob, partiklar), oändliga bakgrunder och text som animeras in.

### 4.8 Tailwind Labs och mallar för Astro

- **Tailwind Plus säljs inte längre till nya kunder:** *"we're closing sign ups for new customers"*. 📄 [bloggen](https://tailwindcss.com/blog/tailwind-is-joining-shopify) (2026-09-09) Catalyst och Plus är alltså inget alternativ.
- **Mallar med Astro och Tailwind 4 via `@tailwindcss/vite`:**

  | Mall | Licens | Stjärnor | Senaste commit | Innehåll |
  |---|---|---|---|---|
  | [AstroPaper](https://github.com/satnaing/astro-paper) | MIT | 5 132 | 2026-10-08 | Tailwind 4.3.2, `@theme inline` med `[data-theme]`, fokus som streckad kontur, prettier-plugin-tailwindcss |
  | [AstroWind](https://github.com/onwidget/astrowind) | MIT | 6 042 | 2026-09-12 | Tailwind 4.3.3, tailwind-merge |
  | [astro-shadcn-ui-template](https://github.com/area44/astro-shadcn-ui-template) | MIT | 210 | 2026-10-10 | Astro 7.3.5, React, CVA, Base UI |

  📄 `gh api` och `package.json`.

## 5. Tillgänglighet med Tailwind

- **Fokus:**
  - I v4 sätter `outline-none` `outline-style: none`. `outline-hidden` behåller konturen i forced colors. Båda sidorna säger *"It is highly recommended to apply your own focus styling"*. 📄 [Outline style](https://tailwindcss.com/docs/outline-style)
  - Konturens färg byts mot systemets färg i forced colors, men konturen syns. En `box-shadow` försvinner. 📄 [MDN, forced-colors](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/forced-colors) Fokus ska alltså vara en kontur, inte en ring av skugga.
- **Reducerad rörelse:**
  - `motion-safe:` lägger rörelsen inom `no-preference`, och `motion-reduce:` inom `reduce`. Tailwind skriver att `motion-safe` är mindre kod när `motion-reduce` *"would mean having to 'undo' a lot of styles"*. 📄 [States](https://tailwindcss.com/docs/hover-focus-and-other-states)
  - Josh Comeau kallar mönstret *"no-motion-first"*: *"start without animations, and enable them if the user wishes"*. 📄 [Accessible animations in React](https://www.joshwcomeau.com/react/prefers-reduced-motion/) (2020-05-04, uppdaterad 2026-04-29)
- **Hover** gäller bara `(hover: hover)` i v4. Pekarens precision är egna varianter: `pointer-fine:` och `pointer-coarse:`. 📄 States och Upgrade guide
- **Forced colors och kontrast:**
  - `forced-colors:` och `not-forced-colors:` finns, och `forced-color-adjust-none` är till för till exempel färgprover. MDN avråder från att göra en separat design: justeringar *"should be chosen carefully and targeted to content that is otherwise not legible"*. 📄 [Forced color adjust](https://tailwindcss.com/docs/forced-color-adjust); MDN
  - `contrast-more:` finns för `prefers-contrast: more`. 📄 States
- **`sr-only`** i Tailwind använder `clip-path: inset(50%)`, `margin: -1px` och `white-space: nowrap`. `bas.css` har en egen `.sr-only` med `clip`. Båda döljer visuellt utan att dölja för skärmläsare. 📄 [Display](https://tailwindcss.com/docs/display)
- **Kontrasten i kitet Lugn 🔧** (WCAG 2.x-formeln):

  | Par | Kontrast |
  |---|---|
  | Text på bg | 11,3:1 |
  | Dämpad på dekor | 5,3:1 |
  | Vitt på accent | 5,5:1 |
  | Accent som text på bg | 4,9:1 |
  | `--k-linje` mot yta | 1,4:1 |

  `--k-linje` duger alltså inte som kant på ett formulärfält, som kräver 3:1 (WCAG 1.4.11). shadcn:s `--input` får därför en annan färg i förslaget.

## 6. Motion

### 6.1 Paketet

- **Installation:** `npm install motion` och `import { motion } from "motion/react"`. Motion kräver React 18.2 eller senare. 📄 [Installation](https://motion.dev/docs/react-installation)
- **Vanilla-API:t:** `import { animate } from "motion"` (hybrid) eller `"motion/mini"`. 📄 [animate](https://motion.dev/docs/animate)
- **Licens:** MIT.

### 6.2 React eller vanilla

- **Motion om CSS:** *"For simple, self-contained effects (like a color change on hover) a standard CSS transition is a lightweight solution."* 📄 [Motion for React](https://motion.dev/docs/react)
- **Motions styrkor** är fjädrar, avbrytbara rörelser, utgång när ett element tas bort (`AnimatePresence`), layout och gester. 📄 samma sida
- **Vanilla:**
  - `animate` mini (*"3.2kb"*) använder webbläsarens egna API:er.
  - Hybrid (*"22kb"*) lägger till fristående transformer, fjädrar och sekvenser.
  - `inView` (*"just 0.5kb"*) bygger på IntersectionObserver.
  - Ingen av sidorna nämner reducerad rörelse. 📄 [animate](https://motion.dev/docs/animate), [inView](https://motion.dev/docs/inview)
- **I Astro** kan vanilla-API:t köras i ett `<script>` i en Astro-komponent, utan React.

### 6.3 Storleken, mätt 🔧

Motions egna siffror kommer från *"Rollup-generated bundles"*. 📄 [Reduce bundle size](https://motion.dev/docs/react-reduce-bundle-size) Våra mätningar har React externt, så siffran gäller Motion ovanpå React.

| Vad | Motion anger | rolldown, gzip | esbuild, gzip |
|---|---|---|---|
| `motion` (hela komponenten) | 43 kB | 42,9 kB | 48,5 kB |
| `m` + `LazyMotion` + `domAnimation` | cirka 5 + 24 kB | 29,3 kB | 34,4 kB |
| `m` + `LazyMotion` + `domMax` | cirka 5 + 38 kB | – | 48,6 kB |
| `domAnimation` laddad efteråt | *"just over 5kb"* först | 14,6 kB först, 17,8 kB efteråt | allt i en delad del, 35 kB |
| `animate` mini | 3,2 kB | – | 3,4 kB |
| `animate` hybrid | 22 kB | – | 24,1 kB |
| `inView` | 0,5 kB | – | 0,4 kB |
| `inView` + `animate` mini | – | – | 3,6 kB |
| `scroll` | – | – | 3,8 kB |
| `react` + `react-dom/client` | – | 67,8 kB | 69,0 kB |

- **Hela paketet utan tree shaking:** bundlephobia anger `motion` 14.3.0 till 151 kB minifierat och 51,5 kB med gzip. 📄 [bundlephobia](https://bundlephobia.com/package/motion@14.3.0)
- **Paketstorleken på npm** (`dist.unpackedSize`) är 0,8 MB för `motion` och 6,3 MB för `framer-motion`. Den säger inget om vad besökaren laddar.
- **Siffrorna beror på bundlaren.** Det som gäller för oss är rolldown, eftersom Astro 7 bygger med Vite 8.

### 6.4 Reducerad rörelse

- **`<MotionConfig reducedMotion="user">`** gör att alla motion-komponenter *"automatically disable transform and layout animations"*, medan opacitet och `backgroundColor` behålls. Det stämmer med guidens regel. 📄 [Accessibility](https://motion.dev/docs/react-accessibility)
- **`useReducedMotion()`** returnerar sant eller falskt. Exemplen byter förflyttning mot opacitet, stänger av video som spelas automatiskt och tar bort parallax. 📄 samma sida
- **Oskärpa nämns inte.** Om `filter: blur()` stängs av är inte belagt ⚠️. WCAG:s errata räknar oskärpa som rörelse (avsnitt 8).
- **Vanilla-API:t** kräver en egen kontroll med `matchMedia` (WCAG-tekniken SCR40).
- **`MotionConfig` påverkar inte serverns HTML** (avsnitt 6.5).

### 6.5 Serverns HTML och regeln att ingen text börjar osynlig

Motion skriver: *"the initial state of the component will be reflected in the server-generated output"*. 📄 [Motion component](https://motion.dev/docs/react-motion-component) Provet med `renderToString` 🔧:

| Kod | HTML från servern |
|---|---|
| `initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}` | `<p style="opacity:0;transform:translateY(20px)">` |
| `initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}` | `<p style="opacity:0">` |
| Samma inom `<MotionConfig reducedMotion="user">` | `<p style="opacity:0;transform:translateY(20px)">` |
| `m.p` i `LazyMotion`, `initial={{ opacity: 0.7, y: 16 }}` | `<p style="opacity:0.7;transform:translateY(16px)">` |
| `initial={false}` | `<p style="opacity:1;transform:none">` |
| BlurFade-mönstret | `<p style="opacity:0;filter:blur(6px);transform:translateY(-6px)">` |
| `whileHover` och `whileTap` på en knapp | `<button tabindex="0">` |

- **Utan JavaScript, eller innan ön har laddats, står texten osynlig.** Med `client:visible` laddas ön först när den syns, så texten är osynlig tills skriptet har körts.
- **`whileHover` och `whileTap` lägger till `tabindex="0"`.** På en `div` blir elementet då fokuserbart utan att vara en kontroll.
- **CSP stoppar style-attribut.** Biblioteket har CSP med hashar ur Astros `security.csp` (`guide/2-8-teknik-och-kvalitet.md`). MDN: under `style-src` utan `'unsafe-inline'` *"Inline style attributes are also blocked"*. Stilar som sätts med `element.style.x` från skript *"will not be blocked"*. 📄 [MDN, style-src](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Content-Security-Policy/style-src)
  - Astro kan släppa igenom attributen med `{ resource: "'unsafe-inline'", kind: "attribute" }`. 📄 [Astro, security.csp](https://docs.astro.build/en/reference/configuration-reference/)
  - Hur Motions attribut beter sig under vår CSP i en webbläsare är inte provat ⚠️.

### 6.6 Layout och scroll

- **Layoutanimationer** görs med transform (*"Motion performs all layout animations using the CSS `transform` property"*). En ändrad `border` *"defeats the performance benefits"*, och SVG stöds inte. 📄 [Layout animations](https://motion.dev/docs/react-layout-animations) De kräver `domMax` (+38 kB). 📄 Reduce bundle size
- **Rörelse när något kommer in i bild:** `whileInView` med `viewport={{ once: true }}`. 📄 [Scroll animations](https://motion.dev/docs/react-scroll-animations)
- **Rörelse kopplad till scrollen:** `useScroll` och `useTransform`. Motion säger att den kör sådana animationer på webbläsarens `ScrollTimeline` där det går. Att den är *"the only animation library"* som gör det är leverantörens eget påstående ⚠️. 📄 samma sida

### 6.7 Prestanda och standardövergången

- **Matt Perrys nivåer** (Motion, 2025-11-05): 📄 [Web animation performance tier list](https://motion.dev/magazine/web-animation-performance-tier-list)

  | Nivå | Vad |
  |---|---|
  | S | Bara kompositören: transform, opacity, filter och clip-path |
  | A | Kompositörsvärden som styrs från huvudtråden |
  | B | Som A, plus mätning av DOM (layoutanimationer) |
  | C | Målning: färg, `border-radius`, CSS-variabler och view transitions |
  | D | Layout: `width`, `margin`, `top` |
  | F | Upprepad läsning och skrivning av layouten |

  Att view transitions hamnar i C är Motions bedömning ⚠️. Dokumentationen säger också: *"Animating a CSS variable isn't hardware accelerated, even when the variable is applied to `transform`."* 📄 [Performance](https://motion.dev/docs/performance)
- **Standardövergången** (`motion-dom` 14.3.0, `default-transitions.mjs`, uträknat 🔧):
  - x, y och rotation får en fjäder med `stiffness: 500` och `damping: 25`. Dämpningskvoten är 0,56, och fjädern går cirka 12 % förbi målet.
  - `scale` får `stiffness: 550` och `damping: 30`, cirka 7 % förbi.
  - Andra värden får 0,3 s med kurvan `[0.25, 0.1, 0.35, 1]`.
  - Utan en angiven `transition` studsar alltså en förflyttning.

## 7. När räcker CSS, och när behövs Motion?

Status ur web-features 3.43.0 (släppt 2026-10-15), den data som Baseline bygger på. 📄 [web-features på npm](https://www.npmjs.com/package/web-features)

| Behov | CSS | Status | Motion behövs |
|---|---|---|---|
| Hover, tryck, fokus | `transition` | Baseline länge | Aldrig |
| Entré när något visas (meny, popover, dialog) | `@starting-style` + `transition-behavior: allow-discrete` | Baseline sedan 2024-08-06 (Chrome 117, Safari 17.5, Firefox 129) | Inte för sparsam eller måttlig |
| Fjäderkänsla | `linear()` | Baseline brett sedan 2026-06-11 | Nej. Motion kan göra fjädrar som `linear()` vid bygget 📄 [Motion, CSS](https://motion.dev/docs/css) |
| Övergång inom en sida | `view-transition-name` | Baseline sedan 2025-10-14 | – |
| Sidbyte mellan dokument | `@view-transition` | Inte Baseline; saknas i Firefox | – (→ rörelseskillen, `sidbyten-och-scroll.md`) |
| Rörelse kopplad till scroll | `animation-timeline` | Inte Baseline; Chrome 115, Safari 26, saknas i Firefox i web-features | Motions `scroll()` faller tillbaka på JavaScript |
| Höjd till `auto` | `interpolate-size`, `calc-size()` | Bara Chrome 129 | Eller rutnät med `grid-template-rows` |
| Utgång när React tar bort ett element | – | – | `AnimatePresence` |
| Omsortering och delade element | – | – | `layout`, `layoutId` (`domMax`) |
| Dra, svepa | – | – | `domMax` |
| In-animation vid scroll | `animation-timeline: view()` eller IntersectionObserver + klass | Se ovan | `inView` + `animate` mini, 3,6 kB |

**Slutsats:** sparsam rörelse behöver ingen JavaScript för rörelsen, och måttlig klarar sig med CSS eller vanilla-API:t. Motion för React behövs först för utgångar, layout och gester i en ö som redan finns. Valordningen står i rörelseskillen (`.claude/skills/rorelse/verktyg.md`).

## 8. Litteraturen om rörelse

- **Emil Kowalski:** 📄 [You don't need animations](https://emilkowal.ski/ui/you-dont-need-animations), [Great animations](https://emilkowal.ski/ui/great-animations); publiceringsdatum anges inte ⚠️
  - Syftet först: *"what's the purpose of this animation?"*
  - Frekvensen: *"A hover effect is nice, but if used multiple times a day, it would likely benefit the most from having no animation at all."*
  - Tangentbordet: åtgärder som startas från tangentbordet ska aldrig animeras (*"You should never animate them"*).
  - Längden: *"UI animations should generally stay under 300ms"*, med förbehållet *"Unless you are working on marketing sites"*.
  - Ease-out, avbrytbarhet, transform och opacitet, och hänsyn till dem som inte vill ha rörelse.
- **Josh W. Comeau:**
  - Rörelse kan ge *"nausea, dizziness, and malaise"*, och *"up to 35% of adults 40+ in the US have experienced some form of vestibular dysfunction"*. Han förordar *"no-motion-first"* och påpekar att en tonad övergång *"is safe to use for everyone"*. 📄 [Accessible animations in React](https://www.joshwcomeau.com/react/prefers-reduced-motion/)
  - Ease-out när något kommer in och ease-in när det går ut. *"Two properties — transform and opacity — are very cheap to animate."* 📄 [An interactive guide to CSS transitions](https://www.joshwcomeau.com/animation/css-transitions/) (2021-02-09, uppdaterad 2026-05-05)
- **NN/g:** Laubheimer, 2020-02-09 📄 [Duration and motion characteristics](https://www.nngroup.com/articles/animation-duration/)
  - De flesta animationer *"in the range of 100–500 ms"*, enkel återkoppling *"roughly 100 ms"* och större förändringar 200–300 ms.
  - *"the more frequent the animation, the more subtle and shorter you'll want it to be"*.
  - Oftast ease-out.
- **WCAG 2.3.3, Animation from interactions** (AAA): 📄 [Understanding 2.3.3](https://www.w3.org/WAI/WCAG22/Understanding/animation-from-interactions.html)
  - Kriteriet: *"Motion animation triggered by interaction can be disabled, unless the animation is essential"*.
  - Definitionen undantar *"changes of color, blurring, or opacity"*, men erratan säger *"Amending the definition to not exclude blurring"*.
  - Teknikerna är C39 (CSS) och SCR40 (JavaScript).
  - Parallax är ett exempel.
- **Hur källorna förhåller sig till varandra:** källorna är eniga om korta längder, ease-out, transform och opacitet, och om att frekventa handlingar ska ha lite eller ingen rörelse. Emils undantag för marknadssajter gäller inte vård och hantverk, där Johnnys regel om läsbar text går före (`BESLUT.md` 2026-10-15).

## 9. Så arbetar vi

**Förslag 2026-10-16, inte beslutade.** Reglerna bygger på avsnitten ovan. Nivån (N1–N4) bestäms när Johnny har tagit ställning; inget av detta behövs för en sajt som inte har React eller Tailwind.

### Tailwind

1. **Kitet blir `@theme inline` i en fil som är likadan för alla kit.** Filen innehåller bara namn som pekar på `--k-*`; brytpunkter och containerstorlekar är de enda fasta värdena. Standardpaletten, skuggorna, radierna, kurvorna och animationerna töms med `initial`. Utkastet är `tailwind-tema-lugn.css`. Varför: ett kitbyte ska styra allt, och en inklistrad klass med ett värde utanför kitet ska ge noll CSS i stället för en avvikelse (avsnitt 3.2).
2. **Vår CSS och Tailwind ligger i samma lagerordning:** `kit, theme, base, components, utilities`. `bas.css` och `rorelse.css` importeras i `components`. Ingen CSS utan lager i biblioteket, och inga Astro-`<style>` i komponenter som ska kunna ändras med klasser. Varför: CSS utan lager vinner alltid (avsnitt 3.3).
3. **Ingen Preflight.** Bara två regler tas med: `[hidden]` döljer alltid, och formulärdelar ärver typsnitt och färg. Varför: Preflight tar bort länkarnas understrykning och listornas punkter (avsnitt 3.3).
4. **En komponent, ett sätt.** Bibliotekets Astro-sektioner behåller sina klasser i CSS. React-öar och importerade komponenter skrivs med Tailwind-klasser. Båda läser samma kit. Varför: Tailwind avråder från `<style>`-block och `@apply` i komponenter (avsnitt 2.3), och sektionerna klarar redan Lighthouse 100.
5. **`@apply` bara för markup vi inte styr**, till exempel text från Markdown eller ett CMS. Där en komponent finns används komponenten. I en komponents `<style>` används variabler (`var(--k-a4)`), inte `@apply`. Varför: Tailwinds egen avgränsning (avsnitt 2.3–2.4).
6. **Hela klassnamn, aldrig ihopbyggda.** Varianter skrivs som objekt eller med CVA. Varför: dokumentationen (avsnitt 2.1).
7. **CVA för varianter och `cn()` för sammanslagning.** `cn()` bor i en egen fil med `extendTailwindMerge`, där kitets namn för `text`, `spacing` och `radius` står. Komponentens API har props för varianter, inte fri `className`, där det går. Varför: tailwind-merge tappar annars `text-h1` (avsnitt 4.3); CVA är 0,6 kB (avsnitt 4.4).
8. **Sortering med Prettier, kontroll med ESLint.**
   - `prettier-plugin-tailwindcss` står sist bland pluginen, med `tailwindStylesheet` och `tailwindFunctions: ["cn", "cva", "clsx"]`.
   - `eslint-plugin-better-tailwindcss` körs med reglerna för korrekthet och `entryPoint`. Dess sortering och radbrytning stängs av.
   - `no-restricted-classes` stoppar `outline-none`, `outline-hidden`, `transition-all`, `animate-*` och godtyckliga färger som `bg-[#…]`.
   - Varför: avsnitt 4.1–4.2; vakten mot värden utanför kitet i `guide/2-5-yta.md`.
9. **En importerad komponent kläs om innan den går in i biblioteket.** Det gäller shadcn, 21st.dev, Aceternity och Magic UI, och kontrollen är:
   - palettklasser byts mot kitets roller
   - `transition-all` byts mot de egenskaper som ändras
   - fokus som ring byts mot vår kontur
   - höjder under kitets minsta knapphöjd höjs
   - `en-US` byts mot `sv-SE`
   - klassnamn från v3 rättas
   - licensen skrivs in.

   Varför: avsnitt 2.9, 4.5–4.7; licens per komponent enligt `guide/2-5-yta.md`.
10. **Fokus är en kontur, aldrig en skugga.** Den globala `:focus-visible` i `bas.css` gäller överallt och tas aldrig bort i en komponent. Varför: en `box-shadow` försvinner i forced colors, och 50 % accent ger cirka 2:1 (avsnitt 4.5, 5).

### Motion

11. **Valordning: CSS, sedan vanilla, sist Motion för React.**
    - CSS gäller allt i sparsam budget.
    - Vanilla `inView` och `animate` mini (3,6 kB) gäller in-animationer i måttlig.
    - Motion för React används bara i en ö som redan finns för interaktionen, och bara för utgångar, layout och gester.
    - Ingen React-ö laddas för rörelsens skull.
    - Varför: avsnitt 6.2 och 7; rörelseskillen, princip 10.
12. **Motion för React laddas smalt.**
    - `LazyMotion` med `strict`, `m` och `domAnimation`, som kostar 29 kB. `domMax` bara för layout och drag.
    - `<MotionConfig reducedMotion="user" transition={…}>` ligger högst upp i ön, med kitets längd och kurva som standardövergång.
    - Varför: standardfjädern studsar 12 % (avsnitt 6.3, 6.7).
13. **Ingen in-animation med `initial` i en ö som renderas på servern.**
    - `initial` är `false` eller samma som slutläget.
    - In-animationer görs i CSS eller med vanilla-API:t efter en kontroll med `matchMedia`, och börjar från minst 70 % opacitet (`BESLUT.md` 2026-10-15).
    - Varför: `initial` hamnar i HTML:en och stoppas dessutom av CSP (avsnitt 6.5).
14. **`whileHover` och `whileTap` bara på riktiga knappar och länkar.** Varför: Motion lägger till `tabindex="0"` (avsnitt 6.5).
15. **Budget för JavaScript för rörelse per sida:**

    | Budget | JavaScript för rörelse |
    |---|---|
    | Sparsam | 0 kB |
    | Måttlig | Högst cirka 4 kB med gzip |
    | Expressiv | Motion för React (30–43 kB plus React) bara med Johnnys ja i briefen och en Lighthouse-mätning |

    Kostnaden redovisas per sida. Varför: avsnitt 6.3; `guide/2-6-rorelse.md`, *Rörelsebudget*.
16. **Reducerad rörelse i tre lager:**
    - den globala reduce-regeln i CSS, som också stoppar `tw-animate-css`
    - `MotionConfig reducedMotion="user"` i React-öar
    - `matchMedia` före varje vanilla-anrop.

    Ingen oskärpa animeras, oavsett inställning. Varför: avsnitt 4.5, 6.4 och 8.

## 10. Krockar med tidigare beslut

Johnny har beslutat att krockarna tas upp när de uppstår och att de inte stoppar något på förhand (`BESLUT.md` 2026-10-16). Här är de som researchen förutser.

### Sparsam rörelse (`BESLUT.md` 2026-10-15, *Rörelse – sparsam som standard*)

- **Komponentbiblioteken är byggda för expressiv rörelse.** Aceternity och Magic UI är gjorda för landningssidor: bakgrunder som rör sig utan slut, text som animeras in och glober. De flesta av deras rörliga komponenter ryms inte i sparsam eller måttlig budget (avsnitt 4.7).
- **Motions standardövergång studsar**, och guiden säger att sparsam rörelse inte har några studsar (avsnitt 6.7).
- **`tw-animate-css`** ger shadcn:s menyer och dialoger zoom och tonade övergångar. Det är tillståndsbyten, som sparsam tillåter, men längden och kurvan måste komma ur kitet.
- **Förslag:** regel 12 och 15. Komponenter med rörelse utanför budgeten används bara med budgeten expressiv och Johnnys ja.

### Ingen text som börjar osynlig (`guide/2-6-rorelse.md`, N1)

- **Motion skriver `opacity:0` i serverns HTML** så snart `initial` har det, också med `reducedMotion="user"` (avsnitt 6.5).
- **Komponenter från biblioteken börjar osynliga.** Magic UI:s BlurFade börjar på `opacity: 0` med oskärpa. NumberTicker visar 0 i HTML:en, så en helsidesbild eller en besökare utan JavaScript ser fel siffra (avsnitt 4.7).
- **Förslag:** regel 13. En komponent som börjar osynlig kläs om eller används inte.

### Lighthouse 100 (`BESLUT.md` 2026-10-16, *Lighthouse 100 är målet*)

- **En React-ö med `client:*` kostar React** (68 kB gzip). Motion för React lägger till 29–43 kB. Mer JavaScript ökar risken för sämre Total Blocking Time på mobil. Hur mycket det kostar i poäng är inte mätt här ⚠️; kontroll 9 avgör (`guide/2-8-teknik-och-kvalitet.md`).
- **Tailwind kostar lite.** Cirka 1,4 kB gzip för 45 klasser i provet. CSS:en ligger i varje sida och växer med antalet klasser på hela sajten (avsnitt 2.8).
- **Förslag:** öar utan `client:*` där det går, eftersom de kostar 0 kB. Budgeten i regel 15. En Lighthouse-mätning före och efter den första ön.

### Andra beslut som berörs

- **HTML först** (`guide/2-4-skelett.md`): `client:only` renderar inget på servern och används inte för innehåll. 📄 Astro, Framework components
- **CSP med hashar** (`guide/2-8-teknik-och-kvalitet.md`): style-attribut i serverns HTML stoppas. Det gäller Motions `initial` och komponenter som sätter `style={…}`. Att tillåta dem med `'unsafe-inline'` för attribut försvagar CSP:n. Tas upp med Johnny om en komponent kräver det (avsnitt 6.5).
- **Accenten är till för handlingar** (`BESLUT.md` 2026-10-16, G3): shadcn använder `primary` för mer än knappar, till exempel märken och reglage. En importerad komponent granskas mot G3.
- **Inga värden utanför kitet** (`guide/2-5-yta.md`, N2): Tailwinds siffror (`p-5`) och godtyckliga värden (`p-[13px]`, `bg-[#…]`) ger värden utanför kitet. Regel 1 och 8 täpper till det mesta, men siffrorna för avstånd finns kvar för komponenternas skull.
- **Ett stilkit, inga stilskills i kundbygget** (`guide/2-5-yta.md`): 21st MCP och Aceternitys MCP genererar komponenter med egen stil. Används de, så görs det när biblioteket byggs, aldrig i ett kundbygge.

## 11. Öppet och overifierat

- Temafilen är provkompilerad men inte provad i ett Astro-bygge eller i en webbläsare, och inte med shadcn:s komponenter på en provsida ⚠️.
- Om eslint-pluginets `detectComponentClasses` känner igen klasser i en importerad fil i lagret `components` ⚠️.
- Hur Motions style-attribut beter sig under vår CSP ⚠️.
- Om `MotionConfig reducedMotion="user"` stänger av `filter` ⚠️.
- Terrazzos `prepare` med `[data-kit="…"]` och resolverns modifier `kit` ⚠️ (redan öppet i `guide/bilaga-e-oppna-fragor.md`).
- Om 21st.dev:s komponenter är skrivna för Tailwind 3 eller 4, och om de använder shadcn-variabler, varierar och är inte granskat ⚠️.
- Hur stor del av besökarna som har en webbläsare äldre än Safari 16.4 ⚠️.
- Priserna för 21st MCP ⚠️.
