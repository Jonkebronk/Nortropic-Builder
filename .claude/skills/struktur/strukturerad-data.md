# Strukturerad data som följer sidkartan

Regeln står i guiden: LocalBusiness på start- och kontaktsidan, Service på varje tjänstesida, BreadcrumbList bara där brödsmulor syns; typer och format bor i `guide/2-8-teknik-och-kvalitet.md` (→ `guide/2-3-struktur.md`, N2). Här står hur datan binds ihop med sidkartan. Kontrollen av själva datan (Rich Results Test, `sameAs`, inget eget betyg) hör till lager 8.

## Grafen

- **En graf per sida med `@id` som binder ihop noderna:** organisationen och webbplatsen en gång, sedan sidans egna noder som pekar på dem. Övningssajten gör så för hand: en organisation, en webbplats och en klinik per mottagning med `parentOrganization` (`sites/<övningssajten>/src/innehall/`). seo-graph ([jdevalk/seo-graph](https://github.com/jdevalk/seo-graph), MIT) visar samma mönster med stabila `@id` (`makeIds`).
- **`@id` är en stabil adress med fragment,** till exempel `https://exempel.se/#organisation` och `https://exempel.se/kiropraktor-ort-1/#mottagning`, så att samma nod känns igen på alla sidor.
- **`branchOf` används inte;** schema.org anger att den är ersatt av `parentOrganization` ([schema.org/branchOf](https://schema.org/branchOf)). claude-seo `seo-local` använder fortfarande `branchOf`.

## Typ per sida

| Sida | Noder | Not |
|---|---|---|
| Start | Organisation (eller mest specifika typ), `WebSite` med `name` | `WebSite.name` styr sajtnamnet i sökresultaten och ska vara samma som i `<title>` och `og:site_name` (📄 Google, [Site names](https://developers.google.com/search/docs/appearance/site-names)) |
| Mottagning | En lokal verksamhet av mest specifika typ, med `address`, `geo` (minst fem decimaler), `openingHoursSpecification`, `telephone`, `url` = mottagningens sida, `parentOrganization` | Varje plats är en egen lokal verksamhet (📄 Google, [LocalBusiness](https://developers.google.com/search/docs/appearance/structured-data/local-business)) |
| Kontakt | Hänvisar till mottagningarnas `@id`, eller organisationen om det bara finns en plats | Inga dubbletter av samma plats med olika `@id` |
| Tjänstesida | `Service` med `provider` → organisationens `@id`, `areaServed`, `serviceType` | schema.org-typ; ⚠️ Google visar inget eget resultat för `Service` |
| Sida med brödsmulor | `BreadcrumbList` med minst två led, samma som de synliga | Bara där de syns (→ guiden) |
| Om | `Person` med `worksFor` → organisationen, när personen presenteras | ⚠️ ingen Google-resultattyp; hjälper att binda ihop grafen |

## Regler

- **Bara det som syns på sidan.** 📄 Google: "Don't mark up content that is not visible to readers of the page" och "Put the structured data on the page that it describes" ([riktlinjer för strukturerad data](https://developers.google.com/search/docs/appearance/structured-data/sd-policies)).
- **Mest specifika typen**, flera typer som lista när verksamheten har flera; `additionalType` stöds inte av Google (📄 LocalBusiness).
- **`areaServed` är giltig schema.org men finns inte bland de egenskaper Google listar för LocalBusiness** (uppdaterad 2026-09-08). Behåll den för serviceområdet (→ guiden), men förvänta ingen synlig effekt i Google.
- **Namn, adress och telefon stämmer** mellan sidan, datan och Google-profilen ([platser.md](platser.md)).
- **Inget eget stjärnbetyg** (`aggregateRating` för egna omdömen) (`BESLUT.md` 2026-10-15, *Ställningstaganden*).
- **FAQPage ger inget resultat i Google sedan juni 2026;** behåll den bara om innehållet syns och finns där av andra skäl (→ `guide/2-3-struktur.md`, N2).
- **Datan finns i HTML:en från bygget,** aldrig bara efter att JavaScript körts.
- **Escapa `<`** i JSON-LD, så att text i datan inte kan avsluta skripttaggen (OWASP; så gör övningssajtens `Sida.astro`).

## Verktyg

- **schema-dts** ([google/schema-dts](https://github.com/google/schema-dts), Apache-2.0, v2.1.0) som utvecklingsberoende: typkontroll av all JSON-LD vid bygget, 0 kB i webbläsaren. Den kontrollerar mot schema.org, inte mot Googles krav – Rich Results Test behövs ändå.
- **Egen komponent framför `astro-seo-schema`:** samma sak på några rader, och paketet kräver `schema-dts` version 1.
- **seo-graph** prövas när en sajt har tjänstesidor med `Service` och brödsmulor (N2); skicka in brödsmulorna själv i stället för att härleda dem ur adressen.
- **Sitemap:** övningssajtens egen `sitemap.xml.ts` med `lastmod` ur git är bättre än `@astrojs/sitemap` utan `serialize`; under cirka 500 välänkade sidor behövs ingen sitemap enligt Google, men den kostar inget (→ `guide/2-8-teknik-och-kvalitet.md`, kontroll 7).
