# Mikroprov: tre skillrader ur frågelistan (punkterna 43 c, 54 och 56)

**Datum:** 2026-10-16–17, natt. **Uppdrag:** stående uppdraget, punkt 3 (`BESLUT.md` 2026-10-16, *Frågelistan efter tredje varvet avgörs*). **Metod:** `.claude/skills/larande/skills.md`, *Mikroprov av formuleringen*, med kontrollen först. Kontrollen är skillen i `HEAD`; den nya armen har en kopia med den föreslagna raden. Varje körning hade en egen katalog med slumpat namn och skrev svaret till fil. Kriterierna skrevs före svaren, och bedömningen gjordes med skript, eftersom alla tre felen går att läsa maskinellt.

## Utfallet

| Punkt | Skill | Uppgift | Felet | Kontrollen | Ny text | Beslut |
|---|---|---|---|---|---|---|
| 56 | `struktur/platser.md` | h1 för två kontorssidor hos en trädvårdsfirma med tre tjänster | En kontorssida heter efter en av tjänsterna | 0 av 5 | 0 av 5 | Struken: kontrollen visade inte felet |
| 54 | `strategi/SKILL.md` | Briefens rubrikskelett utan guiden och mallarna | Inte de sex rubrikerna, eller ingen rörelsebudget | **5 av 5** | **0 av 5** | Behållen |
| 43 c | `innehall/SKILL.md` | Johnny pekar på rad 3 av sex | En annan rad än rad 3 ändras | 0 av 5 | – | Struken: kontrollen visade inte felet |

- **56:** alla tio svar skrev *Trädvård i Luleå* och *Trädvård i Piteå*, också med dagens rad *"Rubrik med tjänst och ort"*. Baslinjeprovet såg felet en gång av tre (`kunskap/research/2026-10-16_baslinjer-1.md`). Uppgiften sa *trädvårdsfirma*, vilket kan ha lett svaren till kategorin. Raden står kvar oförändrad.
- **54:** kontrollens svar saknade rörelsebudgeten i alla fem, två saknade *Primär handling*, och flera lade till *Det praktiska* eller *Belägg* som N1-rubriker. Den nya armen hade alla sex rubrikerna och rörelsebudgeten under *Ton och intryck* i alla fem. De sex rubrikerna är desamma som i `mallar/brief.md`.
- **43 c:** alla fem kontrollsvar ändrade bara rad 3 och nämnde de andra felen (*Klicka … nedan*, klockslagen) efter `---` utan att rätta dem.

## Kostnad

25 körningar, cirka 1,8 miljoner token, 20–65 sekunder per körning. Kontrollen först sparade fem körningar (43 c).

Svaren, kriterierna och nyckeln ligger i sessionens scratch (`mp6/`) och följer inte med repot.
