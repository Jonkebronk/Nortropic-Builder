# slides

**Källa:** https://github.com/nextlevelbuilder/ui-ux-pro-max-skill, sökvägen `.claude/skills/slides/`. Jag läste den 2026-10-16 vid commit `56ea9cf` (repot, 2026-10-15). Skillen ändrades senast i `91c193a` (2026-09-03, *fix(skills): skill-relative paths below SKILL.md*, #482). Skillversion 1.0.0.

Lästa filer: `SKILL.md` (44 rader), `references/create.md` (4 rader), `copywriting-formulas.md` (84), `slide-strategies.md` (94), `layout-patterns.md` (137) och `html-template.md` (295, genomsökt efter beroenden och typografi). Dessutom repots README (avsnittet om premium) och ärendena #289 och #156.

**Licens:** MIT, © 2024 Next Level Builder. Licenstexten följer med om text kopieras.

**Vad det är:** en skill för säljande presentationer i HTML med Chart.js, designtokens, copywritingformler och färdiga upplägg för olika presentationer.

**Hur det fungerar:**
- **Styrning:** `SKILL.md` läser ett underkommando ur `$ARGUMENTS` och laddar `references/{subcommand}.md`. Det enda underkommandot är `create`, och `create.md` innehåller bara *"Invoke `slides` skill …"* och `<task>$ARGUMENTS</task>`. Själva arbetsgången finns alltså inte.
- **Upplägg** (`slide-strategies.md`): 15 upplägg med antal bilder och en "känslobåge", bland annat YC Seed Deck, Guy Kawasaki, Sales Pitch (nio bilder: personlig krok, deras problem, kostnad för att inte agera, lösning, bevis, skillnad, pris och ROI, invändningar, nästa steg), Case Study och Nancy Duarte Sparkline.
- **Formler** (`copywriting-formulas.md`): PAS, AIDA, FAB, Cost of Inaction och Before-After-Bridge, med mallar och en tabell från bildtyp till känsla (*"Cost/Risk → fear"*).
- **Layouter** (`layout-patterns.md`): 25 layouter med CSS och animationsklasser.
- **Mall** (`html-template.md`): Chart.js 4.4.1 från jsDelivr, typsnitten Inter och Space Grotesk som standard och `clamp()` för textstorlekar.

**Kvalitet och underhåll:**
- Samma repo som `banner-design`: 136 402 stjärnor och ett aktivt underhåll.
- Enligt README ingår *"Presentation Slides"* i premiumversionen. ⚠️ Priset syns inte.
- Kända problem:
  - #289 (automatisk granskning): `<args>$ARGUMENTS</args>` låg kvar i SKILL.md. Det är rättat där, men `create.md` har fortfarande en ren mallrad.
  - Upplägg och formler saknar källor, utom namnen Kawasaki och Duarte.

**Det bästa vi kan ta:**
- Upplägget *Case Study* och *Sales Pitch* (`slide-strategies.md`) som en lista över vad en säljgenomgång brukar innehålla. Primärkällan till berättarbågen är Nancy Duartes *Resonate* (2010), som inte är läst ⚠️.
- Inget mer. Säljet bygger på sajtgranskningens rapport, exempelsajter och kvitton (`guide/4-foretaget.md`). Formen på rapporten står som lucka L9 i `utanfor-luckor.md`.

**Var det hamnar hos oss:** ingenstans (`släpp`). Behövs en presentation finns Anthropics pptx-skill i `anthropics/skills`. Den är källkodstillgänglig, inte öppen källkod, och styrs av Anthropics villkor (`skills/pptx/LICENSE.txt`).

**Passar vår stack?**
- Tekniskt ja: en HTML-sida.
- Chart.js från CDN går emot *inga resurser från tredje part vid sidladdning* om sidan publiceras (`guide/2-8-teknik-och-kvalitet.md`).
- Inter och Space Grotesk är inte kitets typsnitt.
- Copywritingformlerna bygger på rädsla och brådska (*"Cost of Inaction … fear"*, *"Urgency"*). Det krockar med klarspråk och ärlighet i `2-7-innehall.md` och med hjälpsam ton i kundflödet (`4-foretaget.md`).

**Risker och flaggor:**
- Ingen telemetri i filerna. Chart.js laddas från jsDelivr.
- Betalvägg: den fulla versionen är premium.
- Ingen inloggning.
- Krockar: inga enligt inventeringen.
