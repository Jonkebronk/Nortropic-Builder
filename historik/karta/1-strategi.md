# Lager 1: Strategi

**Status:** genomgånget med Johnny 2026-10-13.

## Vad byrån gör

Tar reda på vad verksamheten vill uppnå med sajten, vilka kunderna är och vad de vill få gjort när de kommer dit, och vad som skiljer verksamheten från konkurrenterna.

## Vad som kommer ut

En strategibrief på en sida: mål och hur de mäts, målgrupper och deras viktigaste uppgifter, positionering, ton och belägg.

## Hur

En intervjuande AI (`BESLUT.md`, 2026-10-13):

- **Research först, frågor sedan.** AI:n läser Google-profilen, omdömena, sajten om den finns, sociala medier, Bolagsverket och SCB före samtalet och frågar bara om det den inte hittar. Kunden bekräftar i stället för att skriva, och varje förifyllt påstående visar sin källa.
- **Frågorna utgår från nästa lager.** Varje fråga finns för att ett senare lager behöver svaret. Intervjun är klar när varje lager har det det behöver, inte efter ett visst antal frågor.
- **Hantverket.** En fråga i taget, öppna och icke-ledande frågor om verkliga händelser, be om exempel och föreslå aldrig svar. Frågorna om jobs to be done handlar om ägarens kunder: "Berätta om den senaste kunden som anlitade er. Hur hittade de er, och vad hade de provat innan?"
- **En egen granskare** prövar underlaget mot frågan "kan nästa lager börja med det här?" och skickar tillbaka luckorna som följdfrågor.
- **Kunden bekräftar** en sammanfattning med en ändra-länk per avsnitt (GOV.UK:s check answers) och betygsätter 1–4 hur väl den träffar.

## Kompetens

- **Egen skill:** intervjuskillen. Destilleras ur marketingskills `customer-research`, wondelai `jobs-to-be-done` och `obviously-awesome`, Anthropics `smb-onboard` och `review-reputation` samt principerna i Geiecke och Jaravels intervjuplattform.
- **Eget bibliotek:** intervjuguiden, med webb-pros `kundintervju.md` (A–J och kolumnen "Nästa användning") som grund och två nya kolumner: "kan besvaras utan ägaren, ur källa" och "obligatorisk eller valfri". Dessutom briefmallen.
- **Åtkomst vid kundbygget:** Google Business Profile API (ansök nu), SCB:s företagsregister (API-nyckel), Bolagsverkets API (villkoren är overifierade) och eventuellt Google Maps Grounding Lite.
- **Förankring:** Christensen m.fl. (jobs to be done), Erika Hall (*Just Enough Research*), GOV.UK:s frågesidor och check answers, Caroline Jarretts question protocol, April Dunford (*Obviously Awesome*) och ISO 9241-210 som paraply.

## Kontroll

Varje påstående i briefen märks som kundens egna ord, offentlig källa eller antagande. Granskaren prövar underlaget mot frågeprotokollet. Kunden bekräftar sammanfattningen.

## Autonomi

Researchen går helt självgående. Målen och positioneringen är kundens beslut, och kunden bekräftar dem.

## Öppet

- Vem svarar på intervjun i första varvet? Claudes rekommendation: en människa som känner verksamheten.
- Överlappar skillen `nortropic-intake` med intervjuskillen? Den är inte granskad.
- Flaggor (tolkning, inte juridisk rådgivning): Googles EEA-villkor tillåter inte Places-data för konkurrentanalys. Intervjuutskrifter som skickas till en AI-leverantör kräver information och biträdesavtal. En enskild firmas registeruppgifter är personuppgifter.

## Underlag

Rapporten, lager 1 (`kunskap/research/2026-10-15_kompetensluckor-och-kandidater-per-lager.md`), `kunskap/research/2026-10-15_kompetensluckor-anteckningar/lager-1-2-strategi-omfattning.md` och inventeringen, lager 1.
