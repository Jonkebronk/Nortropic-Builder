# better-accessibility

**Källa:** https://github.com/jakubkrehel/skills, sökvägen `skills/better-accessibility/`.
- Läst 2026-10-16 vid commit `4c66b1fa86e9` (repot, 2026-10-12). Senaste ändringen i skillen är `4650b9c030` (2026-10-06). Skillen har 35 commits sedan 2026-07-23.
- Pluginet heter `interfaces` och har version 1.13.2. Ändringslogg och releaser saknas; versionen finns bara i `.claude-plugin/plugin.json`.
- Lästa filer, alla i sin helhet: `SKILL.md`, `focus-and-keyboard.md`, `forms.md`, `hit-areas.md`, `motion-and-zoom.md`, `screen-readers.md`, `semantics-and-aria.md` och `agents/openai.yaml`. Dessutom repots `README.md`, `AGENTS.md`, `CLAUDE.md` och manifesten.
- Officiell sida: https://jakub.kr/skills. Den beskriver bara skillen i en rad och har ingen egen dokumentation.

**Licens:** MIT, © 2026 Jakub Krehel (enligt `LICENSE`, som lades in i första commit 2026-07-10).
- Kräver: copyright- och licenstexten ska följa med om vi kopierar väsentliga delar.
- Vi skriver med egna ord och anger källan, så inget krav utlöses (tolkning, inte juridisk rådgivning).

**Vad det är:** En kunskapsskill som granskar och rättar tillgänglighet mot WCAG 2.2. Den täcker semantik, tangentbord och fokus, tillgängliga namn, formulär, uppläsning av ändringar, rörelse och zoom. Varje fynd knyts till det WCAG-kriterium det bryter mot, och rättningen skrivs i projektets eget stilsystem.

**Hur det fungerar:**
- **Kalibrering** (`SKILL.md`, *Criteria, not conventions*):
  - Ett fynd kräver ett WCAG 2.2-kriterium på nivå A eller AA, eller en uppgift som en hjälpmedelsanvändare inte kan utföra.
  - AAA, APG-konventioner, regeln om en enda `<h1>` och träffytor på 44/40 px är rekommendationer och blir aldrig HIGH.
- **Två genomgångar:** först bara tangentbord, sedan skärmläsare (namn, roll och tillstånd).
- **Grundregel:** plattformens element före egen konstruktion, och hellre ta bort ARIA än lägga till.
- **Regler med kriterienummer:**
  - fokus som syns, med 3:1 mot angränsande färger (1.4.11; 2 px-ringen är AAA-målet 2.4.13)
  - fokus som inte skyms av sticky header (2.4.11, `scroll-padding-top`)
  - träffyta 24×24 eller ett av fem undantag (2.5.8; 44 är 2.5.5 AAA)
  - alternativ med en enda pekare till drag och gester (2.5.7, 2.5.1)
  - `autocomplete`-token (1.3.5)
  - inte bara färg (1.4.1)
  - kontrast 4,5:1 och 3:1, där stor text är 24 px eller 18,67 px fet (1.4.3, 1.4.11)
  - paus för rörelse som pågår längre än 5 s (2.2.2)
  - 200 % textstorlek och reflow vid 320 px (1.4.4, 1.4.10)
  - undertexter, transkript och ingen autoplay med ljud (1.2.2, 1.2.1, 1.4.2)
  - synlig etikett ingår i namnet (2.5.3)
  - sidtitel (2.4.2).
- **Delfiler:**
  - `focus-and-keyboard.md`: ordning för fokusringen, forced-colors, skip link, tabindex-regler, roving tabindex, `<dialog>` med `showModal()` jämfört med eget överlägg med `inert`, och en APG-tabell med tangenter per widget.
  - `hit-areas.md`: undantaget för avstånd (cirka 24 px), utökning med pseudo-element på omslaget (inte på `<input>`), krockregeln, `pointer-events: none` på dekorlager och `touch-action`.
  - `forms.md`: etiketter, felmönstret (`aria-invalid`, `aria-describedby`, fokus till första felet), en tabell med autocomplete-tokens, `type` och `inputmode`, samt att knappen visar pågående sändning med `aria-disabled` i stället för `disabled`.
  - `screen-readers.md`: `.sr-only`, fyrastegsordningen för uppläsning (fokusflytt, describedby, status, alert), live-regioner, en alt-text-tabell efter syfte, SVG och media.
  - `semantics-and-aria.md`: ARIA:s regler, knapp mot länk, landmärken, namnordning, vanliga ARIA-fel och disabled-regler.
  - `motion-and-zoom.md`: rörelse som opt-in, tabellen *stäng av, ersätt, behåll*, toast-timer på minst 5 s med paus, samt reflow och zoom.
- **Slutkontroll:** tabellen *Before you finish* har 14 sökmönster, till exempel `outline: none` utan ersättning, `<div onClick`, positiv tabindex, `disabled={!isValid}`, `user-scalable=no` och sticky header utan `scroll-padding-top`.
- **Rapport:** HIGH, MEDIUM eller LOW, med *Block* eller *Approve*. Kontroller som inte kunde köras redovisas som *Not verified*.

**Kvalitet och underhåll:**
- **Repot:** 7 968 stjärnor, 303 forkar och 2 bidragsgivare (jakubkrehel 122 commits, `claude` 6). Skapat 2026-07-10, senaste push 2026-10-13, inte arkiverat. Källa: GitHubs API, läst via `gh api` eftersom anonym `curl` slog i rate limit.
- **skills.sh:** 27,1 tusen installationer, först sedd 2026-07-23. Säkerhetsgranskningarna Gen Agent Trust Hub, Socket och Snyk ger alla *Pass*.
- **Kända problem:**
  - #40 punkt 3 (stängd 2026-10-07): den globala avstängningen av rörelse stoppade även spinners. Receptet är borttaget i dagens `motion-and-zoom.md` (commit `4650b9c`, "removing outdated fallback CSS").
  - PR #21 (öppen, errata): gränsen för stor fet text ändras från 18,5 till 18,66/18,67 px. Dagens skill har 18,67.
- **Källhänvisning:** skillen anger bara kriterienummer, utan länkar. APG och ARIA 1.2 nämns vid namn. Numren stämmer med min läsning av WCAG 2.2, men ⚠️ de är inte kontrollerade mot w3.org i den här sessionen.

**Det bästa vi kan ta:**
- Kalibreringen *Criteria, not conventions*. Den motsvarar vår regel om grind eller instruktion (`guide/README.md`) och vår norm att WCAG 2.2 AA är golvet (2-8 [N1]).
- Tabellen *Before you finish* som sökmönster till en granskare som rapporterar.
- Beslutsordningen för uppläsning och alt-text-tabellen (`screen-readers.md`).
- Undantaget för träffytor och receptet med pseudo-element (`hit-areas.md`). Webb-pros 44 px står redan som granskningskriterium och inte som kontroll (2-8 [N2]), vilket stämmer med skillen.
- Felmönstret och autocomplete-tabellen (`forms.md`), som passar kontaktformuläret.
- Tabellen *stäng av, ersätt, behåll* för reducerad rörelse (`motion-and-zoom.md`).
- APG-tabellen med tangenter per widget (`focus-and-keyboard.md`), för menyn, flikar och accordion.

**Var det hamnar hos oss:** Destilleras in i `.claude/skills/kvalitet/tillganglighet.md`.
- Skälet är att den är kärnan i kvalitetsskillen: konkret, kriteriebaserad och redan uppdelad i krav och rekommendationer.
- Krav med kriterienummer blir regler som kan bli kontroller.
- 44/40 px, APG och regeln om en `<h1>` blir instruktioner.
- Sökmönstren går till granskarskillen `granska` som underlag, inte som grind.

**Passar vår stack?**
- **Kan tas nästan som det är:**
  - Allt i HTML och CSS: fokus, skip link, `scroll-padding`, träffytor, kontrast, `.sr-only`, alt-text, landmärken och reflow.
  - Tailwind-exemplen (`focus-visible:outline-…`, `motion-safe:`, `sr-only`) går att använda direkt nu när Tailwind är tillåtet (BESLUT 2026-10-16 kl. 12.28).
  - TSX-exemplen fungerar i React-öar.
- **Kostnad i JavaScript per sida:** nästan ingen. `<dialog>` med `showModal()` behöver några rader vanilla-JS, eller ingen alls med invoker commands (se modern-web-guidance). Roving tabindex, combobox och live-regioner kräver JavaScript, men bara där sådana widgetar finns. En React-ö med `client:visible` drar React-runtime, och ⚠️ den kostnaden har jag inte mätt.
- **Gäller inte statiskt:** avsnittet om SPA-routning (title och fokus vid klientnavigering). Det blir aktuellt först med en klientrouter, och guiden avråder från `<ClientRouter />` (2-6 [N2]).
- **Krockar som tas upp med Johnny:**
  - Rörelse: skillen ersätter förflyttning med opacitet under `reduce`. Det är förenligt med 2-6 [N1], där opacitet och färg får stå kvar.
  - Ingen krock med Lighthouse 100 eller *HTML först*. Native-reglerna stöder båda.

**Risker och flaggor:**
- **Licens:** ingen risk.
- **Telemetri:** ingen i skillen. Installation via `npx skills add` går genom skills.sh, men vi installerar inte.
- **Betalvägg:** ingen.
- **Krockar med andra skills:**
  - modern-web-guidance säger 48 px (`forms.md`) och 44 px (`checkbox.md`), mot skillens 24 som norm. Vi följer 2.5.8.
  - modern-web-guidance vill gråa ut sändknappen efter giltig sändning, medan skillen vill ha `aria-disabled` så att fokus inte tappas.
  - modern-web-guidance avråder från att läsa upp "Laddar…", medan skillen läser upp det artigt.
  - Användarnivåns `emil-design-eng` och `mobile-native` (i `~/.claude/skills`) används inte av byggsessionen (CLAUDE.md).

**Inloggning:** Nej. Repot, jakub.kr och skills.sh går att läsa utan konto, och inget har krävt inloggning.
