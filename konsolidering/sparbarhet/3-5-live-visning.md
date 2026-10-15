# Spårbarhet: `guide/3-5-live-visning.md`

Skrivet 2026-10-15 vid konsolideringen. Radnummer avser `historik/IMPLEMENTERINGSGUIDE-v0.74.md`.

## v0.74

| v0.74-avsnitt (rader) | Var det hamnade (fil, avsnitt) | Struket och varför | Flyttat till annan fil |
|---|---|---|---|
| §6 Mål (858) | 3.5 ingress, kopplad till beslutet 2026-10-15 (synligt i varje steg) | – | – |
| §6.1 Två ytor (860–866) | 3.5 ingress | Tabellen ersatt av en mening | – |
| §6.2 Vad mods är (868–876) | 3.5 *Mods*, fakta och [N4]-punkterna | "Alltid igång, till skillnad från skills" och "tillåt hot reload" strukna som detaljer; "skapas via prompt" står som `/plugin-authoring` under versionskravet | Inbyggda exempel och claudemod.com → `bilaga-a-verktyg.md` |
| §6.2 Lyft från bänken (878–881) | 3.5 *Mods*, fakta (två källor plus dokumentationen) | – | Mods i pluginet → `3-4` |
| §6.2 Verifierat (883) | 3.5 *Mods* [N4], version och var ritningen syns | ⚠️ löst (verifieringen §1) | – |
| §6.2 Vilka mods – utgå från sessionsloggarna (885) | 3.5 *Mods* [N4] | – | – |
| §6.3 Förhandsvisning (887–893) | 3.5 *Förhandsvisning i webbläsaren* [N1], [N2], [N4] | – | Monitor (889) → `3-3` (D21); `stitch serve` (891) → `2-5-yta.md` |
| §6.4 Flödespanelen (895–918) | 3.5 *Mods*, flödespanelen [N4], reserv utan mods [N2], cachen [N4] | Skissen i text (898–911) ersatt av en lista; faserna 0–6 i skissen bygger på v0.74:s flöde | Formatet för `state.json` → `3-1-orkestrering-och-roller.md` |
| §6.5 Antagandegranskning (920–932) | 3.5 *Förhandsvisning*: antagandena syns [N1], loggas och stoppar markering som klar [N2] | JSON-exemplet struket: formatet bestäms i `3-1`. Grinden omformulerad till stoppvillkor: det är Johnnys markering, inte ett kvalitetskriterium (grind eller instruktion, `guide/README.md`) | Domaren för riskbeslut → `3-1` |
| §6.6 Andra mods (934–940) | 3.5 tabellen *Fler mods* | Design Picker för Inspo-riktningar och Stitch-varianter struken: riktningarna är stilkit som visas som riktiga sidor (beslut 2026-10-15) | – |
| §6.6 Agentvyn (942) | 3.5 sista punkten [N4] | ⚠️ löst (verifieringen §9) | – |
| §6.9 Fler mods (944–951) | 3.5 tabellen *Fler mods* | – | Kopplingen till åtkomst per kund → `3-1`, `2-9` |
| §6.8 Variate (953–961) | 3.5 *Variate* [N4] | Nivån satt till N4 som i `2-8`, `2-7` och `5-byggplan.md` | Verktyget → `2-5-yta.md`, `bilaga-a-verktyg.md`; kontrollen i produktionsbygget → `2-8-teknik-och-kvalitet.md`; slutgranskningen → `3-2` |
| §6.7 Prompt för flödespanelen (963–964) | 3.5 *Mods*, flödespanelen | Sökvägen `sites/<namn>/state.json` ersatt av `<tillståndsfilen>` tills `3-1` låst formatet | – |
| §8.3 Fokusläge (1215) | 3.5 *Förhandsvisning* [N1] ⚠️ | – | – |
| §7.4 Inkorgen i panelen (1113) | 3.5 *Mods*, flödespanelen | – | Klassningen av meddelanden → `3-3` |
| Fas 1b Planvy (326) | 3.5 *Planvyn* [N2] (vid ommärkningen) | "Orkestreraren öppnar" ersatt av "Claude"; "kapitlen" ersatt av sidkartan (briefen har sex rubriker, sidkartan egen fil) | Låsningen och funktionslistan `checkpoints.json` → `3-1`; stoppet för sidkarta och kontroller → `3-2` |
| Fas 1b Täckningstabell (335) | 3.5 *Planvyn*, täckningen [N2] (vid ommärkningen) | Rött som markeringsfärg struket som detalj | *Inget släpps tyst* (under bygget) → `3-1` |
| Fas 1b Planvyns övriga innehåll: tre riktningar (327), kvarstående oenigheter från den adversariala granskningen (343) | – | Riktningarna visas inte i planvyn: de är stilkit som visas som riktiga sidor (beslut 2026-10-15). Oenigheterna följer den adversariala granskningen, som inte bor här | Riktningarna → `2-5-yta.md`; den adversariala granskningen av planen → `3-2` (granskningen 1.5 föreslår *Eval*, N4) |
| §5.4 Stopp 1 via planvyn (837) | 3.5 *Planvyn* | – | Stoppen → `3-2` |
| §12 `planvy` i skilltabellen (1835) | 3.5 *Planvyn* | – | `bilaga-b-skills.md` rad 110 hänvisar hit men märker N4; N2 gäller här |
| §14 Planvyn: egen sida eller flödespanelens reserv (2176) | 3.5 *Planvyn*, hänvisning | – | Frågan → `bilaga-e-oppna-fragor.md`, avsnitt 3 |

## Fallgropar ur §13

| Nr | Var |
|---|---|
| 7 Mods syns inte i VS Code-tillägget | *Mods*, var ritningen syns |
| 24 Planfiler i JSON är svåra för människor att granska | *Planvyn* [N2] (vid ommärkningen) |
| 8 Ny mod försvinner efter sessionen | *Mods*, dev-mods |
| 45 Arbetsverktyg följer med till produktion | *Variate* (kontrollen i `2-8`) |
| 58, 185 Förhandsadresser läcker | *Förhandsvisning*, `127.0.0.1` (Access → `2-8`) |
| 137 Cachen kallnar mitt i en lång körning | *Mods*, cachen |
| 138 Kundmöte med andra kunders data synlig | *Fler mods*, Recording Mode [N3] |
| 190 Mods före 2.1.287 | *Mods*, version |

## Kartan och researchen

- `kunskap/research/2026-10-14_claude-code-verifiering.md` §1 (mods: format, version, var de syns, dev-mods, avstängning) och §9 (agentvyn).
- `kunskap/research/2026-10-14_stitch-och-verktyg.md` (Variate bara för utveckling).
- `BESLUT.md` 2026-10-15 (synligt i varje steg) och `guide/README.md` princip 1.
- Konsolideringsanalysen §7.3 (mods och flödespanel på nivå 4) och §5.2 (mods skjuts upp tills Claude Code uppdaterats).

## Ommärkning 2026-10-15

Efter `konsolidering/granskning-v1.0.md` och tillägget 14.30 i `konsolidering/skrivregler.md`. N1 gick från 5 punkter till **1**.

**Kvar i N1:** *Sajten syns i webbläsaren medan den byggs, och bara lokalt* – dev-servern före sajtens filer och `127.0.0.1` sammanslagna till en punkt.

**Flyttat från N1 till N2** (inget struket): fokusläget av under bygget (⚠️ kvar), *antagandena syns*. Granskarens skärmdumpar [N2] och galleriet [N4] är nu två punkter. Omärkta listpunkter blev löptext: hänvisningen till Monitor och Stitch under *Förhandsvisning* och faktastycket om vad en mod är.

**Granskningsfynd som åtgärdats:**

| Fynd | Åtgärd |
|---|---|
| 1.5 och 2.3 punkt 7: planvyn saknades (bilaga B hänvisade hit) | Nytt avsnitt *Planvyn* [N2] ur v0.74 fas 1b rad 326 och fallgrop 24, med täckningstabellen (rad 335) som andra punkt; den öppna frågan om egen sida eller reservläget → `bilaga-e-oppna-fragor.md`, avsnitt 3 |
| 2.2 Variate (`2-5`, `3-5`, `2-8`) | Verktyget bor här, kontrollen i `2-8`; oförändrat här |
| 2.4 Variate i kundbygget eller bara i biblioteket | Hänvisning till `bilaga-e-oppna-fragor.md`, fråga 2.9 |
