# Verifiering av Claude Code-påståenden mot dokumentation och lokal installation

**Datum:** 2026-10-14 (slutförd 2026-10-15)
**Lokal version:** `claude --version` → `2.1.281 (Claude Code)` (npm-paket `@anthropic-ai/claude-code@2.1.281`, släppt 2026-09-23 enligt changelog)
**Senaste version i changelog vid kontrolltillfället:** 2.1.300 (2026-10-14). Användaren ligger alltså 19 versioner efter.

**Metod**
- Officiell dokumentation hämtad som råmarkdown från `https://code.claude.com/docs/en/<sida>.md` (index: `https://code.claude.com/docs/llms.txt`) och genomsökt ordagrant (ingen sammanfattningsmodell mellan källa och citat).
- Changelog (`https://code.claude.com/docs/en/changelog.md`) användes för att avgöra i vilken version varje funktion infördes.
- Lokalt: `claude --help`, `claude plugin --help`, `claude agents --help`, och strängsökning i den installerade binären (`claude.exe`) för att se om en funktion/nyckel finns i just 2.1.281. Att en sträng finns i binären bevisar att koden finns, inte att funktionen är påslagen för kontot.
- `~/.claude/settings.json` lästes (endast läsning). Inget ändrades, ingen interaktiv session startades, ingen commit.

**Viktig förbehållsregel:** Dokumentationen beskriver den senaste versionen (2.1.300). Där dokumentationen anger "Requires Claude Code v2.1.X or later" med X > 281 gäller funktionen *inte* användarens installation.

---

## Sammanfattningstabell

| # | Påstående | Status | Korrekt syntax / namn | Källa |
|---|---|---|---|---|
| 1a | Mods är UI-tillägg som levereras i plugins | Bekräftat | En mod är en plugin vars `hooks/hooks.json` har en `modules`-nyckel som pekar på `.js`/`.ts`-fil | plugins/mods/overview, plugins/components#hooks |
| 1b | Mods syns i terminal och desktop-app men inte i VS Code | Bekräftat (med nyans) | VS Code-chattpanelen: mod-hooks *körs*, men det de ritar *visas inte*. Ritning visas i terminal (även editorns integrerade terminal och JetBrains) och Desktop Code-fliken (ej WSL) | plugins/mods/overview#where-mods-run |
| 1c | Mods finns i 2.1.281 | **Avviker** | Officiellt på från **v2.1.287** (terminal), v2.1.286 (Desktop). I 2.1.281 finns endast early access bakom `CLAUDE_CODE_ENABLE_FUNCTION_HOOKS=1` (lokal binär) | changelog 2.1.287 "Added Claude Mods"; lokal binär |
| 1d | Installation / lagring / läge | Bekräftat | `/plugin install <plugin>@<marknadsplats>` eller `claude plugin install …`; egna utvecklingsmods i `~/.claude/dev-mods/<session-id>/`; inget särskilt läge krävs (fullscreen påverkar bara var paneler placeras); avstängda av `--safe-mode`, `--bare`, `disableAllHooks` | plugins/mods/overview, plugins/mods/create |
| 2 | `/goal` och skillnad mot `/loop` | Bekräftat, finns i 2.1.281 (sedan 2.1.139) | `/goal <villkor>`, `/goal` (visa), `/goal clear` (även stop/off/reset/none/cancel). `/loop [intervall] [prompt]` kör på tidsintervall | goal, commands, scheduled-tasks |
| 3 | Monitor-verktyget | Bekräftat, finns i 2.1.281 (sedan 2.1.98) | Verktygsnamn `Monitor`; behörighet som Bash (`Bash(npm run *)` gäller Monitor); deadline 5 min standard, max 30 min; på Windows krävs Git Bash | tools-reference#monitor-tool |
| 4a | Pluginformat med `plugin.json` | Bekräftat | `.claude-plugin/plugin.json` (endast `name` krävs). Komponenter: `skills/`, `commands/`, `agents/`, `hooks/hooks.json`, `.mcp.json`, LSP, executables, default settings, teman/output styles, channels, monitors, workflows, mods | plugins/overview, plugins/components |
| 4b | `/plugin` | Bekräftat | `/plugin [subcommand]`; CLI: `claude plugin install|list|enable|disable|update|uninstall|marketplace|validate|details|tag|prune|eval|init` | commands; `claude plugin --help` lokalt |
| 4c | Egen marknadsplats via GitHub-repo | Bekräftat | Repo med `.claude-plugin/marketplace.json`; `claude plugin marketplace add <owner>/<repo>` eller `/plugin marketplace add owner/repo#v1.2.0` | plugins/create-marketplace, plugins/install |
| 4d | Versionslåsning | Bekräftat | Marknadsplats: `#ref` vid add. Plugin-källa: `"ref"` och/eller `"sha"` (40 tecken), arkiv: `"sha256"`. Beroenden: semver-intervall i `dependencies` (`"version": "~2.1.0"`). `version` i plugin.json håller användare kvar tills den ändras | plugins/marketplace-reference, plugins/dependencies |
| 5 | Dynamiska arbetsflöden som JS-skript | Bekräftat, finns i 2.1.281 (sedan 2.1.154) | JavaScript med top-level `await`, `meta`-block, `agent()`, `pipeline()`, `parallel()`; ingen `import()`. Sparas i `.claude/workflows/` eller `~/.claude/workflows/`. `/workflows` visar körningar | workflows |
| 5b | Kostnad/varningar | Bekräftat | `Large workflow`-varning vid >25 agenter eller >1,5 M projicerade token; varningen är rådgivande. Standard max 16 samtidiga agenter (`CLAUDE_CODE_WORKFLOW_MAX_CONCURRENT_AGENTS`, 1–256). Ultracode ökar tokenförbrukning | workflows#cost |
| 6a | Hooks som lägger till kontext: UserPromptSubmit, SessionStart | Bekräftat (fler finns) | `hookSpecificOutput.additionalContext`, eller vanlig stdout vid exit 0 för `UserPromptSubmit`, `UserPromptExpansion`, `SessionStart`, `PostModelSwitch`. Även PreToolUse, PostToolUse, PostToolUseFailure, SubagentStart, Stop/SubagentStop m.fl. tar `additionalContext` | hooks#exit-code-0, hooks#add-context-for-claude |
| 6b | Stop-hook med exit 2 | Bekräftat | Exit 2 på `Stop` = "Prevents Claude from stopping, continues the conversation"; stderr blir skälet Claude får. Loopskydd: `stop_hook_active` och tak på 8 fortsättningar i rad | hooks#exit-code-2-behavior-per-event, hooks#stop-decision-control |
| 6c | PreToolUse som blockerar | Bekräftat | Exit 2 blockerar verktygsanropet (stderr till Claude), eller JSON `hookSpecificOutput.permissionDecision: "deny"`. Exit 2 vinner även över JSON `"allow"`. Deny/ask-regler utvärderas oavsett vad hooken returnerar | hooks#exit-code-2, hooks#pretooluse-decision-control |
| 7a | `permissions.deny` med Bash-mönster | Bekräftat | `"Bash(git push *)"`, `"Bash(rm *)"`, `"Bash(curl *)"`; `:*` är likvärdigt med ` *` i slutet | permissions#bash |
| 7b | Read-mönster för `.env` | Bekräftat | `"Read(./.env)"`, `"Read(./.env.*)"`, `"Read(./secrets/**)"`; `//` = absolut sökväg, `~/` = hemkatalog, `/` = relativt inställningskällan | permissions#read-and-edit, settings-reference#permissionsdeny |
| 7c | Begränsa läsrätt per delagent via `tools` | **Avviker delvis** | `tools`/`disallowedTools` styr bara *vilka verktyg*, inte sökvägar. En post med specificerare i `disallowedTools` (t.ex. `Bash(git push *)`) tar bort hela verktyget. Sökvägsbegränsning per agent: ej bekräftad via `tools`; dokumenterat alternativ är agent-scopade `hooks` i frontmatter (ignoreras för plugin-agenter) eller globala deny-regler | sub-agents#supported-frontmatter-fields |
| 8 | Settings-nycklar för auto mode, effort, modell, `CLAUDE_CODE_*` | Bekräftat (se lista nedan) | `permissions.defaultMode: "auto"`, `autoMode`, `disableAutoMode`, `effortLevel`, `maxEffortLevel`, `modelSettings`, `model`, `advisorModel`, `ultracode`; per agent: `model`/`effort` i agentens frontmatter | settings-reference, env-vars, sub-agents |
| 9a | Agent dashboard: `claude agents`, `--bg`, `/bg` | Bekräftat, finns i 2.1.281 | `claude agents` (research preview), `claude --bg`/`--background`, `/background` med alias `/bg`, `claude attach/logs/stop/rm <id>` | agent-view, commands; lokal `--help` |
| 9b | Advisor | Bekräftat (experimentell) | `/advisor [model|off]`, nyckel `advisorModel`, av med `CLAUDE_CODE_DISABLE_ADVISOR_TOOL=1`; kräver Anthropic API (ej Bedrock/Vertex/Foundry) | advisor, commands |
| 9c | Safe mode | Bekräftat, finns i 2.1.281 (sedan 2.1.169) | `claude --safe-mode` / `CLAUDE_CODE_SAFE_MODE=1` | cli-reference; lokal `--help` |
| 9d | AskUserQuestion-timeout | Bekräftat | `askUserQuestionTimeout`: `"60s"`, `"5m"`, `"10m"`, `"never"` (standard `never`), scope user/managed; åsidosätts per session av `CLAUDE_AFK_TIMEOUT_MS` | settings-reference#askuserquestiontimeout, tools-reference |
| 9e | `/batch` | Bekräftat | `/batch <instruktion>`; kräver git-repo eller `WorktreeCreate`-hook (utanför git: kräver just v2.1.281+) | commands |
| 9f | `/doctor` | Bekräftat (nyans) | Nu en bundlad skill med alias `/checkup`; `/doctor prompt-audit` kräver v2.1.283 → **inte i 2.1.281**. CLI: `claude doctor` | commands |
| 9g | `/simplify` | Bekräftat | `/simplify [target]` – fyra granskningsagenter, städning (ingen bugg-jakt) | commands |
| 9h | `/security-review` | Bekräftat | `/security-review`; kräver `origin`-remote | commands |
| 9i | Ultra review `/code-review ultra` | Bekräftat | `/code-review ultra` (föredragen), `/ultrareview` alias, `claude ultrareview [target]` i CLI; research preview, molnbaserad, debiteras mot usage credits efter gratiskörningar | ultrareview, commands |

---

## Detaljer per punkt

### 1. Mods

**Vad det är.** Citat (https://code.claude.com/docs/en/plugins/mods/overview):
> "A mod is a plugin that changes how Claude Code looks and behaves. It's made of JavaScript or TypeScript event handlers"

> "Mods work in the Claude Code CLI and in the Code tab of the Claude Desktop app."

**Var de syns** (tabellen "Where mods run" på samma sida):
| Miljö | Hooks körs | Ritning syns |
|---|---|---|
| `claude` i terminal (inkl. editorns integrerade terminal, JetBrains) | Ja | Ja |
| Desktop Code-flik (ej WSL) | Ja | Ja, utom terminal-only-element |
| Desktop WSL-session | Nej | Nej |
| VS Code-tilläggets chattpanel | **Ja** | **Nej** |
| `claude -p` / Agent SDK | Ja | Nej |
| Molnsession | Ja (om plugin följer med) | Nej |

Nyans mot påståendet: i VS Code körs modens logik (t.ex. en `tool.call`-vakt) ändå – bara det visuella saknas.

**Installation.** Citat: "A mod installs as a plugin, from a marketplace. … In a Claude Code session, run `/plugin install token-chart@your-org`. In your shell, run `claude plugin install token-chart@your-org`." Efter installation från skalet under pågående session: `/reload-plugins`.

**Lagring.** Installerade plugins cachas per version (plugins/mods/create: "Claude Code caches an installed plugin by version"). Mods som Claude skriver åt dig: "`~/.claude/dev-mods/` followed by the session's ID". Modens kod pekas ut av `"modules": ["./register.js"]` i `hooks/hooks.json`. Inga Node/bundler krävs: "Claude Code loads `.js` and `.ts` files directly."

**Kräver något läge?** Inget särskilt läge. Paneler blir sidopanel i bred fullscreen-terminal, annars en ram ovanför prompten (plugins/mods/interface). Mods stängs av av `--safe-mode`, `--bare`, `"disableAllHooks": true` och organisationens `allowManagedModsOnly`.

**AVVIKELSE – version.** Citat: "Mods are on by default. In the terminal, use Claude Code v2.1.287 or later. The Desktop app includes its own copy of Claude Code, and mods work there from v2.1.286." Changelog 2.1.287: "Added Claude Mods: plugins may now modify deeper behavior". Lokal 2.1.281-binär innehåller texten "hooks modules are not turned on … (early access: set CLAUDE_CODE_ENABLE_FUNCTION_HOOKS=1 in its environment to load them)". Alltså: i 2.1.281 är mods en avstängd early access-funktion. Dokumentationen säger att variabeln ignoreras från 2.1.287. Strängen `dev-mods` och den inbyggda `cc-plugin-diff` saknas i 2.1.281-binären. `/plugin-authoring` kräver v2.1.287. **Rekommendation:** uppdatera (`claude update`) innan mods används; använd inte early access-flaggan som ersättning.

### 2. `/goal` vs `/loop`

Citat (https://code.claude.com/docs/en/goal): "The `/goal` command sets a completion condition and Claude keeps working toward it without you prompting each step. After each turn, a model checks whether the condition holds."

Jämförelsetabell på samma sida:
- `/goal`: nästa tur startar när föregående tur är klar; stoppar när en modell bekräftar att villkoret är uppfyllt eller omöjligt, vid fel du måste åtgärda, eller `/goal clear`.
- `/loop`: nästa tur startar "when a time interval elapses"; stoppar "You stop it, or Claude decides the work is done". Utelämnat intervall → Claude väljer själv (via `ScheduleWakeup`).
- Stop-hook: samma utlösare som `/goal` men ligger i settings och gäller alla sessioner i scopet.

Övrigt: en aktiv goal per session; ändrar inte behörighetsläget ("To let goal turns run unattended, run `/goal` in auto mode"); utvärderaren läser bara transkriptet ("It doesn't run commands or read files independently"). Fungerar med `-p`. Infört 2.1.139 → finns i 2.1.281. `CLAUDE_CODE_GOAL_CHECKIN_MINUTES` finns i lokal binär.

### 3. Monitor

Citat (https://code.claude.com/docs/en/tools-reference#monitor-tool): "Runs a command in the background and feeds each output line back to Claude, so it can react to log entries, file changes, or polled status mid-conversation. Can also open a WebSocket and treat each incoming message as an event."
- Deadline: "5 minutes by default, at most 30 minutes, and at most 10 minutes in a non-interactive run".
- Behörighet: "uses the same permission rules as Bash". I auto mode tas allow-regler som namnger `Monitor` bort så att klassificeraren granskar.
- Ej tillgänglig på Bedrock/Vertex/Foundry eller när `DISABLE_TELEMETRY`/`CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC` är satt; "On Windows, the tool is available only when Git Bash is installed."
- Plugins kan deklarera monitorer som startar automatiskt (plugins/components#monitors).
- Infört 2.1.98. WebSocket-läget verkar finnas i lokal binär (strängen "binary frame" hittas). En sandbox-relaterad behörighetsfix kom först i 2.1.290.

### 4. Plugins och marknadsplatser

- Manifest: "The manifest, a JSON file at `.claude-plugin/plugin.json`… Inside the file, only `name` is required" (plugins/overview, plugins/components). Claude Code laddar även plugin utan manifest.
- Komponenter (plugins/components): skills (`skills/<namn>/SKILL.md`), commands (äldre format), agents (`agents/*.md`), hooks (`hooks/hooks.json` med toppnyckel `"hooks"`), MCP (`.mcp.json`), LSP-servrar, executables, default settings, teman/output styles, channels, monitors, workflows, och mods (via `modules` i hooks.json).
- Plugin-agenter: `permissionMode`, `hooks`, `mcpServers` och `initialPrompt` **ignoreras** (plugins/components#agents).
- Marknadsplats: "a repository or directory with a `.claude-plugin/marketplace.json` file". Lägg till: `claude plugin marketplace add <owner>/<repo>` eller `/plugin marketplace add your-org/plugins#v1.2.0` "to pin the `v1.2.0` tag" (plugins/install).
- Pluginkällor i marketplace.json: `github` (`repo`, `ref`, `sha`), `url`, `git-subdir` (`url`, `path`, `ref`, `sha`), `archive` (`url`, `sha256`, kräver v2.1.224+). "`sha`: a full 40-character lowercase commit SHA. When you set both `ref` and `sha`, Claude Code checks out `sha`." (plugins/marketplace-reference)
- Beroenden: `"dependencies": [ { "name": "secrets-vault", "version": "~2.1.0" } ]` – semver-intervall som löses mot git-taggar (plugins/dependencies). `claude plugin tag` skapar `{name}--v{version}`-taggar (lokal `--help`).
- `claude plugin validate <sökväg>` validerar och listar en mods `hooks:`/`calls:`.

### 5. Dynamiska arbetsflöden

Citat (https://code.claude.com/docs/en/workflows): "A dynamic workflow is a JavaScript script that orchestrates many subagents at once. Claude writes the script for the task you describe, and a runtime executes it in the background".
- "Dynamic workflows are available on all paid plans… On Pro, turn them on from the Dynamic workflows row in `/config`."
- Format: `meta`-block + skriptkropp; "The body is plain JavaScript with top-level `await`. `agent()` spawns one subagent, `pipeline()` runs one per item in a list, and `parallel()` runs a set of agent tasks". `import()` får skriptet att fallera.
- Start: be om ett workflow, nyckelordet `ultracode` i prompten, eller `/effort ultracode` (i 2.1.281 sätter `/effort ultracode` sessionen till `xhigh`; `on`/`off`-argumenten kräver v2.1.284). Bundlat: `/deep-research`.
- Kostnad: "a single run can use meaningfully more tokens than working through the same task in conversation. Runs count toward your plan's usage and rate limits." `Large workflow`-varning: ">25 agents, or its projected token total passes 1.5 million"; "The warning is advisory: it doesn't pause or limit the run."
- Settings: `disableWorkflows`, `enableWorkflows`, `workflowKeywordTriggerEnabled`, `workflowSizeGuideline`, `ultracode`; env `CLAUDE_CODE_DISABLE_WORKFLOWS`, `CLAUDE_CODE_WORKFLOW_MAX_CONCURRENT_AGENTS`.
- Lokal notering: användarens `~/.claude/settings.json` innehåller `skipWorkflowUsageWarning`, en nyckel som **inte** finns i nuvarande settings-reference (ej bekräftad, troligen äldre/odokumenterad).
- Paus vid usage-limit kräver v2.1.271 (finns i 2.1.281).

### 6. Hooks

**Kontext.** Citat (hooks#exit-code-0): "For most events, Claude Code writes stdout to the debug log… The exceptions are `UserPromptSubmit`, `UserPromptExpansion`, `SessionStart`, and `PostModelSwitch`, where Claude Code adds plain-text stdout as context". JSON-formen `{"hookSpecificOutput": {"hookEventName": "...", "additionalContext": "..."}}` fungerar även för PreToolUse, PostToolUse, PostToolUseFailure, SubagentStart, Stop/SubagentStop med flera. Tak: 10 000 tecken. `UserPromptSubmit` "can't replace the prompt; it only injects `additionalContext`". En `UserPromptSubmit`-hook som når sin timeout kastar sin kontext.

**Stop + exit 2.** Tabellen "Exit code 2 behavior per event": `Stop` | Yes | "Prevents Claude from stopping, continues the conversation". "A hook that blocks by exiting 2 routes the same way as `reason`: Claude receives the stderr message as the explanation for why it should continue." Alternativ utan felmarkering: `hookSpecificOutput.additionalContext` (sedan 2.1.163). Skydd: `stop_hook_active` och "8-consecutive-continuation cap".

**PreToolUse blockerar.** `PreToolUse` | Yes | "Blocks the tool call". "Exit 2 blocks even when your hook prints JSON… Even a `permissionDecision` of `"allow"` doesn't let the action through." JSON-alternativ: `permissionDecision` = `"allow" | "deny" | "ask" | "defer"`, plus `updatedInput`. Viktigt: "Deny and ask rules are still evaluated regardless of what the hook returns" – en hooks `allow` kan alltså inte köra förbi en deny-regel. Observera att `PermissionRequest` *inte* respekterar exit 2.

### 7. Behörigheter

- Bash-deny (permissions#bash): `"deny": ["Bash(git push *)"]`. Avslutande ` *` matchar även bart kommando; `Bash(ls*)` utan mellanslag matchar även `lsof`. Deny/ask gäller varje delkommando i sammansatta kommandon, även i subshells. Varning från dokumentationen: Bash-regler "isn't a security boundary around the program" – `/bin/rm` eller `sh -c 'rm …'` matchas inte av `Bash(rm *)`; använd sandbox för verklig isolering.
- `.env` (settings-reference#permissionsdeny, settings#…): `"Read(./.env)"`, `"Read(./.env.*)"`, `"Read(./secrets/**)"`. En Read-deny blockerar också Edit/Write på samma sökväg (Edit kräver v2.1.208+, Write v2.1.228+ – båda finns i 2.1.281). Read-deny gäller inbyggda filverktyg och igenkända Bash-filkommandon (`cat`, `head`, `tail`, `sed`, `tee`) och omdirigeringar, men *inte* t.ex. `grep -r` utan filnamn eller ett Python-skript. `.claudeignore` "has no effect". Kontroll av inklistrade bildsökvägar kräver v2.1.290 (ej i 2.1.281).
- Sökvägsprefix: `//abs`, `~/hem`, `/relativt-inställningskällan`, `./relativt-cwd`. Path-regler för `Write(...)`/`Glob(...)` konsulteras aldrig – använd `Edit(...)`/`Read(...)`.
- **Per delagent (avviker delvis):** frontmatter-fälten är `tools` (tillåtelselista av verktygsnamn, t.ex. `Read, Grep, Glob, Bash`) och `disallowedTools`. Citat: "A `disallowedTools` entry with a specifier, such as `Bash(git push *)`, still removes the whole tool from the subagent, not only the matching commands. To keep Bash and block specific commands, add a Bash deny rule … to `permissions.deny` in your settings. The rule applies to the main conversation and to subagents." Inbyggda delagenter "inherit the parent conversation's permission rules". Sökvägsspecifik läsbegränsning per agent via `tools`: **ej bekräftat / stöds inte enligt dokumentationen**. Möjliga vägar: agent-scopade `hooks` i frontmatter (PreToolUse som nekar vissa sökvägar; ignoreras för plugin-agenter) och `permissionMode` per agent. Neka hela agenttyper: `"deny": ["Agent(Explore)"]`.

### 8. Settings-nycklar och miljövariabler

**Settings (settings-reference):**
- Auto mode: `permissions.defaultMode: "auto"` (endast effektivt från `~/.claude/settings.json`, inte projekt/local), `autoMode` (objekt med `environment`, `allow`, `soft_deny`, `hard_deny`, `classifyAllShell`; scope user/managed), `disableAutoMode: "disable"`, `useAutoModeDuringPlan`, `skipAutoPermissionPrompt`. CLI: `--permission-mode auto`, `claude auto-mode`.
- Effort: `effortLevel`, `maxEffortLevel`, `modelSettings` (per modell; `/effort` sparar här sedan v2.1.251), `ultracode`. CLI: `--effort low|medium|high|xhigh|max`.
- Modell: `model`, `fallbackModel`, `availableModels`, `deniedModels`, `modelOverrides`, `advisorModel`, `teammateDefaultModel`, `alwaysThinkingEnabled`, `showThinkingSummaries`.
- Per agent: `model` (`sonnet|opus|haiku|fable|<full-id>|inherit`) och `effort` (`low…max`) i agentens frontmatter; `effort` åsidosätts av `CLAUDE_CODE_EFFORT_LEVEL`. Inställningen `agent` väljer huvudtrådens agent.

**Miljövariabler (env-vars) – effort/thinking/modell, alla hittade i lokal 2.1.281-binär:**
- `CLAUDE_CODE_EFFORT_LEVEL` – `low|medium|high|xhigh|max|auto`; "Takes precedence over `--effort`, `/effort`, and the `modelSettings` and `effortLevel` settings."
- `CLAUDE_EFFORT` – sätts *automatiskt* i Bash-subprocesser och hooks (läsbar, inte en inställning).
- `CLAUDE_CODE_ALWAYS_ENABLE_EFFORT` – skicka effort även för okända modell-ID:n (gateways).
- `CLAUDE_CODE_DISABLE_ADAPTIVE_THINKING` – gäller bara Opus 4.6/Sonnet 4.6; ingen effekt på Fable, Sonnet 5+, Haiku 5.5, Opus 4.7+.
- `CLAUDE_CODE_DISABLE_THINKING` – utelämnar thinking-parametern (kompatibilitet för proxyer).
- `MAX_THINKING_TOKENS` – fast tänkebudget (inte prefix `CLAUDE_CODE_`).
- `DISABLE_INTERLEAVED_THINKING`.
- `CLAUDE_CODE_SUBAGENT_MODEL`, `CLAUDE_CODE_SUBAGENT_MODEL_FORCE` (kräver v2.1.257).
- `CLAUDE_CODE_DISABLE_ADVISOR_TOOL`, `CLAUDE_CODE_SAFE_MODE`, `CLAUDE_CODE_GOAL_CHECKIN_MINUTES`, `CLAUDE_AFK_TIMEOUT_MS`, `CLAUDE_CODE_DISABLE_WORKFLOWS`, `CLAUDE_CODE_WORKFLOW_MAX_CONCURRENT_AGENTS`.
- `CLAUDE_CODE_ENABLE_AUTO_MODE` – "Accepted for compatibility with older releases and has no effect" (behövdes bara v2.1.158–v2.1.206).

Lokalt i användarens settings.json: `model: "opus[1m]"`, `effortLevel: "xhigh"`; inga `permissions`-regler.

### 9. Övriga funktioner

- **Agent view.** `claude agents` (research preview: "The interface and keyboard shortcuts may change"), `claude --bg`, `/background` (alias `/bg`), `←` på tom prompt, `claude attach|logs|stop|rm|respawn <id>`, `claude agents --json`. Bekräftat i lokal `--help`. Filtret `n:<text>` kräver v2.1.287 (ej i 2.1.281). Inställningar: `disableAgentView`, `defaultToAgentsView`.
- **Advisor.** "The advisor tool is experimental and requires the Anthropic API." `/advisor [fable|opus|sonnet|<id>|off]`; argumentformerna utan interaktiv terminal kräver v2.1.260 (finns). Rådgivaren måste vara minst lika kapabel som huvudmodellen.
- **Safe mode.** `--safe-mode`: "Start with all customizations (CLAUDE.md, skills, installed plugins, hooks, MCP servers, custom commands and agents, output styles, workflows, custom themes, keybindings, and more) disabled… Sets CLAUDE_CODE_SAFE_MODE=1" (lokal `--help`). Infört 2.1.169. Inbyggda mods stoppas inte av safe mode.
- **AskUserQuestion-timeout.** Se tabell 9d. Sedan 2.1.200 ingen automatisk fortsättning som standard. Timern startar aldrig i bakgrundssessioner, skärmläsarläge eller Remote Control; behörighetsfrågor löses aldrig automatiskt. Nyckeln finns i lokal binär.
- **`/batch`.** Bundlad skill: delar arbetet i 5–30 enheter, en bakgrundsagent per enhet i egen worktree. "Outside a git repository, `/batch` requires Claude Code v2.1.281 or later" – dvs. precis användarens version.
- **`/doctor`.** Bundlad skill, alias `/checkup`; `claude doctor` i CLI. `prompt-audit` kräver v2.1.283.
- **`/simplify`.** Historik: döptes om till `/code-review` i 2.1.147, återinfördes som ren städgranskning i 2.1.154. Idag: "Four review agents run in parallel… The review doesn't look for correctness bugs."
- **`/security-review`.** "Reviews the diff between your branch and origin's default branch"; kräver `origin`.
- **Ultra review.** "The command is `/code-review ultra`. When ultrareview is available to your account, `/ultrareview` is an alias." Molnsandlåda, research preview, "bills against usage credits rather than your plan's included usage" efter inkluderade gratiskörningar (commands: "3 free runs on Pro and Max"). Kräver claude.ai-konto. `--post` (v2.1.227+) finns.

---

## Källor (officiella)
- https://code.claude.com/docs/llms.txt (index)
- https://code.claude.com/docs/en/plugins/mods/overview , /plugins/mods/create , /plugins/mods/reference , /plugins/mods/interface
- https://code.claude.com/docs/en/goal , /scheduled-tasks , /commands
- https://code.claude.com/docs/en/tools-reference
- https://code.claude.com/docs/en/plugins/overview , /plugins/components , /plugins/manifest-reference , /plugins/install , /plugins/create-marketplace , /plugins/marketplace-reference , /plugins/dependencies
- https://code.claude.com/docs/en/workflows
- https://code.claude.com/docs/en/hooks
- https://code.claude.com/docs/en/permissions , /settings-reference , /settings
- https://code.claude.com/docs/en/sub-agents
- https://code.claude.com/docs/en/env-vars , /model-config
- https://code.claude.com/docs/en/agent-view , /advisor , /ultrareview
- https://code.claude.com/docs/en/changelog
- Lokalt: `claude --version`, `claude --help`, `claude plugin --help`, `claude agents --help`, strängsökning i `%APPDATA%\npm\node_modules\@anthropic-ai\claude-code\bin\claude.exe`, `~/.claude/settings.json` (läst).
