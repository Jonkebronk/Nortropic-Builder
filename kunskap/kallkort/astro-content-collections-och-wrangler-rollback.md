# Astro content collections och wrangler rollback

**Källa:**
- Astro, *Content collections* (docs.astro.build/en/guides/content-collections/), läst 2026-10-16. withastro/astro har HEAD `484822fb` (2026-10-16). Övningssajten använder Astro 7.4.0.
- Cloudflare, *Rollbacks* och *D1 Time Travel*, lästa 2026-10-16. Wrangler i cloudflare/workers-sdk, HEAD `e7f9e4e9`.

**Licens:**
- Astro: MIT. GitHubs metadata visar *NOASSERTION*, eftersom LICENSE också innehåller MIT-notiser från Vite och SvelteKit.
- Astros dokumentation: MIT (withastro/docs).
- Wrangler: Apache-2.0.
- Licenstexten följer med vid kopiering av kod.

**Vad det är:** Två inbyggda mekanismer.
- Content collections ger innehållet en form med ett schema, så att ogiltigt innehåll ger ett fel i bygget.
- `wrangler rollback` flyttar produktionen tillbaka till en tidigare version av Workern.

**Hur det fungerar:**
- **Content collections:**
  - Definieras i `src/content.config.ts` med `defineCollection()`.
  - `glob()` läser många filer: Markdown, MDX, Markdoc, JSON, YAML eller TOML.
  - `file()` läser en fil med många poster, som en lista med objekt med unika `id` i JSON eller YAML.
  - Ett Zod-schema beskriver formen och ger TypeScript-typer.
  - Vid brott mot schemat ger Astro *"a helpful error"*. Om bygget då stoppas säger sidan inte uttryckligen ⚠️.
  - `reference()` kopplar poster mellan samlingar.
- **Rollback:**
  - Gäller de 100 senaste versionerna.
  - Skapar direkt en ny deployment.
  - Ändrar inte anslutna resurser.
  - Stoppas när målversionen binder resurser som inte finns längre, eller när en Durable Object-klass ändrats.
  - Data i D1 återställs separat med Time Travel, som skriver över databasen.

**Kvalitet och underhåll:**
- Astro: 63 266 ★, 15 283 commits, cirka 1 622 författare, 2 039 commits sedan årsskiftet. Cloudflare köpte Astro i januari 2026 med beskedet att det förblir öppen källkod (via researchen).
- workers-sdk: 4 629 ★.
- Kända problem med content collections är inte sökta ⚠️.

**Det bästa vi kan ta:**
- **En post per faktum.** Mottagningar med dagar och tider som `HH:MM`, telefon och pris i en `file()`-samling med Zod-schema. Text, sidfot, faktakort, metabeskrivning och `openingHoursSpecification` härleds ur posten.
- **Avvikande öppettider som data,** och `specialOpeningHoursSpecification` (schema.org).
- **Rollbackens gränser:** schemaändringar görs bakåtkompatibelt i två steg.

**Var det hamnar hos oss:**
- Skillen `drift`: `andringar.md` (*Innehållsgrinden*) och `aterstallning.md`.
- Förslag till biblioteket: `content.config.ts` och posten för mottagningar i `bibliotek/src/`.
- Revisionen av övningssajten: H1 visar att öppettiderna står för hand på 19 rader, och M2 att helgdagar saknas.
- Beslut: **skill: drift**.

**Passar vår stack?** Ja. Astro statiskt, inget JavaScript till webbläsaren och inget Tailwind. Det som ska översättas är sajtens TypeScript-objekt i `src/innehall/*.ts`, som blir en samling med schema.

**Risker och flaggor:**
- Pröva att ett schemabrott stoppar bygget innan grinden räknas som låst.
- Rollback av koden kan krocka med data som ändrat form.
- Inga licens- eller telemetriproblem i flödet. Astros telemetri är avstängd i kontrollskriptet med `ASTRO_TELEMETRY_DISABLED`.

**Inloggning:** Inget kräver inloggning för att läsas. `wrangler rollback` mot produktion kräver kundens Cloudflare-konto och görs efter Johnnys ja.
