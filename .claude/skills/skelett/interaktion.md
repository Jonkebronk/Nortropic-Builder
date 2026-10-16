# Interaktionsmönster, tillstånd och öar

Primitivtabellen – `<details name>`, mobilmenyn som popover, bild i större format, formulär och komplexa widgets – står i guiden (→ `guide/2-4-skelett.md`, *HTML först*). Här står kraven på varje mönster, tillstånden som ska prövas och reglerna för React-öar.

Baseline enligt [web-features](https://github.com/web-platform-dx/web-features) 3.43.0: `<details>` high (2020), `details name` low (2024-09-03), `::details-content` low (2025-09-16), Popover low (2025-01-27), Invoker Commands low (2025-12-12), `<dialog>` high (2022), `@starting-style` low (2024-08-06). Inte Baseline: `<dialog closedby>`, `popover="hint"`, `interpolate-size`, `hidden="until-found"`, scroll-drivna animationer.

## Mobilmenyn

- **Knappen säger "Meny"** med ikon, är minst 44 × 44 och har ingen `aria-label` som skiljer sig från den synliga texten (`BESLUT.md` 2026-10-15; 📄 WCAG 2.2, 2.5.3 Label in Name).
- **Panelen är en `popover`** som knappen styr med `popovertarget`. Det ger utan skript: ljus stängning med klick utanför och Escape, fokus tillbaka till knappen när den stängs med tangentbordet, implicit `aria-expanded` på knappen och panelen som nästa steg i tabbordningen ([MDN, Using the Popover API](https://developer.mozilla.org/en-US/docs/Web/API/Popover_API/Using)).
- **En popover är icke-modal.** Ser panelen modal ut (helskärm, `::backdrop`) ska den stängas när fokus lämnar den, så att Tab inte hamnar bakom den. Alternativet är `<dialog>` med `showModal()` eller `command="show-modal"`, som gör resten av sidan inert.
- **Aktuell sida syns,** inte bara med `aria-current`: understruken eller fet i datorns meny och i panelen. Besökare landar ofta djupt från sökningar och ska se var de är (NN/g, [Menu-Design Checklist](https://www.nngroup.com/articles/menu-design/), 2024, punkt 5; Baymard 2026: 96 % av e-handelssajterna saknar markeringen).
- **Panelen listar tjänsterna direkt,** inte bara ett samlande "Tjänster"; när kategorierna låg under ett samlingsval stängde testpersonerna menyn (Baymard, [Main navigation product categories](https://baymard.com/blog/main-navigation-product-categories), 2023, e-handel – överföringen är härledd).
- **Navigering är disclosure, inte meny:** länkar i en lista i ett `<nav>` med namn, `aria-current="page"` på aktuell sida, aldrig `role="menu"` med piltangenter (W3C APG, [Disclosure Navigation](https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/examples/disclosure-navigation/)).
- **Utan Popover-stöd göms knappen** (`@supports not selector(:popover-open)`), så att den aldrig är en knapp som inget gör; sidfoten bär då alla sidor.
- **Alternativ för sajter med få sidor:** GOV.UK:s Service navigation visar alla länkar utan JavaScript och låter skriptet visa menyknappen och fälla ihop listan – knappen har `hidden` från början (alphagov/govuk-frontend v6.6.0, `service-navigation/template.njk`). Med högst fyra länkar kan de stå synliga också i mobilen (NN/g, *Hamburger Menus*); det kräver Johnnys dom eftersom "Meny" är beslutat.
- **Animation:** in från sidan med `transform`, `@starting-style` och `display`/`overlay` med `allow-discrete`, avstängd under `prefers-reduced-motion` (→ `guide/2-6-rorelse.md`).
- **Inte:** AstroWinds och Accessible Astros mobilmenyer, som inte går att öppna utan JavaScript (prövat 2026-10-16), och React-sidhuvuden med `useState` för menyn.

## Vanliga frågor och utfällbart

- **`<details>` med `<summary>`, och `name` för en exklusiv grupp.** Varje sektion får ett eget `name`, så att två grupper på samma sida inte kopplas ihop.
- **Svaren finns i HTML:en** och syns utan JavaScript; Chromium öppnar ett stängt `<details>` när sökfunktionen träffar texten ⚠️ (Safari och Firefox inte prövade).
- **Exklusiv grupp eller inte:** `name` stänger de andra frågorna när en öppnas. NN/g råder till att flera paneler får vara öppna samtidigt, så att besökaren kan jämföra svar ([Accordions on Desktop](https://www.nngroup.com/articles/accordions-on-desktop/), 2023). Guiden föreskriver `<details name>` (→ `guide/2-4-skelett.md`, primitiverna); att släppa `name` för vanliga frågor är ett förslag till Johnny.
- **Bara för det som några behöver.** Det de flesta behöver står öppet; inga dragspel i dragspel; pröva innehållet utan dragspel först (GOV.UK, [Details](https://design-system.service.gov.uk/components/details/) och [Accordion](https://design-system.service.gov.uk/components/accordion/)).
- **Rubriken i `<summary>`** annonserades inte av JAWS och TalkBack i O'Haras prov ⚠️ (2018–2021); pröva med aktuella skärmläsare eller lägg frågan som ren text (→ `guide/2-4-skelett.md`, N2).
- **Animation av öppningen** med `::details-content` och `interpolate-size` bara under `prefers-reduced-motion: no-preference` (Accessible Astro, `AccordionItem`). Utan stöd öppnas den direkt, vilket är godtagbart.
- **Inte:** Radix- och skriptdragspel (Tailark, Fulldev, Starwind) som sätter `hidden` på stängda svar – innehållet försvinner utan JavaScript och för sökfunktionen.

## Dialog och bild i större format

- **Grunden är en vanlig länk till bilden.** Förbättringen är `<dialog>` som öppnas med `command="show-modal"` och `commandfor`, och stängs med `command="close"` eller `<form method="dialog">` ([MDN, Invoker Commands](https://developer.mozilla.org/en-US/docs/Web/API/Invoker_Commands_API)). Invoker Commands är Baseline först sedan december 2025: länken måste fungera ensam (→ `guide/2-4-skelett.md`, N2).
- AstroWinds `Gallery` med `<dialog>` är förebild.

## Knapplisten

- Visas i mobilen när sidans egna knappar har scrollats bort och göms när de, eller sista bandets knappar, syns igen; göms när menyn eller samtyckesrutan är öppen; statisk vid låg höjd; synlig utan JavaScript ([mobil.md](mobil.md), *Tumzonen och fasta element*).
- Samma knappar som sidans primära handling (→ `guide/2-3-struktur.md`, N1, G5).

## Brödsmulor och hoppa-länk

- **Brödsmulor** (när de används; om de behövs på en platt sajt → skillen `struktur`, `navigation.md`): `<nav aria-label="Brödsmulor">` med en `<ol>`, placerad före `<main>`, sista ledet är aktuell sida med `aria-current="page"` (W3C APG, [Breadcrumb](https://www.w3.org/WAI/ARIA/apg/patterns/breadcrumb/); Accessible Astro `Breadcrumbs`; GOV.UK). Vilka sidor som får brödsmulor och vad de visar → skillen `struktur`, `navigation.md`.
- **Hoppa till innehållet** är första fokuserbara element, syns när den får fokus och ligger över sidhuvudet (→ `guide/2-4-skelett.md`, N2). Accessible Astro flyttar dessutom fokus till målet med `tabindex="-1"`, vilket hjälper äldre webbläsare. Den göms med klippning tills den får fokus, inte med en förskjutning i px, så att den inte syns när texten förstoras (GOV.UK, `govuk-visually-hidden-focusable`; [layout.md](layout.md), *Text som växer*).

## Tillstånd per komponent

Varje interaktiv komponent i biblioteket har sina tillstånd definierade en gång och visade på provsidan med testdata (→ `guide/2-3-struktur.md`, N2; *(en källa – bänken: Krehel, `state-machine`)*). Minst:

| Komponent | Tillstånd som prövas |
|---|---|
| Meny | stängd, öppen, öppen med fokus på sista länken + Tab, stängd med Escape, utan Popover-stöd, utan JavaScript |
| Vanliga frågor | alla stängda, en öppen, sökträff i ett stängt svar, ett mycket långt svar, utan JavaScript |
| Knapplist | dold vid sidans knappar, synlig, dold vid sista bandet, med samtyckesrutan öppen, låg höjd, utan JavaScript |
| Sidhuvud | överst, gömt vid scroll nedåt, tillbaka vid scroll uppåt, med fokus i sig, låg höjd |
| Kartan | bild, efter klick (inbäddad), utan samtycke |
| Formulär (när det finns) | tomt, med fel, skickat, utan JavaScript, med tangentbordet uppe i mobilen (→ `guide/2-8-teknik-och-kvalitet.md`) |
| Varje sektion | en och tolv poster, långa sammansatta ord, saknad bild, 200 % text |

Så hålls registret ärligt *(Krehel, `state-machine`, MIT; en källa – bänken)*:

- **Ett tillstånd som komponenten inte kan hamna i är inget tillstånd.** Inga grenar läggs till bara för provsidan; ett tillstånd som designen visar men koden saknar listas som saknat.
- **Tillstånden matas in där komponenten tar emot data,** som props från provsidan, aldrig genom att komponenten ändras.
- **Innehållet ser ut som kundens:** svenska namn på tjänster, riktiga tider och priser och det antal poster sajterna har, märkt som testdata. Tre rader "Test" får alla tillstånd att se bra ut.
- **Efter varje visuell ändring bläddras alla tillstånd igen,** eftersom en rättelse i ett tillstånd ofta förstör ett annat.
- Väljaren mellan tillstånd står utanför designsystemet, som variantväljaren ([varianter.md](varianter.md)), och finns bara på provsidan.

## React-öar

Johnny har tillåtit React, Tailwind och Motion som öar i Astro (`BESLUT.md` 2026-10-16, *React, Tailwind och JavaScript tillåts*). Krockar med Lighthouse 100, *HTML först* och rörelsereglerna tas upp med honom; de stoppar inte.

- **Utan `client:`-direktiv renderas komponenten till HTML vid bygget och kostar 0 kB JavaScript.** Det är förvalet för allt som bara visar något.
- **`client:visible`** (laddas när komponenten syns) eller `client:idle` bara där interaktionen kräver JavaScript; `client:load` bara för något som måste fungera direkt. `client:only` aldrig för navigation, länkar, text eller strukturerad data, eftersom Google bara följer `<a href>` i HTML:en (📄 [Google, crawlbara länkar](https://developers.google.com/search/docs/crawling-indexing/links-crawlable)).
- **Kostnaden skrivs per sida:** den första ön drar in React-körtiden, cirka 60 kB brotli eller 69 kB gzip, mätt i ett provbygge med React 19.3 och Astro 7.4 (→ `react-i-astro.md` och `kunskap/research/2026-10-16_react-och-javascript-i-astro.md`; tidigare uppgift 56 kB ur bejamas/ui-benchmark), plus Astros ö-körtid, cirka 4 kB; Motion kostar 43 kB med `motion`-komponenten eller drygt 5 kB med `m` och `LazyMotion` plus 24 kB för `domAnimation` ([motion.dev](https://motion.dev/docs/react-reduce-bundle-size)).
- **Mät före och efter** med kontroll 9 (Lighthouse, median av tre) och skriv utfallet i raden om ön (→ `guide/bilaga-c-kontroller.md`).
- **Ön ska fungera, eller visa sitt innehåll, utan JavaScript.** En ö som döljer innehåll tills den laddats är en krock att ta upp, inte ett tyst undantag.
- **Native först:** finns en HTML-primitiv (`<details>`, `popover`, `<dialog>`, `<select>`, `<input type="date">`) används den, även om en färdig React-komponent finns.
