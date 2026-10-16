# Socket MCP

**Källa:** https://github.com/SocketDev/socket-mcp, commit `3f72bfcc2b4e4527bc8df98688def8e73ce00122` (2026-10-13, HEAD 2026-10-16), npm `@socketsecurity/mcp` 0.2.1 (2026-09-17). Lästa: `README.md`, `CHANGELOG.md`, `docs/service.md` (hela), `docs/commands.md` (hooken), `lib/tool-depscore.mts`, `lib/user-agent.mts` och `lib/server.mts` (User-Agent), grep efter telemetri i `lib/`. Ärendena #185, #186 och #223 med kommentarer. [socket.dev/pricing](https://socket.dev/pricing) (Free-planen). Verktygslistan i `inventering/mcp-verktyg/socket.json` (läst utan inloggning av verktygslåset). Underlag: `andra-varvet/mcp-jamforelse.md`, *Socket MCP*. Allt läst 2026-10-16.
⚠️ Inte läst: Socket API:s och den värdade tjänstens villkor och integritetspolicy (hur länge frågor och granskningsloggar sparas), Anthropics katalog (att servern finns där kommer från andra varvet).
**Licens:** MIT (`LICENSE`, © 2025 Socket Inc). Kräver bara att licenstexten följer med om koden sprids. Vi kör den värdade tjänsten och sprider inget.

## Vad det är
Socket Securitys MCP-server för leveranskedjan. Den ger agenten poäng per paket – leveranskedja, kvalitet, underhåll, sårbarheter och licens – innan paketet installeras. Den värdade servern ligger på `https://mcp.socket.dev/` och loggar in med OAuth. README: *"This project is in early development and rapidly evolving."*

## Hur det fungerar
- **Sju verktyg**, alla med `readOnlyHint: true` (verktygslåset 2026-10-16): `depscore`, `package_files`, `package_file_contents`, `package_file_grep`, `organizations`, `alerts` och `threat_feed`.
- **`depscore`** tar en lista med paket (ekosystem, namn, version) och svarar med poäng och en länk till Socket-rapporten. Anropet går till `api.socket.dev/v0/purl?alerts=false` (`lib/tool-depscore.mts:36`), alltså **utan skälen** till en låg poäng (#186).
- **`package_files` och grep-verktygen** visar vad ett paket faktiskt levererar, fil för fil, innan det installeras. Det är det närmaste vi kommer en läsning av koden utan att ladda ner den.
- **Verktygsbeskrivningen styr agenten:** `depscore` säger *"Stop generating code and ask the user how to proceed when any of the scores are low"*. Det är en instruktion från servern, inte vår regel.
- **Autentisering** (`docs/service.md:164–172`): enligt dokumentationen kräver den värdade servern en OAuth-token på varje anrop, men verktygslåset kunde läsa `tools/list` utan. Själv-hostad stdio läser `SOCKET_API_TOKEN` ur miljön.
- **Data som lämnar Macen:** paketnamn, versioner och plattform, ingen kod. Sedan 0.1.0 skickas också klientens User-Agent vidare till Socket (*"forward MCP client identity to Socket API"*, `CHANGELOG.md`; `lib/server.mts:293–297`). Varje anrop ger en granskningspost (`docs/service.md:234–236`); på den värdade servern hamnar den hos Socket.
- **Valfri hook för Claude Code** (`docs/commands.md`): stoppar `npm install` och liknande när `supplyChain < 20`. Den släpper igenom vid fel (*"fail open"*) och ser inte transitiva beroenden eller installation ur en redan ändrad `package.json`.

## Kvalitet och underhåll
- 139 ★, 46 forkar, 16 bidragsgivare, skapad 2025-05-19, senaste push 2026-10-14, 7 öppna (3 ärenden, 4 PR) (GitHubs API 2026-10-16). Fem npm-versioner sedan 2026-06-15; den senaste, 0.2.1, kom 2026-09-17.
- **Kända problem:**
  - [#185](https://github.com/SocketDev/socket-mcp/issues/185) (öppet sedan 2026-06-10, återöppnat): den värdade servern avvisar nyss utfärdade OAuth-token med `401 invalid_token` i **Claude Code**. Underhållaren återöppnade den 2026-06-13 efter en ren återgivning; inga kommentarer sedan dess.
  - [#223](https://github.com/SocketDev/socket-mcp/issues/223) (öppet 2026-10-14): registreringen av klienten (DCR) misslyckas i Claude Desktop.
  - [#186](https://github.com/SocketDev/socket-mcp/issues/186): poängen kommer utan skäl, och agenten får 403 när den försöker läsa skälen på socket.dev.

## Det bästa vi kan ta
1. **`depscore` före varje nytt paket**, särskilt React-, Motion- och komponentberoenden. Det täcker lucka 8.4 (`kunskap/research/2026-10-16_luckor-per-lager.md`), där Socket redan nämns som verktyg att pröva.
2. **`package_files` före ett komponentpaket:** se om paketet har installationsskript eller oväntade filer, som ett komplement till `npm view <paket> scripts` i intagslistan (`kunskap/research/2026-10-16_react-och-javascript-i-astro.md` §11, steg 3).
3. **En låg poäng är en fråga, ingen dom.** Skälet saknas i svaret (#186), så Johnny läser rapporten på socket.dev innan paketet stryks.

## Var det hamnar hos oss
**Beslut (Johnny 2026-10-16 omkring 17.40, *"Ja på alla"*):** *MCP: kräver konto (Socket Free via OAuth)*. Håller med. Socket nämns ännu inte i någon skill eller i guiden utanför MCP-listan.
- **Förslag efter provet:** en rad i intagslistan i `.claude/skills/skelett/react-i-astro.md` (via researchen §11, steg 3) och i `.claude/skills/drift/andringar.md`: *depscore och package_files före ett nytt paket; en låg poäng går till Johnny med Socket-rapporten.*
- **Hooken tas inte in nu:** guiden har *Inga hooks* i N1 (`guide/3-3-sakerhet-och-installningar.md`, rad 9). Den kan prövas med skyddshooken i N2, i projektets `.claude/settings.json` (samma fil, rad 44) – inte i `~/.claude/settings.json` som `docs/commands.md` visar.
- **Provet mot övningssajten:** `depscore` på alla beroenden i `bibliotek/package.json` (8), `skript/package.json` (6) och övningssajtens `package.json` (12), plus kandidaterna `motion`, `@base-ui/react`, `react-aria-components` och `@tailwindcss/vite`. Jämför med `npm audit` i samma kataloger. **Nytta:** minst en varning som `npm audit` inte ger, eller ett paket vars filer (`package_files`) visar något vi inte visste. **Annars:** servern används bara före nya paket. Provet visar också om inloggningen fungerar alls (#185).

## Passar vår stack?
Ja. Den rör inte sajterna och läser bara npm-namn. Den fungerar lika för Astro, React och Tailwind och för skriptens beroenden.

## Risker och flaggor
- **Inloggningen kan fallera i Claude Code** (#185). Fallbacken är den själv-hostade stdio-servern med `SOCKET_API_TOKEN`, en hemlighet som Johnny lägger in själv.
- **Betalvägg:** Free har MCP, 1 000 skanningar i månaden, 500 API-anrop i timmen och en API-token (prissidan, 2026-10-16). Villkor för kommersiellt bruk står inte på prissidan ⚠️.
- **Telemetri:** User-Agent och varje anrop (paketnamn) loggas hos Socket. Ingen kod och inga kunduppgifter lämnar Macen, så länge frågan bara innehåller paketnamn.
- **Styrande text:** `depscore`-beskrivningen säger åt agenten att sluta generera kod. Verktygslåset ser om texten ändras.
- **Krock:** inga med `BESLUT.md`. "Alltid senaste" (2026-10-15) gäller oförändrat; Socket ger poäng men beslutar ingen karenstid.

## Inloggning
- **Krävs:** ett Socket-konto på Free-planen. Johnny loggar in med OAuth via `/mcp` → *Authenticate* i byggsessionen. Ingen nyckel i chatten.
- **I dag:** servern `socket` ligger i lokal scope för repot (`~/.claude-bygg/.claude.json`) som `http` mot `https://mcp.socket.dev/`. Verktygslåset läste verktygslistan utan inloggning (`inventering/mcp-servrar.json` saknar `inloggning`). Om `depscore` svarar utan inloggning är inte prövat ⚠️.
- **Fungerar inte OAuth** (#185): skapa en API-token i Socket-instrumentpanelen och kör servern själv-hostad (`docs/service.md`). Johnny lägger in token i ett eget terminalfönster.
