# Googles tjänster, Stitch och Lovable i Nortropics flöde

**Datum:** 2026-10-17. **Uppdrag:** Johnny, när enkäten var byggd och Gemini-nyckeln skulle skaffas:
- omkring 09.43: *"ska jag skaffa google ai pro eller google ai ultra, websearcha"*
- omkring 09.45: *"jag tänkte eftersom vi har mycket google saker så känns som vi det finns fler användningsområden för oss med detta, think hard, iterate, läs igenom dokumentation, källor, vad abonnemangen erbjuder, jag tänker smidigare lösningar med bland annat google search console, apis, google business etc utifrån våra flöden"*
- omkring 09.46: *"även stitch liksom kan vara nåt för oss nu eller i framtiden."*
- omkring 10.44: *"hur fungerar det på lovable med alla integrationer de har där? kan det vara värt att samspela med lovable för kundportal etc"*

**Metod:** fem delagenter läste källorna 2026-10-17, ett spår var:
1. Google AI Pro och Ultra
2. Googles API:er i flödet
3. Workspace och Apps Script
4. Stitch i dag
5. Lovable

Datorn startade om omkring 09.53. Då var spår 2 klart och spår 1, 3 och 4 avbrutna. De tre startades om med det som redan var läst, taget ur sessionens logg. Delagenternas rapporter med alla källor finns i sessionens logg (`~/.claude-bygg/projects/`), och de viktigaste källorna står sist. Juridiska läsningar är tolkning, inte juridisk rådgivning. ⚠️ betyder overifierat. Allt under *Förslag* är förslag tills Johnny har sagt ja.

## Svaret: ingen prenumeration nu

- **Gemini CLI går inte längre att köra på ett abonnemang.** Sedan 2026-06-18 kan Gemini CLI och Code Assist inte logga in med Google-konto, vare sig gratis, med Pro eller Ultra: *"you can no longer use the Login with Google option"* (Google, [Code Assist for individuals, deprecations](https://developers.google.com/gemini-code-assist/docs/deprecations/code-assist-individuals), uppdaterad 2026-10-09). Ersättaren Antigravity CLI har ett skriptläge (`agy -p`), men villkoren kallar åtkomst via *"third party software, tools, or services"* avtalsbrott, och Google använder interaktionerna för att förbättra tjänsten ([Antigravity, villkor](https://antigravity.google/terms)).
- **API:et är billigare och har bättre datavillkor.** Med betald nivå gäller *"Google doesn't use your prompts … or responses to improve our products"*. I EES gäller de betalda datavillkoren också på gratisnivån ([Gemini API, villkor](https://ai.google.dev/gemini-api/terms)). Räkneexempel ⚠️ (antaget cirka 1 500 tokens in och 2 000 ut per bedömning): en domare med Gemini 4 Argon kostar ungefär 1 USD per sajt för 50 bedömningar, och 30 bilder med Nano Banana 2 kostar ungefär 3 USD ([priser](https://ai.google.dev/gemini-api/docs/pricing)). Argons pris fördubblas 2026-12-01. Den betalda nivån kräver förbetalning från 5 USD ([fakturering](https://ai.google.dev/gemini-api/docs/billing)).
- **Pro, 255 kr/mån** ([Google One, Sverige](https://one.google.com/about/plans?hl=sv&gl=SE)), blir värt det först när en riktig kund behöver mer Deep Research eller video, eller när det är visat att Pros molnkrediter på 10 USD/mån betalar Gemini API. De får användas till *"any Google Cloud Platform or Google Maps Platform product"* ([Developer Program, förmåner](https://developers.google.com/profile/help/benefits)), men användare rapporterar att AI Studio ändå kräver förbetalning, och Google har inte svarat ⚠️ ([forumtråd](https://discuss.ai.google.dev/t/10-monthly-developer-program-credits-visible-in-gcp-billing-but-ai-studio-forces-prepay-top-up-no-available-credits/143815)).
- **Ultra, 999 eller 2 599 kr/mån,** lägger mest till video, lagring och privata förmåner. Inte för oss.

Gemini-nyckeln till granskningsrådet och nanobanana skaffas alltså i Google AI Studio med betald nivå, inte genom ett abonnemang.

## Fyra fynd som ändrar något vi redan har bestämt

1. **Google-profilens siffror får sparas högst 30 dagar.** Villkoren tillåter lagring *"temporarily for no more than 30 calendar days"*, och datan *"cannot be manipulated or aggregated"* ([Business Profile APIs, policyer](https://developers.google.com/my-business/content/policies)). Guiden säger att rapportens siffror kommer ur en ögonblicksbild, *"JSON per kund och månad i Git"*, som också ger jämförelse år för år (`guide/2-9-drift-och-forvaltning.md`, *Siffrorna kommer ur en ögonblicksbild*). Portalen på N4 ska visa siffror från Google-profilens API *"med cache"*. Tolkning: för profilens mått krockar det. Rapporten bör hämta dem färskt varje månad, och historiken för profilen kräver ett svar från juristen. Search Consoles och Cloudflares siffror omfattas inte av den här regeln.
2. **Places API får inte användas till konkurrentanalys i EES.** Projekt med fakturaadress i EES som skapats efter 2025-07-08 får bara använda Places-innehåll till nio tillåtna ändamål, och konkurrentanalys är inte ett av dem ([EEA Places, tillåten användning](https://cloud.google.com/terms/maps-platform/eea-places-api-permitted-uses)). Det rör jämförelsen mot konkurrenterna (`kunskap/research/2026-10-17_granskningsrad-och-processen.md`). Frågan går till juristen, bredvid den om Maps Grounding Lite.
3. **PageSpeed Insights slutar ge fältdata.** *"We plan to discontinue including real-world data from the Chrome User Experience Report in this API"* ([PSI, kom igång](https://developers.google.com/speed/docs/insights/v5/get-started)). Fältdatan ska hämtas ur CrUX API, gratis med 150 anrop i minuten ([CrUX API](https://developer.chrome.com/docs/crux/api)). Guiden har redan CrUX API under *Åtkomst* (`2-9`), så det här bekräftar valet.
4. **Med ett gratis Gmail-konto är Google personuppgiftsansvarig, inte biträde** ([Googles integritetspolicy](https://policies.google.com/privacy), gäller från 2026-10-16). I Workspace är Google biträde enligt Cloud Data Processing Addendum ([DPA](https://cloud.google.com/terms/data-processing-addendum/), ändrad 2026-06-08). Tolkning: kunders personuppgifter bör inte ligga i Johnnys privata konto när den första kunden kommer. Övningssajterna berörs inte.

## Per steg i flödet

| Steg | Förslag | När |
|---|---|---|
| Intervju och research (`2-1`) | Deep Research som andra, oberoende genomgång av bransch och ort före intervjun, gratis, utan kunduppgifter i frågorna och med källorna kontrollerade. Places API väntar på juristen. Keyword Planner väntar. | Nu (gratis) |
| Kit och yta (`2-5`) | Stitch: avstå. Möjligt prov: en fri Stitch-variant mot kitens provsidor i enkäten. DESIGN.md:s kontrastkontroll prövas enligt `larande` utan Stitch. | Johnny avgör |
| Granskningsrådet (F2) | Gemini API, betald nivå, med fast prompt och strukturerat svar. Inte via abonnemang. | Nu, när nyckeln finns |
| Enkäten | clasp: koden i git och `create-deployment -i <id>`, så att adressen står kvar vid en ny version. Installationen kräver Johnnys ja. | Nu |
| Kvalitetssäkring (`2-8`) | Lokal Lighthouse som i dag. CrUX API för fältdata, med vetskapen att små lokala sajter ofta saknar sådan data ⚠️. | När en sajt är publicerad |
| Lansering (steg 5) | Nortropic verifierar kundens domän i Search Console via DNS i Cloudflare. Google-profilens uppgifter ändras via API:t bara med kundens uttryckliga ja. | Första kunden |
| Månadsrapporten (`2-9`) | Search Console API (16 månader bakåt), Google-profilens Performance-API (samtal, vägbeskrivningar, klick, visningar, sökord) och CrUX. Ett Apps Script kan fylla en mall i Docs, göra en PDF och lägga den i ett Gmail-utkast som Johnny skickar. Data Studio har ingen koppling till Google-profilen. | Första kunden |
| Företaget (`4`) | Workspace med egen domän (Starter 6,80 € eller Standard 13,60 € per användare och månad med årsbindning; EU-region för lagrad data kräver Standard). Ett organisationskonto i Business Profile där Nortropic är hanterare. | Första kunden |

**Tiden för Business Profile-API:et:** ansökan kräver en profil som är *"verified and active for 60+ days"* och en webbplats på profilen, och den granskas *"within 14 days"* ([förutsättningar](https://developers.google.com/my-business/content/prereqs), [FAQ](https://developers.google.com/my-business/content/faq)). API:t är gratis. Om Nortropic skaffar en egen profil nu kan ansökan vara godkänd om cirka 75 dagar.

## Spår 1: Google AI Pro och Ultra

| | AI Pro | AI Ultra |
|---|---|---|
| Pris i Sverige | 255 kr/mån | 999 kr/mån (5 gånger Pros gränser) eller 2 599 kr/mån (20 gånger) |
| Deep Research | Högre gräns. Finns också gratis | Högre |
| Gemini Notebook (före detta NotebookLM) | 500 notebooks med 300 källor var. Gratis: 100 med 50 | 500 eller 600 källor |
| Flow och Veo | 1 000 krediter/mån plus 50/dag; Veo 3.1 Fast kostar 20 per klipp | 10 000 eller 25 000 |
| Jules | 100 uppgifter/dygn. Gratis: 15 | 300 |
| Gemini CLI och Code Assist | Avvecklat 2026-06-18 | Avvecklat |
| Gmail och Docs | Gmails skrivhjälp finns inte på svenska. Sidopanelen i Docs, Sheets och Drive stöder svenska | Samma |
| Molnkrediter | 10 USD/mån | 40 eller 100 USD/mån |

Whisk lades ner 2026-04-30 och flyttade in i Flow. Jules och Antigravity stöder bara engelska. Gemini Notebook med privat konto tränar inte grundmodellerna på källorna, *"unless you choose to provide feedback"*. Gemini-appen tränar på aktiviteten när Keep Activity är på, och ett urval av chattarna läses av människor. Källor: [Gemini, prenumerationer](https://gemini.google/subscriptions/), [Google One, AI-förmåner](https://support.google.com/googleone/answer/16286513), [Gemini Notebook, gränser](https://support.google.com/gemininotebook/answer/16213268), [Flow, krediter](https://support.google.com/flow/answer/16526234), [Jules, gränser](https://jules.google/docs/usage-limits), [Developer Program, planer](https://developers.google.com/program/plans-and-pricing).

## Spår 2: Googles API:er

| API | Steg | Nytta | Åtkomst och kostnad | Förslag |
|---|---|---|---|---|
| Business Profile, Performance och sökord | rapport, research | Hög | ansökan, kunden lägger till oss som hanterare, gratis, lagring högst 30 dagar | Ansök när Nortropic har en profil, använd vid första kund |
| Business Profile, uppgifter | lansering | Medel | samma, 10 ändringar per minut och profil | Första kund, bara med kundens ja |
| Business Profile, recensioner | förvaltning | Medel | svar kräver kundens *"prior specific and express consent"* | Läsa vid första kund, svara senare med mänsklig grind |
| Business Profile, Q&A | – | – | nedlagt 2025-11-03 | Avstå |
| Search Console API | lansering, rapport | Hög | kunden lägger till oss eller DNS-verifiering, gratis ⚠️ | Första kund |
| Indexing API | – | – | bara jobbannonser och livesändningar | Avstå |
| Places API (New) | research, jämförelse | Medel | 1 000 gratis/mån, sedan 35 USD per 1 000, EES-hinder | Avstå tills juristen svarat |
| PSI och CrUX | kvalitet, jämförelse | Medel | gratis, nyckel | Ta in när en sajt är publicerad |
| GA4 Data API | rapport | Låg | kräver GA4 och samtycke | Avstå (guiden har redan valt bort GA4) |
| Ads Keyword Planner | research | Medel | Ads-konto, nivån Basic eller Standard, varumärkesverifiering | Senare |
| Gemini, bildförståelse | rådet | Medel | betald nivå | Nu |
| Gemini, Search-grounding | research | Låg | 5 000 gratis/mån, sedan 14 USD per 1 000; resultaten får inte ändras | Senare, inte till kundtext |

Byrån registrerar ett organisationskonto, och kunden lägger till byråns grupp på sin profil. Google råder tredje part att *"only add themselves as manager"*. Kunden ska få besked om våra ändringar inom 48 timmar. Källor: [Business Profile, policyer](https://developers.google.com/my-business/content/policies), [gränser](https://developers.google.com/my-business/content/limits), [Search Analytics](https://developers.google.com/webmaster-tools/v1/searchanalytics/query), [Search Console, gränser](https://developers.google.com/webmaster-tools/limits), [Places, Text Search](https://developers.google.com/maps/documentation/places/web-service/text-search), [CrUX History](https://developer.chrome.com/docs/crux/history-api), [Ads, åtkomstnivåer](https://developers.google.com/google-ads/api/docs/api-policy/access-levels).

## Spår 3: Workspace och Apps Script

- **Apps Script** når Gmail, Kalender, Drive, Docs, Sheets och Forms, och andra API:er via UrlFetch med `ScriptApp.getOAuthToken()`. Utlösare kan köras från varje minut till en gång i månaden, och de körs alltid som den som skapade dem ([installerbara utlösare](https://developers.google.com/apps-script/guides/triggers/installable)). Ett privat konto har 100 e-postmottagare och 90 minuters utlösartid per dag, mot 1 500 och 6 timmar i Workspace ([kvoter](https://developers.google.com/apps-script/guides/services/quotas)). Det räcker för ett tiotal kunder. E-posttaket tar slut först.
- **Enkätens inställning stämmer:** `access: MYSELF` betyder *"Only the deploying user can run the app"* ([webbapp-manifest](https://developers.google.com/apps-script/manifest/web-app-api-executable)).
- **clasp** skriver om koden och uppdaterar en distribution från terminalen. Inloggningsfilen `.clasprc.json` *"should be private!"*, och clasp är *"not an officially supported Google product"* ([clasp](https://github.com/google/clasp)). Filen ska ligga utanför repot.
- **Data Studio** heter så igen sedan 2026-04-16, efter Looker Studio. Det är gratis och har kopplingar till Sheets och Search Console, men ingen till Google-profilen ([kopplingar](https://docs.cloud.google.com/looker/docs/studio/available-connectors)).
- **Texter i Docs:** kunden kan kommentera och lösa kommentarer, och Drive API läser kommentarerna. Formella godkännanden kräver Business Standard ([godkännanden](https://knowledge.workspace.google.com/admin/drive/manage-approvals)).
- **Bokningssida:** finns gratis på privat konto. Flera scheman och påminnelser kräver till exempel Workspace Individual eller AI Pro ([bokningssidor](https://support.google.com/calendar/answer/16287038)).
- **Workspace:** Gemini i Workspace tränar inte på innehållet utanför domänen utan lov ([integritet](https://knowledge.workspace.google.com/admin/gemini/generative-ai-in-google-workspace-privacy-hub)). EU-region för lagrad data finns i Standard och Plus, men inte i Starter ([dataregioner](https://knowledge.workspace.google.com/admin/compliance/choose-a-geographic-location-for-your-data)). Den svenska prissidan anger EUR, medan sidan för Individual visade 153 kr för Business Standard. Motsägelsen är olöst ⚠️ ([priser](https://workspace.google.com/intl/sv/pricing)).
- **Inlåsning:** skriptkoden ska ligga i git, kalkylark eller CSV ska vara källan, och Data Studio används bara för att visa. Takeout-arkiven försvinner efter cirka 7 dagar.

## Spår 4: Stitch

Stitch är gratis, i beta hos Google Labs, och ger 1–5 varianter åt gången. Den exporterar HTML med Tailwind, React, Figma, eller till AI Studio, Antigravity, Lovable och Bolt. Den har en MCP-server, ett CLI (0.11.1) och det öppna formatet DESIGN.md (Apache-2.0, [Googles blogg 2026-04-21](https://blog.google/innovation-and-ai/models-and-research/google-labs/stitch-design-md/)). Inget har ändrats sedan utredningen 2026-10-14.

- **Inte i kundbygget:** koden är Tailwind-HTML, inte Astro eller kiten. Ingen av de 24 dokumentationssidor spåret läste nämner tillgänglighet eller WCAG. Projektet är antingen App eller Web: *"not to resize, but to translate"*, så sidorna blir inte responsiva.
- **Inte med kundens innehåll:** *"Uploaded images generate stable public URLs"*, ett urval läses av mänskliga granskare, och två integritetstexter ligger ute samtidigt med motsatta standardval för träning ⚠️. Det krockar med *inga kunduppgifter* i `guide/3-3-sakerhet-och-installningar.md`.
- **Där det skulle kunna passa:** som kontroll i enkäten, alltså en fri generering ställd mot kitens provsidor för samma påhittade företag. Väljer folk Stitch säger det att kiten behöver förnyas.
- **DESIGN.md:s kontrollverktyg** (`npx @google/design.md lint`) räknar WCAG-kontrast och kräver varken Stitch eller Google-konto ([repo](https://github.com/google-labs-code/design.md)). Det prövas i så fall enligt `larande`.

Stitch ströks 2026-10-15 (`BESLUT.md`, *Stitch stryks*). Det står kvar tills Johnny säger något annat.

## Spår 5: Lovable

**Kort:** Lovables kopplingar finns på riktigt och täcker det portalen på N4 behöver: Search Console, Google-profilen och Cloudflare. De går genom Lovables egen gateway och fungerar bara så länge appen stannar hos Lovable. För portalen på N3 blir Lovable dyrare än den godkända utformningen, lägger till ett biträde och ger sämre kontroll över CSP.

- **Hur det fungerar:**
  - Nya projekt sedan 2026-05-13 är TanStack Start (React med serverrendering, Vite och Nitro) ([hosting](https://docs.lovable.dev/features/hosting), [TanStack Start](https://docs.lovable.dev/features/upgrade-to-tanstack-start)).
  - Backend är Lovable Cloud, alltså Supabase i Lovables konto, med Europa som val av region. Ett eget Supabase-projekt går också, men det finns ingen migrering åt något håll ([Cloud](https://docs.lovable.dev/features/cloud)).
  - Git-synken går åt båda hållen, men *"You can't import an existing repository"* ([Git-synk](https://docs.lovable.dev/integrations/git-sync-overview)). Byråns Astro-repon kan alltså inte tas in.
  - Koden kan flyttas, men *"Connections are not exported"* ([extern hosting](https://docs.lovable.dev/tips-tricks/external-deployment-hosting)).
- **Kopplingarna** (cirka 115 i katalogen, [översikt](https://docs.lovable.dev/integrations/introduction)):
  - I drift går anropen genom Lovables gateway. Tokens ligger krypterade hos Lovable, och projektet får bara `LOVABLE_API_KEY` ([säkerhet](https://docs.lovable.dev/integrations/security)).
  - **Search Console** läser med `webmasters.readonly`, via ett delat Google-konto och inte ett per kund ([Search Console](https://docs.lovable.dev/integrations/google-search-console)).
  - **Google-profilen** (sedan 2026-09-25) har recensioner, öppettider, inlägg och prestanda. Den har bara `business.manage` och *"does not offer a separate read-only scope"*. Enligt Lovable behövs *"no … own Google Cloud project"* ([Google Business Profile](https://docs.lovable.dev/integrations/google-business-profile)). Tolkning ⚠️: Lovable har redan det API-godkännande som Nortropic annars måste ansöka om. Gränsen på 30 dagar för lagring gäller ändå datan.
  - **Cloudflare API** (sedan 2026-09-10) kräver en egen token ([Cloudflare API](https://docs.lovable.dev/integrations/cloudflare-api)). GA4 kan bara ta emot data, inte läsa rapporter.
- **Styrning utifrån:** MCP-servern `https://mcp.lovable.dev` finns på alla planer, och det finns ett officiellt plugin för Claude Code. Anropen kostar krediter, och åtkomsten *"can span projects and workspaces"* ([MCP-servern](https://docs.lovable.dev/integrations/lovable-mcp-server)). Om Claude Code pushar till den synkade grenen skriver två agenter i samma `main`.
- **Pris och villkor:**
  - Pro kostar 25 USD/mån och Business 50 USD/mån, båda med 100 krediter ([planer](https://docs.lovable.dev/introduction/subscription-plans)). Priser i EUR eller SEK hittades inte ⚠️.
  - Biträdesavtalet ingår bara i Business och Enterprise: *"If you're on a Business or Enterprise plan, your usage includes our DPA"* ([DPA](https://lovable.dev/data-processing-agreement)).
  - Licensen gäller *"personal or internal business purposes"*. Om den täcker arbete åt kunder är oklart (tolkning) ([villkor](https://lovable.dev/terms), ändrade 2026-08-28).
  - Sedan 2026-09-09 tränar Lovable på data från Free och Pro, om det inte stängs av i kontot. På Business är träningen avstängd från början ([data opt-out](https://docs.lovable.dev/features/business/data-opt-out)).
- **Säkerhet** (oberoende källor):
  - **CVE-2025-48757** (CVSS 9,3, ifrågasatt av Lovable): bristande RLS i 170 av 1 645 appar ([NVD](https://services.nvd.nist.gov/rest/json/cves/2.0?cveId=CVE-2025-48757), [Matt Palmer](https://mattpalmer.io/posts/statement-on-CVE-2025-48757/)).
  - **Februari–april 2026:** chatthistorik och källkod i publika projekt gick att nå i elva veckor. Lovable bekräftar det själv ([Lovable, april 2026](https://lovable.dev/blog/our-response-to-the-april-2026-incident)).
  - **Escape** fann över 2 000 sårbarheter i 5 600 appar byggda med vibe-kodning ([Escape](https://escape.tech/blog/methodology-how-we-discovered-vulnerabilities-apps-built-with-vibe-coding/)).
  - **Kvalitet:** Lovable skriver själv att skanningen *"is not a full accessibility audit"*. I ett stickprov på en publicerad Lovable-sajt fanns ingen CSP, men ett injicerat analysskript och 205 kB JavaScript med gzip. Det är en enda sajt ⚠️.

| | Godkänd utformning (JSON → Astro bakom Access) | Lovable |
|---|---|---|
| Kostnad | 0 upp till 50 användare | Business (50 USD/mån) för biträdesavtalet, plus krediter |
| GDPR | Cloudflare, som redan är biträde | Lovable, Supabase och AI-leverantörer ⚠️ |
| Inlåsning | Ingen | Kopplingar och Cloud följer inte med |
| Säkerhet | Spärr vid kanten, en policy per kund | Isolering per kund i appkod och RLS, ovanpå ett delat Google-konto |
| Kvalitet | Kitet, CSP med hashar, Lighthouse 100 | Inte Astro, injicerade skript, CSP oklar |
| Claude Code | Gör allt | Styr en annan agent; skrivverktyg kräver Johnnys ja varje gång |

**Bedömning:** avstå för portalen, kunddata och interna verktyg. Ett internt verktyg som kundöversikten skulle gå snabbt att bygga, men då hamnar alla kunders tokens hos Lovable. Katalogen är användbar som checklista för vad kunderna förväntar sig att förvaltningen kan: svar på recensioner, öppettider, inlägg, Bing och bokning. Om Lovable ska prövas ska det vara med ett påhittat företag och inte med övningssajten. Övningssajten handlar om en verklig firma, och allt om firman ligger i `sites/`.

## Förslag

1. **Ingen prenumeration nu.** Gemini-nyckeln skaffas i Google AI Studio med betald nivå och 5 USD i förbetalning, och läggs i `~/.claude-bygg/nycklar/gemini`.
2. **Juristen får två nya frågor:** om Google-profilens mått får sparas i ögonblicksbilden längre än 30 dagar, och om Places-data får användas i jämförelsen mot konkurrenterna i EES. Tills dess hämtar rapporten profilens mått färskt varje månad, och guiden 2-9 får en rad om det.
3. **clasp till enkäten,** med inloggningsfilen utanför repot.
4. **En egen profil för Nortropic i Business Profile** när byrån har adress och sajt, så att 60-dagarsgränsen börjar räknas.
5. **Workspace och personuppgiftsbiträdesavtal vid första kunden,** Standard om EU-region behövs.
6. **Stitch står kvar som struken.** Om Johnny vill: ett prov i enkäten med en fri Stitch-variant mot kitens provsidor.
7. **Deep Research (gratis) som andra genomgång före intervjun,** utan kunduppgifter.
8. **Kundportalen byggs som det är godkänt,** inte i Lovable.
9. **Lovables katalog blir checklista för N4,** i `guide/2-9-drift-och-forvaltning.md` under *Kopplingar*: svar på recensioner, öppettider, inlägg, Bing och bokning.
10. **Om Johnny vill pröva Lovable:** ett påhittat företag på Pro med träningen avstängd, byggt via Lovables MCP-server. Mät tiden och krediterna, kör kontrollskriptet (axe, Lighthouse, CSP och huvuden) och lägg versionen som blint alternativ i enkäten. Ett Lovable-konto och MCP-servern kräver Johnnys ja.

## Det viktigaste i källorna

Google: [Gemini API, villkor](https://ai.google.dev/gemini-api/terms) · [Gemini API, priser](https://ai.google.dev/gemini-api/docs/pricing) · [Code Assist, avveckling](https://developers.google.com/gemini-code-assist/docs/deprecations/code-assist-individuals) · [Antigravity, villkor](https://antigravity.google/terms) · [Business Profile, policyer](https://developers.google.com/my-business/content/policies) · [Business Profile, förutsättningar](https://developers.google.com/my-business/content/prereqs) · [EEA Places, tillåten användning](https://cloud.google.com/terms/maps-platform/eea-places-api-permitted-uses) · [PSI](https://developers.google.com/speed/docs/insights/v5/get-started) · [CrUX API](https://developer.chrome.com/docs/crux/api) · [Apps Script, kvoter](https://developers.google.com/apps-script/guides/services/quotas) · [Cloud DPA](https://cloud.google.com/terms/data-processing-addendum/) · [Googles integritetspolicy](https://policies.google.com/privacy). Lovable: [kopplingarna](https://docs.lovable.dev/integrations/introduction) · [Google Business Profile](https://docs.lovable.dev/integrations/google-business-profile) · [MCP-servern](https://docs.lovable.dev/integrations/lovable-mcp-server) · [DPA](https://lovable.dev/data-processing-agreement) · [data opt-out](https://docs.lovable.dev/features/business/data-opt-out) · [incidenten i april 2026](https://lovable.dev/blog/our-response-to-the-april-2026-incident). Oberoende: [CVE-2025-48757](https://services.nvd.nist.gov/rest/json/cves/2.0?cveId=CVE-2025-48757) · [Escape](https://escape.tech/blog/methodology-how-we-discovered-vulnerabilities-apps-built-with-vibe-coding/). IMY: [personuppgiftsbiträdesavtal](https://www.imy.se/verksamhet/dataskydd/det-har-galler-enligt-gdpr/personuppgiftsansvariga-och-personuppgiftsbitraden/personuppgiftsbitradesavtal/). Alla lästa 2026-10-17.
