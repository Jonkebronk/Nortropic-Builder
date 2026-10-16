# Plausible eller Umami

**Källa (läst 2026-10-16):**
- https://plausible.io/privacy-focused-web-analytics.
- https://github.com/plausible/analytics, HEAD `d44e104` (2026-10-16), tagg `v3.2.1`, med `README.md`.
- https://umami.is/pricing.
- https://github.com/umami-software/umami, HEAD `ec0ff50` (2026-09-16), tagg `v3.4.0`, med `README.md`.
- Plausibles priser, Stats API och juridiska bedömning, via anteckningarna för lager 9 (2026-10-13).

**Licens:**
- Plausible Community Edition: AGPL-3.0. Den som ändrar och kör den som nättjänst ska lämna ut källkoden. Plausible Cloud är en tjänst.
- Umami: MIT. Licenstexten följer med.

**Vad det är:** Två besöksstatistikverktyg utan cookies. De är alternativ till Google Analytics, som skript på sidan, i molnet eller i egen drift.

**Hur det fungerar:**
- **Plausible:**
  - Inga cookies eller beständiga identifierare. Unika besökare räknas med en hash av ett dagligt salt, domänen, IP-adressen och webbläsaren, och saltet raderas efter 24 timmar.
  - Data lagras hos Hetzner i Tyskland, och *"Your website data never leaves the EU"*.
  - Plausible skriver *"no consent banners required"*. Det är leverantörens egen bedömning, och juristtexten på deras blogg tar inte upp EDPB 2/2023.
  - Stats API ingår bara i Business enligt researchen. Startpriset är 9 USD i månaden vid 10 000 sidvisningar (2026-10-13).
- **Umami Cloud:**
  - Hobby: 0 USD, 100 000 händelser, 1 sajt, 6 månader, inget API.
  - Pro: 20 USD, en miljon händelser, upp till 20 sajter, 2 år och API.
  - Business: 200 USD.
  - Servrarna står *"in the US and EU"*, och någon garanti för enbart EU finns inte.

**Kvalitet och underhåll:**
- Plausible: 29 487 ★, 4 463 commits, cirka 135 författare, aktiv.
- Umami: 39 410 ★, 6 855 commits, cirka 473 författare. Senaste commit 2026-09-16.
- Inga kända problem är sökta ⚠️.

**Det bästa vi kan ta:**
- Inget som verktyg.
- Plausibles sätt att räkna unika besökare med ett salt som roteras är ett mönster att jämföra med om byrån själv utreder serverräkning (luckan 4).

**Var det hamnar hos oss:**
- Ingenstans. Beslut: **släpp**.
- Statistiken kommer ur Cloudflare Pro, ur serverloggarna och utan skript (`BESLUT.md` 2026-10-16).
- Båda verktygen mäter med JavaScript, och enligt vår läsning kräver det samtycke (`guide/2-8-teknik-och-kvalitet.md` [N3], EDPB 2/2023 punkt 33, PTS). Då finns redan GA4 som tillval.
- Omprövas om en kund behöver händelser som klick på `tel:`, eller om EU:s undantag för egen publikmätning antas.

**Passar vår stack?** Tekniskt ja, som ett skript. Men det bryter mot målet om inga skript utifrån och ingen samtyckesruta på sajter utan statistik eller annonser.

**Risker och flaggor:**
- Juridisk tolkning, inte juridisk rådgivning.
- Plausible CE är AGPL.
- Umami Cloud kan lagra i USA.
- Egen drift är ytterligare en databas att sköta.

**Inloggning:**
- Webbplatserna och repona är publika och lästa.
- Instrumentpaneler och API kräver konto. Johnny behöver inget, eftersom posten släpps.
