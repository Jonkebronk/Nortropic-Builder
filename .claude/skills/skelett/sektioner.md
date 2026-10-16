# Sektionerna och deras varianter

Besökarens fråga per sektion och mallarnas standardordning står i guiden (→ `guide/2-4-skelett.md`, *Sektionerna* och *Mallarna*). Här står vilka varianter som finns i de granskade källorna, när de passar, hur de beter sig i mobilen och vad de kostar i JavaScript. Varianterna är underlag för biblioteket: från sajt 2 får varje sektion två till tre varianter (N2), och Johnny godkänner dem på provsidan.

**Källorna** (licens och användning i [varianter.md](varianter.md)): AstroWind `src/components/widgets/` (AW), Fulldev UI `src/components/blocks/` (FD), Tailark `registry/bases/radix/mist/blocks/` (TL), HyperUI `public/examples/marketing/` (HU), Accessible Astro (AA). Kostnaden gäller som de är byggda; "0 kB" betyder att sektionen renderas till HTML vid bygget.

## Sidhuvud

- **Varianter:** (a) namn, synliga länkar, telefon och primär knapp på datorn, smalt med "Meny" i mobilen (bibliotekets standard, `BESLUT.md` 2026-10-15); (b) genomskinligt överst som får bakgrund och linje efter en kort scroll (TL `hero-section/one/header.tsx`); (c) synliga länkar också i mobilen när de är högst fyra (NN/g, *Hamburger Menus*, 2016) – kräver att Johnny omprövar beslutet om "Meny" för den sajten.
- **Mobilen:** smalt; göms vid scroll nedåt och kommer tillbaka uppåt; statiskt vid låg höjd (→ `guide/2-3-struktur.md`, N1).
- **Kostnad:** biblioteket 0 kB för menyn (popover) plus ett litet skript för att gömma vid scroll. TL:s sidhuvud är en React-klient (`useState`, scrollyssnare) och kräver React-körtiden; AW:s och AA:s mobilmenyer går inte att öppna utan JavaScript (sett 2026-10-16). Ta utseendet, inte implementationen.

## Första vyn

- **Varianter:** (a) delad, text vänster och bild höger (AW `Hero2`, FD hero-5, 6, 9) – standard när det finns ett bra porträtt eller en bild av platsen; (b) asymmetrisk 2:3 eller 1:3 där texten får mer plats (FD hero-7, 8, 13); (c) bara text, centrerad eller vänsterställd, med faktarad under (AW `HeroText`, FD hero-1, 12) – när bilderna är svaga, vilket är bättre än en stockbild som hero (`mattstock/mattstock.md`).
- **Ska alltid ha:** rubrik med tjänst och ort, kontaktvägen som knappar, klickbart telefonnummer och, när faktabasen har det, ett bevis (betyg med källa) och det praktiska i en rad (→ `guide/2-4-skelett.md`, N1).
- **Mobilen:** knapparna i full bredd innanför marginalen; fotot får inte trycka ner knapparna under första skärmen. Ett pris som är en av besökarens toppuppgifter hör hemma i första skärmen, inte bara under bilden. 🔧 härlett ur briefens toppuppgifter.
- **Kostnad:** 0 kB. In-animationer från `opacity: 0` (AW, Prism UI på 21st) är förbjudna här (→ `guide/2-6-rorelse.md`).

## Sidtopp (undersidornas topp)

- **Varianter:** (a) rubrik, ingress och knappar med ett faktakort bredvid på datorn (biblioteket); (b) rubrik och ingress över en rad med fakta i full bredd (tider, pris, plats), samma i mobil och dator; (c) med bild bredvid, för sidor där bilden är beviset (Om-sidan, en mottagning).
- **Mobilen:** det som står i faktakortet på datorn måste finnas i mobilen också, i första skärmen eller direkt under knapparna; ett kort som bara visas från 56rem tar bort uppgifterna för de flesta besökare. 🔧 härlett ur princip 3 i SKILL.md och briefens toppuppgifter.
- **Kostnad:** 0 kB.

## Det praktiska

- **Varianter:** (a) ett kort per plats med dagar, tider och adress som kartlänk, plus ett kort för pris och kontakt (biblioteket); (b) en tabell eller lista per veckodag med var och när, för kunder med flera platser och skiftande dagar; (c) en faktarad direkt under förstavyn (öppet i dag, pris, telefon) för sajter med en plats.
- **Mobilen:** markera dagens rad; korten staplas; adressen är en länk till vägbeskrivning (→ `guide/2-3-struktur.md`, N1).
- **Kostnad:** 0 kB; dagens rad markeras med ett litet skript och fungerar utan det.

## Tjänster

- **Varianter:** (a) kort med ikon, namn, en mening och länk (AW `Features2`, FD services-5, TL `features/two`) – 2 till 4 tjänster; (b) kompakt lista där hela raden är länken (AW `Features3`) – för mobilen och för sidor där tjänsterna redan har presenterats, till exempel en mottagningssida; (c) sidolista med fast rubrik och tjänsterna bredvid (FD services-2 och 6) – för 5 tjänster och fler på datorn.
- **På tjänstesidan** står priset öppet, eller ett exempelpris för ett typiskt jobb när fast pris inte går (NN/g, [Show Prices for Common Scenarios](https://www.nngroup.com/articles/show-prices-for-common-scenarios/), 2006; → `guide/2-7-innehall.md`).
- **Mobilen:** fyra kort över varandra blir lätt mer än en skärm; varianten (b) visar alla tjänster på en skärm. Upprepas samma tjänstesektion på flera sidor, välj den kompakta varianten utanför startsidan. 🔧
- **Kostnad:** 0 kB. Container queries (`@container`, Baseline "high" sedan 2025-08-14) låter korten anpassa sig efter sektionens bredd (TL, FD).

## Person och Om

- **Varianter:** (a) porträtt bredvid citat, kort text och belägg (biblioteket `Person`, AW `Content`); (b) ett stort citat med litet porträtt och namn (AW `Quote`); (c) team-rutnät när fler än en person tar emot kunder (AW `Team`, HU team-sections).
- **På Om-sidan** ligger porträttet i första vyn – sidtoppens variant (c) – eftersom personen är sidans bevis, och sidan börjar med en kort sammanfattning av vem, vad och varför. Utbildning, år i yrket och legitimation står som korta belägg, inte som löptext, och omdömena länkar till källan hos tredje part (NN/g, *About Us*, 2019).
- **Mobilen:** porträtt före text, men inte så stort att rubriken hamnar under första skärmen.
- **Kostnad:** 0 kB.

## Förtroende och omdömen

- **Varianter:** (a) betyget med källa och datum över tre citat i kort (biblioteket, AW `Testimonials` grid); (b) citatet som pratbubbla med ett hörn nästan rakt, hårfin ring och avsändaren i en liten rad under (TL `testimonials/two`); (c) ett framlyft omdöme bredvid en kort lista (FD reviews-2).
- **Ska alltid ha:** källa och datum per omdöme och raden om urvalet (→ `guide/2-7-innehall.md`; `BESLUT.md` 2026-10-16, omdömen enligt Googles policy och 12 c § MFL).
- **Inte:** karusell (FD reviews-3) och marquee (FD reviews-4, 5; Magic UI `Marquee`) – rörelse som startar av sig själv (→ förbuden i SKILL.md).
- **Kostnad:** 0 kB.

## Så går det till

- **Varianter:** (a) numrerade kort (biblioteket); (b) tunn tidslinje med numrerade punkter och texten bredvid (AW `Steps`, `Timeline` vertical) – halverar höjden i mobilen; (c) horisontella steg på datorn som blir en tidslinje i mobilen (AW `Steps2`).
- **Mobilen:** tre steg ska rymmas på ungefär en skärm. 🔧
- **Kostnad:** 0 kB.

## Vanliga frågor

- **Varianter:** (a) en spalt med `<details name>` (biblioteket, AW `FAQs`, HU faqs); (b) två spalter på datorn – rubrik, ingress och "Hittar du inte svaret? Ring …" till vänster, frågorna till höger, fast vid scroll (TL `faqs/two`, FD faqs-2); (c) alltid öppen lista med frågorna som rubriker (AW `FAQs collapsible={false}`) – när svaren är korta eller alla behöver dem (GOV.UK, *Accordion*).
- **Placering:** frågor som gäller alla tjänster (betalning, avbokning, remiss, besökstid) hör till startsidan eller kontaktsidan; frågor om en behandling hör till dess sida. 🔧
- **Kostnad:** 0 kB med `<details>`. TL:s och FD:s dragspel är Radix eller skript och döljer svaren utan JavaScript – ta layouten, behåll `<details>` ([interaktion.md](interaktion.md)).

## Kontakt och Hitta hit

- **Varianter:** (a) kontaktvägarna som stora länkar i block med rubrik, utan formulär (TL `contact/one` utan formuläret, FD contact-1); (b) innehåll med ett sidokort för tider och adress (FD contact-2); (c) per plats: kartbild, adress, tips om buss och parkering och vägbeskrivning (biblioteket `HittaHit`).
- **Kontaktsidan** heter "Kontakt" i början av namnet, har telefon och e-post och inte bara ett formulär, anger tider och svarstid per kanal (besökare väntar sig svar på e-post inom ett dygn), och ett formulär har tre till fem fält (NN/g, ["Contact Us" Page Guidelines](https://www.nngroup.com/articles/contact-us-pages/), 2019, 20 deltagare).
- **Ska alltid ha:** adressen som text och en vanlig länk till vägbeskrivning; en inbäddad karta laddas först efter klick och samtycke (→ `guide/2-4-skelett.md`, tabellen; `guide/2-8-teknik-och-kvalitet.md`).
- **Knappar:** vägbeskrivningen är en sekundär knapp på en sida där den primära handlingen är att boka eller ringa (princip 10 i SKILL.md).
- **Kostnad:** 0 kB; Google-kartan efter klick.

## Nästa steg

- **Varianter:** (a) mörkt band med rubrik, en mening och två knappar (biblioteket, AW `CallToAction` banner); (b) centrerat kort på sidans bakgrund (AW `CallToAction` card, TL `call-to-action/one`).
- **Mobilen:** knapplisten ska inte visas samtidigt som bandets knappar ([mobil.md](mobil.md), *Fasta element*).
- **Kostnad:** 0 kB.

## Sidfot

- **Varianter:** (a) spalter för platser, kontakt och sidor med företagsuppgifterna i en sista rad (biblioteket); (b) fem spalter där namnet och en mening tar två (TL `footer/two`, HU footers – 24 filer i ljus och mörk).
- **Ska alltid ha:** innehållet i `guide/2-3-struktur.md` (N1: företagsuppgifter, telefon, adress, mejl, sidorna, policylänkarna).
- **Kostnad:** 0 kB.

## Serviceområde

- Finns inte i någon granskad källa och designas från grunden: orterna som text, valfri statisk karta, samma orter som `areaServed` (→ `guide/2-4-skelett.md`, tabellen; skillen `struktur`, `platser.md`).
