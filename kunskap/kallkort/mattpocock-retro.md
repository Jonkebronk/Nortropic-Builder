# mattpocock/skills retro

**Källa:** https://github.com/mattpocock/skills, HEAD `49dd158d1076134a641b33efb035946536778336` (2026-10-09; samma 2026-10-16 enligt `git ls-remote`). Skillen skrevs i `skills/in-progress/retro/` från `8fa188659c5f` (2026-08-24) och flyttades till `skills/engineering/retro/` i `a7d038f6bf7f` (2026-09-24), den senaste ändringen av skillmappen (`gh api .../commits?path=`). Lästa i sin helhet i den grunda klonen `premium/kallor/fg/mattpocock_skills/repo`: `skills/engineering/retro/SKILL.md` (44 rader), `agents/openai.yaml`, `docs/engineering/retro.md` (81 rader, senast ändrad `dfe75499f43e`, 2026-10-05), `.out-of-scope/lazy-load-writing-for-agents.md`, `SCOPE.md`, README:s installationsavsnitt och `CHANGELOG.md` (1.3.0–1.3.1). Ärendena [#1141](https://github.com/mattpocock/skills/issues/1141), [#1158](https://github.com/mattpocock/skills/issues/1158), [#1173](https://github.com/mattpocock/skills/issues/1173), [#1207](https://github.com/mattpocock/skills/issues/1207) och PR [#1238](https://github.com/mattpocock/skills/pull/1238), via `gh api` 2026-10-16. Syskonkortet: `writing-for-agents.md`. ⚠️ Inte lästa: `code-review` och `ask-matt`, som retro samspelar med.
**Licens:** MIT, © 2026 Matt Pocock (`LICENSE`). Licenstexten följer med vid kopiering. Vi destillerar med egna ord och anger källa och commit, så inget krav utlöses.

## Vad det är
En skill som bara användaren startar (`disable-model-invocation: true`; i Codex `allow_implicit_invocation: false`). Den läser en kodsession i efterhand och föreslår ändringar i agentens *miljö*, inte i koden. Den ändrar ingenting själv: *"It also only proposes. Nothing changes until you pick a candidate"* (docs, rad 5). Den är sista steget i Pococks kedja `grill-with-docs → to-spec → to-tickets → implement → code-review → retro` (docs, rad 73).

## Hur det fungerar
- **Fyra steg** (SKILL.md:9–25): ladda `writing-for-agents`, läs sessionens primärkällor (den aktuella sessionen, annars sessionsloggarna), leta kandidater och lägg fram dem i allvarsordning.
- **Sju kategorier**, var och en med *Use when* (:17–23): navigering (en pekare saknas), automatiska kontroller, kodstandard för granskaren, global `AGENTS.md`, verktygsekonomi, no-ops och informationsåtkomst.
- **Klassa före regeln** (:19): ett *mekaniskt* fel (fast mönster, förbjudet API, filplacering) får en deterministisk kontroll, *"full stop"*. Bara verkliga omdömesfrågor blir text i `CODING_STANDARDS.md`. Finns kontrollen men är inte inkopplad är det fyndet, inte en ny kontroll (:18). Ett repo utan skyddsräcke alls är ett eget fynd.
- **Standarden hör till granskaren** (:29–35): den som bygger har mest kontexttryck, granskaren får bara en diff. `CLAUDE.md` och `AGENTS.md` ska nästan bara ha pekare (:41; docs, rad 51).
- **`writing-for-agents` laddas varje gång**, eftersom den definierar vad en no-op och en bra skill är. PR #1238 ville ladda den först när retro skriver; den stängdes och beslutet står i `.out-of-scope/` (commit `82672251ee9d`, 2026-10-09).

## Kvalitet och underhåll
- Repot: 293 740 stjärnor, 24 629 forkar, 8 bidragsgivare med anonyma medräknade, senaste push 2026-10-13, 187 öppna ärenden och PR:ar (`gh api`, 2026-10-16). Version 1.3.1; retro blev en del av pluginet i 1.3.0 (`CHANGELOG.md`, #1120).
- **Ribban** (`SCOPE.md`, *The bar*): en skill ändras bara efter ett observerat fel i en verklig session. Därför stängdes #1207 (ägare och väg per förslag) som *not planned*.
- **Kända problem:**
  - #1173 (öppet, 2026-10-05): kandidaterna prövas inte innan de visas, och varje *Use when* är vanlig friktion, så varje körning ger en lista. Rapportören: 15 av 17 körningar följdes av att användaren bad agenten bevisa kandidaterna, och ofta föll en kandidat på en enda fråga (`git log`, en räkning i transkriptet).
  - Dokumentationen säger själv att retro bara ser en session och aldrig prövar de kontroller den föreslog tidigare – *"this is its weakest spot"* (rad 39). Den citerar en användare: *"the AI tends to forget the struggles from the middle of the session and invents generic advice to satisfy the retro categories"* (rad 43).
  - #1141 (stängt 2026-10-05 utan kommentar): delagenternas sessioner räknas inte som primärkällor. SKILL.md vid `49dd158` nämner dem fortfarande inte.
  - #1158 (stängt): Anthropics marknadsplats pekade på en commit där retro inte var registrerad.

## Det bästa vi kan ta
**Redan taget:** de fyra miljöfrågorna och "mekaniskt fel → kontroll, omdömesfel → granskarens kriterium" (`.claude/skills/larande/genomgang.md:50`), och att förslagen läggs fram med grund och väntar på Johnnys ja (`genomgang.md` §4; `guide/5-byggplan.md:57`).

**Inte taget:**
1. **Varje förslag pekar på ett ögonblick i sessionen**, annars stryks det (docs, *It's working if*, rad 63). `genomgang.md` §4 kräver en grund, men inte att den går att hitta i `progress.md` eller transkriptet.
2. **Pröva förslaget innan det visas** (#1173, inte infört uppströms): vad skulle synas om förslaget behövs, och vilken smal kontroll kan visa att det inte behövs? Fråga om felet kostade något, inte bara hur ofta det hände. Noll förslag är en fullständig genomgång.
3. **En kontroll som slår larm på bra kod tas bort** (docs, rad 39: *"A rule that fires constantly on good code is the sign to remove it"*). `guide/3-4:29` prövar bara kontroller som aldrig underkänner; den motsatta sorten saknas.
4. **Delagenternas loggar är också underlag** (#1141). Det gäller från N2, när byggaren blir delagent. Annars ser genomgången bara huvudsessionens sammanfattning.

## Var det hamnar hos oss
**Skill: larande**, `genomgang.md` – beslutad placering (fältet `beslut`, Johnny 2026-10-16 omkring 17.40: *"Ja på alla"*), och kortet håller med. Retro installeras inte. Vår genomgång är redan skriven, och pluginet tar med Pococks hela kedja. Punkt 1–3 blir instruktioner *(en källa – bänken)*; #1173 är en användares rapport, inte Pococks text. Punkt 4 hör till `genomgang.md` §1 eller `guide/3-1` när byggaren blir delagent.

**Säg emot en rad:** `genomgang.md:50` säger "Ett mekaniskt fel blir en kontroll", efter retros *"full stop"*. Det krockar med tabellen i samma fil (:27, "kontroll bara för det objektivt fel som hänt mer än en gång"), med `guide/3-4:13` (nya låsta kontroller bara för objektivt fel som hänt mer än en gång, efter Johnnys beslut) och med grindregeln i `guide/README.md`. Förslag: "Ett mekaniskt fel blir ett förslag till kontroll (tabellen ovan)".

## Passar vår stack?
Skillen är oberoende av stack. Översättningen: `AGENTS.md` är `CLAUDE.md`; `CODING_STANDARDS.md` är granskarens låsta checklista (`mallar/granskning.md`, Johnny godkänner ändringar); *the reviewer agent* är `granskare`; lint, pre-commit och CI motsvarar kontrollskriptet och Stop-hooken (`genomgang.md` §3).

## Risker och flaggor
- **Brus:** utan ett prövningssteg ger varje körning en lista (#1173). Johnny ska inte behöva sortera bort förslag.
- **Krock med beslut:** *"Default to building the check over writing the rule"* (SKILL.md:19) står mot `guide/3-4:13` och grindregeln (norm eller två oberoende primärkällor). Retros råd blir förslag, aldrig låsta kontroller på egen hand.
- **Sessionsloggar** kan innehålla kunduppgifter. En genomgång som läser dem stannar lokalt (`CLAUDE.md`, *Skyddsräcken*).
- README länkar till Pococks nyhetsbrev på aihero.dev. Skillen har ingen telemetri, betalvägg eller inloggning.

## Inloggning
Inget.
