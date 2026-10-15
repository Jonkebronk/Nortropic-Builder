---
titel: "Kopplingar per kund – vad som finns för Search Console, Analytics, Business Profile, PageSpeed/CrUX, Resend och Firecrawl"
datum: 2026-10-14 (utredningen), flyttad hit 2026-10-15
ursprung: "implementeringsguiden v0.74, fas 8g (rad 675–705) – utredningsdelen. Slutsatserna står i guide/2-9-drift-och-forvaltning.md, avsnittet Kopplingar per kund."
status: underlag, inga beslut
---

# Kopplingar per kund

Utredningen gjordes 2026-10-14 i guidesessionen och låg i guiden v0.74 som fas 8g. Den flyttades hit vid konsolideringen 2026-10-15, eftersom den är research och inte flöde (konsolideringsanalysen §6.2). Guiden behåller bara slutsatserna (`guide/2-9-drift-och-forvaltning.md`).

**Idén** kom från Lovables connector-katalog, som visar t.ex. Google Search Console, Google Maps, Resend och Firecrawl. Förvaltningen blir mätbar på riktigt när den kan läsa kundens data – inte bara att sajten *fungerar*, utan att den *hittas*. I Claude Code motsvaras Lovables connectors av MCP-servrar, connectors i claude.ai eller direkta API-anrop från skript.

## Användning per koppling (v0.74)

| Koppling | Användning |
|---|---|
| **Google Search Console** | Fas 0b: före-mått (klick, visningar, placeringar). Fas 7: skicka in sitemap, kontrollera indexering, verifiera omdirigeringarna vid ombyggnad. Fas 8a (veckovis): indexeringsfel, nya 404:or, utveckling i sök |
| **Google Analytics** | Bara tillval, bakom samtycke (§11.10). Förfrågningar räknas i D1 (inskicken) och trafik med analys på serversidan; GA4 behövs inte för värdet för kunden (fas 8a) (rättat v0.74, konsolideringsanalysen M15) |
| **Google Business Profile** | Lokala företag: öppettider och uppgifter i synk med faktabasen (§11.8) |
| **PageSpeed Insights / CrUX** | Prestanda från riktiga användare (fas 8a) |
| **Resend** (e-post-API) | Formulärleverans och märkta testinskick (fas 8a) |
| **Firecrawl** | Fånga befintlig sajt i fas 0b (alternativ till SingleFile). Hör till ombyggnaden (`guide/2-2-omfattning.md`), inte till förvaltningen |

## Vad som finns (utredningen 2026-10-14)

Uppgifter märkta *overifierat* kunde inte bekräftas i primärkälla. claude.ai:s connector-katalog gick inte att läsa direkt.

| Koppling | Officiell claude.ai-connector | MCP | API för skript | Minsta behörighet per kund |
|---|---|---|---|---|
| **Search Console** | Ingen officiell från Google (tredjepartsconnectors finns enligt andrahandskällor – overifierat) | Ingen officiell. Community: [AminForou/mcp-gsc](https://github.com/AminForou/mcp-gsc) (MIT, aktiv; läser search analytics och URL-inspektion; sitemap-inskick bara med uttrycklig flagga) | Search Console API: search analytics, URL Inspection, sitemaps. Kvoter bl.a. 2 000 URL-inspektioner/dygn per egendom | **Begränsad användare** för läsning. Sitemap-inskick kräver *Fullständig* – görs i fas 7 av Johnny eller med tillfälligt utökad behörighet. Om ett servicekonto kan läggas till som begränsad användare: overifierat |
| **Analytics 4** | Ingen officiell (overifierat) | **Officiell från Google:** [googleanalytics/google-analytics-mcp](https://github.com/googleanalytics/google-analytics-mcp) – endast läsning, körs lokalt, auth via ADC/OAuth/servicekonto (`analytics.readonly`) | GA4 Data API (`runReport`, realtid). Kvoter per egendom | **Läsare** (Viewer) per egendom |
| **Business Profile** | Ingen officiell | Ingen officiell; bara community-servrar, ej granskade | Business Profile-API:erna kräver ansökan och godkännande (kvot 0 tills dess); OAuth med `business.manage`; max 10 ändringar/minut per profil | **Det finns ingen läsroll** – lägsta är manager. Läsbegränsningen måste därför ligga i vårt skript eller vår hook, inte hos Google. Nya managers väntar 7 dagar på full åtkomst |
| **PageSpeed / CrUX** | Ingen officiell | Community (läsning) | PageSpeed Insights API och **CrUX API** (fältdata, p75 över 28 dagar; 150 anrop/min per projekt). Google planerar att ta bort CrUX-fältdata ur PSI – använd CrUX API för fältdata | Publika data – en API-nyckel, ingen kundåtkomst behövs |
| **Resend** | – | **Officiell:** [resend/resend-mcp](https://github.com/resend/resend-mcp) – kan skicka (skrivbehörighet) | Resend API | Egen nyckel per kund/domän; skrivrätt – bara för formulärtester |
| **Firecrawl** | – | **Officiell:** [firecrawl/firecrawl-mcp-server](https://github.com/firecrawl/firecrawl-mcp-server) | Firecrawl API | API-nyckel; bara kundens egen sajt (fas 0b) |

Business Profile bekräftades senare samma dag i `kunskap/research/2026-10-14_stitch-och-verktyg.md`: ansökan via formuläret *Application for Basic API Access*, *"Requests are reviewed within 14 days"*, och ingen roll med enbart läsrätt – manager är lägsta. Search Console: nivån *Restricted* har visningsrätt på de flesta data och API:t bör fungera med `webmasters.readonly`, men inget officiellt exempel visar det uttryckligen (delvis bekräftat, samma rapport).

## Kompletteringar 2026-10-15

Ur `kunskap/research/2026-10-15_kompetensluckor-anteckningar/lager-9-drift-forvaltning.md` (fråga 1 och 5), som kontrollerades 2026-10-13:

- **Cloudflare saknades i tabellen ovan** (konsolideringsanalysen M3). Cloudflares rekommenderade server är `cloudflare/mcp` (`https://mcp.cloudflare.com/mcp`), med hela API:t via Code Mode och OAuth eller API-token. Flera domänservrar i `cloudflare/mcp-server-cloudflare` är markerade *deprecated*. Researchens förslag: en läs-token för rapport och övervakning och en separat, smal token för DNS och publicering.
- **Business Profile, fler villkor:** profilen ska vara verifierad och aktiv i minst 60 dagar, sajten ska stå på profilen, och ansökan görs från en e-postadress som är ägare eller manager. En byrå får ansöka med en kunds profil. Redigeringar: 10 per minut och profil, kan inte höjas. Performance API ger dagliga `CALL_CLICKS`, `WEBSITE_CLICKS`, `BUSINESS_DIRECTION_REQUESTS` och visningar i Sök och Maps. Tjänstekonton nämns inte i dokumentationen; räkna med en OAuth-token för Nortropics konto. Källor: https://developers.google.com/my-business/content/prereqs , https://developers.google.com/my-business/content/limits , https://developers.google.com/my-business/reference/performance/rest/v1/DailyMetric
- **Search Console, motstridigt:** mcp-gsc:s README anvisar *Full access* för tjänstekontot, medan stitch-rapporten bedömer att *Restricted* räcker för läsning. Vilken nivå som räcker är **overifierat** och prövas vid första kopplingen.
- **mcp-gsc:** pinna versionen. I juli 2026 kraschade alla nya installationer när `mcp` SDK 2.0 tog bort en modul. Skrivande och destruktiva verktyg är avstängda som standard (`GSC_ALLOW_DESTRUCTIVE`). Search Consoles slutliga data kommer med 2–3 dagars fördröjning. Alternativ med portföljvy: `avansaber/seo-monster` (Pröva).
- **GA4-MCP:n** är märkt *Experimental*. GA4 avstås som standard (IMY:s beslut 2023 och samtyckeskravet); bevakas för kunder med annonsering.
- **Firecrawl:** kärnan är AGPL-3.0, och Free- och Hobby-planerna saknar biträdesavtal (rapporten, lager 2; `kunskap/research/2026-10-15_karta-mot-guide.md`, konflikt 14). Dom där: Bevaka.

## Öppna verifieringsfrågor

- Minsta Search Console-behörighet för ett tjänstekonto som bara läser (Restricted eller Full).
- Om tjänstekonton stöds för Business Profile.
- Om Cloudflares OAuth-behörigheter kan begränsas per zon eller Worker.
- Om en officiell Search Console-connector finns i claude.ai (katalogen gick inte att läsa).
