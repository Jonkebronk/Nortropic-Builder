# Bilaga C – kontrollregister

**Status:** konsoliderad v1.0, 2026-10-15; uppdaterad samma dag efter ommärkningen (`konsolidering/skrivregler.md`, tillägget kl. 14.30, och `konsolidering/granskning-v1.0.md`). Sammanställd ur guidens filer som de ser ut efter ommärkningen; `n1-forsta-sajten.md` är genererad och räknas inte. Registret beskriver och skapar inga kontroller: varje rad bor i den fil som står under *Var*, och ändras kontrollen där ändras raden här. **De tio N1-kontrollerna definieras bara i `2-8-teknik-och-kvalitet.md`**; här återges de.

Regeln för vad som får vara en grind står i `README.md`: en **låst kontroll** eller grind kräver en **norm** (WCAG, lag, leverantörens egen dokumentation, standard) **eller två oberoende primärkällor**, räknade per primärkälla. Allt annat är en instruktion eller ett granskningskriterium *(en källa – bänken)*. Fynd mot ett kriterium med en källa får högst allvaret `medel` (`3-2`), så att kriteriet inte blir en grind bakvägen.

**Typerna i registret**

- **Låst kontroll** – körs av skript, hook, deny-regel eller bygget, kan inte ändras av den som bedöms och stoppar steget, publiceringen eller anropet. I tabellen över N1-kontrollerna motsvarar det `2-8`:s *Stopp*.
- **Grind** – villkor för att ett steg ska få gå vidare, avgjort av Johnny, kunden eller en sammanställning av kontroller och fynd.
- **Kontroll** – körs (automatiskt eller för hand) men rapporterar, flaggar eller varnar; stoppar inte, eller så säger filen inte att den gör det. Motsvarar `2-8`:s *Rapport*.
- **Granskningskriterium** – bedöms av granskaren eller Johnny och ger fynd.
- **Instruktion** – står som regel för byggaren eller granskaren men stoppar inget; ofta en grind eller ett kriterium i v0.74 som har en källa.

**Visningsbredder** – en gemensam uppsättning, som `2-4` och `2-8` hänvisar till: **320 CSS-px bara för reflow** (N1-kontroll 3); **375, 768 och 1280 px** för kontroller, skärmdumpar och granskning; **1920 px från N2**. I den första sajten visar provsidan startsidan i 375 och 1280 px (`2-4`).

**Förkortningar:** filerna i `guide/` skrivs utan ändelse (`2-8` = `2-8-teknik-och-kvalitet.md`); 1 = `1-kundens-vag.md`, 4 = `4-foretaget.md`, 5 = `5-byggplan.md`, A = `bilaga-a-verktyg.md`, B = `bilaga-b-skills.md`. *Analysen* = `kunskap/research/2026-10-15_guide-konsolideringsanalys.md`; *verifieringen* = `kunskap/research/2026-10-14_claude-code-verifiering.md`. Videornas kortnamn följer `kunskap/kallor.md`. När en rad har två nivåer eller två typer räknas den första i sammanställningen.

## Sammanställning

193 kontroller, grindar och kriterier.

| Nivå | låst kontroll | grind | kontroll | granskningskriterium | instruktion | Summa |
|---|---|---|---|---|---|---|
| N1 | 9 | 16 | 3 | 4 | 3 | 35 |
| N2 | 23 | 22 | 34 | 27 | 11 | 117 |
| N3 | 7 | 9 | 11 | 1 | 2 | 30 |
| N4 | 2 | 2 | 3 | 0 | 4 | 11 |
| **Summa** | **41** | **49** | **51** | **32** | **20** | **193** |

På N1 finns 11 kontroller, och de är de tio i `2-8` plus avgränsningen av byggsessionen (C167). Deny-reglerna (C166) är strukna (`BESLUT.md` 2026-10-15, *Inga spärrar*). De 16 grindarna på N1 är Johnnys och kundens godkännanden (stopp 1–6, omdirigeringskartan, nya sektioner, nya regler), kontrasten i kiten, formulärmönstret och flödets regler om belägg, färsk kontext, tid, tre utfall och kontroller före bygget. v0.74 hade ungefär 60 låsta kontroller och grindvillkor (analysen §7.1).

## N1-kontrollerna

Exakt de tio i `2-8-teknik-och-kvalitet.md`, *N1 – kontrollerna för första sajten*. Kontrollskriptet byggs i `5-byggplan.md`, steg 3, och körs mot det lokala bygget före Johnnys dom och, om sajten publiceras, mot den publicerade adressen som röktest. Kontrollerna avgör inte om ett steg är klart; det gör Johnnys dom.

| # | Kontroll | Vid träff |
|---|---|---|
| 1 | `astro build` går igenom utan fel (C1) | Stopp |
| 2 | Inga konsolfel; alla bilder laddas (C2); 2b: kartor, recensioner och sociala medier i ny flik på datorn | Rapport |
| 3 | Ingen horisontell scroll i 320 CSS-px bredd (C3) | Stopp |
| 4 | Den primära handlingen fungerar hela vägen (C4) | Stopp; synligheten på första skärmen: rapport |
| 5 | Varje faktapåstående finns i `fakta.md` – en läsning, inget skript (C5) | Stopp, `kritisk` |
| 6 | Inga platshållare i produktionsbygget (C6); 6b: policysidorna i sidfoten, och organisationsnumret för bolag; 6c: inga kakor utan samtycke, och samtyckesrutan följer PTS | Stopp; 6b rapport; 6c stopp |
| 7 | Unik titel och metabeskrivning, `sitemap.xml`; en `h1` per sida (C7); 7c: `robots.txt` släpper in sökrobotarna | Stopp; rapport för `h1` och 7c |
| 8 | axe med WCAG 2.2 A/AA ger 0 fel (C8) | Stopp |
| 9 | Lighthouse 100 i prestanda, tillgänglighet, bästa praxis och SEO (C9) | Rapport |
| 10 | Inga hemligheter i repot eller det byggda paketet (C10) | Stopp, `kritisk` |

Sju stoppar helt (1, 3, 4, 5, 6, 8, 10), två rapporterar (2, 9), och nr 7 stoppar för titel, beskrivning och sitemap men rapporterar för `h1`. Därtill Johnnys dom i varje steg (C140).

## Registret

### N1-kontrollerna (`2-8`)

| # | Kontroll | Var (fil, avsnitt) | Nivå | Typ | Grund | Hur den körs |
|---|---|---|---|---|---|---|
| C1 | **Nr 1.** `astro build` går igenom utan fel | 2-8 Kontroll N1 | N1 | låst kontroll (stopp) | 🔧 förutsättning för allt annat | Kontrollskriptet |
| C2 | **Nr 2.** Inga konsolfel; alla bilder laddas. **2b:** länkar till kartor, recensioner och sociala medier öppnas i ny flik på datorn och i samma flik på mobilen | 2-8 Kontroll N1; 2-6 Kontroll (N2: också med reducerad rörelse) | N1 | kontroll (rapport) | 🔧 egen kodstandard (v0.74 §10.3); ingen norm. 2b: Johnnys beslut (`BESLUT.md` 2026-10-16); 📄 WCAG-teknik G201 för beskedet till skärmläsare | Kontrollskriptet |
| C3 | **Nr 3.** Ingen horisontell scroll i 320 CSS-px bredd | 2-8 Kontroll N1; 2-4 Kontroll hänvisar | N1 | låst kontroll (stopp) | Norm: 📄 WCAG 2.2, 1.4.10 Reflow | Kontrollskriptet (Playwright) |
| C4 | **Nr 4.** Den primära handlingen fungerar hela vägen: telefon- eller mejllänken har numret eller adressen ur `fakta.md`, eller bokningslänken svarar och leder till kundens bokning; publiceras ett formulär sparar det och mejlar. Rapport: kontaktvägen och en klickbar `tel:`-länk syns på mobilens första skärm i 375 px (måttstocken, fråga 1) | 2-8 Kontroll N1; 2-3 Vägar och tillstånd (nyckelresan); 3-2 Körbara kontroller | N1 | låst kontroll (stopp) | Två källor för körbara kontroller (analysen §4.3: 🎥 loop-videon + 🎥 Coding Sloth-videon); att pröva handlingen hela vägen är egen tillämpning 🔧 | Kontrollskriptet (Playwright) |
| C5 | **Nr 5.** Varje faktapåstående finns i `fakta.md`, annars `kritisk`; en bild som ser ut att visa kundens verklighet utan att vara kundens är också `kritisk`; socialt bevis ingår | 2-8 Kontroll N1; 2-7 Faktabasen (vad den omfattar) | N1 | låst kontroll (stopp) | Tre källor (analysen §4.3): 🎥 Fable-videon + 🎥 Jack Roberts-videon 3 + 📄 Anthropic | En läsning av texterna mot `fakta.md`, inget skript; från steg 4 även granskaren |
| C6 | **Nr 6.** **6c (stopp):** inga kakor vid ett besök utan svar; samtyckesrutan visar Godkänn och Neka likadant, inget körs före svaret, nej håller och ja aktiverar (9 kap. 28 § LEK; PTS; `BESLUT.md` 2026-10-16). **6b (rapport):** sidfoten länkar till *Integritet och kakor*, och har organisationsnumret när företaget är ett bolag (`BESLUT.md` 2026-10-16). Inga platshållare i produktionsbygget: `[[PLATSHÅLLARE: …]]`, fyllnadstext och bilder märkta som platshållare ger noll träffar | 2-8 Kontroll N1; 2-7 Platshållare | N1 | låst kontroll (stopp) | En platshållare är ett obekräftat faktum, så kontrollen vilar på faktakontrollens tre källor; publicerade platshållare: 🎥 Jack Roberts-videon 3 | Kontrollskriptet (sökning i bygget) |
| C7 | **Nr 7.** Unik titel och metabeskrivning per sida, `sitemap.xml` finns; en `h1` per sida. **7c:** `robots.txt` stänger inte ute Googlebot, Bingbot, OAI-SearchBot, PerplexityBot, Applebot eller Google-Extended | 2-8 Kontroll N1 | N1 | låst kontroll (stopp; `h1` och 7c rapport) | 📄 Google Search Central (titlar) + 📄 *$10K Website Kit*, *Websites for Normal People*; `h1` 🔧 egen kodstandard. 7c: 📄 Google, OpenAI, Perplexity och Apple om sina robotar (`BESLUT.md` 2026-10-16) | Kontrollskriptet |
| C8 | **Nr 8.** axe med WCAG 2.2 A/AA-taggarna ger 0 fel i Chromium (bl.a. kontrast, alt-texter, etiketter, tomma länkar) | 2-8 Kontroll N1; 2-5 och 2-7 hänvisar | N1 | låst kontroll (stopp) | Norm: 📄 WCAG 2.2 | @axe-core/playwright |
| C9 | **Nr 9.** Lighthouse 100 i prestanda, tillgänglighet, bästa praxis och SEO, i mobil och dator, mot det lokala bygget eller produktion; en uppvärmning och medianen av tre körningar | 2-8 Kontroll N1; A Lighthouse-raden | N1 | kontroll (rapport) | Johnnys beslut (`BESLUT.md` 2026-10-16), ingen norm; 📄 Chrome for Developers (skalan; 100 *"not expected"*) och Lighthouse docs/variability.md (medianen) | Lighthouse |
| C10 | **Nr 10.** Inga hemligheter i repot eller i det byggda paketet (HTML, JS och källkartor söks efter nyckelformat); träff = `kritisk` | 2-8 Kontroll N1; 3-3 Första sajten och Hemligheter | N1 | låst kontroll (stopp) | 📄 Cloudflare (`wrangler secret put`) + 🎥 Ebbelaar-intervjun | Kontrollskriptet |

### Lager 2.1 Strategi

| # | Kontroll | Var (fil, avsnitt) | Nivå | Typ | Grund | Hur den körs |
|---|---|---|---|---|---|---|
| C11 | Kunden bekräftar sammanfattningen och varje faktum, och Johnny godkänner briefen och faktabasen innan nästa lager börjar; bekräftelsen gäller fakta och mål, inte pris, design eller publicering (stopp 1) | 2-1 Kontroll; 2-7 Faktabasen; 3-2 Stoppen; 5 steg 1 | N1 | grind | Två källor: 📄 GOV.UK *check answers* + 📄 Anthropics `smb-onboard` | Kunden; Johnny |
| C12 | Intervjuutskriften följer hantverket: en fråga i taget, öppna frågor om verkliga händelser, inga föreslagna svar | 2-1 Intervjun | N1 | granskningskriterium | 📄 Geiecke & Jaravel; Hall; *Mom Test* via pm-skills | Anges inte |
| C13 | Nordstjärnan i briefen: saknad baslinje står som *Inte angivet* och mäts första månaden; briefen går ändå vidare | 2-1 Nordstjärna | N1 | instruktion | En källa – bänken: 5000-timmars- och konsult-videon (grind i v0.74, analysen §4.2) | – |
| C14 | Egen granskare: kan nästa lager börja med underlaget, och är varje påstående i briefen märkt? Luckorna blir följdfrågor | 2-1 Kontroll | N2 | granskningskriterium | 🔧 kartan; 📄 marketingskills `competitor-profiling` | Granskare med ren kontext |
| C15 | Kunden betygsätter sammanfattningen 1–4; betygen följs som mått på intervjuskillen | 2-1 Kontroll | N2 | kontroll | 📄 Geiecke & Jaravel | Kunden |
| C16 | Inget förvaltningsavtal utan en nordstjärna som kunden godkänt | 2-1 Nordstjärna; 4 Tjänstetrappan hänvisar | N3 | instruktion | En källa – bänken: 🎥 konsult-videon | Johnny vid avtalet |

### Lager 2.2 Omfattning

| # | Kontroll | Var (fil, avsnitt) | Nivå | Typ | Grund | Hur den körs |
|---|---|---|---|---|---|---|
| C17 | Omdirigeringskartan, när den nya sajten ersätter en befintlig på kundens domän: varje gammal adress får en 301 direkt till sin motsvarighet eller ett beslut med skäl, och Johnny godkänner kartan före publiceringen | 2-2 Spår B; Kontroll | N1 vid ombyggnad | grind | Norm: 📄 Google Search Central, flytt med URL-ändringar | Johnny |
| C18 | Kartan täcker varje gammal adress i sitemapen, crawlen och Search Console | 2-2 Kontroll | N2 | kontroll | Norm: 📄 Google Search Central | Automatiskt när kartan är klar |
| C19 | Varje toppuppgift har en sida eller funktion; rapporterar, stoppar inte | 2-2 Kontroll | N2 | kontroll | En källa: kartan | Automatiskt |
| C20 | Varje sida har en källa till sitt innehåll: faktabasen, kunden eller inventeringen; rapporterar | 2-2 Kontroll | N2 | granskningskriterium | En källa: kartan | Anges inte |
| C21 | Lagkravsprofilen finns innan omfattningen godkänns; saknas svar behandlas kunden som om den inte är mikroföretag | 2-2 Kontroll; Lagkrav per kund | N2 | grind | Lag (tolkning): tillgänglighetslagen 2023:254, 📄 research 2026-10-14 | AI:n sorterar; bedömningen är kundens |
| C22 | Måste är högst cirka 60 procent av insatsen | 2-2 Kontroll | N2 | granskningskriterium | 📄 DSDM ("typically") | Anges inte |
| C23 | Varje funktion som bygger på en tredjepartstjänst har ett beslut med kostnad i tre lägen | 2-2 Kontroll | N2 | kontroll | En källa – bänken: 🎥 advise-videon | Anges inte (beslutskartan) |

### Lager 2.3 Struktur

| # | Kontroll | Var (fil, avsnitt) | Nivå | Typ | Grund | Hur den körs |
|---|---|---|---|---|---|---|
| C24 | Ingen föräldralös sida: en genomsökning från startsidan når varje publik sida via `<a href>` | 2-3 Kontroll | N2 | låst kontroll | Norm: 📄 Google, crawlbara länkar | Skript (genomsökning) |
| C25 | Två till fyra nyckelresor körs i webbläsaren i mobil- och datorbredd; minst en går hela vägen till den primära handlingen (i N1 en resa = nr 4) | 2-3 Kontroll | N2 | låst kontroll | Två källor för körbara kontroller: 🎥 loop-videon + 🎥 Coding Sloth-videon; resorna är egen tillämpning 🔧 | Playwright |
| C26 | Sidkartan stäms av mot faktabasen: varje huvudtjänst har en sida, varje sida en primär handling och en besökarfråga eller söksträng; rapporterar | 2-3 Kontroll | N2 | kontroll | 🔧 | Automatiskt |
| C27 | Klickdjupet flaggas: varje sida nås med högst två klick från startsidan | 2-3 Kontroll | N2 | kontroll | En källa – bänken: Mueller 2018 via Search Engine Journal | Skript (flaggar) |
| C28 | Inga lekfulla hinder före den primära handlingen: ingen animation, inget spelmoment och ingen interaktion mellan besökaren och handlingen | 2-3 Vägar och tillstånd (N2); 3-2 Granskaren (exempel i N1-checklistan) | N2 (3-2: N1) | granskningskriterium | En källa – bänken: 🎥 Jack Roberts Motion Design-videon | Granskaren |
| C29 | Bytestestet: går ortnamnet att byta utan att texten blir fel är ortssidan en dörrsida | 2-3 Ortssidor | N2 | granskningskriterium | En källa – bänken: claude-seo `seo-local` | Granskaren |
| C30 | Trädtest med AI som rök-test: minst fem körningar, slumpad ordning, misslyckanden blir röda flaggor; validerar aldrig | 2-3 Kontroll | N2 | kontroll | 📄 MeasuringU; NN/g om syntetiska användare; Kuric m.fl. 2026 | Delagent |
| C31 | Trunk test per sidmall | 2-3 Kontroll | N2 | granskningskriterium | En källa – bänken: Krug | Granskaren |
| C32 | Mänskligt trädtest per branschprofil, inte per kund | 2-3 Kontroll | N2 | kontroll | 📄 NN/g, *Tree Testing* | Testpersoner (UXtweak, gratisnivå) |

### Lager 2.4 Skelett

| # | Kontroll | Var (fil, avsnitt) | Nivå | Typ | Grund | Hur den körs |
|---|---|---|---|---|---|---|
| C33 | Saknas en sektion byggs den i biblioteket först, med Johnnys godkännande; kundbygget improviserar ingen sektion. Från N2 godkänner Johnny varje sektion och variant på provsidan | 2-4 Vad byrån gör; Hur sektionerna prövas; Hur självgående | N1 (provsidan N2) | grind | Beslut: `BESLUT.md` 2026-10-13 18:52 (eget bibliotek); 🔧 | Johnny |
| C34 | Blickprovet (femsekunderstestet): en separat AI ser första vyn i 375 och 1280 px utan källkod och säger vad, var och vad man gör; avviker svaret från briefen är det ett fynd, högst `medel` | 2-4 Kontroll (enda platsen); 2-5 och 2-7 hänvisar | N1 | granskningskriterium | En källa – bänken: 🎥 Jack Roberts-videon 2 (efter Krug, inte läst) | Separat AI |
| C35 | Klickytor minst 24 × 24 CSS-px, eller tillräckligt avstånd enligt kriteriet | 2-4 Kontroll; 2-8 Kodstandard | N2 | låst kontroll | Norm: 📄 WCAG 2.2, 2.5.8 (AA) | Kontrollskriptet från sajt 2 |
| C36 | 44 × 44 px för knappar, menyknappen och fristående länkar (2-4); för primära knappar (2-8) | 2-4 Kontroll; 2-8 Kodstandard | N2 | granskningskriterium | Kartan och webb-pros husval; 📄 WCAG 2.5.5 är AAA och ingen norm för en låst kontroll | Granskaren |
| C37 | Fokus syns på allt som nås med tangentbordet | 2-4 Kontroll; 2-8 Kodstandard | N2 | låst kontroll | Norm: 📄 WCAG 2.2, 2.4.7 (AA) | Kontrollskriptet från sajt 2 |
| C38 | Inga överlappande eller avklippta element i visningsbredderna; rapporterar | 2-4 Kontroll | N2 | kontroll | 🔧 | Automatiskt |
| C39 | Skelettplanen följer mallen, eller avvikelsen är loggad som antagande; rapporterar | 2-4 Kontroll | N2 | kontroll | 🔧 | Anges inte |
| C40 | Varianterna skiljer sig på riktigt; en kritiker kontrollerar | 2-4 Hur sektionerna prövas | N2 | granskningskriterium | En källa – bänken: 🎥 ADHD-videon | Kritiker (agent) |
| C41 | Tangentbord och skärmläsare: fokusordning, menyns Escape, rubriker i `<summary>` | 2-4 Hur sektionerna prövas | N2 | kontroll | 📄 O'Hara (data 2018–2021 ⚠️) | För hand |

### Kantfall

| # | Kontroll | Var (fil, avsnitt) | Nivå | Typ | Grund | Hur den körs |
|---|---|---|---|---|---|---|
| C42 | Innehåll i värsta fall: lång rubrik, långa sammansatta ord, tomt fält, saknad bild, en respektive tolv poster | 2-4 Hur sektionerna prövas | N2 | kontroll | 🔧 (better-break; idé ur Emils `break-ui` via 📄 *$10K Website Kit*) | Provsidan i biblioteket |
| C43 | Spritt pass för kantfall: isolerade agenter med ett perspektiv var prövar biblioteket – långa texter och tomma tillstånd, långsamt nät, skärmläsare och tangentbord, ovanliga skärmbredder, felaktig inmatning i formulär, reducerad rörelse, innehåll i värsta fall. En kritiker sållar; de förslag som håller blir kontroller som Johnny godkänner och som förs in här. Inga är godkända än | 2-4 Hur sektionerna prövas | N2 | kontroll | En källa: 🎥 ADHD-videon / 🔧 | Isolerade agenter och en kritiker; Johnny |
| C44 | Bokning (väg D): dubbelbokningar, återbetalningar och tidszoner frågas fram innan bokningen planeras; Durable Objects hindrar dubbelbokning | 2-2 Funktioner; 2-8 Väg B–D hänvisar hit | N3 | instruktion | En källa: 🎥 Nate Herk 100-repon-videon (Addy Osmanis agent-skills); tekniken 📄 research §10 (egen bedömning) | Anges inte |

### Lager 2.5 Yta

| # | Kontroll | Var (fil, avsnitt) | Nivå | Typ | Grund | Hur den körs |
|---|---|---|---|---|---|---|
| C45 | Kontrast enligt WCAG 2.2 AA: text 4,5:1, stor text och gränssnitt 3:1; varje färgpar i kitet har ett beräknat värde | 2-5 Kontroll | N1 (N2 även i token-bygget) | grind | Norm: 📄 WCAG 1.4.3, 1.4.11 | Beräkning i kitet; på sajten nr 8; N2 Terrazzo `a11y/min-contrast` |
| C46 | Konsekvens är inte karaktär: följer sidan kitet men känns generisk är det ett fynd; leta i de fem tecknen på AI-slop (typografi, bilder, hierarki, färg, avstånd); högst `medel` | 2-5 Kontroll | N1 | granskningskriterium | En källa – bänken: 🎥 Astryx-videon; 🎥 Jack Roberts designgeni-videon | Johnny; granskaren från steg 4 |
| C47 | Johnny godkänner varje stilkit: godkänt eller underkänt med kort kritik | 2-5 Så tas ett kit fram, steg 7; Hur självgående | N2 | grind | 🔧 kartan (`historik/karta/5-yta.md`) | Johnny |
| C48 | Inga värden utanför kitet: färger och typsnitt som inte finns i sajtens `design.md` blockeras; variabler släpps igenom | 2-5 Kontroll; 3-3 Designregelvakt | N2 | låst kontroll | 🔧 upprätthåller det låsta kitet; varför: fallgrop 18 (en video) | `PreToolUse`-hooken vid skrivning i `src/`; slås på efter prov |
| C49 | Sökbara antimönster i kitets eller sajtens `design.md` blockeras; inga globala förbud | 2-5 Kontroll; 3-3 Designregelvakt | N2 | låst kontroll | Listan är Johnnys beslut per kit; idén en källa – bänken (🎥 designnivå-videon) | Samma hook |
| C50 | `design.md` valideras med skript innan kitet godkänns | 2-5 Kontroll | N2 | kontroll | En källa: 🎥 Claude Design-videon | Skript |
| C51 | Checklistan premium mot basic, 26 punkter: en del spärras i token-bygget, en del kontrolleras efter bygget, en del kräver omdöme | 2-5 Kontroll | N2 | kontroll (blandad; trösklar utan norm är instruktioner) | 📄 källa per rad (`lager-5-yta.md` §6) | Token-bygget, skript, granskaren |
| C52 | Avstånd och linjering på pixelnivå | 2-5 Kontroll | N2 | granskningskriterium | En källa: 🎥 designskills-videon (Krehels *better layout*) | Granskaren |
| C53 | Versaler bara där kitet anger det, då med 5–12 % spärrning; annars inga versaler i rubriker och knappar | 2-5 Kontroll; 2-7 AI-signaturer | N2 | granskningskriterium (2-7: granskningsförslag) | Spärrningen 📄 Butterick; förbudet en källa – bänken (🎥 Coding Sloth-videon; låst kontroll i v0.74) | Granskaren |
| C54 | Originalitetskontroll: referensernas identitet, texter och bilder i resultatet är ett allvarligt fynd; likhet i layout, palett och typsnitt är inget fynd | 2-5 Referenser | N2 | granskningskriterium | Referensregeln (`BESLUT.md`, licenserna; webb-pro 2026-10-03), *öppet*; varför: 🎥 Inspo-videon, Stitch-skills-videon | Granskaren |
| C55 | Kiten skiljer sig på riktigt; kritikern prövar nya kit mot de befintliga (nyhet, genomförbarhet, passform) | 2-5 Så tas ett kit fram, steg 8; Spridd idégenerering | N2 | granskningskriterium | En källa: 🎥 ADHD-videon | Kritiker (agent) |

### Lager 2.6 Rörelse

| # | Kontroll | Var (fil, avsnitt) | Nivå | Typ | Grund | Hur den körs |
|---|---|---|---|---|---|---|
| C56 | Reducerad rörelse: sidan renderas med `prefers-reduced-motion: reduce`, och ingenting förflyttas, skalas eller roteras. Regeln gäller från N1, kontrollen från N2 | 2-6 Kontroll; Policyn | N2 | grind | Norm: 📄 WCAG 2.3.3 (AAA) med teknik C39 | Kontrollskriptet från sajt 2 |
| C57 | Fem sekunder: skärmbilder efter 6 och 7 sekunder utan interaktion är lika, eller en pausknapp finns | 2-6 Kontroll | N2 | grind | Norm: 📄 WCAG 2.2.2 (A); metoden 🔧 webb-pro | Kontrollskriptet från sajt 2 |
| C58 | Statisk sökning: durationer, studsande eller elastiska kurvor, `transition: all`, animerade egenskaper utöver transform, opacitet och färg; stoppar inte | 2-6 Kontroll | N2 | kontroll | En källa – bänken: Emils regler via 📄 *$10K Website Kit* (låsta kontroller i v0.74) | Skript (rapport) |
| C59 | Bildfrekvens vid scroll och layoutskiften mäts | 2-6 Kontroll | N2 | kontroll | Hänvisar till 2-8, som bara mäter CLS | Lighthouse CI (CLS) |
| C60 | Passar rörelsen målgruppen och budgeten? | 2-6 Rörelsebudget; Kontroll | N2 | granskningskriterium | En källa – bänken: 🎥 Astra-videon (låst kriterium i v0.74) | Granskaren |
| C61 | Rörelse granskas på video: normal och snabb scroll, dator och mobil, med och utan `reduce`; det som inte syns märks *för lite information* | 2-6 Kontroll; 3-2 När en granskare inte räcker | N2 | granskningskriterium | En källa – bänken: 🎥 loop-nivåvideon | Granskaren |
| C62 | Tjänar rörelsen innehållet? Överlast, tempo och flimmer vid snabb scroll, sömlösa loopar | 2-6 Kontroll | N2 | granskningskriterium | En källa: 🎥 Stitch-videon | Granskaren |
| C63 | Budgeten expressiv och blickfånget godkänns av Johnny i briefen (N1 har bara budgeten sparsam) | 2-6 Rörelsebudget; Hur självgående | N2 | grind | 🔧 | Johnny |
| C64 | Inga automatiska karuseller (2-6); *inga karuseller* (2-8) | 2-6 Policyn; 2-8 Kodstandard | N2 | instruktion (2-6) / granskningskriterium (2-8) | 2-6: 📄 NN/g och WCAG 2.2.2; 2-8: webb-pros husval, inte norm | Byggaren / granskaren |

### Lager 2.7 Innehåll

| # | Kontroll | Var (fil, avsnitt) | Nivå | Typ | Grund | Hur den körs |
|---|---|---|---|---|---|---|
| C65 | Ingen text i bild eller video, utom logotyper och skyltar, med textigenkänning; träff = `hög`. Regeln gäller från N1, då Johnny och från steg 4 granskaren ser bilderna | 2-7 Bilder; Kontroll | N2 | låst kontroll | Norm: 📄 WCAG 2.2, 1.4.5 | Textigenkänning |
| C66 | Sökning efter siffror nära *kunder*, *år*, *uppdrag* och *omdömen* som stöd för faktakontrollen | 2-7 Kontroll | N2 | kontroll | 📄 webb-pro `copy-kontroll.md` | Skript (hjälpmedel) |
| C67 | Alt-textens kvalitet; kunden bekräftar alt-texterna (att `alt` finns: nr 8) | 2-7 Bilder; Kontroll | N2 | granskningskriterium | 📄 W3C:s beslutsträd och 1177; WCAG 2.2, 1.1.1 | Granskaren; kunden |
| C68 | Inget långt tankstreck (—) i svensk sajttext; träff högst `medel` | 2-7 Texterna; Kontroll | N2 | granskningskriterium (förslag) | En källa – bänken tills Språkrådets *Svenska skrivregler* är läst: 📄 Kunskapsbladet (andrahand), 🎥 sex-färdigheter-videon (låst kontroll före ommärkningen) | Granskaren |
| C69 | Inga GPS-fält i publicerade bilder | 2-7 Bilder; Kontroll | N2 | kontroll | Lag (tolkning): GDPR, anteckningarna lager 6–7 §4 | Anges inte |
| C70 | Konkret i stället för generiskt, AI-signaturer i text, textmängd (en sak per sektion), klarspråk, tillstånd för logotyper och citat (instruktion tills marknadsföringslagen lästs ⚠️) | 2-7 Texterna; AI-signaturer; Kontroll | N2 | granskningskriterium | Klarspråk 📄 NN/g; konkret och AI-signaturer mest en källa: 🎥 Jack Roberts-videon 2, Nate Herk 100-repon-videon; 📄 marketingskills `copywriting` | Granskaren |
| C71 | Bytestest och svenska copyfynd (byråfraser, jargong, *Välkommen till …* m.fl.) som rapport | 2-7 Texterna; AI-signaturer; Kontroll | N2 | granskningskriterium (förslag) | En källa – bänken: 📄 marketingskills `copywriting`; webb-pro `copy-kontroll.md` | Granskaren |
| C72 | Språkgrinden: Vale med `Nortropic-sv` (stavning, LIX som varning, tankstreck, AI-mönster); en regel stoppar först med norm eller två källor och en korpusmätning | 2-7 Kompetens; Kontroll | N2 | kontroll (rapport) | 📄 rapporten lager 7 (llepafils-metoden) | Vale på all text |
| C73 | Ordgräns per hero och sektion | 2-7 Texterna | N2 | instruktion | Gränsvärdet saknar källa (låst kontroll i v0.74, analysen §4.2) | Sätts efter Johnnys domar |

### Lager 2.8 Teknik och kvalitet, utöver de tio

| # | Kontroll | Var (fil, avsnitt) | Nivå | Typ | Grund | Hur den körs |
|---|---|---|---|---|---|---|
| C74 | Ett formulär publiceras bara med hela mönstret: det sparar före mejlet och har spamskydd | 2-8 Formulär | N1 om ett formulär publiceras | grind | 📄 *Websites for Normal People* (spara först); 📄 Cloudflare (Turnstile valideras på servern) | Anges inte (formulärtestet från N2) |
| C75 | Kodstandarden: semantik, tillgänglighet med WCAG-kriterier, formulär, prestanda, ordning. WCAG 2.2 AA som golv gäller från N1 | 2-8 Kodstandard | N2 | granskningskriterium | Tillgänglighetsdelen norm: 📄 WCAG 2.2 AA; övrigt 🔧 (v0.74 fas 6b) | Byggaren följer, granskaren läser mot; `/code-review` |
| C76 | `/security-review` före varje publicering med ändrad kod; fynd som är `kritisk` eller `hög` rättas före publicering | 2-8 Säkerhetsgranskning; 3-3; A | N2 | grind | 📄 verktyget verifierat (`2026-10-14_claude-code-verifiering.md`, 9h); stoppet 🔧 | `/security-review` på gren med `origin`, starkaste modellen |
| C77 | Formuläret granskas särskilt: fast mottagare, servervalidering, tidsfällans klocka, felvägarna | 2-8 Säkerhetsgranskning | N2 | granskningskriterium | 🔧 webb-pro `formularsakerhet.md` | Granskningen (3-2) |
| C78 | Vid ombyggnad svarar varje gammal URL eller omdirigeras med 301; ingen ger 404 utom medvetet borttagna | 2-8 Publicering; 2-2 Kontroll ("den låsta kontrollen") | N2 | låst kontroll | 2-2: norm 📄 Google Search Central; 2-8: 🎥 4 Ways-videon / 🔧 | Skript mot den publicerade adressen |
| C79 | Prestanda i labb: LCP ≤ 2 500 ms, CLS ≤ 0,1, TBT ≤ 200 ms; mobil, 3–5 körningar, medianen gäller | 2-8 Kontroll N2 | N2 | låst kontroll | 📄 web.dev, Core Web Vitals | Lighthouse CI mot `dist/` |
| C80 | Bildvikt mäts genom LCP; *WebP under 200 kB* är ingen kontroll | 2-8 Kodstandard; 2-7 Bilder | N2 | instruktion | En källa – bänken: 📄 *$10K Website Kit* (låst kontroll i v0.74; krockar med AI-metadata, M19) | – |
| C81 | Interna länkar: 0 trasiga | 2-8 Kontroll N2 | N2 | låst kontroll | 🔧 (v0.74 fas 6c); lychees exitkod | lychee `--offline --include-fragments` |
| C82 | Utan JavaScript syns och fungerar sidornas innehåll och navigering; rapporterar, stoppar inte | 2-8 Kontroll N2; regeln *HTML först* i 2-4 (N1); 2-6 hänvisar | N2 | kontroll (rapport) | En källa – bänken: 📄 GOV.UK, progressive enhancement | Playwright med JavaScript avstängt |
| C83 | SEO utöver N1: `lang="sv"`, kanonisk https-adress, Open Graph och delningsbild, `robots.txt` som inte blockerar CSS eller JS, sitemap med bara publika sidor, ingen `noindex` i produktion | 2-8 Kontroll N2 | N2 | låst kontroll | 📄 Google Search Central; 📄 *$10K Website Kit*, *Websites for Normal People* | Egna DOM-kontroller |
| C84 | Strukturerad data: 0 fel; `name` och `address` finns; namn, adress, telefon och öppettider stämmer med faktabasen och syns i texten | 2-8 Kontroll N2 | N2 | låst kontroll | 📄 Google: LocalBusiness och riktlinjerna för strukturerad data | schema-dts i bygget, validatorn på byggd HTML |
| C85 | Huvudena i *Publicering* finns, också CSP och Worker-svarens; MDN Observatory minst A (90) | 2-8 Kontroll N2; Publicering | N2 | låst kontroll | 📄 Cloudflare, MDN | Playwright mot förhandsadressen (Access service token); Observatory mot produktion |
| C86 | Tillgänglighet i Chromium och WebKit, också med menyn öppen och formulärfelen framkallade: 0 fel | 2-8 Kontroll N2 | N2 | låst kontroll | Norm: 📄 WCAG 2.2 | axe |
| C87 | Integritet vid första laddningen: inga kakor, ingen lagring och inga anrop utanför tillåtelselistan före samtycke; neka och godkänn i samma lager; länk till integritetspolicyn i sidfoten och vid varje formulär | 2-8 Kontroll N2 | N2 | låst kontroll | Lag: 📄 LEK 9 kap. 28 §, PTS | Playwright |
| C88 | Formulär: märkt testinskick mot staging – sparat, mejlet accepterat, bekräftelsemejlet framme | 2-8 Kontroll N2; Formulär | N2 | låst kontroll | 🔧 | Skript mot staging |
| C89 | Bekräftelsemejlet testat i Outlook, Gmail och Apple Mail före publicering | 2-8 Formulär | N2 | kontroll | En källa – bänken: 🎥 Jack Roberts designgeni-videon och Jack Roberts-videon 4 | Testverktyg ej valt ⚠️ |
| C90 | Manuell tillgänglighet vid lansering: tangentbord, fokus, formulärfel, zoom | 2-8 Kontroll N2 | N2 | kontroll | 📄 GDS (axe hittade 29 %, bästa verktyg 40 %) | För hand |
| C91 | Teckengränser för titel och beskrivning ger bara varning | 2-8 Kontroll N2 | N2 | kontroll | 📄 Google, *Influencing title links* | Skript (varning) |
| C92 | Rich Results Test vid lansering och när schemat ändras | 2-8 Kontroll N2 | N2 | kontroll | 📄 Google | För hand |
| C93 | WCAG-EM 2.0 vid lansering och sedan årligen: urval, tangentbord, skärmläsare, zoom 200 och 400 % | 2-8 Kontroll N3; 2-9 Årligen | N3 | kontroll | Norm: 📄 W3C WCAG-EM 2.0 | För hand och med AI; rapport till kunden |
| C94 | Supabase Security och Performance Advisor utan varningar (säkerhet = `kritisk`, prestanda = `medel`) | 2-8 Väg B–D | N3 | låst kontroll | 📄 Supabase, Advisors | `get_advisors` eller `supabase db advisors` |
| C95 | E-postbekräftelse vid registrering påslagen i produktion; avstängd = `kritisk` | 2-8 Väg B–D | N3 | låst kontroll | 🎥 Jack Roberts-videon 4 + 📄 Supabase-dokumentationen (analysen §4.2) | Anges inte |
| C96 | Inga arbetsverktyg i produktion: markeringen från Variate eller annat utvecklingsverktyg i produktionsbygget stoppar publiceringen | 2-8 Publicering; 3-5 Variate | N4 | låst kontroll | 📄 `2026-10-14_stitch-och-verktyg.md` (Variate bara för utveckling) | Sökning i produktionsbygget |
| C97 | Säkerhetsgranskning på varje PR när förvaltningens kö körs obevakat | 2-8 Säkerhetsgranskning; Hur självgående | N4 | kontroll | 🎥 Fable 5-videon ⚠️ | GitHub Action |

### Lager 2.9 Drift och förvaltning

| # | Kontroll | Var (fil, avsnitt) | Nivå | Typ | Grund | Hur den körs |
|---|---|---|---|---|---|---|
| C98 | Dagligt röktest mot produktionen hela vägen till den primära handlingen; drifttiden mäts av en vakt hos en annan leverantör | 2-9 Schemalagda kontroller | N3 | kontroll | 🔧; vakten: anteckningarna lager 9, fråga 2 | Skript på schema |
| C99 | Dagligt formulärtest till inkorgen med bekräftelsemejlet; testinskick når aldrig kunden | 2-9 Schemalagda kontroller; 2-8 Formulär | N3 | kontroll | 🔧 | Skript på schema |
| C100 | Veckovis: Search Console (indexeringsfel, nya 404:or), beroenden med kända sårbarheter, certifikatets och domänens utgångsdatum, prestanda (CrUX eller labb) | 2-9 Schemalagda kontroller | N3 | kontroll | 📄 API:erna; prestandagränserna i 2-8 | Skript på schema |
| C101 | Månadsvis säkerhetsgranskning med läsrätt; fynd blir ändringar på gren | 2-9 Schemalagda kontroller; 2-8 | N3 | kontroll | Verktyget enligt 2-8 | `/security-review` eller valt verktyg |
| C102 | Månadsvis *ny besökare*: utforskningstestet från början | 2-9 Schemalagda kontroller; 3-2 | N3 | kontroll | En källa – bänken: 🎥 Grok Bot-videon | Delagent med webbläsare |
| C103 | Kvartalsvis arkitekturgranskning av sajtens kod; fynd till kön | 2-9 Schemalagda kontroller; 3-4 hänvisar | N3 | granskningskriterium | Två källor (analysen §4.3): 🎥 Ebbelaar-intervjun + Pococks skill via två kanaler; 📄 skillen (MIT) | Pococks `improve-codebase-architecture` |
| C104 | AEO: samma frågor till AI-sökmotorerna varje månad, ställda på kundens ort, tre körningar per motor; citaten i Bings AI Performance; bara trenden räknas | 2-9 Schemalagda kontroller | N3 | kontroll | 📄 Bing AI Performance; 📄 OpenAI, Perplexity och Gemini (API:er med plats); 📊 BrightLocal 2026 (svaren varierar mellan körningar); 🎥 Grok Bot-videon (`BESLUT.md` 2026-10-16) | Skript mot API:erna |
| C105 | Varje schemalagd körning slutar i *ok*, *incident* eller *okänt*; okänt är aldrig ok, och en utebliven körning redovisas | 2-9 Schemalagda kontroller | N3 | kontroll | 🔧 webb-pro `drift.md` | Skripten |
| C106 | Visuell regression mot baslinjen från Johnnys slutgodkännande, alla bredder; Johnny godkänner eller avvisar varje diff | 2-9 Ändringar; 2-8 Kontroll N3–N4 hänvisar | N3 | kontroll | En källa – bänken: 🎥 designnivå-videon, kartan | Skärmdumpsjämförelse; Johnny |
| C107 | Den agent som orsakade en avvikelse rör inte baslinjen, varken basbilden eller undantagslistan | 2-9 Ändringar; 2-8 Hur självgående; 3-1 Låsningen | N3 | låst kontroll | En källa – bänken: kartan; principen *den som bedöms ändrar inte domaren* har två källor (3-1) | Låsningen (3-1) |
| C108 | Månadsrapportens siffror kontrolleras mot ögonblicksbilden (JSON i Git) före utskick | 2-9 Rapporten | N3 | kontroll | 📄 anteckningarna lager 9, fråga 5 | Skript |
| C109 | Johnny granskar varje rapport före utskick under piloten | 2-9 Rapporten | N3 | grind | 🔧 | Johnny |
| C110 | En standardändring skriver bara i `src/content/`, där Astros scheman stoppar bygget vid ogiltigt innehåll | 2-9 Ändringar | N3 | låst kontroll | 📄 Astro, content collections | Bygget |
| C111 | Avsändaren av ett ärende kontrolleras mot kundens registrerade kontakter | 2-9 Ändringar; 4 Ärendeagenten | N3 | kontroll | 🔧 kartan (`historik/karta/9-drift-forvaltning.md`) | Intaget |
| C112 | Förvaltningens ändringar passerar samma grindar som bygget; kontrollerna och faktakontrollen körs alltid | 2-9 Ändringar | N3 | grind | 📄 *Websites for Normal People* | Som i bygget |
| C113 | Normala och akuta ändringar godkänns av Johnny; osäker klass = normal; en otydlig ändringsbrief byggs inte | 2-9 Förvaltningsmodellen; Ändringar | N3 | grind | ITIL 4 via sekundärkällor ⚠️ och 📄 DORA; otydlig brief en källa – bänken | Johnny |

### Flödet 3.1 Orkestrering och roller

| # | Kontroll | Var (fil, avsnitt) | Nivå | Typ | Grund | Hur den körs |
|---|---|---|---|---|---|---|
| C114 | Redo för Johnnys dom bara med belägg: huvudsessionen kör kontrollskriptet efter varje varv och skriver kommandot och ett utdrag i `progress.md`; varje påstående till Johnny eller kunden har länk eller skärmdump. Från N2 sätter bara orkestreraren status, i `state.json` → `bevis` | 3-1 Belägg och status; 2-9 Rapporten (N3) | N1 | grind | Två källor (lyft): 🎥 Unlazy-videon + 📄 *Best practices* + 📄 *Prompting Claude Fable 5* | Huvudsessionen; från N2 orkestreraren |
| C115 | Inget släpps tyst: det som inte gick att bygga står i `progress.md` | 3-1 Läget i filer | N1 | instruktion | En källa – bänken: 🎥 Unlazy-videon | Huvudsessionen |
| C116 | Granskaren är en separat delagent med färsk kontext och får inte huvudsessionens logg och resonemang (från N2 inte byggarens överlämning) | 3-1 Den som bygger dömer inte | N1 (från steg 4) | grind | Två källor (lyft): 🎥 Shopify-videon + 📄 *Prompting Claude Fable 5*; 📄 *Best practices* | En vanlig delagent, inte `subtask` |
| C117 | Tid: tar ett steg mer än dubbelt så lång tid som Claude uppskattade stannar flödet och frågar Johnny; från N2 en budget per steg som stoppvillkor | 1 Tidsbudget; 3-1 Stoppvillkor | N1 (budgeten N2) | grind | 🔧 | Huvudsessionen; Johnny |
| C118 | Granskarens uppdrag innehåller inte `CLAUDE.md`, arbetsregler eller loggen | 3-1 Den som bygger dömer inte | N2 | instruktion | En källa – bänken: 🎥 Shopify-videon (grind i v0.74; lyfts när artikeln läses) | Uppdragsprompten |
| C119 | Byggaren kan inte ändra det som bedömer den: kontroller, granskarens checklista, brief, faktabas, stilkit och `design.md` låses efter Johnnys godkännande. I N1 är skyddet att Johnny tittar | 3-1 Den som bedöms får inte ändra domaren | N2 (baslinjen N3, eval N4) | grind | Två källor (lyft): 🎥 loop-videon + 📄 Cloudflare `security-audit-skill`; 📄 *Effective harnesses* | Låsningens lager nedan |
| C120 | Låsning, lager 1: `git diff --quiet HEAD -- <låsta sökvägar>` före varje kontrollkörning; ändrat → `blocked` | 3-1 Låsningen | N2 | låst kontroll | 🔧 | Orkestreraren eller grindhooken |
| C121 | Låsning, lager 2: deny-regler för `Edit` och `Write` på de låsta sökvägarna, också `settings.json`; Johnny kör `skript/godkann-kontroller.mjs` | 3-1 Låsningen | N2 | låst kontroll | 🎥 loop-videon; 📄 syntaxen (research 2026-10-14) | Deny-regler; Johnny committar |
| C122 | Låsning, lager 4: dolda kontroller utanför byggarens arbetskatalog; byggaren får bara namnet, en mening och felmeddelandet | 3-1 Låsningen | N4 | instruktion | En källa – bänken: 🎥 repo-videon (Ouroboros); grind i v0.74, rättad enligt M4 | Orkestreraren |
| C123 | Stop-hooken `grind-stopp.mjs` kör stegets kontroller när Claude försöker avsluta; kod 2 om något saknas; släpper efter tre blockeringar i rad med `blocked` | 3-1 Grindkontrollen | N2 | låst kontroll | 📄 research 2026-10-14; Hooks-dokumentationen | Hook under `hooks.Stop` |
| C124 | Grind för briefen: alla rubriker i briefmallen, räknade ur mallen; kundens bekräftelse och Johnnys godkännande | 3-1 Grindar per steg | N2 | grind | Se 2-1 (två källor); rubrikräkningen 🔧 (M10) | Hooken; kunden; Johnny |
| C125 | Grind för kontrollerna: Johnnys godkännande; kontrollerna committade | 3-1 Grindar per steg | N2 | grind | Se körbara kontroller (3-2) | Johnny; hooken |
| C126 | Grind för bygget: bygget går igenom, och varje rad i funktionslistan har `passes` med belägg | 3-1 Grindar per steg | N2 | grind | 📄 *Effective harnesses for long-running agents* | Hooken |
| C127 | Grind för granskningen: kontrollerna gröna och `kritisk` = 0, `hög` = 0 – eller rundtaket nått, med det som återstår listat | 3-1 Grindar per steg; 3-2 Granskaren | N2 | grind | 🔧 | Orkestreraren; Stop-hooken |
| C128 | Alla steg: inga låsta filer ändrade; ingen övergiven grind utan Johnnys ställningstagande (`overgivna` → `blocked`) | 3-1 Grindar per steg | N2 | grind | 🔧; övergivna grindar en källa – bänken (🎥 Unlazy-videon) | Hooken; Johnny avgör |
| C129 | Rundtaket: efter 3 varv går steget till Johnny med det som återstår | 3-1 Loopen; Stoppvillkor | N2 | grind | 🔧 startvärde (`historik/karta/flodet.md`) | Orkestreraren |
| C130 | Samma fel två varv i rad: byt angreppssätt en gång, sedan Johnny (i N1 frågar huvudsessionen Johnny direkt) | 3-1 Stoppvillkor | N2 | grind | 🔧 | Orkestreraren |
| C131 | Inloggning, konto eller kunduppgift saknas → `blocked` med exakt vad Johnny eller kunden ska göra (i N1 en fråga direkt) | 3-1 Stoppvillkor; 2-2 Onboarding | N2 | grind | 🔧 | Orkestreraren |
| C132 | Stegets storlek: en hel enhet, minst cirka tio minuters arbete | 3-1 Byggsteg och överlämning | N2 | instruktion | En källa – bänken: 🎥 Unlazy- och Fable-videon (grind i v0.74) | Orkestreraren |
| C133 | Advisor: en byggare eller rättare som kört fast frågar en starkare modell innan Johnny | 3-1 Stoppvillkor; 3-3 | N4 | instruktion | En källa: 🎥 funktionsvideon; 📄 verktyget (experimentellt) | `/advisor` |
| C134 | Domaren avgör riskfyllda beslut inom briefen; osäker eller avslag → `blocked` | 3-1 Domaren | N4 | instruktion | En källa – bänken: 🎥 Goal Buddy-videon | Domaragent med läsrätt |
| C135 | Ingen agent gör utskick till kundens kundlista eller har nyckel till utskickstjänsten; ärendeagenten saknar behörighet till fakturering, avtal, radering och kundens konton | 3-1 Tillsyn; 2-9 Behörigheter; 4 Ärendeagenten | N3 | låst kontroll | Principen *behörighet i verktyget* två källor (3-1: 🎥 VAULT-/5000-timmarsvideon + 📄 Claude Code, *Skills*); tillsynstabellen en källa – bänken | Behörighet i verktyget |

### Flödet 3.2 Granskning och kalibrering

| # | Kontroll | Var (fil, avsnitt) | Nivå | Typ | Grund | Hur den körs |
|---|---|---|---|---|---|---|
| C136 | Kontrollskriptet skrivs före bygget och ska fallera; Claude beskriver varje kontroll för Johnny i en mening | 3-2 Körbara kontroller; 5 steg 3 | N1 | grind | Två källor (lyft): 🎥 loop-videon + 🎥 Coding Sloth-videon | Claude skriver; Johnny ser |
| C137 | En granskare, en checklista, en referens – från steg 4: varje rad pekar på ett kriterium i lagren; underlaget är brief, faktabas och skärmdumpar i 375, 768 och 1280 px, sektion för sektion i full upplösning. Från N2 också Johnnys bedömda exempel som referens | 3-2 Granskaren; B `granska` | N1 | granskningskriterium | 📄 *Best practices*; 🎥 gauntlet-videon + 📄 Zheng m.fl. 2023 + 📄 Prometheus; 📄 Anthropic, *Prompting Claude Fable 5.1* (crop tool recipe) | Granskaren |
| C138 | Checklistan i markdown: tre utfall per kriterium, och *för lite information* räknas aldrig som godkänt; varje brist blir ett fynd med element, förväntat, faktiskt och allvar; fynd mot ett kriterium med en källa får högst `medel` | 3-2 Granskaren | N1 | grind | Tre utfall två källor: 🎥 repo-videon (Reticle) + 📄 Anthropic, *Demystifying evals*; fälten en källa (🎥 Hermes-loopvideon); allvaret 🔧 | Huvudsessionen skaffar mer underlag eller frågar Johnny |
| C139 | Stopp 2 – riktningar: startsidan i tre stilkit; Johnny kan stryka, med kort motivering i `domar.jsonl`, innan kunden väljer | 3-2 Stoppen; 2-5 Tre riktningar; 5 steg 2 | N1 | grind | Beslut: `BESLUT.md` 2026-10-13 och 2026-10-15 | Johnny, sedan kunden |
| C140 | Stopp 3 – bygget: varje kontroll i en mening före bygget, sajten i webbläsaren under bygget och till sist slutgranskningen – Johnny testar själv i mobil och dator efter en sammanfattning med belägg ur `progress.md`; varje avvisning får en kort motivering | 3-2 Stoppen; Slutgranskningen; 5 steg 3 | N1 | grind | 🎥 Shopify-videon; motiveringen 📄 Husain | Johnny |
| C141 | Stopp 4 – granskaren: fynden bredvid Johnnys egen dom över samma sajt; Johnny avgör vilka som var rätt, och avvikelserna loggas i `domar.jsonl` | 3-2 Stoppen; Kalibrering; 5 steg 4 | N1 | grind | 🔧; 📄 Husain (godkänt eller underkänt med skriven kritik) | Johnny |
| C142 | Stopp 5 – publicering, om sajten publiceras: alltid Johnnys godkännande; i förvaltningen också normala och akuta ändringar och återställning | 3-2 Stoppen; 2-8 Publicering; 2-9; 5 steg 5 | N1 | grind | Beslut: `BESLUT.md` 2026-10-13 och 2026-10-14 | Johnny |
| C143 | Stopp 6 – första rapporten: Johnny dömer den innan den går till kunden | 3-2 Stoppen; 2-9 Rapporten; 5 steg 6 | N1 | grind | 🔧 | Johnny |
| C144 | Nya regler: ingen lärdom ändrar något av sig själv; en dom blir regel, kontroll eller kriterium bara när Johnny säger det. Släpps aldrig: ändring av låsta filer, nya regler, utskick till kundens kundlista | 3-4 Lärdomar blir förslag (N1); 3-2 Stoppen (N2); README princip 9–10 | N1 | grind | 🔧 (webb-pro-lärdom); 📄 Simon Willison via anteckningarna | Johnny |
| C145 | Briefens mätbara krav blir egna körbara kontroller utöver de tio; Johnny godkänner dem, från N2 i planvyn, och de låses | 3-2 Körbara kontroller; 3-5 Planvyn | N2 | grind | Två källor: 🎥 loop-videon + 🎥 Coding Sloth-videon | Johnny |
| C146 | Täckningstabell: varje del av briefen – sida, innehållselement, primär handling, krav – kopplas till minst en kontroll eller ett granskningskriterium; en del utan koppling markeras före bygget | 3-2 Körbara kontroller; 3-5 Planvyn | N2 | kontroll | 🔧 (v0.74 fas 1b); 🎥 Unlazy-videon (en källa – bänken) | Planvyn |
| C147 | Utforskningstest: en delagent med webbläsare når mål ur briefen i mobil och dator; fynd, inte grind | 3-2 Körbara kontroller; 2-9 | N2 | kontroll | En källa – bänken: 🎥 Jev-uppföljningen | Delagent med webbläsare |
| C148 | Granskaren vet inte vilket varv det är och ser inte rundtaket eller tidigare resultat | 3-2 Granskaren; 3-1 Rolltabellen | N2 | instruktion | En källa – bänken: 🎥 gauntlet-videon (absolut regel i v0.74) | Orkestreraren |
| C149 | Fynden som JSON med fasta fält (element, skärmdump, förväntat, faktiskt, kriterium, referens, allvar, utfall, förslag); fynd utan fälten går tillbaka | 3-2 Granskaren | N2 | kontroll | En källa – bänken: 🎥 Hermes-loopvideon | Orkestreraren med ett schema |
| C150 | Specialister per aspekt: utseende, beteende, innehåll och fakta, konvertering, rörelse | 3-2 När en granskare inte räcker | N2 | granskningskriterium | Två källor: 🎥 loop-typvideon + 🎥 Jack Roberts-videon 2 (fem granskande agenter) | Specialistgranskare med ny kontext |
| C151 | Beteende granskas mot en beskrivning av tillstånden, med båda sidor i samma tillstånd | 3-2 När en granskare inte räcker; 2-3 | N2 | granskningskriterium | En källa – bänken: 🎥 loop-nivåvideon | Beteendegranskaren |
| C152 | Vilket perspektiv saknas? Svaret loggas; ett återkommande perspektiv blir förslag till ny specialist | 3-2 När en granskare inte räcker | N2 | granskningskriterium | En källa – bänken: 🎥 STORM-videon; metoden 📄 Shao m.fl., NAACL 2024 | Sist i varje granskning med flera perspektiv |
| C153 | Kodgranskning före publicering mot kodstandarden i 2-8 | 3-2 När en granskare inte räcker | N2 | granskningskriterium | En källa: 🎥 Shopify-videon; analysen §7.3 | `/code-review` |
| C154 | Blind jämförelse mot en referenssektion i båda ordningarna; vinst räknas bara när båda är eniga | 3-2 När en granskare inte räcker | N2 | granskningskriterium | En källa – bänken (skenbart lyft, analysen §4.4); metoden 📄 Zheng 2023 och Chen 2024 (grind i v0.74) | Separat granskare |
| C155 | Jämförelse mot förebild i siffror: beräknade CSS-värden per sektion, avvikelser i siffror | 3-2 När en granskare inte räcker; 2-5 hänvisar | N2 | granskningskriterium | En källa – bänken: 🎥 Jack Roberts designgeni-videon | Utseendegranskaren med Playwright |
| C156 | Granskningsdjup efter ändringens storlek; osäkert → full; sista varvet alltid fullt | 3-2 När en granskare inte räcker | N2 | instruktion | 🔧 (idé: Jev-uppföljningen) | Skript läser varvets `git diff` |
| C157 | Behåll eller ångra: ett varv med fler fallerade kontroller än före ångras med `git revert` | 3-2 Resultatlogg | N2 | instruktion | En källa – bänken: 🎥 loop-videon och 📄 karpathy/autoresearch (samma primärkälla) | Orkestreraren |
| C158 | Avstämning mot löftena: en isolerad agent läser briefen, beslutskartan och den färdiga sajten och listar det som utlovats men saknas eller avviker; fynden sätter `blocked` tills Johnny tagit ställning | 3-2 Slutgranskningen; 2-8 Publicering hänvisar | N2 | grind | En källa – bänken: 🎥 ADHD-videon | Isolerad agent; Johnny |
| C159 | Inget stopp godkänns på timeout; ett godkännande sätts bara efter Johnnys verkliga svar | 3-2 Stoppen; 3-3 Inställningar (`askUserQuestionTimeout`, förslag, öppet) | N2 | grind | 🔧; nyckeln 📄 verifieringen | Johnny |
| C160 | Ett stopp släpps ett i taget och bara när Johnny säger det; bedömaren ersätter aldrig hans dom (villkoret ≥ 90 % är öppet) | 3-2 Stoppen; Kalibrering | N2 (bedömaren N4) | grind | 🎥 FDE-videon; webb-pro; ≥ 90 % var grind i v0.74 (analysen §4.2) | Johnny |
| C161 | Förhör: 2–3 frågor om de riskfyllda delarna före godkännande; ett fel svar stoppar inget | 3-2 Slutgranskningen; 2-9 Ändringar (förvalt, N3) | N2 | kontroll | 🎥 Fable 5- och radera-skills-videon | Orkestreraren frågar Johnny |
| C162 | Ultra review före publicering av större sajter | 3-2 Slutgranskningen | N3 | kontroll | 📄 verifieringen (research preview, debiteras) | Johnny startar `/code-review ultra` |
| C163 | Adversarial granskning av planen: en angripare med ny kontext letar motsägelser i briefen och kontroller som inte mäter det de påstår; högst 3 omgångar; tas in om eval visar att den fångar fel | 3-2 Eval | N4 | instruktion | En källa – bänken: 🎥 Buzz-videon | Angripare; orkestreraren försvarar |
| C164 | Ett tillval eller en ny skill tas in först när ett prov med och utan visar nytta på en riktig sajt | 3-2 Eval; 3-4 Skills; A Urvalskriterier; B | N2 | instruktion (A) / villkor för intag (3-2, 3-4) | 🎥 context-videon; RTK-exemplet (🎥 Nate Herk 100-repon-videon); webb-pro (motåtgärd 5) | skill-creator, `claude plugin eval`, Caliper |

### Flödet 3.3 Säkerhet och inställningar

| # | Kontroll | Var (fil, avsnitt) | Nivå | Typ | Grund | Hur den körs |
|---|---|---|---|---|---|---|
| C165 | Inga hooks i N1; behörighetsläge, modell och effort är Johnnys inställningar, inte regler (bevakad körning struken 2026-10-15) | 3-3 Första sajten | N1 | instruktion | `BESLUT.md` 2026-10-13 (små steg) och 2026-10-15 | – |
| C166 | `permissions.deny` för `git push`, `wrangler deploy`, `versions deploy` och `.env`; push är också publicering | 3-3 Första sajten; 3-1; 2-8 Publicering | – | struken 2026-10-15 (`BESLUT.md`, *Inga spärrar*) | 📄 verifieringen (syntaxen); 📄 cloudflare-stack (push publicerar) | – |
| C167 | Byggsessionen avgränsas från användarnivån: före första sajten visar `/doctor` vilka skills, plugins och `CLAUDE.md` som laddas, och en körning i `claude --safe-mode` blir baslinje | 3-3 Första sajten; 3-4 `CLAUDE.md` hänvisar | N1 | kontroll | 📄 verifieringen §9; om `/doctor` visar detta är ⚠️ overifierat (öppet, bilaga E §4) | För hand före första sajten |
| C168 | Läsförbud för byggarna med `permissions.deny`: kundens gamla sajt, referenserna, de dolda kontrollerna, `node_modules/`, byggmappar | 3-3 Skyddshook | N2 | låst kontroll | 📄 verifieringen §7; analysen M5 (ignore-filer verkar inte) | Deny-regler |
| C169 | Sökning efter nyckelformat före varje automatisk commit; träff ger ingen commit | 3-3 Hemligheter | N2 | låst kontroll | En källa: 🎥 Agit-videon (fallgrop 26); 🔧 | Skript före commit |
| C170 | Instruktioner i externt innehåll följs inte; en dold instruktion rapporteras som fynd (i N1 är spärren att Johnny tittar) | 3-3 Extern text är data | N2 | instruktion | En källa – bänken: 🎥 Skill Spector-videon | Alla roller; granskaren rapporterar |
| C171 | Skyddshooken `skydd.mjs` blockerar radering utanför sajtens mapp, skrivning utanför projektet, POST till okända domäner, publicering och push, Bash-skrivning till låsta sökvägar och okända kommandon som ändrar historik, raderar eller publicerar | 3-3 Skyddshook; 3-1 Låsningen, lager 3 | N2 | låst kontroll | 📄 hookformatet (verifieringen §6); raderna 🔧 och 🎥 (Jev-videon, CLAUDE.md-videon) | `PreToolUse`-hook i projektets settings |
| C172 | Skrivande anrop mot kundens Google Business Profile blockeras | 3-3 Skyddshook; 2-9 Kopplingar | N3 | låst kontroll | 📄 `2026-10-14_stitch-och-verktyg.md` (ingen roll med bara läsrätt) | Hooken; egen tunn klient |
| C173 | En granskning som kör målets kod gör det i en sandlåda utan nätverk | 3-3 Sandlåda; 2-8 Säkerhetsgranskning | N2 | låst kontroll | 📄 README för `cloudflare/security-audit-skill` | Sandlåda (⚠️ inte vald) |
| C174 | Obevakade körningar går i en sandlåda | 3-3 Sandlåda | N4 | låst kontroll | 📄 Claude Code-dokumentationen (verifieringen §7) + 📄 Simon Willison | Sandlåda (⚠️ inte vald) |
| C175 | Monitor matar dev-serverns utdata till Claude under ett byggsteg | 3-3 Monitor | N2 | kontroll | 📄 verifieringen §3 | Monitor (5–30 min) |
| C176 | Avvikelser i obevakade körningar ger en varning, inte ett stopp: skrivförsök utanför tillåtna filer, misslyckade verktygsanrop, rundor som inte tar slut, tokenåtgång, konsolfel | 3-3 Monitor | N4 | kontroll | En källa: 🎥 funktionsvideon | Monitor; varning till Johnny och flödespanelen |
| C177 | Modellbyte loggas och varnar men blockerar inte | 3-3 Effort och modeller; 3-1 Grindkontrollen; 3-2 Resultatlogg | N2 | kontroll | En källa – bänken: 🎥 Fable-videon, andrahandsanekdot ⚠️ (grind för alla faser i v0.74); 📄 `PostModelSwitch`-hooken finns | Resultatloggen; `PostModelSwitch`-hook; Monitor |

### Flödet 3.4 Lärande och underhåll, 3.5 Live-visning

| # | Kontroll | Var (fil, avsnitt) | Nivå | Typ | Grund | Hur den körs |
|---|---|---|---|---|---|---|
| C178 | Formtest av varje skillversion: giltig frontmatter, unikt namn, beskrivning, inga trasiga sökvägar | 3-4 Skills | N2 | kontroll | 📄 Claude Code, *Skills* (`claude plugin validate`); 🎥 context-videon | `claude plugin validate` |
| C179 | Triggningstest: tre testfrågor per skill och en parvis jämförelse av beskrivningarna | 3-4 Skills | N2 | instruktion | En källa – bänken: Nate Herks återgivning av skill-creator (grind i v0.74) | skill-creator |
| C180 | Kontrollera att en installerad skill syns i `.claude/skills/` (en del skills hamnar i `.agents/skills`) | 3-4 Skills | N2 | kontroll | 📄 `2026-10-14_stitch-och-verktyg.md`; om `.agents/skills` läses är ⚠️ overifierat | För hand |
| C181 | `/skill-doctor` och `/doctor` månadsvis; förslagen godkänns eller avslås av Johnny | 3-4 Underhållsrutiner | N2 | kontroll | 📄 Claude Code, *Skills*; verifieringen | `/skill-doctor`, `/doctor` |
| C182 | Rensning vid ny modell: kör med och utan i säkert läge; behåll rensningen bara om resultatet inte blev sämre | 3-4 Rensning vid ny modell | N2 | grind | Boris Cherny (en källa) + 📄 *Prompting Claude Fable 5* + 📄 *Harness design* | Johnnys blinda dom tills eval finns |
| C183 | Stegvis utrullning av ny byggsystemversion: eval, en riktig sajt, sedan alla | 3-4 Plugin | N4 | grind | En källa: 🎥 ADLC-videon | Eval; Johnny |
| C184 | Varje wikifil kontrolleras av en människa innan den låses | 3-4 Kunskapsbasen | N2 | grind | 🔧 | Människa |
| C185 | Antagandena listas i slutet av varje steg och Johnny markerar fel; flödet markeras inte klart så länge ett felmarkerat antagande är orättat | 3-5 Förhandsvisning | N2 | grind | 🔧 (idé: *Assumption Check*, mods-videon) | Johnny; orkestreraren |

### Företaget (4)

| # | Kontroll | Var (fil, avsnitt) | Nivå | Typ | Grund | Hur den körs |
|---|---|---|---|---|---|---|
| C186 | Kundavtal och biträdesavtal före första betalande kund, granskade av jurist; åtagandet *byggd enligt WCAG 2.2 AA, testad med …*, aldrig *lagenlig* | 4 Trappan av insatser; 2-2 Avtal | N3 | grind | Lag (tolkning): GDPR art. 28, tillgänglighetslagen; 📄 research 2026-10-14 | Jurist; Johnny |
| C187 | Priser, erbjudanden och juridiska texter publiceras aldrig utan Johnnys godkännande, inte heller när andra stopp släppts | 4 Ärendeagenten; 2-7 Hur självgående; 2-9 | N3 | grind | En källa – bänken: 🎥 VAULT-videon | Johnny |
| C188 | Interaktiv prisuppskattning bygger bara på kundens prislogik i faktabasen, märks som uppskattning och godkänns av kunden före publicering | 4 Tillval | N3 | grind | En källa: 🎥 Jack Roberts-videon 3 / 🔧 | Kunden |
| C189 | Ärendeagenten skickar inget själv; varje svar är ett utkast som Johnny godkänner | 4 Ärendeagenten; 3-1 Tillsyn | N3 | grind | En källa: 🎥 1-person- och VAULT-videon | Johnny |
| C190 | Rutinsvar går ut utan godkännande först när kalibreringen visar att klassningen stämmer, och svaret upplyser om att det kommer från en AI | 4 Ärendeagenten | N4 | grind | Lag (tolkning): AI-förordningen art. 50.1; kalibreringen (3-2) | Kalibrering; Johnny |
| C191 | Kundflödet startar inte förrän juridiken är utredd (GDPR art. 14, marknadsföringslagen, källornas villkor) | 4 Kundflödet | N3 | grind | Lag (⚠️ inte kontrollerad); 📄 research lager 1 | Johnny; jurist |
| C192 | Utkast, aldrig utskick: Johnny godkänner varje säljmeddelande | 4 Kundflödet | N3 | grind | En källa – bänken: 🎥 1-person-videon | Johnny |
| C193 | Varje påstående i ett säljutkast har belägg: resultat bara ur `foretag/kvitton.md`, påståenden om mottagaren med källa och datum | 4 Kundflödet | N3 | låst kontroll | Faktakontrollens två källor (analysen §4.3); användningen 🔧 | Faktakontrollen på utkastet |

## Regler för kontrollerna själva

Inga egna kontroller, men de styr raderna ovan.

- `README.md`: en låst kontroll eller grind kräver norm eller två oberoende primärkällor; N1 har högst cirka 60 punkter och högst tio automatiska kontroller.
- `3-2` [N1]: det mätbara avgörs av kontrollskriptet, det som kräver omdöme av granskaren och det som kostar dyrt om det blir fel av Johnny. Design och helhetsintryck blir aldrig kontroller. En kontroll avgör om ett steg är redo för Johnnys dom, aldrig om han får se det.
- `3-2` [N2]: kontrollerna körs före granskaren.
- `3-4` [N2]: kontroller åldras och förnyas, instruktioner prövas och rensas; en kontroll som slutat underkänna byts med Johnnys beslut. Nya låsta kontroller bara för det som är objektivt fel och har hänt mer än en gång.
- `2-8` [N2]: deterministiska kontroller körs utan tillsyn med ett begränsat antal rättningsförsök; omdöme går till Johnny; brusiga mätningar körs 3–5 gånger och medianen gäller.
- `2-9`: lagret har inga egna grindar; det som publiceras passerar grindarna i `2-8`. Registret räknar ändå Johnnys godkännanden i förvaltningen som grindar.

**Utanför registret:** promptreglerna (`3-3`), urvalskriterierna för tredjepartsverktyg (A, uttryckligen instruktioner) och regler som saknar en definierad kontroll, till exempel *inget blinkar tre gånger per sekund* (`2-6`, WCAG 2.3.1) och licenslistan per tillgång (`2-5`).

## v0.74:s riskabla grindar – var de står nu

Analysen §4.2 listade grindar med en källa. Så här hanterar v1.0 dem efter ommärkningen:

| v0.74 | v1.0 | Rad |
|---|---|---|
| Inga versaler (låst kontroll) | Granskningskriterium N2 | C53 |
| Inter, Geist och Lucide förbjudna | Antimönster bara per kit; standarden öppen (bilaga E 1.10) | C49 |
| Emils animationsregler som kontroller | Instruktioner; statisk sökning som rapport | C58 |
| Lighthouse ≥ 90 i alla fyra kategorier | N1-kontroll 9 rapporterar för tre kategorier; prestanda via Core Web Vitals N2 | C9, C79 |
| WebP under 200 kB | Instruktion på bänken; LCP | C80 |
| Samma modell i alla rundor, annars `blocked` | Loggas och varnar | C177 |
| Dolda kontroller via agentens verktyg | N4, utanför arbetskatalogen | C122 |
| Granskaren vet inte rundnumret | Instruktion | C148 |
| Granskaren läser inte projektinstruktionerna | Instruktion | C118 |
| Utan nordstjärna godkänns ingen brief | Instruktion; krav på förvaltningsavtalet | C13, C16 |
| Kalibrering ≥ 90 % släpper stopp | Öppet; bedömaren ersätter aldrig Johnny | C160 |
| Checkpoint ≥ 10 minuter | Instruktion | C132 |
| Tre testfrågor underkänner en pluginversion | Instruktion | C179 |
| Rörelsebudget som låst kriterium | Granskningskriterium | C60 |
| Ordgräns (låst kontroll) | Instruktion | C73 |
| Socialt bevis med källa och tillstånd | Källan i faktakontrollen; tillståndet en instruktion | C5, C70 |
| Platshållare stoppar publicering | Stopp, nu grundat på faktakontrollens tre källor | C6 |
| E-postbekräftelse påslagen | Låst kontroll N3, Supabase som andra källa | C95 |
| OKLCH och kontrastpar | Kontrast är grind; OKLCH på bänken (`2-5`) | C45 |
| Säkerhetsgranskaren kör starkaste modellen | Instruktion i rolltabellen (`3-3`) | – |
| Skill Spector före varje installation | N2, vid tredjepartsinstallation (A) | – |
| Blind jämförelse (skenbart lyft, §4.4) | Underlag, inte grind | C154 |

Därtill ändrade ommärkningen tre N1-kontroller: nr 2 och nr 9 rapporterar och stoppar inte, och `h1` i nr 7 rapporterar (granskningen 2.1). Det långa tankstrecket gick från låst kontroll till granskningsförslag (C68).

## Avvikelser mellan filerna

Det som fortfarande gäller efter ommärkningen. Noterat, inte rättat; rätta i den fil där kontrollen bor.

1. **När ett steg är klart.** `5-byggplan.md`, steg 3, säger *"Kontrollerna går igenom **och** Johnny har dömt sajten"*. `2-8` säger att kontrollerna inte avgör om ett steg är klart, och nr 2 och 9 rapporterar bara; `3-2` säger *redo för Johnnys dom*.
2. **När Johnny ser kontrollerna.** `1-kundens-vag.md`, steg 2 (research), låter Johnny se *"varje kontroll i en mening"*; i `3-2` (stopp 3) och `5-byggplan.md` beskrivs kontrollerna i början av bygget, steg 3.
3. **Lekfulla hinder** (C28) är N2 i `2-3` men exempel i N1-checklistan i `3-2`.
4. **44 × 44 px** (C36): båda filerna kallar det granskningskriterium, men `2-4` gäller knappar, menyknappen och fristående länkar, `2-8` primära knappar.
5. **Karuseller** (C64): `2-6` förbjuder automatiska karuseller som policy (NN/g, WCAG 2.2.2); `2-8` kallar *inga karuseller* ett granskningskriterium och webb-pros husval.
6. **404-kontrollen vid ombyggnad** (C78): `2-2` kallar den *den låsta kontrollen* och grundar omdirigeringarna på Google Search Central; `2-8` ger 🎥 4 Ways-videon och 🔧 som grund.
7. **Bildfrekvens vid scroll** (C59): `2-6` lägger mätningen i `2-8`, som bara mäter CLS.
8. **Säkerhetsgranskningens verktyg:** `2-8`, `3-3` och A använder `/security-review` på N2 (C76); `bilaga-e-oppna-fragor.md` §3 har kvar frågan om verktyget som öppen.
9. **Prov med och utan** (C164) är en instruktion enligt A:s urvalskriterier men ett villkor för intag i `3-2` och `3-4`.
10. **Resultatloggens exempel** i `3-2` heter `ingen-horisontell-scroll-375`; N1-kontroll 3 gäller 320 CSS-px.
11. **Stoppar utan norm eller två källor.** Mot README:s regel: avstämningen mot löftena sätter `blocked` på en källa (C158), sökningen före commit stoppar på en källa (C169), och designregelvakten och antimönstren (C48, C49) upprätthåller Johnnys låsta kit. Med 🔧 som enda grund stoppar bygget (nr 1), interna länkar, formulärets testinskick, låsningens jämförelse, granskningens grind och flödets stoppvillkor. README säger inte om tekniska förutsättningar och flödesvillkor omfattas av regeln.

**Lösta sedan första versionen av registret:** antalet N1-kontroller (nu exakt tio, bara i `2-8`), nr 5 som en läsning i stället för ett skript, 320 eller 375 px (gemensam uppsättning ovan), 44 px som låst kontroll, JavaScript avstängt (regel i `2-4`, kontroll i `2-8`), blickprovets nivå (en plats, `2-4`), Lighthouse-trösklens grund (`2-8` och A säger samma sak), visuell regression (N3 i båda), kontroller som åldras (bara `3-4`), briefens grind (`3-1` har kundens bekräftelse), att skillen syns (N2 i båda) och hänvisningen om avstämningen mot löftena (finns nu i `3-2`). Kantfallen, som `2-4` och `2-8` hänvisar hit, har fått ett eget avsnitt.
