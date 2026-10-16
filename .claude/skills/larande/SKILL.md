---
name: larande
description: Gör flödet bättre mellan sajterna utan att Johnnys ord blir mekanik – genomgången efter en sajt, förslag på var rättelser hör hemma, mätningen av granskaren, nya eller ändrade skills och provet med och utan, intag av nya verktyg och loopar med /goal eller Stop-hook; använd efter en sajt, när en skill, kontroll eller granskare ska ändras eller mätas mot en baslinje, när ett verktyg bedöms, eller när arbete ska köras i loop.
---

# Lärandet

Varje sajt ska göra nästa bättre. Det Johnny rättar, det granskaren missar och det som gjordes för hand blir **förslag** med rätt hemvist. Johnny beslutar. En ändring behålls bara när den mätts mot en **baslinje** och inte blev sämre. (→ `guide/3-4-larande-och-underhall.md`; `guide/5-byggplan.md`, *Efter varje sajt*; `guide/README.md`, princip 7–10)

## Var reglerna bor

| Vad | Var |
|---|---|
| Lärdomar blir förslag, `CLAUDE.md`, rensning vid ny modell, skills tak och test, bevakning | → `guide/3-4` |
| Genomgången efter varje övningssajt | → `guide/5-byggplan.md`, *Övningssajterna* |
| Loopen, läget i filer, belägg, grindkontrollen, stoppvillkor | → `guide/3-1-orkestrering-och-roller.md` |
| Kalibrering, eval, provsajten ("Benchy") | → `guide/3-2-granskning-och-kalibrering.md` |
| Hur skillen arbetar per jobb | delfilerna nedan |

## Jobben

| Jobb | Delfil | Ut |
|---|---|---|
| Genomgången efter en sajt | [genomgang.md](genomgang.md) | `sites/<namn>/genomgang.md` med förslag G1… |
| Mätningen av granskaren | [matning.md](matning.md) | en mätrapport med TPR, TNR och säkra mot osäkra domar |
| Loopar och långa körningar | [loopen.md](loopen.md) | ett valt mönster med mått, tak och belägg |
| En ny eller ändrad skill | [skills.md](skills.md) | skillen och provet med och utan |
| Baslinjen för våra egna skills | [baslinje.md](baslinje.md) | med- och utan-arm per skill, med påståenden och utfall |
| Intag av ett nytt verktyg, repo eller en skill | [bevakning.md](bevakning.md) | ett källkort och en dom |

## In

- `sites/<namn>/domar.jsonl` (Johnnys domar med `varfor` och `for_godkant`), `progress.md` (steg, tid, det som gjordes för hand), granskarens rapporter, kvalitetsgranskningen och kundsvaren märkta `claude-som-kund`.
- `BESLUT.md` för det Johnny redan avgjort, och guiden för var en regel hör hemma.
- Firmans namn och personuppgifter stannar i `sites/`. Det som skrivs i repot är allmänt.

## Principer

1. **Ingen lärdom ändrar något av sig själv.** Allt blir förslag; Johnnys ord skrivs ordagrant i `BESLUT.md` när han säger ja (→ `guide/3-4`, N1; princip 10).
2. **Klassa innan du föreslår,** på två axlar. *Räckvidd:* sajtbeslut, smak, hypotes eller generell rättelse – bara den sista blir en gemensam regel; är slaget oklart blir det sajtbeslut eller smak. *Orsak:* process, kontext, regel eller kod – den avgör hemvisten, billigaste stället först (→ `guide/3-4`, *Orsaken klassas*, *Billigast först*). 🔧 Räckvidden ur webb-pros `backlog`-skill (egen, "en synpunkt på en kund ska inte bli nästa kunds instruktion").
3. **Röd först.** Se agenten göra fel utan ändringen innan ändringen skrivs, och kör sedan samma fall med den. Utan en baslinje vet ingen om ändringen lärde ut rätt sak. 📄 obra/superpowers, `writing-skills` (MIT); 📄 Anthropic, `skill-creator` (Apache-2.0, med och utan skill); 📄 [Skill authoring best practices](https://platform.claude.com/docs/en/agents-and-tools/agent-skills/best-practices) (*Build evaluations first*).
4. **Belägg före påstående.** Ett "klart" eller "bättre" har kommandot och dess utdata, eller en skärmdump, bredvid sig (→ `guide/3-1`, *Belägg och status*). 📄 obra/superpowers, `verification-before-completion`; 📄 Simon Willison, [Showboat](https://github.com/simonw/showboat) (verklig utdata inspelad, Apache-2.0).
5. **Full autonomi bara med entydigt mått.** Bygget, kontrollskriptet, axe och Lighthouse får loopas till grönt. Design och text loopas aldrig till "klart" utan Johnny (→ `guide/README.md`, princip 7; [loopen.md](loopen.md)).
6. **Varje loop har ett tak** och lämnar över till Johnny med det som återstår (→ `guide/3-1`, *Loopen*, *Stoppvillkor*).
7. **Läs transkripten och skärmbilderna, inte bara siffran.** En siffra visar att något ändrats, läsningen visar varför. 📄 Anthropic, [Demystifying evals for AI agents](https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents); 📄 Hamel Husain, [Using LLM-as-a-judge](https://hamel.dev/blog/posts/llm-judge/).
8. **Enklare vinner.** Det som tas bort utan att resultatet blir sämre är en vinst. En kontroll som aldrig säger nej prövas (→ `guide/3-4`, *Kontroller åldras*). 📄 [karpathy/autoresearch](https://github.com/karpathy/autoresearch), `program.md` (*Simplicity criterion*, MIT).
9. **Tre gånger för hand, sedan kandidat** (→ `guide/README.md`, princip 8; `5-byggplan.md`). Johnnys beslut 2026-10-16 att bygga lagerskillsen nu går före för dem; provet med och utan gäller ändå.
10. **Tiden skrivs där den går åt.** Klocktid och Johnnys tid per steg och per sidospår i `progress.md`, annars går genomgången inte att göra (→ `guide/3-1`, *Läget i filer*).

## Förbud

- Skriv aldrig en lärdom i `CLAUDE.md`, en skill, `mallar/granskning.md` eller en kontroll utan Johnnys ja.
- Ändra aldrig det som bedömer arbetet för att arbetet ska klara det: checklistan, kontrollerna, eval-fallen eller måttet i en loop (→ `guide/3-1`, *Den som bedöms får inte ändra domaren*).
- Mät aldrig en ändrad checklista på de exempel som formade den (→ `guide/3-2`, *En förbättrad checklista är ett förslag*).
- Installera inga plugins, hooks eller tredjepartsskills som en del av lärandet. Föreslå dem med ett källkort ([bevakning.md](bevakning.md)).
- Gör inte om en dom om smak till en regel. Den gäller sajten tills Johnny säger annat.
- Påstå ingen kvalitetshöjning från en skill, ett verktyg eller en ändring förrän Johnny sett resultatet. Att något finns och användes är inte ett belägg för att det hjälpte ([skills.md](skills.md), *Så prövas den*).

## Kontrollista efter en sajt

Varje punkt är klar när dess utfall står i `sites/<namn>/genomgang.md`.

1. **Underlaget är samlat:** domarna, tid per steg, granskarens fynd, kvalitetsgranskningen och kundsvaren (`BESLUT.md` 2026-10-16, G12).
2. **Varje rättelse från Johnny** har räckvidd, orsak och en föreslagen hemvist – eller står som sajtbeslut.
3. **Granskaren är ommätt** på sajtens egna utkast, blint, med TPR, TNR och säkra mot osäkra domar ([matning.md](matning.md)).
4. **Tidsförlusterna** är listade med orsak och med vad en kontroll, mall, hook eller loop hade fångat ([genomgang.md](genomgang.md)).
5. **Det som gjordes för hand** är räknat mot de tre gångerna.
6. **Förslagen** är numrerade G1… med grund och plats, och med det som inte ska bli regel.
7. **`LAGE.md`** säger vad som väntar på Johnny.
