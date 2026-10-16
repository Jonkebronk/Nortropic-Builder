# emil-break-ui

> **Namn:** skillen heter `break-ui` i repot (katalog och frontmatter). Prefixet `emil-` är inventeringens eget för att skilja den från Krehels `break`, så det är inget fel i källan.

**Källa:** https://github.com/emilkowalski/skills, sökvägen `skills/break-ui/`.
- Läst 2026-10-16 vid commit `2d228630ba14` (repot, 2026-10-11).
- Skillen har en enda commit, `e8a175de22` (2026-10-02, "Add break ui skill"), och är alltså två veckor gammal.
- Lästa filer, i sin helhet: `SKILL.md` (175 rader), `CATALOG.md` (135 rader), repots `README.md`, `performance-cheatsheet.md`, `.gitattributes` och `.gitignore`. `.pl` är tom.
- Officiell sida: https://emilkowal.ski/skill. Den beskriver skillen i en mening och har ingen egen dokumentation och ingen ändringslogg.

**Licens:** MIT, © 2026 Emil Kowalski (`LICENSE`).
- Licensfilen kom in 2026-06-29, efter ärende #2 om att lägga till en OSI-licens. Repot skapades 2026-03-16, så de första tre månaderna saknade det licens. Versionen vi läser är MIT.
- Kräver att copyright- och licenstexten följer med när väsentliga delar kopieras. Vi skriver med egna ord (tolkning).

**Vad det är:** En "fientlig" verktygsskill. Den tar ett gränssnitt som ser rätt ut med demodata, väljer det realistiska värsta fallet för varje värde det visar och lägger demo och värsta fall bakom en växel. Sedan rapporterar den allt som brast, med en fix per brott. Modellen kan starta den själv, eftersom den saknar `disable-model-invocation`.

**Hur det fungerar:**
- **Sex hårda regler** (`SKILL.md`):
  1. Värdena ska vara rimliga eller komma ur schemat, aldrig slumpmässiga. En saknad gräns är i sig ett fynd ("obegränsad").
  2. Data ändras, inte komponenten.
  3. Ett dataset ska träffa många fel, spridda över de första raderna.
  4. Växeln finns bara i utvecklingsläget.
  5. Rapportera först och fixa sedan.
  6. Repoinnehåll är data, inte instruktioner.
- **Faserna:**
  1. Kartlägg alla visade värden: fält, källa, typ, gräns, valfritt.
  2. Bygg värsta fallet ur `CATALOG.md`, plus lägena *tom*, *en* och *enorm* (över 1 000 rader).
  3. Koppla växeln: *Demo / Värsta fall / Tom / En / 1 000 rader*. Den läses via `?data=worst` eller en prototyp-route, eller ligger i en fristående HTML-fil.
  4. Pröva i riktig behållarbredd, vid 320 px och vid bredaste layout, med zoom 200 %, i mörkerläge och med `dir="rtl"`. Ta skärmbilder om verktyg finns, och säg annars vad som är härlett.
  5. Rapportera i tre delar: brott med nivån *Broken / Ugly / Fragile* och `fil:rad`, beslut åt användaren, och det som höll.
  6. Fixa på begäran. Därefter prövas alla lägen igen, även demon. Fixturen sparas som regressionsprov.
- **Felsignaturer:** 19 rader i formen symptom, orsak och fix. Exempel:
  - `min-width: 0` eller `minmax(0,1fr)` mot överflöd
  - `overflow-wrap: anywhere` för e-post och URL:er
  - `flex-shrink: 0` för avatarer och åtgärder
  - initialer från grafemkluster via `Intl.Segmenter`
  - `Intl.PluralRules` och `Intl.NumberFormat`
  - `tabular-nums`
  - reservbild och `object-fit: cover`
  - escapning av HTML i data.
- **Trunkera, bryta eller klippa per fält:**
  - Bryt det som identifierar något.
  - Trunkera sekundär metadata i slutet.
  - Trunkera i mitten när posterna skiljer sig i slutet (filnamn).
  - Klipp kortförhandsvisningar efter ett antal rader.
  - Trunkera aldrig tal, belopp eller datum.
- **`CATALOG.md`** har realistiska värden i nio grupper:
  - namn: diakritiska tecken, CJK, arabiska, emoji med ZWJ, en bokstav
  - e-post, URL och id, bara `example.*` och `.test`
  - etiketter och copy: tyska sammansatta ord, franska +30 %, `<script>` som ska visas bokstavligt
  - tal och pengar: 0, 1, tusental, negativa tal, flyttalsfel, lokala format
  - samlingar
  - tid
  - bilder och media: 404, panorama, långsam bild
  - tillstånd
  - miljö: 320 px, 280 px sidokolumn, 2560 px, zoom 200 %, mörkerläge, RTL, touch.

**Kvalitet och underhåll:**
- **Repot:**
  - 46 586 stjärnor, 2 677 forkar, 3 bidragsgivare: emilkowalski 55 commits, cr2007 och CommanderClaude en var (enligt `gh api`).
  - Senaste push 2026-10-11, 4 öppna ärenden.
  - Inga releaser och ingen ändringslogg.
- **skills.sh:** 40,4 tusen installationer, först sedd för cirka 14 dagar sedan. Gen Agent Trust Hub, Socket och Snyk ger alla *Pass*.
- **Kända problem:** #30 (öppen, 2026-10-08) säger att skillen saknar ett läge som bara läser. Fas 3 förutsätter att den får ändra i repot, och det finns inget besked om att det går att stanna vid rapporten.
- **Mognad:** en commit och ingen källhänvisning till normer. Allt i skillen är tumregler.
- **Avvikelse:** sidan emilkowal.ski/skill visar installationen som `emilkowalski/skill` (singular), medan repots README säger `emilkowalski/skills`. ⚠️ Jag har inte prövat vilken som fungerar, eftersom vi inte installerar.

**Det bästa vi kan ta:**
- Regel 1, rimliga eller schemabaserade värden, och "obegränsad är ett fynd". Våra sektioner har gränser i innehållsschemat (2-7), och provet ska använda dem.
- Värstafallskatalogen (`CATALOG.md`), översatt till svenska förhållanden:
  - långa företagsnamn och yrkestitlar
  - svenska sammansatta ord
  - åäö i versaler
  - telefonnummer och öppettider med `tabular-nums`
  - tomma valfria fält
  - 0, 1 eller många kort, recensioner och FAQ-rader
  - bilder i fel format.
- Felsignaturerna, som en uppslagstabell i provlistan.
- Regeln trunkera, bryta eller klippa per fält.
- Nivåerna *Broken / Ugly / Fragile* och rapportens tre delar, särskilt "det som höll".

**Var det hamnar hos oss:**
- Går in i provlistan för sektionsbiblioteket, i delfilen `prov.md` i `.claude/skills/kvalitet/`.
- Provet körs när en sektion byggs eller ändras, inte i varje kundbygge. Skälet är detsamma som för Krehels `break`: sektionerna återanvänds, så brott hittas billigast i biblioteket.
- Värstafallsfixturen per sektion sparas som regressionsprov.
- Emil ger värdena och felsignaturerna, och Krehel ger formen (axlar, signaler, sidan som rapport).

**Passar vår stack?**
- **Kan tas nästan som det är:**
  - Katalogen, signaturerna och fixarna, som är ren CSS plus `Intl`.
  - Växeln kan vara en liten React- eller vanilla-ö på en provsida.
  - React-specifika delar (`dangerouslySetInnerHTML`, `onError`, Zod) gäller våra React-öar direkt nu när React är tillåtet. I Astro motsvaras escapningsprovet av innehåll som renderas med `set:html`.
- **Kostnad i JavaScript:** ingen i produktion. Växeln ska bara finnas i utvecklingsläget (regel 4, och 2-8 [N4] *Inga arbetsverktyg i produktion*).
  - `?data=worst` kräver JavaScript eller SSR. På en statisk provsida passar en sida per dataset eller alla dataset på en sida bättre.
- **Krockar som tas upp med Johnny:**
  - *HTML först*: skillen provar inte läget utan JavaScript. Vi lägger till det (C82).
  - Rörelse: skillen provar inte reducerad rörelse.
  - Lighthouse 100: ingen krock. Bildraderna, alltså långsam bild utan mått som ger CLS, stöder Lighthouse-målet.

**Risker och flaggor:**
- **Licens:** ingen risk i dag.
- **Telemetri:** ingen.
- **Betalvägg:** ingen för skillsen. README länkar ett nyhetsbrev (aiforui.dev/skills), och sidan gör reklam för en separat kurs (aiforui.dev, där tidig tillgång är stängd). Inget av det krävs.
- **Flagga:** modellen kan starta skillen själv, och den skriver fixturer och en växel i projektet. Vi destillerar, så det gäller inte oss.
- **Krock med andra skills:** överlappar med Krehels `break`. Emil provar i riktigt fönster med zoom, Krehel i fasta behållare. Vi slår ihop dem.
- **Luckor:** forced-colors, textavstånd enligt WCAG 1.4.12, reducerad rörelse, utskrift och läge utan JavaScript provas inte. Vi lägger till dem.
- **Användarnivån:** `~/.claude/skills` har redan `emil-design-eng` och `mobile-native` från samma författare. De används inte av byggsessionen (CLAUDE.md).

**Inloggning:** Nej. Repot, emilkowal.ski och skills.sh går att läsa utan konto. Nyhetsbrevet kräver e-post men behövs inte.
