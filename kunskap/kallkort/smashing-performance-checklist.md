# Smashing Magazine: Front-End Performance Checklist 2021

**Källa:** Vitaly Friedman, [Front-End Performance Checklist 2021 (PDF, Apple Pages, MS Word)](https://www.smashingmagazine.com/2021/01/front-end-performance-2021-free-pdf-checklist/), publicerad och senast ändrad 2021-01-12 (`article:published_time` och `article:modified_time` i sidans HTML). Sidan i dag (2026-10-16 17.4x) är byte för byte lika stor som nedladdningen från andra varvet (723 246 byte). Lästa: innehållsförteckningen, *Setting Realistic Goals* (budgetarna), *Testing And Monitoring* (404-sidor och samtyckesrutor) och *Quick Wins*. Resten är genomsökt efter mått och siffror ⚠️, och checklistans PDF (version 1.4, på Dropbox) är inte hämtad ⚠️.
**Licens:** ingen licens angiven på sidan (sökt i HTML 2026-10-16) ⚠️; upphovsrätten gäller. Vi refererar och citerar kort.

## Vad det är
En årlig checklista för webbprestanda, *"Updated since 2016"*, med mått, budgetar, byggsteg, leverans, nätverk och testning. Guiden är sponsrad av LogRocket. Den har 17 *Quick Wins* och checklistan som PDF, Pages och Word.

## Hur det fungerar
- **Mål:** *"FID < 100ms, LCP < 2.5s, TTI < 5s on 3G, Critical file size budget < 170KB (gzipped)"*, mätt på en Android-telefon för 200 dollar (Moto G4) med långsamt 3G.
- **Budgeten 170 kB** kommer från Alex Russell (*"aim for 130–170KB gzipped as a reasonable upper boundary"*). Artikeln ger den olika omfång: JavaScript ensamt i *Setting Realistic Goals*, hela den kritiska vägen med HTML, CSS och JavaScript längre ner, och CSS och JavaScript i *Quick Wins*.
- **Quick Wins** är bland annat: självhosta statiska filer, fasader för tredjepartswidgetar, typsnitt med `font-display`, Brotli och rätt cachehuvuden. Under testningen: små 404-svar för filer som inte är HTML, och samtyckesrutans vikt och CLS.

## Kvalitet och underhåll
- Utgivare: Smashing Magazine, författare Vitaly Friedman. Ingen utgåva efter 2021: adresserna för 2022–2026 ger 404, 2020 års adress skickas till 2021 och Smashings prestandaguide länkar fortfarande 2021 (provat med `curl` 2026-10-16).
- **Föråldrat:**
  - FID är ersatt av INP sedan 12 mars 2024: *"INP will officially become a Core Web Vital and replace FID on March 12 of this year"* ([web.dev](https://web.dev/blog/inp-cwv-march-12), uppdaterad 2024-01-31).
  - TTI finns inte längre i Lighthouse: *"The venerable Time To Interactive (TTI) metric is being removed in Lighthouse 10"* ([Chrome for Developers](https://developer.chrome.com/blog/lighthouse-10-0), uppdaterad 2023-02-09).
  - Russells egen uppdatering, [The Performance Inequality Gap, 2024](https://infrequently.org/2024/01/performance-inequality-gap-2024/) (2024-01-31), ger för sajter som mest är HTML *"2.4MiB of HTML, CSS, images, and fonts"* och *"100KiB of JavaScript"* för en första laddning på fem sekunder. 170 kB-talet från 2021 nämns inte där.

## Det bästa vi kan ta
Lite. Det som fortfarande gäller finns redan hos oss:
- självhostade typsnitt med `font-display` och reservmått (`.claude/skills/yta/typografi.md:76`)
- reserverad plats och samtyckesrutans CLS (`.claude/skills/kvalitet/prestanda.md:28`, `kvalitet/kontroller.md`, rad 9e)
- 404 med riktig status (`.claude/skills/kvalitet/seo-teknik.md`).

Siffran 170 kB är en andrahandskälla från 2021 till Russell, och Russell själv är redan källan i `.claude/skills/skelett/react-i-astro.md:21` (75 kB före första interaktion, 100 kB för hela sidan).

## Var det hamnar hos oss
Placeringen **senare: N2** är beslutad: fältet `beslut` säger *"Johnny 2026-10-16 omkring 17.40: 'Ja på alla'"*. Tanken var att läsa den när Johnny beslutar om JavaScript-budgeten (`kunskap/research/2026-10-16_luckor-per-lager.md`, 8.3).

Förslag till Johnny: ändra placeringen till **släpp**. För 8.3 är Russell 2024 primärkällan och nyare, och den används redan. Det som fortfarande gäller i checklistan står redan i `kvalitet` och `yta`. Ett beslut om budgeten bör vila på Russell 2024 och en mätning på en provsida, som luckfilen föreslår, inte på 2021 års tal.

## Passar vår stack?
Delvis. Det mesta gäller ensidesappar, webpack och egna servrar (TCP BBR, OCSP, HTTP/2-komprimering, service worker). En statisk Astro-sajt på Cloudflare har ingen egen server att ställa in, så de punkterna gäller inte.

## Risker och flaggor
- **Föråldrade mått** (FID, TTI, Moto G4 på 3G) får inte bli kontroller.
- **Oklart omfång för 170 kB:** artikeln säger tre olika saker om vad talet gäller. Citeras talet ska omfånget och året stå med.
- **Sponsrad** av LogRocket, ett övervakningsverktyg.
- Ingen telemetri eller inloggning; PDF:en ligger på Dropbox.

## Inloggning
Inget.
