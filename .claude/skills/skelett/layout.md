# Layout

Regeln om layoutprimitiver och var de bor står i guiden (→ `guide/2-4-skelett.md`, N2, och *Var biblioteket bor*: `bibliotek/src/layout/`). Flytande typ- och avståndsskalor hör till ytan (→ `guide/2-5-yta.md`).

## Primitiverna

Every Layout bygger layout ur små primitiver som anpassar sig efter innehållet i stället för efter brytpunkter (Pickering och Bell, [Every Layout](https://every-layout.dev/layouts/); kapitlen Stack, Sidebar och Switcher är fria, resten ⚠️ inte lästa). Vi skriver egen CSS med kitets tokens och kopierar inte bokens kod, som saknar uttalad licens.

| Primitiv | Löser | Var hos oss |
|---|---|---|
| Stapel (Stack) | Lodrätt flöde med jämnt avstånd mellan syskonen | Sektionernas inre rytm; `data-yta`-regeln bygger på den (→ `guide/2-4-skelett.md`, N2) |
| Låda (Box) | Utfyllnad och ram runt innehåll | Kort, faktakort |
| Mitten (Center) | Begränsad bredd, centrerad | Behållaren; radlängden är en token i kitet |
| Kluster (Cluster) | Element av olika bredd som radbryts som ord | Knappar, taggar, faktarader |
| Sidopanel (Sidebar) | Ett smalt och ett brett element sida vid sida som staplas när det breda blir för smalt | Porträtt och text, karta och adress, frågor med fast intro |
| Växel (Switcher) | Rad eller stapel vid en tröskel; med fler barn än gränsen alltid stapel | Det praktiska, tjänstekort, knappar i sista bandet |
| Täckyta (Cover) | Ett huvudelement centrerat lodrätt med huvud och fot | Första vyn när den fyller skärmen |
| Rutnät (Grid) | Kolumner med en minsta bredd | Tjänster, omdömen |
| Ram (Frame) | Fast bildförhållande | Bilder och kartor |
| Rulle (Reel) | Horisontell rullning | Bara med synlig ledtråd och `scroll-snap`, aldrig automatisk |

Switcherns teknik är `flex-basis: calc((var(--troskel) - 100%) * 999)` med tröskeln satt till radlängden och en gräns på fyra barn (Every Layout, *The Switcher*, fritt kapitel).

- **Stapeln sätter avståndet på syskonen, inte på barnen** (`.stapel > * + *`), så att inget avstånd blir över före det första eller efter det sista. Olika avstånd på olika nivåer görs med nästlade staplar, inte med undantag. *(Every Layout, The Stack, fritt kapitel)*
- **Dela stapeln** med `margin-block-end: auto` på ett barn i en stapel som är `display: flex; flex-direction: column`: det som följer hamnar längst ned. Så hamnar länken eller knappen på samma linje i kort av olika höjd i samma rad. *(samma kapitel: "Useful for card-like components")*
- **Sidopanelen staplas när huvudelementet skulle bli 50 % av behållaren eller smalare** (`min-inline-size: 50%` på huvudelementet), och med `align-items: flex-start` behåller elementen sina egna höjder. *(Every Layout, The Sidebar, fritt kapitel)*

## Brytpunkter

- **Brytpunkter kommer från innehållet, inte från enhetsklasser.** Behåll den breda layouten tills den inte längre ryms. 📄 web.dev, [Responsive web design basics](https://web.dev/articles/responsive-web-design-basics): "Don't define breakpoints based on device classes". Krehels `better-layout` säger samma sak.
- **Brytpunkter som är exakt ramverkets förval är ett tecken på enhetsklasser:** Tailwind v4 har 40, 48, 64, 80 och 96rem. En träff är härledd, inte ett fel i sig; skälet skrivs i komponenten (Krehel, `explain-interface`, `read-the-system.md`).
- **Komponenter anpassar sig med container queries** när de används i olika bredder (sidans huvudspalt, en sidopanel). Container queries är Baseline "high" sedan 2025-08-14 (web-features 3.43.0).
- Pröva alltid minsta och största bredd först: 320 och 1280 px, sedan 375 och 768 (→ `guide/bilaga-c-kontroller.md`, visningsbredderna).

## Gruppering och linjering

*(en källa – bänken: Krehel, `better-layout`, MIT; siffrorna är startvärden när kitet saknar egen skala)*

- **Luft före bakgrundsform före linje.** Avdelare bara i tät data som tabeller och tider; de är hårfina och svaga och läggs aldrig ovanpå ett stort avstånd som redan gjort jobbet.
- **Luften mellan grupper är tydligt större än inom en grupp** – minst dubbelt som startvärde (8 inom, 16 eller mer mellan).
- **Få gemensamma kanter.** Allt i en sektion ligger på några få lodräta linjer; text och knappar börjar på samma kant som rubriken. Djupare nivåer upprepar samma indragssteg i stället för att hitta på ett nytt.
- **Ett kort finns bara där ramen hjälper.** Om borttagen ram, skugga, bakgrund och radie inte skadar interaktionen eller förståelsen är det inget kort *(Refero, `anti-ai-slop.md`, kort-testet)*.
- **Ett kort som ser ut som en enhet att trycka på är det.** Har kortet en enda länk blir hela kortet länken (en utsträckt länk med länktexten som tillgängligt namn), eller så tas kortytan bort och innehållet blir en lista. Ett vitt kort där bara en rad svarar ger döda tryck. 🔧 härlett ur Krehel (*Keep controls distinct from content*, också omvänt) och kort-testet.
- **Kontroller skiljer sig från innehåll:** allt klickbart har bakgrund, ram, understrykning eller fast plats; inget som inte går att klicka ser ut som en knapp.
- **Ramlösa kontroller behöver mer luft:** 12 px mellan knappar med ram eller bakgrund, 24 px mellan de synliga glyferna i länkar utan ram (till exempel sidfotens länklistor), 24 px eller mer mellan grupper som inte hör ihop. Utsträckta klickytor får aldrig överlappa. *(startvärden ur Krehel, `spacing-and-adaptivity.md`; klickytornas storlek → [mobil.md](mobil.md))*
- **Innehåll går ut till kanten, kontroller håller sig inom marginalerna** och de säkra ytorna; en knapp i full bredd ligger innanför marginalen, i mobilen cirka 16 px in.
- **En primär handling per vy:** två olika handlingar konkurrerar aldrig med samma stil. Samma handling i datorns sidhuvud och i förstavyn är en upprepning, inte två handlingar, och följer G5 (samma knappar överallt, `BESLUT.md` 2026-10-16); om sidhuvudets knapp ska tonas ned medan förstavyns syns är ett förslag till Johnny. I mobilen göms knapplisten när sidans egna knappar syns (→ [mobil.md](mobil.md), *Fasta element*).
- **Dolt innehåll har en synlig ledtråd.** En rad som rullar i sidled låter nästa post titta fram 16–32 px; en utfällbar del har en chevron eller en text som säger vad som döljs ("Visa alla tider", inte "Mer"); avkortat innehåll går att nå i sin helhet, och en `title` som bara syns vid hover räknas inte. *(Krehel, *Hint at hidden content*)*

## Läsordning

- **Den visuella ordningen följer DOM-ordningen.** Använd aldrig `order`, `row-reverse` eller gridplacering för att flytta innehåll ur källordningen; byt i stället ordning i markupen och låt mobilen och datorn ha samma ordning, eller välj en variant. 📄 WCAG 2.2, [1.3.2 Meaningful Sequence](https://www.w3.org/WAI/WCAG22/Understanding/meaningful-sequence.html) och [2.4.3 Focus Order](https://www.w3.org/WAI/WCAG22/Understanding/focus-order.html).
- Det viktigaste ligger överst och vid den inledande kanten. I en rad kommer det som identifierar först och metadata och handlingar sist (Krehel, *Order by importance*).
- Logiska egenskaper (`margin-inline-start`) är tillåtna men inget krav: vi bygger inte för språk som skrivs från höger till vänster.

## Text som växer

- Textbehållare får `max-width` och `min-height`, aldrig fast bredd eller höjd. Svenska sammansatta ord bryts (`overflow-wrap`, mjukt bindestreck i långa rubrikord). 📄 WCAG 2.2, 1.4.4 och 1.4.12.
- **Pröva med större text, inte bara zoom.** Webbläsarens teckenstorlek 24 och 32 px (150 och 200 %) i 375 px, utöver zoom 200 % (640 × 400) och 400 % (320 × 200). 1.4.4 kan uppfyllas med zoom, men Understanding 1.4.4 räknar text som klipps eller döljs när texten förstoras som fel (F69). 📄 [Understanding 1.4.4](https://www.w3.org/WAI/WCAG22/Understanding/resize-text.html)
- **`white-space: nowrap` bara på kort text** som ryms också vid 200 % text: aldrig på långa sammansatta ord, knappetiketter med telefonnummer eller namnet i sidhuvudet.
- **Det som göms tills det får fokus göms med klippning, inte med en förskjutning i px.** `top: -100px` räcker inte när texten växer, och då ligger länken Hoppa till innehållet över sidhuvudet. GOV.UK gömmer med `clip-path: inset(50%)` och visar vid `:focus` (alphagov/govuk-frontend v6.6.0, `helpers/_visually-hidden.scss`, MIT).
- **Kritiska handlingar ligger i det vanliga flödet eller i en stabil ram,** aldrig där storleksändring, zoom eller rullning klipper dem. En panel som kan bli högre än skärmen (menyn, samtyckesrutan) har `max-height: 100dvh`, en rullande kropp och knapparna utanför den rullande delen. *(Krehel, *Plan for growth and clipping*)*

## Sökbar CSS-kontrolltabell

Mönster att söka efter i biblioteket och sajten, med åtgärd. *(Krehel, `better-layout`, `spacing-and-adaptivity.md`; MDN)*

| Mönster | Problem | Åtgärd |
|---|---|---|
| `1fr` med lång text i grid | Kolumnen växer och spiller över | `minmax(0, 1fr)` och `min-width: 0` |
| `100vw` | Tar med rullisten och ger horisontell scroll | `100%` |
| `100vh` på första vyn | Fel höjd när mobilens adressfält visas och göms, och en första vy i full höjd ser färdig ut (falskt golv, princip 5) | Ingen höjd i viewport-enheter på första vyn; innehållet bestämmer höjden. `svh` och `dvh` bara för paneler i full höjd, som menyn (`BESLUT.md` 2026-10-16, *Motsägelserna i skillsen*) |
| Fast `height` på en textlåda | Text klipps vid zoom | `min-height` |
| `@media` inuti en återanvändbar sektion | Sektionen beter sig fel i en smal spalt | `@container` |
| `container-type` på ett element som krymper efter innehållet | Kollapsar till 0 | Ge det en bredd |
| `env(safe-area-inset-*)` utan `viewport-fit=cover` | Värdet blir 0 | Lägg till `viewport-fit=cover` |
| Sticky sidhuvud eller fast list utan `scroll-padding` | Ankarmål och fokus hamnar under | `scroll-padding-top` och `-bottom` med elementens höjd (📄 WCAG 2.2, 2.4.11) |
| `order:`, `row-reverse`, `grid-row` som flyttar innehåll | Läsordningen bryts | Ändra markupen |
| `top: -100px` eller annan px-förskjutning för att gömma | Syns när texten växer | Klippning och `:focus` (*Text som växer*) |
| `white-space: nowrap` på långa ord eller knappetiketter | Sidledsscroll vid 200 % text | Låt raden brytas |
| `@media (width >= 40rem)`, `48rem`, `64rem` | Ramverkets förval, inte innehållet | Brytpunkt där layouten slutar rymmas, eller `@container` |

## Allvar i granskningen

- **Hög:** klippning eller överlapp i 320 px eller vid 200 % zoom, innehåll som inte går att nå, avkortat innehåll utan väg till helheten, dolt innehåll utan ledtråd, läsordning som bryts.
- **Medel:** hierarki och gruppering som läses fel, och klippning som bara syns med större text (inte med zoom).
- **Låg:** putsning.
- Ett fynd kräver ett fel som går att visa – klippning, överlapp, en grupp som läses fel. Ett värde som skiljer sig från startvärdena är inget fynd.
- En rad per grundorsak, med alla platser där den syns.
Det som inte gick att köra rapporteras som *inte kontrollerat*, inte som godkänt. *(Krehel, `better-layout`, *Reporting*)*
