# vale-cli/agent-tools

**Källa:** https://github.com/vale-cli/agent-tools, commit `5e8704f5c0` (2026-09-03), pluginversion 0.1.0. Lästa filer: `README.md`, `LICENSE`, `.claude-plugin/plugin.json`, `.claude-plugin/marketplace.json`, `.mcp.json`, `hooks/hooks.json`, `hooks/vale-edit.sh` (hela), `hooks/vale-hook.tmpl` och alla fem `skills/*/SKILL.md` (setup, fix, triage, vocab, ci). Också Vales egna sidor `guides/agents` och `guides/mcp`. Läst 2026-10-16. Inget installerat.

**Licens:** MIT, © 2016 Joseph Kato. Kräver licenstexten vid kopiering. Skriver vi en egen hook efter samma idé utan att kopiera koden slår kravet inte till.

**Vad det är:** Ett Claude Code-plugin från Vales upphovsman med tre delar: fem skills som kör Vale-CLI:t, en hook som lintar varje fil Claude skriver, och en koppling till Vale CMS MCP-server. Skills och hook är gratis; MCP-servern kräver betalt konto.

**Hur det fungerar:**
- **Hooken** (`hooks.json`): `PostToolUse` på `Edit|Write` kör `vale-edit.sh`. Skriptet läser `file_path` ur JSON med sed, går bara vidare för `.md`, `.mdx`, `.markdown`, `.adoc`, `.rst`, `.org` och `.txt`, letar uppåt efter `.vale.ini`, kör `vale --no-exit --output=<mall>` från den katalogen och lämnar tillbaka larmen som `additionalContext`. Tyst om Vale, konfiguration eller larm saknas. Som standard bara `error`; `level` i pluginet eller `VALE_HOOK_LEVEL` vidgar till `warning` eller `suggestion`. Slutraden: *"Do not disable a rule to clear one."*
- **Skills:**
  - `setup` installerar (brew, choco eller binär), skriver `.vale.ini` och kör `vale sync`.
  - `fix` rättar bara `error`, en gren och en PR per fil.
  - `triage` räknar larm per regel och delar dem i rätta, sänk eller stäng av med motivering.
  - `vocab` lägger namn i `accept.txt` i stället för att stänga av stavningen.
  - `ci` handlar om GitHub Actions, pre-commit och `--no-global`; bara `error` stoppar.
- **MCP** (`.mcp.json`): `https://api.vale.sh/mcp`, med verktyg som `test_rule`, `stress_rule` (genererar nästan-träffar och visar falsklarm) och `diff_rule`. Utan abonnemang svarar den 401.

**Kvalitet och underhåll:** 6 stjärnor, 1 fork, 1 bidragsgivare, inga ärenden, senaste commit 2026-09-03, version 0.1.0 – nytt och lite prövat. Hooken är noga skriven (POSIX sh, testad mot sh, bash, zsh och dash enligt README; JSON-escaping med awk). Inga kända problem hittade i repot; Vale-ärendet #1199 (`%s` i `occurrence`) gäller även här.

**Det bästa vi kan ta:**
- Hookens idé: lint efter varje Write/Edit, återkoppling i samma tur, nivåfilter och tystnad när inget finns. Dessutom att Vale körs från konfigurationens katalog, så att sökvägsglobbar matchar.
- `triage`-skillens tabell (rätta / sänk / stäng av med motivering) och `fix`-skillens regler: rätta bara `error`, ändra aldrig betydelsen, stäng aldrig av en regel för att få grönt.
- `vocab`-skillens regel: lägg aldrig ett felstavat ord i `accept.txt`, och läs listan innan något läggs till.

**Var det hamnar hos oss:** Senare (N2): hooken prövas när stilen finns, och MCP-delen tas inte. **Provet talar delvis emot att ta hooken som den är:** den hoppar över `.ts` och `.html`, där våra texter ligger (`src/innehall/*.ts`, `dist/`), så den skulle vara tyst. Dessutom släpper den som standard bara igenom `error`, och Nortropic-sv har inga `error`-regler förrän en regel är mätt. Förslag: en egen hook efter samma mönster som tar `.ts` (med Viewen `Innehall`) på nivån `warning`.

**Passar vår stack?** Inte utan anpassning:
- Filtyper: se ovan; `.astro` stöds inte heller.
- `vocab`- och `fix`-skillen utgår från `Vale.Spelling` (engelska). Hos oss heter regeln `Nortropic-sv.Stavning`, och `Vale` får inte stå i `BasedOnStyles`.
- `setup` föreslår Microsoft- eller Google-stilen och `brew install` – engelska stilar och global installation, som inte passar oss.

**Risker och flaggor:**
- MCP-delen är betald (Vale CMS Pro eller Site, en månads provperiod) och kräver inloggning – tas inte.
- Hooken kräver `vale` i PATH och skickar inget över nätet; MCP-servern skickar regler och text till `api.vale.sh`.
- Pluginet installerar alla tre delarna tillsammans. Vill vi bara ha hooken är en egen hook i projektets inställningar renare än pluginet (MCP-posten skulle annars ligga kvar och svara 401).
- Ett plugin lägger till skills och en hook i sessionen. Om det får installeras avgörs enligt `guide/3-3-sakerhet-och-installningar.md` ⚠️ (filen inte läst i detta uppdrag).
