# seo-graph

**Källa:** <https://github.com/jdevalk/seo-graph>, senaste commit `c33eb1e` (2026-07-08; push 2026-09-21 enligt GitHub-API). Läst 2026-10-16: README, avsnittet *Local business* och typlistan i `AGENTS.md` (via GitHub-API), öppna ärenden. Bakgrund: <https://joost.blog/seo-graph/> ⚠️ (inte läst).

**Licens:** MIT ("© Joost de Valk"). Kräver att licenstexten följer med.

**Vad det är:** ett monorepo med en ren byggare av schema.org-grafer i JSON-LD (`@jdevalk/seo-graph-core`, beror bara på `schema-dts`) och en Astro-integration (`@jdevalk/astro-seo-graph`) med en `<Seo>`-komponent, brödsmulehjälp och färdiga endpoints. Upphovspersonen är Joost de Valk, som grundade Yoast SEO.

**Hur det fungerar:**
- Sju särskilda byggare (`buildWebSite`, `buildWebPage`, `buildArticle`, `buildBreadcrumbList`, `buildImageObject`, `buildVideoObject`, `buildSiteNavigationElement`) och `buildPiece<Typ>` för allt annat, typat med `schema-dts`. `makeIds` ger stabila `@id` per nod, så att företag, sida, tjänst och brödsmulor binds ihop i en `@graph`.
- "Breadcrumbs are an input, not a derivation": kärnan räknar inte ut brödsmulor; Astro-delen har `breadcrumbsFromUrl` som hjälp.
- `AGENTS.md` har recept per sajttyp, bland annat lokalt företag (exemplet är en restaurang med `PostalAddress`, `telephone` och `priceRange`).

**Kvalitet och underhåll:** 50 stjärnor, skapad i april 2026, 8 öppna ärenden (två buggar om IndexNow), 7 bidragsgivare (GitHub-API 2026-10-16). Ungt.

**Det bästa vi kan ta:** grafmönstret med `@id` som binder organisation, mottagning, webbsida, tjänst och brödsmulor – det övningssajten redan gör för hand (`MedicalOrganization` + `MedicalClinic` per mottagning med `parentOrganization`). Receptet för lokala företag som kontrollista.

**Var det hamnar hos oss:** `senare: N2`. Grafmönstret går in i `struktur`, delfilen `strukturerad-data.md`, som en regel; paketet prövas först när en sajt har tjänstesidor med `Service` och brödsmulor, eftersom vår egen kod på cirka 30 rader räcker i dag.

**Passar vår stack?** Ja. Allt körs vid bygget och ger 0 kB JavaScript i webbläsaren. `breadcrumbsFromUrl` bygger på adressen, vilket Google avråder från som enda grund ("typical user path … instead of mirroring the URL structure"); skicka in brödsmulorna själv.

**Risker och flaggor:** ungt projekt med en huvudutvecklare; Astro-integrationen gör mer än vi behöver (IndexNow, endpoints för agenter); `breadcrumbsFromUrl` följer adressen.

**Inloggning:** krävs inte.
