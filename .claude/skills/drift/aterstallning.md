# Återställning och säkerhetskopior

Regeln *återställ först, felsök sedan* står i `guide/2-9-drift-och-forvaltning.md`, och regeln att *rollback återställer koden, inte data* står i `guide/2-8-teknik-och-kvalitet.md` [N2]. Här står vad som kan gå förlorat för en sajt av typ A och hur det kommer tillbaka.

## Vad som kan gå förlorat och vägen tillbaka

| Vad | Var det bor | Vägen tillbaka | Vem | Källa |
|---|---|---|---|---|
| **Den publicerade versionen** | Workers versioner | `wrangler rollback` eller dashboarden skapar direkt en ny deployment med en äldre version. Det går till någon av de 100 senaste versionerna. Från en delad utrullning går hela trafiken till den valda versionen. | Johnny ger ja, och sedan körs kommandot | 📄 [Rollbacks](https://developers.cloudflare.com/workers/configuration/versions-and-deployments/rollbacks/) |
| **Kod, innehåll och bilder** | Git: sajtens repo | En revert-commit på en gren, sedan den vanliga vägen till produktion. Repot finns på minst två ställen utöver arbetskopian: GitHub och en andra kopia. | Agenten på gren, Johnny godkänner | 🔧; 3-2-1-regeln: tre kopior på två slags lagring, en på annan plats ⚠️ (tillskrivs CISA via sekundärkällor) |
| **D1-data** (samtyckeslogg, formulärets inskick) | D1 | Time Travel är alltid på och kostar inget. Den når 7 dagar bakåt på Free och 30 dagar på Paid. `wrangler d1 time-travel restore` *skriver över databasen*, och utskriften ger ett bokmärke som ångrar återställningen. För längre tid exporteras databasen till R2. | Bara Johnny | 📄 [D1 Time Travel](https://developers.cloudflare.com/d1/reference/time-travel/) |
| **D1-schemat** | `migrations/` i repot | Migreringar går bara framåt. Ett fel rättas med en ny migrering. Dokumentationen beskriver ingen återställning. | Agenten skriver, Johnny tillämpar | 📄 [D1 migrations](https://developers.cloudflare.com/d1/reference/migrations/) |
| **DNS** | Cloudflares zon | En export av zonen som fil i förvaltningsrepot, tagen före varje ändring. Eller DNS som kod med DNSControl, där `get-zones` läser in en befintlig zon. | Johnny | 📄 [DNSControl, Cloudflare](https://docs.dnscontrol.org/provider/cloudflareapi) |
| **Kontot och domänen** | Kunden äger dem | Kundens egna inloggningar och återställningskoder. Byrån är inbjuden medlem (→ `guide/3-3-sakerhet-och-installningar.md`). Hur de lämnas över står på sidan *Så ändrar du på sajten* (→ `guide/2-9-drift-och-forvaltning.md`). | Kunden | 🔧 |
| **Ögonblicksbilder och rapporter** | `sites/<namn>/forvaltning/` | Samma som koden. Cloudflares egen statistik försvinner efter en tid, så ögonblicksbilden är den enda historiken (→ `guide/2-9-drift-och-forvaltning.md`). | – | 📄 2-9 |

## När rollback inte räcker

- **Bindningarna ändras inte.** Resurser som Workern är kopplad till lämnas orörda vid en rollback. Har datans form ändrats mellan versionerna kan den gamla koden få fel. Rollback stoppas när målversionen binder en R2-bucket, en KV-namnrymd eller en kö som inte längre finns, och när en Durable Object-klass ändrats. 📄 [Rollbacks](https://developers.cloudflare.com/workers/configuration/versions-and-deployments/rollbacks/)
- **Därför är schemaändringar bakåtkompatibla:** först läggs det nya till och används, och det gamla tas bort först i en senare publicering. Då kan koden rullas tillbaka en version utan att datan går sönder. 🔧 (en vanlig metod, ingen källa läst här)
- **`_redirects` och `_headers` följer versionen,** eftersom de ligger bland tillgångarna. En rollback tar alltså också tillbaka gamla omdirigeringar. 🔧 (härlett av att tillgångarna laddas upp med versionen)

## Prövad återställning

- **En väg som aldrig prövats räknas som okänd,** inte som ok (→ `guide/2-9-drift-och-forvaltning.md`, *ok, incident eller okänt*). 🔧
- Prova minst en gång per år och sajt [N3]: rulla tillbaka en version på staging, återställ en kopia av D1 till en tidpunkt och läs in DNS-exporten i en provzon. Skriv tiden det tog i incidentloggen. Den tiden är det realistiska måttet för DORA:s *failed deployment recovery time* (→ `rapport.md`). 🔧
- **Märk varje publicering.** Varje produktionsversion har en Git-tagg och ett meddelande i Workers versioner med commit-id. Då vet den som återställer vad den går tillbaka till. 🔧

## Byråns egna data

Övningssajterna och kalibreringsdatan ligger i `sites/`. Git tar inte med katalogen till det publika repot (`CLAUDE.md`). Johnnys domar i `domar.jsonl` och granskningarna är byråns viktigaste underlag (→ `guide/3-2-granskning-och-kalibrering.md`). De behöver en egen kopia på annan plats, i ett privat repo eller en krypterad säkerhetskopia, och aldrig i det publika repot. Förslag till Johnny 🔧.
