# Lager 9 – Drift och förvaltning: kandidater per lucka och underlag för Nortropics förvaltningsskill (oktober 2026)

Kontrolldatum: all GitHub-data (stjärnor, licens, senaste push) hämtades via GitHub API **2026-10-13**. Dokumentation och webbkällor lästes samma dag. Domskala: **Ta in** (in i driften nu), **Pröva** (tidsbegränsat test på 1–2 kunder), **Bevaka** (inte nu, men följ), **Avstå**. "Runtime" betyder att verktyget eller åtkomsten stannar i driften. "Destillera" betyder att principen skrivs in i Nortropics egen förvaltningsskill. Sökbudgeten tog slut mot slutet av arbetet. Det som inte gick att verifiera står under respektive Gaps.

## 1. Vilka officiella eller välskötta MCP-servrar och API:er finns för Search Console, Business Profile, Google Analytics och Cloudflare – och kan Claude Code-agenter använda dem (auth, scopes, underhåll)?

### Takeaway
Cloudflare har en officiell och aktivt underhållen MCP. Den rekommenderade är nu **cloudflare/mcp** (`https://mcp.cloudflare.com/mcp`) med hela API:t via Code Mode och OAuth eller API-token. Flera domänservrar i repot som står i Nortropics inventarium (cloudflare/mcp-server-cloudflare) är markerade som "deprecated". Google har ingen officiell MCP för Search Console eller Business Profile. För GSC är AminForou/mcp-gsc det mognaste community-valet (MIT, cirka 1,9k ★, tjänstekonto, destruktiva verktyg avstängda som standard). För GBP finns bara små MCP:er som var och en sköts av en enda person. Det officiella API:t kräver ansökan och har 0 QPM tills ansökan godkänts, så det bör nås via en tunn egen klient. Googles officiella GA-MCP finns men är märkt "Experimental", och GA4 passar dåligt i en modell utan samtyckesbanner (se fråga 2).

### Cited Findings

**Cloudflare**
- Cloudflares egen katalog anger "Cloudflare API MCP server" (`https://mcp.cloudflare.com/mcp`) som huvudserver. Den ger åtkomst till hela Cloudflare-API:t ("over 2,500 endpoints") och dokumentationen via tre verktyg, `search()`, `execute()` och `docs()`. Den bygger på Code Mode, där modellen skriver JavaScript som körs i en isolerad Dynamic Worker-sandlåda — [Cloudflare docs: MCP servers for Cloudflare](https://developers.cloudflare.com/agents/model-context-protocol/mcp-servers-for-cloudflare/)
- Autentisering sker antingen via OAuth, där man väljer vilka behörigheter agenten får, eller via en Cloudflare API-token som bearer i `Authorization`-headern "for CI/CD or automation". Både user- och account-tokens fungerar. Sidan nämner Claude som klient, och Cloudflare Skills-pluginet fungerar med Claude Code — [Cloudflare docs](https://developers.cloudflare.com/agents/model-context-protocol/mcp-servers-for-cloudflare/)
- README i cloudflare/mcp-server-cloudflare säger att den rekommenderade servern underhålls i `cloudflare/mcp`. Under "Deprecated servers" står: "Please migrate to the Cloudflare API MCP Server at your earliest convenience". Det gäller AI Gateway, Audit Logs, AutoRAG, DNS Analytics, GraphQL, Logpush, Observability, Radar, Workers Bindings och Workers Builds. Kvar som aktiva domänservrar finns Documentation, Container, Browser Run (hämta sidor som markdown och ta skärmdumpar), DEX, CASB, Blog och Demo Day — [GitHub README](https://github.com/cloudflare/mcp-server-cloudflare)
- Samma README: legacy-SSE (`GET /sse`) svarar 410 Gone, och `/mcp` (Streamable HTTP) rekommenderas. Där står också: "Some features may require a paid Cloudflare Workers plan" — [GitHub README](https://github.com/cloudflare/mcp-server-cloudflare)

**Google – vad Google själv erbjuder**
- Googles lista över Google-hanterade MCP-servrar (senast uppdaterad 2026-10-09) innehåller **inte** Search Console, Business Profile, Google Analytics eller Google Ads. Bland "Google MCP servers" finns Maps Grounding Lite och Maps Code Assist (Preview), och under Workspace (Developer Preview) finns Drive, Gmail, Calendar, Chat och People — [Google Cloud: supported products](https://docs.cloud.google.com/mcp/supported-products)
- En sekundärkälla bekräftar att Google inte har publicerat någon officiell Search Console-MCP och att alla alternativ kommer från tredjepart — [Enrich Labs](https://www.enrichlabs.ai/blog/google-search-console-mcp-2026)

**Google Search Console (API och community-MCP)**
- Kvoter i Search Console API: Search Analytics 1 200 QPM per sajt och 1 200 QPM per användare, och per projekt 30 000 000 QPD och 40 000 QPM. URL Inspection har 2 000 QPD och 600 QPM per sajt. Övriga resurser har 20 QPS och 200 QPM per användare. De dyraste frågorna grupperar eller filtrerar på både page och query — [Google: Usage limits](https://developers.google.com/webmaster-tools/limits)
- Search Analytics ger upp till 25 000 rader per anrop och cirka 16 månaders historik (sekundärkälla) — [Enrich Labs](https://www.enrichlabs.ai/blog/google-search-console-mcp-2026)
- **AminForou/mcp-gsc** (v0.4.1, september 2026) stöder OAuth (desktop-klient) och tjänstekonto. För tjänstekontot gäller: "Add the service account email to your GSC property … Add user → Full access". `add_site`, `delete_site` och `delete_sitemap` är avstängda som standard (`GSC_ALLOW_DESTRUCTIVE`). Med `GSC_DATA_STATE=final` returneras bara bekräftad data, med "2–3 day lag". Batchinspektion klarar upp till 10 URL:er. I juli 2026 pinnades `mcp[cli]<2.0.0` eftersom "The `mcp` SDK 2.0.0 (released 2026-07-28) removed the `mcp.server.fastmcp` module" och alla nya installationer kraschade — [README](https://github.com/AminForou/mcp-gsc)
- **avansaber/seo-monster** har "70 tools across Search Console, GA4, PageSpeed, Cloudflare". `gsc_portfolio_summary` ger en rad per egendom plus en summering för hela portföljen, "across agency or multi-brand setups". Cloudflares skrivverktyg (cache purge, redirects, settings, robots.txt) ligger bakom `SEO_MCP_ALLOW_DESTRUCTIVE`, och de riskablare kräver dessutom en `confirm`-token per anrop. Servern kräver Python 3.11+, och OAuth-samtycket körs en gång från terminalen — [README](https://github.com/avansaber/seo-monster)
- irinabuht12-oss/google-ads-meta-ads-mcp beskriver sig som en "hosted remote MCP … By Ryze AI" med "OAuth login, no API keys, approval-gated writes, 7-day free trial" — [GitHub](https://github.com/irinabuht12-oss/google-ads-meta-ads-mcp)

**Google Business Profile (API)**
- För att få åtkomst krävs ett Google Cloud-projekt och en ansökan via formuläret "Application for Basic API Access", från en e-postadress som är "listed as an owner/manager on your business's GBP". Villkoren är: "Manage a Google Business Profile that is verified and active for 60+ days" och "Have a website representing the business listed on the GBP". En byrå får ansöka med en kunds profil. "If your quota is 0 QPM … your project has not yet been approved", och vid 300 QPM är projektet godkänt — [Google: Prerequisites](https://developers.google.com/my-business/content/prereqs)
- OAuth-scope: `https://www.googleapis.com/auth/business.manage`. Följande API:er ska aktiveras: Google My Business API, Account Management, Business Information, Notifications, Verifications, Place Actions och Lodging. Tjänstekonton nämns inte — [Google: Basic setup](https://developers.google.com/my-business/content/basic-setup)
- Gränser: Business Information API har 300 QPM, och för redigeringar gäller "10 per minute per Google Business Profile (cannot be increased)". Performance API har 300 QPM — [Google: Usage limits](https://developers.google.com/my-business/content/limits)
- Recensioner hanteras via v4: `GET …/v4/accounts/{accountId}/locations/{locationId}/reviews` och `PUT …/reviews/{reviewId}/reply`. Svar kräver att Workspace-admin har aktiverat Search/Maps och Business Profile, om kontot är ett Workspace-konto — [Google: Review data](https://developers.google.com/my-business/content/review-data)
- Inlägg skapas via `POST https://mybusiness.googleapis.com/v4/{parent=accounts/*/locations/*}/localPosts` med scope `business.manage`. Sidan uppdaterades senast 2026-04-15 och har ingen avvecklingsnotis — [Google: localPosts.create](https://developers.google.com/my-business/reference/rest/v4/accounts.locations.localPosts/create)
- Performance API har `fetchMultiDailyMetricsTimeSeries`, `getDailyMetricsTimeSeries` och `locations.searchkeywords.impressions.monthly.list` ("search keywords used to find a business in search or maps") — [Google: Performance API](https://developers.google.com/my-business/reference/performance/rest). DailyMetric omfattar bland annat `CALL_CLICKS`, `WEBSITE_CLICKS`, `BUSINESS_DIRECTION_REQUESTS`, `BUSINESS_IMPRESSIONS_{DESKTOP,MOBILE}_{MAPS,SEARCH}` och `BUSINESS_BOOKINGS` — [Google: DailyMetric](https://developers.google.com/my-business/reference/performance/rest/v1/DailyMetric)

**Google Analytics och Ads**
- googleanalytics/google-analytics-mcp har README-titeln "Google Analytics MCP Server (Experimental)". Verktygen är `get_account_summaries`, `get_property_details`, `run_report`, `run_funnel_report`, `run_realtime_report` och `get_custom_dimensions_and_metrics`. Servern kräver ADC-credentials med scope `https://www.googleapis.com/auth/analytics.readonly`, och README visar hur den läggs till i Claude Code med `claude mcp add analytics-mcp … -- pipx run analytics-mcp` — [README](https://github.com/googleanalytics/google-analytics-mcp)

**Claude Code och MCP-autentisering**
- Fjärrservrar läggs till med `claude mcp add --transport http <name> <url>`. OAuth 2.0 körs via `/mcp`, och "Authentication tokens are stored securely and refreshed automatically". Statiska tokens skickas med `--header "Authorization: Bearer …"` och dynamiska via `headersHelper`. Scopes kan vara local, project (`.mcp.json`) eller user. Varning: "Verify you trust each server before connecting it. Servers that fetch external content can expose you to prompt injection risk." — [Claude Code docs: MCP](https://code.claude.com/docs/en/mcp)

**GitHub-data (verifierad 2026-10-13)**

| Repo | ★ | Licens | Senaste push | Not |
|---|---|---|---|---|
| [cloudflare/mcp](https://github.com/cloudflare/mcp) | 946 | Apache-2.0 | 2026-10-12 | Officiell API-MCP, skapad 2026-01-29 |
| [cloudflare/mcp-server-cloudflare](https://github.com/cloudflare/mcp-server-cloudflare) | 4 376 | Apache-2.0 | 2026-10-09 | Officiell; flera servrar deprecated |
| [googleanalytics/google-analytics-mcp](https://github.com/googleanalytics/google-analytics-mcp) | 3 445 | Apache-2.0 | 2026-10-02 | Googles GA-organisation, "Experimental" |
| [googleads/google-ads-mcp](https://github.com/googleads/google-ads-mcp) | 1 036 | Apache-2.0 | 2026-10-09 | Googles Ads-organisation |
| [AminForou/mcp-gsc](https://github.com/AminForou/mcp-gsc) | 1 916 | MIT | 2026-09-15 | Python, 15 öppna ärenden |
| [iannuttall/seo](https://github.com/iannuttall/seo) | 572 | Apache-2.0 | 2026-09-27 | Skapad 2026-07-10; CLI + MCP, GSC + GA4 |
| [avansaber/seo-monster](https://github.com/avansaber/seo-monster) | 541 | MIT | 2026-10-13 | Skapad 2026-05-28 |
| [saurabhsharma2u/search-console-mcp](https://github.com/saurabhsharma2u/search-console-mcp) | 301 | MIT | 2026-09-02 | GSC + Bing + AdSense + GA4 |
| [ahonn/mcp-server-gsc](https://github.com/ahonn/mcp-server-gsc) | 278 | **Ingen licens i metadata** | 2026-09-04 | — |
| [Suganthan-Mohanadasan/Suganthans-GSC-MCP](https://github.com/Suganthan-Mohanadasan/Suganthans-GSC-MCP) | 146 | Apache-2.0 | 2026-09-27 | 29 verktyg, larm, Indexing API |
| [irinabuht12-oss/google-ads-meta-ads-mcp](https://github.com/irinabuht12-oss/google-ads-meta-ads-mcp) | 4 712 | MIT (repo) | 2026-10-12 | **Kommersiell hostad tjänst** (Ryze AI), skapad 2026-04-06 |
| [satheeshds/gbp-review-agent](https://github.com/satheeshds/gbp-review-agent) | 9 | MIT | 2025-12-03 | Endast recensioner; inaktiv sedan december 2025 |
| [A1-x-Tech/mcp-google-business](https://github.com/A1-x-Tech/mcp-google-business) | 4 | MIT | 2026-10-04 | — |
| [Insightful-Pipe/google-my-business-mcp-server](https://github.com/Insightful-Pipe/google-my-business-mcp-server) | 4 | MIT | 2026-10-10 | Hostad tjänst |
| [amirjahfar1/Google-Business-Profile-GBP-MCP](https://github.com/amirjahfar1/Google-Business-Profile-GBP-MCP) | 3 | MIT | 2026-07-13 | — |
| [narkov/gbp-mcp-server](https://github.com/narkov/gbp-mcp-server) | 1 | Ingen licens i metadata | 2026-03-13 | — |
| [resend/resend-mcp](https://github.com/resend/resend-mcp) | 576 | MIT | 2026-10-13 | Officiell (Resend finns redan i inventariet) |

### Inferences

**Domar – dataåtkomst för agenter**

| Kandidat | Lucka | Förankring | Passform (Astro+CF, 1 person, svenska kunder) | Typ | Kostnad | Dom – motivering |
|---|---|---|---|---|---|---|
| Cloudflare API MCP (`cloudflare/mcp`) | DNS, Workers-versioner och rollback, Web Analytics (GraphQL), Access, Email Routing | Cloudflare API + MCP (Streamable HTTP, OAuth 2.0) | Hög. Hela driftstacken ligger hos Cloudflare, och Code Mode ger få verktyg och liten kontext | Runtime | Servern är gratis; vissa funktioner kräver Workers Paid | **Ta in.** Byt inventarieposten från mcp-server-cloudflare. Ge rapport- och övervakningsagenten en read-only-token och ge DNS/deploy en separat token med smal behörighet. |
| mcp-server-cloudflare (domänservrar) | Docs, Browser Run (skärmdumpar) | — | Medel | Runtime | Gratis | **Bevaka.** Använd inte de servrar som är deprecated. Browser Run kan prövas för skärmdumpar till rapporten. |
| AminForou/mcp-gsc | GSC-åtkomst för agenter | Search Console API; minsta behörighet (destruktiva verktyg av) | Hög. Ett tjänstekonto läggs till som användare på varje kunds egendom och skalar därmed till många kunder utan att tokens löper ut | Runtime | Gratis (API-kvoterna räcker gott för tiotals sajter) | **Pröva** och gå över till Ta in om testet håller. Pinna versionen: brottet med mcp SDK 2.0 i juli 2026 visar beroenderisken. |
| avansaber/seo-monster | GSC + GA4 + PageSpeed + Cloudflare, portföljvy | Officiella API:er; skriv- och destruktiva verktyg är spärrade bakom flagga och confirm-token | Hög funktionalitet för "många sajter", men projektet är bara 4,5 månader gammalt och har stor yta | Runtime | Gratis | **Pröva** i en månad parallellt med mcp-gsc och välj sedan en av dem. Två GSC-MCP:er i drift ger bara brus. |
| iannuttall/seo, saurabhsharma2u/search-console-mcp, Suganthans-GSC-MCP | GSC/SEO-analys | Officiella API:er | Unga eller små | — | Gratis | **Bevaka.** |
| ahonn/mcp-server-gsc | GSC | — | — | — | — | **Avstå.** Ingen licens anges i repots metadata, så användningsrätten är oklar. |
| Ryze hostad MCP (irinabuht12-oss) | GSC/GA4/Ads | — | En tredjepart får OAuth-åtkomst till kunders data; tjänsten är kommersiell och inget personuppgiftsbiträdesavtal har verifierats. Stjärnantalet är ovanligt högt för ett sex månader gammalt repo. | — | Prenumeration efter 7 dagars test | **Avstå.** |
| GBP:s officiella API via egen tunn klient i en skill | Inlägg, öppettider, recensionssvar, statistik (samtal, vägbeskrivningar, webbplatsklick) | Business Profile APIs (v1 Performance, v4 reviews/localPosts) | Hög affärsnytta för hantverkare, där samtal är KPI:n. Begränsningar: 60-dagarskravet, ansökan och 10 redigeringar per minut och profil | Runtime (API); svarsmallar och godkännandeflöde destilleras | Gratis | **Pröva.** Ansök om API-åtkomst nu eftersom det tar tid. Börja med read-only (Performance API) och kör recensionssvar som "agentutkast, sedan godkänner ägaren". |
| Community-MCP:er för GBP | Samma som ovan | — | ≤9 ★, enskilda underhållare, några är hostade | — | — | **Avstå.** Skriv en egen tunn klient i stället; det rör sig om ett fåtal endpoints. |
| Google Analytics MCP (officiell) | GA4-data | GA Data/Admin API, read-only | Låg i grundutbudet, eftersom GA4 kräver samtycke och väcker frågor om tredjelandsöverföring (fråga 2) | Runtime vid behov | Gratis | **Bevaka.** Blir relevant för kunder med annonsering (planerad tjänstelinje), och då tillsammans med samtyckeshantering. |
| Google Ads MCP (officiell) | Annonser | Google Ads API | Hör till den framtida annonstjänsten | — | Gratis | **Bevaka.** |
| Resend MCP (officiell) | Rapportutskick, inkommande mejl | — | Hög; finns redan i stacken | Runtime | Free: 3 000 mejl/mån | **Ta in.** Utöka användningen till rapporter och ärendeintag (fråga 4–5). |

- **Auth-modell för Google:** Nortropics Google-konto bör vara användare på varje kunds GSC-egendom och förvaltare på varje GBP-profil. För GSC är tjänstekonto att föredra (headless, inga tokens som går ut). GBP dokumenterar inte tjänstekonton, så räkna med en OAuth-refresh-token för Nortropics konto och förvara den som hemlighet i CI.
- **Behörighetsdesign:** agenterna ska ha read-only som standard, och skrivningar ska gå genom en godkännandegrind. Det följer mönstret i mcp-gsc och seo-monster, där destruktiva verktyg är avstängda tills de låses upp, och motsvarar ITIL:s skillnad mellan standardändring och normal ändring (fråga 4).
- **Otrusted indata:** recensionstexter och kundmejl ska behandlas som data och aldrig som instruktioner. En agent som läser GBP-recensioner får inte ha publiceringsverktyg utan godkännandesteg; Claude Code varnar själv för prompt injection.
- Pinna MCP-serverversioner i `.mcp.json` och uppgradera dem via samma Renovate-flöde som sajterna (fråga 3).

### Gaps
- Vilken minsta GSC-behörighet (Restricted eller Full) som räcker för ett read-only-tjänstekonto, och exakt vilka OAuth-scope-namn GSC använder, verifierades inte.
- GBP: det framgår inte om tjänstekonton stöds, om recensionssvar publiceras direkt eller om v4-`localPosts` har ett planerat avvecklingsdatum.
- Cloudflare API MCP: om OAuth-behörigheterna kan begränsas per zon eller Worker framgår inte av den sida som lästes.
- Om Google är certifierat under EU–US Data Privacy Framework verifierades inte.
- MCP-registret (registry.modelcontextprotocol.io) gick inte att hämta (serverfel), och listan punkpeye/awesome-mcp-servers innehöll inga relevanta poster. Hur väl registren täcker området är därför okontrollerat.

## 2. Vilka övervakningsverktyg passar (drifttid, formulär, status), och vilken integritetsvänlig analys klarar sig utan samtyckesbanner enligt svenska och EU-regler – vad säger IMY (och PTS)?

### Takeaway
För drifttid finns tre realistiska vägar. **UptimeFlare** körs på Cloudflare Workers, är gratis och klarar 50 kontroller med 1 minuts intervall. **Uptime Kuma** är moget, MIT-licensierat och kräver en egen server; sedan version 2.1 kan det övervaka domäners utgångsdatum. **Checkly** är en SaaS-tjänst byggd på Playwright och passar bäst för syntetiska formulärtester; Hobby-planen är gratis och ger 1 000 webbläsarkörningar per månad. Cloudflare Health Checks kräver Pro-plan, och UptimeRobots gratisplan är avsedd för hobby- och ideella projekt.

För analys är **Cloudflare Web Analytics** basen: gratis, utan kakor och redan i stacken. Uppgraderingen är **Plausible** (EU-hostat, e-postrapporter) eller självhostad **Umami**.

Juridiskt är det **PTS och inte IMY** som har tillsyn över kakreglerna i LEK. IMY har tillsyn över den efterföljande behandlingen av personuppgifter. PTS anger att statistik inte är "nödvändigt". EDPB:s riktlinjer 2/2023 läser art. 5.3 brett och omfattar även JavaScript som instruerar webbläsaren att skicka data. Påståendet "ingen banner behövs" är alltså leverantörernas egen bedömning och inte ett myndighetsbesked. Digital Omnibus kan ge ett uttryckligt undantag för mätning i egen regi, men är inte antagen; rådets text är daterad 2 oktober 2026.

### Cited Findings

**Drifttidsövervakning**
- **UptimeFlare:** "serverless, and free uptime monitoring & status page solution, powered by Cloudflare Workers". Den klarar "Up to 50 checks at 1-minute intervals" och geo-specifika kontroller från fler än 310 städer. Den stöder HTTP/HTTPS/TCP, statuskod- och nyckelordskontroller, upp till 90 dagars historik, aviseringar via över 100 kanaler (apprise), webhooks, statussida med egen domän, valfritt lösenordsskydd och "JSON API for fetching realtime status data". "SSL certificate checks" står fortfarande som en öppen TODO. Den 2026-03-04 rättades sårbarheten CVE-2026-29779, där monitorkonfiguration och credentials kunde exponeras; versioner från 2025-09-21 till 2026-03-04 är drabbade. Projektet migrerade från KV till D1 den 2026-01-03 — [README](https://github.com/lyc8503/UptimeFlare)
- Workers-gränser: på Free-planen 5 Cron Triggers per konto, 100 000 anrop per dygn, 10 ms CPU per HTTP-anrop och 50 subrequests per anrop. På Paid-planen 250 Cron Triggers och 10 000 subrequests — [Cloudflare: Workers limits](https://developers.cloudflare.com/workers/platform/limits/)
- **Uptime Kuma 2.1** (februari 2026) har en ny "Domain Expiry monitor" som larmar innan en domän går ut och förbättrad RDAP-hantering. Den kan också köra kontroller från Globalping-prober runt om i världen och har nya aviseringsintegrationer — [Linuxiac](https://linuxiac.com/uptime-kuma-2-1-monitoring-tool-adds-globalping-support/). Version 2.0 gav stöd för MariaDB och rootless Docker — [AlternativeTo (okt 2025)](https://alternativeto.net/news/2025/10/uptime-kuma-2-0-introduces-mariadb-support-rootless-docker-modern-ui-and-upgrade-tools)
- **Upptime:** körs som GitHub Actions-schema, och "The shortest interval is 5 minutes". Vid avbrott skapas ett GitHub-ärende, och "The issue is automatically deleted (instead of closed) if the downtime is less than 15 minutes". Statussidan ligger på GitHub Pages — [Upptime docs](https://upptime.js.org/docs/). "By default, Upptime only supports publishing status websites from public repositories" om man inte sätter upp ett proxy-API — [Upptime FAQ](https://upptime.js.org/docs/faq)
- GitHub Actions är gratis för publika repon på standardrunners. För privata repon ingår 2 000 minuter per månad på GitHub Free och 3 000 på Pro och Team — [GitHub Docs: Actions billing](https://docs.github.com/en/billing/concepts/product-billing/github-actions)
- **Checkly:** Hobby kostar 0 USD och ger 10 000 API-kontroller och 1 000 webbläsar-/Playwright-körningar per månad, 10 drifttidsmonitorer med högst 2 minuters frekvens, 6 platser, 7 dagars rådata och 30 dagars aggregerad data. Starter kostar 24 USD och Team 64 USD per månad (årsfakturering). Körningarna på Hobby har ett hårt tak — [Checkly pricing](https://www.checklyhq.com/pricing/). Webbläsarkontrollerna kör Playwright i riktiga webbläsare från flera platser, och användningsfallen inkluderar uttryckligen "Form submissions and user journey validation" — [Checkly docs](https://www.checklyhq.com/docs/detect/synthetic-monitoring/browser-checks/overview/)
- **Cloudflare Health Checks:** Free har 0 kontroller, Pro 10, Business 50 och Enterprise 1 000. Funktionen ingår numera i "Smart Shield", som är inriktat på skydd av origin-servrar — [Cloudflare docs](https://developers.cloudflare.com/health-checks/)
- **UptimeRobot:** gratisplanen ger 50 monitorer med 5 minuters intervall och beskrivs som "Good for hobby and non-profit projects". Solo kostar 12–13 USD och Team 39–46 USD per månad — [UptimeRobot pricing](https://uptimerobot.com/pricing/). Enligt en partisk sekundärkälla (skriven av grundaren till en konkurrent) begränsades gratisplanen till personligt och icke-kommersiellt bruk i november 2024 — [DEV Community](https://dev.to/velprove/uptimerobot-commercial-use-free-alternatives-for-business-sites-in-2026-5d75)
- SRE-principer: "The four golden signals of monitoring are latency, traffic, errors, and saturation". "Every page should be actionable." "Black-box monitoring is symptom-oriented and represents active—not predicted—problems" — [Google SRE book: Monitoring](https://sre.google/sre-book/monitoring-distributed-systems/)
- SLO:er: publicerade SLO:er "sets expectations for system behavior". "a tighter internal SLO than the SLO advertised to users gives you room". "Have as few SLOs as possible". "Perfection can wait" — [Google SRE book: SLOs](https://sre.google/sre-book/service-level-objectives/)

**Integritetsvänlig analys**
- **Cloudflare Web Analytics:** "free, privacy-first analytics for your website". "Cloudflare Web Analytics does not collect or use your visitors' personal data". Beacon-skriptet samlar in mätvärden via Performance API. Sidan uppdaterades senast 2026-04-17 — [Cloudflare docs: About](https://developers.cloudflare.com/web-analytics/about/)
- Från Cloudflares bloggpost vid lanseringen: "We don't use any client-side state, like cookies or localStorage, for the purposes of tracking users". Cloudflare säger att man inte fingerprintar via IP eller User-Agent. En "visit" definieras som en sidvisning vars referer inte matchar värdnamnet, och unika besökare räknas inte — [Cloudflare blog, 2020-09-29](https://blog.cloudflare.com/free-privacy-first-analytics-for-a-better-web/)
- FAQ för Web Analytics: query strings loggas inte, "We retain unsampled beacon data for the past 7 days" och därefter aggregeras datan till ungefär 10 procent. Data går att se för "the previous six months". Det finns en "soft limit of ten sites per account" som kan höjas via support. Automatisk installation kräver att trafiken går via Cloudflares proxy. GraphQL-API:t exponerar `sampleInterval` — [Cloudflare FAQ](https://developers.cloudflare.com/web-analytics/faq/). Datasetet för sidvisningar heter `rumPageloadEventsAdaptiveGroups` och filtreras på `siteTag` (sekundärkälla) — [boehs.org](https://boehs.org/node/notes-on-the-cloudflare-web-analytics-api)
- **Plausible:** vid 10 000 sidvisningar per månad kostar Starter 9 USD (1 sajt, 3 års lagring), Growth 14 USD (upp till 3 sajter och 3 teammedlemmar) och Business 19 USD (upp till 10 sajter och 10 teammedlemmar, 5 års lagring). Tjänsten marknadsförs med "No cookie banner required" och "Made and hosted in the EU" — [Plausible](https://plausible.io/). Enligt datapolicyn använder Plausible inga kakor och inga beständiga identifierare. Unika besökare räknas med hash(daily_salt + website_domain + ip_address + user_agent), där saltet roteras och raderas var 24:e timme. Råa IP-adresser lagras inte, men IP används vid anropet för att ta fram ungefärlig plats, och "Visitor data does not leave the EU" — [Plausible data policy](https://plausible.io/data-policy)
- Plausibles Stats API: "Stats API is a Business plan feature", med en standardgräns på 600 anrop per timme. För att skapa eller ändra sajter krävs en Sites API-nyckel — [Plausible docs](https://plausible.io/docs/stats-api). **Källkonflikt:** sidan om abonnemang placerar Sites API under Enterprise — [Plausible plans](https://plausible.io/docs/subscription-plans) — medan byråsidan beskriver Sites API utan att ange plan. Byråsidan nämner också delade dashboard-länkar, schemalagda e-postrapporter varje vecka (måndag) och/eller månad (den 1:a), uttryckligen "no PDFs", samt möjlighet till white-label — [Plausible for agencies](https://plausible.io/for-freelancers-agencies)
- Plausibles juridiska bedömning skrevs av Steffen Gross på Simpliant Legal (publicerad 2024-03-21, uppdaterad 2026-08-02) och ligger på Plausibles egen blogg. Den bygger på berättigat intresse (art. 6.1 f) och påståendet att verktyget fungerar "without the need to access the end device". Den behandlar **inte** EDPB:s riktlinjer 2/2023 och tar inte upp nationella variationer — [Plausible blog](https://plausible.io/blog/legal-assessment-gdpr-eprivacy)
- **Umami Cloud:** Hobby kostar 0 USD och ger 100 000 händelser per månad, 1 webbplats, 6 månaders lagring och inget API. Pro kostar 20 USD och ger 1 miljon händelser, upp till 20 webbplatser, 2 års lagring och API. Business kostar 200 USD. "Umami Cloud servers are located in the US and EU", och något alternativ med enbart EU-hosting hittades inte — [Umami pricing](https://umami.is/pricing)

**Rättsläget i Sverige och EU**
- PTS (sidan uppdaterad 2024-05-14) skriver: "För att få använda kakor (cookies) på din webbplats måste du först fråga om samtycke." Vidare: "Undantaget är nödvändiga kakor", och "För att undantaget ska gälla krävs det att kakan är nödvändig för att en tjänst som användaren begär ska fungera." Som exempel på något som inte omfattas av undantaget nämns att "samla in statistik". PTS anger sig själv som tillsynsmyndighet och har fattat vägledande beslut 2022 och 2023 — [PTS: Kakor](https://pts.se/internet-och-telefoni/kakor-cookies/)
- IMY skriver att kakor regleras bland annat i "lagen om elektronisk kommunikation (LEK) som Post- och telestyrelsen är tillsynsmyndighet över". Besökare ska informeras och "ge sitt samtycke … innan de lagras eller hämtas" — [IMY: Frågor utanför våra verksamhetsområden](https://www.imy.se/om-oss/vart-uppdrag/fragor-utanfor-vara-verksamhetsomraden/)
- IMY 2025-04-30: PTS är ensam tillsynsmyndighet för LEK. Den efterföljande behandlingen, till exempel analys och profilering, "berörs dock av dataskyddsförordningens regler, där IMY är behörig tillsynsmyndighet". IMY riktade kritik mot kakbanners hos Warner Music, ATG ("vilseledande design") och Aller Media (berättigat intresse utan intresseavvägning). IMY:s vägledning: det ska vara "lika lätt att ge sitt samtyckte som att senare kunna återkalla det" — [IMY](https://www.imy.se/nyheter/imy-riktar-kritik-mot-foretags-kakbanners/)
- IMY 2023-07-03 om Google Analytics: Tele2 fick en sanktionsavgift på 12 miljoner kronor och CDON 300 000 kronor. Coop och Dagens Industri förelades att sluta använda verktyget. Grunden var att överföring till USA med standardavtalsklausuler efter Schrems II saknade tillräckliga skyddsåtgärder, och att uppgifterna utgör personuppgifter "eftersom uppgifterna kan sammankopplas med övriga unika uppgifter som överförs" — [IMY](https://www.imy.se/nyheter/fyra-bolag-maste-sluta-anvanda-google-analytics/)
- Tribunalen fastställde EU–US Data Privacy Framework den 2025-09-03 i Latombe mot kommissionen (T-553/23). Domen kunde överklagas till EU-domstolen inom två månader — [WSGR Data Advisor](https://www.wsgrdataadvisor.com/2025/09/eu-court-upholds-the-validity-of-the-eu-u-s-data-privacy-framework/)
- EDPB:s riktlinjer 2/2023, version 2 (antagen i oktober 2024):
  - ¶33: när en aktör instruerar webbläsaren att skicka information, till exempel via JavaScript, "Such access clearly falls within the scope of Article 5(3) ePD".
  - ¶50–51: spårningspixlar och URL-spårning räknas som lagring respektive "gaining of access".
  - ¶20: "there are no restrictions placed on the origin of information".
  - ¶12: begreppet information omfattar "both non-personal data and personal data".
  - ¶56: "the applicability of this article does not systematically mean that consent needs to be collected".
  
  — [EDPB Guidelines 2/2023 v2 (PDF)](https://edpb.europa.eu/system/files/2024-10/edpb_guidelines_202302_technical_scope_art_53_eprivacydirective_v2_en_0.pdf); antagandet tillkännagavs 2024-10-16 — [Hunton](https://www.hunton.com/privacy-and-cybersecurity-law-blog/edpb-adopts-guidelines-on-scope-of-eprivacy-directive)
- Digital Omnibus: kommissionens förslag från november 2025 innehöll artiklarna 88a och 88b. Ordförandeskapets text från 3 september 2026 strök båda och flyttade tillbaka reglerna till ePrivacy art. 5.3. Rådets text (dok. 13886/26, 2026-10-02) undantar "first-party audience measurement" som ger anonym aggregerad information från samtyckeskravet, under förutsättning att den är "strictly necessary" och att datan "not processed for another purpose, shared with third parties or combined with data from third parties". Parlamentet har ännu inte antagit någon position, och trilogen har inte börjat. ePrivacy-ändringen skulle börja gälla sex månader efter publicering i EUT. Uppgifterna gäller per 2026-10-09 — [PPC Land](https://ppc.land/eu-council-draft-cuts-cookie-re-prompt-wait-from-6-months-to-4/)

**GitHub-data (verifierad 2026-10-13)**

| Repo | ★ | Licens | Senaste push | Not |
|---|---|---|---|---|
| [louislam/uptime-kuma](https://github.com/louislam/uptime-kuma) | 92 406 | MIT | 2026-10-13 | Självhostad |
| [DavidFuchs/mcp-uptime-kuma](https://github.com/DavidFuchs/mcp-uptime-kuma) | 55 | MIT | 2026-10-11 | MCP för Uptime Kuma v2 |
| [Camusama/uptime-kuma-mcp-server](https://github.com/Camusama/uptime-kuma-mcp-server) | 9 | Ingen licens i metadata | 2025-06-08 | Inaktiv |
| [lyc8503/UptimeFlare](https://github.com/lyc8503/UptimeFlare) | 3 871 | Apache-2.0 | 2026-10-07 | Template-repo, Workers + D1 |
| [upptime/upptime](https://github.com/upptime/upptime) | 17 180 | MIT | 2026-10-13 | GitHub Actions + Pages |
| [TwiN/gatus](https://github.com/TwiN/gatus) | 12 296 | Apache-2.0 | 2026-10-07 | Konfiguration som YAML |
| [openstatusHQ/openstatus](https://github.com/openstatusHQ/openstatus) | 9 178 | **AGPL-3.0** | 2026-10-12 | Har MCP-server |
| [checkly/checkly-cli](https://github.com/checkly/checkly-cli) | 97 | Apache-2.0 | 2026-10-13 | Monitoring as code |
| [microsoft/playwright](https://github.com/microsoft/playwright) | 97 623 | Apache-2.0 | 2026-10-13 | — |
| [microsoft/playwright-mcp](https://github.com/microsoft/playwright-mcp) | 38 095 | Apache-2.0 | 2026-10-08 | — |
| [plausible/analytics](https://github.com/plausible/analytics) | 29 387 | **AGPL-3.0** | 2026-10-13 | Community Edition |
| [getsentry/plausible-mcp](https://github.com/getsentry/plausible-mcp) | 46 | MIT | 2026-10-05 | Har topic-taggen `tag-non-production` |
| [AVIMBU/plausible-mcp-server](https://github.com/AVIMBU/plausible-mcp-server) | 8 | Ingen licens i metadata | 2025-03-19 | Inaktiv |
| [umami-software/umami](https://github.com/umami-software/umami) | 39 349 | MIT | 2026-10-13 | — |
| [Macawls/umami-mcp-server](https://github.com/Macawls/umami-mcp-server) | 35 | MIT | 2026-08-15 | — |
| [mikusnuz/umami-mcp](https://github.com/mikusnuz/umami-mcp) | 8 | MIT | 2026-10-08 | 66 verktyg |

### Inferences

**Domar – övervakning, status och analys**

| Kandidat | Lucka | Förankring | Passform | Typ | Kostnad | Dom – motivering |
|---|---|---|---|---|---|---|
| UptimeFlare | Drifttid, intern statussida | SRE black-box-övervakning | Hög. Samma plattform, gratis, konfiguration i Git. Men om övervakningen och sajterna ligger hos samma leverantör slås båda ut av ett Cloudflare-avbrott, och projektet sköts av en person (CVE i mars 2026) | Runtime | Gratis (Workers Free räcker för cirka 50 kontroller) | **Pröva** som primär monitor, kompletterad med en extern kontroll (Checkly Hobby eller Uptime Kuma). |
| Uptime Kuma + mcp-uptime-kuma | Drifttid, **domänutgång** (Oderland saknar API), SSL | SRE black-box-övervakning | Hög mognad. Kräver en server (Nortropic kör redan interna verktyg på Railway) med beständig volym | Runtime | Hostingkostnad | **Pröva** som den externa vakten och för domänutgång. MCP:n låter agenten läsa status. |
| Checkly (Hobby) + Playwright-skript | **Syntetiskt formulärtest** | Syntetisk övervakning, monitoring as code | Hög. 1 000 webbläsarkörningar per månad räcker till ett dagligt formulärtest för cirka 30 sajter. Testdata är fiktiv, så inga besökaruppgifter berörs | Runtime; testmönstret destilleras | Gratis upp till Hobby-taket, därefter 24 USD/mån | **Pröva.** |
| Playwright i GitHub Actions (eget cron-jobb) | Formulärtest utan SaaS | Samma | Hög. Kräver privata repon, eftersom minutkvoten är 2 000 min/mån | Destillera (skill + workflow) | Actions-minuter | **Pröva** som reserv om Checkly inte väljs. |
| Upptime | Drifttid och publik statussida | — | Låg. Kortaste intervall är 5 minuter, och ett publikt repo krävs för gratis statussida, vilket exponerar kundlistan. Vid 5 minuters intervall blir det cirka 8 640 körningar per månad, vilket spräcker 2 000 fria minuter i ett privat repo om varje körning debiteras med minst en minut | — | — | **Avstå.** |
| Gatus | Drifttid som konfiguration | — | Bra modell men ytterligare en server att drifta | — | Hosting | **Bevaka.** |
| OpenStatus | Status och incidenthantering | — | AGPL-3.0, tyngre än behovet | — | — | **Bevaka** (AGPL-flagga vid självhosting med modifieringar). |
| Cloudflare Health Checks | Drifttid | — | Ingår inte i Free; inriktad på origin-skydd | — | Kräver Pro | **Avstå.** |
| UptimeRobot (gratis) | Drifttid | — | Gratisplanen är avsedd för hobby och ideellt bruk | — | — | **Avstå** för kommersiellt bruk. |
| Cloudflare Web Analytics | Besök och källor | Mätning i egen regi utan kakor | Hög: redan i stacken, gratis, GraphQL för rapporter. Begränsningar: mjukt tak på 10 sajter per konto (kontakta support), bara 6 månaders historik, sampling, och Cloudflare är en amerikansk leverantör (allmänt känt, inte källbelagt här) | Runtime | Gratis | **Ta in** som bas. Spara en månadsögonblicksbild per kund i Git så att jämförelser år för år blir möjliga. |
| Plausible Cloud (Business) | Besök, mål och e-postrapporter | Mätning utan kakor, EU-hosting | Hög för kunder som vill ha egna rapporter. Stats API kräver Business (19 USD/mån vid 10 000 sidvisningar totalt) | Runtime | 9–19 USD/mån och uppåt | **Pröva** om Cloudflare Web Analytics inte räcker (till exempel för händelser som tel-klick). AGPL-flaggan gäller bara självhostad CE. |
| Umami självhostad (EU-region) | Besök och API för alla sajter | Mätning utan kakor | Hög kontroll, MIT och obegränsat antal sajter, men ytterligare en databas att drifta | Runtime | Hosting | **Pröva** som alternativ till Plausible. Umami Cloud har ingen EU-only-garanti, vilket är en GDPR-fråga. |
| Plausible- och Umami-MCP:er | Agentåtkomst | — | Små repon; Sentrys är märkt non-production | — | — | **Avstå.** Gå direkt mot API:t från rapportskillen. |
| GA4 | — | — | Kräver samtycke, IMY:s beslut 2023 visar risken, och banners kritiseras | — | — | **Avstå** som standard. Bevaka bara för annonskunder. |

- **Juridisk risktrappa (inferens, ej juridisk rådgivning):**
  1. Lägst exponering mot art. 5.3: aggregerad räkning på serversidan i den Worker som levererar sajten, utan klientskript. Detta kräver en juridisk kontroll, eftersom EDPB behandlar IP-baserad spårning som ett eget fall (¶54).
  2. Mätning utan kakor och med EU-hosting (Plausible, Umami självhostad i EU).
  3. Cloudflare Web Analytics (utan kakor, men JS-beacon och amerikansk leverantör).
  4. GA4 (kräver banner och innebär tredjelandsfrågor).
  
  Om EDPB ¶33 tillämpas strikt kan även kakfria JS-beacons kräva samtycke, eftersom PTS inte räknar statistik som "nödvändig". Om rådets Omnibus-text antas skulle steg 1–2 sannolikt hamna inom ett uttryckligt undantag. Gör en kort integritetsbedömning per kund och var beredd att slå på samtycke om tolkningen skärps.
- **Formulärövervakning (destillera):** Playwright fyller i formuläret med en testmarkör, varefter Workern tar emot inskicket och Email Routing levererar mejlet till en testadress. Adressen kan vara en Resend-mottagningsadress, och kontrollen läser sedan via Resends Receiving API att mejlet kom fram. På så sätt testas hela kedjan dagligen. Larmet ska vara åtgärdbart enligt SRE ("Every page should be actionable"). Riktiga inskick räknas bara som antal i Workern, utan innehåll, för att följa principen om dataminimering.
- **Statuskommunikation (destillera):** inga publika statussidor per kund, eftersom hantverkskunder sällan behöver dem och de exponerar kundlistan. I stället skickas proaktivt mejl via Resend vid incidenter som varar längre än 15 minuter, i linje med Upptimes brusgräns på 15 minuter. Statussidan i UptimeFlare blir intern och lösenordsskyddad för ägaren, och månadsrapporten redovisar mot den publicerade SLO:n.
- **Domänutgång:** eftersom Oderland saknar ett känt API är Uptime Kumas monitor för domänutgång, som bygger på RDAP, det enklaste skyddet mot att en kunddomän löper ut.

### Gaps
- Texten i LEK (2022:482) 9 kap. 28 § gick inte att hämta ordagrant; både riksdagen.se och rkrattsbaser trunkerade lagtexten före kapitel 9. Undantagets exakta lydelse är därför inte citerad.
- Inget uttalande från PTS eller IMY specifikt om kakfri analys (Plausible, Cloudflare Web Analytics, Umami) hittades. Det är inte bevis för att något sådant saknas, eftersom sökbudgeten tog slut.
- Om Latombe överklagade till EU-domstolen, och hur Coreper beslutade om Omnibus den 11 oktober 2026, verifierades inte.
- Cloudflare Web Analytics: om anpassade händelser (tel-klick, formulär) stöds, och hur IP hanteras för JS-beacons, framgår inte av de sidor som lästes.
- Checklys datalagringsplats och personuppgiftsbiträdesavtal, samt UptimeRobots faktiska villkorstext, verifierades inte mot primärkälla.
- Vilka Railway-regioner som finns (för EU-hosting av Uptime Kuma eller Umami) verifierades inte.

## 3. Hur håller byråer med många statiska sajter beroenden och säkerhet uppdaterade (Renovate-presets, monorepo eller ett repo per kund, delade temapaket) – och vad säger evidensen om takt och risk? (inklusive backup och rollback)

### Takeaway
Renovate via den gratis Mend-hostade appen ger obegränsat antal privata repon och kör var fjärde timme. Med ett delat preset-repo (`github>nortropic/renovate-config`) kan Nortropic styra uppdateringen av N kundrepon med en enda policy. Policyn bör kombinera `config:best-practices`, gruppering av icke-major-uppdateringar, schemaläggning, automerge bakom gröna CI-kontroller och en karenstid (`minimumReleaseAge`) på cirka 7 dagar. Säkerhetsuppdateringar passerar karenstiden automatiskt.

Evidensen pekar åt samma håll. 8 av 10 granskade attacker mot leveranskedjan var aktiva i mindre än en vecka. Cirka 95 procent av nedladdade sårbara komponenter hade redan en åtgärdad version. CISA:s larm om Shai-Hulud (september 2025) visar att risken för en byrå med statiska sajter främst sitter i hemligheter i bygget och CI, inte i sajten när den körs. Om monorepo eller ett repo per kund är bäst hittades ingen direkt evidens; rekommendationen nedan är en inferens. Backup och rollback täcks av Git, Workers versionshistorik (100 versioner) och DNS som kod.

### Cited Findings

**Renovate**
- Den Mend-hostade Renovate-appen beskrivs som "A generous free tier, available for all across an unlimited number of public and private repositories". Aktiva repon schemaläggs "Every 4 hours", med 1 samtidigt jobb per organisation, 1 vCPU, 3 GB minne och 30 minuters timeout. Merge Confidence-arbetsflöden ingår inte — [Renovate docs: Mend-hosted](https://docs.renovatebot.com/mend-hosted/overview/)
- Självhostad Mend Renovate Community är begränsad till 10 repon med den medföljande nyckeln. En gratis nyckel för obegränsat antal repon kan sökas — [Mend](https://www.mend.io/mend-renovate-community/)
- Delade presets: ett repo med `default.json` refereras som `"github>owner/name"`. Presetet läses från standardgrenen och kan pinnas med en tagg (`github>abc/foo#1.2.3`). Sidan beskriver hur en preset delas mellan många repon så att ändringar görs på ett ställe — [Renovate docs: Shareable presets](https://docs.renovatebot.com/config-presets/)
- `config:recommended` innehåller bland annat `:dependencyDashboard`, `group:monorepos` och `group:recommended`. `config:best-practices` lägger till `docker:pinDigests`, `helpers:pinGitHubActionDigests`, `:configMigration`, `:pinDevDependencies`, `abandonments:recommended`, `security:minimumReleaseAgeNpm` ("Wait until the npm package is three days old") och `:maintainLockFilesWeekly` — [Renovate docs: config presets](https://docs.renovatebot.com/presets-config/)
- Om brusreducering: "We recommend that you enable automerge for any type of dependency update where you would select Merge anyway". "Automerge works particularly well for `devDependencies` and for production `dependencies` that have great test coverage". Med `automergeType: "branch"` slipper man pull requests. Schemat har en granularitet på minst en timme och standardtidszonen är UTC. Docs varnar för att gruppering "can also cause problems", eftersom en grupp som fallerar blockerar övriga uppdateringar i gruppen — [Renovate docs: Noise reduction](https://docs.renovatebot.com/noise-reduction/)
- Om `minimumReleaseAge`: väntetiden gäller per version. Ett tillförlitligt tidsstämpel från registret krävs ("To prevent supply-chain attacks"). Exemplet i docs använder 14 dagar, och det rekommenderas att sätta samma policy "in **both** your Renovate and package manager configuration". "Security updates bypass any `minimumReleaseAge` checks". `internalChecksFilter=strict` rekommenderas — [Renovate docs: Minimum release age](https://docs.renovatebot.com/key-concepts/minimum-release-age/)

**Dependabot**
- Dependabot stöder `groups` (med `applies-to`, `patterns` och `update-types`) och `cooldown` (`default-days` och `semver-major/minor/patch-days`). Om ingen cooldown anges gäller 3 dagar som standard, och säkerhetsuppdateringar undantas. Schemat kan vara `daily`, `weekly`, `monthly`, `quarterly`, `semiannually`, `yearly` eller `cron` — [GitHub Docs: Dependabot options](https://docs.github.com/en/code-security/dependabot/working-with-dependabot/dependabot-options-reference)

**Evidens om takt och risk**
- William Woodruff (2025-11-21) granskade tio attacker mot leveranskedjan och deras "window of opportunity": xz-utils cirka 5 veckor, Ultralytics 12 respektive 1 timme, tj-actions 3 dagar, chalk under 12 timmar, Nx 4 timmar, rspack 1 timme, num2words under 12 timmar, Kong cirka 10 dagar och web3.js 5 timmar. "8/10 attacks had windows of opportunity of less than a week", och "Setting a cooldown of 7 days would have prevented the vast majority" — [yossarian.net](https://blog.yossarian.net/2025/11/21/We-should-all-be-using-dependency-cooldowns)
- Stöd för karenstid i verktygen: pnpm `minimumReleaseAge` från version 10.16 (september 2025), npm `min-release-age` från 11.10.0 (februari 2026), Dependabot cooldowns från juli 2025 och Renovate `minimumReleaseAge` sedan länge. Snyk använder fast 21 dagar, och zizmor varnar vid 7 dagar. Källan har interna datuminkonsekvenser och bör verifieras mot respektive verktyg — [nesbitt.io](https://nesbitt.io/2026/03/04/package-managers-need-to-cool-down.html)
- CISA (2025-09-23) om Shai-Hulud: "over 500 packages" komprometterades, och masken samlade in GitHub-tokens och moln-API-nycklar. CISA rekommenderade att pinna versioner till releaser från före 2025-09-16, rotera credentials, kräva phishing-resistent MFA, ta bort onödiga GitHub Apps och aktivera grenskydd, Secret Scanning och Dependabot security updates — [CISA](https://content.govdelivery.com/accounts/USDHSCISA/bulletins/3f408db)
- Sonatype (2025-12-10): "about 95% of vulnerable components downloaded already had a safer version available", medan bara cirka 0,5 procent saknade en åtgärd. Orsakerna är bland annat beroenden som sätts upp och sedan glöms bort, och transitiva beroenden utan tydlig ägare — [Sonatype](https://www.sonatype.com/blog/unnecessary-risk-the-persistence-of-open-source-vulnerabilities)
- DORA: tunga godkännanden från externa parter "have a negative impact on software delivery performance", och "no evidence was found" att formell extern granskning sänker andelen misslyckade ändringar. Rekommendationen är peer review plus automation (sidan uppdaterad 2025-10-30) — [DORA: Streamlining change approval](https://dora.dev/capabilities/streamlining-change-approval/)

**Plattform och delat tema**
- Astros LICENSE är MIT. GitHubs metadata visar "Other" eftersom filen även innehåller MIT-notiser från Vite och SvelteKit — [LICENSE](https://github.com/withastro/astro/blob/main/LICENSE)
- Cloudflare köpte Astro i januari 2026 med beskedet "Astro will remain open source". Astro ska vara bäst "whether they host on Cloudflare or elsewhere", och Astro 6 gick i beta samma vecka — [Business Wire, 2026-01-16](https://secure.businesswire.com/news/home/20260116386991/en/Cloudflare-Acquires-Astro-to-Accelerate-the-Future-of-High-Performance-Web-Development)
- Changesets: "A tool to manage versioning and changelogs with a focus on monorepos" — [GitHub](https://github.com/changesets/changesets)

**Backup, rollback och DNS**
- Workers rollback: "You can only roll back to the 100 most recently published versions". Kommandot är `wrangler rollback`, och rollback finns även i dashboarden. "Resources connected to your Worker will not be changed during a rollback". Rollback blockeras om målversionen binder resurser som inte längre finns — [Cloudflare docs: Rollbacks](https://developers.cloudflare.com/workers/configuration/versions-and-deployments/rollbacks/)
- DNSControl: CLOUDFLAREAPI har officiellt stöd som DNS-leverantör men inte som registrar. Loopia stöds som både DNS-leverantör och registrar. Oderland och cPanel saknas i leverantörslistan — [DNSControl providers](https://docs.dnscontrol.org/provider/index)
- Oderlands supportkategori har artiklar om DNS-poster, byte av namnservrar och export av zonfil. Något API nämns inte — [Oderland support](https://www.oderland.se/support/en/kategori/domains-and-dns/)

**GitHub-data (verifierad 2026-10-13)**

| Repo | ★ | Licens | Senaste push | Not |
|---|---|---|---|---|
| [renovatebot/renovate](https://github.com/renovatebot/renovate) | 22 738 | **AGPL-3.0** | 2026-10-13 | — |
| [dependabot/dependabot-core](https://github.com/dependabot/dependabot-core) | 5 805 | MIT | 2026-10-13 | — |
| [changesets/changesets](https://github.com/changesets/changesets) | 12 478 | MIT | 2026-10-11 | — |
| [withastro/astro](https://github.com/withastro/astro) | 63 205 | MIT (metadata: Other) | 2026-10-13 | — |
| [cloudflare/workers-sdk](https://github.com/cloudflare/workers-sdk) (Wrangler) | 4 616 | Apache-2.0 | 2026-10-13 | — |
| [DNSControl/dnscontrol](https://github.com/DNSControl/dnscontrol) | 3 969 | MIT | 2026-10-12 | Flyttat från StackExchange |
| [octodns/octodns](https://github.com/octodns/octodns) | 3 773 | MIT | 2026-10-12 | — |
| [cloudflare/cf-terraforming](https://github.com/cloudflare/cf-terraforming) | 1 409 | MPL-2.0 | 2026-10-04 | Exporterar befintlig Cloudflare-konfiguration |
| [lycheeverse/lychee](https://github.com/lycheeverse/lychee) | 4 004 | Apache-2.0 | 2026-10-13 | Länkkontroll |
| [GoogleChrome/lighthouse-ci](https://github.com/GoogleChrome/lighthouse-ci) | 7 110 | Apache-2.0 | 2026-03-27 | Långsam takt 2026 |
| [harlan-zw/unlighthouse](https://github.com/harlan-zw/unlighthouse) | 4 893 | MIT | 2026-10-11 | Lighthouse för hela sajten |

### Inferences

**Domar – uppdateringar, kvalitetsgrindar och backup**

| Kandidat | Lucka | Förankring | Passform | Typ | Kostnad | Dom – motivering |
|---|---|---|---|---|---|---|
| Renovate (Mend-hostad app) + delat preset-repo | Beroenden och säkerhet i N repon | DORA (små batcher, automation), karenstid (Woodruff), `config:best-practices` | Hög. En policy styr alla kunder, och Dependency Dashboard ger ägaren överblick | Runtime (appen) + destillera (policyn) | Gratis | **Ta in.** AGPL påverkar inte användning av den hostade appen (inferens, se Gaps). |
| Dependabot (version updates) | Samma | — | Konfigureras per repo och saknar central preset; dubbla PR:er om båda körs | — | Gratis | **Avstå** för version updates. Behåll GitHubs sårbarhetslarm (detektion), som CISA rekommenderar. |
| Karenstid i pakethanteraren (`minimumReleaseAge` i pnpm, `min-release-age` i npm) | Försvar mot leveranskedjeattacker även vid manuella och agentdrivna installationer | Woodruff; Renovate-docs ("both") | Hög. Skyddar även när en agent kör `install` | Destillera | Gratis | **Ta in** (7 dagar). |
| Changesets för det delade temapaketet | Versionering och changelog för temat | Semantisk versionering | Hög när temat blir ett eget paket | Runtime (CI) | Gratis | **Pröva** när temapaketet skapas. |
| lychee + Playwright-smoke (+ Unlighthouse vid behov) | Kvalitetsgrind som gör automerge säker | "great test coverage"-villkoret i Renovates rekommendation | Hög | Runtime (CI) | Gratis | **Ta in** lychee och smoke-tester; **Pröva** Unlighthouse; **Bevaka** Lighthouse CI (långsam takt). |
| Workers rollback (`wrangler rollback`) | Återställning | ITIL incident management, DORA failed deployment recovery time | Inbyggt | Runtime | Gratis | **Ta in.** Skriv in i runbooken att rollback alltid görs först när en incident följer direkt på en deploy. |
| DNSControl (Cloudflare-leverantören) | DNS som kod: backup och ändringslogg | Infrastruktur som kod | Kräver att kundzoner ligger på Cloudflares namnservrar. Registreringen kan ligga kvar hos Oderland | Runtime (CI) | Gratis | **Pröva.** |
| octodns, cf-terraforming | Samma | — | Alternativ, respektive engångsexport (MPL-2.0) | — | — | **Bevaka.** |

- **Skiss på delad preset** (ej validerad, kontrollera optionsnamnen mot Renovate-dokumentationen):
  ```json
  {
    "extends": ["config:best-practices"],
    "timezone": "Europe/Stockholm",
    "minimumReleaseAge": "7 days",
    "schedule": ["* 0-5 * * 1"],
    "packageRules": [
      { "matchUpdateTypes": ["minor", "patch"], "groupName": "icke-major", "automerge": true, "automergeType": "branch" },
      { "matchUpdateTypes": ["major"], "schedule": ["* 0-5 1-7 * 1"], "dependencyDashboardApproval": true }
    ]
  }
  ```
  Vecko-PR:er för icke-major-uppdateringar mergas automatiskt när bygge, lychee och Playwright-smoke är gröna. Major-uppdateringar hanteras en gång i månaden som normal ändring, med agentens analys och ägarens godkännande. Säkerhetsuppdateringar kommer direkt eftersom de passerar karenstiden.
- **Repostruktur (inferens):** ett repo per kund (= ett pm3-förvaltningsobjekt per kund) plus ett versionerat temapaket (Changesets) och ett delat Renovate-preset.
  - Skäl 1: en felaktig temarelease når inte alla kunder samtidigt. Temat rullas först ut till de fasta testkunderna och sedan till resten, när Renovate höjer versionen.
  - Skäl 2: åtkomst per kund. CMS-medarbetare och GitHub-behörigheter avgränsas per repo.
  - Skäl 3: Workers Builds, previews och rollback är redan per Worker.
  - Ett monorepo ger atomära temauppdateringar men samlar all risk i varje merge.
- **Risken i en statisk stack (inferens):** sajten kör nästan ingen kod hos besökaren. Huvudrisken ligger därför i CI och byggsteget, alltså tokens och API-nycklar, vilket är exakt vad Shai-Hulud stal. Det leder till fyra åtgärder: Cloudflare-tokens med smal behörighet per Worker eller zon, pinnade digests för GitHub Actions (ingår i `best-practices`), MFA och att hemligheter aldrig exponeras för agentens prompt.
- **Backup (inferens):**
  - Kod och innehåll ligger i Git, och en spegling till en andra remote bör övervägas eftersom GitHub annars är en enda felpunkt.
  - Deployer kan återställas via Workers versionshistorik.
  - DNS versionshanteras i ett DNSControl-repo.
  - Formulärinskick lagras inte alls (de levereras bara som mejl), vilket minskar både backupbehovet och GDPR-ytan.

### Gaps
- Ingen källa hittades om hur byråer faktiskt väljer mellan monorepo och ett repo per kund för många småsajter (sökbudgeten tog slut). Rekommendationen ovan är en inferens.
- Datadog Security Labs artikel om karenstid (2026-04-16, "post-axios world") hittades, men brödtexten gick inte att läsa.
- Om Workers Builds stöder rotkataloger och bevakade sökvägar i monorepo verifierades inte.
- Hur AGPL påverkar användning av den hostade Renovate-appen är inte källbelagt (inferens: AGPL:s skyldigheter gäller den som modifierar och tillhandahåller programvaran).
- Ingen kvantitativ evidens hittades som gäller specifikt Astro och statiska sajter.

## 4. Vilka arbetsflöden för ändringsärenden och godkännande finns för agentdriven sajtförvaltning – och vad säger pm3, ITIL 4, SRE och DORA om ändringshantering, roller och tjänstenivåer som en enmansbyrå kan förenkla? (inklusive innehållslager per kund)

### Takeaway
Det går att bygga en loop med nästan inga manuella moment, och alla delar har officiellt stöd:

1. Kunden mejlar (Email Routing till en Email Worker) eller skickar SMS (46elks webhook).
2. Ett GitHub-ärende skapas.
3. Claude Code GitHub Action skapar en PR.
4. Workers Builds bygger en förhandsversion och postar URL:en i PR:en.
5. Förhandsversionen visas bakom Cloudflare Access.
6. Ägaren godkänner, och vid behov även kunden.
7. Merge innebär publicering, och rollback sker via versionshistoriken.

Innehållet bör ligga i Astro content collections med Zod-scheman, så att ogiltigt innehåll stoppar bygget. Pages CMS kan erbjudas som valfri självservice, eftersom kunder kan bjudas in via e-post utan GitHub-konto.

ITIL 4 ger ändringstyperna: change enablement med standard, normal och akut ändring, där "change authority" kan vara en automatiserad mekanism. DORA visar att lätta godkännanden plus automation fungerar bättre än externa CAB. pm3 ger begreppen förvaltningsobjekt, objektägare och förvaltningsplan. För en enmansbyrå slås rollerna ihop: kunden är objektägare, Johnny är förvaltningsledare och change authority för normala ändringar, CI är change authority för standardändringar, och agenterna utgör förvaltningsgruppen.

### Cited Findings

**Intag (e-post och SMS)**
- Cloudflare Email Workers tar emot inkommande mejl i `email()`-hanteraren och kan vidarebefordra med `message.forward(…)` eller svara med ett nytt mejl via `env.EMAIL.send`. Email Routing är "Available on Free and Paid plans", och Email Sending (beta) finns på Workers Paid — [Cloudflare docs: Email Workers](https://developers.cloudflare.com/email-routing/email-workers/)
- Resend kan ta emot mejl på en `<id>.resend.app`-adress eller en egen domän via MX. Inkommande mejl parsas och skickas som `POST` till en webhook. Fullt innehåll ("HTML, text, headers") hämtas via Receiving API, och bilagor ges som metadata plus tillfälliga nedladdnings-URL:er. Funktionen nås också via Resends MCP — [Resend docs: Receiving](https://resend.com/docs/dashboard/receiving/introduction.md). Resend Inboxes (trådar och agentinkorgar) "are currently in private beta" — [Resend docs](https://resend.com/docs/webhooks/inboxes/email-received)
- 46elks: parametern `sms_url` sätts på ett virtuellt nummer, och inkommande SMS skickas som `POST` med fälten `id`, `from`, `to`, `message`, `created` och `direction`. Svaret måste vara HTTP 200–204, annars görs omförsök i minst 6 timmar och minst 5 gånger. Ett svars-SMS kan läggas direkt i svarskroppen — [46elks docs](https://46elks.com/docs/receive-sms). Ett virtuellt nummer kostar 3 EUR per månad exklusive moms — [46elks pricing](https://46elks.com/pricing). Bolaget heter 46elks AB och använder ett svenskt +46-nummer — [46elks](https://46elks.com/products/two-way-sms)

**Utförande (agent)**
- Claude Code GitHub Action:
  - Interaktivt läge reagerar på `@claude` i ärenden och PR:er. Automationsläget körs när en `prompt` finns, och prompten kan vara en skill som anropas med `/skill-name`.
  - "Write access: on issue and pull request events, the triggering user must have write access", om man inte sätter `allowed_non_write_users`.
  - "Human actor … rejects a bot actor unless you list it in `allowed_bots`".
  - För organisationer: installera appen på organisationsnivå, lägg hemligheten som organisationshemlighet och definiera jobbet som ett återanvändbart workflow. För delade hemligheter rekommenderas en API-nyckel, eftersom en OAuth-token "is tied to the subscription of the person who ran `claude setup-token`".
  - Kostnaden består av Actions-minuter plus API-tokens och kan begränsas med `--max-turns`.
  - Schemalagda workflows körs bara från standardgrenen och stängs av efter 60 dagars inaktivitet i publika repon.
  - Commits gjorda med standard-`GITHUB_TOKEN` triggar inte CI.
  
  — [Claude Code docs: GitHub Actions](https://code.claude.com/docs/en/github-actions)
- GitHub Agentic Workflows (gh-aw) är "in Public Preview" och utvecklas av GitHub och Microsoft. Det stöder motorerna Copilot, Claude Code (`engine: claude`), Codex och Gemini. Agenten arbetar med en read-only-token, och "All outputs are validated before applied" via safe outputs och hotdetektering — [gh-aw](https://github.github.com/gh-aw/)

**Förhandsvisning, godkännande och publicering**
- Workers Builds kopplar en Worker till Artifacts, GitHub eller GitLab. Byggen från andra grenar än produktionsgrenen "create or update a Preview", och "Supported external providers can also post the URL as a pull request comment" — [Cloudflare docs: Workers Builds](https://developers.cloudflare.com/workers/ci-cd/builds/)
- Version URLs har formatet `<version-prefix>-<worker-name>.<subdomain>.workers.dev`. Alias skapas med `wrangler versions upload --preview-alias`, och bara de 1 000 senaste aliasen sparas. Version URLs genereras inte för Workers med Durable Objects och fungerar bara på workers.dev. De är publika när de är aktiverade, och "To require visitors to sign in, use Cloudflare Access" — [Cloudflare docs: Previews](https://developers.cloudflare.com/workers/configuration/previews/)

**Innehållslager per kund**
- Astro content collections definieras i `src/content.config.ts` med inladdarna `glob()` och `file()`. "Schemas enforce consistent frontmatter or entry data within a collection through Zod validation", och ett schemabrott ger ett fel i bygget. Live collections kräver en adapter — [Astro docs](https://docs.astro.build/en/guides/content-collections/)
- **Pages CMS:** "Collaborators are invited by email", och funktionen är avsedd för personer som "does not have a GitHub account". Skrivningar görs med GitHub Appens installationstoken. Medarbetare kan inte ändra `.pages.yml` eller hantera andra medarbetare — [Pages CMS docs](https://pagescms.org/docs/configuration/collaborators/). "There is no separate CMS database for content"; konfigurationen ligger i `.pages.yml` — [Pages CMS docs](https://pagescms.org/docs/)
- **Keystatic** i GitHub-läge: medarbetare "will need `write` access to this repository", och värden måste kunna köra Node.js för API-routes — [Keystatic docs](https://keystatic.com/docs/github-mode). En adapter krävs för driftsättning — [Keystatic: Astro](https://keystatic.com/docs/installation-astro)
- **TinaCMS / Tina Cloud:** Free kostar 0 USD för 2 användare. Team kostar 24 USD per projekt och månad (3 användare ingår, upp till 10), Team Plus 41 USD och Business 249 USD per projekt och månad — [Tina pricing](https://tina.io/pricing)

**Förvaltningsmodell: pm3**
- "Pm3 är en styr- och samverkansmodell", "lanserades 2006" och ägs av På i Sverige AB. Modellen "används främst för förvaltningsstyrning, verksamhetsutveckling och förändringshantering". Dess byggstenar är ansvarsområde, uppdrag, organisering ("Roller, ansvar och forum för att styra, leda och genomföra") och samordning — [pm3.se: Om pm3](https://pm3.se/om-pm3/). Modellbeskrivningen måste beställas ("Beställ här"), och "En ny version av pm3 lanseras årligen" — [pm3.se](https://www.pm3.se/)
- Norrbottens e-nämnd har gjort "en förenklad förvaltningsmodell av Pm3, en så kallad adaption" (version 1.10, 2021-05-11). Rollerna där är:
  - Objektägare (som också utgör styrgrupp): "Alla beslut inom ramen för förvaltning tas ytterst av Styrgrupp".
  - Objektsledare/förvaltare: tar fram och genomför förvaltningsplanen och rapporterar felhantering och återställningstider.
  - Objektspecialist: förstalinjesupport och insamling av ändringsönskemål.
  - Superanvändare: "stödet till medarbetarna".
  - Beställare och leverantör.
  
  Huvuduppdragen är att vidmakthålla och vidareutveckla — [Förvaltningsstruktur socialtjänsten (PDF)](https://skolor.lulea.se/download/18.2b7bdc7f183d5df682e3d229/1655906818358/F%C3%B6rvaltningsstruktur%20socialtj%C3%A4nsten.pdf)
- Högskolan i Skövdes förvaltningsmodell (2023-05-30): "Ett förvaltningsobjekt består av verksamhetskomponenter och IT-komponenter". Det finns två objektägare (verksamhet och IT) och två förvaltningsledare (FLV och FLIT). "Varje år ska en förvaltningsplan sammanställas", med treåriga mål och budget — [HiS (PDF)](https://www.his.se/link/2165e935b72f43e6b251545ce1c18556.aspx)

**Förvaltningsmodell: ITIL 4**
- Change enablement har syftet "to maximize the number of successful service and product changes by properly assessing risks, authorizing changes to proceed, and managing the change schedule". En ändring definieras som "the addition, modification, or removal of anything that could have a direct or indirect effect on services". Båda formuleringarna citeras ur ITIL 4 Change Enablement Practice Guide (PeopleCert) — [AWS whitepaper](https://docs.aws.amazon.com/wellarchitected/latest/change-enablement-in-the-cloud/change-enablement-in-itil4.html)
- Ändringstyperna enligt sekundärkälla: "Standard changes are pre-approved, low-risk, and repeatable changes". "Normal changes require risk assessment and approval". "Emergency changes are time-sensitive, urgent changes". En Change Authority är "the person, team, or automated mechanism responsible for assessing and authorizing", och man ska tilldela godkännanderätt "according to risk rather than routing every change through a central board" — [ITSM.tools (S. Danby, 2026)](https://itsm.tools/change-enablement/)
- Syften för övriga praktiker:
  - Service level management: "to set clear business-based targets for service levels".
  - Monitoring and event management: "to support the normal operation of service components".
  - Incident management: "to minimize the negative impact of incidents".
  - Service request management: "to support the agreed quality of a service".
  - Service desk: "to capture demand for incident resolution and service requests", som enda kontaktpunkt.
  - Release management: "to make new and changed services and features available for use".
  
  — [ITSM.tools (2026-01-13)](https://itsm.tools/?p=27615)

**Förvaltningsmodell: DORA och SRE**
- DORA:s fem mått är change lead time, deployment frequency, failed deployment recovery time, change fail rate och deployment rework rate. Breda målsättningar "increases the likelihood that teams will try to game the metrics", och måtten "are meant to be applied at the application or service level" (sidan uppdaterad 2026-01-05) — [DORA metrics](https://dora.dev/guides/dora-metrics/)
- DORA om godkännanden: "change approvals are best implemented through peer review during the development process, supplemented by automation" — [DORA](https://dora.dev/capabilities/streamlining-change-approval/)
- DORA 2024: AI-adoption "negatively impacts software delivery stability and throughput", medan "fundamentals like small batch sizes and robust testing remain crucial" — [DORA 2024](https://dora.dev/research/2024/dora-report/). DORA 2025: "AI's primary role is as an amplifier, magnifying an organization's existing strengths and weaknesses" — [DORA 2025](https://dora.dev/research/2025/dora-report/)
- SRE om toil: arbete som är "manual, repetitive, automatable, tactical, devoid of enduring value" och som "scales linearly as a service grows". Målet är att hålla toil "below 50% of each SRE's time" — [Google SRE book: Eliminating toil](https://sre.google/sre-book/eliminating-toil/)

**GitHub-data (verifierad 2026-10-13)**

| Repo | ★ | Licens | Senaste push | Not |
|---|---|---|---|---|
| [anthropics/claude-code-action](https://github.com/anthropics/claude-code-action) | 9 494 | MIT | 2026-10-09 | Officiell |
| [github/gh-aw](https://github.com/github/gh-aw) | 5 387 | MIT | 2026-10-13 | Public preview |
| [n8n-io/n8n](https://github.com/n8n-io/n8n) | 207 252 | **"Other" (fair-code)** | 2026-10-13 | Redan i Nortropics stack |
| [palhamel/46elks-mcp-server](https://github.com/palhamel/46elks-mcp-server) | 0 | MIT | 2026-10-07 | — |
| [hunvreus/pagescms](https://github.com/hunvreus/pagescms) | 4 084 | MIT | 2026-10-07 | Har topicen astro |
| [Thinkmill/keystatic](https://github.com/Thinkmill/keystatic) | 2 450 | MIT | 2026-10-01 | — |
| [decaporg/decap-cms](https://github.com/decaporg/decap-cms) | 19 426 | MIT | 2026-10-13 | — |
| [sveltia/sveltia-cms](https://github.com/sveltia/sveltia-cms) | 2 948 | MIT | 2026-10-13 | "Successor to Netlify/Decap CMS" |
| [sveltia/sveltia-cms-auth](https://github.com/sveltia/sveltia-cms-auth) | 169 | MIT | 2026-10-11 | GitHub-auth som Cloudflare Worker |
| [tinacms/tinacms](https://github.com/tinacms/tinacms) | 13 827 | Apache-2.0 | 2026-10-13 | Tina Cloud är kommersiell |

### Inferences

**Föreslaget ändringsflöde (destilleras till skillen "förvaltning")**
1. **Intag (ITIL service desk = en kontaktpunkt):** `ändra@<kunddomän>` via Email Routing till en Email Worker, eller kundens SMS till ett 46elks-nummer via webhook. Avsändaren kontrolleras mot kundens registrerade kontakter. Okända avsändare skickas vidare till Johnny och skapar inget ärende.
2. **Ärende:** Workern skapar ett GitHub-ärende i kundens repo med en etikett (`ändring`) och en rensad brödtext. Personuppgifter som rör kundens egna kunder tas bort. **Viktigt:** ärenden som skapas av en bot avvisas av claude-code-action om boten inte står i `allowed_bots`.
3. **Klassning (ITIL change types):** agenten klassar ärendet som standard, normal eller akut enligt katalogen nedan. Allt som är osäkert räknas som normal ändring.
4. **Utförande:** claude-code-action kör i automationsläge med skillen som prompt och begränsade `--allowedTools`. För standardändringar får agenten bara skriva i `src/content/`. Resultatet är en PR.
5. **Förhandsvisning:** Workers Builds skapar en förhandsversion och postar URL:en i PR:en. Förhandsversionen skyddas med Access.
6. **Godkännande (change authority):**
   - Standardändring: gröna kontroller (bygge med Zod-validering, lychee, Playwright-smoke) räcker, följt av auto-merge eller ett klick från Johnny.
   - Normal ändring: Johnny godkänner, och kunden ser förhandsversionen när budskap eller erbjudande påverkas.
   - Akut ändring: Johnny godkänner direkt i mobilen, och kunden informeras efteråt.
7. **Publicering och uppföljning:** merge till produktionsgrenen ger en deploy. Kunden får en kort bekräftelse via Resend, och ändringen loggas till månadsrapporten.

**Ändringskatalog (förslag)**

| Typ (ITIL) | Exempel | Change authority | Kundens roll |
|---|---|---|---|
| Standard (förhandsgodkänd) | Text- eller bildbyte i befintlig samling, öppettider, prislista, nyhetsinlägg, patch- och minor-beroenden efter karenstid | Automatisk (CI-grindar) | Informeras i månadsrapporten |
| Normal | Ny sida, ändrad meny, nytt erbjudande, designändring, major-uppdatering av tema, DNS-ändring, recensionssvar på GBP | Johnny | Godkänner förhandsversionen vid innehållsändringar |
| Akut | Sajten nere, formulär trasigt, aktivt utnyttjad sårbarhet | Johnny (direkt) | Informeras efteråt |
| Service request | Ny CMS-medarbetare, ny vidarebefordringsadress | Mall eller agent | Begär själv |

**pm3-rollerna översatta till en enmansbyrå**

| pm3-roll (adaption) | Nortropic |
|---|---|
| Förvaltningsobjekt | Varje kundsajt (repo + Worker + zon + GBP-profil). Temapaketet är ett eget internt objekt. |
| Objektägare / styrgrupp | Kunden: beslutar om mål, budget (abonnemangsnivå) och större ändringar. Ett årligt förvaltningsmöte ersätter styrgruppen. |
| Objektledare / förvaltningsledare | Johnny: äger förvaltningsplanen, prioriterar och godkänner normala ändringar. |
| Objektspecialist / superanvändare | Kundens kontaktperson, som är registrerad avsändare av ärenden. |
| Förvaltningsgrupp / systemförvaltare | Agenterna: ändringsagenten, rapportagenten och övervakningsagenten. |
| Leverantör | Cloudflare, GitHub, Google, Resend och 46elks (underbiträden enligt GDPR). |
| Förvaltningsplan (årlig) | En sida per kund: mål (till exempel fler samtal), publicerade SLO:er, planerade förbättringar per kvartal och risker. |

**Tjänstenivåer – få och enkla (SRE: "as few SLOs as possible", internt mål strängare än det publicerade)**
- Tillgänglighet per månad ≥ 99,9 % enligt en extern black-box-kontroll, med internt mål 99,95 %.
- Formulär testas syntetiskt varje dag. Fel åtgärdas, eller kunden informeras, inom 1 arbetsdag.
- Ändringsärenden kvitteras automatiskt direkt. Standardändringar publiceras inom 2 arbetsdagar, och för normala ändringar finns en förhandsversion inom 5 arbetsdagar.
- Kritiska säkerhetsuppdateringar görs inom 2 arbetsdagar.
- DORA-måtten (ledtid från ärende till deploy, deployfrekvens, change fail rate, återställningstid, rework rate) räknas fram per förvaltningsobjekt ur GitHub och används för intern förbättring, inte som mål.
- Toil-regel: varje manuellt moment som återkommer mer än två gånger i månaden blir en automationskandidat (SRE-principen om under 50 procent toil, tillämpad på en person).

**Domar – intag, utförande och innehåll**

| Kandidat | Lucka | Förankring | Passform | Typ | Kostnad | Dom – motivering |
|---|---|---|---|---|---|---|
| Claude Code GitHub Action | Ärende till PR | DORA: peer review + automation; ITIL change enablement | Hög; officiell och Claude-native | Runtime | Actions-minuter + API-tokens (använd API-nyckel för organisationshemligheten) | **Ta in.** |
| Email Routing + Email Worker | Mejlintag | ITIL service desk | Hög; redan i stacken och gratis | Runtime | Gratis | **Ta in.** |
| Resend Receiving | Mejlintag med parsad text och bilagor | — | Hög; Resend finns redan i stacken | Runtime | Prissättningen för inkommande mejl är oklar | **Pröva** som alternativ när bilagor (till exempel bilder) behövs. **Bevaka** Inboxes (privat beta). |
| 46elks webhook | SMS-intag | ITIL service desk | Hög för hantverkare som hellre skickar SMS. Svensk leverantör | Runtime | 3 EUR/mån per nummer plus SMS-avgift | **Pröva.** **Avstå** från 46elks-MCP:n (0 ★); använd webhooken direkt. |
| Workers Builds previews + Access | Förhandsvisning och godkännande | ITIL normal change | Hög | Runtime | Ingår | **Ta in.** |
| gh-aw | Alternativ agentmotor med safe outputs | — | Public preview | — | Actions-minuter | **Bevaka.** |
| n8n | Lim mellan intag och ärende | — | Licensen är fair-code ("Other") och tjänsten är en server till att drifta | — | Hosting | **Bevaka.** Använd inte som kärna. |
| Astro content collections + Zod | Strukturerat innehållslager per kund | Git som enda sanningskälla; schemat som grind för agenten | Hög | Runtime | Gratis | **Ta in** som kanonisk modell. |
| Pages CMS | Valfri självservice för kunden | Git-baserat CMS | Hög; kunder bjuds in via e-post utan GitHub-konto. Den hostade appen innebär att en tredjepart får GitHub App-åtkomst, men självhosting är möjlig | Runtime | Gratis (MIT) | **Pröva** på en kund som vill redigera själv. |
| Sveltia CMS + sveltia-cms-auth | Samma | Git-baserat CMS | Auth via Workers passar stacken, men det är oklart om redaktörer behöver GitHub-konto | — | Gratis | **Bevaka.** |
| Keystatic | Samma | — | Redaktörer behöver skrivrätt i GitHub, och serverroutes krävs | — | Gratis/Cloud | **Avstå.** |
| Decap CMS | Samma | — | Sveltia har modernare UX och positionerar sig som efterträdare | — | Gratis | **Avstå.** |
| TinaCMS | Samma | — | Prissätts per projekt, vilket skalar dåligt till många kunder | — | 24 USD/projekt/mån och uppåt | **Avstå.** |
| pm3 (begrepp och roller) | Förvaltningsmodell | pm3 | Hög igenkänning i svensk offentlig sektor och Norrbotten | Destillera | Modellbeskrivningen är kommersiell | **Ta in (destillera)** begreppen. Köp modellbeskrivningen bara vid behov. |
| ITIL 4 (change enablement, SLM, monitoring, incident, service request, service desk) | Driftprocesser | ITIL 4 | Hög om den förenklas | Destillera | — | **Ta in (destillera).** |
| SRE (golden signals, åtgärdbara larm, SLO, toil) | Övervakning och tjänstenivåer | Google SRE | Hög | Destillera | — | **Ta in (destillera).** |
| DORA (fem mått, lätta godkännanden) | Mätning och godkännande | DORA | Hög | Destillera | — | **Ta in (destillera).** |

- **GDPR (inferens):** Nortropic behandlar personuppgifter för kundens räkning, till exempel ärendemejl, recensionssvar och formulärflöden. Nortropic är därför sannolikt personuppgiftsbiträde, och ett biträdesavtal (art. 28) bör ingå i förvaltningsavtalet med Cloudflare, GitHub, Anthropic, Resend och 46elks som underbiträden. Agenten ska inte kopiera uppgifter om kundens egna kunder in i ärenden eller commits.
- **Säkerhet (inferens):** kundmejl och SMS är otrustad indata. Avsändarlistan, verktygsbegränsningen till `src/content/` och den mänskliga grinden för allt utanför standardkatalogen är de tre spärrarna mot prompt injection.

### Gaps
- pm3:s egen modellbeskrivning är kommersiell och lästes inte. Rollnamnen kommer från offentliga adaptioner (Norrbottens e-nämnd och HiS). HiS-modellen hänvisar inte uttryckligen till pm3, och Köpings riktlinje från 2018 nämner inte pm3 alls.
- ITIL 4:s primärtexter (PeopleCert) lästes inte. Definitionerna kommer via sekundärkällor (ITSM.tools och AWS whitepaper med citat ur Practice Guide). Boken *Accelerate* (Forsgren, Humble & Kim 2018) lästes inte direkt; DORA:s webbsidor användes i stället.
- Email Workers: åtkomst till rå MIME och kropp samt storleksgränser verifierades inte. Det framgår inte heller om Workers Builds PR-kommentarer gäller GitHub uttryckligen ("supported external providers").
- Inloggningsmetod i Access för kunder utan konto, till exempel engångskod via e-post, verifierades inte.
- Pages CMS hostade app (villkor, datahantering, pris) och om Sveltia kräver GitHub-konto för redaktörer verifierades inte.

## 5. Vad bör en månadsrapport till kunden innehålla enligt god praxis (drifttid, besök, samtal och formulär, sökresultat, gjorda ändringar), och vilka verktyg kan ta fram den automatiskt?

### Takeaway
God praxis, i form av förvaltningsrapporter från WordPress-världen och SRE-principer, pekar på en kort månadsrapport som översätter mätvärden till affärsutfall. Den bör ta upp tillgänglighet och incidenter, utförda ändringar och uppdateringar, status för säkerhet och backup, prestanda och, viktigast för hantverkare, kontakter (samtal, formulär, vägbeskrivningar) samt synlighet i Google (GSC och GBP). Inget färdigt verktyg täcker Astro, Cloudflare, GBP och GSC på svenska. Det enklaste är ett schemalagt Claude Code-jobb som hämtar data från API:erna, skriver rapporten på svenska och skickar den via Resend, de första månaderna efter ägarens godkännande.

### Cited Findings
- InstaWP rekommenderar följande delar i en förvaltningsrapport:
  - Drifttid: procent (förslagsvis 99,9 % eller högre), antal avbrott med tidsstämplar och vidtagna åtgärder.
  - Uppdateringar: med versionsnummer, och vilka som var säkerhetsrelaterade.
  - Backup: frekvens, status och senaste backup.
  - Säkerhet: skanningar och patchar.
  - Prestanda: laddtider och TTFB.
  - Aktivitetslogg.
  - Valfritt: rekommendationer, kommande uppgifter och "wins".
  
  Månadsvis är vanligast. Artikeln avråder från rådatadumpar: "Don't just throw in a performance score. Translate it." (publicerad 2025-07-31, uppdaterad 2026-09-10) — [InstaWP](https://instawp.com/components-of-wordpress-maintenance-report/)
- ManageWP:s kundrapport innehåller rapporter från tillägg ("Updates, Backups, Analytics, WooCommerce, and more"), en "Custom Work Section to highlight your unique value" och anpassningsbar försättssida och intro. Premium kostar 1 USD per sajt och månad, eller 25 USD per månad för upp till 100 sajter, och ger white-label och schemalagt utskick varje vecka, varannan vecka eller varje månad — [ManageWP](https://managewp.com/features/client-report)
- Plausible skickar schemalagda e-postrapporter varje vecka (måndag) och/eller månad (den 1:a) och erbjuder delade dashboard-länkar. Man kan inte få PDF:er eller bygga egna rapporter — [Plausible for agencies](https://plausible.io/for-freelancers-agencies)
- GBP:s Performance API ger dagliga värden för `CALL_CLICKS`, `WEBSITE_CLICKS`, `BUSINESS_DIRECTION_REQUESTS` och visningar i Sök och Maps per enhet — [Google: DailyMetric](https://developers.google.com/my-business/reference/performance/rest/v1/DailyMetric) – samt månatliga visningar per sökord — [Google: Performance API](https://developers.google.com/my-business/reference/performance/rest)
- GSC: bekräftad data ("final") har 2–3 dagars fördröjning — [mcp-gsc README](https://github.com/AminForou/mcp-gsc) – och historiken sträcker sig cirka 16 månader bakåt — [Enrich Labs](https://www.enrichlabs.ai/blog/google-search-console-mcp-2026). mcp-gsc innehåller en färdig skill, `seo-weekly-report`, som ger en "Full 28-day performance summary with period-over-period comparison and top queries" — [mcp-gsc README](https://github.com/AminForou/mcp-gsc). seo-monster har `gsc_portfolio_summary` för en vy över många egendomar — [seo-monster README](https://github.com/avansaber/seo-monster)
- Cloudflare Web Analytics visar data för de senaste 6 månaderna — [Cloudflare FAQ](https://developers.cloudflare.com/web-analytics/faq/)
- Resend Free ger 3 000 mejl per månad (100 per dag) och 3 domäner. Pro kostar 20 USD per månad för 50 000 mejl och 10 domäner — [Resend pricing](https://resend.com/pricing)
- Claude Code Action har ett exempel på schemalagd rapport (`schedule: cron`, `prompt`, `--allowedTools`). Schemalagda körningar sker från standardgrenen — [Claude Code docs: GitHub Actions](https://code.claude.com/docs/en/github-actions)
- SRE: att publicera SLO:er sätter förväntningar, och "Users build on the reality of what you offer, rather than what you say you'll supply" — [Google SRE book: SLOs](https://sre.google/sre-book/service-level-objectives/)
- DORA: måtten ska tillämpas per tjänst och inte användas för att jämföra team eller som mål — [DORA metrics](https://dora.dev/guides/dora-metrics/)

### Inferences

**Föreslagen mall (svenska, en skärmsida, datakälla inom parentes)**
1. **Månaden i korthet:** tre meningar på klarspråk ("Er sajt var uppe hela månaden. 14 personer ringde från Google. Vi uppdaterade öppettiderna inför julen.").
2. **Tillgänglighet och formulär:** drifttid i procent mot den publicerade SLO:n, eventuella incidenter med orsak och åtgärd, och resultat av formulärtesterna (UptimeFlare/Uptime Kuma, Checkly).
3. **Kontakter (huvud-KPI för hantverkare):** samtal från Google-profilen (`CALL_CLICKS`), formulärförfrågningar (antal räknade i Workern), vägbeskrivningar och webbplatsklick från profilen (GBP Performance API). Tel-klick på sajten tas med om händelsespårning finns.
4. **Besök:** besök och toppsidor jämfört med föregående månad och samma månad förra året (Cloudflare Web Analytics eller Plausible, med egen ögonblicksbild eftersom historiken bara är 6 månader).
5. **Synlighet i Google:** klick, visningar och medelposition, de fem viktigaste sökfrågorna (GSC) och visningar i Sök och Maps (GBP).
6. **Recensioner:** nya recensioner och svar som publicerats efter godkännande (GBP).
7. **Gjorda ändringar:** en lista på klarspråk genererad ur mergade PR:er och ärenden ("Custom Work Section", ManageWP).
8. **Underhåll och säkerhet:** antal uppdateringar, att inga kända sårbarheter finns och att backup och versionshistorik är intakta (Renovate och Git).
9. **Nästa steg:** högst två rekommendationer med koppling till förvaltningsplanens mål.

**Generering (destillera till skillen "månadsrapport")**
- **Tidpunkt:** den 4:e i varje månad, efter att GSC:s data blivit "final". Jobbet startas av ett cron-schemalagt GitHub Actions-workflow i ett internt drift-repo. Alternativet är ett enda Workers-cron som fördelar arbetet, eftersom Workers Free bara tillåter 5 cron-triggers per konto.
- **Datainsamling:** Cloudflare GraphQL (Web Analytics), GSC (mcp-gsc eller direkt API), GBP Performance API, övervakningens JSON-API och Git-loggen. En ögonblicksbild sparas som JSON per kund och månad i Git, vilket ger jämförelser år för år och fungerar som revisionsspår.
- **Text:** Claude skriver på svenska och klarspråk. Siffror kontrolleras mot ögonblicksbilden innan rapporten skickas, så att agenten inte hittar på siffror.
- **Godkännande:** de första tre månaderna förhandsgranskar Johnny rapporterna. Därefter skickas de automatiskt, med undantag för avvikelser som incidenter eller kraftiga tapp, som alltid granskas.
- **Utskick:** HTML-mejl via Resend från Nortropics domän. Free räcker långt med 100 per dag.
- **Rapportera ärligt mot SLO:er:** lova inte mer än vad som levereras (SRE "don't overachieve") och redovisa avvikelser.
- **Undvik fåfänga mått:** prestandapoäng utan översättning tas inte med. "Translate it" (InstaWP).

**Domar – rapportverktyg**

| Kandidat | Lucka | Förankring | Passform | Typ | Kostnad | Dom – motivering |
|---|---|---|---|---|---|---|
| Egen rapportskill (Claude Code + cron + Resend) | Månadsrapport | ITIL SLM; SRE SLO; InstaWP/ManageWP-innehåll | Hög; svenska, alla källor, egen mall | Destillera + runtime | Actions-minuter + tokens + Resend | **Ta in.** |
| Plausibles e-postrapporter | Trafikdelen | — | Täcker bara trafik, ingen PDF | Runtime | Ingår i Plausible | **Pröva** om Plausible väljs, som komplement. |
| mcp-gsc:s skill `seo-weekly-report` | GSC-delen | — | Bra mall för sökdelen | Destillera | Gratis | **Pröva** som underlag till sökavsnittet. |
| ManageWP | — | — | WordPress-verktyg (inferens). Används som innehållsmall, inte som verktyg | — | — | **Avstå** som verktyg. |

**Samlad kortlista per lucka (primärval)**

| Lucka | Primärval (dom) | Alternativ |
|---|---|---|
| Cloudflare-åtkomst | Cloudflare API MCP `cloudflare/mcp` (**Ta in**) | — |
| Search Console för agenter | AminForou/mcp-gsc (**Pröva**, mål: Ta in) | seo-monster (**Pröva**) |
| Google Business Profile | Officiellt API via egen tunn klient (**Pröva**; ansök nu) | — |
| Drifttid | UptimeFlare (**Pröva**) + extern vakt | Uptime Kuma (**Pröva**, även för domänutgång) |
| Formulärövervakning | Checkly Hobby + Playwright (**Pröva**) | Playwright i Actions (**Pröva**) |
| Analys | Cloudflare Web Analytics (**Ta in**) | Plausible eller Umami självhostad (**Pröva**) |
| Statuskommunikation | Proaktivt mejl via Resend + månadsrapport (**Ta in**, destillera) | Intern UptimeFlare-statussida |
| Beroenden och säkerhet | Renovate (Mend-hostad) + delat preset + 7 dagars karenstid (**Ta in**) | — |
| Delat tema | Versionerat paket + Changesets (**Pröva**) | Monorepo (ej rekommenderat) |
| Backup och rollback | Git + `wrangler rollback` (**Ta in**), DNSControl (**Pröva**) | octodns (**Bevaka**) |
| Ändringsintag | Email Worker + 46elks webhook, sedan GitHub-ärende och Claude Code Action (**Ta in**/**Pröva**) | Resend Receiving (**Pröva**) |
| Innehållslager | Astro content collections + Zod (**Ta in**) | Pages CMS för självservice (**Pröva**) |
| Driftmodell | pm3-begrepp + ITIL 4 + SRE + DORA (**Ta in, destillera**) | — |
| Månadsrapport | Egen rapportskill (**Ta in**) | Plausibles e-postrapporter (**Pröva**) |

### Gaps
- Inga akademiska eller oberoende källor hittades om vad en kundrapport bör innehålla. Underlaget kommer från leverantörsbloggar (InstaWP, ManageWP) och SRE.
- Rapport-SaaS för byråer (till exempel AgencyAnalytics, Looker Studio) utvärderades inte eftersom sökbudgeten tog slut.
- Om Cloudflare Web Analytics och Plausible kan spåra tel-klick och formulärhändelser, och på vilken plan, verifierades inte.
- Hur Resend prissätter inkommande mejl framgick inte av prissidan.
