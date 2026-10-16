# bolt.diy och screenshot-to-code

**Källa:** två AI-byggare med öppen källkod, lästa 2026-10-16 i glesa kloner under `kallor/fg-bolt-s2c/`.
- **bolt.diy:** https://github.com/stackblitz-labs/bolt.diy, commit `353b44c` (2026-10-14). Lästa: alla filer i `app/lib/common/prompts/` (`prompts.ts`, `new-prompt.ts`, `optimized.ts`, `simple-sal.ts`, `tiny-tim.ts`, `diligent-dan.ts`, `discuss-prompt.ts`, `project-tools.ts`), `app/lib/common/prompt-library.ts` (vilka varianter som är inkopplade) och README via raw.githubusercontent.com.
- **screenshot-to-code:** https://github.com/abi/screenshot-to-code, commit `a813977` (2026-10-09). Lästa: `Evaluation.md`, `blog/evaluating-claude.md`, `backend/evals/` (`core.py`, `runner.py`, `sessions.py`, `sets.py`, `config.py`), självkontrollen `backend/agent/tools/screenshot_preview.py` och `backend/preview_screenshot/` (`base.py`, `playwright_backend.py`), `backend/prompts/system_prompt.py`, budgettaket i `backend/agent/engine.py` och `config.py`, eval-sidorna i `frontend/src/components/evals/` och PR [#645](https://github.com/abi/screenshot-to-code/pull/645).
⚠️ Inte lästa: `asset_extraction_benchmark.py`, resten av agentmotorn, bolt.diys övriga kod utom sökningen efter var prompterna används.

**Licens:** båda MIT (`LICENSE`: © 2024 StackBlitz, Inc. and bolt.diy contributors; © 2023 Abi Raja). Kräver att licenstexten följer med om kod kopieras. bolt.diy bygger på WebContainers API, som har egna kommersiella villkor för företagsbruk (README). Vi tar inga filer, bara upplägg och korta citat.

## Vad det är
**bolt.diy** är den öppna versionen av StackBlitz Bolt: en webbläsarbaserad AI-byggare med flera systemprompter, där designreglerna står som siffror i prompten. **screenshot-to-code** gör om skärmbilder, mockups och videor till kod och har ett eget eval-upplägg: en fast uppsättning indata, flera körningar per modell och prompt, och människor som dömer utdata sida vid sida.

## Hur det fungerar
**bolt.diy – hantverksregler i siffror**
- Samma designchecklista återkommer i `simple-sal.ts`, `tiny-tim.ts` och `diligent-dan.ts`: *8px grid*, *3–5 colors + neutrals*, *18px+ body, 40px+ headlines*, *4.5:1 contrast (WCAG AA)*, mobil först, *all states: loading, error, empty, success*, för mobilappar *44×44pt targets*, bilder *Pexels only* och *complete file content (no placeholders)*. `simple-sal.ts` förbjuder också ord som "delve", "leverage", "robust" och "seamless".
- `new-prompt.ts` (standardprompten utan projektverktyg) är maximalistisk: designer som *"rivaling the polish of Apple, Stripe"*, glöd, gradienter och parallax, inga "basic layouts", en sans-serif ihop med Playfair Display och 16px radie – kombinerat med samma siffror.
- `project-tools.ts` (standard när projektverktygen är på, ändrad 2026-10-13) har vänt: *"A simple or minimal page should stay simple"*, *"Choose a cohesive, restrained style"*, och om belägg: *"a started process is not a passed check"* och *"Do not claim a change, running preview or passing check without successful tool results."*
- **Bara tre varianter är inkopplade** i `prompt-library.ts`: standard (`project-tools.ts` eller `new-prompt.ts`), Tiny Tim och Experimental (`optimized.ts`). `simple-sal.ts` och `diligent-dan.ts` importeras ingenstans i `app/` vid commit `353b44c` (min sökning); de är text, inte det Bolt kör.

**screenshot-to-code – eval och självkontroll**
- `Evaluation.md` (senast ändrad 2024-04-11): 16 skärmbilder, ett skript som kör alla parallellt, betyg 1–4 i ett `/evals`-gränssnitt och *"three tests for each model/prompt + stack combo"* med medelvärde. Bloggen (mars 2024) använde 0–4 och mätte en enda sak, *"How close does the generated code look to the screenshot?"*; resultatet blev 61–70 % för tre modeller, och Opus 3 kom sist.
- **Koden har gått vidare från dokumentet:** namngivna *eval sets* (en mapp med PNG eller en `briefs.json` med textbriefar, sedan 2026-07), *sessioner* som binder körningar till ett set och ger en matris indata × modell med anteckningar per modell, N försök per indata, och en *Best of N*-sida där en människa röstar på bästa utdata eller oavgjort. Betygsväljaren (`RatingPicker`, 1–5) används inte av någon av eval-sidorna (min sökning i `frontend/src/components/evals/`).
- **Inte blint:** Best of N visar mappnamnen (modellen) ovanför varje utdata, och ordningen blandas inte.
- **Kostnadstak:** en generering avbryts över 3 USD (`GENERATION_MAX_COST_USD`) och körs inte om, eftersom varje nytt försök kostar hela taket igen.
- **Självkontrollen** (`screenshot_preview`, sedan 2026-06): efter varje skapad eller ändrad fil renderar agenten sidan i headless Chromium, helsida i dator (1280 × 832) och mobil (342 × 684), väntar på `networkidle` och typsnitten, och ser bilderna själv. Prompten: rätta synliga fel (trasig layout, överlapp, fel avstånd eller färger). Bilderna sparas inte.
- **PR #645** (öppen, 2026-10-07) pekar ut luckan: en utdata kan se nästan identisk ut men ha ändrad text eller rinna över i mobil, och den som dömer på datorbilder missar det. Förslaget är mätbara krav per fall – synlig text, överflöd, kontrast, stilvärden – med `pass`, `fail` eller `unknown`, där `unknown` aldrig räknas som godkänt.

## Kvalitet och underhåll
- **bolt.diy:** 19 952 stjärnor, 126 bidragsgivare, skapad 2024-10-13, push 2026-10-14, 19 öppna ärenden och PR:ar (GitHubs API 2026-10-16). README: *"no new features are planed"*, bara buggrättelser och beroenden, men promptfilerna ändrades 8–13 oktober. Säkerhetsärende: importerade chattar kör om alla gamla skalkommandon utan fråga ([#2202](https://github.com/stackblitz-labs/bolt.diy/issues/2202)).
- **screenshot-to-code:** 80 411 stjärnor, 29 bidragsgivare, skapad 2023-11-14, push 2026-10-09, 148 öppna ärenden och PR:ar. Säkerhet: CORS-jokertecken och `eval()` ([#579](https://github.com/abi/screenshot-to-code/issues/579), öppen); SSRF i förhandsvisningen åtgärdad ([#640](https://github.com/abi/screenshot-to-code/pull/640)). Projektet säljer en värdad tjänst (screenshottocode.com, README).

## Det bästa vi kan ta
1. **Ett fast fall, flera körningar, samma mått** (s2c): stöder provsajten *Benchy* och testsviten i `guide/3-2`. Kör varje fall minst tre gånger, eftersom körningarna skiljer sig.
2. **Kostnadstak per körning som inte görs om** (s2c `engine.py`): samma tanke som budgettaket per svitkörning i `guide/3-2`, N4.
3. **Matrisen och anteckningarna** (s2c sessioner): en rad per fall, en kolumn per variant, Johnnys anteckning per variant – formen för *En ändring i taget* (`3-2`, N4).
4. **Likhet räcker inte – PR #645:** den som dömer på bilder missar ändrad text och mobilöverflöd. Låt kontrollskriptet mäta det mätbara per fall med tre utfall, och Johnny döma resten. Det bekräftar `3-2`, *Mätbart före bedömt* och *för lite information*.
5. **Självkontroll i mobil och dator efter varje ändring** (s2c `screenshot_preview`): byggaren ser sin sida innan den säger klar. Hos oss är det belägg i `progress.md`, inte en dom – den som bygger dömer inte (`3-1`).
6. **bolt `project-tools.ts`:** *"a started process is not a passed check"* – en mening att låna med egna ord till belägget i `3-1`.

## Var det hamnar hos oss
**Håller med förslaget: skill `larande`, i `matning.md` eller en kort del om eval** – men bara för s2c:s upplägg (punkt 1–4). Med två skärpningar som s2c saknar: domen ska vara **blind** (dölj variantens namn och blanda ordningen, `3-2`, *Blind jämförelse*) och **godkänd/underkänd med kritik**, inte 1–4 (Husain; måttstocken).
- **Självkontrollen (punkt 5–6)** hör till byggarens belägg i `guide/3-1` och kvalitetsskillen, inte `larande`.
- **bolts siffror → ingenstans som regel.** Stilkiten har egna tokens för avstånd, typskala och färg (`2-5`); "8px grid" och "18px+ body, 40px+ headlines" skulle krocka med kit som valt annat, och `new-prompt.ts` driver mot just det generiska (glöd, gradienter, parallax, Inter + Playfair) som `2-5` och granskaren varnar för. "All states" finns redan i granskaren (PG6), och kontrast och tryckytor bor i kontrollerna (`2-8`). Granskarens `premium.md` citerar `simple-sal.ts` – det går, men skriv att filen inte används av Bolt själv.

## Passar vår stack?
- Ingen kod tas in. s2c:s eval körs mot dess egen agent och API-nycklar; vår motsvarighet är att bygga om provsajten i Claude Code och lägga bilderna sida vid sida för Johnny (`mattstock/verktyg/fanga.js` gör redan bilderna).
- s2c:s mobilbredd 342 px är smalare än våra 375 och 390; använd våra bredder.
- bolt.diy kör i WebContainer med Vite och Supabase – inget av det gäller statiska Astro-sajter på Cloudflare.

## Risker och flaggor
- **Licens:** MIT, inga hinder för att läsa och destillera; WebContainers kommersiella villkor gäller bara den som driftar bolt.diy.
- **Föråldrad dokumentation:** `Evaluation.md` beskriver ett flöde koden inte längre har; citera koden, inte dokumentet.
- **Underhållsläge:** bolt.diy säger själv att inga nya funktioner planeras.
- **Säkerhet om någon skulle köra dem:** #2202 (bolt) och #579 (s2c). Vi kör ingen av dem.
- **Krock med skills:** bolts designregler motsäger stilkiten och ytskillen om de skulle läsas som regler; s2c:s 1–4-skala motsäger måttstockens binära dom.
- Ingen telemetri sökt eller hittad i de lästa filerna ⚠️ (inte genomsökt i hela koden).

## Inloggning
Inget. Att köra s2c:s eval skulle kräva API-nycklar till OpenAI, Anthropic eller Gemini, men det ska vi inte göra.
