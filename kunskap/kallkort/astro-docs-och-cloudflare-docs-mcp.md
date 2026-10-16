# Astro Docs MCP och Cloudflare Docs MCP

**Källa:** allt läst 2026-10-16.
- **Astro:** https://github.com/withastro/docs-mcp, HEAD `aa08802b05a85cadaa53875f98b592a3baed14e6` (2025-10-25, `git ls-remote`). Lästa i sin helhet: `README.md`, `package.json`, `deno.json`, `netlify.toml` och `netlify/edge-functions/mcp-server.ts`. Hela git-historiken (20 commits) och alla 16 ärenden och PR:er, med kommentarer i #4. Svarshuvuden och certifikat för `mcp.docs.astro.build`, och `docs.astro.build/llms.txt` med tre varianter.
- **Cloudflare:** https://github.com/cloudflare/mcp-server-cloudflare, HEAD `e4cf085520ea7286af77abf938d645c610ef1580` (2026-10-08). Lästa: root-`README.md`, `apps/docs-ai-search/` (`README.md`, `CHANGELOG.md` 0.4.8–0.4.13, `package.json`, `wrangler.jsonc`, `src/docs-ai-search.app.ts`) och `packages/mcp-common/src/shared-tools/docs-ai-search.tools.ts`. Om mätningen: `registration-context.ts:150–185` och `mcp-observability/src/metrics.ts`. Ärendena #509 och #521. `developers.cloudflare.com/llms.txt`, `llms-full.txt` och en sidas `index.md`, som alla svarar 200.
- De låsta verktygslistorna `inventering/mcp-verktyg/astro-docs.json` och `cloudflare-docs.json` och byggsessionens konfiguration.
- ⚠️ Inte lästa: kapa.ai:s villkor för hur frågor sparas (deras integritetsmeddelande säger inget om det, enligt en sökning). Om den driftsatta Astro-servern kör samma kod som repot. Cloudflares loggar i Workers Logs (`observability` är på i `wrangler.jsonc`).

**Licens:** Astros repo har ingen licensfil. `package.json` säger MIT, och GitHubs API anger ingen licens. Cloudflares repo är Apache-2.0. Vi använder bara de värdade servrarna och sprider ingen kod. Innehållet i svaren är Astros dokumentation (withastro/docs, MIT) och Cloudflares dokumentation (CC BY 4.0, redan i `drift/kallor.md:21`). Vi destillerar med egna ord och länkar till källan.

## Vad det är
Två officiella, värdade servrar som söker i ramverkets och plattformens egen dokumentation, utan konto:
- **Astro Docs** (`https://mcp.docs.astro.build/mcp`), byggd av Astros kärnteam (Matt Kane) som en Netlify Edge Function.
- **Cloudflare Docs** (`https://docs.mcp.cloudflare.com/mcp`), en Worker i Cloudflares repo med domänservrar. Den listas som aktiv, inte som avvecklad, bredvid den rekommenderade API-servern `cloudflare/mcp` (README rad 9–14).

## Hur det fungerar
- **Astro: ett verktyg**, `search_astro_docs` med en parameter, `query` (`mcp-server.ts:39–53`). Frågan skickas till `api.kapa.ai/query/v1/projects/…/search/` med Astros nyckel (rad 57–73). Svaret är kapa.ai:s sökträffar som JSON, med titel, `source_url` och textstycke, alltså inga genererade svar. Ett frågeverktyg togs bort 2025-07-11: *"Remove question tool for now as it's too slow"* (commit `eb8d151`). Verktyget saknar annoteringar (`astro-docs.json`).
- **Astro och llms.txt:** `docs.astro.build/llms.txt`, `llms-small.txt` och `en/llms.txt` svarar 404. Källtexten finns däremot som MDX i `withastro/docs`, `src/content/docs/en/` (MIT, push 2026-10-16).
- **Cloudflare: två verktyg**, båda med `readOnlyHint: true`:
  - `search_cloudflare_documentation` söker i Cloudflares AI Search-index `docs-mcp-rag` och ger *"semantically similar chunks"* med url, titel och text (`docs-ai-search.tools.ts:39–79`).
  - `migrate_pages_to_workers_guide` med beskrivningen *"ALWAYS read this guide before migrating Pages projects to Workers."* Den hämtar en promptfil från `developers.cloudflare.com/workers/prompts/pages-to-workers.txt` (rad 83–116).
- **Data:**
  - **Astro:** frågetexten passerar Cloudflare (svarshuvudena `server: cloudflare` och `cf-ray`), Netlify (`x-nf-request-id`) och kapa.ai. Det är tre parter.
  - **Cloudflare:** frågan stannar hos Cloudflare. Mätningen sparar verktygsnamn och användar-id, som saknas här, men inte frågan (`registration-context.ts:163`). Fel går till Sentry.

## Kvalitet och underhåll
- **Astro:** 66 stjärnor, 13 forkar, 10 öppna ärenden och PR:er, fyra bidragsgivare, senaste push 2025-10-25 (GitHubs API 2026-10-16). Inga commits på snart ett år, och ingen underhållare har svarat på något ärende från 2026 (#11–#15).
  - [#14](https://github.com/withastro/docs-mcp/issues/14) och [#15](https://github.com/withastro/docs-mcp/issues/15) (2026-07-05): certifikatet hade gått ut. I dag gäller ett nytt certifikat, 2026-09-12 till 2026-12-11, men ärendena är öppna.
  - [#13](https://github.com/withastro/docs-mcp/issues/13): *"Please make an llms.txt"* (öppet).
  - [#4](https://github.com/withastro/docs-mcp/issues/4): servern följde inte transporten för streamable HTTP. Rättat 2025-10-24: GET ger nu 405.
  - #7 och #8: README:s kommando för Claude Code har mellanslag i namnet, och det godtas inte. Vår konfiguration heter `astro-docs`.
- **Cloudflare:** 4 387 stjärnor, 45 bidragsgivare, 85 öppna ärenden och PR:er, push 2026-10-09. `docs-ai-search` 0.4.13, flyttad till MCP SDK v2 och statslös drift 2026-07-28 (0.4.10), och till en AI Search-bindning 2026-09-21 (#488).
  - [#521](https://github.com/cloudflare/mcp-server-cloudflare/issues/521) (öppet): inga verktyg i repot sätter `openWorldHint`, och de flesta saknar annoteringar.
  - [#509](https://github.com/cloudflare/mcp-server-cloudflare/issues/509): en annan server i repot bytte verktygsnamn utan alias. Verktyg kan alltså ändras utan förvarning, och det är det verktygslåset fångar.
  - Root-README nämner bara sökverktyget. Koden har två.

## Det bästa vi kan ta
1. **Astro saknar llms.txt, så servern kan vara den kortaste vägen till Astro 7-dokumentationen.** Den ger källänkar, så svaren går att belägga. Om kapa.ai:s index har Astro 7 är inte känt, och det visar provet ⚠️.
2. **Cloudflare har redan bra vägar utan MCP:** `llms.txt`, `llms-full.txt` och varje sida som `index.md`. Servern måste alltså slå WebFetch på riktigt för att få stanna.
3. **Facit utan server:** för Astro en sökning i `withastro/docs` (MDX, versionerat). Den är deterministisk och fungerar utan nät mot tredje part.

## Var det hamnar hos oss
**Beslut** (Johnny omkring 17.40, *"Ja på alla"*): *MCP: ta in (efter provet; behåll bara den som slår WebFetch)*. Jag håller med. Varje server jämförs mot WebFetch på sina egna frågor och bedöms för sig.
- Ingen skill eller guidefil nämner servrarna i dag (`grep` i `.claude/skills/` och `guide/`). Behålls de, hör Astro till **kvalitet** och **skelett** (`react-i-astro.md`) och Cloudflare till **drift** (`kallor.md`, `publicering.md`), som uppslag och inte som källa i sig. Källan är den sida som svaret länkar till.
- Cloudflares API-server `cloudflare/mcp` har också ett `docs`-verktyg (`kunskap/kallkort/cloudflare-mcp.md`), men den kräver inloggning. Docs-servern räcker för dokumentation.
- **Provet mot övningssajten:** fem frågor per server med facit ur dokumentationen.
  - Astro 7: Fonts API, `security.csp`, content layer, bakgrundsläget och `astro preview` i agentläge.
  - Cloudflare: `_headers` för statiska tillgångar, servicetokens i Access, D1 Time Travel, `send_email` och `preview_urls`.
  - **Nytta:** rätt svar med källänk och färre steg än WebFetch. Annars tas servern bort (`andra-varvet/mcp-jamforelse.md`, *Astro Docs och Cloudflare Docs*).

## Passar vår stack?
Ja, de täcker precis vår stack: Astro, och Cloudflare för drift, Access, e-post och D1. Ingen av dem kör något på Macen.

## Risker och flaggor
- **Kunduppgifter står aldrig i en fråga.** Astros frågor går till tre parter, och kapa.ai:s villkor är okända ⚠️.
- **Astros server är i praktiken utan underhåll** sedan oktober 2025, och certifikatet har gått ut en gång. Inget får hänga på den.
- **Styrande verktygstext:** Cloudflares *"ALWAYS read this guide"* är harmlös för oss, eftersom vi inte flyttar Pages-projekt. Den är ändå en instruktion från tredje part och följs bara när uppgiften gäller just det.
- **Astros verktyg saknar annoteringar**, så klienten kan inte se att det bara läser.
- Ingen telemetri på vår sida, ingen betalvägg.

## Inloggning
Inget för någon av dem: inget konto, ingen nyckel och ingen OAuth (Cloudflare-README: *"This server does not require OAuth"*). I byggsessionen ligger båda i lokal scope (`~/.claude-bygg/.claude.json`, under repots sökväg) som `http`: `astro-docs` → `https://mcp.docs.astro.build/mcp` och `cloudflare-docs` → `https://docs.mcp.cloudflare.com/mcp`. Verktygslistorna är låsta i `inventering/mcp-verktyg/`. Johnny behöver inte göra något.
