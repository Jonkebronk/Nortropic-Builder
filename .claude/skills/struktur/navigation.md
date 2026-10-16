# Navigation, länkar och adresser

Grundreglerna står i guiden (→ `guide/2-3-struktur.md`, *Namn, adresser och meny*). Här står det som behövs för att bygga och granska dem, och rättelserna av marketingskills `site-architecture` mot primärkällorna.

## Menyn

- **Få val, i besökarens ord, med samma namn som sidan** (→ `guide/2-3-struktur.md`, N1 G4 och N2). Rosenfeld, Morville och Arango: etiketter ska vara representativa och begripliga för användarna, och bygga på deras eget språk (*Information Architecture*, kap. 7, ⚠️ boken inte läst i original).
- **På datorn syns menyn alltid,** oavsett antal val; ingen menyknapp på stor skärm (NN/g, *Hamburger Menus*, 2016; [Menu-Design Checklist](https://www.nngroup.com/articles/menu-design/), 2024).
- **Ingen fast gräns.** "4–7 items max" i `site-architecture` saknar belägg; NN/g kallar sjugränsen en annan ostödd riktlinje ([3-click rule](https://www.nngroup.com/articles/3-click-rule/), 2019). Det som är mätt: med fyra eller färre toppval bör de synas också i mobilen, och dold navigation användes i 27 % av fallen mot 48 % för synlig på dator ([NN/g, Hamburger Menus](https://www.nngroup.com/articles/hamburger-menus/), 2016, 179 deltagare). På mobilen användes dold navigering i 57 % av fallen mot 86 % för kombinerad, där några val syns och resten ligger bakom "Meny" (samma studie). Nortropics beslut är "Meny" i ett smalt mobilhuvud (`BESLUT.md` 2026-10-15); guidens fyra-regel för mobil (`guide/2-3-struktur.md`, N2) säger emot beslutet, och det är Johnnys sak att avgöra (förslag).
- **Varje menyval leder till en sida.** Ett menyval som pekar på ett avsnitt på startsidan (`/#behandlingar`) flyttar besökaren från sidan hon var på och gör att aktuell plats inte kan markeras; en översiktssida, som standarduppsättningen redan har för fler än en tjänstesida, löser det och ger en plats för brödsmulorna. 🔧 härlett ur `guide/2-3-struktur.md` (standarduppsättningen) och NN/g:s information scent.
- **Samma meny, i samma ordning, på alla sidor** (📄 WCAG 2.2, [3.2.3 Consistent Navigation](https://www.w3.org/WAI/WCAG22/Understanding/consistent-navigation.html), AA) och kontaktvägen på samma plats (📄 [3.2.6 Consistent Help](https://www.w3.org/WAI/WCAG22/Understanding/consistent-help.html), A).
- **Aktuell sida markeras** med `aria-current="page"`; en sida under ett menyval markerar valet med `aria-current="true"` (W3C APG, disclosure-navigering).
- **Menypanelen i mobilen listar tjänsterna direkt**, också när datorns meny samlar dem under ett val, men namnen är desamma (Baymard 2023 och 2026, e-handel – överföringen är härledd).
- **De första orden bär valet.** Besökare läser i regel de första cirka elva tecknen, ungefär två ord (NN/g, [First 2 Words](https://www.nngroup.com/articles/first-2-words-a-signal-for-scanning/), 2009, 80 deltagare): "Trädfällning", inte "Våra tjänster inom trädfällning".
- **Vanliga ord, inga påhittade namn och inga överlappande val** (NN/g, [Category names](https://www.nngroup.com/articles/category-names-suck/), 2013). "Kontakt" heter Kontakt, eftersom besökare letar efter just det ordet (NN/g, *Contact Us*, 2019).
- **Ingen meny efter målgrupp** (*Privat*, *Företag*): besökaren vet inte vilken grupp hon tillhör och innehållet dubbleras. En sida "För företag" kan finnas som sekundär väg (NN/g, [Audience-Based Navigation](https://www.nngroup.com/articles/audience-based-navigation/), 2015).
- **Ingen lokal navigering i sidokolumn** på små sajter; kontextuella länkar till närliggande sidor räcker (NN/g, [Local Navigation](https://www.nngroup.com/articles/local-navigation/), 2021).

## Sidfoten

Innehållet är reglerat i guiden: företagsuppgifterna, telefon, adress som kartlänk, mejl, sajtens sidor och policylänkarna (→ `guide/2-3-struktur.md`, N1 och N2). Sidfoten tar det menyn inte har; menyn är ingen sidkarta (GOV.UK, *Navigate a service*).

- Sidorna i sidfoten heter likadant som i menyn och rubrikerna (G4).
- **En hel sidkarta i sidfoten fungerar upp till cirka 25 sidor;** sidfoten har högst två nivåer, konventionella etiketter, och fälls inte ihop i mobilen. Den är mobilens andra meny (NN/g, [Footers 101](https://www.nngroup.com/articles/footers/), 2019).
- **Inga ortslistor eller sökordslänkar i sidfoten.** `site-architecture` föreslår sidfoten för ortssidor; det liknar Googles exempel på dörrsidor ("pages targeted at specific regions or cities that funnel users to one page", [spampolicyer](https://developers.google.com/search/docs/essentials/spam-policies)). Verkliga mottagningar står i sidfoten med adress, som guiden kräver; det är något annat.

## Internlänkar och länktext

- **Varje sida har en länk från minst en annan sida, med `<a href>`** (📄 [Google, Link best practices](https://developers.google.com/search/docs/crawling-indexing/links-crawlable): "Every page you care about should have a link from at least one other page"; Google följer bara `<a>` med `href`).
- **Länktexten beskriver målet,** kort och relevant, och fungerar utan sammanhanget (📄 Google, samma sida: "descriptive, reasonably concise, and relevant"; 📄 WCAG 2.2, [2.4.4 Link Purpose (In Context)](https://www.w3.org/WAI/WCAG22/Understanding/link-purpose-in-context.html), A). "Läs mer" ensamt duger inte.
- **Kontextuella länkar mellan närliggande sidor:** behandling till behandling, behandling till mottagning, Om-sidan till behandlingarna, mottagning till mottagning. Expertenkäten Whitespark 2026 rankar "Internal Linking Across Entire Website" som lokal faktor 6 (en enkät, inte ett experiment). En sida som bara nås från menyn och sidfoten och inte länkar vidare i texten är en återvändsgränd för den som läser.
- **Ingen siffra per tusen ord.** marketingskills (5–10) och claude-seo (2–5) motsäger varandra och saknar belägg.
- **Länkar i HTML från bygget.** En ö med `client:only` syns inte för sökmotorn; navigation och länkar renderas alltid på servern.

## Brödsmulor

- **Behövs sällan på våra sajter.** NN/g: platta sajter med en eller två nivåer behöver inga brödsmulor som vägvisning ([Breadcrumbs: 11 Design Guidelines](https://www.nngroup.com/articles/breadcrumbs/), 2018, granskad 2026, riktlinje 7). Guiden planerar dem för tjänstesidor från sajt 2 (→ `guide/2-3-struktur.md`, N2), vilket är två nivåer; om de ska stå kvar som standard eller bli tillval är ett förslag till Johnny. Aldrig på startsidan. `site-architecture` vill ha dem på alla sidor och säger emot sin egen småföretagsprofil.
- **Om de finns:** komplement till menyn, aldrig ersättning; "Start" antingen i menyn eller i brödsmulan; i mobilen får kedjan kortas till föräldern ("‹ Tjänster") med klickytor på minst 1 cm (NN/g, samma artikel).
- **De visar sidans plats längs den typiska vägen, inte adressen.** 📄 Google: "represent a typical user path to a page, instead of mirroring the URL structure" ([Breadcrumb](https://developers.google.com/search/docs/appearance/structured-data/breadcrumb)). NN/g: platsen i hierarkin, inte besökarens historik. `site-architecture`:s "Breadcrumbs should mirror the URL hierarchy" används inte.
- **Aktuell sida står sist,** olänkad eller med `aria-current="page"` (NN/g, riktlinje 4 och 5; W3C APG, [Breadcrumb](https://www.w3.org/WAI/ARIA/apg/patterns/breadcrumb/)). `site-architecture`:s råd att utelämna den används inte.
- Placering före `<main>` och markup → skillen `skelett`, `interaktion.md`. `BreadcrumbList` bara där brödsmulorna syns → [strukturerad-data.md](strukturerad-data.md).

## Klickdjup

- **Högst två klick från start till varje sida** som kontroll som flaggar (→ `guide/2-3-struktur.md`, N2). Tre-klicksregeln "is not backed by data" (NN/g 2019); det som räknas är information scent och tydliga etiketter, så klickdjupet är en egenskap hos platta småföretagssajter och inget UX-mått.

## Adresser

- **Svenska ord, gemener, bindestreck, högst två nivåer;** å, ä och ö som a, a och o är ett val (→ `guide/2-3-struktur.md`, N2; 📄 [Google, URL structure](https://developers.google.com/search/docs/crawling-indexing/url-structure)).
- **Ett snedstreck på slutet, konsekvent,** så att varje sida har en adress (`trailingSlash` i Astro), och kanonisk adress per sida (→ `guide/2-8-teknik-och-kvalitet.md`).
- **Fungerande gamla adresser behålls vid ombyggnad** när de redan följer reglerna; annars omdirigering eller beslut om borttagning (→ `guide/2-2-omfattning.md`).
- Inga datum, id-nummer eller frågeparametrar i adresser för innehåll (*site-architecture*; Google: "readable words rather than long ID numbers").
