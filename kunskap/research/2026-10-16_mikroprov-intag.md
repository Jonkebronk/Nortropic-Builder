# Mikroprov: intagsmallen för MCP-servrar (översynens punkt 16)

**Datum:** 2026-10-16, natt. **Uppdrag:** punkt 16 i översynen (`kunskap/research/2026-10-16_verktyg-och-skills-full-potential.md`): intagsmallen från MCP-provet i `larande/bevakning.md`. **Metod:** `.claude/skills/larande/skills.md`, *Mikroprov av formuleringen*, med kontrollen först. Uppgiften var en provplan för en ny MCP-server, utan installation eller körning.

**Felet** (skrivet före svaren): planen läser inte serverns hela uppsättning (verktyg, promptar, resurser och instruktioner) innan provet läggs upp, utan prövar ett urval. Det var felet med 21st: provet täckte 2 av 51 verktyg.

## Utfallet

| Prov | Kandidat | Kontrollen | Ny text |
|---|---|---|---|
| T1 | Context7 | räknas inte | – |
| T2 | BrowserTools MCP (`AgentDeskAI/browser-tools-mcp`) | **4 av 5** | **0 av 5** |

- **T1 var dåligt vald.** Context7 hade redan domen *släpp* (17.40) och ett källkort med verktygslistan. Det missades eftersom sökningen gällde "MCP" i namnet. Alla fem agenter började med att domen redan fanns.
- **T2, kontrollen:** tre svar lade upp fallen efter README och lät verktygslåset spara listan utan genomgång. Ett skrev fallen innan låset kördes. Ett läste promptarna i källan och körde låset innan fallen, och räknades som rätt. Med en mild läsning, där det räcker att låset körs före fallen, vore kontrollen 1 av 5. Låset läser `initialize` och `tools/list`, alltså inte promptar och resurser (`skript/mcp-verktygslas.py`).
- **T2, ny text:** alla fem läste källkoden för verktygen, promptarna och resurserna innan provet (16 verktyg, 3 promptar, 5 resursmallar, inga serverinstruktioner), ställde varje verktyg mot det vi har och tog fallen ur listan.

## Den nya raden

`larande/bevakning.md`, sist under *Före domen*: en MCP-server läses hel innan provet läggs upp, med verktyg, promptar, resurser, instruktioner och flaggor, ur källkoden eller med verktygslåset. Listan står i källkortet, och fallen väljs ur den. Nyttokriteriet, facit ur en primärkälla och anrop och kB per arm skrivs före första körningen.

## Fakta om BrowserTools MCP, ur svaren (overifierat av huvudsessionen ⚠️)

- MIT, omkring 7 300 stjärnor, en underhållare. 2.0 är en omskrivning efter en kritisk sårbarhet i 1.x (GHSA-xvrv-w8pg-f25f). En SSRF i Lighthouse-verktygen (GHSA-fm7v-38h4-4q7w) är rättad i 2.0.3 på GitHub men inte på npm, där 2.0.2 ligger.
- Den kräver ett uppackat Chrome-tillägg med behörigheten `debugger` och öppna DevTools. Det enda nya mot Chrome DevTools- och Playwright-MCP:n är `getSelectedElement`.
- Servern finns inte i inventeringen. Ingen dom är föreslagen; den var bara ett provfall.

**Avvikelse:** en agent i den nya armen försökte anropa Artifact-verktyget, som uppgiften inte bad om. Anropet avvisades i valideringen, och inget publicerades.

## Kostnad

15 körningar (T1 5, T2 kontroll 5, T2 ny 5), cirka 1,6 miljoner token.
