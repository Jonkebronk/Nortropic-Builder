---
name: innehall
description: Skriver och granskar en sajts texter, rubriker, knappar, felmeddelanden, samtyckesruta, alt-texter, fotobeställning och undertexter ur kundens faktabas och röst, på klarspråk och utan AI-mönster; använd när en sida eller ett element ska få text, när en text ska kortas eller låta mer som företaget, när bilder eller klipp ska läggas in, eller när innehållet på en sajt ska granskas.
---

# Innehåll – text, mikrotext, bilder och video

Lager 7 i guiden. Reglerna, deras nivå (N1–N4) och grund står i `guide/2-7-innehall.md` och gäller före allt här; skillen hänvisar dit och skriver inte om dem. Här står vad som ska uppnås, vad som är förbjudet, kunskapen bakom reglerna och kontrollistan. Johnnys beslut i `BESLUT.md` väger tyngst.

## Syfte

Texter och bilder som är kundens egna, korta, sanna och lätta att använda. Besökaren förstår vad, var och hur på mobilens första skärm, hittar svaret på sin fråga utan att läsa allt och kan lita på varje påstående. Det är måttstockens fråga 1 och 2 (`mattstock/mattstock.md`): når kunden företaget, och är det äkta.

## In

- `sites/<namn>/fakta.md` – den enda källan till fakta om kunden (→ 2-7, *Faktabasen*).
- `sites/<namn>/brief.md` – besökare, primär handling, ton och intryck, *får inte påstås*.
- `sites/<namn>/rost.md` om den finns, annars intervjun och kundens gamla texter (→ `rost.md`).
- `sites/<namn>/sidkarta.md` – vilket innehåll varje sida behöver (→ `guide/2-2-omfattning.md`, `guide/2-3-struktur.md`).
- Kundens foton och klipp, med post i `fakta.md` (källa, licens, samtycke).
- Vid granskning: den körande sajten i 375 och 1280 px, och innehållsfilerna.

## Ut

- Innehållsfilerna per sida med texter, mikrotext och alt-texter (→ 2-7, *Texterna ligger i innehållsfiler*).
- En platshållare `[[PLATSHÅLLARE: vad som saknas]]` och en fråga till kunden för varje lucka (→ 2-7, *Platshållare*).
- `rost.md` med röstprofil, ordlista och citatbank (mall i `rost.md`).
- Bildbeställningen och bildposterna (mall i `bilder.md`); undertexter som WebVTT (`video.md`).
- Vid granskning: en fyndlista med sida, element, före, efter, varför med källa, och allvar.

## Principer

1. **Fakta bara ur faktabasen.** Det som saknas blir en platshållare och en fråga, aldrig en gissning. Ändrad text faktakontrolleras igen. (→ 2-7, N1)
2. **Kundens ord först.** Ägarens och kundernas egna formuleringar bär texten; citat och omdömen återges ordagrant med plattform och datum. (→ 2-7; `rost.md`)
3. **Besökarens fråga först.** Det viktigaste överst, en sak per sektion, rubriker som ensamma berättar sidans innehåll. (`text.md`; Myndigheternas skrivregler kap. 1–2; NN/g)
4. **Konkret och styrkbart.** Varje löfte får en detalj ur faktabasen eller stryks; en rad som en konkurrent kunde skriva skrivs om. (→ 2-7, bytestestet; `rost.md`, rösttestet; `text.md`)
5. **Klarspråk:** aktiva verb, vardagsord, korta meningar, *du* till besökaren och *ni* till företag, inga förkortningar på webben. (`text.md`)
6. **Rösten ligger fast, tonen följer läget:** lugn och rak i fel, varm i tack, saklig om pris och hälsa. (`rost.md`)
7. **Mikrotext:** samma ord för samma sak, knappar som säger handlingen, länkar som går att förstå ensamma, fel som säger hur man rättar, kvitton som säger vad som hände. (`mikrotext.md`)
8. **Svensk typografi och sifferskrivning** enligt Språkrådet: kort tankstreck, svenska citattecken, *8.00–18.00*, *690 kr*, *070-123 45 67*. (`text.md`, `mikrotext.md`)
9. **Kundens egna bilder först,** med alt-text efter beslutsträdet och 1177:s form, och en bildbeställning för det som saknas. (`bilder.md`; → 2-7, *Bilder*)
10. **Klipp med tal får undertexter,** transkriberade lokalt. (`video.md`)
11. **AI-mönster rättas från fakta, inte med synonymer.** (`ai-monster.md`)
12. **Språkgrinden rapporterar.** En regel stoppar först med norm eller två källor och en mätning utan falsklarm. (`sprakgrind.md`)

## Förbjudet

- Att hitta på fakta, siffror, citat, omdömen, kundlogotyper eller socialt bevis (→ 2-7, faktakontrollen; fallgrop 180).
- Effektlöften i kundens egen text för vård och liknande, och superlativ eller jämförelser utan belägg (`BESLUT.md` 2026-10-15, *Omdömen*; `text.md`).
- Att ändra i citat, omdömen eller kundens skrivprov.
- *Välkommen till …* som rubrik (→ `guide/2-4-skelett.md`, N1).
- Text inbränd i bild eller video (→ 2-7, N1; WCAG 1.4.5).
- En bild som ser ut att visa kundens personal, lokal eller arbete utan att vara kundens, och bilder av personer utan samtycke (→ 2-7, N1).
- Långt tankstreck (—), engelska citattecken, Title Case och procent utan mellanslag i svensk text (`text.md`).
- *Klicka här*, ensamt *Läs mer*, *Oops*, *Vänligen*, *Är du säker?* och skuld i felmeddelanden (`mikrotext.md`).
- Att kopiera ett annat företags texter eller Wikipedias exempel ordagrant (upphovsrätt; CC BY-SA, `ai-monster.md`).
- Att skicka kundens ljud, text eller foton till en molntjänst för transkribering, språkgranskning eller bakgrundsborttagning (`video.md`, `sprakgrind.md`, `bilder.md`).
- rembg utan uttryckligt vald modell; standardmodellen kräver kommersiellt avtal (`bilder.md`).
- Att låta en omätt språkregel stoppa ett bygge (`sprakgrind.md`).

## Kontrollista mot en sajt

Körs i 375 och 1280 px, mot alla sidor och mot samtyckesrutan, 404-sidan och kvittona. Varje punkt pekar på regeln.

1. **Faktakontrollen:** varje faktapåstående finns i `fakta.md`; inga platshållare kvar vid publicering (→ 2-8, N1-kontroll 5 och 6).
2. **Första vyns rubrik** säger tjänst och ort (→ 2-4, N1).
3. **Bytestestet** på varje rubrik och ingress; generiska löften har en detalj eller stryks (→ 2-7).
4. **AI-mönster:** inga träffar på mönster märkta *ensam*; flera svaga i samma stycke skrivs om (`ai-monster.md`).
5. **Klarspråk:** meningar över 20 ord, passiv som döljer vem som gör något, förkortningar i löptext och rubriker, fackord utan förklaring (`text.md`).
6. **Rubriker:** informativa, parallella på samma nivå, första meningen fortsätter inte rubriken (`text.md`; Myndigheternas skrivregler 3.5.5).
7. **Upprepning:** samma mening eller uppgift mer än två gånger på samma sida (`text.md`).
8. **Samma ord för samma sak:** sidnamn, tjänstnamn, *omdöme* eller *recension*, länktext mot målsidans rubrik (`mikrotext.md`; → 2-3, G4).
9. **Knappar och länkar:** verb och vad man får; begripliga ensamma; synlig text först i det tillgängliga namnet (`mikrotext.md`; WCAG 2.4.4, 2.5.3).
10. **Lägen:** samtyckesrutan, kvittot, 404, kartans laddning och tider som räknas ut säger vad som gäller och vad man gör nu (`mikrotext.md`).
11. **Siffror, datum, klockslag, belopp och telefonnummer** enligt svensk norm (`mikrotext.md`).
12. **Alt-texter:** beslutsträdet, cirka 80 tecken, inget *bild av*, inga uppgifter om hälsa utan samtycke; dekor har `alt=""` (`bilder.md`).
13. **Foton:** källa, licens och samtycke i `fakta.md`; ingen förstoring över cirka 1,4 gånger (→ 2-5, G1); rena kanter mot sektionens bakgrund; inget motiv kapat (`bilder.md`; `mallar/granskning.md`).
14. **Video:** undertexter för tal, paus för autouppspelning (`video.md`; → 2-6).
15. **Tonen mot briefen:** orden under *Ton och intryck* syns i texten, och inget under *Får inte påstås* står där (→ `brief.md`; `rost.md`).

## Delfiler

| Fil | Innehåll |
|---|---|
| `text.md` | Klarspråk, rubriker, listor, styrkbara påståenden, skiljetecken |
| `mikrotext.md` | Knappar, länkar, fel, kvitton, 404, samtyckesrutan, siffror och tider |
| `rost.md` | Röst och ton, mallen för `rost.md`, rösttestet |
| `ai-monster.md` | 25 AI-mönster i svensk text, hur de vägs och rättas, licens |
| `bilder.md` | Alt-text, bildtext, fotolistan, frilägga och beskära |
| `video.md` | Undertexter, KB-Whisper, whisper.cpp, FFmpeg |
| `sprakgrind.md` | Vale, Hunspell sv_SE, LIX och mätningen före en hård regel |
| `kallor.md` | Källorna med version och licens, luckor och förslag till Johnny |
