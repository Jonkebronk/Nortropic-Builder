# Läget

Uppdaterad 2026-10-15, 13:30.

## Två spår i repot — nu på samma gren

Kartspåret slogs ihop med main 2026-10-15. Spåren är fortfarande två dokumentsamlingar, men fyra av skillnaderna är avgjorda (`BESLUT.md`, 2026-10-15).

- **Guiden** (`IMPLEMENTERINGSGUIDE.md`, v0.73): ett självgående flöde med Claude Code, låsta kontroller som grindar och Johnny i stoppen. Byggd video för video ur 74 transkript i `kunskap/raw/videor/`, kontrollerad mot researchen i `kunskap/research/`. Videogenomgången är avslutad; konsolideringen pågår.
- **Kartan** (`karta/`, `inventering/`, `BESLUT.md`, `principer.md`): kundens väg, nio lager plus flödet och kompetensinventeringen, framtagna med Johnny 13–15 oktober.

### Avgjort 2026-10-15 (`BESLUT.md`)

1. **Ordningen: flödet först** — guidens ordning. Beslutet 2026-10-13 om små steg står kvar.
2. **Designsättet: Stitch inom stilkit** — eget sektionsbibliotek och 3–5 stilkit (kartan); Stitch m.fl. används när stilkiten tas fram och förnyas, inte vid varje kundbygge.
3. **Riktningen: Johnny först, sedan kunden.**
4. **Sajttypen: vanlig flersidig sajt** som standardprodukt; scrollytelling blir tillval.

### Där spåren stämmer överens

- Intervjun kommer först (guiden fas 1, kartan lager 1). Tre riktningar före bygget. Ombyggnad är ett eget spår. Den som bygger granskar inte sitt eget arbete. Cloudflare och Astro. WCAG 2.2 AA som golv. Förvaltningen är en egen fas. Mikroföretag undantagna från tillgänglighetslagen; analys utan kakor kan ändå kräva samtycke (tolkningar, inte juridisk rådgivning).

### Fortfarande öppet mellan spåren, för Johnny

1. **`CLAUDE.md`** — guiden planerar en egen som bara ändras via Johnny; den som ligger i roten kommer från kartspåret.
2. **Besluten** — guiden för beslut i §14, kartspåret i `BESLUT.md`. Claudes förslag: `BESLUT.md` blir det enda registret; §14 behåller bara öppna frågor.
3. **Licensbeslutet 2026-10-13 18:50** — gäller "kopiera, reverse engineera och ta andra företags designer" betalda verktyg (t.ex. Mobbin) eller andra företags sajter? Både guidens originalitetskontroll och webb-pros referensregel är snävare. Webb-pro-genomgången visar att det skriftliga licensbeskedet där har oifyllda platshållare.
4. **Intervjun** — guiden intervjuar Johnny med svarsalternativ, kartan kunden med öppna frågor.
5. **Detaljer som säger emot varandra:** Lucide och Inter (förbjudna i guiden, standard i kartan), ortssidor, Firecrawl, var säkerhetsheaders sätts.

## Konsolideringen — underlag

- `kunskap/research/2026-10-15_webb-pro-genomgang.md` — varför webb-pro inte gav bra sajter, vad som är värt att ta med, fem risker för att guiden upprepar misstagen.
- `kunskap/research/2026-10-15_karta-mot-guide.md` — lager för lager mot guiden, konflikter, luckor åt båda håll.
- `kunskap/research/2026-10-15_guide-konsolideringsanalys.md` — 27 dubblettgrupper, motsägelser med radnummer, regler med en källa som fungerar som grind, ⚠️-inventering, minsta nödvändiga för en första sajt.

## Var vi står

- Inget är byggt: inget bibliotek, inga stilkit, ingen egen skill och ingen sajt.
- Inventeringen: 72 delar ur webb-pro och 99 kandidater; inga beslut fattade. Guidens ~60 verktyg är inte införda i inventeringen.

## Nästa steg (Claudes förslag, 2026-10-15)

1. Konsolidera guiden efter besluten: rätta motsägelserna, slå ihop dubbletterna, byt designsätt (stilkit), sajttyp (flersidig) och riktning (Johnny, sedan kunden), och märk varje regel *behövs för första varvet* eller *senare*.
2. Välj den första verksamheten — flödets första varv körs på den.
3. Bygg flödets kärna i små steg, med en synlig sajt så tidigt som möjligt i varje steg.

## Börja nu, lång ledtid

- Ansök om API-åtkomst för Google Business Profile (bara Johnny kan ansöka; svar inom 14 dagar).
- Bedöm 30–40 skärmdumpar av sajter med godkänt eller underkänt och en kort kritik — bedömarens kalibrering.
- `claude update` (mods kräver 2.1.287).
- Sätt upp Renovate med ett delat preset och sju dagars karenstid.

## Öppna frågor till Johnny

- Frågorna under "Fortfarande öppet".
- Repot är publikt, och därmed råmaterialet i `kunskap/raw/`. Ska repot bli privat igen? (Johnny 2026-10-15: "det ändrar vi sen".)
- Vilken verksamhet blir den första? Vem svarar på intervjun i första varvet?
- Tidsbudget per sajt — saknas i båda spåren.
- Överlappar skillen `nortropic-intake` med den nya intervjuskillen?
