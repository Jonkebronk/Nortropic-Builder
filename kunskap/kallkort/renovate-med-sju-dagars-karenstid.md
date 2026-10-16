# Renovate med sju dagars karenstid

**Källa:**
- Renovates dokumentation, läst 2026-10-16:
  - *Minimum release age* (docs.renovatebot.com/key-concepts/minimum-release-age/)
  - *Config presets* (/presets-config/)
  - *Mend-hosted* (/mend-hosted/overview/)
- renovatebot/renovate, HEAD `b8f6dbb8` (2026-10-16), version 44.164.10.
- npm, *config* (`min-release-age`).
- Woodruff, *We should all be using dependency cooldowns* (2025-11-21), via anteckningarna för lager 9 ⚠️ (inte omläst i dag).

**Licens:**
- Renovates kod är AGPL-3.0. Den som ändrar koden och erbjuder den som nättjänst ska lämna ut källkoden.
- Vi använder Mends hostade app och ändrar ingen kod. AGPL berör troligen inte oss ⚠️ (inget uttalande hittat).
- Dokumentationen ligger i samma repo.

**Vad det är:** En bot som öppnar uppdaterings-PR:er för beroenden i många repon med en gemensam policy, ett delat preset. Med `minimumReleaseAge` väntar den tills en version är så gammal att en kapad release hunnit upptäckas.

**Hur det fungerar:**
- **Karenstid:**
  - `minimumReleaseAge` gäller per version.
  - Säkerhetsuppdateringar går förbi den.
  - `internalChecksFilter` ska vara `strict` (standard), så att ingen gren skapas medan kontrollen `renovate/stability-days` väntar.
  - Från version 42 räknas en version utan tidsstämpel som för ny. I äldre versioner krävs `minimumReleaseAgeBehaviour: "timestamp-required"`.
- **Både Renovate och pakethanteraren:**
  - Dokumentationen rekommenderar karenstid på båda ställena.
  - För npm skickar Renovate `--before=<datum>` och läser `min-release-age` i `.npmrc`. Det strängaste värdet gäller.
  - npm:s `min-release-age` räknas i dagar. Den kom i npm 11.10.0 ⚠️ (sekundärkällor).
- **Presets:**
  - `config:best-practices` bygger på `config:recommended` och lägger till pinnade digests för Docker och GitHub Actions, `:configMigration`, `:pinDevDependencies`, `abandonments:recommended`, `:maintainLockFilesWeekly` och `security:minimumReleaseAgeNpm`.
  - Det senare väntar bara **tre** dagar.
  - Ett delat preset refereras som `github>org/repo`.
- **Mend-appen:**
  - Gratis för obegränsat antal publika och privata repon.
  - Kör var fjärde timme, ett jobb åt gången per organisation, med 30 minuters tidsgräns.
  - Merge Confidence ingår inte i gratisnivån.

**Kvalitet och underhåll:**
- 22 768 ★, 27 867 commits, cirka 1 869 författare i git-loggen.
- 4 175 commits sedan årsskiftet. Releaser flera gånger om dagen.
- Projektet styr frågor till GitHub Discussions, så ärendelistan visar inte kända problem ⚠️.
- Ändringar i oktober rör versionsuppslag och nedgraderingsskydd.

**Det bästa vi kan ta:**
- Byråns preset:
  - `extends: ["config:best-practices"]`
  - `minimumReleaseAge: "7 days"`
  - tidszon `Europe/Stockholm`
  - gruppering av uppdateringar utom major
  - major som normal ändring
  - ingen automatisk sammanslagning tills vidare
- I sajten: `min-release-age=7` i `.npmrc`.
- Skälet: Woodruff fann att åtta av tio granskade leveranskedjeattacker var aktiva kortare än en vecka (`guide/2-9-drift-och-forvaltning.md`).

**Var det hamnar hos oss:**
- Skillen `drift`, `andringar.md` (*Uppdateringspolicyn*). Regeln står redan i 2-9.
- Presetet läggs i ett byråns repo och `renovate.json` i `mallar/sajt/` vid första kundrepot [N3].
- Beslut: **skill: drift**.

**Passar vår stack?** Ja. npm och GitHub. Bygget installerar ur låsfilen, så karenstiden verkar där låsfilen ändras: hos Renovate och när en agent kör `npm install`. Workers Builds har npm 10.9.2, som inte läser `min-release-age`, men det spelar ingen roll när låsfilen är given.

**Risker och flaggor:**
- AGPL, se ovan.
- Mend-appen får skrivrätt i kundrepona, och det är Johnny som installerar den.
- Gruppering kan låta en trasig uppdatering blockera hela gruppen (Renovate, *Noise reduction*, via anteckningarna).
- Automatisk sammanslagning är öppen (`guide/bilaga-e-oppna-fragor.md`, fråga 2.8).
- `config:best-practices` ger tre dagars karenstid, inte sju. Utan ett eget värde blir det fel.

**Inloggning:**
- Dokumentationen är publik och läst.
- Mend-appens instrumentpanel och Dependency Dashboard i ett repo syns bara inloggad.
- Johnny installerar GitHub-appen i organisationen.
