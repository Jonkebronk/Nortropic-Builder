# ruflo (tidigare claude-flow)

**Källa:** https://github.com/ruvnet/ruflo (den gamla adressen `ruvnet/claude-flow` ger samma repo, id 995029641), npm `ruflo` och `claude-flow` 3.56.10 (2026-10-14), källkoden på `main` 2026-10-16. Hela utvärderingen med 44 källor: `kunskap/research/2026-10-16_ruflo.md`.
**Licens:** MIT. Vi sprider ingenting.

## Vad det är
rUv:s (`ruvnet`) lager över Claude Code och Codex för agentorkestrering: svärmar med topologier, vektorminne (AgentDB), hooks, en MCP-server med över 300 verktyg, kopierade skills, agenter och kommandon, en bakgrundsdemon och en terminalkonsol. Namnbytet från Claude Flow skedde i 3.5.0 (2026-02-27, ändringsloggen).

## Hur det fungerar
- Agenterna utförs av Claude Codes egna delagenter eller teammates; ruflos MCP-verktyg samordnar och registrerar (ruflos egen `CLAUDE.md`).
- `init` skriver `.claude/settings.json` (elva sorters hooks, agent teams på, `permissions.allow` och `deny`), `.mcp.json` med `ruflo@latest`, projektets `CLAUDE.md`, och ett block i `$HOME/.claude/CLAUDE.md` om inte `--no-global` ges.
- Hooken vid varje prompt lägger "[INTELLIGENCE]"-förslag i kontexten och kan läsa andra projekts `MEMORY.md` under `~/.claude/projects`.
- Pluginvägen ("lite") skriver inga filer men registrerar nio hooks som hämtar `ruflo@latest` med `npx --yes`.

## Kvalitet och underhåll
75 574 ★, 46 bidragsgivare men cirka 94 % av bidragen från en person, 695 öppna ärenden, 15 versioner på nio dagar (GitHubs API och npm 2026-10-16). Dokumentationen säger emot sig själv om antalet verktyg och agenter. Ett dolt preinstall-skript fanns fram till 3.5.x (ärendena #1261 och #1375). `SECURITY.md` gäller bara 3.5.x.

## Det bästa vi kan ta
Idén, inte verktyget: en levande överblick av det som körs och vad det kostar, efter *våra* lager och steg (`guide/3-5-live-visning.md`, *Utan mods*: statusrad eller lokal HTML-sida ur `progress.md`). Förslag till Johnny.

## Var det hamnar hos oss
Ingenstans som installation (förslaget är *släpp*). Det berör tidigast N4 (parallella byggen och flottor, `guide/3-1`).

## Passar vår stack?
Nej. Det bryter N1 (inga hooks, granskaren enda delagent), avgränsningen med `~/.claude-bygg` (skriver via `HOME`, läser webb-pros gamla minne), regeln om MCP-servrar i lokal scope och aldrig i `.mcp.json`, *Inga spärrar* (deny-regler) och att lärdomar blir förslag (`guide/3-4`).

## Risker och flaggor
Text riktad till modellen i den globala `CLAUDE.md` och i varje prompt; reklam för Cognitums sponsrade kapacitet när gränsen hos Claude är nådd; `@latest` utan låsning vid körning, förbi verktygslåset; agent teams kan bryta granskarens rena kontext; öppet säkerhetsärende #4226 (HTTP-bryggan utan autentisering).
