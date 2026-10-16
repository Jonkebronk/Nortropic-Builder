---
name: skelett
description: Bestämmer och granskar en sidas skelett på en Nortropic-sajt – vilka sektioner sidan har, i vilken ordning och variant, hur de ligger i mobilen och på datorn, layoutprimitiverna, landmärkena och hur menyn, vanliga frågor, dialoger och knapplisten beter sig – och när en React-ö får användas; använd när en sida eller sektion ska byggas, ändras eller granskas, när biblioteket får en ny sektion eller variant, när första skärmen inte säger vad, var och hur, eller när något krånglar i mobilen.
---

# Skelett

Lager 4. Garretts skelettplan: vilka delar varje sida har, var de står och vad ögat ser först. Lagret byggs enligt Brad Frosts *Atomic Design* – tokens, komponenter, sektioner, mallar och sidor (→ `guide/2-4-skelett.md`). Skillen säger vad skelettet ska uppnå och vad som är förbjudet. Reglerna som redan står i guiden refereras och skrivs inte om här.

**Grunden:** i kundbygget väljer AI:n sektion, variant och innehåll ur biblioteket och uppfinner ingen layout. Saknas en sektion byggs den i biblioteket först, med Johnnys godkännande (→ `guide/2-4-skelett.md`, *Vad byrån gör*).

## Syfte

Varje sida ska svara på besökarens frågor i den ordning de ställs, med den primära handlingen inom räckhåll var besökaren än är, och hålla i 320 px likaväl som på en stor skärm. Skillen används både när skelettet byggs och när det granskas.

## In

- Sidkartan i `sites/<namn>/sidkarta.md` med besökarens fråga och primär handling per sida (→ skillen `struktur`).
- Briefen och faktabasen (→ `guide/2-1-strategi.md`, `guide/2-7-innehall.md`), branschprofilen (→ `guide/2-2-omfattning.md`).
- Biblioteket: `bibliotek/src/sektioner/`, `komponenter/`, `mallar/` och det valda stilkitet.
- Den körande sajten i 375 och 1280 px, och i 320 px och vid låg höjd för reflow.

## Ut

- **När skelettet byggs:** sidan satt ur bibliotekets mall och sektioner, med en rad per avvikelse från mallens standardordning som antagande (→ `guide/2-4-skelett.md`, *Mallarna*). En ny sektion eller variant byggs i biblioteket med variantgolvet ([varianter.md](varianter.md)) och visas på provsidan i 375 och 1280 px.
- **När en React-ö används:** en rad med komponent, källa och licens, direktiv (`client:visible` eller ingen) och vad den kostar i JavaScript på sidan ([interaktion.md](interaktion.md), *Öar*).
- **När skelettet granskas:** fynd i granskarens form – sida, element, förväntat, faktiskt, allvar och källa – och skärmbilder skärm för skärm i 375 px, så som besökaren ser sidan med sticky sidhuvud och knapplist (→ `guide/3-2-granskning-och-kalibrering.md`).

## Principer

1. **Första skärmen svarar på vad, var och hur i 375 px.** Rubriken säger tjänst och ort, kontaktvägen syns som knapp och telefonen går att trycka på; därefter *Det praktiska* eller *Tjänster* efter bransch (→ `guide/2-4-skelett.md`, N1; `mattstock/mattstock.md`, fråga 1; `BESLUT.md` 2026-10-16). 74 % av tittiden går till de två första skärmarna och över 65 % av första skärmens till dess övre halva (NN/g, [Scrolling and Attention](https://www.nngroup.com/articles/scrolling-and-attention/), 2018, 120 deltagare – på datorskärm; att det gäller mobilen är härlett). Tjänst, ort och knapp hör därför till första skärmens övre halva.
2. **Varje sektion besvarar en fråga besökaren har, och varje sida slutar med sin primära handling** (→ `guide/2-4-skelett.md`, tabellen *Sektionerna*; `guide/2-3-struktur.md`, *Sidkartan*). En sektion utan fråga stryks. Katalogen med varianter: [sektioner.md](sektioner.md).
3. **Undersidornas topp gör samma jobb som förstavyn:** sidans namn, vad den svarar på och sidans primära handling, plus det besökaren behöver för att handla (tider, pris, plats) också i mobilen – inte bara i en sidokolumn på datorn ([sektioner.md](sektioner.md), *Sidtopp*). 🔧 härlett ur princip 1.
4. **Om-sidan visar personen i första vyn och börjar med en kort sammanfattning** av vem, vad och varför. Riktiga ansikten och en länk till omdömen hos tredje part bygger förtroende; besökaren ska inte behöva leta efter introduktionen. *(en källa – bänken: NN/g, ["About Us" Information on Websites](https://www.nngroup.com/articles/about-us-information-on-websites/), 2019, studie med över 70 användare, och [Great Summaries on 'About Us' Pages](https://www.nngroup.com/articles/about-us-summaries/), 2015; måttstockens fråga 2)* → [sektioner.md](sektioner.md), *Person och Om*.
5. **Första skärmen får inte se färdig ut.** Nästa sektion tittar fram, och inga heldragna linjer eller stora tomrum ligger vid vecket; annars tror besökaren att sidan är slut. I NN/g:s test förstod 6 av 8 inte att sidan gick att scrolla (NN/g, [The Illusion of Completeness](https://www.nngroup.com/articles/illusion-of-completeness/), 2016; [Homepage Design: 5 Fundamental Principles](https://www.nngroup.com/articles/homepage-design-principles/), 2024).
6. **Mobilen först, med eget innehållsurval där det behövs** (→ `guide/2-4-skelett.md`, N1; Wroblewski, *Mobile First*). Mobilbaslinjen – viewport utan zoomspärr, `svh`, säkra ytor, knapplisten vid kanten, hover bara där enheten kan hovra – står i [mobil.md](mobil.md).
7. **Layout ur ett fåtal primitiver, och brytpunkter ur innehållet, inte ur enheter.** Stapel, kluster, sidopanel, växel, rutnät, täckyta och ram; container queries för komponenter (→ `guide/2-4-skelett.md`, N2; Every Layout; web.dev, *Responsive web design basics*). Detaljer och den sökbara CSS-kontrolltabellen: [layout.md](layout.md).
8. **Gruppera med luft före linjer och kort.** Luften mellan grupper är tydligt större än inom en grupp, och ett kort finns bara där ramen hjälper interaktionen eller förståelsen; ett kort med en enda länk är klickbart i sin helhet eller blir en lista. Ramlösa länkar står med minst 24 px mellan glyferna. *(en källa – bänken: Krehel, better-layout; Refero, kort-testet)* → [layout.md](layout.md).
9. **Läsordning är källordning.** Det visuella följer DOM-ordningen; `order`, `row-reverse` och gridplacering flyttar inte innehåll ur ordningen. 📄 WCAG 2.2, 1.3.2 och 2.4.3 (norm) → [layout.md](layout.md).
10. **HTML först, också för öar.** Innehåll och navigation fungerar utan JavaScript; React-öar renderas till HTML vid bygget och laddas i webbläsaren bara där interaktionen kräver det. En komponent som inte klarar det tas upp med Johnny (→ `guide/2-4-skelett.md`, N1; `BESLUT.md` 2026-10-16, *React, Tailwind och JavaScript tillåts*). Primitiverna och öarna: [interaktion.md](interaktion.md).
11. **En sak har en kontroll och samma utseende överallt.** Samma primära handling har samma stil och samma etikett, eller en kortform av den där platsen är trång ("Boka tid" i knapplisten för "Boka tid online"), i förstavyn, sidhuvudet, knapplisten och sista bandet; sidor med en annan primär handling skickar sina knappar som `lista` (→ `guide/2-3-struktur.md`, N1, G5). 📄 WCAG 2.2, 3.2.4 Consistent Identification; [Understanding 3.2.4](https://www.w3.org/WAI/WCAG22/Understanding/consistent-identification.html): "does not require identical labels".
12. **Fasta element skymmer aldrig fokus eller innehåll, och dubblerar inte knappar som redan syns.** Sidhuvudet och knapplisten släpper plats med `scroll-padding`, blir statiska vid låg höjd och göms när sidans egna knappar syns (→ `guide/2-3-struktur.md`, N1; `BESLUT.md` 2026-10-16, C3). 📄 WCAG 2.2, 2.4.11 och 1.4.10 → [mobil.md](mobil.md).
13. **Landmärken och rubriker följer mallen:** en `h1` per sida, en `h2` per sektion, region bara för det besökaren vill hoppa till, och länken Hoppa till innehållet först (→ `guide/2-4-skelett.md`, N2; W3C APG, *Landmark Regions*).
14. **Varianter skiljer sig på riktigt, längs en namngiven axel, och klarar samma golv** (→ `guide/2-4-skelett.md`, N2; Krehel, variant) → [varianter.md](varianter.md).
15. **Referenser låses innan något byggs, och varje stort val har en källa.** Ett dominerande drag ur en referens, ett par lånade detaljer, aldrig ett genomsnitt av flera (Refero, refero-design). En referens mäts i flera bredder och tillstånd, en skärmbild ger bara förhållanden, och varje värde avbildas på kitets tokens (Krehel, explain-interface och build-design) → [referenser.md](referenser.md).
16. **Skelettet håller när texten växer.** Med webbläsarens text på 150 och 200 % klipps inget, inget hamnar över annat och inget långt ord eller namn tvingas på en rad; det som göms tills det får fokus göms med klippning, inte med en förskjutning i px. 📄 WCAG 2.2, 1.4.4 (F69); Krehel, *Plan for growth and clipping* → [layout.md](layout.md), *Text som växer*.

## Förbud

- Ingen layout uppfunnen i kundbygget; inga sektioner, färger, avstånd eller typsnitt utanför biblioteket och kitet (→ `guide/2-4-skelett.md`, N1).
- Ingen rubrik som börjar med *"Välkommen till"*, och ingen första skärm utan kontaktväg (→ `guide/2-4-skelett.md`, N1).
- Inga automatiska bildspel, karuseller eller marquee som rör sig av sig själva, och inga popup-rutor som skymmer innehållet vid ankomst (→ `guide/2-4-skelett.md`, N1; 📄 WCAG 2.2, 2.2.2).
- Ingen ARIA-roll `menu` för webbplatsnavigering, och ingen menyknapp som bara är en ikon (→ `guide/2-4-skelett.md`, primitiverna; W3C APG).
- Inget innehåll som de flesta behöver bakom ett dragspel, och inga dragspel i dragspel (GOV.UK, *Details* och *Accordion*).
- Inga tjänster, priser eller kontaktuppgifter i rader som scrollar i sidled i mobilen (NN/g, *The Illusion of Completeness*, 2016).
- Inget innehåll som börjar osynligt och kräver JavaScript för att synas (→ `guide/2-6-rorelse.md`).
- Ingen `user-scalable=no` eller `maximum-scale=1` (📄 WCAG 2.2, 1.4.4; Kowalski, mobile-native).
- Ingen kod från en komponent utan uttalad licens; inga demotexter, påhittade siffror eller logotyper ur en komponentkälla ([varianter.md](varianter.md), *Källor och licens*).
- Ingen React-ö för något som HTML och CSS klarar, och ingen `client:only` för navigation, länkar eller text som sökmotorer och skärmläsare behöver (📄 Google, *crawlbara länkar*).
- Ingen ny sektion eller variant direkt i en kundsajt; den byggs i biblioteket och godkänns av Johnny.

## Kontrollista mot en sajt

Kör i 375 och 1280 px, med sticky sidhuvud och knapplist som besökaren ser dem, och i 320 px och vid låg höjd. Fynd skrivs med sida, element, förväntat, faktiskt, allvar och källa.

1. **Blickprovet:** säger mobilens första skärm vad, var och hur, med kontaktvägen som knapp i skärmens övre halva? Syns det att sidan fortsätter (inget falskt golv) i 375 × 667 och 390 × 844? (→ `guide/2-4-skelett.md`, *Kontroll*)
2. **Sektionsordning:** följer varje sida mallens ordning eller ett loggat antagande, och slutar sidan med sin primära handling?
3. **Undersidornas topp:** finns sidans namn, primära handling och det besökaren behöver för att handla (tid, pris, plats) inom första skärmen i 375 px?
4. **Om-sidan:** syns personen (foto, namn, yrke) i första vyn på mobil och dator?
5. **Knappar:** samma stil och samma etikett (eller en kortform av den) för samma handling överallt; högst en primär handling per vy; knapplisten dubblerar inte knappar som redan syns.
6. **Mobilmenyn:** knappen säger "Meny" och står skild från namnet, öppnar en panel utan JavaScript, Escape stänger och fokus går tillbaka, Tab lämnar inte panelen öppen bakom sig, aktuell sida är markerad synligt och med `aria-current`, och tjänsterna står direkt i panelen.
7. **Vanliga frågor:** `<details>` utan `name`, så att flera svar kan vara öppna (`BESLUT.md` 2026-10-16, *Vanliga frågor utan name*), svaren går att hitta med sökfunktionen, inget som alla behöver är dolt.
8. **Reflow och fokus:** ingen horisontell scroll i 320 px, inget klipps vid låg höjd, fokus skyms aldrig av sidhuvud eller knapplist (→ `guide/bilaga-c-kontroller.md`, kontroll 3 och 3b). Samma prov med webbläsarens teckenstorlek 24 och 32 px i 375 px (princip 16).
9. **Läsordning:** tabba igenom sidan – följer fokus den visuella ordningen?
10. **Landmärken och rubriker:** en `h1`, en `h2` per sektion, regioner bara för hoppmål, Hoppa till innehållet först (→ kontroll 8).
11. **JavaScript av:** innehåll, meny, vanliga frågor och kontaktvägar fungerar; varje ö har en rad om kostnad och direktiv.
12. **Variantgolvet** för varje ny sektion eller variant ([varianter.md](varianter.md)).
13. **Gruppering och linjering:** är luften mellan grupper minst dubbelt så stor som inom en grupp, ligger allt i en sektion på några få kanter, och ser inget ut att gå att trycka på som inte gör det (kort med en enda länk)? ([layout.md](layout.md))
14. **Mobilen som app:** hover bara där enheten kan hovra, synlig tryckåterkoppling, inga knappetiketter som markeras vid långt tryck, `theme-color` som sidhuvudet, `touch-action: manipulation` på kontrollerna, och provet på en riktig telefon ([mobil.md](mobil.md)).

Fynd mot ett kriterium med en källa får högst allvaret `medel` (→ `guide/bilaga-b-skills.md`, *granska*).

## Delfiler

| Fil | Innehåll |
|---|---|
| [sektioner.md](sektioner.md) | Varje sektionstyp: besökarens fråga, varianter ur källorna, när de passar, mobilen och kostnad i JavaScript |
| [varianter.md](varianter.md) | Hur varianter tas fram och bedöms, väljaren, variantgolvet, källor och licens per källa, premiummönstren |
| [layout.md](layout.md) | Layoutprimitiverna, gruppering och linjering, dolt innehåll, text som växer, container queries och den sökbara CSS-kontrolltabellen |
| [mobil.md](mobil.md) | Mobilbaslinjen med skäl, tumzonen, fasta element, tangentbordet, reflow, klickytor och provet på riktig telefon |
| [interaktion.md](interaktion.md) | Meny, vanliga frågor, dialog, knapplist, brödsmulor och hoppa-länk; tillståndsregistret per komponent; React-öar och vad de kostar |
| [referenser.md](referenser.md) | Referenslås, beslutslogg, spärren mot genomsnitt, hur en referens mäts (också ur en skärmbild), avbildningen på kitet och proven på karaktär |
| [apple-hig.md](apple-hig.md) | Apples Human Interface Guidelines översatta till en sajt i Safari på iPhone: layout, säkra ytor, träffytor, knappar, modala vyer, listor och scroll |
| [react-i-astro.md](react-i-astro.md) | React-öar i Astro: när React och när Astro, client-direktiven, budget för JavaScript, CSP, tester och hur ett block från 21st eller shadcn tas in (ur `kunskap/research/2026-10-16_react-och-javascript-i-astro.md`) |

Vilka delfiler en uppgift behöver: förstavy eller sektion i ett kundbygge – `sektioner.md` och `mobil.md`; meny, frågor eller knapplist – `interaktion.md`; layout och text som växer – `layout.md`; ny variant i biblioteket – `varianter.md` och `referenser.md`; Safari på iPhone – `apple-hig.md`; React-ö – `react-i-astro.md`.

## Källor

Garrett, *The Elements of User Experience*; Frost, *Atomic Design* ([kap. 2](https://atomicdesign.bradfrost.com/chapter-2/)); Wroblewski, *Mobile First* ([A Book Apart](https://abookapart.com/products/mobile-first)); Pickering och Bell, [Every Layout](https://every-layout.dev/) (de fria kapitlen Stack, Sidebar och Switcher); W3C [WCAG 2.2](https://www.w3.org/TR/WCAG22/) med Understanding och [APG](https://www.w3.org/WAI/ARIA/apg/); [GOV.UK Design System](https://design-system.service.gov.uk/) och [govuk-frontend](https://github.com/alphagov/govuk-frontend) v6.6.0; [WebKit, More Responsive Tapping on iOS](https://webkit.org/blog/5610/more-responsive-tapping-on-iOS/); MDN och Baseline-data ur [web-features](https://github.com/web-platform-dx/web-features); NN/g. Externa skills, destillerade och inte installerade, jämförda regel för regel 2026-10-16: Jakub Krehels `better-layout`, `variant`, `state-machine`, `explain-interface` och `build-design` ([jakubkrehel/skills](https://github.com/jakubkrehel/skills), MIT, commit 4c66b1f), Emil Kowalskis `mobile-native` och `prototype` ([emilkowalski/skills](https://github.com/emilkowalski/skills), MIT, commit 2d22863), Referos `refero-design` ([referodesign/refero_skill](https://github.com/referodesign/refero_skill), MIT, v1.0.3) och metoden i [ai-website-cloner-template](https://github.com/JCodesMore/ai-website-cloner-template) (MIT, commit ee3f5a2). Referensteman och sektionskällor står i [varianter.md](varianter.md).
