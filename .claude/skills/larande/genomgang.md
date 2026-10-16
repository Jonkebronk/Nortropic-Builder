# Genomgången efter en sajt

Regeln bor i `guide/5-byggplan.md`, *Efter varje sajt*: Claude lägger fram vad Johnny rättade och vad granskaren missade, med förslag på var varje rättelse ska föras in, och Johnny godkänner eller stryker. Här står vad genomgången ska innehålla. Förebilden är den första övningssajtens `genomgang.md`.

## 1. Underlaget: när är Johnny nöjd?

- **Domarna** som tabell: steg, objekt, dom och rättelser efteråt. Räkna godkänt utan rättelse, godkänt med rättelse och underkänt.
- **Granskaren:** dess dom mot Johnnys, fynden som var rätt, fel adress eller missade, och ommätningen ([matning.md](matning.md)).
- **Tid per steg**, klocktid och Johnnys tid, ur `progress.md`, också för sidospår som inte hör till något steg.
- Inget steg är självgående förrän det klarat flera sajter i rad utan rättelse (→ `guide/README.md`, princip 7).

## 2. Rättelserna och var de hamnar

En tabell: Johnnys rättelse, räckvidd, orsak och var den hamnade eller föreslås hamna.

| Räckvidd | Betyder | Hamnar |
|---|---|---|
| Sajtbeslut | Gäller den kunden | Sajtens filer och `domar.jsonl` |
| Smak | Johnnys smak i ett fall | Exempel i kalibreringen, aldrig ett krav |
| Hypotes | En metod som kan gälla fler | Förslag med hur den prövas |
| Generell rättelse | Fel som gäller varje bygge | Förslag till regel, bibliotek, kit, kontroll eller skill |

| Orsak | Hemvist, billigast först |
|---|---|
| Processen var fel | Skillens arbetsgång eller byggplanen |
| Kontext saknades | Brief, faktabas, mall eller referensfil |
| En regel var svag | Kriterium eller kontroll (kontroll bara för det objektivt fel som hänt mer än en gång) |
| Koden var opålitlig | Låst skript |

Källa: → `guide/3-4`, *Orsaken klassas före förslaget* och *Var en regel hör hemma*.

**Leta rättelserna i Johnnys ord, också de som inte står som domar.** Fyra tecken: ett förbud ("inte så"), en rättelse ("nej, det ska vara …"), irritation och upprepning (samma sak sagd två gånger). Lägre vikt: en tanke han prövar högt, en förklaring till Claude, ett engångsfel och en smakfråga. 📄 hookify, `agents/conversation-analyzer.md` (Apache-2.0; signalerna och undantagen, läst 2026-10-16). Pluginen installeras inte (nedan).

**Felanalys före klassning.** Läs först varje rättelse och varje miss som en fri anteckning med egna ord, utan färdiga kategorier. Gruppera sedan anteckningarna i felsorter, och för felsorterna vidare mellan sajterna, så att det som återkommer syns. 📄 Husain och Shankar, [Evals FAQ](https://hamel.dev/blog/posts/evals-faq/) (fri kodning, sedan gruppering till en "failure taxonomy"). Det agenten faktiskt skrev när den hoppade över något loggas ordagrant, som handlingar och utdata (→ `guide/3-4`, *Backa med handlingar*).

## 3. Tidsförluster: vad hade fångat dem?

För varje sidospår eller omtag som tog mer än cirka 15 minuter: vad hände, varför, och vad som hade fångat det tidigare. Svaren hör hemma på det billigaste stället:

| Fångas av | När |
|---|---|
| En rad i en mall eller i kärnfrågorna | Frågan kunde ha ställts i steg 1 |
| En kontroll i kontrollskriptet | Felet är objektivt och syns i den byggda sajten |
| En Stop-hook eller `/goal` med kontrollerna | Arbetet sa "klart" innan kontrollerna var gröna |
| En granskare tidigare i flödet | Felet syntes på bilderna men upptäcktes sent |
| Ett beslut i förväg | Samma fråga till Johnny kom tillbaka i flera varianter |

En loop eller hook är bara rätt svar när måttet är entydigt ([loopen.md](loopen.md)).

Leta också i agentens miljö, inte bara i sajten: tog det lång tid att hitta en fil eller en uppgift (en pekare saknas), fanns en kontroll som inte var inkopplad, var ett verktygsanrop onödigt dyrt, och står det instruktioner i `CLAUDE.md` eller en skill som inte ändrar något? Ett mekaniskt fel blir ett förslag till kontroll (tabellen ovan); ett omdömesfel blir ett kriterium hos granskaren. 📄 Matt Pocock, `skills/engineering/retro` (MIT, commit `49dd158`).

## 4. Förslagen

Numrerade G1, G2 … med förslaget, var det ska föras in och grunden (Johnnys ord, ett fynd eller en mätning). Ett förslag till en låst fil, som `mallar/granskning.md`, säger att filen är låst och att Johnny godkänner.

Skriv också det som **inte** ska bli regel och varför, så att samma förslag inte kommer tillbaka (→ `guide/3-4`, *Förbättringsjournal*).

Förslag till `CLAUDE.md` eller en skill visas som en diff med en rad *Varför*, och inget skrivs utan Johnnys ja – formen ur `/revise-claude-md` i pluginet claude-md-management (Apache-2.0). Pluginen hookify och claude-md-management installeras inte: hookifys regler gäller direkt och ligger i filer som agenten själv kan stänga av, vilket bryter mot låsningen i `guide/3-1`. 📄 [hookify README](https://github.com/anthropics/claude-plugins-official/tree/main/plugins/hookify) (regler i `.claude/hookify.*.local.md`, gäller vid nästa verktygsanrop).

## 5. Efter Johnnys svar

Johnnys svar står ordagrant i `BESLUT.md`. Förslagen han säger ja till förs in i sina hemvister i samma varv, och en låst fil får en ny kontrollsumma (→ `guide/3-1`, *När ett beslut ändrar sajten*).

**Infört är inte verifierat.** Ett förslag som förts in står som *infört*. Det blir *verifierat* först när nästa granskning, kontrollkörning eller sajt visar att felet är borta. Kommer felet tillbaka öppnas förslaget igen med den nya rapporten, och felsorten räknas en gång till. 📄 webb-pros `backlog` (statusen *verifierad* sätts av den granskning som prövar rättelsen, egen); → `guide/3-4`, *Förbättringsjournal*.
