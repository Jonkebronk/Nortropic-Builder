# Apples HIG för skelettet

Delfil till `SKILL.md`. Det Apples *Human Interface Guidelines* (HIG) säger om layout, säkra ytor, träffytor, knappar, modala vyer, listor och hur en app startar, översatt till en flersidig sajt som mest besöks i Safari på iPhone. Guidens regler och besluten går före (`guide/2-4-skelett.md`, `guide/2-3-struktur.md`, `BESLUT.md`).

Källa: 📄 Apple, [Human Interface Guidelines](https://developer.apple.com/design/human-interface-guidelines/), sidorna *Layout* (omskriven 2026-09-09), *Accessibility*, *Buttons*, *Modality*, *Sheets*, *Alerts*, *Popovers*, *Toolbars*, *Tab bars*, *Disclosure controls*, *Scroll views*, *Page controls*, *Segmented controls*, *Toggles*, *Launching*, *Onboarding*, *Searching*, *Privacy* och *Designing for iOS*, lästa som JSON 2026-10-16. Webbens motsvarigheter: [WebKit, Designing Websites for iPhone X](https://webkit.org/blog/7929/designing-websites-for-iphone-x/) (2017) och [WebKit Features in Safari 26.0](https://webkit.org/blog/17333/webkit-features-in-safari-26-0/) (2025). 1 pt i HIG motsvarar 1 CSS-px i Safari på iPhone (→ `../yta/apple-hig.md`).

## Layout

- **Det viktigaste står överst och först i läsriktningen.** 📄 HIG *Layout* (*"Order content by relative importance"*); → `guide/2-4-skelett.md`, första skärmen.
- **Linjering och indrag visar hierarkin:** det som linjerar hör ihop, det som är indraget hör till det ovanför. Grupper skiljs med luft, form eller linje. 📄 HIG *Layout*; → `layout.md`, *gruppera med luft före linjer och kort*.
- **Progressiv visning håller sidan lugn,** men det de flesta behöver döljs inte (→ GOV.UK i `interaktion.md`). En utfällbar kontroll har en etikett som säger vad som döljs och står nära det den visar. 📄 HIG *Layout* och *Disclosure controls*.
- **Layouten utgår från utrymmet, inte från enheten.** HIG:s storleksklasser beskriver tillgänglig plats oavsett om telefonen står eller ligger; på webben är det container queries och brytpunkter ur innehållet, aldrig "iPhone" eller "iPad" i en mediefråga. 📄 HIG *Layout*, *Size classes* (*"Determine layout based on size classes, not device type or orientation"*); → `layout.md`, *Brytpunkter*.
- **Samma funktioner i alla bredder.** Mängden som syns får ändras, men inget försvinner för att skärmen är smal. 📄 HIG *Layout* (*"Don't change your app's functionality based on the space it occupies"*); → `mobil.md`, *Samma innehåll, inte sämre innehåll*.
- **Layouten tål större text.** När texten växer staplas det som stod bredvid varandra, kolumnerna blir färre, raderna blir högre och det viktigaste ligger kvar överst. Inget kapas med ellips. 📄 HIG *Layout* (*"Be prepared for text-size changes"*) och *Typography* (*Supporting Dynamic Type*). På webben: brytpunkter i `rem` eller `em`, som följer besökarens textinställning, och inga `white-space: nowrap` som inte får ge vika (se *Provet* i rapporten: telefonnummer och pillänkar spräcker sidan vid stor text).

## Säkra ytor

- **Med `viewport-fit=cover` får allt innehåll vid en kant utfyllnad från `env(safe-area-inset-*)` på alla fyra sidor,** inte bara nedtill. I liggande läge täcker sensorhuset vänster eller höger kant, och sidans egna marginaler räcker inte. Använd `max()`, så att marginalen aldrig blir mindre än kitets: `padding-inline: max(var(--k-a4), env(safe-area-inset-left)) max(var(--k-a4), env(safe-area-inset-right))`. 📄 HIG *Layout*, *Guides and safe areas*; WebKit, *Designing Websites for iPhone X* (*"Safe area insets are not a replacement for margins"*).
- **Utan `viewport-fit=cover` fyller Safari kanterna med `<html>`- eller `<body>`-bakgrunden.** Sidans bakgrundsfärg sätts därför på `html` eller `body`, inte bara på en omslutande `div`. 📄 WebKit, samma artikel (*"The inset area is filled with the page's background-color"*).
- **iPhone Duo, Apples vikbara iPhone, ger ytterligare ett skäl till säkra ytor vid sidorna.** Ytterdisplayen är *"wider and shorter"*, systemet lägger verktygsfält och flikfält på sidan, och HIG säger *"Use safe areas to make sure controls don't cover your content"*. 📄 HIG *Designing for iPhone Duo* (2026-09-09). Om Safari ger webbsidor säkra ytor på iPhone Duo är okänt ⚠️.
- **Prövas på riktig iPhone eller i Xcodes simulator i liggande läge.** Playwrights WebKit på datorn har inga säkra ytor, så `env()` blir 0 och felet syns inte där. 🔧 iakttaget 2026-10-16.

## Träffytor och avstånd

- **Knappar, menyknappen och fristående länkar är minst 44 × 44 CSS-px, som granskningskriterium och varning.** Regeln och golvet är WCAG 2.5.8 (24 px eller avstånd); 44 px under det är aldrig `hög` (→ `kvalitet/tillganglighet.md`; `BESLUT.md` 2026-10-16, *Motsägelserna i skillsen*). HIG:s standard är 44 × 44 pt och minimum 28 × 28 pt i iOS. Det är en andra primärkälla bredvid WCAG 2.5.5 (AAA, 44 px) för guidens granskningskriterium. WCAG 2.5.8 (24 px eller avstånd) är golvet. 📄 HIG *Accessibility* (*Mobility*) och *Buttons* (*"a hit region of at least 44x44 pt"*); → `guide/2-4-skelett.md`, N2-kriteriet om 44 × 44.
- **Avståndet mellan mål räknas lika mycket som storleken:** cirka 12 px runt mål med synlig ram eller fyllning och cirka 24 px runt mål utan. En lista med länkar på 26 px höjd och 12 px mellanrum (som en sidfot) klarar WCAG men inte HIG:s minimum. 📄 HIG *Accessibility* (*"Consider spacing between controls as important as size"*).
- **Länkar i löptext** omfattas inte av 44 px (WCAG 2.5.8, undantaget *inline*), men en lista med länkar är ingen löptext.

## Knappar

- **Högst en eller två framträdande knappar per vy,** och den framträdande är den besökaren troligast väljer. 📄 HIG *Buttons* (*"Keep the number of prominent buttons to one or two per view"*); → `../yta/farg.md`, *En fylld primärhandling per vy*.
- **Stil, inte storlek, skiljer förstahandsvalet från de andra.** Knappar som står ihop som ett val har samma storlek; den föredragna får fyllning, de andra kontur. 📄 HIG *Buttons* (*"Use style — not size — to visually distinguish the preferred choice"*).
- **Varje knapp har ett tryckt läge.** 📄 HIG *Buttons* (*"Always include a press state for a custom button"*); → `../yta/detaljer.md`, *Tillstånd*.
- **En handling som förstör något får aldrig den framträdande stilen,** och en knapp som avbryter heter *Avbryt*. Sällsynt på en företagssajt, men gäller om ett formulär eller en ångra-funktion kommer. 📄 HIG *Buttons* och *Alerts*.
- **En knapp som väntar visar det i knappen,** med en indikator och en etikett som *Skickar …*, och blir inte bara inaktiv. 📄 HIG *Buttons*, *iOS, iPadOS*.

## Modala vyer: meny, dialog och samtyckesruta

- **Modalt bara när det ger något,** och uppgiften är kort och enkel. 📄 HIG *Modality*.
- **Alltid ett tydligt sätt att stänga,** med en synlig knapp på välkänd plats; Escape och klick utanför är tillägg, inte ersättning. 📄 HIG *Modality* (*"Always give people an obvious way to dismiss a modal view"*); → `interaktion.md`, *Mobilmenyn*.
- **En modal vy i taget.** Menyn och en dialog visas aldrig ovanpå varandra; öppnas något nytt stängs det gamla först. Det gäller också popovrar: en i taget, aldrig en popover ur en popover. 📄 HIG *Modality*, *Sheets* och *Popovers*.
- **En modal vy har en rubrik som säger uppgiften.** 📄 HIG *Modality* (*"Make it easy to identify a modal view's task"*).
- **Ingen ruta när sidan öppnas.** HIG: *"Avoid showing an alert when your app starts."* Samtyckesrutan är ett lagkrav och är därför undantaget; den är icke-modal, täcker så lite som möjligt och har lika stora val (→ `guide/2-4-skelett.md`, N1, inga popup-rutor; `guide/2-8-teknik-och-kvalitet.md`, *Samtycke och analys*). 📄 HIG *Alerts*.
- **Inget som stänger sig självt efter en tid.** Ett kvitto eller en notis stängs med en handling. 📄 HIG *Accessibility* (*"Minimize use of time-boxed interface elements"*); WCAG 2.2.1.

## Listor, flikar och knapplist

- **Den fasta knapplisten nere på mobilen är en list för handlingar, inte navigering.** HIG skiljer på *tab bar* (navigering mellan delar) och *toolbar* (handlingar på det som visas). Listen har därför sidans primära handlingar och inte menyns sidor. 📄 HIG *Tab bars* (*"Use a tab bar to support navigation, not to provide actions"*) och *Toolbars*; → `mobil.md`, *Tumzonen och fasta element*.
- **Navigeringen döljs inte på en del av sajten och visas på en annan.** Menyknappen finns på varje sida. 📄 HIG *Tab bars* (*"Make sure the tab bar is visible when people navigate"*, *"Don't disable or hide tab bar buttons"*).
- **Ett segmenterat val** (till exempel två mottagningar) har högst cirka fem lika breda delar med substantiv som etiketter, och blandar inte text och ikon. 📄 HIG *Segmented controls*.
- **En växel (switch) står i en listrad;** utanför en lista används en kryssruta eller en knapp som växlar. Läget syns på mer än färgen. 📄 HIG *Toggles*. På webben är `<input type="checkbox">` med synlig bock det säkra valet (som samtyckesrutans *Välj själv*).
- **En sidindikator med prickar** (till exempel i ett galleri) har högst cirka tio prickar och är centrerad under innehållet. 📄 HIG *Page controls*. Automatiska bildspel är förbjudna (→ `guide/2-4-skelett.md`, N1).

## Scroll

- **Innehåll som går att scrolla i sidled syns som sådant,** med nästa kort som tittar fram vid kanten. 📄 HIG *Scroll views* (*"Make it apparent when content is scrollable"*); → `SKILL.md`, förbudet mot tjänster och priser i sidledsrader.
- **Ingen scrollande ruta inuti sidan i samma riktning** (en lång ruta med egen scroll, en karta som fångar fingret). 📄 HIG *Scroll views* (*"Avoid putting a scroll view inside another scroll view with the same orientation"*).

## Start, introduktion och behörigheter

- **Första skärmen visas direkt, utan startskärm, laddningsskärm eller intro.** Det som syns vid första målningen är samma sak som syns när sidan är klar; inget fast element visas först och glider sedan bort. 📄 HIG *Launching* (*"Launch instantly"*, *"Design a launch screen that's nearly identical to the first screen"*) och *Branding*.
- **Ingen guidad tur och inga introrutor.** Behövs en förklaring står den vid det den gäller. 📄 HIG *Onboarding* (*"Consider providing a collection of context-specific tips instead of a single onboarding flow"*).
- **Behörigheter (plats, aviseringar) begärs först när besökaren använder funktionen,** aldrig vid sidladdning, och texten säger varför. 📄 HIG *Privacy* (*"Request permission only when your app clearly needs access"*) och *Onboarding*.
- **Tillbaka hamnar där besökaren var.** Sidorna kan sparas i bfcache och scrollpositionen återställs. 📄 HIG *Launching* (*"Restore the previous state"*); → kvalitetsskillens `prestanda.md`, bfcache.
- **Sök,** om en sajt någonsin får det, har en enda plats och visar vad som söks i. 📄 HIG *Searching*. Små sajter klarar sig utan; webbläsarens sökfunktion ska hitta text i stängda `<details>` (→ `interaktion.md`).

## Webbappen på hemskärmen

- **Sedan iOS 26 öppnas varje sajt som läggs på hemskärmen som webbapp,** utan Safaris adressfält och bakåtknapp, om besökaren inte väljer bort det. Ingen manifestfil krävs. 📄 WebKit, *WebKit Features in Safari 26.0* (*"By default, every website added to the Home Screen opens as a web app"*).
- **Därför fungerar sajten utan webbläsarens knappar:** namnet i sidhuvudet leder till startsidan, menyn finns på varje sida, och en undersida har en väg tillbaka (brödsmulor eller länk) där den behövs. 🔧 härlett ur samma källa.
- **Hemskärmens ikon och namn:** en täckande `apple-touch-icon` på 180 × 180 px, och ett kort namn med `<meta name="apple-mobile-web-app-title">` eller `name` i en manifestfil. Utan det används sidans `<title>`, som är för lång för en ikonetikett (🔧 härlett). Safari 26 tar också SVG-ikoner. 📄 Apple, [Configuring Web Applications](https://developer.apple.com/library/archive/documentation/AppleApplications/Reference/SafariWebContent/ConfiguringWebApplications/ConfiguringWebApplications.html) (arkiverat 2016: *"By default, the <title> tag is used"*); WebKit, *Safari 26.0* (*SVG icons*). Storleken 180 × 180 står i samma arkiverade dokument.

## Telefonnummer som Safari själv gör till länkar

- **Safari på iPhone gör strängar som ser ut som telefonnummer till länkar,** om inget annat anges. Står alla riktiga nummer redan som `tel:`-länkar kan `<meta name="format-detection" content="telephone=no">` hindra att till exempel ett organisationsnummer blir en ringlänk. ⚠️ Beteendet står i Apples arkiverade *Safari HTML Reference* och är inte prövat på en iPhone med iOS 26. 📄 Apple, *Supported Meta Tags* (*format-detection*, arkiverat).

## Det som inte går att översätta

- **Svep tillbaka, ark med lägen (*detents*) och greppet överst på ett ark** är systemets gester. En sajt bygger inte egna svepgester för att stänga eller navigera (→ `../rorelse/apple-hig.md`), eftersom de krockar med Safaris egna.
- **Storleksklasser, Dynamic Island och flera fönster** finns inte på webben; container queries och `env()` är det som finns.
- **Toolbarens och flikfältets placering i Safari 26** styr webbläsaren. En fast list nere på sidan ligger nära Safaris flytande adressfält och prövas på riktig iPhone (→ `mobil.md`).
- **`theme-color`** färgar inte Safaris fält i iOS 26. Färgen tas från bakgrunden på `body` och från fasta eller klistrade element vid kanten, och beteendet är odokumenterat och har ändrats mellan versioner ⚠️. 📄 WebKit-ingenjören Wenson Hsieh i [WebKit bugg 301756](https://bugs.webkit.org/show_bug.cgi?id=301756) (2025-11-07: tonen behövs *"only … in cases where there's a viewport-constrained (fixed or sticky) element"*); Ben Frain, [iOS 26 Safari theme-color](https://benfrain.com/ios26-safari-theme-color-tab-tinting-with-fixed-position-elements/) (2025-11-16). `theme-color` behålls för Chrome på Android och äldre Safari.

## Förbjudet

- Startskärm, laddningsskärm, guidad tur eller ruta vid ankomst, utom samtyckesrutan.
- Två modala vyer samtidigt, popover ur popover, och modala vyer utan synlig stängknapp.
- En fast list eller ett sidhuvud som syns vid första målningen och sedan glider bort av sig självt.
- `viewport-fit=cover` utan säkra ytor på alla sidor där innehållet når kanten.
- Behörighetsfrågor vid sidladdning.
- Egna svepgester för att stänga eller navigera.
