# marketingskills: copywriting och brand-review

Kortet täcker två källor från olika repon, som tillsammans ger delfilerna `text.md` och `rost.md`.

**Källa:**
- **marketingskills** (Corey Haines): https://github.com/coreyhaines31/marketingskills. Läst 2026-10-16 vid commit `365b412152b9` (main, 2026-10-15). Skillversioner: copywriting 2.3.1 (senast ändrad `e6fb742a83`, 2026-10-15), copy-editing 2.2.0 (`158bd3af27`, 2026-10-15) och customer-research (`a8ac2636ec`, 2026-10-03).
  - Lästa filer: `README.md`, `VERSIONS.md` (posten om varifrån tydlighetsavsnittet kommer) och `LICENSE`.
  - copywriting: `SKILL.md` och `references/ai-tells.md`, `copy-frameworks.md`, `natural-transitions.md`.
  - copy-editing: `SKILL.md` och `references/checklist.md`, `plain-english-alternatives.md` (bara början).
  - customer-research: `SKILL.md` och `references/interviews-and-surveys.md`. Från `source-guides.md` läste jag bara rubrikerna.
  - Evals-filerna läste jag inte ⚠️ (testfall, inga regler).
- **brand-review** (Anthropic): https://github.com/anthropics/knowledge-work-plugins, filen `marketing/skills/brand-review/SKILL.md` (276 rader). Läst 2026-10-16 vid commit `33eeda1e8fd8` (main, 2026-10-16). Skillen ändrades senast i `2d6f7e22dd` (2026-03-13). Pluginet marketing är version 1.2.0. Jag läste också `marketing/README.md`, `CONNECTORS.md`, `.mcp.json` och `LICENSE`.

**Licens:**
- marketingskills: MIT, © 2025 Corey Haines. Behåll upphovsrätts- och licenstexten vid kopiering. Vissa delar är själva lånade från Profounds och Wispr Flows skills (MIT) och omformulerade, vilket står i filerna. Wikipedia-delarna (CC BY-SA) är omskrivna med egna ord enligt ai-tells.md.
- brand-review: Apache-2.0, i både `LICENSE` i roten och `marketing/LICENSE`. Vid vidarespridning ska licensen följa med och ändringar anges. Det finns ingen NOTICE-fil i repot, varken i roten eller under `marketing/`.
- Vi parafraserar på svenska och kopierar ingen text, så inget av kraven gäller. Källan anges i delfilerna.

**Vad det är:**
- **copywriting** skriver marknadstext för sidor: rubrik, ingress, uppmaning och avsnitt. Den har en lång svartlista över AI-mönster och ett krav på att påståenden går att styrka.
- **copy-editing** redigerar befintlig text i sju svep: tydlighet, röst, "so what", belägg, specificitet, känsla och risk.
- **customer-research** samlar kundens egna ord.
- **brand-review** granskar text mot en röst- och stilguide. Den flaggar alltid juridiska risker och har ett fast format för att dokumentera rösten.

**Hur det fungerar:**
- **Diagnos först** (copywriting "Diagnose the Situation First" och copy-editing `checklist.md`). Tre lägen:
  - A, tomt eller slarv: bygg upp från fakta
  - B, en verklig röst finns: återställ den och behåll skribentens ord
  - C, punktändring: ändra bara det som efterfrågats
  Låt-bli-testet gäller i alla lägen: är ändringen mätbart bättre eller bara annorlunda?
- **Grind med tre frågor per rad:** kan läsaren se det framför sig, går det att bevisa sant eller falskt, och kan en konkurrent skriva samma mening (bytestestet)? Tre ja: behåll. Två: vässa. Ett eller inget: skriv om eller märk med `[NEED: …]`.
- **Principer:** tydlighet före fyndighet, nytta före funktion, specificitet, kundens ord före företagets, en idé per avsnitt.
- **Styrkbara påståenden.** Ett påstående som inte går att styrka skrivs inte och stryks inte heller i tysthet. Det namnges, med skäl, och med det närmaste påstående som går att styrka och det belägg som skulle låsa upp det, till exempel en recensionsexport eller en skriftlig garanti.
- **Svartlistan "Never write these"** och taken (`ai-tells.md`). Förbjudet:
  - kontrastavslöjande
  - negationslistor
  - svansar som staplas på efter ett komma
  - retorisk fråga plus svar och kolonavslöjande
  - färdiga öppningar
  - tankstreck i kort text
  Tak: ett fragment och ett tretal per avsnitt. Till det kommer andra generationens mönster, en självkontroll i sex steg och "bygg en skribent" (vem skriver, vad kan hen, vilken åsikt har hen). Man får aldrig hitta på erfarenheter, kunder eller citat.
- **Uppmaningar:** verb plus vad man får plus eventuellt villkor. Svaga är Submit, Sign Up, Learn More, Click Here och Get Started.
- **Kundens ord** (customer-research):
  - samla ordagranna citat med källa och datum, aldrig parafraser
  - konfidens: Hög vid tre eller fler oberoende källor, Medel vid två, Låg vid en
  - minst fem datapunkter per segment
  - fråga "varför" i flera led
  - börja med att observera där kunderna redan pratar ("Sales Safari") innan man intervjuar
  - hitta aldrig på detaljer i personas
- **brand-review:**
  - röstdokument i sju delar: personlighet, 3–5 attribut, målgrupp, budskapspelare, tonskala, stilregler, terminologi
  - varje attribut har fyra fält: **Vi är**, **Vi är inte**, **Så här låter det** och **Så här låter det inte**
  - sju skalor och ton per kanal och situation
  - regeln: attributen ligger fast, tonen skruvas upp eller ned
  - flaggas alltid: superlativ utan belägg, saknade friskrivningar för ekonomi, hälsa och garantier, jämförelser med konkurrenter, reglerade branscher, omdömen utan källa eller redovisad relation, text som ligger för nära en annan källa
  - format: sammanfattning, tabell med problem, plats, allvarlighetsgrad och förslag (High, Medium, Low), omskrivning av de 3–5 värsta fynden och en separat lista med juridiska flaggor

**Kvalitet och underhåll:**
- **marketingskills:** 54 998 stjärnor och 8 148 forkar. Repot skapades 2026-01-15 och senaste push var 2026-10-15. 53 bidragsgivare, men coreyhaines31 har 839 bidrag och nästa 209. 25 öppna ärenden inklusive PR. Släpp sker ofta, flera per dag.
  - [#613](https://github.com/coreyhaines31/marketingskills/issues/613) (stängt) förklarar varför AI-svartlistan finns: kunder avvisade utkast som lät AI-skrivna. Det är en anekdot, inte en studie.
  - Inga ärenden om den osourcade statistiken. Jag sökte i ärendelistan och hittade inget ⚠️.
- **knowledge-work-plugins:** 29 839 stjärnor och 3 374 forkar. Repot skapades 2026-01-23 och senaste push var 2026-10-16. 32 bidragsgivare och 112 öppna ärenden inklusive PR. brand-review har inte ändrats sedan flytten från kommando till skill (2026-03-13). Jag hittade inga ärenden om brand-review.
  - [#70](https://github.com/anthropics/knowledge-work-plugins/issues/70) (stängt) gällde felaktiga MCP-adresser i marketing-pluginets `.mcp.json`.
  - README nämner skillen "brand-voice", men katalogen heter `brand-review`. Dokumentationen har alltså halkat efter.
- **Statistik utan källa ⚠️:**
  - "+81% conversions, 38% shorter sales cycle, 28% lower CAC, 175% more referrals" (copywriting `SKILL.md` och `copy-frameworks.md`). Enligt `VERSIONS.md` kommer siffrorna ur Haines bok *Founding Marketing*, kapitel 3, utan primärkälla. Min webbsökning hittade ingen studie.
  - SavvyCal-fallet ("roughly tripled") saknar källa.
  - brand-reviews exempel "reduce reporting time by 40%" saknar källa.
- **Interna motsägelser:**
  - copy-editings ✅-exempel i "So What" har både tankstreck och en staplad svans.
  - Tabellen över specificitet ("2,847 teams") lockar till påhittade siffror, trots förbudet mot "reflexive specificity".
  - `natural-transitions.md` föreslår upptakter som "Here's what we'll cover…" (men bara för långa guider).
  - brand-reviews förebild för felmeddelanden, "Something went wrong on our end. We're looking into it.", är just det som better-writing räknar som HIGH.
  - Oxfordkomma och engelska ordpar i stilguidedelen.

**Det bästa vi kan ta:**
- **Till `text.md`:**
  - diagnosen A, B, C och låt-bli-testet
  - grinden med tre frågor, med bytestestet
  - kravet att påståenden går att styrka plus en svensk markör, till exempel `[BEHÖVS: belägg]` (förslag)
  - "Never write these" och taken som svenska mönster, i samordning med `ai-monster.md` så att varje regel står på ett ställe
  - "Rewrite from the facts", alltså att aldrig bara byta till synonymer
  - kundens ord från customer-research, med konfidensnivåerna och minimiantalet
  - från copy-editing: kontrollerna på ord-, menings- och styckenivå, högst cirka 25 ord per mening och korta stycken för webben (källans tumregler, inte norm)
- **Till `rost.md`:** brand-reviews fyra fält per attribut och regeln om fasta attribut och rörlig ton.
- **Till granskningen:** brand-reviews juridiska flaggor och rapportformat, med Low, Medium och High.

**Var det hamnar hos oss:** Skillen `innehall`, delfilerna `text.md` (tydlighet, specificitet, kundens ord, styrkbara påståenden, bytestestet) och `rost.md` (brand-reviews format). SaaS-exempel och osourcad statistik stryks.

**Passar vår stack?**
- Innehållsreglerna är oberoende av teknik och passar. Allt som rör verktyg passar inte: MCP-servrar, CRM, G2 och Capterra, SparkToro, A/B-test.
- Från SaaS till lokala tjänsteföretag:
  - "Start Free Trial" och "No card required" blir "Boka tid", "Begär offert", "Ring", "Fast pris efter besök" (förslag).
  - CAC, ARR, PMF-enkäten och betalda intervjuer på 50 dollar stryks.
  - Kundens ord hämtas från Google-recensioner, bokningstjänstens omdömen, offertförfrågningar och kundmejl som ägaren delar, och från samtalet med ägaren. Det är förslag; källorna i skillen är amerikanska.
  - Startup kontra enterprise i "Perception Gap" byts mot en lokal fråga, som ny kund mot återkommande eller privat mot företag.
- Svenska anpassningar:
  - brand-reviews stilguidetabell byts mot svensk norm: inget komma före "och" i uppräkningar, "50 %", "15 april 2025", ”…”, och "–" (Språkrådets Snabba skrivregler).
  - Ordlistan i Plain English byts mot klarspråk. ISOF:s Klarspråkshjälpen är ett spår att läsa ⚠️.
- De juridiska flaggorna motsvarar marknadsföringslagens regler om vilseledande och jämförande reklam. Hälsopåståenden är särskilt känsliga för en kiropraktor. Tolkning, inte juridisk rådgivning; ska läsas mot primärkällan innan det blir en kontroll.

**Risker och flaggor:**
- **Kommersiella band:** marketingskills README marknadsför författarens byrå, kurser och en AI-produkt (Magister), och har betalda "Verified Partners" (Converly, Ploy, AIsa). I de tre skills vi läste hittade jag inga partnerlänkar.
- **Anslutningar:** marketing-pluginet i knowledge-work-plugins tar med `.mcp.json` med tio fjärrservrar (Slack, Canva, Figma, HubSpot, Amplitude, Notion, Ahrefs, Similarweb, Klaviyo, Supermetrics) som kräver konton. Det är ett starkt skäl att inte installera; vi tar bara metoden.
- **Breda triggers:** copywriting-beskrivningen fångar "this sounds like AI", "make it sound human" och "rewrite this page". Den skulle krocka med `innehall` och med humanizer. Installeras inte.
- **Osourcad statistik och påhittade exempelsiffror** får inte följa med in i våra filer.
- **customer-research** ber om ordagranna citat från nätet. Används de *på sajten* som omdömen krävs samtycke, och visning av recensioner har egna informationskrav. Tolkning ⚠️, inte kontrollerad mot primärkälla. Internt som ordförråd är risken lägre.
