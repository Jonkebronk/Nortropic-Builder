# Astro security.csp och Cloudflare _headers

**Källa:** allt läst 2026-10-16.
- **Astro:**
  - [Configuration Reference, `security.csp`](https://docs.astro.build/en/reference/configuration-reference/#securitycsp): hela avsnittet med underalternativ.
  - `packages/astro/CHANGELOG.md` på main: alla CSP-poster 7.0–7.4.
  - npm-paketet `astro` 7.4.0 (2026-10-15), lästa filer: `dist/core/csp/common.js`, `dist/core/csp/runtime.js`, `dist/runtime/server/render/csp.js`, `head.js`, `page.js`, `dist/core/fetch/fetch-state.js` (CSP-delen), `dist/assets/runtime.js` och `astro-island-styles.js`.
  - Grep efter `staticHeaders` i `@astrojs/cloudflare` 14.4.0, `@astrojs/netlify` och `@astrojs/vercel` (senaste versionerna).
- **Motion:** npm-paketet `framer-motion` 14.3.0, `dist/es/motion/utils/use-visual-state.mjs` och källkartan för `render/html/use-props`.
- **Cloudflare:** [Workers static assets: Headers](https://developers.cloudflare.com/workers/static-assets/headers/) (uppdaterad 2026-09-22) och [Pages: Headers](https://developers.cloudflare.com/pages/configuration/headers/).
- **MDN:**
  - [CSP](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Content-Security-Policy) (avsnitten *Multiple content security policies* och `'unsafe-hashes'`)
  - [style-src](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Content-Security-Policy/style-src)
  - [style-src-attr](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Content-Security-Policy/style-src-attr)
  - [frame-ancestors](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Content-Security-Policy/frame-ancestors)
- **OWASP:** [CSP Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Content_Security_Policy_Cheat_Sheet.html).
- **Vårt nuläge:** övningssajtens `astro.config.mjs` och `public/_headers`.

**Licens:**
- Astro har MIT. Licenstexten följer med om kod kopieras.
- Cloudflare `_headers` är en plattformsfunktion under Cloudflares villkor.
- MDN-texterna har CC-BY-SA 2.5. Vi skriver med egna ord och kopierar inte.

**Vad det är:**
- Astros inbyggda CSP räknar ut hashar för de skript och stilar Astro själv bygger och skriver policyn i varje sida.
- Cloudflares `_headers` lägger HTTP-huvuden på statiska filer.
- Tillsammans ger de en policy utan `'unsafe-inline'` i `<meta>` plus de huvuden som bara fungerar som HTTP, framför allt `frame-ancestors`.

**Hur det fungerar:**
- **Status:** `security.csp` är **stabil** sedan `astro@6.0.0` (”Added in: astro@6.0.0”, inte märkt experimentell). I Astro 5.9 var den en experimentell flagga.
  - 7.1.0 lade till `kind` (`element`/`attribute`/`default`). Med den kan källor och hashar läggas i `script-src-elem`/`-attr` och `style-src-elem`/`-attr`.
  - Rättelser i 7.2.1 (speculationrules med `clientPrerender`), 7.2.5 (inga hashar när `'unsafe-inline'` finns) och 7.3.3 (`<style>` i SVG inuti `<defs>`).
- **Var policyn hamnar:**
  - Förrenderade sidor får `<meta http-equiv="content-security-policy">`. On-demand-sidor får ett huvud. En adapter med `staticHeaders` får policyn som huvud (`fetch-state.js` och `plugin-manifest.js`).
  - `@astrojs/netlify` och `@astrojs/vercel` har `staticHeaders`. **`@astrojs/cloudflare` 14.4.0 har det inte.** Hos oss stannar policyn därför i `<meta>`. ⚠️ Slutsatsen bygger på grep, inte på dokumentation.
  - Fungerar inte i `astro dev`. Pröva med `build` och `preview`.
- **Vad Astro hashar** (`core/csp/common.js`):
  - **Skript:**
    - inlinade bundlade skript
    - **direktivskripten för `client:*`**
    - alla klient-JS-chunkar
    - skript som integrationer lägger in i `head-inline` eller `before-hydration`
    - **öns körtid `astro-island`** (prebuilt) så snart en renderare som React finns
  - **Stilar:**
    - inline-stilmallar, vilket vi har eftersom `build.inlineStylesheets: 'always'`
    - CSS-filer
    - **`ISLAND_STYLES`** (`astro-island,astro-slot,astro-static-slot{display:contents}`) när en renderare finns
    - `<style>` i SVG-komponenter
  - Hasharna sätts på `script-src`/`style-src`, eller på `-elem` om det används. Standardkällan är `'self'` om inga `resources` anges.
- **Vad Astro inte hashar:**
  - `is:inline`-skript och stilar i komponenter. Dokumentationen nämner inte `is:inline` alls. ⚠️ Slutsatsen kommer ur källkoden och stämmer med vår egen lösning, där hasharna räknas i `astro.config.mjs`.
  - **`style`-attribut.** Bara hela stilmallar hashas.
  - Externa skript och stilar (dokumentationen: ”not supported out of the box”).
  - `<ClientRouter />` stöds inte. Shiki stöds inte ”By design, Shiki functions use inline styles”.
- **React-öar under hash-CSP:**
  - Öns körtid och direktivskript är inline men hashas automatiskt.
  - Själva komponentkoden laddas som **modulfil** från `/_astro/*.js` via dynamisk import. Den tillåts av `'self'`, eller av `'strict-dynamic'` om `scriptDirective.strictDynamic: true`.
  - Hydrering med `client:visible` borde alltså fungera utan ändringar. ⚠️ Det är läst ur källkoden, inte prövat i ett bygge.
- **style-src och inline-stilar:**
  - MDN, style-src: ”Inline style attributes are also blocked”, även `setAttribute('style', …)` och `style.cssText`. Däremot: ”styles properties that are set directly on the element's style property will not be blocked”.
  - `'unsafe-hashes'` låter hashar gälla `style`-attribut (MDN, CSP).
  - `style-src-attr` styr bara attribut och tar `'unsafe-hashes'`, `'unsafe-inline'` och `'report-sample'`. Baseline Widely.
  - **Tolkning för vår stack:**
    - **Tailwind** genererar klasser i en stilmall som Astro hashar, så det är inget problem.
    - **React med `style={{…}}`** skriver `style="…"` i den förrenderade HTML:en. Det blockeras med vår nuvarande policy. Efter hydreringen sätter React stilar via egenskaper, vilket tillåts. ⚠️ Att React sätter egenskaperna vid hydrering och inte rättar ett blockerat attribut är inte verifierat.
    - **Motion förrenderar `initial`-värdena som `style`-attribut.** I `framer-motion` 14.3.0, `src/render/html/use-props.ts`, bygger `useHTMLProps` sitt `style` från den visuella startstaten, som kommer ur `initial` om inte `initial={false}`, och ger den till React som `style`-prop. Under vår CSP blockeras därför till exempel `opacity:0` i den förrenderade HTML:en. Elementet syns då från början och animeras sedan, vilket kan ge ett hopp. ⚠️ Hur det ser ut på skärmen är inte prövat. Granska byggets HTML efter `style=`.
  - **Tre vägar:**
    1. Inga `style`-attribut i förrenderad HTML. Använd klasser, CSS-variabler i stilmallen eller `client:only`.
    2. `styleDirective.hashes` med `{ hash, kind: 'attribute' }` plus resursen `'unsafe-hashes'` (`kind: 'attribute'`). Astro räknar inte ut attributhasharna själv.
    3. `{ resource: "'unsafe-inline'", kind: 'attribute' }`. Det gäller bara attribut och lämnar `<style>`/`<link>` hashade. Det är Astros eget exempel, men det sänker skyddet mot CSS-injektion.
- **Flera policyer:**
  - MDN: flera policyer, via huvud och `<meta>`, tillämpas alla. ”Adding additional policies can only further restrict”.
  - Vårt `_headers` (med `frame-ancestors 'none'; base-uri 'self'; form-action 'self'; object-src 'none'`) och Astros `<meta>` (`script-src`/`style-src` med hashar) samverkar alltså. Ingen av dem kan lätta på den andra.
- **`frame-ancestors`** stöds inte i `<meta>` (MDN). Inte heller rapportering eller `sandbox` (OWASP). De måste stå i ett HTTP-huvud.
- **Cloudflare `_headers`** (Workers static assets):
  - Ligger i assets-katalogen (`public/`). Högst **100 regler** och **2 000 tecken per rad**.
  - Splat `*` och `:placeholder` finns. `! Huvud` tar bort ett ärvt huvud. Dubbletter slås ihop med kommatecken.
  - Omdirigeringar går före huvuden.
  - Gäller **bara svar från statiska filer**: ”responses generated by your Worker code” måste sätta sina huvuden själva. Det gäller även SSR och `run_worker_first`. Samma regel för Pages Functions.
  - ⚠️ Om reglerna gäller 404-sidan vid `not_found_handling` säger sidan inte.

**Kvalitet och underhåll:**
- withastro/astro enligt GitHubs API 2026-10-16 kl. 13.17:
  - 63 266 stjärnor och 3 854 forkar.
  - Senaste push 2026-10-16 10:03 UTC.
  - **1 249 bidragsgivare** (`contributors?anon=1`, sista sidan).
  - 113 öppna ärenden och PR.
  - API:t anger licensen som `NOASSERTION` (monorepo). npm anger MIT för `astro`.
- Öppna ärenden som nämner ”security.csp”: **0** (sökning via API). Sökningen på bara ”csp” gav två träffar som inte gäller CSP.
- CSP-koden ändras ofta: fyra CSP-poster i ändringsloggen mellan 7.1 och 7.4, varav tre rättelser.
- Kända problem enligt ändringsloggen: CSP-krock med `clientPrerender` (rättad i 7.2.1), `'unsafe-inline'` och hashar (7.2.5), SVG-stilar (7.3.3).
- Noterat i källkoden: i `page.js` saknas parenteser i villkoret `shouldInjectCspMetaTags && cspDestination === "header" || cspDestination === "adapter"`. Det rör bara adaptrar. ⚠️ Det är bara noterat, inte rapporterat.

**Det bästa vi kan ta:**
1. **Behåll uppdelningen:** script-src och style-src med hashar i `<meta>` från Astro, och `frame-ancestors`, HSTS, nosniff, Referrer-Policy, Permissions-Policy och COOP i `_headers`. Det följer OWASP och MDN.
2. **Mall i biblioteket:**
   - `security.csp` med `scriptDirective.resources: ["'self'"]` och hashar för `is:inline` (som i dag).
   - Ingen `'unsafe-inline'`.
   - `object-src 'none'`. `base-uri` bör vara `'none'` enligt ASVS 3.4.3, men `'self'` går om en `<base>` behövs.
   - Säkerhetshuvudena i `_headers`.
3. **Kontroll 10c** byggs ut med tre prov:
   - Byggets HTML innehåller inga `style=` eller inline-händelseattribut (`on…=`), eftersom Astro inte hashar dem.
   - Inga `is:inline`-skript utan hash.
   - Inga CSP-fel i konsolen i Playwright (utan `bypassCSP`), med en React-ö som hydreras.
4. **Rapportering:** `<meta>` kan inte rapportera. Ett `Content-Security-Policy-Report-Only` i `_headers` skulle behöva samma hashar. Det går att skriva vid bygget, till exempel i ett `astro:build:done`-steg som läser `dist`. ⚠️ Förslag, inte prövat.

**Var det hamnar hos oss (förslag):**
- Mallen i biblioteket och kontroll 10c, med regeltexten i skillens delfil `sakerhet.md`.
- Skäl: policyn byggs automatiskt för varje sajt. Det kontrollen ska fånga är det Astro inte hashar: `style`-attribut, `is:inline` och externa källor.

**Passar vår stack?**
- Ja, med en ny regel för React och Motion: inga `style`-attribut i förrenderad HTML, eller en medveten `style-src-attr`-lösning efter beslut.
- Öarnas skript hashas automatiskt.
- Tailwind fungerar.
- `<ClientRouter />` kan inte användas med CSP. Native View Transitions går bra.
- JS-kostnaden påverkas inte av CSP.
- Lighthouse 100 påverkas inte av CSP. I Lighthouse 13.5.0 (`core/config/default-config.js`) har granskningen `csp-xss` `weight: 0` i Best Practices. Den syns som information men ger inga poäng.

**Risker och flaggor:**
- `'unsafe-inline'` släcker alla hashar i samma direktiv (Astro 7.2.5 och CSP-specen).
- `style-src-attr 'unsafe-inline'` är en kompromiss som kräver Johnnys beslut.
- `<meta>`-CSP kan inte rapportera.
- `_headers` gäller inte Worker-svar, så formulärets API sätter sina huvuden i Workern (som redan görs).
- Cloudflare-adaptern kan inte flytta Astros CSP till ett huvud.

**Inloggning:** behövs inte för något av detta. Att publicera `_headers` på Cloudflare kräver Johnnys konto och godkännande av deploy.
