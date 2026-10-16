# /goal, Stop-hook och granskar-subagent

**Källa:** Claude Code-dokumentationen, hämtad som markdown 2026-10-16 kl. 12.20 (`kallor/fg/docs/`): [goal](https://code.claude.com/docs/en/goal), [hooks](https://code.claude.com/docs/en/hooks) (*Stop*, *Prompt-based hooks*, *Agent-based hooks*), [hooks-guide](https://code.claude.com/docs/en/hooks-guide) (*Stop hook hits the block cap*), [sub-agents](https://code.claude.com/docs/en/sub-agents) (*What loads at startup*, frontmatter), [best-practices](https://code.claude.com/docs/en/best-practices). Läst 2026-10-16 mot lokala Claude Code 2.1.301 (senaste release v2.1.301, 2026-10-15). Ärenden i anthropics/claude-code via `gh`.
**Licens:** Claude Code är proprietärt; GitHub-API:t anger ingen licens, och LICENSE.md säger "All rights reserved", användning enligt Commercial Terms (`kunskap/research/2026-10-15_kompetensluckor-anteckningar/flodet-loopar-bedomare.md` §1). Vi använder funktionerna och destillerar dokumentationen med egna ord. Inget kopieras.

## Vad det är
Tre inbyggda delar som tillsammans blir loopen. `/goal` är en promptbaserad Stop-hook som gäller sessionen: efter varje tur avgör en liten modell om villkoret håller. En Stop-hook i settings kör ett skript, en prompt eller en agent när Claude vill sluta. En egen delagent startar med ren kontext och egna verktyg och kan därför granska utan byggarens resonemang.

## Hur det fungerar
- **`/goal`:**
  - Ett mål per session, med ett villkor på högst 4 000 tecken.
  - Utvärderaren ger tre svar: *inte uppfyllt* (skälet blir nästa instruktion), *uppfyllt* eller *omöjligt*.
  - Den kör inga kommandon och läser inga filer, så villkoret måste kunna visas i Claudes egen utdata.
  - Ett turtak ("or stop after 20 turns") bedöms också av modellen ur samtalet. Det är alltså inget hårt tak.
  - Om Claude svarar utan verktygsanrop flera turer i rad stoppas loopen, men målet ligger kvar.
  - Inloggnings- och kreditfel, kontextöverflöd och en modell som inte finns rensar målet. Rate- och användningsgränser pausar det.
  - Vid återupptagning finns målet kvar, men turräkningen nollställs.
  - `/goal` kräver workspace trust och fungerar inte med `disableAllHooks`.
  - Utvärderaren körs på den lilla snabba modellen. `ANTHROPIC_DEFAULT_HAIKU_MODEL` byter den, men också all bakgrundsfunktion.
- **Stop-hookens indata:** `stop_hook_active` (sant när Claude redan fortsätter på grund av en Stop-hook), `last_assistant_message`, `background_tasks` och `session_crons`. `transcript_path` kan släpa efter vid Stop. Läs därför sista svaret ur `last_assistant_message`.
- **Blockera:** kod 2 med skälet på stderr, eller JSON `{"decision":"block","reason":…}` på stdout. `additionalContext` ger vägledning utan felmarkering men har samma loopskydd.
- **Taket på åtta:** efter åtta fortsättningar i rad tar Claude Code över och avslutar turen. Räkningen **nollställs varje gång Claude anropar ett verktyg** (hooks.md, *Stop input*). I en loop där Claude arbetar slår taket alltså nästan aldrig till. Hooken måste räkna varven själv. Taket kan höjas med `CLAUDE_CODE_STOP_HOOK_BLOCK_CAP`.
- **Prompthook** (`type: "prompt"`): ett modellanrop som svarar `ok`, `reason` och, för Stop och SubagentStop, `impossible`. Standardtidsgräns 30 s, och modellen kan väljas med `model`.
- **Agenthook** (`type: "agent"`): en delagent med verktyg, upp till 50 turer, 60 s som standard och utan `impossible`. Den är **experimentell**, och dokumentationen rekommenderar kommandohooks i produktion.
- **Delagentens kontext:**
  - En vanlig egen delagent laddar **alla nivåer av `CLAUDE.md`** (användare, projekt, `CLAUDE.local.md`, regler, `AGENTS.md`) och git-status.
  - Med `omitClaudeMd: true` (2.1.271+) laddas bara managed policy. Explore och Plan hoppar också över `CLAUDE.md`.
  - **Undantag:** en underkatalogs `CLAUDE.md` och sökvägsregler laddas ändå när delagenten läser filer där.
  - En fork (`/subtask`, typen `fork`) ärver hela samtalet.
  - Övriga fält i frontmattern: `tools`, `disallowedTools`, `model`, `effort`, `maxTurns`, `skills` (förladdas), `hooks` (Stop blir SubagentStop) och `isolation`.
- **Rapporten:** SubagentStop-hooks får `last_assistant_message`. En delagent som lämnar över med `SubagentHandback` (2.1.271+) har rapporten i `tool_input.message`, som en PreToolUse-hook på `SubagentHandback` kan läsa.
- **Fyra nivåer** i *Best practices*: kontroll i prompten, `/goal`, Stop-hook som deterministisk grind, och en andra bedömning av en verifierande delagent, "so the agent doing the work isn't the one grading it".

## Kvalitet och underhåll
anthropics/claude-code: 151 165 ★, 59 bidragsgivare (sista sidan i `contributors?anon=1`), 15 061 öppna ärenden och PR, senaste push 2026-10-15. Kända problem:
- `/goal`: [#100634](https://github.com/anthropics/claude-code/issues/100634) `/goal clear` köas för evigt; [#93744](https://github.com/anthropics/claude-code/issues/93744) utvärderaren ser inte villkoret; [#98066](https://github.com/anthropics/claude-code/issues/98066) loop när auto mode nekar det enda återstående steget; [#100010](https://github.com/anthropics/claude-code/issues/100010) loop när sista steget kräver inloggning av användaren; [#102355](https://github.com/anthropics/claude-code/issues/102355) blockerar varje stopp medan den väntar på något externt.
- Stop-hook: [#99171](https://github.com/anthropics/claude-code/issues/99171): kod 2 räknas tyst som *icke-blockerande* när stdout är tomt och stderr innehåller "no such file" eller "can't open". Felet är oförändrat i 2.1.288 och återanmält efter #60490.
- Delagenter: [#92750](https://github.com/anthropics/claude-code/issues/92750): delagenter får minnesindex och skillistan, tvärt emot dokumentationen. [#100366](https://github.com/anthropics/claude-code/issues/100366) (stängd) ledde till att dokumentationen nu säger att en underkatalogs `CLAUDE.md` laddas trots `omitClaudeMd`.

## Det bästa vi kan ta
1. **Det löser ⚠️ i `guide/3-1`** (*Den som bygger dömer inte*): delagenter laddar projektets `CLAUDE.md`. Granskarens definition får `omitClaudeMd: true`. Underlaget till granskaren läggs där ingen `CLAUDE.md` finns i katalogkedjan under repots rot, eftersom `sites/<namn>/CLAUDE.md` annars laddas så fort granskaren läser briefen där (tolkning av *What loads at startup*). Förslag till Johnny.
2. **Grindhookens regler** (N2, `.claude/hooks/grind-stopp.mjs`): räkna varven i en fil och läs `stop_hook_active`. Blockera med JSON på stdout i stället för kod 2 och stderr (#99171), läs `last_assistant_message`, och gå till Johnny (`blocked`) vid vårt eget tak. Litar inte på taket på åtta.
3. **Villkoret för `/goal`:** ett mätbart slutläge, en angiven kontroll ("`node skript/kontroll.mjs` avslutas med 0"), det som inte får ändras, ett turtak och en utgång: "eller stanna när ett steg kräver Johnny (inloggning, publicering, en nekad åtgärd)" (#98066, #100010). Taket i `/goal` är mjukt. Det hårda taket bor i hooken.
4. **Ingen agenthook som grind:** den är experimentell. Kommandohooken kör kontrollskriptet, och domen bor i koden.
5. **Granskarens rapport kan prövas av koden:** en kommandohook på SubagentStop, eller PreToolUse på `SubagentHandback`, kontrollerar att varje fynd har element, förväntat, faktiskt och kriterium (`guide/3-2`, *Fynden som JSON*). Saknas något går rapporten tillbaka. Idé, N2.
6. **Granskarens definition:** en namngiven egen typ i `.claude/agents/`, aldrig `fork` eller `/subtask`, med `omitClaudeMd: true`, `skills: [granskare]`, få verktyg och `maxTurns`.

## Var det hamnar hos oss
**Skill: `larande`, delfil `loopen.md`** (håller med förslaget): varvräkningen, nollställningen vid verktygsanrop, #99171, utgången i `/goal`-villkoret och att agenthooks är experimentella. Delagentdelen (punkt 1 och 6) hör till **skillen `granskare`** och granskarens agentdefinition. Svaret på ⚠️ i `guide/3-1` läggs fram för Johnny som förslag. Själva hooken är N2 och byggs när steg körs utan att Johnny tittar.

## Passar vår stack?
Det är inbyggt och oberoende av stacken. Byggsessionen kör i auto mode, och `/goal` lägger till det som saknas mellan turerna. Kombinationen ger loopen i #98066 när klassificeraren nekar, och därför behöver villkoret en utgång till Johnny. I N1 används ingen hook och inget `/goal`, eftersom Johnny tittar (`guide/3-1`). `/goal` och projekthooks kräver att repot är betrott i `~/.claude-bygg` ⚠️ (inte kontrollerat här).

## Risker och flaggor
- Proprietärt och knutet till Johnnys abonnemang. Utvärderingen kostar enligt dokumentationen "typically negligible".
- Agenthooks är experimentella och prompthooks är modellbedömningar. Ingen av dem får vara en grind för det mätbara.
- Krock: flera Stop-hooks körs alla, och en enda blockering räcker. `ralph-loop`, `hookify` och vår grindhook skulle stapla blockeringar, och varken ralph-loop eller hookify läser `stop_hook_active` (claude-plugins-official [#5312](https://github.com/anthropics/claude-plugins-official/issues/5312)).
- ⚠️ Inte prövat här: hur `omitClaudeMd` samspelar med #92750 (skillistan följer ändå med).

## Inloggning
Inget. Dokumentationen är öppen och byggsessionen är redan inloggad.
