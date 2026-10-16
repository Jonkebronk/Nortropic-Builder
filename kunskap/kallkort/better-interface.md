# better-interface

**Källa:** https://github.com/jakubkrehel/skills, sökvägen `skills/better-interface/`.
- Läst 2026-10-16 vid commit `4c66b1fa86e9` (repot, 2026-10-12). Senaste ändringen i skillen är `da5f6d5974` (2026-10-05). Skillen har 29 commits sedan 2026-07-24.
- Pluginet `interfaces` har version 1.13.2. Det finns ingen ändringslogg och inga releaser.
- Lästa filer, i sin helhet: `SKILL.md`, `review-format.md`, `agents/openai.yaml`, repots `README.md` och `AGENTS.md` (ägartabellen och anropsreglerna).
- Syskonskillsen som den skickar vidare till: `better-accessibility` (läst i sin helhet), `better-layout`, `better-typography`, `better-ui` och `better-colors` (bara SKILL.md) samt `better-writing` (⚠️ inte läst, eftersom den har ett eget kort).
- Officiell sida: https://jakub.kr/skills. Där beskrivs skillen i en rad.

**Licens:** MIT, © 2026 Jakub Krehel. Licensen kräver att copyright- och licenstexten följer med vid kopiering av väsentliga delar. Vi skriver med egna ord, så kravet utlöses inte (tolkning).

**Vad det är:** En samordnande granskningsskill. Den kör de sex domänskillsen i fast ordning: tillgänglighet, layout, text, typografi, färg och UI-finish. Sedan slår den ihop fynden till en rankad dom. Egna domänregler har den inga. Den äger metoden: avgränsning, bevis, gemensam skala, utlösare, konsolidering, tak och dom.

**Hur det fungerar** (`SKILL.md`, tio principer):
1. **Avgränsning först.** Täck tomma lägen, laddning, fel och smal bredd. Är omfånget för stort snävas det in till ett flöde, och det som lämnades utanför redovisas.
2. **Ändringar** (gren, PR, diff) skickas till `interface-review`, som bara användaren kan starta.
3. **Rekognosering.** Ramverk, stilsystem, tokens och projektets egna dokument (`AGENTS.md`, `CLAUDE.md`, designsystem) kartläggs. En dokumenterad konvention avgör smakfrågor men ursäktar aldrig en utlösare.
4. **Domänskillsen är sanningskällan.** Saknas en skill blir domänen *Not reviewed*. Reglerna återskapas aldrig ur minnet.
5. **Bevis.** Varje fynd anges med `fil:rad`. Ett påstående om rendering kräver renderad vy, och ett påstående om kod kräver kod.
6. **Gemensam skala** (HIGH, MEDIUM, LOW) och **13 utlösare som alltid blir HIGH:**
   - kontroll utan namn
   - fokus som inte syns
   - pekarväg utan motsvarande tangentbordsväg
   - rörelse som ignorerar reducerad rörelse
   - klippning vid 320 px eller 200 %
   - textkontrast under gränsen
   - betydelse som bara bärs av färg
   - destruktiv handling utan bekräftelse eller ångra
   - trunkering utan väg till hela texten
   - dolt innehåll utan synlig ledtråd
   - felmeddelande utan väg vidare
   - semantisk färg mot sin betydelse
   - tillstånd som bara visas med rörelse.
7. **Billigaste fixen först:** ta bort, plattformen, återanvänd, rätta värdet, lägg till.
8. **En grundorsak blir ett fynd** med alla platser. Högst 15 fynd, utan utfyllnad.
9. **Verifiera det som går.** Det som inte kunde verifieras blir *Not verified*, inte ett fynd.
10. **Skrivskyddat** som standard.

`review-format.md` lägger till:
- en täckningstabell per domän med *Clear* eller *Not reviewed*
- en gemensam fyndtabell med kolumnerna Severity, Domain, Location, Before, After och Why
- en lista över verifieringar
- domen *Block* eller *Approve*, där *Approve* bara gäller de domäner som faktiskt granskats.

**Kvalitet och underhåll:**
- **Repot:** 7 968 stjärnor, 2 bidragsgivare, aktivt underhåll. Källa: GitHubs API via `gh api`.
- **skills.sh:** 27,5 tusen installationer, först sedd 2026-07-24. Gen Agent Trust Hub, Socket och Snyk ger alla *Pass*.
- **Kända problem:**
  - Inga öppna ärenden om skillen själv. PR #19 (öppen) vill korta dess beskrivning.
  - #22 (öppen) mätte att `better-typography` bara triggas i hälften av fallen när prompten nämner mekanismen. Det påverkar hur pålitlig dirigeringen till domänskillsen är när skillsen installeras, men inte oss som destillerar.
- **Beroende:** utan alla sex domänskills blir granskningen ofullständig, och skillen säger själv att domäner ska märkas *Not reviewed*.

**Det bästa vi kan ta:**
- Utlösarlistan (`SKILL.md` §6). Flera punkter har WCAG-stöd i domänskillsen (4.1.2, 2.4.7, 2.1.1, 1.4.10/1.4.4, 1.4.3, 1.4.1). Resten är husregler och bör märkas så.
- Ordningen för billigaste fix (§7). Den passar vår princip *börja enkelt*.
- Konsolideringen "en grundorsak, ett fynd, alla platser", taket på 15 fynd och att aldrig fylla ut (§8).
- *Not verified* och *Not reviewed* (§4, §9, `review-format.md`). Det stämmer med vårt evidenskrav, där det som inte gick att verifiera märks.
- Kolumnerna *Before* och *After* och täckningstabellen (`review-format.md`). Johnny kan döma dem direkt.

**Var det hamnar hos oss:**
- Destilleras in i `.claude/skills/kvalitet/`, som ordningen och skalan för en kvalitetsgranskning, eftersom kvalitetsskillen behöver en metod och inte bara regler.
- Används också som underlag till granskarskillen `granska`. Bevis, utlösare, konsolidering, *Not verified* och dom är just det en granskare behöver, och metoden är oberoende av ramverk.
- Domänreglerna tar vi däremot från respektive kort, inte härifrån.

**Passar vår stack?**
- **Kan tas nästan som det är:** hela metoden. Den förutsätter inget ramverk och säger uttryckligen att fixar ska skrivas i projektets idiom (Astro, Tailwind, React-ö).
- **JavaScript per sida:** noll. Det är en granskningsmetod.
- **Krockar som tas upp med Johnny:**
  - Utlösaren "rörelse som ignorerar reducerad rörelse" stämmer med 2-6 [N1].
  - Domänreglerna i `better-ui` (stagger med 4 px blur och start på `opacity: 0`, tryck som skalar till 0,96) krockar med 2-6: ingen text får börja på `opacity: 0`, och blur räknas som rörelse. Det är en domänfråga, inte en fråga om samordningen.
  - Ingen krock med Lighthouse 100 eller *HTML först*.

**Risker och flaggor:**
- **Licens:** ingen risk.
- **Telemetri:** ingen i skillen. Installation med `npx skills add` går via skills.sh, men vi installerar inte.
- **Betalvägg:** ingen.
- **Krock med andra skills:** skillen vill ladda alla sex `better-*`. Hos oss skulle den krocka med `granska` och `kvalitet` om båda installerades, så vi destillerar i stället. Användarnivåns gamla skills används inte (CLAUDE.md).

**Inloggning:** Nej. Inget konto behövs, och inget har krävt inloggning.
