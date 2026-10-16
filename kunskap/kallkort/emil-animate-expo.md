# emil-animate-expo

**Källa:** https://github.com/emilkowalski/skills, sökvägen `skills/animate-expo/`. Jag läste den 2026-10-16 vid commit `2d22863` (repot, 2026-10-11). Skillen ändrades senast i `85e8e23` (2026-09-15, *Remove course mention*).

Lästa filer: `SKILL.md` (263 rader, hela), rubrikerna i `RECIPES.md` (385 rader) och recepten *Setup*, *Toast* och *Firing something once at a threshold*, repots `README.md` och `LICENSE` och ärendelistan (#12–#32).

**Licens:** MIT, © 2026 Emil Kowalski. Licenstexten följer med om text kopieras.

**Vad det är:** en byggskill för animationer i React Native och Expo. Den fattar besluten i en fast ordning (ska det animeras, varför, vilket verktyg, vilka egenskaper, fjäder eller tid, vilken tråd) och skriver koden med Reanimated 4, Gesture Handler, Expo Router och expo-haptics.

**Hur det fungerar:**
- **Grind efter frekvens:** det som sker 100+ gånger om dagen animeras inte. Det som sker tiotals gånger får under 150 ms. Det som sker sällan får en vanlig animation, och förtjusning sparas till det sällsynta.
- **Syftet namnges med ett ord:** återkoppling, rumslig konsekvens, tillstånd, mjuk övergång, förklaring eller förtjusning. Går syftet inte att namnge byggs inget.
- **Billigaste verktyget först:** CSS-övergång i Reanimated, layoutanimation, delade värden för gester och plattformens egna övergångar (native stack, `formSheet`, `NativeTabs`).
- **Egenskaper:** bara `transform` och `opacity`. Aldrig `scale(0)`, utan 0,9–0,97 plus opacitet.
- **Fjäder när ett finger var inblandat,** annars tid. Aldrig `ease-in` på UI. Egna Bézierkurvor anges.
- **Haptik:** samma bildruta som det visuella, en per handling och aldrig den enda återkopplingen.
- **Reducerad rörelse levereras med animationen** och betyder färre och mildare rörelser, inte inga. Textskalning gör uppmätta höjder fel.
- **Känslan bedöms i en releasebygge på den långsammaste enheten,** aldrig i Expo Go eller simulatorn.

**Kvalitet och underhåll:**
- Repot har 46 586 stjärnor, 2 677 forkar och omkring 3 bidragsgivare, och 4 ärenden är öppna. README säger att skillsen bygger på upphovsmannens erfarenhet från Vercel och Linear.
- Kända problem i repot:
  - #29: `animate` och `find-animation-opportunities` hänvisar till skills som modellen inte kan anropa.
  - #26: fel i `ask-sonner`.
  - Inga ärenden om just `animate-expo`.
- ⚠️ Påståendena om Reanimated 4 (`scheduleOnRN` ersätter `runOnJS`, `.get()`/`.set()`) och om Expo SDK är inte kontrollerade mot Reanimateds dokumentation, eftersom vi inte bygger appar.

**Det bästa vi kan ta:** inget som inte redan finns i webbskillsen med samma upphovsman. Principerna som gäller också på webben är frekvensgrinden, syftet med ett ord, ingen `ease-in`, ingen `scale(0)`, att reducerad rörelse betyder färre och mildare rörelser, utgång cirka 20 % snabbare än ingång (*Toast*-receptet) och 44 px som minsta träffyta. Alla finns i `animate` och `emil-design-eng`, som bedöms i rörelselagret (→ `guide/2-6-rorelse.md`).

**Var det hamnar hos oss:** ingenstans (`släpp`). Nortropic bygger webbsajter, inte appar.

**Passar vår stack?** Nej. React Native, Expo och Reanimated körs inte i Astro. Det som går att överföra är principer, inte kod.

**Risker och flaggor:**
- Ingen telemetri i skillen. Installation via `npx skills add` skickar telemetri till skills.sh, som går att stänga av med `DISABLE_TELEMETRY=1`. Vi installerar inte.
- README länkar till ett nyhetsbrev (aiforui.dev).
- Ingen betalvägg och ingen inloggning.
- Krockar: inga enligt inventeringen.
