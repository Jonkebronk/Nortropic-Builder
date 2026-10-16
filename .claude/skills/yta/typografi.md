# Typografi

Delfil till `SKILL.md`. Typsnitt, skala, radhöjd, spärrning, radlängd, siffror, radbrytning och laddning. Svensk mikrotypografi (citattecken, tankstreck, siffergrupper, decimalkomma, klockslag) står i `guide/2-7-innehall.md` och skrivs inte om här.

## Redan beslutat (→ guiden)

- Typsnitt ur en kuraterad OFL-lista, självhostade; `latin` räcker för svenska, `latin-ext` behövs för samiska namn; subsetta inte efter använda tecken (→ `guide/2-5-yta.md`, N2).
- Flytande typskala enligt Utopia, med största värdet högst 2,5 × det minsta per steg (→ `guide/2-5-yta.md`, N2; WCAG 1.4.4).
- Versaler bara där kitet anger det, då med 5–12 % spärrning (→ `guide/2-5-yta.md`, C53).
- Inter är varken standard eller förbjuden; varje kit väljer (`BESLUT.md` 2026-10-15).

## Skalan

- **Exakta värden är fynd, heuristik är det inte.** Enhetslös radhöjd, vikt minst 400 under 18 px, ett tak för radlängden, 16 px i fält och tabulära siffror är fynd när de saknas. Spärrning, typsnittspar och skalkvot är tumregler och blir fynd först när de bryter kitets egen skala. En granskning föreslår aldrig ett nytt typsnitt, eftersom typsnittet är ett kitbeslut. 📄 Krehel, `better-typography/SKILL.md`, *Measured, not preferred* (via yta-2).
- **En skala per kit, och inga storlekar utanför den.** Skalan har 6–8 steg, från bildtext till display, och varje storlek i en sektion är ett steg ur kitet. Varför: varje extra storlek späder ut hierarkin. 📄 Bringhurst, *The Elements of Typographic Style* 3.1.1 (*Don't compose without a scale*); Refactoring UI, *Establish a type scale* (med egna ord); Krehel, `better-typography/SKILL.md` (MIT); → C48 i `guide/bilaga-c-kontroller.md` (N2).
- **Grannsteg ska gå att se.** Steg som skiljer sig mindre än cirka 10 % (till exempel 15,2 och 16 px) ger ingen hierarki, bara brus. En modulär kvot på 1,125–1,333 ger synliga steg. 📄 Utopia, [type calculator](https://utopia.fyi/type/calculator/); tröskeln är härledd ⚠️.
- **Storlek, radhöjd och vikt sätts som ett par per roll**, så att en roll är ett beslut och inte tre. 📄 Krehel, `better-typography/SKILL.md`, *Use a type scale*.
- **Betoning inom en roll är ett viktsteg upp, inte en ny storlek.** En storlek som bara finns för att något ska synas mer späder ut skalan. 📄 Krehel, `spacing-and-sizing.md` (via yta-2).
- **Rubriknivåerna går nedåt i storlek**, och en rubrik är aldrig mindre än brödtexten utom en medveten överrad. 📄 Krehel, `SKILL.md`, *Heading sizes descend with level*.
- **Displaystorleken har ett tak på cirka 5,5–6 rem (88–96 px)**, också i djärva kit. Ett enda ord eller en siffra får vara större. Varför: större rubriker trängs och bryts på 1280–1440 px, och det läses som dramatik, inte tyngd. 📄 impeccable, `craft-floor.md` (6 rem); Hallmark, `typography.md` (5,5 rem, högst 6) – två skills, ingen primärkälla (instruktion).
- **Rubrikens längd styr storleken.** En h1 över cirka 50 tecken går ett steg ned i skalan, och över cirka 90 tecken skrivs den om. Detektorn i impeccable larmar för en rubrik på minst 72 px och minst 40 tecken som tar mer än en fjärdedel av första skärmen. 📄 Hallmark, `typography.md`, *Hero headline sizing*; impeccable, regeln `oversized-h1` (två skills – instruktion). Texten → `guide/2-7-innehall.md`.
- **Storlekar i `rem`**, så att besökarens inställning gäller. Brödtext börjar på 16 px, gränssnittstext på 14 px och bildtext på 13 px; sällan under 12 px. 📄 Krehel, *Size floors*; Butterick, [Summary of key rules](https://practicaltypography.com/summary-of-key-rules.html) (brödtext 15–25 px på webben).

## Radhöjd

- **Enhetslös radhöjd per roll:** display cirka 1,05–1,1, rubriker 1,15–1,3, brödtext 1,45–1,6. Allt som bryts till tre rader eller fler får minst 1,4. 📄 Krehel, *Line-height by role*; Butterick (120–145 % av punktstorleken).
- **Rubriker i versaler har radhöjd minst 1,0, helst 1,02–1,08.** Versaler saknar underhäng, så under 1,0 möter versalernas toppar raden ovanför när rubriken bryts. Djärvs rubriker (versaler, 0,95) bryter mot regeln. 📄 Hallmark, `slop-test.md`, grind 55 (en källa – bänken).
- **Stycken markeras med avstånd eller med indrag, inte med båda.** 📄 Butterick, [Space between paragraphs](https://practicaltypography.com/space-between-paragraphs.html) (*"an alternative to a first-line indent"*); impeccable, `typeset.md`.
- **Kortare rader tål tätare radhöjd, längre rader behöver glesare.** Ett luftigt kit får sin luft ur avstånden mellan block, inte ur glesa rader. 📄 Refactoring UI, *Line-height is proportional* (med egna ord); Butterick.
- **Ingen fast höjd på textbehållare.** Texten ska tåla radhöjd 1,5, 2 × styckeavstånd, 0,12 em spärrning och 0,16 em ordavstånd utan att klippas. 📄 WCAG 2.2, [1.4.12 Text Spacing](https://www.w3.org/WAI/WCAG22/Understanding/text-spacing.html).

## Spärrning

- **Spärrningen följer storleken** (versaler och långa sifferrader spärras alltid, Bringhurst 2.1.6): rubriker från cirka 24 px −0,01 till −0,02 em (större rubrik, mer negativ), brödtext 0, versaletiketter +0,05–0,12 em. Alltid i `em`. 📄 Krehel, *Letter-spacing by size*; Butterick (versaler 5–12 %); Emil Kowalski, `apple-design` (MIT). Regeln gäller typsnitt utan egen spärrningstabell: Apples SF Pro har negativ spärrning kring 17 pt och positiv från 24 pt (📄 Apple HIG, *Typography*, *Tracking values*), så ett typsnitt med egna mått eller optiska storlekar följer dem (→ `apple-hig.md`).
- **Kerning är alltid på.** `font-kerning: none` är aldrig en lösning. 📄 Butterick; Krehel.

## Radlängd

- **Brödtext 45–75 tecken per rad**, helst runt 66. Rubriker får vara bredare. 📄 Bringhurst 2.1.2; Butterick (45–90); Krehel (60–75).
- **I mobilen är 35–60 tecken inget fynd.** 45–75 är måttet på bred skärm; i 320–414 px blir raden kortare av sig själv. 📄 ui-ux-pro-max, `quick-reference.md` (*line-length-control*; en källa – bänken).

## Vikter och typsnitt

- **Högst två familjer per kit**, plus möjligen en accentstil för ett fåtal ord (som en handskriven markering). Tre eller fler typsnitt brukar fälla en sajt hos granskaren. Para för kontrast: serif mot sans, inte två nästan lika sans. 📄 Krehel, *Fewer fonts*; `mallar/granskning.md` (*Brukar fälla*).
- **Ladda varje vikt som används.** En `font-weight` utan matchande fil gör att webbläsaren syntetiserar eller faller tillbaka till närmaste vikt, och betoningen försvinner eller blir förvrängd. Kitet anger vilka vikter som finns, och sektionerna använder bara dem. 📄 Krehel, *Load the faces the design uses*; [CSS Fonts 4, font matching](https://www.w3.org/TR/css-fonts-4/#font-matching-algorithm). `font-synthesis: none` sätts bara på en avgränsad detalj och efter att reservtypsnitten kontrollerats; behövs det stängs bara ett läge av, med `font-synthesis-weight` eller `font-synthesis-style`. 📄 Krehel, `variable-fonts-and-opentype.md` (via yta-2).
- **Display- eller textsnitt efter storleken.** Har ett typsnitt separata *Display*- och *Text*-snitt eller en `opsz`-axel, används det snitt som passar storleken. Ordet "Display" i namnet gör inte ett typsnitt till rubriksnitt. 📄 Krehel, `choosing-fonts.md` (en källa – bänken; via yta-2).
- **Rubrikens vikt skiljer sig tydligt från brödtextens**, men källorna är oense om hur mycket: Hallmark kräver minst 300 enheter (400 mot 700, inte 600), impeccables detektor nöjer sig med 200. Lugn har 400 mot 600. Det avgörs per kit på provsidan, tillsammans med storleken. 📄 Hallmark, `typography.md`; impeccable, regeln `flat-type-hierarchy`.
- **Under 18 px vikt minst 400.** Tunna vikter (100–300) först från cirka 28 px. 📄 Krehel, *Fewer fonts*; Apple HIG, *Typography* (*avoid light font weights*).
- **Egenskaper före taggar:** `font-weight: 650` hellre än `font-variation-settings`, `font-variant-numeric` hellre än `font-feature-settings`. `font-optical-sizing` lämnas på `auto`. 📄 Krehel, `variable-fonts-and-opentype.md`; MDN, [font-variant-numeric](https://developer.mozilla.org/en-US/docs/Web/CSS/font-variant-numeric).
- **Reserverade typsnittsnamn (RFN) läses i upphovsägarens OFL-fil, inte i Fontsources.** IBM Plex reserverar *Plex* och Source Serif *Source* (det står i själva Fontsource-filen, fast paketets `LICENSE` säger annat); Inter, Fraunces, Familjen Grotesk, Atkinson Hyperlegible Next och Instrument Sans har inga. En delmängd räknas som ändring, och Fontsource-filerna är inte funktionellt likvärdiga med originalen, så ett typsnitt med RFN tas från upphovsägarens egna filer eller väntar på Johnnys beslut (OFL-FAQ 2.6–2.8; ⚖️ tolkning, inte juridisk rådgivning). IBM:s npm-paket kör telemetri vid installation; stäng av med `IBM_TELEMETRY_DISABLED=true`. 📄 [OFL-FAQ](https://openfontlicense.org/ofl-faq/); källkortet *Kuraterade OFL-typsnitt*.
- **Variabel fil när kitet använder flera vikter**, statiska filer när det bara behövs en eller två. 📄 Fontsource, [variable fonts](https://fontsource.org/docs/getting-started/variable).
- **Typsnittet täcker svenska och, vid behov, nordsamiska.** Kontrolleras en gång per typsnitt när det tas in i ett kit (Hyperglot). 📄 `kunskap/research/2026-10-15_kompetensluckor-anteckningar/lager-5-yta.md` §3.

## Siffror

- **Tabulära siffror där siffror står i kolumn eller jämförs:** öppettider, prislistor och tabeller. Proportionella siffror i löptext. 📄 Krehel, *Tabular numbers on changing values*; Vercel, [Web Interface Guidelines](https://vercel.com/design/guidelines) (MIT).
- **Tal som jämförs högerställs**, liksom rubriken över kolumnen; text står vänster. Då hamnar entalen under varandra i prislistor och tabeller. 📄 GOV.UK Design System, [Table](https://design-system.service.gov.uk/components/table/) (*"align the numbers to the right"*).
- **Kontrollera siffrorna per typsnitt.** I Fontsource-filerna saknar Fraunces och IBM Plex Sans tabulära siffror (`tnum`), och inget av sju kontrollerade typsnitt har gemena siffror (`onum`) eller kapitäler (`smcp`), eftersom Google Fonts-byggena tar bort funktioner. Bringhursts regel – gemena siffror i löptext, versalsiffror med versaler – går alltså sällan att följa med Fontsource; tabulära siffror måste finnas i kitets typsnitt. 📄 Bringhurst 3.2.1 (via webtypography.net ⚠️); Fontsource, ärende [#39](https://github.com/fontsource/fontsource/issues/39); egen läsning av GSUB 2026-10-16.

## Radbrytning och tecken

- **`text-wrap: balance` på rubriker och korta texter, `pretty` på stycken.** `balance` på stycken är fel (Chromium ignorerar det efter sex rader). 📄 Krehel, *Wrap deliberately*; MDN, [text-wrap](https://developer.mozilla.org/en-US/docs/Web/CSS/text-wrap).
- **Det som hör ihop bryts inte isär:** telefonnummer, tal och enhet, och en ikon med sitt sista ord (pilen efter en länktext). Använd vanligt hårt mellanslag (U+00A0): smalt hårt mellanslag (U+202F) och hårt bindestreck (U+2011) saknas i alla sju kontrollerade typsnitt. 📄 Vercel (*non-breaking space … to keep units … together*); ISOF, *Snabba skrivregler* (fast mellanslag vid behov); → `guide/2-7-innehall.md` för svenska exempel.
- **Långa ord, e-postadresser och länkar får brytas** där de annars skjuter ut ur sin behållare i 320 px eller vid 200 % text. Svenska har ord som *stötvågsbehandling*. I löptext gäller mjuka bindestreck och `hyphens` (nedan) och därefter `overflow-wrap: break-word`. I rubriker och adresser i flex- eller rutnätsceller, där `break-word` inte krymper cellen, används `overflow-wrap: anywhere` med `min-width: 0`. 📄 MDN, [overflow-wrap](https://developer.mozilla.org/en-US/docs/Web/CSS/overflow-wrap); Krehel, `better-typography/SKILL.md`; taste v2, `type.md` §7 (via yta-2); Hallmark, grind 51; WCAG 2.2, [1.4.10 Reflow](https://www.w3.org/WAI/WCAG22/Understanding/reflow.html) (320 CSS-px).
- **Aldrig `word-break: break-all` i stycken och rubriker**: det bryter mitt i vanliga ord också där det inte behövs. 📄 MDN, [word-break](https://developer.mozilla.org/en-US/docs/Web/CSS/word-break); ui-ux-pro-max, `ux-guidelines.csv` #111.
- **Knappar, menyval och uppmaningar står på en rad** i 320–1920 px vid normal textstorlek. Bryts en sådan text, korta den först; därefter hålls de ord ihop som hör ihop (telefonnumret efter "Ring"). Vid 200 % text och zoom får etiketten brytas, eftersom WCAG 1.4.4 och 1.4.10 går före. Adresser och vanliga frågor är innehåll, inte etiketter, och får brytas. 📄 Hallmark, grind 49 (en källa – bänken); WCAG 2.2, 1.4.4 och 1.4.10.
- **Hängande skiljetecken.** Ett citattecken som inleder ett citat hängs ut i marginalen, så att textens vänsterkant linjerar med raden under. `hanging-punctuation: first` fungerar bara i Safari; annars ett negativt `text-indent` på cirka 0,4 em på det första stycket. Instruktion *(en källa – bänken)*: varken Butterick eller Bringhurst kunde verifieras som källa ⚠️. 📄 MDN, [hanging-punctuation](https://developer.mozilla.org/en-US/docs/Web/CSS/hanging-punctuation) (bara Safari).
- **Avstavning bara där den hjälper.** `hyphens: manual` med mjuka bindestreck i rubriker, så att ortnamn och personnamn aldrig delas av webbläsaren. `hyphens: auto` kräver `lang="sv"` och prövas i varje webbläsare innan det används i brödtext ⚠️. 📄 MDN, [hyphens](https://developer.mozilla.org/en-US/docs/Web/CSS/hyphens).
- **Text i naturligt skiftläge; versaler sätts med `text-transform`.** 📄 Krehel, *Natural case*.
- **Understrykning:** `text-underline-offset` cirka 0,15–0,2 em och tjocklek `from-font` eller 1 px; `text-decoration-skip-ink` lämnas på. 📄 Krehel, *Underlines from the font*.
- **Understrykningen slutar vid sista bokstaven.** En pil eller ikon efter länktexten står utanför den understrukna texten, och mellanrummet före ikonen är inte understruket. Kontrolleras i utsnitt i 200 %. 🔧 (fynd på övningssajten 2026-10-16: mellanrummet före pilen är understruket); Hallmark, grind 35 (dekor på text kontrolleras visuellt).
- **`text-box: trim-both cap alphabetic`** i knappar och etiketter är en progressiv förbättring, så att texten sitter optiskt mitt i. Källorna är oense om stödet: MDN kallar det Baseline sedan augusti 2026, `web-features` 3.43.0 gör det inte än, så det får aldrig bära layouten. 📄 Krehel; MDN, [text-box](https://developer.mozilla.org/en-US/docs/Web/CSS/text-box).

## Laddning

- **Självhostat, `font-display: swap`, och ett reservtypsnitt med anpassade mått** (`size-adjust`, `ascent-override`, `descent-override`), så att texten inte hoppar när typsnittet laddats. Safari stöder bara `size-adjust` (från 17), så där anpassas bara bredden. 📄 [web.dev, CSS size-adjust](https://web.dev/articles/css-size-adjust); Capsize ([seek-oss/capsize](https://github.com/seek-oss/capsize), MIT); MDN browser-compat-data 8.1.6.
- **Förladda bara brödtextens fil.** För många förladdningar konkurrerar med bilden i första vyn. 📄 Astro, [Fonts](https://docs.astro.build/en/guides/fonts/) (*preload*); web.dev.
- **Astros Fonts API med Fontsource** sköter nedladdning, reservtypsnitt och förladdning på ett ställe. API:t är stabilt sedan Astro 6 och kan läsa de lokala Fontsource-paketen utan nätverk vid bygget. 📄 Astro, [Fonts](https://docs.astro.build/en/guides/fonts/) och [font provider reference](https://docs.astro.build/en/reference/font-provider-reference/). Detaljer → `tokens.md`, *Verktyg*.
- **Utjämningen (`-webkit-font-smoothing`) sätts en gång på roten**, aldrig per komponent. Den påverkar bara macOS och är ett kitval. 📄 Krehel, *Font smoothing on the root*.
- **Inmatningsfält har minst 16 px text på mobil**, annars zoomar iOS Safari sidan. 📄 Krehel, *Inputs at 16px on mobile* (plattformsbeteende utan primärkälla ⚠️).
