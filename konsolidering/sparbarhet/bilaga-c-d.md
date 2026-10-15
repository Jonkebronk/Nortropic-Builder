# Spårbarhet: `guide/bilaga-c-kontroller.md` och `guide/bilaga-d-fallgropar.md`

Skrivet 2026-10-15 vid konsolideringen och uppdaterat samma dag efter ommärkningen. Radnummer avser `historik/IMPLEMENTERINGSGUIDE-v0.74.md`. Båda bilagorna sammanställer det andra filer skrivit och inför inga nya kontroller eller regler. Bilagorna genereras med två skript i Claudes scratchpad ur data som lästs av för hand ur guidens filer; numren i bilaga D räknades fram ur guiden och stämdes av mot spårbarhetsfilerna.

## v0.74

| v0.74-avsnitt (rader) | Var det hamnade | Struket och varför | Flyttat till annan fil |
|---|---|---|---|
| §13 Fallgropar, nr 1–196 (1937–2135) | Bilaga D: alla 196 med utfall – 185 intagna med nummer | 10 dubbletter sammanslagna enligt analysen §6.3 (19, 40, 73, 80, 88, 148, 155, 166, 177, 185); nr 2 inaktuell (Stitch-design per sajt, beslut 2026-10-15) | Reglerna står i lagerfilerna och spåras i deras filer |
| §10.3 Typiska kontroller (1483–1490) | Bilaga C: 375 px → C3 (320 px enligt WCAG 1.4.10); konsolfel och bilder → C2; reducerad rörelse → C56; hela användarflödet → C4, C25 | Kapitelkontrollen struken: flersidig sajt (beslut 2026-10-15; `3-2`:s spårbarhet) | – |
| §10.3 Kontroller åldras (1474) | Bilaga C, *Regler för kontrollerna själva* | – | Regeln bor i `3-4` |
| Fas 1b, spritt pass för kantfall (325) | Bilaga C, *Kantfall* (C42–C44), som `2-4` och `2-8` hänvisar till | – | Passet bor i `2-4` [N2]; bokningens kantfall i `2-2` [N3] |
| §12 skelettet `stitch-review`, steg 4 (1912): horisontell scroll, överlapp, avklippt text, klickytor ≥ 44 px | Bilaga C: C3, C38, C35 (24 px), C36 (44 px) | Skelettet struket (analysen M11, A:s och B:s spårbarhet) | – |
| §12 `write-checks` (1832) | Bilaga C: N1-kontrollerna som skript | – | Skillen `kvalitet` [N2] → B |
| §7.2 grindar per fas (1014–1026), §10.1–10.2 låsningen (1428–1468) | Bilaga C, flödet 3.1 (C114–C135) | Fas 2-grinden och grinden för modellbyte strukna i `3-1` | `3-1` |
| Övriga låsta kontroller i fas 0–8, §7.3, §8.8, §11.9–11.10 | Bilaga C via lagerfilerna; v0.74:s riskabla grindar (analysen §4.2) i egen tabell | Se respektive lagerfils spårbarhet | Lagerfilerna |

## Underlag

| Underlag | Använt i |
|---|---|
| Guidens filer efter ommärkningen (lästa kl. 14.43–14.55, när inga fler ändringar kom; `n1-forsta-sajten.md` är genererad och inte räknad) | Bilaga C, alla rader; bilaga D, kolumnen *Var* |
| `konsolidering/skrivregler.md`, tillägget kl. 14.30, och `konsolidering/granskning-v1.0.md` | Nivåerna, visningsbredderna, kantfallen, avvikelserna |
| `kunskap/kallor.md`, *Byt kortnamn* | Kortnamnen i bilaga C |
| Spårbarhetsfilerna i `konsolidering/sparbarhet/` | Bilaga D: hemvist per fallgrop |
| Analysen §4.2–4.4, §6.3, §7.1, §7.4 | Grunden per rad, tabellen över de riskabla grindarna, dubbletterna, sammanställningen |

## Ommärkning 2026-10-15

Bilaga C skrevs först mot guiden kl. 14.10, före ommärkningen, och gjordes om efter den.

**Flyttat från N1 i registret** (följer lagerfilerna): kontrollerna i `2-2` (toppuppgifter, innehållskälla, omdirigeringskartans täckning, lagkravsprofilen), `2-3` (föräldralös sida, nyckelresor, sidkarta mot faktabas, klickdjup), `2-4` (24 px, fokus, överlapp, skelettplan, värsta fall, varianter), `2-6` (reducerad rörelse, fem sekunder, målgruppen), `3-1` (låsningens lager 1, rundtak, samma fel, konto saknas), `3-2` (varvnumret, fasta JSON-fält, steget klart, timeout), `3-3` (extern text), `3-5` (antagandena), `/skill-doctor` och `/security-review` – alla till N2. Stoppen följer `5-byggplan.md`, steg 1–6.

**Granskningsfynd som åtgärdats i bilagorna:**

| Granskningen | Åtgärd |
|---|---|
| 1.1 och 2.3 punkt 1, bilaga C saknades och N1 hade ett trettiotal kontroller | N1-listan är exakt de tio i `2-8`; registret återger dem och definierar dem inte |
| 1.3 punkt 6, visningsbredderna | En gemensam uppsättning överst i bilaga C |
| 1.5 stickprov 15, kantfallen | Eget avsnitt *Kantfall* i bilaga C, som `2-4` och `2-8` hänvisar till |
| 1.5, fallgrop 24, 78, 120, 135 | Intagna i guiden vid ommärkningen; bilaga D visar var |
| 2.1, grindregeln | Registret följer `2-8`:s *Stopp* och *Rapport*; kvarvarande stopp utan norm eller två källor står i bilaga C, avvikelse 11 |
| Kortnamnen (`kunskap/kallor.md`) | Jev-uppföljningen, Nate Herk 100-repon-videon, Jack Roberts-videon 2, 3 och 4 och sex-färdigheter-videon i bilaga C |

## Kvar

- **Bilaga C, *Avvikelser mellan filerna*,** punkt 1–11: bland annat när ett steg är klart (`5-byggplan.md` mot `2-8`), när Johnny ser kontrollerna (`1-kundens-vag.md` mot `3-2`), lekfulla hinder (N2 mot N1), 44 px och karuseller, bildfrekvensen och säkerhetsgranskningens verktyg i `bilaga-e-oppna-fragor.md`.
- **Bilaga D:** ingen fallgrop står utan regel.
