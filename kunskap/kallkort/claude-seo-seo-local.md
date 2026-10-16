# claude-seo: seo-local

**Källa:** https://github.com/AgriciDaniel/claude-seo, sökvägen `skills/seo-local/`.
- Version "2.4.2" (frontmatter).
- Läst 2026-10-16 vid commit `4b99de2` (2026-10-05). Mappen har 34 commits, den senaste är `c167521` (2026-10-04, release v2.4.2).
- Lästa filer:
  - `seo-local/SKILL.md` (314 rader) och `LICENSE.txt`
  - referenserna `skills/seo/references/local-schema-types.md`, `local-schema-multilocation.md`, `quality-gates.md` och `local-seo-signals.md` (de första 60 raderna)
  - `PRIVACY.md`, `hooks/hooks.json`, CHANGELOG (sökt efter local) och, kort, `seo-schema` och `seo-sitemap`
- Kontrollerat mot:
  - [Google Business Profile-riktlinjer](https://support.google.com/business/answer/3038177)
  - [Googles LocalBusiness-dokumentation](https://developers.google.com/search/docs/appearance/structured-data/local-business) (2026-09-08)
  - [Creating helpful content](https://developers.google.com/search/docs/fundamentals/creating-helpful-content) (2026-10-05)
  - [schema.org/branchOf](https://schema.org/branchOf)

**Licens:** MIT, © 2026 agricidaniel. `seo-local/LICENSE.txt` hänvisar till rotens MIT-licens. Licenstexten följer med vid kopiering.

**Vad det är:**
- En granskningsskill för lokal SEO: Google Business Profile, NAP, citeringar, omdömen, lokal schema, ortssidor och flera platser.
- Utdata är en rapport med poäng 0–100.

**Hur det fungerar:**
- **Klassning.** Butik, SAB (serviceområdesföretag) eller hybrid, och sedan bransch: restaurang, vård, juridik, hemtjänster, fastighet eller fordon.
- **Sex dimensioner med vikter:** GBP 25 %, omdömen 20 %, on-page 20 %, NAP och citeringar 15 %, schema 10 % och länkar 10 %.
- **Ortssidor.**
  - Swap-testet: "if you can swap the city name and content still makes sense, it's a doorway page (RicketyRoo method)".
  - ">60-70% unique content minimum (industry consensus, no Google-confirmed threshold)".
  - Varningsnivåer: "WARNING at 30+" och "HARD STOP at 50+" (`quality-gates.md`).
- **Schema.**
  - Specifik subtyp, `geo` med minst 5 decimaler.
  - SAB får `areaServed` med namngivna orter och `sameAs` till Wikipedia/Wikidata.
  - Flera platser: `@id` per plats och `branchOf`.
  - Mönster för hemtjänster: subtyp + `areaServed` + `Service` med `provider` + `hasOfferCatalog`.

**Kvalitet och underhåll:**
- Repot har 19 036★, 2 774 forkar, 30 bidragsgivare, push 2026-10-04, 21 öppna ärenden och 15 öppna PR.
- Inga öppna ärenden rör seo-local. CHANGELOG nämner rättade verktygsnamn för DataForSEO i seo-local.
- **Fel och svagheter:**
  - Minsta antal ord per sidtyp (tjänstesida 800, ortssida 600, FAQ 800) motsägs av Google: "(No, we don't.)" om föredraget antal ord.
  - `branchOf` är enligt schema.org "superseded" av `parentOrganization`.
  - Nivåerna 30/50 är för höga för småföretag. Doorway-risken finns redan vid två sidor (Googles exempel).
  - Overifierat (⚠️): RicketyRoo, HVAC-fallet (−80 %), Sterling Sky, Webstix "43% CTR", Bing Places "powers ChatGPT", och "Schema is NOT a direct ranking factor (John Mueller confirmed)" utan länk.

**Det bästa vi kan ta:**
- Swap-testet (*3. Local On-Page SEO*), som kan bli en automatisk jämförelse mellan ortssidor.
- NAP-kontroll mellan synlig HTML, JSON-LD och profil (*4.*).
- Klassningen butik, SAB eller hybrid (*Business Type Detection*).
- Mönstret för hemtjänster i `local-schema-types.md` och listan med subtyper (Electrician, Plumber, HousePainter, RoofingContractor, MedicalClinic, Dentist, CafeOrCoffeeShop, Bakery).

**Var det hamnar hos oss:**
- `kontroll`: swap-testet, NAP-konsekvensen och SAB-regeln i struktur-granskningen. Regeltexten står i `struktur/lokal.md` (förslag).
- SAB-regeln (tolkning, inte juridisk rådgivning):
  - Döljer kunden adressen i sin profil ("If you're a service-area business, you should hide your business address", Google) visas ingen gatuadress på sajten eller i JSON-LD.
  - Då uppfylls inte Googles krav på `address` för LocalBusiness-resultatet.
  - marketingskills seo-audit säger samma sak: "do not fabricate an address or promise eligibility from `areaServed` alone".

**Passar vår stack?** Reviderat efter BESLUT 2026-10-16, *React, Tailwind och JavaScript tillåts*. Bedömningen är oförändrad.
- Granskningslogiken ja. JSON-LD skrivs vid byggtid i Astro och kostar 0 kB.
- Med React-öar blir skillens "SSR/SSG preferred over CSR" för ortsväljare en kontroll. NAP, öppettider, ortslistor och JSON-LD ska finnas i HTML från bygget, aldrig bara i en `client:only`-ö.
- En inbäddad karta som ö är tillåten men tung. Skillen säger själv "lazy-load to mitigate speed impact", och det är en krock med Lighthouse 100 att ta upp med Johnny.
- Allt USA-specifikt ska bort eller ersättas: BBB, Yelp, Chamber of Commerce, FTC, HIPAA, NPI, dataaggregatorer, `addressRegion` som State och `"US"`.
- ⚠️ Svenska motsvarigheter är inte undersökta: hitta.se, Eniro, Apple Business Connect, Bing Places och branschregister.

**Risker och flaggor:**
- Som plugin installerar claude-seo en `PostToolUse`-hook på varje Edit och Write (`hooks.json`: `validate-schema.py`). Det ska inte in i byggsessionen.
- Skript och tillägg (DataForSEO, Firecrawl med flera) skickar URL:er till tredje part när de körs. PRIVACY.md säger "No telemetry" för kärnan.
- Statistiktabellen är full av siffror från branschstudier som presenteras som fakta.

**Inloggning:** behövs inte för skillen. Valfria tillägg kräver API-nycklar och ska inte användas.

**Slutligt förslag (skelett-struktur-beslut.json, 2026-10-16):** `kontroll`; bytestestet och regeln för företag utan besöksadress står i `.claude/skills/struktur/platser.md`.
