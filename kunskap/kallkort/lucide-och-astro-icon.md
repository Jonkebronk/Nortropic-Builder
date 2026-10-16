# Lucide och astro-icon

**Källa:** Läst 2026-10-16.
- **Lucide:** [lucide-icons/lucide](https://github.com/lucide-icons/lucide), commit `7b0196e249ca` (2026-10-15), release 1.58.0 (2026-10-16). Lästa filer:
  - **Omläst 2026-10-16 (tredje varvet):** två commits efter `7b0196e249ca` till `1ef60af944de`: en sökruta i dokumentationen och en ändrad ikon, `chess-queen`, som biblioteket inte använder (GitHubs jämförelse; sökning i `bibliotek/`).
  - `LICENSE`
  - `docs/contribute/icons/design-principles.md` och `docs/contribute/icons/specification.md`, publicerade på [lucide.dev/contribute/icons/design-principles](https://lucide.dev/contribute/icons/design-principles) och [/specification](https://lucide.dev/contribute/icons/specification). Den gamla adressen lucide.dev/guide/design/icon-design-guide ger 404.
  - `docs/guide/astro/getting-started.md` och `docs/guide/astro/advanced/accessibility.md`
  - `docs/guide/version-1.md`
  - `docs/guide/static/svg-sprite.md`
- **lucide-static 1.57.0 i biblioteket:** `bibliotek/node_modules/lucide-static/icons/*.svg`, `tags.json`, `bibliotek/src/komponenter/Ikon.astro` och de två egna ikonerna. Jag kontrollerade också det byggda resultatet i `bibliotek/dist/prov/*/index.html`.
- **npm-registret:** `lucide-static` 1.58.0, `@lucide/astro` 1.58.0, `@iconify-json/lucide` 1.2.145 och `astro-icon` 1.2.0.
- **astro-icon:** [natemoo-re/astro-icon](https://github.com/natemoo-re/astro-icon), commit `62c55f512bd6` (2026-08-18), release astro-icon@1.2.0. Lästa filer: `LICENSE`, `packages/core/CHANGELOG.md`, `packages/www/src/content/docs/guides/components.mdx` och `reference/configuration.mdx`.
- **Iconify:** [iconify/icon-sets](https://github.com/iconify/icon-sets) `collections.json`, commit `69ca5094ddd4` (2026-10-16). Hela filen lästes: 243 ikonset.

**Licens:**
- **Lucide: ISC**, © 2026 Lucide Icons and Contributors. **115 ikoner är härledda ur Feather** och står under MIT, © 2013-present Cole Bemis. Fyra av bibliotekets ikoner hör dit: `clock`, `arrow-right`, `x` och `chevron-down`.
  - Båda licenserna kräver att copyright- och licenstexten följer med *”in all copies”*.
  - Varje fil i `lucide-static` börjar med `<!-- @license lucide-static v1.57.0 - ISC -->`. Kommentaren följer med `?raw`-importen ända ut i HTML: provsidan för Lugn har 22 sådana.
  - Kommentaren pekar på licensen men är inte licenstexten. Tolkning, inte juridisk rådgivning: sajtens licenssida bör ha Lucides `LICENSE`, inklusive Feathers MIT-text.
- **astro-icon: MIT**, © 2021 Nate Moore. GitHub visar ”NOASSERTION”, men filen är MIT. Det är ett byggverktyg; bara SVG följer med till sajten.
- **Iconify: licensen gäller per set**, inte per ikon. Fördelning i `collections.json`:

| Licens | Antal set | Exempel |
|---|---|---|
| MIT | 112 | tabler, ph, heroicons, iconoir |
| Apache-2.0 | 31 | mdi, material-symbols |
| ISC | 4 | lucide, lucide-lab, lucide-extended, file-icons |
| CC0-1.0 | 10 | simple-icons, logos |
| OFL-1.1 | 13 | fa (v4), mdi-light, wi |
| **CC BY 4.0 / 3.0** (kräver erkännande) | 52 + 1 | solar, hela streamline-familjen, fa6/fa7 inklusive brands, iconamoon, twemoji, game-icons |
| **CC BY-SA 4.0 / 3.0** (kräver erkännande och samma licens) | 7 + 2 | openmoji, entypo, typcn, brandico |
| **CC BY-NC** (ej kommersiellt) | 2 | cbi, ps |
| **GPL** | 6 | gridicons (GPL-2.0-only), dashicons och wordpress (GPL-2.0-or-later), et och icomoon-free (GPL-3.0-or-later), gala (GPL-3.0) |
| MPL-2.0 | 1 | circum |
| BSD-3-Clause, Unlicense | 1 + 1 | rivet-icons, system-uicons |

**Vad det är:**
- **Lucide** är ett konturikonset med omkring 1 890 ikoner: `tags.json` i 1.57.0 har 1 890 och Iconify räknar 1 891. Det finns flera paket. `lucide-static` innehåller råa SVG-filer, och `@lucide/astro` gör en Astro-komponent av varje ikon.
- **astro-icon** är en Astro-integration. Den lägger in SVG från en lokal mapp eller ur vilket `@iconify-json/*`-set som helst, och delar upprepade ikoner på en sida via `<symbol>` och `<use>`.

**Hur det fungerar:**
- **Lucides form**, ur designspecifikationen. Måste-krav:
  - 24 × 24 px rityta.
  - Minst 1 px fri kant.
  - Streck 2 px, centrerat på banan.
  - Runda hörnfogar och runda ändar.
  - Minst 2 px mellan separata delar.
- **Lucides form, bör-krav:**
  - 2 px hörnradie för delar som är 8 px eller större, och 1 px för mindre delar.
  - Radien 2,41 px där diagonaler möts i rät vinkel.
  - Samma visuella tyngd som `circle` och `square`.
  - Låg detaljnivå.
  - Enkla kurvor.
  - Koordinater på pixelrutnätet där det går.
  - Återanvänd befintliga former.
  - När regler krockar vinner tydlighet och konsekvens.
- **Version 1** tog bort alla varumärkesikoner och hänvisar till Simple Icons. Komponenterna har nu `aria-hidden="true"` som standard, och UMD-bygget är borttaget.
- **`@lucide/astro`:**
  - Varje ikon är en Astro-komponent som renderar inline-SVG. Importen är *”completely tree-shakable”*.
  - Props: `size` (24), `color` (`currentColor`), `stroke-width` (2) och `nonScalingStroke`.
  - Med `aria-label` eller `<title>` tas `aria-hidden` bort. Peer-beroende: `astro ^4 || ^5 || ^6 || ^7`.
- **`lucide-static`** (bibliotekets väg): råa SVG-filer som importeras med `?raw`. `Ikon.astro` lägger själv till `aria-hidden="true" focusable="false"`, eftersom de råa filerna saknar det. Det finns också en sprite med alla ikoner, men Lucide avråder från den i produktion.
- **astro-icon 1.2.0:**
  - `<Icon name="…" />` renderas bara på servern, *”no runtime footprint”*.
  - Första förekomsten på en sida definierar ett `<symbol>`, och följande förekomster blir bara `<use href="#…">`.
  - Valet `include` begränsar vilka ikoner ur ett set som tas med. Utan det tas *”all icons from every installed set”* med.
  - Lokala SVG optimeras med svgo (`svgoOptions`).
  - Kräver Node ≥ 22.12 och är byggt mot Astro 7. Byggmiljön har Node 24.21.

**Kvalitet och underhåll:**
- **Lucide:**
  - 25 067 stjärnor, senaste commit 2026-10-15, 404 bidragsgivare (419 med anonyma). 428 öppna ärenden och PR.
  - Releaserna kommer tätt: åtta minor-versioner mellan 2026-10-03 (1.51.0) och 2026-10-16 (1.58.0). Versionen låses i biblioteket.
  - **#4387** (öppet, 2026-05-19): `@lucide/astro` ger *”Astro is not defined”* med Astro 6.3 och Cloudflare-adaptern i dev. Biblioteket är statiskt utan adapter och använder `lucide-static`, så det träffar oss inte i dag.
  - **#3468** (öppet, 9 reaktioner): ingen tand-ikon. Det berör tandvårdskunder. Biblioteket har redan ritat en egen nål och ryggrad av samma skäl.
  - **#2145:** brytande ändring när `lucide-static` blev ESM i version 308.
- **astro-icon:**
  - 1 446 stjärnor, senaste commit 2026-08-18, 24 bidragsgivare (27), 17 öppna. Kända problem:
  - **#275:** strecket kan inte anpassas.
  - **#279:** hög CPU och minnesåtgång vid start.
  - **#263:** `@iconify-json/*` hittas inte med yarn 4.
  - **#215:** genererade id:n på `<symbol>` är inte giltig XML.
  - **#177:** kommentarer i lokala SVG tas alltid bort. Min slutsats, inte provad: Lucides licenskommentar försvinner om Lucide-filer läggs i astro-icons lokala mapp.
  - **1.2.0** rättade dubbla eller felaktiga ikoner i Chromium (#281) och en sårbarhet i ett transitivt beroende (#290).
- **Iconify:** `iconify/iconify` har 6 366 stjärnor och 37 bidragsgivare. `icon-sets` uppdateras dagligen (senast 2026-10-16) och har 6 bidragsgivare.

**Det bästa vi kan ta:**
- **Designspecifikationen** som checklista för egna ikoner, till `detaljer.md`, *Ikoner*. En egen kontroll av bibliotekets ikoner:
  - `ryggrad.svg` följer 24 px, 2 px streck, runda fogar, 1 px fri kant och 2 px mellanrum.
  - Rektanglarna har dock `rx="1.5"`, där specen säger 1 px för delar under 8 px.
  - `nal.svg` har koordinater på halva pixlar, som `3.5 20.5`, där specen säger rutnätet när det går.
- **Behåll `lucide-static` med `?raw`** som i dag:
  - Ingen beroende-kedja och inget Astro-runtime-problem som #4387.
  - Licenskommentaren följer med.
  - Lägg till Lucides `LICENSE` med Feather-avsnittet på sajtens licenssida.
- **`@lucide/astro`** bara om props som `nonScalingStroke` behövs. Det ger samma HTML men en komponent per ikon.
- **astro-icon** först när ett kit väljer en annan familj än Lucide (Tabler, Phosphor) eller när symbol-delningen behövs. Använd `include` per set.
- **Licens-allowlista för `@iconify-json/*`:** tillåt `lucide`, `tabler`, `ph`, `heroicons`, `iconoir` och `simple-icons`. Spärra GPL, CC BY, CC BY-SA, CC BY-NC och MPL enligt tabellen. Font Awesome 6 och 7 är CC BY 4.0 också för gratisseten och kräver erkännande.

**Var det hamnar hos oss:**
- **Ytskillen**, `.claude/skills/yta/detaljer.md`, *Ikoner*: Lucides måste-krav som regel för egna ikoner, och regeln att licenssidan har Lucides och Feathers text.
- **Ytskillen**, `tokens.md`, *Verktyg*: raden om Lucide rättas. `@lucide/astro` och `lucide-static` har samma version (1.58.0), så glappet som anteckningarna 2026-10-13 såg (1.24.0) finns inte längre.
- **Bibliotek:** `lucide-static` finns. astro-icon läggs till först när ett kit behöver en andra familj.
- **Kontroll** (förslag): allowlistan som en enkel kontroll av `package.json` (`@iconify-json/*` mot tillåtna set). Och en kontroll att varje inline-SVG i `dist` har `aria-hidden` eller ett tillgängligt namn.
- **Ingen MCP.**

**Passar vår stack?**
- **Ja, nästan som det är.** Både `lucide-static` med `?raw` och astro-icon ger ren inline-SVG vid bygget, med **0 byte JavaScript** per sida.
- **Tailwind 4 och React-öar:** ikonerna ärver `currentColor`. I en React-ö finns `lucide-react`, men det skeppar JavaScript om ön hydreras. Statiska ikoner skickas hellre in som barn från en `.astro`-fil, vilket astro-icons dokumentation också beskriver.
- **Lighthouse 100:**
  - Inline-SVG kostar några hundra byte per ikon och ger ingen extra förfrågan.
  - astro-icons symbol-delning minskar HTML när samma ikon upprepas.
  - Lucides sprite med alla ikoner ska inte användas.
- **Inga krockar** med *HTML först* eller sparsam rörelse.

**Risker och flaggor:**
- **Licens:**
  - ISC och MIT kräver licenstexten i kopior. Kommentaren i SVG:n räcker troligen inte ensam (tolkning) – lägg texten på licenssidan.
  - Iconify blandar GPL- och CC-set, så allowlistan behövs innan astro-icon tas in.
  - Lägger man Lucide-filer i astro-icons lokala mapp försvinner troligen licenskommentaren (#177; slutsats).
- **Varumärken:** Lucide har inga varumärkesikoner sedan v1 (se Simple Icons).
- **Krock:** `@lucide/astro` med Cloudflare-adaptern i dev (#4387) om sajterna någon gång får SSR på Cloudflare.
- **Bygget:** astro-icon kräver Node ≥ 22.12 och tar in `@iconify/tools` (tungt beroende) vid bygget (#279).
- **Ingen telemetri, ingen inloggning, ingen betalvägg** i paketen.
