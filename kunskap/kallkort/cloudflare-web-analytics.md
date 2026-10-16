# Cloudflare Web Analytics

**Källa:**
- Cloudflare, *Web Analytics FAQ* (developers.cloudflare.com/web-analytics/faq/), läst 2026-10-16.
- *About* och lanseringsinlägget från 2020-09-29, via anteckningarna för lager 9 (lästa 2026-10-13).
- Cloudflare, *Zone Analytics*, via `BESLUT.md` 2026-10-16.
- EDPB riktlinjer 2/2023 och PTS, via samma anteckningar.

**Licens:** Tjänst, gratis. Dokumentationen är CC BY 4.0. Beaconen är Cloudflares skript.

**Vad det är:** Cloudflares gratis besöksstatistik. Den bygger på ett JavaScript-beacon i sidan, och Cloudflare skriver att den inte samlar besökarnas personuppgifter.

**Hur det fungerar:**
- **Mätning:**
  - Beaconen skickar mätvärden via webbläsarens Performance API.
  - Automatisk installation kräver att trafiken går genom Cloudflares proxy.
  - Egna händelser, som klick på `tel:`, stöds inte (*"Not yet"*).
- **Lagring:**
  - Rådata sparas i 7 dagar, och därefter aggregeras den till cirka 10 %.
  - Data visas för de senaste sex månaderna.
  - Frågor samplas dynamiskt.
- **Gränser:** cirka tio sajter per konto som mjukt tak.
- **Integritet:**
  - Cloudflare skriver att ingen klientlagring som cookies används för spårning (lanseringsinlägget).
  - FAQ:n säger inget om cookies eller GDPR.

**Kvalitet och underhåll:** En aktiv tjänst. Det finns inget repo.

**Det bästa vi kan ta:** Inget nu.
- Zone Analytics på Pro ger sidvisningar, besök, sidor och hänvisande sajter ur serverloggarna utan skript (`BESLUT.md` 2026-10-16).
- Det täcker rapportens behov.

**Var det hamnar hos oss:**
- Ingenstans. Beslut: **släpp**.
- `guide/2-8-teknik-och-kvalitet.md` [N3] tillåter Web Analytics bara bakom samtycke, eftersom EDPB 2/2023 punkt 33 räknar JavaScript som får webbläsaren att skicka data som åtkomst, och PTS räknar statistik som inte nödvändig.
- För kunder med samtycke finns GA4 som tillval.
- Skälet står i `drift/verktyg.md`.

**Passar vår stack?** Tekniskt ja. Men den lägger till ett skript på sidor som annars inte laddar något utifrån, och den kräver samtycke enligt vår läsning. Då behövs en samtyckesruta på sajter som annars inte har någon, vilket krockar med beslutet att sajter utan statistik inte har någon ruta (`BESLUT.md` 2026-10-16).

**Risker och flaggor:**
- Juridisk risk (tolkning, inte juridisk rådgivning).
- Cloudflare är en amerikansk leverantör.
- Kort historik på sex månader, så ögonblicksbilden behövs ändå.
- Inga egna händelser.
- Omprövas om EU:s undantag för egen publikmätning antas (rådets text 2026-10-02, via anteckningarna).

**Inloggning:** Dokumentationen är publik och läst. Instrumentpanelen kräver ett Cloudflare-konto. Det behövs inte, eftersom posten släpps.
