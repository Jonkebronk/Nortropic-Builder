# better-writing

**Källa:** https://github.com/jakubkrehel/skills, sökvägen `skills/better-writing/`. Läst 2026-10-16 vid repots commit `4c66b1fa86e9` (2026-10-13). Skillen ändrades senast i `da5f6d5974` (2026-10-05). Pluginversion 1.13.2 i `.claude-plugin/plugin.json`. Repot har ingen ändringslogg och inga taggar. Jag läste `SKILL.md` (151 rader), `patterns.md` (56 rader) och `agents/openai.yaml`, samt repots `README.md`, `AGENTS.md` (regeln om vem som äger vad) och `LICENSE`.

**Licens:** MIT, © 2026 Jakub Krehel. Licensen kräver att upphovsrätts- och licenstexten följer med när text kopieras. Vi skriver med egna ord på svenska och kopierar ingen text, så kravet gäller inte. Källan anges ändå i delfilen.

**Vad det är:** En kunskapsskill som skriver och granskar gränssnittstext: etiketter, knappar, fel, tomma lägen, bekräftelser, status och länktext. Den matchar produktens befintliga röst och flaggar text som vilseleder eller lämnar användaren utan väg vidare. Den slutar med en tabell och domen Block eller Approve.

**Hur det fungerar:**
- **Inventera först.** Hitta var texten bor: översättningsfiler, CMS eller API. Lista ett substantiv per objekt, ett verb per handling och skiftläget per elementtyp. Ny text använder samma ord. En synonym räknas som fel bara när samma sak har två namn.
- **En röst, ett ordförråd.** Heter något "Arkivera" i menyn heter det inte annat i notisen. Ett flöde har samma ord rakt igenom: ett för att börja, ett för att gå vidare, ett för att avsluta.
- **Tonen följer insatsen.** Det finns fyra nivåer:
  - lyckat, introduktion och tomma lägen: varmt, gärna lätt
  - rutin och inställningar: neutralt
  - fel och destruktiva åtgärder: lugnt och rakt, inget skämt
  - dataförlust och säkerhet: allvarligt och tydligt
- **Tilltal.** Skriv "du", inte "användaren". I felmeddelanden låter "vi" som en bortförklaring. Använd possessiv sparsamt och blanda aldrig perspektiv, som "Mitt konto" bredvid "Dina inställningar".
- **Enkla ord.** Stryk ord som inte gör något. Inga idiom eller skämt som inte går att översätta. Skriv könsneutralt och välj "tryck", "klicka" eller "välj" efter enhet.
- **Hela meningar.** Sätt aldrig ihop text runt en variabel. Använd ICU-plural och `Intl` för tal, datum och listor (`patterns.md`).
- **Knappar** börjar med ett verb som namnger handlingen. En knapp med bara ikon namnger handlingen, inte symbolen.
- **Länktext** ska gå att förstå utan sammanhang. Aldrig "Klicka här". "Läs mer" får alltid ett tillägg om vad.
- **Skiftläge.** En policy per elementtyp. Utan policy gäller stor bokstav bara först i meningen.
- **Reglage** beskriver vad som händer när de är på. Hänvisa med en direktlänk till inställningen i stället för att beskriva vägen.
- **Fel:**
  - texten är en instruktion och står vid fältet som gick fel
  - ingen skuld, inget "oops", inget utropstecken
  - positiv formulering
  - kända krav visas som hjälptext före inmatningen
  - samma fel om och om igen är ett designfel
- **Ångra går före bekräftelse** när åtgärden går att ångra och görs ofta.
- **Bekräftelse** behövs när åtgärden inte går att ångra, påverkar andra eller gäller många objekt:
  - titeln är handling plus objekt, aldrig "Är du säker?"
  - brödtexten säger vad som går förlorat, med antal
  - knapparna är verb plus objekt och Avbryt
  - för konto eller arbetsyta skriver användaren in namnet
- **Tomma lägen** säger vad platsen är och hur den fylls, och erbjuder en nästa handling. Efter filtrering namnges sökningen och det finns ett sätt att rensa. Bestående information hör aldrig hemma i ett tomt läge.
- **Platshållare** visar ett exempel i rätt format, aldrig en instruktion.
- **Statustext** (`patterns.md`):
  - pågår: verb plus objekt plus "…"
  - klart: objekt plus particip, utan "framgångsrikt"
  - misslyckat: vad som inte hände plus nästa steg
  - otillgängligt: varför, och vad som låser upp
  - delvis: antal för båda utfallen
  - paren ska vara parallella
- **Detektionstabell och rapport.** Tabellen listar konkreta strängar att söka efter. Allvarlighetsgrader:
  - HIGH: vilseleder; fel utan väg tillbaka (alltid HIGH); destruktiv åtgärd utan bekräftelse och utan ångra
  - MEDIUM: röst, termer eller skiftläge är inkonsekventa
  - LOW: finputs
  Strängar från CMS som inte gick att se märks "Not verified". Domen Approve ges aldrig för något som inte granskats.
- **Gränser mot andra skills.** Typografi (tecken, avstavning, trunkering), tillgänglighet (attribut, aviseringar) och layout (plats för översatt text) ägs av systerskillsen. Skillen äger bara själva orden (`AGENTS.md`, "Rule ownership").

**Kvalitet och underhåll:**
- 7 968 stjärnor och 303 forkar. Repot skapades 2026-07-10 och senaste push var 2026-10-13.
- Två bidragsgivare: jakubkrehel med 122 bidrag och kontot "claude" med 6. En person bär alltså projektet.
- Inga källor anges i skillen. Reglerna är författarens erfarenhet. Flera överlappar med WCAG 2.2: 2.4.4 om länkens syfte och 3.3.1–3.3.3 om fel och etiketter. Den kopplingen är min, inte källans.
- Kända problem:
  - [#40](https://github.com/jakubkrehel/skills/issues/40), punkt 4 (stängt 2026-10-07): exemplet "Use only letters for your name" lärde agenter att avvisa riktiga namn med bindestreck, apostrof eller icke-latinska bokstäver. Det är rättat i dagens `SKILL.md`, som nu har ett datumexempel.
  - Öppna [PR #21](https://github.com/jakubkrehel/skills/pull/21) och [#14](https://github.com/jakubkrehel/skills/pull/14) rör inte better-writing.

**Det bästa vi kan ta:**
- Tonnivåerna efter insats (`SKILL.md`, "One voice, one vocabulary").
- Reglerna för fel, bekräftelse och ångra, tomma lägen och statustext (`SKILL.md` och `patterns.md`, "Destructive flows" och "Status copy"). Det gäller kontaktformulär, bokningsflöden och 404-sidor.
- Detektionstabellen ("Before you finish") som en sökbar lista, översatt till svenska strängar: "Klicka här", "Läs mer" utan tillägg, "Hoppsan", "Något gick fel", "!" i fel, "Är du säker", "framgångsrikt", "Vänligen" i rutininstruktioner, "OK/Ja/Nej" på knappar.
- Rapportformatet med allvarlighetsgrad, plats, före, efter och varför, och regeln att aldrig godkänna något som inte granskats.

**Var det hamnar hos oss:** Skillen `innehall`, delfilen `mikrotext.md` (knappar, fel, tomma lägen, bekräftelser). Installeras inte.

**Passar vår stack?**
- Delvis. Sajter i Astro utan JavaScript har få dynamiska lägen: inga notiser med ångra, inga reglage, sällan tomma lägen.
- Det som gäller direkt är knappar, länktext, formulärets etiketter och felmeddelanden (även server- och Cloudflare-svar), sidan för skickat formulär, 404-sidan och bokningslänkar.
- `Intl`-recepten gäller bara om sajten formaterar i klienten. Det gör den sällan, så datum och tal skrivs i stället i svensk form i bygget. Språkrådets Snabba skrivregler: "15 april 2025" i löptext, "50 %" och "kl. 19.10".
- Måste översättas och anpassas:
  - "you" blir "du". Vid B2B kan "ni" förekomma, och det beslutet ligger i `rost.md`.
  - På svenska finns inget val mellan Title Case och versal i början. Bara först i meningen gäller.
  - "successfully" och "Please" motsvaras ungefär av "framgångsrikt" och "Vänligen" (tolkning).
  - Datumexemplet DD/MM/YYYY byts mot ÅÅÅÅ-MM-DD eller "15 april 2025".
  - Exemplen är SaaS-objekt (projekt, arbetsyta, repo) och byts mot lokala exempel som "Boka tid", "Skicka förfrågan", "Ring oss" och "Se lediga tider".
- Bekräftelse genom att skriva in namnet är irrelevant för en broschyrsajt.

**Risker och flaggor:**
- Ingen telemetri, inga skript, ingen betalvägg och ingen inloggning. Skillen är bara Markdown.
- Om hela pluginet installerades skulle tretton systerskills med breda beskrivningar följa med, och de krockar med våra lager 4–6. Det är ett skäl att inte installera.
- Engelskcentrerade exempel och Tailwind-klasser i HTML-exemplet (`text-zinc-500`). Vi använder egna CSS-tokens, så exemplen skrivs om.
- Inga källor bakom reglerna. De är praxis och inte norm. För att bli en låst kontroll enligt `guide/README.md` behöver en regel en norm (till exempel WCAG för länktext och fel) eller två oberoende källor.
