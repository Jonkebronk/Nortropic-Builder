# Källkort

Ett kort per post i `inventering/inventering.json`, och några till, skrivna 2026-10-16 på Johnnys uppdrag: *"websearchar och läser noggrant varje github för alla kompetenser, skills, mcps etc så du har fullständig förståtelse och kontext"* (`BESLUT.md` 2026-10-16, *Kompetensen in i alla lager*).

Varje kort har en fast mall:
- källa och version
- licens
- vad det är och hur det fungerar
- kvalitet och underhåll
- det bästa vi kan ta och var det hamnar hos oss
- om det passar vår stack
- risker och flaggor

Det som inte gick att läsa är märkt ⚠️.

`inventering/kallor-bevakning.json` listar repon och den commit som lästes. Startsäkringen (`skript/startsakring.sh`) säger till när ett repo har ändrats, och då läses kortet och skillen om.

**Bevakningsfilen** har en rad per repo: `namn`, `repo`, `commit` och `kort`, en lista med de kort som bygger på repot. `commit` är repots HEAD när kortet lästes, med full SHA, inte den commit där en enskild fil senast ändrades. Annars larmar startsäkringen vid varje start fast inget ändrats (rättat 2026-10-16 i tredje varvet för webb-pro, design-critique och material-color-utilities).

**När ett repo har ändrats** läses ändringen i original, med GitHubs jämförelse mellan den lästa commiten och den nya. Kortet får en rad *Omläst <datum>* under *Källa*: vad som ändrats, om det rör det vi läste, och vad som ändrades i kortet. Sedan flyttas `commit` fram i bevakningsfilen (`.claude/skills/larande/bevakning.md`, *När en källa har ändrats*).
