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

## Brytpunkter

- **Brytpunkter kommer från innehållet, inte från enhetsklasser.** Behåll den breda layouten tills den inte längre ryms. 📄 web.dev, [Responsive web design basics](https://web.dev/articles/responsive-web-design-basics): "Don't define breakpoints based on device classes". Krehels `better-layout` säger samma sak.
- **Komponenter anpassar sig med container queries** när de används i olika bredder (sidans huvudspalt, en sidopanel). Container queries är Baseline "high" sedan 2025-08-14 (web-features 3.43.0).
- Pröva alltid minsta och största bredd först: 320 och 1280 px, sedan 375 och 768 (→ `guide/bilaga-c-kontroller.md`, visningsbredderna).

## Gruppering och linjering

*(en källa – bänken: Krehel, `better-layout`, MIT; siffrorna är startvärden när kitet saknar egen skala)*

- **Luft före bakgrundsform före linje.** Avdelare bara i tät data som tabeller.
- **Luften mellan grupper är tydligt större än inom en grupp** – minst dubbelt som startvärde (8 inom, 16 eller mer mellan).
- **Få gemensamma kanter.** Allt i en sektion ligger på några få lodräta linjer; text och knappar börjar på samma kant som rubriken.
- **Ett kort finns bara där ramen hjälper.** Om borttagen ram, skugga, bakgrund och radie inte skadar interaktionen eller förståelsen är det inget kort *(Refero, `anti-ai-slop.md`, kort-testet)*.
- **Kontroller skiljer sig från innehåll:** allt klickbart har bakgrund, ram, understrykning eller fast plats; inget som inte går att klicka ser ut som en knapp.
- **Innehåll går ut till kanten, kontroller håller sig inom marginalerna** och de säkra ytorna; en knapp i full bredd ligger innanför marginalen.
- **En primär handling per vy.**

## Läsordning

- **Den visuella ordningen följer DOM-ordningen.** Använd aldrig `order`, `row-reverse` eller gridplacering för att flytta innehåll ur källordningen; byt i stället ordning i markupen och låt mobilen och datorn ha samma ordning, eller välj en variant. 📄 WCAG 2.2, [1.3.2 Meaningful Sequence](https://www.w3.org/WAI/WCAG22/Understanding/meaningful-sequence.html) och [2.4.3 Focus Order](https://www.w3.org/WAI/WCAG22/Understanding/focus-order.html).
- Det viktigaste ligger överst och vid den inledande kanten.

## Text som växer

- Textbehållare får `max-width` och `min-height`, aldrig fast bredd eller höjd. Svenska sammansatta ord bryts (`overflow-wrap`, mjukt bindestreck i långa rubrikord). 📄 WCAG 2.2, 1.4.4 och 1.4.12.

## Sökbar CSS-kontrolltabell

Mönster att söka efter i biblioteket och sajten, med åtgärd. *(Krehel, `better-layout`, `spacing-and-adaptivity.md`; MDN)*

| Mönster | Problem | Åtgärd |
|---|---|---|
| `1fr` med lång text i grid | Kolumnen växer och spiller över | `minmax(0, 1fr)` och `min-width: 0` |
| `100vw` | Tar med rullisten och ger horisontell scroll | `100%` |
| `100vh` på första vyn | Fel höjd när mobilens adressfält visas och göms | `min-height: 100svh`; `100dvh` bara för helskärmspaneler |
| Fast `height` på en textlåda | Text klipps vid zoom | `min-height` |
| `@media` inuti en återanvändbar sektion | Sektionen beter sig fel i en smal spalt | `@container` |
| `container-type` på ett element som krymper efter innehållet | Kollapsar till 0 | Ge det en bredd |
| `env(safe-area-inset-*)` utan `viewport-fit=cover` | Värdet blir 0 | Lägg till `viewport-fit=cover` |
| Sticky sidhuvud eller fast list utan `scroll-padding` | Ankarmål och fokus hamnar under | `scroll-padding-top` och `-bottom` med elementens höjd (📄 WCAG 2.2, 2.4.11) |
| `order:`, `row-reverse`, `grid-row` som flyttar innehåll | Läsordningen bryts | Ändra markupen |

## Allvar i granskningen

- **Hög:** klippning eller överlapp i 320 px eller vid 200 % zoom, innehåll som inte går att nå, läsordning som bryts.
- **Medel:** hierarki och gruppering som läses fel.
- **Låg:** putsning.
Det som inte gick att köra rapporteras som *inte kontrollerat*, inte som godkänt. *(Krehel, `better-layout`)*
