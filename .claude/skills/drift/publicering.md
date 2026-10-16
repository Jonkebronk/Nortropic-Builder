# Publicering och driftberedskap

Grundreglerna för publiceringen står i `guide/2-8-teknik-och-kvalitet.md`, *Publicering*. Där finns huvudena i `_headers`, 404-sidan, `workers_dev`, D1 i EU, `_redirects`, `security.txt`, AI-blockeringen, Crawler Hints och Bing. Steget är `guide/5-byggplan.md`, steg 5. Här står det som driften kräver utöver det. Allt gäller [N3] om inget annat sägs.

## Driftposterna i `wrangler.jsonc`

| Post | Krav | Varför | Källa |
|---|---|---|---|
| `observability.enabled` | `true` | Utan posten skrivs inga loggar till Workers Logs. Då syns `console.error` bara i `wrangler tail` medan någon tittar. Free sparar loggarna i 3 dagar och tar 200 000 händelser per dygn. Paid sparar i 7 dagar. Från 1 december 2026 gäller Cloudflares nya prismodell för observability ⚠️ (inte läst). | 📄 [Workers Logs](https://developers.cloudflare.com/workers/observability/logs/workers-logs/) |
| `observability.issues.enabled` | `true` | Workers Issues grupperar undantag, 5xx-svar och loggade fel per Worker och kan skicka dem vidare till en webhook. Funktionen är gratis under den öppna betan och kräver Wrangler 4.134.0 eller senare. Slås den på i dashboarden skrivs inställningen över vid nästa deploy. Issues ser bara trafik efter att funktionen slagits på. | 📄 [Workers Issues](https://developers.cloudflare.com/workers/observability/issues/) |
| `compatibility_date` | sätts vid bygget | Datumet styr körmiljöns beteende. Det flyttas fram som en normal ändring med förhandsversion, aldrig i förbigående. | 🔧 |
| `d1_databases[].migrations_dir` | `migrations` | Schemat versioneras och tillämpas med `wrangler d1 migrations apply <databasnamn>`. Använd databasnamnet, eftersom bindningsnamnet kan ändras. | 📄 [D1 migrations](https://developers.cloudflare.com/d1/reference/migrations/) |
| `triggers.crons` | i UTC | Cron Triggers körs i UTC. Free tillåter fem per konto (→ `guide/2-9-drift-och-forvaltning.md`). Dashboarden sparar de 100 senaste körningarna under *Cron Events*. Längre historik kräver Workers Logs. | 📄 [Cron Triggers](https://developers.cloudflare.com/workers/configuration/cron-triggers/) |
| `preview_urls` | se *Staging* nedan | Versionsadresserna följer `workers_dev` om posten saknas. När de är påslagna är de publika. | 📄 [Preview URLs](https://developers.cloudflare.com/workers/configuration/previews/) |

**Byggmiljön.** Workers Builds använder Node 24.18.0 och npm 10.9.2 om inget annat anges. En annan version sätts med `.node-version`, `.nvmrc` eller `NODE_VERSION` (📄 [Build image](https://developers.cloudflare.com/workers/ci-cd/builds/build-image/)). Lägg `.node-version` i repot, så att bygget lokalt och hos Cloudflare använder samma huvudversion. Bygget installerar ur låsfilen. Karenstiden behövs där låsfilen ändras (→ `andringar.md`).

## Tokens

Kunden äger sitt Cloudflare-konto, och byrån är inbjuden medlem med 2FA (→ `guide/3-3-sakerhet-och-installningar.md`, `guide/2-8-teknik-och-kvalitet.md`). Använd kontoägda tokens (*Account API tokens*), så att en token inte hänger på en persons inloggning (📄 [Create token](https://developers.cloudflare.com/fundamentals/api/get-started/create-token/)). Behörighetsgruppernas namn står i 📄 [API token permissions](https://developers.cloudflare.com/fundamentals/api/reference/permissions/). Vissa grupper heter *Edit* på ett ställe och *Write* på ett annat, så kontrollera namnen i kontot.

| Token | Bärs av | Behörigheter (förslag 🔧) | Avgränsning |
|---|---|---|---|
| **Läs** | övervakning, rapport, `cloudflare/mcp` när någon undersöker | Konto: *Account Analytics Read*, *Workers Scripts Read*, *Workers Tail Read*, *Account Settings Read*. Zon: *Analytics Read*, *DNS Read*. | Ett konto och en zon. Ingen *D1 Read*, eftersom samtyckesloggen och formulärets inskick är personuppgifter. |
| **Publicering** | bara Workers Builds eller CI, aldrig agenten | Konto: *Workers Scripts Edit*. *D1 Edit* bara om migreringar körs i CI. | Ett konto. |
| **DNS** | Johnny, eller DNSControl om det tas in | Zon: *Zone Read* och *DNS Edit*. DNSControl kräver också *SSL and Certificates Edit*. | En zon. |

- `cloudflare/mcp` har inget eget läsläge. Det är token som begränsar vad agenten kan göra, och OAuth-vägen ger det användaren klickar i. Använd därför en token och inte OAuth för agenter. En token med IP-filter stöds inte av servern i dag. 📄 [cloudflare/mcp, README](https://github.com/cloudflare/mcp)
- Byggsessionen kör OAuth mot byråns eget Cloudflarekonto, enligt Johnnys beslut. Regeln om en läs-token per kund gäller kundernas konton. (`BESLUT.md` 2026-10-16, *Ingen läs-token för byråns Cloudflarekonto …*, 21.49)
- En kontoägd token behöver *Account Settings Read* (i README *Account Resources : Read*) för att servern ska hitta kontot. 📄 samma
- Kända fel i oktober 2026: en OAuth-grant med *DNS Read* kan inte lista poster (ärende 202), och `execute` kan få tidsgräns efter 300 sekunder (ärende 290). 📄 [cloudflare/mcp, issues](https://github.com/cloudflare/mcp/issues)

## Staging

`guide/2-8-teknik-och-kvalitet.md` kräver en förhandsadress bakom Access [N1] och `preview_urls: false` i produktion [N1]. Utan versionsadresser får grenarna i Workers Builds ingen förhandsadress, och då saknar ändringsflödet i `guide/2-9-drift-och-forvaltning.md` sin förhandsversion. Två vägar, båda förslag till Johnny:

- **En separat staging-Worker** med eget namn, `workers_dev: true`, Access på workers.dev-adressen och egen eller ingen D1 och ingen riktig mejlbindning. Det följer `guide/2-8-teknik-och-kvalitet.md` [N2], *Staging har egna databasresurser*. 🔧
- **Versionsadresser i samma Worker** med Access på alla förhandsadresser i kontot. Access kan skydda versionsadresser för en Worker eller för alla. Versionsadresser skapas inte för en Worker med Durable Objects. 📄 [Preview URLs](https://developers.cloudflare.com/workers/configuration/previews/); 📄 [Cloudflares ändringslogg om Access för Workers](https://developers.cloudflare.com/changelog/2025-12-03-reusable-access-policies/) (⚠️ inloggningsalternativen från augusti 2026 lästes bara via en spegel)

Förhandsadressen får aldrig skriva i produktionens D1 (→ `guide/2-8-teknik-och-kvalitet.md`, fallgrop 191).

## Namnserverbyte och domän

- **Granska hela zonen före bytet.** Cloudflares snabbskanning hittar inte alla poster. Kontrollera apex, `www`, MX, SPF, DKIM och DMARC och att proxyläget stämmer. Stäng av DNSSEC hos registratorn före bytet och slå på det igen via Cloudflare efteråt. Bytet kan ta upp till 24 timmar. 📄 [Cloudflare, Full setup](https://developers.cloudflare.com/dns/zone-setups/full-setup/setup/)
- **Exportera den gamla zonen först.** Exporten är den första säkerhetskopian av DNS. Den kan göras som zonfil hos den gamla leverantören eller med DNSControls `get-zones` (→ `aterstallning.md`). 🔧
- **Mejlposterna är kundens mejl.** Ett fel i MX stoppar kundens inkorg, inte bara sajten. Kontrollera efter bytet att mejl går fram åt båda hållen. 🔧
- **En .se-domän registreras hos en svensk registrator**, och kunden äger den (→ `guide/2-8-teknik-och-kvalitet.md`). Utgångsdatumet står i förvaltningsplanen (→ `overvakning.md`).
- **Email Routing kräver Cloudflares MX-poster.** Befintliga MX-poster tas bort eller ändras, och Email Routing kan inte användas bredvid en extern e-postserver, som Google Workspace, Microsoft 365 eller webbhotellets mejl. Guiden för att aktivera varnar för befintliga poster, men varningen är lätt att klicka förbi ⚠️ (bara en sekundärkälla). Har kunden mejl hos någon annan rörs MX inte, och ärendeintaget använder byråns domän. Om en egen underdomän räcker för intaget står inte i dokumentationen ⚠️. 📄 [Cloudflare Email Service, *Domain configuration*](https://developers.cloudflare.com/email-service/configuration/domains/) (*MX conflicts*: "Cannot use Email Routing with external mail servers", läst 2026-10-16). → `andringar.md`.

## Efter det första dygnet ska detta vara sant

- Röktestet med kontrollerna har gått igenom mot produktionsadressen (→ `guide/2-8-teknik-och-kvalitet.md`).
- Vakten bevakar startsidan, den primära handlingen och certifikatet (→ `overvakning.md`).
- Search Console och Bing Webmaster Tools är verifierade, och sitemapen är inskickad av Johnny (→ `guide/2-8-teknik-och-kvalitet.md`, *Synligheten vid publiceringen*).
- Baslinjebilderna för visuell regression är tagna från Johnnys slutgodkännande (→ `guide/2-9-drift-och-forvaltning.md`).
- Ögonblicksbild 0 är sparad, med de siffror som finns före lanseringen (→ `rapport.md`).
- Publiceringen har en tagg i Git och ett meddelande i Workers versioner (→ `aterstallning.md`).
- Kunden har fått sidan *Så ändrar du på sajten* (→ `guide/2-9-drift-och-forvaltning.md`).
