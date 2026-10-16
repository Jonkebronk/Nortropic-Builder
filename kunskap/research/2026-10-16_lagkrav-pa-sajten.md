# Lagkrav och policyer på en liten svensk företagssajt

Research 2026-10-16 på Johnnys uppdrag: *"fixar med cookies/samtycke, policys och det vi saknar här då riktiga byggen ska ha de"* (`BESLUT.md` 2026-10-16). Den bygger vidare på `2026-10-14_dataoverforing-och-analys.md`, som tar upp kakor, analys, överföring till USA och vad en integritetspolicy måste innehålla, och på `2026-10-14_tillganglighetslagen.md`.

**Märkning:** 📄 lagtext eller myndighet · ⚖️ tolkning, inte juridisk rådgivning · ⚠️ inte verifierat.

## Kakor och samtycke

- **Lagen:** 9 kap. 28 § LEK. Uppgifter får lagras i eller hämtas från besökarens utrustning bara med information och samtycke, utom när det är nödvändigt för en tjänst som besökaren uttryckligen har begärt. 📄 (citerad i `2026-10-14_dataoverforing-och-analys.md` §4.1)
- **PTS:**
  - *"För att få använda kakor (cookies) på din webbplats måste du först fråga om samtycke … Undantaget är nödvändiga kakor."*
  - Samtycket ska vara *"frivilligt, specifikt, informerat och ges aktivt"* och ges för varje ändamål för sig.
  - *"Det ska vara lika enkelt att tacka ja som nej"*, och lika lätt att återkalla som att ge.
  - Förifyllda rutor, cookieväggar och knappar som "Jag förstår" godtas inte.
  - Informationen ska säga ändamålen, om kakan är en tredjepartskaka, hur länge den sparas och vilka uppgifter som samlas in. Nödvändiga kakor är *"de som måste finnas för att webbplatsen ska fungera som det är tänkt"*.

  📄 [PTS, Kakor](https://pts.se/internet-och-telefoni/kakor-cookies/)
- **Utan kakor behövs ingen banner.** PTS säger inte uttryckligen att en sajt utan kakor slipper banner, men kravet på samtycke gäller bara kakor som inte är nödvändiga. ⚖️ En sajt utan kakor behöver därför ingen banner, men den bör säga att den inte sätter några.
- **Tredjepartsinnehåll vid klick:** att ladda innehåll från tredje part, som en Google-karta, först vid ett klick med text om vem som sätter kakor och varför, är en vanlig lösning. ⚖️ Att klicket räknas som samtycke är vår tolkning. PTS har inte uttalat sig om lösningen ⚠️. Det säkraste är att inte bädda in kartan alls och bara länka till den.

## Integritetspolicy

- **Den behövs också utan formulär,** eftersom värdens loggar innehåller IP-adresser, och en IP-adress är en personuppgift. GDPR art. 13 kräver information när uppgifterna samlas in. Innehållet står i `2026-10-14_dataoverforing-och-analys.md` §5.2. Bilaga E, fråga 1.8, är avgjord (`BESLUT.md` 2026-10-16).
- **En klinik har också journalplikt** enligt patientdatalagen för legitimerad personal. Policyn säger kort att det som rör behandlingen skrivs i en journal. ⚖️

## Företagsuppgifter: 8 § e-handelslagen

- **Allmänt:** *"namn, adress i etableringslandet och e-postadress"*, och i förekommande fall *organisationsnummer*, *registreringsnummer för mervärdesskatt* och *behörig tillståndsmyndighet*. 📄 [SFS 2002:562](https://www.riksdagen.se/sv/dokument-och-lagar/dokument/svensk-forfattningssamling/lag-2002562-om-elektronisk-handel-och-andra_sfs-2002-562/)
- **Reglerat yrke:** *"yrkestitel och den stat där denna erhållits"*, *"den yrkesorganisation eller liknande där tjänsteleverantören är registrerad"* och *"de bestämmelser som är tillämpliga på yrkesverksamheten och sättet att få tillgång till dem"*. 📄
- **Tolkningar ⚖️:**
  - Lagen gäller *informationssamhällets tjänster*, alltså tjänster som normalt utförs mot ersättning, på distans, elektroniskt och på mottagarens begäran. Att en företagssajt som marknadsför tjänster räknas dit är vår tolkning.
  - För en legitimerad kiropraktor är registret Socialstyrelsens legitimationsregister (HOSP), och regelverket är patientsäkerhetslagen.
  - Hälso- och sjukvård är som regel undantagen från moms, så det finns oftast inget momsnummer att ange ⚠️.
- **Enskild firma:** organisationsnumret är ägarens personnummer, och om det ska stå på sajten är en fråga till kunden (bilaga E, fråga 1.11).

## Bilder av personer

- **Lag (1978:800) om namn och bild i reklam, 1 §:** *"Näringsidkare får icke vid marknadsföring av vara, tjänst eller annan nyttighet använda framställning i vilken annans namn eller bild utnyttjas"* utan samtycke. Lagen kräver inte att samtycket är skriftligt, men 2 § ger böter vid uppsåt eller grov oaktsamhet. 📄 [SFS 1978:800](https://www.riksdagen.se/sv/dokument-och-lagar/dokument/svensk-forfattningssamling/lag-1978800-om-namn-och-bild-i-reklam_sfs-1978-800/)
- **⚖️ GDPR:** en bild av en patient i behandling kan avslöja uppgifter om hälsa (art. 9) och kräver då uttryckligt samtycke. Samtycket dokumenteras i `fakta.md`.

## Tillgänglighetsredogörelse

- **W3C:s minsta innehåll:** ett åtagande, standarden (WCAG 2.2) och en kontaktväg. Rekommenderat: hur sajten är prövad, kända brister och datum. 📄 [W3C WAI](https://www.w3.org/WAI/planning/statements/)
- **Lagkrav:** finns bara i vissa fall, enligt DOS-lagen (offentlig sektor, och vård med offentlig finansiering) och lagen 2023:254 (e-handel och bokning hos företag som inte är mikroföretag). Se `2026-10-14_tillganglighetslagen.md`. För alla andra är redogörelsen god praxis och billig, eftersom kontrollerna redan finns.

## Det övningssajten nu har

- Sidan *Integritet och kakor* (`/integritet/`): ansvarig, besöket och värden, bokning och kontakt, kakor, Google-kartan, rättigheterna och IMY.
- ~~Sidan *Tillgänglighet*~~ togs bort samma dag. Redogörelsen behövs bara när DOS-lagen eller lag 2023:254 gäller (`BESLUT.md` 2026-10-16, *Tillgänglighetsredogörelse bara när lagen kräver det*).
- Sidfoten har länken till Integritet och kakor. Lagen för yrket och registret nämns inte, enligt praxis. Organisationsnumret visas bara för bolag (`BESLUT.md` 2026-10-16, *Företagsuppgifter som praxis, inte mer*).
- Texten vid Google-kartan säger att Google får IP-adressen och sätter kakor, och länkar till sidan om kakor.
- I `fakta.md` står samtycket för patienten på behandlingsfotot som *okänt*. Fotot används inte vid en publicering förrän samtycket är bekräftat.

## Förslag utöver det som är gjort (väntar på Johnny)

1. **Fråga i intervjun om lagkraven** (`mallar/karnfragor.md`):
   - Har ni avtal med regionen? I så fall gäller DOS-lagen och dess krav på redogörelse.
   - Har ni färre än 10 anställda och omsättning under 2 miljoner euro? I så fall gäller mikroföretagsundantaget i lag 2023:254.
   - Vilken företagsform och vilket organisationsnummer har ni?
   - Finns samtycke för personerna på era bilder?
2. **Biträdesavtal mellan kunden och Nortropic** (GDPR art. 28) innan Nortropic förvaltar en publicerad sajt. Regeln finns redan som N3 i `4-foretaget.md`. Förslaget är att skrivandet blir en del av steg 5.
3. **`security.txt`** (RFC 9116) med en kontaktväg för säkerhetsfel, på N2. ⚠️ Nyttan för en liten sajt är inte undersökt.
4. **Kartan:** behåll inbäddningen vid klick (⚖️) eller ta bort den och bara länka. Johnny godkände lösningen i slutgranskningen. Att ta bort den är det säkraste.

## Inte verifierat

- Om PTS godtar ett klick med text som samtycke för en karta från tredje part.
- Om en företagssajt är en *informationssamhällets tjänst* i e-handelslagens mening (vår tolkning: ja).
- Firmans organisationsnummer och företagsform.
- Momsbefrielsen för kiropraktik i det enskilda fallet.
- Hur länge Cloudflare sparar loggarna. Policyn anger därför hur lagringstiden bestäms i stället för en tid.

## Tillägg 2026-10-16: praxis och vad kakor ger

Johnny frågade vad kakor ger och om det är rimligt att länka till patientsäkerhetslagen: *"aldrig sett andra sidor göra detta … så vi inte overkillar det"*.

### Praxis: vad svenska sajter visar

Jag läste startsidorna på sex sajter ur måttstocken, varav fyra kliniker, en massagesalong och en advokatbyrå, den 16 oktober 2026:

| Sajt | Yrkestitel | Org.nr | Integritetspolicy | Kakverktyg | Lagen för yrket |
|---|---|---|---|---|---|
| Citykiropraktikern | "Legitimerad kiropraktor" som ett säljargument | nej | – | ja | nej |
| Fungera (fysioterapi) | legitimerade fysioterapeuter | nej | ja | ja | nej |
| Stångå Tandklinik | – | platshållaren "000000-00" | dataskyddspolicy och cookiepolicy | ja | nej. Menyn har sidan "Patientsäkerhet" |
| Bright Tandhälsa | – | nej | ja | ja | nej |
| Kroppsbalans | – | nej | – | nej | nej |
| Klara Advokatbyrå | – | ja | ja | nej | "Advokatsamfundsmedlemskap" under rubriken "Juridisk information" |

**Slutsats:**
- Ingen klinik länkar till lagen för yrket. Advokatbyråer visar medlemskapet i Advokatsamfundet.
- Organisationsnumret saknas ofta.
- En integritetspolicy är vanlig.
- Konsumentverket fann redan 2011 att bara 32 % av 713 granskade företag följde e-handelslagens informationskrav fullt ut. 📄 Konsumentverket via [Göteborgs stad](https://goeteborgs-stad.mynewsdesk.com/pressreleases/webbfoeretagens-kontaktuppgifter-foeljer-lagen-men-de-kan-vara-svaara-att-hitta-3131296.pdf)
- Jag hittade inga sanktioner för att uppgifterna om ett reglerat yrke saknas ⚠️.

**Lagtexten** säger ändå att informationen ska finnas *"på ett enkelt, direkt och stadigvarande sätt"*. Den kräver inte att den står i sidfoten. Kommentaren i propositionen till hur bestämmelserna ska anges har jag inte kunnat läsa ⚠️ (📄 [prop. 2001/02:150](https://lagen.nu/prop/2001/02:150)). ⚖️ En mening på en sida som sidfoten länkar till uppfyller troligen kravet utan att ta plats.

### Vad kakor ger

- **Statistik med Google Analytics:** besökarnas väg, källor och konverteringar. Kräver samtycke enligt PTS.
- **Google Ads:** konverteringar och remarketing. Googles policy för användarsamtycke kräver *"legally valid consent"* för kakor och annonsanpassning, sparade samtycken och ett tydligt sätt att återkalla. 📄 [Google EU user consent policy](https://www.google.com/about/company/user-consent-policy/). Consent Mode v2 behövs enligt leverantörerna för remarketing i EES. ⚠️ Det bygger på andrahandskällor.
- **Meta-pixeln:** konverteringar och remarketing på Facebook och Instagram. Kräver samtycke innan pixeln laddas (9 kap. 28 § LEK). Metas egna villkor kräver samtycke enligt andrahandskällor ⚠️.
- **Hur många som säger ja:** Didomi anger 84,8 % samtycke i Nordeuropa 2025. Det är en leverantörs siffra, och Sverige redovisas inte separat ⚠️. Resten av besökarna syns inte i datan.
- **Vad det kostar:**
  - en banner på mobilens första skärm, alltså där måttstocken mäter
  - skript som drar ner Lighthouse
  - policytext och register över samtycken
  - data som ändå är ofullständig
- **Vad som finns utan kakor:**
  - Google-profilen: samtal, vägbeskrivningar och klick till sajten
  - Search Console: sökord och klick
  - bokningssystemet: bokningarna, som är nordstjärnan
  - värdens serverbaserade statistik

  Det räcker för en liten firma som inte annonserar.

## Tillägg 2026-10-16: samtyckesverktyg, vårt eget mot andras

Johnny frågade om vårt eget verktyg är bäst enligt bästa praxis: *"måste ju finnas minimalistiska snygga smidiga"*.

| Verktyg | Storlek, gzip | Licens och underhåll | Consent Mode v2 | Kommentar |
|---|---|---|---|---|
| **Vårt** (`bibliotek/src/sektioner/Samtycke.astro`) | cirka 1,7 kB (skript 1,2 kB, stil 0,5 kB), mätt i bygget | eget | inte inbyggt. Taggarna laddas först efter ett ja | Stilen kommer ur kitet och texterna ur innehållet. Kontroll 6c prövar det |
| [CookieConsent v3](https://github.com/orestbida/cookieconsent) (orestbida) | cirka 15,5 kB (skript 10,2 kB, stil 5,4 kB), mätt ur npm-paketet 3.1.0 | MIT, 5,7 tusen stjärnor. Senast publicerad 2025-02-04 | med egen kod | kategorier, rensning av kakor, revisioner, översättningar och tangentbord. Förlaget säger *"Follows a11y best practices"* 📄 [dokumentationen](https://cookieconsent.orestbida.com/) |
| [Silktide Consent Manager](https://silktide.com/consent-manager/) | 53 kB skript och 11 kB stil, okomprimerat, enligt leverantören | öppen källkod. Licensen anges inte på sidan ⚠️ | inbyggt enligt leverantören | gratis, med en guide för färger och text |
| Kommersiella, som Cookiebot, CookieYes och Usercentrics | skript från tredje part | betalda | ja, och de är certifierade av Google | Skannar kakor, för logg över samtycken och har stöd för TCF. En certifierad CMP med TCF krävs för *utgivare* som visar Googles annonser (📄 [Google, AdSense](https://support.google.com/adsense/answer/13554020)). Våra kunder är *annonsörer*, och för dem är kravet enligt andrahandskällor Consent Mode, inte en certifierad CMP ⚠️ |

**Vad regler och praxis kräver av rutan:**
- **PTS:** lika lätt att neka som att godkänna, samtycke per ändamål, inga förifyllda rutor, återkallelse lika lätt som samtycke och inget före svaret.
- **CNIL**, i andrahand ([Lewis Silkin](https://www.lewissilkin.com/insights/2025/02/04/cnil-cracks-down-on-dark-patterns-in-cookie-banners-102jv0a)): neka-knappen får inte vara svagare, gömd i text eller placerad långt ifrån godkänn-knappen, och att stänga rutan är inget samtycke.
- **Branschkällor:** rutan ska inte dölja innehållet, och valpanelen ska fungera på små skärmar.

**Bedömning:**
- Vårt verktyg uppfyller kraven ovan och är cirka 9 gånger mindre än CookieConsent v3.
- Det följer sajtens kit.
- Det prövas automatiskt, och 6c fäller avsiktliga fel.
- Efter en iteration tar rutan cirka en fjärdedel av mobilens första skärm.

**Det som saknades jämfört med de mogna verktygen.** Allt tre är infört samma dag, eftersom Johnny sa *"bättre göra för mycket och bra"* (`BESLUT.md` 2026-10-16, *Samtyckesverktyget komplett*):
1. Consent Mode v2-signaler, alltså `gtag('consent', 'default'|'update', …)`, i taggarnas kod.
2. En logg över samtycken på servern, en Worker med D1, eftersom Google kräver *"Keep records of consent"*.
3. En lista över varje verktygs kakor på sidan *Integritet och kakor*, enligt PTS: namn, ändamål, tredjepart och lagringstid.

## Tillägg 2026-10-16: första lagret i samtyckesrutan, och om USA ska stå där

Johnnys fråga: *"Behöver det verkligen stå usa där? Kan vi inte formulera oss bättre?"* Kvalitetsgranskningen (fynd J1) hade föreslagit meningen "Uppgifterna kan föras över till USA" i första lagret och hänvisat till EDPB 05/2020 p. 64.

**Vad som måste stå för att samtycket ska vara informerat.** EDPB:s riktlinjer 05/2020 om samtycke räknar upp minst sex saker i p. 64:
- den personuppgiftsansvariges identitet
- ändamålet med varje behandling
- vilka slags uppgifter
- rätten att återkalla
- automatiserade beslut, där sådana finns
- (vi) *"the possible risks of data transfers due to absence of an adequacy decision and of appropriate safeguards"*

Enligt p. 65 ska andra personuppgiftsansvariga som förlitar sig på samtycket namnges, och biträden behöver inte namnges där. Enligt p. 71 får informationen ges i lager när utrymmet är litet. PTS kräver ändamål, om kakan är en tredjepartskaka, lagringstid, vilka kakor, vilka uppgifter och att samtycket kan återkallas (📄 [PTS, Kakor](https://pts.se/internet-och-telefoni/kakor-cookies/), läst 2026-10-16). PTS säger inte att allt måste stå i första lagret, och nämner inte tredje land. Googles policy för användarsamtycke kräver att varje part som tar emot uppgifter namnges, men nämner inte USA (📄 [Google, EU user consent policy](https://www.google.com/about/company/user-consent-policy/)).

**USA.** Punkt vi gäller bara när ett adekvansbeslut och skyddsåtgärder enligt art. 46 saknas. Kommissionens beslut om Data Privacy Framework från den 10 juli 2023 är ett adekvansbeslut för certifierade organisationer (📄 [EDPB, informationsblad om adekvansbeslutet](https://www.edpb.europa.eu/system/files/2024-12/edpb_informationnoteadequacydecisionus_sv.pdf)). Google LLC har certifierat sig (📄 [Google, Privacy frameworks](https://policies.google.com/privacy/frameworks), läst 2026-10-16), och det har Meta Platforms också (📄 [Metas DPF-meddelande](https://privacycenter.instagram.com/policies/data_privacy_framework), gällande från 2024-07-30). Överföringen ska alltså stå i integritetspolicyn (GDPR art. 13.1 f, att ett adekvansbeslut finns), men behöver inte stå i rutan ⚖️ (tolkning, inte juridisk rådgivning). Tribunalen avslog talan mot ramverket den 3 september 2025 i Latombe mot kommissionen. Överklagandet C-703/25 P är inte avgjort, och faller ramverket prövas frågan igen (📄 [WilmerHale 2025-12-01](https://www.wilmerhale.com/insights/blogs/wilmerhale-privacy-and-cybersecurity-law/20251201-european-court-of-justice-to-review-challenge-to-eu-us-data-privacy-framework)).

**Praxis.** Svenska rutor skriver ofta *"vi och våra partners"* utan att nämna några partner, och några nämner USA i policyn som tredje land utan tillräckligt skydd. Det senare stämmer inte för certifierade mottagare sedan 2023. CNIL:s exempel på första lagret är en mening per ändamål med webbplatsen och "tredje parter" som subjekt, och listan över parter finns ett klick bort. Det är andrahandsuppgifter, eftersom CNIL:s egen text inte gick att läsa.

**Den nya texten** följer p. 64–65 i en mening per sak: *"Kliniken vill använda kakor för statistik och annonser. Då får Google och Meta uppgifter om ditt besök. Du kan ändra dig när som helst under Kakinställningar längst ner."* Därtill länken *Läs mer om kakor*. Lagringstid, tredjepartskakor och USA står i kaklistan och på integritetssidan.
