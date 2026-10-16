# Underlaget

Vad granskaren behöver se. Domen kräver bara bilderna i `mattstock/granskare/uppdrag.md`. Premiumpasset kräver mer, eftersom finish, rörelse och gränssnittsfel syns i tillstånd och i rörelse, inte på en helsidesbild.

## Till domen

Som i `mattstock/granskare/uppdrag.md`: `<id>-m.jpg` (hela mobilsidan, 390 punkter bred i dubbel upplösning), `<id>-d.jpg` (datorns första skärm, 1280 × 800) och `<id>-hel.jpg` (hela datorsidan). Fångstskriptet är `mattstock/verktyg/fanga.js`.

- **Dubbel upplösning, inte trefaldig.** Chromium klipper skärmbilder över 16 384 px, och en hög mobilsida i trefaldig upplösning når gränsen (`LAGE.md`, *Verktyg i repot*).
- **Fasta element** som sidhuvud och knapplist kan hamna fel i en helsidesbild. Döm deras läge på bilder av fönstret efter scroll, inte på helsidesbilden.
- **Samtyckesrutan** stängs före fångsten, så att den inte skymmer förstavyn. På övningssajterna görs det med ett sparat svar i `localStorage` innan sidan laddas. Rutan granskas för sig (PG6).

## Till premiumpasset

| Vad | Hur | Kriterier |
|---|---|---|
| Varje sida i 375, 768 och 1280 px, sektion för sektion (`guide/3-2`, N1; `BESLUT.md` 2026-10-16, *Motsägelserna i skillsen*) | Helsida i dubbel upplösning, beskuren i delar om cirka 900 px höjd | PU2, PF1–PF8, PS, PG4 |
| Den primära handlingen och varje toppuppgift i mobilen | Fönsterbild per steg i 375 × 667, länkens mål (`href`, ny flik eller inte) och fokus efter varje steg. Externa länkar följs inte | PU1 |
| Rubrikerna | Sidans `h1` och `h2` som text, i dokumentets ordning, utan dolda element som en stängd samtyckesruta | PU3 |
| Startsidan och en undersida i 320, 768, 1024 och 1440 px, och liggande mobil (844 × 390) | Fönsterbilder | PF5, PG5 |
| Menyn öppen på mobilen, och fokus efter Tab, Shift+Tab och Escape | Fönsterbilder per steg, med `document.activeElement` utskrivet | PG2 |
| Fokus genom hela sidan med knapplisten synlig | Tab tills sidfoten; för varje steg: syns det fokuserade elementet helt | PG1, PF9 |
| Hover och tryck på den primära knappen på datorn | Fönsterbild före, under och efter | PF9 |
| Ankarlänkar och "hoppa till innehåll" | Fönsterbild efter hoppet | PG1 |
| Samtyckesrutan, kartan före klick, 404 | Fönsterbilder | PG6 |
| Rörelse | Video i normal och snabb scroll, mobil och dator, med och utan `reduce` (Playwright `recordVideo`, `reducedMotion: 'reduce'`) | PR1–PR8 |
| Mätvärden | Beräknade stilar ur den körande sidan: teckenstorlekar, tecken per rad, avstånd mellan rubrik och innehåll, radier, transitions och animerade egenskaper, tryckytornas storlek | PF1–PF4, PF7, PR4–PR5, PG3 |

Förhandsvisningen är en statisk kopia av `dist/`. Granskaren läser i den och skickar ingenting utåt.

## När underlaget saknas

Ett kriterium utan sitt underlag får utfallet `för lite information`, med vad som saknades, till exempel "ingen video med `reduce`". Huvudsessionen skaffar underlaget eller frågar Johnny (→ `guide/3-2`, *Checklistan fylls i som markdown*).

**I dag** fångar `fanga.js` bara domens tre bilder. Tillstånden, videon och mätvärdena tas för hand med Playwright tills ett fångstskript för premiumpasset finns. Det är en kandidat till ett låst skript när det gjorts för hand tre gånger (→ `guide/3-4-larande-och-underhall.md`, *Kod som skrivs om i varje bygge*).
