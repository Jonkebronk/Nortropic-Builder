# 2.4 Skelett

**Status:** konsoliderad v1.0, 2026-10-15; ommärkt samma dag efter granskningen (fem N1-punkter). Genomgånget med Johnny 2026-10-13 (`historik/karta/4-skelett.md`). Lagret är nytt i guiden; v0.74 hade bara wireframes (fas 2). **Genomläst med Johnny 2026-10-15**; rättelserna står i `BESLUT.md`.

Garretts skelettplan bestämmer vilka delar varje sida har, var de står och vad ögat ser först. Lagret byggs enligt Brad Frosts *Atomic Design*, som Frost själv kallar en tankemodell, inte en linjär process 📄 ([kap. 2](https://atomicdesign.bradfrost.com/chapter-2/)):

| Atomic Design | Hos oss | Var |
|---|---|---|
| Tokens | Färg, typsnitt, avstånd och radier ur stilkitet | `2-5-yta.md` |
| Atomer och molekyler | Knapp, länk, fält, kort, ikon | biblioteket, `src/komponenter/` |
| Organismer | Sektionerna: en variant var i första sajten, 2–3 varianter från sajt 2 | biblioteket, `src/sektioner/` |
| Mallar | Sidtyperna i standardsajten (`2-3-struktur.md`) | biblioteket, `src/mallar/` |
| Sidor | Kundens sajt: mall, sektioner, innehåll och stilkit | kundsajtens repo |

## Vad byrån gör

- [N1] **I kundbygget väljer AI:n ur biblioteket – sektion, variant och innehåll – och uppfinner ingen layout. Saknas en sektion byggs den i biblioteket först, med Johnnys godkännande, och används sedan.** De etablerade AI-byggarna gör så: AI:n väljer inom ett system som designers har byggt. 📄 [Wix ADI](https://www.fastcompany.com/3060934/can-you-teach-ai-to-design-wix-is-trying), [Squarespace Blueprint](https://ecomm.design/using-squarespace-blueprint-ai/), [GoDaddys Go-tema](https://github.com/godaddy-wordpress/go) (`guide/README.md`, *Principer*, källorna). Biblioteket ger konsekvens, inte karaktär: en sajt kan följa alla regler och ändå se AI-genererad ut (fallgrop 85, 🎥 *Astryx-videon*). Karaktären kommer från stilkitet (`2-5-yta.md`) och från kundens egna bilder, ord och lokala belägg (`2-7-innehall.md`).

Biblioteket byggs av Johnny och Claude med full designkompetens, och där läggs Johnnys smak in (kartan). Besluten: "iteratar tills vi har ett eget bibliotek som är världsklass" (`BESLUT.md` 2026-10-13 18:52) och "Stitch inom stilkit" – eget sektionsbibliotek och 3–5 stilkit; Stitch och andra verktyg används när stilkiten tas fram, inte vid varje kundbygge (2026-10-15).

### Biblioteket i första sajten

- [N1] **Biblioteket består av egna marknadsföringssektioner, inte av ett UI-komponentbibliotek för appar. I första sajten har det bara de sektioner som startsidan och standardsidorna använder, en variant var.** Bibliotek för funktionellt gränssnitt drar en marknadsföringssajt mot sitt eget generiska utseende (fallgrop 96) *(en källa – bänken: 🎥 designskills-videon 2 och Astryx-videon, samma kanal)*. Det som är lika i varje bygge görs en gång; annars genereras samma kod på nytt i varje bygge, dyrt och olika varje gång (fallgrop 143, 🎥 *skill-ingenjörsvideon*, Nate Herk, som återger Anthropic i andra hand). Startsidans sektioner byggs i `5-byggplan.md`, steg 2, och övriga sidors i steg 3. Johnny ser sektionerna på en provsida i 375 och 1280 px; i första sajten är provsidan startsidan i de tre kiten.

### Sektionerna

Varje sektion besvarar en fråga besökaren har. Listan är kartans utkast (inte beslutat), kompletterad med webb-pros komponenter. En sektion som sajtens sidor inte använder byggs inte.

| Sektion | Besökarens fråga | Anmärkning |
|---|---|---|
| Sidhuvud | Vem är ni, hur når jag er? | Namn, meny och branschens kontaktväg med `tel:`-länk, fast i toppen på mobilen (`2-3-struktur.md`) |
| Första vyn | Vad gör ni, var och för vem, och vad gör jag nu? | Rubrik med tjänst och ort, branschens kontaktväg och klickbart telefonnummer på mobilens första skärm (regeln nedan) |
| Det praktiska | När har ni öppet, var finns ni, vad kostar det? | Öppettider, adress eller område, telefon och priser i korthet ur faktabasen; branschprofilen avgör vad som visas (regeln nedan) |
| Tjänster | Kan ni hjälpa mig med det här? | Ett kort per tjänst med länk till tjänstesidan |
| Text och bild | Vilka är ni? Vad ingår? | Om oss, vad en tjänst omfattar, längre text |
| Förtroende | Kan jag lita på er? | Omdömen med källa, F-skatt, försäkring, certifikat, ROT och RUT – bara det som är belagt (`2-7`) |
| Utfört arbete | Har ni gjort sådant förut? | Bara med egna bilder (`2-7`) |
| Så går det till | Vad händer om jag hör av mig? | Stegen i ordning |
| Serviceområde | Kommer ni hit? | Finns inte i något granskat bibliotek och designas från grunden: orterna som text, valfri statisk karta, samma orter som `areaServed` (`2-8`) |
| Vanliga frågor | Vad kostar det, hur lång tid tar det? | `<details name>`; svaren finns i HTML:en |
| Kontakt | Hur ber jag om offert, och när svarar ni? | Kontaktvägar, tider och förfrågan; formuläret → `2-8` |
| Hitta hit | Var ligger ni? | Bara vid besöksadress: adressen som text och en länk till vägbeskrivning; inbäddad karta kräver samtycke (`2-8`) |
| Nästa steg | Vad gör jag nu? | Avslutar varje sida med den primära handlingen |
| Sidfot | Var hittar jag uppgifterna? | Innehållet → `2-3` |

De tre riktningarna i `5-byggplan.md`, steg 2, visar startsidan i tre stilkit med samma sektioner och samma innehåll (`BESLUT.md` 2026-10-15). Riktningarna och kiten → `2-5-yta.md`.

- [N1] **Mobilens första skärm svarar på vad, var och hur – utan att besökaren scrollar, i 375 px.** Rubriken säger tjänst och ort och är aldrig *"Välkommen till …"*. Branschens kontaktväg syns som knapp: ring och offert för hantverk, boka för klinik och skönhet, meny, beställ och hitta hit för restaurang och café. Telefonnumret går att klicka på. Det här är fråga 1 i Johnnys måttstock och det som oftast avgjorde hans domar; förebilderna är Jursla Rör, Plomberie 5 Étoiles, Citykiropraktikern och We Care Car Care. Direkt efter första vyn följer **Det praktiska**: öppettider, adress eller område, telefon och priser i korthet ur faktabasen; branschprofilen avgör vad som visas (meny med priser för restaurang, område och jour för hantverk; `2-2-omfattning.md`). Johnny berömde *"öppettider, priser, telefon och adress som kort direkt under"* (Citykiropraktikern) och saknade det hos flera: *"Jag ser varken adress, öppettider eller telefon på startsidan [...] det hade jag velat ha"* (Lamanna's). Instruktion och granskningskriterium – Johnnys måttstock, ingen norm (`BESLUT.md` 2026-10-15); prövas i blickprovet under *Kontroll*. 📄 `mattstock/mattstock.md`

- [N2] **Två till tre varianter per sektion** (kartan), till exempel delad (text och bild) och helbild för första vyn, och **tillval per bransch:** bokning, prislista, öppettider, jour, meny för restauranger, betallänk, nyhetsbrev, språkväxlare och brödsmulor. Funktionerna → `2-2-omfattning.md`.
- **Branschprofilen** – kontaktväg, sektioner, tillval och förebilder per bransch – bor i `2-2-omfattning.md`, *Två spår*.
- [N2] **Kitet får ange vilka layoutvarianter det föredrar,** så att riktningarna skiljer sig i mer än färg och typsnitt. 🔧 förslag

### Hur sektionerna byggs

- [N1] **En sektion är en Astro-komponent med typade props och en `variant`-prop, utan eget innehåll och utan egna värden.** Ingen text, inga kunduppgifter och inga bilder ligger i komponenten, och den använder bara tokens ur stilkitet – inga hårdkodade färger, typsnitt, avstånd eller radier. Då kan samma innehåll visas i tre kit, och en omdesign blir ett byte av kit eller variant utan att innehållet rörs. 📄 *Websites for Normal People*. Utan tokens faller modellen tillbaka på sina egna val (fallgrop 18, → `2-5-yta.md`). Texterna och innehållsfilerna → `2-7-innehall.md`.
- [N1] **HTML först: innehåll och navigation fungerar utan JavaScript,** och skript förbättrar bara. "The JavaScript layer is not fault-tolerant." 📄 [GOV.UK, progressive enhancement](https://www.gov.uk/service-manual/technology/using-progressive-enhancement) *(en källa – bänken)*. Kontrollen → `2-8-teknik-och-kvalitet.md`. Rörelse som börjar osynlig (`opacity: 0`) får inte dölja innehåll utan JavaScript → `2-6-rorelse.md`. Primitiverna:

| Behov | Primitiv | Källa |
|---|---|---|
| Vanliga frågor, utfällbart | `<details name>` (Baseline; `name` i alla stora webbläsare sedan 2024). Dölj aldrig det de flesta behöver. | [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/details), [GOV.UK Details](https://design-system.service.gov.uk/components/details/) |
| Mobilmeny | Synliga länkar vid högst fyra (`2-3`); annars disclosure med `<details>` eller `popover`, aldrig ARIA-rollen `menu`. `aria-current="page"`; Escape stänger och lämnar fokus på knappen. | [W3C APG](https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/examples/disclosure-navigation/) |
| Bild i större format | Länk till bilden; från N2 `<dialog>` med Invoker Commands som förbättring | [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Invoker_Commands_API) |
| Formulär | Vanliga fält med `<label>`, validering på servern | [GOV.UK Validation](https://design-system.service.gov.uk/patterns/validation/), → `2-8` |
| Komplex widget, till exempel bokningskalender | Från N3 en isolerad ö med Zag | [Zag](https://github.com/chakra-ui/zag) |

- [N2] **Layouten byggs med ett fåtal layoutprimitiver** (stapel, kluster, sidopanel, växel, rutnät, täckyta, ram) i stället för brytpunkter och magiska tal. 📄 [Every Layout](https://every-layout.dev/) (destilleras; boken kostar 69 USD). Flytande typ- och avståndsskalor → `2-5`.
- [N1] **Mobilen först.** Varje sektion designas och prövas i mobilbredd före dator, redan i första sajten, och mobilen får ett eget innehållsurval där det behövs i stället för en hopklämd datorversion (fallgrop 3, 19). Johnny fällde tre sajter i måttstocken enbart på mobilutförandet: *"Det är Nortropics ansvar att layouten håller på mobilen."* 📄 Wroblewski, *Mobile First* ([A Book Apart](https://abookapart.com/products/mobile-first)); `mattstock/mattstock.md` (`BESLUT.md` 2026-10-15). N1-kontroll 3 i `2-8` fångar det värsta automatiskt; resten bedöms i måttstockens fråga 3.
- [N2] **Varje sektion har en `h2` och `aria-labelledby`; mallen sätter sidans enda `h1`, landmärkena och länken Hoppa till innehållet.** WCAG 2.4.1 ingår i golvet från första sajten (`2-8`, *Kodstandard*). Kontrollen av rubriker → `2-8`.
- [N2] **Bilder har bredd och höjd,** så att layouten inte hoppar när sidan laddar. Mätningen (CLS) → `2-8`.

### Var biblioteket bor

Förslag 🔧; hela projektstrukturen → `bilaga-f-projektstruktur.md`.

```
bibliotek/               eget Astro-projekt i det här repot
  src/komponenter/       atomer och molekyler: Knapp, Lank, Falt, Kort, Ikon
  src/layout/            layoutprimitiverna (från sajt 2)
  src/sektioner/         en fil per sektion: Sidhuvud, Forstavy, Tjanster, TextBild,
                         Fortroende, Utfort, Process, Omrade, Fragor, Kontakt,
                         HittaHit, Praktiskt, NastaSteg, Sidfot – bara de som används
  src/mallar/            sidtyperna: Start, Tjanst, Tjanster, OmOss, Kontakt,
                         Saknas (404); Integritet och Tack bara med formulär
  src/pages/prov/        provsidan (gallerivyn från sajt 2)
  stilkit/               stilkiten (2-5-yta.md); wireframe-kitet från sajt 2
```

- [N2] **Kundsajten får en kopia av biblioteket,** och bibliotekets version (commit) skrivs i sajtens tillståndsfil (`3-1-orkestrering-och-roller.md`). En ändring i biblioteket rör alltså ingen publicerad sajt av sig själv. 🔧
- [N3] **Biblioteksuppdateringar når kundsajterna som förvaltningsändringar,** med samma kontroller som andra ändringar (`2-9-drift-och-forvaltning.md`).
- [N4] **Biblioteket blir ett versionerat paket eller plugin** → `3-4-larande-och-underhall.md`.

### Hur sektionerna prövas

Prövningen görs i biblioteket, en gång, inte i varje kundbygge. I första sajten är det provsidan i 375 och 1280 px och Johnnys blick (ovan).

- [N2] **Provsidan visar varje sektion i varje variant och varje stilkit** i visningsbredderna i `bilaga-c-kontroller.md`. Johnny godkänner varje sektion och variant där, och kontrollerna under *Kontroll* körs mot provsidan, så att fel fångas en gång i stället för i varje bygge.
- [N2] **Innehåll i värsta fall:** varje sektion prövas med lång rubrik, långa sammansatta svenska ord, tomt fält, saknad bild och en respektive tolv poster. 🔧 med better-break (inventeringen) och idén ur Emil Kowalskis `break-ui` (📄 *$10K Website Kit*)
- [N2] **Spritt pass för kantfall.** Agenter hoppar över kantfall. Isolerade agenter med ett perspektiv var, utan att se varandras resultat, prövar biblioteket: långa texter och tomma tillstånd, långsamt nät, skärmläsare och tangentbord, ovanliga skärmbredder, felaktig inmatning i formulär, reducerad rörelse och innehåll i värsta fall (ovan). En kritiker sållar förslagen; de som håller blir kontroller som Johnny godkänner och som förs in i `bilaga-c-kontroller.md`. 🎥 *ADHD-videon* / 🔧
- [N2] **Varianterna ska skilja sig på riktigt.** Varianter ur samma kontext blir samma idé i nya ord (fallgrop 77). De tas därför fram av isolerade agenter med var sin vinkel, och en kritiker kontrollerar att de skiljer sig. *(en källa – bänken: 🎥 ADHD-videon)*
- [N2] **Tangentbord och skärmläsare prövas:** fokusordning och menyns Escape. Rubriker inuti `<summary>` annonserades inte av JAWS och TalkBack i O'Haras prov; pröva med aktuella skärmläsare eller lägg rubriken utanför. ⚠️ datan är från 2018–2021. 📄 [O'Hara](https://scottohara.me/blog/2018/09/03/details-and-summary.html)

### Mallarna

- [N2] **Varje sidtyp i standardsajten har en mall med en standardordning av sektioner.** Claude får ändra ordningen för en sajt; ändringen loggas som antagande (`guide/README.md`, *Sett, härlett, okänt*). Utkast 🔧 ur kartan och webb-pros byggstandard 9.1–9.5. Det första bygget utgår från tabellen medan Johnny tittar.

| Mall | Sektioner i standardordning |
|---|---|
| Start | Sidhuvud · Första vyn · Det praktiska · Tjänster · Förtroende · Utfört arbete · Så går det till · Serviceområde · Vanliga frågor · Nästa steg · Sidfot |
| Tjänst | Sidhuvud · brödsmulor (från sajt 2) · Första vyn · Text och bild (vad som ingår; pris och ROT eller RUT om faktabasen har det) · Utfört arbete · Vanliga frågor · Nästa steg · Sidfot |
| Tjänster | Sidhuvud · Tjänster · Nästa steg · Sidfot |
| Om oss | Sidhuvud · Text och bild · Förtroende · Nästa steg · Sidfot |
| Kontakt | Sidhuvud · Kontakt · Hitta hit eller Serviceområde · Sidfot |
| Sidan finns inte; Integritetspolicy och Tack bara med formulär | Sidhuvud · Text och bild · Sidfot (innehållet → `2-3`, `2-7`, `2-8`) |

### Wireframes per sidtyp

I första sajten görs inga wireframes. Riktningarna visar startsidan direkt i tre kit (`5-byggplan.md`, steg 2), och Johnny ser sajten medan den byggs.

- [N2] **Layouten väljs innan något får färg.** Full design innan layouten är vald ger lång väntan och full omgörning om den är fel (fallgrop 62). 🎥 *Claude Design-videon*
- [N2] **En wireframe är sidtypens mall renderad ur biblioteket med kundens riktiga innehåll och wireframe-kitet** – samma tokennamn som stilkiten men gråskala, systemtypsnitt och bildrutor med bildens beskrivning. Ingen separat ritning behövs, och textmängden syns direkt. 🔧
- [N2] **Varje sidtyp i sidkartan får en wireframe,** inte bara startsidan, så att hela sajten hänger ihop. 🎥 *Jack Roberts-videon 3* (sponsrad av Relume). För startsidan visas två alternativ med olika första vy eller ordning. 🔧
- [N2] **Johnny ser wireframes i mobil- och datorbredd tillsammans med sidkartan,** innan riktningarna tas fram.
- [N3] **Granskaren väljer mellan wireframe-alternativen mot briefen,** och Johnny ser bara avvikelser från mallen (`3-2-granskning-och-kalibrering.md`).
- [N2] **Kunden ser riktningarna, inte wireframes.** Om kunden ska godkänna en klickbar prototyp är öppet – se `bilaga-e-oppna-fragor.md`.

### Gallerivyn

- [N2] **Allt som ska väljas mellan – wireframes, varianter och riktningar – öppnas sida vid sida i en lokal vy,** i mobil- och datorbredd, i stället för att ligga utspridda i filer. 🎥 *4 Ways-videon*. Vyn är en sida i utvecklingsläget och publiceras aldrig (inga arbetsverktyg i produktion → `2-8`). Hur riktningarna visas i första sajten → `2-5-yta.md`.

## Vad som kommer ut

**Första sajten:** biblioteket med de sektioner sajten använder, en variant var, provsidan (startsidan i tre kit) och sajtens sidor satta ur sektionerna i valt kit.

**Från sajt 2:** en skelettplan per sida – mall, sektioner, variant och vilket innehåll varje plats får, med källa i faktabasen. Planen lagras som data som Astro-bygget läser, så att plan och sajt inte kan glida isär 🔧. Därtill wireframes per sidtyp i gallerivyn, och i biblioteket varianterna, layoutprimitiverna, mallarna och wireframe-kitet.

## Kompetens och källor

- [N2] **Skelettskillen** destilleras när biblioteket har byggts för hand: ur better-layout, emil-mobile-native och refero-design (metoden för referenser), med *Atomic Design*, *Mobile First* och *Refactoring UI* (`bilaga-b-skills.md`).
- [N2] **Byggverktyg när biblioteket byggs ut** (inventeringen): better-variant och emil-prototype för varianter, state-machine för tillstånd per komponent, better-break för värsta fall, better-explain-interface och steget Observe ur ai-website-cloner-template för att se hur referenssajter löser layout och responsivitet, samt Refero, Mobbin och Inspo för mönster. Om Stitch kan ta fram layoutvarianter till biblioteket är inte prövat; det prövas när biblioteket byggs ut. 🔧
- [N2] **Kandidater till sektionerna** 📄 `kunskap/research/2026-10-15_kompetensluckor-anteckningar/lager-3-4-struktur-skelett.md`:

| Kandidat | Dom | Vad vi tar |
|---|---|---|
| [AstroWind](https://github.com/arthelokyo/astrowind) (MIT, 37 sektioner) | Ta in som referens | Sektionskatalog, props-typer, vanliga frågor med `<details name>`. Skrivs om i egna tokens och forkas inte. Mobilmenyn och in-animationerna (`opacity-0`) prövas med JavaScript avstängt; v2 (oktober 2026) är ogranskad. |
| [Accessible Astro](https://github.com/incluud/accessible-astro-components) (MIT) | Ta in som referens | Skip-länk, brödsmulor, formulär, reducerad rörelse |
| GOV.UK Frontend (MIT) | Ta in, beteenden | Beteenden och texter, inte kod eller varumärke |
| Every Layout | Ta in, destillera | Layoutprimitiverna |
| [Fulldev UI](https://github.com/fulldotdev/ui) (MIT) | Pröva | Flest varianter för småföretag; dragspelet kräver JavaScript och byts mot `<details>` |
| [HyperUI](https://github.com/markmead/hyperui) (MIT) | Pröva | Sidfötter, kontaktformulär, vanliga frågor på `<details>` |
| [Basecoat](https://github.com/hunvreus/basecoat) (MIT) | Pröva | Atomerna: shadcn-systemet i ren HTML |
| [CodeStitch](https://codestitch.app/) | Pröva, läs villkoren först | Närmast målgruppen; villkoren för ett internt bibliotek är overifierade ⚠️ |
| Zag (MIT) | Pröva, från N3 | Bara komplexa öar |

Det som avstås eller bevakas (bland annat Preline, Flowbite, Starwind och Tailwind Plus, vars licens enligt en publik kopia förbjuder teman och "website builders") → `bilaga-a-verktyg.md`. Komponent- och referenskällor (21st.dev, Aceternity UI, React Bits, gallerier per sektion), regeln för referenser och licens per tillgång → `2-5-yta.md`.

- [N2] **Webb-pros Astro-komponenter** (`mall/astro/src/` i webb-pro; bedömning i 📄 `kunskap/research/2026-10-15_webb-pro-genomgang.md` §3):
  - [N2] `Forfragan.astro`: **kandidat till Kontakt-sektionens formulär.** Fungerar med vanlig POST utan JavaScript, har honeypot och tidsfälla, felbesked vid fälten via `aria-describedby` och inskicks-id mot dubbletter. Före intag skalas webb-pros mekanik av, och felhanteringen stäms av mot GOV.UK, som validerar på servern med felsammanfattning, `novalidate` och utan `required`; komponenten använder webbläsarens validering (→ `2-8`).
  - [N2] `HittaHit.astro`: kandidat till Hitta hit – adressen som text och en vanlig länk, inget hämtas före klick.
  - [N2] `Brodsmulor.astro`: synlig lista och BreadcrumbList ur samma data, placerad före `<main>`.
  - [N2] `Bokning`, `Betallank`, `Nyhetsbrev` och `Sprakvaxlare`: små kandidater till tillvalen, med länkar i stället för inbäddningar; nivå per tillval → `2-2-omfattning.md`.
  - [N2] `Bas.astro`, `404.astro` och `tack.astro`: kandidater till mallarnas grund i biblioteket. Vad första sajten tar ur webb-pros Astro-mall, och head-tekniken → `2-8`.
  - [N2] **Inte:** rökprovets `Hero`, `Tjanster` med flera (visar mönstret med variant som prop och tokens som CSS-variabler, men har hårdkodad text och versaler) och mallens `package.json` (låser three, gsap, motion och radix).

**Förankring:** Garrett; Frost, *Atomic Design*; W3C APG (disclosure-navigering, [accordion](https://www.w3.org/WAI/ARIA/apg/patterns/accordion/), brödsmulor) med MDN:s Baseline-status; GOV.UK Design System och Service Manual; Every Layout; Wroblewski, *Mobile First*; WCAG 2.2.

## Kontroll

Alla kontroller och deras grund står i `bilaga-c-kontroller.md`, liksom visningsbredderna (320 CSS-px bara för reflow, 375, 768 och 1280; 1920 från N2). Skriptet → `2-8-teknik-och-kvalitet.md`.

I första sajten har skelettet inga egna automatiska kontroller. Reflow vid 320 CSS-px är N1-kontroll 3 och axe N1-kontroll 8 i `2-8`, och Johnny ser sajten. Kriterierna nedan med WCAG som norm gäller ändå från första sajten som en del av golvet (`2-8`, *Kodstandard*); som egna kontroller i skriptet kommer de från sajt 2.

- [N1] **Granskningskriterium: blickprovet (femsekunderstestet).** En separat AI ser en skärmbild av första vyn i 375 och 1280 px, mobilen först, utan källkoden, och säger vad som erbjuds, var och vad man ska göra. Det är fråga 1 i Johnnys måttstock (`mattstock/mattstock.md`; regeln under *Sektionerna*). Stämmer svaret inte med briefen och den primära handlingen är det ett fynd. Brister fråga 1 helt blir granskarens dom *underkänd*, enligt Johnnys måttstock (`BESLUT.md` 2026-10-15). Det är ingen automatisk stoppkontroll, och Johnny avgör (→ `3-2-granskning-och-kalibrering.md`). Testet gäller skelett och yta och körs i byggplanens steg 2 på varje riktnings första vy, innan resten av sajten byggs – en kontroll av första lagret, som på en 3D-skrivare (`BESLUT.md` 2026-10-15). Här är dess enda plats. *(en källa – bänken: 🎥 Jack Roberts-videon 2, som bygger på Krug; Krug är inte läst i original)* Textmängden per sektion (fallgrop 175) → `2-7-innehall.md`.
- [N2] **Låst kontroll: klickytor minst 24 × 24 CSS-px**, eller tillräckligt avstånd enligt kriteriet. 📄 WCAG 2.2, 2.5.8, AA ([W3C](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html))
- [N2] **Granskningskriterium: 44 × 44 px för knappar, menyknappen och fristående länkar.** Nortropics nivå (kartan), över golvet; 2.5.5 är AAA och därför ingen norm för en låst kontroll. 📄 2.5.5 ([W3C](https://www.w3.org/WAI/WCAG22/Understanding/target-size-enhanced.html))
- [N2] **Låst kontroll: fokus syns** på allt som nås med tangentbordet. 📄 WCAG 2.2, 2.4.7, AA ([W3C](https://www.w3.org/WAI/WCAG22/Understanding/focus-visible.html))
- [N2] **Kontroll som rapporterar, stoppar inte: inga överlappande eller avklippta element** i visningsbredderna. 🔧
- [N2] **Kontroll som rapporterar, stoppar inte: skelettplanen följer mallen,** eller avvikelsen är loggad som antagande. 🔧

Att innehåll och meny fungerar med JavaScript avstängt är regeln *HTML först* ovan; kontrollen står i `2-8`.

## Hur självgående

**Första sajten:** Claude bygger interaktivt medan Johnny tittar. Johnny ser startsidan i tre kit och sajten i webbläsaren (`5-byggplan.md`, steg 2 och 3). En ny sektion är biblioteksarbete med Johnnys godkännande, aldrig improvisation i ett kundbygge.

- [N2] **Helt självgående i kundbygget,** eftersom AI:n bara väljer bland granskade sektioner och varianter (kartan). Johnny godkänner varje ny sektion och variant i biblioteket och ser wireframes med sidkartan.
- [N3] **Granskaren väljer bland wireframe-alternativen,** och Johnny ser bara avvikelser.
