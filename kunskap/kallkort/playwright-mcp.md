# Playwright MCP

**Källa:** https://github.com/microsoft/playwright-mcp, HEAD `b8b4183e099f136cbec0388a6088d4aa2f6b9685` (2026-10-08), npm `@playwright/mcp` 0.0.83 (2026-09-28), läst 2026-10-16. Lästa: `README.md` vid HEAD (1 662 rader: inledningen, *Configuration*, *User profile*, *Security* och verktygslistan), utgåvorna v0.0.80–v0.0.83 och den öppna PR [#1793](https://github.com/microsoft/playwright-mcp/pull/1793) (v0.0.84). I microsoft/playwright vid `98891e9a781b696c1b2281130558cf97b4119cb0`: `packages/playwright-core/src/tools/mcp/config.ts` (standardwebbläsaren). `browsers.json` i playwright-core `1.64.0-alpha-1790635538000` och `1.64.1` (jsDelivr), `cli.js` i paketet, npm-metadata, GitHubs API (repo, bidragsgivare, ärenden i båda repona) och den låsta verktygslistan `inventering/mcp-verktyg/playwright.json`. Playwright själv och telemetrisökningen i 0.0.83 står i `playwright.md` och upprepas inte. ⚠️ Inte läst: resten av MCP-koden i microsoft/playwright. Servern var inte körd när kortet skrevs.
**Rättat 2026-10-16 efter översynen (`kunskap/research/2026-10-16_verktyg-och-skills-full-potential.md`):** verktygen bakom `--caps`, video och spårning, `--device`, utdatakatalogen och `static` i nätverkslistan. Underlaget är paketet 0.0.83 och prov mot övningssajten 2026-10-16.
**Licens:** Apache-2.0, © Microsoft. Vi kör servern och sprider inget, så inga krav utlöses. Webbläsarna har egna licenser (→ `playwright.md`).

## Vad det är
Microsofts MCP-server som låter en agent styra en webbläsare med Playwright. Agenten läser sidan som ett tillgänglighetsträd med referenser i stället för skärmbilder. README rekommenderar CLI med skills för kodagenter, eftersom MCP drar mer kontext, men säger att MCP passar *"exploratory automation … where maintaining continuous browser context outweighs token cost concerns"*. Det är vårt fall: utforskningstestet.

## Hur det fungerar
- **25 verktyg som standard** (verktygslåset 2026-10-16, cirka 21 000 tecken beskrivning och schema): navigera, klicka, skriva, fylla formulär, `browser_snapshot`, skärmbild, konsol, nätverk, `browser_emulate_media` (färgschema, reducerad rörelse, forced-colors och kontrast, ny i 0.0.82) och `browser_run_code_unsafe`.
- **47 verktyg till med `--caps`:**
  - `devtools`: video med kapitel och markerade handlingar, spårning och inspelning
  - `testing`: `verify_*` och `generate_locator`
  - `storage` (17)
  - `network` (4)
  - `vision`
  - `pdf`
  - `config`: `get_config`.

  Alternativtabellen i README nämner bara `devtools`, `vision` och `pdf`; verktygslistan visar alla sju.
- **`--save-video` och `--save-trace` finns inte.** Video kommer via `--caps=devtools` och `browser_start_video`.
- **Webbläsare:** `--browser chrome|firefox|webkit|msedge` och `--device "iPhone 15"` eller `--mobile` (iPhone 17 i WebKit). Utan `--browser` startas **den installerade Google Chrome** (`channel: 'chrome'`, `config.ts:226–233`), inte Playwrights Chromium. **`--device` byter inte motor:** WebKit kräver `--browser webkit`, och WebKit 2368 måste vara installerad (*Passar vår stack?*).
- **Utdata** hamnar som standard i `<cwd>/.playwright-mcp`, alltså i repot, och explicita filnamn räknas från repots rot. `--output-dir` flyttar dem.
- **`browser_network_requests`** döljer lyckade statiska resurser som standard (`static: false`). Ett påstående om att en sida saknar tredje part kräver `static: true`.
- **`--isolated`** håller profilen i minnet. Utan den sparas en beständig profil under `~/Library/Caches/ms-playwright/mcp-…`.
- **WebMCP är på som standard** sedan 0.0.82. Verktyg som en sida registrerar blir egna MCP-verktyg (`webmcp_<namn>`), och klienten får `tools/list_changed` när fliken byts. Utgåvan: *"Tool names, descriptions, schemas and results come from the page, so treat them as untrusted input."* Det stängs av med `--no-webmcp`.

## Kvalitet och underhåll
- 38 232 stjärnor, 3 262 forkar och 71 bidragsgivare. Skapat 2025-03-21, senaste push 2026-10-08 (GitHubs API 2026-10-16). Koden ligger numera i microsoft/playwright. MCP-repot har utgåvorna och en öppen PR.
- En utgåva var 2–4 vecka: 0.0.78 (2026-07-09) till 0.0.83 (2026-09-28). 0.0.83 beror på en alfaversion av Playwright, `1.64.0-alpha-1790635538000` (npm). 0.0.84 är på väg, bland annat med `--redact-url-params`.
- Fem öppna ärenden med "MCP" i titeln i microsoft/playwright (sökning 2026-10-16). [#39955](https://github.com/microsoft/playwright/issues/39955): snapshoten tar med element utanför viewporten, så en agent kan "se" sidfoten utan att skrolla. [#42717](https://github.com/microsoft/playwright/issues/42717): en WebP-skärmbild över 16 383 px blir tom. Stängt: [#40862](https://github.com/microsoft/playwright/issues/40862), där felet sa att Chrome saknades när det var ffmpeg som saknades. Video kräver ffmpeg.

## Det bästa vi kan ta
1. **Utforskningstestet i WebKit och Firefox.** chrome-devtools når bara Chrome. Med Playwright MCP gör en delagent besökarens uppgifter i Safaris motor med iPhone-emulering.
2. **Video med kapitel och markerade handlingar** (`browser_video_show_actions`) gör ett fynd lätt för Johnny att döma.
3. **`browser_emulate_media` mitt i en session:** mörkt läge, reducerad rörelse och forced-colors utan omstart.

## Var det hamnar hos oss
**Håller med beslutet** "MCP: ta in (efter provet; --isolated, lokala adresser)" (Johnny 17.40). Playwright MCP nämns inte i `.claude/skills/` eller `guide/` i dag. Förslag:
- `guide/3-2-granskning-och-kalibrering.md`, *Utforskningstest* [N2]: delagenten använder Playwright MCP i WebKit med iPhone-emulering.
- `.claude/skills/kvalitet/kontroller.md`, *Verktygen*: en rad bredvid chrome-devtools-mcp för utforskning och video. Ingen grind.
- Kontrollerna stannar i `skript/kontroll.mjs`, med Playwright som bibliotek. MCP:n ersätter dem inte.
- **Provet mot övningssajten:** en delagent med ren kontext gör *"boka en tid"* och *"hitta adressen och parkeringen"* på `http://127.0.0.1:4322/`. Den kör WebKit (`--browser webkit`) med `--device "iPhone 15"` och spelar in video med kapitel (`andra-varvet/mcp-jamforelse.md`, *Playwright MCP*). Nytta: minst ett fynd som kontrollskriptet och granskaren missade. Annars släpps servern. Provet visar också att WebKit startar (nästa avsnitt) och vad en körning kostar i kontext.

## Passar vår stack?
- Ja, mot den byggda sajten lokalt. React-öar och Motion syns i trädet efter hydreringen. Använd `browser_wait_for`, inte en fast väntan.
- **Två saker ordnas före provet:**
  - Byggsessionen kör `npx -y @playwright/mcp@latest --headless --isolated`, alltså Chrome utan video. Provet kräver `--browser webkit --device "iPhone 15" --caps=devtools`, till exempel som en andra server (`playwright-webkit`) som Johnny lägger till.
  - MCP:ns Playwright-alfa kräver WebKit revision 2368 och Firefox 1553 (`browsers.json`). Macen har WebKit 2359 och 2370 men ingen Firefox (`~/Library/Caches/ms-playwright`, 2026-10-16), eftersom startsäkringen installerar webbläsarna för Playwright 1.64.1. Översynen bekräftade att WebKit 2368 behöver installeras. *Härlett:* det görs med `npx -y @playwright/mcp@latest install-browser webkit` (kommandot finns i paketets `cli.js`). Startsäkringen kan köra det efter varje uppdatering.

## Risker och flaggor
- README: *"Playwright MCP is **not** a security boundary."* Om `--allowed-origins` (betoningen borttagen): *"Important: does not serve as a security boundary and does not affect redirects."* Kör bara mot våra lokala adresser.
- **Filer i repot:** utan `--output-dir` skriver servern snapshots och skärmbilder i `.playwright-mcp/` i repot. Katalogen står i `.gitignore` sedan commit `47861f3`.
- `browser_run_code_unsafe` är på som standard och kör godtycklig kod i serverns Node-process: *"executes arbitrary JavaScript in the Playwright server process and is RCE-equivalent"*. Förslag till Johnny: deny-regeln `mcp__playwright__browser_run_code_unsafe` i byggsessionens inställningar tar bort verktyget ur kontexten (📄 [Claude Code, permissions](https://code.claude.com/docs/en/permissions)).
- WebMCP: sidans egna verktyg dyker upp mitt i sessionen och syns inte för verktygslåset (→ `mcp-verktygslas.md`). Förslag: `--no-webmcp`.
- Snapshoten med element utanför viewporten (#39955) kan ge falska fynd. Kontrollera ett fynd på video eller skärmbild innan det blir en kontroll.
- Telemetri: ingen (sökning i 0.0.83, → `playwright.md`). Ingen betalvägg.

## Inloggning
Inget. Servern är tillagd i lokal scope för repot (`npx -y @playwright/mcp@latest --headless --isolated`). Använd aldrig `--extension` eller `--user-data-dir` mot Johnnys inloggade Chrome.
