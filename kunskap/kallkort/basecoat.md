# Basecoat

**Källa:** <https://github.com/hunvreus/basecoat>, commit `6953a4a` (2026-07-06). Läst 2026-10-16: README, `LICENSE`, `src/js/` (13 skript), `src/css/`, `dropdown-menu.js`. Dokumentationen <https://basecoatui.com/>. Lokalt: `kallor/hunvreus-basecoat/`.

**Licens:** MIT ("Copyright (c) 2025 Ronan Berder"). Kräver att licenstexten följer med.

**Vad det är:** shadcn/ui:s designsystem som ren HTML, CSS (Tailwind 4) och lite vanilj-JavaScript, utan React eller Radix. Det täcker de minsta delarna: knappar, fält, kort, badges, dragspel, flikar, dialoger, rullgardiner, toasts.

**Hur det fungerar:**
- CSS:en är delad i bas-tokens, komponentstruktur och stilpaket (Vega, Nova, Maia, Lyra, Mira, Luma, Sera, Rhea), kompatibla med shadcn-teman. Installeras med `npm install basecoat-css` och `@import "basecoat-css"` efter Tailwind, eller via CDN.
- JavaScript finns bara för komponenter med beteende: accordion, combobox, command, drawer, dropdown-menu, popover, range, select, sidebar, tabs, toast och chart.
- Dragspelet bygger på `<details>`; skriptet behövs bara för att begränsa till en öppen rad.
- Rullgardinsmenyn använder `role="menu"`, alltså appmenyns mönster.

**Kvalitet och underhåll:** 4 370 stjärnor, push 2026-07-21, 37 öppna ärenden, 13 bidragsgivare (GitHub-API 2026-10-16). Senaste commit i klonen är 2026-07-06; aktiviteten har avtagit något.

**Det bästa vi kan ta:**
- Strukturen bas-tokens / komponent / stilpaket som förebild för hur kitets tokens och komponenterna hålls isär.
- Formulärfält och knappar i ren HTML som utgångspunkt när Kontakt får ett formulär (`2-8`).

**Var det hamnar hos oss:** biblioteket (atomer), med `skill: skelett` som hänvisar dit. Inte i navigationen.

**Passar vår stack?** Ja, ren HTML och CSS. JavaScript-kostnad: 0 kB för de statiska delarna, några kB per beteende ⚠️ (inte mätt).

**Risker och flaggor:**
- `role="menu"` i rullgardinen får inte användas för webbplatsnavigering (W3C APG, disclosure-navigering; `guide/2-4-skelett.md`).
- Två lager tokennamn (shadcn och kitets) om båda används.
- 37 öppna ärenden.

**Inloggning:** krävs inte.
