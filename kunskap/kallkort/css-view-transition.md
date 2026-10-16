# CSS @view-transition

**Källa:** lästa 2026-10-16:
- [MDN: @view-transition](https://developer.mozilla.org/en-US/docs/Web/CSS/@view-transition), de första 100 000 tecknen. Resten är exempel och kompatibilitet ⚠️, men kompatibiliteten lästes direkt i BCD.
- MDN [browser-compat-data](https://github.com/mdn/browser-compat-data), commit `078588a` (2026-10-16): `css/at-rules/view-transition.json` och `browsers/firefox.json`.
- **Omläst 2026-10-16 (tredje varvet)** vid commit `0416078da7a1` (2026-10-16 11:04 UTC): fyra commits efter `078588a`, som bara ändrade `api/GPUDevice.json` och beroenden (GitHubs jämförelse). Inget i kortet påverkas. Firefox står fortfarande som `version_added: false` ([bugg 1860854](https://bugzil.la/1860854)).
- Chrome for Developers: [Cross-document view transitions](https://developer.chrome.com/docs/web-platform/view-transitions/cross-document) och [Same-document view transitions](https://developer.chrome.com/docs/web-platform/view-transitions/same-document).
- W3C: [CSS View Transitions Module Level 1](https://www.w3.org/TR/css-view-transitions-1/), de första 100 000 tecknen inklusive UA-stilen. Nivå 2, som definierar `@view-transition`, lästes inte separat ⚠️.
- Underlaget i `kunskap/research/2026-10-15_kompetensluckor-anteckningar/lager-6-7-rorelse-innehall.md` §7.

Provat med Playwright på övningssajten, se *Det bästa vi kan ta*.

**Licens:** webbstandard (W3C). MDN:s texter är CC BY-SA 2.5 och BCD är CC0. Inget krav för användning; vi citerar kort med källa.

**Vad det är:** en CSS-regel som låter två sidor på samma ursprung få en animerad övergång vid navigering, utan JavaScript och utan att sajten blir en SPA. Standardövergången är en korstoning.

**Hur det fungerar:**
- `@view-transition { navigation: auto; }` på både den gamla och den nya sidan.
- Samma ursprung, utan omdirigering till ett annat ursprung.
- Typen `traverse` (bakåt och framåt), eller `push` och `replace` som besökaren startat inne på sidan. Adressfältet, bokmärken och omladdning ger ingen övergång.
- Webbläsaren tar en bild av den gamla sidan, visar den nya och animerar mellan dem med pseudoelementen `::view-transition-group`, `-image-pair`, `-old` och `-new`.
- UA-stilen ger 0,25 s korstoning (`-ua-view-transition-fade-out/in`, `mix-blend-mode: plus-lighter`).
- `view-transition-name` ger ett element en egen grupp, till exempel ett sidhuvud som står stilla. Namnet måste vara unikt, annars hoppas övergången över.
- Händelserna `pageswap` och `pagereveal`.
- `<link rel="expect" blocking="render">` håller tillbaka målningen tills ett element finns. Chrome avråder om effekten inte mäts.
- Chrome hoppar över övergången om navigeringen tar mer än fyra sekunder.
- Stöd enligt BCD 2026-10-16: Chrome 126 och Safari 18.2. Firefox saknar stöd (bugg 1860854) och visar en vanlig navigering. MDN märker funktionen *Limited availability*, inte Baseline. Interop 2026 har övergångar mellan dokument som fokusområde.
- Reducerad rörelse: Chrome-sidan om övergångar inom ett dokument visar `animation: none` på pseudoelementen med `prefers-reduced-motion` och tillägger att reducerad rörelse inte betyder ingen rörelse. Sidan om övergångar mellan dokument och MDN säger inget om reducerad rörelse ⚠️.

**Kvalitet och underhåll:** en standard med två motorer. Firefox har bara övergångar inom ett dokument (sedan 144). Ingen tidsplan för Firefox hittades ⚠️.

**Det bästa vi kan ta:**
- Ett sidbyte utan JavaScript. Provet på övningssajten 2026-10-16, med regeln inom `no-preference`, sidhuvudet med eget namn och 180 ms:
  - Övergången kördes i Chromium (`pagereveal` gav `viewTransition`) och kördes inte med `reduce`.
  - **Efter 70 ms syntes båda sidornas text samtidigt.**
  - LCP gick inte att jämföra lokalt (84–440 ms utan, 104–548 ms med).
  - Sajtens CSP stoppar inlagd `<style>`, så regeln måste ligga i bibliotekets CSS.
- → `rorelse/sidbyten-och-scroll.md` och revisionens fynd R5.

**Var det hamnar hos oss:** i skillen `rorelse` (`sidbyten-och-scroll.md`), som kunskap och villkor. Den slås inte på i biblioteket förrän Johnny har dömt den på video. Guiden räknar sidövergångar till sparsam från sajt 2, men det är ett förslag och en öppen fråga (`guide/2-6-rorelse.md`; `guide/bilaga-e-oppna-fragor.md`).

**Passar vår stack?**
- Ja. Astro är flersidigt och statiskt, och regeln är ren CSS som Astro lägger in och hashar. Ingen översättning behövs.
- Prefetch vid hover, som redan finns i övningssajtens `astro.config.mjs`, håller navigeringen kort.
- Inte Astros `<ClientRouter />` (→ `guide/2-6-rorelse.md`).
- Cloudflare påverkar inte.

**Risker och flaggor:**
- **Text som syns dubbelt** under korstoningen krockar med Johnnys princip att texten ska vara läsbar i samma ögonblick den syns (`BESLUT.md` 2026-10-15).
- **Okänd effekt på LCP och INP i fält.** Lighthouse mäter en laddning i taget och ser inte övergången.
- **Firefox saknar stöd.** Det är ofarligt; där blir det en vanlig navigering.
- **Reducerad rörelse:** regeln ska ligga inom `no-preference`. Den globala återställningen i `bas.css` når inte pseudoelementen (guiden N2 ⚠️, utan primärkälla).
- **Krock med Johnnys beslut:** ja, potentiellt, med principen om läsbar text. Därför märkt *kräver Johnnys val*.
