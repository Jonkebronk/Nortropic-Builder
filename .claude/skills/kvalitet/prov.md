# Provlistan för sektioner och komponenter

Körs när en sektion, komponent eller React-ö tas in i biblioteket eller ändras, inte i varje kundbygge. Listan är destillerad ur Jakub Krehels `break` (i inventeringen *better-break*) och Emil Kowalskis `break-ui` (*emil-break-ui*), båda MIT. Det ingen av dem prövar är märkt 🔧. 📄 [jakubkrehel/skills](https://github.com/jakubkrehel/skills), commit 4c66b1f; [emilkowalski/skills](https://github.com/emilkowalski/skills), commit 2d22863

## Vad som ska vara sant

- **Provsidan är rapporten:** varje läge visas med en etikett ovanför, och bara det som syntes trasigt är ett fynd. Ett förutsagt fel är inget fynd (Krehel).
- **Den riktiga komponenten används orörd.** Provet ändrar data och behållare, aldrig komponenten (Krehel, Emil).
- **Värdena är realistiska** eller hämtade ur innehållets typer, aldrig slumpade. Saknas en gräns för längd eller antal är det i sig ett fynd (Emil).
- **Bara de axlar som kan nå komponenten.** En knapp med fast etikett prövas inte för lång text (Krehel).
- **Riktigt visningsfönster** för sektioner som bryter om med `@media`. En fast behållare på 320 px utlöser bara container queries, inte `@media` (Krehel `break`; vår iakttagelse vid läsningen). Antingen container queries i sektionen eller ett fönster eller en ram på 320 px.
- **Provsidan når aldrig produktionsbygget.** Den ligger i bibliotekets provsidor (`bibliotek/src/pages/prov/`), inte i en sajt.
- **Fynden graderas** som trasig, ful eller skör (Emil) och översätts till hög, medel och låg. Varje fynd får en ägande regel i guiden eller i en lagerskill.
- **Ett laddat prov, en titt.** Provsidan laddas en gång och läses uppifrån och ned; bredderna är fasta behållare på sidan, inte ett fönster som ändras läge för läge. Ett fel som setts märks med en rad under lägets etikett, så att sidan går att läsa som rapport (Krehel).
- **Varje värde komponenten visar kartläggs först** med sin källa och sin gräns, eller "obegränsat". Glöm inte antal i rubriker, tider, märken, knapptexter ur data, bilder och listans längd (Emil).
- **Rapportera före rättning.** Breaks med fler än ett rätt svar (bryt eller korta av, vad ett tomt fält visar) blir beslut för Johnny, med en rekommendation (Emil).
- **Det som höll skrivs också,** så att ingen rör det i onödan (Emil).
- **Bryta, korta eller klippa avgörs per fält:** bryt det besökaren behöver i sin helhet (namn, rubriker); korta i slutet bara sekundär text och ge en väg till hela värdet; korta i mitten när värdena skiljer sig i slutet; klipp förhandsvisningar i kort med `line-clamp`. **Tal, belopp, datum, telefonnummer och adresser kortas aldrig** (Emil; → `tillganglighet.md`, utlösaren *avkortat utan väg till hela värdet*).

## Lägena

**Innehåll**
1. Tom sträng och fält som saknas: rubrik, ingress, knapptext, bild.
2. Ett ord, en bokstav.
3. Typiskt innehåll, som referens.
4. Flera meningar, eller 2 000 tecken inklistrade.
5. Obrytbar sträng: lång adress, lång e-post, långt sammansatt ord på svenska ("Fastighetsförvaltningsavdelningen"). 🔧 det svenska exemplet
   - **Svenska värstafall som bröt biblioteket 2026-10-16** (värdena är realistiska, inte påhittade för att spräcka): företagsnamnet *Kiropraktik & Naprapati Väst* (28 tecken) eller *Kiropraktik- och rehabiliteringskliniken i Norrstad* (51), som går in över menyn i sidhuvudet vid 1024 respektive 1280 px; e-posten *info@kiropraktikochrehabiliteringskliniken.example* (50), som ger sidledsscroll i sidfoten i 375 px (ett bindestreck i domänen räcker för att den ska brytas); *stötvågsbehandling* som sista ord före pilen i en länk med 24 px grundstorlek.
6. Å, ä och ö, också i versaler, och diakritiska tecken.
7. Emoji, ensam och i text.
8. Text som ska visas som den står (`<`, `&amp;`, `**`).
9. Tal: 0, 1 (singular), tusental med mellanslag, priser med "kr" som inte får brytas.

**Antal**

10. 0, 1, realistiskt och tio gånger realistiskt: kort, frågor, omdömen, mottagningar. Ett enda tjänstekort i ett rutnät med fyra kolumner lämnar tre fjärdedelar tomt; ett företag med en tjänst är realistiskt.
11. En post som är mycket längre än de andra i samma rutnät.

**Bild**

12. Bild som ger 404, saknad bild, panorama, stående, logotyp på mörk botten och långsam bild (CLS).

**Bredd och miljö**

13. 320 px (WCAG 1.4.10), klämd bredvid ett syskon, 280 px i en sidokolumn och mycket bred (2 560 px).
14. Zoom 200 % (WCAG 1.4.4), och större grundstorlek i webbläsaren, 24 och 32 px, i 375 px (Chromium: CDP `Page.setFontSizes`). Långa ord får inte spräcka en grid- eller flexkolumn (`overflow-wrap: anywhere` eller `minmax(0, 1fr)`; 📄 [MDN, overflow-wrap](https://developer.mozilla.org/en-US/docs/Web/CSS/overflow-wrap)), ord ska inte delas utan bindestreck i rubriker, och dold text (hopplänken) ska inte sticka fram (→ `tillganglighet.md`, *Stor text*).
15. Mörkt läge, om kitet har ett.
16. Reducerad rörelse (→ `guide/2-6-rorelse.md`).
17. Pekskärm: inget som bara syns vid hovring.
18. Forced-colors. 🔧
19. WCAG:s textavstånd (1.4.12), med CSP avslagen för provet. 🔧
20. Tangentbord genom varje instans, och Escape där något öppnas.
21. Utan JavaScript (→ `guide/2-4-skelett.md`, *HTML först*). 🔧

**Tillstånd**, där komponenten har dem

22. Laddar, fel och inaktiv.

**React-öar**, utöver lägena ovan 🔧

23. Före och efter hydrering: samma innehåll, ingen layoutförskjutning, axe 0 fel i båda lägena.
24. JavaScript med gzip, TBT på provsidan och INP för öns interaktioner (→ `prestanda.md`, *React-öar*).
25. Inga CSP-fel i konsolen med sajtens policy (→ `sakerhet.md`, *CSP för React-öar*).

## Felsignaturer

Vanliga orsaker när ett läge brister (Emil, med vår översättning; raderna om svenska ord, `nowrap` och företagsnamnet är våra iakttagelser 2026-10-16):

| Syns | Trolig orsak |
|---|---|
| Text spräcker kortet | `min-width: 0` saknas på flex- eller grid-barnet, eller `overflow-wrap: anywhere` saknas |
| Ikon krymper | `flex-shrink: 0` saknas |
| Siffror hoppar i en kolumn | `font-variant-numeric: tabular-nums` saknas |
| Fel singular eller plural | Texten byggd med strängar i stället för en pluralregel |
| Tusental utan mellanrum | Talet formateras inte för svenska (`Intl.NumberFormat('sv-SE')`) |
| Kort olika höga | Rutnätet sträcker inte barnen, eller innehållet saknar `margin-top: auto` på sista raden |
| E-post eller adress spräcker sidan fast `overflow-wrap: break-word` finns | `break-word` sänker inte minsta bredden för `inline-block`, flex- och grid-barn; `anywhere` gör det, eller `max-width: 100%` på länken |
| Länk med pil sticker ut ur kortet vid stor text | Sista ordet och pilen ligger i ett `nowrap`, och ordet är ett långt sammansatt ord; låt pilen följa ordet utan att hela ordet blir obrytbart |
| Företagsnamnet överlappar menyn | Namnet har `nowrap` och menyn får inte plats; byt till menyknappen efter behållarens bredd, eller låt namnet brytas på två rader |
| Ord delas mitt i utan bindestreck | `overflow-wrap: anywhere` utan `hyphens: auto`; svensk avstavning finns i alla stora webbläsare (MDN BCD) |
| Märke bryts på två rader | Märket får krympa; `white-space: nowrap` och `flex-shrink: 0` på märket |
| Text klipps upptill eller nedtill | Tät `line-height` med `overflow: hidden`; luftigare radhöjd eller ingen klippning |
| Trasig bild i stället för reserv | Ingen reserv vid fel; bilden har ändå mått, så layouten står kvar |
| Ett streck eller en tom rad där ett valfritt fält skulle stå | Platshållare för fält som saknas; utelämna raden |
| Text i en knapp som spräcker knappen | Fast `width`; bredden ur innehållet med `min-width` |
