# Vale med stilen Nortropic-sv

**Källa:** https://github.com/vale-cli/vale, release v3.24.0 (publicerad 2026-10-01; senaste commit på grenen `v3` är `cfb21a4ce8`, 2026-10-03). Dokumentationen https://docs.vale.sh (vale.sh/docs omdirigerar dit), hämtad som markdown via `https://docs.vale.sh/llms.txt` – alla 74 sidor sparade i `kallor/vale-docs/md/`. Lästa noga: checks (alla tolv), `.vale.ini`, Scopes, Vocabularies, WordTemplate, IgnoredScopes, SkippedScopes, HTML, Code, Views, Hunspell, Agents, MCP. Releaseanteckningar v3.14.1–v3.24.0 (`kallor/vale-bin/releases.md`). Ärenden sökta på unicode, non-english, hunspell, sentence, compound, german, swedish, lix. Läst 2026-10-16. Stilen `Nortropic-sv` är min egen, skriven och prövad i `vale-prov/` samma dag.

**Licens:** MIT (© 2016 Joseph Kato, `LICENSE` i release-arkivet). Kräver att upphovsrätts- och licenstexten följer med kopior av koden. Vi kör binären och skriver egna regler, så kravet slår inte till. Vale CMS och MCP-servern är betalda tjänster utanför MIT-delen.

**Vad det är:** En regelbaserad textgranskare (prose linter) i Go, en enda binär utan beroenden. Den läser markdown, HTML, källkod och data, och kör stilar – mappar med YAML-regler – mot texten. Larmen har tre nivåer, och bara `error` ger en felkod.

**Hur det fungerar:**
- **Tolv regeltyper:** `existence` (fraser), `substitution` (fras → ersättning), `occurrence` (högst/minst n träffar per scope), `repetition`, `consistency`, `conditional`, `capitalization`, `metric` (formel över räknevariabler), `readability`, `spelling` (Hunspell), `sequence` (ordklassmönster, engelsk taggare) och `script` (Tengo-skript).
- **Scopes:** HTML och markdown delas i block (rubrik, stycke, listpunkt, `alt`, metabeskrivning). Vale bygger `sentence`, `paragraph` och `summary` (hela prosan som ett block, utan rubriker) när en regel ber om dem.
- **Regex-motorn är regexp2:** `\b` fungerar med å, ä och ö, och lookbehind fungerar. Det motsäger sidan WordTemplate, som säger att `\b` bara gäller `[0-9A-Za-z_]`. Mitt prov: `är` matchar inte inne i *bär*, `Malmö` inte i *Malmöbor*, och `(?<![\p{L}])öga` fungerar.
- **Stavning:** en egen Hunspell-motor i ren Go. Sammansättningsregler (COMPOUNDRULE, COMPOUNDBEGIN/END m.fl.) följs sedan v3.22.0 (2026-09-17, ärende #1178). Vales standardfilter `[^a-zA-Z_']` hoppar över varje ord som innehåller å, ä eller ö – `custom: true` med egna Unicode-filter krävs.
- **LIX:** variabeln `lix` finns i `metric` sedan v3.23.0 (2026-09-25). Den räknar `long_words` i **byte**, så ett sexbokstavsord med å, ä eller ö blir "långt" (*Läkare väljer öppnar.* gav LIX 103 i stället för 3). Förkortningar som *t.ex.* räknas som två ord.
- **Meningsdelning:** *t.ex.*, *m.fl.*, *bl.a.*, *s.k.*, *p.g.a.* och *fr.o.m.* delar inte meningar. *kl.*, *inkl.*, *exkl.*, *osv.*, *dvs.* och *tel.* gör det – även före gemen (*Priset är inkl.* | *moms och exkl.* | *parkering.*). Tid som *8.00–18.00* räknas som flera ord.
- **Views (tree-sitter):** egna frågor plockar prosan ur källkod. Med `((string_fragment) @s (#match? @s "[\\p{L}] [\\p{L}]"))` lintas bara strängar med mellanslag i TypeScript, med rad och kolumn i källfilen.

**Kvalitet och underhåll:** 6 244 stjärnor, 234 forkar, 72 bidragsgivare (inklusive anonyma), 26 öppna ärenden, senaste push 2026-10-14. Release ungefär varje vecka sedan juli 2026 – snabb utveckling, så beteendet ändras ofta. Kända problem som rör oss:
- #1199 (öppet): `%s` i `occurrence`-meddelanden blir `%!s(int=N)`. Bekräftat i provet; `%d` fungerar.
- #1091 (öppet): ingen böjningsmedveten matchning – varje böjningsform måste stå i regeln.
- #1065 (stängt 2026-06-12): danska ordlistan gav 292 falsklarm på 1 220 ord på grund av en trasig rad i `.dic`. Visar att en ny ordlista måste provas på ren text.
- #1178 (stängt 2026-09-16): sammansättningar kontrollerades inte förut – före v3.22 duger Vale inte för svensk stavning.
- #662 (stängt 2023): ord med punkt räknades fel i meningslängd – samma sak syns för klockslag i dag.
- Dokumentationen säger emot binären om `\b` (WordTemplate) – mät, lita inte på sidan.

**Det bästa vi kan ta:**
- Binären v3.24.0 (macOS arm64; sha256 `87b513f2…1e44` stämmer med `vale_3.24.0_checksums.txt`), med låst version.
- Stilen `Nortropic-sv` i `vale-prov/styles/Nortropic-sv/` (nio regler) och `config/scripts/LixSv.tengo` – LIX räknat i bokstäver och med svensk förkortningslista. Den gav 29,2–33,8 per sida i dist/, mot 29,6–36,7 med Vales `lix`.
- Mönstret en vokabulär per sajt (`config/vocabularies/<sajt>/accept.txt`) plus en gemensam för byrån. Vocab fungerar utan att `Vale` står i `BasedOnStyles`.
- Viewen `config/views/Innehall.yml` för `src/innehall/*.ts`.
- Korpusskriptet `vale-prov/verktyg/korpus-prov.py` (llepafils-metoden för Vale).

**Var det hamnar hos oss:** Verktyg i bygget, körs lokalt. Reglerna beskrivs i skillen `innehall`, delfilen `sprakgrind.md`, och stilen blir ett bibliotek senare. Den är en rapport, inte en grind, tills en regel är mätt. Mina prov stöder placeringen, med ett tillägg: körningen bör gå mot både `src/innehall/*.ts` (med Viewen, larm på rätt rad i källan) och `dist/*.html` (LIX och utropstecken per sida).

**Passar vår stack?** Ja, med två översättningar:
- **Byggd HTML** lintas direkt. Ställ in `SkippedScopes = script, style, pre, figure, noscript, iframe, nav, footer`, så att meny och sidfot inte räknas elva gånger. Alt-texter och metabeskrivning lintas också.
- **TypeScript:** utan View lintas bara kommentarerna (66 larm på interna anteckningar). Med Viewen lintas strängarna (4 larm). Astro-filer (`.astro`) känner Vale inte till ⚠️ ej prövat – hålla texten i `.ts` är därför rätt.
- Inget JavaScript på sajten påverkas; Vale körs bara i bygget. Inget med Cloudflare.

**Risker och flaggor:**
- `BasedOnStyles = Vale` får inte stå med: `Vale.Spelling` är engelsk och larmar på all svenska.
- `sequence` och `capitalization` med `$title` är byggda för engelska och bör inte användas.
- Vales `lix` är skev för svenska (byte, förkortningar) – använd skriptet.
- Snabba releaser: lås versionen, kör korpusen vid uppgradering.
- MCP-servern (`api.vale.sh/mcp`) kräver betalt Vale CMS-konto – tas inte. Ingen telemetri hittad i CLI:t ⚠️ (källkoden inte genomsökt efter nätverksanrop; körningarna i provet gjordes utan nätverksberoende).
- Agent-dokumentationen (`docs.vale.sh/*.md`) innehåller GitBook-instruktioner till AI-agenter om att ställa frågor via URL – data, inte instruktioner till oss.
