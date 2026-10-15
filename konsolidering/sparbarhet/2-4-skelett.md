# Spårbarhet: `guide/2-4-skelett.md`

Skrivet 2026-10-15 vid konsolideringen. Radnummer avser `historik/IMPLEMENTERINGSGUIDE-v0.74.md`. Lagret är nytt: det mesta kommer ur kartan, researchen och besluten 2026-10-13 och 2026-10-15, inte ur v0.74.

## v0.74

| v0.74-avsnitt (rader) | Var det hamnade (fil, avsnitt) | Struket och varför | Flyttat till annan fil |
|---|---|---|---|
| Fas 1b, gallerivy (328) | 2.4 *Gallerivyn* (D25, hemvist här) | "Med `design.md` på plats håller varianterna samma visuella språk" ersatt: stilkitet och biblioteket ger samma språk | Riktningarnas presentation → `2-5-yta.md`; Variate (§6.8) → `3-5-live-visning.md` |
| Fas 1b, riktningarna måste skilja sig (329) och §11.7 "Används i: … wireframes" (1682) | 2.4 *Hur sektionerna prövas*: varianterna i biblioteket tas fram av isolerade agenter | – | Riktningarna → `2-5-yta.md` |
| Fas 1b, spritt pass för kantfall (325) | 2.4 *Hur sektionerna prövas*: innehåll i värsta fall [N2] och, sedan ommärkningen 2026-10-15, hela passet med sex perspektiv, isolerade agenter och kritiker [N2] | – | Tidigare skickades övriga perspektiv till `3-1`, `3-2` och `bilaga-c-kontroller.md`, där de inte fanns (granskningen 1.5, stickprov 15). Registret i bilaga C följer regeln här. |
| Fas 1b, funktionsspecifikation (336) | 2.4 *Hur sektionerna byggs* och *Sektionerna*: tillstånd definieras per komponent i biblioteket | Specifikation per sajt för alla klickbara delar struket | Avvikelser per sajt → `2-3-struktur.md` *Vägar och tillstånd* |
| Fas 1b, prototyplänk i mobilen (337) | 2.4 *Wireframes*: kunden ser riktningarna, inte wireframes | – | Om kunden ska godkänna en prototyp: öppen fråga i `bilaga-e-oppna-fragor.md` (v0.74 §14, 2168) |
| Fas 2, rubrik och åtgärd: Stitch skapar design per sajt (349–350) | Ersatt av 2.4 *Vad byrån gör* (AI:n väljer ur biblioteket) | Stitch per kundbygge struket (beslut 2026-10-15, "Stitch inom stilkit") | Stitch när stilkiten tas fram → `2-5-yta.md` |
| Fas 2, 8 varianter, tar lång tid (351) | – | Historisk iakttagelse om Stitch per sajt | – |
| Fas 2, wireframes först (352) | 2.4 *Wireframes per sidtyp* | ⚠️ "hur wireframes tas fram med Stitch-CLI:t" gäller inte längre kundbygget | Frågan står kvar för stilkiten: `bilaga-e-oppna-fragor.md` §4; spridd metod för varianter → 2.4 *Hur sektionerna prövas* |
| Fas 2, EXPLORE, REFINE, REIMAGINE (353) | – | Gäller Stitch | → `2-5-yta.md` (Stitch när stilkit tas fram) |
| Fas 2, DESKTOP och MOBILE (354) | 2.4 *Wireframes* (mobil- och datorbredd), *Hur sektionerna byggs* (mobilen först) | – | – |
| Fas 2, wireframes för varje sidtyp (355) | 2.4 *Wireframes per sidtyp* | ⚠️ Relume: står som Bevaka i researchen | Relume → `bilaga-a-verktyg.md` |
| Fas 2, tak på 10 varianter och eskalering (356) | – | Gäller Stitch-varianter per sajt, som inte längre görs | – |
| Fas 2, output `design.md` (357), modellernas standardval (358), låsning (359), Hallmark (360), Aura.build (361), riktningen styr Stitch och Tastemaker (362) | 2.4 nämner bara att sektionerna använder tokens ur stilkitet (fallgrop 18) | – | → `2-5-yta.md` |
| Fas 2, teknikbeskrivningar av beteende (363) | – | – | Rörelse → `2-6-rorelse.md`; REA och sett/härlett (§11.11) → där §11.11 hamnar (`2-1`, `README.md`) |
| Fas 2, beskrivningar och värden till generatorn, inte bilder; Stitchs redesign (364–368) | – | – | Referenser och originalitet (D8) → `2-5-yta.md` |
| Fas 2, annoteringar i Stitch (369), prompter till Stitch (370), validering av `design.md` (371), OKLCH (372), visualisering av `design.md` (373) | – | – | → `2-5-yta.md` |
| Fas 2, grind (374) | 2.4 *Wireframes* (båda bredderna) | – | Delen om `design.md` → `2-5-yta.md` |
| Fas 2, promptmall (376–377) | – | Gäller Stitch per sajt | – |
| Fas 3, innehåll skilt från design (383) | 2.4 *Hur sektionerna byggs* (innehåll som props) – hemvist för komponentdelen (granskningen 2.2) | – | Texterna och innehållsfilerna → `2-7-innehall.md`; `2-8` hänvisar |
| Fas 4, bredder 375, 768, 1280, 1920 (416) | 2.4 *Hur sektionerna prövas*, *Kontroll* | Lägsta bredd för reflow ändrad till 320 CSS-px enligt WCAG 1.4.10; 1920 från N2; första sajten prövas i 375 och 1280 | Uppsättningen → `bilaga-c-kontroller.md` (granskningen 1.3, punkt 6); granskningens gång → `3-2` |
| Fas 4, layout på pixelnivå med better layout (420), perceptionslagar (421) | 2.4 *Kompetens och källor* (better-layout destilleras till skelettskillen) | – | Granskningskriterierna → `3-2-granskning-och-kalibrering.md` |
| Skelettet `stitch-review` steg 4: horisontell scroll, överlappande element, avklippt text, klickytor ≥ 44 px (1912) | 2.4 *Kontroll* (reflow, klickytor med WCAG som norm, överlapp och avklippt text) | Skelettet i övrigt struket (inaktuellt, M11) | – |
| §10.3, ingen horisontell scroll i 375 px (1487) | 2.4 *Kontroll* | Skärpt till 320 CSS-px, där normen ligger (WCAG 1.4.10) | – |
| §11.2 punkt 3, Fitts lag som 44 × 44 px (1583) | 2.4 *Kontroll*: låst kontroll 24 × 24 CSS-px (2.5.8 AA) och granskningskriterium 44 × 44 px (kartan; 2.5.5 är AAA), båda [N2] som egna kontroller | – | – |
| §11.3, Laws of UX för wireframes (1589) | – | – | Kunskapsområdena → `3-4-larande-och-underhall.md` |
| Fas 5, gallerier per sektion (468), Aceternity UI och React Bits (471), 21st.dev och andra källor på komponentnivå (473) | 2.4 hänvisar | – | → `2-5-yta.md` (komponent- och referenskällor) |
| Fas 6, textmängd och blickprov (513–515) | 2.4 *Kontroll*: blickprovet (femsekunderstestet) som granskningskriterium [N1], en källa, fynd högst `medel` – hemvist (granskningen 2.2) | Ordgräns som låst kontroll inte här | Textmängd och ordgräns → `2-7-innehall.md`; `2-5` och `2-7` hänvisar hit; granskningens gång → `3-2` |
| §14, stack och komponentbibliotek (2144–2154) | 2.4 *Biblioteket i första sajten* (marknadsförings-UI, inte funktionellt UI) – hemvist för "inget UI-komponentbibliotek" (granskningen 2.2) | Alternativet ren HTML ur Stitch-exporten struket (beslut 2026-10-15) | Astro statiskt → `2-8-teknik-och-kvalitet.md`, `bilaga-e-oppna-fragor.md` 1.6 |
| §14, nivå av autonomi för designvalet i fas 2 (2156) | 2.4 *Hur självgående* (wireframes: Johnny N2, granskaren N3 – sedan ommärkningen 2026-10-15) | – | Autonomi i övrigt → `3-2` |
| §15.1, designad 404-sida (2203) | 2.4 *Mallarna* | – | Sidan i standardsajten → `2-3-struktur.md` |

## Fallgropar ur §13

| Nr | Var |
|---|---|
| 3 Bara datordesign, sajten gick sönder på mobil | 2.4 *Hur sektionerna byggs* (mobilen först) |
| 19 Beskuren datorversion på mobil | Samma (sammanslagen med 3) |
| 62 Full design innan layouten är vald | 2.4 *Wireframes per sidtyp* |
| 77 Varianter från samma kontext är samma idé | 2.4 *Hur sektionerna prövas* |
| 85 Ett designsystem ger konsekvens, inte karaktär | 2.4 *Vad byrån gör* (konsolideringsanalysen §6.3: fallgrop utan regel, nu regel) |
| 96 Komponentbibliotek för funktionellt UI på en marknadsföringssajt | 2.4 *Biblioteket i första sajten* |
| 143 Samma kod genereras på nytt i varje bygge | 2.4 *Biblioteket i första sajten* |
| 18 Modellen återgår till egna färger och typsnitt | Hänvisning i 2.4 *Hur sektionerna byggs*; hemvist `2-5-yta.md` |

## Kartan, researchen och webb-pro

| Underlag | Använt i 2.4 |
|---|---|
| `historik/karta/4-skelett.md`, alla avsnitt | Hela filen. Kartans utkast till kärnsektioner blev tabellen *Sektionerna för första sajten* (fortfarande utkast); tillvalen per bransch [N2]. Kontrollerna: mobil, surfplatta och dator, inget sticker ut, 44 px, fokus, ingen layoutförskjutning (CLS → `2-8`), innehåll utan JavaScript, femsekunderstest. |
| `BESLUT.md` 2026-10-13 18:52 och 2026-10-15 | *Vad byrån gör*, *Biblioteket i första sajten*, riktning = stilkit på samma innehåll (startsidan i första sajten) |
| `kunskap/research/2026-10-15_kompetensluckor-anteckningar/lager-3-4-struktur-skelett.md` §1 (Astro-teman och sektionsbibliotek) och §2 (primitiver, APG, GOV.UK) | *Hur sektionerna byggs* (primitivtabellen), *Kandidater till sektionerna*, *Hur sektionerna prövas* (O'Hara) |
| `kunskap/research/2026-10-15_kompetensluckor-och-kandidater-per-lager.md`, lager 4 | Domarna och Atomic Design-mappningen |
| `inventering/inventering.json`, lager 4 | AstroWind, Accessible Astro, `<details name>`, Every Layout, GOV.UK Frontend, Popover och Invoker Commands, Fulldev UI, HyperUI, Basecoat, CodeStitch, Zag; befintligt: better-layout, better-variant, better-break, better-explain-interface, emil-mobile-native, emil-prototype, state-machine, refero-design, Refero, Mobbin, Inspo; `bygga_sjalva`: sektionen Serviceområde. Inte nämnt i 2.4: build-design och figma (kundens Figmafil, inte standard), emil-pick-ui-library; design-system, impeccable, ui-styling, ui-ux-pro-max, 21st, Utopia och shadcn-namnen → `2-5-yta.md`. Det som avstås eller bevakas → `bilaga-a-verktyg.md`. |
| `historik/principer.md` (arkiv; nu `guide/README.md`, *Principer*, källorna), AI-byggarna (Wix ADI, Squarespace, Go) | *Vad byrån gör* |
| Webb-pro, `mall/astro/src/components/` och `layouts/`, `kontroller/rokprov/studio/kandidat/`; `kunskap/research/2026-10-15_webb-pro-genomgang.md` §3 | *Webb-pros Astro-komponenter*: Forfragan, HittaHit, Brodsmulor, Bokning, Betallank, Nyhetsbrev, Sprakvaxlare, Bas, 404, tack bedömda; rökprovets komponenter och `package.json` avstås |
| Webb-pro, `kunskap/byggstandard.md` 9.1–9.5 | Utkastet till mallarnas sektionsordning |
| `kunskap/research/2026-10-15_guide-konsolideringsanalys.md` D25 (wireframes), M11 (inaktuella skelett), §5.2 (Stitch-wireframes som blockerare), §7.4 punkt 3 | *Wireframes per sidtyp*, *Kontroll* |
| WCAG 2.2 Understanding-sidorna för 1.4.10, 2.5.8, 2.5.5 och 2.4.7 (hämtade 2026-10-15) | *Kontroll*: tröskelvärdena 320, 24 och 44 CSS-px kontrollerade mot W3C |

## Ommärkning 2026-10-15

Efter granskningen (`konsolidering/granskning-v1.0.md`) och tillägget kl. 14.30 i `konsolidering/skrivregler.md`. N1 gick från 34 punkter (varav 6 automatiska kontroller, plus 13 sektioner med 17 varianter och wireframes för varje sidtyp) till **5 punkter och ingen egen automatisk kontroll**. Inget är struket; allt nedan är flyttat eller sammanslaget. Radnummer avser `guide/2-4-skelett.md` före ommärkningen.

### Kvar i N1

| N1-punkt | Sammanslaget ur |
|---|---|
| AI:n väljer ur biblioteket; saknas en sektion byggs den i biblioteket först | 17, 47 och 24 (konsekvens, inte karaktär) |
| Biblioteket: egna marknadsföringssektioner, inget UI-komponentbibliotek; i första sajten bara de sektioner startsidan och standardsidorna använder, en variant var; provsida i 375 och 1280 px | 22, 23, 28 och 95 |
| En sektion är en Astro-komponent utan eget innehåll och med bara tokens | 52 och 53 |
| HTML först, utan JavaScript (kontrollen i `2-8`) | 56; 98 och 170 blev hänvisningar |
| Blickprovet (femsekunderstestet), granskningskriterium, fynd högst `medel` | 172; samma test som `2-5` 159 och `2-7` 30 |

### Flyttat från N1

| Punkt (rad) | Ny nivå | Skäl |
|---|---|---|
| Två varianter för första vyn, tjänster och kontakt (tabellen, 33–41) | N2 | Granskningen 1.1; en variant var i N1 |
| Riktning = kit på samma innehåll och sidkarta (48) | Löptext (startsidan i tre kit, → `2-5`); kitets föredragna varianter N2 | Granskningen 1.3 punkt 9; riktningarna hör till `2-5` |
| Layoutprimitiver (54), mobilen först (55), `h2` per sektion (67), bredd och höjd på bilder (68) | N2 | Bra hantverk (skrivreglerna, tillägget). Mobil i N1: provsidan i 375 px och N1-kontroll 3 i `2-8`; WCAG 2.4.1 ingår i golvet |
| Kundsajten får en kopia av biblioteket med version i tillståndsfilen (87) | N2 | Ingen tillståndsfil i N1 (`progress.md`), och bara en sajt |
| Provsidan med varje variant och kit i fyra bredder (95) | N2; N1 = 375 och 1280 px | Granskningen 1.1 och 1.3 punkt 6 |
| Kontrollerna mot provsidan (96) | N2 | Inga egna kontroller i N1 |
| Innehåll i värsta fall (97) | N2 | Granskningen 1.1 |
| Med JavaScript avstängt (98) | Hänvisning | Dubblett av regeln *HTML först* (granskningen 2.2) |
| Varianter av isolerade agenter och kritiker (99) | N2 | Granskningen 1.1 och 1.2 |
| Mallar med standardordning (104) | N2; tabellen är utkastet för första bygget | Johnny tittar i N1 |
| Wireframes: layouten först (117), wireframe-kitet (118), varje sidtyp och två startsidealternativ (119), Johnny ser wireframes (120, 179) | N2 | Granskningen 1.1 och 1.3 punkt 9: riktningarna visar startsidan |
| Granskaren väljer bland wireframe-alternativen (121, 180) | N3 (var N2) | Följer av att wireframes blev N2 |
| Gallerivyn (126) | N2 | I N1 visas riktningarna enligt `2-5` |
| Låst kontroll: reflow vid 320 px (167) | Hänvisning | Är N1-kontroll 3 i `2-8` |
| Låst kontroll: klickytor (168) | Delad: låst kontroll 24 × 24 (2.5.8) och granskningskriterium 44 × 44, båda N2 | Granskningen 1.3 punkt 4; i N1 del av WCAG-golvet |
| Låst kontroll: fokus syns (169) | N2 som egen kontroll | Högst tio automatiska kontroller i N1; i N1 del av WCAG-golvet |
| Utan JavaScript som automatisk kontroll (170) | Hänvisning till `2-8` | Granskningen 2.1 punkt 5 och 2.2 |
| Överlapp och avklippta element (171) | N2, rapporterar | Granskningen 2.1 punkt 5 (🔧) |
| Skelettplanen följer mallen (173) | N2, rapporterar | Granskningen 2.1 punkt 5 (🔧) |

### Granskningsfynd som åtgärdats

| Fynd | Åtgärd |
|---|---|
| 1.1, rad `2-4` 28–45, 95, 97, 99, 117–120, 170–173 | Se tabellerna ovan |
| 1.2, varianter med isolerade agenter och kritiker | N2, som i `2-5` |
| 1.2, blickprov | Hemvist här, N1; `2-5` 159 och `2-7` 30 ska hänvisa |
| 1.3 punkt 4, 44 px | Delad i låst kontroll 24 × 24 CSS-px (WCAG 2.5.8) och granskningskriterium 44 × 44 px |
| 1.3 punkt 6, visningsbredder | 320 bara reflow, 375, 768, 1280; 1920 från N2; hänvisning till `bilaga-c-kontroller.md` |
| 1.3 punkt 9, riktningarnas omfång | Startsidan i tre kit |
| 1.5, stickprov 15 (spritt pass för kantfall) | Intaget som N2 i *Hur sektionerna prövas* |
| 2.1 punkt 5, `2-4` 170, 171, 173 | Hänvisning till `2-8`, respektive N2 som rapporterar |
| 2.2, blickprov | Hela regeln här |
| 2.2, inget UI-komponentbibliotek | Hemvist här, i N1-punkten om biblioteket |
| 2.2, HTML först utan JavaScript | Regeln här, kontrollen i `2-8`; rad 98 och 170 strukna som dubbletter |
| 2.2, innehåll skilt från design | Komponentdelen här; texterna → `2-7` |
| 2.3 punkt 10, avsnitt 4-hänvisningen | Frågan om layoutvarianter med Stitch står som "inte prövat; prövas när biblioteket byggs ut", utan hänvisning, eftersom `bilaga-e-oppna-fragor.md` avsnitt 4 gäller wireframes med Stitch-CLI:t |
| Hänvisningar (tillägget) | `karta/4-skelett.md` → `historik/karta/4-skelett.md`; `principer.md` → `guide/README.md`, *Principer* (AI-byggarna har inget eget principnummer, bara källorna); `README.md` → `guide/README.md`; byggplanens steg enligt numreringen 1–6 |

### Inte löst här

- **Dubbletterna i andra filer** ska bli hänvisningar hit: blickprovet i `2-5` 159 och `2-7` 30; HTML först i `2-8` 24 och `2-6`; inget UI-komponentbibliotek i `2-8` 22; innehåll skilt från design i `2-8` 23.
- **`bilaga-c-kontroller.md`** har C22–C31 som N1, C29 med provsidan i 320–1280 px och ingen gemensam uppsättning visningsbredder. Registret behöver följa nivåerna här.
- **`3-2` stopp 2 och C153** nämner wireframes, som nu är N2.
- **`2-8` 104** hänvisar 404-sidans utformning till `2-5`; den står i `2-3` och `2-4` (granskningen 2.3 punkt 3).
