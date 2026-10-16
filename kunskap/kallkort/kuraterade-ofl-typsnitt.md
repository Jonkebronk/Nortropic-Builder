# Kuraterade OFL-typsnitt

**Källa:** Läst 2026-10-16.
- Licensfilen i varje typsnitts eget repo, hämtad via GitHub-API:
  - Inter: [rsms/inter](https://github.com/rsms/inter) `LICENSE.txt`, commit `353b61b9f443` (2024-11-19), release v4.1.
  - Source Serif: [adobe-fonts/source-serif](https://github.com/adobe-fonts/source-serif) `LICENSE.md`, commit `80d3f8894c09` (2026-09-13), release 4.005R (2023-01-20).
  - Fraunces: [undercasetype/Fraunces](https://github.com/undercasetype/Fraunces) `OFL.txt`, commit `7ccdec31c602` (2025-10-21).
  - Familjen Grotesk: [Familjen-Sthlm/Familjen-Grotesk](https://github.com/Familjen-Sthlm/Familjen-Grotesk) `OFL.txt`, commit `de7dfe09f601` (2023-06-17).
  - Atkinson Hyperlegible Next: [googlefonts/atkinson-hyperlegible-next](https://github.com/googlefonts/atkinson-hyperlegible-next) `OFL.txt`, commit `7925f50f649b` (2025-02-21). Repot är arkiverat.
  - IBM Plex: [IBM/plex](https://github.com/IBM/plex) `LICENSE.txt`, commit `39276912b05f` (2026-10-13).
  - Instrument Sans: [Instrument/instrument-sans](https://github.com/Instrument/instrument-sans) `OFL.txt`, commit `7fa22308a3d0` (2023-06-14).
- Google Fonts kopior: [google/fonts](https://github.com/google/fonts) `ofl/<namn>/OFL.txt` och `METADATA.pb`, commit `1d0e46c79332` (2026-10-15). Här ligger också de fullständiga variabla TTF-filerna som jag läste.
- Fontsource: API:t `api.fontsource.org/v1/fonts/<id>` och `/v1/variable/<id>`, sidan [Variable fonts](https://fontsource.org/docs/getting-started/variable), och npm-paketen `@fontsource-variable/*` 5.3.0 (Source Serif 4: 5.3.1), `@fontsource/instrument-sans` 5.3.0 och `@fontsource/ibm-plex-serif` 5.3.0. Paketen laddades ned. Namntabell, teckenkarta och OpenType-funktioner lästes med fontTools 4.60.2.
- [OFL-FAQ](https://openfontlicense.org/ofl-faq/) version 1.1-update7 (november 2023, sidan uppdaterad 12 januari 2026), avsnitt 2.1–2.12 och 5.1–5.10.
- Hyperglot 0.7.3, körd lokalt mot de fullständiga Google Fonts-filerna.
- Upphovsägarnas egna webbfiler: npm `@ibm/plex-sans-variable` 0.2.0 och Adobes `source-serif-4.005_WOFF2.zip` (release 4.005R).
- Bibliotekets bruk: `bibliotek/package.json` och `bibliotek/stilkit/*/kit.css`.

**Licens:** SIL Open Font License 1.1 för alla sju. Licensen kräver tre saker:
- Copyright och licenstext följer med filerna.
- Typsnittet får inte säljas fristående.
- En ändrad version (Modified Version) får inte heta något som innehåller ett reserverat namn (Reserved Font Name, RFN), om inte upphovsägaren gett skriftligt tillstånd.

Att lägga filerna på sajtens egen server är uttryckligen tillåtet, eftersom det räknas som distribution (FAQ 2.1).

Reserverade namn per typsnitt:

| Typsnitt | RFN i upphovsrepot | RFN i Google Fonts `OFL.txt` | Copyright i Fontsource-filen (namn-ID 0) |
|---|---|---|---|
| Inter | ingen | ingen | The Inter Project Authors |
| Source Serif 4 | **”Source”** (Adobe: *”Source is a trademark of Adobe”*) | ingen (*”The Source Serif 4 Project Authors”*) | *”with Reserved Font Name ’Source’”*. Paketets `LICENSE` anger i stället *”Google Inc.”*, vilket är fel (se ärende #1085) |
| Fraunces | ingen | ingen | The Fraunces Project Authors |
| Familjen Grotesk | ingen | ingen | The Familjen Grotesk Project Authors |
| Atkinson Hyperlegible Next | ingen | ingen | The Atkinson Hyperlegible Next Project Authors |
| IBM Plex | **”Plex”** (IBM) | **”Plex”** | *”Copyright 2019 IBM Corp. All rights reserved.”*. Filen nämner inte RFN |
| Instrument Sans | ingen | ingen | The Instrument Sans Project Authors |

Vad RFN betyder för självhostning via Fontsource är en tolkning, inte juridisk rådgivning:
- **Delmängd räknas som ändring.** OFL-FAQ 2.6: att ta bort delar av ett typsnitt när det levereras som webbtypsnitt är en ändring, och då får RFN normalt inte användas.
- **Undantaget kräver funktionell likvärdighet.** FAQ 2.7–2.8 gör undantag om filen behåller samma teckenförråd, samma OpenType-beteende och metadata, inklusive RFN-deklarationen. Alternativet är ett separat avtal med upphovsägaren.
- **Fontsource-filerna är inte likvärdiga.** De är Google Fonts filer, delade per unicode-intervall, och funktioner är borttagna. Source Serif 4 går från 21 till 8 GSUB-funktioner: `smcp`, `onum`, `lnum`, `ss01` och `ss02` försvinner. IBM Plex Sans går från 22 till 5. Ändå bär filerna namnen ”Source Serif 4” och ”IBM Plex Sans”.
- **Ett avtal kan finnas.** Google kan ha avtal med Adobe och IBM enligt FAQ 2.7 och 5.8. Jag hittade inget offentligt ⚠️.
- **Risken är praktiskt låg men formellt öppen.** För de fem typsnitten utan RFN finns ingen fråga.
- **Ingen egen delmängd av RFN-typsnitt.** Vi ska aldrig själva göra delmängder av Source Serif eller IBM Plex, till exempel med glyphhanger eller subfont.

**Vad det är:** En lista med sju öppna typsnitt som kiten väljer bland. Alla har bra latinskt stöd och finns som Fontsource-paket. Lugn använder i dag Instrument Sans, Djärv Inter och Varm Fraunces.

**Hur det fungerar:**
- **Fontsource** paketerar Google Fonts filer som npm-paket med CSS. Varje delmängd (subset) får ett eget `@font-face` med `unicode-range`, så webbläsaren hämtar bara de filer sidan behöver. CSS:en har `font-display: swap`.
  - **Variabla paket:** `index.css` och `wght.css` har bara viktaxeln. `standard.css` lägger till `wdth`, `opsz`, `slnt` och `ital` där de finns, och `full.css` har alla axlar.
  - **Familjenamnet i CSS** blir ”X Variable”, till exempel `'Fraunces Variable'`.
- **Svenska tecken.** Delmängden `latin` (U+0000–00FF, U+2000–206F med mera) täcker å, ä, ö, é, ü, ”, ’, kort och långt tankstreck (U+2013, U+2014), … och hårt mellanslag i alla sju. Det är en egen kontroll av teckenkartan. Hyperglot godkänner svenska, finska, norska och sydsamiska för Instrument Sans enbart med `latin`-filen.
- **Nordsamiska (Č, Đ, Ŋ, Š, Ŧ, Ž) kräver `latin-ext`** och att typsnittet har tecknen. Kontrollen gjordes mot de fullständiga filerna:

| Typsnitt | Saknas för nordsamiska | Hyperglot 0.7.3: svenska / nordsamiska / lulesamiska / sydsamiska |
|---|---|---|
| Inter | – | ja / ja / ja / ja |
| Fraunces | – | ja / ja / ja / ja |
| Familjen Grotesk | – | ja / ja / ja / ja |
| IBM Plex Sans | – | ja / ja / ja / ja |
| Instrument Sans | Ŧ ŧ | ja / **nej** / ja / ja |
| Source Serif 4 | Ŧ ŧ | ja / **nej** / ja / ja |
| Atkinson Hyperlegible Next | Ŋ ŋ Ŧ ŧ | ja / **nej** / **nej** / ja |

- **Axlar, vikter och paket** enligt Fontsource-API:t och filernas `fvar`. Storleken gäller `latin`, normal stil, woff2:

| Typsnitt | Axlar | Kursiv | Delmängder | Paket (version) | Storlek |
|---|---|---|---|---|---|
| Inter | wght 100–900, opsz 14–32 | ja | latin, latin-ext, kyrilliska, grekiska, vietnamesiska | `@fontsource-variable/inter` 5.3.0 (Google v20, filversion 4.001) | wght 48 kB, med opsz 73 kB |
| Source Serif 4 | wght 200–900, opsz 8–60 | ja | samma utom grekiska-ext | `@fontsource-variable/source-serif-4` 5.3.1 | wght 51 kB |
| Fraunces | wght 100–900, opsz 9–144, SOFT 0–100, WONK 0–1 | ja | latin, latin-ext, vietnamesiska | `@fontsource-variable/fraunces` 5.3.0 | wght 37 kB, `full` 121 kB |
| Familjen Grotesk | wght 400–700 | ja | latin, latin-ext, vietnamesiska | `@fontsource-variable/familjen-grotesk` 5.3.0 | 19 kB |
| Atkinson Hyperlegible Next | wght 200–800 | ja | latin, latin-ext | `@fontsource-variable/atkinson-hyperlegible-next` 5.3.0 | 34 kB |
| IBM Plex Sans | wght 100–700, wdth 75–100 | ja | latin, latin-ext, kyrilliska, grekiska, vietnamesiska | `@fontsource-variable/ibm-plex-sans` 5.3.0. Plex Serif finns bara statisk: `@fontsource/ibm-plex-serif` 5.3.0 | wght 46 kB |
| Instrument Sans | wght 400–700, wdth 75–100 | ja | latin, latin-ext | `@fontsource-variable/instrument-sans` 5.3.0. Lugn använder `@fontsource/instrument-sans` 5.3.0 statiskt | wght 30 kB. Statisk 400 och 600 tillsammans 34 kB |

- **Borttagna OpenType-funktioner** (GSUB, fullständig fil → Fontsource `latin`):
  - Inter 39 → 8: kvar finns `calt ccmp dnom frac locl numr pnum tnum`. Alla `cv01–cv14`, `ss01–ss08`, `case` och `zero` försvinner.
  - Instrument Sans 20 → 5: `ss01–ss12` och `case` försvinner.
  - Fraunces 4 → 2: `case` och `ss01` försvinner.

**Kvalitet och underhåll:** Hämtat via GitHub-API 2026-10-16.

| Repo | Stjärnor | Senaste commit | Bidragsgivare | Öppna ärenden | Anmärkning |
|---|---|---|---|---|---|
| rsms/inter | 19 973 | 2024-11-19 | 22 (28 med anonyma) | 147 | #910 ”Inter 4.2” (2026-10-13). Google Fonts har ännu inte 4.1 (google/fonts #9203, öppet sedan 2025-03-13). README:n avråder från Google Fonts-versionen: *”No, unless you have no other choice. (outdated, no italics)”*. Kursiv finns nu, men versionen ligger efter |
| adobe-fonts/source-serif | 2 397 | 2026-09-13 | 8 | 45 | Senaste release 2023 |
| undercasetype/Fraunces | 772 | 2025-10-21 | 10 (12) | 38 | Release 1.000 är från 2020. README:n säger fortfarande *”still under development”* |
| Familjen-Sthlm/Familjen-Grotesk | 99 | 2023-06-17 | 3 (4) | 2 | Inaktivt sedan 2023 |
| googlefonts/atkinson-hyperlegible-next | 73 | 2025-02-21 | 3 | 11 | **Arkiverat** 2025-06-10 |
| IBM/plex | 11 694 | 2026-10-13 | 27 (34) | 86 | Aktivt. Egna npm-paket per familj |
| Instrument/instrument-sans | 339 | 2023-06-14 | 3 | 4 | Inaktivt sedan 2023 |
| fontsource/fontsource | 6 202 | 2026-10-14 | 43 (46) | 38 | #1085 (öppet): fel copyright i `LICENSE` för Adobes Source-typsnitt. Ny kommentar 2026-10-12 visar samma fel för Source Sans 3. #39 (öppet sedan 2020): Google Fonts tar bort OpenType-funktioner |

**Det bästa vi kan ta:**
- **RFN-tabellen ovan** till `typografi.md`, *Vikter och typsnitt*. Fem typsnitt kan tas via Fontsource som de är. Source Serif och IBM Plex får ett villkor: antingen upphovsägarens egna filer eller ett beslut av Johnny om tolkningen.
  - **IBM:** `@ibm/plex-sans-variable` 0.2.0 har IBM:s egna delmängder. `Latin1` väger 69 kB och behåller 19 GSUB-funktioner, mot 46 kB och 5 funktioner hos Fontsource. Paketet kör telemetri vid installation (se *Risker*).
  - **Adobe:** releasen 4.005R har bara hela filer. Den variabla Roman-filen väger 427 kB och statisk Regular 76 kB, mot Fontsources 51 kB. Det är för tungt för en kundsajt.
- **Täckningstabellen** som urvalsregel: en kund i Sápmi eller med samiska ortnamn får ett typsnitt med full nordsamiska (Inter, Fraunces, Familjen Grotesk eller IBM Plex) och `latin-ext`. I övrigt räcker `latin`.
- **Variabel fil när kitet använder två vikter eller fler.** Instrument Sans variabel wght (30 kB) är mindre än Lugns två statiska vikter (34 kB) och ger alla vikter 400–700.
- **Funktionslistan per typsnitt** innan ett kit bygger på `ss`, `case`, `zero` eller `onum`. De finns inte i Fontsource-filerna. Det bekräftar regeln i `typografi.md`, *Siffror*.
- **Fraunces axlar SOFT och WONK** kräver `full.css`, som väger 121 kB mot 37 kB. Varm importerar i dag `index.css`, alltså bara vikten. Om Varms `design.md` räknar med SOFT har jag inte kontrollerat ⚠️.

**Var det hamnar hos oss:**
- **Ytskillen**, `.claude/skills/yta/typografi.md`:
  - RFN-tabellen och regeln om upphovsägarens filer.
  - Täckningstabellen för svenska och samiska.
  - Variabel eller statisk fil efter antal vikter.
  - De borttagna funktionerna.
- **Ytskillen**, `.claude/skills/yta/tokens.md`, *Verktyg*: raden om Fontsource får en not om RFN och om Fontsources felaktiga `LICENSE`.
- **Bibliotek:** paketen finns redan. Förslag: Lugn byter till `@fontsource-variable/instrument-sans` (sparar 4 kB och ger alla vikter).
- **Kontroll** (förslag): ett litet fontTools-skript som läser kitets woff2-filer och rapporterar saknade svenska tecken, saknade nordsamiska tecken och tillgängliga OpenType-funktioner. Det körs när ett kit tas fram, inte per sajt.
- **Ingen MCP.**

**Passar vår stack?**
- **Ja, utan JavaScript.** Fontsource-CSS importeras redan i `kit.css`, och det fungerar i statisk Astro. Astros Fonts API (N2) kan läsa samma paket.
- **Tailwind 4:** `--font-sans: var(--k-font-brod)` i `@theme inline`, så att kitet styr också i React-öar.
- **Lighthouse 100:**
  - Förladda bara brödtextens `latin`-fil.
  - Reservtypsnitt med `size-adjust` finns redan i Lugn, och `font-display: swap` utan reserv ger layoutskift.
  - Adobes hela filer (427 kB) skulle sänka LCP på mobil och ska inte användas.
- **Inga krockar** med *HTML först* eller rörelsereglerna.

**Risker och flaggor:**
- **RFN** för Source Serif (”Source”) och IBM Plex (”Plex”) – se *Licens*. Tolkning, inte juridisk rådgivning. Tas upp med Johnny.
- **Varumärke:** IBM:s README kallar typsnittet *”IBM Plex® typeface”*, och Adobe skriver att ”Source” är Adobes varumärke. Namnet används bara som typsnittsnamn i CSS, aldrig i marknadsföring.
- **Telemetri:** `@ibm/plex-*` kör `postinstall: ibmtelemetry --config=telemetry.yml`, som skickar till `www-api.ibm.com/ibm-telemetry/v1/metrics`. Det stängs av med `IBM_TELEMETRY_DISABLED='true'` eller `npm install --ignore-scripts`. Fontsource-paketen har inga installationsskript.
- **Fel licenstext:** Fontsources `LICENSE` för Source Serif 4 anger ”Google Inc.” som upphovsägare (#1085). Sajtens licenssida ska citera upphovsrepots `OFL.txt`, inte paketets.
- **Underhåll:** Atkinson Hyperlegible Next ligger i ett arkiverat repo. Familjen Grotesk och Instrument Sans har inte ändrats sedan 2023. Det fungerar, men ingen rättar fel. Fontsource-versionen av Inter ligger efter upphovsversionen (4.001 mot 4.1).
- **Atkinson saknar Ŋ och Ŧ** trots att det är ”vård-typsnittet”. Det duger för svenska men inte för nordsamisk text.
- **Inget krav på inloggning, ingen betalvägg.** Google Fonts spårning berör oss inte, eftersom vi självhostar.
- **Ej kontrollerat ⚠️:** vilken form av Ŋ typsnitten har. Hyperglot påpekar att samiska vill ha N-formen och inte den afrikanska formen. Det kräver ögat i en provtext.
