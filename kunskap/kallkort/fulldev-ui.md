# Fulldev UI

**Källa:** <https://github.com/fulldotdev/ui>, commit `b911307` (2026-10-16). Läst 2026-10-16: README, `LICENCE`, `package.json`, `src/components/blocks/` (alla blocknamn; hero-1…13, services-1…7, reviews-1…5, faqs-1…4, contact-1…3, header-1…5 genomgångna per fil), `src/components/ui/accordion/`. Dokumentationen <https://ui.full.dev/>. Lokalt: `kallor/fulldotdev-ui/`.

**Licens:** MIT (`package.json` och `LICENCE`). Kräver att licenstexten följer med.

**Vad det är:** ett shadcn-kompatibelt komponent- och blockbibliotek i ren Astro med Tailwind 4, gjort för innehållsdrivna sajter. Det har flest färdiga sektionsvarianter av de granskade källorna: 13 hero, 7 tjänster, 5 omdömen, 4 vanliga frågor, 3 kontakt, 8 avslut och 5 sidhuvuden. Det finns också en React-version för shadcn/ui-projekt (`react/`).

**Hur det fungerar:**
- Installeras med shadcn-CLI:n: `npx shadcn@latest init https://ui.full.dev/r/styles/base-vega/base.json`, sedan block för block. Stilarna (Vega, Nova, Maia, Lyra, Mira, Luma, Sera, Rhea) styr radier, avstånd och ton via CSS-variabler.
- Komponenterna använder container queries (`@2xl:`), så `<body class="@container">` krävs.
- Varianterna är separata filer. Layoutidéerna (sett i klasserna):
  - Hero: centrerad (1–4, 11), delad 1:1 (5, 6, 9), asymmetrisk 2fr/3fr (7) och 1fr/3fr (8, 13), text med handlingar vid sidan (10), redaktionell med linjer över och under (12).
  - Tjänster: fyra kolumner med bild (1, 4), sidolista `16rem` + innehåll (2), två kolumner (3), ikonkort (5), fast sidospalt `20rem` som följer med vid scroll (6), tre kolumner (7).
  - Omdömen: kortrutnät (1), ett framlyft citat bredvid en lista (2, `1.3fr/1fr`), karusell (3), rullande marquee med paus (4, 5).
  - Vanliga frågor: en spalt (1, 3, 4) och fast intro bredvid frågorna (2).
  - Kontakt: fyra kontaktvägar i rutnät (1), innehåll + sidokort `22rem` (2), fast bild bredvid (3).
- Dragspelet (`ui/accordion`) styrs av skript; innehållet har `hidden` som standard.

**Kvalitet och underhåll:** 614 stjärnor, push 2026-10-16, 1 öppet ärende, 21 bidragsgivare (GitHub-API 2026-10-16). Det öppna ärendet: `SectionGrid` blir för stort med ett eller två objekt. Repot har `html-validate`, `linkinator` och tester.

**Det bästa vi kan ta:**
- Variantidéerna ovan, som underlag när varje sektion får 2–3 varianter (`guide/2-4-skelett.md`, N2).
- Sidospalten som följer med (`sticky`) för tjänster och vanliga frågor på datorn.
- Det framlyfta omdömet bredvid en lista (reviews-2).

**Var det hamnar hos oss:** biblioteket (varianter), med `skill: skelett`, delfilen `varianter.md`, som pekar dit.

**Passar vår stack?** Ja, ren Astro utan React, och Tailwind är tillåtet sedan 2026-10-16. Tokens mappas från shadcn-namnen till kitets `--k-*`. JavaScript-kostnad: noll för de statiska blocken; dragspel, karusell (Embla) och marquee har egna skript. Dragspelet döljer svaren utan JavaScript och byts mot `<details name>`.

**Risker och flaggor:**
- Dragspelet bryter *HTML först*.
- Karusell och marquee strider mot "inga automatiska bildspel" (`guide/2-4-skelett.md`); marquee har visserligen en pausknapp (`MarqueeToggle`), men rörelsen startar av sig själv.
- Ungt bibliotek med en huvudutvecklare; stilnamnen är desamma som Basecoats, vilket tyder på gemensam shadcn-förebild.
- Kräver `<body class="@container">`, vilket påverkar hela sidan.

**Inloggning:** krävs inte.
