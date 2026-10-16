# brand

**Källa:** https://github.com/nextlevelbuilder/ui-ux-pro-max-skill, sökvägen `.claude/skills/brand/` (en identisk kopia finns i `cli/assets/skills/brand/`, kontrollerat med `diff`). Läst 2026-10-16 vid repots commit `56ea9cf174ed` (2026-10-15). Skillen ändrades senast i `67803eac81` (2026-10-10). Frontmattern anger `author: claudekit` och `version: "1.0.0"`.

Lästa filer:
- `SKILL.md`
- röst och budskap noggrant: `references/voice-framework.md`, `messaging-framework.md`, `consistency-checklist.md`, `approval-checklist.md`, `brand-guideline-template.md`, `update.md` och `templates/brand-guidelines-starter.md`
- de visuella referenserna skummade: rubriker i `visual-identity.md`, `logo-usage-rules.md`, `color-palette-management.md`, `typography-specifications.md` och `asset-organization.md`
- skripten: delarna som rör röst i `inject-brand-context.cjs` och anropen i `sync-brand-to-tokens.cjs`
- repots `README.md` (avsnittet om basversion och premium) och `LICENSE`

**Licens:** MIT, © 2024 Next Level Builder. Licensen kräver att upphovsrätts- och licenstexten följer med när text kopieras. Vi parafraserar på svenska och tar ingen kod, så kravet gäller inte. Källan anges i delfilen.

**Vad det är:** En bred varumärkesskill som blandar röst, budskap, visuell identitet, tillgångshantering och synk från riktlinjedokumentet till designtokens. **För oss räknas bara röst, ton och budskap.** Resten är visuell identitet: logotyp, palett, typsnitt, bildstil, tillgångsnamn och skript som skriver `design-tokens.json/css`. Det hör till lager 5 (yta) och tas inte här.

**Hur det fungerar (röst, ton och budskap):**
- **Röst och ton** (`voice-framework.md`). Rösten är varumärkets personlighet och ligger fast. Tonen är hur rösten anpassas till sammanhanget. Skillen har fyra skalor:
  - formell–ledig
  - enkel–komplex
  - allvarlig–lekfull
  - återhållsam–expressiv
- **Röstdrag.** Välj 3–5 drag i formen "X, inte Y", till exempel säker men inte arrogant, eller vänlig men inte oprofessionell. Varje drag får en rad i ett röstschema med drag, beskrivning, gör och gör inte.
- **Röstguide** i fyra delar: "Vi är" (drag med beskrivning), "Vi låter som" (exempelfraser), "Vi låter inte som" (motexempel) och omskrivningar med före och efter.
- **Ton per sammanhang** (sociala medier, support, juridik, sälj) med en exempelfras var.
- **Rösttest** med fyra frågor: Låter det som vi? Skulle en konkurrent kunna säga det? Når det målgruppen? Stämmer det med våra värderingar?
- **Riktlinjedokumentets avsnitt om röst** (`brand-guideline-template.md`, startmallen):
  - personlighet som tabell med drag och beskrivning
  - röstschema med drag, "Vi är" och "Vi är inte"
  - ton per sammanhang för marknadsföring, dokumentation, felmeddelanden och lyckat
  - **förbjudna termer** som tabell med term och skäl
  Skriptet `inject-brand-context.cjs` läser maskinellt ut `voice.traits` och `voice.prohibited` och lägger dem i prompten.
- **Budskap** (`messaging-framework.md`):
  - kedjan mission → vision → värdeerbjudande → positionering → nyckelbudskap → belägg
  - meningsmallar för mission, vision, värdeerbjudande (för vem, vilket behov, vilken kategori, vilken nytta, till skillnad från vem) och positionering
  - ett huvudbudskap i en mening och 3–5 stödbudskap, vart och ett med målgruppsbehov och belägg
  - hisspitchar på 10, 30 och 60 sekunder
  - budskap per målgrupp med smärtpunkt, budskap och uppmaning
  - budskapstest i fem frågor: tydligt, särskiljande, trovärdigt ("kan vi bevisa det"), angeläget, konsekvent
- **Kontroller.**
  - `consistency-checklist.md`, avsnittet Voice: tonen matchar, rätt för sammanhanget, inga motstridiga budskap, varumärkets termer, konsekvent skiftläge, rimlig jargongnivå, samma uppmaningar.
  - `approval-checklist.md`: textgranskning (inga förbjudna termer, tydligt värdeerbjudande, inga motstridiga påståenden) och regelefterlevnad (inga vilseledande påståenden, korrekt pris, obligatoriska upplysningar).
  - En tabell anger hur ofta granskning ska ske, till exempel webbplatsen varje månad.

**Kvalitet och underhåll:**
- Repot har 136 402 stjärnor, 14 500 forkar och 101 bidragsgivare (inklusive anonyma). Det skapades 2025-11-30 och senaste push var 2026-10-15. Det finns 90 öppna ärenden inklusive PR.
- Skillen själv har tio commits från nio olika författare, de flesta rena felrättningar i skripten. Det finns ingen tydlig ägare av innehållet.
- Röst- och budskapsdelarna är tunna mallar utan källor och utan exempel som fångar en verklig röst. Version 1.0.0 har inte utvecklats vidare.
- Kända problem:
  - [PR #522](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill/pull/522), **öppen**: tolken av förbjudna termer läser fel kolumn varannan rad. Med skillens egen mall missas "Best-in-class" och "Synergy", medan skälen "Overused" och "Corporate jargon" i stället läggs in i prompten som förbjudna ord. Felet är tyst åt båda hållen.
  - [#496](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill/issues/496), stängt: synkskriptet skrev en andra tokenkälla bredvid en befintlig. Det är rättat; skriptet stannar nu när det hittar befintliga tokens.
  - [#474](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill/issues/474), stängt: designskillen hade beroenden på claudekit som inte följde med.

**Det bästa vi kan ta:**
- Formen "X, inte Y" för röstdragen och röstschemat med gör och gör inte (`voice-framework.md`).
- Tabellen över förbjudna termer med skäl, alltså term och varför (startmallen, "Prohibited Terms"). Ett maskinläsbart fält i `rost.md` är bra, men vi skriver en egen tolk, eftersom den här har buggen ovan.
- Budskapskedjan och tabellen över stödbudskap där varje budskap kräver ett belägg (`messaging-framework.md`). Belägget passar ihop med marketingskills krav på styrkbara påståenden.
- Budskapstestets fråga "trovärdigt – kan vi bevisa det" och rösttestets "skulle en konkurrent kunna säga det" (samma idé som bytestestet).

**Var det hamnar hos oss:** Skillen `innehall`, delfilen `rost.md`, bara röst, ton och budskap. Visuell identitet hör till lager 5 (yta) och tas inte här.

**Passar vår stack?**
- Röstdelen passar som mall. Skripten och tokensynken passar inte: de skriver `docs/brand-guidelines.md` och `assets/design-tokens.*`, föreslår Tailwind i delar av skillen och krockar med våra egna CSS-tokens. De används inte.
- Måste översättas eller anpassas:
  - Exemplen är SaaS och kampanjer ("Create campaigns that convert.", "Campaign published!"). Byt mot lokala tjänster: "Boka tid hos …", "Vi ringer upp inom en arbetsdag".
  - Utropstecknet i exemplet för lyckat krockar med better-writing och med Språkrådets råd att använda utropstecken sparsamt.
  - Hisspitchar, "mission" och "vision" är för stort för en hantverkare eller en kiropraktor. Det räcker med ett huvudbudskap, tre stödbudskap med belägg och en mening om vad som skiljer.
  - Förbjudna termer ska vara svenska: "branschledande", "sömlös", "helhetslösning", "marknadens bästa". Skälet anges per ord.
  - Ton per sammanhang byts till sajtens: startsida, tjänstesida, om oss, kontakt och bokning, felmeddelanden.

**Risker och flaggor:**
- **Betalversion:** README beskriver en premiumversion (uupm.cc) med "Extended Brand Design Skills". Den fria skillen är basversionen och ska inte förväxlas med den betalda.
- **Ursprung:** `author: claudekit`, ett annat kommersiellt kit. Det är oklart vem som underhåller innehållet ⚠️ (bara frontmattern visar det).
- **Bred trigger:** beskrivningen nämner "Activate for branded content, tone of voice, marketing assets…" och skulle konkurrera med vår `innehall`-skill och med lager 5 om den installerades. Installeras inte.
- **Skript:** `sync-brand-to-tokens.cjs` kör `node` på ett genereringsskript i projektet. Jag hittade ingen nätverkstrafik eller telemetri i skripten (sökning på URL:er och `fetch`), men de skriver i projektet. Kör dem inte.
- Inga källor bakom ramverken. De är praxis, inte norm.
