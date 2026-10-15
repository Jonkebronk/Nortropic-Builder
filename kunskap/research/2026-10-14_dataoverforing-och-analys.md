---
titel: "Dataöverföring till USA, webbanalys och samtycke – Cloudflare, Google, Resend, Supabase för små svenska kundsajter"
datum: 2026-10-14
kallor:
  - https://curia.europa.eu/site/upload/docs/application/pdf/2025-09/cp250106en.pdf
  - https://eur-lex.europa.eu/legal-content/EN/TXT/PDF/?uri=CELEX%3A62023TJ0553
  - https://eur-lex.europa.eu/eli/C/2025/6610/oj/eng
  - https://www.edpb.europa.eu/system/files/2026-08/edpb_letter_20260731_us_supremecourt_judgment_trump_v_slaughter_en.pdf
  - https://www.edpb.europa.eu/documents/edpb-correspondence/edpb-letter-to-the-european-commission-on-us-supreme-court-judgment_en
  - https://www.edpb.europa.eu/system/files/documents/2024-10/edpb_guidelines_202302_technical_scope_art_53_eprivacydirective_v2_en_0.pdf
  - https://commission.europa.eu/law/law-topic/data-protection/international-dimension-data-protection/adequacy-decisions_en
  - https://www.imy.se/verksamhet/dataskydd/det-har-galler-enligt-gdpr/overforing-till-tredje-land/overforingar-till-usa/
  - https://www.imy.se/nyheter/fyra-bolag-maste-sluta-anvanda-google-analytics/
  - https://www.imy.se/nyheter/kammarratten-bekraftar-sanktionsavgift-for-tele2/
  - https://www.riksdagen.se/sv/dokument-och-lagar/dokument/svensk-forfattningssamling/lag-2022482-om-elektronisk-kommunikation_sfs-2022-482/
  - https://pts.se/internet-och-telefoni/kakor-cookies/
  - https://www.dataprivacyframework.gov/participant/5666
  - https://www.dataprivacyframework.gov/participant/5780
  - https://www.dataprivacyframework.gov/list
  - https://www.cloudflare.com/cloudflare-customer-dpa/
  - https://www.cloudflare.com/web-analytics/
  - https://developers.cloudflare.com/web-analytics/data-metrics/data-origin-and-collection/
  - https://developers.cloudflare.com/data-localization/
  - https://developers.cloudflare.com/data-localization/compatibility/
  - https://developers.cloudflare.com/data-localization/region-support/
  - https://business.safety.google/adsprocessorterms/
  - https://business.safety.google/adsdatatransfers/
  - https://business.safety.google/adsservices/
  - https://support.google.com/analytics/answer/12017362
  - https://www.google.com/about/company/user-consent-policy/
  - https://resend.com/legal/dpa
  - https://resend.com/docs/dashboard/domains/regions
  - https://supabase.com/legal/dpa
  - https://supabase.com/privacy
  - https://supabase.com/docs/guides/platform/regions
status: "research, inte juridisk rådgivning"
---

# Dataöverföring till USA, webbanalys och samtycke

> **Status: research, inte juridisk rådgivning.** Underlaget är insamlat 2026-10-14/15 från primärkällor där det gått. Andrahandskällor är uttryckligen markerade **[andrahand]**. Citat på engelska återges ordagrant; svenska sammanfattningar är våra egna. Allt som inte kunnat beläggas med primärkälla är markerat **ej bekräftat**. Låt en jurist granska slutsatserna i avsnitt 5 innan de används i avtal eller kundpolicyer.

## Sammanfattning (TL;DR)

- **EU–US Data Privacy Framework (DPF) gäller i oktober 2026.** Tribunalen ogillade Latombes talan 3 september 2025 (T-553/23). Överklagandet till EU-domstolen (C-703/25 P, inkommet 31 oktober 2025) är **anhängigt**. Ny risk sedan sommaren 2026: USA:s högsta domstol avgjorde *Trump v. Slaughter* 29 juni 2026, och EDPB bad 31 juli 2026 kommissionen att utreda om DPF påverkas. Adekvansbeslutet (EU) 2023/1795 har inte upphävts.
- **IMY 2023:** Tele2 fick 12 MSEK och CDON 300 000 kr i sanktionsavgift för Google Analytics (överföring utan tillräckligt skydd före DPF). Kammarrätten fastställde Tele2-beslutet (IMY-nyhet 16 oktober 2025). IMY skriver där att det **numera finns** ett adekvansbeslut för mottagare som omfattas av DPF. Google LLC är aktivt DPF-certifierat. Överföringsfrågan för GA4 är alltså i dag i huvudsak löst, så länge DPF står sig.
- **Cookie-/samtyckesregeln (LEK 9 kap. 28 §) är fortfarande det stora hindret för GA4.** GA4 kräver samtycke. Det framgår också av Googles egen samtyckespolicy.
- **Cloudflare, Google och Resend är aktivt DPF-certifierade** (Cloudflare och Resend med status "Active – Re-certification under Review"). **Supabase hittades inte** i DPF-listan och anger själv SCC som grund. Alla fyra erbjuder DPA/biträdesvillkor med SCC.
- **Cloudflare Web Analytics** använder enligt Cloudflare inga cookies eller localStorage. Om det räcker för att slippa samtycke enligt svensk rätt är **osäkert**: EDPB:s riktlinjer 2/2023 omfattar även JavaScript som får webbläsaren att skicka information.

---

## 1. EU–US Data Privacy Framework – status oktober 2026

### 1.1 Grunden
- Kommissionens genomförandebeslut (EU) 2023/1795 antogs 10 juli 2023. IMY: *"Den 10 juli 2023 fattade EU-kommissionen ett nytt beslut om adekvat skyddsnivå för USA, förutsatt att mottagaren omfattas av EU–U.S. Data Privacy Framework."* (https://www.imy.se/verksamhet/dataskydd/det-har-galler-enligt-gdpr/overforing-till-tredje-land/overforingar-till-usa/, senast uppdaterad 15 juni 2026)
- IMY om vad beslutet innebär: *"det därmed är tillåtet att överföra personuppgifter till USA, utan att vidta lämpliga skyddsåtgärder enligt artikel 46 i dataskyddsförordningen (till exempel standardavtalsklausuler eller bindande företagsbestämmelser), förutsatt att den mottagande organisationen omfattas av EU–U.S. Data Privacy Framework."* (samma sida)
- IMY om kompletterande åtgärder: *"En överföring som sker med stöd av ett beslut om adekvat skyddsnivå behöver inte kompletteras av så kallade ytterligare skyddsåtgärder (enligt Schrems II-domen och EDPB:s rekommendationer 01/2020)."* (samma sida)
- Kommissionens sida om adekvansbeslut listar fortfarande USA (*"commercial organisations participating in the EU-US Data Privacy Framework"*): https://commission.europa.eu/law/law-topic/data-protection/international-dimension-data-protection/adequacy-decisions_en
- Kommissionens första periodiska översyn publicerades 9 oktober 2024 (enligt kommissionens sida ovan). Nästa översyn ska enligt **[andrahand]** ske 2027; **ej bekräftat i primärkälla**.

### 1.2 Latombe-målet (T-553/23), tribunalen
- **Dom: 3 september 2025**, tribunalen (tionde avdelningen i utökad sammansättning), mål T-553/23 *Latombe mot kommissionen*. Domstolens pressmeddelande nr 106/25, Luxemburg 3 september 2025: https://curia.europa.eu/site/upload/docs/application/pdf/2025-09/cp250106en.pdf. Domen i fulltext: https://eur-lex.europa.eu/legal-content/EN/TXT/PDF/?uri=CELEX%3A62023TJ0553
- Citat ur pressmeddelandet: *"The General Court dismisses the action for annulment."* Domstolen *"confirms that, on the date of adoption of the contested decision, the United States of America ensured an adequate level of protection for personal data transferred from the European Union to organisations in that country"*.
- Om DPRC: *"judges of the DPRC may be dismissed only by the Attorney General and only for cause, and the Attorney General and intelligence agencies may not hinder or improperly influence their work."*
- Om massinsamling: *"there is nothing in Schrems II to suggest that that collection must necessarily be subject to prior authorisation issued by an independent authority. Rather, it is clear from that judgment that the decision authorising such collection must, at a minimum, be subject to ex post judicial review."*
- Viktig reservation i domen: *"if the legal framework in force in the United States at the time of the adoption of the contested decision changes, the Commission may decide, if necessary, to suspend, amend or repeal the contested decision or to limit its scope."* Prövningen avsåg alltså läget **när beslutet antogs** (juli 2023).

### 1.3 Överklagandet till EU-domstolen (C-703/25 P)
- *"Appeal brought on 31 October 2025 by Philippe Latombe against the judgment of the General Court … delivered on 3 September 2025 in Case T-553/23"*, publicerat i EUT C/2025/6610: https://eur-lex.europa.eu/eli/C/2025/6610/oj/eng. Rättegångsspråk är franska enligt **[andrahand]**.
- Status: **anhängigt.** Vi har inte kunnat bekräfta något förhandlingsdatum, förslag till avgörande eller någon dom i primärkälla. InfoCuria-sidan gick inte att läsa maskinellt.
- **[andrahand]** DataGuidance uppger att domstolens ordförande 4 juni 2026 tillät Microsoft att intervenera till stöd för kommissionen (https://www.dataguidance.com/news/eu-cjeu-admits-microsoft-intervener-appeal-concerning). **Ej bekräftat i primärkälla.**
- **[andrahand]** Kommentatorer bedömer att ett avgörande tidigast kommer i slutet av 2026 eller 2027. Det är en spekulativ bedömning.

### 1.4 Ny händelse 2026: *Trump v. Slaughter* och EDPB:s brev
- EDPB:s ordförande Anu Talus skrev 31 juli 2026 till kommissionär Michael McGrath: https://www.edpb.europa.eu/system/files/2026-08/edpb_letter_20260731_us_supremecourt_judgment_trump_v_slaughter_en.pdf
  - *"On 29 June 2026, the US Supreme Court delivered judgment in Trump v. Slaughter, overruling the Humphrey's Executor case."* (Supreme Court No. 25-332)
  - *"The EDPB respectfully notes that the European Commission, in the adequacy decision underpinning the EU-US Data Privacy Framework ('DPF'), explicitly refers to the independence of the US authorities, including the FTC and that its five Commissioners may only be removed by the President for inefficiency, neglect of duty, or malfeasance in office."*
  - *"the EDPB asks the European Commission to closely assess whether this development affects the functioning of Commission Implementing Decision EU 2023/1795 and would welcome relevant actions, including the continued sharing of information with the EDPB in a timely manner."*
- Kommissionens svar: **ej bekräftat.** Vi har inte hittat något primärkällesvar. Enligt **[andrahand]** (IAPP m.fl.) har kommissionen sagt att den analyserar domen och fortsätter att övervaka DPF.
- Samlad bedömning: **DPF gäller i dag.** Det finns två öppna riskspår: EU-domstolen i C-703/25 P och kommissionens bedömning efter *Slaughter*. FTC-frågan rör tillsynen av företagens DPF-åtaganden, inte DPRC direkt. Hur tungt den väger juridiskt är **osäkert**.

### 1.5 Praktisk följd
Planera för att DPF kan falla, vilket hände Safe Harbor 2015 och Privacy Shield 2020. Välj leverantörer vars DPA **automatiskt** faller tillbaka på SCC om DPF-certifieringen upphör. Det gör Cloudflare och Google uttryckligen (se 3.1 och 3.2). En SCC-överföring kräver dock en egen överföringsbedömning (TIA), och det var just den som underkändes för GA i IMY-ärendena.

---

## 2. IMY och Google Analytics

### 2.1 Besluten 2023
IMY-nyhet *"Fyra bolag måste sluta använda Google Analytics"*, **publicerad 3 juli 2023**: https://www.imy.se/nyheter/fyra-bolag-maste-sluta-anvanda-google-analytics/
- *"Bolagen som granskats är CDON, Coop, Dagens Industri och Tele2. Granskningarna avser en version av Google Analytics från 14 augusti 2020."*
- *"IMY utfärdar sanktionsavgift mot två av bolagen. Ett av bolagen har på eget initiativ nyligen slutat använda statistikverktyget medan IMY förelägger övriga tre att också sluta använda det."* Tele2 fick 12 miljoner kronor och CDON 300 000 kronor (sanktionsbeloppen enligt samma nyhet och IMY:s sammanfattning).
- *"IMY anser i sina granskningar att de uppgifter som överförs till USA via Googles statistikverktyg är personuppgifter eftersom uppgifterna kan sammankopplas med övriga unika uppgifter som överförs. Myndigheten anser även att de tekniska skyddsåtgärder som bolagen har vidtagit inte är tillräckliga för att säkerställa en skyddsnivå som i huvudsak motsvarar den som garanteras inom EU/EES."*
- Besluten var riktade mot de fyra bolagen. Något generellt förbud för alla svenska verksamheter beslutades inte, men principerna gällde alla som använde GA på samma sätt före DPF.

### 2.2 Efter DPF
IMY-nyhet *"Kammarrätten bekräftar sanktionsavgift för Tele2"*, **publicerad 16 oktober 2025**: https://www.imy.se/nyheter/kammarratten-bekraftar-sanktionsavgift-for-tele2/
- *"Kammarrätten har nu gett IMY rätt."*
- *"Tillsynen av Tele2 avser förhållanden under augusti 2020 till och med maj 2023. Numera finns ett beslut från EU-kommissionens om att USA säkerställer en adekvat skyddsnivå för överföring av personuppgifter till mottagare som omfattas av Data Privacy Framework-avtalet (DPF) mellan EU och USA, det så kallade adekvansbeslutet."*

Vi har inte hittat något IMY-uttalande som säger att GA4 uttryckligen är "tillåtet" eller "otillåtet" efter DPF (**ej bekräftat**). IMY:s USA-sida (uppd. 15 juni 2026) nämner varken Google Analytics eller Latombe.

### 2.3 Vad det innebär för GA4 på kundsajter idag
1. **Överföring till USA:** Google LLC är aktivt DPF-certifierat (se 3.2), och Google anger att man sedan 1 september 2023 stöder sig på EU-DPF för överföringar från Ads-tjänster, där Google Analytics ingår. Den direkta grunden för IMY:s beslut 2023 (otillräckliga skyddsåtgärder vid SCC-överföring) är därmed i huvudsak hanterad **så länge DPF gäller**. Faller DPF är vi tillbaka i 2023 års läge.
2. **Samtycke:** GA4 sätter cookies/lagrar och läser data i webbläsaren. Det kräver samtycke enligt LEK 9 kap. 28 § (se avsnitt 4), oberoende av DPF.
3. **Googles egna krav:** Googles EU User Consent Policy kräver att kunden inhämtar *"legally valid consent to: the use of cookies or other local storage where legally required; and the collection, sharing, and use of personal data for personalization of ads"* och *"retain records of consent given by end users"* (https://www.google.com/about/company/user-consent-policy/).
4. **Minimering:** Google uppger att *"Google Analytics does not log or store IP addresses from EU, Switzerland, or UK users"* och att Google-signals samt detaljerad plats-/enhetsdata kan stängas av per region (https://support.google.com/analytics/answer/12017362). Det minskar risken men ändrar inte att samtycke krävs.

---

## 3. Leverantörerna

Kontroll i DPF-listan gjordes 2026-10-15 via https://www.dataprivacyframework.gov/list. Sidan är JavaScript-renderad och lästes med webbläsare.

| Leverantör | DPF-status (EU–US) | DPA med SCC | Var data behandlas/lagras |
|---|---|---|---|
| Cloudflare, Inc. | **Active – Re-certification under Review**, nästa förfallodag 09/15/2027, HR + Non-HR | Ja, DPA v6.4 (gäller fr.o.m. 3 april 2026) med EU-SCC som reserv | Globalt edge-nät. EU-avgränsning via Data Localization Suite kräver Enterprise-tillägg |
| Google LLC | **Active**, nästa förfallodag 09/13/2027, HR + Non-HR | Ja, Google Ads Data Processing Terms (GA ingår) med SCC som reserv | EU-trafik loggas via EU-servrar och IP tas bort. Vidare till USA under DPF |
| Resend (Plus Five Five, Inc.) | **Active – Re-certification under Review** (EU–US + UK-tillägget), Non-HR | Ja, DPA (uppd. 31 dec 2025) med EU-SCC modul 1–3 | Utskick kan ske från Irland (eu-west-1), men **all kontodata inkl. e-postmetadata och loggar lagras i USA** |
| Supabase, Inc. | **Inte hittad** i listan (sökning "Supabase" gav "Query returned no results") | Ja, DPA med SCC som accepteras genom avtalet | Kunden väljer region, bl.a. Stockholm (eu-north-1) och Frankfurt. Bolaget och vissa underbiträden finns i USA |

### 3.1 Cloudflare
- **DPF:** Deltagarsida https://www.dataprivacyframework.gov/participant/5666: *"EU-U.S. Data Privacy Framework : Active - Re-certification under Review"*, original certification date 11/09/2016, *"Next Certification Due Date 09/15/2027"*. Statusen betyder att förnyelsen granskas men att deltagandet är aktivt. Den exakta innebörden har inte kontrollerats mot Commerce-definitioner.
- **DPA** (https://www.cloudflare.com/cloudflare-customer-dpa/, *"Version 6.4, effective April 3, 2026"*, gäller även Self-Serve Subscription Agreement):
  - 6.4: *"Customer acknowledges that Cloudflare complies with the Data Privacy Framework and that transfers of Customer Data to Cloudflare made under the Data Privacy Framework shall not be a Restricted Transfer. Cloudflare will notify Customer if its Data Privacy Framework certification lapses or is otherwise invalidated, in which instance any transfers of Personal Data from Customer to Cloudflare shall immediately be deemed a Restricted Transfer and the provisions of Section 6.2 shall apply."*
  - 6.2: *"…then the appropriate standard contractual clauses and additional safeguards shall apply"*. EU-SCC definieras som kommissionens beslut 2021/914.
- **Var data behandlas:** Data Localization Suite (DLS) är enligt https://developers.cloudflare.com/data-localization/ (uppd. 5 maj 2026) en *"Enterprise-only paid add-on"*. Den styr *"where Cloudflare inspects and stores data"* genom tre delar: Geo Key Manager, Regional Services (*"Controls which Cloudflare data centers can decrypt and process your HTTPS traffic"*) och Customer Metadata Boundary (*"Controls which region stores your logs and analytics data"*). CMB kan sättas till *"the United States or the European Union. By default no boundary is applied."* (https://developers.cloudflare.com/data-localization/region-support/)
  - Slutsats: på Free, Pro och Workers Paid behandlas trafik på Cloudflares globala nät, och loggar/analysdata har ingen regional gräns.
  - Kompatibilitet (https://developers.cloudflare.com/data-localization/compatibility/, uppd. 12 okt 2026): Workers på zon: Regional Services ✅, CMB 🚧. Pages: ✅ endast med Custom Domain satt till region. `workers.dev` är ✘ för alla tre. **Web Analytics/RUM är ✘ för Customer Metadata Boundary.** Web Analytics-data kan alltså inte begränsas till EU ens med Enterprise.

### 3.2 Google (GA4, Search Console)
- **DPF:** https://www.dataprivacyframework.gov/participant/5780: *"EU-U.S. Data Privacy Framework : Active"*, original certification date 09/22/2016, *"Next Certification Due Date 09/13/2027"*. Certifieringen *"applies to Google LLC and its wholly-owned U.S. subsidiaries"*.
- **Google om överföringar** (https://business.safety.google/adsdatatransfers/, version 9 september 2024): *"As of 1 September 2023, when our clients and partners use Google's Ads Services, Google relies on the EU - U.S. Data Privacy Framework (EU DPF) to transfer EEA personal information to the US."* Vidare: *"Google may rely on SCCs for certain data transfers in connection with our advertising and analytics products where it has not adopted, or is no longer adopting, a legal framework (such as the EU - U.S. Data Privacy Framework)"*.
- **DPA:** Google Ads Data Processing Terms (https://business.safety.google/adsprocessorterms/) gäller för *"Google Analytics"* enligt listan på https://business.safety.google/adsservices/. Villkoren definierar *"Alternative Transfer Solution"* (t.ex. DPF). Har Google inte antagit eller slutar Google tillämpa en sådan, gäller SCC (bilaga 3A, p. 7). Villkoren accepteras i GA-kontots inställningar; den exakta UI-vägen i GA4 är **ej bekräftad** här.
- **Search Console:** Ingen kod körs hos besökarna (verifiering via DNS/meta), så det påverkar inte samtycke för slutanvändare. Detta är vår bedömning.

### 3.3 Resend
- **DPF:** Listan visar *"Resend – San Francisco, CA"* med *"EU-U.S. Data Privacy Framework – Active - Re-certification under Review – Non-HR Data"* samt UK-tillägget. Resends DPA 11.1: *"The Company complies with the EU-U.S. Data Privacy Framework (EU-U.S. DPF) and the UK Extension to the EU-U.S. DPF … The Company has certified to the U.S. Department of Commerce that it adheres to the EU-U.S. Data Privacy Framework Principles"*. Juridisk person: *"Plus Five Five, Inc."* (https://resend.com/legal/privacy-policy, uppd. 27 aug 2026).
- **DPA med SCC** (https://resend.com/legal/dpa, *"Last update: December 31st, 2025"*): 6.2 *"Ex-EEA Transfers. The parties agree that ex-EEA Transfers are made pursuant to the EU SCCs, which are deemed entered into (and incorporated into this DPA by this reference)"*. Modul 2 gäller när kunden är personuppgiftsansvarig, modul 3 när kunden är biträde. 6.3.9: *"By entering into this DPA, the parties are deemed to have signed the EU SCCs"*. Irländsk lag styr SCC.
- **Region** (https://resend.com/docs/dashboard/domains/regions): sändregioner är *"North Virginia (us-east-1), Ireland (eu-west-1), São Paulo (sa-east-1), Tokyo (ap-northeast-1)"*. Viktigt: *"Region selection controls where your emails are routed and sent from. It does not control where customer data is stored. All account data, including email metadata, logs, and API records, is stored in the United States regardless of the sending region you select."*
  - Följd: formulärdata som skickas via Resend (namn, e-post, telefon, meddelande) överförs till USA. Grunden är DPF, med SCC i DPA:n som reserv.

### 3.4 Supabase
- **DPF:** Sökningen "Supabase" i DPF-listan 2026-10-15 gav *"Query returned no results."* Supabases integritetspolicy (https://supabase.com/privacy) anger för USA: *"The transfer is subject to standard contractual clauses approved by the European Commission"*. Det gäller även Singapore. Supabase stöder sig alltså på SCC, inte DPF.
- **DPA** (https://supabase.com/legal/dpa): *"The Standard Contractual Clauses shall, as further set out in Schedule 2, apply to the transfer of any Covered Data from Customer to Supabase, and form part of this DPA, to the extent that: (a) the GDPR or Swiss Data Protection Laws apply to the Customer when making that transfer"*. 12.2: *"The Parties agree that acceptance of the Agreement shall have the same effect as signing the SCCs."*
- **Region** (DPA klausul 6): *"Where Customer directs Supabase to Process Covered Data in a specific geographical region, Supabase shall ensure that such Covered Data is stored and primarily Processed in that region unless otherwise required to comply with Customer's additional instructions, applicable law or as necessary to provide Services requested by Customer."* Tillgängliga regioner (https://supabase.com/docs/guides/platform/regions) är bl.a. *"North EU (Stockholm) eu-north-1"*, *"Central EU (Frankfurt) eu-central-1"*, *"West EU (Ireland) eu-west-1"*.
  - Följd: även med EU-region finns en överföringskomponent till USA (amerikanskt bolag, support, underbiträden) som vilar på **SCC och kräver en egen TIA**. Det är samma mekanism som underkändes för GA 2023, men risknivån beror på datatyp och åtkomst. Underbiträdeslistan har inte granskats här (**ej bekräftat**).

### 3.5 GitHub
Ej undersökt i denna research. GitHub hanterar normalt bara vår källkod och inte kundsajternas besökardata, om inte formulärdata eller loggar hamnar i repot (det ska de inte).

---

## 4. Cookies och samtycke i Sverige

### 4.1 Lagtext: lagen (2022:482) om elektronisk kommunikation, 9 kap. 28 §
Källa: https://www.riksdagen.se/sv/dokument-och-lagar/dokument/svensk-forfattningssamling/lag-2022482-om-elektronisk-kommunikation_sfs-2022-482/. Texten är ändrad t.o.m. SFS 2026:1681 enligt sidan, men 28 § har ingen ändringshänvisning.

> **28 §** Uppgifter får lagras i eller hämtas från en abonnents eller användares terminalutrustning endast om abonnenten eller användaren får tillgång till information om ändamålet med behandlingen och samtycker till den.
> Trots att samtycke inte har lämnats är sådan lagring eller åtkomst tillåten som
> 1. behövs för överföring av ett elektroniskt meddelande via ett elektroniskt kommunikationsnät, eller
> 2. är nödvändig för tillhandahållande av en tjänst på uttrycklig begäran av användaren eller abonnenten.

Straff (13 kap. 2 § andra stycket): *"Den som med uppsåt eller av oaktsamhet lagrar eller hämtar uppgifter i strid med 9 kap. 28 § ska dömas till böter, om gärningen inte är belagd med straff enligt brottsbalken. Om det rör sig om ringa fall utgör gärningen dock inte brott."*

PTS (https://pts.se/internet-och-telefoni/kakor-cookies/, uppd. 2024-05-14): *"För att få använda kakor (cookies) på din webbplats måste du först fråga om samtycke. Samtycke ska användaren bland annat lämna aktivt och kunna återkalla om hen ångrar sig. Undantaget är nödvändiga kakor."* PTS nämner uttryckligen kakor *"som samlar in statistik om hur en webbplats används"*. PTS har bedrivit tillsyn och fattat vägledande beslut 2022–2023.

### 4.2 Krävs samtycke för GA4?
**Ja.** GA4 lagrar och läser identifierare (cookies) i webbläsaren för statistik. Det är inte nödvändigt för en tjänst som användaren uttryckligen begärt, så undantaget i 28 § andra stycket p. 2 gäller inte. PTS:s vägledning pekar uttryckligen ut statistikkakor. Googles egen policy kräver samtycke och sparade samtyckesuppgifter. "Consent Mode" utan samtycke (cookieless pings) har inte analyserats här, och om det räcker juridiskt är **ej bekräftat**. Behandla det inte som ett sätt att slippa samtycke utan juristbedömning.

### 4.3 Cloudflare Web Analytics: banner-fritt?
**Vad Cloudflare säger (primärkälla):**
- *"Cloudflare Web Analytics does not use any client-side state, such as cookies or localStorage, to collect usage metrics. We also don't "fingerprint" individuals via their IP address, User Agent string, or any other data for the purpose of displaying analytics."* (https://www.cloudflare.com/web-analytics/)
- *"Web Analytics collects the minimum amount of information - timing metrics - to show customers how their websites perform. Cloudflare does not track individual end users across our customers' Internet properties."* Beacon-skriptet laddas från `static.cloudflareinsights.com`. Data skickas till `https://<domän>/cdn-cgi/rum` för proxade sajter eller `https://cloudflareinsights.com/cdn-cgi/rum` annars. (https://developers.cloudflare.com/web-analytics/data-metrics/data-origin-and-collection/)
- Var datan lagras: Web Analytics/RUM är *"✘ Not compatible"* med Customer Metadata Boundary, så den kan inte begränsas till EU. Den exakta lagringsplatsen är **ej bekräftad**.

**Det osäkra:** EDPB:s riktlinjer 2/2023 om den tekniska räckvidden av art. 5.3 i ePrivacy-direktivet (version 2.0, antagen 7 oktober 2024), som LEK 9:28 genomför, säger: *"Additional examples would include JavaScript code, where the accessing entity instructs the browser of the user to send asynchronous requests with the targeted information. Such access clearly falls within the scope of Article 5(3) ePD, as the accessing entity explicitly instructs the terminal equipment to send the information."* (https://www.edpb.europa.eu/system/files/documents/2024-10/edpb_guidelines_202302_technical_scope_art_53_eprivacydirective_v2_en_0.pdf)

Cloudflares beacon är JavaScript som läser Performance API-data i webbläsaren och skickar den med `sendBeacon`. Enligt EDPB:s synsätt kan det vara "hämtning från terminalutrustning" **även utan cookies**. Svensk rätt har inget uttryckligt undantag för publikmätning. **Bedömning: osäkert.** Cookiefritt betyder inte automatiskt samtyckesfritt. Risken bedöms lägre än för GA4 eftersom inga identifierare sparas och ingen spårning sker mellan sajter, men vi har inte hittat något uttalande från PTS, IMY eller en domstol som bekräftar att Cloudflare Web Analytics får köras utan samtycke.

**Alternativ med lägre risk:** Cloudflares **edge-analys** (zonens Analytics-flik) bygger på serverloggar och kör ingen kod i besökarens webbläsare. Cloudflare: *"Cloudflare's edge analytics cannot be blocked because we can measure every request that is received. Edge analytics are available to any customer who proxies traffic through Cloudflare."* (https://developers.cloudflare.com/web-analytics/faq/). Ingen lagring eller hämtning sker i terminalutrustningen, så 9:28 bör inte aktualiseras. Detta är vår bedömning. GDPR gäller fortfarande för IP-loggarna, men där är Cloudflare biträde.

### 4.4 På gång: Digital Omnibus
**[andrahand]** Kommissionen föreslog i november 2025 ("Digital Omnibus") att flytta reglerna om åtkomst till terminalutrustning in i GDPR (ny art. 88a), med undantag från samtycke för bl.a. aggregerad publikmätning. Enligt andrahandskällor är förslaget inte antaget i oktober 2026. Rådets kompromiss i juni 2026 ska ha strukit art. 88b. **Inget av detta är bekräftat i primärkälla här.** Gällande rätt är LEK 9:28 tills vidare.

---

## 5. Slutsatser för oss (vår bedömning, inte juridisk rådgivning)

### 5.1 Uppsättning med minst juridisk friktion för små svenska kunder
1. **Hosting:** Cloudflare Workers/Pages på kundens egen domän (proxad zon, inte `workers.dev`). DLS är för dyrt för småkunder (Enterprise). Vi accepterar global edge-behandling med DPF som grund och SCC i Cloudflares DPA som automatisk reserv.
2. **Analys, förstahandsval:** Cloudflares serverbaserade **edge-analys** (ingen JavaScript och inga cookies). Ger ingen samtyckesbanner och ingen extra leverantör.
3. **Analys, andrahandsval:** Cloudflare Web Analytics (beacon). Låg risk men **inte bekräftat banner-fritt**. Antingen informerar vi tydligt och accepterar den kvarvarande risken efter kundens beslut, eller så lägger vi den bakom samtycke.
4. **GA4:** Bara när kunden verkligen behöver det (t.ex. Google Ads-konverteringar). Då krävs alltid en samtyckesbanner (aktivt opt-in, lika lätt att neka, återkallelse, sparat samtycke), Googles DPA accepterad, Google-signals avstängt och dokumenterad DPF-grund. Kunden behöver veta att GA4 är den del som är mest beroende av DPF.
5. **Search Console:** Inga åtgärder mot besökare. Verifiera via DNS.
6. **Formulär-e-post (Resend):** Fungerar med DPF och DPA. EU-sändregionen ändrar inte att metadata och loggar lagras i USA. Minimera innehållet (bara det som behövs) och logga inte formulärinnehåll i egna system. Ett EU-baserat alternativ för helt EU-lagrad drift är inte undersökt här.
7. **Supabase:** Använd bara när det behövs. Välj `eu-north-1` (Stockholm) eller `eu-central-1`. Supabase saknar DPF, så vi måste göra och spara en **TIA** för SCC-överföringen. För enkla formulär- och broschyrsajter rekommenderar vi ingen databas alls.

### 5.2 Vad integritetspolicyn måste innehålla (GDPR art. 13, sammanfattat)
- Personuppgiftsansvarig (kunden): namn, org.nr, kontaktuppgifter.
- Ändamål och **rättslig grund** per behandling: formulärkontakt (berättigat intresse eller avtal), serverloggar/säkerhet (berättigat intresse), analys (samtycke om GA4).
- Mottagare/kategorier av mottagare: Cloudflare (hosting/CDN/säkerhet), Resend (e-postleverans), Google (om GA4), Supabase (om det används), samt vår byrå som underbiträde vid förvaltning.
- **Tredjelandsöverföring:** att uppgifter överförs till USA och på vilken grund (adekvansbeslut/DPF för Cloudflare, Google och Resend; SCC för Supabase), och hur man får en kopia eller information om skyddsåtgärderna.
- Lagringstider per kategori (t.ex. hur länge formulärärenden sparas, GA4:s lagringsinställning).
- De registrerades rättigheter: tillgång, rättelse, radering, begränsning, invändning, dataportabilitet, återkallelse av samtycke, och rätten att klaga till **IMY**.
- Separat **cookieinformation** enligt PTS: vilka kakor, ändamål, om de är tredjepartskakor, lagringstid och hur samtycket återkallas.

### 5.3 Biträdesavtal som behövs
| Relation | Avtal | Kommentar |
|---|---|---|
| Kund (PuA) → vår byrå (biträde) | **Eget biträdesavtal (art. 28)**, som vi skriver | Vi har åtkomst till formulärdata, loggar och konton. Bilaga med underbiträden: Cloudflare, Resend, Google, Supabase, GitHub. |
| Cloudflare | Cloudflare Customer DPA v6.4 | Gäller även self-serve. Notera att DPF-bortfall automatiskt ger SCC. |
| Google (GA4) | Google Ads Data Processing Terms | Accepteras i GA-kontot. Gäller GA enligt Googles tjänstelista. |
| Resend | Resend DPA (31 dec 2025) | SCC modul 2/3 inkorporerade. Kontrollera om aktivt godkännande behövs (**ej bekräftat**). |
| Supabase | Supabase DPA | SCC accepteras genom avtalet. **TIA krävs.** |

Organisatoriskt: kontona bör om möjligt ligga på **kundens** namn, så att kunden blir avtalspart och PuA direkt mot leverantörerna. Då behövs en tydlig rollfördelning i vårt biträdesavtal. Ligger kontona på byrån blir leverantörerna våra underbiträden och kräver kundens godkännande enligt art. 28.2.

### 5.4 Bevakningslista
- EU-domstolen C-703/25 P (förhandling, generaladvokatens förslag, dom).
- Kommissionens svar på EDPB-brevet om *Trump v. Slaughter*, och ett eventuellt beslut om att tillfälligt upphäva eller ändra 2023/1795.
- Kommissionens nästa periodiska översyn av DPF.
- Digital Omnibus (art. 88a, undantag för publikmätning).
- Resends och Cloudflares DPF-status ("Re-certification under Review").
- Eventuellt uttalande från PTS eller IMY om cookiefri analys.

---

## Osäkerheter och luckor (samlat)
- C-703/25 P: inget förhandlingsdatum eller förslag till avgörande bekräftat. Microsofts intervention bygger enbart på andrahandskälla.
- Kommissionens svar på EDPB-brevet 31 juli 2026 är **ej bekräftat**.
- Om Cloudflare Web Analytics (beacon) faller under LEK 9:28 är **osäkert**. EDPB-riktlinjerna talar för att JavaScript-baserad hämtning omfattas.
- Var Cloudflare Web Analytics-data lagras är **ej bekräftat**.
- Om Google Consent Mode utan samtycke håller juridiskt har inte utretts.
- Supabases och Resends underbiträdeslistor har inte granskats.
- Innebörden av DPF-statusen "Active – Re-certification under Review" har inte kontrollerats mot Commerce-definitioner. Den visas som aktiv.
- Digital Omnibus bygger enbart på andrahandskällor.
