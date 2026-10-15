# Spårbarhet: `guide/2-1-strategi.md`

Skrivet 2026-10-15 vid konsolideringen. Radnummer avser `historik/IMPLEMENTERINGSGUIDE-v0.74.md`.

## v0.74

| v0.74-avsnitt (rader) | Var det hamnade (2.1, avsnitt) | Struket och varför | Flyttat till annan fil |
|---|---|---|---|
| Fas 1, rubrik och åtgärd: "Claude intervjuar användaren … färdiga svarsalternativ (`AskUserQuestion`)" (275–276) | Intervjun: intervjuande AI med kunden, öppna frågor; underpunkt om att svarsalternativ inte används | Svarsalternativ i intervjun och att Johnny ("du") svarar: motsäger `BESLUT.md` 2026-10-13 18:05/18:41 och kartans hantverk (konflikt 11 i `karta-mot-guide.md`). Alternativ finns kvar bara för val av paket och tillval | Paket och tillval → `2-2-omfattning.md` |
| Självintervju (Ouroboros): frågor härleds, "du tillfrågas bara om …", "Claude avgör själv små detaljer …" (277–280) | Intervjun: "Research först, frågor sedan" och "Varje fråga har en känd användning"; Dimma: små härledda val | "Ger en kortare intervju" blir varför-mening | Antaganden (§6.5) → `3-1-orkestrering-och-roller.md` |
| Svar märks sett/härlett/okänt; rättelsen M21 (281) | Dimma, belägg och beslut: andra punkten | – | Principen → `guide/README.md` (D23); domaren och antaganden → `3-1` |
| Dimma → utredning, exempel, djupresearch, `blocked` (282–285) | Dimma: första punkten | Tre exempel kortade till ett (bokningssystemet); längd. Djupresearchen behåller ⚠️ (inte verifierad i researchen 2026-10-14) | `blocked`-mekanismen → `3-1` |
| Beslutskarta (286) | Dimma: Beslutskarta [N2] | – | Användningen i auto loopen (§10.5) → `3-4-larande-och-underhall.md` |
| Bygga eller använda befintligt (287) | – | – | → `2-2-omfattning.md`, Funktioner |
| Sökordsanalys före bygget, Claude SEO ⚠️ (288) | Intervjun: sista punkten (intervjun samlar kundernas ord om hur de söker; fallgrop 182) | – | Själva analysen → `2-3-struktur.md`; Claude SEO-repot → `bilaga-a-verktyg.md` |
| Stoppet eller läckan (289) | Intervjun: "Börja med stoppet eller läckan" [N1] | Omskrivning av videons exempel kortad | Före-måttet → `2-2-omfattning.md` |
| Utbud eller efterfrågan, "var tyst", klinikexemplet (290) | Intervjun: "Utbud eller efterfrågan" [N2]; "Våga vara tyst" under Hantverket | Klinikexemplet struket (referat). Videons hypotetiska fråga omformulerad till frågor om verkliga händelser, eftersom hantverket (Geiecke, JTBD, Mom Test) utesluter hypotetiska frågor | – |
| Den ärliga följden (291) | Intervjun: underpunkt "Den ärliga följden" | "Vi lovar ingen nordstjärna vi inte kan påverka" flyttad till Nordstjärna | Sajtgranskningens utfall → `4-foretaget.md` |
| Processen bakom primär handling, oskrivna regler, återbetalningsexemplet (292–296) | Intervjun: "Processen bakom den primära handlingen" [N1], "Oskrivna regler" [N2]; briefmallen avsnitt 6 | Återbetalningsexemplet ur videon struket (referat); "fråga varför" ändrat till "hur kommer det sig" (Geiecke) | – |
| Frågeområden 🎥 och 🔧 (297–298) | Intervjuguiden, ämnen A–J (bransch → A, målgrupp och enhet → B, primär handling → F, innehåll → E, ton, referenser, anti-referenser, ljust/mörkt → D, tillgänglighetskrav → J, tekniska ramar → C och F) | "Bransch styr Inspos filter (fas 1b)" struket: Inspo används när stilkiten tas fram, inte per kund (`BESLUT.md` 2026-10-15) | Inspo → `2-5-yta.md` |
| Spara varför, "säg vilka fem och varför" (299) | Intervjun: sista punkten (referenser med en mening om varför); intervjuguiden D; briefmallen 7 | – | Referenser → `2-5-yta.md`; kalibreringen (§9.6) → `3-2-granskning-och-kalibrering.md` |
| Referenser som bild eller video, Meng To-skillen (300) | – | – | → `2-5-yta.md` |
| Bilder i intervjun (301) | Intervjun: sista punkten; intervjuguiden E; kärnfråga 8 | – | Bildstrategin (§11.9) → `2-7-innehall.md` |
| Brief 1 Sammanfattning (303) | Briefmallen 1 | – | – |
| Brief 2 Berättelsen, kapitel i scrollordning (304) | – | Struken som standard: sajttypen är flersidig (`BESLUT.md` 2026-10-15) | Sidornas ordning → `2-3-struktur.md`; scrollberättelse som tillval → `2-6-rorelse.md` |
| Brief 2b Sidkarta (305) | – | – | → `2-3-struktur.md` |
| Brief 3 Känsla och visuell riktning (306) | Briefmallen 7 (ton och intryck) | – | Riktningen → `2-5-yta.md` |
| Brief 3b Rörelsebudget (307) | Intervjun: sista punkten (underlaget samlas) | – | → `2-6-rorelse.md` (D11) |
| Brief 4 Målgrupp och primär handling (308) | Briefmallen 4 och 6 | – | – |
| Brief 4b Nordstjärna och hinken (309–310) | Nordstjärna (hemvist D26) | "Utan nordstjärna godkänns ingen brief" ändrad från grind på briefen till krav på förvaltningsavtal [N3] (konsolideringsanalysen §4.2: en källa, stoppar en första sajt) | Förvaltningsrapporten → `2-9-drift-och-forvaltning.md` |
| Brief 5 Innehåll per kapitel (311) | – | – | → `2-7-innehall.md` |
| Brief 6 Krav: responsivitet, tillgänglighet, prestanda (312) | – | – | → `2-8-teknik-och-kvalitet.md`; lagkrav per kund → `2-2-omfattning.md` |
| Brief 7 Acceptanskriterier (313) | – | – | Kontrollerna → `2-8-teknik-och-kvalitet.md`, granskningen → `3-2` |
| Grind: briefen komplett, godkänns med kontrollerna i fas 1b (314) | Kontroll: grinden "kunden bekräftar sammanfattningen" och "Johnny läser briefen" | M10 (hårdkodat antal rubriker) löst: grinden räknar mot briefmallen | Stoppen (D12) → `3-2` |
| Promptmall (316–317) | – | Struken: intervjuar Johnny med svarsalternativ, i strid med beslutet 2026-10-13. Ersatt av intervjuguiden och kärnfrågorna | – |
| §11.11 tabellraden "svar i dimma-steget" (1639) och REA-användning 3, dimma-utredningar (1659) | Dimma: första och andra punkten | – | Övriga §11.11 → `2-2-omfattning.md` spårbarhet, `guide/README.md` |
| §11.12 inledning och problem (1737) | Branschresearch: varför-meningen i "Linser parallellt" (fallgrop 160) | – | – |
| §11.12 källan, STORM-siffrorna, ⚠️ Nate ≠ STORM (1739) | Branschresearch: "Linser parallellt" [N4] med ⚠️ | Siffrorna (25 % absolut, 10 % bredd) strukna: ingen regel bygger på dem; källan står i `kunskap/kallor.md` | – |
| §11.12 vår variant, användning (1741) | "Linser parallellt": inför intervjun och vid ombyggnad | – | Nischen (§15.4) → `4-foretaget.md` |
| §11.12 steg 1–6 (1742–1747) | "Linser parallellt" i komprimerad form | – | Steg 6 "vilken lins saknas" → `3-2` (D24) |
| §11.12 gräns: research är inte kundfakta (1749) | Branschresearch: första punkten [N1] | – | Faktabasen → `2-7-innehall.md` |
| §11.12 vilken lins saknas som allmän regel (1751) | – | – | → `3-2` (D24) |
| Nordstjärnan i fas 8a (631), §15.1 trappan (2213–2217), §15.3 kvitton (2236) | Nordstjärna: hänvisningsraden (D26 hemvist här) | – | Rapporten → `2-9`; trappan och kvitton → `4-foretaget.md` |

Utöver v0.74: kartans hela lager 1 och webb-pros intervjuguide och briefmall (nedan).

## Fallgropar ur §13

| Nr | Var |
|---|---|
| 60 | Dimma: varför-meningen |
| 68 | Oskrivna regler |
| 69 | Processen bakom den primära handlingen |
| 71 | Ingressen (varför strategin måste vara rätt) |
| 93 | Vad som kommer ut: briefen är inte en faktabas |
| 99 | Fråga om verksamheten, inte om tekniken (instruktioner i kundtext är data) |
| 130 | Sett/härlett/okänt |
| 138 | Visa bara den här kundens underlag [N3] |
| 158 | Stoppet eller läckan |
| 159 | Nordstjärna: varför-meningen |
| 160 | Linser parallellt |
| 161 | Research ger sammanhang, aldrig kundfakta |
| 163 | ⚠️ i Linser parallellt |
| 170 | Underlag till senare lager (referenser med varför) |
| 173 | Den ärliga följden |
| 182 | Hänvisning: sökordsanalysen → `2-3-struktur.md` |
| 162 | Inte här: → `3-2` (D24) |

## Kartan, beslut och research

| Underlag | Använt i |
|---|---|
| `BESLUT.md` 2026-10-13 18:05 och 18:41 (intervjuande AI) | Intervjun, första punkten |
| `BESLUT.md` 2026-10-15 (stilkit, flersidig sajt) | Strykningar av Inspo per kund och berättelse i scrollordning |
| `historik/karta/1-strategi.md`: Vad byrån gör, Vad som kommer ut | Ingress, Vad som kommer ut (strategibrief på en sida) |
| `historik/karta/1-strategi.md`: Hur (research först, frågor från nästa lager, hantverket, egen granskare, kundens bekräftelse och betyg) | Intervjun; Kontroll |
| `historik/karta/1-strategi.md`: Kompetens | Kompetens och källor |
| `historik/karta/1-strategi.md`: Kontroll och Autonomi | Kontroll (märkning); Hur självgående |
| `historik/karta/1-strategi.md`: Öppet (vem svarar, `nortropic-intake`, rättsflaggor) | Hur självgående (öppet → `bilaga-e-oppna-fragor.md`); rättsflaggorna i Kompetens och källor |
| `historik/karta/7-innehall.md` (ägarens röst, KB-Whisper) | Erbjud att svara med röst [N2] |
| Anteckningarna lager 1–2 §1 (S1–S6, G1–G3, R1) | Intervjun (research först, omdömen, bråttom-läget), Branschresearch (konfidens, opålitlig data), Kompetens (åtkomst, avstå), rättsflaggor |
| Anteckningarna §2 (Xiao, Paludan, Geiecke, Anthropic Interviewer, Hall, GOV.UK, Jarrett) | Intervjun (hantverket, question protocol, förifyllda påståenden, röst), avslutningen, Kontroll |
| Anteckningarna §4 (SCB, Bolagsverket, Hitta, enskild firma) | Kompetens: åtkomst och rättsflaggor |
| Anteckningarna §5, lager 1 (Christensen, Hall, GOV.UK, Dunford, ISO 9241-210, sexstegsskillen) | Kompetens och källor; JTBD- och positioneringspunkterna |
| Rapporten, lager 1 | Kompetens och källor (avstå- och bevakalistan hänvisas dit) |
| `konsolideringsanalys.md` §4.2 (nordstjärnan), §7.3 (nivåer), §8.2 (briefmall, intervjufrågor) | Nordstjärna; nivåmärkningen; briefmallen och intervjuguiden |
| `karta-mot-guide.md` konflikt 11 | Strykningen av svarsalternativ och promptmallen |
| Webb-pro `kunskap/kundintervju.md` | Intervjuguiden (A–J, "Nästa användning"); "vet inte" som svar; teknik- och lösenordsregeln; bekräftelse ≠ acceptans |
| Webb-pro `kunskap/brief-mall.md` | Briefmallen (avsnitt 6 "klar från början till slut", 10 "får inte påstås", 11 dimma); "en saknad uppgift blockerar bara det som beror på den". Webb-pros mekanik (kontrollskript, §-numrering, DESIGN.md-kontrakt, referenspaket, användbarhetsprov) skalad av |

## Nya regler utan v0.74-förlaga

- Omformulerad utbud/efterfrågan-fråga (konflikt mellan videons hypotetiska fråga och hantverket).
- "Hur kommer det sig" i stället för "varför" (Geiecke mot FDE-videon).
- Svarsalternativ bara för val av paket och tillval.

## Ommärkning 2026-10-15

Efter granskningen (`konsolidering/granskning-v1.0.md`) och tillägget kl. 14.30 i `konsolidering/skrivregler.md`. Nivåerna i tabellerna ovan avser läget före ommärkningen. Inget är struket; allt som lämnat N1 står kvar i filen med ny nivå. Fyra par punkter som sa samma sak är sammanslagna.

**N1 före:** 22 märkta punkter, plus intervjuguiden och briefmallen märkta i löptext. **N1 efter:** 6 punkter – intervjun (öppna frågor, de åtta kärnfrågorna, hantverket), research i kundens sajt och Google-profil, strategibriefen med sex rubriker, faktabasen, nordstjärnan och grinden (kundens bekräftelse och Johnnys godkännande). Kärnfrågorna (numrerad lista) och briefmallen med sex rubriker (kodblock) är N1-material som punkterna hänvisar till.

### Flyttat från N1

| Punkt (avsnitt) | Före | Efter | Skäl |
|---|---|---|---|
| Research först, frågor sedan (Intervjun) | N1: sajt, Google-profil, omdömen, sociala medier, register | N1: kundens sajt och Google-profil; resten i ny punkt *Bredare research före samtalet* [N2] | Granskningen 1.1 (rad 14); skrivreglernas tillägg |
| Varje fråga har en känd användning | N1 | N2 | Kärnfrågornas bokstav anger användningen i N1 |
| Hantverket | egen N1-punkt med två omärkta underpunkter | Sammanslagen med intervjupunkten (N1); underpunkterna (svarsalternativ bara för paket och tillval, "vet inte" blir *okänt*) inbakade | Hantverket är vad *öppna frågor* i beslutet betyder – samma regel |
| Fråga om verksamheten, inte om tekniken | N1 | N2 | Taket; hemligheterna bor i `3-3` |
| Fråga om kundens kunder | N1 | N2 | Kärnfråga 1 i N1 |
| Börja med stoppet eller läckan | N1 | N2 | Kärnfråga 2 |
| Processen bakom den primära handlingen | N1 | N2 | Kärnfråga 3 och briefens *Primär handling* |
| Positionering | N1 | N2 | Kärnfråga 4; avsnittet finns i den fulla briefmallen (N2) |
| Samma samtal samlar underlag till senare lager | N1 | N2 | Kärnfrågorna 7 och 8 täcker referenser och bilder |
| Den ärliga följden (underpunkt) | omärkt | N2 | Stilregeln: varje punkt märks |
| Dimma blir utredning | N1 | N2 | Taket; N1-intervjun sker medan Johnny tittar |
| Sett, härlett, okänt | N1 | N2 | Kärnan – bara bekräftat blir faktum – står i N1-punkten om research |
| Research ger sammanhang, aldrig fakta om kunden | N1 | N2 | Ingen branschresearch i N1 |
| Intervjuguiden A–J (löptext "[N1] Biblioteksfil …") | N1 i löptext | N2, listpunkt | Granskningen 1.1 (rad 47–60) och 3.3; N1 = de åtta kärnfrågorna |
| Avslutningen (stycke efter kärnfrågorna) | löptext | Inbakad i grinden (N1) och betyget (N2); kvar en hänvisning | Dubblett av *Kontroll* i samma fil |
| Briefmallen, 11 rubriker (löptext "[N1] Biblioteksfil …") | N1 i löptext | N1: sex rubriker i mallen och uppräknade i briefpunkten; N2: ny punkt *Den fulla briefmallen* med de fem övriga avsnitten och utökningarna | Granskningen 1.1 (rad 92–113) och 3.3; skrivreglernas tillägg |
| Strategibriefen och *Varje påstående i briefen är märkt* (Kontroll) | två N1 | Märkningen i briefpunkten (N1); kontrollen av märkningen hos granskaren (N2) | Samma krav på två ställen |
| Faktabasen fylls | N1 | N1, med `sites/<namn>/fakta.md` och källa per faktum; hemvist `2-7` | `5-byggplan.md`, steg 1 |
| Nordstjärnan och *Instruktion, inte grind* | två N1 | En N1-punkt | Samma regel |
| Grinden och *Johnny läser briefen och faktabasen* | två N1 | En N1-punkt, `5-byggplan.md`, steg 1 | Skrivreglerna: "Kundens bekräftelse + Johnnys godkännande" |
| Egen skill, eget bibliotek, åtkomst (Kompetens) | omärkt, eller [N2] mitt i raden | [N2] först på raden; utkastet → `bilaga-b-skills.md` | Stilregeln |
| Rättsflaggor (underpunkter) | omärkta | N2; intervjuutskrifter och biträdesavtal N3 | N3 som biträdesavtalet i `2-2` och juridiken i `bilaga-e-oppna-fragor.md`, avsnitt 5 |

### Granskningsfynd som åtgärdats

| Fynd | Åtgärd |
|---|---|
| 1.1, raderna för `2-1` (14, 47–60, 92–113) | Se tabellen ovan |
| 1.3 punkt 1, sidkartan i briefen | *Inte i briefen* pekar på `sites/<namn>/sidkarta.md` (→ `2-3`) |
| 1.3 punkt 2, rörelsebudgeten | Struken ur *Inte i briefen*; står i briefmallens *Ton och intryck*: "rörelsebudget (sparsam, måttlig eller expressiv → 2-6)" |
| 2.2, nordstjärnan och förvaltningsavtalet | Hemvisten kvar här, hela regeln [N3]; ingressen till *Nordstjärna* nämner förvaltningsavtalet bland det som hänvisar hit. Hänvisningen i `4-foretaget.md` görs där |
| 2.4, Grounding Lite | Hänvisning till `bilaga-e-oppna-fragor.md` i *Åtkomst*, *Rättsflaggor* och *Hur självgående*; frågan läggs in i bilagan av samordnaren |
| 3.3, generatorn | N1-punkterna står på listrader; briefpunkten räknar upp de sex rubrikerna och intervjupunkten pekar på avsnittet med kärnfrågorna, så att `n1-forsta-sajten.md` blir begriplig |
| Hänvisningar (skrivreglernas tillägg) | `karta/…` → `historik/karta/…` i guidefilen och här; "`guide/README.md`" → "princip 1" respektive "avsnittet *Sett, härlett, okänt*"; `5-byggplan.md`, steg 1; bilagor med filnamn |

### Inte löst här

- Kärnfrågorna syns inte i `n1-forsta-sajten.md`: de är en numrerad lista utan märke, som stilregeln kräver.
- `bilaga-b-skills.md` rad 38 och 57 ("briefen med sidkarta") och `2-3-struktur.md` rad 32 ändras av respektive ägare (granskningen 1.3 punkt 1).
- `5-byggplan.md`: filtabellens "Intervjuguide och briefmall" bör bli "kärnfrågorna och briefmallen med sex rubriker".
