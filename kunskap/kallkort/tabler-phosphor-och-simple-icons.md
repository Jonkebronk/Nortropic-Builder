# Tabler, Phosphor och Simple Icons

**Källa:** Läst 2026-10-16.
- **Tabler Icons:** [tabler/tabler-icons](https://github.com/tabler/tabler-icons), commit `a4ce1404bc6d` (2026-10-05), release v3.49.0 (2026-10-05).
  - Lästa filer: `README.md`, `LICENSE` och `packages/icons-astro/README.md`.
  - npm `@tabler/icons` 3.49.0 laddades ned. SVG-filerna och katalogen räknades.
- **Phosphor:**
  - [phosphor-icons/core](https://github.com/phosphor-icons/core), commit `2b75f3ad12b4` (2026-01-06). Lästa filer: `README.md` och `LICENSE`. npm `@phosphor-icons/core` 2.1.1 laddades ned, och alla sex vikters SVG-filer räknades.
  - [phosphor-icons/homepage](https://github.com/phosphor-icons/homepage), commit `7a57592e564f` (2026-08-26). Läst: `README.md`.
  - npm `@phosphor-icons/web` 2.1.2 och `phosphor-astro` 2.1.0.
- **Simple Icons:** [simple-icons/simple-icons](https://github.com/simple-icons/simple-icons), commit `4d29a35c9546` (2026-10-13), release 16.35.0 (2026-10-11).
  - Lästa filer: `README.md`, `DISCLAIMER.md` och `LICENSE.md`.
  - npm `simple-icons` 16.35.0 laddades ned. `data/simple-icons.json` lästes i sin helhet: licens- och riktlinjefält per ikon.
  - Ärendena #11372 och #12529 om LinkedIn.
- **Iconify:** `collections.json`, commit `69ca5094ddd4`, för set-licenser och antal.
- **npm-registret:** `@tabler/icons-astro`, `@iconify-json/tabler`, `@iconify-json/ph`, `@iconify-json/simple-icons` och `simple-icons-astro`.

**Licens:**
- **Tabler: MIT**, © 2020–2026 Paweł Kuna. Kräver att MIT-texten följer med kopior. Lägg den på sajtens licenssida.
- **Phosphor: MIT**, © 2023 Phosphor Icons. Samma krav.
- **Simple Icons: CC0-1.0** för projektet. Men `DISCLAIMER.md` skriver: *”Simple Icons is released under CC0 - though that doesn't mean to imply that all icons within the project are also CC0.”*
  - Datafilen har ett licensfält för 224 av 3 466 ikoner: Apache-2.0 (49), MIT (29), CC-BY-SA-4.0 (29), egen licens (23), CC-BY-4.0 (19), CC0 (12), CC-BY-SA-3.0 (11) och GPL-3.0-only (7) med flera.
  - **Varumärkesrätten gäller oberoende av licensen.** *”We ask that our users seek the correct permissions to use the icons relevant to their project.”* 838 ikoner har en länk till varumärkets riktlinjer.

**Vad det är:**
- **Tabler Icons:** 6 238 ikoner, varav 5 184 kontur och 1 054 fyllda. *”Each icon is designed on a 24x24 grid with a 2px stroke.”*
- **Phosphor:** 1 512 ikoner i sex vikter (thin, light, regular, bold, fill, duotone), alltså 9 072 filer. README:n säger fortfarande *”1,248 icons and counting”*, vilket är inaktuellt.
- **Simple Icons:** 3 466 varumärkeslogotyper som SVG i en färg, med varumärkets hexfärg i datan.

**Hur det fungerar:**
- **Tabler:**
  - Samma SVG-attribut som Lucide: `viewBox="0 0 24 24"`, `fill="none"`, `stroke="currentColor"`, `stroke-width="2"` och runda ändar och fogar. Dessutom en osynlig ram, `<path stroke="none" d="M0 0h24v24H0z" fill="none"/>`.
  - Strecket kan ändras per ikon. Ett kit kan alltså byta Lucide mot Tabler utan att mått eller streck ändras.
  - 376 av konturikonerna är varumärken (`brand-*`).
  - Officiella paket: `@tabler/icons` (rå SVG, 3.49.0), `@tabler/icons-astro` (Astro-komponenter, peer `astro >=4`, props `size`, `color`, `stroke`, `title`, `class`) och `@tabler/icons-sprite`. Alla har samma version.
  - Iconify: `@iconify-json/tabler` 1.2.42.
- **Phosphor:**
  - Varje vikt är en egen fil med `viewBox="0 0 256 256"` och `fill="currentColor"`. Ikonerna är fyllda konturer, inte streck.
  - Strecket kan alltså inte styras med `stroke-width`. Vikten väljs genom att välja fil.
  - *”Designed at 16 x 16px.”* Ingen officiell Astro-komponent finns.
  - Communitypaketet `phosphor-astro` 2.1.0 är från 2024-07-20, har 30 stjärnor och en bidragsgivare.
  - `@iconify-json/ph` 1.2.2 är från 2024-12-16.
  - README:ns webbexempel laddar ikonfonten från jsDelivr-CDN (`@phosphor-icons/web`).
- **Simple Icons:**
  - En `path` per ikon i `viewBox="0 0 24 24"`, med `role="img"` och `<title>` inbyggt men utan `fill`. Utan `fill` blir den svart; vi måste sätta `fill="currentColor"`.
  - Datan per ikon: `title`, `hex`, `source`, `guidelines` och ibland `license`.
  - Sociala och lokala tjänster i 16.35.0:

| Tjänst | Finns | Riktlinjer i datan |
|---|---|---|
| Facebook, Instagram, Messenger, WhatsApp, Threads | ja | Metas brand resources |
| YouTube, Google | ja | ja |
| X | ja | X brand toolkit |
| Pinterest, Spotify, Yelp | ja | ja |
| Tripadvisor, Trustpilot | ja | ja |
| TikTok, Google Maps, Klarna | ja | nej |
| **LinkedIn** | **nej**, borttagen 2024 | – |
| Bokadirekt, Swish | nej | – |

  - **LinkedIn togs bort** (#11372, 2024-07-01) med hänvisning till LinkedIns riktlinjer: *”LinkedIn generally does not permit … to use its name, trademarks, logos … Any other uses must obtain prior approval from LinkedIn.”*

**Kvalitet och underhåll:**
- **Tabler:**
  - 22 338 stjärnor, senaste commit 2026-10-05, 100 bidragsgivare (103 med anonyma) och 82 öppna ärenden. Sex releaser mellan 2026-05-08 (v3.44.0) och 2026-10-05 (v3.49.0).
  - De mest röstade öppna ärendena gäller ikonönskemål, CDN-filer (#1415) och ikonfonten (#1452). Inget av dem berör inline-SVG.
- **Phosphor:**
  - core har 392 stjärnor, senaste commit 2026-01-06, 10 bidragsgivare och senaste npm-version 2.1.1 från 2024-03-29.
  - homepage har 7 660 stjärnor och 510 öppna ärenden, mest önskemål. #618 ”Phosphor Sharp style” har 18 reaktioner.
  - **Långsamt underhåll:** ingen ny ikonversion sedan 2024.
- **Simple Icons:**
  - 26 022 stjärnor, senaste commit 2026-10-13, 429 bidragsgivare (908 med anonyma) och omkring 840 öppna ärenden, mest önskemål.
  - Releaser varje vecka. Ikoner tas bort i större versioner när varumärken begär det.
- **Lucide som jämförelse:** saknar tand (#3468, öppet), massage och nål. Biblioteket har ritat en egen nål.
  - Tabler har `dental`, `massage`, `needle`, `bone`, `coffee` och `tools`.
  - Phosphor har `tooth`, `needle`, `syringe`, `stethoscope`, `first-aid`, `coffee`, `hammer` och `wrench`.

**Det bästa vi kan ta:**
- **Tabler som andrafamilj för vård och hantverk:** samma rutnät och streck som Lucide, MIT, och de branschikoner Lucide saknar. Hämtas som `@tabler/icons` med `?raw`, precis som `lucide-static`. Då behövs varken Astro-komponenter eller astro-icon.
- **Phosphor för ett varmt eller lekfullt kit:** vikten (light, regular, duotone) bär personligheten. Kitets `icon.stroke` gäller inte Phosphor. Där blir axeln `icon.weight`.
- **Simple Icons för sidfotens sociala länkar:**
  - En regel: läs `guidelines` för varje logotyp och använd bara logotyper vars licensfält saknas eller är CC0, MIT eller Apache.
  - Ingen LinkedIn-logotyp. Visa ordet ”LinkedIn” som text.
- **Exakta siffror** (6 238 / 1 512 × 6 / 3 466) och SVG-formatet till `detaljer.md`.

**Var det hamnar hos oss:**
- **Ytskillen**, `.claude/skills/yta/detaljer.md`, *Ikoner*:
  - Tabler och Phosphor som alternativ per kit, med vad som skiljer: streck mot fyllda konturer, 24 mot 256 i `viewBox`.
  - Simple Icons-regeln om riktlinjer och licensfält.
  - Ingen LinkedIn-logotyp.
- **Ytskillen**, `tokens.md`, *Kitets axlar*: ikonaxeln blir `icon.family` plus `icon.stroke` (Lucide, Tabler) eller `icon.weight` (Phosphor).
- **Bibliotek:** inget nu. `@tabler/icons` eller `@phosphor-icons/core` läggs till när ett kit väljer familjen, och `simple-icons` när en sidfot behöver logotyper.
- **Kontroll** (förslag): för Simple Icons ett byggsteg som läser `license` och `guidelines` i datan och stoppar ikoner med GPL, CC BY-SA eller egen licens.
- **Ingen MCP.**

**Passar vår stack?**
- **Ja.** Alla tre ger inline-SVG vid bygget med **0 byte JavaScript**.
- **Storlek:** Tabler-telefonen är 444 byte, Phosphor-telefonen 709 byte och Instagram-logotypen 2 101 byte.
- **Krockar med stackens mönster:**
  - Phosphors officiella webbexempel (ikonfont från CDN) och Tablers webbfont ska inte användas: extern förfrågan och font i stället för SVG.
  - `simple-icons-astro` (MIT, dzeiocom) ligger på 16.1.0 mot 16.35.0 och bör undvikas. Läs SVG direkt ur `simple-icons`.
- **Tailwind 4 och React-öar:** ikonerna ärver `currentColor`. Inga krockar med Lighthouse 100, *HTML först* eller sparsam rörelse.

**Risker och flaggor:**
- **Varumärken:** Simple Icons och Tablers 376 `brand-*`-ikoner är varumärken. Ägarnas regler gäller oavsett CC0 eller MIT. LinkedIn tillåter inte bruk utan godkännande.
  - Om Metas riktlinjer tillåter en enfärgad logotyp i sidfotens färg har jag inte läst ⚠️. Länken finns i datan.
- **Licens per ikon i Simple Icons:** inte allt är CC0. Sju ikoner är GPL-3.0-only och 40 är CC BY-SA. Inga av dem är logotyper vi troligen behöver, men kontrollen ovan fångar dem.
- **Underhåll:** Phosphors ikoner har inte fått en ny version sedan 2024, och Astro-paketet är en enmansport från 2024.
- **Tillgänglighet:** Simple Icons SVG har `role="img"` och `<title>`. I en länk med synlig text eller `aria-label` ska ikonen ha `aria-hidden="true"` i stället, annars läses namnet två gånger.
- **Ingen telemetri, ingen inloggning och ingen betalvägg** i paketen. Inga installationsskript i något av npm-paketen jag kontrollerade. Tabler har sponsorlänkar i README:n, men inget krävs.
