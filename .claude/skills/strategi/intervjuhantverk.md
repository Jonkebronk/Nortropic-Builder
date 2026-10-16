# Intervjuhantverket

Delfil till `strategi`. Reglerna för intervjun bor i `guide/2-1-strategi.md`, *Intervjun* och *Kärnfrågor och intervjuguide*. Här står det som gör frågorna bra, med källa per punkt.

## Grundreglerna

| Regel | Varför | Källa |
|---|---|---|
| Fråga om deras liv, inte om sajten eller byråns idé | När idén kommer fram börjar folk vara artiga i stället för att berätta | 📄 Fitzpatrick, *The Mom Test*, regel 1 (⚠️ via wondelai `mom-test`) |
| Fråga om specifika händelser i det förflutna, inte om vanor eller framtiden | "Brukar", "alltid" och "skulle" är fluff utan ett exempel | 📄 *The Mom Test*, regel 2; 📄 NN/g, Rosala 2021 |
| Prata lite, lyssna mycket | Kunden ska stå för det mesta av samtalet | 📄 *The Mom Test*, regel 3; 📄 Hall, *Interviewing Humans* ("actually about shutting up") |
| En fråga i taget, utan numrering | Flera frågor på en gång blir ett formulär, och svaren blir tunnare | 📄 Geiecke & Jaravel (princip); 📄 `smb-onboard`, `reference/gotchas.md` |
| Öppen fråga först, sluten som följdfråga | Slutna frågor släpper inte fram det oväntade | 📄 NN/g, Rosala 2021, steg 3 |
| Lätt först, det som kräver eftertanke senare | Uppvärmningen bygger förtroende | 📄 NN/g, Rosala 2021, steg 5 |
| Be om ett exempel, en plats, en person eller en händelse | Konkreta belägg ger mer än allmänna omdömen | 📄 Geiecke & Jaravel (princip: samla påtagliga belägg) |
| Ingen fråga förutsätter en åsikt | En fråga som tar ställning ger försvar eller medhåll | 📄 Geiecke & Jaravel (princip); 📄 NN/g, Rosala och Pernice 2023 (ledande frågor förstör datan) |
| Ingen lång återberättelse och inga utrop som "vad bra" | Det saktar ner och leder | 📄 Geiecke & Jaravel (princip) |
| Gå framåt, ta inte upp avklarade ämnen igen | Samtalet ska inte kännas som ett förhör | 📄 Geiecke & Jaravel (princip) |
| Frågar kunden om annat, styr vänligt tillbaka | Samtalet har ett syfte | 📄 Geiecke & Jaravel (princip) |
| Avbryt inte och stressa inte | Det skadar förtroendet | 📄 NN/g, Rosala och Pernice 2023 |

**Om "varför".** Guiden säger "Hur kommer det sig" i stället för "varför", som kan låta dömande, och anger Geiecke och Jaravel som källa (`guide/2-1-strategi.md`, *Oskrivna regler*). Deras `config.py` (commit `9429776`, 2026-02-07) har inte den regeln, och både den och NN/g (Rosala 2021) använder "Why is this important to you?" som följdfråga. Regeln behålls som en stilfråga 🔧. Källan i guiden bör rättas (förslag till Johnny).

## Omformuleringar

Hypotetiska och ledande frågor görs om till frågor om det som hänt. Guiden låter AI:n anpassa kärnfrågornas ordalydelse (`guide/2-1-strategi.md`, *Kärnfrågor och intervjuguide*).

| I stället för | Fråga | Källa |
|---|---|---|
| "Vad hade kunden gjort om ni inte fanns?" (kärnfråga 4) | "Vad hade den senaste kunden provat innan hen kom till er?" och "När förlorade ni senast en kund till någon annan, och vart gick hen?" | 📄 *The Mom Test*, regel 2; Dunfords fråga är också hypotetisk (wondelai `obviously-awesome`, `references/competitive-alternatives.md`, fråga 4) |
| "Om ni fick tio gånger fler kunder i morgon …" | "När hade ni senast mer att göra än ni hann med? Vad hände då?" | → `guide/2-1-strategi.md`, *Utbud eller efterfrågan* |
| "Vad önskar ni att sajten kunde göra?" | "Berätta om senast någon hörde av sig. Vad ville hen veta först?" | 📄 wondelai `jobs-to-be-done` (fråga aldrig "do you wish") |
| "Skulle en chatt hjälpa?" | "Vilka frågor fick ni i telefon förra veckan?" | 📄 *The Mom Test* (idéer är dålig data, gräv efter problemet bakom) |
| "Är priset viktigt för era kunder?" | "Vad frågade den senaste nya kunden om innan hen bokade?" | 📄 NN/g, Rosala och Pernice 2023 (ledande frågor) |
| "Vi tänkte lyfta fram er erfarenhet, låter det bra?" | "Vad sa den senaste nöjda kunden till er efteråt?" | 📄 *The Mom Test* (komplimanger är brus) |

**När kunden kommer med en idé** ("vi borde ha en blogg"): skriv ner den, och fråga om senaste gången behovet fanns. Idén går till *inte nu*-listan eller omfattningen (→ skillen `omfattning`), men bara problemet bakom den går in i briefen. 📄 *The Mom Test*, dålig data (idéer).

**När kunden ger en komplimang eller ett allmänt svar** ("folk gillar oss"): fråga efter ett exempel. Ett svar med "alltid" eller "brukar" följs av "Berätta om senaste gången." 📄 *The Mom Test*.

## Följdfrågor

Använd det kunden just sagt. De här fungerar oftast:

- "Berätta mer om det."
- "Kan du ge ett exempel?"
- "När hände det senast? Vad hände sedan?"
- "Hur gick det till?"
- "Vem mer var inblandad?"
- "Hur vet ni det?" (för siffror, kärnfråga 5)

Källor: 📄 NN/g, Rosala 2021, steg 6; 📄 Geiecke & Jaravel (principerna); 📄 pm-skills `interview-script`, *Probing Techniques* (utom "Why?" två–tre gånger, se ovan).

Kan kunden inte svara: fråga från ett annat håll, till exempel genom att gå från en hel månad till en enda dag (📄 Geiecke & Jaravel, princip). "Vet inte" är ett giltigt svar och blir *okänt* (→ `guide/2-1-strategi.md`).

## Flera berättelser, inte en

Kärnfråga 1 ger en kund. En firma med flera tjänster har flera typer av besökare, och de har olika jobb. Fråga om den senaste kunden för varje huvudtjänst, och om den senaste som valde bort firman. 📄 wondelai `jobs-to-be-done` (intervjua flera som nyligen bytt); 📄 marketingskills `customer-research` (fem oberoende datapunkter per segment innan en persona byggs). En berättelse räcker för N1 men märks som en källa i briefen 🔧.

## Det som slås upp i stället för att frågas

Fråga inte om det som går att läsa: tjänster, öppettider, adress, betyg, företagsform och SNI-kod. Visa det i stället som förifyllda påståenden med källa. → `research.md`. 📄 `smb-onboard`, `website-research.md`.

## Avslutningen

- En sammanfattning per avsnitt som kunden kan ändra. Överhoppat står som *Inte angivet*. Inget är klart förrän kunden bekräftat. → `guide/2-1-strategi.md`, *Kontroll*. 📄 GOV.UK, *Check answers*.
- Visa hela profilen innan något sparas, och vänta på ett uttryckligt ja. 📄 `smb-onboard`, *Approval gates*.
- Fråga om det finns något mer som borde ha tagits upp. 📄 Geiecke & Jaravel (princip); 📄 pm-skills `interview-script`, *Wrap-Up*.
- Från N2: kunden betygsätter 1–4 hur väl sammanfattningen träffar (→ `guide/2-1-strategi.md`, *Kontroll*).

## Om pm-skills mall

Strukturen i `interview-script` (inledning, uppvärmning, kärna, fördjupning, avslutning) och anteckningsmallen går att använda. Fyra frågor tas inte in, eftersom de är hypotetiska eller leder: trollstaven, "What would you give up to have this solved?", "How would you know if this was working well?" och "Why?" ställt två–tre gånger i följd. 📄 [interview-script](https://github.com/phuryn/pm-skills/blob/main/pm-product-discovery/skills/interview-script/SKILL.md) (MIT, commit `c68487d`).

## Röst och transkript

Röstsvar är tillåtna och ger känslosignaler som text missar. Transkriptet blir underlag till röstprofilen (→ `guide/2-1-strategi.md`, *Erbjud att svara med röst*). Kunden informeras om att svaren går till en AI-leverantör (→ `guide/2-1-strategi.md`, *Rättsflaggor*; 📄 Geiecke & Jaravel, README, *Data*).
