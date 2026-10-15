# Nortropic-Builder — för sessioner

Repot är grunden till Nortropics autonoma webbyrå. **Guiden** i `guide/` (v1.0, konsoliderad 2026-10-15 på Johnnys uppdrag) beskriver hur byrån bygger och förvaltar en sajt i nio lager, hur flödet som gör arbetet är uppbyggt, företaget runt det och byggplanen. Den ersätter implementeringsguiden v0.74 och kartan, som ligger kvar i `historik/`. Kompetensinventeringen ligger i `inventering/`.

Johnny beslutar. Claude föreslår, bygger och kontrollerar.

## Börja här

0. Kör startsäkringen från repots rot: `skript/startsakring.sh`. Den uppdaterar Claude Code, npm-projekten, Playwrights webbläsare, MCP-servrar och plugins till senaste version och skriver vad som ändrades (`BESLUT.md` 2026-10-15).
1. Läs `LAGE.md`: läget, nästa steg och det som väntar på Johnny.
2. Läs `guide/README.md` (principer, nivåer N1–N4, grind eller instruktion) och den fil i `guide/` som uppgiften gäller.
3. Läs `BESLUT.md` när en fråga rör något Johnny redan avgjort. Beslut väger tyngst.
4. Slå upp i `kunskap/research/`, `kunskap/kallor.md` och `historik/` när en konkret fråga kräver det.

## Arbetssätt

- **Små steg.** En ändring i taget, och varje steg slutar med en kontroll som går att köra eller se. Varje steg i flödet ska ge något Johnny kan se och döma.
- **Johnnys ord är beslut, Claudes är förslag.** Ett beslut skrivs ordagrant i `BESLUT.md` med datum och klockslag. Förslag märks som förslag tills Johnny sagt ja. En kommentar från Johnny blir inte en regel, kontroll eller station förrän han sagt att den ska vara det.
- **Evidens.** Varje påstående om omvärlden har en källa. Det som inte gick att verifiera märks overifierat, och juridiska läsningar märks som tolkning, inte juridisk rådgivning. En regel blir låst kontroll bara med en norm eller två oberoende primärkällor (`guide/README.md`).
- **En plats per sak.** Beslut i `BESLUT.md`; regler i rätt fil i `guide/` (andra ställen hänvisar); beslut om en kandidat i fältet `beslut` i `inventering/inventering.json`; öppna frågor i `guide/bilaga-e-oppna-fragor.md`.
- **Börja enkelt.** Läs N1 först. Ny mekanik ska kunna peka på den sajt som behövde den.
- **Överlämning.** Uppdatera `LAGE.md` i slutet av varje session: vad som gjordes, nästa steg och vad som väntar på Johnny.

## Inventeringen

Efter en ändring i `inventering/inventering.json`: kör `python3 inventering/bygg.py` från repots rot och publicera `inventering/kompetensinventering.html` till artefakten https://claude.ai/artifact/ASZcbmg8qc9ThMusGjRZpe.

## Skyddsräcken

- Hemligheter och kunduppgifter ligger utanför repot.
- Råmaterialet i `kunskap/raw/` används bara internt som underlag och publiceras inte vidare (README).
- Från referenser får layout, palett och typsnitt lånas. Identitet, texter och bilder från andra företag kopieras inte (Johnnys regel från nortropic-webb-pro, 2026-10-03, som gäller tills han säger annat; `BESLUT.md` 2026-10-15). Ingen kod kopieras från andras sajter.
- Ingen publicering, deploy eller push av kundsajter eller övningssajter utan Johnnys godkännande. Övningssajterna och allt om firmorna ligger i `sites/`, som git inte tar med.
- **Byggrepot:** Johnny har gett stående tillåtelse att committa och pusha varje ändring direkt till `main`. Sök efter nycklar och hemligheter i ändringen före varje commit. Ingen force-push, ingen ändring av repots synlighet och ingen radering utan att fråga.
- **Byggsessionen** använder inga av användarnivåns gamla Nortropic- eller webb-pro-skills och -agenter (t.ex. `stack-builder`, som föreskriver Next.js). Avgränsningen står i `guide/3-3-sakerhet-och-installningar.md`.
