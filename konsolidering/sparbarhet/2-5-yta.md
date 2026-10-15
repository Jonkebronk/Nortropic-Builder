# Spårbarhet: `guide/2-5-yta.md`

Radnummer avser `historik/IMPLEMENTERINGSGUIDE-v0.74.md`. "Flyttat till annan fil" anger var innehållet hör hemma enligt hemvisttabellen i `konsolidering/skrivregler.md`; de filerna skrivs av andra. Skrivet 2026-10-15.

## v0.74 mot v1.0

| v0.74-avsnitt (rader) | Var det hamnade (fil, avsnitt) | Struket och varför | Flyttat till annan fil |
|---|---|---|---|
| §1 Mål, kärnidén och "Varför det fungerar" (100–108) | 2-5 Grundregeln (Stitch används när kit tas fram) | Kärnidén "Claude Code styr Stitch per sajt" ersatt av beslutet 2026-10-15 (stilkit) | Resten av §1 → `guide/README.md` |
| §2 Förutsättningar (114–119) | 2-5 Stitch: Node 20+, inloggning | – | Headless webbläsare → `2-8`, `3-2` |
| §2 Installation och fallgrop om målmapp (121–130) | 2-5 Stitch: installation, `.agents/skills`-regeln | ⚠️ ersatt med 📄 `2026-10-14_stitch-och-verktyg.md` | – |
| §2 Googles stitch-skills (132–141) | 2-5 Stitch: Googles stitch-skills, MCP krävs, davideast behövs inte | Stitch Loop (bygger hel sajt) och React/shadcn-skills strukna: Stitch bygger inga kundsajter, stacken är Astro | Stacken → `2-8` |
| §2 Verifierade CLI-kommandon (143–154) | 2-5 Stitch, kommandotabellen (plus `config set project`) | – | – |
| §2 Verktygsmanifest (156–160) | 2-5 Stitch, verktygsmanifest för Stitch | – | Principen för alla CLI:er → `3-4` |
| §2 DESKTOP och MOBILE (162) | 2-5 Grundregeln (dator och mobil; sammanslagen vid ommärkningen) | – | – |
| §3 Projektstruktur: `design.md`, `designs/` (205, 218) | 2-5 `sites/<namn>/design.md` | `designs/` (Stitch-skärmar per sajt) struket: ingen Stitch-design per sajt | Strukturen → bilaga E |
| Fas 0b 4b, kundens identitet via Stitch-import (266) | 2-5 Kundens identitet i kitet, *Vid ombyggnad* [N2] | Stitch-importen ersatt med Playwright vid ommärkningen (strider mot beslutet 2026-10-15, granskningen 1.4.1) | Ombyggnad i övrigt → `2-2` |
| Fas 1 frågeområden: referenser, anti-referenser, ljust/mörkt (298); spara varför (299); referenser som bild/video (300) | 2-5 Tre riktningar (kit ur briefen; kundens referenser, flyttade dit vid ommärkningen), Så tas ett kit fram steg 2 (`varfor`) | – | Intervjun → `2-1` |
| Brief 3 Känsla och visuell riktning (306) | 2-5 Tre riktningar | – | Briefmallen → `2-1` |
| Fas 1b tre riktningar med Inspo (327) | 2-5 Tre riktningar; Inspo under Kompetens | Inspo per kund och "du väljer riktning i stopp 1" ersatta av besluten (kit; Johnny först, sedan kunden) | Stoppet → `3-1` |
| Fas 1b gallerivy (328) | 2-5 Tre riktningar, sida vid sida | – | Gallerivy för wireframes → `2-4` |
| Fas 1b riktningarna måste skilja sig (329) | 2-5 Så tas ett kit fram steg 8, Spridd idégenerering | – | – |
| Fas 1b Design Picker (330), få referenser (331), referens-URL:er i `state.json` (332) | 2-5 Så tas ett kit fram steg 2 (få referenser) | Design Picker struken (gallerivyn räcker); `state.json → referenser` struket: referenser namnges i kitets `design.md` | – |
| Fas 1b Tastemaker (333–334) | 2-5 Så tas ett kit fram steg 4 | – | – |
| Fas 1b prototyplänk till kund (337–339) | 2-5 Tre riktningar: kunden väljer via skyddad förhandsvisning | – | Skyddet av länken → `2-8` |
| Fas 2 Stitch-åtgärd och åtta varianter (350–351) | 2-5 Grundregeln (varför), Stitch | Stitch per kundsajt struket (beslut 2026-10-15) | – |
| Fas 2 wireframes först, per sidtyp, Relume (352, 355) | – | – | → `2-4` (D25) |
| Fas 2 strategi för varianter (353), DESKTOP+MOBILE (354), tak (356) | 2-5 Stitch (varianter, tak); Grundregeln (dator och mobil) | – | – |
| Fas 2 output (357), modellernas standardval (358) | 2-5 Vad som kommer ut; Grundregeln; Kontroll (fallgrop 18) | – | – |
| Fas 2 `design.md` låses (359) | 2-5 `sites/<namn>/design.md` | – | Låsningen → `guide/README.md` (D7) |
| Fas 2 Hallmark som tillval (360) | 2-5 Kompetens (destilleras) | Hallmark i Stitch-prompterna struket: prompterna byggs av kitets adjektiv | – |
| Fas 2 Aura.build (361) | 2-5 Kompetens | – | – |
| Fas 2 riktningen styr Stitch (362) | 2-5 Så tas ett kit fram steg 2–5 | Inspo-riktning per kund struken | – |
| Fas 2 teknikbeskrivningar av beteende (363) | – | – | → `2-6` Effekter från referenser |
| Fas 2 beskrivningar till generatorn, redesign (364–368) | 2-5 Referenser, originalitet och licens; redesign med andras sajter i originalitetskontrollen (fallgrop 119) | "Andras sajter: bara beskrivningar" mjukat till referensregeln (skrivreglerna; analysen M12). Gränsen "vid äganderätt" ersatt av regeln. Redesign med skärmdump av kundens egen sajt i Stitch struken vid ommärkningen (beslutet 2026-10-15, granskningen 1.4.1) | – |
| Fas 2 annoteringar (369), Enhanced Prompt (370) | 2-5 Stitch | – | – |
| Fas 2 validering av `design.md`, design-md-planner (371) | 2-5 Kontroll; Kompetens | – | – |
| Fas 2 OKLCH, kontrastpar, Antimönster (372) | 2-5 Färgrecept (OKLCH på bänken), Kontroll (kontrast som grind), Antimönster per kit | OKLCH som krav struket (en källa, analysen §4.2) | – |
| Fas 2 visualisering, designmd.space (373) | 2-5 Så tas ett kit fram steg 6 (provsida); Kompetens | – | – |
| Fas 2 grind (374) | 2-5 Johnnys dom på kitet; Kontroll | Grinden per sajt struken: kit godkänns en gång | – |
| Fas 2 promptmall (376–377) | – | Struken: gällde Stitch per sajt | – |
| Fas 4 jämförelse mot Stitch-designen, prototypen (413–417) | – | Struken: ingen Stitch-prototyp per sajt. Kitets tokens och designregelvakten ersätter jämförelsen | Bredder och granskningsupplägg → `3-2` |
| Fas 4 Stitch-id i uppdragsprompten (415) | – | Struken av samma skäl | – |
| Fas 4 två granskare (418), samma tillstånd (423), allvarlighetsgrader (424), fasta fält (425–431), tre utfall (432), grind och rundor (433–434) | – | – | → `3-2` |
| Fas 4 originalitetskontroll (419) | 2-5 Originalitetskontroll mot regeln | "För lik sektion = hög" struket: snävare än referensregeln (analysen M12) | – |
| Fas 4 layout på pixelnivå, Krehel (420) | 2-5 Kontroll | Krehels review-skill (git-jämförelse) struken: commits per runda finns redan | – |
| Fas 4 perceptionslagar (421) | – | – | → `2-4`, `3-2` |
| Fas 4 beskär och zooma (422) | – | Dubblett, struken ur 2-5 vid ommärkningen (granskningen 2.2) | → `3-2` *Underlaget* |
| Fas 4 Hallmark-kontroll (435) | 2-5 Kompetens (slop-listan destilleras) | Fristående Hallmark-granskning struken (inventeringen: destillera) | – |
| Fas 5 Refero och Mobbin (466), Land-book och Coolors (467), gallerier per sektion (468) | 2-5 Kompetens, designkällor | "Samma regler som Inspo" ersatt av referensregeln | – |
| Fas 5 typsnitt, källor och licens (469) | 2-5 Typsnitt; Licens per tillgång | Fontshare som fri källa struken tills ITF:s EULA lästs (researchen) | Typsnitt från egen domän (samtycke) → `2-8` |
| Fas 5 Aceternity UI, React Bits (471); godly, 21st.dev, Awwwards (473) | 2-5 Kompetens; licenstabellen | "Byt knappen mot den här komponenten" i stopp 2 struket som eget mönster: komponenter går via biblioteket | Komponenter → `2-4` |
| Fas 6 textmängd och blickprov (513–516) | 2-5 Kontroll (hänvisning) | Blickprovet struket ur 2-5 vid ommärkningen: dubblett (granskningen 2.2) | Blickprovet → `2-4` (femsekunderstestet); ordgräns och kortare text → `2-7` |
| Fas 6 Awwwards-kriterier, Meng To (541) | – | – | → `3-2` |
| Fas 6 jämförelse mot förebild i siffror (543–548) | 2-5 Kontroll (hänvisning) | Galleriet utan adress (548) struket. Regeln struken ur 2-5 vid ommärkningen: dubblett (granskningen 2.2) | Regeln → `3-2` (förebild i siffror; referensen och fallgrop 61 under *Varje bedömning har en referens*); sajtgranskningen (547) → `4-foretaget` |
| Fas 6 fem tecken på AI-slop (549) | 2-5 Kontroll | – | – |
| Fas 6 versaler (550) | 2-5 Kontroll | Låst kontroll → granskningskriterium (en källa, analysen §4.2) | – |
| Fas 6 blind jämförelse (551–556) | – | – | → `3-2` |
| §6.6 Design Picker (937) | – | Struken: gallerivyn räcker | – |
| §6.8 Variate (953–961) | – | Avsnittet struket ur 2-5 vid ommärkningen: dubblett (granskningen 2.2) | Verktyget → `3-5` *Variate* och `bilaga-a-verktyg.md` (MIT, menyn i förhandsvisningen); publiceringskontrollen → `2-8` |
| §7.2 grindrad "2 Design" (1019) | 2-5 `sites/<namn>/design.md` (valt kit) | Stitch-id och Stitch-designer per sajt strukna | Grindmekanismen → `3-1` |
| §7.3 designregelvakt (1054–1062) | 2-5 Kontroll, inga värden utanför kitet | – | Hooken → `3-3` |
| §7.3 antimönster som statiska kontroller (1064–1071) | 2-5 Antimönster per kit; Kontroll | Globalt förbud mot Inter, Geist och Lucide struket (analysen §4.2; kartan har Inter och Lucide) | Ej sökbara antimönster som kriterier → `3-2` |
| §8.6 Astra som eval-kandidat (1315) | 2-5 Kompetens (hänvisning) | – | → `3-3` |
| §10.1 låsning av `design.md` (1438) | 2-5 `sites/<namn>/design.md` | – | Låsningen → `guide/README.md` |
| §11.7 spridd idégenerering (1668–1682) | 2-5 Spridd idégenerering | Dubbel numrering "4." rättad. Arena på bänken [N4] | Kantfallspasset (fas 1b, rad 325) använder metoden; hemvist utanför 2-5 |
| §11.9 punkt 3 licens (1708) | 2-5 Licens per tillgång (D9) | – | Bildstrategin i övrigt → `2-7` |
| §12 Impeccable, Taste-reglage (1785) | 2-5 Kompetens; Spridd idégenerering | – | Emils skills → `2-6` |
| §12 princip en designskill per roll (1820–1823) | 2-5 Grundregeln (stilen kommer ur kitet) | – | Byggar- och granskarskills isär → `3-2` |
| §12 rader: `stitch` (1827), Hallmark (1837), Inspo (1838), Googles Stitch-skills (1867), design-md-planner (1868), Claude Design (1869), Tastemaker (1870), Krehel (1872), Meng To (1874), frontend-design (1881), Taste (1882), UI UX Pro Max (1883), ADHD (1890) | 2-5 där verktyget används (Variate (1894) → `3-5`) | garden-skills (1875) och "shadcn, dashboard, Material 3…" (1885) strukna: redan avstådda i v0.74 | designer-skills (1873) → `2-4`/`3-2`; Higgsfield (1884) → `2-7`; Astryx (1886) → `2-8` |
| §12 skeletten `stitch-review` och `story-review` (1903–1933) | – | Strukna: äldre än reglerna (analysen M11) och byggda för Stitch per sajt och scrollytelling | Granskarens skill → `3-2` |
| §14 stack: ren HTML mot komponentbibliotek (2144–2154) | – | – | → `2-8`, `2-4` |
| §14 nivå av autonomi för designvalet (2156) | 2-5 Hur självgående | Avgjord av besluten 2026-10-15 | – |
| §14 kostnad och kvoter i Stitch (2159) | 2-5 Stitch, villkor | – | Öppen → bilaga E |
| §14 Hallmark (2163), Inspo (2164), licenser (2177) | 2-5 Kompetens | Inspo per kund avgjord av beslutet | – |
| §14 kundens godkännande av prototyp (2168) | 2-5 Tre riktningar | Avgjord: kunden väljer riktning | – |
| §15.1 varumärkesbok (2205) | 2-5 Kundens identitet [N3]; logotyper genereras inte | – | Paketet → `4-foretaget` |

## Fallgropar från §13

| Nr | I 2-5 |
|---|---|
| 1 | Stitch och ADHD: kontrollera att skillen syns (`.agents/skills`) – fallgrop utan regel blev regel |
| 2 | Struken: kitets tokens ger samma stil över alla sidor; ingen Stitch-design per sajt |
| 3, 19 | Grundregeln (dator och mobil) |
| 6 | Grundregeln, varför (tidsbudgeten → `3-1`) |
| 18 | Grundregeln; Kontroll, inga värden utanför kitet |
| 27, 28 | Så tas ett kit fram steg 2 |
| 29 | Så tas ett kit fram steg 2, referensbilder utan överlägg – fallgrop utan regel blev regel |
| 30 | Originalitetskontroll mot regeln |
| 45 | Struken ur 2-5 vid ommärkningen → `3-5` *Variate*, `2-8` |
| 48 | Grundregeln, stilen kommer ur kitet |
| 49 | Så tas ett kit fram steg 4 |
| 61 | → `3-2` (*Varje bedömning har en referens*); struken ur 2-5 vid ommärkningen |
| 63 | Kontroll, validering av `design.md` |
| 75 | Referenser, beskrivning till generatorn |
| 77 | Så tas ett kit fram steg 8 |
| 85 | Kontroll, konsekvens är inte karaktär – fallgrop utan regel blev regel |
| 86 | Stitch, verktygsmanifest |
| 95, 166, 177 | Licens per tillgång (dubbletter sammanslagna) |
| 109 | Antimönster per kit; Kontroll |
| 111 | `sites/<namn>/design.md` fylls inte på av agenten |
| 118 | Stitch, stämningsadjektiv |
| 119 | Originalitetskontroll mot regeln (redesign med andras sajter) |
| 147 | → `3-2` *Underlaget*; struken ur 2-5 vid ommärkningen |
| 170 | Så tas ett kit fram steg 2 (`varfor`) |
| 194 | → `3-2`; struken ur 2-5 vid ommärkningen |
| 196 | Kontroll, versaler (bänken) |

Inte i 2-5: 62 och 96 → `2-4`; 165 → `3-3`; 195 → `2-7`.

## Karta, beslut och research som använts

- `BESLUT.md`: 2026-10-13 (Kundens väg, Licenserna med Relaterat), 2026-10-14 (Claude Design), 2026-10-15 (designsätt, riktning, sajttyp).
- `historik/karta/5-yta.md` hela; `historik/karta/4-skelett.md` (Johnnys smak i biblioteket); `historik/karta/README.md`; `historik/principer.md` (det specifika kommer från kundens material).
- `kunskap/research/2026-10-15_kompetensluckor-anteckningar/lager-5-yta.md` §1–6 (DTCG, Terrazzo, färgrecept, typsnitt, ikoner, kit-axlar, evidens, 26-punktslistan).
- `kunskap/research/2026-10-15_kompetensluckor-och-kandidater-per-lager.md`, lager 4 (Tailwind Plus) och lager 5 (Open Design, licensflaggor).
- `inventering/inventering.json`, lager 5 (domar för befintliga skills och nya kandidater).
- `kunskap/research/2026-10-14_stitch-och-verktyg.md` (CLI, stitch-skills, Variate, licenser).
- `kunskap/research/2026-10-14_ai-forordningen-och-rattigheter.md` §4–5 (upphovsrätt, villkor för Stitch och Higgsfield).
- `kunskap/research/2026-10-15_guide-konsolideringsanalys.md` §2 (D8, D9), §3.2 (M12), §4.2 (Inter/Lucide, OKLCH, versaler), §6.3 (fallgrop 29, 85), §7.3.
- `kunskap/research/2026-10-15_webb-pro-genomgang.md` §2–3 (materialet, licensbeskedet, referensregeln); webb-pros `BESLUT.md` 2026-10-03.

## Ommärkning 2026-10-15

Efter granskningen (`konsolidering/granskning-v1.0.md`) och tillägget kl. 14.30 i `konsolidering/skrivregler.md`. N1 gick från 34 punkter (41 med den numrerade listan, granskningen 1.1) till **7**. Inget är struket utom dubbletter och beslutsavvikelsen nedan; allt annat är flyttat till N2 eller senare eller sammanslaget med en N1-punkt.

### Kvar i N1

| N1-punkt i 2-5 | Sammanslaget med (tidigare egna punkter) |
|---|---|
| Grundregeln: ytan ur ett stilkit | Stitch i första sajten (startsida med provinnehåll, dator och mobil, inget kundinnehåll, ingen export – tidigare *Stitch ger underlag, inte leverans* och *Dator och mobil från början*, fallgrop 3, 19); *Claude Design är inte designmotor* |
| Minimala kit: färg, typsnitt med licens, avstånd, radie + kort `design.md` (personlighet, typsnitt med licens, referenser med `varfor`) | *Format för första sajten* (`[data-kit]`) |
| Tre riktningar = startsidan i tre minimala kit | *Tre kit ur briefen*, *Samma innehåll och skelett* (saknade bilder som beställning), *Sida vid sida*, *Johnny ser riktningarna först och kan stryka* (motiveringen i `domar.jsonl`), *Sedan väljer kunden*, *Kundens varumärkesfärg blir kitets accent* (accent och egen logotyp i `sites/<namn>/design.md`), *Riktningarna* under Hur självgående |
| Referensregeln | – |
| Licens per tillgång | – (förtydligat: i första sajten typsnitt, ikoner och bilder) |
| Kontrast enligt WCAG 2.2 AA – grind | Mäts med axe bland de tio N1-kontrollerna (`2-8`); token-bygget blev egen [N2]-underpunkt |
| Konsekvens är inte karaktär | *Fem tecken på AI-slop*; fynd högst `medel` (granskningen 2.1, punkt 6) |

### Flyttat från N1 till N2

*Stilen kommer ur kitet, inte ur skills* · *Kiten varierar ytan, inte konventionen* · *Kitets axlar* (elva) · *Tokens i två nivåer* · *`design.md` per kit* (tio fält, nu *Full `design.md` per kit*) · *`sites/<namn>/design.md` per kund* (påfyllnad och låsning; låsningen N2 som i `3-1`, granskningen 1.2) · *Typsnitt ur en kuraterad OFL-lista* · *En ikonfamilj per kit* · *Så tas ett stilkit fram* steg 1–3 och 5–7 med *Referensbilder utan överlägg* (den numrerade listan blev punktlista med stegnumret i fetstilen, eftersom märket ska stå först på en listrad) · Stitch: *Gör om bibliotekets egna sektioner*, *Prompter av stämningsadjektiv*, *`EXPLORE` … `REFINE`*, *Kontrollera att skillen syns* · *Logotyper genereras inte* (i första sajten används kundens egen logotyp enligt *Tre riktningar*) · *Kundens önskemål inom en riktning* · kundens val via skyddad förhandsvisning (egen [N2]-punkt; publiceringen är N1 bara om sajten publiceras och kommer först i `5-byggplan.md`, steg 5) · *Riktningarna visar kitens provsidor* · *Kiten är inte självgående* · *Kundbygget är självgående inom kitet*. Punkterna under *Kompetens och källor* fick märket [N2]; Inspo nämns i N1 via Grundregeln.

### Granskningsfynd som åtgärdats

| Fynd | Åtgärd |
|---|---|
| 1.1, raderna för `2-5` 20, 24 och 49, 81–84 | Minimalt kit i N1; elva axlar, tio fält, provsida med två verksamheter och Stitch-reglerna i N2; Stitch på startsidan i dator och mobil i N1 |
| 1.2, varianter med isolerade agenter och kritiker | N2 i *Spridd idégenerering*, som nu säger "från sajt 2" |
| 1.2, blickprov | Ersatt med hänvisning till `2-4` |
| 1.3, punkt 5 (Lucide) | "Lucide som förslag – öppet, se `bilaga-e-oppna-fragor.md`" i *En ikonfamilj per kit*; Inter och Lucide som standard i öppet-raden |
| 1.3, punkt 9 (riktningarnas omfång) | Startsidan i tre kit |
| 1.3, punkt 13 (kundens referenser) | Flyttad från *Designkällor* till *Tre riktningar* [N2] |
| 1.4, punkt 1 (Stitch vid kundbygge) | Rad 35 ersatt: "[N2] Vid ombyggnad läses kundens färger och typsnitt ur sajtens beräknade stilar med Playwright och blir accent och godkända avvikelser i `sites/<namn>/design.md`." Rad 108 (*Redesign med skärmdump i Stitch är tillåten med kundens egen sajt*) struken: den lät kundinnehåll gå till Stitch per kund, vilket strider mot `BESLUT.md` 2026-10-15 ("Stitch inom stilkit") och mot regeln att inget kundinnehåll skickas till Stitch. Radens andra halva – med andras sajter gäller referensregeln och originalitetskontrollen (fallgrop 119) – står nu i *Originalitetskontroll mot regeln* |
| 2.1, punkt 6 (bakväg via allvarsgraden) | Fynd mot *Konsekvens är inte karaktär* och de fem tecknen får högst `medel` |
| 2.2, jämförelse mot förebild i siffror | Struken ur 2-5; hänvisning till `3-2` (rad 53; referensen och fallgrop 61 i rad 29) |
| 2.2, sektion för sektion i full upplösning | Struken ur 2-5; hänvisning till `3-2` (rad 30, fallgrop 147) |
| 2.2, blickprov och femsekunderstest | Struken ur 2-5; hänvisning till `2-4` (rad 172) |
| 2.2, Variate | Avsnittet struket ur 2-5; verktyget i `3-5` och `bilaga-a-verktyg.md`, kontrollen i `2-8` (rad 83). *Spridd idégenerering* hänvisar till `3-5` |
| 2.2, antimönster per kit; Inter, Geist och Lucide | Kvar i 2-5 (hemvist), med hänvisning till vaktens mekanik i `3-3` |
| 2.4, öppna frågor | Hänvisar till `bilaga-e-oppna-fragor.md`: vilka kit och hur många i första varvet, Terrazzo och `[data-kit]`, Fontshares villkor och reserverade typsnittsnamn, Inter och Lucide som standard. Frågorna läggs in i bilagan av samordnaren |
| Hänvisningar | `karta/5-yta.md` → `historik/karta/5-yta.md`; `guide/README.md` → princip 8 och 9; `principer.md` → `historik/principer.md` med *jfr* princip 2 (se nedan); "bilaga E" och `guide/bilaga-e-…` → `bilaga-e-oppna-fragor.md`; byggplanen → `5-byggplan.md`, steg 2 |

**Inte löst:** meningen *"Det specifika kommer från kundens egna bilder, ord och lokala belägg"* står i `historik/principer.md` (inledningen), inte bland README:s princip 1–11, så *Konsekvens är inte karaktär* hänvisar till arkivet. `bilaga-c-kontroller.md` (C34, C39, C40, C178) och `3-5-live-visning.md` (*Verktyget → `2-5-yta.md`* under Variate) speglar den gamla 2-5 och behöver följa med.
