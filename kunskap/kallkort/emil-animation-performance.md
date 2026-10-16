# emil-animation-performance

**Källa:** https://github.com/emilkowalski/skills, `skills/animation-performance/SKILL.md` (222 rader, enda filen i mappen), läst i sin helhet 2026-10-16 vid HEAD `2d228630ba1446365f614a108cb8252f1feda202` (2026-10-11; samma 2026-10-16 enligt `git ls-remote`). Skillen lades till i `6465079742eb019bc419caf2c352ecda03f5dfd8` (2026-10-11) och ändrades lite (två rader in, tre ut) i `2d22863` samma dag. Lästa också: `README.md`, `performance-cheatsheet.md` (repots rot), alla 32 ärenden och PR:ar (titlar) och Motions `CHANGELOG.md` vid `2d27b041114f5f1cffc1f6d3ad522929ce0cc41f` (14.0.0–14.3.0), [motion.dev/docs/performance](https://motion.dev/docs/performance) och ai-kit `best-practices/index.md` (`b7e2c68`). Rapport: `andra-varvet/rorelse-jamforelse.md`. ⚠️ Inte prövat: påståendena om vilka egenskaper Chrome och Firefox lägger i kompositionen; ingen inspelning på en riktig telefon.
**Licens:** MIT, © 2026 Emil Kowalski (`LICENSE`). Vi destillerar med egna ord och anger källan, så inget krav utlöses.

## Vad det är
En diagnosskill med en enda fråga: *"does each frame finish in time?"* (:16). Den väljer inte kurva eller längd (`animate`) och avgör inte om rörelsen ska finnas (`review-animations`). Den hittar orsaken när en animation tappar bildrutor och föreslår en billigare egenskap.

## Hur det fungerar
- **Fem hårda regler** (:31–37): `transform` och `opacity` som standard; namnge orsaken innan koden ändras; dra aldrig slutsatsen "det fungerar" på en snabb dator; aldrig `transition: all`; byt inte korrekthet mot en optimering som webbläsaren kanske ger.
- **Bildbudgeten** (:55–64): 16,7 ms per bildruta vid 60 Hz och 8 ms vid 120 Hz; planera mot det mindre talet.
- **Tre kostnadsnivåer** (:76–80): bara komposition (`transform`, `opacity`), målning (`box-shadow`, `border-radius`, `color`) och layout (`width`, `padding`, `margin`, `top`). Bytestabellen (:86–91): `scale()` i stället för storlek, `translate()` i stället för läge, `opacity` i stället för `display`, `filter: drop-shadow()` i stället för `box-shadow`.
- **Var den körs** (:100–125): JavaScript och `requestAnimationFrame` går alltid på huvudtråden; CSS och WAAPI kan gå utanför. Rörelse som spelas medan sidan laddar eller hydrerar flyttas till CSS. Exempel: Vercels flikindikator tappade bildrutor under navigering och lagades med en CSS-animation.
- **Två fällor som ser rätta ut** (:142–158): en dragsträcka i en CSS-variabel på föräldern räknar om stilen för alla barn i varje bildruta (Vaul blev trögt över cirka 20 poster); animerad `blur()` över 20 px är dyr, särskilt i Safari.
- **`will-change`** (:160–172): bara när ett ryck på en pixel eller tappade bildrutor syns, på elementet som rör sig, aldrig på `*`.
- **Arbetsgång** (:182–222): lista varje animation med drivare, egenskaper och när den spelas; gå igenom sju orsaker i ordning efter hur vanliga de är; bekräfta med en inspelning i Performance-panelen och på en riktig mellanklasstelefon (*"CPU throttling on a desktop models a slow CPU, not a weak GPU"*); rapportera varje fynd med *före*, *efter* och *Verified: from code / needs a device recording*.

## Kvalitet och underhåll
- Repot: 46 647 stjärnor, 2 681 forkar, 3 bidragsgivare, senaste push 2026-10-11, 4 öppna ärenden (`gh api`, 2026-10-16). Ingen ändringslogg och inga releaser. Inget ärende gäller `animation-performance`; de öppna gäller `apple-design` (#32), animationsförslag (#31), `break-ui`/`mobile-native`/`prototype` (#30) och skills som inte kan anropas av modellen (#29).
- **Faktafel i källan:** *"The `x`, `y`, `scale`, `rotate` shorthands … aren't accelerated"* (:123) och symptomraden *"Framer Motion `x`/`y` drops frames → Animate the full `transform` string"* (:48, också i `performance-cheatsheet.md`) gäller inte längre. Motions `CHANGELOG.md`, 14.2.0 (2026-10-13): *"Hardware accelerated independent transforms like `x`, `y`, `scaleX` etc."* Motions dokumentation säger nu om förkortningarna: *"These are hardware accelerated, just like animating `transform` directly"*, och ai-kit (`b7e2c68`) säger *"Both are hardware accelerated on HTML elements"*. Skillen skrevs två dagar före releasen. Skillens förklaring att förkortningarna byggs med CSS-variabler bekräftas inte av Motions dokumentation ⚠️.
- **Osäkert:** skillen lägger `filter`, `clip-path` och `background-color` i kompositionsnivån *"in current Chrome/Firefox"* (:78). Motions dokumentation är försiktigare: *"either have support or are gaining it"* ⚠️.

## Det bästa vi kan ta
**Redan taget** (`.claude/skills/rorelse/SKILL.md:46`, princip 6): de tre nivåerna, `filter: drop-shadow()` eller tonat pseudoelement i stället för animerad `box-shadow`, oskärpa över 20 px, ingen förflyttning via CSS-variabel på en förälder, `will-change` först när ett ryck syns. Också `sidbyten-och-scroll.md:36` (skuggan vid scroll), `ordlista.md:94` (16,7 och 8 ms), `granskning.md`, kriterium 7, och varningen i `motion.md:49` om Motion 14.2.0.

**Inte taget:**
1. **Ingen rörelse genom React-tillstånd.** En egen animation i en React-ö skriver till `ref.current.style` eller ett motion value, aldrig `setState` i varje bildruta (:127–140). React-öar är tillåtna sedan `BESLUT.md` 2026-10-16, och `motion.md` säger inget om det.
2. **Orsaken namnges och provet anges** i rörelsegranskningens fynd: *från koden* eller *kräver inspelning på telefon* (:34–35, :219). Det passar `granskning.md`, *Fyndens form*.
3. **Diagnosordningen** (:198–206) som checklista när en övergång rycker: egenskaper, upptagen huvudtråd (hydrering av en ö), omritning i React, innehåll som växer, CSS-variabler, oskärpa, sist `will-change`.
4. **Strypning är inte en svag telefon** (:208): CPU-strypning i Chromium (`kvalitet/prestanda.md:37`) säger inget om grafikprocessorn. Ryck prövas på en riktig mellanklasstelefon innan Johnny dömer.

## Var det hamnar hos oss
**Skill: rorelse** – beslutad placering (fältet `beslut`, Johnny 2026-10-16 omkring 17.40: *"Ja på alla"*), och kortet håller med. Punkt 1 → `motion.md`, *Vad som ska vara sant i en ö med Motion*; punkt 2–3 → `granskning.md`; punkt 4 → `granskning.md` eller kvalitetens prov på riktiga enheter. Alla är instruktioner *(en källa – bänken)*; om punkt 1 också står i Motions dokumentation är inte kontrollerat ⚠️.

**Inte in:** förkortningsregeln (fel sedan Motion 14.2.0, se ovan) och tipset om 2–5 px oskärpa för att mjuka upp en korstoning (:158), som krockar med `motion.md`, *Förbud* (ingen animerad oskärpa; WCAG Understanding 2.3.3).

**Nyans i guiden:** `guide/2-6-rorelse.md:21` och princip 6 räknar *färg* till de billiga egenskaperna. Enligt skillens tabell (:79) målas `color` om i varje bildruta. Det är billigt på en knapp men inte bara komposition. Förslag: "färg på små ytor".

## Passar vår stack?
Ja. Skillen gäller webben (CSS, WAAPI, Motion för React), och hos oss är rörelsen CSS i första hand och Motion i React-öar (`rorelse/verktyg.md`). Sonner, Vaul och Vercels dashboard är Emils egna exempel, inte delar av vår stack.

## Risker och flaggor
- **Faktafelet om Motions förkortningar** – en agent som läser originalet skriver om fungerande `x`/`y` till transform-strängar i onödan.
- **Inledningssvaret** (:10–14): skillen svarar bara med en fast mening när den startas utan fråga. Det hör till originalet och tas inte med.
- Installeras inte: inga tredjepartsskills i kundbygget (`guide/bilaga-b-skills.md:108`), och originalen läses som data (`BESLUT.md` 2026-10-16, *Alla skills gås igenom, jämförs med originalen och Apples HIG kommer in*). README länkar till ett nyhetsbrev på aiforui.dev; skillen har ingen telemetri, betalvägg eller inloggning.

## Inloggning
Inget.
