# Teknisk SEO och strukturerad data

Guiden bestämmer redan robots.txt för sökrobotarna, ingen `llms.txt`, Crawler Hints, Bing Webmaster Tools, `LocalBusiness` utan eget betyg, ingen `FAQPage` och `sameAs` (→ `guide/2-8-teknik-och-kvalitet.md`, *Samtycke och analys* och *Publicering*; `BESLUT.md` 2026-10-16, *Lokal SEO, AEO och GEO*). Kontroll 7 och 7b–7c prövar titel, beskrivning, sitemap, `h1` och robots.txt; N2-tabellen har SEO i DOM och strukturerad data. Här står ordningen, Googles egna regler och hur fynd vägs.

## Ordningen

Fynd ordnas efter vad som hindrar mest (📄 [marketingskills, seo-audit](https://github.com/coreyhaines31/marketingskills), v2.2.1, MIT):

1. **Genomsökning och indexering:** robots.txt, `noindex`, statuskoder, kanoniska adresser, sitemap.
2. **Teknisk grund:** HTTPS, mobil, Core Web Vitals, adresser och omdirigeringar.
3. **Sidan:** titel, beskrivning, rubriker, interna länkar, bilder.
4. **Innehållet:** att det svarar på det besökaren söker (→ `guide/2-7-innehall.md`).
5. **Auktoritet:** länkar och omnämnanden. Utanför sajten (→ `guide/2-9-drift-och-forvaltning.md`).

Allvaret följer claude-seos skala översatt till vår (📄 [claude-seo](https://github.com/AgriciDaniel/claude-seo), v2.4.2, MIT): det som hindrar indexering är `hög`, det som påverkar synligheten märkbart är `medel` och det som är en möjlighet är `låg`.

## Googles regler

| Ämne | Regel | Källa |
|---|---|---|
| Grundkrav | Googlebot är inte blockerad, sidan svarar 200 och har indexerbart innehåll. Indexering garanteras inte. | 📄 [Search Essentials, tekniska krav](https://developers.google.com/search/docs/essentials/technical) |
| Titel | Unik och beskrivande, varumärket en gång. Ingen längdgräns; Google trunkerar efter bredd och kan skriva om. | 📄 [Title links](https://developers.google.com/search/docs/appearance/title-link) |
| Metabeskrivning | Unik per sida, ingen längdgräns, ingen lista med nyckelord. Utdraget byggs mest ur sidans text. | 📄 [Snippets](https://developers.google.com/search/docs/appearance/snippet) |
| Kanonisk adress | Absolut https-adress i `<head>`, till sig själv, en per sida. Inte robots.txt eller `noindex` för att kanonisera. Den är en önskan, inte en order. | 📄 [Canonical](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls) |
| Sitemap | Bara kanoniska sidor som svarar 200. `lastmod` används bara om det stämmer; `priority` och `changefreq` ignoreras. | 📄 [Sitemaps](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap) |
| robots.txt | Styr genomsökning, inte indexering. CSS och JavaScript blockeras inte. | 📄 [robots.txt](https://developers.google.com/search/docs/crawling-indexing/robots/intro) |
| 404 | En sida som saknas svarar 404 eller 410, en flyttad 301. En designad 404-sida svarar ändå 404 (kontroll 10b). | 📄 [HTTP-statuskoder](https://developers.google.com/search/docs/crawling-indexing/http-network-errors) |
| Mobil först | Samma innehåll, strukturerade data och metadata på mobil och dator. Innehåll som bara finns i datorvyn räknas inte. | 📄 [Mobile-first indexing](https://developers.google.com/search/docs/crawling-indexing/mobile/mobile-sites-mobile-first-indexing) |
| Bilder | `<img>` med alt-text, inte CSS-bakgrund, för bilder som ska hittas. Beskrivande filnamn. | 📄 [Google Images](https://developers.google.com/search/docs/appearance/google-images) |
| Rubriker och längd | Ingen magisk mängd rubriker eller ord, och ordningen spelar ingen roll för Google. En `h1` per sida är vår kodstandard (kontroll 7b). | 📄 [SEO Starter Guide](https://developers.google.com/search/docs/fundamentals/seo-starter-guide) |

**Tumregler blir varningar:** titel på 50–60 tecken, beskrivning på 150–160, nyckelord i adressen och de första hundra orden, minsta antal ord, antal interna länkar per sida, alt-text på 10–125 tecken, storleksgränser per bildfil och att vänta 3–4 veckor efter en ändring. Ingen av dem har en Google-källa, och ingen stoppar (→ `guide/2-8-teknik-och-kvalitet.md`, N2). De står här så att de inte tas in igen ur en extern skill.

## Rendering, sitemap och nya sidor

- **Huvudet står i HTML:en från bygget, och inget skript ändrar det.** Titel, beskrivning, kanonisk adress, robots och JSON-LD skrivs vid bygget; en React-ö eller ett skript sätter dem aldrig. Skiljer sig originalet och den renderade sidan kan Google välja vilken som helst, och med `noindex` i originalet kan renderingen hoppas över. 📄 [Google, JavaScript SEO basics](https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics)
- **Interna länkar går till den kanoniska formen:** https, samma värd och snedstreck på slutet, som i sitemapen. 📄 [Google, Consolidate duplicate URLs](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls)
- **`lastmod` följer sidans eget innehåll.** Datumet flyttas när sidans huvudinnehåll, länkar eller strukturerade data ändras, inte när en gemensam fil ändras. Samma datum på alla sidor tyder på fel. robots.txt har en `Sitemap:`-rad med absolut adress. 📄 [Google, Build a sitemap](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap) (*"consistently and verifiably accurate"*)
- **Fel i sitemapen vägs så:** en adress som inte svarar 200 eller har `noindex` är `hög`, en omdirigerad adress `medel`, samma `lastmod` överallt `låg`. `priority` och `changefreq` kräver ingen åtgärd. 📄 claude-seo, `seo-sitemap`; Google ovan
- **Bakåtknappen fungerar alltid.** `pushState` och `replaceState` används bara efter något besökaren gjort, aldrig för att hålla kvar besökaren (Googles spampolicy om kapad bakåtknapp). 📄 [Google, spam policies](https://developers.google.com/search/docs/essentials/spam-policies)
- **Varje HTML-fil är under 2 MB.** Googlebot läser de första 2 MB per adress; inlinad CSS och JSON-LD räknas med. 📄 [Search Central-bloggen 2026-03-31](https://developers.google.com/search/blog/2026/03/crawler-blog-post)
- **Delningsbilden föreställer sidan.** Google avråder från en generisk bild som logotypen. En gemensam bild duger tills kunden har egna bilder. 📄 [Google Images](https://developers.google.com/search/docs/appearance/google-images)
- **AI-ytorna kräver indexering, ett tillåtet utdrag och att sajten är med i Search Consoles kontroll för generativ AI** (standard *ta med*, för alla sajter sedan 2026-08-31). `nosnippet` och `max-snippet` används inte. 📄 [Google, AI optimization guide](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide); [Search Console Help](https://support.google.com/webmasters/answer/16908024)
- **En ny sida** länkas från sina närmaste sidor med beskrivande text, har unik titel och beskrivning, en `h1` i linje med titeln, en självrefererande kanonisk adress och strukturerad data där typen stöds, står i sitemapen, har innehållet i HTML:en och leder till den primära handlingen. Efter publiceringen begärs indexering en gång. 📄 marketingskills, `rankings-push.md`; Google ovan
- **Vid en ändring jämförs SEO-huvudet med förra godkända bygget** per sida: titel, kanonisk adress, robots, `h1`, JSON-LD och status. Försvunnen kanonisk adress, ny `noindex` och borttagen JSON-LD är regressioner (→ `kontroller.md`, *Vid ändring*). 📄 claude-seo, `seo-drift`

## Strukturerad data

Reglerna för `LocalBusiness` står i `guide/2-8-teknik-och-kvalitet.md`. Därtill:

- **Vokabulären:** varje `@type` finns i schema.org och varje egenskap gäller typen eller en förälder till den. Det prövas mot `schemaorg-current-https.jsonld` (📄 [schema.org, developers](https://schema.org/docs/developers.html)). adobe/structured-data-validator har inga Google-regler för `LocalBusiness`, `Service` eller `PostalAddress` och ersätter därför inte den egna kontrollen (📄 [structured-data-validator](https://github.com/adobe/structured-data-validator), 1.7.0).
- **Googles krav:** `name` och `address` är obligatoriska; `geo` med minst fem decimaler, `openingHoursSpecification`, `telephone`, `url` och `priceRange` rekommenderas. Mest specifika undertypen, ingen `additionalType` (📄 [Google, Local business](https://developers.google.com/search/docs/appearance/structured-data/local-business)).
- **Synligt och sant:** det som märks upp syns på sidan, och namn, adress, telefon och öppettider stämmer med texten och med `fakta.md` (📄 [Googles riktlinjer](https://developers.google.com/search/docs/appearance/structured-data/sd-policies)). Jämförelsen görs på värdet, inte på formatet: `08:00` i JSON-LD och "8.00" i texten är samma tid.
- **Varje mottagning** har ett eget objekt med stabilt `@id`, och dess `url` pekar på mottagningens sida (`BESLUT.md` 2026-10-16, *Kvalitetsgranskningen – ja på allt*, punkt 1; 📄 marketingskills, seo-audit, referensen om lokal SEO).
- **Läs den renderade sidan.** `curl` och `web_fetch` kan missa JSON-LD som läggs till av skript (📄 marketingskills, seo-audit). Vår JSON-LD skrivs vid bygget och syns i `dist/`.
- **Rich Results Test och Schema Markup Validator** för hand vid lansering och när schemat ändras (→ `guide/2-8-teknik-och-kvalitet.md`, N2). URL-inspektionen i Search Console kräver inloggning hos kunden eller Johnny.

## Lokala kontroller

Ur marketingskills och claude-seo, prövade mot Google (📄 marketingskills, seo-audit och dess referens om lokal SEO; claude-seo, `seo-local`):

- Ett kanoniskt register för varje mottagning: `fakta.md`. Sajten, JSON-LD och Google-profilen säger samma sak (→ `guide/2-7-innehall.md`, *Faktabasen*).
- Ingen hemadress publiceras för att fylla en checklista. Ett serviceområde är ingen mottagning.
- Ort och tjänst i titel och `h1` där det är sant, en sida per kärntjänst och en klickbar `tel:`-länk (→ `guide/2-3-struktur.md`).
- **Inget självpublicerat betyg.** claude-seo rekommenderar `aggregateRating` i `LocalBusiness`, och det strider mot Googles riktlinjer och guiden; den delen tas inte in.
- Mät samtal och bokningar, inte bara placeringar (→ `guide/2-9-drift-och-forvaltning.md`).
- **Lokala problem felsöks i ordning:** först en profil som är fel, dubblerad, overifierad eller avstängd, sedan kontaktfakta och länkar, sedan efterfrågan som sajten inte svarar på, sist förtroendet (omdömen, kataloger). Kartytan och de organiska träffarna hålls isär, och vi lovar ingen placering: kartytan bygger på relevans, avstånd och hur känt företaget är, och en sökning från kontoret bevisar inget. 📄 marketingskills, `local-seo.md`; [Google Business Profile, lokal ranking](https://support.google.com/business/answer/7091)
- **Bytestestet och andelen gemensam text på platssidorna** är granskningskriterier med en källa (→ `struktur/platser.md`) och rapporteras, aldrig som stopp.

## Det som kontrollskriptet inte ser i dag

Förslagen står i `kontroller.md`: kanonisk adress och Open Graph per sida, interna länkar till den kanoniska formen, `lastmod` per sida, JSON-LD mot vokabulären och faktabasen, huvudet i byggd HTML, storleken per sida, och SEO-drift mellan byggen.
