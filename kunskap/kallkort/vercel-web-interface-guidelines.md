# Vercel: Web Interface Guidelines och web-design-guidelines

**Källa:** två repon, lästa 2026-10-16.
- **Riktlinjerna:** https://github.com/vercel-labs/web-interface-guidelines, HEAD `434b7f91364665f2f733b310ec54809bf8f37937` (2026-10-05, PR #29 *Add desktop overscroll guideline*; samma 2026-10-16 enligt `git ls-remote`). Lästa i sin helhet: `README.md` (198 rader), `command.md` (191) och `install.sh` (143); `AGENTS.md` (156) genom sökning. Filerna är byte för byte lika med andra varvets nedladdning (`andra-varvet/kallor/vercel-wig/`). Alla 30 ärenden och PR:ar (titlar), [#11](https://github.com/vercel-labs/web-interface-guidelines/issues/11) med kommentarer. Webbversionen är [vercel.com/design/guidelines](https://vercel.com/design/guidelines).
- **Skillen:** https://github.com/vercel-labs/agent-skills, HEAD `063bee94c3f4df8453406c830b0a7df0f2860278` (2026-10-14), `skills/web-design-guidelines/SKILL.md` (39 rader, i sin helhet; senast ändrad `ba46938889d4`, 2026-01-16). Ärendena [#30](https://github.com/vercel-labs/agent-skills/issues/30), [#91](https://github.com/vercel-labs/agent-skills/issues/91) och [#316](https://github.com/vercel-labs/agent-skills/issues/316).
- Rapport: `andra-varvet/kvalitet-jamforelse.md`, avsnitt 7 (punkt för punkt mot övningssajten).

**Licens:** riktlinjerna MIT (`LICENSE`). agent-skills säger *"MIT"* i README men har ingen licensfil, och GitHubs API anger ingen licens ⚠️. Vi destillerar med egna ord och anger källan, så inget krav utlöses.

## Vad det är
Vercels lista över *"hundreds of choices"* i webbgränssnitt (README:3), ordnad i interaktion, rörelse, layout, innehåll, formulär, prestanda och design, plus ett avsnitt med Vercels egen smak för copywriting som *"aren't universal guidelines"* (README:146). `command.md` är samma regler i kort form med 14 antimönster och ett format för fynd. Skillen `web-design-guidelines` granskar kod mot dem.

## Hur det fungerar
- **Skillen** hämtar `command.md` från grenen `main` *"before each review"* (SKILL.md:23–29), läser filerna och skriver fynd som `fil:rad – problem`, utan förklaring (`command.md:169–191`).
- **`install.sh`** laddar ned `command.md` med `curl` till användarkatalogerna för Claude Code, Cursor, Amp, OpenCode och Gemini CLI.
- **`AGENTS.md`** är samma regler som MUST, SHOULD och NEVER, tänkt att läggas i projektet.

## Kvalitet och underhåll
- Riktlinjerna: 995 stjärnor, 69 forkar, 12 bidragsgivare, senaste push 2026-10-05, 2 öppna PR:ar (#30 `:has(:focus-visible)`, #10 CSS före JS). Små, sällsynta tillägg: tre PR:ar sedan april.
- agent-skills: 32 520 stjärnor, 26 bidragsgivare, senaste push 2026-10-14, 181 öppna ärenden och PR:ar (`gh api`, 2026-10-16).
- **Kända problem:**
  - Skillen hämtar instruktioner från en föränderlig gren. #30 (*"Supply chain attack"*, *"Non-reproducibility"*), #91 (*"opens up a lot of room for prompt injection attacks"*) och #316 ber om en låst version; alla tre är öppna.
  - #11 (stängt som *not planned*): README:11 föreslår `maximum-scale=1` som alternativ till 16 px i fält, och raden efter säger *"Never disable browser zoom"*. Vercel säger att zoom fungerar ändå; en kommentator återskapade spärren på Android och kallar den ett fel mot WCAG 1.4.4. `command.md:154` flaggar själv `maximum-scale=1` som antimönster.
- **Faktafel och svaga regler:**
  - `command.md:48`: *"`autocomplete="off"` on non-auth fields"*. README:107 gäller bara fält som sök. Kontaktfält med namn, e-post och telefon kräver giltig token enligt WCAG 1.3.5 (`.claude/skills/kvalitet/formular.md:12`).
  - README:137: APCA före WCAG 2. APCA är ingen gällande norm; vårt golv är WCAG 2.2 AA.
  - `command.md:18`: *"Interactive elements need keyboard handlers (`onKeyDown`/`onKeyUp`)"*. Inbyggda `<button>` och `<a>` behöver inga; regeln ger falska fynd på bra kod.

## Det bästa vi kan ta
Redan taget, med egna ord och källa:
- **kvalitet:** `SKILL.md:137–142` (kontrollistan 18–20, *Detaljer som besökaren märker*), *Mönster som alltid är fel* (`tillganglighet.md:109`), `formular.md` (skicka aldrig inaktiverad, klistra in, Enter, `beforeunload`, hydreringssäkra fält), `modern-html-css.md:76` (`translate="no"`), `prestanda.md` (video) och `kontroller.md` (7d, 8o).
- **yta:** `detaljer.md` (tillstånd, skuggor, radier, träffytor, ikoner) och `typografi.md` (tabulära siffror, hårt mellanslag); tabellen i `yta/SKILL.md`, rad 3, 10, 13–15 och 17.
- **granskare:** `premium.md`, PF2, PF7 och PF9.
- **skelett:** `mobil.md`, viewporten och fälten.

Inte taget, och inte heller värt att ta: copywritingen (Title Case, `&`, siffror för antal, *"Write in second person"*) följer svensk norm hos oss; raka eller engelska citattecken byts mot svenska ” ” (`premium.md`, PF4). Inget nytt att ta efter andra varvet: riktlinjerna är oförändrade sedan 2026-10-05.

## Var det hamnar hos oss
**Skill: kvalitet, med yta och skelett** – beslutad placering (fältet `beslut`, Johnny 2026-10-16 omkring 17.40: *"Ja på alla"*), och kortet håller med. `guide/bilaga-a-verktyg.md:82` har kvar `web-design-guidelines` som *kandidat (destillera)* till granskaren (3-2). Förslag: ändra raden till "destillerad i kvalitet, yta och skelett; installeras inte", och låt granskarens checklista hänvisa till våra filer, aldrig till den hämtade `command.md`.

## Passar vår stack?
Ja, för det mesta. Reglerna gäller HTML och CSS; React-delarna (`useState` i URL:en, `<Suspense>`, re-renderingar, virtualisering) gäller bara React-öar och appar. *URL as state*, optimistiska uppdateringar och idempotensnycklar hör till appar, inte till små statiska sajter. Vercel som värd är inte aktuellt (`BESLUT.md` 2026-10-14, *Hosting på Cloudflare*).

## Risker och flaggor
- **Fjärrstyrd instruktion:** skillen och `install.sh` hämtar `main` utan låsning. Installeras inte; destilleringen är låst vid `434b7f9`.
- **`install.sh`** skriver i användarkatalogerna för flera verktyg; körs inte.
- **De motsägelser som står ovan** tas inte in: `maximum-scale=1`, `autocomplete="off"` på kontaktfält, APCA före WCAG och tangentbordslyssnare på inbyggda element.
- README länkar till Vercels jobbannonser och till inlägg på X som källor till flera regler (*prediction cones*, optisk linjering). De är exempel, inte belägg.
- Telemetri, betalvägg och inloggning: inga.

## Inloggning
Inget.
