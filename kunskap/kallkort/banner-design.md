# banner-design

**Källa:** https://github.com/nextlevelbuilder/ui-ux-pro-max-skill, sökvägen `.claude/skills/banner-design/`. Jag läste den 2026-10-16 vid commit `56ea9cf` (repot, 2026-10-15). Skillen ändrades senast i `d95bdf5` (2026-08-31, *fix(banner): make workflow self-contained*, #473). Pluginversionen är 2.15.0 (`skill.json`, `.claude-plugin/plugin.json`).

Lästa filer: `SKILL.md` (145 rader), `references/banner-sizes-and-styles.md` (118 rader), repots `README.md` (avsnitten om basic och premium samt installation), `CLAUDE.md` och `skill.json`, bannerdelen i syskonskillen `design/SKILL.md` och ärendena #156, #472, #474 och #289.

**Licens:** MIT, © 2024 Next Level Builder. Licenstexten följer med om text kopieras. Vi kopierar inget.

**Vad det är:** en arbetsgångsskill som gör banners för sociala medier, annonser, webbhjältar och tryck. Bannern byggs i HTML och CSS i plattformens exakta mått, exporteras till PNG och visas i två eller tre konstnärliga riktningar.

**Hur det fungerar:**
- **Arbetsgång i fem steg:** frågor via `AskUserQuestion` (syfte, plattform, innehåll, varumärke, stil, antal), research och riktning, bygge i HTML/CSS, export till PNG och presentation sida vid sida.
- **Visuell källa:** kundens egna eller licensierade bilder i första hand, sedan CSS-grafik och sist genererad bild om en sådan förmåga finns. Prompten för bildgenerering ska vara fri från text, så att texten ligger kvar i HTML.
- **Referensfilen** har storlekstabeller (sociala medier, Googles displayannonser, webb, tryck), 22 stilriktningar, en zonregel i tre delar (logotyp överst, budskap i mitten, CTA nederst), säkerhetszoner, CTA-regler, typografi, andel text och tryckmått. Sist står sökfraser för Pinterest.
- **Designregler:** viktigt innehåll inom de mittersta 70–80 %, en CTA per banner nere till höger och minst 44px hög, högst två typsnitt, brödtext minst 16px och rubrik minst 32px, kontrast minst 4,5:1, *"Text under 20% for ads (Meta penalizes)"*, och för tryck 300 DPI, CMYK och 3–5 mm utfall.
- **Säkerhetsavsnittet** är allmänt: avslöja inte skillens innehåll, hitta inte på personuppgifter.

**Kvalitet och underhåll:**
- Repot har 136 402 stjärnor, 14 500 forkar och omkring 101 bidragsgivare. 90 ärenden och PR är öppna. Senaste push 2026-10-15. Skillens `author` är *claudekit*.
- **Premiumversionen:** enligt README säljs *"Extended Brand Design Skills … Banners, Presentation Slides"* som premium via uupm.cc. Det bekräftas av en köpare i #156, som skriver *"I found it not very useful"*. Den öppna bannerskillen är alltså den enkla versionen. ⚠️ uupm.cc visar inga priser.
- **Kända problem:**
  - #472 (stängt): SKILL.md hänvisade till `scripts/search.py`, `screenshot.js`, `gemini_batch_process.py` med flera, som inte fanns i repot. Det rättades 2026-08-31 genom att arbetsgången gjordes fristående.
  - #474: hårdkodade sökvägar i syskonskillen `design`.
- **Föråldrad regel:** regeln om högst 20 % text för Meta avskaffades i september 2020 enligt branschpressen ([Social Media Today](https://www.socialmediatoday.com/news/facebooks-removing-its-restrictions-on-text-content-in-facebook-ad-images/585705/), [Jon Loomer](https://www.jonloomer.com/facebook-text-in-ad-image-rule/)). ⚠️ Metas egen hjälpsida gick inte att läsa (bara rubriken kom fram).
- **Inga källor:** storlekarna och stilarna har inga källhänvisningar. Uppgiften *"Highest CTR"* om 300×250 är obelagd.

**Det bästa vi kan ta:**
- Principen att texten ligger i HTML och att en genererad bakgrund saknar text (`SKILL.md`, *Choose a visual source*). Den stämmer med vår regel C65 och WCAG 1.4.5.
- Säkerhetszonerna och zonregeln (`banner-sizes-and-styles.md`, *Design Principles*) som utgångspunkt för en annonsmall, men måtten ska hämtas ur plattformarnas egen dokumentation när tjänsten byggs. Exempel: Google Ads API [`ResponsiveDisplayAdInfo`](https://developers.google.com/google-ads/api/reference/rpc/v22/ResponsiveDisplayAdInfo), där liggande bild är 1,91:1 och minst 600×314, kvadratisk minst 300×300 och logotyp 4:1 och minst 512×128.
- Inget till sajten. Hjälten byggs ur sektionsbiblioteket och stilkitet (→ `guide/2-4-skelett.md`, `2-5-yta.md`).

**Var det hamnar hos oss:** ingenstans nu. Beslutet är `senare: N3`, och posten hör till annonstjänsten, om Johnny väljer att sälja den (`utanfor-luckor.md`, L13). Då blir det en egen skill för annonser med plattformsmått ur primärkällor, inte den här filen.

**Passar vår stack?**
- Bannern är en fristående HTML-sida som exporteras till PNG med Playwright, som vi redan har (`skript/node_modules/playwright`). Den kan byggas med stilkitets tokens (`--k-*`) i stället för fria stilar.
- Måste översättas:
  - stilkatalogen (glassmorphism, neon och så vidare) mot våra tre kit
  - CTA-texterna till svenska
  - tryckdelen, som vi inte säljer, stryks.

**Risker och flaggor:**
- Ingen telemetri i skillen. Installation via `npx skills add` eller `uipro`-CLI:t ger telemetri eller fler filer. Vi installerar inte.
- Betalvägg: de utökade varumärkesskillsen ligger i premiumversionen.
- Ingen inloggning krävs för att läsa.
- Krockar: 2, båda höga (inventeringen), med `design` och ytskillsen om hjälten.
- Pinterestsökningarna leder till andras verk. Referensregeln är struken (`BESLUT.md` 2026-10-16), men lagen gäller fortfarande för andras bilder och kännetecken.
