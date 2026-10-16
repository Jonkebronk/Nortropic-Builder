# ui-ux-pro-max

**Källa:** https://github.com/nextlevelbuilder/ui-ux-pro-max-skill, läst 2026-10-16 vid commit `56ea9cf174ed` (2026-10-15). Senaste release v2.15.0 (2026-08-13); npm-paketet `ui-ux-pro-max-cli`. Lästa filer: `README.md` (början), `.claude/skills/ui-ux-pro-max/SKILL.md` (prioritetstabellen och flödet), datan i `src/ui-ux-pro-max/data/`: `typography.csv` (alla 74 par), `ux-guidelines.csv` (alla 119 rader, nio i sin helhet), `styles.csv` (alla 88 namn, sju i detalj), `motion.csv` (sex rader), `stacks/astro.csv` (alla 53 rader), `google-font-licenses.json`, `google-fonts.csv` (huvud), `data-provenance.json` (sammanställd). Issues via GitHubs API.
⚠️ Inte lästa: `colors.csv`, `products.csv`, `ui-reasoning.csv` (branschpaletterna – utanför uppdraget), `landing.csv`, `charts.csv`, `icons.csv`, `app-interface.csv`, `react-performance.csv`, övriga 21 stackfiler, `references/quick-reference.md`, Python-skripten (inte körda), CLI-koden, webbplatsen uupm.cc.

**Licens:** MIT, © 2024 Next Level Builder (ur `LICENSE`). Kräver att licenstexten följer med vid kopiering av data. Typsnittsdatan härleds ur google/fonts METADATA.pb, vars typsnitt har egna licenser (OFL, Apache-2.0, UFL).

**Vad det är:** En sökbar designdatabas med ett Python-sökverktyg (BM25) och en "design system"-generator: 79 stilar (50 aktiva), 192 branschpaletter och resonemangsprofiler, 74 typsnittspar, 119 UX-riktlinjer, 105 ikoner, 17 GSAP-förinställningar och riktlinjer för 22 stackar.

**Hur det fungerar:**
- Agenten kör `search.py` mot CSV-filerna per domän (`ux`, `style`, `typography`, `color`, `gsap` …) och sätter ihop ett designsystem i fem parallella sökningar. Regelprioritet 1–10: tillgänglighet, touch, prestanda, stilval, layout, typ och färg, rörelse, formulär, navigering, diagram.
- **Typsnittspar:** namn, kategori, rubrik + bröd, stämningsord, användning, Google Fonts-URL, CSS-import, Tailwind-konfig, anteckning.
- **UX-riktlinjer:** kategori, problem, plattform, beskrivning, gör/gör inte, kodexempel, allvarlighet.
- **Stilar:** 29 kolumner, bl.a. färger, effekter, tillgänglighetsrisk, prestandakostnad, era, CSS-nycklar och designvariabler.
- **Ursprungsdata:** `data-provenance.json` har 51 poster: 52 officiella källor (W3C WAI, Apple, Material, Fluent, Polaris, Spectrum) och 62 härledda. Källorna hänger på datasetnivå och på designsystemstilarna – **de flesta enskilda rader har ingen källa**.

**Kvalitet och underhåll:**
- 136 403 stjärnor, 14 500 forkar, cirka 101 bidragsgivare, 90 öppna ärenden; push 2026-10-15. Mycket aktivt.
- Kända problem: #263 "This skill designs pages like shit with chaos" (en användare: med skillen blev sidan rörig och det viktiga hamnade inte på första skärmen); #215 installationsfel `--global` (21 kommentarer); #156 bekräftar en betald premiumversion (fler skills, bildgenerering, "mer omfattande tokenarkitektur").
- **Stickprov på datan:**
  - ✔ WCAG-raderna är korrekta och nyanserade: 2.5.8 målstorlek 24×24 CSS-px är AA (#104), 2.4.13 fokusutseende är AAA och märks så (#102), 2.4.11/2.4.12 fokus som inte döljs (#100–#101), tillgänglig autentisering (#107). 44pt/48dp (#22) stämmer med Apple och Material.
  - ✘ #1 "smooth scroll" med allvarlighet *High* saknar källa och ska stängas av vid `prefers-reduced-motion`; #82 toast som stängs efter 3–5 s kan krocka med WCAG 2.2.1 för viktiga meddelanden; #15 z-index 10/20/30/50 är godtyckligt.
  - ✘ `stacks/astro.csv` rad 20 rekommenderar `Astro.glob`, som avråddes 2024 och togs bort i Astro 6 (ersatt av `import.meta.glob`).
  - ✘ Stilarna: "Brutalism – era 1950-talet, färger #FF0000/#0000FF/#FFFF00" blandar ihop arkitekturbrutalism och De Stijl; "Glassmorphism – prestandakostnad låg" utan mätning (backdrop-filter har känd kostnad); "Soft UI Evolution – förbättrad kontrast" använder CSS-namnfärger som skyblue #87CEEB (1,74:1 mot vitt); "Neumorphism (Mobile)": dämpad #6B7280 på #E0E5EC 3,82:1 och accent #6C63FF på samma 3,41:1 – båda under 4,5:1.
  - ✘ Typsnittsparen saknar källor och är till stor del just de vanligaste valen (Inter, Poppins, Open Sans, Playfair, Montserrat, Space Grotesk, DM Sans). Påståenden som "Lexend – designat för läsbarhet, utmärkt tillgänglighet" är designavsikt, inte belagd effekt ⚠️ overifierat.
  - ✔ `google-font-licenses.json` (1 934 familjer: OFL 1 894, Apache-2.0 35, UFL 5) stämmer i stickprov: Inter, Roboto, Fraunces, Familjen Grotesk, Atkinson Hyperlegible Next och Source Serif 4 = OFL; Ubuntu-familjen = UFL.

**Det bästa vi kan ta:**
- `google-font-licenses.json` + `google-fonts.csv` (licens, delmängder som `latin`/`latin-ext`, vikter, variabla axlar) som underlag för vår kuraterade OFL-lista (2-5) – efter kontroll mot google/fonts.
- WCAG 2.2-raderna i `ux-guidelines.csv` (#99–#119) som färdiga kontrollformuleringar med rätt nivå.
- Prioritetstabellen i `SKILL.md` som ordning för granskning.
- Typsnittsparen bara som *lista att undvika eller pröva*, inte som rekommendationer.

**Var det hamnar hos oss:**
- **Kontroll:** WCAG-raderna som underlag för kontrollerna i bilaga C (de flesta finns redan via axe; 2.4.11 fokus som döljs av klibbig navigering och 2.5.8 målstorlek är värda en egen Playwright-kontroll).
- `.claude/skills/yta/typografi.md`: licens- och delmängdsdatan som hjälp när kit väljer typsnitt.
- Inte stilarna, paletterna eller typsnittsparen som regler – för låg datakvalitet.

**Passar vår stack?**
- Datan är CSV/JSON och stackneutral. Den har en egen `astro.csv` (öar, `client:visible`, nollJS som standard, `astro:assets`) som stämmer med vårt sätt – utom rad 20 (`Astro.glob`).
- Typsnittsparen ger Google Fonts-URL:er och Tailwind-konfig. Tailwind är tillåtet sedan BESLUT 2026-10-16; Google Fonts-CDN ersätts av Fontsource (självhostat).
- `motion.csv` är GSAP-recept med React-kod; tillåtet tekniskt, men GSAP + React-ö kostar JavaScript per sida ⚠️ (inte mätt) och elastisk easing (#3) krockar med sparsam rörelse.

**Risker och flaggor:**
- Licens: MIT; typsnitten har egna licenser (UFL för Ubuntu är inte OFL).
- **Betalvägg:** en premiumversion finns (uupm.cc, #156); repot är den fria delen.
- **Skript:** skillen kör Python-skript och en CLI; vi läser bara datan och kör inget. ⚠️ En katalogsajt (skills.sh) ska ha flaggat skillen som hög risk – overifierat, inte kontrollerat här.
- Ingen inloggning för datan. Telemetri i CLI:t är inte kontrollerad ⚠️.
- **Krockar med Nortropic (vi vinner):** stilarna har ren #000/#fff och kontrastfel (WCAG 2.2 AA är grind); typsnittsparen bygger på Google Fonts-CDN; branschpaletterna (utanför uppdraget) skulle vara fri färgsättning per bransch i stället för kitets accent.
- **Krockar med andra skills:** typsnittsparen är det impeccable och hallmark kallar reflexval; stilkatalogen tillåter glas, aurora och neumorfism som andra skills förbjuder.
