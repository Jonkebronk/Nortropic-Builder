# writing-for-agents

**Källa:** https://github.com/mattpocock/skills. Läst 2026-10-16 i den grunda klonen `kallor/fg/mattpocock_skills/repo` vid `49dd158` (2026-10-09). Senaste commit som rörde skillmappen är `321658273cb1` (2026-08-19, "Remove all em-dashes") enligt `gh api`. Lästa filer, alla i sin helhet:
- `skills/productivity/writing-for-agents/SKILL.md` (81 rader), `SKILL-MECHANICS.md` (22 rader) och `agents/openai.yaml`.
- `docs/productivity/writing-for-agents.md` (70 rader) och `.out-of-scope/lazy-load-writing-for-agents.md` (11 rader).
- Skillen `skills/engineering/retro/SKILL.md` och början av dess dokumentation, eftersom de anropar varandra.

Webb-pros kopia (`.claude/skills/writing-for-agents/`, 101 rader, 2 commits, senast `94cdc2e` 2026-10-06) är källans text med ett tillägg på 20 rader överst och en svensk beskrivning. Brödtexten och `SKILL-MECHANICS.md` är identiska med `49dd158` (diff 2026-10-16). Inventeringen: B61, 0 krockar.
**Licens:** MIT, © 2026 Matt Pocock. Licenstexten följer med vid kopiering; vid destillering räcker källa och commit.

## Vad det är
En referens för text som en agent läser: skills, `CLAUDE.md`/`AGENTS.md`, specar och promptar. Grundtanken är att samma *process* ska köras varje gång, inte att utdata ska bli likadan. Enligt dokumentationen är standardrättelsen "to delete, not to explain": det mesta en agent skriver åt en annan agent förklarar sådant modellen redan vet.

## Hur det fungerar
- **Kontextpekare:** en skills beskrivning och en rad i `CLAUDE.md` är samma sak. Formuleringen avgör hur pålitligt agenten når materialet. Skriv vad det är och en utlösare per *gren*, inte synonymer.
- **Två laster:** *kontextlast* är det som alltid är laddat (beskrivningar, `CLAUDE.md`). *Kognitiv last* är människans börda att minnas vad som finns. Den senare ska inte minimeras, eftersom den är "the price of human agency".
- **Informationshierarkin:** steg i filen, referens i filen och referens bakom en pekare. Det varje gren behöver står i filen; det bara vissa grenar behöver flyttas ut. *Sprawl* är när en fil är för lång även om varje rad är levande.
- **Klart-villkor:** *tydlighet* (går klart att skilja från inte klart?) och *krav* ("varje modell redovisad" driver mer grävande än "gör en lista"). Mot förhastat avslut skärps villkoret först. Först om det inte räcker döljs senare steg bakom en verklig kontextgräns, till exempel en delagent.
- **Ledord:** ett ord som modellen redan förstår (*tight*, *red*) och som används som ett och samma ord i stället för en mening. *Negation* lyfter fram det förbjudna, så skriv målet positivt. Ett förbud står bara som hårt skyddsräcke, och då ihop med målet.
- **Rensning:** en sak på ett ställe. Miljön (`package.json`, konfigurationen) är också en källa, och att skriva om den är en *cache* som blir inaktuell. *Sediment* är gamla lager som ligger kvar. *No-op-testet*: ändrar meningen beteendet jämfört med standard? Det avgörs genom att köra, inte genom diskussion; stryk hela meningen.
- **`SKILL-MECHANICS.md`:** en skill som modellen anropar betalar kontextlast för sin beskrivning. En skill med `disable-model-invocation: true` kostar ingenting men måste kommas ihåg av människan. En router-skill pekar ut de andra.

## Kvalitet och underhåll
- Repot: 293 462 stjärnor, MIT, 187 öppna ärenden och PR:er, 8 bidragsgivare, senaste push 2026-10-13 (`gh api`, 2026-10-16). Skillen döptes om från `writing-great-skills` 2026-07-31 (`1fc6573e0e30`, "feat!") och blev anropbar i Codex 2026-08-05 (`4aaccb58d405`).
- **Kända problem:**
  - [#922](https://github.com/mattpocock/skills/issues/922) (öppet): beskrivningen saknar den tredje grenen som brödtexten själv nämner (dokument och promptar). Skillen utlöses alltså bara av skills, `AGENTS.md` och `CLAUDE.md`.
  - [#1274](https://github.com/mattpocock/skills/issues/1274) och [#1275](https://github.com/mattpocock/skills/issues/1275) (öppna): inga råd om att bevara block som genereras av verktyg eller att kontrollera symlänkar innan `CLAUDE.md` skrivs om.
  - [#965](https://github.com/mattpocock/skills/issues/965) (stängt): `disable-model-invocation` fungerade inte i Codex.
- Dokumentationen säger själv: "There is no automated eval" – skillen prövas genom att köra dokumentet.

## Det bästa vi kan ta
Redan destillerat i `larande/skills.md`, *Så skrivs den*: pekaren, negation, hierarkin, en sak på ett ställe, klart-villkoret (tydlighet) och no-ops. Det som saknas:
1. **Krav, inte bara tydlighet**, i klart-villkoren: "varje sida i 375 och 1280 px" binder, "granska noga" gör det inte. Det står delvis som exempel men inte som princip.
2. **Skillify överanpassas.** Enligt dokumentationen (*Common questions*: "My skill only works on the exact task I built it from") passar en skill som skrivs ur en enda körning bara den körningen. Spara körningen som belägg och generalisera medvetet. Det rättar direkt guidens Skillify (`3-4`, `bilaga-b`).
3. **De två lasterna och `disable-model-invocation`.** Med tolv egna skills och budgeten på 1 % (`3-4`, *Bara de skills sajten använder*) bör skills som bara Johnny startar vara användaranropade och inte ta kontextlast. Det gäller till exempel `larande`, som körs efter en sajt.
4. **Cache och sediment** som namngivna fel i rensningen vid ny modell (`3-4`).
5. **"Agents told to streamline cut functionality"**: rensning prövas på beteendet, inte på längden.
6. **Upptäckt: Pococks `retro`** (MIT, `a7d038f6bf7f`, 2026-09-24) är en retrospektiv efter en session som bara föreslår ändringar. Den klassar fynd i navigering, automatiska kontroller, granskarens standard, `AGENTS.md`, verktygsekonomi, no-ops och informationsåtkomst. Ett mekaniskt fel blir alltid en kontroll, och bara omdömesfrågor blir prosa hos granskaren. Den motsvarar vår genomgång efter en sajt men finns inte i inventeringen. Förslag: ett eget källkort.

## Var det hamnar hos oss
**Skill: larande**, delfilen `skills.md` – håller med förslaget. Inventeringens "Behåll" och `bilaga-b` (N2: "används när skills skrivs") kan läsas som att skillen ska installeras. Men en sak på ett ställe och taket på tolv skills talar för att destillera punkt 1–5 till några rader i `skills.md`, med källa och commit, och läsa originalet i klonen när en ny skill skrivs. Det kräver ingen installation. Punkt 6 hör till `larande/genomgang.md` om retro tas in efter ett eget kort.

## Passar vår stack?
Skillen är oberoende av stack och språk. Två saker översätts: `AGENTS.md` heter `CLAUDE.md` hos oss, och ledorden väljs på svenska när texten är svensk (webb-pros tillägg gjorde redan så). Dokumentationen hävdar att ledorden fungerar också när engelska inte är författarens modersmål; det är oprövat här ⚠️.

## Risker och flaggor
- **Spänning med guiden:** `3-4` säger "Förbud behålls" och `bilaga-b` att fallgroparna blir förbud i rätt skill, medan skillen varnar för negation. De går ihop om varje förbud står med sitt positiva mål. `larande/skills.md` säger redan det; regeln bör stå också i `bilaga-b`, *Så skrivs en skill*.
- **#922:** kopieras beskrivningen som den är utlöses skillen inte av guider och promptar. Vår destillering har ingen beskrivning, så problemet faller bort.
- **No-op-testet är modellberoende** och avgörs genom att köra. Rensning görs alltså med prov, inte på känsla (`3-4`, *En instruktion rensas bara när mätningen visar det*).
- Telemetri, betalvägg och inloggning: inga. Dokumentationen länkar begreppen till aihero.dev, där repots README också har sitt nyhetsbrev. Skillen själv innehåller inget sådant.

## Inloggning
Inget.
