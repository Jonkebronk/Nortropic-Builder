---
titel: "Konsolideringsanalys av IMPLEMENTERINGSGUIDE.md v0.73"
datum: 2026-10-15
analyserat:
  - IMPLEMENTERINGSGUIDE.md (v0.73, 2 364 rader enligt Get-Content, 361 kB, commit 7a08b9b på main)
  - kunskap/research/2026-10-14_*.md (sex rapporter)
  - kunskap/raw/videor/ (74 transkript, stickprov av citat)
  - origin/karta-och-inventering: BESLUT.md, LAGE.md, historik/webb-pro.md (endast läst, inget sammanfört)
status: "analys inför konsolidering – guiden är inte ändrad"
---

# Konsolideringsanalys av implementeringsguiden v0.73

Radnummer avser `IMPLEMENTERINGSGUIDE.md` på main vid commit 7a08b9b. Guiden är **inte** ändrad. Där kartspårets `BESLUT.md` (gren `karta-och-inventering`) säger något annat än guiden noteras det, men spåren sammanförs inte. Det avgör Johnny.

---

## 0. Kortversion

1. **Guiden är en katalog, inte en byggplan.** Den innehåller cirka 60 låsta kontroller och grindvillkor, ett tjugotal agent- och granskarroller, ett trettiotal egna skills (guidens egen siffra, rad 1784), cirka 48 tredjepartskandidater i §12, 196 fallgropar och 33 öppna frågor. Den första sajten kommer i steg 10 av 21 i §16. Det är samma mönster som webb-pro (61 skills, 67 krockar, 953 commits, ingen lanserad sajt): rören verifieras, inte vattnet.
2. **Bänken är i praktiken inte tillämpad på kärnan.** 44 av 74 transkript kommer från AI LABS. Enligt regeln "två videor från samma kanal = en källa" vilar nästan hela arkitekturen (Stitch-flödet, dolda kontroller, granskare utan rundnummer, modellbyte-grinden, antimönster, OKLCH, checkpointstorlek) på **en** källa. Flera grindar på bänken är dessutom smakfrågor från en person (versaler, Inter/Lucide-förbud, Emils millisekunder, Lighthouse 90+, WebP < 200 kB).
3. **Två "lyfta" regler är skenbart lyfta.** Blind jämförelse (Jack Roberts säger själv att hans design loop är gauntlet-loopen, samma primärkälla som AI LABS-videon) och "ingen text i bild" (Tristens video handlar om Claude Motion, inte om regeln; WCAG 1.4.5 är det verkliga andra belägget).
4. **Konkreta motsägelser:** granskarna får inte läsa `CLAUDE.md` (rad 780) men ska hämta Stitch-projektets id därifrån (rad 410, 1906); fas 4 säger både att den granskar beteende (rad 413) och att den inte gör det (rad 429); spanaren kör "låg effort" (rad 392, 790) men "lägst medium" (rad 1306); dolda kontroller via agentens verktygsbegränsning (rad 1461) går inte enligt researchen (rad 801–804); Vercel och "Supabase behövs inte" står kvar (rad 1890) trots beslut och v0.67.
5. **Cirka 70 av de 181 rader som har ⚠️ är redan lösta eller är inte verifieringsfrågor alls** (källförbehåll och juridiska friskrivningar). Bara en handfull blockerar en första sajt, och nästan alla gäller Stitch.
6. **Minsta nödvändiga för första sajt:** fem beslut (verksamhet, designsätt, vem som väljer riktning, Astro statiskt, publicering eller ej), sju filer (kort `CLAUDE.md`, briefmall, `fakta.md`, `design.md`, Astro-skelett, kontrollskript, `permissions` i settings) och cirka tio kontroller. Allt annat i guiden hör till sajt 2–5 eller till förvaltningsskalan.

---

## 1. Metod

- Hela guiden lästes. Avsnittsstorlekar, ⚠️-rader, förekomster av "låst kontroll", "Tillval", "Vercel" och "Supabase" räknades med skript.
- De sex researchrapporterna lästes och jämfördes punkt för punkt med guidens ⚠️ och påståenden.
- Kanaler räknades ur transkriptens frontmatter: AI LABS 44, Nate Herk 18, Jack Roberts 10, Tristen O'Brien 1, The Coding Sloth 1.
- Stickprov av citat mot transkript: versalregeln (YAsxyoTWFDA), Jacks design loop (IYNAyRkUsjI, NAumQObJEwM), gauntlet-loopen (D_uojDHkbw4) och tyst modellbyte (7au4tWVG8a0). Resultaten finns i §4.
- Kartspårets `BESLUT.md`, `LAGE.md` och `historik/webb-pro.md` lästes som facit för ägarens beslut 2026-10-13.

---

## 2. Dubbletter

Samma regel står på flera ställen, ofta med olika detaljer. Kolumnen *Hemvist* anger var regeln föreslås bo; övriga ställen behåller bara en hänvisning.

| # | Regel | Platser (rad) | Hemvist |
|---|---|---|---|
| D1 | **Granskarisolering** (ny kontext, ser inte byggarens logg, `CLAUDE.md` eller rundnummer) | §5.2 (777–806); fas 4 två granskare (413); fas 6 specialister "utan att se de andras" (499); fas 6b kritikern (560, 564); §7.1 (980); §8.3 `subtask` (1210); §10.5 `arbetssatt.md` per roll (1527); §11.4 3–5 granskare (1595); §11.7 isolerade idéagenter (1672); §5.1 påminnelsen "inte till granskare" (749); §12 Graft (1896); fallgrop 23, 59 | **§5.2** som en princip med en behörighetstabell. Faserna anger bara *vilken* referens granskaren får. |
| D2 | **Status och rapporter med belägg** | fas 3 (393); §7.2 bevis per grind (1024–1028); §8.6 promptregeln (1299); fas 8a (631); §15.3 källa per påstående (2235); §15.5 (2259); §5-tabellen (727); fallgrop 40, 52, 148 | **§7.2** för mekanismen (`bevis` i `state.json`); en mening i den gemensamma principlistan. Fallgroparna stryks. |
| D3 | **Formulär** (spara först, Turnstile, SPF/DKIM/DMARC, personuppgifter, test) | fas 3 två nästan identiska stycken (380 och 381–385); fas 6b standard (570); fas 7 säkerhet (596); fas 8a formulärtest (633); §11.10 formulärraden (1723); §15.1 bekräftelsemejl (2199); §14 öppen fråga om testmärkning (2169) trots svar i 633; fallgrop 20, 42, 125, 183, 193 | **Ett formuläravsnitt** (eller skill `formular`) med byggmönster, säkerhet, test och mejl. Faserna pekar dit. |
| D4 | **Samtycke och analys** | §11.10 (1713–1731); fas 7 3b och 3c (606–607); fas 0 GA4 (233); fas 0b spårare (249); fas 8a "kundens samtycke" (627); 8g GA för konverteringar (676); §11.13 (1764); fallgrop 123 | **§11.10.** OBS att ordet *samtycke* används även för kundens samtycke till att data skickas till en annan modell (340) och till kvitton (2233). De bör heta något annat, t.ex. *kundens godkännande*. |
| D5 | **Effort** | §8.6 fem stycken (1303–1308); §5.2 (806); fas 3 spanaren (392); §5.2-tabellen (790); fas 8b (644); fas 7 starkaste modellen (597) | **§8.6** med en tabell per roll. Se motsägelse M2. |
| D6 | **Hemligheter** | §7.3 två stycken (1069–1090); fas 6c klientkod (585); fas 7 `wrangler secret put` (608); fas 0 2FA (238); §8.1 (1188); fallgrop 26, 124, 141 | **§7.3.** |
| D7 | **"Agenten föreslår, du beslutar, sedan låses"** | statusraden (4); §10.1 `design.md` (1441); §10.5 tre gånger (1523, 1544, 1556); §9.6 (1416); §8.5 (1223–1224); §12 Skillify (1790); fas 8f (710) | En **egen princip** överst, som statusraden redan föreslår. |
| D8 | **Originalitet och kopiering** | fas 0b regler (265–268); fas 2 beskrivningar i stället för bilder och redesign (359–363); fas 4 originalitetskontroll (414); fas 5 "samma regler" fyra gånger (462, 464, 469); fas 6 (542, 551); §11.11 (1655); §15.3 (2234); fallgrop 30, 75, 119 | **Ett avsnitt om referenser.** Se motsägelse M12. |
| D9 | **Licens per tillgång** | §11.9 punkt 3 (1705); fas 5 typsnitt, Lottie, komponenter (465–469); Remotion (458); §12 kriterium 3 (1805); fallgrop 95, 166, 177 (tre för samma sak) | **§11.9** med en tabell över tillgångstyper. |
| D10 | **Sandlåda** | §7.3 (1092–1097); fas 3 (403); fas 7 Cloudflare-auditen (599); fas 8d (660); §11.11 REA (1660); §12 Docker (1885) | **§7.3.** |
| D11 | **Rörelse och `prefers-reduced-motion`** | brief 3b (302); fas 5 fem gånger (439, 466, 468, 479); §10.3 (1486); fas 6 (504, 530) | En **rörelseregel** i fas 5 plus en kontroll. |
| D12 | **De två stoppen** | fas 1 grind (309); fas 1b stopp 1 (341); §5.4 (831–838); §10.5 "Gate 4" (1533–1539) | **§5.4.** Stopp 2 ligger i dag under auto loopen, vilket är fel plats. |
| D13 | **Förhör före godkännande** och **elementknuten feedback** | fas 8b (651–653, 642); §10.5 (1535, 1537) | §5.4 (stopp 2), med hänvisning från 8b. |
| D14 | **Platshållare** | §8.6 (1297); §11.9 punkt 5 (1709); fas 7 steg 10 (614); fallgrop 181 | Fas 7-kontrollen plus faktaregeln. |
| D15 | **Faktabasen som enda källa till fakta** | §8.6 (1297); fas 3 (378); fas 6 faktakontroll (532); socialt bevis (514); konkret i stället för generiskt (516); §11.8 (1681–1695); §15.3 (2243) | **§11.8.** |
| D16 | **AI-signaturer i text** | fas 6 språk (503, 533, 534); tankstreck (520); versaler (546); §11.3 (1587); fallgrop 129, 169, 196 | Ett **språkavsnitt** i den låsta granskarskillen för fakta och språk. |
| D17 | **Rensning vid ny modell** | §8.5 rutinen (1226–1251); §8.7 (1253–1258); fas 8f två punkter (713, 714); §12 "vad men inte hur" (1794); fallgrop 13, 73, 104, 134, 157 | **§8.5.** |
| D18 | **Pilot och kalibrering som villkor för att släppa stopp** | §5.4 (840); §9.6 (1418); §15.2 (2225) | **§9.6.** |
| D19 | **Säkerhetsgranskning** | fas 7 sex alternativ (596–601); fas 8a (625); §5.2-tabellen (795); §8.6 (1308); §12 (1842, 1853); §14 (2159) | Fas 7 med *ett* valt verktyg. |
| D20 | **Advisor** | §5.3 (816–819); §8.6 (1310); §5.2-tabellen (791, 797) | §5.3. |
| D21 | **Monitor** | §6.3 (885); §7.7 (1158–1171) | §7.7. |
| D22 | **`CLAUDE.md`:s innehåll och placering** | §3 (165, 209); §8.1 ärvda regler (1188); §8.7 mall och nivåer (1260–1283); §10.1 låsning (1437–1443); fallgrop 12, 84, 113, 116, 132 | **§8.7.** |
| D23 | **Bänken** | §11.6 (1623) och §11.11 (1640–1649), med olika formuleringar | **§11.11** (se även §4.1 nedan). |
| D24 | **"Vilket perspektiv saknas?"** | fas 6 (507); §11.12 sista stycket (1748) | §11.12. |
| D25 | **Wireframes** | fas 2 två stycken (347, 350); fas 1b gallerivy (323) | Fas 2, ett stycke. |
| D26 | **Nordstjärna** | brief 4b (304–305); fas 1 (284); fas 8a (627); §15.1 (2210); §15.3 (2233) | Brief 4b. |
| D27 | **Behörigheter per roll** | §5.2-tabellen (787–799); 8d (659–669); 8g principer (684); §15.2 (2226); fallgrop 41, 107 | §5.2 (tabellen är redan tänkt som facit, rad 786). |

---

## 3. Motsägelser och inaktuella beslut

### 3.1 Inom guiden

| # | Motsägelse | Rader | Förslag |
|---|---|---|---|
| M1 | **Supabase.** §12 säger på en rad "rekommenderad databas för vägarna B–D" (1858) och på en annan "Supabase behövs inte för statiska sajter" (1890). Cloudflare-researchen gör D1 till huvuddatabas och Supabase till ett val bara för slutanvändarinloggning och redigeringsvy (§4, §10 i rapporten). Dataöverföringsresearchen säger "för enkla formulär- och broschyrsajter rekommenderar vi ingen databas alls" (§5.1.7), medan Cloudflare-researchen vill ha D1 för "spara först". | 379, 586, 1858, 1890, 2140 | En rad: **typ A = D1 (bara inskick), Supabase endast för inloggning eller redigeringsvy, med TIA.** Stryk rad 1890:s Supabase-del. |
| M2 | **Effort.** "Börja med låg effort för alla roller" (1303) mot "lägst medium" för roller som söker (1306), mot "medium för små ändringar, hög för omdesign" i fas 8b (644), mot "håll effort mellan låg och hög" (1304) och xhigh för animationer (1305). Spanaren har "låg effort" i fas 3 och i rolltabellen (392, 790) men "lägst medium" i 1306. Ägarens egen inställning är `effortLevel: "xhigh"` (verifieringsrapporten, rad 157). | 392, 644, 790, 806, 1303–1308 | En tabell per roll med *startvärde* och *källa*. "Låg för alla" bygger på en CodeRabbit-siffra via en AI LABS-video och motsägs delvis av Anthropics dokumentation; den bör inte vara standard. |
| M3 | **Vercel → Cloudflare.** Kvar: "Vercels deployskill passar fas 7" (1890). Projektskillen `nortropic-stack` säger fortfarande Vercel (Cloudflare-researchen, sista tabellraden). Researchens ändringslista tar också upp Cloudflare-raden i 8g och Cloudflare som biträde i integritetspolicyn; ingen av dem är införd. | 1890, 671–700 | Ändra 1890; lägg till Cloudflare i 8g och i integritetspolicyns biträdeslista. |
| M4 | **Dolda kontroller via agentdefinitionen.** Lager 4 säger "via agentdefinitionens verktygsbegränsning och skyddshooken" (1461) och har kvar ⚠️ (1465). §5.2 är rättad: läsrätt per sökväg går inte att sätta per agent (801–804). Researchen tillägger att `Read`-deny inte täcker t.ex. `grep -r` eller ett Python-skript, och att Bash-regler "isn't a security boundary". | 1460–1465, 801–804 | Skriv om lager 4: kontrollerna ligger **utanför** byggarens arbetskatalog (eller i en sandlåda) i stället för att lita på läsförbud. Annars stryk lagret tills vidare. |
| M5 | **Ignore-filer.** `.agentignore` i strukturen (166) och §7.3 (1076). Researchen: `.claudeignore` "has no effect"; `.agentignore` finns inte i dokumentationen. | 166, 1076 | Stryk; använd `permissions.deny` och `.gitignore`. |
| M6 | **Inställningar.** Timeout "t.ex. 120 s" (1193); dokumenterade exempelvärden är `"60s"`, `"5m"`, `"10m"`, `"never"` (standard `never`), och nyckeln gäller bara scope user/managed. Rådet "lägg dem i projektets settings" (1203) fungerar inte för `askUserQuestionTimeout` eller `permissions.defaultMode: "auto"` (bara användarens settings). | 1190–1205 | Ersätt ⚠️ i §8 med de verifierade nycklarna och deras scope. |
| M7 | **Granskarna och `CLAUDE.md`.** §5.2: granskarna läser inte `CLAUDE.md` (780). Fas 4: "lägg en pekare till skillen och Stitch-projektets id i `CLAUDE.md` så att granskningen vet vilket projekt" (410). Skelettet: "Läs Stitch-projektets id från CLAUDE.md" (1906). | 410, 780, 1906 | Id:t finns redan i `state.json` (738). Granskaren får det i sin uppdragsprompt. |
| M8 | **Fas 4 och beteende.** "Två granskare parallellt … en för beteende" (413) mot "Begränsning: granskar bara *utseende*, inte *beteende*" (429, kvar från v0.1). | 413, 429 | Stryk 429. |
| M9 | **Fas 6:s arkitektur.** Fas 6 "körs därför som fyra specialister" (499). §11.4: "Fas 6 körs som heuristisk utvärdering med 3–5 oberoende granskare" (1595). Rad 522 försöker förena dem. Skelettet `story-review` (1916–1930) är fortfarande *en* granskare. Med 4 × 3–5 blir det 12–20 granskare per runda. | 499, 522, 538, 1595, 1916 | Bestäm en modell. För första sajten: en granskare med en checklista. |
| M10 | **Briefens rubriker.** Grinden kräver "alla 7 rubriker" (1013), men briefen har nu 2b, 3b och 4b (300–305), alltså tio. | 1013, 297–308 | Grinden räknar rubriker ur en mall, inte ett hårdkodat tal. |
| M11 | **Skeletten är äldre än reglerna.** `stitch-review` tar helsidesskärmdumpar (1907), mot "beskär och zooma – inte bara helsidesbild" (417). `story-review` säger "scrollytelling-sajt" (1920), mot sidkarta med flera sidor (300). | 1900–1930 | Skeletten skrivs om vid konsolideringen eller stryks tills skillen byggs. |
| M13 | **Scrollytelling som grundantagande.** §1-flödet, fas 5–6 och skeletten utgår från en scrollberättelse i kapitel. Samtidigt: sidkarta "ingen köper en enskild sida" (300), §14 "Sajttyper: bara scrollytelling?" (2152) är öppen, paketen i §15.1 och ägarens nisch (otekniska småföretagare). Scroll World (448–454) bryter dessutom mot fas 5:s egna regler (ingen scroll-jacking, högst en parallax) och mot Lighthouse 90+ i mobil (588). | 97, 300, 433–454, 588, 2152 | Gör **flersidig företagssajt** till normalfallet; scrollberättelse blir en variant av startsidan. |
| M14 | **"Två stopp".** Rubriken och fas 1 lovar två stopp (309, 832), men pilotfasen slår på alla valfria stopp och godkännande av varje rättningsrunda (840). Därtill: prototyp till kund (332), publicering (836), domarens avslag (828), förhör (651, 1535), ändring av låsta filer (645), `arbetssatt.md` (1523), övergivna grindar (1030), `blocked`. I pilotfasen blir det minst åtta slags mänskliga ingrepp. | 309, 832–840 | Skriv det verkliga antalet för pilotfasen. |
| M15 | **Analys.** §11.10: standard är analys på serversidan (1720). 8g: Google Analytics för "förfrågningar och konverteringar" (676). Cloudflare-researchen: Web Analytics som standard, konverteringar räknas i D1. Dataöverföringsresearchen: edge-analys först, Web Analytics osäkert utan banner. | 676, 1720 | Konverteringar = inskick räknade i D1; edge-analys; GA4 bara som tillval. Rätta 8g. |
| M16 | **Publicering "tillval".** Fas 7 är "Tillval tills frågan om publicering i §14 är avgjord" (594, 2157), men plattformen är beslutad, §15.1 säger att bygget levereras som "Flödet, fas 0–7" (2211), och ägarens beskrivning av kundens väg slutar med "går till klart med allt vad det innebär, seo etc" (BESLUT 2026-10-13). | 594, 2157, 2211 | Publicering ingår; frågan i §14 stängs. |
| M17 | **Inaktuella öppna frågor i §14.** "CodeRabbit eller `/security-review`?" (2159) trots sex alternativ i fas 7. Skärmdumps- och testverktyg står som två frågor (2154, 2184) trots att Playwright CLI rekommenderas (1849). Formulärtestmärkning (2169) är besvarad i 633. "Kodstandarden … WCAG 2.2 AA?" (2171) är besvarad i §11.13 (1759). | 2154–2184 | Stäng eller slå ihop. |
| M18 | **Stitch-kommandon.** Tabellen (146–149) har `stitch create project`, som inte finns i researchens kommandolista; projekt skapas med `generate screen --new-project`. `generate variants` har `--count 1–5`. `agent-skills add` skriver till `.agents/skills`, inte `.claude/skills` (jfr fallgrop 1 och rad 130). | 143–149, 130 | Ersätt tabellen med researchens lista. |
| M19 | **Bildoptimering och AI-märkning.** §11.9 kräver konvertering till WebP under 200 kB (1707). AI-förordningsresearchen rekommenderar att AI-metadata och C2PA *behålls* genom bildpipelinen. Det säger guiden ingenting om, och en vanlig WebP-konvertering tar bort sådan metadata. | 1703, 1707 | Lägg till regeln om att metadata behålls, eller dokumentera undantaget. |
| M20 | **Bänkens definition.** Statusraden och uppdraget: "två videor från samma kanal räknas som en källa". §11.11: "… om den ena bygger på den andra" (1645), vilket är villkorat. Guiden räknar dessutom två kanaler som återger samma primärkälla som två källor (Boris Cherny via AI LABS och via Nate Herk, rad 1236; Karpathys wiki via AI LABS OKF och Nate Herk). | 1645, 1236, 1609–1623 | Räkna **per primärkälla**, inte per kanal. Se §4.1. |
| M21 | **Självintervju och "bara *sett* räknas".** Claude ska själv besvara det som går att härleda (272–275), men "bara *sett* räknas som besvarat; ett *härlett* svar går till domaren eller dig" (276). | 272–276 | Förtydliga att små *härledda* val går som antaganden (§6.5), medan *härledda* svar om fakta går till kunden. |
| M22 | **§3 Projektstruktur är inaktuell.** Saknar `referenser/`, `onboarding.md`, `kalibrering/`, `foretag/`, `larande-forslag.md`, `arbetssatt-journal.md`, `.claude/agents/`, `.claude/workflows/`, `andringar/ko.md` och skills som `checkpoint-planner`, `planvy`, `kod-kritiker`. `mods/` har kvar "placering okänd" (188), trots att researchen visar att mods är plugins (`hooks/hooks.json` med `modules`). | 161–216 | Generera strukturen ur den konsoliderade guiden. |

### 3.2 Guiden mot ägarens beslut (`BESLUT.md`, gren `karta-och-inventering`)

Dessa avgör Johnny. `LAGE.md` tar redan upp punkterna 1–4 som skillnader mellan spåren. Punkterna M12 och 5 saknas där.

| # | Guiden | Beslut 2026-10-13 |
|---|---|---|
| 1 | Stitch genererar en ny design per sajt (fas 2) | Kartan: eget sektionsbibliotek och 3–5 stilkit (`LAGE.md`) |
| 2 | Bygg flödet först; första sajten i steg 10 av 21 (§16) | "börja om och ta små steg" |
| 3 | Johnny väljer riktning i stopp 1 (322, 341) | "han tycker riktning 2 var bra, vi går vidare" – kunden väljer |
| 4 | Egen rot-`CLAUDE.md` som bara ändras via Johnny | Kartspåret har redan en `CLAUDE.md` |
| **M12** | **Originalitet:** referenser bara som beskrivningar, originalitetskontroll ger `hög` vid för lik sektion (414), REA "aldrig kod, grafik eller hela sidor" (1655), fånga "bara kundens egen sajt" (266) | **"jag har godkännande för licenser att kopiera, reverse engineera och ta andra företags designer"**; dessutom webb-pros regel att en referens får bära layout, palett och typsnitt men inte identitet, texter eller bilder. Guidens regel är strängare än både beslutet och webb-pros regel. |
| 5 | Nisch och paket är öppna (2186, 2250) | Nischen är beslutad: "otekniska småföretagare som betalar mig för hemsida och förvaltning"; förvaltningen är produkten |

---

## 4. Bänken

### 4.1 Källäget

| Kanal | Transkript | Används i guiden | Status enligt bänkregeln |
|---|---|---|---|
| AI LABS | 44 | 44 | **En källa.** Kanalen återger ofta andras arbete (Shopify Helix, Boris Cherny, Karpathy, Matt Shumers gauntlet). Läses primärkällan i original kan den räknas som egen källa; det har gjorts för Anthropics dokumentation men inte för t.ex. Shopify-artikeln, som är länkad på rad 13. |
| Nate Herk | 18 | 18 | **En källa**, inklusive Ebbelaar-intervjun (Nates kanal) och Boris Cherny-klippen. |
| Jack Roberts | 10 | 7 | **En källa.** Tre transkript används inte och nämns inte i ändringsloggen: hNpC5clEbp4, X2PARg8ErvY, BYQdA7kMmbA. Antingen är de obehandlade, eller så valdes de bort utan att det loggades. |
| Tristen O'Brien, The Coding Sloth | 1 + 1 | 2 | En källa var |
| Dokument ($10K Kit, Websites for Normal People) | 2 sammanfattningar | båda | En källa var. Det är sammanfattningar, inte originaltext (rad 1626). |
| Anthropic-dokumentation, research 2026-10-14, Språkrådet, STORM-artikeln, Supabase- och Remotion-dokumentation | – | ja | Primärkällor |

**Följd:** bänkregeln gäller i praktiken bara tilläggen efter v0.50. Kärnflödet (§1–§10) kom från AI LABS innan regeln fanns och har aldrig prövats mot den. Bänkregeln själv kommer från en enda video (Nate Herks Karpathy-video, rad 67).

### 4.2 Riskabla grindar med en källa

"Grind" = låst kontroll, låst granskningskriterium, grindrad i §7.2 eller ett krav som stoppar flödet.

| Grind | Rad | Källa | Varför riskabel | Förslag |
|---|---|---|---|---|
| **Inga VERSALER** – låst kontroll, `medel` | 546 | Coding Sloth. Transkriptet: *"A funny rule I have in my file … AI models … love to use all caps. No idea why, but it's ugly"* | En persons smak, uttryckligen "a funny rule". Påståendet att versaler är ovanliga i svensk text har ingen källa (🔧). | Bänk: granskningsförslag, inte kontroll |
| **Antimönster: Inter, Geist och Lucide förbjudna** | 1063–1064 | AI LABS designnivå-video | En videos smak blir ett förbud i en blockerande hook. Inter är ett fullt rimligt val för många småföretag. | Bänk; förbud bara per `design.md` för den aktuella sajten |
| **Emils animationsregler som statiska kontroller** (ease-out, < 300 ms, 0,97, 0,9–0,95) | 480–490 | Ett dokument ($10K Kit) som sammanfattar Emil Kowalskis skill | En designers riktvärden blir mätbara krav | Bänk tills Emils skill läses i original och en andra källa finns (t.ex. Material- eller Apple-riktlinjer) |
| **Lighthouse ≥ 90 i alla fyra kategorier, mobil och dator** | 588 | $10K Kit | Tröskeln har en källa. Prestanda 90 på mobil krockar med fas 5 (Scroll World, video, blickfång). | Behåll tillgänglighet, bästa praxis och SEO. Prestanda via Core Web Vitals-gränser (Googles egna, en primärkälla). |
| **WebP under 200 kB** | 1707 | $10K Kit | Godtycklig gräns; krockar med C2PA-metadata (M19) | Bänk; använd Core Web Vitals (LCP) som mått |
| **Samma modell i alla rundor, annars `blocked`** – grind för *alla faser* | 1020, 1315 | AI LABS Fable-video. Transkriptet: *"this is already happened to someone building a game"*, alltså en andrahandsanekdot. | Kan stoppa hela flödet på ett ogrundat påstående. Researchen visar att `PostModelSwitch`-hooken finns, så mekanismen går att bygga, men påståendet är inte verifierat. | Bänk: logga och varna (§7.7), blockera inte |
| **Dolda kontroller (lager 4)** | 1460–1465 | AI LABS (Ouroboros) | En källa och tekniskt ogenomförbar enligt researchen (M4) | Stryk eller bygg om |
| **Granskaren får inte veta rundnumret** | 782 | AI LABS gauntlet-video | En källa. Billig att följa, men står som absolut regel. | Bänk som instruktion. Det är ingen grind. |
| **Granskaren läser inte projektinstruktionerna** | 780 | AI LABS Shopify-video | Shopify-artikeln (rad 13) är inte läst i original | Läs artikeln. Då är den lyft. |
| **"Utan nordstjärna godkänns ingen brief"** | 305 | Nate Herk (konsult-video "fyra luckor"; 5000-timmars- och retainervideon är samma kanal). FDE-videon (AI LABS) stöder mätning av värde men inte grinden. | Blockerar briefen för en första sajt med en fiktiv kund eller en kund utan baslinje (rad 304 tillåter redan "mäts första månaden") | Gör till krav på *förvaltningsavtal*, inte på briefen |
| **Kalibrering ≥ 90 % som villkor för att släppa stopp** | 1418 | Ebbelaar (Nates kanal) plus en egen tröskel | Kräver data som inte finns förrän efter många sajter | Behåll som långsiktigt villkor. Blockerar inte första sajten. |
| **Checkpoint ≥ ~10 min** | 394 | AI LABS Unlazy | Startvärde från en källa | Instruktion, inte grind |
| **Tre testfrågor och överlappskontroll underkänner en pluginversion** | 1328–1330 | Nate Herk, som återger Anthropics skill-creator | Primärkällan är inte läst | Läs skill-creators dokumentation. Då är den lyft. |
| **Rörelsebudget och "passar rörelsen målgruppen?"** – låst kriterium | 302, 504 | Nate Herk Astra-video ("en persons smak", rad 77) | Kriteriet är rimligt men har en källa | Andra källa: WCAG 2.3.3 och NN/g om animation |
| **Ordgräns för hero och sektion** – låst kontroll | 510 | Jack Roberts, som hänvisar till Krug. Krug är inte läst. | Gränsvärdet saknar källa helt ("kalibreras i eval") | Bänk tills Krug eller NN/g läses |
| **Socialt bevis kräver källa och tillstånd** | 514 | Jack Roberts plus marknadsföringslagen (⚠️ inte kontrollerad) | Rimlig, men lagtexten är inte läst | Läs MFL och direktiv 2019/2161. Då är den lyft. |
| **Platshållare stoppar publicering** | 614 | Jack Roberts (🔧-utformning) | Låg risk. Krockar dock med pilot med fiktiv kund utan bilder (§8). | Behåll; lös bildfrågan |
| **E-postbekräftelse påslagen** | 587 | Jack Roberts | Låg risk, gäller bara inloggning | Supabase-dokumentationen är en andra källa |
| **OKLCH och beräknade kontrastpar i `design.md`** | 367 | AI LABS designnivå-video | OKLCH-kravet har en källa. Kontrastkravet har WCAG som källa. | Kontrast enligt WCAG behålls; OKLCH på bänken |
| **Säkerhetsgranskaren kör starkaste modellen** | 597, 1308 | AI LABS Fable 5-video (Mythos-anekdot) | Ingen grind, men en kostnadsregel med en källa | Rimlig. Låt stå som instruktion. |
| **Skill Spector obligatorisk före varje installation** | 1809–1815, 1877 | AI LABS. Verktyget är verifierat; statistiken (en fjärdedel, 1 av 20) har en källa. | Processkrav som gör varje tillval dyrt | Behåll principen "installera inget ogranskat"; verktyget bara vid tredjepartsinstallation |

### 4.3 Lyfta med två oberoende källor (håller)

| Regel | Källor |
|---|---|
| Körbara kontroller skrivs före bygget | AI LABS (loop-videon) + Coding Sloth (*"det är inte testning, det är fusk"*) |
| Separat granskare med färsk kontext | AI LABS (Shopify) + Anthropic, *Prompting Claude Fable 5* |
| Status och rapporter bara med belägg | AI LABS (Unlazy) + Anthropic-dokumentationen + Nate Herk (skills-videon) |
| Den som bedöms är inte domaren | AI LABS (Karpathy-loopen) + Cloudflare `security-audit-skill` README |
| Specialister per aspekt | AI LABS (loop-typ) + Jack Roberts (fem granskande agenter) |
| Faktakontroll mot faktabasen | AI LABS (Fable: 72,6 %) + Jack Roberts (påhittat socialt bevis) + Anthropic |
| Vad, men inte hur, i skills | Nate Herk (context-videon) + Anthropic-dokumentationen |
| Kort tankstreck i svensk text | Nate Herk + Språkrådet via Kunskapsbladet |
| Planera med stark modell, bygg med billig | AI LABS (Opus plan) + Coding Sloth |
| Ny session per uppgift, överlämning via fil | AI LABS (fleet, Shopify) + Coding Sloth |
| Deterministiska skript där svaret är känt | AI LABS (FDE) + Nate Herk (VAULT) |
| Pococks arkitekturskill som kandidat | Nate Herk (Ebbelaar) + AI LABS + Coding Sloth; repot verifierat |
| REA för integrationer | Nate Herk + Jack Roberts |
| Mods (fakta, inte grind) | AI LABS + Nate Herk + officiell dokumentation |
| Samtycke före statistikkakor | Websites for Normal People + LEK 9:28 / PTS (research) |
| SEO-grunder (titel, meta, sitemap, schema) | Två dokument + Jack Roberts. Bör ändå få Google Search Central som primärkälla. |

### 4.4 Skenbart lyfta (samma primärkälla)

| Regel | Varför det inte är två källor |
|---|---|
| **Blind jämförelse mot referenser** (547) | Jack Roberts: *"it's a design version of a really cool technique called the gauntlet loop"* (IYNAyRkUsjI) och *"It was called the gauntlet loop by gentleman who discovered it"* (NAumQObJEwM). AI LABS-videon bygger på samma Matt Shumer-prompt (D_uojDHkbw4, rad 25). Enligt guidens egen regel (1645) är det en källa. AI LABS säger dessutom att mönstret *"falls apart on a real project … the moment you build something new with nothing to copy"*. |
| **Ingen text inbränd i bild eller video** (518) | Tristens video handlar om att Claude Motion skriver animation som kod. Den formulerar ingen regel om text i bild. Det verkliga andra belägget är **WCAG 2.2, 1.4.5 Images of Text (AA)**, som guiden inte nämner. Regeln håller, men på fel grund. |
| **Rensa instruktioner vid ny modell** (1226–1244) | Både AI LABS och Nate Herk återger Boris Cherny. Anthropics dokumentation (1794) är den oberoende källan. |
| **Kunskapsbas som wiki** (1609–1623) | Både OKF-videon (AI LABS) och Karpathy-videon (Nate) bygger på Karpathys *LLM Wiki*-gist. Det är metod, inte grind, så det spelar mindre roll. |
| **Tillsyn efter konsekvens, utkast i stället för utskick, rabattkoden** (661–669, §15.2) | VAULT-, 1-person- och 5000-timmarsvideon är alla Nate Herks kanal. Guiden noterar det för rabattkoden (669) men inte för reglerna. AI-förordningsresearchen (människa i loopen för kundsvar) är en möjlig andra källa. |

---

## 5. ⚠️-inventering

Räkning: 184 ⚠️-tecken på 181 rader (uppdraget angav cirka 170). Grupperna nedan är ungefärliga, och en rad kan höra till två grupper.

| Grupp | Antal rader (ca) | Vad | Åtgärd vid konsolidering |
|---|---|---|---|
| **A. Lösta av researchen 2026-10-14** | 33 | Se listan nedan | Ersätt ⚠️ med 📄 och sökväg; ändra texten där svaret var nej |
| **B. Källförbehåll** (sponsring, affiliate, andrahand, "en persons smak", Nates tolkning) | 26 | 51–80 i källistan; 350, 456, 468, 544, 669, 1097, 1251, 1288, 1311, 1736, 2192, 2237, 2239, 2256 | Inga verifieringsfrågor. De blir **metadata per källa** i wikin (fältet *sammanhang* enligt rad 1646) och tas bort ur löptexten. |
| **C. Juridik** ("inte juridisk rådgivning", osäkert rättsläge) | 14 | 514, 845, 1659, 1702, 1714, 1720, 1751, 1760, 1763, 1771, 2202, 2236, 2244, 1624 | Öppna tills jurist. Blockerar **betalande kund**, inte en första egen pilotsajt utan analys och med minimalt formulär. |
| **D. Tredjepartsverktyg och tillval som inte prövats** | 75 | Nästan alla rader 1782–1898 i §12 samt 244, 283, 328, 340, 366, 368, 454, 471, 473, 490, 494, 534, 537, 561, 564, 596, 598, 599, 626–628, 640, 650, 775, 1307, 1351, 1378, 1395, 1530, 1675 | Ersätt ⚠️ med en statuskolumn: *kandidat / prövas / infört / avvisat*. Inget av detta behövs för första sajten. |
| **E. Öppna tekniska och processfrågor** | 30 | 254, 316, 333, 347, 379, 520, 536, 552, 606 (D1-delen), 608, 633, 634, 980, 1058, 1090, 1111, 1118, 1188, 1304, 1305, 1386, 1388, 1575, 1587, 1627, 1641, 2198, 2199, 2214, 2242, 2266 | Se tabellen över blockerare nedan |

### 5.1 Grupp A – lösta av researchen

| Rad | Fråga | Svar i researchen |
|---|---|---|
| 116, 121 | Node ≥ 20, installation | Bekräftat: `@google/stitch`, Apache-2.0, Node ≥ 20 (stitch-och-verktyg) |
| 130 | Målmapp för Stitch-skillen | `agent-skills add` skriver till `.agents/skills`. Googles skills installeras med `npx plugins add google-labs-code/stitch-skills --scope project --target claude-code`. Om Claude Code läser `.agents/skills` är **ej bekräftat**. |
| 143, 154 | Kommandotabellen | Ersätts av researchens lista (M18) |
| 188, 860 | Mods: placering och version | Mods är plugins (`hooks/hooks.json` med `modules`), kräver 2.1.287 (terminal) eller 2.1.286 (Desktop). Lokalt är 2.1.281 installerat. |
| 230 | .se hos Cloudflare | Stöds inte (research uppmanar ändå till manuell kontroll av TLD-listan) |
| 380 | Rate limiting på Free | Bekräftat svag (1 regel, per IP, 10 s) |
| 606 | Förhandsadresser publika | Bekräftat; skyddas med Access. *Om de delar D1 med produktion* är fortfarande öppet. |
| 751 | Hook som lägger till kontext | Ja: `UserPromptSubmit` och `SessionStart` (stdout eller `additionalContext`, max 10 000 tecken) |
| 767 | Arbetsflödens format och kostnad | JS i `.claude/workflows/`, `agent()`/`pipeline()`/`parallel()`, standard max 16 samtidiga agenter, varning vid > 25 agenter eller 1,5 M token |
| 773 | `/goal` | Finns sedan 2.1.139; utvärderaren läser bara transkriptet |
| 803, 1324, 1465 | Hooks i plugin-agenter och läsrätt per agent | Ignoreras i plugin-agenter; sökvägsbegränsning per agent stöds inte (M4) |
| 819 | Advisor | Experimentell, `/advisor`, kräver Anthropic API |
| 887 | `stitch serve` | `stitch serve -p <id>` |
| 938 | `claude agents`, `--bg`, `/bg` | Finns i 2.1.281 (research preview) |
| 1008 | Stop-hook med exit 2 | Bekräftat; tak på 8 fortsättningar i rad |
| 1076 | Ignore-filer | `.claudeignore` har ingen effekt (M5) |
| 1171 | Monitor | Finns sedan 2.1.98; på Windows krävs Git Bash |
| 1177, 1203, 1205 | Settings-nycklar och modell per agent | Bekräftade nycklar; per agent via `model`/`effort` i frontmatter; vissa nycklar bara i användarscope (M6) |
| 1224 | `/doctor` | Bundlad skill (alias `/checkup`); `prompt-audit` kräver 2.1.283 |
| 1338 | Pluginformat och marknadsplats | Bekräftat, inklusive versionslåsning med `ref`/`sha`/semver |
| 1467 | Syntax för deny-regler | `Bash(git push *)`, `Read(./.env)` m.fl. |
| 404 | `/batch` | Finns; kräver git-repo |
| 562 | Pococks skill | `codebase-design` och `improve-codebase-architecture`, MIT. Thermonuclear är fortfarande overifierad. |
| 1834, 1835, 1864, 1877, 1891 | Hallmark, Inspo, Googles skills, Skill Spector, Variate | Licenser och adresser verifierade (innehållet i skillsen är inte granskat) |

### 5.2 Blockerar byggstart

| Fråga | Rad | Blockerar | För första sajten |
|---|---|---|---|
| Hur wireframes tas fram med Stitch-CLI:t | 347 | Fas 2 "wireframes först" | **Ja**, om Stitch väljs |
| Stitch-kvoter och kostnad | 2156 | Fas 2 och eval | **Ja**, om Stitch väljs (mäts i första körningen) |
| Om Claude Code läser `.agents/skills` | – (research) | Fas 0-grinden | **Ja**, om Stitch-skillen används |
| `STITCH_API_KEY` för obevakad körning | 141 | Obevakad fas 2 | Nej, kör bevakat första gången |
| Designsättet (Stitch eller stilkit) | `LAGE.md` | Allt efter fas 1 | **Ja.** Beslut, inte verifiering. |
| Bildkälla för en kund utan egna foton | 1709, 614 | Platshållarkontrollen stoppar publicering | **Ja**, om sajten ska publiceras |
| Delar förhandsvisningar D1 med produktion? | 606 | Staging med formulär | Nej, om formuläret testas mot en separat staging-Worker |
| Web Analytics utan banner | 1720 | Val av analys | Nej: kör edge-analys eller ingen analys |
| Designregelvaktens undantag | 1058 | Regelvakten | Nej, vakten skjuts upp |
| Juridikfrågorna i grupp C | – | Betalande kund | Nej för pilot |
| Claude Code 2.1.281 mot funktioner som kräver 2.1.283–2.1.287 | – | Mods, `prompt-audit` | Nej, om mods skjuts upp |

---

## 6. Struktur

### 6.1 Ordningsfel och trasiga konstruktioner

| Var | Fel |
|---|---|
| §6 | 6.1–6.6, sedan **6.9, 6.8, 6.7** (rad 940, 949, 959) |
| §8 | 8.5, **8.7** (1253), **8.6** (1287), 8.8 |
| §11 | 11.6, **11.11** (1629), 11.7, 11.8, 11.9, en ensam `---` (1711), **11.10**, 11.12, 11.13 |
| Fas 8 | 8a, 8b, 8c, 8d, **8g** (671), 8e, 8f |
| §10.1 | **Trasig tabell:** raderna *Hooks, Inställningar, Granskarnas kriterier, Kodstandarden, Eval-sviten* (1444–1448) står efter två stycken text och renderas som en tabell utan rubrikrad. Låslistan är alltså delad i två. |
| §10.3 | Stycket "Kontroller åldras" (1471) ligger före videoreferatet det kommenterar (1472). "Ny fas 1b – Kontroller (mellan brief och design)" (1474) är historisk text från v0.5. |
| §11.7 | Två punkter numrerade "4." (1675, 1676) |
| §10.5 | "Gate 4 – din slutgranskning" (1533) är stopp 2 och ligger under auto loopen. Samma sak heter tre saker: *Gate 4*, *stopp 2* och *slutgranskning*. |
| §7.2 | Grindtabellen blandar per-fas-rader med två "Alla faser"-rader mitt i (1020, 1022) |
| Fas 5 | Designkällor som inte rör animation ligger här: Land-book och Coolors (463), sektionsgallerier (464), typsnitt (465). De hör till fas 1b/2 (referenser och `design.md`). |
| Källistan | 79 rader i statusblocket före §1. Den bör bli en källsida per video i wikin. |
| Ändringsloggen | 23 kB, nästan lika stor som §12. Hör hemma i git-historiken eller en egen fil. |

### 6.2 Avsnitt som vuxit för stora

| Avsnitt | Storlek | Problem |
|---|---|---|
| §12 Skills att skapa | 23 kB, 75 tabellrader | Blandar egna skills, tredjepartskandidater, avvisade verktyg och principer. Bör delas: *egna skills* (kort), *verktygsregister* (egen fil med status), *urvalsprincip*. |
| Ändringslogg | 23 kB | Se ovan |
| §13 Fallgropar | 20 kB, 196 punkter | Se 6.3 |
| Fas 8 Förvaltning | 17 kB | Hälften är 8g:s utredning av kopplingar. Det är research, inte flöde, och kan flyttas till `kunskap/research/`. |
| Fas 6 | 13,5 kB | Fyra specialister, heuristik, blind jämförelse, siffror, blickprov, fyra språk- och typografiregler i ett avsnitt |
| Fas 5 | 10,6 kB | Fyra alternativ till scrollytelling (Scroll World, Scrollcraft, Remotion, Jacks rörliga grafik) plus en länkkatalog |
| §7.3 | 8,3 kB | Skyddshook, designregelvakt, antimönster, hemligheter, ignore-filer, extern text, kassaskåp och sandlåda i ett avsnitt |
| §8.6 | 8,2 kB | Promptregler, effort, modellval, Astra, tyst modellbyte och kostnad |

### 6.3 Fallgroparna i §13

| Kategori | Antal (ca) | Exempel | Åtgärd |
|---|---|---|---|
| **Dubblett av en regel som redan står i rätt avsnitt** | ~165 | 9, 15, 16, 31, 52, 59, 75, 97, 122–127, 185–196 | Stryk ur §13. Formuleringen blir *varför* och källcitat i regelns wikisida. Rad 1792 säger redan att fallgroparna ska bli förbud i rätt skill. |
| **Dubbletter inom §13** | 14 par/grupper | 39 = 88 (effort); 52 ≈ 148 ≈ 40 (status utan belägg); 58 = 185 (förhandsvisningslänkar); 95 = 166 = 177 (licens); 154 ≈ 155 (massutskick); 13 ≈ 73 ≈ 104 ≈ 134 (inaktuella instruktioner); 23 ≈ 80 (lång kontext); 76 ≈ 79 ≈ 81 (parallella agenter); 43 ≈ 150 (bygga för mycket); 3 ≈ 19 (mobil); 129 ≈ 169 ≈ 196 (AI-signaturer i text); 38 ≈ 180 ≈ 167 (påhittade fakta); 10 ≈ 115 (radering); 42 ≈ 125 (formulär) | Slå ihop |
| **Saknar regel; bör bli regel** | 6 | **6** *Långa körtider* → en **tidsbudget per fas och per sajt**. Det är ägarens huvudklagomål ("tiden det tar att bygga en hemsida är alldeles för lång"), och guiden har ingen sådan budget. **29** *Cookie-rutor i referensbilder* → regel i referensfångsten (fas 1b). **85** *Ett designsystem ger konsekvens, inte karaktär* → princip i fas 2 och direkt relevant för stilkitsfrågan. **47** *Fler skills är inte bättre* → **tak för antal skills** i projektet. **1** *Skills i fel mapp* → konkret fas 0-regel om `.agents/skills`. **61** *Utan förebild hittar kritikern på en egen standard* → kravet att varje bedömning har en referens. | Skriv in i rätt avsnitt |
| **Hör till företaget, inte bygget** | 13 | 150–153, 167, 168, 171–174 | Flytta till §15 eller en egen affärsfil |
| **Meta om konsolideringen** | 2 | 135, 136 | Flytta till wikins metodsida |

---

## 7. Komplexitet

### 7.1 Ungefärliga antal

| Vad | Antal | Underlag |
|---|---|---|
| Låsta kontroller och grindvillkor | **~60** | §10.3 standard 5, fas 0b/7 404 1, fas 5 Emil 5, fas 6 4, fas 6c 11, fas 7 4, §11.10 samtycke 4, §11.9 1, §7.3 vakter ~7, §10.2 2, §5.2 1, §7.2 grindrader och bevis 11, §8.8 skilltester 3, §6.5 1. "Låst kontroll" förekommer 50 gånger. |
| Agent- och granskarroller | **~20 roller**, varav ~14 bedömande | Utseende, beteende, 4 specialister, 3–5 heuristikgranskare, blind jämförelse, kodkritiker + rättare, säkerhet (flera parallella), angripare på planen, 7 kantfallsagenter + kritiker, riktningsagenter + kritiker, löften mot resultat, domare, advisor, spanare, utforskningstest, Nielsen-expert, 5 STORM-linser + saknad lins, AEO, ärendeagent, arkitekturgranskning |
| Agentanrop per bygge, före rättningsrundor | **≥ 35** | Fas 1b ~13, fas 2 ≥ 3, fas 4 2, fas 6 4–20, fas 6b 2+, fas 7 ~5 |
| Egna skills att skapa | **~30** (guidens egen siffra, rad 1784); 9 namngivna i §12 | Därtill 2 hooks, ~4 skript, 1 kommando, 2–6 mods |
| Tredjepartskandidater och tillval | **~48** i §12 (+ 17 avvisade) | Därtill ~20 länkkällor i fas 5 och ~12 MCP-servrar |
| Mänskliga ingrepp i pilotfasen | **≥ 8 slag** | M14 |
| Öppna frågor | 33 | §14 |
| Fallgropar | 196 | §13 |

### 7.2 Bedömning mot beslutet 2026-10-13

Webb-pro slutade med 61 skills (67 krockar), 112 beslutsavsnitt, 220 backloggposter och ingen lanserad sajt. Claudes analys i `historik/webb-pro.md` pekar på fyra mekanismer. Guiden upprepar alla fyra:

| Webb-pro | Guiden v0.73 |
|---|---|
| *Rören verifierades, inte vattnet* | ~60 kontroller av mekanik. Måttet på om sajten är **bra** (blind jämförelse, kalibrering mot Johnny) kräver data som först finns efter många sajter. Det finns ingen bedömningsmall för vad en bra sajt är för målgruppen. |
| *Johnnys ord blev mekanik* | Varje video blev mekanik: 74 videor gav 73 versioner, och nästan varje version lade till en kontroll, en roll eller ett tillval |
| *Det komplexa kom före det enkla* (Galls lag) | §16: kunskapsbas, hooks, låsning, planvy och checkpoint-planerare före den första sajten (steg 10 av 21). Auto loop, eval och kalibrering är fullt specificerade utan en enda sajt att mäta på. |
| *Regler och checklistor drar mot genomsnittet* | Förbud mot Inter och Lucide, millisekundregler, ordgränser och 196 fallgropar är fler regler av samma sort |

Guiden är ett bra **register** över idéer med källor, men ingen plan för en första sajt.

### 7.3 Vad som behövs när

| Nivå | Innehåll ur guiden |
|---|---|
| **1. Första sajten** (en verksamhet, Johnny tittar hela tiden, bygget sker interaktivt) | Intervju → kort brief med sidkarta och primär handling; faktafil; tre riktningar (enligt besluten i §3.2, punkt 1, 3 och M12); `design.md`; Astro statiskt; en byggare; **en** granskare med färsk kontext mot brief och referens; ~10 kontroller (§7.4); Johnnys slutgranskning; publicering på Cloudflare om sajten ska ut. Inga hooks utöver `permissions.deny` för push, deploy och `.env`. |
| **2. Sajt 2–5** (mönster syns, mindre tillsyn) | Stop-hook-grind (§7.2) med bevis; `godkann-kontroller` och låsning av brief och kontroller (§10.2, lager 1–3); designregelvakt (§7.3) när en riktig `design.md` finns; formulär med Turnstile + D1 (fas 3); staging bakom Access; samtycke och integritetspolicy; SEO-kontrollerna i fas 6c; resultatlogg (§10.4); `/code-review` en gång före publicering i stället för kritiker ↔ rättare. |
| **3. Förvaltning** (betalande kunder) | Fas 8a–8d och 8g; ärendeagent (§15.2); kundavtal och biträdesavtal; juridikfrågorna i grupp C; kalibrering (§9.6) när Johnnys domar finns |
| **4. Skala** (många sajter, obevakat) | Auto loop, eval-svit, Caliper, plugin med versioner och stegvis utrullning, parallella checkpoints med worktrees, sandlåda, mods och flödespanel, Jev, domare, advisor, adversarial plangranskning, STORM-linser, REA, Variate, Scroll World, AEO |

### 7.4 Kontrollerna för första sajten

Bara kontroller som har en primärkälla eller minst två oberoende källor, och som mäter något kunden märker:

1. Bygget går igenom utan fel (`astro build`).
2. Inga konsolfel; alla bilder laddas (§10.3).
3. Ingen horisontell scroll i 375 px (§10.3).
4. Den primära handlingen fungerar hela vägen: telefonlänken eller formuläret når fram (§10.3, "godkänd men inte inkopplad").
5. Varje faktapåstående finns i `fakta.md` (§11.8; tre källor, §4.3).
6. Inga platshållare eller lorem ipsum (fas 7, steg 10).
7. Unik titel, metabeskrivning och en `h1` per sida; `sitemap.xml` (fas 6c; Google Search Central som primärkälla).
8. Kontrast enligt WCAG 2.2 AA och alt-texter (WCAG).
9. Lighthouse tillgänglighet, bästa praxis och SEO ≥ 90 (prestandan mäts men stoppar inte, §4.2).
10. Inga hemligheter i repot eller i klientkoden (§7.3, fas 6c).

Därtill Johnnys slutgranskning med en kort motivering per avvisning (blir kalibreringsdata, §9.6).

---

## 8. Luckor inför byggstart

Main innehåller i dag bara guiden, `kunskap/raw/`, `kunskap/research/`, README och `.gitignore`. Det finns inget `CLAUDE.md`, ingen `.claude/`, ingen `sites/`, inga skript och inga skills.

### 8.1 Beslut som saknas (Johnnys)

1. **Vilken verksamhet** blir den första, och vem svarar på intervjun? `LAGE.md` rekommenderar en människa som känner verksamheten.
2. **Designsättet:** Stitch per sajt eller stilkit (`LAGE.md`, punkt 1).
3. **Vem som väljer riktning:** Johnny eller kunden (M12-tabellen, punkt 3).
4. **Referensregeln:** guidens originalitetsregel, webb-pros regel eller beslutet om licenser (M12).
5. **Stack:** bekräfta Astro statiskt för typ A (§14, rad 2139, väntar på bekräftelse).
6. **Publiceras första sajten?** Om ja: domän, Cloudflare-konto, Resend-konto och Turnstile-nycklar är mänskliga klick (fas 0).
7. **Bildkälla** för en kund utan egna foton: licensierade stockbilder, kundens foton eller ingen publicering. Ärlighetsregeln och platshållarkontrollen gör annars en pilot med en fiktiv kund opublicerbar.
8. **Tidsbudget:** hur lång tid får en sajt ta? Det saknas helt (fallgrop 6) trots att det var huvudskälet till att börja om.

### 8.2 Filer och mallar som saknas

| Fil | Varför | Finns underlag |
|---|---|---|
| `CLAUDE.md` (≤ 60 rader för första sajten) | Projektbeskrivning, hårda regler, pekare | Mall i §8.7; kartspårets `CLAUDE.md` |
| `.claude/settings.json` med `permissions.deny` | Push, deploy, `.env` | Syntax verifierad i researchen |
| **Briefmall** `mallar/brief.md` | Guiden har bara en punktlista (297–308) | Webb-pros `kundintervju.md` (A–J) enligt `historik/webb-pro.md` |
| **Intervjufrågor** | `brief-interview` finns inte | Fas 1 och webb-pros intervjuguide |
| `fakta.md` (en fil räcker för första sajten) | Faktakontrollen kräver den | §11.8 |
| Format för `design.md` | Stitch-skillens mall eller eget format; obligatoriska delar ej angivna | Googles `design-md`-skill |
| **Astro-skelett** för en företagssajt (startsida, tjänst, om oss, kontakt, 404, integritetspolicy) | Ingen startpunkt finns | Webb-pros Astro-komponenter och Cloudflare-leveransmall; `npm create cloudflare@latest -- --framework=astro` |
| Formulärroute (Worker + Turnstile + D1) | Om sajten har formulär | Cloudflare-researchen §3 |
| **Kontrollskript** (Playwright) med de tio kontrollerna i §7.4 | Det enda mätbara | §10.3, fas 6c |
| **Granskningsmall** för den enda granskaren: vad, mot vilken referens, vilka fält | Skeletten är inaktuella (M11) | Fasta fält, rad 420–425 |
| **Bedömningsmall för en bra sajt** (Johnnys smak) | Ingen måttstock för vattnet | `LAGE.md`: bedöm 30–40 skärmdumpar som godkänd eller underkänd med en kort kritik |
| Mall för integritetspolicy | Krävs om formuläret samlar personuppgifter | Dataöverföringsresearchen §5.2 |
| Schema för `state.json` och rapport-JSON | §16 steg 6 är inte gjort | §5.1, §6.5, §7.4 |

### 8.3 Miljö

- Claude Code 2.1.281; senaste är 2.1.300. Mods, `prompt-audit` och vissa filter kräver nyare version.
- Stitch-CLI, Playwright och Wrangler är inte installerade i projektet (inget `package.json`).
- `kunskap/wiki/` finns inte. §16 steg 9 vill ha Nielsen, Laws of UX och WCAG före första sajten, men det behövs inte för att bygga den.

### 8.4 Vad som bör göras före konsolideringen

1. Avgör om de tre obehandlade Jack Roberts-transkripten (hNpC5clEbp4, X2PARg8ErvY, BYQdA7kMmbA) ska in, eller logga att de valts bort. Statusraden säger att konsolideringen väntar tills videogenomgången är klar.
2. Bestäm bänkregelns definition (M20): per primärkälla eller per kanal.
3. Fatta besluten i 8.1. De avgör vilka delar av guiden som alls ska konsolideras före första sajten.

---

## 9. Förslag till konsolideringsordning

1. **Frys guiden som register** (v0.73) och bygg den första sajten enligt nivå 1 i §7.3 innan något mer konsolideras. Det följer Galls lag och beslutet 2026-10-13.
2. Rätta de rena felen, som inte kräver beslut: M3, M5, M7, M8, M10, M11, M18, den trasiga tabellen i §10.1 och ordningsfelen i §6, §8, §11 och fas 8.
3. Wikin byggs **regel för regel ur det den första sajten faktiskt använde**, med citat och källa. Det som inte användes stannar i registret med status *kandidat*. Då blir bänken ett verkligt filter och inte en efterhandskontroll av 196 punkter.
4. Fallgroparna slås in som *varför* i respektive regel. De sex utan regel skrivs in (6.3).
5. Linserna i §11.12 används på de beslutskritiska motsägelserna (M1, M2, M12–M16). Det räcker med en karta över motsägelser för dem, inte för hela guiden.
