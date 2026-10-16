# cloudflare

**Källa:** Cloudflares dokumentation på developers.cloudflare.com, läst 2026-10-16. Lästa sidor:
- Workers: *Rollbacks*, *Preview URLs*, *Workers Logs*, *Workers Issues*, *Cron Triggers* och *Build image* (Workers Builds)
- D1: *Time Travel* och *Migrations*
- DNS: *Full setup*
- API: *Create token* och *API token permissions*

Wrangler finns i cloudflare/workers-sdk, commit `e7f9e4e9` (2026-10-16). Underlaget från 2026-10-13 och 2026-10-14 finns i `kunskap/research/2026-10-14_cloudflare-stack.md` och `…/2026-10-15_kompetensluckor-anteckningar/lager-9-drift-forvaltning.md`.

**Licens:**
- Tjänsten har Cloudflares tjänstevillkor.
- Dokumentationen är CC BY 4.0 (cloudflare/cloudflare-docs). Den får återges med källhänvisning.
- Wrangler är Apache-2.0. Licens- och NOTICE-text följer med vid spridning av koden.

**Vad det är:** Plattformen som kundsajterna körs på: Workers med statiska tillgångar, D1, DNS, Access, Email Routing och, för varje publicerad kundsajt, Pro-planen för statistik ur serverloggarna (`BESLUT.md` 2026-10-14 och 2026-10-16).

**Hur det fungerar (det som rör driften):**
- **Versioner och rollback:**
  - Varje uppladdning blir en version.
  - `wrangler rollback` eller dashboarden skapar direkt en ny deployment med en äldre version, bland de 100 senaste.
  - Anslutna resurser ändras inte.
  - Rollback stoppas när målversionen binder en R2-bucket, KV-namnrymd eller kö som inte finns längre, eller när en Durable Object-klass ändrats.
  - Från en delad utrullning går all trafik till den valda versionen.
- **Versionsadresser:**
  - De följer `workers_dev` om `preview_urls` saknas. När de är påslagna är de publika.
  - Access kan skydda dem för en Worker eller för alla.
  - Alias skapas bara vid uppladdning, och de 1 000 senaste sparas.
  - Inga versionsadresser skapas för Workers med Durable Objects.
- **Workers Logs:**
  - Kräver `observability.enabled` i konfigurationen.
  - Free sparar i 3 dagar och tar 200 000 händelser per dygn. Paid sparar i 7 dagar och har 20 miljoner händelser i månaden, sedan 0,60 USD per miljon.
  - Ny prismodell från 1 december 2026 ⚠️ (inte läst).
- **Workers Issues:**
  - Felövervakning utan SDK: grupperar undantag, 5xx och loggade fel.
  - Slås på med `observability.issues.enabled` och Wrangler 4.134 eller senare.
  - Öppen beta och gratis under betan.
  - Upp till 50 automationer till webhook, chatt eller kodagent.
- **Cron Triggers:** körs i UTC. *Cron Events* sparar de 100 senaste körningarna. Lokalt prov med `/cdn-cgi/local/scheduled`. Free har fem triggers per konto (enligt researchen 2026-10-14).
- **D1:**
  - Time Travel är alltid på: 7 dagar på Free och 30 på Paid.
  - `time-travel restore` skriver över databasen och ger ett bokmärke för att ångra.
  - Migreringar i `migrations/` med `wrangler d1 migrations create/list/apply`. Dokumentationen beskriver ingen återställning av migreringar.
- **Workers Builds:** Node 24.18.0 och npm 10.9.2 om inget annat anges. Annan version väljs med `.node-version`, `.nvmrc` eller `NODE_VERSION`.
- **Namnserverbyte:**
  - Snabbskanningen hittar inte alla poster, så granska apex, `www`, MX, SPF, DKIM och DMARC.
  - Stäng av DNSSEC hos registratorn före bytet.
  - Bytet kan ta upp till 24 timmar.
- **Tokens:**
  - Kontoägda tokens hänger inte på en användare.
  - Behörigheterna väljs per grupp (*Read* eller *Edit*) och avgränsas till konto och zon.
  - Hemligheten visas en gång.

**Kvalitet och underhåll:**
- cloudflare/workers-sdk: 4 629 ★, 8 691 commits, cirka 691 författare i git-loggen. Senaste commit 2026-10-16, 2 256 commits sedan årsskiftet.
- Dokumentationen uppdateras löpande.
- **Kända problem:**
  - En tredjepartsrapport från augusti 2026 om att loggar saknades i Workers Observability efter deploy ⚠️ (isdown.app, inte Cloudflares statusida).
  - Ärendena i cloudflare/mcp, se det kortet.

**Det bästa vi kan ta:**
- `observability` och `issues` i varje `wrangler.jsonc`.
- Staging med Access.
- Migreringar för D1.
- `.node-version`.
- Kontoägda tokens per uppgift.
- Genomgången av zonen före namnserverbytet.
- Rollbackens gränser.

**Var det hamnar hos oss:**
- Skillen `drift`: `publicering.md`, `aterstallning.md` och `overvakning.md`.
- Grundreglerna står redan i `guide/2-8-teknik-och-kvalitet.md`.
- Mallen i `mallar/sajt/` behöver en `wrangler.jsonc` (förslag).

**Passar vår stack?** Ja, det är vår stack. Astro statiskt som Workers static assets, utan adapter. Inget behöver översättas.

**Risker och flaggor:**
- Avbrott hos Cloudflare slår ut både sajten och en vakt i Workers, så vakten ska stå hos en annan leverantör.
- Workers Issues är beta.
- Email Routing tar troligen över domänens MX ⚠️.
- Access kostar efter 50 användare (`BESLUT.md` 2026-10-16).

**Inloggning:**
- All dokumentation är publik och läst.
- Dashboarden, *Cron Events*, Workers Logs, Issues och Zone Analytics syns bara inloggad.
- Johnny behöver skapa eller bli inbjuden i kundens konto. Övningssajterna har inget konto (`BESLUT.md` 2026-10-15).
