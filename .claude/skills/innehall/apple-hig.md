# Apples HIG för innehållet

Delfil till `SKILL.md`. Det Apples *Human Interface Guidelines* (HIG) säger om ord, ton, felmeddelanden, inkluderande text och bilder av människor, översatt till svenska företagssajter. Det mesta bekräftar det som redan står i `mikrotext.md`, `text.md` och `rost.md`; här står bara det HIG tillför eller säger annorlunda. Guidens regler och besluten går före (`guide/2-7-innehall.md`, `BESLUT.md`).

Källa: 📄 Apple, [Human Interface Guidelines](https://developer.apple.com/design/human-interface-guidelines/), sidorna *Writing* (ändrad 2025-12-16), *Inclusion*, *Alerts*, *Feedback*, *Entering data*, *Text fields*, *VoiceOver*, *Accessibility* och *Privacy*, lästa som JSON 2026-10-16. Apples stilguide (*Apple Style Guide*) som HIG hänvisar till är inte läst ⚠️.

## Det HIG bekräftar (redan hos oss)

Röst som ligger fast och ton som följer läget; det viktigaste först; knappar och länkar med verb; aldrig *Klicka här*; fel nära fältet, utan skuld och utan *Oops*, med besked om hur det rättas; samma ord för samma sak; vardagsspråk utan fackord. 📄 HIG *Writing*; → `rost.md`, `mikrotext.md`, `text.md`. HIG är en andra oberoende källa till de reglerna, bredvid GOV.UK och NN/g.

## Det HIG tillför

- **Skriv för fingret, inte för musen.** Säg inte *klicka* på en sida som mest läses på telefon. Skriv *välj*, *tryck på* eller bara knappens namn: *Kartan laddas från Google när du väljer Visa kartan från Google.* 📄 HIG *Writing* (*"not saying 'click' for a touch device like iPhone or iPad where you mean 'tap'"*); GOV.UK, *A to Z* (*välj* i stället för *klicka*, → `kallor.md`).
- **"Vi" betyder företaget, och bara det.** På en företagssajt är *vi* naturligt i löptexten. I fel och statusbesked säger texten vad som hände, inte vad *vi* har problem med: *Meddelandet skickades inte* hellre än *Vi har problem att skicka*. 📄 HIG *Writing* (*"Avoid using we … particularly problematic in error messages"*) och *Inclusion* (*"reserving words like we and our to represent your software or company"*).
- **Ägande pronomen sparsamt.** *Bokning* räcker oftast i stället för *Din bokning*, och perspektivet byts inte mitt i en text (*dina val* i ena raden, *mina val* i nästa). 📄 HIG *Writing* (*"Use possessive pronouns sparingly"*). Instruktion (en källa – bänken).
- **Etikett för en inställning beskriver vad den gör när den är på,** och besökaren drar själv slutsatsen om av. Gäller samtyckesrutans kategorier: *Statistik: Google Analytics mäter hur besökare använder webbplatsen*, inte en beskrivning av båda lägena. 📄 HIG *Writing* (*"Describe what it does when turned on, and people can infer the opposite"*).
- **Ett tomt läge ger ett nästa steg.** En sida eller ruta utan innehåll (inga lediga tider, inget sökresultat, en tom lista) säger varför och erbjuder en knapp eller länk vidare. 📄 HIG *Writing* (*"Provide clear next steps on any blank screens"*); → `mikrotext.md`, statustext i par.
- **En ruta som avbryter har en rubrik som säger vad som hänt,** högst två rader, aldrig bara *Fel*. Knapparna är ett eller två ord med verb som hör ihop med texten; *OK* bara när rutan enbart informerar, och knappen som avbryter heter *Avbryt*. 📄 HIG *Alerts*; → `mikrotext.md`, *Förbjudet* (*OK*).
- **Bekräfta bara det som betyder något.** Besökaren räknar med att en handling lyckas och behöver främst besked när den inte gör det. En skickad förfrågan eller ett sparat samtyckesval kvitteras; en vanlig länk gör det inte. 📄 HIG *Feedback* (*"reserve this type of confirmation for activities that are sufficiently important"*); → `mikrotext.md`, *Kvitton*.
- **Fälten ber bara om det som behövs,** visar formatet med en etikett och ett exempel, och har rätt tangentbord (`type`, `inputmode`, `autocomplete`). Platshållartext ersätter aldrig etiketten. Fältets bredd antyder hur långt svaret är. 📄 HIG *Entering data* och *Text fields*; → `mikrotext.md`, *Fel och formulär*; GOV.UK för fältbredd.
- **Fråga inte efter kön.** De flesta tjänster behöver inte veta det; måste uppgiften finnas av hälso- eller lagskäl ges inkluderande val, inklusive *vill inte uppge*. 📄 HIG *Inclusion* (*"Most apps and games don't need to know a person's gender"*).

## Inkluderande text och bilder

- **Text utan kön där könet inte spelar roll,** och hellre plural eller *du* än *han eller hon*. 📄 HIG *Inclusion*, *Gender identity*.
- **Personen före funktionsnedsättningen,** och ingen funktionsnedsättning som bild för något negativt (*blind för*, *lam*). 📄 HIG *Inclusion* (*"Take a people-first approach"*).
- **Humor och vardagliga uttryck används varsamt,** och aldrig i fel, pris och hälsa. 📄 HIG *Inclusion* (*"Consider carefully before including humor"*); → `mikrotext.md` (NN/g, *humor is extremely risky*).
- **Stock- och AI-bilder av människor visar en bredd av ålder, bakgrund och kroppar och undviker stereotyper,** som bara manliga läkare och kvinnliga sjuksköterskor. Det gäller bilder som inte är kundens; kundens egna foton visar de som finns. Miljöerna är vardagliga snarare än lyxiga, om inte kunden säljer lyx. 📄 HIG *Inclusion*, *People and settings* (*"avoid stereotypical representations, such as showing only male doctors, female nurses"*); → ärlighetsregeln i `guide/2-7-innehall.md` (`BESLUT.md` 2026-10-15).

## Skärmläsaren

- **Varje sida har en unik titel som säger innehållet och syftet,** och rubrikerna är korrekta, eftersom VoiceOver börjar med titeln och navigerar med rubriker. 📄 HIG *VoiceOver* (*"Offer unique titles that succinctly describe each page's content and purpose"*); HIG *Toolbars* (*"Don't title windows with your app name"*). Sidans titel börjar alltså med sidans namn, inte bara företagets (→ struktur- och kvalitetsskillen, titlar).
- **Beskriv det bilden själv säger, inte det texten bredvid redan säger,** och dölj dekor. 📄 HIG *VoiceOver* (*"describe only the information the image itself conveys"*); → `bilder.md`, beslutsträdet.
- **Text i video och ljud har en textversion:** undertexter för tal och en utskrift för längre klipp. 📄 HIG *Accessibility*, *Hearing*; → `video.md`.

## Bilder från kundens iPhone

- **Foton från en iPhone är oftast HEIC i Display P3.** De görs om till JPEG med profilen kvar, och Astros bildkedja gör sedan om dem till sRGB. Profilen tas aldrig bort utan att bilden konverteras, eftersom färgerna då blir bleka. 📄 HIG *Color*, *Color management*; [sharp, Output](https://sharp.pixelplumbing.com/api-output); → `bilder.md`, *Storlek och format*, och `../yta/apple-hig.md`.

## Det HIG säger annorlunda, och varför vi gör som vi gör

- **Versaler i rubriker och knappar.** HIG använder *Title Case* på engelska. På svenska gäller versal bara i början och i namn (→ `text.md`). Apples poäng står kvar: välj en stil per elementtyp och följ den.
- **Validera medan besökaren skriver.** HIG vill kontrollera värden direkt och en e-postadress när besökaren lämnar fältet. GOV.UK säger tvärtom: *"Do not validate when the user moves away from a field"*, eftersom det stör den som skriver långsamt, och kontrollerar när besökaren går vidare. Vi följer GOV.UK, som bygger på egna användartester. 📄 HIG *Entering data* och *Text fields*; GOV.UK Design System, [Validation](https://design-system.service.gov.uk/patterns/validation/) (läst 2026-10-16); → `mikrotext.md`, *Fel och formulär*.
- **Knappen *Fortsätt* är inaktiv tills fälten är ifyllda** enligt HIG. Vi låter knappen vara aktiv och visar felen när besökaren försöker gå vidare, eftersom en grå knapp inte säger vad som saknas (→ `../yta/detaljer.md`, *Inaktiv*: sällan på en företagssajt). 🔧 härlett; GOV.UK:s validering ovan förutsätter att knappen går att trycka på.

## Förbjudet

- *Klicka* om det som ska göras på en telefon.
- *Vi* som subjekt i fel- och statusbesked.
- Frågor om kön som inte behövs.
- Stock- eller AI-bilder som upprepar stereotyper om yrken eller kön.
- En sidtitel som bara är företagets namn.
