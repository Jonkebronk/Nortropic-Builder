# llepafils-metoden

**Källa:** https://github.com/00spoiler00/llepafils, commit `95d5c30713` (2026-09-07). Lästa filer: `README.md`, `corpus/fragments.json`, `corpus/run-eval.mjs`, `server/src/checker.js`, `server/src/ia-rules.js`, början av `server/src/index.js`, `plugins/llepafils/skills/llepafils/SKILL.md`, `.mcp.json`, `plugin.json`, `LICENSE`. Läst 2026-10-16. Repot har inga releaser eller ärenden.

**Licens:** MIT, © 2026 Marc Boada. Kräver licenstexten vid kopiering av kod. Vi tar metoden, inte koden, så kravet slår inte till. LanguageTool, som tjänsten bygger på, är LGPL-2.1 och körs som en separat tjänst.

**Vad det är:** En katalansk språkgranskare för AI-text: LanguageTool plus egna regler mot "AI-ismer", som MCP-server, REST-API och Claude Code-plugin. Det vi tar är mätmetoden: en liten korpus med kända fel och rena fragment som avgör om en regel får finnas.

**Hur det fungerar (metoden exakt):**
- **Korpusen** (`corpus/fragments.json`): 41 fragment med fälten `id`, `text`, `error` och `tipus`. 35 har ett känt fel, där `error` är felets exakta text i fragmentet, till exempel `"Tenim que"`. 6 är rena, med `error: null`. Typerna: barbarisme 7, castellanisme 7, calc 6, calc-ia 3, estil-ia 2, cliche-ia 2 och en var av tio andra. Varje fragment är en mening.
- **Mätningen** (`corpus/run-eval.mjs`): varje fragment skickas för sig till motorn. Ett felfragment räknas som **träff** om något larm överlappar felets span (`offset < errEnd && offset + length > errStart`), annars **missat** – larm på annat ställe i fragmentet räknas inte. I ett rent fragment räknas **varje larm** som ett falsklarm. Skriptet listar de missade som kandidater till egna regler.
- **Siffrorna** (README): LanguageTool ensam 19 av 35 och 5 falsklarm; hela kedjan (LT + egna regler + vitlista) 34 av 35 och 0 falsklarm. Det enda missade är utelämnat pronomen (*Tinc tres* → *En tinc tres*), som skillen lämnar till modellens omdöme.
- **Principen** (`ia-rules.js`): *"Precisió abans que exhaustivitat: una regla dubtosa no entra."* En egen regel finns bara när korpusen visar att LanguageTool missar felet.
- **Falsklarmsskydd** (`checker.js`): ett stavningslarm på ett ord med versal som inte står först i meningen antas vara ett namn och tas bort. En vitlista med cirka 60 tekniska ord (commit, deploy, api …) och parametern `ignora` (ord eller regel-id) gäller per anrop.
- **Ordgränser:** reglerna använder `(?<![\p{L}\p{N}_])` i stället för `\b`, eftersom `\b` i JavaScript bara gäller ASCII.

**Kvalitet och underhåll:** 0 stjärnor, 0 forkar, 1 bidragsgivare, senaste commit 2026-09-07, inga ärenden. Siffrorna går inte att kontrollera utan LanguageTool, och jag körde inte LT (uppdraget) ⚠️ ej reproducerat. Svagheter i metoden:
- Bara 6 rena fragment – "0 falsklarm" säger lite.
- Reglerna är skrivna mot samma korpus som de mäts på (risk för överanpassning); ingen separat testkorpus.
- Guiden (`guide/2-7-innehall.md`, Kontroll) återger "19 av 35 … 34 av 35 utan falsklarm" men utelämnar att LT ensam gav 5 falsklarm.

**Det bästa vi kan ta:**
- Korpusformatet (`id`, `text`, `error`, `typ`) och överlappsregeln för träff, exakt som `run-eval.mjs`.
- Kravet att en regel finns för att korpusen visar ett missat fel, och att en tveksam regel inte tas med.
- Unicode-ordgränser i egna regler.
- Hur jag använde metoden för Vale: `vale-prov/test/korpus.json` (51 fragment: 26 med fel, 25 rena, bland dem medvetet svåra rena meningar med namn, förkortningar, *utan* = without och intervall) och `vale-prov/verktyg/korpus-prov.py`. Resultat: standardfilter 21/26 och 10 falsklarm; Nortropic-sv med vokabulär 24/26 och 0 falsklarm. En bred regel för *inte X utan Y* fångade 3/3 men gav 4 falsklarm (*inte boka utan BankID*); den smala fångade 2/3 utan falsklarm.

**Var det hamnar hos oss:** Skillen `innehall`, delfilen `sprakgrind.md`: mätningen före en hård regel. Provet stöder det, med två tillägg: en regel mäts också på en **riktig sajt** (dist/ från en övningssajt) som ingen regel skrivits mot, och korpusen får en del med texter som inte används när reglerna skrivs.

**Passar vår stack?** Metoden är verktygsoberoende. Korpusen är JSON och skriptet kör Vale lokalt; inget går till sajten eller Cloudflare.

**Risker och flaggor:**
- Tjänsten och pluginet skickar text till `llepafils.latrup.net` – en tredje part. För kundtext tas bara metoden, aldrig tjänsten.
- Serverns mätvärden sparar enligt README varken text eller IP; den räknar unika besökare med en saltad hash i minnet. ⚠️ Bara README och början av `index.js` lästa på den punkten.
- Katalanska regler går inte att återanvända för svenska; bara metoden.
