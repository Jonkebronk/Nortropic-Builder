# Google: Creating helpful, reliable, people-first content (E-E-A-T och YMYL)

**Källa:** Google Search Central, [Creating helpful, reliable, people-first content](https://developers.google.com/search/docs/fundamentals/creating-helpful-content), sidfoten *"Last updated 2026-10-05 UTC"*. Läst i sin helhet 2026-10-16. Nedladdningen från andra varvet (14.39) och sidan i dag (17.43) har samma brödtext; jämförd rad för rad. För sammanhanget lästes [Byline dates](https://developers.google.com/search/docs/appearance/publication-dates) (*"Last updated 2025-12-10 UTC"*). ⚠️ Inte lästa: *Search Quality Rater Guidelines* (avsnitten om YMYL och hälsa), *spam policies* och Googles inlägg om AI-genererat innehåll, som sidan hänvisar till.
**Licens:** texten är CC BY 4.0 och kodexemplen Apache 2.0 (sidfoten). CC BY kräver erkännande och länk om bearbetad text sprids. Vi skriver med egna ord och citerar kort med källa, så inget krav utlöses.

## Vad det är
Googles beskrivning av vad rankningssystemen belönar: innehåll som skrivs för människor och inte för att manipulera sökresultaten. Sidan består av självtestfrågor, begreppen E-E-A-T (*experience, expertise, authoritativeness, trustworthiness*) och YMYL (*Your Money or Your Life*) och tre frågor om innehållet: *Who, How* och *Why*.

## Hur det fungerar
- **Självtestet** har tre grupper. Innehåll och kvalitet: originellt, fullständigt, en rubrik som *"avoid exaggerating or being shocking"*, stavning och *"easily-verified factual errors"*. Expertis: tydliga källor och en länk till författar- eller Om-sida. Människor först: en publik som skulle vilja ha innehållet även utan sökmotorn.
- **Varningssignaler:** mycket innehåll om många ämnen, *"extensive automation"*, text skriven till ett visst antal ord (*"(No, we don't.)"*) och *"changing the date of pages to make them seem fresh when the content has not substantially changed"*.
- **E-E-A-T** är ingen rankningsfaktor i sig. *"Of these aspects, trust is most important."* Ämnen som kan påverka hälsa, ekonomi eller säkerhet (YMYL) väger tyngre. Där gäller att innehållet *"must be highly accurate and consistent with established expert consensus"*.
- **Who:** det ska synas vem som skrivit, med byline *"where one might be expected"*. Påhittade skribentprofiler – *"AI-generated headshots, made-up names, or false credentials"* – räknas som vilseledning.
- **How:** upplysning om AI eller automation när den *"would be reasonably expected"*.
- **Why:** innehållet finns för att hjälpa besökaren. Automation *"for the primary purpose of manipulating search rankings"* bryter mot spampolicyn.
- **Kvalitetsbedömarna** bedömer huvudinnehållet efter ansträngning, originalitet, skicklighet och korrekthet. De styr inte rankningen; Google liknar deras omdömen vid kommentarskort på en restaurang.

## Kvalitet och underhåll
- Utgivare: Google Search Central. Leverantörens egen dokumentation, inte en norm: primärkälla för vad Google säger, inte för hur rankningen faktiskt räknas.
- Sidan uppdateras löpande, senast 2026-10-05. Ändringar annonseras i [Search documentation updates](https://developers.google.com/search/updates) ⚠️ (inte genomgången för den här sidan).
- Byline-sidan säger bara att datumet ska gälla sidans publicering eller uppdatering. När `dateModified` ska ändras står bara här, i varningen ovan.

## Det bästa vi kan ta
1. **Ett datum ändras bara när innehållet har ändrats.** Gäller `dateModified`, synliga *uppdaterad*-datum och månadsrapporten. Andra varvet föreslog raden *"Priser och tider kontrollerade oktober 2026"* (`andra-varvet/byggguider-jamforelse.md`, lucka 3). Den håller när kontrollen är gjord. Men `dateModified` bör följa verklig ändring, inte månadskontrollen, annars gör vi det Google varnar för (tolkning).
2. **YMYL för vårdnära kunder:** texten om en behandling går inte emot etablerad konsensus, och kundens egen text lovar ingen effekt. Det senare är redan beslut (`BESLUT.md` 2026-10-15, *Omdömen*); Google pekar åt samma håll.
3. **Ärlighetsregeln får en andra källa för personer:** ingen påhittad person, inget AI-porträtt och ingen falsk titel presenteras som kundens (`guide/2-7-innehall.md`, *Ärlighetsregeln*, N1).
4. **Who på en småföretagssajt** är Om-sidan: en verklig person, yrkestiteln och kundens egna ord (`guide/2-3-struktur.md`, tabellen: Om oss, *"Vilka är ni, kan jag lita på er?"*). Byline behövs först när en sajt får artiklar.
5. **Självtestfrågorna som granskningsfrågor:** överdriver rubriken, finns lätt kontrollerbara faktafel, måste besökaren söka igen för att få svar?

## Var det hamnar hos oss
Placeringen **skill: innehall** (lager 7, även 3) är beslutad: fältet `beslut` säger *"Johnny 2026-10-16 omkring 17.40: 'Ja på alla'"*. Redan destillerat: `.claude/skills/struktur/SKILL.md:45` och `.claude/skills/struktur/platser.md:30` (inga ordgränser, *"(No, we don't.)"*). E-E-A-T, YMYL och datumregeln finns inte i `guide/` eller `.claude/skills/` (sökt 2026-10-16).

Förslag till Johnny:
- Punkt 2–5 skrivs in i `.claude/skills/innehall/text.md` (*Påståenden som kan styrkas*) med källan i `innehall/kallor.md`.
- Punkt 1 hör också till lager 9: `guide/2-9-drift-och-forvaltning.md`, *Rapporten*, och skillen `drift`. Fältet `aven` blir då "3, 9".

## Passar vår stack?
Ja. Inget verktyg, bara regler för text, datum och strukturerad data. Datumet i den strukturerade datan sätts av bygget; ett fält i innehållsfilen som bara ändras med texten räcker (🔧 förslag, inte prövat).

## Risker och flaggor
- **AI-upplysning:** Google säger *"when it would be reasonably expected"*. Det är en tolkning om besökaren på en småföretagssajt väntar sig en sådan upplysning när kunden har bekräftat varje faktum. Ingen regel föreslås innan AI-förordningen art. 50.4 är läst för text ⚠️.
- Sidan är leverantörens och kan ändras utan förvarning; den har ingen versionshistorik att bevaka.
- Kvalitetsbedömarnas riktlinjer om YMYL är inte lästa; de läses före nästa vårdkund (`andra-varvet/byggguider-jamforelse.md`, *Kompetenshöjning*).
- Licens, telemetri och betalvägg: inga problem.

## Inloggning
Inget.
