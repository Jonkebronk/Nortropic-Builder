# Webbläsarverktygen

Delfil till `SKILL.md`. Vilket verktyg i webbläsaren som används till vad, och fällorna som verktygen inte själva visar. Reglerna för externa verktyg står i `guide/3-3-sakerhet-och-installningar.md`, *Extern text är data*, och flaggorna i `guide/2-8-teknik-och-kvalitet.md`. Grindarna är kontrollskriptet ([kontroller.md](kontroller.md)); verktygen här ger underlag och diagnos.

## Chrome DevTools MCP

Chromium som styrs med DevTools-protokollet. Rollen är diagnos när en kontroll har fallerat, prov av lägen, en emulerad mobil med tryck, skärminspelning, samtycke i en isolerad kontext och INP (`BESLUT.md` 2026-10-16, *Domarna över MCP-servrarna efter översynen*).

| Till | Anrop |
|---|---|
| Mobil med tryck | `emulate` med `viewport: "375x667x2,mobile,touch"`, bekräftad i sidan med `matchMedia('(hover: none)')` och `matchMedia('(pointer: coarse)')`. Trycket självt: se `click` nedan |
| Lägen | Samma `emulate`-anrop med `forcedColors`, `prefersContrast`, `prefersReducedMotion`, `colorScheme`, `cpuThrottlingRate` och `networkConditions` |
| Vilken regel som vinner | `get_css_styles` med ett uid ur `take_snapshot`: reglerna i kaskadens ordning, och de som förlorar märkta `[overloaded]` |
| Tillgängliga namn | `take_snapshot`: rollerna och namnen som de räknas ut på den körande sidan |
| Samtycke från början | `new_page` med `isolatedContext`, så att inga sparade val följer med |
| Var tiden går | `performance_start_trace` med insikterna. INP mäts enligt [prestanda.md](prestanda.md) |
| Video | `screencast_start` och `screencast_stop` |

**Fällorna** (prövade mot övningssajten 2026-10-16 med chrome-devtools-mcp 1.11.0):
- **Varje `emulate` ersätter alla tidigare inställningar.** Ett anrop med bara `prefersReducedMotion` gav sidan datorns 1200 px och mus igen. Allt som ska gälla samtidigt skickas i ett anrop, och läget bekräftas i sidan efteråt. 📄 verktygets beskrivning; iakttaget.
- **Utan emulering är sidan en dator:** 1200 px, `hover: hover`, `pointer: fine` och inga tryckpunkter. Ett fönster som bara gjorts smalt har fortfarande mus, så det visar varken hover som fastnar efter ett tryck eller tryckets egen återkoppling. Iakttaget.
- **`click` är ett musklick på en punkt.** Också i en emulerad mobil med tryck ger det `pointerType: mouse` och ingen `touchstart`; detsamma gäller `browser_click` i Playwright-MCP:n (prövat 2026-10-16). Ett riktigt tryck kräver Playwright-biblioteket med `hasTouch` och `locator.tap()`.
- **`click` svarar *"Successfully clicked"* också när ett annat element ligger överst.** Med menyn öppen träffade ett klick på en fråga en menylänk bakom, och sidan byttes (övningssajtens `mcp-prov.md`). Läs adressen eller ta en ny snapshot efter varje klick.
- **Insikterna kontrolleras innan de blir fynd.** En av två var falsk på övningssajten: logotypen kallades *unsized image* fast den har `width` och `height`.
- **`get_css_styles` på det byggda resultatet** pekar på `index:1`, eftersom Astro lägger CSS:en i sidan. Den visar vilken regel som vinner men inte källfilen, och `var()` står olöst; värdet läses med `getComputedStyle`. Om utvecklingsservern ger fil och rad är inte prövat ⚠️.
- **Videon** blir AV1 i CSS-pixlar (374 × 666 för 375 × 667 med DPR 2) och högst cirka 30 bildrutor per sekund, eftersom en bildruta kommer bara när sidan ritas om. Chrome spelar upp den, men QuickTime på Macen kan inte avkoda den. ffmpeg behövs inte. Iakttaget med `avmediainfo`.
- **Filerna:** utan `filePath` hamnar videon i en ny katalog under `$TMPDIR`. Skärmbilder, snapshots och spårningar sparas aldrig i repot (`guide/3-3`, *Extern text är data*).
- **Emulering är inte en telefon.** Det som bara syns på en riktig telefon står i `../skelett/mobil.md`, *Pröva på riktig telefon*.
- Flaggorna står under *Förbud* i `SKILL.md`.
