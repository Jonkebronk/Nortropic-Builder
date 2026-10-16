# frappe/builder

**Källa:**
- https://github.com/frappe/builder (grenen `develop`), HEAD `a5b1eab` (2026-10-16), tagg `v1.35.1`.
- Läst 2026-10-16: hela `README.md`, `skills/frappe-builder/SKILL.md` och `LICENSE`.
- Inte lästa ⚠️: skillens delfiler `reference/blocks.md`, `reference/data-and-scripts.md`, `reference/components.md` och `reference/live-and-cached.md`, och agentens källkod. De gäller Frappes blockmodell, som inte tas in.

**Licens:** MIT, © 2023–2026 Frappe Technologies Pvt. Ltd. Licenstexten följer med vid kopiering. Vi tar bara principerna, med egna ord.

**Vad det är:** En visuell sidbyggare för Frappe Framework (Python och Vue), med en AI-agent som heter *Bob*. Repot har också en skill som låter en kodagent som Claude Code redigera, bygga och publicera Builder-sidor via `frappectl`.

**Hur det fungerar:**
- **Agenten** enligt README:
  - Den *"grounds itself in your site instead of guessing"*. Den läser befintliga sidor och följer deras designspråk.
  - Den återanvänder komponenter och temats tokens och placerar nya sidor i ruttstrukturen.
  - Den *"researches facts online rather than inventing them"*.
  - Läsningar följer användarens behörigheter, och känsliga ändringar väntar på godkännande.
  - Varje AI-ändring går att ångra.
- **Skillen:**
  - Läs en sida först och återanvänd dess tokens, typsnitt, bredder och komponenter.
  - Gör en komponent bara när samma struktur upprepas och ingen befintlig passar.
  - Bara sidans blockträd har utkast. Allt annat är live när det sparas.
  - Den första ändringen sparar en ögonblicksbild, *"Before agent edit"*, som går att återställa.
  - Lintfel i block man inte rört rapporteras.
  - Klart är när lintningen är ren i det som ändrats, förhandsvisningen visar ändringen och människan vet vad som är live och vad som är utkast.

**Kvalitet och underhåll:** 2 436 ★, 4 964 commits, cirka 53 författare, 2 593 commits sedan årsskiftet. Mycket aktiv, med Frappe Technologies som bolag bakom. Kända problem är inte sökta ⚠️, eftersom bara principerna tas.

**Det bästa vi kan ta:** Sju principer för ändringsagenten (`drift/andringar.md`, *Ändringsagentens principer*):
1. Läs det som finns först.
2. Återanvänd sektioner och tokens. Gör något nytt bara när inget befintligt passar.
3. Placera det nya i strukturen.
4. Hitta inte på fakta.
5. Känsliga ändringar väntar.
6. Allt går att ångra.
7. Säg vad som är live och vad som är utkast, och rapportera fel du inte orsakat.

**Var det hamnar hos oss:**
- Skillen `drift`, `andringar.md`. Beslut: **skill: drift**.
- En skillnad: Frappes agent söker fakta på nätet. Hos oss blir research aldrig ett faktum om kunden. Det som saknas blir en fråga (`guide/2-7-innehall.md`).

**Passar vår stack?** Plattformen gör det inte: Frappe är Python, Vue och en egen databas, medan vi har Astro statiskt i Git. Principerna gör det. De översätts så här:
- Frappes utkast och ögonblicksbild blir hos oss gren, PR och Workers versioner.
- Frappes tokens blir kitets roller.
- Frappes komponenter blir bibliotekets sektioner.

**Risker och flaggor:**
- Frappe-skillen startar en tunnel och sätter administratörslösenord. Den är skriven för deras miljö och ska inte köras eller installeras hos oss.
- Inga licensproblem för principerna.

**Inloggning:** Repot är publikt och läst. Frappe Cloud och en Builder-sajt kräver konto. Det behövs inte, eftersom bara principerna tas.
