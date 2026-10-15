# Spårbarhet: `guide/3-2-granskning-och-kalibrering.md`

Skrivet 2026-10-15 vid konsolideringen. Radnummer avser `historik/IMPLEMENTERINGSGUIDE-v0.74.md`. Rubrikerna i kolumn 2 är avsnitten i 3-2.

Längd: källavsnitten är cirka 42 kB, filen cirka 22 kB (ungefär 50 %). Den är längre än målet på 40 % eftersom kartans kalibreringsmetod, forskningen om LLM-domare och M14-räkningen av stoppen har tillkommit.

**Motsägelse M9 löst:** en granskare med en checklista på N1; specialister per aspekt på N2 (två källor). Heuristikpanelen med 3–5 likadana granskare (fas 6 rad 542, §11.4 rad 1598) används inte – inte båda.

## v0.74

| v0.74-avsnitt (rader) | Var det hamnade | Struket och varför | Flyttat till annan fil |
|---|---|---|---|
| Fas 1b, `write-checks` (320) | *Körbara kontroller skrivs före bygget* (ommärkningen) | – | Detaljerna: §10.3 nedan; skillen → `bilaga-b-skills.md` |
| Fas 1b, är planeringen för tung? (321–324) | *Eval*, N4 *Är planeringen för tung?* (ommärkningen) | Ebbelaars citat om plan mode och Anthropic-ingenjörerna strukna: referat | – |
| Fas 1b, täckningstabell (335) | *Körbara kontroller*, N2 *Täckningstabell* (ommärkningen) | "I planvyn" och "rött" strukna: planvyn hör till `3-5` | Planvyn → `3-5-live-visning.md` |
| Fas 1b, adversarial granskning av planen (340–345) | *Eval*, N4 *Adversarial granskning av planen* (ommärkningen) | "Kvarstående oenigheter visas i planvyn" → går till Johnny. Videons exempel (GPT mot Claude) struket: referat. Codex-pluginet och Caliper strukna; kvar: annan modell som angripare kräver kundens samtycke ⚠️ | – |
| Fas 1b, stopp 1 och grinden (346–347) | *Stoppen*: stopp 1 (brief) och stopp 3 (kontrollerna i en mening); *Kontrollskriptet … ska fallera* | Funktionsspecifikationen och täckningen i samma stopp strukna i N1 | Låsningen med `godkann-kontroller.mjs` → `3-1` (N2) |
| Fas 4 ingress och åtgärd (412–414) | *Granskaren* | "Jämför mot Stitch-designen" ersatt av referensen: valt stilkit och riktning (beslut 2026-10-15) | – |
| Fas 4, Stitch-projektets id i uppdragsprompten (415) | Princip kvar: granskaren får sin referens i uppdraget (`3-1`) | Stitch-id:t struket: Stitch inte per kundbygge | – |
| Fas 4, bredder 375/768/1280/1920 (416) | *Granskaren*, underlaget (375, 768, 1280) | 1920 struket för N1 (kartan: minst tre storlekar) | – |
| Fas 4, Stitch-exporten är prototypen (417) | – | Struket: Stitch inte per kundbygge | – |
| Fas 4, två granskare parallellt, utseende och beteende (418) | *När en granskare inte räcker*, specialister N2 | N1 har en granskare (M9) | – |
| Fas 4, originalitetskontroll (419) | Hänvisning i blind jämförelse | – | `2-5-yta.md` (D8) |
| Fas 4, layout på pixelnivå (420) och perceptionslagar (421) | – | – | Kriterier → `2-5-yta.md` |
| Fas 4, beskär och zooma (422) | *Granskaren*, underlaget N1 | – | – |
| Fas 4, samma tillstånd före jämförelse (423) | *När en granskare inte räcker*, beteende N2 | `design.functional.md` ersatt av tillstånden i `2-3`/`2-4` | – |
| Fas 4, allvarlighetsgrader (424) | *Granskaren*, N1 | – | – |
| Fas 4, fasta fält för fynd (425–431) | *Granskaren*, N1; schema N2 | Fältet `referens` tillagt (fallgrop 61) | – |
| Fas 4, tre utfall (432) | *Granskaren*, N1 (lyft: två källor) | – | – |
| Fas 4, grind och max 3 rundor (433) | *Granskaren*, *Steget är klart för Johnnys dom* | Rundtaket hänvisar till `3-1` | – |
| Fas 4, granskningsdjup (434) | *Granskningsdjup*, N2 | – | – |
| Fas 4, Hallmark (435) | – | – | `bilaga-a-verktyg.md` |
| Fas 6 ingress (500–501) | Ingressen | – | – |
| Fas 6, specialister per aspekt (503–509) | *När en granskare inte räcker*, N2 | Specialisterna ändrade: berättelse och tempo blir rörelse när sajten har rörelse (flersidig sajt, M13); jämförelsen blev egen punkt | – |
| Fas 6, vilket perspektiv saknas (511) | *När en granskare inte räcker*, N2 (hemvist D24) | – | – |
| Fas 6, textmängd och blickprov (513–516) | – | – | Kriterier → `2-7-innehall.md` (ordgränsen som instruktion) |
| Fas 6, socialt bevis (518), konkret i stället för generiskt (520), faktakontroll (536), språk och Humanizer (537–538) | Exempelraden "finns varje påstående i faktabasen" | – | `2-7-innehall.md` (D14–D16); Humanizer → `bilaga-a-verktyg.md` |
| Fas 6, ingen text i bild (522), långa tankstreck (524), versaler (550) | – | – | `2-7-innehall.md` (D16); grunden för text i bild → `2-8` (WCAG 1.4.5) |
| Fas 6, sammanslagning och två sätt att använda flera granskare (526) | – | Struket: M9 – en modell, inte båda | – |
| Fas 6, kriterier och ton "jury för webbdesignpriser" (527–528) | – | Tonen struken: måttstocken är referensen och Johnnys exempel (fallgrop 61), inte en prisjury; nischen är småföretag | Kriterierna → lagren |
| Fas 6, output och tredje utfall (529–530) | *Granskaren*, tre utfall per kriterium | "Per kapitel" ersatt av per kriterium (flersidig sajt) | – |
| Fas 6, exemplet med stjärnorna, mät prestanda vid scroll (531–532) | – | – | `2-6-rorelse.md`, `2-8` |
| Fas 6, video i stället för skärmdumpar (533–535) | *När en granskare inte räcker*, rörelse N2 | – | – |
| Fas 6, primär handling och lekfulla hinder (539–540) | Exempelraden i checklistan, med lekfulla hinder som granskningskriterium (ommärkningen; fallgrop 120) | "`hög` oavsett hur roligt" struket: kriteriet har en källa och får högst `medel` | `2-3-struktur.md` (primär handling) |
| Fas 6, Awwwards-kriterier (541) | – | Struket som standard: prisjuryns måttstock passar inte nischen | Meng Tos skill → `bilaga-a-verktyg.md` |
| Fas 6, heuristisk utvärdering med 3–5 granskare (542) | – | Struket: M9; Nielsens siffror overifierade | – |
| Fas 6, jämförelse mot förebild i siffror (543–548) | *När en granskare inte räcker*, N2 | Galleriet med 2 000 designsystem struket (ingen adress) | Sajtgranskningen → `4-foretaget.md` |
| Fas 6, fem tecken på AI-slop (549) | – | – | Kriterier → `2-5`, `2-7` |
| Fas 6, blind jämförelse (551–556) | *När en granskare inte räcker*, N2, instruktion | Grinden struken: skenbart lyft (konsolideringsanalysen §4.4). Positionsbyte lagt till (Zheng) | – |
| Fas 6, granskningsdjup och grind (557–558) | *Granskningsdjup*; *Steget är klart* | "Alla kapitel fungerar" ersatt av tre utfall per kriterium | – |
| Fas 6b ingress och Shopify-varianten (560–564) | *När en granskare inte räcker*: kodgranskning N2, kritiker och rättare N4 | – | – |
| Fas 6b, mätbar första sållning, Anti-Slop (565) | Princip i *Mätbart före bedömt* | – | Anti-Slop → `bilaga-a-verktyg.md`; linter → `2-8` |
| Fas 6b, arkitektur, Pocock, `/simplify` (566–567) | – | – | `2-8-teknik-och-kvalitet.md`, `bilaga-a-verktyg.md` |
| Fas 6b, agent teams (568) | – | – | `bilaga-a-verktyg.md` |
| Fas 6b, standarden (569–574) | – | – | `2-8-teknik-och-kvalitet.md` |
| Fas 6b, efter varje rättning, tak 3, grind (575–577) | *Kritiker och rättare*, N4 | – | – |
| Fas 7, punkt 7, avstämning mellan löften och resultat (615) | *Slutgranskningen*, N2 *Avstämning mot löftena* (ommärkningen; fallgrop 78) | – | – |
| §5.4 två stopp (835–841) | *Stoppen och människan*, tabellen | "Två stopp" ersatt av det verkliga antalet (M14). Valfritt designval struket: riktningen är Johnnys (beslut 2026-10-15) | Publiceringens kontroller → `2-8` |
| §5.4 ansvaret ligger hos människan (842) | *Stoppen och människan*, ingressen | Loggning per agent → *Resultatlogg* | – |
| §5.4 pilotfas (844) | *Stoppen och människan*, N1 och N2 | 90 %-villkoret blev öppet (bilaga E, *Autonomi*) | – |
| §5.4 trappan av insatser (846–850) | – | – | `4-foretaget.md` (kundavtal, pilot på egna sajter); säkerhet → `3-3` |
| §5.4 människa, modell, regel (852) | *Mätbart före bedömt*, N1 | Siffrorna ur bankexemplet strukna | – |
| §7.1 mätbart före bedömt, tabellen (976–984) | *Mätbart före bedömt* | – | – |
| §7.6 granskningsdjup (1149–1160) | *Granskningsdjup*, N2 | – | – |
| §9 ingress (1346–1348) | *Eval* | – | – |
| §9.1 build eval och hillclimb (1350–1355) | – | Struket: byggt för appar som anropar en modell (videons eget förbehåll); ersatt av skill-creator och `claude plugin eval` (📄 research) | – |
| §9.2 testsvit med fiktiva briefar (1357–1366) | *Eval*, testsvit N4 | Fiktiva briefar ersatta av riktiga verksamheter (webb-pro-genomgången, risk 2); scrollytelling-briefen struken. Svårigheterna behållna (mycket text, motstridiga krav, mobil först) | – |
| §9.3 mått per körning (1368–1376) | *Eval*, N1: per sajt loggas | Huvudmåttet bytt till Johnnys dom; rundor, fynd och ingrepp blev felsökningsdata | Codeburn → `bilaga-a-verktyg.md` |
| §9.3 värdet i siffror (1378) | *Eval*, N3 | Cursor-anekdoten struken | Prissättning → `4-foretaget.md` |
| §9.3 resultatet per körning, felsökning, Agit (1380–1382) | – | – | Agit → `bilaga-a-verktyg.md` |
| §9.4 arbetssätt, slumpvariation, kostnad (1384–1392) | *Eval*, *En ändring i taget* och testsviten N4; kostnad | Kostnadsanekdoterna (116 dollar, 200 000 tokens) ersatta av Anthropics siffror i *Harness design* | – |
| §9.5 eval per tillval, Caliper (1394–1399) | *Eval*, N2 (princip) | – | Caliper → `bilaga-a-verktyg.md` |
| §9.6 kalibrering, metoden med 100 exempel (1401–1408) | *Kalibrering* | 100 exempel och stegen 75–99 % ersatta av kartans metod: 30–40 skärmdumpar, TPR/TNR, bara grova beslut | – |
| §9.6 datan finns redan, tabellen, `varfor` (1410–1418) | *Kalibrering*, tabellen; `varfor` i *Slutgranskningen* | Raden Variate struken här | Variate → `3-5-live-visning.md`; missade fynd → `3-4` |
| §9.6 loopen följer principerna (1420) | *Kalibrering*, N2 | – | – |
| §9.6 villkor för pilotfasen, 90 % (1422) | *Kalibrering*, N4, öppet | Villkoret öppet (bilaga E, *Autonomi*; karta-mot-guide, konflikt 12–13) | – |
| §10.3 kontroller åldras (1474) | Hänvisning i *Körbara kontroller* (ommärkningen) | Dubblett (granskningen 2.2) | `3-4-larande-och-underhall.md` (hemvist) |
| §10.3 `write-checks` och ny fas 1b (1475–1481) | *Körbara kontroller*, N1 | "Ny fas 1b" struket som historik | Skillen → `bilaga-b-skills.md` |
| §10.3 typiska kontroller, tabellen (1483–1490) | – | Kapitelkontrollen struken (flersidig sajt) | `bilaga-c-kontroller.md` |
| §10.3 godkänd men inte inkopplad (1492) | *Körbara kontroller*, N1 | – | Nyckelresorna → `2-3-struktur.md` |
| §10.3 vad som inte kan låsas (1494) | *Körbara kontroller*, N1 | – | – |
| §10.3 utforskningstest (1496–1501) | *Körbara kontroller*, N2 | – | Ny besökare i förvaltningen → `2-9` |
| §10.4 resultatlogg, spårbarhet, behåll eller ångra (1503–1513) | *Resultatlogg*, N2; domloggen N1 | Fältet `djup` tillagt (§7.6); `runda` heter `varv` | – |
| §10.5 Gate 4, slutgranskning (1536–1537) | *Slutgranskningen*, N1 | "Gate 4" och "stopp 2" heter nu slutgranskning (stopp 5) | Variate → `3-5-live-visning.md` |
| §10.5 förhör före slutgodkännande (1538) | *Slutgranskningen*: sammanfattningen med belägg N1, förhöret N2 (D13) | – | Förhör före sammanslagning → `2-9` |
| §10.5 Ultra review (1539) | *Slutgranskningen*, N3 | ⚠️ ersatt med 📄 (`/code-review ultra`, debitering) | – |
| §10.5 elementknuten feedback (1540) | *Slutgranskningen*, N2 (D13) | – | – |
| §10.5 feedback direkt till `arbetssatt.md` (1541–1542) | *Slutgranskningen*, *Johnnys dom gäller den sajten* | Ändrat: en dom blir regel bara om Johnny säger det (README princip 10; webb-pro-genomgången, risk 4) | Förslag till regler → `3-4` |
| §11.4 fas 6 som heuristisk utvärdering med 3–5 granskare (1598) | – | Struket (M9) | – |

## Fallgropar ur §13

| Nr | Var |
|---|---|
| 16 Kontrollerna går igenom men funktionen är inte inkopplad | *Körbara kontroller* |
| 21 Full granskning av varje liten ändring | *Granskningsdjup* |
| 25 Sajten ser rätt ut men koden är bristfällig | Kodgranskning |
| 32 Granskaren gissar | Tre utfall |
| 55 Skärmdumpar kan inte granska rörelse | Rörelse på video |
| 56 Beteendegranskaren saknar facit för tillstånd | Beteende mot tillstånden |
| 59 Granskaren vet varvnumret | *Granskaren* |
| 61 Utan förebild hittar kritikern på en egen standard – blir regel | *Varje bedömning har en referens* |
| 51 Tyst nedskärning | *Täckningstabell* (ommärkningen; hemvist för *inget släpps tyst*: `3-1`) |
| 64 En runda per kommentar | *Slutgranskningen* |
| 70 Autonomi innan förtroende | *Stoppen och människan* |
| 74 Kontroller som aldrig underkänner | *Kontroller åldras* |
| 78 Utlovat men aldrig byggt | *Avstämning mot löftena* (ommärkningen) |
| 82 En granskare med för många kriterier | Specialister |
| 87 Slentriangodkännande | Förhöret |
| 100 Vaga fynd | Fasta fält |
| 120 Lekfulla hinder före den primära handlingen | Checklistans exempelrad om primär handling (ommärkningen) |
| 128 Tillval på utlovade siffror | *Eval*, tillval |
| 135 En regel med en enda källa behandlas som säker | *Checklistan fylls i som markdown*: fynd mot ett kriterium med en källa får högst `medel` (ommärkningen) |
| 139 Granskare av smak som aldrig kalibrerats | *Kalibrering* |
| 147 Nedskalad helsidesbild | Underlaget |
| 162 Att aldrig fråga vilket perspektiv som saknas | *Vilket perspektiv saknas?* |
| 170 Avvisningar utan motivering | *Slutgranskningen* |
| 194 Jämförelse mot förebild utan mätvärden | Jämförelse i siffror |

## Kartan, principerna och researchen

| Underlag | Var |
|---|---|
| `historik/karta/flodet.md`, *Den kalibrerade bedömaren* (30–40 skärmdumpar, 10–20 % som exempel, bara grova beslut) och *Öppet* (nära slumpen vid subtila skillnader; ingen studie för småföretagssajter) | *Kalibrering* |
| `kunskap/research/2026-10-15_kompetensluckor-anteckningar/flodet-loopar-bedomare.md` §1 (Best practices om granskare, skill-creator, `claude plugin eval`) och §2 (Zheng, Chen, Luera, Prometheus, Shankar, Husain, Demystifying evals, Harness design) | *Granskaren*, blind jämförelse, *Eval*, *Kalibrering* |
| `kunskap/research/2026-10-15_webb-pro-genomgang.md` (punkt 7, 8, 11; risk 2, 3, 4) | Ingressen, *Mätbart före bedömt*, *Stoppen*, *Eval*, *Kalibrering* |
| `kunskap/research/2026-10-14_claude-code-verifiering.md` (rad 9i, Ultra review) | *Slutgranskningen* |
| `kunskap/research/2026-10-15_karta-mot-guide.md`, konflikt 12 och 13 | Öppna frågor om autonomi och bedömaren |
| `LAGE.md`, *Börja nu* | 30–40 skärmdumpar |
| README princip 1, 2, 6, 8, 9, 10 | Ingressen, specialister, *Slutgranskningen*, *Kalibrering* |
| Konsolideringsanalysen §2 D12, D13, D18, D24; §3 M9, M14; §4.2–4.4; §7.3–7.4 | Hela filen |

## Till andra filer

- `bilaga-e-oppna-fragor.md`, *Autonomi*, säger att villkoren står i 3-2, och 3-2 hänvisar dit för att frågan är öppen. 3-2 anger nu alternativen; bilagan bör behålla frågan.

## Ommärkning 2026-10-15

Efter granskningen (`konsolidering/granskning-v1.0.md`) och skrivreglernas tillägg kl. 14.30. Nivåerna i tabellerna ovan gäller den första konsolideringen; där de skiljer gäller det här avsnittet. Inget är struket utom dubbletter, som ersatts med hänvisningar.

**N1 före och efter:** 25 punkter före, 6 efter.

### N1 som finns kvar

| Punkt | Vad den slår ihop |
|---|---|
| *Det mätbara avgörs av kontrollskriptet …* (*Mätbart före bedömt*) | Skript, granskare, Johnny; *Design och helhetsintryck blir inte kontroller*; *En kontroll avgör om ett steg är redo för Johnnys dom* (granskningen 1.3, punkt 3). Varför-meningen om webb-pros åtta av elva körningar flyttad hit från `3-1` |
| *Kontrollskriptet skrivs före bygget och ska fallera* | De tio N1-kontrollerna (`2-8`) i början av `5-byggplan.md`, steg 3; *Minst en kontroll går hela vägen som besökaren* (fallgrop 16) inarbetad |
| *En granskare, en checklista, en referens – från steg 4* | Checklistan i markdown; *Varje bedömning har en referens* (utom Johnnys exempel, se nedan); *Underlaget* med sektion för sektion i full upplösning (fallgrop 147, behålls här enligt granskningen 2.2); lekfulla hinder tillagda (1.5) |
| *Checklistan fylls i som markdown* | Tre utfall; fynd som markdownlista med element, förväntat, faktiskt, allvar (ersätter JSON i N1); allvarsgraderna; "Fynd mot ett kriterium med en källa får högst allvaret `medel`" (granskningen 2.1, punkt 6; fallgrop 135) |
| *Johnny testar sajten själv* (*Slutgranskningen*) | Slutgranskningen och *Först en sammanfattning med belägg*; i första bygget i slutet av steg 3 |
| *Johnnys domar är måttet och den första kalibreringen* (*Kalibrering*) | `domar.jsonl`; *Varje avvisning får en kort motivering* (fallgrop 170); jämförelsen mellan granskarens fynd och Johnnys dom i `5-byggplan.md`, steg 4 |

### Flyttat från N1

| Punkt (före) | Nu |
|---|---|
| *Kontrollerna körs först, granskaren sedan* | N2 |
| *Briefens mätbara krav blir körbara kontroller* | N2 för kontroller utöver de tio; N1-delen i kontrollskriptpunkten |
| *Gräns: skriptet litar på granskarens rapport* (omärkt) | Löptext |
| *Granskaren vet inte vilket varv det är* | N2 |
| *Fasta fält för varje fynd* (JSON med nio fält) | N2, *Fynden som JSON med fasta fält*; i N1 markdownlista |
| *Steget är klart för Johnnys dom* (`kritisk`, `hög` = 0) | N2; i N1 stoppar granskaren inget, fynden jämförs med Johnnys dom |
| *Varje bedömning har en referens*, Johnnys bedömda exempel | N2, egen punkt |
| *Pilotfasen* | N2 |
| *Inget stopp godkänns på timeout* | N2; inställningen bor i `3-3` |
| *Släpps aldrig* (omärkt) | N2 |
| *Önskade ändringar blir nya byggsteg* | N2 |
| *Johnnys dom gäller den sajten* | Löptext med hänvisning till `guide/README.md`, princip 10 (dubblett) |
| *Eval mäter Johnnys dom*; *Per sajt loggas* | N2; i N1 är eval `domar.jsonl` och tiden i `progress.md` (löptext) |
| *Johnnys domar sparas …* (*Resultatlogg*) | Inarbetad i kalibreringspunkten (N1); löptext med hänvisning |
| *Johnny bedömer 30–40 skärmdumpar* | N2; kan börja nu, blockerar inte första sajten |
| *Kostnad* (omärkt listpunkt) | Löptext |

Därtill, inte från N1:

- *Kontroller åldras* (N3) → hänvisning till `3-4-larande-och-underhall.md`, som är hemvist (granskningen 1.2 och 2.2).
- *Kalibrera om* delades: när Johnny ändrar uppfattning N2, vid modellbyte N3 (granskningen 1.2; `5-byggplan.md`, N3-raden).
- Stopptabellen skrevs om till ett stopp per steg i `5-byggplan.md`: 1 brief, 2 riktningar, 3 bygget (kontrollerna i en mening, sajten löpande, slutgranskningen), 4 granskaren, 5 publicering, 6 första rapporten. Det gamla stopp 2 (sidkarta och kontroller) delades: sidkartan i stopp 1 (`sites/<namn>/sidkarta.md`), kontrollerna i stopp 3. Antalet räknas ur `progress.md` i stället för `state.json`; `blocked` och ändrade låsta filer gäller från N2.

### Nytt innehåll (granskningen 1.5)

| Innehåll | Var | Källa i v0.74 |
|---|---|---|
| Lekfulla hinder före den primära handlingen, granskningskriterium | *Granskaren*, checklistans exempelrad (N1) | Fas 6, rad 540; fallgrop 120 |
| Täckningstabell | *Körbara kontroller*, N2 | Fas 1b, rad 335 |
| Avstämning mot löftena, isolerad agent mot brief och beslutskarta | *Slutgranskningen*, N2 | Fas 7, rad 615; fallgrop 78. Gör hänvisningen i `2-8` (granskningen 2.3, punkt 4) giltig |
| Är planeringen för tung? Smal variant prövad i eval | *Eval*, N4 | Fas 1b, rad 321–324 |
| Adversarial granskning av planen, angripare, högst 3 omgångar | *Eval*, N4 | Fas 1b, rad 340–345. Gör *Vilket perspektiv saknas?* (… granskningen av planen) och hänvisningen i `bilaga-b-skills.md` (angripare) giltiga |

### Övriga fynd som åtgärdats

| Fynd | Åtgärd |
|---|---|
| 1.2, specialistgranskare | N2 i 3-2, oförändrat (`5-byggplan.md` ändras av en annan agent) |
| 1.3, punkt 10 | Löptext under *Granskaren*: ingen granskare i första bygget, Johnny dömer i steg 3, granskaren från steg 4 |
| 2.2, jämförelse mot förebild i siffror; sektion för sektion | Behålls här (hemvist); `2-5` ska hänvisa hit (ändras av den som äger `2-5`) |
| Hänvisningar (skrivreglerna) | `karta/flodet.md` → `historik/karta/flodet.md` (fyra ställen); "README, princip 8" och *Bänken* → `guide/README.md`; "bilaga E" → `bilaga-e-oppna-fragor.md`; byggplanens steg enligt `5-byggplan.md`, steg 1–6 |

### Inte löst här

- **`principer.md` i *Ett stopp släpps ett i taget*:** villkoret "levererat några gånger i rad utan att Johnny behövt rätta" finns bara i `historik/principer.md`, *Ordningen*, inte bland principerna i `guide/README.md`. Hänvisningen går därför till arkivet, med "jfr princip 7".
- **Visningsbredderna** (granskningen 1.3, punkt 6): granskarens underlag har kvar 375, 768 och 1280 px. En gemensam uppsättning hör till `bilaga-c-kontroller.md`.
- **Kantfallen** (fas 1b, rad 325) och **planvyn** (rad 326) hör enligt granskningen till `bilaga-c-kontroller.md` och `3-5-live-visning.md`, inte hit.
- `guide/bilaga-c-kontroller.md` anger fortfarande de gamla nivåerna för C135–C162 (bland annat C139, C141, C153 och C158). Filen är inte min.
- `guide/n1-forsta-sajten.md` behöver genereras om med `konsolidering/bygg_n1.py`.
