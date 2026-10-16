# taste-image-to-code

**Källa:** https://github.com/Leonxlnx/taste-skill, sökvägen `skills/image-to-code-skill/SKILL.md` (installationsnamn `image-to-code`). Läst 2026-10-16 vid commit `f624f37a8c65` (2026-10-14). Lästa filer: `SKILL.md` (36,4 KB – skillens enda fil): inledningen, §1–§2, §16–§29 och rubrikerna för §3–§15; repots `README.md`.
⚠️ §3–§15 (bildantal, Codex-regler, variationsmotorn, referens- och heroregler) lästes bara som rubriker och stickprov.
**Rättat 2026-10-16 (tredje varvet):** skillen har **38 avsnitt, inte 29**, och nio reglage, inte sju (kontrollerat mot webb-pros kopia, som är identisk med uppströms vid `f624f37`). §30–§38 är typografin först, sektionsrytm, täthet och avstånd, färdiga sektionspaket, konsekvens mellan bilder, tydlighetskontroll, svarsbeteende, exempel och slutmål. Andra varvet läste alla 1 228 raderna (`andra-varvet/yta-2-jamforelse.md`); därifrån kom att anti-drift (§27) och ordningen vid oklarheter (§28) blev fråga 8 i `.claude/skills/yta/stilriktningar.md`.

**Licens:** MIT, © 2026 Leonxlnx. Kräver att licenstexten följer med vid kopiering. Genererade bilder följer bildmodellens villkor.

**Vad det är:** En arbetsgång för Codex och andra agenter med bildgenerering: generera designbilder av varje sektion först, analysera dem noga, och koda sedan sajten så att den liknar bilderna.

**Hur det fungerar:**
- **Ordningen är tvingande:** bild → djupanalys → kod. Bilden är "den primära sanningen".
- **Nio reglage** (§1): variation 8, täthet 3, konstnärlig riktning 8, byggbarhet 9, bildprioritet 9, luft 9, analysprecision 10, bildgenereringsiver 10 och disciplin mot gränssnittsröra 9. (Rättat 2026-10-16: kortet sade sju.)
- **Bildregler:** en bild per sektion, aldrig en hopträngd collage; nya bilder i stället för att beskära gamla; detaljbilder när knappar eller kort är för små att läsa.
- **Extraktionsregler (§21–§25):** läs ut synlig text, typografi (familjekaraktär, vikter, storleksrelationer, spärrning, radavstånd), avstånd (logik, inte pixel-OCR), knappar och komponenter, färger.
- **Byggregler:** inga lådor i lådor (§16), ingen mikro-UI-röra som små piller och falsk systemjargong (§17), bilder i fasta, byggbara ramar (§20), ingen "drift" tillbaka till mallar under kodningen (§27), och en ordning för att lösa oklarheter (§28).
- **Slop-lista (§29):** oläsbart collage, oändliga centrerade sektioner, upprepade kortrader, klonade text-vänster/bild-höger-block, lådor i lådor, stora rundade omslag runt allt, lila–blå gradienter m.m.

**Kvalitet och underhåll:**
- Repot: 97 719 stjärnor, 20 bidragsgivare, push 2026-10-14. Ingen version eller test; skriven för Codex.
- Inga ärenden om just denna skill hittades.
- Kräver en bildmodell i agenten; Claude Code har ingen inbyggd bildgenerering, så flödet går inte att köra som det är hos oss.

**Det bästa vi kan ta:**
- §16 (inga lådor i lådor) och §17 (ingen mikro-UI-röra) som formuleringar till hantverkskriterierna.
- §20 (fasta mediaramar) – stämmer med vår regel om bildytor anpassade efter originalet (G1).
- §27 (anti-drift) som granskningsfråga när ett kit omsätts i bibliotekskomponenter: ser provsidan ut som kitets referenser?

**Var det hamnar hos oss:**
- Ingenstans som skill. Hos oss går beskrivning och värden till generatorn, inte referensbilden (2-5, fallgrop 75), och exakta värden tas med Playwrights beräknade stilar, inte genom att läsa av en genererad bild. De tre formuleringarna ovan kan citeras med egna ord i `generiskt.md`.

**Passar vår stack?**
- Stackneutral; koden kan bli Astro, React eller Tailwind (alla tillåtna sedan BESLUT 2026-10-16). JavaScript-kostnaden beror på vad bilderna föreslår, inte på skillen.
- Flödet kräver en bildmodell (t.ex. Higgsfield eller ChatGPT Images), vilket är ett separat verktygsbeslut.

**Risker och flaggor:**
- Licens: MIT; genererade bilder saknar sannolikt upphovsrättsligt skydd (tolkning, inte juridisk rådgivning – 2-5, *Logotyper genereras inte*).
- Ingen telemetri i skillen; bildmodellen kan ha egna villkor och kostnader.
- **Krockar med Nortropic (vi vinner):** en ny design per sajt mot grundregeln (ytan ur kitet); bilden som sanningskälla mot "beskrivning och värden till generatorn"; reglaget variation 8 mot konvention.
- **Krockar med andra skills:** taste v2 (riktning ur ett bibliotek, inte ur genererade bilder) och impeccable (comp-led byggs bara efter godkänd riktning).
