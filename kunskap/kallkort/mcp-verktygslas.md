# MCP-verktygslås

**Källa:** läst 2026-10-16.
- **Vårt eget:** `skript/mcp-verktygslas.py` (108 rader, commit `f59a83b`, 2026-10-16 17.15), `inventering/mcp-servrar.json`, de låsta listorna i `inventering/mcp-verktyg/` (12 servrar), anropet i `skript/startsakring.sh:104–108` och utkastet `andra-varvet/skript-mcp/verktygslista.py`. Byggsessionens servrar i `~/.claude-bygg/.claude.json` (namn och argument, inga nycklar).
- **MCP-specifikationen:** https://github.com/modelcontextprotocol/modelcontextprotocol vid `86f6e0c675afea9a8f233e09b6faf566b126086c`. Lästa: `docs/specification/2025-11-25/server/tools.mdx`, `2026-07-28/changelog.mdx`, `2026-07-28/server/tools.mdx`, `2026-07-28/basic/versioning.mdx` och *Security Best Practices* för båda versionerna (`docs/docs/<version>/tutorials/security/security_best_practices.mdx`).
- **Övrigt:** [Claude Code, MCP](https://code.claude.com/docs/en/mcp) och [permissions](https://code.claude.com/docs/en/permissions); Invariant Labs, [Tool Poisoning Attacks](https://invariantlabs.ai/blog/mcp-security-notification-tool-poisoning-attacks) (2025-04-01). Jämförbara verktyg, bara README: snyk/agent-scan (`3550263f64f5e0b3717486c11a246b601a88bc21`) och Paraphern/rugsnare (`3b93d9563638ef6b5ea24412e40bb2a51d178731`, 3 stjärnor).
- ⚠️ Inte läst: rugsnares granskning av npm-servrarna. Skriptet är inte kört av mig.

**Licens:** eget skript, inga villkor. MCP-specifikationen är Apache-2.0 för nya bidrag och MIT för äldre, och dokumentationen CC-BY-4.0 (`LICENSE`). Vi citerar kort och sprider inget.

## Vad det är
En kontroll i startsäkringen (beslut "kontroll", Johnny 17.40). Den läser varje MCP-servers verktygslista och instruktioner, sparar dem och rapporterar ändringar som Johnny ser innan servern används. Den ersätter *låst version*, som krockade med *alltid senaste* (`BESLUT.md` 2026-10-16, *Senaste version med verktygslås …*).

## Hur det fungerar
- Skriptet skickar `initialize` (protokoll 2025-06-18), `notifications/initialized` och `tools/list` till varje post i `mcp-servrar.json`, över HTTP (30 sekunders gräns) eller stdio.
- Per verktyg sparas namn, beskrivning, indataschema och annoteringar. Serverns instruktioner sparas också, i `inventering/mcp-verktyg/<namn>.json`.
- Nästa körning jämför med låsningen: nytt eller borttaget verktyg, ny beskrivning, nya parametrar, nya annoteringar och nya instruktioner. En ändring skrivs med ⚠️, och startsäkringen samlar varningarna. `--uppdatera` godtar alla nya listor på en gång.
- Poster med `"inloggning": true` hoppas över.

## Varför – källorna
- **En server kan byta verktyg utan ny version.** Specifikationen har `notifications/tools/list_changed` (2025-11-25, `server/tools.mdx`, *List Changed Notification*). Claude Code hämtar då den nya listan, *"so you don't need to reconnect it"*, och det gäller också prompter och resurser (Claude Code, MCP).
- **Annoteringar är inte att lita på:** *"clients MUST consider tool annotations to be untrusted unless they come from trusted servers"* (`server/tools.mdx` rad 213–214; samma i 2026-07-28). Appar bör också *"Provide UI that makes clear which tools are being exposed to the AI model"* (rad 27–30).
- **Rug pull:** Invariant Labs: *"a malicious server can change the tool description after the client has already approved it"*, med rådet *"Clients should pin the version of the MCP server and its tools"* och en hash.
- Specifikationen är en norm och Invariant Labs en oberoende källa, så kontrollen uppfyller guidens krav för en låst kontroll (*härlett*, `guide/README.md`, *Grind eller instruktion*). Den rapporterar och stoppar inget (*Inga spärrar*, `BESLUT.md` 2026-10-15).
- I praktiken skrev BrowserStacks server om 17 beskrivningar och lade till fem verktyg mellan 1.4.1 och 2.2.1, utan att utgåvan sa det, enligt en extern granskare ([#476](https://github.com/browserstack/mcp-server/issues/476)).

## Kvalitet och underhåll
Nytt i dag: 12 servrar är låsta, och inga ändringar är rapporterade än. Fynd vid läsningen, inga rättade:
1. **Servrar med inloggning låses aldrig.** `las()` hoppar över alla poster med `inloggning`, och skriptet har inget läge för token eller nyckel. Ändå skriver det *"låses vid första körningen med token"*, och `LAGE.md` (steg 1) säger *"Kör verktygslåset efter inloggningarna … (låser de nya; rapporterar ändringar)"*. Nio servrar blir olåsta: Figma, Cloudflare, Mobbin, 21st, DataForSEO, Grounding Lite, Google Developer Knowledge, nanobanana och BrowserStack. Startsäkringen filtrerar dessutom bort de raderna (`grep -v 'kräver inloggning'`), så Johnny ser inte att de saknas. Socket låstes utan inloggning; om listan blir en annan efter OAuth ser låset det inte ⚠️.
2. **stdio har ingen tidsgräns.** `vanta()` läser rad för rad utan timeout. En server som aldrig svarar stoppar startsäkringen.
3. **Bara verktyg och instruktioner.** Prompter och resurser låses inte, fast Claude Code hämtar om dem också. `outputSchema`, `title` och `_meta` jämförs inte.
4. **Bara vid start.** Ändringar under sessionen syns inte, till exempel WebMCP-verktygen i Playwright MCP (→ `playwright-mcp.md`). Låset ser heller inte vad verktygens *svar* innehåller: i Context7 lade leverantören själv in en uppmaning till agenten i svaren från `query-docs` (→ `context7.md`, ärende #2673).
5. **Specifikationen har gått vidare.** Version 2026-07-28 (utgiven 2026-07-28) tar bort `initialize` och `Mcp-Session-Id` och inför `server/discover`. En server som bara talar den nya versionen avvisar skriptets handskakning (`versioning.mdx`: äldre klient mot ny server *"Fails"*). Skriptet skriver då *"gick inte att läsa"*, så felet syns. Men skriptet behöver `server/discover` när den första servern byter.
6. **Listan finns på två ställen,** `mcp-servrar.json` och `~/.claude-bygg/.claude.json`, och de skiljer sig redan: BrowserStack står i listan men är inte tillagd.
7. **Ny kod körs före granskningen.** Stdio-servrarna startas med `@latest`, så den nya versionen körs innan Johnny har sett ändringen. Låset jämför men skannar inget, medan bilaga A säger *"En uppdatering skannas som en ny installation"*.

## Det bästa vi kan ta
- rugsnare graderar fynden: BREAKING (parametrar), COSMETIC (beskrivningar) och NEW (verktyg). Samma tredelning i rapporten gör Johnnys granskning snabbare.
- agent-scan söker promptinjektion i beskrivningarna, men skickar *"tool names and descriptions"* till Snyks API och kräver konto (`README.md`, *Analysis and Validation*). Inte för oss nu.

## Var det hamnar hos oss
**Håller med beslutet "kontroll"**, som rapport och inte som grind. Det står redan i `guide/bilaga-a-verktyg.md:29` och `:255`, `guide/2-9-drift-och-forvaltning.md:96` och `:100`, `.claude/skills/drift/verktyg.md:27` och `guide/bilaga-f-projektstruktur.md:29`. Det saknas i `guide/bilaga-c-kontroller.md`. Förslag: en rad där, och punkterna 1, 2 och 5 rättas i skriptet.
- **Provet mot övningssajten:** efter inloggningarna ska körningen ge en rad per server i `mcp-servrar.json` – låst, oförändrad eller ändrad – och ingen tyst överhoppning. Felprovet: ändra en beskrivning i en kopia av en låst fil. Skriptet ska då rapportera *ny beskrivning* (felbanken, `BESLUT.md` 2026-10-16, *Kompetensinventeringen görs klar*).

## Passar vår stack?
Ja. Python med bara standardbiblioteket, kört med `-I` från repots rot.

## Risker och flaggor
- **Källan i bilaga A är fel vald.** `bilaga-a-verktyg.md:29` och skriptets huvud (rad 2–3) hänvisar till *Security Best Practices* för att en server kan ändra sina verktyg utan ny version. Den sidan nämner `list_changed` bara under *Session Hijacking*, där en angripare kan ge klienten verktyg den inte visste om. Länken leder dessutom vidare till `docs/2025-11-25/tutorials/…`, en handledning och inte själva specifikationen. Bättre källor: `server/tools.mdx`, Claude Code, MCP, och Invariant Labs.
- Låsfilerna är publika i repot. De innehåller bara serverns egna texter. Nycklar får aldrig stå i `huvud` i `mcp-servrar.json`.
- `--uppdatera` godtar ändringarna för alla servrar på en gång.

## Inloggning
Inget för skriptet. Servrar med OAuth eller nyckel kräver ett läge som läser token eller nyckel utanför repot, till exempel ur `~/.claude-bygg/.claude.json`, utan att skriva ut den. Mobbin är en claude.ai-connector och kan inte nås av skriptet alls ⚠️.
