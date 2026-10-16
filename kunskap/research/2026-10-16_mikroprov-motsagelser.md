# Mikroprov: motsägelserna A, B och C i skillsen

**Datum:** 2026-10-16, kväll. **Metod:** `.claude/skills/larande/skills.md`, *Mikroprov av formuleringen*.
- En ny kontext per körning, med fem körningar per arm.
- Kontrollen är den gamla texten, ur `HEAD` före ändringen, och den nya armen är den ändrade texten. Båda armarna läste skillen ur en kopia i scratch med samma uppdrag.
- Svaren fick slumpade id. A poängsattes med ett skript, och B och C lästes i blandad ordning utan id innan armarna avslöjades.
- Beslutet: `BESLUT.md` 2026-10-16, *Motsägelserna i skillsen*.

## A: höjden på första vyn (`skelett`)

**Uppgift:** bygg första vyn för en påhittad målerifirma i en småort, mobilen först.

**Fel:** en höjd i viewport-enheter (`vh`, `svh`, `dvh` eller `lvh`) på första vyn.

| Arm | Fel |
|---|---|
| Gammal text (`layout.md`: `min-height: 100svh`) | **5 av 5** |
| Ny text (ingen höjd i viewport-enheter, princip 5) | **0 av 5** |

Fyra av de gamla svaren kombinerade raden med princip 5 till `min(calc(100svh − sidhuvudet − en titt), tak)`. Det håller nästa sektion synlig, men det är fortfarande ett golv i viewport-enheter.

**Utfall:** den nya texten behålls. Den tog bort felet i 5 av 5, och kontrollen visade felet i 5 av 5.

## B och C: avstavning och accentens andel (`granskare`)

**Uppgift:** bedöm ett utdrag mot PG5 och PS3. Utdraget hade ett långt sammansatt ord som spräckte rubriken i 320 px, och 9 % accent i första skärmen, bara på handlingar.

**Fel:**
- **B:** `hyphens: auto` föreslås för rubriken.
- **C:** andelen över cirka 5 % räknas som fynd.

| Arm | B-fel | C-fel | PS3-fynd om konkurrens med den primära handlingen |
|---|---|---|---|
| Gammal text | 0 av 5 | 0 av 5 | 1 av 5 |
| Ny text | 0 av 5 | 0 av 5 | 5 av 5 |

**Kontrollen visade inte felen B och C.** Den gamla granskarskillen säger redan att lagerskillen går före vid krock, och agenterna läste `yta/typografi.md` och `yta/farg.md`. Fyra av de gamla svaren påpekade själva krocken.

**Utfall:** ändringarna B och C behålls som samordning enligt Johnnys beslut, men en effekt på beteendet är inte belagd för de fel de skulle rätta.

Den nya PS3-texten (*"accent som konkurrerar med den primära handlingen"*) ändrade däremot beteendet: alla fem nya svar pekade ut att tre fyllda accentknappar i första skärmen konkurrerar, mot ett av fem gamla. Det stämmer med skelettets regel om högst en primär handling per vy och att knapplisten inte dubblerar knappar som redan syns (`skelett/SKILL.md`, kontrollpunkt 5). Om fyndet är rätt avgör Johnny på en sajt.

## Kostnad

- 20 körningar med 81 000–122 000 token var, ungefär 1,9 miljoner token totalt.
- 1,5–5,5 minuter per körning.

Svaren ligger i sessionens scratch (`mikroprov/svar/`) och följer inte med repot.
