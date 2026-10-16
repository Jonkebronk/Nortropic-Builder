# humanizer

**Källa:** https://github.com/blader/humanizer. Läst 2026-10-16 vid commit `225a6f39ac85` (main, 2026-09-28), version 3.1.0. Jag läste `SKILL.md` (397 rader), `README.md`, `CHANGELOG.md` (1.0.0–3.1.0), `AGENTS.md`, `agents/openai.yaml`, `.claude-plugin/plugin.json` och `marketplace.json`, början av `scripts/validate-package.py` (ett underhållsskript som kontrollerar paketet och inte kördes) och `LICENSE`.

Grundkällan läste jag också: Wikipedias "Signs of AI writing", revision 1380310647 (2026-10-15), som wikitext. Den sparade kopian finns i `kallor/wikipedia-signs-of-ai-writing/raw.wikitext`.

**Licens:**
- Repot är MIT, © 2025 Siqi Chen. Licensen kräver att upphovsrätts- och licenstexten följer med vid kopiering.
- **Men** mönsterkatalogen bygger på Wikipedias sida, som är CC BY-SA 4.0 enligt sidfoten. Minst åtta av humanizers före-exempel är text citerad från den sidan; jag kontrollerade dem mot wikitexten (Katalonien-institutet, Somalias mat, Korattur, Haolai, Gallery 825 m.fl.). De passagerna förblir CC BY-SA 4.0 trots MIT-märkningen.
- Tolkning, inte juridisk rådgivning: idéer och kategorier är fria. Vi beskriver mönstren med egna ord och skriver **egna svenska exempel**. Då gäller inget krav på att dela lika. Översätter vi Wikipedias exempel eller formuleringar blir texten en bearbetning som måste licensieras CC BY-SA 4.0 med erkännande. **Vi översätter alltså inga exempel.**

**Vad det är:** En skill som skriver om AI-låtande prosa så att den låter som skribenten, utan att ändra vad texten säger. Den bygger på 26 numrerade mönster i sex grupper, med det starkaste först. Mönster 1–5 räcker för en ändring vid första träffen. Mönster märkta "weak alone" kräver sällskap av andra mönster.

**Hur det fungerar:**
- **Förklaringsmodell.** En språkmodell väljer det som passar flest läsare. En människa väljer för en läsare. Varje mönster är en form av standardvalet. Ordvanor skiftar med varje modell, men strukturvanorna består, och därför står de först.
- **Arbetsgång** i fyra steg:
  1. markera mönstren
  2. skriv ett utkast
  3. kontrollera att inget faktum lagts till eller tappats (rangordningar och samtidighet tappas lättast)
  4. skriv slutversionen
- **Inga påhittade fakta, namn, siffror, datum eller citat.** Saknas en detalj frågar man eller skriver en enklare mening.
- **Röst.** Ett skrivprov styr meningslängd, ordval och interpunktion och går före alla mönster, även regeln om tankstreck. Utan prov tas rösten från texttypen: personlig text får åsikter, saklig text hålls neutral.
- **Tre lägen:** inklistrad text (utkast, kvarvarande mönster, slutversion), fil (bara prosan ändras; kod, länkmål och metadata lämnas orörda) och inbäddat (bara slutversionen).
- **Mönstren:**
  - **A, iscensättning:** "inte X utan Y", slutkläm på en rad, visdomsord, iscensatt upptakt, att gräla med ingen.
  - **B, rytm efter regel:** tretal, upprepade inledningar, tankstreck, staplade reservationer, bindestreck i ordpar, passiv.
  - **C, uppblåsning:** AI-ord, uppblåst betydelse, vaga samband, ytliga -ing-svansar, säljspråk, lånad auktoritet, undvikande av "är" och "har".
  - **D, formatering:** fetstil som dekor, dekorativa rubriker, typografiska citattecken.
  - **E, rester:** chattfraser, brasklappar om kunskapsgräns, rubrik som upprepas, text om texten.
  - **F, fel läsare:** förklarar det läsaren redan vet.
- **När man inte ska agera.** Inte i citat, titlar och namn. Text från före 2022-11-30 är inte AI. Människor gissar inte bättre än slumpen, så det krävs flera mönster tillsammans. Udda detaljer och blandade känslor behålls.
- **Ursprung per mönster.** Mönster 1, 6, 8 och 12–23 har egna rubriker i Wikipedia (mönster 25 delvis). Mönster 2–5, 7, 9–11, 24 och 26 är humanizers egna tillägg, enligt CHANGELOG och ärenden.

**Kvalitet och underhåll:**
- 57 434 stjärnor och 4 546 forkar. Repot skapades 2026-01-18 och senaste push var 2026-09-28. 22 bidragsgivare, men blader står för 66 av 97 bidrag enligt GitHubs lista. Inga öppna ärenden och fem öppna PR, varav en med rysk språkversion och en som lägger fyra mönster i befintliga.
- Ändringsloggen är noggrann och förklarar varje omnumrering. Underhållet följer en tydlig princip: "keep §12 short", och nya språk hänvisas till egna repon.
- Kända problem:
  - [#306](https://github.com/blader/humanizer/issues/306): tre exempel i `SKILL.md` lägger fortfarande till fakta, till exempel "considered a delicacy" i §12. Ärendet stängdes 2026-09-29 utan synlig rättning; main är från 2026-09-28 och texten finns kvar. Lärdom: exempel kopieras närmare än regler.
  - [#212](https://github.com/blader/humanizer/issues/212): reglerna om tretal och reservationer kunde radera rangordningar. Rättat i 3.0.0.
  - [#238](https://github.com/blader/humanizer/issues/238): inmatad text behandlades inte uttryckligen som innehåll. Rättat i 3.0.0, men filläget saknar fortfarande skydd före skrivning.
  - [#257](https://github.com/blader/humanizer/issues/257): en nederländsk sektion avböjdes. Underhållaren svarar att mönstren är former som gäller alla språk och att språkversioner hör hemma i egna repon.
  - [#263](https://github.com/blader/humanizer/issues/263) och [#229](https://github.com/blader/humanizer/issues/229): texten passerar inte AI-detektorer. Det är inte heller målet enligt README.
- **Grundkällans läge 2026-10-15.** Wikipedia har flyttat tankstrecket (em dash) till "Historical indicators (2022–September 2026)", eftersom nyare modeller undviker det. Sidan påstår att fattig interpunktion blivit ett nytt tecken, men det påståendet saknar källa (`{{cn}}`). Sidan är en rådgivningssida som inte granskats av gemenskapen och har ingen svensk version.

**Det bästa vi kan ta:**
- Förklaringsmodellen ("standardvalet") och regeln att varje mening ska tillföra något nytt (`SKILL.md`, "Why AI text sounds the way it does").
- Styrkeordningen och "weak alone"-principen, som bygger på att flera mönster måste förekomma tillsammans.
- Regeln att aldrig hitta på, plus kontrollen att rangordningar och samtidighet överlevt omskrivningen ("How to work", steg 2–3).
- Mönster 1–7, 9, 11, 13–20 och 22–25 som svenska mönster med egna svenska exempel.
- "When not to act" som spärr mot överredigering.

**Var det hamnar hos oss:** Skillen `innehall`, delfilen `ai-monster.md`, översatt till svenska mönster. Installeras inte.

**Passar vår stack?**
- Ja, som granskningslista för text innan den läggs i Astro-sidorna. Inga skript och ingen körning behövs.
- Måste ändras för svenska:
  - **§8, tankstreck:** på svenska *är* "–" tankstrecket. Det används utan mellanslag i intervall och med mellanslag vid paus och i rubriker (Språkrådets Snabba skrivregler 1.10). Regeln blir: flagga "—" (em dash, engelsk förlaga) och kontrollera att "–" används rätt.
  - **§21, citattecken:** svensk norm är ”…” (1.13). Det är engelska “…” som ska flaggas, inte de typografiska.
  - **§20, rubriker:** Title Case är fel på svenska, inte bara ett AI-tecken.
  - **§10, bindestreck i ordpar:** gäller engelska. Den svenska motsvarigheten är särskrivning, som är ett språkfel och inte ett belagt AI-tecken ⚠️.
  - **§12, AI-ord:** ordlistan är engelsk. En svensk lista finns bara i en olicensierad källa (claude-humanizer-svenska) och måste byggas och beläggas av oss.
  - **§15, -ing-svansar:** grammatiken är engelsk. Den svenska formen är ", vilket understryker/belyser …".
  - **§16, säljspråk:** mest relevant för oss, eftersom småföretagstext ofta glider mot "belägen i hjärtat av", "unik" och "rik historia".
  - **§26:** gäller svar i en tråd och är oviktig för webbtext.
- Svenska mönster som saknas i humanizer: nominaliseringar, kalkerade anglicismer och utfyllnadsfraser. De finns i claude-humanizer-svenska, som saknar licens; vi skriver dem med egna ord och belägger dem.

**Risker och flaggor:**
- **Licens:** blandningen av MIT och CC BY-SA (se ovan). Kopiera eller översätt inga exempel.
- Ingen telemetri, betalvägg eller inloggning. Pluginmanifestet pekar bara på `SKILL.md`.
- **Bred trigger:** beskrivningen fångar "editing or reviewing prose for AI tells". Om den installerades skulle den konkurrera med `innehall` och skriva om även kundens egna texter. Installeras inte.
- **Tankstrecksregeln** är strängare än svensk norm och grundkällan har redan gjort den historisk. Följer vi den bokstavligt förstörs korrekt svensk typografi.
- **Exempel som lägger till fakta (#306)** visar hur lätt exempel lär ut det som reglerna förbjuder. Våra egna exempel ska kontrolleras mot regeln om påhitt.
