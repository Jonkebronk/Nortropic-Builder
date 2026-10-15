# 5. Byggplanen

**Status:** konsoliderad v1.0, 2026-10-15. Ersätter v0.74 §16 (21 steg, där den första hela sajten kom i steg 13). **Genomläst med Johnny 2026-10-15**; rättelserna står i `BESLUT.md`.

**Ordning:** flödet först (beslut 2026-10-15) – men i små steg (beslut 2026-10-13), och **varje steg ger något Johnny kan se och döma**. Ett steg är klart när Johnny har dömt resultatet, inte när kontrollerna går igenom. Stegen körs som **övningssajter för verkliga lokala firmor, en i taget, tills Johnny är nöjd** (beslut 2026-10-15: *"vi kommer bygga ett x antal fiktiva hemsidor tills jag är nöjd och vi har mängdträning"* och *"Vi tar ju lokala verklig firma och tränar på det"*). Firman finns på riktigt, men den har inte beställt sajten. Övningen körs interaktivt i huvudsessionen medan Johnny tittar. Flödets delar byggs för att sajten framför oss ska bli bra, inte för en tänkt framtida skala.

**N1 är litet med avsikt:** högst cirka 60 regler och tio automatiska kontroller i hela guiden (`README.md`, *Nivåer*). Den genererade sammanfattningen `n1-forsta-sajten.md` visar vad som gäller.

## Förberedelser [N1]

Beslut som behövs först (`bilaga-e-oppna-fragor.md`, avsnitt 1):

1. ~~Den första verksamheten~~ **Avgjort 2026-10-15:** övningssajter för verkliga lokala firmor, en i taget, tills Johnny är nöjd. Johnny intervjuar tillsammans med AI:n (beslut 2026-10-15).
2. ~~Publiceras den första sajten?~~ **Avgjort 2026-10-15:** övningssajterna publiceras högst på en förhandsadress bakom Cloudflare Access (*Övningssajterna* nedan). Det kräver ett Cloudflare-konto men ingen domän; kontot är byråns eget, eftersom det inte finns någon kund som äger ett. Kontot och nycklarna är mänskliga klick (`2-2-omfattning.md`).
3. ~~Bildkälla om verksamheten saknar egna foton~~ **Avgjort 2026-10-15:** stock- och AI-bilder är tillåtna, även av personer, enligt ärlighetsregeln (`2-7-innehall.md`).

**Bygget görs på Johnnys Mac** med den nyaste Claude Code (`BESLUT.md` 2026-10-15). Först där: inventera användarnivån (`~/.claude`), avgränsa byggsessionen och verifiera den (`3-3-sakerhet-och-installningar.md`), och pröva om versionen ändrar något som guiden har verifierat på 2.1.281.

Filer som behövs innan steg 1:

| Fil | Var den beskrivs |
|---|---|
| Kort `CLAUDE.md` för sajtarbetet | `3-4-larande-och-underhall.md` |
| `.claude/settings.json` med `permissions.deny` för push, deploy och `.env` | `3-3-sakerhet-och-installningar.md` |
| De åtta kärnfrågorna och briefmallen med sex rubriker | `2-1-strategi.md` |

Kontrollskriptet byggs i steg 3 och granskningsmallen i steg 4 – inte i förväg.

Börja nu – lång ledtid:

- **Ansök om API-åtkomst för Google Business Profile.** Bara Johnny kan ansöka; svar inom 14 dagar (`2-9-drift-och-forvaltning.md`).
- ~~Johnnys måttstock för vad som är bra~~ **Klar 2026-10-15:** Johnny dömde 39 sajter, och måttstocken är godkänd (`mattstock/mattstock.md`). Den blir granskarens kalibrering i steg 4 och grunden för eval (`3-2-granskning-och-kalibrering.md`).
- `claude update` – bara om mods ska användas (kräver 2.1.287; `3-5-live-visning.md`).

## Stegen

| # | Steg | Vad som görs | Johnny ser och dömer | Klart när |
|---|---|---|---|---|
| 1 | **Intervju → brief** | Johnny intervjuar verksamheten tillsammans med AI:n utifrån de åtta kärnfrågorna; briefen med sex rubriker; `fakta.md` med källa per faktum; sidkartan som tabell i `sites/<namn>/sidkarta.md` | Briefen, faktabasen och sidkartan | Kunden har bekräftat underlaget och Johnny har godkänt briefen |
| 2 | **Tre riktningar** | Tre minimala stilkit (färg, typsnitt, avstånd, radie, kort `design.md`) och de sektioner startsidan behöver, en variant var. Stitch används när kiten tas fram, aldrig med kundinnehåll. Riktningarna = **startsidan i tre kit**. Blickprovet körs på varje riktnings första vy i mobil innan Johnny ser dem (`2-4-skelett.md`) | De tre riktningarna, mobilen först – stryker eller släpper till kunden | Kunden har valt bland dem Johnny släppt |
| 3 | **Bygget** | Hela sajten i valt kit: standardsidorna och de sektioner de behöver; kontrollskriptet med de tio N1-kontrollerna (`2-8-teknik-och-kvalitet.md`). På den första övningssajten i två rörelseversioner, sparsam och måttlig (`2-6-rorelse.md`). Ingen granskare än | Sajten i webbläsaren; de två rörelseversionerna på video | De stoppande kontrollerna går igenom, så att sajten är redo för Johnnys dom – och Johnny har dömt den |
| 4 | **Granskaren** | En delagent med ren kontext och en checklista med måttstockens tre frågor och 8 av Johnnys domar som exempel. Först mäts den på måttstockens 31 övriga sajter, med samma bilder som Johnny såg (`mattstock/verktyg/`); sedan granskar den sajten, och dess fynd jämförs med Johnnys egna domar | Mätningen – andelen rätt bland hans godkända och bland hans underkända – och sedan granskarens fynd bredvid sin egen dom | Johnny har avgjort vilka fynd som var rätt; avvikelserna loggas i `domar.jsonl` som kalibreringsdata |
| 5 | **Publicering** (om sajten publiceras) | Cloudflare Workers, förhandsadress bakom Access, `_headers` med grundhuvudena | Förhandsadressen, sedan den publicerade sajten | Johnny har godkänt och sajten är live |
| 6 | **Förvaltningens första rapport** | Rapporten med nordstjärnan, gjord för hand med Claude. I övningssajterna övas formen med det som finns; resten står som *mäts efter lansering* (`2-9-drift-och-forvaltning.md`) | Rapporten | Johnny godkänner den som något kunden skulle betala för |

**I varje steg** mäts tiden i `progress.md` som underlag – ingen tidsbudget förrän Johnny är nöjd med kvaliteten (`1-kundens-vag.md`), och det som gjordes för hand noteras. Det som har gjorts för hand tre gånger blir kandidat till en skill (`bilaga-b-skills.md`).

## Övningssajterna

Övningssajter för verkliga lokala firmor, en i taget, tills Johnny är nöjd (`BESLUT.md` 2026-10-15). Firman finns på riktigt men har inte beställt sajten.

- [N1] **Så görs en övningssajt.** **Underlaget** hämtas ur firmans egen sajt och Google-profil, med källa per uppgift i `fakta.md`. Det som saknas svarar Johnny på i intervjun i rollen som kund; de svaren får `kalla: johnny-som-kund` och förväxlas aldrig med det firman själv har bekräftat (`2-7-innehall.md`, *Faktabasen*). **Ingenting syns utåt utan Johnnys beslut:** sajten publiceras högst på en förhandsadress bakom Cloudflare Access, där steg 5 övas; firmans bilder och texter är firmans och används bara i övningen; firman kontaktas inte och får inte se sajten om inte Johnny beslutar det. **Allt om firman ligger privat** – sajten, faktabasen, bilderna och domarna – i `sites/<namn>/`, som byggrepots `.gitignore` utesluter; inget hamnar i det publika repot. **Ny bransch för varje firma,** genom måttstockens sex branscher och med och utan befintlig sajt, så att serien inte lär sig en enda kund. Måttstockens underkända svenska firmor är givna kandidater, eftersom Johnnys *För godkänt:* redan säger vad sajten måste klara (`mattstock/domar.jsonl`). 🔧 (`BESLUT.md` 2026-10-15)
- [N1] **Efter varje sajt: genomgång och underlag.** Claude lägger fram vad Johnny rättade och vad granskaren missade, med förslag på var varje rättelse ska föras in – regel, skill, bibliotek eller stilkit (`3-4-larande-och-underhall.md`). Johnny godkänner eller stryker (princip 9). Johnnys domar över sajten läggs till kalibreringen, och granskaren mäts om, nu också på de egna utkasten (`3-2-granskning-och-kalibrering.md`). Underlaget för när Johnny är nöjd visas: andelen domar som blev godkända utan rättelse, granskarens träffsäkerhet och tiden per steg (`progress.md`). Johnny avgör när serien är klar; ett steg som klarat några sajter i rad utan rättelse kan bli självgående (princip 7). Bara det som skrivs ner lär systemet något – modellen minns inget mellan sessioner. 🔧 (`BESLUT.md` 2026-10-15)

## Därefter – när en verklig sajt kräver det

Ordningen nedan är en prognos, inte en plan. Varje ny mekanism ska kunna peka på den sajt som behövde den (`README.md`, princip 8).

| Nivå | Typiskt nästa |
|---|---|
| N2 – sajt 2–5 | Fler stilkit med alla axlar; fler sektioner och varianter; specialistgranskare; grindkontroll med Stop-hook och belägg; låsning av brief och kontroller; `state.json` och överlämningsfiler; designregelvakt; formulär med Turnstile och D1; staging med egna databasresurser; samtycke och integritetspolicy; SEO-kontrollerna; resultatlogg; `/security-review` |
| N3 – förvaltning | Schemalagda kontroller per kund, visuell regression, ändringskö, ärendeagent, kundavtal och biträdesavtal, juridikfrågorna med jurist, omkalibrering av granskaren |
| N4 – skala | Eval-svit, plugin med versioner, parallella byggen, sandlåda, mods och flödespanel, dolda kontroller, förslag ur lärandet i större skala, tillval som Variate och Scroll World |

Detaljerna står i respektive lager- och flödesfil under märket för nivån.
