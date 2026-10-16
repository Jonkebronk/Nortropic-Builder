# Prestanda

Målet är Lighthouse 100 i alla fyra kategorier, i mobil och dator, med uppvärmning och median av tre (`BESLUT.md` 2026-10-16, *Lighthouse 100 är målet*; kontroll 9). Reglerna för bilder, typsnitt och bibliotek står i `guide/2-8-teknik-och-kvalitet.md`, *Kodstandard*. Här står måtten bakom poängen, hur de mäts utan att luras av bruset och vad React-öar kostar.

## Core Web Vitals

| Mått | Good | Poor | Gäller |
|---|---|---|---|
| LCP, största innehållet | ≤ 2,5 s | > 4 s | Laddning |
| INP, svar på interaktion | ≤ 200 ms | > 500 ms | Hela besöket |
| CLS, layoutförskjutning | ≤ 0,1 | > 0,25 | Hela besöket |

Värdena gäller 75:e percentilen av verkliga besök, mobil och dator var för sig. 📄 [web.dev, Web Vitals](https://web.dev/articles/vitals)

- **Labb är inte fält.** Lighthouse mäter LCP och CLS men inte INP, eftersom ingen interagerar. TBT ≤ 200 ms är labbets ersättare, men *"not a substitute"* (📄 [web.dev, TBT](https://web.dev/articles/tbt)). Små sajter når sällan CrUX-tröskeln, så labbet är grinden och fältdata uppföljning (📄 lager-8-anteckningarna §1g).
- **CWV är en signal bland många.** Relevans går före, och det finns ingen enskild signal (📄 [Google, Page experience](https://developers.google.com/search/docs/appearance/page-experience)). Prestanda är först och främst besökarens upplevelse.

## LCP

- LCP-resursen syns i HTML:en, inte bara i CSS eller skript. Den får `fetchpriority="high"`, och aldrig `loading="lazy"` (📄 [web.dev, Optimize LCP](https://web.dev/articles/optimize-lcp); [web.dev, Fetch Priority](https://web.dev/articles/fetch-priority)).
- Fördelningen ska ungefär vara 40 % TTFB, under 10 % laddningsfördröjning, 40 % laddning och under 10 % renderingsfördröjning. En lång fördröjning betyder att resursen upptäcks för sent (📄 samma).
- **Lat laddning bara utanför första vyn, i varje bredd.** En bild som ligger i första vyn på datorn men under vikningen på mobilen laddas inte lat på datorn, eller får en egen variant (📄 [web.dev, Lazy loading](https://web.dev/articles/browser-level-image-lazy-loading)). Webbläsaren hämtar en lat bild först efter layout.
- På en sida som börjar med text är LCP ofta rubriken eller ingressen. Då avgör typsnittet och stilmallen, inte bilden. Biblioteket lägger stilmallen i sidan och har reservtypsnitt med `size-adjust` (`BESLUT.md` 2026-10-16; iakttaget i revisionen).

## CLS

- Bilder och ramar har mått, inbäddningar har reserverad plats, rörelse använder `transform`, och typsnitt har reservmått eller `font-display: optional` (📄 [web.dev, Optimize CLS](https://web.dev/articles/optimize-cls); [web.dev, Font best practices](https://web.dev/articles/font-best-practices)).
- Förskjutningar inom 500 ms efter en inmatning räknas inte i CLS (`hadRecentInput`). En meny eller ruta som knuffar sidan efter ett klick syns därför inte i måttet och mäts för sig (📄 [web.dev, CLS](https://web.dev/articles/cls)).

## INP och mätning i labbet

- INP blir sämre av långa uppgifter, stor DOM och mycket JavaScript. Dela upp arbetet och lämna över huvudtråden (📄 [web.dev, Optimize INP](https://web.dev/articles/optimize-inp)).
- **Mät utan bibliotek** i Playwright: en `PerformanceObserver` för `event` med `durationThreshold: 16`, registrerad med `addInitScript` före navigeringen. Gruppera på `interactionId` och ta den längsta. Varaktigheten avrundas till 8 ms (📄 [web-vitals](https://github.com/GoogleChrome/web-vitals); [web.dev, INP](https://web.dev/articles/inp)).
- **Läs delarna:** inmatningsfördröjning (`processingStart − startTime`), bearbetning (`processingEnd − processingStart`) och presentation (resten). Sajtens egen kod syns i de två första.
- **Kalibrera.** I headless på en belastad maskin gav en tom sida med en knapp 150–190 ms INP, och sajtens interaktioner 70–200 ms med under 5 ms bearbetning (revisionen 2026-10-16). Presentationstiden var alltså brus från miljön. Ett INP-värde i labbet jämförs med en tom sida i samma körning och bedöms på fördröjning och bearbetning.
- **CPU-strypning** finns bara i Chromium (`Emulation.setCPUThrottlingRate` via CDP). Lighthouse mobil stryper fyra gånger.

## Mäthygien

- **Uppvärmning och median** enligt beslutet. Lighthouse anger att medianen av fem körningar är dubbelt så stabil som en (📄 [Lighthouse, variability.md](https://github.com/GoogleChrome/lighthouse/blob/main/docs/variability.md)).
- **En vilande maskin.** Samma dokument räknar lokal belastning till de största felkällorna. I revisionen gav en sida med 4 kB JavaScript TBT 595 ms när lastmedelvärdet var 15 på 8 kärnor. Prestandamätningen ska därför vänta, eller märkas osäker, när lasten (`uptime`) är högre än antalet kärnor. 🔧 Gränsen är vårt förslag.
- **Poängen är en fördelning,** och ett enstaka brott ger en ny körning, inte en rättning (📄 [Chrome for Developers, Performance scoring](https://developer.chrome.com/docs/lighthouse/performance/performance-scoring); → `guide/2-8-teknik-och-kvalitet.md`, *Hur självgående*).

## bfcache

- Tillbaka och framåt blir omedelbara när sidan sparas i bfcache. Hinder: `unload`-lyssnare (använd `pagehide`), `Cache-Control: no-store` på vanliga sidor, öppna anslutningar och `window.opener` (📄 [web.dev, bfcache](https://web.dev/articles/bfcache)).
- **Playwrights Chromium har bfcache avstängd** med flaggan `--disable-back-forward-cache` (iakttaget i revisionen; 📄 Playwright, `chromiumSwitches.ts`). Prövningen görs med Lighthouses granskning `bf-cache`, som gick igenom på övningssajten, eller i Playwright med `ignoreDefaultArgs` för flaggan.

## JavaScript-budget och React-öar

React, Tailwind och Motion är tillåtna som öar i Astro, och krockar med Lighthouse 100 och *HTML först* tas upp med Johnny (`BESLUT.md` 2026-10-16). Därför mäts priset:

- **Utgångsläget:** övningssajten har cirka 4 kB JavaScript med gzip per sida (inline-skript cirka 2 kB och en förhämtningsfil på 2,5 kB okomprimerat). Den når 100 i tillgänglighet, bästa praxis och SEO (revisionen 2026-10-16).
- **Budget per sida** 🔧: rapport när JavaScript över 50 kB med gzip laddas före första interaktion, eller när en sida har en ö med `client:load`. Värdet är vårt startvärde utan auktoritativ källa och kalibreras mot de första sajterna med öar (lager-8-anteckningarna §1: "eget startvärde").
- **Hydrera så sent som möjligt.** Astro renderar öarna till HTML vid bygget. `client:visible` hydrerar när ön syns, `client:idle` när huvudtråden är ledig, `client:media` vid en mediafråga, `client:load` direkt och `client:only` utan HTML från bygget (📄 [Astro, client directives](https://docs.astro.build/en/reference/directives-reference/#client-directives)). `client:only` ger inget innehåll utan JavaScript och bryter mot *HTML först* (→ `guide/2-4-skelett.md`).
- **Hydreringen syns i TBT och INP.** En ö som hydreras medan besökaren försöker klicka ger inmatningsfördröjning. Därför mäts INP på sidor med öar i Chromium med fyrfaldig strypning, och bearbetningstiden läses (avsnittet ovan).
- **Varje ö mäts för sig** när den tas in i biblioteket: bytes med gzip, TBT på en provsida, INP för dess interaktioner och axe efter hydrering (→ `prov.md`; `tillganglighet.md`, *React-komponenter*).
- **Motion och scrollstyrd rörelse** körs på `transform` och `opacity`, så att layouten inte räknas om (📄 MWG, rörelseguiderna; → `guide/2-6-rorelse.md`).
- Lighthouses granskningar `bootup-time`, `mainthread-work-breakdown` och `unused-javascript` visar vad öarna kostar.

## Tredje part

Allt från tredje part laddas först efter ett klick eller ett samtycke (→ `guide/2-8-teknik-och-kvalitet.md`, *Samtycke och analys*). Det skyddar både integriteten och prestandan. En polyfill från en CDN vid sidladdning är också tredje part; flera guider i modern-web-guidance föreslår det, och de följs inte på den punkten (📄 modern-web-guidance, guiderna med polyfill).
