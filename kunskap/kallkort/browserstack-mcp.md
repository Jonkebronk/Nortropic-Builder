# BrowserStack MCP

**Källa:** https://github.com/browserstack/mcp-server, HEAD `9f45d870dfaff58df5f3d79a3744c39167a078b6` (2026-10-16), npm `@browserstack/mcp-server` 2.2.3 (2026-10-16), läst 2026-10-16. Lästa: `README.md` (hela, 423 rader), `llms-install.md`, `docs/TOOLS.md` (grupperna Live, Automate och Accessibility), `package.json` och i `src/`: `lib/instrumentation.ts`, `config.ts`, `lib/local.ts`, `tools/live.ts`, `tools/live-utils/start-session.ts` (tunneln) och `lib/untrusted-content.ts`. Ärendena [#383](https://github.com/browserstack/mcp-server/issues/383) och [#476](https://github.com/browserstack/mcp-server/issues/476), listan över öppna ärenden och npm-historiken. [Prissidan](https://www.browserstack.com/pricing) (de första 100 000 tecknen). BrowserStacks [sida om Playwright på riktiga iOS-enheter](https://www.browserstack.com/docs/automate/playwright/playwright-ios) bara via en sökträff. ⚠️ Inte lästa: BrowserStacks villkor, integritetspolicy och biträdesavtal, provperiodens villkor och resten av `src/tools/`.
**Licens:** AGPL-3.0-only (`package.json`). Vi kör paketet oförändrat och sprider inget. AGPL kräver källkod av den som ändrar programmet och låter andra använda det över nätverk, och det gör vi inte (tolkning, inte juridisk rådgivning). Ändra inte koden.

## Vad det är
BrowserStacks officiella MCP-server till deras moln med riktiga telefoner, surfplattor och datorer. Den startar manuella sessioner (Live), kör automatiska test (Automate, också med Playwright) och tillgänglighetsskanningar, och sköter Percy och testhantering.

## Hur det fungerar
- **Två sätt att köra:** lokalt med `npx -y @browserstack/mcp-server@latest` och användarnamn och åtkomstnyckel i miljön, eller värdat på `https://mcp.browserstack.com/mcp` med OAuth. **Bara den lokala servern når `localhost`.** För en lokal adress startar den tunneln BrowserStack Local (`start-session.ts:22–40`). Den värdade svarar *"Local URLs are not supported in this remote mcp."*
- **Fem kärnverktyg** (`listProducts`, `describeEntity`, `searchCapability`, `describeCapability` och `invokeCapability`) söker i en katalog över alla verktyg, så att listan i kontexten hålls liten. *"Anything that changes data asks for your confirmation before it runs; deletes are not exposed."* (`docs/TOOLS.md`).
- **`runBrowserLiveSession`** tar adress, OS, version, webbläsare och enhet och startar en **manuell** session. Svaret är en länk som öppnas i webbläsaren (`live.ts`). Agenten ser inte telefonen; det gör den som öppnar länken.
- **Automatiska körningar** på riktiga iPhone med Safari går via Automate och Playwright (BrowserStacks dokumentation; pressmeddelande 2025-06-12). `setupBrowserStackAutomateTests` hjälper till att koppla in deras SDK.
- Innehåll från tjänsten, som loggar och skannade sidor, lindas in som *"UNTRUSTED external data"* med en slumpad markör (`untrusted-content.ts`).

## Kvalitet och underhåll
- 155 stjärnor, 57 forkar och 24 bidragsgivare. 53 öppna ärenden och PR:ar, varav 18 ärenden. Senaste push 2026-10-16 (GitHubs API 2026-10-16). 75 stabila versioner, 12 av dem sedan 2026-09-16 (npm).
- **[#383](https://github.com/browserstack/mcp-server/issues/383) (öppet):** mobila Live-sessioner får ogiltiga länkar. "latest" väljer en betaversion av iOS ("27 Beta"), en version som saknas byts tyst mot en annan, och webbläsarnamnet skickas med gemener. Det träffar just vårt prov.
- **[#476](https://github.com/browserstack/mcp-server/issues/476) (öppet, från en extern granskare):** mellan 1.4.1 och 2.2.1 skrevs 17 verktygsbeskrivningar om, ett schema ändrades och fem verktyg tillkom, utan att utgåvan sa det. Det är det verktygslåset finns för (→ `mcp-verktygslas.md`).
- README: *"under active development and currently supports a subset of the MCP spec"*.

## Det bästa vi kan ta
Riktiga iPhone och Android i stickprovet före leverans (lucka 8.2 i `kunskap/research/2026-10-16_luckor-per-lager.md`). Det prövar Boka, Ring, Meny, hover efter tryck och knapplisten – det som emulering inte visar. Automate med Playwright kan senare köra kontrollskriptets mobilsteg på riktiga telefoner.

## Var det hamnar hos oss
- **Fältet `beslut` är inaktuellt.** Det säger "senare: N4", men Johnny valde samma minut *"BrowserStack och VoiceOver (Rekommenderas)"*: riktiga iPhone och Android prövas via BrowserStacks MCP när nyckeln finns (`BESLUT.md` 2026-10-16, *Placeringarna i inventeringen blir beslut …*). Förslag till huvudsessionen: `placering` och `beslut` blir "MCP: kräver konto (betald plan; lokal server med BrowserStack Local)". Luckfilens rad 8.2 (*"Molntjänster med riktiga enheter kräver konto (Johnny) och kommer först vid N4"*) uppdateras på samma sätt.
- I skills: stickprovet på riktiga enheter i `.claude/skills/kvalitet/prov.md` eller `kontroller.md`, som mätning och inte som kontroll. BrowserStack nämns inte där i dag.
- **Provet mot övningssajten:** förhandsvisningen körs på `http://127.0.0.1:4322/`. Claude startar en Live-session på en iPhone med Safari och en uttryckligen angiven iOS-version som inte är beta, och en på en Android-telefon med Chrome. Johnny gör de fem momenten och ser resultatet. Provet ska visa att tunneln fungerar, att #383 inte stoppar mobila sessioner och vad en session kostar i minuter. Nytta: ett fynd som WebKit-emuleringen i Playwright inte gav.

## Passar vår stack?
Ja för stickprov mot den byggda sajten. Automate med Playwright kräver en dyrare plan och en ändring i `skript/kontroll.mjs`. Det blir en fråga till Johnny efter provet.

## Risker och flaggor – att hantera
- **Betalplan.** Live Desktop & Mobile kostar 39 USD i månaden vid årsbetalning. Freelancer kostar 12,50 USD i månaden vid årsbetalning eller 19 USD månadsvis, med 100 minuter Live. Automate Desktop & Mobile kostar 175 USD i månaden vid årsbetalning (prissidan 2026-10-16). Sidan länkar en provperiod men anger inga villkor ⚠️. Välj den minsta planen som räcker, utan automatisk uppgradering.
- **Telemetri utan avstängning.** Varje verktygsanrop skickar en rad till `https://api.browserstack.com/sdk/v1/event` med verktygsnamn, klient, Node-version, utfall och felmeddelande, med kontots nyckel som inloggning (`instrumentation.ts:11–90`). Sökfrågor och sammanfattningar av ändringar skickas också. Filtret tar bort det som ser ut som personuppgifter, men koden säger själv att det *"cannot strip a person's name, and says so"* (rad 22–27). Ingen växel hittades i `src/`. Skriv aldrig kunduppgifter i en fråga.
- **Sajten visas för tjänsten.** Övningssajterna *"visas bara lokalt"* (`BESLUT.md` 2026-10-15). BrowserStack Local skapar ingen publik adress: sidorna går genom en krypterad tunnel till BrowserStacks enheter. Men innehållet syns i deras moln. Johnnys val 17.40 kom efter beslutet 2026-10-15 och täcker provet (tolkning). Övningssajten har inga hemligheter. För riktiga kunder behövs ett biträdesavtal ⚖️ (bilaga E).
- **AGPL:** se *Licens*. Ingen ändring och ingen spridning.
- Tunneln hämtar ett binärprogram från BrowserStack och stänger andra BrowserStack Local-processer på Macen (`pkill -f BrowserStackLocal`, `local.ts:61–67`).
- **Verktygslåset kan inte läsa servern.** Den står med `inloggning` i `inventering/mcp-servrar.json` och hoppas över (→ `mcp-verktygslas.md`).

## Inloggning
Ett betalt BrowserStack-konto, och användarnamn och åtkomstnyckel från *Account Settings*. Johnny lägger in dem själv i ett eget terminalfönster från repots rot. Kommandot står i `LAGE.md`, steg 1: `claude mcp add browserstack -e BROWSERSTACK_USERNAME=… -e BROWSERSTACK_ACCESS_KEY=… -- npx -y @browserstack/mcp-server@latest` (lokal scope). Den värdade servern med OAuth duger inte, eftersom den inte når `localhost`. Servern är inte tillagd i byggsessionen i dag (`~/.claude-bygg/.claude.json`, läst 2026-10-16).
