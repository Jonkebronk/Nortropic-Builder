# Den kalibrerade bedömaren

**Källa:** en metod, inte ett repo. Lästa 2026-10-16:
- Hamel Husain, *Using LLM-as-a-Judge For Evaluation: A Complete Guide*, https://hamel.dev/blog/posts/llm-judge/ (publicerad 2024-10-29, ändrad 2026-09-01).
- Husain, *Your AI Product Needs Evals*, https://hamel.dev/blog/posts/evals/ (2024-03-29).
- Husain och Shreya Shankar, *AI Evals: Everything You Need to Know* (FAQ), https://hamel.dev/blog/posts/evals-faq/ (2026-09-18, ändrad 2026-09-21).
- Anthropic, *Demystifying evals for AI agents*, https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents (2026-01-09).
- Anthropic (Prithvi Rajasekaran), *Harness design for long-running application development*, https://www.anthropic.com/engineering/harness-design-long-running-apps (2026-03-24).
- Forskningen i `kunskap/research/2026-10-15_kompetensluckor-anteckningar/flodet-loopar-bedomare.md` §2 (Zheng 2023, Chen 2024, Luera 2025, Shankar 2024, Prometheus, Thakur); abstrakten till Luera ([arXiv 2510.08783](https://arxiv.org/abs/2510.08783)) och Shankar ([arXiv 2404.12272](https://arxiv.org/abs/2404.12272)) lästa på nytt.
- Nortropics egen mätning: `mattstock/granskare/matning-2026-10-15.md`, `mattstock/verktyg/matning.py`, `mallar/granskning.md` (låst checklista) och utkastet `.claude/skills/larande/matning.md`.
⚠️ FAQ:n är lång (cirka 150 000 tecken) och lästes via ett sammanfattande hämtverktyg i två delar; avsnitt om parvisa jämförelser och visuell utdata hittades inte där. Zhengs och Chens siffror är tagna ur forskningsanteckningarna, inte omlästa i original i dag.

**Licens:** Ingen licens angiven på hamel.dev (sidans källkod sökt efter licens och copyright, inget hittat) eller på Anthropics artiklar; vanlig upphovsrätt gäller. Metoden tas med egna ord; ingen text kopieras. arXiv-artiklarna har licens per artikel ⚠️ (inte kontrollerad); vi citerar bara siffror.

## Vad det är
Ett sätt att göra en LLM-domare pålitlig för en enda persons smak: en huvudexpert dömer exempel som godkänt eller underkänt med skriven kritik, en del av domarna blir exempel i domarens prompt, resten mäter den med fryst prompt, och domaren mäts med andelen rätt bland godkända (TPR) och underkända (TNR) var för sig. Forskningen sätter gränsen: domare är *"approximators, not replacements"* och ligger nära slumpen när skillnaderna är subtila.

## Hur det fungerar
- **En huvudexpert, en "benevolent dictator".** Husain och Shankar: utse en person vars dom definierar framgång – i ett litet företag grundaren – och lägg inte ut felanalysen. Hos oss är det Johnny.
- **Felanalys före domare.** FAQ:n kallar felanalysen *"the most important activity in evals"*: läs riktiga utfall, skriv fria anteckningar per utfall (open coding), gruppera dem till en taxonomi av felsorter (axial coding) och räkna sist; sluta när nya utfall inte längre visar nya felsorter (*theoretical saturation*). Minst 30 utfall för hand innan en agent får föreslå fel, minst 100 totalt.
- **Godkänt eller underkänt med kritik, aldrig 1–5.** Skalor är *"not actionable"*, och bedömare drar mot mitten. Behövs gradering: flera binära delkontroller (FAQ).
- **Kritiken är det som lär.** Den ska vara så konkret att en nyanställd förstår den och att den kan bli exempel. Vanliga fel i domarprompter: ingen eller för kort kritik, och att domaren saknar sammanhang som experten använde (llm-judge, *Common mistakes*).
- **Dela data:** cirka 10–20 % exempel i prompten, 40–45 % för att justera prompten, 40–45 % som körs en gång med fryst prompt. Testdelen rörs inte förrän i slutet; överanpassning sker också när justeringsdelen aldrig står i prompten.
- **Mått:** TPR och TNR var för sig; rå överensstämmelse ljuger när en klass är sällsynt. Ungefär 30 exempel för att hitta felsorterna, cirka 100 per felsort för att validera, 30–50 per etikett och del när det går. Med kända TPR och TNR kan domarens uppmätta felandel räknas om till en skattning av den verkliga (FAQ).
- **En domare per felsort eller dimension** – men först när kritikprocessen är klar och bara om det behövs; det som en fast regel kan avgöra ska vara en kodkontroll (Husain steg 7; FAQ; Anthropic *Demystifying*: *"grade each dimension with an isolated LLM-as-judge"*).
- **Utväg och delpoäng:** domaren ska kunna svara "Unknown" i stället för att hitta på (Anthropic *Demystifying*).
- **Kriteriedrift:** man behöver kriterier för att döma, men dömandet formar kriterierna (Shankar 2024). FAQ:n avråder därför från att skriva en detaljerad rubrik först.
- **Anthropics designbedömare** (*Harness design*): en separat utvärderare med Playwright navigerade den levande sidan, tog skärmbilder och kritiserade per kriterium (designkvalitet, originalitet, hantverk, funktion, med tyngd på de två första). Kalibrerad med få-shot-exempel med poänguppdelning, vilket minskade drift mellan varv. Ofiltrerad var Claude *"a poor QA agent"* som hittade verkliga fel och sedan övertalade sig själv att godkänna; botemedlet var att läsa utvärderarens loggar och skriva om prompten i flera varv.
- **Forskningens gränser** (anteckningarna §2): positionsbias (Zheng: vinst bara när båda ordningarna är eniga; få-shot höjde konsistensen), parvis jämförelse liknar människor mer än absoluta poäng (Chen), UI-domare cirka 60 % parvis och nära slumpen för användbarhet, upp mot 90 % vid stora skillnader (Luera), och domare stämmer med människor först med rubrik och referens (Prometheus).

## Kvalitet och underhåll
- Ingen kod att underhålla. Husains guide har uppdaterats två år efter publiceringen (2026-09-01), och FAQ:n är från september 2026, alltså aktuellt. Honeycomb-exemplet nådde över 90 % överensstämmelse på tre varv (llm-judge) – ett kodfall (frågespråk), inte design.
- **Ingen studie mäter domare mot människor för småföretagssajters design** (anteckningarna §2, *Gaps*), och inga publicerade siffror finns för dagens Claude-modeller som designdomare. Vårt eget underlag är därför det enda direkta.
- **Vår mätning hittills:** 31 sajter, TPR 12 av 17 (71 %), TNR 12 av 14 (86 %); 21 av 22 säkra domar rätt; egna utkast 3 av 4 (`matning-2026-10-15.md`, `LAGE.md`). Med så få sajter är osäkerheten stor: 95 % Wilson-intervall ungefär 47–87 % för TPR och 60–96 % för TNR (min uträkning, inte källans). Husains tumregel om 30–50 per etikett och del är inte nådd.

## Det bästa vi kan ta
1. **Felanalysen som rutin i genomgången efter varje sajt** (FAQ: open och axial coding, mättnad). Johnnys `varfor` och `for_godkant` i `domar.jsonl` kodas fritt, grupperas i felsorter och räknas. Det är den del som saknas i dagens metod: vi mäter träffsäkerheten men har ingen taxonomi över *vilka* fel granskaren missar.
2. **Testdelen hålls orörd.** Alla 39 domar i måttstocken är förbrukade som exempel eller mätning. Nästa mätning behöver en ny, fryst testdel som ingen checklistrevision sett (llm-judge, *Splitting data*). Redan beslutat i sak (G11, `BESLUT.md` 2026-10-16); metoden ger regeln för hur testdelen skyddas.
3. **Läs granskarens resonemang mot Johnnys, avvikelse för avvikelse** – som Anthropics QA-utvärderare. Avvikelsetabellen i `matning-2026-10-15.md` gör redan det; gör den till standard i varje mätrapport.
4. **Ge granskaren det sammanhang Johnny hade** (bransch, ort, kundens referenser) – det vanligaste felet i domarprompter enligt Husain.
5. **Skriv ut antalen och intervallet** bredvid TPR och TNR; under cirka 60 exempel är procenten nästan meningslösa ensamma.

## Var det hamnar hos oss
**Håller med förslaget: skill `larande`, delfilen `matning.md`.** Utkastet har redan tabellen med facit, delning, fryst prompt, TPR/TNR, utväg och omkalibrering. Det som bör läggas till ur den här läsningen: felanalysen med open och axial coding som steg i `genomgang.md` (punkt 1), skyddet av testdelen (punkt 2), Husains lista över vanliga fel i domarprompter, och att procent skrivs med antal och intervall. Själva domarprompten och exemplen bor i `mallar/granskning.md` och granskarskillen, inte i `larande`. Ingen kod, inget verktyg, ingen MCP – ett kalkylark eller `matning.py` räcker, som Husain själv gjorde med Honeycomb (ett kalkylark som experten dömde i, *Your AI Product Needs Evals*).

## Passar vår stack?
Ja, utan översättning av teknik. Det som måste översättas är formen: Husains "pass/fail + critique" är redan Johnnys *godkänd/underkänd + varför + För godkänt:*. Husains "en domare per felsort" motsvarar specialisterna i `3-2` (N2) och ska vänta tills felanalysen visar en felsort som den enda granskaren missar (`guide/README.md`, princip 8). Anthropics fyra designkriterier med poäng ersätts av måttstockens tre frågor; poänguppdelningen i deras få-shot-exempel motsvarar våra `fragor` (ok/svag/brister) per fråga.

## Risker och flaggor
- **Små tal.** 31 sajter räcker inte för en grind. Bedömaren får fortsatt bara fatta de grova besluten; osäkra domar går till Johnny (redan beslutat).
- **Läckage:** checklistans generella kriterier är skrivna ur alla 39 domar (förbehåll 2 i mätningen) – Husain varnar för just överanpassning mot justeringsdata.
- **Kriteriedrift åt båda hållen:** Johnny ändrar uppfattning när han ser utkast; då gäller gamla mätningar inte längre (Shankar).
- **Modellbyte** kräver ny mätning (Husain FAQ; *Harness design*).
- Inga licenser, betalväggar, telemetri eller krockar med skills; alla lästa sidor är öppna. Om författarna har betalt kursmaterial utöver detta är inte kontrollerat ⚠️ och behövs inte.

## Inloggning
Inget.
