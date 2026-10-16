# Läget

Uppdaterad 2026-10-17 kl. 00.25 på Johnnys Mac, i den första byggsessionen (`claude-bygg`).

## Stående uppdrag (Johnny 2026-10-16 kl. 23.45) – gäller före allt nedan

Ordagrant i `BESLUT.md`, *Stående uppdrag fram till nästa övningssajt*. Claude gör punkterna 1–4 i ordning utan att fråga för varje steg. Avgöranden i Johnnys ställe skrivs i `BESLUT.md`, märkta *Claudes rekommendation, delegerat av Johnny 2026-10-16*. Byggrepot committas och pushas per steg efter sökning efter hemligheter; sajten committas bara lokalt. **Nästa övningssajt påbörjas inte**: Johnny gör först en egen premiumkontroll.

1. **Resten av "Fixa alla"** (Mobbin får vara):
   - Videorna, gjort 23.42: nya videor på `sites/torsokliniken/video/index.html`, de gamla i `video/2026-10-15/`, skriptet i `video/spela-in.cjs`, sajtens `f4cb69a`.
   - Verktygslåset läser promptar, resurser och flaggor (`b4bafd9`): alla 11 nåbara servrar är oförändrade; seo-monster har 13 promptar, och mcp-gsc och shadcn har flaggan resources.
   - Startsäkringen bevakar guidens Google-sidor (`skript/google-sidor.py`, `b4bafd9`): 53 sidor, alla finns.
   - Statusskriptet på web-features (`skript/baseline.mjs`, `8556f04`): 40 av 40 rader stämmer.
   - **Punkt 1 är klar** (2026-10-16, 23.52).
2. **Skillsen – klar 23.54** (`BESLUT.md`, *Skillsen, resten av översynen*): punkterna 12–16 var redan gjorda; hover-spärren följer biblioteket i fyra skills; lucka 8 utan tillägg; klickytor och strukturerad data oförändrade.
3. **Övningssajten:**
   - andra varvets sajtfynd som inte är rättade
   - kontrollskriptets N2-fynd
   - grupp B i `premiumpass.md`
   - de öppna punkterna i frågelistan
   - raden I dag
   - texten om skatt och friskvårdsbidrag
   - 404 och `_redirects`
   - provsidorna för Varm och Djärv

   Rätta i biblioteket när felet är generellt och i sajten när det är sajtens.

   **Läget 00.25:**
   - **Frågelistan är avgjord** (`BESLUT.md`, *Frågelistan efter tredje varvet avgörs*).
     - Guidetexten är införd (`badbc22`).
     - Mikroproven: 54 behållen, 43 c och 56 strukna (`kunskap/research/2026-10-17_mikroprov-fragelistan.md`).
   - **Biblioteket och sajten:**
     - Andra varvets och kontrollskriptets fynd inom beslut och grupp B är rättade (`a77c0e0`, sajtens `fd4b4f8`; `BESLUT.md`, *Övningssajten – premiumpassets grupp B …*).
     - `'strict-dynamic'` är provat och inte infört.
   - **Pågår, två delagenter:**
     - **Kontrollskriptet** (frågelistan 1, 6, 7, 11, 15 b, 16, 25, 26, 30, 44, 45, 46, 49 och 57 i `skript/kontroll.mjs`, `guide/2-8`, bilaga C och `kvalitet/kontroller.md`). Ej committat. Efteråt: rätta 7e (mjukt bindestreck i `kontroll.mjs`) och skriv in CSP-provet i 2-8.
     - **Skills, kit och inventering** (frågelistan 7, 8, 15 c, 18 a, 19, 22, 44, 51, 55 och 57 i `.claude/skills/`, `bibliotek/stilkit/` och `inventering/`). Ej committat. Efteråt:
       - kopiera kiten till sajtens `stilkit/`
       - bygg inventeringen
       - publicera artefakten https://claude.ai/artifact/ASZcbmg8qc9ThMusGjRZpe
   - **Kvar i punkt 3:** granska `/prov/varm/` och `/prov/djarv/` efter kitändringarna, kör kontrollskriptet och rätta det som återstår.
4. **Avslut:** kontrollskriptet helt, tillägget i sajtens `genomgang.md`, `progress.md` och `LAGE.md`.

## Nästa session – börja här (skrivet 2026-10-16 kl. 19.39)

**Målet, i Johnnys ord omkring 17.20:** *"nu ska vi få alla mcps att fungera … Så ska vi göra klart den [övningssajten] innan vi startar nästa."* Gör stegen i ordning. Ett steg är klart först när resultatet är prövat och Johnny har sett det.

**0. Starta och kontrollera.** Kör startsäkringen (`CLAUDE.md`, steg 0) och kontrollera att övningssajten bygger och visas: `npm run build` i `sites/<sajt>/` och förhandsvisningen på `http://127.0.0.1:4322/` (`npx astro preview --port 4322 --host 127.0.0.1` i sajtens katalog om den inte körs). Läs `git log --oneline -60`, så att du ser vad som gjordes 2026-10-16.

**1. Få alla MCP:er att fungera** (`BESLUT.md` 2026-10-16, *Alla MCP:er in nu …* och *Senaste version med verktygslås …*).
- Kontrollera med `/mcp` och `claude mcp list` att servrarna syns. Alla ligger i lokal scope för repot i `~/.claude-bygg`; avgränsningen står kvar (Johnny 17.18).
- Johnny har loggat in via `/mcp` på 21st, Figma och Cloudflare (2026-10-16 kväll). DataForSEO väntar tills en sajt behöver datan (`BESLUT.md` 2026-10-16, 19.50). Socket väntar också (20.11). Den svarade på verktygslistan utan konto men gav HTTP 400 i verktygslåset 2026-10-16 kväll, den kräver OAuth för anrop, och ärendet om `401 invalid_token` i Claude Code är öppet (SocketDev/socket-mcp #185).
- Grounding Lite, Google Developer Knowledge, nanobanana och BrowserStack lägger Johnny in med nyckel i ett eget terminalfönster; nycklar klistras aldrig in i chatten. Inloggning via `/mcp` fungerar inte för de två Google-servrarna (Johnny prövade 2026-10-16 kväll): Google stöder inte DCR, så de behöver huvudet `X-Goog-Api-Key` (`kunskap/kallkort/google-developer-knowledge-mcp.md`). **Developer Knowledge är klar** (2026-10-16, omkring 20.05): nyckeln är inlagd och servern svarar. Grounding Lite, nanobanana och BrowserStack väntar (`BESLUT.md` 2026-10-16, 20.08 och 20.09). Kommandona, körda från repots rot med nyckeln i stället för platshållaren:
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
- **Domarna över MCP-servrarna är beslutade** (`BESLUT.md` 2026-10-16, 21.37). Byggsessionens konfiguration är ändrad efter dem:
  - MDN och Cloudflare Docs är borttagna.
  - Playwright kör WebKit med iPhone 15, `--caps=devtools,testing,config`, utdata i `~/.claude-bygg/playwright-utdata` och `--no-webmcp`. WebKit 2368 är installerad, och startsäkringen installerar den.
  - shadcn startas i `~/.claude-bygg/shadcn/` med `@tailark-oss` och `@magicui`.
  - `inventering/mcp-servrar.json` följer konfigurationen.
  
  **Väntar på Johnny:**
  - (Gjort: `claude-bygg` är omstartad 2026-10-16 kväll. Playwright-MCP:n kör WebKit med iPhone 15, bekräftat med `browser_get_config`; MDN och Cloudflare Docs är borta.)
  - (Avgjort 23.34: Mobbin-connectorn får vara kvar.)
  - (Avgjort 21.42: låset godtaget för Playwright, Motion släppt, Mobbins bilder raderade.)
  - (Avgjort 21.43: reglerna för MCP-servrar och verktyg står i `guide/3-3` med hänvisning i `CLAUDE.md`; skrivverktyg kräver Johnnys ja per gång, utan `permissions.deny`.)
  - **Gjort 22.16:**
    - **Inventeringen:** domarna och seo-monsters omfång är införda, och artefakten är version 9.
    - **Skillsen steg 1:** faktarättelser i 20 filer.
    - **Skillsen steg 2:** motsägelserna A–H (`BESLUT.md`, *Motsägelserna i skillsen* och *Vanliga frågor utan name*). Mikroprovet för A gav 5 av 5 fel före och 0 av 5 efter; B och C syntes inte i kontrollen (`kunskap/research/2026-10-16_mikroprov-motsagelser.md`).
    - **INP** är ommätt. Fyndet om 259 ms vid första frågan håller inte, men första menyöppningen med samtyckesrutan öppen är ett nytt fynd (övningssajtens `mcp-prov.md`).
    - **Cloudflare:** OAuth står kvar för byråns konto (21.49).
  - **Skillsen steg 3 är klart** (2026-10-16, 22.40–23.31; `BESLUT.md`, *Skillsen steg 3, lucka 1*, *luckorna 3–7* och *ruflo avvisas, och intagsmallen*). Metoden: mikroprov med kontrollen först; visar kontrollen inte felet stryks tillägget. Rapporter: `kunskap/research/2026-10-16_mikroprov-lucka1.md`, `-lucka2.md`, `-lucka3-7.md` och `-intag.md`.
    - **Behållet:** rörelsens princip 13 (*Seg mäts innan något ändras*); faktafilen `kvalitet/webblasarverktyg.md` (Chrome DevTools och Playwright, med fällorna: `emulate` ersätter allt, `click` är ett musklick i båda MCP:erna, Playwright-MCP:n är en iPhone också i 1280 px och skriver relativa filnamn i repots rot); skelett och struktur pekar på kontrollskriptet före kontrollistan; `larande/bevakning.md` kräver att en MCP-server läses hel innan provet; `kvalitet/sakerhet.md` har fältet `kind` från Astro 7.1; guiden 2-8 och bilaga A beskriver Chrome DevTools roll enligt domen 21.37.
    - **Struket** (kontrollen hade inte felet): pekare i granskare, innehåll och yta (lucka 1), Playwright-pekare (lucka 2), seo-monster, Developer Knowledge, Astro Docs och video (luckorna 3–6) och rörelsens rad om kontrollskriptet.
    - **Sidofynd rättade i biblioteket och övningssajten** (`ba6f1bd`, sajtens `15390f3`): fokusringen följer elementets radie; tryckkvittens på menyknappen, Stäng, menylänkarna och ring-ikonen; *välj* i stället för *klicka* och inget *nedan* som enda ledtråd. Kontrollskriptet (`SNABB=1`) efteråt: bara 5b stoppar, 8b ok.
    - **ruflo** är utvärderat och avvisat (Johnny 23.31; `kunskap/research/2026-10-16_ruflo.md`; inventeringen, artefakten version 11).
  - **Gjort 23.34–23.52 (`BESLUT.md`, *Det som återstod rättas* och *Stående uppdrag*):** översynens punkter 11, 17 och 18 (se *Stående uppdrag*, punkt 1); Workflow-verktyget på N2 och `/batch` på N4 i bilaga A; Ring-länken heter "076-216 46 27 – ring" på datorn och "Ring" när bara ikonen syns, och kartknappen "Visa kartan från Google – Malmö". Kvar: menyns millisekunder i `Sidhuvud.astro` blir tokens först när kitets rörelsetokens är beslutade (P33).
  - **Videorna:** inspelade på nytt 23.40, med måttlig som eget bygge, eftersom förhandsvisningen bara visar sparsam (`sites/torsokliniken/video/spela-in.cjs`).
- **Översynen av verktyg och skills mot sin fulla potential är gjord** (2026-10-16 kväll, Johnny: *"det här behöver du se över på samtliga skills att de används mot sin fulla potential"*, omfattning *båda*). Den står i `kunskap/research/2026-10-16_verktyg-och-skills-full-potential.md` och ändrar flera av MCP-provets domar och två av Claudes påståenden. **Väntar på Johnny:** 21 punkter i avsnittet *Väntar på Johnny*, och rättelserna i källkorten, som är fakta och inte regler. Källkorten och guidens tre rader om seo-monsters omfång är rättade (Johnny: *"rätta"*). Skills, konfiguration och inventering är inte ändrade. Seo-monster-raden i `drift/verktyg.md` och i `inventering.json` rättas tillsammans med skillsen. `.playwright-mcp/` står i `.gitignore`.
- **MCP-proven är körda** (2026-10-16 kväll, Johnny: *"Prova varje mot övningsajten"*). Resultatet per server och domarna, som är förslag, står i sajtens `mcp-prov.md`. Kort: behåll Chrome DevTools, Playwright (med WebKit, iPhone och utdata utanför repot), Astro Docs, Developer Knowledge, seo-monster (N3), Cloudflare (med läs-token) och Figma. Begränsa Inspo och 21st. Släpp MDN, Cloudflare Docs, Mobbin, Leonardo-MCP:n, shadcn-MCP:n och Motion. **Väntar på Johnny:** domarna och åtta punkter i slutet av `mcp-prov.md`, bland dem bilderna från Mobbin i sessionens `tool-results/`. Inställningarna på nortropic.se är parkerade: domänen byggs senare (`BESLUT.md` 2026-10-16, 21.01).

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

**Det som inte är gjort, så att ingen tror det:** inget är prövat på riktig iPhone, Android eller med skärmläsare (BrowserStack väntar på nyckeln; fråga 57). MCP-proven är körda men domarna väntar på Johnny (`mcp-prov.md`). Ingen skill är kortad: en andra uppgift per skill behövs först (fråga 51). Frågelistans 56 öppna punkter väntar på Johnny.

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
  - **Inloggade via `/mcp`:** 21st, Figma och Cloudflare. DataForSEO och Socket väntar (19.50 och 20.11).
  - **Johnny lägger in nyckeln själv i ett eget terminalfönster från repots rot** (aldrig i chatten): Developer Knowledge är klar 2026-10-16. Grounding Lite väntar på juristen och en kund som behöver den (20.09); nanobanana (`GEMINI_API_KEY`) och BrowserStack väntar (20.08).
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
- **`claude-in-chrome` styr webbläsaren på Johnnys Windows-dator, inte på Macen.** Lokala sidor visas på Macen med `open http://127.0.0.1:<port>/`. Chrome DevTools MCP och Playwright MCP kör däremot headless på Macen och når förhandsvisningen (`.claude/skills/kvalitet/webblasarverktyg.md`).
- **Astro 7 kör `astro dev` och `astro preview` som bakgrundsprocesser.** Stoppa dem med `npx astro dev stop` eller `npx astro preview stop` i projektets katalog.
- **Startsäkringen** `skript/startsakring.sh` körs först i varje session (`CLAUDE.md`). Den uppdaterar allt till senaste version och skriver vad som ändrades.
- `konsolidering/bygg_n1.py` genererar N1-sammanfattningen. Skriptet kräver Python 3.10 eller senare. På Macen är `python3` version 3.9, så kör det med `/opt/homebrew/bin/python3.12`.
- Bedömningssidan med Johnnys domar finns som privat artefakt på claude.ai: <https://claude.ai/artifact/16Cz4NeibCYDDsKGD3sdsq>. Domarna finns också i `mattstock/domar.jsonl`.
