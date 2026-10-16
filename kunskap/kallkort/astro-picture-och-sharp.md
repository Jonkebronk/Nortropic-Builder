# Astro Picture och sharp

**Källa:** lästa 2026-10-16.
- Astro-guiden för bilder: https://docs.astro.build/en/guides/images/
- Referensen `astro:assets`: https://docs.astro.build/en/reference/modules/astro-assets/
- Cloudflare-adaptern: https://docs.astro.build/en/guides/integrations-guide/cloudflare/ (sidan anger v14.4.0)
- Astros sharp-tjänst i källkoden: `packages/astro/src/assets/services/sharp.ts` på `main`, hämtad 2026-10-16 (senaste commit i repot 484822fbba, 2026-10-16)
- sharps dokumentation: https://sharp.pixelplumbing.com/api-output, `/api-resize` och `/install`
- Versioner på npm 2026-10-16: `astro` 7.4.0 (beroende `sharp ^0.35.4`), `@astrojs/cloudflare` 14.4.0, `sharp` 0.35.5.

**Licens:**
- Astro: MIT.
- sharp: Apache-2.0. Kräver att licens och upphovsrättsnotis följer med vid vidarespridning, vilket inte är aktuellt eftersom sharp bara körs vid bygget.
- De förbyggda libvips-binärerna har egna licenser. ⚠️ Inte läst i detalj.

**Vad det är:** Astros inbyggda bildkomponenter `<Image />` och `<Picture />` ändrar storlek och format på bilder vid bygget. Standardtjänsten är sharp, ett Node-bibliotek ovanpå libvips. `<Picture />` ger flera `<source>`-format med en `<img>` som reserv.

**Hur det fungerar:**
- **Var bilderna ligger:** bilder i `src/` importeras och bearbetas. Bilder i `public/` "are always served or copied into the build folder as-is, with no processing" (Astro-guiden).
- **`alt`:** krävs på båda komponenterna. Dekorativa bilder får `alt=""`.
- **Format:**
  - `<Image />` ger `.webp` som standard.
  - `<Picture />` har `formats` = `['webp']` som standard. AVIF måste anges, och det mest moderna formatet ska stå först, till exempel `formats={['avif','webp']}`.
  - `fallbackFormat` blir JPG för JPG-källor och PNG för statiska bilder.
- **`layout`** (sedan 5.10.0) kan vara `constrained`, `full-width`, `fixed` eller `none`. Med layout genereras `srcset`, `sizes` och attributet `data-astro-image`.
  - `widths` kräver `sizes`.
  - `densities` går inte att kombinera med `layout`.
  - Global inställning görs med `image.layout`. `image.responsiveStyles: true` lägger in små globala CSS-regler.
- **`priority`** (5.10.0) sätter `loading="eager"`, `decoding="sync"` och `fetchpriority="high"`. Den används bara för hjältebilden.
- **`fit` och `position`** följer CSS `object-fit` och `object-position`. Standard är `cover` och `center`.
- **Metadata:**
  - Astros sharp-tjänst anropar `result.rotate()` ("always call rotate to adjust for EXIF data orientation") men inte `keepMetadata()` eller `withMetadata()`.
  - sharp: "By default all metadata will be removed, which includes EXIF-based orientation."
  - Slutsats: bearbetade varianter saknar EXIF och GPS. Det är en tolkning av källkod och dokumentation, inte provkört.
- **Smart beskärning:** sharps `position: sharp.strategy.attention` eller `entropy` gäller bara `fit: 'cover'`. `attention` söker "luminance frequency, colour saturation and presence of skin tones". Astros `position`-prop tar CSS-värden, så strategierna kräver ett eget förbyggsskript med sharp. ⚠️ Det är inte prövat om Astro skickar vidare `attention`.
- **HEIC:** sharps förbyggda binärer stöder "JPEG, PNG, Ultra HDR, WebP, AVIF, TIFF, GIF and SVG (input)". HEIC finns inte med. Enligt underhållaren i [sharp#1105](https://github.com/lovell/sharp/issues/1105) kräver HEVC en egen global libvips med libheif. iPhone-foton måste därför konverteras före `src/`.
- **Cloudflare:**
  - Guiden säger "If you're using Astro as a static site builder, you don't need an adapter."
  - Med adaptern är standarden `imageService: 'cloudflare-binding'`. `compile` bearbetar lokalt vid bygget för förrenderade rutter.

**Kvalitet och underhåll:**
- withastro/astro: 63 266 stjärnor, cirka 1 249 bidragsgivare (inklusive anonyma), senaste commit 2026-10-16.
- lovell/sharp: 32 766 stjärnor, cirka 243 bidragsgivare, push 2026-10-15.
- Kända problem:
  - [astro#16931](https://github.com/withastro/astro/issues/16931): Cloudflare-adapterns standard-`imageService` med `output: 'static'` gav runtime-URL:er `/_image?...` och 404. Stängd 2026-09-10 via en ny huvudversion av adaptern.
  - [astro#17346](https://github.com/withastro/astro/issues/17346): `compile` med `prerenderEnvironment: 'node'` gav en tyst no-op, till exempel PNG-bytes i en `.webp`-fil. Fixad 2026-08-02.
  - [astro#17748](https://github.com/withastro/astro/issues/17748): `compile` med statisk output släppte inte ut originalfiler som refererades direkt, till exempel `og:image` och ljusbord. Stängd som "not_planned".
  - [astro#17968](https://github.com/withastro/astro/issues/17968): `compile` gav 400 i `astro dev`. Fixad i september.
  - [astro#18214](https://github.com/withastro/astro/issues/18214): `<Picture formats={["avif","webp"]}>` serverades som `image/heif` i dev-servern men som `image/avif` efter bygget. Fixad 2026-10-06.
  - [astro#16656](https://github.com/withastro/astro/issues/16656): responsiva bilder lade in inline-`style` som bröt `security.csp`. Stängd 2026-05-18.
  - [astro#17139](https://github.com/withastro/astro/issues/17139): de responsiva CSS-reglerna låg utanför `@layer` och skrev över lagrad CSS. Fixad 2026-06.
  - [astro#18042](https://github.com/withastro/astro/issues/18042): `responsiveStyles` gav ogiltig `object-position`, en regression. Stängd 2026-09-17.
  - [astro#14557](https://github.com/withastro/astro/issues/14557): `full-width` genererade varianter i originalstorlek trots `widths`, vilket gav lång byggtid. Stängd 2026-02-05.

**Det bästa vi kan ta:**
- Hjältebilden: `<Picture src={...} formats={['avif','webp']} layout="full-width" priority alt="..." />`. Se referensens avsnitt om `layout` och `priority`.
- Alla innehållsbilder ligger i `src/assets/`, aldrig i `public/`.
- Ren statisk build utan adapter, så att sharp bearbetar vid bygget. Det undviker hela gruppen av adapterfel ovan.
- Ett förbyggsskript med sharp för tre saker:
  - HEIC till JPEG, med en libheif-väg utanför sharp. ⚠️ Inte prövat.
  - Beskärning med `strategy.attention` för fasta bildformat.
  - Borttagning av all metadata redan på källfilen. Originalet kan nämligen hamna i `dist` när `image.src` används direkt, se astro#17748.

**Var det hamnar hos oss:** bekräftar det preliminära.
- Bildkomponenten i sajtskelettet: bibliotek.
- Reglerna för format, `priority` och `layout`: lager 8.
- Bildens innehåll och alt-text: skillen `innehall`, delfilen `bilder.md`.

Lägg till i lager 8: "rensa metadata på källfilen före `src/`" och "ingen adapter för statiska sajter". Ingen av dem står i det preliminära.

**Passar vår stack?**
- Ja. Komponenterna ger ren HTML (`<picture>`, `<source>`, `<img>`) utan klient-JS.
- `image.responsiveStyles` lägger in egen CSS. Med egna CSS-tokens och `@layer` bör den vara avslagen eller testas mot #17139 och #16656 (CSP).
- Det som måste översättas är bara dokumentationen. Komponenterna fungerar oförändrade.

**Risker och flaggor:**
- Ingen telemetri i bildkedjan. Astros egen telemetri är en separat fråga. ⚠️ Inte läst här.
- `public/` och direkt användning av `image.src` publicerar originalfilen med EXIF och GPS **[GDPR]**.
- Adapterns `imageService` har haft flera tysta fel under 2026.
- Ingen kontroll av C2PA: sharp tar bort all metadata som standard, och dokumentationen nämner inte C2PA eller JUMBF. Märkning av AI-bilder kan därför inte lita på inbäddad C2PA efter bygget. ⚠️ Inte provkört.
