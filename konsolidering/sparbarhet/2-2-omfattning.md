# Spårbarhet: `guide/2-2-omfattning.md`

Skrivet 2026-10-15 vid konsolideringen. Radnummer avser `historik/IMPLEMENTERINGSGUIDE-v0.74.md`.

## v0.74

| v0.74-avsnitt (rader) | Var det hamnade (2.2, avsnitt) | Struket och varför | Flyttat till annan fil |
|---|---|---|---|
| Fas 0 Setup: Stitch-CLI, skills, grind (229–232) | – | Inte omfattning | Stitch används när stilkiten tas fram → `2-5-yta.md`; installation och skills → `3-3-sakerhet-och-installningar.md` / `3-4-larande-och-underhall.md` |
| Onboarding: principen om människans klick (234) | Onboarding per kund, första punkten [N2] och checklistan [N1] | "Dokumentet räknar 14 sådana klick" struket: en siffra, ingen regel | – |
| Domän, .se hos Cloudflare (235) | Onboardingtabellen | – | Detaljerna (registrator, namnservrar) → `2-8-teknik-och-kvalitet.md` |
| Cloudflare-konto per kund, 2FA, begränsad API-nyckel (236) | Onboardingtabellen; "Kontona ligger på kundens namn" [N3] | – | Roller, token och 2FA Enforcement → `2-8`; 2FA-regeln → `3-3` (D6) |
| E-postdomän (237) | Onboardingtabellen | – | → `2-8` |
| Google-konto: Search Console, GA4, Tag Manager, Business Profile (238) | Onboardingtabellen [N2] | – | GA4 och samtycke → `2-8` (D4); kopplingar (8g) → `2-9-drift-och-forvaltning.md` |
| Lagkrav per kund i onboardingen (239) | Lagkrav per kund: de tre frågorna [N1] | – | – |
| Formulärtjänst och betalning (240) | Onboardingtabellen | – | Formulär → `2-8` (D3) |
| Personuppgiftsbiträdesavtal (241) | Avtal: Biträdesavtal [N3] | – | – |
| Kundavtal (242) | Avtal: Kundavtalets lagkravsdelar [N3] | – | Kundavtalet som helhet och trappan av insatser (§5.4) → `4-foretaget.md` |
| Starka lösenord och 2FA på alla konton (243) | Onboardingtabellen | – | Regeln → `3-3` (D6) |
| Varje punkt är `blocked` (244) | Onboarding: checklistan | – | `blocked` → `3-1-orkestrering-och-roller.md` |
| Fas 0b inledning (247) | Två spår; Spår B (BESLUT 2026-10-13 18:43 som grund) | "Guiden har hittills förutsatt nybygge" struket: historik | – |
| 1. Fånga sajten: SingleFile, `sitemap.xml`, inloggade sidor, ⚠️ (249) | Spår B: Inventera [N1]; SingleFile under Pröva med ⚠️ | – | – |
| 1b. Integrationer, spårare, formulärmottagare (251–255) | Spår B: Integrationer [N2] | – | Samtycke och integritetspolicy → `2-8` |
| 2. Innehåll till faktabasen (257) | Spår B: "Innehåll blir förslag till faktabasen" [N1] | – | Faktabasen och bildstrategin → `2-7-innehall.md` |
| 3. URL-inventering och omdirigeringar ⚠️, låst kontroll i fas 7 (259–262) | Spår B: Inventera och Omdirigeringskarta [N1]; Kontroll: kartan täcker varje gammal adress | ⚠️ ersatt av 📄 (Google Search Central, Cloudflare, Astro – anteckningarna §1, X1–X3) | Genomförandet i `_redirects` och den låsta kontrollen "ingen gammal URL ger 404" vid lansering → `2-8` (där den redan står) |
| 4. Före-mått (264) | Spår B: Före-mått [N2] | – | Nordstjärnans baslinje → `2-1-strategi.md`; jämförelsen i förvaltningen → `2-9` |
| 4b. Behålla visuell identitet med Stitch-import (266) | Spår B: sista punkten (hänvisning) | Stitch-importen vid varje kundbygge struken: Stitch används bara när stilkiten tas fram (`BESLUT.md` 2026-10-15) | → `2-5-yta.md` |
| 5. Vad fungerar? (268) | Spår B: "Vad fungerar?" [N1]; intervjuguiden ämne C i `2-1` | – | – |
| Regler: bara kundens egen sajt, extern text, full analys av egen sajt (270–273) | Spår B: första punkten [N1] | – | Originalitet och referenser → `2-5-yta.md` (licensfrågan öppen, `bilaga-e-oppna-fragor.md`); extern text → `3-3` |
| Fas 1: bygga eller använda befintligt (287) | Funktioner | – | – |
| §11.5 bygga eller använda befintligt, stjärnor, kostnad i tre lägen, beslutskartan (1603–1607) | Funktioner [N2] | Sendbird/Stream-exemplet struket (referat) | Beslutskartan definieras i `2-1-strategi.md` |
| §11.11 principen sett/härlett/okänt och tabellen (1634–1641) | Tabellraderna om gamla sajten och integrationer: Spår B | – | Principen → `guide/README.md` (D23); raden om dimma → `2-1`; raden om referenser → `2-5-yta.md` |
| §11.11 bänken, källans sammanhang, emotionell prompting, nya oberoende källor (1643–1652) | – | – | → `guide/README.md` (D23) och `kunskap/kallor.md` |
| §11.11 REA: beskrivning och installation (1654) | Spår B: REA [N4] | Installationskommandot (`npx rea-agents setup`, Node 22+) inte med i lagret: verktygsdetalj | → `bilaga-a-verktyg.md` |
| §11.11 REA användning 1, kundens egen sajt (1657) | Spår B: Integrationer och REA | – | – |
| §11.11 REA användning 2, referenssajter (1658) | – | – | → `2-5-yta.md` |
| §11.11 REA användning 3, dimma (1659) | – | – | → `2-1-strategi.md`, Dimma |
| §11.11 REA juridik (1662) | – | – | → `2-5-yta.md` (referenser och licens) |
| §11.11 REA säkerhet: sandlåda, läsrätt, Skill Spector, låst version (1663) | Spår B: REA (hänvisning) | – | → `3-3` (D10) |
| §11.11 REA: bara webbläget, kostnad, pilot mot Playwright CLI (1664–1666) | Spår B: REA [N4] | Caliper som mätverktyg inte nämnt i lagret | Eval och Caliper → `3-2-granskning-och-kalibrering.md` |
| §11.13 inledning, ⚠️ inte juridisk rådgivning (1754) | Lagkrav per kund, inledningen | – | – |
| §11.13 tillgänglighetslagen (1756–1763) | Lagkrav: tabellen, ansvarsstycket, modulerna [N3], osäkert-listan | – | WCAG 2.2 AA som byggstandard → `2-8` |
| §11.13 dataöverföring och analys: DPF, IMY, per leverantör, integritetspolicyn (1765–1769) | Dataskydd per kund [N2]; biträdesavtalets underbiträden | DPF-detaljerna (Latombe, EDPB-brevet, IMY-besluten) inte med i lagret: de styr policy och leverantörsval, inte omfattningen per kund; de står kvar i researchfilen | Samtycke, analys, leverantörer och integritetspolicy → `2-8` (D4) |
| §11.13 AI-förordningen artikel 50 (1771–1774) | AI-chatt [N3] | – | Märkning av AI-bilder → `2-7-innehall.md` |
| §11.13 rättigheter och kundavtal, Stitch- och Higgsfield-villkor (1776–1779) | Avtal: Kundavtalet | – | Villkor per verktyg och licens per tillgång → `2-5-yta.md` (D9) |
| §14, vägarna A–D och "behöver kunden verkligen ett CMS?" (2155) | Funktioner: "Vägen bestäms av funktionerna" [N1] och CMS-regeln [N2] | – | Stack per väg (§14, 2140–2143) och e-handelstestet → `2-8`; frågan om sajttyper är avgjord (`BESLUT.md` 2026-10-15) |
| §12 Addy Osmanis agent-skills: kantfallsfrågorna (dubbelbokningar, återbetalningar, tidszoner) för väg D i fas 1 (1857) | Funktioner: "Bokning (väg D): kantfallen frågas fram …" [N3], tillagd vid ommärkningen 2026-10-15 | – | Verktyget → `bilaga-a-verktyg.md` (rad *Addy Osmanis agent-skills*); bokningstekniken → `2-8` |

Utöver v0.74: kartans lager 2 (två spår, Top Tasks, MoSCoW, branschmallar, kontroll, autonomi) och researchens kandidater (nedan).

## Fallgropar ur §13

| Nr | Var |
|---|---|
| 43 | "Inte nu" skrivs ut |
| 65 | Stjärnor är inte passform |
| 66 | Kostnad i tre lägen |
| 102 | Omdirigeringskarta |
| 103 | Innehåll blir förslag till faktabasen |
| 119 | Fånga bara kundens egen sajt |
| 123 | Dataskydd per kund (hänvisning → `2-8`) |
| 131 | Integrationer, spårare och formulärmottagare |
| 150 | Paketet sätter ramen (offertärenden) |
| 153 | Fånga bara kundens egen sajt (ingen demo utan avtal) |
| 174 | Paketet sätter ramen (krymp omfattningen, inte priset) |
| 179 | Hänvisning → `2-3-struktur.md` |
| 186 | Onboardingtabellen (hänvisning → `2-8`) |
| 187 | Dataskydd per kund (hänvisning → `2-8`) |
| 188 | Kundavtalet: aldrig "lagenlig" |

## Kartan, beslut och research

| Underlag | Använt i |
|---|---|
| `BESLUT.md` 2026-10-13 18:43 (två spår) | Två spår |
| `BESLUT.md` 2026-10-15 (Stitch inom stilkit) | Strykningen av Stitch-importen per kund |
| `historik/karta/2-omfattning.md`: Vad byrån gör, Vad som kommer ut | Ingress; Vad som kommer ut |
| `historik/karta/2-omfattning.md`: Två spår, toppuppgifter med triangulering | Två spår; Toppuppgifter |
| `historik/karta/2-omfattning.md`: Kompetens (skill, branschmallar, mallfunktioner, åtkomst, förankring) | Branschmallen; Funktioner; Kompetens och källor |
| `historik/karta/2-omfattning.md`: Kontroll och Autonomi | Kontroll; Hur självgående |
| `historik/karta/2-omfattning.md`: Öppet (branscher först; Astros `redirects`) | Hur självgående (branscher → `bilaga-e-oppna-fragor.md`); `redirects`-frågan löst i Omdirigeringskarta (via Cloudflare) |
| Anteckningarna lager 1–2 §1 (W1–W7, X1–X5, D2, stjärnor som svag signal, licensflaggor) | Inventera; Omdirigeringskarta; Funktioner (stjärnor); Kompetens och källor |
| Anteckningarna §3 (T1–T5, branschnyckeln, mallinnehåll) | Branschmallen och nollpunkten |
| Anteckningarna §5, lager 2 (McGovern, Kaley/NN/g, Halvorson & Rach, DSDM, tvåspårsskillen) | Toppuppgifter; Krav och prioritering; Kompetens och källor |
| Rapporten, lager 2 (kandidattabellen, ai-website-cloner-template) | Kompetens och källor; Inventera (Map och Observe) |
| `johnnys-lankar-ai-byggare.md` (ai-website-cloner-template, Map och Observe) | Inventera |
| `2026-10-14_tillganglighetslagen.md` §0, §2, §3, §4, §5, §6.1–6.6, §7 | Lagkrav per kund |
| `2026-10-14_dataoverforing-och-analys.md` §3, §5.1, §5.3 | Dataskydd per kund; Kontona på kundens namn; Biträdesavtal |
| `2026-10-14_ai-forordningen-och-rattigheter.md` §3, §4, rekommendationerna | AI-chatt; Kundavtalet |
| `2026-10-14_cloudflare-stack.md` (konto per kund som kunden äger) | Kontona ligger på kundens namn |
| `konsolideringsanalys.md` §4.3 (REA för integrationer lyft med två källor), §7.3 (REA i nivå 4, juridik i nivå 3), §5.2 (juridik blockerar betalande kund, inte pilot) | Integrationer [N2] med två källor; REA [N4]; avtal och moduler [N3]; vid ommärkningen även lagkravsfrågorna [N2] |

## Ommärkning 2026-10-15

Efter granskningen (`konsolidering/granskning-v1.0.md`) och tillägget kl. 14.30 i `konsolidering/skrivregler.md`. Nivåerna i tabellerna ovan avser läget före ommärkningen. Inget är struket utom en dubblett (stjärnorna, som nu är en hänvisning till hemvisten); allt annat som lämnat N1 står kvar i filen med ny nivå.

**N1 före:** 26 märkta punkter och 5 tabellrader. **N1 efter:** 4 punkter – ägarens 3–5 toppuppgifter, *inte nu*-listan, domänen och Cloudflare-kontot på kundens namn (om sajten publiceras) och omdirigeringskartan (om den nya sajten ersätter en befintlig på kundens domän). Onboardingtabellens rader för domän och Cloudflare säger "Som punkten nedan (N1 om sajten publiceras)", så att `bygg_n1.py` inte räknar samma sak två gånger.

### Flyttat från N1

| Punkt (avsnitt) | Före | Efter | Skäl |
|---|---|---|---|
| Intervjun väljer spår | N1 | N2 | I N1 läser researchen kundens sajt om den finns (`2-1`); av spår B gäller bara omdirigeringskartan |
| Spår A | N1 | N2 | Taket |
| Nollpunkten, marketingskills "Small Business / Local" | N1 | N2 | Underpunkt till branschmallen (N2) |
| Toppuppgifterna trianguleras, ägaren rangordnar 10–15 | N1 | N2; ny N1-punkt: *Ägaren nämner 3–5 toppuppgifter* | Granskningen 1.1 (rad 20) |
| MoSCoW per sida, sektion och funktion | N1 | N2 | Granskningen 1.1 (rad 24) |
| "Inte nu" skrivs ut | N1 | N1, konkretiserad: listan står under sidtabellen i `sites/<namn>/sidkarta.md`; i N1 minst kundens önskemål som väntar och vägarna B–D | Granskningen 1.1: N1 = *inte nu*-listan |
| Paketet sätter ramen | N1 | N2 | Taket; paketens innehåll och priser är öppna (`bilaga-e-oppna-fragor.md`, avsnitt 3) |
| Mallfunktionerna | N1 | N2 | Formulär är N2 (`2-8`) |
| Vägen bestäms av funktionerna | N1 | N2 | "De första sajterna är väg A" står kvar; B–D på *inte nu*-listan (N1) |
| Fånga bara kundens egen sajt | N1 | N2 | N1-researchen läser bara kundens sajt (`2-1`); referensregeln bor i `2-5` |
| Inventera | N1 | N2 | Omdirigeringskartan (N1) tar själv adresserna ur `sitemap.xml`, crawl och Search Console |
| Innehåll blir förslag till faktabasen | N1 | N2 | I N1 sker det i researchen före samtalet (`2-1`) |
| Omdirigeringskarta | N1 | N1, villkorad: när den nya sajten ersätter den gamla på kundens domän; Johnny godkänner kartan före publiceringen (`5-byggplan.md`, steg 5); beslutskartan från N2 | Kundens placeringar i sök står på spel; ingen automatisk N1-kontroll (taket på tio i `2-8`) |
| Vad fungerar? | N1 | N2, *Vad fungerar, i detalj?* | Kärnfråga 6 i `2-1` |
| Checklista per kund, `onboarding.md` | N1 | N2 | I N1 räcker publiceringens klick (N1-punkten om domän och Cloudflare) |
| Onboardingtabellen | 5 rader N1 | Domän och Cloudflare: som N1-punkten; e-post, formulärtjänst och betalning N2; lösenord och 2FA N2 (på Cloudflare-kontot redan N1 via `3-3`); lagkravsfrågorna N2 | Taket; formulär N2 |
| Tre frågor avgör lagkraven | N1 | N2, med undantag för vård och tandvård (DOS-lagen saknar mikroföretagsundantag) | Analysen §5.2: juridiken blockerar betalande kund, inte den första sajten; N1 är väg A, en informationssajt |
| Ansvarsstycket om tillgänglighetslagen | omärkt | N2 | Stilregeln |
| Avtal (rubrik "[N3]") | nivå i rubriken | [N3] först på varje punkt | Stilregeln |
| Vad som kommer ut (5 N1-punkter) | N1 | N2; N1-utfallen i en mening före listan | Dubbletter av N1-punkterna |
| Kontroll: varje toppuppgift har en sida eller funktion | N1, automatisk | N2, "rapporterar, stoppar inte" | Granskningen 2.1 punkt 5 (rad 131) |
| Kontroll: varje sida har en källa | N1 | N2, granskningskriterium, "rapporterar, stoppar inte" | Granskningen 2.1 punkt 5 (rad 132) |
| Kontroll: omdirigeringskartan täcker varje gammal adress | N1, automatisk | N2 (norm, får vara grind) | Taket på tio automatiska N1-kontroller; i N1 godkänner Johnny kartan |
| Kontroll: lagkravsprofilen finns | N1 | N2 | Följer lagkravsfrågorna |
| Åtkomst och Pröva (Kompetens) | omärkt, eller [N2] mitt i raden | [N2] först på raden | Stilregeln |

### Granskningsfynd som åtgärdats

| Fynd | Åtgärd |
|---|---|
| 1.1, raderna för `2-2` (20, 24, 131) | Se tabellen ovan |
| 1.2, konton i kundens namn | Delad i [N1] för domän och Cloudflare (om sajten publiceras) och [N3] för övriga konton |
| 2.1 punkt 5, automatiska kontroller rad 131–132 | Flyttade till N2 med "rapporterar, stoppar inte" |
| 2.2, stjärnor är inte passform | Ersatt med hänvisning till `bilaga-a-verktyg.md`, urvalskriterierna. Anteckningarna §1 ("stjärnor är en svag kvalitetssignal") var en andra källa här |
| 2.3 punkt 5, "Kantfallen → `2-2`" i `2-8` | Ny punkt [N3] *Bokning (väg D)* under *Funktioner*, ur v0.74 rad 1857 (raden tillagd i v0.74-tabellen ovan) |
| 2.4, branschmallar | Hänvisningarna står redan med filnamn (`bilaga-e-oppna-fragor.md`); frågan läggs in i bilagan av samordnaren |
| Hänvisningar (skrivreglernas tillägg) | `karta/…` → `historik/karta/…` i guidefilen och här; `5-byggplan.md`, steg 5; bilagor med filnamn |

### Inte löst här

- *Inte nu*-listan placeras i `sites/<namn>/sidkarta.md`; sidkartans format bor i `2-3-struktur.md`, som bör nämna listan.
- N1-punkten om domän och Cloudflare hänger på om den första sajten publiceras (`bilaga-e-oppna-fragor.md`, fråga 1.3).
- `bilaga-a-verktyg.md` anger *Var* = `2-1` för Addy Osmanis kantfallsfrågor; de står nu i `2-2`.
- Undantaget för vård och tandvård i lagkravspunkten är en N1-regel inne i en N2-punkt; det faller bort om den första verksamheten inte är vård (`bilaga-e-oppna-fragor.md`, fråga 1.1).
