# 2.8 Teknik och kvalitet

**Status:** konsoliderad v1.0, 2026-10-15; ommärkt efter granskningen samma dag (`konsolidering/granskning-v1.0.md`). **Genomläst med Johnny 2026-10-15**; rättelserna står i `BESLUT.md`.

Lagret gör sajten till något som fungerar: den bygger, är snabb, tillgänglig och säker, går att hitta, tar emot förfrågningar och följer lagen. Garretts fem plan slutar vid ytan; det här är det en webbyrå också levererar. Lagret är hemvist för **de tio N1-kontrollerna**, **formulär** (D3), **samtycke och analys** (D4), **säkerhetsgranskning** (D19) och **platshållarkontrollen vid publicering** (D14). Byggets orkestrering (checkpoints, överlämning, status) står i `3-1-orkestrering-och-roller.md`, granskningen i `3-2-granskning-och-kalibrering.md`.

## Vad byrån gör

### Stacken

| Sajttyp | Stack | Cloudflare-plan |
|---|---|---|
| **A. Informationssajt med formulär** (standard) | Astro statiskt som Worker med statiska tillgångar; Worker-route för formuläret; Turnstile; D1 i EU; mejl via Resend; edge-analys | Free (+ Resend) |
| B. Inloggning | Som A + Supabase Auth med RLS; Astro SSR med `@astrojs/cloudflare` | Workers Paid ($5/mån) + Supabase |
| C. Databas | Som A + D1 som huvuddatabas; Supabase bara för redigeringsvy eller relationer; R2 för bilder | Free, Paid vid tillväxt |
| D. Bokning | Worker + D1; Durable Objects mot dubbelbokning; Cron Triggers för påminnelser | Workers Paid |

📄 `kunskap/research/2026-10-14_cloudflare-stack.md` (nedan *research*) §1, §4, §10. Priser i USD som kan ändras; kontrollera före offert. De första sajterna är typ A; väg B–D tas in när en kund behöver det (`2-2-omfattning.md`).

- [N1] **Astro statiskt; publiceras sajten körs den som en Worker med statiska tillgångar i kundens eget Cloudflare-konto, inte på Pages.** Övningssajterna publiceras inte och körs bara lokalt (`5-byggplan.md`, *Övningssajterna*). `output: 'static'` utan adapter; projektet skapas med `npm create cloudflare@latest -- <namn> --framework=astro`. Hosting på Cloudflare är beslutat 2026-10-14, och Cloudflare skriver själv *"Start new projects with Workers"*. Ett konto per kund, som kunden äger och byrån bjuds in i som medlem: en läckt nyckel drabbar då bara en kund (fallgrop 124; kontot är ett mänskligt klick → `2-2-omfattning.md`, token och behörigheter → `3-3-sakerhet-och-installningar.md`). Båda spåren förutsätter Astro (`LAGE.md`), men Johnny har inte bekräftat ramverket uttryckligen: *Öppet – se `guide/bilaga-e-oppna-fragor.md`, fråga 1.6.* 📄 research §1, §6 (kontot: egen bedömning)
- [N2] **Få beroenden och låst låsfil.** Varje bibliotek är vikt, underhåll och en väg för fel. 🔧 Inget UI-komponentbibliotek som styr utseendet → `2-4-skelett.md` (fallgrop 96).
- [N2] **Gratisplanen räcker för typ A:** 100 000 Worker-anrop per dag (statiska filer räknas inte), 10 ms CPU per anrop, en regel för rate limiting, tre dagars loggar. Spamvågor mot formuläret äter anrop; "gratis att börja" kan bli dyrt att driva (fallgrop 66). 📄 research §8

Innehåll skilt från design: texterna → `2-7-innehall.md`, komponenterna → `2-4-skelett.md`. HTML först, utan JavaScript: regeln → `2-4-skelett.md`; kontrollen står i N2-tabellen under *Kontroll*.

### Kodstandard

- [N1] **WCAG 2.2 nivå AA är golvet för alla sajter,** också när lagen inte kräver det. De flesta kunder är mikroföretag och undantagna från tillgänglighetslagen (10 §), men WCAG 2.2 är ISO/IEC 40500:2025 och nivån som EN 301 549 v4.1.1 bygger på. Vad vi lovar kunden (*byggd enligt WCAG 2.2 AA, testad med …*, aldrig *lagenlig*, fallgrop 188) → `2-2`. 📄 `kunskap/research/2026-10-14_tillganglighetslagen.md` §3.2
- [N2] **Standarden** som byggaren följer och granskaren läser mot. En sajt kan se rätt ut medan koden är bristfällig (fallgrop 25). En kunnig byggare gör det mesta ändå; därför N2 som regel, medan WCAG-golvet och N1-kontrollerna gäller från första sajten. 🔧 (v0.74 fas 6b), WCAG 2.2-kriterier inom parentes 📄
  - [N2] **Semantik:** `header`, `nav`, `main`, `footer`; en `h1` och rubriknivåer utan hopp; knapp är `<button>`, länk är `<a href>`; `lang="sv"`.
  - [N2] **Tillgänglighet:** alt-text, tom för dekor (1.1.1); skiplänk (2.4.1); synligt fokus (2.4.7) som inte döljs av klibbigt sidhuvud (2.4.11); kontrast 4,5:1 för text, 3:1 för gränssnittsdelar och fokusring (1.4.3, 1.4.11); reflow i 320 px (1.4.10); textavstånd (1.4.12); träffytor minst 24 × 24 px (2.5.8). Rörelse → `2-6-rorelse.md`.
  - [N2] **Formulär:** synliga etiketter, `autocomplete` (1.3.5), fel i text vid fältet som säger hur det rättas (3.3.1, 3.3.3), inget som måste fyllas i två gånger (3.3.7).
  - [N2] **Prestanda:** bilder i rätt storlek och format med `width`, `height` och `srcset` (`astro:assets`); lat laddning under första vyn, aldrig för den största bilden i första vyn; självhostade typsnitt; inga onödiga bibliotek.
  - [N2] **Ordning:** ingen död kod, inga kvarlämnade testvärden, inga färger utanför designvariablerna.
- [N2] **Webb-pros husval är inte norm.** 44 px för primära knappar och inga karuseller får stå som granskningskriterier, inte som kontroller. 📄 `kunskap/research/2026-10-15_webb-pro-genomgang.md` §3
- [N2] **Standarden gäller också förvaltningens ändringar,** annars växer spaghettikod fram ändring för ändring (fallgrop 142). 🎥 Ebbelaar-intervjun; kodgranskningen → `3-2`
- [N2] **Bildvikt mäts genom LCP, inte med en gräns per fil.** *WebP under 200 kB* står på bänken: en källa, godtycklig gräns, och konverteringen tar bort AI-metadata som ska behållas (`2-7`). 📄 $10K Website Kit; konsolideringsanalysen §4.2, M19

### Formulär

- [N1] **Första sajten klarar sig med telefon- och mejllänk som primär handling, eller en länk till kundens befintliga bokningssystem** (t.ex. Bokadirekt) när branschens kontaktväg är att boka – i övningen firmans egen bokningslänk. Att bygga en egen bokning är väg D och står på *inte nu*-listan (`2-2-omfattning.md`; `BESLUT.md` 2026-10-15). Publiceras ett formulär redan då gäller hela mönstret nedan; ett formulär som inte sparar eller saknar spamskydd publiceras inte. 🔧 (konsolideringsanalysen §7.3)
- [N2] **Mönstret:** sidan postar till en Worker-route, t.ex. `/api/kontakt`, som (1) validerar Turnstile-token på servern mot `siteverify`, (2) validerar alla fält igen med längdtak och format, (3) sparar inskicket i D1, (4) skickar mejlet och (5) markerar inskicket som skickat eller misslyckat. Turnstile måste valideras på servern: *"Tokens can be forged"*, och en token gäller 300 sekunder och en gång. Formuläret är den primära handlingen; ett tappat inskick är en tappad kund. 📄 research §3 (ordningen är researchens bedömning, servervalideringen Cloudflares krav); Websites for Normal People
- [N2] **Spara först, mejla sedan.** Går mejlet fel ligger inskicket kvar, och besökaren får aldrig beskedet "mottaget" om lagringen inte är bekräftad (fallgrop 125). 📄 Websites for Normal People; 🔧 webb-pros leveransmall
- [N2] **D1 skapas i EU-jurisdiktion:** `npx wrangler d1 create <namn> --jurisdiction=eu`. Det går inte att ändra efteråt, och en location hint är ingen garanti. KV passar inte för inskick (en skrivning per sekund och nyckel). Bilagor läggs i R2; R2:s EU-jurisdiktion är ⚠️ inte bekräftad i researchen. 📄 research §3, §9
- [N2] **Spamskydd i lager:** Turnstile (gratis), en dold fälla och en tidsfälla i formuläret, och gratisplanens enda WAF-regel för rate limiting på `/api/*` (per IP, 10 sekunder). Tidsfällan mäter en varaktighet på klientens klocka och släpper igenom när värdet saknas; webb-pro tappade riktiga förfrågningar när klientens tid jämfördes med serverns. Rate limiting-bindningen på Free är ⚠️ inte bekräftad. 📄 research §3, §6; 🔧 webb-pros `kunskap/formularsakerhet.md`
- [N2] **Byggdetaljer:** mottagaradressen kommer ur miljön, aldrig ur formulärets data (annars ett öppet spamrelä); felbesked utan diagnostik; vanlig POST som fungerar utan JavaScript; tacksidan har `noindex` (texten → `2-7`). 🔧 webb-pros `formularsakerhet.md` och byggstandard 6.3
- [N2] **Bara de uppgifter som behövs,** information och länk till integritetspolicyn vid formuläret, bestämd lagringstid och gallring efter den. Resend lagrar loggar och metadata i USA oavsett sändregion. 📄 `kunskap/research/2026-10-14_dataoverforing-och-analys.md` (nedan *dataöverföringsresearchen*) §3.3, §5.1
- [N2] **Mejl via Resend som standard,** med `fetch` från Workern. Cloudflare Email Sending är i beta och kräver Workers Paid; byt när den är allmänt tillgänglig om kunden ändå har Paid. SPF, DKIM och DMARC för domänen som skickar. Kandidat: aviseringen till kunden via Cloudflares `send_email` till en verifierad adress (webb-pros leveransmall), sannolikt gratis och utan metadata hos Resend men ⚠️ otestad. 📄 research §3; Websites for Normal People
- [N2] **Bekräftelsemejlet är mejlsäker HTML:** tabellayout, inbäddad CSS och en ren textversion, testat i Outlook, Gmail och Apple Mail före publicering. Mejlklienter stöder bara en del av CSS (fallgrop 193), och formulärtjänstens standardtext duger inte (fallgrop 183). Innehållet → `2-7`; testverktyget väljs senare ⚠️. 🎥 Jack Roberts designgeni-videon, Jack Roberts-videon 4 *(en källa – bänken)*
- [N2] **Formulärtest som inte stör kunden:** testinskick märks (dolt fält eller testadress) och filtreras bort innan de når kunden (fallgrop 42). Testet följer inskicket hela vägen: sparat, mejlet accepterat, bekräftelsemejlet framme och det designade. Schemat → `2-9-drift-och-forvaltning.md`. 🔧
- [N2] **Ingen automatisk omsändning när utfallet är okänt** – ett mejl som kanske gick fram blir då två. Varje inskick har status (*väntar, skickar, accepterad, fel*); en Cron Trigger (fem per konto på Free) får skicka om när felet är slutligt. 🔧 webb-pros leveransmall; research §3
- [N2] **Formuläret är den del av en sajt som oftast är sårbar** (fallgrop 20); därför mönstret ovan och den särskilda granskningen nedan. 🎥 Opus 5.5-videon

### Samtycke och analys

⚠️ Tolkning, inte juridisk rådgivning. Stäms av med jurist före första betalande kund (konsolideringsanalysen §5, grupp C).

- [N1] **Mallen innehåller inget som kräver samtycke,** så ingen banner behövs: självhostade typsnitt (då skickas inte heller besökarnas IP-adresser till tredje part), inga resurser från tredje part vid sidladdning (kartor som bild och länk, inbäddningar med klick för att ladda), ingen analys i webbläsaren och, när formulär kommer, formuläret till egen Worker. 📄 `kunskap/research/2026-10-15_kompetensluckor-anteckningar/lager-8-teknik-kvalitet.md` (nedan *lager-8-anteckningarna*) §4 (PTS, EDPB 2/2023)
- [N1] **Ingen chattwidget som laddas automatiskt; chatten är en länk** (till exempel `m.me/…` eller ett sms-nummer), eftersom en inbäddad chatt laddar tredje part vid sidladdning och kräver samtycke (regeln ovan). **Strukturerad data:** en `LocalBusiness` per mottagning med den mest specifika typen, adress, telefon, läge och öppettider, men **inget eget betyg**. Google rekommenderar `aggregateRating` bara för sajter som samlar omdömen om andra företag (📄 [Google Search Central, LocalBusiness](https://developers.google.com/search/docs/appearance/structured-data/local-business)). (`BESLUT.md` 2026-10-15, *Ställningstaganden och Kundens lyft*)
- [N2] **Analys: Cloudflares edge-analys,** som bygger på serverloggar och inte kör kod hos besökaren. **Konverteringar räknas i D1** – inskicken, utan kakor. Telefonklick syns inte utan skript i webbläsaren (🔧 härlett). 📄 dataöverföringsresearchen §4.3, §5.1; research §5
- [N2] **Integritetspolicy så fort ett formulär behandlar personuppgifter** (GDPR art. 13; IMY), med innehållet i dataöverföringsresearchen §5.2: ansvarig (kunden), ändamål och rättslig grund, mottagare (Cloudflare, Resend, byrån som biträde), överföring till USA och grunden, lagringstid, rättigheter och kakor – även Cloudflares nödvändiga. Om Turnstile sätter kakor är ⚠️ inte bekräftat. Om policyn behövs också utan formulär är *öppet – se `guide/bilaga-e-oppna-fragor.md`* (Cloudflares serverloggar innehåller IP-adresser). Texten → `2-7`; biträdesavtalet → `2-2`. 📄 dataöverföringsresearchen §5.2; research §5, §9
- [N3] **Cloudflare Web Analytics bara bakom samtycke.** Den sätter inga kakor, men EDPB 2/2023 räknar JavaScript som får webbläsaren att skicka data som åtkomst, och PTS räknar statistik som icke nödvändigt. Datan går inte att begränsa till EU. 📄 dataöverföringsresearchen §3.1, §4.3
- [N3] **GA4 bara som tillval bakom samtycke** (LEK 9 kap. 28 §; Googles samtyckespolicy): Consent Mode v2, Googles biträdesvillkor accepterade, Google-signaler avstängda, samtycket sparat. Kunden får veta att GA4 beror mest på DPF. Statistik före samtycke strider mot reglerna om kakor (fallgrop 123). 📄 dataöverföringsresearchen §2.3, §5.1
- [N3] **Banner när något kräver samtycke:** orestbida/cookieconsent v3 (MIT) med `mode: 'opt-in'`, `equalWeightButtons: true`, "Neka" i första lagret, `revision` vid ändrad policy och skript blockerade med `data-category`. Det motsvarar PTS krav: lika lätt att neka som att godkänna, i samma vy, lika lätt att återkalla. 📄 lager-8-anteckningarna §4

Lagkrav per kund (tillgänglighetslagen, DOS-lagen, AI-förordningen) → `2-2-omfattning.md`.

### Publicering

**N1 om sajten publiceras – `bilaga-e-oppna-fragor.md`, fråga 1.3.** Steget är `5-byggplan.md`, steg 5. Claudes förslag i frågan är förhandsadressen först; kundens domän och det som hör till den är N2. Publiceras den första sajten inte, gäller N1-punkterna nedan från den första sajt som publiceras.

- [N1] **Publiceringen kräver alltid Johnnys godkännande och går Git → GitHub → Workers Builds** (om sajten publiceras). Agenten publicerar och pushar sajten först efter Johnnys godkännande. Det är en instruktion, inte en spärr (→ `3-3`). Privat repo via GitHub CLI; Workern kopplas till repot i dashboarden (Settings → Builds; GitHub-appen auktoriseras av människan). Huvudgrenen går till produktion, andra grenar och PR:er till egna förhandsadresser. Beslut 2026-10-13 (*"går till klart med allt vad det innebär"*) och 2026-10-14; 📄 research §1
- [N1] **Förhandsadressen är staging och skyddas med Cloudflare Access** (om sajten publiceras). Förhandsadresser är publika som standard (fallgrop 58, 185), och `noindex` ersätter inte skyddet. Johnny ser sajten där före produktion; utan staging hoppar publiceringen över hans blick (fallgrop 126). Access är gratis för upp till 50 användare enligt ett äldre blogginlägg ⚠️. 📄 research §1, §6; Websites for Normal People
- [N1] **Statiska sidor får grundhuvudena ur `public/_headers`** (om sajten publiceras): `X-Content-Type-Options: nosniff`, `Referrer-Policy`, `Permissions-Policy` och `Content-Security-Policy: frame-ancestors 'none'`, med Cloudflares exempel som utgångspunkt. `frame-ancestors` fungerar inte i en meta-tagg och måste skickas som HTTP-huvud. 📄 Cloudflare (Headers för Workers static assets) och MDN, via lager-8-anteckningarna §1e
- [N2] **Svar som Workern skapar (formulärets `/api/*`) får huvudena i Worker-koden,** eftersom `_headers` *"are not applied to responses generated by your Worker code"*. 📄 Cloudflare via lager-8-anteckningarna §1e
- [N2] **CSP med hashar ur Astros `security.csp`:** meta-tagg med hashar, ingen `'unsafe-inline'` för skript, ingen `<ClientRouter />`. Om HSTS ska sättas i `_headers` eller i Cloudflares SSL/TLS-inställning är ⚠️ inte utrett. 📄 Astro via lager-8-anteckningarna §1e
- [N2] **Staging har egna databasresurser.** Om förhandsadresser skriver till produktionens D1 är ⚠️ inte bekräftat, så formuläret testas mot en separat staging-Worker med egen eller ingen D1 och utan riktig mejlbindning (fallgrop 191). 📄 research §1 (egen bedömning); webb-pros `wrangler.jsonc`, miljön `forhandsvisning`
- [N2] **Egen domän:** zonen ska vara aktiv i samma Cloudflare-konto som Workern; certifikaten sköts automatiskt. **.se kan inte köpas hos Cloudflare Registrar:** domänen registreras hos en svensk registrator och namnservrarna pekas till Cloudflare (full setup, fungerar på Free; fallgrop 186). Köp och konton → `2-2`. 📄 research §2
- [N2] **`workers_dev = false` står i produktionens konfiguration;** stängs adressen bara av i dashboarden kommer den tillbaka vid nästa deploy. 📄 research §2
- [N2] **`wrangler`:** `deploy`, `versions upload` och `versions deploy`, `rollback`, `tail --format json` (loggar som Claude kan läsa; de sparas inte) och `secret put` (hemligheter → `3-3`). `wrangler login` körs av människan. Byggloggar läses i dashboarden eller i GitHubs check runs; ⚠️ inget CLI-kommando bekräftat. 📄 research §1
- [N2] **Search Console:** egendomen verifieras med DNS och sitemapen skickas in när sajten ligger på kundens domän; inskicket kräver fullständig behörighet och görs av Johnny. Kopplingen i förvaltningen → `2-9`. 🔧
- [N2] **Vid ombyggnad svarar varje gammal URL eller omdirigeras med 301;** ingen ger 404 utom de som medvetet tagits bort. Kontrollen körs igen mot den publicerade adressen. En snyggare sajt som tappar sina adresser tappar sina placeringar (fallgrop 102). URL-inventeringen → `2-2`. 🎥 4 Ways-videon / 🔧
- [N2] **Rollback återställer koden, inte data.** `wrangler rollback` når de 100 senaste versionerna men inte bindningar eller data i D1, KV och R2, och blockeras om en sådan resurs ändrats mellan versionerna. Databasändringar görs som migreringar med egen återställningsplan och säkerhetskopia. 📄 research §6
- [N2] **Cloudflares officiella plugin** (`/plugin marketplace add cloudflare/skills`, sedan `/plugin install cloudflare@cloudflare`) och API-MCP:n (`https://mcp.cloudflare.com/mcp`) prövas enligt `bilaga-a-verktyg.md`, med en begränsad token per kundkonto i stället för bred OAuth. 📄 research §7
- [N4] **Inga arbetsverktyg i produktion:** används Variate eller ett annat utvecklingsverktyg söker en kontroll efter dess markering i produktionsbygget, och träff stoppar publiceringen (fallgrop 45). Kontrollen bor här; verktyget → `3-5-live-visning.md`. 📄 `kunskap/research/2026-10-14_stitch-och-verktyg.md`

Röktestet – N1-kontrollerna mot den publicerade adressen – står vid kontrolltabellen nedan. Baslinjen för visuell regression → `2-9-drift-och-forvaltning.md`. Avstämningen mellan briefens löften och den färdiga sajten (fallgrop 78) → `3-2-granskning-och-kalibrering.md`.

### Säkerhetsgranskning

- [N2] **Claude Codes inbyggda `/security-review` före varje publicering med ändrad kod.** Nivån är N2, som i `3-3` och `bilaga-a-verktyg.md`: på första sajten finns inget formulär och Johnny ser allt. Den granskar skillnaden mellan grenen och `origin`:s huvudgren och kräver en `origin`-remote, så bygget görs på en gren. Ingen installation och ingen tredje part. Fynd som är `kritisk` eller `hög` rättas före publicering. Granskningen körs med den starkaste modellen, eftersom ett missat säkerhetsfel kostar mest (fallgrop 89; → `3-3`). 📄 `kunskap/research/2026-10-14_claude-code-verifiering.md` (9h)
- [N2] **Formuläret granskas särskilt:** fast mottagare, servervalidering, tidsfällans klocka och vad besökaren ser i varje felväg; frågorna finns i webb-pros `formularsakerhet.md`. Granskningen → `3-2`.
- [N3] Månatlig granskning av den publicerade sajten och beroendena → `2-9`.

Kandidater, jämförs i eval när det finns sajter att mäta på (`bilaga-a-verktyg.md`):

- [N3] Claude Security (Anthropic). 🎥 Nate Herk 100-repon-videon ⚠️
- [N3] cloudflare/security-audit-skill (MIT), som kräver en sandlåda utan nätverk när målets kod körs (fallgrop 192; → `3-3`). 🎥 Jack Roberts repo-video / 📄 README
- [N3] Mantis (Google). 🎥 Hermes-videon ⚠️
- [N4] Claude Code Security Review som GitHub Action på varje PR. 🎥 Fable 5-videon ⚠️
- [N4] CodeRabbit (betalt). 🎥 Opus 5.5-videon

### Väg B–D: inloggning, databas, bokning

- [N3] **Supabase bara för slutanvändarinloggning eller redigeringsvy;** typ A klarar sig med D1. Supabase i EU-region (Stockholm `eu-north-1` eller Frankfurt) med egen överföringsbedömning (TIA), eftersom Supabase inte finns på DPF-listan (fallgrop 187). 📄 dataöverföringsresearchen §3.4, §5.1; konsolideringsanalysen M1
- [N3] **Säkerhetsgrunder:** RLS påslagen, hemligheter i miljön (`3-3`), Turnstile vid registrering, WAF-regeln och säkerhetsheaders i både `_headers` och Worker-svar. 🎥 Ebbelaar-intervjun; 📄 research §10, §11
- [N3] **Kontroll: databasen utan varningar.** Supabase Security Advisor och Performance Advisor via MCP-verktyget `get_advisors` (typ `security` respektive `performance`) eller `supabase db advisors`. Säkerhetsvarning = `kritisk`, prestandavarning = `medel`. 📄 [Supabase: Advisors](https://supabase.com/docs/guides/observability/advisors)
- [N3] **Kontroll: e-postbekräftelse vid registrering påslagen i produktion.** Den stängs gärna av för att det är bekvämt under test (fallgrop 184); avstängd i produktion = `kritisk`. 🎥 Jack Roberts-videon 4; 📄 Supabase-dokumentationen
- [N3] **Bokning:** Durable Objects hindrar dubbelbokning av samma tid. 📄 research §10 (egen bedömning). Kantfallen → `bilaga-c-kontroller.md`.

## Vad som kommer ut

- [N1] **Astro-sajten med standardsidorna** (→ `2-3-struktur.md`; 404-sidans utformning → `2-3`, `2-4-skelett.md` – en standard-404 från ramverket är fallgrop 178), `sitemap.xml` och `robots.txt`; **kontrollskriptet** med de tio N1-kontrollerna och resultatet som belägg (`3-1`); om sajten publiceras repot med `wrangler.jsonc` och `public/_headers` och förhandsadressen bakom Access. Integritetspolicy och tacksida bara med formulär.
- [N2] Formulär-Workern och D1-migreringarna; integritetspolicyn och tacksidan när sajten har formulär; rapporten från säkerhetsgranskningen; den publicerade sajten på kundens domän.

## Kompetens och källor

**Förankring:** web.dev om Core Web Vitals (Walton; McQuade och Pollard), W3C WAI med WCAG 2.2 och WCAG-EM 2.0, Google Search Central (titlar, strukturerad data, LocalBusiness), Cloudflares dokumentation, PTS, IMY och EDPB, samt Humble och Farley (*Continuous Delivery*) och DORA för hur kontrollerna drivs. 📄 lager-8-anteckningarna; `historik/karta/8-teknik-kvalitet.md`

- [N2] **Egen skill:** en kvalitetsskill med kontrolltabellerna nedan, destillerad ur better-accessibility, better-interface, modern-web-guidance och emil-break-ui (`inventering/`). 📄 kartan

**Verktyg.** N1-verktygen (Playwright, @axe-core/playwright, Lighthouse) står vid kontrolltabellen nedan.

- [N2] **Lighthouse CI 0.15.1 pinnad** mot `dist/` med resultat lokalt (`upload.target: filesystem`, aldrig den publika `temporary-public-storage`).
- [N2] **Chrome DevTools MCP** med `--no-performance-crux` för diagnos.
- [N2] lychee, schema-dts och adobe/structured-data-validator, MDN HTTP Observatory (skicka aldrig Access-hemligheter med `--headers`).
- [N3] orestbida/cookieconsent v3.

Prövas senare: IBM Equal Access, Unlighthouse, csp-evaluator, WCAG-EM Report Tool. Bedömningarna står i lager-8-anteckningarna; status i `bilaga-a-verktyg.md`.

**Ur webb-pro, aldrig kört i produktion** (📄 webb-pro-genomgången §3):

- [N2] **Leveransmallen för Cloudflare Workers** (`mall/leverans/`) är utgångspunkt för formulär-Workern: spara före avisering, status per avisering, inskicks-id mot dubbletter, kontroll att begäran kommer från sajten, fällor, huvuden och CSP på Workerns svar, förhandsvisnings-Worker utan databas och mejl. Formulärkomponenten `mall/astro/src/components/Forfragan.astro` hör hit (POST utan JavaScript, fällor, felbesked vid fälten). Skala av Brevo och Pipedrive; lägg till Turnstile och bekräftelsen till besökaren. Prövad bara lokalt och med ett fjärrprov av förhandsvisningens skydd – provas mot ett testkonto före första riktiga formulär.
- [N2] **Astro-mallen** (`mall/astro/`): ta `astro.config.mjs` (statiskt, `security.csp` med hashar), 404, `sitemap.xml.ts`, `robots.txt.ts` och tacksidan (bara med formulär). Ta **inte** `package.json` som den är; den låser three, @react-three/fiber, ogl, gsap, motion och radix.
- [N2] `kunskap/byggstandard.md` är underlaget för kodstandarden ovan; `kunskap/formularsakerhet.md` ger kodläsningsfrågorna för formulärkoden.

## Kontroll

Registret över alla kontroller: `bilaga-c-kontroller.md`. **De tio N1-kontrollerna definieras bara här;** `bilaga-c-kontroller.md` och lagerfilerna hänvisar hit.

### N1 – kontrollerna för första sajten

Tio kontroller, och bara sådana som mäter något kunden märker (konsolideringsanalysen §7.4). Kontrollskriptet byggs i `5-byggplan.md`, steg 3, med Playwright och @axe-core/playwright med WCAG 2.2-taggarna påslagna (de är avstängda som standard). Nr 9 körs med Lighthouse, och nr 5 är en läsning av texterna mot `fakta.md`, inget skript. Skriptet körs mot det lokala bygget före Johnnys dom och, om sajten publiceras, igen mot den publicerade adressen som röktest (förhandsadressen bakom Access nås med en service token, 📄 Cloudflare via lager-8-anteckningarna §1e). Kontrollerna avgör inte om ett steg är klart; det gör Johnnys dom (`guide/README.md`, princip 1).

*Stopp* betyder att Johnny inte godkänner publiceringen förrän kontrollen går igenom, och kräver en norm eller två oberoende primärkällor (`guide/README.md`, *Grind eller instruktion*). *Rapport* betyder att resultatet visas för Johnny och rättas eller motiveras.

**Visningsbredder:** 320 px bara för reflow (nr 3); sajten prövas och visas i 375, 768 och 1280 px; 1920 px från N2.

| # | Kontroll | Vid träff | Grund |
|---|---|---|---|
| 1 | `astro build` går igenom utan fel | Stopp | Förutsättning för allt annat: utan bygge finns inget att visa 🔧 |
| 2 | Inga konsolfel; alla bilder laddas | Rapport | Egen kodstandard 🔧 (v0.74 §10.3). Felen syns för besökaren, men ingen norm kräver det |
| 3 | Ingen horisontell scroll i 320 CSS-px bredd | Stopp | 📄 WCAG 2.2, 1.4.10 Reflow. Sajter går sönder i mobil när bara datorn granskas (fallgrop 3, 19) |
| 4 | Den primära handlingen fungerar hela vägen: telefon- eller mejllänken har numret eller adressen ur `fakta.md`, eller bokningslänken svarar och leder till kundens bokning; publiceras ett formulär sparar det och mejlar (*Formulär* ovan); **rapport:** branschens kontaktväg och en klickbar `tel:`-länk syns på mobilens första skärm i 375 px utan scroll | Stopp (synligheten: rapport) | Två källor för körbara kontroller (analysen §4.3; 🎥 Loop-videon); att pröva den primära handlingen hela vägen är egen tillämpning 🔧. Kontroller kan gå igenom fast funktionen inte är inkopplad (fallgrop 16). Synligheten: Johnnys måttstock, fråga 1 – ingen norm (`mattstock/mattstock.md`; `BESLUT.md` 2026-10-15) |
| 5 | Varje faktapåstående finns i `fakta.md`; vad som räknas → `2-7-innehall.md`, *Faktabasen* | Stopp, `kritisk` | Låst kontroll, tre källor (analysen §4.3) |
| 6 | Inga platshållare i produktionsbygget: platshållarmarkeringen ur `2-7` (`[[PLATSHÅLLARE: …]]`), fyllnadstext (*lorem ipsum*, *exempel*, *placeholder*) och bilder märkta som platshållare i faktabasen ger noll träffar | Stopp | En platshållare är ett obekräftat faktum, så kontrollen vilar på faktakontrollens tre källor (analysen §4.3). Publicerade platshållare: fallgrop 181, 🎥 Jack Roberts-videon 3 |
| 7 | Unik titel och metabeskrivning per sida, `sitemap.xml` finns; en `h1` per sida | Stopp för titel, beskrivning och sitemap; rapport för `h1` | 📄 Google Search Central (unika, beskrivande titlar); 📄 $10K Website Kit, Websites for Normal People (fallgrop 122). En `h1` är egen kodstandard 🔧, inget Google-krav |
| 8 | axe med WCAG 2.2 A/AA-taggarna ger 0 fel i Chromium; täcker bl.a. kontrast, alt-texter, etiketter och tomma länkar | Stopp | 📄 WCAG 2.2 |
| 9 | Lighthouse tillgänglighet, bästa praxis och SEO ≥ 90 i mobil och dator, mot det lokala bygget eller produktion – inte mot förhandsadressen, där `noindex` ger underkänt SEO (🔧 härlett, lager-8-anteckningarna); prestandan mäts | Rapport | 📄 Leverantörens dokumentation: Lighthouses skala, 90–100 = *Good* (Chrome for Developers). Tröskeln 90 är vald *(en källa – bänken: $10K Website Kit)*; analysen §4.2 |
| 10 | Inga hemligheter i repot eller i det byggda paketet (HTML, JS, källkartor söks efter nyckelformat) | Stopp, `kritisk` | Allt i webbläsaren går att inspektera (fallgrop 141) 🎥 Ebbelaar-intervjun; 📄 Cloudflare: hemligheter med `wrangler secret put`. Regeln → `3-3` |

**Skärmbilderna** som skriptet tar för Johnnys dom och granskaren är helsidesbilder i mobil och dator. Tre lärdomar från måttstockens fångst (`mattstock/verktyg/fanga.js`, beslut 2026-10-15): en hård tidsgräns per sida, så att en sida som hänger inte stoppar resten; sidor som scrollar i en inre behållare lossas, annars syns bara en skärmhöjd; och sidan scrollas igenom före bilden, så att lat laddade bilder kommer med. 🔧

Därtill Johnnys slutgranskning med en kort motivering per avvisning (`3-2`).

### N2 – när sajterna blir fler

| Kontroll | Hur | Stopp | Grund |
|---|---|---|---|
| Prestanda i labb | Lighthouse CI mot `dist/`, mobil, 3–5 körningar, median | LCP ≤ 2 500 ms, CLS ≤ 0,1, TBT ≤ 200 ms (labbens ersättare för INP) | 📄 web.dev, Core Web Vitals |
| Interna länkar | lychee `--offline --include-fragments` | 0 trasiga | v0.74 fas 6c; lychees exitkod |
| Utan JavaScript | Playwright med JavaScript avstängt | Rapport, stoppar inte: sidornas innehåll och navigering syns och fungerar | 📄 GOV.UK, progressive enhancement *(en källa – bänken)*; regeln → `2-4-skelett.md` |
| SEO utöver N1 | Egna DOM-kontroller | `lang="sv"`; kanonisk https-adress till sig själv; Open Graph och delningsbild; `robots.txt` som inte blockerar CSS eller JS; sitemap med bara publika sidor; ingen `noindex` i produktion | 📄 Google Search Central; $10K Website Kit, Websites for Normal People |
| Strukturerad data | schema-dts i bygget, validatorn på byggd HTML | 0 fel; `name` och `address` finns; namn, adress, telefon och öppettider stämmer med faktabasen och syns i texten | 📄 Google: LocalBusiness och riktlinjerna för strukturerad data |
| Huvuden | Playwright mot förhandsadressen med Access service token; MDN Observatory mot produktion | Huvudena i *Publicering* finns, också CSP och Worker-svarens; betyg minst A (90) | 📄 Cloudflare, MDN |
| Tillgänglighet | axe i Chromium **och** WebKit, också med menyn öppen och formulärfelen framkallade | 0 fel | 📄 WCAG 2.2 |
| Integritet | Playwright vid första laddningen | Inga kakor, ingen lagring och inga anrop utanför tillåtelselistan före samtycke; en banner har neka och godkänn i samma lager och stil, och efter neka händer inget; länk till integritetspolicyn i sidfoten och vid varje formulär | 📄 LEK 9 kap. 28 §, PTS |
| Formulär | Märkt testinskick mot staging | Sparat, mejlet accepterat, bekräftelsemejlet framme | 🔧 |
| Manuell tillgänglighet vid lansering | Tangentbord, fokus, formulärfel, zoom | Inga hinder | 📄 GDS: axe hittade 29 % och bästa verktyg 40 % av avsiktliga barriärer |

- [N2] Teckengränser för titel och beskrivning är bara varningar; Google anger ingen gräns. 📄 Google: Influencing title links
- [N2] Rich Results Test görs för hand vid lansering och när schemat ändras. 📄 Google

### N3–N4

- [N3] **WCAG-EM 2.0 vid lansering och sedan årligen:** strukturerat urval (på 5–15 sidor blir det hela sajten), tangentbord, stickprov med skärmläsare, zoom till 200 och 400 %. Rapporten till kunden säger hur stor del som prövats automatiskt, med AI och för hand, eftersom "0 axe-fel" inte betyder "tillgänglig". 📄 W3C WCAG-EM 2.0; WebAIM Million
- [N3] Kontrollerna för väg B–D (ovan).
- [N3] Visuell regression och schemalagda kontroller → `2-9-drift-och-forvaltning.md`.

## Hur självgående

På första sajten tittar Johnny på allt och dömer varje steg (`5-byggplan.md`). Punkterna nedan gäller när tillsynen minskar.

- [N2] **Deterministiska kontroller** (bygge, länkar, axe, huvuden, SEO i DOM, platshållare, hemligheter) körs utan tillsyn. Agenten får ett begränsat antal rättningsförsök och lämnar sedan till Johnny; taket och stoppvillkoren → `3-1`. Grunden: *"Computers perform repetitive tasks, people solve problems"* (Humble). 📄 lager-8-anteckningarna §1
- [N2] **Omdöme går till Johnny:** visuella skillnader, WCAG-kriterier som inte går att automatisera, juridiska bedömningar och varje publicering.
- [N2] **Brusiga mätningar** (Lighthouse-prestanda) körs 3–5 gånger och medianen gäller; ett enstaka brott ger en ny körning, inte en rättning. 📄 Chrome for Developers: poängen ses som en fördelning
- [N3] **Den agent som orsakade en avvikelse får inte uppdatera baslinjen eller undantagslistan** (→ `2-9-drift-och-forvaltning.md`, visuell regression).
- [N3] **Juridiken** i lagret är tolkning tills en jurist läst den, senast före första betalande kund.
- [N4] **Säkerhetsgranskning på varje PR** när förvaltningens ändringskö körs obevakat (`2-9`).
