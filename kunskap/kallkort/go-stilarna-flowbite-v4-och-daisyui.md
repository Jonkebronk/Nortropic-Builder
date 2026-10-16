# Go-stilarna, Flowbite v4 och daisyUI

**Källa:** Läst 2026-10-16.
- **GoDaddy Go:** [godaddy-wordpress/go](https://github.com/godaddy-wordpress/go), commit `2bc28a3bb3c0` (2025-09-23), release 1.8.18 (2025-09-22). Lästa filer:
  - `.dev/assets/design-styles/{traditional,modern,trendy,welcoming,playful}/settings.scss`, alla fem.
  - `includes/core.php`: funktionen `get_available_design_styles` med färgscheman per stil.
  - `LICENSE`.
- **Flowbite v4:** [themesberg/flowbite](https://github.com/themesberg/flowbite), commit `232ebdb33a9e` (2026-06-27), release v4.0.2 (2026-05-13). Lästa filer:
  - `src/themes/{default,minimal,enterprise,playful,mono}.css`, alla fem.
  - `content/customize/theming.md` (= [flowbite.com/docs/customize/theming](https://flowbite.com/docs/customize/theming/)).
  - `content/getting-started/license.md` och `LICENSE.md`.
  - npm `flowbite` 4.0.2.
- **daisyUI 5:** [saadeghi/daisyui](https://github.com/saadeghi/daisyui), commit `bf3bac3a397b` (2026-10-13), release v5.7.50. Lästa filer:
  - `packages/daisyui/src/themes/{light,corporate,lofi,nord,cupcake}.css`, 5 av 35 teman.
  - Dokumentationen `packages/docs/src/routes/(routes)/docs/themes/+page.md` (= [daisyui.com/docs/themes](https://daisyui.com/docs/themes/)).
  - `packages/daisyui/src/components/button.css`.
  - En kodsökning via GitHub-API efter vilka komponenter som läser varje temavariabel. Kodsökningens index kan vara ofullständigt ⚠️.
- **Egna beräkningar** av WCAG 2-kontrast för färgerna i Go och daisyUI. daisyUI:s OKLCH-värden utanför sRGB klipptes, så de värdena är ungefärliga.

**Licens:**
- **Go: GPL-2.0.** Kopierad kod gör vårt verk till en härledning med GPL-krav. Tolkning, inte juridisk rådgivning:
  - Att läsa filerna och ta enskilda parametrar är fritt, eftersom tal, typsnittsnamn och förhållanden är fakta och idéer.
  - Inga filer, ingen SCSS-struktur och inga variabelnamn kopieras.
- **Flowbite:**
  - Koden är **MIT**, © Bergside Inc. (Themesberg). *”The Flowbite name and logos are trademarks of Bergside Inc.”*
  - Dokumentationens kod är **CC BY 3.0** och ursprungligen gafflad från Bootstrap. Den kräver erkännande om den kopieras.
  - Pro-versionen har en egen EULA och berör oss inte.
- **daisyUI: MIT.**

**Vad det är:**
- **Go** är ett WordPress-tema från GoDaddy med fem ”design styles”. Varje stil är en inställningsfil med CSS-variabler för typsnitt, skala, radhöjd, knappar, navigation och fält, plus fyra färgscheman.
- **Flowbite v4** är ett Tailwind 4-komponentbibliotek med fem teman. Varje tema är en `@theme`-fil med typsnitt, radier, textfärger, varumärkesfärger och neutraler, plus ett `.dark`-block.
- **daisyUI 5** är ett Tailwind 4-tillägg med 35 inbyggda teman och ett kompakt temaschema: 20 färger, radie per elementklass, storlek, kantbredd, djup och brus.

**Hur det fungerar:**

*Go – parametrarna per stil:*

| Stil | Brödtext / rubrik | Rubrikvikt | Skalförhållande | Brödstorlek / radhöjd | Textbredd | Knappradie | Knapptext |
|---|---|---|---|---|---|---|---|
| traditional | Nunito Sans / Crimson Text | 400 | 1,275 | 1,05 rem / 1,85 | 42 rem | 4 px | – |
| modern | Fira Code (mono) / Heebo | 800 | 1,3 | 0,85 rem / 2,25 | 38 rem | 0 | versaler, 3 px spärrning, även i navigationen |
| trendy | Noto Sans / Trocchi | 400 | 1,2 | 1,1 rem / 1,9 | 38 rem | 0 | versaler, 3 px spärrning |
| welcoming | Karla / Work Sans | 300 | 1,235 | 1 rem / 1,8 | 42 rem | 3 px | gemener, 1 px spärrning, även i navigationen |
| playful | Quicksand / Poppins | 600 | 1,215 | 1,1 rem / 1,8 | 42 rem | 5 px (fält 5 px) | – |

- **Färgscheman:** varje stil har fyra scheman med `primary`, `secondary`, `tertiary` och `background`. Exempel ur traditional: Apricot `#c76919`, `#122538`, `#f8f8f8`, `#ffffff`.
- **Kontrast mot vitt:** Apricot-primären ger 3,84:1, Bronze `#a88548` 3,43:1 och Pacifics sekundär `#26a69a` 3,00:1. De klarar inte 4,5:1 för text. Emerald `#165153` ger 8,99:1.
- **welcoming** sätter brödtextens färg till `primary`.

*Flowbite v4 – de fem temana (ljust läge):*

| Tema | Typsnitt | Radier xs / sm / `--radius` / base / lg | Varumärke | Neutral | Skuggor |
|---|---|---|---|---|---|
| default | Inter | 4 / 6 / 8 / 12 / 16 px | blue-700 | gray | standard |
| minimal | Open Sans | 2 / 4 / 6 / 8 / 16 px | stone-900 | stone | **0** |
| enterprise | STIX Two Text (serif) | 1 / 1 / 4 / 4 / 4 px | cyan-900 | zinc | standard |
| playful | Shantell Sans | 2 / 10 / 10 / 20 / 16 px | pink-900 | slate | standard |
| mono | Google Sans Code | 1 px överallt | indigo-900 | neutral | standard |

- **Brödtexten** är `-600` i neutralen och rubriken `-900`.
- **Varumärket** har sju steg: `brand-softer`, `-soft`, `-medium`, `-strong`, `fg-brand-subtle`, `fg-brand` och `fg-brand-strong`. Steget pekar på Tailwinds palett. Status är egna `fg-success`, `fg-danger` och `fg-warning`.
- **Omfång:** varje fil har 183–188 variabler i `@theme` och skriver om dem i `.dark`.
- **Typsnitten:** dokumentationen laddar typsnittet med `@import url('https://fonts.googleapis.com/…')`. Alla fem typsnitten är OFL på Google Fonts.

*daisyUI 5 – temaschemat:*
- **Färger:** `--color-base-100/200/300/content`, `primary`, `secondary`, `accent`, `neutral`, `info`, `success`, `warning` och `error`, var och en med `-content`. Plus `color-scheme`.
- **Radie per elementklass.** Enligt kodsökningen läses variablerna av:
  - `--radius-selector`: toggle, range.
  - `--radius-field`: button, input, select, tab, tooltip med flera.
  - `--radius-box`: modal, collapse, list, calendar med flera.
- **Storlek:** `--size-field` och `--size-selector` (0,25 rem). Knappens höjd är `calc(var(--size-field) * 10)`, alltså 2,5 rem.
- **`--border`** är kantbredden, 1 px i de lästa temana.
- **`--depth`** (0 eller 1) multiplicerar knapparnas skugga (`0 3px 2px -2px` och `0 4px 3px -2px` med 30 % av knappfärgen), en ljus inre kant på 6 % och en mörkare kant på 5 %.
- **`--noise`** (0 eller 1) styr storleken på en brustextur (`--fx-noise`) i bakgrunden.
- **Exempel:**
  - `light`: selector 0,5 rem, field 0,25 rem, box 0,5 rem, depth 1.
  - `corporate`: allt 0,25 rem, depth 0.
- **Egna teman** skrivs med `@plugin "daisyui/theme" { name: …; default: true; … }`. Ett befintligt tema kan delvis skrivas över.
- **Kontrast, egen beräkning:**
  - `light`: `secondary-content` på `secondary` ger 3,05:1.
  - `corporate`: vit text på `primary` ger 4,14:1, på `accent` 3,66:1 och på `success` 3,30:1. Ingen av dem klarar 4,5:1 för brödtext.

**Kvalitet och underhåll:**
- **Go:**
  - 338 stjärnor, senaste commit 2025-09-23 (automatisk incheckning), 33 bidragsgivare (39 med anonyma) och 32 öppna ärenden.
  - Låg aktivitet. Mappen `.dev/assets/design-styles` ändrades senast 2024-02-01 (commit `72925ebc63c9`).
- **Flowbite:**
  - 9 367 stjärnor, senaste commit 2026-06-27, 92 bidragsgivare (100) och 258 öppna.
  - **#1121** (öppet): `themes.css` sätter `--radius` två gånger med olika värden. PR #1122 är öppen.
  - **#1131** (öppet): `plugin.js` hårdkodar `.dark` och ignorerar Tailwinds egen `dark`-variant.
  - **#1148** (öppet): oklart hur `--color-brand` förhåller sig till andra färger.
  - **#1132 och #1138** (skapade 2026-03-16 och 2026-04-01, båda stängda): felaktiga Google Fonts-importer i temadokumentationen.
  - npm-paketet drar in `@popperjs/core`, `flowbite-datepicker`, `postcss` och `tailwindcss`.
- **daisyUI:**
  - 42 609 stjärnor, senaste commit 2026-10-13, 308 bidragsgivare (317), 64 öppna och täta releaser.
  - **#4803** (öppen PR): högkontrastkonturen på radio och toggle ritas aldrig.
  - **#4811** (öppen PR): select-pilen syns inte i forced colors.
  - **#4488** (öppet): egna temafärger skrivs över av inbyggda teman i Vite 8-produktionsbyggen.

**Det bästa vi kan ta:**
- **daisyUI:s schema** som form för kitets axlar i `tokens.md`:
  - radie per elementklass (selector, field, box)
  - fältstorlek som grundmått
  - kantbredd
  - djup som 0/1-reglage för skuggor och inre kant
  - brus som 0/1
  
  Det ligger nära de elva axlarna och ger ett färdigt sätt att låta samma komponent se platt eller upphöjd ut.
- **Flowbites fem personligheter som referensmatris för radie och skugga:**
  - mono: 1 px och inga rundningar
  - enterprise: 1–4 px med serif
  - minimal: 2–8 px utan skuggor
  - default: 4–16 px
  - playful: 10–20 px
  
  Bra som startvärden när Johnny säger ”stramare” eller ”mjukare”.
- **Gos parametrar som bandbredd:**
  - Skalförhållande 1,2–1,3.
  - Brödtextens radhöjd 1,8–1,9, högre än våra kit (Lugn 1,7, Varm 1,65, Djärv 1,6). Modern har 2,25 med mono i 0,85 rem.
  - Rubrikvikter 300–800.
  - Knapptext i versaler med 3 px spärrning (modern, trendy) mot gemener med 1 px (welcoming).
  - Fyra färger per schema som minsta palettmodell.
- **Varningarna:** färgerna i Go och daisyUI klarar inte golvet rakt av. Inga färgvärden tas utan att mätas.

**Var det hamnar hos oss:**
- **Ytskillen**, `.claude/skills/yta/tokens.md`, *Kitets axlar*: en tabell med startvärden per personlighet (radie, skugga, skalförhållande, radhöjd, knapptext) med Flowbite, daisyUI och Go som källor. Inga filer och inga variabelnamn från Go.
- **Ytskillen**, `detaljer.md`, *Radier* och *Skuggor*: daisyUI:s depth som modell för en skuggväxel per kit. Radie per elementklass finns redan.
- **Bibliotek:** inget. Varken Flowbite eller daisyUI installeras.
- **Kontroll:** ingen ny.
- **Ingen MCP.**

**Passar vår stack?**
- **Som parametrar: ja, utan JavaScript.** Värdena översätts till `--k-*` och aliaslagret.
- **Som paket: nej.**
  - Flowbite drar in Popper och en datumväljare och skulle kosta JavaScript per sida om dess interaktiva komponenter används.
  - daisyUI är ren CSS men har egna komponenter och egna namn (`--color-accent`, `--color-base-100`) som krockar med shadcn-namnen och med G3.
- **Tailwind 4:** båda är skrivna för Tailwind 4, så värdena går lätt att läsa av.
  - Flowbite skriver om `--radius`, `--radius-sm` och `--radius-lg` med fasta px-värden. Det krockar direkt med shadcn:s härledda radieskala om båda laddas.
- **Lighthouse 100:** Flowbites Google Fonts-import är en extern förfrågan och ska bytas mot Fontsource.
- **Ingen krock** med *HTML först* eller sparsam rörelse så länge bara värden tas.

**Risker och flaggor:**
- **GPL-2.0 (Go):** kopiera ingen fil, ingen SCSS och inga variabelnamn. Bara tal och typsnittsval som referens, med egna ord.
- **CC BY 3.0 (Flowbites dokumentation):** kopieras exempelkod ur dokumentationen krävs erkännande. Tas bara värden ur `src/themes`, som är MIT.
- **Varumärken:** ”Flowbite” är Bergside Inc:s varumärke och ”Go” är GoDaddys tema. Namnen används inte i våra kit.
- **Krockar med våra regler:**
  - daisyUI:s `accent` är en tredje varumärkesfärg, och shadcn:s `accent` är en hoveryta. Hos oss är accenten bara handlingar (G3).
  - Gos welcoming gör brödtexten i primärfärgen, vilket också strider mot G3.
- **Ingen telemetri, ingen inloggning och ingen betalvägg** i de delar vi läser. Flowbite Pro och Gos WordPress-tjänster berör oss inte.
