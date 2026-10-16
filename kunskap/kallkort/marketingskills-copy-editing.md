# marketingskills: copy-editing

**Källa:** https://github.com/coreyhaines31/marketingskills, sökvägen `skills/copy-editing/`, repots HEAD `365b412152b9542499ca1439426f7fc3cc92bb65` (2026-10-15), oförändrad 2026-10-16 (`git ls-remote`). Skillen är version 2.2.0 och ändrades senast i `158bd3af27b00323d5a950c033efa0256f7aa426` (2026-10-15, release 2.11.35). `SKILL.md` i nedladdningen har samma blob som på GitHub (`e5fdc0e7`). Lästa i sin helhet: `SKILL.md` (491 rader), `references/checklist.md` och `references/content-refresh.md`. `references/plain-english-alternatives.md` (engelsk ordlista) är läst till rubrikerna och källorna, och `evals/evals.json` till de nio testfallens frågor. Ärendena är sökta efter *copy-editing*. Systerskillen `copywriting` har eget kort: `marketingskills-copywriting-och-brand-review.md`.
**Licens:** MIT, © 2025 Corey Haines. Diagnoslägena är enligt `checklist.md` själva lånade från Profounds och Wispr Flows skills (MIT). Vi skriver med egna ord på svenska och kopierar ingen text, så inget krav utlöses.

## Vad det är
En skill som redigerar befintlig marknadstext. Den väljer först ett läge, kör sedan sju genomgångar (*Seven Sweeps*) och avslutar med en kontroll av AI-tecken.

## Hur det fungerar
- **Lägen först:** A, tomt eller slarvigt (bygg om från fakta); B, en verklig röst (återställ den och behåll skribentens ord); C, punktändring. *"A point edit skips the Seven Sweeps"*: bara det efterfrågade ändras, de ändrade raderna lämnas med ett skäl, och ett allvarligt problem på annat ställe nämns på en rad utan att rättas.
- **Låt-bli-testet** i alla lägen: är ändringen mätbart bättre eller bara annorlunda? Ändringar utan skäl tas tillbaka.
- **Sju genomgångar** i ordning, och efter varje går man tillbaka och kontrollerar de tidigare: tydlighet, röst och ton, *So What* (varför ska läsaren bry sig), *Prove It* (belägg för varje påstående), specificitet, känsla (*Heightened Emotion*) och *Zero Risk* (hinder och invändningar nära knappen).
- **AI-tecken** efter genomgångarna: kontrastfigur, negationslista, svans efter komma, retorisk fråga, kolon som avslöjar, färdiga fraser och långt tankstreck i kort text. Rätta från fakta, inte med synonymer; saknas faktum skrivs `[NEED: ...]`.
- **Expertpanel:** 3–5 påhittade experter sätter 1–10 tills alla ger 7 och snittet är 8.
- **Uppfräschning** (`content-refresh.md`): luckanalys mot fem konkurrenter i sökresultatet, en synlig *"Last updated"*-rad och en takt (prissidor varje kvartal).

## Kvalitet och underhåll
- Repot: 55 041 stjärnor, 8 158 forkar, 49 bidragsgivare, 25 öppna ärenden och PR, senaste push 2026-10-15 (GitHubs API 2026-10-16). Skillen har ändrats i 22 commits; fyra av dem 2026-10-15 (lägen och punktändring).
- Ärenden: [#614](https://github.com/coreyhaines31/marketingskills/pull/614) införde AI-tecknen (2026-10-02), [#846](https://github.com/coreyhaines31/marketingskills/pull/846) lägena (2026-10-15). En separat *no-slop*-skill ([#575](https://github.com/coreyhaines31/marketingskills/pull/575)) stängdes utan att slås samman. Det enda öppna ärendet som nämner skillen, [#497](https://github.com/coreyhaines31/marketingskills/issues/497), säger att triggningen mellan närliggande skills, bland dem copywriting och copy-editing, är repots verkliga problem: *"routing is our real failure mode"*.
- **Fel och motsägelser i källan:** *So What*-exemplet har både långt tankstreck och en svans efter komma, som AI-kontrollen själv förbjuder. Tabellen för specificitet (*"2,847 teams"*) lockar till påhittade siffror, trots `[NEED: ...]`-regeln.

## Det bästa vi kan ta
**Redan taget:** *So What* som *Nytta, inte effekt* (`.claude/skills/innehall/text.md:46`), *Prove It* för citat som bara berömmer firman (`rost.md:26`), låt-bli-testet som princip 13 (`innehall/SKILL.md`), och AI-tecknen, som copy-editing delar med `copywriting`, i `ai-monster.md` (mönster 2, 3 och 14).

**Inte taget** (sökt i `.claude/skills/` och `guide/` 2026-10-16):
1. **Punktändringsläget.** När Johnny ber om en ändrad rad ändras bara den, och annat som är fel nämns på en rad. Det passar N1, där Johnny dömer varje steg (*en ändring i taget*, `CLAUDE.md`).
2. **Zero Risk:** besökarens tvekan besvaras vid knappen, med det som finns i faktabasen (pris efter besök, avbokning, svarstid). Det stöder andra varvets lucka 2 (`andra-varvet/byggguider-jamforelse.md`) med en källa till.
3. **Gå tillbaka efter varje genomgång:** en rättelse för belägg får inte förstöra tydligheten.

## Var det hamnar hos oss
Placeringen **skill: innehall** är beslutad: fältet `beslut` säger *"Johnny 2026-10-16 omkring 17.40: 'Ja på alla'"*. Källan står i `.claude/skills/innehall/kallor.md` (*Skills och metoder*, commit 365b412) och i `text.md` och `rost.md`.

Förslag till Johnny: punkt 1 som princip i `innehall/SKILL.md`, och i granskarens instruktion när Johnny pekar på en enskild rad. Punkt 2 i `text.md` tillsammans med lucka 2. Båda är *instruktion – bänken* (en källa).

## Passar vår stack?
Ja, som metod. Skillen är skriven för SaaS: *Free trials*, *Cancel anytime* och *No credit card required* blir hos oss *Boka*, *Ring* och uppgifter ur faktabasen. Den engelska ordlistan byts mot klarspråk (`text.md`).

## Risker och flaggor
- **Heightened Emotion** (*"Fear of missing out"*, *"Pain of the current state"*) passar inte saklig text om vård och kan bli falsk brådska (W3C WSG 2.6, utkast; ⚖️ marknadsföringslagen, tolkning). Tas inte.
- **Expertpanelen** låter modellen sätta betyg på sig själv med påhittade experter. Det krockar med granskaren: domen följer måttstocken (`BESLUT.md` 2026-10-15, *Granskaren – måttstocken först, dom skild från fynd*). Tas inte.
- **Uppfräschningens datum:** *"Last updated"* och *"Update all dates"* får bara ske när innehållet faktiskt ändrats (Google, → `google-helpful-content.md`).
- **Breda triggers** (*"proofread"*, *"make it sound human"*) skulle tävla med `innehall`. Installeras inte.
- Ingen telemetri eller betalvägg i skillen; README marknadsför författarens tjänster (se systerkortet).

## Inloggning
Inget.
