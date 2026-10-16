# better-variant

**Källa:** https://github.com/jakubkrehel/skills, sökvägen `skills/variant/`. I repot heter skillen `variant`.
- Läst 2026-10-16 vid commit `4c66b1f` (2026-10-12).
- Skillen ändrades senast i `8337ed0` (2026-10-11, "give the variant picker the same grouped list"). Mappen har 13 commits.
- Lästa filer: `SKILL.md` (117 rader), `picker.md` (205), `agents/openai.yaml`, samt `AGENTS.md`, där det står att `picker.md` och state-machines `switcher.md` är samma text med bytt substantiv.

**Licens:** MIT, © 2026 Jakub Krehel. Licenstexten följer med vid kopiering.

**Vad det är:**
- En arbetsmetod (user-invoked, `disable-model-invocation: true`) som bygger tre varianter av en del av gränssnittet. Varianterna läggs bakom en väljare på den riktiga sidan, och sedan väljer användaren.
- Skillen rangordnar aldrig varianterna och äger inga domänregler.

**Hur det fungerar:**
- **En del per körning.** "The dashboard" är ingen del, ett mätvärdeskort är det. Briefen formuleras om i en mening.
- **En primär axel.** Structure, Density, Emphasis, Type eller Voice. Varje variant får en egen position på axeln och ett namn som "Quiet", "Editorial" eller "Dense", aldrig "Option A". Tre är standard, högst fem.
- **Golvet** är lika för alla varianter och är ingen axel. Det har elva punkter:
  - namn och synligt fokus
  - tangentbord
  - `prefers-reduced-motion`
  - inget klipps vid 320 px eller 200 % zoom
  - kontrast
  - inget bärs av färg ensam
  - destruktiva handlingar skyddas
  - avkortat innehåll går att nå
  - dolt innehåll har en ledtråd
  - fel anger en väg vidare
  - semantiska färger används rätt
- **På riktig sida med riktigt innehåll** och det antal poster sidan verkligen har. En variant visas i taget i full storlek.
- **Väljaren.** URL-param `?__variant=`, piltangenter, `H` döljer, och den är medvetet stylad utanför designsystemet (mörk yta, systemtypsnitt).
- **Överlämning.** En tabell med kolumnerna "Right when" och "Costs", utan favorit. Varianterna bedöms både vid 375 och 1440 px.
- **Efter valet.** Den valda varianten byggs ordentligt, resten raderas, och man söker efter rester av namn och param.

**Kvalitet och underhåll:**
- Samma repo som better-layout: 7 968★, 2 bidragsgivare, aktivt.
- Issue #38 och #39 (stängda) gällde att väljaren behöver monteras på toppnivå.
- Inga öppna ärenden rör variant.

**Det bästa vi kan ta:**
- Golvet (`SKILL.md`, *The floor every variant clears*) som inträdeskrav för varje sektionsvariant i biblioteket.
- Axeltabellen (*Different answers, not different tints*) för att hålla 2–3 sektionsvarianter verkligt olika.
- Kravet på riktigt innehåll och verkligt antal poster.
- Överlämningstabellen utan favorit, som passar Johnnys "se och döma".

**Var det hamnar hos oss:**
- `bibliotek`: metoden används när sektionsbiblioteket byggs, alltså 2–3 varianter per sektion på en namngiven axel med golvet som krav.
- Golvet blir en del av bibliotekets kontroll.
- Väljaren hör till byggverktyget och följer aldrig med till kundsajten.

**Passar vår stack?** Reviderat efter BESLUT 2026-10-16, *React, Tailwind och JavaScript tillåts*.
- Ja, och nu bättre än förut.
- Varianterna får vara React-komponenter med Tailwind eller Motion, och skillens "guarded import" och URL-väljare fungerar som de är på en förhandsvisningssida i biblioteket.
- Väljaren skeppas inte, så den kostar 0 kB på kundsajten.
- Varianten själv kostar det den drar in:
  - 0 kB om den renderas till HTML utan `client:`-direktiv.
  - Cirka 56 kB gzip för React-körtiden om den är den första ön på sidan, enligt bejamas/ui-benchmarken. ⚠️ Det är en enda mätning.
  - 43 kB för Motions `motion`-komponent, eller drygt 5 kB + 24 kB med `m`/`LazyMotion`/`domAnimation` ([motion.dev](https://motion.dev/docs/react-reduce-bundle-size)).
- **Förslag:** lägg till JavaScript i kB per sida i överlämningstabellens kolumn "Costs", och "fungerar med JS av" i golvet.
- En variant som krockar med Lighthouse 100, *HTML först*, text som börjar osynlig eller rörelsereglerna märks i tabellen och tas upp med Johnny. Den stoppas inte.

**Risker och flaggor:**
- Dubblett av Emils prototype (se det kortet). Välj en.
- Skillen skriver kod som ska slängas. Rester av harnessen (`__variant`) får inte hamna i kundsajten, så det behövs en kontroll som söker efter `__variant` före leverans.
- Ingen telemetri och ingen betalvägg.

**Inloggning:** behövs inte.

**Slutligt förslag (skelett-struktur-beslut.json, 2026-10-16):** `skill: skelett` i stället för `bibliotek`: axeln, riktigt innehåll och variantgolvet är destillerade i `.claude/skills/skelett/varianter.md`, och det är biblioteksarbetet som använder dem. Väljaren stannar i provsidan.
