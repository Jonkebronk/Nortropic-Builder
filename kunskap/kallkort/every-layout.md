# Every Layout

**Källa:** <https://every-layout.dev/layouts/> och det fritt lästa kapitlet <https://every-layout.dev/layouts/switcher/>, läst 2026-10-16; lager-3-4-anteckningarna (fråga 1). Boken och de övriga kapitlen är betalda (69 USD) och inte lästa ⚠️.

**Licens:** ⚠️ Ingen licens för koden anges på sidorna; webbplatsen hänvisar till sina "Terms and conditions". Boken är upphovsrättsskyddad. Vi destillerar principerna och skriver egen CSS; vi kopierar inte bokens kod.

**Vad det är:** Heydon Pickering och Andy Bells metod för *intrinsisk* layout: ett fåtal små layoutprimitiver som anpassar sig efter innehållet och utrymmet, i stället för brytpunkter och "magic numbers". Primitiverna: Stack, Box, Center, Cluster, Sidebar, Switcher, Cover, Grid, Frame, Reel, Imposter, Icon och Container.

**Hur det fungerar (sett i de fria kapitlen och beskrivningarna):**
- Stack: lodrätt flöde med ett avstånd mellan syskonen (`* + *`).
- Sidebar: ett smalt och ett brett element sida vid sida, som staplas när det breda skulle bli för smalt.
- Switcher: växlar mellan rad och stapel vid en tröskel: `flex-basis: calc((var(--threshold) - 100%) * 999)`. Standardvärden: `threshold` = `var(--measure)`, `space` = `var(--s1)`, `limit` = 4 – med fler än fyra barn blir det alltid en stapel (kvantitetsfråga).
- Cluster: element av olika bredd som radbryts som ord. Cover: ett element centrerat lodrätt med huvud och fot. Frame: ett fast bildförhållande. Reel: horisontell rullning. Grid: ett rutnät med minsta kolumnbredd.
- Varje primitiv har en kodgenerator och ett custom element (enligt översiktssidan).

**Kvalitet och underhåll:** etablerad bok (2019, uppdaterad); författarna är kända inom tillgänglighet och CSS. Tre kapitel är fria att läsa: Stack, Sidebar och Switcher.

**Det bästa vi kan ta:** primitiverna som CSS-klasser eller små Astro-komponenter i `bibliotek/src/layout/` (`guide/2-4-skelett.md`, N2), med tokens för avstånd och radlängd ur kitet. Switcher-tekniken för Det praktiska och Tjänster, Sidebar för Om-sidan och Hitta hit, Stack för sektionernas inre rytm (biblioteket har redan `data-yta`-regeln, som bygger på Stack).

**Var det hamnar hos oss:** `skill: skelett`, delfilen `layout.md` (principerna och vilken primitiv som löser vad), och biblioteket (primitiverna).

**Passar vår stack?** Ja, ren CSS: 0 kB JavaScript. Med Tailwind tillåtet kan samma idéer skrivas som klasser, men primitiverna är tydligare som egna klasser. Container queries (Baseline "high" sedan 2025-08-14 enligt web-features) gör en del av bokens knep enklare.

**Risker och flaggor:** boken kostar 69 USD och resten av kapitlen är bakom betalvägg; ingen uttalad licens för koden.

**Inloggning:** boken kräver köp (Johnny). De tre fria kapitlen räcker för att börja.
