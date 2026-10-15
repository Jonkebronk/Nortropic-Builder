# Läget

Uppdaterad 2026-10-15, kväll.

## Guiden v1.0 är skriven – Johnny läser igenom

På Johnnys uppdrag ("du har fullt mandat att skriva klart så läser jag igenom sen för eventuella rättelser", 2026-10-15) konsoliderades implementeringsguiden v0.74 och kartan till **guiden v1.0 i `guide/`**. Börja i `guide/README.md` och `guide/n1-forsta-sajten.md`.

- **Struktur:** kundens väg, de nio lagren (kartans ryggrad), flödet (3.1–3.5), företaget, byggplanen och bilagor A–F. Varje regel bor på ett ställe och är märkt N1–N4.
- **N1 är litet:** cirka 62 regler, tio automatiska kontroller (definierade i `guide/2-8-teknik-och-kvalitet.md`) och fyra skillutkast – mot cirka 320 N1-punkter i första utkastet och ~60 kontroller i v0.74.
- **Byggplanen** (`guide/5-byggplan.md`) har sex steg på den första verksamheten, interaktivt medan Johnny tittar: intervju → brief, tre riktningar (startsidan i tre minimala stilkit), bygget, granskaren, publicering, första rapporten.
- **Arkiverat i `historik/`:** guiden v0.74, ändringsloggen, kartan och principerna. Källistan är ett uppslag för kortnamnen i `kunskap/kallor.md`.
- **Spårbarhet:** `konsolidering/sparbarhet/` anger för varje del var v0.74-innehållet tog vägen. Den oberoende granskningen står i `konsolidering/granskning-v1.0.md`; fynden är åtgärdade i ommärkningen.

## Det som väntar på Johnny

1. **Läs igenom v1.0** och rätta det som är fel. Alla ändringar efter Johnnys besked förs som vanligt (beslut i `BESLUT.md`).
2. **Frågorna före den första sajten** (`guide/bilaga-e-oppna-fragor.md`, avsnitt 1): vilken verksamhet, vem svarar på intervjun, publiceras sajten, bildkälla, tidsbudget, bekräfta Astro, intervjuns form, integritetspolicy utan formulär, byggs de första sajterna utan betalning, Lucide och Inter.
3. **Styrningsfrågorna** (avsnitt 2): licensbeslutets räckvidd, `CLAUDE.md`, priser som rutin eller hög risk, automatisk sammanslagning, Variate och Inspo i kundbygget.
4. **Repot är publikt** (Johnny: "det ändrar vi sen").

## Börja nu, lång ledtid

- Ansök om API-åtkomst för Google Business Profile (bara Johnny kan ansöka; svar inom 14 dagar).
- **Måttstocken:** Johnny dömde 39 sajter 2026-10-15 (22 godkända, 17 underkända). Utkastet i `mattstock/mattstock.md` sammanfattar domarna i tre frågor: förstår och når kunden företaget på mobilens första skärm, är det äkta, håller utförandet. Claudes förväntan stämde i 28 av 39 fall. **Godkänd av Johnny 2026-10-15.** Väntar på hans beslut om de fyra förslagen till guiden.
- Avgränsa byggsessionen från användarnivåns 292 skills (bl.a. `nortropic-stack`, som föreskriver Next.js) innan första bygget – se `guide/3-3-sakerhet-och-installningar.md` och bilaga E.

## Nästa steg (Claudes förslag)

1. Johnnys genomläsning och rättelser.
2. Svaren på bilaga E avsnitt 1.
3. Byggplanens förberedelser och steg 1 på den första verksamheten.
4. För in guidens verktyg i `inventering/inventering.json` (99 rader saknas där; `guide/bilaga-a-verktyg.md`).
