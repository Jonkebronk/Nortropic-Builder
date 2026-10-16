# cloudflare/mcp

**Källa:**
- https://github.com/cloudflare/mcp. Läst 2026-10-16:
  - README i sin helhet
  - commit-historiken, HEAD `e857379` från 2026-10-13
  - de 17 öppna ärendena
- Cloudflares dokumentation om tokens: *Create token* och *API token permissions*.
- MCP-adressen är `https://mcp.cloudflare.com/mcp`.

**Licens:** Apache-2.0. Licens- och NOTICE-text följer med vid spridning. Vi använder den hostade servern och sprider ingen kod.

**Vad det är:** Cloudflares officiella MCP-server för hela Cloudflare-API:t, med cirka 2 500 ändpunkter. Den ersätter de föråldrade domänservrarna i cloudflare/mcp-server-cloudflare. Med *Code Mode* skriver agenten JavaScript som söker i API-specifikationen och anropar API:t i en isolerad Worker, så att bara resultatet tar kontext.

**Hur det fungerar:**
- **Verktyg:** `search` (söker i specen), `execute` (anropar API:t), `docs` (söker i dokumentationen) och `whoami`.
- **Code Mode:**
  - Kostar cirka 1 100 tokens mot 244 000 för vanliga verktyg.
  - `?codemode=false` registrerar ett verktyg per ändpunkt.
  - Svaren kapas vid cirka 6 000 tokens, om inte `?truncateToolResult=false` sätts.
- **Autentisering:**
  - OAuth, där användaren klickar i behörigheter, eller en API-token som bearer.
  - Både användar- och kontotokens fungerar. En kontotoken behöver *Account Resources : Read* för att hitta kontot.
  - Tokens med IP-filter stöds inte.
- **GraphQL Analytics** går genom `execute`. Det är vägen till Zone Analytics för rapporten.
- **Skills:** servern levererar Cloudflares skills via MCP:s Skills-tillägg, synkat var sjätte timme.
- **Nytt i oktober 2026** (commits): Workers Issues som MCP Events via webhook (#246, #283). Experimentellt enligt tredjepartskälla ⚠️.

**Kvalitet och underhåll:**
- 962 ★, 146 commits, cirka 14 författare. Skapad 2026-01-29. 146 commits under 2026.
- 17 öppna ärenden, bland annat:
  - #202: OAuth med *DNS Read* kan inte lista DNS-poster.
  - #199: fel 10000 för Rulesets med Full Access.
  - #290: `execute` når tidsgränsen efter 300 sekunder.
  - #226: identitetsprov för tokens begränsas vid skala och förstärks av omförsök.
  - #204, #208 och #209: fel i hur resultat hanteras.
  - Inget ärende tar upp ett läsläge.

**Det bästa vi kan ta:**
- En kontoägd **läs-token per kund** för undersökning och rapport: *Account Analytics Read*, *Workers Scripts Read*, *Workers Tail Read*, *Account Settings Read*, zonens *Analytics Read* och *DNS Read*.
- GraphQL-exemplet i README för att hämta zonens statistik.
- Mönstret Code Mode: liten kontext.

**Var det hamnar hos oss:**
- Skillen `drift`: `publicering.md` (*Tokens*) och `verktyg.md`.
- Beslut: **MCP: kräver konto** (kundens Cloudflare-konto). Används när någon undersöker. Schemalagda kontroller och rapportens hämtning är skript (`guide/2-9-drift-och-forvaltning.md`).

**Passar vår stack?** Ja. Allt hos oss ligger hos Cloudflare. Inget behöver översättas. Det som krävs är en token per kundkonto.

**Risker och flaggor:**
- **Inget eget läsläge.** Det är token som begränsar. Med OAuth får agenten det som klickas i, så använd token för agenter.
- Agenten får aldrig publicerings- eller DNS-token (`drift/SKILL.md`, *Förbud*).
- De levererade Cloudflare-skillsen krockar med regeln att inga tredjepartsskills används i kundbygget (`guide/bilaga-a-verktyg.md`). Använd inte deras innehåll okritiskt.
- Servern drivs av Cloudflare, så API-svaren passerar en tredje parts hostade tjänst. Den tjänsten är dock samma leverantör som sajten.
- Ingen telemetri är beskriven ⚠️.

**Inloggning:**
- README och kod är publika och lästa.
- För att använda servern krävs ett Cloudflare-konto och en token. Johnny skapar den i kundens konto vid första riktiga kund.
