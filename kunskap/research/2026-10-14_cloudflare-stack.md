---
titel: "Cloudflare som hosting- och backendstack för små lokala företags webbplatser"
datum: 2026-10-14
kallor:
  - https://developers.cloudflare.com/pages/
  - https://developers.cloudflare.com/workers/static-assets/migration-guides/migrate-from-pages/
  - https://developers.cloudflare.com/workers/ci-cd/builds/
  - https://developers.cloudflare.com/workers/ci-cd/builds/git-integration/
  - https://developers.cloudflare.com/workers/ci-cd/builds/limits-and-pricing/
  - https://developers.cloudflare.com/workers/previews/
  - https://developers.cloudflare.com/workers/configuration/routing/workers-dev/
  - https://developers.cloudflare.com/workers/configuration/routing/custom-domains/
  - https://developers.cloudflare.com/workers/framework-guides/
  - https://developers.cloudflare.com/workers/framework-guides/web-apps/astro/
  - https://developers.cloudflare.com/workers/framework-guides/web-apps/nextjs/
  - https://developers.cloudflare.com/workers/wrangler/commands/
  - https://developers.cloudflare.com/workers/wrangler/commands/workers/
  - https://developers.cloudflare.com/workers/observability/logs/real-time-logs/
  - https://developers.cloudflare.com/workers/observability/logs/workers-logs/
  - https://developers.cloudflare.com/workers/configuration/versions-and-deployments/rollbacks/
  - https://developers.cloudflare.com/workers/configuration/versions-and-deployments/gradual-deployments/
  - https://developers.cloudflare.com/workers/platform/pricing/
  - https://developers.cloudflare.com/workers/platform/limits/
  - https://developers.cloudflare.com/workers/static-assets/headers/
  - https://developers.cloudflare.com/workers/runtime-apis/bindings/rate-limit/
  - https://developers.cloudflare.com/registrar/top-level-domains/
  - https://www.cloudflare.com/tld-policies/
  - https://developers.cloudflare.com/dns/zone-setups/full-setup/
  - https://developers.cloudflare.com/email-service/
  - https://developers.cloudflare.com/email-service/platform/pricing/
  - https://developers.cloudflare.com/email-service/platform/limits/
  - https://developers.cloudflare.com/email-routing/
  - https://developers.cloudflare.com/turnstile/get-started/server-side-validation/
  - https://developers.cloudflare.com/turnstile/plans/
  - https://developers.cloudflare.com/d1/platform/limits/
  - https://developers.cloudflare.com/d1/configuration/data-location/
  - https://developers.cloudflare.com/kv/platform/limits/
  - https://developers.cloudflare.com/r2/pricing/
  - https://developers.cloudflare.com/durable-objects/platform/limits/
  - https://developers.cloudflare.com/web-analytics/about/
  - https://developers.cloudflare.com/web-analytics/faq/
  - https://blog.cloudflare.com/privacy-first-web-analytics/
  - https://developers.cloudflare.com/zaraz/consent-management/
  - https://developers.cloudflare.com/zaraz/pricing-info/
  - https://developers.cloudflare.com/fundamentals/reference/policies-compliances/cloudflare-cookies/
  - https://developers.cloudflare.com/waf/rate-limiting-rules/
  - https://developers.cloudflare.com/cloudflare-one/access-controls/applications/http-apps/self-hosted-public-app/
  - https://blog.cloudflare.com/teams-plans/
  - https://developers.cloudflare.com/fundamentals/api/get-started/create-token/
  - https://developers.cloudflare.com/fundamentals/manage-members/roles/
  - https://developers.cloudflare.com/fundamentals/user-profiles/2fa/
  - https://developers.cloudflare.com/agents/model-context-protocol/mcp-servers-for-cloudflare/
  - https://developers.cloudflare.com/agent-setup/claude-code/
  - https://github.com/cloudflare/skills
  - https://www.cloudflare.com/plans/
  - https://www.cloudflare.com/plans/network-cdn/
  - https://developers.cloudflare.com/data-localization/
  - https://www.cloudflare.com/cloudflare-customer-dpa/
  - https://www.cloudflare.com/gdpr/subprocessors/
---

# Cloudflare som stack för små lokala företags webbplatser

Researchen gjordes 2026-10-14–15 mot Cloudflares officiella dokumentation. Siffror och kommandon är hämtade från de länkade sidorna. Det som inte gick att bekräfta i en officiell källa står som **ej bekräftat**. Bedömningar och rekommendationer som är våra egna står som **egen bedömning**. Priserna anges i USD, så som Cloudflare anger dem, och de kan ändras. Kontrollera dem innan en offert skickas.

---

## 1. Statiska sajter och Workers idag

### Pages eller Workers med statiska tillgångar?
- **Cloudflare rekommenderar Workers för nya projekt.** Pages-dokumentationen har en ruta överst med texten: *"Workers supports most Pages use cases and offers a broader feature set. It is Cloudflare's primary platform for building applications. Start new projects with Workers."* — https://developers.cloudflare.com/pages/
- Migreringsguiden beskriver Workers som en plattform med *"a distinctly broader set of features"*. Den nämner bland annat Durable Objects, Cron Triggers, bättre observability, Logpush, Tail Workers, Source Maps och Email Workers, som Pages saknar. Kostnaden blir densamma: *"Requests for static assets on Workers are free, and Pages Functions invocations are charged at the same rate as Workers."* — https://developers.cloudflare.com/workers/static-assets/migration-guides/migrate-from-pages/
- Workers saknar Pages filbaserade routning för Functions (🟡 i jämförelsen). Om ramverket används löser ramverkets egen routning det.
- **Slutsats:** standarden blir **Workers med statiska tillgångar**. Pages används inte i nya kundprojekt.

### Git-integration (Workers Builds)
- En Worker kan kopplas till ett repo på GitHub, GitLab eller Cloudflare Artifacts. Varje push byggs och publiceras automatiskt: *"enabling automated builds and deployments for your Worker on push."* — https://developers.cloudflare.com/workers/ci-cd/builds/
- Grenar som inte är produktion får förhandsbyggen med egna Preview URLs. *"Supported external providers can also post the URL as a pull request comment."* Statusen syns i GitHub som PR-kommentarer och check runs. — https://developers.cloudflare.com/workers/ci-cd/builds/git-integration/
- Kopplingen görs i dashboarden under Workers & Pages → Worker → Settings → Builds. Första gången auktoriseras Cloudflares GitHub-app.
- Byggkvoter: Free har 3 000 byggminuter per månad och 1 samtidigt bygge. Paid har 6 000 minuter per månad, därefter $0.005 per minut, och 6 samtidiga byggen. Timeout är 20 minuter på båda planerna. — https://developers.cloudflare.com/workers/ci-cd/builds/limits-and-pricing/

### Förhandsvisning som staging
- Det finns två sorters adresser. **Preview URLs** visar alltid den senaste deployen i en förhandsvisning. **Deployment URLs** är låsta till en viss deploy. Formatet på workers.dev är `<preview-name>-<worker-name>.<subdomain>.workers.dev`, och på egen domän `<preview-name>.app.example.com`. — https://developers.cloudflare.com/workers/previews/
- **Förhandsvisningar är publika som standard** (*"Preview URLs are public by default"*). Adresser på workers.dev får `X-Robots-Tag: noindex`. Free tillåter 100 förhandsvisningar per Worker och betalplanen 500.
- Kommando: `npx wrangler preview`, som kräver Wrangler 4.135.0 eller senare.
- Begränsningar: varje förhandsvisning får ett eget namnområde för Durable Objects. Workflows-bindningar delas däremot med produktion, och queue consumers kan inte peka på en förhandsvisning.
- **Viktigt:** D1, KV och R2 nämns inte som separata resurser per förhandsvisning. **Ej bekräftat** om en förhandsvisning skriver till produktionens databas. **Egen bedömning:** använd separata staging-bindningar (egen D1/KV) eller en separat staging-Worker, så att testinskick aldrig hamnar i kundens riktiga data.

### Wrangler – motsvarigheten till Vercel CLI
Syntaxen nedan kommer från https://developers.cloudflare.com/workers/wrangler/commands/workers/ och https://developers.cloudflare.com/workers/wrangler/commands/:

| Behov | Kommando |
|---|---|
| Publicera | `wrangler deploy [<PATH>] [OPTIONS]` |
| Ladda upp version utan att släppa den | `npx wrangler versions upload [PATH]` |
| Släppa version (även gradvis) | `npx wrangler versions deploy [VERSION-SPECS]` |
| Rulla tillbaka | `wrangler rollback [<VERSION_ID>] [OPTIONS]` |
| Live-loggar | `npx wrangler tail [WORKER]` med `--format json\|pretty`, `--status ok\|error\|canceled`, `--search` |
| Hemlighet | `npx wrangler secret put <KEY>` |
| Konto | `wrangler login`, `wrangler whoami` (finns under "General commands") |
| Förhandsvisning | `npx wrangler preview` |

- **Loggar som Claude kan läsa:** `wrangler tail` skriver JSON som kan filtreras med `jq`, till exempel `npx wrangler tail | jq .event.request.url`. Högst 10 samtidiga klienter kan läsa. Vid hög trafik samplas meddelanden, och loggarna sparas inte. — https://developers.cloudflare.com/workers/observability/logs/real-time-logs/
- **Sparade loggar (Workers Logs):** slås på med `[observability] enabled = true` och `head_sampling_rate`. De sparas 3 dagar på Free och 7 dagar på Paid. — https://developers.cloudflare.com/workers/observability/logs/workers-logs/. Det finns 200 000 loggrader per dag på Free och 20 miljoner per månad på Paid, därefter $0.60 per miljon. — https://developers.cloudflare.com/workers/platform/pricing/
- Ett Wrangler-kommando som läser **sparade** Workers Logs: **ej bekräftat**. Sparade loggar nås via dashboarden eller via Cloudflare API och MCP (se avsnitt 7).
- **Byggloggar från Workers Builds** via CLI: **ej bekräftat**. De syns i dashboarden och via GitHub check runs.
- Cloudflare har också ett nytt allmänt CLI, `cf`, som är i beta. Det installeras med `npm install -g cf` och loggar in med `cf auth login`. Det täcker hela det publika API:et och skriver JSON. — https://developers.cloudflare.com/agent-setup/claude-code/

### Ramverk
- Bland de officiella guiderna finns Astro, Next.js, React + Vite, React Router, SvelteKit, Vue, Nuxt, Hono med flera. — https://developers.cloudflare.com/workers/framework-guides/
- **Astro:** `npm create cloudflare@latest -- my-astro-app --framework=astro`. En statisk Astro-sajt behöver **inget** adapter: *"If you want to use Astro as a static site generator, you do not need the Astro Cloudflare adapter."* För SSR används `npx astro add cloudflare`. — https://developers.cloudflare.com/workers/framework-guides/web-apps/astro/
- **Next.js:** *"Cloudflare recommends vinext as the default way to run Next.js applications on Cloudflare Workers."* Skapa projektet med `npm create cloudflare@latest -- my-next-app --framework=next`. OpenNext-adaptern finns kvar för befintliga appar som har kompatibilitetsluckor. Vinext stöder App Router, RSC, Server Actions, ISR och bindningar till D1, R2, KV och Durable Objects. Bildoptimering stöds bara delvis. — https://developers.cloudflare.com/workers/framework-guides/web-apps/nextjs/, https://developers.cloudflare.com/workers/framework-guides/web-apps/opennext/
- **Egen bedömning:** för informationssajter är **Astro (statisk)** det enklaste och billigaste valet. Där behövs bara en Worker-route för formuläret. Next.js på Workers fungerar men har ett extra lager (vinext eller OpenNext) med kända luckor. Det bör bara väljas när sajten verkligen behöver Next.js-funktioner.

---

## 2. Domäner

- **Cloudflare Registrar stöder inte .se.** .se finns inte i TLD-listan och inte heller bland domänerna som snart läggs till (https://www.cloudflare.com/tld-policies/). Samma gäller .nu, .eu, .dk, .fi och .no. Sidan skriver att Cloudflare *"is committed to supporting all available TLDs, with a focus on expanding country-code TLDs"*. Registrar stöder totalt *"over 400 top-level domains"*. — https://developers.cloudflare.com/registrar/top-level-domains/
  - *Tolkningen av listan gjordes med ett verktyg som sammanfattar sidan. Uppgiften om .se stämmer med en sökning, men kontrollera den manuellt i listan innan guiden ändras.*
- **Alternativ för .se:** registrera domänen hos en svensk registrator, alltså ett ombud hos Internetstiftelsen, och peka namnservrarna till Cloudflare (**full setup**). Då är Cloudflare primär auktoritativ DNS. Det fungerar på alla planer, även Free. — https://developers.cloudflare.com/dns/zone-setups/full-setup/. Partial setup (CNAME) finns, men vilken plan som krävs är **ej bekräftat** i den sida som lästes. Det behövs heller inte här.
- **Egen domän på en Worker:** zonen måste vara aktiv i Cloudflare. *"Cloudflare will create DNS records and issue necessary certificates on your behalf."* Ett Advanced Certificate skapas också och täcker även djupare subdomäner. Konfigurationen i `wrangler.jsonc` ser ut så här: `"routes": [{ "pattern": "shop.example.com", "custom_domain": true }]`. — https://developers.cloudflare.com/workers/configuration/routing/custom-domains/
- **SSL** sköts automatiskt för Custom Domains. Universal SSL eller Advanced Certificate behöver ingen manuell hantering enligt sidan ovan.
- **workers.dev stängs av i produktion** med `workers_dev = false`. Om det bara görs i dashboarden återaktiveras adressen vid nästa deploy. Att stänga av workers.dev påverkar inte förhandsvisningsadresserna. — https://developers.cloudflare.com/workers/configuration/routing/workers-dev/

---

## 3. Formulär och e-post

### Ta emot formulär
- **Mönster (egen bedömning, byggt på dokumentationen):** den statiska sidan postar till en Worker-route, till exempel `/api/kontakt`. Workern gör sedan följande i ordning:
  1. validerar Turnstile-token på servern,
  2. validerar fälten,
  3. **sparar inskicket i D1**,
  4. skickar e-post,
  5. markerar raden som skickad eller misslyckad.
- **Turnstile:** valideringen görs mot `POST https://challenges.cloudflare.com/turnstile/v0/siteverify`. En token gäller i 300 sekunder och kan bara användas en gång. Dokumentationen understryker: *"Tokens can be forged … "*, så validering på servern är obligatorisk. — https://developers.cloudflare.com/turnstile/get-started/server-side-validation/
- Turnstile är **gratis**. Free-planen ger upp till 20 widgets per konto och 10 hostnamn per widget. — https://developers.cloudflare.com/turnstile/plans/
- **Rate limiting i Workern:** bindningen `ratelimits` har `limit` och `period`, där perioden är 10 eller 60 sekunder. Den är *"permissive, eventually consistent"*, alltså ingen exakt räknare. Den kräver Wrangler 4.36.0 eller senare. Om bindningen finns på Free är **ej bekräftat**. — https://developers.cloudflare.com/workers/runtime-apis/bindings/rate-limit/

### Skicka e-post
- **Cloudflare Email Service, Email Sending (beta):** skickar transaktionsmejl till godtyckliga mottagare via Workers-bindning, REST API eller SMTP. — https://developers.cloudflare.com/email-service/
  - Kräver **Workers Paid**. 3 000 mejl per månad ingår, därefter $0.35 per 1 000. Mejl till verifierade adresser i det egna kontot är gratis på alla planer och räknas inte mot kvoten. — https://developers.cloudflare.com/email-service/platform/pricing/
  - Gränser: högst 50 mottagare per mejl och 5 MiB per meddelande. Nya konton får en låg daglig kvot som höjs över tid, men den exakta nivån publiceras inte. — https://developers.cloudflare.com/email-service/platform/limits/
- **Email Routing (inkommande):** vidarebefordrar mejl till adresser, Workers eller externa mottagare. Obegränsat på Free och Paid. — https://developers.cloudflare.com/email-routing/, https://developers.cloudflare.com/email-service/platform/pricing/
- **Viktig nyans:** om kundens egen inkorg verifieras som destinationsadress i kundens Cloudflare-konto kan **notisen till kunden** sannolikt skickas gratis även på Free. **Bekräftelsen till besökaren** går däremot till en godtycklig adress och kräver Paid eller en extern tjänst. *(Slutsatsen följer av prisvillkoren ovan men är inte testad.)*
- **Resend eller Cloudflare?** **Egen bedömning:** Cloudflare Email Sending är fortfarande i **beta** och har en okänd startkvot. Behåll **Resend** som standard tills vidare för bekräftelsemejl, eftersom guiden redan har rutiner för det: MCP, SPF/DKIM/DMARC, testinskick. Pröva Cloudflare Email Sending på en intern sajt. Byt när tjänsten är GA, om kunden ändå har Workers Paid. Anropet till Resend görs med `fetch` från Workern.

### Spara inskick – "spara först, skicka sedan"
- **D1 är standard.** Det är SQL och klarar statusfält och frågor. Free-planen ger 5 miljoner lästa rader per dag, 100 000 skrivna per dag och 5 GB lagring. — https://developers.cloudflare.com/workers/platform/pricing/. Databasen kan läggas i EU-jurisdiktion (se avsnitt 9).
- **KV** passar inte för inskick. Det tål bara 1 skrivning per sekund och nyckel. — https://developers.cloudflare.com/kv/platform/limits/
- **R2** används för bilagor, till exempel bilder som skickas med en offertförfrågan.
- Om e-posten misslyckas ligger inskicket kvar i D1. En Cron Trigger kan försöka igen; Free har 5 per konto. — https://developers.cloudflare.com/workers/platform/limits/

---

## 4. Databas och backend – gränser och priser

Källor: https://developers.cloudflare.com/workers/platform/pricing/, https://developers.cloudflare.com/workers/platform/limits/, https://developers.cloudflare.com/d1/platform/limits/, https://developers.cloudflare.com/r2/pricing/, https://developers.cloudflare.com/durable-objects/platform/limits/

| Tjänst | Free | Workers Paid ($5/mån minimum) |
|---|---|---|
| Workers-anrop | 100 000 per dag, 10 ms CPU per anrop | 10 milj./mån ingår, +$0.30/milj.; 30 milj. CPU-ms ingår, +$0.02/milj. |
| Statiska tillgångar | Gratis och obegränsat; 20 000 filer per version | Gratis och obegränsat; 100 000 filer per version |
| Subrequests | 50 per anrop | 10 000 |
| D1 | 5 milj. lästa / 100 000 skrivna rader per dag; 5 GB totalt; 500 MB per databas; 10 databaser | 25 mdr lästa / 50 milj. skrivna per mån; 5 GB ingår, +$0.75/GB-mån; 10 GB per databas |
| KV | 100 000 läsningar / 1 000 skrivningar per dag; 1 GB | 10 milj. läsningar, +$0.50/milj.; 1 milj. skrivningar, +$5/milj.; 1 GB, +$0.50/GB-mån |
| R2 (Standard) | 10 GB-mån; 1 milj. klass A / 10 milj. klass B per mån; gratis utgående trafik | $0.015/GB-mån; klass A $4.50/milj.; klass B $0.36/milj.; utgående trafik gratis |
| Durable Objects | Bara SQLite; 100 000 anrop per dag; 13 000 GB-s per dag; 5 GB per konto | 1 milj. anrop, +$0.15/milj.; 400 000 GB-s, +$12.50/milj. GB-s |
| Workers per konto | 100 | 500 |

**När behövs Supabase ändå? (egen bedömning)**
- **Inloggning för slutanvändare** (väg B–D). I källorna som lästes hittade vi ingen färdig, förstapartstjänst från Cloudflare för användarkonton med lösenord, magiska länkar och OAuth. Om en sådan finns är **ej bekräftat**. Cloudflare Access skyddar interna appar för upp till cirka 50 användare (se avsnitt 6). Det är inte en kundinloggning för en bokningssajt. Supabase Auth med RLS, som guiden redan använder, är det tryggare valet.
- **Admingränssnitt för kunden.** Supabase har en tabellredigerare. D1 har ingen motsvarande vy som är anpassad för slutkunder.
- **Realtid och komplexa relationer** i Postgres, eller när kunden ska äga data i ett välkänt system.
- **Cloudflare räcker** för väg A och för enkla interna flöden: formulär, ett enkelt bokningsformulär utan konton och lagring av inskick.
- Supabase kan anropas från Workern. Hosting på Cloudflare utesluter alltså inte Supabase.

---

## 5. Analys utan cookies

- **Cloudflare Web Analytics** är gratis och gör RUM-mätning via Performance API. *"does not collect or use your visitors' personal data."* — https://developers.cloudflare.com/web-analytics/about/
- **Inga cookies eller localStorage och ingen fingeravtryckning:** Cloudflare använder ingen klientstat som cookies eller localStorage för analysen. De spårar inte heller användare via IP eller User-Agent. Ett besök räknas som en sidvisning som kommer från en annan sajt. — https://blog.cloudflare.com/privacy-first-web-analytics/ (blogginlägg; FAQ-sidan nämner inte detta uttryckligen)
- Begränsningar: osamplade data sparas i 7 dagar och aggregeras sedan till cirka 10 %. Historiken räcker 6 månader. Query strings fångas inte. Det finns **inget stöd för UTM eller egna händelser**. Mjuk gräns: 10 sajter per konto. Beacon fungerar även utan Cloudflares proxy. — https://developers.cloudflare.com/web-analytics/faq/
- **Följd:** konverteringsmätning, som "formulär skickat" eller "klick på telefonnummer", går inte att göra i Web Analytics. Räkna istället inskick i D1 på servern, utan cookies. Om annonsmätning behövs krävs ett samtyckesstyrt verktyg.
- **Zaraz** laddar tredjepartsskript via Cloudflare och har en inbyggd CMP. Ett verktyg som är kopplat till ett syfte körs inte utan samtycke: *"it will not run unless the user gives consent for the purpose the tool is assigned for."* Samtycket sparas i en förstapartscookie. Cloudflare ger inga standardsyften, och ansvaret ligger hos sajtägaren. Stöd för IAB TCF: **ej bekräftat**. — https://developers.cloudflare.com/zaraz/consent-management/
- Zaraz-pris: 1 000 000 händelser per konto och månad gratis, därefter $5 per miljon. Alla planer. — https://developers.cloudflare.com/zaraz/pricing-info/
- **Cloudflares egna cookies** (`__cf_bm`, `cf_clearance`, `_cfuvid` med flera) är enligt Cloudflare *"strictly necessary"*. Cloudflare uppmanar ändå kunderna att redovisa dem i cookiepolicyn. — https://developers.cloudflare.com/fundamentals/reference/policies-compliances/cloudflare-cookies/. Om Turnstile sätter cookies: **ej bekräftat**.

---

## 6. Säkerhet och drift

- **WAF och rate limiting:** Free har **1** regel för rate limiting, räknar bara per IP med en period på 10 sekunder och kan bara matcha på Path och Verified Bot. Pro har 2 regler och 1 minut, Business 5 regler och 10 minuter. — https://developers.cloudflare.com/waf/rate-limiting-rules/. **Egen bedömning:** lägg den enda Free-regeln på `/api/*` och komplettera med Turnstile och rate limiting-bindningen i Workern.
- **Säkerhetsheaders:** filen `_headers` i katalogen för statiska tillgångar. Den tillåter högst 100 regler och 2 000 tecken per rad. **Den gäller inte svar som Worker-koden genererar.** Där måste headers sättas i koden. — https://developers.cloudflare.com/workers/static-assets/headers/
- **Skydda staging och förhandsvisningar med Access:** *"You can use Cloudflare Access to require visitors to authenticate before accessing Version URLs, Preview URLs, and Deployment URLs"*, och Access *"can protect one Worker's production workers.dev URL, preview URLs, or both."* — https://developers.cloudflare.com/workers/configuration/routing/workers-dev/. För förhandsvisningar på egen domän används Access med en policy och wildcard. — https://developers.cloudflare.com/workers/previews/, https://developers.cloudflare.com/cloudflare-one/access-controls/applications/http-apps/self-hosted-public-app/
  - Access är gratis för upp till 50 användare enligt Cloudflares blogg (https://blog.cloudflare.com/teams-plans/, ett äldre inlägg). Den aktuella gränsen kunde inte läsas på prissidan och är **ej bekräftad för 2026**. Det räcker för byrån plus kunden.
  - Inloggning med engångskod via e-post går att konfigurera, men exakt namn och steg för metoden är **ej bekräftade** i de lästa sidorna.
- **Rollback:** `wrangler rollback` eller dashboarden (Deployments → Rollback). De 100 senaste versionerna kan väljas. **Bindningar och data rullas inte tillbaka.** Rollback blockeras om en D1-, KV- eller R2-resurs har ändrats eller tagits bort mellan versionerna. — https://developers.cloudflare.com/workers/configuration/versions-and-deployments/rollbacks/. Gradvis utrullning finns, men vilka planer som har den är ej bekräftat. — https://developers.cloudflare.com/workers/configuration/versions-and-deployments/gradual-deployments/
- **Roller:** Workers Platform Admin (Workers, Pages, Durable Objects, KV, R2), DNS och Administrator Read Only finns på kontonivå. Domain DNS och Domain Administrator finns på domännivå. Planbegränsningar för rollerna anges inte. — https://developers.cloudflare.com/fundamentals/manage-members/roles/
- **API-token med begränsad behörighet:** behörighetsgrupper (Account, User, Zone) kan begränsas till ett visst konto eller en viss zon och kombineras med IP-filter och TTL. Det finns också **Account API tokens** som inte är knutna till en person. Hemligheten visas bara en gång, och nya token har prefixet `cfut_`. — https://developers.cloudflare.com/fundamentals/api/get-started/create-token/
- **2FA:** TOTP, säkerhetsnycklar och e-postkod. Super Administrators kan slå på **2FA Enforcement** för alla medlemmar. Vilka planer som har det: ej bekräftat. — https://developers.cloudflare.com/fundamentals/user-profiles/2fa/
- **Konto per kund eller ett gemensamt konto? (egen bedömning)**
  - Rekommendation: **ett Cloudflare-konto per kund, som kunden äger**. Byrån bjuds in som medlem med rollerna Workers Platform Admin och DNS, eller Domain DNS. Claude får en **Account API token per kund** som är begränsad till kundens konto och zon. Det ger rena kostnader, eftersom kunden betalar en eventuell Workers Paid. Det ger också en enkel överlämning om kunden byter leverantör, och en läckt token drabbar bara en kund.
  - Nackdelen är att Workers Paid ($5) faktureras per konto. Ett gemensamt byråkonto delar en betalplan, men då blandas loggar, kvoter och data för alla kunder, och det blir svårare att lämna ut data.
  - En Worker med Custom Domain kräver att zonen finns i samma konto ("an active Cloudflare zone"). Därför ska domän och Worker ligga hos samma kund.

---

## 7. MCP och agentverktyg

- **Officiell API-MCP:** `https://mcp.cloudflare.com/mcp` ger *"access to the entire Cloudflare API — over 2,500 endpoints across DNS, Workers, R2, Zero Trust …"*. Den har två verktyg, `search()` och `execute()`, och tar cirka 1 000 tokens i kontext. — https://developers.cloudflare.com/agents/model-context-protocol/mcp-servers-for-cloudflare/
- **Produktspecifika servrar** på samma sida:
  - Dokumentation: `https://docs.mcp.cloudflare.com/mcp`
  - Containers: `https://containers.mcp.cloudflare.com/mcp`
  - Browser Run: `https://browser.mcp.cloudflare.com/mcp`
  - DEX: `https://dex.mcp.cloudflare.com/mcp`
  - CASB: `https://casb.mcp.cloudflare.com/mcp`
  - Agents SDK-dokumentation: `https://agents.cloudflare.com/mcp`
  - Separata servrar för Workers-bindningar, observability eller DNS fanns **inte** i listan som lästes, och deras adresser är **ej bekräftade**. Den sidan säger att API-servern täcker allt. Agent-setup-sidan hänvisar dessutom till "domain-specific servers" i repot `cloudflare/mcp-server-cloudflare`.
- **Officiell Claude Code-integration:** https://developers.cloudflare.com/agent-setup/claude-code/
  - Installation: `/plugin marketplace add cloudflare/skills` och sedan `/plugin install cloudflare@cloudflare`. Det installerar **Cloudflare Skills** och registrerar Cloudflares MCP-servrar.
  - Autentisering sker med OAuth, där behörigheterna väljs. I CI kan en API-token skickas som bearer token.
  - Skills-repo: https://github.com/cloudflare/skills. Det innehåller enligt sökresultat bland annat skillarna `wrangler`, `cloudflare` och `cf-cli`. *Skillnamnen kommer från en sökning och är inte verifierade i repot.*
- **Egen bedömning:** installera pluginet. Ge Claude en **begränsad token per kundkonto** istället för bred OAuth. Läsbehörighet räcker för felsökning, och skrivbehörighet ges bara för de Workers och den zon som berörs.

---

## 8. Priser – typisk liten kundsajt

Källor: https://www.cloudflare.com/plans/network-cdn/, https://developers.cloudflare.com/workers/platform/pricing/, https://developers.cloudflare.com/email-service/platform/pricing/

| Scenario | Månadskostnad hos Cloudflare |
|---|---|
| A. Statisk Astro-sajt + formulär-Worker + D1 + Turnstile + Web Analytics, mejl via Resend | **$0** på zonplanen Free + Workers Free (Resend debiteras separat) |
| A'. Samma, men mejl via Cloudflare Email Sending | **$5** (Workers Paid minimum; 3 000 mejl ingår) |
| Vill ha fler WAF- och rate limiting-regler | Pro: **$20/mån vid årsbetalning eller $25/mån vid månadsbetalning** |
| Business (SLA, PCI) | $200/mån vid årsbetalning eller $250/mån vid månadsbetalning; sällan relevant |
| Domän .se | Hos svensk registrator; priset beror på registratorn och ingår inte i Cloudflare |

**Gränser som kan slå till på Free:**
- **10 ms CPU per anrop.** Det räcker för formulärhantering. Tung SSR, till exempel Next.js, kan slå i taket. Väntan på `fetch` räknas inte som CPU-tid enligt CPU-tidsbegreppet, men det är ej verifierat för just detta fall.
- 100 000 Worker-anrop per dag. Statiska filer räknas inte.
- 50 subrequests per anrop.
- 3 dagars loggar.
- 1 regel för rate limiting.
- 1 samtidigt bygge.
- 5 Cron Triggers per konto.
- Email Sending saknas på Free.
- Bot- och spamvågor mot formuläret äter Worker-anrop. Det är ett argument för Turnstile och WAF-regeln.

---

## 9. Data och GDPR

- **Var data behandlas:** Workers körs i Cloudflares globala nätverk, och trafiken avslutas i närmaste datacenter. Att styra var HTTPS dekrypteras och var metadata och loggar lagras kräver **Data Localization Suite**, som är ett *"Enterprise-only paid add-on"*. Det innehåller Regional Services, Customer Metadata Boundary och Geo Key Manager. DLS är alltså **inte** aktuellt för små kunder. — https://developers.cloudflare.com/data-localization/
- **Lagringen kan ändå placeras i EU utan Enterprise:** D1 stöder `--jurisdiction=eu`, till exempel `npx wrangler@latest d1 create <namn> --jurisdiction=eu`. Det måste sättas när databasen skapas. Repliker stannar inom jurisdiktionen. En location hint (`weur`) är ingen garanti. — https://developers.cloudflare.com/d1/configuration/data-location/. R2 har motsvarande jurisdiktioner, men det är **ej bekräftat** i de lästa källorna.
- **DPA:** ingår i avtalet även för self-serve-kunder (*"forms part of the Main Agreement"*). Det innehåller EU:s SCC, modul 2 och 3, och Cloudflare är certifierat enligt EU–US Data Privacy Framework. Listan över underbiträden finns på https://www.cloudflare.com/gdpr/subprocessors/. Ändringar aviseras minst 30 dagar i förväg, och kunden har 10 dagar på sig att invända. — https://www.cloudflare.com/cloudflare-customer-dpa/
- **Egen bedömning för integritetspolicyn:** ange Cloudflare som personuppgiftsbiträde för hosting, CDN, säkerhet och formulärlagring. Nämn överföring till tredjeland via DPF och SCC, D1 i EU-jurisdiktion, de nödvändiga Cloudflare-cookies och Web Analytics utan cookies. Resend eller Supabase listas som separata biträden när de används.

---

## 10. Rekommenderad standardstack per sajttyp

| Sajttyp | Stack | Plan |
|---|---|---|
| **A. Statisk informationssajt med formulär** | Astro (statisk) → Workers static assets; en Worker-route `/api/kontakt`; Turnstile; D1 (`--jurisdiction=eu`) "spara först"; mejl via Resend (Cloudflare Email Sending när det är GA); Web Analytics; `_headers` för säkerhetsheaders; 1 WAF-regel för rate limiting på `/api/*`; Access på förhandsvisningar | Free (+ Resend) |
| **B. Med inloggning (kundportal, medlemssidor)** | Astro SSR med `@astrojs/cloudflare`, eller Next.js via vinext; **Supabase Auth + Postgres med RLS**; Workers som backend och proxy; Turnstile vid registrering | Workers Paid rekommenderas (CPU-tid, loggar) + Supabase |
| **C. Med databas (katalog, enkelt CMS, ärendelista)** | Som A + D1 som huvuddatabas om det inte finns slutanvändarkonton; Supabase om kunden behöver redigeringsvy eller relationer i Postgres; R2 för bilder | Free → Paid vid tillväxt |
| **D. Bokning** | Worker + D1 för bokningar; **Durable Objects** för att förhindra dubbelbokning av samma tid (en Durable Object per resurs eller dag; egen bedömning); Cron Triggers för påminnelser; Supabase Auth om bokning kräver konto; bekräftelsemejl via Resend eller Email Sending | Workers Paid |

Gemensamt för alla typer: ett Cloudflare-konto per kund, 2FA Enforcement, Account API token med begränsad behörighet för Claude, en staging-Worker eller förhandsvisningar bakom Access med separata staging-bindningar, och `workers_dev = false` i produktion.

---

## 11. Det här måste ändras i guiden (IMPLEMENTERINGSGUIDE.md)

| Plats i guiden (rad enligt grep 2026-10-15) | Nu | Ändras till |
|---|---|---|
| Fas 7 steg 3 (≈ rad 578) "Git → GitHub → Vercel" | Vercel kopplas till repot och publicerar varje commit | **Git → GitHub → Cloudflare Workers Builds:** Workern kopplas till repot i dashboarden (Settings → Builds). Huvudgrenen publiceras till produktion, och andra grenar och PR:er ger Preview URLs. |
| Fas 7 steg 3b (≈ rad 579) Staging | Staging-adress, utan angiven teknik | Staging = Preview URL eller separat staging-Worker, **bakom Cloudflare Access**, med separata D1/KV-bindningar. Produktion först efter godkännande. |
| Fas 7 steg 4 (≈ rad 581) "Vercel CLI" | Claude läser byggloggar via Vercel CLI | **Wrangler:** `wrangler deploy`, `wrangler versions upload/deploy`, `wrangler rollback`, `wrangler tail --format json`, `wrangler secret put`. Byggloggar från Workers Builds läses i dashboarden eller GitHub check runs (CLI ej bekräftat). Sparade loggar via Cloudflare API-MCP. |
| ≈ rad 146: verktygsmanifest (Stitch, GitHub CLI, Vercel CLI) | Vercel CLI | Byt till Wrangler (och eventuellt `cf`-CLI i beta). Generera manifestet ur `wrangler --help`. |
| ≈ rad 1039: inloggningar (`vercel login`) | `vercel login` | `wrangler login` (körs av människan) eller en Account API token per kund i miljövariabel. |
| ≈ rad 1038: "inloggningar i fas 7 (GitHub, Vercel)" | Vercel | GitHub, Cloudflare |
| ≈ rad 224: domän, hosting-konto | Allmänt | Lägg till: **.se registreras hos svensk registrator** (Cloudflare Registrar stöder inte .se), namnservrar pekas till Cloudflare (full setup). Ett Cloudflare-konto per kund. |
| ≈ rad 229: 2FA | Lista över konton | Lägg till 2FA Enforcement i kundens Cloudflare-konto. |
| ≈ rad 370: säkerhetsgrunder B–D, "brandvägg eller IP-vitlista" | Allmänt | Konkretisera: WAF-regel för rate limiting, Turnstile, `_headers` och headers i Worker-svar, Supabase RLS. |
| ≈ rad 644–666: fas 8g Kopplingar per kund | Resend, Search Console m.fl. | Lägg till raden **Cloudflare**: officiell API-MCP `https://mcp.cloudflare.com/mcp` + plugin `cloudflare/skills`; Account API token per kund med minsta behörighet. Resend behålls för bekräftelsemejl. |
| ≈ rad 1809, 1824: Vercel-skills | "Vercels deployskill passar fas 7" | Ersätt med Cloudflare Skills (`/plugin marketplace add cloudflare/skills`). Vercel Labs `web-design-guidelines` kan behållas, eftersom den inte handlar om hosting. |
| ≈ rad 2075, 2202: öppna frågor och uppsättningslista | "Vercel eller annat?", "Vercel CLI" | Besluta: Cloudflare Workers. Uppsättning: GitHub CLI + Wrangler + Cloudflare-plugin. Testa fas 7 på en exempelsajt. |
| Analys (§ om cookies och analys) | Ej specificerat i denna grep | Standard: Cloudflare Web Analytics (utan cookies); konverteringar räknas på servern i D1; Zaraz med CMP bara när tredjepartsverktyg krävs. |
| Integritetspolicy-mall | — | Lägg till Cloudflare som biträde (DPA, DPF/SCC, EU-jurisdiktion för D1, nödvändiga cookies). |
| Fallgropar | — | Nya: förhandsvisningar är publika som standard; `_headers` gäller inte Worker-svar; rollback rullar inte tillbaka data; `workers_dev = false` måste stå i konfigurationen; .se kan inte köpas hos Cloudflare. |
| Projektskill `nortropic-stack` (utanför guiden) | "Vercel … leads via server action + Resend" | Behöver motsvarande uppdatering. Den ingår inte i denna research. |

---

## Osäkerheter att verifiera innan guiden ändras
1. Att .se saknas i Registrar. Kontrollera manuellt i https://www.cloudflare.com/tld-policies/.
2. Om förhandsvisningar delar D1/KV med produktion.
3. Gränsen för Zero Trust/Access Free 2026 (50 användare enligt ett äldre blogginlägg).
4. Om rate limiting-bindningen och gradvis utrullning finns på Free.
5. Startkvoten och tidpunkten för GA för Cloudflare Email Sending.
6. Om det finns ett CLI-kommando för byggloggar från Workers Builds och sparade Workers Logs.
7. Skillnamnen i `cloudflare/skills` och adresserna till eventuella separata MCP-servrar för observability och bindningar.
