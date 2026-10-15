# Användarnivån på Macen och avgränsningen av byggsessionen

**Datum:** 2026-10-15, kl. 19.00–19.35 på Johnnys Mac.
**Version:** Claude Code 2.1.296, installerad globalt med npm. Den senaste är 2.1.300 (14 oktober) enligt `npm view` och changelog.
**Uppdrag:** steg 2 och 3 i `LAGE.md`. Inventera användarnivån, lista det som krockar med guiden, föreslå och pröva en avgränsning, och pröva de versionsberoende fakta som guiden verifierade med 2.1.281 på Windows.
**Status:** inventeringen och proven är klara. Johnny sa ja till avgränsningen, uppdateringen och publiceringen kl. 19.45 (`BESLUT.md` 2026-10-15). `~/.claude-bygg/settings.json` är skapad, och Claude Code är uppdaterad till 2.1.300. Kvar är verifieringen i den inloggade byggsessionen. Inget i `~/.claude`, `~/.claude.json` eller skalets konfiguration har ändrats.
**Tillägg kl. 20.15:** Läge, modell och effort är Johnnys inställningar och ingår inte i avgränsningen (`BESLUT.md` 2026-10-15, kl. 20.13–20.14). Byggsessionen körs i auto mode med Opus 5.5 på xhigh. Det som står nedan om Manual-läget och Fable 5.1 är ersatt. Efter inloggningen kördes `claude -p "/context"` och init-provet (`stream-json`) med `CLAUDE_CONFIG_DIR=~/.claude-bygg` från repots rot kl. 20.11, i Claude Code 2.1.300. Minnesfilerna var bara repots `CLAUDE.md`. Det fanns inga MCP-servrar och inga MCP-verktyg, alltså inga claude.ai-connectorer och inga Chrome-verktyg. Plugins var bara de fyra inbyggda och delagenterna bara de fem inbyggda. Skills var bara inbyggda, utan `design` och `design-sync`, och `memory_paths` saknades. Synken och connectorerna hålls alltså borta också inloggad. Kvar är Johnnys `/status`, `/skills` och `/mcp` i den interaktiva sessionen.
**Tillägg kl. 20.25:** Den interaktiva byggsessionen laddar två inbyggda MCP-servrar som proven med `-p` inte visade, nämligen `claude-in-chrome` och `ide`. Se avsnitt 3, *Sett inifrån byggsessionen*.
**Tillägg kl. 20.26:** Chrome-verktygen är spärrade, och Johnny har kört `/status`, `/skills` och `/mcp` i byggsessionen med beskedet *"allt är grönt"*. Avgränsningen är verifierad.
**Tillägg kl. 21.16:** Johnny tog bort alla spärrar (`BESLUT.md` 2026-10-15, *Inga spärrar*). Proven nedan av Chrome-spärren och sajtkatalogen står kvar som belägg.

## Metod

- Filerna under `~/.claude` och `~/.claude.json` lästes. Inget skrevs.
- Den officiella dokumentationen hämtades som markdown från `https://code.claude.com/docs/en/<sida>.md` den 15 oktober. Sidorna var cli-reference, settings, settings-reference, env-vars, permission-modes, authentication, skills, memory, mcp, commands, headless, sub-agents, claude-directory, plugins/install, plugins/mods/overview och changelog för 2.1.282–2.1.300.
- Proven kördes med `claude -p` och en tur, i en tom katalog och i repots katalog. Vad som laddas lästes på tre sätt: ur `system/init` i `stream-json`, ur en `InstructionsLoaded`-hook som skickades med `--settings`, och ur `claude -p "/context"`. Det sista ger en textrapport utan modellanrop. Proven kostade under 0,01 USD.
- **Fallgrop i proven:** `env -i` utan `USER` gav "Not logged in" även i standardkatalogen, eftersom nyckelringen slås upp per användare. Inloggningsproven kördes därför med `USER` satt.

## 1. Användarnivån på Macen (sett)

| Del | På Macen 2026-10-15 |
|---|---|
| Claude Code | 2.1.296 (`/opt/homebrew/bin/claude`, npm global, installerad 13 oktober) |
| `~/.claude/CLAUDE.md` | En rad: *"When interacting with Cloudflare, use the cf CLI unless the project has a Wrangler configuration file."* `cf` är Cloudflares nya CLI (npm-paketet `cf`, 1.0.0-beta.14). Det har bland annat `cf deploy`, `cf builds` och `cf pages`. |
| Egna skills i `~/.claude/skills/` | Fyra: `emil-design-eng`, `mobile-native`, `nortropic-intake` och `use-railway`. |
| Synkade skills från claude.ai | 15 i `~/.claude/skills/synced/`, bland dem `nortropic-intake` en gång till, `deep-research`, `skill-creator`, `mcp-builder` och dokumentskills (docx, pdf, pptx, xlsx). |
| Egna delagenter | Inga. `~/.claude/agents/` finns inte. Bara de inbyggda laddas: `claude`, `Explore`, `general-purpose`, `Plan` och `statusline-setup`. |
| Egna kommandon, output style, rules | Inga. Output style är standard. |
| Plugins på användarnivå | På: `superpowers` 6.4.1, `frontend-design`, `figma` 2.2.120 och `cloudflare` 1.0.2. Av: `slack`. |
| Synkade plugins från claude.ai | `design` 1.2.0, `Notion` 0.1.0 och `gitkraken` 1.0.0. |
| Inbyggda plugins | `cc-plugin-agents-md`, `cc-plugin-plugin-authoring`, `cc-plugin-sec-default` och `cc-plugin-telemetry`. De följer med Claude Code. |
| Hooks | Inga i `~/.claude/settings.json`. `superpowers` har en `SessionStart`-hook som lägger in skillen *using-superpowers* i varje session, med texten *"IF A SKILL APPLIES TO YOUR TASK, YOU DO NOT HAVE A CHOICE. YOU MUST USE IT."* |
| MCP-servrar | Användarnivå: `railway`, `mobbin` och `refero`. Hemkatalogens lokala nivå: `21st`. Plugins: `cloudflare`, `figma`, `gitkraken`, `Notion` och `design`. claude.ai-connectors: Claude Docs, GitHub, Gmail, Google Drive, Google Calendar, Jotform, Resend, Trybloom, GitBook och Notion. Inbyggda: Claude in Chrome (parad), computer-use och IDE. |
| `~/.claude/settings.json` | `model: "fable"`, `effortLevel: "high"` och `xhigh` för Fable 5.1 och Opus i `modelSettings`. `permissions.defaultMode: "auto"`. 209 allow-regler, bland dem `git push`, `npm run`, `npx astro` och `npx shadcn@latest add`. 19 deny-regler mot force-push, gamla webb-pro-skript och hemlighetskatalogen. `autoMode.environment` beskriver gamla Nortropic-repon. `env.GH_CONFIG_DIR` pekar på en sandlådekonfiguration för `gh` i `~/nortropic`. `autoMemoryDirectory: "~/.claude/memory"`. `remoteControlAtStartup: true`. |
| `~/.claude/settings.local.json` | 57 allow-regler från gamla körningar. `additionalDirectories` pekar på en tillfällig katalog från ett gammalt prov. |
| Auto memory | `~/.claude/memory/` har 316 filer. `MEMORY.md`, cirka 8 200 tokens, laddas i varje session. Det är webb-pros ägarbeslut och lärdomar, till exempel om artefakter, 21st och push efter grönt rökprov. |
| `gh` | Standardkonfigurationen är inloggad som Jonkebronk med `repo`-behörighet via nyckelringen. |

`/context` i repots katalog med standardkonfigurationen gav:

| Del | Innehåll |
|---|---|
| Minnesfiler | `~/.claude/CLAUDE.md`, repots `CLAUDE.md` och `~/.claude/memory/MEMORY.md` |
| Skills | 96 stycken, cirka 10 000 tokens eller 1 % av kontexten. Fyra är egna, 63 kommer från plugins, 14 är inbyggda och 15 är synkade från claude.ai. |
| MCP-verktyg | 421 stycken, varav 371 000 tokens är uppskjutna |

**Det guiden såg på Windows som inte finns på Macen:** 292 skills, `nortropic-stack` och de gamla delagenterna `stack-builder`, `design-reviewer`, `content-designer`, `qa-launcher`, `project-planner`, `seo-optimizer` och `nortropic-steward`. Strängen `stack-builder` finns bara i en testfil i `nortropic-intake`.

## 2. Det som kan krocka med guiden

Ordnat efter hur mycket det kan påverka den första sajten.

1. **Auto memory med webb-pros gamla ägarbeslut.** `MEMORY.md` laddas i varje session och innehåller beslut som guiden har ersatt. Guiden säger att besluten i `BESLUT.md` väger tyngst, och `3-4` säger att ingen lärdom ändrar något av sig själv (N1). Guiden nämner inte auto memory.
2. **Auto mode är standard.** Användarinställningen säger `auto`. Sedan 2.1.283 startar dessutom interaktiva terminalsessioner i auto mode när inget läge är satt. N1 kräver bevakad körning med behörighetsfrågorna på (`3-3`). En ny konfigurationskatalog räcker alltså inte. Läget måste sättas till Manual, som har config-värdet `default`.
3. **`superpowers` styr arbetssättet.** Hooken kräver att skills används och startar brainstorming före allt skapande. Skillsen föreskriver TDD, worktrees, parallella delagenter och delagentdriven utveckling. N1 säger inga hooks, granskaren som enda delagent och att Johnny tittar (`3-1`, `3-3`).
4. **MCP-verktyg som kan publicera går förbi deny-reglerna.** Guidens deny-regler täcker bara Bash. Andra vägar finns:
   - GitHub-connectorn har `push_files`, `create_or_update_file`, `merge_pull_request` och `delete_repository`.
   - `gitkraken` har `git_push`.
   - Cloudflare-pluginen har `execute`.
   - Railway har `create-deployment` och `deploy-template`.
   - Resend och Gmail skickar mejl.
5. **Regeln om `cf` i `~/.claude/CLAUDE.md`.** Guiden bygger med Wrangler (`2-8`). Regeln säger åt Claude att använda `cf` tills projektet har en Wrangler-konfiguration, och den kommer först i steg 3. `cf deploy`, `cf builds` och `cf pages` täcks inte av guidens deny-regler.
6. **Designverktyg som drar bort från stilkiten.** `frontend-design` ber om *distinctive* design, men guiden säger att ytan kommer ur ett stilkit och aldrig ur fri generering (`2-5`). De inbyggda `/design` och `/design-sync` publicerar till Claude Design, och Claude Design är inte designmotor (`BESLUT.md` 2026-10-14). Dit hör också `figma`, `design`, `emil-design-eng` och MCP-servrarna `refero`, `mobbin` och `21st`, som var webb-pros referensverktyg. Enligt bilaga E 2.9 används Variate och Inspo bara när kiten tas fram.
7. **`nortropic-intake`** finns både som egen och som synkad skill. Repots `CLAUDE.md` säger att byggsessionen inte använder gamla Nortropic-skills.
8. **De breda allow-reglerna**, bland dem `git push` och `npx shadcn@latest add`. Projektets deny går före allow, så risken är liten när sessionen är avgränsad.
9. **`gh` är inloggat med `repo`-behörighet.** `gh api` och `gh repo` täcks inte av `Bash(git push *)`. Spärren i N1 är Manual-läget och att Johnny tittar (`3-3`).

## 3. Avgränsningen

### Prövade sätt (prov i repots katalog)

| Sätt | Vad som laddas från användarnivån | Inloggning | Bedömning |
|---|---|---|---|
| Standard | Allt: 8 plugins, 5 MCP-servrar plus claude.ai, 68 skills före inloggning, `~/.claude/CLAUDE.md`, `MEMORY.md`, auto mode | Befintlig | – |
| `--setting-sources project,local` | Användarnivåns plugins, skills, MCP-servrar och behörigheter försvinner. `~/.claude/CLAUDE.md` laddas ändå. Auto memory flyttar till `~/.claude/projects/<repo>/memory/`. | Befintlig | Delvis. Flaggan måste ges varje gång, och claude.ai-delarna följer med. |
| `--safe-mode` | Allt anpassat är av, också repots `CLAUDE.md` enligt hjälptexten. Behörigheterna läses som vanligt, så sessionen startade i auto mode. | Befintlig | Bara baslinje |
| `--bare` | Läser aldrig OAuth eller nyckelringen | Kräver `ANTHROPIC_API_KEY` | Fungerar inte med Johnnys abonnemang |
| `CLAUDE_CONFIG_DIR` med en ny katalog | Inga plugins utom de inbyggda, inga MCP-servrar, bara inbyggda skills och egen auto memory. **Men `~/.claude/CLAUDE.md` laddas ändå**, som projektminne. | Utloggad. Kräver en egen `/login`. | Rekommenderas, med tilläggen nedan |

`~/.claude/CLAUDE.md` laddas också med en ny konfigurationskatalog. Claude Code letar efter `CLAUDE.md` och `.claude/CLAUDE.md` i varje överordnad katalog, och hemkatalogen är en sådan för repot. `/context` märker filen *Project*. Inställningen `claudeMdExcludes` med filens absoluta sökväg tar bort den, vilket är prövat.

### Beslutet (Johnny 2026-10-15)

Byggsessionerna körs med en egen konfigurationskatalog, `~/.claude-bygg`, och startas med genvägen `claude-bygg` från repots rot. Katalogens `settings.json` är byggsessionens användarnivå och påverkar inte Johnnys andra projekt:

```json
{
  "model": "fable",
  "modelSettings": { "claude-fable-5-1": { "effortLevel": "xhigh" } },
  "permissions": { "defaultMode": "default" },
  "syncClaudeAiSkills": false,
  "syncClaudeAiPlugins": false,
  "disableClaudeAiConnectors": true,
  "autoMemoryEnabled": false,
  "claudeMdExcludes": ["/Users/<användare>/.claude/CLAUDE.md"],
  "skillOverrides": { "design": "off", "design-sync": "off" }
}
```

| Nyckel | Varför | Källa |
|---|---|---|
| `model`, `modelSettings` | I N1 körs huvudsessionen med Johnnys standardinställning (`3-3`). Det är samma värden som i hans nuvarande inställning. | `3-3`, *Effort och modeller* |
| `permissions.defaultMode: "default"` | Manual-läget, alltså bevakad körning. Utan nyckeln startar en ny katalog i auto mode. | 📄 permission-modes |
| `syncClaudeAiSkills`, `syncClaudeAiPlugins` | Efter `/login` laddar kontot annars ner 15 skills, bland dem `nortropic-intake`, och pluginerna `design`, `Notion` och `gitkraken`. Nycklarna gäller bara på användarnivå. Ett repo kan inte stänga av dem. | 📄 settings-reference |
| `disableClaudeAiConnectors` | Efter `/login` hämtas annars GitHub, Gmail, Resend och de andra connectorerna, med verktyg som kan publicera. | 📄 settings-reference, mcp |
| `autoMemoryEnabled: false` | Ingen lärdom ändrar något av sig själv (`3-4`, N1). Lärdomar skrivs i repot och avgörs av Johnny. | `3-4` |
| `claudeMdExcludes` | `~/.claude/CLAUDE.md` laddas annars som projektminne (prövat). | Prov; 📄 settings-reference |
| `skillOverrides` | De inbyggda `/design` och `/design-sync` arbetar med Claude Design (`BESLUT.md` 2026-10-14). | 📄 commands |

**Prov före inloggning.** Proven gjordes först i 2.1.296 med samma `settings.json` i en tillfällig katalog. Efter beslutet gjordes de om i 2.1.300 med `~/.claude-bygg`, med samma resultat.

| Kontroll | Resultat |
|---|---|
| Minnesfiler i `/context` | Bara repots `CLAUDE.md` |
| Skills i `/context` | Bara 13 inbyggda. `design` och `design-sync` är borta också ur init-listan. |
| MCP-servrar | Inga |
| Plugins | De fyra inbyggda |
| Delagenter | Bara de inbyggda |
| Behörighetsläge | `default`, alltså Manual |
| Modell | `claude-fable-5-1` |
| `memory_paths` | Saknas, så auto memory är av |
| `/status` | Kräver en interaktiv session ("isn't available in this environment") |

### Kvar att verifiera efter inloggningen (⚠️ inte prövat)

- Att `syncClaudeAiSkills`, `syncClaudeAiPlugins` och `disableClaudeAiConnectors` håller borta claude.ai-delarna när sessionen är inloggad. Det står i dokumentationen men är inte prövat.
- Om Claude in Chrome och computer-use dyker upp i den nya katalogen. **Besvarat kl. 20.25:** Chrome syns i den interaktiva sessionen men inte computer-use (*Sett inifrån byggsessionen*).
- Om `/login` i den nya katalogen lämnar standardkatalogens inloggning orörd. Enligt dokumentationen får varje katalog en egen nyckelringspost (`authentication`). I dag finns bara posten `Claude Code-credentials`.

### Det Johnny gör en gång

```sh
echo 'alias claude-bygg="CLAUDE_CONFIG_DIR=$HOME/.claude-bygg claude"' >> ~/.zshrc && source ~/.zshrc
cd ~/nortropic-repos/nortropic-builder && claude-bygg
```

I den nya sessionen svarar Johnny ja på frågan om att lita på mappen och skriver `/login`. Sedan väljer han claude.ai-kontot i webbläsaren.

### Så verifieras byggsessionen

I den interaktiva byggsessionen:

| Kommando | Förväntat utfall |
|---|---|
| `/status` | Kontot och modellen. *Setting sources* visar användarinställningarna, alltså `~/.claude-bygg`, och projektets. |
| Statusraden | `⏸ manual mode on` |
| `/context all` | Minnesfiler: bara repots `CLAUDE.md`. Skills: bara *Built-in*. MCP-verktyg bara från `claude-in-chrome` och `ide` (kl. 20.25, se nedan). |
| `/skills` | Bara inbyggda skills, utan `design` och `design-sync` |
| `/mcp` | Ingen claude.ai-sektion. Servrar bara de inbyggda `claude-in-chrome` och `ide` (kl. 20.25, se nedan). |

Delagenterna kan inte verifieras med `/agents`. Sedan efter 2.1.197 skriver det kommandot bara en påminnelse och listar ingenting (📄 commands). De verifieras i stället med init-händelsens agentlista i `stream-json`, som ska visa bara de fem inbyggda.

Därtill kör Claude `claude -p "/context"` och init-provet med `CLAUDE_CONFIG_DIR=~/.claude-bygg` och sparar utdata som belägg.

### Sett inifrån byggsessionen (kl. 20.25)

Den första riktiga byggsessionen startades med `claude-bygg` i VS Code:s inbyggda terminal (`TERM_PROGRAM=vscode`). `CLAUDE_CONFIG_DIR` var `~/.claude-bygg` och versionen 2.1.300. Claude läste av vad som laddats i den egna kontexten:

| Del | Sett |
|---|---|
| Minnesfiler | Bara repots `CLAUDE.md`. `claudeMdExcludes` håller. |
| Skills | Bara inbyggda, 18 stycken, utan `design` och `design-sync`. Provet med `-p` visade 13. |
| Delagenter | Bara inbyggda: de fem från init-provet och `claude-code-guide` |
| claude.ai-connectorer, computer-use | Inga |
| **MCP-servrar** | **`claude-in-chrome`** med 22 verktyg: navigera, klicka, fylla i formulär, ladda upp filer, köra JavaScript och läsa nätverkstrafik. Dessutom **`ide`** med `getDiagnostics` och `executeCode`. |

- **`ide`** följer med eftersom CLI:t kopplar upp sig mot VS Code när det körs i VS Code:s terminal. Låsfilen ligger under `$CLAUDE_CONFIG_DIR/ide/`. `getDiagnostics` läser Problems-panelen. `executeCode` kör en cell i den aktiva Jupyter-anteckningsboken, men bara efter att någon klickat *Execute* i VS Code (📄 vs-code). Servern publicerar ingenting.
- **`claude-in-chrome`** använder Johnnys Chrome med dess inloggningar, och Claude kommer då åt varje sajt han är inloggad på (📄 chrome). I auto mode hoppar tillägget över sin egen kontroll per sajt när klassaren har godkänt anropet. Det gäller inte om behörighetsreglerna nekar Chrome någon sajt (📄 chrome). Därmed är Chrome-verktygen en sådan väg förbi deny-reglerna som avsnitt 2, punkt 4, beskriver. Det är också samma skäl som när OpenCLI (*inloggade Chrome-konton som agentkommandon*) avvisades i bilaga A: det går emot minsta behörighet (`2-9`). Guiden använder Playwright för kontrollerna och skärmdumparna (bilaga A).
- ⚠️ **Varför Chrome laddas är inte utrett.** Enligt dokumentationen laddas Chrome-verktygen med `--chrome` eller när *Enabled by default* är på i `/chrome` (📄 chrome). Ingen av dem har satts medvetet i `~/.claude-bygg`, och `claude -p` laddade inte verktygen.
- **Spärren som dokumentationen beskriver:** en deny-regel med serverns namn, `"mcp__claude-in-chrome"`, matchar alla serverns verktyg. En deny-regel som bara anger verktygsnamnet tar dessutom bort verktyget ur Claudes kontext (📄 permissions).
- **Införd kl. 20.25 efter Johnnys ja** (`BESLUT.md` 2026-10-15, *Chrome-verktygen spärras i byggsessionen*). `"mcp__claude-in-chrome"` står under `permissions.deny` i `~/.claude-bygg/settings.json`. **Verifierat:** när filen sparades meddelade sessionen att servern hade kopplats från, och alla 22 Chrome-verktyg försvann ur Claudes verktygslista utan omstart. `ide` finns kvar. Om `/mcp` fortfarande listar servern är inte sett.

### Sajtkatalogen (prov kl. 20.35, 2.1.300)

Frågan var var spärren för push ska ligga, när den inte får stoppa pushen av byggrepot. Proven gjordes med `claude -p "/context"` och init-händelsen i `stream-json`, utan modellanrop. Provkatalogen hade en rot med en sajt under `sites/x/`, och varje katalog hade egna `CLAUDE.md`, `.claude/settings.json` (deny på ett verktygsnamn) och en skill.

| Sessionen startad i | Projektinställningar | Skills | `CLAUDE.md` vid start |
|---|---|---|---|
| `sites/x/` | Bara sajtens. Rotens deny gällde inte. | Bara sajtens | Sajtens och rotens, eftersom roten är en överordnad katalog |
| roten | Bara rotens. Sajtens deny gällde inte. | Bara rotens | Bara rotens |

- `additionalDirectories: ["../.."]` i sajtens inställningar tog inte med rotens skills eller inställningar.
- Med `claudeMdExcludes` och ett glob, `**/<rot>/CLAUDE.md`, i sajtens inställningar laddades bara sajtens `CLAUDE.md`.
- **Prov med den riktiga mallen.** `mallar/sajt/` kopierades till `sites/_prov/` i byggrepot och startades med byggsessionens användarinställningar. Då laddades bara `sites/_prov/CLAUDE.md`, och det fanns inga MCP-servrar. Ett anrop med Haiku (0,003 USD) i den inloggade byggsessionen försökte `git push origin main`, `wrangler deploy --dry-run` och läsa `.env`. Alla tre nekades av reglerna, och `permission_denials` listade dem. Provsajten saknade fjärrdestination och togs bort efteråt.
- **Lucka och tillägg kl. 20.50.** `Bash(git push *)` fångar inte `git -C . push` eller `git -c push.default=current push`. Dokumentationen visar just de exemplen och tillåter jokertecken mitt i en regel (📄 permissions, *Wildcard patterns*). `Bash(git * push *)` och `Bash(git * push)` lades till i mallen. Ett nytt prov med Haiku (0,002 USD) gav att `git -C . push origin main`, `git -c push.default=current push origin main` och `git -C . push` nekades, medan `git status --short` gick igenom. Bash-regler är ändå ingen säkerhetsgräns: `sh -c '…'` och sökvägar som `/usr/bin/git` matchas inte (📄 permissions).

## 4. Versionsberoende fakta: 2.1.281 på Windows mot 2.1.296 på Macen

| Guiden (2.1.281) | 2.1.296 på Macen | Källa |
|---|---|---|
| Mods kräver 2.1.287 i terminalen (`3-5`, `5-byggplan`) | Kravet står kvar i dokumentationen, och 2.1.296 uppfyller det. Mods är på som standard, och `/plugin-authoring` finns. `claude update` behövs inte för mods. | 📄 plugins/mods/overview; init |
| `/doctor prompt-audit` kräver 2.1.283 | Finns | 📄 commands; changelog 2.1.283 |
| `--safe-mode` stänger av allt anpassat, också projektets eget | Stämmer: inga MCP-servrar, bara inbyggda skills och ingen auto memory. **Nytt:** behörigheterna läses som vanligt, så baslinjen startade i auto mode. Init listar fortfarande pluginernas namn, men deras skills och MCP-servrar laddas inte. Att repots `CLAUDE.md` är av kunde provet inte visa, eftersom hooks också är av. | `--help`; prov |
| `--bare` läser aldrig OAuth och kräver en API-nyckel | Stämmer. **Nytt sedan 2.1.286:** bara MCP-servrar som anges på kommandoraden, inga systempåminnelser och inga bakgrundsuppgifter. | `--help`; changelog 2.1.286; 📄 headless |
| `--setting-sources` väljer bara vilka settings-filer som laddas | **Gör mer.** Utan `user` försvinner användarnivåns plugins, skills, MCP-servrar och behörigheter. `~/.claude/CLAUDE.md` laddas ändå. | Prov; 📄 skills |
| En projektinställning kan inte stänga av `~/.claude/CLAUDE.md` (enligt dokumentationen, inte prövat) | Den laddades i alla prov utom med `claudeMdExcludes`. Den nyckeln fungerar från `--settings` och gäller enligt dokumentationen i alla settings-filer. | Prov; 📄 settings-reference |
| ⚠️ Hur `CLAUDE_CONFIG_DIR` beter sig med nyckelringen på macOS | **Verifierat:** en ny katalog är utloggad och kräver en egen `/login`. Nyckelringsposten knyts till katalogen. Standardkatalogen var inloggad i samma prov. | Prov; 📄 authentication |
| Auto mode går bara att sätta i användarens settings | Stämmer. **Nytt:** sedan 2.1.283–2.1.284 startar interaktiva terminalsessioner i auto mode när inget läge är satt. Manual-läget har config-värdet `default`. | 📄 permission-modes; changelog 2.1.284 |
| Verifiering med `/agents` (`3-3`) | Listar inga delagenter. Det gällde redan i 2.1.281. Init-händelsen eller `/context` används i stället. | 📄 commands |
| `/context` | Fungerar också som `claude -p "/context"`, utan inloggning och utan modellanrop. Det ger ett belägg som kan sparas. `/status` fungerar bara interaktivt. | Prov |
| Monitor, agentvyn och `claude plugin eval` | Finns kvar | 📄 tools-reference, cli-reference; changelog 2.1.299 |
| *Stäng av claude.ai-connectors* (⚠️ ej verifierat, `3-3`) | Nycklarna finns i dokumentationen, se förslaget ovan. Prövas efter inloggningen. | 📄 settings-reference |
| Johnnys användarinställning: `opus[1m]`, `xhigh`, inga `permissions` | På Macen gäller de värden som står i avsnitt 1 | `~/.claude/settings.json` |

## 5. Rättelser i guiden (införda 2026-10-15 efter Johnnys ja)

1. **`3-3`, *Byggsessionen avgränsas*.** Beslutet är infört, och Windows-iakttagelserna är ersatta med Macens. Lägg till fynden om `--setting-sources` och om att `~/.claude/CLAUDE.md` laddas som projektminne. Byt `/agents` mot init-listan i verifieringen. Ta upp auto memory och Manual-läget.
2. **`3-3`, *Versioner och installation*, och `5-byggplan`, *Börja nu*.** `claude update` behövs inte längre för mods och `prompt-audit`.
3. **`3-5`, *Mods*.** Meningen *"Lokalt finns 2.1.281 …"* är inaktuell.
4. **Bilaga E avsnitt 4.** Frågan om hur byggsessionen avgränsas besvaras av förslaget när det är verifierat.

## Källor

- 📄 Claude Code-dokumentationen, hämtad 2026-10-15: `https://code.claude.com/docs/en/{cli-reference,settings,settings-reference,env-vars,permission-modes,authentication,skills,memory,mcp,commands,headless,sub-agents,claude-directory,plugins/install,plugins/mods/overview,changelog}.md`. Kl. 20.25 hämtades också `chrome`, `vs-code` och `permissions`.
- Lokalt: `claude --version`, `claude --help`, `npm view @anthropic-ai/claude-code version`, `security dump-keychain` (bara posternas namn), filerna under `~/.claude`, `~/.claude.json` (bara nycklar och servernamn) och proven ovan.
- Föregångare: `kunskap/research/2026-10-14_claude-code-verifiering.md` (2.1.281 på Windows).
