# Spårbarhet: `guide/2-9-drift-och-forvaltning.md`

Skrivet 2026-10-15 vid konsolideringen. Radnummer avser `historik/IMPLEMENTERINGSGUIDE-v0.74.md`. "2-9" = `guide/2-9-drift-och-forvaltning.md`. Kopplingarnas utredning flyttades till den nya filen `kunskap/research/2026-10-14_kopplingar-per-kund.md` ("researchfilen").

## Fas 8 och §15.2

| v0.74-avsnitt (rader) | Var det hamnade | Struket och varför | Flyttat till annan fil |
|---|---|---|---|
| Fas 8, rubrik och ingress (621–622) | 2-9, ingressen | Rubrikens "idéer delvis ur Grok Bot-videon" – källan står nu vid varje regel | – |
| 8a dagligen, röktest (627) | 2-9, Schemalagda kontroller, dagligen | – | Kontrollerna själva: `2-8` (konsolideringsanalysen §7.4) |
| 8a veckovis (628) | 2-9, veckovis | – | Prestandagränserna: `2-8` |
| 8a månadsvis, säkerhetsgranskning (629) | 2-9, månadsvis | Hermes-videons referat (videoreferat) | Verktygsvalet: `2-8` (D19); Mantis: bilaga A |
| 8a månadsvis, AEO och OKF-tillval (630) | 2-9, AEO-raden [N4] och tillvalspunkten [N4] | – | – |
| 8a månadsvis, värde för kunden (631) | 2-9, Rapporten (månadsrapporten, nästa begränsning) | "kundens samtycke" heter nu *kundens godkännande* (D4-noten: samtycke reserveras för kakor) | Nordstjärnans definition: `2-1` (D26); Google Workspace CLI: bilaga A |
| 8a månadsvis, OpenSEO (632) | 2-9, tillvalspunkten (pekare) | – | Bilaga A |
| 8a månadsvis, ny besökare (633) | 2-9, månadsvis | – | Utforskningstestet: `3-2` |
| 8a, bevis och beslutssiffror (635) | 2-9, Rapporten, belägg och beslutssiffror | Grok Bot-referatet | Belägg som mekanism: `3-1` (D2) |
| 8a, AEO som trend (636) | 2-9, AEO-raden | – | – |
| 8a, formulärtest utan att störa kunden (637) | 2-9, dagligen (pekare) | – | Märkning, filtrering och bekräftelsemejl: `2-8`, formulär (D3) |
| 8a, schemaläggning (638) | 2-9, Schemaläggning | ⚠️ om molnagenters åtkomst ersatt av behörighetsregeln (läsrätt, inloggning per kund) | – |
| 8b, ärenden via ärendeagenten (641) | 2-9, Ändringar, första punkten | – | Ärendeagenten: `4-foretaget.md` |
| 8b, ändringsbrief och samma grindar (642) | 2-9, Samma grindar som bygget | – | `3-1`, `3-2` |
| 8b, ändrade fakta (643) | 2-9, Ändrade fakta | – | Faktabasen: `2-7` (D15) |
| 8b, visuell regression och Vizzly (644) | 2-9, Visuell regression | Videons Playwright-referat | Baslinjen skapas i `2-8` (fas 7 steg 9); Vizzly: bilaga A |
| 8b, Variate (645) | 2-9, kön-punkten [N4] (pekare) | – | Bilaga A |
| 8b, elementknuten feedback (646) | 2-9, kön-punkten (pekare) | – | `3-2` (D13) |
| 8b, snabbgranskning (647) | 2-9, Samma grindar (pekare) | – | `3-2` |
| 8b, effort, ny brief, grundorsak (648) | 2-9, Samma grindar | – | Effort: `3-3` (D5) |
| 8b, låsta filer (649) | 2-9, Förhör-punkten (pekare) | – | `guide/README.md` (D7) |
| 8b, egen gren, publicering (650) | 2-9, En ändring per gren och PR | – | `3-1` |
| 8b, kö (651) | 2-9, Kön [N3] och batch [N4] | "Videons kö med två funktioner tog cirka 3 timmar" – videoreferat, ingen regel | – |
| 8b, otydlig brief byggs inte (652) | 2-9, En otydlig ändringsbrief | – | – |
| 8b, dubbletter slås ihop (653) | 2-9, Kön | – | – |
| 8b, Symphony (654) | 2-9, kön-punkten (pekare) | Ersatt i löptexten av researchens förslag (`claude-code-action`, officiellt) | Bilaga A |
| 8b, förhör före sammanslagning (655–657) | 2-9, Förhör-punkten (när det är förvalt) | "Ett felaktigt svar stoppar inte sammanslagningen" | Förhörets mekanik: `3-2` (D13) |
| 8c, larm och rättning (659–661) | 2-9, Larm och incident | – | – |
| 8d, läsrätt och sandlåda (663–664) | 2-9, Behörigheter och tillsyn | Grok Bot-kontrasten (videoreferat) | Rolltabellen och behörighet i verktyget: `3-1` (D27); sandlåda: `3-3` (D10) |
| 8d, tillsyn efter konsekvens (665) | 2-9, hänvisning under *Behörigheter och tillsyn* (sedan ommärkningen) | – | `3-1` (D1/D27; granskningen 2.2) – exakt text under *Ommärkning 2026-10-15* |
| 8d, tillsynstabellen (666–672) | 2-9, hänvisning (sedan ommärkningen); ny rad "Ändring i kundens Google-profil" ur 8g:s slutsats (703) följer med tabellen | – | `3-1` – exakt text under *Ommärkning 2026-10-15* |
| 8d, rabattkoden (673) | 2-9, hänvisning (sedan ommärkningen) | – | `3-1`, med tabellen; "En regel i prompten är ett förslag; en regel i verktygen är en begränsning": `3-1` |
| 8g, ingress och Lovable-idén (675–676) | 2-9, Kopplingar, ingress | – | Researchfilen |
| 8g, användningstabellen (677–684) | 2-9, Kopplingar (Search Console, Business Profile, analys, CrUX, Resend) | – | Hela tabellen: researchfilen; Firecrawl (fas 0b): `2-2` |
| 8g, principerna 1–3 (686–689) | 2-9, Skript för schemalagda kontroller; Egna egendomar; Kopplingar prövas | – | – |
| 8g, utredningen (690–699) | – | – | Researchfilen (enligt uppdraget) |
| 8g, slutsatserna (700–704) | 2-9, Search Console, Business Profile, Egna egendomar | "GA4:s officiella MCP är förstahandsval för interaktiv analys" – GA4 är bara tillval, och researchen 2026-10-15 ger GA-MCP:n domen Bevaka (märkt *Experimental*) | Researchfilen |
| 8e, lärdomar tillbaka (706–707) | 2-9, Lärdomar tillbaka till bygget | – | Förslagsflödet: `3-4`; kriterier: `3-2` |
| 8f, byggsystemets underhåll (709–715, 717–718) | 2-9, en pekare | – | `3-4` (städa, dubbletter, tester, plugin, rensningsprov, `/doctor`) |
| 8f, arkitekturgranskning av förvaltade sajter (716) | 2-9, kvartalsvis | – | – (gäller kundsajterna, inte byggsystemet) |
| §15.2 ärendeagenten (2219–2232) | 2-9, Ändringar, första punkten (flödet in i förvaltningen); Hur självgående (aldrig agent) | – | Hela ärendeagenten: `4-foretaget.md`; tillsynstabellens rad "Svar till kund": `3-1` (ommärkningen) |

## Hänvisningar på andra ställen i v0.74

| v0.74 (rader) | I 2-9 | Hemvist |
|---|---|---|
| Projektstrukturen `forvaltning/`, `andringar/` (216–217) | Vad som kommer ut | Projektstrukturen (bilaga) |
| `/loop` mot `/goal` (774) | Schemaläggning | `3-1` |
| Förvaltningsagenter i rolltabellen (803) | Behörigheter (pekare) | `3-1` |
| Sajt i förvaltning stannar på sin pluginversion (1329) | Lärdomar, byggsystemets underhåll | `3-4` |
| Missade fynd från driften (1545, 1548) | Lärdomar tillbaka till bygget | `3-4`, `3-2` |
| §14 förvaltningsfrågorna (2169–2173) | *Öppet*-markeringarna | Bilaga E. 2172 (formulärtester) är besvarad och stryks. |

## Fallgropar ur §13 som tagits in

| Nr | I 2-9 |
|---|---|
| 14, 34 | Schemaläggning (obevakad körning får inte fastna på en fråga; → `3-3`) |
| 40 | Rapporten, belägg |
| 41, 124 | Behörigheter och tillsyn |
| 42 | Schemalagda kontroller, formulärtest (mekaniken i `2-8`) |
| 57 | Schemaläggning |
| 70 | Hur självgående |
| 81 | En ändring per gren och PR |
| 87 | Förhör före sammanslagning |
| 93 | Ändrade fakta |
| 98 | Kopplingar prövas med låst version |
| 99 | Kundens text är data |
| 110 | Visuell regression |
| 121 | Kopplingar per kund, ingress |
| 126, 185 | En ändring per gren och PR (staging bakom Access) |
| 142 | Kvartalsvis arkitekturgranskning |
| 145 | Lärdomar tillbaka till bygget |
| 154, 155 | Tillsynstabellen och exemplet – flyttade till `3-1` vid ommärkningen (3-1 hade redan båda numren) |
| 156 | Standardkatalogen (priser aldrig standard) |
| 159, 173 | Nästa begränsning |

Fallgrop 151 (agent som gör återbetalningar och raderingar) hör till `4-foretaget.md`; 2-9 pekar dit under *Aldrig agent*.

## Karta, research och webb-pro som använts

| Underlag | Använt i 2-9 |
|---|---|
| `karta/9-drift-forvaltning.md` | Förvaltningsmodellen (objekt, roller, ändringstyper, tjänstenivåer), dataåtkomst, övervakning, uppdateringar, ändringsflödet, månadsrapporten, autonomi, öppna flaggor |
| `karta/8-teknik-kvalitet.md` | Visuell regression (diffen till Johnny, agenten uppdaterar inte basbilden), WCAG-EM årligen |
| Anteckningarna lager 9, fråga 1 | Kopplingar: `cloudflare/mcp` med två tokens, mcp-gsc (pinna), Business Profile (60 dagar, tio redigeringar per minut, egen klient) |
| Anteckningarna lager 9, fråga 2 | Extern vakt, besked vid avbrott över 15 minuter, inga publika statussidor, SRE: åtgärdbara larm |
| Anteckningarna lager 9, fråga 3 | Renovate, sju dagars karenstid, karenstid i pakethanteraren, `wrangler rollback` |
| Anteckningarna lager 9, fråga 4 | pm3, ITIL 4, DORA, ändringskatalogen, intagsflödet, spärrarna mot promptinjektion, uppgiftsminimering, personuppgiftsbiträde |
| Anteckningarna lager 9, fråga 5 | Månadsrapportens innehåll, den 4:e, ögonblicksbild i Git, Johnnys granskning de första månaderna |
| `kunskap/research/2026-10-15_kompetensluckor-och-kandidater-per-lager.md`, lager 9 | Kandidaterna och domarna (hänvisning, förs in i bilaga A) |
| `kunskap/research/2026-10-15_karta-mot-guide.md` | Konflikt 9 (huvudmått, abonnemang eller trappa) som öppen fråga |
| `kunskap/research/2026-10-15_guide-konsolideringsanalys.md` | Hemvister (D2, D3, D4, D5, D7, D10, D13, D15, D19, D26, D27), M3 (Cloudflare i kopplingarna), M15 (analys), §4.3 (lyfta regler), §4.4 (tillsynen är en källa), §6.2 (8g till research), §7.3 (nivåer) |
| `kunskap/research/2026-10-14_stitch-och-verktyg.md` | Business Profile (14 dagar, ingen läsroll), Search Console (begränsad användare, delvis bekräftat) |
| `kunskap/research/2026-10-14_claude-code-verifiering.md`, `2026-10-14_cloudflare-stack.md` | `/loop`, Cron Triggers |
| Webb-pro `kunskap/drift.md` | Tre lägen (ok, incident, okänt), incidentordningen och loggen, stängd lista för faktarättelser, betalnummer (PTS), kundens text som underlag |
| Webb-pro `kunskap/andringsmetod.md` | Ändringsmetoden i sex steg, tillstånden (arbetskopia, commit, förhandsversion, produktion) |
| Webb-pro `kunskap/andringar.md` | Bara principen kunskap per kund i granskbara filer; mekaniken (terminalflik, lås, kvitteringar, repoväljare) är struken |
| Webb-pro `kunskap/lansering.md` | Sidan *Så ändrar du på sajten* |

Inte använt ur researchen (förs in i bilaga A som kandidater): UptimeFlare, Uptime Kuma, Checkly, Plausible och Umami, Pages CMS, 46elks i detalj, Resend Receiving, Changesets, DNSControl, seo-monster, frappe/builder. Detaljerna i Renovate-presetet stannar i anteckningarna (skissen är inte validerad).

## Motsägelser och öppna frågor (till bilaga E)

1. **Priser:** webb-pro (`drift.md`) och researchens ändringskatalog räknar prisändringar som rutin eller standard; v0.74 §15.2 säger både "rutinändring … priser" och "hög risk: priser". 2-9 följer den strängare regeln (priser aldrig standard, aldrig utan Johnny).
2. **Automatisk sammanslagning:** researchen och kartan låter CI godkänna standardändringar och Renovate-uppdateringar (automerge), men v0.74 kräver Johnnys godkännande för varje publicering. 2-9 har Johnnys klick på [N3] och lämnar automatiken öppen på [N4].
3. **Huvudmåttet:** nordstjärna per kund (guiden) eller kontakter från Google-profilen (kartan) – `karta-mot-guide.md`, konflikt 9.
4. **Search Console-behörighet** för tjänstekonto: Restricted (stitch-researchen) eller Full (mcp-gsc:s README). Står i researchfilen.
5. Från v0.74 §14: var kontrollerna körs, vart larm går, hur önskemål kommer in och vem skriver ändringsbriefen, förvaltningens nivå per kund.
6. Nortropic som personuppgiftsbiträde och biträdesavtalet med underbiträden (tolkning, inte juridisk rådgivning).

## Att stämma av med andra filer

- `2-8`: formulärtestets märkning (fallgrop 42), baslinjen för visuell regression (fas 7 steg 9), valt verktyg för säkerhetsgranskning, att rollback inte återställer data, WCAG-EM.
- `3-2`: förhör, snabbgranskning, utforskningstest, elementknuten feedback, avvisade diffar som kalibreringsdata.
- `3-1`: belägg, behörighet i verktyget, förvaltningsagenternas rad i rolltabellen.
- `3-4`: 8f utom arkitekturgranskningen, missade fynd.
- `4-foretaget.md`: §15.2, kundens hjälpguide, avtal.
- Planen: steg 7 *Förvaltningens första rapport* motsvaras av 2-9:s [N1]-punkt. (Sedan ommärkningen: `5-byggplan.md`, steg 6.)

## Ommärkning 2026-10-15

Efter granskningen (`konsolidering/granskning-v1.0.md`) och tillägget kl. 14.30 i `konsolidering/skrivregler.md`.

### N1

| Före | Efter | Vad som hände |
|---|---|---|
| 2 punkter: *Rapporten* (den första rapporten) och *Vad som kommer ut* (samma rapport, dömd av Johnny) | 1 punkt: *Rapporten*, den första rapporten (`5-byggplan.md`, steg 6), gjord för hand med Claude | Raden i *Vad som kommer ut* var en dubblett och blev löptext med hänvisning till *Rapporten*. N1-punkten säger nu uttryckligen "utan schemalagda kontroller". |

Inga andra punkter i 2-9 var N1. Listrader utan märke i *Kompetens och källor* fick märken (förvaltningsskillen [N3], rapportmallen [N2] – egen rad, eftersom mallen enligt *Rapporten* kommer redan i sajt 2–5 –, övrigt bibliotek [N3], åtkomst [N3]). *Förankring* och "Lagret har inga egna grindar" blev löptext; de är inga regler.

### Granskningsfynd som åtgärdats

| Fynd | Åtgärd i 2-9 |
|---|---|
| 1.2 Schemalagda kontroller (N3) | Ny ingressmening under *Schemalagda kontroller*: de hör till förvaltningen (N3), den första sajten har inga. Tabellen var redan N3 (AEO N4). `5-byggplan.md` och `2-8` 167 rättas av sina skribenter. |
| 1.2 Visuell regression (N3) | Oförändrat N3. `2-8` 167 ([N4] → [N3]) är `2-8`:s sak. |
| 1.2 Agenten som orsakat en avvikelse rör inte baslinjen (N3, hemvist 2-9) | Bruten ur punkten om visuell regression till en egen [N3]-punkt, så att andra filer kan hänvisa hit. "Varken basbilden eller undantagslistan" togs in ur `2-8` 174; varför-satsen hänvisar till *Den som bedöms får inte ändra domaren* i `3-1`. `2-8` 174 bör hänvisa hit, inte till `3-1`. |
| 2.2 Tillsyn efter konsekvens och räckvidd → `3-1` | Punkten, tabellen och rabattkodsexemplet ersatta med en hänvisning under *Behörigheter och tillsyn*. **Texten som `3-1` ska ta emot står nedan.** |
| 2.2 Arkitekturgranskning kvartalsvis bor i 2-9 | Oförändrad (tabellen, *Kvartalsvis*). Raden i `3-4` 78 stryks av `3-4`:s skribent. |
| 2.3 punkt 2 | "(planens steg 7)" → "(`5-byggplan.md`, steg 6)". |
| 2.4 Huvudmåttet | Hänvisar till `guide/bilaga-e-oppna-fragor.md` (anroparen lägger in frågan). |
| 2.4 Prislistan som standardändring | Standardkatalogen: "Priser är aldrig standard (fallgrop 156)"; förslaget ur anteckningarna, fråga 4, hänvisar till `guide/bilaga-e-oppna-fragor.md` (anroparen lägger in frågan). |
| 3.1 Bilagor med filnamn | 15 ställen: "bilaga E" → `guide/bilaga-e-oppna-fragor.md`, "bilaga A" → `bilaga-a-verktyg.md`. |
| 3.2 `principer.md` | → "`guide/README.md`, princip 8" (*Hur självgående*). Två hänvisningar till `guide/README.md` preciserade till princip 9 (föreslå–besluta–låsa, låsta filer); bänken → `guide/README.md`, *Bänken*. |
| Kartan | `karta/9-drift-forvaltning.md` och `karta/8-teknik-kvalitet.md` → `historik/karta/…`. |

### Texten som `3-1-orkestrering-och-roller.md` ska ta emot

Hemvist enligt granskningen 2.2 (D1/D27). Exakt så som den stod i 2-9 (*Behörigheter och tillsyn*) före ommärkningen:

```markdown
- [N3] **Tillsynen motsvarar konsekvens och räckvidd:** ju fler en handling påverkar och ju svårare den är att ångra, desto viktigare är stoppet. 🎥 VAULT-videon *(en källa – bänken; godkännande efter risk också ITIL 4)*

  | Handling | Räckvidd | Ångra? | Tillsyn |
  |---|---|---|---|
  | Läsa data, köra kontroller | Ingen | Ja | Fritt |
  | Ändring på förhandsversion | Johnny | Ja | Fritt; prövas i grindarna |
  | Publicering | Alla besökare | Ja, med återställning | Johnnys godkännande |
  | Ändring i kundens Google-profil | Alla som söker | För hand | Förslag till Johnny |
  | Svar till kund | En kund | Nej | Utkast som Johnny godkänner (→ `4-foretaget.md`) |
  | Mejl till kundens kundlista | Tusentals | Nej | Aldrig av agent; ingen behörighet till kundens utskickstjänster |

  En självgående agent tog själv en uppgift ur en lista, tolkade den fel och skickade en rabattkod till hela e-postlistan (fallgrop 154, 155). 🎥 VAULT-videon, 5000-timmarsvideon *(samma kanal – en källa; antalet mottagare skiljer ⚠️)*
```

Det som `3-1` 107 saknar i dag och inte får tappas: kolumnen *Ångra?*, raden *Ändring i kundens Google-profil* (ur v0.74 8g:s slutsats, rad 703), hänvisningen till ITIL 4 och förbehållet att antalet mottagare skiljer mellan videorna ⚠️. Spårbarheten ovan (8d, rad 665–673) pekar nu på `3-1`.
