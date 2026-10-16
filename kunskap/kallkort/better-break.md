# better-break

> **Namnfel i inventeringen:** skillen heter `break` i repot, inte `better-break`.
> - Katalog, frontmatter och `display_name` ("Break") säger alla `break`.
> - Historiken har inget `skills/better-break` (0 commits via API).
> - Prefixet `better-` används bara för domänskills. `break` är en procedurskill som användaren startar själv (`AGENTS.md`).

**Källa:** https://github.com/jakubkrehel/skills, sökvägen `skills/break/`.
- Läst 2026-10-16 vid commit `4c66b1fa86e9` (repot, 2026-10-12).
- Senaste ändringen i skillen är `69e88f6e6c` (2026-10-06). Skillen har 11 commits sedan 2026-08-24.
- Pluginet `interfaces` har version 1.13.2. Det finns ingen ändringslogg.
- Lästa filer, i sin helhet: `SKILL.md`, `scenarios.md`, `agents/openai.yaml`, repots `README.md` och `AGENTS.md`.

**Licens:** MIT, © 2026 Jakub Krehel. Copyright- och licenstexten ska följa med om väsentliga delar kopieras. Vi skriver med egna ord (tolkning).

**Vad det är:** Ett verktyg i form av en skill. Den tar *en* komponent och renderar den på en tillfällig sida, en gång för varje scenario som kan nå den. Sidan är själva rapporten: alla scenarier ligger i en kolumn med etiketter, och det som brast är markerat. Skillen observerar och dömer inte, och den startas bara av användaren.

**Hur det fungerar:**
1. **En komponent per körning.** "Inställningssidan" räknas inte som komponent. Komponenten beskrivs med en mening.
2. **Scenarier väljs efter signal** (`scenarios.md`). En axel tas bara med om komponenten kan ta emot den formen i produktion, och bortvalda axlar redovisas på en rad. Axlarna:
   - innehållslängd (tomt, ett ord, typiskt, flera meningar, en obrytbar sträng)
   - innehållsform (emoji, RTL, blandad riktning, diakritiska tecken, siffror som ska linjera)
   - antal (0, 1, realistiskt, 10×)
   - behållare (320 px, klämd av syskon, mycket bred; används alltid)
   - tillstånd (laddar, fel, inaktiv)
   - miljö (mörkerläge, zoom, reducerad rörelse; användaren slår på dem själv).
3. **Testsidan** importerar den riktiga komponenten orörd. Sidan lägger bara till etiketter, behållarbredder och fixturer, inga egna typsnitt, teman eller sonder. Produktionen importerar aldrig från testsidan.
4. **En laddning och en titt.** Bara synliga fel räknas, och en förutsägelse är inget fynd. Finns ingen webbläsare lämnas URL:en över utan fynd.
5. **Rapport:** en tabell med *scenario, observerat och ägande skill*. "Allt höll" är också en rapport. Skillen fixar inget oombedd.
6. **Sidan står kvar** tills användaren säger annat, och tas sedan bort helt.

**Kvalitet och underhåll:**
- **Repot:** 7 968 stjärnor och 2 bidragsgivare (enligt `gh api`).
- **skills.sh:** 11,7 tusen installationer, först sedd 2026-08-24.
- **Säkerhetsgranskning:** Gen Agent Trust Hub *Warn* (MEDIUM, 2026-10-06), Socket *Pass*, Snyk *Pass*. Varningen gäller tre saker:
  - skillen skapar kod som körs (testsidan)
  - otrygg data (CMS, API) används orörd i scenarierna
  - skillen skriver filer i projektet.
- **Kända problem:**
  - #29 och #37 (stängda 2026-09) föreslog att Next-sidan ska ligga på serversidan som standard.
  - ⚠️ Dagens `SKILL.md` föreskriver ändå fortfarande `"use client"` för sidan. Ärendet stängdes alltså utan att texten ändrades, enligt min läsning av main.

**Det bästa vi kan ta:**
- Axlarna med sina signaler (`scenarios.md`). Att välja axlar efter signal och redovisa de bortvalda gör provet billigt och granskningsbart.
- Reglerna för testsidan: den riktiga komponenten, inget eget tema, ingen förutsägelse som fynd, en laddning (`SKILL.md` §3–4).
- Sidan som rapport. Johnny kan bläddra och döma själv, vilket passar *varje steg ger något Johnny kan se*.
- Tabellen med *ägande skill*. Varje brott pekar på regeln som rättar det, hos oss en delfil i `kvalitet`.

**Var det hamnar hos oss:**
- Går in i provlistan för sektionsbiblioteket, i delfilen `prov.md` i `.claude/skills/kvalitet/`.
- Provet körs när en sektion byggs eller ändras, inte i varje kundbygge. Kundbyggen återanvänder provade sektioner, så det är där brotten lönar sig att hitta.
- Hela proceduren är för dyr att köra per sajt, men kostar lite per sektion.
- Emils `break-ui` ger värstafallsvärdena, och den här skillen ger formen: axlar, signaler och sidan som rapport.

**Passar vår stack?**
- **Kan tas nästan som det är:**
  - Proceduren och axlarna.
  - Testsidan blir en Astro-sida som renderar biblioteksektionen med fixturer.
  - React-sektioner kan renderas till HTML vid bygget. Bara sektioner med interaktion behöver `client:visible` på testsidan.
  - "`use client` i Next" gäller inte oss.
- **Kostnad i JavaScript:** ingen i produktion. Testsidan får inte nå produktionsbygget, enligt 2-8 [N4] *Inga arbetsverktyg i produktion*, där en kontroll söker efter verktygets markering.
- **Viktig begränsning:** skillen ger bredderna som fasta behållare och ändrar aldrig visningsfönstret. Fasta behållare triggar container queries men inte `@media`.
  - En sektion som byter layout med mediafrågor ser alltså inte ut som på mobil i en ruta på 320 px.
  - Antingen skrivs sektionerna med container queries, eller så prövas 320 px i ett riktigt fönster eller en iframe.
  - Det är min slutsats om hur CSS fungerar. Källan säger det inte.
- **Krockar som tas upp med Johnny:**
  - *HTML först*: skillen provar inte läget utan JavaScript. Vi lägger till det (kontroll C82).
  - Rörelse: miljöaxeln har reducerad rörelse. Det stämmer med 2-6.
  - Lighthouse 100: ingen krock.

**Risker och flaggor:**
- **Licens:** ingen risk.
- **Telemetri:** ingen.
- **Betalvägg:** ingen.
- **Flagga:** skillen skriver filer och skapar sidor i projektet (Gen-varningen). Hos oss ska testsidan märkas och stoppas från produktionsbygget.
- **Krock med andra skills:** överlappar med Emils `break-ui`. Krehels skill isolerar komponenten och visar alla scenarier på en sida. Emils byter data bakom en växel och provar i riktigt fönster. Vi tar båda till en gemensam provlista.
- **Luckor i källan:** inga prov för forced-colors (högkontrast), textavstånd enligt WCAG 1.4.12, utskrift eller läge utan JavaScript. Vi lägger till dem.

**Inloggning:** Nej. Inget konto behövs, och inget har krävt inloggning.
