# Gemini API och nanobanana-mcp-server

**Källa:** allt lästes 2026-10-16.
- **Gemini API:**
  - Villkor: https://ai.google.dev/gemini-api/terms (senast uppdaterade 2026-04-28, gäller från 2026-03-23)
  - Bildgenerering: https://ai.google.dev/gemini-api/docs/image-generation
  - Utfasningar: https://ai.google.dev/gemini-api/docs/deprecations (uppdaterad 2026-10-12)
  - Priser: https://ai.google.dev/gemini-api/docs/pricing (uppdaterad 2026-10-15)
  - Fakturering: https://ai.google.dev/gemini-api/docs/billing (uppdaterad 2026-09-28)
  - Gränser för anropstakt: https://ai.google.dev/gemini-api/docs/rate-limits (uppdaterad 2026-10-15)
- **nanobanana-mcp-server:** https://github.com/zhongweili/nanobanana-mcp-server, commit 062b9c6fc9 (2026-10-02), release v0.4.6 (2026-09-27).
  - Lästa delar: README i sin helhet, CHANGELOG.md, `pyproject.toml`, `config/settings.py`, modell-ID:n i koden och alla 36 ärenden och pull-förfrågningar.
- **AI-förordningen:** art. 50 och art. 3(60) via https://artificialintelligenceact.eu/article/50/ och /article/3/.
  - ⚠️ Sekundär återgivning. EUR-Lex svarade inte (tom sida), så den svenska lydelsen är inte läst.
- **SynthID och C2PA:** Googles blogg https://blog.google/technology/ai/ai-image-verification-gemini-app/ (november 2025) och sekundära artiklar.

**Licens:**
- **nanobanana-mcp-server:** MIT. Kräver att upphovsrättsnotisen följer med vid spridning.
- **Gemini API:** kommersiella villkor från Google. "Google won't claim ownership over that content", men användaren ansvarar för hur innehållet används. Åldersgräns 18 år.
- **EES, Schweiz och Storbritannien:** "You may use only Paid Services when making API Clients available to users in the European Economic Area".

**Vad det är:** Gemini API är Googles betalda API för bildmodellerna Nano Banana. nanobanana-mcp-server är en tredjeparts MCP-server i Python (FastMCP och google-genai) som gör generering och redigering tillgänglig som MCP-verktyg i Claude Code och andra klienter.

**Hur det fungerar:**
- **Modeller enligt utfasningssidan 2026-10-12:**
  - `gemini-nano-banana-2.1` släpptes 2026-10-06 och är stabil.
  - `gemini-3.1-flash-lite-image` är stabil.
  - `gemini-3.1-flash-image` är stabil, med 2.1 som rekommenderad ersättare.
  - `gemini-3-pro-image` är stabil.
  - `gemini-2.5-flash-image` stängs tidigast 2027-03-15.
  - **Förhandsversionerna `gemini-3.1-flash-image-preview` och `gemini-3-pro-image-preview` har avstängningsdatum 2026-06-25.**
- **SynthID:** "All generated images include a SynthID watermark." Sidan för bildgenerering nämner inte C2PA. Googles blogg säger att Nano Banana Pro bäddar in C2PA i Gemini-appen, Vertex AI och Google Ads. ⚠️ Det är inte bekräftat för Gemini API.
- **Priser på betald nivå, per bild i standardläge:**
  - Nano Banana 2.1: 0,0336 USD (1K), 0,0504 USD (2K) och 0,113 USD (4K).
  - Nano Banana Pro: 0,134 USD (1K eller 2K) och 0,24 USD (4K).
  - Batch kostar hälften.
  - Bildmodellerna har ingen gratisnivå ("Not available").
- **Fakturering:**
  - Ett faktureringskonto kopplas i AI Studio, och minst 5 USD betalas i förskott.
  - Krediterna förfaller efter 12 månader. Vid saldot 0 svarar API:t "HTTP 402".
  - Taket på nivå 1 är 250 USD per månad.
  - Utgiftstak per projekt är "experimental".
- **Data på betald nivå:** prompter och svar används inte för att förbättra Googles produkter. De loggas "for a limited period of time" för att upptäcka missbruk. Längden anges inte.
- **Data på gratisnivån:** "human reviewers may read, annotate, and process your API input and output".
- **MCP-servern:**
  - Startas med `uvx nanobanana-mcp-server@latest`, och nyckeln ges i `GEMINI_API_KEY`. Alternativet är Vertex AI med ADC.
  - `NANOBANANA_MODEL` tar bara nivåerna `flash`, `nb2`, `pro` eller `auto`. Modell-ID:n är hårdkodade.
  - Bilder sparas i `IMAGE_OUTPUT_DIR` eller `~/nanobanana-images`, plus en SQLite-fil `images.db`. Den kan stängas av med `DISABLE_DATABASE=true`.
  - Verktyget `upload_file` laddar upp filer till Gemini Files API.
  - Servern är medvetet fri från telemetri. Underhållaren tackade nej till analys i [#37](https://github.com/zhongweili/nanobanana-mcp-server/issues/37): "nothing leaves the user's machine except calls to the model API".

**Kvalitet och underhåll:**
- 400 stjärnor, 116 forkar och cirka 9 bidragsgivare. Senaste push 2026-10-07 och senaste commit 2026-10-02.
- **Allvarligast:** v0.4.6 använder fortfarande `gemini-3.1-flash-image-preview` för nb2, som är standard, och `gemini-3-pro-image-preview` för pro. Google angav 2026-06-25 som avstängningsdatum för båda.
  - Pull-förfrågan [#36](https://github.com/zhongweili/nanobanana-mcp-server/issues/36) byter till `gemini-nano-banana-2.1` och `gemini-3-pro-image` men är märkt "Do NOT merge yet".
  - #36 påstår också att `gemini-3.1-flash-image` "retires 2026-10-29". Googles sida anger inget sådant datum.
  - ⚠️ Inte provat om förhandsversionerna fortfarande svarar, eftersom det kräver en nyckel.
- **Övriga kända problem:**
  - Bygget misslyckas på Intel-Mac ([#38](https://github.com/zhongweili/nanobanana-mcp-server/issues/38)).
  - FastMCP 4 kraschade servern innan `<3` låstes i v0.4.6.
  - Vertex-anrop hängde sig. Fixat i v0.4.5 ([#31](https://github.com/zhongweili/nanobanana-mcp-server/issues/31)).
  - En säkerhetsgranskning täppte till godtycklig filläsning via `input_image_path_*` ([#29](https://github.com/zhongweili/nanobanana-mcp-server/issues/29), 2026-04-20).
- README:n hänvisar till "Get a free API key" i AI Studio. För oss gäller inte det, eftersom bildmodellerna saknar gratisnivå och EES kräver betald nivå.

**Det bästa vi kan ta:**
- Själva API-anropet med modellen `gemini-nano-banana-2.1` eller 2 Lite för billiga skisser.
- Bildförhållandet i anropet, till exempel 3:2, 4:5 eller 16:9.
- Batchläget för biblioteksbyggen, som kostar hälften.
- MCP-serverns `output_path`-logik och dess hårdade sökvägskontroller (v0.4.6, #29) är bra mönster om vi skriver eget omslag.
- Själva servern bör väntas in tills #36 är sammanslagen. Annars bör vi använda en egen tunn wrapper med google-genai. Det är ett förslag.

**Var det hamnar hos oss:** bekräftar det preliminära.
- En MCP eller ett skript som kräver konto, med Gemini API på betald nivå.
- Utdata blir bara märkta illustrationer, som miljöer, material och detaljer, i Nortropics bildbibliotek.
- Aldrig foton av personer, kundens jobb eller lokaler som ser äkta ut. Aldrig i kundens Google-profil, där Googles policy säger "no … excessive use of filters or AI".

**Passar vår stack?** Ja som verktyg vid sidan av bygget. Bilderna går in i `src/assets/` som vanliga bilder genom sharp. Märkningen måste ligga i synlig bildtext, eftersom sharp tar bort all metadata, och därmed troligen C2PA (⚠️ inte provat). SynthID ligger i pixlarna och överlever troligen omkodning. ⚠️ Det är inte verifierat efter AVIF- och WebP-kodning. Det som måste översättas är svenska promptmallar och bildtexter.

**Risker och flaggor:**
- **Betalvägg:** faktureringskonto och förskott krävs.
- **Inloggning:** följande syns bara när man är inloggad i Google AI Studio eller Google Cloud Console:
  - att skapa API-nyckel
  - att koppla faktureringskonto och betala förskott
  - utgiftstak och användning
  - exakta anropsgränser per modell, som dokumentationen hänvisar till AI Studio för
  
  **Johnny behöver logga in** för att skapa projekt och nyckel, välja betald nivå och sätta utgiftstak. Nyckeln ska ligga utanför repot.
- **[GDPR]** På betald nivå loggas prompter en begränsad tid. Kundfoton som laddas upp för redigering hamnar i Gemini Files API. ⚠️ Lagringstiden lästes inte här.
- **[AI-förordningen]** Art. 50(4) kräver att den som använder AI-system (deployer) upplyser om deepfakes. Definitionen i 3(60) omfattar innehåll som "resembles existing persons, objects, places … and would falsely appear … authentic". En fotorealistisk bild av en "verkstad" kan räknas dit.
  - Art. 50(5) kräver att upplysningen är "clear and distinguishable" senast vid första exponeringen.
  - Det är en tolkning, inte juridisk rådgivning.
- **Modellutfasning:** ID:n byts ofta, med tre bildmodeller avvecklade 2025–2026. Modell-ID:t ska ligga i en konfiguration, inte hårdkodas.
