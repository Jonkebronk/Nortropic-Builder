# Pröva strukturen

Kontrollerna och deras nivåer står i guiden (→ `guide/2-3-struktur.md`, *Kontroll*; `guide/bilaga-c-kontroller.md`). Här står vad varje prov visar och vad det inte visar.

## Länkgrafen

- **Genomsök sajten från start med bara `<a href>`** (Playwright eller Screaming Frog Free, som räcker upp till 500 adresser) och skriv per sida: klickdjup, länkar in och ut, och vilka av dem som står i huvudinnehållet och inte bara i meny och sidfot.
- **Det visar:** föräldralösa sidor (låst kontroll, N2), sidor djupare än två klick (flaggar, N2), återvändsgränder utan kontextuella länkar ut, och menyval som inte leder till en sida.
- **Det visar inte** om besökaren förstår etiketterna – det gör trädtestet.

## Trädtest med AI som röktest

Metoden står i guiden (N2): trädet som ren text, 6–10 uppgifter i kundens ord utan menyns ord, minst fem körningar med slumpad syskonordning, inga personaprompter. Misslyckanden är röda flaggor; framgångar bevisar inget, eftersom ChatGPT löste 9–10 av 10 uppgifter där människor lyckades i cirka 51 % ([MeasuringU](https://measuringu.com/chatgpt4-tree-test/)), och personas gör syntetiska svar trovärdigare men inte träffsäkrare ([Kuric m.fl. 2026](https://arxiv.org/abs/2605.18302); [NN/g, syntetiska användare](https://www.nngroup.com/articles/synthetic-users/)).

## Mänskligt trädtest

- **Ett per branschprofil, inte per kund** (→ `guide/2-3-struktur.md`, N2). Uppgifterna får inte använda menyns ord; måtten är andel lyckade, direkthet och tid ([NN/g, Tree Testing](https://www.nngroup.com/articles/tree-testing/)).
- **Utformning:** börja med en enkel uppvärmningsuppgift, definiera rätt svar i förväg, och mät direkthet – om testpersonen gick direkt eller studsade mellan kategorier (NN/g, Tree Testing, 2023, granskad 2026).
- **Gratisnivåerna har krympt** (sett 2026-10-16): UXtweak Free ger 15 svar i månaden och högst 10 svar och 2 uppgifter per trädtest; Lyssna Free ger 15 egenrekryterade svar, och trädtest nämns inte i gratisnivån ⚠️. Guidens uppgift om 30 svar i månaden stämmer inte längre. Ett riktigt test kräver betald nivå – Johnnys beslut.
- **Kortsortering** skapar en struktur och trädtestet prövar den. Per kund är den överdriven för 5–12 sidor; per branschprofil kan en öppen sortering med branschens tjänster som kort avgöra hur tjänsterna delas in och vad de heter – minst 15 deltagare kvalitativt, 30–50 för generaliserbara resultat (NN/g, [Card Sorting](https://www.nngroup.com/articles/card-sorting-definition/), 2024).
- **Kortsortering med AI** används bara för hypoteser om grupperingar (kappa .60 mot människor, [MeasuringU](https://measuringu.com/comparing-chatgpt-to-card-sorting-results/)); beslut fattas efter mänsklig prövning.

## Trunk test

Per sidmall: syns sajtens namn, sidans namn, huvudavsnitten, den lokala navigeringen och var besökaren är, inom några sekunder? Krugs sjätte fråga, sök, utgår på sajter utan sökfunktion (→ `guide/2-3-struktur.md`, N2; Krug, *Don't Make Me Think, Revisited* ⚠️ sekundärkälla). I mobilen, där menyn är dold, är det sidans namn i rubriken och den markerade platsen i menypanelen som svarar på "var är jag".

## Nyckelresor

- En resa skrivs i besökarens ord, från sökning till primär handling, och körs i mobil och dator (→ `guide/2-3-struktur.md`, N1; kontroll 4). Från sajt 2 två till fyra resor, varav minst en hela vägen.
- **En resa per typ av ingång:** startsidan, en tjänstesida och en mottagningssida – eftersom besökare från sökning landar på undersidor. 🔧

## Granskningens allvar

- **Hög:** en sida som inte nås med länkar, en nyckelresa som inte går hela vägen, en dörrsida, strukturerad data som säger emot sidan.
- **Medel:** menyval som inte leder till en sida, namn som skiljer sig mellan meny och rubrik, återvändsgränder, platsuppgifter som bara finns på datorn.
- **Låg:** länktexter som kan bli tydligare, ordningen i sidfoten.
Fynd mot ett kriterium med en källa får högst allvaret `medel` (→ `guide/bilaga-b-skills.md`).
