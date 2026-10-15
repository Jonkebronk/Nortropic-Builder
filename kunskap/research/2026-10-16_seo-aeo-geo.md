# Lokal SEO, AEO och GEO för små svenska företag

Research 2026-10-16 på Johnnys uppdrag. Frågan: hur ett litet svenskt företag hittas både i Google och i AI-sökmotorerna (Google AI Overviews och AI Mode, ChatGPT search, Perplexity, Copilot och Gemini). Det som står här är underlag och förslag. Besluten är Johnnys.

**Märkning:**
- 📄 primärkälla, alltså leverantören själv eller lagtexten
- 📊 branschstudie med redovisad metod
- ⚠️ overifierat: andrahandskälla, källor som går isär eller inget svar hittat
- ⚖️ tolkning, inte juridisk rådgivning

**Metod:** WebSearch och WebFetch, med primärkällor först. Källorna är från 2024–2026. När källorna inte stämde överens lästes primärkällan. Gick det inte att läsa den är påståendet märkt ⚠️.

## Sammanfattning

1. **Ingen särskild AI-optimering behövs för Google.** AI Overviews och AI Mode bygger på Googles vanliga index. Google skriver: *"There are no additional requirements to appear in AI Overviews or AI Mode, nor other special optimizations necessary"*. Google säger också uttryckligen att det inte behövs någon särskild strukturerad data och inga AI-textfiler. 📄
2. **Varje AI-motor har sin egen väg in,** och den avgörs av sökroboten:
   - Google använder Googlebot.
   - Copilot använder Bings index.
   - ChatGPT använder OAI-SearchBot.
   - Perplexity använder PerplexityBot.
   - Siri och Spotlight använder Applebot.

   En sajt som stänger ute en av dem syns inte i den motorn. Robotarna för träning är separata, och att stänga ute dem påverkar inte sökningen, med ett undantag: Google-Extended styr också Geminis grounding. 📄
3. **I lokala AI-svar citeras företagens egna sajter mest.** I BrightLocals studie från september 2026, med 200 000 lokala frågor i ChatGPT, AI Mode och AI Overviews, stod företagssajterna för 42 % av citaten. Google-profilen stod för 29 %, nästan bara i Googles egna ytor, och Yelp för 10 %. ChatGPT lutar sig mot Yelp och Bing snarare än mot Google-profilen. 📊 Studien gäller USA.
4. **Microsoft ger konkreta råd för Copilot:**
   - registrera företaget i Bing Places
   - använd IndexNow
   - skriv tydliga rubriker och vanliga frågor
   - stöd påståendena med källor och uppdatera innehållet regelbundet

   Bing Webmaster Tools är den enda källa som visar hur ofta en sajt citeras i AI-svar (AI Performance, public preview sedan februari 2026). 📄
5. **`llms.txt` gör ingen nytta i dag.** Google säger att det inte behövs. Ingen av de stora leverantörerna har lovat att läsa filen, och loggstudierna visar att den nästan aldrig hämtas. 📄 och ⚠️
6. **Rich results för FAQ finns inte längre.** De slutade visas i Google den 7 maj 2026. Det som fortfarande visas för lokala företag är *Local business*, *Organization*, *Breadcrumb* och *Review snippet*, men Review snippet bara för sajter som samlar omdömen om andra. 📄
7. **Två rättelser i det vi redan gör:**
   - *Kundens lyft* ber "nöjda patienter" om omdömen. Googles policy förbjuder att bara be nöjda kunder (avsnitt 3).
   - Sajten visar ett urval av omdömen utan att säga om och hur de kontrolleras. Marknadsföringslagen 12 c § kräver troligen den informationen. ⚖️

## 1. Hur AI-motorerna väljer källor

| Motor | Index och robot | Lokala uppgifter | Säkerhet |
|---|---|---|---|
| **Google AI Overviews och AI Mode** | Googles sökindex. Kraven är samma som för ett utdrag i Sök, och det finns *"no additional technical requirements"*. Råden är att släppa in robotarna (också i CDN), länka internt, ge en god sidupplevelse, ha viktigt innehåll som text, låta den strukturerade datan stämma med den synliga texten och *"Keep Merchant Center and Business Profile information current"* | Google-profilen. Lokala resultat bygger på *"relevance, distance, and popularity"*. Hur välkänt företaget är räknas på *"how many websites link to your business and how many reviews you have"* och *"More reviews and positive ratings can help your business's local ranking"* | 📄 [AI features and your website](https://developers.google.com/search/docs/appearance/ai-features) (2025-12-10); 📄 [Google Business Profile: lokal ranking](https://support.google.com/business/answer/7091) |
| **Gemini** | Googles index. Google-Extended styr både träning och grounding: *"providing content from the Google Search index to the model at prompt time"*. Den *"does not impact a site's inclusion in Google Search"* | I Gemini API hämtar *Grounding with Google Maps* platser, omdömen, foton, adresser och öppettider från Maps. Hur Gemini-appen gör lokalt är inte verifierat | 📄 [Googles robotar](https://developers.google.com/crawling/docs/crawlers-fetchers/google-common-crawlers) (2026-10-15); 📄 [Maps-grounding](https://ai.google.dev/gemini-api/docs/generate-content/maps-grounding); ⚠️ Gemini-appen |
| **Ask Maps (Google Maps)** | Konversationssök i Maps, lanserad i mars 2026 i USA och Indien | Google-profilen och omdömena | ⚠️ bara andrahandskällor ([GSQi](https://www.gsqi.com/marketing-blog/ask-maps-gemini-meets-local-search/)); finns inte i Sverige enligt källorna |
| **ChatGPT search** | OAI-SearchBot: *"Sites that are opted out of OAI-SearchBot will not be shown in ChatGPT search answers"*. GPTBot används för träning och är separat. Ändringar i robots.txt slår igenom på cirka 24 timmar | Lokala resultat med karta finns. OpenAI delar position med *"trusted third-party providers"* men namnger dem inte. Studierna skiljer sig åt: en studie från 2024 fann företagssajter (58 %), omnämnanden (27 %) och kataloger (15 %), och studien från 2026 fann Yelp och Bing snarare än Google-profilen. Uppgifterna om Mapbox, Yelp eller Foursquare som leverantör går isär | 📄 [OpenAIs robotar](https://developers.openai.com/api/docs/bots); 📄 [OpenAI: ChatGPT search](https://help.openai.com/en/articles/9237897-chatgpt-search) (läst via sökresultat, sidan svarade 403); 📊 [BrightLocal 2024](https://www.brightlocal.com/research/uncovering-chatgpt-search-sources/); 📊 [BrightLocal 2026](https://www.brightlocal.com/research/local-ai-visibility-study/); ⚠️ leverantören |
| **Perplexity** | PerplexityBot *"is not used to crawl content for AI foundation models"*. Den ska släppas in för att sajten ska synas. Perplexity-User hämtar på användarens begäran och *"generally ignores robots.txt rules"* | Ingen primärkälla, och BrightLocal 2026 mätte inte Perplexity | 📄 [Perplexitys robotar](https://docs.perplexity.ai/guides/bots); ⚠️ lokala källor |
| **Microsoft Copilot** | Bings index. AI Performance visar citat i *"Microsoft Copilot, AI-generated summaries in Bing, and select partner integrations"* | Microsofts råd: *"Register with Bing Places for Business"*. Övriga råd: IndexNow, tydliga rubriker, tabeller och vanliga frågor, påståenden med källor, regelbunden uppdatering och konsekventa uppgifter om samma sak | 📄 [Bing: AI Performance](https://blogs.bing.com/webmaster/February-2026/Introducing-AI-Performance-in-Bing-Webmaster-Tools-Public-Preview) (2026-02-10) |
| **Apple (Siri, Spotlight, Safari, Kartor)** | Applebot. Applebot-Extended styr bara träning: *"Webpages that disallow Applebot-Extended can still be included in search results"* | Apple Business Connect gäller Kartor, Siri och Wallet | 📄 [Applebot](https://support.apple.com/en-us/119829); ⚠️ Business Connect i Sverige |

**Gemensamt för motorerna enligt BrightLocal 2026** 📊 (USA, 60 dagar, ChatGPT, AI Mode och AI Overviews):
- Företagssajterna utgjorde 93 % av alla källdomäner och 42 % av citaten.
- Ett företag kom tillbaka i hälften av de upprepade körningarna, och bara 20–33 % av resultaten var desamma mellan körningarna.
- Google Maps nämnde ett bevakat företag i 66 % av sökningarna, mot 32–38 % i AI-ytorna.

Det betyder att en enda mätning inte säger mycket. Bara trenden räknas, vilket redan står i `guide/2-9-drift-och-forvaltning.md`.

## 2. På sajten

### Strukturerad data

- **Det som visas i Google** enligt galleriet, uppdaterat 2026-06-15, är bland annat *Local business*, *Organization*, *Profile page*, *Breadcrumb*, *Review snippet* och *Event*. FAQ och HowTo finns inte med. 📄 [Search gallery](https://developers.google.com/search/docs/appearance/structured-data/search-gallery)
- **FAQ:** *"This feature will no longer appear in Google Search starting May 7, 2026"*, och dokumentationen togs bort den 15 juni 2026. Markeringen gör ingen skada men ger inget i Google. 📄 Googles ändringslogg
- **LocalBusiness:** `name` och `address` krävs. Google rekommenderar `geo`, `openingHoursSpecification`, `telephone`, `url`, `priceRange` och `department`. Varje mottagning blir en egen entitet, och man använder den mest specifika undertypen. `aggregateRating` och `review` rekommenderas bara för *"sites that capture reviews about other local businesses"*. 📄 [LocalBusiness](https://developers.google.com/search/docs/appearance/structured-data/local-business) (2026-09-08). MedicalClinic nämns inte på sidan, men den är en undertyp till LocalBusiness i schema.org.
- **AI:** Google kräver ingen särskild strukturerad data för AI-ytorna. Microsofts inlägg om AI Performance nämner inte strukturerad data. Att den hjälper i ChatGPT eller Perplexity är ⚠️ overifierat.
- **Person och ProfilePage:** ProfilePage gäller profilsidor för skapare och forum, inte en klinik. För Person som anställd eller grundare finns ingen funktion i Google och inget belägg för att det hjälper AI-svaren. ⚠️

### Innehållets form

- **Google:** viktigt innehåll som text, intern länkning, god sidupplevelse och strukturerad data som stämmer med den synliga texten. 📄
- **Microsoft:** tydliga rubriker, tabeller och avsnitt med vanliga frågor, påståenden med exempel, data och källor, regelbunden uppdatering och samma uppgifter om samma sak i text, bild och video. 📄
- **Studierna:** när frågan gäller ett köp hämtar ChatGPT oftast företagets egen sajt, och för informationsfrågor väger omnämnanden och kataloger tyngre. 📊 BrightLocal 2024, USA.

### Robots.txt och AI-robotarna

| Token | Styr | Följd av att stänga ute den |
|---|---|---|
| Googlebot | Google Sök, AI Overviews och AI Mode | Syns inte i Google |
| Google-Extended | Träning av Gemini och grounding i Gemini-appar och Vertex AI | Påverkar inte Google Sök, men sajten används inte som grund i Gemini 📄 |
| Bingbot | Bing och Copilot | Syns inte i Copilot |
| OAI-SearchBot | ChatGPT search | Syns inte i ChatGPT-svar 📄 |
| GPTBot | Träning hos OpenAI | Påverkar inte ChatGPT search 📄 |
| PerplexityBot | Perplexitys sökresultat | Syns inte i Perplexity 📄 |
| Applebot | Siri, Spotlight och Safari | Syns inte hos Apple 📄 |
| Applebot-Extended | Träning hos Apple | Påverkar inte sökningen 📄 |

**Cloudflare:** sedan 15 september 2026 blockerar nya domäner robotar för träning och agenter på sidor med annonser, men sökning är fortfarande tillåten. Robotar som både söker och tränar påverkas: *"multi-purpose crawlers that combine Search and Training will be affected by the new defaults to block Training"*. Vilka robotar Cloudflare räknar dit står inte i ändringsloggen. 📄 [Cloudflares ändringslogg](https://developers.cloudflare.com/changelog/post/2026-07-01-ai-traffic-options/); ⚠️ hur enskilda robotar klassas. Googles AI-sida säger också: släpp in robotarna *"in any CDN or hosting infrastructure"*.

### llms.txt

- **Google:** *"You don't need to create new machine readable files, AI text files, or markup to appear in these features."* 📄
- **Leverantörerna:** ingen stor leverantör har lovat att läsa filen. ⚠️ Det bygger på andrahandskällor, och ingen primärkälla säger motsatsen.
- **Loggstudierna:** Cloudflare fann att AI-robotarna aldrig hämtade `llms.txt` under en månad 2026. Ahrefs fann att 97 % av filerna inte fick någon trafik. En studie av 83 sajter fann 7 hämtningar från OpenAI och 9 från Anthropic, mot tusentals hämtningar av robots.txt. ⚠️ [EZY.AI](https://www.ezy.ai/research/do-ai-bots-read-llms-txt) och [Dries Buytaert](https://dri.es/markdown-llms-txt-and-ai-crawlers) refererar studierna, och metoderna är olika.

### IndexNow och Bing Webmaster Tools

- **IndexNow** meddelar ändrade sidor till Bing, Yandex, Naver, Seznam, Amazon och Yep, och en anmälan delas med alla. Google är inte med. 📄 [IndexNow FAQ](https://www.indexnow.org/faq)
- **Cloudflare Crawler Hints** skickar IndexNow automatiskt när innehåll ändras. Det är en enda inställning. 📄 [Crawler Hints](https://developers.cloudflare.com/cache/advanced-configuration/crawler-hints/)
- **Bing Webmaster Tools** har AI Performance med citat, citerade sidor och ett urval av de frågor som AI:n använde (*grounding queries*). Placering och klick ingår inte. 📄
- **Search Console** räknar trafik från AI Overviews och AI Mode i rapporten *Web* och har ingen egen AI-rapport. 📄 En egen vy för generativ AI ska ha annonserats i juni 2026. ⚠️ Det står bara i andrahandskällor.

## 3. Utanför sajten

- **Google-profilen:** en fullständig och korrekt profil, verifierad, med rätt tider, också avvikande, svar på omdömen och foton. Fler omdömen och högre betyg kan hjälpa rankingen, men att svara på omdömen nämns inte som rankingfaktor. 📄 Profilen stod för 29 % av citaten i Googles AI-ytor. 📊
- **Omdömen, Googles policy** 📄 [Prohibited and restricted content](https://support.google.com/contributionpolicy/answer/7400114):
  - Förbjudet: *"selectively solicit positive reviews from customers"*.
  - Förbjudet: att erbjuda något i utbyte mot omdömen.
  - Man *"should not require or pressure users to leave ratings or write reviews while on the premises"*.
  - Tillåtet: att be om ärliga omdömen *"without offering incentives to do so or attempting to influence the rating or the contents of the review"*.
  - Följden kan bli att profilen begränsas och att omdömen tas bort.
- **Omdömen, svensk lag:** 12 c § marknadsföringslagen: *"En näringsidkare som ger tillgång till konsumentrecensioner av produkter ska informera om huruvida näringsidkaren säkerställer att recensionerna kommer från konsumenter som har använt eller köpt produkterna och i så fall på vilket sätt det görs."* Informationen räknas som väsentlig. 📄 [SFS 2008:486](https://www.riksdagen.se/sv/dokument-och-lagar/dokument/svensk-forfattningssamling/marknadsforingslag-2008486_sfs-2008-486/). Falska omdömen står på svarta listan. 📄 [Konsumentverket](https://www.konsumentverket.se/lagar/marknadsforingslagen-konsument/). ⚖️ En sajt som visar utvalda Google-omdömen ger troligen *tillgång till konsumentrecensioner* och bör då säga om och hur de kontrolleras.
- **Bing Places:** Microsoft rekommenderar det för lokala företag. Uppgifterna kan hämtas från Google-profilen. 📄 [Bing Places, oktober 2025](https://blogs.bing.com/search/October-2025/Introducing-the-New-Bing-Places-for-Business-Built-for-Business-Owners,-Powered-by-Research). ⚠️ Om tjänsten finns i Sverige och om Copilot hämtar lokala uppgifter därifrån har jag inte kunnat verifiera.
- **Apple Business Connect:** gratis, och styr hur företaget syns i Kartor, Siri och Wallet. 📄 Apple. ⚠️ Svensk tillgänglighet och kopplingen till Apple Intelligence är inte verifierade.
- **Svenska kataloger** (Hitta.se, Eniro, Reco, Allabolag): det finns inga oberoende data om hur mycket de väger. ⚠️ Branschkällor säger att uppgifterna ska vara lika överallt. Googles egen definition av hur välkänt ett företag är nämner länkar och omdömen, inte kataloger. Yelp är stort i de amerikanska studierna, men hur mycket det betyder i Sverige är ⚠️ inte undersökt.
- **Branschregister:** för kiropraktorer finns Legitimerade Kiropraktorers Riksorganisation (lkr.se). ⚠️ Om LKR har en sökbar medlemslista har jag inte verifierat. Legitimationen kontrolleras hos Socialstyrelsen, oberoende av medlemskap.
- **Omnämnanden:** i ChatGPT var 27 % av källorna omnämnanden, och Wikipedia var 39 % av dem. 📊 BrightLocal 2024, USA. För en liten firma betyder det lokal press och föreningar mer än något som går att bygga.

## 4. Att mäta AI-synlighet

**Inbyggt och gratis:**
- **Bing Webmaster Tools:** AI Performance visar citat i Copilot och Bings AI-sammanfattningar, med ett urval av frågorna. 📄
- **Search Console:** AI-trafiken ingår i rapporten *Web* men går inte att skilja ut. 📄
- **Hänvisningar:** ChatGPT lägger till `utm_source=chatgpt.com` i länkar ut. ⚠️ Det bygger på andrahandskällor.

**Med API:er, för en månadsmätning:**
- **OpenAI:** Responses API med verktyget `web_search` och `user_location`, som tar land, stad, region och tidszon. Svaret har källor med `url_citation`, och fältet `sources` listar varje URL som modellen läste. 📄 [OpenAI: web search](https://developers.openai.com/api/docs/guides/tools-web-search)
- **Perplexity:** dokumentationen beskriver i dag en *Agent API* med verktyget `web_search`. Den tar `user_location` (land, region, stad, lat och lon) och svarar med `search_results`, och det finns också en *Search API* med `country`. Namnet *Sonar* används inte på de sidor jag läste. 📄 [Perplexity: user location](https://docs.perplexity.ai/guides/user-location-filter-guide). ⚠️ Användare i forumet rapporterar att platsfiltret fungerar dåligt.
- **Gemini:** Gemini API med grounding mot Google Sök och mot Google Maps. 📄
- **Copilot:** inget API för konsumentsvaren, så Bings rapport får räcka.

**Förbehåll:**
1. ⚠️ Svaren från API:erna är inte desamma som i konsumentapparna, och ingen studie har jämfört dem.
2. 📊 Resultaten varierar mellan körningar, så varje fråga måste köras flera gånger och bara trenden räknas.
3. ⚠️ Användarvillkoren för konsumentapparna har jag inte läst. Automatiska frågor mot dem bör undvikas tills de är lästa, och API:erna är den säkra vägen.
4. ⚠️ Priserna är inte verifierade. Storleken är som exempel 10 frågor × 3 körningar × 3 motorer = 90 anrop per kund och månad.

**Förslag till mätning:**
- Ställ 8–10 frågor som en kund i orten skulle ställa, utan att nämna firman, till exempel "kiropraktor i [orten] som har tid i dag".
- Kör dem tre gånger i varje motor med `user_location` satt till orten.
- Logga om firman nämns, om sajten eller Google-profilen citeras och vilka konkurrenter som nämns.
- Lägg till citaten från Bing Webmaster Tools. I rapporten visas en rad med trenden.

## 5. Jämförelse med sajten och förslag

**Hemvist:**
- *N1-regel*: guiden och biblioteket, gäller från första sajten
- *Steg 5*: publiceringen
- *N3*: förvaltningen
- *Kundens lyft*: det bara kunden kan göra

| # | Punkt | Sajten och guiden i dag | Förslag | Hemvist |
|---|---|---|---|---|
| 1 | **Omdömen i Kundens lyft** | Övningssajtens punkt 3 säger "Be nöjda patienter … QR-kod på en lapp i receptionen" | **Rättelse:** be *alla* patienter, utan att trycka på dem i receptionen och utan att erbjuda något. Till exempel en länk i sms:et efter besöket. Regeln skrivs in i mallen | Kundens lyft och `mallar/kundens-lyft.md` |
| 2 | **Information om omdömena (12 c §)** ⚖️ | Tre utvalda Google-omdömen och en länk till alla. Ingen uppgift om kontroll | En rad under omdömena, till exempel: "Ett urval av omdömena på Google. Vi kontrollerar inte själva att de kommer från patienter." | N1-regel i `2-7-innehall.md`; biblioteket (Förtroende) |
| 3 | **Robots.txt släpper in sökrobotarna** | `Allow: /` för alla, så alla släpps in | Regel: Googlebot, Bingbot, OAI-SearchBot, PerplexityBot och Applebot släpps alltid in. Google-Extended släpps in för att sajten ska användas i Gemini. Robotarna för träning (GPTBot, Applebot-Extended) är kundens val, och standard är att släppa in dem. En kontroll läser robots.txt | N1-regel och kontrollrad i `2-8` (rapport) |
| 4 | **Cloudflares AI-blockering** | Övas inte, eftersom Cloudflare inte används | Vid publiceringen: kontrollera att *Search* är tillåtet och att blockeringen av träning inte stänger ute Googlebot, Bingbot eller Applebot | Steg 5 |
| 5 | **IndexNow** | Saknas | Slå på Cloudflare Crawler Hints vid publiceringen | Steg 5 |
| 6 | **Bing Webmaster Tools** | Saknas i guiden | Verifiera domänen vid publiceringen och läs AI Performance varje månad | Steg 5 och N3 |
| 7 | **Search Console** | Finns i `2-9` | Ingen ändring. AI-trafiken ingår i *Web* | – |
| 8 | **Strukturerad data** | Två MedicalClinic med namn, url, telefon, e-post, prisnivå, adress, läge och öppettider, och inget eget betyg | Lägg till `sameAs` med Google-profilen, Facebook och Instagram, så att uppgifterna hänger ihop ⚠️ (nyttan i AI-svar är inte belagd). Ingen FAQPage, eftersom rich result inte längre visas. Ingen Person eller ProfilePage | N1, biblioteket och `2-8` |
| 9 | **Innehållets form** | Egen sida per behandling, rubriker, vanliga frågor och fakta i text | Ingen ändring. Följer redan Googles och Microsofts råd | – |
| 10 | **`llms.txt`** | Kandidat på N4 i `bilaga-a-verktyg.md` och `2-9` | Avstå. Google säger att filen inte behövs, och inget tyder på att den används. Kandidaten stryks med källorna | `bilaga-a`, `2-9` |
| 11 | **Google-profilen** | Kundens lyft punkt 2 och 3 | Ingen ändring. Profilen är den viktigaste kanalen utanför sajten | Kundens lyft och N3 |
| 12 | **Bing Places** | Saknas | Importera från Google-profilen, som Microsoft rekommenderar. ⚠️ Kontrollera att det finns i Sverige | Kundens lyft |
| 13 | **Apple Business Connect** | Saknas | Gratis, gäller Kartor och Siri. ⚠️ Kontrollera att det finns i Sverige | Kundens lyft |
| 14 | **Svenska kataloger** | Bara manuella uppslag (`2-1`) | Samma namn, adress och telefon i Hitta.se och Eniro. ⚠️ Låg prioritet, eftersom nyttan inte är belagd | Kundens lyft, sist |
| 15 | **Branschregister** | Saknas | Medlemsregister som LKR när firman är medlem ⚠️ | Kundens lyft, i branschprofilen |
| 16 | **AEO-mätningen** | N4, en källa, inget verktyg | Flytta till N3 med mätningen i avsnitt 4. Bings rapport ger ett första mått, och API:erna ger resten | N3 i `2-9`, `bilaga-c` C104 |

## Det som inte gick att verifiera

- Vem som levererar ChatGPT:s lokala uppgifter (Mapbox, Yelp eller Foursquare enligt olika källor) och om ChatGPT använder Google-profilen.
- Var Perplexity hämtar lokala uppgifter.
- Hur Gemini-appen och Copilot hämtar lokala uppgifter, utöver API:erna och Microsofts råd om Bing Places.
- Om Bing Places, Apple Business Connect och Ask Maps finns i Sverige.
- Hur svenska kataloger väger, och hur Yelp och Reco betyder i Sverige.
- Om LKR har en sökbar medlemslista.
- Om `sameAs` och annan strukturerad data hjälper AI-svaren.
- Search Consoles vy för generativ AI.
- Priserna för API:erna, och om API-svaren motsvarar konsumentapparna.
- Användarvillkoren för automatiska frågor mot konsumentapparna.

Alla studier med siffror gäller USA. Det finns ingen motsvarande studie för Sverige.
