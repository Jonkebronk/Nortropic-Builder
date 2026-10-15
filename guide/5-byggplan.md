# 5. Byggplanen

**Status:** konsoliderad v1.0, 2026-10-15. Ersätter v0.74 §16 (21 steg, där den första hela sajten kom i steg 13).

**Ordning:** flödet först (beslut 2026-10-15) – men i små steg (beslut 2026-10-13), och **varje steg ger något Johnny kan se och döma**. Ett steg är klart när Johnny har dömt resultatet, inte när kontrollerna går igenom. Varje steg körs på den **första verksamheten**, interaktivt i huvudsessionen medan Johnny tittar. Flödets delar byggs för att den sajten ska bli bra, inte för en tänkt framtida skala.

**N1 är litet med avsikt:** högst cirka 60 regler och tio automatiska kontroller i hela guiden (`README.md`, *Nivåer*). Den genererade sammanfattningen `n1-forsta-sajten.md` visar vad som gäller.

## Förberedelser [N1]

Beslut som behövs först (`bilaga-e-oppna-fragor.md`, avsnitt 1):

1. **Den första verksamheten.** Johnny intervjuar den tillsammans med AI:n (beslut 2026-10-15).
2. **Publiceras den första sajten?** Om ja: domän, Cloudflare-konto och nycklar är mänskliga klick (`2-2-omfattning.md`).
3. ~~Bildkälla om verksamheten saknar egna foton~~ **Avgjort 2026-10-15:** stock- och AI-bilder är tillåtna, även av personer, enligt ärlighetsregeln (`2-7-innehall.md`).

Filer som behövs innan steg 1:

| Fil | Var den beskrivs |
|---|---|
| Kort `CLAUDE.md` för sajtarbetet | `3-4-larande-och-underhall.md` |
| `.claude/settings.json` med `permissions.deny` för push, deploy och `.env` | `3-3-sakerhet-och-installningar.md` |
| De åtta kärnfrågorna och briefmallen med sex rubriker | `2-1-strategi.md` |

Kontrollskriptet byggs i steg 3 och granskningsmallen i steg 4 – inte i förväg.

Börja nu – lång ledtid:

- **Ansök om API-åtkomst för Google Business Profile.** Bara Johnny kan ansöka; svar inom 14 dagar (`2-9-drift-och-forvaltning.md`).
- ~~Johnnys måttstock för vad som är bra~~ **Klar 2026-10-15:** Johnny dömde 39 sajter, och måttstocken är godkänd (`mattstock/mattstock.md`). Den blir granskarens kalibrering i steg 4 och grunden för eval (`3-2-granskning-och-kalibrering.md`).
- `claude update` – bara om mods ska användas (kräver 2.1.287; `3-5-live-visning.md`).

## Stegen

| # | Steg | Vad som görs | Johnny ser och dömer | Klart när |
|---|---|---|---|---|
| 1 | **Intervju → brief** | Johnny intervjuar verksamheten tillsammans med AI:n utifrån de åtta kärnfrågorna; briefen med sex rubriker; `fakta.md` med källa per faktum; sidkartan som tabell i `sites/<namn>/sidkarta.md` | Briefen, faktabasen och sidkartan | Kunden har bekräftat underlaget och Johnny har godkänt briefen |
| 2 | **Tre riktningar** | Tre minimala stilkit (färg, typsnitt, avstånd, radie, kort `design.md`) och de sektioner startsidan behöver, en variant var. Stitch används när kiten tas fram, aldrig med kundinnehåll. Riktningarna = **startsidan i tre kit** | De tre riktningarna, mobilen först – stryker eller släpper till kunden | Kunden har valt bland dem Johnny släppt |
| 3 | **Bygget** | Hela sajten i valt kit: standardsidorna och de sektioner de behöver; kontrollskriptet med de tio N1-kontrollerna (`2-8-teknik-och-kvalitet.md`). Ingen granskare än | Sajten i webbläsaren | De stoppande kontrollerna går igenom, så att sajten är redo för Johnnys dom – och Johnny har dömt den |
| 4 | **Granskaren** | En delagent med ren kontext och en checklista; dess fynd jämförs med Johnnys egna domar | Granskarens fynd bredvid sin egen dom | Johnny har avgjort vilka fynd som var rätt; avvikelserna loggas i `domar.jsonl` som kalibreringsdata |
| 5 | **Publicering** (om sajten publiceras) | Cloudflare Workers, förhandsadress bakom Access, `_headers` med grundhuvudena | Förhandsadressen, sedan den publicerade sajten | Johnny har godkänt och sajten är live |
| 6 | **Förvaltningens första rapport** | Rapporten med nordstjärnan, gjord för hand med Claude | Rapporten | Johnny godkänner den som något kunden skulle betala för |

**I varje steg** mäts tiden i `progress.md` som underlag – ingen tidsbudget förrän Johnny är nöjd med kvaliteten (`1-kundens-vag.md`), och det som gjordes för hand noteras. Det som har gjorts för hand tre gånger blir kandidat till en skill (`bilaga-b-skills.md`).

## Därefter – när en verklig sajt kräver det

Ordningen nedan är en prognos, inte en plan. Varje ny mekanism ska kunna peka på den sajt som behövde den (`README.md`, princip 8).

| Nivå | Typiskt nästa |
|---|---|
| N2 – sajt 2–5 | Fler stilkit med alla axlar; fler sektioner och varianter; specialistgranskare; grindkontroll med Stop-hook och belägg; låsning av brief och kontroller; `state.json` och överlämningsfiler; designregelvakt; formulär med Turnstile och D1; staging med egna databasresurser; samtycke och integritetspolicy; SEO-kontrollerna; resultatlogg; `/security-review` |
| N3 – förvaltning | Schemalagda kontroller per kund, visuell regression, ändringskö, ärendeagent, kundavtal och biträdesavtal, juridikfrågorna med jurist, omkalibrering av granskaren |
| N4 – skala | Eval-svit, plugin med versioner, parallella byggen, sandlåda, mods och flödespanel, dolda kontroller, förslag ur lärandet i större skala, tillval som Variate och Scroll World |

Detaljerna står i respektive lager- och flödesfil under märket för nivån.
