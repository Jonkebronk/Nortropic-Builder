# Flödet: loopar, verifiering, bedömare och lärande – kandidater och källor (oktober 2026)

GitHub-data (★, licens, senaste push, arkivstatus) kontrollerad **2026-10-13** via GitHub MCP `search_repositories` (minimal_output=false); repo-länken i varje tabellrad är källan för de siffrorna. Licens "ingen" = GitHub-API:t hittar ingen licensfil. `stackblitz-labs/bolt.diy` är en fork och syns bara med `fork:true` i sökfrågan (en `repo:`-fråga gav noll träffar). Domskala: **Ta in / Pröva / Bevaka / Avstå**. Licensflaggor: GPL/AGPL/FSL/proprietärt/kommersiellt markeras **FLAGGA**.

## 1. Claude Code-nativa byggstenar – vad är officiellt och aktuellt, och vad rekommenderar Anthropic för skill-design och utvärdering? (luckor: loop/harness-mönster, eval-verktyg)

### Takeaway
Allt som behövs för en enkel loop (försök → kontroll → klar/omförsök/eskalera) finns nu inbyggt och officiellt i Claude Code: deterministiska Stop-hooks, `/goal` där en separat modell avgör "klart", granskar-subagenter i färsk kontext, `/verify`, samt två eval-verktyg (skill-creator och `claude plugin eval`) som mäter med/utan skill mot baslinje. Anthropics råd är att bygga evals först, hålla skills små (<500 rader), testa i färsk session och låta subjektiv kvalitet (design) bedömas av människa eller kalibrerad domare i stället för att tvingas in i hårda assertions.

### Cited Findings

#### Kandidater – fakta (GitHub 2026-10-13)
| Kandidat | ★ | Licens | Senaste push | Vad det är |
|---|---|---|---|---|
| [anthropics/claude-code](https://github.com/anthropics/claude-code) (bär `/goal`, hooks, subagenter, `/verify`, `claude plugin eval`) | 150 602 | **FLAGGA proprietär**: "© Anthropic PBC. All rights reserved. Use is subject to Anthropic's Commercial Terms of Service" ([LICENSE.md](https://github.com/anthropics/claude-code/blob/main/LICENSE.md)) | 2026-10-13 | Agentiskt kodverktyg i terminalen |
| [anthropics/claude-plugins-official](https://github.com/anthropics/claude-plugins-official) | 37 792 | Apache-2.0 | 2026-10-13 | "Official, Anthropic-managed directory of high quality Claude Code Plugins"; innehåller bl.a. `ralph-loop`, `skill-creator`, `hookify`, `claude-md-management`, `code-review`, `frontend-design`, `pr-review-toolkit`, `session-report` ([plugins/](https://github.com/anthropics/claude-plugins-official/tree/main/plugins)) |
| `ralph-loop` (plugin i claude-plugins-official; heter `ralph-wiggum` i claude-code-repots plugin-README) | ingår i marknadsplatsen | Apache-2.0 (marknadsplatsrepot) | 2026-10-13 | Stop-hook som matar samma prompt tills `--completion-promise` eller `--max-iterations` ([README](https://github.com/anthropics/claude-plugins-official/blob/main/plugins/ralph-loop/README.md); [claude-code plugins README](https://github.com/anthropics/claude-code/blob/main/plugins/README.md)) |
| [anthropics/skills](https://github.com/anthropics/skills) (inkl. `skill-creator`) | 180 880 | Blandad, API: ingen. README: "Many skills in this repo are open source (Apache 2.0)"; docx/pdf/pptx/xlsx är "source-available, not open source" ([README](https://github.com/anthropics/skills)); skill-creator har egen LICENSE.txt (ej läst) | 2026-10-09 | Anthropics publika skills + Agent Skills-spec |
| [anthropics/claude-agent-sdk-python](https://github.com/anthropics/claude-agent-sdk-python) | 8 262 | MIT enligt GitHub; **FLAGGA** dokumentationen säger att SDK-användning styrs av Commercial Terms "except to the extent a specific component or dependency is covered by a different license" ([Agent SDK overview](https://code.claude.com/docs/en/agent-sdk/overview)) | 2026-10-09 | Claude Codes agentloop som Python-bibliotek |
| [anthropics/claude-agent-sdk-typescript](https://github.com/anthropics/claude-agent-sdk-typescript) | 1 804 | API: ingen (LICENSE.md finns); **FLAGGA** Commercial Terms | 2026-10-09 | Samma, TypeScript |
| [anthropics/claude-code-action](https://github.com/anthropics/claude-code-action) | 9 494 | MIT | 2026-10-09 | GitHub Action som kör Claude Code (`@claude`, prompt, cron) |
| [anthropics/claude-quickstarts](https://github.com/anthropics/claude-quickstarts) (`autonomous-coding`) | 17 971 | MIT på repot, men autonomous-coding-README säger "License: Internal Anthropic use." **FLAGGA otydligt** ([README](https://github.com/anthropics/claude-quickstarts/blob/main/autonomous-coding/README.md)) | 2026-10-08 | Referensimplementation av initializer + coding agent |
| [karpathy/autoresearch](https://github.com/karpathy/autoresearch) | 97 838 | API: ingen (ingen LICENSE-fil i roten); README: "MIT" | 2026-03-26 (minimalt avsiktligt; ingen aktivitet sedan mars) | Agent kör experiment med fast budget, ett mått, keep/discard |
| [uditgoenka/autoresearch](https://github.com/uditgoenka/autoresearch) | 6 572 | MIT | 2026-08-12 | "Claude Autoresearch Skill ... Modify → Verify → Keep/Discard → Repeat forever." |
| [alchaincyf/darwin-skill](https://github.com/alchaincyf/darwin-skill) | 6 312 | MIT | 2026-09-18 | "Autoresearch-inspired autonomous skill optimization for Claude Code. Evaluate, improve, test, keep or revert." |
| [evo-hq/evo](https://github.com/evo-hq/evo) | 1 468 | Apache-2.0 | 2026-10-05 | "discovers what to measure, instruments the benchmark, then runs tree search with parallel subagents" |
| [frankbria/ralph-claude-code](https://github.com/frankbria/ralph-claude-code) | 9 678 | MIT | 2026-10-10 | "Autonomous AI development loop for Claude Code with intelligent exit detection" |
| [mikeyobrien/ralph-orchestrator](https://github.com/mikeyobrien/ralph-orchestrator) | 3 174 | MIT | 2026-10-13 | Ralph-orkestrator i Rust |
| [obra/superpowers](https://github.com/obra/superpowers) | 298 551 | MIT | 2026-10-10 | "An agentic skills framework & software development methodology"; installeras med `/plugin install superpowers@claude-plugins-official` ([README](https://github.com/obra/superpowers)) |
| `hookify` (claude-plugins-official) | – | MIT ([README](https://github.com/anthropics/claude-plugins-official/blob/main/plugins/hookify/README.md)) | 2026-10-13 | Skapar hooks från markdown-regler; analyserar samtal efter beteenden du rättat |
| `claude-md-management` (claude-plugins-official) | – | (marknadsplats Apache-2.0) | 2026-10-13 | `claude-md-improver` (granskning) + `/revise-claude-md` (sessionslärdomar) ([README](https://github.com/anthropics/claude-plugins-official/blob/main/plugins/claude-md-management/README.md)) |
| [RinDig/Interpretable-Context-Methodology](https://github.com/RinDig/Interpretable-Context-Methodology) | 1 334 | MIT | 2026-10-06 | "Folder structure as agent architecture" |
| [mattpocock/skills](https://github.com/mattpocock/skills) (writing-for-agents, redan i inventariet) | 289 234 | MIT | 2026-10-13 | "Skills for Real Engineers" |

#### Loop- och grindmekanismer i Claude Code (officiell dokumentation)
- Verifiering är huvudregeln: "Give Claude a check it can run: tests, a build, a screenshot to compare. It's the difference between a session you watch and one you walk away from." Utan kontroll är "looks done" den enda signalen och "you become the verification loop" — [Claude Code: Best practices](https://code.claude.com/docs/en/best-practices)
- Fyra nivåer för hur hårt kontrollen grindar: i en prompt; över en session med `/goal`; som deterministisk grind med Stop-hook; som "second opinion" via verifieringssubagent eller dynamic workflow "so the agent doing the work isn't the one grading it". Plus: "Have Claude show evidence rather than asserting success" — [Best practices](https://code.claude.com/docs/en/best-practices)
- Writer/Reviewer: "A fresh context improves code review since Claude won't be biased toward code it just wrote." Varning: "A reviewer prompted to find gaps will usually report some, even when the work is sound ... Chasing every finding leads to over-engineering" → låt granskaren flagga bara korrekthets-/kravbrister — [Best practices](https://code.claude.com/docs/en/best-practices)
- Efter två misslyckade rättelser: `/clear` och bättre startprompt; "If you can't verify it, don't ship it." — [Best practices](https://code.claude.com/docs/en/best-practices)
- CLAUDE.md: håll den kort; fråga per rad "Would removing this cause Claude to make mistakes?"; "Bloated CLAUDE.md files cause Claude to ignore your actual instructions!"; sällan-relevant kunskap hör hemma i skills — [Best practices](https://code.claude.com/docs/en/best-practices)
- `/goal`: efter varje tur kontrollerar en modell om villkoret håller (verdikt "not yet met" / "met" / "impossible"); "completion is decided by a fresh model rather than the one doing the work"; utvärderaren är den konfigurerade "small fast model", "doesn't run commands or read files independently" → villkoret måste kunna visas i Claudes egen output; villkor upp till 4 000 tecken; begränsa med t.ex. "or stop after 20 turns"; fungerar med `claude -p "/goal ..."`; utvärderingstokens "typically negligible"; `/goal` är ett skal runt en sessionsbunden promptbaserad Stop-hook — [Claude Code: /goal](https://code.claude.com/docs/en/goal)
- Hooks: command-hooks är deterministiska; `type: "prompt"` = ett LLM-anrop som returnerar `ok`/`reason` (med `impossible` för Stop); `type: "agent"` = experimentell subagent med verktyg (60 s standard-timeout, upp till 50 verktygsturer). "Claude Code overrides a Stop hook after it blocks eight times in a row with no tool call from Claude in between" (justerbart med `CLAUDE_CODE_STOP_HOOK_BLOCK_CAP`) — [Claude Code: Hooks guide](https://code.claude.com/docs/en/hooks-guide)
- Inbyggda skills `/run`, `/verify`, `/run-skill-generator`; `/verify` skriver det som fungerade till `.claude/skills/verify/SKILL.md` så senare körningar följer samma recept — [Claude Code: Skills](https://code.claude.com/docs/en/skills)
- Skill-listans budget är 1 % av kontextfönstret; vid överskott tappas beskrivningar för minst använda skills; varje post kapas vid 1 536 tecken; `/skill-doctor` hittar oanvända skills; `claude plugin validate` (v2.1.233+) hittar trasig frontmatter; regler som måste gälla varje gång ska flyttas till hooks — [Skills](https://code.claude.com/docs/en/skills)
- Subagenter definieras i `.claude/agents/` med egna verktyg och modell och kör i egen kontext — [Best practices](https://code.claude.com/docs/en/best-practices)
- Dynamic workflows (2026-06-02, Thariq Shihipar): Claude skriver och orkestrerar en egen multiagent-harness; motiveras av "agentic laziness", "self-preferential bias" och målglidning efter compaction; botemedel: "For each spawned agent, run a separate spawned agent to adversarially verify its output against a rubric or criteria"; de "often use more tokens and are best suited for complex, high value tasks" — [claude.com blog](https://claude.com/blog/a-harness-for-every-task-dynamic-workflows-in-claude-code)
- Agent SDK = "the same tools, agent loop, and context management that power Claude Code, programmable in Python and TypeScript"; "Unless previously approved, Anthropic does not allow third party developers to offer claude.ai login or rate limits for their products"; användning styrs av Commercial Terms — [Agent SDK overview](https://code.claude.com/docs/en/agent-sdk/overview)
- GitHub Actions (`anthropics/claude-code-action@v1`): interaktivt läge (`@claude`) och automationsläge (`prompt`, även cron); kostnad = Actions-minuter + API-tokens (OAuth-token använder abonnemang); `--max-turns` begränsar; "GitHub runs scheduled workflows only from the default branch and, in public repositories, disables the schedule after 60 days without repository activity" — [Claude Code: GitHub Actions](https://code.claude.com/docs/en/github-actions)
- ralph-loop: `/ralph-loop "<prompt>" --max-iterations <n> --completion-promise "<text>"`; Stop-hook blockerar avslut och matar samma prompt; `--completion-promise` är exakt strängmatchning → "Always rely on `--max-iterations` as your primary safety mechanism"; "Not good for: Tasks requiring human judgment or design decisions"; README:s resultatpåståenden (t.ex. "$50k contract completed for $297") är obelagda — [ralph-loop README](https://github.com/anthropics/claude-plugins-official/blob/main/plugins/ralph-loop/README.md)
- hookify: `/hookify` utan argument "Analyzes recent conversation to find behaviors you've corrected or been frustrated by"; regler i `.claude/hookify.*.local.md`; exempel på Stop-regel som blockerar avslut om inga tester körts — [hookify README](https://github.com/anthropics/claude-plugins-official/blob/main/plugins/hookify/README.md)

#### Harness-mönster från Anthropic engineering
- "Effective harnesses for long-running agents" (Justin Young, 2025-11-26): initializer-agent + coding-agent; JSON-feature-lista med `passes`-flagga (agenter får bara ändra flaggan; "It is unacceptable to remove or edit tests because this could lead to missing or buggy functionality"); `claude-progress.txt`; `init.sh`; beskrivande git-commits; en feature per session; Claude verifierade dåligt tills den uttryckligen ombads använda webbläsarautomation (Puppeteer MCP) — [Anthropic](https://www.anthropic.com/engineering/effective-harnesses-for-long-running-agents)
- Referensimplementationen skapar `feature_list.json` med 200 testfall (tips: 20–50 för snabbare körning); varje kodvarv tar 5–15 min — [autonomous-coding README](https://github.com/anthropics/claude-quickstarts/blob/main/autonomous-coding/README.md)
- "Harness design for long-running application development" (Prithvi Rajasekaran, 2026-03-24): GAN-inspirerad generator/evaluator, senare planner/generator/evaluator; sprint-kontrakt om vad "klart" betyder; evaluatorn navigerar sidan med Playwright, tar skärmdumpar och klickar; kriterier designkvalitet, originalitet, hantverk, funktion (de två första viktade högre); kalibrering med "few-shot examples accompanied by detailed score breakdowns"; 5–15 iterationer, upp till ~4 h; kostnad: solo 20 min/$9 vs full harness 6 h/$200 (Opus 4.5); V2 3 h 50 min/$124,70 (Opus 4.6) där QA-rundorna kostade $3,09–$4,06; "agents reliably skew positive when grading their own work"; "Out of the box, Claude is a poor QA agent"; formuleringar som "museum quality" i kriterierna påverkade utseendet synligt; rekommendation att ompröva harnessen vid varje ny modell — [Anthropic](https://www.anthropic.com/engineering/harness-design-long-running-apps)

#### Anthropics råd för skill-design och -utvärdering
- "Build evaluations first" / "Create evaluations BEFORE writing extensive documentation"; fem steg: identifiera luckor utan skill → "Build three scenarios" → mät baslinje utan skill → minimala instruktioner → iterera mot baslinjen — [Skill authoring best practices](https://platform.claude.com/docs/en/agents-and-tools/agent-skills/best-practices)
- Samma sida säger "There is not currently a built-in way to run these evaluations" — motsägs av nyare Claude Code-verktyg (skill-creator-evals, `claude plugin eval`) — [Best practices](https://platform.claude.com/docs/en/agents-and-tools/agent-skills/best-practices); jämför [Plugin evals](https://code.claude.com/docs/en/plugin-evals)
- "Test your Skill with all the models you plan to use it with"; Claude A (skriver skill) / Claude B (färsk instans som använder den); "Claude is already very smart. Only add context Claude doesn't already have"; frihetsgrader efter uppgiftens skörhet; SKILL.md "under 500 lines"; referenser "one level deep"; valideringsloop "Run validator → fix errors → repeat"; namn ≤64 tecken, beskrivning ≤1 024 tecken i tredje person — [Best practices](https://platform.claude.com/docs/en/agents-and-tools/agent-skills/best-practices)
- "Seeing a skill trigger tells you Claude found it, not that it did what you intended"; kör realistiska prompter i färsk session med och utan skill: "leftover context from authoring the skill will mask gaps" — [Claude Code: Skills](https://code.claude.com/docs/en/skills)
- Agent Skills-standarden: börja med 2–3 testfall; kör med och utan skill; skriv assertions först efter första körningen; "Not everything needs an assertion. Some qualities — writing style, visual design, whether the output "feels right" — are hard to decompose into pass/fail checks. These are better caught during human review."; "Require concrete evidence for a PASS"; ta bort assertions som alltid passerar; "If pass rates plateau despite adding more rules, the skill may be over-constrained — try removing instructions"; "Explain the why" — [agentskills.io: Evaluating skill output quality](https://agentskills.io/skill-creation/evaluating-skills)
- Två sorters skills: "capability uplift" (evals visar när basmodellen kommit ikapp) och "encoded preference" (värdet beror på hur väl de matchar arbetsflödet); "a skill that worked well last month might behave differently today"; beskrivningstrimning förbättrade triggning för 5 av 6 publika dokument-skills — [Improving skill-creator (2026-03-03)](https://claude.com/blog/improving-skill-creator-test-measure-and-refine-agent-skills)

#### Inbyggda/officiella eval-verktyg
- skill-creator: startar med-skill- och baslinjekörning i samma tur (baslinje = ingen skill, eller ögonblicksbild av gamla versionen); grader-agent → `benchmark.json` med pass_rate, tid, tokens, mean ± stddev och delta; analytikerpass letar icke-diskriminerande assertions och höga varianser; granskningsvy (`eval-viewer/generate_review.py`) där ägaren skriver feedback per output; "Subjective skills (writing style, design quality) are better evaluated qualitatively — don't force assertions onto things that need human judgment"; blind A/B via `agents/comparator.md` är "optional ... most users won't need it"; beskrivningsoptimering: 20 frågor (8–10 bör/bör-inte, "near-misses"), 60/40 train/test, varje fråga 3 körningar, upp till 5 iterationer, bästa beskrivning väljs på testpoäng — [skill-creator SKILL.md](https://github.com/anthropics/skills/blob/main/skills/skill-creator/SKILL.md)
- `claude plugin eval`: kräver Claude Code v2.1.269+; plugin eller "skills-directory plugin"; varje fall körs 3 gånger som standard; poäng = andel passerade graders; with-/without-arm och Δ; graders `regex`, `tool_used`, `tool_order`, `file_exists`, `llm` (domaren röstar PASS i minst 2 av 3), `baseline` (mot referenstranskript); en `llm`-domare ser PNG/JPEG/GIF/WebP-filer som bilder; `claude plugin eval init` föreslår fall; ungefärlig kostnad = fall × körningar × 2 armar + 3 domaranrop per `llm`-grader och körning; "Every eval run and every judge grader is a real model call on your account"; skill-creator och plugin eval läser inte varandras fallformat — [Claude Code: Test plugins with evals](https://code.claude.com/docs/en/plugin-evals)

### Inferences

#### Bedömning per kandidat
| Kandidat | Lucka | Förankring | Passform solo (kostnad · komplexitet) | Så använder/destillerar Nortropic | Dom |
|---|---|---|---|---|---|
| `/goal` | Loop | Separat utvärderare avgör "klart" | Inbyggt; försumbar utvärderarkostnad; ett kommando | Sessionsmål per bygg-sajt-steg med uttalad kontroll + turtak; kräv att Claude skriver ut bevis (testoutput, skärmdumpsvägar) eftersom utvärderaren bara läser transkriptet | **Ta in** – noll kod, uppfyller "generatorn dömer inte sin egen klar-signal" |
| Stop-hook (command) + `/verify` | Loop/verifiering | Deterministisk "backpressure" | Skalskript + settings.json; ingen modellkostnad | Grind: build + Playwright + axe + Lighthouse-tröskel; exit 2 = fortsätt; räknare i hook-skriptet → efter N varv släpps stoppet och ägaren får eskaleringen | **Ta in** – billigaste, säkraste kontrollen |
| Granskar-subagent (`.claude/agents/`) | Bedömare | Writer/Reviewer, färsk kontext | Modellkostnad per granskning (QA-rundor ~$3–4 i Anthropics exempel) | Designbedömare med reviewer-kriteriefilerna + kalibrerade exempel; bara Read/Bash(Playwright) | **Ta in** – grundbulten för separat bedömning |
| Long-running-artefakter (feature-lista med `passes`, progress-fil, `init.sh`, git) | Loop/kontext | Anthropic nov 2025 | Bara filer | `features.json` per sajt där bara `passes` får ändras; progress-fil = pickup/handoff; commit per lyckat varv | **Ta in (mönster)** – installera inte quickstarten (otydlig licenstext) |
| Planner/generator/evaluator | Bedömare/loop | Harness design mars 2026 | Full harness $125–200 per app → för dyr per kundsajt; QA-delen billig | Nedskalat: designfasen får en evaluator med fyra kriterier; sprint-kontrakt = acceptanskriterier per bygg-sajt-steg | **Ta in (nedskalat mönster)** |
| `ralph-loop` | Loop | Huntley: "Ralph is a Bash loop" | Inbyggd plugin; kostnad = iterationer × session | Bara binära uppgifter (få bygget/testerna gröna); alltid `--max-iterations` | **Pröva** – dess egen README avråder från designbeslut; `/goal` täcker oftast samma behov |
| karpathy/autoresearch | Loop/lärande | Fast budget, ett mått, keep/discard, enkelhetskriterium | En `program.md`, inga beroenden att installera | Optimering av färdig sajt mot entydigt mått (prestanda, sidvikt, axe-fel) med `results.tsv` | **Ta in (mönster)** – endast där måttet är entydigt |
| uditgoenka/autoresearch | Loop | Autoresearch som skill | Tredjepart | Läs som exempel | **Bevaka** – destillera originalet |
| darwin-skill | Lärande | Autoresearch på skills | Kräver kalibrerade evals som saknas | – | **Bevaka** – självoptimering utan kalibrerad mätning optimerar mot fel mål |
| evo | Loop | Trädsökning + parallella subagenter | Hög komplexitet | – | **Avstå** |
| frankbria/ralph-claude-code | Loop | Ralph + exit-detektering | Egen bash-infrastruktur | – | **Avstå** – dubblerar officiell plugin + `/goal` |
| mikeyobrien/ralph-orchestrator | Loop | Orkestrator i Rust | Hög | – | **Avstå** – samma fälla som 126 000-raderssystemet |
| obra/superpowers | Skill-kvalitet | TDD för skills | Stort skillpaket → konflikt-/listbudgetrisk | Destillera `writing-skills` (RED-GREEN-REFACTOR med pressure-scenarier) och `verification-before-completion`; A/B-testa en i taget | **Pröva (selektivt)** |
| hookify | Lärande | Rättelser → deterministiska regler | Python stdlib; markdown-regler | Kör `/hookify` efter sessioner med upprepade rättelser | **Pröva** |
| claude-md-management | Lärande/kontext | Sessionslärdomar → CLAUDE.md | Låg | `/revise-claude-md` vid sessionsslut, men beskär hårt | **Pröva** |
| Dynamic workflows | Bedömare | Adversarial verifiering, paneler | Tokenkrävande | Senare: panel av bedömare för slutgranskning före lansering | **Bevaka** |
| Claude Agent SDK | Loop | Programmerbar harness | API-nyckel krävs för produkter till tredje part; Commercial Terms | Först om flödet ska bli en egen tjänst | **Bevaka** – `claude -p` + skript räcker |
| claude-code-action | Automation | Schemalagda körningar | Actions-minuter + tokens; schema stängs av efter 60 dagar utan aktivitet (publika repon) | Månatlig bevakningskörning, nattlig regressions-eval | **Pröva** |
| skill-creator | Eval | Med/utan-baslinje, blind jämförelse, held-out | Officiellt; fall × 2 körningar + gradering | Huvudverktyg för varje skill-/promptändring; granskningsvyn samlar ägarens feedback (= kalibreringsdata) | **Ta in** |
| `claude plugin eval` | Eval/regression | 3 körningar/fall, Δ, bildseende domare | v2.1.269+; fall × 3 × 2 agentkörningar + domaranrop | Steg 2: stabila fall flyttas till regressionssvit/CI-grind | **Pröva** – vänta tills skill-creator-fallen stabiliserats (formaten är inte kompatibla) |
| ICM | Kontext | Mappstruktur som arkitektur | Bara filer | Redan antaget | **Ta in (behåll)** – stödet är arkitekturresonemang, mät effekten |
| mattpocock/skills (writing-for-agents) | Skill-skrivande | – | – | Redan i inventariet | **Ta in (behåll)** |

#### Förslag: minsta loop för Nortropic (syntes av källorna ovan)
1. Varje bygg-sajt-steg är en loop: försök → kontroll → klar/omförsök/eskalera.
2. Kontroll nivå 1, alltid och deterministisk: Stop-hook (command) som kör build + Playwright-tester + axe (0 allvarliga fel) + Lighthouse-tröskel; exit 2 gör att Claude fortsätter. Hook-skriptet räknar försök i en fil och släpper efter N misslyckade varv stoppet, skriver eskaleringen i progress-filen och lämnar till ägaren. Claude Codes egen spärr räcker inte som eskalering, eftersom den bara slår till efter 8 block i rad utan verktygsanrop emellan.
3. Kontroll nivå 2, för designsteg: bedömar-subagent i färsk kontext med reviewer-kriteriefilerna och kalibrerade exempel (se fråga 2); kritiken skrivs till fil och generatorn läser den nästa varv (sprint-kontrakt).
4. Skrivskydd för mätinstrumentet: en PreToolUse-hook nekar generatorns skrivningar till `evals/` och kriteriefiler (samma princip som autoresearch: `prepare.py` och `evaluate_bpb` får inte ändras; Anthropic: bara `passes`-flaggan får ändras).
5. Sessionsmål med `/goal "<mål> ... or stop after N turns"`, och krav på utskrivna bevis.
6. Tillstånd i filer: `features.json` (passes), progress-fil (pickup/handoff, i linje med ICM), en commit per lyckat varv.
7. Full autonomi bara i autoresearch-läge med entydigt mått (prestanda, sidvikt, axe-fel) och fast budget; allt designomdöme går via bedömaren och vid jämna fall till ägaren.
8. Lärande: skill-/promptändringar bara via skill-creator med baslinje; hookify för upprepade rättelser; `/revise-claude-md` vid sessionsslut.
- Observation i denna session (ej extern källa): 37 skills är scopade till nortropic-webb-pro, plus ett 15-tal oscopade (13 taste-*, ui-styling, ui-ux-pro-max, writing-for-agents). Många överlappar inom design (taste-*, emil-*, better-*, hallmark, impeccable, refero-design, frontend-design, ui-ux-pro-max), och några gäller stackar Nortropic inte bygger i (emil-write-swift, emil-animate-expo). Med listbudget på 1 % av kontexten och tappade beskrivningar vid överskott är det en trolig källa till fel triggning och till de tidigare skill-konflikterna → kör `/skill-doctor` och skill-creators beskrivningsoptimering innan nya skills läggs till.

#### Destillera Nortropics eget flöde från
- Loop/harness: (1) [Claude Code Best practices, "Give Claude a way to verify its work"](https://code.claude.com/docs/en/best-practices) + [/goal](https://code.claude.com/docs/en/goal) + [Hooks](https://code.claude.com/docs/en/hooks-guide); (2) [Effective harnesses for long-running agents](https://www.anthropic.com/engineering/effective-harnesses-for-long-running-agents); (3) [karpathy/autoresearch program.md](https://github.com/karpathy/autoresearch/blob/master/program.md).
- Eval-verktyg för skill-/promptändringar: (1) [agentskills.io: Evaluating skill output quality](https://agentskills.io/skill-creation/evaluating-skills) + [skill-creator SKILL.md](https://github.com/anthropics/skills/blob/main/skills/skill-creator/SKILL.md); (2) [Test plugins with evals](https://code.claude.com/docs/en/plugin-evals); (3) [Demystifying evals for AI agents](https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents).

### Gaps
- Exakta releasedatum för `/goal`, `claude plugin eval` och dynamic workflows hämtades inte (Claude Codes CHANGELOG ej läst); dokumentationen anger bara versionskrav (t.ex. v2.1.269 för plugin eval).
- Licensen för enskilda plugin-mappar (t.ex. `ralph-loop`) och skill-creators LICENSE.txt lästes inte; README för `session-report` saknades på förväntad sökväg.
- ralph-loops resultatpåståenden går inte att verifiera.
- Ingen oberoende mätning hittades av hur mycket `/goal` eller Stop-hooks höjer kvaliteten jämfört med promptad självkontroll.

## 2. Vilka eval-ramverk passar för att mäta prompt-/skilländringar, och vad säger forskningen om LLM-som-domare och kalibrering för subjektiv visuell design? (luckor: kalibrerad designbedömare, eval-verktyg)

### Takeaway
För en ensam ägare tillför externa ramverk lite utöver Claude Codes egna eval-verktyg: promptfoo är bäst av dem (MIT, Claude Agent SDK-provider, bildrubriker) men ägs nu av OpenAI; Inspect, DeepEval och OpenAI Evals är tunga eller fel inriktade, och Braintrust/LangSmith kostar. Forskningen behandlar LLM/MLLM-domare som "approximators, not replacements": de klarar parvisa jämförelser med tydliga skillnader och checklist-/rubrikstyrd bedömning, men ligger nära slumpen på subtila skillnader och har bias (position, längd, självpreferens, mildhet). Separat kontext, parvis jämförelse med positionsbyte och kalibrering mot ägarens egna bedömningar (TPR/TNR) är därför nödvändiga.

### Cited Findings

#### Ramverk och verktyg – fakta (GitHub 2026-10-13)
| Kandidat | ★ | Licens | Senaste push | Vad det är |
|---|---|---|---|---|
| [promptfoo/promptfoo](https://github.com/promptfoo/promptfoo) | 25 965 | MIT (**FLAGGA ägarbyte**: OpenAI) | 2026-10-13 | "Test your prompts, agents, and RAGs ... Simple declarative configs with command line and CI/CD integration" |
| [UKGovernmentBEIS/inspect_ai](https://github.com/UKGovernmentBEIS/inspect_ai) | 2 994 | MIT | 2026-10-13 | "Inspect: A framework for large language model evaluations" |
| [confident-ai/deepeval](https://github.com/confident-ai/deepeval) | 18 809 | Apache-2.0 | 2026-10-12 | "The LLM Evaluation Framework" |
| [openai/evals](https://github.com/openai/evals) | 19 597 | MIT för kod; vissa dataset CC BY-NC ([LICENSE.md](https://github.com/openai/evals/blob/main/LICENSE.md)) | 2026-04-14 (**FLAGGA** ~6 mån utan push) | Ramverk + benchmarkregister |
| [braintrustdata/autoevals](https://github.com/braintrustdata/autoevals) | 1 056 | MIT | 2026-10-08 | Bibliotek för LLM-utvärdering (Braintrust) |
| Braintrust (SaaS) | – | **FLAGGA kommersiell** | – | Starter $0 (1 GB/mån, 10k scores, 14 dagars lagring, 1 mänsklig bedömning per projekt), Pro $249/mån ([pricing](https://www.braintrust.dev/pricing)) |
| LangSmith (SaaS) | – | **FLAGGA kommersiell** | – | Developer $0 (1 plats, 5k traces/mån, 14 dagars lagring), Plus $39/plats/mån; "Tuned Evaluators" ej på Developer ([pricing](https://www.langchain.com/pricing)) |
| [microsoft/playwright-mcp](https://github.com/microsoft/playwright-mcp) (redan i inventariet) | 38 095 | Apache-2.0 | 2026-10-08 | Playwright MCP-server |
| [vercel-labs/agent-browser](https://github.com/vercel-labs/agent-browser) | 43 908 | Apache-2.0 | 2026-10-13 | "Browser automation CLI for AI agents" |
| [dequelabs/axe-core](https://github.com/dequelabs/axe-core) | 7 638 | MPL-2.0 (svag copyleft på filnivå) | 2026-10-12 | "Accessibility engine for automated Web UI testing" |
| [GoogleChrome/lighthouse-ci](https://github.com/GoogleChrome/lighthouse-ci) | 7 110 | Apache-2.0 | 2026-03-27 | "Automate running Lighthouse for every commit ... preventing regressions" |
| [simonw/showboat](https://github.com/simonw/showboat) | 1 235 | Apache-2.0 | 2026-03-14 | "Create executable documents that demonstrate an agent's work" |
| [simonw/rodney](https://github.com/simonw/rodney) | 761 | Apache-2.0 | 2026-03-12 | "CLI tool for interacting with the web" |
| [prime-radiant-inc/superpowers-evals](https://github.com/prime-radiant-inc/superpowers-evals) | 131 | ingen | 2026-10-10 | Beteende-eval-labb som driver kodagent-CLI:er och betygsätter arbetsflödesefterlevnad |
| [Tencent-Hunyuan/ArtifactsBenchmark](https://github.com/Tencent-Hunyuan/ArtifactsBenchmark) | 279 | Other | 2025-12-30 (**FLAGGA** inaktiv) | Kod för ArtifactsBench |
| [anthropics/knowledge-work-plugins](https://github.com/anthropics/knowledge-work-plugins) (design-plugin) | 29 488 | Apache-2.0 | 2026-10-12 | Design-skills: accessibility-review, design-critique, design-handoff, design-system, research-synthesis, user-research, ux-copy ([design/skills](https://github.com/anthropics/knowledge-work-plugins/tree/main/design/skills)) |

#### Ramverksdetaljer
- promptfoo har provider `anthropic:claude-agent-sdk` / `anthropic:claude-code` med `working_dir`, `copy_working_dir` (färsk kopia per steg), `skills`-filter, assertion `skill-used`, lokala `plugins`, `max_budget_usd` och spårassertioner — [promptfoo: Claude Agent SDK](https://www.promptfoo.dev/docs/providers/claude-agent-sdk/)
- promptfoo `llm-rubric` kan bedöma bilder via egen `rubricPrompt` med `image_url` och en vision-provider; domarmodellen kan bytas per svit/assertion; sidan säger inget om kalibrering eller få-shot-exempel — [promptfoo: model-graded](https://www.promptfoo.dev/docs/configuration/expected-outputs/model-graded/)
- OpenAI tillkännagav köpet av Promptfoo 2026-03-09; bolaget "expects to continue building out Promptfoo's open source offering" — [TechCrunch](https://www.techcrunch.com/2026/03/09/openai-acquires-promptfoo-to-secure-its-ai-agents/)
- Inspect AI (UK AI Security Institute + Meridian Labs): Task = dataset + solver + scorer; `model_graded_qa()`; Docker-sandlåda; kan köra externa agenter som Claude Code, Codex CLI och Gemini CLI; loggvisaren Inspect View — [inspect.aisi.org.uk](https://inspect.aisi.org.uk/)
- DeepEval G-Eval är "NOT deterministic"; rubrikband 0–10; `DAGMetric` för mer deterministiska beslutsträd; uppladdning till Confident AI (SaaS) är valfri — [DeepEval docs](https://deepeval.com/docs/metrics-llm-evals)
- Anthropic om verifieringsmetoder: regelbaserad återkoppling (lint) är stark; visuell återkoppling via Playwright MCP men "a single screenshot has limited viewport info"; LLM-som-domare "is generally not a very robust method, and can have heavy latency tradeoffs" — [Building agents with the Claude Agent SDK (2025-09-29)](https://claude.com/resources/articles/building-agents-with-the-claude-agent-sdk)
- Showboat: `exec` spelar in ett kommando och dess verkliga output, vilket motverkar att agenten skriver vad den hoppades skulle hända — [Willison: Agentic manual testing](https://simonwillison.net/guides/agentic-engineering-patterns/agentic-manual-testing/)

#### Forskning: LLM-som-domare – tillförlitlighet och bias
- Zheng m.fl. 2023 (NeurIPS 2023 D&B): GPT-4 parvis mot människor 66 % (S1, oavgjort räknas) / 85 % (S2, utan oavgjort) mot människa–människa 63 % / 81 %. Positionskonsistens: GPT-4 65,0 %, GPT-3.5 46,2 %, Claude-v1 23,8 % (Claude-v1 föredrog första positionen i 75 %). Längdattack ("repetitive list") lurade Claude-v1 och GPT-3.5 i 91,3 % men GPT-4 i 8,7 %. Självförstärkning: GPT-4 ~10 % och Claude-v1 ~25 % högre vinstandel för egna svar, men författarna kan inte avgöra om biasen finns. Få-shot-domare höjde konsistensen (GPT-4 65,0→77,5 %; Claude-v1 23,8→63,7 %); positionsbyte med vinst bara när båda ordningarna är eniga; CoT och referensstyrd bedömning sänkte felandelen vid matte-bedömning från 70 % till 30 % respektive 15 % — [arXiv:2306.05685](https://arxiv.org/abs/2306.05685), siffror ur [PDF](https://arxiv.org/pdf/2306.05685)
- Panickssery, Bowman & Feng 2024: LLM:er (t.ex. GPT-4, Llama 2) känner igen egna texter över slumpnivå, och efter finjustering finns ett linjärt samband mellan självigenkänning och självpreferens — [arXiv:2404.13076](https://arxiv.org/abs/2404.13076)
- Thakur m.fl. 2024/2025 (13 domare): bara de största modellerna når rimlig samstämmighet, fortfarande "well short of inter-human agreement", med upp till 5 poängs skillnad; procentuell överensstämmelse kan vilseleda; tendens till mildhet — [arXiv:2406.12624](https://arxiv.org/abs/2406.12624)
- Prometheus: med egen rubrik + referenssvar når en öppen 13B-domare Pearson 0,897 mot mänskliga bedömare över 45 rubriker (GPT-4 0,882), men bara när rubrik och referens finns — [arXiv:2310.08491](https://arxiv.org/abs/2310.08491)
- Shankar m.fl. 2024 (EvalGen): "criteria drift" – "users need criteria to grade outputs, but grading outputs helps users define criteria"; alignment är subjektiv och iterativ — [arXiv:2404.12272](https://arxiv.org/abs/2404.12272)

#### Forskning: visuell/UI-bedömning specifikt
- Chen m.fl. 2024 (MLLM-as-a-Judge): parvis jämförelse visar "remarkable human-like discernment", medan absolut poängsättning och batch-rangordning avviker signifikant från människor; hallucinerade bedömningar även hos GPT-4V; inte "fully reliable evaluators" — [arXiv:2402.04788](https://arxiv.org/abs/2402.04788)
- Luera m.fl. 2025 ("MLLM as a UI Judge", Adobe m.fl.; GPT-4o, Claude 3.5 Sonnet, Llama-3.2-11B; 30 UI:n, 9 296 mänskliga svar): absolut 1–7 inom ±1 i 72–77 % men exakt bara 35–38 %; parvis ~60 % (Claude, GPT-4o), nära slump för "ease of use" (~47–51 %), men upp mot ~90 % när människornas poängskillnad är stor; underskattar "interesting"; rekommenderas som "UI testing approximators, not replacements" i tidig, billig iteration. Artikeln har interna sifferinkonsekvenser — [arXiv:2510.08783](https://arxiv.org/abs/2510.08783)
- ArtifactsBench (Tencent m.fl.): renderar artefakter, fångar beteende med tidsserie-skärmdumpar, MLLM-domare med "fine-grained, per-task checklist"; 94,4 % rangordningskonsistens med WebDev Arena och över 90 % parvis överensstämmelse med mänskliga experter; 1 825 uppgifter — [arXiv:2507.04952](https://arxiv.org/abs/2507.04952)
- UICrit: 3 059 kritiker och betyg för 983 mobil-UI:n från sju erfarna designers; få-shot + visuell prompting gav 55 % prestandalyft för LLM-genererad UI-feedback (mått ospecificerat på abstraktsidan) — [arXiv:2407.08850](https://arxiv.org/abs/2407.08850)
- UI-Bench: 10 text-to-app-verktyg, 30 prompter, 300 sajter, över 4 000 parvisa expertbedömningar, TrueSkill-rangordning; ingen LLM-domare — [arXiv:2508.20410](https://arxiv.org/abs/2508.20410)
- Anthropic: kalibrering av designbedömaren med få-shot-exempel och detaljerade poänguppdelningar minskade poängdrift; för QA-bedömaren läste författaren loggar, hittade avvikelser och skrev om prompten i flera rundor — [Harness design](https://www.anthropic.com/engineering/harness-design-long-running-apps)

#### Praktik: kalibrering av domare
- Anthropic: kodbaserade, modellbaserade och mänskliga graders; tydliga rubriker ("vague rubrics produce inconsistent judgments"); en isolerad domare per dimension; kalibrera mot mänskliga experter; ge domaren en "Unknown"-utväg; delpoäng; börja med "20-50 simple tasks drawn from real failures"; capability- vs regressions-evals; pass@k vs pass^k (75 % per försök ger ~42 % för pass^3); "won't know if your graders are working well unless you read the transcripts" — [Demystifying evals for AI agents (2026-01-09)](https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents)
- Hamel Husain, "critique shadowing": en huvudexpert ger pass/fail + detaljerade kritiker (inte 1–5-skalor); experternas exempel används som få-shot i domarprompten; dela data i train ~10–20 % / dev ~40–45 % / test ~40–45 %; frys prompten före test; rapportera TPR och TNR, inte rå överensstämmelse; börja med ~30 exempel, ~100 per felmod för validering; under ~60 exempel blir konfidensintervallen breda; Honeycomb-exemplet nådde >90 % överensstämmelse på tre iterationer — [hamel.dev (2024-10-29, uppd. 2026-09-01)](https://hamel.dev/blog/posts/llm-judge/)

### Inferences

#### Bedömning per kandidat
| Kandidat | Lucka | Förankring | Passform solo | Användning/destillat | Dom |
|---|---|---|---|---|---|
| skill-creator / `claude plugin eval` | Eval | Se fråga 1 | Inbyggt | Primära verktyg | **Ta in** / **Pröva** (se fråga 1) |
| promptfoo | Eval | Deklarativ testmatris, CI | Gratis OSS, YAML + Node; dubblerar inbyggt | Reserv om ni behöver matris prompt × modell eller CI-rapport utanför Claude Code | **Bevaka** – bäst av de externa men ägarbyte till OpenAI och överlapp |
| Inspect AI | Eval | Forsknings-/säkerhets-evals | Python + Docker-sandlådor; tungt | – | **Avstå** – byggt för AI-säkerhetsforskning |
| DeepEval | Eval | G-Eval/DAG för LLM-appar | Python/pytest; icke-deterministiskt; SaaS-uppsäljning | – | **Avstå** – inget som inbyggda verktyg inte täcker |
| OpenAI Evals | Eval | Benchmarkregister | Inaktivt sedan april 2026 | – | **Avstå** |
| Braintrust (+autoevals) | Eval/spårning | SaaS | $249/mån Pro; gratisnivå 14 dagars lagring | – | **Avstå** |
| LangSmith | Eval/spårning | SaaS, LangChain-centrerat | $39/plats/mån | – | **Avstå** |
| Playwright MCP | Bedömarens ögon | Visuell återkoppling | Redan i inventariet | Skärmdumpar i flera viewports (en skärmdump har begränsad viewport-info) | **Ta in (behåll)** |
| agent-browser | Bedömarens ögon | CLI för agenter (nämns av Willison) | Dubblerar Playwright | – | **Bevaka** |
| Rodney | Bedömarens ögon | CDP-CLI | Dubblerar Playwright | – | **Avstå** |
| axe-core + Lighthouse CI | Deterministisk grind | Entydiga mått | Gratis; npm; ingen modellkostnad | Hantverksdelen (kontrast, a11y, prestanda) i Stop-hooken; autoresearch-mått | **Ta in** – entydiga mått tillåter full autonomi |
| Showboat | Bevis | Inspelad verklig output | Liten Go-CLI | Bevislogg (kommandon + skärmdumpar) som bedömare och ägare läser | **Pröva** |
| superpowers-evals | Eval | Arbetsflödesefterlevnad | Ingen licens, 131 ★ | – | **Bevaka** |
| ArtifactsBench (metod) | Bedömare | Checklistor per uppgift + tidsserie-skärmdumpar | Repo inaktivt, licens "Other" | Låna checklist-idén, inte koden | **Bevaka** |
| UICrit (dataset) | Bedömare | Få-shot + visuell prompting | Mobil-UI, inte småföretagssajter | Metodbelägg för få-shot med kritik | **Bevaka** |
| design-critique-skill (knowledge-work-plugins) | Bedömare | Strukturerad designkritik | Finns redan i miljön | Startfrö för rubriken, måste kalibreras | **Pröva** |

#### Protokoll för en kalibrerad designbedömare (destillat)
1. Kriterier: Anthropics fyra (designkvalitet, originalitet, hantverk, funktion) med tyngd på designkvalitet och originalitet; hantverk görs så långt möjligt deterministiskt (axe-kontrast, Lighthouse, typskala/grid-kontroller).
2. Format: en isolerad domare per kriterium, binärt pass/fail + skriftlig kritik, och en "Unknown"-utväg (Anthropic, Husain).
3. Beslutsregel för keep/discard: parvis A/B mot förra versionen eller en referenssajt, med positionsbyte; vinst bara om båda ordningarna är eniga, annars ägaren (Zheng; Chen: parvis mer människolik än absoluta poäng).
4. Bevis: skärmdumpar i minst tre viewports via Playwright, sparade i en Showboat-liknande logg; domaren får aldrig generatorns resonemang (självpreferens: Panickssery; Anthropic).
5. Kalibrering: ägaren poängsätter 30–40 skärmdumpar/sajter med pass/fail + kritik; 10–20 % blir få-shot-exempel med poänguppdelning, resten dev/test; mät TPR/TNR och iterera; sikta på >90 % men räkna inte med det.
6. Autonomigräns: Luera visar ~90 % vid stora skillnader men nära slump vid subtila → låt bedömaren fatta grova beslut (avvisa uppenbart generiskt/trasigt), och låt finjustering gå till ägaren.
7. Kriteriedrift: rubriken versioneras och kalibreras om när ägaren ändrar uppfattning (Shankar) och vid modellbyte (Anthropic: "a skill that worked well last month might behave differently today").
8. Samma metod passar kirurg, som också är en LLM-domare (över verktyg/länkar): kalibrera mot ägarens tidigare domar.

#### Destillera från
- Kalibrerad designbedömare: (1) [Anthropic: Harness design for long-running application development](https://www.anthropic.com/engineering/harness-design-long-running-apps); (2) [Hamel Husain: Using LLM-as-a-Judge](https://hamel.dev/blog/posts/llm-judge/); (3) [Luera m.fl. 2025](https://arxiv.org/abs/2510.08783) + [Zheng m.fl. 2023](https://arxiv.org/abs/2306.05685) för gränser och bias.
- Eval-verktyg: [Demystifying evals for AI agents](https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents).

### Gaps
- Ingen studie hittades som mäter LLM-domares överensstämmelse med människor för just småföretagssajters estetik/originalitet; närmast är Luera (30 mest professionella västerländska UI:n), UICrit (mobil), ArtifactsBench (interaktiva artefakter) och UI-Bench (bara människor).
- Inga publicerade siffror hittades för nuvarande Claude-modeller (Opus/Sonnet 4.x–5.x) som designdomare; Zhengs biassiffror gäller 2023 års modeller.
- ArtifactsBench-checklistornas utformning och DeepEvals multimodala G-Eval/ArenaGEval kunde inte detaljgranskas (bara abstrakt/översiktssidor lästa).
- promptfoos styrning efter OpenAI-köpet är oklar utöver uttalandet om fortsatt öppen källkod.

## 3. Vilka öppna AI-webbplats-/UI-byggare är värda att reverse-engineera, och vad visar de om att begränsa generering? (lucka: studie av AI-byggare)

### Takeaway
De öppna byggarna begränsar generering med (1) låst stack + förinstallerat komponentbibliotek + regelfil (Dyad: shadcn/ui), (2) numeriska designchecklistor i systemprompten (bolt.diy: 8px-grid, 3–5 färger, 18px+/40px+, WCAG 4.5:1), (3) regler för bildkällor, (4) självkontroll genom att rendera och fotografera resultatet (screenshot-to-code) och (5) komponentkatalog med schema (json-render). Det ger jämnhet men också den generiska look Nortropic vill bort från. Studera (läs, installera inte) bolt.diy-prompterna, screenshot-to-codes eval- och preview-flöde, Dyads scaffold och json-renders katalogprincip; flagga Webstudio (AGPL-3.0), Dyad `src/pro` (FSL-1.1) och system-prompts-repot (GPL-3.0, extraherade proprietära prompter).

### Cited Findings

#### Byggare – fakta (GitHub 2026-10-13)
| Kandidat | ★ | Licens | Senaste push | Vad det är |
|---|---|---|---|---|
| [abi/screenshot-to-code](https://github.com/abi/screenshot-to-code) | 80 312 | MIT | 2026-10-09 | "Drop in a screenshot and convert it to clean code (HTML/Tailwind/React/Vue)" |
| [stackblitz-labs/bolt.diy](https://github.com/stackblitz-labs/bolt.diy) | 19 947 | MIT | 2026-10-13 (fork av bolt.new; underhållsläge) | "Prompt, run, edit, and deploy full-stack web applications using any LLM you want!" |
| [stackblitz/bolt.new](https://github.com/stackblitz/bolt.new) | 16 577 | MIT | 2024-12-17 (**FLAGGA** inaktiv) | Originalet |
| [dyad-sh/dyad](https://github.com/dyad-sh/dyad) | 21 886 | Apache-2.0 utom `src/pro`, som har egen licens ([LICENSE](https://github.com/dyad-sh/dyad/blob/main/LICENSE)); enligt README är den **FLAGGA FSL-1.1** (fair-source, Apache 2.0 som framtida licens) ([README](https://github.com/dyad-sh/dyad)) | 2026-10-13 | "Local, open-source AI app builder ... v0 / Lovable / Replit / Bolt alternative" |
| [firecrawl/open-lovable](https://github.com/firecrawl/open-lovable) | 28 679 | MIT | 2026-10-09 | "Clone and recreate any website as a modern React app in seconds" |
| [onlook-dev/onlook](https://github.com/onlook-dev/onlook) | 26 908 | Apache-2.0 | 2026-08-25 | AI-först visuell editor för Next.js + Tailwind |
| [webstudio-is/webstudio](https://github.com/webstudio-is/webstudio) | 9 059 | **FLAGGA AGPL-3.0** | 2026-10-13 | "Open source website builder and Webflow alternative" |
| [wandb/openui](https://github.com/wandb/openui) | 22 591 | Apache-2.0 | 2026-10-09 | "describe UI using your imagination, then see it rendered live" |
| [thesysdev/openui](https://github.com/thesysdev/openui) (annat projekt, förväxla inte) | 10 843 | MIT | 2026-10-13 | "The Open Standard for Generative UI" |
| [vercel-labs/json-render](https://github.com/vercel-labs/json-render) | 18 642 | Apache-2.0 | 2026-10-13 | "The Generative UI framework" |
| [Nutlope/llamacoder](https://github.com/Nutlope/llamacoder) | 7 142 | MIT | 2026-09-15 | "Open source Claude Artifacts – built with Llama 3.1 405B" |
| [e2b-dev/fragments](https://github.com/e2b-dev/fragments) | 6 388 | Apache-2.0 | 2026-10-13 | "Open-source Next.js template for building apps that are fully generated by AI" |
| [x1xhlol/system-prompts-and-models-of-ai-tools](https://github.com/x1xhlol/system-prompts-and-models-of-ai-tools) | 143 998 | **FLAGGA GPL-3.0** + extraherade proprietära prompter | 2026-10-12 | Systemprompter/verktyg för bl.a. Lovable, v0, Same.dev, Orchids.app, Leap.new, Emergent, Replit |

#### Hur de begränsar generering (belägg)
- screenshot-to-code: stackar HTML+Tailwind, HTML+CSS, React+Tailwind, Vue+Tailwind, Bootstrap, Ionic+Tailwind; Gemini extraherar riktiga logotyper/bilder ur skärmdumpen; Replicate för bildgenerering; ett valfritt "screenshot preview"-verktyg låter agenten rendera sidan i headless-webbläsare och kontrollera sitt arbete — [README](https://github.com/abi/screenshot-to-code). Backend har mapparna `agent/`, `codegen/`, `evals/`, `preview_screenshot/`, `prompts/`, `image_generation/` ([backend](https://github.com/abi/screenshot-to-code/tree/main/backend))
- screenshot-to-codes eval: 16 skärmdumpar, `run_evals.py`, betyg 1–4 i ett `/evals`-gränssnitt; "Generally, I run three tests for each model/prompt + stack combo and take the average score out of those tests to evaluate." — [Evaluation.md](https://github.com/abi/screenshot-to-code/blob/main/Evaluation.md)
- bolt.diy har flera promptvarianter (`diligent-dan.ts`, `discuss-prompt.ts`, `new-prompt.ts`, `optimized.ts`, `prompts.ts`, `simple-sal.ts`, `tiny-tim.ts`) ([prompts/](https://github.com/stackblitz-labs/bolt.diy/tree/main/app/lib/common/prompts)). `simple-sal.ts` innehåller en designchecklista: "Modern, clean aesthetics", "8px grid spacing", "3-5 colors + neutrals", "18px+ body, 40px+ headlines", "4.5:1 contrast (WCAG AA)", "All states: loading, error, empty, success"; bildregel "Images: Pexels URLs only"; "Complete file content (no placeholders or "// rest")"; en lista med förbjudna ord ("delve", "leverage", "robust", "seamless" m.fl.); användarens `designScheme` injiceras som JSON ("User preferences: ...") — [simple-sal.ts](https://github.com/stackblitz-labs/bolt.diy/blob/main/app/lib/common/prompts/simple-sal.ts)
- bolt.diy-README: stöd för "21+ model providers"; påbörjat av Cole Medin; pågående arbete begränsas till buggfixar och beroendeuppdateringar, inga nya funktioner planeras (sammanfattning) — [bolt.diy](https://github.com/stackblitz-labs/bolt.diy)
- Dyads scaffold-regler: "You are building a React application. Use TypeScript. Use React Router"; sidor i `src/pages/`, komponenter i `src/components/`; "ALWAYS try to use the shadcn/ui library"; "You ALREADY have ALL the shadcn/ui components and their dependencies installed"; Tailwind för all styling; lucide-react för ikoner — [AI_RULES.md](https://github.com/dyad-sh/dyad/blob/main/scaffold/AI_RULES.md)
- open-lovable kräver Firecrawl-API-nyckel och sandlåda (Vercel som standard eller E2B), LLM-nycklar för Gemini/Anthropic/OpenAI/Groq och valfritt Morph "Fast Apply" för snabbare ändringar — [README](https://github.com/firecrawl/open-lovable)
- Onlook instrumenterar koden så att element i förhandsvisningen mappas till sin källkodsplats; Morph Fast Apply och Relace för ändringar; CodeSandbox SDK; hostad produkt i early access; README beskriver open source-editorn som projektet som "started Onlook" — [README](https://github.com/onlook-dev/onlook)
- wandb/openui stöder många modeller via LiteLLM/Ollama och kan konvertera HTML till React/Svelte/Web Components; README kallar den lik v0 men "less polished" — [README](https://github.com/wandb/openui)
- json-render: komponenter och åtgärder deklareras i en katalog med Zod-props-scheman; AI:n "can only use components in your catalog"; `catalog.prompt()` genererar systemprompten ur katalogen; 36 färdiga shadcn/ui-komponenter; mål React, Vue, Svelte, Solid, React Native — [README](https://github.com/vercel-labs/json-render)
- system-prompts-repot har t.ex. mappen Lovable med "Agent Prompt.txt" (~20 KB) och "Agent Tools.json" — [repo](https://github.com/x1xhlol/system-prompts-and-models-of-ai-tools/tree/main/Lovable)
- UI-Bench jämför 10 text-to-app-verktyg med parvisa expertbedömningar och TrueSkill, med öppen eval-ram och leaderboard — [arXiv:2508.20410](https://arxiv.org/abs/2508.20410)

### Inferences

#### Bedömning per kandidat
| Kandidat | Lucka | Förankring | Passform solo | Användning/destillat | Dom |
|---|---|---|---|---|---|
| bolt.diy (prompterna) | AI-byggare | Numeriska designregler i systemprompt | Läsning, ingen installation | Jämför varianterna; låna formatet för hantverksregler (grid, typskala, kontrast, alla tillstånd, bildkällor) till bygg-sajt, inte estetiken | **Pröva (läs)** – tydligaste exemplet; underhållsläge, installera inte |
| screenshot-to-code | AI-byggare + eval | Litet fast eval-set, 1–4-betyg, 3 körningar; render-självkontroll | Läsning; MIT | Destillera eval-upplägget (16 fall, 3 körningar, mänsklig skala) och preview-självkontrollen | **Pröva (läs)** |
| Dyad (scaffold + AI_RULES.md) | AI-byggare | Mall + förinstallerat komponentbibliotek + regelfil | Läsning; FSL i `src/pro` | Motsvarande regelfil för Nortropics Astro-mall | **Bevaka (läs)** |
| json-render | AI-byggare | Katalogstyrd generering med schema | React/JSON, Nortropic kör Astro | Princip: generatorn får bara använda komponenter ur Nortropics egen katalog | **Bevaka (princip)** |
| open-lovable | AI-byggare | Skrapa → bygg om | Firecrawl + sandlåda + LLM-nycklar | Intressant för kunder med befintlig sajt (innehållsinsamling), men kloning motverkar originalitet | **Bevaka** |
| Onlook | Redigering | DOM↔kod-mappning | Aktivitet avtar; fokus på hostad produkt | Idé för att låta ägaren peka och rätta | **Bevaka** |
| system-prompts-repot | AI-byggare | Kommersiella byggares prompter | GPL-3.0; tveksam proveniens | Läs mönster (verktygsdesign, regler), kopiera inget | **Bevaka (läs-endast)** |
| UI-Bench | Bedömare | Expertparvis + TrueSkill | Metodtext | Parvis jämförelse i stället för absoluta betyg | **Bevaka** |
| wandb/openui | AI-byggare | – | "less polished"; lite begränsningsmaskineri | – | **Avstå** |
| Webstudio | AI-byggare | Visuell byggare | AGPL-3.0, ingen AI-pipeline att lära av | – | **Avstå** |
| llamacoder, fragments | AI-byggare | App-/artefaktgeneratorer | – | – | **Avstå** |
| bolt.new (original) | AI-byggare | – | Inaktiv sedan 2024-12 | – | **Avstå** |

#### Vad det betyder för Nortropic
- Byggarnas begränsningar (fast stack, ett komponentbibliotek, "Modern, clean aesthetics") förklarar troligen varför AI-sajter ser lika ut; Nortropic bör låsa hantverket deterministiskt (tokens, grid, typskala, kontrast, bildregler) men låta designfasens riktningar och bedömarens viktning av originalitet styra uttrycket (Anthropic viktade designkvalitet/originalitet över hantverk/funktion).
- Ingen av de studerade byggarna kopplar generering till en kalibrerad designdomare; det närmaste är screenshot-to-codes mänskliga 1–4-betyg och render-självkontroll. Det stöder att bedömaren är Nortropics egen differentiering snarare än något att köpa in.

#### Destillera från
- (1) [bolt.diy prompts/](https://github.com/stackblitz-labs/bolt.diy/tree/main/app/lib/common/prompts); (2) [screenshot-to-code: Evaluation.md + backend](https://github.com/abi/screenshot-to-code/blob/main/Evaluation.md); (3) [Dyad AI_RULES.md](https://github.com/dyad-sh/dyad/blob/main/scaffold/AI_RULES.md) + [json-render](https://github.com/vercel-labs/json-render) för katalogprincipen.

### Gaps
- `optimized.ts`/`new-prompt.ts` i bolt.diy och screenshot-to-codes promptkod lästes inte; jämförelsen mellan promptvarianter är därför ofullständig.
- Lovables och v0:s faktiska pipelines är bara kända via extraherade prompter (overifierat och upphovsrättsligt oklart).
- Fler v0-liknande öppna alternativ kunde inte sökas fram (webbsökbudgeten tog slut); listan bygger på de namngivna projekten plus Dyad, json-render, llamacoder och fragments.

## 4. Vilka kurerade listor ska Nortropic bevaka, och hur aktiva/kurerade är de? (lucka: bevakningslista)

### Takeaway
Bevakningslistan bör vara kort och officiell-först: claude-plugins-official, anthropics/skills, Claude Code-dokumentationen, Anthropics engineering-blogg och Simon Willisons guide, plus en enda selektiv community-lista (hesreallyhim/awesome-claude-code, med 14-dagars-/100-stjärnorsregel och förslag från människor via formulär). De stora listorna (ComposioHQ/awesome-claude-skills, punkpeye/awesome-mcp-servers) är aktiva men svagt kurerade eller kommersiellt färgade, och det officiella MCP-registret är i preview och kontrollerar bara namnrymd, inte kvalitet eller säkerhet.

### Cited Findings

#### Listor och register – fakta (GitHub 2026-10-13)
| Kandidat | ★ | Licens | Senaste push | Not |
|---|---|---|---|---|
| [anthropics/claude-plugins-official](https://github.com/anthropics/claude-plugins-official) | 37 792 | Apache-2.0 | 2026-10-13 | Anthropic-förvaltad katalog |
| [anthropics/claude-plugins-community](https://github.com/anthropics/claude-plugins-community) | 4 633 | Apache-2.0 | 2026-10-13 | "Read-only mirror — submit plugins at clau.de/plugin-directory-submission" |
| [anthropics/skills](https://github.com/anthropics/skills) | 180 880 | se fråga 1 | 2026-10-09 | Officiella skills |
| [hesreallyhim/awesome-claude-code](https://github.com/hesreallyhim/awesome-claude-code) | 55 582 | Other | 2026-10-13 | 1 094 öppna issues |
| [ComposioHQ/awesome-claude-skills](https://github.com/ComposioHQ/awesome-claude-skills) | 77 011 | API: ingen; README: Apache 2.0 | 2026-09-18 | 1 715 öppna issues |
| [travisvn/awesome-claude-skills](https://github.com/travisvn/awesome-claude-skills) | 15 391 | ingen | 2026-04-28 (**FLAGGA** inaktiv) | – |
| [BehiSecc/awesome-claude-skills](https://github.com/BehiSecc/awesome-claude-skills) | 10 246 | ingen | 2026-09-21 | – |
| [VoltAgent/awesome-claude-code-subagents](https://github.com/VoltAgent/awesome-claude-code-subagents) | 25 687 | MIT | 2026-10-11 | "100+ specialized Claude Code subagents" |
| [rohitg00/awesome-claude-code-toolkit](https://github.com/rohitg00/awesome-claude-code-toolkit) | 2 696 | Apache-2.0 | 2026-05-12 | "135 agents, 35 curated skills, 42 commands, 176+ plugins ..." |
| [ccplugins/awesome-claude-code-plugins](https://github.com/ccplugins/awesome-claude-code-plugins) | 970 | Apache-2.0 | 2026-08-12 | – |
| [karanb192/awesome-claude-code-mods](https://github.com/karanb192/awesome-claude-code-mods) | 554 | CC0-1.0 | 2026-10-13 | Katalog över hooks/mods "with what each mod can read, write, run or send over the network" |
| [punkpeye/awesome-mcp-servers](https://github.com/punkpeye/awesome-mcp-servers) | 96 278 | MIT | 2026-10-09 | Hemsida glama.ai/mcp/servers |
| [appcypher/awesome-mcp-servers](https://github.com/appcypher/awesome-mcp-servers) | 5 795 | – | **FLAGGA arkiverad** | – |
| [wong2/awesome-mcp-servers](https://github.com/wong2/awesome-mcp-servers) | 4 359 | MIT | 2026-07-13 | – |
| [modelcontextprotocol/registry](https://github.com/modelcontextprotocol/registry) | 7 348 | Other | 2026-10-11 | Officiellt MCP-register |
| [webfuse-com/awesome-autoresearch](https://github.com/webfuse-com/awesome-autoresearch) | 2 565 | Other | 2026-09-21 | Loopar/forskningsagenter i autoresearch-stil |
| [vercel-labs/skills](https://github.com/vercel-labs/skills) | 34 303 | MIT | 2026-10-09 | "The open agent skills tool - npx skills" (skills.sh) |

#### Kurering (belägg)
- hesreallyhim/awesome-claude-code: en resurs måste vara minst 14 dagar gammal med fortsatt utveckling ELLER ha minst 100 stjärnor; en rekommendation i taget; endast via issue-formulär ("Do not open a PR"); "there is no formal submission/review process"; "the point of an Awesome List is to be *selective*"; boten är "a mechanical form-validator, it does not review the quality"; rekommendationer "must be created by human beings" — [CONTRIBUTING.md](https://github.com/hesreallyhim/awesome-claude-code/blob/main/CONTRIBUTING.md)
- ComposioHQ/awesome-claude-skills: kureringsprocess ej beskriven i README; sidans topp är en snabbstart för Composios connect-apps-plugin; avsnitt för Composios MCP Gateway och "App Automation via Composio" (Rube MCP, 78 SaaS-appar); påstår "1000+" men listar betydligt färre — [README](https://github.com/ComposioHQ/awesome-claude-skills)
- punkpeye/awesome-mcp-servers: PR-baserad; "If you are an automated agent, we have a streamlined process for merging agent PRs" (tre robot-emojis i PR-titeln ger snabbspår) — [CONTRIBUTING.md](https://github.com/punkpeye/awesome-mcp-servers/blob/main/CONTRIBUTING.md)
- MCP-registret "has launched in preview" (2025-09-08), "breaking changes or data resets may occur", API-frys v0.1, GA "will follow later"; namnrymdsverifiering via GitHub OAuth/OIDC, DNS eller HTTP; ingen beskriven kvalitets- eller säkerhetsgranskning — [registry README](https://github.com/modelcontextprotocol/registry)

### Inferences

#### Bedömning
| Källa | Dom | Skäl |
|---|---|---|
| claude-plugins-official | **Ta in** | Officiell, aktiv, där nya officiella loop/eval-plugins dyker upp |
| anthropics/skills | **Ta in** | Officiell; skill-creator utvecklas här |
| Claude Code-docs ([llms.txt-index](https://code.claude.com/docs/llms.txt)) | **Ta in** | Inbyggda funktioner (`/goal`, plugin eval, dynamic workflows) kommer med versionskrav och gör tredjepartsverktyg överflödiga |
| Anthropic engineering + claude.com-bloggen | **Ta in** | Primärkälla för harness-/eval-mönster |
| simonwillison.net (Agentic Engineering Patterns) | **Ta in** | Oberoende, praktisk, löpande uppdaterad |
| hesreallyhim/awesome-claude-code | **Ta in** | Enda community-listan med tydliga urvalsregler och mänskliga förslag |
| claude-plugins-community | **Bevaka** | Officiell spegel men community-innehåll |
| BehiSecc/awesome-claude-skills | **Bevaka (låg prio)** | Aktiv men okänd kurering, ingen licens |
| punkpeye/awesome-mcp-servers | **Bevaka (sökindex, inte förtroende)** | Störst men snabbspår för agent-PR:er |
| MCP-registret | **Bevaka** | Officiellt men preview; verifierar ägarskap, inte kvalitet |
| karanb192/awesome-claude-code-mods | **Bevaka** | Säkerhetsinventering av hooks/mods före installation |
| awesome-autoresearch | **Bevaka** | Loopmönster |
| vercel-labs/skills (skills.sh) | **Bevaka** | Tvärverktygs-katalog/installerare |
| ComposioHQ/awesome-claude-skills | **Avstå** | Kommersiell slagsida, odokumenterad kurering, 1 715 öppna issues |
| travisvn/awesome-claude-skills | **Avstå** | Inaktiv sedan april 2026 |
| VoltAgent/awesome-claude-code-subagents | **Avstå** | 100+ subagenter uppmuntrar exakt den breddning som gav 67 skill-konflikter |
| rohitg00, ccplugins | **Avstå** | Kvantitet framför kurering; redundanta |
| appcypher (arkiverad), wong2 (lägre aktivitet) | **Avstå** | – |

#### Föreslagen bevakningsrutin
- Månadsvis körning (lokalt `claude -p` eller schemalagd claude-code-action) som listar nytt i de sex Ta in-källorna och skapar vilande backlogposter via kirurg.
- Intagsregel: officiellt, eller klarar hesreallyhims tröskel; licens OK (ingen AGPL/GPL i levererad kod); överlappar inte befintlig skill; och "Ta in" kräver uppmätt Δ mot baslinje i skill-creator (annars "Pröva").
- Kirurg omprövas själv med samma domarmetod (fråga 2): ett litet set tidigare länkar med ägarens domar, mät överensstämmelse (TPR/TNR för "ta in").

#### Destillera från
- (1) [hesreallyhim CONTRIBUTING.md](https://github.com/hesreallyhim/awesome-claude-code/blob/main/CONTRIBUTING.md) (urvalsregler att kopiera); (2) [claude-plugins-official](https://github.com/anthropics/claude-plugins-official) + [Claude Code docs](https://code.claude.com/docs/llms.txt); (3) [Simon Willison: Agentic Engineering Patterns](https://simonwillison.net/guides/agentic-engineering-patterns/).

### Gaps
- Svarstider på issues och merge-takt för listorna mättes inte; antal servrar i MCP-registret visades inte (sidan laddade inte listan).
- Aggregatorer som glama.ai, mcp.so och smithery granskades inte (webbsökbudgeten tog slut).
- Claude Codes CHANGELOG lästes inte och är en möjlig sjunde bevakningskälla.

## 5. Vad säger Karpathy, Simon Willison, Anthropic engineering och andra trovärdiga praktiker 2025–2026 om agentloopar, verifiering och "vibe engineering" – och vad säger DSR, Lean och DORA – som bör forma flödet?

### Takeaway
Källorna är samstämmiga: verifiering är hävstången (ge agenten en kontroll den kan köra och kräv bevis), görare och bedömare ska separeras, man börjar enkelt och lägger till komplexitet bara när det mätbart behövs, och människan behåller tillsynen med full autonomi bara där måttet är entydigt. Lärande över tid kommer av att människan uppdaterar instruktioner och harness. DSR (Hevner/Peffers) och Lean (build–measure–learn) ger den metodiska ramen där varje skill-/promptändring är en artefakt som utvärderas mot baslinje, och DORA 2025 varnar att AI förstärker befintliga svagheter och försämrar stabiliteten utan tester, versionshantering och snabba återkopplingsloopar.

### Cited Findings

#### Anthropic engineering
- "Building effective agents" (Erik S. och Barry Zhang, 2024-12-19): "finding the simplest solution possible, and only increasing complexity when needed"; evaluator-optimizer är "particularly effective when we have clear evaluation criteria"; börja med API:er direkt eftersom ramverk "often create extra layers of abstraction that can obscure the underlying prompts"; agenter behöver "ground truth" från miljön i varje steg; stoppvillkor som max antal iterationer — [Anthropic](https://www.anthropic.com/research/building-effective-agents)
- "Effective context engineering for AI agents" (2025-09-29, uppd. 2026-01-06): "the smallest possible set of high-signal tokens that maximize the likelihood of some desired outcome"; context rot; "just-in-time"-hämtning; compaction; "structured note-taking"; subagenter som returnerar "a condensed, distilled summary" — [Anthropic](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents)
- Agentloopen "gather context -> take action -> verify work -> repeat" — [Building agents with the Claude Agent SDK](https://claude.com/resources/articles/building-agents-with-the-claude-agent-sdk)
- Harness design (2026-03-24): generator/evaluator; "the space of interesting harness combinations doesn't shrink as models improve"; ompröva harnessen vid nya modeller och ta bort delar som inte längre bär last — [Anthropic](https://www.anthropic.com/engineering/harness-design-long-running-apps)
- Dynamic workflows (2026-06-02): självpreferens och "agentic laziness" som felmoder; adversarial verifiering; dyrare och för "complex, high value tasks" — [claude.com](https://claude.com/blog/a-harness-for-every-task-dynamic-workflows-in-claude-code)

#### Simon Willison
- "Designing agentic loops" (2025-09-30): en agent "runs tools in a loop to achieve a goal"; loopar passar uppgifter med "clear success criteria" och "trial and error"; kör i sandlåda, helst på någon annans dator; för betalande nycklar "set a tight budget limit" — [simonwillison.net](https://simonwillison.net/2025/Sep/30/designing-agentic-loops/)
- "Vibe engineering" (2025-10-07): erfarna yrkespersoner som förblir "proudly and confidently accountable for the software they produce"; praxis: automatiserade tester, planering, dokumentation, versionshantering, automation (CI, lint, preview-deploy), granskningskultur, manuell QA, preview-miljöer, veta vad man lämnar ut; AI "amplify existing expertise" — [simonwillison.net](https://simonwillison.net/2025/Oct/7/vibe-engineering/)
- "Agentic manual testing" (Agentic Engineering Patterns, uppd. ~2026-03): "Never assume that code generated by an LLM works until that code has been executed"; gröna tester garanterar inte fungerande kod; webb-UI testas med Playwright, agent-browser eller Rodney; Showboat spelar in verklig output — [simonwillison.net](https://simonwillison.net/guides/agentic-engineering-patterns/agentic-manual-testing/)
- "What is agentic engineering" (uppd. ~2026-03-15): människan ska ge verktyg, specificera problemet och "verify and iterate on the results until we are confident they address our problems in a robust and credible way"; "The craft has always been figuring out what code to write"; agenter lär sig av misstag bara om människor medvetet uppdaterar deras instruktioner och harness (parafras) — [simonwillison.net](https://simonwillison.net/guides/agentic-engineering-patterns/what-is-agentic-engineering/)

#### Karpathy
- "Agentic engineering" (X-inlägg tidigt feb 2026, återgivet 2026-02-10): "The goal is to claim the leverage from the use of agents but without any compromise on the quality of the software"; "'agentic' because the new default is that you are not writing the code directly 99% of the time, you are orchestrating agents who do", med människan "acting as oversight"; "'engineering' to emphasize that there is an art & science and expertise to it" — [The New Stack](https://thenewstack.io/vibe-coding-is-passe-karpathy-has-a-new-name-for-the-future-of-software/)
- YC AI Startup School (juni 2025), enligt swyx:s anteckningar (parafras, inte ordagrant): "the faster the loop the better"; för generering: "Keep AI on tight leash"; "Autonomy Slider"; "Demo is works.any(), product is works.all()" — [Latent Space](https://www.latent.space/p/s3)
- autoresearch (mars 2026): "fixed 5-minute time budget"; ett mått (`val_bpb`); `program.md` är "essentially a super lightweight 'skill'"; agenten får inte ändra utvärderingen ("The `evaluate_bpb` function in `prepare.py` is the ground truth metric"); keep vid förbättring, annars `git reset`; "Simplicity criterion: All else being equal, simpler is better"; resultat i `results.tsv`; ~12 experiment/timme — [README](https://github.com/karpathy/autoresearch), [program.md](https://github.com/karpathy/autoresearch/blob/master/program.md)

#### Andra praktiker
- Boris Cherny (enligt InfoQ 2026-01-10): "The most important tip is to give Claude a way to verify its work through a feedback loop"; InfoQ anger att det kan höja slutkvaliteten "by a factor of 2–3", men noterar att siffran är artikelns formulering; han testar varje ändring med Claude Chrome-tillägget; team-CLAUDE.md i git (~2,5k tokens) för att samla misstag; Plan mode före auto-accept; PostToolUse-hook för formattering; 10–20 % av sessionerna överges — [InfoQ](https://infoq.com/news/2026/01/claude-code-creator-workflow/)
- Geoffrey Huntley, Ralph (2025-07-14): "Ralph is a Bash loop"; "deterministically bad in an undeterministic world"; ett objekt per loop; specar + `fix_plan.md`; backpressure från tester, typkontroll, statisk analys; justera prompten "like a guitar"; greenfield-teknik "with the expectation you'll get 90% done with it", inte för befintliga kodbaser — [ghuntley.com](https://ghuntley.com/ralph/)
- Hamel Husain: domaren byggs runt en enda huvudexperts pass/fail-bedömningar med kritik, mäts med TPR/TNR — [hamel.dev](https://hamel.dev/blog/posts/llm-judge/)
- obra/superpowers `writing-skills`: "Writing skills IS Test-Driven Development applied to process documentation"; "If you didn't watch an agent fail without the skill, you don't know if the skill teaches the right thing"; "NO SKILL WITHOUT A FAILING TEST FIRST" — [SKILL.md](https://github.com/obra/superpowers/blob/main/skills/writing-skills/SKILL.md)

#### Metodramar: DSR, Lean, DORA
- Hevner, March, Park & Ram 2004, *MIS Quarterly* 28(1):75–105: ramverk och riktlinjer för att utföra och utvärdera design science-forskning där kunskap skapas genom att bygga och tillämpa artefakter — [University of Arizona](https://experts.arizona.edu/en/publications/design-science-in-information-systems-research/). De sju riktlinjerna: "Design as an artifact", "Problem relevance", "Design evaluation", "Research contributions", "Research rigor", "Design as a search process", "Communication of research"; tre-cykelvyn (relevans, rigor, design) — [Wikipedia: Design science (methodology)](https://en.wikipedia.org/wiki/Design_science_(methodology))
- Peffers, Tuunanen, Rothenberger & Chatterjee 2007, *JMIS* 24(3):45–77 (DSRM): problem och motivation → lösningsmål → design och utveckling → demonstration → utvärdering → kommunikation — [JMIS](https://jmis-web.org/articles/765); ingångspunkter: problem-, mål-, design- eller observationscentrerad — [Peffers m.fl. DESRIST 2006](https://jyx.jyu.fi/bitstream/handle/123456789/63435/Design%20Science%20Research%20Process.pdf?sequence=1)
- Lean Startup: "build-measure-learn feedback loop"; validerat lärande som "the unit of progress"; MVP för att lära "as quickly as possible"; innovation accounting för att mäta framsteg — [theleanstartup.com/principles](https://theleanstartup.com/principles)
- DORA 2025 (2025-09-23): "AI doesn't fix a team; it amplifies what's already there"; 90 % använder AI, 30 % har lite eller ingen tillit till AI-kod; AI-användning hänger positivt ihop med genomflöde men negativt med leveransstabilitet: "AI accelerates software development, but that acceleration can expose weaknesses downstream"; utan stark testautomation, mogen versionshantering och snabba återkopplingsloopar leder mer förändring till instabilitet; "AI becomes most useful when it's pointed at a clear problem" — [Google Cloud](https://cloud.google.com/blog/products/ai-machine-learning/announcing-the-2025-dora-report)

### Inferences

#### Principer för Flödet (syntes)
1. **Verifiering först**: inget steg räknas som klart utan en kontroll som kan köras och ett bevis i fil (Anthropic best practices, Cherny, Willison).
2. **Görare ≠ bedömare**: bedömaren har egen kontext och prompt och får inte se generatorns resonemang; mätinstrumentet (evals, kriterier) är skrivskyddat för generatorn (Anthropic harness design, dynamic workflows, autoresearch).
3. **Enkelt först, bevisad komplexitet sedan**: varje ny skill, hook eller agent behöver uppmätt Δ mot baslinje, och borttagning som håller resultatet räknas som en vinst (Building effective agents; autoresearch "Simplicity criterion"; agentskills.io "try removing instructions").
4. **Autonomiskala**: full autonomi (autoresearch/ralph) bara för entydiga mått; designomdöme körs via kalibrerad bedömare, och jämna eller osäkra fall går till ägaren (Karpathy autonomy slider och "tight leash" enligt swyx; ralph-loops egen avrådan; Luera).
5. **Små satser och tillstånd i filer**: en feature per varv, commit per lyckat varv, progress-fil för pickup/handoff (Anthropic long-running, Huntley, DORA).
6. **Lärande är människans uppdatering av harnessen**: rättelser blir hooks eller CLAUDE.md-rader, och skill-ändringar mäts (Willison, Cherny, hookify, skill-creator).

#### DSR/Lean/DORA → Nortropics loop
- Peffers sex steg kan bli mallen för varje förbättring av flödet: problem (felmod från verklig körning) → mål (eval-fall + kriterium) → design (skill-/promptändring) → demonstration (körning på eval-set) → utvärdering (Δ mot baslinje + ägarens granskning) → kommunikation (backlogpost/CHANGELOG). Hevners "Design as a search process" motsvarar keep/discard-loopen och "Design evaluation"/"Research rigor" den kalibrerade bedömaren.
- Lean: validerat lärande = uppmätt Δ (pass rate, ägarbetyg); innovation accounting = `benchmark.json`/`results.tsv` över tid; MVP = minsta loopen i fråga 1.
- DORA: Nortropics tidigare system (126 000 rader, ingen lanserad sajt) passar DORA:s förstärkarbild; motmedlet är små satser, git per steg och snabba deterministiska grindar innan mer AI-volym läggs på.

#### Destillera från (helhetsflödet)
- (1) [Claude Code: Best practices](https://code.claude.com/docs/en/best-practices); (2) [Anthropic: Harness design](https://www.anthropic.com/engineering/harness-design-long-running-apps) + [Effective harnesses](https://www.anthropic.com/engineering/effective-harnesses-for-long-running-agents); (3) [Simon Willison: Agentic Engineering Patterns](https://simonwillison.net/guides/agentic-engineering-patterns/). Metodram: [Peffers m.fl. 2007](https://jmis-web.org/articles/765).

### Gaps
- Boris Chernys ursprungliga X-inlägg (status 2007179832300581177) kunde inte hämtas (robots-spärr); "2–3x" är verifierat bara som InfoQ:s formulering, och den ofta citerade ordalydelsen är overifierad.
- Karpathys YC-tal är bara återgivet via swyx:s parafraserade anteckningar, och agentic engineering-inlägget via The New Stack (sekundärt).
- DORA:s sju AI-förmågor (AI Capabilities Model) kunde inte hämtas; de ligger bara i bild/PDF.
- Lean-belägget kommer från den officiella principsidan, inte Ries bok (2011); Lean UX-specifika källor lästes inte.
- Webbsökbudgeten tog slut i slutfasen; ytterligare praktiker (t.ex. Hamel Husain/Shreya Shankars kursmaterial 2026, Latent Space-avsnitt) kunde inte sökas fram.
