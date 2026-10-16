# Läget

Uppdaterad 2026-10-16 kl. 19.39 på Johnnys Mac, i den första byggsessionen (`claude-bygg`).

## Nästa session – börja här (skrivet 2026-10-16 kl. 19.39)

**Målet, i Johnnys ord omkring 17.20:** *"nu ska vi få alla mcps att fungera … Så ska vi göra klart den [övningssajten] innan vi startar nästa."* Gör stegen i ordning. Ett steg är klart först när resultatet är prövat och Johnny har sett det.

**0. Starta och kontrollera.** Kör startsäkringen (`CLAUDE.md`, steg 0) och kontrollera att övningssajten bygger och visas: `npm run build` i `sites/<sajt>/` och förhandsvisningen på `http://127.0.0.1:4322/` (`npx astro preview --port 4322 --host 127.0.0.1` i sajtens katalog om den inte körs). Läs `git log --oneline -60`, så att du ser vad som gjordes 2026-10-16.

**1. Få alla MCP:er att fungera** (`BESLUT.md` 2026-10-16, *Alla MCP:er in nu …* och *Senaste version med verktygslås …*).
- Kontrollera med `/mcp` och `claude mcp list` att servrarna syns. Alla ligger i lokal scope för repot i `~/.claude-bygg`; avgränsningen står kvar (Johnny 17.18).
- Johnny har loggat in via `/mcp` på 21st, Figma och Cloudflare (2026-10-16 kväll). DataForSEO väntar tills en sajt behöver datan (`BESLUT.md` 2026-10-16, 19.50). Kvar: Socket, som svarar på verktygslistan utan konto men kräver OAuth för anrop, och ärendet om `401 invalid_token` i Claude Code är öppet (SocketDev/socket-mcp #185).
- Grounding Lite, Google Developer Knowledge, nanobanana och BrowserStack lägger Johnny in med nyckel i ett eget terminalfönster; nycklar klistras aldrig in i chatten. Inloggning via `/mcp` fungerar inte för de två Google-servrarna (Johnny prövade 2026-10-16 kväll): Google stöder inte DCR, så de behöver huvudet `X-Goog-Api-Key` (`kunskap/kallkort/google-developer-knowledge-mcp.md`). **Developer Knowledge är klar** (2026-10-16, omkring 20.05): nyckeln är inlagd och servern svarar. Kvar: Grounding Lite. nanobanana och BrowserStack väntar (`BESLUT.md` 2026-10-16, 20.08). Kommandona, körda från repots rot med nyckeln i stället för platshållaren:
  ```
  CLAUDE_CONFIG_DIR=$HOME/.claude-bygg claude mcp remove grounding-lite
  CLAUDE_CONFIG_DIR=$HOME/.claude-bygg claude mcp add --transport http grounding-lite https://mapstools.googleapis.com/mcp --header "X-Goog-Api-Key: DIN_NYCKEL"
  CLAUDE_CONFIG_DIR=$HOME/.claude-bygg claude mcp remove google-developer-knowledge
  CLAUDE_CONFIG_DIR=$HOME/.claude-bygg claude mcp add --transport http google-developer-knowledge https://developerknowledge.googleapis.com/mcp --header "X-Goog-Api-Key: DIN_NYCKEL"
  CLAUDE_CONFIG_DIR=$HOME/.claude-bygg claude mcp add nanobanana -e GEMINI_API_KEY=DIN_NYCKEL -- /opt/homebrew/bin/uvx nanobanana-mcp-server@latest
  CLAUDE_CONFIG_DIR=$HOME/.claude-bygg claude mcp add browserstack -e BROWSERSTACK_USERNAME=DITT_NAMN -e BROWSERSTACK_ACCESS_KEY=DIN_NYCKEL -- npx -y @browserstack/mcp-server@latest
  ```
  Nycklarna skaffas i Google Cloud (Maps Grounding Lite och Developer Knowledge API, var sin begränsad nyckel; Grounding Lite kräver fakturering), Google AI Studio (Gemini, betald nivå i EES) och BrowserStacks *Account Settings* (betald plan).
- **Verktygslåset** (`python3 -I skript/mcp-verktygslas.py`, körs också i startsäkringen): 14 av 21 servrar är låsta, också Grounding Lite och Developer Knowledge, vars verktygslistor är öppna. Olåsta står på en egen rad med skälet: OAuth-servrarna (Figma, Cloudflare, 21st, DataForSEO), Mobbin (claude.ai-connector) och de som inte är tillagda. Nycklar läses ur byggsessionens konfiguration och skrivs aldrig ut. Kör det efter att nycklarna är inlagda; godta en ändring med `--uppdatera` först när Johnny har sett den.
- Kör varje servers prov mot övningssajten enligt MCP-gruppens rapport, sparad lokalt i sajtens `andra-varvet/mcp-jamforelse.md` (*Per MCP*, *Nya kandidater*). Skriv resultatet per server i sajtens `mcp-prov.md`: vad som gjordes, vad det gav, och om servern behålls. Lägg fram det för Johnny.

**2. Gör klart övningssajten.** Den är klar när allt nedan är gjort:
- **Johnnys domar** som väntar: bilderna före och efter och videorna av sparsam och måttlig rörelse (skickade 2026-10-16); grupp B i sajtens `premiumpass.md` (28 fynd); raden *I dag* (C4); texten om skatt och friskvårdsbidrag; 404 för gamla adresser (`public/_redirects`); provsidorna för Varm och Djärv (G8, G9); och **frågelistan** `kunskap/research/2026-10-16_tredje-varvet-till-johnny.md`: 57 punkter i påverkansordning, där punkt 50 är avgjord (19.09). Andra varvets kvarvarande frågor står där (menyn i mobilen 2, smak i kiten 8, bevakningsloopen B1–B8 38).
- **Andra varvets sajtfynd som inte är rättade:** samla dem ur avsnitten om nya fynd i sajtens `andra-varvet/*-jamforelse.md` (bland annat namn och rubriker som skiljer sig mellan sidor, tre länkstilar, fyra kortnät i rad på startsidan, sidfotens rubriker mindre än brödtexten, Kontakt utan bokningsbandet).
- **Kontrollskriptets nya N2-fynd på övningssajten** (`SNABB=1`, 19.06; bara 5b stoppar): 2g Trusted Types blockerar provtaggarna; 3d rubrikord delas utan bindestreck vid 24 och 32 px (fråga 48); 3f säkra ytor vid sidorna saknas; 4c två sorters handlingar i accent i samma fönster; 7d tal och enhet med vanligt mellanslag; 7e söksträngar som inte står i h1, h2 eller första stycket; 8m kartlänkar med samma namn och olika mål på kontaktsidan; 8o hover saknas på några element; 10c+ `Cross-Origin-Resource-Policy`; 10f `/api/samtycke` ger 400 i stället för 403 vid `Sec-Fetch-Site: cross-site`; 12d samma `lastmod` på alla adresser; 13 `allow-discrete` utan reserv; 13f knapplisten rör sig under första sekunden. Det som ligger inom beslut rättas i biblioteket och kopieras till sajten; smak och struktur går till Johnny.
- **Slutet:** kontrollskriptet utan `SNABB` (Lighthouse 100; 5b stoppar avsiktligt tills samtycket till behandlingsfotot finns; 9b stoppar på TBT när maskinen är belastad, fråga 46), Johnnys slutdom, ett tillägg i sajtens `genomgang.md` om andra och tredje varvet, och `LAGE.md`.

**3. Därefter nästa övningssajt:** hantverk (`guide/5-byggplan.md`, *Serien*), med måttstockens underkända snickare i tre orter (s04) som kandidat.

**Tredje varvet är klart** (Johnny omkring 17.35, *Kompetensinventeringen görs klar*):
- **Guiden och bilagorna:** gruppernas faktarättelser och förtydliganden är införda i 2-1–2-9, 3-1–3-4 och bilagorna A–F; det som ändrar en regel står i frågelistan.
- **Inventeringen:** 201 poster, alla placeringar är beslut (17.40), 202 källkort, och Guidepup är släpp (19.38). Artefakten är version 8. Bevakningen har 112 repon med full commit. Luckorna är 101: av de 93 gamla är 2 åtgärdade, 26 delvis och 65 kvar, och 8 är nya.
- **Kontrollerna:** 45 N2-kontroller i `skript/kontroll.mjs` (36 rapport, 9 stopp där en norm bär regeln) med en felbank: `node skript/kontroll.mjs --felbank` (cirka 4 min) ska ge *"Alla 45 kontroller fångar sitt fel …"*. Bilaga C har 230 rader. Inte byggda, med skäl i `kvalitet/kontroller.md`: 8j, 8k, 9d, 9e, 9g, 10g, 11b, 15 och 16.
- **Baslinjerna:** alla elva skills är mätta med och utan (`larande/baslinje.md`; `kunskap/research/2026-10-16_baslinjer-1.md` och `-2.md`). Skillsen tillför byråns egna regler och format, inte grunderna. Kvalitetsskillens tak på 15 fynd gäller inte normer och N1 (beslut 19.09); omprovet gav 100 %.
- **Verktygslåset** är rättat (se steg 1), och `bygg_n1.py` går med Macens python3.
- **Skärmläsare:** VoiceOver på Macen med Guidepup prövades och valdes bort (Johnny 19.38, `BESLUT.md`); erfarenheterna står i `kunskap/kallkort/guidepup.md`. Hur skärmläsare prövas i stället är fråga 57.

**Det som inte är gjort, så att ingen tror det:** inget är prövat på riktig iPhone, Android eller med skärmläsare (BrowserStack väntar på nyckeln; fråga 57). MCP-proven mot övningssajten är inte körda. Ingen skill är kortad: en andra uppgift per skill behövs först (fråga 51). Frågelistans 56 öppna punkter väntar på Johnny.

## Kort

- **Guiden v1.0 är genomläst med Johnny** 2026-10-15 i sin helhet: README, kundens väg, byggplanen, alla nio lagren, flödet 3.1–3.5, företaget och bilagorna. Varje rättelse står ordagrant i `BESLUT.md` med datumet 2026-10-15.
- **Måttstocken är godkänd:** `mattstock/mattstock.md`. Den har tre frågor, mobilen först: förstår och når kunden företaget på mobilens första skärm, är det äkta, håller utförandet. Den bygger på Johnnys domar över 39 sajter (`mattstock/domar.jsonl`).
- **N1 har 101 regler och tio automatiska kontroller med underkontroller.** Johnny godtog att taket på cirka 60 överskreds. Sammanfattningen genereras till `guide/n1-forsta-sajten.md` med `python konsolidering/bygg_n1.py`.

## Det viktigaste som beslutades 2026-10-15

Detaljerna står i `BESLUT.md`.

| Beslut | Var |
|---|---|
| **Övningssajter för verkliga lokala firmor**, en i taget, tills Johnny är nöjd. Firman har inte beställt sajten och kontaktas inte. Övningssajterna publiceras inte och visas bara lokalt (ändrat kl. 21.35), och allt om firman finns bara i `sites/` | `guide/5-byggplan.md`, *Övningssajterna*; `2-1-strategi.md`, *Övningsläget* |
| **Bygget görs på Johnnys Mac** med den nyaste Claude Code | `guide/3-3-sakerhet-och-installningar.md` |
| **De tre första kiten** tas fram ur måttstocken: Lugn och luftig, Varm och välkomnande, Djärv och egen | `guide/2-5-yta.md` |
| **Mobilens första skärm** svarar på vad, var och hur. Därefter följer *Det praktiska*. Kontaktvägen ligger på mobilen i en knapplist nere, och sidhuvudet är smalt med "Meny" (ändrat kl. 23.35) | `guide/2-4-skelett.md`, `2-3-struktur.md` |
| **Rörelse:** den första övningssajten byggs i två versioner, sparsam och måttlig, som Johnny dömer på video | `guide/2-6-rorelse.md` |
| **Stock- och AI-bilder är tillåtna, även av personer.** De visas aldrig som kundens personal, och fotorealistiska AI-personer märks | `guide/2-7-innehall.md` |
| **Granskaren** börjar med måttstocken och mäts först på måttstockens 31 sajter i steg 4 | `guide/3-2-granskning-och-kalibrering.md`, `5-byggplan.md` |
| **Provsajt ("Benchy"), branschprofiler och blickprov i steg 2**, efter jämförelsen med en 3D-skrivare | `guide/3-2`, `2-2-omfattning.md`, `2-4` |
| Astro statiskt är bekräftat. Inter och Lucide väljs per kit | `guide/2-8-teknik-och-kvalitet.md`, `2-5` |
| **Läge, modell och effort är Johnnys inställningar, inte regler.** Byggsessionen körs i auto mode med Opus 5.5 på xhigh (kl. 20.13–20.14) | `BESLUT.md`; `guide/3-3` |
| **Fritt mandat för förberedelserna:** mallarna i `mallar/` (kl. 20.30) | `BESLUT.md`; `guide/5-byggplan.md`, bilaga F |
| **Inget Cloudflare eller Google-API för övningssajterna.** Steg 5 övas inte förrän den första riktiga kunden (kl. 21.35) | `BESLUT.md`; `guide/5-byggplan.md` |
| **Inga spärrar.** Allt arbete med Nortropic-Builder, också sajtarbetet, görs från en session i repots rot i auto mode (kl. 21.16–21.20) | `BESLUT.md`; `guide/3-3` |

## Gjort på Macen 2026-10-15

- **Repot är klonat** till `~/nortropic-repos/nortropic-builder`. Det ligger nu på <https://github.com/Nortropic/Nortropic-Builder>.
- **Användarnivån är inventerad.** Krockarna med guiden är listade, avgränsningen är prövad och de versionsberoende fakta är kontrollerade mot 2.1.296. Allt står i `kunskap/research/2026-10-15_mac-avgransning.md`. Inget i Johnnys globala konfiguration är ändrat.
- **Johnny sa ja till allt** kl. 19.45 (`BESLUT.md`):
  - Byggsessionen avgränsas med `~/.claude-bygg`, och katalogens `settings.json` är skapad.
  - Claude Code är uppdaterad till 2.1.300.
  - Rättelserna är införda i `guide/3-3`, `3-5`, `5-byggplan` och bilaga E.
  - Före inloggningen är det prövat att bara repots `CLAUDE.md` och inbyggda skills laddas, utan MCP-servrar.
- **Johnny har loggat in i byggsessionen.** Efter inloggningen visade `claude -p "/context"` och init-provet med `~/.claude-bygg` att bara repots `CLAUDE.md` och inbyggda plugins, skills och delagenter laddas. Det fanns inga MCP-servrar, inga claude.ai-connectorer och ingen auto memory (`kunskap/research/2026-10-15_mac-avgransning.md`, *Tillägg kl. 20.15*).
- **Johnny valde auto mode och Opus 5.5 på xhigh** och sa att det inte ska vara regelstyrt (`BESLUT.md`). Bevakad körning är struken ur `guide/3-3`, och C165 i bilaga C gäller nu bara att N1 inte har några hooks.
- **Byggsessionen är verifierad och har tagit över** (kl. 20.26).
  - Inifrån laddade den interaktiva sessionen också `claude-in-chrome` och `ide`, vilket `-p` inte hade visat.
  - Chrome-verktygen spärrades kl. 20.25 och släpptes igen kl. 21.16 (*Inga spärrar*).
  - `ide` publicerar ingenting och får vara kvar.
  - Johnny körde `/status`, `/skills` och `/mcp`: *"allt är grönt"*.
  - Arbetet med byggsystemet görs från och med nu i `claude-bygg`. En session är byggsessionen bara om `CLAUDE_CONFIG_DIR` är `~/.claude-bygg`.
  - Detaljerna står i `kunskap/research/2026-10-15_mac-avgransning.md`, *Sett inifrån byggsessionen*.
- **Inga spärrar** (Johnny 21:16–21:20, `BESLUT.md`). Inga `permissions.deny` finns kvar någonstans, och Chrome-verktygen är tillbaka. Allt görs från en session i repots rot i auto mode, också sajtarbetet. Publicering efter Johnnys godkännande och hemligheter utanför repot står kvar som instruktioner i `CLAUDE.md`.
- **Förberedelserna är klara** (kl. 20.30–20.45, med Johnnys fria mandat, `BESLUT.md`):
  - **Mallen `mallar/sajt/`** kopieras till varje sajt. Den innehåller `CLAUDE.md` (39 rader) och `.gitignore`.
  - **`mallar/karnfragor.md`, `mallar/brief.md` och `mallar/fakta.md`** är tagna ur `guide/2-1` och `2-7`.
- **De största krockarna:**
  - Auto memory laddar webb-pros gamla ägarbeslut i varje session.
  - `superpowers` har en hook som styr arbetssättet.
  - MCP-verktyg kan publicera.
  - `~/.claude/CLAUDE.md` säger åt Claude att använda `cf`.
  - `~/.claude/CLAUDE.md` laddas också med en egen `CLAUDE_CONFIG_DIR`, eftersom hemkatalogen är en överordnad katalog till repot.
- **Det guiden såg på Windows finns inte på Macen:** 292 skills, `nortropic-stack` och de gamla delagenterna.

## Nästa steg – på Macen

1. **Den första övningssajten är vald och skapad** i `sites/` ur mallen (Johnny 21:10, `BESLUT.md`). Firmans namn står bara där, i sajtens `progress.md`, som också håller läget.
2. **Steg 1 och 2 är dömda** (Johnny omkring 22.23). Steg 1 är godkänt. Johnny valde Lugn och luftig, godkände Varm och underkände Djärv. Domarna står i sajtens `domar.jsonl`. Steg 3 är godkänt, och slutgranskningen är godkänd omkring 23.51 ("den bästa sajten i måttstocken"). Versionen är fryst med taggen `steg4-underlag`.
3. **Steg 4, granskaren, är klart** (Johnny omkring 00.14). Granskaren hade rätt på 12 av Johnnys 17 godkända (71 %) och 12 av 14 underkända (86 %). Av de 22 domar den var säker på var 21 rätt, och sex av sju fel var märkta osäkra. Resultatet, avvikelserna och fem förslag till checklistan står i `mattstock/granskare/matning-2026-10-15.md`. Över sajten dömde granskaren godkänd, som Johnny. Den hittade tio fynd och en av Johnnys fyra anteckningar helt. Jämförelsen står i sajtens `granskning-steg4.md`.
Johnny tog in fem av förslagen till checklistan och lade till ett sjätte. `mallar/granskning.md` är låst på nytt, och uppdraget står i `mattstock/granskare/uppdrag.md`. Hans fynd och anteckningar är åtgärdade i biblioteket och sajten. Kontrollskriptet har fått kontroll 2b: länkar till kartor, recensioner och sociala medier öppnas i ny flik på datorn.
   Beslutat omkring 00.32: branschen avgör om *Det praktiska* eller *Tjänster* kommer efter första vyn (`guide/2-4-skelett.md`; biblioteket: `forst` i innehållet). Övningssajten behåller *Var och när* först.
   Beslutat omkring 00.36: målet i Lighthouse är 100 i alla fyra kategorier (kontroll 9, median av tre efter en uppvärmning). Övningssajten får 100 i alla 14 mätningar.
   Researchen om lokal SEO, AEO och GEO är klar (`kunskap/research/2026-10-16_seo-aeo-geo.md`). Johnny sa ja till alla 16 förslag omkring 00.58, och de är införda:
   - omdömen enligt Googles policy och 12 c §
   - robots.txt-regeln och kontroll 7c
   - `sameAs`
   - Cloudflares AI-blockering, Crawler Hints och Bing Webmaster Tools i steg 5
   - AEO-mätningen på N3
   - Bing Places och Apple i Kundens lyft
   - `llms.txt` struken

   Kontrollregistret har fått Lighthouse 100, 2b och 7c. Guiden har 85 N1-punkter.
4. **Steg 6 är godkänt** (Johnny omkring 06.15). Därefter infördes lagkraven på alla sajter (`BESLUT.md` 2026-10-16; `kunskap/research/2026-10-16_lagkrav-pa-sajten.md`):
   - *Integritet och kakor* och *Tillgänglighet*
   - företagsuppgifterna enligt 8 § e-handelslagen i sidfoten (kontroll 6b)
   - ingen kakbanner utan kakor
   - samtycke för bilder av personer

   Därefter beslutades:
   - Företagsuppgifter som praxis: inget om lagen för yrket, och organisationsnummer bara för bolag.
   - Tillgänglighetsredogörelse bara när lagen kräver det.
   - Cloudflare Pro på varje publicerad sajt, och månadsrapporten utan Google Analytics.
   - Kakor och samtycke vid behov. Biblioteket har ett eget samtyckesverktyg på cirka 1,7 kB, med kontroll 6c som stoppar, och övningssajten övar det. Verktyget har Consent Mode v2, en logg över samtycken (Worker och D1, mallen i `bibliotek/worker/`, prövad lokalt med `wrangler dev`) och en kaklista.

   Väntar på Johnny: biträdesavtal i steg 5 och Google-kartan. `security.txt` kom med i kvalitetsgranskningen.
5. **Kvalitetsgranskningen är genomförd** (Johnny: *"Ja på allt"* omkring 09.37, `BESLUT.md`).
   - Sex granskare med ren kontext hittade 136 fynd. Alla rättelser är införda i biblioteket och övningssajten: 85 åtgärder, 10 kundsvar och 10 beslut.
   - En ny granskare prövade om de 22 höga fynden, och de kvarvarande är rättade.
   - Nytt i biblioteket:
     - samtyckesrutan enligt EDPB och PTS, med giltighet, bekräftelse och luft nedtill
     - `data-yta` för avstånden
     - typsnittsskalan och radlängden som tokens
     - reservfont med samma mått som typsnittet
     - AVIF och sizes efter layouten
     - faktakort i sidtoppen
     - raden "I dag" i förstavyn
     - `Uppmaning` för fristående länkar
     - en egen ryggradsikon
     - CSP med hashar (`komponenter/inlineskript.mjs`)
   - I sajten:
     - en sida per mottagning
     - integritetssidan enligt art. 13
     - `_headers`, `_redirects`, `security.txt` och 404 i Workern
     - en Worker som validerar
     - kartor i gråskala i 1440 × 880
     - typkontroll med `astro check`
   - Kontrollskriptet har sju nya underkontroller: 1b, 2c, 3b, 5b, 8b, 10b och 10c. Guiden (2-4, 2-8) och bilaga C är uppdaterade, och N1 har 92 punkter.
   - Johnny frågade om USA måste stå i samtyckesrutan. Svaret var nej, och han godkände den nya texten omkring 10.24 (`BESLUT.md`).
   - Kontroll 5b stoppar publicering tills patienten på behandlingsfotot har samtyckt, och det är avsiktligt.
   - Omkring 11.38 valde Johnny ordet "cookies" i stället för "kakor" på företagssajter. I stickprovet skriver myndigheter "kakor" och företag "cookies" (`BESLUT.md`).
   - Skatten på företagshälsa är skild från friskvårdsbidraget efter Johnnys fråga: friskvårdsbidraget gäller akupunktur men inte kiropraktik. Texten väntar på hans dom.
   - Omkring 11.50 strök Johnny referensregeln och kodregeln: *"vi kan kopiera helt fritt och göra som vi vill"* (`BESLUT.md`). Claude följer ändå upphovsrätten och marknadsföringslagen och kopierar inte andras texter, bilder, kännetecken eller kod utan licens.
   - **Långsiktigt mål (Johnny 08.00):** kundportalen på Nortropics sajt, där kunden loggar in och ser sin statistik. N3 i `guide/2-9-drift-och-forvaltning.md`, och den byggs när den första betalande kunden har månadsrapporter. **Nästa:** genomgången efter sajten (`guide/5-byggplan.md`). Nästa mätning av granskaren görs på nya sajter och på systemets egna utkast.

## Kompetensen in i alla lager (från 12.11)

Johnny beslutade omkring 12.11 att kompetensen ur inventeringen ska in i alla lager (`BESLUT.md`, *Kompetensen in i alla lager*).
- **G1–G13 är införda**, och stilkiten Varm och Djärv är rättade (G8 och G9). Provsidorna väntar på Johnnys dom.
- **MCP-servrarna Inspo och Chrome DevTools** är tillagda i byggsessionen. Chrome DevTools körs utan statistik och CrUX-anrop. De som kräver konto väntar på Johnny.
- **Elva skills i `.claude/skills/`:** strategi, omfattning, struktur, skelett, yta, rörelse, innehåll, kvalitet, drift, granskare och lärande (bilaga B).
- **Inventeringen** (läget vid andra varvet): 171 poster med förslag till placering och källkort. Läget nu står i *Nästa session*, under *Tredje varvet är klart*.
- **Luckorna** är sammanställda i `kunskap/research/2026-10-16_luckor-per-lager.md`: 93 luckor, varav 24 med vikt hög (101 efter tredje varvet; se *Nästa session*). De fem viktigaste: inga riktiga besökare prövar sajten, inga riktlinjer för kundens egna bilder, marknadsrätten för påståenden i vård är inte läst, bara Chromium prövas och ingen prövar med riktiga hjälpmedel.
- **Premiumpasset på övningssajten:** åtta revisioner är sammanslagna till `sites/<sajt>/premiumpass.md` med 57 fynd: A 19 (rätta nu), B 28 (Johnny beslutar) och C 10 (senare). **Grupp A är genomförd** i biblioteket och sajten (commits `e8dd132` och framåt):
  - sidhuvudet på en rad i 1024 px; ingen vågrät scroll vid 200 % textstorlek (förut 7 av 10 sidor)
  - hover bara med mus, färg vid hover och tryck och en kort tryckkvittens; menyn tar fokus och bakgrunden tonas
  - rutan *Sök vård direkt* är borttagen efter Johnnys beslut omkring 14.10: *"det är ju trots allt ett företag som säljer sina tjänster, inte ett sjukhus"*
  - raden *I dag* visar nästa mottagning efter stängning; kartan laddas direkt på ortssidorna (LCP)
  - faktakortet syns också i mobilen (ett kort på kontaktsidan prövades och ströks, eftersom det upprepade *Var och när*)
  - Om-sidan: h1 börjar med menyns namn (G4); processens rubriker berättar; aktiv form; samma ord för samma sak; länkar till mottagningarna
  - stjärnan i textfärg (G3); ny ryggradsikon, prövad blint; kvittot i samtyckesrutan säger vad man valde
  - måttlig rörelse animerar inte första skärmen (B3); mjuk rullning bara utan reducerad rörelse; knapplisten är ett landmärke
  - Kundens lyft: fotobeställning i Googles fem kategorier, länkbytet och katalogerna
- **MCP på övningssajten först** (Johnny omkring 17.00 och 17.05: *"vi ska ha in ALLA mcps nu"*, `BESLUT.md`). Spärren mot claude.ai-connectorer är borttagen, och alla servrar i inventeringen är tillagda i byggsessionen (lokal scope för repot). De syns i `/mcp` först efter omstart av `claude-bygg` från repots rot.
  - **Anslutna:** Inspo, Chrome DevTools, Playwright, MDN, Astro Docs, Cloudflare Docs, Leonardo, Motion, shadcn, seo-monster, mcp-gsc och Mobbin (claude.ai-connector).
  - **Inloggade via `/mcp`:** 21st, Figma och Cloudflare. Kvar: Socket. DataForSEO väntar tills en sajt behöver datan (19.50).
  - **Johnny lägger in nyckeln själv i ett eget terminalfönster från repots rot** (aldrig i chatten): Grounding Lite (huvudet `X-Goog-Api-Key`; den godtar inte Claude Codes OAuth; Developer Knowledge är klar 2026-10-16). nanobanana (`GEMINI_API_KEY`) och BrowserStack väntar (20.08).
  - **Nästa session:** kör verktygslåset (`python3 -I skript/mcp-verktygslas.py`) efter inloggningarna, och sedan varje servers prov mot övningssajten enligt MCP-gruppens rapport (sparad lokalt i sajtens `andra-varvet/mcp-jamforelse.md`, avsnitten *Per MCP* och *Nya kandidater*). Resultatet läggs fram för Johnny före nästa övningssajt.
  - **Avgränsningen med `~/.claude-bygg` står kvar** (Johnny omkring 17.18). Det som ska in läggs till där; något ur den vanliga `~/.claude` flyttas hit på begäran.
- **Andra varvet** (från 14.25, Johnny: alla skills genomgångna, jämförda och reflekterade; Apples HIG; byggguider; MCP; bevakning): tolv grupper läste originalen i sin helhet, jämförde dem regel för regel och körde deras granskningar mot övningssajten. Sammanställningen står i `kunskap/research/2026-10-16_andra-varvet.md`.
  - Alla elva skills är uppdaterade, med fel rättade och det som saknades infört; Apples HIG finns i fem skills (`apple-hig.md`).
  - Inventeringen har 201 poster: 30 nya och 27 ändrade placeringar (artefakten version 4).
  - Rättat i biblioteket samma dag: måttlig rörelse kördes inte i bygget; vågrät scroll vid 200 % text (mätt med 150 % tidigare); en understruken lucka före pilen; Djärvs knapp i tryck; hopplänken, långa namn och e-postadresser; I dag-märket efter stängning.
  - Första baslinjen: skillen drift gav 100 % mot 68,5 % utan.
- **Startsäkringen kördes på riktigt** omkring 14.05: node@24 och poppler i Homebrew, lucide 1.58, wrangler 4.151.1 och Playwright 1.64.1 i måttstockens verktyg. TypeScript 7 fällde sajtens bygge (`astro check` stöder det inte), så skriptet håller nu TypeScript på 6 och skriver skälet vid varje körning. Skriptet rapporterade också Homebrew som misslyckat fast uppgraderingen gick igenom; det läser nu av resultatet efteråt.
- **Övningsserien är beslutad** (Johnny omkring 14.42): klinik (klar), hantverk, restaurang, butik, konsult, skönhet och tjänst eller event, med tillvalen i `guide/5-byggplan.md`. Nästa övningssajt är hantverk; måttstockens enda underkända svenska hantverkare (s04, en snickare i tre orter) passar för serviceområdet och offertförfrågan. Den startas när jämförelsen av skillsen är införd.
- **Nästa:** se *Nästa session – börja här* överst.

## Spår för senare

- **Alltid uppdaterad och optimerad sajt** (Johnny 2026-10-16 omkring 13.00): *"hur säkerställ vi en alltid uppdaterad, optimerad hemsida? har vi veckovisa, månadsvisa kontroller så saker inte går sönder eller behov av uppdateringar, optimering"*.
  - Schemat finns i `guide/2-9-drift-och-forvaltning.md`, *Schemalagda kontroller*: dagligen, veckovis, månadsvis, kvartalsvis och årligen. Uppdateringarna sköts av Renovate med sju dagars karenstid. Detaljerna står i skillen `drift`. Allt är N3 och körs inte än.
  - Luckor att ta när spåret blir aktuellt:
    1. **Optimering:** "månadens förbättring" ur siffrorna i månadsrapporten.
    2. **Karenstid mot "alltid senaste":** sju dagar för kundsajter och direkt för byråns verktyg. Johnny avgör.
    3. **Övning före första kunden:** publicering och drift på byråns egen sajt eller provsajten.
- **Företagssakerna** (Johnny 2026-10-16: *"det är bra företagssakerna sist"*): bokföring och moms, kundavtal och offert, biträdesavtal, incidentrutin och försäkring. Luckorna står i arbetarnas underlag och sammanställs med inventeringen.

## Väntar på Johnny

- **Andra varvets förslag** (`kunskap/research/2026-10-16_andra-varvet.md`): avgjorda 17.00 är e-posten (förklarad, guiden rättad), senaste version med verktygslås, Mobbin och videon. Kvar: bevakningsloopen B1–B8, K5 och K6 i granskarens checklista, smak i kiten och menyn i mobilen. Videorna av sparsam och måttlig rörelse väntar på Johnnys dom.
- **Premiumpasset:** döm bilderna före och efter, och grupp B i sajtens `premiumpass.md`. Där står bland annat porträttet i Om-sidans topp, menyn i mobilen, en översiktssida för Behandlingar, accentsteg, typskala och rörelsetokens per kit, JS-budgeten, CSP med React och Motion, sidbyten med `@view-transition` och en säkerhetskopia av `sites/`, eftersom sajtens repo bara finns på Macen.
- **Frågelistan efter tredje varvet** (`kunskap/research/2026-10-16_tredje-varvet-till-johnny.md`): 57 punkter, 50 avgjord. Placeringarna i inventeringen är beslut sedan 17.40.
- **Luckorna** i `kunskap/research/2026-10-16_luckor-per-lager.md`: vilka som ska tas först.
- **Genomgången efter övningssajten** (sajtens `genomgang.md`): G1–G13 är godkända och införda (Johnny 12.07). Provsidorna för Varm och Djärv (G8, G9) väntar på Johnnys dom.
- **Raden "I dag" i förstavyn** (C4) ska dömas: om första skärmen blir för trång.
- **Texten om skatt och friskvårdsbidrag** på övningssajtens företagssida ska dömas.
- **Omdirigeringarna:** 11 gamla adresser utan motsvarighet och WordPress-adresser får 404 i stället för att skickas till startsidan (sajtens `public/_redirects`, märkt förslag).
- **Kartbilderna** ritas nu ur OpenStreetMap-data via Overpass i stället för ur rutor, eftersom OSM:s policy för rutor inte tillåter förbyggda bilder. För riktiga kunder behövs ett beslut om egen eller betald Overpass-server (`skript/karta.mjs`).
- **Läsa sajtens `CLAUDE.md`** i `mallar/sajt/CLAUDE.md`. Claude skrev den med mandatet, och Johnny godkänner ändringar i `CLAUDE.md` (bilaga E 2.3).
- **Bilaga E:** avsnitt 1 och 2 är avgjorda. 1.8 (integritetspolicy) och 1.9 (betalning) väntar till den första riktiga kunden, och 2.4, 2.7 och 2.8 till förvaltningen. Avsnitt 3 gäller senare nivåer. Avsnitt 4 verifieras under bygget.
- **Repot är publikt** (Johnny: "det ändrar vi sen"). Måttstockens domar över namngivna firmor pushades med Johnnys godkännande.

## Verktyg i repot

- `mattstock/verktyg/` innehåller fångsten med Playwright (helsidesbilder i mobil och dator), bedömningssidan och analysen. De används för nya omgångar, till exempel för att kalibrera på systemets egna utkast.
- **Push från Macen:** git har `osxkeychain` som inloggning och kan hänga på en behörighetsruta i nyckelringen. `gh` är inloggat som Jonkebronk och fungerar. Pusha med `git -c credential.helper= -c 'credential.helper=!gh auth git-credential' push origin main`, eller låt Johnny köra `gh auth setup-git` en gång, vilket ändrar hans globala git-konfiguration.
- `mattstock/verktyg/matning.py` mäter granskaren mot Johnnys domar (TPR och TNR, också för de säkra domarna) och visar Claudes förväntan som jämförelse. Bildnamnen från `fanga.js`: `-m.jpg` är hela mobilsidan, `-d.jpg` datorns första skärm och `-hel.jpg` hela datorsidan. Chromium klipper skärmbilder över 16 384 px, så fånga höga mobilsidor i dubbel upplösning.
- **Prov och ändringar av byggsessionens egen konfiguration:** i auto mode stoppade klassaren proven som *Auto-Mode Bypass*, läsningen av `.claude.json` som *Credential Exploration* och en ändring av `~/.claude-bygg/settings.json` som *Self-Modification*. Ändringen gick igenom när Johnny hade sagt till uttryckligen. Prov kan köras från en session i den vanliga konfigurationen.
- **Chrome-verktygen styr webbläsaren på Johnnys Windows-dator, inte på Macen.** Lokala sidor visas på Macen med `open http://127.0.0.1:<port>/`.
- **Astro 7 kör `astro dev` och `astro preview` som bakgrundsprocesser.** Stoppa dem med `npx astro dev stop` eller `npx astro preview stop` i projektets katalog.
- **Startsäkringen** `skript/startsakring.sh` körs först i varje session (`CLAUDE.md`). Den uppdaterar allt till senaste version och skriver vad som ändrades.
- `konsolidering/bygg_n1.py` genererar N1-sammanfattningen. Skriptet kräver Python 3.10 eller senare. På Macen är `python3` version 3.9, så kör det med `/opt/homebrew/bin/python3.12`.
- Bedömningssidan med Johnnys domar finns som privat artefakt på claude.ai: <https://claude.ai/artifact/16Cz4NeibCYDDsKGD3sdsq>. Domarna finns också i `mattstock/domar.jsonl`.
