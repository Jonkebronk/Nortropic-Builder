# emil-write-swift

**Källa:** https://github.com/emilkowalski/skills, sökvägen `skills/write-swift/`. Jag läste den 2026-10-16 vid commit `2d22863` (repot, 2026-10-11). Skillen ändrades senast i `85e8e23` (2026-09-15).

Lästa filer: `SKILL.md` (396 rader). Jag läste inledningen, avsnitt 1, 3 (samtidighet och actorer), 9 (prestanda), 16 (migrering) och snabbreferensen och gick igenom alla rubriker. Skillen har inga delfiler.

**Licens:** MIT, © 2026 Emil Kowalski. Licenstexten följer med om text kopieras.

**Vad det är:** en skill för modern Swift (6.3, med markerade funktioner från 6.4): värdetyper, datakapplöpningssäkerhet och samtidighet enligt Swift 6.2, protokoll och generics, API-design, prestanda och ARC, Swift Testing, makron och migrering till Swift 6.

**Hur det fungerar:**
- **Genomgående princip:** börja med det enklaste, mest statiska och mest enkeltrådiga, och köp dynamik (samtidighet, referenser, existentials, osäkra pekare) bara där skälet går att peka på.
- **En tabell med standardval** (struct eller enum, konkret typ, `some P`, main actor och synkront, `Array`, säkra API:er) och när man flyttar ett steg ned.
- **Samtidighet i ordning:** main actor, `async`/`await`, `@concurrent` efter profilering och `actor` sist. *"Approachable Concurrency"* och main actor som standard för appmoduler.
- **Prestanda:** algoritmen först, sedan Instruments. `final`, `InlineArray` och `Span` när mätningen motiverar det.
- **Migrering till Swift 6 per mål,** från UI-lagret och nedåt, och aldrig tillsammans med en stor omskrivning.

**Kvalitet och underhåll:**
- Repot har 46 586 stjärnor och omkring 3 bidragsgivare. Inga ärenden om `write-swift`.
- Skillen hänvisar till Swift Evolution-förslag (till exempel SE-0460, SE-0504) och till swift.org/migration.
- ⚠️ Uppgifterna om versioner (*"Swift 6.3 … current release as of August 2026"*) är inte kontrollerade, eftersom de saknar betydelse för oss.

**Det bästa vi kan ta:** ingenting för sajterna. Den allmänna principen att börja enkelt och lägga till komplexitet bara med ett skäl finns redan i guiden (`guide/README.md`, princip 8; Galls lag i `historik/webb-pro.md`).

**Var det hamnar hos oss:** ingenstans (`släpp`). Nortropic skriver ingen Swift.

**Passar vår stack?** Nej. Det här är Swift för Apples plattformar.

**Risker och flaggor:**
- Ingen telemetri i skillen. Installation via `npx skills add` har telemetri, avstängbar med `DISABLE_TELEMETRY=1`.
- Ingen betalvägg och ingen inloggning.
- Krockar: inga.
