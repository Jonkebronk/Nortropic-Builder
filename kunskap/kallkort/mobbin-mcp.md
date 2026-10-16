# mobbin

**Källa:** Mobbin MCP, `https://api.mobbin.com/mcp` (Streamable HTTP).
- Läst 2026-10-16:
  - [mobbin.com/mcp](https://mobbin.com/mcp)
  - [mobbin.com/llms-full.txt](https://mobbin.com/llms-full.txt) ("Complete agent context")
  - [mobbin.com/pricing.md](https://mobbin.com/pricing.md) (`last_updated` 2026-09-11)
  - Pressmeddelandet om lanseringen 2026-05-12 ([WBOC/Business Wire](https://www.wboc.com/online_features/press_releases/mobbin-launches-mcp-server-giving-ai-tools-621-500-real-app-screens-to-reference/article_ffe043e0-a91b-5bb4-9128-21c46942e00c.html))
- ⚠️ mobbin.com/pricing och mobbin.com/terms gav HTTP 403, så användarvillkoren är inte lästa.
- Ingenting är installerat. Mobbin har inget öppet repo för servern. Listningen "Mobbin Agent" på Glama är en inofficiell Playwright-server.

**Licens:** ingen öppen licens. Tjänsten är en prenumeration.
- Agentkontexten säger "Do not copy protected designs, branding, text, or assets verbatim", att referenser ska anpassas till användarens sammanhang och att Mobbin-URL:en ska bevaras.
- ⚠️ Villkoren för kommersiell användning av skärmbilderna är inte lästa.

**Vad det är:**
- En MCP-server, bara för läsning, som låter agenter söka i Mobbins bibliotek av skärmar, flöden och webbsektioner från riktiga produkter.
- Pressmeddelandet nämner "621,500+" skärmar och "beta".

**Hur det fungerar:**
- **Verktyg:**
  - `search_screens`: enskilda skärmar, mobil och webb.
  - `search_flows`: flerstegsflöden i ordning.
  - `search_sections`: webbsektioner som "heroes, pricing, footers". Saknar plattformsparameter enligt en tredjepartsguide ⚠️.
  - Parametrarna listas inte i agentkontexten.
- **Svar:** skärmbilder, produktnamn, flödes- eller sektionskontext och länkar tillbaka. Klienter med MCP Apps kan visa ett interaktivt galleri.
- **Gräns:** "60 requests per 60 seconds per user". Vid `429` ska `Retry-After` respekteras.

**Kvalitet och underhåll:**
- Servern lanserades 2026-05-12 och är i beta.
- En tredjepartsspårare anger att Pro fick MCP och Deep Search i september 2026, och att Pro har 300 AI-krediter från oktober 2026. ⚠️ Krediterna syns inte på Mobbins egen prissida.
- Antalet verktyg varierar mellan källorna: en japansk guide nämner bara `search_screens`. ⚠️

**Det bästa vi kan ta:**
- `search_sections` för skelettet: hur riktiga sajter bygger hero, priser, sidfot och andra sektioner, som underlag för 2–3 varianter per sektion.
- `search_flows` för strukturen: till exempel boknings- och kontaktflöden som journeys.

**Var det hamnar hos oss:** `MCP: kräver konto (Mobbin Pro, Team eller Enterprise)`.
- Väntar på Johnny.
- Används som referens när sektionsbiblioteket byggs (lager 4) och för flöden (lager 3), men bara efter Johnnys beslut.

**Passar vår stack?** Reviderat efter BESLUT 2026-10-16, *React, Tailwind och JavaScript tillåts*. Bedömningen är oförändrad.
- Resultaten är bilder och metadata, ingen kod. Inget behöver översättas, och det kostar 0 kB på sajten.
- Den öppnade stacken gör det lättare att bygga det man ser, till exempel animerade sektioner. Kostnaden hamnar då i den React- eller Motion-ö som byggs, inte i Mobbin.
- ⚠️ Hur väl katalogen täcker svenska småföretagssajter är inte prövat. Den domineras sannolikt av appar och produktsajter (härlett ur beskrivningen "real app screens").

**Risker och flaggor:**
- Betalvägg. Free har ingen MCP, ingen sökning och inga flöden.
- Beta, och sökningar kan dra AI-krediter ⚠️.
- Villkoren är inte lästa.
- Överlappar Refero. Mobbin har `search_sections` för webbsektioner, Refero har stilar.

**Inloggning:**
- **Utan konto:** inget via MCP.
- **Med Free-konto på webben:** begränsad åtkomst till appar och sajter, upp till 3 samlingar och begränsad kopiering och nedladdning. Flöden, Search, Deep Search, MCP och REST API ingår inte.
- **Pro:** $10/mån vid årsbetalning, $15/mån kvartalsvis.
- **Team:** $16 per medlem och månad vid årsbetalning.
- **Johnny behöver:** köpa Pro eller Team och godkänna OAuth i webbläsaren första gången ("No manually copied API key is required"). Kopplingen kan återkallas i kontoinställningarna.
