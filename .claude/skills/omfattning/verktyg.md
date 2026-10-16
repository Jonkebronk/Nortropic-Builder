# Verktyg för omfattningen

Delfil till `omfattning`. Urvalskriterierna för tredjepartsverktyg bor i `guide/bilaga-a-verktyg.md`. Här står vad varje verktyg ger i inventering och flytt, vad det kräver och vad det riskerar. Siffrorna är lästa 2026-10-16. Inget av verktygen är installerat; att ta in ett kräver Johnnys ja.

## Crawl och inventering

| Verktyg | Ger | Kräver | Risker och flaggor | Läge |
|---|---|---|---|---|
| [crawl4ai](https://github.com/unclecode/crawl4ai) v0.9.5 | Sidor som ren Markdown, djupcrawl (bredd, djup, bäst först), `AsyncUrlSeeder` ur sitemaps och `DomainMapper` med källor som sitemap, Wayback Machine och robots.txt – bra för gamla adresser som försvunnit ur sitemaps | Python och Playwright lokalt; ingen data lämnar datorn | Apache-2.0 med tillagt krav på attribution vid "public uses", för webbplatser i en sektion om oss eller tack; intern användning omfattas troligen inte (⚖️ tolkning). `check_robots_txt` är av som standard och slås på. 0.9.5 (2026-10-14) var en säkerhetsrelease för Docker-servern, som inte används. README marknadsför en betald moln-tjänst | Ta in för N2 |
| [SiteOne Crawler](https://github.com/janreges/siteone-crawler) | Fristående program: HTML-rapport över 404, omdirigeringar, SEO, rubriker och säkerhet; export till Markdown och offline-kopia; sitemap | Ladda ner en binär | MIT. `--upload` skickar rapporten till crawler.siteone.io (30 dagar som standard) och används aldrig för kunders sajter | Pröva |
| [advertools](https://github.com/eliasdabbas/advertools) | Python: crawl till tabell, sitemaps och robots.txt till tabeller, `url_to_df` för att dela upp adresser, logganalys | Python med Scrapy | MIT, en huvudutvecklare | Pröva |
| [Screaming Frog SEO Spider](https://www.screamingfrog.co.uk/seo-spider/) | Skrivbordsprogram; listläget med *Always Follow Redirects* prövar en lista gamla adresser och visar slutmål, antal steg, slingor och tillfälliga steg | Gratis upp till 500 adresser; licens 245 euro per år ([priser](https://www.screamingfrog.co.uk/seo-spider/pricing/)) | Kommersiell, sluten kod. ⚠️ Vilka funktioner gratisversionen saknar gick inte att läsa säkert ur pristabellen | Pröva, manuellt |
| [Cloudflare Browser Rendering `/crawl`](https://developers.cloudflare.com/browser-rendering/rest-api/crawl-endpoint/) | Crawl av en hel sajt som jobb, ur sitemaps och länkar, till HTML, Markdown eller JSON; följer robots.txt och `crawl-delay` | Cloudflare-konto och API-nyckel; gratisplanen ger 10 minuter webbläsartid per dag; resultaten sparas 14 dagar | Under betan debiteras crawl utan rendering inte; kan inte ta sig förbi bot-skydd | Pröva |

## Search Console

| Verktyg | Ger | Kräver | Risker och flaggor | Läge |
|---|---|---|---|---|
| [mcp-gsc](https://github.com/AminForou/mcp-gsc) v0.4.1 | Sökdata per sida och fråga, jämförelse mellan perioder, URL-inspektion (tio åt gången), sitemaps | Python med `uv`, ett OAuth-klient-id eller ett tjänstekonto i Google Cloud, och kundens behörighet i Search Console | MIT. Omfånget är hela `webmasters` (läs och skriv); ärende #56 säger att token med bara läsrätt alltid misslyckas. `add_site`, `delete_site` och `delete_sitemap` är avstängda tills `GSC_ALLOW_DESTRUCTIVE=true`, men `submit_sitemap` är alltid på. Öppna fel: #53 (fel returneras som lyckade svar), #42 (jämförelsen byter plats på perioderna). `mcp[cli]<2.0.0` är låst efter kraschen i juli 2026 (#41). Låt versionen vara låst | Kräver konto |

## Matchning och sökvolym

| Verktyg | Ger | Kräver | Risker och flaggor | Läge |
|---|---|---|---|---|
| [PolyFuzz](https://github.com/MaartenGr/PolyFuzz) | Föreslår vilken ny adress eller titel en gammal liknar mest, med redigeringsavstånd, TF-IDF eller inbäddningar; en människa eller agent granskar | Python | MIT; senaste push 2025-07-10, sex bidragsgivare. Behövs först när en sajt har fler gamla adresser än en människa hinner para ihop | Senare |
| [DataForSEO MCP](https://github.com/dataforseo/mcp-server-typescript) | Sökvolymer (Google Ads), sökresultat och bakåtlänkar, alltså vilka gamla adresser som har länkar | Konto, inloggning och lösenord som miljövariabler; minsta insättning 50 dollar, provkredit 1 dollar, sökordsdata från 0,0012 dollar per uppgift ([priser](https://dataforseo.com/pricing)) | Apache-2.0. Verktyget `api_request` kan göra vilket betalt anrop som helst, så kontot får en låg budget. Volymerna i små orter är låga och används bara relativt. Recensionsdata innehåller recensenternas namn (personuppgifter) | Kräver konto |

## Det som inte tas in

- Astros `redirects` för flytten (meta refresh utan statuskod; → `guide/2-2-omfattning.md`).
- migTool och gbp-industry-categories, som saknar licens (→ `guide/2-2-omfattning.md`, *Avstå*).
- Firecrawl tills vidare: kärnan är AGPL-3.0 och biträdesavtal saknas på gratis- och hobbyplanerna (→ `guide/2-2-omfattning.md`, *Bevaka*).
