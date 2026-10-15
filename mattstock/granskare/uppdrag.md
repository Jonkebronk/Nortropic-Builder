# Uppdraget till granskaren

Mallen för uppdraget till en granskare i en mätning (`../../guide/3-2-granskning-och-kalibrering.md`). Checklistan står i `../../mallar/granskning.md`. Varje granskare är en delagent med ren kontext och får sju eller åtta sajter. Rättad 2026-10-16 efter förbehåll 1 i `matning-2026-10-15.md` (`../../BESLUT.md` 2026-10-16).

## Bilderna

Fångsten i `../verktyg/fanga.js` ger tre bilder per sajt:

| Fil | Innehåll |
|---|---|
| `<id>-m.jpg` | **Hela startsidan i mobil**, 390 punkter bred i dubbel upplösning (780 px), avklippt vid 9 000 px. Mobilens första skärm är de översta 844 punkterna, alltså 1 688 px |
| `<id>-d.jpg` | Datorns första skärm, 1280 × 800 px |
| `<id>-hel.jpg` | Hela startsidan på datorn, 1280 px bred, avklippt vid 7 000 px |

Helsidesbilder tas i dubbel upplösning. Chromium klipper skärmbilder över 16 384 px, och en mobilsida i trefaldig upplösning når den gränsen.

Fasta element, som ett sidhuvud eller en knapplist, kan synas på fel ställe i en helsidesbild. Innehåll som laddas vid scroll kan saknas.

## Texten

> Du är granskare. Läs först din roll och checklista i filen `<repo>/mallar/granskning.md` och följ den exakt. Läs inga andra filer i repot (särskilt inget i mattstock/, guide/ eller sites/), och sök inte på webben. Du dömer bara utifrån checklistan, exemplen i den och skärmbilderna nedan.
>
> Döm sajterna i den ordning de står. För varje sajt: titta först på mobilens första skärm, de översta 1 688 pixlarna i `<id>-m.jpg`. Titta sedan på datorns första skärm i `<id>-d.jpg` och sist på resten av mobilsidan och datorsidan i `<id>-hel.jpg`. Beskär de höga bilderna i delar, i en egen katalog, så att texten går att läsa.
>
> Sajterna (id: namn, bransch, ort, adress):
> - `<id>`: `<namn>` (`<bransch>`, `<ort>`) `<url>`
>
> Bilderna ligger i katalogen `<katalog>` och heter `<id>-m.jpg` (hela mobilsidan, 390 punkter bred i dubbel upplösning), `<id>-d.jpg` (datorns första skärm) och `<id>-hel.jpg` (hela datorsidan).
>
> Ditt slutsvar ska innehålla, i den här ordningen:
> 1. Tröskelhypotesen (högst fem rader).
> 2. För varje sajt: omdömet i checklistans form (dom, avgörande, för godkänt eller det som gör den bra, spelar ingen roll) och den maskinläsbara JSON-raden på en egen rad.
> 3. Sammanfattningen i tre rader.
> Skriv på svenska.

## För Nortropics egna sajter

Granskaren får också `brief.md`, `fakta.md`, `sidkarta.md`, sajtens `design.md` och stilkitets `design.md`, men inte `domar.jsonl` eller `progress.md`. Bilderna tas av alla sidor i mobil (375 px), på datorn (1280 px) och som hela sidan i mobil, i dubbel upplösning. Svaret följer avsnittet *För Nortropics egna sajter* i checklistan. Exemplet är `sites/<sajt>/granskning-steg4.md` i den första övningssajten.
