# N1 – det som gäller den första sajten

**Genererad** av `konsolidering/bygg_n1.py` ur `[N1]`-märkningen i guidens filer. Ändra i källfilerna, inte här. Varje punkt står i sin helhet, med källor, i filen under rubriken. Taket är cirka 60 regler och tio automatiska kontroller (`README.md`, *Nivåer*).

68 regler och tabellrader, plus de tio kontrollerna och verktygen nedan.

## 1. Kundens väg (`1-kundens-vag.md`)

*Tid*

- **Tiden mäts per steg** som underlag – klocktid för hela steget och Johnnys egen tid för sig – i `sites/<namn>/progress.md` (`3-1-orkestrering-och-roller.md`). Ingen budget och ingen stoppregel för tid. 🔧

## 2.1 Strategi (`2-1-strategi.md`)

*Vad byrån gör*

- **Johnny intervjuar kunden tillsammans med AI:n, med öppna frågor, och utgår från de åtta kärnfrågorna** (`BESLUT.md` 2026-10-15). AI:n håller ordning på frågorna, föreslår följdfrågor och fyller briefen och faktabasen under samtalet; Johnny leder samtalet (avsnittet *Kärnfrågor och intervjuguide*). En fråga i taget. Öppna, icke-ledande frågor om verkliga och nyliga händelser, aldrig hypotetiska. Be om exempel. Föreslå aldrig svar, inte ens ett tema; färdiga svarsalternativ visas bara när kunden väljer bland det vi erbjuder, som paket och tillval (→ `guide/2-2-omfattning.md`). Inget smicker. Våga vara tyst. Kan kunden inte svara, fråga från ett annat håll. "Vet inte" och "längre fram" är giltiga svar och blir *okänt*, aldrig en gissning. Varför: ledande frågor ger kundens gissning om vad vi vill höra. Källa: `BESLUT.md` 2026-10-13, 18:05 och 18:41 (intervjuande AI, öppna frågor); 📄 Geiecke & Jaravel (principerna med egna ord; koden är icke-kommersiellt licensierad), 📄 Hall, *Just Enough Research*, 📄 Mom Test via pm-skills; svarsalternativen och "vet inte" 🔧 (webb-pro `kundintervju.md`). Granskningskriterium för utskriften. Vem som svarar i första varvet är öppet – se `guide/bilaga-e-oppna-fragor.md` (Claudes förslag: en människa som känner verksamheten).
- **Research före samtalet: läs kundens sajt och Google-profil,** och fråga bara om det som inte står där. Kunden bekräftar förifyllda påståenden, och varje påstående visar sin källa: "Jag ser att ni erbjuder X och Y – stämmer det?" Bara det kunden bekräftat blir ett faktum (→ faktabasen under *Vad som kommer ut*). Varför: förifyllda svar ger tydligare underlag men upplevs som mindre pålitliga när källan inte syns. Källa: 📄 marketingskills `customer-research`, 📄 Paludan m.fl. 2025. Ersätter v0.74:s självintervju (🎥 repo-videon).

*Vad som kommer ut*

- **Strategibriefen** i `sites/<namn>/brief.md`: en sida med sex rubriker – sammanfattning, nordstjärna, besökare, primär handling, ton och intryck (med rörelsebudget), får inte påstås – enligt avsnittet *Briefmall*. Varje påstående är märkt: kundens ord, offentlig källa med länk och datum, eller antagande. Källa (märkningen): `historik/karta/1-strategi.md`, 📄 marketingskills `competitor-profiling`.
- **Faktabasen `sites/<namn>/fakta.md` fylls med det kunden bekräftat,** med källa per faktum (hemvist → `guide/2-7-innehall.md`). Briefen är ett planeringsdokument, inte en faktabas (fallgrop 93).
- **Briefen har ett mål med ett mått: nordstjärnan.** Baslinje, mål och tidsram, t.ex. "från 5 till 15 förfrågningar i veckan inom två månader", och hinken: fler kunder, mer värde per kund eller lägre kostnad (en bokningssida kan ge färre samtal). Varför: värde går inte att visa utan ett mål som kunden godkänt i förväg (fallgrop 159). Nordstjärnan är en instruktion, inte en grind: saknas baslinjen står den som *Inte angivet* och mäts första månaden efter lansering, och briefen går ändå vidare. Baslinjen kommer från kundens siffror (kärnfråga 5) eller från före-måttet vid ombyggnad (→ `guide/2-2-omfattning.md`). Varför ingen grind: v0.74:s "utan nordstjärna godkänns ingen brief" vilar på en källa och stoppar en första sajt utan baslinje (konsolideringsanalysen §4.2). Källa: 🎥 5000-timmarsvideon, 🎥 konsult-videon (samma kanal – en källa, bänken).

*Kontroll*

- **Grind: kunden bekräftar sammanfattningen, och Johnny godkänner briefen och faktabasen,** innan nästa lager börjar (`5-byggplan.md`, steg 1). Intervjun avslutas med en sammanfattning per avsnitt som kunden kan ändra. Överhoppade svar står som *Inte angivet*, och det är tydligt att inget är klart förrän kunden bekräftat. Bekräftelsen gäller fakta och mål, inte pris, design eller publicering (🔧 webb-pro `kundintervju.md`). Johnny godkänner briefen som en sann bild av verksamheten; steget ger honom något att se och döma (`guide/README.md`, princip 1). Varför: kunden får en andra chans att rätta fel innan de byggs in. Källa: 📄 GOV.UK check answers, 📄 Anthropics `smb-onboard` (visa profilen och vänta på uttryckligt godkännande) – två oberoende källor. Stoppen → `guide/3-2-granskning-och-kalibrering.md`.

## 2.2 Omfattning (`2-2-omfattning.md`)

*Vad byrån gör*

- **Ägaren nämner 3–5 toppuppgifter, och varje uppgift får en sida eller en sektion** i sidkartan (`sites/<namn>/sidkarta.md` → `guide/2-3-struktur.md`). Uppgifterna står i briefen under *Besökare* (→ `guide/2-1-strategi.md`) som ägarens bild, inte som belagda. Kopplingen syns i sidkartan; i N1 kontrolleras den inte automatiskt (→ *Kontroll*). Varför: Top Tasks bygger på att många kunder röstar, vilket en enmansfirma inte kan ordna; för en första sajt räcker ägarens egna uppgifter, och trianguleringen väntar till N2. Källa: 📄 McGovern, Top Tasks (metoden), anpassningen 🔧.
- **"Inte nu" skrivs ut.** Det som inte byggs står på en lista under sidtabellen i `sites/<namn>/sidkarta.md`. I N1 står där minst det kunden önskat men som inte byggs nu, och vägarna B–D (redigeringsverktyg, e-handel och egna funktioner som bokning; → *Funktioner*). Listan är byggarens gräns. Varför: agenten bygger annars mer än någon bett om (fallgrop 43). 🔧
- **Omdirigeringskarta, när den nya sajten ersätter den gamla på kundens domän.** Varje gammal adress – ur `sitemap.xml`, en crawl och Search Console när åtkomst finns – får en 301 direkt till sin nya motsvarighet, utan kedjor, eller ett beslut med skäl att den ska bort. Johnny godkänner kartan före publiceringen (`5-byggplan.md`, steg 5); från N2 står besluten i beslutskartan. Omdirigeringarna ligger kvar minst ett år. Varför: en ombyggd sajt som tappar sina adresser tappar sina placeringar i sök (fallgrop 102). Källa: 📄 Google Search Central, flytt med URL-ändringar. Kartan skrivs i Cloudflares `_redirects` (högst 2 000 statiska regler), inte i Astros `redirects`, som i en statisk build blir en meta refresh utan statuskod. Genomförandet → `guide/2-8-teknik-och-kvalitet.md`. Källa: 📄 Cloudflares och Astros dokumentation.
- **Domänen och Cloudflare-kontot ligger på kundens namn, om sajten publiceras** (`5-byggplan.md`, steg 5; om den första sajten publiceras är öppet – se `guide/bilaga-e-oppna-fragor.md`). Kunden köper domänen eller ger tillgång till sin befintliga och äger Cloudflare-kontot; byrån bjuds in som medlem med tvåfaktorsautentisering (API-nyckeln → `guide/3-3-sakerhet-och-installningar.md`). Klicken är mänskliga och blir `blocked` med en tydlig instruktion (→ `guide/3-1-orkestrering-och-roller.md`). Varför: kunden är avtalspart direkt mot leverantören och behåller kontrollen om samarbetet upphör. Källa: 📄 `kunskap/research/2026-10-14_cloudflare-stack.md`, `2026-10-14_dataoverforing-och-analys.md` §5.3 (tolkning, inte juridisk rådgivning).

## 2.3 Struktur (`2-3-struktur.md`)

*Vad byrån gör*

- **Varje sajt utgår från standarduppsättningen: start, tjänst eller tjänster, om oss, kontakt och en designad 404-sida. Tacksida och integritetspolicy ingår bara när sajten har formulär.** Avvikelser motiveras i sidkartan. En sajt med bara en startsida räcker inte: "no one just buys a page" (fallgrop 179, 🎥 *Jack Roberts-videon 3*, sponsrad av Relume). En sida per huvudtjänst: expertenkäten Whitespark 2026 rankar "Dedicated Page for Each Service" som lokal organisk faktor nummer 1 – en enkät, inte ett experiment 📄 [Whitespark](https://whitespark.ca/local-search-ranking-factors). Ramverkets standardsida för 404 signalerar slarv med resten (fallgrop 178) *(en källa – bänken: 🎥 Jack Roberts-videon 2)*. Behövs integritetspolicyn också utan formulär? Webbserverns loggar hos Cloudflare innehåller IP-adresser. *Öppet – se `bilaga-e-oppna-fragor.md`, fråga 1.8.* Uppsättningen 🔧
- **Sidkartan är en tabell i `sites/<namn>/sidkarta.md`, inte en del av briefen. Den listar varje sida med adress, besökarens fråga, söksträngar och primär handling, och varje sida slutar med sin primära handling som nästa steg.** Sidkartan är "the step that everyone misses" 🎥 *Jack Roberts-videon 3*. En sida som ser bra ut men inte leder till handlingen har misslyckats (fallgrop 50) 🔧. Sajtens primära handling och processen efter klicket bestäms i strategin (`2-1-strategi.md`). Johnny ser sidkartan tillsammans med briefen (`5-byggplan.md`, steg 1).
- **Söksträngarna tas fram före sidkartan, och varje viktig söksträng får en sida eller en sektion som svarar på den.** Källor i första varvet: kundens egna ord i intervjun (`2-1-strategi.md`), konkurrenternas tjänstesidor och, vid ombyggnad, Search Console. Rangordna efter relevans för den primära handlingen, inte efter volym. Sökord som tas fram efter lanseringen kan bara följa upp, inte forma sajten (fallgrop 182). 🎥 *Jack Roberts-videon 3* / 🔧
- **En nyckelresa skrivs i besökarens ord, från sökning till primär handling, och körs i webbläsaren som N1-kontroll 4 i `2-8-teknik-och-kvalitet.md`** (telefonlänken har numret ur faktabasen, eller formuläret sparar och mejlar). Exempel ur kartan: *en privatperson i Boden söker på trädfällning, hittar tjänstesidan och begär offert.* Kontroller kan gå igenom fast funktionen inte är inkopplad, till exempel när menyn pekar fel eller knappen inte når formuläret (fallgrop 16). Två källor för körbara kontroller: 🎥 *loop-videon* (AI LABS) och 🎥 *Coding Sloth-videon*; resorna är egen tillämpning 🔧.

## 2.4 Skelett (`2-4-skelett.md`)

*Vad byrån gör*

- **I kundbygget väljer AI:n ur biblioteket – sektion, variant och innehåll – och uppfinner ingen layout. Saknas en sektion byggs den i biblioteket först, med Johnnys godkännande, och används sedan.** De etablerade AI-byggarna gör så: AI:n väljer inom ett system som designers har byggt. 📄 [Wix ADI](https://www.fastcompany.com/3060934/can-you-teach-ai-to-design-wix-is-trying), [Squarespace Blueprint](https://ecomm.design/using-squarespace-blueprint-ai/), [GoDaddys Go-tema](https://github.com/godaddy-wordpress/go) (`guide/README.md`, *Principer*, källorna). Biblioteket ger konsekvens, inte karaktär: en sajt kan följa alla regler och ändå se AI-genererad ut (fallgrop 85, 🎥 *Astryx-videon*). Karaktären kommer från stilkitet (`2-5-yta.md`) och från kundens egna bilder, ord och lokala belägg (`2-7-innehall.md`).
- **Biblioteket består av egna marknadsföringssektioner, inte av ett UI-komponentbibliotek för appar. I första sajten har det bara de sektioner som startsidan och standardsidorna använder, en variant var.** Bibliotek för funktionellt gränssnitt drar en marknadsföringssajt mot sitt eget generiska utseende (fallgrop 96) *(en källa – bänken: 🎥 designskills-videon 2 och Astryx-videon, samma kanal)*. Det som är lika i varje bygge görs en gång; annars genereras samma kod på nytt i varje bygge, dyrt och olika varje gång (fallgrop 143, 🎥 *skill-ingenjörsvideon*, Nate Herk, som återger Anthropic i andra hand). Startsidans sektioner byggs i `5-byggplan.md`, steg 2, och övriga sidors i steg 3. Johnny ser sektionerna på en provsida i 375 och 1280 px; i första sajten är provsidan startsidan i de tre kiten.
- **Mobilens första skärm svarar på vad, var och hur – utan att besökaren scrollar, i 375 px.** Rubriken säger tjänst och ort och är aldrig *"Välkommen till …"*. Branschens kontaktväg syns som knapp: ring och offert för hantverk, boka för klinik och skönhet, meny, beställ och hitta hit för restaurang och café. Telefonnumret går att klicka på. Det här är fråga 1 i Johnnys måttstock och det som oftast avgjorde hans domar; förebilderna är Jursla Rör, Plomberie 5 Étoiles, Citykiropraktikern och We Care Car Care. Instruktion och granskningskriterium – Johnnys måttstock, ingen norm (`BESLUT.md` 2026-10-15); prövas i blickprovet under *Kontroll*. 📄 `mattstock/mattstock.md`
- **En sektion är en Astro-komponent med typade props och en `variant`-prop, utan eget innehåll och utan egna värden.** Ingen text, inga kunduppgifter och inga bilder ligger i komponenten, och den använder bara tokens ur stilkitet – inga hårdkodade färger, typsnitt, avstånd eller radier. Då kan samma innehåll visas i tre kit, och en omdesign blir ett byte av kit eller variant utan att innehållet rörs. 📄 *Websites for Normal People*. Utan tokens faller modellen tillbaka på sina egna val (fallgrop 18, → `2-5-yta.md`). Texterna och innehållsfilerna → `2-7-innehall.md`.
- **HTML först: innehåll och navigation fungerar utan JavaScript,** och skript förbättrar bara. "The JavaScript layer is not fault-tolerant." 📄 [GOV.UK, progressive enhancement](https://www.gov.uk/service-manual/technology/using-progressive-enhancement) *(en källa – bänken)*. Kontrollen → `2-8-teknik-och-kvalitet.md`. Rörelse som börjar osynlig (`opacity: 0`) får inte dölja innehåll utan JavaScript → `2-6-rorelse.md`. Primitiverna:

*Kontroll*

- **Granskningskriterium: blickprovet (femsekunderstestet).** En separat AI ser en skärmbild av första vyn i 375 och 1280 px, mobilen först, utan källkoden, och säger vad som erbjuds, var och vad man ska göra. Det är fråga 1 i Johnnys måttstock (`mattstock/mattstock.md`; regeln under *Sektionerna*). Stämmer svaret inte med briefen och den primära handlingen är det ett fynd – högst `medel`, eftersom kriteriet har en källa (→ `3-2-granskning-och-kalibrering.md`). Testet gäller skelett och yta och körs en gång; här är dess enda plats. *(en källa – bänken: 🎥 Jack Roberts-videon 2, som bygger på Krug; Krug är inte läst i original)* Textmängden per sektion (fallgrop 175) → `2-7-innehall.md`.

## 2.5 Yta (`2-5-yta.md`)

*Vad byrån gör*

- **Ytan kommer ur ett stilkit, aldrig ur fri generering i kundbygget.** Stitch, Inspo, Tastemaker och övriga designverktyg används när kiten tas fram och förnyas, inte vid varje kundbygge. Stitch prövar kitet på en startsida med provinnehåll, i dator och mobil, och värdena förs in i kitets tokens: inget kundinnehåll skickas till Stitch, och ingen export går till en kundsajt. Claude Design är inte designmotor. 📄 `BESLUT.md` 2026-10-14 och 2026-10-15. Varför: en design per sajt tog lång tid, åtta Stitch-varianter i videon (fallgrop 6) 🎥 *Stitch-videon*; modellen gled tillbaka till sina egna färger och typsnitt (fallgrop 18) 🎥 *Opus 5.5-videon*; och Stitch designade bara för dator, så att sajten gick sönder på mobil (fallgrop 3, 19) 🎥 *Stitch-videon*, *Opus 5.5-videon*.
- **Den första sajten använder minimala kit:** färg (bakgrund, text och accent), typsnitt med licens, avståndsskala och radie, som CSS-variabler under en kitväljare (`[data-kit="…"]`), en fil per kit, så att ett bygge kan visa alla tre riktningarna. Till varje kit hör en kort `design.md`: personlighet och vilka kunder kitet passar, typsnitt med licens och några namngivna referenser med en mening om varför (fallgrop 170) 🎥 *sex-färdigheter-videon*. Resten av kitet väntar tills en verklig sajt behöver det (`guide/README.md`, princip 8). 🔧 (ommärkningen 2026-10-15; granskningen 1.1)
- **Tre riktningar = startsidan i tre minimala kit.** Claude väljer tre kit efter briefens ton och intryck, med en mening per kit om varför, och bygger startsidan i varje kit med kundens riktiga texter och bilder (→ `2-7-innehall.md`), i mobil och dator och sida vid sida, så att valet gäller ytan 🎥 *4 Ways-videon*. Saknade bilder visas som en beställning till kunden, inte som lån; i webb-pro saknades materialet, och det gick inte att lösa med design 📄 `2026-10-15_webb-pro-genomgang.md`. Johnny ser riktningarna först och kan stryka, med en kort motivering i `domar.jsonl` (→ `3-2-granskning-och-kalibrering.md`); en struken riktning ersätts eller utgår. Sedan väljer kunden bland det Johnny släppt fram, och valet skrivs i `sites/<namn>/design.md` med kundens varumärkesfärg som accent och kundens egen logotyp. Ordningen gäller tills Johnny beslutar annat. 📄 `BESLUT.md` 2026-10-13 och 2026-10-15.
- **Referensregeln.** En referens får bära layout, palett och typsnitt. Identitet, texter och bilder från andra företag kopieras inte. Referensen namnges i kitets `design.md`. Regeln gäller tills Johnny klargjort licensbeslutet 2026-10-13. 📄 `BESLUT.md` (Licenserna); webb-pros `BESLUT.md` 2026-10-03. *Öppet – se `bilaga-e-oppna-fragor.md`.*
- **Licens per tillgång.** Varje tillgång har en känd rätt att användas och en rad i sajtens licenslista (källa, licens, villkor) innan den används. I den första sajten är det i praktiken typsnitt, ikoner och bilder; tabellen visar kraven per slag. Varför: fallgrop 95, 166, 177 🎥 *designskills-videon 2*, *Astra-videon*, *Jack Roberts-videon 2*.

*Kontroll*

- **Kontrast enligt WCAG 2.2 AA – grind.** Text 4,5:1, stor text 3:1, UI-komponenter och grafik 3:1. Varje text- och bakgrundspar i kitet har ett beräknat värde, och sajten mäts med axe bland de tio N1-kontrollerna (→ `2-8-teknik-och-kvalitet.md`). 📄 WCAG 1.4.3, 1.4.11.
- **Konsekvens är inte karaktär.** En sida kan följa kitet och ändå se AI-genererad ut (fallgrop 85) 🎥 *Astryx-videon*. Karaktären kommer från kundens egna bilder, ord och lokala belägg (`historik/principer.md`; jfr `guide/README.md`, princip 2). Följer sidan kitet men känns generisk är det ett fynd. Leta i de fem tecknen på AI-slop: typografi, bilder, hierarki, färg och avstånd 🎥 *Jack Roberts designgeni-videon*. Båda kriterierna har en källa (bänken), så ett fynd mot dem får högst allvaret `medel` (→ `3-2-granskning-och-kalibrering.md`).

## 2.6 Rörelse (`2-6-rorelse.md`)

*Vad byrån gör*

- **`prefers-reduced-motion` respekteras.** Med `reduce` förflyttas, skalas och roteras ingenting, varken vid laddning, scroll, hover, fokus eller i menyn. Opacitet och färg får stå kvar så att tillståndsbyten syns. Oskärpa räknas som rörelse. 📄 WCAG 2.3.3, tekniken C39 och erratan om oskärpa (`kunskap/research/2026-10-15_kompetensluckor-anteckningar/lager-6-7-rorelse-innehall.md` §7). Nivå AAA, över vårt golv, men C39 gör det nästan gratis.
- **Den första sajten har budgeten sparsam.** Bara tillståndsbyten: hover, fokus, menyn och kvittens när formuläret skickas. Inget startar av sig självt eller när något scrollas in – inga in-animationer, automatiska karuseller, parallax eller blickfång – och sidövergångar väntar till sajt 2. Byggaren lägger inte till egen rörelse; annars lägger Claude till småanimationer på eget initiativ, som bilder som zoomar (fallgrop 4) (en källa – bänken; 🎥 *Stitch-videon*). Briefen anger budgeten under ton och intryck (→ `2-1-strategi.md`). 🔧 (ommärkningen 2026-10-15)

## 2.7 Innehåll (`2-7-innehall.md`)

*Vad byrån gör*

- **`sites/<namn>/fakta.md` är den enda källan till fakta om kunden, med källa per faktum.** Tjänster, priser, öppettider, adresser, personal, årtal, siffror, certifikat, omdömen, citat och svarstider står där. Varje post har ett metadatafält, `kalla`: kundens ord, ett omdöme eller ett register, med datum och hur det bekräftades. Kunden bekräftar varje faktum. Bara *sett* är fakta; ett *härlett* svar blir en fråga till kunden (`guide/README.md`, *Sett, härlett, okänt*), och branschresearch blir aldrig kundfakta (fallgrop 161; research → `2-1-strategi.md`). Används briefen som faktabas sprids sanningen ut i koden när fakta ändras (fallgrop 93). 🔧 (en fil räcker för första sajten, analysen §8.2); 📄 webb-pro `kunskap/kundintervju.md`; 🎥 STORM-videon
- **Faktakontrollen: varje faktapåstående i texterna finns i `fakta.md`, annars `kritisk`.** Det gäller årtal, siffror, priser, utmärkelser, kundnamn, citat, omdömen, öppettider och svarstider, och socialt bevis: kundlogotyper, antal kunder, år i branschen. Modellen hittar på socialt bevis oombedd – en färdig sajt för ett takföretag visade Anthropic, Slack och Stripe som kunder (fallgrop 180). En bild som ser ut att visa kundens verklighet utan att vara kundens är också `kritisk` (ärlighetsregeln nedan). Låst kontroll, tre källor (analysen §4.3); den körs som N1-kontroll 5 i `2-8-teknik-och-kvalitet.md`. 🎥 Jack Roberts-videon 3
- **Källa och licens per bild.** Varje bild har en post i faktabasen med `kalla` (kundens foto, licensierad, AI-genererad, form i koden) och `licens`. Bilder utan känt ursprung eller dokumenterad licens används inte (fallgrop 95; licens per tillgång → `2-5-yta.md`). 📄 webb-pro `kunskap/bild.md`
- **Ärlighetsregeln: en bild som inte är kundens får aldrig se ut att visa kundens arbete, personal, lokal, produkt eller resultat.** Ett genererat "vårt team" är ett påhittat faktum (fallgrop 94) och fångas av faktakontrollen. Stock och AI får visa miljöer, material, texturer och abstrakta motiv, aldrig personer. Bilder som Stitch genererar när stilkiten tas fram räknas som AI-genererade. En fotorealistisk AI-bild som liknar verkliga personer, föremål, platser eller händelser märks i bildtexten (*AI-genererad illustration.*): AI-förordningen art. 50.4 kräver upplysning sedan 2 augusti 2026. Generiska stämningsbilder kräver normalt ingen märkning, och i tveksamma fall märks bilden; med ärlighetsregeln är märkningen skyddsnätet, inte normalfallet. 🎥 designskills-videon 2; 📄 webb-pro `kunskap/bild.md`; 📄 `kunskap/research/2026-10-14_ai-forordningen-och-rattigheter.md` (kan vara vilseledande marknadsföring; tolkning, inte juridisk rådgivning)
- **All text ligger i HTML, aldrig inbränd i bild eller video,** utom i logotyper och motiv som en skylt. Text i bild når inte skärmläsare eller sökmotorer och går inte att rätta (fallgrop 195). 📄 WCAG 2.2, 1.4.5 Images of Text (AA). Tristen O'Briens video är ingen andra källa (analysen §4.4).
- **Skriv bara fakta som finns i faktabasen; det som saknas markeras, aldrig gissas.** I text står `[[PLATSHÅLLARE: vad som saknas]]`, för en bild en platshållare märkt i faktabasen, och varje platshållare blir en fråga till kunden. Modeller hittar på när de inte vet – enligt videon i 72,6 % av fallen för Fable 5.1 (fallgrop 38; ⚠️ videons siffra). Publiceringen stoppas av N1-kontroll 6 i `2-8-teknik-och-kvalitet.md` (fallgrop 181). 🎥 Fable-videon; 🎥 Jack Roberts-videon 3 (*"Älskad av 10 000 nöjda husägare"* publicerades); 📄 marketingskills `copywriting` (`[NEED: …]`)

*Vad som kommer ut*

- `fakta.md` med fakta- och bildposter som kunden bekräftat (källa per faktum, källa och licens per bild), sidornas texter och en fråga till kunden för varje platshållare.

## 2.8 Teknik och kvalitet (`2-8-teknik-och-kvalitet.md`)

*Vad byrån gör*

- **Astro statiskt; publiceras sajten körs den som en Worker med statiska tillgångar i kundens eget Cloudflare-konto, inte på Pages.** `output: 'static'` utan adapter; projektet skapas med `npm create cloudflare@latest -- <namn> --framework=astro`. Hosting på Cloudflare är beslutat 2026-10-14, och Cloudflare skriver själv *"Start new projects with Workers"*. Ett konto per kund, som kunden äger och byrån bjuds in i som medlem: en läckt nyckel drabbar då bara en kund (fallgrop 124; kontot är ett mänskligt klick → `2-2-omfattning.md`, token och behörigheter → `3-3-sakerhet-och-installningar.md`). Båda spåren förutsätter Astro (`LAGE.md`), men Johnny har inte bekräftat ramverket uttryckligen: *Öppet – se `guide/bilaga-e-oppna-fragor.md`, fråga 1.6.* 📄 research §1, §6 (kontot: egen bedömning)
- **WCAG 2.2 nivå AA är golvet för alla sajter,** också när lagen inte kräver det. De flesta kunder är mikroföretag och undantagna från tillgänglighetslagen (10 §), men WCAG 2.2 är ISO/IEC 40500:2025 och nivån som EN 301 549 v4.1.1 bygger på. Vad vi lovar kunden (*byggd enligt WCAG 2.2 AA, testad med …*, aldrig *lagenlig*, fallgrop 188) → `2-2`. 📄 `kunskap/research/2026-10-14_tillganglighetslagen.md` §3.2
- **Första sajten klarar sig med telefon- och mejllänk som primär handling.** Publiceras ett formulär redan då gäller hela mönstret nedan; ett formulär som inte sparar eller saknar spamskydd publiceras inte. 🔧 (konsolideringsanalysen §7.3)
- **Mallen innehåller inget som kräver samtycke,** så ingen banner behövs: självhostade typsnitt (då skickas inte heller besökarnas IP-adresser till tredje part), inga resurser från tredje part vid sidladdning (kartor som bild och länk, inbäddningar med klick för att ladda), ingen analys i webbläsaren och, när formulär kommer, formuläret till egen Worker. 📄 `kunskap/research/2026-10-15_kompetensluckor-anteckningar/lager-8-teknik-kvalitet.md` (nedan *lager-8-anteckningarna*) §4 (PTS, EDPB 2/2023)
- **Publiceringen kräver alltid Johnnys godkännande och går Git → GitHub → Workers Builds** (om sajten publiceras). Agenten kan varken publicera eller pusha (`permissions.deny` → `3-3`). Privat repo via GitHub CLI; Workern kopplas till repot i dashboarden (Settings → Builds; GitHub-appen auktoriseras av människan). Huvudgrenen går till produktion, andra grenar och PR:er till egna förhandsadresser. Beslut 2026-10-13 (*"går till klart med allt vad det innebär"*) och 2026-10-14; 📄 research §1
- **Förhandsadressen är staging och skyddas med Cloudflare Access** (om sajten publiceras). Förhandsadresser är publika som standard (fallgrop 58, 185), och `noindex` ersätter inte skyddet. Johnny ser sajten där före produktion; utan staging hoppar publiceringen över hans blick (fallgrop 126). Access är gratis för upp till 50 användare enligt ett äldre blogginlägg ⚠️. 📄 research §1, §6; Websites for Normal People
- **Statiska sidor får grundhuvudena ur `public/_headers`** (om sajten publiceras): `X-Content-Type-Options: nosniff`, `Referrer-Policy`, `Permissions-Policy` och `Content-Security-Policy: frame-ancestors 'none'`, med Cloudflares exempel som utgångspunkt. `frame-ancestors` fungerar inte i en meta-tagg och måste skickas som HTTP-huvud. 📄 Cloudflare (Headers för Workers static assets) och MDN, via lager-8-anteckningarna §1e

*Vad som kommer ut*

- **Astro-sajten med standardsidorna** (→ `2-3-struktur.md`; 404-sidans utformning → `2-3`, `2-4-skelett.md` – en standard-404 från ramverket är fallgrop 178), `sitemap.xml` och `robots.txt`; **kontrollskriptet** med de tio N1-kontrollerna och resultatet som belägg (`3-1`); om sajten publiceras repot med `wrangler.jsonc` och `public/_headers` och förhandsadressen bakom Access. Integritetspolicy och tacksida bara med formulär.

## 2.9 Drift och förvaltning (`2-9-drift-och-forvaltning.md`)

*Vad byrån gör*

- **Den första rapporten efter lanseringen** (`5-byggplan.md`, steg 6) görs för hand med Claude, utan schemalagda kontroller – med Search Consoles data om egendomen kopplades vid publiceringen (`2-8-teknik-och-kvalitet.md`), annars med det som finns: att sajten svarar, inskicken och Cloudflares analys. En sida på klarspråk: sajten svarar och den primära handlingen fungerar, indexering och första sökdata, nordstjärnans baslinje, ändringar sedan lanseringen. Johnny dömer den innan den går till kunden. 🔧

## 3.1 Orkestrering och roller (`3-1-orkestrering-och-roller.md`)

- **Roller i första varvet:** huvudsessionen bygger medan Johnny tittar, granskaren är den enda delagenten och Johnny dömer varje steg. Granskaren kommer in i `5-byggplan.md`, steg 4; i steg 3 dömer Johnny bygget direkt. Varför: Johnny tittar på hela bygget, och i webb-pro kom maskinen före sajten (webb-pro-genomgången, risk 1). 🔧 (konsolideringsanalysen §7.3)

*Läget i filer*

- **`sites/<namn>/progress.md` håller läget:** steget, vad som är gjort, vad som inte gick att bygga och varför, vad som väntar på Johnny, vad som gjordes för hand, tid per steg (klocktid och Johnnys tid, `1-kundens-vag.md`) och beläggen (nedan). En commit per lyckat varv. Inget släpps tyst: går en del inte att bygga står det i filen. Varför: sessioner avbryts och läget glöms (fallgrop 46, 106), och agenten bygger annars det lätta och hoppar över det svåra utan att säga något (fallgrop 51). 📄 Anthropic, [Effective harnesses for long-running agents](https://www.anthropic.com/engineering/effective-harnesses-for-long-running-agents); *inget släpps tyst*: 🎥 Unlazy-videon (en källa – bänken).

*Belägg och status*

- **Redo för Johnnys dom bara med belägg.** Huvudsessionen kör kontrollskriptet (`5-byggplan.md`, steg 3) efter varje varv och skriver kommandot och ett utdrag ur utdata i `progress.md`. Varje påstående till Johnny eller kunden har länk eller skärmdump; ett påstående utan belägg räknas som underkänt. Promptens instruktion att granska varje påstående mot ett verktygsresultat står i standardtexten (`3-3`); i Anthropics tester tog den nästan helt bort påhittade statusrapporter. Ingen hook i N1 – Johnny tittar. Varför: agenten säger annars klar för tidigt och kryssar i sin egen ruta (fallgrop 9, 40, 52, 148). 🎥 Unlazy-videon; 📄 [Claude Code: Best practices](https://code.claude.com/docs/en/best-practices) ("Have Claude show evidence rather than asserting success"); 📄 Anthropic, *Prompting Claude Fable 5*. Lyft – får vara grind.

*Den som bygger dömer inte*

- **Granskaren är en separat delagent med färsk kontext,** från `5-byggplan.md`, steg 4. Den får referensen, checklistan och skärmdumparna – inte huvudsessionens logg och resonemang och, från N2, inte byggarens överlämning. Använd en vanlig delagent, inte en som ärver chatten (som `subtask`). Varför: en granskare som delar kontext med byggaren godkänner det som byggts. 🎥 Shopify-videon; 📄 *Prompting Claude Fable 5* ("separata verifierande delagenter med färsk kontext presterar ofta bättre än självkritik"); 📄 [Best practices](https://code.claude.com/docs/en/best-practices). Lyft – får vara grind.

*Behörighet i verktyget, inte i prompten*

- Granskare · Referens, checklista, skärmdumpar · Sin rapport · Se byggarens logg, `CLAUDE.md`, varvnummer

## 3.2 Granskning och kalibrering (`3-2-granskning-och-kalibrering.md`)

*Mätbart före bedömt*

- **Det mätbara avgörs av kontrollskriptet, det som kräver omdöme av granskaren och det som kostar dyrt om det blir fel av Johnny.** Design och helhetsintryck blir aldrig kontroller. En kontroll avgör om ett steg är redo för Johnnys dom, aldrig om Johnny får se det: sajten visas med de fallerade kontrollerna listade bredvid. Varför: ett skript ger samma svar varje gång och kostar inget, och i webb-pro stannade åtta av elva körningar i en grind innan något renderats (webb-pro-genomgången, punkt 11). 🎥 FDE-videon + VAULT-videon – två källor (konsolideringsanalysen §4.3); 🔧 (beslut 2026-10-15).

*Körbara kontroller skrivs före bygget*

- **Kontrollskriptet skrivs före bygget och ska fallera.** I början av `5-byggplan.md`, steg 3, blir de tio N1-kontrollerna (`2-8-teknik-och-kvalitet.md`) ett körbart skript, och Claude beskriver varje kontroll för Johnny i en mening. En av dem går hela vägen som besökaren, till den primära handlingen genomförd, eftersom kontroller kan gå igenom medan funktionen inte är inkopplad (fallgrop 16). Varför före: skriver modellen testerna efter koden passar de koden – *"det är inte testning, det är fusk"*. 🎥 loop-videon + Coding Sloth-videon – två källor (konsolideringsanalysen §4.3). Lyft – grind.

*Granskaren*

- **En granskare, en checklista, en referens – från steg 4.** Granskaren är en delagent med ren kontext (`3-1`). Checklistan är en markdownfil med en rad per kriterium, och varje rad pekar på sitt kriterium i lagren – till exempel: leder sidan till sin primära handling, utan lekfulla hinder före den – ett spel, en frågesport eller ett extra steg innan besökaren kan höra av sig (`2-3-struktur.md`; fallgrop 120, 🎥 Jack Roberts Motion Design-videon, en källa – bänken)? Följer ytan stilkitet utan att kopiera referensen (`2-5`)? Finns varje påstående i faktabasen (`2-7`)? Referensen är det valda stilkitet och riktningen och kundens referenser. Underlaget är briefen (syfte, målgrupp, primär handling), faktabasen och skärmdumpar i 375, 768 och 1280 px, som granskaren går igenom sektion för sektion, beskurna i full upplösning. Granskaren flaggar bara brister mot checklistan och briefen. Varför: en granskare som ombeds leta luckor hittar nästan alltid några, och att jaga varje fynd leder till överbyggnad; utan förebild hittar kritikern på en egen standard (fallgrop 61); på en nedskalad helsidesbild syns inte detaljfelen (fallgrop 147). 📄 [Claude Code: Best practices](https://code.claude.com/docs/en/best-practices); 🎥 gauntlet-videon; 📄 Zheng m.fl. 2023 (referensstyrd bedömning gav färre fel) och Prometheus (domaren stämde med människor först med rubrik och referenssvar), båda i `kunskap/research/2026-10-15_kompetensluckor-anteckningar/flodet-loopar-bedomare.md` §2; 📄 Anthropic, *Prompting Claude Fable 5.1* ([crop tool recipe](https://platform.claude.com/cookbook/multimodal-crop-tool)).
- **Checklistan fylls i som markdown.** Varje kriterium får ett av tre utfall: `fungerar`, `fungerar inte` eller `för lite information`. Det tredje räknas aldrig som godkänt; huvudsessionen skaffar mer underlag (ett tillstånd, en bredd, fler skärmdumpar) eller frågar Johnny. Varje brist blir ett fynd i en lista: element, förväntat, faktiskt, allvar – `kritisk` (trasigt eller oläsligt), `hög` (tydlig avvikelse från referens eller brief), `medel` eller `låg`. **Fynd mot ett kriterium med en källa får högst allvaret `medel`.** Varför: granskaren gissar när den bara kan välja ja eller nej (fallgrop 32), byggaren kan bara rätta det den förstår (fallgrop 100), och ett kriterium med en källa får inte bli en grind bakvägen (fallgrop 135; grindregeln i `guide/README.md`). Tre utfall: 🎥 repo-videon (Reticle) + 📄 Anthropic, [Demystifying evals for AI agents](https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents) ("Unknown"-utväg) – två källor. Fälten: 🎥 Hermes-loopvideon (en källa – bänken). Allvaret: 🔧

*Stoppen och människan*

- **Johnny testar sajten själv** i webbläsaren, i mobil och dator – i det första bygget i slutet av `5-byggplan.md`, steg 3, från sajt 2 efter granskaren. Först får han en sammanfattning ur `progress.md` med belägg: vad som byggts, vad som inte blev av och vilka kontroller (från N2 också fynd) som återstår (`3-1`). Varje avvisning får en kort motivering (*Kalibrering*). Varför: agenter kan inte bedöma sajten ur en människas perspektiv. 🎥 Shopify-videon.

*Kalibrering mot Johnnys smak*

- **Johnnys domar är måttet och den första kalibreringen.** Från första sajten sparas varje dom – godkänd eller avvisad, med en kort motivering (`varfor`) – i `sites/<namn>/domar.jsonl`. I `5-byggplan.md`, steg 4, läggs granskarens fynd bredvid Johnnys dom över samma sajt; Johnny avgör vilka fynd som var rätta och vad granskaren missade, och avvikelserna loggas i `domar.jsonl` som kalibreringsdata. Varför: utan *varför* går smaken inte att lära ut (fallgrop 170), och en granskare som aldrig jämförts med Johnny kan inte litas på (fallgrop 139). 🔧; motiveringen 🎥 sex-färdigheter-videon och 📄 Husain, [Using LLM-as-a-judge](https://hamel.dev/blog/posts/llm-judge/) (godkänt eller underkänt med skriven kritik).

## 3.3 Säkerhet och inställningar (`3-3-sakerhet-och-installningar.md`)

*Första sajten: tre saker*

- **Bevakad körning.** Johnny följer bygget, och Claude Codes behörighetsfrågor är på – inget auto mode, inget läge som hoppar över frågorna, inga hooks. Skyddshook, designregelvakt och bevakning kommer i N2–N4. Varför: Bash-regler är enligt dokumentationen ingen säkerhetsgräns; `sh -c '…'` matchas inte av `Bash(rm *)` (verifieringen §7). Spärren i N1 är att Johnny ser vad som händer. Små steg (`BESLUT.md` 2026-10-13); webb-pro slutade med 61 skills och 67 krockar.
- **`permissions.deny` för push, publicering och `.env`** i projektets `.claude/settings.json`. Reglerna gäller huvudsessionen och alla delagenter. Push till huvudgrenen publicerar via Workers Builds, så push-förbudet är också ett publiceringsförbud (📄 `2026-10-14_cloudflare-stack.md`). Johnny loggar in med verktygens egna kommandon (`gh auth login`, `wrangler login`) och publicerar efter sitt godkännande (`5-byggplan.md`, steg 5). `.env` står i `.gitignore`, och inget hemligt får nå webbläsaren – det fångas av N1-kontroll 10 (`2-8-teknik-och-kvalitet.md`; fallgrop 141).
- **Byggsessionen avgränsas från användarnivån.** Byggets inställningar och skills ligger i projektets `.claude/`, inte i Johnnys globala, som påverkar alla hans projekt. Före första sajten kontrolleras med `/doctor` vilka skills, plugins och `CLAUDE.md` som laddas, och en körning med `claude --safe-mode` blir baslinje – det läget stänger av allt anpassat, också projektets egna skills och `CLAUDE.md` (verifieringen §9). Varför: `~/.claude/skills/` har i dag 292 skills plus plugins som laddas i alla projekt, bland dem gamla Nortropic- och webb-pro-skills; `nortropic-stack` föreskriver till exempel Next.js och Vercel, medan guiden bygger med Astro och Cloudflare. Johnnys `~/.claude/CLAUDE.md` har en regel för ett annat projekt (båda sett 2026-10-15). Ärvda `CLAUDE.md` laddas osynligt i varje tur (context-videon; fallgrop 132), och skillistan får 1 % av kontexten (`3-4-larande-och-underhall.md`, *Skills*). ⚠️ Hur användarnivåns skills och plugins stängs av för just byggsessionen, och om `/doctor` visar vilka som laddas, är inte verifierat – öppet, se `bilaga-e-oppna-fragor.md`, avsnitt 4.

## 3.4 Lärande och underhåll (`3-4-larande-och-underhall.md`)

*Lärdomar blir förslag*

- **Ingen lärdom ändrar något av sig själv.** Varken Claude, en hook eller en loop skriver in en lärdom i `CLAUDE.md`, en skill, ett kriterium eller en kontroll. En lärdom är ett förslag, och Johnny beslutar. En dom om smak gäller den sajten: det Johnny avvisar rättas där, och det blir en allmän regel först när han säger det – då skrivs hans ord ordagrant i `BESLUT.md` (`guide/README.md`, princip 10). Varför: ett enda dåligt resultat blir annars en permanent regel (Variate-videon, Task Observer; fallgrop 44), och agenter lär sig bara när människan medvetet uppdaterar instruktioner och harness (Simon Willison, 📄 `2026-10-15_kompetensluckor-anteckningar/flodet-loopar-bedomare.md` §5). v0.74:s regel att hans feedback skrivs direkt i `arbetssatt.md` för alla agenter är struken.

*`CLAUDE.md`*

- **Kort `CLAUDE.md`, skriven för hand.** Högst 60 rader för första sajten (analysen §8.2), med frågan per rad: skulle Claude göra fel utan den? Inte med `/init`, som fyller filen med sådant agenten kan läsa i koden (fallgrop 12); den nya varianten (`CLAUDE_CODE_NEW_INIT=1`) finns inte i verifieringens lista över miljövariabler ⚠️. Filen är skild från repots rot-`CLAUDE.md`, som styr arbetet med byggsystemet. Var den ligger är öppet – se `bilaga-e-oppna-fragor.md`, fråga 2.3 (`LAGE.md`; karta-mot-guide, konflikt 4). Varför: uppsvällda filer gör att Claude ignorerar instruktionerna (📄 Claude Code, *Best practices*, via kompetensluckor-anteckningarna §1).

## 3.5 Live-visning (`3-5-live-visning.md`)

*Förhandsvisning i webbläsaren*

- **Sajten syns i webbläsaren medan den byggs, och bara lokalt.** Dev-servern startas innan Claude skriver sajtens filer, med automatisk omladdning, och sidan öppnas i webbläsaren, så att varje sektion syns när den skapas. Servern lyssnar bara på `127.0.0.1`. Förhandsadresser på Cloudflare är publika som standard och skyddas med Access → `2-8-teknik-och-kvalitet.md` (fallgrop 58, 185). 🔧

## 4. Företaget (`4-foretaget.md`)

*Trappan av insatser*

- **De första sajterna byggs utan betalning** – egna sajter eller pilotsajter – och blir byråns exempelsajter. *Claudes förslag – öppet, se `guide/bilaga-e-oppna-fragor.md`.* Att sälja till företag ger avtal och dataskyddsskyldigheter, och ett dataintrång går inte att ta tillbaka (fallgrop 140). 🎥 Ebbelaar-intervjun: för dig själv, för din organisation, säljs till företag, konsumentprodukt – hoppa inte över steg (en källa – bänken). Byrån siktar på steg 3, sälja till företag; de första sajterna är steg 1–2.

## Bilaga B – Egna skills (`bilaga-b-skills.md`)

*Första varvet: fyra utkast*

- **`intervju`** kör `5-byggplan.md`, steg 1: de åtta kärnfrågorna med verksamheten, briefen med sex rubriker och `fakta.md`.
- **`riktningar`** kör steg 2: tre minimala stilkit och startsidan i vart och ett. Johnny stryker, kunden väljer.
- **`bygg`** kör steg 3: hela sajten i det valda kitet. Johnny dömer direkt, utan granskare.
- **`granska`** kör steg 4: en delagent med ren kontext och en checklista. Johnny jämför fynden med sin egen dom.

## De tio N1-kontrollerna (`2-8-teknik-och-kvalitet.md`)


Tio kontroller, och bara sådana som mäter något kunden märker (konsolideringsanalysen §7.4). Kontrollskriptet byggs i `5-byggplan.md`, steg 3, med Playwright och @axe-core/playwright med WCAG 2.2-taggarna påslagna (de är avstängda som standard). Nr 9 körs med Lighthouse, och nr 5 är en läsning av texterna mot `fakta.md`, inget skript. Skriptet körs mot det lokala bygget före Johnnys dom och, om sajten publiceras, igen mot den publicerade adressen som röktest (förhandsadressen bakom Access nås med en service token, 📄 Cloudflare via lager-8-anteckningarna §1e). Kontrollerna avgör inte om ett steg är klart; det gör Johnnys dom (`guide/README.md`, princip 1).

*Stopp* betyder att Johnny inte godkänner publiceringen förrän kontrollen går igenom, och kräver en norm eller två oberoende primärkällor (`guide/README.md`, *Grind eller instruktion*). *Rapport* betyder att resultatet visas för Johnny och rättas eller motiveras.

**Visningsbredder:** 320 px bara för reflow (nr 3); sajten prövas och visas i 375, 768 och 1280 px; 1920 px från N2.

| # | Kontroll | Vid träff | Grund |
|---|---|---|---|
| 1 | `astro build` går igenom utan fel | Stopp | Förutsättning för allt annat: utan bygge finns inget att visa 🔧 |
| 2 | Inga konsolfel; alla bilder laddas | Rapport | Egen kodstandard 🔧 (v0.74 §10.3). Felen syns för besökaren, men ingen norm kräver det |
| 3 | Ingen horisontell scroll i 320 CSS-px bredd | Stopp | 📄 WCAG 2.2, 1.4.10 Reflow. Sajter går sönder i mobil när bara datorn granskas (fallgrop 3, 19) |
| 4 | Den primära handlingen fungerar hela vägen: telefon- eller mejllänken har numret eller adressen ur `fakta.md`; publiceras ett formulär sparar det och mejlar (*Formulär* ovan) | Stopp | Två källor för körbara kontroller (analysen §4.3; 🎥 Loop-videon); att pröva den primära handlingen hela vägen är egen tillämpning 🔧. Kontroller kan gå igenom fast funktionen inte är inkopplad (fallgrop 16) |
| 5 | Varje faktapåstående finns i `fakta.md`; vad som räknas → `2-7-innehall.md`, *Faktabasen* | Stopp, `kritisk` | Låst kontroll, tre källor (analysen §4.3) |
| 6 | Inga platshållare i produktionsbygget: platshållarmarkeringen ur `2-7` (`[[PLATSHÅLLARE: …]]`), fyllnadstext (*lorem ipsum*, *exempel*, *placeholder*) och bilder märkta som platshållare i faktabasen ger noll träffar | Stopp | En platshållare är ett obekräftat faktum, så kontrollen vilar på faktakontrollens tre källor (analysen §4.3). Publicerade platshållare: fallgrop 181, 🎥 Jack Roberts-videon 3 |
| 7 | Unik titel och metabeskrivning per sida, `sitemap.xml` finns; en `h1` per sida | Stopp för titel, beskrivning och sitemap; rapport för `h1` | 📄 Google Search Central (unika, beskrivande titlar); 📄 $10K Website Kit, Websites for Normal People (fallgrop 122). En `h1` är egen kodstandard 🔧, inget Google-krav |
| 8 | axe med WCAG 2.2 A/AA-taggarna ger 0 fel i Chromium; täcker bl.a. kontrast, alt-texter, etiketter och tomma länkar | Stopp | 📄 WCAG 2.2 |
| 9 | Lighthouse tillgänglighet, bästa praxis och SEO ≥ 90 i mobil och dator, mot det lokala bygget eller produktion – inte mot förhandsadressen, där `noindex` ger underkänt SEO (🔧 härlett, lager-8-anteckningarna); prestandan mäts | Rapport | 📄 Leverantörens dokumentation: Lighthouses skala, 90–100 = *Good* (Chrome for Developers). Tröskeln 90 är vald *(en källa – bänken: $10K Website Kit)*; analysen §4.2 |
| 10 | Inga hemligheter i repot eller i det byggda paketet (HTML, JS, källkartor söks efter nyckelformat) | Stopp, `kritisk` | Allt i webbläsaren går att inspektera (fallgrop 141) 🎥 Ebbelaar-intervjun; 📄 Cloudflare: hemligheter med `wrangler secret put`. Regeln → `3-3` |

**Skärmbilderna** som skriptet tar för Johnnys dom och granskaren är helsidesbilder i mobil och dator. Tre lärdomar från måttstockens fångst (`mattstock/verktyg/fanga.js`, beslut 2026-10-15): en hård tidsgräns per sida, så att en sida som hänger inte stoppar resten; sidor som scrollar i en inre behållare lossas, annars syns bara en skärmhöjd; och sidan scrollas igenom före bilden, så att lat laddade bilder kommer med. 🔧

Därtill Johnnys slutgranskning med en kort motivering per avvisning (`3-2`).


## N1-verktyg (`bilaga-a-verktyg.md`)

Stitch-CLI, npm `@google/stitch`, [Inspo](https://github.com/Nutlope/inspo) (MCP), Lucide, Astro, Cloudflare: Workers med statiska tillgångar, Workers Builds och Access, Wrangler, GitHub och GitHub CLI, Playwright och [Playwright CLI](https://github.com/microsoft/playwright-cli), axe (`@axe-core/playwright`), Lighthouse, Delagent med ren kontext

