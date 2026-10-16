# Apples HIG för rörelsen

Delfil till `SKILL.md`. Det Apples *Human Interface Guidelines* (HIG) säger om rörelse, återkoppling och reducerad rörelse, översatt till en sajt som mest besöks i Safari på iPhone, och vad som gäller för Emil Kowalskis `apple-design`, som översätter Apples rörelse till webben. Budgeten *sparsam* och reglerna i `guide/2-6-rorelse.md` går före (`BESLUT.md` 2026-10-15, *Rörelse – sparsam som standard*).

Källa: 📄 Apple, [Human Interface Guidelines](https://developer.apple.com/design/human-interface-guidelines/), sidorna *Motion*, *Accessibility* (*Cognitive*), *Feedback*, *Loading*, *Progress indicators*, *Launching* och *Gestures*, lästa som JSON 2026-10-16. Tre av HIG:s rörelseregler står redan i `SKILL.md` (princip 1, 2 och 9).

## Vad HIG lägger till

- **Rörelsen är aldrig enda bäraren av något viktigt.** Det rörelsen visar finns också i text, form eller färg, så att den som stängt av rörelse eller tittar bort får samma besked. 📄 HIG *Motion* (*"Make motion optional … avoid using it as the only way to communicate important information"*).
- **Rörelsen följer handlingen och förväntningen.** Det som kom in från ett håll går ut samma väg, och det som öppnades med en knapp stängs mot knappen. 📄 HIG *Motion* (*"if someone reveals a view by sliding it down from the top, they don't expect to dismiss the view by sliding it to the side"*). Emil Kowalskis `apple-design` §7 säger samma sak (MIT); HIG är primärkällan.
- **Återkoppling är kort och exakt.** En kort rörelse som sitter ihop med handlingen säger mer än en stor. 📄 HIG *Motion* (*"Aim for brevity and precision in feedback animations"*); → `matt.md`, längderna.
- **Inget rör sig vid laddning som besökaren inte startat.** Det som syns vid första målningen ska stå still: en fast list eller ett sidhuvud som först visas och sedan glider bort när skriptet körts är en rörelse besökaren inte bad om. Startläget sätts innan sidan målas eller utan övergång, och övergången slås på först efter första bildrutan. 📄 HIG *Launching* (*"If you include elements that look different when launching completes, people may experience an unpleasant flash"*); → budgeten *sparsam* (*Inget som startar av sig självt vid laddning*).
- **Laddning visar något direkt.** Det som laddas senare (kartan) har en platshållare med text som säger vad som kommer, och en indikator som står still läses som ett fel. Sajtens egna sidor laddas utan indikator. 📄 HIG *Loading* (*"Show something as soon as possible"*) och *Progress indicators* (*"Keep progress indicators moving"*).
- **Ljud och video spelas inte upp av sig själva utan kontroller,** och en video med blinkande ljus undviks. 📄 HIG *Accessibility* (*"Let people control audio and video playback"*); → `guide/2-6-rorelse.md`, WCAG 2.2.2 och 2.3.1.

## Reducerad rörelse, som HIG beskriver den

HIG listar vad *Reduce Motion* ska ta bort. Varje punkt har en motsvarighet i `prefers-reduced-motion: reduce` (→ `reducerad.md`, `guide/2-6-rorelse.md`, N1):

| HIG *Accessibility* | På webben med `reduce` | Hos oss |
|---|---|---|
| *"reducing automatic and repetitive animations, including zooming, scaling, and peripheral motion"* | Inget skalar, zoomar eller rör sig i ögonvrån | Finns (N1) |
| *"Replacing transitions in x-, y-, and z-axes with fades"* | Paneler och lister tonas i stället för att glida | Finns (`reducerad.md`) |
| *"Avoiding animating into and out of blurs"* | Ingen oskärpa som animeras | Finns (N1: oskärpa räknas som rörelse) |
| *"Avoiding animating depth changes in z-axis layers"* | Ingen 3D-förflyttning eller perspektiv | Finns delvis: inte nämnt uttryckligen |
| *"Tightening animation springs to reduce bounce effects"* | Inga studsar alls | Finns (inga studsar i sparsam) |
| *"Tracking animations directly with people's gestures"* | Gäller dragbara ytor, när de kommer | Senare nivå |

## Emil Kowalskis `apple-design`

Skillen översätter Apples WWDC-föredrag till webben: fjädrar i stället för fasta längder, hastighet som lämnas över från gesten, momentum, gummiband vid kanter, material och Apples åtta designprinciper. Läst i sin helhet 2026-10-16 (uppströms commit `2d22863`, skillen oförändrad sedan `85e8e23`, 2026-09-15).

- **Gestdelen (§1–11) väntar tills en sajt får dragbara ytor,** som en låda att svepa eller ett galleri att dra i. Sparsam rörelse har inga sådana. När de kommer gäller tre rättelser ur uppströms ärende #32: fjädervärdena i tabellen kommer från en reimplementation från communityt och inte från Apple, Motions `duration` + `bounce` nollställer hastigheten så att överlämningen aldrig sker, och `transform: none !important` under `reduce` lägger stängda lådor synligt på skärmen (→ källkortet `kunskap/kallkort/emil-apple-design.md`).
- **HIG publicerar inga fjädervärden.** Den enda Apple-källa med siffror är HIG:s råd att strama åt fjädrar under reducerad rörelse. Siffror som presenteras som *"values Apple ships"* behandlas som ⚠️ tills de hittats i Apples egna dokument.
- **Skillens regel att undvika CSS-övergångar gäller bara det som följer en gest.** Meny, knapplist och vanliga frågor startas med ett tryck och byggs fortfarande med `transition`, som går att avbryta (princip 9 i `SKILL.md`).
- **Typografin (§15) och materialet (§12)** hör till ytan och står mot primärkällan i `../yta/apple-hig.md`. Skillens påstående att stor text alltid ska ha negativ spärrning stämmer inte med Apples egen tabell för SF Pro.
- **Grundprinciperna (§16)** finns nu hos Apple själv, som sidan *Design principles* i HIG (återinförd 2026-06-08), och läses där.

## Det som inte går att översätta

- **Haptik.** HIG ber om haptik tillsammans med ljud och bild. Vibration API finns inte i Safari på iPhone (MDN browser-compat-data 8.1.6: `Navigator.vibrate` saknas i Safari och iOS Safari), så en sajt kan inte ge haptik där. Återkopplingen är synlig.
- **Systemfjädrar och Liquid Glass-rörelser** som reagerar olika på finger och styrplatta.
- **Animerade SF Symbols** (licensen tillåter inte SF Symbols på webben, → `../yta/apple-hig.md`).
- **Inställningarna *Dämpa blinkande ljus* och *Spela upp förhandsvisningar automatiskt*** har ingen mediefråga på webben ⚠️; `prefers-reduced-motion` är det närmaste.

## Förbjudet

- Rörelse som enda bärare av ett besked.
- Något som rör sig vid sidladdning utan att besökaren startat det, också fasta lister som glider bort.
- Fjädervärden som presenteras som Apples utan Apple-källa.
- Egna svepgester för att stänga eller navigera, som krockar med Safaris.
