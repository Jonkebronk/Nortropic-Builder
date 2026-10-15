# 3.1 Orkestrering och roller

**Status:** konsoliderad v1.0, 2026-10-15; ommärkt samma dag efter granskningen (`konsolidering/granskning-v1.0.md`). **Genomläst med Johnny 2026-10-15**; rättelserna står i `BESLUT.md`.

Flödet är lagret ovanpå de nio lagren: hur agenterna arbetar sig igenom dem (`historik/karta/flodet.md`). Här står vem som gör vad, hur läget hålls i filer, när ett steg är redo för Johnnys dom och hur tillsynen följer konsekvensen. Bedömningen står i `3-2-granskning-och-kalibrering.md`; säkerhet, modeller och effort i `3-3-sakerhet-och-installningar.md`.

Webb-pro byggde ett stort maskineri och fick ingen sajt som Johnny var nöjd med: rören verifierades, inte vattnet (`kunskap/research/2026-10-15_webb-pro-genomgang.md`). Därför är första nivån liten. Den första sajten byggs interaktivt i huvudsessionen medan Johnny tittar (`5-byggplan.md`). Byggare som delagenter, `state.json`, överlämningsfiler, låsning och hooks är N2 och tas in först när en verklig sajt visar att de behövs (`guide/README.md`, princip 8).

- [N1] **Roller i första varvet:** huvudsessionen bygger medan Johnny tittar, granskaren är den enda delagenten och Johnny dömer varje steg. Granskaren kommer in i `5-byggplan.md`, steg 4; i steg 3 dömer Johnny bygget direkt. Varför: Johnny tittar på hela bygget, och i webb-pro kom maskinen före sajten (webb-pro-genomgången, risk 1). 🔧 (konsolideringsanalysen §7.3)
- [N2] **Fyra roller när Johnny inte tittar på varje varv:** en orkestrerare (huvudsessionen, den Johnny ser), en byggare (en delagent per steg), en granskare (en delagent med ren kontext och en checklista) och Johnny. Resten av filen är N2–N4. 🔧 (konsolideringsanalysen §7.3)

## Loopen

Varje steg slutar med något Johnny kan se – en brief, tre riktningar, en sajt i webbläsaren (`guide/README.md`, princip 1). En fallerad kontroll hindrar aldrig att han ser resultatet; den listas bredvid (→ `3-2`, *Mätbart före bedömt*).

- [N2] **Varje steg är en loop:** försök, kontroll, sedan klart, nytt försök eller Johnny. Efter 3 varv går steget till Johnny med det som återstår. I N1 avgör Johnny direkt i sessionen. 🔧 (`historik/karta/flodet.md`; taket är ett startvärde)

## Läget i filer

- [N1] **`sites/<namn>/progress.md` håller läget:** steget, vad som är gjort, vad som inte gick att bygga och varför, vad som väntar på Johnny, vad som gjordes för hand, tid per steg (klocktid och Johnnys tid, `1-kundens-vag.md`) och beläggen (nedan). En commit per lyckat varv. Inget släpps tyst: går en del inte att bygga står det i filen. Varför: sessioner avbryts och läget glöms (fallgrop 46, 106), och agenten bygger annars det lätta och hoppar över det svåra utan att säga något (fallgrop 51). 📄 Anthropic, [Effective harnesses for long-running agents](https://www.anthropic.com/engineering/effective-harnesses-for-long-running-agents); *inget släpps tyst*: 🎥 Unlazy-videon (en källa – bänken).
- [N2] **`sites/<namn>/state.json`** när byggaren blir en delagent: steg, varv, `blocked` med orsak och fråga, `bevis`, tid och kostnad per steg och antagandena (`3-5-live-visning.md`). `progress.md` blir då den läsbara överlämningen. Varför: en orkestrerare i en lång session glömmer var flödet är (fallgrop 46, 106). 📄 samma artikel.
- [N2] **Funktionslistan** `sites/<namn>/checkpoints.json`: en rad per byggsteg med tillåtna filer, beroenden, namnen på kontrollerna och fältet `passes`. Efter Johnnys godkännande ändras bara `passes` och `bevis`, och bara av orkestreraren. 📄 samma artikel.
- [N2] **Påminnelse om läget:** en hook på `UserPromptSubmit` och `SessionStart` lägger några rader ur `state.json` i orkestrerarens kontext – bara orkestrerarens. 🎥 Hermes-videon; 📄 hooktyperna (högst 10 000 tecken): `kunskap/research/2026-10-14_claude-code-verifiering.md`.
- [N2] **Återupptagning** med kommandot `/bygg-sajt <namn>`, som läser `state.json`. 🔧

## Orkestreraren

- [N2] **Bred eller djup.** Breda uppgifter – oberoende delar värda att korsverifiera – körs som dynamiskt arbetsflöde: ett skript i `.claude/workflows/` där koden väljer agenterna och varje svar måste klara ett schema. Djupa uppgifter körs med Stop-hooken eller `/goal`. Varför: fel sort slösar tokens eller tappar parallellitet (fallgrop 105). 🎥 OS-videon; 📄 format och gränser (standard 16 samtidiga agenter, varning över 25 agenter eller 1,5 miljoner token): research 2026-10-14.
- [N2] **`/goal` driver men är ingen grind:** modellen som avgör om villkoret håller läser bara transkriptet och kör inga kommandon. Villkoret kräver utskrivna belägg, och grinden är kontrollerna. `/loop` är en prompt på timer (fallgrop 57). 📄 [Claude Code: /goal](https://code.claude.com/docs/en/goal).
- [N4] **Avgränsade flottor:** fast tak för samtidiga agenter, sammanslagning i tur och ordning med kontroller emellan, varje agent loggad med roll och startare (`3-2`). Varför: hundratals agenter som går fel kostar hela körningen och går inte att spåra (fallgrop 76). 🎥 Boris Cherny-videon (en källa – bänken).

## Byggsteg och överlämning

- [N2] **Bygget delas i hela, synliga steg** från enklast till mest komplext: grundlayout och startsida, undersidorna, sist formulär och den primära handlingen. Ett tidigt fel upptäcks medan det är litet. 🎥 Shopify-videon (en källa – bänken).
- [N2] **Ny kontext per steg, med en kort överlämning som pekar på filer** i stället för chatten: brief, faktabas, stilkit, tillåtna filer, namnen på kontrollerna, det som redan är klart. Sparas i `sites/<namn>/overlamning/<steg>.md`. Byggarens prompt har standardtexten (`3-3`) och regeln att bara skriva fakta ur faktabasen (`2-7-innehall.md`). Varför: lång kontext försämrar kvaliteten, och krav i filer tappas inte som "var noggrann" gör (fallgrop 23, 54, 80). 🎥 fleet- och Shopify-videon + Coding Sloth-videon – två källor (konsolideringsanalysen §4.3).
- [N2] **Stegets storlek:** en hel enhet, minst cirka tio minuters arbete, aldrig ett mikrosteg. 🎥 Unlazy- och Fable-videon (en källa – bänken). Eval justerar.
- [N2] **Spanaren** – en billig agent med bara läsrätt – skriver överlämningen: stegets filer, beroenden och vilka kontroller som fallerar nu. 🎥 Goal Buddy-videon (en källa – bänken).
- [N4] **Parallella steg** när beroendena är klara och fillistorna inte överlappar: en git worktree och en fast port per agent; `package.json`, låsfiler och byggkonfiguration ändras bara i grundlayoutsteget, som körs ensamt och först; sammanslagning i tur och ordning med kontrollerna efter varje. Varför: parallella agenter krockar på grenar, portar och beroenden, och slås allt ihop på en gång syns inte vilket steg som förstörde (fallgrop 53, 79, 81). 🎥 fleet- och Unlazy-videon (en källa – bänken). `/batch` gör nästan samma sak (kräver git-repo, konsolideringsanalysen §5.1). Sandlåda: `3-3`.

## Belägg och status

- [N1] **Redo för Johnnys dom bara med belägg.** Huvudsessionen kör kontrollskriptet (`5-byggplan.md`, steg 3) efter varje varv och skriver kommandot och ett utdrag ur utdata i `progress.md`. Varje påstående till Johnny eller kunden har länk eller skärmdump; ett påstående utan belägg räknas som underkänt. Promptens instruktion att granska varje påstående mot ett verktygsresultat står i standardtexten (`3-3`); i Anthropics tester tog den nästan helt bort påhittade statusrapporter. Ingen hook i N1 – Johnny tittar. Varför: agenten säger annars klar för tidigt och kryssar i sin egen ruta (fallgrop 9, 40, 52, 148). 🎥 Unlazy-videon; 📄 [Claude Code: Best practices](https://code.claude.com/docs/en/best-practices) ("Have Claude show evidence rather than asserting success"); 📄 Anthropic, *Prompting Claude Fable 5*. Lyft – får vara grind.
- [N2] **Bara orkestreraren sätter status,** när byggaren är en delagent, och bara med belägg i `state.json` → `bevis`. Status utan belägg räknas som underkänd. Samma källor.

Förvaltningens rapporter: `2-9-drift-och-forvaltning.md`.

## Grindkontrollen

I N1 kör huvudsessionen kontrollskriptet och Johnny tittar (*Belägg och status*). Det här tas in när steg körs utan honom.

- [N2] **Stop-hooken `.claude/hooks/grind-stopp.mjs`** kör kontrollerna när Claude försöker avsluta. Den tillåter avslut om ingen sajt är aktiv (`.claude/aktiv-sajt`), om `blocked` är satt, om rundtaket är nått, om flödet är klart, eller om samma grind blockerats 3 gånger i rad med `stop_hook_active: true` (då skrivs `blocked` med orsak). Annars kör den stegets kontroller själv, utan att lita på statusen: allt grönt → avslut och belägg sparas; annars kod 2 och det som saknas på stderr, som Claude får som skäl att fortsätta. Hooken räknar varven själv, eftersom Claude Codes egen spärr släpper först efter åtta blockeringar i rad och inte eskalerar till Johnny. Registreras under `hooks.Stop` i projektets `.claude/settings.json`. Kontrollerna: `bilaga-c-kontroller.md`. 📄 research 2026-10-14; [Hooks](https://code.claude.com/docs/en/hooks-guide).
- [N2] **Grindar per steg** (kriterierna bor i lagren):

| Steg | Grinden kräver |
|---|---|
| Brief | Alla rubriker i briefmallen, räknade ur mallen; kundens bekräftelse och Johnnys godkännande (`2-1-strategi.md`) |
| Kontroller | Johnnys godkännande (`3-2`); committade |
| Bygge | Bygget går igenom; varje rad i funktionslistan har `passes` med belägg |
| Granskning | Senaste granskningen har `kritisk` = 0 och `hög` = 0 (`3-2`) |
| Alla steg | Inga låsta filer ändrade; inga övergivna grindar utan Johnnys ställningstagande |

- [N2] **Övergivna grindar:** visar sig en grind omöjlig skrivs den med orsak i `state.json` → `overgivna`, flödet sätts `blocked`, och Johnny avgör: ändra briefen, ändra kontrollen eller acceptera. 🎥 Unlazy-videon (en källa – bänken).
- [N2] **Modellbyte under ett steg stoppar inte grinden;** det loggas per varv i resultatloggen (`3-2`) och varnar (`3-3`).

## Stoppvillkor

I N1 frågar huvudsessionen Johnny direkt när något saknas eller samma fel kommer tillbaka, och tiden per steg står i `progress.md`; tar ett steg mer än dubbelt så lång tid som uppskattat stannar flödet och frågar (`1-kundens-vag.md`). Tabellen gäller när steg körs utan att Johnny tittar.

| Situation | Åtgärd | Nivå |
|---|---|---|
| Grinden uppfylld | Nästa steg | N2 |
| Rundtaket nått | `blocked` med de bästa alternativen → Johnny | N2 |
| Samma fel två varv i rad | Byt angreppssätt en gång; sedan Johnny | N2 |
| Steget går över sin tidsbudget | Johnny: fortsätt, förenkla eller avbryt (`1-kundens-vag.md`) | N2 |
| Inloggning, konto eller kunduppgift saknas | `blocked` med exakt vad Johnny eller kunden ska göra | N2 |
| Samma fel två varv, innan Johnny | Rådfråga en starkare modell (advisor, `3-3`) | N4 |
| Riskfyllt beslut inom briefens ramar | Domaren | N4 |

- [N4] **Domaren** avgör beslut som är riskfyllda men ryms i briefen – briefen säger X men kundens gamla sajt säger Y, byte av tredjepartstjänst – mellan ett litet antagande (loggas) och `blocked`. Den har bara läsrätt och hög resonemangsnivå, motiverar i `beslutskarta.md` och rör aldrig låsta filer; osäker eller avslag → `blocked`. Varför: riskfyllda beslut gissas annars eller stoppar flödet i onödan (fallgrop 108). 🎥 Goal Buddy-videon (en källa – bänken).

## Den som bygger dömer inte

- [N1] **Granskaren är en separat delagent med färsk kontext,** från `5-byggplan.md`, steg 4. Den får referensen, checklistan med måttstockens tre frågor, Johnnys exempel och skärmdumparna, bland dem helsidesbilder i mobil och dator (`3-2`) – inte huvudsessionens logg och resonemang och, från N2, inte byggarens överlämning. Använd en vanlig delagent, inte en som ärver chatten (som `subtask`). Varför: en granskare som delar kontext med byggaren godkänner det som byggts. 🎥 Shopify-videon; 📄 *Prompting Claude Fable 5* ("separata verifierande delagenter med färsk kontext presterar ofta bättre än självkritik"); 📄 [Best practices](https://code.claude.com/docs/en/best-practices). Lyft – får vara grind.
- [N2] **Granskaren bedömer resultatet, inte om byggaren följde instruktionerna:** uppdraget innehåller inte `CLAUDE.md`, arbetsregler eller loggen. 🎥 Shopify-videon (en källa – bänken; lyfts när Shopify-artikeln läses i original). ⚠️ Om delagenter laddar projektets `CLAUDE.md` är inte kontrollerat; lägg därför inga bedömningskriterier där.
- [N2] **Verktyg som lägger in kontext i varje prompt** (t.ex. Graft) är aldrig aktiva för granskare. 🔧

Varvnummer och tidigare resultat: `3-2`.

## Behörighet i verktyget, inte i prompten

I N1 räcker `permissions.deny` för push, publicering och `.env` (→ `3-3-sakerhet-och-installningar.md`). Det här tas in när roller blir egna agenter.

- [N2] **Det en roll inte behöver ska den inte kunna.** En regel i prompten är ett förslag, en regel i verktyget en begränsning. Varför: *"999 gånger gör den det du vill, men den tusende kan bli dålig"*; instruktioner följs oftast men inte alltid (fallgrop 22). 🎥 VAULT- och 5000-timmarsvideon; 📄 [Claude Code: Skills](https://code.claude.com/docs/en/skills) (det som måste gälla varje gång hör hemma i hooks). Två källor.
- [N2] **Så sätts behörigheten** i Claude Code 2.1.281 (📄 `kunskap/research/2026-10-14_claude-code-verifiering.md`):
  1. `tools` och `disallowedTools` i agentens frontmatter slår bara av hela verktyg; `Bash(git push *)` där tar bort hela Bash.
  2. Sökvägsregler ligger i `permissions.deny` i projektets `.claude/settings.json` och gäller alla agenter, också huvudsessionen. Läsrätt per sökväg och agent finns inte.
  3. Agentens egna hooks ignoreras för agenter i plugins (fallgrop 189), så isoleringshooks ligger i projektets settings (`3-3`). ⚠️ Att en hook ser vilken agent som anropar är inte verifierat.
  4. Läsförbud är ingen säkerhetsgräns: `Read`-deny täcker inte `grep -r` eller ett skript, och Bash-regler matchar inte `sh -c`. Det en agent inte får se ligger utanför dess arbetskatalog eller i en sandlåda (`3-3`).

Rolltabellen är facit för agentdefinitionerna. I N1 finns bara huvudsessionen och granskaren; övriga rader gäller från N2. Varför tabellen: behörighetsregler utspridda över guiden är lätta att missa, och agenter med generiska prompter väntar på varandra (fallgrop 72, 107). 🎥 Goal Buddy-videon.

| Roll | Nivå | Läser | Skriver | Kan inte |
|---|---|---|---|---|
| Orkestrerare | N2 | `state.json`, rapporter, belägg | `state.json`, status, överlämningar | Bygga, granska, ändra låsta filer |
| Byggare | N2 | Överlämningen, brief, faktabas, stilkit | Stegets tillåtna filer | Sätta status; läsa dolda kontroller (N4) |
| Granskare | N1 | Referens, checklista, skärmdumpar | Sin rapport | Se byggarens logg, `CLAUDE.md`, varvnummer |
| Spanare | N2 | Projektets filer | Överlämningen | Ändra något annat |
| Rättare | N2 | Fynden, tillåtna filer | Tillåtna filer | Sätta status |
| Läser externt innehåll | N2 | Referenser, kundmaterial | Sin rapport | Nå hemligheter (`3-3`) |
| Domare | N4 | Beslutet och underlaget | Beslut med motivering | Röra låsta filer |
| Förvaltningsagent | N3 | Statistik, loggar, kopplingar – en kund | Rapporter och grenar | Publicera; nå en annan kund (`2-9`) |

Modell, effort och advisor: `3-3`. Kodgranskning: `3-2`. Säkerhetsgranskning: `2-8-teknik-och-kvalitet.md`.

## Tillsyn efter konsekvens och räckvidd

- [N3] **Tillsynen motsvarar konsekvens och räckvidd:** ju fler en handling påverkar och ju svårare den är att ångra, desto viktigare är stoppet. Ge en agent en nyckel som bara kan skapa utkast i stället för att skriva "skicka aldrig" i prompten.

  | Handling | Räckvidd | Ångra? | Tillsyn |
  |---|---|---|---|
  | Läsa data, köra kontroller | Ingen | Ja | Fritt |
  | Ändring på förhandsversion | Johnny | Ja | Fritt; prövas i grindarna |
  | Publicering | Alla besökare | Ja, med återställning | Johnnys godkännande |
  | Ändring i kundens Google-profil | Alla som söker | För hand | Förslag till Johnny |
  | Svar till kund | En kund | Nej | Utkast som Johnny godkänner (→ `4-foretaget.md`) |
  | Mejl till kundens kundlista | Tusentals | Nej | Aldrig av agent; ingen behörighet till kundens utskickstjänster |

  Varför: en självgående agent tog själv en uppgift ur en lista, tolkade den fel och skickade en rabattkod till hela e-postlistan (fallgrop 151, 154, 155); delade inloggningar ger varje agent åtkomst till allt (fallgrop 41). 🎥 VAULT-, 5000-timmars- och 1-person-videon (samma kanal – en källa – bänken, konsolideringsanalysen §4.4; antalet mottagare skiljer ⚠️); godkännande efter risk finns också i ITIL 4 (via sekundärkällor ⚠️). Övervakande agenter per kund: `2-9-drift-och-forvaltning.md`.

## Den som bedöms får inte ändra domaren

- [N2] **Byggaren kan inte ändra det som bedömer den.** Varför: kan agenten ändra måttet gör den måttet lättare i stället för arbetet bättre (fallgrop 15). I N1 bygger huvudsessionen medan Johnny tittar, och det är skyddet; låsningen nedan tas in när byggaren blir en delagent (konsolideringsanalysen §7.3). 🎥 loop-videon (Karpathys loop); 📄 Cloudflares `security-audit-skill` (konsolideringsanalysen §4.3); 📄 *Effective harnesses for long-running agents*. Lyft – får vara grind.

| Låses efter Johnnys godkännande | Var | Nivå |
|---|---|---|
| Körbara kontroller | `sites/<namn>/kontroller/` | N2 |
| Granskarens checklista | `.claude/skills/granskare/` 🔧 | N2 |
| Brief och faktabas | `sites/<namn>/brief.md`, faktabasen (`2-7-innehall.md`) | N2 |
| Stilkitet och sajtens `design.md`; nya värden blir förslag | `2-5-yta.md` | N2 |
| Hooks och inställningar | `.claude/hooks/`, `.claude/settings.json` | N2 |
| Agentinstruktionerna – om filen låses är öppet (`bilaga-e-oppna-fragor.md`, fråga 2.3) | `CLAUDE.md` (`3-4-larande-och-underhall.md`) | N2 |
| Baslinjen för visuell regression; agenten som orsakat en avvikelse uppdaterar den inte | `2-9-drift-och-forvaltning.md`, *Ändringar* | N3 |
| Eval-sviten | `evals/` | N4 |

Låsningen i fyra lager:

- [N2] **Lager 1, commit och jämförelse:** det låsta committas när Johnny godkänt, och före varje kontrollkörning kör orkestreraren eller grindhooken `git diff --quiet HEAD -- <låsta sökvägar>`. Ändrat → `blocked`. Det enda lagret som fångar vägar ingen förutsett. 🔧
- [N2] **Lager 2, deny-regler** för `Edit` och `Write` på alla låsta sökvägar, också `settings.json`. Johnny kör `skript/godkann-kontroller.mjs`, som committar. 🎥 loop-videon; 📄 syntaxen: research 2026-10-14.
- [N2] **Lager 3, skyddshooken** stoppar Bash-kommandon som skriver till låsta sökvägar, annars kringgås deny med `echo > fil` (`3-3`).
- [N4] **Lager 4, dolda kontroller** (rättat, motsägelse M4): byggaren ska inte kunna bygga mot testet (fallgrop 31). Kontrollerna ligger utanför byggarens arbetskatalog eller i en sandlåda och körs av orkestreraren; läsförbud är bara ett extra lager. Vid fel får byggaren kontrollens namn, en mening om vad den prövar och felmeddelandet – inte testkoden. 🎥 repo-videon, Ouroboros (en källa – bänken).
