# Övervakning, larm och incidenter

Schemat för kontrollerna, de tre utfallen (ok, incident, okänt), tjänstenivåerna, larmregeln och incidentregeln står i `guide/2-9-drift-och-forvaltning.md`. Här står kunskapen bakom dem och det som saknas där. Allt gäller [N3].

## Vad som mäts

Googles SRE-bok nämner fyra signaler för en tjänst som användare möter: latens, trafik, fel och mättnad. Den skiljer på symptom (vad som är trasigt) och orsak (varför). Svartlådemätning utifrån visar problem som pågår, och vitlådemätning inifrån hjälper felsökningen. 📄 [SRE-boken, *Monitoring Distributed Systems*](https://sre.google/sre-book/monitoring-distributed-systems/) (CC BY-NC-ND 4.0, refererad med egna ord)

| Signal | För en liten statisk sajt | Varifrån |
|---|---|---|
| Fel (symptom) | Startsidan svarar inte 200 med rätt nyckelord. Den primära handlingen fallerar. Certifikatet är ogiltigt. | Den externa vakten (svartlåda) |
| Fel (orsak) | Undantag och 5xx i Workern, ett schemalagt jobb som fallerar | Workers Issues och Workers Logs (vitlåda) |
| Latens | Vaktens svarstid; Core Web Vitals i labbmätningen | Vakten; kontroll 9 (→ `guide/2-8-teknik-och-kvalitet.md`) |
| Trafik | Besök och sidor per dag, och ett plötsligt tapp | Zone Analytics på Pro (`BESLUT.md` 2026-10-16) |
| Mättnad | Workers-gränserna på kundens plan, D1:s storlek | Cloudflares användningssidor ⚠️ (inget larm är prövat) |

- **Nyckelordet är statiskt.** Vakten letar efter något som står i HTML:en från servern, till exempel telefonnumret. Text som räknas fram i webbläsaren, som en rad om dagens öppettider, kan inte bära kontrollen. 🔧
- **Den primära handlingen prövas där den slutar.** Går bokningen till ett externt bokningssystem prövar vakten också den länken. Ett fel där är kundens problem även om sajten svarar. → `guide/2-8-teknik-och-kvalitet.md`, kontroll 4.
- **Syntetiska prov skriver inte i riktiga loggar.** En samtyckeslogg ska visa riktiga val (GDPR art. 7.1). Vakten prövar därför `/api/*` med ett anrop som inte skriver, till exempel `GET` som ska ge 405, och formulärtestet märker sina inskick så att de aldrig når kunden (→ `guide/2-9-drift-och-forvaltning.md`, fallgrop 42). 🔧
- **Vakten står hos en annan leverantör än sajten** (→ `guide/2-9-drift-och-forvaltning.md`). En vakt i Cloudflare Workers, som UptimeFlare, slås ut av samma avbrott som sajten (→ `verktyg.md`).

## Larm

- **Varje larm ska gå att agera på,** kräva omdöme och gälla något nytt. Ett larm som bara bekräftar det man redan vet tas bort. 📄 SRE-boken, samma kapitel. → `guide/2-9-drift-och-forvaltning.md`, *Larm och incident*.
- **Ett larm kräver att två kontroller i rad, eller två platser, ser felet.** Checkly gör ett nytt försök innan det larmar, och UptimeFlare har en väntetid för notiser. Det stoppar larm för enstaka nätverksfel. 📄 [Checkly, priser](https://www.checklyhq.com/pricing/); 📄 [UptimeFlare, README](https://github.com/lyc8503/UptimeFlare). Gränsen är 🔧.
- **Kunden får besked vid avbrott över 15 minuter** (→ `guide/2-9-drift-och-forvaltning.md`).
- Vart larmen går är en öppen fråga (`guide/bilaga-e-oppna-fragor.md`).

## Tjänstenivåer och felbudget

Siffrorna och att det interna målet ska vara strängare än det utlovade står i `guide/2-9-drift-och-forvaltning.md`. Det betyder i minuter per månad på 30 dagar:

| Mål | Tillåtet avbrott per månad |
|---|---|
| 99,9 % (utlovat, förslag) | 43 minuter |
| 99,95 % (internt, förslag) | 22 minuter |

**Felbudget (förslag, en källa – bänken).** Googles exempelpolicy säger tre saker. När budgeten för de senaste fyra veckorna är slut stoppas alla ändringar utom rättningar och säkerhetsfixar, tills tjänsten är tillbaka inom målet. En incident som tar mer än 20 % av budgeten kräver en efterhandsgranskning. Policyn är inget straff. För byrån skulle det betyda att en kunds kö pausas medan driften rättas. 📄 [SRE Workbook, *Error Budget Policy*](https://sre.google/workbook/error-budget-policy/)

## Incident

Ordningen *återställ först, felsök sedan* och loggens fält (tid, orsak, beslutsfattare, vad som återställdes) står i `guide/2-9-drift-och-forvaltning.md`. Lägg till fyra tider i loggen: när felet började, när det upptäcktes, när det var åtgärdat och när kunden fick besked. Skillnaden mellan början och upptäckt visar om vakten fungerar. 🔧

**Efterhandsgranskning, skuldfri.** Den skrivs när något av detta har hänt (anpassat efter SRE-bokens lista):

- besökare såg fel längre än en tröskel som Johnny sätter
- data gick förlorad
- en publicering rullades tillbaka eller en rättning gjordes för hand
- felet hittades av kunden eller av en människa, inte av vakten.

Granskningen tar upp förloppet, påverkan, åtgärden, grundorsaken och vad som ska hindra att det händer igen. Den utgår från att alla handlade i god tro: det är system och arbetssätt som rättas, inte personer. En granskning som ingen läst räknas inte, så Johnny läser den. 📄 [SRE-boken, *Postmortem Culture*](https://sre.google/sre-book/postmortem-culture/). Åtgärden blir en kontroll eller ett kriterium (→ `guide/2-9-drift-och-forvaltning.md`, *Lärdomar tillbaka till bygget*).

## Kalendern – det som går ut

Det här kräver förnyelse. Det står i förvaltningsplanen med datum, och veckokontrollen varnar i god tid. 🔧

| Vad | När | Källa |
|---|---|---|
| Domänen | Registratorns förnyelsedatum. Uptime Kumas monitor för domänutgång fungerar bara för toppdomäner med RDAP ⚠️ (inte prövat för .se). | 📄 [Uptime Kuma, ändringslogg](https://github.com/louislam/uptime-kuma/releases) |
| `security.txt` | `Expires` bör ligga mindre än ett år fram. Gamla uppgifter är värre än ingen fil. | 📄 [RFC 9116](https://www.rfc-editor.org/rfc/rfc9116.html), 2.5.5 och 5.3 |
| Avvikande öppettider | Före storhelger och semestrar, på sajten och i Google-profilen samtidigt. Google: med avvikande tider *"your regular hours don't change"*. | 📄 [Google Business Profile, special hours](https://support.google.com/business/answer/6303076) |
| Tokens med slutdatum | Före slutdatumet | 📄 Cloudflare, *Create token* |
| `compatibility_date`, Wrangler, Node | Kvartalsvis, som normal ändring | 🔧 |
| Förvaltningsplanen | Årligen med kunden | → `guide/2-9-drift-och-forvaltning.md` |

Certifikaten på kundens zon förnyar Cloudflare (→ `guide/2-8-teknik-och-kvalitet.md`). Vakten kontrollerar ändå att certifikatet är giltigt, eftersom en förnyelse kan misslyckas när DNS ändrats ⚠️ (härlett).
