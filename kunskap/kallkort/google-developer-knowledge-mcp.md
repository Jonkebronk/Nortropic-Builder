# Google Developer Knowledge MCP

**Källa:** Googles dokumentation, läst 2026-10-16. Det finns inget publikt repo för servern.
- [Connect to the Developer Knowledge MCP server](https://developers.google.com/knowledge/mcp), uppdaterad 2026-10-15. Läst i sin helhet: verktyg, autentisering, kända begränsningar, Model Armor och kommandot för Claude Code.
- [Corpus reference](https://developers.google.com/knowledge/reference/corpus-reference), uppdaterad 2026-10-13.
- [Quota & limits](https://developers.google.com/knowledge/quota), uppdaterad 2026-08-04.
- [Release notes](https://developers.google.com/knowledge/release-notes), uppdaterad 2026-10-14, från 2026-02-04 till 2026-10-09.
- [Answer query](https://developers.google.com/knowledge/answer-query) och [API-sidan](https://developers.google.com/knowledge/api), avsnittet om OAuth-omfång.
- Det officiella MCP-registret: `com.googleapis.developerknowledge/mcp`, version 1.0.0 (sökning 2026-10-16).
- ⚠️ Inte lästa: Googles blogginlägg [Introducing the Developer Knowledge API and MCP Server](https://developers.googleblog.com/introducing-the-developer-knowledge-api-and-mcp-server/) (februari 2026; bara en söksammanfattning), skillen `retrieving-developer-knowledge` i google/skills och villkoren som gäller API:t. Pris och loggning av frågor står inte på någon av de lästa sidorna.

**Licens:** en tjänst, ingen kod att sprida. Dokumentationen i korpusen är CC BY 4.0 och kodexemplen Apache 2.0 (sidfoten på developers.google.com). Vi destillerar med egna ord och länkar till sidan. Vilka API-villkor som gäller för nyckeln står inte på sidorna ⚠️.

## Vad det är
Googles officiella, värdade MCP-server (`https://developerknowledge.googleapis.com/mcp`) som söker i och hämtar Googles publika utvecklardokumentation som markdown. Den är GA sedan 2026-04-16, efter en publik förhandsversion från 2026-02-04 (release notes).

## Hur det fungerar
- **Tre verktyg** (MCP-sidan):
  - `search_documents` ger de mest relevanta textstyckena med dokumentnamn.
  - `get_documents` hämtar hela dokument som markdown, med namnen ur sökningen. Det ersatte `get_document` och `batch_get_documents` 2026-03-08.
  - `answer_query` *genererar* ett svar ur korpusen, med `citations` och `references` sedan 2026-06-01. Verktyget kör på gemini-3.5-flash sedan 2026-10-09. Dagen innan kapades svaren under en störning.
- **Korpusen:** 21 domäner, bland dem `web.dev`, `developer.chrome.com` och hela `developers.google.com`. Search Central (`/search`) och Business Profile (`/my-business`) ligger under den domänen och har inget undantag. De är alltså med, men det är härlett, inte utskrivet ⚠️. Undantagna är bara referenssidor för klientbibliotek på `docs.cloud.google.com`.
- **Färskhet:** målet är att indexera om *"within 48 hours of publication"* (korpusreferensen). Bloggen lovade 24 timmar under förhandsversionen ⚠️ (inte läst direkt).
- **Begränsningar:** bara publik dokumentation, och *"documentation in English only"* (MCP-sidan, *Known limitations*).
- **Kvoter per projekt:** `AnswerQuery` 50 per dag, `GetDocument` och `BatchGetDocuments` 100 per minut tillsammans, `SearchDocumentChunks` 100 per minut. Över kvoten ger `429 RESOURCE_EXHAUSTED`.
- **Autentisering:**
  - API-nyckel i huvudet `X-Goog-Api-Key`. Googles rekommendation för Claude Code, Cursor och andra fjärrklienter.
  - ADC-token med `Authorization: Bearer` och `X-Goog-User-Project`. Den gäller en timme.
  - OAuth med ett eget klient-id. Googles servrar *"don't support OAuth Dynamic Client Registration (DCR)"*, så Claude Codes vanliga inloggning via `/mcp` fungerar inte utan vidare.

## Kvalitet och underhåll
- Utgivare: Google, under developers.google.com/knowledge. Release notes visar ändringar varje månad: nya domäner (senast `knowledge.workspace.google.com` 2026-10-01), fält och kommandon i gcloud (GA 2026-09-22).
- Två brytande ändringar under året: verktygen för att hämta dokument byttes ut 2026-03-08, och modellen bakom `answer_query` har bytts två gånger (juni och oktober). Verktygslåset fångar sådant.
- Inga publika ärenden att läsa, eftersom det inte finns något repo.

## Det bästa vi kan ta
1. **Sök i hela korpusen på en gång.** Guidens viktigaste primärkällor är Googles: Search Central, web.dev och Chrome. De citeras i 37 filer i `.claude/skills/` och `guide/`, flest i `kvalitet/seo-teknik.md` (19 rader) och `kvalitet/prestanda.md` (14 rader; `grep` 2026-10-16). Servern gör det möjligt att kontrollera att en citerad regel fortfarande står kvar, utan att varje sida hämtas för sig.
2. **Bara `search_documents` och `get_documents` är källor.** `answer_query` är text från en modell och räknas som *härlett*, aldrig som *sett* (`guide/README.md`, *Sett, härlett, okänt*).
3. Allt i korpusen är publikt. WebFetch når samma sidor utan nyckel. Servern vinner bara om sökningen och markdownen sparar steg.

## Var det hamnar hos oss
**Beslut** (Johnny omkring 17.40, *"Ja på alla"*): *MCP: kräver konto (Google Cloud-projekt och API-nyckel begränsad till Developer Knowledge API)*. Jag håller med, med två förslag till Johnny:
- **Stäng av `answer_query`** med en deny-regel för `mcp__google-developer-knowledge__answer_query` i byggsessionens behörigheter. Det är Johnnys inställning (`guide/3-3`), och Claude ändrar den inte. Skäl: svaret är genererat, och kvoten är 50 per dag.
- **En egen nyckel per Google-tjänst.** Grounding Lite och nanobanana får egna nycklar, så att en läckt nyckel bara öppnar ett API. Googles sida föreslår att samma nyckel kan användas för Gemini-anrop, och det gör vi inte.
- Ingen av våra skills nämner servern i dag. Googles egen skill gör det (avsnittet *Googles skill* nedan). Behålls den hör den till **larande** (`bevakning.md`) och **kvalitet** (`seo-teknik.md`, `prestanda.md`), som uppslag när en Google-källa läses om.
- **Provet mot övningssajten:** fem frågor ur `guide/2-2` och `2-8`: flytt med nya adresser, robots.txt, `LocalBusiness`, CrUX-kravet och förutsättningarna för Business Profile. Facit är Googles sidor, hämtade med WebFetch. Frågorna ställs på engelska. **Nytta:** rätt sida och rätt regel med färre steg än WebFetch. **Annars:** ta bort servern (`andra-varvet/mcp-jamforelse.md`, *Google Developer Knowledge MCP*).

## Passar vår stack?
Ja, för kunskap. Servern rör inte sajten och kör inget på Macen. Den täcker Google-delen av lager 1, 2, 8 och 9 (Business Profile, Search Central och Core Web Vitals), men inte Astro, Cloudflare eller MDN.

## Risker och flaggor
- **Beslutet *Inget Cloudflare eller Google-API för övningssajterna*** (`BESLUT.md` 2026-10-15) gäller sajterna. Johnnys beslut 17.05 om att alla MCP:er ska in (*Alla MCP:er in nu …*) tar in den här servern, och projektet blir byråns, inte övningssajtens.
- **Pris och loggning är okända** ⚠️. Om Google Cloud-projektet kräver ett betalkonto står inte heller på de lästa sidorna ⚠️. Sätt en budgetvarning i projektet om ett betalkonto krävs.
- **Nyckeln ligger i klartext** i `~/.claude-bygg/.claude.json` (lokal scope). Den får aldrig hamna i `.mcp.json` eller i `inventering/mcp-servrar.json`, eftersom repot är publikt.
- **Verktygslåset hoppar över servern** (`"inloggning": true` i `inventering/mcp-servrar.json`) tills skriptet kan läsa nyckeln utanför repot.
- **Model Armor** loggar hela innehållet om loggning slås på (MCP-sidan). Slå inte på det.
- Kunduppgifter står aldrig i en fråga.

## Inloggning
Kräver ett Google Cloud-projekt med Developer Knowledge API påslaget (`gcloud services enable developerknowledge.googleapis.com`; sedan 2026-03-17 slås MCP-servern på samtidigt) och en API-nyckel som under *API restrictions* bara får Developer Knowledge API. Johnny skapar nyckeln och lägger in den själv i ett eget terminalfönster från repots rot, aldrig i chatten: `claude mcp add google-developer-knowledge --transport http https://developerknowledge.googleapis.com/mcp --header "X-Goog-Api-Key: <nyckeln>"` (lokal scope). I dag är servern inlagd i byggsessionen som `http` med den adressen men utan nyckel, så den svarar inte än. OAuth via `/mcp` fungerar inte, eftersom Google inte stöder DCR.

## Googles skill `retrieving-developer-knowledge`
- **Källa:** [google/skills](https://github.com/google/skills), `skills/developers/retrieving-developer-knowledge/`, version 1.0.1, commit `730939d` (2026-10-15). Läst 2026-10-16 i sin helhet: `SKILL.md` och de tre referenserna. Licens Apache-2.0.
- **Vad den gör:** säger åt Claude att slå upp i korpusen i stället för att svara ur minnet. Den använder MCP-servern när verktygen finns, annars REST-API:t med curl och en gcloud-token eller `DEVELOPERKNOWLEDGE_API_KEY`. Ett uppslag som misslyckas ska sägas rakt ut och inte se ut som ett svar. Bara text, inga skript eller hooks.
- **Hos oss:** installerad i projektet 2026-10-16 med `npx skills@1.7.2 add … --copy -y` (`BESLUT.md`). Filerna ligger i `.claude/skills/retrieving-developer-knowledge/`, och `skills-lock.json` håller källan och hashen. Vi ändrar inte filerna, så att `npx skills update` kan ersätta dem. Skillen fungerar först när det finns en nyckel: gcloud saknas på Macen, och MCP-servern saknar huvudet.
- **Krockar med guiden:**
  - Skillen föredrar `answer_query` för begreppsfrågor och kallar hämtad dokumentation *"100% authoritative"*. Hos oss är `answer_query` härlett (punkt 2 under *Det bästa vi kan ta*), och bara `search_documents` och `get_documents` räknas som källor.
  - Exemplen i `SKILL.md` lägger nyckeln i adressen (`?key=`). Huvudet `X-Goog-Api-Key`, som referensen också tillåter, håller den utanför adresser som loggas.
  - Beskrivningen är bred (gcloud, IAM, *"official documentation"*), så skillen kan laddas också när frågan gäller Cloud-delar vi inte använder.
