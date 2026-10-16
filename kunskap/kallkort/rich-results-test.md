# Rich Results Test

**Källa:** allt läst 2026-10-16.
- **Verktyget:** https://search.google.com/test/rich-results. Sidan svarar HTTP 200 utan omdirigering till inloggning och har en valfri ”Sign in”-länk.
- **Hjälpsidan:** [Rich Results Test](https://support.google.com/webmasters/answer/7445569).
- **Testverktyg för strukturerad data:** https://developers.google.com/search/docs/appearance/structured-data, med Rich Results Test och Schema Markup Validator.
- **Google-dokumentation:**
  - [Local business](https://developers.google.com/search/docs/appearance/structured-data/local-business) (uppdaterad 2026-09-08)
  - [Search gallery](https://developers.google.com/search/docs/appearance/structured-data/search-gallery) (uppdaterad 2026-06-15)
  - [Review snippet](https://developers.google.com/search/docs/appearance/structured-data/review-snippet)
  - [General structured data guidelines](https://developers.google.com/search/docs/appearance/structured-data/sd-policies)
  - Googles dokumentationslogg för FAQ (https://developers.google.com/search/docs/appearance/structured-data/faqpage leder dit)
- **URL Inspection:**
  - [verktyget i Search Console](https://support.google.com/webmasters/answer/9012289)
  - [URL Inspection API](https://developers.google.com/webmaster-tools/v1/urlInspection.index/inspect)
  - [gränser](https://developers.google.com/webmaster-tools/limits)
- **Lokala resultat:** [Google Business Profile, lokal rankning](https://support.google.com/business/answer/7091).
- **Schema Markup Validator:** https://validator.schema.org/.

**Licens:**
- Ingen. Det är en gratis Google-tjänst under Googles användarvillkor.
- Delade resultatlänkar kan ses av alla som har länken och sparas i ungefär 90 dagar (hjälpsidan). Pröva därför inte opublicerade kunduppgifter via delning.

**Vad det är:**
- Googles test av om sidans strukturerade data kan ge **Googles rich results**. Verktyget visar giltiga objekt, varningar och fel, och för vissa typer en förhandsvisning.
- **Schema Markup Validator** (schema.org) kontrollerar all schema.org-markup generellt, utan Googles regler.
- **URL Inspection** (Search Console) visar hur Google faktiskt har indexerat en sida.

**Hur det fungerar:**
- **Rich Results Test:**
  - Tar en publik URL eller ett **kodstycke**.
  - Hämtar sidan som Google-InspectionTool, som smartphone (standard) eller desktop.
  - Läser JSON-LD, RDFa och Microdata men prövar bara de typer Google stöder.
  - Robots.txt kan blockera testet.
  - Kommentarer i JSON-LD ignoreras av verktyget men kan ge fel i verkligheten.
  - Förhandsvisningen ”does not guarantee” hur resultatet visas.
- **Skillnaderna mellan verktygen:**
  - **Rich Results Test:** Googles regler för rich results, live, utan konto. Fungerar på kod, alltså även före publicering.
  - **Schema Markup Validator:** generisk schema.org-validering utan Googles krav. Bra för typer Google inte visar, till exempel `MedicalClinic`-detaljer.
  - **URL Inspection:**
    - Googles **indexerade** version: indexstatus, Googles valda canonical jämfört med den deklarerade, och förbättringar.
    - ”Test live URL” och ”Request indexing” (med en dagskvot) finns.
    - Kräver en verifierad Search Console-egendom. ”URL is on Google” garanterar inte synlighet.
- **API:**
  - **Rich Results Test har inget API.** Det nämns varken i Googles dokumentation eller på gränssidan. ⚠️ Bekräftat bara genom att inget API hittades.
  - URL Inspection API finns i Search Console API:
    - OAuth med `webmasters` eller `webmasters.readonly`.
    - `siteUrl` ska vara egendomen i Search Console.
    - Ger bara den indexerade versionen: ”you cannot test the indexability of a live URL”.
    - Gränser: 2 000 anrop per dag och 600 per minut per webbplats.
- **Google-konto:**
  - Rich Results Test: sidan laddas utan inloggning, och hjälpsidan säger inte att konto krävs. ⚠️ Att köra ett test utan konto prövades inte, eftersom vi inte loggar in och inte kör webbläsaren mot Google här.
  - URL Inspection och API:t kräver Google-konto och åtkomst till egendomen.
- **Vad en lokal klinik eller hantverkare kan få:**
  - **LocalBusiness:**
    - Obligatoriskt: `name` och `address`. Rekommenderat bland annat `geo`, `openingHoursSpecification`, `telephone`, `url` och `priceRange`. Använd den mest specifika undertypen.
    - Google: vid sökning på företag i Search eller Maps ”may display a prominent Google knowledge panel”, och vid kategorisökningar kan en karusell av företag visas.
    - Search gallery beskriver det som detaljer i kunskapspanelen: öppettider, betyg, vägbeskrivning och bokning.
    - **Det är alltså ingen egen visuell rich result i den vanliga träfflistan. Det matar kunskapspanelen och lokala resultat.**
  - **Lokala resultat** styrs enligt Google Business Profile av relevans, avstånd och hur känt företaget är. Den sidan nämner inte strukturerad data. Profilen väger tyngst (**tolkning**).
  - **Review snippet:** sidor med LocalBusiness eller Organization där företaget självt styr recensionerna är ”ineligible for star review feature”. Egna kundomdömen ger alltså inga stjärnor.
  - **FAQ:** utgått. Googles logg: ”This feature will no longer appear in Google Search starting May 7, 2026”, och dokumentationen togs bort 15 juni 2026. Markup skadar inte men ger inget rich result. ⚠️ Om Rich Results Test fortfarande visar FAQ prövades inte.
  - **Övrigt som kan ge något:**
    - **Organization:** logotyp och kunskapspanel.
    - **Breadcrumb:** brödsmulor i träffen, för sajter med djupare struktur än 5–15 sidor.
    - **Event:** om firman har evenemang.
    - **Video:** om det finns video.
    - **Image metadata:** för egna bilder.
  - Allmänna regler: JSON-LD rekommenderas. Märk inte upp innehåll som inte syns. Om obligatoriska fält saknas blir sidan inte berättigad. Rich results garanteras aldrig.

**Kvalitet och underhåll:**
- Googles egen tjänst. Inga stjärnor eller commits finns att räkna.
- Utbudet av typer krymper: FAQ togs bort 2026, och enligt sekundärkällor togs fler typer bort under 2025–2026. ⚠️ Det har jag inte kontrollerat mot Googles egna sidor utöver FAQ.
- Search gallery är senast uppdaterad 2026-06-15.
- Kända begränsningar (hjälpsidan): robots-blockerade resurser kan ge olika resultat, och sidor bakom inloggning eller brandvägg kan inte prövas.

**Det bästa vi kan ta:**
1. **Kodläget före publicering.** Klistra in byggets HTML för startsidan och kontaktsidan i Rich Results Test, eftersom övningssajten inte är publik. Kontrollera att `LocalBusiness`, med rätt undertyp, är ”valid” utan fel.
2. **Schema Markup Validator** för det Google inte prövar: undertyp, `openingHoursSpecification` och `areaServed`.
3. **Efter lansering:** URL Inspection för startsidan. Kontrollera att Googles canonical är samma som vår och att sidan är indexerad.
4. **Regeln i skillen:** inga `review` eller `aggregateRating` på egen sajt och ingen FAQ-markup för att få rich results. LocalBusiness bara med det som syns på sidan och samma uppgifter som i Google Business Profile.

**Var det hamnar hos oss (förslag):**
- Ett manuellt stickprov vid lansering, med regeln i skillens `seo-teknik.md`.
- Skäl: verktyget saknar API och kräver en människa i webbläsaren. JSON-LD:ns innehåll kan kontrolleras automatiskt i kontrollskriptet: obligatoriska fält, att uppgifterna stämmer med sidfoten och att ingen `review` finns.
- Rich Results Test blir då bara en slutkontroll av Googles tolkning.

**Passar vår stack?**
- Ja. JSON-LD skrivs i Astro vid bygget och kostar ingen klient-JS.
- React-öar påverkar inte strukturerad data, så länge JSON-LD inte renderas på klienten.
- Lighthouse SEO prövar inte strukturerad data i sak. I `lighthouse/core/config/default-config.js` (13.5.0, i `skript/node_modules`) är `seo/manual/structured-data` en manuell granskning med `weight: 0`. Lighthouse 100 säger alltså ingenting om JSON-LD.
- JSON-LD i `<script type="application/ld+json">` är data, inte skript, och blockeras inte av vår CSP. ⚠️ Min läsning av CSP-specen, inte prövad mot Astros hashar.

**Risker och flaggor:**
- Delade resultat är publika för den som har länken.
- Det finns inget API, så verktyget kan inte automatiseras utan att skrapa Googles gränssnitt, vilket vi inte gör.
- LocalBusiness ger inga synliga rich results i sig, så förväntningar hos kunden måste hållas nere.
- Typer försvinner (FAQ).

**Inloggning:**
- Rich Results Test: ingen inloggning behövs enligt det som gick att se (⚠️ körning utan konto ej prövad).
- Schema Markup Validator: ingen inloggning.
- Search Console och URL Inspection kräver att Johnny, eller kunden, loggar in med ett Google-konto och verifierar domänen. Index-, canonical- och rich result-rapporterna syns bara där.
