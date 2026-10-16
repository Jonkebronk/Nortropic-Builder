# <namn> – övningssajt

Sajten byggs enligt byggrepots guide. Byggrepot ligger två nivåer upp (`../../`), och där finns `guide/`, `mallar/` och `bibliotek/`, som filen hänvisar till. N1-reglerna står samlade i `guide/n1-forsta-sajten.md`. Johnny beslutar. Claude föreslår, bygger och kontrollerar, och Johnny tittar medan sajten byggs.

## Sessionen

- Sajten byggs från byggsessionen i byggrepots rot (`claude-bygg`). Filen laddas när Claude arbetar i den här katalogen.

## Publicering och hemligheter

- Sajten publiceras, deployas och pushas först när Johnny har godkänt det (`guide/5-byggplan.md`, steg 5).
- Hemligheter hamnar aldrig i repot och når aldrig webbläsaren.

## Övningsläget (`guide/2-1-strategi.md`)

- Firman finns på riktigt men har inte beställt sajten. Den kontaktas inte, och allt om den stannar i den här katalogen.
- Uppgifter ur firmans sajt och Google-profil är *sett*, med källa och datum. Det Johnny svarar i kundens ställe märks `johnny-som-kund`, och påhittade svar som Claude ger när Johnny överlåter intervjun märks `claude-som-kund`. Inget presenteras som bekräftat av firman.

## Intervjun (steg 1, `mallar/karnfragor.md`)

- Johnny leder samtalet. Claude håller ordning på kärnfrågorna, föreslår följdfrågor och fyller `brief.md` och `fakta.md` under samtalet.
- En fråga i taget. Frågorna är öppna och gäller verkliga, nyliga händelser. Föreslå aldrig svar. "Vet inte" blir *okänt*, aldrig en gissning.

## Fakta och text (`guide/2-7-innehall.md`)

- `fakta.md` är den enda källan till fakta om firman, med `kalla` per post. Briefen är ingen faktabas.
- Skriv bara fakta som finns i `fakta.md`. Det som saknas blir `[[PLATSHÅLLARE: vad som saknas]]` och en fråga till Johnny.
- Stock- och AI-bilder visas aldrig som firmans personal, och fotorealistiska AI-personer märks.

## Arbetssätt

- Byggplanens steg tas i ordning (`guide/5-byggplan.md`). Varje steg slutar med något Johnny ser och dömer, och steget är klart först när han har dömt det.
- Små steg: en ändring i taget, och varje steg slutar med en kontroll som går att köra eller se.
- Ytan kommer ur ett stilkit, aldrig ur fri generering (`guide/2-5-yta.md`).
- Sajten syns lokalt i webbläsaren medan den byggs. Servern lyssnar bara på `127.0.0.1`.
- `progress.md` håller läget: steget, vad som är gjort, vad som inte gick och varför, vad som väntar på Johnny och tiden per steg (`guide/3-1-orkestrering-och-roller.md`). Den uppdateras före varje paus.
- En commit per lyckat varv, i det här repot.
- Johnnys ord om sajten skrivs i `progress.md` med datum. En kommentar blir en regel först när han säger det.
