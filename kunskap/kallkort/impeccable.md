# impeccable

**Källa:** https://github.com/pbakaus/impeccable, läst 2026-10-16 vid commit `6af45ac9a5eb` (2026-10-16). Skill v4.6.0 (release `skill-v4.6.0`, 2026-10-15), motor `engine-v0.1.15`, `package.json` 4.6.0. Lästa filer: `README.md` (installation, telemetri, krokar, CLI), `NOTICE.md`, `skill/SKILL.src.md`, `skill/reference/craft-floor.md`, `typeset.md`, `colorize.md`, `polish.md`, `layout.md`, `critique.md` (process, rapportformat, Nielsens tio heuristiker, personas – delvis), `new-work.md` (avsnitt 1–4: världsval, färgstrategi, typsnittsreflexer, kalibrering), `crates/live/assets/antipatterns.json` (alla 59 regler). Releaseanteckningar för 4.6.0 och issues via GitHubs API.
⚠️ Inte lästa i sin helhet: övriga ~28 referensfiler (`audit`, `harden`, `animate`, `adapt`, `delight`, `bolder`, `quieter`, `distill`, `document`, `extract`, `live`, `generate`, `visualize`, `mode-*`, `ios`, `android`, `hooks` m.fl.) och Rust-koden i `crates/` utöver regellistan. Webbplatsen impeccable.style lästes inte.

**Licens:** Apache-2.0 (ur `LICENSE`). Kräver att licens och `NOTICE` följer med vid vidarespridning och att ändringar märks. `ios.md`/`android.md` bygger på ehmo/platform-design-skills (MIT). Vi destillerar med egna ord och sprider inget vidare, så kraven slår inte till.

**Vad det är:** En bred designskill med 24 kommandon (shape, critique, audit, polish, typeset, colorize, layout, animate …) och en egen motor (Rust-binär) som letar AI-mönster och hantverksfel i HTML/CSS, i redigeraren, som krok eller i webbläsaren.

**Hur det fungerar:**
- **Lägen efter besökarens mål:** Persuade (landningssidor), Operate (appar), Read (texter), Experience (portfolio). Ambitionen skalas efter läget; i Operate och Read är välbekanta mönster en dygd.
- **Golvet** (`craft-floor.md`): kontrast 4,5:1/3:1; skuggor med förskjutning och mjuk oskärpa (färgad gloria utan förskjutning är dekor); täta grupper och generös separation, mer luft ovanför en rubrik än under; brödtext 65–75 tecken, display högst 6rem, spärrning aldrig under −0,04em (−0,02 till −0,03em läser oftast bättre); tillstånd hover, inaktiv, laddar, fel, tom; webbläsarens egna ytor (markering, textmarkör, rullningslist, fokusring, understrykningens avstånd, tabellsiffror) ska temas ur paletten.
- **Vägra-listan:** likadana kort med ikon + rubrik + text som sidstruktur, kort i kort, stor siffra med liten etikett, överrad ovanför rubrik (absolut förbud), sektionsnummer 01/02/03 utan verklig ordning, gradienttext, glas som dekor, färgad sidokant över 1px, hårda förskjutna skuggor utanför nybrutalism, monospace som "teknisk" kostym, systemtypsnitt som display, emoji/unicode som ikoner, geometriska masker i stället för riktig utskärning, ljust/mörkt valt efter bransch i stället för användningsmiljö. Kortradie 12–16px, piller bara för små kontroller; markera höjd en gång (kant *eller* skugga).
- **Färg** (`colorize.md`, `new-work.md` §4): roller, inte färgprov (yta, text, handling, fokus, kant, status). Fyra strategier: Restrained (tonade neutraler + en accent), Committed (en färg bär 30–60 %), Full palette, Drenched. Ingen fast procentregel (inte 60-30-10). OKLCH för nya paletter; sänk kroma nära vitt och svart. Neutral grå är giltig när den passar; sekundär text på färgad yta tas ur ytans nyans, aldrig grå.
- **Typografi** (`typeset.md`): fråga per roll (rubrik, bröd, etikett, metadata, data); 16px brödgolv; 45–75 tecken; radavstånd efter typsnitt och bredd; ljus text på mörkt får mer radavstånd, spärrning och ett steg tyngre vikt; tabellsiffror där det behövs; ladda bara använda vikter och använd metriskt lika reserver.
- **Reflextypsnitt** som kräver skäl (Persuade): Fraunces, Playfair, Cormorant, Lora, Crimson, Newsreader, Syne, Space Grotesk/Mono, IBM Plex, Inter som display, DM Sans/Serif, Outfit, Plus Jakarta Sans, Instrument Sans.
- **Critique:** två isolerade bedömningar (designomdöme utan detektorn, sedan detektorn), Nielsens tio heuristiker 0–4, kognitiv belastning, fem personas, P0–P3. Första frågan är *design specificity*: kunde en annan produkt använda sidan oförändrad?
- **Polish:** ordning – trasiga uppgifter först, sedan saknade tillstånd, sedan flöde/hierarki/drift, sedan visuellt, sist kod.
- **Detektorn:** 59 regler i två klasser, *slop* (t.ex. side-tab, overused-font, ai-color-palette, cream-palette, icon-tile-stack, hero-eyebrow-chip, gradient-text, dark-glow, bounce-easing, marketing-buzzword, em-dash-overuse) och *quality* (low-contrast, line-length >~80, tight-leading <1,3, tiny-text <12px, wide-tracking >0,05em, justified-text, skipped-heading, heading-rhythm, cramped-padding, text-overflow, design-system-color/-font/-radius utanför DESIGN.md).

**Kvalitet och underhåll:**
- 81 800 stjärnor, 4 906 forkar, 56 bidragsgivare, 42 öppna ärenden; skapat 2025-11-16, push 2026-10-16. Mycket aktivt, flera releaser i veckan.
- Kända problem:
  - #744 (öppen): mätning visar att **0 av 35 referensfiler lästes** under 28 aktiveringar – inte ens `craft-floor.md`, som skillen själv kallar golvet. Det mesta av kunskapen når alltså aldrig modellen när skillen körs som den är.
  - #988: den statiska skanningen blandar `@media`-block (mörkt läge + utskrift) och gav 73 falska kontrastfynd där den renderade gav 0.
  - #963, #950: falska fynd (cramped-padding, `inert`-delträd).
  - #852: live-läget skriver ogiltig TSX i Next.js 16/React 19.

**Det bästa vi kan ta:**
- `crates/live/assets/antipatterns.json`: 59 namngivna mönster med beskrivning – den bästa enskilda listan att översätta till hantverkskriterier.
- `craft-floor.md`, *Verify* och *Refuse*, särskilt *Browser surfaces* (selection, caret, scrollbar, understrykning, tabellsiffror) – en billig premiumsignal.
- `colorize.md`: rollinventering och tabellen kontrast per innehållstyp; `new-work.md` §4: de fyra färgstrategierna.
- `typeset.md`: bedömningsfrågorna per roll (auktoritet, hierarki, skala, läsning, stress, leverans).
- `critique.md`: frågan om design specificity, heuristikerna och personas.
- `polish.md`: triageordningen och listan över tillstånd per kontroll.

**Var det hamnar hos oss:**
- `.claude/skills/yta/generiskt.md`: detektorns slop-regler som hantverkskriterier, omskrivna så att de dömer *utförande*, inte "AI-utseende" (beslut 2026-10-15).
- `typografi.md`: typset-frågorna, spärrningsgolvet, ljus-på-mörkt-kompensationen.
- `farg.md`: färgstrategierna (Restrained passar de flesta småföretag), rollerna, OKLCH-ramper.
- `detaljer.md`: webbläsarytorna och tillståndslistan.
- **Kontroll:** de mätbara quality-reglerna (radlängd, radavstånd, textstorlek, spärrning, justering, rubriknivåer, rubrikrytm, text mot viewportkant, överflöd) passar Playwright-kontroller. Motorn själv prövas inte nu (falska fynd, nedladdad binär).

**Passar vår stack?**
- Reglerna är ramverksoberoende CSS-regler och tas som de är i Astro. Med React och Tailwind tillåtna (BESLUT 2026-10-16) krockar inget tekniskt; skillens kod skrivs för vilken stack som helst.
- Detektorn läser renderad HTML eller en URL, så den fungerar mot Astros byggda sidor om vi vill pröva den senare.
- JavaScript per sida: noll – det är regler. Rörelseregeln ("ett genomtänkt ögonblick, inte utspridda effekter", exponentiell ease-out) stämmer med sparsam rörelse. Uppmaningen att använda blur, backdrop-filter och clip-path i rörelser kan krocka med Lighthouse på svaga mobiler – tas upp med Johnny om det blir aktuellt.
- Översättning: DESIGN.md/PRODUCT.md-världen motsvaras av kitets `design.md`; "colour outside DESIGN.md" motsvaras av designregelvakten mot `--k-*`.

**Risker och flaggor:**
- **Telemetri på som standard:** nytt designarbete anropar roll-API:t på impeccable.style (kravet, alltid), och valen rapporteras om man inte stänger av (`DO_NOT_TRACK=1` eller `IMPECCABLE_NO_TELEMETRY=1`). Krokar körs oberoende av verktygsgodkännande och laddar ned motorn till `~/.impeccable/bin/`. Vi installerar inte, så det berör oss inte.
- Ingen betalvägg, ingen inloggning.
- **Krockar med Nortropic (vi vinner):**
  - Överrader är absolut förbjudna, men biblioteket har `--k-overrad-versaler` och `--k-overrad-spatiering`, och G3 förutsätter överrader i textfärg.
  - "side-tab" (färgad sidokant >1px) träffar vår `.citat { border-left: 3px solid var(--k-text) }` om detektorn räknar textfärg som färg.
  - cream-palette och kalibreringen (krämvit + serif + terrakotta) träffar kiten Varm och välkomnande (grön/beige) och Djärv och egen (orange/serif), som Johnny godkänt.
  - Reflexlistan nämner Fraunces och IBM Plex, som står på vår kuraterade OFL-lista; overused-font nämner Inter. Hos oss väljer kitet (BESLUT 2026-10-15).
  - Skillen vill att varje ny yta uppfinner en egen värld; hos oss kommer ytan ur kitet och kiten varierar inte konventionen.
- Skillen krockar med hallmark om typsnitt (hallmark rekommenderar Fraunces, impeccable kallar det reflex) och med taste om skuggor och linjer (impeccable tillåter kant eller skugga, taste förbjuder båda i vila).
