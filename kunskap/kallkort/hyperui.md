# HyperUI

**Källa:** <https://github.com/markmead/hyperui>, commit `252efcf` (2026-10-10). Läst 2026-10-16: `LICENSE`, `CLAUDE.md`, `public/examples/marketing/` (alla kategorier), FAQ-exemplen och sidhuvudena. Webbplatsen <https://www.hyperui.dev/components/marketing>. Lokalt: `kallor/markmead-hyperui/`.

**Licens:** MIT ("Copyright (c) Mark Mead"). Kräver att licenstexten följer med.

**Vad det är:** en samling kopiera-och-klistra-komponenter i ren HTML med Tailwind 4, utan JavaScript-bibliotek. Marknadsföringsdelen har 22 kategorier, varje exempel i ljus och mörk version.

**Hur det fungerar:**
- Varje exempel är en HTML-fil (`1.html`, `1-dark.html` …). Filer per kategori (sett, ljus + mörk): sidfötter 24, kontaktformulär 10, CTA 8, sidhuvuden 8, vanliga frågor 6, team 6, statistik 6, omdömen 3, sektioner 4, logotypmoln 4.
- Vanliga frågor bygger på `<details>` och `<summary>`, med `group-open:` för chevronens rotation; ingen skripttagg.
- Sidhuvudena har en menyknapp ("Toggle menu", `md:hidden`) utan beteende; själva mobilmenyn får man bygga själv.

**Kvalitet och underhåll:** 12 260 stjärnor, push 2026-10-10, 0 öppna ärenden, 47 bidragsgivare (GitHub-API 2026-10-16).

**Det bästa vi kan ta:**
- Sidfötterna (flest varianter av alla källor): spaltindelning, ordning och den avslutande raden.
- Kontaktformulären som layoutvarianter (fält i två spalter, kontaktvägar bredvid formuläret).
- FAQ-varianterna som redan är `<details>`.

**Var det hamnar hos oss:** biblioteket (varianter av sidfot, kontakt och vanliga frågor), med `skill: skelett`, `varianter.md`, som pekar dit.

**Passar vår stack?** Ja. Ren HTML som går att lägga i Astro-komponenter som de är; Tailwind är tillåtet sedan 2026-10-16, men klasserna behöver pekas om till kitets tokens. JavaScript-kostnad: 0 kB.

**Risker och flaggor:**
- Mobilmenyn saknas i sidhuvudena: en knapp utan funktion får aldrig följa med (vi har popovermenyn).
- Hårdkodade Tailwind-färger (`gray-100`, `teal-600`) måste bytas mot kitets tokens, annars bryter de mot regeln om bara tokens (`guide/2-4-skelett.md`).
- Få omdömes- och prisvarianter.

**Inloggning:** krävs inte.
