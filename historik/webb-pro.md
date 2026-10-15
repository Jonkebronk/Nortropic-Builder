# nortropic-webb-pro: vad som hände och vad vi tar med oss

Repot Nortropic/nortropic-webb-pro, 1–13 oktober 2026. Sammanställt 2026-10-13 ur repot vid commit 66db152 och samtalet med Johnny samma dag.

## Vad det var

En motor som skulle bygga webbplatser åt riktiga verksamheter, med Claude Code som utförare och Johnny som domare. Den omfattade kundunderlag, research, riktningar, kundens val, helbygge, export och förhandsvisning på Cloudflare, plus en portal, Kundstart, prospekt, kirurgen och en vilande backlog.

## Siffrorna den 13 oktober

- 953 commits på 13 dagar och cirka 126 000 rader Python.
- 61 skills, med 67 dokumenterade krockar sinsemellan.
- 112 beslutsavsnitt i BESLUT.md och 220 backloggposter.
- Inget bygge lanserat, och inga nya domar i LARDOMAR.md sedan den rena designstarten 9 oktober.

## Vad som gick fel (Claudes analys, 2026-10-13)

- **Looparna bytte plats.** Förbättringsloopen gick för fullt, medan loopen där Johnnys domar skulle styra stod still.
- **Rören verifierades, inte vattnet.** Det fanns många kontroller av att mekaniken fungerade men ingen måttstock för om sajterna var bra.
- **Johnnys ord blev mekanik.** En fråga om detaljer blev samma förmiddag en station och ett grindkriterium.
- **Agenterna formulerade alternativen,** och Johnnys beslut blev ofta svar på deras numrerade listor.
- **Det komplexa kom före det enkla.** Enligt Galls lag växer komplexa system som fungerar ur enkla system som har fungerat.
- **Hypotes:** regler, checklistor och språkmodeller drar mot genomsnittet, vilket kan förklara att allt blev generiskt.

Johnny om vad han försökt bygga, samma dag: "Jag känner igen mig, hur ska jag bygga min vision? Om jag skulle börja om på nytt". Beslutet att börja om står i `BESLUT.md`.

## Det vi tar med oss

- Kunskapstexterna i webb-pros `kunskap/`, bland annat `kundintervju.md` (intervjuguiden A–J med kolumnen "Nästa användning"), `teoretisk-grund.md` (processmodell och litteratur), `byggstandard.md`, `seo-lokal.md`, `lansering.md`, `drift.md` och `bild.md`.
- Mallens Astro-komponenter (förfrågan, bokning, hitta hit, nyhetsbrev, betallänk, språkväxlare och brödsmulor) och leveransmallen för Cloudflare Workers.
- Licensbeskeden i webb-pros BESLUT.md (2026-10-09) och regeln om referenser (2026-10-03).
- Skillsen och MCP:erna, som är inventerade i `inventering/`.

Webb-pro står kvar som arkiv att slå upp i när en konkret fråga kräver det (Claudes förslag, 2026-10-13).
