# Typografi

Delfil till `SKILL.md`. Typsnitt, skala, radhöjd, spärrning, radlängd, siffror, radbrytning och laddning. Svensk mikrotypografi (citattecken, tankstreck, siffergrupper, decimalkomma, klockslag) står i `guide/2-7-innehall.md` och skrivs inte om här.

## Redan beslutat (→ guiden)

- Typsnitt ur en kuraterad OFL-lista, självhostade; `latin` räcker för svenska, `latin-ext` behövs för samiska namn; subsetta inte efter använda tecken (→ `guide/2-5-yta.md`, N2).
- Flytande typskala enligt Utopia, med största värdet högst 2,5 × det minsta per steg (→ `guide/2-5-yta.md`, N2; WCAG 1.4.4).
- Versaler bara där kitet anger det, då med 5–12 % spärrning (→ `guide/2-5-yta.md`, C53).
- Inter är varken standard eller förbjuden; varje kit väljer (`BESLUT.md` 2026-10-15).

## Skalan

- **En skala per kit, och inga storlekar utanför den.** Skalan har 6–8 steg, från bildtext till display, och varje storlek i en sektion är ett steg ur kitet. Varför: varje extra storlek späder ut hierarkin. 📄 Bringhurst, *The Elements of Typographic Style* 3.1.1 (*Don't compose without a scale*); Refactoring UI, *Establish a type scale* (med egna ord); Krehel, `better-typography/SKILL.md` (MIT); → C48 i `guide/bilaga-c-kontroller.md` (N2).
- **Grannsteg ska gå att se.** Steg som skiljer sig mindre än cirka 10 % (till exempel 15,2 och 16 px) ger ingen hierarki, bara brus. En modulär kvot på 1,125–1,333 ger synliga steg. 📄 Utopia, [type calculator](https://utopia.fyi/type/calculator/); tröskeln är härledd ⚠️.
- **Storlek, radhöjd och vikt sätts som ett par per roll**, så att en roll är ett beslut och inte tre. 📄 Krehel, `better-typography/SKILL.md`, *Use a type scale*.
- **Rubriknivåerna går nedåt i storlek**, och en rubrik är aldrig mindre än brödtexten utom en medveten överrad. 📄 Krehel, `SKILL.md`, *Heading sizes descend with level*.
- **Storlekar i `rem`**, så att besökarens inställning gäller. Brödtext börjar på 16 px, gränssnittstext på 14 px och bildtext på 13 px; sällan under 12 px. 📄 Krehel, *Size floors*; Butterick, [Summary of key rules](https://practicaltypography.com/summary-of-key-rules.html) (brödtext 15–25 px på webben).

## Radhöjd

- **Enhetslös radhöjd per roll:** display cirka 1,05–1,1, rubriker 1,15–1,3, brödtext 1,45–1,6. Allt som bryts till tre rader eller fler får minst 1,4. 📄 Krehel, *Line-height by role*; Butterick (120–145 % av punktstorleken).
- **Kortare rader tål tätare radhöjd, längre rader behöver glesare.** Ett luftigt kit får sin luft ur avstånden mellan block, inte ur glesa rader. 📄 Refactoring UI, *Line-height is proportional* (med egna ord); Butterick.
- **Ingen fast höjd på textbehållare.** Texten ska tåla radhöjd 1,5, 2 × styckeavstånd, 0,12 em spärrning och 0,16 em ordavstånd utan att klippas. 📄 WCAG 2.2, [1.4.12 Text Spacing](https://www.w3.org/WAI/WCAG22/Understanding/text-spacing.html).

## Spärrning

- **Spärrningen följer storleken** (versaler och långa sifferrader spärras alltid, Bringhurst 2.1.6): rubriker från cirka 24 px −0,01 till −0,02 em (större rubrik, mer negativ), brödtext 0, versaletiketter +0,05–0,12 em. Alltid i `em`. 📄 Krehel, *Letter-spacing by size*; Butterick (versaler 5–12 %); Apples typografi via Emil Kowalski, `apple-design` (MIT; Apple-föredraget inte läst i original ⚠️).
- **Kerning är alltid på.** `font-kerning: none` är aldrig en lösning. 📄 Butterick; Krehel.

## Radlängd

- **Brödtext 45–75 tecken per rad**, helst runt 66. Rubriker får vara bredare. 📄 Bringhurst 2.1.2; Butterick (45–90); Krehel (60–75).

## Vikter och typsnitt

- **Högst två familjer per kit**, plus möjligen en accentstil för ett fåtal ord (som en handskriven markering). Tre eller fler typsnitt brukar fälla en sajt hos granskaren. Para för kontrast: serif mot sans, inte två nästan lika sans. 📄 Krehel, *Fewer fonts*; `mallar/granskning.md` (*Brukar fälla*).
- **Ladda varje vikt som används.** En `font-weight` utan matchande fil gör att webbläsaren syntetiserar eller faller tillbaka till närmaste vikt, och betoningen försvinner eller blir förvrängd. Kitet anger vilka vikter som finns, och sektionerna använder bara dem. 📄 Krehel, *Load the faces the design uses*; [CSS Fonts 4, font matching](https://www.w3.org/TR/css-fonts-4/#font-matching-algorithm).
- **Under 18 px vikt minst 400.** Tunna vikter (100–300) först från cirka 28 px. 📄 Krehel, *Fewer fonts*; Apple HIG, *Typography* (*avoid light font weights*).
- **Egenskaper före taggar:** `font-weight: 650` hellre än `font-variation-settings`, `font-variant-numeric` hellre än `font-feature-settings`. `font-optical-sizing` lämnas på `auto`. 📄 Krehel, `variable-fonts-and-opentype.md`; MDN, [font-variant-numeric](https://developer.mozilla.org/en-US/docs/Web/CSS/font-variant-numeric).
- **Reserverade typsnittsnamn (RFN) läses i upphovsägarens OFL-fil, inte i Fontsources.** IBM Plex reserverar *Plex* och Source Serif *Source* (det står i själva Fontsource-filen, fast paketets `LICENSE` säger annat); Inter, Fraunces, Familjen Grotesk, Atkinson Hyperlegible Next och Instrument Sans har inga. En delmängd räknas som ändring, och Fontsource-filerna är inte funktionellt likvärdiga med originalen, så ett typsnitt med RFN tas från upphovsägarens egna filer eller väntar på Johnnys beslut (OFL-FAQ 2.6–2.8; ⚖️ tolkning, inte juridisk rådgivning). IBM:s npm-paket kör telemetri vid installation; stäng av med `IBM_TELEMETRY_DISABLED=true`. 📄 [OFL-FAQ](https://openfontlicense.org/ofl-faq/); källkortet *Kuraterade OFL-typsnitt*.
- **Variabel fil när kitet använder flera vikter**, statiska filer när det bara behövs en eller två. 📄 Fontsource, [variable fonts](https://fontsource.org/docs/getting-started/variable).
- **Typsnittet täcker svenska och, vid behov, nordsamiska.** Kontrolleras en gång per typsnitt när det tas in i ett kit (Hyperglot). 📄 `kunskap/research/2026-10-15_kompetensluckor-anteckningar/lager-5-yta.md` §3.

## Siffror

- **Tabulära siffror där siffror står i kolumn eller jämförs:** öppettider, prislistor och tabeller. Proportionella siffror i löptext. 📄 Krehel, *Tabular numbers on changing values*; Vercel, [Web Interface Guidelines](https://vercel.com/design/guidelines) (MIT).
- **Kontrollera siffrorna per typsnitt.** I Fontsource-filerna saknar Fraunces och IBM Plex Sans tabulära siffror (`tnum`), och inget av sju kontrollerade typsnitt har gemena siffror (`onum`) eller kapitäler (`smcp`), eftersom Google Fonts-byggena tar bort funktioner. Bringhursts regel – gemena siffror i löptext, versalsiffror med versaler – går alltså sällan att följa med Fontsource; tabulära siffror måste finnas i kitets typsnitt. 📄 Bringhurst 3.2.1 (via webtypography.net ⚠️); Fontsource, ärende [#39](https://github.com/fontsource/fontsource/issues/39); egen läsning av GSUB 2026-10-16.

## Radbrytning och tecken

- **`text-wrap: balance` på rubriker och korta texter, `pretty` på stycken.** `balance` på stycken är fel (Chromium ignorerar det efter sex rader). 📄 Krehel, *Wrap deliberately*; MDN, [text-wrap](https://developer.mozilla.org/en-US/docs/Web/CSS/text-wrap).
- **Det som hör ihop bryts inte isär:** telefonnummer, tal och enhet, och en ikon med sitt sista ord (pilen efter en länktext). Använd vanligt hårt mellanslag (U+00A0): smalt hårt mellanslag (U+202F) och hårt bindestreck (U+2011) saknas i alla sju kontrollerade typsnitt. 📄 Vercel (*non-breaking space … to keep units … together*); ISOF, *Snabba skrivregler* (fast mellanslag vid behov); → `guide/2-7-innehall.md` för svenska exempel.
- **Hängande skiljetecken.** Ett citattecken som inleder ett citat hängs ut i marginalen, så att textens vänsterkant linjerar med raden under. `hanging-punctuation: first` fungerar bara i Safari; annars ett negativt `text-indent` på cirka 0,4 em på det första stycket. Instruktion *(en källa – bänken)*: varken Butterick eller Bringhurst kunde verifieras som källa ⚠️. 📄 MDN, [hanging-punctuation](https://developer.mozilla.org/en-US/docs/Web/CSS/hanging-punctuation) (bara Safari).
- **Avstavning bara där den hjälper.** `hyphens: manual` med mjuka bindestreck i rubriker, så att ortnamn och personnamn aldrig delas av webbläsaren. `hyphens: auto` kräver `lang="sv"` och prövas i varje webbläsare innan det används i brödtext ⚠️. 📄 MDN, [hyphens](https://developer.mozilla.org/en-US/docs/Web/CSS/hyphens).
- **Text i naturligt skiftläge; versaler sätts med `text-transform`.** 📄 Krehel, *Natural case*.
- **Understrykning:** `text-underline-offset` cirka 0,15–0,2 em och tjocklek `from-font` eller 1 px; `text-decoration-skip-ink` lämnas på. 📄 Krehel, *Underlines from the font*.
- **`text-box: trim-both cap alphabetic`** i knappar och etiketter är en progressiv förbättring, så att texten sitter optiskt mitt i. Källorna är oense om stödet: MDN kallar det Baseline sedan augusti 2026, `web-features` 3.43.0 gör det inte än, så det får aldrig bära layouten. 📄 Krehel; MDN, [text-box](https://developer.mozilla.org/en-US/docs/Web/CSS/text-box).

## Laddning

- **Självhostat, `font-display: swap`, och ett reservtypsnitt med anpassade mått** (`size-adjust`, `ascent-override`, `descent-override`), så att texten inte hoppar när typsnittet laddats. Safari stöder bara `size-adjust` (från 17), så där anpassas bara bredden. 📄 [web.dev, CSS size-adjust](https://web.dev/articles/css-size-adjust); Capsize ([seek-oss/capsize](https://github.com/seek-oss/capsize), MIT); MDN browser-compat-data 8.1.6.
- **Förladda bara brödtextens fil.** För många förladdningar konkurrerar med bilden i första vyn. 📄 Astro, [Fonts](https://docs.astro.build/en/guides/fonts/) (*preload*); web.dev.
- **Astros Fonts API med Fontsource** sköter nedladdning, reservtypsnitt och förladdning på ett ställe. API:t är stabilt sedan Astro 6 och kan läsa de lokala Fontsource-paketen utan nätverk vid bygget. 📄 Astro, [Fonts](https://docs.astro.build/en/guides/fonts/) och [font provider reference](https://docs.astro.build/en/reference/font-provider-reference/). Detaljer → `tokens.md`, *Verktyg*.
- **Utjämningen (`-webkit-font-smoothing`) sätts en gång på roten**, aldrig per komponent. Den påverkar bara macOS och är ett kitval. 📄 Krehel, *Font smoothing on the root*.
- **Inmatningsfält har minst 16 px text på mobil**, annars zoomar iOS Safari sidan. 📄 Krehel, *Inputs at 16px on mobile* (plattformsbeteende utan primärkälla ⚠️).
