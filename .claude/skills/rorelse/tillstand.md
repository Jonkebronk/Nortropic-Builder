# Tillstånden – den sparsamma rörelsen komponent för komponent

Delfil till `SKILL.md`. Sparsam betyder att bara det besökaren själv utlöser rör sig. Här står vad varje vanlig del av en företagssajt ska göra. Färgerna i tillstånden – hur mycket mörkare en knapp blir vid hover och tryck – hör till ytan (→ `.claude/skills/yta/detaljer.md` och `farg.md`). Här står längden, kurvan och rörelsen. Längderna och kurvorna står i [matt.md](matt.md).

## Knappar

- **Hover:** färgen byter till kitets hover-steg på `--k-tid-snabb` med entrékurvan. Bara inom `@media (hover: hover) and (pointer: fine)`, eftersom en pekskärm annars behåller hover-läget efter ett tryck. 📄 Kowalski, `mobile-native` §1 och `animate` steg 7 (MIT).
- **Tryck:** `:active` ger kvittens direkt: ett färgsteg till och `transform: scale(0.97)` på 100–160 ms med ease-out. `:active` gäller också på pekskärm och behöver ingen hover-spärr. 📄 Kowalski, `animate`, *RECIPES.md* (*Button press*) och `emil-design-eng` (*Buttons must feel responsive*). En knapp som inte svarar alls är ingen mikrointeraktion. 📄 NN/g, Kendrick 2018, *Microinteractions*.
  - Skalan 0,97 är en förflyttning i WCAG:s mening och tas bort med `reduce`. Färgsteget står kvar.
  - Specificitet: en regel som nollställer hover-lyftet, som `[data-rorelse="sparsam"] .knapp:hover { transform: none; }`, vinner över `.knapp:active` medan pekaren vilar på knappen. Trycket måste skrivas minst lika specifikt, till exempel `[data-rorelse] .knapp:active`. Uppmätt i Chromium 2026-10-16.
  - På iPhone målar Safari en grå markering över det som trycks (`-webkit-tap-highlight-color`). Den tas bort först när knappen har ett eget `:active`. Om `:active` alls visas i iOS Safari utan en `touchstart`-lyssnare är inte kontrollerat ⚠️; prova på en riktig telefon. 📄 Kowalski, `mobile-native` §2 och §5.
- **Inget lyft och ingen skugga som växer i sparsam.** Ett lyft vid hover är en mikrointeraktion för måttlig budget (`bibliotek/src/styles/rorelse.css`).

## Länkar i löptext och uppmaningar

- Understrykningen blir tjockare vid hover, direkt eller på `--k-tid-snabb`. Bara färg och linje, ingen förflyttning.
- Pilen i en uppmaning (*Mer om oss →*) rör sig inte i sparsam. En pil som glider 2–4 px vid hover hör till måttlig. 🔧

## Fokus

- Fokusringen syns direkt och animeras inte (→ [matt.md](matt.md)). Den döljs inte av något som glider in, som ett sidhuvud eller en knapplist (→ `guide/2-8-teknik-och-kvalitet.md`, WCAG 2.4.11).
- När fokus flyttas till något utanför fönstret rullar sidan dit. Med `reduce` sker det direkt.

## Menypanel och andra paneler

- **In:** panelen glider från sin kant eller växer från sin knapp med `--k-tid-panel` och entrékurvan. En popup eller rullgardin skalas från utlösaren (`transform-origin`), aldrig från `scale(0)` – börja på 0,95–0,97 med opacitet. En dialog i mitten av skärmen är undantagen och skalas från sin mitt. 📄 Kowalski, `animate` steg 4.
- **Ut:** kortare, cirka 0,7 gånger entrén. 📄 NN/g, Laubheimer 2020.
- **Bakgrunden** (`::backdrop`) tonas in och ut med panelen, så att de läses som en yta. 📄 Kowalski, *RECIPES.md* (*Modal*).
- **Utan JavaScript:** popover-API:t med `@starting-style` och `transition-behavior: allow-discrete` för `display` och `overlay` ger in- och utgång i ren CSS. Chrome 117 och Safari 18 animerar `display`; Firefox 129 har `@starting-style` men animerar inte `display`, så där stängs panelen direkt. 📄 MDN browser-compat-data, 2026-10-16. Open Props har sedan 2026-10-11 ett färdigt mönster i `src/extra/transitions.css` (MIT), men med 1 s, som är för långt.
- **Avbrytbar:** `transition`, inte `@keyframes`, så att en panel som stängs mitt i entrén vänder från där den är. 📄 Kowalski, `review-animations` standard 6.
- **Med `reduce`:** panelen glider inte. Den syns direkt eller tonas in på cirka 150 ms; båda godtas. 📄 WCAG 2.3.3: opacitet är inte rörelse; 📄 Apple HIG och Kowalski: mjukare, inte noll.

## Sidhuvud och knapplist vid scroll

- Ett sidhuvud som göms vid scroll nedåt och kommer tillbaka uppåt, och en knapplist som visas när förstavyns knappar lämnat skärmen, är funktionella tillståndsbyten. De glider på `--k-tid` med entrékurvan och tar hänsyn till ett tröskelvärde, så att de inte fladdrar.
- De startar när något scrollas, och WCAG räknar det som att något startar automatiskt (📄 Understanding 2.2.2). De varar under fem sekunder och uppfyller därför 2.2.2. Att de ryms i sparsam är en tolkning och ett förslag till Johnny 2026-10-16, inte beslutat.
- **Med `reduce`:** ingen förflyttning. Sidhuvudet byter läge direkt, och knapplisten tonas in på cirka 200 ms.

## Samtyckesrutan

- Rutan visas direkt vid laddning, utan animation. Den kommer på varje första besök, och sparsam tillåter inget som startar av sig självt.
- Bytet från frågan till kvittot sker direkt, eftersom kvittot är text som ska kunna läsas genast (Johnnys princip). Fokus flyttas till kvittot (→ `guide/2-8-teknik-och-kvalitet.md`).

## Frågor och svar (`<details>`)

- Chevronen vänds 180° på 150–200 ms med entrékurvan. Med `reduce` byter den läge direkt.
- **Svaret visas direkt.** Att fälla ut höjden och tona in svaret avvisas i sparsam: texten ska vara läsbar i samma ögonblick den syns, och höjdanimation kostar layout i varje bildruta. 📄 Kowalski, *RECIPES.md* (*Accordion*); `BESLUT.md` 2026-10-15. Tekniken finns, `::details-content` i Chrome 131, Safari 18.4 och Firefox 143 och `interpolate-size` bara i Chrome 129 (MDN browser-compat-data), om Johnny vill pröva den i måttlig.

## Kvittens på formulär

- När formuläret skickats visas kvittot direkt som text i ett element med `role="status"`. En bock får tonas eller ritas in på högst 200 ms, men texten tonas inte. 🔧 Byggs när formulär tas in (N2).
- Ett fel visas direkt vid fältet. Att skaka fältet avvisas; det säger inget som texten inte säger, och det är en förflyttning.

## Ankarlänkar och *Hoppa till innehållet*

- `scroll-behavior: smooth` visar var på sidan besökaren hamnar. Den skrivs inom `@media (prefers-reduced-motion: no-preference)`, så att grundläget är direkt. 📄 WCAG-teknik C39.
- Mjuk rullning påverkar också `scrollIntoView()` och `scrollTo()` utan `behavior`. Skript som flyttar fokus och behöver hamna direkt sätter `behavior: 'instant'`.

## Avvisat i sparsam

Prövat och bortvalt, med skäl. 📄 Formen kommer från Kowalski, `find-animation-opportunities` (*Rejected candidates*).

| Kandidat | Skäl |
|---|---|
| Kort som lyfter vid hover | Måttlig budget. Korten är inte klickbara på hela ytan |
| Bilder som zoomar vid hover eller scroll | Fallgrop 4 (→ `guide/2-6-rorelse.md`) |
| Sektioner som tonas in vid scroll | Måttlig budget; texten ska vara läsbar direkt |
| Siffror som räknas upp | Startar av sig självt; siffran ska kunna läsas direkt |
| Skimrande skelett under laddning | En statisk sajt har inget att vänta på |
| Krusning (*ripple*) vid tryck | Material-mönster som inte hör till kiten; skalan räcker |
| Parallax | Budgeten expressiv, högst en, med reserv (→ `guide/2-6-rorelse.md`) |
