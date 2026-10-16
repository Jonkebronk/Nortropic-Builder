# shadcn CLI med registren @tailark och @magicui

**Källa:** allt läst 2026-10-16. Tokennamnen står i `shadcn-namnen-for-tokens.md` och mönstren ur blocken i `21st.md` och `21st-premiummonster.md`; de upprepas inte här.
- **shadcn:** https://github.com/shadcn-ui/ui, commit `af983e842ab31ed26da30ba4d9a418772150dff0` (2026-10-16). npm `shadcn` **4.22.0** (släppt 2026-10-16). Lästa: `packages/shadcn/CHANGELOG.md` (4.21.1–4.22.0), dokumentationen `cli.mdx` (`view`, `search`, `add`), `directory.mdx`, `mcp.mdx`, `registry/health.mdx`, `registry/namespace.mdx` (säkerhetsavsnittet) och `registry/github.mdx`. Grep efter telemetri i npm-paketet 4.22.0. Registrets index [`ui.shadcn.com/r/registries.json`](https://ui.shadcn.com/r/registries.json). Ärendena #9035 och #9181.
- **Tailark:** https://github.com/tailark/blocks, commit `8139698115c1341bfd2e3e286c04bb4d8146f472` (2026-07-29). Lästa: `README.md`, `components.json`, `LICENCE.md`, commitarna för namnrymden (`225b5b1`, `435e2ce`), ärende #53. Registren `tailark.com/r/registry.json` och `oss.tailark.com/r/registry.json`, en post ur vardera, och DNS för `oss-tailark.com`.
- **Magic UI:** https://github.com/magicuidesign/magicui, commit `85f97fd27b053339af74ba9dd4ca428ee25989fb` (2026-10-11). Lästa: `README.md`, `LICENSE.md`, `magicui.design/r/registry.json` och posten `marquee`.
- Verktygslistan `inventering/mcp-verktyg/shadcn.json`. Underlag: `andra-varvet/mcp-jamforelse.md`, *shadcn CLI*.
⚠️ Magic UI:s komponenter är inte lästa en och en.
- **Rättat 2026-10-16 efter översynen (`kunskap/research/2026-10-16_verktyg-och-skills-full-potential.md`):** MCP-verktygen med och utan konfiguration, `@tailark-oss` och CLI:n utan `components.json`. Underlaget är prov med MCP:n och CLI:n 4.22.0, 2026-10-16. CLI:n söker och visar utan konfiguration, vilket kortet tidigare hade som ⚠️ inte prövat.

**Licens:** shadcn, Tailark och Magic UI är MIT (Tailark © 2025 Irung, Magic UI © Magic UI). Kod som tas in ska ha licenstexten med; källa, författare, licens och commit står först i filen och i `licenser.md` (`.claude/skills/skelett/react-i-astro.md`, *Var filerna ligger*).

## Vad det är
shadcn-CLI:n hämtar komponenter och block ur register: JSON-filer med koden, beroendena och var filerna ska skrivas. Indexet har i dag **462 register** (443 i andra varvet), varav 362 friska. Det har `@magicui`, `@tailark`, `@aceternity` och `@react-bits`, men inte 21st.

## Hur det fungerar
- `view <namn eller adress>` visar en post innan den installeras; `search @register -q "…"` söker; `add --dry-run` visar ändringarna utan att skriva (`cli.mdx`). CLI:n 4.22.0 söker och visar utan konfiguration (prov 2026-10-16).
- **Registren i indexet** är inbyggda i CLI:n utan konfiguration. Dokumentationen: *"Community registries are maintained by third-party developers. Always review code on installation"* (`directory.mdx`).
- **En post kan skriva vilken fil som helst i projektet**, också `AGENTS.md`, `.claude/commands/*` och `.editorconfig`, med fältet `target` (`registry/github.mdx`). Schemat valideras, och dokumentationen lovar *"No arbitrary code execution"* (`registry/namespace.mdx`). Det gäller filerna; npm-beroendena som installeras kan ha installationsskript (härlett). Sedan 4.21.2 hoppar CLI:n över `npm audit` vid installationen (`CHANGELOG.md`).
- **Registry Health** (experimentellt): `@magicui` är *healthy* (98,9 poäng). `@tailark` är *degraded*, 77,3 poäng, med skälet *"Sampled registry items are failing validation"* – troligen för att posterna kräver inloggning (härlett).
- **MCP-servern** (`npx shadcn@latest mcp`) har sju verktyg, oförändrat i 4.22.0. `list_items_in_registries`, `search_items_in_registries` och `get_project_registries` kräver `components.json`. `get_audit_checklist` säger *"Make sure to run the tool after all required steps have been completed"*.
  - **Prov 2026-10-16:** utan konfiguration fallerar `view_items_in_registries` och `search_items_in_registries` också för register i indexet (`NOT_CONFIGURED`). `get_item_examples_from_registries` fungerar för `@shadcn`.
  - **Med `shadcn mcp -c <katalog>`** och en `components.json` som bara har `registries`, utanför repot, blir alla verktyg användbara. Registren kan också stå i `package.json`.
  - Då svarar `@tailark-oss` (9 träffar på "faq"), och `@magicui` har 250 poster. `@tailark` kräver Pro.
  - `get_add_command_for_items` och tillägget "Add command" i svaren finns, men vår regel förbjuder `add` mot tredje part (`.claude/skills/skelett/react-i-astro.md`).
- **Telemetri:** ingen träff i 4.22.0 (grep efter telemetry, posthog, analytics, sentry).

## Kvalitet och underhåll
- **shadcn-ui/ui:** 125 746 ★, 647 bidragsgivare (med anonyma), push 2026-10-16, 1 778 öppna ärenden och PR. Utgåvor nästan varje vecka; 4.22.0 byter till Zod 4 i schemat. Kända MCP-fel: [#9035](https://github.com/shadcn-ui/ui/issues/9035) (MCP:n anger alltid ett Radix-beroende, fast biblioteket valt Base UI) och [#9181](https://github.com/shadcn-ui/ui/issues/9181) (konfigurationen för Claude Code saknar `type`). 4.21.5 rättade `[object Promise]` i MCP-svaren.
- **tailark/blocks:** 2 331 ★, 8 bidragsgivare, push 2026-07-29, 14 öppna. [#53](https://github.com/tailark/blocks/issues/53): Pro-nycklar fungerar inte.
- **magicuidesign/magicui:** 22 693 ★, 158 bidragsgivare, push 2026-10-11, 4 öppna. Registret har 78 komponenter och 170 exempel; 31 poster beror på `motion`.

## Det bästa vi kan ta
1. **Rätt adress till Tailarks öppna block.** `@tailark` i indexet pekar på `tailark.com/r`, som är Tailark Pro: en post utan inloggning svarar `401` *"Sign in with a plan that includes blocks to access this resource."* De öppna MIT-blocken ligger i `@tailark-oss` på `https://oss.tailark.com/r/{name}.json` (repots `components.json`; 259 poster i Base UI, 260 i Radix). Namnrymden finns inte i indexet och måste skrivas in.
2. **`view` och `search` som läsverktyg.** Registerposten är JSON, så den kan också läsas med `curl`. Det är det skillen redan kräver.
3. **Health-poängen** som en signal före ett nytt register, inte som en dom.

## Var det hamnar hos oss
**Beslut (Johnny 2026-10-16 omkring 17.40, *"Ja på alla"*):** *verktyg: ta in (CLI:n; MCP-delen behövs inte)*. Håller med, med tre förslag till Johnny:
- **CLI:n bara för att läsa.** `.claude/skills/skelett/react-i-astro.md` (rad 41) säger *"Ingen `npx shadcn add` mot tredje part i biblioteket; registerposten läses som data"*, och researchen §11 steg 2 granskar `files`, `target`, `css`, `cssVars` och `envVars`. Det står sig: en post kan skriva agentfiler i repot.
- **Registret heter `@tailark-oss`, inte `@tailark`.** Posten i inventeringen och `21st-premiummonster.md` ska rättas (→ *Risker och flaggor*).
- **MCP:n står emot beslutet.** Den ligger i byggsessionen sedan 17.05 (`guide/bilaga-a-verktyg.md`, rad 257) men ska inte användas. Från repots rot finns ingen `components.json`, så tre av sju verktyg svarar med fel. Förslag: ta bort den, eller låt den stå oanvänd och låst. Översynen visade att `-c` mot en katalog utanför repot gör alla verktyg användbara (*Hur det fungerar*).
- Tailark och Magic UI står redan i `.claude/skills/skelett/varianter.md` (rad 46–47), `sektioner.md`, `interaktion.md` (Tailarks dragspel tas inte) och `.claude/skills/rorelse/motion.md` (rad 62).
- **Provet mot övningssajten:** läs `https://oss.tailark.com/r/mist-faqs-1.json` och en Magic UI-post (till exempel `marquee`) med `view` och med `curl`. Notera licens, beroenden (`registryDependencies`), `'use client'` och varje `target`. `mist-faqs-1` är `'use client'` med `@tailark-oss/mist-accordion` – det krockar med `<details name>` i `interaktion.md`. **Nytta:** CLI:n gör intaget enligt §11 snabbare eller säkrare än `curl`. **Annars:** `curl` räcker, och CLI:n behövs inte.

## Passar vår stack?
Ja, som läsverktyg. Blocken är React och Tailwind, tillåtna som öar (`BESLUT.md` 2026-10-16, *React, Tailwind och JavaScript tillåts*). Krockarna står i `21st-premiummonster.md`: `'use client'` och Radix i dragspel och menyer (*HTML först*), Motion och marquee (rörelsereglerna). Tailarks hero drar in demologotyper för riktiga varumärken (`core-spotify`, `core-supabase`, `core-vercel`) som `registryDependencies`; de tas bort enligt §11 steg 8.

## Risker och flaggor
- **Oregistrerad domän i Tailarks README:** README ger `https://oss-tailark.com/r/{name}`. Domänen finns inte (NXDOMAIN, whois *"No match"*, 2026-10-16). Den som registrerar den kan leverera filer till alla som följer README. Använd `oss.tailark.com`.
- **`@tailark` är betalt** (Pro). En Tailark-nyckel behövs inte och ska inte skaffas för de öppna blocken.
- **Agentfiler via `target`:** en post kan skriva `AGENTS.md` eller `.claude/commands/*` i repot. Kör aldrig `add` mot tredje part.
- **Beroenden utan `npm audit`** (4.21.2): nya paket granskas med Socket (`socket-mcp.md`) och `npm view <paket> scripts`.
- `get_audit_checklist` kan tävla med kvalitetsskillen om samma begäran.

## Inloggning
Inget. CLI:n, MCP:n och registren `@tailark-oss` och `@magicui` är öppna. `@tailark` (Pro) kräver ett Tailark-konto och `TAILARK_API_KEY`, men behövs inte. I dag ligger shadcn-MCP:n i lokal scope som `stdio`: `npx -y shadcn@latest mcp`.
