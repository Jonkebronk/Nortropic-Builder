# Lager 8: Teknik och kvalitet

**Status:** utkast ur rapporten, inte genomgånget med Johnny.

## Vad byrån gör

Ser till att sajten är snabb, tillgänglig, säker, går att hitta och följer lagen.

## Grindarna

| Grind | Verktyg | Stopp |
|---|---|---|
| Prestanda | Lighthouse CI mot `dist/` | Performance minst 0,90, LCP högst 2,5 s, CLS högst 0,1, TBT högst 200 ms |
| Länkar | lychee | Noll trasiga interna länkar |
| Strukturerad data | schema-dts och en validator | Noll fel, och namn, adress och telefon i JSON-LD syns i texten |
| Huvuden | Astro `security.csp`, Cloudflare `_headers`, MDN HTTP Observatory | Ingen `unsafe-inline` och minst betyget A |
| Tillgänglighet | axe med Playwright, WCAG 2.2-reglerna påslagna | Noll fel i Chromium och WebKit |
| Visuell | Skärmbilder i Playwright | En diff över startvärdet går till Johnny |
| Integritet | Playwright vid första laddningen | Inga kakor och inga anrop till tredje part utan samtycke |

Automatiska tillgänglighetstest hittar bara en del av felen, så en granskning enligt WCAG-EM görs vid lansering och sedan årligen.

## Autonomi

Deterministiska grindar går helt självgående med ett tak för antalet försök. Brusiga mätningar som Lighthouse körs 3–5 gånger, och medianen gäller. Omdömesfrågor, som visuella diffar och de WCAG-kriterier som inte går att automatisera, går till Johnny. Den agent som orsakade en diff får inte uppdatera basbilden.

## Kompetens

- **Egen skill:** kvalitetsskillen, destillerad ur better-accessibility, better-interface, modern-web-guidance och emil-break-ui, med grindtabellen ovan.
- **Förankring:** web.dev om Core Web Vitals, WCAG 2.2 och WCAG-EM 2.0, Google Search Central, Humble och Farley (*Continuous Delivery*) och DORA.

## Lagar

Tolkning, inte juridisk rådgivning:

- **Kakor:** PTS räknar statistik som icke-nödvändigt, så även kakfri analys kan kräva samtycke. Mallen ska därför klara sig utan allt som kräver samtycke.
- **Tillgänglighetslagen:** mikroföretag är undantagna, alltså företag med färre än tio anställda och högst 2 miljoner euro i omsättning eller balansomslutning. WCAG 2.2 AA blir ett golv Nortropic väljer själv. Bokning eller beställning kan göra en del av sajten till en e-handelstjänst, så klassningen görs vid intaget.
- **Integritetsinformation** krävs så fort ett formulär behandlar personuppgifter.

## Underlag

Rapporten, lager 8, `kunskap/research/2026-10-15_kompetensluckor-anteckningar/lager-8-teknik-kvalitet.md` och inventeringen, lager 8.
