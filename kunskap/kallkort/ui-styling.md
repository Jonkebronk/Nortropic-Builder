# ui-styling

**Källa:** https://github.com/nextlevelbuilder/ui-ux-pro-max-skill, sökvägen `.claude/skills/ui-styling/`.
- Läst 2026-10-16 vid commit `56ea9cf` (2026-10-15).
- Skillen har 9 commits, den senaste är `de5f12b` (2026-09-19, "protect existing Tailwind and token configurations", PR #501).
- Lokal klon: `kallor/yta-uiuxpromax`.
- Lästa filer: `SKILL.md` (frontmatter `version: "1.0.0"`, `author: claudekit`), `LICENSE.txt` och alla sju referensfiler. `shadcn-accessibility.md`, `shadcn-components.md` och `tailwind-responsive.md` lästes helt, de övriga översiktligt (rubriker och stickprov).
- Dessutom: repots `LICENSE`, `README.md` (avsnittet om licens) och `cli/README.md`.
- Jämfört med Anthropics `skills/canvas-design/` (anthropics/skills `dbd4588`, 2026-10-09).
- Skripten `shadcn_add.py` och `tailwind_config_gen.py` kördes inte.

**Licens:** blandad, inte motsägelsefull.
- **Sett:**
  - Repot: MIT, "Copyright (c) 2024 Next Level Builder".
  - Frontmattern: `license: MIT`.
  - `ui-styling/LICENSE.txt`: hela Apache-2.0-texten med den oifyllda platshållaren `Copyright [yyyy] [name of copyright owner]`.
  - `canvas-fonts/` har exakt samma 81 filnamn som Anthropics `canvas-design/canvas-fonts/`, vars `LICENSE.txt` är samma Apache-text men med "Copyright 2026 Anthropic, PBC." (den enda raden som skiljer).
  - `references/canvas-design-system.md` beskriver samma tvåstegsmetod som canvas-design.
  - Varje typsnitt har en egen `*-OFL.txt`.
- **Härlett** (⚠️ inte bekräftat av upphovspersonen): canvas-delen är lånad ur Anthropics Apache-skill, resten är MIT och typsnitten är OFL.
  - Apache-2.0 kräver att licenstexten följer med och att ändrade filer märks.
  - OFL kräver att licensfilen följer med typsnitten.
  - Kopian i `cli/assets/skills/ui-styling/` saknar både `LICENSE.txt` och `canvas-fonts/`.
- Relaterat: issue #481 (stängt 2026-09-06) gällde att `cli/README.md` angav CC-BY-NC-4.0. Raden står nu som MIT.

**Vad det är:**
- En skill för shadcn/ui (Radix + Tailwind), Tailwind-styling och "canvas"-baserad visuell design (affischer).
- Alla exempel är TSX/React.

**Hur det fungerar:**
- SKILL.md är en översikt som pekar på referensfiler för komponentkatalog, tema (next-themes), tillgänglighet, Tailwind-verktyg, responsivitet och anpassning.
- Två Python-skript installerar shadcn-komponenter och genererar `tailwind.config.js`.
- **Tillgänglighet (`shadcn-accessibility.md`):**
  - Radix sköter fokusfälla, Esc och återgång av fokus.
  - Snabbmenyn i DropdownMenu styrs med piltangenter.
  - Skip-länk, `focus-visible:ring-2`, `sr-only` och `aria-live`.
  - `<label>` för alla fält, fieldset och legend.
  - Kontrast AA 4,5:1 och 3:1, AAA 7:1 och 4,5:1.
  - `prefers-reduced-motion` och en testlista.
- **Responsivt:** mobilen först med `sm:` 640 px och vidare, container queries, och "Test at exact breakpoint widths (640px, 768px, 1024px, etc.)".

**Kvalitet och underhåll:**
- Repot har 136 402★, 14 500 forkar, 101 bidragsgivare, push 2026-10-15, 40 öppna ärenden och 50 öppna PR.
- Issue #496 (stängt) gällde att `tailwind_config_gen.py` skrev över befintlig konfiguration. Det är rättat i PR #501.
- PR #520 (öppen) gäller att låsa MCP-versioner.

**Det bästa vi kan ta** (reviderat efter stackbeslutet):
- Komponentkatalogen (`shadcn-components.md`) och temasystemet med CSS-variabler (`shadcn-theming.md`, *CSS Variable System*) som snabb översikt när biblioteket använder shadcn/ui i React-öar.
- Testlistan i `shadcn-accessibility.md` (*Testing Checklist*).
- Den bästa källan är dock shadcn/ui självt. Det har en officiell Astro-installation ([ui.shadcn.com/docs/installation/astro](https://ui.shadcn.com/docs/installation/astro): `shadcn init -t astro`, kräver Tailwind och React-integrationen) och `llms.txt`, som skillen själv hänvisar till.

**Var det hamnar hos oss:** `släpp`, oförändrat men med nytt skäl.
- Stacken är inte längre hindret. Skillen är en tunn sammanfattning av shadcn- och Tailwind-dokumentationen, med Next-specifikt tema (next-themes) och Python-skript som skriver konfiguration.
- Den har dessutom en canvas-del med Apache-licens som vi inte behöver.
- **Förslag:** ta in **shadcn/ui direkt** (MIT, officiellt stöd för Astro) som en egen post i inventeringen, med beslutet `bibliotek`.

**Passar vår stack?** Reviderat efter BESLUT 2026-10-16, *React, Tailwind och JavaScript tillåts*.
- Ja i sak: shadcn/ui, Radix och Tailwind är nu tillåtna som React-öar.
- **Kostnad per sida:**
  - 0 kB för en komponent som renderas utan `client:`. Fungerar för Button, Card och Badge.
  - Interaktiva Radix-komponenter (Accordion, Dialog, Dropdown, Navigation Menu) kräver `client:`-direktiv, och då drar den första ön in React-körtiden, cirka 56 kB gzip (⚠️ en mätning, bejamas/ui-benchmark). Radix egen storlek per komponent är inte mätt ⚠️.
- **Krockar att ta upp med Johnny:**
  - **HTML först.** ⚠️ Om Radix Accordion visar stängda paneler i serverrenderad HTML är inte verifierat (Radix dokumentation säger det inte). Det måste provas med JS av, eftersom FAQ-svar annars kan saknas tills JavaScript laddats. Native `<details name>` har inte det problemet.
  - **Navigation.** shadcn:s NavigationMenu och DropdownMenu bygger på menumönster med piltangenter. För webbplatsnavigation föreskriver APG disclosure, inte `menu`.
  - **Brytpunkter.** Rådet att testa vid exakt 640/768/1024 px krockar med web.dev ("Don't define breakpoints based on device classes").

**Risker och flaggor:**
- Blandad licens, se ovan. Canvas-delen ska inte tas med.
- Skripten skriver i projektet (`tailwind.config.js`, `docs/brand-guidelines.md`) och ska inte köras.
- Repot är stort och snabbrörligt, med många öppna PR.
- Ingen telemetri hittades i skillens filer. ⚠️ CLI:t (`cli/`) är inte granskat.

**Inloggning:** behövs inte.
