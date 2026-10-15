# 3.2 Granskning och kalibrering

**Status:** konsoliderad v1.0, 2026-10-15; ommärkt samma dag efter granskningen (`konsolidering/granskning-v1.0.md`). Utkast, inte genomgånget med Johnny.

Hur det byggda bedöms, av vem och mot vad. Här står processen: kontrollerna, granskaren, Johnnys stopp, eval och kalibrering. Kriterierna bor i lagren – yta och referenser i `2-5-yta.md`, rörelse i `2-6-rorelse.md`, text och fakta i `2-7-innehall.md`, teknik, tillgänglighet och kodstandard i `2-8-teknik-och-kvalitet.md`. Roller och isolering: `3-1-orkestrering-och-roller.md`.

**Varning från webb-pro** (`kunskap/research/2026-10-15_webb-pro-genomgang.md`): rören verifierades, inte vattnet. Formulärdomarna mätte golvet – kontrast, px – och två dagar senare var "allt generiskt". En kritiker av samma typ som den som klarat kalibreringen på externa sajter sa "fortsätt, inte generisk" om Lerverkets skiss, som Johnny kallade "generisk och katastrofal". Därför är måttet här Johnnys dom, och granskaren sållar bara.

## Mätbart före bedömt

- [N1] **Det mätbara avgörs av kontrollskriptet, det som kräver omdöme av granskaren och det som kostar dyrt om det blir fel av Johnny.** Design och helhetsintryck blir aldrig kontroller. En kontroll avgör om ett steg är redo för Johnnys dom, aldrig om Johnny får se det: sajten visas med de fallerade kontrollerna listade bredvid. Varför: ett skript ger samma svar varje gång och kostar inget, och i webb-pro stannade åtta av elva körningar i en grind innan något renderats (webb-pro-genomgången, punkt 11). 🎥 FDE-videon + VAULT-videon – två källor (konsolideringsanalysen §4.3); 🔧 (beslut 2026-10-15).
- [N2] **Kontrollerna körs först, granskaren sedan,** så att granskaren inte lägger tid på det en fast regel fångar. Kontrollerna och deras grund: `bilaga-c-kontroller.md`.

Gräns: skriptet litar på granskarens rapport. Det skyddar mot en byggare som säger klar för tidigt, inte mot en slarvig granskare – därför isoleringen (`3-1`) och kalibreringen nedan.

## Körbara kontroller skrivs före bygget

- [N1] **Kontrollskriptet skrivs före bygget och ska fallera.** I början av `5-byggplan.md`, steg 3, blir de tio N1-kontrollerna (`2-8-teknik-och-kvalitet.md`) ett körbart skript, och Claude beskriver varje kontroll för Johnny i en mening. En av dem går hela vägen som besökaren, till den primära handlingen genomförd, eftersom kontroller kan gå igenom medan funktionen inte är inkopplad (fallgrop 16). Varför före: skriver modellen testerna efter koden passar de koden – *"det är inte testning, det är fusk"*. 🎥 loop-videon + Coding Sloth-videon – två källor (konsolideringsanalysen §4.3). Lyft – grind.
- [N2] **Briefens mätbara krav blir egna körbara kontroller** innan något byggs, utöver de tio. Johnny godkänner eller ändrar dem, och de låses (`3-1`). Samma källor.
- [N2] **Täckningstabell:** varje del av briefen – varje sida, innehållselement, den primära handlingen, varje krav – kopplas till minst en kontroll eller ett granskningskriterium, och en del utan koppling markeras innan bygget börjar. Varför: det som inte kontrolleras märks inte när det saknas, och agenten bygger annars det lätta och hoppar över det svåra utan att säga något (fallgrop 51; *inget släpps tyst*, `3-1`). 🔧 (v0.74 fas 1b); 🎥 Unlazy-videon (en källa – bänken).
- [N2] **Utforskningstest:** en delagent med webbläsare och ny kontext får mål ur briefen ("ta dig från startsidan till kontaktformuläret och skicka det") i mobil- och datorbredd. Resultatet är fynd, inte en grind, eftersom klickvägen inte går att upprepa exakt. Verkliga fynd kan bli kontroller om Johnny godkänner. 🎥 Jev-uppföljningen (en källa – bänken).

Kontroller som aldrig underkänner något prövas och förnyas: `3-4-larande-och-underhall.md` (fallgrop 74).

## Granskaren

Motsägelse M9 löses så här: **en granskare med en checklista** i första varvet; när det inte räcker delas checklistan på specialister (N2). Ingen panel av 3–5 likadana granskare ovanpå – fyra specialister gånger 3–5 granskare blev 12–20 granskare per varv.

I det första bygget finns ingen granskare: Johnny dömer bygget direkt i `5-byggplan.md`, steg 3. Granskaren kommer in i steg 4 och bedömer samma sajt, så att fynden kan jämföras med Johnnys dom (*Kalibrering*).

- [N1] **En granskare, en checklista, en referens – från steg 4.** Granskaren är en delagent med ren kontext (`3-1`). Checklistan är en markdownfil med en rad per kriterium, och varje rad pekar på sitt kriterium i lagren – till exempel: leder sidan till sin primära handling, utan lekfulla hinder före den – ett spel, en frågesport eller ett extra steg innan besökaren kan höra av sig (`2-3-struktur.md`; fallgrop 120, 🎥 Jack Roberts Motion Design-videon, en källa – bänken)? Följer ytan stilkitet utan att kopiera referensen (`2-5`)? Finns varje påstående i faktabasen (`2-7`)? Referensen är det valda stilkitet och riktningen och kundens referenser. Underlaget är briefen (syfte, målgrupp, primär handling), faktabasen och skärmdumpar i 375, 768 och 1280 px, som granskaren går igenom sektion för sektion, beskurna i full upplösning. Granskaren flaggar bara brister mot checklistan och briefen. Varför: en granskare som ombeds leta luckor hittar nästan alltid några, och att jaga varje fynd leder till överbyggnad; utan förebild hittar kritikern på en egen standard (fallgrop 61); på en nedskalad helsidesbild syns inte detaljfelen (fallgrop 147). 📄 [Claude Code: Best practices](https://code.claude.com/docs/en/best-practices); 🎥 gauntlet-videon; 📄 Zheng m.fl. 2023 (referensstyrd bedömning gav färre fel) och Prometheus (domaren stämde med människor först med rubrik och referenssvar), båda i `kunskap/research/2026-10-15_kompetensluckor-anteckningar/flodet-loopar-bedomare.md` §2; 📄 Anthropic, *Prompting Claude Fable 5.1* ([crop tool recipe](https://platform.claude.com/cookbook/multimodal-crop-tool)).
- [N1] **Checklistan fylls i som markdown.** Varje kriterium får ett av tre utfall: `fungerar`, `fungerar inte` eller `för lite information`. Det tredje räknas aldrig som godkänt; huvudsessionen skaffar mer underlag (ett tillstånd, en bredd, fler skärmdumpar) eller frågar Johnny. Varje brist blir ett fynd i en lista: element, förväntat, faktiskt, allvar – `kritisk` (trasigt eller oläsligt), `hög` (tydlig avvikelse från referens eller brief), `medel` eller `låg`. **Fynd mot ett kriterium med en källa får högst allvaret `medel`.** Varför: granskaren gissar när den bara kan välja ja eller nej (fallgrop 32), byggaren kan bara rätta det den förstår (fallgrop 100), och ett kriterium med en källa får inte bli en grind bakvägen (fallgrop 135; grindregeln i `guide/README.md`). Tre utfall: 🎥 repo-videon (Reticle) + 📄 Anthropic, [Demystifying evals for AI agents](https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents) ("Unknown"-utväg) – två källor. Fälten: 🎥 Hermes-loopvideon (en källa – bänken). Allvaret: 🔧
- [N2] **Granskaren vet inte vilket varv det är** och ser varken rundtaket eller tidigare resultat; rundtaket sköter orkestreraren. Varför: en granskare som vet att det är varv 3 av 3 känner trycket att godkänna (fallgrop 59). 🎥 gauntlet-videon. Instruktion (en källa – bänken).
- [N2] **Fynden som JSON med fasta fält,** som orkestreraren sparar i `sites/<namn>/reviews/` och upprätthåller med ett schema (`3-1`):

  ```json
  {"element": "<selektor>", "skarmdump": "reviews/…png", "forvantat": "…", "faktiskt": "…",
   "kriterium": "<rad i checklistan>", "referens": "…", "allvar": "hog", "utfall": "fungerar inte", "forslag": "…"}
  ```

  Fynd utan element, förväntat och faktiskt eller kriterium går tillbaka till granskaren. 🎥 Hermes-loopvideon (en källa – bänken).
- [N2] **Steget är klart för Johnnys dom** när kontrollerna är gröna och inga `kritisk` eller `hög` återstår – eller när rundtaket är nått (`3-1`), med det som återstår listat. Pilotsajterna granskas fullt i varje varv. 🔧
- [N2] **Varje bedömning har också Johnnys bedömda exempel som referens** (*Kalibrering*). Samma källor som referensen ovan.

## När en granskare inte räcker

- [N2] **Specialister:** checklistan delas på *utseende* (mot stilkit och referens), *beteende* (meny, formulär, tillstånd), *innehåll och fakta* och *konvertering* (den primära handlingen), plus *rörelse* när sajten har rörelse. Var och en har ny kontext och ser inte de andras resultat; orkestreraren slår ihop rapporterna. Delningen görs först när Johnnys domar visar att den enda granskaren missar en sorts fel (`guide/README.md`, princip 8). Varför: en granskare med för många kriterier blir ytlig på allt (fallgrop 82). 🎥 loop-typvideon + Jack Roberts-videon 2 (fem granskande agenter) – två källor (konsolideringsanalysen §4.3).
- [N2] **Beteende granskas mot en beskrivning av tillstånden** (meny öppen och stängd, formulär oskickat, skickat och fel, fokus, tomma tillstånd), aldrig mot en stillbild, och båda sidor visar samma tillstånd innan de jämförs. Varför: annars gissar granskaren vad som är rätt (fallgrop 56). 🎥 loop-nivåvideon (en källa – bänken). Tillstånden beskrivs i `2-3-struktur.md` och `2-4-skelett.md`.
- [N2] **Rörelse granskas på video** eller täta bildsekvenser – normal och snabb scroll, dator och mobil, med och utan `prefers-reduced-motion`. Det som ändå undgår granskaren märks `för lite information`. Varför: en skärmdump fångar bara ett ögonblick (fallgrop 55). 🎥 loop-nivåvideon (en källa – bänken).
- [N2] **Vilket perspektiv saknas?** Varje granskning med flera perspektiv – specialisterna, riktningarna, granskningen av planen – avslutas med den frågan. Svaret loggas; återkommer samma perspektiv blir det ett förslag till ny specialist, som Johnny beslutar om (fallgrop 162). 🎥 STORM-videon (Nate Herks tolkning, en källa – bänken); flera perspektiv som metod: 📄 Shao m.fl., NAACL 2024, [arXiv 2402.14207](https://arxiv.org/abs/2402.14207).
- [N2] **En kodgranskning före publicering,** t.ex. Claude Codes `/code-review`, mot standarden i `2-8-teknik-och-kvalitet.md`. Varför: sajten kan se rätt ut medan koden brister (fallgrop 25). 🎥 Shopify-videon; konsolideringsanalysen §7.3.
- [N4] **Kritiker och rättare:** kritikern utgår från att koden är fel och ser bara koden, briefen och standarden; rättaren åtgärdar; högst 3 varv. Efter varje rättning körs kontrollerna och en snabbgranskning av utseendet. 🎥 Shopify-videon (en källa – bänken).
- [N2] **Blind jämförelse är underlag, inte grind.** En separat granskare får vår sektion och en referenssektion av samma typ, utan etiketter och utan synliga varumärken, och väljer den bättre med motivering. Den körs i båda ordningarna; vinst räknas bara när båda är eniga, annars avgör Johnny. En förlust blir ett fynd med motiveringen. Varför: domare föredrar ofta första positionen (📄 Zheng m.fl. 2023), och parvisa jämförelser liknar människors domar mer än poäng (📄 Chen m.fl. 2024) – båda i `flodet-loopar-bedomare.md` §2. En källa – bänken: Jack Roberts *design loop* är enligt honom själv gauntlet-loopen, och AI LABS säger att mönstret faller på ett nytt projekt utan något att kopiera (konsolideringsanalysen §4.4). Originalitetskontrollen (`2-5-yta.md`) hindrar att vinna genom att kopiera. Grind blir den först med en andra oberoende källa (`guide/README.md`, *Bänken*).
- [N2] **Jämförelse mot förebild i siffror:** utseendegranskaren läser de beräknade CSS-värdena per sektion – typografi, avstånd, hörnradier, skuggor, kontrast – från förebilden och vår sajt med Playwright och listar avvikelserna i siffror: *"rubrikens bokstavsavstånd −0,01em mot förebildens −0,03em"*, inte *"typografin känns lös"*. Siffrorna visar vad som skiljer, den blinda jämförelsen om det spelar roll; förebilden inspirerar men kopieras inte (`2-5`). Samma rapport ingår i sajtgranskningen (`4-foretaget.md`). Varför: en jämförelse utan mätvärden går inte att rätta (fallgrop 194). 🎥 Jack Roberts designgeni-videon (en källa – bänken).
- [N2] **Granskningsdjup efter ändringens storlek.** Ett skript läser varvets `git diff`: bara CSS-värden i en eller två sektioner → snabb granskning av de sektionerna i alla bredder; ny komponent, ändrad layout, fler än två sektioner, navigering eller animationer → full; osäkert → full. Sista varvet är alltid fullt, och valet loggas så att eval visar om snabbgranskningar släpper igenom fel. Varför: full granskning av varje liten ändring gör loopen långsam och dyr (fallgrop 21). 🔧 (idé: Jev-uppföljningen)

## Resultatlogg

Johnnys domar sparas från första sajten i `sites/<namn>/domar.jsonl` (*Kalibrering*).

- [N2] **En rad per varv** i `sites/<namn>/resultat.jsonl`:

  ```json
  {"steg": "bygge", "varv": 2, "provat": "…", "kontrollerFallna": ["ingen-horisontell-scroll-375"],
   "granskning": {"kritisk": 0, "hog": 1}, "djup": "full", "beslut": "behallen",
   "modell": "<modell-id>", "roll": "rattare", "startad_av": "orkestrerare", "tid": "<ISO-tid>"}
  ```

  `roll` och `startad_av` visar i efterhand vilken agent som gjorde vad och vem som startade den. 🎥 Buzz-videon (en källa – bänken).
- [N2] **Behåll eller ångra:** ger ett varv fler fallerade kontroller än före varvet ångras det med `git revert` och loggas som `"beslut": "angrad"`. 🎥 loop-videon; 📄 [karpathy/autoresearch](https://github.com/karpathy/autoresearch) – samma primärkälla, Karpathy (en källa – bänken).

## Stoppen och människan

Johnny är art director från första minuten, inte bara domare i slutet. Ansvaret mot kunden ligger hos honom, och därför kräver det som inte går att ångra alltid hans godkännande. 🎥 ADLC-videon.

v0.74 lovade "två stopp" men slog i pilotfasen på minst åtta slags ingrepp (motsägelse M14). Det verkliga antalet för första sajten, ett stopp per steg i `5-byggplan.md`:

| Stopp | Steg | Johnny ser och dömer |
|---|---|---|
| 1. Brief | 1 | Stämmer bilden av verksamheten? Briefen och faktabasen efter kundens bekräftelse, med sidkartan i `sites/<namn>/sidkarta.md` (`2-1-strategi.md`) |
| 2. Riktningar | 2 | Startsidan i tre stilkit; Johnny kan stryka innan kunden väljer (beslut 2026-10-15) |
| 3. Bygget | 3 | Varje kontroll i en mening före bygget, sajten i webbläsaren under bygget och till sist hela sajten i mobil och dator (*Slutgranskningen*) |
| 4. Granskaren | 4 | Granskarens fynd bredvid sin egen dom (*Kalibrering*) |
| 5. Publicering | 5 | Förhandsadressen och sedan den publicerade sajten, om sajten publiceras (`2-8-teknik-och-kvalitet.md`) |
| 6. Första rapporten | 6 | Rapporten innan den går till kunden (`2-9-drift-och-forvaltning.md`) |

Därtill varje gång huvudsessionen stannar och frågar – något saknas, samma fel kommer tillbaka, ett steg tar dubbelt så lång tid som uppskattat (`3-1`, `1-kundens-vag.md`) – och varje ny regel (`guide/README.md`, princip 9–10). Från N2 tillkommer varje `blocked` och varje ändring av låsta filer. **Första sajten: sex stopp, ett per steg, plus varje fråga.** Det verkliga antalet räknas per sajt ur `progress.md` och domloggen.

- [N2] **Pilotfasen:** de första sajterna körs med alla stopp och full granskning i varje varv. Förtroende tar längre tid än bygget. 🎥 FDE-videon.
- [N2] **Inget stopp godkänns på timeout.** Ett godkännande sätts bara efter Johnnys verkliga svar (`3-3`, tidsgränsen för frågor).
- [N2] **Ett stopp släpps ett i taget, och bara när Johnny säger det.** Varför: autonomi före förtroende (fallgrop 70). Webb-pros lärdom: designvalet stannar hos Johnny tills han själv säger att han är nöjd med flera sajter i rad (webb-pro-genomgången, risk 3). Villkoret är öppet (`bilaga-e-oppna-fragor.md`, *Autonomi*). Alternativen: ett antal leveranser i rad utan att Johnny behövt rätta (`historik/principer.md`, *Ordningen*; jfr `guide/README.md`, princip 7), eller en uppmätt överensstämmelse mellan granskaren och Johnny (*Kalibrering*).
- [N2] **Släpps aldrig:** ändring av låsta filer, nya regler och utskick till kundens kundlista (`3-1`). Publicering kräver Johnnys godkännande; om förvaltningens standardändringar någon gång får publiceras utan hans klick är öppet (`2-9-drift-och-forvaltning.md`, `bilaga-e-oppna-fragor.md`).

### Slutgranskningen

- [N1] **Johnny testar sajten själv** i webbläsaren, i mobil och dator – i det första bygget i slutet av `5-byggplan.md`, steg 3, från sajt 2 efter granskaren. Först får han en sammanfattning ur `progress.md` med belägg: vad som byggts, vad som inte blev av och vilka kontroller (från N2 också fynd) som återstår (`3-1`). Varje avvisning får en kort motivering (*Kalibrering*). Varför: agenter kan inte bedöma sajten ur en människas perspektiv. 🎥 Shopify-videon.
- [N2] **Ett kort förhör:** 2–3 frågor till Johnny om de riskfyllda delarna – formuläret, den primära handlingen, tredjepartstjänster. Ett fel svar stoppar inget men visar var Johnny ska titta. Varför: när godkännandena blir många blir de ett klick utan förståelse (fallgrop 87) – *lägg ut tänkandet, aldrig förståelsen*. 🎥 Fable 5-videon och radera-skills-videon. Förhöret i förvaltningen: `2-9-drift-och-forvaltning.md`.
- [N2] **Kommentarer knutna till element, samlade i en runda:** varje kommentar sparas med selektor och skärmdump av elementet, och först när Johnny är klar blir hela listan en ändringsomgång. Varför: en runda per kommentar ger fler varv genom grindarna (fallgrop 64). 🎥 Claude Design-videon (en källa – bänken).
- [N2] **Önskade ändringar blir nya byggsteg** genom samma kontroller och granskning.
- [N2] **Avstämning mot löftena:** en isolerad agent läser briefen, beslutskartan (`2-1-strategi.md`) och den färdiga sajten och listar allt som utlovats men saknas eller avviker. Fynden sätter `blocked` tills Johnny tagit ställning. Varför: utlovat men aldrig byggt upptäcks inte om ingen jämför (fallgrop 78); täckningstabellen fångar luckan före bygget, avstämningen efter. 🎥 ADHD-videon (en källa – bänken).
- [N3] **Ultra review** (`/code-review ultra`) – Claude Codes granskning i en molnsandlåda – kan Johnny starta före publicering av större sajter. Den debiteras mot usage credits efter några gratiskörningar och kräver claude.ai-konto, så den startas av Johnny, inte av flödet. 🎥 funktionsvideon; 📄 `kunskap/research/2026-10-14_claude-code-verifiering.md` (research preview).

Johnnys dom gäller den sajten; en regel blir den bara om Johnny säger det (`guide/README.md`, princip 10), och förslag till regler står i `3-4-larande-och-underhall.md`. Ändrat från v0.74, där feedbacken skrevs direkt in i `arbetssatt.md` (webb-pro-genomgången, risk 4).

## Eval: Johnnys dom över sajten

På den första sajten är eval Johnnys domar i `domar.jsonl` (*Kalibrering*) och tiden per steg i `progress.md` (`3-1`).

- [N2] **Eval mäter Johnnys dom över sajten, inte varv och fynd.** Huvudmåttet är om Johnny godkänner sajten och hur mycket han behövde rätta. v0.74 mätte om flödet nådde sista fasen, antal varv, fynd vid första granskningen och antal ingrepp – rören – och räknade färre ingrepp som bättre, vilket belönar att Johnny tittar mindre. 🔧 (webb-pro-genomgången, risk 2; beslut 2026-10-15)
- [N2] **Per sajt loggas** Johnnys dom per stopp med motivering, antal ändringar i slutgranskningen, tid per steg (klocktid och Johnnys tid, `1-kundens-vag.md`) och kostnad. Varv, fynd och `blocked` är felsökningsdata, inte kvalitet. 🔧
- [N2] **En provsajt för flödet – vår "Benchy".** När den första övningssajten är godkänd fryses dess underlag: brief, faktabas, bilder och stilkit. Efter varje större ändring av biblioteket, stilkiten, granskaren eller en skill byggs den om och jämförs med den godkända versionen, sida mot sida i mobil och dator. Blev något sämre går ändringen tillbaka till Johnny innan den används. Det är en tidig och liten version av testsviten nedan, på samma sätt som en 3D-skrivare kalibreras med samma provbit efter varje ändring. 🔧 (`BESLUT.md` 2026-10-15)
- [N2] **Ett tillval tas in först när ett prov med och utan visar nytta på en riktig sajt.** Varför: tillval tas annars in på utlovade siffror – RTK lovade cirka 90 % och sparade ingenting i ett oberoende test (fallgrop 128). Kandidaterna, bland dem Caliper: `bilaga-a-verktyg.md`.
- [N3] **Värdet i siffror:** tid, kostnad och Johnnys tid per sajt över tid, jämfört med vad sajten hade krävt manuellt – underlag för pris (`4-foretaget.md`). 🎥 FDE-videon.
- [N4] **Testsvit av riktiga verksamheter:** 3–5 testbriefar från verkliga företag med verkliga fakta och bilder (med lov), inte påhittade – webb-pro valde bort fiktiva företag första dagen eftersom de *"inte har något specifikt att säga och därför ger slop"*. Sviten täcker olika svårigheter: mycket text och få bilder, ingen egen bild, motstridiga uppgifter (flödet ska fråga, inte gissa), mobil först. Johnny bedömer resultaten blint. Varje brief körs minst två gånger, eftersom körningarna blir olika, och budgeten per svitkörning har ett tak. 🔧
- [N4] **Är planeringen för tung?** Samma testbriefar körs med hela planeringen och med en smal variant – bara syfte, fakta, kontroller och något synligt tidigt – och Johnnys domar, tid och kostnad jämförs. Varför: planeringen finns för att flödet ska kunna gå utan att Johnny tittar, men delar som beskriver *hur* modellen ska bygga kan vara överflödiga, och man kan inte ge bra feedback förrän man ser resultatet. 🎥 Ebbelaar-intervjun (en källa – bänken); 🔧 (v0.74 fas 1b).
- [N4] **Adversarial granskning av planen:** en angripare med ny kontext utgår från att briefen och kontrollerna är fel och letar motsägelser i briefen, kontroller som inte mäter det de påstår, steg i fel ordning eller med fel beroenden, oklarheter som inte är utredda och krav som inte går att uppfylla. Orkestreraren försvarar punkt för punkt och åtgärdar det som håller; angriparen ser svaren och kan svara igen, högst 3 omgångar. Kvarstående oenigheter går till Johnny. Tas in om eval visar att den fångar fel som annars når honom. Varför: en motsägelse i briefen klarar varje grind, eftersom grindarna mäter mot briefen. 🎥 Buzz-videon (en källa – bänken). En annan modell som angripare ger andra blinda fläckar men skickar kundens innehåll till ytterligare en leverantör, kostar mer och kräver kundens samtycke ⚠️.
- [N4] **En ändring i taget:** kör sviten som baslinje, ändra en sak (en skill, en regel, en modell), kör igen och behåll ändringen bara om Johnnys domar inte blivit sämre. Johnny beslutar. Verktyg: skill-creator (med och utan skill) och `claude plugin eval` (Claude Code 2.1.269+, varje fall tre gånger som standard). 📄 `flodet-loopar-bedomare.md` §1. Varför: en loop som förbättrar sig själv utan eval kan gå åt fel håll utan att någon märker det.

**Kostnad:** i Anthropics exempel tog en ensam agent 20 minuter och 9 USD, en full harness 6 timmar och 200 USD (📄 [Harness design for long-running application development](https://www.anthropic.com/engineering/harness-design-long-running-apps)). Mät kostnaden i eval; lita inte på prislistan.

## Kalibrering mot Johnnys smak

LLM-domare är enligt forskningen *approximators, not replacements*: de klarar parvisa jämförelser med tydliga skillnader men ligger nära slumpen när skillnaderna är subtila. I "MLLM as a UI Judge" låg parvisa domar på cirka 60 %, nära slumpen för användarvänlighet, och upp mot 90 % när människornas skillnad var stor (📄 Luera m.fl. 2025, [arXiv 2510.08783](https://arxiv.org/abs/2510.08783)). Ingen studie mäter domare mot människor för småföretagssajters design (`historik/karta/flodet.md`).

- [N1] **Johnnys domar är måttet och den första kalibreringen.** Från första sajten sparas varje dom – godkänd eller avvisad, med en kort kritik (`varfor`) och för en avvisning *För godkänt:* med konkreta ändringar (`for_godkant`) – i `sites/<namn>/domar.jsonl`. Det är formen Johnny själv använde i måttstocken, och granskaren svarar i samma form, så att domarna går att jämföra direkt (`mattstock/mattstock.md`; `BESLUT.md` 2026-10-15). I `5-byggplan.md`, steg 4, läggs granskarens fynd bredvid Johnnys dom över samma sajt; Johnny avgör vilka fynd som var rätta och vad granskaren missade, och avvikelserna loggas i `domar.jsonl` som kalibreringsdata. Varför: utan *varför* går smaken inte att lära ut (fallgrop 170), och en granskare som aldrig jämförts med Johnny kan inte litas på (fallgrop 139). 🔧; motiveringen 🎥 sex-färdigheter-videon och 📄 Husain, [Using LLM-as-a-judge](https://hamel.dev/blog/posts/llm-judge/) (godkänt eller underkänt med skriven kritik).
- [N2] **Johnnys måttstock** (`BESLUT.md` 2026-10-15) är grunden för kalibreringen. Den tas fram genom att **Johnny bedömer 39 sajter** som godkänd eller underkänd, med en kort kritik. Claudes förväntan registreras före domarna. Metoden, urvalet och domarna finns i `mattstock/`. Måttstocken – tre frågor om mobilens första skärm, äkthet och utförande – står i `mattstock/mattstock.md`, godkänd av Johnny 2026-10-15. Måttstocken blockerar inte första sajten. 📄 `historik/karta/flodet.md`.
- [N2] **Kalibrera på systemets egna utkast,** inte bara på andras sajter; så fort flödet gjort utkast tas de med bland exemplen. Varför: webb-pros granskare klarade kalibreringen på externa sajter (0 av 4 och 0 av 5 felaktiga godkännanden), men en kritiker av samma typ höll inte med Johnny om Lerverket; kalibreringen överfördes inte till systemets egna utkast (webb-pro-genomgången, punkt 8).
- [N2] **Så kalibreras granskaren:** 10–20 % av Johnnys exempel blir exempel i checklistan, resten används för att mäta. Den första mätningen görs i byggplanens steg 4 på måttstockens 31 sajter, innan granskaren ser en egen sajt (`5-byggplan.md`; `BESLUT.md` 2026-10-15). Mät andelen rätt godkända och rätt underkända (TPR och TNR), inte rå överensstämmelse, och frys prompten innan den mäts. Sikta på över 90 %, men räkna inte med det. Varför: en granskare av smak som aldrig kalibrerats släpper igenom det Johnny hade underkänt (fallgrop 139). 📄 Husain, [Using LLM-as-a-judge](https://hamel.dev/blog/posts/llm-judge/); `historik/karta/flodet.md`; 🎥 Ebbelaar-intervjun.
- [N2] **Bedömaren fattar bara de grova besluten:** den avvisar det uppenbart generiska eller trasiga innan Johnny tittar. Finjusteringen och jämna fall går till Johnny. 📄 `historik/karta/flodet.md`; Luera m.fl. 2025.
- [N2] **Johnnys beslut är redan märkta exempel** och sparas med granskarens bedömning av samma sak i `kalibrering/<granskare>.jsonl`:

| Johnnys beslut | Kalibrerar |
|---|---|
| Riktningar han stryker | Bedömningen av riktningar (`2-5-yta.md`) |
| Godkännanden och avvisningar i slutgranskningen, med `varfor` | Granskaren eller specialisterna |
| Det han hittar som granskaren borde ha sett | Den som missade (förslag till kriterium: `3-4`) |
| Avvisade visuella ändringar i förvaltningen (N3) | Utseendegranskningen |

- [N2] **Kalibrera om när Johnny ändrar uppfattning** – kriterierna driver när man bedömer utdata (📄 Shankar m.fl. 2024, [arXiv 2404.12272](https://arxiv.org/abs/2404.12272)).
- [N3] **Kalibrera om vid varje modellbyte,** eftersom en ny modell kan läsa samma prompt annorlunda. 🎥 Ebbelaar-intervjun; 📄 *Harness design*.
- [N2] **En förbättrad checklista är ett förslag:** Johnny godkänner, och checklistan låses på nytt (`3-1`). Överensstämmelsen mäts på exempel som inte användes vid förbättringen.
- [N4] **Om bedömaren någonsin får ersätta ett av Johnnys stopp** – v0.74 föreslog det vid över 90 % överensstämmelse – är öppet (`bilaga-e-oppna-fragor.md`, *Autonomi*). Till dess ersätter bedömaren aldrig Johnnys dom.
