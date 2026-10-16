# taste-imagegen-frontend-web

**Källa:** https://github.com/Leonxlnx/taste-skill, sökvägen `skills/imagegen-frontend-web/SKILL.md` (installationsnamn `imagegen-frontend-web`). Läst 2026-10-16 vid commit `f624f37a8c65` (2026-10-14). Lästa filer: `SKILL.md` (36,9 KB – skillens enda fil): utdataregeln, herobiasen, §1 med brief-mappningen, §4 heroregler och §8 slop-reglerna; övriga avsnitt som rubriker. Repots `README.md`.
⚠️ §2 (variationsmotorn i detalj), §5–§7 lästes bara som rubriker och stickprov.

**Licens:** MIT, © 2026 Leonxlnx. Kräver att licenstexten följer med vid kopiering. Bilderna följer bildmodellens villkor.

**Vad det är:** En skill som bara gör bilder, ingen kod: designreferenser för webbsidor, en liggande bild per sektion, avsedda att lämnas till en kodagent.

**Hur det fungerar:**
- **Hård utdataregel:** en separat bild per sektion; landningssida utan antal = 6 bilder, "hel mall" = 8.
- **Herobias:** text vänster/bild höger kallas det mest överanvända AI-mönstret; nio alternativ (centrerat över bild, nere till vänster, bild som duk, "mini minimalist" m.fl.).
- **Åtta reglage:** variation 8, täthet 4, riktning 8, byggbarhet 9, bildprioritet 9, luft 8, layoutvariation 8, konverteringsdisciplin 8 – med en tabell som översätter ord i briefen ("minimalist", "editorial", "premium SaaS") till val.
- **Variationsmotor:** tema, bakgrundskaraktär, typkaraktär, herotyp, sektionssystem, signaturkomponenter, kompositionsankare och bakgrundsläge per sektion, CTA-variation, heroskala, en berättelseryggrad och ett "andra läsningens ögonblick".
- **Heroregler:** kort rubrik (5–10 ord), luft och kontrast, inga piller, falska siffror, märken eller små logotyper i första vyn; elegant medelvikt och tät spärrning hellre än fett skrik; ingen gradienttext.
- **Slop (§8):** centrerade sektioner i oändlighet, upprepade kortrader, klonade text/bild-block, lila–blå glöd, svävande klot, glas utan skäl, "lyx som bara är beige serif", för många typstämningar, klichéord.

**Kvalitet och underhåll:**
- Repot: 97 719 stjärnor, 20 bidragsgivare, push 2026-10-14. Ingen version eller test.
- Inga ärenden om just denna skill hittades.
- Egen iakttagelse: "Stacked center (etikett / rubrik / underrubrik / knapp centrerat)" står som ett *föredraget* alternativ, medan hallmark (grind 6) underkänner exakt den formen – källorna drar åt olika håll.

**Det bästa vi kan ta:**
- Brief-mappningen (§1) som idé när en kitbrief ska översättas till konkreta val.
- Heroreglerna (§4) som granskningsfrågor för första skärmen: kort rubrik, inga falska siffror eller märken.
- Snabba bildskisser av ett *föreslaget* kit innan provsidan byggs – om Johnny vill döma en riktning tidigare.

**Var det hamnar hos oss:**
- Senare (N2): kan ge skisser när nya kit föreslås med spridd idégenerering (2-5, från sajt 2). Bilderna går till Johnny och granskaren, aldrig till generatorn (2-5, fallgrop 75). Inte i kundbygget och inte i N1.

**Passar vår stack?**
- Ingen kod, ingen JavaScript – stacken påverkas inte. Kräver en bildmodell; Claude Code har ingen inbyggd, så ett eget verktygsbeslut behövs (t.ex. Higgsfield, vars villkor ska läsas först enligt 2-5).

**Risker och flaggor:**
- Licens: MIT; bildmodellens villkor och kostnad tillkommer.
- Ingen telemetri i skillen; ingen inloggning i skillen, men bildmodellen kräver konto.
- **Krockar med Nortropic (vi vinner):** en bild per sektion för varje sajt skulle vara fri generering i kundbygget; bilder med text och identitet riskerar att likna en referens för mycket – hos oss går värden, inte bilder, till generatorn.
- **Krockar med andra skills:** hallmark (centrerad hero) och taste v2 (riktning ur studerade sajter i stället för genererade bilder).
