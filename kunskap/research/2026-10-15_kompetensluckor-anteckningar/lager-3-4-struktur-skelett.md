# Lager 3 (Struktur) och lager 4 (Skelett): kandidater, verktyg och källor för Nortropic (oktober 2026)

GitHub-data (stjärnor, licens, senaste push = `pushed_at`) kontrollerades **2026-10-13** via GitHub MCP `search_repositories` (minimal_output=false). Källan för varje tabellrad är repo-länken i raden. Kandidaterna bedöms mot fyra luckor: **[A]** IA-skill (sitemap, navigation, sidnamn, URL-konventioner, lokal SEO-struktur), **[B]** trädtest och kortsortering, inklusive AI-proxy, **[C]** ett sammanhängande Astro-sektionsbibliotek med 2–3 varianter per sektion och delade tokens, och **[D]** tillgängliga, no-JS-vänliga primitiver för Astro. Domskalan är Ta in / Pröva / Bevaka / Avstå. ⚑ betyder licens- eller aktivitetsflagga. Budgeten för webbsökningar tog slut mot slutet av arbetet, så det som inte hann verifieras står under respektive "Gaps".

## 1. Vilka Astro-teman, startmallar och sektionsbibliotek passar bäst som källa till ett sammanhängande, tillgängligt sektionsbibliotek för svenska småföretag?

### Takeaway
Ingen kandidat levererar det Nortropic behöver färdigt, alltså no-JS-först, hantverkarsektioner och delade tokens. Biblioteket måste därför byggas själv, men det finns två starka MIT-källor. **AstroWind** har 37 typade sektions-widgets, en native `<details name>`-FAQ utan JS, shadcn-kompatibla tokens, 16 agent-skills och dokumenterad deploy till Cloudflare Workers. **Fulldev UI** har bredast utbud av just småföretagssektioner (13 hero, 7 services, 5 reviews, 4 FAQ, 3 contact), men dess interaktiva delar kräver JS och FAQ-svaren är dolda utan JS. Tokenlagret bör följa de shadcn-namn som AstroWind, Basecoat, Fulldev och bejamas redan delar, med DTCG 2025.10 som källformat. CodeStitch ligger närmast målgruppen men är kommersiell och har ogranskade villkor. Tailwind Plus tillåter klientsajter men förbjuder teman, startkit, "website builders" och omdistribution.

### Cited Findings

#### GitHub-data (kontrollerad 2026-10-13)

| Kandidat | Repo | ★ | Licens (GitHub-API) | Senaste push | Not |
|---|---|---|---|---|---|
| AstroWind | [arthelokyo/astrowind](https://github.com/arthelokyo/astrowind) | 6 040 | MIT | 2026-09-12 | 1 685 forks, 3 öppna issues |
| Fulldev UI | [fulldotdev/ui](https://github.com/fulldotdev/ui) | 613 | MIT | 2026-10-11 | skapad 2024-01-08 |
| Starwind UI | [starwind-ui/starwind-ui](https://github.com/starwind-ui/starwind-ui) | 747 | MIT | 2026-10-06 | skapad 2025-02-21; Pro-delen kommersiell ⚑ |
| bejamas/ui | [bejamas/ui](https://github.com/bejamas/ui) | 239 | MIT | 2026-10-13 | skapad 2025-09-18 (ung) |
| Basecoat | [hunvreus/basecoat](https://github.com/hunvreus/basecoat) | 4 362 | MIT | 2026-07-21 | 36 öppna issues |
| Accessible Astro Starter | [incluud/accessible-astro-starter](https://github.com/incluud/accessible-astro-starter) | 1 188 | MIT | 2026-09-12 | |
| Accessible Astro Components | [incluud/accessible-astro-components](https://github.com/incluud/accessible-astro-components) | 569 | MIT | 2026-09-12 | 25 öppna issues |
| daisyUI | [saadeghi/daisyui](https://github.com/saadeghi/daisyui) | 42 582 | MIT | 2026-10-13 | |
| HyperUI | [markmead/hyperui](https://github.com/markmead/hyperui) | 12 256 | MIT | 2026-10-10 | 0 öppna issues |
| Flowbite | [themesberg/flowbite](https://github.com/themesberg/flowbite) | 9 366 | MIT | 2026-06-27 | 258 öppna issues |
| Preline UI | [htmlstreamofficial/preline](https://github.com/htmlstreamofficial/preline) | 6 484 | Other ⚑ (MIT + "Preline UI Fair Use License") | 2026-08-31 | |
| ScrewFast | [mearashadowfax/ScrewFast](https://github.com/mearashadowfax/ScrewFast) | 1 424 | MIT | 2026-10-11 | bygger på Preline |
| Astroplate | [zeon-studio/astroplate](https://github.com/zeon-studio/astroplate) | 1 212 | MIT | 2026-08-16 | |
| Starlight | [withastro/starlight](https://github.com/withastro/starlight) | 9 403 | MIT | 2026-10-13 | dokumentationstema |
| shadcn/ui (tokenreferens) | [shadcn-ui/ui](https://github.com/shadcn-ui/ui) | 125 505 | MIT | 2026-10-12 | |
| CodeStitch Intermediate Astro-kit | [CodeStitchOfficial/Intermediate-Astro-Decap-CMS](https://github.com/CodeStitchOfficial/Intermediate-Astro-Decap-CMS) | 115 | CC0-1.0 | 2026-10-13 | själva stitch-biblioteket är kommersiellt ⚑ |
| CodeStitch Advanced Astro i18n | [CodeStitchOfficial/Advanced-Astro-i18n](https://github.com/CodeStitchOfficial/Advanced-Astro-i18n) | 64 | CC0-1.0 | 2026-10-11 | |
| Style Dictionary | [style-dictionary/style-dictionary](https://github.com/style-dictionary/style-dictionary) | 4 858 | Apache-2.0 | 2026-10-10 | |
| DTCG-specifikationen | [design-tokens/community-group](https://github.com/design-tokens/community-group) | 2 148 | Other (W3C CG) | 2026-09-08 | |
| utopia-core | [trys/utopia-core](https://github.com/trys/utopia-core) | 139 | ⚑ ingen licens i API-svaret | 2024-09-19 | ⚑ inaktiv sedan 2024 |

#### AstroWind
- Beskriver sig som "a free and open-source template to make your website using Astro v7 + Tailwind CSS v4". README listar "30+ page-section widgets (heroes, features, bento, tabs, pricing with comparison table, FAQ accordion, testimonials, team, timeline, gallery, projects, countdown, newsletter…) typed and composable", "shadcn/ui-compatible design tokens (`bg-background`, `text-foreground`, `border-border`…) derived from the theme variables" och "AI-ready: `AGENTS.md` and step-by-step skills in `.agents/skills/`". — [AstroWind README](https://github.com/arthelokyo/astrowind/blob/main/README.md)
- "Very little vanilla javascript is used only to provide basic functionality". Deploy till Cloudflare Workers sker som "static assets, no adapter needed; the `wrangler.jsonc` in the repo points Cloudflare at `dist/`". v1 är i underhållsläge och "new development goes to AstroWind v2 (October 2026)". README påstår själv Lighthouse 100/100/100/100. — [AstroWind README](https://github.com/arthelokyo/astrowind/blob/main/README.md)
- `src/components/widgets/` innehåller 37 sektioner: Announcement, Bento, BlogHighlightedPosts, BlogLatestPosts, Brands, CallToAction, Comparison, Contact, Content, Countdown, FAQs, FeatureTabs, Features, Features2, Features3, Footer, Gallery, Header, Hero, Hero2, HeroText, Integrations, Newsletter, Note, Pricing, Projects, QuickStart, Quote, SocialProof, Stats, Steps, Steps2, StickyCTA, Team, Testimonials, Timeline och Video. Sex sidor i `src/pages/landing/` visar hur de kombineras. — [widgets-mappen](https://github.com/arthelokyo/astrowind/tree/main/src/components/widgets); [README](https://github.com/arthelokyo/astrowind/blob/main/README.md)
- Tokenlagret ligger i tre filer. `CustomStyles.astro` definierar `--aw-font-sans/serif/heading`, `--aw-color-primary/secondary/accent`, `--aw-color-text-heading/default/muted` och `--aw-color-bg-page` i `:root` och `.dark`. `tailwind.css` har `@theme` och `shadcn.css` har härledda shadcn-variabler. — [CustomStyles.astro](https://github.com/arthelokyo/astrowind/blob/main/src/components/CustomStyles.astro); [README](https://github.com/arthelokyo/astrowind/blob/main/README.md)
- FAQ-widgeten: "One `<details name="…">` group per widget instance, so opening a question closes the others of the same FAQ (native exclusive accordion, no JS)". Varje `<summary>` innehåller en `<h3>`. FAQPage-JSON-LD finns som tillval. Varje rad har klasserna `motion-safe:md:opacity-0 motion-safe:md:intersect:animate-fade`. — [FAQs.astro](https://github.com/arthelokyo/astrowind/blob/main/src/components/widgets/FAQs.astro)
- Mobilmenyns knapp är `<button type="button" … aria-expanded="false" data-aw-toggle-menu>`, alltså ett attribut som skript styr. — [ToggleMenu.astro](https://github.com/arthelokyo/astrowind/blob/main/src/components/common/ToggleMenu.astro)
- `.agents/skills/` innehåller 16 skills, bland annat add-structured-data, use-widgets, write-landing-page, deploy-cloudflare, use-shadcn-tokens, configure-contact-form och customize-header. — [skills-mappen](https://github.com/arthelokyo/astrowind/tree/main/.agents/skills)
- Strukturerad data: startsidan ger `WebSite` och `Organization`, blogginlägg ger `BlogPosting` och `BreadcrumbList`, FAQ-widgeten ger `FAQPage`, och metadata hanteras via `astro-seo`. Skillen föreskriver "Always use `set:html` with `JSON.stringify`". — [add-structured-data.md](https://github.com/arthelokyo/astrowind/blob/main/.agents/skills/add-structured-data.md)

#### Fulldev UI
- "A shadcn-compatible set of components built for Astro, designed for content-driven websites". README nämner "Vanilla Astro Components — No framework dependencies", "100+ Components & Blocks" och Tailwind CSS v4. Initiering med shadcn-CLI "adds the theme tokens to your stylesheet". Komponenterna kräver `<body class="@container">` eftersom de använder container queries. Det finns en agent-skill: `npx skills add fulldotdev/ui --skill fulldev-ui`. — [Fulldev README](https://github.com/fulldotdev/ui/blob/main/README.md)
- Blocken i repot (räknade per filnamn): hero-1…13, services-1…7, reviews-1…5, faqs-1…4, features-1…6, contact-1…3, cta-1…8, header-1…5, footer-1…3, logos-1…3, content-1…4, pricing-1…3, products-1…5 och articles-1…4. Det finns inget gallery-, steps- eller serviceområdesblock. — [blocks-mappen](https://github.com/fulldotdev/ui/tree/main/src/components/blocks)
- Webbplatsen beskriver temningen som "Customize color, radius, spacing, and visual tone through CSS variables and Tailwind conventions" och har stilarna Vega, Nova, Maia, Lyra, Mira, Luma, Sera och Rhea. — [ui.full.dev](https://ui.full.dev/)
- `faqs-1` använder Accordion. `accordion.astro` importerar `@data-slot/accordion` i ett `<script>`, och `accordion-content.astro` sätter `hidden` till true som standard. Utan JS är FAQ-svaren alltså dolda. — [faqs-1.astro](https://github.com/fulldotdev/ui/blob/main/src/components/blocks/faqs-1.astro); [accordion.astro](https://github.com/fulldotdev/ui/blob/main/src/components/ui/accordion/accordion.astro); [accordion-content.astro](https://github.com/fulldotdev/ui/blob/main/src/components/ui/accordion/accordion-content.astro)
- Karusellen är "built using Embla". — [ui.full.dev/llms.txt](https://ui.full.dev/llms.txt)

#### Starwind UI och Starwind Pro
- "Astro-first, framework-portable UI components you can own". README utlovar "Animated by Default … Tailwind CSS v4" och beskriver en Runtime med "shared accessible behavior". Skills, en MCP-server och llms.txt finns. — [Starwind README](https://github.com/starwind-ui/starwind-ui/blob/main/README.md)
- Startsidan anger "55 styled components • 36 accessible primitives" och "Ship zero-JS components by default". — [starwind.dev](https://starwind.dev/)
- Ändå krävs JS för accordion. Changelog säger "Rebuilt Accordion on Starwind Runtime for disclosure state and keyboard behavior", och i rå-HTML-exemplet har panelen `role="region" hidden` och initieras med `createAccordion(root)`. Detta motsäger zero-JS-påståendet för interaktiva komponenter. — [Accordion-dokumentation](https://starwind.dev/docs/components/accordion/); [Accordion primitive](https://starwind.dev/docs/primitives/accordion/)
- Starwind Pro ⚑ har "388 installable blocks across 41 categories", bland annat Hero, Feature, Testimonial, Pricing, Services, CTA och Footer. Priset är en engångsbetalning: Individual $149 ("Personal + client projects") och Team $399, under rubriken "Paid once · updated for life". Installation kan ske via MCP (`npx -y @starwind-ui/mcp`) och skills (`npx skills@latest add starwind-ui/skills`). — [pro.starwind.dev](https://pro.starwind.dev/)

#### bejamas/ui
- "Astro UI components you copy into your project. Zero-JS by default, built on Tailwind CSS v4, following the shadcn/ui approach". Biblioteket har "26+ components". Interaktiva komponenter använder `@data-slot`, beskrivet som "headless behavior primitives … the 'Radix for vanilla JS'", och beteendet hålls som ett beroende. — [bejamas/ui README](https://github.com/bejamas/ui/blob/main/README.md)

#### Basecoat
- "a Tailwind CSS, vanilla HTML/CSS/JavaScript implementation of the shadcn/ui design system … without React, Radix, or framework runtime dependencies". README nämner "Semantic HTML-first components" och "Small vanilla JavaScript for components that need behavior". Stilpaketen heter Vega, Nova, Maia, Lyra, Mira, Luma, Sera och Rhea, och biblioteket är "Compatible with shadcn/ui themes". CSS:en är uppdelad i base-tokens, komponentstruktur och stilpaket. — [Basecoat README](https://github.com/hunvreus/basecoat/blob/main/README.md)
- Accordion: "Basecoat uses native `<details>` and `<summary>` elements for disclosure semantics". JS behövs bara för att begränsa till en öppen rad och för att blockera inaktiverade rader. — [Basecoat Accordion](https://basecoatui.com/components/accordion/)

#### Accessible Astro (Incluud)
- Startmallen beskrivs som "An Accessible, WCAG compliant Starter Theme for Astro 6+ including … better focus-outline, landmarks, semantics, interactive components and skip-link navigation. Ships with Tailwind 4". — [accessible-astro-starter](https://github.com/incluud/accessible-astro-starter)
- Komponentbiblioteket har 23 mappar: accordion, avatar, badge, breadcrumbs, button, card, darkmode, data-table, drawer, forms, heading, highcontrast, link, media, modal, notification, pagination, reducedmotion, skiplink, tabs, toast, tooltip och video. — [components-mappen](https://github.com/incluud/accessible-astro-components/tree/main/src/components)
- `AccordionItem` bygger på `<details name>` med en `<Heading>` (h3 som standard) inuti `<summary>`. Övergångar sker med `::details-content`, `interpolate-size` används bara under `prefers-reduced-motion: no-preference`, och färgerna sätts med `light-dark()`. — [AccordionItem.astro](https://github.com/incluud/accessible-astro-components/blob/main/src/components/accordion/AccordionItem.astro)

#### daisyUI, HyperUI, Flowbite och Preline
- daisyUI 5.7.50 har 35 inbyggda teman. Färgerna är semantiska variabler (`--color-primary`, `--color-base-100…300`) med motsvarande `-content`-variabler för text. Därtill finns `--radius-selector/field/box`, `--size-selector/field`, `--border`, `--depth` och `--noise`. Egna teman skapas med `@plugin "daisyui/theme"`. — [daisyUI themes](https://daisyui.com/docs/themes/)
- daisyUI:s accordion "works with radio inputs or details elements", och "If you want the collapsed content to be searcheable in browser use the Accordion using details." — [daisyUI accordion](https://daisyui.com/components/accordion/)
- daisyUI:s modal finns i fyra varianter: `<dialog>` med `showModal()` (kräver JS), popover via HTML-attribut (ingen JS, men bakgrunden låses inte), samt checkbox och ankarlänk (legacy). — [daisyUI modal](https://daisyui.com/components/modal/)
- HyperUI har 22 marknadsföringskategorier med 171 komponenter, bland annat Footers 24, Contact Forms 10, Headers 8, CTAs 8, FAQs 6, Team Sections 6, Logo Clouds 4, Sections 4 och Testimonials 3. Stats och Steps saknas. — [HyperUI marketing](https://www.hyperui.dev/components/marketing)
- HyperUI:s FAQ bygger på `<details class="group …">` och `<summary>` med `group-open:-rotate-180` och innehåller ingen script-tagg. Det finns 3 varianter, var och en i ljus och mörk version. — [HyperUI FAQs](https://www.hyperui.dev/components/marketing/faqs)
- Flowbite i Astro: CDN-skriptet "will make them interactive automatically without needing to write custom JavaScript". Koden är MIT och dokumentationen CC BY 3.0. Det finns en Pro-version med EULA ⚑. — [Flowbite Astro-guide](https://flowbite.com/docs/getting-started/astro/)
- Prelines accordion: "Requires JS", och panelen "is hidden by default, until the collapse plugin adds the appropriate classes". — [Preline accordion](https://preline.co/docs/accordion.html)
- Prelines licens ⚑ är dubbel, MIT plus "Preline UI Fair Use License". Härledda mallar, teman och sidbyggare är tillåtna förutsatt att "Proper attribution must be given to the original author, including the name "Preline UI" and a link to the original repository". Upphovspersonen förbehåller sig rätten att säga upp licensen. — [Preline LICENSE](https://github.com/htmlstreamofficial/preline/blob/main/LICENSE)
- ScrewFast har topics `preline` och `preline-ui`. Sektionsmapparna är features, insights, landing, misc, navbar&footer, pricing, products och testimonials. — [ScrewFast](https://github.com/mearashadowfax/ScrewFast); [sections-mappen](https://github.com/mearashadowfax/ScrewFast/tree/main/src/components/sections)
- Astroplate konfigureras via `config.json`, `menu.json`, `social.json` och `theme.json`. `theme.json` innehåller färger för default och darkmode, typsnitten Heebo och Signika samt `font_size` med base 16 och scale 1.2. — [Astroplate config](https://github.com/zeon-studio/astroplate/tree/main/src/config); [theme.json](https://github.com/zeon-studio/astroplate/blob/main/src/config/theme.json)

#### Kommersiella källor
- Tailwind Plus ⚑: Tailwind UI bytte namn till Tailwind Plus den 4 mars 2025. Produkten är "still a one-time purchase with lifetime access" och omfattar komponenter, mallar och "our Catalyst UI kit". Inget pris anges. — [Tailwind Plus-bloggen](https://tailwindcss.com/blog/tailwind-plus)
- Tailwind UI-licensen, läst i en publik kopia eftersom den officiella licenssidan låg bakom inloggning vid kontrollen. Tillåtet: "create unlimited End Products for unlimited Clients". Förbjudet: "create End Products that are designed to allow an End User to build their own End Products", "Creating a 'website builder' project…", "Creating a theme, template, or project starter kit … available either for sale or for free" och "Creating a repository of your favorite Tailwind UI components … and publishing it publicly". Derivat "are subject to this license". — [licenskopia (rjvim/blog-tailwind-markdoc)](https://github.com/rjvim/blog-tailwind-markdoc/blob/main/LICENSE.md); [officiell licenssida](https://tailwindcss.com/plus/license)
- CodeStitch ⚑ erbjuder "Hand-written, mobile-first HTML and CSS website templates with no frameworks". Sajten säger "All templates use the same design system, so you can combine any templates together", anger "over 1300+ templates", Figma-filer "with all 4 breakpoints" och målgruppen "real small businesses that most freelancers will be working with". — [codestitch.app](https://codestitch.app/)
- CodeStitch-priser: Basic $0 med begränsad åtkomst, Pro $30/mån eller $324/år (alla stitches och Figma), Freelancer $50/mån eller $540/år. — [CodeStitch pricing](https://codestitch.app/pricing)
- Relume ⚑ genererar först en sitemap ur en prompt och sedan wireframes ur "1,000+" komponenter. Export sker till Figma och Webflow. Starter kostar $38/mån och Pro $76/mån. Granskningen konstaterar att "Relume's strength is structure, not visual creativity" (hackdesign, 2025-12-15). Relumes egen sida nämner "export to Webflow, Figma & React" och "human-made component system behind 2M+ websites". — [hackdesign: Relume](https://www.hackdesign.org/toolkit/relume/); [relume.ai](https://www.relume.ai/)

#### Layout- och tokenkällor
- Every Layout ⚑ ($69) av Heydon Pickering och Andy Bell innehåller 12 layoutprimitiver (Stack, Box, Center, Cluster, Sidebar, Switcher, Cover, Grid, Frame, Reel, Imposter, Icon) plus Container. Målet är "doing away with `@media` breakpoints, "magic numbers", and other hacks". — [every-layout.dev](https://every-layout.dev/)
- Utopia: "Utopia is not a product, a plugin, or a framework". Den är skapad av James Gilyead och Trys Mudford med stöd från Clearleft och har kalkylatorer för Type, Space, Grid och Clamp. — [utopia.fyi](https://utopia.fyi/)
- Design Tokens-specifikationen 2025.10 blev "first stable version" den 28 oktober 2025. Den stöder teman och lägen, Display P3 och Oklch samt alias. Referensimplementationer är Style Dictionary, Tokens Studio och Terrazzo. — [W3C DTCG-meddelande](https://www.w3.org/community/design-tokens/2025/10/28/design-tokens-specification-reaches-first-stable-version/)
- Atomic Design (Frost 2016): "Organisms are relatively complex components that form discrete sections of an interface", "Templates place components within a layout and demonstrate the design's underlying content structure", "Pages are specific instances of templates …". Boken betonar också att "Atomic design is not a linear process" och kallar det "a mental model". — [Atomic Design kap. 2](https://atomicdesign.bradfrost.com/chapter-2/)
- Starlight: "Build beautiful, accessible, high-performance documentation websites with Astro". — [withastro/starlight](https://github.com/withastro/starlight)

### Inferences

#### Bedömning per kandidat

| Kandidat | Lucka | Förankring | Passform (statisk Astro, Cloudflare, no-JS, svenska) | Extrahera eller runtime | Dom |
|---|---|---|---|---|---|
| AstroWind | C (+A, E) | Sektioner som "organisms", shadcn-tokens, native exclusive accordion | Hög. Statisk output och deploy till CF Workers är dokumenterade, FAQ fungerar utan JS och i18n-konfig finns. Risker: mobilmenyn styrs av skript, och `intersect`-animationerna kan dölja innehåll utan JS (overifierat). | Extrahera widgetkatalog, props-typer, FAQ-mönster och skill-formatet. Forka inte som kundbas. | **Ta in** – bästa referensarkitekturen, men sektionerna ska skrivas om i Nortropics tokens och v2 behöver bevakas. |
| Fulldev UI | C | shadcn-registry och presets, block som tar innehåll som props, container queries | Medel. Ren Astro med Tailwind 4, men accordion, karusell m.m. kräver JS och FAQ-svaren är `hidden` utan JS. | Hämta block med shadcn-CLI till bibliotekets repo, byt interaktiva delar mot native element och behåll block-API:t. | **Pröva** – bredast variantutbud för hantverkarsektioner, men måste göras JS-fritt. |
| CodeStitch ⚑ | C | Handskriven mobile-first HTML/CSS med ett delat designsystem | Hög för målgruppen. Vanilla CSS behöver skrivas om till Tailwind och Nortropics tokens. Astro-kiten är CC0. | Extrahera mönster om villkoren tillåter det. Inget runtime-beroende. | **Pröva** – närmast småföretagssajter, men läs villkoren först. |
| HyperUI | C | Copy-paste-komponenter i Tailwind v4 | Hög. Ren HTML, FAQ via `<details>`, 24 footers och 10 kontaktformulär. | Kopiera och tokenisera om. | **Pröva** – MIT-källa för varianter av footer, header, kontakt och FAQ. |
| Accessible Astro (starter + components) | D (+C) | WCAG, landmärken, skip-link | Hög. `.astro`-komponenter, `<details name>`, `light-dark()` och stöd för reducerad rörelse. | Extrahera a11y-mönster för skiplink, brödsmulor, formulär och accordion. | **Ta in** – a11y-referens för atomer och molekyler. |
| Basecoat | D (+tokens) | shadcn-designsystemet i semantisk HTML, struktur skild från stil | Hög. Ingen React, native details och lite vanilla-JS. | Runtime-CSS (`basecoat-css`) för atomer, eller extrahera CSS-arkitekturen. | **Pröva** – kandidat för primitivlagret. |
| Starwind UI (fri) | D | shadcn-ergonomi med delad Runtime | Låg till medel. Interaktiva delar kräver Runtime-JS. | Runtime-beroende | **Bevaka** – bra DX (MCP, skills) men byggt JS-först. |
| Starwind Pro ⚑ | C | 388 block | Okänd. Licenstexten är inte läst. | Extrahera bara om licensen tillåter ett internt bibliotek. | **Bevaka** |
| bejamas/ui | D | shadcn-modellen med @data-slot | "Zero-JS by default" låter bra, men biblioteket är ungt och saknar sektioner. | Extrahera | **Bevaka** |
| daisyUI | C (tokens) | Semantiska färgpar och CSS-komponentklasser | Tekniskt hög (enbart CSS). Risk för igenkännbar "daisy-look". | Låna tokenmodellen, inte komponentklasserna. | **Bevaka** |
| Tailwind Plus ⚑ | C | Kommersiellt bibliotek | Klientsajter tillåtna. Teman, startkit, "website builders" och omdistribution förbjudna. Inte Astro-format. | Extrahera bara inom licensen, eftersom derivat förblir under den. | **Bevaka** – köp bara om de öppna källorna inte räcker designmässigt. |
| Relume ⚑ | A+C (benchmark) | Prompt → sitemap → wireframe ur ett mänskligt gjort system | Export till Webflow, Figma och React, inte Astro. | Studera flödet som modell för Nortropics egen process. | **Bevaka** |
| Every Layout ⚑ | C (grid/spacing) | Intrinsiska layoutprimitiver | Hög, ren CSS. | Destillera till en layout-skill och 12 primitiver i biblioteket. | **Ta in** |
| Utopia | C (typ- och avståndstokens) | Flytande skalor med clamp | Hög, ren CSS. | Generera tokens när biblioteket byggs. | **Ta in** (verktygen; npm-paketet är inaktivt) |
| DTCG 2025.10 + Style Dictionary | C (tokens) | W3C CG-standard | Hög, sker vid byggtid. | DTCG-JSON → Style Dictionary → Tailwind 4 `@theme`. | **Ta in** |
| Astroplate | C | JSON-temakonfig | Överlappar AstroWind. | – | **Avstå** – tillför inget som AstroWind saknar. |
| ScrewFast | C | Preline | Kräver JS och Fair Use-licens. | – | **Avstå** |
| Flowbite | C/D | Data-attribut-JS | Interaktivitet via JS, lägre aktivitet, Pro kommersiell. | – | **Avstå** |
| Preline UI ⚑ | C/D | JS-plugins | "Requires JS", Fair Use-licens. | – | **Avstå** |
| Starlight | – | Dokumentationssajter | Fel domän. | – | **Avstå** |

#### Föreslagen sammansättning av Nortropics eget bibliotek
- **Sektionstaxonomi** med källor per sektion:
  - Hero: AstroWind Hero, Hero2 och HeroText; Fulldev hero-1…13.
  - Tjänster: AstroWind Features 1–3 och FeatureTabs; Fulldev services-1…7.
  - Bevis och arbeten: AstroWind Gallery och Projects.
  - Omdömen: AstroWind Testimonials och SocialProof; Fulldev reviews-1…5; HyperUI Testimonials.
  - Process: AstroWind Steps, Steps2 och Timeline.
  - Om oss: AstroWind Team och Content; HyperUI Team.
  - FAQ: AstroWind FAQs; HyperUI FAQs.
  - Kontakt: AstroWind Contact; Fulldev contact-1…3; HyperUI Contact Forms.
  - Footer: HyperUI Footers (24); Fulldev footer-1…3.
  - **Serviceområde finns inte som egen sektion i något av de granskade biblioteken.** Den måste designas från grunden, till exempel som en ortlista med `areaServed` och valfri statisk karta. Se fråga 4.
- **Tokens:** Gör shadcn-namnen till bibliotekets publika API (`background/foreground/primary/muted/border/ring`). Både AstroWind, Basecoat, Fulldev och bejamas talar dem, och de matchar den befintliga ui-styling-skillen. Lagra sanningen som DTCG 2025.10-JSON, bygg med Style Dictionary och generera flytande typ- och avståndsskalor med Utopia. Layouten använder Every Layout-primitiver.
- **Atomic Design-mappning:**
  - Atomer och molekyler: Basecoat och Accessible Astro.
  - Organismer: sektionerna, var och en med 2–3 varianter.
  - Templates: sidtyperna (startsida, tjänstesida, kontakt, ortsida).
  - Pages: kundinstansen, där AI:n bara väljer inom systemet.
- **No-JS-regler:**
  - Inga scroll-animationer som börjar på `opacity-0` om de inte faller tillbaka till synligt innehåll.
  - FAQ via `<details name>`.
  - Fulldevs och Starwinds accordion används inte i någon kundsektion.

### Gaps
- CodeStitch användarvillkor (licens för stitches i ett eget internt bibliotek) kunde inte läsas eftersom hämtningen misslyckades.
- Den officiella Tailwind Plus-licensen låg bakom inloggning. Tolkningen bygger på en publik kopia av Tailwind UI-licensen, som kan vara äldre.
- Starwind Pros licenstext lästes inte.
- AstroWind v2 (oktober 2026) granskades inte och kan ändra strukturen.
- Det är overifierat om AstroWinds `intersect`-variant kräver JS (IntersectionObserver). Om så är fallet kan sektionerna vara osynliga på desktop utan JS, så detta måste testas med JS avstängt.
- Astroplates sektionslista granskades inte.
- Ingen kandidat kördes, så visuell kvalitet och verklig a11y är inte testade.

## 2. Vilka tillgängliga komponentprimitiver fungerar i Astro utan tung JS, och vad rekommenderar W3C APG och GOV.UK för navigation, formulär och disclosure?

### Takeaway
I oktober 2026 räcker native HTML som primitivlager:
- `<details name>` för FAQ och disclosure. `<details>` har varit Baseline sedan 2020, och `name` stöds i alla stora motorer sedan 2024.
- Popover API (Baseline 2025) för menyer och flyout-innehåll.
- `<dialog>` med Invoker Commands (Baseline sedan december 2025) för modaler utan skript.

Polyfills behövs bara som förbättring. APG säger att webbplatsnavigation ska använda disclosure-mönstret, inte ARIA-rollen `menu`. GOV.UK kräver HTML-först, accordion bara när det finns belägg och validering på servern med felsammanfattning. Bland de granskade Astro-biblioteken klarar AstroWind, Accessible Astro, HyperUI och Basecoat disclosure utan JS, medan Fulldev, Starwind och Preline inte gör det. Headless JS-bibliotek (Zag, React Aria m.fl.) behövs bara för komplexa öar som en bokningskalender.

### Cited Findings

#### Native HTML-primitiver
- `<details>` har varit Baseline widely available sedan januari 2020. Om `name`: "This attribute enables multiple `<details>` elements to be connected, with only one open at a time. This allows developers to easily create UI features such as accordions without scripting." Den implicita rollen är `group`. — [MDN details](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/details)
- Stöd för `name` på `<details>`: Chrome 120, Edge 120, Firefox 130 och Safari 17.2. Firefox 130 kom i september 2024. — [web.dev, september 2024](https://web.dev/blog/web-platform-09-2024)
- Skärmläsarvarningar för `<summary>` (Scott O'Hara, publicerad 2018-09-03, uppdaterad 2021-10-03):
  - "JAWS with Firefox and Chrome will not announce, or allow users to navigate to, headings within a `summary`".
  - "TalkBack ignores headings nested within the `summary` element".
  - NVDA och VoiceOver exponerar rubrikerna.
  - Med NVDA och Chrome annonseras tillståndsbyten inte pålitligt.

  — [scottohara.me](https://scottohara.me/blog/2018/09/03/details-and-summary.html)
- `<dialog>` har varit Baseline widely available sedan mars 2022.
  - Invoker commands öppnar och stänger utan skript: `<button command="show-modal" commandfor="my-dialog">`.
  - `<form method="dialog">` stänger dialogen utan skript.
  - `closedby` styr Esc och light dismiss.
  - Fokushantering: "When using `HTMLDialogElement.showModal()` … focus is set on the first nested focusable element", och "Modal dialog boxes block interaction with other UI elements, making the rest of the page inert".

  — [MDN dialog](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/dialog)
- Invoker Commands API är "Baseline 2025, Newly available … since December 2025". MDN skriver: "This can be advantageous for built-in commands as the user does not have to wait for JavaScript to download and execute to make these buttons interactive." — [MDN Invoker Commands](https://developer.mozilla.org/en-US/docs/Web/API/Invoker_Commands_API)
- Popover API är "Baseline 2025 Newly available", det vill säga "Since January 2025". `popovertarget` och `popovertargetaction` fungerar deklarativt, och "Popovers created using the Popover API are always non-modal". — [MDN Popover API](https://developer.mozilla.org/en-US/docs/Web/API/Popover_API)

#### Polyfills och headless-bibliotek (GitHub-data 2026-10-13)

| Kandidat | Repo | ★ | Licens | Senaste push | Kort fakta |
|---|---|---|---|---|---|
| Popover-polyfill | [oddbird/popover-polyfill](https://github.com/oddbird/popover-polyfill) | 366 | BSD-3-Clause | 2026-10-01 | Polyfyllning för `popover` och `popovertarget` |
| Invokers-polyfill | [keithamus/invokers-polyfill](https://github.com/keithamus/invokers-polyfill) | 158 | MIT | 2026-08-20 | |
| Zag | [chakra-ui/zag](https://github.com/chakra-ui/zag) | 5 230 | MIT | 2026-10-13 | "Build your design system in React, Solid, Vue, Svelte or Vanilla. Powered by finite state machines" |
| Headless UI | [tailwindlabs/headlessui](https://github.com/tailwindlabs/headlessui) | 28 774 | MIT | 2026-04-13 | Topics: react, vue (ingen vanilla) |
| Radix Primitives | [radix-ui/primitives](https://github.com/radix-ui/primitives) | 19 390 | MIT | 2026-10-13 | React; "Maintained by @workos" |
| Base UI | [mui/base-ui](https://github.com/mui/base-ui) | 11 139 | MIT | 2026-10-13 | React; "From the creators of Radix, Floating UI, and Material UI" |
| React Aria (react-spectrum) | [adobe/react-spectrum](https://github.com/adobe/react-spectrum) | 15 938 | Apache-2.0 | 2026-10-13 | React |
| Ariakit | [ariakit/ariakit](https://github.com/ariakit/ariakit) | 8 624 | ⚑ licens saknas i API-svaret | 2026-10-13 | React |
| Web Awesome | [shoelace-style/webawesome](https://github.com/shoelace-style/webawesome) | 1 363 | MIT | 2026-10-13 | Web components, "Upgrade to Pro" ⚑ |
| Pico CSS | [picocss/pico](https://github.com/picocss/pico) | 16 844 | MIT | ⚑ **arkiverat** | "Minimal CSS Framework for semantic HTML" |
| GOV.UK Frontend | [alphagov/govuk-frontend](https://github.com/alphagov/govuk-frontend) | 1 470 | MIT | 2026-10-13 | |

#### W3C WAI-ARIA Authoring Practices (APG)
- Navigation med disclosure:
  - Exemplet "does not use the menu role because it does not provide the complex functionality that assistive technologies expect" och "Typical site navigation does not need all the keyboard interactions specified by the menu and menubar pattern".
  - Tangentbordet använder Tab, Space/Enter och Escape. Escape stänger och flyttar fokus till knappen, vilket behövs för WCAG 2.1 1.4.13.
  - `aria-current="page"` och `aria-expanded` används.
  - Varning: "The code in this example is not intended for production environments", samt "No ARIA is better than Bad ARIA".

  — [APG Disclosure Navigation](https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/examples/disclosure-navigation/)
- Accordion: rubriktexten ligger i ett element med rollen `button` inuti ett rubrikelement, med `aria-expanded` och `aria-controls`. Rollen `region` är valfri, men undvik den när fler än cirka sex paneler kan vara öppna samtidigt. — [APG Accordion](https://www.w3.org/WAI/ARIA/apg/patterns/accordion/)
- Brödsmulor: "Breadcrumb trail is contained within a navigation landmark region" med ett tillgängligt namn, och "The link to the current page has aria-current set to page". — [APG Breadcrumb](https://www.w3.org/WAI/ARIA/apg/patterns/breadcrumb/)

#### GOV.UK Design System och Service Manual
- Progressive enhancement (senast uppdaterad 27 september 2024):
  - "Government services should be functional using only HTML" och "you should make your page work with HTML first".
  - "The HTML layer is fault-tolerant by design … The JavaScript layer is not fault-tolerant".
  - CSS och JS kan fallera på grund av "temporary network errors" och "corporate firewalls blocking, removing or changing content".

  — [GOV.UK Service Manual](https://www.gov.uk/service-manual/technology/using-progressive-enhancement)
- Accordion:
  - "Only use an accordion if there's evidence it's helpful".
  - "Do not use an accordion for content that all users need to see".
  - "Test your content without an accordion first".
  - "Do not put accordions within accordions".
  - Utan JS visas allt innehåll med sektionsrubrikerna som rubriker.

  — [GOV.UK Accordion](https://design-system.service.gov.uk/components/accordion/)
- Details:
  - Används "to make a page easier to scan when it contains information that only some users will need", men inte "to hide information that the majority of your users will need".
  - Kända problem: vissa användare tror att länken leder bort från sidan, och vissa röstassistenter kräver att man kallar den knapp.

  — [GOV.UK Details](https://design-system.service.gov.uk/components/details/)
- Navigation:
  - "Navigation is not a site map and does not need to list every part of your service".
  - Brödsmulor placeras "just before the `<main>` element" så att skip-länken hoppar över dem.

  — [GOV.UK Navigate a service](https://design-system.service.gov.uk/patterns/navigate-a-service/)
- Service navigation: menyknappen börjar med attributet `hidden` och har `aria-controls`. Sidan beskriver inte uttryckligen vad som händer utan JS. — [GOV.UK Service navigation](https://design-system.service.gov.uk/components/service-navigation/)
- Validering:
  - "You'll always need to carry out server side validation, even if you use client side validation".
  - Visa en "Error summary component at the top of the page, and move keyboard focus to it", och sätt prefixet "Error: " i sidtiteln.
  - Felmeddelanden placeras vid fälten, och användarens svar behålls.
  - "Do not validate when the user moves away from a field".
  - Lägg till `novalidate` och sätt inte `required`.

  — [GOV.UK Validation](https://design-system.service.gov.uk/patterns/validation/)

#### NN/g: dold eller synlig navigation
- Pernice och Budiu (26 juni 2016) testade 179 deltagare på sex webbplatser:
  - På desktop användes dold meny i 27 % av fallen, mot 48 % för synlig och 50 % för kombinerad navigation.
  - Upptäckbarheten av innehåll sjönk med mer än 20 % på sajter med dold navigation.
  - Uppgifterna tog minst 39 % längre tid på desktop.
  - Rekommendation för mobil: med fyra eller färre toppnivålänkar bör de vara synliga.

  — [NN/g Hamburger Menus](https://www.nngroup.com/articles/hamburger-menus/)

#### Hur de granskade Astro-biblioteken bygger disclosure (verifierat i kod eller dokumentation)

| Bibliotek | Implementation | Utan JS | Källa |
|---|---|---|---|
| AstroWind FAQs | `<details name>`, `<h3>` i `<summary>` | Fungerar ("no JS") | [FAQs.astro](https://github.com/arthelokyo/astrowind/blob/main/src/components/widgets/FAQs.astro) |
| Accessible Astro | `<details name>`, Heading i `<summary>` | Fungerar | [AccordionItem.astro](https://github.com/incluud/accessible-astro-components/blob/main/src/components/accordion/AccordionItem.astro) |
| HyperUI FAQ | `<details>` och `<summary>` | Fungerar | [HyperUI FAQs](https://www.hyperui.dev/components/marketing/faqs) |
| Basecoat | `<details>` och `<summary>` med JS för att begränsa till en öppen rad | Fungerar (bara begränsningen till en rad kräver JS) | [Basecoat Accordion](https://basecoatui.com/components/accordion/) |
| daisyUI | Radio-inputs eller `<details>` | Fungerar | [daisyUI accordion](https://daisyui.com/components/accordion/) |
| Fulldev UI | `@data-slot/accordion`, innehållet `hidden` som standard | Innehållet dolt | [accordion-content.astro](https://github.com/fulldotdev/ui/blob/main/src/components/ui/accordion/accordion-content.astro) |
| Starwind | Runtime med `createAccordion`, panelen `hidden` | Kräver JS enligt dokumentationen | [Starwind primitive](https://starwind.dev/docs/primitives/accordion/) |
| Preline | Plugin | "Requires JS" | [Preline accordion](https://preline.co/docs/accordion.html) |

#### Svensk lag (kontext)
- Lag (2023:254) om vissa produkters och tjänsters tillgänglighet:
  - 10 §: "Tjänster som tillhandahålls av mikroföretag behöver inte uppfylla tillgänglighetskraven".
  - Mikroföretag är företag med färre än tio anställda och en årsomsättning eller balansomslutning på högst 2 miljoner euro.
  - E-handelstjänster definieras som "tjänster som tillhandahålls på distans, genom webbplatser och tjänster för mobila enheter …".
  - Enligt Riksdagens data träder en ny lydelse i kraft den 20 november 2026, med oförändrad definition av e-handelstjänster.

  — [SFS 2023:254, riksdagen.se](https://data.riksdagen.se/dokument/sfs-2023-254.html)
- PTS är tillsynsmyndighet. — [EY, 22 maj 2025](https://www.ey.com/sv_se/insights/law/tillganglighetslagen-trader-i-kraft-den-28-juni-2025)

### Inferences

#### Rekommenderad primitivmatris (no-JS-först)

| Behov | Primitiv | Kräver JS? | Mönsterkälla |
|---|---|---|---|
| FAQ och "läs mer" | `<details name>`. Överväg ren text i `<summary>` med rubrik utanför, eller testa rubrik i `summary` med aktuella skärmläsare | Nej | MDN, GOV.UK Details/Accordion, O'Hara |
| Mobilmeny | Med ≤4 toppnivålänkar: visa dem synligt. Annars disclosure via `popover`/`popovertarget` eller `<details>`, aldrig ARIA `menu`. `aria-current="page"` på aktiv sida. | Nej (Baseline 2025) | APG Disclosure Navigation, NN/g |
| Bildgalleri/lightbox | Länk direkt till bilden som bas, `<dialog>` med `command="show-modal"` som förbättring | Nej (Baseline dec 2025) | MDN dialog och Invoker Commands |
| Språkväxlare | Vanliga länkar, eventuellt i en popover | Nej | APG (disclosure) |
| Formulär (offert/kontakt) | Native fält med `<label>`. Validering i Cloudflare Worker, felsammanfattning med fokus och "Fel: " i `<title>` | Nej | GOV.UK Validation |
| Brödsmulor | `<nav aria-label>` med lista och `aria-current="page"`, placerad före `<main>` | Nej | APG Breadcrumb, GOV.UK |
| Bokningskalender och andra komplexa widgets | Ö-komponent med Zag (vanilla, state machines) eller React Aria som React-ö | Ja, isolerat till ön | Zag, React Aria |

- Polyfills (oddbird, invokers-polyfill) behövs bara om besöksstatistiken visar äldre webbläsare. Eftersom de själva är JS ger de ingen hjälp när JS saknas, så basinnehållet måste fungera utan dem. Det är en slutsats från MDN:s Baseline-uppgifter.
- Zag passar ihop med den befintliga state-machine-skillen, eftersom båda bygger på tillståndsmaskiner.
- Tillgänglighetslagen undantar sannolikt de flesta av Nortropics kunder (mikroföretag) när det gäller tjänster. WCAG-nivån bör ändå vara standard i biblioteket, eftersom kunder med fler än 9 anställda och bokning/betalning kan omfattas av definitionen av e-handelstjänst. Det är en tolkning, inte juridisk rådgivning.

#### Bedömning
- Native `<details name>`: **Ta in**. Det är grunden för FAQ och disclosure.
- Popover API och `<dialog>` med Invoker Commands: **Pröva**. De är nya i Baseline, så använd dem bara där en länkbaserad grund finns.
- oddbird/popover-polyfill och invokers-polyfill: **Bevaka**. Ta in dem bara om statistiken kräver det.
- Zag: **Pröva**, men bara för komplexa öar.
- React Aria, Radix och Base UI: **Bevaka**. De är React-only och relevanta bara om en React-ö blir nödvändig.
- Headless UI: **Avstå**. React/Vue-only och lägre aktivitet (senaste push april 2026).
- Ariakit: **Bevaka**, eftersom licensen inte är verifierad.
- Web Awesome: **Bevaka**. Web components kräver JS och har en Pro-uppsäljning.
- Pico: **Avstå**, eftersom repot är arkiverat.
- GOV.UK Frontend som mönsterkälla: **Ta in** för beteenden och texter, men inte som runtime eller varumärke.

#### Källor att destillera lager 4-skills från (1–3)
1. **W3C WAI-ARIA APG**, tillsammans med MDN:s Baseline-status, för navigation, accordion och brödsmulor. — [APG Disclosure Navigation](https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/examples/disclosure-navigation/); [APG Accordion](https://www.w3.org/WAI/ARIA/apg/patterns/accordion/); [APG Breadcrumb](https://www.w3.org/WAI/ARIA/apg/patterns/breadcrumb/)
2. **GOV.UK Design System och Service Manual** för progressive enhancement, när accordion och details ska användas, och validering. — [Progressive enhancement](https://www.gov.uk/service-manual/technology/using-progressive-enhancement); [Validation](https://design-system.service.gov.uk/patterns/validation/)
3. **Frost (2016) Atomic Design** för hierarkin atomer → sidor, kompletterat med Every Layout och Utopia för grid och avstånd, samt **Wroblewski (2011) Mobile First** (A Book Apart, 17 oktober 2011, ämnen bland annat "Constraints" och "Capabilities"). — [Atomic Design kap. 2](https://atomicdesign.bradfrost.com/chapter-2/); [Mobile First](https://abookapart.com/products/mobile-first)

### Gaps
- Exakt Baseline-status för `name` på `<details>` och för `closedby` gick inte att verifiera. MDN:s kompatibilitetstabell renderades inte vid hämtningen.
- Skärmläsardata för rubriker i `<summary>` är från 2018–2021 och kan vara inaktuella. O'Haras uppföljning från 2022 lästes inte.
- Det är oklart hur GOV.UK Service navigation beter sig utan JS.
- DIGG:s webbriktlinjer (webbriktlinjer.se) kunde inte hämtas.
- Inga primitiver testades i verkliga skärmläsare.

## 3. Vilka verktyg stödjer IA-arbete (sitemap och flöden, kortsortering, trädtest, crawlers), och vad säger forskningen om LLM som proxy i trädtest?

### Takeaway
IA-skill-luckan kan täppas snabbt genom att anpassa `site-architecture` ur coreyhaines31/marketingskills (MIT, 54,5k★). Den levererar redan ASCII-träd, Mermaid-sitemap, URL-tabell, navigationsspec och internlänkplan, och har en profil för småföretag ("Small business: 1-2 levels … `/services/name`"). Två av dess regler strider dock mot primärkällor: tre-klicksregeln och att brödsmulor ska spegla URL:en. Det finns inget välskött open source-verktyg för trädtest. kort är GPL-3.0 och inaktivt sedan 2024, och cardsort (MIT-0) är inaktivt sedan 2023. Gratisnivåerna hos UXtweak (30 svar/mån) och Lyssna (15 svar) räcker för att validera generiska bransch-träd. Forskningen visar måttlig överensstämmelse mellan LLM och människor i kortsortering (kappa .60), men att LLM **inte** är en giltig proxy för människors framgång i trädtest: ChatGPT lyckades i 90–100 % av fallen mot 51 % för människor. En AI-proxy ska därför användas som rök-test som ger röda flaggor, aldrig som belägg. För crawling täcker Screaming Frogs gratisnivå (≤500 URL) alla småföretagssajter. Playwright, Crawlee och linkinator passar för CI.

### Cited Findings

#### IA-skills (GitHub-data 2026-10-13)

| Kandidat | Repo | ★ | Licens | Senaste push |
|---|---|---|---|---|
| marketingskills (site-architecture) | [coreyhaines31/marketingskills](https://github.com/coreyhaines31/marketingskills) | 54 526 | MIT | 2026-10-13 (skapad 2026-01-15) |
| claude-seo | [AgriciDaniel/claude-seo](https://github.com/AgriciDaniel/claude-seo) | 18 848 | MIT | 2026-10-04 (skapad 2026-02-07) |

- `site-architecture` (v2.1.0) triggas av "sitemap", "information architecture", "navigation design", "URL structure", "breadcrumbs" och "internal linking". Den levererar "Page Hierarchy (ASCII Tree)", "Visual Sitemap (Mermaid)", "URL Map Table", "Navigation Spec" och "Internal Linking Plan".
  - Profilen "Small business" anger "1-2 levels", "Home, Services, About, Contact" och `/services/name`.
  - Skillen innehåller också "The 3-Click Rule", "4-7 items max in the primary nav (more causes decision paralysis)" och "Breadcrumbs should mirror the URL hierarchy".
  - Länkregler: "No orphan pages" och "Descriptive anchor text".

  — [site-architecture SKILL.md](https://github.com/coreyhaines31/marketingskills/blob/main/skills/site-architecture/SKILL.md)
- marketingskills har också skills för schema, programmatic-seo, seo-audit, cro med flera. — [skills-mappen](https://github.com/coreyhaines31/marketingskills/tree/main/skills)
- claude-seo har 26 sub-skills, bland annat seo-local, seo-schema, seo-sitemap, seo-plan, seo-programmatic och seo-technical. — [claude-seo skills](https://github.com/AgriciDaniel/claude-seo/tree/main/skills)

#### Sitemap- och flödesverktyg
- Mermaid ([mermaid-js/mermaid](https://github.com/mermaid-js/mermaid)): 90 642★, MIT, push 2026-10-13. "Generation of diagrams like flowcharts or sequence diagrams from text". `site-architecture` använder `graph TD` med subgraphs per navigationszon. — [repo](https://github.com/mermaid-js/mermaid); [SKILL.md](https://github.com/coreyhaines31/marketingskills/blob/main/skills/site-architecture/SKILL.md)
- markmap ([markmap/markmap](https://github.com/markmap/markmap)): 13 163★, MIT, push 2026-09-12. "Build mindmaps with plain text".
- Relume ⚑: prompt → sitemap → wireframe. Se fråga 1. — [hackdesign](https://www.hackdesign.org/toolkit/relume/)

#### Kortsortering och trädtest
- [indigane/cardsort](https://github.com/indigane/cardsort): 32★, MIT-0, ⚑ senaste push 2023-10-14. "A tool for conducting a virtual card sorting", ren HTML hostad på GitHub Pages.
- [carlsonp/kort](https://github.com/carlsonp/kort): 16★, ⚑ GPL-3.0, ⚑ senaste push 2024-12-06. "A NodeJS application for conducting a variety of UX research methods". Topics: card-sorting, tree-testing, nps, sus och mongodb.
- Digital.gov (6 januari 2022, McHarg, Faied och Goldstein):
  - Kortsortering gjordes med GitHub-projekttavlor och 56 kort.
  - Trädtestet gjordes med en klickbar prototyp, 10 uppgifter och 11 deltagare.
  - Analysen gjordes i kalkylark och Sankey-diagram.
  - Slutsatsen var att "GitHub worked well to help us learn what we wanted to learn".

  — [Digital.gov](https://digital.gov/2022/01/06/open-source-information-architecture-design-using-the-tools-you-have-to-conduct-card-sorting-and-tree-testing)
- Lyssna ⚑: tree testing ("Assess and refine your information architecture to improve findability") och card sorting finns som funktioner. Free kostar $0 och ger 15 självrekryterade svar och 3 platser. Det framgår inte om trädtest ingår i Free. Growth kostar $166/mån. — [Lyssna pricing](https://www.lyssna.com/pricing/)
- UXtweak ⚑: Free ger 30 egna svar per månad och 1 aktiv studie. Plus kostar $59/mån vid årsbetalning. — [UXtweak pricing](https://www.uxtweak.com/pricing/)
- Enligt CleverX (11 december 2025, en aggregator) har Optimal Workshop (Treejack) en 14 dagars provperiod och Starter från $166/mån vid årsbetalning. Maze Free ger 1 live-projekt och 100 deltagare per månad, och betalnivåerna börjar på $75/mån. — [CleverX](https://blog.cleverx.com/blog/tree-testing-tools-free-paid-options-compared)
- NN/g (Laubheimer, 6 augusti 2023, granskad 19 augusti 2026):
  - Trädtest är evaluativt och kortsortering generativt.
  - "tree-testing task instructions should avoid using terms that give away the answers".
  - Mått: success rate, "directness" och tid.
  - Begränsning: verktygen tillåter bara lövnoder som rätt svar.

  — [NN/g Tree Testing](https://www.nngroup.com/articles/tree-testing/)

#### Crawlers och strukturverktyg (GitHub-data 2026-10-13)

| Kandidat | Repo | ★ | Licens | Senaste push | Fakta |
|---|---|---|---|---|---|
| Playwright | [microsoft/playwright](https://github.com/microsoft/playwright) | 97 623 | Apache-2.0 | 2026-10-13 | Testar Chromium, Firefox och WebKit |
| Playwright MCP | [microsoft/playwright-mcp](https://github.com/microsoft/playwright-mcp) | 38 096 | Apache-2.0 | 2026-10-08 | "Playwright MCP server" |
| Crawlee | [apify/crawlee](https://github.com/apify/crawlee) | 26 136 | Apache-2.0 | 2026-10-13 | Crawler-bibliotek för Node med Playwright eller Cheerio |
| Unlighthouse | [harlan-zw/unlighthouse](https://github.com/harlan-zw/unlighthouse) | 4 893 | MIT | 2026-10-11 | "Run Google Lighthouse on your entire site" |
| lychee | [lycheeverse/lychee](https://github.com/lycheeverse/lychee) | 4 004 | Apache-2.0 | 2026-10-13 | Länkkontroll |
| linkinator | [JustinBeckwith/linkinator](https://github.com/JustinBeckwith/linkinator) | 1 274 | MIT | 2026-10-13 | "crawls websites and validates links" |
| SEOnaut | [StJudeWasHere/seonaut](https://github.com/StJudeWasHere/seonaut) | 806 | MIT | 2026-10-08 | Go och MySQL i Docker; brutna länkar, redirects, meta och rubrikordning |
| axe-core | [dequelabs/axe-core](https://github.com/dequelabs/axe-core) | 7 638 | MPL-2.0 ⚑ (svag copyleft) | 2026-10-12 | Motor för a11y-tester |
| browser-use | [browser-use/browser-use](https://github.com/browser-use/browser-use) | 117 859 | MIT | 2026-10-09 | "Agents that use the browser" (Python) |
| Firecrawl | [firecrawl/firecrawl](https://github.com/firecrawl/firecrawl) | 191 127 | ⚑ AGPL-3.0 | 2026-10-13 | AI-scraper |
| UXAgent | [neuhai/UXAgent](https://github.com/neuhai/UXAgent) | 116 | ⚑ ingen licens i API-svaret | 2025-11-05 | Forskningskod |

- Screaming Frog SEO Spider ⚑ är gratis upp till 500 URL. Licensen kostar "€245 Per Year", men samma sida anger också £199. Verktyget kan "Analyse site architecture, indexability and crawl depth by directory", har "interactive crawl and directory force-directed diagrams and tree graph site visualisations", beräknar internal Link Score, validerar strukturerad data och skapar XML-sitemaps. — [Screaming Frog](https://www.screamingfrog.co.uk/seo-spider/)
- SEOnaut kräver Docker Compose och MySQL. — [SEOnaut README](https://github.com/StJudeWasHere/seonaut/blob/main/README.md)

#### Forskning: LLM som proxy i kortsortering och trädtest
- **MeasuringU, kortsortering** (Sauro, Schiavone och Lewis, 30 januari 2024). ChatGPT-4 sorterade 40 Best Buy-produkter, och resultatet jämfördes med 200 mänskliga svar. Överensstämmelsen per kort var i genomsnitt 68 %, mot 21 % vid slump, och kappa var .60 ("on the border between moderate and substantial agreement"). Resultatet varierade mellan körningar, och vid en körning föll ett kort bort. — [MeasuringU](https://measuringu.com/comparing-chatgpt-to-card-sorting-results/)
- **Kuric, Demcak och Krajcovic (14 maj 2025), "Card Sorting Simulator"** (arXiv 2505.09478):
  - Data: 28 studier med 1 399 deltagare.
  - Modeller: GPT-4o, Gemini 2.0 Pro, Claude 3.5 Sonnet och DeepSeek V3.
  - Mutual information visar "a good degree of agreement", men similaritetsmatriserna avviker från mänskliga mentala modeller på grund av modellernas "top-down nature".
  - "the number of cards or complexity of their labels impact the accuracy".
  - 17,14 % av promptarna fick genereras om.
  - Hållning: "an augmented supplement to, rather than a replacement for, traditional card sorting".
  - Författarna är knutna till UXtweak Research ⚑ (möjlig intressekonflikt).

  — [arXiv abs](https://arxiv.org/abs/2505.09478); [arXiv html](https://arxiv.org/html/2505.09478v1)
- **MeasuringU, trädtest** (2 april 2024). ChatGPT-4 körde 10 uppgifter i IRS.gov-trädet fem gånger, jämfört med 33 människor:
  - ChatGPT löste 10/10 i en körning och 9/10 i fyra körningar. Människorna lyckades i cirka 51 % av fallen.
  - Slutsatser: "ChatGPT is not suitable for estimating how well humans will find items in a tree test" och "If ChatGPT can't find it, you probably have a problem".
  - Svårighetsbetyget (SEQ) korrelerade r = .62 (p = .06).
  - När en gren flyttades högst upp i prompten steg träffsäkerheten från 1/5 till 4/5. Ordningen påverkar alltså.

  — [MeasuringU](https://measuringu.com/chatgpt4-tree-test/)
- **Kuric, Demcak och Krajcovic (18 maj 2026), "What Would GPT Click"** (arXiv 2605.18302): 12 first-click-tester med n = 3 431. De syntetiska klickfördelningarna skilde sig signifikant från verkliga data i 53 % av uppgifterna. Personas, chain-of-thought och olika samplingsparametrar "fail to create sensible fidelity improvements apart from inflating believability". — [arXiv](https://arxiv.org/abs/2605.18302)
- **UXAgent** (Lu m.fl., arXiv 2502.12561, v3 5 april 2025, ACM DOI 10.1145/3706599.3719729) består av LLM-agenter och en "universal browser connector" som simulerar tusentals användare. Resultaten är kvalitativa, kvantitativa och videoinspelningar. Fem UX-forskare utvärderade systemet. — [arXiv](https://arxiv.org/abs/2502.12561); [repo](https://github.com/neuhai/UXAgent)
- **NN/g om syntetiska användare** (Rosala och Moran, 21 juni 2024): "Synthetic users are useful for desk research and generating hypotheses, but not for final decision-making" och "Do not present synthetic-user research findings as real-user research findings". — [NN/g](https://www.nngroup.com/articles/synthetic-users/)

#### IA-metodkällor
- Rosenfeld, Morville och Arango, *Information Architecture*, 4:e uppl. (O'Reilly, oktober 2015, 483 s.). Relevanta kapitel: 6 Organization Systems, 7 Labeling Systems, 8 Navigation Systems, 9 Search Systems, 10 Thesauri, Controlled Vocabularies and Metadata, 11 Research (inklusive kortsortering) och 13 Design and Documentation (sitemaps, wireframes). — [O'Reilly](https://www.oreilly.com/library/view/-/9781491913529)
- NN/g (Laubheimer, 11 augusti 2019), "The 3-Click Rule for Navigation Is False": regeln är "not backed by data". Det som faktiskt spelar roll är "information scent", tydliga etiketter, wayfinding som brödsmulor, och att regeln krockar med en annan ostödd riktlinje om högst 7 kategorier. — [NN/g](https://www.nngroup.com/articles/3-click-rule/)
- Krug, *Don't Make Me Think, Revisited* (3:e uppl., New Riders, 2014). — [sensible.com](https://sensible.com/dont-make-me-think/)
- Krugs trunk test (sekundärkälla) frågar efter site ID, sidnamn, huvudsektioner, lokal navigation, "you are here" och sök. "If a user cannot answer all six within a few seconds, the page fails". — [dsebastien.net](https://concepts.dsebastien.net/concept/trunk-test/)

### Inferences

#### Bedömning
- **marketingskills/site-architecture:** **Ta in** som skelett till Nortropics IA-skill (lucka A). Gör följande ändringar:
  - Byt tre-klicksregeln mot ett krav på högst 2 klick, motiverat av Muellers uttalande om klickdjup (se fråga 4) och NN/g:s råd om information scent.
  - Låt brödsmulor följa den typiska användarvägen, enligt Google.
  - Ta bort "4-7 items"-påståendet och ersätt det med NN/g:s regel om ≤4 synliga länkar på mobil.
  - Översätt till svenska och lägg till en profil för hantverkare med tjänste- och ortssidor.
- **claude-seo seo-local och seo-sitemap:** **Pröva** som granskningschecklista. Skillen är US-centrerad (BBB, Yelp, FTC), så svenska motsvarigheter behöver ersätta dem.
- **Mermaid:** **Ta in**. Sitemaps och journeys kan skrivas som kod i briefen, renderas i GitHub och artefakter, och påverkar inte kundsajterna.
- **markmap:** **Bevaka**.
- **Relume:** **Bevaka**, som referens för sitemap-steget.
- **cardsort:** **Bevaka**. Inaktivt, men MIT-0 gör det fritt att forka och hosta på Cloudflare om Nortropic vill köra riktiga kortsorteringar med kunders kunder.
- **kort:** **Avstå** (GPL-3.0, inaktivt, MongoDB).
- **UXtweak och Lyssna Free:** **Pröva**. Kör ett mänskligt trädtest per bransch-mall, inte per kund.
- **Optimal Workshop och Maze:** **Avstå**, eftersom kostnaden är för hög för en enmansbyrå.
- **Screaming Frog Free:** **Pröva**. 500 URL räcker för alla kundsajter och ger klickdjup och trädgrafer. Det är ett kommersiellt skrivbordsprogram.
- **Playwright och Playwright MCP:** **Ta in** för journeys och agentdriven navigering.
- **Crawlee eller ett eget crawl-skript:** **Pröva** för automatisk mätning av klickdjup i CI.
- **linkinator och lychee:** **Ta in** för länkkontroll i CI.
- **Unlighthouse:** **Pröva**.
- **SEOnaut:** **Bevaka**. MySQL och Docker är överdrivet för den här skalan.
- **axe-core:** **Ta in** i Playwright-resorna, om better-accessibility inte redan täcker det.
- **browser-use och UXAgent:** **Bevaka**. Båda är skrivna i Python, och UXAgent saknar licens.
- **Firecrawl:** **Avstå** (AGPL-3.0, behövs inte).

#### Föreslagen AI-proxy för trädtest (destillerad ur källorna)
1. **Material:** Exportera navigationsträdet som ren text, alltså bara etiketter utan design. Det följer NN/g:s definition av trädtest.
2. **Uppgifter:** Skriv 6–10 uppgifter med kundens egna ord ur briefen, utan etikettord, enligt NN/g:s regel om att inte avslöja svaret. Lägg till en enkel uppvärmningsuppgift.
3. **Körningar:** Kör minst 5 gånger per uppgift och slumpa syskonordningen i trädet mellan körningarna. MeasuringU visade både variation mellan körningar och att ordningen påverkar resultatet.
4. **Inga persona-promptar för att öka träffsäkerheten.** Kuric m.fl. (2026) visar att de bara gör resultaten mer trovärdiga utan att göra dem mer träffsäkra.
5. **Rapportering:** Rapportera misslyckanden och indirekta vägar som röda flaggor, enligt MeasuringU: "If ChatGPT can't find it, you probably have a problem". Rapportera aldrig modellens framgångsandel som en prognos för människor, eftersom den låg på 90–100 % mot 51 %.
6. **Kortsortering med LLM** används bara för hypoteser om grupperingar. Småföretagssajter har få kort (10–30), vilket talar för metoden eftersom många kort försämrar resultatet (Kuric 2025). Beslut fattas efter mänsklig validering (NN/g).
7. **Komplettera med en trunk test per sidmall och Playwright-journeys**, t.ex. Google-sökning → tjänstesida → offertförfrågan.

#### Källor att destillera lager 3-skills från (1–3)
1. **Rosenfeld, Morville och Arango (2015)**, kap. 6–8, 11 och 13. Används för organisation, etiketter i besökarens ord, global, lokal och kontextuell navigation samt dokumentation av sitemaps. — [O'Reilly](https://www.oreilly.com/library/view/-/9781491913529)
2. **Google Search Central**: doorway- och scaled content-policyn, brödsmulor, LocalBusiness, URL-struktur och crawlbara länkar. Se fråga 4. — [Spam policies](https://developers.google.com/search/docs/essentials/spam-policies)
3. **NN/g:s metodartiklar** (trädtest, tre-klicksregeln, hamburgermenyer) **och Krugs trunk test**. Används för utvärderingen. — [Tree testing](https://www.nngroup.com/articles/tree-testing/); [3-click](https://www.nngroup.com/articles/3-click-rule/)

### Gaps
- Inget referentgranskat arbete om LLM-proxy specifikt för **trädtest** hittades, utöver MeasuringU:s experiment med ett enda träd. Inga studier på svenska hittades heller.
- Systempappret om UXAgent (arXiv 2504.09407) och "The Amazing Agent Race" lästes inte.
- D2 (diagram som kod) kunde inte verifieras på GitHub, eftersom sökningen gav noll träffar för terrastruct/d2.
- Det är oklart om Lyssnas Free-nivå inkluderar trädtest.
- CleverX-priserna kommer från en aggregator och kan vara inaktuella.
- Screaming Frogs prissida är motsägelsefull (€245 mot £199).
- marketingskills-skillarna schema och programmatic-seo lästes inte.

## 4. Vilka verktyg stödjer lokal SEO-struktur och LocalBusiness/Service-JSON-LD i Astro, och vad säger Google Search Central om doorway-sidor, webbplatsstruktur och brödsmulor?

### Takeaway
Verktygen behövs bara vid byggtid: `@astrojs/sitemap`, `schema-dts` för typer, en egen liten `<JsonLd>`-komponent eller `astro-seo-schema`, och ett `@id`-grafmönster där seo-graph kan stå som modell. astro-breadcrumbs bör undvikas eftersom den är GPL-3.0. Från Google gäller följande:
- Doorway-exemplen omfattar uttryckligen "pages targeted at specific regions or cities that funnel users to one page" och "substantially similar pages".
- Scaled content abuse omfattar AI-genererade sidor utan mervärde.
- Brödsmulor ska representera en typisk användarväg och inte spegla URL:en.
- LocalBusiness kräver bara `name` och `address`, med mest specifika subtyp, och flera typer får anges som array. `areaServed` saknas i Googles dokumentation men finns i schema.org.
- FAQ-rich results visas inte längre sedan juni 2026.
- URL:er ska använda publikens språk, bindestreck och procentkodade eller translittererade tecken.

Whitespark 2026 rankar "Dedicated Page for Each Service" som lokal organisk faktor nummer 1.

### Cited Findings

#### Verktyg (GitHub-data 2026-10-13)

| Kandidat | Repo | ★ | Licens | Senaste push | Fakta |
|---|---|---|---|---|---|
| astro-seo | [jonasmerlin/astro-seo](https://github.com/jonasmerlin/astro-seo) | 1 420 | MIT | 2026-08-28 | "Makes it easy to add information that is relevant for SEO to your Astro app" |
| schema-dts | [google/schema-dts](https://github.com/google/schema-dts) | 1 248 | Apache-2.0 | 2026-10-02 | "JSON-LD TypeScript types for Schema.org vocabulary" |
| astro-seo-schema (orbit-monorepot) | [codiume/orbit](https://github.com/codiume/orbit) | 619 | MIT | 2026-10-12 | `<Schema>`-komponent |
| seo-graph | [jdevalk/seo-graph](https://github.com/jdevalk/seo-graph) | 50 | MIT | 2026-09-21 (skapad 2026-04-09) | "schema.org JSON-LD graph builder with an Astro integration" |
| astro-breadcrumbs | [felix-berlin/astro-breadcrumbs](https://github.com/felix-berlin/astro-breadcrumbs) | 226 | ⚑ GPL-3.0 | 2026-10-12 | Brödsmulor med strukturerad data |
| Astro (ramverket) | [withastro/astro](https://github.com/withastro/astro) | 63 205 | "Other" enligt API | 2026-10-13 | |

- astro-seo-schema "Adds type checking to validate user-provided schema JSON", "Escapes the JSON data" och bygger på `schema-dts`. — [README](https://github.com/codiume/orbit/blob/main/packages/astro-seo-schema/README.md)
- seo-graph består av `@jdevalk/seo-graph-core`, som bara beror på `schema-dts`, och `@jdevalk/astro-seo-graph` med en `<Seo>`-komponent och `breadcrumbsFromUrl`. Det finns byggare som `buildBreadcrumbList` och `buildSiteNavigationElement`, och `buildPiece<Type>` för övriga typer. "Breadcrumbs are an input, not a derivation". AGENTS.md har recept per sajttyp, bland annat "local business". — [seo-graph README](https://github.com/jdevalk/seo-graph/blob/main/README.md)
- `@astrojs/sitemap` (dokumenterad för v3.7.4) skapar `sitemap-index.xml` och `sitemap-0.xml` och kräver `site` i konfigurationen. Alternativen är `filter`, `customPages`, `i18n` (hreflang), `serialize` och `chunks` (från 3.7.0). Integrationen lägger inte till `<link rel="sitemap">` automatiskt, och "cannot generate sitemap entries for dynamic routes in SSR mode". Google ignorerar `changefreq` och `priority`. — [Astro docs](https://docs.astro.build/en/guides/integrations-guide/sitemap/)

#### Google Search Central
- **Doorway abuse** (sidan uppdaterad 2026-08-28): "Doorway abuse is when sites or pages are created to rank for specific, similar search queries." Exemplen inkluderar:
  - "Having multiple domain names or pages targeted at specific regions or cities that funnel users to one page".
  - "Generating pages to funnel visitors into the actual usable or relevant portion of a site".
  - "Creating substantially similar pages that are closer to search results than a clearly defined, browseable hierarchy".

  — [Spam policies](https://developers.google.com/search/docs/essentials/spam-policies)
- **Scaled content abuse:** "Using generative AI tools or other similar tools to generate many pages without adding value for users". — [Spam policies](https://developers.google.com/search/docs/essentials/spam-policies)
- **Brödsmulor** (uppdaterad 2026-09-08):
  - "We recommend providing breadcrumbs that represent a typical user path to a page, instead of mirroring the URL structure."
  - En `BreadcrumbList` måste ha minst två `ListItem` med `item`, `name` och `position`. `item` kan utelämnas för sista ledet.
  - Visas "on desktop in all regions and languages".

  — [Breadcrumb structured data](https://developers.google.com/search/docs/appearance/structured-data/breadcrumb)
- **LocalBusiness** (uppdaterad 2026-09-08):
  - Obligatoriskt: `address` och `name`.
  - Rekommenderat: `geo` med minst 5 decimaler, `openingHoursSpecification`, `telephone` med lands- och riktnummer, `url`, `priceRange` under 100 tecken, med flera.
  - Använd mest specifika subtyp. Flera typer anges som array, t.ex. `["Electrician", "Plumber", "Locksmith"]`, och "`additionalType` isn't supported".
  - Varje plats är en egen LocalBusiness.
  - Sidan nämner inte `areaServed` eller företag som bara arbetar inom ett serviceområde.

  — [LocalBusiness](https://developers.google.com/search/docs/appearance/structured-data/local-business)
- **Allmänna riktlinjer för strukturerad data** (uppdaterade 2026-07-10): "Don't mark up content that is not visible to readers of the page", "Put the structured data on the page that it describes", "Try to use the most specific applicable type" och "JSON-LD (recommended)". — [SD policies](https://developers.google.com/search/docs/appearance/structured-data/sd-policies)
- **FAQ-rich results:** Googles dokumentationslogg anger en avvecklingsnotis ("This feature will no longer appear in Google Search starting May 7, 2026") och sedan att dokumentationen togs bort den 15 juni 2026 ("The FAQ rich result feature is no longer shown in Google Search results"). Datumen i notisen är inkonsekventa: notisen är daterad 8 maj men nämner 7 maj. — [FAQPage-dokumentationen/loggen](https://developers.google.com/search/docs/appearance/structured-data/faqpage)
- **URL-struktur** (uppdaterad 2025-12-10):
  - "use readable words rather than long ID numbers".
  - Bindestreck i stället för understreck.
  - "characters in the non-ASCII range should be percent encoded", med exemplet `gem%C3%BCse`.
  - "Use words in your audience's language in the URL (and, if applicable, transliterated words)".

  — [URL structure](https://developers.google.com/search/docs/crawling-indexing/url-structure)
- **SEO Starter Guide** (uppdaterad 2025-12-10): kataloger hjälper främst sajter med mer än några tusen URL:er, och sökmotorer "will likely understand your pages as they are right now, regardless of how your site is organized". Google lär sig brödsmulor från orden i URL:en, och "Having duplicate content on your site is not a violation of our spam policies". — [SEO Starter Guide](https://developers.google.com/search/docs/fundamentals/seo-starter-guide)
- **Crawlbara länkar** (uppdaterad 2025-12-10): "Google can only crawl your link if it's an `<a>` HTML element" med `href`. "Good anchor text is descriptive, reasonably concise, and relevant", och "Every page you care about should have a link from at least one other page on your site". — [Links crawlable](https://developers.google.com/search/docs/crawling-indexing/links-crawlable)
- **Sitemaps** (uppdaterad 2025-12-10): man behöver kanske ingen sitemap om sajten är "about 500 pages or fewer" och "comprehensively linked internally". — [Sitemaps overview](https://developers.google.com/search/docs/crawling-indexing/sitemaps/overview)
- **John Mueller (2018) om klickdjup:** "we don't count slashes in the URLs" och "it's more a matter of how many links you have to click through to actually get to that content rather than what the URL structure itself looks like". Uttalandet är försiktigt formulerat, med "a little bit". — [Search Engine Journal, 2018-06-09](https://searchenginejournal.com/google-click-depth-matters-seo-url-structure/256779/)

#### schema.org
- `areaServed`: "The geographic area where a service or offered item is provided". Värdet kan vara AdministrativeArea, GeoShape, Place eller Text, och egenskapen används på bland annat Organization, Service, Offer och ContactPoint. — [schema.org/areaServed](https://schema.org/areaServed)
- `Service` ("A service provided by an organization"): `provider`, `areaServed`, `serviceType`, `offers`, `availableChannel`, `hasOfferCatalog` och `category`. — [schema.org/Service](https://schema.org/Service)

#### Branschdata
- Whitespark Local Search Ranking Factors 2026, lokal organisk ranking (expertenkät):
  - #1 "Dedicated Page for Each Service" (210)
  - #2 "Geographic (City/Neighborhood) Keyword Relevance of Content" (190)
  - #6 "Internal Linking Across Entire Website" (174)
  - #19 "Keywords in Anchor Text of Internal Links"
  - #21 "Proper Site Architecture Organized Into Topic Areas"
  - Schema-markering hamnar på #69 i tabellen över nya faktorer.

  — [Whitespark LSRF](https://whitespark.ca/local-search-ranking-factors)
- claude-seo `seo-local` (v2.4.2):
  - "Swap test: if you can swap the city name and content still makes sense, it's a doorway page (RicketyRoo method)".
  - ">60-70% unique content minimum (industry consensus, no Google-confirmed threshold)".
  - Företag som bara arbetar inom ett serviceområde (SAB) bör ha `areaServed` "with named cities (recommended, not in Google's official list but Schema.org supported)".
  - Varningsnivåer för ortssidor: "WARNING at 30+ pages … HARD STOP at 50+".
  - "Schema is NOT a direct ranking factor (John Mueller confirmed)", vilket skillen återger utan primärkälla.

  — [seo-local SKILL.md](https://github.com/AgriciDaniel/claude-seo/blob/main/skills/seo-local/SKILL.md)
- AstroWinds FAQ-widget kan generera `FAQPage`-JSON-LD. — [FAQs.astro](https://github.com/arthelokyo/astrowind/blob/main/src/components/widgets/FAQs.astro)

### Inferences

#### Bedömning
- **@astrojs/sitemap:** **Ta in**. Den är strängt taget valfri under 500 sidor men kostar nästan inget. Komplettera med `<link rel="sitemap">` och en rad i robots.txt.
- **schema-dts:** **Ta in** som utvecklingsberoende. Typerna ger ingen JS i runtime eftersom JSON-LD skrivs ut vid bygget.
- **astro-seo-schema:** **Pröva**. Den kan också ersättas av en egen komponent på cirka 10 rader med `set:html` och `JSON.stringify`, som AstroWinds skill föreskriver.
- **seo-graph:** **Pröva**. Repot är ungt (50★) men agentorienterat och visar `@id`-grafen (LocalBusiness, WebPage, Service och BreadcrumbList) som Nortropic behöver.
- **astro-seo:** **Pröva**, men bara om mallen saknar egen hantering av metataggar.
- **astro-breadcrumbs:** **Avstå** (GPL-3.0). Mallen har redan brödsmulor.
- **claude-seo seo-local och seo-schema:** **Pröva** som granskningsskill efter bygget.
- **Whitespark LSRF:** **Ta in** som evidens i IA-skillen. Notera att det är en expertenkät, inte ett experiment.
- **marketingskills programmatic-seo:** **Bevaka**. Skillen är ogranskad, och mönster för storskaliga ortssidor är högriskabla mot Googles doorway- och scaled-policy.

#### Strukturregler för Nortropics IA-skill (förslag)
- **En sida per tjänst** (`/tjanster/<tjänst>`), som Whitespark rankar som nummer 1. Varje sida får `Service`-JSON-LD med `provider` → `@id` för LocalBusiness och `areaServed`.
- **Ortssidor bara med unikt innehåll.** Använd swap-testet som automatisk kontroll och Googles doorway-exempel som regel. Ingen AI-generering av sidor per ort, eftersom det faller under scaled content abuse. Serviceområdet visas annars som en sektion och i `areaServed`.
- **LocalBusiness** placeras på startsidan och kontaktsidan med mest specifika subtyp (array vid flera yrken), synlig NAP och `geo` med minst 5 decimaler. Markera bara upp det som syns på sidan.
- **Brödsmulor** följer användarvägen (Hem › Tjänster › Trädfällning), vilket på platta småföretagssajter oftast sammanfaller med URL:en. Brödsmulorna placeras före `<main>`, med `BreadcrumbList`.
- **Slugs:** använd svenska ord i besökarens språk. Translitterering (å→a, ä→a, ö→o) är tillåten enligt Google ("transliterated words") och är robust i SMS, tryck och uppläsning. Alternativet med procentkodad UTF-8 är också korrekt. Valet är en bedömning, inte ett krav från Google.
- **Kontrollen "högst 2 klick"** motiveras av Muellers uttalande om klickdjup och viktighet. Enligt NN/g är antalet klick däremot ett svagt UX-mått, så kontrollen kompletteras med trädtest och information scent.
- **FAQPage-schema** har inget rich result-värde sedan juni 2026. Det kan behållas om innehållet är synligt, men ska inte motiveras med synlighet i sökresultaten.

### Gaps
- Googles dokumentation för företag som bara arbetar inom ett serviceområde lästes inte, liksom svenska citeringskällor (t.ex. hitta.se och Eniro).
- Exakta schema.org-subtyper för trädfällare och florister verifierades inte. Bara Electrician, Plumber och Locksmith finns i Googles exempel.
- Påståendena i claude-seo (t.ex. siffror från "RicketyRoo" och HVAC-fallet) har inte verifierats mot primärkällor.
- seo-graphs AGENTS.md lästes inte i sin helhet.
- Det har inte kontrollerats om `@astrojs/sitemap` är beroende av Astro-versionen.
