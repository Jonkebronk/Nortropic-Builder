# nexu-io/open-design

**Källa:** https://github.com/nexu-io/open-design, läst 2026-10-16 vid commit `78d5637` (2026-10-16), senaste release `open-design-v0.25.0` (2026-10-15). Lästa: `README.md`, `LICENSE`, `PRIVACY.md`, `design-templates/critique/SKILL.md` (mappen har bara den och `example.html`, inga delfiler), alla filer i `craft/` (`anti-ai-slop`, `typography`, `color`, `state-coverage`, `animation-discipline` i sin helhet; `accessibility-baseline`, `form-validation`, `laws-of-ux`, `typography-hierarchy`, `typography-hierarchy-editorial`, `rtl-and-bidi` rubriker och felavsnitt; `README`, `FUTURE_SECTIONS`), `design-systems/README.md`, `docs/design-systems.md` (rubriker och kontraktsavsnitt), `DESIGN.md` för `bento`, `cafe` och `apple` samt apples `USAGE.md` och två `manifest.json`, och telemetrikoden `apps/daemon/src/routes/telemetry.ts`. Förlagan: [alchaincyf/huashu-design](https://github.com/alchaincyf/huashu-design) `references/critique-guide.md`, commit `3bd465d` (2026-10-13). Ärenden via GitHubs API.
⚠️ Inte lästa: appen (cirka 4 100 filer under `apps/`), `skills/`, pluginkatalogen, `docs/design-systems.md` i sin helhet och token-schemat i `packages/contracts/`.

**Licens:** Apache-2.0 för repot (`LICENSE`; ingen `NOTICE` i roten). Av 99 `LICENSE`-filer i trädet är 98 MIT, bl.a. för mallarna `guizang-ppt`, `html-ppt-*` och `last30days`. `craft/` är bearbetat från [refero_skill](https://github.com/referodesign/refero_skill) (MIT, © Refero Design, enligt `craft/README.md`). Designsystemen kommer delvis från VoltAgent/awesome-design-md och bergside/awesome-design-skills (båda MIT enligt GitHubs API); `cafe` har `license: null` i sin manifest. `critique` saknar egen licensfil och bygger på huashu-design (MIT). Vi destillerar med egna ord och sprider ingen kod, så inget licenskrav utlöses. Apache-2.0 och MIT kräver licenstext och upphovsnotis bara om något kopieras vidare.

## Vad det är
Det är en öppen arbetsyta för AI-design: en webbapp och en skrivbordsapp med en lokal tjänst som startar den kodagent användaren redan har (Claude Code, Codex, Cursor m.fl.). Till det kommer skills, mallar, 151 designsystem och 277 officiella plugins. Varje designsystem är ett paket där `DESIGN.md` är *"the core brand contract"* (README). För oss är det två delar som räknas: granskningsmallen `critique` och de varumärkesoberoende hantverksreglerna i `craft/`.

## Hur det fungerar
- **critique:** fem dimensioner med 0–10 poäng och band (0–4 *Broken*, 5–6 *Functional*, 7–8 *Strong*, 9–10 *Exceptional*): filosofisk konsekvens, visuell hierarki, detaljutförande, funktion och innovation. Varje poäng kräver ett belägg på 30–80 ord som pekar på element, klasser eller sidor. Utdata är en HTML-rapport med radardiagram och listorna *Keep*, *Fix* och *Quick wins*.
- **Poängdisciplinen** står i ett eget avsnitt:
  - *"Always cite evidence"*: en poäng utan belägg underkänns.
  - *"Don't average up"*: poängen är *"the worst sustained band"*, så en trasig sida drar ner även om två andra är bra.
  - *"Don't grade-inflate"*: 7 betyder stark, inte godtagbar, och ett snitt över 8 är misstänkt.
  - *"Innovation is allowed to be low"*: lämplig försiktighet straffas inte.
  - Mallen ska läsa den utförda designen, inte deklarerad avsikt (*"Do not score from frontmatter alone"*), och den får inte granska sin egen artefakt i samma tur.
- **Det som fallit bort ur förlagan:** huashu-designs guide har en sjätte dimension, *koncept*, som väger tyngst och har vetorätt. Är konceptet 5 eller lägre stannar totalbetyget vid 6. Testet är: *"Byt kundens namn – håller designen fortfarande? Då är det en mall."* Open-designs version har tagit bort både dimensionen och vetot.
- **craft/anti-ai-slop.md:**
  - Sju "kardinalsynder" som appens linter flaggar som P0: Tailwind-indigo som accent, en hero-gradient med två stopp, emoji som ikoner, sans på rubriker när kitet har en serif, kort med färgad vänsterkant, påhittade siffror och utfyllnadstext.
  - P1 och P2 som vägledning: högst två synliga accenter per skärm och högst cirka 12 hexvärden utanför `:root`.
  - Receptet *"~80% proven patterns + ~20% distinctive choice"*.
- **Övriga craft-filer** är täta regelböcker med siffror och primärkällor. Exempel:
  - Versaler spärras 0,06–0,1 em.
  - Fem tillstånd per interaktiv yta.
  - 150 ms som standardlängd.
  - Listor över vandringssägner, t.ex. att 44 × 44 är AAA och att AA är 24 × 24, och att WCAG 2.3.3 (vestibulärt) är AAA.
- **DESIGN.md som kontrakt:** ett paket har `manifest.json` (ursprung), `DESIGN.md` (prosa till agenten) och `tokens.css` (kompilerade tokens). Kraven:
  - Minst sju egentliga H2-avsnitt, utan fast mall.
  - `tokens.css` ska uttrycka samma beslut som prosan.
  - Härledda filer får inte avvika från källan.
  - Allt valideras av `pnpm guard` (`design-systems/README.md`, `docs/design-systems.md` §3 och §9).

## Kvalitet och underhåll
- **Siffror (GitHubs API 2026-10-16):** 101 443 stjärnor och 11 665 forkar. Repot skapades 2026-04-28 och pushades senast 2026-10-16. Det har cirka 450 bidragsgivare och 1 172 öppna ärenden och PR, varav 659 PR. Stort, ungt och mycket aktivt; stjärnorna mäter uppmärksamhet (`kunskap/research/2026-10-15_kompetensluckor-och-kandidater-per-lager.md`).
- **Ojämn kvalitet:** craft-filerna är noggranna, med primärkällor och rättade myter. Designsystemen är däremot ofta tunna och genererade. `bento` och `cafe` upprepar *"Token from style foundations"* på varje färg, och `bento` listar vikterna 100–900 trots craftens regel om tre vikter.
- **Kända problem:**
  - [#8560](https://github.com/nexu-io/open-design/issues/8560) (öppet): en omladdning under start kan slå på telemetrin igen efter att användaren valt bort den.
  - [#5540](https://github.com/nexu-io/open-design/issues/5540) (stängt): PRIVACY.md nämnde inte PostHog.
  - [#8075](https://github.com/nexu-io/open-design/issues/8075): fynden från den statiska kontrollen bara rapporteras.

## Det bästa vi kan ta
1. **Redan taget** i granskarutkastet (`.claude/skills/granskare/SKILL.md` princip 3 och 10, `premium.md` PS1–PS3, PS6 och PS7, commit `78d5637`):
   - belägg per fynd;
   - "det sämsta som håller i sig";
   - påhittade siffror;
   - dekor utan innehåll;
   - högst två accenter;
   - kort med färgad kant;
   - emoji som ikoner.
2. **Återstår till granskaren:** huashus *byt-namnet-test* som hjälpfråga under måttstockens fråga 2 (äkthet). Om texten och bilderna håller lika bra för en konkurrent är sajten en mall. Det är ett förslag till Johnny, eftersom checklistan är låst, och en källa ger högst `medel`.
3. **Återstår till mätningen:** *Don't grade-inflate* hör hemma i `larande/matning.md` som en varningssignal: en granskare som godkänner nästan allt. Det syns redan i TNR, men den formuleringen saknas.
4. **Till ytskillen:** kontraktsidén, att `design.md` och `kit.css` säger samma sak och kontrolleras med skript. Det är precis `guide/2-5-yta.md` N2 *design.md valideras med skript* (fallgrop 63), och open-designs guard är en förebild. Formatets avsnitt *Do's and Don'ts*, *Responsive Behavior* och *Agent Prompt Guide* (apples `DESIGN.md`) kan stå som rubriker i full `design.md` (2-5 N2).
5. **Till andra skills, som källa:**
   - `accessibility-baseline` (vandringssägnerna) till `kvalitet/tillganglighet.md`;
   - `animation-discipline` till `rorelse`;
   - `state-coverage` till `granskare` PG6 och `skelett`.

## Var det hamnar hos oss
**Håller med i sak, men inte om ordet "poängdisciplin".** Poängskalan tas inte in. Husain och Shankar avråder från 1–5-skalor (*"not actionable"*, bedömare drar mot mitten; [hamel.dev/blog/posts/llm-judge](https://hamel.dev/blog/posts/llm-judge/)), och `guide/3-2` låter granskaren döma i Johnnys form: godkänd, underkänd eller osäker, med fynd i tre utfall och fyra allvarsgrader. Det som följer med är disciplinen utan siffror:
- belägg krävs;
- det sämsta som håller i sig avgör;
- ingen uppräkning av betyget;
- konvention straffas inte.

De flesta av de punkterna finns redan i `granskare`. Nytt är byt-namnet-testet, som förslag. **DESIGN.md hör till ytskillen** (`yta/tokens.md` eller en delfil om `design.md`), som format och kontroll. Paketen själva tas inte in, och det gör inte heller appen eller några plugins (`guide/bilaga-a-verktyg.md`: *Avstå: Open Design som plattform*).

## Passar vår stack?
- Vi läser bara filer. Ingenting installeras, och ingen kod når sajterna.
- **Översättning till tokens:** open-designs tokens (`--bg`, `--surface`, `--fg`, `--muted`, `--border`, `--accent`) motsvarar kitets `--k-*`-roller. "Högst två accenter per skärm" ska läsas mot vår regel att accenten är till för handlingar (`2-5`, G3).
- **Fel målgrupp:** critique skrevs för presentationer och SaaS-landningssidor (Monocle, WIRED och Kinfolk som exempel). För en hantverkare eller klinik är "innovation" fel mål, vilket mallen själv medger.
- **Kontraktet:** formatet med `manifest.json`, `DESIGN.md` och `tokens.css` passar våra kit (`bibliotek/stilkit/<kit>/`) om `tokens.css` byts mot `kit.css`.

## Risker och flaggor
- **Telemetri (bara om appen körs):** produktanalys och kvalitetsspår är på som standard och kan stängas av. Säkerhets- och driftstelemetrin går däremot alltid till PostHog i byggen med nyckel (`PRIVACY.md`). Koden bekräftar det: nyckeln skickas *"regardless of consent, so safety/error tracking can run"* (`apps/daemon/src/routes/telemetry.ts`). Bortval kan dessutom återställas av ett fel (#8560). Med påslaget innehållsdelning går prompter och verktygsutdata till Langfuse.
- **Betalväg:** README:n öppnar med en kampanj för OpenDesign Go/Cloud, och modelltjänsten OpenDesign AMR delar data med appen.
- **Identitet och lag:** paketen bär stora varumärkens identitet. `apple` är uppmätt från apple.com och namnger SF Pro. Johnnys husregel mot kopiering är struken (`BESLUT.md` 2026-10-16), men lagen om kännetecken och upphovsrätt gäller fortfarande. ⚖️ Tolkning, inte juridisk rådgivning.
- **Krockar:**
  - critique triggar på "design review" och "review my landing page", samma begäran som vår `granskare` – installera den inte.
  - Självkritik i samma tur strider mot `3-1`, *Den som bygger dömer inte*.
  - Craftens "lägg till minst en okonventionell sektion" krockar med vår regel att konvention inte är slop (granskare princip 8, `2-5`).

## Inloggning
Inget. Repot är publikt. Konton krävs bara för OpenDesign Cloud och Go, som inte ska användas.
