# MDN HTTP Observatory

**Källa:** allt läst 2026-10-16.
- https://github.com/mdn/mdn-http-observatory, main vid commit `e486eba` (2026-10-14).
  - Lästa filer: `README.md`, `CHANGELOG.md` (1.7.0–1.7.1), `src/scan.js` (CLI), `bin/wrapper.js`, `src/grader/charts.js` (poängtabellen), `src/analyzer/tests/csp.js`, `src/analyzer/cspParser.js`, `src/analyzer/tests/x-frame-options.js` och `src/retriever/utils.js` (http-equiv).
- npm-paketet **1.7.1** (2026-09-03), uppackat och läst: `package/src/scan.js`. Kräver **Node ≥ 24**.
- Det levande API:t [`/api/v2/recommendation_matrix`](https://observatory-api.mdn.mozilla.net/api/v2/recommendation_matrix), hämtat 2026-10-16.
- MDN-sidan [Tests and scoring](https://developer.mozilla.org/en-US/observatory/docs/tests_and_scoring). Själva testtabellen saknades i den hämtade texten (den renderas troligen av JS).
- Ärenden: sök-API:t (öppna, sorterade på reaktioner).

**Licens:**
- MPL-2.0. Den är filbaserad: ändrar vi en MPL-fil och sprider den, ska den ändrade filen finnas tillgänglig under MPL.
- Att köra verktyget och läsa resultatet ställer inga krav.

**Vad det är:**
- Mozillas skanner för säkerhetshuvuden: CSP, HSTS, Referrer-Policy, X-Frame-Options, CORP/COOP/COEP, cookies, SRI, omdirigering och CORS.
- Den ger poäng och betyg från A+ till F.
- Den finns som webbtjänst, publikt API och CLI (`npx @mdn/mdn-http-observatory <värd>`).

**Hur det fungerar:**
- **Poängmodell:** start på 100, avdrag först, bonus bara om resultatet är ≥ 90. Golvet är 0. Betyg: A+ ≥ 100, A 90–99, A- 85–89 och så vidare.
- **Taket** är 165 enligt egen summering av bonusarna i tabellen. MDN-sidan säger 145, vilket var riktigt före COOP- och COEP-bonusarna i 1.7.0 (2026-09-01).
- **Viktigaste modifierarna** (API:t, 2026-10-16):
  - **CSP:** `default-src 'none'` plus `form-action` +10, utan unsafe +5, unsafe bara i `style-src` 0, `unsafe-eval` −10, `unsafe-inline`/`data:` i script eller för breda källor i script eller object −20, saknas −25.
  - **HSTS:** preload +5, minst 6 månader 0, kortare −10, saknas −20.
  - **Referrer-Policy:** privat värde +5, saknas 0, osäker −5.
  - **XFO eller `frame-ancestors`:** +5, saknas −20.
  - **X-Content-Type-Options:** saknas −5.
  - **CORP, COOP och COEP:** +10 vardera.
  - **SRI:** externa skript över https utan SRI −5.
  - **Cookies:** sessionscookie utan Secure −40.
- **Meta-CSP enligt källkoden** (tolkning):
  - Policyn i `<meta http-equiv>` läses och slås ihop med huvudet. `frame-ancestors`, `report-uri` och `sandbox` stryks ur meta, och `frame-ancestors` räknas bara från huvudet.
  - `'unsafe-inline'` ignoreras när hash eller nonce finns.
  - **Saknas både `object-src` och `default-src` räknas object-src som `*`, vilket ger −20.** Vårt `_headers` har `object-src 'none'` (se kortet `astro-security-csp-och-cloudflare-headers.md`). Tillsammans med Astros meta-policy bör vi alltså klara detta. ⚠️ Inte provskannat.
  - ⚠️ Möjlig egenhet: XFO-testet läser `frame-ancestors` ur den sammanslagna policyn och kan därför ge +5 för en meta-`frame-ancestors`, trots att webbläsaren ignorerar den. Otestat.
- **CLI:**
  - Skriver JSON (`scan.grade`, `scan.score` och `tests.*.result`/`scoreModifier`). **Exitkoden är 0 även vid dåligt betyg.** Den blir 1 bara vid fel. Grinden måste alltså läsa `scan.score`.
  - `--headers '{…}'` skickar egna huvuden. **I 1.7.1 skickas de bara över HTTPS som standard.** Flaggan `--send-headers-over-http` ändrar det. README varnar fortfarande för motsatsen och är alltså inaktuell på den punkten (kontrollerat i `package/src/scan.js` 1.7.1).
- **Publikt API:** `POST /api/v2/scan?host=`, högst en skanning per värd och minut (annars cachat svar).

**Kvalitet och underhåll:**
- Repot: 142 stjärnor, 35 forks, 11 bidragsgivare och 26 öppna ärenden och PR:er enligt GitHub-API:t 2026-10-16 (bidragsgivare med `anon=1`; öppna ärenden räknas ihop med PR:er). I git-historiken: 534 commits och 9 mänskliga författaradresser i historiken, 3 av dem under 2026. 211 commits under 2026, de flesta beroendeuppdateringar.
- Senaste commit 2026-10-14. Utgåvor 1.6.0 (2026-04) till 1.7.1 (2026-09-03). Underhålls av MDN (Mozilla).
- 18 öppna ärenden, alla med få reaktioner. Exempel:
  - [#267](https://github.com/mdn/mdn-http-observatory/issues/267): SRI ger 0 poäng när sidan saknar skripttaggar.
  - [#268](https://github.com/mdn/mdn-http-observatory/issues/268): önskemål om `Integrity-Policy`.
  - [#119](https://github.com/mdn/mdn-http-observatory/issues/119): mildare poäng för Referrer-Policy.
  - [#269](https://github.com/mdn/mdn-http-observatory/issues/269): CSP-rådet ignorerar `default-src 'none'`.
  - [#348](https://github.com/mdn/mdn-http-observatory/issues/348): bygget laddar ned saker, vilket försvårar paketering.
- Inget av ärendena stoppar oss.

**Det bästa vi kan ta:**
- Modifierartabellen (API:t eller `src/grader/charts.js`) som facit för `_headers`.
  - Med vår mall (CSP utan unsafe, `frame-ancestors`, `nosniff`, Referrer-Policy `strict-origin-when-cross-origin` och HSTS ≥ 6 månader) blir uträkningen 100 + 5 + 5 + 5 = **115, A+**. Det är en egen uträkning, ⚠️ inte skannad.
  - **COEP `require-corp` ger +10 men kan bryta inbäddade kartor och bilder från andra ursprung.** Lägg inte till det för poängens skull.
- `src/analyzer/tests/csp.js`, rad 140–175, som förklaring till hur meta och huvud vägs ihop.
- Kontrollskriptets 10c kontrollerar redan att huvudena finns via `wrangler dev`. Observatory lägger till graderingen och kontrollerar omdirigeringen http → https, som bara går att se mot den riktiga domänen.

**Var det hamnar hos oss:**
- **Kontroll mot produktion vid publicering (N2):** `npx @mdn/mdn-http-observatory@1.7.1 <domän>` (Node 24) körs efter deploy.
  - Läs `scan.score`: under 90 ger stopp för överlämning, under 100 en anmärkning.
  - Förhandsvisningen bakom Access kan inte skannas utan att token skickas. Gör det inte, utan skanna bara den publika domänen.
- **I `kontroller.md`:** tabellen över de modifierare vi siktar på, och regeln att `frame-ancestors` måste stå i `_headers`.

**Passar vår stack?**
- Ja, mot den publicerade Cloudflare-domänen.
- Mot `astro preview` eller `wrangler dev` (http, localhost) blir HSTS och omdirigering fel per definition, så kör det inte där.
- **React-öar:** påverkar betyget bara via CSP. Inline-stilattribut från React eller Motion, om de tillåts via `style-src-attr`, berör inte Observatorys `style-src`-test. Tolkning: källkoden läser bara `style-src`/`default-src`.

**Risker och flaggor:**
- Kräver Node 24. Maskinen har Node v24.21.0 (kontrollerat 2026-10-16), och startsäkringen håller Node på LTS-linjen, så det fungerar i dag.
- Det publika API:t och webbtjänsten är Mozillas. Ingen telemetri hittades i CLI:t.
- Skicka aldrig Access-hemligheter med `--headers`.

**Inloggning:**
- Ingen. CLI:t och det publika API:t är öppna.
