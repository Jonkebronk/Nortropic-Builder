# DIGG: webbriktlinjer

**Källa:** Myndigheten för digital förvaltning (Digg), lästa 2026-10-16 med WebFetch. `curl` stoppas av en brandvägg (*"Request Rejected"*).
- **Dagens version:** [Alla webbriktlinjer](https://www.digg.se/webbriktlinjer/alla-webbriktlinjer) (65 träffar, titlarna lästa), [Om webbriktlinjer](https://www.digg.se/webbriktlinjer/om-webbriktlinjer), [Det här är EN 301 549 och WCAG](https://www.digg.se/webbriktlinjer/lagar-och-krav/det-har-ar-en-301-549-och-wcag) (senast uppdaterad 8 maj 2026) och riktlinjen [Se till att koden validerar](https://www.digg.se/webbriktlinjer/alla-webbriktlinjer/se-till-att-koden-validerar) (6 maj 2024). Andra varvet sparade 58 riktlinjesidor (`byggguider/checklistor-github/digg-riktlinjer-2026/`).
- **Den arkiverade breda listan:** [Wayback 2022-11-12](https://web.archive.org/web/20221112081030/https://webbriktlinjer.se/riktlinjer/), 142 riktlinjer numrerade upp till R173. Andra varvet sparade R3, R4, R20, R22, R23, R31, R54, R56, R90, R96, R100 och R106 (`digg-gamla-riktlinjer/`); jag läste R4, R23, R31, R90, R96 och R100 i dag.
- **När listan försvann:** Waybacks index (CDX) visar status 200 för `webbriktlinjer.se/riktlinjer/` till och med 2023-12-11 och 301 till digg.se från 2024-10-04. I december 2023 stod det på sajten: *"Webbriktlinjer.se genomgår justeringar under 2023 och därför kan innehållet på webbplatsen vara inaktuellt."*

⚠️ Inte lästa: de 65 riktlinjesidorna en och en i dag, Diggs föreskrifter om tillgänglighetsredogörelsen och sidorna om lagkrav utöver EN-sidan.

**Licens:** ingen licens eller villkor för återanvändning står på sidorna (WebFetch 2026-10-16; samma notering i `innehall/kallor.md:19`). Vi behandlar texten som skyddad, destillerar med egna ord och länkar (⚖️ tolkning, inte juridisk rådgivning).

## Vad det är
**Dagens webbriktlinjer** beskriver *"de krav som gäller för att digital offentlig service ska vara tillgänglig"* (Om webbriktlinjer). 65 riktlinjer, var och en med en EN-punkt och ett WCAG-kriterium med nivå, märkta *Innehåller lagkrav*. Grunden är EN 301 549 V3.2.1: *"Genom att följa en särskild europeisk standard (EN 301 549 V3.2.1), som i sin tur bygger på WCAG 2.1"*.

**Den arkiverade listan** var bredare: *"De officiella riktlinjerna för hur man bör arbeta med webbplatser i offentlig sektor"*, med kontakt, avsändare, datum, länkar, webbadresser, utskrift, arkivering och diarium. Varje sida hade ett eget datum, till exempel R23 2017-11-05, R31 2018-02-12 och R90 2021-05-25.

## Hur det fungerar
- **WCAG 2.1, inte 2.2.** Listan har ingen riktlinje för 2.4.11, 2.5.7, 2.5.8, 3.2.6, 3.3.7 eller 3.3.8. Den har kvar 4.1.1 (*Se till att koden validerar*) med beskedet att kriteriet alltid räknas som uppfyllt och att *"I WCAG 2.2 har 4.1.1 dessutom tagits bort."*
- Utöver WCAG finns EN-krav som biometri, video- och röstsamtal, supporttjänster och produktdokumentation.
- **Lokala tjänstesajter:** båda listorna är skrivna för offentlig sektor. Guiden ger kliniker med offentlig finansiering en DOS-modul (`guide/2-2-omfattning.md:105`; ⚖️ tolkning, inte juridisk rådgivning).

## Kvalitet och underhåll
Utgivare: Digg, en myndighet. Sidorna har *Senast uppdaterad*; EN-sidan ändrades 8 maj 2026. Den arkiverade listan underhålls inte. R31 bär själv en varning: *"Information är inaktuell."*

## Det bästa vi kan ta
1. **Svenska namn och formuleringar** för WCAG-kriterierna, till rapporter till Johnny och kunden.
2. **DOS-modulen** (N3): Diggs sidor om lagkrav och tillgänglighetsredogörelse, när en kund med offentlig finansiering kommer.
3. **Ur den arkiverade listan, som underlag:**
   - R4: kontakten heter "Kontakt" eller "Kontakta oss" och ligger *"gärna högst upp i sidhuvud och i sidfoten"*.
   - R23: *"Ange datumet för när informationen på en sida publicerades eller senast uppdaterades eller granskades."* Stöder andra varvets lucka 3.
   - R90: exemplet har `+46` i `href` och det svenska skrivsättet i länktexten. Det är en svensk källa till formatet i `innehall/mikrotext.md:63`, som i dag säger att formatet saknar källa ⚠️ (normen är RFC 3966, se `opquast.md`).
   - R96: en utskriftsstil för webbläsarens egen utskrift.
   - R31: logotypen länkar till startsidan.
   - **R100 handlar om webbadresser (URL), inte om postadresser.** Inventeringens "adresser (R100)" bör läsas så.

## Var det hamnar hos oss
**Beslutad:** skill: kvalitet (fältet `beslut`; Johnny 2026-10-16 omkring 17.40, *"Ja på alla"*). Digg används i dag i `innehall/bilder.md` (alt-text), `innehall/kallor.md:19` och `guide/2-2-omfattning.md:105` (DOS-modulen).

**Förslag till Johnny:** i `kvalitet/` som källa till svenska kriterienamn och till DOS-modulen, men aldrig som golv, eftersom listan bygger på WCAG 2.1. Punkterna ur den arkiverade listan hör till `innehall/` (datum, kontakt, telefonformat) och `kvalitet/modern-html-css.md` (utskrift), som underlag och inte som norm.

## Passar vår stack?
Ja. Riktlinjerna är text utan kod.

## Risker och flaggor
- **Under vårt golv:** WCAG 2.1 via EN 301 549 V3.2.1. Vårt golv är WCAG 2.2 AA (`guide/2-8-teknik-och-kvalitet.md:28`). Använd aldrig Digg för att sänka ett krav, till exempel träffytan 2.5.8.
- **Den arkiverade listan är inte Diggs gällande råd.** Den kan vara inaktuell punkt för punkt (R31). Den är underlag, aldrig norm.
- **Juridik:** DOS-lagen gäller offentlig sektor och den som finansieras offentligt (⚖️ tolkning, inte juridisk rådgivning).
- Ingen licens angiven. Brandväggen stoppar `curl`; använd WebFetch eller en webbläsare.

## Inloggning
Inget.
