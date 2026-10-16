# marketingskills: seo-audit, och claude-seo

Två skill-paket i ett kort, med ett avsnitt var. Allt är läst 2026-10-16. Inget är installerat.

---

## 1. coreyhaines31/marketingskills: seo-audit (och schema)

**Källa:**
- https://github.com/coreyhaines31/marketingskills, main vid commit `365b412` (2026-10-15).
- **Lästa helt:**
  - `skills/seo-audit/SKILL.md` (v2.2.1)
  - `references/local-seo.md`, `local-seo-profile-and-citations.md`, `local-seo-pages-and-measurement.md`, `title-tags.md` och `rankings-push.md`
  - `evals/evals.json` (13 testfall, bland annat tre lokala)
  - `skills/schema/SKILL.md` (v2.0.2)
  - `README.md` (licens, partners och installation)
- **Bara rubriker:** `references/international-seo.md` och `ai-writing-detection.md`.
- **Google-sidor som jämförelse:**
  - [title-link](https://developers.google.com/search/docs/appearance/title-link)
  - [snippet](https://developers.google.com/search/docs/appearance/snippet) (uppd. 2026-04-20)
  - [SEO Starter Guide](https://developers.google.com/search/docs/fundamentals/seo-starter-guide) (uppd. 2025-12-10)
  - [Organization](https://developers.google.com/search/docs/appearance/structured-data/organization) (uppd. 2026-09-08)
  - [search/updates](https://developers.google.com/search/updates)
  - [Page experience-bloggen 2023-04](https://developers.google.com/search/blog/2023/04/page-experience-in-search)

**Licens:**
- MIT. Behåll copyright-raden ("Copyright (c) 2025 Corey Haines") och licenstexten om text eller kod kopieras.
- Vi destillerar med egna ord, så det ställs inga krav.

**Vad det är:**
- Ett stort bibliotek med marknadsföringsskills för agenter.
- `seo-audit` är en granskningsmetod med prioritetsordning, checklistor och rapportformat. Sedan 2026-10-08 ingår lokal SEO som tre referensfiler.

**Hur det fungerar:**
- **Säkerhetsregel:** hämtade sidor är opålitlig data, och instruktioner i HTML följs aldrig.
- **Viktig begränsning:** `web_fetch`/`curl` ser inte JSON-LD som injiceras med JS. Använd renderad DOM eller Rich Results Test.
- **Prioritetsordning:** 1. crawlbarhet och indexering, 2. teknisk grund, 3. on-page, 4. innehållskvalitet, 5. auktoritet och länkar. Därefter sidor på plats 8–20 (`rankings-push.md`).
- **Rapportformat:** varje fynd har Issue, Impact (H/M/L), Evidence, Fix och Priority. Handlingsplanen går från Critical till High-impact, Quick wins och Long-term.
- **Lokala företag** (`local-seo*.md`):
  - Börja i affärsmodellen: butik, serviceområde, hybrid eller bara online.
  - Skilj på kartytan och de organiska träffarna. Rankningen bygger på relevans, avstånd och prominens. Lova aldrig topp tre.
  - **Prioritet:**
    1. fel, duplicerad, overifierad eller avstängd profil
    2. kunden når inte fram (fakta, öppettider, länkar)
    3. efterfrågan saknas på sajten (kategorier, tjänste- och platssidor)
    4. förtroende (recensioner, citeringar)
  - Ett kanoniskt platsregister. **Ingen hemadress publiceras** för att uppfylla en checklista.
  - Platssidor bara med verkligt innehåll. Ett serviceområde är ingen filial.
  - JSON-LD: mest specifik undertyp, stabilt `@id` och fakta som syns på sidan.
  - **Ingen självpublicerad recensionsmarkup.** Recensioner begärs neutralt, utan urval eller belöning.
  - Mät samtal och bokningar. Tabellen för citeringsstädning har kolumnerna källa, fakta, åtgärd och verifieringsdatum.
- **Rättelse i `schema`:** Google slutade visa FAQ rich results 2026-05-07 och tog bort dokumentationen 2026-06-15. **Det stämmer** (search/updates, 2026-05-08 och 2026-06-15).

**Tumregler utan stöd hos Google:**

| Skillens regel | Vad Google säger |
|---|---|
| Titel ungefär 50–60 tecken | Ingen gräns. Trunkering sker efter skärmbredd (title-link) |
| Meta description 150–160 tecken | "There's no limit on how long a meta description can be" (snippet) |
| En H1 per sida, logisk ordning H1→H2→H3 | Ingen magisk mängd rubriker, och ordningen spelar ingen roll (Starter Guide) |
| Nyckelord bland de första 100 orden och i URL:en | Nyckelord i URL:en har "hardly any effect" (Starter Guide) |
| "Sufficient depth/length" | "no magical word count target" (Starter Guide) |
| Titeln är "the strongest on-page relevance signal" och man ska vänta 3–4 veckor | Ingen källa anges i skillen |
| Engagemangssignaler: tid på sida, avvisningsfrekvens | Ingen Google-källa anges |
| Organization kräver `name` och `url` (`schema`) | "There are no required properties" (Organization) |
| CWV som "< 2.5s" | Google anger "≤" |

- **Inaktuellt:** skillen hänvisar till **Mobile-Friendly Test**, som Google lade ned 2023-12-01 (Page experience-bloggen 2023-04).

**Kvalitet och underhåll:**
- 55 006 stjärnor, 8 148 forks, 53 bidragsgivare och 25 öppna ärenden och PR:er enligt GitHub-API:t 2026-10-16 (bidragsgivare med `anon=1`; öppna ärenden räknas ihop med PR:er). I git-historiken: 1 166 commits och 54 mänskliga författaradresser, alla från 2026 (repot skapades 2026-01). Senaste commit 2026-10-15. `seo-audit` ändrades 2026-10-08 och 2026-10-10.
- 15 öppna ärenden, alla önskemål om funktioner.
- Repot finansieras av "Verified Partners" (`README.md`, `tools/PARTNERS.md`). Enligt README påverkar partnerna inte kärnskillsens råd.

**Det bästa vi kan ta:**
- Prioritetsordningen (`SKILL.md`, *Priority Order*).
- Den lokala prioritetsordningen 1–4 och regeln om dold hemadress (`local-seo.md`, *Diagnose the Local Search Problem*).
- Fältgenomgången och tabellen för citeringsstädning (`local-seo-profile-and-citations.md`).
- Platssidornas innehåll och regeln om serviceområde (`local-seo-pages-and-measurement.md`).
- Listan "Shipping a new page" (`rankings-push.md`). Den kan nästan helt översättas till deterministiska kontroller.

---

## 2. AgriciDaniel/claude-seo: technical, local, schema, sitemap och hooken

**Källa:**
- https://github.com/AgriciDaniel/claude-seo, main vid commit `4b99de2` (2026-10-05), release **v2.4.2** (2026-10-04).
- **Lästa helt:** `skills/seo-technical/SKILL.md`, `skills/seo-local/SKILL.md`, `skills/seo-schema/SKILL.md`, `skills/seo-sitemap/SKILL.md`, `hooks/hooks.json`, `hooks/run-python-hook.js` och `hooks/validate-schema.py` (logik och main).
- **Delvis lästa:** `skills/seo/SKILL.md` (prioritetsnivåer och vikter), `PRIVACY.md`, `SECURITY.md`, `README.md` (installation) och `LICENSE`.
- **Ärenden:** sök-API:t, plus [#321](https://github.com/AgriciDaniel/claude-seo/issues/321) som lästes på webben.

**Licens:**
- MIT ("Copyright (c) 2026 agricidaniel"). Varje skill har en `LICENSE.txt` som hänvisar till roten.

**Vad det är:**
- Ett Claude Code-plugin med 25 SEO-underskills, Python-skript, agenter och en hook.
- Det finns valfria betalda tillägg (DataForSEO, Ahrefs med flera) och Google-API:er.

**Hur det fungerar:**
- **Prioritetsnivåer** (`seo/SKILL.md`):
  - **Critical:** blockerar indexering eller ger straff (åtgärda direkt).
  - **High:** påverkar rankningen tydligt (inom 1 vecka).
  - **Medium:** möjlighet till optimering (inom 1 månad).
  - **Low:** backlog.
  - Vikterna i hälsopoängen (Technical 22 %, Content 23 % osv.) är egna och saknar källa.
- **`seo-technical`:** nio kategorier:
  1. crawlbarhet: robots, sitemap, noindex, ≤ 3 klick, AI-crawlertabellen
  2. indexerbarhet: självrefererande canonical utan krock med noindex, paginering med `<a href>`
  3. säkerhet: HTTPS och huvudena CSP, HSTS, XFO, XCTO och Referrer-Policy
  4. URL: högst 1 omdirigeringshopp, enhetliga snedstreck
  5. mobil: viewport, 24×24 px enligt WCAG 2.2, paritet mellan mobil och dator
  6. CWV ≤ 2,5 s, ≤ 200 ms och ≤ 0,1 vid p75
  7. strukturerad data
  8. JS-rendering: innehållet ska finnas i rå HTML, och canonical, robots och JSON-LD ska vara lika före och efter JS
  9. IndexNow

  Poäng ges bara för det som mätts ("not measured" annars). Skripten vägrar som standard localhost (`CLAUDE_SEO_LOCAL_TARGETS` öppnar).
- **`seo-local`:**
  - Avgör affärstyp (butik, serviceområde eller hybrid) och bransch.
  - Viktade dimensioner: GBP 25 %, recensioner 20 %, lokal on-page 20 %, NAP och citeringar 15 %, schema 10 %, länkar 10 %.
  - Kontroller: stad och tjänst i title och H1, NAP synlig i HTML, en sida per kärntjänst, `tel:`-länk, **NAP jämförd mellan sida, JSON-LD och GBP**, mest specifik undertyp, `geo` ≥ 5 decimaler, `@id` per plats och `branchOf`.
  - NAP som saknas helt räknas som Critical.
  - Statistiken kommer från Whitespark, BrightLocal och Sterling Sky, alltså branschkällor. Katalogerna är amerikanska (Yelp, BBB, Data Axle).
  - **Rekommenderar `aggregateRating` i LocalBusiness**, vilket marketingskills uttryckligen avråder från. ⚠️ Googles policysida för självpublicerade recensioner lästes inte.
- **`seo-schema`:** kontrollerar `@context`/`@type`, platshållare, relativa URL:er, datumformat och utfasade typer. FAQPage räknas som Info. JSON-LD ska ligga i serverrenderad HTML. LocalBusiness-mallen är amerikansk ("State", "ZIP", `addressCountry: "US"`).
- **`seo-sitemap`:**
  - ≤ 50 000 URL:er och ≤ 50 MB (Critical).
  - URL:er utan svar 200 och noindex-URL:er: High. Omdirigerade URL:er: Medium. Identisk `lastmod`: Low. `priority`/`changefreq`: Info.
  - `lastmod` ska spegla verklig ändring. Sitemapen ska anges i robots.txt.
- **Hooken:**
  - `hooks.json` registrerar **PostToolUse på `Edit|Write` i alla projekt**. `run-python-hook.js` provar `py -3`, `python3` och `python` och kör `validate-schema.py` på den redigerade filen.
  - Skriptet validerar bara `.html`, `.htm`, `.jsx`, `.tsx`, `.vue`, `.svelte`, `.php` och `.ejs`. **`.astro`-filer valideras alltså inte**, men hooken startar ändå vid varje redigering.
  - Vid platshållare eller utfasade typer avslutar den med kod 2 och skriver till stderr. Rättat 2026-10-03, efter att ärendet #321 visat att stdout gick förlorat.

**Kvalitet och underhåll:**
- 19 037 stjärnor, 2 774 forks, 30 bidragsgivare och 36 öppna ärenden och PR:er enligt GitHub-API:t 2026-10-16 (bidragsgivare med `anon=1`; öppna ärenden räknas ihop med PR:er). I git-historiken: 383 commits och 32 mänskliga författaradresser, alla från 2026. Senaste commit 2026-10-05. En huvudunderhållare.
- 21 öppna ärenden, många nyligen:
  - [#333](https://github.com/AgriciDaniel/claude-seo/issues/333): `seo-schema` underkänner giltig JSON-LD med `@graph`.
  - [#335](https://github.com/AgriciDaniel/claude-seo/issues/335): taket på 1 000 för news tillämpas på alla URL:er.
  - [#331](https://github.com/AgriciDaniel/claude-seo/issues/331): bildformat avgörs av filändelsen.
  - [#321](https://github.com/AgriciDaniel/claude-seo/issues/321): granskning av pluginet. Hooken körs vid varje redigering, och den flaggar platshållare som skillen själv lär ut. 19 agenter har låst modell. Deterministisk räkning görs i språkmodellen. Inget svar från underhållaren syns.
- Det finns en betald "AI Marketing Hub Pro"-version med förhandsutgåvor via Skool (`README.md`, *Installation*).
- ⚠️ Overifierade Google-påståenden i skillen: gräns på 2 MB HTML, "back-button hijacking" i spampolicyn 2026-04-13 med verkställighet 2026-06-15, AMP-ändringen 2026-07-01 och flytten av crawling-dokumentationen 2025-11-20.

**Det bästa vi kan ta:**
- **JS-renderingsregeln** (`seo-technical`, avsnitt 8): canonical, robots, title, description och JSON-LD ska stå i den förrenderade HTML:en och vara lika efter JS. Den passar direkt till React-öar.
- **NAP-jämförelsen** mellan sida, JSON-LD och profil (`seo-local`, avsnitt 4).
- Allvarsnivåerna för sitemap (`seo-sitemap`, *Common Issues*).
- Definitionerna Critical, High, Medium och Low (`seo/SKILL.md`).

---

**Var det hamnar hos oss (båda):**
- **Skill:** destilleras in i kvalitetsskillens `seo-teknik.md`:
  - marketingskills prioritetsordning, den lokala ordningen 1–4 och listan för nya sidor
  - claude-seo:s allvarsnivåer, JS-renderingsregeln, NAP-jämförelsen och sitemap-tabellen
  - **Teckengränser blir varningar, aldrig stopp.** Påståenden utan Google-källa märks.
- **Kontrollskriptet:** de deterministiska delarna görs till kontroller i kontroll 7 och en ny JSON-LD-kontroll:
  - canonical lika i rå och renderad HTML
  - sitemap bara med 200-sidor utan noindex
  - NAP lika i text och JSON-LD
  - inget `aggregateRating` om företaget självt
- **Installeras inte.** claude-seo har en global hook på varje Edit och Write, installationsskript och Python-miljö. marketingskills behövs inte installerat när vi destillerar.

**Passar vår stack?**
- Som läsning ja.
- Som körbart verktyg nej: claude-seo:s hook validerar inte `.astro` och dess LocalBusiness-mall är amerikansk.
- **React-öar:** båda betonar innehåll i serverrenderad HTML, vilket stämmer med att React renderas vid bygget.

**Risker och flaggor:**
- claude-seo: global hook, betald communityversion, valfria betalda API:er (DataForSEO m.fl.) och en enda underhållare.
- marketingskills: partnerfinansiering och tumregler utan källa.
- Ingen telemetri i claude-seo:s kärna enligt `PRIVACY.md`. ⚠️ Inte kontrollerat i skripten.

**Inloggning:**
- Ingen för att läsa skillsen.
- **Johnny behöver logga in för:**
  - **Search Console** (positioner 8–20, CTR, URL Inspection, indexering)
  - **Google Business Profile** (fält, kategorier, recensionslänk, statistik)
  - eventuellt **Bing Webmaster Tools**
- claude-seo:s Google-tillägg kräver OAuth eller API-nycklar från Johnnys Google-konto. DataForSEO och Ahrefs kräver betalkonton. Vi behöver inget av det.
