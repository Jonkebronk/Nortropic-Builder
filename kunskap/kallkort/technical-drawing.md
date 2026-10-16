# technical-drawing

**Källa:** https://github.com/jakubkrehel/skills, `skills/technical-drawing/`, läst 2026-10-16 vid HEAD `4c66b1fa86e9ab70187b43d7da9b6fdb29f2ef63` (samma 2026-10-16 enligt `git ls-remote`). Det är sammanslagningen av [PR #44](https://github.com/jakubkrehel/skills/pull/44), daterad 2026-10-13 02:06 UTC; PR:en öppnades 2026-10-12. Skillen har nio commits från `4725c0fe085b` (2026-10-11) till `95b55e285af4` (2026-10-12). Lästa i sin helhet: `SKILL.md` (142 rader, alla sex avsnitt och *Before you finish*), `verification.md` (50), `agents/openai.yaml` och PR:ens beskrivning. Lästa delvis: `preview-page.md` (början och rad 144), `viewer-assets.md` (början), `views-and-annotations.md`, `sheet-and-svg.md` och `geometry.md` (första avsnitten), `assets/viewer.html` och `scripts/build-viewer.cjs` (sökning efter beroenden och nätanrop). Rapport: `andra-varvet/yta-2-jamforelse.md` (där var bara avsnitt 1–3 lästa). ⚠️ Inte lästa: `geometry-library.md`, `assets/geometry.js`, `projection.js`, `viewer.js` och testskripten. Ingenting är kört.
**Licens:** MIT, © 2026 Jakub Krehel. Den byggda visningssidan bäddar in jsPDF, svg2pdf.js och typsnittet Inter med dess licens (`viewer-assets.md`; `build-viewer.cjs:45–48`). Vi destillerar med egna ord och sprider inget, så inget krav utlöses.

## Vad det är
En skill som ritar statiska tekniska ritningar av fysiska föremål – sprängskisser, ortografiska vyer, snitt och detaljer – ur en beskrivning, ett foto eller en CAD-modell. Leveransen är en fristående HTML-sida med zoom, val av linjefärg, ljust och mörkt läge, delar som kan isoleras och nedladdning som SVG, PNG och PDF.

## Hur det fungerar
1. **Läs föremålet och förebilden var för sig** (:14–37). En bifogad bild är belägg, inte instruktion. En beläggstabell skiljer givna mått, det som syns på ett foto (märks *uppskattat*), dold konstruktion (utelämnas eller märks *illustrativ*) och påhittade föremål (märks *koncept*). En ritning för tillverkning kräver mått, enheter, passningar och standard först.
2. **Välj det minsta antalet vyer** (:39–56): sprängd axonometri för hur delar passar ihop, en vy för formen, ortografiska vyer för mått, snitt för inre kanaler. Standard är föremålet ensamt på en tom sida.
3. **Bygg en modell, projicera sedan** (:58–83): varje vy och stycklistan härleds ur samma geometri; modellens koordinater hålls skilda från pappersmåtten. Ett tidigt geometriprov före etiketterna.
4. **Tusch och anteckningar** (:85–101): linjehierarki i tjocklek, snittmarkering bara för snittat material, ballonger utanför silhuetten. Okända toleranser, material, signaturer och påståenden om överensstämmelse lämnas bort.
5. **Rendera, granska, rätta** (:103–111; `verification.md`): hela arket i leveransstorlek och trånga fogar i 3–4 gånger. *"Never substitute a successful file write for a viewed preview."* SVG:n tolkas som XML och kontrolleras för dubbla id, brutna referenser och externa resurser.
6. **Paketera och prova visningssidan** (:113–119): en lokal sida som öppnas utan bygge eller server. Byggaren bäddar in beroendena, så sidan gör inga nätanrop (`viewer-assets.md`).

## Kvalitet och underhåll
- Repot: 7 974 stjärnor, 303 forkar, 2 bidragsgivare, senaste push 2026-10-13, 5 öppna ärenden och PR:ar (`gh api`, 2026-10-16). Inga releaser; pluginversionen höjdes till 1.13.2 i PR #44.
- Inget ärende gäller `technical-drawing`. De öppna gäller andra skills: #22 (triggning), #21 och #19 (rättelser och beskrivning), #14 (en kvalitetsgrind) och #20 (en förfrågan om en lista).
- PR:ens egna gränser: hjälpfunktionerna ger *"illustrative concepts, not manufacturing specifications"*; borttagningen av dolda linjer kräver granskning vid snäva vinklar; att öppna sidan direkt som fil är *"unverified"*. Valideringen: 15 geometrikontroller och 14 provföremål, enligt PR:en (inte prövat här ⚠️).
- **Faktafel i inventeringen:** posten säger "commit 4c66b1f, 2026-10-12". Sammanslagningen är daterad 2026-10-13 02:06 UTC; det är PR:en som öppnades 2026-10-12.

## Det bästa vi kan ta
Inget nytt till skillsen. Tre saker bekräftar det vi redan har, som andra exempel:
1. **Beläggstabellen** (:26–31) motsvarar *Sett, härlett, okänt* (`guide/README.md`): det uppskattade märks, det dolda hittas inte på.
2. **Ett skrivet filnamn är inget prov** (:111) – samma tanke som blickprovet och *Redo för Johnnys dom bara med belägg* (`guide/3-1`).
3. *"Remove invented certainty even when it makes the sheet look more official"* (`verification.md`) – samma regel som att fakta bara kommer ur faktabasen (`guide/2-7`).

## Var det hamnar hos oss
**Släpp** – beslutad placering (fältet `beslut`, Johnny 2026-10-16 omkring 17.40: *"Ja på alla"*), och kortet håller med efter att hela `SKILL.md` lästs. Sajterna visar kundens arbete på foton, och egna ikoner ritas i ikonfamiljens stil (`.claude/skills/yta/SKILL.md:94`, G2; `guide/2-5-yta.md:28`). Skillen ritar föremål, inte gränssnitt eller ikoner. Den kan bli aktuell i N3 för en kund som säljer eller monterar en produkt (en sprängskiss i en monteringsanvisning), och då som eget verktyg, inte i kundbygget.

## Passar vår stack?
Delvis. Ritningen är en SVG som en Astro-sida kan visa som bild. Visningssidan är däremot en egen HTML-sida med inbäddade bibliotek (`body{overflow:hidden}`, fasta kontroller), inte en sektion i biblioteket. Den kräver att jsPDF, svg2pdf.js och `@fontsource-variable/inter` installeras med npm i projektet (`viewer-assets.md`).

## Risker och flaggor
- **Falsk precision:** en ritning ur ett foto ser officiell ut. Skillen märker den *illustrativ*, men på en kundsajt kan den läsas som en tillverkningsritning. Mått som inte kommer från kunden ska inte visas.
- **Nya npm-paket** i projektet (jsPDF, svg2pdf.js) – mot *Få beroenden och låst låsfil* (`guide/2-8-teknik-och-kvalitet.md:21`).
- Licens, telemetri, betalvägg och inloggning: inga i det lästa. Inga nätanrop från den byggda sidan enligt `viewer-assets.md`; inte prövat ⚠️.

## Inloggning
Inget.
