# claude plugin eval

**Källa:** [Test plugins with evals](https://code.claude.com/docs/en/plugin-evals), hämtad som markdown 2026-10-16 kl. 12.20 (`kallor/fg/docs/plugin-evals.md`, hela sidan läst). [Plugin loading reference](https://code.claude.com/docs/en/plugins/loading) och [Create a plugin](https://code.claude.com/docs/en/plugins/create), lästa 2026-10-16. [Skills](https://code.claude.com/docs/en/skills), *Evaluate and iterate on a skill*. `claude plugin eval --help` i lokala Claude Code 2.1.301 (bara hjälptexten, inga fall körda). Ärenden i anthropics/claude-code via `gh`.
**Licens:** En del av Claude Code (proprietärt, Commercial Terms). Det finns ingen kod att låna. Vi skriver egna fall.

## Vad det är
Ett skalkommando som kör ett plugins testsvit i isolerade, icke-interaktiva sessioner. Varje fall bedöms med graders, och resultatet jämförs med samma körning utan pluginet (Δ). Utdata är en rapport, ett JSON-dokument och en avslutningskod för CI. `claude plugin eval init` intervjuar författaren och skriver förslag till fall.

## Hur det fungerar
- **Krav:** Claude Code 2.1.269+, git 2.31+ och en pluginkatalog med `plugin.json` eller `.claude-plugin/plugin.json`, eller ett *skills-directory plugin*.
- **Ett fall** är `evals/<fall>/prompt.md` med frontmatter (`max_turns` 10 som standard och högst 200, `timeout_seconds` 300 och högst 3 600, `allowed_tools`, `model`, `runs` 3 som standard, `env` bara `EVAL_*`) och `graders/*.md`. `case.yaml` lägger till `scaffold_script`, som bara körs med `--scaffold`, som du själv och utanför sandlådan, i högst 120 s. Den lägger också till `history_file` och `add_dirs`, som ger läsrätt.
- **Sex graders:** `regex`, `tool_used`, `tool_order` och `file_exists` kostar inget. `llm` godkänner när domaren röstar PASS i minst två av tre röster, och `baseline` jämför mot ett referenstranskript. "There are no custom-code graders". En `llm`-domare ser PNG, JPEG, GIF och WebP som bilder. Domaren är som standard bakgrundsmodellen (haiku enligt `--help`) och väljs med `--judge-model`.
- **Poäng:** en körnings poäng är andelen godkända graders, och fallets poäng är medel över körningarna. Fallet godkänns vid `--threshold`, som är 1,0 som standard. I två armar räknas inte `tool_used: Skill` in i poängen utan visas bara som en indikator, så att Δ inte blåses upp.
- **Isolering:** tillfällig hemkatalog, arbetskatalog och konfiguration, och ett barn med `claude -p` där bara pluginet är laddat. Inga användarinställningar, hooks, `CLAUDE.md`, MCP, andra plugins, minne eller skills laddas. Ingen projektkatalog `.claude/` läses. Agenten kan inte se fallens definitioner. Artifact-verktyget är avstängt. Bara läsverktyg är tillåtna utan `--allow-tools`, och Bash körs i operativsystemets sandlåda med begränsat nät.
- **Kostnad:** fall × körningar × 2 armar agentkörningar, plus tre domaranrop per `llm`- eller `baseline`-grader och körning. `--max-cost-usd` sätter ett tak på listpriset. "Every eval run and every judge grader is a real model call on your account".
- **Utdata:** `report.html`, `aggregate-result.json` (`schemaVersion: 1`) och avslutningskod 0, 1, 2, 130 eller 143. Med inloggning på claude.ai-abonnemang **publiceras rapporten som privat artifact** om inte `--no-publish` anges. Körningar som en Claude-session startat stannar lokalt.
- **Råd:** `regex` för lång utdata och `llm` för kort. En grader på resultatet och en på vägen dit. Lås både modell och domare.

**Kan `.claude/skills` utvärderas utan `plugin.json`? Nej, enligt dokumentationen.** Ett skills-directory plugin är en katalog *med* `.claude-plugin/plugin.json` under `~/.claude/skills/` eller projektets `.claude/skills/`, och den laddas som `<namn>@skills-dir` (*Plugin loading*, ursprungstabellen). Vanliga skills (`.claude/skills/<namn>/SKILL.md`) är inga plugins. Vägar runt det:
(a) Ett omslag: en pluginkatalog med manifest och en *kopia* av skillen under `skills/`. Symlänkar som leder ut ur pluginet avvisas ("path escapes plugin directory").
(b) Ett manifest i `.claude/skills/<x>/.claude-plugin/plugin.json`. Då får skillen prefixet `x:` och laddas bara när sessionen startas i repots rot och mappen är betrodd.
(c) Ingen eval: sätt skillen till `"off"` i `skillOverrides` för baslinjen (*Skills*).
⚠️ Inte prövat i praktiken, eftersom provet kräver att en katalog betros, och det ändrar konfigurationen.

## Kvalitet och underhåll
Funktionen ingår i anthropics/claude-code (151 165 ★, 59 bidragsgivare, senaste release v2.1.301 2026-10-15). Den är ung och ändras ofta: git-kontrollen kom i 2.1.283 och poängsättningen vid API-fel i 2.1.299. Anthropic kan stänga av den på serversidan ("plugin eval is currently unavailable"). Öppna ärenden:
- [#96121](https://github.com/anthropics/claude-code/issues/96121): sandlådan laddar aldrig pluginets egna `agents/*.md`.
- [#99246](https://github.com/anthropics/claude-code/issues/99246): beroenden laddas inte, så fallen bedömer den nakna modellen.
- [#98690](https://github.com/anthropics/claude-code/issues/98690): `add_dirs` kopierar inte fixturerna.
- [#92017](https://github.com/anthropics/claude-code/issues/92017): `target: trace` omfattar mer än den bedömda körningen.
- Sandlådefel på Linux och Docker: [#97171](https://github.com/anthropics/claude-code/issues/97171), [#99269](https://github.com/anthropics/claude-code/issues/99269), [#93368](https://github.com/anthropics/claude-code/issues/93368). Inget av dem gäller macOS.

## Det bästa vi kan ta
- **Armarna som metod för vårt prov med och utan** (`guide/3-2`, C164): samma fall med och utan, tre körningar per arm, och en indikator på att skillen användes som inte räknas in i poängen.
- **Graderdisciplinen:** regex på lång utdata, `llm` bara på kort och med konkreta PASS- och FAIL-villkor, och en grader på resultatet plus en på vägen. Samma regel gäller vår granskare: domen i ett fast format som ett skript kan läsa.
- **Mätningen av granskaren som svit** (senare): ett fall per sajt i måttstocken, med skärmdumparna som fixtur och en gratis `regex`-grader på domraden mot Johnnys dom. Tre körningar per sajt visar hur stabil domen är, något `mattstock/verktyg/matning.py` inte mäter i dag. TPR och TNR räknas fortfarande ur `aggregate-result.json`. Det är ett förslag och oprövat. Kostnaden för 31 sajter × 3 × 2 med bilder är okänd ⚠️, så börja med `--runs 1 --ablation none`.
- **`--no-publish` alltid** när ett fall innehåller kundmaterial.

## Var det hamnar hos oss
**Senare, men N4 och inte N2** (säger delvis emot förslaget). `guide/3-2` placerar redan `claude plugin eval` i [N4] *En ändring i taget*, och för det första finns tre skäl:
1. Det kräver pluginform, och byggsystemet som plugin är N4 (`guide/3-4`).
2. Det mäter skillen utan `CLAUDE.md` och utan våra andra skills, alltså inte så som den används.
3. Funktionen är ny och har öppna fel i just fixturer och agenter.

Till dess räcker `matning.py` och provet med och utan i `larande/skills.md`. Metodpunkterna ovan förs in där nu. Om Johnny vill ha upprepade körningar av mätningen tidigare, kan ett omslag i scratch prövas i N2 (förslag).

## Passar vår stack?
Det är oberoende av stacken. Ett fall som bygger Astro behöver Bash, npm och nät i sandlådan (`--allow-tools "Bash(npm *)"` och domäner), vilket är tungt. Utvärdera hellre skills mot fasta fixturer (skärmdumpar, HTML, brief) än mot hela byggen. Standardgränserna (10 turer, 300 s) är för snäva för en granskare som går igenom sektion för sektion. Höj `max_turns`.

## Risker och flaggor
- Varje körning dras från Johnnys abonnemang eller API-räkning.
- Rapporten publiceras på claude.ai som standard. Skyddsräcket säger att kunduppgifter inte publiceras, så använd `--no-publish`.
- Svaret ja på betrofrågan betror hela repot, och `--scaffold`-skript körs utanför sandlådan.
- Formatet är inte kompatibelt med skill-creators `evals.json`. Två format för samma sak strider mot *en plats per sak*.
- ⚠️ Oprövat: hur barnprocessen får inloggningen när byggsessionen kör med `CLAUDE_CONFIG_DIR=~/.claude-bygg`.

## Inloggning
Kräver Claude Codes vanliga inloggning, som redan finns. Publicering av rapporter kräver claude.ai-abonnemang, men den stängs av med `--no-publish`. Johnny behöver inte logga in på något nytt.
