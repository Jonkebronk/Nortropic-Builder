# Språkgrinden: Vale, Hunspell sv_SE, LIX och mätningen

Delfil till `innehall`. Grinden och dess nivå står i `guide/2-7-innehall.md`, *Kompetens och källor* och *Kontroll* (N2). Grinden är en **rapport**. En regel får stoppa först när den har en norm eller två oberoende primärkällor **och** en mätning mot en svensk korpus visar få falsklarm (→ 2-7; `guide/README.md`, *Grind eller instruktion*).

## Delarna

- **Vale** (MIT) med en egen stil `Nortropic-sv`. Vale är en enda binär som lintar markdown, HTML och, med en *View*, strängar i TypeScript. Versionen låses och laddas ner som officiell release med kontrollerad checksumma. Prövad version: 3.24.0. 📄 [vale-cli/vale](https://github.com/vale-cli/vale); [docs.vale.sh](https://docs.vale.sh)
- **Hunspell sv_SE** 2.42 ur LibreOffice (LGPL-3, Göran Andersson). Filerna används oförändrade i bygget och följer aldrig med sajterna. Checkas de in i ett delat repo ligger licenstexten bredvid. 📄 [LibreOffice/dictionaries, sv_SE](https://github.com/LibreOffice/dictionaries/tree/master/sv_SE); ⚖️ tolkning
- **En vokabulär per sajt**, byggd ur `fakta.md`: namn, gator, ortnamn och firmanamn. I provet på en övningssajt var 190 av 193 stavningslarm namn och förkortningar.
- **LIX** som varning, aldrig som grind. Ingen källa ger en tröskel för webbtext; tröskeln sätts efter mätning på välskrivna svenska småföretagssajter. Övningssajtens sidor låg på 29–34. 📄 LIX (Björnsson); `kunskap/research/2026-10-15_kompetensluckor-anteckningar/lager-6-7-rorelse-innehall.md`, avsnitt 1

## Det som måste sitta i konfigurationen

Allt nedan är prövat på svensk text och på en byggd övningssajt 2026-10-16, med Vale 3.24.0 och sv_SE 2.42.

- **Stavningen kräver egna filter.** Vales standardfilter `[^a-zA-Z_']` hoppar över varje ord med å, ä eller ö. Regeln får `custom: true` och filter som tillåter Unicode-bokstäver.
- **Stilen `Vale` får inte vara med** i `BasedOnStyles`: `Vale.Spelling` är engelsk och larmar på all svenska. Inte heller `sequence` eller `capitalization` med `$title`, som är byggda för engelska.
- **Vales inbyggda `lix` räknar fel på svenska:** långa ord räknas i byte, så ett ord med å, ä eller ö blir för långt, och *t.ex.* blir två ord. LIX räknas med ett eget skript i bokstäver och med en svensk förkortningslista.
- **Meningsdelningen:** *t.ex.*, *bl.a.* och *m.fl.* delar inte meningar, men *kl.*, *inkl.*, *osv.* och *dvs.* gör det. Regler om meningslängd tar hänsyn till det.
- **Ordgränser:** `\b` fungerade med å, ä och ö i provet, fast dokumentationen säger annat. Skriv ändå `(?<![\p{L}])` och `(?![\p{L}])`, som håller i alla motorer.
- **Böjningsformer** måste stå var för sig i en regel; Vale böjer inte ([#1091](https://github.com/vale-cli/vale/issues/1091)).
- **Byggd HTML:** `SkippedScopes` tar med `nav` och `footer`, så att meny och sidfot lintas en gång och inte på varje sida. Alt-texter och metabeskrivningar lintas.
- **Texterna i `src/innehall/*.ts`** lintas med en View som plockar ut strängarna. Utan den lintas bara kommentarerna.
- **Förkortningar** som ordlistan har med punkt (*inkl.*) prövas av Vale utan punkt och behöver en ignorera-lista.

## Reglerna

Nivåerna gäller tills mätningen är gjord. *Kandidat* betyder att regeln har en norm eller två källor och kan bli `error` efter mätningen.

| Regel | Grund | Nivå nu |
|---|---|---|
| Långt tankstreck (—) | Norm: Myndigheternas skrivregler 13.8; Språkrådet, *Snabba skrivregler* 1.10 | `warning`, kandidat |
| Engelska citattecken (" " och “ ”) | Norm: Myndigheternas skrivregler 13.11 | `warning`, kandidat |
| Procent utan mellanslag (*30%*) | Norm: Myndigheternas skrivregler 13.15 | `warning`, kandidat |
| Rubrik som slutar med punkt eller kolon | Norm: Myndigheternas skrivregler 3.5.2 | `warning`, kandidat |
| Stavning mot sv_SE och sajtens vokabulär | Ordlistan | `warning` |
| *Välkommen till* i en rubrik | `guide/2-4-skelett.md` (N1) | `warning` |
| *Klicka här*, ensamt *Läs mer* som länktext | Norm: WCAG 2.2, 2.4.4; Myndigheternas skrivregler 2.1.6 | `warning` |
| Flera utropstecken, utropstecken i mikrotext | Myndigheternas skrivregler 13.3; 2-7, *Svenska copyfynd* | `suggestion` |
| *inte X utan Y* (smal variant) | Wikipedia, *Signs of AI writing*; marketingskills `copywriting` | `suggestion` |
| Byråfraser (*skräddarsy*, *helhetslösning*, *i fokus*, *passion*) | 2-7, *Svenska copyfynd* (en källa) | `suggestion` |
| Förkortningar på webben (*ev.*, *leg.*, *fr.o.m.*) | Myndigheternas skrivregler 2.2.1 och 11; GOV.UK, *A to Z* | `suggestion` |
| Mening över 20 ord | NN/g (15–20 ord); Isof (15 ord är en längre mening); GOV.UK (dela över 25) | `suggestion` |
| *Vänligen*, *Oops*, *Hoppsan* i mikrotext | GOV.UK Design System, *Error message*; NN/g, *Error-Message Guidelines* | `suggestion` |

Mönstren i `ai-monster.md` som inte står i tabellen går inte att fånga med regler utan för många falsklarm. De bedöms av granskaren.

## Mätningen före en hård regel (llepafils-metoden)

- **Korpusen** är en JSON-lista med `id`, `text`, `fel` (felets exakta text, eller `null` för en ren mening) och `typ`. Varje fragment är en mening. 📄 [00spoiler00/llepafils](https://github.com/00spoiler00/llepafils) (MIT), `corpus/fragments.json` och `corpus/run-eval.mjs`
- **En träff** är ett larm som överlappar felets text. Ett larm på annat ställe räknas inte. **Varje larm** i en ren mening är ett falsklarm.
- **En regel skrivs bara för ett fel som korpusen visar att grinden missar,** och en tveksam regel tas inte med.
- **Två tillägg för oss:** korpusen har en del som inte används när reglerna skrivs, och varje regel körs också mot en riktig sajt som ingen regel skrivits mot. Rena meningar är medvetet svåra: namn, förkortningar, intervall och *utan* i betydelsen *without*.
- **Resultat från provet 2026-10-16** (51 fragment, 26 med fel): Vale med standardfilter 21 av 26 och 10 falsklarm; `Nortropic-sv` med vokabulär 24 av 26 och 0 falsklarm. En bred regel för *inte X utan Y* fångade alla tre men gav fyra falsklarm (*inte boka utan BankID*); den smala fångade två av tre utan falsklarm. Det som missades var särskrivning och en variant av *inte X utan Y*.
- llepafils egen siffra, som guiden återger, är 19 av 35 för LanguageTool ensam, **med fem falsklarm**, och 34 av 35 utan falsklarm för hela kedjan. Bara sex av fragmenten var rena, så *noll falsklarm* säger lite.

## Det som väntar

- **LanguageTool självhostad** (LGPL-2.1) prövas som andra pass först när korpusen visar att den fångar det Vale missar, till exempel särskrivning. Den svenska regelbasen är tunn. Det publika API:t används aldrig: villkoren förbjuder automatiska anrop, och kundens text skulle lämna huset. 📄 [dev.languagetool.org](https://dev.languagetool.org/languages)
- **vale-cli/agent-tools:** hooken lintar Claudes ändringar i samma tur men hoppar över `.ts` och `.html`, där texterna ligger, och behöver anpassas. MCP-delen kräver ett betalt Vale-konto och tas inte. 📄 [vale-cli/agent-tools](https://github.com/vale-cli/agent-tools) (MIT)

## Förbjudet

- Att skicka kundens text till ett publikt språk-API eller en extern granskningstjänst.
- Att låta en omätt regel stoppa ett bygge.
- Att ändra i Hunspell-filerna. Avvikelser läggs i sajtens vokabulär eller ignorera-listan.
