# modern-web-guidance

**Källa:** https://github.com/GoogleChrome/modern-web-guidance, sökvägen `skills/modern-web-guidance/`.
- **Version:** läst 2026-10-16 vid commit `b31dc0a43ff5` = release v0.0.194 (2026-10-12). Samma version finns på npm som `modern-web-guidance@0.0.194`, och SKILL.md anger `--skill-version 2026_10_12-dacb5911`.
- **Källrepo:** https://github.com/GoogleChrome/modern-web-guidance-src. Publiceringsrepot är bara ett mål för publicering (CONTRIBUTING). Källrepots senaste commit vid läsningen var `ccc1f6013237` (2026-10-16).
- **Ändringslogg:** GitHub-releaserna. Det har kommit en release ungefär varje vecka, v0.0.190 (2026-09-21) till v0.0.194. Releasen v0.0.194 lade till nio guider och kräver nu att svar som använt skillen avslutas med en sammanfattning.
- **Officiell dokumentation:** https://developer.chrome.com/docs/modern-web-guidance, som kallar skillen "early preview". README säger "preview release".

**Lästa filer:**
- **I sin helhet:**
  - `SKILL.md`, `README.md` (581 rader), `CONTRIBUTING.md`, `package.json`, `policies/modern-web-guidance.toml` och `.claude-plugin/plugin.json`.
  - Guiderna `html/html.md`, `css/css.md`, `css/responsive-design.md`, `visual-design/typography.md` och `ui-behaviors/motion.md`.
  - Telemetrikoden i källrepot: `src/cli/telemetry/types.ts` och `clearcut-logger.ts`, samt de relevanta delarna av `clearcut-sender.ts` och `detect-agent.ts`.
- **Största delen:** `accessibility/accessibility.md`, `performance/performance.md`, `security/security.md` och `forms/forms.md`.
- **Första stycket och alla regelrader** (DO, DON'T och MANDATORY) i varje guide under accessibility, css, forms, performance, privacy, ui-atoms, ui-behaviors, ui-components och visual-design.
- **Webbläsarstöd:** alla rader med Baseline-status och "Browser support" i samtliga 187 guider.
- ⚠️ **Inte lästa:** kategorierna built-in-ai, js (Temporal), pwa, wasm och webmcp, html-delguiderna om web components och shadow DOM, säkerhetsguiderna om passkeys och kryptografi, samt systerskillen `chrome-extensions`.
  - Skäl: de är irrelevanta för statiska företagssajter utan inloggning, och omfånget är stort (27 586 rader totalt).

**Licens:** Apache-2.0 (`LICENSE`, `package.json`). Ingen NOTICE-fil finns i något av repona (kontrollerat via API).
- **Kräver:** en kopia av licensen följer med, copyright- och attributionsnoter behålls, ändrade filer märks tydligt som ändrade, och NOTICE följer med om den finns.
- **Komplikation:** README:s avsnitt *Attribution* säger att delar av texten bygger på MDN Web Docs och på W3C-, WHATWG- och IETF-specifikationer. MDN:s prosa är CC-BY-SA 2.5 eller senare, och kodexempel är CC0 eller MIT (MDN:s sida om attribution, läst 2026-10-16).
- Det går inte att se vilka stycken som kommer från MDN. Vi skriver därför helt med egna ord och kopierar inga stycken (tolkning, inte juridisk rådgivning).

**Vad det är:** Ett sökbart bibliotek från Googles Chrome-team, med stöd av Edge-teamet. Det har 187 guider om modern HTML, CSS, formulär, tillgänglighet, prestanda, säkerhet, rörelse och mer, och varje funktion har webbläsarstöd enligt Baseline (web-features). Syftet är att styra kodagenter bort från föråldrade mönster och tunga beroenden, mot plattformens egna lösningar med lätta reserver.

**Hur det fungerar:**
- **Arbetssättet enligt SKILL.md.** Skillen ska köras *först* i varje uppgift om HTML, CSS eller klient-JS:
  1. Agenten kör `npx -y modern-web-guidance@latest search "<fråga>"`. Sökningen är semantisk och sker lokalt med TensorFlow.js.
  2. Agenten kör sedan `retrieve "<id>"` och kontrollerar koden mot guiden.
  3. Svaret avslutas med ett avsnitt "### Modern Web Guidance".
- **Policy för webbläsarstöd** (*Interpreting Browser Support & Fallbacks*):
  - *Baseline Widely available* används utan reserv.
  - Allt annat kräver guidens reserv, om projektet inte har en egen policy, till exempel "Baseline ÅÅÅÅ".
  - Skillen föreslår att policyn skrivs in i CLAUDE.md eller AGENTS.md.
- **Guiderna** har en fast form: problem, lösning, kod, *Fallbacks & browser support* med Baseline-status och datum, samt DO, DON'T och MANDATORY. Översiktsguider (html, css, accessibility, performance, security, forms) pekar vidare till fallguider.
- **Kvalitetssäkring:** README beskriver ett system för utvärdering med Playwright och agentkörningar med och utan guiderna. Snapshotet från 9 oktober visar till exempel att claude_code gick från 59 % till 87 % (+28 procentenheter).

**Kvalitet och underhåll:**
- **Publiceringsrepot:** 2 485 stjärnor, 93 forkar. Det har 4 bidragsgivare, men 190 av commitsen är från `github-actions[bot]` och övriga från paulirish 19, connorjclark 2 och micahjo7 1. Ärenden är avstängda.
- **Källrepot:** 1 167 stjärnor, 60 bidragsgivare (paulirish 267, micahjo7 221, rviscomi 211 med flera) och 440 öppna ärenden. Källa: GitHubs API via `gh api`, eftersom anonym `curl` slog i rate limit.
- **npm-paketet** har fyra underhållare: paulirish, rviscomi, hoten och micahjo7. Kräver Node 20 eller senare.
- **skills.sh:** 32,6 tusen installationer, först sedd 2026-05-19. Säkerhetsgranskningarna:
  - **Gen Agent Trust Hub: Fail**, CRITICAL, 2026-10-13. Skälen är att skillen laddar ner och kör npm-paketet via `npx`, att frågeparametern går rakt in i ett skalkommando (indirekt promptinjektion), och att exempeladresser i en guide om URL-validering flaggades som phishing. Den sista punkten bedömer granskningen själv som falsklarm.
  - **Socket: Warn**, LOW, 2026-10-13: opinnat `npx -y …@latest` kan köra godtycklig kod.
  - **Snyk: Warn**, MEDIUM, W012, 2026-10-13: ett externt beroende som inte går att verifiera styr agenten vid körning.
- **Kända problem** (källrepot):
  - #1802 (öppen): 113 av 186 publicerade guider behöver granskas för tillgänglighet. 116 delärenden är öppna och inget är stängt.
  - #1429 (öppen): tillgänglighetsguiden saknar hänvisningar till WCAG-kriterier.
  - #1745 (öppen): toast-guiden bryter mot WCAG 2.2.1 (stängs automatiskt efter 3 s) och 4.1.3 (saknar status-roll).
  - #945 (öppen): guiden om speculation rules gör agenter för aggressiva på MPA-ramverk *som Astro*. Agenterna lägger in eager prefetch och prerender på alla länkar.
  - #888 (öppen): ett obegripligt fel på Node 18.
  - #1765 (öppen): agenter söker flera orelaterade fall i en enda fråga.
- **Egna iakttagelser, som tumregler:**
  - Träffytorna motsäger varandra: 24 px i `accessibility.md`, 44 px i `checkbox.md` och 48 px i `forms.md`.
  - ⚠️ Statusen för anchor positioning ("bara Safari 27") stämmer med web-features-explorer men avviker från den allmänna bilden av Chromes stöd.
  - ⚠️ Uppgiften att `overscroll-behavior` saknas i Safari har jag inte kontrollerat.

**Det bästa vi kan ta:**
- **Policyn för webbläsarstöd** (`SKILL.md`, *Interpreting Browser Support & Fallbacks*). Vi bör skriva en egen, som förslag till Johnny: *Widely* används fritt, och *Newly* eller *Limited* bara som progressiv förbättring som fungerar utan funktionen.
- **HTML-grunden** (`html/html.md`): doctype, `lang`, viewport utan zoomspärr, landmärken, `<search>`, `type="button"`, `<pre tabindex="0">`, `<details name>` som exklusiv accordion, `inert`, samt bildattributen `width`, `height`, `srcset`, `sizes`, `loading` och `fetchpriority`.
- **Prestanda:**
  - `performance/performance.md` och `optimize-image-priority.md`: LCP-bilden ska ligga i HTML med `fetchpriority="high"` och aldrig lazy, högst 1–2 resurser får hög prioritet, `sizes` alltid med `srcset`, och endast de kritiska typsnitten förladdas, med `crossorigin`.
  - `lazy-load-video-and-audio.md` och avsnittet om video i `performance.md`.
- **Säkerhetshuvuden** (`security/security.md`, *Companion policies* och §3.2): HSTS, `nosniff`, Referrer-Policy, Permissions-Policy, `frame-ancestors`, SRI, och CSP med hashar för statisk HTML i stället för nonce. Det bekräftar 2-8 [N1]/[N2], som redan använder `_headers` och Astros `security.csp`.
- **Färg** (`visual-design/color.md`): forced-colors med systemfärger, och att `box-shadow` eller bakgrundsbild inte ensamma får bära kant eller tillstånd.
- **Mönster utan JavaScript:**
  - `ui-behaviors/declarative-dialog-popover-control.md`: invoker commands för `<dialog>` och popover.
  - `light-dismiss-a-dialog.md`: `closedby` med obligatorisk reserv för Safari.
  - `prevent-page-scroll-under-modal-dialog.md`: `overscroll-behavior` på dialogen i stället för att låsa `body`.
  - `cross-document-transitions.md` och `consistent-cross-document-transitions.md`: inga dubbla `view-transition-name`, och skript från tredje part ska inte blockera renderingen. Det stämmer med 2-6 [N2] `@view-transition`.
- **CSS:** `css/size-aware-styling.md` (container queries, *Widely* sedan 2023-02-14) behövs för sektionsbiblioteket. Dessutom `respect-os-text-scale.md` och `search-hidden-content.md`.
- **Formulär** (`forms/forms.md`, `validate-input-after-interaction.md`, `required-field-feedback.md`): `:user-invalid`, autocomplete-tokens, `enterkeyhint`, inget `type="number"` för postnummer och telefon, samt 16 px mot zoom i iOS.

**Var det hamnar hos oss:**
- Destilleras in i `.claude/skills/kvalitet/modern-html-css.md`, med Baseline-status och datum per mönster och vår egen stödpolicy överst. Skälet är att det är den enda källan med uppdaterat webbläsarstöd per mönster och med lätta reserver.
- Tillgänglighetsdelarna går till `tillganglighet.md`, men bara där de har WCAG-stöd. Övriga märks som tumregel, eftersom guiden själv saknar kriteriehänvisningar (#1429).
- Prestanda- och säkerhetsdelarna går som hänvisningar till 2-8, som redan äger reglerna.
- Vi installerar inte skillen och kör inte CLI:t. Guiderna läses som data vid en bestämd version (v0.0.194) och följs upp när releaserna kommer.

**Passar vår stack?**
- **Kan tas nästan som det är:**
  - Nästan allt i HTML och CSS: dialog, popover, invoker commands, `<details name>`, `inert`, container queries, `:has()`, `:user-invalid`, `text-wrap`, `field-sizing`, bildattribut, `@view-transition` och `@starting-style`.
  - Exemplen är ramverksoberoende och passar i Astro-komponenter och React-öar.
  - På Cloudflare sätts huvudena i `public/_headers`. Svar från Workern sätter sina egna (2-8).
- **Kostnad i JavaScript per sida:**
  - Noll för de deklarativa mönstren.
  - Några rader vanilla-JS för `showModal()` utan invoker commands, och för reserven till `closedby` i Safari.
  - Polyfills laddas villkorligt: popover, anchor positioning, interest invokers. ⚠️ Storleken har jag inte mätt.
  - Speculation rules är inline-JSON utan bibliotek, men de kostar bandbredd om de är aggressiva (#945).
- **Krockar som tas upp med Johnny:**
  - **Tredjepart vid sidladdning:** 25 guider laddar polyfills och bibliotek från CDN:er (`unpkg.com`, `esm.sh`, `esm.run`, `cdn.jsdelivr.net`), ofta som `@latest` utan pinning. Det krockar med 2-8 [N1], som inte tillåter resurser från tredje part vid sidladdning. Allt sådant ska självhostas, pinnas och märkas med `integrity`.
  - **Lighthouse 100:** villkorliga polyfills och `blocking="render"` med `<link rel="expect">` (som `hovercard.md` gör obligatoriskt för stabila övergångar) kan försämra LCP och TBT.
  - **Speculation rules:** prerender med eager på alla länkar (#945) kan belasta kundens gratisplan och statistik. Börja med måttlig prefetch.
  - **Rörelse:** guiderna lindar rörelse i `prefers-reduced-motion`, vilket stämmer med 2-6. Men `ui-behaviors/motion.md` tillåter "dämpad" rörelse under `reduce`, till exempel att en obestämd förloppsindikator fortsätter glida med 20 s cykel. 2-6 [N1] förbjuder förflyttning och skalning helt, men tillåter opacitet och färg.
  - **Scroll-drivna effekter** (parallax, scrollytelling) är *Limited* (inte Firefox). Hos oss gäller högst en diskret parallax (2-6 [N2]).
  - **HTML först:** stöds av de deklarativa mönstren. Guider som bygger på JavaScript (stack-drill-down, swipe) är appmönster som vi sällan behöver.

**Risker och flaggor:**
- **Telemetri, påslagen som standard:**
  - CLI:t skickar till `play.googleapis.com` (Clearcut): sökfrågans text, träffarnas guide-id och likhet, hämtad guide, kommandotyp, OS, version, skill-version, agentens namn (läses ur miljövariabler som `CLAUDECODE`), latens i intervall och utfall.
  - README säger att råa prompter inte samlas in. Sökfrågan skrivs dock av agenten och kan innehålla kundens namn eller detaljer.
  - Avstängning sker med `DISABLE_TELEMETRY=1`.
  - README säger samtidigt att CLI:t fungerar "offline, completely private and local". Det motsäger telemetrin som är påslagen som standard.
- **Körning av kod:** `npx -y …@latest` vid varje uppgift kör ett opinnat paket från npm. Gen Agent Trust Hub ger *Fail* (CRITICAL), och Snyk och Socket ger *Warn*. Det krockar med CLAUDE.md, där nedladdat är data och inte instruktioner, och med 3-3 om installationer.
- **Licens:** Apache-2.0 är okej. MDN-prosan under CC-BY-SA gör att vi bara skriver med egna ord.
- **Betalvägg:** ingen.
- **Krock med andra skills:**
  - Beskrivningen "MANDATORY: Execute FIRST for all HTML/CSS" skulle konkurrera med vår `kvalitet` och med lagerskillsen om den installerades.
  - Kravet på ett avsnitt "### Modern Web Guidance" i svaren tar vi inte med.
  - Mot Krehels `better-accessibility`: olika träffytor (24/44/48 px), sändknappen (`disabled` mot `aria-disabled`) och "Laddar…" (läses inte upp mot artig uppläsning).

**Inloggning:** Nej. Repona, npm-metadata, developer.chrome.com och skills.sh går att läsa utan konto, och inget har krävt inloggning. CLI:t kräver inget konto och ingen API-nyckel enligt README, men har inte körts.
