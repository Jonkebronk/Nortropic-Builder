# Mätningen av granskaren

Granskaren är en LLM-domare. Den är värd något bara så länge den håller med Johnny, och det vet vi bara genom att mäta. Processen bor i `guide/3-2`, *Kalibrering mot Johnnys smak*. Här står metoden och det den första mätningen lärde oss.

## Metoden: den kalibrerade bedömaren

| Del | Så gör vi | Källa |
|---|---|---|
| Facit | Johnnys domar: godkänd eller underkänd med en kort kritik, inte en skala | 📄 Husain, [Using LLM-as-a-judge](https://hamel.dev/blog/posts/llm-judge/) ("If your evaluations consist of a bunch of metrics that LLMs score on a 1–5 scale … you're doing it wrong") |
| Exempel och mätning | 10–20 % av domarna blir exempel i checklistan, resten mäter | 📄 Husain (train 10–20 %, dev 40–45 %, test 40–45 %) |
| Fryst prompt | Checklistan fryses med SHA-256 innan mätningen och kontrolleras efteråt | 📄 Husain (frys före test); → `mattstock/granskare/matning-2026-10-15.md` |
| Mått | Andelen rätt bland Johnnys godkända (TPR) och bland hans underkända (TNR), var för sig, aldrig rå överensstämmelse | 📄 Husain ("report the judge's True Positive Rate and True Negative Rate separately") |
| Säkerhet | Säkra och osäkra domar räknas var för sig; osäkra går till Johnny | 🔧 första mätningen: 21 av 22 säkra rätt, 3 av 9 osäkra (`mattstock/granskare/matning-2026-10-15.md`) |
| Utväg | `för lite information` får användas och räknas aldrig som godkänt | 📄 Anthropic, [Demystifying evals](https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents) ("Unknown") |
| Blindhet | Granskaren ser inte Johnnys dom, tidigare granskningar eller vilket varv det är | → `guide/3-2`; `guide/3-1` |
| Underlag | Samma bilder som Johnny dömde, i samma form | → `mattstock/granskare/uppdrag.md` |

## Storlek och osäkerhet

- Ungefär 30 exempel räcker för att hitta felmoderna. Under cirka 60 blir osäkerheten i TPR och TNR stor; cirka 100 per felmod behövs för att validera en domare. 📄 Husain.
- Med 17 godkända är en sajt drygt 6 procentenheter. Skriv antalen bredvid procenten, och ett konfidensintervall när andelen ska jämföras med en tidigare mätning (till exempel Wilsons intervall; 15 av 17 ger ungefär 66–97 %).
- **Stabilitet.** Döm samma sajt tre gånger med samma prompt. En dom som byter håll mellan körningarna är osäker, vad den än säger, och går till Johnny. I dag mäts bara en körning per sajt. 📄 [Test plugins with evals](https://code.claude.com/docs/en/plugin-evals) (tre körningar per fall som standard); 📄 screenshot-to-code, evals (flera körningar per fall, eftersom körningarna skiljer sig; via `kunskap/kallkort/bolt-diy-och-screenshot-to-code.md`).
- **En granskare som godkänner nästan allt** syns som låg TNR. Ett snitt där allt får godkänt är en varningssignal i sig, också före mätningen. 📄 open-design, `critique` (*Don't grade-inflate*).

## Smitta

- **En ändrad checklista mäts aldrig på exemplen som formade den** (→ `guide/3-2`). När ett utkast blir exempel i checklistan, som riktningen Djärv i G13, mäter ett omprov på samma utkast bara att regeln läses, inte att den generaliserar. Märk sådana rader *smittade* och räkna dem för sig.
- **Nya mätningar** görs på nya sajter och på systemets egna utkast (`BESLUT.md` 2026-10-16, G11). `mattstock/verktyg/matning.py` läser domarna över egna utkast lokalt ur `sites/`.

## När två versioner jämförs

- **Parvis, i båda ordningarna.** Domare föredrar ofta första positionen; en vinst räknas bara när båda ordningarna är eniga, annars avgör Johnny. 📄 Zheng m.fl. 2023, [arXiv 2306.05685](https://arxiv.org/abs/2306.05685); → `guide/3-2`, *Blind jämförelse*.
- **Parvis före poäng.** Multimodala domare liknar människor mer i parvisa jämförelser än i absoluta poäng. 📄 Chen m.fl. 2024, [arXiv 2402.04788](https://arxiv.org/abs/2402.04788).
- **Bara de grova besluten.** Vid små skillnader ligger domarna nära slumpen; vid stora skillnader upp mot 90 %. 📄 Luera m.fl. 2025, [arXiv 2510.08783](https://arxiv.org/abs/2510.08783).

## Det bedömarens prompt gör

- **Orden i kriterierna styr resultatet,** inte bara domen: i Anthropics försök ändrade formuleringar som "museum quality" utseendet synligt. Ändra en formulering i checklistan och mät igen. 📄 Anthropic, [Harness design for long-running application development](https://www.anthropic.com/engineering/harness-design-long-running-apps).
- **Bedömare är för snälla mot det byggda** ("agents reliably skew positive when grading their own work"; "Out of the box, Claude is a poor QA agent"). Exempel med motivering och läsning av loggarna gjorde bedömaren skarpare. 📄 samma artikel.

## När granskaren delas upp (N2)

En domare per kriterium, var och en med ren kontext, när en enda granskare visat sig missa en sorts fel (→ `guide/3-2`, *Specialister*). 📄 Anthropic, *Demystifying evals* ("Grade each dimension with an isolated LLM-as-judge").

## Omkalibrering

- När Johnny ändrar uppfattning: kriterierna driver när man dömer utdata. 📄 Shankar m.fl. 2024, [arXiv 2404.12272](https://arxiv.org/abs/2404.12272).
- Vid modellbyte (→ `guide/3-2`, N3).
- Efter varje ändring av checklistan: mät på nya exempel innan den används.

## Rapporten

En fil per mätning, som `mattstock/granskare/matning-2026-10-15.md`: hur den mättes (prompt med SHA, sajter, granskare, bilder med verktygens versioner, rådata), förbehåll, resultat (TPR, TNR, säkra och osäkra), varje avvikelse med granskarens och Johnnys ord, och Claudes läsning märkt som förslag.
