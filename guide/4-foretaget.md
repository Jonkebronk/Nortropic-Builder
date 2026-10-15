# 4. Företaget

**Status:** konsoliderad v1.0, 2026-10-15; ommärkt 2026-10-15 efter granskningen. Ur v0.74 §15 och trappan i §5.4. Inte genomgånget med Johnny utöver besluten i `BESLUT.md`.

Lagren och flödet beskriver maskinen. Här står företaget runt den: vad som säljs, hur kunder och ärenden kommer in och om ekonomin går ihop.

**Beslut:** nischen är *"otekniska småföretagare som betalar mig för hemsida och förvaltning så de slipper tänka på det"* (Johnny 2026-10-13 17:48) – **förvaltningen är produkten**. Standardprodukten är en **vanlig flersidig sajt**, scrollytelling är tillval (2026-10-15). Öppet: bransch, paketens innehåll, priser, och om sajt och förvaltning säljs som abonnemang eller som en trappa av steg – se `bilaga-e-oppna-fragor.md`.

**Källäget:** nästan allt nedan kommer från Nate Herks kanal (1-person-, konsult-, retainer-, 5000-timmars-, VAULT- och Clay-videon, Ebbelaar-intervjun) och är **en** källa; Clay-videon är sponsrad av Clay. Reglerna är därför instruktioner. Krav står bara där lag eller två oberoende källor bär dem.

## Trappan av insatser

- [N1] **De första sajterna byggs utan betalning** – egna sajter eller pilotsajter – och blir byråns exempelsajter. *Claudes förslag – öppet, se `guide/bilaga-e-oppna-fragor.md`.* Att sälja till företag ger avtal och dataskyddsskyldigheter, och ett dataintrång går inte att ta tillbaka (fallgrop 140). 🎥 Ebbelaar-intervjun: för dig själv, för din organisation, säljs till företag, konsumentprodukt – hoppa inte över steg (en källa – bänken). Byrån siktar på steg 3, sälja till företag; de första sajterna är steg 1–2.
- [N3] **Kundavtal före första betalande kund**, granskat av jurist (⚠️ inte juridisk rådgivning): ansvar och vad som händer vid fel, förvaltningens omfattning (→ `2-9-drift-och-forvaltning.md`), biträdesavtal med underbiträden och leverantörskonton i kundens namn, åtagandet *"byggd enligt WCAG 2.2 AA, testad med metod X"* i stället för *"lagenlig"* (fallgrop 188), och att AI-genererade delar kan sakna upphovsrätt och att kunden bär det redaktionella ansvaret. 📄 `kunskap/research/2026-10-14_dataoverforing-och-analys.md` §5.3, `…_tillganglighetslagen.md`, `…_ai-forordningen-och-rattigheter.md`.

Lagkrav per kund → `2-2-omfattning.md`. Säkerhet → `2-8-teknik-och-kvalitet.md`. Pilotfasen och när stopp släpps → `3-2-granskning-och-kalibrering.md`.

## Erbjudandet

Standardprodukten är en flersidig företagssajt plus förvaltning varje månad; sidor och funktioner per kund avgörs i `2-2`.

- [N3] **Fasta paket med tydliga gränser.** Försäljning och support går att automatisera bara med ett upprepbart erbjudande, och varje anpassning minskar det som går att återanvända och testa (fallgrop 150). 🎥 1-person-videon (⚠️ Nates tolkning av Dario Amodei) / 🔧 (en källa – bänken). *Innehåll och pris: Öppet – se `guide/bilaga-e-oppna-fragor.md`.*
- [N3] **Byrån förvaltar bara sajter den har byggt.** Står alla kunder på samma grund når en rättelse alla 📄 `historik/karta/9-drift-forvaltning.md`. En befintlig sajt går via ombyggnaden (→ `2-2`). 🔧
- [N3] **Önskemål utanför paketen blir offertärenden till Johnny**, inte nya grenar i flödet. Återkommande önskemål kan bli del av ett paket via föreslå–besluta–låsa (`guide/README.md`, princip 9). 🔧
- [N4] **Varje paket har testbriefar i eval** (→ `3-2`); ett paket som inte går att eval-testa är inte standardiserat nog. 🔧

**Ingår i alla paket**

- [N2] **Designat bekräftelsemejl** till besökaren och avisering till kunden, aldrig formulärtjänstens standardtext (fallgrop 183) – mejlet är ofta det första besökaren får efter den primära handlingen. Innehåll → `2-7-innehall.md`, mejlteknik → `2-8`. 🎥 Jack Roberts-videon 4 (idé) / 🔧.

En designad 404-sida ingår i standardsajten → `2-3-struktur.md`.

**Tillval**

- [N2] **Scrollytelling** → `2-6-rorelse.md`.
- [N4] **Scroll World** → `2-6-rorelse.md`.
- [N3] **Varumärkesbok** (färger, typsnitt, ton, logotypens användning) ur det valda stilkitet och kundens logotyp (→ `2-5-yta.md`); struktur från en förebild, eget innehåll 📄 [brandguidelines.net](https://brandguidelines.net). Inga genererade logotyper (⚠️ varumärkesintrång). 🎥 Jack Roberts-videon 2 / 🔧.
- [N3] **Interaktiv prisuppskattning**, t.ex. för hantverkare. Hög risk: den bygger bara på kundens prislogik i faktabasen (→ `2-7`), märks tydligt som uppskattning och godkänns av kunden före publicering; AI sätter inte pris utifrån bilder. 🎥 Jack Roberts-videon 3 (sponsrad av Relume och Higgsfield) / 🔧.

## Tjänstetrappan

- [N3] **Ett steg säljs bara till den som stått på steget under** – löpande avtal utan belägg och förtroende säljer inte (fallgrop 171). 🎥 konsult-videon (en källa – bänken).

| Steg | Kunden får | Flödet levererar | Nivå |
|---|---|---|---|
| 1. Sajtgranskning | Rapport med belägg och förslag med nordstjärna | Kontrollerna mot kundens sajt (→ `2-8`), läckan och före-måttet (→ `2-1-strategi.md`, `2-2`), jämförelse mot förebild i siffror (→ `3-2`); Johnny går igenom | [N2] |
| 2. Bygge | Standardsajten med tillval | → `1-kundens-vag.md`; flödet byggs i N1 på egna sajter eller pilotsajter (→ *Trappan av insatser*) | [N2] |
| 3. Förvaltning | Produkten, löpande avtal | → `2-9`, rapport med nordstjärna och nästa begränsning | [N3] |

- [N3] **Förvaltningsavtal kräver nordstjärna** (→ `2-1-strategi.md`).
- [N2] **Sajtgranskningen får sluta med "en sajt är inte er begränsning just nu"**, t.ex. när företaget inte kan ta emot fler kunder (fallgrop 173). Det kostar en försäljning men ger förtroende. 🎥 retainer-föredraget (idé) / 🔧.

*Eget betalt granskningssteg, och abonnemang eller trappa för sajt och förvaltning: Öppet – se `guide/bilaga-e-oppna-fragor.md`* (`kunskap/research/2026-10-15_karta-mot-guide.md`, konflikt 9).

## Ärendeagenten

Agenten klassar varje ärende från en förvaltningskund: rutin flyter på, beslut om pengar och kunddata stannar hos Johnny 🎥 1-person-videon. Ändringsflödet → `2-9`; behörigheter → `3-1-orkestrering-och-roller.md`.

| Klass | Exempel | Agenten gör |
|---|---|---|
| Rutinändring | Ny text eller bild, ändrade öppettider | Ändringsbrief i kön (→ `2-9`); ändrade fakta till faktabasen (→ `2-7`) |
| Fråga | *"Hur ser jag mina besökssiffror?"* | Svarsutkast ur kundens hjälpguide, en sida per paket |
| Hög risk | Priser, erbjudanden, rabatter, villkor och integritetspolicy på sajten; fakturor, avtal, uppsägning; radering eller utdrag av personuppgifter; klagomål; ny funktion utanför paketet; stor omdesign | **Svarsutkast och ärendet till Johnny. Ingen åtgärd.** |

Akuta fel (sajten nere, formuläret trasigt) är larm, inte ärenden → `2-9`.

- [N3] **Priser, erbjudanden och juridiska texter publiceras aldrig utan Johnnys godkännande**, inte heller när andra stopp släppts – ett fel når alla besökare och kan bli bindande (fallgrop 154, 156). 🎥 VAULT-videon (en källa – bänken). Förslaget i kartans underlag att prislistan är en standardändring (`kunskap/research/2026-10-15_kompetensluckor-anteckningar/lager-9-drift-forvaltning.md`, fråga 4): *Öppet – se `guide/bilaga-e-oppna-fragor.md`*. Tills dess är priser hög risk, och förslaget prövas först när kalibreringen visar att klassningen håller.
- [N3] **Agenten skickar inget själv** och gör inga massutskick till kundens kunder; varje svar är ett utkast Johnny godkänner (fallgrop 151, 155). 🎥 1-person- och VAULT-videon (en källa).
- [N3] **Agenten har ingen behörighet** till fakturering, avtal, radering eller kundens konton – klassningen är en behörighetsgräns → `3-1`.
- [N3] **Varje ärende sparas med klass och Johnnys beslut** för kalibrering → `3-2`.
- [N3] **Ärenden är otrustad indata och kan innehålla personuppgifter.** Avsändaren kontrolleras mot kundens registrerade kontakter (`historik/karta/9-drift-forvaltning.md`); extern text → `3-3-sakerhet-och-installningar.md`; personuppgifter → `2-2`, `2-8`.
- [N3] **Hjälpguide, ärendesvar och rapporter skrivs på klarspråk** → `2-7`. 🎥 Jack Roberts-videon 2 (idé: ASD-STE100).
- [N4] **Rutinsvar går ut utan godkännande först när kalibreringen visar** att klassningen stämmer med Johnnys beslut (→ `3-2`). **Krav:** ett sådant svar upplyser om att det kommer från en AI (AI-förordningen art. 50.1; ett godkänt utkast omfattas troligen inte) 📄 `kunskap/research/2026-10-14_ai-forordningen-och-rattigheter.md` (tolkning).

## Kundflödet

Ett relevant företag och ett bra meddelande är ännu ingen kund 🎥 1-person-videon. Clay-videons metod (hitta företag, komplettera kontaktuppgifter, ett utkast per mottagare) är en kandidat → `bilaga-a-verktyg.md`; videons siffror är sponsorns.

- [N3] **Krav: kundflödet startar inte förrän juridiken är utredd** (⚠️ inte juridisk rådgivning). Kontaktuppgifter till personer, också en enskild firmas, är personuppgifter. Att utreda: berättigat intresse, information enligt GDPR art. 14 vid första kontakten och avregistrering (fallgrop 168); marknadsföringslagen (⚠️ e-postreklam till fysiska personer kräver i regel samtycke – inte kontrollerat); källornas villkor (Hitta.se förbjuder massinsamling; Googles EEA-villkor för Places tillåter inte marknadsanalys – tolkning) 📄 `kunskap/research/2026-10-15_kompetensluckor-och-kandidater-per-lager.md`, lager 1. Lagkraven → `2-2`. Researchen 2026-10-14 om dataöverföring täcker inte kalla utskick. *Öppet – se `guide/bilaga-e-oppna-fragor.md`, avsnitt 5.*
- [N3] **Utkast, aldrig utskick.** Johnny godkänner varje meddelande (fallgrop 152). 🎥 1-person-videon (en källa – bänken).
- [N3] **Kontroll: varje påstående i ett utkast har belägg.** Ett resultat som inte står i `foretag/kvitton.md` nämns inte; påståenden om mottagaren har källa och datum (fallgrop 167 – Clay-videons eget exempel lovade ett resultat och skrev sedan *"No case study yet"*). Faktakontrollen har två oberoende källor (konsolideringsanalysen §4.3; regeln → `2-7`); användningen på säljutkast är 🔧.
- [N3] **Utkastets inledning bygger på mätbara signaler från mottagarens offentliga sajt** – delar av kontrollerna (Lighthouse, mobilvy, formulär, SSL, laddtid → `2-8`), t.ex. *"er sajt tar 7 sekunder att ladda på mobil"*, med källa och datum. Hjälpsam ton; inga signaler om enskilda personer. Nästa steg är sajtgranskningen. 🎥 Clay-videon (idé) / 🔧.
- [N3] **Ingen demosajt av en presumtiv kunds sajt** (fallgrop 153); ombyggnad bara av kundens egen sajt efter avtal. Enligt referensregeln som gäller tills vidare kopieras inte andra företags identitet, texter eller bilder (→ `2-5`). Säljdemon visar byråns exempelsajter. *Licensbeslutets räckvidd: Öppet – se `guide/bilaga-e-oppna-fragor.md`, fråga 2.1.*
- [N3] **Kvitton, inte portfolio.** Säljmaterialet bygger på uppmätta nordstjärnor (baslinje och utfall) från kundsajter, med **kundens godkännande**, och från egna exempelsajter. 🎥 5000-timmarsvideon (en källa – bänken).
- [N3] **Inga extra avsändardomäner för att skicka mer** – det kan skada trovärdighet och leverans. 🔧 (Clay-videon förordar motsatsen.)
- [N2] **Byråns kontext ligger i `foretag/`:** `profil.md`, `erbjudande.md`, `kvitton.md`, `vanliga-fragor.md` och byråns sajttext. Kundflödet och ärendeagenten läser dem; inget annat är källa till påståenden om byrån. 🎥 Clay-videon / 🔧. Mappen → `bilaga-f-projektstruktur.md`.

## Nischen: smärta, person, löfte

- [N2] **Erbjudandet skrivs som smärta, person och löfte** i `foretag/erbjudande.md` – det specifika problemet, exakt vem som har det, hur erbjudandet löser det. Paketen och hjälpguiden utgår från den; ett brett löfte blir generiskt. 🎥 1-person-videon (en källa – bänken). **Person:** beslutad. **Smärta och löfte**, Claudes förslag: att slippa tänka på hemsidan; *en seriös sajt som syns, gör det lätt att höra av sig och stämmer också om ett år* (`BESLUT.md`, *Innebär*).
- [N3] **Branschen väljs efter belägg.** Har Johnny erfarenhet eller nätverk i en bransch väljs den; annars hålls bredden inom målgruppen de första 5–10 uppdragen, och branschen blir den där det starkaste kvittot finns (fallgrop 172). 🎥 konsult-videon (säger emot 1-person-videons smala nisch från start; samma kanal). En bransch gör branschmallar (→ `2-2`), stilkit och intervjufrågor djupare 🔧. *Branschen: Öppet – se `guide/bilaga-e-oppna-fragor.md`.*

## Enhetsekonomi och pris

- [N2] **Kostnaden mäts per sajt och per förvaltningsmånad** – tokens, rundor, tredjepartstjänster, hosting, Johnnys tid – i samma logg som tidsmätningen (→ `1-kundens-vag.md`, `3-1`). Hosting för standardsajten: $0 på Cloudflares gratisplaner, $5 i månaden med Workers Paid, på kundens konto 📄 `kunskap/research/2026-10-14_cloudflare-stack.md` §6, §8. Kostnaden är golvet. 🔧
- [N3] **Priset förankras i kundens alternativ** – förlorade förfrågningar, egen tid, en byrås pris – och Johnny kan visa hur det räknats fram. 🎥 konsult-videon (en källa – bänken).
- [N3] **Värdet sätter taket:** cirka 10 % av det beräknade årsvärdet 🎥 retainer-föredraget (en persons praxis). Exempel 🔧: fem missade förfrågningar i månaden, var femte blir en affär på 2 000 kr: 1 × 2 000 × 12 = 24 000 kr per år, 10 % är 2 400 kr. Ligger taket under golvet passar kunden inte paketet – säg det i sajtgranskningen, inte efter bygget.
- [N3] **Minska omfattningen, inte priset:** ett mindre paket i stället för rabatt, nästa del när den första gett resultat (fallgrop 174). 🎥 retainer-föredraget (en källa – bänken).
- [N3] **Kostnad mot pris per paket** visar marginalen och vad som är värt att effektivisera (skript, effort → `3-3`). 🔧
- [N3] **Första målet: fem betalande kunder som ger återkoppling.** 🎥 1-person-videon.

Värdet för kunden mäts med nordstjärnan (→ `2-1`) och visas i förvaltningsrapporten (→ `2-9`). *Priserna: Öppet – se `guide/bilaga-e-oppna-fragor.md`.*
