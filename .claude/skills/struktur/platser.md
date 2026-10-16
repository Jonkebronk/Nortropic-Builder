# Mottagningar, orter och serviceområde

Regeln står i guiden: standardsajten har inga ortssidor, serviceområdet visas som en sektion och i `areaServed`, och en ortssida görs bara när orten har eget innehåll, med Johnnys beslut (→ `guide/2-3-struktur.md`, *Ortssidor och serviceområde*). Här står skillnaden mellan en mottagning och en ort, vad en platssida ska innehålla och hur den prövas.

## Mottagning eller ort

- **En mottagning** är en plats där kunden tas emot, med adress och tider. Den är en verklig plats och får en egen sida med sin adress, sina tider och vägen dit; varje plats är en egen lokal verksamhet i den strukturerade datan med sidan som `url` (📄 Google, [LocalBusiness](https://developers.google.com/search/docs/appearance/structured-data/local-business); `BESLUT.md` 2026-10-16, kvalitetsgranskningen C1).
- **En ort i serviceområdet** är ett ställe dit företaget åker. Den listas i sektionen Serviceområde och i `areaServed` och får en egen sida bara med eget innehåll (→ guiden).
- **Doorway abuse** enligt Google: "pages targeted at specific regions or cities that funnel users to one page" och "substantially similar pages"; **scaled content abuse**: många sidor genererade med AI "without adding value for users" (📄 [spampolicyer](https://developers.google.com/search/docs/essentials/spam-policies)).

- **Googles frågor för dörrsidor** (Googles webspam-team 2015): riktas sidorna mot generiska sökord medan innehållet är mycket specifikt, duplicerar de samlingar av platser, och ligger de som en *ö* som är svår att nå från resten av sajten? En platssida länkas därför från startsidan, kontaktsidan och tjänstesidorna, inte bara från sitemapen ([An update on doorway pages](https://developers.google.com/search/blog/2015/03/an-update-on-doorway-pages)).
- **Google-profilens länk** går till platsens egen sida när företaget har flera platser: "Provide a website that represents your individual business location" ([Business links policies](https://support.google.com/business/answer/13769188)).

## Vad en platssida ska ha

En mottagningssida svarar på *var, när och hur kommer jag dit* för just den platsen och leder till handlingen där. 🔧 härlett ur standarduppsättningens besökarfrågor.

- Rubrik med tjänst och ort, och den primära handlingen för just den platsen (till exempel bokning med mottagningen förvald, om bokningssystemet kan det).
- Adress som text och länk till vägbeskrivning, dagar och tider, pris eller det besökaren behöver för att bestämma sig – **i mobilens första skärm eller direkt under knapparna**, inte bara i en sidokolumn på datorn.
- Det som bara gäller platsen: buss, parkering, våning och tillgänglighet, karta, foto av entrén när det finns, omdömen därifrån när det finns.
- Länk till den andra mottagningen och till behandlingarna, i mobilen likaväl som på datorn.
- Det som är lika på alla platser (behandlingarna) får länkas eller visas kompakt, inte upprepas i full längd.

## Bytestestet

**Går ortnamnet att byta mot ett annat utan att texten blir fel, är sidan en dörrsida.** Granskningskriterium med en källa (→ `guide/2-3-struktur.md`, N2; claude-seo `seo-local`, "RicketyRoo method", ⚠️ metoden och fallet med HVAC-företaget är inte verifierade). Testet stöds av Googles exempel "substantially similar pages".

Så används det i granskningen: byt ortnamn och adress mellan två platssidor och läs. Det som fortfarande stämmer är mall; det som blir fel är eget innehåll. En sida med bara mall stryks eller blir en rad i serviceområdet.

Inte från `seo-local`: varningsnivåerna vid 30 och 50 ortssidor (för höga för vår skala – en dörrsida kan uppstå redan vid två), "60–70 % unikt innehåll" (skillen erkänner själv att Google inte har någon gräns) och ordgränserna per sidtyp (📄 Google: "(No, we don't.)", [Creating helpful content](https://developers.google.com/search/docs/fundamentals/creating-helpful-content)).

## Företag utan besöksadress

- Ett företag som åker till kunden och inte tar emot på sin adress ska enligt Googles riktlinjer dölja adressen i Google-profilen; upp till 20 serviceområden anges som orter eller postnummer, och området ska som riktmärke ligga inom ungefär två timmars bilresa (📄 [Google Business Profile, riktlinjer](https://support.google.com/business/answer/3038177); [Manage your service areas](https://support.google.com/business/answer/9157481)).
- Sajten visar då ingen gatuadress, eftersom namn, adress och telefon ska stämma med profilen. Ort och postnummer räcker.
- Googles resultat för lokala verksamheter kräver `address` ("The physical location of the business"). Utan gatuadress får verksamheten troligen inte det resultatet; märk upp med rätt typ, `areaServed` och `telephone`, och lova inte kunden något resultat. ⚖️ tolkning; ⚠️ om en ofullständig adress godtas är inte prövat i Rich Results Test. Samma slutsats i marketingskills `seo-audit` ("do not fabricate an address or promise eligibility from `areaServed` alone").
- Ett hybridföretag (tar emot på en bemannad plats och åker ut) visar adressen och anger serviceområdet (samma riktlinjer).

## Svenska källor för namn, adress och telefon

Namn, adress och telefon ska stämma mellan sajten, Google-profilen, Apple, Bing Places och de svenska katalogerna (hitta.se, Eniro) ⚠️ (de svenska katalogernas roll är inte undersökt). Uppföljningen hör till förvaltningen (→ `guide/2-9-drift-och-forvaltning.md`).
