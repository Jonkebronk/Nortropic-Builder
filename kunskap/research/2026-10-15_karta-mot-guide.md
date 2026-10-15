---
titel: Kartan mot guiden — mappning, konflikter och luckor inför en konsolidering
datum: 2026-10-15
källor:
  - IMPLEMENTERINGSGUIDE.md, v0.73 (main, commit 7a08b9b)
  - BESLUT.md, LAGE.md, CLAUDE.md, principer.md (karta-och-inventering, commit aa6c001)
  - karta/README.md, karta/1-strategi.md … karta/9-drift-forvaltning.md, karta/flodet.md (aa6c001)
  - inventering/inventering.json och inventering/README.md (aa6c001)
  - historik/webb-pro.md (aa6c001)
  - kunskap/research/2026-10-15_kompetensluckor-och-kandidater-per-lager.md (aa6c001)
status: underlag, inga beslut. Johnny avgör.
---

# Kartan mot guiden

Underlag för en konsolidering som Johnny beslutar om. Inget här är beslutat. Guiden citeras med § och radnummer i `IMPLEMENTERINGSGUIDE.md` v0.73 på main. Kartspåret citeras med filnamn på grenen `karta-och-inventering` (aa6c001). Johnnys ord står i `BESLUT.md` och väger tyngst; allt annat är förslag, från Claude i den ena eller andra sessionen.

## Sammanfattning

- **Spåren beskriver samma kundresa men bygger olika saker.** Guiden är en maskin: ett flöde i fyra lager av låsning, med cirka 50 omnämnanden av låsta kontroller, 196 fallgropar och 77 rader verktyg i §12. Kartan är en kompetenskarta per lager (Garretts fem plan plus fyra), med ett eget bibliotek och få men källbelagda grindar.
- **BESLUT.md avgör inte designfrågan rakt av, men lutar åt kartan** i tre frågor: Johnny vill "bygga egna" och ha "ett eget bibliotek som är världsklass" (18:52), han vill börja om "i små steg" (17:32), och i hans kundresa är det kunden som tycker att "riktning 2 var bra" (18:05).
- **Båda spåren är strängare än Johnnys licensbeslut** (18:50). Guiden förbjuder kopior av sektioner och bilder till generatorn. Kartan följer regeln från 2026-10-03 om att layout, palett och typsnitt får lånas. Vad 18:50 faktiskt tillåter behöver Johnny säga.
- **Utöver LAGE:s fem skillnader finns minst nio till**, bland dem intervjuformen, sajttypen (scrollytelling mot hantverkarsajt), hur bedömaren kalibreras och om externa skills installeras eller destilleras. Det finns också konkreta motsägelser om enskilda verktyg, till exempel Lucide och Inter, som guiden förbjuder och kartan har som standard.
- **Luckorna är komplementära.** Guiden saknar nästan hela kartans kompetensinnehåll i lager 2–7: Top Tasks, MoSCoW, branschmallar, IA-reglerna, sektionsbiblioteket, stilkiten, rörelsepolicyn och den svenska språkgrinden. Kartan saknar det mesta av guidens juridik, Cloudflaredetaljer, säkerhetsmodell, faktabas, eval och hela §15 om företaget.

---

## 1. Mappning: kartans lager mot guidens faser och avsnitt

Guiden är ordnad efter **faser i tid** (fas 0–8) och efter **mekanik** (§5–§12). Kartan är ordnad efter **vad en sajt består av** (lager 1–9) och efter **kompetens** (egen skill, eget bibliotek, åtkomst per lager). Därför sprids varje lager över flera ställen i guiden.

| Kartan | Guiden, samma sak | Bara i kartan | Bara i guiden |
|---|---|---|---|
| **1 Strategi** (intervjuande AI, strategibrief) | Fas 1 (intervju → `brief.md`, självintervju, dimma, beslutskarta), brief 4b (nordstjärna, hink), §11.8 (faktabas), §11.11 (sett/härlett/okänt), §11.12 (research med linser inför intervjun), §15.4 (smärta, person, löfte), fas 0 (lagkravsfrågor vid onboarding) | Jobs to be done med frågor om ägarens kunder, question protocol med kolumnen "Nästa användning", förifylld research ur Google-profil, Bolagsverket och SCB, GOV.UK:s check answers med betyg 1–4, en granskare som prövar "kan nästa lager börja med det här?", Googles EEA-villkor för Places-data | Stoppet eller läckan ("Var tappar ni kunder i dag?"), utbud eller efterfrågan med "den ärliga följden", processen bakom den primära handlingen och oskrivna regler, nordstjärna med baslinje, mål och tidsram, sökordsanalys före bygget, rörelsebudget (3b), svarsalternativ via `AskUserQuestion` |
| **2 Omfattning** (sidkarta med MoSCoW, två spår) | Fas 0b (befintlig sajt: fånga, integrationer, URL-inventering och 301, före-mått), brief 2b (sidkarta), §11.5 (bygga eller använda befintligt), §14 (vägarna A–D), §15.1 (paketen anger antal sidor) | Top Tasks med triangulering och 10–15 uppgifter som ägaren rangordnar, MoSCoW enligt DSDM, branschmallar med nyckeln SNI 2025 ↔ Google-kategori ↔ Places-typ ↔ schema.org, `_redirects` i stället för Astros `redirects`, ai-website-cloner-templates steg Map och Observe, crawl4ai | Analys av integrationer, spårare och formulärmottagare (REA, Playwright), före-mått som baslinje för nordstjärnan, kostnad i tre lägen, "behöver kunden verkligen ett CMS?" |
| **3 Struktur** (hierarki, meny, nyckelresor) | Brief 2b (sidkarta), fas 1 (varje viktig söksträng får en sida), fas 2 (wireframes per sidtyp), fas 6c (sitemap, LocalBusiness-schema), §10.3 (kontroll av hela användarflödet, utforskningstest) | Tre rättade tumregler (tre-klicksregeln, brödsmulor, högst fyra länkar i mobilmenyn), 2–4 nyckelresor körda i Playwright, Googles regel om dörrsidor, trädtest med AI som rök-test och mänskligt trädtest per branschmall, att FAQ-schema inte längre visas som rich result, den mest specifika LocalBusiness-typen | "Ingen köper en enskild sida" (Jack Roberts), sökordsstyrd sidkarta |
| **4 Skelett** (sektioner, layout, tillstånd) | Fas 2 (wireframes först, spridda layoutvarianter, DESKTOP + MOBILE), fas 1b (`design.functional.md` med tillstånd), fas 4 (fyra bredder, beteendegranskare, layout på pixelnivå), §11.2 (44 px klickyta), fas 6 (blickprov), fas 5 (komponentkällor och gallerier per sektion), §14 (stack) | Sektionsbibliotek med 2–3 layouter per sektion, Atomic Design, primitiver utan JavaScript (`<details name>`, popover, `<dialog>`), W3C APG (navigering som disclosure), AstroWind och Accessible Astro som referens, sektionen Serviceområde, ett utkast till kärnsektioner för en hantverkarsajt | En ny layout från Stitch för varje sajt, `design.functional.md` som facit för tillstånd, Variate |
| **5 Yta** (stilkit, tokens) | Fas 1b (tre riktningar med Inspo, Tastemaker), fas 2 (`design.md`, OKLCH, beräknade kontrastpar, Antimönster, låsning, visualisering), §7.3 (designregelvakt), §11.7 (perspektivbibliotek ur frontend-design och Taste), fas 5 (typsnittskällor), §11.9 (bildstrategi), §15.1 (varumärkesbok) | 3–5 stilkit i DTCG 2025.10 byggda med Terrazzo, Leonardo och Radix tolv steg, Utopia med 2,5×-regeln, en kuraterad OFL-lista, Lucide, `latin-ext` för samiska namn, en checklista med 26 punkter, Consumer WebWatch och NN/g om trovärdighet | `design.md` per sajt ur Stitch, antimönster som statiska kontroller (bland annat Inter, Geist och Lucide förbjudna) |
| **6 Rörelse** (policy och färdiga rörelser) | Fas 5 (scrollytelling, Scroll World, Scrollcraft, Remotion, Emils regler som kontroller, ett blickfång, mikrointeraktioner), brief 3b (rörelsebudget), fas 6 (berättelsegranskning på video) | Innehållet syns utan JS, `@view-transition`, Motions vanilla-API, scroll-drivna animationer bara inom `@supports`, WCAG 2.2.2 (paus vid mer än fem sekunder), NN/g:s 100–500 ms | Scrollytelling som standardform, rörelsebudget efter målgrupp, granskning av rörelse på video, egen gren för fas 5 |
| **7 Innehåll** (text, röst, bilder, alt-text) | §11.8 (faktabas), fas 3 (innehåll skilt från design), fas 6 (specialisten för fakta och språk, socialt bevis, konkret i stället för generiskt, långa tankstreck, versaler, textmängd), §8.6 ("Skriv bara fakta som finns i kundens faktabas"), §11.9 (ärlighetsregel, AI-förordningen, licens, WebP under 200 KB) | Svensk språkgrind (Vale med stilen Nortropic-sv, Hunspell sv_SE, LIX), ägarens röst ur en inspelad intervju transkriberad med KB-Whisper och en röstprofil, en fotolista efter Googles kategorier, alt-text efter W3C:s beslutsträd och 1177, borttagen exif-GPS, Unsplash som olämplig för en autonom kedja | En fil per faktum, kontroll av socialt bevis mot moderniseringsdirektivet, Humanizer och Slop Monster, låsta kontroller för tankstreck och versaler |
| **8 Teknik och kvalitet** (grindtabell, lagar) | Fas 6b (kodgranskning mot standard), fas 6c (SEO och lanseringskrav, Lighthouse 90+, hemligheter i klientkoden), fas 7 (säkerhetsgranskning, staging, headers, röktest, platshållare, omdirigeringar), §11.10 (samtycke), §11.13 (lagkrav per kund), §7 (hooks) | En grindtabell med exakta trösklar (LCP 2,5 s, CLS 0,1, TBT 200 ms), lychee, MDN HTTP Observatory, CSP utan `unsafe-inline`, axe med WCAG 2.2-reglerna i Chromium och WebKit, median av 3–5 Lighthouse-körningar, WCAG-EM vid lansering och sedan årligen | Säkerhetsgranskning (Claude Security, Cloudflares security-audit-skill, Mantis), kodkritiker och rättare, DOS-lagen, AI-förordningen för chattar, kundavtal och rättigheter till AI-material |
| **9 Drift och förvaltning** | Fas 8a–8g (schemalagda kontroller, ändringar och kö, larm, behörigheter, lärdomar, underhåll, kopplingar), §15.2 (ärendeagenten), §15.1 (tjänstetrappan), §8.8 (pluginversion per sajt) | Förvaltningsmodell ur pm3, ITIL 4, SRE och DORA, tjänstenivåer (99,9 procent), Renovate med sju dagars karenstid, UptimeFlare och Uptime Kuma, mejl eller SMS → ärende → claude-code-action → PR, content collections med Zod, en månadsrapport den 4:e med kontakter från Google-profilen som huvudmått, `cloudflare/mcp` med två tokens, Nortropic som personuppgiftsbiträde med underbiträden | AEO-kontroll, nordstjärna och "nästa begränsning", testet med en ny besökare, förhör före sammanslagning, Business Profile saknar läsroll, kassaskåp per kund, arkitekturgranskning varje kvartal, ärendeagentens riskklasser, aldrig massutskick |
| **Flödet** (loopar, bedömare, kontext, lärande) | §5 (orkestrerare, generatorn ≠ granskaren, roller, stoppvillkor, två stopp, pilotfas), §7 (Stop-hook, skyddshook), §8 (inställningar, underhåll, promptregler, plugin), §9 (eval, kalibrering §9.6), §10 (låsta kontroller, resultatlogg, auto loop), §11.6 (`kunskap/` som wiki, bänken), §12 (urval, Skillify, Skill Spector), §6 (live-visning) | Lärdomar från Wix ADI, Squarespace och GoDaddy, Galls lag, "Bara det som gjorts för hand tre gånger automatiseras", autonomi som förtjänas genom leveranser i rad, kalibrering på 30–40 skärmdumpar med TPR och TNR, sex bevakningskällor med intagsregel, Design Science Research, `BESLUT.md` och `LAGE.md` som arbetsform | Låsning i fyra lager, dolda kontroller, checkpoints, parallella worktrees, mods, advisor, domare, Monitor, tyst modellbyte, effort per roll, versionerat plugin med canary, auto loopen via `arbetssatt.md`, bänken med krav på två oberoende källor |

**Struktur för kompetensen.** Kartan delar kompetensen i *egen skill per lager, eget bibliotek och åtkomst vid kundbygget* (`karta/README.md`). Guidens egna skills är uppdelade per fas och roll: `brief-interview`, `write-checks`, `stitch-review`, `story-review`, `kod-kritiker` och så vidare (§12). En konsolidering måste välja en av indelningarna eller översätta mellan dem.

---

## 2. Konflikter

Varje konflikt har samma form: vad guiden säger, vad kartan säger, vad BESLUT.md säger, och vilket beslut som behövs. Konflikt 1–5 är LAGE:s fem, verifierade och fördjupade. Konflikt 6–14 är nya.

### Konflikt 1. Designsättet: Stitch per sajt mot sektionsbibliotek och 3–5 stilkit *(LAGE nr 1, verifierad)*

- **Guiden:** "Kärnidén 🎥: **Claude Code styr Stitch via dess CLI**" (§1, rad 100). Fas 2 tar fram en ny design per sajt, ibland i 8 varianter (rad 346). Om komponentbibliotek: "*Vi bygger marknadsförings-UI* (landningssidor, företagssajter). Det talar emot att låta ett komponentbibliotek styra utseendet" (§14, rad 2151). Fallgrop 85: "**Ett designsystem ger konsekvens, inte karaktär**" och fallgrop 96: "**Komponentbibliotek för funktionellt UI på en marknadsföringssajt** drar mot generiskt utseende."
- **Kartan:** "För Nortropic betyder det ett sektionsbibliotek och 3–5 stilkit som byggs en gång med full designkompetens." (`principer.md`). "Helt självgående i kundbygget, eftersom AI:n bara väljer bland granskade sektioner. Biblioteket byggs av Johnny och Claude med full designkompetens. Det är där Johnnys smak läggs in, en gång." (`karta/4-skelett.md`). Inventeringen föreslår **Släpp** för `taste-stitch` ("DESIGN.md för Google Stitch").
- **BESLUT.md:** Inget beslut om Stitch. Två citat lutar mot ett eget bibliotek. Johnny 18:52: "…komponenter, teman, animationer och så identifierar vi luckor, iteratar tills vi har ett eget bibliotek som är världsklass." Johnny 18:30: "…så det får verkligen känslan att en designer hos en webbyrå har arbetat på detta men vi gör det autonomt".
- **Fördjupning:** Spåren invänder mot olika saker. Guiden varnar för *funktionella* bibliotek (shadcn, Astryx), alltså andras bibliotek. Kartan föreslår ett *eget marknadsföringsbibliotek* med kit för småföretag. Guidens invändning träffar därför inte kartans förslag fullt ut. Båda spåren ser samma risk: allt drar mot genomsnittet (`historik/webb-pro.md`: "regler, checklistor och språkmodeller drar mot genomsnittet").
- **Johnny behöver avgöra:** Byggs varje kundsajt (a) ur ett eget bibliotek med kit, där Stitch, Inspo och Tastemaker bara används när kiten tas fram och förnyas (LAGE:s förslag), (b) i Stitch med en `design.md` per sajt, eller (c) i Stitch men med kitets tokens som ram?

### Konflikt 2. Ordningen: flödet först mot en sajt först *(LAGE nr 2, verifierad med en precisering)*

- **Guiden:** §16 har 21 steg. Steg 1–9 är uppsättning, mods, beslut, inställningar, `state.json`, `CLAUDE.md`, skyddshooken och kunskapsbasen. Steg 10 lyder: "Skapa `brief-interview` och testa fas 1 på en exempelsajt." **Preciserat:** steg 10 prövar bara fas 1. En hel sajt byggs tidigast i steg 13 ("testa varje fas separat"), och publicering prövas på en exempelsajt först i steg 20. Statusraden säger att konsolideringen görs "**när videogenomgången är klar** — inte före" (rad 4).
- **Guiden säger också emot sig själv:** Skillify-metoden i §12 börjar med "**Kör processen manuellt tillsammans med Claude** första gången (t.ex. den första sajten…)". Det ligger nära kartans ordning.
- **Kartan:** "Först en sajt Johnny är stolt över, sedan byrån och sist maskinen." och "Varje ny mekanism ska kunna peka på den sajt som behövde den." (`principer.md`, båda Claudes förslag).
- **BESLUT.md:** Johnny 17:32: "Jag känner att jag rent konkret behöver börja om och ta små steg för tiden det tar att bygga en hemsida är alldeles för lång och sen har vi fortfarande inte skapat en sida jag är nöjd med ännu". Johnny 17:55: "…från start och från grunden, iterativt tillsammans med dig."
- **Johnny behöver avgöra:** Är nästa steg en verklig sajt som byggs i små steg, med guidens mekanik som en katalog att plocka ur när sajten behöver något? Ska videogenomgången fortsätta parallellt, pausas, eller vänta på konsolideringen?

### Konflikt 3. Vem som väljer riktning *(LAGE nr 3, verifierad)*

- **Guiden:** "Planvyn visar **tre riktningar** … Du väljer riktning i samma stopp." (fas 1b, rad 322). Om prototypen: "Kundens godkännande ersätter inte ditt — stopp 1 är fortfarande ditt beslut." (rad 334). Om kunden alltid ska godkänna prototypen är en öppen fråga (§14).
- **Kartan:** Kundens väg, steg 4: "Kunden väljer." Claudes förslag, inte beslutat: "Johnny ser de tre riktningarna innan kunden gör det" (`karta/README.md`).
- **BESLUT.md:** Johnny 18:05: "…presentera 3 riktningar på hur hens hemsida kan se ut. Dessa presenteras, han tycker riktning 2 var bra, vi går vidare och bygger den, jag som human in the loop kommer in för granskning."
- **Johnny behöver avgöra:** Kunden väljer, enligt hans eget beslut. Öppet är om Johnny ska godkänna riktningarna innan kunden ser dem, och om det i så fall är ett stopp eller bara att han ser dem.

### Konflikt 4. `CLAUDE.md` *(LAGE nr 4, verifierad och fördjupad)*

- **Guiden:** Roten har en `CLAUDE.md` med "Flödesregler, faser, pekare till skills" (§3, rad 165). Den är låst: "Ändringar av `CLAUDE.md`/`AGENTS.md` sker bara via dig (ny låsning)." (§10.1, rad 1442). §16 steg 7 säger: "Skriv `CLAUDE.md` för projektet med fasregler, stoppvillkor och regeln för meddelanden".
- **Kartan:** Dagens `CLAUDE.md` (33 rader) är skriven för sessioner som arbetar *i repot*: "Johnny beslutar. Claude föreslår, bygger och kontrollerar." och "**Spåren sammanförs inte på egen hand.**"
- **Fördjupning:** Spåren talar om två olika filer. Guidens `CLAUDE.md` styr *flödets agenter* när en sajt byggs. Kartans styr *utvecklingen av byggsystemet*. Guiden vill dessutom paketera byggsystemet "som **ett plugin i ett eget repo**" (§8.8, rad 1324), och då hör flödets regler hemma i pluginet och i `sites/<namn>/CLAUDE.md`, inte i det här repots rot.
- **BESLUT.md:** Inget.
- **Johnny behöver avgöra:** Ska rotfilen förbli arbetsfilen för repot (kartans), med flödets regler i plugin- eller sajtfiler? Ska rotfilen vara låst så att bara Johnny ändrar den (guiden)?

### Konflikt 5. Hur beslut förs *(LAGE nr 5, verifierad och fördjupad)*

- **Guiden:** Besluten står som kryssrutor i §14 och i ändringsloggen, med formuleringen "avgjort 2026-10-14" (Cloudflare, rad 2137) och "beslut 2026-10-14" (Claude Design används inte som designmotor, rad 1866). Johnnys egna ord finns inte där.
- **Kartan:** "Ett beslut skrivs ordagrant i `BESLUT.md` med datum och klockslag." (`CLAUDE.md`).
- **Fördjupning:** Guidens två beslut från 2026-10-14, Cloudflare som värd och att Claude Design inte blir designmotor, **finns inte i BESLUT.md**. Omvänt har BESLUT.md delvis besvarat guidens öppna fråga "**Nisch och paket (§15):** vilken bransch och vilka kunder" (rad 2186). Johnny 17:48: "Min nisch är ju otekniska småföretagare som betalar mig för hemsida och förvaltning så de slipper tänka på det".
- **Johnny behöver avgöra:** Ska BESLUT.md vara det enda beslutsregistret? Om ja: vill han bekräfta guidens beslut från 2026-10-14 med egna ord så att de kan föras in?

### Konflikt 6. Originalitet och lån mot Johnnys licensbeslut *(ny)*

- **Guiden:** "Vi fångar **bara kundens egen sajt** — aldrig någon annans. Att klona andras sajter bryter mot upphovsrätt och mot originalitetskontrollen (fas 4)." (fas 0b, rad 266). "…kontrollerar att ingen sektion är en kopia — inspiration ja, avbild nej. En sektion som är för lik en referens är ett `hög`-fynd." (fas 4, rad 414). Generatorn får "**inte** referensbilderna eller skärmdumparna" (fas 2, rad 360). Om referenssajter med REA: "**Aldrig kod, grafik eller hela sidor.**" (§11.11, rad 1655). Guidens egen läsning: "att *kopiera* kod, grafik eller skyddad design är intrång" (rad 1659). Guiden låter däremot referensernas exakta värden för färger, typsnitt och avstånd bli "utgångspunkt för vår `design.md`" (fas 2, rad 357).
- **Kartan:** "Från referenser får layout, palett och typsnitt lånas. Identitet, texter och bilder från andra företag kopieras inte (Johnnys regel från nortropic-webb-pro, 2026-10-03, som står kvar tills han säger annat)." (`CLAUDE.md`). Rapporten tillämpar samma gräns (lager 4 och 5).
- **BESLUT.md:** Johnny 18:50: "jag har godkännande för licenser att kopiera, reverse engineera och ta andra företags designer. Vi betalar ju för dessa saker." Under **Relaterat** noterar Claude att regeln från 2026-10-03 står kvar.
- **Fördjupning:** Båda spåren är snävare än ordalydelsen 18:50. Guiden är snävast: den underkänner en sektion som är för lik, fast regeln från 10-03 tillåter att layouten lånas. 18:50 kan läsas på två sätt: (a) licenser för betalda verktyg och material, som Refero, Mobbin, Inspo eller kommersiella kit, tillåter att innehållet används, eller (b) en allmän rätt att ta andra företags design. Läsning (b) går längre än någon licens ett verktyg kan ge om tredje parts sajter. Rapporten flaggar dessutom licensvillkor som begränsar även betalt material, till exempel Tailwind Plus (förbjuder teman och "website builders") och GPL-2.0 för Go-temat (*tolkning, inte juridisk rådgivning*).
- **Johnny behöver avgöra:** Vad omfattar 18:50, läsning (a) eller (b)? Ska guidens originalitetskontroll, regeln mot bilder till generatorn och förbudet mot demosajter av presumtiva kunders sajter (§15.3) stå kvar, mjukas upp till regeln från 10-03 eller tas bort?

### Konflikt 7. Många låsta kontroller och granskare mot "börja enkelt" och Galls lag *(ny)*

- **Guiden:** Låsning i fyra lager (§10.2), fyra specialister i fas 6 plus 3–5 heuristikgranskare (§11.4), kritiker och rättare (fas 6b), adversarial granskning av planen (fas 1b), cirka 50 omnämnanden av låsta kontroller, 196 fallgropar (§13) och 77 tabellrader med verktyg (§12). Kontrollerna har vuxit video för video. v0.72 och v0.73 lade till låsta kontroller mot text i bild och mot versaler.
- **Guidens egna motvikter:** bänken, "en regel med **bara en källa står på bänken**" (§11.6, rad 1623). Pilotfasen (§5.4). Frågan "**⚠️ Är planeringen för tung?**" ska avgöras med eval (fas 1b, rad 316–319). Placeringsordningen prompt → CLAUDE.md → skill → MCP → hook (§8.7).
- **Kartan:** "Över allt: börja enkelt, och lägg bara till komplexitet när den mätbart förbättrar resultatet." och "Bara det som gjorts för hand tre gånger automatiseras." (`principer.md`). Från `historik/webb-pro.md`: "**Rören verifierades, inte vattnet.**", "**Johnnys ord blev mekanik.** En fråga om detaljer blev samma förmiddag en station och ett grindkriterium." och "**Det komplexa kom före det enkla.** Enligt Galls lag…". Webb-pro hade "61 skills, med 67 dokumenterade krockar".
- **BESLUT.md:** 17:32 ("ta små steg"). Det finns inget beslut om antalet grindar.
- **Fördjupning:** Guiden mäter mest *mekaniken*: att kontroller är låsta, att status har bevis och att filer inte ändrats. Kartan mäter mest *vattnet*, alltså Johnnys domar och kundens utfall. Guidens §9.6 (kalibrering mot Johnnys smak) är det ställe där spåren möts.
- **Johnny behöver avgöra:** Är guidens grindar en byggplan eller en katalog? Vilken minsta uppsättning krävs för sajt nummer ett? Ett förslag att pröva: kartans grindtabell i lager 8 plus en kalibrerad bedömare.

### Konflikt 8. Installera tredjepartsverktyg mot destillera till egna skills *(ny)*

- **Guiden:** Verktyg tas in som tillval efter urvalskriterierna, Caliper och Skill Spector, och "**Låsta versioner**" (§12, rad 1802–1815). Externa *granskningsskills* "arbetas in i den låsta granskarskillen", men många verktyg installeras som de är, till exempel Inspo, Variate, Tastemaker, REA och Scrollcraft.
- **Kartan:** "Externa skills och MCP:er används när skillen och biblioteket byggs" (`karta/README.md`). Inventeringens dom är oftast "destillera".
- **BESLUT.md:** Johnny 18:52: "…vi gör en ordentligt inventering och går skill för skill för att bygga egna, mcps utvinner vi". Beslutet ligger närmare kartan.
- **Johnny behöver avgöra:** Gäller "bygga egna" även guidens tillval, så att Inspo, Variate med flera blir byggverktyg och inte används i kundbygget? Var går gränsen för MCP:er som behövs vid körning, som Search Console och Cloudflare?

### Konflikt 9. Förvaltning som produkt mot paket och byggflöde *(ny)*

- **Guiden:** Målet är ett flöde "från idé till färdig, granskad webbplats" (§1, rad 94), med förvaltning som sista fas. Paketen exemplifieras med "en enkel sajt, en sajt med scrollytelling och förvaltning per månad" (§15.1, rad 2198). Tjänstetrappan går från sajtgranskning till bygge till förvaltning: "ingen förvaltning utan ett levererat bygge" (rad 2214). Förvaltningens nivå är öppen (§14, rad 2170). Huvudmåttet är nordstjärnan per kund (fas 8a).
- **Kartan:** "Förvaltningen är produkten. En sajt byggs en gång men förvaltas varje månad för varje kund." (`karta/README.md`). Huvudmåttet är "kontakter från Google-profilen" (`karta/9-drift-forvaltning.md`).
- **BESLUT.md:** Johnny 17:48: "…otekniska småföretagare som betalar mig för hemsida och förvaltning så de slipper tänka på det". Innebär-raden, Claudes tolkning: "förvaltningen är produkten".
- **Johnny behöver avgöra:** Är erbjudandet ett abonnemang där sajt och förvaltning ingår tillsammans, eller en trappa av steg som säljs vart för sig, med en betald sajtgranskning först? Vilket huvudmått ska förvaltningen redovisa: en nordstjärna per kund eller kontakter från Google-profilen?

### Konflikt 10. Sajttyp: scrollytelling mot en vanlig småföretagssajt *(ny)*

- **Guiden:** Briefen är "Berättelsen steg för steg — kapitel i scrollordning" (rad 299). Fas 5 bygger på scrollytelling-skillen. Skelettet till `story-review` är en "Sträng berättelsegranskning av en scrollytelling-sajt" (rad 1920). Om sajttypen är öppen: "**Sajttyper:** bara scrollytelling-sajter, eller även vanliga flersidiga sajter?" (§14, rad 2152).
- **Kartan:** Ett utkast till kärnsektioner för en hantverkarsajt, där varje sektion besvarar en fråga som besökaren har (`karta/4-skelett.md`). Rörelsen ska vara progressiv förbättring, och scroll-drivna animationer används "bara inom `@supports`" (`karta/6-rorelse.md`). Rapporten avstår från Lenis eftersom det är scroll-jacking.
- **BESLUT.md:** Nischen (17:48) och "så de slipper tänka på det" pekar mot vanliga företagssajter. Det finns inget beslut om scrollytelling.
- **Johnny behöver avgöra:** Är standardprodukten en flersidig småföretagssajt, med scrollytelling som tillval? Det avgör om guidens fas 5–6 ska vara kärna eller tillval.

### Konflikt 11. Intervjuns form och vem som svarar *(ny)*

- **Guiden:** "Claude intervjuar användaren tills inget är oklart. Varje fråga har **färdiga svarsalternativ** (passar `AskUserQuestion`)." (fas 1, rad 271). Promptmallen lyder: "Intervjua mig om sajten. … Ge några svarsalternativ för varje fråga." (rad 312). Den som svarar är Johnny ("du").
- **Kartan:** "En fråga i taget, öppna och icke-ledande frågor om verkliga händelser, be om exempel och föreslå aldrig svar." (`karta/1-strategi.md`). Den som svarar är kunden. Historiken säger: "**Agenterna formulerade alternativen,** och Johnnys beslut blev ofta svar på deras numrerade listor." Principerna föreslår: "Johnny skriver uppdragen själv … i stället för att välja i agenternas listor."
- **BESLUT.md:** Johnny 18:05: "jag intervjuar han utifrån min lokala AI som ställer de frågor som behövs". Johnny 18:41: "det viktiga är att detta är en intervjuande AI som tar reda på de här sakerna".
- **Överlapp:** Guidens självintervju, där Claude besvarar det som går att härleda, motsvarar kartans "Research först, frågor sedan".
- **Johnny behöver avgöra:** Vem svarar i första varvet: kunden, Johnny för kundens räkning, eller en AI som spelar kund? Ska frågorna ha svarsalternativ eller vara öppna?

### Konflikt 12. Den kalibrerade bedömaren: mål och gränser *(ny)*

- **Guiden:** Cirka 100 bedömda exempel, med överensstämmelse som höjs mot "75, 80, 90, 95, 99 %" (§9.6, rad 1401–1403). En granskare får köra "**utan ditt stopp**" vid över 90 procent överensstämmelse (rad 1418). Den blinda jämförelsen görs till grind: "Förlorar vår sektion → `hög`-fynd" och "Gör designkvalitet — tidigare vår mest subjektiva grind — till en jämförelse med ett tydligt utfall." (fas 6, rad 549–550).
- **Kartan:** Johnny bedömer 30–40 skärmdumpar, och bedömaren mäts med TPR och TNR. "Bedömaren fattar de grova besluten, och finjusteringen stannar hos Johnny." "LLM-domare ligger nära slumpen när skillnaderna är subtila" (`karta/flodet.md`). Rapporten anger att parvisa domar låg på cirka 60 procent, nära slumpen för användarvänlighet.
- **BESLUT.md:** Inget.
- **Johnny behöver avgöra:** Ska bedömaren bara fälla de grova besluten (kartan), eller kunna ersätta hans stopp när den når en tröskel (guiden)? Ska den blinda jämförelsen vara en grind eller bara ett underlag?

### Konflikt 13. Autonomi och var Johnnys smak kommer in *(ny)*

- **Guiden:** "Ett autonomt flöde" (§1). "orkestreraren stannar bara **två gånger**" (§5.4, rad 832). Standardtexten i byggarprompterna: "Ingen övervakar den här körningen." (§8.6). Det finns en pilotfas med alla stopp påslagna (rad 840).
- **Kartan:** "Johnny är art director från första minuten, inte bara domare i slutet. Autonomi förtjänas steg för steg: ett steg blir självgående när det har levererat några gånger i rad utan att Johnny behövt rätta." (`principer.md`). Smaken läggs in i biblioteket "en gång" (`karta/4-skelett.md`).
- **BESLUT.md:** Johnny 17:55: "Jag vill bygga den autonoma webb byrån från start och från grunden, iterativt tillsammans med dig." Johnny 18:05: "jag som human in the loop kommer in för granskning." Båda spåren har stöd i hans ord.
- **Johnny behöver avgöra:** Ska hans smak läggas in i biblioteket en gång, eller i stopp per sajt med kalibrering? Vilket villkor släpper ett stopp: ett antal leveranser i rad utan rättning, eller en uppmätt överensstämmelse?

### Konflikt 14. Konkreta motsägelser om verktyg och tekniska detaljer *(ny)*

| Fråga | Guiden | Kartan och inventeringen |
|---|---|---|
| Lucide-ikoner | Förbjudet antimönster: "Förbjudna ikonbibliotek (videon: Lucide)" (§7.3, rad 1064) | Standardikoner: "ikoner från Lucide" (`karta/5-yta.md`) |
| Typsnittet Inter | Antimönster: "Typsnitt som avslöjar AI-slop (videon: Inter, Geist)" (§7.3, rad 1063) | Med i rapportens kuraterade OFL-lista (lager 5) |
| Fontshare | Källa till fria typsnitt (fas 5, rad 465) | "Fontshare styrs av ITF:s EULA, inte OFL, och villkoren för självhostning är olästa." (rapporten, lager 5) |
| Ortssidor | "vid behov en sida per tjänst och ort för lokal sökning" (brief 2b, rad 300) | "Ortssidor görs bara när de har eget innehåll, annars räknas de som dörrsidor" (`karta/3-struktur.md`) |
| Firecrawl | Alternativ för att fånga sajter (fas 0b, 8g) | Bevaka: "kärna är AGPL-3.0 och … Free- och Hobby-planer saknar biträdesavtal" (rapporten, lager 2) |
| marketingskills | "Hoppas över tills vidare" (§12, rad 1894) | Ta in genom destillering: customer-research, site-architecture, copywriting och seo-audit (inventeringen) |
| Säkerhetsheaders | "sätts i Worker-koden — `_headers`-filen gäller inte för svar som Workern genererar" (fas 7, rad 604) | "Astro `security.csp`, Cloudflare `_headers`" (`karta/8-teknik-kvalitet.md`). Båda kan stämma beroende på om svaret är statiskt eller kommer från en Worker. Det behöver stämmas av. |
| Bildformat | "WebP under 200 KB" som låst kontroll (§11.9) | "Astros Picture med AVIF" (`karta/7-innehall.md`) |
| Stack | Ren HTML ur Stitch-exporten eller ett ramverk är öppet. Astro för typ A väntar på bekräftelse (§14) | Astro förutsätts i varje lager (Fonts API, Picture, content collections, `security.csp`). Inget beslut av Johnny. |
| Lighthouse | 90+ i alla fyra kategorier, mobil och dator (fas 6c) | Performance ≥ 0,90 plus LCP, CLS och TBT, median av 3–5 körningar (lager 8) |

**Johnny behöver avgöra:** Det här är detaljer. De kan avgöras när den första sajten behöver dem, men de måste hamna på ett ställe så att spåren inte låser motsatta regler.

---

## 3. Luckor åt båda håll

### Det guiden saknar och kartan eller inventeringen har

| Lucka i guiden | Var i kartspåret |
|---|---|
| **Johnnys ordagranna beslut** och historiken från webb-pro (Galls lag, "rören verifierades, inte vattnet", 61 skills med 67 krockar) | `BESLUT.md`, `historik/webb-pro.md` |
| **Garretts fem plan** som struktur och **Atomic Design** (tokens → komponenter → sektioner → mallar → sidor) | `karta/README.md`, rapporten lager 4 |
| **Sektionsbibliotek** med 2–3 layouter per sektion, kärnsektioner för en hantverkarsajt, sektionen Serviceområde | `karta/4-skelett.md` |
| **Stilkit (3–5)** och token-pipeline: DTCG 2025.10, Terrazzo, Leonardo, Radix, Utopia med 2,5×-regeln, OFL-lista, 26-punktslista | `karta/5-yta.md`, rapporten lager 5 |
| **Branschmallar** med nyckeln SNI 2025 ↔ Google-kategori ↔ Places-typ ↔ schema.org | `karta/2-omfattning.md` |
| **Top Tasks med triangulering** och **MoSCoW** | `karta/2-omfattning.md` |
| **IA-reglerna** rättade mot primärkällor, **dörrsidor**, trädtest som rök-test, nyckelresor | `karta/3-struktur.md` |
| **Intervjuhantverk:** JTBD, question protocol, check answers, betyg 1–4, research ur register före samtalet | `karta/1-strategi.md` |
| **Primitiver utan JavaScript** och W3C APG, GOV.UK:s "HTML först" | `karta/4-skelett.md`, `karta/6-rorelse.md` |
| **Svensk språkgrind** (Vale med Nortropic-sv, Hunspell, LIX, korpusmätning enligt llepafils) och **ägarens röst** (KB-Whisper, röstprofil) | `karta/7-innehall.md` |
| **Fotolista** efter Googles kategorier, alt-text enligt W3C och 1177, exif-GPS | `karta/7-innehall.md` |
| **Grindtabell med exakta trösklar**, lychee, MDN Observatory, CSP, axe i WebKit, WCAG-EM | `karta/8-teknik-kvalitet.md` |
| **Förvaltningsmodell** (pm3, ITIL 4, SRE, DORA), tjänstenivåer, Renovate med karenstid, extern övervakning, ändringsflöde från mejl eller SMS, månadsrapport | `karta/9-drift-forvaltning.md` |
| **Kalibreringsmetod:** 30–40 skärmdumpar, 10–20 procent som få-shot-exempel, TPR och TNR, bedömaren fattar bara grova beslut | `karta/flodet.md`, `LAGE.md` ("Börja nu") |
| **Lärdomar från AI-byggarna** (Wix ADI, Squarespace Blueprint, GoDaddy Go): välj inom ett system i stället för att uppfinna | `principer.md` |
| **99 kandidater** och 72 delar ur webb-pro med förslag per del, till exempel better-*-familjen, refero-design, design-system och writing-for-agents | `inventering/inventering.json` |
| **Lång ledtid:** ansök om API-åtkomst för Google Business Profile (guiden nämner det i 8g), Renovate, `/skill-doctor`, kalibreringsomgången | `LAGE.md`, `inventering.json` → `borja_nu` |
| **Rätts- och licensflaggor:** Googles EEA-villkor för Places, en enskild firmas registeruppgifter som personuppgifter, Tailwind Plus, GPL för Go, Iconify med GPL- och CC BY-set | Rapporten, lager 1, 4 och 5 |

### Det kartan saknar och guiden har

| Lucka i kartan | Var i guiden |
|---|---|
| **Juridik per kund:** tillgänglighetsmodul över mikroföretagsgränsen, **DOS-lagen** för vård med offentlig finansiering, DPF och Latombe-målet, Supabase utan DPF (kräver TIA), Resends loggar i USA, AI-förordningen för chattar, upphovsrätt till AI-material, vad kundavtalet ska innehålla | §11.13 (rad 1750–1776), §11.10 |
| **Cloudflaredetaljer:** .se-domäner registreras hos svensk registrator, Cloudflarekonto per kund som kunden äger, med 2FA och avgränsad nyckel, Workers i stället för Pages, headers i Worker-koden, publika förhandsadresser bakom Access, staging med egen D1, Turnstile, D1 i EU-jurisdiktion, att `wrangler rollback` inte återställer data | Fas 0, fas 3, fas 7 |
| **Säkerhetsmodell:** skyddshook, kassaskåp med en samling per kund, Skill Spector, sandlåda, extern text som data, tillsyn efter konsekvens och räckvidd, aldrig massutskick | §7.3, fas 8d, §12 |
| **Behörigheter per roll** och vad Claude Code faktiskt kan begränsa (version 2.1.281) | §5.2 |
| **Promptregler och modellrisker:** tyst modellbyte, effort per roll, belägg för varje statusrad | §8.6 |
| **Faktabas per kund** (en fil per faktum) och ärlighetsregeln för bilder | §11.8, §11.9 |
| **Intagets affärsdel:** stoppet eller läckan, utbud eller efterfrågan, nordstjärna med baslinje, oskrivna regler, sökordsanalys | Fas 1 |
| **Kontroll av socialt bevis** (moderniseringsdirektivet), konkret i stället för generiskt, svensk typografi (tankstreck, versaler) | Fas 6 |
| **Eval av flödet:** testsvit, mått per körning, Caliper per tillval | §9.1–9.5 |
| **Företaget runt flödet:** paket, tjänstetrappan, ärendeagent med riskklasser, kundflöde med GDPR artikel 14, enhetsekonomi och prissättning | §15 (rad 2190–2259) |
| **Research med linser** (STORM) och märkningen sett, härlett eller okänt | §11.12, §11.11 |
| **Ombyggnad i detalj:** integrationer, spårare och formulärmottagare, före-mått | Fas 0b |
| **Förvaltningsdetaljer:** AEO, Business Profile saknar läsroll och nya managers väntar 7 dagar, förhör före sammanslagning, visuell regression mot baslinjen från stopp 2, arkitekturgranskning varje kvartal | Fas 8a–8g |
| **Lansering:** platshållare, inga arbetsverktyg i produktion, avstämning mellan löften och resultat, designad 404-sida, bekräftelsemejl som fungerar i mejlklienter | Fas 7, §15.1 |
| **Byggsystemet som versionerat plugin** med canary-utrullning | §8.8 |
| **Researchen från 2026-10-14** (sex rapporter) har kartan bara delvis tagit in: i lager 8 och 9. Juridiken i §11.13 saknas. | `kunskap/research/2026-10-14_*.md` |

---

## 4. Inventeringen mot guidens verktyg

`LAGE.md` säger själv: "verktygen som guiden föreslår är inte införda i inventeringen än". Listorna nedan visar hur stort glappet är.

**Verktyg och skills i guiden som saknas i `inventering.json`:**

- **Design och referenser:** Stitch-CLI och Googles `stitch-skills`, Tastemaker, design-md-planner, Variate, Aura.build, Relume (i rapporten bara Bevaka), Coolors, Land-book, gallerierna per sektion, Typewolf, Fonts In Use, WhatTheFont, Fontshare, Aceternity UI, React Bits, Landing Page Design (elayadesign), designer-skills (Owl-Listener), Meng Tos skills, web-design-guidelines (Vercel Labs; inventeringen nämner Vercels riktlinjer bara som förankring), UI Skills-MCP, ADHD, Arena.
- **Rörelse:** scrollytelling (doodledood), Scroll World, Scrollcraft, img2threejs, LottieFiles, transitions.dev, 60fps.design, Motion Primitives, Higgsfield. Remotion finns i inventeringen som Pröva.
- **Granskning och kvalitet:** Caliper, Reticle, Anti-Slop, Slop Monster, Playwright CLI (inventeringen har Playwright och Playwright MCP), Vizzly, Matt Pococks `codebase-design` och `improve-codebase-architecture`, Thermonuclear, `/simplify`, Ultra review.
- **Säkerhet:** Skill Spector, Claude Security, `cloudflare/security-audit-skill`, Mantis, CodeRabbit, Docker Sandbox.
- **Flöde och agenter:** Jev-verktygen, Chisle, Graft, Agit, Codeburn, Task Observer, Paseo, Symphony, Handoff, Wayfinder, Grill Me, Find Skills (vercel-labs/skills), advise-project-approach, Addy Osmanis agent-skills, Astryx.
- **Data och drift:** REA, Firecrawl (i rapporten Bevaka), OpenSEO, Google Workspace CLI, GA4:s officiella MCP (i rapporten Bevaka), Resend-MCP, Supabase med advisors, Stripe Best Practices, Clay.

**Kandidater i inventeringen som saknas i guiden** (alla 99 har beslutet "ej fattat"):

- **Lager 1:** marketingskills `customer-research` (guiden hoppar över hela marketingskills), wondelai JTBD och obviously-awesome, knowledge-work-plugins (smb-onboard, review-reputation, competitive-brief), Bolagsverkets API, SCB, Google Maps Grounding Lite, pm-skills `interview-script`, Geiecke och Jaravels metod.
- **Lager 2:** crawl4ai, ai-website-cloner-template, metoden för innehållsinventering och flytt, Cloudflare Browser Rendering, SiteOne och advertools, Screaming Frog, PolyFuzz, DataForSEO MCP.
- **Lager 3:** marketingskills `site-architecture`, Mermaid, `@astrojs/sitemap` och schema-dts, seo-graph, astro-seo-schema, `claude-seo` seo-local (guiden nämner "Claude SEO" en gång som något att pröva), UXtweak och Lyssna.
- **Lager 4:** AstroWind, Accessible Astro, `<details name>`, Every Layout, GOV.UK Frontend, Popover och Invoker Commands, Fulldev UI, HyperUI, Basecoat, CodeStitch, Zag.
- **Lager 5:** DTCG, Terrazzo, Leonardo, Color.js och Radix, Astro Fonts och Fontsource, Utopia och Capsize, OFL-listan, Lucide och astro-icon, shadcns namn för tokens, Go, Flowbite och daisyUI, Tabler, Phosphor och Simple Icons, Harmony och tweakcn.
- **Lager 6:** `@view-transition`, rörelsepolicyn, scroll-drivna animationer, Open Props.
- **Lager 7:** Vale, Hunspell sv_SE, llepafils, KB-Whisper och whisper.cpp, röstprofilen, Astro Picture och sharp, fotoguide och alt-textskill, FFmpeg, copywriting och brand-review, LanguageTool, vale agent-tools, rembg, nanobanana-mcp-server, faster-whisper.
- **Lager 8:** Lighthouse CI, lychee, Astro `security.csp`, MDN HTTP Observatory, skärpt axe, Rich Results Test, IBM Equal Access, Unlighthouse, WCAG-EM Report Tool, seo-audit.
- **Lager 9:** Renovate, claude-code-action och Email Routing, content collections, seo-monster, UptimeFlare och Uptime Kuma, Checkly, Plausible eller Umami, 46elks, Pages CMS, Changesets, DNSControl, frappe/builder. Överlapp: `cloudflare/mcp` motsvarar guidens `https://mcp.cloudflare.com/mcp` (fas 7), och Cloudflare Web Analytics nämns i båda.
- **Flödet:** långkörningsmönstret, `claude plugin eval`, ralph-loop, hookify och claude-md-management, superpowers, Showboat och design-critique, bolt.diy och screenshot-to-code, open-design. Överlapp finns för `/goal` och Stop-hooken (§5.1, §7.2), skill-creator (§12, Skillify steg 2) och Karpathys loop (§10.1).

**Finns i båda, med olika omdöme:** Inspo (guiden: används i fas 1b, inventeringen: Byggverktyg), Hallmark, Impeccable, Humanizer, Emils skills, frontend-design, Taste, UI UX Pro Max, 21st, Refero, Mobbin, GSAP, Motion, Playwright, Chrome DevTools, mcp-gsc. Inventeringen föreslår Släpp för `taste-stitch` (Stitch-specifik), medan guiden bygger på Stitch.

---

## 5. Beslutsfrågor till Johnny, samlade

Ordnade efter vad den första sajten behöver först.

1. **Designsättet** (konflikt 1): eget bibliotek med 3–5 kit, Stitch per sajt, eller Stitch inom kitets tokens?
2. **Ordningen** (konflikt 2): en verklig sajt först, med guidens mekanik som katalog? Vad händer med videogenomgången under tiden?
3. **Sajttypen** (konflikt 10): vanlig flersidig småföretagssajt som standard, med scrollytelling som tillval?
4. **Licensbeslutet 18:50** (konflikt 6): gäller det betalda verktyg och material, eller andra företags sajter? Vad händer då med guidens originalitetskontroll?
5. **Intervjun** (konflikt 11): vem svarar i första varvet, och ska frågorna ha svarsalternativ eller vara öppna?
6. **Riktningsvalet** (konflikt 3): kunden väljer enligt beslutet 18:05. Ska Johnny se riktningarna först?
7. **Grindarna** (konflikt 7 och 12): vilken minsta uppsättning gäller för sajt ett, och får bedömaren bara fälla grova beslut eller också ersätta stopp?
8. **Egna skills eller installerade verktyg** (konflikt 8): gäller "bygga egna" (18:52) även guidens tillval?
9. **Erbjudandet** (konflikt 9): abonnemang med sajt och förvaltning tillsammans, eller en trappa av steg? Vilket huvudmått ska förvaltningen redovisa?
10. **Beslutsregistret och `CLAUDE.md`** (konflikt 4 och 5): BESLUT.md som enda register? Bekräfta Cloudflare och "Claude Design används inte" med egna ord? Vem får ändra rotens `CLAUDE.md`?
11. **Detaljerna i konflikt 14** avgörs när en sajt behöver dem, men på ett ställe.

*Allt ovan om lag och licenser är tolkning, inte juridisk rådgivning.*
