# Unlighthouse, csp-evaluator och structured-data-validator

Tre verktyg i ett kort. Varje verktyg har ett eget avsnitt med samma rubriker. Allt är läst 2026-10-16.

---

## 1. Unlighthouse

**Källa:**
- https://github.com/harlan-zw/unlighthouse, main vid commit `c3d5c5f` (2026-10-11).
  - Lästa filer: `README.md`, `docs/2.integrations/1.ci.md`, `docs/3.api-doc/config.md` (scanner-alternativen), `docs/1.guide/guides/device.md`, `docs/integration-deprecations.md`, den medskickade skillen `packages/unlighthouse/skills/unlighthouse/SKILL.md` (hela) och `packages/client/App.vue` (CrUX-anropet).
- npm: `unlighthouse`/`@unlighthouse/cli` **0.19.1** (2026-10-03), `@unlighthouse/core` med `lighthouse ^13.5.0` och Node ≥ 22.18. Det finns en beta 1.0.0-beta.1 (2026-10-04).
- Releaser via GitHub. Ärenden via sök-API:t.

**Licens:**
- MIT. Behåll copyright- och licenstexten om något kopieras.

**Vad det är:**
- Kör Lighthouse på **alla sidor** i en sajt, parallellt.
- Sidorna hittas via robots.txt, sitemap och en crawler.
- Resultatet blir en interaktiv instrumentpanel, en statisk HTML-rapport eller ett CI-läge med budget och exitkod.

**Hur det fungerar:**
- **Två program** (enligt skillen):
  - `unlighthouse` startar en panel på port 5678 och avslutas aldrig av sig själv.
  - `unlighthouse-ci` skannar, skriver `.unlighthouse/ci-result.json` och avslutas. Exitkod 1 betyder att budgeten bröts eller att inga sidor fanns kvar att skanna.
- **Budget:** `--budget n` (0–100) eller `ci.budget` per kategori. En budget på 80 fäller poängen 0,79.
- **Rapportörer:** `json`, `jsonExpanded`, `csv`, `csvExpanded` och `lighthouseServer`. `--build-static` ger `index.html`.
- **Lokal adress:**
  - Fungerar (`--site localhost:3000`).
  - **Lokala adresser körs utan strypning som standard.** `scanner.throttle: true` måste sättas uttryckligen (`config.md`, `device.md`).
- **Stabilitet** (skillen):
  - `scanner.samples` (1) **medelvärdesbildas**, det blir alltså ingen median.
  - `puppeteerClusterOptions.maxConcurrency` är halva antalet kärnor. Sätt 1 för stabila prestandavärden.
  - Dynamiskt urval (8 per ruttgrupp) är slumpmässigt. Använd `--urls` eller `--disable-dynamic-sampling`.
- **Chrome:** använder systemets Chrome, annars laddas en ned till `~/.unlighthouse`.

**Kvalitet och underhåll:**
- 4 902 stjärnor, 179 forks, 30 bidragsgivare och 25 öppna ärenden och PR:er enligt GitHub-API:t 2026-10-16 (bidragsgivare med `anon=1`; öppna ärenden räknas ihop med PR:er). I git-historiken: 992 commits och 27 mänskliga författaradresser, 7 av dem under 2026. Senaste commit 2026-10-11.
- Utgåvor tätt under hösten (0.18.0 2026-06-29 till 0.19.1 2026-10-03). En person bär projektet.
- 24 öppna ärenden. Bland dem en sårbar `extract-zip@2.0.1` i `@unlighthouse/cli` ([#396](https://github.com/harlan-zw/unlighthouse/issues/396), öppen sedan 2026-08-22) och för tunn dokumentation av det programmatiska API:t ([#153](https://github.com/harlan-zw/unlighthouse/issues/153)).
- **Integritet:** den interaktiva panelen (inte statisk eller CI) hämtar `https://crux.unlighthouse.dev/api/<sajtens URL>/crux/history` (`packages/client/App.vue`, rad 61). Sajtens adress skickas alltså till upphovsmannens tjänst. CI-läget och den statiska rapporten gör det inte, eftersom anropet bara sker när `!isStatic` gäller (tolkning av koden).

**Det bästa vi kan ta:**
- Fällorna i den medskickade skillen (`SKILL.md`, *Traps*):
  - `unlighthouse-ci` tömmer `outputPath`.
  - Strängmönster är ruttmönster, inte regex.
  - En `include` utan `/` stoppar crawlern.
  - Urvalet är slumpmässigt.
- `ci.budget` per kategori plus `--build-static` som månadsrapport till kunden.

**Var det hamnar hos oss:**
- **Senare, N3 (förvaltningsrapport):** månatlig `unlighthouse-ci --site https://<kunddomän> --build-static --disable-dynamic-sampling` med `maxConcurrency: 1` och `samples: 3`.
- Den statiska rapporten går till kunden. Inte i kontrollskriptet, som redan kör Lighthouse 13.5.0 med median.

**Passar vår stack?**
- Ja, mot publicerad domän.
- Mot localhost bara med `throttle: true`.
- **React-öar:** sajtomfattande TBT per sida visar vilka sidor öarna gör tunga.

**Risker och flaggor:**
- Den interaktiva panelen läcker sajtens URL till crux.unlighthouse.dev. Använd CI-läget.
- Sårbart beroende (#396).
- `lighthouse ^13.5.0` med cirkumflex flyter till nyare 13.x. Lås med `overrides` eller en lockfil.
- Ingen telemetri hittades i `packages/core` eller `cli` (grep efter telemetry, posthog och analytics).

**Inloggning:**
- Ingen.
- Access-skyddade förhandsvisningar kräver `extraHeaders` med service token. Det är en hemlighet och inte en inloggning.

---

## 2. csp-evaluator

**Källa:**
- https://github.com/google/csp-evaluator, commit `ad530f3` (2026-05-26).
  - Lästa filer: `README.md`, `evaluator.ts`, `finding.ts`, `csp.ts` (effektiv policy), `checks/security_checks.ts`, `checks/strictcsp_checks.ts`, `checks/parser_checks.ts` och `lighthouse/lighthouse_checks.ts`.
- npm: `csp_evaluator` **1.1.8** (2026-05-26).
- **Redan installerat:** `skript/node_modules/csp_evaluator` 1.1.8 finns som exakt låst beroende till `lighthouse` 13.5.0 (`skript/node_modules/lighthouse/package.json`).
- Lighthouses granskningar `csp-xss`, `has-hsts`, `clickjacking-mitigation`, `origin-isolation` och `trusted-types-xss` har alla `weight: 0` (`default-config.js`, rad 599–603).

**Licens:**
- Apache-2.0. README säger "not an official Google product" och ger inga garantier.

**Vad det är:**
- Googles bibliotek som granskar en CSP-sträng efter kända svagheter och kringgåenden.
- Det används av webbtjänsten csp-evaluator.withgoogle.com och av Lighthouses granskning `csp-xss`.

**Hur det fungerar:**
- Grundanropet är `new CspEvaluator(new CspParser(str).csp).evaluate()`, som ger fynd med `type`, `severity`, `directive` och `value`.
- Allvarsgrader, från allvarligast: HIGH, SYNTAX, MEDIUM, HIGH_MAYBE, STRICT_CSP, MEDIUM_MAYBE, INFO.
- **Flera policyer:** `lighthouse/lighthouse_checks.ts` har `evaluateForFailure(csps[])`, `evaluateForWarnings` och `evaluateForSyntaxErrors`.
  - De väger ihop flera policyer så att det räcker att en av dem klarar regeln (`atLeastOnePasses`).
  - **Det är rätt anrop för oss:** Astros meta-policy saknar `object-src`, men vårt `_headers` har den. Granskas meta ensam ger det ett falskt HIGH.
- **Kontrollerna:** hela tabellen finns i `kvalitet-anteckningar/verktyg.md`, avsnitt 5. De viktigaste:
  - `'unsafe-inline'` i script: HIGH.
  - `data:`/`http:`/`https:` som källa: HIGH.
  - `*`: HIGH.
  - `object-src` eller `script-src` saknas: HIGH.
  - `base-uri` saknas: HIGH, men bara med nonces eller hashar + strict-dynamic.
  - `'self'`: MEDIUM_MAYBE.
  - `http://`-källor: MEDIUM.
  - Syntaxfel: SYNTAX.
- **Det som inte kontrolleras:** `'unsafe-inline'` i style. Typen finns i koden, men ingen kontroll sätter den.

**Kvalitet och underhåll:**
- 406 stjärnor, 59 forks, 13 bidragsgivare och 16 öppna ärenden och PR:er enligt GitHub-API:t 2026-10-16 (bidragsgivare med `anon=1`; öppna ärenden räknas ihop med PR:er). I git-historiken: 79 commits och 15 mänskliga författaradresser.
- Commits under 2026 bara 2026-05-12 till 05-26. De speglas från Google internt med texten "No public description".
- 12 öppna ärenden:
  - [#24](https://github.com/google/csp-evaluator/issues/24): `script-src-elem 'unsafe-inline'` bedömdes som okej. Öppen sedan 2020. Dagens kod kontrollerar `script-src-elem` (tolkning, ⚠️ inte prövat).
  - [#10](https://github.com/google/csp-evaluator/issues/10)/[#25](https://github.com/google/csp-evaluator/issues/25): policyer med kommatecken tolkas förvirrande.
  - [#80](https://github.com/google/csp-evaluator/issues/80): felaktiga hashar fick `'unsafe-inline'` att räknas som ignorerad. Stängd 2026-05-07.
- Lågt underhåll, men biblioteket är litet och stabilt.

**Det bästa vi kan ta:**
- `evaluateForFailure([metaPolicy, headerPolicy])` plus `evaluateForSyntaxErrors(...)`.
  - Meta-policyn läses ur varje sida i `dist/`. Huvudpolicyn läses ur `public/_headers`, eller ur svaret från `wrangler dev` i kontroll 10c.

**Var det hamnar hos oss:**
- **Kontroll (N2):**
  - Biblioteket deklareras som eget beroende i `skript/package.json`, låst till `csp_evaluator: 1.1.8` (finns redan transitivt).
  - Stopp vid **0 HIGH och 0 SYNTAX** över meta och huvud tillsammans. MEDIUM_MAYBE (`'self'`) blir en notering.
  - `UNSAFE_INLINE_FALLBACK` ignoreras, eftersom Astro skriver inga hashar om `'unsafe-inline'` finns. Se kortet `astro-security-csp-och-cloudflare-headers.md`.
- **Lighthouses `csp-xss` duger inte som grind**, av två skäl:
  - Vikten är 0, så "Lighthouse 100" säger ingenting om CSP.
  - Kontrollskriptets lilla server sätter inga huvuden, så Lighthouse ser bara meta-policyn.

**Passar vår stack?**
- Ja. Det är ren JS utan nätanrop och finns redan i `node_modules`.
- **React-öar:** öarnas körtid och direktivskript hashas av Astro (se det andra kortet). csp-evaluator bedömer resultatet, inte om öarna faktiskt fungerar. Det måste ett webbläsarvarv med konsolfelkontroll (kontroll 2) visa.

**Risker och flaggor:**
- Ingen telemetri. Ingen betalvägg.
- Nya CSP-nyckelord känns igen sent, se till exempel #54 om `'wasm-unsafe-eval'` i webbtjänsten.

**Inloggning:**
- Ingen.

---

## 3. adobe/structured-data-validator

**Källa:**
- https://github.com/adobe/structured-data-validator, main vid commit `66e7610` (2026-02-25).
  - Lästa filer: `README.md`, `CHANGELOG.md`, `src/validator.js` (hela regelvalet), `src/types/schemaOrg.js` (allmänna kontrollen) och `src/types/Organization.js`.
- npm **1.7.0** (2026-02-25), Node ≥ 18.
- Ärendet [#56](https://github.com/adobe/structured-data-validator/issues/56).

**Licens:**
- Apache-2.0. Det finns ingen NOTICE-fil.

**Vad det är:**
- Ett JS-bibliotek från Adobe som validerar extraherad strukturerad data (JSON-LD, Microdata, RDFa via `@marbec/web-auto-extractor`) mot schema.org och mot Googles krav för vissa typer.

**Hur det fungerar:**
- Grundanropet är `new Validator(schemaOrgJson).validate(extracted)`, som ger fynd med `issueMessage`, `severity` (`ERROR`/`WARNING`), `path`, `fieldNames` och `location`.
- Det finns inget CLI.
- **Regler väljs på exakt `@type`.** Det finns Google-regler för ett trettiotal typer: Product, Offer, Organization (bara `name`), Review, Recipe, BreadcrumbList, VideoObject, JobPosting med flera.
- Övriga typer får bara den allmänna kontrollen: ERROR om typen inte finns i schema.org, WARNING om en egenskap inte hör till typen.

**Kvalitet och underhåll:**
- 17 stjärnor, 3 forks, 5 bidragsgivare och 14 öppna ärenden och PR:er enligt GitHub-API:t 2026-10-16 (bidragsgivare med `anon=1`; öppna ärenden räknas ihop med PR:er). I git-historiken: 92 commits och 3 mänskliga författaradresser.
- Ingen kodändring på main sedan 2026-02-25. Det som skett därefter är pushar från Renovate till andra grenar.
- 2 öppna ärenden, varav **[#56](https://github.com/adobe/structured-data-validator/issues/56) (2026-01-07) begär validering av LocalBusiness, Article, Event och FAQPage. Det har inte fått något svar.**

**Det bästa vi kan ta:**
- Formatet för fynd (`severity`, `path` och `fieldNames`) som förebild för vår egen JSON-LD-kontroll.
- Den allmänna schema.org-kontrollen (typen finns, egenskapen hör till typen) är enkel att göra själv mot `schemaorg-current-https.jsonld`.

**Var det hamnar hos oss:**
- **Släpp, bevaka #56.** Den täcker inte LocalBusiness, PostalAddress eller Service, som är just det vi använder.
- **Gör i stället en egen JSON-LD-kontroll i kontrollskriptet:**
  - `@type` är en LocalBusiness-undertyp.
  - `name` och `address` (PostalAddress) finns. De är obligatoriska hos Google.
  - `telephone` och `url` finns.
  - `geo` har minst 5 decimaler.
  - Namn, adress och telefon syns i sidans text.
  - Inget `aggregateRating`/`review` om företaget självt.
  - Typerna kommer från schema-dts, se kortet `astrojs-sitemap-och-schema-dts.md`.

**Passar vår stack?**
- Tekniskt ja, men den saknar det vi behöver.

**Risker och flaggor:**
- Litet projekt med tre personer och lågaktivt sedan februari.
- README-exemplet hämtar schema.org-vokabulären och extraktorn `@latest` från nätet. Lås en lokal kopia om biblioteket ändå används.

**Inloggning:**
- Ingen.
- Googles **Rich Results Test** kräver ingen inloggning.
- **URL Inspection** kräver Search Console, alltså Johnnys inloggning, för att se hur Google läst en publicerad sida.
