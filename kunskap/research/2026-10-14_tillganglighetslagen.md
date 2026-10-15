---
titel: "Tillgänglighetslagen (2023:254, EAA) – vad den innebär för våra kunders webbplatser"
datum: 2026-10-14
kallor:
  - "Lag (2023:254) om vissa produkters och tjänsters tillgänglighet, ändrad t.o.m. SFS 2026:1026 – https://data.riksdagen.se/dokument/sfs-2023-254.text (även https://www.riksdagen.se/sv/dokument-och-lagar/dokument/svensk-forfattningssamling/lag-2023254-om-vissa-produkters-och-tjansters_sfs-2023-254/)"
  - "Förordning (2023:676) om vissa produkters och tjänsters tillgänglighet, ändrad t.o.m. SFS 2026:290 – https://data.riksdagen.se/dokument/sfs-2023-676.text (även https://www.riksdagen.se/sv/dokument-och-lagar/dokument/svensk-forfattningssamling/forordning-2023676-om-vissa-produkters-och_sfs-2023-676/)"
  - "PTSFS 2024:6, PTS föreskrifter om vissa tjänsters tillgänglighet – https://pts.se/contentassets/bda1046669b64e9ea9a10ddc7f8f5891/pts-foreskrifter-ptsfs-20246-om-vissa-tjansters-tillganglighet.pdf (sidan: https://pts.se/regelbibliotek/foreskrifter-om-vissa-tjansters-tillganglighet/)"
  - "Direktiv (EU) 2019/882 (tillgänglighetsdirektivet), svensk version – https://eur-lex.europa.eu/legal-content/SV/TXT/HTML/?uri=CELEX:32019L0882"
  - "Prop. 2022/23:42 Genomförande av tillgänglighetsdirektivet – https://data.riksdagen.se/dokument/HA0342.text (även https://www.riksdagen.se/sv/dokument-och-lagar/dokument/proposition/genomforande-av-tillganglighetsdirektivet_ha0342/html/)"
  - "PTS: Frågor och svar om tillgänglighetslagen (uppdaterad 2025-03-20) – https://pts.se/digital-inkludering/lagen-om-vissa-produkters-och-tjansters-tillganglighet/vanliga-fragor-och-svar-om-tillganglighetslagen/"
  - "PTS: Information om tjänstens tillgänglighet – https://pts.se/digital-inkludering/lagen-om-vissa-produkters-och-tjansters-tillganglighet/information-om-tjanstens-tillganglighet/"
  - "PTS: PTS inleder en tillsyn av e-handelstjänster (publ. 2025-10-15) – https://pts.se/nyheter-och-pressmeddelanden/pts-inleder-en-tillsyn-av-e-handelstjanster/"
  - "Lag (2018:1937) om tillgänglighet till digital offentlig service (DOS-lagen), ändrad t.o.m. SFS 2026:1625 – https://data.riksdagen.se/dokument/sfs-2018-1937.text"
  - "DIGG: Rättslig vägledning, 5. Tillämpningsområde – vilka omfattas? – https://www.digg.se/kunskap-och-stod/digital-tillganglighet/rattslig-vagledning/5.-tillampningsomrade---vilka-omfattas"
  - "ANDRAHANDSKÄLLA: Deque, 'EN 301 549 v4.1.1 is final!' – https://www.deque.com/blog/en-301-549-v4-1-1-is-final-what-changed-what-it-means-and-what-you-should-do/"
status: "research, inte juridisk rådgivning"
---

# Tillgänglighetslagen (2023:254) och våra kunders webbplatser

Lagtexten hämtades 2026-10-15 från Riksdagens öppna data. Den var då ändrad t.o.m. SFS 2026:1026. Förordningen var ändrad t.o.m. SFS 2026:290 och DOS-lagen t.o.m. SFS 2026:1625. Citat inom citattecken är ordagranna. Text som inte står inom citattecken är min tolkning. **Ej bekräftat** betyder att jag inte har hittat någon primärkälla. **[Andrahand]** markerar källor som inte kommer från myndigheter eller lagstiftare.

Förkortningar: **LPTT** = lag (2023:254). **FPTT** = förordning (2023:676). **Prop.** = prop. 2022/23:42. Sidhänvisningarna till propositionen har jag läst ut ur Riksdagens textversion. De är ungefärliga (±1 sida).

---

## 0. Kortversion

| Kundtyp / sajt | Omfattas av LPTT? | Säkerhet |
|---|---|---|
| Mikroföretag (färre än 10 anställda och omsättning **eller** balansomslutning högst 2 MEUR), oavsett vilken sajt | **Nej.** Tjänster från mikroföretag är undantagna (10 § LPTT). | Hög (lagtext) |
| Ren informationssajt (tjänster, kontakt, om oss) | **Nej.** Ingen e-handelstjänst, eftersom inget konsumentavtal ingås på sajten. | Hög. PTS säger att bara de delar som hör till e-handelstjänsten omfattas. |
| Offertformulär / kontaktformulär | **Troligen nej.** En offertförfrågan är inte att ingå ett avtal. | Medel (egen tolkning, ingen myndighet har uttalat sig) |
| Webbshop / betalning till konsument, kunden har minst 10 anställda eller passerar beloppsgränsen | **Ja.** Det är en e-handelstjänst (2 § och 4 § 7 LPTT). | Hög |
| Online-bokning där konsumenten bokar en tjänst (bord, tid, behandling), kunden är inte mikroföretag | **Sannolikt ja**, om bokningen innebär att ett konsumentavtal ingås. | Medel. Ingen primärkälla nämner bokning uttryckligen. |
| Privat klinik/tandläkare med offentlig finansiering (t.ex. regionavtal) | Omfattas av **DOS-lagen**, inte i första hand av LPTT, och då **utan** något mikroföretagsundantag. | Hög för att regeln finns. Vilka kunder som träffas måste prövas per kund. |

Slutsatsen för oss är att de flesta av våra kunder (små lokala företag) sannolikt är mikroföretag och inte har några **lagkrav** enligt LPTT. Två grupper behöver fångas upp: (a) kunder med minst 10 anställda som har shop eller bokning, och (b) kliniker med offentlig finansiering, som omfattas av DOS-lagen.

---

## 1. Vilka tjänster omfattas?

### 1.1 Lagtext

**4 § LPTT:**
> "Följande tjänster omfattas av denna lag när de är avsedda för konsumenter:
> 1. elektroniska kommunikationstjänster, […]
> 2. tjänster som ger åtkomst till audiovisuella medietjänster,
> 3. inslag i passagerartransporttjänster med buss, fartyg, luftfartyg eller tåg, […]
> 5. banktjänster för konsumenter,
> 6. tillhandahållande av e-böcker, och
> 7. e-handelstjänster."

Källa: https://data.riksdagen.se/dokument/sfs-2023-254.text, 4 §.

**2 § LPTT (definitioner):**
> "e-handelstjänster: tjänster som tillhandahålls på distans, genom webbplatser och tjänster för mobila enheter, på elektronisk väg och på individuell begäran av en konsument i syfte att ingå ett konsumentavtal,"

> "konsument: fysisk person som handlar huvudsakligen för ändamål som faller utanför näringsverksamhet,"

> "tjänsteleverantör: fysisk eller juridisk person som tillhandahåller en tjänst på unionsmarknaden eller som erbjuder sig att tillhandahålla en sådan tjänst till konsumenter i unionen,"

Källa: samma, 2 §. 2 § får ny lydelse den 2026-11-20 genom SFS 2026:1026. Ändringen gäller bara hänvisningen till den nya konsumentkreditlagen (2026:1011) i definitionen av banktjänster. Definitionerna ovan är oförändrade.

Direktivet har samma definition i artikel 3.30. Skäl 43 lyder:
> "Skyldigheterna i detta direktiv beträffande e-handelstjänsternas tillgänglighet bör gälla internetförsäljning av alla produkter och tjänster och bör därför även gälla försäljning av en produkt eller tjänst som i sig omfattas av detta direktiv."

Källa: https://eur-lex.europa.eu/legal-content/SV/TXT/HTML/?uri=CELEX:32019L0882, skäl 43 och art. 3.30.

**Propositionens tolkning** (prop. 2022/23:42, avsnittet om e-handelstjänster, ca s. 52–53):
> "Det innebär att med e-handel avses all handel som bedrivs på internet eller annars på elektronisk väg. […] Det innebär att webbplatser där konsumenter sluter avtal om att köpa produkter eller tjänster ingår, och det alldeles oavsett om webbplatsen huvudsakligen eller till alldeles övervägande del vänder sig till företagare för att få avsättning för produkter och tjänster. Om e-handelsplatsen uteslutande vänder sig till företag eller till offentlig sektor, kommer den däremot inte att omfattas av tillgänglighetsdirektivets krav."

Källa: https://data.riksdagen.se/dokument/HA0342.text.

**PTS om hur stor del av webbplatsen som omfattas** (FAQ, uppdaterad 2025-03-20):
> "PTS bedömer att det endast är de delar av en webbplats som hör till e-handelstjänsten, som omfattas av tillgänglighetskraven för e-handelstjänster i lagen om vissa produkters och tjänsters tillgänglighet. […] Det är upp till varje aktör att bedöma vilka delar som hör till e-handelstjänsten, och bedömningen kan komma att prövas inom PTS tillsyn."

PTS skriver också: "PTS är en av tillsynsmyndigheterna för lagen och kan i den rollen inte ge förhandsbesked eller individuell rådgivning till aktörer."

Källa: https://pts.se/digital-inkludering/lagen-om-vissa-produkters-och-tjansters-tillganglighet/vanliga-fragor-och-svar-om-tillganglighetslagen/

### 1.2 Tillämpat på våra sajttyper (egen tolkning)

Det avgörande rekvisitet är **"i syfte att ingå ett konsumentavtal"**, tillsammans med kravet på att tjänsten är avsedd för konsumenter.

- **Informationssajt** (hantverkare, konsult, restaurangens meny och öppettider): Inget avtal ingås på sajten, så den är ingen e-handelstjänst och omfattas inte. LPTT innehåller ingen allmän regel om att privata företags webbplatser ska vara tillgängliga.
- **Offertformulär / "ring upp mig"**: Konsumenten skickar en förfrågan, och avtalet ingås senare utanför sajten. Därför är det enligt min bedömning troligen ingen e-handelstjänst. **Ej bekräftat.** Varken PTS eller propositionen tar upp offertformulär.
- **Bokning** (bordsbokning, frisörtid, behandlingstid på klinik): Om bokningen innebär att konsumenten ingår ett avtal om en tjänst, uppfyller den ordalydelsen i definitionen. Propositionen talar om webbplatser där konsumenter "sluter avtal om att köpa produkter eller tjänster". **Det är inte bekräftat** var gränsen går för bokningar utan betalning, till exempel en kostnadsfri bordsreservation. Vi bör behandla bokning som **sannolikt omfattad** när kunden inte är ett mikroföretag.
- **Webbshop, presentkort, betalning online, förskottsbetalning av bokning**: Detta är en e-handelstjänst, och då gäller dessutom de särskilda kraven på betal- och identifieringsfunktioner (avsnitt 3.3).
- **B2B-sajter** som bara vänder sig till företag omfattas inte (se prop. ovan).
- **Banktjänster** (betaltjänster, krediter) omfattas som egen kategori. De träffar betalningsleverantören och inte våra kunder. När en e-handlare erbjuder en betallösning från någon annan är det ändå e-handlaren som ansvarar för att betaltjänsten i hans tjänst är tillgänglig (se 4.3).

### 1.3 Undantag för vissa typer av innehåll

**5 § LPTT:**
> "Denna lag är inte tillämplig på innehåll på sådana webbplatser och mobila applikationer som utgörs av 1. kartor som inte är avsedda för navigering, eller 2. kartor som är avsedda för navigering, om väsentlig information tillhandahålls på ett tillgängligt digitalt sätt.
> Lagen är inte heller tillämplig på innehåll på webbplatser och mobila applikationer som kommer från tredje part och som varken finansieras eller utvecklas eller står under kontroll av den berörda ekonomiska aktören."

Inbäddade Google Maps omfattas alltså inte. Ett bokningssystem eller en kassa från tredje part som kunden själv **väljer och betalar för** som sin e-handelstjänst finansieras dock av kunden. Därför ligger det enligt min bedömning **inte** under tredjepartsundantaget (jfr prop. om betallösningar under 4.3). **Ej bekräftat** av myndighet.

---

## 2. Undantaget för mikroföretag

### 2.1 Exakt lydelse

**2 § LPTT:**
> "mikroföretag: företag med färre än tio anställda och som har en årsomsättning eller en årlig balansomslutning som inte överstiger 2 miljoner euro,"

**10 § LPTT (rubrik "Undantag för mikroföretag"):**
> "Tjänster som tillhandahålls av mikroföretag behöver inte uppfylla tillgänglighetskraven.
> Ett mikroföretag som hanterar produkter behöver inte dokumentera sin bedömning av om förutsättningarna för undantag enligt 7 § är uppfyllda. Inte heller behöver företaget underrätta behörig marknadskontrollmyndighet om att undantag med stöd av 7 § åberopas. Om marknadskontrollmyndigheten begär det, ska företaget dock till myndigheten lämna de uppgifter som är relevanta för bedömningen av om det finns förutsättningar för undantag."

Källa: https://data.riksdagen.se/dokument/sfs-2023-254.text, 2 § och 10 §.

**Direktivet, art. 3.23 och art. 4.5:**
> "mikroföretag: ett företag med färre än tio anställda och som har en årsomsättning som inte överstiger 2 miljoner EUR eller en årlig balansomslutning som inte överstiger 2 miljoner EUR."

> "5. Mikroföretag som tillhandahåller tjänster ska undantas från skyldigheten att uppfylla de tillgänglighetskrav som avses i punkt 3 i denna artikel och eventuella skyldigheter som rör uppfyllandet av de kraven."

Källa: EUR-Lex (se ovan), art. 3.23 och 4.5. Propositionen anger på ett ställe "artikel 3.24" (ca s. 71). Författningskommentaren och EUR-Lex anger däremot 3.23.

### 2.2 Vad undantaget innebär

- **Tjänster:** helt undantagna. Det gäller både kraven och de skyldigheter som hänger ihop med dem, till exempel att ta fram information enligt 25 §. Det följer av art. 4.5 och skäl 70: "krav och skyldigheter i detta direktiv [bör] inte gälla mikroföretag som tillhandahåller tjänster".
- **Produkter** (hårdvara, terminaler med mera) är **inte** undantagna. Mikroföretag har bara lättnader i dokumentationen. PTS FAQ: "Mikroföretag undantas från kraven på tjänster, men inte för produkter." Detta saknar betydelse för webbplatser.
- **Hur villkoren läses:** färre än 10 anställda **och** (omsättning högst 2 MEUR **eller** balansomslutning högst 2 MEUR). Ett företag med 5 anställda, 3 MEUR i omsättning och 1 MEUR i balansomslutning är alltså fortfarande mikroföretag.
  - **Observera:** PTS FAQ förenklar till "mindre än två miljoner euro i omsättning och färre än tio anställda" och nämner inte balansomslutningen. Lagtexten har företräde.
- **"Anställda"** räknas i årsarbetskrafter. Deltid och säsongsarbete räknas som delar av årsarbetskrafter (prop., författningskommentaren till 2 §, ca s. 145, med hänvisning till kommissionens rekommendation 2003/361/EG, bilagan art. 5). Skäl 53 i direktivet säger att företag "verkligen [måste] uppfylla kraven i kommissionens rekommendation 2003/361/EG". Enligt den rekommendationen räknas partnerföretag och anknutna företag in, men den detaljen har jag **inte verifierat i primärtext**. Det betyder att en kedja eller ett företag i en koncern kan förlora undantaget.
- **Ingen växelkurs anges** i lagen. Det är **ej bekräftat** vilken kurs eller vilket räkenskapsår som ska användas.
- **Undantaget kan inte lånas.** Om ett större företag använder ett mikroföretag som underleverantör blir det större företaget inte befriat, och omvänt (prop. avsnitt 5.11, ca s. 71–72): "Undantaget är därför inte tillämpligt om en tjänsteleverantör använder sig av ett mikroföretag som underleverantör avseende delar av sitt tjänsteutbud […]". **Att vi själva är ett litet företag hjälper alltså inte en kund som omfattas.**

---

## 3. Vilka krav gäller och från när?

### 3.1 Grundkrav

**6 § LPTT:**
> "Produkter och tjänster som omfattas av denna lag får släppas ut på marknaden respektive tillhandahållas endast om de uppfyller 1. krav på tillgänglighet avseende information, användargränssnitt eller funktionell utformning (tillgänglighetskrav), […]"

**24 § LPTT:**
> "En tjänsteleverantör som tillhandahåller en tjänst till en konsument ska fortlöpande säkerställa att tjänsten uppfyller tillgänglighetskraven."

Om tjänsten inte uppfyller kraven ska leverantören åtgärda bristen och "omedelbart underrätta tillsynsmyndigheterna […] om bristen" (24 § andra stycket).

**6 § FPTT** hänvisar till bilaga 2. **Bilaga 2 p. 3 FPTT:**
> "Webbplatser, inklusive tillhörande nätapplikationer, och tjänster för mobila enheter, inklusive mobilapplikationer, ska göras tillgängliga på ett enhetligt och ändamålsenligt sätt genom att de görs uppfattningsbara, hanterbara, begripliga och robusta."

Bilaga 2 p. 2 FPTT kräver att information om hur tjänsten fungerar ska kunna "uppfattas med mer än ett sinne". Informationen ska ha typsnitt "med lämplig storlek och form […] och med tillräcklig kontrast samt justerbart avstånd mellan bokstäver, rader och stycken" och textalternativ till sådant som inte är text. Enligt bilaga 2 p. 4 ska stödtjänster (helpdesk, kundtjänst) kunna informera om tjänstens tillgänglighet.

Källa: https://data.riksdagen.se/dokument/sfs-2023-676.text, 6 § och bilaga 2. Sedan SFS 2026:290 finns också 7 a § och bilaga 3 med kriterier för funktionsprestanda, till exempel "minst ett driftsläge som inte kräver syn".

### 3.2 EN 301 549 och WCAG 2.1/2.2 AA

- **Varken lagen, förordningen eller PTSFS 2024:6 hänvisar uttryckligen till EN 301 549 eller WCAG.** Kraven är funktionella. Presumtion om överensstämmelse uppstår genom **9 § LPTT**:
  > "Produkter och tjänster som helt eller delvis överensstämmer med en harmoniserad standard, till vilken hänvisningar har offentliggjorts i Europeiska unionens officiella tidning, eller med en teknisk specifikation, ska förutsättas överensstämma med tillgänglighetskraven i den utsträckning kraven följer av standarden eller specifikationen."
- **PTS FAQ:**
  > "Räcker det att följa WCAG? Nej. Standarden EN 301 549 kommer att vara harmoniserad mot tillgänglighetsdirektivet. […] EN 301 549 innehåller fler krav är WCAG. […] Tills det är klart kan man använda nuvarande EN 301 549 som vägledning."

  > "För att klara kraven i EN 301 549 behöver man uppfylla WCAG:s nivåer A och AA. Nivå AAA är inte ett krav […]"
- **Status för standarden i oktober 2026:**
  - **[Andrahand: Deque]**: "On September 2, 2026, EN 301 549 v4.1.1 was officially published." Versionen bygger på WCAG 2.2 AA och "is currently on track to be cited in the journal around November 30, 2026."
  - Det är **ej bekräftat i primärkälla** (EUT) att någon version av EN 301 549 i dag är harmoniserad under direktiv 2019/882. Version 3.2.1 (WCAG 2.1 AA) är vägledning enligt PTS.
  - Praktisk slutsats: **bygg mot WCAG 2.2 AA.** Den nivån täcker 2.1 AA och följer det som sannolikt blir den harmoniserade standarden. Lägg till de delar av EN 301 549 som inte är WCAG där det är relevant, till exempel dokument och stödtjänster.

### 3.3 Särskilda krav på e-handel

Dessa finns i **PTSFS 2024:6, 8 §** (beslutad 2024-12-09, i kraft 2025-06-28):
> "E-handelstjänster ska uppfylla de krav som anges i bilaga 2 till förordningen (2023:676) om vissa produkters och tjänsters tillgänglighet och även
> 1. tillhandahålla information om tillgängligheten för de produkter och tjänster som säljs när informationen tillhandahålls av ansvariga ekonomiska aktörer,
> 2. säkerställa identifierings-, säkerhets- och betalningsfunktionernas tillgänglighet när de levereras som en del av en tjänst genom att göra tjänsten uppfattningsbar, hanterbar, begriplig och robust, och
> 3. tillhandahålla identifieringsmetoder, elektroniska signaturer och betaltjänster som är uppfattningsbara, hanterbara, begripliga och robusta."

Källa: https://pts.se/contentassets/bda1046669b64e9ea9a10ddc7f8f5891/pts-foreskrifter-ptsfs-20246-om-vissa-tjansters-tillganglighet.pdf, 8 §. Motsvarar direktivets bilaga I avsnitt IV g.

### 3.4 Information om tjänstens tillgänglighet

LPTT använder inte ordet "tillgänglighetsredogörelse". Det är DOS-lagens begrepp. Funktionen är ändå liknande.

**25 § LPTT:**
> "Tjänsteleverantören ska ta fram nödvändig information om hur tjänsten uppfyller tillgänglighetskraven. Om tjänsteleverantören har åberopat undantag enligt 7 §, ska det av informationen även framgå vilka tillgänglighetskrav som omfattas av undantaget.
> Tjänsteleverantören ska säkerställa att de tjänster som denne utformar och tillhandahåller marknaden åtföljs av sådan information som avses i första stycket."

**24 § FPTT:**
> "Information om hur en tjänst uppfyller de tillgänglighetskrav som tjänsteleverantören tar fram enligt 25 § lagen (2023:254) […] ska innehålla en redogörelse för de krav på tillgänglighet som är tillämpliga på tjänsten. I den mån det är nödvändigt för bedömningen av överensstämmelse ska informationen även innehålla en beskrivning av tjänstens utformning och funktion.
> Tjänsteleverantören ska ge allmänheten tillgång till informationen i skriftlig och muntlig form samt på ett sätt som är tillgängligt för personer med funktionsnedsättning. Tjänsteleverantören ska spara informationen så länge som tjänsten tillhandahålls."

**PTSFS 2024:6, 3–5 §§:**
> "3 § Information om hur en tjänst uppfyller tillgänglighetskraven ska utöver vad som anges i 24 § förordningen (2023:676) […] även innehålla 1. en allmän beskrivning av tjänsten i tillgängliga format, 2. de beskrivningar och förklaringar som behövs för att förstå hur tjänsten fungerar, och 3. en beskrivning av hur tillgänglighetskraven uppfylls av tjänsten. […]"

> "4 § Tjänsteleverantören ska tillhandahålla information som visar att tjänsteleveransprocessen och kontrollen av den säkerställer att tjänsten överensstämmer med 3 § första stycket och med tillämpliga tillgänglighetskrav."

> "5 § Tjänsteleverantören ska inkludera information om hur tjänsten uppfyller tillgänglighetskraven i de allmänna villkoren för tjänsten eller i motsvarande dokument."

**PTS vägledning** (sidan "Information om tjänstens tillgänglighet") säger att informationen fyller en "liknande funktion som en tillgänglighetsredogörelse". På webbplatser rekommenderar PTS en "länk till informationen tydligt presenterad på webbplatsens startsida". Informationen ska också beskriva testmetoder och kvalitetssäkring.

Källa: https://pts.se/digital-inkludering/lagen-om-vissa-produkters-och-tjansters-tillganglighet/information-om-tjanstens-tillganglighet/

### 3.5 Ikraftträdande och övergångsregler

Ur övergångsbestämmelserna till SFS 2023:254:
> "1. Denna lag träder i kraft den 28 juni 2025.
> 2. Lagen tillämpas inte på innehåll på webbplatser och mobila applikationer som avser: – förinspelade tidsberoende medier som har offentliggjorts före ikraftträdandet, – filformat för dokument som har offentliggjorts före ikraftträdandet, eller – innehåll som kan klassificeras som arkiv och som inte har uppdaterats eller redigerats efter ikraftträdandet.
> 3. En tjänsteleverantör får fortsätta att tillhandahålla sina tjänster med hjälp av produkter som före ikraftträdandet lagligen användes av tjänsteleverantören för att tillhandahålla liknande tjänster, dock längst till och med den 27 juni 2030.
> 4. En tjänsteleverantör, som vid tidpunkten för lagens ikraftträdande tillhandahåller tjänster enligt ett avtal som har ingåtts före ikraftträdandet, får fortsätta att tillhandahålla tjänsterna till dess att avtalstiden löper ut, dock längst till och med den 27 juni 2030, även om tjänsterna i fråga inte får tillhandahållas enligt 6 §. […]"

**Min tolkning:** Kraven gäller **redan nu** för webbshoppar och bokningssajter som omfattas. Det finns ingen allmän övergångsperiod för befintliga webbplatser. Punkt 4 gäller tjänsteavtal med konsumenter som ingicks före 2025-06-28. Den innebär inte att en webbplats som byggdes före det datumet slipper kraven. Videor och PDF:er som publicerades före 2025-06-28 är undantagna. Det som publiceras efter det datumet är inte undantaget.

### 3.6 Oproportionerlig börda

**7 § LPTT:** Ett krav gäller inte om det "1. innebär en större förändring av en produkts eller en tjänsts grundläggande karaktär, eller 2. medför en oproportionerligt stor börda för den berörda ekonomiska aktören."

**8 § LPTT:** Aktören ska då "dokumentera och spara sin bedömning" och "underrätta […] tillsynsmyndigheten om att undantag med stöd av 7 § åberopas".

Enligt **10–11 §§ FPTT** ska en ny bedömning göras inom fem år, och dokumentationen ska sparas minst fem år. Undantaget är formellt och kräver underrättelse till myndigheten. Det är ingen genväg att använda i ett standardflöde.

---

## 4. Tillsyn, sanktioner och vem som bär ansvaret

### 4.1 Tillsyn

**28 § FPTT:**
> "Post- och telestyrelsen utövar tillsyn över elektroniska kommunikationstjänster, banktjänster och e-handelstjänster som omfattas av 4 § första stycket 1, 5 och 7 lagen (2023:254) […]"

PTS inledde sin första tillsyn av e-handlare hösten 2025. Pressmeddelandet publicerades 2025-10-15:
> "I den här första omgången granskar vi större aktörer som är etablerade i Sverige och som säljer produkter via nätet. Granskningen gäller endast företagens webbplatser, inte deras appar. Fokus ligger på tre delar av webbplatsen: startsidan, en produktsida och sökfunktionen […]"

> "Granskningen av e-handelstjänster kommer att fortsätta under både 2025 och 2026."

Källa: https://pts.se/nyheter-och-pressmeddelanden/pts-inleder-en-tillsyn-av-e-handelstjanster/

### 4.2 Sanktioner (LPTT)

- **32 §:** Myndigheten ska först "uppmana den eller de ansvariga ekonomiska aktörerna att inom en viss tid åtgärda bristen". Om bristen inte åtgärdas får myndigheten besluta om förelägganden.
- **34–35 §§:** Förelägganden kan beslutas, och enligt 35 § gäller: "Ett beslut om föreläggande enligt 32-34 §§ får förenas med vite."
- **37 §:**
  > "En marknadskontrollmyndighet eller tillsynsmyndighet får ålägga en ekonomisk aktör att betala sanktionsavgift om den ekonomiska aktören har åsidosatt någon av 6, 8, 11-13, 15-17, 19-26 §§ […]. I ringa fall ska någon sanktionsavgift inte beslutas. En sanktionsavgift får inte beslutas senare än fem år från den tidpunkt då åsidosättandet upphörde."
- **39 §:**
  > "Sanktionsavgiften ska bestämmas till lägst 10 000 kronor och högst 10 000 000 kronor."
  Avgiften kan sättas ned helt eller delvis om det finns särskilda skäl.
- **41 §:** Beslut överklagas till allmän förvaltningsdomstol. Uppmaningar enligt 32 och 33 §§ första stycket kan inte överklagas.

Eftersom 25 § finns med i uppräkningen i 37 § kan **avsaknad av tillgänglighetsinformation** i sig leda till sanktionsavgift.

### 4.3 Vem bär ansvaret, vi eller kunden?

- Skyldigheterna ligger på **tjänsteleverantören**. Det är den som "tillhandahåller en tjänst" till konsumenter (2 § och 24–26 §§). Sanktioner riktas mot "ekonomisk aktör", och den definitionen inkluderar tjänsteleverantör. För en webbshop eller bokningstjänst i kundens namn är **kunden** tjänsteleverantör.
- **Webbyrån finns inte i lagens ansvarskedja för tjänster.** Lagen nämner tillverkare, importör, distributör och representant bara för produkter. Jag har inte hittat någon bestämmelse som gör den som bygger eller förvaltar en sajt ansvarig enligt LPTT. **Egen tolkning, inte bekräftad av myndighet.**
- Ansvaret kan inte läggas ut på någon annan. Prop. (ca s. 88) säger att den som erbjuder en e-handelstjänst med en betallösning från en annan aktör har "ansvaret för att också betaltjänsten uppfyller tillgänglighetskraven". Propositionen hänvisar till skäl 20: "Även om en tjänst eller en del av en tjänst lagts ut på underentreprenad till tredje part bör inte den tjänstens tillgänglighet äventyras […]".
- **Vår faktiska risk är avtalsrättslig, inte offentligrättslig.** Om vi lovar en "tillgänglighetsanpassad" eller "lagenlig" sajt och kunden får en sanktion kan kunden kräva oss på ersättning enligt vårt avtal. **Avtalsrisken har jag inte utrett** (gäller till exempel avtalsvillkor och ansvarsbegränsning).

---

## 5. DOS-lagen (2018:1937)

### 5.1 Huvudregel: gäller offentliga aktörer

**1 §:**
> "Denna lag innehåller bestämmelser om krav på tillgänglighet till digital service som tillhandahålls av en offentlig aktör."

**Bekräftat:** Vanliga privata företag utan offentlig finansiering omfattas inte. DIGG:s rättsliga vägledning säger samma sak.

### 5.2 Undantaget som berör våra klinikkunder

**4 § andra stycket 3 DOS-lagen.** Lydelsen gäller fram till 2026-12-31. Lydelsen från 2027-01-01 (SFS 2026:1625) ändrar bara en lagnamnshänvisning i led c.
> "Vid tillämpningen av denna lag ska med offentlig aktör jämställas […] 3. privata aktörer som yrkesmässigt bedriver verksamhet som till någon del är offentligt finansierad och som […] b) utgör hälso- och sjukvård enligt hälso- och sjukvårdslagen (2017:30) eller tandvård enligt tandvårdslagen (1985:125), […]"

Källa: https://data.riksdagen.se/dokument/sfs-2018-1937.text, 4 §.

**DIGG** (rättslig vägledning avsnitt 5): "Observera att till skillnad mot offentligt styrt organ krävs ingen kvantitativ (större mängd) finansiering". DIGG skriver också: "Om den privata aktören endast erhåller en ringa offentlig finansiering kan det påverka bedömningen av om tillgänglighetsanpassning är oskäligt betungande."

Källa: https://www.digg.se/kunskap-och-stod/digital-tillganglighet/rattslig-vagledning/5.-tillampningsomrade---vilka-omfattas

**Konsekvenser:**
- Privata vårdgivare och tandvårdsföretag med **någon** offentlig finansiering omfattas av DOS-lagen. Det gäller till exempel vårdavtal med en region eller ersättning enligt den nationella taxan. DOS-lagen har **inget mikroföretagsundantag**. Den har bara undantaget för "oskäligt betungande" anpassning i 12 §.
- Det kräver då att webbplatsen uppfyller kraven (10 §) och att det finns en **tillgänglighetsredogörelse** med en funktion för att anmäla brister (13 §). Tillsynen sköts av DIGG enligt PTS jämförelsetabell.
- **Ej bekräftat:** om statligt tandvårdsstöd ensamt räknas som att verksamheten är "till någon del offentligt finansierad". Jag har inte hittat något direkt uttalande i primärkälla. Det ska kontrolleras från fall till fall eller med DIGG.
- Rena privatkliniker utan offentlig ersättning (till exempel estetik eller fysioterapi som tar bara privat betalning) omfattas inte av DOS-lagen. De bedöms enligt LPTT som vilket annat företag som helst.

---

## 6. Slutsatser för vårt AI-flöde

*Detta är egen analys, inte rådgivning.*

### 6.1 Vad flödet ska kontrollera (intag/brief)

1. **Fråga om storlek:** antal anställda (årsarbetskrafter), omsättning och balansomslutning, och om företaget ingår i en koncern eller kedja. Sortera in kunden som *mikroföretag* eller *inte mikroföretag*. Om vi saknar uppgifter ska kunden behandlas som "inte mikroföretag", alltså försiktighetsprincipen.
2. **Funktioner som utlöser kraven:** webbshop, betalning eller förskottsbetalning, presentkort, onlinebokning av tjänst, abonnemang eller medlemskap som tecknas online. Formulär som bara skickar en förfrågan (offert, kontakt, återuppringning) flaggas inte.
3. **Offentlig finansiering inom vård och tandvård:** fråga om kunden har vårdavtal eller ersättning från region eller stat. Om ja: DOS-spåret.
4. **Tredjepartskomponenter:** registrera vilket boknings- eller betalsystem som används. Kunden ansvarar även för det systemet om det ingår i e-handelstjänsten, så komponenten ska bedömas eller kunden ska be leverantören om ett tillgänglighetsintyg.

### 6.2 Vad flödet ska bygga in i alla sajter (oavsett om lagen gäller)

- WCAG 2.2 AA som byggstandard i mallarna och i QA. Det ger marginal mot både EN 301 549 v3.2.1 (WCAG 2.1) och v4.1.1 (WCAG 2.2). Automatiska tester räcker inte. PTS skriver att verktygen "har begränsningar". Lägg till en manuell kontroll av tangentbordsnavigering, fokus, formulärfel och kassa/bokning.
- Kontrast, justerbart avstånd mellan bokstäver, rader och stycken (bilaga 2 p. 2 e FPTT) och alt-texter (p. 2 f). Detta överlappar med WCAG.

### 6.3 Extra leverans för kunder som omfattas (inte mikroföretag + shop/bokning)

- En **sida med information om tjänstens tillgänglighet**, länkad från startsidan. Den ska innehålla en allmän beskrivning av tjänsten, hur den fungerar, vilka krav som gäller och hur de uppfylls, testmetod och kvalitetssäkring, och eventuella undantag enligt 7 §. Grund: 25 § LPTT, 24 § FPTT, 3–4 §§ PTSFS 2024:6 och PTS vägledning.
- En **hänvisning i kundens allmänna villkor/köpvillkor** till informationen (5 § PTSFS 2024:6).
- Informationen ska finnas i **skriftlig och muntlig form** (24 § FPTT). Kunden ska kunna informera om tillgängligheten per telefon eller i kundtjänst. Det är en rutin hos kunden, inte webbinnehåll.
- Kontroll av att betal- och identifieringsflödena är tillgängliga (8 § PTSFS 2024:6). Om produktdata om tillgänglighet finns från tillverkaren ska den visas (8 § 1).
- En **förvaltningsrutin.** Kravet gäller "fortlöpande" (24 § LPTT). Varje ändring i kassan eller bokningen ska testas igen.

### 6.4 Extra leverans för kliniker med offentlig finansiering (DOS-lagen)

- Tillgänglighetsredogörelse enligt DOS-lagen 13 §, med en funktion för att anmäla brister. DIGG:s föreskrifter om redogörelsens innehåll och de tekniska kraven har jag **inte hämtat**, så de ska kontrolleras separat.

### 6.5 Vad kunden ska informeras om

- **Mikroföretag:** "Ni omfattas sannolikt inte av tillgänglighetslagens krav (10 § LPTT), men vi bygger ändå efter WCAG 2.2 AA. Om ni växer till 10 årsarbetskrafter eller fler och passerar 2 MEUR i både omsättning och balansomslutning, och har webbshop eller bokning, gäller kraven." Bedömningen är kundens egen. PTS ger inga förhandsbesked.
- **Inte mikroföretag + shop/bokning:** Ansvaret ligger på kunden som tjänsteleverantör. Sanktionsavgiften är 10 000–10 000 000 kr (39 §). Kunden måste ha en kundtjänstrutin för muntlig information och ta ansvar för tredjepartssystem.
- **Vårdgivare med offentlig ersättning:** DOS-lagen gäller oavsett storlek.
- **I våra avtal:** Vi bör formulera vårt åtagande som "byggd enligt WCAG 2.2 AA, testad med metod X", inte som "lagenlig". Vi bör också skriva att efterlevnaden av LPTT och DOS-lagen är kundens ansvar, eftersom kunden är tjänsteleverantör. Det ska stämmas av med jurist.

### 6.6 Paket och kunder som berörs

| Paket / kund | Åtgärd |
|---|---|
| Baspaket informationssajt (alla storlekar) | Inget lagkrav enligt LPTT. WCAG 2.2 AA som kvalitetsstandard. |
| Paket med offertformulär | Som ovan (troligen utanför). |
| Paket med bokning eller shop, mikroföretag | Inget lagkrav. Erbjud informationssidan som tillval. |
| Paket med bokning eller shop, **inte** mikroföretag | Obligatorisk "EAA-modul": informationssida, text till villkoren, test av kassa/bokning, förvaltningsrutin. |
| Vårdgivare/tandvård med offentlig finansiering | Obligatorisk DOS-modul: tillgänglighetsredogörelse och anmälningsfunktion. |

---

## 7. Osäkerheter och öppna frågor

1. **Bokning utan betalning** (till exempel en kostnadsfri bordsreservation): Det är oklart om ett "konsumentavtal" ingås. Ingen primärkälla tar upp frågan.
2. **Offertformulär:** Jag bedömer att de är utanför lagen, men det är inte bekräftat.
3. **EN 301 549 v4.1.1:** Det är ej bekräftat i EUT att den har publicerats som harmoniserad standard under 2019/882. Uppgiften om datum kommer från en andrahandskälla (Deque).
4. **Mikroföretag:** Det är ej bekräftat vilken växelkurs som gäller och hur koncerner räknas. Rekommendation 2003/361/EG har inte lästs i primärtext.
5. **DOS-lagen:** Det är ej bekräftat om statligt tandvårdsstöd räknas som offentlig finansiering. DIGG:s föreskrifter har inte hämtats.
6. **Inbäddade tredjepartssystem:** Gränsen mot tredjepartsundantaget i 5 § andra stycket LPTT är inte prövad.
7. **Diskrimineringslagen** (bristande tillgänglighet) och **avtalsansvar** mellan oss och kunden har inte utretts.
8. PTS FAQ (2025-03-20) säger att standarderna väntades "i september 2025". Uppgiften kan vara inaktuell.
