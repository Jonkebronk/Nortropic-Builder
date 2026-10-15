# 3.4 Lärande och underhåll

**Status:** konsoliderad v1.0, 2026-10-15; ommärkt efter granskningen samma dag. **Genomläst med Johnny 2026-10-15**; rättelserna står i `BESLUT.md`.

Hur flödet blir bättre mellan sajter utan att Johnnys ord blir mekanik, hur instruktionerna hålls små och aktuella, och hur kunskapsbasen växer. Principerna *agenten föreslår, Johnny beslutar, sedan låses det* och *Johnnys ord blir inte mekanik på egen hand* står i `guide/README.md` (princip 9 och 10); här står hur de tillämpas.

## Lärdomar blir förslag

I webb-pro blev Johnnys kommentarer samma dag stationer och grindkriterier, och lärdomsfilen som alla agenter läste fick rensas (`kunskap/research/2026-10-15_webb-pro-genomgang.md` §4, risk 4). v0.74:s auto loop upprepade mönstret och är omskriven här.

- [N1] **Ingen lärdom ändrar något av sig själv.** Varken Claude, en hook eller en loop skriver in en lärdom i `CLAUDE.md`, en skill, ett kriterium eller en kontroll. En lärdom är ett förslag, och Johnny beslutar. En dom om smak gäller den sajten: det Johnny avvisar rättas där, och det blir en allmän regel först när han säger det – då skrivs hans ord ordagrant i `BESLUT.md` (`guide/README.md`, princip 10). Varför: ett enda dåligt resultat blir annars en permanent regel (Variate-videon, Task Observer; fallgrop 44), och agenter lär sig bara när människan medvetet uppdaterar instruktioner och harness (Simon Willison, 📄 `2026-10-15_kompetensluckor-anteckningar/flodet-loopar-bedomare.md` §5). v0.74:s regel att hans feedback skrivs direkt i `arbetssatt.md` för alla agenter är struken.
- **Efter varje övningssajt** lägger Claude fram vad Johnny rättade och vad granskaren missade, med förslag på var varje rättelse ska föras in; Johnny godkänner eller stryker. Regeln bor i `5-byggplan.md`, *Övningssajterna* (N1), och ersätter den tidigare N2-punkten *Före andra sajten*.
- [N2] **Nya låsta kontroller bara för det som är objektivt fel och har hänt mer än en gång**, efter Johnnys beslut. Johnny formulerar frågan själv innan agenten föreslår svar, i stället för att välja i en numrerad lista (webb-pro-genomgången, motåtgärd 4).
- [N2] **Förslag loggas löpande** i `sites/<namn>/larande-forslag.md`, under rätt roll. De ändrar ingenting.
- [N2] **Orsaken klassas före förslaget**, så att processen rättas och inte bara utfallet (skill-ingenjörsvideon; fallgrop 145): *processen* var fel → stegen i skillen; *kontext* saknades → referensfil eller faktabas (`2-7-innehall.md`); en *regel* var svag → kriterium eller kontroll, på billigaste stället (nedan); *koden* var opålitlig → låst skript (nedan).
- [N2] **Backa med handlingar, inte tänkande.** En agent som missat något visar var den letade: sökningar, sökvägar, verktygsanrop, resultat. Att be modellen återge sitt resonemang kan utlösa en vägran på Fable 5 (📄 Anthropic, *Prompting Claude Fable 5*; fallgrop 149).
- [N2] **Missade fynd** – det Johnny eller driften hittar som en granskare borde ha sett – loggas med granskare och orsak och blir förslag till kriterier (Hermes-loopvideon; fallgrop 101). Kalibreringen → `3-2-granskning-och-kalibrering.md`.
- [N2] **Förbättringsjournal:** varje prövad förbättring loggas, även de som ångrades, med orsak och mätvärden, så att samma misslyckade förslag inte kommer tillbaka (loop-typvideon; fallgrop 83).
- [N2] **Verktyg som gör rättelser till regler får bara föreslå.** `hookify` och `/revise-claude-md` (claude-plugins-official) gör upprepade rättelser till hooks respektive `CLAUDE.md`-rader (📄 kompetensluckor-anteckningarna §1). Johnny godkänner utdata.
- [N2] **En loop lönar sig när** uppgiften upprepas ofta, tokenkostnaden ryms, arbetet kan kontrolleras utan människa med ett tydligt mått, och agenten kan köra det den byggt (loop-videon). Design och text klarar bara delvis det tredje villkoret; där är Johnnys dom måttet (`guide/README.md`, princip 7).
- [N4] **Auto loop.** Efter varje sajt läser en loop resultatloggar och granskningar och letar mönster – samma fel i minst två sajter, eller som krävt minst två rundor (fallgrop 17). Varje mönster blir ett förslag med hänvisning till rundorna, prövas i eval och läggs fram för Johnny. Loopen skriver bara förslag och körs först när eval finns (`3-2`); utan eval kan den gå åt fel håll utan att någon märker det. Idé ur loop-videon.
- [N4] **`arbetssatt.md`** får en sektion per roll plus gemensamma regler; varje agent läser sin egen. Lärdomarna ordnas som kunskapsbasen nedan (Variate-videon, Task Observer ⚠️).

Johnnys slutgranskning, förhöret och Ultra review → `3-2`. Variate → `3-5-live-visning.md`. Ny byggagent per uppgift → `3-1-orkestrering-och-roller.md`.

## Var en regel hör hemma

- [N2] **Billigast först:** prompten, när instruktionen bara var otydlig; `CLAUDE.md`, för det som gäller varje session och inte syns i koden; en skill, för det som förklarats för femte gången; MCP, när informationen inte nås annars; en hook, när regeln måste gälla varje gång. Varför hooken: `CLAUDE.md` följs oftast men inte alltid (Jev-uppföljningen; fallgrop 22), och Claude Codes dokumentation lägger sådana regler i hooks (📄 *Skills*, via kompetensluckor-anteckningarna §1).
- [N2] **Kontroller åldras och förnyas; instruktioner prövas och rensas.** Grindar – kontroller som kan säga nej – behålls och förnyas; instruktioner prövas vid ny modell (*Rensning*, nedan). En standardkontroll som inte underkänt något på flera sajter prövas: kan den fortfarande säga nej? Annars skrivs en ny där modellen nu har svårt, och Johnny beslutar bytet (`bilaga-c-kontroller.md`). Varför: en kontroll som aldrig underkänner har slutat vara en kontroll (fallgrop 74). Kontroller håller enligt Boris 2–3 modellgenerationer. 🎥 Boris Cherny-videon (en källa); 📄 [agentskills.io: Evaluating skills](https://agentskills.io/skill-creation/evaluating-skills) (ta bort det som alltid går igenom). Vad som får vara grind: `guide/README.md`.
- [N2] **Förbud behålls, arbetsgången prövas.** En skill anger syfte, identitet och begränsningar, inte arbetsgången steg för steg: *vad, men inte hur* (context-videon och 📄 Anthropic, *Prompting Claude Fable 5*: skills för äldre modeller är ofta för föreskrivande; fallgrop 134).

## `CLAUDE.md`

- [N1] **Kort `CLAUDE.md`, skriven för hand.** Högst 60 rader för första sajten (analysen §8.2), med frågan per rad: skulle Claude göra fel utan den? Inte med `/init`, som fyller filen med sådant agenten kan läsa i koden (fallgrop 12); den nya varianten (`CLAUDE_CODE_NEW_INIT=1`) finns inte i verifieringens lista över miljövariabler ⚠️. Filen är skild från repots rot-`CLAUDE.md`, som styr arbetet med byggsystemet. Var den ligger är öppet – se `bilaga-e-oppna-fragor.md`, fråga 2.3 (`LAGE.md`; karta-mot-guide, konflikt 4). Varför: uppsvällda filer gör att Claude ignorerar instruktionerna (📄 Claude Code, *Best practices*, via kompetensluckor-anteckningarna §1).
- [N2] **Ordning:** projektbeskrivning; hårda regler, som också upprätthålls av en deny-regel eller hook (fallgrop 116); arbetsregler; pekare till skills, kunskap och faktabas. Bara verktyg som avviker från standard (CLAUDE.md-videon).
- [N2] Förslag tills Johnny avgjort fråga 2.3 i `bilaga-e-oppna-fragor.md`: **Johnny godkänner varje ändring av `CLAUDE.md`** – den läses i varje tur. Ett `init`-kommando från tredje part kan skriva om den utan att fråga (Astryx-videon; fallgrop 84); sådana körs på en egen gren och arbetas in för hand. En Stop-hook som skriver lärdomar i `CLAUDE.md` används inte. Om rotfilen ska låsas hör till samma fråga; låsningens mekanik → `3-1`.
- [N2] **`sites/<namn>/CLAUDE.md` har bara det sajtspecifika.** En underkatalogs `CLAUDE.md` laddas när agenten arbetar där, så sajt A:s byggare ser inte sajt B:s (harness-videon, efter en Anthropic-artikel som inte är läst i original; fallgrop 113). Skills kan på samma sätt avgränsas till sökvägar.

Vilka `CLAUDE.md`, skills och plugins som laddas i byggsessionen – också ärvda från överliggande mappar och användarnivån – kontrolleras före första sajten → `3-3-sakerhet-och-installningar.md`, *Första sajten*.

## Rensning vid ny modell

- [N2] **Vid ny modell, och halvårsvis även utan:** kör samma uppgift med full uppsättning och i säkert läge (`claude --safe-mode`); pröva varje instruktion mot *skulle Claude göra fel utan den?*; rensa med förslag som Johnny godkänner ett och ett; kör om och behåll rensningen bara om resultatet inte blev sämre. Måttet är Johnnys blinda dom tills eval finns (`3-2`). Källor: Boris Cherny i två kanaler (en källa), 📄 Anthropic, *Prompting Claude Fable 5*, och 📄 Anthropic, *Harness design* (ompröva harnessen vid varje ny modell). Fallgrop 13, 73.
- [N2] **En instruktion rensas bara när mätningen visar det**, inte för att en ny promptguide säger det. Rådet att be om flera designriktningar togs bort i Fable 5-guiden, men ungefär två av tre sajter föll ändå tillbaka på samma stil (4 Ways-videon; fallgrop 104).
- [N2] **Behåll** var saker finns, varumärket, `design.md`, faktabasen, standarden för vad som är bra och kontrollerna (som förnyas, aldrig rensas). **Pröva att ta bort** arbetsgången steg för steg, formatregler modellen redan följer och rättelser för fel den inte längre gör. Ta inte bort hela skills: Nate Herks prov utan skills gav bättre innehåll men tappade varumärket (radera-skills-videon; fallgrop 157).
- [N4] **Skriv om skills efter den nya modellens promptguide** och behåll bara om mätningen blir bättre (4 Ways-videon).
- [N2] **Verktyg:** `/doctor` (alias `/checkup`) föreslår och ändrar inget; `/doctor prompt-audit` kräver 2.1.283 (📄 `2026-10-14_claude-code-verifiering.md`). `/skill-doctor` hittar oanvända skills (📄 *Skills*, via anteckningarna); enligt context-videon visar den också tokenkostnaden per skill. Context-videons siffror – 80 % av systemprompten struken utan försämring, 13,9–85 % sämre med längre indata – är overifierade ⚠️.

## Skills: tak, installation och test

- [N2] **Bara de skills sajten använder.** Skillistan får 1 % av kontextfönstret, och vid överskott tappas beskrivningarna för de minst använda, så att Claude inte hittar dem (📄 Claude Code, *Skills*, via kompetensluckor-anteckningarna §1; Hermes-videon; fallgrop 47). Webb-pro hade 61 skills med 67 krockar. Avgränsningen från användarnivåns skills i första bygget → `3-3`, *Första sajten*.
- [N2] **En ny skill tas in bara om ingen befintlig täcker behovet** och ett prov med och utan visar nytta på en riktig sajt (webb-pro-genomgången, motåtgärd 5). Taket är nått senast när beskrivningar tappas.
- [N2] **Kontrollera att en installerad skill syns.** Claude Code läser projektets skills i `.claude/skills/`; `stitch agent-skills add` skriver till `.agents/skills`, och om den läses är inte verifierat ⚠️ – kopiera eller länka (📄 `2026-10-14_stitch-och-verktyg.md`; fallgrop 1). Stitch och Googles skills → `2-5-yta.md`.
- [N2] **Skills grundas i en verklig körning:** kör processen med Claude första gången, låt Claude göra ett utkast ur sessionen, Johnny granskar, prova med och utan (Boris-skills-videon, Skillify; fallgrop 117). Egna skills → `bilaga-b-skills.md`; tredjepartsskills, skanning och låsta versioner → `bilaga-a-verktyg.md`.
- [N2] **Formtest av varje version:** giltig frontmatter, unikt namn, beskrivning, inga trasiga sökvägar – en skill med trasig frontmatter syns aldrig (context-videon; fallgrop 133). `claude plugin validate` (2.1.233+) hittar sådana fel (📄 *Skills*, via kompetensluckor-anteckningarna §1).
- [N2] **Triggningstest:** tre testfrågor per skill – en självklar som ska utlösa den, en omformulerad som också ska det, en orelaterad som inte får det – och en parvis jämförelse av beskrivningarna; två skills som tävlar om samma begäran är ett fynd (fallgrop 144). Instruktion *(en källa – bänken)*: Nate Herks återgivning av skill-creator, vars primärkälla inte är läst (analysen §4.2). Kompetensluckor-anteckningarna återger skill-creators metod som 20 frågor med bör, bör-inte och närliggande missar ⚠️; läs `SKILL.md` i original innan testet blir grind.
- [N2] **Kod som skrivs om i varje bygge lyfts till låsta skript** i skillen (bildoptimering, formulär, sitemap, strukturerad data), och skillen ska anropa skriptet (skill-ingenjörsvideon; fallgrop 143). *Deterministiska skript där svaret är känt* har två källor (analysen §4.3). Johnny godkänner varje lyft.

## Byggsystemet som versionerat plugin

- [N4] **Skills, hooks, agentdefinitioner, standardkontroller och inställningar blir ett plugin i ett eget repo med versionsnummer**, så att byggsystemet är detsamma överallt och varje ändring går att ångra (harness-videon; fallgrop 112). Verifierat: `.claude-plugin/plugin.json`, egen marknadsplats i ett GitHub-repo, låsning med `ref`, `sha` eller semver, `claude plugin tag` (verifieringen §4).
- [N4] **Isoleringshooks följer inte med i pluginets agenter** – där ignoreras `hooks`, `permissionMode` och `mcpServers` (verifieringen §4; fallgrop 189). De ligger i projektets settings (`3-3`).
- [N4] **Stegvis utrullning:** varje sajt ligger på en angiven version tills uppgraderingen är prövad – först eval, sedan en riktig sajt, sedan alla (ADLC-videon, en källa; fallgrop 114).

## Underhållsrutiner

På egen gren, med Johnnys godkännande, aldrig i låsta filer.

| Nivå | Rutin | När |
|---|---|---|
| [N2] | `/skill-doctor`: ta bort skills som inte används | Månadsvis |
| [N2] | `/doctor`: förslag som Johnny godkänner eller avslår | Månadsvis (kvartalsvis vid få ändringar) och vid ny modell (context-videon) |
| [N2] | Rensningsprovet | Vid ny modell och halvårsvis (radera-skills-videon) |
| [N3] | Städa oanvända filer, slå ihop dubbletter, skriv tester för hooks och skript | Veckovis, som schemalagda rutiner (Boris Cherny-videon) |

Arkitekturgranskningen av förvaltade sajter → `2-9-drift-och-forvaltning.md` (fallgrop 142).

## Bevakning av omvärlden

- [N2] **Sex källor:** claude-plugins-official, anthropics/skills, Claude Code-dokumentationen, Anthropics engineering-blogg, Simon Willisons *Agentic Engineering Patterns* och hesreallyhim/awesome-claude-code (`historik/karta/flodet.md`; 📄 kompetensluckor-anteckningarna §4). Claude Codes changelog kan bli en sjunde. Bevakningen ger vilande förslag och installerar ingenting.
- [N2] **Intagsregel:** officiellt eller över awesome-claude-codes tröskel (minst 14 dagar med fortsatt utveckling, eller 100 stjärnor); licens utan copyleft i levererad kod; ingen överlappning med en befintlig skill; *ta in* kräver uppmätt förbättring mot baslinje, annars *pröva*. Passform före popularitet → `bilaga-a-verktyg.md`, urvalskriterierna (fallgrop 65). Utlovade siffror är inga mätningar – RTK lovade ~90 % men sparade inget i ett test (Nate Herk 100-repon-videon; fallgrop 128).

## Kunskapsbasen

Kriterier med källa går att förklara för kunden, som vi förvaltar åt, och litteraturen avgör när videorna drar åt olika håll.

- [N2] **Källorna ligger i projektet, aldrig i modellens minne.** Agenter hänvisar till `kunskap/`, inte till litteratur ur minnet (fallgrop 67).
- [N2] **Konfliktordning:** brief, sedan litteratur, sedan skill.
- [N2] **Wikin byggs regel för regel ur det sajterna faktiskt använde** (analysen §9.3). Efter varje sajt får varje använd regel en fil i `kunskap/wiki/` med exakt citat, källa (tidsstämpel för video) och *sett* eller *härlett*. Det som inte användes stannar som kandidat. Då blir bänken (`guide/README.md`) ett verkligt filter. Råmaterialet i `kunskap/raw/` rörs aldrig (fallgrop 136).
- [N2] **Struktur:** en fil per begrepp, `index.md` i varje mapp, frontmatter med `källa`, `kriterier`, `roller` och `lager`, så att en granskare bara laddar sina filer (OKF- och Karpathy-videon, samma primärkälla: Karpathys *LLM Wiki*; metod, inte grind; fallgrop 92). En rad i `CLAUDE.md`: navigera via `index.md` och frontmatter, inte nyckelord.
- [N2] **Varje fil skrivs ur originalkällan och kontrolleras av en människa innan den låses**; varje kriterium i en granskarskill pekar dit. Det mätbara blir kontroller – Fitts lag blir ett krav på klickytans storlek, inte "tänk på Fitts lag".
- [N2] **Heuristik är inte användartest.** Det heter *heuristisk utvärdering*, och verkliga besöksdata väger tyngst när de finns (`2-9`). Antalet granskare → `3-2`.
- [N2] **Material från andra används bara internt** och publiceras inte.
- [N4] **Expertmetoden** (Karpathy-videon): råmaterial per källa, en wiki med källsidor, index och logg, regler med citat, och en granskare med en checklista där varje rad är en regel – t.ex. en Nielsen-granskare ur NN/g.

Områden: användbarhet (Nielsens heuristiker, Krug) → `2-4`, `3-2`; perception och layout (gestaltlagarna, Laws of UX) → `2-4`; läsning och innehåll (NN/g, klarspråk, Wikipedias guide till AI-text ⚠️) → `2-7`; tillgänglighet (WCAG 2.2 AA) och formulär (Baymard) → `2-8`; rörelse → `2-6`; projektbeslut (advise-project-approach) → `2-2`.
