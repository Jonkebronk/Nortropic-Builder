# Säkerhet

Huvudena, `_headers`, CSP:n i Astro, formulärets Worker och säkerhetsgranskningen står i `guide/2-8-teknik-och-kvalitet.md`, *Publicering*, *Formulär* och *Säkerhetsgranskning*. Kontroll 10c prövar huvudena mot `wrangler dev`. Här står måttstockarna bakom och hur CSP:n bedöms, också när React-öar kommer in.

## Huvudena mot OWASP

OWASP Secure Headers Project ger rekommenderade värden (📄 [OWASP Secure Headers](https://owasp.org/www-project-secure-headers/); [HTTP Headers Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/HTTP_Headers_Cheat_Sheet.html)). Jämfört med guidens lista:

| Huvud | OWASP | Hos oss | Bedömning |
|---|---|---|---|
| Strict-Transport-Security | `max-age=63072000; includeSubDomains` (två år) | ett år, `includeSubDomains` | Höjs till två år med preload när alla subdomäner har HTTPS (sajtens `_headers`). ASVS 3.4.1 kräver minst ett år. |
| Content-Security-Policy | `default-src 'self'; form-action 'self'; base-uri 'self'; object-src 'none'; frame-ancestors 'none'; upgrade-insecure-requests` | meta med hashar plus huvud med `frame-ancestors` | Se *CSP* nedan. |
| X-Content-Type-Options | `nosniff` | ja | |
| Referrer-Policy | `no-referrer` (fuskbladet: `strict-origin-when-cross-origin`) | `strict-origin-when-cross-origin` | Bokningssystemet får då bara ursprunget. |
| Permissions-Policy | allt avstängt | det som inte används | |
| Cross-Origin-Opener-Policy | `same-origin` | ja | |
| Cross-Origin-Resource-Policy | `same-origin` (fuskbladet: `same-site`) | saknas | Kandidat. Observatory ger bonus från version 1.7.0. |
| Cross-Origin-Embedder-Policy | `require-corp` | saknas | Sätts inte: den bryter kartor och inbäddningar från tredje part. |
| X-Frame-Options | `deny` | ja | För äldre webbläsare; `frame-ancestors` gäller. |
| X-XSS-Protection | `0` eller inget | inget | |
| `Server`, `X-Powered-By` | tas bort | Cloudflare sätter `server` ⚠️ | Inget vi styr i `_headers`. |

## CSP

- **Strikt CSP med hashar** passar statiska sidor, nonce passar serverrenderade (📄 [OWASP CSP Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Content_Security_Policy_Cheat_Sheet.html); [web.dev, Strict CSP](https://web.dev/articles/strict-csp)). Astros `security.csp` skriver hasharna i en meta-tagg (→ `guide/2-8-teknik-och-kvalitet.md`, N2).
- **Meta och huvud gäller samtidigt.** Två policyer måste båda tillåta en resurs (W3C CSP Level 3). `frame-ancestors`, `report-uri` och `sandbox` verkar bara i huvudet (📄 [MDN, frame-ancestors](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Content-Security-Policy/frame-ancestors)). Ett `script-src` i huvudet utan hasharna stoppar därför sidans egna inline-skript, även om meta-taggen tillåter dem.
- **Bedöm den sammanslagna policyn.** Observatory slår ihop meta och huvud men räknar `frame-ancestors` bara från huvudet (📄 [mdn-http-observatory](https://github.com/mdn/mdn-http-observatory), källkoden för CSP-testet). Att lägga in csp-evaluator på enbart huvudet ger falsklarm om saknat `script-src`.
- **Astro skriver bara `script-src` och `style-src` som standard.** `default-src` eller `object-src 'none'`, `base-uri` och `form-action` läggs till i konfigurationen. Utan `object-src` och `default-src` drar Observatory 20 poäng och csp-evaluator ger HIGH (📄 källkoden i Astro, mdn-http-observatory och csp-evaluator; tolkning ⚠️ ej provkörd).

### csp-evaluators regler

Grind: **0 HIGH och 0 SYNTAX** på den sammanslagna policyn. 📄 [google/csp-evaluator](https://github.com/google/csp-evaluator) (Apache-2.0), version 1.1.8, kontrollerna i källkoden.

| Fynd | Allvar | Hos oss |
|---|---|---|
| `'unsafe-inline'` i `script-src` utan hash eller nonce | HIGH | förbjudet |
| `data:`, `http:` eller `https:` som källa för skript, `object-src` eller `base-uri` | HIGH | förbjudet |
| `*` i samma direktiv | HIGH | förbjudet |
| Varken `object-src` eller `default-src` | HIGH | `object-src 'none'` |
| Varken `script-src` eller `default-src` | HIGH | finns i meta |
| `base-uri` saknas när nonce, eller hash med `'strict-dynamic'`, används | HIGH | `base-uri 'self'` |
| `'unsafe-eval'` | MEDIUM_MAYBE | förbjudet |
| `'self'` i `script-src` | MEDIUM_MAYBE | godtas: sajten serverar ingen JSONP, AngularJS eller uppladdade filer |
| Värdar utan `'strict-dynamic'` | STRICT_CSP | informativt för en statisk sajt utan tredjepartsskript |
| `require-trusted-types-for 'script'` saknas | INFO | kandidat när öar skriver HTML |
| Ingen rapportering | INFO | ASVS 3.4.7 är nivå 3 |

`'unsafe-inline'` i `style-src` flaggas inte alls av csp-evaluator, men Observatory ger ingen bonus för det. OWASP och ASVS 3.4.3 föreslår `base-uri 'none'`; `'self'` klarar båda verktygen.

### CSP för React-öar, Tailwind och Motion

- **Öarnas skript fungerar.** `security.csp` är stabil sedan Astro 6.0. Astro hashar själv öns körtid, `client:*`-direktiven och öarnas stilar, och komponenterna laddas som modulfiler som `'self'` täcker. Astro hashar inte `is:inline`, `style`-attribut eller externa resurser (📄 [Astro, configuration reference, `security.csp`](https://docs.astro.build/en/reference/configuration-reference/), läst 2026-10-16). Policyn hamnar i meta-taggen, och `frame-ancestors` i `_headers`.
- **Stilattribut blockeras.** `style-src` gäller också `style`-attribut i HTML:en, eftersom `style-src-attr` faller tillbaka på `style-src` (📄 [MDN, style-src](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Content-Security-Policy/style-src)). En React-komponent med `style={{ … }}` och Motions startvärden skrivs som `style`-attribut när sidan renderas vid bygget, och sajtens CSP stoppar dem. Det syns som CSP-fel i konsolen (kontroll 2) och som en komponent som ser fel ut innan skriptet tar över.
- **Vägarna** är klasser och CSS-variabler i stilmallen, hashar för attributen med `'unsafe-hashes'`, eller `style-src-attr 'unsafe-inline'`. Den sista öppnar bara för stilattribut, inte för skript, men ger sämre poäng i Observatory. Valet är Johnnys och är inte gjort. Stilar som skript sätter via CSSOM (`element.style`) stoppas inte av CSP.
- **Tailwind** kompileras till en stilmall och påverkar inte CSP:n.
- **Tredjepartsskript** som Googles taggar laddas först efter samtycke, deras värdar läggs till i CSP:n och de får inte SRI, eftersom innehållet ändras (📄 OWASP ASVS 5.0, 3.6.1, nivå 3; → `guide/2-8-teknik-och-kvalitet.md`, *Samtycke och analys*).
- Lighthouses granskning `csp-xss` väger 0 i bästa praxis. Lighthouse 100 säger alltså inget om CSP:n; det gör kontroll 10c och csp-evaluator.

## Observatorys poäng

Startvärdet är 100, med avdrag och med bonus bara från 90. Betyg A är 90–99 och A+ 100 eller mer (📄 [MDN Observatory, Tests and scoring](https://developer.mozilla.org/en-US/observatory/docs/tests_and_scoring); poängtabellen ur [API:t](https://observatory-api.mdn.mozilla.net/api/v2/recommendation_matrix)):

- CSP saknas −25; `unsafe-inline`, `data:` eller för breda källor för skript eller `object-src` −20; utan `unsafe` +5; `default-src 'none'` +10.
- HSTS saknas −20, kortare än sex månader −10, preload +5.
- `frame-ancestors` eller X-Frame-Options saknas −20.
- `nosniff` saknas −5. Referrer-Policy med privat värde +5.
- CORP, COOP och COEP +10 vardera från version 1.7.0.

Observatory körs bara mot den publicerade sajten, och aldrig med Access-hemligheter (→ `guide/2-8-teknik-och-kvalitet.md`, N2-tabellen).

## Workerns svar

Svar som Workern skapar får sina huvuden i koden (→ `guide/2-8-teknik-och-kvalitet.md`). För formulärets och samtyckesloggens API gäller ur OWASP ASVS 5.0 (📄 [ASVS 5.0](https://github.com/OWASP/ASVS/tree/v5.0.0_release/5.0/en)):

- 2.2.2 validering på servern och 2.2.1 positiv validering (nivå 1)
- 2.4.1 skydd mot automatisering och hastighetsgräns (nivå 2)
- 3.5.1–3.5.3 skydd mot förfalskade anrop: kontroll av `Origin` och bara POST (nivå 1)
- 4.1.1 `Content-Type` med teckenkodning (nivå 1)
- 1.3.11 indata som hamnar i mejl saneras mot SMTP-injektion (nivå 2)
- 16.5.1 felbesked utan diagnostik (nivå 2)

En hastighetsgräns som släpper igenom när bindningen inte svarar är ett val för tillgänglighet framför skydd. Valet skrivs ut i koden.
