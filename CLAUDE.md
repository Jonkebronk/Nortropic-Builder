# Nortropic-Builder — för sessioner

Repot är grunden till Nortropics autonoma webbyrå. Det har två spår som inte är sammanförda än:

- **Guiden:** `IMPLEMENTERINGSGUIDE.md`, ett självgående flöde med Google Stitch som designmotor, byggt video för video ur råmaterialet i `kunskap/raw/`.
- **Kartan:** `karta/` och `inventering/`, med kundens väg, de nio lagren plus flödet och kompetensinventeringen.

Johnny beslutar. Claude föreslår, bygger och kontrollerar.

## Börja här

1. Läs `LAGE.md`: läget, nästa steg, det som väntar på Johnny och hur spåren förhåller sig till varandra.
2. Läs det avsnitt i guiden eller den fil i `karta/` som uppgiften gäller, och `BESLUT.md` när en fråga rör något Johnny redan avgjort.
3. Slå upp i `kunskap/research/` och `historik/` när en konkret fråga kräver det.

## Arbetssätt

- **Små steg.** En ändring i taget, och varje steg slutar med en kontroll som går att köra eller se.
- **Johnnys ord är beslut, Claudes är förslag.** Ett beslut skrivs ordagrant i `BESLUT.md` med datum och klockslag. Förslag märks som förslag tills Johnny sagt ja.
- **Evidens.** Varje påstående om omvärlden har en källa. Det som inte gick att verifiera märks overifierat, och juridiska läsningar märks som tolkning, inte juridisk rådgivning.
- **En plats per sak.** Ett beslut om ett lager skrivs in i lagrets fil i `karta/`, och ett beslut om en kandidat i fältet `beslut` i `inventering/inventering.json`. Guiden har sin egen statusrad och ändringslogg.
- **Spåren sammanförs inte på egen hand.** När guiden och kartan säger olika saker avgör Johnny. Skillnaden skrivs in under öppna frågor i `LAGE.md`.
- **Överlämning.** Uppdatera `LAGE.md` i slutet av varje session: vad som gjordes, nästa steg och vad som väntar på Johnny.

## Inventeringen

Efter en ändring i `inventering/inventering.json`: kör `python3 inventering/bygg.py` från repots rot och publicera `inventering/kompetensinventering.html` till artefakten https://claude.ai/artifact/ASZcbmg8qc9ThMusGjRZpe.

## Skyddsräcken

- Hemligheter och kunduppgifter ligger utanför repot.
- Råmaterialet i `kunskap/raw/` används bara internt som underlag och publiceras inte vidare (README).
- Från referenser får layout, palett och typsnitt lånas. Identitet, texter och bilder från andra företag kopieras inte (Johnnys regel från nortropic-webb-pro, 2026-10-03, som står kvar tills han säger annat).
