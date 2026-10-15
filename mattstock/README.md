# Johnnys måttstock

**Status:** pågår sedan 2026-10-15. Johnny bedömer 39 sajter. Därefter skriver Claude måttstocken ur domarna och Johnny godkänner den.

## Vad den är och vad den används till

Måttstocken är Johnnys besked om vad som är en bra sajt (`BESLUT.md` 2026-10-15: *"Jag tänker vi bedömer 30-40 sidor som måttstock och kalibrering"*). Den används på två sätt:

1. **Som krav på bygget.** Det Johnny godkänner och underkänner, och varför, blir kriterier för de lager det gäller (`guide/2-5-yta.md`, `2-7-innehall.md` och andra). Ett kriterium som bara bygger på måttstocken är en instruktion och ingen grind, eftersom det har en enda källa (`guide/README.md`, *Grind eller instruktion*).
2. **Som märkta exempel för granskaren.** 10–20 % av domarna blir exempel i granskarens checklista och resten används för att mäta den. Måttet är andelen rätt godkända och rätt underkända var för sig (`guide/3-2-granskning-och-kalibrering.md`, *Kalibrering mot Johnnys smak*).

## Hur den tas fram

1. **Urvalet.** Claude valde ut sajterna (beslut 2026-10-15). En delagent tog fram 57 kandidater, och alla svarade med status 200 vid kontrollen. Av dem valdes 39 ut:
   - **24 svenska småföretag** i byråns tänkta kundgrupp: restaurang och café, hantverk, skönhet, klinik, konsult och butik. Kvaliteten är blandad.
   - **8 förebilder** för småföretag, ur Awwwards (7) och siteinspire (1).
   - **7 AI-byggda sajter** (Durable, Lovable, Wix AI). De ligger närmast systemets egna utkast. Kalibrering på andras sajter överförs inte automatiskt till egna utkast, vilket webb-pro visade (`3-2`).

   Urvalet har ungefär lika många sajter som Claude väntar sig blir godkända som underkända. Utan båda sorterna går det inte att mäta andelen rätt godkända och rätt underkända.
2. **Claudes förväntan registrerades före domarna.** Den ligger i `forvantan.json` med kategori, förväntan och motivering per sajt. Filen hålls utanför repot tills Johnny är klar, så att den inte påverkar domarna. SHA-256-summan av filen är `080a6338b064796d932e45118b03b3eafe32da3cb3f32efba0931560a8e0aa02`. Den visar att filen inte har ändrats i efterhand. Skillnaden mellan Claudes förväntan och Johnnys dom är i sig ett resultat: den visar hur långt AI:ns smak ligger från Johnnys.
3. **Skärmbilderna** visar hela startsidan i dator (1280 px bred) och i mobil (390 px bred). De fångades samma dag med Playwright, och kakbannern klickades bort när det gick. Johnny kan också öppna varje sajt live.
4. **Bedömningen** görs i en privat bedömningssida på claude.ai. Frågan är: *Hade du varit nöjd om Nortropic levererat den här sajten till en kund?* Johnny svarar godkänd eller underkänd och skriver en kort kritik med egna ord. Sidan visar varken förval, kategorier eller Claudes förväntan. Ordningen är blandad med ett fast frö.
5. **Måttstocken** skrivs ur domarna i `mattstock.md`. Johnnys kriterier står där med hans egna ord och vilka sajter som visar dem, tillsammans med skillnaderna mot Claudes förväntan. Johnny godkänner måttstocken innan den används.
6. **Domarna** sparas i `domar.jsonl` som kalibreringsdata.

## Gränser

- Domen gäller intrycket av startsidan. Hastighet, formulär, undersidor och rörelse syns inte på en stillbild.
- Förebilderna är utländska och inte typiska kunder. De visar vad Johnny räknar som bra, inte vad en kund kan förväntas betala för.
- 39 domar är ett underlag och inte en sanning. Kalibreringen görs om när Johnny ändrar uppfattning (`3-2`), och systemets egna utkast läggs till så fort de finns.

## Filer

| Fil | Innehåll |
|---|---|
| `README.md` | Den här filen: metoden |
| `urval.json` | De 39 sajterna: id, namn, adress, bransch och ort |
| `forvantan.json` | Claudes förväntan per sajt. Läggs till när Johnny är klar |
| `domar.jsonl` | Johnnys domar och kritik. Läggs till när Johnny är klar |
| `mattstock.md` | Måttstocken. Skrivs ur domarna |

Skärmbilderna finns i bedömningssidan och inte i repot. Repot är publikt, och bilderna visar andra företags sajter.
