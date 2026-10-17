# Nortropics enkät

Riktiga människor väljer vilken sajt de hellre skulle boka hos, via en länk i ett sms eller i WhatsApp. Grunden är `BESLUT.md` 2026-10-17, *Riktiga människor dömer sajten, med en enkel enkät*, och rapporten `kunskap/research/2026-10-17_granskningsrad-och-processen.md`, förslag F1 och F3.

## Så fungerar det

1. **Bilderna.** Claude tar bilderna av första vyn i mobil med `node skript/enkat-bilder.mjs`. Det kan vara vår sajt, kundens gamla sajt eller en lokal konkurrent. Varje sajt får en neutral etikett, Sajt X eller Y. Vilken som är vår står bara i `enkat.json`.
2. **Uppladdningen.** Claude laddar upp `enkat.json` och bilderna till en undermapp i Drive-mappen **Nortropic enkäter**, via Drive-kopplingen och med Johnnys ja.
3. **Formuläret.** Johnny öppnar webbappen (ett bokmärke) och trycker **Skapa enkäten**. Skriptet `Kod.gs` gör då följande:
   - skapar ett Google-formulär med en bild per alternativ, i blandad ordning för varje person, så att placeringen inte avgör
   - lägger till frågan *Varför?* och frågan *Har du sett någon av sajterna förut?*, för bekanthetens skull
   - publicerar formuläret för alla med länken och samlar inte in några e-postadresser
4. **Utskicket.** Johnny kopierar den färdiga texten med länken till sms eller WhatsApp.
5. **Svaren.** Svaren hamnar i ett kalkylark i samma mapp, och Claude läser dem via Drive-kopplingen. Claude redovisar *X av N* med konfidensintervall och skälen med svararnas egna ord.
6. **Stängningen.** **Stäng enkäten** slutar ta emot svar och slutar dela bilderna.

**Hur många svar behövs:**
- 5–10 svar ger skälen.
- För att visa att en sajt verkligen föredras krävs 9 av 10 eller 15 av 20 som väljer samma (binomialtest, p < 0,05).

**Bilderna är privata.** I övningssajterna får de bara visas i en sluten krets: personer som inte känner firman (Johnny 2026-10-17). Texten i utskicket ber svararna att inte sprida dem.

## Engångsinställning (Johnny, cirka fem minuter)

Skriptet körs i ditt eget Google-konto som en webbapp som bara du kommer åt. Det finns ingen öppen adress, och det behövs ingen nyckel.

1. **Skapa projektet.**
   - Öppna https://script.google.com och välj **Nytt projekt**.
   - Döp om det till *Nortropic enkäter*.
2. **Lägg in manifestet.**
   - Gå till **Projektinställningar** (kugghjulet) och kryssa i **Visa manifestfilen "appsscript.json" i redigeraren**.
   - Ersätt innehållet i `appsscript.json` med filen här i katalogen.
3. **Lägg in koden.** Ersätt innehållet i `Kod.gs` med filen här i katalogen och spara.
4. **Skapa mappen.** I Google Drive skapar du mappen **Nortropic enkäter**, om Claude inte redan har gjort det.
5. **Distribuera.**
   - Välj **Distribuera → Ny distribution**.
   - Välj typen **Webbapp**.
   - Ställ in **Kör som: Jag** och **Vem har åtkomst: Bara jag**.
   - Tryck **Distribuera**.
6. **Godkänn behörigheterna.** Google varnar att appen inte är verifierad, eftersom det är ditt eget skript. Välj **Avancerat → Gå till Nortropic enkäter** och godkänn. Behörigheterna är:
   - formulär
   - Drive
   - kalkylark
   - anrop till Googles API:er
7. **Bokmärk adressen.** Bokmärk webbappens adress, den som slutar på `/exec`. Den sidan visar alla test.

Ändras koden distribuerar du en ny version under **Distribuera → Hantera distributioner**. Adressen är densamma.

## Källor

Alla lästa 2026-10-17:
- Forms API, REST Resource: forms: `ChoiceQuestion.shuffle` och `Option.image`, och att formulär som skapas med API:t är opublicerade från början efter 30 juni 2026.
- Forms API, *Publish and manage responders*: `setPublishSettings`, och Drive-behörigheten `anyone` med `view: published`.

**Prövas vid första körningen:** att Forms kan hämta bilden från Drive med en delad länk (`sourceUri`). Dokumentationen säger inget om det.
