# Zag

**Källa:** <https://github.com/chakra-ui/zag> (README via GitHub-API, mappen `packages/machines`), dokumentationen <https://zagjs.com/>. Läst 2026-10-16.

**Licens:** MIT. Kräver att licenstexten följer med.

**Vad det är:** tillgänglig komponentlogik som tillståndsmaskiner, fristående från ramverk. Man skriver själv markup och stil; Zag sköter tangentbord, fokus och ARIA enligt W3C APG.

**Hur det fungerar:** varje komponent är ett eget npm-paket (`@zag-js/<namn>`) plus en adapter för React, Vue, Solid, Svelte, Preact eller vanilj-JavaScript. `connect(service, normalizeProps)` ger funktioner som returnerar attribut till varje del (`getRootProps`, `getItemProps`). Maskinerna (sett i `packages/machines`): bland annat accordion, carousel, combobox, date-input, date-picker, dialog, drawer, menu, navigation-menu, popover, select, steps, tabs, toast, tooltip och tour – 47 stycken.

**Kvalitet och underhåll:** 5 229 stjärnor, push 2026-10-15, 34 öppna ärenden, 141 bidragsgivare (GitHub-API 2026-10-16). Beteendet testas med Playwright i alla ramverk enligt README. Det driver Ark UI och Chakra UI.

**Det bästa vi kan ta:** `date-picker` och `date-input` när en kund behöver en egen bokningsvy eller ett datumfält som webbläsarens `<input type="date">` inte klarar.

**Var det hamnar hos oss:** `senare: N3` (`guide/2-4-skelett.md`: komplexa widgets från N3 som isolerad ö).

**Passar vår stack?** Ja, som ö: med React-adaptern i en React-ö (`client:visible`) eller med vanilj-adaptern i ett Astro-skript. Kostnad: maskinen plus adaptern, och React-körtiden om React-adaptern används (cirka 56 kB gzip för första ön, en mätning ⚠️). Utan JavaScript fungerar inget; därför bara där en enklare HTML-väg finns kvar (till exempel länk till kundens bokningssystem).

**Risker och flaggor:** kräver JavaScript (krock med *HTML först*, tas upp med Johnny); 34 öppna ärenden; ingen sektion – bara beteende.

**Inloggning:** krävs inte.
