# Opquast Digital Quality Framework v5

**Källa:** [checklists.opquast.com/en/digital-quality/](https://checklists.opquast.com/en/digital-quality/), version 5 (*"245 rules to improve your digital services - Version 5 - 2025-2030"*), hämtad med `curl` 2026-10-16. Alla 245 regeltitlar är lästa på sidan. Lästa i detalj i dag: regel 6, 105, 106, 128, 136, 210 och 231, [licenssidan](https://checklists.opquast.com/en/digital-quality/licence/) och [lanseringen av version 5](https://www.opquast.com/en/release-of-version-5-of-the-opquast-reference-framework/) (2025-10-02). Andra varvet läste detaljerna för cirka 95 regler (`andra-varvet/byggguider-jamforelse.md`, *Det jag inte hann*).
⚠️ Inte lästa: detaljerna för de flesta reglerna, utbildningen och certifieringens pris.

**Licens:** CC BY-SA 4.0. Licenssidan: *"If you remix, transform, or build upon the material, you must distribute your contributions under the same licence as the original."* Erkännande krävs, med länk till licensen och uppgift om ändringar. Repot är publikt och har ingen CC BY-SA-licens. Därför hänvisar vi till regelnummer och skriver egna regler med egna ord. Regeltexter, titlar och översättningar kopieras inte in (⚖️ tolkning, inte juridisk rådgivning: ett nummer och en egen regel är ingen bearbetning, en översättning är det).

## Vad det är
En fransk kvalitetslista för webbtjänster från Opquast SAS, som också säljer utbildning och certifiering. 245 regler i 14 ämnen: innehåll, e-handel, formulär, identifiering och kontakt, bilder och media, internationalisering, länkar, navigering, nyhetsbrev, personuppgifter, presentation, säkerhet, server och prestanda, struktur och kod. Varje regel har taggar som *Basics*, *Accessibility*, *SEO* och *Eco-conception*.

## Hur det fungerar
- Varje regel är en ja-eller-nej-fråga med motivering, mål, teknisk lösning och kontrollmetod. Adressen är `/en/digital-quality/<nummer>`.
- Version 5 tog bort två regler om länkars sammanhang, slog ihop två om simulerade tabeller och lade till åtta nya (lanseringen 2025-10-02).
- **Numren ändras mellan versionerna.** Opquasts egen 404-sida hänvisar 2026-10-16 till regel 216 och 218 för 404-sidan och menyn. I version 5 handlar 216 om adressfältet och 218 om `www`; 404-reglerna är 222–225. Skriv därför alltid "v5" vid numret.
- **Lokala tjänstesajter** nämns inte. Listan gäller alla webbtjänster. Regler om konton, e-handel, nyhetsbrev och publika ytor gäller sällan en sajt på 5–15 sidor.

## Kvalitet och underhåll
Utgivare: Opquast SAS. Version 4 kom 2020, och enligt lanseringen höll alla dess regler i fem år. Version 5 kom i oktober 2025 och anges gälla 2025–2030. Ingen offentlig ändringslogg utöver lanseringstexten. Den engelska texten har småfel (regel 136 har teckenresten `_ x000D_`).

## Det bästa vi kan ta
**Ett korsregister:** mappa `guide/bilaga-c-kontroller.md` mot v5-numren och se vad vi saknar. Andra varvet fann bland annat:
1. Utskrift (195, 196), besökta länkar (141), externa länkar märkta (142), favicon (104).
2. Datum för innehållet (6) och maskinläsbart datum (231). Opquasts lösning är `<time datetime>`, inte strukturerad data.
3. Två kontaktvägar (107), svarstid (108), öppettider och priser (109). Alla tre finns redan (`skelett/sektioner.md:35` och `:69`).
4. Organisationsnummer (106). Det finns redan: bolag visar numret i sidfoten och kontroll 6b rapporterar, men en enskild firma visar det inte, eftersom numret är ägarens personnummer (`BESLUT.md` 2026-10-16, *Företagsuppgifter som praxis*). Opquast undantar bara privatpersoner och räknar egenföretagare med; vår avvikelse är medveten.
5. Landsnummer på telefonnumret (128): *"Add the country code to each telephone number in the form +international code - telephone number."* `innehall/mikrotext.md:63` säger att formatet `tel:+46…` i länken saknar källa ⚠️. Den har en norm: RFC 3966 §5.1.4, *"Globally unique numbers are identified by the leading "+" character."*, och §5.1.5, *"Local numbers MUST have a 'phone-context' parameter"* ([RFC 3966](https://www.rfc-editor.org/rfc/rfc3966.html)).
6. Inklistring i fält (92), plustecken i e-post (24), sajten nås med och utan `www` (218, finns i `omfattning/flyttregler.md:53`).

**Rättelse till andra varvet:** Opquast 105 kräver inte adress och telefon *på* varje sida. Lösningen godtar en kontakt- eller Om-sida *"accessible directly from each page of the website"*. Regeln är alltså ingen andra källa till N1-regeln om kontakt på varje sida, bara till att kontakten ska nås från varje sida.

## Var det hamnar hos oss
**Beslutad:** kontroll (fältet `beslut`; Johnny 2026-10-16 omkring 17.40, *"Ja på alla"*). Opquast nämns i dag inte i `guide/` eller `.claude/skills/` (sökning 2026-10-16). `kvalitet/sakerhet.md:20` har redan `X-XSS-Protection: 0` eller inget, i linje med MDN och mot Opquast 210.

**Förslag till Johnny:** "kontroll" betyder här ett register, inte nya kontroller. Registret står som en kolumn med v5-nummer i `guide/bilaga-c-kontroller.md`. En lucka blir kontroll först när den har en norm eller två oberoende källor (`guide/README.md`, *Grind eller instruktion*); Opquast ensam räcker inte, eftersom det är en kvalitetslista och ingen norm.

## Passar vår stack?
Ja. Det mesta går att pröva med Playwright i DOM och med huvudkontrollen mot `_headers`. Serverreglerna (197–225) motsvarar Cloudflares inställningar och 404-sidan.

## Risker och flaggor
- **Regel 210 följs inte.** Den föreskriver `X-XSS-Protection: 1; mode=block`. MDN märker huvudet *Deprecated* och skriver att det *"can create XSS vulnerabilities in otherwise safe websites"*; CSP ersätter det ([MDN](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/X-XSS-Protection)).
- **Regel 128** vill ha landsnumret i det synliga numret. Vi visar det svenska skrivsättet och har `+46` i länken (`innehall/mikrotext.md:63`). Medveten avvikelse, ingen norm kräver det synliga.
- **Regel 64** vill ha länk till branschorganisation och märkning. Det krockar inte med beslutet *Företagsuppgifter som praxis* (`BESLUT.md` 2026-10-16), som gäller lagen och registret, men en länk från yrkestiteln är Johnnys val.
- **Licensen:** kopiera ingen regeltext till repot.
- **Numren:** en hänvisning utan version kan peka på fel regel.
- Utbildning och certifiering kostar pengar; listan är fri. Inget att installera.

## Inloggning
Inget.
