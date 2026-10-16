# karpathy/autoresearch

**Källa:** https://github.com/karpathy/autoresearch, läst 2026-10-16 i den lokala klonen (`kallor/fg/karpathy_autoresearch/repo`) vid commit `228791fb499a` (2026-03-25 17:07 −0700, "Merge pull request #342"), som också är senaste commit på GitHub. Inga releaser; `pyproject.toml` har version 0.1.0. Lästa filer: `README.md`, `program.md`, `prepare.py` (hela strukturen, särskilt `evaluate_bpb`), `train.py` (struktur, hyperparametrar, tidsbudget, sammanfattningen), `analysis.ipynb`, `pyproject.toml` och `.gitignore`. Utfallet i stor skala: nanochats `README.md` (topplistan) och `dev/LEADERBOARD.md`, båda Karpathys egna, hämtade med `gh api` 2026-10-16. Ärenden och siffror via GitHubs REST-API samma dag.
⚠️ Karpathys två X-inlägg som README länkar till gick inte att läsa (x.com svarade 402, en spegel 451). Forkarna nedan är bara lästa i README.

**Licens:** README säger "MIT", men repot saknar `LICENSE`-fil och GitHubs API anger ingen licens (`license: null`). MIT kräver att copyrightnoteringen och licenstexten följer med kopior av koden; här finns ingen sådan text. För oss spelar det liten roll: vi tar mönstret, inte koden.

## Vad det är
Ett litet, avsiktligt minimalt repo där en kodagent forskar på egen hand över natten: den ändrar en träningsfil för en liten språkmodell, tränar i exakt fem minuter, behåller ändringen om måttet blev bättre och kastar den annars, om och om igen. Människan programmerar inte Python utan instruktionen `program.md`, som Karpathy kallar "essentially a super lightweight 'skill'".

## Hur det fungerar
- **Tre filer med var sin ägare.** `prepare.py` är fast: konstanterna (`TIME_BUDGET = 300`, `MAX_SEQ_LEN`, `EVAL_TOKENS`), data, tokeniserare, dataladdare och mätfunktionen `evaluate_bpb`, märkt "DO NOT CHANGE — this is the fixed metric". `train.py` är den enda fil agenten ändrar. `program.md` ändras bara av människan.
- **Ett mått, lägre är bättre:** `val_bpb` (bitar per byte på valideringsdata), valt för att vara oberoende av ordförrådets storlek, så att olika arkitekturer jämförs rättvist.
- **Fast budget:** fem minuter väggklocka per försök oavsett vad agenten ändrar – cirka 12 försök i timmen och 100 per natt. Försöken blir jämförbara på samma maskin, inte mellan maskiner (README, *Design choices*).
- **Loopen** (`program.md`, *The experiment loop*): egen gren `autoresearch/<tag>`; första körningen är alltid baslinjen; ändra → `git commit` → kör med all utdata till `run.log` → läs bara måttet med `grep` → logga → förbättring: behåll commiten; lika eller sämre: `git reset`. Ett försök över tio minuter avbryts och kastas. Krasch: rätta det som är dumt och enkelt, annars logga `crash` och gå vidare.
- **Förbud:** inte ändra `prepare.py` eller utvärderingen, inte installera paket. Minnet är en mjuk gräns.
- **Enkelhetskriteriet:** "All else being equal, simpler is better." En vinst på 0,001 med 20 rader fulkod är inte värd det; samma resultat med borttagen kod är en vinst.
- **Loggen** `results.tsv` (commit, mått, minne, `keep`/`discard`/`crash`, beskrivning) committas inte, så att återställningarna inte raderar historien. `analysis.ipynb` räknar andelen behållna, löpande bästa värde och de största vinsterna.
- **"NEVER STOP":** agenten ska aldrig fråga om den ska fortsätta, utan köra tills människan avbryter.

## Kvalitet och underhåll
- 98 004 stjärnor, 13 584 forkar, 9 bidragsgivare (med anonyma), skapat 2026-03-06, senaste push 2026-03-26 och ingen aktivitet sedan. 197 öppna, varav 54 ärenden och 143 PR (REST-API 2026-10-16). Inventeringens 97 838 ★ är något äldre.
- **Utfallet:** i nanochats topplista sänkte autoresearch runda 1 (2026-03-09) "time to GPT-2" från 2,02 till 1,80 timmar och runda 2 (2026-03-14) till 1,65. Ändringarna hittades på en liten modell (d12) och "easily translated from d12 to d24"; inför runda 2 kontrollerade Karpathy själv med ett enhetstest och ett snitt av fem körningar (`dev/LEADERBOARD.md`, Run 5–6). Loopen hittade, människan prövade och förde in.
- **Kända problem:**
  - [#599](https://github.com/karpathy/autoresearch/issues/599): agenten kan sänka `val_bpb` utan bättre modell – hoppa över optimeraren, linda in mätfunktionen, krympa valideringsmängden – eftersom förbudet bara är prosa och siffran bara skrivs ut. Påvisat mot `228791f`.
  - [#384](https://github.com/karpathy/autoresearch/issues/384): mätinstrumentet räknar bytes fel för tokens som inte är giltig UTF-8 och ger för bra värden. Mönstret finns kvar i `prepare.py` rad 187–192 vid läst commit.
  - [#206](https://github.com/karpathy/autoresearch/issues/206), [#22](https://github.com/karpathy/autoresearch/issues/22), [#47](https://github.com/karpathy/autoresearch/issues/47): girig sökning djupet först, lokala minimum, upprepade idéer.
  - [#57](https://github.com/karpathy/autoresearch/issues/57) (41 kommentarer): Codex följer inte "NEVER STOP"; användare lägger en `while`-loop runt. [#7](https://github.com/karpathy/autoresearch/issues/7): resultatet går förlorat om utvärderingen kraschar.
- **Forkar som generaliserar mönstret:** [davebcn87/pi-autoresearch](https://github.com/davebcn87/pi-autoresearch) (8 185 ★, MIT, commit `04b8a50dac7e` 2026-10-07): valfritt mått via `.auto/measure.sh`, `checks.sh` (tester, typer, lint) som spärrar `keep`, `maxIterations`, och en konfidenspoäng = bästa förbättring delad med brusgolvet (MAD), "advisory only"; Lighthouse finns som exempeldomän. [uditgoenka/autoresearch](https://github.com/uditgoenka/autoresearch) (6 574 ★, MIT, 2026-08-12) som Claude Code-skill.

## Det bästa vi kan ta
1. **Baslinje först, en ändring, ett mått, behåll eller ångra** (`program.md`, *The experiment loop*). Finns redan som 3-2 *Behåll eller ångra*, kontroll C157 och princip 7 i `guide/README.md`.
2. **Mätinstrumentet ligger utanför det agenten får ändra** (`prepare.py`, `evaluate_bpb`) – och lärdomen från #599: ett förbud i prosa räcker inte. Hos oss låses kontrollerna i verktyget (3-1, fyra lager), och Stop-hooken kör mätningen själv i stället för att läsa agentens utskrift (3-1, *Grindkontrollen*).
3. **Enkelhetskriteriet som utslagsregel vid lika mått.** Passar rensningsprovet (3-4, *Rensning vid ny modell*: behåll rensningen om resultatet inte blev sämre) och standardtexten "Bygg inte mer än uppdraget kräver" (3-3).
4. **Loggen överlever återställningen** och har status och en rad om vad som prövades – samma sak som vår förbättringsjournal (3-4) och `resultat.jsonl` (3-2), där också ångrade försök ska stå.
5. **Utdata till fil, bara måttet in i kontexten** (`> run.log 2>&1`, sedan `grep`). Gäller våra Lighthouse- och Playwright-körningar.
6. Ur pi-autoresearch: **brusgolv och spärrkontroller** – en förbättring inom bruset är ingen förbättring, och ett försök som bryter en annan kontroll kastas.

## Var det hamnar hos oss
**Håller med förslaget: skill `larande`, bara entydiga mått**, som ett avsnitt i delfilen om loopar (`larande/loopen.md`, som finns som utkast; förslag till rubrik: *Optimering mot ett mått*), bredvid villkoren i 3-4 *En loop lönar sig när*. Ingen kod, inget installeras.
- **Entydiga mått hos oss:** antal fallerade kontroller i kontrollskriptet (bilaga C; 3-2); axe-fel med WCAG 2.2-taggarna (kontroll 8, målet 0) för samma sidor och tillstånd; bytes i `dist/` (JS, CSS, HTML, bilder, med gzip), helt deterministiskt; Lighthouse-labbvärden som LCP och TBT i millisekunder, som median av 3–5 körningar (2-8, *Brusiga mätningar*).
- **Lighthouse-poängen är spärr, inte mål.** Den har ett tak (100, kontroll 9): när taket är nått finns inget att optimera. Som i pi-autoresearch blir 100 en spärrkontroll, medan millisekunder eller bytes är det som optimeras.
- **Inte entydigt:** design, text, premiumkänsla, Johnnys dom och granskarens dom. Granskaren träffade 71 % rätt godkända och 86 % rätt underkända vid första mätningen (3-2); att optimera mot den vore att optimera mot fel mål. Anteckningarna avråder redan från darwin-skill av samma skäl (`flodet-loopar-bedomare.md` §1).
- **Var i flödet:** förvaltningen (2-9) och biblioteket – prestanda och sidvikt på en färdig sajt eller komponent, på egen gren, med Johnnys godkännande före sammanslagning. Inte i N1. Nivån (N2 eller senare) är mitt förslag ⚠️.

## Passar vår stack?
Repot självt passar inte: Python, PyTorch 2.9.1 och en NVIDIA-GPU (testat på H100). Mönstret översätts:
- `train.py` → stegets tillåtna filer i funktionslistan (3-1); `prepare.py` och `evaluate_bpb` → låsta kontroller och ett låst mätskript; `program.md` → avsnittet i `larande`; `results.tsv` → `resultat.jsonl` och förbättringsjournalen, utanför det som återställs.
- Fem minuter → en budget per varv i tid och token, plus ett tak för antal varv och total kostnad.
- "NEVER STOP" → rundtak och eskalering till Johnny (3-1, *Stoppvillkor*). Ingen publicering ur loopen.
- Ett Lighthouse-varv kräver bygge och servering och tar minuter; bytes och axe går på sekunder. Jämför alltid samma sidor, samma enhetsprofil och samma tillstånd, som `val_bpb` hålls jämförbart.

## Risker och flaggor
- **Licensen är oklar:** "MIT" i README men ingen licensfil. Inget kopieras, så ingen praktisk följd.
- **Krockar med våra principer:** "NEVER STOP" och README:s råd att stänga av alla behörigheter ("disable all permissions") går emot tak, auto mode och att Johnny beslutar. Ta inte in `program.md` ordagrant.
- **Måttfusk och fel instrument** (#599, #384): ett mått är entydigt bara om instrumentet är låst och prövat. Pröva att en kontroll kan säga nej innan loopen litar på den (3-2: kontrollskriptet ska fallera före bygget).
- **Brus:** originalet behåller varje förbättring, också inom bruset. För Lighthouse krävs median och ny körning.
- **Girig sökning** fastnar i lokala minimum (#206); loopen hittar finjusteringar, inte en bättre idé.
- **Kör inte repot:** `prepare.py` laddar ner data från Hugging Face och `train.py` hämtar en Flash Attention-kärna från Hugging Face Hub när det körs (`kernels.get_kernel`, rad 20–24). Ingen telemetri i koden enligt `grep`.
- **Krockar med andra skills:** tredjepartsskills med samma mönster (uditgoenka, drivelineresearch, darwin-skill) tas inte in; originalet destilleras. `/goal`, Stop-hooken och ralph-loop täcker loopmekaniken – autoresearch tillför bara behåll-eller-ångra mot ett mått och enkelhetskriteriet.

## Inloggning
Inget. Repot och nanochats topplista är publika. Karpathys X-inlägg kräver inloggning eller betalning för att läsas här (402) men behövs inte; topplistan i nanochat är hans egen text om utfallet.
