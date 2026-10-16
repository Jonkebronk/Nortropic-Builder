# Astro Fonts API och Fontsource

## Astro Fonts API

**Källa:** https://docs.astro.build/en/guides/fonts/, https://docs.astro.build/en/reference/configuration-reference/ (avsnittet `fonts`) och https://docs.astro.build/en/reference/font-provider-reference/. Astro 7.4.0 på npm (2026-10-15); repo https://github.com/withastro/astro, commit 484822f (2026-10-16). Läst 2026-10-16.

**Licens:** MIT (npm-paketet `astro`; GitHub visar "Other"). Inga krav på sajten.

**Vad det är:** Astros inbyggda sätt att självhosta typsnitt. Det laddar ned typsnittsfilerna vid bygget, serverar dem från sajten, genererar metrikanpassade reservtypsnitt och lägger förladdning där man ber om det.

**Hur det fungerar:**
- Stabilt, inte experimentellt: konfigurationsreferensen anger `fonts`, typ `Array<FontFamily>`, standard `[]`, "Added in: `astro@6.0.0`", utan experimentmärkning.
- Konfiguration i `astro.config.mjs`: `fonts: [{ provider: fontProviders.fontsource(), name: "…", cssVariable: "--font-…", weights, styles, subsets, fallbacks }]`.
- Standardvärden: `subsets: ["latin"]`, `display: "swap"`, `formats: ["woff2"]`, `optimizedFallbacks: true`. Reservtypsnittet genereras från den sista generiska familjen i `fallbacks` (standard `sans-serif`) och kan stängas av med `optimizedFallbacks: false`.
- I sidan: `import { Font } from "astro:assets"` och `<Font cssVariable="--font-…" preload />`. Docs varnar: "Font preloading should be done sparingly".
- Inbyggda leverantörer: Adobe (kräver ID), Bunny, Fontshare, Fontsource, Google, Google Icons, Local (`fontProviders.local()` med `variants`) och NPM.
- `fontProviders.npm()` "Retrieves fonts from NPM packages, either from locally installed packages in `node_modules` or from a CDN". Den hittar `@fontsource/*` och `@fontsource-variable/*` i `package.json`. Med `remote: false` används bara lokala paket; annars faller den tillbaka på `https://cdn.jsdelivr.net/npm`.
- Vid bygget kopieras filerna till `_astro/fonts`.
- Astro 7.4.0 beror på `@capsizecss/unpack`, `fontace` och `unifont` (npm-metadata). Reservtypsnitten bygger alltså troligen på Capsizes metrikläsning (slutsats; docs säger det inte).

**Kvalitet och underhåll:** 63 266 stjärnor, cirka 1 249 bidragsgivare, senaste commit 2026-10-16. En sökning efter öppna ärenden med "font" i titeln gav inga träffar (2026-10-16).

## Fontsource

**Källa:** https://github.com/fontsource/fontsource, commit f7706ec (2026-10-14); https://fontsource.org/docs/getting-started/introduction och …/variable. Paket kontrollerade på jsDelivr: `@fontsource-variable/inter` 5.3.0 (filer, `index.css`, `wght.css`, `opsz.css`, `standard.css`). Läst 2026-10-16.

**Licens:** Koden MIT. Varje typsnitt har sin egen licens i paketet (oftast OFL-1.1, ibland Apache-2.0). README: "Always make sure to read the license for each font you use."

**Vad det är:** Öppna typsnitt paketerade som npm-paket, ett per familj, med CSS-filer per vikt och subset. Variabla typsnitt ligger under `@fontsource-variable/…`.

**Hur det fungerar:**
- "Fonts remain version locked" – uppdateras som vilket beroende som helst.
- CSS använder `unicode-range`, så webbläsaren hämtar bara de subsets som sidan behöver. Inters `latin` täcker bland annat `U+0000-00FF` (åäö) och `U+2000-206F` (” – …); `latin-ext` täcker `U+0100-02BA` (bland annat samiska Č Đ Ŋ Š Ŧ Ž).
- Variabla paket: `index.css` är samma filer som `wght.css` (bara viktaxeln). För Inter finns också `opsz.css` (optisk storlek) och `standard.css`.

**Kvalitet och underhåll:** 6 202 stjärnor, 46 bidragsgivare, 38 öppna ärenden och PR:er. Kända problem: #39 "Consider proving full-featured fonts as alternatives to their trimmed counterparts" (öppen sedan 2020) – Google Fonts-byggena saknar många OpenType-funktioner, till exempel "old-style/lining figures, small capitals"; #773 "`.woff2` sometimes bigger than `.woff`". Egen kontroll av latin-filerna (fontkitten, GSUB, 2026-10-16): `tnum` finns i Inter, Source Serif 4, Familjen Grotesk, Atkinson Hyperlegible Next och Instrument Sans men saknas i Fraunces och IBM Plex Sans; `onum` och `smcp` saknas i alla sju. GPOS (kerning) lästes inte ⚠️.

## Gemensamt för posten

**Det bästa vi kan ta:**
- `fontProviders.npm({ remote: false })` med de versionslåsta `@fontsource`-paket vi redan har i `bibliotek/package.json` – inga nätverksanrop vid bygget och samma filer som i dag.
- `optimizedFallbacks` i stället för de handräknade reservtypsnitten i `bibliotek/stilkit/*/kit.css`.
- `<Font preload>` bara för brödtextens fil.
- `opsz.css` för typsnitt med optisk axel (Inter), så att `font-optical-sizing: auto` gör nytta i rubriker.
- Regeln: förvänta inte `onum`/`smcp` i Fontsource-filer, och kontrollera `tnum` innan ett kit lovar tabulära siffror.

**Var det hamnar hos oss:** Ytskillen `typografi.md` (laddning, subsets, preload, reservtypsnitt, siffror) och bibliotek (`bibliotek/astro.config.mjs`). Kontroll: inga tredjepartsanrop vid sidladdning och CLS mäts redan i N1-kontrollerna (`2-8-teknik-och-kvalitet.md`).

**Passar vår stack?** Ja – det är Astro självt och skeppar bara CSS och woff2, 0 byte JavaScript. Med Tailwind 4 tillåtet (`BESLUT.md` 2026-10-16, kl. 12.28) kan `--font-…` från `cssVariable` läggas i `@theme inline` och samtidigt i `--k-font-*`. Översättning: dagens `@import "@fontsource/…/400.css"` i varje `kit.css` och de egna `@font-face`-reserverna byts mot `fonts:` i konfigurationen. Att byta kit med `[data-kit]` i webbläsaren kräver att alla tre kitens typsnitt finns deklarerade; webbläsaren hämtar bara filer för de familjer och tecken som faktiskt används (slutsats ur hur `@font-face` och `unicode-range` fungerar; inte mätt).

**Risker och flaggor:**
- Reservtypsnitten använder `ascent-override`/`descent-override`, som enligt MDN:s kompatibilitetsdata 8.1.6 inte stöds i Safari (bara "preview"); `size-adjust` stöds från Safari 17. Gäller både Astros och dagens handskrivna reserver.
- Capsizes breddvikter för `latin` bygger på engelsk text (se kortet Utopia och Capsize), inte svensk.
- Leverantörerna `google` och `fontsource` hämtar från nätet vid bygget; Adobe kräver ID. Fontshare har egen EULA (guiden 2-5).
- Ingen telemetri eller inloggning i Fontsource-paketen.
