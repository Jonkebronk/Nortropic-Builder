# Läget

Uppdaterad 2026-10-16 kl. 13.56 på Johnnys Mac, i den första byggsessionen (`claude-bygg`).

## Kort

- **Guiden v1.0 är genomläst med Johnny** 2026-10-15 i sin helhet: README, kundens väg, byggplanen, alla nio lagren, flödet 3.1–3.5, företaget och bilagorna. Varje rättelse står ordagrant i `BESLUT.md` med datumet 2026-10-15.
- **Måttstocken är godkänd:** `mattstock/mattstock.md`. Den har tre frågor, mobilen först: förstår och når kunden företaget på mobilens första skärm, är det äkta, håller utförandet. Den bygger på Johnnys domar över 39 sajter (`mattstock/domar.jsonl`).
- **N1 har 91 regler och tio automatiska kontroller.** Johnny godtog att taket på cirka 60 överskreds. Sammanfattningen genereras till `guide/n1-forsta-sajten.md` med `python konsolidering/bygg_n1.py`.

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
- **Inventeringen:** varje post av 171 har ett *förslag* till placering med motivering och en länk till sitt källkort (skill 66, senare 27, släpp 22, bibliotek 17, MCP 15, kontroll 14, verktyg 10). Artefakten är publicerad. `beslut` står *ej fattat* utom Resend och Refero. Källkorten ligger i `kunskap/kallkort/` (172 st), och startsäkringen bevakar 128 repon.
- **Luckorna** är sammanställda i `kunskap/research/2026-10-16_luckor-per-lager.md`: 93 luckor, varav 24 med vikt hög. De fem viktigaste: inga riktiga besökare prövar sajten, inga riktlinjer för kundens egna bilder, marknadsrätten för påståenden i vård är inte läst, bara Chromium prövas och ingen prövar med riktiga hjälpmedel.
- **Premiumpasset på övningssajten:** åtta revisioner är sammanslagna till `sites/<sajt>/premiumpass.md` med 57 fynd: A 19 (rätta nu), B 28 (Johnny beslutar) och C 10 (senare). **Grupp A är genomförd** i biblioteket och sajten (commits `e8dd132` och framåt):
  - sidhuvudet på en rad i 1024 px; ingen vågrät scroll vid 200 % textstorlek (förut 7 av 10 sidor)
  - hover bara med mus, färg vid hover och tryck och en kort tryckkvittens; menyn tar fokus och bakgrunden tonas
  - *Sök vård direkt* enligt 1177 (sex tecken, akutmottagningen och 1177), flyttad före processen och avgränsad
  - raden *I dag* visar nästa mottagning efter stängning; kartan laddas direkt på ortssidorna (LCP)
  - faktakortet syns också i mobilen; kontaktsidan har ett kort med telefon och e-post
  - Om-sidan: h1 börjar med menyns namn (G4); processens rubriker berättar; aktiv form; samma ord för samma sak; länkar till mottagningarna
  - stjärnan i textfärg (G3); ny ryggradsikon, prövad blint; kvittot i samtyckesrutan säger vad man valde
  - måttlig rörelse animerar inte första skärmen (B3); mjuk rullning bara utan reducerad rörelse; knapplisten är ett landmärke
  - Kundens lyft: fotobeställning i Googles fem kategorier, länkbytet och katalogerna
- **Nästa:**
  1. Johnny dömer premiumpasset på bilderna före och efter.
  2. Johnny tar ställning till grupp B i `premiumpass.md` och till placeringarna i inventeringen ("ja på alla placeringar" gör dem till beslut).
  3. Luckorna med vikt hög blir förslag till kompetensutveckling, sorterade efter vad nästa sajt behöver.
  4. Startsäkringen körs på riktigt (`skript/startsakring.sh`). Den torra körningen visade bland annat lucide 1.58 och wrangler 4.151.1.
  5. Kontrollskriptet: taggen `wcag22a` i kontroll 8 matchar ingen axe-regel, och nya kontroller är föreslagna (premiumpasset P44).

## Spår för senare

- **Alltid uppdaterad och optimerad sajt** (Johnny 2026-10-16 omkring 13.00): *"hur säkerställ vi en alltid uppdaterad, optimerad hemsida? har vi veckovisa, månadsvisa kontroller så saker inte går sönder eller behov av uppdateringar, optimering"*.
  - Schemat finns i `guide/2-9-drift-och-forvaltning.md`, *Schemalagda kontroller*: dagligen, veckovis, månadsvis, kvartalsvis och årligen. Uppdateringarna sköts av Renovate med sju dagars karenstid. Detaljerna står i skillen `drift`. Allt är N3 och körs inte än.
  - Luckor att ta när spåret blir aktuellt:
    1. **Optimering:** "månadens förbättring" ur siffrorna i månadsrapporten.
    2. **Karenstid mot "alltid senaste":** sju dagar för kundsajter och direkt för byråns verktyg. Johnny avgör.
    3. **Övning före första kunden:** publicering och drift på byråns egen sajt eller provsajten.
- **Företagssakerna** (Johnny 2026-10-16: *"det är bra företagssakerna sist"*): bokföring och moms, kundavtal och offert, biträdesavtal, incidentrutin och försäkring. Luckorna står i arbetarnas underlag och sammanställs med inventeringen.

## Väntar på Johnny

- **Premiumpasset:** döm bilderna före och efter, och grupp B i sajtens `premiumpass.md`. Där står bland annat porträttet i Om-sidans topp, menyn i mobilen, en översiktssida för Behandlingar, accentsteg, typskala och rörelsetokens per kit, JS-budgeten, CSP med React och Motion, sidbyten med `@view-transition` och en säkerhetskopia av `sites/`, eftersom sajtens repo bara finns på Macen.
- **Inventeringens placeringar** (förslag på alla 171 poster) och MCP-servrarna som kräver konto: cloudflare/mcp, seo-monster, Gemini och nanobanana, Motion+, 21st, Mobbin, Figma, Google Business Profile API, Grounding Lite, mcp-gsc och DataForSEO. Logga in i en ny session när listan är godkänd.
- **Luckorna** i `kunskap/research/2026-10-16_luckor-per-lager.md`: vilka som ska tas först.
- **Genomgången efter övningssajten** (`guide/5-byggplan.md`) är skriven i sajtens `genomgang.md`. Förslagen G1–G13 ska godkännas eller strykas. Granskaren mättes om på de fyra egna utkasten, blint, och fick 3 av 4 rätt. Den missade Djärv: den såg att tonen var fel för en klinik men vägde det bara som svagt (förslag G13 till checklistan).
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
