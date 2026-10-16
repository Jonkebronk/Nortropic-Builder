# Innehållsinventering vid ombyggnad

Delfil till `omfattning`, spår B. Regeln att allt inventeras, förs in i `sites/<namn>/befintlig/urler.md` och får ett beslut står i `guide/2-2-omfattning.md`, *Spår B*. Här står schemat och var adresserna finns.

## Inventering och revision är två steg

Inventeringen är en lista över allt innehåll, per sida eller per fil. Revisionen bedömer kvaliteten och ger varje rad ett beslut. Ett kalkylark fungerar bäst. Crawlers och export kan göra listan, men bedömningen görs bäst av människor. 📄 Anna Kaley, [Content Inventory and Auditing 101](https://www.nngroup.com/articles/content-audits/), NN/g 2020-09-27.

## Schemat för `befintlig/urler.md`

NN/g:s attribut med det flytten och faktabasen behöver.

| Kolumn | Innehåll | Källa |
|---|---|---|
| Adress | Sökvägen, med och utan snedstreck om båda svarar | crawl |
| Status i dag | 200, 301 till vad, 404 | crawl |
| Titel och h1 | Som på sidan | crawl |
| Ämne och format | Tjänst, om, kontakt, nyhet, pdf, bild | revision |
| Datum | Senast ändrad, om sidan säger det | crawl eller CMS |
| Funnen i | Sitemap, crawl, interna länkar, Search Console, arkiv, bakåtlänkar | inventering |
| Trafik och länkar | Klick och visningar ur Search Console, bakåtlänkar, om det finns | Search Console, länkdata |
| Fakta på sidan | Det som blir förslag till faktabasen, märkt *sett* | revision (→ `guide/2-7-innehall.md`) |
| Beslut | Behåll, uppdatera, slå ihop med, ta bort | revision |
| Ny adress eller skäl | Målet för 301, eller varför den ska ge 404 | revision |

NN/g: titel, adress, ägare, ämne, format, datum, metadata och var filen ligger; beslutet behåll, uppdatera eller ta bort, och en ägare för varje rad som ska uppdateras. *Slå ihop* är Googles fall när innehåll konsolideras (📄 Google, *Site moves with URL changes*).

## Var de gamla adresserna finns

Börja med de viktiga adresserna. 📄 Google, [Site moves with URL changes](https://developers.google.com/search/docs/crawling-indexing/site-move-with-url-changes), uppdaterad 2026-08-20.

1. **Sajtens sitemaps**, också äldre och sitemap-index. En gammal sitemap kan ha adresser som inte längre länkas.
2. **En crawl** från startsidan, med de interna länkarna.
3. **Search Console**: sidor med klick och visningar och länkrapporten, när kunden gett åtkomst (→ `verktyg.md`, mcp-gsc).
4. **Analys och serverloggar**: de mest besökta adresserna.
5. **CMS-listan**, när kunden kan exportera den.
6. **Inbäddat innehåll**: bilder, pdf:er och filer som andra sajter, Google-profilen eller sociala medier länkar till. Google säger att det ska med i flyttplanen.
7. **Arkiv och bakåtlänkar** för adresser som försvunnit ur sitemaps men fortfarande länkas: Wayback Machine via crawl4ai:s `DomainMapper`, eller en länkdatabas (→ `verktyg.md`).
8. **Kundens egna länkar**: Google-profilens webbplats och bokningslänk, Facebook, Instagram, kataloger och trycksaker med QR-kod. De byts av kunden (→ *Kundens lyft*).

## Beslut per sida

- **Behåll:** samma adress om möjligt. Samma adress behöver ingen omdirigering.
- **Uppdatera:** innehållet skrivs om ur faktabasen (→ skillen `innehall`). Adressen behålls eller får en 301.
- **Slå ihop:** flera sidor blir en. Varje gammal adress får en 301 till den nya.
- **Ta bort:** sidan ger 404. Skälet skrivs, eftersom en sida med trafik eller länkar som tas bort är ett beslut (→ `guide/2-2-omfattning.md`, *Hur självgående*).

Gammalt innehåll är förslag till faktabasen, märkt *sett* med sida och datum. Kunden bekräftar varje faktum. Bilder får källa och licens innan de används (→ `guide/2-7-innehall.md`).

## Kartlägg och observera

Ur JCodesMore/ai-website-cloner-template, metoden flyttad från Next.js till inventering inför en ombyggnad i Astro. 📄 [`clone-website/SKILL.md`](https://github.com/JCodesMore/ai-website-cloner-template/blob/main/.agents/skills/clone-website/SKILL.md) (MIT, commit `ee3f5a2`).

- **Karta från gammal adress till ny**, med en ägare per sida. Det är omdirigeringskartan i början.
- **Observera före bygget:** öppna varje sida i dator- och mobilbredd, scrolla så att allt laddas och pröva menyer, flikar, formulär och de viktigaste länkarna. Spara skärmdumpar märkta med bredd och tillstånd.
- **Läs de faktiska värdena** (beräknade stilar, filerna sidan laddar) i stället för att gissa ur en bild. Kundens färger och typsnitt läses så (→ `guide/2-5-yta.md`).
- **Jämför i samma bredd och tillstånd** efter bygget: varje sida i den gamla kartan har en motsvarighet, varje kontaktväg fungerar och inget innehåll som skulle behållas saknas.

Det som inte tas in: att återskapa den gamla designen och att bygga i Next.js. Mallens README säger själv att logotyper, varumärken och originaltexter tillhör sina ägare.

## Integrationer

→ `guide/2-2-omfattning.md`, *Integrationer, spårare och formulärmottagare* (N2). Kontrollera skript och nätverksanrop med Playwright. Resultatet förs in i `befintlig/integrationer.md`, och spårarna blir underlag till samtycket och integritetspolicyn.

## Före-mått

→ `guide/2-2-omfattning.md`, *Före-mått*. Mät innan den gamla sajten stängs, eftersom det inte går efteråt:

- förfrågningar, samtal och bokningar per månad, och var de räknas
- de mest besökta sidorna och sökfraserna ur Search Console
- antalet indexerade sidor
- prestanda på mobil för de viktigaste sidorna

Måttet är nordstjärnans baslinje (→ skillen `strategi`) och förvaltningens jämförelsepunkt (→ `guide/2-9-drift-och-forvaltning.md`).
