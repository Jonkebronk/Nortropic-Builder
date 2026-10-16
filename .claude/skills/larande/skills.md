# En ny eller ändrad skill

Regler för egna skills bor i `guide/bilaga-b-skills.md` (vilka, indelning, tak) och `guide/3-4`, *Skills: tak, installation och test*. Här står hur en skill skrivs och prövas.

## När

- När ett steg gjorts för hand tre gånger blir det en skill (Skillify; → `guide/bilaga-b-skills.md`, N2). För lagerskillsen gäller Johnnys beslut 2026-10-16 att bygga dem nu; provet nedan gäller ändå.
- En ny skill bara när ingen befintlig täcker behovet; högst tolv egna skills (→ `guide/bilaga-b-skills.md`, *Indelning och tak*).
- **En skill ur en enda körning passar bara den körningen.** Spara körningen som belägg och generalisera medvetet innan skillen prövas på nästa sajt. 📄 Matt Pocock, `docs/productivity/writing-for-agents.md` (*My skill only works on the exact task I built it from*, MIT).
- **En skill som bara Johnny startar** får `disable-model-invocation: true`, så att beskrivningen inte tar kontext i varje tur. 📄 Pocock, `SKILL-MECHANICS.md` (*Invocation*).

## Så skrivs den

Ur Matt Pococks `writing-for-agents` (MIT) och Anthropics råd, med egna ord:

- **Beskrivningen är skillens pekare** och läses i varje tur. En mening som säger vad och när, med de ord en verklig person använder, och med en utlösare per gren – inte samma gren med synonymer. 📄 `writing-for-agents` (*Context pointers*); → `guide/bilaga-b-skills.md`.
- **Sammanfatta inte arbetsgången i beskrivningen.** En agent följer då beskrivningen i stället för att läsa skillen; i superpowers prov gjorde agenten en granskning i stället för två. 📄 obra/superpowers, `writing-skills` (*Skill Discovery Optimization*, MIT).
- **Vad, inte hur, och förbud behålls** (→ `guide/3-4`). Skriv målet positivt; ett förbud står bara där det är en verklig gräns, och då med det som ska göras i stället. 📄 `writing-for-agents` (*Negation*).
- **Nivåerna:** det varje gren behöver står i `SKILL.md`; det bara vissa grenar behöver ligger i en delfil som `SKILL.md` pekar på, en nivå ner. 📄 `writing-for-agents` (*Information hierarchy*); 📄 [Skill authoring best practices](https://platform.claude.com/docs/en/agents-and-tools/agent-skills/best-practices) (under 500 rader, referenser en nivå djupt). Vi håller `SKILL.md` under cirka 250 rader.
- **En plats per sak.** Det som står i guiden refereras, det skrivs inte om. 📄 `writing-for-agents` (*single source of truth*); `CLAUDE.md`, *En plats per sak*.
- **Varje steg slutar på ett klart-villkor** som går att se och som kräver något: "varje sida i 375 och 1280 px granskad", inte "granska noga". 📄 `writing-for-agents` (*Steps and completion criteria*: klarhet och krav).
- **Stryk det modellen redan gör.** En mening som inte ändrar beteendet jämfört med standard kostar utan att ge. Avgörs genom att köra, inte genom diskussion. 📄 `writing-for-agents` (*no-ops*).
- **Förklara varför** i stället för versaler och ALLTID. 📄 Anthropic, `skill-creator` (*Explain the why*, Apache-2.0).
- **Formen efter felet.** Guiden säger var en rättelse hör hemma (`guide/3-4`, *Orsaken klassas*); felet i baslinjen avgör vilken form den får. Bryter agenten en regel den kan: ett förbud med de undanflykter den faktiskt skrev. Blir utdata fel formad: ett positivt recept som säger vad utdata består av, i ordning – ett förbud gör det sämre. Saknas ett element: ett obligatoriskt fält i mallen. Ska beteendet bero på något: ett villkor som går att se ("om briefen finns"). Inga "utom när"-tillägg. 📄 obra/superpowers, `writing-skills` (*Match the Form to the Failure*).
- **Källa per regel**, och ⚠️ på det som inte gick att verifiera (`CLAUDE.md`, *Evidens*).

## Så prövas den

1. **Baslinjen först.** Kör två eller tre verkliga uppgifter utan skillen i en ny session och spara utfallet. Det är provet som ska bli bättre. 📄 superpowers, `writing-skills` ("If you didn't watch an agent fail without the skill …"); 📄 Anthropic, *Skill authoring best practices* (*Build three scenarios*).
2. **Mikroprov av formuleringen** innan hela provet: en ny kontext per körning med skillen som den kommer att laddas, en uppgift som frestar till felet, alltid en kontroll utan vägledning, minst fem körningar per variant och varje träff läst för hand. Gör kontrollen utan vägledning inte felet finns inget att rätta. Fem olika tolkningar på fem körningar betyder att formuleringen inte binder. 📄 superpowers, `writing-skills` (*Micro-Test Wording*).
3. **Med och utan i samma omgång,** i ny session, så att rester från skrivandet inte döljer luckor. 📄 [Claude Code: Skills](https://code.claude.com/docs/en/skills) ("Seeing a skill trigger tells you Claude found it, not that it did what you intended"); 📄 `skill-creator` (med- och utan-körningar startas samtidigt).
4. **Bedömningen:** det som går att mäta mäts med skript; design och text bedöms av Johnny eller den kalibrerade granskaren, inte med påtvingade ja/nej-kontroller. Kontroller som alltid går igenom tas bort. 📄 `skill-creator` (*Subjective skills … better evaluated qualitatively*); 📄 [agentskills.io: Evaluating skills](https://agentskills.io/skill-creation/evaluating-skills).
5. **Triggningsprov:** frågor som ska utlösa skillen, omformulerade frågor som också ska det, och närliggande frågor som inte ska det. skill-creator använder 20 frågor, delar dem 60/40 i träning och prov och kör varje fråga tre gånger. Två skills som tävlar om samma fråga är ett fynd (→ `guide/3-4`, *Triggningstest*). 📄 `skill-creator` (*Description Optimization*).
6. **Formprov:** giltig frontmatter, unikt namn, inga trasiga sökvägar (→ `guide/3-4`, *Formtest*); `/skill-doctor` för skills som inte används.
7. **Johnny granskar** skillen och provet. Ändringen behålls bara om utfallet med skillen inte blev sämre.

## Senare: regressionssvit

När fallen har stabiliserats kan de bli en svit för `claude plugin eval` (N4): varje fall körs tre gånger med och utan, med en grader på resultatet och en på att skillen användes (`tool_used: Skill`). Varje körning och domare är ett verkligt modellanrop. Verktyget kräver ett plugin med `plugin.json`; skills i `.claude/skills/` utvärderas inte som de är, och de mäts utan `CLAUDE.md` och utan våra andra skills. Rapporten publiceras på claude.ai om inte `--no-publish` anges, så den flaggan används alltid med kundmaterial. Formaten i skill-creator och plugin eval är inte kompatibla. 📄 [Test plugins with evals](https://code.claude.com/docs/en/plugin-evals) (Claude Code 2.1.269+); → `guide/3-2`, *En ändring i taget* (N4).

**skill-creator som verktyg:** metoden ovan används nu; verktyget prövas bara efter Johnnys ja. Dess triggningsprov ger 0 % träff när skillen redan är installerad ([anthropics/skills #1419](https://github.com/anthropics/skills/issues/1419)), och jämföraren kör bara en ordning, medan vår regel kräver båda ordningarna ([matning.md](matning.md)).
