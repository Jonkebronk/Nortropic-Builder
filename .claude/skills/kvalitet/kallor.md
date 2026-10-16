# Källor

Lästa 2026-10-16. Externa skills och verktyg är destillerade med egna ord; ingen text eller kod är kopierad. Källkorten med licens, underhåll och risker per post togs fram i premiumpasset 2026-10-16, och besluten per post står i inventeringen (`inventering/inventering.json`, fältet `beslut`).

## Normer och primärkällor

| Källa | Version eller datum | Används till |
|---|---|---|
| [WCAG 2.2](https://www.w3.org/TR/WCAG22/) och [Understanding WCAG 2.2](https://www.w3.org/WAI/WCAG22/Understanding/) | Rekommendation 2024-12-12; ISO/IEC 40500:2025 | Golvet, kriterierna som kräver människa |
| [WCAG-EM 2.0](https://www.w3.org/TR/WCAG-EM/) och [Report Tool](https://www.w3.org/WAI/eval/report-tool/) | Group Note 2026-07-23; verktyget 4.1.0 | Urval och rapport vid lansering |
| [WAI-ARIA APG](https://www.w3.org/WAI/ARIA/apg/) | läst 2026-10-16 | Disclosure, dialog, dragspel, Read Me First |
| [web.dev](https://web.dev/articles/vitals) (Vitals, LCP, CLS, INP, TBT, bfcache, lazy loading, typsnitt, Strict CSP) | läst 2026-10-16 | Prestanda |
| [Lighthouse, variability.md](https://github.com/GoogleChrome/lighthouse/blob/main/docs/variability.md); [Performance scoring](https://developer.chrome.com/docs/lighthouse/performance/performance-scoring) | Lighthouse 13.5.0 | Mäthygien |
| [MDN](https://developer.mozilla.org/) (CSP, `frame-ancestors`, `style-src`, `dialog`, `details`, `inert`, `forced-colors`, Baseline) | web-features 3.43.0 | Säkerhet, modern HTML |
| [OWASP Secure Headers](https://owasp.org/www-project-secure-headers/), [CSP Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Content_Security_Policy_Cheat_Sheet.html), [HTTP Headers Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/HTTP_Headers_Cheat_Sheet.html) | `ci/headers_add.json` 2026-10-04 | Huvuden och CSP |
| [OWASP ASVS 5.0.0](https://github.com/OWASP/ASVS/tree/v5.0.0_release/5.0/en) | 2025-05-30 | Workerns svar |
| [Google Search Central](https://developers.google.com/search/docs) (Search Essentials, title links, snippets, canonical, sitemaps, robots, LocalBusiness, riktlinjer för strukturerad data, mobil först, bilder, statuskoder) | läst 2026-10-16 | Teknisk SEO |
| [WebAIM Million](https://webaim.org/projects/million/) | 2026 | Vad automatiken hittar |
| [GDS, accessibility tool audit](https://alphagov.github.io/accessibility-tool-audit/); [GOV.UK, Testing with assistive technologies](https://www.gov.uk/service-manual/technology/testing-with-assistive-technologies) | 2018; underlaget från 2016 ⚠️ | Verktygens täckning, hjälpmedel |
| [schema.org-vokabulären](https://schema.org/version/latest/schemaorg-current-https.jsonld) | hämtad 2026-10-16 | JSON-LD-kontrollen |
| [Astro, client directives](https://docs.astro.build/en/reference/directives-reference/#client-directives) | läst 2026-10-16 | Hydrering av öar |

## Externa skills (destillerade, inte installerade)

| Inventeringens namn | Källa | Licens | Hamnar i |
|---|---|---|---|
| better-accessibility | [jakubkrehel/skills](https://github.com/jakubkrehel/skills), `skills/better-accessibility`, commit 4c66b1f | MIT | `tillganglighet.md` |
| better-interface | samma, `skills/better-interface` och syskonskillsen | MIT | Principerna (bevis, ej verifierat, billigaste fix), `tillganglighet.md` |
| better-interface-review | samma, heter `interface-review` i repot | MIT | `kontroller.md`, *Vid ändring* |
| better-break | samma, heter `break` i repot | MIT | `prov.md` |
| emil-break-ui | [emilkowalski/skills](https://github.com/emilkowalski/skills), `skills/break-ui`, commit 2d22863 | MIT | `prov.md` |
| modern-web-guidance | [GoogleChrome/modern-web-guidance](https://github.com/GoogleChrome/modern-web-guidance), v0.0.194, commit b31dc0a | Apache-2.0 (delar bygger på MDN, CC-BY-SA) | `modern-html-css.md`, `prestanda.md` |
| marketingskills: seo-audit | [coreyhaines31/marketingskills](https://github.com/coreyhaines31/marketingskills), seo-audit v2.2.1 | MIT | `seo-teknik.md` |
| claude-seo | [AgriciDaniel/claude-seo](https://github.com/AgriciDaniel/claude-seo), v2.4.2 | MIT | `seo-teknik.md` (skalan, sitemap, lokala kontroller utom betyg) |

MIT och Apache-2.0 tillåter att vi bygger vidare. Kopieras väsentliga delar ska copyright- och licenstexten följa med; destillering med egna ord kopierar ingen text (tolkning, inte juridisk rådgivning).

## Verktyg

| Verktyg | Källa | Licens |
|---|---|---|
| Playwright | [microsoft/playwright](https://github.com/microsoft/playwright) | Apache-2.0 |
| axe-core och @axe-core/playwright | [dequelabs/axe-core](https://github.com/dequelabs/axe-core), [rule-descriptions 4.14](https://github.com/dequelabs/axe-core/blob/v4.14.0/doc/rule-descriptions.md) | MPL-2.0 |
| Lighthouse, Lighthouse CI | [GoogleChrome/lighthouse](https://github.com/GoogleChrome/lighthouse), [lighthouse-ci](https://github.com/GoogleChrome/lighthouse-ci) | Apache-2.0 |
| chrome-devtools-mcp | [ChromeDevTools/chrome-devtools-mcp](https://github.com/ChromeDevTools/chrome-devtools-mcp), [configuration](https://github.com/ChromeDevTools/chrome-devtools-mcp/blob/main/docs/configuration.md) | Apache-2.0 |
| lychee | [lycheeverse/lychee](https://github.com/lycheeverse/lychee) | Apache-2.0 eller MIT |
| csp-evaluator | [google/csp-evaluator](https://github.com/google/csp-evaluator) | Apache-2.0 |
| MDN HTTP Observatory | [mdn/mdn-http-observatory](https://github.com/mdn/mdn-http-observatory), [Tests and scoring](https://developer.mozilla.org/en-US/observatory/docs/tests_and_scoring) | MPL-2.0 |
| IBM Equal Access | [IBMa/equal-access](https://github.com/IBMa/equal-access) | Apache-2.0 |
| Unlighthouse | [harlan-zw/unlighthouse](https://github.com/harlan-zw/unlighthouse) | MIT |
| adobe/structured-data-validator | [adobe/structured-data-validator](https://github.com/adobe/structured-data-validator) | Apache-2.0 |
| web-vitals | [GoogleChrome/web-vitals](https://github.com/GoogleChrome/web-vitals) | Apache-2.0 |
| Rich Results Test, Schema Markup Validator | [search.google.com/test/rich-results](https://search.google.com/test/rich-results), [validator.schema.org](https://validator.schema.org/) | Tjänster |

## Interna underlag

- `kunskap/research/2026-10-15_kompetensluckor-anteckningar/lager-8-teknik-kvalitet.md` (kallas *lager-8-anteckningarna*): verktyg, trösklar och tillgänglighetstestning, läget 2026-10-13.
- `kunskap/research/2026-10-16_seo-aeo-geo.md`: lokal SEO och AI-sökning.
- Revisionen av övningssajten 2026-10-16: iakttagelserna om WebKit, bfcache, INP-brus, belastning och `bypassCSP` som står i delfilerna.
