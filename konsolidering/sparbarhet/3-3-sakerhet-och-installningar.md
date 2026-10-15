# Spårbarhet: `guide/3-3-sakerhet-och-installningar.md`

Skrivet 2026-10-15 vid konsolideringen. Radnummer avser `historik/IMPLEMENTERINGSGUIDE-v0.74.md`. Dubblettgrupperna (D) och motsägelserna (M) avser `kunskap/research/2026-10-15_guide-konsolideringsanalys.md`.

## v0.74

| v0.74-avsnitt (rader) | Var det hamnade (fil, avsnitt) | Struket och varför | Flyttat till annan fil |
|---|---|---|---|
| §2 Förutsättningar, tabellen (114–119) | 3.3 *Versioner och installation* (Claude Code) | "Projektlokala skills i `.claude/skills/`" står i 3.4 | Node ≥ 20 och Google-konto (Stitch) → `2-5-yta.md`; Playwright → `2-8-teknik-och-kvalitet.md`; skills → `3-4` |
| §2 Installation av Stitch (121–128) | – | ⚠️ löst av `2026-10-14_stitch-och-verktyg.md` (Node ≥ 20, `@google/stitch`) | → `2-5-yta.md` (Stitch används när stilkit tas fram, beslut 2026-10-15) |
| §2 fallgrop om skillens målmapp (130) | – | ⚠️ ersatt av researchen: `agent-skills add` skriver till `.agents/skills` | → `3-4` *Skills* (fallgrop 1) |
| Fas 0 Setup (229–232) | 3.3 *Versioner och installation* | Scrollytelling-skillen som grundinstallation struken: scrollytelling är tillval (beslut 2026-10-15, sajttyp) | Stitch-CLI och inloggning → `2-5`; "skills syns för Claude" → `3-4`; scrollytelling → `2-6-rorelse.md` |
| §7 inledning, två risker (968–974) | 3.3 ingress | Jev som tillval: se §7.5-raden | §7.1–7.2 (mätbart före bedömt, grindhooken) → `3-1`, `3-2` |
| §7.3 Lager 1, permissions (1039) | 3.3 *Första sajten* [N1], med verifierad JSON | "`git push --force`" ersatt av all push: push till huvudgrenen publicerar via Workers Builds | – |
| §7.3 Lager 2, `skydd.mjs` (1041–1052) | 3.3 *Skyddshook* [N2] | ⚠️ hookformatet verifierat (verifieringen §6) | Behörighet per roll → `3-1` |
| §7.3 Designregelvakt (1054–1062) | 3.3 *Designregelvakt* [N2] | "Stitch-exporten" ersatt av sajt byggd ur stilkit (beslut 2026-10-15) | `design.md` ur stilkitet → `2-5` |
| §7.3 Antimönster (1064–1071) | 3.3 *Designregelvakt*, antimönster per sajt | Globalt förbud mot Inter, Geist och Lucide struket: en videos smak (analysen §4.2); frågan står i `LAGE.md` (öppen fråga 5) | Antimönster som inte går att söka fram → `3-2` |
| §7.3 Hemligheter i flödets filer (1073–1078) | 3.3 *Hemligheter* [N1] och [N2] | – | `stitch login` → `2-5` |
| §7.3 Ignore-filer (1080) | 3.3 *Skyddshook*, läsförbud | `.agentignore` struken (M5); ⚠️ löst: `.claudeignore` har ingen effekt | Dolda kontroller → `3-1` |
| §7.3 Extern text är data (1082–1086) | 3.3 *Extern text är data* [N1] | – | Behörighet för roller som läser externt → `3-1`; kundmaterial via intervjun → `2-1-strategi.md`, `2-7-innehall.md` |
| §7.3 Kassaskåp per kund (1088–1094) | 3.3 *Hemligheter* [N3] | Dokumentets notering att bootstrap-mönstret förutsätter avstängda behörighetsfrågor struken: hos oss gäller deny-reglerna ändå | Bitwarden Secrets Manager → `bilaga-a-verktyg.md` |
| §7.3 Sandlåda (1096–1101) | 3.3 *Sandlåda* [N4] | Orkestrerarens sandlåda per deluppgift (1100) som detalj struken; principen står kvar | Docker Sandbox → `bilaga-a-verktyg.md`; sammanslagning i tur och ordning → `3-1` |
| §7.4 Meddelanden under bygget (1103–1113) | 3.3 *Meddelanden under bygget* [N2] | – | Inkorgen i panelen → `3-5-live-visning.md` |
| §7.5 Jev-verktygen (1115–1147) | 3.3 *Jev-verktygen* [N4] | Tabellen över uppföljningsvideons användningar (1137–1145) komprimerad: väljare av skill och snabb filsökning/komprimering har låg relevans (videons egen bedömning) | Länkarna → `bilaga-a-verktyg.md`; sållning före granskning (§7.6) → `3-2`; målstyrd testning → `3-2`, `2-8` |
| §7.7 Bevakning med Monitor (1162–1175) | 3.3 *Monitor* [N2], [N4] (D21) | ⚠️ löst (verifieringen §3). Rättat: Monitor är ett verktyg som matar utdata till Claude, med tidsgräns 5–30 min, inte en vakt som bevakar tyst hela flödet | Flödespanelen → `3-5` |
| §6.3 Monitor under bygget (889) | 3.3 *Monitor* (D21) | – | – |
| §8 inledande ⚠️ (1181) | 3.3 *Inställningar*: verifierade nycklar | ⚠️ ersatt av verifieringen §8–9 | – |
| §8.1 Ny init och ärvda regler (1183–1192) | – | – | → `3-4` *`CLAUDE.md`* (D22) |
| §8.2 Inställningar (1194–1209) | 3.3 *Inställningar* | "T.ex. 120 s" rättat till dokumenterade värden; "lägg i projektets settings" rättat för nycklar som bara verkar i användarscope (M6) | – |
| §8.3 Använd inte i flödet (1211–1215) | – | – | `subtask` för granskare → `3-1` (D1); fokusläge → `3-5` |
| §8.4 Parallellt arbete (1217–1220) | 3.3 *Inställningar*, sista raden [N4] ⚠️ | – | Agentvyn → `3-5` |
| §8.6 inledning (1291–1292) | 3.3 *Promptregler*, ingress | – | – |
| §8.6 Standardtext i byggarprompten (1294–1305) | 3.3 *Promptregler*: sju regler med nivå | – | Faktaregeln (1301) → `2-7` (D15); "Ingen tillgjord prosa" (1300) → `2-7` (D16); mekanismen för belägg (1303) → `3-1` (D2) |
| §8.6 Effort per roll (1307–1312) | 3.3 *Effort och modeller* och rolltabellen (D5) | "Låg effort för alla" och "håll effort mellan låg och hög" ersatta av Anthropics high som start (M2) | – |
| §5.2 effortraden (810), rolltabellens modellkolumn (794–801), fas 7 starkaste modellen (601), fas 8b effort efter ändringens storlek (648) | 3.3 rolltabellen (D5) | "Effort börjar lågt" (810) struken (M2) | Ny brief och staging vid omdesign → `2-9-drift-och-forvaltning.md` |
| §8.6 Modellval efter kostnad, intelligens och smak (1314) | 3.3 *Effort och modeller* [N2] | – | – |
| §5.3 Advisor (818, 820–823), rolltabellen (795, 796, 801) | 3.3 *Effort och modeller*, advisor [N4] (D20) | ⚠️ löst (verifieringen §9) | Stoppvillkoret "samma fel två varv" → `3-1` |
| §8.6 Astra som eval-kandidat (1315) | 3.3 *Effort och modeller* [N4] | "Stitch förblir designmotorn" struken: designsättet är stilkit (beslut 2026-10-15) | Codex-pluginet → `bilaga-a-verktyg.md` |
| §8.6 Tyst modellbyte (1317–1320) och grindraden (1024) | 3.3 *Effort och modeller*, modellbyte [N2] | Grinden "annars `blocked`" struken: en andrahandsanekdot (analysen §4.2) | Loggning per varv → `3-2` |
| §8.6 Kostnad (1322) | 3.3 *Effort och modeller* [N2] | – | Tid och kostnad per steg → `1-kundens-vag.md` |
| Fas 6c, inga hemligheter i klientkoden (589) | 3.3 *Hemligheter* [N1] (D6) | – | Själva kontrollen → `2-8`, `bilaga-c-kontroller.md` |
| Fas 7, `wrangler secret put` (612) | 3.3 *Hemligheter* (D6) | – | Övriga `wrangler`-kommandon → `2-8` |
| Fas 0 onboarding: kundens konto, 2FA, avgränsad API-nyckel (236) | 3.3 *Hemligheter* [N1] (D6) | – | Onboarding → `2-2-omfattning.md`; kontot → `2-8` |
| Fas 3 full isolering (408), fas 7 sandlåda för säkerhetsgranskning (603), fas 8d (664), §11.11 REA (1663) | 3.3 *Sandlåda* (D10) | – | Granskningen → `2-8`; REA → `bilaga-a-verktyg.md` |
| Fas 8g, Business Profile utan läsroll (703) | 3.3 *Skyddshook*, raden om Business Profile [N3] | – | Kopplingarna → `2-9` |
| §10.2 lager 2, Bash-skrivning till låsta sökvägar (1459) | 3.3 *Skyddshook*, tabellrad | – | Låsningen → `3-1` |

## Fallgropar ur §13

| Nr | Var |
|---|---|
| 10 Skyddsvakter stoppar nödvändiga raderingar | *Skyddshook* |
| 11 Nya meddelanden mitt i arbetet | *Meddelanden under bygget* |
| 14 En väntande fråga stoppar en obevakad session | *Inställningar*, timeout |
| 18 Modellen återgår till egna färger och typsnitt | *Designregelvakt* |
| 26 Automatiska commits skickar med hemligheter | *Hemligheter* |
| 34 Modellen stannar och frågar | *Promptregler* [N4] |
| 35 Modellen rättar sådant den inte ombetts röra | *Promptregler* [N1] |
| 36 Hela filer skrivs om | *Promptregler* [N2] |
| 37 Tyst byte till svagare modell | *Effort och modeller*, modellbyte |
| 39, 88 Hög och högsta effort | *Effort och modeller*, taket |
| 43 Agenten bygger mer än du bett om | *Promptregler* [N1] |
| 89 Billig modell för säkerhetsgranskning | Rolltabellen |
| 90 Billiga modeller eskalerar i onödan | Advisor |
| 91 Fel upptäcks först vid grinden | *Monitor* |
| 99 Instruktioner i externt innehåll | *Extern text är data* |
| 109 Antimönster som bara står som text | *Designregelvakt* |
| 111 `design.md` som agenten själv fyller på | *Designregelvakt* |
| 115 Okänt kommando antas ofarligt | *Skyddshook* |
| 124 Kunders hemligheter i ett gemensamt förråd | *Hemligheter* [N3] |
| 132 `CLAUDE.md` från andra mappar | *Första sajten*, avgränsningen [N1] (flyttad från `3-4` vid ommärkningen) |
| 141 Hemligheter i klientkoden | *Första sajten*, deny-punkten (N1-kontroll 10 i `2-8`); *Hemligheter* [N2] |
| 146 Låg effort för roller som söker | Rolltabellen |
| 165 Byta modell efter en YouTube-jämförelse | Astra |
| 189 Isoleringshooks i pluginets agenter | *Skyddshook* (även `3-4`) |
| 192 Säkerhetsgranskning utan sandlåda | *Sandlåda* |

## Kartan och researchen

- `kunskap/research/2026-10-14_claude-code-verifiering.md` §3 (Monitor), §4 (plugin-agenter), §6 (hooks, `PostModelSwitch`), §7 (deny-syntax, ingen säkerhetsgräns, ignore-filer), §8 (settings-nycklar, scope, Johnnys användarinställning), §9 (advisor, safe mode, timeout, agentvy).
- `2026-10-14_cloudflare-stack.md`: `wrangler deploy`, `versions deploy`, `secret put`; Workers Builds vid push; kundägt konto med 2FA.
- `2026-10-14_stitch-och-verktyg.md`: Business Profile saknar läsroll.
- `2026-10-15_kompetensluckor-anteckningar/flodet-loopar-bedomare.md` §5: Simon Willison om sandlåda.
- Konsolideringsanalysen M2, M5, M6, §4.2 (antimönster, modellbyte, säkerhetsgranskarens modell), §4.3 (plan på stark modell), §7.3–7.4 (N1: bara `permissions.deny`).
- Ny i v1.0 utan v0.74-förlaga: N1-paketet *bevakad körning* (uppdraget; beslut 2026-10-13 "små steg"), den verifierade deny-listan med `wrangler`, och att push också är publicering.

## Ommärkning 2026-10-15

Efter `konsolidering/granskning-v1.0.md` och tillägget 14.30 i `konsolidering/skrivregler.md`. N1 gick från 14 punkter och 2 tabellrader till **3 punkter och 0 tabellrader**.

**Kvar i N1:** bevakad körning (med *inga extra hooks* inbakat), `permissions.deny` för push, publicering och `.env` (med `.gitignore`, inloggning med verktygens egna kommandon och hänvisning till N1-kontroll 10), och den nya punkten *byggsessionen avgränsas från användarnivån*.

**Flyttat från N1 till N2** (inget struket):

| Punkt | Ny nivå | Anmärkning |
|---|---|---|
| Inga extra hooks | – | Sammanslagen med *bevakad körning* |
| Hemligheter skrivs aldrig i flödets filer | N2 | `gh auth login`/`wrangler login` flyttade till deny-punkten |
| En API-nyckel per kund | N2 | I N1 loggar Johnny in själv |
| Inget hemligt i det som når webbläsaren | N2 | Kontrollen är fortfarande N1-kontroll 10 (`2-8`) |
| Extern text är data | N2 | I N1 är spärren att Johnny tittar |
| Projektets settings där det går | – | Sammanslagen med den nya avgränsningspunkten; resten är löptext under *Inställningar* |
| `askUserQuestionTimeout` `never` (tabellrad) | Förslag, inget ställs in; N4 för kort värde | Granskningen 1.3 punkt 14 |
| Börja på high | N2 | I N1 gäller Johnnys standardinställning; ny löptext före rolltabellen |
| Rolltabellen: byggare, granskare (N1), sökande roller (N1–N2) | N2 | Samma skäl |
| Promptreglerna *ändra bara filerna i uppdraget*, *bygg inte mer än uppdraget kräver*, *belägg före rapport* | N2 | Standardtext till delagenter; i N1 pratar Johnny direkt med huvudsessionen |
| Claude Code 2.1.281 räcker | – | Löptext (fakta, ingen regel) |

**Omärkta listpunkter som fått nivå:** *`design.md` som byggaren fyller på* [N2], *Sandlådan är inte vald* [N4]; *Modell*-raden i tabellen [N2]. Raden om Astro, Playwright och Wrangler under *Versioner* är nu löptext.

**Granskningsfynd som åtgärdats:**

| Fynd | Åtgärd |
|---|---|
| 1.2 Monitor (N2 här, N4 i `bilaga-a-verktyg.md`) | N2 behålls; regeln bor här. Bilaga A:s rad (N4, *Var* = 3-1) behöver rättas av den som äger bilagan |
| 1.3 punkt 5 / 2.2 Lucide, Inter, antimönster per kit | *Designregelvakt* behåller bara vaktens mekanik; kitets antimönster → `2-5-yta.md`; standardfrågan → `bilaga-e-oppna-fragor.md`, fråga 1.10 |
| 1.3 punkt 14 `askUserQuestionTimeout` och auto mode | Båda märkta "förslag" med hänvisning till `bilaga-e-oppna-fragor.md`, avsnitt 3 |
| Uppdraget: användarnivåns skills | Ny N1-punkt *byggsessionen avgränsas från användarnivån* (projektets `.claude/`, `/doctor`, `--safe-mode` som baslinje), ⚠️ för mekanismen; frågan → `bilaga-e-oppna-fragor.md`, avsnitt 4. Underlag: 292 mappar i `~/.claude/skills/` och `nortropic-stack`s beskrivning (Next.js, Vercel), sett 2026-10-15; `--safe-mode` ur verifieringen §9 |
| Hänvisningar | Bilaga C finns nu (`bilaga-c-kontroller.md`); hemligheterna hänvisar till N1-kontroll 10 i `2-8`. Publiceringen → `5-byggplan.md`, steg 5 |
