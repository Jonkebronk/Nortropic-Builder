---
titel: "Kritisk genomgång av nortropic-webb-pro: varför sajterna inte blev bra, vad som är värt att ta med och vad guiden riskerar att upprepa"
datum: 2026-10-15
källa: "github.com/Nortropic/nortropic-webb-pro, main vid commit 66db1521c33f55cde7ec2bfd03c020b1a0056c62 (2026-10-13 12:29), full klon med alla 953 commits och taggen fore-ren-designstart-20261009"
jämförd_med: "ai-webbyggare: historik/webb-pro.md vid aa6c001 och IMPLEMENTERINGSGUIDE.md v0.73 (commit 7a08b9b)"
---

# Kritisk genomgång av nortropic-webb-pro

Genomgången bygger vidare på sammanfattningen i `historik/webb-pro.md` (ai-webbyggare, commit aa6c001) men kontrollerar
varje påstående mot repot. Hänvisningar som `BESLUT.md:5401` betyder fil och rad i webb-pro vid 66db152. Det som står
inom citattecken är ordagrant ur repot. Det som är min tolkning är märkt som det.

Viktigt om källäget: kundbyggen, rapporter, skärmbilder och ägarens ordagranna domar ligger i `underlag/` och `kunder/`,
som aldrig var i git. Jag har alltså inte sett en enda byggd sajt. Det som går att belägga är vad Johnny sa om sajterna,
vad agenterna skrev om dem och vad systemet gjorde efteråt.

## 0. Kontroll av sammanfattningen

| Påstående i historik/webb-pro.md | Utfall |
|---|---|
| 953 commits på 13 dagar | Stämmer (2026-10-01 till 2026-10-13). Flest 2 och 3 oktober, 162 vardera. |
| Cirka 126 000 rader Python | Stämmer om skillsens egna skript räknas bort: 125 783 rader. Med dem 140 395. Av det är 49 573 rader enbart rökprov (122 provfiler i `kontroller/rokprov/`). |
| 61 skills, 67 krockar | Stämmer: 61 mappar i `.claude/skills/`. Krockgranskningen (`kunskap/skillkrockar.md`) gjordes 2026-10-05 på 52 skills: "67 krockar, 24 hög, 28 medel, 15 låg". |
| 112 beslutsavsnitt, 220 backloggposter | Stämmer: 112 `##`-rubriker i BESLUT.md (5 938 rader), 220 `B-`-poster (168 klara, 33 vilande, 13 ersatta, 3 pågående, 3 avvisade). |
| Inget bygge lanserat | Stämmer. `kunskap/lansering.md:3`: "Inget bygge har lanserats på den nya vägen än." |
| Inga nya domar i LARDOMAR.md sedan 9 oktober | Stämmer, men det är värre än så: efter 3 oktober kom inga nya domar alls i formuläret (L1 till L6 skrevs 2 och 3 oktober). Johnnys senare domar finns, men i BESLUT.md som underlag för ny mekanik (avsnitt 2). |
| "Beslutet att börja om står i BESLUT.md" | Gäller ai-webbyggares egen BESLUT.md vid aa6c001 ("Börja om i små steg", Johnny 2026-10-13 17:32), inte webb-pros. Webb-pros sista beslut handlar tvärtom om mer autonomi. |
| Citatet "Jag känner igen mig, hur ska jag bygga min vision?" | Finns inte i repot. Det kommer ur samtalet och kan inte kontrolleras här. |
| Licensbeskeden är värda att ta med | Delvis fel. Se avsnitt 3: beskedet innehåller oifyllda platshållare. |

## 1. Arkitekturen

### Startpunkten 1 oktober

Första commit `9bb0e6f` hette "Börja om smått: åtta steg som skill, kontroller, stoppvakt, kirurg". Planen
(`BESLUT.md:26-39`) var ett litet repo: litteraturens åtta steg som skillen `bygg-sajt`, kopierade kunskapstexter, en
stoppvakt som håller körningen tills kontrollerna är gröna, en kirurg för nya verktyg och "en pilot: en bransch, en stad,
tre riktiga verksamheter, två veckor". Under "Vad som inte görs" (`BESLUT.md:82-86`) stod: "Inga nya mekaniker, kvitton,
förseglingar eller granskarprofiler. Ingen agent som arbetar obevakat på systemet."

Johnnys egna ord samma dag (`BESLUT.md:8-15`) beskrev redan problemet som sedan upprepades: "Du och Codex arbetar hela
dagarna med ändringar och detta blir inte bra", "det är förbättringsagenten som tittar på vad vi har och kommer med
förbättringar men det har spårat i storlek". Webb-pro var hans andra försök ("Det här är mitt andra projekt att bygga
Nortropic, jag har försökt i 6 månader").

### Läget 13 oktober

Normalflödet enligt `CLAUDE.md`: kundunderlag, kundförståelse, branschreferenser, visuell inspiration, tre riktningar,
kundens val, riktad förbättring (Rätta, Omarbeta designen, Bygg ut), helbygge och verifierad leverans. Runt det fanns:

- **Två parallella designvägar:** kandidatflödet (`kontroller/kandidater.py`, research, plan, planprövning,
  referensprofiler, skapare, kritiker) och designfasen (`kontroller/designfas.py`, ett "produktionsband" med tretton
  stationer per riktning, se metodkartans tabell). Formgivningen flyttade på två dygn från kandidatflödet till Claude
  Design (12 okt) och vidare till lokala Astro-projekt (13 okt, `BESLUT.md:5792`).
- **Helbygget** (`kor.sh`, skillen `bygg-sajt`) med provet (`kontroller/prova.py`: axe, Lighthouse, byggstandarden,
  spill, utan-JS, stilrapport), två oberoende granskare (`kontroller/granska.py`, `kritik/GRANSKARE.md`) och stoppvakten.
- **Godkännande och leverans:** HMAC-sigill (`kontroller/sigill.py`), en autonom godkännare
  (`designfas.autogodkann`), export till kundrepo och leveransmall för Cloudflare Workers.
- **Runtomkring:** dashboard och portal (:4771), skrivbordsappen Nortropic.app i Tauri 2 (`desktop/`, 43 filer),
  Kundstart (AI-intervju), prospekt och utskick, spanaren, kirurgen, Codex-bevakning med 30 frågor
  (`BESLUT.md:4375`), dagligt underhåll av verktyg, startkontroll, städregel, metodlås med hash.
- **Kompetensen:** 61 skills (Taste i elva varianter, Emil i elva, åtta GSAP, Jakub Krehels better-skills, Impeccable,
  Hallmark, UI UX Pro Max med flera) och MCP:erna Refero, Mobbin, 21st och Motion. `kunskap/metodkarta.md` (1 400 rader)
  placerar varje skill per roll och station.

### Grindarna

Stoppvakten, provets grindar, granskarnas godkännande, läskrav på skills (en skiss där skaparen inte läst sin "kärna"
var ogiltig), referenskontraktet, planprövningen, kundvakten, metodlåset, domloggens lås och sigillet. Den 12 oktober
gjordes många av dem om till varningar ("Fria tyglar", commit `17501ee`, `BESLUT.md:5624`).

### Hur designen bedömdes

I tur och ordning: ägarens formulär efter bygge (L1 till L6), blind A/B mellan två byggen, en LLM-granskare kalibrerad
mot Johnnys blinda domar över externa sajter (13 exempel 4 okt, 6 nya 9 okt), panel och kritiker i kandidatflödet, en
blind före/efter-granskare, stationen kritik i bandet, och till sist den autonoma godkännaren som godkände när kritiken
"svarar premium på C5" (`BESLUT.md:5897-`). Kalibreringsankarna togs bort vid den rena designstarten 9 oktober, och
granskaren förklarades "okalibrerad" (`BESLUT.md:4309-`).

### Mekanik kontra designarbete

Ingen fil mäter det direkt, men proportionerna talar tydligt:

- 125 783 rader Python, varav 49 573 rader rökprov. Mallens enda designfil, `mall/astro/src/styles/design.css`, är två
  rader: "Ingen design än."
- Byggena som Johnny faktiskt dömde gjordes 2 och 3 oktober (L1 till L6 plus en A/B). Efter den rena designstarten
  "hade ingen av elva körningar nått en skiss; åtta av dem stannade i en grind före renderingen" (`BESLUT.md:5355-5356`).
- Det enda Johnny såg efter 9 oktober var Lerverkets två skisser (11 okt) och en Astro-sida som artefakt (13 okt).
- Skaparens läsning före första ändringen: "12 filer och 155 947 tecken", plus "13 filer och 177 946 tecken" i
  granskningen efter renderingen (`BESLUT.md:5435-5436`).

Min bedömning: det mesta av arbetet gick till att bygga och bevaka en maskin för design, inte till design.

## 2. Varför sajterna inte blev bra

### Vad Johnny sa, i tidsordning

| Datum | Johnnys ord eller dom | Källa |
|---|---|---|
| 1 okt | "norrglänta är historik, den var undermålig, ai slope skit" | `BESLUT.md:16` |
| 2–3 okt | L1 till L6: alla "Ja, efter små ändringar", alla "Mycket bättre" än verksamhetens sajt, 4–5 av 5 på "gjord för verksamheten" | tagg `fore-ren-designstart-20261009`, `LARDOMAR.md` |
| 4 okt | "Ägaren såg bygge 4 och underkände utseendet kraftigt (förmedlat i Codex R40)" | `BESLUT.md:175` |
| 5 okt | "Stopp, detta duger inte" | `BESLUT.md:246` |
| 5 okt | "inget bygge hittills har varit bra nog, allt har varit generiskt" | `BESLUT.md:398`, `LARDOMAR.md` vid taggen |
| 5 okt | "GUD FÖRBANNAT, du ska använda ALLA SKILLS OCH MCPS TILLGÄNGLIGA" | `BESLUT.md:299` |
| 12 okt | "nej, lerverket ser ju generisk och katastrofal ut" och "driver du med mig ? varför öppnade du inte google dokumentet" | `BESLUT.md:5401-5406` |
| 12 okt | "Det är inte konstigt att vi har skapat ai slop eller undermåliga hemsidor om du är begränsad av regler som har smygit sig in" | `BESLUT.md:5632-5635` |
| 13 okt | "det är ju detaljer, detaljer, detaljer som lyfter den från basic till premium känslan?" | commit `9e11bc8`, `BESLUT.md:5814` |
| 13 okt (ai-webbyggare) | "vi har fortfarande inte skapat en sida jag är nöjd med ännu" | ai-webbyggare `BESLUT.md` vid aa6c001 |

Mönstret: formulärdomarna var positiva, men så fort Johnny såg sidorna med egna ögon blev domen "generisk".

### Hypoteserna i sammanfattningen, prövade

**1. Looparna bytte plats. Stöds.** Loop 3 (Johnnys dom blir en liten textändring) fick sex domar på två dagar och
sedan inga fler. Förbättringsloopen gick hela tiden: 168 klara backloggposter, 53 commits som nämner Codex, Codex-revisioner
med nummer upp till R40 och audits som GR-20261011-astra-v2. Johnnys senare domar gick aldrig in i LARDOMAR.md utan blev
underlag till nya beslut i BESLUT.md. Den 9 oktober beställdes Codex som "observatör och förbättringsagent" med
"kontinuerlig bevakning" (`BESLUT.md:3889`, `4022`), alltså mer förbättringsloop.

**2. Rören verifierades, inte vattnet. Stöds starkt.**
- Rökproven (49 573 rader) prövar mekaniken. `kunskap/metodregler.md:29` säger om förmågeprovet, det som skulle mäta
  sajternas kvalitet: "oprövad (inget förmågeprov kört än)".
- Statusraderna i BESLUT.md säger om och om igen "Mekaniken prövad" följt av "Designen är inte bedömd av ägaren" eller
  "ingen autonom körning är gjord" (`BESLUT.md:5320`, `5397`, `5461`, `5495`, `5571`, `5901`).
- Lanseringskedjan är 320 rader men aldrig körd skarpt (`kunskap/lansering.md:64`).
- Kvitton räknade läsning och aktivering av skills, inte effekt: "Kvittot visar läsning och aktivering, aldrig att
  granskningen tillämpades eller att sidan blev bättre" (`BESLUT.md:5452-5453`).

**3. Johnnys ord blev mekanik. Stöds, med ett tydligt exempel.** Johnny frågade 13 oktober om detaljerna lyfter en sida
till premium, med frågetecken. Samma morgon (`9e11bc8`, 08:22) blev frågan avsnittet Detaljnivån i
`kunskap/precision.md`, frågorna D1 till D6, kritikfrågan C5, fråga 16 i granskningsfrågorna, en stilrapport som räknar
"interaktiva element med övergång" och en ny station `detaljer` i bandet. Den autonoma godkännaren godkänner bara när
kritiken "svarar premium på C5". Fler exempel: L1 om ett formulär blev byggstandard 6 och grind (`bc5360f`), L4 blev
regler för mobilmenyn och stilrapportens mätning av dolda länkar, Archivo-valet blev verktyget `upptagna_val.py`.
Regeln mot detta fanns hela tiden: "Ingen dom blir ny mekanik" (`LARDOMAR.md`) och "Inga nya mekaniker"
(`BESLUT.md:84`). Den följdes inte.

**4. Agenterna formulerade alternativen. Stöds.**
- Johnnys beslut är ofta val bland agentens rekommendationer: "Ja enligt dina rkeommendationer till alla tre"
  (`BESLUT.md:148`), "FIXA ALLA SAKER PÅ LISTAN FRÅN TOPP TILL BOTTEN SOM CODEX SKREV" (`BESLUT.md:325`), "Gör det det
  du anser är rekommendationen" (`BESLUT.md:4299`), "Del 1 + Del 2 (Rekommenderas)" (`BESLUT.md:5739`).
- Beslutet att godkännande och byggstart skulle vara autonoma kom från en flervalsfråga där agenten skrivit alternativet:
  "Autonomous to build (Recommended)" (`BESLUT.md:5905`). Samma morgon hade Johnny skrivit att designgodkännandet och
  byggstarten "är fortfarande mina beslut".
- Johnnys uppdrag kom ofta som långa inklistrade promptfiler (`PROMPT-Nortropic-*.md`) skrivna tillsammans med Codex
  eller en annan AI, och hans domar kom ibland via Codex ("Ägaren förmedlade Codex dom", `BESLUT.md:192`).
- Den "blinda" A/B-domen var inte blind: "ägaren fick Codex blinda A/B-bedömning i samtalet före det bokförda valet.
  Skilj detta från en oberoende mänsklig blinddom" (`BESLUT.md:4216`).
- Tre stora tillägg 12 och 13 oktober säger själva: "Ingen människa svarade; besluten nedan är sessionens egna"
  (`BESLUT.md:5692`, `5737`, `5797`).

**5. Det komplexa före det enkla. Stöds.** Planen 1 oktober var tre riktiga verksamheter på två veckor. Efter 13 dagar
fanns HMAC-sigill, Tauri-app, portal, prospekt-scraper, Codex-bevakning och en autonom godkännare, men ingen sajt som
Johnny var nöjd med. Rensningar och omstarter (`94cdc2e` 6 okt, den rena designstarten 9 okt) tog bort byggen och
domar men lämnade maskinen kvar och byggde vidare på den.

**6. Regler drar mot genomsnittet. Stöds som hypotes, inte bevisad.**
- `backlog/B-20261002-upptagna-val-...md`: "Alla tre nattbyggen valde Archivo, med en ny motivering varje gång."
- Johnnys egen promptfil 12 oktober: "Skills som säger emot varandra och läses samtidigt drar mot en säker mittenform"
  (`BESLUT.md:5506`).
- Krockgranskningen klassade 28 krockar som "medel = drar mot generiskt eller motsägande resultat".
- Men det finns inget kontrollerat prov. När reglerna lättades 12 och 13 oktober dömdes inget resultat innan projektet
  lades ned, så motprovet saknas.

### Fler orsaker som repot belägger

**7. Domarna mätte golvet, inte smaken.** L1 till L6 är fulla av kontrastvärden, tryckytor i px, valideringsfel,
fontvikt och WCAG-nummer, och betygen blev höga. Två dagar senare var "allt generiskt". Formuläret frågade efter det som
går att mäta och fångade inte det Johnny reagerade på. Domarna innehåller mätningar som "Verifierat i 390 px-emulering"
och "Nu-validatorn 0 fel", och L1, L2 och L3 committades 13:05, 13:14 och 13:28 (`7bd037e`, `f68fa13`, `ee62142`).
Vem som skrev texten går inte att belägga, men stilen är granskarens. Min tolkning: smakdomen späddes ut med
agentgenererad teknisk bedömning redan i källan.

**8. Den kalibrerade granskaren höll inte med Johnny om de riktiga sidorna.** Granskaren klarade kalibreringen: 0 av 4 och
0 av 5 felaktiga godkännanden på externa sajter (`LARDOMAR.md` vid taggen). På Lerverkets k01 sa samma typ av kritiker
"fortsätt, inte generisk" (`BESLUT.md:5353`, `5361`). Johnny sa "generisk och katastrofal". Kalibrering på andras sajter
överfördes inte till systemets egna utkast.

**9. Ingen stabil måttstock.** Kalibreringsankarna togs bort 9 oktober. Den nya ribban blev "Apple och Nike" som
"ledtrådar", och Johnny avböjde att döma exemplen: "De tio sajterna i "Visa mig nivån" ska jag inte döma"
(`BESLUT.md:5536`). Därefter fanns inga dömda exempel att mäta mot.

**10. Ständiga metodbyten gjorde allt tidigare arbete ogiltigt.** Tre designflöden blev ett (5 okt). Tio förslag blev tre
(12 okt). Skills gick från obligatoriska till behovsstyrda (11 okt), tillbaka till obligatoriska med dubbel läsmängd
(12 okt morgon), sedan "Insatsen räknas, inte läsningen" (12 okt kväll) och "Fria tyglar" samma kväll. Claude Design
infördes 12 oktober och pausades 13 oktober. Följden står i texten: skisser gjorda före ändringen "uppfyller inte de
nya kraven och kan inte tas vidare till godkännande" (`BESLUT.md:5447-5449`).

**11. Grindar stoppade innan något syntes.** "åtta av dem stannade i en grind före renderingen" (`BESLUT.md:5356`).
Exempel: en skiss förkastades för att skaparen läst "7 av 18 kärnfiler", och en kritik kastades för att granskaren
skrivit fel i ett schemafält (`BESLUT.md:5350-5355`).

**12. Materialet saknades, och det går inte att lösa med design.** Tre av de första fyra verksamheterna hade nästan inga
egna bilder (L2 "En enda egen bild på hela sajten", L3 "Inga foton alls på sex sidor"). Johnny pekade två gånger på
lösningen, att beställa bilder från kunden. Ingen kund fanns som kunde svara, eftersom demosajterna aldrig visades för
verksamheterna (`BESLUT.md:85-88`, `130`).

**13. Det var det tredje varvet av samma mönster.** Digitala föregick webb-pro, och dess lärdomar kopierades in
(`kunskap/LARDOMAR-digitala.md`). Johnnys diagnos 1 oktober ("spårat i storlek", "hela dagar på ändringar") beskriver
exakt det som sedan hände i webb-pro.

## 3. Det som fungerade och är värt att ta med

Gemensamt för texterna: de är kunniga och ärliga om vad som är prövat, men tätt sammanvävda med webb-pros mekanik
(`kontroller/*.py`, BRIEF §-nummer, DESIGN.md-kontraktet, metodkartan). De måste skalas av innan de används.

| Material | Omfång | Bedömning |
|---|---|---|
| `kunskap/kundintervju.md` | 68 rader | **Hög.** Tabellen A till J med "Det vi behöver förstå" och "Nästa användning" är kort och användbar. Bra principer: kundens ord är primärkälla, AI-syntes märks som tolkning, faktabekräftelse är inte acceptans. Ärlig om att metoden inte prövats med en riktig kund ("En riktig flertursintervju och mänsklig användningsprövning måste göras separat"). |
| `kunskap/teoretisk-grund.md` | 260 rader | **Hög som golv, svag som tak.** Processmodell (ISO 9241-210, Double Diamond, Lean UX), Nielsens heuristiker, kognitiv genomgång, WCAG-EM och Harvard-referenser per avsnitt. Tyngdpunkten ligger på användbarhet, teknik och säkerhet. Visuell gestaltning finns nästan bara som referenser (Lupton, Müller-Brockmann). Den var "Ägarens bilaga B", inklistrad, så referenserna bör stickprovas. |
| `kunskap/byggstandard.md` | 178 rader | **Hög.** Varje punkt är verifierbar i webbläsare eller kod och kopplad till en kontroll. Mycket bra golv (semantik, kontrast, 24 px, rörelse, prestanda, formulär). Tät och full av webb-pros grindnamn. Vissa punkter är husets produktval (44 px, inga karuseller), inte praxis. |
| `kunskap/seo-lokal.md` | 32 rader | **Medel.** Korrekt men tunn. Hänvisar till verktyg som inte finns ("Digitalas verktyg, finns inte här") och till briefens paragrafnummer. |
| `kunskap/lansering.md` | 320 rader | **Medel.** Grundlig procedur för export, Cloudflare, Access-skydd, DNS och återgång, med lästa leverantörsfakta. Aldrig körd skarpt, och motsäger sig själv: rad 64 säger "ingenting här är prövat mot ett verkligt konto än", medan commit `5ecfb97` (10 okt) beskriver ett fjärrprov mot nortropic.workers.dev. |
| `kunskap/drift.md` | 73 rader | **Medel till hög.** Enkel veckokontroll med `curl` och `openssl`, tre lägen (ok, incident, okänt) där okänt aldrig räknas som ok. Ärlig om att inget verktyg finns. Lätt att ta med. |
| `kunskap/bild.md` | 111 rader | **Hög.** Anspråken `depicts_client_work`, `depicts_client_people` och `illustrative` är en tydlig regel för äkthet, och en saknad bild är en beställning. Bra regel för genererat material. Lärdomen L3 ("hellre inga foton än stock") blev först ett förbud och upphävdes sedan (`BESLUT.md:406`), så kärnan är regeln om anspråk, inte förbudet. |
| Astro-mallens komponenter | `Forfragan.astro` 147 rader, de andra 23–38 rader | **Hög för Forfragan, medel för resten.** Formuläret fungerar med vanlig POST utan JS, har honeypot och tidsfälla, felbesked vid fälten via `aria-describedby` och CSS `:user-invalid`, och inskicks-id mot dubbletter. Bokning, HittaHit, Nyhetsbrev, Betallank, Sprakvaxlare och Brodsmulor är små och okomplicerade. Ta inte med `mall/astro/package.json` som den är: den låser three, @react-three/fiber, ogl, gsap, motion och radix i en mall för lokala småföretag. |
| Leveransmallen för Cloudflare Workers | `worker/index.js` 426 rader, D1-migreringar, `wrangler.jsonc`, `_headers` | **Hög som utgångspunkt, oprövad i produktion.** Sparar förfrågan i D1 och bilagan i R2 före aviseringen, utkorg med tillstånd, idempotens, frister, säkerhetshuvuden och CSP på felsidor. Prövad lokalt i workerd och i ett fjärrprov av förhandsvisningens skydd. Ingen riktig kund, inget riktigt mejl. |
| Licensbeskedet (`BESLUT.md:4411-4437`) | | **Låg som belägg.** Texten Johnny klistrade in har oifyllda platshållare: "1. Mobbin: [datum, avsändare hos Mobbin]. Godkännandet gäller [t.ex. att vi sparar ...]". Sedan kom "allt får vi göra" och "vi har fulla godkännande för alla våra verktyg, mcps, skills, källor etc." Datum och avsändare står inte någonstans. Ta inte med det som licensbevis. Hämta de faktiska skriftliga medgivandena från Mobbin och 21st, eller läs villkoren på nytt. |
| Regeln om referenser (`BESLUT.md:132-145`) | | **Medel till hög.** "kopiera gärna referensen, lägg sedan vårt på det": layout, palett och typsnitt får lånas, men identitet, text och bilder kopieras inte, och referensen namnges. Enkel och sund. I webb-pro blev den till verktyget `UPPTAGNA-VAL.md` och fler kontrakt. Ta med regeln, inte mekaniken. |

Annat som är värt att veta om:
- **Domarna L1 till L6** (taggen `fore-ren-designstart-20261009`) är fortfarande det bästa underlaget om vad Johnny
  uppskattade konkret: byggdagbok med daterade egna bilder, öppna pristabeller, kundcitat bredvid löftet och
  kontaktsidor med "Bra att berätta när du ringer". Läs dem som exempel, inte som regler.
- **Johnnys återkommande önskan, som aldrig genomfördes:** fråga kunden i stället för att utelämna. Det gällde bilder,
  telefontid, försäkring och ägarens egna ord (L2, L3).

## 4. Varningar för ett nytt projekt: upprepar IMPLEMENTERINGSGUIDE.md webb-pros misstag?

Guiden (v0.73, 2 364 rader) skrevs på ungefär två dygn: versionerna 0.1 till 0.73 är daterade 2026-10-14 och
2026-10-15, och den har 71 YouTube-länkar som källor. Den nämner inte webb-pro. Den har flera lärdomar som webb-pro
saknade: pilotfas med alla stopp påslagna (§5.4), "Kör processen manuellt tillsammans med Claude första gången" (§12),
"vad, men inte hur" (§12), Caliper med och utan skill (§9.5) och att en Stop-hook som skriver lärdomar i `CLAUDE.md`
"används inte" (§8.7). Men grundformen är densamma som i webb-pro 1 oktober (åtta steg, kontroller, stoppvakt,
granskare), och flera av de konkreta fällorna finns kvar.

### De fem allvarligaste riskerna

**1. Maskinen kommer före sajten.** §16 Nästa steg har 21 punkter. Johnny ser en Stitch-design tidigast i punkt 13
("Bygg resten av skillsen i flödesordning"). Före dess kommer init, verifiering av mods, inställningar, formatet för
`state.json`, `CLAUDE.md`, skyddshooken, kunskapsbasen, `brief-interview`, `write-checks`, `godkann-kontroller.mjs`,
`checkpoint-planner` och planvyn. Det strider mot principen i ai-webbyggare vid aa6c001: "Först en sajt Johnny är stolt
över, sedan byrån och sist maskinen." I webb-pro ledde samma ordning till att "ingen av elva körningar nått en skiss".
**Motåtgärd:** första steget ska vara en sajt för en riktig verksamhet, byggd interaktivt med Stitch och Claude och
dömd av Johnny, innan någon hook, låst kontroll eller orkestrerare byggs.

**2. Evalen mäter rören.** Måtten i §9.3 är: om flödet nådde fas 6, antal rättningsrundor, antal fynd vid första
granskningen, antal antaganden, tid och kostnad, och "Antal ingrepp från dig". Inget mått är Johnnys dom över
resultatet, och färre ingrepp räknas som bättre, vilket belönar att han tittar mindre. Testbriefarna i §9.2 är fiktiva
("Kort scrollytelling-sajt, 4 kapitel"). Webb-pro valde bort fiktiva företag redan första dagen: "fiktiva företag inte
har något specifikt att säga och därför ger slop" (`BESLUT.md:38-39`). **Motåtgärd:** huvudmåttet är Johnnys blinda dom
över riktiga sajter, och "ingrepp" är ett kostnadsmått, inte ett kvalitetsmått.

**3. En granskarkedja ersätter Johnnys öga.** Guiden har `stitch-review`, `story-review`, `kod-kritiker` och
`kod-rattare`, adversarial planprövning, expertgranskare, utseendegranskare, säkerhetsgranskare och
originalitetskontroll (ordet "granskare" förekommer 94 gånger). §5.4 säger att designvalet "kan automatiseras
när granskaren är pålitlig", och §9.6 säger att granskare får köra utan stopp vid 90 % överensstämmelse. Webb-pro
kalibrerade sin granskare med noll felaktiga godkännanden och fick ändå "inte generisk" på en sida som Johnny kallade
"generisk och katastrofal". Den autonoma godkännaren i webb-pro byggdes på precis den här tanken. **Motåtgärd:** mät
kalibreringen på systemets egna utkast, inte på externa sajter, och låt designvalet vara Johnnys tills han själv säger
att han är nöjd med flera sajter i rad.

**4. Johnnys ord blir regler och kontroller.** §10.5 säger att "Missade fynd blir förslag till kriterier", att
"Kontroller som missats på samma sätt blir nya standardkontroller i fas 1b" och att Johnnys feedback "skrivs direkt till
`arbetssatt.md` ... och läses av alla agenter". Det är LARDOMAR-mekanismen från webb-pro, som rensades 6 oktober med
motiveringen "inget bygge hittills var bra nog: domarna över dem är inga förebilder" (`BESLUT.md:412`). Ändringsloggen
visar samma rörelse redan nu: v0.62 "låst kontroll mot långa tankstreck", v0.72 "ingen text inbränd i video eller bild
(låst kontroll)", v0.73 "låst kontroll mot versaler". "Agenten föreslår, du beslutar" (guidens status) är samma form som
"Autonomous to build (Recommended)". **Motåtgärd:** en dom om smak gäller den sajten. Nya låsta kontroller bara för det
som är objektivt fel och har hänt mer än en gång, och Johnny formulerar själv frågan innan agenten föreslår svar.

**5. Verktygsladdning och skillkrockar.** Guiden räknar själv med "ett trettiotal egna skills" och listar dessutom
Impeccable, Emils skills, Taste, Hallmark, Scroll World, scrollytelling, Inspo, Tastemaker, mods, Jev, Caliper,
Codeburn med flera, och de flesta står som öppna "ta med?" i §14. Johnny sa 13 oktober att han vill ge sin AI
"steroider med skills, mcps och kompetens" (ai-webbyggare `BESLUT.md` vid aa6c001). I webb-pro ledde "ALLA SKILLS OCH
MCPS" till 67 krockar och en läsmängd på 156 000 tecken före första ändringen, och Johnnys egen promptfil drog slutsatsen
att det "drar mot en säker mittenform". **Motåtgärd:** börja med Stitch, en byggskill och en granskning. Lägg till ett
verktyg i taget och bara när ett prov med och utan visar nytta på en riktig sajt.

### Fler risker värda att bevaka

- **Kärnmotorn är oprövad.** Stitch-CLI:ts kommandon och kostnader är märkta ⚠️ och bygger på en video (§2, §14).
  Webb-pro bytte designmotor två gånger på två dagar (Claude Design 12 okt, Astro 13 okt). Prova Stitch på en riktig
  sajt innan något byggs runt det.
- **Guiden växer snabbare än den prövas.** Statusraden skjuter upp konsolideringen tills "videogenomgången är klar".
  Webb-pros kirurg och spanare matade in nya repon och videor på samma sätt, och backloggen nådde 220 poster.
- **Planeringen före bygget är tung.** Fas 1b har låsta kontroller, täckningstabell, funktionsspecifikation, spritt
  kantfallspass, adversarial planprövning i upp till 3 omgångar och planvy. Guiden ser själv risken (Ebbelaar-citatet i
  fas 1b) men skjuter avgörandet till evalen, som ännu inte finns.
- **Materialet.** Guiden har bildstrategi (§11.9) men inget steg där bristen på kundens egna bilder och ord stoppar eller
  styr bygget. Det var en av de tydligaste orsakerna i webb-pro (L2, L3).

## Slutsats

Webb-pro byggde ett avancerat system för att bevaka designarbete, men gjorde väldigt lite design som Johnny faktiskt
dömde. När han dömde var domen nästan alltid "generisk", och svaret blev nästan alltid mer mekanik. Det som går att ta
med är kunskapstexterna, formulärkomponenten, Worker-mallen och domarna L1 till L6 som exempel. Guiden har fångat flera
av lärdomarna i ord, men i §16 och §9 gör den om webb-pros ordning: först maskinen och sedan sajten, med mått på
processen i stället för på resultatet.
