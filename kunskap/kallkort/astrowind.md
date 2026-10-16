# AstroWind

**Källa:** <https://github.com/arthelokyo/astrowind> (tidigare onwidget/astrowind), commit `14e1a69` (2026-09-12), version `1.0.0-beta.66` i `package.json`, Astro `^7.3.1`, Tailwind `^4.3.3`. Läst 2026-10-16: README (317 rader), `AGENTS.md`, `.agents/skills/` (16 filer, bland annat `use-widgets.md`, `write-landing-page.md`, `add-structured-data.md`), `src/components/widgets/` (37 sektioner), `Header.astro`, `ToggleMenu.astro`, `StickyCTA.astro`, `common/Intersect.astro`, `assets/styles/tailwind.css`. Demon <https://astrowind.vercel.app/> prövad i Playwright i 375 och 1280 px med och utan JavaScript. Ärendelistan på GitHub. Lokalt: `kallor/arthelokyo-astrowind/`.

**Licens:** MIT ("Copyright (c) 2023 onWidget"). Kräver att licenstexten följer med kopior av koden.

**Vad det är:** det mest stjärnmärkta Astro-temat: en färdig sajt med 37 typade sektionskomponenter ("widgets"), sex landningssidor som exempel, blogg och shadcn-kompatibla tokens. Det är byggt för startups och SaaS, men sektionskatalogen täcker det en småföretagssajt behöver.

**Hur det fungerar:**
- Varje sektion är en Astro-komponent med props typade i `src/types.d.ts` och en gemensam bas (`WidgetWrapper` + `Headline`): `id`, `title`, `subtitle`, `tagline`, `isDark`, en `bg`-slot och `classes` för överskrivningar.
- Varianter är oftast separata komponenter (`Hero`, `Hero2`, `HeroText`; `Features`, `Features2`, `Features3`; `Steps`, `Steps2`) och ibland en prop (`Testimonials layout="grid" | "masonry"`, `CallToAction layout="card" | "banner"`, `Brands variant="grid" | "marquee"`, `Timeline layout="vertical" | "alternate"`).
- `FAQs` använder `<details name>` (en öppen åt gången, ingen JavaScript) och kan ge FAQPage-JSON-LD. `Gallery` har en ljuslåda med `<dialog>`. `Video` visar affischbild först och spelaren efter klick.
- `write-landing-page.md` har en tabell över sektionsval per sidtyp och regeln "Do not repeat the same sequence on every page", och kräver en primär handling med samma etikett i hero, efter beviset och i slutet.
- Mobilmenyn: `ToggleMenu` är en `<button aria-expanded="false">` som skript växlar; navigationen har klassen `hidden` tills skriptet tar bort den. Rullgardiner på datorn öppnas med hover och `:focus-within`.
- In-animationer: element med `motion-safe:md:opacity-0 motion-safe:md:intersect:animate-fade` visas av ett skript (`Intersect.astro`) med IntersectionObserver.

**Kvalitet och underhåll:** 6 042 stjärnor, MIT, senaste push 2026-09-12, 3 öppna ärenden, 66 bidragsgivare (GitHub-API 2026-10-16). README: v1 är i underhållsläge och v2 kommer i oktober 2026 ⚠️ (inte granskad). Kända problem i ärenden: `CustomStyles` slår inte igenom globalt i sidhuvudet (öppet 2026-09-07), prestandafall till 99 (2025-08-23, stängt).
- **Prov med JavaScript av (sett, 2026-10-16):** i 375 px går mobilmenyn inte att öppna; knappen gör ingenting och navigationen är dold. Med JavaScript fungerar den som en helskärmspanel. Innehållet var synligt på datorn utan JavaScript (0 av 100 textelement med opacitet under 0,1 efter scroll), så in-animationerna döljer inte texten i demon.

**Det bästa vi kan ta:**
- Katalogen i `.agents/skills/use-widgets.md` som checklista för vilka varianter en sektion kan ha: centrerad, delad och textbaserad hero; ikonrutnät, kort med länk och kompakt lista för tjänster; vertikala steg med bild och horisontella steg; rutnät och murverk för omdömen; ett stort citat; kort och banderoll för avslutet.
- `FAQs.astro`: `<details name>` per instans och valfritt `collapsible={false}` som visar alla svar.
- `Video.astro` och `Gallery.astro`: inget hämtas före klick, ljuslåda med `<dialog>`.
- `write-landing-page.md`: en primär handling med samma etikett överallt, och varje sektion får ett `id`.

**Var det hamnar hos oss:** `skill: skelett`, delfilen `varianter.md` (katalogen) och `interaktion.md` (mobilmenyn som motexempel). Biblioteket: referens när sektionsvarianterna byggs, inte en fork.

**Passar vår stack?** Ja: Astro 7 och statisk utdata som vi, och med den öppnade stacken (BESLUT 2026-10-16) går Tailwind-klasserna att använda. Tokens måste mappas: AstroWinds `--aw-color-*` och shadcn-namnen mot kitets `--k-*`. JavaScript-kostnad: menyn och in-animationerna är små egna skript (inget React), men mobilmenyn bryter *HTML först* och vårt beslut om popovermeny (`guide/2-4-skelett.md`). Ta därför sektionerna, inte sidhuvudet.

**Risker och flaggor:**
- Mobilmenyn utan JavaScript går inte att öppna (sett). Hamburgerikonen har bara `aria-label`, inget synligt ord "Meny".
- `opacity-0` med skript som visar innehållet krockar med rörelseregeln (`guide/2-6-rorelse.md`), även om demon klarade provet.
- SaaS-innehåll (pricing med månadsväxlare, countdown, logotypmoln) passar inte småföretag.
- 16 egna agent-skills i `.agents/skills/` ska inte installeras; de krockar med våra lagerskills.
- v2 kan ändra strukturen.

**Inloggning:** krävs inte.
