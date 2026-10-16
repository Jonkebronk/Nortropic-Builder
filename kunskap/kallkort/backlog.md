# backlog

**Källa:** Nortropics egen skill i webb-pro (github.com/Nortropic/nortropic-webb-pro, publikt repo), läst lokalt 2026-10-16 vid HEAD `668b03c` (2026-10-15). Lästa filer: `.claude/skills/backlog/SKILL.md` (97 rader, 13 commits; senaste som rörde filen `aa3f6e3`, 2026-10-09 21:05), `backlog/README.md` (47 rader; `fe24ff7`, 2026-10-07), `kontroller/backlog.py` (453 rader; `2a32952`, 2026-10-09; docstringen, huvudfunktionerna och anropen lästa, inte varje hjälpfunktion), början av `backlog/AVSTAMNING-20261005.md`, två poster i sin helhet (en från en dom, en från ett bygge) och statusraderna i alla 220 poster. Bakgrund: `kunskap/research/2026-10-15_webb-pro-genomgang.md` §2 och `historik/webb-pro.md`. Inventeringen: B1, 0 krockar (webb-pro `kunskap/skillkrockar.md:255–256`: "backlog: ingen krock funnen").
**Licens:** egen kod och text, ingen licensfil i repot. Inga villkor för internt bruk.

## Vad det är
En skill som genomför vilande poster i webb-pros backlogg en i taget när Johnny säger "implementera enligt backlog": en liten ändring, ett prov, en commit och status `klar`. Posterna skapades automatiskt av kirurgen, av Johnnys domar i dashboarden och av byggen och granskningar som hittade brister. Mekaniken är `backlog.py`: en markdownfil per post med statusfält, fillås och atomisk skrivning.

## Hur det fungerar
- **Ordning:** hög prioritet först, sedan äldst; namngivna poster bara de (SKILL.md:17).
- **Klassa domen först** (SKILL.md:28–38). En dom från Johnny är ett av fyra slag: *kundbeslut* (gäller den kunden), *smakpreferens* (ett exempel i kalibreringen, aldrig ett krav), *metodhypotes* (oprövad, med hur den prövas) eller *generell rättelse* (ett fel som gäller varje bygge). Bara den sista blir en gemensam regel; ett oklart slag blir kundbeslut eller smak. Klassningen är Codex "punkt 10", som Johnny bad sessionen genomföra med hela listan (webb-pro `BESLUT.md:321–328` och `:353–354`). Han formulerade den alltså inte själv.
- **Välj formen efter hur bygget brast** (SKILL.md:42–49):
  - *utelämnade något* → en obligatorisk plats i något bygget redan fyller i, till exempel en rubrik i mallen, inte en påminnelse i löptext;
  - *rätt delar, fel form* → beskriv hur resultatet ska se ut, i ordning;
  - *kände regeln men hoppade över den* → förbudet ihop med målet och de undanflykter bygget faktiskt använde;
  - *ska bero på läget* → ett villkor på något som syns i underlaget.
  Därtill: "Inga brasklappar som 'om möjligt' eller 'vid behov': de gör regeln valfri."
- **Mikroprov av en ändring** (SKILL.md:63–72): en uppgift som frestar till felet. Arm A får den gamla texten och arm B den nya, med minst fem färska delagenter per arm. En annan modell dömer blint i ombytt ordning. Ändringen behålls om A visar felet och B tar bort det i minst fyra av fem. Provet "belägger bara den lokala rättningen", inte att sajterna blev bättre.
- **Klar är inte verifierad** (README.md:42–48). `verifierad` sätts bara av en senare granskning, aldrig av rapporten som hittade felet och aldrig för att kod ändrats. Ett fynd som anmäls igen öppnar posten.
- **Avvisade och ersatta poster ligger kvar**, så att samma idé inte kommer tillbaka (README.md:40).
- **Spärrar:** en post som säger emot ett gällande beslut av Johnny genomförs inte, och designmaterial från före 2026-10-09 motiverar ingen post (SKILL.md:82–88).

## Kvalitet och underhåll
- Egen kod, 13 commits på SKILL.md mellan 2026-10-01 och 2026-10-09, sedan orörd. Webb-pro lades ned 2026-10-13 (`historik/webb-pro.md`).
- **Utfallet i siffror** (statusraderna i `backlog/B-*.md`): 220 poster, varav 168 klara, 33 vilande, 13 ersatta, 3 pågående och 3 avvisade. Källorna: 67 från granskningar, 58 från kirurgen, 47 från bevakning, 28 från byggen och **20 från Johnnys domar**. Nio av tio poster kom alltså från maskinen själv. Det är genomgångens hypotes 1, *looparna bytte plats*, i siffror (`2026-10-15_webb-pro-genomgang.md` §2).
- **Känt problem:** genomgången visar att Johnnys ord ändå blev mekanik trots regeln "Ingen dom blir ny mekanik" (§2, hypotes 3). Klassningen fanns från 2026-10-05 men hindrade inte att en fråga från Johnny samma morgon blev en station och ett grindkriterium (2026-10-13).
- Inga ärenden; repot har ingen ärendehantering i bruk.

## Det bästa vi kan ta
1. **Klassningen i fyra slag.** Den är redan destillerad: `larande/SKILL.md`, princip 2, och tabellen *Räckvidd* i `larande/genomgang.md` (sajtbeslut, smak, hypotes, generell rättelse), med källhänvisning hit. Inget mer behövs, men Johnny har inte sagt ja till just klassningen; den bör läggas fram som förslag, eftersom den kommer från Codex och inte från honom (princip 9–10).
2. **Formen efter hur bygget brast.** Saknas i larande. `genomgang.md` klassar orsak (process, kontext, regel, kod, ur `guide/3-4`), men inte formen på rättelsen. De två axlarna kompletterar varandra: orsaken avgör var rättelsen hamnar och formen hur den skrivs. Förslag: fyra rader i `larande/skills.md`, *Så skrivs den*, plus regeln om brasklappar.
3. **Mikroprovets siffror och förbehåll.** `larande/skills.md` säger "med och utan" men inte hur många körningar per arm, vem som dömer och vad som räknas som vinst. Mikroprovet ger ett startvärde (5 per arm, blind domare av annan modell i ombytt ordning, 4 av 5) och förbehållet att en lokal rättning inte belägger bättre sajter. Hör hemma i `larande/skills.md`, *Så prövas den*, eller `matning.md`. Märks som 🔧 (husets eget val, ingen extern källa).
4. **Klar är inte verifierad.** Finns redan i guiden: en ny granskare prövar om fynd med allvaret hög (`guide/3-2`, G10). Inget nytt.

## Var det hamnar hos oss
**Skill: larande** – håller med förslaget. Klassningen finns redan i `genomgang.md`; formen på rättelsen och mikroprovets siffror förs in i `skills.md` (eller `matning.md`) som förslag. Själva backloggmekaniken (`backlog.py`, automatiska poster, statusfält och fillås) tas inte in. Guiden ger förslagen en enda plats per sajt: `sites/<namn>/genomgang.md` och, från N2, `larande-forslag.md` (`guide/3-4`). Inventeringens kommentar "kan bli verktyget i den yttre loopen" stämmer inte med guiden: den yttre loopen är N4 och skriver bara förslag (`guide/3-4`, *Auto loop*).

## Passar vår stack?
Det som tas in är metod och text, inte kod. Det enda att översätta är termerna: *kundbeslut* blir *sajtbeslut*, eftersom övningssajterna inte har någon kund, och `LARDOMAR.md`, `DESIGNDOMAR.jsonl` och dashboarden motsvaras av `sites/<namn>/domar.jsonl`, `genomgang.md` och `BESLUT.md`.

## Risker och flaggor
- **Licens, telemetri, betalvägg, inloggning:** inga.
- **Mekaniken är det guiden varnar för:** auto-skapade poster från kirurg, bevakning och byggen gav 220 poster på 13 dagar (`historik/webb-pro.md`). Ta inte in automatiskt skapade poster eller en skill som "genomför backloggen".
- **"Fråga inte om lov för varje post"** (SKILL.md:9) krockar med princip 9: Johnny beslutar varje förslag.
- **Mikroprovet kostar:** tio delagenter och en domare per ändring. Används bara när en ändring är omstridd eller ska bli regel.
- Inga krockar med andra skills enligt krockgranskningen.

## Inloggning
Inget.
