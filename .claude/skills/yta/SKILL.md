---
name: yta
description: Tar fram, förnyar och granskar stilkit och ytans detaljer – färg, typografi, avstånd, radier, skuggor, ikoner, bildbehandling och tokens – så att en sajt känns genomarbetad och inte billig eller generisk; använd när ett stilkit ska byggas eller ändras, när en sajt ska få premiumfinish eller ytgranskning, när en komponent ska klädas i kitet, eller när någon frågar om typsnitt, färger, kontrast, knappar, ikoner, skuggor eller foton.
---

# Yta – stilkit och detaljfinish

Lager 5 i guiden: Garretts femte plan, i Atomic Design tokens. Regelboken är `guide/2-5-yta.md`; den här skillen är kunskapen bakom den och säger vad som ska uppnås och vad som är förbjudet. Detaljerna står i delfilerna.

## Syfte

En sajt ska klara måttstockens fråga 3, *håller utförandet* (`mattstock/mattstock.md`), utan att ytan blir det viktigaste. Ytan ska:

- vara ett system: skalor och roller bestämda i förväg, så att varje sektion ser ut att höra till samma sajt
- peka ut handlingen: accenten och tillstånden visar vad man kan göra
- vara läsbar för alla: kontrast, storlek och radlängd enligt normen
- vara ärlig och skarp: riktiga, välbehandlade foton och ikoner som föreställer något
- vara konventionell i formen, med karaktären från kundens eget innehåll.

## När skillen används

- När ett stilkit tas fram, förnyas eller får en provsida (`guide/2-5-yta.md`, *Så tas ett stilkit fram*).
- När en sajts yta granskas eller får ett premiumpass, och när ett ytfynd ska rättas.
- När en avvikelse för en kund ska bedömas eller skrivas i `sites/<namn>/design.md`.
- När en komponent (Astro, React, 21st.dev, shadcn) ska in i biblioteket och klädas i kitets roller.

**Inte** för att välja färger, typsnitt eller avstånd i ett kundbygge: där kommer ytan ur kitet, och byggaren uppfinner inget (`guide/2-5-yta.md`, *Grundregeln*). Text → innehållsskillen och `guide/2-7-innehall.md`. Layout och sektioner → skelettskillen och `guide/2-4-skelett.md`. Längder och kurvor → rörelseskillen och `guide/2-6-rorelse.md`. Domen över en hel sajt → granskaren (`guide/3-2-granskning-och-kalibrering.md`).

## In

- Briefens *ton och intryck*, branschen och rörelsebudgeten (`sites/<namn>/brief.md`).
- Kitets `kit.css` och `design.md` i `bibliotek/stilkit/<kit>/`; sajtens avvikelser i `src/styles/sajt.css` och `sites/<namn>/design.md`.
- Referenserna i måttstocken och deras **beräknade stilar via Playwright**, aldrig en textsammanfattning (`guide/2-5-yta.md`, steg 4). Varje referens mäts i samma fält: bakgrundens L och nyans; accentens värde, nyans och andel av första skärmen; typsnitt per roll ur laddade filer, aldrig gissat ur bilden; vikter; förhållandet rubrik–brödtext; sektionsavstånd; navigation och sidfot; rörelse. Det som inte går att mäta skrivs *okänt*, och en sida som inte går att läsa byts. 📄 Hallmark, `study.md` (en källa – bänken; via delagenten hallmark-b).
- Skärmdumpar i 375 och 1280 px, mobilen först, och utsnitt i 200 % där detaljer ska bedömas.

## Ut

- **Ett kit:** roller som CSS-variabler under `[data-kit="…"]`, en `design.md` och en provsida, och – om Johnny säger ja till förslaget nedan – ett aliaslager med shadcn-namn för Tailwind och React-öar. Bara Johnny godkänner ett kit (→ `guide/2-5-yta.md`).
- **En ytgranskning:** fynd med sida, element, vad, varför (källa), åtgärd med fil och rad, vad det ger besökaren och allvar (hög, medel, låg). Ett fynd mot ett kriterium med en källa får högst `medel` (`guide/bilaga-b-skills.md`). Designomdömet skrivs innan mätvärdena läses, och det som fungerar står med (→ `generiskt.md`, *Så granskas ytan*). Tre ytfynd är alltid höga: brödtext eller kontrolltext under sitt kontrastkrav, ett tillstånd eller en betydelse som bara bärs av färg eller rörelse, och text som klipps eller blir oåtkomlig i 320 px eller vid 200 % text. En kontroll som inte kunde köras skrivs *ej verifierad* och räknas aldrig som godkänd. Varje grundorsak är ett fynd, med alla ställen där den syns. 📄 WCAG 1.4.1, 1.4.3, 1.4.4, 1.4.10; Krehel, *Reporting* i `better-colors`, `better-typography`, `better-ui` (via yta-2).
- **En avvikelse per kund** i `sites/<namn>/design.md`, med token, kitets värde, sajtens värde och skäl.

## Principer

1. **Ytan kommer ur kitet.** En sektion läser bara kitets roller; ett nytt värde blir en roll i kitet först. → `guide/2-5-yta.md`, *Grundregeln*; `tokens.md`.
2. **Systemet före detaljen.** Typskala, avståndsskala, radier per elementklass, skuggnivåer och färgsteg bestäms i förväg, och grannsteg ska gå att se. 📄 Refactoring UI (*Limit your choices*); Bringhurst 3.1.1. → `typografi.md`, `detaljer.md`.
3. **Accenten pekar ut handlingen** och har steg för hover, tryck och en subtil bakgrund. Dekor får textfärgen eller den dämpade färgen. → G3 i `guide/2-5-yta.md`; `farg.md`.
4. **Kontrasten är golvet**, mätt mot den yta texten faktiskt står på: WCAG 2.2 AA. APCA är bara rådgivande. → C45; `farg.md`.
5. **Varje interaktivt element svarar.** Vila, hover, fokus och tryck syns, och tillstånden har mer kontrast än vilan. 📄 Vercel, *Web Interface Guidelines*; WCAG 2.4.7. → `detaljer.md`, *Tillstånd*.
6. **Optiskt före geometriskt.** Linjera det ögat ser – glyfen, citattecknet, ikonens tyngdpunkt – och justera med 1–2 px. 📄 Vercel; Krehel, `better-ui`. → `detaljer.md`.
7. **En familj av allt.** Högst två typsnittsfamiljer, en ikonfamilj med ett streck, en bildbehandling och ett skuggsystem per kit. → `typografi.md`, `detaljer.md`; `guide/2-5-yta.md`.
8. **Bilden är ärlig och skarp.** Riktiga foton av människorna och arbetet, aldrig uppförstorade, med rena kanter och en beskärning som inte kapar det som bär budskapet. → G1 och G6; `guide/2-7-innehall.md`; `detaljer.md`, *Bilder*.
9. **Konvention i formen, karaktär i innehållet.** AI-utseende i sig är inget fynd; generiskt är det som kunde höra till vem som helst. Konventionen spelas med full hantverksnivå, mot förebilder ur måttstocken, och inom en sajt är konsekvens målet. 📄 impeccable 4.6.0 (*standing exit*, ambition efter ytans uppgift); Hallmark, `verbs/redesign.md`. → `generiskt.md`.
10. **Mät, gissa inte.** Värden läses som beräknade stilar och kontrast räknas; en känsla blir ett fynd först när den pekar på ett element och ett kriterium.
11. **En konsekvent konvention är inget fynd, men samma detalj gjord på två sätt är det.** Ett kit utan skuggor eller med raka hörn är ett val; två knappradier, två ikonstreck eller två skuggor för samma sak är ett fynd. 📄 Krehel, `better-ui/SKILL.md`; taste (webb-pro) §4.4 (via yta-2).
12. **Ett ytfynd går aldrig före ett trasigt samspel eller en brist på måttstockens fråga 1.** Ordningen är idén och fråga 1, hierarkin, kompositionen, typografin, bilderna, färgen, detaljerna och sist rörelsen. 📄 Krehel, `better-ui/SKILL.md`; taste v2, `critique.md` §5 (via yta-2); impeccable, `polish.md` (triageordningen).

## Förbud

- Inga färger, typsnitt, storlekar, radier, skuggor eller avstånd som literaler i en sektion eller komponent; bara kitets roller. Undantag: `transparent`, `currentColor` och färger i bilder och SVG. → C48 (N2). Saknar kitet en roll används närmaste befintliga roll, och förslaget om en ny roll skrivs i texten till Johnny, aldrig som ett nytt värde i CSS:en eller i kitet.
- Ingen accent på dekor, som stegsiffror, listmarkörer, ikoner i cirklar, överrader och citatlinjer. → G3.
- Ingen `font-weight` som kitet inte laddar en fil för, och inga typsnitt från tredje part vid sidladdning. → `typografi.md`.
- Ingen text i bild (WCAG 1.4.5), ingen bild förstorad mer än cirka 1,4 gånger (G1), inget foto som kapas mitt i personen eller föremålet (G6).
- Ingen dom över ytan för att den ser AI-gjord ut, och inget globalt förbud mot Inter, Lucide eller något annat; kitet väljer. → `BESLUT.md` 2026-10-15; `generiskt.md`.
- Inga stilskills (taste, frontend-design, impeccable, hallmark m.fl.) i kundbygget, och inte installerade: de är destillerade här och används bara som perspektiv när kit tas fram, en stil per agent. → `guide/2-5-yta.md`, N2; `kallor.md`.
- Ingen komponent från 21st.dev, Aceternity, React Bits eller shadcn direkt i en kundsajt: den går in i biblioteket med licens per komponent och kläs om till kitets roller. → `guide/2-5-yta.md`, licenstabellen; `tokens.md`.
- Ingen gradienttext, ingen glöd eller glaseffekt som dekor, inga emoji som ikoner, inga blandade ikonfamiljer, inget kort i kort. → `generiskt.md`.
- Inget imiterat material i CSS (fasning, prägling, metall, krita) och ingen geometrisk mask som ersätter ett fotomotivs kontur. → `generiskt.md`.
- Ingen övergång på fokusringen, och ingen versalrubrik med radhöjd under 1,0. → `detaljer.md`, `typografi.md`.
- Ingen färgmotor, inget tokenverktyg och ingen APCA-kod skeppas till sajten; bara CSS, typsnittsfiler och SVG.
- Inga påhittade siffror, omdömen eller logotyper, och inga stock- eller AI-bilder som visas som kundens egna. → `guide/2-7-innehall.md`.
- Andra företags texter, bilder, logotyper och kännetecken kopieras inte; layout, palett och typsnitt får tas fritt. ⚖️ Claudes anmärkning i `BESLUT.md` 2026-10-16, *Referensregeln och kodregeln strukna* (tolkning, inte juridisk rådgivning).

## Kontrollista mot en sajt

Kör i 375 och 1280 px med Playwright, med beräknade stilar och utsnitt i 200 %; vågrät scroll och radbrytning också i 320, 414, 768 och 1920 px. Skriv designomdömet först, läs mätvärdena sedan. *M* = mäts eller söks, *Ö* = kräver omdöme.

| # | Kontroll | Hur | Källa |
|---|---|---|---|
| 1 | Varje text- och bakgrundspar klarar 4,5:1 (stor text 3:1), mätt mot den yta texten står på, också platshållar- och hjälptext | M: axe plus egen beräkning av kitets par | C45, C8; WCAG 1.4.3; `farg.md` |
| 2 | Fokusringen syns och klarar 3:1 mot varje yta den korsar, också på mörka sektioner och bilder | M: tabba igenom sidan | WCAG 2.4.7, 1.4.11 |
| 3 | Knappar och länkar har synlig hover och tryck, inte bara fokus | M: jämför beräknade stilar i vila, hover och `:active` | Vercel; `detaljer.md` |
| 4 | Accenten finns bara på handlingar och tillstånd | M: lista element med accentfärg | G3 |
| 5 | Accenten har steg för hover och tryck i kitet, inga uträknade färger i komponenter | M: sök i kit och sektioner | `farg.md` |
| 6 | Alla storlekar kommer ur kitets skala, och grannsteg skiljer minst cirka 10 % | M: räkna unika `font-size` | `typografi.md` |
| 7 | Rubrikernas radhöjd 1,05–1,3, brödtextens 1,45–1,6; spärrning efter storlek | M | `typografi.md` |
| 8 | Brödtext 45–75 tecken per rad | M: `max-width` i tecken | Bringhurst, Butterick |
| 9 | Varje vikt som används finns som fil; ingen syntetisk fetstil | M: jämför `font-weight` med laddade typsnitt | Krehel; CSS Fonts 4 |
| 10 | Tabulära siffror i tider, priser och tabeller | M | Vercel, Krehel |
| 11 | Inget som hör ihop bryts isär: telefonnummer, tal och enhet, ikon och sista ord | Ö: läs i 375 px | `typografi.md`; `guide/2-7-innehall.md` |
| 12 | Citat som börjar med citattecken har hängande skiljetecken | Ö | MDN; instruktion (en källa – bänken) |
| 13 | Ytor som ska läsas som kort syns mot ytan under (kant, skugga eller tydlig tonskillnad) | M: kontrast mellan ytorna; Ö | Refactoring UI, Vercel |
| 14 | Radier ur kitet per elementklass, koncentriska när de är nästlade | M | Krehel, Vercel |
| 15 | Skuggor ur kitet, minst två lager, tonade eller neutrala enligt kitet | M | Vercel, Krehel |
| 16 | En ikonfamilj, samma streck, ikoner som föreställer tjänsten och känns igen utan etikett | M, Ö (blickprovet) | G2; NN/g |
| 17 | Glyfer, ikoner och citattecken linjerar optiskt med texten | Ö: utsnitt i 200 % | Vercel, Krehel |
| 18 | Foton är skarpa (G1), har rena kanter, en behandling och en beskärning som inte kapar | Ö: utsnitt i 200 % mot ljus och mörk yta | G1, G6; `detaljer.md` |
| 19 | Webbläsarens egna ytor följer kitet: markering, textmarkör i fält, understrykning (som slutar vid sista bokstaven), fokus | M; Ö: utsnitt i 200 % | impeccable, Hallmark |
| 20 | Inga värden utanför kitet i sektioner och sajtens CSS | M: sök literaler | C48 |
| 21 | Specificitetstestet: kunde sektionen höra till en annan verksamhet? | Ö | `generiskt.md`; måttstockens fråga 2 |
| 22 | Ingen vågrät scroll och ingen klippt text i 320–1920 px och vid 200 % text, och ingen brödtext närmare kanten än 16 px (12 px upp till 480 px) | M: Playwright i flera bredder, 1 px under och över varje brytpunkt i biblioteket, och med större grundstorlek | WCAG 1.4.4, 1.4.10; impeccable; Hallmark; Krehel; ui-ux-pro-max (brytpunkterna, en källa) |
| 23 | Knappar, menyval och uppmaningar står på en rad i 320–1920 px vid normal textstorlek (vid 200 % får de brytas) | M: räkna rader i textens rektanglar (ikoner räknas inte) | Hallmark, grind 49; WCAG 1.4.4; `typografi.md` |
| 24 | Displaystorlek högst cirka 5,5–6 rem, h1 över cirka 50 tecken ett steg ned, versalrubriker radhöjd minst 1,0 | M | impeccable, Hallmark; `typografi.md` |
| 25 | Kisa-testet: med sidan suddad syns primärt, sekundärt och grupperna i ordning | Ö: skärmbild med `filter: blur(6–8px)` | impeccable, `layout.md` |
| 26 | Hierarkin håller i gråskala och med simulerad rödgrön färgblindhet | Ö: Chromes emulering av synavvikelser | WCAG 1.4.1; impeccable, Hallmark; `farg.md` |
| 27 | Varje nåbart tillstånd prövas: öppet och stängt, hover, fokus, tryck, fel, tomt, överlång text – utan överlapp och klippning; fokusringen tonar inte in | M, Ö | impeccable 4.6.0; Hallmark; `detaljer.md` |
| 28 | Sidan är inte bara kortnät efter varandra, och sektionerna har inte alla samma avstånd | Ö | impeccable, Hallmark; `generiskt.md` |
| 29 | Accentens andel av första skärmen rapporteras (inget fynd så länge den bara ligger på handlingar) | M: pixlar nära accenten i skärmbilden | Hallmark; G3; `farg.md` |

## Delfiler

- `farg.md` – färgstrategi, roller, accentens steg, rampen, neutraler, mätning (också i gråskala och färgblindhet), mörka sektioner, format.
- `typografi.md` – skala, radhöjd, spärrning, radlängd, vikter, siffror, radbrytning, laddning.
- `detaljer.md` – ytor, radier, skuggor och kanter, tillstånd, optisk linjering, ikoner, bilder, avstånd.
- `tokens.md` – nivåerna, `--k-*` och shadcn-namnen, Tailwind 4 `@theme inline`, kitets axlar, DTCG och Terrazzo, verktygen.
- `generiskt.md` – AI-mönstren som hantverkskriterier, det som skiljer premium från generiskt där originalen är eniga, specificitetstestet och hur ytan granskas med originalens metod.
- `stilriktningar.md` – vad som gör ett kit till en riktning, hur briefen blir lägen, signaturgreppet, det som fyller platsen när dekoren är borta, riktningsmotorer för nya kit och frågor till en provsida (ur taste-familjen).
- `apple-hig.md` – Apples Human Interface Guidelines översatta till en sajt i Safari på iPhone: pt mot CSS-px, färg, typografi, material och genomskinlighet, ikoner, bilder, mörkt läge, varumärket, licenserna och det som bara gäller appar.
- `tailwind.md` – Tailwind 4 med kitets tokens via `@theme inline`, vår CSS i kaskadlager, CVA och tailwind-merge, linting och hur block från shadcn och 21st anpassas (ur `kunskap/research/2026-10-16_tailwind-och-motion-i-astro.md`).
- `kallor.md` – källor och licenser.

## Förslag till Johnny

Förslag, inte regler, tills Johnny sagt ja:

- **Accentens steg i alla kit:** `--k-accent-hover`, `--k-accent-tryck` och `--k-accent-subtil`, så att knappar får hover och tryck utan att komponenterna räknar fram färger. Källorna är eniga (Vercel, Radix, Krehel), men det ändrar kiten.
- **Ett aliaslager med shadcn-namn i varje kit**, så att React-öar och komponenter från 21st.dev och shadcn ärver kitet efter beslutet att tillåta React och Tailwind. Obs: shadcn:s `--accent` är en hoveryta, inte varumärket, så Nortropics accent mappas till `--primary`.
- **Skuggor som tokens i kiten** (`--k-skugga-1`, `--k-skugga-2`), i dag literaler med ett lager på fem ställen (Kontaktlist, Samtycke, `rorelse-mattlig.css` två gånger, Varms `.markering`).
- **Djärvs tillståndsfärger** underkänns i dag: tryck ger 3,66:1 och hover 4,54:1 med bläcktexten, eftersom `bas.css` blandar mot `--k-text` (`farg.md`, *Accentens steg*). Accentens steg i kiten löser det.
- **Typskalan per kit som en Utopia-skala** med färre steg, i stället för dagens närliggande storlekar.
- **Typsnitt med reserverat namn** (IBM Plex, Source Serif) tas från upphovsägarens egna filer i stället för Fontsources delmängder, tills Johnny avgjort frågan (⚖️ tolkning av OFL-FAQ 2.6–2.8, inte juridisk rådgivning; `typografi.md`).
- **Källorna mot besluten:** frontend-design, impeccable och taste kallar gräddvit med terrakotta (Lugn, Varm) och överrader för AI-typiska, och flera förbjuder Inter och Lucide. Besluten 2026-10-15 går före; listorna används bara som hantverkskriterier (`generiskt.md`).
- **Färgstrategin som kitaxel** (återhållsam, engagerad, full palett, genomfärgad) i varje kits `design.md`, med G3 som gräns (`farg.md`).
- **Djärvs rubriker:** versaler med radhöjd 0,95 bryter regeln om minst 1,0, och spärrningen −0,005 em bryter C53 (versaler 5–12 %). Ändra kitet eller ge versalrubriker ett undantag.
- **Kitens `design.md` får fler fält:** vad kitet *inte* passar för, kännetecknen som skiljer det från de andra kiten (bakgrundens ljushet, rubrikstil, accentnyans), färgstrategin, knapprösten (primär och sekundär), sektionsövergången (luft, hårlinje eller färgskifte) och vad rörelsen gör med `reduce`. Lugn och Djärv ligger i dag på nästan samma accentnyans (44° och 39° i OKLCH). 📄 Hallmark, temafilerna, `design-md.md` och `structure.md` (en källa – bänken).
- **Struktur per kit:** kiten skiljer sig bara i ytan, och alla tre har samma förstavy och samma kortnät. Ska ett kit också få en egen förstavariant ur biblioteket (→ skelettskillen), eller står konventionsbeslutet som det är?
