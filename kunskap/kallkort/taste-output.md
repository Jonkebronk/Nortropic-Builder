# taste-output

**Källa:** https://github.com/Leonxlnx/taste-skill, sökvägen `skills/output-skill/SKILL.md`, installationsnamnet `full-output-enforcement`. Läst 2026-10-16 vid HEAD `f624f37a8c65` (2026-10-14). Mappen ändrades senast i `3206dd44fce9` (2026-03-20). Uppströms `SKILL.md` (49 rader) hämtades till `kallor/taste-output/` och jämfördes byte för byte med webb-pros kopia i `.claude/skills/taste-output/` (identisk). Lästa också: kopians `KALLA.md` och `LICENSE` och repots hela `README.md`. Webb-pros kopia: 1 commit (`31a1cc0`, 2026-10-05). Inventeringen: B53, **2 krockar, 1 hög**: K46 (hög) och K11 (medel) (webb-pro `kunskap/skillkrockar.md:49`, `:101`, `:143–146`).
**Licens:** MIT, © 2026 Leonxlnx. Licenstexten följer med vid kopiering; vi destillerar och citerar.

## Vad det är
En kort skill mot att modellen lämnar halvfärdigt arbete. Den förbjuder platshållare i kod och prosa, kräver alla leveranser och delar upp långa svar vid en ren brytpunkt. README beskriver den som "For when the model ships half-finished work" och säger att den ska läggas till "when the agent keeps cutting its output short". Den gör ingen design.

## Hur det fungerar
- **Förbjudna mönster** (SKILL.md, *Banned Output Patterns*): i kod `// ...`, `// TODO` och `// similar to above`; i prosa "for brevity" och "Let me know if you want me to continue"; strukturellt ett skelett i stället för en implementation, bara första och sista delen, eller en beskrivning i stället för kod.
- **Tre steg** (*Execution Process*): räkna leveranserna och lås talet, bygg varje del helt, och jämför sedan antalet med beställningen före svaret.
- **Långa svar** (*Handling Long Outputs*): skriv i full kvalitet till en ren brytpunkt och avsluta med `[PAUSED — X of Y complete. Send "continue" to resume …]`.
- **Snabbkontroll** före svaret: inga förbjudna mönster, allt beställt finns, koden går att köra och inget är förkortat.

## Kvalitet och underhåll
- Repot: 97 729 stjärnor, MIT, ett öppet ärende, senaste push 2026-10-14, 20 bidragsgivare (`gh api`, 2026-10-16). Skillen själv har stått orörd sedan 2026-03-20 och är en av repots åtta skills "for a specific job" (README, *Skills*).
- **Kända problem:**
  - [#76](https://github.com/Leonxlnx/taste-skill/issues/76) (stängt 2026-10-13): installationsskriptets nyckel `output-skill` stämde inte med README:ns namn `full-output-enforcement`.
  - [#106](https://github.com/Leonxlnx/taste-skill/issues/106) (stängt 2026-10-11): en användare frågar hur agenten tvingas att följa en taste-skill till 100 %, eftersom prompten "is totally useless". Ett exempel på att en skill med förbud inte är en grind.
  - Inga ärenden om just output-skill hittades (`gh search issues`, "output" och "full-output-enforcement").
- Repot säljer också en skrivbordsapp och har sponsorlänkar i README. Skillen innehåller inget av det.

## Det bästa vi kan ta
1. **Räkna leveranserna och jämför före "klart"** (*Execution Process*, steg 1 och 3). Samma idé finns redan i guiden: *inget släpps tyst* i `progress.md` (`3-1`, N1) och täckningstabellen (`3-2`, N2). Inget nytt.
2. **Listan över prosa som döljer utelämnat arbete** ("the rest follows the same pattern", "and so on") som sökord när granskaren läser en sammanfattning. Ett marginellt tillskott.

Inget annat är värt att ta. Den förbjuder TODO-markörer, medan vi kräver markerade platshållare för det som saknas (`2-7`, N1, `[[PLATSHÅLLARE: …]]`). Och fortsättningen med "Send continue" förutsätter en människa som svarar.

## Var det hamnar hos oss
**Släpp** – håller med förslaget, med en precisering av skälet. N1-kontroll 6 fångar *innehållsplatshållare* i produktionsbygget (`[[PLATSHÅLLARE]]`, lorem ipsum, märkta bilder; `2-8`, tabellen, rad 6). Den fångar inte utelämnad *kod*. Det gör i stället att bygget går igenom, kontrollskriptet och belägget för varje påstående (`3-1`, *Belägg och status*). Den första övningssajten visar inga tecken på avkortat arbete. En sökning 2026-10-16 gav noll träffar: på TODO, "halvfärdig" och "ofullständig" i genomgången, `progress.md` och kvalitetsgranskningen, och på `// TODO` och `// ...` i `src/`. Enligt `guide/3-4` lyfts en regel in först när en verklig sajt visar behovet (princip 8), och förbud för äldre modeller rensas när mätningen visar det (*Rensning vid ny modell*).

## Passar vår stack?
Skillen är oberoende av ramverket. Inget behöver översättas, men inget behövs heller.

## Risker och flaggor
- **K46 (hög):** "Send 'continue' to resume" stoppar en körning som ingen svarar på. I N1 tittar Johnny, men i N2 och senare stannar en delagent.
- **K11 (medel):** förbudet mot `// TODO` och platshållare krockar med huvudskillen taste (:272), som föreskriver märkta platshållare, och med vår regel att det som saknas markeras.
- **Förväxling:** npm-paketet "taste-skill" kommer från en annan upphovsperson. Installera bara från den exakta repoadressen (`bilaga-a-verktyg.md`, *Installera inget ogranskat*).
- **Ton:** versaler och "No exceptions" är den sortens tvingande text som `guide/3-4` och Anthropics råd vill ersätta med ett skäl (`larande/skills.md`, *Förklara varför*).
- Telemetri, betalvägg och inloggning: inga i skillen.

## Inloggning
Inget.
