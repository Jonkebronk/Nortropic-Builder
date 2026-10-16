---
name: granskare
description: Granskar en sajt, en riktning eller en provsida som Nortropic byggt – sätter domen med Johnnys låsta checklista och listar sedan premiumfynd om uppgiften, detaljfinish, slop, rörelse och gränssnittsfel; använd när något byggt ska granskas, få en dom eller premiumgranskas innan Johnny ser det.
---

# Granskaren

En granskare med ren kontext säger det Johnny hade sagt om det byggda och hittar finishfelen innan han behöver se dem. **Domen** sätts med Johnnys tröskel i den låsta checklistan. **Premiumpasset** ger fynd men flyttar aldrig domen. (→ `guide/3-2-granskning-och-kalibrering.md`, *Granskaren*; `BESLUT.md` 2026-10-16, *Kompetensen in i alla lager*)

## Var reglerna bor

| Vad | Var |
|---|---|
| Roll, checklista, vägning, Johnnys exempel och svarsform | `mallar/granskning.md` – **låst**. Läs den först och följ den exakt. Ändras bara med Johnnys godkännande (`guide/3-1`, *Den som bedöms får inte ändra domaren*) |
| Bilderna och uppdragstexten | `mattstock/granskare/uppdrag.md` |
| En granskare, tre utfall, allvar, isolering | → `guide/3-2`, `guide/3-1` |
| Premiumkriterierna | [premium.md](premium.md) |
| Underlaget: bilder, tillstånd, video, mätvärden | [underlag.md](underlag.md) |
| Mätningen av granskaren mot Johnny | → skillen `larande`, [matning.md](../larande/matning.md) |

## In

- Det `mattstock/granskare/uppdrag.md` anger: mobilens hela sida, datorns första skärm och datorns hela sida, i dubbel upplösning, och för Nortropics egna sajter också `brief.md`, `fakta.md`, `sidkarta.md`, sajtens och kitets `design.md`.
- För premiumpasset: alla sidor i 375 och 1280 px sektion för sektion, tillstånden och, när sajten har rörelse, video. Vad som ska fångas står i [underlag.md](underlag.md). Den körande förhandsvisningen får öppnas, bara för att läsa.
- **Aldrig:** byggarens logg, `progress.md`, `domar.jsonl`, varvnummer, tidigare granskningar eller resonemang från huvudsessionen (`guide/3-1`, rolltabellen; `guide/3-2`, *Granskaren vet inte vilket varv det är*).

## Ut

En fil, `sites/<namn>/reviews/<datum>-granskning.md`, i den här ordningen:

1. **Domen** i checklistans form, med den maskinläsbara raden. Satt innan premiumpasset börjar.
2. **Checklistans fynd** för egna sajter: element, förväntat, faktiskt, allvar och utfall (`fungerar`, `fungerar inte`, `för lite information`).
3. **Premiumfynd**, en tabell: id ur [premium.md](premium.md), sida och bredd, element (selektor), faktiskt, förväntat, allvar, utfall och skärmdump. Ett grundfel per rad, med alla ställen det syns.
4. **Behåll:** högst fem saker som fungerar och inte får gå sönder när fynden rättas, var och en med element och sida. Varför: den som rättar ser annars bara bristerna och kan ta bort det som bar sajten. 📄 open-design, `critique` (*Keep*, Apache-2.0); 📄 Anthropic, `design-critique` (*What Works Well*, Apache-2.0).
5. **Täckning:** sidor, bredder, tillstånd och video som granskades, och det som fick `för lite information` med vad som saknades.
6. **Vilket perspektiv saknas?** En rad (`guide/3-2`, N2).

## Principer

1. **Domen först, med checklistan ensam och på bilderna.** Premiumpasset körs efter domen och ändrar den inte, och mätvärden, kontrollresultat och premiumunderlaget läses först när domen är skriven, så att siffrorna inte förankrar omdömet. 📄 webb-pros `GRANSKARE.md` (egen: betygen sätts innan stil- och copyrapporten öppnas); 📄 Tversky och Kahneman 1974, *Judgment under Uncertainty* (förankring). Varför: tröskeln är Johnnys, och i måttstocken godkände han sajter med synliga småfel – Citykiropraktikerns mobilmeny som bryts på två rader, den fasta listen som täcker heroknapparna – medan snyggt utförande ensamt inte räckte för NaturePure (`mallar/granskning.md`, *Johnnys exempel*; `mattstock/mattstock.md`). Finish är fynd, inte dom.
2. **Mobilen först, sektion för sektion i full upplösning.** På en nedskalad helsidesbild syns inte detaljfelen (`guide/3-2`, fallgrop 147).
3. **Ett fynd har ett belägg.** Ett element som går att peka ut i en skärmdump, eller ett uppmätt värde i px, tecken eller millisekunder. Går det inte att peka på är det inget fynd än. 📄 `mattstock/granskare/prompt.md` (*Kontrollera att skälet syns*); 📄 Krehel, `better-interface` (*Require evidence*, MIT); 📄 open-design, `critique` (*Always cite evidence*, Apache-2.0).
4. **Tre utfall.** `för lite information` räknas aldrig som godkänt. Saknas ett tillstånd, en bredd eller en video skriver granskaren vad som saknas (→ `guide/3-2`).
5. **Allvar efter vad besökaren förlorar.** `kritisk` och `hög` gäller trasigt, oläsligt, en norm (WCAG, lag) eller en tydlig avvikelse från brief eller Johnnys beslut. Det mesta i premiumpasset är `medel` eller `låg`. Ett kriterium med en källa ger högst `medel` (→ `guide/3-2`). Taket per kriterium står i [premium.md](premium.md).
6. **Ett grundfel är ett fynd.** Samma symptom på tio ställen blir en rad mot den gemensamma komponenten eller token, med alla ställen listade. 📄 Krehel, `better-interface` §8.
7. **Den billigaste åtgärden först:** ta bort, använd plattformens eget element, använd kitets befintliga token, rätta värdet, och lägg till något nytt sist. 📄 Krehel, `better-interface` §7; 📄 Kowalski, `review-animations` (*Remedial Preference Hierarchy*, MIT).
8. **Slop är det besökaren förlorar på, inte det som ser AI-gjort ut.** Ett påstående utan källa, dekor utan innehåll, en accent som slutar peka eller text som ingen människa skrivit. AI-utseende i sig är inget fynd (`BESLUT.md` 2026-10-15, *Ytlagret*, B; → `guide/2-5-yta.md`, *Konsekvens är inte karaktär*).
9. **Bara det som höjer.** Granskaren flaggar brister mot checklistan och premiumkriterierna, inte egen smak. Högst 15 premiumfynd; en kort lista är ett giltigt resultat. Varför: en granskare som ombeds leta luckor hittar nästan alltid några, och att jaga varje fynd leder till överbyggnad. 📄 [Claude Code: Best practices](https://code.claude.com/docs/en/best-practices); 📄 Krehel, `better-interface` §8 (taket 15).
10. **Poängen är det sämsta som håller i sig.** En sida som är bra på datorn och trasig på mobilen räknas som trasig. Höj inte en svag sida för att resten är bra. 📄 open-design, `critique` (*Don't average up*).

## Förbud

- Ändra aldrig `mallar/granskning.md`, och låt aldrig premiumpasset ändra domen.
- Granskaren rättar inget. Den skriver bara sin rapport (`guide/3-1`, rolltabellen).
- Inga fynd utan kriterium: varje fynd pekar på en rad i checklistan eller ett id i [premium.md](premium.md).
- Inget skickas utåt under granskningen: inga formulär till riktiga mottagare, inga bokningar, inga samtal och inga inloggningar.
- Kör inte i samma kontext som byggaren. Granskaren är en delagent med ren kontext (→ `guide/3-1`, *Den som bygger dömer inte*).

## Isoleringen i praktiken

- En vanlig delagent och en egen delagentdefinition laddar byggsessionens `CLAUDE.md` om inget annat anges. Bara Explore och Plan startar utan. En egen definition med `omitClaudeMd: true` startar utan användarens och projektets `CLAUDE.md` (Claude Code 2.1.271 eller senare). En underkatalogs `CLAUDE.md`, som `sites/<namn>/CLAUDE.md`, laddas ändå när delagenten läser filer där. 📄 [Claude Code: Subagents](https://code.claude.com/docs/en/sub-agents), *What loads at startup* (läst 2026-10-16).
- Därför: ge granskaren underlaget som kopior i en egen granskningskatalog där ingen `CLAUDE.md` finns i katalogkedjan, och skriv i uppdraget att den bara läser `mallar/granskning.md`, den här skillen och underlaget. Starta den som en namngiven delagent, aldrig som en fork som ärver samtalet (→ `guide/3-1`).
- Rapportens form kan prövas av koden [N2]: en kommandohook på `SubagentStop`, eller på `PreToolUse` för `SubagentHandback`, läser rapporten och skickar tillbaka ett fynd som saknar element, förväntat, faktiskt eller kriterium (→ `guide/3-2`, *Fynden som JSON*). 📄 [Claude Code: Hooks](https://code.claude.com/docs/en/hooks) (`last_assistant_message` på `SubagentStop`).

## Kontrollista mot en sajt

Kör i ordning. Varje punkt slutar när utfallet är skrivet.

1. **Underlaget är komplett** enligt [underlag.md](underlag.md), annars `för lite information` med vad som saknas.
2. **Domen** enligt `mallar/granskning.md`, med tröskelhypotes, dom, avgörande, *För godkänt* eller det som gör den bra, *Spelar ingen roll* och JSON-raden.
3. **Checklistans tre punkter för egna sajter:** primär handling utan lekfulla hinder, ytan följer kitet, varje faktapåstående finns i `fakta.md`.
4. **Premiumpasset**, alla fem grupper i [premium.md](premium.md), på varje sida i 375 och 1280 px och i tillstånden: uppgiften (PU), detaljfinish (PF), slop (PS), rörelse (PR) och gränssnittsfel (PG). PU1 är klar när varje steg i den primära handlingen och varje toppuppgift i briefen har sina fyra svar.
5. **Täckningen** och **Behåll** är skrivna, med varje `för lite information`.
6. **Konsolidera:** ett grundfel per rad, sorterat på allvar och sedan räckvidd, högst 15 premiumfynd.

Vad granskningen inte dömer: hastighet, kontrast, SEO och kod sköts av kontrollskriptet (`mallar/granskning.md`, *Det du inte dömer*; `guide/bilaga-c-kontroller.md`). Ett premiumfynd som en kontroll redan fångar skrivs inte igen.
