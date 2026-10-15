# Spårbarhet: `guide/2-8-teknik-och-kvalitet.md`

Skrivet 2026-10-15. Radnummer avser `historik/IMPLEMENTERINGSGUIDE-v0.74.md`. "2-8" betyder `guide/2-8-teknik-och-kvalitet.md`.

## v0.74 rad för rad

| v0.74-avsnitt (rader) | Var det hamnade (fil, avsnitt) | Struket och varför | Flyttat till annan fil |
|---|---|---|---|
| Fas 3, åtgärd: hämta designen via Stitch-CLI (380) | – | Struket: designsättet är stilkit och sektionsbibliotek (beslut 2026-10-15); Stitch används när stilkiten tas fram | `2-4-skelett.md`, `2-5-yta.md` |
| Fas 3, inga småanimationer under bygget (381; fallgrop 4) | – | – | `2-6-rorelse.md` (D11) |
| Fas 3, stack öppen (382) | 2-8, Stacken: Astro statiskt | Frågan stängd i sak; Johnnys bekräftelse av ramverket öppen | `bilaga-e-oppna-fragor.md` |
| Fas 3, innehåll skilt från design (383) | 2-8, Stacken (hänvisning) | Dubbletten struken i 2-8 (granskningen 2.2) | Texterna: `2-7-innehall.md`; komponenterna: `2-4-skelett.md` |
| Fas 3, säkerhetsgrunder B–D: RLS, hemligheter, brandvägg (384) | 2-8, Väg B–D: säkerhetsgrunder (konkretiserat enligt researchen: WAF-regel, Turnstile, huvuden, RLS) | "Brandvägg eller IP-vitlista" ersatt av researchens konkreta lista | Hemligheter: `3-3` |
| Fas 3, formulär på Cloudflare (385) | 2-8, Formulär: mönstret, D1 i EU, Resend, rate limiting | – | – |
| Fas 3, formulär som inte tappar inskick: spara först, spamskydd, SPF/DKIM/DMARC, personuppgifter (386–390) | 2-8, Formulär | Dubbletten av 385 (D3) sammanslagen | – |
| Fas 3, bilder med känd källa, alt-texter (391) | 2-8, Kodstandard (alt-text) | – | Bildstrategin: `2-7-innehall.md` |
| Fas 3, checkpoints, överlämning, spanaren, status, storlek, parallellt, flottor, worktrees, portar, beroenden, `/batch` (392–409) | – | – | `3-1-orkestrering-och-roller.md`; sandlådan (408): `3-3` |
| Fas 3, grind (410) | 2-8, Kontroll N1 nr 1 (`astro build`) | – | "Alla checkpoints klara": `3-1` |
| Fas 6b, motivering (560–561) | 2-8, Kodstandard (fallgrop 25) | – | – |
| Fas 6b, kritiker och rättare, Shopify-varianten (563–564) | – | – | `3-2-granskning-och-kalibrering.md` |
| Fas 6b, Anti-Slop som första sållning (565) | – | – | `3-2` (processen), `bilaga-a-verktyg.md` (kandidat) |
| Fas 6b, arkitektur, Pococks `codebase-design` (566) | – | – | `3-2`, `bilaga-a-verktyg.md` |
| Fas 6b, `/simplify` och `/code-review` (567) | – | – | `3-2` |
| Fas 6b, agent teams (568) | – | – | `3-2`, `bilaga-a-verktyg.md` (N4) |
| Fas 6b, standarden (569–574) | 2-8, Kodstandard; utökad med WCAG 2.2-kriterier ur webb-pros byggstandard och tillgänglighetsresearchen | – | `prefers-reduced-motion`: `2-6` |
| Fas 6b, kontroller efter varje rättning, tak 3 rundor, grind (575–577) | – | – | `3-2` |
| Fas 6c, rubrik: "allt blir låsta kontroller" (579–580) | 2-8, Kontroll (N1 och N2) | Inte allt blir grind: regler med en källa står som instruktion (skrivreglerna) | – |
| Fas 6c, titel och metabeskrivning (583) | 2-8, Kontroll N1 nr 7 | "Rimlig längd" som stopp struket: Google anger ingen gräns; längd är varning (N2) | – |
| Fas 6c, Open Graph och delningsbild (584) | 2-8, Kontroll N2, SEO utöver N1 | – | – |
| Fas 6c, `sitemap.xml` och `robots.txt` (585) | 2-8, Kontroll N1 nr 7 (sitemap), N2 (robots.txt, bara publika sidor) | – | – |
| Fas 6c, LocalBusiness-schema mot faktabasen (586) | 2-8, Kontroll N2, strukturerad data | – | – |
| Fas 6c, alt-texter (587) | 2-8, Kontroll N1 nr 8 (axe) och Kodstandard | – | Alt-textens kvalitet: `2-7` |
| Fas 6c, inga trasiga länkar (588) | 2-8, Kontroll N2, lychee | – | – |
| Fas 6c, inga hemligheter i klientkoden (589; fallgrop 141) | 2-8, Kontroll N1 nr 10 | – | Regeln om hemligheter: `3-3` (D6) |
| Fas 6c, Supabase Security och Performance Advisor (590) | 2-8, Väg B–D, kontroll [N3] | – | – |
| Fas 6c, e-postbekräftelse vid registrering (591; fallgrop 184) | 2-8, Väg B–D, kontroll [N3] | – | – |
| Fas 6c, Lighthouse 90+ i alla fyra kategorier (592) | 2-8, Kontroll N1 nr 9 (tillgänglighet, bästa praxis, SEO; rapporterar, stoppar inte – tröskeln 90 är vald); N2 prestanda via Core Web Vitals | Prestanda ≥ 90 som stopp struket: en källa ($10K Kit), krockar med rörelse (analysen §4.2) | – |
| Fas 6c, rubrikstruktur (593) | 2-8, Kontroll N1 nr 7 och Kodstandard | – | – |
| Fas 6c, grind (594) | 2-8, Kontroll | – | – |
| Fas 6c, sitemap till Search Console (595) | 2-8, Publicering: Search Console | – | Kopplingen: `2-9` |
| Fas 7, rubrik "(tillval)" och godkännande (597–598) | 2-8, Publicering: ingår och kräver Johnnys godkännande | "Tillval" struket (M16, rättat redan i v0.74) | Skyddshooken och `permissions.deny`: `3-3` |
| Fas 7, säkerhetsgranskning: alternativen CodeRabbit, `/security-review`, Mantis, GitHub Action (600) | 2-8, Säkerhetsgranskning: `/security-review` vald, N2; övriga kandidater | Sex alternativ utan val ersatta av ett val (D19) | `bilaga-a-verktyg.md` |
| Fas 7, starkaste modellen (601) | 2-8, Säkerhetsgranskning (hänvisning) | – | `3-3` (D5) |
| Fas 7, Claude Security (602) | 2-8, Säkerhetsgranskning, kandidat [N3] | – | `bilaga-a-verktyg.md` |
| Fas 7, cloudflare/security-audit-skill (603) | 2-8, Säkerhetsgranskning, kandidat [N3] med sandlådekravet | Installationskommandot och jämförelsen i eval struket här | `bilaga-a-verktyg.md` (installation, Skill Spector) |
| Fas 7, GitHub Action på varje PR (604) | 2-8, Säkerhetsgranskning, kandidat [N4]; Hur självgående [N4] | – | – |
| Fas 7, parallella säkerhetsagenter per område (605) | – | Struket: en granskning räcker tills eval visar annat; idén är N4 utan egen källa utöver videon | `bilaga-a-verktyg.md` vid behov |
| Fas 7, rätta kritisk/hög (606) | 2-8, Säkerhetsgranskning | – | – |
| Fas 7, Git → GitHub → Workers Builds (607) | 2-8, Publicering | – | – |
| Fas 7, säkerhetsheaders i Worker-koden (608) | 2-8, Publicering: headers på två ställen | Ändrat: `_headers` för statiska sidor **och** Worker-koden för Workerns svar (se Avvikelser) | – |
| Fas 7, rollback utan data (609) | 2-8, Publicering [N2] | – | – |
| Fas 7, 3b staging, Access, egna databasresurser (610) | 2-8, Publicering: Access [N1 om sajten publiceras], egna resurser [N2] | – | Förvaltningens ändringar: `2-9` |
| Fas 7, 3c Search Console och analys (611) | 2-8, Publicering (Search Console); Samtycke och analys | – | `2-9` (8g) |
| Fas 7, `wrangler`, plugin, API-MCP (612) | 2-8, Publicering | – | `bilaga-a-verktyg.md` |
| Fas 7, röktest (613) | 2-8, Kontroll N1, inledningen (röktest mot den publicerade adressen); hänvisning i Publicering | – | – |
| Fas 7, inga arbetsverktyg i produktion (614; fallgrop 45) | 2-8, Publicering [N4] | – | – |
| Fas 7, avstämning löften mot resultat (615) | – | – | `3-2` |
| Fas 7, omdirigeringar vid ombyggnad (616; fallgrop 102) | 2-8, Publicering [N1] | – | URL-inventeringen: `2-2-omfattning.md` |
| Fas 7, baslinje för visuell regression (617) | 2-8, Publicering (hänvisning) | – | `2-9-drift-och-forvaltning.md` |
| Fas 7, inga platshållare i produktion (618; D14) | 2-8, Kontroll N1 nr 6 | – | Markeringen: `2-7` |
| Fas 7, grind (619) | 2-8, Publicering och Kontroll | – | – |
| §11.10, ⚠️ inte juridisk rådgivning (1717) | 2-8, Samtycke och analys | – | – |
| §11.10, kanadensisk lag, Consent Mode v2 (1719) | 2-8, Samtycke och analys (GA4) | Bakgrunden om kanadensisk lag struken; EU/Sverige gäller redan | – |
| §11.10, analys som standard (1723) | 2-8, Samtycke och analys [N2] | – | – |
| §11.10, kakor och spårning (1724) | 2-8, Samtycke och analys [N3] (GA4, banner) | – | – |
| §11.10, integritetspolicy (1725) | 2-8, Samtycke och analys [N2] | – | Texten: `2-7` |
| §11.10, formulär (1726) | 2-8, Formulär (bara det som behövs, lagringstid) | – | – |
| §11.10, biträdesavtal (1727) | – | – | `2-2-omfattning.md` (onboarding och avtal), `4-foretaget.md` |
| §11.10, tredjepartstjänster (1728) | 2-8, Samtycke och analys (mallen utan tredje part; mottagare i policyn) | – | Grunden per leverantör: `2-2` (§11.13) |
| §11.10, låsta kontroller (1730–1734) | 2-8, Kontroll N2: integritet; typsnitt från egen domän i Samtycke [N1] | – | – |
| Fas 8a, formulärtest och bekräftelsemejl (637; D3) | 2-8, Formulär: formulärtest | – | Schemat: `2-9` |
| Fas 8a, månatlig säkerhetsgranskning (629; D19) | 2-8, Säkerhetsgranskning (hänvisning) | – | `2-9` |
| Fas 8g, Google Analytics och Resend (680, 683) | 2-8, Samtycke och analys; Formulär | – | Kopplingstabellen: `2-9` |
| Fas 0, .se och Cloudflare-konto per kund (235–236) | 2-8, Publicering (egen domän) och Stacken (konto per kund) | – | De mänskliga klicken: `2-2`; token: `3-3` |
| Fas 0, Google-konto för GA4 (238); fas 0b, spårare (254) | – | – | `2-2` |
| §11.3, tillgänglighet WCAG 2.2 AA (1591) | 2-8, Kodstandard | – | – |
| §11.9 punkt 4, WebP under 200 kB (1710) | 2-8, Kodstandard [N2]: på bänken, LCP i stället | Gränsen som låst kontroll struken (en källa, M19) | AI-metadata: `2-7` |
| §11.13, "alla sajter WCAG 2.2 AA" (1762); leverantörerna (1765–1769) | 2-8, Kodstandard; Samtycke och analys | – | Lagkrav per kund: `2-2` |
| §12, Mantis, Claude Security (1845, 1856) | 2-8, Säkerhetsgranskning, kandidater | – | `bilaga-a-verktyg.md` |
| §12, Supabase (1861) och Vercel/Supabase (1893) | 2-8, Väg B–D | Vercel struket (inaktuellt, M3) | `bilaga-a-verktyg.md` |
| §14, hosting avgjort (2140) | 2-8, Stacken | – | – |
| §14, stackförslag typ A och B–D (2141–2143) | 2-8, Stacken (tabell A–D, utökad med C och D ur researchen §10) | – | – |
| §14, ren HTML eller ramverk, tabellen (2144–2154) | 2-8, Stacken: inget UI-komponentbibliotek som styr utseendet | Stitch-exporten som alternativ struken (stilkitbeslutet); tabellen i övrigt struken – Astro valt | – |
| §14, sajttyper, vägar A–D, CMS, e-handelsprov (2155) | 2-8, Stacken (typerna) | – | `2-2-omfattning.md` |
| §14, skärmdumps- och testverktyg (2157, 2187) | 2-8, Kontroll N1, inledningen: Playwright och axe | Frågan stängd | – |
| §14, publicering (2160) | 2-8, Publicering | Stängd | – |
| §14, säkerhetsgranskning (2162) | 2-8, Säkerhetsgranskning | Stängd för N1–N2: `/security-review` | – |
| §14, formulärtester (2172) | 2-8, Formulär | Redan besvarad | – |
| §14, kodstandard WCAG 2.2 AA (2174) | 2-8, Kodstandard | Redan besvarad | – |
| §14, byggkommando för grinden (2181) | 2-8, Kontroll N1 nr 1 | Stängd: `astro build` | – |
| §15.1, bekräftelsemejlet (2202) | 2-8, Formulär: mejlsäker HTML och test | – | Innehållet: `2-7`; "ingår i alla paket": `4-foretaget.md` |
| §15.1, designad 404 (2203) | 2-8, Vad som kommer ut (404 i skelettet) | – | Utformningen: `2-3-struktur.md`, `2-4-skelett.md` (granskningen 2.3 punkt 3); paketet: `4-foretaget.md` |
| §16 steg 20, wrangler, Access, fas 7 på exempelsajt (2287) | 2-8, Publicering | – | `5-byggplan.md`, steg 5 |

## Fallgropar ur §13

| Nr | Var |
|---|---|
| 3, 19 | Kontroll N1 nr 3 |
| 4 | `2-6` |
| 16 | Kontroll N1 nr 4 |
| 20 | Formulär (sista punkten) |
| 25 | Kodstandard |
| 42 | Formulär: formulärtest |
| 45 | Publicering [N4] |
| 58, 185 | Publicering: Access |
| 66 | Stacken: gratisplanen |
| 89 | Säkerhetsgranskning (hänvisning till `3-3`) |
| 102 | Publicering: omdirigeringar |
| 122 | Kontroll N1 nr 7 |
| 123 | Samtycke och analys: GA4 |
| 124 | Stacken: konto per kund (regeln om hemligheter i `3-3`) |
| 125 | Formulär: spara först |
| 126 | Publicering: staging |
| 141 | Kontroll N1 nr 10 |
| 142 | Kodstandard [N2] |
| 178 | Vad som kommer ut (404) |
| 181 | Kontroll N1 nr 6 |
| 183, 193 | Formulär: bekräftelsemejlet |
| 184 | Väg B–D |
| 186 | Publicering: egen domän |
| 187 | Väg B–D |
| 188 | `2-2` (hänvisning i Kodstandard: aldrig "lagenlig") |
| 191 | Publicering: staging med egna resurser |
| 192 | Säkerhetsgranskning, kandidat |

Researchens förslag till nya fallgropar (`_headers` gäller inte Worker-svar, rollback rullar inte tillbaka data, `workers_dev = false` i konfigurationen) är skrivna som regler i Publicering, inte som fallgropar.

## Kartan och researchen

| Underlag | Använt i 2-8 |
|---|---|
| `historik/karta/8-teknik-kvalitet.md`, grindtabellen | Kontroll N2: länkar, strukturerad data, huvuden, tillgänglighet (Chromium och WebKit), integritet. Prestanda ändrad (se Avvikelser). Visuell regression → `2-9` |
| Kartan, WCAG-EM vid lansering och årligen | Kontroll N3 |
| Kartan, autonomi | Hur självgående |
| Kartan, kompetens (egen skill, förankring) | Kompetens och källor |
| Kartan, lagar (kakor, tillgänglighetslagen, integritetsinformation) | Samtycke och analys; Kodstandard (WCAG-golvet); klassningen → `2-2` |
| `kunskap/research/2026-10-14_cloudflare-stack.md` §1–§10 | Stacken, Formulär, Publicering, Väg B–D (huvudkälla) |
| Samma, §11 (ändringslistan) | Inarbetad: Workers Builds, staging bakom Access, `wrangler`, .se, konto per kund, analysstandard, Cloudflare i integritetspolicyn |
| `2026-10-14_dataoverforing-och-analys.md` §2.3, §3, §4.3, §5.1–§5.2 | Samtycke och analys, Formulär (Resend i USA), Väg B–D (TIA) |
| `2026-10-14_tillganglighetslagen.md` §3.2 och rekommendationerna | Kodstandard (WCAG 2.2 AA som golv, manuell kontroll) |
| `2026-10-14_claude-code-verifiering.md`, rad 9h | Säkerhetsgranskning (`/security-review`) |
| `2026-10-14_stitch-och-verktyg.md` (Variate) | Publicering [N4] |
| `2026-10-15_kompetensluckor-anteckningar/lager-8-teknik-kvalitet.md` §1–§4 | Kontroll N2 och N3, Verktyg, Säkerhetsheaders, Samtycke (banner, mallen utan samtycke), Hur självgående |
| `2026-10-15_guide-konsolideringsanalys.md` §4.2, §7.3, §7.4, §8.2, M1, M3, M15, M16, M17, M19 | N1-kontrollerna (§7.4), nivåerna, grind eller bänk, skelettets sidor |
| `2026-10-15_webb-pro-genomgang.md` §3 och webb-pros `byggstandard.md`, `formularsakerhet.md`, `mall/astro/`, `mall/leverans/` | Kodstandard, Formulär, Kompetens (vad som återanvänds) |
| `2026-10-15_karta-mot-guide.md`, raderna om säkerhetsheaders och Lighthouse | Avvikelserna nedan |

## Avvikelser och val i texten

- **Säkerhetsheaders (kartan mot v0.74, `LAGE.md` punkt 5):** båda hade rätt för sin typ av svar. Cloudflares dokumentation: `_headers` gäller statiska tillgångar men *"are not applied to responses generated by your Worker code"*. Därför `_headers` för sidorna och Worker-koden för `/api/*`; webb-pros leveransmall gör likadant.
- **Prestanda:** kartans stopp på Lighthouse-prestanda ≥ 0,90 är inte med. Stoppet är Core Web Vitals-gränserna (web.dev), enligt analysen §4.2 och uppdraget.
- **Kontroll N1 nr 3:** analysen skrev 375 px. Normen är WCAG 1.4.10 (320 CSS-px). Visningsbredderna är 320 px bara för reflow, 375, 768 och 1280 px; 1920 px från N2 (granskningen 1.3 punkt 6).
- **Kontroll N1 nr 8:** analysens "kontrast och alt-texter" körs som axe med WCAG 2.2 A/AA-taggarna, som täcker båda och mer.
- **Säkerhetsgranskning (D19):** `/security-review` vald – inbyggd, verifierad i researchen, ingen installation eller tredje part – på nivå N2, som i `3-3` och bilaga A (granskningen 1.2). Övriga är kandidater.
- **Formulär på första sajten:** `5-byggplan.md` lägger formuläret på N2 men nr 4 i analysens N1-lista nämner formuläret. Löst så: första sajten klarar sig med telefon och mejl; publiceras ett formulär gäller hela N2-mönstret.
- **Förhandsadress bakom Access** är N1 om sajten publiceras (`5-byggplan.md`, steg 5; `bilaga-e-oppna-fragor.md`, fråga 1.3), egna databasresurser för staging N2.
- **Mejl:** Resend som standard (v0.74, researchen); webb-pros `send_email`-variant för aviseringen till kunden står som kandidat.
- **Längd:** filen är längre än 40 % av källtexten i v0.74, eftersom kartans grindar, researchen 2026-10-15 och webb-pros mallar tillkom. Verktygsbedömningarna ligger kvar i lager-8-anteckningarna och länkas.

## Till `bilaga-e-oppna-fragor.md`

- Johnnys uttryckliga bekräftelse av Astro som ramverk (Cloudflare är beslutat 2026-10-14; Astro är researchens förslag som båda spåren förutsätter).

## Ommärkning 2026-10-15

Efter granskningen (`konsolidering/granskning-v1.0.md`) och tillägget i `konsolidering/skrivregler.md` kl. 14.30. Före: 32 N1-punkter plus tabellen med tio N1-kontroller. Efter: 8 N1-punkter (7 regler och utdata) plus tabellen, som nu är **enda platsen där N1-kontrollerna definieras** (`bilaga-c-kontroller.md` och lagerfilerna hänvisar hit).

### Kvar i N1

| Punkt | Avsnitt |
|---|---|
| Astro statiskt; som Worker med statiska tillgångar i kundens eget Cloudflare-konto, inte Pages (sammanslagen ur tre N1-punkter: Worker, Astro, konto per kund) | Stacken |
| WCAG 2.2 AA som golv | Kodstandard |
| Telefon- och mejllänk som primär handling på första sajten | Formulär |
| Mallen kräver inget samtycke | Samtycke och analys |
| Publiceringen: Johnnys godkännande, Git → GitHub → Workers Builds (sammanslagen ur två N1-punkter) – N1 om sajten publiceras | Publicering |
| Förhandsadressen bakom Access – N1 om sajten publiceras | Publicering |
| `_headers` med grundhuvudena – N1 om sajten publiceras (utbruten ur punkten om säkerhetsheaders) | Publicering |
| Utdata: sajten, kontrollskriptet med resultat, om publicerad repot och förhandsadressen (sammanslagen ur fyra N1-punkter) | Vad som kommer ut |
| Tabellen med de tio N1-kontrollerna, med kolumnen *Vid träff* (stopp eller rapport) | Kontroll |

### Flyttat från N1

| Punkt | Ny nivå | Skäl |
|---|---|---|
| Få beroenden, låst låsfil | N2 | Taket. Inget UI-komponentbibliotek bor i `2-4-skelett.md` (granskningen 2.2); 2-8 hänvisar |
| Innehåll skilt från design | Hänvisning | Texterna i `2-7`, komponenterna i `2-4` (granskningen 2.2) |
| Sidor och navigering utan JavaScript | Hänvisning + N2-kontroll | Regeln i `2-4`, kontrollen i 2-8:s N2-tabell, rapporterar *(en källa – bänken)* (granskningen 2.2, 2.1 punkt 5) |
| Gratisplanen räcker för typ A | N2 | Taket |
| Kodstandarden (semantik, tillgänglighet, formulär, prestanda, ordning) | N2 | Bra hantverk är N2 (skrivreglerna); WCAG-golvet och N1-kontrollerna gäller från första sajten |
| Webb-pros husval är inte norm | N2 | Taket |
| Analys: edge-analys, konverteringar i D1 | N2 | D1 och formulär är N2 |
| Säkerhetsheaders på två ställen; CSP med hashar ur `security.csp`; HSTS ⚠️ | N2 (Worker-svar, CSP) | Granskningen 1.1 (`2-8` 76): `_headers` med grundhuvudena kvar i N1 |
| Egen domän och .se; `workers_dev = false` | N2 | Första sajten publiceras på förhandsadressen (förslaget i `bilaga-e-oppna-fragor.md` 1.3) |
| `wrangler`-kommandona | N2 | Verktygskunskap; publiceringen sker via Workers Builds |
| Röktest | Inledningen till N1-tabellen | Dubblett av tabellens inledning |
| Search Console | N2 | Kräver kundens domän |
| 301 vid ombyggnad | N2 | Hör till kundens domän; URL-inventeringen i `2-2` |
| `/security-review` före publicering | N2 | Granskningen 1.2: `3-3` och bilaga A har N2 – nivån valdes och skrivs ut i punkten |
| Lighthouse CI pinnad; Chrome DevTools MCP | N2 | Granskningen 1.1 (`2-8` 116) |
| Astro-mallen ur webb-pro | N2 | Taket; CSP-hashar N2, tacksidan bara med formulär |
| Hur självgående: deterministiska kontroller, omdöme till Johnny | N2 | På första sajten tittar Johnny på allt |
| Utdata: integritetspolicyn i skelettet | N2, bara med formulär | Granskningen 1.2; policy utan formulär öppen |
| Utdata: rapport från säkerhetsgranskningen; sajten på kundens domän | N2 | Följer `/security-review` och domänen |

Därtill: N4 → N3 för visuell regression och schemalagda kontroller (granskningen 1.2, `2-8` 167), och N2 → N3 för att agenten som orsakat en avvikelse inte rör baslinjen (granskningen 1.2, `2-8` 174; hänvisar nu till `2-9`, inte `3-1`).

### N1-kontrollerna

| Nr | Ändring | Granskningsfynd |
|---|---|---|
| 2 | Märkt som egen kodstandard 🔧; *rapport*, ingen grind | 2.1 punkt 4 |
| 3 | 320 CSS-px (WCAG 1.4.10); visningsbredderna 320 (bara reflow), 375, 768, 1280, 1920 från N2 skrivna vid tabellen | 1.3 punkt 6 |
| 4 | Telefon- eller mejllänk i N1, formuläret bara om det publiceras; grunden: två källor för körbara kontroller, tillämpningen 🔧 | 2.1 punkt 7 (samma resonemang) |
| 5 | "Läsning, inte skript"; vad som räknas → `2-7` | 3.3 |
| 6 | Grundad i faktakontrollen: en platshållare är ett obekräftat faktum (tre källor) | 2.1 punkt 3 |
| 7 | En `h1` märkt som egen kodstandard 🔧, *rapport*; titel, beskrivning och sitemap *stopp* | 2.1 punkt 4 |
| 9 | Grunden "leverantörens dokumentation; tröskeln 90 är vald (en källa)"; *rapport*, stoppar inte; körs inte mot förhandsadressen (flyttat från N2-punkten om Lighthouse SEO, som ströks som dubblett) | 2.1 punkt 1 |

### Övriga granskningsfynd som åtgärdats

| Fynd | Åtgärd |
|---|---|
| 1.1, publiceringen | Märkt "N1 om sajten publiceras – `bilaga-e-oppna-fragor.md` 1.3" i avsnittets inledning och i varje N1-punkt |
| 1.2, integritetspolicy och tacksida | Bara med formulär; policy utan formulär: *Öppet – se `guide/bilaga-e-oppna-fragor.md`* |
| 1.2, `public/_headers` | N1 (grundhuvudena) |
| 2.2, Variate | Kontrollen bor kvar i 2-8 (N4); verktyget → `3-5-live-visning.md` |
| 2.3 punkt 3, 404 | → `2-3`, `2-4` |
| 2.3 punkt 4, avstämningen mot löften | → `3-2-granskning-och-kalibrering.md` (fallgrop 78) |
| 2.3 punkt 5, kantfall | → `bilaga-c-kontroller.md` |
| 2.3 punkt 6, baslinjen | → `2-9-drift-och-forvaltning.md` |
| 2.3 punkt 11, `karta/…` | `historik/karta/…` |
| Märkning | Varje listpunkt har `- [Nx]` först; inline-märkningar i Verktyg, Egen skill och Kandidater gjordes om till märkta punkter; omärkta hänvisningspunkter blev löptext |
