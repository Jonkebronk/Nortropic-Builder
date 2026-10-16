# better-layout

**Källa:** https://github.com/jakubkrehel/skills, sökvägen `skills/better-layout/`.
- Läst 2026-10-16 vid repots commit `4c66b1f` (2026-10-12).
- Skillen ändrades senast i `da5f6d5` (2026-10-05). Mappen har 23 commits.
- Pluginversion 1.13.2. Repot har inga taggar och ingen ändringslogg.
- Lästa filer: `SKILL.md` (97 rader), `grouping-and-alignment.md` (103), `spacing-and-adaptivity.md` (156) och `agents/openai.yaml`, samt repots `README.md` och `AGENTS.md` (regelägarskap).

**Licens:** MIT, © 2026 Jakub Krehel. Licenstexten ska följa med om text eller kod kopieras. Vi skriver med egna ord och anger källan.

**Vad det är:**
- En kunskapsskill för gruppering, linjering, läsordning och responsiv struktur, som prövar layouten genom att ändra storlek, översätta och spegla den.
- Den anropas av modellen själv (ingen `disable-model-invocation`).
- Rapporten avslutas med Block eller Approve.

**Hur det fungerar:**
- **Kalibrering.** Siffrorna gäller bara där projektet saknar en egen skala. Ett fynd kräver ett fel som går att visa (klippning, överlapp, en grupp som läses fel). Att ett värde avviker från startvärdet räcker inte.
- **Luft före linjer.** Grupper skiljs i första hand med luft, i andra hand med bakgrundsform, i sista hand med avdelare. Mellanrummet mellan grupper är minst 2× mellanrummet inom gruppen (8 → 16 px och mer).
- **Linjering och ordning.**
  - Ett avståndssteg per nivå (16 px som standard), och få gemensamma kanter.
  - Visuell ordning är lika med DOM-ordning. Aldrig `order`, `row-reverse` eller grid-placering för att flytta innehåll.
- **Handlingar.**
  - En primär handling per vy. Fler än 3 sekundära handlingar läggs i en meny.
  - 12 px mellan kontroller med ram, 24 px mellan ramlösa glyfer, 24 px eller mer mellan grupper.
  - Knappar ligger 16 px in från kanten på mobil.
- **Dolt innehåll.** Nästa kort i en horisontell rad sticker ut 16–32 px. En hopfälld del har en kontroll som säger vad som döljs. Avkortad text måste gå att nå i sin helhet (`title` räknas inte).
- **Kanter och brytpunkter.**
  - "Content bleeds, controls float" och `scroll-padding-block-start` lika med headerns höjd.
  - Brytpunkter efter innehållet, och container queries för komponenter.
  - Text får `max-width` och `min-height`, aldrig fast storlek.
- **Före avslut.** En tabell med elva sökmönster, bland annat `1fr` → `minmax(0,1fr)`, `100vw` → `100%`, `100vh` → `100dvh`, fast `height` → `min-height`, `@media` i komponent → `@container` och sticky header utan `scroll-padding`.
- **Allvarlighetsgrad.** HIGH är klippning eller överlapp vid 320 px eller 200 % zoom, avkortat innehåll utan väg till hela texten, och dolt innehåll utan ledtråd. Kontroller som inte gick att köra rapporteras som `Not verified`.

**Kvalitet och underhåll:**
- 7 968★, 303 forkar, 2 bidragsgivare, push 2026-10-13. Aktivt.
- PR #21 (öppen) rättade bland annat kortkarusellens recept. Rättningen finns redan i main: `calc(100% - 12px)` med motivering i boxmodellen.
- Issue #32 (stängt) gällde felaktig storlek på det synliga kortet.
- Inga öppna ärenden rör better-layout.

**Det bästa vi kan ta:**
- Principerna i `SKILL.md`, särskilt *Group with space*, *Order by importance*, *Hint at hidden content*, *Hold structure until it breaks* och *Plan for growth*.
- Tabellen *Before you finish* som statisk sökning.
- Allvarlighetsstegen under *Reporting*.
- Fullbreddsgriden `1fr min(65ch, …) 1fr` (`spacing-and-adaptivity.md`, *Content bleeds*) som layoutprimitiv.

**Var det hamnar hos oss:**
- `skill: skelett`, delfil `skelett/layout.md` (förslag): luft, ordning, brytpunkter och mått.
- `skelett/kontroll.md`: grep-mönstren och Playwright vid 320 px och 200 % zoom.
- Siffrorna märks som startvärden. Kvoten 2× och 12/24/16 px saknar primärkälla, och enligt guide/README kräver en låst kontroll en norm eller två primärkällor.

**Passar vår stack?** Reviderat efter BESLUT 2026-10-16, *React, Tailwind och JavaScript tillåts*.
- Ja. Reglerna är ren CSS och kostar **0 kB JavaScript** per sida.
- Tailwind-exemplen (`space-y-6`, `ms-4`, `minmax`) kan nu användas nästan som de är i komponenter som skrivs med Tailwind. I `.astro`-sektioner med `--k-*` översätts de som förut.
- Detsamma gäller React-öar: layoutreglerna avgör markupen och påverkas inte av ramverket.
- Inga krockar med Lighthouse 100, *HTML först* eller rörelsereglerna.
- RTL och spegling behövs inte på svenska sajter. Logiska egenskaper kostar dock inget.
- Långa svenska sammansättningar beter sig som Krehels tyska exempel och talar för `minmax(0,1fr)` och radbrytning (härlett).

**Risker och flaggor:**
- Ingen telemetri, inga skript och ingen betalvägg.
- Krehels skills hänvisar till varandra (`better-accessibility`, `better-typography`). Utan dem blir hänvisningarna döda, så vi måste peka på våra egna delfiler i stället.
- Kollision: Emils mobile-native föreskriver `100svh` för hero och Krehel `100dvh` för mobilpaneler. Båda gäller, men i olika fall.

**Inloggning:** behövs inte.

**Slutligt förslag (skelett-struktur-beslut.json, 2026-10-16):** `skill: skelett`; reglerna och den sökbara CSS-kontrolltabellen står i `.claude/skills/skelett/layout.md`, och 320 px och låg höjd i kontrollistan i `skelett/SKILL.md`.
