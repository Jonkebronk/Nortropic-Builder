# Tillgänglighet

Golvet är WCAG 2.2 nivå AA för alla sajter. Kodstandarden med kriterierna står i `guide/2-8-teknik-och-kvalitet.md`, *Kodstandard*, och de primitiva mönstren i `guide/2-4-skelett.md`. Här står hur det prövas och vad automatiken inte ser.

## Vad automatiken hittar

- De sex vanligaste felen på en miljon startsidor står för 96 % av de upptäckta felen: låg kontrast (83,9 %), saknad alt-text (53,1 %), saknade etiketter (51 %), tomma länkar (46,3 %), tomma knappar (30,6 %) och saknat språk (13,5 %). Alla sex hittas automatiskt. Sidor med ARIA hade fler fel än sidor utan (59,1 mot 42). 📄 [WebAIM Million 2026](https://webaim.org/projects/million/)
- *"Absence of detected errors does not indicate that a page is accessible or conformant."* (WebAIM, samma källa). W3C: verktyg kan inte pröva allt (📄 [W3C, Selecting tools](https://www.w3.org/WAI/test-evaluate/tools/selecting/)).
- Slutsats: en nollgrind på axe tar bort det mesta av felvolymen. Resten kräver urval och omdöme (WCAG-EM vid lansering → `guide/2-8-teknik-och-kvalitet.md`, N3).

## Två varv och allvar

- **Varje sida prövas i två varv.** Först bara med tangentbord: varje resa går att slutföra utan mus. Sedan som skärmläsaren ser den: varje kontroll har namn, roll och tillstånd i tillgänglighetsträdet. Är man osäker väljs plattformens standard före en egen lösning, och ARIA tas bort hellre än läggs till. 📄 Krehel, better-accessibility (MIT); [W3C APG, Read Me First](https://www.w3.org/WAI/ARIA/apg/practices/read-me-first/)
- **Allvaret `hög` kräver ett numrerat kriterium på nivå A eller AA, eller en uppgift som en hjälpmedelsanvändare inte kan slutföra.** AAA, APG:s konventioner, en `h1` med obrutna rubriknivåer och träffytor på 40–44 px är rekommendationer och blir aldrig `hög`. Gränsvärdena i kriterierna är exakta; de större målen är tumregler. 📄 Krehel, better-accessibility, *Criteria, not conventions*; → `SKILL.md`, *Utlösare*
- **Det som inte gick att pröva skrivs "ej verifierat",** aldrig "godkänt" (samma källa).

## axe

- **Taggarna:** `wcag2a`, `wcag2aa`, `wcag21a`, `wcag21aa`, `wcag22a` och `wcag22aa`. Bara `target-size` har taggen `wcag22aa`, och den är avstängd utan uttrycklig tagg. Kontrollskriptet har taggarna (kontroll 8); `wcag22a` matchar ingen regel i 4.14 men skadar inte. 📄 [axe-core 4.14, rule-descriptions](https://github.com/dequelabs/axe-core/blob/v4.14.0/doc/rule-descriptions.md)
- **`incomplete` läses.** Det är noder axe inte kunde avgöra, till exempel kontrast där bakgrunden är skymd eller en bild. Varje sådan nod avgörs för hand och noteras. 📄 [axe-core API](https://github.com/dequelabs/axe-core/blob/v4.14.0/doc/API.md)
- **`best-practice` körs för sig, som rapport.** Reglerna, som `region` (innehåll utanför landmärken) och `heading-order`, är inte WCAG-krav. De pekar ändå på det skärmläsaranvändare navigerar efter. 📄 samma
- **Två motorer i webbläsaren:** Chromium och WebKit. `@axe-core/playwright` testas bara i Chromium uppströms ⚠️, men på övningssajten gav WebKit samma resultat som Chromium (revisionen 2026-10-16). WebKit står för Safari, som är vanligt på mobiler.
- **Tillstånd:** axe körs igen med menyn öppen, med samtyckesrutan öppen och, när formulär finns, med felen framkallade (→ `guide/2-8-teknik-och-kvalitet.md`, N2-tabellen).
- **Version 4.14** slår på `label-content-name-mismatch` som standard (2.5.3) och flyttar fler kontrastfall till `incomplete`. 📄 [axe-core 4.14.0](https://github.com/dequelabs/axe-core/releases/tag/v4.14.0)

## Kriterier som kräver en människa

Raderna om hur man prövar är vår tolkning av normtexten och Understanding-dokumenten (📄 [WCAG 2.2](https://www.w3.org/TR/WCAG22/); [Understanding WCAG 2.2](https://www.w3.org/WAI/WCAG22/Understanding/)). På en sajt med 5–15 sidor prövas alla sidor.

| Kriterium | Pröva |
|---|---|
| 1.1.1 Icke-text (A) | Säger alt-texten det bilden är till för? Dekor har `alt=""`, och en bildlänk beskriver målet, inte motivet. Ett diagram har en kort alt och uppgifterna i text intill. Saknad `alt` är värre än tom, eftersom filnamnet läses upp. Dekor-SVG har `aria-hidden="true"`, en SVG som betyder något `role="img"` och ett namn (Krehel, `screen-readers.md`; ordvalet → `innehall/bilder.md`). |
| 1.3.1 Information och relationer (A) | Motsvarar koden det man ser: rubriknivåer, listor, tabeller, `fieldset`, obligatoriska fält? |
| 1.3.2 Meningsfull ordning (A) | Läs sidan linjärt. Bryter `order`, `row-reverse` eller grid-placering läsordningen? |
| 1.4.1 Färg (A) | Bärs något bara av färg, som länkar i löptext eller felmarkeringar? |
| 1.2.1, 1.2.2 Ljud och video (A) | Inspelad video har undertexter, inspelat ljud har en utskrift. Inget spelas upp med ljud av sig självt (1.4.2). |
| 1.4.3 Kontrast (AA) | 4,5:1 för text, 3:1 för stor text (minst 24 px, eller 18,67 px fet). Text på bild och gradient, och text i hover- och fokuslägen, mäts för hand. Inaktiva kontroller och logotyper är undantagna. |
| 1.4.4 Textstorlek (AA) | Zooma till 200 %. Inget klipps eller överlappar. |
| 1.4.5 Text i bild (AA) | Ingen text i bilder utom logotyper (→ `guide/2-8-teknik-och-kvalitet.md`). |
| 1.4.10 Omflöde (AA) | 320 CSS-px utan sidledsscroll och utan tappat innehåll (kontroll 3). |
| 1.4.11 Kontrast för icke-text (AA) | Kanter, ikoner och fokusring har 3:1 i alla lägen (kontroll 8b mäter ringen). |
| 1.4.12 Textavstånd (AA) | Radhöjd 1,5, styckeavstånd 2, bokstavsavstånd 0,12 och ordavstånd 0,16 gånger teckenstorleken. Inget får gå förlorat. 📄 [Understanding 1.4.12](https://www.w3.org/WAI/WCAG22/Understanding/text-spacing.html) |
| 1.4.13 Innehåll vid hovring eller fokus (AA) | Tooltips och undermenyer stängs med Escape, går att hovra över och ligger kvar. |
| 2.1.1 och 2.1.2 Tangentbord, ingen fälla (A) | Hela sidan med Tab, Enter, Space och Escape. Fokus fastnar inte i en ram för karta, video eller bokning. |
| 2.2.2 Pausa, stoppa, dölja (A) | Rörelse som pågår längre än 5 s går att pausa (→ `guide/2-6-rorelse.md`). |
| 2.4.2 Sidtitel (A) | Titeln säger sidans ämne först och företaget sist: *Kontakt och priser – Företaget*. |
| 2.4.3 Fokusordning (A) | Ordningen är logisk, och fokus hamnar rätt när en meny eller dialog öppnas och stängs. |
| 2.4.4 Länkens syfte (A) | Länktexten, eller texten runt den, säger vart länken går. |
| 2.4.6 Rubriker och etiketter (AA) | De beskriver innehållet. |
| 2.4.7 Synligt fokus (AA) | Fokus syns på varje element. |
| 2.4.11 Fokus inte skymt (AA) | Inget fokuserat element är helt skymt av klibbigt sidhuvud, knapplist eller samtyckesruta (kontroll 3b). Lösningen är `scroll-padding` (📄 [Understanding 2.4.11](https://www.w3.org/WAI/WCAG22/Understanding/focus-not-obscured-minimum.html), teknik C43). |
| 2.5.1, 2.5.7 Gester och dragning (A, AA) | Allt som görs med svep, nyp eller dragning går också med ett tryck och med tangentbord, till exempel en karta i en ö eller ett skjutreglage. |
| 2.5.3 Etikett i namn (A) | Det tillgängliga namnet börjar med eller innehåller den synliga texten. Pröva med röststyrning. |
| 2.5.8 Träffyta (AA) | Minst 24 × 24 CSS-px, eller en cirkel på 24 px runt målet som inte skär ett annat mål. Undantag för länkar i löptext. 📄 [Understanding 2.5.8](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html) |
| 3.1.2 Delars språk (AA) | Fraser på ett annat språk är märkta med `lang`. |
| 3.2.3 och 3.2.4 Konsekvens (AA) | Navigering och namn på samma funktion är lika på alla sidor (→ `guide/2-3-struktur.md`, G4). |
| 3.2.6 Konsekvent hjälp (A) | Kontaktvägen ligger i samma ordning i DOM på alla sidor. 📄 [Understanding 3.2.6](https://www.w3.org/WAI/WCAG22/Understanding/consistent-help.html) |
| 3.3.1–3.3.3 Fel (A, AA) | Skicka formuläret med fel. Felet står i text vid fältet och säger hur det rättas (→ `formular.md`; `guide/2-8-teknik-och-kvalitet.md`, *Formulär*). |
| 3.3.2 Etiketter och instruktioner (A) | Varje fält har en synlig etikett, och det syns före ifyllning vilka fält som måste fyllas i (→ `formular.md`). |
| 3.3.7 Upprepad inmatning (A) | Gäller processer i flera steg. |
| 4.1.2 Namn, roll, värde (A) | Egna komponenter har rätt roll och uppdaterar tillståndet, till exempel `aria-expanded`. |
| 4.1.3 Statusmeddelanden (AA) | "Skickat" och liknande läses upp utan att fokus flyttas (`role="status"`). |

## Tangentbord och fokus

- **Läsordningen:** tabba genom varje sida i 375 och 1280 px och jämför med den ordning man läser. I kolumner är det rätt att gå kolumn för kolumn (📄 WCAG 2.2, 1.3.2 och 2.4.3).
- **Hopplänken** är det första som får fokus och leder in i `main`. Efter Enter ska nästa Tab hamna i huvudinnehållet (📄 WCAG 2.2, 2.4.1).
- **Menyn som disclosure:** knapp med namn, Escape stänger, fokus tillbaka till knappen, `aria-current="page"` på aktuell sida, aldrig rollen `menu` (📄 [APG, Disclosure Navigation](https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/examples/disclosure-navigation/); → `guide/2-4-skelett.md`, *Mobilmeny*).
- **Modal dialog:** fokus stannar i dialogen, Escape stänger och fokus går tillbaka till det som öppnade den. `<dialog>` med `showModal()` ger det inbyggt (📄 [APG, Dialog (Modal)](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/); [MDN, dialog](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/dialog)).
- **Dolt innehåll är inte fokuserbart.** En panel eller list som är gömd har `inert` eller `hidden`, så att Tab inte hamnar på något osynligt (📄 [MDN, inert](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Global_attributes/inert)).
- **Safari tabbar inte till länkar som standard.** I Playwrights WebKit ger Tab bara formulärfält; Alt+Tab motsvarar Safaris inställning *Tryck på Tab för att markera varje objekt* (iakttaget i revisionen 2026-10-16). Tangentbordsprov i WebKit görs därför med Alt+Tab.
- **Fokus vid tryck skiljer sig:** Safari ger inte en knapp fokus när man klickar på den. Att fokus hamnar på `body` efter Escape vid pekare är plattformens beteende, inte ett fel. Med tangentbord ska fokus gå tillbaka till knappen.
- **Fokusringen:** webbläsarens egen ring, med bara `outline-offset`, är förstahandsvalet. En egen ring har en token och når 3:1 mot varje färg den korsar runt hela omkretsen, också bilder, gradienter och hover-lägen (1.4.11). I forced-colors behålls systemets färger, och `forced-color-adjust: none` används bara där kontrollen är prövad i läget. `:focus-within` lyser upp en grupp. 📄 Krehel, `focus-and-keyboard.md`; WCAG 2.2, 1.4.11 och 2.4.7
- **`tabindex` har bara två värden:** `0` för en egen kontroll som inte kan få fokus annars, och `-1` för mål som skript flyttar fokus till. Ett positivt värde kapar tabbordningen för hela sidan. 📄 Krehel; WCAG 2.2, 2.4.3
- **Hopplänken göms så att den håller vid stor text:** utanför skärmen i sidled (`inset-inline-start`) eller med en förflyttning i procent av sin egen höjd, inte med en fast negativ topp i px. Med 32 px grundstorlek blir länken högre än 100 px och syns då under sidhuvudet (iakttaget på övningssajten 2026-10-16). 📄 Krehel, *Skip link*
- **Ankare under ett klibbigt sidhuvud:** `scroll-padding-top` på `html` gäller också när sidan hoppar till ett ankare, så `scroll-margin-top` per rubrik behövs bara där den inte räcker (prövat 2026-10-16: målet hamnar direkt under sidhuvudet).
- **En panel som ser modal ut tar fokus när den öppnas och stängs när fokus lämnar den** (→ `guide/2-4-skelett.md`, *Mobilmeny*). Att fokus kan hamna bakom en öppen panel är inget brott mot 2.4.11 om besökaren kan få fram det utan att flytta fokus, till exempel med Escape. 📄 [Understanding 2.4.11](https://www.w3.org/WAI/WCAG22/Understanding/focus-not-obscured-minimum.html)

## Namn i tillgänglighetsträdet

- Läs trädet med Playwrights `ariaSnapshot()` eller chrome-devtools-mcp:s `take_snapshot`. Varje länk och knapp har ett namn som säger vad den gör, och varje landmärke och region har ett namn när det finns flera av samma sort (📄 [Playwright, ARIA snapshots](https://playwright.dev/docs/aria-snapshots)).
- Text som bara skärmläsare ser (`sr-only`, positionerad) kan ge ett extra mellanslag i det beräknade namnet ("här , Malmö"). Det är ofarligt, men namnet ska ändå läsas.
- En länk som öppnar en ny flik säger det i namnet (→ `guide/2-8-teknik-och-kvalitet.md`, kontroll 2b; WCAG-teknik G201).
- **Synlig text före `aria-label`.** `aria-label` syns inte, glider isär från texten och översätts sämre. Den används på ikonknappar, och ikonen får `aria-hidden="true"`. På en `div` eller `span` utan roll ignoreras den (ARIA 1.2 förbjuder namn på rollen `generic`), och `aria-labelledby` mot ett id som saknas ger inget namn alls. 📄 Krehel, `semantics-and-aria.md`; [WAI-ARIA 1.2](https://www.w3.org/TR/wai-aria-1.2/#generic)
- **Ett landmärkes namn säger vad som finns i det,** också när innehållet varierar mellan sidor. En knapplist med Ring och Mejla heter inte "Boka eller ring". Namnet innehåller inte rollen ("navigering"). 📄 WCAG 2.2, 2.4.6; [APG, Names and Descriptions](https://www.w3.org/WAI/ARIA/apg/practices/names-and-descriptions/)
- **Länkar till olika mål har olika namn,** och samma mål har samma namn (2.4.4; G4 i `guide/2-3-struktur.md`).

## Statusbesked och tidsgränser

- **Välj sättet efter vad som händer**, och stanna vid det första som passar: (1) fokus flyttas dit ändå, som när en dialog öppnas, och då behövs inget mer; (2) beskedet hör till ett fält och kopplas med `aria-describedby`; (3) det är inte brådskande och hör inte till ett fält, och går till `role="status"`; (4) det är brådskande och hör inte till ett fält, och går till `role="alert"`. 📄 Krehel, `screen-readers.md`; WCAG 2.2, 4.1.3
- **Statusbehållaren finns i HTML:en innan något händer,** och skriptet byter bara texten. En region som skapas samtidigt som texten läses ofta inte upp. 📄 [WCAG-teknik ARIA22](https://www.w3.org/WAI/WCAG22/Techniques/aria/ARIA22); Krehel
- **Fokus flyttas aldrig till ett kvitto som dyker upp vid sidan av,** och inget som besökaren behöver finns bara i något som försvinner på tid. Ett kvitto med en handling eller ett fel står kvar tills besökaren stänger det; ett kvitto som försvinner står minst 5 s och pausar vid hovring och fokus. Ersätter kvittot knappen som besökaren tryckte på, går fokus till kvittot, eftersom knappen är borta. 📄 WCAG 2.2, 2.2.1; Krehel, `motion-and-zoom.md`
- **En toast i top layer är aldrig enda kvittensen:** en popover läses inte upp av sig själv (modern-web-guidance, `persistent-toast-notifications`, bryter mot 2.2.1 och 4.1.3).
- **Laddningsläget står i text** ("Skickar …") i statusbehållaren och byts mot beskedet. En snurra står still vid reducerad rörelse (→ `guide/2-6-rorelse.md`).

## Träffytor, gester och dekorlager

- **Träffytan kan vara större än det synliga.** Förstora med ett pseudoelement på knappen eller på omslaget runt ett fält, aldrig på `<input>`, som inte ritar `::before` och `::after` pålitligt. Utökade ytor får inte överlappa en annan kontroll; krymp dem tills de inte gör det. 📄 Krehel, `hit-areas.md`; WCAG 2.2, 2.5.8 (undantaget för avstånd)
- **Ett dekorlager över en kontroll har `pointer-events: none`,** och är det ett element också `aria-hidden="true"`. Annars ser knappen under levande ut men gör ingenting. En bakgrund som stänger en dialog vid klick är en kontroll och behåller sina händelser. 📄 Krehel
- **`touch-action: none` sätts bara på en yta som själv sköter panorering eller dragning,** aldrig på sidan, där den tar bort scrollandet. 📄 Krehel; MDN, `touch-action`

## Forced-colors, textavstånd och stor text

- **Forced-colors** (Windows högkontrast) prövas med Playwrights `forcedColors: 'active'`. I det läget försvinner `box-shadow`, `text-shadow` och bakgrunder som inte är url-bilder, alltså gradienter; url-bilder ligger kvar. Fokusringar byggs därför med `outline`, och en knapp som bara har bakgrundsfärg behöver en ram, till exempel `border: 1px solid transparent`. Egna färger i läget sätts med systemfärger (`CanvasText`, `ButtonText`, `LinkText`, `Highlight`). Text på foto och på gradient prövas särskilt. 📄 [MDN, forced-colors](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/forced-colors); [MDN, forced-color-adjust](https://developer.mozilla.org/en-US/docs/Web/CSS/forced-color-adjust); Krehel better-ui och MWG *(tumregel för den genomskinliga ramen)*
- **Textavståndet** prövas genom att lägga på WCAG:s värden som en stilmall. Sajtens CSP stoppar en injicerad stil, så provet körs med `bypassCSP: true` (iakttaget i revisionen 2026-10-16). Utan det mäter provet ingenting.
- **Stor text prövas med webbläsarens grundstorlek, inte bara med zoom.** I Chromium sätts den med CDP-anropet `Page.setFontSizes` (24 px motsvarar Chromes *Mycket stor*, 32 px 200 %). Zoom till 200 % räcker för 1.4.4, men den som har större text på telefonen ser sajten i 375 px med stor text, och då bryts andra saker: ord i rubriker delas mitt i utan bindestreck, en adresslänk med ikon spräcker sidan och dold text sticker fram (övningssajten 2026-10-16, också efter rättningen av sidledsscrollen samma eftermiddag). Fynd där är `medel` eller lägre, eftersom 1.4.4 kan uppfyllas med zoom. 📄 WCAG 2.2, [1.4.4](https://www.w3.org/WAI/WCAG22/Understanding/resize-text.html); Krehel, Emil (axeln miljö)
- **Mediafrågor skrivs i `rem` eller `em`,** så att layouten byter till den smala varianten när texten växer. Textbehållare har `min-height`, aldrig `height`. 📄 Krehel, `motion-and-zoom.md` *(tumregel som stöder 1.4.4 och 1.4.10)*

## Mönster som alltid är fel

Söks i källkoden (`bibliotek/src`, `sites/<namn>/src`) och i den byggda HTML:en. Varje träff är ett fynd tills motsatsen är visad. 📄 Krehel, better-accessibility, *Before you finish*; Vercel, [Web Interface Guidelines](https://vercel.com/design/guidelines), *Anti-patterns* (MIT)

| Mönster | Rätt |
|---|---|
| `outline: none` utan ersättning på `:focus-visible` | Webbläsarens ring eller en prövad egen |
| `onClick` på `div` eller `span`; navigering med `onClick` utan `<a>` | `<button>`, eller `<a href>` när det leder någonstans |
| `role="button"` eller `role="tab"` utan tangenthantering | Det inbyggda elementet, eller APG:s tangentkarta |
| Positivt `tabindex` | DOM-ordningen rättas, `0` |
| `disabled` på skicka-knappen för att vänta på giltiga fält | Knappen är aktiv; felen visas efter skick (→ `formular.md`) |
| Statusregion som skapas samtidigt som texten | Tom region först, sedan texten |
| `aria-live="assertive"` på ett lyckat besked | `role="status"` |
| `<img>` utan `alt` | `alt=""` för dekor, annars bildens syfte |
| `aria-label` som inte innehåller den synliga texten | Namnet börjar med den synliga texten (2.5.3) |
| `aria-hidden` på eller ovanför något som kan få fokus | Ta bort det, eller gör delen `inert` |
| `maximum-scale` eller `user-scalable=no` | Ta bort (1.4.4) |
| Klibbigt sidhuvud eller list utan `scroll-padding` | Utfyllnad lika med höjden (2.4.11) |
| Verktygstips på en kontroll med `disabled` | Förklaringen i text bredvid |
| Dragning eller svep utan knapp | En väg med ett tryck (2.5.7) |
| `onPaste` med `preventDefault` | Klistra in är alltid tillåtet |

## Hjälpmedel

Vid lansering och årligen, inte i varje bygge (→ `guide/2-8-teknik-och-kvalitet.md`, N3): VoiceOver på iOS med Safari, TalkBack med Chrome och NVDA med Chrome eller Firefox är GOV.UK:s minsta uppsättning tillsammans med JAWS, förstoring och Dragon (📄 [GOV.UK, Testing with assistive technologies](https://www.gov.uk/service-manual/technology/testing-with-assistive-technologies) ⚠️ underlaget är från 2016). Rubriker inuti `<summary>` annonserades inte av alla skärmläsare i äldre prov (→ `guide/2-4-skelett.md`).

### Skärmläsarprovet på övningssajterna

Två delar (`BESLUT.md` 2026-10-16, *Frågelistan efter tredje varvet avgörs*, punkt 57; Claudes rekommendation, delegerat av Johnny). Tillsammans motsvarar de GOV.UK:s minsta nivå för mobil, VoiceOver på iOS och TalkBack (samma GOV.UK-sida). VoiceOver på Macen med Guidepup används inte (`BESLUT.md` 2026-10-16, *VoiceOver på Macen med Guidepup används inte som testmetod*).

- **(a) VoiceOver på iPhone för hand, en gång per övningssajt**, med manuset nedan, i Safari; det tar cirka tio minuter. ⚠️ Förhandsvisningen lyssnar bara på `127.0.0.1` (sajtens `CLAUDE.md`), så hur iPhonen når sajten avgör Johnny innan provet.
- **(b) TalkBack och VoiceOver på riktiga telefoner via BrowserStack**, med samma manus, när nyckeln finns (inventeringen: *MCP: kräver konto*; bara den lokala servern med BrowserStack Local når `localhost`). ⚠️ BrowserStacks sida om Screen Reader launcher (läst 2026-10-17) nämner för webbsidor VoiceOver på Mac, NVDA på Windows och TalkBack på Android, inte VoiceOver på iPhone, och inget om svensk röst. Det prövas när kontot finns. 📄 [BrowserStack, What is Screen Reader launcher?](https://www.browserstack.com/docs/accessibility/screen-reader-launcher/overview)

**Manuset** (gesterna 📄 Apple, [Use VoiceOver gestures on iPhone](https://support.apple.com/guide/iphone/learn-voiceover-gestures-iph3e2e2281/ios) och [Use the VoiceOver rotor](https://support.apple.com/guide/iphone/use-the-voiceover-rotor-iph3e2e3a6d/ios), lästa 2026-10-17). Varje steg skrivs ner med vad som lästes upp, vad som var väntat och fyndet.

1. **Start (1 min).** VoiceOver på (Inställningar > Hjälpmedel > VoiceOver), svensk röst, startsidan öppen i Safari. Ett tryck med fyra fingrar nära skärmens överkant väljer första elementet.
2. **Första skärmen (3 min).** Svep höger, ett element i taget, genom första skärmen. Klart när varje element är hört: hopplänken kommer först, ordningen följer det som syns, varje länk och knapp har ett namn och en roll, telefonnumret läses som ett nummer och ingen dekor (ikon, foto utan innehåll) läses upp.
3. **Rotorns rubriker (2 min).** Vrid två fingrar som en ratt till *Rubriker* och svep nedåt genom alla rubriker. Klart när rubrikerna ensamma säger vad sidan handlar om, nivåerna inte hoppar och ingen rubrik saknas.
4. **Ring (1 min).** Hitta Ring och dubbeltryck. Samtalsrutan visar rätt nummer; avbryt.
5. **Boka (2 min).** Hitta Boka. Länken säger vart den leder; dubbeltryck och kontrollera att det som sades också händer, och gå tillbaka.
6. **Menyn (1 min).** Öppna menyn, svep igenom den och stäng den. Fokus hamnar på menyknappen igen.

## React-komponenter och öar

React är tillåtet som öar (`BESLUT.md` 2026-10-16). För tillgängligheten gäller:

- **Samma regler som HTML.** Inbyggda element i JSX (`<button>`, `<a href>`, `<label>`), aldrig `onClick` på `div`. En roll är ett löfte om tangentbordsbeteende som måste skriptas (📄 [APG, Read Me First](https://www.w3.org/WAI/ARIA/apg/practices/read-me-first/)).
- **Två lägen prövas:** HTML:en före hydrering, som också är läget utan JavaScript (→ `guide/2-4-skelett.md`, *HTML först*), och komponenten efter hydrering, med axe och tangentbord i det läget. Ön är hydrerad när den har rullats fram och `astro-island` inte längre har attributet `ssr` (📄 Astro, `astro-island.js`).
- **Färdiga komponenter** från 21st.dev, Aceternity eller React Bits granskas mot APG-mönstret de liknar innan de tas in i biblioteket: namn, roll, tillstånd, Escape och fokus. Licens per komponent → `guide/2-5-yta.md`.
- **Fokus som flyttas av skript** (öppna, stänga, byta innehåll) går tillbaka till det som utlöste ändringen. Statusmeddelanden använder `role="status"` (📄 WCAG 2.2, 2.4.3 och 4.1.3).
- **Rörelse** i Motion följer `prefers-reduced-motion` och rörelsebudgeten (→ `guide/2-6-rorelse.md`).
- Headless-bibliotek med APG-mönster inbyggda, som React Aria eller Radix, och lintning med eslint-plugin-jsx-a11y är kandidater ⚠️ som inte är prövade här.
