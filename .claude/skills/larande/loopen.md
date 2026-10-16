# Loopar och långa körningar

En loop är försök, kontroll och nästa drag: klart, nytt försök eller Johnny (→ `guide/README.md`, princip 3; `guide/3-1`, *Loopen*). Vilket mönster som passar avgörs av **måttet**.

## Välj efter måttet

| Arbetet | Måttet | Mönster | Tak och utgång |
|---|---|---|---|
| Bygget, kontrollskriptet, axe, Lighthouse, typkontroll | Entydigt: grönt eller rött | `/goal` med ett utskrivet belägg, eller en Stop-hook som kör kontrollerna | Varvtak; efter taket `blocked` med det som återstår |
| Optimering mot ett tal (prestanda, sidvikt, antal axe-fel) | Ett tal och en fast budget | Autoresearch: ändra, mät, behåll eller ångra med git, logga varje försök | Fast tid per försök; måttet får inte röras |
| Design, text, ton | Johnnys omdöme | Ingen loop till "klart". Granskaren med ren kontext sållar, Johnny dömer | Ett varv, sedan Johnny |
| Många steg över flera sessioner | Funktionslista med `passes` | Långkörningsmönstret | En funktion per varv, commit per lyckat varv |

**Bästa mot sista.** Har flera varv gjorts på samma sak, jämförs den bästa versionen med den sista innan något går till Johnny; en mellanversion är ibland bättre, och då tas det som gjorde den bättre tillbaka. 📄 webb-pros `bygg-sajt`, steg 5 (`granska.py --jamfor`, egen; en källa).

## `/goal`

- Sätter ett villkor; efter varje tur avgör en liten modell *inte uppfyllt*, *uppfyllt* eller *omöjligt*. Den kör inga kommandon och läser inga filer, så villkoret måste kunna visas i Claudes egen utdata. 📄 [Claude Code: /goal](https://code.claude.com/docs/en/goal) (läst 2026-10-16).
- Ett bra villkor har ett mätbart slutläge, en angiven kontroll ("`node skript/kontroll.mjs` avslutas med 0") och det som inte får ändras ("inga filer i `sites/<namn>/kontroller/` ändras"), plus en gräns som "eller stoppa efter 20 turer" och en utgång: "eller stanna när ett steg kräver Johnny (inloggning, publicering, en nekad åtgärd)". Turtaket bedöms av modellen ur samtalet och är mjukt; det hårda taket bor i hooken. 📄 samma sida; ärendena [#98066](https://github.com/anthropics/claude-code/issues/98066) och [#100010](https://github.com/anthropics/claude-code/issues/100010) (via `kunskap/kallkort/goal-stop-hook-och-granskar-subagent.md`).
- `/goal` driver men är ingen grind; grinden är kontrollerna (→ `guide/3-1`, *Orkestreraren*).
- ⚠️ Kända problem i oktober 2026: `/goal clear` kan köas för evigt medan ett mål körs, och utvärderaren har i ett fall inte sett instruktionen (ärenden [#100634](https://github.com/anthropics/claude-code/issues/100634), [#93744](https://github.com/anthropics/claude-code/issues/93744)).

## Stop-hook

- En kommandohook på `Stop` kör kontrollerna; avslutskod 2 med det som saknas på stderr får Claude att fortsätta. 📄 [Hooks guide](https://code.claude.com/docs/en/hooks-guide).
- Claude Code släpper en Stop-hook som blockerat **åtta gånger i rad** utan verktygsanrop emellan; läs `stop_hook_active` och räkna varven i hooken själv, så att taket och överlämningen till Johnny blir våra (→ `guide/3-1`, *Grindkontrollen*). 📄 samma sida (*Stop hook hits the block cap*; `CLAUDE_CODE_STOP_HOOK_BLOCK_CAP`).
- Taket på åtta nollställs vid varje verktygsanrop, så i en loop som arbetar slår det nästan aldrig till. Därför räknar hooken varven själv.
- **Blockera med JSON på stdout** (`{"decision": "block", "reason": "…"}`), inte bara med kod 2: ett öppet fel gör kod 2 icke-blockerande när stderr innehåller "No such file" eller "can't open" (ärende [#99171](https://github.com/anthropics/claude-code/issues/99171), oktober 2026).
- **Läs sista svaret ur `last_assistant_message`,** inte ur transkriptfilen, som skrivs asynkront och kan släpa efter. 📄 [Hooks](https://code.claude.com/docs/en/hooks) (*Common input fields*, läst 2026-10-16).
- **Hookens tillstånd:** en fil relativt repots rot med varvräknare och `session_id`, så att en annan session inte blockeras; skriv den atomiskt, och tillåt avslut om filen är trasig, så att ett fel i hooken aldrig låser sessionen. Vid vårt tak går steget till Johnny som `blocked`, i stället för att bara sluta. 📄 ralph-loops `stop-hook.sh` och dess ärenden (Apache-2.0, via `kunskap/kallkort/ralph-loop.md`).
- Prompt- och agenthookar låter en modell avgöra; agenthookar är experimentella. Där svaret är känt avgör koden. 📄 samma sida.
- Hooks är N2: de tas in när steg körs utan att Johnny tittar (→ `guide/3-1`).

## Långkörningsmönstret

Ur Anthropic, [Effective harnesses for long-running agents](https://www.anthropic.com/engineering/effective-harnesses-for-long-running-agents) (2025-11-26):

- En **funktionslista** i JSON där bara `passes` får ändras; JSON valdes för att modellen ändrar den mer sällan än markdown. Hos oss: `sites/<namn>/checkpoints.json` (→ `guide/3-1`, N2).
- En **progressfil** och git-loggen läses i början av varje session. Hos oss: `progress.md`.
- **Orientering och regression först.** Varje varv börjar med `progress.md`, `git log` och kontrollskriptet, och den kontroll som går hela vägen till den primära handlingen körs innan något nytt byggs. Är den röd lagas den först.
- **En funktion i taget**, prövad som en besökare i webbläsaren innan den markeras klar; enhetstester och curl räckte inte. Skärmbilden som belägg anger bredden (375, 768 eller 1280 px).
- **En commit per lyckat varv**, så att ett dåligt varv kan ångras.
- Installera inte referensimplementationen `autonomous-coding`; dess README anger "Internal Anthropic use" ⚠️.

## Autoresearch

Ur [karpathy/autoresearch](https://github.com/karpathy/autoresearch), `program.md` (MIT): fast tidsbudget per försök, ett enda mått, en fil som får ändras och en utvärdering som inte får det, en logg över varje försök (`results.tsv`: commit, mått, behåll, ångra eller krasch, beskrivning), och "simpler is better". Hos oss bara där måttet är entydigt (→ `guide/3-2`, *Behåll eller ångra*). Mönstrets "NEVER STOP" gäller inte oss: varje loop har ett tak.

- **Ett förbud i prosa räcker inte.** I ärende [#599](https://github.com/karpathy/autoresearch/issues/599) visas hur agenten kan sänka måttet utan bättre resultat, eftersom förbudet mot att röra mätningen bara står i texten. Hos oss kör hooken eller skriptet mätningen själv, och det låsta låses i verktyget (→ `guide/3-1`, *Den som bedöms får inte ändra domaren*).
- **Pröva att mätinstrumentet kan säga nej** innan loopen litar på det. Kontroll 3 gick igenom på en sida som scrollade i sidled, eftersom mätningen var fel (kvalitetsgranskningen 2026-10-16, D4).
- **Lighthouse-poängen är en spärr, inte målet:** taket är 100. Det som optimeras är millisekunder, byte och antal axe-fel.
- **Brusgolv och spärrkontroller.** Brusiga mått mäts som median av tre till fem körningar, och en förbättring inom bruset räknas inte. Ett försök som får en annan kontroll att fallera kastas, hur bra måttet än blev. 📄 pi-autoresearch (via `kunskap/kallkort/karpathy-autoresearch.md`); → `guide/2-8-teknik-och-kvalitet.md`, *Brusiga mätningar*.
- **Utdata till fil, bara måttet in i kontexten.** Körningens logg skrivs till en fil, och bara måttet och felraderna läses, så att kontexten inte fylls av loggar. 📄 `program.md` (`> run.log 2>&1`).

## Ralph-loopen

Pluginet `ralph-loop` matar samma prompt tills ett exakt löftesord skrivs ut eller `--max-iterations` nås. Dess egen README avråder från uppgifter som kräver omdöme eller designbeslut, och löftet är en exakt strängjämförelse, så taket är den verkliga säkerheten. `/goal` och en egen Stop-hook täcker samma behov; pluginet installeras inte. 📄 [ralph-loop README](https://github.com/anthropics/claude-plugins-official/tree/main/plugins/ralph-loop) (Apache-2.0).

## Belägg i loggen

Varje varv skriver kommandot och ett utdrag ur utdata i `progress.md` (→ `guide/3-1`, N1). Ett "klart" utan belägg räknas som underkänt, och en process som startade är inget prov som gick igenom: belägget visar utfallet, inte att kommandot kördes. 📄 bolt.diy, `project-tools.ts` (MIT); 📄 superpowers, ärende [#1754](https://github.com/obra/superpowers/issues/1754) (falska klartecken när bara anropet prövades). Showboat visar formen: kommentar, kommando och verklig utdata i samma dokument, som går att köra om och jämföra. 📄 [simonw/showboat](https://github.com/simonw/showboat) (Apache-2.0); installeras inte.
