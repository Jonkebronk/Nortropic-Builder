# skill-creator

**Källa:**
- [anthropics/skills/skills/skill-creator](https://github.com/anthropics/skills/tree/main/skills/skill-creator), klonat i `kallor/yta-anthropic-skills` vid commit `dbd4588` (2026-10-09). Skillens senaste ändring är `b9e19e6` (2026-04-20).
- Lästa filer: `SKILL.md` (485 rader), `agents/grader.md`, `comparator.md`, `analyzer.md`, `references/schemas.md` och skripten `run_eval.py`, `run_loop.py`, `improve_description.py`, `aggregate_benchmark.py`, `quick_validate.py`, `package_skill.py` och `eval-viewer/generate_review.py`. Skripten lästes översiktligt och kördes inte.
- Pluginversionen i [claude-plugins-official/plugins/skill-creator](https://github.com/anthropics/claude-plugins-official/tree/main/plugins/skill-creator) vid `ea10b21` (2026-10-15) är identisk utom copyrightraden i LICENSE (`diff -rq`). Den synkades senast 2026-04-23.
- Bloggen [Improving skill-creator](https://claude.com/blog/improving-skill-creator-test-measure-and-refine-agent-skills) (Anthropic, 2026-03-03, utan namngiven författare) och [Claude Code: Skills](https://code.claude.com/docs/en/skills), *Evaluate and iterate on a skill*. Allt läst 2026-10-16.

**Licens:** Apache-2.0 (`LICENSE.txt` i skillen). Repots rot saknar licensfil enligt GitHub-API:t. Vid vidarespridning krävs licenstexten och märkning av ändringar. Vi destillerar metoden med egna ord.

## Vad det är
Anthropics skill för att skriva, pröva och förbättra skills. Varje testfråga körs av två delagenter samtidigt, en med skillen och en utan (eller med den gamla versionen). En bedömare prövar påståendena, ett skript räknar ut snitt, spridning och skillnad, och en visare låter ägaren skriva omdömen per utfall. Skillen kan också optimera beskrivningen med träffprov.

## Hur det fungerar
- **Loopen:** avsikt och intervju, utkast, 2–3 realistiska testfrågor i `evals/evals.json`, körningar med och utan i samma tur, påståenden som skrivs *medan* körningarna pågår, bedömning, sammanställning (`benchmark.json` med medel och standardavvikelse för andel godkända, tid och tokens samt deltat), ett analytikerpass och sedan visaren (`generate_review.py`) där ägaren skriver feedback som nästa varv läser.
- **Baslinjen:** för en ny skill är den ingen skill. För en ändrad skill är den en ögonblicksbild av den gamla versionen (`cp -r` före ändringen).
- **"Subjective skills (writing style, design quality) are better evaluated qualitatively — don't force assertions onto things that need human judgment."**
- **Bedömaren** (`grader.md`): PASS kräver tydligt belägg *och* verkligt innehåll, inte bara att formen är rätt, till exempel att filen finns men är tom. "The burden of proof to pass is on the expectation." Den drar ut och prövar outtalade påståenden (fakta, process, kvalitet) och kritiserar själva påståendena: ett svagt påstående som går igenom "is worse than useless". Ingen delpoäng.
- **Analytikern** (`analyzer.md`) letar efter påståenden som alltid går igenom i båda armarna (de skiljer inte), som alltid fallerar, som bara går igenom med skillen, och efter hög spridning. Den föreslår inga förbättringar i det steget.
- **Jämföraren** (`comparator.md`, valfri, "most users won't need it"): A och B utan etiketter, en rubrik som skrivs per uppgift med 1–5 för innehåll och struktur, och "be decisive – ties should be rare". Utfallen körs i **en** ordning.
- **Beskrivningen:** 20 frågor, 8–10 som ska utlösa skillen och 8–10 som inte ska. De värdefullaste är de nästan rätta. Ägaren granskar frågorna i en HTML-mall. `run_loop.py` delar 60/40 i träning och prov, kör varje fråga 3 gånger med tröskeln 0,5, gör upp till 5 varv och väljer bästa beskrivning på provdelen.
- **Skrivråd:** förklara *varför* i stället för versala MUST. Håll prompten smal. Läs transkripten. Skript som varje körning skriver om lyfts in i `scripts/`. Gör beskrivningen "a little bit 'pushy'", eftersom Claude ofta utlöser skills för sällan.
- **Bloggen:** skills med *capability uplift* kan bli onödiga när modellen blir bättre, och eval visar när. Skills med *encoded preference* håller längre men är bara värda sin trohet mot arbetsflödet. Optimering av beskrivningen förbättrade träffen för 5 av 6 dokumentskills, utan redovisad metod.

## Kvalitet och underhåll
anthropics/skills: 181 491 ★, 16 bidragsgivare, 1 423 öppna ärenden och PR, senaste push 2026-10-09. Kända fel:
- **Träffprovet mäter fel:**
  - [#1721](https://github.com/anthropics/skills/issues/1721): 0 % träff för varje skill, eftersom körningen avbryts så fort ett annat verktyg än Skill eller Read kommer först.
  - [#1419](https://github.com/anthropics/skills/issues/1419): 0 % träff när skillen redan är installerad.
  - [#1706](https://github.com/anthropics/skills/issues/1706) och [#1352](https://github.com/anthropics/skills/issues/1352): parallella körningar blandar ihop varandra.
  - [#1552](https://github.com/anthropics/skills/issues/1552) och [#1559](https://github.com/anthropics/skills/issues/1559): samma fel med 0 % träff.
- **Visaren:** [#1982](https://github.com/anthropics/skills/issues/1982), [#1789](https://github.com/anthropics/skills/issues/1789) och [#1793](https://github.com/anthropics/skills/issues/1793) gäller skriptinjektion, POST från andra ursprung och osandlådad rendering. Egen läsning: `generate_review.py` dödar varje process som lyssnar på port 3117 innan den startar.
- **Övrigt:**
  - [#702](https://github.com/anthropics/skills/issues/702): `.claude.json` skadades under en körning.
  - [#1823](https://github.com/anthropics/skills/issues/1823): prosa, versaler och koreograferade bedömare skrivna för äldre modeller.
  - [#1942](https://github.com/anthropics/skills/issues/1942): loopen förutsätter att delagenter får startas.
  - [#1383](https://github.com/anthropics/skills/issues/1383): tysta fel i sammanställningen.
  - claude-plugins-official [#6352](https://github.com/anthropics/claude-plugins-official/issues/6352): en promptgranskning mot Opus 5.5 pekar ut en "hype line" ("billions a year in economic value").

## Det bästa vi kan ta
- **Bedömarens disciplin** i `grader.md` till vår granskare och mätning: beviset för godkänt ligger på kriteriet, belägg krävs per utfall, utfall som bara ser rätt ut till formen underkänns, påståenden i rapporten prövas, och kriterier som inte skiljer pekas ut.
- **Analytikerns fyra mönster** för att rensa kontroller och kriterier som alltid går igenom (`guide/3-4`, *Kontroller åldras*; agentskills.io).
- **Baslinjereglerna:** ny skill mot ingen skill, ändrad skill mot ögonblicksbild, och båda armarna startas samtidigt.
- **Frågor som nästan är rätt** i träffprovet (C179 i `bilaga-c-kontroller.md`). Detta bekräftar ⚠️ i `guide/3-4`: originalet säger 20 frågor, 8–10 åt vardera hållet, 60/40, 3 körningar och 5 varv.
- **Inte jämföraren som den är:** den kör en ordning och pressar fram en vinnare. Vår regel är båda ordningarna och vinst bara vid enighet (`guide/3-2`, *Blind jämförelse*).

## Var det hamnar hos oss
**Metoden i `larande` nu, verktyget *pröva* och inte *ta in*** (säger delvis emot förslaget).
- Metoden förs in i `larande/skills.md` (provet med och utan, träffprovet) och `larande/matning.md` (bedömarens och analytikerns regler).
- Verktyget i sin nuvarande form mäter fel just hos oss: våra skills ligger installerade i `.claude/skills/`, vilket ger 0 % träff (#1419). `run_eval.py` startar dessutom `claude -p` i repots rot med alla projektets hooks och skills.
- Baslinjen med "utan skill" körs som delagent i samma session, och delagenter får skillistan (claude-code #92750). Baslinjen kan alltså själv anropa den installerade skillen (tolkning ⚠️). Skills-dokumentationen anger `skillOverrides: "off"` för baslinjen.
- Förslag: träffprovet görs för hand i ny session med `skillOverrides` tills #1721 och #1419 är lagade. Pluginet installeras först efter Johnnys ja och ett prov.

## Passar vår stack?
Det är oberoende av stacken; skripten är Python med standardbiblioteket plus PyYAML (odeklarerat beroende, [#1467](https://github.com/anthropics/skills/issues/1467)). Testfrågorna blir våra verkliga uppdrag (en brief, en sajt att granska). Bilderna måste ligga som filer, eftersom visaren läser `outputs/`. Arbetskatalogen hamnar bredvid skillen (`.claude/skills/<namn>-workspace/`) och ska flyttas ut, så att kundmaterial inte hamnar i `.claude/`. "Pushy" beskrivningar krockar med vår regel om en utlösare per gren och med webb-pros 67 krockar (`guide/3-4`).

## Risker och flaggor
- Visaren startar en lokal server och dödar det som redan lyssnar på porten. Det kan vara en dev-server.
- Träffprovet skriver tillfälliga filer i projektets `.claude/commands/`.
- `quick_validate.py` godtar bara Agent Skills-fälten. Egen läsning: Claude Codes extra fält i frontmattern kan underkännas.
- Varje körning kostar tokens på Johnnys abonnemang.
- Skillens prosa är skriven för äldre modeller (#1823) och bör inte kopieras.
- Inloggning eller telemetri syns inte.

## Inloggning
Inget. I Claude Code används sessionens inloggning, och sedan 2026-03-06 krävs ingen API-nyckel (commit `b0cbd3d`, [#547](https://github.com/anthropics/skills/pull/547)).
