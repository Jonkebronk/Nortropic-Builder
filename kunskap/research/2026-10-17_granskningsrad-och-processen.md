# Granskningsråd, jämförelse och processen från intervju till förvaltning

**Datum:** 2026-10-17. **Uppdrag:** Johnny, efter övningssajten. Han vill:
- jämföra varje färdig sajt mot de branschledande sajterna i alla kategorier, och själv ta ställning per kategori
- ha ett granskande organ, *"som ett slags design council, kund perspektiv, företagsperspektiv etc"*
- förankra hela flödet från kundintervju till förvaltning i litteratur och dokumentation som hålls aktuell

Hans fru tyckte att Torsoklinikens gamla sajt var finare än den vi byggde.

**Metod:** sju delagenter läste källorna 2026-10-17, på sju områden:
- öppen källkod för granskarteam
- litteraturen om granskningsråd och lekmäns omdöme
- forskningen om AI-personas och AI-domare
- jämförelse mot branschledare
- byråers publicerade processer, bland dem Kirografiks
- de etablerade ramverken
- kvalitetssäkring och förvaltning

Underlagen med alla källor ligger i sessionens scratch. De viktigaste källorna står sist. Allt under *Förslag* är förslag tills Johnny har sagt ja.

## 1. Vad fallet med originalet visar

- **Turning Torso blev en anti-referens på svagt underlag.** Briefen gjorde bilden på Turning Torso till en anti-referens med två skäl:
  - Intervjusvaret *"Min egen fungerar dåligt, för den har för mycket text och en bild på Turning Torso i stället för på mig"* (`sites/torsokliniken/intervju.md`, kärnfråga 7). Svaret är `claude-som-kund`, alltså påhittat av Claude i kundens ställe.
  - Johnnys dom i måttstocken (`mattstock/domar.jsonl`, s02): *"Underkänd, men nära"*, där Turning Torso-heron med *Välkommen till* var en del av det som fällde.

  Ingen utanför byrån fick säga något. Johnnys smak och Claudes påhittade kund drog åt samma håll.
- **Konceptet försvann.** Turning Torso i en sajt som heter Torsokliniken är en ordlek och ett landmärke i Malmö, alltså det enda på originalet som är *eget*. Huashu-designs granskningsguide kallar det *koncept* och ger det vetorätt: *"Byt kundens namn – håller designen fortfarande? Då är det en mall"* (`kunskap/kallkort/nexu-io-open-design.md`). Vår granskare har ingen sådan fråga.
- **Lekmän dömer annorlunda än byråer.**
  - Besökare bedömer visuellt tilltal inom 50 ms, och omdömet håller i sig (Lindgaard m.fl. 2006).
  - Det enkla och välbekanta upplevs som vackrast (Tuch m.fl. 2012).
  - Estetiken styr hur användbar och trovärdig sajten verkar (Kurosu och Kashimura 1995; Tractinsky m.fl. 2000; Fogg m.fl. 2002: *design look* i 46 % av kommentarerna om trovärdighet).
- **En lekman är ändå en datapunkt.** Hon kan ha varit van vid originalet, och människor ogillar förändring (Sedley och Müller, Google, CHI 2013). Smak skiljer sig också mellan grupper (Reinecke och Gajos 2014). Domen är en varning att undersöka, inte ett svar.

## 2. Vad forskningen säger om AI-granskare och paneler

- **AI-granskning:**
  - **AI är en svag smakdomare.** Multimodala modeller valde samma gränssnitt som människorna i cirka 60 % av paren och låg nära slumpen på användbarhet. Vid stora skillnader steg det till cirka 90 % (Luera m.fl. 2025). GPT-4V låg nära slumpen i UIClip (UIST 2024). Författarna: *"MLLMs be seen as UI testing approximators, not replacements."*
  - **En modell gynnar sitt eget.** Modeller känner igen och föredrar sina egna utdata (Panickssery m.fl., NeurIPS 2024). Claude som granskar en sajt som Claude har byggt är just det fallet.
  - **Ordningen styr domen.** Domare föredrar ofta det som visas först. Motmedlet: döm två gånger med bytt ordning, och oenighet räknas som oavgjort (Zheng m.fl., NeurIPS 2023).
  - **En jury slår en ensam domare.** En jury av modeller från flera modellfamiljer slog en ensam domare och kostade mindre (Verga m.fl. 2024). Studien gällde text.
  - **Debatt ger konformitet.** Det är röstningen som ger vinsten, inte debatten (Choi m.fl., NeurIPS 2025). Samma roll i flera kopior gav inget mer än en ensam agent, medan olika roller hjälpte (ChatEval, ICLR 2024).
  - **Simulerade användare är för positiva.** De fångar trender men inte deras storlek (NN/g 2024 och 2025). I riktiga shoppingsessioner förutsåg agenterna nästa handling i 12 % av fallen (Lu m.fl. 2025).
- **Granskningspaneler:**
  - **Flera oberoende bedömare krävs.** En bedömare hittar cirka 35 % av problemen, och Nielsen rekommenderar 3–5 bedömare som först granskar var för sig (Nielsen 1994; NN/g 2023). Två bedömare hittar i median samma problem till 27 % (Sauro 2018).
  - **Expertgranskning och användartest hittar olika saker.** Användartestet hittar de återkommande problemen och färre småsaker (Jeffries m.fl., CHI 1991).
  - **GOV.UK:s service assessment är förebilden för ett råd:**
    - Panelen har en ledande bedömare, en användarforskare, en designer och en teknisk ledare.
    - Specialisterna leder var sina punkter. Domen är grön, gul eller röd, och rött på en punkt gör hela utfallet rött.
    - Den ledande bedömaren skriver den samlade domen. Gul betyder att tjänsten går vidare med en åtgärdslista.
  - **Design Councils tio principer för granskningspaneler** (2013, rev. 2019):
    - Panelen är oberoende av dem som byggt.
    - Den är tvärfacklig.
    - Den ger råd och fattar inga beslut.
    - Den dömer mot kriterier, inte efter enskildas smak.
    - Ordföranden ser till att ingen röst dominerar.
- **Riktiga människor:**
  - **Fem användare för att hitta problem.** Fem hittar cirka 85 % av problemen i ett kvalitativt test, och tre rundor med fem personer slår en stor runda (Nielsen 2000).
  - **20–30 personer för att visa en preferens.** Med fem personer kan en preferens aldrig bli signifikant. Med 10 krävs 9 som väljer samma, och med 20 krävs 15 (binomialtest, tvåsidigt p < 0,05; MeasuringU om preferensdata).

## 3. Vårt flöde mot ramverken och byråerna

Ramverken ger en följd med en grind efter varje steg:
- GOV.UK Service Manual: discovery, alpha, beta, live och retirement
- Design Councils Double Diamond
- ISO 9241-210, som bara är läst i andrahandskällor ⚠️
- NN/g:s metoder per fas
- W3C WAI med WCAG-EM 2.0 (juli 2026)
- innehållsstrategi: Halvorson och GOV.UK
- Googles regler för flytt av sajt

Byråerna tillför kundens roll: Kirografiks, Orbit Media, Wholegrain, Mightybytes, Clearleft, Awave och Precio Fishbone.

| Steg | Vi har | Det som saknas, och vem som bär det |
|---|---|---|
| 1 Intervju och upptäckt | Kärnfrågorna, research och nordstjärnan (2-1) | Ett uttryckligt **gå eller stoppa** efter intervjun: *"It's not a failure to stop"* (GOV.UK discovery) |
| 2 Brief | Sex rubriker, faktabas och WCAG-mål | 3–4 mått med baslinje enligt HEART och GOV.UK; i dag bara nordstjärnan |
| 3 Inventering av den gamla sajten | Sida för sida med behåll, uppdatera eller ta bort, och omdirigeringskarta (`omfattning/inventering.md`) | **Originalets styrkor:** koncept, bilder och ord som är kundens egna, och vad besökarna gillar. Orbit och Precio inventerar med data i stället för *"känslor och rykten"* |
| 4 Struktur | Sidkarta och trädtest (N2) | Kundens underskrift på sidkartan före formgivningen (Wholegrain), plus ett angivet antal rundor per fas (Kiwi) |
| 5 Formgivning | Tre riktningar, blickprov och måttstocken | En **jämförelse mot originalet och referenser** innan riktningen väljs |
| 6 Bygge och test | Kontrollskriptet, kvalitetsgranskningen i sex perspektiv och granskaren | **Människor** som testar toppuppgifterna (Clearleft: sex personer). **Kunden godkänner texterna** sida för sida (Orbit). Granskarna är en och samma modell, och de får se byggarens resultat |
| 7 Lansering | Steg 5 i byggplanen och Googles flyttregler | Den gamla sajten hålls igång tills den nya är live (GOV.UK beta) |
| 8 Förvaltning | Rapporten, månads- och årsrytmen (2-9) | **Eftervård:** dag 1–7 dagligen, dag 30 med första fältdata, dag 90 jämfört med baslinjen (Google: CrUX 28 dagar; flytt *"a few weeks or more"*). En postmortem vid varje fel som kunden ser (Google SRE) |
| 9 Avveckling | Saknas | Omdirigeringar i minst ett år och data som skyddas (GOV.UK retirement; Google) |

**Kirografiks**, byrån som byggde Peters nuvarande sajt, har en enkel mallprocess:
1. Ett frågeformulär.
2. Logga, färger och text ur deras eget textbibliotek.
3. Kunden kommenterar direkt på sajten.
4. Abonnemang med månadsrapport.

De har ingen strategifas och inga användartester. Ändå valde en lekman deras sajt. Det säger något om hur mycket bekanthet och ett eget koncept väger.

## 4. Förslag till Johnny

Varje punkt är ett förslag. Nivån följer guidens N1–N4, och platsen säger var texten hamnar vid ja.

**F1. Jämförelse före och efter, blind** (N2; `guide/3-2`, *Eval*; `5-byggplan.md`, nytt steg 3c)
- **Vad:** vår sajt jämförs med kundens gamla sajt och med 2–3 referenser i par.
  - Referenserna är 1–2 lokala konkurrenter, alltså de som ligger överst på kartan för *[tjänst] [ort]*, och en förebild ur måttstocken.
  - Paren visas i samma storlek, med namn och logga synliga, i slumpad ordning och utan att det står vilken sajt som är vår.
  - Frågan är fast och skrivs i förväg: *"Hos vilket företag skulle du hellre boka?"* med en motivering.
- **Varför:** fallet med originalet, NN/g om konkurrentjämförelser och positionsbias.

**F2. Granskningsrådet** (N2; `guide/3-2`, *När en granskare inte räcker*)
- **Rollerna:**
  - besökare (för kliniken patient)
  - företagsägare
  - designer
  - innehåll
  - tillgänglighet
  - teknik och sök
  - konvertering

  Varje roll dömer **var för sig och blint**, innan den ser kontrollskriptets eller de andras fynd. Domen är grön, gul eller röd per punkt.
- **Ordföranden** slår ihop domarna, tar bort dubbletter och skriver vilka roller som inte kördes. Rådet ger råd, och Johnny beslutar.
- **Parvisa domar** (F1) körs i båda ordningarna, och oenighet räknas som oavgjort.
- **Konceptfrågan** ingår: *Byt kundens namn – håller designen fortfarande?*
- **Byggaren dömer aldrig ensam.**
- **Varför:** GOV.UK, Design Council, ChatEval, Nielsen, Zheng och Panickssery.
- ⚠️ Vi har bara Claude. Juryer med flera modellfamiljer (Verga) kräver till exempel Gemini med egen nyckel. Det är en fråga till Johnny (beslut 3 nedan).

**F3. Lekmannapanelen, riktiga människor** (N2; `guide/3-2` och `4-foretaget.md`)
- **Varje sajt:**
  - 5 personer gör ett **femsekunderstest** och en **toppuppgift**, som att hitta numret eller boka, och säger varför. Det är kvalitativt och ger skälen.
  - Jämförelsen med originalet (F1) görs med **20–30 personer**, redovisat som *X av N* med konfidensintervall.
- **Rekryteringen:** Johnnys nätverk är gratis men skevt, eftersom det är bekantas bekanta. En betald panel kostar per svar (Lyssna, UXtweak; `kunskap/kallkort/tradtest-uxtweak-lyssna.md`).
- **Samma person** ska inte döma samma jämförelse två gånger.
- **Varför:** Nielsen, MeasuringU, NN/g om syntetiska användare, och fallet med originalet.

**F4. Originalets styrkor inventeras före riktningarna** (N1 när det finns en gammal sajt; `guide/2-2` och `omfattning/inventering.md`)
- **Vad:** en kort lista över det som är kundens eget och ska prövas att behållas: koncept, ordlek, landmärke, bilder, ord, färger och sådant kunderna nämner i omdömena.
- **Hur:** listan läggs fram för Johnny och kunden, och en anti-referens kräver kundens egna ord, aldrig `claude-som-kund` ensam.
- **Varför:** Orbit, Precio, huashu-design och Turning Torso.

**F5. Branschjämförelse per kategori** (N2; `guide/3-2`, *Eval*)
- **Kategorierna** är tio: design, innehåll, konvertering, prestanda, tillgänglighet, SEO, lokal närvaro, förtroende, mobil och rörelse.
- **Varje rad** har mätvärden, rådets förslag och Johnnys dom: *under*, *i nivå med* eller *över* den bästa referensen, eller *ej tillämplig*.
- **Mätvärdena:**
  - CrUX eller median av fem Lighthouse-körningar
  - axe-fel
  - SEO-grunden
  - LIX
  - antal klick till bokning
  - första vyn
- **Domarna** läggs in i måttstocken per bransch, så att ribban stiger över tid som hos Baymard.
- **Varför:** NN/g om benchmarking och konkurrentjämförelser, Baymard, MeasuringU och CrUX.

**F6. Processluckorna**
- **Stopp efter intervjun** (N2; `2-1`, `5-byggplan.md`, steg 1): gå eller stoppa, med skäl.
- **3–4 mått med baslinje i briefen enligt HEART** (N2; `2-1`). Nordstjärnan är ett av dem.
- **Kunden godkänner texterna sida för sida**, med högst två rundor per fas (N1; `2-7`, `1-kundens-vag.md`). I övningssajterna gör Johnny det som kund.
- **Eftervård och postmortem** (N3; `2-9`): dag 1–7, 30 och 90, och en postmortem vid fel som kunden ser.
- **Avveckling** (N3; `2-9`): omdirigeringar i minst ett år, och data som skyddas eller lämnas till kunden.

**F7. Kalibreringen**
- **Vad:** varje människodom (F1, F3) och varje Johnny-dom (F5) sparas som facit. Rådets roller mäts mot facit med **Cohens kappa**, inte andel lika domar. En roll som inte förutsäger människornas val tas bort eller får mindre vikt. Mätningen görs om för varje sajt.
- **Varför:** Thakur m.fl. om kappa, Shankar m.fl. 2024 om att kriterier glider, och TinyTroupes validering mot verkliga data.

**F8. Omvärldsbevakningen**
- **Vad:** de här primärkällorna förs in i bevakningen, så att startsäkringen ser när de ändras:
  - GOV.UK Service Manual och Service Standard
  - NN/g:s artiklar om heuristisk utvärdering och syntetiska användare
  - W3C WAI och WCAG-EM 2.0
  - Googles flyttregler

  Google-sidorna ligger redan i `skript/google-sidor.py`. De andra går in i `inventering/kallor-bevakning.json`.

## 5. Vad det betyder för Torsokliniken nu (förslag)

1. **AI-rådet:** jämförelsen körs på vår sajt mot originalet, Citykiropraktikern (Johnnys goda exempel i intervjun) och en lokal konkurrent. Paren körs i båda ordningarna, med roller som dömer var för sig. Det kostar några delagenter och kan göras när Fable är klar och sajten står still.
2. **Lekmannapanelen:** med 5 personer i femsekunderstest och toppuppgift, och 20 personer i jämförelsen mot originalet, när Johnny har valt hur deltagarna rekryteras.
3. **Turning Torso prövas, inte antas.**
   - En variant av förstavyn har ett riktigt lokalt motiv med licens och kreditering, enligt frågelistans punkt 24 om lokala belägg som bild. Den variant av förstavyn som Johnny godkände behålls bredvid.
   - Varianterna jämförs i panelen.
   - Fotot med Peter står kvar i båda, eftersom han är det förtroendet bygger på.

## Källor (urval; alla lästa 2026-10-17)

**Granskningsråd:**
- GOV.UK, *How service assessments work*: https://www.gov.uk/service-manual/service-assessments/how-service-assessments-work
- Design Council, *Design Review: Principles and Practice*, 2013, reviderad 2019: https://www.winchester.gov.uk/assets/attach/22943/Design-Review-Principles-and-Practice.pdf
- Figma, *Design critiques at Figma*, 2019: https://www.figma.com/blog/design-critiques-at-figma/

**Heuristisk utvärdering, användartest och preferenser:**
- Nielsen, *Theory of heuristic evaluations*, 1994: https://www.nngroup.com/articles/how-to-conduct-a-heuristic-evaluation/theory-heuristic-evaluations/
- NN/g, *How to conduct a heuristic evaluation*, 2023: https://www.nngroup.com/articles/how-to-conduct-a-heuristic-evaluation/
- Sauro, *The evaluator effect*, 2018: https://measuringu.com/evaluator-effect/
- Jeffries m.fl., CHI 1991: https://www.miramontes.com/writing/uievaluation/
- Nielsen, *Why you only need to test with 5 users*: https://www.nngroup.com/articles/why-you-only-need-to-test-with-5-users/
- MeasuringU, *Preference data*: https://measuringu.com/preference-data/

**Lekmäns omdöme:**
- Lindgaard m.fl. 2006, doi 10.1080/01449290500330448
- Tuch m.fl. 2012: https://research.google/pubs/pub38315/
- Reinecke och Gajos 2014: https://eecs.harvard.edu/~kgajos/papers/2014/reinecke14visual.shtml
- Fogg m.fl. 2002: https://advocacy.consumerreports.org/research/how-do-people-evaluate-a-web-sites-credibility
- Sedley och Müller, CHI 2013: https://research.google/pubs/minimizing-change-aversion-for-the-google-drive-launch/

**AI-domare och simulerade användare:**
- NN/g, *Synthetic users*, 2024: https://www.nngroup.com/articles/synthetic-users/
- NN/g, *AI simulations in studies*, 2025: https://www.nngroup.com/articles/ai-simulations-studies/
- Zheng m.fl. 2023: https://arxiv.org/abs/2306.05685
- Panickssery m.fl. 2024: https://arxiv.org/abs/2404.13076
- Verga m.fl. 2024: https://arxiv.org/abs/2404.18796
- Luera m.fl. 2025: https://arxiv.org/abs/2510.08783
- UIClip: https://arxiv.org/abs/2404.12500
- ChatEval: https://arxiv.org/abs/2308.07201
- Choi m.fl. 2025: https://arxiv.org/abs/2508.17536
- Lu m.fl. 2025: https://arxiv.org/abs/2503.20749
- Thakur m.fl.: https://arxiv.org/abs/2406.12624
- Shankar m.fl. 2024: https://arxiv.org/abs/2404.12272

**Benchmarking:**
- NN/g, *Competitive usability evaluations*, 2024: https://www.nngroup.com/articles/competitive-usability-evaluations/
- NN/g, *UX benchmarks*, 2020: https://www.nngroup.com/articles/product-ux-benchmarks/
- Baymard, metod: https://baymard.com/research/methodology
- CrUX, metod: https://developer.chrome.com/docs/crux/methodology

**Ramverk:**
- GOV.UK Service Manual, faserna: https://www.gov.uk/service-manual/agile-delivery
- Design Council, Double Diamond: https://www.designcouncil.org.uk/our-resources/the-double-diamond/
- W3C WAI, *Planning and managing*: https://www.w3.org/WAI/planning-and-managing/
- W3C, WCAG-EM 2.0: https://www.w3.org/TR/WCAG-EM/
- Google, flytt med nya adresser: https://developers.google.com/search/docs/crawling-indexing/site-move-with-url-changes
- HEART (Rodden m.fl., CHI 2010): https://research.google/pubs/measuring-the-user-experience-on-a-large-scale-user-centered-metrics-for-web-applications/
- Google SRE, postmortems: https://sre.google/sre-book/postmortem-culture/

**Öppen källkod:**
- pbakaus/impeccable (Apache-2.0)
- sjsyrek/design-council (MIT)
- karpathy/llm-council (ingen licens, bara idén)
- thunlp/ChatEval (Apache-2.0)
- microsoft/TinyTroupe (MIT)
- neuhai/UXAgent (licensen oklar ⚠️)
- browser-use, `judge.py` (MIT)

**Byråer:**
- Kirografiks: https://www.kirografiks.com/the-process/
- Orbit Media: https://www.orbitmedia.com/process/
- Wholegrain Digital: https://www.wholegraindigital.com/blog/our-design-process/
- Clearleft: https://clearleft.com/services/rapid-usability-testing
- Precio Fishbone: https://www.preciofishbone.se/kunskapsbanken/detta-bor-du-gora-innan-du-bygger-ny-webb
