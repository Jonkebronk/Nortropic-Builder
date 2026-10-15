# Lager 6–7 – Rörelse och Innehåll: kandidater, licenser och källor för Nortropics egna skills (läget 13 oktober 2026)

**Metodnot.**
- **GitHub-data:** stjärnor, licens (GitHubs licensdetektering), senaste push och arkivstatus hämtades via GitHubs sök-API **2026-10-13** (`search_repositories`, `minimal_output=false`). Releaser och commits hämtades samma dag via `list_releases`/`list_commits`. I tabellerna är repolänken källan för metadata. Funktionsuppgifter kommer från projektens egen dokumentation eller källfiler.
- **Begränsningar:** Webbsökningsbudgeten, som delas mellan agenterna, tog slut halvvägs. Därefter användes bara direkthämtning av kända URL:er och GitHub-API:t. **isof.se blockerar automatisk hämtning (robots.txt)**, så Isofs och Språkrådets webbsidor kunde inte läsas. Klarspråksdelen bygger därför på lagtext, Myndigheternas skrivregler (PDF), SIS/IPLF-förteckningen och sekundärkällor.
- **Flaggor:**
  - **[LICENS]**: GPL, AGPL eller LGPL, icke-kommersiell licens, egen licens eller licens som saknas.
  - **[GDPR]**: personuppgifter eller kundtext skickas till extern tjänst.
  - **[BILDRÄTT]**: bildlicensvillkor för kommersiella kundsajter.
- **Juridik:** bedömningarna är min läsning av källorna, inte juridisk rådgivning.
- **Verdikt:** **Ta in / Pröva / Bevaka / Avstå**.
- **Konsoliderat register:** alla GitHub-kandidater med stjärnor, licens, senaste push och verdikt finns samlade i avsnitt 8, under Cited Findings ("Konsoliderat kandidatregister").
- **Användningssätt:**
  - **D**: destilleras in i Nortropics eget bibliotek eller egen skill. Verktyget används bara när biblioteket byggs.
  - **B**: körs i Nortropics byggkedja (lokalt eller CI) vid varje bygge, aldrig på kundsajten.
  - **A**: åtkomst-API som finns kvar i drift.
  - **S**: levereras i kundsajten (CSS/JS).

---

## 1. Svensk språkgranskning: vilka öppna verktyg kontrollerar svensk text (LanguageTool, Vale, Hunspell/Stava, LIX), och vad säger svenska klarspråksriktlinjer?

### Takeaway
Inget enskilt öppet verktyg kvalitetssäkrar svensk webbcopy. Den starkaste kombinationen i oktober 2026 har tre delar:
- **Vale** (MIT, v3.24.0 från 2026-10-01) med en egen svensk Nortropic-stil. Vale har en inbyggd `lix`-variabel sedan v3.23.0.
- **Hunspell sv_SE** för stavning. LibreOffice-paketet uppdaterades till v2.42 i juni 2026. Ordlistan är LGPL-3 enligt licensfilen i wooorm-kopian.
- **Självhostad LanguageTool** (LGPL-2.1) för de få svenska grammatikregler som finns. LanguageTools svenska regelbas är mycket tunn: 32 XML- och 2 Java-regler, mot 5 224 och 79 för tyska.

Det normativa ankaret är Språklagens 11 § ("vårdat, enkelt och begripligt"), *Myndigheternas skrivregler* (8:e uppl. 2014, kapitlen "Att skriva klarspråk" och "Att skriva för webben") och SS-ISO 24495-1:2023 *Klarspråk*.

### Cited Findings

#### 1a. LanguageTool
- **Repo:** [languagetool-org/languagetool](https://github.com/languagetool-org/languagetool) har 15 127 stjärnor och **LGPL-2.1 [LICENS]**. Senaste push var 2026-10-13. Beskrivning: "Style and Grammar Checker for 25+ Languages".
- **Svenskt stöd:** Språktabellen för LanguageTool 6.6 (daterad 2025-03-27) anger 32 XML-regler, 2 Java-regler, stavningskontroll ja, 0 "confusion pairs" och 0 commits de senaste sex månaderna — [dev.languagetool.org/languages](https://dev.languagetool.org/languages)
  - Jämförelse: tyska 5 224/79, engelska 6 074/54, danska 78/0.
  - Norska stöds i webbläsartillägget bara med stavning, utan grammatikregler.
- **Den svenska modulen lever i liten skala** — [commits för languagetool-language-modules/sv](https://github.com/languagetool-org/languagetool/commits/master/languagetool-language-modules/sv):
  - 2026-09-10 lades "m.fl., t.o.m., kl., m.m., and the dotted d.v.s." till i meningssegmenteringen. De hade orsakat att meningar "split mid-clause". Commiten var en extern bidragsgivares, med Claude som medförfattare.
  - 2026-09-07: "[sv] Remove abbreviations with double meaning".
  - 2026-05-06 sattes trunk till "6.9-SNAPSHOT".
  - Svenska `grammar.xml` är 21 012 byte — [rules/sv](https://github.com/languagetool-org/languagetool/tree/master/languagetool-language-modules/sv/src/main/resources/org/languagetool/rules/sv)
- **Publika API:t [GDPR]** — [LanguageTool public HTTP API](https://dev.languagetool.org/public-http-api):
  - Gränser: "20 requests per IP per minute", "75KB text per IP per minute" och "20KB text per request".
  - Villkor: "Do not send automated requests. For that, set up your own instance of LanguageTool."
  - Användaren ansvarar för att informera om datahantering.
- **Självhostning** — [LanguageTool HTTP server](https://dev.languagetool.org/http-server):
  - Kräver Java 8+. Start: `java -cp languagetool-server.jar org.languagetool.server.HTTPServer --config server.properties --port 8081`.
  - "The AI-based rules are only available in the cloud".
  - Servern nås bara lokalt utan `--public`.
- **Docker:** [Erikvl87/docker-languagetool](https://github.com/Erikvl87/docker-languagetool) har 725 stjärnor och LGPL-2.1. Senaste push var 2026-06-17.
- **LanguageTool-MCP:er** finns bara som hobbyprojekt, till exempel [BaconDroid/languagetool-mcp-server](https://github.com/BaconDroid/languagetool-mcp-server) med 0 stjärnor, MIT och push 2026-09-22.
- **Arkitekturmönster värt att kopiera:** [00spoiler00/llepafils](https://github.com/00spoiler00/llepafils) (0 stjärnor, MIT, push 2026-09-07) granskar katalansk AI-text i tre lager — [llepafils README](https://github.com/00spoiler00/llepafils):
  1. Lokal LanguageTool.
  2. Egna regler mot AI-ismer, validerade mot en korpus.
  3. En Claude Code-skill som rättar och validerar om tills texten är ren.
  
  Korpusen innehöll 35 fragment med kända fel och 6 rena. LanguageTool ensamt hittade 19/35 med 5 falsklarm. Hela kedjan hittade 34/35 med 0 falsklarm.

#### 1b. Vale
- **Repo:** [vale-cli/vale](https://github.com/vale-cli/vale) har 6 235 stjärnor och MIT. Senaste push var 2026-10-13. Releaser: v3.24.0 (2026-10-01), v3.23.0 (2026-09-25) och v3.22.0 (2026-09-17) — [Vale releases](https://github.com/vale-cli/vale/releases)
- **`metric`-kontrollen** "enforces arbitrary formulas based on pre-defined, built-in variables" — [Vale docs: metric](https://docs.vale.sh/checks/metric). Den har bland annat:
  - `words`, `sentences` och `long_words` ("The number of words with more than 6 characters.").
  - `sentence_length_sd` och `quote_words` (v3.23.0+).
  - Läsbarhetsvärden som variabler "(Vale v3.23.0 or later)", bland annat `lix`: "The LIX measure".
- **`readability`-kontrollen** stöder bara fem engelska mått (Gunning Fog, Coleman-Liau, Flesch-Kincaid, SMOG, Automated Readability) med amerikansk "grade"-tröskel. LIX finns alltså via `metric`, inte via `readability` — [Vale docs: readability](https://docs.vale.sh/checks/readability)
- **Stavning** bygger på "Hunspell-compatible dictionaries", som anges med `dicpath`/`dictionaries` eller paret `aff`/`dic` — [Vale docs: spelling](https://docs.vale.sh/checks/spelling)
  - Standardordlistan är amerikansk engelska.
  - Ett inbyggt filter är regexen `[^a-zA-Z_']`, och `custom: true` stänger av de inbyggda filtren.
- **vale-cli/readability:** [repo](https://github.com/vale-cli/readability) med 30 stjärnor, MIT och push 2026-09-24. Beskrivning: "Readability scores as Vale rules: ARI, Coleman-Liau, Flesch-Kincaid, Flesch reading ease, Gunning fog, LIX, and SMOG".
- **vale-cli/agent-tools:** [repo](https://github.com/vale-cli/agent-tools) med 6 stjärnor och MIT. Skapat 2026-08-04, push 2026-09-03 — [agent-tools README](https://github.com/vale-cli/agent-tools). Det är ett Claude Code-plugin med:
  - fem skills: `setup`, `fix`, `triage`, `vocab` och `ci`.
  - en hook som körs när **assistenten** skriver eller redigerar en fil och lämnar tillbaka larm i samma tur. Som standard skickas bara `error`-nivå.
  - en MCP-server som kräver "an active Vale CMS Pro or Site subscription".
  
  Skills och hook kräver inget konto.
- **Inga svenska stilpaket:** inga fanns bland de 20 mest stjärnmärkta av vale-cli-organisationens 35 repon. En riktad sökning ("vale swedish OR svenska OR klarspråk") gav inga relevanta träffar — [vale-cli på GitHub](https://github.com/vale-cli)

#### 1c. Stavningsordlistor (Hunspell, Stava, cspell)
- **LibreOffice sv_SE:** uppdaterad till "latest release 2.42" (commit 2026-06-01, incheckad 2026-06-09), med en följdrättning 2026-07-04 — [LibreOffice/dictionaries, sv_SE](https://github.com/LibreOffice/dictionaries/commits/master/sv_SE). Repot har 564 stjärnor och push 2026-10-13.
- **Licens:** den svenska Hunspell-ordlistan "is maintained by Göran Andersson" och är "made available subject to the terms of GNU Lesser General Public License Version 3" — [wooorm/dictionaries: sv/license](https://github.com/wooorm/dictionaries/blob/main/dictionaries/sv/license) **[LICENS]**
  - Licenstexten kommer från wooorm-kopian (© 2003–19). Licensfilen i LibreOffice-versionen 2.42 lästes inte, men det är troligen samma licens.
  - wooorm-repot (1 409 stjärnor, MIT för koden) pushades senast 2024-09-09. LibreOffice är alltså den aktuella källan.
- **cspell:** [streetsidesoftware/cspell](https://github.com/streetsidesoftware/cspell) har 1 698 stjärnor, MIT och push 2026-10-13. Dess svenska ordlista i [cspell-dicts](https://github.com/streetsidesoftware/cspell-dicts/tree/main/dictionaries/sv) (292 stjärnor) har en **GPL-3.0**-LICENSE **[LICENS]**.
- **nspell:** [wooorm/nspell](https://github.com/wooorm/nspell), en Hunspell-kompatibel kontroll i JS, har 299 stjärnor och MIT. Senaste push var 2021-01-17 **(inaktivt)**.
- **Stava (KTH):** den gamla adressen svarar bara att "NADA has not existed since 2005" — [nada.kth.se/stava](https://www.nada.kth.se/stava/). Status kunde inte verifieras.

#### 1d. LIX och andra läsbarhetsmått
- **LIX** skapades av Carl-Hugo Björnsson och räknar ord, meningar och långa ord ("more than 6 letters"). Poängen ligger normalt mellan 20 ("very easy") och 60 ("very difficult") — [Wikipedia: Lix](https://en.wikipedia.org/wiki/Lix_(readability_test))
- **Sparv:** Språkbankens [Sparv](https://github.com/spraakbanken/sparv) har 29 stjärnor, MIT och push 2026-09-18 — [Sparv: available analyses](https://spraakbanken.gu.se/sparv/docs/user-manual/available-analyses). Den har annotatorerna:
  - `readability:lix`
  - `readability:ovix` ("ordvariationsindex")
  - `readability:nominal_ratio` ("nominalkvot")
- **textstat:** [repo](https://github.com/textstat/textstat) med 1 391 stjärnor, MIT och push 2026-10-13. Språkvarianterna gäller en, de, es, fr, it, nl, pl och ru. Varken svenska eller LIX finns — [textstat README](https://github.com/textstat/textstat/blob/main/README.md)
- **Fristående LIX-bibliotek** är övergivna, till exempel [kenthhagstrom/LIX](https://github.com/kenthhagstrom/LIX) (1 stjärna, PHP, push 2017).

#### 1e. Svenska klarspråksriktlinjer
- **Språklagen:** Språklag (2009:600) 11 §: "Språket i offentlig verksamhet ska vara vårdat, enkelt och begripligt." Lagen gäller offentlig verksamhet, inte privata företag i allmänhet — [lagen.nu: 2009:600](https://lagen.nu/2009:600)
- **Myndigheternas skrivregler**, 8:e uppl. — [PDF](https://internt.slu.se/globalassets/mw/stod-serv/kommmarkn.for/text-sprak/myndigheternas-skrivregler.pdf):
  - Utgiven © 2014 av Språkrådet och Norstedts Juridik AB/Fritzes. Språkrådet är en avdelning inom Isof.
  - Kapitel 1 "Att skriva klarspråk"
  - Kapitel 2 "Att skriva för webben"
  - Kapitel 3 "Text och form"
  - Kapitel 4–7: avstavning, stavning, böjning, ordbildning
  - Kapitel 8 "Att välja ord och ordform"
  - Kapitel 9–13: stor eller liten bokstav, ett ord eller flera, förkortningar, sifferuttryck, skiljetecken
  - Kapitel 14 "Källor och hänvisningar"
- **SS-ISO 24495-1:2023:** ISO 24495-1:2023 finns som svensk standard, "SS-ISO 24495-1:2023 | SV Klarspråk — Del 1: Principer och riktlinjer (ISO 24495-1:2023, IDT)" — [IPLF: standard translations](https://www.iplfederation.org/standard-translations/)
  - Standarden "establishes governing principles and guidelines for developing plain language documents" — [ISO 24495-1:2023](https://www.iso.org/standard/78907.html)
  - Den svenska översättningen har ett nationellt förord — [plainlanguage.com: Sweden](https://plainlanguage.com/sweden/)
- **Språkrådet** inrättades 2006. En studie från 2019 av 631 statliga, regionala och kommunala organ visade att 82 % arbetade med klarspråk — [plainlanguage.com: Sweden](https://plainlanguage.com/sweden/)
- ***Svenska skrivregler*** (Språkrådet, Liber) beskrivs som "the general guideline in Sweden for technical writing issues" och finns som onlinedatabas via Liber — [GU-bibliotekets databaslista](https://databaser.ub.gu.se/svenska-skrivregler/188716)

#### 1f. Svenska AI-mönster
- **claude-humanizer-svenska:** [nordefors-max/claude-humanizer-svenska](https://github.com/nordefors-max/claude-humanizer-svenska) har 8 stjärnor, **ingen licens angiven [LICENS]**, push 2026-03-20 och version 2.0.0.
  - Täcker "16 pattern types including significance inflation, nominalization overuse, passive voice as false formality, anglification".
  - Röstavsnittet säger bland annat "Understatement som trovärdighet. Svenska läsare misstror superlativ." och "Direkthet utan brasklappar." — [SKILL.md](https://github.com/nordefors-max/claude-humanizer-svenska/blob/main/SKILL.md)
- **humanizer-svenska:** [jhwaijeh-gif/humanizer-svenska](https://github.com/jhwaijeh-gif/humanizer-svenska) skapades 2026-10-11 och har 0 stjärnor och MIT. Beskrivning: "För eget bruk, inte vetenskapligt".

### Inferences
- **Föreslagen språkgrind (B):** Vale med en egen stil `Nortropic-sv`. Den innehåller:
  - Hunspell sv_SE.
  - En egen ordlista med ortnamn i Fyrkanten, branschord och firmanamn.
  - En LIX-varning via `metric` med `lix`.
  - Svenska regler mot AI-ismer som `existence`/`substitution`, destillerade ur skrivreglernas kapitel 1, 2 och 8, Nortropics humanizer och, som jämförelse, claude-humanizer-svenska.
  
  LanguageTool läggs till som ett andra pass bara om mätningen visar att det fångar mer än det stör. llepafils metod bör användas: en liten svensk korpus med kända fel och rena texter, där träffar och falsklarm mäts innan en regel får `error`-nivå.
- **Testa Vale på svenska före drift:** filtret `[^a-zA-Z_']` och meningsdelningen är sannolikt engelskinställda. Kontrollera två saker:
  - att ord med å/ä/ö faktiskt stavningskontrolleras
  - att "t.ex." och "m.fl." inte delar meningar
  
  Fler meningar sänker LIX. LanguageTool behövde rätta just detta för svenska förkortningar i september 2026.
- **LIX-tröskel:** källorna ger bara skalan 20–60. Nortropic bör kalibrera sin tröskel empiriskt, till exempel genom att mäta LIX på 10–20 välskrivna svenska lokalföretagssajter. LIX bör användas som varning, inte som grind, eftersom långa svenska sammansättningar höjer LIX utan att texten blir svårare.
- **Bidra uppströms:** det går att bidra med svenska regler till LanguageTool. Små bidrag togs emot i september 2026.

| Kandidat | Lucka | Förankring | Passform (Astro/CF/svenska) | Användning | Verdikt |
|---|---|---|---|---|---|
| Vale + egen stil `Nortropic-sv` | Stil-lint, AI-ismer, LIX | Myndigheternas skrivregler, SS-ISO 24495-1, LIX | Lintar `.md`/`.mdx`/innehållsfiler lokalt. Svenska regler måste skrivas själv | B + D (regler ur skrivreglerna) | **Ta in**: aktivt, MIT, deterministiskt, billigt |
| `lix` i `metric` / vale-cli/readability | Läsbarhet | LIX (Björnsson) | Kräver Vale ≥ 3.23.0 | B | **Ta in**: första LIX i en underhållen linter |
| vale-cli/agent-tools (hook + skills) | Automatisk lint av Claudes ändringar | — | Hooken passar Claude Code-loopen. Kräver `vale` och `jq` | B | **Pröva** hooken. **Avstå** MCP-delen (betald) |
| Hunspell sv_SE (LibreOffice 2.42) | Stavning | — | Laddas via `dicpath` | B | **Ta in**: LGPL-3 berör inte sajterna eftersom ordlistan inte distribueras |
| LanguageTool självhostad (Docker) | Grammatik och stavning | Regelbaserad | Lokalt eller i CI, inte på Workers. Tunna svenska regler | B | **Pröva**: mät mot korpus och behåll bara om värdet överstiger bruset |
| LanguageTool publikt API | — | — | Förbjuder automatiska anrop, och kundtext lämnar huset **[GDPR]** | — | **Avstå** |
| LanguageTool-MCP:er | — | — | 0 stjärnor | — | **Avstå**: anropa den egna servern direkt |
| Sparv | LIX, OVIX och NK för korpusanalys | Svensk språkteknologi | Tung Python-pipeline | D (kalibrering av trösklar) | **Bevaka** |
| textstat / cspell-sv / nspell | — | — | Ingen svenska / GPL-3-ordlista / inaktivt | — | **Avstå** |
| claude-humanizer-svenska | Svenska AI-mönster | Egna observationer | Saknar licens: läs och jämför, kopiera inte | D (checklista mot Nortropics humanizer) | **Bevaka** |
| llepafils-arkitekturen | Mätbar språkgrind | Korpusutvärdering | Katalanska, men metoden är språkoberoende | D | **Ta in** (metoden) |

### Gaps
- Isofs egna sidor (Klarspråkstestet, Isofs skrivråd för webben) gick inte att hämta (robots.txt). Skrivreglernas kapitel 1–2 lästes bara till rubriknivå.
- Det gick inte att verifiera vilken upplaga av *Svenska skrivregler* som är aktuell, eller om Myndigheternas skrivregler har fått en upplaga efter 2014.
- ISO 24495-1:s fyra principer kunde inte verifieras i de hämtade sidorna. Standarden är betald.
- LanguageTools aktuella releasenummer kunde inte verifieras, eftersom GitHub-releaser inte används. Att trunk blev 6.9-SNAPSHOT 2026-05-06 tyder på att 6.8 släpptes ungefär då, men det är en slutsats. Det är också okänt om n-gramdata finns för svenska.
- Status för Stava (KTH) är okänd. Hur Vale tokeniserar svenska har inte testats, bara lästs ur dokumentationen.

---

## 2. Copywriting och CRO för lokala tjänsteföretag: vilka Claude-skills eller promptbibliotek är väl ansedda och underhållna, och hur stämmer de med evidensen (NN/g, klarspråk, JTBD)?

### Takeaway
[coreyhaines31/marketingskills](https://github.com/coreyhaines31/marketingskills) är den klart mest använda och underhållna samlingen: 54,5k stjärnor, MIT, push 2026-10-13 och 50 skills. Skillen `copywriting` v2.2.0 stämmer väl med evidensen på flera punkter:
- tydlighet före fyndighet
- specificitet
- kundens egna ord
- påståenden som kan styrkas, med `[NEED: …]` för det som saknas
- en uttrycklig lista över AI-tells

Men samlingen är SaaS-vinklad (CTA:er som "Start Free Trial") och skriven för engelska, och den innehåller osourcad statistik. Den bör därför destilleras, inte installeras. Skillen `brand-review` i Anthropics `knowledge-work-plugins` ger en bra ram för röstdokumentation och juridiska flaggor. Evidensen att förankra i:
- NN/g:s läsforskning: 79 % skummar, och en koncis, skumbar och objektiv text var 124 % bättre.
- NN/g:s klarspråksråd: meningar på 15–20 ord, och webbcopy med under 50 % av ordmängden i tryck.
- BrightLocals recensionsundersökning 2026 för lokala förtroendesignaler (amerikanskt urval).

### Cited Findings
- **marketingskills** — [repo](https://github.com/coreyhaines31/marketingskills):
  - 54 524 stjärnor, 8 092 forks, MIT. Skapat 2026-01-15, push 2026-10-13.
  - `skills/` innehåller 50 skills, bland annat `copywriting`, `copy-editing`, `cro`, `customer-research`, `marketing-psychology`, `product-marketing`, `offers`, `site-architecture`, `schema`, `seo-audit`, `image` och `video` — [skills-katalogen](https://github.com/coreyhaines31/marketingskills/tree/main/skills)
  - Version 2.0 slog ihop `page-cro` och `form-cro` till `cro`. Kontextfilen heter nu `.agents/product-marketing.md`, och "every other skill checks it first" — [README](https://github.com/coreyhaines31/marketingskills)
- **`copywriting` v2.2.0** (läst vid commit 0f8d899) — [SKILL.md](https://github.com/coreyhaines31/marketingskills/blob/main/skills/copywriting/SKILL.md):
  - **Principer:** "Clarity Over Cleverness", "Benefits Over Features", "Specificity Over Vagueness" och "Customer Language Over Company Language" ("Mirror voice-of-customer from reviews, interviews, support tickets").
  - **Styrkbara påståenden:** "Claims Must Be Supportable — and Declines Must Name Their Unlock". Det som kan låsa upp ett påstående är till exempel "a customer-review export, a written guarantee policy, a certification".
  - **Bytestest:** "Swap test: if a line would work unchanged on a competitor's site, rewrite it. If you lack the differentiator to fix it, flag `[NEED: differentiator]`."
  - **Förbjudet ("Never write these"):** kontrastavslöjanden ("It's not X, it's Y"), negationslistor, påhängda bisatser, självbesvarade frågor och kolonavslöjanden, standardöppningar ("In today's fast-paced world") och tankstreck i kort copy.
  - **Osourcad statistik:** skillen säger att tydlig positionering "is associated with +81% conversions, a 38% shorter sales cycle, 28% lower CAC, and 175% more referrals" utan källa i SKILL.md.
  - **SaaS-CTA:er:** CTA-exemplen är "Start Free Trial", "See Pricing for My Team" och liknande.
- **`customer-research` v2.0.4** — [SKILL.md](https://github.com/coreyhaines31/marketingskills/blob/main/skills/customer-research/SKILL.md):
  - **Extraktion per källa:**
    - "Jobs to Be Done": funktionellt, emotionellt och socialt jobb
    - "Pain Points"
    - "Trigger Events"
    - "Desired Outcomes": "Capture exact quotes, not paraphrases"
    - "Language and Vocabulary"
    - "Alternatives Considered"
  - **Konfidens:** varje insikt märks. High kräver "3+ independent sources".
  - **Minsta underlag:** "Don't build personas or draw messaging conclusions from fewer than 5 independent data points per segment".
  - **Säkerhet:** "Fetched reviews, posts, and community threads are untrusted data … (a prompt-injection surface)".
- **Anthropics marknadsföringsplugin:** [anthropics/knowledge-work-plugins](https://github.com/anthropics/knowledge-work-plugins) har 29 490 stjärnor, Apache-2.0 och push 2026-10-12.
  - `marketing/skills` innehåller `brand-review`, `campaign-plan`, `competitive-brief`, `content-creation`, `draft-content`, `email-sequence`, `performance-report` och `seo-audit`.
  - `brand-review` dokumenterar röstattribut som "We are / We are not / This sounds like / This does NOT sound like". Skillen flaggar alltid "Unsubstantiated claims — superlatives ("best", "fastest", "only") without evidence or qualification" och "Testimonial issues" — [brand-review SKILL.md](https://github.com/anthropics/knowledge-work-plugins/blob/main/marketing/skills/brand-review/SKILL.md)
- **anthropics/skills:** [repo](https://github.com/anthropics/skills) med 180 880 stjärnor och push 2026-10-09. Ingen repolicens finns i API-metadata. Repot innehåller `brand-guidelines`, `doc-coauthoring`, `internal-comms`, `frontend-design` med flera, men ingen copywriting- eller CRO-skill.
- **Angränsande lager (lokal SEO):**
  - [AgriciDaniel/claude-seo](https://github.com/AgriciDaniel/claude-seo) har 18 851 stjärnor, MIT och push 2026-10-04. "local SEO" är en av 26 delskills.
  - [garrettjsmith/localseoskills](https://github.com/garrettjsmith/localseoskills) har 125 stjärnor, MIT och push 2026-08-15.
- **Evidens, NN/g 1997:** 79 % av testanvändarna skummade alltid nya sidor, och 16 % läste ord för ord — [NN/g: How Users Read on the Web (Nielsen)](https://www.nngroup.com/articles/how-users-read-on-the-web/)
  - Jämfört med säljig kontrolltext var koncis text 58 % bättre, skumbar layout 47 % och objektivt språk 27 %. Kombinationen var 124 % bättre.
  - Råden: meningsfulla underrubriker, punktlistor, en idé per stycke, omvänd pyramid och halva ordmängden.
- **Evidens, NN/g 2017:** även experter vill ha klarspråk. Webbcopy bör ha "fewer than 50% of the words" jämfört med tryck, och meningar bör vara högst 15–20 ord — [NN/g: Plain Language Is for Everyone, Even Experts (Loranger)](https://www.nngroup.com/articles/plain-language-experts/)
- **Lokala förtroendesignaler** — [BrightLocal Local Consumer Review Survey 2026](https://www.brightlocal.com/research/local-consumer-review-survey/) (publicerad 2026-02-11, 1 002 amerikanska vuxna):
  - 97 % läser recensioner av lokala företag.
  - 74 % beaktar bara recensioner från de senaste tre månaderna.
  - 47 % anlitar inte ett företag med färre än 20 recensioner.
  - 89 % förväntar sig att ägaren svarar, och 50 % stöts bort av mallsvar.
  - Konsekvens mellan recensioner rankas högst (56 %). Foto eller video i en recension tycker 36 % är viktigt.
  - AI-verktyg som ChatGPT användes av 45 % som recensionskälla, mot 6 % året innan.
- **Innehållsstrategi:** Halvorson & Rach, *Content Strategy for the Web* (2:a uppl., New Riders), beskriver "the content strategy quad". Där står Substance för "What content do you need and why?" och Structure för "How will your content be prioritized, organized, formatted, and displayed?" — [O'Reilly, kap. 8](https://www.oreilly.com/library/view/content-strategy-for/9780132883269/ch08.html)
  - De andra komponenterna är Workflow och Governance kring en kärna, och principen är "Use less content rather than more" — [i-programmer-recension](https://i-programmer.info/bookreviews/12-web-design-and-development-/4841-content-strategy-for-the-web.html)

### Inferences
- **`copywriting` och evidensen:** skillen stämmer med NN/g (konkret, objektivt, skumbart) och med klarspråk (enkla ord, aktiv form). Kravet på styrkbara påståenden med `[NEED: …]` och bytestestet ligger nära Nortropics insikt att det specifika slår det generiska. Bytestestet är dessutom ett mätbart sätt att fånga generisk copy.
- **Svagheter i `copywriting`:** osourcad statistik, SaaS-CTA:er och engelskspecifika AI-tells, som tankstreck. Svenska AI-tells ser delvis annorlunda ut: nominaliseringar, passiv som falsk formalitet och anglicismer enligt claude-humanizer-svenska.
- **Lokala CTA:er:** de bör handla om att ringa, få offert eller boka hembesök. Det är min slutsats, utan källa.
- **`customer-research` och JTBD:** skillen har en tydlig JTBD-ram och konfidensnivåer och är därför den mest evidensförankrade delen.
- **BrightLocal:** att 74 % bara läser recensioner från de senaste tre månaderna talar för att visa datum och länka till Google-profilen hellre än att frysa gamla citat på sajten. Urvalet är amerikanskt, så siffrorna kan inte direkt föras över till Norrbotten.
- **Versioner:** samlingen ändras ofta, med omdöpningar i v2.0. Destillera från en låst commit.

| Kandidat | Lucka | Förankring | Passform | Användning | Verdikt |
|---|---|---|---|---|---|
| marketingskills `copywriting` | Konverteringscopy | Klarspråk, VOC, styrkbara påståenden | Engelska och SaaS. Översätt principerna och byt CTA-exempel | D | **Pröva**: destillera reglerna, installera inte |
| marketingskills `customer-research` | Röst och VOC ur intervjuer och recensioner | JTBD, konfidensnivåer | Språkoberoende metod | D | **Ta in** (metoden) |
| marketingskills `copy-editing`, `cro`, `marketing-psychology` | Redigering och sidstruktur | — | Ej lästa | D | **Bevaka**: läs innan beslut |
| Hela marketingskills-pluginet i drift | — | — | 50 skills med breda triggers kan krocka med Nortropics egna skills | — | **Avstå** |
| knowledge-work-plugins `brand-review` | Röstdokumentation, juridiska flaggor | Röstattribut, osubstantierade påståenden | Apache-2.0 | D | **Pröva** |
| claude-seo / localseoskills | Lokal SEO | — | Annat lager | — | **Bevaka** (andra forskares lager) |

### Gaps
- Ingen svensk copywriting-skill för lokala tjänsteföretag hittades. GitHub-sökningen gav bara humanizers och bokföringsskills, till exempel [erp-mafia/accounted-skills](https://github.com/erp-mafia/accounted-skills).
- `copy-editing`, `cro` och `references/copy-frameworks.md` lästes inte, så källan till "+81 %"-siffran är okänd.
- Ingen svensk eller nordisk motsvarighet till BrightLocals undersökning hittades, eftersom webbsökningsbudgeten tog slut.

---

## 3. Ägarens röst: hur fångas den ur intervjutranskript och recensioner?

### Takeaway
Arbetet har två delar:
1. **Lokal svensk transkribering** med **KB-Whisper** via whisper.cpp eller faster-whisper. KB-Whisper är Apache-2.0, tränad på över 50 000 timmar svenskt tal och har i snitt 47 % lägre WER än `whisper-large-v3`. Intervjuljudet lämnar då aldrig Nortropics dator.
2. **En strukturerad extraktion** till röstprofil och citatbank. Den bygger på:
   - `customer-research`s ram: JTBD, smärtor, triggers, exakta citat och konfidens.
   - NN/g:s fyra tondimensioner.
   - `brand-review`s format "We are / We are not".

Enligt skillbeskrivningen i Nortropics inventarium använder humanizern redan "briefens fem formuleringar ur verksamhetens och kundernas egna ord" som röstprov. Det som saknas är ett systematiskt extraktionssteg som tar fram de formuleringarna.

### Cited Findings
- **KB-Whisper** — [KBLab/kb-whisper-large](https://huggingface.co/KBLab/kb-whisper-large):
  - "License: apache-2.0", tränad på "over 50,000 hours of Swedish speech".
  - Bästa modellen "reduces the Word Error Rate (WER) by an average of 47% compared to OpenAI's `whisper-large-v3`" (FLEURS, CommonVoice, NST).
  - Storlekar: tiny, base, small, medium och large-v3.
  - Det finns GGML-checkpoints för whisper.cpp och ctranslate2-checkpoints för faster-whisper och WhisperX.
  - Den tillhörande artikeln publicerades 2025-05-23.
- **Motorer:**
  - [ggml-org/whisper.cpp](https://github.com/ggml-org/whisper.cpp): 54 348 stjärnor, MIT, push 2026-10-12.
  - [SYSTRAN/faster-whisper](https://github.com/SYSTRAN/faster-whisper): 25 840 stjärnor, MIT, push 2026-10-13.
  - [m-bain/whisperX](https://github.com/m-bain/whisperX): 24 530 stjärnor, BSD-2-Clause, push 2026-09-26, "Word-level Timestamps (& Diarization)".
  - [openai/whisper](https://github.com/openai/whisper): 110 457 stjärnor, MIT, push 2026-08-31.
- **Extraktionsramen** i `customer-research` (se avsnitt 2) ger exakta citat och ordförråd ("This is gold for copy"). Den samlar 5–10 "money quotes" per tema i en citatbank, sätter konfidensnivåer och kräver minst 5 datapunkter — [SKILL.md](https://github.com/coreyhaines31/marketingskills/blob/main/skills/customer-research/SKILL.md)
- **NN/g:s fyra tondimensioner** är "Formal vs. casual", "Serious vs. funny", "Respectful vs. irreverent" och "Matter-of-fact vs. enthusiastic" — [NN/g: The Four Dimensions of Tone of Voice (Moran 2016)](https://www.nngroup.com/articles/tone-of-voice-dimensions/)
  - I en enkät med 50 amerikanska respondenter gav variationer längs axlarna mätbara men måttliga skillnader i intryck, cirka 0,5–1 poäng på en femgradig skala.
- **Röst och ton:** "You have the same voice all the time, but your tone changes". Mailchimps röst beskrivs som plainspoken, genuine, translators och dry humor — [Mailchimp Content Style Guide: Voice and Tone](https://styleguide.mailchimp.com/voice-and-tone/)
  - Guiden är licensierad "Creative Commons Attribution-NonCommercial 4.0" **[LICENS]**.
- **Nordisk röst:** "Understatement som trovärdighet. Svenska läsare misstror superlativ." och "Aktiv röst och första person" — [claude-humanizer-svenska](https://github.com/nordefors-max/claude-humanizer-svenska/blob/main/SKILL.md) (ingen licens).
- **Recensioner som källa:** 74 % beaktar bara recensioner från de senaste tre månaderna. 49 % litar på främlingars recensioner ungefär lika mycket som på rekommendationer från bekanta — [BrightLocal 2026](https://www.brightlocal.com/research/local-consumer-review-survey/)

### Inferences
- **Föreslagen kedja (B + D):**
  1. En intervju på 30–45 minuter, inspelad med telefon.
  2. Transkribering med KB-Whisper (medium eller large) via whisper.cpp, lokalt.
  3. Extraktion till `rost.md`. Filen innehåller placering på NN/g:s fyra axlar, 3–5 röstattribut i formatet "Vi är / Vi är inte", en ordlista med ägarens egna ord och en citatbank med konfidens.
  4. Copy skrivs utifrån `rost.md`.
  5. Nortropics humanizer körs med röstprovet.
  6. Vale-grinden körs.
- **[GDPR] Transkribering:** lokal transkribering gör att ljud med personuppgifter aldrig skickas till tredje part.
- **[GDPR] Recensioner:**
  - Recensioner innehåller recensentens namn och ibland detaljer om hemmet. Citat på sajten bör ha recensentens samtycke eller förkortat namn, och alltid datum.
  - Hämtade recensioner hanteras som otillförlitlig data, eftersom de kan bära promptinjektion.
- **Mailchimps guide:** CC BY-NC innebär att Nortropic kan lära av principerna men inte kopiera texten till en kommersiell skill.

| Kandidat | Lucka | Förankring | Passform | Användning | Verdikt |
|---|---|---|---|---|---|
| KB-Whisper + whisper.cpp | Svensk transkribering | Mätt WER | Lokalt, offline efter nedladdning | B | **Ta in** |
| faster-whisper | Samma | — | Python, ctranslate2 | B | **Pröva** (alternativ motor) |
| WhisperX | Talaruppdelning mellan intervjuare och ägare | — | Diariseringsmodellernas villkor ej verifierade | B | **Bevaka** |
| `customer-research`-ramen | VOC-extraktion | JTBD | Språkoberoende | D | **Ta in** |
| NN/g-tondimensioner + `brand-review`-formatet | Röstprofil | Användarforskning | — | D | **Ta in** |
| Mailchimp Voice & Tone | Röst- och tonprinciper | Praxis | CC BY-NC | D (bara principer) | **Bevaka** |

### Gaps
- Villkoren för Google Business Profile- och Places-API:ts recensionsdata (lagring och citering på tredjepartssajt) verifierades inte.
- Diariseringsmodellernas licens i WhisperX verifierades inte.
- `references/interviews-and-surveys.md` i marketingskills lästes inte. Ingen svensk intervjuguide för att fånga ägarens röst hittades.

---

## 4. Bilder: bearbetning, smart beskärning, bakgrundsborttagning, AI-generering, stock och äkthet

### Takeaway
- **Bearbetning:** Astros inbyggda pipeline räcker. Sharp är standard, `<Picture>` ger avif och webp, och sedan 5.10 finns `layout`, `fit`, `position` och `priority`. För statiska sajter på Cloudflare bör adapterns `imageService: 'compile'` väljas, eftersom standarden `cloudflare-binding` optimerar vid runtime.
- **Smart beskärning:** sharps strategi `attention`. smartcrop.js har varit inaktivt sedan 2024.
- **Bakgrundsborttagning:** rembg lokalt med uttryckligen valda BiRefNet (MIT). Standardmodellen `bria-rmbg` kräver kommersiellt avtal, och @imgly-biblioteket är AGPL.
- **AI-bilder:** Gemini API på betald nivå, med SynthID på alla bilder. Villkoren kräver betald nivå för API-klienter som görs tillgängliga för användare i EES, och gratisnivån tillåter mänsklig granskning av indata. Bilderna ska märkas som illustration. AI-förordningens art. 50(4) om deepfakes gäller användare sedan 2 augusti 2026.
- **Stock:** licenserna tillåter kommersiell användning utan kreditering. Unsplash-API:t kräver dock hotlinking, kreditering och "non-automated" användning, vilket krockar med en autonom kedja.
- **Äkthet:** NN/g:s ögonrörelsestudier och Googles egen fotopolicy talar för riktiga foton.

### Cited Findings

#### 4a. Optimering och format
- **Astros bildkomponenter** — [Astro docs: Images](https://docs.astro.build/en/guides/images/):
  - Astro har "built-in `<Image />` and `<Picture />` Astro components".
  - `<Picture />` kan göra om lokal `.png` till "web-friendly `avif` and `webp` format".
  - "Sharp is the default image service used for `astro:assets`".
  - Bilder i `public/` "are always served or copied into the build folder as-is, with no processing".
  - `alt` "is required for both the `<Image />` and `<Picture />` components".
  - Fjärrbilder bearbetas bara om de är godkända via `image.domains` eller `image.remotePatterns`.
- **Egenskaper sedan `astro@5.10.0`** — [Astro docs: astro:assets](https://docs.astro.build/en/reference/modules/astro-assets/):
  - `layout` (`constrained`, `full-width`, `fixed`, `none`), `fit`, `position` och `priority`.
  - `priority` sätter `loading="eager"`, `decoding="sync"` och `fetchpriority="high"`.
  - `position` följer CSS `object-position`.
  - `<Image />` ger `.webp` som standard, och `<Picture />` har standardvärdet `formats` = `['webp']`. AVIF måste alltså anges uttryckligen.
- **Cloudflare-adapterns `imageService`** har lägena `passthrough`, `cloudflare`, `cloudflare-binding`, `compile` och `custom` — [Astro docs: @astrojs/cloudflare](https://docs.astro.build/en/guides/integrations-guide/cloudflare/)
  - Standard är `cloudflare-binding`, och "With the default setting, optimization with the binding happens only at runtime".
  - `compile` "transforms images locally at build time for prerendered routes".
- **Versioner:** `astro@7.3.8` (2026-10-08), `@astrojs/cloudflare@14.3.4` (2026-10-06) och `@astrojs/cloudflare@15.0.0-beta.1` (2026-10-02) — [withastro/astro releases](https://github.com/withastro/astro/releases)
  - [withastro/astro](https://github.com/withastro/astro) har 63 205 stjärnor, MIT enligt LICENSE-filen och push 2026-10-13.
  - Cloudflare köpte Astro i januari 2026 — [Cloudflare pressmeddelande 2026-01-16](https://www.cloudflare.com/press/press-releases/2026/cloudflare-acquires-astro-to-accelerate-the-future-of-high-performance-web-development/)
- **Cloudflare Images-transformationer:** 5 000 unika transformationer per månad ingår, därefter "$0.50 per 1,000". På gratisplanen ger nya transformationer över gränsen felet `9422`, utan debitering — [Cloudflare Images pricing](https://developers.cloudflare.com/images/pricing/)

#### 4b. Smart beskärning
- **sharp:** [lovell/sharp](https://github.com/lovell/sharp) har 32 753 stjärnor, Apache-2.0 och push 2026-10-13. Senaste version är v0.35.5 (2026-09-27) — [sharp: resize](https://sharp.pixelplumbing.com/api-resize)
  - `attention` fokuserar på "the region with the highest luminance frequency, colour saturation and presence of skin tones".
  - `entropy` fokuserar på "the region with the highest Shannon entropy".
- **smartcrop.js:** [jwagner/smartcrop.js](https://github.com/jwagner/smartcrop.js) har 12 957 stjärnor och MIT, men senaste push var 2024-03-16 **(inaktivt)**.
- **Cloudflare Images:** `gravity` accepterar `auto`, `face`, en sida eller `XxY`. `format=auto` "Automatically serves the most efficient format that the requesting browser supports" — [Cloudflare: Transform via URL](https://developers.cloudflare.com/images/transform-images/transform-via-url/)

#### 4c. Bakgrundsborttagning
- **rembg** — [rembg README](https://github.com/danielgatis/rembg) **[LICENS] [GDPR]**:
  - [danielgatis/rembg](https://github.com/danielgatis/rembg) har 25 061 stjärnor, MIT och push 2026-10-10. Den kan köras på CPU med `rembg[cpu]`.
  - Modeller: u2net, isnet, sam, birefnet-* och `bria-rmbg`, som är standard.
  - "Model weights carry their own licenses". BRIA RMBG har "a BRIA license that requires a paid agreement for commercial use".
  - Modellen `withoutbg` skickar bilder till withoutBG:s servrar.
- **BiRefNet:** [ZhengPeng7/BiRefNet](https://github.com/ZhengPeng7/BiRefNet) har 4 281 stjärnor, MIT och push 2026-10-11. Modellkortet anger "License: mit" — [HF: ZhengPeng7/BiRefNet](https://huggingface.co/ZhengPeng7/BiRefNet)
- **RMBG-2.0:** "The model is released under a CC BY-NC 4.0 license for non-commercial use" och "Commercial use is subject to a commercial agreement with BRIA" — [HF: briaai/RMBG-2.0](https://huggingface.co/briaai/RMBG-2.0) **[LICENS]**
- **@imgly:** [imgly/background-removal-js](https://github.com/imgly/background-removal-js) har 7 351 stjärnor och **AGPL-3.0 [LICENS]**. Senaste push var 2025-07-18.
- **Cloudflare:** `segment=foreground` "Automatically isolates the subject of an image by replacing the background with transparent pixels" — [Cloudflare: Transform via URL](https://developers.cloudflare.com/images/transform-images/transform-via-url/)
- **Bloom (Trybloom):** en officiell hostad MCP-server med OAuth eller API-nyckel — [APIs.io: Bloom MCP](https://apis.io/servers/trybloom/bloom/)
  - Verktyg bland annat `bloom_remove_background`, `bloom_generate_image` och `bloom_onboard_brand`.
  - "MCP access is included in every paid plan".
  - Förteckningen anger inte hur data hanteras.

#### 4d. AI-bildgenerering och märkning
- **Gemini API:** "All generated images include a SynthID watermark" — [Gemini API: Image generation](https://ai.google.dev/gemini-api/docs/image-generation)
  - Modeller: Nano Banana 2 (`gemini-3.1-flash-image`), Nano Banana Pro (`gemini-3-pro-image`), Nano Banana 2.1 och Nano Banana 2 Lite.
  - `gemini-2.5-flash-image` kallas "legacy".
- **Gemini API-villkoren** **[GDPR]** — [Gemini API Additional Terms](https://ai.google.dev/gemini-api/terms):
  - "You may use only Paid Services when making API Clients available to users in the European Economic Area". Det gäller även Schweiz och Storbritannien.
  - På gratisnivån "human reviewers may read, annotate, and process your API input and output".
  - På betald nivå används inte prompter och svar för att förbättra Googles produkter. De loggas en begränsad tid för att upptäcka missbruk.
  - "Google won't claim ownership over that content".
- **SynthID:** vattenmärkena är "imperceptible to humans" — [Google DeepMind: SynthID](https://deepmind.google/technologies/synthid/)
- **MCP:er och omslag från tredje part:**
  - [zhongweili/nanobanana-mcp-server](https://github.com/zhongweili/nanobanana-mcp-server): 400 stjärnor, MIT, push 2026-10-07.
  - [awkoy/replicate-flux-mcp](https://github.com/awkoy/replicate-flux-mcp): 105 stjärnor, MIT, push 2026-10-01.
  - [deepfates/mcp-replicate](https://github.com/deepfates/mcp-replicate): **arkiverad**.
  - [luminarylane/fal-mcp-server](https://github.com/luminarylane/fal-mcp-server): 61 stjärnor, MIT, push 2026-05-04.
  - [MiniMax-AI/MiniMax-MCP](https://github.com/MiniMax-AI/MiniMax-MCP): 1 585 stjärnor, MIT, push 2026-08-20.
  - [ffroliva/gflow-cli](https://github.com/ffroliva/gflow-cli): 286 stjärnor, MIT, beskrivs som "Unofficial, alpha, not affiliated with Google".
- **FLUX [dev]** — [BFL: Non-Commercial License](https://bfl.ai/legal/non-commercial-license-terms) **[LICENS]**:
  - Själva modellen får bara användas icke-kommersiellt, det vill säga om "you do not receive any direct or indirect payment arising from the use".
  - Utdata får användas "for any purpose (including for commercial purposes)".
- **Modellbyte:** marketingskills `image`-skill anger att "`gpt-image-1` retires on 23 Oct 2026", med `gpt-image-2.5-sunburst` och `gpt-image-2.5-flare` som ersättare. Uppgiften är sekundär och inte kontrollerad mot OpenAI — [image SKILL.md](https://github.com/coreyhaines31/marketingskills/blob/main/skills/image/SKILL.md)
- **AI-förordningen, art. 50** — [artificialintelligenceact.eu: Article 50](https://artificialintelligenceact.eu/article/50/):
  - 50(2): leverantörer ska se till att syntetiskt innehåll "are marked in a machine-readable format and detectable as artificially generated or manipulated".
  - 50(4): användare (deployers) ska upplysa om deepfakes. En deepfake "resembles existing persons" och "would falsely appear to a person to be authentic or truthful".
  - Text behöver ingen upplysning om den "has undergone a process of human review or editorial control".
  - Artikeln "Comes into force 2 August 2026".
- **Omnibus-uppgörelsen:** den preliminära överenskommelsen från 2026-05-07 satte leverantörernas tidsfrist för 50(2) till "four months", alltså till 2 december 2026 — [William Fry](https://www.williamfry.com/knowledge/eu-ai-act-omnibus-deal-reached-postponed-deadlines-watermarking-compromise-and-the-nudificiation-prohibition/)
  - En sekundärkälla från 2026-08-22 anger att fristen gäller system "already placed on the market before 2 August 2026" och att 50(4) gäller "since 2 August 2026, with no extension" — [Compliance Hub](https://compliancehub.wiki/eu-ai-act-december-2-2026-legacy-systems-watermarking-grace-period-expiry/)

#### 4e. Stockbilder: licenser och API-villkor **[BILDRÄTT]**
- **Unsplash-licensen** ger rätt att använda bilder "for free, including for commercial purposes, without permission from or attributing the photographer or Unsplash". Undantaget är "the right to compile images from Unsplash to replicate a similar or competing service" — [Unsplash License](https://unsplash.com/license)
- **Unsplash-API:t** — [Unsplash API Guidelines](https://help.unsplash.com/en/articles/2511245-unsplash-api-guidelines); [Attribution](https://help.unsplash.com/en/articles/2511315-guideline-attribution):
  - "All API uses must use the hotlinked image URLs returned by the API".
  - Vid nedladdningsliknande användning krävs ett anrop till `download_location`.
  - Unsplash och fotografen ska krediteras med länk och UTM-parametrar.
  - "The API is to be used for non-automated, high-quality, and authentic experiences".
- **Pexels-licensen** — [Pexels License](https://www.pexels.com/license/):
  - "Attribution is not required".
  - "Identifiable people may not appear in a bad light or in a way that is offensive".
  - "Don't imply endorsement of your product by people or brands on the imagery".
  - Bilder får inte ingå i varumärke, firmanamn eller liknande.
- **Pexels-API:t** kräver en "prominent link to Pexels" och kreditering av fotografer "when possible". Gränsen är "200 requests per hour and 20,000 requests per month" — [Pexels API](https://www.pexels.com/api/documentation/)
- **Stock-MCP:er:**
  - [hellokaton/unsplash-mcp-server](https://github.com/hellokaton/unsplash-mcp-server): 237 stjärnor, MIT, push 2026-10-12.
  - [cevatkerim/unsplash-mcp](https://github.com/cevatkerim/unsplash-mcp): 30 stjärnor, MIT, ger färdig `attribution_html`.
  - [garylab/pexels-mcp-server](https://github.com/garylab/pexels-mcp-server): 25 stjärnor, **ingen licens**, push 2025-11-02.

#### 4f. Äkta foton och stock: vad källorna säger
- **NN/g:s ögonrörelsestudier:** användare ignorerar "purely decorative images" och "stock photos of generic people" — [NN/g: Photos as Web Content (Nielsen 2010)](https://www.nngroup.com/articles/photos-as-web-content/)
  - På FreshBooks personalsida lade användarna 10 % mer tid på porträtten än på biografierna, trots att biografierna tog 316 % mer plats.
  - Det som avgjorde var att det var "real people who actually work at the company".
- **CXL** refererar ett test där besökare som såg en riktig kund var "35% more likely to sign up" än med det bästa stockfotot — [CXL (Walker, uppd. 2023)](https://cxl.com/blog/stock-photography-vs-real-photos/)
  - Artikeln nämner också Harrington Movers, som fick cirka $10 000 mer per månad med riktiga foton.
  - Artikeln saknar urvalsstorlekar och citerar fortfarande en studie av Stapel, som fälldes för forskningsfusk. Den är en svag sekundärkälla.
- **Googles policy för företagsprofiler:**
  - "The photo should be in focus, well lit, and have no significant alterations or excessive use of filters or AI" — [Google Business Profile: business-specific photos](https://support.google.com/business/answer/6123536?hl=en)
  - "In other words, the image should represent reality" — [Google Business Profile: photo guidelines](https://support.google.com/business/answer/6103862?hl=en)

### Inferences
- **Adapter eller ren statisk build:** valet av `imageService` gäller bara om sajten byggs med Cloudflare-adaptern. Byggs den som ren statisk output och laddas upp som statiska tillgångar används Astros standard, Sharp, redan vid bygget. Det följer av att Sharp är standardtjänsten för `astro:assets`, men kombinationen testades inte här.
- **Hotlinking krockar med optimeringen:** Unsplash-API:ts krav på hotlinkade URL:er går inte ihop med Astros lokala optimering. Om Astro optimerar en godkänd fjärrbild vid bygget serveras en lokal kopia, vilket sannolikt inte uppfyller API-kravet. Nortropic får välja mellan två vägar:
  - Hotlinka utan Astro-optimering. Då hämtar besökarens webbläsare från Unsplashs CDN **[GDPR]**.
  - Välja bilder manuellt på webbplatsen enligt Unsplash-licensen och lägga dem i `src/`.
  
  Kravet på "non-automated" talar emot en autonom MCP-kedja.
- **Inga stockpersoner på kundsajter:** tre skäl talar emot det.
  - NN/g visar att generiska personer ignoreras.
  - Pexels förbjuder att personer på bilderna ser ut att stödja produkten.
  - På en hantverkarsajt läses en person lätt som anställd.
  
  Stock och AI begränsas därför till miljöer, material och detaljer, alltid märkta som illustration enligt Nortropics befintliga policy.
- **AI-bilder och deepfake-regeln:** fotorealistiska AI-bilder som ser ut att visa företagets eget arbete riskerar att räknas som deepfakes enligt art. 50(4). De kan också vara vilseledande marknadsföring. Märkningen ska synas för besökaren. SynthID, som är leverantörens märkning, ersätter inte användarens upplysningsplikt. AI-bilder ska aldrig laddas upp till Google-profilen, enligt Googles egen policy.
- **[GDPR] Foton från kunders hem:** sådana foton kan avslöja adress genom exif-GPS, husnummer eller registreringsskyltar, och kan visa ansikten. Bildskillen bör kräva granskning och borttagning av metadata före publicering.
- **Bloom:** Bloom-MCP:n finns redan som anslutet, uppskjutet verktyg i den här arbetsmiljön (`mcp__Trybloom__*`). Den kan testas utan ny integration, men villkoren måste läsas först.

| Kandidat | Lucka | Förankring | Passform | Användning | Verdikt |
|---|---|---|---|---|---|
| Astro `<Picture>`/`<Image>` + `layout`/`priority`, `formats={['avif','webp']}` | Format, responsivitet, LCP | Webbstandarder (`picture`/`srcset`) | Inbyggt, statiskt | S + B | **Ta in** |
| Cloudflare-adaptern `imageService: 'compile'` | Optimering vid bygget | — | Undviker runtime-transformationer och avgifter | B | **Ta in**: verifiera i adapter v15 |
| sharp `attention` i förbyggsskript | Smart beskärning | Saliens (luminans, mättnad, hudtoner) | Node, lokalt | B | **Ta in** |
| smartcrop.js | — | — | Inaktivt sedan 2024 | — | **Avstå** |
| rembg + BiRefNet | Bakgrundsborttagning | Segmentering | Python, CPU, lokalt | B | **Pröva**: välj modellen uttryckligen, eftersom `bria-rmbg` kräver kommersiellt avtal **[LICENS]** |
| @imgly/background-removal | — | — | AGPL-3.0 | — | **Avstå [LICENS]** |
| Cloudflare Images `segment=foreground` | Bakgrundsborttagning | — | Samma leverantör som hostingen | A (vid bygget) | **Pröva** som jämförelse mot rembg |
| Bloom MCP (redan ansluten) | Generering, borttagning, varumärke | — | Betald, datahantering okänd | A | **Bevaka** |
| Gemini API, betald nivå (eget omslag) | Märkta illustrationer | SynthID | Betald nivå krävs för API-klienter som görs tillgängliga för användare i EES. Gratisnivån tillåter mänsklig granskning **[GDPR]** | A (vid biblioteks- eller sajtbygge, aldrig på sajten) | **Pröva** |
| nanobanana-mcp-server | Samma via MCP | — | Tredjepart, MIT | A (biblioteksbygge) | **Pröva** |
| FLUX [dev] självhostad | — | — | Icke-kommersiell modellicens | — | **Avstå [LICENS]** |
| Replicate- och fal-MCP:er | Alternativa modeller | — | Små projekt, en arkiverad | — | **Bevaka** |
| MiniMax-MCP / gflow-cli | — | — | Leverantör utanför EU **[GDPR]** / inofficiellt verktyg | — | **Avstå** |
| Unsplash via API/MCP | Stock | — | Hotlinking och "non-automated" | — | **Avstå** i autonom kedja. Manuellt val enligt licensen: **Pröva** sparsamt |
| Pexels via API/MCP | Stock | — | Synlig länk till Pexels krävs, MCP:er saknar licens | — | **Bevaka** |

### Gaps
- Om sharp och Astro avkodar iPhone-HEIC (HEVC) och om metadata tas bort som standard verifierades inte.
- Kvaliteten i Cloudflares `segment` jämfört med BiRefNet testades inte.
- Bloom MCP:s data- och licensvillkor är okända.
- Villkoren för kommersiell användning av FLUX via API-leverantörer (BFL API, Replicate, fal) och OpenAI:s aktuella bildmodeller kontrollerades inte mot primärkällor.
- Det är inte verifierat om omnibusförordningen har antagits formellt och publicerats i EUT. Hela definitionen av deepfake i art. 3(60) lästes inte.
- Svensk marknadsrätt om AI-bilder i reklam lästes inte, eftersom webbsökningsbudgeten tog slut. Det gäller både marknadsföringslagen och Konsumentverkets vägledning.

---

## 5. Fotoguide för ägare (telefon) och alt-text

### Takeaway
Fotolistan bör följa **Googles kategorier för företagsprofiler**: exteriör, interiör, produkter, i arbete och team, med minst tre bilder av varje. Bilderna ska vara skarpa och väl belysta och sakna tunga filter och AI. Rekommenderad storlek är 720×720 px. En fotosession kan då täcka både sajten och Google-profilen.

För alt-text används **W3C WAI:s beslutsträd** som algoritm och **1177:s svenska regler** som stil. Alt-texten ska vara en kort mening som slutar med punkt, cirka 80 tecken, och ska inte nämna kön, ålder eller kläder om det inte är relevant. Astro tvingar fram `alt`. Inget färdigt alt-textverktyg är värt att ta in. Claude-vision med beslutsträdet i en egen skill, plus ägarens granskning, räcker.

### Cited Findings
- **Googles fotokategorier** — [Google Business Profile: business-specific photos](https://support.google.com/business/answer/6123536?hl=en):
  - **Exteriör:** "Add at least three great exterior photos". Tips: "Capture a photo from each direction that customers might approach your business."
  - **Interiör:** minst tre bilder.
  - **Produkter:** minst tre, "evenly lit".
  - **I arbete:** "at least three photos that are representative of the services you offer" och "Capture photos of your team providing different types of service to customers".
  - **Team:** minst tre, "Show something a little less formal to humanize your business".
- **Format:** JPG eller PNG, 10 KB–5 MB. Rekommenderat 720×720 px, minst 250×250 px — [Google Business Profile: photo guidelines](https://support.google.com/business/answer/6103862?hl=en)
- **W3C WAI:s beslutsträd** — [W3C WAI: An alt Decision Tree](https://www.w3.org/WAI/tutorials/images/decision-tree/):
  1. **Text i bilden:** tomt `alt` om texten finns intill. Om texten inte finns någon annanstans ska den stå i `alt`.
  2. **Bild i länk eller knapp:** "communicate the destination of the link or action taken".
  3. **Bild som tillför mening:** kort beskrivning. Komplex bild: "Include the information contained in the image elsewhere on the page". Redundant bild: tomt `alt`.
  4. **Dekorativ bild:** tomt `alt`.
  5. "This decision tree does not cover all cases".
- **1177:s riktlinjer** — [1177: Riktlinjer för alt-texter och bildtexter](https://www.1177.se/riktlinjer-och-material/riktlinjer-for-bild-och-video/riktlinjer-for-alt-texter-och-bildtexter/):
  - "En alt-text är en kort beskrivning av det innehållsbärande i en bild."
  - Den ska "lyfta fram informationen som bilden ger, snarare än att beskriva hur den ser ut".
  - "en kort tydlig mening och avsluta med punkt. Försök hålla dig till 80 tecken."
  - Utelämna "kön, ålder, funktionsvariation, kläder och andra utseenden om det inte är relevant för innehållet".
  - Skriv bara "foto" eller "illustration" om det är relevant.
  - Bildtexten syns under bilden och hjälper användaren att tolka den.
- **Astro:** `alt` krävs på `<Image />` och `<Picture />`. Dekorativa bilder får `alt=""` — [Astro docs: Images](https://docs.astro.build/en/guides/images/)
- **Alt-textverktyg på GitHub** är små eller inaktiva:
  - [Nutlope/alt-text-generator](https://github.com/Nutlope/alt-text-generator): 137 stjärnor, ingen licens, push 2023-10-18.
  - [android-com-pl/wp-ai-alt-generator](https://github.com/android-com-pl/wp-ai-alt-generator): 20 stjärnor, GPL-3.0, WordPress.

### Inferences
- **Föreslagen fotolista för hantverkare (D, kalibreras per bransch):**
  - 3 exteriör: verkstad, bil med dekor, skylt.
  - 3–6 i arbete: händer, verktyg, process.
  - 3 före/efter-par från samma vinkel.
  - 3 team, informella.
  - 1 porträtt av ägaren till "Om oss".
  - Både liggande och stående varianter.
  
  Telefontekniken (dagsljus, ren lins, ingen digital zoom) har ingen källa i denna genomgång och bör verifieras mot tillverkarnas guider.
- **Alt-text-skill (B):** steg 1 är beslutsträdet och steg 2 är 1177:s stilregler. Den synliga bildtexten bär lokal kontext, som ort och jobb, medan alt-texten bär informationen. Märkta illustrationer får "Illustration:" i den synliga bildtexten, inte bara i alt-texten.
- **Verdikt:**
  - Googles fotokategorier, beslutsträdet och 1177:s regler: **Ta in** (D).
  - Alt-textverktyg från GitHub: **Avstå**.
  - Claude-vision i egen skill med ägarens granskning: **Ta in** (B).

### Gaps
- Telefonfotoguider från Apple och Google och svenska guider för småföretagsfoto kunde inte sökas fram, eftersom webbsökningsbudgeten tog slut.
- DIGG:s webbriktlinjer om bilder och alt-text lästes inte.

---

## 6. Kort video

### Takeaway
- **Remotion** har en egen licens som är gratis för "a for-profit organization with up to 3 employees". Nortropic som enskild firma uppfyller det i dag. Licensen ändras i Remotion 5.0.
- **Remotions officiella skills** kan användas tillsammans med Remotion för programmerade korta klipp.
- **FFmpeg** (LGPL-2.1+, med valfria GPL-delar) sköter omkodning.
- **KB-Whisper** ger svenska undertexter. WCAG 1.2.2 (nivå A) kräver undertexter för förinspelad synkroniserad media.
- **Autospelad video** längre än 5 sekunder måste kunna pausas (WCAG 2.2.2).
- **Workers statiska tillgångar** har en gräns på 25 MiB per fil.

### Cited Findings
- **Remotion** — [Remotion LICENSE.md](https://github.com/remotion-dev/remotion/blob/main/LICENSE.md) **[LICENS]**:
  - [remotion-dev/remotion](https://github.com/remotion-dev/remotion) har 63 814 stjärnor, egen licens och push 2026-10-13.
  - Gratislicens för "an individual", "a for-profit organization with up to 3 employees", ideella organisationer och utvärdering.
  - Andra behöver "Company License".
  - "In Remotion 5.0, the license will slightly change".
- **Remotions skills:** [remotion-dev/skills](https://github.com/remotion-dev/skills) har 5 111 stjärnor och push 2026-10-12, men **ingen licens i API-metadata**. Repot innehåller bland annat `/remotion-best-practices`, `/remotion-create`, `/remotion-render` och `/remotion-captions`. Installation: `npx skills add remotion-dev/skills` — [skills README](https://github.com/remotion-dev/skills)
- **FFmpeg:** licensierat under "the GNU Lesser General Public License (LGPL) version 2.1 or later". Om valfria GPL-delar används "the GPL applies to all of FFmpeg" — [FFmpeg legal](https://ffmpeg.org/legal.html). [FFmpeg](https://github.com/FFmpeg/FFmpeg) har 65 125 stjärnor och push 2026-10-13.
- **WCAG 1.2.2 (nivå A):** "Captions are provided for all prerecorded audio content in synchronized media, except when the media is a media alternative for text and is clearly labeled as such" — [W3C: Understanding 1.2.2](https://www.w3.org/WAI/WCAG22/Understanding/captions-prerecorded.html)
- **Workers statiska tillgångar:** högst 25 MiB per fil, och 20 000 filer per version på Free respektive 100 000 på Paid — [Cloudflare Workers limits](https://developers.cloudflare.com/workers/platform/limits/)
- **marketingskills:** har en `video`-skill, som inte lästes — [skills-katalogen](https://github.com/coreyhaines31/marketingskills/tree/main/skills)

### Inferences
- **Ägarens egna klipp:** den bästa videon för en hantverkare är troligen ägarens egna klipp på 10–30 sekunder från telefonen. Klippen omkodas med FFmpeg till en kort, ljudlös, loopad WebM/MP4 under 25 MiB. Videon får:
  - en posterbild
  - en synlig paus-knapp
  - bara posterbilden vid `prefers-reduced-motion`
  
  Klipp med tal kräver WebVTT-undertexter, som kan genereras med KB-Whisper.
- **När Remotion lönar sig:** först när en mall återanvänds över många kunder, till exempel "3 jobb i Boden" som socialt klipp. Licensen måste prövas på nytt om Nortropic anställer fler än tre eller när 5.0 kommer.

| Kandidat | Verdikt | Skäl |
|---|---|---|
| FFmpeg (B) | **Ta in** | Standardverktyg. LGPL berör inte sajterna eftersom FFmpeg inte distribueras |
| KB-Whisper för undertexter (B) | **Ta in** | WCAG 1.2.2. Lokalt **[GDPR]** |
| Remotion + remotion-dev/skills (B) | **Pröva** | Licensvillkor **[LICENS]**. Skills saknar angiven licens |
| AI-video via inofficiella verktyg (gflow-cli) | **Avstå** | Inofficiellt, risk att bryta användarvillkoren |

### Gaps
- Videohosting utöver Workers (Cloudflare Stream, pris och integritet) utvärderades inte.
- De exakta whisper.cpp-flaggorna för VTT-export verifierades inte.

---

## 7. Rörelse: bästa praxis och verktyg 2026 (View Transitions, scroll-drivna animationer, Motion vanilla, dotLottie) samt WCAG 2.2.2 och 2.3.3

### Takeaway
- **Tydlig vinst:** nativa övergångar mellan dokument med CSS `@view-transition { navigation: auto; }`. Chrome 126+ och Safari 18.2+ stöder dem, medan Firefox saknar stöd och faller tillbaka till vanlig navigering. Det är bättre än Astros `<ClientRouter />`, som enligt Astro "will increasingly become unnecessary".
- **Scroll-drivna animationer:** Chrome 115+ och Safari 26+, men Firefox bara "preview" enligt MDN BCD 2026-10-13. Funktionen är alltså inte Baseline, men den är ett fokusområde i Interop 2026. Den ska bara användas som progressiv förbättring inom `@supports` och `prefers-reduced-motion: no-preference`, och innehåll får aldrig vara dolt som standard.
- **Motion vanilla:** `animate` mini (2,3 kB) och `inView` (0,5 kB) räcker till in-animationer.
- **dotLottie:** cirka 500 kB WASM och inget alternativ för minskad rörelse. **Avstå**, om inte kunden redan har en Lottie-fil.
- **Open Props:** bra källa för easing-tokens och `--motionOK`, men oändliga animationer måste rensas bort (WCAG 2.2.2).

### Cited Findings
- **MDN Browser Compat Data** (läst 2026-10-13, commit 3c89562):
  - `animation-timeline`, inklusive `scroll()` och `view()`: Chrome 115, Safari 26, Firefox `"preview"` — [BCD: animation-timeline.json](https://github.com/mdn/browser-compat-data/blob/main/css/properties/animation-timeline.json)
  - `@view-transition`: Chrome 126, Safari 18.2, Firefox `false` (bugg 1860854) — [BCD: view-transition.json](https://github.com/mdn/browser-compat-data/blob/main/css/at-rules/view-transition.json)
  - `view-transition-name` (inom ett dokument): Chrome 111, Safari 18, Firefox 144. `match-element`: Chrome 137, Safari 18.4, Firefox 144 — [BCD: view-transition-name.json](https://github.com/mdn/browser-compat-data/blob/main/css/properties/view-transition-name.json)
- **MDN:s märkning:** både `animation-timeline` och `@view-transition` har "Limited availability … not Baseline" — [MDN: animation-timeline](https://developer.mozilla.org/en-US/docs/Web/CSS/animation-timeline); [MDN: @view-transition](https://developer.mozilla.org/en-US/docs/Web/CSS/@view-transition)
- **Interop 2026** (publicerat 2026-02-12) har 20 fokusområden — [web.dev: Interop 2026](https://web.dev/blog/interop-2026). Två av dem:
  - "Scroll-driven animations" (`animation-timeline`, `scroll-timeline`, `view-timeline`).
  - "View transitions", med "Improving same-document view transitions" och "Cross-document view transitions".
- **Övergångar mellan dokument** kräver opt-in på båda sidorna med `@view-transition { navigation: auto; }` och samma origin. Händelserna `pageswap` och `pagereveal` finns för justeringar — [Chrome for Developers: Cross-document view transitions](https://developer.chrome.com/docs/web-platform/view-transitions/cross-document)
- **Scroll-drivna animationer** kan köras "off the main thread" — [Chrome for Developers: Scroll-driven animations](https://developer.chrome.com/docs/css-ui/scroll-driven-animations)
- **Astro om `<ClientRouter />`** — [Astro docs: View transitions](https://docs.astro.build/en/guides/view-transitions/):
  - Den "works best in browsers that support View Transitions (i.e. Chromium browsers)". Formuleringen verkar äldre än Safaris stöd.
  - Som standard simuleras övergångar (`fallback: animate`).
  - Den "includes a CSS media query that disables all view transition animations, including fallback animation".
  - Den "will increasingly become unnecessary".
- **astro-vtbot:** [martrapp/astro-vtbot](https://github.com/martrapp/astro-vtbot) har 364 stjärnor, ISC och push 2026-09-09. Beskrivning: "Bag of Tricks for Astro's View Transitions".
- **Motion:** [motiondivision/motion](https://github.com/motiondivision/motion) har 34 065 stjärnor, MIT och push 2026-10-13.
  - `animate` finns som mini (2,3 kB) och hybrid (18 kB) — [Motion: animate](https://motion.dev/docs/animate)
  - `inView()` är "built on IntersectionObserver" och "just 0.5kb" — [Motion: inView](https://motion.dev/docs/inview)
  - Dokumentationssidorna nämner inte minskad rörelse för vanilla JS.
- **dotLottie** — [dotLottie Web API reference](https://docs.lottiefiles.com/en/runtimes/distributions/js/v0.x/api/reference):
  - [LottieFiles/dotlottie-web](https://github.com/LottieFiles/dotlottie-web) har 902 stjärnor, MIT och push 2026-10-07.
  - `autoplay` och `loop` är `false` som standard, och `renderConfig.freezeOnOffscreen` är `true`.
  - Det finns inget alternativ för `prefers-reduced-motion`.
  - WASM-filen är "~500 KB compressed".
- **Äldre Lottie-spelare:** [airbnb/lottie-web](https://github.com/airbnb/lottie-web) har 32 218 stjärnor men senaste push 2025-09-01 och 858 öppna issues. [LottieFiles/lottie-player](https://github.com/LottieFiles/lottie-player) är **arkiverat**.
- **Polyfill:** [flackr/scroll-timeline](https://github.com/flackr/scroll-timeline) har 1 167 stjärnor och Apache-2.0, men senaste push var 2024-08-26 **(inaktivt)**.
- **Förinställningar och bibliotek:**
  - [argyleink/open-props](https://github.com/argyleink/open-props): 5 540 stjärnor, MIT, push 2026-10-11.
    - Flera animationer är oändliga: "spin 2s linear infinite", "ping 5s … infinite", "blink", "float", "bounce" och "pulse". "fade-in-bloom" använder `blur(20px)` — [props.animations.js](https://github.com/argyleink/open-props/blob/main/src/props.animations.js)
    - Custom media `--motionOK` är "(prefers-reduced-motion: no-preference)" — [props.media.js](https://github.com/argyleink/open-props/blob/main/src/props.media.js)
  - [animate-css/animate.css](https://github.com/animate-css/animate.css): 82 859 stjärnor, licensierad under "Hippocratic License Version Number: 2.1". Det är "an Ethical Source license" med villkor om mänskliga rättigheter och skiljeförfarande. Senaste push 2024-07-29 — [LICENSE](https://github.com/animate-css/animate.css/blob/main/LICENSE) **[LICENS]**
  - [michalsnik/aos](https://github.com/michalsnik/aos): 28 054 stjärnor, MIT, senaste push 2024-03-26 **(inaktivt)**.
  - [darkroomengineering/lenis](https://github.com/darkroomengineering/lenis): 16 503 stjärnor, MIT, push 2026-10-02, "Smooth scroll".
  - [formkit/auto-animate](https://github.com/formkit/auto-animate): 13 929 stjärnor, MIT.
  - [rive-app/rive-wasm](https://github.com/rive-app/rive-wasm): 985 stjärnor, MIT.
- **WCAG 2.2.2 (nivå A)** — [W3C: Understanding 2.2.2](https://www.w3.org/WAI/WCAG22/Understanding/pause-stop-hide.html):
  - "For any moving, blinking or scrolling information that (1) starts automatically, (2) lasts more than five seconds, and (3) is presented in parallel with other content, there is a mechanism for the user to pause, stop, or hide it".
  - Samma krav gäller automatiskt uppdaterad information.
  - Godtagbara tekniker är bland annat G4, SCR33, G11, G152, SCR22, G186 och G191.
- **WCAG 2.3.3 (nivå AAA)** — [W3C: Understanding 2.3.3](https://www.w3.org/WAI/WCAG22/Understanding/animation-from-interactions.html):
  - "Motion animation triggered by interaction can be disabled, unless the animation is essential".
  - Godtagbara tekniker är C39 ("Using the CSS prefers-reduced-motion query to prevent motion") och SCR40.
  - Parallax nämns som exempel på ofta icke-nödvändig rörelse.
  - Enligt sidan har en erratarättelse ändrat definitionen så att oskärpa (blur) inte längre undantas från rörelseanimation.
- **NN/g om längd och easing** — [NN/g: Executing UX Animations: Duration and Motion Characteristics (Laubheimer 2020)](https://www.nngroup.com/articles/animation-duration/):
  - "the duration of most animations should be in the range of 100–500 ms".
  - Cirka 100 ms för enkel återkoppling och 200–300 ms för till exempel modaler.
  - "At 500ms, animations start to feel like a real drag".
  - Ease-out för entré och ease-in för utgång.
  - Parallax-, karusell- och scroll-jacking-animationer kan ge yrsel, illamående eller migrän.

### Inferences
- **Mönster att destillera (S):**
  - Lägg `@view-transition { navigation: auto; }` inom `@media (prefers-reduced-motion: no-preference)`, eftersom den nativa vägen saknar ClientRouters automatiska skydd.
  - Lägg scroll-drivna effekter inom `@supports (animation-timeline: view())` och samma media-fråga. Grundläget i CSS ska alltid vara synligt innehåll.
  - Kör in-animationer med Motions `inView` och `animate` först efter en `matchMedia`-kontroll.
  - Oändliga animationer längre än 5 sekunder får aldrig visas parallellt med innehåll utan pauskontroll.
  - Behandla blur som rörelse, eftersom erratan inte längre undantar oskärpa, och stäng av den vid minskad rörelse.
- **Undvik dubbelarbete:** jämför med `modern-web-guidance` i inventariet, som redan har ett recept för övergångar.
- **Nivå AAA:** 2.3.3 är AAA, men C39-mönstret gör kravet nästan gratis att uppfylla och bör vara standard.

| Kandidat | Lucka | Förankring | Passform | Användning | Verdikt |
|---|---|---|---|---|---|
| CSS `@view-transition` (nativ, mellan dokument) | Sidövergångar | View Transitions nivå 2, Interop 2026 | Ingen JS. Firefox faller tillbaka till vanlig navigering | S | **Ta in** |
| Astro `<ClientRouter />` | Sidövergångar | — | Gör sajten till SPA med extra JS. Sidskript måste då hanteras via livscykelhändelser (ej verifierat här) | S | **Avstå** som standard |
| astro-vtbot | Hjälpkomponenter till ClientRouter | — | Behövs bara med ClientRouter | — | **Avstå** |
| CSS scroll-drivna animationer | Scroll-effekter | Scroll-animations-specen, utanför huvudtråden | Inte Baseline (Firefox) | S | **Pröva** som progressiv förbättring |
| scroll-timeline-polyfill | — | — | Inaktivt, extra JS | — | **Avstå** |
| Motion vanilla (`animate` mini, `inView`) | Avslöjanden, mikrorörelse | — | Små paket | S | **Ta in**: finns redan i inventariet, destillera storlekar och mönster |
| dotLottie-web | Vektoranimation | — | Cirka 500 kB WASM, inget stöd för minskad rörelse | S | **Avstå**, utom för kundens befintliga Lottie-filer |
| lottie-web | — | — | Långsamt underhåll | — | **Avstå** |
| Open Props (easing, `--motionOK`) | Förinställningar | — | MIT. Rensa bort oändliga animationer och blur | D | **Pröva** |
| animate.css | — | — | Hippocratic-licens, inaktivt | — | **Avstå [LICENS]** |
| AOS | — | — | Inaktivt. Döljer sannolikt innehåll tills JS körts (ej verifierat) | — | **Avstå** |
| Lenis | Mjuk scroll | — | Scroll-jacking enligt NN/g | — | **Avstå** |
| auto-animate / Rive | — | — | Appinriktat / tungt | — | **Avstå** |

### Gaps
- Mozillas tidsplan för scroll-drivna animationer och `@view-transition` i stabil Firefox är okänd, utöver "preview" och bugg 1860854.
- Det är inte verifierat att AOS döljer innehåll utan JS.
- Reduced-motion-mönstret för nativa view transitions ovan saknar primärkälla i denna genomgång, eftersom Chrome-sidan inte nämner det.
- `@starting-style` och `transition-behavior: allow-discrete` för in-animationer utan JS undersöktes inte.

---

## 8. Auktoritativa bästa praxis-källor att destillera Nortropics egna skills ur (1–3 per lager)

### Takeaway
**Lager 6** bör destilleras ur tre källor:
- WCAG 2.2:s Understanding-dokument för 2.2.2 och 2.3.3, med C39.
- NN/g:s parametrar för rörelse.
- Webbläsarnas egen stöddata (MDN BCD) och specdokumentation.

**Lager 7** bör destilleras ur tre källor:
- Språkrådets *Myndigheternas skrivregler* (kapitel 1–2) och SS-ISO 24495-1:2023.
- NN/g:s forskning om webbläsning, ton och foton.
- W3C WAI:s bildhandledning, kompletterad med 1177:s svenska regler.

Halvorson & Rach ger ramen för själva innehållsprocessen: substans, struktur, arbetsflöde och förvaltning.

### Cited Findings
- **Lager 6:**
  1. [W3C: Understanding 2.2.2](https://www.w3.org/WAI/WCAG22/Understanding/pause-stop-hide.html) och [W3C: Understanding 2.3.3](https://www.w3.org/WAI/WCAG22/Understanding/animation-from-interactions.html): normativ text, femsekundersgränsen och teknikerna C39/SCR40.
  2. [NN/g: Animation Duration and Motion Characteristics (2020)](https://www.nngroup.com/articles/animation-duration/): 100–500 ms, easing, och varningar för scroll-jacking och parallax.
  3. [MDN Browser Compat Data](https://github.com/mdn/browser-compat-data) och [Chrome for Developers: Cross-document view transitions](https://developer.chrome.com/docs/web-platform/view-transitions/cross-document): maskinläsbart stöd per version och specbeteende. Kompletteras med [Astro docs: View transitions](https://docs.astro.build/en/guides/view-transitions/).
- **Lager 7:**
  1. [Myndigheternas skrivregler, 8:e uppl. (Språkrådet 2014)](https://internt.slu.se/globalassets/mw/stod-serv/kommmarkn.for/text-sprak/myndigheternas-skrivregler.pdf), med kapitlen "Att skriva klarspråk" och "Att skriva för webben". Kompletteras med [SS-ISO 24495-1:2023 Klarspråk](https://www.iplfederation.org/standard-translations/) och [Språklag 11 §](https://lagen.nu/2009:600).
  2. NN/g:
     - [How Users Read on the Web](https://www.nngroup.com/articles/how-users-read-on-the-web/)
     - [Plain Language Is for Everyone, Even Experts](https://www.nngroup.com/articles/plain-language-experts/)
     - [The Four Dimensions of Tone of Voice](https://www.nngroup.com/articles/tone-of-voice-dimensions/)
     - [Photos as Web Content](https://www.nngroup.com/articles/photos-as-web-content/)
  3. [W3C WAI: An alt Decision Tree](https://www.w3.org/WAI/tutorials/images/decision-tree/), med [1177:s riktlinjer](https://www.1177.se/riktlinjer-och-material/riktlinjer-for-bild-och-video/riktlinjer-for-alt-texter-och-bildtexter/) för svensk formulering. För innehållsprocessen: Halvorson & Rach, *Content Strategy for the Web*, 2:a uppl. ([O'Reilly, kap. 8](https://www.oreilly.com/library/view/content-strategy-for/9780132883269/ch08.html)).

#### Konsoliderat kandidatregister (GitHub-data hämtad 2026-10-13)
Länken i varje rad är källan för stjärnor, licens (GitHubs detektering) och push-datum. Verdikten motiveras i avsnitt 1–7.

| Lager / lucka | Kandidat | ★ | Licens | Senaste push | Verdikt |
|---|---|---|---|---|---|
| 7 Språkgrind | [vale-cli/vale](https://github.com/vale-cli/vale) | 6 235 | MIT | 2026-10-13 | Ta in |
| 7 Läsbarhet | [vale-cli/readability](https://github.com/vale-cli/readability) | 30 | MIT | 2026-09-24 | Ta in |
| 7 Språkgrind | [vale-cli/agent-tools](https://github.com/vale-cli/agent-tools) | 6 | MIT (MCP-delen kräver betalt Vale CMS) | 2026-09-03 | Pröva hook och skills. Avstå MCP |
| 7 Grammatik | [languagetool-org/languagetool](https://github.com/languagetool-org/languagetool) | 15 127 | LGPL-2.1 [LICENS] | 2026-10-13 | Pröva (självhostad) |
| 7 Grammatik | [Erikvl87/docker-languagetool](https://github.com/Erikvl87/docker-languagetool) | 725 | LGPL-2.1 | 2026-06-17 | Pröva (med LT) |
| 7 Stavning | [LibreOffice/dictionaries](https://github.com/LibreOffice/dictionaries) (sv_SE 2.42) | 564 | Ej angiven i API. Ordlistan LGPL-3 [LICENS] | 2026-10-13 | Ta in |
| 7 Stavning | [wooorm/dictionaries](https://github.com/wooorm/dictionaries) | 1 409 | MIT (kod). sv-ordlistan LGPL-3 | 2024-09-09 | Avstå (äldre kopia) |
| 7 Stavning | [streetsidesoftware/cspell](https://github.com/streetsidesoftware/cspell) / [cspell-dicts](https://github.com/streetsidesoftware/cspell-dicts) | 1 698 / 292 | MIT / GPL-3.0 [LICENS] | 2026-10-13 | Avstå |
| 7 Stavning | [wooorm/nspell](https://github.com/wooorm/nspell) | 299 | MIT | 2021-01-17 (inaktivt) | Avstå |
| 7 Läsbarhet | [spraakbanken/sparv](https://github.com/spraakbanken/sparv) | 29 | MIT | 2026-09-18 | Bevaka |
| 7 Läsbarhet | [textstat/textstat](https://github.com/textstat/textstat) | 1 391 | MIT | 2026-10-13 | Avstå (ingen svenska) |
| 7 Läsbarhet | [kenthhagstrom/LIX](https://github.com/kenthhagstrom/LIX) | 1 | Ingen | 2017-03-17 | Avstå |
| 7 Språkgrind (metod) | [00spoiler00/llepafils](https://github.com/00spoiler00/llepafils) | 0 | MIT | 2026-09-07 | Ta in (metoden) |
| 7 Grammatik | [BaconDroid/languagetool-mcp-server](https://github.com/BaconDroid/languagetool-mcp-server) | 0 | MIT | 2026-09-22 | Avstå |
| 7 AI-mönster sv | [nordefors-max/claude-humanizer-svenska](https://github.com/nordefors-max/claude-humanizer-svenska) | 8 | Ingen [LICENS] | 2026-03-20 | Bevaka |
| 7 AI-mönster sv | [jhwaijeh-gif/humanizer-svenska](https://github.com/jhwaijeh-gif/humanizer-svenska) | 0 | MIT | 2026-10-11 | Avstå (två dagar gammal, "inte vetenskapligt") |
| 7 Copy/CRO/VOC | [coreyhaines31/marketingskills](https://github.com/coreyhaines31/marketingskills) | 54 524 | MIT | 2026-10-13 | Destillera `copywriting` (Pröva) och `customer-research` (Ta in) |
| 7 Röst/varumärke | [anthropics/knowledge-work-plugins](https://github.com/anthropics/knowledge-work-plugins) | 29 490 | Apache-2.0 | 2026-10-12 | Pröva (`brand-review`) |
| 7 Copy | [anthropics/skills](https://github.com/anthropics/skills) | 180 880 | Ej angiven i API | 2026-10-09 | Avstå för denna lucka (ingen copy-skill) |
| (Lokal SEO) | [AgriciDaniel/claude-seo](https://github.com/AgriciDaniel/claude-seo) / [garrettjsmith/localseoskills](https://github.com/garrettjsmith/localseoskills) | 18 851 / 125 | MIT / MIT | 2026-10-04 / 2026-08-15 | Bevaka |
| 7 Transkribering | [ggml-org/whisper.cpp](https://github.com/ggml-org/whisper.cpp) + [KB-Whisper](https://huggingface.co/KBLab/kb-whisper-large) (HF) | 54 348 | MIT + Apache-2.0 | 2026-10-12 | Ta in |
| 7 Transkribering | [SYSTRAN/faster-whisper](https://github.com/SYSTRAN/faster-whisper) | 25 840 | MIT | 2026-10-13 | Pröva |
| 7 Transkribering | [m-bain/whisperX](https://github.com/m-bain/whisperX) | 24 530 | BSD-2-Clause | 2026-09-26 | Bevaka |
| 7 Transkribering | [openai/whisper](https://github.com/openai/whisper) | 110 457 | MIT | 2026-08-31 | Avstå (KB-Whisper-vikter är bättre på svenska) |
| 7 Bilder | [withastro/astro](https://github.com/withastro/astro) (`astro:assets`) | 63 205 | MIT | 2026-10-13 | Ta in |
| 7 Bilder | [lovell/sharp](https://github.com/lovell/sharp) | 32 753 | Apache-2.0 | 2026-10-13 | Ta in (`attention`-beskärning) |
| 7 Bilder | [jwagner/smartcrop.js](https://github.com/jwagner/smartcrop.js) | 12 957 | MIT | 2024-03-16 (inaktivt) | Avstå |
| 7 Bakgrund | [danielgatis/rembg](https://github.com/danielgatis/rembg) | 25 061 | MIT (vikterna har egna licenser) [LICENS] | 2026-10-10 | Pröva med BiRefNet |
| 7 Bakgrund | [ZhengPeng7/BiRefNet](https://github.com/ZhengPeng7/BiRefNet) | 4 281 | MIT | 2026-10-11 | Pröva |
| 7 Bakgrund | [imgly/background-removal-js](https://github.com/imgly/background-removal-js) | 7 351 | AGPL-3.0 [LICENS] | 2025-07-18 | Avstå |
| 7 AI-bild | [zhongweili/nanobanana-mcp-server](https://github.com/zhongweili/nanobanana-mcp-server) | 400 | MIT | 2026-10-07 | Pröva (betald Gemini-nivå) |
| 7 AI-bild | [awkoy/replicate-flux-mcp](https://github.com/awkoy/replicate-flux-mcp) | 105 | MIT | 2026-10-01 | Bevaka |
| 7 AI-bild | [deepfates/mcp-replicate](https://github.com/deepfates/mcp-replicate) | 94 | MIT | Arkiverad | Avstå |
| 7 AI-bild | [luminarylane/fal-mcp-server](https://github.com/luminarylane/fal-mcp-server) | 61 | MIT | 2026-05-04 | Bevaka |
| 7 AI-bild/video | [MiniMax-AI/MiniMax-MCP](https://github.com/MiniMax-AI/MiniMax-MCP) / [ffroliva/gflow-cli](https://github.com/ffroliva/gflow-cli) | 1 585 / 286 | MIT / MIT | 2026-08-20 / 2026-10-12 | Avstå [GDPR] / inofficiellt |
| 7 Stock | [hellokaton/unsplash-mcp-server](https://github.com/hellokaton/unsplash-mcp-server) / [cevatkerim/unsplash-mcp](https://github.com/cevatkerim/unsplash-mcp) | 237 / 30 | MIT / MIT | 2026-10-12 / 2026-01-10 | Avstå (API kräver "non-automated") [BILDRÄTT] |
| 7 Stock | [garylab/pexels-mcp-server](https://github.com/garylab/pexels-mcp-server) | 25 | Ingen [LICENS] | 2025-11-02 | Bevaka |
| 7 Alt-text | [Nutlope/alt-text-generator](https://github.com/Nutlope/alt-text-generator) / [android-com-pl/wp-ai-alt-generator](https://github.com/android-com-pl/wp-ai-alt-generator) | 137 / 20 | Ingen / GPL-3.0 | 2023-10-18 / 2026-10-01 | Avstå |
| 7 Video | [FFmpeg/FFmpeg](https://github.com/FFmpeg/FFmpeg) | 65 125 | LGPL-2.1+ (valfria GPL-delar) [LICENS] | 2026-10-13 | Ta in (byggsteg) |
| 7 Video | [remotion-dev/remotion](https://github.com/remotion-dev/remotion) / [remotion-dev/skills](https://github.com/remotion-dev/skills) | 63 814 / 5 111 | Remotion License / ej angiven [LICENS] | 2026-10-13 / 2026-10-12 | Pröva |
| 6 Rörelse | [motiondivision/motion](https://github.com/motiondivision/motion) | 34 065 | MIT | 2026-10-13 | Ta in (finns redan i inventariet) |
| 6 Rörelse | [argyleink/open-props](https://github.com/argyleink/open-props) | 5 540 | MIT | 2026-10-11 | Pröva (easing, `--motionOK`) |
| 6 Rörelse | [LottieFiles/dotlottie-web](https://github.com/LottieFiles/dotlottie-web) | 902 | MIT | 2026-10-07 | Avstå (utom kundens egna Lottie-filer) |
| 6 Rörelse | [airbnb/lottie-web](https://github.com/airbnb/lottie-web) / [LottieFiles/lottie-player](https://github.com/LottieFiles/lottie-player) | 32 218 / 1 657 | MIT / MIT | 2025-09-01 / arkiverad | Avstå |
| 6 Rörelse | [flackr/scroll-timeline](https://github.com/flackr/scroll-timeline) | 1 167 | Apache-2.0 | 2024-08-26 (inaktivt) | Avstå |
| 6 Rörelse | [martrapp/astro-vtbot](https://github.com/martrapp/astro-vtbot) | 364 | ISC | 2026-09-09 | Avstå (bara för ClientRouter) |
| 6 Rörelse | [animate-css/animate.css](https://github.com/animate-css/animate.css) | 82 859 | Hippocratic 2.1 [LICENS] | 2024-07-29 | Avstå |
| 6 Rörelse | [michalsnik/aos](https://github.com/michalsnik/aos) | 28 054 | MIT | 2024-03-26 (inaktivt) | Avstå |
| 6 Rörelse | [darkroomengineering/lenis](https://github.com/darkroomengineering/lenis) | 16 503 | MIT | 2026-10-02 | Avstå (scroll-jacking) |
| 6 Rörelse | [formkit/auto-animate](https://github.com/formkit/auto-animate) / [rive-app/rive-wasm](https://github.com/rive-app/rive-wasm) | 13 929 / 985 | MIT / MIT | 2026-07-10 / 2026-10-13 | Avstå |

### Inferences
- **Källornas roller:** de normativa källorna (WCAG, skrivreglerna, ISO-standarden, beslutsträdet) bör bli grindar med kontroller i skillsen. NN/g och Halvorson & Rach bör bli principer och arbetsgång. Praktikerskills som marketingskills och brand-review fungerar som formuleringsmallar, och siffror utan källa i dem bör strykas vid destilleringen.
- **Lokala förtroendesignaler:** BrightLocal 2026 och Googles fotopolicy för företagsprofiler är de bästa underlagen jag hittade för lokala förtroendesignaler. Båda är amerikanska eller globala, inte svenska.

### Gaps
- Isofs och Språkrådets aktuella webbråd om klarspråk på webben kunde inte läsas (robots.txt). Skrivreglernas kapitel 1–2 från 2014 är den läsbara ersättningen men är tolv år gamla.
- Ingen svensk forskning om äkta foton jämfört med stock, eller om copy för lokala tjänsteföretag, hittades innan webbsökningsbudgeten tog slut.
