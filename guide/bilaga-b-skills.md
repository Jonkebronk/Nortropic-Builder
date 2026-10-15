# Bilaga B – Egna skills

**Status:** konsoliderad v1.0, 2026-10-15; nivåerna ommärkta samma dag. Ingen egen skill finns än (`LAGE.md`). Ersätter v0.74 §12:s del om egna skills. Skeletten `stitch-review` och `story-review` i v0.74 var äldre än reglerna (konsolideringsanalysen M11) och är strukna; den enda granskaren i N1 ersätter dem.

Kompetensen delas i tre: **egen skill** (kunskapen), **eget bibliotek** (sektioner, stilkit, rörelser, mallar) och **åtkomst vid kundbygget** (API:er och MCP:er) (`historik/karta/README.md`). Den här bilagan säger vilka egna skills som behövs och när. Vad varje skill kan står i lagerfilerna; biblioteket i `2-4-skelett.md` och `2-5-yta.md`; tredjepartsverktygen i `bilaga-a-verktyg.md`; tak, test och underhåll av skills i `3-4-larande-och-underhall.md`. Grunden är Johnnys beslut att bygga egna skills och ett eget bibliotek ur inventeringen (`BESLUT.md` 2026-10-13 18:47, 18:52).

Korta hänvisningar avser filer i `guide/`: `3-2` = `3-2-granskning-och-kalibrering.md` och så vidare. **B** och **K** med nummer är poster i `inventering/inventering.json` (`befintligt` respektive `nya`), som i `bilaga-a-verktyg.md`.

## Första varvet: fyra utkast

Den första sajten byggs interaktivt i huvudsessionen medan Johnny tittar, i sex steg (`5-byggplan.md`). Fyra av stegen körs med ett kort utkast i skillformat: syfte, in, ut, begränsningar och pekare till underlaget i lagerfilerna. Utkasten har ingen arbetsgång – den kommer ur körningen, och det som görs för hand noteras i `progress.md`. Utkasten ligger i `.claude/skills/` (`bilaga-f-projektstruktur.md`). 🔧 (flödet först men synligt i varje steg, `BESLUT.md` 2026-10-15)

- [N1] **`intervju`** kör `5-byggplan.md`, steg 1: de åtta kärnfrågorna med verksamheten, briefen med sex rubriker och `fakta.md`.
- [N1] **`riktningar`** kör steg 2: tre minimala stilkit och startsidan i vart och ett. Johnny stryker, kunden väljer.
- [N1] **`bygg`** kör steg 3: hela sajten i det valda kitet. Johnny dömer direkt, utan granskare.
- [N1] **`granska`** kör steg 4: en delagent med ren kontext och en checklista. Johnny jämför fynden med sin egen dom.

Steg 5 (publicering) och steg 6 (den första rapporten) görs för hand (*Inte skills i första varvet* nedan). Utkasten blir fullständiga skills enligt Skillify (*Så skapas en skill*).

### `intervju` – steg 1, lager 1

- **Syfte:** stöd åt Johnny när han intervjuar kunden: håller ordning på kärnfrågorna, föreslår följdfrågor och fyller briefen och faktabasen under samtalet, så att underlaget räcker för de tre riktningarna. (`BESLUT.md` 2026-10-13 18:05, 18:41; 2026-10-15)
- **In:** samtalet med kunden. Det som redan finns om företaget, till exempel kundens sajt och Google-profil, märkt sett, härlett eller okänt (`guide/README.md`, *Sett, härlett, okänt*).
- **Ut:** `sites/<namn>/brief.md` med sex rubriker: sammanfattning, nordstjärna, besökare, primär handling, ton och intryck (med rörelsebudgeten) och får inte påstås. `sites/<namn>/fakta.md` med källa per faktum, där varje faktum är bekräftat av kunden (→ `2-7-innehall.md`). En lista över det som saknas, till exempel bilder och texter, som frågor till kunden.
- **Begränsningar:** de åtta kärnfrågorna, inte hela intervjuguiden. Öppna frågor, en i taget, utan färdiga svarsalternativ. Gissar aldrig ett faktum – frågar. Research om branschen blir aldrig fakta om kunden. Lovar inget om resultat. Sidkartan står inte i briefen.
- **Underlag:** kärnfrågorna och briefmallen (→ `2-1-strategi.md`).
- **Destilleras ur:** webb-pros `kunskap/kundintervju.md` och `brief-mall.md`; K1 customer-research, K2 jobs-to-be-done, K3 smb-onboard, K8 Geiecke och Jaravels metod; K7 interview-script och Matt Pococks Grill Me bara kritiskt, eftersom Grill Me intervjuar användaren och inte kunden (→ `2-1-strategi.md`, `bilaga-a-verktyg.md`). Inventeringen: "Det finns ingen färdig AI-intervjuare för småföretagssajter."
- **Öppet:** om skillen överlappar `nortropic-intake` – se `bilaga-e-oppna-fragor.md`, fråga 2.5.
- Sidkartan görs i samma steg men utanför utkastet: en tabell i `sites/<namn>/sidkarta.md` (→ `2-3-struktur.md`).
- Ersätter v0.74:s `brief-interview`.

### `riktningar` – steg 2, lager 5 med lager 4

- **Syfte:** tre riktningar – startsidan i tre minimala stilkit – som Johnny ser först och kan stryka innan kunden väljer. (`BESLUT.md` 2026-10-15)
- **In:** briefen, särskilt ton och intryck, och faktabasen.
- **Ut:** tre minimala stilkit, vart och ett med färg, typsnitt (med licens), avstånd och radie samt en kort `design.md` med personlighet, typsnitt och referenser. De sektioner startsidan behöver, en variant var. Startsidan i de tre kiten som förhandsvisning och skärmdumpar i mobil- och datorbredd, med en mening per riktning om varför den passar briefen.
- **Begränsningar:** Stitch används på provsidan i dator och mobil när kiten tas fram – aldrig med kundinnehåll och aldrig per kund i övrigt. Bara de sektioner startsidan behöver. Riktningarna ska skilja sig på riktigt. Referensregeln och licens per tillgång → `2-5-yta.md`.
- **Destilleras ur:** webb-pros `designfas` (B20). Regler för stilkit och referenser → `2-5-yta.md`; sektionerna → `2-4-skelett.md`. Verktygen (Stitch-CLI, Inspo) → `bilaga-a-verktyg.md`.
- [N2] **Från sajt 2 väljer utkastet bland befintliga stilkit och sektioner** och uppfinner inga färger, typsnitt eller sektioner. Att byta stilkit blir ett skript; utkastet väljer och motiverar. Nya kit tas fram i biblioteksarbetet, inte här.
- Ersätter v0.74:s riktningar ur Inspo i fas 1b. Går upp i `yta` [N2].

### `bygg` – steg 3, lager 4, 5, 7 och 8

- **Syfte:** bygger hela sajten i Astro i det valda kitet, med kundens fakta.
- **In:** briefen, sidkartan i `sites/<namn>/sidkarta.md`, faktabasen, det valda kitet, startsidans sektioner från steg 2 och Astro-skelettet.
- **Ut:** standardsidorna – start, tjänst eller tjänster, om oss, kontakt och 404 – med de sektioner de behöver. Tacksida och integritetspolicy bara med formulär; om en policy behövs utan formulär är öppet (`bilaga-e-oppna-fragor.md`, fråga 1.8). Sajten bygger lokalt och visas för Johnny i webbläsaren. En lista över platshållare och antaganden.
- **Begränsningar:** bara kitets värden. Nya sektioner byggs så att de kan återanvändas i biblioteket, en variant var (→ `2-4-skelett.md`). Bara fakta ur faktabasen; annars en markerad platshållare och en fråga. Rörelse bara inom briefens rörelsebudget (→ `2-6-rorelse.md`). Texterna följer `2-7-innehall.md`. Ingen granskare i det här steget – Johnny dömer direkt.
- **Destilleras ur:** webb-pros `byggstandard.md` och Astro-mallen, och formulärkomponenten när formulär tas in [N2]; B13 better-writing och B38 Humanizer för texterna. Regler → 2-4, 2-5, 2-7, 2-8.
- Delas i lagerskillsen för skelett, yta, text och kvalitet [N2].

### `granska` – steg 4, flödet, lager 4–8

- **Syfte:** en granskare med ren kontext bedömer sajten mot briefen, kitet och en kort checklista. Fynden jämförs med Johnnys egen dom. En granskare räcker i första varvet (analysen M9).
- **In:** skärmdumpar sektion för sektion i mobil- och datorbredd, briefen, faktabasen, det valda kitet och checklistan. Inte byggarens logg, `CLAUDE.md` eller rundnummer (→ `3-1-orkestrering-och-roller.md`).
- **Ut:** en checklista i markdown i `sites/<namn>/reviews/` med element, förväntat, faktiskt och allvar per fynd, och överst en dom i Johnnys form: godkänd eller underkänd, kort kritik och för en underkänd sajt *För godkänt:* (→ `3-2-granskning-och-kalibrering.md`). Johnny avgör vilka fynd som var rätt; hans domar och motivering loggas i `domar.jsonl` (`5-byggplan.md`, steg 4).
- **Begränsningar:** bedömer, rättar inte. Varje fynd pekar på ett element och ett kriterium. Gissar inte när underlaget är tunt. Bedömer alltid mot en referens (fallgrop 61). Ett fynd mot ett kriterium med en källa får högst allvaret `medel`.
- **Underlag:** granskningsmallen, som skrivs i det här steget, och Johnnys bedömda exempel från förberedelserna (→ `3-2`).
- **Destilleras ur:** B8 better-interface-review, B39 Impeccable, designer-skills, web-design-guidelines, Landing Page Design och B37 Hallmark – en källa i taget (`bilaga-a-verktyg.md`). Inventeringen: den kalibrerade bedömaren (K90) måste byggas själva.
- Ersätter skeletten `stitch-review` och `story-review` och, i första varvet, kod-, design- och berättelsegranskarna.

### Inte skills i första varvet

- **Kontrollskriptet** med de tio N1-kontrollerna byggs i steg 3: ett skript med Playwright och axe, inte en skill. Där svaret är känt avgör koden, inte modellen. 🎥 FDE-videon och VAULT-videon (två oberoende, analysen §4.3). → `2-8-teknik-och-kvalitet.md`, `bilaga-c-kontroller.md`
- **Research och sidkarta:** för hand i steg 1 (→ `2-1-strategi.md`, `2-3-struktur.md`). Sidkartan är en tabell i `sites/<namn>/sidkarta.md`, inte en del av briefen.
- **Publicering:** för hand i steg 5, om sajten publiceras (`bilaga-e-oppna-fragor.md`, fråga 1.3), efter Johnnys godkännande (→ `2-8-teknik-och-kvalitet.md`).
- **Den första rapporten:** för hand med Claude i steg 6 (→ `2-9-drift-och-forvaltning.md`).
- **Stilkit och sektionsbibliotek utöver första sajten:** biblioteksarbetet, som Johnny och Claude gör för hand (→ `2-4-skelett.md`, `2-5-yta.md`; verktygen i `bilaga-a-verktyg.md`).
- **Orkestreringen:** i N1 binder huvudsessionen ihop stegen. Kommandot `/bygg-sajt` ur v0.74 byggs när stegen finns (→ `3-1-orkestrering-och-roller.md`, `5-byggplan.md`).

## Så skapas en skill

- [N2] **När ett steg gjorts för hand tre gånger blir utkastet en skill (Skillify).** Claude gör om sessionerna till en skill med skill-creator, Johnny granskar, och skillen prövas med och utan. Varför: en skill ska bygga på hur vi faktiskt arbetar, inte på hur vi tror att vi arbetar (fallgrop 117). 🎥 Boris-skills-videon; 📄 `guide/README.md`, princip 8 (Claudes förslag: bara det som gjorts för hand tre gånger automatiseras). Provet och regeln om verklig körning → 3-4; versionerat plugin [N4] → 3-4.
- [N2] **Ett steg blir självgående först när det levererat några gånger i rad utan att Johnny behövt rätta.** Varför: webb-pro byggde mycket mekanik men lite design som Johnny dömde. 📄 `historik/principer.md` (*Ordningen*), jfr `guide/README.md`, princip 7; `kunskap/research/2026-10-15_webb-pro-genomgang.md`. När ett stopp får släppas → 3-2.
- [N2] **Inget läckt material.** Videon om Skillify bygger delvis på läckt källkod för Anthropics interna skills. Vi bygger på publika verktyg och dokumentation. 🔧

## Så skrivs en skill

- **Vad, men inte hur, och förbud behålls** → 3-4. För utkasten betyder det syfte, in, ut och begränsningar utan arbetsgång. Fallgroparna blir förbud i rätt skill (→ `bilaga-d-fallgropar.md`).
- [N2] **Ett jobb per skill, och beskrivningen säger vad och när** med de ord en verklig person använder. Inte "hjälper med innehåll" utan till exempel *"Skriver om-oss-texten utifrån kundens faktabas. Använd när sidan Om oss ska skrivas eller uppdateras."* 🎥 skill-ingenjörsvideon (en källa – bänken). Testet av att rätt skill utlöses → 3-4 (fallgrop 133, 144).
- [N2] **Byggare och granskare har skilda skills.** Granskarens kriterier står i granskarskillen och låses. En extern granskningsskill arbetas in där och installeras aldrig fristående. I N1 är `bygg` och `granska` redan skilda utkast. 🔧 Isoleringen av granskaren → `3-1-orkestrering-och-roller.md`.
- [N2] **Matt Pococks `writing-for-agents` (B61) används när skills skrivs** – regler för text som agenter läser. Hör ihop med Skillify. 📄 `inventering/inventering.json` (förslag: Behåll)
- Stilskills används inte i kundbygget → 2-5. Kod som skrivs om i varje bygge blir skript → 3-4.

## Indelning och tak

- [N2] **Målet är en skill per lager**, med kunskapen destillerad ur metoder, litteratur och externa skills, plus granskaren. 📄 `historik/karta/README.md`. De fyra utkasten delas upp per lager när innehållet vuxit.
- [N2] **Målbilden är högst tolv egna skills:** nio lagerskills, granskaren, lärandet och kunskapsbasen. En lagerskill som växer delas i delfiler i stället för i nya skills. Siffran är 🔧, en instruktion som prövas. Regeln för taket – bara de skills sajten använder, en ny skill bara när ingen befintlig täcker behovet – och `/skill-doctor` står i 3-4. Varför: fler skills är inte bättre (🎥 Hermes-videon, fallgrop 47), och webb-pro slutade med 61 skills och 67 krockar (📄 `kunskap/research/2026-10-15_webb-pro-genomgang.md`).
- Inga tredjepartsskills i kundbygget → `bilaga-a-verktyg.md`, urvalskriterierna.

## Senare nivåer

| Skill | Nivå | Lager | Syfte | Ur v0.74 eller kartan | Destilleras ur |
|---|---|---|---|---|---|
| `intervju` | N2 | 1 | Utkastet blir en skill med hela intervjuguiden (→ 2-1) | v0.74 `brief-interview`; kartan lager 1 | Se utkastet |
| `omfattning` | N2 | 2 | Top Tasks, MoSCoW, branschmallar; ombyggnadsspåret med fångst, URL-inventering, omdirigeringar och före-mått (→ 2-2) | v0.74 fas 0b; kartan lager 2 | K9, K11, K12; inventeringen: branschmallarna byggs själva |
| `struktur` | N2 | 3 | Sidkarta, sökord, menyer, nyckelresor (→ 2-3) | v0.74 fas 1 (sökord), brief 2b; kartan lager 3 | K18, K23 |
| `skelett` | N2 | 4 | Regler för sektionsbiblioteket, nya sektioner, wireframes per sidtyp (→ 2-4) | v0.74 fas 2; kartan lager 4 | B9, B30, B43, K28, K29; inventeringen: sektionen Serviceområde byggs själva |
| `yta` | N2 | 5 | Ta fram och förnya stilkit; tar över `riktningar` (→ 2-5) | v0.74 fas 2 (`design.md`, Stitch); kartan lager 5 | B5, B10, B11, B27, B35, B52, B54, B55, B58; Stitch, Inspo, Tastemaker |
| `rorelse` | N2 | 6 | Bibliotekets rörelser och rörelsebudget (→ 2-6) | v0.74 fas 5; kartan lager 6 | B22, B23, B33, B36, B42 |
| `text` | N2 | 7 | Texter ur faktabasen, svensk språkgrind, ägarens röst (→ 2-7) | v0.74 fas 6 (språk); kartan lager 7 | B13, B38, K52–K56, K60; inventeringen: svenska språkregler byggs själva |
| `kvalitet` | N2 | 8 | Kontrolltabellerna, SEO och lanseringskrav, publicering; kontroller per sajt ur briefen (→ 2-8) | v0.74 `write-checks`, fas 6b, 6c och 7; kartan lager 8 | B3, B7, B26, B41, K66–K75 |
| `granska` | N2 | Flödet | Utkastet blir en skill; delfiler för specialister, heuristik och berättelsegranskning för scrollytelling-tillvalet [N4] (→ 3-2) | v0.74 `stitch-review`, `story-review`, fas 6 | Se utkastet |
| `forvaltning` | N3 | 9 | Ändringstyper, standardkatalog, schemalagda kontroller, månadsrapport, klassning av ärenden (→ 2-9) | v0.74 fas 8 och §15.2; kartan lager 9 | K81; inventeringen: månadsrapporten byggs själva. 2-9 skiljer på förvaltning och rapport; de räknas här som en lagerskill med delfiler |
| `lardomar` | N4 | Flödet | Föreslår ändringar i arbetssättet ur resultatloggar från flera sajter (→ 3-4) | v0.74 `auto-loop` (§10.5) | B1, K92 |
| `kunskap` | N4 | Flödet | Lägger till en källa i `kunskap/` och uppdaterar berörda sidor (`/ingest`) (→ 3-4) | v0.74 §11.6 | Karpathys LLM Wiki-gist (`bilaga-a-verktyg.md`); görs för hand i N2 |

## Vart v0.74:s planerade skills tog vägen

v0.74 räknade med "ett trettiotal" egna skills men namngav nio. Resten var roller, mods, skript och hooks.

| v0.74 | v1.0 |
|---|---|
| `brief-interview` | `intervju`: utkast [N1], skill [N2] |
| `stitch-review` | Struken (M11). Ersatt av `granska`; jämförelsen mot en Stitch-design per sajt finns inte längre, eftersom Stitch bara används för stilkit |
| `story-review` | Struken (M11). Berättelsegranskning blir en delfil i `granska` för scrollytelling-tillvalet [N4] |
| `write-checks` | `kvalitet` [N2]. I första varvet är kontrollerna ett skript |
| `auto-loop` | `lardomar` [N4] |
| `checkpoint-planner` | Ingen skill; funktionslistan `checkpoints.json` [N2] (→ `3-1-orkestrering-och-roller.md`) |
| `planvy` | Ingen skill; en vy i `3-5-live-visning.md` |
| `kod-kritiker` och `kod-rattare` | Inbyggda `/code-review` en gång före publicering [N2] (analysen §7.3); egna roller först [N4] (→ 3-2) |
| `stitch`, `scrollytelling` | Tredjepart → `bilaga-a-verktyg.md` |
| LLM Wiki och `/ingest` | `kunskap` [N4] |
| `project-context` som minne (§10.6) | Ingen skill; briefen och stilkitet fyller rollen |
| Roller: spanare, domare, advisor, specialister, angripare, ärendeagent | Spanare och domare → `3-1-orkestrering-och-roller.md`; advisor → `3-3-sakerhet-och-installningar.md`; specialister → `3-2-granskning-och-kalibrering.md`; angripare → `3-2-granskning-och-kalibrering.md`, *Eval*; ärendeagent → `4-foretaget.md` |
| Mods: flödespanel, antagandegranskning | → `3-5-live-visning.md` |
| Kommandot `/bygg-sajt`, skriptet `godkann-kontroller.mjs`, hooks | → 3-1, `bilaga-c-kontroller.md`, `bilaga-f-projektstruktur.md` |
| Webb-pros egna: `bygg-sajt` (B16), `designfas` (B20), `kirurg` (B40), `backlog` (B1) | Underlag till orkestreringen, `riktningar`, urvalet i `bilaga-a-verktyg.md` respektive `lardomar`; inventeringen föreslår Ompröva |
