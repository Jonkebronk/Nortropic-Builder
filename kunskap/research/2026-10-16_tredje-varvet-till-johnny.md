# Tredje varvet: det som väntar på Johnny

**Datum:** 2026-10-16, omkring 18.30. **Beslutet:** `BESLUT.md` 2026-10-16, *Kompetensinventeringen görs klar* (omkring 17.35): faktarättelser och förtydliganden förs in, och förslag som ändrar en regel eller ett beslut läggs fram för Johnny.

Här står de förslagen ur tredje varvets fem grupper: guiden 2-1–2-3, guiden 2-4–2-6 med kiten, guiden 2-7–2-9, flödet med bilagorna och mallarna, och källkorten med luckorna. Dubbletter är sammanslagna. **Inget av det här är infört.** Gruppernas faktarättelser är redan införda (commits `76da4af`–`633b1f5` och sammanslagningen efter dem).

**Så läses listan.** Punkterna står efter hur mycket de påverkar kundsajterna, mest först. Varje punkt har frågan, alternativen, Claudes rekommendation med källa och var texten ska in vid ja. Rekommendationen är ett förslag. *Väntar redan* betyder att frågan också står som väntande i `LAGE.md` eller i `kunskap/research/2026-10-16_andra-varvet.md`. Juridiska läsningar är tolkningar, inte juridisk rådgivning.

## Översikt

| Nr | Fråga | Claudes rekommendation | Väntar redan |
|---|---|---|---|
| 1 | Formulärets avisering när kundens mejl ligger hos någon annan | Workers Paid i tillvalet formulär | delvis (e-posten, 17.00) |
| 2 | Menyn i mobilen | Kombinerad navigering, prövad först | ja |
| 3 | Första vyn säger varför just det här företaget | Ja, som granskningskriterium | ja (lucka 4.10) |
| 4 | Kärnfråga 4 om det som hänt | Ja | – |
| 5 | En fråga som kan motbevisa briefen | Ja | – |
| 6 | Säkerhetshuvuden och Fetch Metadata | Ja | – |
| 7 | JavaScript-budget | 75 kB, rapport | ja |
| 8 | Kitens accent, radhöjd och smak | Radhöjden 1,45–1,7; accenten döms bredvid ett alternativ | ja |
| 9 | Grannsektioner har olika komposition | Ja | ja |
| 10 | CSP med `'strict-dynamic'` för taggar efter samtycke | Ja, efter prov | delvis |
| 11 | Claude-SearchBot i robotlistan | Ja | – |
| 12 | Ett omdöme i tjänstemallen | Ja | ja (lucka 4.11) |
| 13 | Sajten visar att den sköts; datum bara vid verklig ändring | Ja, sammanslaget | ja (lucka 9.9) |
| 14 | Vanliga frågor: flera svar öppna, ingen animerad höjd | Ja till båda | ja (lucka 4.3) |
| 15 | Rörelsen: sparsam vid scroll, C58, färg | Ja | delvis |
| 16 | 44 × 44 på pekskärm | Rapporterande kontroll | – |
| 17 | Brödsmulor bara från tre nivåer | Ja | ja (lucka 3.3) |
| 18 | Djärvs versalrubriker | Ändra kitet | delvis |
| 19 | Nya fält i kitens `design.md` | Ja | – |
| 20 | Riktningar som skiljer sig mer än i ytan | Delvis ja | delvis |
| 21 | En huvudreferens per kit | Ja | – |
| 22 | Apples HIG i kiten | `prefers-contrast` ja, mörkt läge inte nu | – |
| 23 | Bytestestet och förstavyns rubrik | Ja | – |
| 24 | Lokala belägg som bild | Prov först | – |
| 25 | Favicon, Apple-ikon och webbmanifest | Ja, rapport | – |
| 26 | Formulärfältens detaljer | Ja, granskningskriterium | – |
| 27 | Telefonnumret som text på datorn | Nej, G5 står kvar | – |
| 28 | En huvudsida per söksträng | Vänta | – |
| 29 | *Klicka* i instruktioner | Ja | – |
| 30 | Inget långt tankstreck som rapport | Ja | – |
| 31 | Samma röst i alla kanaler | Ja, N3 | – |
| 32 | Inga gröna påståenden om sajten | Ja | – |
| 33 | Apple Kartor-länkar som text | Ja | – |
| 34 | Månadsgenomgång av sökningen | Ja, N3 | – |
| 35 | Före och efter i Search Console | Ja, med bevakningen | – |
| 36 | Designgenomgång i årsgenomgången | Ja, N3 | – |
| 37 | Karenstid i startsäkringen | Socket-provet först | ja |
| 38 | Bevakningsloopen B1–B8 | Ja, som N2 | ja |
| 39 | Granskarens agentdefinition utan `CLAUDE.md` | Ja | – |
| 40 | Personas och triageordning för granskaren | Ja, utanför den låsta checklistan | – |
| 41 | Nyckelsökningen i `CLAUDE.md` | Ja | – |
| 42 | Inställningar för fyra MCP-servrar | Ja | – |
| 43 | Tre regler om flödet | Ja | – |
| 44 | Placeringar som säger emot beslutet 17.40 och smalare landningar | Ja | – |
| 45 | Stopp eller rapport för sju kontroller | Stopp för 3f, 14 och C58; övriga rapport | – |
| 46 | TBT som stopp på en delad maskin | Stopp bara utan annan last | – |
| 47 | Felbanken som krav när kontrollskriptet ändras | Ja | – |
| 48 | Ska sajterna klara 32 px text? | Ja, som rapport först | – |
| 49 | Kontroll 6b med telefon och adress på varje sida | Ja | – |
| 50 | Kvalitetsskillens tak på 15 fynd | **Avgjort 19.09: ja** (`BESLUT.md`) | – |
| 51 | En andra uppgift innan någon skill kortas | Ja | – |
| 52 | Patientomdömen och tystnadsplikten till juristen | Ja | – |
| 53 | Mobilmenyn: 2-3 säger synliga länkar vid fyra, beslutet säger "Meny" | 2-3 säger "på datorn" | ja (menyn i mobilen) |
| 54 | Ska en skill bära de mallar den kräver (briefens sex rubriker i `strategi`)? | Ja, rubrikerna, inte mallen | – |
| 55 | Gamla adresser med frågesträng och trafik: regel i zonen | Ja | – |
| 56 | Platssidans rubrik: kategori och ort i stället för tjänst och ort | Ja | – |

---

## Stor påverkan: varje kundsajt

### 1. Formulärets avisering när kundens mejl ligger hos någon annan

- **Frågan:** Hur ska formuläret avisera kunden när kundens mejl ligger hos Google Workspace, Microsoft 365 eller webbhotellet?
- **Bakgrund:** Utan Workers Paid kan `send_email` bara skicka från en domän med Email Routing, och Email Routing går inte bredvid kundens befintliga mejl. Gratisvägen fungerar alltså bara för kunder som inte har mejl hos någon annan (härlett ur dokumentationen, ⚠️ prövas vid första kunden).
- **Alternativ:** (a) Workers Paid, 5 USD i månaden, när sajten har formulär och kundens mejl ligger hos någon annan; då fungerar också bekräftelsen till besökaren. (b) Email Routing på en underdomän, till exempel `formular.<domän>` ⚠️ oprövat. (c) Frågan avgörs vid första kunden och förs in i bilaga E.
- **Rekommendation:** (a), och kostnaden räknas in i tillvalet formulär. 📄 Cloudflare Email Service, *Limits* (*"You can only send from your routing domains"*, uppdaterad 2026-09-25) och *Pricing* (Email Sending *"Not available"* på Free); Email Routing (*"Cannot use Email Routing with external mail servers"*).
- **Vid ja:** `guide/2-8-teknik-och-kvalitet.md`, tabellen *Stacken*, typ A:
  > Workers Paid (5 USD/mån) när sajten har formulär och kundens mejl ligger hos någon annan, och när besökaren ska få en bekräftelse

  Vid (c), ny rad i `guide/bilaga-e-oppna-fragor.md` §1: *"Formulärets avisering när kunden har mejl hos någon annan: Workers Paid, Email Routing på en underdomän eller något annat? (`2-8-teknik-och-kvalitet.md`, *All e-post går via Cloudflare*)"*.
- **Rör:** `BESLUT.md` 2026-10-16, *Resend stryks – Cloudflare gäller för e-post* och *Cloudflare Pro och månadsrapportens källor*.
- **Väntar redan:** delvis. Andra varvets förslag 1 om e-posten avgjordes 17.00; avsändardomänen kom fram när 2-8 kontrollerades mot dokumentationen i tredje varvet.

### 2. Menyn i mobilen

- **Frågan:** Ska mobilen visa ett eller två menyval bredvid "Meny", eller bara "Meny" som i dag?
- **Bakgrund:** N2-regeln i `guide/2-3-struktur.md` (fyra eller färre toppval syns även i mobilen) krockar med N1-regeln om ett smalt sidhuvud med "Meny". Talet fyra har bara NN/g; web.dev stöder principen men anger inget tal.
- **Alternativ:** (a) Kombinerad navigering: ett eller två val syns bredvid "Meny". (b) "Meny" står kvar, och fyra-regeln gäller bara datorn. (c) "Meny" flyttas ner i knapplisten bredvid Boka och Ring (Smashing 2019).
- **Rekommendation:** (a), prövad på övningssajten med ett förstaklickstest innan regeln skrivs, och (b) som reserv. I NN/g:s test använde mobilbesökarna den dolda menyn i 57 % av fallen och den kombinerade i 86 % (📄 [NN/g, Hamburger Menus](https://www.nngroup.com/articles/hamburger-menus/), 2016, 179 deltagare). web.dev: *"Try to find a strategy that avoids hiding your navigation"* (📄 [Learn Design, UI patterns](https://web.dev/learn/design/ui-patterns)). Det är två oberoende källor.
- **Vid ja:** (a) Texten i 2-3 rad 53 och N1-punkten om sidhuvudet skrivs efter provet. (b) 2-3 rad 53 blir:
  > - [N2] **Huvudmenyn har få länkar, och på datorn syns de alltid**, inte bakom en menyknapp. På mobilen gäller N1-punkten om kontaktvägen: smalt sidhuvud med "Meny" och kontaktvägen i knapplisten. I NN/g:s test användes dold meny i 27 % av fallen mot 48 % för synlig (på dator), och upptäckbarheten sjönk med mer än 20 %. Regeln om 4–7 menyval saknar belägg och används inte. 📄 [NN/g, Hamburger Menus](https://www.nngroup.com/articles/hamburger-menus/); 📄 web.dev, [Learn Design, UI patterns](https://web.dev/learn/design/ui-patterns)
- **Rör:** `BESLUT.md` 2026-10-15, *Kontaktvägen nere på mobilen*; luckan 3.1.
- **Väntar redan:** ja (`LAGE.md`; andra varvet, förslag 9).

### 3. Första vyn säger varför just det här företaget

- **Frågan:** Ska första vyn också säga varför just det här företaget, med en skillnad ur faktabasen?
- **Alternativ:** ja, som granskningskriterium och fråga i blickprovet; nej.
- **Rekommendation:** ja, som granskningskriterium utan kontroll. Måttstocken ändras inte. I blickprovet stod skillnaderna långt ner på sidan (luckan 4.10). 📄 NN/g, Wang, [Homepage Design: 5 Fundamental Principles](https://www.nngroup.com/articles/homepage-design-principles/), 2024, 2.3 (läst 2026-10-16: *"Your homepage should communicate your unique value proposition clearly"*); Boag, Smashing 2020.
- **Vid ja:** `guide/2-4-skelett.md`, ny N2-punkt efter N1-punkten *Mobilens första skärm*:
  > - [N2] **Första vyn säger också varför just det här företaget,** med en skillnad som står i `fakta.md` och briefens positionering, till exempel *"Tid samma dag vid akuta besvär"* eller *"Nybesöket kostar inget extra"*. Skillnaden står i ingressen eller överraden, inte i en egen sektion. Granskningskriterium och fråga i blickprovet, ingen kontroll. 📄 NN/g, Wang, [Homepage Design: 5 Fundamental Principles](https://www.nngroup.com/articles/homepage-design-principles/), 2024, 2.3; Boag, [How To Create A Compelling Landing Page](https://www.smashingmagazine.com/2020/04/landing-page-design/), Smashing 2020.
- **Rör:** måttstockens fråga 1 (`BESLUT.md` 2026-10-15).
- **Väntar redan:** ja, som lucka 4.10 (`LAGE.md`, *Luckorna*).

### 4. Kärnfråga 4 ställs om det som hänt

- **Frågan:** Ska kärnfråga 4 fråga om det som har hänt i stället för det hypotetiska?
- **Bakgrund:** 2-1 säger att frågorna aldrig är hypotetiska, men fråga 4 är det, liksom Dunfords förlaga. Strategiskillen gör redan om den.
- **Alternativ:** ja, ny lydelse i guiden och mallen; nej, skillen fortsätter att göra om frågan.
- **Rekommendation:** ja. 📄 *The Mom Test*, regel 2, via wondelai `mom-test` (⚠️ Fitzpatrick inte läst i original); Dunfords egen fråga är hypotetisk (wondelai `obviously-awesome`, `references/competitive-alternatives.md`, fråga 4).
- **Vid ja:** `guide/2-1-strategi.md`, kärnfrågorna, punkt 4, och `mallar/karnfragor.md` rad 12:
  > 4. Vad hade den senaste kunden provat innan hen kom till er? När förlorade ni senast en kund till någon annan, och vart gick hen? (A)

  `guide/2-1-strategi.md`, *Positionering*, första meningen:
  > Vad provade den senaste kunden innan hen kom till verksamheten, och vart gick den senaste kunden som valde någon annan: en konkurrent, att göra jobbet själv eller ingenting?

  Efter källan: *"📄 The Mom Test, regel 2, via wondelai `mom-test`; Dunfords egen fråga är hypotetisk (wondelai `obviously-awesome`, `references/competitive-alternatives.md`, fråga 4)."*
- **Rör:** `BESLUT.md` 2026-10-15, *Måttstock, tidsbudget och intervjun* (intervjun utgår från de åtta kärnfrågorna).

### 5. En fråga som kan motbevisa briefen

- **Frågan:** Ska intervjun alltid ha minst en fråga som kan visa att briefens antagande är fel?
- **Alternativ:** ja, som N2-regel i guiden; nej, den står bara i strategiskillen (`intervjuhantverk.md`).
- **Rekommendation:** ja. 📄 marketingskills `customer-research` (*Prove yourself wrong, not right*); 📄 *The Mom Test* via wondelai `mom-test` (*"Ask the scary questions"*). Två källor, men Fitzpatrick är ⚠️ inte läst i original.
- **Vid ja:** `guide/2-1-strategi.md`, *Intervjun*, efter *Fråga om kundens kunder*:
  > - [N2] **Minst en fråga kan visa att briefens antagande är fel,** till exempel *"När kom senast en kund som inte hade bråttom? Vad ville hen?"* Svaret står i briefen även när det motsäger antagandet. Källa: 📄 marketingskills `customer-research` (*Prove yourself wrong, not right*); 📄 *The Mom Test* via wondelai `mom-test` (*"Ask the scary questions"*) – två källor, men Fitzpatrick är ⚠️ inte läst i original.
- **Rör:** samma beslut som punkt 4.

### 6. Säkerhetshuvuden och Fetch Metadata

- **Frågan:** Ska alla sajter få CORP, tvingad https och en spärr mot formulärinskick från andra sajter?
- **Alternativ:** ja; nej; bara huvudena.
- **Rekommendation:** ja. HSTS med `includeSubDomains` slås på först när underdomänerna är prövade; övningssajten har det redan. 📄 hstspreload.org; MDN (CORP); OWASP, *CSRF Prevention Cheat Sheet*; W3C, *Fetch Metadata Request Headers* (→ `.claude/skills/kvalitet/sakerhet.md`).
- **Vid ja:** `guide/2-8-teknik-och-kvalitet.md`, N2-tabellen, raden *Huvuden*, kolumnen *Stopp*:
  > CORP `same-origin` utom publika bilder; HSTS `includeSubDomains` först när underdomänerna prövats; http omdirigeras till https (Always Use HTTPS).

  Samma fil, *Formulär*, mönstret, först:
  > (0) Workern avvisar `Sec-Fetch-Site: cross-site` med 403 före allt annat.
- **Rör:** nya regler (kvalitetsgruppens förslag 25).

### 7. JavaScript-budget

- **Frågan:** Vilken JavaScript-budget ska gälla, och ska den stå i guiden?
- **Bakgrund:** `kvalitet/prestanda.md` säger 50 kB med gzip före första interaktion, `skelett/react-i-astro.md` säger 75 kB före första interaktion och 100 kB för hela sidan. Guiden har ingen siffra. Smashings 170 kB är ett andrahandstal från 2021 (punkt 44).
- **Alternativ:** 50 kB; 75 kB och 100 kB för hela sidan; ingen siffra.
- **Rekommendation:** 75 kB före första interaktion och 100 kB för hela sidan, som rapport som inte stoppar. React-körtiden är ensam 69 kB med gzip, så 50 kB slår larm på varje sida med en React-ö som laddas direkt. 📄 Russell, *The Performance Inequality Gap 2024* (via `skelett/react-i-astro.md`); 🔧 startvärde som kalibreras.
- **Vid ja:** `guide/2-8-teknik-och-kvalitet.md`, N2-tabellen, ny rad (kvalitetsgruppens text med Claudes siffra och utan Smashing):
  > | JavaScript-budget | Lighthouse CI eller byggets filstorlekar | Rapport, stoppar inte: högst **75** kB JavaScript med gzip före första interaktion och 100 kB för hela sidan, öar som laddas vid scroll inräknade | 🔧 vårt startvärde, ingen norm (Russell, *The Performance Inequality Gap 2024*); kalibreras mot de första sajterna med öar |

  `kvalitet/prestanda.md` får samma siffra.
- **Rör:** `BESLUT.md` 2026-10-16, *React, Tailwind och JavaScript tillåts* och *Lighthouse 100 är målet*.
- **Väntar redan:** ja (`LAGE.md`, premiumpassets grupp B, *JS-budgeten*; luckan 8.3).

### 8. Kitens accent, radhöjd och smak

- **Frågan:** Ska Lugns förvalda accent bytas, och ska radhöjdsregeln eller kiten ändras?
- **Bakgrund:** Lugn och Djärv har nästan samma accentnyans (44° och 39° i OKLCH), och Lugns terrakotta på varmvitt är det som taste kallar det mest igenkännbara genererade utseendet. `yta/typografi.md` säger radhöjd 1,45–1,6, men Lugn har 1,7 och Varm 1,65 (P32).
- **Alternativ:** Accenten: behåll, eller byt förvalet för kunder utan egen färg, till exempel till det djupa gröna. Radhöjden: regeln blir 1,45–1,7, eller kiten ändras.
- **Rekommendation:** Radhöjden: regeln blir 1,45–1,7, eftersom kiten är godkända och WCAG 1.4.12 bara kräver att texten tål radhöjd 1,5. Accenten: Claude visar Lugn med det djupa gröna bredvid dagens, och Johnny dömer. taste är en källa och en persons smak. Det övriga är smak, och inget föreslås: knappens radie (Lugn 10 px), löptext i dämpad färg (12 av 33 stycken), h1 på tre rader i 375 px, betygsraden i förstavyn och accentens andel 5,3 % i mobilen.
- **Vid ja:** `.claude/skills/yta/typografi.md` (radhöjden); `bibliotek/stilkit/lugn/` och dess `design.md` (accenten, efter dom).
- **Rör:** de godkända kiten Lugn och Varm (`BESLUT.md` 2026-10-15).
- **Väntar redan:** ja (andra varvet, förslag 7; `LAGE.md`, *smak i kiten*).

### 9. Grannsektioner har olika komposition

- **Frågan:** Ska samma kompositionsfamilj, till exempel en rad lika kort, få användas högst två gånger i rad?
- **Bakgrund:** Övningssajtens startsida har fyra kortnät i rad.
- **Alternativ:** ja, som granskningskriterium; nej.
- **Rekommendation:** ja, som granskningskriterium på bänken. 📄 taste v2 `layout.md` §5 och taste (webb-pro) §4.7, samma upphovsperson; impeccable, `craft-floor.md`; frontend-design, kluster 4.
- **Vid ja:** `guide/2-4-skelett.md`, ny N2-punkt efter *Varianterna ska skilja sig på riktigt*:
  > - [N2] **Grannsektioner har olika komposition.** Samma kompositionsfamilj, till exempel en rad lika kort, används högst två gånger i rad. Ett upprepat modulmönster används bara för arkiv som meny, prislista och schema. I kortgrupper linjerar knapparna i underkant. Granskningskriterium *(en källa – bänken: 📄 taste v2 `layout.md` §5 och taste (webb-pro) §4.7, samma upphovsperson; impeccable, `craft-floor.md`; frontend-design, kluster 4)*.
- **Rör:** bibliotekets sektioner; inget beslut.
- **Väntar redan:** ja (andra varvet, förslag 7; `LAGE.md`, *fyra kortnät i rad på startsidan*).

---

## Måttlig påverkan

### 10. CSP med `'strict-dynamic'` för taggar efter samtycke

- **Frågan:** Ska CSP:n släppa in taggarna efter samtycke med `'strict-dynamic'` och hashar i stället för en värdlista?
- **Bakgrund:** En värdlista med Googles och Metas värdar går att kringgå via JSONP och omdirigeringar på värdarna. Gäller sajter med tillvalet statistik eller annonser.
- **Alternativ:** ja, efter ett prov på övningssajten; nej, värdlistan står kvar.
- **Rekommendation:** ja, med provet först, eftersom `'self'` ignoreras med `'strict-dynamic'`. 📄 web.dev, *Strict CSP*; OWASP, *Content Security Policy Cheat Sheet* (→ `.claude/skills/kvalitet/sakerhet.md`).
- **Vid ja:** `guide/2-8-teknik-och-kvalitet.md`, *Samtycke och analys*. Meningen *"Taggarna ligger som filer (`src`), inte som inline-kod, så att CSP:n släpper igenom dem utan `'unsafe-inline'`."* ersätts med:
  > Taggarna ligger som filer (`src`), inte som inline-kod. CSP:n släpper in dem med `'strict-dynamic'` och hashar, inte med Googles och Metas värdar i `script-src`, eftersom en värdlista går att kringgå via JSONP och omdirigeringar på värdarna (📄 web.dev, *Strict CSP*; OWASP, *CSP Cheat Sheet*; → `.claude/skills/kvalitet/sakerhet.md`). Med `'strict-dynamic'` ignoreras `'self'`, så det prövas på övningssajten att öarna och förhämtningen laddas innan regeln gäller.
- **Rör:** `BESLUT.md` 2026-10-16, *Kvalitetsgranskningen – ja på allt* och *React, Tailwind och JavaScript tillåts*.
- **Väntar redan:** delvis (`LAGE.md`, premiumpassets grupp B, *CSP med React och Motion*).

### 11. Claude-SearchBot i robotlistan

- **Frågan:** Ska robotlistan i 2-8 och kontroll 7c också nämna Claude-SearchBot?
- **Alternativ:** ja; nej.
- **Rekommendation:** ja. Den följer beslutet att släppa in sökrobotarna för AI-sökning. Anthropic: *"Disabling Claude-SearchBot on your site … may reduce your site's visibility and accuracy in user search results"* (📄 [support.claude.com, artikel 8896518](https://support.claude.com/en/articles/8896518), läst 2026-10-16).
- **Vid ja:** `guide/2-8-teknik-och-kvalitet.md`, efter *PerplexityBot (Perplexity)*: *"Claude-SearchBot (sökningen i Claude)"*. N1-tabellen, kontroll 7c: *"… PerplexityBot, Applebot eller Google-Extended"* blir *"… PerplexityBot, Claude-SearchBot, Applebot eller Google-Extended"*. Kontrollskriptet och bilaga C följer.
- **Rör:** `BESLUT.md` 2026-10-16, *Lokal SEO, AEO och GEO*.

### 12. Ett omdöme i tjänstemallen

- **Frågan:** Ska mallen *Tjänst* ha ett omdöme om just tjänsten, när faktabasen har ett?
- **Alternativ:** ja; nej, omdömena står kvar på startsidan och Om oss.
- **Rekommendation:** ja. Omdömet står nära beslutet, där tvivlet uppstår. 📄 NN/g, Harley, [Trustworthiness in Web Design](https://www.nngroup.com/articles/trustworthy-design/), 2016 (en källa – bänken; Dribbble och Framer säger samma sak i byråtexter).
- **Vid ja:** `guide/2-4-skelett.md`, tabellen *Mallarna*, raden *Tjänst*:
  > | Tjänst | Sidhuvud · brödsmulor (från sajt 2) · Första vyn · Text och bild (vad som ingår; pris och ROT eller RUT om faktabasen har det) · Utfört arbete · Ett omdöme om just tjänsten, när faktabasen har ett · Vanliga frågor · Nästa steg · Sidfot |

  Under tabellen: *"Omdömet står nära beslutet, där tvivlet uppstår, och inte bara på startsidan. 📄 NN/g, [Trustworthiness in Web Design](https://www.nngroup.com/articles/trustworthy-design/), 2016 (en källa – bänken)."* Vid ja på punkt 17 stryks brödsmulorna ur samma rad.
- **Rör:** mallarnas standardordning i 2-4 och beslutet att en sajt med omdömen säger hur de kontrolleras (`BESLUT.md` 2026-10-16).
- **Väntar redan:** ja, som lucka 4.11 (`LAGE.md`, *Luckorna*).

### 13. Sajten visar att den sköts, och datum ändras bara vid verklig ändring

- **Frågan:** Ska sajten visa när priser och tider senast kontrollerades, och ska datum bara ändras när innehållet ändras?
- **Bakgrund:** Två grupper föreslog nästan samma sak. Den ena kopplade `dateModified` till kontrollraden, men Google säger att datum inte ska ändras bara för att sidan ska verka färsk.
- **Alternativ:** båda; bara datumregeln; ingetdera.
- **Rekommendation:** båda, sammanslagna: kontrollraden får flyttas när uppgifterna faktiskt är prövade, och `dateModified` följer bara en verklig ändring av texten. 📄 Google, [Creating helpful content](https://developers.google.com/search/docs/fundamentals/creating-helpful-content) (2026-10-05); Stanford Web Credibility, riktlinje 8 (*"at least show it's been reviewed recently"*); Opquast 6 och 231 (CC BY-SA, regeltexten kopieras inte).
- **Vid ja:** `guide/2-9-drift-och-forvaltning.md`, *Rapporten*, två punkter:
  > - [N2] **Datum ändras bara när innehållet ändras.** `dateModified` och synliga uppdaterad-datum följer en verklig ändring av texten. En rad om när uppgifterna senast kontrollerades får stå när kontrollen är gjord. 📄 Google, Creating helpful content (2026-10-05); Stanford, riktlinje 8.
  > - [N3] **Datum för senaste kontroll:** raden *"Priser och tider kontrollerade [månad år]"* i *Det praktiska* och på kontaktsidan. Månadskontrollen flyttar datumet först när uppgifterna faktiskt prövats mot kunden. 📄 Stanford Web Credibility, riktlinje 8; Opquast 6 och 231 (CC BY-SA, regeltexten kopieras inte).
- **Rör:** måttstocken och *Det praktiska* (`BESLUT.md` 2026-10-15).
- **Väntar redan:** ja, som lucka 9.9 (`LAGE.md`, *Luckorna*).

### 14. Vanliga frågor: flera svar öppna och ingen animerad höjd

- **Frågan:** Ska vanliga frågor tillåta flera öppna svar, och ska öppningen sluta animera höjden?
- **Bakgrund:** `<details name>` stänger de andra svaren, och då hoppar frågan uppåt 74–103 px (rörelsegruppens mätning). `skelett/interaktion.md` rad 27 animerar `::details-content` med `interpolate-size`, alltså höjden, mot N2-regeln i 2-6 *Animera transform, opacitet och färg*.
- **Alternativ:** `<details>` utan `name`, eller behåll. Höjden: undantag i 2-6, eller bort ur skillen.
- **Rekommendation:** `<details>` utan `name`, och animationen av höjden tas bort ur skillen. 📄 NN/g, [Accordions on Desktop](https://www.nngroup.com/articles/accordions-on-desktop/), 2023 (flera paneler öppna för att jämföra); 📄 web.dev, Basques och Andrew 2020 (animera transform och opacitet).
- **Vid ja:** `guide/2-4-skelett.md` rad 40 och 61 (`<details name>` → `<details>`); `.claude/skills/skelett/interaktion.md` rad 24 och 27; `skelett/SKILL.md`, kontrollpunkt 7; `skelett/sektioner.md`, *Varianter*; bibliotekets sektion för vanliga frågor.
- **Rör:** 2-4 och 2-6; inget beslut (kvalitetsgruppens fråga 10).
- **Väntar redan:** ja, som lucka 4.3 (`LAGE.md`, *Luckorna*).

### 15. Rörelsen: sparsam vid scroll, C58 och färg

- **Frågan:** Fyra delfrågor om rörelsens regler.
- **Alternativ och rekommendation:**
  - **(a) Sidhuvud och knapplist som visas och göms vid scroll i sparsam rörelse.** Ja: de hjälper besökaren att nå Boka och Ring och står still med reducerad rörelse. Det är Claudes tolkning, som skillen redan märker som förslag (P35).
  - **(b) C58 blir delvis låst.** Ja: `transition: all` och animerade layoutegenskaper har nu tre källor oberoende av Kowalski, och regeln om två oberoende primärkällor är uppfylld. 📄 web.dev, Basques och Andrew 2020 (läst); Motion; GSAP `gsap-performance`.
  - **(c) "Färg" blir "färg på små ytor"** i listan över billiga egenskaper. Ja: `color` målas om i varje bildruta. 📄 Kowalski, `animation-performance`, `SKILL.md` rad 79.
  - **(d) Rörelsetokens per kit (P33) och utgångskurvan.** Inget nytt förslag; frågan står kvar.
- **Vid ja:** (a) `guide/2-6-rorelse.md`, *Sparsam*, efter *"Inget startar av sig självt eller när något scrollas in"*:
  > Sidhuvud och knapplist som visas och göms vid scroll är tillåtna tillståndsbyten, eftersom de hjälper besökaren att nå Boka och Ring och står still med reducerad rörelse.

  (b) 2-6, *Kontroll*: *"Träffarna bedöms men stoppar inte (Emils regler – bänken)"* blir:
  > `transition: all` och layoutegenskaper stoppar (📄 web.dev 2020; Motion; GSAP); längder och kurvor bedöms men stoppar inte (bänken).

  C58 i `guide/bilaga-c-kontroller.md` följer. (c) `guide/2-6-rorelse.md` rad 21 och `.claude/skills/rorelse/SKILL.md` rad 46.
- **Rör:** `BESLUT.md` 2026-10-15, *Rörelse – sparsam som standard*, och kiten.
- **Väntar redan:** delvis. (a) och (d) står i premiumpassets grupp B (`LAGE.md`), och (d) också som lucka 6.2.

### 16. 44 × 44 på pekskärm

- **Frågan:** Ska kriteriet 44 × 44 gälla på pekskärm, och ska det bli en rapporterande kontroll?
- **Alternativ:** (a) Kriteriets rubrik i 2-4 blir: *"Granskningskriterium: 44 × 44 px för knappar, menyknappen och fristående länkar på pekskärm – också sidfotens och menyns länklistor i mobilen; med mus och styrplatta räcker golvet 24 × 24."* (b) Kriteriet blir en rapporterande kontroll i bilaga C. Sidfotens länkar (24–26 px) skulle då rapporteras.
- **Rekommendation:** (b) med lydelsen i (a). Två oberoende primärkällor bär regeln: 📄 Apple HIG, *Accessibility* (44 × 44 pt standard, 28 × 28 pt minimum) och 📄 WCAG 2.2, 2.5.5 (AAA, 44 × 44 CSS-px). Golvet 24 × 24 är 2.5.8 (AA).
- **Vid ja:** `guide/2-4-skelett.md`, kriteriet; `guide/bilaga-c-kontroller.md`, ny rapportrad.
- **Rör:** kriteriet ur kartan (2-4).

### 17. Brödsmulor bara från tre nivåer

- **Frågan:** Ska brödsmulor strykas på platta sajter med högst två nivåer?
- **Alternativ:** stryk dem ur mallen *Tjänst*; behåll dem som tillval, eftersom besökare landar djupt från sökningar.
- **Rekommendation:** stryk dem på platta sajter. 📄 NN/g, [Breadcrumbs: 11 Design Guidelines](https://www.nngroup.com/articles/breadcrumbs/), 2018, riktlinje 7; Lovable är en svag andra källa.
- **Vid ja:** `guide/2-3-struktur.md` rad 63 blir:
  > - [N2] **Brödsmulor bara när sajten har tre nivåer eller fler.** På en platt sajt med högst två nivåer visar menyn och sidans rubrik var besökaren är. 📄 NN/g, [Breadcrumbs: 11 Design Guidelines](https://www.nngroup.com/articles/breadcrumbs/), 2018, riktlinje 7. När de finns visar de den typiska vägen (Start › Tjänster › Trädfällning), inte adressen, och placeras före `<main>` i ett `nav` med namn och `aria-current="page"`. 📄 [Google, brödsmulor](https://developers.google.com/search/docs/appearance/structured-data/breadcrumb), [W3C APG Breadcrumb](https://www.w3.org/WAI/ARIA/apg/patterns/breadcrumb/). Komponenten → `2-4-skelett.md`.

  *"brödsmulor (från sajt 2)"* stryks ur mallen *Tjänst* i `guide/2-4-skelett.md`.
- **Rör:** mallen *Tjänst* i 2-4.
- **Väntar redan:** ja, som lucka 3.3 (`LAGE.md`, *Luckorna*).

### 18. Djärvs versalrubriker

- **Frågan:** Ska Djärvs versalrubriker följa C53, eller få ett undantag?
- **Bakgrund:** Radhöjd 0,95 och spärrning −0,005 em bryter Hallmarks golv 1,0 och C53 (*versaler med 5–12 % spärrning*).
- **Alternativ:** (a) `djarv/kit.css` ändras: radhöjd 1,02–1,08 och spärrning enligt C53. (b) Ett undantag i Djärvs `design.md`: *"Versalrubriker i display har radhöjd 0,95 och ingen spärrning; undantag från C53 godkänt av Johnny [datum]."*
- **Rekommendation:** (a), och Johnny dömer det på provsidan, som ändå väntar (G9). Ett undantag gör C53 svagare för alla kit.
- **Vid ja:** `bibliotek/stilkit/djarv/kit.css` och kitets `design.md`.
- **Rör:** kitet Djärv efter G9 och `guide/2-5-yta.md`, *Versaler bara där kitet anger det*.
- **Väntar redan:** delvis (provsidorna för Varm och Djärv, `LAGE.md`).

### 19. Nya fält i kitens `design.md`

- **Frågan:** Ska varje kits `design.md` beskriva fler saker, bland annat vilka kunder kitet passar och inte passar, bärande drag och skillnaden mot de andra kiten?
- **Alternativ:** ja; nej.
- **Rekommendation:** ja. Claude fyller i fälten för de tre kiten och visar dem för Johnny. Källorna är var för sig på bänken.
- **Vid ja:** `guide/2-5-yta.md`, N2-punkten *Full `design.md` per kit* ersätts med:
  > - [N2] **Full `design.md` per kit:** personlighet och vilka kunder kitet passar, vilka kunder och tonlägen kitet läses fel i (*Passar inte*), stämningsadjektiv, färgstrategi (återhållsam, engagerad, full palett eller genomfärgad; G3 gäller i alla), typsnitt med licens, ikonfamilj, bildbehandling, avdelarspråk mellan sektioner (luft, tonbyte eller linje), rörelsebudget och vad rörelsen gör med `reduce`, antimönster, kitets bärande drag (2–4 kännetecken med var de bor i `kit.css`), det som fyller platsen när dekoren är borta, vilket material kitet kräver av kunden, fallgropar, skillnaden mot varje annat kit på tre axlar (förstavyns ljushet, rubrikstil, accentnyans; två kit delar högst en), namngivna referenser med en mening om varför, och datum för Johnnys godkännande. 🎥 *Stitch-skills-videon*; 📄 Hallmark, temafilerna och `SKILL.md` steg 2; impeccable, `new-work.md` §4; taste, `directions.json` (en källa – bänken för trösklarna); → `.claude/skills/yta/stilriktningar.md` och `farg.md`.
- **Rör:** princip 9 och mallen för de godkända kiten (`BESLUT.md` 2026-10-15, designsättet).

### 20. Riktningar som skiljer sig mer än i ytan

- **Frågan:** Ska ett kit få välja förstavariant och avdelarspråk ur biblioteket, och ska två riktningar som skiljer sig för lite göras om innan Johnny ser dem?
- **Alternativ:** ja till båda; bara det andra; nej.
- **Rekommendation:** ja till att riktningar som skiljer sig för lite görs om, eftersom det inte ändrar vad en riktning är. Att kitet väljer förstavariant står redan som förslag i 2-4 (*Kitet får ange vilka layoutvarianter det föredrar* 🔧) och prövas när nästa kit tas fram.
- **Vid ja:** `guide/2-5-yta.md`, steg 2, och `guide/2-4-skelett.md`, förslaget om layoutvarianter. Exakt text skrivs när Johnny valt.
- **Rör:** `BESLUT.md` 2026-10-15: riktningarna är tre stilkit på samma sektioner.
- **Väntar redan:** delvis (flödesgruppens förslag till Johnny 4 i andra varvet; `LAGE.md`, *smak i kiten*).

### 21. En huvudreferens per kit

- **Frågan:** Ska ett nytt eller förnyat kit ha en huvudreferens som bär struktur och rytm?
- **Alternativ:** ja, som instruktion; nej.
- **Rekommendation:** ja, som instruktion på bänken. 📄 Hallmark, `study.md`.
- **Vid ja:** `guide/2-5-yta.md`, sist i steg 2:
  > *Ett nytt eller förnyat kit har en huvudreferens som bär struktur och rytm; övriga referenser ger enstaka axlar, och `design.md` säger vilken.* (en källa – bänken: 📄 Hallmark, `study.md`)
- **Rör:** hur kit tas fram (2-5, steg 2).

### 22. Apples HIG i kiten

- **Frågan:** Tre kitval ur Apples HIG: mörkt läge, systemtypsnittet som brödtext och `prefers-contrast: more`.
- **Rekommendation:**
  - Mörkt läge: inte nu.
  - Systemtypsnittet som brödtext, med kitets typsnitt i rubrikerna (HIG *Branding*): prövas när ett nytt kit tas fram; dagens kit ändras inte.
  - `prefers-contrast: more` i alla kit: ja. Dämpad text får textfärgen och kanterna blir tydligare. Safari stöder det sedan iOS 14.5.
- **Vid ja:** kitens `kit.css` och `design.md`; `.claude/skills/yta/apple-hig.md`.
- **Rör:** kitval.

### 23. Bytestestet och förstavyns rubrik

- **Frågan:** Ska bytestestet i 2-7 undanta förstavyns rubrik, som enligt N1-regeln i 2-4 säger tjänst och ort och därför kan vara lika hos en konkurrent?
- **Alternativ:** ja; nej.
- **Rekommendation:** ja. Det löser en motsägelse mellan två regler i guiden.
- **Vid ja:** `guide/2-7-innehall.md`, sist i *Bytestest*:
  > Bytestestet gäller inte förstavyns rubrik, som enligt N1-regeln i `2-4-skelett.md` säger tjänst och ort och därför kan vara lika hos en konkurrent; skillnaden bärs av resten av första vyn.
- **Rör:** N1-regeln i 2-4 och måttstocken. Granskarens K5 (byt namnet och se om texten och bilderna fortfarande passar) är en annan fråga som väntar (andra varvet, förslag 6).

### 24. Lokala belägg som bild

- **Frågan:** Får en kund utan egna foton bära karaktären med riktiga bilder av sin värld ur öppna samlingar, till exempel ett gammalt vykort av gatan eller en karta över kvarteret?
- **Alternativ:** ja, som N2-regel; prov först; nej.
- **Rekommendation:** prov på nästa övningssajt först, och Johnny dömer. Källan är en (taste v2, `imagery.md` §3), och svenska arkivs villkor är ⚠️ inte lästa.
- **Vid ja:** `guide/2-7-innehall.md`, *Bilder*:
  > - [N2] **Lokala belägg som bild.** Saknar kunden egna foton kan en riktig bild av kundens värld bära karaktären: gatan i ett gammalt vykort, en karta över kvarteret eller materialet på nära håll. Bilden hämtas ur öppna samlingar med en licens som tillåter kommersiellt bruk (CC0, public domain, CC BY), krediteras på sidan och visas aldrig som kundens egen lokal, personal eller produkt. 📄 taste v2, `imagery.md` §3 (en källa – bänken); ⚠️ svenska arkivs villkor är inte lästa.
- **Rör:** princip 12, ärlighetsregeln och besluten om stock- och AI-bilder (`BESLUT.md` 2026-10-15).

---

## Liten påverkan

### 25. Favicon, Apple-ikon och webbmanifest

- **Rekommendation:** ja, som rapport. 📄 Google, *Favicon in Search* (2026-08-28); Front-End Checklist; HEAD (CC0). Luckan 8.13.
- **Vid ja:** `guide/2-8-teknik-och-kvalitet.md`, N2-tabellen, raden *SEO utöver N1*, kolumnen *Stopp*: *"favicon (kvadratisk, helst över 48 px), `apple-touch-icon` och `site.webmanifest` finns (rapport)"*.
- **Rör:** ny kontroll.

### 26. Formulärfältens detaljer

- **Rekommendation:** ja, som granskningskriterium på bänken.
- **Vid ja:** `guide/2-8-teknik-och-kvalitet.md`, *Formulär*:
  > - [N2] **Fält och knapp på samma rad är lika höga; fältets kant har samma bredd i alla tillstånd; fokus är en kontur med en genomskinlig kontur i vila; plats för hjälp- och feltext är reserverad (`min-height: 1lh`); inaktivt fält har tre signaler (opacitet, markör, attribut).** 📄 Hallmark, `interaction-and-states.md` och grind 39 (en källa – bänken).
- **Rör:** ny regel. Valet mellan GOV.UK och modern-web-guidance för validering vid inskick är kvalitetsgruppens fråga 6 i andra varvet och hör inte hit.

### 27. Telefonnumret som text på datorn

- **Frågan:** Ska numret på datorn visas som text i stället för som en knapp med ordet *Ring*?
- **Bakgrund:** GOV.UK: *"Do not display phone numbers as links on devices that cannot make calls"* ([Phone numbers](https://design-system.service.gov.uk/patterns/phone-numbers/)).
- **Rekommendation:** nej tills vidare. G5 är Johnnys beslut efter övningssajten, och förslaget har en källa, skriven för offentliga tjänster.
- **Vid ja:** `guide/2-3-struktur.md` rad 36, efter *"Telefonen är en klickbar `tel:`-länk"*: *", men på datorn visas numret som text och inte som en knapp med ordet *Ring* (📄 GOV.UK, *Phone numbers*)."*
- **Rör:** `BESLUT.md` 2026-10-15, *Strukturlagret* A, och 2026-10-16, G5.

### 28. En huvudsida per söksträng

- **Rekommendation:** vänta. Förslaget snävar in N1-regeln (*en sida eller en sektion*) med en källa, och Google kallar dubbletter *"fine"* ⚠️.
- **Vid ja:** `guide/2-3-struktur.md`, *Sökord före bygget*:
  > - [N2] **Varje söksträng har en huvudsida i sidkartan, och andra sidor som nämner den länkar dit med beskrivande text.** *(en källa – bänken: marketingskills `seo-audit`, *Keyword Targeting*; Google har ingen sådan regel)*
- **Rör:** N1-regeln *Sökord före bygget*.

### 29. *Klicka* i instruktioner

- **Rekommendation:** ja, som granskningskriterium. Två källor: GOV.UK A to Z (*click*) och Apple HIG (*Writing*); WCAG 2.2, 1.3.3, för *nedan* och *ovan*.
- **Vid ja:** `guide/2-7-innehall.md`, *Kontroll*, ny rad:
  > | *Klicka* i instruktioner; *nedan* och *ovan* som enda ledtråd | N2 | Granskningskriterium (GOV.UK A to Z, *click*; Apple HIG, *Writing*; WCAG 2.2, 1.3.3). Blir Vale-regel först efter mätning: *annonsen du klickade på* är rätt |
- **Rör:** ny regel.

### 30. Inget långt tankstreck som rapport

- **Frågan:** Ska *kort tankstreck, aldrig långt* lyftas från bänken till en rapporterande kontroll, eller vänta tills *Svenska skrivregler* är läst?
- **Rekommendation:** ja, som rapport. En rapport kräver inte två källor (`BESLUT.md` 2026-10-16, 17.35), formen har nu en källa hos Språkrådet (*Myndigheternas skrivregler* 13.8), och Wikipedia återger att Claude använder långt tankstreck oftare än yrkesskribenter (⚠️ andrahandsuppgift).
- **Vid ja:** `guide/2-7-innehall.md`, tabellraden *Inget långt tankstreck*, och en rad i kontrollskriptet.

### 31. Samma röst i alla kanaler

- **Rekommendation:** ja, som N3.
- **Vid ja:** `guide/2-7-innehall.md`, *Bekräftelsemejlets innehåll*: *"[N3] **Google-profilens beskrivning, bekräftelsemejlet och sajten låter likadant:** samma röstprofil (`rost.md`) och samma fakta (`fakta.md`). (En källa – bänken: brands *Consistency checklist*.)"*

### 32. Inga gröna påståenden om sajten

- **Frågan:** Ska byrån aldrig kalla en sajt *klimatsmart* eller *grön* utan belägg?
- **Rekommendation:** ja. 📄 W3C Web Sustainability Guidelines, 1.4.3; direktiv 2024/825 enligt en sammanfattning från advokatbyrån CMS ⚠️. ⚖️ Tolkning, inte juridisk rådgivning.
- **Vid ja:** `guide/4-foretaget.md`, en mening om marknadsföringen av byrån.

### 33. Apple Kartor-länkar som text

- **Rekommendation:** ja; det kostar inget och undviker Apples logotyp. Apples varumärkesregler är ⚠️ inte lästa i original.
- **Vid ja:** `mallar/kundens-lyft.md`, kommentaren om Bing Places och Apple Business Connect: *"Länkar till Apple Kartor skrivs som text (*Vägbeskrivning i Apple Kartor*), aldrig med Apples logotyp (Apples varumärkesregler ⚠️ inte lästa i original)."*
- **Rör:** ny regel i Kundens lyft (princip 10).

---

## Förvaltningen (N3, när det finns kunder)

### 34. Månadsgenomgång av sökningen

- **Rekommendation:** ja, som N3. Väntetiden är en tumregel ⚠️.
- **Vid ja:** `guide/2-9-drift-och-forvaltning.md`, ny rad *Månadsvis* eller ny punkt:
  > - [N3] **Månadsgenomgången: sidor på plats 8–20 och sidor med svag CTR ur Search Console.** Vid svag CTR ändras bara titel och beskrivning, en sida åt gången, mot en baslinje (väntetiden är en tumregel ⚠️). 📄 seo-audit, claude-seo (`kvalitet/seo-teknik.md`)

### 35. Före och efter i Search Console

- **Rekommendation:** ja, tillsammans med bevakningsloopen (punkt 38). 📄 Google, *custom chart annotations* (2025-11-17); Google, *Minimize A/B testing impact*; Google Search Status Dashboard.
- **Vid ja:** `guide/2-9-drift-och-forvaltning.md`, *Ändringar*:
  > - [N3] **Varje publicerad ändring får en anteckning i Search Console samma dag,** så att före och efter syns i diagrammen; A/B-test kräver mer trafik än småföretagens sajter har. En avslutad rankinguppdatering i Googles Search Status ger en genomgång av trenden i kundsajterna. 📄 Google, *custom chart annotations* (2025-11-17); Google, *Minimize A/B testing impact*; Google Search Status Dashboard.

### 36. Designgenomgång i årsgenomgången

- **Rekommendation:** ja, som N3 på bänken.
- **Vid ja:** `guide/2-9-drift-och-forvaltning.md`, tabellen, raden *Årligen*: *"Förvaltningsplanen med kunden; tillgänglighet enligt WCAG-EM (→ `2-8`); kitets version, foton äldre än två år och sektioner som biblioteket har förbättrat (en källa – bänken: Webflow)."*

### 37. Karenstid i startsäkringen

- **Frågan:** Ska startsäkringen vänta några dagar innan den tar en ny version av ett npm-paket?
- **Bakgrund:** Kapade paket upptäcks ofta inom dagar ⚠️, men en karenstid krockar med *alltid senaste version*. Renovate med sju dagars karenstid står redan för kundrepon i N3 (`guide/2-9`).
- **Alternativ:** några dagars karenstid för byråns verktyg, utom säkerhetsrättelser; alltid senaste, med verktygslåset och Socket.
- **Rekommendation:** kör Socket-provet först, som redan är beslutat, och avgör karenstiden efter det.
- **Vid ja:** `skript/startsakring.sh` och `guide/3-3-sakerhet-och-installningar.md`; en rad i `BESLUT.md`.
- **Rör:** `BESLUT.md` 2026-10-15, *Startsäkringen – alltid senaste version*, och 2026-10-16, *Senaste version med verktygslås*.
- **Väntar redan:** ja (`LAGE.md`, *Spår för senare*; luckan 8.4).

---

## Flödet, verktygen och inventeringen

### 38. Bevakningsloopen B1–B8

- **Frågan:** Ska startsäkringen säga *vad* som ändrades i varje bevakad källa, med tre utfall per ändring och en förbättringsjournal?
- **Rekommendation:** ja, men punkterna märks N2 i stället för N1, eftersom N1 redan har 101 punkter mot taket på cirka 60. Bevakningsfilens nya form (`inventering/bevakning.json`) hör till samma ja.
- **Vid ja:** `guide/3-4-larande-och-underhall.md`, *Bevakning av omvärlden*, ny första punkt:
  > - [N1] **Startsäkringen säger vad som ändrades.** Varje källa står i `inventering/bevakning.json` med det vi läste (`last`) och det vi använder den till. Startsäkringen visar ändringar i det vi läste – filer under sökvägen, ändringsloggar, utgåvor, Baseline-status, flöden och sidor – och tystar resten. Varje ändring får ett av tre utfall: ingen påverkan, förslag eller pröva. Förslagen står i `kunskap/forbattringar.md` med hypotes, mått och baslinje. 📄 GOV.UK Frontend, *Staying up to date*; Renovate, *Changelogs*; 🔧 (`BESLUT.md` 2026-10-16, *Startsäkringen täcker allt*)

  *Förbättringsjournal*: `[N2]` → `[N1]` och tillägget *"Den ligger i `kunskap/forbattringar.md`."* Med Claudes rekommendation blir båda N2. Meningen *"Förslaget om en bevakning … väntar på Johnny"* i 3-4 stryks.
- **Rör:** `BESLUT.md` 2026-10-16, *Startsäkringen täcker allt*, och princip 9–10.
- **Väntar redan:** ja (`LAGE.md`; andra varvet, förslag 5).

### 39. Granskarens agentdefinition utan `CLAUDE.md`

- **Frågan:** Ska granskaren köras från en egen agentdefinition med `omitClaudeMd: true`?
- **Bakgrund:** Alla prov i andra varvet gjordes med vanliga delagenter, som laddade byggrepots `CLAUDE.md`, fast rolltabellen i 3-1 säger att granskaren inte ska se den.
- **Rekommendation:** ja. 📄 Claude Code, [Subagents](https://code.claude.com/docs/en/sub-agents), *What loads at startup* (`omitClaudeMd` från 2.1.271).
- **Vid ja:** `.claude/agents/granskare.md` skapas, och N1-punkten om granskaren i `guide/3-1-orkestrering-och-roller.md` ändras från *"Använd en vanlig delagent, inte en som ärver chatten (som `subtask`)."* till:
  > Använd agentdefinitionen `.claude/agents/granskare.md` med `omitClaudeMd: true`, inte en som ärver chatten (som `subtask`) (📄 Subagents, *What loads at startup*).
- **Rör:** konfigurationen (princip 9).

### 40. Personas och triageordning för granskaren

- **Rekommendation:** ja, som N2-instruktion i 3-2, utanför den låsta checklistan `mallar/granskning.md`.
- **Vid ja:** `guide/3-2-granskning-och-kalibrering.md`, *När en granskare inte räcker*:
  > - [N2] **Personas för en företagssajt:** granskaren går den primära handlingen som förstagångsbesökaren (hittar hen nästa steg inom fem sekunder, finns etiketter på alla ikoner), den distraherade mobilanvändaren (handlingen vid skärmkanten, 44 × 44, långsam uppkoppling) och stresstestaren (tomma tillstånd, fel, 404, överlång text). 📄 impeccable, `critique.md`, *Persona-Based Design Testing* (en källa – bänken).
  > - [N2] **Triageordning för rättelser:** trasiga uppgifter och otillgängliga vägar, saknade tillstånd, flöde och hierarki, visuellt och rörelse, sist kod. Få fynd med låg prioritet – en lång svans begraver de viktiga. 📄 impeccable, `polish.md` och `audit.md` 4.6.0.

  (*"i tumzonen"* i förslaget är ändrat till *"vid skärmkanten"*, som 2-3 efter rättelsen av Hoober.)
- **Rör:** ett nytt granskarkriterium (princip 9).

### 41. Nyckelsökningen i `CLAUDE.md`

- **Rekommendation:** ja. 📄 Claude Code, [MCP](https://code.claude.com/docs/en/mcp), *Project scope* (`.mcp.json` checkas in och delas); `BESLUT.md` 2026-10-16, *Alla MCP:er in nu*.
- **Vid ja:** `CLAUDE.md`, *Skyddsräcken*, punkten *Byggrepot*. *"Sök efter nycklar och hemligheter i ändringen före varje commit."* ersätts med:
  > Sök efter nycklar och hemligheter i ändringen före varje commit, också i en `.mcp.json` och i MCP-konfigurationens `headers` och `env`. MCP-servrar ligger i lokal scope, aldrig i `.mcp.json` (BESLUT.md 2026-10-16).
- **Rör:** bilaga E 2.3 (Claudes ändringar i `CLAUDE.md` är förslag).

### 42. Inställningar för fyra MCP-servrar

- **Frågan:** Claude ändrar ingen konfiguration; ska Johnny göra de här ändringarna?
- **Rekommendation:** ja till alla.
  - **Playwright MCP:** en deny-regel för `mcp__playwright__browser_run_code_unsafe`, som är på som standard och som projektet självt kallar *"RCE-equivalent"*, och flaggan `--no-webmcp`. Provet i WebKit med iPhone-emulering kräver en andra server med `--browser webkit --device "iPhone 15" --caps=devtools`, och troligen `npx -y @playwright/mcp@latest install-browser webkit` ⚠️ (härlett, källkortet `playwright-mcp.md`).
  - **Google Developer Knowledge:** en deny-regel för `answer_query`, så att bara `get_documents` används, och en egen nyckel per Google-tjänst.
  - **shadcn:** MCP-servern tas bort. Beslutet säger *"MCP-delen behövs inte"*, och tre av sju verktyg ger fel utan `components.json`.
  - **Socket:** kräver OAuth, och ärendet om `401` i Claude Code är öppet (#185). Reserven är `SOCKET_API_TOKEN`, som Johnny lägger in själv. Bilaga A är rättad i arbetskopian.
- **Vid ja:** byggsessionens konfiguration i `~/.claude-bygg`; `inventering/mcp-servrar.json`.

### 43. Tre regler om flödet

- **Rekommendation:** ja till alla tre.
  - `guide/3-3-sakerhet-och-installningar.md` rad 27, *Extern text är data*: lägg till *MCP-svar* i uppräkningen. Två oberoende fall: CVE-2026-75130 (NVD) och Context7 #2673, där leverantören själv lade instruktioner i svaren. Det kan lyfta regeln från bänken.
  - `guide/3-4-larande-och-underhall.md` rad 29, efter regeln om kontroller som aldrig säger nej: *"En kontroll som ofta slår larm på bra kod är ett tecken på att den ska tas bort (en källa – bänken: Pocock, `docs/engineering/retro.md`)."*
  - `.claude/skills/innehall/SKILL.md`, ny princip: *"**Punktändring när Johnny pekar på en rad.** Bara den raden ändras, plus det minsta som behövs runt den; annat som är fel nämns på en rad utan att rättas. (En källa – bänken: marketingskills `copy-editing`, `references/checklist.md`.)"*
- **Rör:** nya regler (princip 10).

### 44. Placeringar som säger emot beslutet 17.40, och smalare landningar

- **Frågan:** Ska några placeringar i inventeringen rättas, eftersom de krockar med beslutet om BrowserStack och VoiceOver samma minut, eller eftersom källkortet ser dem smalare?
- **Rekommendation:** ja till alla.
  - **BrowserStack MCP:** `beslut` "senare: N4" blir "MCP: kräver konto (betald plan; lokal server med BrowserStack Local)". Bara den lokala servern når `localhost`.
  - **Guidepup:** `beslut` "senare: N2" blir "skill: kvalitet (`tillganglighet.md`, *Hjälpmedel*)", och C41 i bilaga C går från "för hand" till "skript, rapport", aldrig grind. Johnny bör **inte** köra `npx @guidepup/setup`: verktyget skriver behörigheter i TCC för bland annat sshd, bash och zsh och stänger av dikteringens automatik. De tre manuella stegen står i källkortet `guidepup.md`. *Tillägg 19.05:* Johnny körde `npx @guidepup/setup setup --macos-ignore-tcc-db`. Flaggan hoppar över TCC (*"Skipping automation permission setup"*), men setup 0.29.3 skrev ändå tre inställningar: `com.apple.VoiceOver4/default SCREnableAppleScript true`, `com.apple.VoiceOverTraining doNotShowSplashScreen true` och `com.apple.HIToolbox AppleDictationAutoEnable false` (📄 `lib/commands/setup/macOS/setup.js` och delfilerna, läst i npx-cachen). Fokusläget ändras bara med `--ci`. Vill Johnny ha tillbaka frågan om diktering kör han själv `defaults write com.apple.HIToolbox AppleDictationAutoEnable -bool true`; Claude ändrar inga systeminställningar.
  - **Smashing, Front-End Performance Checklist 2021:** "senare: N2" blir "släpp". Talet 170 kB är ett andrahandstal med tre olika omfång, FID och TTI är föråldrade, och Russell används redan (punkt 7).
  - **Smalare landningar** (allt står i respektive källkort): NN/g blir cirka tio frågor i `granskare/premium.md` och två rapportkontroller i `kvalitet/kontroller.md` (att `h1` inte animeras in, och att stilmallen har en regel för `:visited`; kontrollen läser stilmallen, eftersom `getComputedStyle` svarar som om länken är obesökt, enligt MDN). Opquast blir en kolumn med v5-nummer i bilaga C, inga kontroller på Opquast ensam. DIGG blir källa till svenska kriterienamn, aldrig golv. Front-End Checklist och A11Y Project används bara som korskontroll. Webflow blir ett kort avsnitt *Före den första publiceringen* i `drift/publicering.md`. Den heuristiska utvärderingen får en N2-instruktion i `omfattning/inventering.md` för diagnosen av kundens befintliga sajt, och Spencers regler (*No designing*, *No defending a design*) blir en rad i `granskare/SKILL.md`.
- **Vid ja:** `inventering/inventering.json` (fältet `beslut`, med en rad i `BESLUT.md`), sedan `python3 inventering/bygg.py` och artefakten; `guide/bilaga-c-kontroller.md` (C41); skillsen ovan.
- **Rör:** `BESLUT.md` 2026-10-16, *Placeringarna i inventeringen blir beslut; riktiga prov med BrowserStack och VoiceOver*.

## Tillägg kl. 19.05: kontrollerna och baslinjerna

Grupperna `kontroller` och `baslinje-2` blev klara efter att listan skrevs. Deras faktarättelser och hänvisningar är införda (commits `3c21e83` och `90997f0`). Här står det som ändrar en regel eller en mätregel.

### 45. Stopp eller rapport för sju kontroller

- **Frågan:** Beslutet 17.35 säger rapport om inte en norm eller två primärkällor bär regeln. En norm *tillåter* stopp men kräver det inte. Ska någon av de här gå från rapport till stopp?
  - **8i, konsekvent navigering** (WCAG 3.2.3 och 3.2.6) och **8f, Escape och fokus** (2.1.1, 2.4.3). **Rekommendation:** rapport tills de har gått igenom på några sajter, sedan stopp.
  - **3f, säkra ytor** (WebKits dokumentation). **Rekommendation:** stopp.
  - **4c, bara bokningen i fylld accent** (G3, G5; Apple HIG). Ett beslut är ingen primärkälla, så den rapporterar. **Rekommendation:** rapport.
  - **14, andra ursprung** (tredje part enligt 2-8). **Rekommendation:** stopp, om beslutet om tredje part godtas som grund.
  - **10d–10f, CSP, DOM-sänkor och Fetch Metadata** (OWASP och csp-evaluator, ingen norm). **Rekommendation:** rapport.
  - **C58 och studs** (13c; tre respektive två källor). **Rekommendation:** stopp för `transition: all` och layoutegenskaper, rapport för studs.
  - **C81, interna länkar:** registret säger låst kontroll men grunden är 🔧. **Rekommendation:** rapport.
- **Vid ja:** `skript/kontroll.mjs` (fältet `typ`) och `guide/bilaga-c-kontroller.md`.
- **Rör:** `BESLUT.md` 2026-10-16, *Kompetensinventeringen görs klar*.

### 46. TBT som stopp på en delad maskin

- **Frågan:** Kontroll 9b stoppar på TBT i mobil. Med agenter igång gav en tom sida 32–450 ms och startsidan 353 ms (prestanda 92), fast den fick 100 kl. 14.48. Ett brusgolv är infört: ger en tom sida över 50 ms blir TBT en läsning. Det räckte inte i en körning.
- **Alternativ:** (a) TBT stoppar bara när inget annat körs på maskinen och rapporterar annars; (b) median av fem i stället för tre (📄 Lighthouse, `docs/variability.md`); (c) ta bort brusgolvet.
- **Rekommendation:** (a), med (b) som tillägg vid slutkontrollen. LCP och CLS stoppar som förut.
- **Vid ja:** `skript/kontroll.mjs` (9b), `guide/2-8` (N2-tabellen), bilaga C (C79).

### 47. Felbanken som krav när kontrollskriptet ändras

- **Frågan:** Ska `node skript/kontroll.mjs --felbank` köras före varje ändring av `kontroll.mjs` som går in, med regeln att en kontroll som inte fångar sitt fel inte är klar?
- **Rekommendation:** ja, i `guide/3-4`, *Kontroller åldras*. Felbanken tar cirka fyra minuter. I kvällens två körningar gick ett fall fel i den första (under last) och inget i den andra.

### 48. Stor text: ska sajterna klara 32 px?

- **Frågan:** Kontroll 3d rapporterar vid 24 och 32 px. På övningssajten delas rubrikord som "Trelleborg" och "Akupunktur" utan bindestreck vid båda storlekarna (bekräftat på skärmbild). WCAG 1.4.4 kräver 200 % utan förlust av innehåll eller funktion.
- **Alternativ:** (a) 24 px (150 %) är gränsen och 32 px rapporteras; (b) 32 px krävs, med `hyphens: auto` och `lang="sv"` eller mindre rubrikskala vid stor text.
- **Rekommendation:** (b), som rapport tills biblioteket klarar det.
- **Vid ja:** `bibliotek/src` (rubrikskalan), `guide/2-4` eller `2-5`.

### 49. Kontroll 6b med telefon och adress på varje sida

- **Frågan:** Ska N1-kontrollen 6b också pröva att telefon och adress står i sidfoten på varje sida, som regeln i 2-3 säger?
- **Rekommendation:** ja. Regeln är redan N1; kontrollen prövar den inte i dag. Opquast 105 godtar en kontaktsida, så stödet är Stanford och regeln själv.
- **Vid ja:** `skript/kontroll.mjs` (6b), `guide/2-8` (N1-tabellen), bilaga C.

### 50. Kvalitetsskillens tak på 15 fynd

**Avgjort 2026-10-16 kl. 19.09:** Johnny: *"ditt förslag låter bra om fynd"* (`BESLUT.md`). Infört i princip 10; provet körs igen.

- **Frågan:** I baslinjeprovet sköt taket ut ett N1-fynd (kontroll 2b) till löptext i två av tre körningar, och med skillen blev utfallet 87,9 % mot 90,9 % utan.
- **Förslag:** taket gäller granskningar av design och biblioteksändringar; före publicering redovisas varje fynd mot en norm eller en N1-kontroll, också över 15. Kör sedan provet igen.
- **Rekommendation:** ja.
- **Vid ja:** `.claude/skills/kvalitet/SKILL.md`, princip 10.

### 51. En andra uppgift innan någon skill kortas

- **Frågan:** `rorelse` (uppgift 1), `kvalitet` och `larande` lyfte inte på sina uppgifter. En uppgift per skill räcker inte för att stryka något.
- **Rekommendation:** ja, en andra uppgift per skill där en regel ur `BESLUT.md` eller guidens format avgör, innan något kortas. `larande` lyfte inte, eftersom repots `CLAUDE.md` redan bär kärnreglerna i båda armarna.

### 52. Patientomdömen och tystnadsplikten till juristen

- **Frågan:** Två körningar utan skillen tog inte med patientens omdöme, med tystnadsplikten som skäl. Ska frågan om att visa patientomdömen på en vårdsajt läggas till juristen i bilaga E?
- **Rekommendation:** ja, som fråga i bilaga E avsnitt 4. ⚖️ Tolkning, inte juridisk rådgivning. Beslutet 2026-10-15 (*Omdömen*) står tills vidare.

## Tillägg: baslinje-1

Gruppen `baslinje-1` mätte `strategi`, `omfattning`, `struktur`, `skelett` och `yta` (`kunskap/research/2026-10-16_baslinjer-1.md`). Metoden, faktarättelsen om adressbytet vid www (Search Console-hjälpen) och förtydligandena i `yta` och `skelett` är införda. Med `baslinje-2` har nu alla elva skills en baslinje; punkt 51 (en andra uppgift innan något kortas) gäller också `omfattning`, som gav 97,6 % i båda armarna.

### 53. Mobilmenyn: guiden säger emot sig själv

- **Frågan:** `guide/2-3-struktur.md` (N2) säger *"Med fyra eller färre toppnivålänkar visas de synligt även i mobil"* (📄 NN/g, *Hamburger Menus*). `guide/2-4-skelett.md` (N1) och `BESLUT.md` 2026-10-15 säger en knapp med ordet "Meny" på mobilen. Två körningar med skillen flaggade motsägelsen.
- **Rekommendation:** 2-3 säger "på datorn", så att beslutet 2026-10-15 gäller mobilen. Hör ihop med punkt 2 (menyn i mobilen).
- **Vid ja:** `guide/2-3-struktur.md`, `.claude/skills/struktur/`.

### 54. Ska en skill bära de mallar den kräver?

- **Frågan:** `strategi` hänvisar till briefmallen i guiden men har den inte, och utan guiden fick ingen körning rätt rubriker eller rörelsebudget. Principen *Vad, men inte hur* (`guide/bilaga-b-skills.md`) gör det till Johnnys sak om skillsen får upprepa guidens mallar.
- **Förslag:** `.claude/skills/strategi/SKILL.md`, *Ut*, första punkten, får tillägget *"Rubrikerna är sex: sammanfattning, nordstjärna, besökare, primär handling, ton och intryck (med rörelsebudget: sparsam, måttlig eller expressiv) och får inte påstås."*
- **Rekommendation:** ja, rubrikerna men inte hela mallen. Skillsen körs i kundbygget där guiden inte alltid läses.

### 55. Gamla adresser med frågesträng och trafik

- **Frågan:** `_redirects` matchar inte frågesträngar, så `/?p=12` landar på `/` med 200. Regeln i dag: skriv det som ett medvetet utfall. Förslaget: en adress med frågesträng och trafik eller länkar får en omdirigeringsregel i zonen som matchar frågesträngen (`http.request.uri.args`, 📄 Cloudflare Docs, *Redirects*); utan trafik skrivs utfallet som ett beslut.
- **Rekommendation:** ja. Skriptet varnar redan för en adress med frågesträng utan beslut (rättat i kväll).
- **Vid ja:** `.claude/skills/omfattning/flyttregler.md`, tabellen `_redirects`.

### 56. Platssidans rubrik

- **Frågan:** `struktur/platser.md` säger rubrik med tjänst och ort. I provet gav det kontorssidor som hette efter en av tjänsterna och konkurrerade med tjänstesidan om samma sökning.
- **Förslag:** *"Rubrik med verksamhetens kategori och ort (till exempel Trädvård i Luleå), och den primära handlingen för just den platsen. Har firman flera tjänster heter platssidan inte efter en av dem."*
- **Rekommendation:** ja. Förstavyns N1-regel (tjänst och ort) gäller startsidan och tjänstesidorna oförändrad.
- **Vid ja:** `.claude/skills/struktur/platser.md`.

## Tillägg kl. 19.38: skärmläsarprovet

Johnny valde bort VoiceOver på Macen med Guidepup (`BESLUT.md`, *VoiceOver på Macen med Guidepup används inte*). Guidepup-delen av punkt 44 faller bort; Guidepup är *släpp* i inventeringen.

### 57. Hur prövas skärmläsare i stället?

- **Frågan:** Beslutet 17.40 ville ha prov med skärmläsare. Mac-metoden är bortvald. Ska vi pröva på annat sätt, och i så fall hur?
- **Alternativ:** (a) VoiceOver på iPhone för hand, med ett manus på tio minuter som Claude skriver (svep genom första skärmen, rotorns rubriker, ring och boka); (b) TalkBack och VoiceOver på riktiga telefoner via BrowserStack Live, som har skärmläsare på svenska (📄 BrowserStack, *Screen Reader on iOS*), när nyckeln finns; (c) bara axe, kontrollskriptet och C41 för hand.
- **Rekommendation:** (a) en gång per övningssajt, och (b) när BrowserStack är inlagt. Det motsvarar GOV.UK:s miniminivå för mobil (VoiceOver på iOS och TalkBack).
- **Vid ja:** `guide/bilaga-c-kontroller.md` (C41), `.claude/skills/kvalitet/tillganglighet.md`.

