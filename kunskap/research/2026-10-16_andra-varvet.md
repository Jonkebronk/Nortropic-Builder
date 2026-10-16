# Andra varvet: skillsen jämförda med originalen, Apples HIG, byggguider, MCP och bevakning

**Datum:** 2026-10-16, omkring 14.25–16.40. **Beslutet:** `BESLUT.md`, *Alla skills gås igenom, jämförs med originalen och Apples HIG kommer in*. Johnny:

> Jag vill att vi går igenom alla skills och destillerar/jämför även reflekterar ifall det är nåt vi kan kompetenshöja eller kompetenssäkra utifrån best pratices för vad vi försöker upp nå här.

I första varvet destillerades 61 skills ur webb-pro till elva egna, men originalen kördes aldrig och ingen jämförde dem regel för regel. I andra varvet läste tolv grupper originalen i sin helhet och jämförde dem med våra skills och guiden. Grupperna körde också originalens egna granskningar mot övningssajten. Det som saknades och höjde kvaliteten fördes in i våra skills, med källa. Gruppernas fullständiga rapporter (cirka 5 000 rader) ligger lokalt hos övningssajten, eftersom de nämner firman; placeringarna står i `inventering/inventering.json`.

## Vad varje grupp gav

| Grupp | Källor | Det viktigaste som kom in | Fel hos oss som rättades |
|---|---|---|---|
| Yta 1 | impeccable, frontend-design, design-system, hallmark, ui-ux-pro-max | Kontroller 22–29 (scroll och klippning 320–1920 px och vid 200 %, kisa-test, gråskala och färgblindhet, alla tillstånd, kortnät, accentandel), nya förbud, slop-tabellen | Fyra regler som originalen motsäger är märkta som kitval |
| Yta 2 | Krehels better-colors, -typography, -ui; tretton taste-skills | `yta/stilriktningar.md`: en riktning per kit, ett signaturgrepp, reglagen ur briefen; 23 tillägg ur Krehel (exakta värden är fynd, betoning är ett viktsteg) | Webb-pros taste var en äldre version än v2.0.0. Tastes eget blindprov: sidor utan skillen fick högre betyg i fyra av fem omgångar |
| Rörelse | Emil Kowalskis tio skills, gsap, motion | WCAG 2.5.7, förbud mot text som delas i tecken, knappen går tillbaka lika snabbt, kontroll av den byggda CSS:en | Tangentbordsregeln var för bred; `filter` är inte dyrt, `box-shadow` är; WCAG 2.3.1 är *mer än* tre blinkningar; `view()` följer scrollen åt båda hållen |
| Skelett och struktur | better-layout, variant, mobile-native, refero med flera | better-variant fanns redan under namnet `variant` och är nu helt inne; princip 16, skelettet håller när texten växer | `touch-action: manipulation` gäller bara utan inzoomning (WebKit); WCAG 3.2.4 kräver inte identiska etiketter |
| Innehåll och strategi | humanizer, better-writing, brand, marketingskills med flera | Varje mening tillför något; fyra nya AI-mönster; *välj* eller *tryck*, inte *klicka*; en fråga som kan motbevisa briefen | Superlativ är inget AI-tecken (Wikipedia); GOV.UK går före better-writing om platshållartext |
| Kvalitet | better-accessibility, better-interface, modern-web-guidance, Vercels riktlinjer, SEO | Två varv (tangentbord, sedan skärmläsare), `formular.md`, 15 mönster som alltid är fel, prov med 24 och 32 px, 25 förslag på kontroller | Statusen för anchor positioning och `:has()` var fel |
| Flödet | backlog, kirurg, writing-for-agents, bygg-sajt, designfas, skill-creator, superpowers med flera | Premiumpassets grupp PU (kognitiv genomgång av toppuppgifterna), *Behåll* i granskarens rapport, `larande/baslinje.md` | Resend stod kvar i drift, mot beslutet |
| Apple HIG | Apples Human Interface Guidelines, emil-apple-design | `apple-hig.md` i fem skills: 1 pt motsvarar 1 CSS-px, HIG:s kontrasttabell är en fälla mot WCAG, Apples systemblå ger 3,5:1 mot vitt | Om `theme-color` och säkra ytor (skelett), negativ spärrning (yta), citatet om 0,2 Hz gäller visionOS (rörelse) |
| Byggguider | Lovable, Dribbble, Webflow, Framer, Awwwards, Smashing, NN/g, Baymard, GOV.UK, web.dev med flera, cirka 80 källor | Guiden täcker redan nästan allt, ofta strängare. Åtta nya luckor, bland dem att första skärmen inte säger varför just det här företaget | FAQ-resultaten försvann 7 maj 2026, inte i juni |
| MCP | Alla MCP i inventeringen och registret | Inloggningsordning med minsta behörighet och ett prov per server; nya kandidater (MDN, Astro Docs, Cloudflare Docs, Playwright MCP, shadcn CLI) | Inspos svar har regler för datorn som krockar med skelettet; nanobanana pekar på avvecklade modeller |
| Bevakning | Startsäkringen, guiden 3-4, Thoughtworks Radar, Baseline, WCAG, Google, HIG | Förslag B1–B8: startsäkringen säger vad som ändrades, tre utfall per ändring, högst fem förslag per omgång, effekten mäts | Två fel i `kallor-bevakning.json`; två verktygsändringar slank igenom utan att någon såg dem (axe-core 4.14, Lighthouse 13.5) |

**Första måttet på att en egen skill hjälper** (flödet, `larande/baslinje.md`): med skillen `drift` klarade agenterna 100 % av 18 påståenden, utan den 68,5 %. Förbehåll: påståendena skrevs ur skillen själv.

## Fel i biblioteket som hittades och rättades samma dag

- **Måttlig rörelse kördes inte i bygget.** Minifieraren slog in `view()` i förkortningen `animation`, och Chromium avvisade regeln. Rättat och prövat i Chromium.
- **Vågrät scroll vid 200 % textstorlek** på 11 av 11 sidor i 375 px. Mätningen i premiumpasset gjordes med 24 px (150 %), inte 32 px. Rättat: knapplisten staplas i flödet, uppmaningen och adresslänkarna har `max-width`, ordbindningstecken i stället för `nowrap`, `sr-only` förankrad.
- **En understruken lucka före pilen**, en regression från premiumpasset: radbrytningen efter Lucides licenskommentar.
- **Djärvs knapp tappade kontrast när den trycktes** (3,66:1). Steget går nu bort från texten på accenten i varje kit.
- **Hopplänken stack fram vid stor text**; **ett långt företagsnamn skrevs över menyn**; **långa e-postadresser** gav scroll; **I dag-märket** lyste efter stängning; knappen gick tillbaka på 400 ms.

## Kompetenshöjning

- **Riktiga besökare, telefoner och hjälpmedel.** Ingen grupp kunde pröva Safari på en riktig iPhone, Android, Firefox eller VoiceOver. Xcodes simulator kräver Johnnys Apple-ID; Guidepup kan automatisera skärmläsare.
- **Baslinjen för fler skills**, nästa gång rörelse, kvalitet och omfattning.
- **Billiga prov först:** femsekunders- och rubriktestet, kisa-testet och färgsynsemuleringen.
- **Prov med större text och värstafall** som fast steg för biblioteket, med ett svenskt dataset (långa namn, adresser, e-post).
- **Kontroller som kom fram i flera grupper:** den byggda CSS:en, 24 och 32 px grundstorlek, att söksträngen finns på sin sida, att bara bokningen är fylld accent, och en felbank där kontrollerna måste fallera.

## Kompetenssäkring

- **Mät i det byggda resultatet,** inte i utvecklingsservern; ett mätskript behöver ett känt rött fall innan det används.
- **Regel och kod ska stämma:** flera grupper hittade ställen där guiden, skillsen och `bas.css` sade olika saker. Gruppernas exakta textförslag till guiden och bilagorna ligger i rapporterna och väntar på att föras in.
- **Faktarättelser i guiden** med primärkälla: FAQ-datumet, "kakor" kvar i 2-3, Email Routing (nedan), `theme-color` i iOS 26, MCP i lokal scope.

## Förslag till Johnny

1. **E-post via Cloudflare** (flödet): Email Routing kan enligt Cloudflare inte gå bredvid kundens befintliga mejl på samma domän. Det påverkar beslutet 12.47 för kunder som redan har mejl hos någon annan.
2. **Låst version eller alltid senaste** (MCP): guiden kräver låst version, beslutet säger alltid senaste. Förslag: senaste version plus ett verktygslås i startsäkringen.
3. **Mobbins villkor** förbjuder att AI skapar verk ur innehållet (avsnitt 3 och 10.1). Läs före köpet.
4. **Inloggningsordningen:** Socket (gratis), 21st (gratis nyckel), Mobbin efter villkoren, DataForSEO (50 USD). Google, Figma, Gemini och Cloudflare väntar på en kund.
5. **Bevakningsloopen B1–B8** (bevakning): ny bevakningsfil, en förbättringslista med högst fem förslag per omgång, och faktarättelser med primärkälla som standardändringar.
6. **Granskarens låsta checklista:** K5 (byt namnet och se om texten och bilderna fortfarande passar) och K6 (faktapåståenden om verksamheten).
7. **Smak och kit** (yta 1 och 2): sidfotens rubriker mindre än brödtexten, löptext i dämpad färg, fyra kortnät i rad, reservtypsnitt för Varm och Djärv, `hyphens: auto` mot regeln om bara mjuka bindestreck.
8. **Döm måttlig rörelse på video igen**, nu när den körs i bygget.
9. **Menyn i mobilen:** regeln om fyra synliga val har nu två oberoende källor (NN/g och web.dev).
