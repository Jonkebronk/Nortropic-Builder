# @astrojs/sitemap och schema-dts

**Källa:** Astro-dokumentationen <https://docs.astro.build/en/guides/integrations-guide/sitemap/> (beskriver v3.7.4), läst 2026-10-16; <https://github.com/google/schema-dts> README, release v2.1.0 (2026-10-02); Google Search Central, Sitemaps <https://developers.google.com/search/docs/crawling-indexing/sitemaps/overview> och riktlinjerna för strukturerad data (via `kunskap/research/2026-10-15_kompetensluckor-anteckningar/lager-3-4-struktur-skelett.md`, fråga 4). Övningssajtens `src/pages/sitemap.xml.ts` och `Sida.astro`.

**Licens:** `@astrojs/sitemap` ingår i Astro-monorepot (MIT ⚠️ GitHub-API anger "NOASSERTION" för hela monorepot); `schema-dts` Apache-2.0 – kräver att licensen och eventuell NOTICE följer med vid spridning, vilket inte blir aktuellt eftersom den bara används vid bygget.

**Vad det är:** `@astrojs/sitemap` är Astros officiella integration som skriver sitemap vid bygget. `schema-dts` är TypeScript-typer för hela schema.org-vokabulären i JSON-LD-form, från Google men "not an officially supported Google product".

**Hur det fungerar:**
- Sitemap: kräver `site` i `astro.config`. Skriver `sitemap-index.xml` och `sitemap-0.xml`. Alternativ: `filter`, `customPages`, `customSitemaps`, `entryLimit`, `changefreq`, `lastmod`, `priority`, `serialize`, `chunks`, `i18n`, `xslURL`, `filenameBase`, `namespaces`. Lägger inte in `<link rel="sitemap">` själv. Rad i `robots.txt` (`Sitemap:`) rekommenderas, gärna genererad från `src/pages/robots.txt.ts`. Google ignorerar `changefreq` och `priority`.
- Google: en sajt med ungefär 500 sidor eller färre som är väl länkad internt behöver kanske ingen sitemap.
- schema-dts: `npm install --save-dev schema-dts`; `WithContext<LocalBusiness>` ger typkontroll och autokomplettering; inget följer med till webbläsaren.

**Kvalitet och underhåll:** schema-dts 1 250 stjärnor, push 2026-10-02, 14 öppna ärenden, 11 bidragsgivare; Astro 63 266 stjärnor (GitHub-API 2026-10-16).

**Det bästa vi kan ta:**
- schema-dts som typ för all JSON-LD i biblioteket, så att fel typnamn eller egenskaper fångas vid bygget.
- Övningssajtens egen `sitemap.xml.ts` är bättre än integrationen på en punkt: `lastmod` hämtas ur git per sida. Behåll den, eller använd `serialize` i integrationen för samma sak.

**Var det hamnar hos oss:** `bibliotek` (schema-dts som utvecklingsberoende; sitemapen är redan kontroll 7 i `2-8`). `struktur`, delfilen `strukturerad-data.md`, hänvisar.

**Passar vår stack?** Ja, båda körs bara vid bygget: 0 kB JavaScript.

**Risker och flaggor:** schema-dts 2 kan krocka med paket som kräver version 1 (se `astro-seo-schema.md`); typerna validerar mot schema.org, inte mot Googles krav för resultattyper – Rich Results Test behövs fortfarande.

**Inloggning:** krävs inte.
