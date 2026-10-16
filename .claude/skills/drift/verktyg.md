# Verktyg och MCP-servrar i driften

Urvalskriterierna står i `guide/bilaga-a-verktyg.md`. Inget här är installerat. Det som kräver konto eller nyckel väntar på Johnny (`BESLUT.md` 2026-10-16, *Kompetensen in i alla lager*). Övningssajterna har inget Cloudflare-konto och använder inga Google-API:er (`BESLUT.md` 2026-10-15). Siffror om repona är lästa 2026-10-16. Förslagen till beslut står i inventeringens fält `beslut` efter Johnnys ja.

| Verktyg | Förslag | Nivå | Behörighet och villkor | Licens | Flaggor |
|---|---|---|---|---|---|
| **Cloudflare** (Workers, DNS, Access, Pro) | Ta in: hosting är beslutad 2026-10-14 och Pro 2026-10-16 | N1 vid publicering, N3 | Kundens konto, byrån som medlem med 2FA (→ `publicering.md`) | Tjänstevillkor | Pro kostar 20 USD i månaden vid årsbetalning (`BESLUT.md` 2026-10-16) |
| **cloudflare/mcp** | MCP, kräver konto | N3 | En läs-token per kund (→ `publicering.md`, *Tokens*). Agenten får aldrig publicerings- eller DNS-token. | Apache-2.0 | Inget eget läsläge, så det är token som begränsar. IP-filtrerade tokens stöds inte. Servern levererar också Cloudflares skills, som inte ska användas i kundbygget (→ `guide/bilaga-a-verktyg.md`). 962 ★, 146 commits, senaste 2026-10-13. |
| **Renovate** (Mend-appen) med delat preset | Ta in policyn i skillen; appen vid första kundrepot | N3 | GitHub-appen installeras av Johnny | AGPL-3.0 (koden) | Den hostade appen påverkas troligen inte av AGPL ⚠️ (inget uttalande hittat) |
| **claude-code-action** med Email Routing | Senare | N4 | GitHub-app eller egen app, API-nyckel som hemlighet | MIT | 477 öppna ärenden; botar måste stå i `allowed_bots`; standardtoken startar inga flöden (→ `andringar.md`) |
| **Astro content collections** och **`wrangler rollback`** | In i skillen; schemat i biblioteket | N2–N3 | Inbyggt | MIT (Astro); Apache-2.0 (Wrangler) | Pröva att ett schemabrott stoppar bygget (→ `andringar.md`) |
| **Cloudflare Web Analytics** | Släpp | – | – | Tjänst | Ersatt av Zone Analytics på Pro (`BESLUT.md` 2026-10-16). Beaconen är JavaScript och kräver samtycke enligt `guide/2-8-teknik-och-kvalitet.md` [N3]. |
| **avansaber/seo-monster** | MCP, kräver konto (Google OAuth och Search Console per kund) | N3 | Standardsamtycket begär skrivscopen `webmasters` och `indexing`, och verktygen för att skicka sitemap och begära indexering är **på** utan spärr. Ge bara `webmasters.readonly`, så svarar skrivverktygen `SCOPE_INSUFFICIENT`. Vägen med tjänstekonto är enligt README inte prövad mot ett riktigt projekt. | MIT | Tre bidragsgivare, i praktiken en person; 548 ★. Ärende 12: ordräkningen klarar bara ASCII, vilket kan påverka svenska ⚠️. Prövas mot mcp-gsc en månad, sedan behålls en. |
| **AminForou/mcp-gsc** (jämförelse) | Prövas mot seo-monster | N3 | README kräver *Full access* för tjänstekontot, vilket krockar med regeln om läsrätt (→ `guide/2-9-drift-och-forvaltning.md`) | MIT | Version 0.4.1; spärren `GSC_ALLOW_DESTRUCTIVE` är av som standard. Hostad betaltjänst marknadsförs i README. |
| **Checkly Hobby** | Senare; förstahandsval som extern vakt och formulärtest | N3 | Konto hos Checkly | Tjänst; CLI Apache-2.0 | Gratis: 10 monitorer, var 2:a minut, 1 000 webbläsarkörningar och 10 000 API-körningar per månad, hårt tak. Data 7 dagar rå, 30 dagar aggregerad. Var datan lagras och om det finns biträdesavtal är inte kontrollerat ⚠️. |
| **UptimeFlare** | Släpp som vakt | – | Körs i Cloudflare Workers | Apache-2.0 | Samma leverantör som sajten, vilket bryter regeln om en vakt hos en annan leverantör. Saknar certifikatkontroll. Sköts av en person. CVE-2026-29779, rättat 2026-03-04. |
| **Uptime Kuma** | Senare, om byrån ändå har en server | N3 | Egen server med beständig volym | MIT | Monitor för domänutgång bara för toppdomäner med RDAP. Version 2.5.6. |
| **Plausible** eller **Umami** | Släpp | – | – | AGPL-3.0 (Plausible CE), MIT (Umami) | Javascript-mätning kräver samtycke enligt vår läsning (`guide/2-8-teknik-och-kvalitet.md`), och då finns GA4 som tillval. Omprövas om EU:s undantag för egen publikmätning antas ⚠️ (rådets text 2026-10-02). |
| **46elks** | Senare | N4 | Konto och nummer, 3 EUR i månaden ⚠️ (pris från 2026-10-13) | Tjänst | Ingen signatur på webhooken beskriven ⚠️ |
| **Pages CMS** | Senare | N4 | Hostad app med skrivrätt i kundens repo, eller egen drift med PostgreSQL | MIT | Senaste commit på huvudgrenen 2026-06-08 |
| **Changesets** | Senare | N4 | – | MIT | Version 3 under utveckling |
| **DNSControl** | Senare; zonexport för hand tills dess | N3–N4 | DNS-token med *Zone Read*, *DNS Edit* och *SSL and Certificates Edit* | MIT | 382 bidragsgivare, version 5.5.0 |
| **frappe/builder** | Bara principerna, in i skillen | – | – | MIT | Frappe-stacken passar inte |

**Skript före MCP.** De schemalagda kontrollerna och rapportens hämtning är skript mot officiella API:er. En MCP används när någon undersöker (→ `guide/2-9-drift-och-forvaltning.md`).

**Senaste version och verktygslås.** Varje MCP-server och varje verktyg följer startsäkringen till senaste version, och verktygslåset rapporterar när en servers verktyg eller instruktioner ändras (→ `guide/bilaga-a-verktyg.md`; `BESLUT.md` 2026-10-16). En version låses bara när en uppdatering har gått sönder (fallgrop 98). seo-monster rättade i augusti 2026 att nya installationer gick sönder när MCP SDK 2 släpptes, alltså samma problem som mcp-gsc hade i juli.
