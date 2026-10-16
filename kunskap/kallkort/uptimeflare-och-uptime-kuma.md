# UptimeFlare och Uptime Kuma

**Källa (läst 2026-10-16):**
- https://github.com/lyc8503/UptimeFlare, HEAD `520c0b8` (2026-10-07). Lästa: `README.md`, exempelkonfigurationen `uptime.config.ts` och commit-historiken.
- https://github.com/louislam/uptime-kuma, HEAD `b092505` (2026-10-14), version 2.5.6. Lästa: `README.md`, `SECURITY.md`, releasesidan och commit-historiken för domän- och certifikatutgång.

**Licens:**
- UptimeFlare: Apache-2.0. Licens- och NOTICE-text följer med vid spridning.
- Uptime Kuma: MIT. Licenstexten följer med.

**Vad det är:**
- UptimeFlare är en gratis drifttidsvakt med statussida som körs i Cloudflare Workers och D1.
- Uptime Kuma är en vakt med webbgränssnitt som man driver själv i Docker eller Node.

**Hur det fungerar:**
- **UptimeFlare:**
  - Upp till 50 kontroller med en minuts intervall, från en vald plats i Cloudflares nät.
  - HTTP, HTTPS och TCP, med förväntad statuskod, nyckelord och förbjudet nyckelord. Tidsgränsen är 10 sekunder som standard.
  - Notiser via apprise och webhook, med en väntetid (`gracePeriod`).
  - Planerat underhåll, och en statussida som kan lösenordsskyddas.
  - Konfigurationen är en TypeScript-fil i ett eget repo som synkas från originalet.
  - **SSL-kontroll saknas** och står som öppen punkt.
- **Uptime Kuma:**
  - HTTP och nyckelord, JSON, ping, DNS, TCP och push, med intervall ned till 20 sekunder.
  - Över 90 notistjänster, flera statussidor och 2FA.
  - Certifikatinformation.
  - **Monitor för domänutgång** via RDAP sedan cirka januari 2026, med flera rättelser fram till juli 2026. Den varnar för toppdomäner utan RDAP.
  - Kräver lokal disk, inte NFS.

**Kvalitet och underhåll:**
- **UptimeFlare:**
  - 3 878 ★, 176 commits, cirka 23 författare. I praktiken en underhållare (lyc8503) med finansiering via ko-fi.
  - CVE-2026-29779: konfiguration och inloggningsuppgifter i `uptime.config.ts` kunde läcka till klienten. Versionerna från 2025-09-21 till 2026-03-04 drabbades, och felet rättades 2026-03-04.
- **Uptime Kuma:**
  - 92 541 ★, 7 384 commits, cirka 1 219 författare, 997 commits sedan årsskiftet.
  - Har en säkerhetspolicy.

**Det bästa vi kan ta:**
- Statiskt nyckelord och förbjudet nyckelord, väntetid före larm och planerat underhåll som tystar larm. Det står i `drift/overvakning.md`.
- Domänutgång via RDAP som idé till veckokontrollen.

**Var det hamnar hos oss:**
- Beslut: **senare: N3**.
- UptimeFlare **släpps som vakt**: den körs hos samma leverantör som sajterna, vilket bryter mot `guide/2-9-drift-och-forvaltning.md` (en vakt hos en annan leverantör). Den saknar också certifikatkontroll och sköts av en person.
- Uptime Kuma prövas vid N3 bara om byrån ändå har en server. Förstahandsvalet för vakten är Checkly (eget kort).
- Står i `drift/verktyg.md`.

**Passar vår stack?**
- UptimeFlare passar tekniskt (Workers och D1), men just därför inte som oberoende vakt.
- Uptime Kuma kräver en server som Nortropic inte har i stacken. Researchen nämner Railway ⚠️.
- För .se är RDAP-stödet inte prövat ⚠️.

**Risker och flaggor:**
- UptimeFlare: en underhållare och en tidigare CVE. Konfigurationen innehåller hemligheter, så repot ska vara privat.
- Uptime Kuma: ytterligare en server att drifta och säkra.
- Publika statussidor visar kundlistan och används inte (2-9).

**Inloggning:**
- Repon och README är publika och lästa.
- UptimeFlare kräver ett Cloudflare-konto och ett eget GitHub-repo.
- Uptime Kuma kräver en egen server.
- Johnny behöver inte logga in för att läsa. Användning kräver konto och server.
