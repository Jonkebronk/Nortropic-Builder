# taste

**Källa:** https://github.com/Leonxlnx/taste-skill, sökvägen `skills/taste-skill/` (installationsnamn `design-taste-frontend`, "v2"). Läst 2026-10-16 vid commit `f624f37a8c65` (2026-10-14); release v2.0.0 (2026-10-13). Lästa filer: `README.md`, `CHANGELOG.md` (2.0.0), `skills/llms.txt`, `skills/taste-skill/SKILL.md` (hela), `references/tells.md`, `type.md`, `colour.md` (hela), `layout.md` (navigering, slut), `imagery.md` (behandling), `motion.md` (budget, frågor, tokens), `copy.md` (§5 bevis), `critique.md` (poäng och tak), `research.md` (metod och poäng), `scripts/lib/rules.mjs` (regel-id:n och färgfamiljerna). Issues via GitHubs API.
**Rättat 2026-10-16 (tredje varvet): webb-pros `taste` är inte v2.0.0.** Webb-pros `.claude/skills/taste/SKILL.md` är byte för byte samma fil som uppströms `skills/taste-skill/SKILL.md` i commit `ce26fc25c0e5` (2026-09-26), som README då kallade *"v2 (experimental) … Actively iterating toward v2.0.0 stable"* (jämfört med `diff` mot GitHub). Kortet nedan beskriver v2.0.0 (`f624f37`), som är en annan skill: den äldre förbjuder tankstreck och Fraunces och har en premiumpalett med exakta hexvärden; v2.0.0 förbjuder i stället överrader, hårlinjer och skuggor i vila och kräver åtta rörliga element. Det som byggs på taste ska säga vilken version det gäller. Fyndet kom från yta 2 i andra varvet (`andra-varvet/yta-2-jamforelse.md`, S6). Repots HEAD är fortfarande `f624f37a8c65` (`git ls-remote`, 2026-10-16).
⚠️ Inte lästa: resten av `layout.md`, `imagery.md`, `research.md`, `copy.md`; `library/*.json` (cirka 1,4 MB data: riktningar, hjältar, sektioner, typsystem, paletter, foton, sajter); skripten `draw.mjs`, `assets.mjs`, `inspect.mjs`, `lint.mjs`, `lib/probe.mjs`, `lib/cdp.mjs` (bara listade, inte körda); webbplatserna tasteskill.dev och tastecode.dev.

**Licens:** MIT, © 2026 Leonxlnx (ur `LICENSE`). Kräver att licenstexten följer med vid kopiering. Bilder som skillen hämtar har egna licenser (public domain, CC0, CC BY, CC BY-SA) och kräver kreditering på sidan.

**Vad det är:** Ett komplett byggflöde för publika sidor: inventera det bara kunden har, låt ett skript dela ut tre av 20 riktningar, välj en, hitta en idé ur kunden, bygg med riktiga bilder, mät sidan i en riktig webbläsare och kritisera skärmbilderna i upp till tre varv. Ett bygge tar 30–45 minuter och några hundra tusen token.

**Hur det fungerar:**
- **Inventering:** 8–12 saker som bara kunden har (namnet och vad det betyder, gatan, siffrorna, begränsningen, materialen, ritualerna, trycksakerna). **Konkurrenttestet:** sätt in närmaste konkurrent i idémeningen – fungerar den fortfarande är idén branschens, inte kundens.
- **Husregler som mäts:** rubriker högst två rader i varje bredd; inga överrader, ingen monospace utanför kod, ingen 01/02/03, inga hårfina linjer eller 1px-ramar, inga gradienter (utom en neutral scrim över foto), inga skuggor i vila, ingen "assistentpalett" (krämvit + terrakotta, violett/indigo), inga små spärrade versaler, inga ikonkort eller rader av likadana kort, inget glas, ingen svävande pillernavigering, inget framhävt ord i rubriken, högst två typsnitt.
- **Typ:** två–tre storlekar gör jobbet, display minst 4 × brödet, högst fem storlekar; display spärrning −0,02 till −0,05em och radavstånd 0,85–1,05; bröd 16–20px, radavstånd 1,45–1,6, 45–75 tecken; vänsterställt, centrera högst ett ögonblick. Detaljer: typografiska citattecken, `tabular-nums`, understrykning med `text-underline-offset: 0.18em` och `text-decoration-thickness: 0.07em`, `::selection` i accenten, minst dubbelt så mycket luft över en rubrik som under, ingen viktändring på hover, optisk vänsterjustering (−0,05em) av stora bokstäver.
- **Färg:** en mark, ett bläck, en accent; mark 70–90 %, accent under 5 % av en skärm, på handlingen och högst en sak till; löptext i fullt bläck; ytor skiljs med ett tonsteg (2–6 ljushetspunkter), inte linje eller skugga; hela sektioner får byta markfärg, kant mot kant. Mörka sidor: `color-scheme: dark`, djup genom ljusare yta, aldrig glöd.
- **Bild:** en dominant bild slår sex små; samma beskärning och behandling; raka hörn som standard. Behandling: orörd, gråskala, multiply på färgfält eller mörkad – inte färgtoning, duotone, blur, korn eller vinjett. Text på foto får en neutral scrim (40–55 % svart). Minst fyra riktiga bilder per sida; skriptet söker i Openverse, Wikimedia Commons, Art Institute of Chicago och The Met.
- **Komponenter:** knappar platta, antingen raka eller helt runda (9–16px "mjuk" radie är svaga sajters standard); navigering = ordmärke, 3–5 länkar, en handling; sidfoten är ett designat slut, inte en webbkarta.
- **Rörelse:** krävs – inspektören underkänner under åtta rörliga element. En signatur, entréer per sektion (60–90ms förskjutning, 16–32px), feedback under handen, en rörlig bild. Tokens: `--ease-out: cubic-bezier(0.22,1,0.36,1)`, press 140ms, hover 180ms, UI 240ms, entré 800ms.
- **Studien bakom** (`research.md`): 248 sajter från One Page Love och Awwwards fångade 2026-10-05, poängsatta av **21 modellgranskare**, inte människor. Författaren säger själv att urvalet är "mode lika mycket som kvalitet", att användbarheten inte stiger med poängen, och att flera förbud är ägarens smak *mot* datan (monospace-etiketter, indexnummer och hårlinjer är vanligare på toppsajterna).
- **Skillens eget blindprov** (`research.md` §11, läst 2026-10-16): sex briefer byggdes utan skill, med en annan skill och med taste, och bedömdes blint av en modell med Awwwards-vikter. **Baslinjen utan skill fick högre medelbetyg i fyra av fem omgångar** (7,7 mot 6,6; 8,0 mot 7,1; 7,9 mot 6,9; 7,8 mot 7,7) och lika i den femte (7,5). Med skillen hade sidorna 0 underkända mätpunkter i skillens egen inspektör mot 8–13 utan. Förbehållen står i källan: en domare per brief och omgång, cirka en halv poängs brus, och domarna är modeller.

**Kvalitet och underhåll:**
- 97 719 stjärnor, 6 625 forkar, 20 bidragsgivare, 1 öppet ärende; skapat 2026-02-19, push 2026-10-14. Mycket aktivt; v2 är tre dagar gammal och oprövad i bredd.
- Ärendena är mest frågor (#106 "hur får man agenten att lyda skillen?"); inga kända fel rapporterade för v2 än.
- README har sponsorlänkar (bl.a. en API-återförsäljare med kampanjkod) och marknadsför skrivbordsappen TasteCode.

**Det bästa vi kan ta:**
- Inventeringen och konkurrenttestet (`SKILL.md` steg 1 och 4) – den skarpaste formuleringen av vår egen definition av generiskt.
- Typdetaljerna (`type.md` §3, §4, §7) och färgproportionerna (`colour.md` §3–§6).
- Bildbehandlingen (`imagery.md` §6) och scrimregeln.
- Rörelsens fyra frågor och tidsskala (`motion.md` §2–§3) – utan kravet på åtta element.
- Taken i `critique.md` §3 som idé: vissa fel sätter ett tak för helhetsbetyget.

**Var det hamnar hos oss:**
- `.claude/skills/yta/stilriktningar.md` (andra varvet): briefen läses först, reglagen, riktningen och proportionerna, det som fyller platsen och frågorna till en provsida. Måttet är måttstocken, inte särprägeln, eftersom tastes eget blindprov inte visar att skillen ger bättre sidor.
- `.claude/skills/yta/generiskt.md`: inventering och konkurrenttest som granskningsfrågor (passar måttstockens fråga 1–2).
- `typografi.md`: storleksgapet, spärrning och radavstånd per steg, de typografiska detaljerna.
- `farg.md`: proportionerna, accenten på handlingen (stämmer med G3), tonsteg mellan ytor.
- `detaljer.md`: understrykning, markering, optisk justering, bildbehandling.
- Inte riktningsskriptet, inspektören eller bildsökningen i kundbygget: ytan kommer ur kitet.

**Passar vår stack?**
- Reglerna är ramverksoberoende; `assets/base.css` är ren CSS. Med React och Tailwind tillåtna (BESLUT 2026-10-16) finns inga tekniska hinder.
- Skripten kräver Node 22+ och Chrome; `assets.mjs` kräver nätet men ingen nyckel. De körs inte här.
- **JavaScript per sida:** rörelselagret förutsätter skript (entréer via IntersectionObserver, `base.js` cirka 2 KB). Kravet på minst åtta rörliga element krockar med sparsam rörelse och med "ingen text som börjar osynlig" – tas upp med Johnny, stoppar inte.
- Översätt: `--bg/--surface/--ink/--muted/--accent/--accent-ink` → `--k-bg/--k-yta/--k-text/--k-dampad/--k-accent/--k-pa-accent`.

**Risker och flaggor:**
- Licens: MIT, ingen risk. Bildlicenserna kräver kreditering; CC BY-SA kräver dessutom att bearbetningar delas lika – ska stå i sajtens licenslista.
- Ingen telemetri i skillen enligt README; ingen inloggning eller betalvägg.
- **Krockar med Nortropic (vi vinner):**
  - Fri riktning per sajt mot grundregeln: ytan kommer ur kitet.
  - Färgfamiljerna i `rules.mjs` (cream: nyans 22–62°, mättnad ≥0,16, ljushet ≥0,88; terracotta: 6–30°, 0,38–0,85, 0,42–0,72) skulle sannolikt underkänna Varms beige mark och Djärvs orange accent ⚠️ (inte provkört mot kitens värden).
  - Förbud mot hårlinjer, 1px-ramar och skuggor i vila krockar med kitets axlar "radie och kantbredd" och "skuggor i minst två lager" och med `--k-linje`.
  - Överradsförbudet krockar med `--k-overrad-*` och G3.
  - "Sample details": skillen hittar på rumsnamn, rätter och priser för att visa full täthet. Hos oss kommer innehållet ur faktabasen och ärlighetsregeln gäller.
  - Studiens poäng kommer från modeller och från designgallerier, inte från småföretagens besökare.
- Krockar med andra skills: motsäger soft-skill (pillerknappar, överradspiller, glas) och minimalist (1px-ramar, pastelltaggar) i samma repo.
