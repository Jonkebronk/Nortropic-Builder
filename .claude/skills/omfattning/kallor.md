# Källor för omfattning

Läst 2026-10-16 och jämfört regel för regel samma dag (andra varvet). Fullständiga källkort per inventeringspost finns i `kunskap/kallkort/`; här står det skillen bygger på.

## Normer och leverantörernas dokumentation

| Källa | Datum | Använt till |
|---|---|---|
| Google Search Central, [Site moves with URL changes](https://developers.google.com/search/docs/crawling-indexing/site-move-with-url-changes) | uppdaterad 2026-08-20 | Kartan, 301/308, slutmålet, inga massomdirigeringar till startsidan, 404/410, ett år, inbäddat innehåll, canonical, interna länkar, båda sitemaps, varianterna i Search Console, adressbyte, uppföljning |
| Cloudflare, [Workers static assets: Redirects](https://developers.cloudflare.com/workers/static-assets/redirects/) | läst 2026-10-16 | Formatet, standardkoden 302, gränserna, ordningen, frågesträngar, att Workerns svar och domännivå inte omfattas |
| Cloudflare, [HTML handling](https://developers.cloudflare.com/workers/static-assets/routing/advanced/html-handling/) | läst 2026-10-16 | 307 vid snedstreck i `auto-trailing-slash` |
| Cloudflare, [Redirect www to root](https://developers.cloudflare.com/rules/url-forwarding/examples/redirect-www-to-root/) | läst 2026-10-16 | 301 i zonen med sökväg och frågesträng bevarade |
| Cloudflare, [Single Redirects](https://developers.cloudflare.com/rules/url-forwarding/single-redirects/) (uppdaterad 2026-05-05), [Settings](https://developers.cloudflare.com/rules/url-forwarding/single-redirects/settings/) och fältet [http.request.uri.args](https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/http.request.uri.args/) | läst 2026-10-17 | Omdirigeringsregel i zonen för en gammal adress med frågesträng; *Preserve query string* är avslaget som standard. ⚠️ Att fältet får stå i villkoret står inte uttryckligen på sidorna om Single Redirects |
| Cloudflare, [Browser Rendering `/crawl`](https://developers.cloudflare.com/browser-rendering/rest-api/crawl-endpoint/) | läst 2026-10-16 | Gränser, robots.txt, lagring i 14 dagar |
| Astro, konfigurationsreferensen (`redirects`) | via `guide/2-2-omfattning.md` | Varför Astros `redirects` inte används |

## Metoder och litteratur

- Anna Kaley, [Content Inventory and Auditing 101](https://www.nngroup.com/articles/content-audits/), NN/g 2020-09-27: inventering och revision, attributen, behåll–uppdatera–ta bort, kalkylark, människor gör revisionen.
- Gerry McGovern, [What Really Matters: Focusing on Top Tasks](https://alistapart.com/article/what-really-matters-focusing-on-top-tasks/), A List Apart 2015.
- DSDM och Agile Business Consortium, [MoSCoW](https://www.agilebusiness.org/dsdm-project-framework/moscow-prioririsation.html).
- Maria Rosala och Kara Pernice, [User Interviews 101](https://www.nngroup.com/articles/user-interviews/), NN/g 2023: intervjuer ger rapporterat beteende.
- Halvorson och Rach, *Content Strategy for the Web*, och Paula Land, *Content Audits and Inventories*: kanon enligt `guide/2-2-omfattning.md`. ⚠️ Inte lästa i sak.

## Externa skills och repon

| Källa | Version | Licens och krav | Taget | Lämnat |
|---|---|---|---|---|
| [JCodesMore/ai-website-cloner-template](https://github.com/JCodesMore/ai-website-cloner-template), `.agents/skills/clone-website/SKILL.md` | commit `ee3f5a2`, 2026-10-05 | MIT | Karta gammal → ny, observera före bygget i flera bredder och tillstånd, läs faktiska värden, jämför i samma bredd och tillstånd, utgående mål som följer med | Återskapandet av designen, Next.js, shadcn |
| [coreyhaines31/marketingskills](https://github.com/coreyhaines31/marketingskills): `site-architecture` med `references/site-type-templates.md` och `platforms-and-migration.md`; `competitor-profiling` | commit `365b412`, 2026-10-15 | MIT | Mallen för små lokala företag, flytten (slå på omdirigeringar vid bytet, behåll gamla sitemapen en tid, följ 404 dagligen i två veckor, metadata i inventeringen och stickprov vid bytet), sett–härlett–betydelse och "Not observed ≠ absent" | SaaS-fälten, Firecrawl och DataForSEO som standardverktyg |
| [anthropics/knowledge-work-plugins](https://github.com/anthropics/knowledge-work-plugins), `marketing/skills/competitive-brief` | commit `33eeda1`, 2026-10-15 | Apache-2.0 | Löfte, belägg, metod och unikt; femsekundersfrågan | Säljkort, positioneringskarta, kvartalsuppdatering |

## Verktyg

Se `verktyg.md`. Versioner och siffror: crawl4ai v0.9.5 (commit `94b6788`), SiteOne Crawler (commit `f3d967b`), advertools (commit `59dc2be`), mcp-gsc v0.4.1 (commit `d49eea9`), PolyFuzz (commit `9d4814b`, 2025-07-10), DataForSEO MCP (commit `1fc6d19`), Screaming Frogs prissida och Cloudflares dokumentation, alla lästa 2026-10-16.
