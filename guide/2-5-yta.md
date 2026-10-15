# 2.5 Yta

**Status:** konsoliderad v1.0, 2026-10-15; ommärkt 2026-10-15 efter granskningen. **Genomläst med Johnny 2026-10-15**; rättelserna står i `BESLUT.md`.

Ytan är Garretts femte plan: typografi, färg, avstånd, radier, skuggor, ikoner och bildbehandling. I Atomic Design är det tokens, lagret som bibliotekets sektioner (→ `2-4-skelett.md`) bygger på. Här ändrades guiden mest i v1.0: en kundsajt får inte längre en egen design i Stitch, utan ytan kommer ur 3–5 stilkit som byggs en gång (`BESLUT.md` 2026-10-15, "Stitch inom stilkit"). Den första sajten använder minimala kit (`5-byggplan.md`, steg 2); kitens fulla omfång kommer från sajt 2.

## Vad byrån gör

### Grundregeln

- [N1] **Ytan kommer ur ett stilkit, aldrig ur fri generering i kundbygget.** Stitch, Inspo, Tastemaker och övriga designverktyg används när kiten tas fram och förnyas, inte vid varje kundbygge. Stitch prövar kitet på en startsida med provinnehåll, i dator och mobil, och värdena förs in i kitets tokens: inget kundinnehåll skickas till Stitch, och ingen export går till en kundsajt. Claude Design är inte designmotor. 📄 `BESLUT.md` 2026-10-14 och 2026-10-15. Varför: en design per sajt tog lång tid, åtta Stitch-varianter i videon (fallgrop 6) 🎥 *Stitch-videon*; modellen gled tillbaka till sina egna färger och typsnitt (fallgrop 18) 🎥 *Opus 5.5-videon*; och Stitch designade bara för dator, så att sajten gick sönder på mobil (fallgrop 3, 19) 🎥 *Stitch-videon*, *Opus 5.5-videon*.
- [N2] **Stilen kommer ur kitet, inte ur skills.** Byggaren laddar inga stilskills (taste, frontend-design m.fl.); de används bara när kit tas fram, en stil per agent. Skills med olika stil krockar (fallgrop 48) 🎥 *designskills-videon*, och webb-pros 67 skillkrockar drog mot "en säker mittenform" 📄 `kunskap/research/2026-10-15_webb-pro-genomgang.md`.
- [N2] **Kiten varierar ytan, inte konventionen.** Besökare dömer estetik på 17–50 ms och föredrar enkla, välbekanta sidor, och utseendet stod för 46,1 % av kommentarerna om trovärdighet. 📄 `kunskap/research/2026-10-15_kompetensluckor-anteckningar/lager-5-yta.md` §5.

### Vad ett stilkit är

Ett tokenset över bibliotekets sektioner plus en `design.md` som beskriver det. Komponenter, sektioner och layoutlogik är gemensamma.

- [N1] **Den första sajten använder minimala kit:** färg (bakgrund, text och accent), typsnitt med licens, avståndsskala, radie och rörelse (längder, kurvor och kitets in-animationer; `2-6-rorelse.md`), som CSS-variabler under en kitväljare (`[data-kit="…"]`), en fil per kit, så att ett bygge kan visa alla tre riktningarna. Till varje kit hör en kort `design.md`: personlighet och vilka kunder kitet passar, typsnitt med licens och några namngivna referenser med en mening om varför (fallgrop 170) 🎥 *sex-färdigheter-videon*. Resten av kitet väntar tills en verklig sajt behöver det (`guide/README.md`, princip 8). 🔧 (ommärkningen 2026-10-15; granskningen 1.1)
- [N2] **Kitets elva axlar** när kiten växer: typsnitt och vikter · typskala och radavstånd · avståndsskala · radie per elementklass och kantbredd · skuggor i minst två lager · färgroller, neutralton och accent · versaler och spärrning i knappar och etiketter · navigationsstil · ikonfamilj och streck · bildbehandling · rörelsebudget (→ `2-6-rorelse.md`). Destillerat ur Go-temat, Flowbite v4 och daisyUI 5; Go är GPL-2.0, så bara parametrarna studeras. 📄 `lager-5-yta.md` §5.
- [N2] **Tokens i två nivåer.** Grundvärden delas av alla kit, och varje kit mappar dem till semantiska roller med shadcn-namn (`--primary`, `--primary-foreground`). Sektionerna använder bara rollerna, så ett kit byts utan att en sektion ändras, och varje rollpar är ett kontrasttest. 📄 Brad Frost via `lager-5-yta.md` §1, §5.
- [N2] **Format när kiten lintas och förnyas:** DTCG 2025.10 byggt med Terrazzo (låst version) till Tailwind 4 `@theme`; resolverns modifier `kit` är "ett system, flera kit". DTCG är stabilt men ingen W3C-standard, och dimensioner får bara vara `px` eller `rem`, så `clamp()`-skalor kräver en egen transform. ⚠️ Terrazzo och `[data-kit]` är inte provade – *öppet, se `bilaga-e-oppna-fragor.md`*. 📄 `lager-5-yta.md` §1.
- [N2] **Full `design.md` per kit:** personlighet och vilka kunder kitet passar, stämningsadjektiv, typsnitt med licens, ikonfamilj, bildbehandling, rörelsebudget, antimönster, namngivna referenser med en mening om varför, och datum för Johnnys godkännande. Googles format, så att Stitch kan läsa filen. 🎥 *Stitch-skills-videon*.
- [N2] **Antimönster per kit, inte globalt.** Ett kit får förbjuda typsnitt, ikonbibliotek eller mönster (t.ex. glassmorfism med gradienter) i sin `design.md`. Förbudet mot Inter, Geist och Lucide gäller inte alla kit: det har en källa, och Inter passar många småföretag (en källa – bänken; 🎥 *designnivå-videon*; analysen §4.2). Inter och Lucide är varken standard eller förbjudna: varje kit väljer (`BESLUT.md` 2026-10-15). Vaktens mekanik → `3-3-sakerhet-och-installningar.md`.
- [N2] **Typsnitt ur en kuraterad OFL-lista**, självhostade via Astros Fonts API och Fontsource, t.ex. Inter, Source Serif, Fraunces, Familjen Grotesk, Atkinson Hyperlegible Next och IBM Plex. `latin` räcker för svenska; `latin-ext` behövs för samiska namn. Subsetta inte efter använda tecken, eftersom kunden lägger till text. ⚠️ Reserverade typsnittsnamn är inte kontrollerade – *öppet, se `bilaga-e-oppna-fragor.md`*. 📄 `lager-5-yta.md` §3.
- [N2] **Flytande typskala enligt Utopia**, med max högst 2,5 × min per steg så att texten går att förstora (WCAG 1.4.4; tröskeln är Barvians, en källa). 📄 `lager-5-yta.md` §3.
- [N2] **En ikonfamilj per kit**, inline-SVG utan JavaScript: Lucide, Tabler eller Phosphor – kitet väljer (`BESLUT.md` 2026-10-15). 📄 `lager-5-yta.md` §4.
- [N2] **Färgrecept:** accenten till OKLCH (Color.js), Leonardo med `wcag2` och målkvoter per roll, Radix tolv stegroller, neutraler tonade mot accenten. APCA är bara rådgivande: struken ur WCAG 3-utkastet och restriktivt licensierad. OKLCH med hex-reserv är ett bra format men inget krav (en källa – bänken; 🎥 *designnivå-videon*). 📄 `lager-5-yta.md` §2.

### Kundens identitet i kitet

Kundens val, accent och logotyp i den första sajten → *Tre riktningar*.

- [N2] **Den exakta varumärkesfärgen** används bara där inget kontrastkrav gäller, t.ex. i logotypen; i kitet är kundens färg accenten. 📄 `lager-5-yta.md` §2.
- [N2] **`sites/<namn>/design.md` per kund** anger bara kit och version, kundens accent och logotyp och avvikelser Johnny godkänt. 🔧 Ingen agent fyller på filen själv, eftersom det kringgår kontrollen av värden (fallgrop 111) 🎥 *designnivå-videon*. Låsningen följer föreslå–besluta–låsa (`guide/README.md`, princip 9).
- [N2] **Vid ombyggnad** läses kundens färger och typsnitt ur sajtens beräknade stilar med Playwright och blir accent och godkända avvikelser i `sites/<namn>/design.md`. 🔧 (följer av `BESLUT.md` 2026-10-15; spåret → `2-2-omfattning.md`)
- [N2] **Logotyper genereras inte.** Ren AI-output saknar sannolikt upphovsrättsligt skydd; varumärkesregistrering ger ensamrätt (tolkning, inte juridisk rådgivning). 📄 `kunskap/research/2026-10-14_ai-forordningen-och-rattigheter.md` §4; 🎥 *Jack Roberts-videon 2*.
- [N3] **Varumärkesbok som tillval:** färger, typsnitt, ton och logotypens användning ur kitet 🎥 *Jack Roberts-videon 2*. Paketet → `4-foretaget.md`.

### Så tas ett stilkit fram

I den första sajten tas de minimala kiten fram enligt *Grundregeln* och *Tre riktningar*. Hela arbetsgången nedan gäller från sajt 2: Johnny och Claude bygger kiten tillsammans, bevakat och sällan.

- [N2] **1. Kitbrief:** personlighet, vilka kunder kitet passar, 3–5 stämningsadjektiv och rörelsebudget. Börja med personligheten (*Refactoring UI*). 📄 `lager-5-yta.md` §6.
- [N2] **2. Referenser:** ett fåtal i detalj, eftersom varje sökning kostar kontext, filtrerade på bransch (en kaffebrief gav annars hälsosajter, fallgrop 28) 🎥 *Inspo-videon*. Varje referens får en mening om varför den är bra (fallgrop 170) 🎥 *sex-färdigheter-videon*. Skills är bara text och visar inga hela sidor (fallgrop 27).
  - [N2] **Referensbilder utan överlägg.** En skärmdump där en cookie-ruta eller popup täcker designen tas om eller kasseras; agenten gissar aldrig på det dolda (fallgrop 29) 🎥 *Inspo-videon*.
- [N2] **3. Utforska i Stitch** enligt *Stitch när kiten tas fram*.
- [N2] **4. Exakta värden med skript**, inte som textsammanfattning där detaljer tappas (fallgrop 49) 🎥 *designskills-videon*: Tastemaker ⚠️, Stitch-skillen `extract-design-md` eller beräknade stilar via Playwright.
- [N2] **5. Värdena blir tokens och `design.md`.**
- [N2] **6. Provsida:** färger, typsnitt, skalor, radier, skuggor och ikoner, plus bibliotekets sektioner med minst två verksamheters innehåll, i mobil och dator. En `design.md` är svår för en människa att föreställa sig 🎥 *Claude Design-videon*.
- [N2] **7. Johnnys dom:** godkänt eller underkänt med kort kritik; bara Johnny godkänner ett kit (`historik/karta/5-yta.md`). Domen blir kalibreringsdata (→ `3-2-granskning-och-kalibrering.md`).
- [N2] **8. Kiten måste skilja sig.** Varianter ur samma kontext är samma idé, och då är kundens val en illusion (fallgrop 77) 🎥 *ADHD-videon*. Nya kit föreslås med spridd idégenerering, och kritikern prövar dem mot de befintliga.

**De tre första kiten** tas fram ur Johnnys godkända sajter i måttstocken (`BESLUT.md` 2026-10-15). Referenserna får enligt referensregeln bära layout, palett och typsnitt, men inte identitet, texter eller bilder. Varje kit är godkänt först när Johnny sett dess provsida.

| Kit | Referenser i måttstocken | Johnnys ord |
|---|---|---|
| **Lugn och luftig** | Stångå Tandklinik, Fungera, Looking Good | *"Lugn färgskala, bra luft"*, *"Lugn, luftig typografi"*, *"Lugn, dyr känsla som passar kundgruppen"* |
| **Varm och välkomnande** | Kroppsbalans, Kajens Café, Pinchman's | *"Grön/beige palett, handritade knappar"*, *"den handskrivna accenten"*, *"en mjuk brun/beige identitet"* |
| **Djärv och egen** | Lamanna's, Bernice, Rendezvous | *"rött/gult, stjärnknappar"*, *"rosa/blå färger och de rundade korten"*, *"orange/serif-identiteten är helt egen"* |

Kartans tidigare förslag (Trygg och traditionell, Stram och modern, Varm och välkomnande, valfritt Lekfull) ersätts. Fler kit läggs till när övningssajterna visar att det behövs.

### Spridd idégenerering

Används när kit föreslås, för layoutvarianter (→ `2-4-skelett.md`) och för versioner i Variate (→ `3-5-live-visning.md`), från sajt 2. 🎥 *ADHD-videon*, *designskills-videon 2*.

- [N2] **Förkontroll:** har frågan ett rätt svar (ett hexvärde, en rubrikordning) körs ingen idégenerering.
- [N2] **Isolerade agenter med var sitt perspektiv**, ur stilförinställningarna i frontend-design och Taste, en per agent. Tastes reglage för variation, rörelse och täthet kan bli parametrar 📄 *$10K Website Kit*. Varje agent tvingas förbi sina tre första svar.
- [N2] **En kritiker** poängsätter nyhet, genomförbarhet och passform mot kitbriefen och kontrollerar att alternativen skiljer sig. Metoden planerar, den bygger inte.
- [N4] Parvis turnering (Arena-skillen) står på bänken 🎥 *Jack Roberts repo-video* ⚠️.
- [N2] ADHD-skillen hamnar i `.agents` och måste kopieras eller länkas till `.claude` (fallgrop 1).

### Stitch när kiten tas fram

`npm install -g @google/stitch` (Node 20+). Inloggning med `stitch login` eller `STITCH_API_KEY`, som också krävs för vissa Canvas-operationer; nyckeln ligger utanför repot (→ `3-3-sakerhet-och-installningar.md`). Verifierat i 0.11.1, alla kommandon med `--json`, `--schema` och `--dry-run` 📄 `kunskap/research/2026-10-14_stitch-och-verktyg.md`. I den första sajten räcker CLI:t; hur det används står i *Grundregeln*.

| Kommando | Syfte |
|---|---|
| `stitch generate screen --new-project "…" --prompt "…" --device DESKTOP\|MOBILE` | Nytt projekt och skärm (inget `create project`) |
| `stitch generate variants --count 1–5 --creative-range REFINE\|EXPLORE\|REIMAGINE` | Varianter |
| `stitch capture <url>` → `stitch upload screen` → `stitch edit screen <id> --prompt "…"` | För in en sida och gör om den |
| `stitch upload design DESIGN.md --project <id>` | Ladda upp kitets `design.md` |
| `stitch serve -p <id>` | Förhandsvisa lokalt |
| `stitch mcp install` | Officiell MCP-server, som Googles skills kräver |
| `stitch agent-skills add` | Skriver SKILL.md till `.agents/skills` |

- [N2] **Gör om bibliotekets egna sektioner, uppfinn inte layouter.** Rendera provsidan, för in den med `capture` och `upload screen`, och pröva kitets adjektiv med `edit screen`. Då utforskar Stitch ytan medan skelettet står fast. 🔧 ⚠️ Inte provat.
- [N2] **Prompter av stämningsadjektiv**, eftersom Stitch förstår stämning genom adjektiv (fallgrop 118); skillen `enhance-prompt` hjälper 🎥 *Stitch-skills-videon*.
- [N2] **`EXPLORE` för bredd, sedan `REFINE`;** `REIMAGINE` bara om inget är nära. Efter cirka tio varianter väljer Johnny bland de 2–3 bästa. 🔧 Johnny kan också markera en del i Stitch och beskriva ändringen 🎥 *Stitch-skills-videon*.
- [N2] **Kontrollera att skillen syns.** `agent-skills add` skriver till `.agents/skills`, och om Claude Code läser den mappen är inte verifierat; kopiera eller länka till `.claude/skills/` (fallgrop 1).
- [N2] **Googles stitch-skills** (Apache-2.0): `npx plugins add google-labs-code/stitch-skills --scope project --target claude-code`. De kräver MCP, vilket duger för kitarbete som görs sällan. Användbara: `design-md`, `extract-design-md`, `enhance-prompt`, `manage-design-system`. davideast/stitch-mcp behövs inte.
- [N2] **Verktygsmanifest** ur `stitch --help` och underkommandonas hjälp; agenten använder bara det som står där och listan görs om vid uppdatering (fallgrop 86) 🎥 *Astryx-videon*.

**Villkor:** Google gör inte anspråk på output och förbjuder inte kommersiell användning, men ger ingen ensamrätt. Stitch är Google Labs utan åtagande om drift, så exporter sparas lokalt. Kvoterna är inte bekräftade officiellt. 📄 `2026-10-14_ai-forordningen-och-rattigheter.md` §5.

### Tre riktningar till Johnny och kunden

- [N1] **Tre riktningar = startsidan i tre minimala kit.** Claude väljer tre kit efter briefens ton och intryck, med en mening per kit om varför, och bygger startsidan i varje kit med kundens riktiga texter och bilder (→ `2-7-innehall.md`), i mobil och dator och sida vid sida, så att valet gäller ytan 🎥 *4 Ways-videon*. Johnny ser **mobilen först**, så att måttstockens fråga 1 prövas redan här (`mattstock/mattstock.md`; `BESLUT.md` 2026-10-15). Bilderna är i första hand kundens egna; i övningssajterna firmans, från dess sajt. Saknas de används stock- eller AI-bilder enligt ärlighetsregeln (`2-7-innehall.md`; `BESLUT.md` 2026-10-15), och det som saknas antecknas ändå som en beställning till kunden; i webb-pro saknades materialet, och det gick inte att lösa med design 📄 `2026-10-15_webb-pro-genomgang.md`. Johnny ser riktningarna först och kan stryka, med en kort motivering i `domar.jsonl` (→ `3-2-granskning-och-kalibrering.md`); en struken riktning ersätts eller utgår. Sedan väljer kunden bland det Johnny släppt fram – i övningssajterna väljer Johnny i kundens ställe (`2-1-strategi.md`, *Övningsläget*) – och valet skrivs i `sites/<namn>/design.md` med kundens varumärkesfärg som accent och kundens egen logotyp. Ordningen gäller tills Johnny beslutar annat. 📄 `BESLUT.md` 2026-10-13 och 2026-10-15.
- [N2] **Kundens egna referenser och anti-referenser**, även som skärminspelning (Meng Tos *video to super prompt*) 🎥 *designskills-videon*, styr valet av kit tillsammans med bransch, målgrupp och rörelsebudget (→ `2-1-strategi.md`).
- [N2] **Riktningarna visar kitens provsidor** bredvid kundens sidor 🎥 *4 Ways-videon*.
- [N2] **Kunden ser riktningarna via en skyddad förhandsvisning** (→ `2-8-teknik-och-kvalitet.md`).
- [N2] **Kundens önskemål inom en riktning** blir accent eller godkända avvikelser i `sites/<namn>/design.md`, inte ett nytt kit. 🔧

### Referenser, originalitet och licens

- [N1] **Referensregeln.** En referens får bära layout, palett och typsnitt. Identitet, texter och bilder från andra företag kopieras inte. Referensen namnges i kitets `design.md`. Regeln gäller tills Johnny säger annat (`BESLUT.md` 2026-10-15; bilaga E 2.1). 📄 `BESLUT.md` (Licenserna); webb-pros `BESLUT.md` 2026-10-03.
- [N2] **Originalitetskontroll mot regeln.** Granskaren letar efter referensernas identitet (namn, logotyp, varumärkesgrafik, slogan), texter och bilder i resultatet; en träff är ett allvarligt fynd. Likhet i layout, palett och typsnitt är inget fynd. Riktiga referenser ger risk för kopiering, också när en annans sajt används som stilguide vid redesign (fallgrop 30, 119) 🎥 *Inspo-videon*, *Stitch-skills-videon*.
- [N2] **Beskrivning och värden till generatorn, inte referensbilden.** En bild ger nästan en kopia, med identitet och text; en beskrivning låter modellen hitta egen väg (fallgrop 75) (en källa – bänken; 🎥 *Boris Cherny-videon*). Bilderna går till Johnny och granskaren.
- [N1] **Licens per tillgång.** Varje tillgång har en känd rätt att användas och en rad i sajtens licenslista (källa, licens, villkor) innan den används. I den första sajten är det i praktiken typsnitt, ikoner och bilder; tabellen visar kraven per slag. Varför: fallgrop 95, 166, 177 🎥 *designskills-videon 2*, *Astra-videon*, *Jack Roberts-videon 2*.

| Tillgång | Krav | Källa |
|---|---|---|
| Typsnitt | OFL eller annan fri licens, självhostat. Fontshare (ITF:s EULA) används inte förrän villkoren lästs (*öppet – se `bilaga-e-oppna-fragor.md`*). | 📄 `lager-5-yta.md` §3 |
| Ikoner | Lucide (ISC), Tabler, Phosphor (MIT), Simple Icons (CC0; varumärkesägarens regler gäller). Iconify-set med GPL eller CC BY blockeras. | 📄 `lager-5-yta.md` §4 |
| Teman och kod | MIT och Apache får bli utgångsvärden, GPL bara parametrar. Tailwind Plus förbjuder teman och "website builders" ⚠️ (möjligen äldre licenskopia). | 📄 `lager-5-yta.md` §5; `kunskap/research/2026-10-15_kompetensluckor-och-kandidater-per-lager.md`, lager 4 |
| Komponenter (21st.dev, Aceternity UI, React Bits) | Licens per komponent; de går in i biblioteket (→ `2-4-skelett.md`), inte direkt i en kundsajt. | 🎥 *Astra-videon* |
| Lottie och rörelser | Licens per fil (→ `2-6-rorelse.md`). | 🎥 *Jack Roberts-videon 2* |
| Bilder och video | → `2-7-innehall.md`, samma krav på känd licens. | |
| Output från Stitch och Higgsfield | Inget anspråk från leverantören, men ingen ensamrätt eller unikhet. Higgsfields rätt att träna på uppladdat material är oklar; läs villkoren före kundmaterial. | 📄 `2026-10-14_ai-forordningen-och-rattigheter.md` §5 |
| Betalda källor (Mobbin, 21st m.fl.) | Webb-pros licensbesked har oifyllda platshållare. Hämta skriftliga medgivanden eller läs villkoren. | 📄 `2026-10-15_webb-pro-genomgang.md` |

Effekter från referenssajter → `2-6-rorelse.md`.

## Vad som kommer ut

Den första sajten ger tre minimala kit med var sin kort `design.md`, startsidan i varje kit, Johnnys strykningar i `domar.jsonl`, kundens val i `sites/<namn>/design.md` och sajtens licenslista.

- [N2] I biblioteket: 3–5 stilkit med alla axlar, tokens, full `design.md` och provsida, godkända av Johnny.
- [N2] Per kund: tre riktningar som Johnny sett och kunden valt bland, valt kit i `sites/<namn>/design.md` och en licenslista.

## Kompetens och källor

- [N2] **Egen skill:** ytskillen, destillerad ur better-colors, better-typography, better-ui, emil-design-eng, frontend-design och taste-skillsen, med *Refactoring UI* (med egna ord; kommersiell), Butterick och Vercels Web Interface Guidelines (MIT). Norm: WCAG 2.2 AA (1.4.3, 1.4.11, 1.4.4). Svensk mikrotypografi → `2-7-innehall.md`. 📄 `historik/karta/5-yta.md`; `lager-5-yta.md` §6.
- [N2] **Designkällor när kit tas fram**, aldrig i kundbygget:
  - [N2] Hela sajter: Inspo (MCP, MIT, 832 sajter, i projektscope; används redan i den första sajten enligt *Grundregeln*), godly.design, Land-book, Awwwards per kategori 🎥 *Astra-videon*, *Jack Roberts-videon 4*. Skärmar och mönster: Refero (MCP), Mobbin 🎥 *Jack Roberts Motion Design-videon*.
  - [N2] En förebild per sektion: navbar.gallery, footer.design, cta.gallery, 404s.design, unsection.com, bentogrids.com 🎥 *Jack Roberts-videon 2*.
  - [N2] Paletter: Coolors, utifrån paletter som fungerar 🎥 *Jack Roberts-videon 4*. Typsnitt: Typewolf, Fonts In Use, WhatTheFont; välj närmaste med fri licens 🎥 *Jack Roberts-videon 2*.
  - [N2] `design.md`-samlingar: Aura.build ⚠️ 🎥 *Opus 5.5-videon*. Open Designs DESIGN.md-format (Apache-2.0) kan lånas, men paketen bär stora varumärkens identitet 📄 `2026-10-15_kompetensluckor-och-kandidater-per-lager.md`, lager 5.
- [N2] **Destilleras, installeras inte:** Hallmarks och taste-redesigns listor mot AI-slop, Impeccables *critique*, *typeset* och *polish*, datan i UI UX Pro Max. design-md-planner och designmd.space är kandidater ⚠️.

**Verktyg för kiten:** de som nämns ovan, med inventeringens domar (Ta in, Pröva, Avstå; inga beslut fattade) i 📄 `inventering/inventering.json`, lager 5. Astra som designmodell prövas i eval → `3-3-sakerhet-och-installningar.md`. Kundens egna referenser → *Tre riktningar*.

## Kontroll

Hur granskningen går till står i `3-2-granskning-och-kalibrering.md`. Här står vad ytan bedöms mot.

**Mätbart**

- [N1] **Kontrast enligt WCAG 2.2 AA – grind.** Text 4,5:1, stor text 3:1, UI-komponenter och grafik 3:1. Varje text- och bakgrundspar i kitet har ett beräknat värde, och sajten mäts med axe bland de tio N1-kontrollerna (→ `2-8-teknik-och-kvalitet.md`). 📄 WCAG 1.4.3, 1.4.11.
  - [N2] Kontrasten spärras också i token-bygget (Terrazzos `a11y/min-contrast`).
- [N2] **Inga värden utanför kitet.** Designregelvakten stoppar färger och typsnitt i källkoden som inte finns i kitet och släpper igenom designvariabler. Undantag för `transparent`, `currentColor` och färger i bilder och SVG ⚠️ (provas först). Varför: fallgrop 18. Mekanismen → `3-3-sakerhet-och-installningar.md`.
- [N2] **Sökbara antimönster** i kitets `design.md` kontrolleras likadant; övriga blir granskningskriterier (fallgrop 109) 🎥 *designnivå-videon*.
- [N2] **`design.md` valideras med skript** innan kitet godkänns, annars läser vakter och granskare fel (fallgrop 63) 🎥 *Claude Design-videon*.
- [N2] **Checklistan premium mot basic**, 26 punkter med källa per rad 📄 `lager-5-yta.md` §6: kontrast, typstorlek, radavstånd, flytande typ, avstånd, radier och skuggor spärras i token-bygget; tabulära siffror, typsnittsladdning, ikoner och bilddimensioner kontrolleras efter bygget; bildinnehåll, komplexitet och felfrihet kräver omdöme. Trösklar utan norm är instruktioner.

**Granskningskriterier**

- [N1] **Konsekvens är inte karaktär.** En sida kan följa kitet och ändå vara generisk (fallgrop 85) 🎥 *Astryx-videon*. *Generisk* betyder det Johnnys måttstock säger: första skärmen säger inte vad, var och hur, och innehållet kunde höra till vem som helst (fråga 1 och 2 i `mattstock/mattstock.md`; `guide/README.md`, princip 12). **AI-utseende i sig är inget fynd.** Johnny godkände 4 av 7 AI-byggda sajter, och Claude dömde fel om fyra sajter just för att de såg AI-gjorda ut (`BESLUT.md` 2026-10-15). Karaktären kommer från kundens egna bilder, ord och lokala belägg. Granskaren dömer i måttstockens form (→ `3-2-granskning-och-kalibrering.md`).
- [N2] **Avstånd och linjering på pixelnivå**, med Jakub Krehels *better layout* som kriteriekälla 🎥 *designskills-videon*.
- [N2] **Versaler bara där kitet anger det**, då med 5–12 % spärrning 📄 Butterick. Ett allmänt förbud har en källa (en källa – bänken; 🎥 *Coding Sloth-videon*, fallgrop 196).

Hemvist i andra filer: sektion för sektion i full upplösning, jämförelse mot förebild i siffror, blind jämförelse mot referenser och Meng Tos Awwwards-kriterier → `3-2-granskning-och-kalibrering.md`. Blickprovet, femsekunderstestet för första skärmen → `2-4-skelett.md`.

## Hur självgående

I den första sajten är inget självgående: Johnny tittar på hela bygget, och riktningarna går enligt *Tre riktningar* (`5-byggplan.md`, steg 2).

- [N2] **Kiten är inte självgående.** Johnny och Claude bygger dem, och Johnny godkänner varje kit (`historik/karta/5-yta.md`).
- [N2] **Kundbygget är självgående inom kitet.** Byggaren väljer inga färger, typsnitt eller avstånd.
- [N3] **Förnyelse:** stryker Johnny ofta samma kit, eller väljer kunder det sällan, föreslår agenten att kitet förnyas. 🔧

*Öppet – se `bilaga-e-oppna-fragor.md`:* licensbeslutets räckvidd, Terrazzo och `[data-kit]`, Fontshares villkor och reserverade typsnittsnamn, Stitchs kvoter, och om Claude Code läser `.agents/skills`.
