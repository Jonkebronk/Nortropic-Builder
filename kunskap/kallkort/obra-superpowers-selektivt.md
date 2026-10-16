# obra/superpowers, selektivt

**Källa:** https://github.com/obra/superpowers, läst 2026-10-16 i klonen `kallor/fg/obra_superpowers/repo` vid commit `bb92a77` (release v7.0.0, 2026-10-10 UTC). Lästa filer: `README.md`, `.claude-plugin/plugin.json` och `marketplace.json`, hela `hooks/` (`hooks.json`, `hooks-cursor.json`, `session-start`, `run-hook.cmd`), `skills/using-superpowers/SKILL.md` (texten hooken lägger in), hela `skills/writing-skills/` (`SKILL.md`, `testing-skills-with-subagents.md`, `persuasion-principles.md`, `examples/CLAUDE_MD_TESTING.md`; `anthropic-best-practices.md`, `graphviz-conventions.dot` och `render-graphs.js` översiktligt) och `skills/verification-before-completion/SKILL.md`. Alla 2 357 ärenden och PR:er hämtades via GitHubs API 2026-10-16. Johnnys Mac: `kunskap/research/2026-10-15_mac-avgransning.md`. Webb-pros intag av samma repo: `nortropic-webb-pro/kunskap/REGISTER.md` (2026-10-02, commit `8ca22db`) och `KIRURG-OMDOMEN.md`.
⚠️ Inte lästa: de tolv övriga skillsen (bara README:s sammanfattning), `tests/`, `docs/`, och eval-labbet superpowers-evals.

**Licens:** MIT, © 2025 Jesse Vincent (`LICENSE`). Kopior av väsentliga delar ska ha med upphovsrätts- och licenstexten. Vi destillerar med egna ord och anger källan, så inget följer med.

## Vad det är
En metod för programvaruutveckling i form av 15 skills och en `SessionStart`-hook som tvingar agenten att använda dem. Arbetsgången är brainstorming → worktree → plan → delagentdriven utveckling med TDD → kodgranskning → avslut av grenen (README, *The Basic Workflow*). Två skills är intressanta för oss: `writing-skills` (testdriven skillskrivning) och `verification-before-completion` (belägg före påstående).

## Hur det fungerar
- **Hooken** (`hooks/hooks.json`) körs vid `startup|clear|compact`. Den läser `using-superpowers/SKILL.md` (492 ord) och lägger in den som `additionalContext`, inlindad i `<EXTREMELY_IMPORTANT>` och inledd med "You have superpowers." Skillen säger att en skill ska anropas om det finns "even a 1% chance" att den passar, och att processkills som brainstorming går före alla andra (rad 11, *Skill Priority*). Delagenter ska strunta i den (`<SUBAGENT-STOP>`).
- **`writing-skills`** gör skillskrivning till TDD. Först körs en baslinje utan skill, där agenten ska misslyckas (RED). Sedan skrivs en minimal skill mot just de felen (GREEN), och till sist täpps nya kryphål till (REFACTOR). Regeln är "NO SKILL WITHOUT A FAILING TEST FIRST" (rad 376). Beskrivningen ska bara säga *när*, aldrig sammanfatta arbetsgången (*SDO*, rad 140–158). I deras prov gjorde agenten en granskning i stället för två när beskrivningen sammanfattade flödet.
- **Match the Form to the Failure** (rad 461–488): klassa hur agenten brast innan formen väljs.
  - Bröt den en regel den kände till? Skriv ett förbud och lista undanflykterna.
  - Fick utdata fel form? Skriv ett recept som säger vad utdata *är*, i ordning.
  - Glömde den ett element? Gör det till ett obligatoriskt fält i mallen.
  - Beror beteendet på läget? Skriv ett villkor på något som går att se.
  - Skriv inga brasklappar ("utom när det spelar roll"), eftersom undantag inte avgränsar.
- **Mikroprov av formuleringen** (rad 577–591): en ny kontext per anrop, med den verkliga skillen som omgivning. Kör alltid en kontroll utan vägledningen. Felar inte kontrollen finns inget att skriva. Kör minst fem gånger per variant och läs varje träff för hand. Spridningen är ett mått: fem olika tolkningar betyder att formuleringen inte binder.
- **`testing-skills-with-subagents.md`:** tryckscenarier med tre eller fler påfrestningar (tid, nedlagd möda, auktoritet, trötthet) och ett tvingat A/B/C-val. Undanflykterna skrivs ner ordagrant och blir en tabell och en lista med varningstecken. Ett metaprov frågar agenten hur skillen borde ha skrivits (rad 240). Rena referensskills ska *inte* trycktestas (rad 25).
- **`persuasion-principles.md`** bygger på Cialdinis sju principer. Auktoritet ("YOU MUST", "No exceptions"), åtagande ("announce skill usage") och knapphet ("IMMEDIATELY") rekommenderas för disciplinskills (rad 126).
- **`verification-before-completion`:** inget påstående om att något är klart utan ett färskt belägg. Arbetsgången är att identifiera kommandot som bevisar påståendet, köra det helt, läsa utdata och först sedan påstå något. En tabell visar vad som krävs och vad som inte räcker (rad 38–48). "Agent completed" kräver en VCS-diff, inte agentens rapport. "Requirements met" kräver en genomgång rad för rad, inte gröna tester.

## Kvalitet och underhåll
- 300 321 stjärnor, 26 816 forkar och 44 bidragsgivare (contributors-API:t med anonyma). Det finns 212 öppna ärenden och 156 öppna PR:er (368 i API:ts räknare). Skapat 2025-10-09, senaste push 2026-10-10, v7.0.0 släppt 2026-10-10. Stödet för 15 harnesses gör att hooken är det som oftast går sönder: ett sextiotal ärenden gäller `SessionStart`, de flesta på Windows.
- **Ärenden som gäller Mac eller oss:**
  - [#173](https://github.com/obra/superpowers/issues/173): `run-hook.cmd` föll på macOS. Stängt 2025-12-21.
  - [#571](https://github.com/obra/superpowers/issues/571): hooken hänger med Homebrews bash 5.3. Stängt 2026-03-17. Johnnys Mac har bara `/bin/bash` 3.2.57 (kontrollerat 2026-10-16), så felet gäller inte där.
  - [#648](https://github.com/obra/superpowers/issues/648): texten lades in två gånger.
  - [#385](https://github.com/obra/superpowers/issues/385): inläggning efter compact gav en loop.
  - [#190](https://github.com/obra/superpowers/issues/190): 22 000 token vid start på macOS. Stängt.
  - [#1480](https://github.com/obra/superpowers/issues/1480) (öppet): "You have superpowers." tolkas som promptinjektion. Det syns i tankeblocket och enligt en kommentar också i svaret på Sonnet 5.
  - [#2503](https://github.com/obra/superpowers/issues/2503) (öppet): hooken faller där bash saknas.
- **Kostnad och belägg:** flera ärenden gäller tokenåtgång ([#1940](https://github.com/obra/superpowers/issues/1940), [#1953](https://github.com/obra/superpowers/issues/1953)). I [#1988](https://github.com/obra/superpowers/issues/1988) körde delagentdriven utveckling i Codex en uppgift i cirka fyra timmar utan spärr. Enligt [#1754](https://github.com/obra/superpowers/issues/1754) släppte `verification-before-completion` igenom falska klartecken när utfallet inte prövades, bara att anropet lyckades.
- **Krocken på Johnnys Mac** var en krock i arbetssätt, inte ett tekniskt fel. Plugin 6.4.1 var på i `~/.claude`, och hooken lade in kravet att alltid använda skills, brainstorming före allt skapande, TDD, worktrees och delagentdriven utveckling. N1 säger inga hooks, granskaren som enda delagent och att Johnny tittar (mac-avgransning §1 och §2, punkt 3; `LAGE.md`). `~/.claude-bygg` laddar inga plugins från användarnivån, och det är prövat (§3). Ingen teknisk felrapport från Macen hittades i repot eller i webb-pro.

## Det bästa vi kan ta
1. **Formen efter felet** (`writing-skills/SKILL.md` rad 461–488) blir ett andra steg efter guidens klassning av orsaken (3-4, *Orsaken klassas före förslaget*). Guiden säger *var* rättelsen ska föras in, superpowers *vilken form* den ska ha. Johnny höll med när webb-pro tog in samma lärdom 2026-10-02 (`KIRURG-OMDOMEN.md`).
2. **Mikroprovet med en kontroll utan vägledning, fem körningar och varje träff läst** (rad 577–591) konkretiserar 3-4, *Skills grundas i en verklig körning*, och larande-principen *Röd först*. Utan fel i kontrollen skrivs ingen regel, och det är samma tanke som *skulle Claude göra fel utan den?*
3. **Baslinjen först och undanflykterna ordagrant.** I genomgången efter en sajt loggas det agenten faktiskt skrev när den hoppade över något. Det är handlingar och utdata, inte ett begärt resonemang (3-4, *Backa med handlingar*).
4. **Upptäcktsprovet** i `examples/CLAUDE_MD_TESTING.md` (en nollvariant mot fyra formuleringar, under tryck) är en mall för 3-4, *Triggningstest*.
5. **Tabellen över påståenden och belägg** i `verification-before-completion` (rad 38–48) passar 3-1, *Redo för Johnnys dom bara med belägg* och *Bara orkestreraren sätter status*. Två rader är särskilt användbara: en agents "klart" kräver en diff, och ett "kraven uppfyllda" kräver en genomgång rad för rad mot briefen. Lärdomen från #1754 gäller också: belägget ska pröva utfallet, inte bara att kommandot gick.

## Var det hamnar hos oss
**Skill: larande. Jag håller med förslaget.** Punkt 1–4 hör hemma i delfilen `skills.md` (*Så skrivs den* och *Så prövas den*), och punkt 1 och 3 nämns också i `genomgang.md`. Punkt 5 finns redan som princip i `larande/SKILL.md`, *Belägg före påstående*. Utkastet citerar redan SDO och *Röd först*. Det som saknas är formen efter felet och mikroprovets kontroll, upprepningar och spridning.
**Tas inte in:** pluginet, hooken, `using-superpowers` med enprocentsregeln, brainstorming, TDD, worktrees och delagentdriven utveckling. Persuasion-principerna som skrivstil tas inte heller in, och inte tryckscenarier med påhittad brådska för design- och textskills, som ska bedömas av Johnny eller den kalibrerade granskaren (3-2). Inget installeras, och `render-graphs.js` körs inte.

## Passar vår stack?
Metoden beror inte på språk eller ramverk, men den är skriven för kod med tester. "Testet" blir hos oss kontrollskriptet för det mätbara och Johnnys blinda dom med och utan för design och text (3-2, *En ändring i taget*). Mikroprov görs med en delagent i ny kontext eller ett API-anrop. Varje körning kostar ett verkligt modellanrop, så de begränsas till skilltext som faktiskt ändras. Våra skills är på svenska, och provfrågorna ska vara det också.

## Risker och flaggor
- **Auktoritet, åtagande och knapphet** krockar med Anthropics promptråd. Nyare modeller är mer lyhörda och kan överutlösa, så "dial back any aggressive language": "CRITICAL: You MUST use this tool" blir "Use this tool when…" ([Prompting best practices](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices), *Tool usage*). Samma sida säger "Prefer general instructions over prescriptive steps". Det stämmer med 3-4 (*Förbud behålls, arbetsgången prövas*; Fable 5-guiden) och med larande-utkastets "förklara varför i stället för versaler". Superpowers begränsar själv förbudsformen till disciplinfel (rad 482). Hos oss gäller den bara verkliga gränser som publicering och låsta filer.
- **Underlaget för persuasion-principerna** är Meincke m.fl. 2025, som mätte GPT-4o mini på förkastliga begäranden (förolämpningar, syntes av lidokain): 33 % → 72 % följsamhet ([Wharton GAIL](https://gail.wharton.upenn.edu/research-and-insights/persuading-llms-initial-study/)). Att det gäller följsamhet mot skills är superpowers egen tolkning ⚠️. En uppdaterad version från 2026-05-19 är inte läst ⚠️.
- **"Förbud slår bakut"** bygger på källans egna parvisa ordtester utan publicerade data (rad 472) ⚠️. Det är en instruktion, inte en grind (en källa, bänken).
- **Hooken** lägger in cirka 490 ord vid varje start, `/clear` och compact och styr skillordningen. Den krockar med N1, med regeln om inga tredjepartsskills i kundbygget och med #1480. Den är fortfarande på i Johnnys vanliga `~/.claude` (6.4.1), så en session som startas utan `claude-bygg` får den tillbaka. *Förslag:* om den ska stängas av där avgör Johnny. Om delagenter ärver hookens text är oklart: [#1889](https://github.com/obra/superpowers/issues/1889) påstod det men drogs tillbaka ⚠️.
- **Storlek:** `writing-skills/SKILL.md` har 681 rader och 3 814 ord. Det är över gränsen på 500 rader i Anthropics råd, som filen själv bifogar (`anthropic-best-practices.md` rad 1099). Ta idéerna, inte formen.
- **Telemetri** finns bara i brainstormingens visuella stöd, som hämtar en logotyp med versionsnummer från primeradiant.com (README; `brainstorming/scripts/server.cjs` rad 106–112). Den går att stänga av och berör oss inte när inget installeras. Kommersiell support erbjuds, men det finns ingen betalvägg.

## Inloggning
Inget. Repot, ärendena och Anthropics sidor är publika. `gh` användes med den befintliga inloggningen bara för API:ts hastighetsgräns.
