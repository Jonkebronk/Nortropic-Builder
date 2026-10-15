# Läget

Uppdaterad 2026-10-15.

## Två spår i repot

Repot har två spår som inte är sammanförda.

- **Guiden** (`IMPLEMENTERINGSGUIDE.md`, v0.73): ett självgående flöde där Claude Code styr Google Stitch, med låsta kontroller som grindar och Johnny i två stopp. Den byggs video för video ur 74 videotranskript i `kunskap/raw/videor/`, kontrolleras mot researchrapporterna i `kunskap/research/` och ska konsolideras när videogenomgången är klar.
- **Kartan** (`karta/`, `inventering/`, `BESLUT.md`, `principer.md`): kundens väg, nio lager plus flödet och kompetensinventeringen, framtagna med Johnny 13–15 oktober ur metoder, litteratur och GitHub.

### Där spåren stämmer överens

- Intervjun kommer först och ger underlaget för resten (guiden fas 1, kartan lager 1).
- Tre designriktningar tas fram innan bygget (fas 1b, lager 5).
- Ombyggnad av en befintlig sajt är ett eget spår (fas 0b, lager 2).
- Den som bygger granskar inte sitt eget arbete, och granskaren kalibreras mot Johnnys egna domar (§5.2 och §9.6, `karta/flodet.md`).
- Cloudflare som värd och Astro för en vanlig företagssajt (§14, lager 8). I guiden är Astro ett förslag som väntar på Johnnys bekräftelse.
- Kunskapen förankras i etablerade metoder och normer, med WCAG 2.2 AA som golv (§11, lager 4–8).
- Förvaltningen är en egen fas med schemalagda kontroller (fas 8, lager 9).
- Researchen i båda spåren landar lika i två juridiska frågor: mikroföretag är undantagna från tillgänglighetslagen (10 §), och även analys utan kakor kan kräva samtycke. Det är tolkningar, inte juridisk rådgivning.

### Där spåren skiljer sig, för Johnny att avgöra

1. **Designen.** Guiden låter Stitch ta fram en ny design för varje sajt och avråder från att låta ett komponentbibliotek styra utseendet (§14). Kartan låter AI:n välja inom ett eget sektionsbibliotek och 3–5 stilkit, där de tre riktningarna är tre stilkit på samma innehåll (`karta/5-yta.md`). Claudes förslag: Stitch, Inspo och Tastemaker används när stilkiten tas fram och förnyas, inte vid varje kundbygge.
2. **Ordningen.** Guidens nästa steg (§16) bygger flödet först, och den första exempelsajten kommer i steg 10 av 21. Kartans förslag är en sajt först och ny mekanik först när en verklig sajt behöver den, utifrån Johnnys beslut 2026-10-13 att börja om i små steg.
3. **Vem som väljer riktning.** I guiden väljer Johnny i stopp 1 (fas 1b). I Johnnys beskrivning av kundens väg 2026-10-13 väljer kunden.
4. **`CLAUDE.md`.** Guiden planerar en egen `CLAUDE.md` i roten som bara ändras via Johnny (§3, §10.1, §16 steg 7). Den som ligger där nu kommer från kartspåret och beskriver båda spåren.
5. **Besluten.** Guiden för sina beslut i §14. Kartspåret skriver Johnnys ord i `BESLUT.md`.

## Var vi står i kartspåret

- Riktningen är satt (`BESLUT.md`, `principer.md`, `karta/README.md`).
- Kartan finns: kundens väg och nio lager plus flödet (`karta/`). Lager 1–4 är genomgångna med Johnny. Lager 5–9 och flödet är utkast ur rapporten.
- Kompetensinventeringen finns: 72 delar ur nortropic-webb-pro och 99 nya kandidater, varav 53 att ta in och 46 att pröva (`inventering/`). Inga beslut om kandidaterna är fattade, och verktygen som guiden föreslår är inte införda i inventeringen än.
- Rapporten om kompetensluckor och anteckningarna bakom den finns i `kunskap/research/`.
- Inget är byggt: inget bibliotek, ingen egen skill och ingen sajt.

## Nästa steg (Claudes förslag, 2026-10-15)

1. Avgör designfrågan och ordningen ovan. De bestämmer vad den första sajten byggs med.
2. Välj den första verksamheten: ett av testfallen från tidigare eller en ny verksamhet.
3. Fatta bara de beslut som en första sajt kräver, lager för lager.
4. Bygg den första sajten i ett Astro-projekt, med det designsätt Johnny valt.

## Börja nu, lång ledtid

- Ansök om API-åtkomst för Google Business Profile. Kvoten är noll tills Google godkänt ansökan, och bara Johnny kan ansöka.
- Sätt upp Renovate med ett delat preset och sju dagars karenstid.
- Kör `/skill-doctor` och skill-creators beskrivningsoptimering innan nya skills läggs till.
- Bedöm 30–40 skärmdumpar av sajter med godkänt eller underkänt och en kort kritik. Det blir bedömarens kalibrering.

## Öppna frågor till Johnny

- Frågorna under "Där spåren skiljer sig".
- Repot är publikt, och då är även råmaterialet i `kunskap/raw/` publikt, fast README säger att det inte ska publiceras vidare. Ska repot bli privat igen?
- Vilken verksamhet blir den första?
- Vem svarar på intervjun i första varvet? Claudes rekommendation är en människa som verkligen känner verksamheten, inte en AI som spelar kund.
- Överlappar skillen `nortropic-intake` med den nya intervjuskillen? Den är inte granskad.
