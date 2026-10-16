# Flyttregler och omdirigeringskartan

Delfil till `omfattning`, spår B. Regeln om omdirigeringskartan bor i `guide/2-2-omfattning.md` (N1 när den nya sajten ersätter den gamla på kundens domän) och kontrollen vid lansering i `guide/2-8-teknik-och-kvalitet.md`. Här står detaljerna.

## Googles regler

📄 Google Search Central, [Site moves with URL changes](https://developers.google.com/search/docs/crawling-indexing/site-move-with-url-changes), uppdaterad 2026-08-20. Norm för kontrollen (`guide/README.md`, *Grind eller instruktion*).

| Regel | Ordagrant eller nära |
|---|---|
| Kartlägg varje gammal adress till en ny | "map your old site's URLs to the URLs for the new site" |
| Permanenta omdirigeringar på servern | "use HTTP permanent redirects if possible, such as 301 and 308"; klientomdirigering bara som sista utväg |
| Direkt till slutmålet | "redirecting to the final destination directly"; annars helst högst 3 och färre än 5 steg |
| Ingen massomdirigering till startsidan | "Don't redirect many old URLs to one irrelevant single URL destination, such as the home page" |
| Innehåll som tagits bort ger 404 eller 410 | Konsoliderat innehåll får omdirigeras till den nya samlade sidan |
| Kvar minst ett år, gärna för alltid | "generally at least 1 year"; för användarna "indefinitely" |
| Inbäddat innehåll ingår | bilder, video, skript och stilmallar med i planen |
| Nya adressen pekar på sig själv | självrefererande `canonical` på varje ny sida |
| Interna länkar till nya adresser | sajten ska inte lita på sina egna omdirigeringar |
| Båda sitemaps skickas in | den gamla med de gamla adresserna och den nya; varningar om omdirigeringar i den gamla är väntade |
| Verifiera alla varianter | gamla och nya, med och utan `www`, `http` och `https` |
| Adressbyte i Search Console | bara vid byte av domän eller underdomän; inte vid `http` → `https`, inte vid www → utan www på samma domän (*"use canonical tagging and/or redirects without using the change of address tool"*, 📄 [Search Console-hjälpen](https://support.google.com/webmasters/answer/9370220), läst 2026-10-16) och inte vid nya sökvägar på samma domän |
| Räkna med svängningar | "Expect temporary fluctuation"; en medelstor sajt tar några veckor eller mer |
| Flytta när trafiken är låg | "Time your move to coincide with lower traffic, if possible" |

## `_redirects` i Cloudflare Workers

📄 Cloudflare, [Redirects](https://developers.cloudflare.com/workers/static-assets/redirects/), läst 2026-10-16. Filen ligger i `public/` och följer med till `dist/`.

| Egenskap | Vad det betyder för kartan |
|---|---|
| Format `[källa] [mål] [kod]`; rader som inte följer formatet ignoreras tyst | Kontrollera filen med ett skript, inte med ögonen |
| Standardkoden är **302** | Skriv alltid `301` (eller `308`) |
| Högst 2 000 statiska och 100 dynamiska regler, 1 000 tecken per rad | Räcker för en småföretagssajt; statiska regler före dynamiska |
| Den översta regeln för samma källa gäller | Dubbletter är fel |
| En `*` per regel, `:splat` i målet; platshållare `:namn` | Bara när ett helt gammalt avsnitt flyttar |
| Källan kan inte matcha frågesträngar | `/?p=12` landar på `/` med 200. En gammal adress med frågesträng som har trafik eller länkar (före-måttet, Search Console) får en omdirigeringsregel i zonen som matchar frågesträngen, till exempel `http.request.uri.path eq "/" and any(http.request.uri.args["p"][*] eq "12")`, med 301 och *Preserve query string* avslaget, som är standard. Utan trafik eller länkar skrivs utfallet som ett beslut i kartan. `kontrollera_omdirigeringar.py` varnar för en gammal adress med frågesträng som saknar en kommentar i `_redirects`. 📄 Cloudflare Docs, [Single Redirects](https://developers.cloudflare.com/rules/url-forwarding/single-redirects/) och [Settings](https://developers.cloudflare.com/rules/url-forwarding/single-redirects/settings/) (*"disabled by default"*), [http.request.uri.args](https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/http.request.uri.args/), lästa 2026-10-17. ⚠️ Att fältet får stå i en omdirigeringsregels villkor står inte uttryckligen på sidorna om Single Redirects, som hänvisar till regelspråkets fältlista; prövas i zonen med `curl -I` före flytten. (`BESLUT.md` 2026-10-16, *Frågelistan efter tredje varvet avgörs*, punkt 55) |
| Omdirigeringar körs före filerna och före `_headers` | En regel slår en fil med samma adress |
| Gäller inte svar som Workerns kod skapar | Adresser under en Worker-väg (`/api/*`) omdirigeras i koden |
| Omdirigering på domännivå stöds inte | `www` och `http` görs i zonen (nedan) |
| Proxy med 200 bara inom sajten | Ingen proxy till andra domäner |

**Snedstreck.** Med standardläget `auto-trailing-slash` svarar Cloudflare på `/sida` med en **307** till `/sida/` när `sida/index.html` finns. 307 är tillfällig. En gammal adress utan snedstreck som har länkar eller trafik får därför en egen `301`-regel. 📄 Cloudflare, [HTML handling](https://developers.cloudflare.com/workers/static-assets/routing/advanced/html-handling/).

**Stora och små bokstäver.** Prövat i `wrangler dev` 2026-10-16: regeln i `_redirects` skiljer på stora och små bokstäver, så en gammal adress med versaler gav 404 (översynen, `kunskap/research/2026-10-16_verktyg-och-skills-full-potential.md`). ⚠️ Produktionen är inte prövad. WordPress svarar ofta på båda. Pröva i `wrangler dev` när gamla adresser har versaler.

**404-sidan.** `assets.not_found_handling: "404-page"` ger den designade sidan med status 404 (→ `guide/2-8-teknik-och-kvalitet.md`).

## Värdnamnen

`_redirects` matchar bara sökvägar. Det som i dag går till sajten via andra värdnamn måste fortsätta göra det:

- **`www` → huvuddomänen** (eller tvärtom) med en omdirigeringsregel i zonen, 301, med sökväg och frågesträng bevarade. 📄 Cloudflare, [Redirect www to root](https://developers.cloudflare.com/rules/url-forwarding/examples/redirect-www-to-root/). `www` behöver en DNS-post i zonen för att regeln ska nås (⚠️ inte stämt av i dokumentationen ovan).
- **`http` → `https`** i zonen (⚠️ inställningens exakta namn inte stämt av 2026-10-16).
- Pröva båda med `curl -I` före och efter flytten. Den gamla sajtens beteende är facit.

## Search Console och uppföljning

- Före: verifiera alla varianter av den gamla och den nya sajten, och spara de gamla sitemaps (📄 Google).
- Vid flytten: omdirigeringarna slås på samtidigt som bytet (📄 marketingskills `site-architecture`, `references/platforms-and-migration.md`).
- Efter: skicka in den nya sitemapen. Låt de gamla adresserna finnas i en egen sitemap en tid, så att Google hittar omdirigeringarna snabbare. En regel som skickar den gamla sitemapen till den nya döljer de gamla adresserna. 📄 Google; 📄 `platforms-and-migration.md` ("keep the old one available briefly so search engines see the redirects").
- Vid bytet: stickprov på de viktigaste sidorna – innehåll, titel, metabeskrivning, canonical, strukturerad data och status 200 – och att bokning, formulär och analys fungerar. 📄 `platforms-and-migration.md`, *At launch* (en källa – bänken).
- Följ 404-fel och täckning dagligen i två veckor, sedan veckovis. Jämför trafik per sida med samma period före flytten. Ett fall som håller i sig på en viss sida betyder oftast en saknad omdirigering. 📄 `platforms-and-migration.md` (en källa – bänken); 📄 Google (sitemaps, indexering, sökfrågor, loggar).
- Kontrollen att ingen gammal adress ger 404 utan beslut körs igen mot den publicerade adressen (→ `guide/2-8-teknik-och-kvalitet.md`). Screaming Frogs listläge med *Always Follow Redirects* ger slutmål, antal steg och tillfälliga omdirigeringar i kedjan (→ `verktyg.md`).
- Kunden byter sina egna länkar: Google-profilens webbplats och bokningslänk, sociala medier, kataloger och trycksaker (→ *Kundens lyft*, `guide/1-kundens-vag.md`).

## Kontrollen

`kontrollera_omdirigeringar.py` i den här skillen läser de gamla adresserna (sitemaps, textlistor eller sparade sidor), `public/_redirects` och `dist/`, och skriver ut ett utfall per adress. Den stoppar på adresser utan beslut, regler utan statuskod, mål som saknas och kedjor, och varnar när fler än tre regler pekar på startsidan. Ett medvetet 404 skrivs som en kommentarsrad i `_redirects` som nämner adressen.

```
python3 .claude/skills/omfattning/kontrollera_omdirigeringar.py sites/<namn> --gamla sites/<namn>/befintlig/html
```
