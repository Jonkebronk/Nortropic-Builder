# Månadsrapporten, ögonblicksbilden och kundportalen

Rapportens källor, form, dag (runt den 4:e), avsnitt och granskning står i `guide/2-9-drift-och-forvaltning.md`, *Rapporten*, och i `BESLUT.md` 2026-10-16 (*Cloudflare Pro och månadsrapportens källor*, *Kundportalen på Nortropics sajt*). Rapporten i övningssajterna övar formen (`BESLUT.md` 2026-10-15). Här står ögonblicksbildens innehåll, kontrollen före utskick och måtten inåt.

## Ögonblicksbilden

En JSON-fil per kund och månad i `sites/<namn>/forvaltning/` eller `sites/<namn>/rapporter/`. Rapporten och portalen läser samma fil, så de kan aldrig visa olika saker (→ 2-9). Fälten (förslag 🔧):

| Fält | Innehåll | Varför |
|---|---|---|
| `schema` | versionsnummer för filens form | Äldre månader går att läsa när formen ändras |
| `period`, `skapad` | månaden och tiden, med tidszon | Jämförelse år för år |
| `bygge` | commit, Git-tagg och Workers versions-id som mättes | Visar vilken version siffrorna gäller, och kopplar ändringar till utfall |
| `kallor[]` | namn, hämtningstid, metod och om datan är slutlig | Search Console är slutlig först efter 2–3 dagar 📄 [mcp-gsc, README](https://github.com/AminForou/mcp-gsc) |
| `nordstjarna` | mått, baslinje, mål, utfall, källa | → `guide/2-1-strategi.md` |
| `kontakter`, `synlighet`, `besok` | värde, källa och period per siffra | Beslutssiffrorna ska gå att stickprova (→ 2-9) |
| `drift` | drifttid mot utlovad nivå, incidenter med tider, formulärtester | Redovisas ärligt mot nivån 📄 [SRE-boken, *Service Level Objectives*](https://sre.google/sre-book/service-level-objectives/) |
| `andringar[]` | PR, typ (standard, normal, akut), ärende, publicerad | Rapportens ändringslista och DORA-måtten |
| `underhall` | uppdaterade beroenden, kända sårbarheter, väntande uppdateringar | Avsnittet *underhåll och säkerhet* (→ 2-9) |
| `mats_efter_lansering[]` | det som inte går att mäta än | Inget hittas på |

Inga personuppgifter om sajtens besökare eller kundens kunder (→ 2-9).

## Kontroll före utskick

- **Varje siffra i rapporttexten finns i ögonblicksbilden.** Ett skript jämför talen i texten med JSON-filen. En siffra som saknas stoppar utskicket (→ 2-9, *Siffrorna kommer ur en ögonblicksbild*). 🔧 Kandidat till kontroll.
- **Kunddelen och den interna delen ligger i skilda filer**, till exempel `2026-11.md` och `2026-11-intern.md`. Tid per steg, svar i kundens ställe och annat underlag för Johnny kan då inte följa med av misstag när utskicket automatiseras [N4]. 🔧
- **Översätt, dumpa inte.** Ett mått utan förklaring tas inte med. 📄 [InstaWP](https://instawp.com/components-of-wordpress-maintenance-report/): *"Don't just throw in a performance score. Translate it."* (leverantör) → 2-9, `guide/2-7-innehall.md`.
- **Lova inte mer än det som levereras.** Rapporten redovisar mot den utlovade nivån, också när den inte nåddes. 📄 SRE-boken, *Service Level Objectives*.

## Måtten inåt: DORA

DORA:s fem mått, enligt dora.dev (uppdaterad 2026-01-05). Johnny ser dem per sajt. De är inget mål och jämförs inte mellan kunder. 📄 [DORA metrics](https://dora.dev/guides/dora-metrics/) (Apache-2.0)

| Mått | DORA:s definition | Hos oss |
|---|---|---|
| Change lead time | från commit till produktion | Mät också från ärende till produktion. Det är kundens väntetid (→ 2-9). 🔧 |
| Deployment frequency | hur ofta det publiceras | ur Workers versioner och Git-taggar |
| Failed deployment recovery time | tid att återhämta sig från en publicering som krävde ingrepp | ur incidentloggen (→ `overvakning.md`) |
| Change fail rate | andel publiceringar som krävde rollback eller snabbrättelse | ur incidentloggen |
| Deployment rework rate | andel oplanerade publiceringar till följd av en incident | ur `andringar[]` med typen akut |

DORA varnar för att mål på måtten frestar till att spela dem, och säger att måtten gäller en tjänst i taget. 📄 samma. DORA fann också att tunga externa godkännanden inte sänker andelen misslyckade ändringar 📄 [Streamlining change approval](https://dora.dev/capabilities/streamlining-change-approval/). Johnnys godkännande är ändå regeln tills vidare (`guide/bilaga-e-oppna-fragor.md`, fråga 2.8).

## Kundportalen

Utformningen är beslutad (`BESLUT.md` 2026-10-16) och står i `guide/2-9-drift-och-forvaltning.md`: en sida per kund och månad ur samma ögonblicksbild, inloggning med Cloudflare Access och engångskod, och portalen byggs när den första betalande kunden har rapporter. Två krav följer av den här skillen:

- Portalen visar bara det som står i kunddelen av ögonblicksbilden, aldrig den interna delen. 🔧
- Access-policyn är en per kund, och engångskoden går bara till kundens registrerade adress (→ 2-9). 📄 [Cloudflare, One-time PIN](https://developers.cloudflare.com/cloudflare-one/integrations/identity-providers/one-time-pin/)
