# Ändringar och uppdateringar

Ändringstyperna, standardkatalogen, ändringsmetoden, kön, regeln om en ändring per gren, den visuella regressionen och förhöret står i `guide/2-9-drift-och-forvaltning.md`, *Ändringar*. Ärendeagentens klasser står i `guide/4-foretaget.md`. Här står ändringsagentens principer, innehållsgrinden, det automatiska intaget och uppdateringspolicyn.

## Ändringsagentens principer

Destillerat ur Frappe Builders agent *Bob* och dess skill för kodagenter (📄 [frappe/builder, README](https://github.com/frappe/builder) och `skills/frappe-builder/SKILL.md`, MIT, lästa 2026-10-16). Där agenten *"grounds itself in your site instead of guessing"*. Frappe-stacken tas inte in, bara principerna.

1. **Läs det som finns först.** Öppna sidan och sektionerna som berörs, och följ kitets roller och sajtens sektioner (→ `guide/2-4-skelett.md`, `guide/2-5-yta.md`). En ny sektion byggs bara när samma mönster återkommer och ingen befintlig passar.
2. **Placera det nya i den struktur som finns.** En ny sida får en plats i sidkartan, menyn och sitemapen (→ `guide/2-3-struktur.md`).
3. **Fakta kommer ur faktabasen.** Det som saknas blir en fråga till kunden, aldrig en gissning (→ `guide/2-7-innehall.md`). Frappe-agenten söker fakta på nätet. Hos oss blir research aldrig ett faktum om kunden.
4. **Känsliga ändringar väntar på godkännande** (→ `guide/2-9-drift-och-forvaltning.md`, normal och hög risk).
5. **Varje ändring går att ångra.** Frappe sparar en ögonblicksbild före agentens första ändring. Hos oss gör grenen, PR:en och Workers versioner samma sak (→ `aterstallning.md`).
6. **Säg vad som är live och vad som är utkast.** En ändring är klar när kontrollerna gått igenom, förhandsversionen visar den och Johnny vet vad som är publicerat och vad som väntar.
7. **Fel du inte orsakat rapporteras, de rättas inte i samma ändring.** Frappe-skillen säger samma sak om lintfel i block man inte rört. Det håller diffen liten (→ fallgrop 81).

## Innehållsgrinden

En standardändring får bara skriva i innehållsfilerna, och bygget stoppar ogiltigt innehåll (→ `guide/2-9-drift-och-forvaltning.md`). Det fungerar bara om innehållet är byggt för det:

- **Ett faktum, en post.** Varje mottagning har namn, adress, dagar och tider (`öppnar` och `stänger` som `HH:MM`), telefon och pris en gång. Den löpande texten, sidfoten, faktakorten, *Det praktiska*, metabeskrivningen och den strukturerade datan (`openingHoursSpecification`, `telephone`, `priceRange`) härleds ur posten. En text som upprepar en tid för hand blir en mall som läser posten. 🔧 (fallgrop 93)
- **Astro content collections med schema.** Posterna kan ligga i en JSON- eller YAML-fil som laddas med `file()`. Den ska innehålla en lista med objekt som har unika `id`. Ett Zod-schema i `src/content.config.ts` beskriver formen. Astro säger att ett brott mot schemat ger ett tydligt fel. Om bygget då stoppas säger sidan inte uttryckligen ⚠️, så det prövas med en felaktig post innan grinden räknas som låst. 📄 [Astro, Content collections](https://docs.astro.build/en/guides/content-collections/) (dokumentationen MIT)
- **Avvikande öppettider är data.** Helger, semester och tillfällig stängning är poster med datum. Raden om dagens öppettider, *Det praktiska* och den strukturerade datan läser dem. Schema.org har `specialOpeningHoursSpecification` för detta 📄 [schema.org](https://schema.org/specialOpeningHoursSpecification). Samma ändring görs i Google-profilen (→ `overvakning.md`, *Kalendern*).
- **Grinden prövas.** En medvetet felaktig post, som en tid i fel format, ska stoppa bygget och ge ett begripligt fel. 🔧

## Det automatiska intaget [N4]

Flödet mejl eller SMS → GitHub-ärende → `claude-code-action` → PR → förhandsversion bakom Access → Johnny står i `guide/2-9-drift-och-forvaltning.md`. Säkerhetskraven ur källorna:

- **Bara användare med skrivrätt startar aktionen.** Botar startar den bara om de står i `allowed_bots`, och bot-namn kontrolleras inte mot repots behörigheter. Lista därför botarna med namn och aldrig `'*'`. `allowed_non_write_users` är märkt *RISKY* och används inte. 📄 [claude-code-action, docs/security.md](https://github.com/anthropics/claude-code-action/blob/main/docs/security.md) (MIT)
- **Ärendetexten är otrustad.** Aktionen rensar HTML-kommentarer, osynliga tecken och dolda attribut men varnar själv för att *"new bypass techniques may emerge"*. Spärrarna är därför avsändarkontrollen, verktygsbegränsningen och Johnnys grind (→ `guide/2-9-drift-och-forvaltning.md`). 📄 samma
- **Aktionen kan inte godkänna eller slå ihop en PR.** I standardläget skapar den en gren och en länk till PR:en, och en människa öppnar den. 📄 [docs/capabilities-and-limitations.md](https://github.com/anthropics/claude-code-action/blob/main/docs/capabilities-and-limitations.md)
- **Händelser från standard-`GITHUB_TOKEN` startar inga nya flöden,** utom `workflow_dispatch` och `repository_dispatch`. Kontrollerna på agentens PR kräver därför en token från en GitHub App. 📄 [GitHub Docs, *Triggering a workflow*](https://docs.github.com/en/actions/how-tos/write-workflows/choose-when-workflows-run/trigger-a-workflow)
- **Verktygen begränsas** med `claude_args`, till exempel `--allowedTools` och `--max-turns`. Att begränsa skrivningar till `src/content/` med en sökvägsregel ⚠️ är inte prövat. Det är en spärr i verktyget, inte i prompten (→ `guide/3-1-orkestrering-och-roller.md`). 📄 [docs/usage.md](https://github.com/anthropics/claude-code-action/blob/main/docs/usage.md)
- **Inte `show_full_output`.** Med den skrivs verktygens utdata till Actions-loggen, där hemligheter kan synas. 📄 docs/security.md
- **Kända problem i oktober 2026:** 477 öppna ärenden. De mest kommenterade gäller krascher i SDK:t före första API-anropet, att botkommentarer inte startar aktionen och fel i återanvända flöden. 📄 [issues](https://github.com/anthropics/claude-code-action/issues)

**Intagets vägar:**

| Väg | Det viktiga | Källa |
|---|---|---|
| Email Routing och Email Worker | Gratis på alla planer; `email()` i en Worker. Email Routing kräver Cloudflares egna MX-poster och kan inte användas bredvid en annan e-postleverantör på samma domän, så intaget behöver en egen adress (→ `publicering.md`). | 📄 [Email Workers](https://developers.cloudflare.com/email-routing/email-workers/); 📄 [Cloudflare Email Service, *Domain configuration*](https://developers.cloudflare.com/email-service/configuration/domains/) (*MX conflicts*, läst 2026-10-16) |
| SMS via 46elks | `sms_url` på numret ger en `POST` med `id`, `from`, `to`, `message`, `direction` och `created`. Svaret måste vara 200–204, annars försöker 46elks igen i minst 6 timmar och minst 5 gånger. Mottagaren använder `id` så att samma SMS inte blir två ärenden. Sidan beskriver ingen signatur ⚠️. | 📄 [46elks, Receive SMS](https://46elks.com/docs/receive-sms) |

Avsändaren kontrolleras mot kundens registrerade kontakter, och en okänd avsändare går till Johnny utan ärende (→ `guide/4-foretaget.md`).

**Självservice med Pages CMS [N4].** Kunden bjuds in med e-post utan GitHub-konto och kan redigera innehåll och media, men inte `.pages.yml` eller andra medarbetare. Skrivningarna görs med GitHub-appens token. Utan `commit.identity: user` syns det inte i historiken vem som ändrat. Medarbetarna ligger i Pages CMS databas och inte i repot. Den hostade appen ger en tredje part skrivrätt i kundens repo. 📄 [Pages CMS, Collaborators](https://pagescms.org/docs/configuration/collaborators/) (MIT)

## Uppdateringspolicyn

Regeln står i `guide/2-9-drift-och-forvaltning.md`: Renovate med delat preset, grupperade uppdateringar utom major, sju dagars karenstid som säkerhetsuppdateringar går förbi och samma karenstid i pakethanteraren. Detaljerna ur källorna:

- `config:best-practices` innehåller `security:minimumReleaseAgeNpm`, som väntar **tre** dagar. Byråns preset sätter `minimumReleaseAge` till `"7 days"` ovanpå. 📄 [Renovate, config presets](https://docs.renovatebot.com/presets-config/)
- Säkerhetsuppdateringar går förbi karenstiden. `internalChecksFilter` ska vara `strict` (standard). I äldre Renovate-versioner krävs `minimumReleaseAgeBehaviour: "timestamp-required"`, så att en version utan tidsstämpel inte släpps igenom. Från version 42 är det standard. 📄 [Renovate, Minimum release age](https://docs.renovatebot.com/key-concepts/minimum-release-age/)
- Renovate läser `min-release-age` i `.npmrc` och använder det strängaste datumet. Sätt `min-release-age=7` i sajtens `.npmrc`. Värdet räknas i dagar. 📄 samma; 📄 [npm config](https://docs.npmjs.com/cli/v11/using-npm/config). Inställningen kom i npm 11.10.0 ⚠️ (sekundärkällor), och äldre npm bryr sig inte om den.
- Bygget installerar ur låsfilen, så karenstiden verkar där låsfilen ändras: hos Renovate och när en agent kör `npm install`. 🔧
- Ingen automatisk sammanslagning tills vidare (`guide/bilaga-e-oppna-fragor.md`, fråga 2.8). Major-uppdateringar är normala ändringar (→ `guide/2-9-drift-och-forvaltning.md`).
- **Delat tema [N4]:** när biblioteket blir ett paket som många sajter använder ger Changesets versioner och ändringslogg. Version 3 utvecklas på huvudgrenen, och version 2 underhålls på en egen gren. 📄 [changesets/changesets](https://github.com/changesets/changesets) (MIT)
