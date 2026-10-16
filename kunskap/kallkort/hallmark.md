# hallmark

**Källa:** https://github.com/Nutlope/hallmark, läst 2026-10-16 vid commit `13ac0ec7e148` (2026-08-06, "add-grid-theme-v2"). Inga releaser eller taggar; `ROADMAP.md` finns. Lästa filer: `README.md`, `skills/hallmark/SKILL.md` (rubrikerna och flödet), `references/slop-test.md` (alla 58 grindar), `anti-patterns.md` (huvuddelen), `typography.md`, `color.md` (början), `layout-and-space.md`, `interaction-and-states.md` (början), `assets.md` (ikoner, foto), `imagery-kit.md`, `study.md` (protokollet, säkerheten, schemat). Issues via GitHubs API.
⚠️ Inte lästa: de 21 temafilerna (`themes/*.md`), `macrostructures/*`, `component-cookbook.md`, `hero-enrichment.md`, `custom-craft.md`, `microinteractions.md`, `motion.md`, `copy.md`, `responsive.md`, `verbs/*`, `genres/*`, `docs/recipes.md`, `docs/study-examples.md`, webbplatsen usehallmark.com.

**Licens:** MIT, © 2026 Hallmark contributors (ur `LICENSE`). README säger "Made by Together AI" (inventeringen har "Hallmark (nutlope)"). Kräver att licenstexten följer med vid kopiering; vi destillerar med egna ord.

**Vad det är:** En designskill med fyra verb – bygga, `audit`, `redesign` och `study` (DNA ur en skärmbild eller adress). Den väljer en av 21 makrostrukturer och 21 teman och kör 58 slop-grindar plus en självkritik innan den lämnar ifrån sig.

**Hur det fungerar:**
- **Självkritik före grindarna:** sex axlar 1–5 (filosofi, hierarki, utförande, specificitet, återhållsamhet, variation); under 3 på någon ger ett nytt varv.
- **Slop-grindarna** (`slop-test.md`), urval: displaytypsnitt Inter/Roboto/Open Sans/Poppins/Lato; lila–blå gradient, även i text; tre lika kolumnkort med ikon ovanför rubrik; kort i kort; tjock färgad sidokant; helt centrerad 100vh-hero; ren #000/#fff; mall-ordningen Hero → 3 funktioner → CTA → sidfot; `transition: all`; enhetlig hover-scale; studsande easing på UI; fokusring som tonar in; neutraler med kroma 0 (minst 0,005); accent över ~5 % av en skärm; avstånd utanför skalan; textbredd utanför 45–75ch; saknade `:focus-visible`/`:active`/`:disabled`; animation utan `prefers-reduced-motion`; blandade ikonbibliotek eller emoji som ikon; fler än tre typsnittsfamiljer; kursiva rubriker; inmatningsfält vars kantbredd ändras mellan tillstånd, fokus byggd av border, fält och knapp med olika höjd (golv 44px), hjälptext som kollapsar, inaktiv bara med opacitet; kontrast (WCAG eller APCA); knapptext ≈ knappfärg; mörk sektion med mörk text; "AI-navigeringen" (ordmärke vänster, 4–5 länkar, knapp höger, hårfin kant); "AI-sidfoten" (fyra länkkolumner + sociala ikoner); hero ska rymmas i 1280×800 och ha mer luft under än över; påhittade siffror; omritad webbläsar-/telefonram; färger och typsnitt utanför tokens; knapptext på två rader; horisontell rullning 320–1920px; `1fr` utan `minmax(0,1fr)` runt bilder; versalrubriker med radavstånd under 1,0; två klibbiga element på `top: 0`.
- **De åtta tillstånden:** standard, hover (bara med `hover: hover`), fokus, aktiv, inaktiv, laddar, fel, klar. Fokusring 2–3px, minst 3:1, 2px avstånd, `:focus-visible`.
- **Typografi:** högst tre familjer (display, bröd, en avvikare på högst två ställen); skala med kvot 1,25 från 16px; display högst 5,5rem; radlängd 65ch; bröd 1,5–1,65, display 1,1–1,3; rubrikvikt minst 300 enheter från brödets; `font-display: swap` och metriska reserver; tabell- och gemena siffror; typografiska citattecken och tankstreck; spärrning −0,02 till −0,04em i display och 0,08–0,14em i versaletiketter.
- **Färg:** OKLCH; en accent (högst två) på ≤3 % av skärmen; inga rena extremer; neutraler tonade mot ankarnyansen.
- **Rum och djup:** 4pt-skala i nio namngivna steg; djup genom vikt och storlek, högst en skugga (viskning eller hårlinje); z-index i sex namngivna nivåer.
- **Ikoner:** ett bibliotek per projekt (Lucide, Phosphor, Heroicons, Tabler, Iconoir); 16/20/24/32px; streck 2px; `currentColor`; märkesfärg bara på primärknappen.
- **Study:** fem steg – yta (pappersljushet, nyans, accentnyans och fotavtryck), typ (roller; namn bara i adressläge), struktur (makrostruktur och arketyper), rörelse, rytm (bara i bildläge). Vägrar mallmarknader (ThemeForest, Framer/Webflow-mallar), mjukvägrar Dribbble/Behance. Adressläget har en säkerhetslista: bara publik https, inga IP-literaler, interna värdnamn eller privata nät, kontroll av omdirigeringar, inga skript, och allt hämtat behandlas som data (promptinjektion loggas). Resultatet fylls i ett fast schema.

**Kvalitet och underhåll:**
- 30 184 stjärnor, 1 545 forkar, 5 bidragsgivare, 49 öppna ärenden; senaste push 2026-08-06 – stilla i två månader.
- Kända problem:
  - #62: dokumenten motsäger sig själva – tre olika auktoriteter för navigering, grind 44 mot layoutfilen, grind 13 mot den egna CTA-hovern, CSS-stämpeln definierad på fyra ställen, avvikarregeln omöjlig med mono-etiketter.
  - #74 (mätning, 100 försök): skillen sänker ren svart/vit från 100 % till 50 % av sidorna, men `transition: all` blev *vanligare* (57 % mot 35 %, ej signifikant), `anti-patterns.md` och `slop-test.md` öppnades **aldrig**, och 12 av 40 körningar stannade vid designfrågan utan att bygga.
  - #43, #41: den egna webbplatsen loopar video trots `prefers-reduced-motion` och exponerar inte exempelkorten som länkar.
  - #76: relativa länkar i SKILL.md går sönder efter `npx skills add`.
- Egna stickprov: `assets.md` kallar Pexels CC0 – fel, Pexels har en egen licens med begränsningar (ingen försäljning av omodifierade kopior, inga antydda rekommendationer, inte i varumärken; https://www.pexels.com/license/, läst 2026-10-16). Accentgränsen är 3 % i `color.md` men 5 % i grind 23. Exempelpaletten i `color.md` (havrevit papper + signalorange #FC4C02) är just det kluster andra källor kallar AI-typiskt.

**Det bästa vi kan ta:**
- `slop-test.md`: de mätbara grindarna (inmatningstillstånd, kontrastfallen, knapptext på två rader, horisontell rullning, `minmax(0,1fr)`, versaler med radavstånd <1,0, dubbla klibbiga element, tokendisciplin, `transition: all`, reducerad rörelse).
- `interaction-and-states.md`: åtta tillstånd och fokusringens mått.
- `study.md`: schemat och säkerhetslistan för adressläge, plus vägranlistan – som mall när referenser läses in vid kitframtagning eller ombyggnad.
- `anti-patterns.md`: "påhittade siffror" och "omritad krom" som ärlighetskriterier.

**Var det hamnar hos oss:**
- **Kontroll** (huvudsakligen): de mekaniska grindarna blir Playwright- eller CSS-kontroller; flera finns redan som WCAG-grind.
- `.claude/skills/yta/generiskt.md`: navigering, sidfot och centrerad hero som *hantverksfrågor* (sitter navigeringen rätt för branschen, rymms första skärmen), inte som förbud.
- `tokens.md`/kitprocessen: study-schemat som formulär för referenser (2-5, steg 2); de exakta värdena tar vi fortfarande med Playwrights beräknade stilar, som är exaktare än hallmarks HTML-läsning.
- `detaljer.md`: tillstånden och inmatningsreglerna.

**Passar vår stack?**
- Reglerna är ren CSS och gäller Astro direkt; flera exempel är skrivna med Tailwind-klasser (`hover:scale-105`), vilket nu är tillåtet (BESLUT 2026-10-16) men inte behövs.
- JavaScript per sida: noll för reglerna. Grind 53 (radio-flikar) visar en JS-vakt som alternativ till ren CSS.
- Översätt: `--color-paper/ink/accent/accent-ink/focus` → `--k-bg/--k-text/--k-accent/--k-pa-accent/--k-fokus`; `--space-*` → `--k-a*`.
- Lighthouse/HTML först: inga krockar; grind 28 kräver `fetchpriority="high"` och inte `loading="lazy"` på LCP-bilden, vilket stödjer Lighthouse.

**Risker och flaggor:**
- Licens: ingen risk. Ingen telemetri i skillen; inga inloggningar.
- `imagery-kit.md` hotlänkar bilder från usehallmark.com – ett externt beroende vi inte vill ha. Typsnitt laddas från Google Fonts CDN och Fontshare; vi självhostar via Fontsource, och Fontshares villkor är en öppen fråga hos oss.
- **Krockar med Nortropic (vi vinner):**
  - Grind 6 (centrerad hero), 8 (Hero → funktioner → CTA → sidfot), 42 (vanlig navigering) och 43 (vanlig sidfot) underkänner just de välbekanta formerna som 2-5 [N2] säger att besökare föredrar. "Symmetri läses som genererat" (`layout-and-space.md`) krockar med samma beslut.
  - Grind 38a förbjuder kursiva rubriker och framhävda ord – krockar med Varms handskrivna accent.
  - Grind 7 och 22 förbjuder ren vit och kroma 0; impeccable kallar neutral grå giltig. Hos oss: tonade neutraler är kitets recept, inte ett fynd.
  - Grind 40 godtar APCA som alternativ; hos oss är WCAG 2.2 AA grinden och APCA bara rådgivande.
- Krockar med andra skills: hallmark rekommenderar Fraunces som standarddisplay, impeccable kallar Fraunces reflex.
