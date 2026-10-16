# ralph-loop

**Källa:**
- [anthropics/claude-plugins-official/plugins/ralph-loop](https://github.com/anthropics/claude-plugins-official/tree/main/plugins/ralph-loop), klonat i `kallor/fg/anthropics_claude-plugins-official/repo` vid commit `ea10b21` (2026-10-15). Pluginets senaste ändring är `986deab` (2026-03-28), och `plugin.json` anger version 1.0.0.
- Lästa filer: `README.md`, `commands/ralph-loop.md`, `cancel-ralph.md`, `help.md`, `hooks/hooks.json`, `hooks/stop-hook.sh` och `scripts/setup-ralph-loop.sh`.
- Geoffrey Huntley, [ghuntley.com/ralph](https://ghuntley.com/ralph/), daterad 14 juli 2025 enligt sidhuvudet. Läst 2026-10-16.

**Licens:** Apache-2.0 (`LICENSE` i pluginmappen, tillagd 2026-02-20). Vid vidarespridning krävs licenstexten och märkning av ändringar. Vi sprider inget och installerar inget.

## Vad det är
Huntleys "Ralph" är en skalloop som matar samma prompt till en kodagent om och om igen: `while :; do cat PROMPT.md | claude-code ; done`. Varje varv startar med ny kontext och ser bara det tidigare arbetet i filer och git. Pluginet gör samma sak *inne i en session* med en Stop-hook. Hooken blockerar avslutet och matar tillbaka samma prompt tills ett löfte skrivs ut eller taket nås.

## Hur det fungerar
- **Start:** `/ralph-loop "<prompt>" --max-iterations N --completion-promise "TEXT"`. Setupskriptet skriver `.claude/ralph-loop.local.md` med `iteration`, `max_iterations` (0 betyder obegränsat, som är standard), `completion_promise`, `session_id`, starttid och prompten. `/cancel-ralph` raderar filen.
- **Hooken** (`stop-hook.sh`, bash med jq och perl):
  - Utan tillståndsfil tillåts avslut.
  - Har en annan session startat loopen tillåts avslut. Isoleringen per session lades till 2026-03-02.
  - Ett trasigt fält raderar tillståndet och tillåter avslut.
  - När varvet når `max_iterations` raderas tillståndet och avslut tillåts.
  - Annars läses `transcript_path`, och den sista textbiten bland de senaste 100 raderna från assistenten tas ut. Det första `<promise>…</promise>` jämförs **bokstavligt** med löftet.
  - Annars räknas varvet upp (en temporär fil flyttas på plats, så skrivningen blir atomisk), och hooken returnerar `{"decision":"block","reason":<samma prompt>}` med ett systemmeddelande om varvnumret.
- **Hooken räknar varven själv** i en fil men läser inte `stop_hook_active`.
- **Kommandotexten:** löftet får skrivas "ONLY … when the statement is completely and unequivocally TRUE".
- **README:n** säger att mönstret passar för tydliga framgångskriterier, automatisk kontroll (tester, linters) och nya projekt. Det passar inte för "Tasks requiring human judgment or design decisions", engångsuppgifter, otydliga kriterier och felsökning i produktion. Löftet är en exakt strängjämförelse och kan inte skilja SUCCESS från BLOCKED, så "Always rely on `--max-iterations` as your primary safety mechanism".
- **Huntleys principer:**
  - En sak per varv, med samma spec, plan (`fix_plan.md`) och bygganteckning (`AGENT.md`) inlästa varje varv.
  - Mottryck från snabba kontroller (tester, typer, bygge): "the wheel has got to turn fast".
  - Sök innan agenten antar att något saknas, och kräv fullständiga implementationer.
  - Bara en delagent kör bygge och tester.
  - Stäm mönstret med "signs" i prompten. Det är "deterministically bad in an undeterministic world".
  - Bra för nya projekt, och han räknar med att komma 90 % av vägen. Om befintlig kod: "There's no way in heck would I use Ralph in an existing code base".

## Kvalitet och underhåll
claude-plugins-official: 39 737 ★, 42 bidragsgivare, 1 133 öppna ärenden och PR i hela repot, senaste push 2026-10-16. ralph-loop har 7 commits i repot. Den senaste är från 2026-03-28, och inget har ändrats sedan dess. Öppna ärenden:
- [#125](https://github.com/anthropics/claude-plugins-official/issues/125): pluginet avviker från originalet, eftersom kontexten växer i stället för att vara ny varje varv.
- [#5312](https://github.com/anthropics/claude-plugins-official/issues/5312): `stop_hook_active` ignoreras, så sessioner låser sig upp till taket.
- [#3632](https://github.com/anthropics/claude-plugins-official/issues/3632): löftet upptäcks inte trots rätt format.
- [#3989](https://github.com/anthropics/claude-plugins-official/issues/3989) och [#4909](https://github.com/anthropics/claude-plugins-official/issues/4909): tillståndet slås upp relativt arbetskatalogen, så ett `cd` dödar loopen.
- [#65](https://github.com/anthropics/claude-plugins-official/issues/65): `/cancel-ralph` kvitteras men loopen fortsätter.
- [#5536](https://github.com/anthropics/claude-plugins-official/issues/5536): en kvarglömd tillståndsfil.
- [#6370](https://github.com/anthropics/claude-plugins-official/issues/6370): `help.md` anger fel filnamn.
- Flera krascher på obundna variabler: [#301](https://github.com/anthropics/claude-plugins-official/issues/301), [#609](https://github.com/anthropics/claude-plugins-official/issues/609).

README:ns resultat ("$50k contract completed for $297", sex repon på en natt) är anekdoter som Huntley återger ur tweets. De är overifierade ⚠️.

## Det bästa vi kan ta
- **Huntleys principer:** en sak per varv, samma underlag inläst varje varv (hos oss brief, sidkarta och `progress.md`), snabbt mottryck från kontrollskriptet, sök innan det antas saknas, och ny kontext per varv (`guide/3-1`, N2 *Ny kontext per steg*). Hans "signs" motsvarar våra lärdomar, men hos oss blir de förslag som Johnny beslutar om (`guide/3-4`).
- **Hooken som förlaga till vår grindhook (N2):** en tillståndsfil med varvräknare, `session_id` så att en annan session inte blockeras, atomisk uppdatering, och att avslut tillåts när tillståndet är trasigt (fail-safe). Rätta det pluginet gör fel:
  - läs `stop_hook_active` (#5312);
  - läs `last_assistant_message` i stället för transkriptet, som enligt dokumentationen kan släpa efter (#3632);
  - lägg tillståndet relativt repots rot (#3989);
  - gå till Johnny med `blocked` när taket nås, i stället för att bara sluta.
- **Löftet är modellens eget påstående.** Vår grind kör kontrollerna själv och skiljer *klart*, *blocked* och *tak* (`guide/3-1`, *Grindkontrollen*).
- **Avgränsningen:** pluginet avråder självt från design och omdöme. Det är en andra källa till `larande/loopen.md` (*Design, text, ton: ingen loop till klart*).

## Var det hamnar hos oss
**Skill: `larande`, `loopen.md`** (mönstret; installeras inte). Jag håller med förslaget. Avsnittet *Ralph-loopen* finns redan där. Det som tillkommer är Huntleys principer och lärdomarna för hooken ovan, som förs till N2-hooken i `guide/3-1` som förslag. Ett installerat plugin vore en tredje Stop-mekanism bredvid `/goal` och vår egen hook.

## Passar vår stack?
Det är oberoende av stacken; skripten kräver bash, jq och perl, som finns på macOS. Ett nytt Astro-projekt motsvarar Huntleys nya projekt, men bara steg med entydigt mått passar, som "bygget och kontrollskriptet är gröna", aldrig ytan eller texten. Huntleys yttre skalloop med ny kontext stämmer bättre med vår N2 än pluginets växande session.

## Risker och flaggor
- Standard är **obegränsat antal varv** ("runs forever"). I auto mode blir det kostnad utan tak.
- Kommer pluginet från den officiella marknadsplatsen uppdateras det automatiskt som standard, så versionen glider (`plugins/loading`, *When auto-update runs*).
- Stop-hooks staplas: ralph-loop, hookify och vår grind blockerar var för sig.
- Ingen telemetri syns i skripten. Ingen betalvägg och ingen inloggning.
- Huntleys sida har prenumerationsrutor som inte stänger in texten.

## Inloggning
Inget.
