# Front-End Checklist

**Källa:** https://github.com/thedaviddias/Front-End-Checklist, commit `e8d14d049010e2ce25afcd5e8609dfcbbe63e47e` (2026-10-06, *"fix(mcp): bypass website proxy for connector requests"*), release v2.0 (2026-05-30), läst 2026-10-16 med `gh api`. Lästa: `README.md` (hela katalogen över 386 regler), `LICENSE`, `.mcp.json`, `.claude-plugin/marketplace.json`, `docs/mcp-analytics.md` och elva regelfiler i `packages/content/rules/en/`: `seo/faq`, `seo/website-search`, `seo/geo-meta`, `seo/llms-txt`, `seo/freshness`, `seo/content-dates`, `seo/tel-mailto`, `css/css-print`, `css/interstitials`, `performance/page-weight` och `security/new-tab`. Öppna ärenden och PR:ar lästa som lista.
⚠️ Inte lästa: övriga 375 regelfiler, MCP-serverns kod (`packages/mcp/`), de 391 skillmapparna, `SPEC.md`, `AGENTS.md` och sajten frontendchecklist.io.

**Licens:** MIT (*"Copyright (c) 2017-2026 David Dias"*). Kräver att licens och upphovsrättsnotis följer med om vi kopierar väsentliga delar. Vi destillerar med egna ord, så inget krav utlöses.

## Vad det är
Från början en lång checklista i en README (`README-OLD.md`). I dag en monorepo och *"the open-source front-end quality system for humans and AI agents"*: 386 regler i 11 kategorier – HTML 25, CSS 32, JavaScript 26, prestanda 44, tillgänglighet 95, SEO 94, säkerhet 22, bilder 25, test 13, integritet 5 och språk 5. Till det en webbplats, ett CLI, en crawler, en MCP-server med 11 verktyg (`review_code`, `audit_url`, `search_rules` m.fl.), ett Claude-plugin och 391 skills som installeras med `npx skills add frontendchecklist/skills`.

## Hur det fungerar
- Varje regel är en MDX-fil med prioritet (*critical*, *high*, *medium*, *low*), en kort sammanfattning, *whyItMatters*, uppmaningar till en agent (*check* och *fix*) och källor. README:n genereras ur filerna.
- Pluginet (`marketplace.json`) är *"the remote MCP server plus the global audit skill"*.
- **Lokala tjänstesajter:** SEO-kategorin har en underkategori `local-seo` med LocalBusiness, NAP lika överallt, synlig adress, kontaktsida, `tel:` och `mailto:`, sidor per serviceområde och geo-taggar.

## Kvalitet och underhåll
- 74 478 stjärnor, 6 760 forkar, cirka 124 bidragsgivare (anonyma inräknade), skapad 2017-10-16, senaste push 2026-10-06, 12 öppna (8 PR:ar, 4 ärenden) enligt GitHubs API 2026-10-16.
- FAQ-regelns senaste ändring är v2-commiten `7c05904` (2026-05-29), före Googles besked.
- Kända problem: inloggningen på sajten leder till en 404 hos GitHub ([#722](https://github.com/thedaviddias/Front-End-Checklist/issues/722)); X:s kortvalidator visar inte längre förhandsbilder ([#753](https://github.com/thedaviddias/Front-End-Checklist/pull/753)); Lighthouse har tagit bort PWA-granskningen ([#755](https://github.com/thedaviddias/Front-End-Checklist/pull/755)).
- **Föråldrade regler, kontrollerade mot Google i dag** ([Search documentation updates](https://developers.google.com/search/updates)):
  - `seo/faq` lovar FAQ-resultat. Google 2026-05-08: *"This feature will no longer appear in Google Search starting May 7, 2026."*
  - `seo/website-search` lovar en sökruta i sökresultatet. Google 2024-11-29: *"The sitelinks search box feature is no longer available in Google Search results."*
  - `seo/llms-txt` (*medium*). Google 2026-06-15: *"these files aren't needed for Google Search"*.
  - `seo/geo-meta` (*medium*) skriver själv att Google inte använder taggarna.
  - `performance/page-weight` (under 1 500 kB, helst under 500 kB) länkar bara till allmänna sidor hos web.dev och Lighthouse. Gränserna är listans egna.

## Det bästa vi kan ta
1. **Korskontroll för `kvalitet/kontroller.md`:** `css/css-print` (utskrift), `html/web-app-manifest`, `accessibility/paste-inputs` (inklistring) och `performance/page-weight` som rapport, inte som gräns.
2. **De lokala SEO-reglerna** som avprickning mot `struktur/platser.md` och `struktur/strukturerad-data.md`. Det mesta finns redan, som NAP och LocalBusiness.
3. **Regelformatet** – *check*, *fix* och verifiering per regel – liknar vår kontrolltabell och behöver inget nytt.

## Var det hamnar hos oss
**Beslutad:** skill: kvalitet (fältet `beslut`; Johnny 2026-10-16 omkring 17.40, *"Ja på alla"*). Listan nämns i dag inte i `guide/` eller `.claude/skills/` (sökning 2026-10-16).

**Förslag till Johnny:** en rad i `kvalitet/kallor.md` med commiten och reglerna vi *inte* följer (`seo/faq`, `seo/website-search`, `seo/llms-txt`, `seo/geo-meta`). Ingen MCP och inget plugin.

## Passar vår stack?
Reglerna är oberoende av ramverk, men MCP-servern riktar sig till *"React, Next.js, HTML, CSS, JavaScript"*. SRI-regeln gäller skript från CDN; vi självhostar. Det mesta av HTML, CSS, SEO och säkerhet går att pröva på Astros `dist/` med Playwright.

## Risker och flaggor
- **Krockar med beslut:** FAQPage och `llms.txt` (`BESLUT.md`; `kvalitet/seo-teknik.md:3`). Regeln `privacy/cookie-consent` stämmer med vår väg: ingen banner utan kakor som kräver samtycke.
- **MCP-servern är fjärr.** `review_code` skickar kod och `audit_url` en adress till deras server. Telemetri till OpenPanel räknar verktyg, regler och klientprodukt; enligt `docs/mcp-analytics.md` skickas *"No raw client name, version, user agent, prompt, code, query, audited URL"*. Påståendet är inte prövat ⚠️.
- **Pluginet och skillsen** är tredjepartsskills. Det krockar med *Inga tredjepartsskills i kundbygget* (`guide/bilaga-b-skills.md:108`).
- **Prioriteten är listans egen**, inte en norm. *High* betyder inte `hög` hos oss.

## Inloggning
Inget för repot och README:n. Sajten har en inloggning via GitHub, som enligt #722 leder till en 404; vad den ger är inte prövat ⚠️. Om MCP-servern kräver inloggning är inte heller prövat ⚠️.
