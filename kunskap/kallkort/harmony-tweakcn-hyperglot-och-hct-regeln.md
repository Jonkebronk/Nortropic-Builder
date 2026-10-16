# Harmony, tweakcn, Hyperglot och HCT-regeln

**Källa:** Läst 2026-10-16.
- **Harmony:** [evilmartians/harmony](https://github.com/evilmartians/harmony), commit `6dae4f337b7a` (2026-07-25), senaste release v1.4.0 (2024-12-05).
  - Lästa filer: `README.md`, `CHANGELOG.md` och `source.json`. Paletten med APCA-värde per steg lästes i sin helhet och räknades om till WCAG 2.
  - Generatorn [evilmartians/harmonizer](https://github.com/evilmartians/harmonizer): bara metadata.
- **tweakcn:** [jnsahaj/tweakcn](https://github.com/jnsahaj/tweakcn), commit `a3b47b37cba9` (2026-09-03). Lästa filer:
  - `README.md`, `LICENSE` och `package.json`
  - `lib/constants.ts`, `utils/subscription.ts` och `app/pricing/page.tsx`
  - `lib/posthog.ts` och `components/posthog-init.tsx`
  - `components/editor/code-panel.tsx`, `components/editor/action-bar/components/mcp-dialog.tsx` och `config/theme.ts`
  - Sidan tweakcn.com/pricing renderas med JavaScript och gick inte att läsa direkt ⚠️. Priser och gränser är lästa ur källkoden.
- **Hyperglot:** [rosettatype/hyperglot](https://github.com/rosettatype/hyperglot), master `74e069ce2cd8` (2026-07-21), release 0.8.1 (2026-03-11).
  - Lästa filer: `README.md`, `CHANGELOG.md`, `FAQ.md`, `LICENSE` och `lib/hyperglot/cli.py`. PyPI-metadata för 0.8.1.
  - Ärendena #46, #215 och #218.
  - **Egen körning:** Hyperglot 0.7.3 från PyPI. Macs system-Python 3.9 kan inte installera 0.8, som kräver Python > 3.10. Körningen gjordes mot sju typsnitt från google/fonts, och datafilerna `swe.yaml`, `sme.yaml`, `smj.yaml` och `sma.yaml` lästes.
- **HCT-regeln:** [material-foundation/material-color-utilities](https://github.com/material-foundation/material-color-utilities) `concepts/contrast_for_accessibility.md`, senast ändrad i commit `e42b2e4f6fba` (2024-09-04). Repots senaste commit är `dd62982dfdef` (2026-10-15). Regeln kontrollerades med en egen beräkning.

**Licens:**
- **Harmony: MIT.** Generatorn Harmonizer har ingen licens i GitHubs metadata ⚠️. Utan licens får koden inte återanvändas.
- **tweakcn: Apache-2.0** för koden. Den driftade tjänsten tweakcn.com har egna villkor, som jag inte läst ⚠️.
- **Hyperglot:**
  - **Apache-2.0 från 0.8.0** (17 februari 2026): *”LICENSE: Relicensed under Apache License 2.0”*.
  - Version 0.7.3 och äldre har GNU GPLv3 enligt PyPI. Det är den version en vanlig Mac-installation får.
  - Typsnitten i repots testmapp har egna licenser.
- **Material Color Utilities: Apache-2.0.** Vi tar en regel, inte kod.

**Vad det är:**
- **Harmony:** en färdig palett med 25 färgfamiljer × 11 steg (50–950) i OKLCH med sRGB-reserv. Den är balanserad med APCA och gjord som ersättning för Tailwinds palett.
- **tweakcn:** en visuell temaredigerare för shadcn/ui och Tailwind, som webbtjänst (Next.js) med AI-generering, sparade teman och export som CSS-variabler eller shadcn-registerkommando.
- **Hyperglot:** en databas över hur 783 språk skrivs (enligt README:n), och ett kommandoradsverktyg som avgör vilka språk ett typsnitt stöder.
- **HCT-regeln:** en tumregel ur Googles Material-färgbibliotek. Tonskillnaden (L\*) mellan två färger avgör en lägsta WCAG-kontrast.

**Hur det fungerar:**

*Harmony*
- **Installation:** `npm install @evilmartians/harmony`, sedan `@import "@evilmartians/harmony/tailwind.css"` i Tailwind 4. Paletten ersätter då Tailwinds färger. Det finns också CSS-filer per färg (`css/orange.css`) och ett JS-objekt.
- **`source.json`** är skriven i DTCG-liknande form (`$value`, `$type`) med `$contrast` (APCA Lc) och `$contrastBg` per steg.
- **APCA-värden och WCAG 2-kontrast.** Egen beräkning på sRGB-reserven:

| Steg | APCA Lc (mot) | WCAG 2 mot vitt | WCAG 2 mot svart |
|---|---|---|---|
| 300 | 77 (svart) | 1,56–1,57:1 | 13,35–13,48:1 |
| 400 | 65 (svart) | 1,93–1,95:1 | 10,75–10,88:1 |
| 500 | 54 (svart) | 2,42–2,48:1 | 8,47–8,69:1 |
| **600** | **65 (vitt)** | **3,73–3,87:1** | 5,42–5,63:1 |
| 700 | 77 (vitt) | 5,39–5,57:1 | 3,77–3,90:1 |
| 800 | 90 (vitt) | 8,72–9,01:1 | 2,33–2,41:1 |

- **Paren speglas:** 400 mot svart har samma Lc som 600 mot vitt. APCA-värdet är lika inom ett steg över alla 25 familjer, vilket stämmer i beräkningen: spannet i Lc är högst 0,4 per steg.
- **Det viktiga för oss:** steg 600, som i Tailwind ofta används för text på vitt, **klarar inte 4,5:1 med WCAG 2**. Först 700 gör det.

*tweakcn*
- **Redigeraren** ändrar shadcn:s tokens med förhandsvisning av komponenter. Utöver shadcn-namnen finns `destructive-foreground`, `font-sans`, `font-serif`, `font-mono`, sex skuggparametrar (färg, opacitet, oskärpa, spridning, x, y), `letter-spacing` och `spacing`. Standardvärdena är shadcn:s.
- **Export:**
  - CSS-variabler för Tailwind 3 eller 4 i valt färgformat.
  - Kommandot `npx shadcn add` mot tweakcns register.
  - MCP via `npx -y shadcn@canary registry:mcp` med `REGISTRY_URL=https://tweakcn.com/r/themes/registry.json`.
- **Gratisnivån:** *”Full theme customization”*, 5 AI-genererade teman, högst 10 sparade och delade teman, import och export av CSS-variabler, registerkommando och *”Contrast checker”*. Vilken kontrastformel den använder har jag inte läst ⚠️.
- **Pro:** $8 i månaden för obegränsad AI, teman ur bilder och obegränsat sparande. Ingen provperiod.
- **Konto:** att spara kräver konto (better-auth). Betalning går via Polar och AI via Google och OpenAI.
- **Analys:** PostHog körs i produktion och skickar händelser som `COPY_MCP_SETUP` och `COPY_REGISTRY_COMMAND`.

*Hyperglot*
- **Kommandot** `hyperglot sökväg/typsnitt.ttf` listar språk som stöds.
  - `-c, --check` väljer teckenmängder: base, auxiliary, punctuation, numerals, currency eller all.
  - `--validity` filtrerar på datakvalitet (todo, draft, preliminary, verified). Standard i 0.8 är preliminary.
  - `hyperglot-report` visar vad som saknas.
- **Kontrollen** har tre steg: tecknen finns, sammansatta tecken hanteras och formningen (OpenType) fungerar. Designen bedöms inte.
- **Bara `.ttf` och `.otf` godtas**, efter filändelse, också i 0.8.1 (`validate_font` i `cli.py`). WOFF2 måste packas upp först, till exempel med fontTools. Ärende #215 är öppet och PR #218 väntar.
- **Data för våra språk:**
  - **Svenska** (`swe`, validitet preliminary): grunden är A–Z, À Á Ä Å É Ë Ö Ü med gemener, och skiljetecken ” ’ « ».
  - **Nordsamiska** (`sme`, verified): Á Ä Å Æ Ö Ø Č Đ Ŋ Š Ŧ Ž. Hyperglot påpekar att samiska vill ha Ŋ i N-form, inte den afrikanska formen.
  - **Lulesamiska och sydsamiska:** preliminary.
  - **Meänkieli saknas.** Ärende #46 är öppet sedan 2021 och säger att språket har officiell minoritetsstatus i Sverige.
- **Egen körning** med 0.7.3 mot de fullständiga Google Fonts-filerna:

| Typsnitt | Svenska | Nordsamiska | Lulesamiska | Sydsamiska |
|---|---|---|---|---|
| Inter, Fraunces, Familjen Grotesk, IBM Plex Sans | ja | ja | ja | ja |
| Instrument Sans, Source Serif 4 | ja | **nej** (saknar Ŧ ŧ) | ja | ja |
| Atkinson Hyperlegible Next | ja | **nej** (saknar Ŋ ŋ Ŧ ŧ) | **nej** | ja |

  Instrument Sans `latin`-fil från Fontsource, uppackad: svenska, finska, norska och sydsamiska ja; nord- och lulesamiska nej.

*HCT-regeln*
- **Källan:** *”a difference of 40 in tone guarantees a WCAG contrast ratio ≥ 3.0; a difference of 50 in tone guarantees a contrast ratio ≥ 4.5”*. Ton är L\* i CIELAB, inte OKLCH:s L.
- **Egen kontroll** av sämsta fallet över hela tonskalan:

| Tonskillnad | Sämsta WCAG-kontrast | Var | Stämmer regeln? |
|---|---|---|---|
| 40 | 3,17:1 | ton 60 mot 100 | ja |
| 50 | **4,48:1** | ton 50 mot 100 | **nej, strax under 4,5** |
| 50,2 | 4,52:1 | – | ja |
| 51 | 4,65:1 | – | ja |

- **OKLCH:s L duger inte som ton.** För grått ger en skillnad på 0,50 i OKLCH-L i sämsta fall bara 3,50:1. Vi måste räkna om till L\* först, till exempel med Color.js `lch.l`.
- **Resten av dokumentet:** MCU:s scheman garanterar 4,5:1 för text och 3:1 för nödvändiga icke-textdelar på standardnivå, och 7:1 och 4,5:1 på hög nivå.

**Kvalitet och underhåll:**

| Repo | Stjärnor | Senaste commit | Bidragsgivare | Öppna ärenden och PR | Kända problem |
|---|---|---|---|---|---|
| evilmartians/harmony | 248 | 2026-07-25 (README) | 6 (7) | 5 | #19 stöd för DTCG-formatet (öppet), #10 palettbytet skriver över `transparent` i Tailwind 3 (öppet), #8 filstorlek. Ingen release sedan 2024-12 |
| evilmartians/harmonizer | 212 | 2026-10-02 | 3 | 4 | ingen licens |
| jnsahaj/tweakcn | 10 454 | 2026-09-03 | 38 (39) | 55 | #241 inbäddningsbar redigerare, #204 installation med pnpm, #231 förhandsvisningens komponenter ligger efter shadcn i mörkt läge |
| rosettatype/hyperglot | 207 | 2026-07-21 (master), push 2026-10-16 | 20 | 49 | #215/#218 WOFF2, #46 Meänkieli saknas, #188 khmer |
| material-foundation/material-color-utilities | 2 286 | 2026-10-15 | 3 (5) | 105 | inget ärende om tonregelns gräns |

**Det bästa vi kan ta:**
- **Hyperglot**, en gång per typsnitt när det tas in i ett kit:
  - Kör mot den fullständiga TTF-filen ur google/fonts, eller packa upp Fontsource-filen.
  - Kontrollera `swe`, `fin` och `sme`. Lägg resultatet i kitets `design.md`.
  - Använd 0.8.1 eller senare (Apache-2.0) via en nyare Python, till exempel med `uv` eller `pipx`.
- **HCT-regeln rättad:** ”skillnad på minst 40 i L\* ger minst 3:1; minst 51 ger minst 4,5:1”. Den är bara en snabbkontroll. Grinden mäter alltid paret med WCAG 2.
- **Harmony:** inte paletten, men iakttagelsen att APCA-balanserade steg kan ligga under WCAG 2-golvet (600 på vitt). Det stöder att APCA bara är rådgivande.
- **tweakcn:** listan över extra tokens (skuggparametrar, `letter-spacing`, `spacing`) som påminnelse om vilka axlar ett shadcn-tema saknar. Själva verktyget behövs inte.

**Var det hamnar hos oss:**
- **Ytskillen**, `.claude/skills/yta/farg.md`, *Accentens steg*: HCT-raden rättas från ”50 ger minst 4,5:1” till ”51”, med noten att ton är L\* och inte OKLCH-L.
- **Ytskillen**, `typografi.md`, *Vikter och typsnitt*: Hyperglot-tabellen och regeln om TTF och version ≥ 0.8.
- **Ytskillen**, `tokens.md`, *Verktyg*:
  - Raden om Hyperglot får licensen ”Apache-2.0 från 0.8.0, äldre GPLv3”.
  - Raden om tweakcn flyttas från ”prövas” till ”används inte” om Johnny godtar förslaget.
- **Verktyg:** Hyperglot som lokalt kontrollverktyg i en egen Python-miljö. Inget i kundbygget.
- **Kontroll:** ingen ny grind. Kontrastgrinden finns redan.
- **Ingen MCP.** tweakcns MCP berör bara shadcn-registret.

**Passar vår stack?**
- **Hyperglot och HCT-regeln:** körs eller räknas bara när kit tas fram. **0 byte i sajten.** Inga krockar.
- **Harmony:**
  - Tekniskt passar den Tailwind 4, men den ersätter hela paletten, och kiten använder inte Tailwinds palett.
  - Den skulle skeppa onödiga variabler om `index.css` importeras. README:n varnar själv att filen är *”huge”*.
  - Krockar med WCAG 2-golvet på steg 600.
- **tweakcn:** en Next.js-tjänst utanför stacken. Exporten är ren CSS och kostar inget i sajten, men den följer shadcn:s namn och standardvärden, med samma kontrastbrister som shadcn.

**Risker och flaggor:**
- **Licens:**
  - Hyperglot under 0.8 är GPLv3. Det är ofarligt för ett lokalt verktyg, men versionen bör låsas till ≥ 0.8.1.
  - Harmonizer saknar licens.
- **Telemetri:** tweakcn.com kör PostHog. Hyperglot, Harmony och MCU har ingen telemetri i det jag läst.
- **Betalvägg och konto:** tweakcn kräver konto för att spara teman och betalning ($8 i månaden) för mer än fem AI-teman. Vi loggar inte in.
- **Felaktig regel i vår skill:** `farg.md` säger i dag att tonskillnad 50 ger minst 4,5:1. Det stämmer inte i värsta fall (4,48:1). Rättas.
- **Hyperglots data** för svenska är ”preliminary” och Meänkieli saknas. Resultatet är ett stöd, inte en garanti. Ögat i en provtext med samiska namn behövs fortfarande.
