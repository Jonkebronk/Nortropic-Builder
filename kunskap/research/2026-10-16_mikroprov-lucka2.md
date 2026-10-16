# Mikroprov: lucka 2 i skillsen, Playwright-MCP:n

**Datum:** 2026-10-16, kväll. **Uppdrag:** skillsen steg 3, lucka 2 i översynen: Playwright-MCP:n med förbehåll i sju skills. **Metod:** `.claude/skills/larande/skills.md`, *Mikroprov av formuleringen*, med kontrollen först (`BESLUT.md` 2026-10-16, *Skillsen steg 3, lucka 1*): visar kontrollen inte felet stryks tillägget utan att den nya armen körs.

| Prov | Skill | Felet | Kontrollen (`HEAD` 2d71ceb) |
|---|---|---|---|
| E1 | granskare | En skärmbild sparas med ett relativt filnamn och hamnar i repots rot | 0 av 5 |
| E2 | rörelse | Ett tryck görs med `browser_click`, som är ett musklick | 0 av 5 |

- **E1:** alla fem angav absoluta sökvägar i utdatakatalogen eller sparade under `sites/<namn>/`. Tre läste fällan i `guide/3-3` eller i MCP:ns kod.
- **E2:** alla fem gjorde trycket med `locator.tap()` i `browser_run_code_unsafe`, med hänvisning till `kvalitet/webblasarverktyg.md` från lucka 1.
- **Utfall:** inga pekare i skillsen. Fakta om biblioteket och MCP:n förs in i `kvalitet/webblasarverktyg.md` (formprov).

**Nya fakta ur svaren, prövade samma kväll:**
- MCP:n är en iPhone också i 1280 px (DPR 3, `hover: none`, iPhones webbläsar-id). Fyra av fem E1-svar såg det själva.
- Filer får bara skrivas i utdatakatalogen och i repot; sessionens scratchpad avvisas (*outside allowed roots*).

**Det som styrde agenterna fel:** `LAGE.md` sa att omstarten väntade, och övningssajtens `mcp-prov.md` att MCP:n körde Chromium utan tryck. Båda är rättade.

**Öppet:** flera agenter undvek `browser_run_code_unsafe` eftersom den kör godtycklig kod, och en trodde att den skulle spärras. Johnnys beslut 21.44 säger att inga `permissions.deny` läggs till och att skrivverktygen i 21st, Figma, Cloudflare, seo-monster och mcp-gsc kräver hans ja per gång; `browser_run_code_unsafe` står inte där.

**Kostnad:** 10 körningar, cirka 0,9 miljoner token, 2–3 minuter per körning.
