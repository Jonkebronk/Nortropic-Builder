# marketingskills: site-architecture

**Källa:** https://github.com/coreyhaines31/marketingskills, sökvägen `skills/site-architecture/`.
- Version 2.1.0 (frontmatter och `VERSIONS.md`, 2026-10-06).
- Läst 2026-10-16 vid commit `365b412` (2026-10-15). Mappen har 10 commits, den senaste är `759933e` (2026-10-02).
- Lästa filer:
  - `SKILL.md` (359 rader)
  - `references/site-type-templates.md` (293), `navigation-patterns.md` (305), `mermaid-templates.md` (216), `platforms-and-migration.md` (86)
  - `evals/evals.json`
  - repots `README.md` och `VERSIONS.md`
  - grannfilen `skills/seo-audit/references/local-seo-pages-and-measurement.md`

**Licens:** MIT, © 2025 Corey Haines. Licenstexten följer med vid kopiering.

**Vad det är:**
- En skill för att planera eller göra om en sajts sidhierarki, navigation, URL-struktur och internlänkning.
- XML-sitemaps ligger utanför (de hör till seo-audit).
- Repot är en marknadsföringssamling med 40 skills.

**Hur det fungerar:**
- **Frågor först:** affär, nuläge, sajttyp och innehållsinventering. Kontexten läses ur `.agents/product-marketing.md`.
- **Sajttyper med djup.** Small business har "1-2 levels", "Home, Services, About, Contact" och `/services/name`.
  - Småföretagsmallen (`site-type-templates.md`, rad 258–293): Services (A–C), About, Testimonials, Blog, Contact, Privacy och Terms.
  - Headern har "5 items + CTA". "Every page should be reachable from the header".
- **Regler för URL:er:** läsbara, bindestreck, gemener, konsekvent snedstreck på slutet, inga datum, ID eller frågeparametrar, och 301 för varje gammal URL.
- **Internlänkar:** inga föräldralösa sidor, beskrivande ankartext, nav och ekrar (hub-and-spoke).
- **Fem utdata:**
  1. ASCII-träd med URL:er.
  2. Mermaid `graph TD` med `subgraph` per navigationszon.
  3. URL-tabell (`Page | URL | Parent | Nav Location | Priority`).
  4. Navigationsspec.
  5. Internlänkplan.
- **Migrering** (`platforms-and-migration.md`): crawla, behåll URL:er där det går, en-till-en-301:or, aldrig allt till startsidan, och bevaka Search Console i två veckor.

**Kvalitet och underhåll:**
- Repot har 54 998★, 8 148 forkar, 53 bidragsgivare, push 2026-10-15, 15 öppna ärenden och 10 öppna PR. Mycket aktivt.
- Inga öppna ärenden rör site-architecture.
- Evals: 8 fall, men inget för småföretag eller lokala företag. Härlett: profilen för småföretag är otestad.
- **Kända fel, kontrollerade ordagrant mot primärkällor:**
  1. Tre-klicksregeln mot NN/g "not backed by data".
  2. "Breadcrumbs should mirror the URL hierarchy" mot Google "typical user path … instead of mirroring the URL structure".
  3. "4-7 items max" utan belägg, mot NN/g ≤4 synliga på mobil.
  4. Brödsmulor "on every page" mot NN/g riktlinje 7: onödiga på 1–2 nivåer.
  5. Nuvarande sida utelämnas, mot NN/g riktlinje 4–5 och APG `aria-current`.
  6. "Hamburger … Standard for mobile" mot NN/g:s studie om dold navigation.
  7. "5-10 internal links per 1000 words" utan källa. claude-seo anger 2–5.
  8. Påståenden om PageRank i header och sidfot, och att ortssidor ska ligga i sidfoten, utan Google-källa. Det senare liknar doorway-mönstret.

**Det bästa vi kan ta:**
- De fem utdataformaten (*Output Format*) och Mermaid-mallarna med färgkod för ny, flyttad och borttagen sida (`mermaid-templates.md`, *Color-Coding Conventions*).
- URL-reglerna och *Common Mistakes*.
- Migreringslistan (`platforms-and-migration.md`, *Migrating Without Losing Traffic*), till exempel när en kunds gamla WordPress-sajt ersätts.
- Grannfilen i seo-audit för serviceområden: "Do not show a fake street address or imply a staffed branch", och att ortssidor bara görs när de tillför något.

**Var det hamnar hos oss:**
- `skill: struktur`.
- Delfiler (förslag):
  - `struktur/sidkarta.md`: träd, Mermaid och URL-tabell.
  - `struktur/navigation.md`: rättade regler.
  - `struktur/adresser.md`: svenska slugs, snedstreck och 301.
  - `struktur/internlankar.md`.
- Profilen för småföretag byggs ut med tjänste-, ort- och serviceområdessidor, öppettider och bokning.

**Passar vår stack?** Reviderat efter BESLUT 2026-10-16, *React, Tailwind och JavaScript tillåts*. Bedömningen är oförändrad.
- Ja, den är ramverksfri och kostar 0 kB.
- Med React-öar blir skillens "Don't use JavaScript-only nav" en kontroll. Huvudnavigation, brödsmulor och internlänkar ska vara `<a href>` i HTML från bygget, aldrig i en `client:only`-ö. Det stöds av Google: "Google can only crawl your link if it's an `<a>` HTML element" med `href`. En mobilmeny som ö kräver att länkarna finns i HTML också utan JavaScript (krock med *HTML först* att ta upp med Johnny).
- Översätt till svenska slugs (`/tjanster/<tjanst>`, `/om-oss`, `/kontakt`, `/integritet`). Google tillåter translitterering eller procentkodning, och skillen tar inte upp å, ä och ö.
- "Consistent trailing slash" motsvarar `trailingSlash` i Astro-konfigurationen. 301:or läggs i Cloudflare `_redirects` (härlett).
- Plattformsvalet (Webflow, Framer och liknande) är irrelevant.

**Risker och flaggor:**
- Kommersiella partner: README har reflänkar till upphovspersonens byrå och partnerblocket (Ploy, Converly, AIsa). `platforms-and-migration.md` märker Ploy som ◆ Verified Partner, "disclosure, not endorsement".
- Skillen förutsätter `product-marketing`-skillen.
- Ingen telemetri i skillen. Skript i `tools/` kördes inte.

**Inloggning:** behövs inte.

**Slutligt förslag (skelett-struktur-beslut.json, 2026-10-16):** `skill: struktur`; formaten i `.claude/skills/struktur/sidkarta.md`, rättelserna i `struktur/navigation.md` och förbuden i `struktur/SKILL.md`.
