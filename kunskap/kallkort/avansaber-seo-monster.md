# avansaber/seo-monster

**Källa:**
- https://github.com/avansaber/seo-monster, HEAD `6b727c1` (2026-09-01), tagg `v0.9.3`. Läst 2026-10-16: hela `README.md` (52 kB), commit-historiken och ärendelistan.
- Jämfört med https://github.com/AminForou/mcp-gsc, HEAD `d49eea9` (2026-09-15), version 0.4.1 enligt README.

**Licens:** MIT, enligt README-märket och GitHubs metadata. Upphovsrätts- och licenstexten följer med vid kopiering.

**Vad det är:** En MCP-server i Python med 70 verktyg för Search Console, GA4, PageSpeed och CrUX, Cloudflare, IndexNow, AI-citat, sökordsförslag och teknisk SEO. Alla verktyg ger samma JSON-kuvert. `gsc_portfolio_summary` ger en rad per egendom och en summering för hela portföljen, för byråer med många sajter.

**Hur det fungerar:**
- **Autentisering:**
  - Google-samtycket körs en gång från terminalen (`uvx --from seo-monster seo-monster auth`) och sparas som `token.json` med rättigheten 0600.
  - Cloudflare-token och IndexNow-nyckel ligger i operativsystemets nyckelring.
  - Vägen med tjänstekonto är dokumenterad men *"not independently validated against a live Cloud project"*.
- **Scope:**
  - Standardsamtycket begär `webmasters` (skriv), `indexing` och `analytics.readonly`.
  - Med bara `webmasters.readonly` svarar skrivverktygen `SCOPE_INSUFFICIENT`.
- **Skrivningar:**
  - Att skicka sitemap och begära indexering är **på** utan spärr.
  - Cloudflares skrivverktyg (cache, omdirigeringar, inställningar, robots.txt) ligger bakom `SEO_MCP_ALLOW_DESTRUCTIVE`, och de riskablaste kräver också en `confirm`-token.
- **Annoteringar:** varje verktyg har MCP:s `readOnlyHint` och `destructiveHint`, så att klienten kan välja vad som godkänns automatiskt.

**Kvalitet och underhåll:**
- 548 ★, 85 commits, tre författare i git-loggen. I praktiken är det en person: Nikhil Jathar.
- Skapad 2026-05-28 och alltså ungefär fyra månader gammal.
- Augusti 2026: v0.9.3 rättade att nya installationer gick sönder när MCP SDK 2 släpptes (pinnade `mcp<2`). Det var samma problem som mcp-gsc hade i juli.
- Två öppna ärenden, bland dem #12: *"word_count is ASCII-only"*. Ord med å, ä och ö kan räknas fel ⚠️ (inte prövat).

**Det bästa vi kan ta:**
- Portföljvyn för en översikt över många egendomar.
- Mönstret med spärr, `confirm`-token och annoteringar för skrivande verktyg.
- `post_deploy_verify` som idé till röktestet efter publicering. Den rensar dock cache och begär indexering, alltså skrivningar.

**Var det hamnar hos oss:**
- Beslut: **MCP: kräver konto**: ett Google Cloud-projekt med OAuth-klient och Nortropics konto som användare på varje kunds Search Console-egendom.
- Prövas en månad mot mcp-gsc när första kunden har Search Console [N3], sedan behålls en.
- Bara `webmasters.readonly`. Rapportens hämtning är ett skript mot API:t (`guide/2-9-drift-och-forvaltning.md`).
- Står i `drift/verktyg.md`.

**Passar vår stack?** Delvis. Search Console och CrUX passar. GA4 används bara för kunder med samtycke, så de verktygen används sällan. Cloudflare-verktygen dubblerar `cloudflare/mcp` och ska inte ges skrivrätt. Ingen översättning av koden behövs. Svenska texter kan påverkas av ärende #12.

**Risker och flaggor:**
- Skrivscope som standard.
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
