# Spårbarhet: `guide/2-7-innehall.md`

Var innehållet i v0.74 (`historik/IMPLEMENTERINGSGUIDE-v0.74.md`) som rör lager 7 tog vägen. Radnummer avser v0.74. Skrivet 2026-10-15.

## v0.74 rad för rad

| v0.74-avsnitt (rader) | Var det hamnade (fil, avsnitt) | Struket och varför | Flyttat till annan fil |
|---|---|---|---|
| Fas 0b punkt 2, innehåll till faktabasen (257) | 2-7, Faktabasen: "Vid ombyggnad är den gamla sajtens innehåll förslag" | – | Resten av fas 0b → `2-2-omfattning.md` |
| Fas 1, intervjun frågar vilka bilder som finns (301) | 2-7, Bilder: bildbeställningen | – | Själva intervjufrågan → `2-1-strategi.md` |
| Fas 3, innehåll skilt från design (383) | 2-7, Texterna: innehållsfiler ur faktabasen | – | – |
| Fas 3, bilder med känd källa och licens, alt-text samtidigt (391) | 2-7, Bilder: post per bild och alt-text | – | – |
| Fas 6, specialisttabellens rad *Fakta och språk* (507) | Kriterierna: 2-7, Texterna, AI-signaturer i text och Kontroll | – | Specialistmodellen och underlaget till granskaren → `3-2-granskning-och-kalibrering.md` |
| Fas 6, textmängd och blickprov (513) | 2-7, Texterna: "Textmängd" [N2], granskningskriterium (ommärkt 2026-10-15) | Jack Roberts genomgång av "hundratals sajter" och jordglobsexemplet (videoreferat) | – |
| Fas 6, låst kontroll för ordgräns (514) | 2-7, Texterna: ordgränsen [N2] som instruktion | Låst kontroll → instruktion: gränsvärdet saknar källa (analysen §4.2) | Kalibreringen mot Johnnys domar → `3-2-granskning-och-kalibrering.md` |
| Fas 6, blickprov (515) | 2-7, Texterna: hänvisning | – | Blickprovet (femsekunderstestet) bor i `2-4-skelett.md` (granskningen 2.2); hur provet körs → `3-2-granskning-och-kalibrering.md` |
| Fas 6, minsta text som säger allt, Variate (516) | 2-7, Texterna [N4] | – | Variate → `3-5-live-visning.md` |
| Fas 6, socialt bevis med källa och tillstånd (518) | 2-7, Faktabasen: faktakontrollen [N1], där socialt bevis ingår; Texterna: tillstånd [N2] som instruktion med ⚠️ | Exemplen "4 800 tak hålls torra" och "Älskad av 10 000…" i löptexten (videoreferat; det senare står kvar under Platshållare); hänvisningen "(fas 0)" | – |
| Fas 6, konkret i stället för generiskt (520) | 2-7, Texterna | Andra exemplet ("skriftlig omfattning och fast pris"), videoreferat | – |
| Fas 6, låst kontroll mot text i bild eller video (522) | 2-7, Bilder: "All text ligger i HTML"; Kontroll (N1 granskas, N2 textigenkänning) | Grunden "två oberoende källor" (Jack Roberts + Tristen O'Brien) är ersatt av WCAG 2.2, 1.4.5, eftersom Tristens video inte formulerar regeln (analysen §4.4) | – |
| Fas 6, låst kontroll mot långa tankstreck (524) | 2-7, Texterna: kort tankstreck [N2]; Kontroll [N2], granskningsförslag *(en källa – bänken)* tills Språkrådets *Svenska skrivregler* är läst (granskningen 2.1 punkt 2) | "⚠️ Gäller kundernas sajter, inte guiden" (inaktuellt: skrivreglerna kräver kort tankstreck också i guiden); Nate Herks citat (videoreferat) | – |
| Fas 6, faktakontroll (536) | 2-7, Faktabasen: faktakontrollen [N1], låst (tre källor, analysen §4.3); bilddelen i ärlighetsregeln. Definieras som N1-kontroll 5 i `2-8-teknik-och-kvalitet.md` | – | – |
| Fas 6, språk: ingen tillgjord prosa (537) | 2-7, Texterna: klarspråk | – | – |
| Fas 6, Humanizer (538) | 2-7, AI-signaturer i text [N2]: körs efter faktakontrollen, ändrad text faktakontrolleras igen | – | Status och repo → `bilaga-a-verktyg.md` |
| Fas 6, fem tecken på AI-slop (549) | – | – | Utseendegranskningen → `2-5-yta.md` / `3-2-granskning-och-kalibrering.md` (bara versalpunkten är lager 7) |
| Fas 6, låst kontroll mot versaler (550) | 2-7, AI-signaturer i text [N2], granskningsförslag | Låst kontroll → granskningsförslag: en persons smak ("a funny rule"), påståendet om svensk text saknar källa (analysen §4.2) | Undantagna etiketter anges i stilkitet → `2-5-yta.md` |
| Fas 6c, LocalBusiness-schema stämmer med faktabasen (586) | – | – | `2-8-teknik-och-kvalitet.md` |
| Fas 6c, beskrivande alt-texter (587) | 2-7, Bilder (regeln) och Kontroll (kvaliteten) | – | Kontrollen att `alt` finns → `2-8-teknik-och-kvalitet.md` |
| Fas 7 steg 10, inga platshållare i produktion (618) | 2-7, Platshållare: markeringen `[[PLATSHÅLLARE: …]]` och frågan till kunden | – | Publiceringskontrollen (noll träffar, även *lorem ipsum*, *placeholder*) → `2-8-teknik-och-kvalitet.md` (D14) |
| Fas 8a, formulärtestet kontrollerar bekräftelsemejlet (637) | – | – | `2-8-teknik-och-kvalitet.md` / `2-9-drift-och-forvaltning.md` |
| Fas 8b, ändrade fakta i faktabasen (643) | 2-7, Hur självgående [N3] (hänvisning) | – | `2-9-drift-och-forvaltning.md` |
| Fas 8g, Google-profilen i synk med faktabasen (681) | – | – | `2-9-drift-och-forvaltning.md` |
| §5.2, byggaren läser faktabasen (795) | – | – | `3-1-orkestrering-och-roller.md` |
| §6.9, Recording Mode döljer personuppgifter i faktabasen (948) | – | – | `3-5-live-visning.md` |
| §7.3, kundmaterial till faktabasen går via intervjun (1086) | – | – | `3-3-sakerhet-och-installningar.md` |
| §8.6, promptregeln "Ingen tillgjord prosa" (1300) | 2-7, Texterna: klarspråk | Jämförelsen Fable 5.1 mot Opus 5 och Fable 5 (modellspecifik, åldras) | Placeringen i byggarprompten → `3-1-orkestrering-och-roller.md` |
| §8.6, promptregeln "Skriv bara fakta som finns i kundens faktabas" (1301) | 2-7, Texterna: faktaregeln [N1] (fallgrop 38) | "Logga ett antagande" ändrat till "fråga kunden": härledda svar om fakta går till kunden (M21, `guide/README.md`) | Placeringen i byggarprompten → `3-1-orkestrering-och-roller.md` |
| §8.7, `sites/<namn>/CLAUDE.md` pekar på faktabasen (1283) | – | – | `3-4-larande-och-underhall.md` |
| §10.5, faktabasen som kontext (1554) | – | – | `3-4-larande-och-underhall.md` |
| §11.3, raden *Läsning och innehåll* (1590) | 2-7, Kompetens och källor (NN/g, klarspråk) och AI-signaturer (Wikipedia-redaktörernas guide, ⚠️ kvar) | – | Övriga rader i §11.3 → respektive lager |
| §11.8 Kundfakta per sajt (1684–1698) | 2-7, Faktabasen: hela avsnittet; i N1 ett metadatafält (`kalla`), `giltigt_fran` och `anvands_pa` N2. Användningen: byggarna (Texterna), faktakontrollen (Kontroll), förvaltningen (hänvisning till 2-9), skydd mot påhittade fakta (faktaregeln) | "En fil per faktum" är [N3]; för första sajten räcker `fakta.md` (analysen §8.2) | Personuppgifterna → `3-3-sakerhet-och-installningar.md` |
| §11.9 inledning, bildkällor (1700–1701) | 2-7, Bilder | Stitch och Higgsfield som bildkällor per kund: Stitch används bara när stilkiten tas fram (`BESLUT.md` 2026-10-15) | Verktygen → `bilaga-a-verktyg.md` |
| §11.9 p. 1, källa per bild (1703) | 2-7, Bilder: källa och licens per bild [N1]; de sex fälten med `ansprak` och samtycke (webb-pro `bild.md`) [N2]; Stitch-bilder räknas som AI-genererade (ärlighetsregeln) | – | – |
| §11.9 p. 2, ärlighetsregeln ⚠️ (1705) | 2-7, Bilder: ärlighetsregeln [N1] | ⚠️ ersatt med källor (research 2026-10-14, webb-pro `bild.md`); hamburgerexemplet (videoreferat) | – |
| §11.9 p. 2, AI-förordningen art. 50 (1706) | 2-7, Bilder: märkningen enligt art. 50.4 inbakad i ärlighetsregeln [N1] | – | – |
| §11.9 p. 3, licens per bild och per tillgång (1708) | 2-7, Bilder: `licens` i bildposten (fallgrop 95) | – | Licens för typsnitt, ikoner, Lottie och komponenter (D9) → `2-5-yta.md` |
| §11.9 p. 4, alt-text, format, AI-metadata, WebP (1710) | 2-7, Bilder: alt-text och AI-metadata [N2] | *WebP under 200 KB* som låst kontroll: en källa, godtycklig gräns, krockar med AI-metadata (analysen §4.2, M19) | Format, storlek, lat laddning och LCP → `2-8-teknik-och-kvalitet.md` |
| §11.9 p. 5, saknade bilder: platshållare och `blocked` (1712) | 2-7, Platshållare och Bilder (bildbeställningen); öppen fråga om bildkälla | – | `blocked`-mekanismen → `3-1-orkestrering-och-roller.md` |
| §11.10, integritetspolicy byggd ur faktabasen (1725) | – | – | `2-8-teknik-och-kvalitet.md` |
| §11.12, gräns: research är inte kundfakta (1749) | 2-7, Faktabasen: "Kunden bekräftar varje faktum" (fallgrop 161) | – | Researchen med linser → `2-1-strategi.md` |
| §12, skillbeskrivningen med om-oss-exemplet (1799) | – | – | `bilaga-b-skills.md` |
| §12, Humanizer och Slop Monster (1853–1854) | 2-7, AI-signaturer i text [N2] (användningen) | – | Status → `bilaga-a-verktyg.md` |
| §15.1, bekräftelsemejlet (2202) | 2-7, Bekräftelsemejlets innehåll [N2] (fallgrop 183) | – | "Ingår i alla paket" → `4-foretaget.md`; mejlsäker HTML och test i mejlklienter (fallgrop 193) → `2-8-teknik-och-kvalitet.md` |
| §15.1, prisuppskattning ur kundens prislogik i faktabasen (2204) | – | – | `4-foretaget.md` |
| §15.2, rutinändring till faktabasen (2223) | – | – | `2-9-drift-och-forvaltning.md` |
| §15.2, klarspråk (2227) | 2-7, Texterna: klarspråk [N1], med NN/g:s konkreta regler | ASD-STE100 (engelsk flygstandard; NN/g ger reglerna). Rättat: språklagen gäller offentlig verksamhet, inte privata företag (anteckningarna lager 6–7 §1e) | Hjälpguide, ärendesvar och rapporter → `2-9-drift-och-forvaltning.md` (hänvisar hit) |
| §15.3, källa per påstående och faktakontroll av säljutskick (2238, 2246) | – | – | `4-foretaget.md` |

## Fallgropar ur §13

| Nr | Var |
|---|---|
| 38 Påhittade fakta | 2-7, Texterna: faktaregeln |
| 93 Briefen som faktabas | 2-7, Faktabasen |
| 94 Genererade bilder som ser äkta ut | 2-7, Bilder: ärlighetsregeln |
| 95 Bilder utan känd källa eller licens | 2-7, Bilder: post per bild. Dubbletterna 166 och 177 (komponenter, typsnitt, ikoner) → `2-5-yta.md` |
| 103 Gammalt innehåll förs över obekräftat | 2-7, Faktabasen: ombyggnad |
| 129 Text som avslöjar AI | 2-7, AI-signaturer i text (sammanslagen grupp 129 ≈ 169 ≈ 196, analysen §6.3) |
| 152 Säljutskick med påståenden utan källa | `4-foretaget.md` |
| 161 Research som blir kundfakta | 2-7, Faktabasen |
| 167 Påhittade resultat i säljutskick | `4-foretaget.md` (dubblett av 38 ≈ 180, analysen §6.3) |
| 169 Långa tankstreck | 2-7, Texterna och Kontroll |
| 175 För mycket text per sektion | 2-7, Texterna: textmängd och blickprov |
| 176 Generiska löften | 2-7, Texterna: konkret i stället för generiskt |
| 180 Påhittat socialt bevis | 2-7, Texterna: socialt bevis |
| 181 Publicerade platshållare | 2-7, Platshållare (markeringen); kontrollen → `2-8-teknik-och-kvalitet.md` |
| 183 Bekräftelsemejl med standardtext | 2-7, Bekräftelsemejlets innehåll |
| 193 Bekräftelsemejl som går sönder i Outlook | `2-8-teknik-och-kvalitet.md` |
| 195 Text inbränd i bild eller video | 2-7, Bilder och Kontroll |
| 196 Versaler | 2-7, AI-signaturer i text (granskningsförslag) |

## Kartan, analyserna och researchen

| Underlag | Använt i 2-7 | Ändrat eller inte använt |
|---|---|---|
| `historik/karta/7-innehall.md`, *Vad byrån gör* och *Vad som kommer ut* | Ingressen; Vad som kommer ut (texter, röstprofil, bilder, alt-text) | – |
| Kartan, språkgrinden (Vale, Nortropic-sv, Hunspell, LIX, korpusmätning) | Kompetens och källor [N2]; Kontroll: rapport tills regeln har grund och är mätt | "Körs på all text" (kartans Kontroll) gäller som rapport; bara mätta regler med norm eller två källor stoppar |
| Kartan, ägarens röst (inspelning, KB-Whisper, NN/g-dimensioner, *Vi är / Vi är inte*) | Texterna [N2] | Intervjuns form är öppen (`bilaga-e-oppna-fragor.md`) |
| Kartan, bilder (egna foton först, fotolista efter Googles kategorier) | Bilder [N2] | Astros Picture med AVIF och sharp för beskärning → `2-8-teknik-och-kvalitet.md` och `bilaga-a-verktyg.md` |
| Kartan, alt-text (W3C:s beslutsträd, 1177) | Bilder [N2] | – |
| Kartan, kompetens (textskill, eget bibliotek, förankring) | Kompetens och källor | Textskillens namn bestäms i `bilaga-b-skills.md` |
| Kartan, kontroll och autonomi | Kontroll; Hur självgående | – |
| Kartan, öppet: AI-bilder bara som märkta illustrationer och aldrig på Google-profilen | Bilder: ärlighetsregeln, AI-märkning, Google-profilen | Synlig märkning krävs för fotorealistiska bilder som liknar verkliga personer, föremål, platser eller händelser (art. 50.4, research 2026-10-14), inte för varje AI-bild; i tveksamma fall märks bilden |
| Kartan, öppet: Unsplash-API:t passar inte en autonom kedja; exif-GPS tas bort | Bilder [N2] | – |
| Rapporten `2026-10-15_kompetensluckor-och-kandidater-per-lager.md`, lager 7 | Språkgrind, copy och röst, bilder och video, förankring, rätts- och licensflaggor | Kandidattabellen, *Avstå* och *Bevaka* → `bilaga-a-verktyg.md` |
| Anteckningarna lager 6–7: §1 (svensk språkgranskning), §2 (copywriting, NN/g, BrightLocal), §3 (röst, recensioner och personuppgifter), §4 (stock, AI-bilder, GPS, Googles policy), §5 (fotolista, alt-text), §6 (undertexter, WCAG 1.2.2), §8 (förankring) | Texterna, AI-signaturer, Bilder, Kompetens och källor, Kontroll | §6 Remotion och §4 bakgrundsborttagning → `bilaga-a-verktyg.md`; §7 rörelse → `2-6-rorelse.md` |
| `kunskap/research/2026-10-14_ai-forordningen-och-rattigheter.md` (art. 50.2, 50.4, C2PA, vilseledande marknadsföring) | Bilder: ärlighetsregeln, AI-märkning, AI-metadata | Upphovsrätt till AI-material och avtalsklausuler → `4-foretaget.md` / `2-2-omfattning.md` |
| Konsolideringsanalysen: D14, D15, D16 (§2); §4.2 (versaler, ordgräns, socialt bevis, platshållare, WebP); §4.3 (faktakontroll, tankstreck); §4.4 (text i bild); §5.2 och §8.1 p. 7 (bildkällan); §6.3 (fallgropar); §7.3–7.4 (nivåer); §8.2 (`fakta.md`); M19, M21 | Hela filen | – |
| Webb-pro `kunskap/bild.md` | Bilder: anspråken, beställningen, typografi bär, generiska prompter; ⚠️ om metadata | Webb-pros mekanik (BILDER.md, BESTALLNING.md, Figma-krediter, filnamn, viktbudget, registret för typsnitt och ikoner) skalad av; viktbudget → `2-8-teknik-och-kvalitet.md`, typsnitt och ikoner → `2-5-yta.md` |
| Webb-pro `kunskap/copy-kontroll.md` | AI-signaturer: svenska copyfynd som rapport; socialt bevis: attribution; Kontroll: sökning efter siffror | Metalängd och obligatoriska element (telefon, organisationsnummer) → `2-8-teknik-och-kvalitet.md` |
| Webb-pro `kunskap/kundintervju.md` | Faktabasen: bekräftade fakta är inte ett godkännande | Resten → `2-1-strategi.md` |
| Webb-pro-genomgången §3 och §4 | Texterna: kundens egna ord; texterna före riktningarna | – |

## Öppet, fört till `bilaga-e-oppna-fragor.md`

- Bildkälla för en kund utan egna foton (fem alternativ i 2-7). Finns som fråga 1.4.
- Intervjuns form, text eller röst, som avgör om röstprofilen bygger på en inspelning (delas med 2-1). **Saknas fortfarande i bilagan** (granskningen 2.4; `LAGE.md`, öppen fråga 4); 2-7 hänvisar dit och bilagans ägare behöver lägga in den.

## Ommärkning 2026-10-15

Efter granskningen (`konsolidering/granskning-v1.0.md`) och tillägget i `konsolidering/skrivregler.md` kl. 14.30. Före: 31 N1-punkter och 6 N1-rader i kontrolltabellen. Efter: 7 N1-punkter (6 regler och utdata), inga N1-rader i kontrolltabellen; N1-kontrollerna definieras bara i `2-8-teknik-och-kvalitet.md`.

### Kvar i N1

| Punkt | Avsnitt |
|---|---|
| `fakta.md` som enda källa, med källa per faktum – ett metadatafält, `kalla` (i stället för tre) – och kundens bekräftelse | Faktabasen |
| Faktakontrollen, med socialt bevis och bilddelen; N1-kontroll 5 i `2-8` | Faktabasen |
| Skriv bara fakta ur faktabasen; det som saknas blir `[[PLATSHÅLLARE: …]]` och en fråga (sammanslagen ur "Skriv bara fakta…" i Texterna och "Det som saknas markeras…" i Platshållare) | Platshållare |
| Källa och licens per bild (`kalla`, `licens`) | Bilder |
| Ärlighetsregeln, med märkningen enligt AI-förordningen art. 50.4 inbakad (förut en egen N1-punkt) | Bilder |
| Ingen text i bild (WCAG 2.2, 1.4.5) | Bilder |
| Utdata: `fakta.md`, texterna och frågorna | Vad som kommer ut |

### Flyttat från N1

| Punkt | Ny nivå | Skäl |
|---|---|---|
| `giltigt_fran` och `anvands_pa` per faktapost | N2 | Ett metadatafält i N1 (granskningen 1.1, `2-7` 12) |
| Bekräftade fakta är inte ett godkännande av design, pris eller publicering (utbrutet ur "Kunden bekräftar varje faktum") | N2 | Hantverk, inte nödvändigt för första sajten |
| Vid ombyggnad är gammalt innehåll förslag | N2 | Kundens bekräftelse av varje faktum (N1) täcker det |
| Faktabasen publiceras aldrig som den är | N2 | Hantverk; personuppgifterna → `3-3` |
| Texterna i innehållsfiler, inte i komponenterna | N2 | Hemvisten för texterna är 2-7, för komponenterna `2-4` (granskningen 2.2) |
| Texterna före riktningarna | N2 | Taket; riktningarnas omfång avgörs i `2-5` och `5-byggplan.md`, steg 2 |
| Konkret i stället för generiskt; kundens egna ord; klarspråk | N2 | Taket – bra hantverk står som N2-regel och i textskillen |
| Kort tankstreck | N2, granskningsförslag | Granskningen 2.1 punkt 2: ingen primärkälla för svensk typografi; *(en källa – bänken)* tills Språkrådets *Svenska skrivregler* är läst |
| Textmängd och blickprov | N2 (textmängd); blickprovet bara som hänvisning | Blickprovet bor i `2-4-skelett.md` (granskningen 2.2) |
| Socialt bevis som egen punkt | Sammanslagen i faktakontrollen (N1) | Dubblett: "ingår i faktakontrollen" |
| Logotyper och citat kräver tillstånd | N2 | Instruktion med ⚠️ (lagtexten inte läst) |
| AI-signaturer som granskningskriterium | N2 | Taket |
| Kundens egna foton först | N2 | Ärlighetsregeln (N1) bär det nödvändiga |
| Bildbeställning efter Googles kategorier, minst tre per kategori | N2 | Granskningen 1.1 (`2-7` 47) |
| Bildpostens sex fält (`ansprak`, `forestaller`, `anvands_pa`, samtycke) | N2 | Granskningen 1.1 (`2-7` 48); N1 behåller `kalla` och `licens` |
| AI-märkning som egen punkt | Sammanslagen i ärlighetsregeln (N1) | Samma ämne; lagkravet följer med |
| AI-metadata (C2PA) och Google-profilen; ⚠️-raden om Astros bildkedja inbakad | N2 | Taket; Google-profilen hör till förvaltningen |
| GPS och platsdata ur kundens foton | N2 | Taket (tolkning); kontrollen var redan N2 |
| Alt-text enligt beslutsträdet och 1177 | N2 | Att `alt` finns kontrolleras i N1 (N1-kontroll 8, WCAG 1.1.1) |
| Utdata: innehållsfiler, bildbeställning, bearbetade bilder | N2 | Följer reglerna ovan |
| Hur självgående: texterna självgående; aldrig självgående-listan | N2 | På första sajten tittar Johnny på allt (`5-byggplan.md`) |
| Kontrolltabellen: faktakontroll, platshållare, alt-text (N1-rader) | Ersatta av hänvisning till `2-8` | `2-8` är enda platsen för N1-kontrollerna |
| Kontrolltabellen: kriterieraden (N1) | N2 | Kriterierna är N2; Johnny dömer texterna i N1 |
| Kontrolltabellen: mänsklig kontroll (N1) | Inledningen till Kontroll; alt-texterna N2 | Kundens bekräftelse står i N1-punkten om `fakta.md` |

### Granskningsfynd som åtgärdats

| Fynd | Åtgärd |
|---|---|
| 1.1, `2-7` 12, 47, 48 | Ett metadatafält; bildbeställning och sex fält → N2 |
| 1.2, `fakta/` med en fil per faktum | Stod redan som N3 i 2-7; oförändrat |
| 2.1 punkt 2, långt tankstreck som låst kontroll | Granskningsförslag *(en källa – bänken)*, träff högst `medel` |
| 2.2, blickprov i tre filer | Hänvisning till `2-4-skelett.md` |
| 2.2, innehåll skilt från design | Regeln för texterna kvar i 2-7 (hemvist); komponenterna → `2-4` |
| 2.3, `karta/…` | `historik/karta/…` |
| 2.4, intervjuns form | Hänvisning till `bilaga-e-oppna-fragor.md`; frågan saknas där (se ovan) |
| 3.3, N1-kontrollerna syns inte i den genererade N1-filen | Inga N1-rader i 2-7:s tabell; N1-kontrollerna står i `2-8` |
| Märkning | Varje listpunkt har `- [Nx]` först; Kompetens och källor gjordes om till märkta punkter och löptext |
