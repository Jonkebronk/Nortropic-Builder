# better-interface-review

> **Namnfel i inventeringen:** skillen heter `interface-review` i repot, inte `better-interface-review`.
> - Katalog, frontmatter och `display_name` säger alla `interface-review`.
> - Inget med namnet `better-interface-review` finns i historiken (`gh api …/commits?path=skills/better-interface-review` ger 0 träffar).
> - Repots `AGENTS.md` säger att en skill som användaren startar själv får släppa prefixet `better-`.

**Källa:** https://github.com/jakubkrehel/skills, sökvägen `skills/interface-review/`.
- Läst 2026-10-16 vid commit `4c66b1fa86e9` (repot, 2026-10-12). Senaste ändringen i skillen är `da5f6d5974` (2026-10-05). Skillen har 21 commits sedan 2026-08-06.
- Pluginet `interfaces` har version 1.13.2. Det finns ingen ändringslogg och inga releaser.
- Lästa filer, i sin helhet: `SKILL.md`, `removed-signals.md`, `scope-resolution.md`, `agents/openai.yaml`, repots `README.md` och `AGENTS.md`.

**Licens:** MIT, © 2026 Jakub Krehel. Licensen kräver att copyright- och licenstexten följer med när väsentliga delar kopieras. Vi skriver med egna ord (tolkning).

**Vad det är:** En procedurskill som granskar en *ändring* (gren, PR eller ocommittat arbete) och letar efter gränssnittsfel som ändringen infört eller försämrat. Den startas bara av användaren (`disable-model-invocation: true`). Domänreglerna hämtas från `better-*`-skillsen, och skalan, taket och domen från `better-interface`.

**Hur det fungerar:**
- **Avgränsning** (`SKILL.md` §1–2, `scope-resolution.md`):
  - I första hand granskas intervallet från merge-basen plus det ocommittade, och annars bara det ocommittade.
  - Finns ingen ändring frågar skillen och erbjuder öppen PR, sista commit, ett eget mål eller en granskning av hela repot. Den gissar aldrig `HEAD~1`.
  - Fällor den hanterar: shallow clone, detached HEAD och pågående rebase eller merge.
  - Lockfiler, snapshots, genererat, vendrat och binärt utesluts. Typsnitt och bilder i komponenter räknas ändå.
- **Ändringens räckvidd** (§3): en ändrad fil är bevis, inte granskningsobjekt.
  - Granskningen går ett steg ut till direkta konsumenter, och två steg för tokens och delade primitiver.
  - Högst 5 konsumenter. Sidor och layouter, bland dem `*.astro`-sidor, tas först, sedan efter antal importörer.
- **Borttagna rader** (§4, `removed-signals.md`): en tabell över signaler som försvunnit.
  - Exempel: `aria-*`, `alt`, `<label>`, `:focus-visible`, `outline`, `tabindex`, `prefers-reduced-motion`, `prefers-contrast`, logiska egenskaper, `lang`/`dir`, `text-wrap`, `tabular-nums`, token som blir literal, borttagen text.
  - Varje signal har en ägare. Det finns en lista över likvärdiga ersättningar som inte räknas som regression, och ett `git diff | grep`-recept för den borttagna sidan.
- **Status per fynd** (§5): *Introduced*, *Regression* eller *Pre-existing*. Status bestäms av orsaken, inte av platsen, och prövas med `git blame` mot intervallet. Högst 3 fynd av typen *Pre-existing* tas med.
- **Ändringen mot sitt syfte** (§6): PR-text och commits läses för att hitta ofullständiga ändringar. Exempel: en ny variant som saknar hover, fokus, disabled eller loading, en ny komponent utan tomt läge, fel eller smal bredd, eller en ny sträng som inte finns i översättningskatalogen.
- **Läsläge** (§8): skillen kör aldrig `checkout`, `switch`, `stash` eller `gh pr checkout`. `fetch` och `git show` är tillåtna, och rendering sker i en separat worktree.

**Kvalitet och underhåll:**
- **Repot:** 7 968 stjärnor, 2 bidragsgivare. Källa: GitHubs API via `gh api`.
- **skills.sh:** 16,3 tusen installationer, först sedd 2026-08-06.
- **Säkerhetsgranskning:** Gen Agent Trust Hub *Pass*, Socket *Pass*, Snyk *Warn*. Snyks varning är W011, MEDIUM, 2026-10-06: skillen läser PR-texter, commits och diffar som kan komma från utomstående och innehålla injicerade instruktioner.
- **Kända problem:**
  - #26 och #34 (stängda): skanningen av borttagna signaler ska använda det upplösta intervallet. Rättat.
  - PR #21 (öppen) punkt 4: fel modell för pathspec i `scope-resolution.md`. Dagens text har redan den korrekta förklaringen.

**Det bästa vi kan ta:**
- Tabellen över borttagna signaler och listan över likvärdiga ersättningar (`removed-signals.md`). Det är den mest återanvändbara delen för ändringsagenten i lager 9.
- Statusen Introduced, Regression eller Pre-existing, prövad med `git blame` (§5). Johnny ser då vad ändringen orsakade och vad som fanns innan.
- "Ändringen mot sitt syfte", alltså att leta efter saknade lägen (§6). Det passar när en sektion i biblioteket ändras.
- Regeln att inte gissa vid tomt omfång (§2) och läsläget (§8).
- Tabellen över uteslutna sökvägar (`scope-resolution.md`). Den kompletteras med Astros `dist/` och `.astro/`.

**Var det hamnar hos oss:**
- Destilleras in i `.claude/skills/kvalitet/`, som delen om hur en *ändring* granskas: borttagna signaler och status. Det behövs eftersom biblioteket och kundsajterna ändras löpande och standarden ska gälla även förvaltningens ändringar (2-8 [N2]).
- Används också som underlag till granskarskillen `granska`, som granskar PR och diffar innan Johnny godkänner (3-2).
- Själva gitmekaniken (avgränsning, fällor) passar bättre i `granska` än i `kvalitet`.

**Passar vår stack?**
- **Kan tas nästan som det är:** hela proceduren. Den förutsätter inget ramverk och nämner redan `*.astro`-sidor.
- **JavaScript per sida:** noll. Det är en granskningsmetod.
- **Krockar som tas upp med Johnny:** inga med Lighthouse 100, *HTML först* eller rörelsereglerna.
- **Ett tillägg vi behöver:** `client:load`, `client:visible` eller en ny React-import i en ändring bör vara en egen signal. Då syns ny JavaScript per sida i granskningen. Det är mitt förslag, inte källans.

**Risker och flaggor:**
- **Licens:** ingen risk.
- **Telemetri:** ingen.
- **Betalvägg:** ingen.
- **Säkerhet:** text från PR, issues och commits är data och inte instruktioner. Det gäller hos oss också, eftersom Snyk flaggade W011.
- **Krockar med andra skills:**
  - Den förutsätter att `better-interface` finns och stannar annars efter avgränsningen.
  - Claude Codes inbyggda `/code-review` och `/security-review` täcker korrekthet och säkerhet. Skillen lämnar dem uttryckligen till en vanlig kodgranskning, så de kompletterar varandra.

**Inloggning:** Nej för att läsa källan. Att använda skillen mot en PR kräver `gh` med inloggning, men det har inte prövats här.
