# Spårbarhet: `guide/2-3-struktur.md`

Skrivet 2026-10-15 vid konsolideringen. Radnummer avser `historik/IMPLEMENTERINGSGUIDE-v0.74.md`.

## v0.74

| v0.74-avsnitt (rader) | Var det hamnade (fil, avsnitt) | Struket och varför | Flyttat till annan fil |
|---|---|---|---|
| Fas 1, sökordsanalys före bygget (288) | 2.3 *Sökord före bygget* | ⚠️ om *Claude SEO*-repot ersatt: repot är verifierat (claude-seo, MIT) och står som Pröva, granskningslista (`kunskap/research/2026-10-15_kompetensluckor-anteckningar/lager-3-4-struktur-skelett.md` §3–4) | Linsen *sökmotor och AI-assistent* (§11.12) → `2-1-strategi.md`; OpenSEO och sökord efter lansering (fas 8a) → `2-9-drift-och-forvaltning.md` |
| Brief 2b, sidkarta (305) | 2.3 *Standardsajten*, *Sidkartan*, *Vad som kommer ut* (syfte → besökarens fråga, primär handling och nordstjärna per sida) | "vid behov en sida per tjänst och ort" ersatt av regeln om ortssidor (Googles spampolicy; konflikt 14 i `2026-10-15_karta-mot-guide.md`). "Berättelsen ovan gäller startsidan; övriga sidor får egna, kortare flöden" struket: scrollberättelse är inte standard (beslut 2026-10-15, sajttyp; konsolideringsanalysen M13) | Startsidans sektionsordning → `2-4-skelett.md` *Mallarna*; antal sidor per paket → `2-2-omfattning.md`, `4-foretaget.md`; nordstjärnan → `2-1-strategi.md` |
| Brief punkt 2, berättelsen i scrollordning (304), och punkt 4, målgrupp och primär handling (308) | Primär handling per sida: 2.3 *Sidkartan* | Kapitel i scrollordning är inte standard (M13) | Briefens struktur och sajtens primära handling → `2-1-strategi.md`; scrollytelling som tillval → `2-6-rorelse.md` |
| §10.3, kontrollerna "Hela användarflödet" och "Godkänd men inte inkopplad" (1490, 1492) | 2.3 *Vägar och tillstånd* (N1: en nyckelresa = N1-kontroll 4 i `2-8`), *Kontroll* (N2: två till fyra nyckelresor som låst kontroll i Playwright) | Ankarlänkar till kapitel struket (ingen scrollberättelse) | Formulärets leverans → `2-8-teknik-och-kvalitet.md`; kontrollregistret → `bilaga-c-kontroller.md` |
| §10.3, "Alla kapitel i briefen finns, i rätt ordning" (1486) | Ersatt av 2.3 *Kontroll* (sidkartan stäms av mot faktabasen) och 2.4 *Kontroll* (skelettplanen följer mallen) | Kapitel finns inte i en flersidig standardsajt | – |
| Fas 1b, funktionsspecifikation `design.functional.md` (336) | 2.3 *Vägar och tillstånd*: tillstånd per komponent i biblioteket; specifikation per sajt [N2] bara för det som avviker | Specifikation för *alla* klickbara delar per sajt struket: biblioteket definierar dem en gång | Låsning av specifikationen och beteendegranskaren → `3-2-granskning-och-kalibrering.md`; tillstånd per komponent → `2-4-skelett.md` |
| Fas 6, primär handling per kapitel (539) och lekfulla hinder (540) | 2.3 *Sidkartan* (varje sida har en primär handling och slutar med den); lekfulla hinder: 2.3 *Vägar och tillstånd*, granskningskriterium [N2] (fallgrop 120; ommärkningen 2026-10-15) | "Kapitel" ersatt av sida | Granskningskriteriet "drar det mot den primära handlingen?" → `3-2`. Tidigare stod "lekfulla hinder → `2-6-rorelse.md`", där regeln inte fanns (granskningen 1.5, stickprov 13) |
| §14, Sajttyper (2155) | 2.3 *Standardsajten* | Frågan avgjord: vanlig flersidig sajt (beslut 2026-10-15) | Vägarna A–D och "behöver kunden verkligen ett CMS?" → `2-2-omfattning.md`, `2-8` |
| §15.1, designad 404-sida i alla paket (2203) | 2.3 *Standardsajten* (404 i uppsättningen, instruktion med en källa) | – | 404-mallen → `2-4-skelett.md`; `noindex` och statuskod → `2-8`; kontrollen att gamla adresser inte ger 404 → `2-2`, `2-8` |
| Fas 0b steg 3, URL-inventering och 301 (259–262) | 2.3 *Vägar och tillstånd*, en mening om ombyggnad | – | Hemvist `2-2-omfattning.md` (kartan lager 2); kontrollen i fas 7 → `2-8` |
| Fas 6c, LocalBusiness-schema (586) | 2.3 *Struktursidan av SEO*: vilken sida som bär vilken typ | – | Typer, format och kontroll → `2-8` |

## Fallgropar ur §13

| Nr | Var |
|---|---|
| 16 Kontrollerna går igenom men funktionen är inte inkopplad | 2.3 *Kontroll*, nyckelresorna |
| 50 Sidan ser bra ut men leder inte till den primära handlingen | 2.3 *Sidkartan* |
| 56 Beteendegranskaren saknar facit för tillstånd | 2.3 *Vägar och tillstånd* |
| 178 En standard-404 från ramverket | 2.3 *Standardsajten* |
| 179 En sajt med bara en startsida | 2.3 *Standardsajten* |
| 182 Sökord som tas fram först efter lansering | 2.3 *Sökord före bygget* |
| 102 Ombyggnad som tappar gamla URL:er | Hänvisning i 2.3; hemvist `2-2-omfattning.md` |
| 120 Lekfulla hinder före den primära handlingen | 2.3 *Vägar och tillstånd*, granskningskriterium [N2] (tillagd vid ommärkningen 2026-10-15; `bilaga-d-fallgropar.md` hade den som *inte intagen*) |

## Kartan och researchen

| Underlag | Använt i 2.3 |
|---|---|
| `historik/karta/3-struktur.md`, alla avsnitt | Hela filen. Kartans "mobilmenyn visar högst fyra länkar" är omformulerad efter NN/g:s faktiska fynd: med högst fyra toppnivålänkar visas de synligt. LocalBusiness med mest specifika typ → `2-8` (hänvisning i *Struktursidan av SEO*). Branschmallarnas sidkartor → `2-2`. |
| `kunskap/research/2026-10-15_kompetensluckor-anteckningar/lager-3-4-struktur-skelett.md` §3 (IA-verktyg, trädtest, LLM som proxy) och §4 (lokal SEO-struktur, Google Search Central) | *Namn, adresser och meny*, *Ortssidor*, *Struktursidan av SEO*, *Kontroll*, *Kompetens och källor* |
| `kunskap/research/2026-10-15_kompetensluckor-och-kandidater-per-lager.md`, lager 3 | Domarna (Ta in, Pröva) i *Kompetens och källor* |
| `kunskap/research/2026-10-15_kompetensluckor-anteckningar/lager-1-2-strategi-omfattning.md`, lucka 4 (sökefterfrågan) | *Sökord före bygget* (DataForSEO, Google-profilens sökfraser) |
| `inventering/inventering.json`, lager 3 | site-architecture, Mermaid, claude-seo `seo-local`, trädtest med UXtweak eller Lyssna, Screaming Frog. `@astrojs/sitemap`, schema-dts, seo-graph och astro-seo-schema → `2-8` (teknisk SEO). |
| `kunskap/research/2026-10-15_karta-mot-guide.md`, konflikt 10 (sajttyp) och 14 (ortssidor) | *Standardsajten*, *Ortssidor och serviceområde*: avgjort mot Googles spampolicy, inte öppet |
| `kunskap/research/2026-10-15_guide-konsolideringsanalys.md` M13, §7.4 punkt 4, §8.2 (Astro-skelettets sidor) | *Standardsajten*, *Kontroll* |
| Webb-pro, `kunskap/byggstandard.md` 7.2, 7.5, 9.2 | Tack-sidan med `noindex` och utanför sitemap, en sida per huvudtjänst, `tel:`-länk på varje sida |

## Ommärkning 2026-10-15

Efter granskningen (`konsolidering/granskning-v1.0.md`) och tillägget kl. 14.30 i `konsolidering/skrivregler.md`. N1 gick från 25 punkter (varav 4 automatiska kontroller) till **4 punkter och ingen egen automatisk kontroll**. Inget är struket; allt nedan är flyttat eller sammanslaget. Radnummer avser `guide/2-3-struktur.md` före ommärkningen.

### Kvar i N1

| N1-punkt | Sammanslaget ur |
|---|---|
| Standarduppsättningen: start, tjänst eller tjänster, om oss, kontakt, designad 404; tacksida och integritetspolicy bara med formulär | Standarduppsättningen (13), designad 404 (26), en sida per huvudtjänst (66); "inte i standardsajten" (28) och "inga ortssidor" (58) är nu löptext |
| Sidkartan som tabell i `sites/<namn>/sidkarta.md`; varje sida slutar med sin primära handling | Sidkartan (32, utan Mermaid och utan briefen), primär handling per sida (33) |
| Söksträngarna före sidkartan, med källorna i första varvet | Sökord före bygget (39) och källorna (40) |
| En nyckelresa = N1-kontroll 4 i `2-8` | Två till fyra nyckelresor (73) och nyckelresorna som låst kontroll (100) |

### Flyttat från N1

| Punkt (rad) | Ny nivå | Skäl |
|---|---|---|
| Mermaid-diagram (32) | N2 | Granskningen 1.1; tabellen räcker |
| Koppling till nordstjärnan per sida (35); innehållskälla som kolumn (32) | N2 | Två kolumner till i sidkartan |
| `tel:`-länk i sidhuvudet (34) | N2 | Bra hantverk; Sidhuvud-sektionen i `2-4` har länken, och N1-kontroll 4 prövar numret |
| Namn i besökarnas ord (47), adresser (48), meny (49), sidfot (50), `<a href>` (51) | N2 | Bra hantverk (skrivreglerna, tillägget) |
| `h1` och titel (67), strukturerad data (68), vanliga frågor (69) | N2 | Bra hantverk; titel och `h1` prövas av N1-kontroll 7 i `2-8` |
| Interaktiva delar och tillstånd ur biblioteket (74) | N2 | Tillstånd per komponent är N2 i `2-4` |
| Claude gör strukturen för hand (88) | Löptext | Arbetssättet, ingen regel |
| Låst kontroll: ingen föräldralös sida (99) | N2 | Granskningen 1.1; högst tio automatiska kontroller i N1 |
| Låst kontroll: nyckelresorna (100) | N2 för två till fyra resor; N1 = en resa | Granskningen 1.1 och 2.1 punkt 7 |
| Sidkartan mot faktabasen (101) | N2, rapporterar | Granskningen 2.1 punkt 5 (🔧, ingen norm) |
| Klickdjupet (102) | N2, flaggar | Granskningen 1.1 och 2.1 punkt 5 |

### Granskningsfynd som åtgärdats

| Fynd | Åtgärd |
|---|---|
| 1.1, rad `2-3` 32 | Mermaid N2; tabellen i N1 |
| 1.1, rad `2-3` 73, 99, 101, 102 | En nyckelresa i N1 (= `2-8` kontroll 4); övrigt N2 |
| 1.2, integritetspolicy och tacksida | Båda bara med formulär; policy utan formulär står som öppen fråga med skälet (IP-adresser i webbserverns loggar), → `bilaga-e-oppna-fragor.md`, fråga 1.8 |
| 1.2, designad 404 | Kvar i N1 här (hemvist); `4-foretaget.md` ska hänvisa |
| 1.3 punkt 1, sidkartan i briefen | Sidkartan står i `sites/<namn>/sidkarta.md`, inte i briefen |
| 1.3 punkt 7, vad Johnny ser | Sidkartan och söksträngarna med briefen (`5-byggplan.md`, steg 1; kundens väg steg 2) |
| 1.5, stickprov 13 (fallgrop 120) | Lekfulla hinder intagna som granskningskriterium N2 i *Vägar och tillstånd* |
| 2.1 punkt 5, `2-3` 101 | Rapporterar, stoppar inte; N2 |
| 2.1 punkt 7, nyckelresor | "Två källor för körbara kontroller; resorna är egen tillämpning 🔧" |
| Hänvisningar (tillägget) | `karta/3-struktur.md` → `historik/karta/3-struktur.md`; `README.md`, princip 8 → `guide/README.md`, princip 8; byggplanens steg enligt numreringen 1–6 |

### Inte löst här

- **Integritetspolicy utan formulär** är fortfarande öppen (`bilaga-e-oppna-fragor.md`, fråga 1.8, Claudes förslag: en kort policy på alla sajter). Avgör Johnny ja, ska raden i standarduppsättningen ändras.
- **`bilaga-c-kontroller.md`** har C14–C17 som N1 och saknar den gemensamma uppsättningen visningsbredder. Registret behöver följa nivåerna här.
- **`4-foretaget.md` rad 30** (designad 404 som N2) ska bli en hänvisning hit (granskningen 1.2).
