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

**Tumregler blir varningar:** titel på 50–60 tecken, beskrivning på 150–160, nyckelord i adressen och de första hundra orden, och minsta antal ord. Ingen av dem stoppar (→ `guide/2-8-teknik-och-kvalitet.md`, N2).

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

## Det som kontrollskriptet inte ser i dag

Förslagen står i `kontroller.md`: kanonisk adress och Open Graph per sida, `lastmod` i sitemapen, JSON-LD mot vokabulären och faktabasen, och interna länkar och ankare.
