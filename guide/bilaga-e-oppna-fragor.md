# Bilaga E – öppna frågor

**Status:** konsoliderad v1.0, 2026-10-15. Samlar de öppna frågorna ur v0.74 §14, `LAGE.md` och konsolideringsanalysen §8.1. När Johnny avgör en fråga skrivs beslutet ordagrant i `BESLUT.md` och frågan stryks här.

## 1. Behövs före den första sajten [N1]

| # | Fråga | Varför det spelar roll | Claudes förslag |
|---|---|---|---|
| 1.1 | ~~Vilken verksamhet blir den första?~~ **Avgjort 2026-10-15:** övningssajter för verkliga lokala firmor, en i taget, tills Johnny är nöjd (`BESLUT.md`, `5-byggplan.md`) | – | – |
| 1.2 | ~~Vem svarar på intervjun?~~ **Avgjort 2026-10-15:** Johnny intervjuar kunden tillsammans med AI:n (`BESLUT.md`) | – | – |
| 1.3 | ~~Publiceras den första sajten?~~ **Avgjort 2026-10-15:** övningssajterna publiceras högst på en förhandsadress bakom Cloudflare Access och aldrig öppet (`BESLUT.md`, `5-byggplan.md`) | – | – |
| 1.4 | ~~Bildkälla för en verksamhet utan egna foton~~ **Avgjort 2026-10-15:** stockbilder och AI-genererade bilder är tillåtna, även av personer (`BESLUT.md`). Ärlighetsregeln i `2-7-innehall.md` gäller: en sådan person presenteras aldrig som kundens personal, och en fotorealistisk AI-person märks (AI-förordningen art. 50.4). Måttstocken väger egna foton högre (fråga 2) | – | – |
| 1.5 | ~~Tidsbudget per sajt~~ **Avgjort 2026-10-15:** ingen tidsbudget förrän Johnny är nöjd med det som byggs; tiden mäts som underlag (`BESLUT.md`, `1-kundens-vag.md`) | – | – |
| 1.6 | ~~Bekräfta Astro statiskt för standardsajten~~ **Avgjort 2026-10-15:** ja, Astro statiskt (`BESLUT.md`, `2-8-teknik-och-kvalitet.md`) | – | – |
| 1.7 | ~~Intervjuns form~~ **Avgjort 2026-10-15:** ett samtal som Johnny leder med AI:n som stöd (`BESLUT.md`); om det sker på plats, i telefon eller i video avgörs per kund | – | – |
| 1.8 | **Integritetspolicy utan formulär?** | Cloudflares serverloggar innehåller IP-adresser (`2-3-struktur.md`, `2-8`) | Ja, en kort policy på alla sajter |
| 1.9 | **Byggs de första sajterna utan betalning?** | Claudes förslag ur en källa (`4-foretaget.md`); styr den första kundrelationen | Ja, för egna sajter och pilotsajter |
| 1.10 | ~~Lucide och Inter som standard i stilkiten?~~ **Avgjort 2026-10-15:** inget globalt förbud; varje kit väljer (`BESLUT.md`, `2-5-yta.md`) | – | – |

## 2. Styrning och skillnader mellan spåren

| # | Fråga | Läget |
|---|---|---|
| 2.1 | ~~Licensbeslutet 2026-10-13 18:50 – betalda verktyg eller andra företags sajter?~~ **Avgjort tills vidare 2026-10-15:** referensregeln gäller tills Johnny säger annat – en referens får bära layout, palett och typsnitt; identitet, texter och bilder kopieras inte (`2-5-yta.md`, `BESLUT.md`). Frågan tas upp igen om ett kit behöver mer | – |
| 2.2 | ~~Beslutsregistret~~ **Avgjort 2026-10-15:** `BESLUT.md` är det enda registret; den här bilagan har bara öppna frågor (`BESLUT.md`) | – |
| 2.3 | ~~`CLAUDE.md`~~ **Avgjort 2026-10-15:** Claudes ändringar i `CLAUDE.md` är förslag som Johnny godkänner (princip 9); flödets regler för en sajt i `sites/<namn>/CLAUDE.md` ur en gemensam mall i byggrepot (`BESLUT.md`) | – |
| 2.6 | ~~Kod från andras sajter~~ **Avgjort tills vidare 2026-10-15:** ingen kod kopieras; teknik får studeras (REA, `2-2-omfattning.md`) – tills Johnny säger annat (`BESLUT.md`) | – |
| 2.7 | **Priser på sajten: rutinändring eller hög risk?** | Webb-pro och researchen: rutin; v0.74 §15.2: hög risk. `2-9` och `4-foretaget.md` följer den strängare regeln tills vidare. |
| 2.8 | **Automatisk sammanslagning i CI** av förvaltningsändringar, eller Johnnys godkännande vid varje publicering? (`2-9-drift-och-forvaltning.md`) | Tills vidare: Johnnys godkännande. |
| 2.9 | ~~Variate, Inspo och liknande verktyg i kundbygget?~~ **Avgjort 2026-10-15:** bara när biblioteket och kiten tas fram (beslutet *Stitch inom stilkit*; `BESLUT.md`) | – |
| 2.4 | **Repot är publikt**, och därmed råmaterialet i `kunskap/raw/`, som enligt README inte ska publiceras vidare. | Johnny 2026-10-15: "det ändrar vi sen". |
| 2.5 | ~~Överlappar `nortropic-intake` intervjun?~~ **Avgjort 2026-10-15:** frågan faller bort – byggsessionen avgränsas från användarnivån, så den gamla skillen laddas inte; den egna intervjuskillen används (`3-3-sakerhet-och-installningar.md`, `BESLUT.md`) | – |

## 3. Senare [N2–N4]

- **Nisch: bransch, paket och priser** – målgruppen är beslutad (otekniska småföretagare), men inte bransch, paketens innehåll eller priser (`4-foretaget.md`). Vilka branscher får mall först (`2-2-omfattning.md`)?
- **Förvaltningen som abonnemang eller tjänstetrappa,** och om sajtgranskningen är ett eget betalt steg (`4-foretaget.md`).
- **Förvaltningens huvudmått:** nordstjärnan eller kontakterna från Google-profilen (`2-9-drift-och-forvaltning.md`); prislistan som standardändring (`2-9`).
- **Stilkit efter de tre första:** de tre första är beslutade 2026-10-15 och tas fram ur måttstocken (`2-5-yta.md`). Vilka kit som följer avgör övningssajterna.
- **Rörelse:** vad budgetnivåerna måttlig och expressiv tillåter; sidövergångar inom `no-preference`; Remotion om byrån får fler än tre anställda (licens) och i version 5.0; Scroll Worlds licens (`2-6-rorelse.md`).
- **Planvyn:** egen HTML-sida eller samma sida som flödespanelens reservläge (`3-5-live-visning.md`).
- **Förvaltningens nivå per kund:** svarstider, antal ändringar, rapportfrekvens (`2-9-drift-och-forvaltning.md`).
- **Var förvaltningens kontroller körs:** lokalt, Claude Codes schemalagda molnagenter eller annan tjänst; **vart larm går** (`2-9`).
- **Hur kundens önskemål kommer in** och vem som skriver ändringsbriefen (`2-9`, `4-foretaget.md`).
- **Säkerhetsgranskning:** vilket verktyg (`2-8-teknik-och-kvalitet.md`) – avgörs i eval.
- **Scrollytelling och Scroll World som tillval:** när de erbjuds, och videotjänst och budget per sajt (`2-6-rorelse.md`).
- **Kundens godkännande av prototyp:** alltid, eller bara vid större sajter.
- **Autonomi:** när designval, rättningsrundor, standardändringar och publicering kan släppas utan Johnny. Alternativen och villkoren står i `3-2-granskning-och-kalibrering.md`; beslutet är Johnnys.
- **Modeller och effort per roll, parallellitet och eval-budget** (`3-3-sakerhet-och-installningar.md`, `3-2`).
- **Arbetsmiljö:** terminal (krävs för mods) eller VS Code; `askUserQuestionTimeout` (`3-3`, `3-5-live-visning.md`). Behörighetsläget är avgjort: det är Johnnys inställning, inte en regel (`BESLUT.md` 2026-10-15).
- **Kunskapsbasen:** vilka källor som tas in först och vem som kontrollerar sammanfattningarna (`3-4-larande-och-underhall.md`).
- **Tillval generellt:** ska varje tillval prövas i eval innan det tas in (`bilaga-a-verktyg.md`)?
- **Jev** och andra externa beslutsmodeller: aktuellt alls, med tanke på kostnad och att data lämnar datorn?

## 4. Tekniska frågor att verifiera

| Fråga | Blockerar | Källa |
|---|---|---|
| Hur wireframes tas fram med Stitch-CLI:t | Framtagning av stilkit (`2-5`) | konsolideringsanalysen §5.2 |
| Stitchs kvoter och kostnad | Framtagning av stilkit; mäts i första körningen | `kunskap/research/2026-10-14_stitch-och-verktyg.md` |
| Läser Claude Code `.agents/skills` (dit `stitch agent-skills add` skriver)? | Stitch-skillen | samma |
| Hur länge en OAuth-inloggning i Stitch håller | Obevakad körning (lös med `STITCH_API_KEY`) | samma |
| Delar Cloudflares förhandsadresser D1/KV med produktion? | Staging med formulär – lös med separata resurser | `2026-10-14_cloudflare-stack.md` |
| Kräver Cloudflare Web Analytics samtyckesbanner? | Val av analys – lös med analys på serversidan | `2026-10-14_dataoverforing-och-analys.md` |
| Thermonuclear code quality review: namn och repo | Kandidat för kodgranskning | `bilaga-a-verktyg.md` |
| ~~Hur byggsessionen avgränsas från användarnivån~~ **Avgjort 2026-10-15:** med en egen konfigurationskatalog (`BESLUT.md`). Verifierad 2026-10-15 i den inloggade byggsessionen. | Risk att gamla regler laddas i första bygget | `3-3-sakerhet-och-installningar.md` |
| Omfattas Google Grounding Lite av villkoren för Places-data? | Research med platsdata (`2-1-strategi.md`) | – |
| Terrazzo och `[data-kit]` för att växla stilkit | Tokenpipelinen (`2-5-yta.md`) | – |
| Fontshares villkor och reserverade typsnittsnamn | Typsnitt i kiten (`2-5`) | – |
| Räcker en begränsad användare (Restricted) i Search Console för API:et? | Schemalagda kontroller (`2-9`) | `kunskap/research/2026-10-14_kopplingar-per-kund.md` |

## 5. Juridik – med jurist före betalande kund [N3]

Tolkningarna i `2-2-omfattning.md` (lagkrav per kund) och researchen 2026-10-14 är inte juridisk rådgivning. Före första betalande kund: kundavtal och biträdesavtal, tillgänglighetslagen och DOS-lagen per kund, dataöverföring och integritetspolicy, AI-förordningen artikel 50, kalla utskick (marknadsföringslagen, GDPR artikel 14), upphovsrätt till genererat material.

## Avgjorda sedan v0.74 (för spårbarhet)

Måttstocken (Johnny tar fram den), tidsbudget (inte förrän kvaliteten sitter) och intervjun (Johnny tillsammans med AI:n), alla 2026-10-15. Hosting (Cloudflare, 2026-10-14), publicering ingår, designsätt (stilkit, 2026-10-15), vem som väljer riktning (2026-10-15), sajttyp (flersidig, 2026-10-15), ordning (flödet först, 2026-10-15), kodstandard (WCAG 2.2 AA), formulärtester, Stitch obevakat (`STITCH_API_KEY`), licenser för scrollytelling-skillen, Hallmark och Inspo (MIT), mods (kräver 2.1.287), test- och skärmdumpsverktyg (Playwright, förslag sedan v0.47 – bekräftas i `2-8`).
