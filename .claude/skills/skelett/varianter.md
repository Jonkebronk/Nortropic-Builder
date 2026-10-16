# Varianter, källor och premiummönster

Varianter byggs i biblioteket, aldrig i en kundsajt. I första sajten har varje sektion en variant; från sajt 2 två till tre (→ `guide/2-4-skelett.md`, N2). Johnny godkänner varje variant på provsidan.

## Hur en variantuppsättning ser ut

- **En namngiven axel per uppsättning:** struktur (hur innehållet är ordnat), täthet, betoning (vad som syns först), typografi eller röst. Varianterna får namn efter vad de är – "Delad", "Bara text", "Redaktionell" – aldrig "A" och "B". *(en källa – bänken: Krehel, `variant`, MIT)*
- **Riktigt innehåll och rätt antal poster.** En variant prövas med kundens text, en och tolv poster, långa sammansatta ord och saknad bild (→ `guide/2-4-skelett.md`, *Innehåll i värsta fall*). "Lorem ipsum and three rows make every structure look good" (Krehel).
- **Varianterna ska skilja sig på riktigt.** De tas fram av isolerade agenter med var sin vinkel, och en kritiker kontrollerar skillnaden (→ `guide/2-4-skelett.md`, N2, fallgrop 77).
- **Bedöms i 375 och 1280 px**, med samma kit, utan förvald favorit.

## Variantgolvet

Golvet gäller alla varianter lika och är ingen axel. En variant som inte klarar det godkänns inte. Destillerat ur Krehels golv med elva punkter, med normen där den finns:

1. Tillgängligt namn och synligt fokus på allt som går att klicka (📄 WCAG 2.2, 4.1.2 och 2.4.7).
2. Tangentbordet når allt, i läsordning (📄 1.3.2, 2.1.1, 2.4.3).
3. Ingen horisontell scroll i 320 px och inget som klipps vid låg höjd eller 200 % text (📄 1.4.10, 1.4.4).
4. Kontrast enligt kitet; inget som bara bärs av färg (📄 1.4.3, 1.4.11, 1.4.1).
5. `prefers-reduced-motion` respekteras (→ `guide/2-6-rorelse.md`).
6. Avkortat innehåll går att nå i sin helhet, och dolt innehåll har en synlig ledtråd som säger vad som döljs.
7. Fungerar med JavaScript av, eller är märkt som ö med kostnad och Johnnys dom (→ `guide/2-4-skelett.md`, N1, *HTML först*).
8. Bara kitets tokens – inga hårdkodade färger, avstånd, radier eller typsnitt (→ `guide/2-4-skelett.md`, N1).
9. Klickytor minst 24 × 24 px och 44 × 44 för knappar och fristående länkar (→ `guide/2-4-skelett.md`, *Kontroll*).

## Källor och licens

| Källa | Licens | Vad vi tar | Hur |
|---|---|---|---|
| [AstroWind](https://github.com/arthelokyo/astrowind) | MIT | Sektionskatalogen och sidtypernas sektionsval (`.agents/skills/use-widgets.md`, `write-landing-page.md`), `FAQs` med `<details name>`, `Gallery` med `<dialog>`, `Video` som laddas efter klick | Referens; skrivs i kitets tokens. Inte sidhuvudet – mobilmenyn kräver JavaScript |
| [Accessible Astro](https://github.com/incluud/accessible-astro-components) | MIT | Brödsmulor, hoppa-länk, `<details>` med CSS-animation bakom reducerad rörelse | Kopiera de få komponenterna, inte paketet |
| [Fulldev UI](https://github.com/fulldotdev/ui) | MIT | Flest varianter: 13 hero, 7 tjänster, 5 omdömen, 4 vanliga frågor, 3 kontakt | Ren Astro; dragspelet byts mot `<details>`; karusell och marquee tas inte |
| [HyperUI](https://github.com/markmead/hyperui) | MIT | Sidfötter, kontaktformulär, vanliga frågor på `<details>` | Ren HTML; färgklasserna byts mot tokens; sidhuvudenas menyknapp saknar funktion och tas inte |
| [Basecoat](https://github.com/hunvreus/basecoat) | MIT | Atomer: knappar och fält i ren HTML; uppdelningen bas-tokens / komponent / stilpaket | Inte rullgardinen med `role="menu"` |
| [Tailark](https://github.com/tailark/blocks) | MIT | Premiumdetaljerna nedan; block i React och Tailwind | Som ö eller omskrivet; hämtas från GitHub-repot, inte från en kopia på 21st |
| [Magic UI](https://github.com/magicuidesign/magicui) | MIT | Enstaka effekter efter Johnnys dom | Ö; rörelse som startar av sig själv tas inte |
| [21st.dev](https://21st.dev/) | Per komponent; villkoren ger användning "solely through the official 21st.dev platform" och kräver synlig länk tillbaka vid kopiering till andra webbplatser | Mönster och sökning efter varianter | Kod bara med uttalad öppen licens och helst från ursprungsrepot; "License: unknown" används inte ([villkoren](https://news.21st.dev/terms), 2026-07-20; ⚖️ tolkning, inte juridisk rådgivning) |
| [CodeStitch](https://codestitch.app/) | Kommersiell, återkallelig | Närmast målgruppen | Inte förrän licensen för ett internt bibliotek är klarlagd skriftligt |

Johnny har strukit referens- och kodregeln (`BESLUT.md` 2026-10-16), men lagen gäller: kod utan licens, andras texter, bilder och kännetecken kopieras inte. Källadress, författare och licens skrivs i komponentens första rad och i sajtens `licenser.md`.

## Premiummönster att föra in

Sett i Tailarks kod (MIT); varför de ger premiumkänsla är härlett. Alla kostar 0 kB.

- **Hårfin ring i stället för ram:** genomskinlig kantlinje plus en ring med låg opacitet av textfärgen och en svag skugga på kort och sekundärknappar. Fungerar på ljus och mörk bakgrund.
- **Koncentriska radier:** en ram runt en bild har den inre radien plus avståndet mellan dem (`calc(var(--radie) + 1rem)`). Samma radie inuti och utanpå ser fel ut.
- **Balanserade rubriker:** `text-wrap: balance` på rubriker och ingresser (Baseline "low" sedan 2024-05-13).
- **Dämpad sekundärtext och dämpade ikoner i knappar;** hover är en ton (ljusare eller mörkare bakgrund) på 150–200 ms, inte en effekt.
- **Container queries i rutnät,** så att korten anpassar sig efter sektionens bredd.
- **Omdömet som pratbubbla** med ett hörn nästan rakt och avsändaren i en liten rad under.
- **Linjer mellan frågor i stället för kort,** och en dämpad chevron som vrids 180° på 200 ms.
- **Generös och jämn sektionsrytm** ur kitets avståndsskala.

Inte: fokusringar på 1 px (för svaga mot kitets fokusstil och WCAG 2.4.7), glasytor över text där kontrasten inte går att mäta, logotypmoln och siffror utan belägg, lutade appskärmar som hero för en lokal tjänst (läses som en annan bransch, `BESLUT.md` 2026-10-16, G13).

## Verktyg när varianter tas fram

- **Provsidan och gallerivyn** visar varianterna sida vid sida (→ `guide/2-4-skelett.md`, *Gallerivyn*). En väljare med URL-parameter (Krehels `?__variant=`) får finnas i provsidan men följer aldrig med till en kundsajt.
- **Mätning av en referens:** se [referenser.md](referenser.md).
- **Tillstånd per komponent:** se [interaktion.md](interaktion.md), *Tillstånd*.
