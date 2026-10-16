# avansaber/seo-monster

**Källa:**
- https://github.com/avansaber/seo-monster, HEAD `6b727c1` (2026-09-01), tagg `v0.9.3`. Läst 2026-10-16: hela `README.md` (52 kB), commit-historiken och ärendelistan.
- Jämfört med https://github.com/AminForou/mcp-gsc, HEAD `d49eea9` (2026-09-15), version 0.4.1 enligt README.
- Koden i paketet 0.9.3 (`auth.py`, `clients/gsc.py`, `cli.py` och promptarna) lästes i översynen 2026-10-16, och läsande verktyg prövades mot övningssajten.
- **Rättat 2026-10-16 efter översynen (`kunskap/research/2026-10-16_verktyg-och-skills-full-potential.md`):** omfången (inte läsomfång), promptarna, skrivverktygen, ärende #12 och tre fynd ur provet.

**Licens:** MIT, enligt README-märket och GitHubs metadata. Upphovsrätts- och licenstexten följer med vid kopiering.

**Vad det är:** En MCP-server i Python med 70 verktyg för Search Console, GA4, PageSpeed och CrUX, Cloudflare, IndexNow, AI-citat, sökordsförslag och teknisk SEO. Alla verktyg ger samma JSON-kuvert. `gsc_portfolio_summary` ger en rad per egendom och en summering för hela portföljen, för byråer med många sajter.

**Hur det fungerar:**
- **Autentisering:**
  - Google-samtycket körs en gång från terminalen (`uvx --from seo-monster seo-monster auth`) och sparas som `token.json` med rättigheten 0600.
  - Cloudflare-token och IndexNow-nyckel ligger i operativsystemets nyckelring.
  - Vägen med tjänstekonto är dokumenterad men *"not independently validated against a live Cloud project"*.
- **Scope:**
  - Samtycket begär alltid `webmasters` (skriv), `indexing` och `analytics.readonly`. `auth.py` rad 23 sätter `DEFAULT_SCOPES` till de tre, `required_scopes()` returnerar alltid hela uppsättningen, `clients/gsc.py` kräver dem och `cli.py` begär dem.
  - **0.9.3 klarar sig alltså inte med `webmasters.readonly`.** README:s väg med bara läsomfång gäller inte längre, och kortet sade tidigare att den gjorde det. Det är bredare än mcp-gsc, som bara begär `webmasters`. ⚠️ Läst i koden, inte prövat med en token.
- **Skrivningar:**
  - `gsc_submit_sitemap`, `gsc_request_indexing` och `indexnow_*` skriver utan spärr.
  - `gsc_request_indexing` använder Googles Indexing API, som Google begränsar till sidor med `JobPosting` eller `BroadcastEvent`: *"The Indexing API can only be used to crawl pages with either JobPosting or BroadcastEvent embedded in a VideoObject."* (📄 [Indexing API, Quickstart](https://developers.google.com/search/apis/indexing-api/v3/quickstart), läst 2026-10-16).
  - `SEO_MCP_ALLOW_DESTRUCTIVE` spärrar alla skrivande `cf_*` (cache, omdirigeringar, inställningar, robots.txt), och de riskablaste kräver också en `confirm`-token.
- **13 promptar** som verktygslåset inte ser, eftersom det bara läser verktygslistan:
  - `technical_seo_audit`
  - `pre_deploy_check`, som slutar *"Otherwise approve the deploy"*
  - `structured_data_audit`
  - `migration_check`, som är en prompt och inte ett verktyg
  - `post_deploy_verify`, som skriver i tre steg
  - `weekly_review`
  - `seo_setup_audit`
  - `content_audit`
  - fem för innehåll, där `content_workflow` begär indexering.
- **Annoteringar:** varje verktyg har MCP:s `readOnlyHint` och `destructiveHint`, så att klienten kan välja vad som godkänns automatiskt.

**Kvalitet och underhåll:**
- 548 ★, 85 commits, tre författare i git-loggen. I praktiken är det en person: Nikhil Jathar.
- Skapad 2026-05-28 och alltså ungefär fyra månader gammal.
- Augusti 2026: v0.9.3 rättade att nya installationer gick sönder när MCP SDK 2 släpptes (pinnade `mcp<2`). Det var samma problem som mcp-gsc hade i juli.
- Två öppna ärenden, bland dem #12, som nu heter *"every non-Latin page is reported as render-blind and keyword-stuffed"* (tidigare *"word_count is ASCII-only"*). Provet 2026-10-16 bekräftade att "och" flaggades.
- Fynd i översynen 2026-10-16:
  - `validate_schema` ger `unknown_type` för `MedicalOrganization`, `MedicalClinic` och `WebSite`.
  - `redirect_chain_audit` flaggar inte 302 och 307.
  - Verktyget följer canonical och sitemap. Kör det därför aldrig mot en lokal förhandsvisning vars canonical och sitemap pekar på en riktig domän.

**Det bästa vi kan ta:**
- Portföljvyn för en översikt över många egendomar.
- Mönstret med spärr, `confirm`-token och annoteringar för skrivande verktyg.
- `post_deploy_verify` som idé till röktestet efter publicering. Den är en prompt och skriver i tre steg, bland annat rensar den cache och begär indexering.

**Var det hamnar hos oss:**
- Beslut: **MCP: kräver konto**: ett Google Cloud-projekt med OAuth-klient och Nortropics konto som användare på varje kunds Search Console-egendom.
- Prövas en månad mot mcp-gsc när första kunden har Search Console [N3], sedan behålls en.
- Planen sade bara `webmasters.readonly`. Det går inte med 0.9.3, som alltid begär `webmasters`, `indexing` och `analytics.readonly` (se *Scope*). Minsta behörighet går alltså inte att få med någon av de två servrarna. Rapportens hämtning är ett skript mot API:t (`guide/2-9-drift-och-forvaltning.md`).
- Står i `drift/verktyg.md`.

**Passar vår stack?** Delvis. Search Console och CrUX passar. GA4 används bara för kunder med samtycke, så de verktygen används sällan. Cloudflare-verktygen dubblerar `cloudflare/mcp` och ska inte ges skrivrätt. Ingen översättning av koden behövs. Svenska texter påverkas av ärende #12 (bekräftat i provet).

**Risker och flaggor:**
- Skrivscope alltid, också för den som bara vill läsa (se *Scope*).
- Skrivverktyg utan spärr: `gsc_submit_sitemap`, `gsc_request_indexing` och `indexnow_*`.
- Promptarna syns inte för verktygslåset och innehåller text riktad till agenten (*"Otherwise approve the deploy"*).
- Följer canonical och sitemap till den riktiga domänen när den körs mot en lokal förhandsvisning.
- En underhållare.
- Ung kodbas.
- OAuth-token med lång livslängd på disken.
- Brott vid ändringar i beroenden, så versionen låses.
- mcp-gsc kräver *Full access* för tjänstekontot och marknadsför en hostad betaltjänst i README.
- Två GSC-MCP:er samtidigt ger bara brus.

**Inloggning:**
- Repo och README är publika och lästa.
- Användning kräver Google-inloggning med åtkomst till kundens Search Console.
- Johnny skapar OAuth-klienten och gör samtycket.
