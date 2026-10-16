# Mikrotext: knappar, länkar, fel, kvitton, 404 och samtyckesrutan

Delfil till `innehall`. Mikrotext är de korta texterna vid en handling: före (vad får jag?), under (hur gör jag?) och efter (vad hände?). 📄 Yifrah, *Microcopy: The Complete Guide* (läsprovet ur den tyska utgåvan, Rheinwerk 2019, s. 14); NN/g, [The 3 I's of Microcopy](https://www.nngroup.com/articles/3-is-of-microcopy/) (2025)

På en statisk småföretagssajt är det knapparna, länkarna, menyn, kontaktvägarna, öppettiderna, kartknapparna, samtyckesrutan, 404-sidan och, när formulär tas in, fel och tacksida. Reglar, ångra-notiser och tomma listor i appar gäller sällan här.

## Samma ord för samma sak

- **En term per sak i hela sajten:** sidans namn, tjänstens namn och handlingen. Heter sidan *Kontakt och priser* i menyn heter den så i sidfoten, rubriken och titeln (→ `guide/2-3-struktur.md`, *En sida har samma namn överallt*, G4). Detsamma gäller tjänster (*stötvåg* eller *stötvågsbehandling*) och ord som *omdöme* och *recension*. 📄 better-writing (Krehel, MIT), *One voice*; Yifrah s. 71–77; Redish, *Letting Go of the Words*, kap. 12 ⚠️ läst på rubriknivå
- **Länktexten matchar målsidans rubrik,** så att besökaren känner igen att hon kom rätt. 📄 NN/g, [Better Link Labels: 4Ss](https://www.nngroup.com/articles/better-link-labels/) (*sincere*); Redish kap. 12; GOV.UK, *Add links*
- **Standardord ändras inte:** *Meny*, *Stäng*, *Kontakt*, *Boka tid*. 📄 Yifrah s. 71; GOV.UK, *A to Z*
- **Termlistan finns före texten.** Varje sajt har en lista över sina namn på sidor, tjänster och handlingar (i `rost.md`, *Ordlistan*), och ny text använder dem. En synonym är ett fynd bara när samma sak får två namn. 📄 better-writing, *Inventory the existing strings first*; → `guide/2-3-struktur.md`, G4
- **Ett perspektiv per ruta:** *mina val* och *dina val* om samma sak i samma ruta är två röster. *(En källa – bänken: better-writing, Address the reader directly.)*

## Knappar och länkar

- **En knapp säger handlingen med verb och vad man får:** *Boka tid online*, *Ring 070-123 45 67*, *Visa kartan*. Inte *Skicka*, *OK* eller *Kom igång*. 📄 GOV.UK Design System, [Button](https://design-system.service.gov.uk/components/button/); better-writing, *Buttons*; NN/g, 3 I's
- **Länktexten går att förstå ensam:** aldrig *klicka här*, och *Läs mer* bara med objekt (*Läs mer om cookies*). Nyckelorden först, eftersom besökaren ofta bara ser de två första orden. 📄 Norm: WCAG 2.2, [2.4.4](https://www.w3.org/WAI/WCAG22/Understanding/link-purpose-in-context.html) (A); Myndigheternas skrivregler 2.1.6; NN/g, [First 2 Words](https://www.nngroup.com/articles/first-2-words-a-signal-for-scanning/)
- **Den synliga texten finns i det tillgängliga namnet, först.** En ikonknapp med texten *Ring* kan heta *Ring 070-123 45 67* för skärmläsaren, men inte *Telefon*. 📄 Norm: WCAG 2.2, [2.5.3](https://www.w3.org/WAI/WCAG22/Understanding/label-in-name.html) (A)
- **En länk ut talar om det:** till en annan webbplats, en karta, en pdf med format och storlek (*Prislista (pdf, 200 kB)*). Hur nya flikar används står i 2-8 (N1-kontroll 2b). 📄 GOV.UK, *Add links*
- **En primär handling per sida, samma ord varje gång** den upprepas. 📄 marketingskills `copywriting`, *CTA*; → `guide/2-4-skelett.md`
- **Ingen hänvisning till läge eller form** som enda ledtråd: inte *knappen nedan*, *sidorna nedan* eller *den gröna knappen*, utan knappens eller listans namn. 📄 Norm: WCAG 2.2, 1.3.3 (sensoriska egenskaper)
- **Välj eller tryck, inte klicka.** Alla besökare klickar inte; i mobilen trycker man. Skriv *när du väljer Visa kartan från Google* eller *tryck på Neka alla*. Granskningskriterium. 📄 GOV.UK, [A to Z style guide](https://guidance.publishing.service.gov.uk/writing-to-gov-uk-standards/style-guides/a-to-z-style-guide/), *click* (*"not all users click. Use 'select'"*); better-writing, *Plain words* (*"Match the input device"*)

## Fel och formulär

Gäller när en sajt har formulär (→ `guide/2-8-teknik-och-kvalitet.md`, *Formulär*).

- **Etikett före fältet,** och en kort hjälptext när formatet spelar roll. Märk valfria fält *(valfritt)*, inte obligatoriska med asterisk. 📄 Norm: WCAG 2.2, 3.3.2 (A); GOV.UK, *Question pages*; NN/g, 3 I's
- **Ingen platshållartext i fälten,** varken som etikett, hjälp eller exempel: den försvinner när besökaren skriver, alla skärmläsare läser den inte, och webbläsarens grå stil klarar ofta inte kontrastkravet. Formatexemplet står i hjälptexten. 📄 GOV.UK Design System, [Text input](https://design-system.service.gov.uk/components/text-input/); WCAG 2.2, 1.4.3. better-writing tillåter ett exempel som platshållare; GOV.UK går före, eftersom skälen går att pröva.
- **Felet säger vad som är fel och hur det rättas, vid fältet och i text.** Tomt fält ger en uppmaning (*Skriv ditt telefonnummer*); fel innehåll ger en beskrivning (*Telefonnumret har för få siffror*). Samma ord i sammanfattningen överst. 📄 Norm: WCAG 2.2, 3.3.1 (A) och 3.3.3 (AA); GOV.UK Design System, [Error message](https://design-system.service.gov.uk/components/error-message/); NN/g, [Error-Message Guidelines](https://www.nngroup.com/articles/error-message-guidelines/) (2023)
- **Utan skuld och utan skämt:** inte *ogiltig*, *otillåten*, *du glömde*, *Oops* eller *Hoppsan*, och inget utropstecken. Inte *Vänligen*, som gör en uppmaning till en artighet. 📄 GOV.UK, *Error message*; NN/g 2023; better-writing, *Errors*
- **Det besökaren skrivit ligger kvar.** Formuläret töms aldrig vid fel. 📄 GOV.UK; NN/g 2023
- **Ett systemfel är inget formulärfel:** egen text som säger vad som hände med det som skickats, och en annan väg (ring, mejla). Ursäkt hör hemma här, inte vid inmatningsfel. 📄 GOV.UK, *Problem with the service pages*; NN/g 2023

## Kvitton, tacksidor och bekräftelser

- **Kvittot säger vad som hände och vad som händer nu:** att det lyckades, när och hur kunden hör av sig, vart man vänder sig om det brådskar och en länk vidare. 📄 GOV.UK, *Confirmation pages*; Yifrah kap. 8 ⚠️ rubriknivå. Bekräftelsemejlet följer samma regel (→ 2-7, *Bekräftelsemejlets innehåll*).
- **Ett kvitto på ett val upprepar valet,** inte bara att något sparades: *Du har sagt ja till statistik och nej till annonser*, inte *Dina val är sparade*. 📄 better-writing, *Status*: klart = objekt plus resultat; GOV.UK, *Confirmation pages*
- **Statustext i par:** *Laddar kartan …* och sedan kartan; ett fel säger vad som inte hände och nästa steg. 📄 better-writing, `patterns.md`; NN/g, [Designing Empty States](https://www.nngroup.com/articles/empty-state-interface-design/) (skilj *laddar* från *inget hittat*)

## 404-sidan

- **Rubriken säger vad som hänt** (*Sidan finns inte*), utan *404*, *Oops* eller röd text, och utan att skylla på besökaren. 📄 GOV.UK, [Page not found pages](https://design-system.service.gov.uk/patterns/page-not-found-pages/)
- **Troliga orsaker och en väg vidare:** kontrollera adressen; kontaktvägen; länkar till sidorna som finns. Påstå inte *sidor som många letar efter* utan mätning. 📄 GOV.UK; Yifrah kap. 12 ⚠️ rubriknivå; vad sidan ska innehålla → `guide/2-3-struktur.md`

## Samtyckesrutan

Vad rutan ska säga juridiskt står i `guide/2-8-teknik-och-kvalitet.md`, *Samtycke och analys*, och ordet är *cookies* på företagssajter (`BESLUT.md` 2026-10-16). För texten gäller dessutom:

- **Knapparna är likvärdiga i ord och form:** *Godkänn alla* och *Neka alla*, samma storlek, och *Välj själv* som tredje väg. (→ 2-8)
- **Kategorierna förklaras med vad som händer för besökaren,** på vardagsspråk före verktygsnamnen: *Annonser: Google och Meta mäter och visar annonser på Facebook och Instagram.* 📄 Myndigheternas skrivregler 1.4 (förklara fackord); 2-8
- **Kvittot upprepar valet** (ovan) och säger var det kan ändras.

## Öppettider, priser, adresser och telefonnummer

Skrivs enligt svensk norm. 📄 Myndigheternas skrivregler, kap. 12 (Språkrådet 2014)

- Klockslag med punkt: *8.00–18.00*, *kl. 18*. Normen tillåter också kolon (12.2.1), men en sajt har ett sätt. `Intl.DateTimeFormat('sv-SE')` skriver *8:00* med kolon, så tider som räknas ut i koden formateras så att de stämmer med texten. Intervall med kort tankstreck utan mellanslag, inte *från kl. 9–17*.
- Grupper i en uppräkning skiljs med semikolon när det redan finns komma inom grupperna: *Måndag och onsdag i Lund; tisdag, torsdag och fredag i Ystad.* Annars läses orten som en dag i listan. 📄 Myndigheternas skrivregler 13.4
- Datum i löptext: *16 oktober 2026*, inte *2026-10-16*.
- Belopp: *690 kr*, *1 250 kr*, med fast mellanslag i tusental, och *kr* utan punkt. Inte *SEK* i löptext. (*:-* nämns inte i normen ⚠️.)
- Telefonnummer grupperas: *070-123 45 67*, *08-713 10 00*. I `tel:`-länken står numret internationellt utan nolla (*+46701234567*); formatet i länken har ingen källa ⚠️.
- Veckodagar skrivs ut i löptext. Förkortningar som *mån–fre* är vanliga i tabeller men saknar svensk norm ⚠️.
- **En rad som räknar ut *i dag* säger det som gäller just nu:** dagens tider medan det är öppet, och efter stängning eller en stängd dag också nästa tillfälle (*Stängt nu. Nästa mottagning: måndag 8.00–18.00.*). *(Härlett ur NN/g, Designing Empty States: visa systemets verkliga läge.)*

## Förbjudet

- *Klicka här*, ensamt *Läs mer*, *Skicka*, *OK* och *Kom igång* som enda text.
- *Är du säker?*, *Oops*, *Hoppsan*, *Vänligen*, *Något gick fel* utan väg vidare, och *framgångsrikt* i ett kvitto (*Dina val är sparade*, inte *Dina val har sparats framgångsrikt*). 📄 better-writing, *Before you finish*
- *Klicka* i en instruktion (ovan).
- Ett tillgängligt namn som byter ut den synliga texten.
- Olika namn på samma sida eller tjänst.
- Humor i fel, pris och hälsa. 📄 NN/g, [Impact of Tone of Voice](https://www.nngroup.com/articles/tone-voice-users/) (*humor is extremely risky*)
