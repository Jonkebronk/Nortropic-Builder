# lychee

**Källa:** allt läst 2026-10-16.
- https://github.com/lycheeverse/lychee, master vid commit `54f8bf4` (2026-10-13).
  - Lästa filer: `README.md` (installation, funktionstabellen, alla CLI-flaggor, exitkoder, cache, filformat, licens), `docs/TROUBLESHOOTING.md`, `lychee.example.toml` (början) och `Cargo.toml`.
- Senaste release **lychee-v0.24.2** (2026-05-01). Det finns en nattlig build från 2026-10-13.
- CLI-guiden https://lychee.cli.rs/guides/cli/ anger att flaggorna gäller "as of lychee-v0.24.2".
- Ärenden: sök-API:t (öppna, sorterade på reaktioner, samt "fragment").

**Licens:**
- **Apache-2.0 eller MIT, vi väljer** (`README.md#license`, `LICENSE-APACHE` och `LICENSE-MIT`).
- Vi kör bara binären och sprider inget, så det ställs inga krav.
- Bäddar vi in binären i något vi sprider: välj MIT och behåll copyright- och licenstexten.

**Vad det är:**
- En snabb länkkontroll skriven i Rust.
- Den läser HTML, Markdown och text, lokalt eller via webb, och kontrollerar länkar, ankare och textfragment.
- Den ger maskinläsbar utdata och tydliga exitkoder.

**Hur det fungerar:**
- **Lokalt läge:**
  - `--offline` kontrollerar bara lokala filer och blockerar nätanrop.
  - `--root-dir <absolut sökväg>` krävs för att absoluta länkar (`/om/`) i lokala filer ska kunna lösas. Annars fälls de.
  - `--base-url` löser relativa länkar mot en bas. Med båda flaggorna byggs URL:en av domänen, root-dir och länkens sökväg.
- **Kataloglänkar:** `--index-files index.html` kräver att `index.html` finns för en kataloglänk. **Utan flaggan räcker det att katalogen finns.** Det betyder mycket för Astros `dist/<sida>/index.html`.
- **Ändelselösa länkar:** `--fallback-extensions html` provar filändelser för länkar utan ändelse.
- **Fragment:**
  - `--include-fragments[=none|anchor-only|text-only|full]`. Utan värde blir det `anchor-only`.
  - Fungerar bara för HTML och Markdown, och bara vid GET.
  - **Ankare som skapas av JavaScript missas**, eftersom lychee inte kör någon webbläsarmotor.
- **Webbläge:** `-H/--header 'Namn: Värde'`, `--accept`, `--max-retries` (3), `--cache`/`--max-cache-age` (1d), `--exclude` (regex), `.lycheeignore`, `--exclude-path` och `--remap`.
- **Utdata:** `-f compact|detailed|json|junit|markdown`.
- **Exitkoder:** 0 = ok, 1 = saknad indata eller körnings- eller konfigfel, 2 = minst en länk fallerade, 3 = fel i konfigfilen.
- **Installation:** Homebrew (`brew install lychee`), MacPorts, färdiga binärer per release, Docker (`lycheeverse/lychee:<version>`) eller cargo. **Det finns inget officiellt npm-paket.**

**Kvalitet och underhåll:**
- Repot: 4 011 stjärnor, 238 forks, 123 bidragsgivare och 78 öppna ärenden och PR:er enligt GitHub-API:t 2026-10-16 (bidragsgivare med `anon=1`; öppna ärenden räknas ihop med PR:er). I git-historiken: 2 190 commits och 130 mänskliga författaradresser i historiken, 23 av dem under 2026. 271 commits under 2026.
- Senaste commit 2026-10-13. Releaser ungefär var 1–2 månad (0.24.1 2026-04-24, 0.24.2 2026-05-01).
- 62 öppna ärenden. De mest reagerade är önskemål om funktioner: rekursion (#78) och paketering (#59).
- **Kända problem som rör oss:**
  - [#1729](https://github.com/lycheeverse/lychee/issues/1729) gäller fragment i GitHub-Markdown, inte vår HTML.
  - [#2154](https://github.com/lycheeverse/lychee/issues/2154): "soft redirect" upptäcks inte.
  - [#1637](https://github.com/lycheeverse/lychee/issues/1637): utdatan saknar rad och kolumn. ⚠️ Om det gäller för lokala HTML-filer i 0.24.2 är inte prövat.
- Kombinationen `--offline --root-dir --include-fragments --index-files` är dokumenterad, men ⚠️ inte provkörd mot vår `dist/`.

**Det bästa vi kan ta:**
- Kommandoraden för den interna grinden:
  `lychee --offline --root-dir "$PWD/sites/<namn>/dist" --index-files index.html --include-fragments --format json --no-progress "sites/<namn>/dist/**/*.html"`
  - Exitkod 2 ger stopp. JSON-utdatan ger fynd per fil.
- Den externa varianten utan `--offline`, med `--cache --max-cache-age 1d --max-retries 3`, som rapport. Den ska inte stoppa bygget, eftersom externa sajter svajar.
- `docs/TROUBLESHOOTING.md`, avsnitten *Unexpected Status Codes* och *Website Expects Custom Headers*, som recept vid falsklarm.

**Var det hamnar hos oss:**
- **Kontroll (N2):** `lychee --offline --root-dir <abs dist> --include-fragments --index-files index.html` mot `dist/`. Noll trasiga interna länkar och ankare ger stopp.
- **Extern länkkontroll:** rapport.
- **Installation:** binären installeras med Homebrew och låses till 0.24.2 i startsäkringen. Den ska inte via npm.
- **Krav på kontrollskriptet:** det får inte anta att lychee finns. Saknas binären blir utfallet "fel", inte "ok".

**Passar vår stack?**
- Ja, för statiska `dist/` från Astro.
- **React-öar:** länkar som en ö skapar först i webbläsaren (`client:only`) syns inte för lychee. Öar som förrenderas till HTML syns. Tolkning: det är ännu ett skäl att rendera öarna vid bygget.
- `tel:`-länkar kontrolleras inte av lychee. Kontroll 4 täcker dem redan.

**Risker och flaggor:**
- Ingen telemetri, ingen betalvägg.
- I webbläge kan `-H` bära hemligheter, till exempel Access-token. Lägg dem i konfigfilen utanför repot, inte på en kommandorad som loggas.
- Ingen npm-väg, så det blir ännu ett systemberoende i startsäkringen.

**Inloggning:**
- Ingen.
- En valfri GitHub-token minskar spärrarna för länkar till github.com (`TROUBLESHOOTING.md`, *GitHub Rate Limiting*). Vi behöver den inte.
