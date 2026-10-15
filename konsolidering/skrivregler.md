# Skrivregler för guiden v1.0

Gemensamma regler för alla som skriver en del av `guide/`. Skrivet 2026-10-15 vid konsolideringen. Johnny har gett mandat att skriva klart; han läser igenom efteråt.

## Underlag

- **Den gamla guiden:** `historik/IMPLEMENTERINGSGUIDE-v0.74.md` (2 368 rader). Radnummer i analyserna avser den filen.
- **Johnnys beslut:** `BESLUT.md` — väger tyngst. Säg aldrig emot ett beslut. Är något öppet, skriv *Öppet – se `guide/bilaga-e-oppna-fragor.md`*.
- **Kartan:** `karta/` (nio lager + `flodet.md`), `principer.md`, `historik/webb-pro.md`.
- **Analyserna:** `kunskap/research/2026-10-15_guide-konsolideringsanalys.md` (dubbletter §2, motsägelser §3, bänken §4, ⚠️ §5, struktur §6, nivåer §7), `2026-10-15_karta-mot-guide.md`, `2026-10-15_webb-pro-genomgang.md`, `2026-10-15_kompetensluckor-och-kandidater-per-lager.md` och anteckningarna i `2026-10-15_kompetensluckor-anteckningar/`.
- **Researchen 2026-10-14:** `kunskap/research/2026-10-14_*.md` (juridik, Cloudflare, Claude Code, Stitch).
- **Webb-pro** (klonad, skrivskyddad): `C:\Users\johnn\AppData\Local\Temp\claude\C--Users-johnn-Netflix-Match\648281c1-efeb-4ce2-9b07-032ecd994aab\scratchpad\webb-pro\` — bl.a. `kunskap/kundintervju.md`, `byggstandard.md`, `bild.md`, `brief-mall.md` och Astro-mallen. Läs, kopiera inte okritiskt; skala av webb-pros mekanik.

## Besluten som styr (BESLUT.md 2026-10-15)

- **Ordning:** flödet först — men varje steg ska ge något Johnny kan se och döma.
- **Design:** eget sektionsbibliotek + 3–5 stilkit. Stitch, Inspo, Tastemaker m.fl. används när stilkiten tas fram och förnyas, **inte vid varje kundbygge**. De tre riktningarna = tre stilkit på samma innehåll.
- **Riktning:** Johnny ser riktningarna först och kan stryka; sedan väljer kunden.
- **Sajttyp:** vanlig flersidig företagssajt som standard; scrollytelling och Scroll World är tillval.
- Övrigt: nischen är otekniska småföretagare; **förvaltningen är produkten** (2026-10-13). Intervjun görs av en **intervjuande AI med kunden** (2026-10-13), med öppna frågor. Hosting på Cloudflare, Claude Design är inte designmotor (2026-10-14).
- **Referenser och licens:** tills Johnny klargör licensbeslutet 2026-10-13 gäller regeln från webb-pro (2026-10-03): *en referens får bära layout, palett och typsnitt; identitet, texter och bilder från andra företag kopieras inte.* Skriv det så, och hänvisa till den öppna frågan.

## Nivåer — varje regel märks

| Märke | Nivå | Betyder |
|---|---|---|
| `[N1]` | Första sajten | Behövs för att flödet ska ge en första sajt Johnny kan döma. Håll listan kort. |
| `[N2]` | Sajt 2–5 | När mönster syns och tillsynen minskar. |
| `[N3]` | Förvaltning | När det finns betalande kunder. |
| `[N4]` | Skala | Många sajter, obevakat. |

Använd konsolideringsanalysen §7.3–7.4 som utgångspunkt. Märket står först i punkten: `- [N1] **Regel.** …`.

## Grind eller instruktion

En regel får heta **låst kontroll** eller vara en grind bara om den har en **norm** (WCAG, lag, Googles egen dokumentation, standard) **eller två oberoende primärkällor**. Bänken räknas **per primärkälla**, inte per kanal: två kanaler som återger samma person eller metod är en källa (analysen §4.4). Allt annat skrivs som **instruktion** eller **granskningskriterium**, med *(en källa – bänken)*. Analysen §4.2 listar de riskabla grindarna och förslag; följ dem.

## En plats per sak

Varje regel bor på ett ställe. Hemvisterna nedan gäller; på andra ställen står bara en hänvisning (`→ guide/3-2-granskning.md`). Dubblettgrupperna D1–D27 står i analysen §2.

| Ämne | Hemvist |
|---|---|
| Granskarisolering, roller, behörigheter (D1, D27) | `3-1-orkestrering-och-roller.md` |
| Hur granskning går till, stoppen, förhör, kalibrering, eval (D12, D13, D18) | `3-2-granskning-och-kalibrering.md` |
| Belägg och status (D2) | `3-1` (mekanismen) |
| Hemligheter, sandlåda, skyddshook (D6, D10) | `3-3-sakerhet-och-installningar.md` |
| Effort och modeller (D5, D20, D21) | `3-3` |
| Rensning vid ny modell, `CLAUDE.md`, plugin (D17, D22) | `3-4-larande-och-underhall.md` |
| Föreslå–besluta–låsa (D7) | `guide/README.md` (princip) |
| Formulär (D3) | `2-8-teknik-och-kvalitet.md` |
| Samtycke och analys (D4), lagkrav | `2-8` (samtycke, analys); lagkrav per kund i `2-2-omfattning.md` |
| Referenser, originalitet, licens per tillgång (D8, D9) | `2-5-yta.md` |
| Rörelse, `prefers-reduced-motion` (D11) | `2-6-rorelse.md` |
| Faktabas, platshållare, AI-signaturer i text (D14, D15, D16) | `2-7-innehall.md` (kontrollen mot platshållare i `2-8` vid publicering) |
| Nordstjärna (D26) | `2-1-strategi.md` |
| Wireframes (D25) | `2-4-skelett.md` |
| Säkerhetsgranskning (D19) | `2-8` |
| Bänken, sett/härlett (D23) | `guide/README.md` |
| "Vilket perspektiv saknas?" (D24) | `3-2` |

## Form

- **Svenska, klarspråk.** Korta meningar, aktiv form. Kort tankstreck (–) med mellanslag, inte långt (—). Inga versaler som betoning.
- **Regeln först, sedan varför (en mening), sedan källa.** Inga referat av videor ("i videon visar han…") – bara det som behövs för att förstå regeln.
- **Källmärkning:** 🎥 video (kort namn, t.ex. *Shopify-videon*; full referens i `kunskap/kallor.md`), 📄 dokument/primärkälla (sökväg eller URL), 🔧 eget, ⚠️ overifierat. Ersätt ⚠️ som researchen har löst med 📄 och sökväg (analysen §5.1). Källförbehåll (sponsring, en persons smak) skrivs kort i parentes.
- **Hitta aldrig på** fakta, URL:er, kommandon eller siffror. Det som inte går att belägga märks ⚠️ eller stryks.
- **Längd:** så kort som möjligt utan att tappa en verklig regel. Sikta på högst 40 % av källtextens längd. Långa utredningar (t.ex. fas 8g:s kopplingar) flyttas till `kunskap/research/` och länkas.
- **Fallgroparna i §13** som rör din del: lägg in *varför* i rätt regel och notera numret i spårbarhetsfilen. Fallgropar utan regel blir regler (analysen §6.3).
- Rubriknivåer: filens titel `#`, avsnitt `##`, delavsnitt `###`.

## Lagerfilernas mall

```markdown
# 2.X Namn

**Status:** konsoliderad v1.0, 2026-10-15. [Lager 1–4: Genomgånget med Johnny 2026-10-13 (karta). Lager 5–9: utkast, inte genomgånget med Johnny.]
Kort ingress: vad lagret är (Garrett/Atomic Design där det gäller).

## Vad byrån gör
## Vad som kommer ut
## Kompetens och källor
## Kontroll
## Hur självgående
```

Lager med mycket innehåll får delavsnitt under rubrikerna. Flödets filer (`3-*`) och `4-foretaget.md` behöver inte mallen.

## Spårbarhet — obligatoriskt

Skriv en fil `konsolidering/sparbarhet/<din-fil>.md` med en tabell: *v0.74-avsnitt (rader) | var det hamnade (fil, avsnitt) | struket och varför | flyttat till annan fil*. Ta med fallgropsnummer du tagit in och kartans/researchens delar du använt. Inget ur v0.74 i din del får försvinna utan en rad här.

## Gör inte

- Committa inte, pusha inte, ändra inga andra filer än dina egna i `guide/`, din spårbarhetsfil och eventuella nya filer i `kunskap/research/` som du skapar för utredningar du flyttar ut.
- Ändra inte `BESLUT.md`, `karta/`, `historik/` eller `inventering/`.

---

# Tillägg 2026-10-15 kl. 14.30: ommärkning efter granskningen

Granskningen (`konsolidering/granskning-v1.0.md`) visade att cirka 320 punkter var märkta N1. Det upprepar webb-pros misstag. Därför gäller nu:

## Taket

**N1 har högst cirka 60 punkter i hela guiden och högst tio automatiska kontroller.** En ny N1-punkt kräver att en annan flyttas till N2. Punkter flyttas till N2 (eller senare) – de stryks inte, om de inte är dubbletter.

## Vad N1 är

Den första sajten byggs **interaktivt i huvudsessionen medan Johnny tittar**, i sex steg (`guide/5-byggplan.md`, omskriven):

1. **Intervju → brief.** De åtta kärnfrågorna (inte hela guiden A–J); briefen har sex rubriker: sammanfattning, nordstjärna, besökare, primär handling, ton och intryck (inklusive rörelsebudget), får inte påstås. `fakta.md` med källa per faktum. Kundens bekräftelse + Johnnys godkännande. Sidkartan är en tabell i `sites/<namn>/sidkarta.md` (inte i briefen).
2. **Tre riktningar = startsidan i tre minimala stilkit.** Ett minimalt kit = färg, typsnitt (med licens), avstånd, radie + en kort `design.md` (personlighet, typsnitt, referenser). Bara de sektioner startsidan behöver, en variant var. Stitch används på provsidan/startsidan i dator och mobil när kiten tas fram – aldrig med kundinnehåll och aldrig per kund i övrigt. Johnny stryker, kunden väljer.
3. **Bygget av hela sajten** i valt kit: standardsidorna (start, tjänst/tjänster, om oss, kontakt, 404; tacksida och integritetspolicy bara med formulär – frågan om policy utan formulär är öppen), de sektioner sidorna behöver. Kontrollskriptet med de tio N1-kontrollerna byggs här. Ingen granskare än – Johnny dömer direkt.
4. **Granskaren:** en delagent med ren kontext och en checklista i markdown (element, förväntat, faktiskt, allvar). Jämförs med Johnnys egen dom. Fynd mot ett kriterium med en källa får högst allvaret `medel`.
5. **Publicering** (om sajten publiceras – bilaga E 1.3): Cloudflare Workers, förhandsadress bakom Access, `_headers` med grundhuvudena, Johnnys godkännande.
6. **Första rapporten,** gjord för hand med Claude.

**N1 innehåller också:** `permissions.deny` för push, deploy och `.env`; `progress.md` med tid per steg (ingen `state.json`, inga överlämningsfiler, ingen låsning i N1); `domar.jsonl` med Johnnys domar och motivering; ärlighetsregeln för bilder; faktakontrollen; ingen text i bild (WCAG 1.4.5); WCAG 2.2 AA som golv; referensregeln. Verktyg i N1: Stitch-CLI, Inspo, Astro, Playwright, axe, Lucide (förslag, öppet), samt Cloudflare/GitHub/wrangler om sajten publiceras.

**Allt annat är N2 eller senare** – även bra hantverk som en kunnig byggare gör ändå (bilder med bredd och höjd, `h2` per sektion osv.). Sådant står som N2-regler eller i skillens kunskap, inte som N1-regler.

## Ungefärlig fördelning av N1-punkter

| Fil | N1-punkter (ca) |
|---|---|
| 2-1 strategi | 6 |
| 2-2 omfattning | 4 |
| 2-3 struktur | 4 |
| 2-4 skelett | 5 |
| 2-5 yta | 7 |
| 2-6 rörelse | 2 |
| 2-7 innehåll | 6 |
| 2-8 teknik | 8 (plus tabellen med de tio kontrollerna) |
| 2-9 förvaltning | 1 |
| 3-1 orkestrering | 5 |
| 3-2 granskning | 6 |
| 3-3 säkerhet | 3 |
| 3-4 lärande | 2 |
| 3-5 live-visning | 1 |
| 4 företaget | 0–1 |
| bilaga B | 4 skillutkast |

## Övriga regler för ommärkningen

- Märk varje punkt med **`- [Nx]` först på en listrad** (inte i löptext, inte i numrerade listor). Tabellrader får ha nivån i en egen kolumn.
- **Hänvisningar:** kartan ligger nu i `historik/karta/` och principerna i `guide/README.md` (avsnitt *Principer*, princip 1–11; `historik/principer.md` är arkiv). Byt `karta/…` → `historik/karta/…` och `principer.md` → "`guide/README.md`, princip N". Skriv bilagor med filnamn (`bilaga-e-oppna-fragor.md`), inte "bilaga E".
- **Byggplanens steg** heter nu 1–6 som ovan; hänvisa till `5-byggplan.md`, steg N.
- Följ granskningens förslag för just dina filer (motsägelser 1.3, beslut 1.4, tappat innehåll 1.5, grindar 2.1, dubbletter 2.2, hänvisningar 2.3). Där en dubblett ska bort ur din fil: ersätt med en hänvisning till hemvisten.
- Uppdatera din spårbarhetsfil: lägg till ett avsnitt *Ommärkning 2026-10-15* med vad som flyttats från N1 och vilka granskningsfynd som åtgärdats.
