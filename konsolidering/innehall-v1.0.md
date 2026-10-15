# Förslag: innehållsförteckning för guiden v1.0

**Status:** Claudes förslag 2026-10-15, inte godkänt. Bygger på besluten i `BESLUT.md` (2026-10-13–15) och de tre analyserna i `kunskap/research/2026-10-15_*.md`.

## Principer för konsolideringen

1. **Kartans nio lager blir guidens ryggrad** (Garrett + Atomic Design). Guidens faser 0–8 sorteras in i lagren; inget innehåll försvinner utan att det står var det tog vägen.
2. **Varje regel bor på ett ställe.** De 27 dubblettgrupperna slås ihop; andra ställen hänvisar.
3. **Varje regel märks** `[första varvet]` eller `[senare]`. Första varvet = det som behövs för att flödet ska ge en första sajt du kan döma.
4. **Grind eller instruktion.** En regel blir *låst kontroll* bara om den har en norm (WCAG, lag, standard) eller två oberoende **primärkällor**. Övriga står som instruktion eller granskarkriterium tills de har det. (Påverkar bl.a. versaler, Inter/Lucide, Lighthouse 90+, "utan nordstjärna ingen brief".)
5. **Flödet först, men synligt i varje steg** (`BESLUT.md` 2026-10-15 + webb-pro-lärdomen): varje steg slutar med något Johnny kan se och döma. Eval mäter **Johnnys dom över resultatet**, inte rundor och fynd.
6. **Johnnys ord blir inte mekanik på egen hand.** En kommentar blir regel först när Johnny sagt det (`BESLUT.md`).
7. **Källistan och ändringsloggen flyttar ut** ur guiden (`kunskap/kallor.md`, `historik/guide-andringslogg.md`); guiden blir läsbar.

## Innehåll

**0. Läs först** — syfte, nisch och produkt (förvaltningen), beslut (pekare till `BESLUT.md`), principer (`principer.md` + guidens §1), märkning (🎥 📄 🔧 ⚠️, sett/härlett/okänt), bänken per primärkälla, `[första varvet]`/`[senare]`.

**1. Kundens väg** — intervju → research → tre riktningar (Johnny ser först, sedan kunden) → bygge → Johnnys granskning → lansering → förvaltning varje månad. **Tidsbudget per steg** (ny; saknas i båda spåren). Ombyggnad som eget spår.

**2. De nio lagren** — varje lager med samma fem rubriker som kartan: *vad byrån gör · vad som kommer ut · kompetens och källor · kontroll · hur självgående*.

| Lager | Innehåll (källa) |
|---|---|
| 2.1 Strategi | Intervjun (fas 1; kartan lager 1: kunden, öppna frågor), stoppet eller läckan, utbud/efterfrågan, nordstjärna, faktabas (§11.8), branschresearch med linser (§11.12), sajtgranskning (§15.1) |
| 2.2 Omfattning | Krav och prioritering (MoSCoW, Top Tasks — kartan), paket (§15.1), lagkrav per kund (§11.13), ombyggnad (fas 0b), bygga eller använda befintligt (§11.5) |
| 2.3 Struktur | Sidkarta (brief 2b), sökordsanalys (fas 1), informationsarkitektur (kartan lager 3) |
| 2.4 Skelett | **Sektionsbibliotek** (Atomic Design: tokens → komponenter → sektioner → mallar → sidor), wireframes per sidtyp |
| 2.5 Yta | **3–5 stilkit**; de tre riktningarna = tre stilkit på samma innehåll; **Stitch, Inspo, Tastemaker när stilkiten tas fram och förnyas**; typografi, färg, referenser och licens (regeln om referenser; licensfrågan öppen), originalitet |
| 2.6 Rörelse | Rörelsebudget, ett blickfång, `prefers-reduced-motion`; scrollytelling och Scroll World som tillval `[senare]` |
| 2.7 Innehåll | Texter ur faktabasen, konkret i stället för generiskt, socialt bevis med källa, klarspråk, svensk typografi, bildstrategi och ärlighetsregel (§11.9), AI-märkning |
| 2.8 Teknik och kvalitet | Astro statiskt, Cloudflare Workers, formulär (Turnstile, D1 i EU), bekräftelsemejl, SEO och lanseringskrav (fas 6c), WCAG 2.2 AA, säkerhetsgranskning och publicering (fas 7) |
| 2.9 Drift och förvaltning | Schemalagda kontroller, ändringskö och ärendeagent (fas 8, §15.2), rapporter med nordstjärna och nästa begränsning, kopplingar per kund (8g), underhåll av byggsystemet (8f) |

**3. Flödet — lagret ovanpå**
- 3.1 Orkestrering, tillstånd i filer, stoppvillkor (§5.1, §5.3)
- 3.2 Roller och behörigheter — rättad modell: `permissions.deny`, hooks i projektet, dolda kontroller utanför byggarens katalog (§5.2)
- 3.3 Granskning — **en modell**: för första varvet *en* granskare med checklista och ren kontext, plus Johnnys slutgranskning; specialister och heuristikpanel `[senare]` (löser M9)
- 3.4 Kalibrering — Johnnys 30–40 bedömda skärmdumpar (kartan) + §9.6; bedömaren avgör bara grova fall
- 3.5 Eval — mäter Johnnys dom över sajten; testbriefar från riktiga verksamheter
- 3.6 Säkerhet och skydd (§7), inställningar (§8, verifierade nycklar), kontext och modeller (§8.6)
- 3.7 Lärande — förslag, aldrig automatiska regler (§10.5 omskriven)
- 3.8 Live-visning och mods `[senare]` (§6; kräver 2.1.287)

**4. Företaget** — §15 i sin helhet (paket, tjänstetrappan, ärendeagent, kundflöde, enhetsekonomi), uppdaterad med nischbeslutet.

**5. Bygget av flödet — ny plan i små steg** — ersätter §16. Varje steg ger något synligt för Johnny:
1. Intervju → brief + faktabas för den första verksamheten (Johnny läser briefen)
2. Ett första stilkit och ett litet sektionsbibliotek (Johnny ser stilkitet)
3. Tre riktningar ur stilkit på verksamhetens innehåll (Johnny dömer, sedan kunden)
4. Bygge i Astro + kontrollerna för första varvet (Johnny ser sajten i webbläsaren)
5. Granskaren, kalibrerad mot Johnnys domar (jämförs med Johnnys egen dom)
6. Publicering på Cloudflare och lanseringskraven (sajten live)
7. Förvaltningens första rapport
Därefter, i den ordning en verklig sajt kräver det: fler stilkit, specialister, eval-svit, mods, auto loop.

**Bilagor**
- A. Verktyg och kandidater — guidens §12 + `inventering/` sammanförda (ca 60 verktyg ur guiden förs in i inventeringen)
- B. Skills att skapa — bara de som första varvet kräver beskrivs fullt
- C. Fallgropar — de ~196 sorteras: blir regel i rätt lager, slås ihop, eller stryks
- D. Öppna frågor — det som fortfarande väntar på Johnny
- E. Projektstruktur — genereras ur den konsoliderade guiden (löser M22)

## Det som väntar på Johnny innan v1.0 skrivs

1. Godkänn eller ändra strukturen ovan.
2. Öppna frågor i `LAGE.md`: licensbeslutets räckvidd, intervjuformen, `CLAUDE.md` och beslutsregistret, detaljkonflikterna (Lucide/Inter m.fl.).
3. Den första verksamheten och en tidsbudget per sajt (behövs för steg 5.1).
