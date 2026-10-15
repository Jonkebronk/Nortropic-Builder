# Kartan

Hur en webbyrå bygger och förvaltar en hemsida, uppdelat i kundens väg och nio lager, plus flödet ovanpå. Varje lager har en fil med samma fem frågor: vad byrån gör, vad som kommer ut, var kompetensen kommer ifrån, hur resultatet kontrolleras och hur självgående steget kan vara.

## Riktningen

Claudes sammanfattning av samtalen 13 oktober. Johnnys egna ord står i `BESLUT.md`, och där kartan skiljer sig från implementeringsguiden står det i `LAGE.md`.

- Samma vision, omvänd ordning: först en sajt Johnny är stolt över, sedan byrån och sist maskinen.
- Förvaltningen är produkten. En sajt byggs en gång men förvaltas varje månad för varje kund.
- AI:n väljer inom ett system som byggs en gång: ett sektionsbibliotek och 3–5 stilkit. De tre riktningarna kunden får se är tre stilkit på samma innehåll.
- Varje steg är en loop med en kontroll, och designen bedöms av en separat bedömare som kalibreras på Johnnys egna domar.

## Kundens väg

Johnnys karta (`BESLUT.md`, 2026-10-13):

1. Intervjun ger kundunderlaget.
2. Research.
3. Tre riktningar.
4. Kunden väljer.
5. Bygget.
6. Johnnys granskning.
7. Lansering, SEO och resten.

Därefter förvaltningen, varje månad, som är det kunden betalar för (`BESLUT.md`, nischen).

Claudes förslag samma dag, inte beslutade: Johnny ser de tre riktningarna innan kunden gör det, i första varvet svarar en människa som känner verksamheten på intervjun, och tiden för varje steg mäts.

## De nio lagren

Lager 1–5 följer Jesse James Garretts fem plan i *The Elements of User Experience*. Lager 6–9 är det en webbyrå också levererar. Lager 4 och 5 byggs enligt Brad Frosts *Atomic Design*: tokens, komponenter, sektioner, mallar och sidor.

| Lager | Status | Fil |
|---|---|---|
| 1 Strategi | Genomgånget 2026-10-13 | `1-strategi.md` |
| 2 Omfattning | Genomgånget 2026-10-13 | `2-omfattning.md` |
| 3 Struktur | Genomgånget 2026-10-13 | `3-struktur.md` |
| 4 Skelett | Genomgånget 2026-10-13 | `4-skelett.md` |
| 5 Yta | Utkast ur rapporten | `5-yta.md` |
| 6 Rörelse | Utkast ur rapporten | `6-rorelse.md` |
| 7 Innehåll | Utkast ur rapporten | `7-innehall.md` |
| 8 Teknik och kvalitet | Utkast ur rapporten | `8-teknik-kvalitet.md` |
| 9 Drift och förvaltning | Utkast ur rapporten | `9-drift-forvaltning.md` |
| Flödet, lagret ovanpå | Utkast ur rapporten | `flodet.md` |

## Kompetensen delas i tre

- **Egen skill:** kunskapen, destillerad ur metoder, litteratur och externa skills. En skill per lager.
- **Eget bibliotek:** materialet, alltså sektioner, komponenter, stilkit, rörelser och mallar.
- **Åtkomst vid kundbygget:** API:er och MCP:er mot Google, Cloudflare och register.

Externa skills och MCP:er används när skillen och biblioteket byggs (`BESLUT.md`, egna skills och bibliotek).
