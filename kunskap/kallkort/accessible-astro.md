# Accessible Astro

**Källa:** <https://github.com/incluud/accessible-astro-starter> commit `3fc28ca` (2026-10-15) och <https://github.com/incluud/accessible-astro-components> commit `0ed04fb` (2026-09-12). Läst 2026-10-16: README och `AGENTS.md` i båda, startmallens `Header.astro`, `Navigation.astro`, `ResponsiveToggle.astro`, `NavigationItems.astro`, och komponenterna `SkipLink`, `Breadcrumbs`, `BreadcrumbsItem` och `AccordionItem`. Demon <https://accessible-astro-starter.incluud.dev/> prövad i Playwright med och utan JavaScript. Lokalt: `kallor/incluud-accessible-astro-starter/` och `kallor/incluud-accessible-astro-components/`.

**Licens:** MIT i båda repona. Kräver att licenstexten följer med kopior.

**Vad det är:** en startmall för Astro med fokus på WCAG och ett separat komponentbibliotek (23 komponentmappar: accordion, breadcrumbs, skiplink, modal, tabs, forms, reducedmotion, highcontrast med flera). Det är vår bästa referens för tillgängliga atomer och molekyler, inte för sektioner.

**Hur det fungerar:**
- `SkipLink` ligger först i `<header>`, är dold ovanför skärmen tills den får fokus och flyttar fokus till `#main-content` med `tabindex="-1"`, eller till `h1` om målet saknas.
- `Breadcrumbs` är ett `<nav aria-label>` med en `<ol>`; den aktuella sidan är ett `<span aria-current="page">`, inte en länk.
- `AccordionItem` bygger på `<details name>` med en rubrik (h3 som standard) i `<summary>`; öppningen animeras med `::details-content` och `interpolate-size`, bara under `prefers-reduced-motion: no-preference`, och färgerna sätts med `light-dark()`.
- Mobilmenyn: `ResponsiveToggle` är en knapp med synligt ord "Menu" och `aria-expanded`, som ett skript växlar och vars `aria-label` byts mellan "Open menu navigation" och "Close menu navigation".
- Startmallen har inställningar för mörkt läge, hög kontrast och reducerad rörelse, och en "launcher" (sökruta med kortkommandon).

**Kvalitet och underhåll:** startmallen 1 189 stjärnor, push 2026-10-15, 8 öppna ärenden, 21 bidragsgivare; komponenterna 569 stjärnor, push 2026-09-12, 25 öppna ärenden, 14 bidragsgivare (GitHub-API 2026-10-16).
- **Prov med JavaScript av (sett, 2026-10-16):** knappen "Menu" i 375 px öppnar ingenting; ingen navigation blev synlig. Innehållet var synligt.
- Rubriker i `<summary>` annonseras inte av alla skärmläsare (O'Hara 2018–2021, redan i `guide/2-4-skelett.md`, ⚠️ gammal data).

**Det bästa vi kan ta:**
- Brödsmulornas markup (`nav` + `ol` + `aria-current="page"` på sista ledet), till brödsmulorna från sajt 2.
- `AccordionItem`: animationen av `<details>` i ren CSS bakom `prefers-reduced-motion`.
- Det synliga ordet "Menu" på menyknappen (vi har redan "Meny").
- Inställningskomponenterna som mönster om en kund behöver hög kontrast.

**Var det hamnar hos oss:** `skill: skelett`, delfilen `interaktion.md` (brödsmulor, utfällbart, hoppa-länk). Biblioteket: referens för atomerna.

**Passar vår stack?** Ja, ren Astro och SCSS utan React; komponenterna kan tas nästan som de är och mappas mot kitets tokens. JavaScript-kostnad: små egna skript för menyn och hoppa-länken. Mobilmenyn bryter *HTML först*; vår popovermeny fungerar utan JavaScript och behålls.

**Risker och flaggor:**
- Mobilmenyn kräver JavaScript (sett i demon).
- `aria-label` på menyknappen skiljer sig från den synliga texten; det klarar WCAG 2.5.3 (Label in Name) bara så länge ordet "menu" finns i etiketten. Vi har ingen sådan etikett och ska inte ta in den.
- "Launcher" med sökruta och kortkommandon är överflödigt på en sajt med sju sidor.
- Paketet `accessible-astro-components` som beroende låser oss vid deras uppdateringar; kopiera hellre in de få komponenter vi behöver.

**Inloggning:** krävs inte.
