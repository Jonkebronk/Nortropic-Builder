# Mobilen först

Regeln står i guiden: varje sektion designas och prövas i mobilbredd före dator, och mobilen får ett eget innehållsurval där det behövs (→ `guide/2-4-skelett.md`, N1; Wroblewski, *Mobile First*; `mattstock/mattstock.md`). Johnny fällde tre sajter i måttstocken enbart på mobilutförandet: *"Det är Nortropics ansvar att layouten håller på mobilen."*

## Vad mobilen först betyder i skelettet

- **Begränsningen är ett urval.** Det som inte får plats i mobilens första skärm prioriteras bort eller flyttas ned, inte trycks ihop. Wroblewski: mobilens begränsningar tvingar fram fokus på det viktigaste innehållet *(⚠️ boken inte läst i original; sammanfattningen bygger på förlagets beskrivning och lager-3-4-anteckningarna)*.
- **Samma innehåll, inte sämre innehåll.** Det besökaren behöver för att handla (tider, pris, plats) får inte finnas bara i en sidokolumn som döljs i mobilen. 🔧 härlett.
- **Skärm för skärm.** En sida granskas som besökaren ser den när den scrollar: sticky sidhuvud, knapplisten, vad som syns samtidigt. Helsidesbilder i mobil visar inte fasta element rätt.

## Mobilbaslinjen

*(en källa – bänken: Kowalski, `mobile-native`, MIT; skälen per rad)*

| Regel | Skäl |
|---|---|
| `<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">`, aldrig `user-scalable=no` eller `maximum-scale=1` | Zoomspärr bryter 📄 WCAG 2.2, 1.4.4; `viewport-fit=cover` behövs för säkra ytor |
| Första vyn har `min-height` i `svh`, aldrig `vh`; `dvh` bara för helskärmspaneler som menyn | `vh` räknar med att adressfältet är dolt, `dvh` ger hopp under scrollning |
| `env(safe-area-inset-*)` på alla sidor där innehåll når kanten: `-bottom` på knapplisten och menypanelen, och `max(<kitets marginal>, env(safe-area-inset-left))` respektive `-right` på sidhuvud, innehåll och list | Annars hamnar knapparna under hemindikatorn och texten under sensorhuset i liggande läge; marginalen får aldrig bli mindre än kitets (📄 WebKit, [Designing Websites for iPhone X](https://webkit.org/blog/7929/designing-websites-for-iphone-x/)) |
| `:hover`-stilar inom `@media (hover: hover) and (pointer: fine)`; tryckåterkoppling med `:active` | Hover fastnar annars efter ett tryck på pekskärm |
| Synlig tryckåterkoppling, aldrig ingen alls | Besökaren ska se att trycket gick fram; Kowalski sätter tap highlight till `transparent` med ett eget `:active`, Refero vill ha en avsiktlig highlight – båda ger återkoppling |
| Fält med minst 16 px text och rätt `type`, `inputmode` och `autocomplete` | iOS zoomar in i mindre fält ⚠️ (Apples dokumentation inte verifierad) |
| `overscroll-behavior: contain` på menypanelen, inte på `html` | Hindrar att sidan bakom rullar; `none` på dokumentet är för appar |
| `user-select: none` och `-webkit-touch-callout: none` bara på knappar (`<button>` och knappar som är länkar), aldrig på textlänkar eller text | Ett långt tryck markerar annars knappens etikett; besökaren ska kunna kopiera telefonnummer och adress, och långtrycket på en `tel:`-länk ger val som Kopiera |
| `theme-color` med samma färg som sidhuvudets bakgrund, inte kitets accent; en per färgschema när kitet har mörkt läge | Webbläsarens list och statusraden smälter ihop med sidans topp. `theme-color` färgar Chrome på Android och äldre Safari; Safari i iOS 26 färgar efter `body` och klistrade element vid kanten, så sidans bakgrund sätts också på `html` eller `body` (⚠️ odokumenterat från Apple, → `apple-hig.md`). |
| `touch-action: manipulation` på knappar och länkar, aldrig på `body` eller `*` | WebKit tar bort tryckfördröjningen på 350 ms med `width=device-width` bara när sidan inte är inzoomad; den som zoomat in får fördröjningen tillbaka utan egenskapen. Nypzoom fungerar ändå. 📄 [WebKit, More Responsive Tapping on iOS](https://webkit.org/blog/5610/more-responsive-tapping-on-iOS/), 2015 |
| `-webkit-text-size-adjust: 100%` på `html` | Hindrar att mobilwebbläsaren förstorar text på egen hand; inte `none`, som också stänger av användarens förstoring i vissa webbläsare ⚠️. 📄 [MDN, text-size-adjust](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/text-size-adjust) (inte Baseline) |
| Mediefrågor på förmåga (`hover`, `pointer`, `env()`), aldrig gissning på bredd eller webbläsarsträng | Pekskärm och mus finns samtidigt: surfplatta med styrplatta, dator med pekskärm |

Inte: PWA-, app- och Next-delarna, `overscroll-behavior: none` på dokumentet (en sajt är ett dokument där sidan får studsa) och karusellernas `touch-action: pan-y` (vi har inga karuseller).

## Tumzonen och fasta element

- **Kontaktvägen ligger nere på mobilen, i en knapplist som visas när sidans egna knappar har scrollats bort; sidhuvudet är smalt med "Meny" och göms vid scroll nedåt** (→ `guide/2-3-struktur.md`, N1; `BESLUT.md` 2026-10-15, *Kontaktvägen nere på mobilen*).
- **Källäget för listen:** guiden hänvisar till "Hoober, tumzonen", men Hoober tar själv avstånd från tumzonsdiagrammen. Hans senare forskning visar att besökare helst tittar och trycker i mitten, att sekundära handlingar hör hemma längs över- och nederkanten, och att träffsäkerheten är cirka 7 mm i mitten, 9–10 mm för rader vid kanten och 12 mm i hörnen (Hoober, [Design for Fingers, Touch, and People](https://www.uxmatters.com/mt/archives/2017/03/design-for-fingers-touch-and-people-part-1.php), del 1–3, 2017, över 1 300 observationer). Listen stöds alltså av kanten, inte av tumzonen. Wroblewski varnade 2011 för fasta bottenmenyer på mobilwebben, eftersom webbläsarens egna kontroller ligger nära (*Mobile First*, kap. 4) – listen prövas därför i riktig Safari på iPhone och Chrome på Android.
- **Sidhuvudet:** opak bakgrund, litet, och in- och utglidningen tar cirka 300–400 ms och slutförs när den väl startat (NN/g, [Sticky Headers](https://www.nngroup.com/articles/sticky-headers/), 2021); avstängd under reducerad rörelse (→ `guide/2-6-rorelse.md`).
- **Budget för fast ram:** en fast banderoll kan ta 15–20 % av mobilens yta (Baymard, *Banner UI*, 2026). Sidhuvud och knapplist tar tillsammans högst cirka 15 % av höjden i 375 × 667. 🔧 härlett; gränsen är ingen norm.
- **Luft nedtill:** sidan får utfyllnad motsvarande listens höjd plus säker yta, så att sidfotens sista rad kan scrollas fram (Hoober 2017, del 2).
- **Knapplisten visas inte samtidigt som andra knappar för samma handling** – varken förstavyns, sidtoppens eller sista bandets. Johnnys dom över en förebild: listen *"täcker hero-knapparna när man scrollat lite"* (`mattstock/mattstock.md`). 🔧 Att sista bandet räknas in är härlett ur samma dom.
- **Inget fast element skymmer fokus:** `scroll-padding-top` och `scroll-padding-bottom` motsvarar sidhuvudets och listens höjd. 📄 WCAG 2.2, [2.4.11 Focus Not Obscured (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/focus-not-obscured-minimum.html), AA.
- **Vid låg höjd blir sidhuvud och list statiska** (400 % zoom, liggande telefon), som W3C rekommenderar för reflow (`BESLUT.md` 2026-10-16, C3; 📄 WCAG 2.2, [1.4.10 Reflow](https://www.w3.org/WAI/WCAG22/Understanding/reflow.html)).
- **Utan JavaScript ligger listen synlig** och sidan har utfyllnad nedtill så att inget hamnar under den.
- **Med formulär göms listen när ett fält har fokus,** eftersom tangentbordet då tar halva skärmen och listen annars kan skymma fältet. `interactive-widget=resizes-content` i viewport-taggen låter tangentbordet krympa layouten i Chrome på Android ⚠️ (inte i Safari; stödet är inte prövat). 🔧 härlett ur 📄 WCAG 2.2, 2.4.11, och [MDN, viewport](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/meta/name/viewport); Kowalski: pröva med tangentbordet uppe.
- **Fasta element mäts också med större text:** vid 150 % text (24 px) i 375 × 812 är sidhuvud och list tillsammans större än vid 100 %; budgeten ovan gäller båda. Vid låg höjd i `rem` blir de statiska, och eftersom `rem` i mediefrågor följer webbläsarens teckenstorlek slår det till tidigare när texten är större.

## Reflow och zoom

- Ingen horisontell scroll i 320 CSS-px (→ `guide/bilaga-c-kontroller.md`, kontroll 3). 400 % zoom av 1280 × 800 motsvarar ett fönster på 320 × 200: pröva båda.
- Text kan förstoras till 200 % utan att något klipps (📄 1.4.4), och radavstånd och teckenavstånd kan ökas (📄 1.4.12).

## Klickytor

- Minst 24 × 24 CSS-px eller tillräckligt avstånd (📄 WCAG 2.2, 2.5.8, AA); 44 × 44 för knappar, menyknappen och fristående länkar som Nortropics nivå (→ `guide/2-4-skelett.md`, *Kontroll*). Fristående länkar är också sidfotens länklistor och menyns länkar: i mobilen får de utfyllnad upp till 44 px, och glyferna står minst 24 px isär ([layout.md](layout.md), *Ramlösa kontroller*).
- NN/g rekommenderar minst 1 × 1 cm på pekskärm och större för primära handlingar ([Touch Targets on Touchscreens](https://www.nngroup.com/articles/touch-target-size/), 2019), och Hoober 9–10 mm för rader vid kanten. Knapplistens knappar, som sitter vid kanten, bör därför vara högre än 44 px – omkring 56 CSS-px ⚠️ (omräkningen från millimeter beror på skärmens täthet och är inte verifierad).

## Pröva på riktig telefon

Emulering visar inte allt: hover som står kvar, tryckmarkeringen, adressfältets inverkan på höjden, zoom vid inmatning, tryckfördröjningen, studsen, säkra ytor och tangentbordet syns bara på en riktig telefon. Före leverans prövas sajten på en riktig, några år gammal telefon i Safari och Chrome: förhandsvisningen öppnas på datorns adress i det lokala nätet, med Safaris webbinspektör eller `chrome://inspect`, en gång med tangentbordet uppe och en gång liggande. Det som bara gick att kontrollera i koden skrivs som *inte prövat på telefon*. *(Kowalski, `mobile-native`, §11)*
