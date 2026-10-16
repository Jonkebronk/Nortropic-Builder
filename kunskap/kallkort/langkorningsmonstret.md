# Långkörningsmönstret

**Källa:**
- Anthropic Engineering: Justin Young, [Effective harnesses for long-running agents](https://www.anthropic.com/engineering/effective-harnesses-for-long-running-agents) (2025-11-26), och Prithvi Rajasekaran, [Harness design for long-running application development](https://www.anthropic.com/engineering/harness-design-long-running-apps) (2026-03-24). Båda lästa 2026-10-16.
- [anthropics/claude-quickstarts/autonomous-coding](https://github.com/anthropics/claude-quickstarts/tree/main/autonomous-coding): `README.md`, `prompts/coding_prompt.md` och `prompts/initializer_prompt.md`, hämtade med `gh api` till `kallor/fg-quickstarts-autonomous/` 2026-10-16. Mappens enda commit är `25023412396a` (2025-11-26). Python-koden lästes inte och kördes inte.

**Licens:** Artiklarna är Anthropics text. Vi destillerar med egna ord. För quickstarten är repots LICENSE MIT ("Copyright (c) 2023 Anthropic"), men README:n för `autonomous-coding` slutar med "License: Internal Anthropic use." Uppgifterna motsäger varandra ⚠️. Vi tar mönstret i egna ord och installerar, kör och kopierar ingenting.

## Vad det är
Ett sätt att hålla ett agentarbete sammanhängande över många kontextfönster, som skift med en överlämning. En initierande agent skriver en funktionslista i JSON där allt är `passes: false`, ett startskript, en progressfil och en första commit. Varje senare session orienterar sig, kontrollerar det som redan fungerar, gör en enda funktion, prövar den som en användare, ändrar bara `passes`, committar och skriver progress. Den andra artikeln lägger till en separat bedömare med kriterier, kalibrering och kontrakt före varje del.

## Hur det fungerar
- **Två felmoder** som mönstret motverkar: agenten försöker göra allt på en gång och lämnar en halvbyggd funktion, eller ser framsteg och säger klart för tidigt (Young).
- **Orientering först** (`coding_prompt.md`, steg 1–3): `pwd`, specen, funktionslistan, `claude-progress.txt`, `git log --oneline -20` och antalet `"passes": false`. Därefter startas servern med `init.sh`, och 1–2 av de viktigaste redan godkända funktionerna körs innan något nytt påbörjas. Är något trasigt sätts den till `false` och lagas först. Prompten nämner vit text på vitt, slumptecken, fel tidsstämplar, överflöd, knappar för tätt, saknade hover-lägen och konsolfel.
- **En funktion per session.** "It's ok if you only complete one feature in this session". Young kallar begränsningen "critical".
- **Bara `passes` får ändras.** "IT IS CATASTROPHIC TO REMOVE OR EDIT FEATURES IN FUTURE SESSIONS" (`initializer_prompt.md`). Agenten får inte ta bort, skriva om, slå ihop eller ordna om. JSON valdes eftersom modellen ändrar JSON mer sällan än markdown (Young).
- **Prövning som användare** med webbläsarautomation (Puppeteer MCP), skärmdumpar och utan genvägar via JavaScript. Enhetstester och `curl` räckte inte. `passes` sätts bara "AFTER VERIFICATION WITH SCREENSHOTS". Begränsning: agenten ser inte webbläsarens egna `alert`-dialoger, och synen är ofullständig.
- **Commit och progress** efter varje funktion, och "clean state" när sessionen slutar.
- **Bedömaren** (Rajasekaran): en generator och en bedömare för frontenddesign. Bedömaren använder Playwright, skärmdumpar och klick. Fyra kriterier: designkvalitet, originalitet, hantverk och funktion. De två första väger tyngre, eftersom modellen redan klarar hantverk och funktion. Bedömaren kalibreras med "few-shot examples accompanied by detailed score breakdowns". Varje körning tog 5–15 varv och upp till 4 timmar.
- **Sprintkontrakt:** före varje del föreslår generatorn vad *klart* betyder och hur det prövas. Bedömaren granskar förslaget tills de är överens; i ett fall blev det 27 kriterier. Varje kriterium har ett hårt golv.
- **Iakttagelser:** agenter "reliably skew positive when grading their own work". Utan anpassning är Claude "a poor QA agent" som hittar fel och sedan övertalar sig själv att godkänna. Formuleringen "museum quality" i kriterierna drog utseendet åt ett visst håll.
- **Kostnad i Anthropics prov:** en ensam agent tog 20 min och 9 USD, hela harnessen 6 h och 200 USD (Opus 4.5). Version 2 tog 3 h 50 min och 124,70 USD (Opus 4.6), och QA-varven kostade 3,09–4,06 USD var.
- **Ny modell:** med Opus 4.6 togs sprintarna bort och bedömaren gick till ett enda pass i slutet. En radikal förenkling misslyckades, så delarna togs bort en i taget. Harnessen ska prövas om vid varje ny modell.

## Kvalitet och underhåll
anthropics/claude-quickstarts: 18 013 ★, 34 bidragsgivare, 228 öppna ärenden och PR, senaste push 2026-10-08. `autonomous-coding` har inte ändrats sedan 2025-11-26. Standardmodellen är `claude-sonnet-4-5-20250929`, och README:n kräver `ANTHROPIC_API_KEY` och Agent SDK. Ärenden: [#332](https://github.com/anthropics/claude-quickstarts/issues/332) (stängt): skärmdumparna togs i Puppeteers standardfönster 800×600 eftersom ingen viewport sattes. [#320](https://github.com/anthropics/claude-quickstarts/issues/320) (öppet) frågar om parallella agenter, och [#327](https://github.com/anthropics/claude-quickstarts/issues/327) (öppet) om en kanal där människan kan svara under körningen.

## Det bästa vi kan ta
- **Orienteringen som rutin** i början av varje varv: `progress.md`, `git log` och kontrollskriptet körs *innan* nytt arbete, så att ett fel från förra varvet syns först (`coding_prompt.md`, steg 1–3).
- **Regressionen först:** kör den kontroll som går hela vägen till den primära handlingen innan nästa del byggs. Ett rött resultat lagas före något nytt.
- **Funktionslistan i JSON där bara `passes` och `bevis` ändras.** Det står redan i `guide/3-1` (N2, `checkpoints.json`), och artikeln är dess källa.
- **Skärmdumpen som belägg med uttrycklig viewport** (375, 768 och 1280 px). #332 visar vad som händer annars.
- **Ur bedömaren:** vikta det modellen inte gör av sig själv, hos oss *äkthet* och *förstår och når* ur måttstocken. Välj kriteriernas ord med omsorg, eftersom de styr resultatet. Kalibrera med exempel som har utförlig motivering, hos oss Johnnys domar med `varfor`. Räkna med att en bedömare är för snäll tills den mätts.
- **Sprintkontraktet** är vår regel att kontrollerna skrivs före bygget och godkänns av Johnny (`guide/3-2`). Artikeln är en andra källa till det.
- **Rensa harnessen del för del vid ny modell** (`guide/3-4`, *Rensning vid ny modell*). Detta är källan.

## Var det hamnar hos oss
**Skill: `larande`, delfil `loopen.md`** (håller med förslaget): orienteringen, en funktion per varv, bara `passes`, regressionen först och belägget med viewport. Bedömarens lärdomar (vikter, ordval, few-shot med motivering, snäll bedömare) hör till `larande/matning.md` och granskarens checklista. De överlappar kortet *Den kalibrerade bedömaren*, som äger dem. Inget installeras.

## Passar vår stack?
Mönstret är oberoende av stacken. Översättningen:
- `feature_list.json` blir `sites/<namn>/checkpoints.json` med en rad per byggsteg och inte 200 funktioner. En liten sajt har en handfull steg.
- `claude-progress.txt` blir `progress.md`, `init.sh` blir sajtens dev- eller preview-kommando, och Puppeteer MCP blir Playwright.
- "You have unlimited time" krockar med vår tidsbudget per steg (`1-kundens-vag.md`).
- `git add .` i prompten krockar med regeln att bara stegets filer committas och att inga hemligheter når repot.

## Risker och flaggor
- **Licensen för quickstarten är otydlig** ("Internal Anthropic use" mot MIT). Installera eller kör den inte. Den kräver dessutom en API-nyckel och fakturering via API, och Johnny kör på abonnemang.
- Kostnadssiffrorna gäller fullstack-appar på flera timmar, inte våra sajter. Mät i eval och lita inte på dem.
- Långa obevakade körningar krockar med N1, där Johnny tittar. Mönstret är N2 i guiden.
- Ingen telemetri, betalvägg eller inloggning för att läsa.

## Inloggning
Inget. Artiklarna och repot är öppna. Quickstarten skulle kräva en API-nyckel, men den körs inte.
