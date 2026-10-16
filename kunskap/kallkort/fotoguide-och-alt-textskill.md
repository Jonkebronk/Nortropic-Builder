# Fotoguide och alt-textskill

**Källa:** alla lästa 2026-10-16.
- **Google Business Profile:**
  - https://support.google.com/business/answer/6123536 (kategorier, inget datum)
  - https://support.google.com/business/answer/6103862 (format och video, inget datum)
  - https://support.google.com/business/answer/7213077 (innehållspolicy)
- **Google Search Central, Image SEO:** https://developers.google.com/search/docs/appearance/google-images, uppdaterad 2026-03-02.
- **W3C WAI Images Tutorial:** https://www.w3.org/WAI/tutorials/images/. Sidorna har olika datum:
  - decision-tree: 2024-05-13
  - functional: 2017-04-12
  - informative: 2019-06-17
  - decorative: 2019-07-27
  - textual: 2017-04-12
  - complex: 2026-04-08
  - groups: 2022-02-08
  - imagemap: 2017-04-12
- **1177:**
  - Alt-texter och bildtexter: https://www.1177.se/riktlinjer-och-material/riktlinjer-for-bild-och-video/riktlinjer-for-alt-texter-och-bildtexter/, uppdaterad 2025-12-17.
  - Bildriktlinjer: …/bildriktlinjer/, uppdaterad 2025-12-30.
  - Film: …/riktlinjer-for-film/, 2025-12-17.
  - Namngivning av bilder: …/riktlinjer-for-namngivning-av-bilder-pa-1177.se/
- **DIGG Webbriktlinjer:**
  - "Beskriv med text allt innehåll som inte är text" (EN 9.1.1.1 / WCAG 1.1.1, uppdaterad 2024-05-13): https://www.digg.se/webbriktlinjer/alla-webbriktlinjer/beskriv-med-text-allt-innehall-som-inte-ar-text

**Licens:**
- Google Search Central: CC BY 4.0 för text och Apache 2.0 för kod (sidfoten).
- Googles supportsidor: ingen öppen licens, bara "©2026 Google". Referera och skriv om, kopiera inte.
- W3C WAI: W3C:s tillåtande dokument- och programvarulicens enligt sidfoten ("permissive license"). Sidan visar "Copyright © 2026 W3C". ⚠️ Exakt licensnamn står bara via länk.
- 1177: ingen licens anges. Inera äger texten. Använd den som norm att hänvisa till, inte som text att kopiera.
- DIGG: ingen licens på sidan. ⚠️ Jag hittade ingen återanvändningsvillkor.

**Vad det är:** metoden har tre delar.
- Googles fotokategorier styr vad ägaren fotograferar.
- W3C WAI:s beslutsträd avgör om en bild ska ha alt-text och vilken sort.
- 1177:s och DIGG:s regler ger den svenska formen.

Claude skriver förslaget till alt-text. Ägaren granskar.

**Hur det fungerar:**
- **Fotokrav i Google-profilen (6123536):**
  - JPG eller PNG, 10 KB–5 MB, rekommenderat 720×720 px och minst 250×250 px.
  - Kvalitet: "in focus, well lit, and have no significant alterations or excessive use of filters or AI".
  - "the image should represent reality".
  - Sidan 6103862 säger samma sak men utan "or AI".
  - Video i profilen: högst 30 sekunder, 75 MB och minst 720p.
  - Logo och omslagsbild är egna typer. Om omslagsbilden är av låg kvalitet kan Google välja en bild från användare i stället.
- **Kategorier och minimiantal:**
  - Relevanta för tjänsteföretag: exteriör 3, interiör 3, produkter 3, i arbete 3, team 3.
  - För mat och hotell: mat och dryck 3, gemensamma utrymmen 1 per utrymme, rum 3.
- **Beslutsträdet (WAI, 2024-05-13)** har fem frågor i ordning:
  1. Text i bilden?
  2. Bild i länk eller knapp?
  3. Tillför bilden mening?
  4. Rent dekorativ?
  5. Oklart?
- **1177:**
  - "en kort tydlig mening och avsluta med punkt. Försök hålla dig till 80 tecken."
  - Informationen ska lyftas fram, "snarare än att beskriva hur den ser ut".
  - Utelämna kön, ålder, funktionsvariation och kläder om det inte är relevant.
  - Skriv "foto" eller "illustration" bara om det är relevant.
  - Bilder på artikelsidor ska ha både alt-text och bildtext. Bildtexten "hjälper användaren att tolka bilden" och ska hänga ihop med rubrik och ingress.
- **DIGG:**
  - Undvik att börja med "Bild på …" eller "Foto av …".
  - Undvik omdömen: "en svart bil", inte "en snygg bil".
  - `alt=""` för dekorativa bilder. Attributet får inte utelämnas.
  - Upprepa inte det som bildtexten eller brödtexten redan säger.
  - Håll texten kort.
- **Google Image SEO:**
  - `<img>` med `src` och `alt`. CSS-bakgrunder indexeras inte.
  - `srcset` eller `<picture>` med `<img>` som reserv.
  - Korta, beskrivande filnamn.
  - Bilden placeras nära relevant text.
  - Ingen nyckelordsfyllning. Googles exempel på bästa alt-text är `alt="Dalmatian puppy playing fetch"`.
  - Huvudbilden pekas ut med `og:image` eller `primaryImageOfPage`.

**Kvalitet och underhåll:** inga repon. Alla källor är primära normkällor från myndighet, standardorgan eller plattform. W3C:s sidor om informativa och funktionella bilder är från 2017–2019 men fortfarande giltiga. Sidan om komplexa bilder uppdaterades 2026-04-08.

**Det bästa vi kan ta:**
- Beslutsträdet ordagrant som algoritm, med svar och länkar ([decision-tree](https://www.w3.org/WAI/tutorials/images/decision-tree/)).
- 1177:s fyra formregler, exemplet med hjärtat som visar skillnaden mellan alt-text och bildtext, och regeln att alltid skriva båda på artikelsidor.
- DIGG:s testfråga för dekorativa bilder: hoppar du över bilden när du beskriver sidan för någon är den troligen dekorativ.
- 1177:s namngivningsregler för filnamn: svenska utan å, ä och ö, understreck mellan ord, inga mått, numrering vid serier. Googles råd om korta, beskrivande filnamn stöder samma regler.
- Googles kategorier och minimiantal som fotolista, så att en fotosession räcker för både sajten och profilen.
- WAI:s regel för grupper: en bild bär alt-texten för en grupp som visar en enda informationsmängd, och i ett galleri får varje bild sin egen.

**Var det hamnar hos oss:** bekräftar det preliminära, alltså skillen `innehall`, delfilen `bilder.md`. Två tillägg:
- Filnamnsregeln och Googles krav på `<img>` hör också till lager 8 (SEO). Där ska det bara stå en hänvisning.
- Reglerna för videoprofilen (30 s, 720p) hör till delfilen om video om den finns.

**Passar vår stack?** Ja. Astro kräver `alt`, och `alt=""` fungerar. Bildtext görs med `<figure>` och `<figcaption>` utan JS. Tre saker måste översättas:
- WAI:s engelska exempel till svenska exempel för hantverkare och tjänsteföretag.
- 1177:s vårdkontext till småföretag. Reglerna om diskrimineringsgrunder och att undvika varumärken i bild är 1177-specifika och kan bli förslag, inte regler.
- 1177:s 80 tecken är en riktlinje. DIGG anger ingen siffra.

**Risker och flaggor:**
- Upphovsrätt: skriv om med egna ord och hänvisa, kopiera inte stora stycken från 1177 eller Google.
- Ägaren måste granska alt-texten. Claude-vision kan missa kontext, till exempel ort, vilket jobb det är eller vilket material som syns.
- Googles krav på verklighetstrogna bilder och regeln om AI gäller profilen. Samma bilder ska inte AI-bearbetas om de ska dit.
- Inget kräver inloggning, utom att ladda upp i Google-profilen. Det kräver att ägaren loggar in och att profilen är verifierad.
