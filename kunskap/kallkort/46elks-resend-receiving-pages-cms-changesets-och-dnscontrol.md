# 46elks, Resend Receiving, Pages CMS, Changesets och DNSControl

**Källa (läst 2026-10-16):**
- 46elks: *Receive SMS* (46elks.com/docs/receive-sms). Priset, 3 EUR per nummer och månad, är från anteckningarna för lager 9 (2026-10-13).
- Resend: *Receiving* (resend.com/docs/dashboard/receiving/introduction).
- Pages CMS: https://github.com/pagescms/pagescms (samma repo som hunvreus/pagescms), HEAD `6f4e860` (2026-06-08), tagg `2.1.8`, med `README.md` och dokumentationen *Collaborators*.
- Changesets: https://github.com/changesets/changesets, HEAD `c73949b` (2026-09-22), med `README.md` och `docs/intro-to-using-changesets.md`.
- DNSControl: https://github.com/DNSControl/dnscontrol, HEAD `708b0d4` (2026-10-15), tagg `v5.5.0`, med `README.md` och `documentation/provider/cloudflareapi.md`.

**Licens:**
- 46elks och Resend är kommersiella tjänster.
- Pages CMS, Changesets och DNSControl är MIT. Licenstexten följer med vid kopiering.

**Vad det är:** Fem verktyg för förvaltningens utkanter:
- 46elks: SMS-intag via ett svenskt nummer.
- Resend Receiving: mejlintag med bilagor.
- Pages CMS: ett CMS ovanpå GitHub, så att kunden kan redigera själv.
- Changesets: versioner och ändringslogg för ett delat paket.
- DNSControl: DNS som kod.

**Hur det fungerar:**
- **46elks:**
  - `sms_url` på numret ger en `POST` (formulärkodad) med `id`, `from`, `to`, `message`, `direction` och `created`.
  - Svaret måste vara 200–204, annars försöker 46elks igen i minst 6 timmar och minst 5 gånger.
  - Ett svars-SMS kan läggas i svaret.
  - Sidan beskriver ingen signatur eller autentisering ⚠️. Det finns en separat sida om serverns IP-adresser, som inte är läst.
- **Resend Receiving:**
  - Mejl till `<id>.resend.app` eller till en egen domän med MX.
  - Mejlet tolkas och skickas som `POST` till en webhook.
  - Innehåll (HTML, text och headers) hämtas via API, och bilagor via tillfälliga adresser.
  - Signatur, pris och lagringstid står inte på sidan ⚠️.
- **Pages CMS:**
  - Konfigurationen står i `.pages.yml`. Medarbetare bjuds in med e-post utan GitHub-konto och kan redigera innehåll och media.
  - De kan inte ändra `.pages.yml` eller hantera andra medarbetare.
  - Skrivningarna görs med GitHub-appens token. Utan `commit.identity: user` syns inte vem som ändrat.
  - Medarbetarna ligger i databasen, inte i repot.
  - Egen drift kräver PostgreSQL och en egen GitHub-app.
- **Changesets:**
  - Varje ändring får en liten fil som säger vilken version som höjs.
  - Vid release blir filerna versioner och ändringslogg.
  - Huvudgrenen utvecklar version 3, och version 2 underhålls på en egen gren.
- **DNSControl:**
  - Zonen skrivs som JavaScript.
  - `preview` visar ändringarna och `push` gör dem.
  - `get-zones` läser in en befintlig zon.
  - Cloudflare-token kräver *Zone Read*, *DNS Edit* och *SSL and Certificates Edit*, och fler för Workers-routes.
  - Stöder 76 leverantörer, bland dem Loopia. Oderland saknas enligt researchen.

**Kvalitet och underhåll:**

| Verktyg | ★ | Commits | Författare | Senaste commit |
|---|---|---|---|---|
| Pages CMS | 4 095 | 492 | cirka 8 | 2026-06-08 (fyra månader sedan) |
| Changesets | 12 488 | 985 | cirka 217 | 2026-09-22 |
| DNSControl | 3 970 | 3 527 | cirka 382 | 2026-10-15 |

- 46elks och Resend är aktiva tjänster.
- Kända problem är inte sökta ⚠️, utom DNSControls lista över leverantörer utan underhållare. Den gäller inte Cloudflare.

**Det bästa vi kan ta:**
- **46elks:** mottagaren tar bort dubbletter på `id` och svarar snabbt med 200. Avsändaren kontrolleras mot kundens kontakter.
- **Resend:** bilagor som tillfälliga adresser, så att bilder aldrig ligger kvar i ärendet.
- **Pages CMS:** `commit.identity: user` och att kunden aldrig får ändra konfigurationen.
- **DNSControl:** `get-zones` som säkerhetskopia före namnserverbytet och DNS-ändringar med `preview`.
- **Changesets:** när biblioteket blir ett paket.

**Var det hamnar hos oss:**
- Beslut: **senare: N4**. Intaget och självservicen är N4 i `guide/2-9-drift-och-forvaltning.md`.
- DNSControl kan komma vid N3 om zonerna blir många. Tills dess görs en zonexport för hand (`drift/aterstallning.md`).
- Står i `drift/andringar.md`, `aterstallning.md` och `verktyg.md`.

**Passar vår stack?**
- 46elks och Resend passar en Worker-webhook.
- Pages CMS passar Astro med innehåll i Git, men kräver att innehållet ligger i filer som CMS:et kan redigera. Det gör det med content collections (H1 i revisionen).
- Changesets kräver ett npm-paket, och biblioteket är inte ett sådant i dag.
- DNSControl passar Cloudflare.

**Risker och flaggor:**
- 46elks: ingen dokumenterad signatur.
- Resend: oklart pris och oklar lagringstid. Personuppgifter i bilagor.
- Pages CMS: den hostade appen har skrivrätt i kundens repo, och få bidragsgivare.
- Changesets: version 3 är under utveckling.
- DNSControl: en DNS-token med skrivrätt får aldrig hamna hos en agent.
- Alla tjänster blir underbiträden (`guide/2-9-drift-och-forvaltning.md`, *Avtal och dataskydd*).

**Inloggning:**
- Dokumentation och repon är publika och lästa.
- 46elks, Resend och Pages CMS hostade app kräver konto, och 46elks ett nummer. Johnny skapar dem vid N4.
