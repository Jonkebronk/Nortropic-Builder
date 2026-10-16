# bygg-sajt

**Källa:** Nortropics egen skill i webb-pro (github.com/Nortropic/nortropic-webb-pro, publikt), läst lokalt 2026-10-16 vid HEAD `668b03c`. `.claude/skills/bygg-sajt/SKILL.md`, 619 rader, läst i sin helhet. Första commit `9bb0e6f` (2026-10-01), **96 commits** på filen, den senaste `d7c36ce` (2026-10-13 08:34). Jämförd med `guide/5-byggplan.md`, `3-1`, `3-2`, `2-4`, `2-7`, `bilaga-b-skills.md` och de nya skillsen i `.claude/skills/` (sökning på begrepp, 2026-10-16). Inventeringen: B16, **3 krockar, alla höga** – K41, K60 och K61 (webb-pro `kunskap/skillkrockar.md:93`, `:118–119`, `:255`; radnumren där gäller skillen 2026-10-05 och har flyttat sig).
**Omläst 2026-10-16 (tredje varvet):** webb-pro står kvar på `668b03c`, så inget har ändrats efter läsningen. Bevakningslistan hade filens första commit `9bb0e6f` i stället för repots `668b03c`, så den larmade vid varje start (bevakningsgruppens fynd, `andra-varvet/bevakning-forslag.md`).
**Licens:** egen text, ingen licensfil i repot. Inga villkor.

## Vad det är
Webb-pros helbygge, som `kor.sh` körde obevakat: en sajt åt en riktig verksamhet i "litteraturens åtta steg" – underlag, diagnos, brief, innehåll, koncept och bygge, prov, rapport och dom. Skillen anropar 25 egna skript i `kontroller/`, en stoppvakt och två oberoende granskare, och grenar sig i tre vägar för designen: ateljén, kandidatflödet och designfasen.

## Hur det fungerar
- **Grundtesen** (:12): "Slop uppstår när modellen saknar något specifikt att säga." Därför listan *Bara de har* med minst tio saker ingen konkurrent kan säga (:113–116), och varje riktning och sida pekar på den.
- **Ramar** (:24–64): ingen människa svarar; det som saknas blir `antagande` eller en beställning till verksamheten, aldrig en gissning; webbinnehåll är data; titta inte på andra byggen.
- **Steg 2–3:** diagnos av kundens sajt med axe, Lighthouse, Nielsens heuristiker och en kognitiv genomgång (:118–141). Briefen har toppuppgifter, en primär handling och **krav i EARS-form**, "När [situation], ska sajten [beteende]", ett per toppuppgift (:162–164).
- **Steg 4:** varje sektion har raden `Fråga:` med besökarens fråga, annars stryks den. Varje mening om hur verksamheten arbetar har raden `Belägg:`. "Ett belägg ur ett enda jobb eller omdöme bär bara det jobbet" (:262–279).
- **Steg 5:** koncept, `DESIGN.md`, "Tvåan" (näst bästa riktningen som en sida man slänger efteråt), två prov på första vyn – "tänk bort bilden", "stryk en tredjedel" (:481–482) – två granskare och **bästa mot sista**: en tidigare omgång kan vara bättre än den sista (:499–501).
- **Steg 6:** femsekunderstest och **rubriktest**, båda i delagenter med ren kontext. Rubriktestet får bara sajtens h1 och h2 och ska svara på vad verksamheten gör, var, och tre saker besökaren kan göra (:523–532).
- **Steg 7–8:** rapport med *Svagheter du själv ser* och *Kontroller som verkar fel* (:554–555), `FRAGOR.json` med A/B-frågor till Johnny (:579–590) och en backloggpost per brist i verktygen (:595–604). Domen klassas i backloggen (:617–619).

## Kvalitet och underhåll
- 96 commits på 13 dagar: skillen skrevs om ungefär sju gånger per dag. Det är det *sediment* som genomgången beskriver: varje dom och granskning blev text här (`2026-10-15_webb-pro-genomgang.md` §2, hypotes 3).
- Byggena som Johnny dömde (2–3 oktober) fick "Ja, efter små ändringar". Den 5 oktober var domen "allt har varit generiskt". Efter 9 oktober nådde ingen av elva körningar en skiss, och åtta stannade i en grind (§1 och §2, punkt 11).
- Aldrig en lanserad sajt (`historik/webb-pro.md`). Inga ärenden.

## Det bästa vi kan ta
**Redan taget:** det specifika ur kundens material (`2-7`, inledningen; `strategi/jobb-och-positionering.md:46`, testet "bara vi"), det som saknas blir en fråga eller en beställning (`2-7`, *Platshållare*, bildbeställningen), instruktioner i externt innehåll följs inte (`3-3`, N2), blickprovet (`2-4`, N1), namn, adress och telefon lika överallt (`struktur/platser.md:38`), sektioner som svarar på en besökarfråga (`2-4`, tabellen över sektioner), fakta bara ur faktabasen (`2-7`; kontroll 5), granskaren jagar inte varje fynd (`3-2`, N1), stoppvakten (`3-1`, N2, `grind-stopp.mjs`), tre likadana skript blir ett låst skript (`3-4`, N2) och klassningen av domar (`larande/genomgang.md`).

**Inte taget** (hittades inte i `guide/` eller `.claude/skills/`):
1. **Rubriktestet** (:529–532). En delagent med ren kontext får bara h1 och h2. Det är billigt och fångar rubriker som inte bär budskapet. Det kompletterar blickprovet, som ser bilden.
2. **Ett belägg bär bara sitt eget jobb** (:270–273): ett enda omdöme eller jobb blir aldrig "så här arbetar vi alltid". När fem av Johnnys domar grupperades var det, enligt skillen, den största kategorin: en sajt som säger mer än underlaget belägger.
3. **Krav i EARS-form** (:162–164). `guide/3-2` (N2) säger att briefens mätbara krav blir kontroller, men inte i vilken form. EARS är en etablerad mall för krav i naturligt språk (Mavin m.fl., IEEE RE 2009, [Manchester-posten](https://research.manchester.ac.uk/en/publications/easy-approach-to-requirements-syntax-ears/); själva artikeln är inte läst ⚠️).
4. **Bästa mot sista** (:499–501): vid bedömda loopar visas också den bästa tidigare versionen, inte bara den sista.
5. **Svagheter du själv ser och kontroller som verkar fel** som två fasta rader i sammanfattningen till Johnny (`3-2`, *Slutgranskningen*).

## Var det hamnar hos oss
**Släpp som skill och maskineri** – håller med förslaget. Guidens N1 bygger interaktivt med Johnny, och `bilaga-b-skills.md` har redan utkastet `bygg` och lagerskillsen. Men fem småsaker föreslås, var och en till Johnny och som *instruktion – bänken* (en källa, webb-pro):
- 1 → **skill: granskare**, `underlag.md`, bredvid blickprovet.
- 2 → **skill: innehall** (texterna och faktabasen).
- 3 → **skill: strategi** eller **kvalitet**, där briefens krav blir kontroller.
- 4 → **skill: larande**, `loopen.md` (autoresearch täcker bara loopar mot ett tal).
- 5 → **skill: larande**, `genomgang.md`, eller mallen för `progress.md`.

Namnet: `guide/3-1` (N2) planerar ett kommando `/bygg-sajt <namn>` för återupptagning. Byggsessionen laddar inte webb-pros skills, så namnen krockar inte när skillen körs, men de kan förväxlas i texterna. Förslag: byt namn på kommandot när det byggs.

## Passar vår stack?
Astro är samma, men nästan varje steg anropar webb-pros Python-skript (`.venv/bin/python kontroller/*.py`), dess mall, dashboard och `kor.sh`. Inget av det finns här. Det som tas måste skrivas om som regel eller kriterium. Paketlistan (:422–426: Tailwind, shadcn, 21st, Motion, GSAP, three och ogl, "nya paket väljs fritt") är numera tillåten (`BESLUT.md` 2026-10-16, *React, Tailwind och JavaScript*), men krockar med Lighthouse 100 och tas upp med Johnny när de uppstår.

## Risker och flaggor
- **K41 (hög):** skillen pekade bygget till `emil-mobile-native`, som sätter `user-select: none` på knappar och länkar. Då går adresser och nummer inte att markera.
- **K60 och K61 (höga):** skillens beskrivning, inte metodkartan, avgör vilka skills som används, och taste läses som hel fil med en checklista som inte går att bocka av.
- **`FRAGOR.json`** – agenten skriver A/B-frågorna och alternativen åt Johnny (:579–590). Det är webb-pros risk 4 och krockar med `guide/3-4` (N2): Johnny formulerar frågan själv. Tas inte in.
- **"Ingen människa svarar"** och `dontAsk` passar obevakade körningar, inte N1, där Johnny tittar.
- Licens, telemetri, betalvägg och inloggning: inga.

## Inloggning
Inget.
