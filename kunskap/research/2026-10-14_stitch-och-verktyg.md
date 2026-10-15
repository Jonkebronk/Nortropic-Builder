# Verifiering: Stitch, skills och Google-verktyg (2026-10-14)

Verifierat 2026-10-14/15 mot primärkällor (officiell dokumentation, GitHub-repon, npm-registret). Där en uppgift bara finns i sekundärkällor står det uttryckligen. "Ej bekräftat" = ingen primärkälla hittad.

## Sammanfattande tabell

| Fråga | Svar | Status | Källa |
|---|---|---|---|
| Officiellt Stitch-CLI? | Ja: npm-paketet `@google/stitch` (Apache-2.0, version 0.11.0 släppt 2026-10-01, senaste 0.11.1 2026-10-08). Kräver Node ≥ 20. Installerar binärerna `stitch` och `stitch-mcp`. | Bekräftat | https://registry.npmjs.org/@google/stitch (README i registret, repo `google-labs-code/stitch-sdk`) |
| CLI-kommandon | `login`, `status`, `logout`, `generate screen/variants`, `edit screen`, `capture`, `upload screen/design`, `find`, `serve`, `config`, `mcp install`, `agent-skills add/list/update`, `api` m.fl. Alla kommandon har `--json`, `--schema`, `--dry-run`. | Bekräftat | https://registry.npmjs.org/@google/stitch |
| Googles stitch-skills | Repo `google-labs-code/stitch-skills` (Apache-2.0), 15 skills i tre plugins (se detaljer). Installation: `npx plugins add google-labs-code/stitch-skills --scope project --target claude-code`. | Bekräftat | https://github.com/google-labs-code/stitch-skills |
| Kräver skills MCP eller CLI? | stitch-skills-repot: "These skills require the Stitch MCP server". CLI:t har en **egen** inbyggd skill (`stitch agent-skills add`) som styr CLI:t direkt. | Bekräftat | https://github.com/google-labs-code/stitch-skills , https://registry.npmjs.org/@google/stitch |
| davideast/stitch-mcp | Communityprojekt, uttryckligen *inte* Google-anslutet. `npx @_davideast/stitch-mcp`. Behövs inte längre om man använder officiella `stitch`/`stitch-mcp`. | Bekräftat | https://github.com/davideast/stitch-mcp |
| Autentisering | `stitch login` = Google OAuth i webbläsaren, "tokens are stored locally and refreshed automatically". API-nyckel via `STITCH_API_KEY`/`--api-key`; "Some Canvas operations require STITCH_API_KEY even when signed in with OAuth". Fjärr-MCP: `https://stitch.googleapis.com/mcp` med header `X-Goog-Api-Key`. | Bekräftat (CLI); MCP-URL bara i sekundärkälla | https://registry.npmjs.org/@google/stitch ; MCP-docs: https://stitch.withgoogle.com/docs/mcp/setup (sidan renderades inte vid hämtning) |
| Inloggningens livslängd vid obevakad körning | OAuth-token förnyas automatiskt enligt README; maximal livslängd för refresh-token ej angiven. För obevakad körning är API-nyckel det robusta valet (ingen utgång dokumenterad). | Delvis bekräftat / livslängd ej bekräftat | https://registry.npmjs.org/@google/stitch |
| Kvoter | Sekundärkällor: 350 standard + 200 Pro/experimentella genereringar per månad (april 2026). Ingen officiell kvotsida hittad. | Ej bekräftat (endast sekundärt) | t.ex. https://www.aipedia.wiki/tools/google-stitch/ |
| Fortfarande Google Labs? | Ja, senaste officiella blogginlägg (2026-05-19, I/O) ligger under Google Labs. SDK märks "not an officially supported Google product". | Bekräftat (per maj 2026) | https://blog.google/innovation-and-ai/models-and-research/google-labs/stitch-updates/ |
| mattpocock/skills | Finns, MIT. Arkitekturskillen heter idag **`codebase-design`** (djupa moduler, små gränssnitt, rena sömmar); **`improve-codebase-architecture`** skannar efter fördjupningsmöjligheter. | Bekräftat | https://github.com/mattpocock/skills |
| Skill Spector | **`NVIDIA/SkillSpector`**, Apache-2.0. Skannar skills/MCP-servrar före installation: statisk mönstermatchning + valfri LLM-granskning, poäng 0–100 och rekommendation. `uv tool install git+https://github.com/NVIDIA/skillspector.git` | Bekräftat | https://github.com/NVIDIA/SkillSpector |
| Variate | MIT, inga beroenden (`variate.mjs`, Node 18). `up` lägger till **en dev-only, markörinramad rad** i entry-filen (eller injicerar vid serve utan att röra filer) och startar en sidecar på 127.0.0.1. `end` tar bort allt och stoppar sidecar så att git diff bara visar designbeslutet. | Bekräftat | https://github.com/Nutlope/variate , https://raw.githubusercontent.com/Nutlope/variate/HEAD/SKILL.md |
| GBP API – ansökan | Formulär "Application for Basic API Access": https://support.google.com/business/contact/api_default . Krav: verifierad profil aktiv 60+ dagar, webbplats på profilen, ansökan från e-post som är ägare/manager. 0 QPM före godkännande, 300 QPM efter. | Bekräftat | https://developers.google.com/my-business/content/prereqs |
| GBP API – handläggningstid | "Requests are reviewed within 14 days." | Bekräftat | https://developers.google.com/my-business/content/faq |
| GBP – roll med bara läsrätt? | Nej. Bara ägare (primär/övriga) och manager; manager kan redigera nästan allt men inte hantera användare eller ta bort profilen. Google rekommenderar att tredje part är manager, inte ägare. | Bekräftat | https://support.google.com/business/answer/3403100 , https://developers.google.com/my-business/content/faq |
| GSC – Restricted user | Ja, behörighetsnivå "Restricted": visningsrätt på de flesta data. | Bekräftat | https://support.google.com/webmasters/answer/2453966 |
| GSC API med restricted user | API:t känner nivån `siteRestrictedUser`; `searchAnalytics.query` kräver "read permissions on that property". Restricted har läsrätt → bör fungera för prestandadata, men inget officiellt exempel visar det uttryckligen. Använd scope `webmasters.readonly`. | Delvis bekräftat (slutsats) | https://developers.google.com/webmaster-tools/v1/prereqs , https://developers.google.com/webmaster-tools/v1/sites , https://developers.google.com/webmaster-tools/v1/how-tos/authorizing |
| Officiell Search Console-MCP? | Ingen hittad. Sekundärkällor (okt 2026) uppger att Google har officiell GA4-MCP men ingen för Search Console; community-alternativ t.ex. AminForou/mcp-gsc (MIT). | Ej bekräftat att någon finns | sekundärt: https://www.usecarly.com/blog/google-search-console-mcp/ |
| Scrollytelling-skillens licens | Skillen i guiden kommer från `doodledood/claude-code-plugins` (plugin `frontend-design`). README anger "License: MIT"; ingen separat licens i pluginmappen hittad. | Delvis bekräftat | https://github.com/doodledood/claude-code-plugins |
| Hallmark | `Nutlope/hallmark`, MIT. | Bekräftat | https://github.com/Nutlope/hallmark |
| Inspo | `Nutlope/inspo`, MIT (sökbar via MCP, 832 sajter). | Bekräftat | https://github.com/Nutlope/inspo |

## Detaljer

### 1. Google Stitch

**CLI.** `@google/stitch` är Googles officiella CLI (repo `google-labs-code/stitch-sdk`, homepage stitch.withgoogle.com). Installation `npm install -g @google/stitch` eller `npx @google/stitch`. Exempel ur README:

- `stitch generate screen --new-project "..." --prompt "..." --device MOBILE`
- `stitch capture http://localhost:3000/checkout` → `stitch upload screen ...` → `stitch edit screen <id> --prompt "..."` (för in en befintlig sida i Stitch och gör om den)
- `stitch generate variants --count 1–5 --creative-range REFINE|EXPLORE|REIMAGINE`
- `stitch upload design DESIGN.md --project <id>`
- `stitch serve -p <id>`, `stitch mcp install` (registrerar inbyggd MCP-server), `stitch agent-skills add` (skriver SKILL.md till `.agents/skills`; `update` efter CLI-uppgradering)
- Projektstandard i `.stitch.json` (`stitch config set project <id>`).
- Modeller via `--model`: `GEMINI_3_8_FLASH`, `GEMINI_3_5_FLASH_LITE`.
- "Loop"-kommandona (insights/solutions) är experimentella.

Observera: `agent-skills add` skriver till `.agents/skills` – kontrollera att Claude Code läser den sökvägen, annars kopiera/länka till `.claude/skills/` (ej verifierat hur Claude Code hanterar `.agents/skills`).

**stitch-skills (Google).** Plugins och skills:
- stitch-design: code-to-design, generate-design, manage-design-system, extract-design-md, extract-static-html, upload-to-stitch
- stitch-build: react-components, react-native, remotion, shadcn-ui, react-vite-dashboard
- stitch-utilities: design-md, enhance-prompt, stitch-loop, taste-design

Repot anger att de kräver Stitch MCP-servern. Med det nya CLI:t kan MCP fås via `stitch mcp install`/`stitch-mcp` (officiellt) i stället för davideast/stitch-mcp.

**Autentisering och obevakad körning.** OAuth (`stitch login`, loopback-port 8085) förnyas automatiskt men kräver en första interaktiv inloggning; hur länge en refresh-token lever är ej bekräftat. API-nyckel (`STITCH_API_KEY`) krävs ändå för vissa Canvas-operationer och är det rimliga valet för obevakade körningar. Förvara nyckeln utanför repot.

**Kvoter.** Ingen officiell kvotsida hittades. Sekundära uppgifter (350 + 200/månad) ska behandlas som obekräftade; kvoter för CLI/API-anrop är ej bekräftade.

**Labs-status.** Officiella blogginlägg (senast I/O 2026-05-19) placerar Stitch under Google Labs. Ingen källa om att det lämnat Labs.

### 2. Matt Pocock
Relevanta skills för oss: `codebase-design`, `improve-codebase-architecture`, `domain-modeling`, `tdd`, `diagnosing-bugs`, `code-review`, `grill-me`/`grill-with-docs`, `to-spec`, `to-tickets`, `implement`, `prototype`, `handoff`, `research`, `writing-for-agents`. Licens MIT.

### 3. Skill Spector
Korrekt adress: https://github.com/NVIDIA/SkillSpector (installkommandot i README skrivs med gemener, `git+https://github.com/NVIDIA/skillspector.git`; GitHub skiljer inte på versaler och gemener i repo-namn). Community: GitHub Action `thomast1906/skill-spector-githubaction`, webbport `niyogilabs/SkillSpectorWeb`.

### 4. Variate
Arkitektur: vanilla-JS-kort i shadow root, injicerat i den egna dev-sidan; sidecar på 127.0.0.1 med SSE. Livscykel `up` → välj → `end`. `.variate/` läggs i `.gitignore` under sessionen och tas bort efteråt. Ramverksspecifik inkoppling beskrivs i `references/frameworks.md` (ej läst i detalj). Slutsats: dev-only per design; för produktionsbygget gäller att `end` alltid körs före commit – lägg gärna en kontroll i prelaunch som söker efter variate-markören.

### 5. Google Business Profile API
Se tabellen. Inget läsroll-alternativ; minst behörighet är manager.

### 6. Google Search Console
Restricted user finns. API-åtkomst styrs av samma behörighet; prestandadata (`searchAnalytics.query`) kräver läsrätt. Sitemap-inlämning kräver högre nivå (restricted kan inte skicka sitemaps i UI). Ingen officiell GSC-MCP hittad per oktober 2026.

### 7. Licenser
Scrollytelling (doodledood) MIT enligt README; Hallmark MIT; Inspo MIT; Variate MIT; stitch-skills Apache-2.0; `@google/stitch` Apache-2.0; SkillSpector Apache-2.0; mattpocock/skills MIT.
