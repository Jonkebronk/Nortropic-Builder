# hookify och claude-md-management

**Källa:** [anthropics/claude-plugins-official](https://github.com/anthropics/claude-plugins-official), klonat i `kallor/fg/anthropics_claude-plugins-official/repo` vid commit `ea10b21` (2026-10-15). Läst 2026-10-16.
- **hookify:** `README.md`, `plugin.json`, kommandot `hookify` i sin helhet och `list`, `configure` och `help` översiktligt, `agents/conversation-analyzer.md`, `skills/writing-rules/SKILL.md`, `hooks/hooks.json` med de fyra Python-hookarna, `core/config_loader.py`, `core/rule_engine.py` och de fyra exempelreglerna. Senaste ändringen är `b58bdbf` (2026-05-20).
- **claude-md-management:** `README.md`, `plugin.json` (1.0.0), `commands/revise-claude-md.md`, `skills/claude-md-improver/SKILL.md` och referensfilerna `quality-criteria.md`, `templates.md` och `update-guidelines.md`. Senaste ändringen är `aecd4c8` (2026-02-20).
- Jämfört med [Claude Code: Memory](https://code.claude.com/docs/en/memory) (2026-10-16).

**Licens:** Apache-2.0 enligt `LICENSE` i båda mapparna (tillagda 2026-02-20). hookifys README slutar ändå med "MIT License". Uppgifterna motsäger varandra; min tolkning är att LICENSE-filen gäller ⚠️. Vi sprider inget vidare.

## Vad det är
**hookify** gör regler i markdown (`.claude/hookify.<namn>.local.md`) till hooks. Utan argument letar `/hookify` efter rättelser och irritation i samtalet och föreslår regler. **claude-md-management** har två delar. Skillen `claude-md-improver` sätter betyg på `CLAUDE.md` mot en rubrik och föreslår ändringar. Kommandot `/revise-claude-md` för sessionens lärdomar till `CLAUDE.md` efter godkännande.

## Hur det fungerar
- **hookify, regeln:** frontmatter med `name`, `enabled`, `event` (`bash`, `file`, `stop`, `prompt` eller `all`), `action` (`warn` som standard, eller `block`) och antingen `pattern` eller `conditions` (fält, operator och mönster, där alla villkor måste gälla). Brödtexten är meddelandet till Claude.
- **hookify, motorn:** fyra kommandohooks (PreToolUse, PostToolUse, Stop, UserPromptSubmit) startar Python, som läser `.claude/hookify.*.local.md` relativt arbetskatalogen. Reglerna gäller vid nästa verktygsanrop, utan omstart. Vid varje fel avslutar hooken med 0 och släpper igenom anropet ("fail open"). Regex kompileras med `IGNORECASE`. `.gitignore` säger att `.claude/*.local.md` "should not be committed".
- **hookify, `/hookify`:** en analysagent läser de senaste 20–30 meddelandena och letar efter förbud ("don't use X"), rättelser, irritation och upprepningar. Den returnerar mönster med allvar *high*, *medium* eller *low*. Kommandot frågar användaren med AskUserQuestion vilka regler som ska skrivas och om de ska varna eller blockera. Därefter skrivs filerna. Analysagenten säger själv att diskussioner, hypoteser och engångsmisstag inte är beteenden att förbjuda.
- **claude-md-improver:** letar upp filerna och sätter betyg på sex kriterier, 100 poäng totalt: kommandon 20, arkitektur 20, icke-uppenbara mönster 15, kortfattat 15, aktuellt 15 och körbart 15. Betyget blir A–F. Rapporten skrivs alltid före ändringarna, ändringarna visas som diff med ett *Why*, och inget ändras utan användarens ja. Den varnar för generella råd, engångsfixar och mångordighet.
- **`/revise-claude-md`:** frågan är vilken kontext som saknades. En rad per begrepp ("`<command or pattern>` – `<brief description>`"), diffen visas, och "Only edit files they approve".

## Kvalitet och underhåll
Repot: 39 737 ★, 42 bidragsgivare, 1 133 öppna ärenden och PR, senaste push 2026-10-16. hookify har 8 commits och claude-md-management 4. Kända fel:
- **hookify, regler som aldrig utlöses:**
  - [#5707](https://github.com/anthropics/claude-plugins-official/issues/5707), [#1859](https://github.com/anthropics/claude-plugins-official/issues/1859), [#6339](https://github.com/anthropics/claude-plugins-official/issues/6339): reglerna slås upp relativt arbetskatalogen och slutar tyst gälla.
  - [#2102](https://github.com/anthropics/claude-plugins-official/issues/2102): `prompt`-regler läser `user_prompt`, men Claude Code skickar `prompt`.
- **hookify, regler som blockerar fel:**
  - [#5368](https://github.com/anthropics/claude-plugins-official/issues/5368) och [#5602](https://github.com/anthropics/claude-plugins-official/issues/5602): `not_contains` jämför bokstavligt, så det medföljande exemplet "kräv tester" blockerar alltid.
  - [#5662](https://github.com/anthropics/claude-plugins-official/issues/5662): alla regler laddas för MCP-verktyg.
  - [#6095](https://github.com/anthropics/claude-plugins-official/issues/6095): en saknad hookfil ger kod 2 och nekar varje verktygsanrop.
  - [#5312](https://github.com/anthropics/claude-plugins-official/issues/5312): `stop_hook_active` ignoreras.
- **hookify, meddelanden och analys:**
  - [#4260](https://github.com/anthropics/claude-plugins-official/issues/4260) och [#6314](https://github.com/anthropics/claude-plugins-official/issues/6314): skälet till en blockering når aldrig modellen.
  - [#5473](https://github.com/anthropics/claude-plugins-official/issues/5473) och [#6368](https://github.com/anthropics/claude-plugins-official/issues/6368): `/hookify` startar `general-purpose` i stället för sin egen läsbegränsade analysagent.
  - Egen läsning av koden: ett enkelt `pattern` på `stop` mappas till fältet `content`, som Stop-indata saknar, så README:ns exempel `pattern: .*` utlöses aldrig.
- **claude-md-management:**
  - [#2790](https://github.com/anthropics/claude-plugins-official/issues/2790): fel filnamn. Plugin säger `.claude.local.md`, dokumentationen `CLAUDE.local.md`.
  - [#2791](https://github.com/anthropics/claude-plugins-official/issues/2791): granskningen kan köra kommandon ur en främmande `CLAUDE.md`, eftersom rubriken säger "Run documented commands (mentally or actually)".
  - [#512](https://github.com/anthropics/claude-plugins-official/issues/512): `~/.claude/` är hårdkodat och `CLAUDE_CONFIG_DIR` ignoreras.
  - [#273](https://github.com/anthropics/claude-plugins-official/issues/273) och [#734](https://github.com/anthropics/claude-plugins-official/issues/734): `.claude/rules/` saknas.
  - [#2111](https://github.com/anthropics/claude-plugins-official/issues/2111): fillistan kapas tyst vid 20 och 50 filer.
  - Tipset om `#`-genvägen finns inte på minnessidan ⚠️.

## Det bästa vi kan ta
- **Analysagentens fyra signaler** (förbud, rättelse, irritation, upprepning) och undantagen (hypotes, undervisning, engångsfel som låg prioritet, smakpreferens som låg prioritet). Det blir rutan för genomgången efter en sajt, där Claude letar rättelser i Johnnys ord (`larande/genomgang.md`).
- **Formen för förslag:** fil, diff och *Why* på en rad, och inget ändras utan ja. Det är princip 9 i verktygsform.
- **`update-guidelines.md`:** lägg till kommandon, fallgropar och kopplingar som inte syns i koden. Lägg inte till det uppenbara, generella råd, engångsfixar eller långa förklaringar. Det stämmer med regeln *skulle Claude göra fel utan den?* (`guide/3-4`).
- **Varning:** rubriken belönar fullständighet med 40 poäng för kommandon och arkitektur. Den drar uppåt i radantal, mot vårt tak på 60 rader. Ta urvalsreglerna, inte poängen.
- **hookify visar en regel som fil med varning eller blockering.** Hos oss blir en upprepad rättelse en *låst kontroll* eller en hook först efter Johnnys beslut (`guide/3-4`, *Nya låsta kontroller*).

## Var det hamnar hos oss
**Senare: N2, men som mönster i `larande` och inte som plugin** (delvis i linje med förslaget). Signalerna och diffformen hör hemma i `larande/genomgang.md` nu. `guide/3-4` säger redan att verktyg som gör rättelser till regler bara får föreslå. Pluginen själva bör inte installeras ens i N2. Fyra skäl:
1. hookifys regler gäller direkt och fail open, i oversionerade `.local.md`-filer som Claude själv kan skriva eller stänga av med `enabled: false`. Det bryter mot *den som bedöms får inte ändra domaren* och mot låsning i git (`guide/3-1`).
2. Flera regeltyper utlöses aldrig eller blockerar alltid.
3. claude-md-improver läser fel global fil under `~/.claude-bygg` (#512).
4. Granskningen kan köra kommandon (#2791).

## Passar vår stack?
Det är oberoende av stacken, men hookify kräver `python3`. Med byggsessionen i `~/.claude-bygg` och avstängd synk av plugins krävs en ändring av konfigurationen för att installera, och den ändringen är Johnnys. Våra regler ska bo i `.claude/settings.json` och `.claude/hooks/`, committade och låsta (`guide/3-1`), inte i gitignorerade regelfiler.

## Risker och flaggor
- Licensuppgifterna i hookify motsäger varandra.
- Fail open: ett fel i en blockerande regel släpper igenom anropet.
- RCE-risken i #2791 när en främmande `CLAUDE.md` granskas, till exempel en kunds gamla repo.
- Om pluginen kommer från den officiella marknadsplatsen uppdateras de automatiskt.
- Krock: hookifys Stop-hook staplas med vår grind och med ralph-loop.

## Inloggning
Inget.
