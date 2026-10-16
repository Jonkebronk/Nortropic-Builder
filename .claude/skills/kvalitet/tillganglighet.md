# Tillgänglighet

Golvet är WCAG 2.2 nivå AA för alla sajter. Kodstandarden med kriterierna står i `guide/2-8-teknik-och-kvalitet.md`, *Kodstandard*, och de primitiva mönstren i `guide/2-4-skelett.md`. Här står hur det prövas och vad automatiken inte ser.

## Vad automatiken hittar

- De sex vanligaste felen på en miljon startsidor står för 96 % av de upptäckta felen: låg kontrast (83,9 %), saknad alt-text (53,1 %), saknade etiketter (51 %), tomma länkar (46,3 %), tomma knappar (30,6 %) och saknat språk (13,5 %). Alla sex hittas automatiskt. Sidor med ARIA hade fler fel än sidor utan (59,1 mot 42). 📄 [WebAIM Million 2026](https://webaim.org/projects/million/)
- *"Absence of detected errors does not indicate that a page is accessible or conformant."* (WebAIM, samma källa). W3C: verktyg kan inte pröva allt (📄 [W3C, Selecting tools](https://www.w3.org/WAI/test-evaluate/tools/selecting/)).
- Slutsats: en nollgrind på axe tar bort det mesta av felvolymen. Resten kräver urval och omdöme (WCAG-EM vid lansering → `guide/2-8-teknik-och-kvalitet.md`, N3).

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
| 1.1.1 Icke-text (A) | Säger alt-texten det bilden är till för? Dekor har `alt=""`, och en bildlänk beskriver målet. |
| 1.3.1 Information och relationer (A) | Motsvarar koden det man ser: rubriknivåer, listor, tabeller, `fieldset`, obligatoriska fält? |
| 1.3.2 Meningsfull ordning (A) | Läs sidan linjärt. Bryter `order`, `row-reverse` eller grid-placering läsordningen? |
| 1.4.1 Färg (A) | Bärs något bara av färg, som länkar i löptext eller felmarkeringar? |
| 1.4.3 Kontrast (AA) | Text på bild och gradient, och text i hover- och fokuslägen, mäts för hand. |
| 1.4.4 Textstorlek (AA) | Zooma till 200 %. Inget klipps eller överlappar. |
| 1.4.5 Text i bild (AA) | Ingen text i bilder utom logotyper (→ `guide/2-8-teknik-och-kvalitet.md`). |
| 1.4.10 Omflöde (AA) | 320 CSS-px utan sidledsscroll och utan tappat innehåll (kontroll 3). |
| 1.4.11 Kontrast för icke-text (AA) | Kanter, ikoner och fokusring har 3:1 i alla lägen (kontroll 8b mäter ringen). |
| 1.4.12 Textavstånd (AA) | Radhöjd 1,5, styckeavstånd 2, bokstavsavstånd 0,12 och ordavstånd 0,16 gånger teckenstorleken. Inget får gå förlorat. 📄 [Understanding 1.4.12](https://www.w3.org/WAI/WCAG22/Understanding/text-spacing.html) |
| 1.4.13 Innehåll vid hovring eller fokus (AA) | Tooltips och undermenyer stängs med Escape, går att hovra över och ligger kvar. |
| 2.1.1 och 2.1.2 Tangentbord, ingen fälla (A) | Hela sidan med Tab, Enter, Space och Escape. Fokus fastnar inte i en ram för karta, video eller bokning. |
| 2.2.2 Pausa, stoppa, dölja (A) | Rörelse som pågår längre än 5 s går att pausa (→ `guide/2-6-rorelse.md`). |
| 2.4.3 Fokusordning (A) | Ordningen är logisk, och fokus hamnar rätt när en meny eller dialog öppnas och stängs. |
| 2.4.4 Länkens syfte (A) | Länktexten, eller texten runt den, säger vart länken går. |
| 2.4.6 Rubriker och etiketter (AA) | De beskriver innehållet. |
| 2.4.7 Synligt fokus (AA) | Fokus syns på varje element. |
| 2.4.11 Fokus inte skymt (AA) | Inget fokuserat element är helt skymt av klibbigt sidhuvud, knapplist eller samtyckesruta (kontroll 3b). Lösningen är `scroll-padding` (📄 [Understanding 2.4.11](https://www.w3.org/WAI/WCAG22/Understanding/focus-not-obscured-minimum.html), teknik C43). |
| 2.5.3 Etikett i namn (A) | Det tillgängliga namnet börjar med eller innehåller den synliga texten. Pröva med röststyrning. |
| 2.5.8 Träffyta (AA) | Minst 24 × 24 CSS-px, eller en cirkel på 24 px runt målet som inte skär ett annat mål. Undantag för länkar i löptext. 📄 [Understanding 2.5.8](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html) |
| 3.1.2 Delars språk (AA) | Fraser på ett annat språk är märkta med `lang`. |
| 3.2.3 och 3.2.4 Konsekvens (AA) | Navigering och namn på samma funktion är lika på alla sidor (→ `guide/2-3-struktur.md`, G4). |
| 3.2.6 Konsekvent hjälp (A) | Kontaktvägen ligger i samma ordning i DOM på alla sidor. 📄 [Understanding 3.2.6](https://www.w3.org/WAI/WCAG22/Understanding/consistent-help.html) |
| 3.3.1–3.3.3 Fel (A, AA) | Skicka formuläret med fel. Felet står i text vid fältet och säger hur det rättas (→ `guide/2-8-teknik-och-kvalitet.md`, *Formulär*). |
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

## Namn i tillgänglighetsträdet

- Läs trädet med Playwrights `ariaSnapshot()` eller chrome-devtools-mcp:s `take_snapshot`. Varje länk och knapp har ett namn som säger vad den gör, och varje landmärke och region har ett namn när det finns flera av samma sort (📄 [Playwright, ARIA snapshots](https://playwright.dev/docs/aria-snapshots)).
- Text som bara skärmläsare ser (`sr-only`, positionerad) kan ge ett extra mellanslag i det beräknade namnet ("här , Malmö"). Det är ofarligt, men namnet ska ändå läsas.
- En länk som öppnar en ny flik säger det i namnet (→ `guide/2-8-teknik-och-kvalitet.md`, kontroll 2b; WCAG-teknik G201).

## Forced-colors och textavstånd

- **Forced-colors** (Windows högkontrast) prövas med Playwrights `forcedColors: 'active'`. I det läget tas `box-shadow` bort, så fokusringar byggs med `outline`, och en knapp som bara har bakgrundsfärg behöver en ram, till exempel `border: 1px solid transparent` (📄 [MDN, forced-colors](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/forced-colors); Krehel better-ui och MWG *(tumregel för den genomskinliga ramen)*).
- **Textavståndet** prövas genom att lägga på WCAG:s värden som en stilmall. Sajtens CSP stoppar en injicerad stil, så provet körs med `bypassCSP: true` (iakttaget i revisionen 2026-10-16). Utan det mäter provet ingenting.

## Hjälpmedel

Vid lansering och årligen, inte i varje bygge (→ `guide/2-8-teknik-och-kvalitet.md`, N3): VoiceOver på iOS med Safari, TalkBack med Chrome och NVDA med Chrome eller Firefox är GOV.UK:s minsta uppsättning tillsammans med JAWS, förstoring och Dragon (📄 [GOV.UK, Testing with assistive technologies](https://www.gov.uk/service-manual/technology/testing-with-assistive-technologies) ⚠️ underlaget är från 2016). Rubriker inuti `<summary>` annonserades inte av alla skärmläsare i äldre prov (→ `guide/2-4-skelett.md`).

## React-komponenter och öar

React är tillåtet som öar (`BESLUT.md` 2026-10-16). För tillgängligheten gäller:

- **Samma regler som HTML.** Inbyggda element i JSX (`<button>`, `<a href>`, `<label>`), aldrig `onClick` på `div`. En roll är ett löfte om tangentbordsbeteende som måste skriptas (📄 [APG, Read Me First](https://www.w3.org/WAI/ARIA/apg/practices/read-me-first/)).
- **Två lägen prövas:** HTML:en före hydrering, som också är läget utan JavaScript (→ `guide/2-4-skelett.md`, *HTML först*), och komponenten efter hydrering, med axe och tangentbord i det läget. Ön är hydrerad när den har rullats fram och `astro-island` inte längre har attributet `ssr` (📄 Astro, `astro-island.js`).
- **Färdiga komponenter** från 21st.dev, Aceternity eller React Bits granskas mot APG-mönstret de liknar innan de tas in i biblioteket: namn, roll, tillstånd, Escape och fokus. Licens per komponent → `guide/2-5-yta.md`.
- **Fokus som flyttas av skript** (öppna, stänga, byta innehåll) går tillbaka till det som utlöste ändringen. Statusmeddelanden använder `role="status"` (📄 WCAG 2.2, 2.4.3 och 4.1.3).
- **Rörelse** i Motion följer `prefers-reduced-motion` och rörelsebudgeten (→ `guide/2-6-rorelse.md`).
- Headless-bibliotek med APG-mönster inbyggda, som React Aria eller Radix, och lintning med eslint-plugin-jsx-a11y är kandidater ⚠️ som inte är prövade här.
