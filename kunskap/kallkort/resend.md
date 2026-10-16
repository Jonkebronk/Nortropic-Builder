# resend

**Källa:** tjänsten Resend (https://resend.com) och dess öppna delar. Allt läst 2026-10-16.
- **Tjänsten:** [priser](https://resend.com/pricing), [Acceptable Use Policy](https://resend.com/legal/acceptable-use) och [skillnaden mellan transaktions- och marknadsföringsmejl](https://resend.com/docs/knowledge-base/what-sending-feature-to-use). DPA och regioner står i `kunskap/research/2026-10-14_dataoverforing-och-analys.md` §3.3 (DPA uppdaterad 2025-12-31).
- **https://github.com/resend/resend-mcp,** commit `9bfb699` (2026-10-14), `package.json` 2.26.2 och npm 2.26.1 (2026-10-14). Lästa filer: `README.md` (hela, 545 rader), `CHANGELOG.md`, `email.md`, `package.json`, listan över `src/tools/` och en sökning efter verktyg med bara läsrätt och efter telemetri.
- **https://github.com/resend/resend-skills,** commit `fd14937` (2026-10-15). Lästa filer: `README.md`, `skills/email-best-practices/SKILL.md` och delfilerna `accessibility.md`, `compliance.md`, `transactional-emails.md` och `deliverability.md` samt början av `skills/resend/SKILL.md` (frontmatter). Inte lästa i sak: `react-email`, `resend-cli` och `agent-email-inbox` (cirka 12 000 rader), eftersom vi inte använder React Email eller inkorgen ⚠️.

**Licens:**
- Tjänsten styrs av Resends användarvillkor och DPA.
- `resend-mcp` och `resend-skills` har MIT, © Resend. Licenstexten följer med om kod eller text kopieras.

**Vad det är:** en amerikansk e-posttjänst med API för transaktionsmejl (enskilda och i batch), marknadsföringsmejl (Broadcasts), mottagning, mallar, kontakter och webhooks. Inventeringsposten gäller webb-pros användning, *"Mejlutskick till prospekt"*. I guiden är Resend standard för formulärmejl (`guide/2-8-teknik-och-kvalitet.md`, N2) och för formulärtest och rapportutskick (`2-9`, N3).

**Hur det fungerar:**
- **Priser:**
  - Free: 3 000 mejl i månaden, högst 100 per dag, 3 domäner och 30 dagars lagring.
  - Pro: 20 dollar i månaden för 50 000 mejl.
  - Marknadsföringsmejl prissätts per kontakt (gratis upp till 1 000). Bara månadsbetalning.
- **Regioner:** sändning kan ske från Irland, men *"All account data, including email metadata, logs, and API records, is stored in the United States"* (researchen §3.3). Resend är certifierat enligt DPF, och DPA:n har standardavtalsklausuler.
- **Acceptable Use Policy:** *"All mail must be sent to recipients who have explicitly opted in"*, *"Sending to unsolicited recipients is not permitted on Resend"*, och regeln om spam omfattar *"cold outreach, purchased lists, or scraped contact data"*.
- **resend-mcp:**
  - Hostad på `https://mcp.resend.com/mcp` med OAuth, eller lokal via `npx resend-mcp` med `RESEND_API_KEY`.
  - 133 verktyg för mejl, inkorgar, mallar, kontakter, broadcasts, automationer, domäner, suppressioner, API-nycklar, webhooks, loggar (med fulla anrop och svar) och användning.
  - Bara ett fåtal verktyg är märkta `readOnlyHint`, och det finns inget läge med bara läsrätt eller filter för verktyg.
  - `--allowed-file-dirs` begränsar bilagor från disken. README varnar för att en agent som utsätts för promptinjektion kan bifoga filer.
- **resend-skills:** fem skills (`resend`, `agent-email-inbox`, `resend-cli`, `react-email`, `email-best-practices`), och pluginet registrerar Resends hostade MCP.

**Kvalitet och underhåll:**
- `resend-mcp`: 576 stjärnor, 90 forkar och omkring 28 bidragsgivare. 1 ärende är öppet (Renovates beroendeöversikt). Aktivt, med flera releaser i veckan.
  - `CHANGELOG.md` har inte uppdaterats sedan 1.1.0 (2025-07-08), så ändringsloggen går inte att lita på.
  - Stängda ärenden visar typiska API-glapp: #161 (avsändare med visningsnamn avvisades), #192 (publicering av mallar) och #231 (ChatGPT-pluginet saknar `headers` och `idempotencyKey`).
- `resend-skills`: 202 stjärnor och omkring 12 bidragsgivare. Bland stängda ärenden finns #98 (tre fel i `resend` och `agent-email-inbox`) och #144 (två tabeller över SDK-versioner säger emot varandra).
- `email-best-practices` är synkad från resend/email-best-practices, version 1.0.2.

**Det bästa vi kan ta:**
- **`email-best-practices/references/accessibility.md` för bekräftelsemejlet** (`2-8`, N2, *mejlsäker HTML*):
  - `lang` och `dir` både på `<html>` och på `<body>`s direkta barn, eftersom klienter tar bort dem från `<html>`
  - `role="presentation"` på layouttabeller
  - en `<h1>`, och länktext som beskriver målet
  - `alt=""` på dekorbilder men aldrig på länkade bilder
  - `<title>` som ämnesraden.

  Allt är mekaniskt kontrollerbart och kan bli en kontroll av mejlmallen.
- **`transactional-emails.md`:** konkret ämnesrad med identifierare, förhandstext under 90 tecken, en kolumn, knappar på minst 44 × 44 px, inte `noreply@` utan en bevakad svarsadress, och avsändare på en underdomän.
- **`deliverability.md`:** SPF, DKIM och DMARC, där DMARC införs från `p=none` via `quarantine` till `reject`, plus kontrollen med `dig`. Det stämmer med guidens krav på SPF, DKIM och DMARC (`2-8`).
- **Att inte ta:** `compliance.md`. Den är amerikansk och kanadensisk och påstår att GDPR kräver *"explicit opt-in consent"* för marknadsföringsmejl. I Sverige styrs e-postreklam av marknadsföringslagen 19–20 §§ (se `utanfor-luckor.md`, L8).

**Var det hamnar hos oss:**
- Tjänsten: `senare: N2`, med formuläret (bilaga A, B71).
- Mejlreglerna ovan blir en delfil i den skill som äger formulär och mejl (lager 7 och 8), med källa.
- MCP: bara för formulärtest, med en nyckel per kund, som bilaga A redan säger. Den kräver konto, och det väntar på Johnny.
- Prospektutskick: aldrig via Resend (AUP).

**Passar vår stack?**
- Ja för formulär: Workern anropar API:t med `fetch` (`2-8`), utan SDK eller React.
- React Email (`react-email`) är tillåtet sedan BESLUT 2026-10-16 (*React, Tailwind och JavaScript tillåts*) men behövs inte. En mejlmall i HTML räcker.
- Svenska och Cloudflare: inga hinder. Cloudflares `send_email` är en otestad kandidat för aviseringen (`2-8`).

**Risker och flaggor:**
- **Dataöverföring:** metadata och loggar lagras i USA. Resend måste stå som underbiträde i biträdesavtalet (`2-2`, `2-9`).
- **Leverantörens villkor:** kalla utskick och köpta eller skrapade listor är förbjudna. Ett brott kan stänga kontot, och med det kundernas formulärmejl om de delar konto. Det talar för ett konto per kund (`2-9`, *nyckel per kund*).
- **Behörighet:** MCP:n har skrivrätt till allt, bland annat API-nycklar, utskick och loggar med hela mejlinnehåll. Den passar inte agenter utan Johnny, och regeln att ingen agent har nyckel till en utskickstjänst (C135) gäller.
- **Inloggning:** kontot och domänverifieringen kräver Johnnys inloggning. Claude.ai-connectorn för Resend är avstängd i byggsessionen (`kunskap/research/2026-10-15_mac-avgransning.md`, `disableClaudeAiConnectors`), och det är bra.
- **Betalvägg:** gratisnivån räcker för formulär hos småföretag (100 mejl per dag). Pro kostar 20 dollar i månaden.
- **Telemetri:** ingen hittad i `resend-mcp`. Klienten sätter bara en `User-Agent`. `npx skills add` för `resend-skills` har telemetri.
