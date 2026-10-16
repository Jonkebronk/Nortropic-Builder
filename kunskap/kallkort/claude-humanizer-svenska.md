# claude-humanizer-svenska

**Källa:** https://github.com/nordefors-max/claude-humanizer-svenska, commit `81a8768e8f32778de3b0f7454fdc0ef0959178ca` (2026-03-20, *"Update README.md"*), skillversion 2.0.0. HEAD är oförändrad 2026-10-16 (`git ls-remote`). Lästa i sin helhet: `SKILL.md` (667 rader), `README.md` (155 rader) och `CHANGELOG.md` (83 rader), alltså hela repot. Dessutom ärende och PR [#1](https://github.com/nordefors-max/claude-humanizer-svenska/pull/1) och metadata via GitHubs API.
**Licens:** ingen. Repot saknar licensfil, och GitHubs API anger `license: null`. Utan licens har vi ingen rätt att kopiera eller bearbeta texten (tolkning, inte juridisk rådgivning). Vi läser bara: mönsterkategorierna tas med egna ord och egna exempel, exemplen och ersättningslistorna aldrig.

## Vad det är
En svensk humanizer-skill för Claude, byggd på [blader/humanizer](https://github.com/blader/humanizer). Den hittar AI-mönster i svensk yrkestext – affärstext, rapporter, artiklar och inlägg på LinkedIn – och skriver om dem. README lovar mönster *"that have no equivalent in English-language humanizer tools"*.

## Hur det fungerar
- 16 mönster: uppblåst betydelse, omvärldsöppning, svans som spelar analys, vaga auktoriteter, det-konstruktioner, nominaliseringar, kalkerade anglicismer, tretal och jämna stycken, kontrastfigur, inslag i sociala medier, inställsamma fraser, utfyllnad, staplade reservationer, brasklappar om kunskap, *utgör* i stället för *är*, och punktlistor och emoji. Varje mönster har ordlista, problem, före och efter.
- Ett avsnitt om röst: att ta bort mönster räcker inte, texten ska ha en ståndpunkt.
- Register för fyra texttyper och en tabell med vanliga byten.
- Arbetsgången har tio steg och slutar med två självkontrollfrågor: vad som fortfarande avslöjar AI, och vad texten saknar för att låta som en verklig person med en verklig åsikt.

## Kvalitet och underhåll
- 9 stjärnor, 2 forkar, en bidragsgivare och 5 commits, alla 18–20 mars 2026. Inget sedan dess (GitHubs API 2026-10-16).
- **PR [#1](https://github.com/nordefors-max/claude-humanizer-svenska/pull/1)** (jhagberg, 2026-09-02, öppen, inga kommentarer) för över blader/humanizer 2.11.2 till svenska: en regel att aldrig hitta på fakta, ett skydd mot falsklarm och 13 nya mönster. Den skriver om exemplen som *"invented sources and figures"*. Inte sammanslagen.
- **Fel i källan:**
  - Flera efter-exempel och slutversioner hittar på källor och siffror som inte finns i före-texten: en namngiven undersökning, en prognos och procenttal (`SKILL.md`, mönster 4 och 14 och exempel 2). README medger *"The skill does not source-check"*.
  - Exempel 3:s slutversion bryter mot skillens eget mönster 9 (kontrastfigur), och flera procenttal står utan mellanslag (svensk norm: *5 %*).
  - Mönster 15 byter *verkar som* mot *är*. Det gör en osäker uppgift till ett påstående.
  - Mönster 3 kallar *belyser vikten av* för particip, och mönster 5 kallar *det är viktigt att notera att* för passiv. Båda är fel benämningar.
  - README är inte uppdaterad till 2.0.0: den säger tio mönster, länkar till en `examples/`-mapp som saknas, har en installationsadress som inte fungerar och länkar den engelska förlagan till fel repo.
  - Påståendet om *"tusentals AI-genererade svenska texter"* saknar belägg. Ordlistorna speglar enligt README *"GPT-4 and GPT-4o era output (2023–2025)"*.
- **Krock med Wikipedia:** mönster 12 (utfyllnad) och 13 (reservationer) flaggar enstaka omständliga uttryck och förbehåll. Wikipedia räknar *"Isolated wordy constructions"* och *"Qualifiers and intensifiers"* som vanligare i text som människor skrivit (*Signs of human writing*, rev. 1380310647).

## Det bästa vi kan ta
Redan taget, med egna ord och egna exempel:
- Kalkerade anglicismer som mönster (`ai-monster.md`, mönster 20) – den enda källan till mönstret.
- Iscensatt upptakt och utfyllnad (mönster 4) och staplade reservationer (mönster 25), med fler källor.
- Att ta bort mönster räcker inte; rösten kommer ur kundens ord (`ai-monster.md:15`, `rost.md:25`).
- Att svenska läsare misstror superlativ, som bänk (`rost.md:10`).

Inget mer behöver tas. Svenska nominaliseringar och det-konstruktioner har redan Språkrådet som källa (`text.md`, *Klarspråk*).

## Var det hamnar hos oss
Placeringen **skill: innehall** är beslutad: fältet `beslut` säger *"Johnny 2026-10-16 omkring 17.40: 'Ja på alla'"*. Källan står i `.claude/skills/innehall/ai-monster.md` (rad 15, mönster 4, 20 och 25, licensraden 66), `rost.md` (rad 10 och 25), `kallor.md` (*Skills och metoder* och *Kända luckor*) och `guide/2-7-innehall.md`, *AI-signaturer i text*.

Förslag till Johnny: flaggan *"bara läst, ingen licens"* står kvar. I `guide/2-7-innehall.md`, *AI-signaturer i text*, står *"svenska läsare misstror superlativ"* utan bänkmärkning, fast påståendet bara har den här källan. `rost.md:10` märker det rätt.

## Passar vår stack?
Som läsning, ja. Skillen är skriven för affärstext, rapporter och LinkedIn, inte för korta webbtexter åt småföretag. Dess register och sociala medier-mönster gäller inte oss.

## Risker och flaggor
- **Ingen licens:** inga exempel, ordlistor eller ersättningstabeller återges, inte heller i översättning.
- **Hittar på fakta i sina exempel.** Den som läser exemplen som mallar lär sig att fylla i siffror och källor. Det strider mot faktakontrollen (`guide/2-7-innehall.md`, N1).
- **Regeln att tillföra åsikter** gäller inte hos oss: en åsikt som ägaren inte sagt skrivs aldrig (`rost.md:25`).
- **Ingen bevakning lönar sig** så länge repot står still; PR #1 vore värd att läsa om den slås samman.
- Ingen telemetri, betalvägg eller kod.

## Inloggning
Inget.
