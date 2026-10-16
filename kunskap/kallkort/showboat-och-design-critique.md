# Showboat och design-critique

**Källa:** två saker under en post, lästa 2026-10-16.
- **Showboat:** https://github.com/simonw/showboat, commit `d531261` (2026-02-23), release v0.6.1 (2026-02-23). Lästa: hela `README.md`, `exec/runner.go`, `cmd/verify.go`, `docs/plans/2026-02-06-showboat-design.md`, ärendena #12, #14, #35 och #36. Simon Willison, [Agentic manual testing](https://simonwillison.net/guides/agentic-engineering-patterns/agentic-manual-testing/) (kapitel i *Agentic Engineering Patterns*, sidan saknar datum) och lanseringsinlägget [Showboat and Rodney](https://simonwillison.net/2026/Feb/10/showboat-and-rodney/) (2026-02-10).
- **design-critique:** https://github.com/anthropics/knowledge-work-plugins, `design/skills/design-critique/SKILL.md` (senast ändrad i commit `2d6f7e2`, 2026-03-13; repots HEAD `33eeda1`, 2026-10-15), pluginet `design` version 1.2.0. Lästa: `design/README.md`, `CONNECTORS.md`, `.claude-plugin/plugin.json`, `.mcp.json`, syskonen `accessibility-review` och `ux-copy`.
⚠️ Inte lästa: Showboats övriga Go-filer (`markdown/`, `cmd/remote.go`), Rodneys repo och design-pluginets övriga fyra skills.

**Licens:** båda Apache-2.0 (`LICENSE` i respektive repo; GitHubs API säger detsamma). Kräver att licens och upphovsrättsnotis följer med om kod eller text sprids vidare och att ändringar märks. Vi destillerar med egna ord och sprider ingenting, så inget krav utlöses.

## Vad det är
**Showboat** är en liten Go-CLI (cirka 172 rader enligt Willison) där en agent bygger ett markdowndokument som visar vad den gjort: kommentarer, kommandon med den utdata de faktiskt gav, och skärmbilder. **design-critique** är en skill i Anthropics design-plugin för Cowork och Claude Code som ger strukturerad designkritik i fem delar: första intryck, användbarhet, visuell hierarki, konsekvens och tillgänglighet.

## Hur det fungerar
**Showboat**
- `init` skapar dokumentet med titel och tidsstämpel; `note` lägger till text; `exec <fil> <språk> <kod>` kör koden med `<språk> -c`, fångar stdout och stderr tillsammans och skriver både kommandot och utdata i dokumentet. Utgångskoden skickas vidare, så agenten ser felet.
- `image` kopierar en skärmbild in i dokumentet; `pop` tar bort senaste posten (tänkt för misslyckade kommandon); `extract` skriver ut kommandona som återskapar dokumentet.
- `verify` kör om varje kodblock och jämför med den inspelade utdata; avvikelse ger kod 1. Bilder körs inte om (#14).
- `SHOWBOAT_REMOTE_URL` skickar varje post till en extern mottagare under arbetet.
- Willisons poäng: `exec` är *"designed to discourage the agent from cheating and writing what it hoped had happened"*. Han är själv *"not entirely convinced by the design"* av `verify` (lanseringsinlägget).

**design-critique**
- Kräver designen (Figma-länk, skärmbild eller beskrivning), sammanhang (vad, för vem, vilket skede) och valfritt fokus.
- Fem rubriker med frågor, t.ex. *vad drar ögat först – är det rätt?*, *är syftet direkt tydligt?*, *följer det designsystemet?*, kontrast och tryckytor.
- Kritikregler: var konkret ("CTA:n konkurrerar med navigeringen", inte "rörigt"), förklara varför, föreslå alternativ, säg vad som fungerar, anpassa till skedet.
- Utdata: helhetsintryck i 1–2 meningar, tabeller med fynd och allvar i tre nivåer (kritisk, måttlig, mindre), "What Works Well" och tre prioriterade rekommendationer.
- Syskonen: `accessibility-review` är en WCAG 2.1 AA-checklista med rapportmall; `ux-copy` ger mönster för knappar, felmeddelanden och tomma tillstånd.

## Kvalitet och underhåll
- **Showboat:** 1 238 stjärnor, 47 forkar, 2 bidragsgivare, skapad 2026-02-06, senaste push 2026-03-14; 17 öppna ärenden och PR:ar (GitHubs API 2026-10-16). Kända problem: agenter redigerar markdownfilen direkt i stället för att köra `exec` ([#12](https://github.com/simonw/showboat/issues/12), också en användare som sett agenten *beskriva* kommandon utan att köra dem); `verify` kör blocken i anroparens katalog, inte i den ursprungliga `--workdir`, och gav i ett fall fem falska commits i ett orelaterat repo ([#36](https://github.com/simonw/showboat/issues/36)); ett `showboat verify` i dokumentet startar sig självt i en kedja ([#35](https://github.com/simonw/showboat/issues/35)); utdata utan avslutande radbrytning ger trasiga block ([#37](https://github.com/simonw/showboat/issues/37)). Inga commits sedan mars: litet och stillastående.
- **knowledge-work-plugins:** 29 840 stjärnor, 32 bidragsgivare, skapad 2026-01-23, push 2026-10-16, 112 öppna ärenden. Själva `design-critique` har bara ändrats två gånger (2026-02-24 och 2026-03-13); trafiken i repot gäller MCP-kopplingar. Kända problem: `gmail` och `google calendar` levereras med tom URL i 12 plugins ([#933](https://github.com/anthropics/knowledge-work-plugins/issues/933)); `$`-tecken i skilltext byts mot kommandoargument ([#1286](https://github.com/anthropics/knowledge-work-plugins/issues/1286)) – design-critique använder `$ARGUMENTS` och `@$1`.
- **Faktafel i syskonskillen:** `accessibility-review` listar 2.5.5 (44 × 44 px) som ett AA-krav, men 2.5.5 är nivå AAA ([W3C, Understanding 2.5.5](https://www.w3.org/WAI/WCAG21/Understanding/target-size.html)), och skillen bygger på WCAG 2.1, inte 2.2 med AA-kravet 2.5.8 (24 × 24 px).

## Det bästa vi kan ta
1. **Belägg som spelas in, inte skrivs** (Showboat `exec`): det huvudsessionen skriver i `progress.md` som belägg ska vara kommandot och dess verkliga utdata, inspelat av ett skript, inte återberättat. Det skärper regeln *Redo för Johnnys dom bara med belägg* (`guide/3-1`) utan ny mekanik: kontrollskriptet kan självt skriva kommando, utgångskod och utdrag till `progress.md`.
2. **Ärende #12 som varning:** en loggfil som agenten kan redigera är inget belägg. Willisons egen lösning är att skicka posterna någonstans där agenten inte kan ändra dem – samma tanke som låsningen i `guide/3-1` (*Den som bedöms får inte ändra domaren*, lager 1).
3. **Agentic manual testing** stöder `guide/3-2`, *Utforskningstest*: kör det byggda, titta på skärmbilderna, och gör varje verkligt fynd till en automatisk kontroll (Willison: hittat manuellt → röd/grön test).
4. **Ur design-critique, till granskarens fynd:** frågan *vad drar ögat först på mobilens första skärm – är det rätt?* som stöd till måttstockens fråga 1, regeln att varje fynd ska vara konkret och säga varför (redan granskarens princip 3), och att kritiken säger vad som fungerar (motsvarar *det som gör den bra* i `mallar/granskning.md`).
5. **ux-copy** som mönsterlista för knappar och felmeddelanden (verb först, "Radera 3 filer?" i stället för "Är du säker?") – hör till innehållslagret, inte granskaren.

## Var det hamnar hos oss
**Delvis emot förslaget: posten bör delas.**
- **Showboat → skill `larande` och `guide/3-1`** (belägg), inte granskaren. Det är ett mönster för hur byggaren visar sitt arbete, och `larande` citerar det redan (princip 4). Verktyget installeras inte i N1: där tittar Johnny, och kontrollskriptet kan spela in sin egen utdata. Pröva Showboat (eller ett eget tiotal rader) först i N2, när byggaren blir en delagent och risken för påhittade statusrapporter finns – och då med posterna utanför byggarens skrivrätt.
- **design-critique → skill `granskare`, bara som källa** för punkt 4, med egna ord i `premium.md` eller `SKILL.md`. Inte som kriterieram: granskarens dom bor i den låsta checklistan med Johnnys tre frågor, och design-critiques fem rubriker är allmänna designråd utan referens – just det `guide/3-2` varnar för (utan förebild hittar kritikern på en egen standard, fallgrop 61). Startfröet till bedömarens kriterier är redan ersatt av måttstocken.
- **accessibility-review → ingenstans** (faktafel, WCAG 2.1; vi har axe och kontrollerna i `2-8`). **ux-copy →** möjligen källa till `innehall/mikrotext.md`.

## Passar vår stack?
- Showboat är en fristående Go-binär (också på PyPI via `uvx`). Den rör inte sajterna. Den kräver Go eller uv på Macen och är ett nytt verktyg i byggsessionen; `exec` kör godtyckliga kommandon med `-c`, alltså samma behörighet som Bash.
- design-critique är skriven för Figma och SaaS-produkter ("checkout flow for a B2B SaaS"). Översätt till statiska Astro-sajter för småföretag: designsystemet är stilkitet och dess `--k-*`-tokens, skedet är riktning, bygge eller förvaltning, och allvaret mappas till våra fyra nivåer (`kritisk`, `hög`, `medel`, `låg`) med taket `medel` för en källa.

## Risker och flaggor
- **Installera inte design-pluginet.** Dess `.mcp.json` lägger in nio fjärr-MCP-servrar (Slack med OAuth, Figma, Linear, Asana, Atlassian, Notion, Intercom, Google Calendar, Gmail), varav två med tom URL (#933). Det krockar med regeln om inga tredjepartsskills i kundbygget och skulle ge granskaren kopplingar den inte ska ha (`guide/3-1`, rolltabellen).
- **Skillnamn och triggning:** design-critique triggar på "review this design" och "what do you think of this screen?", samma begäran som vår `granskare` – två skills som tävlar om samma begäran är ett fynd (`guide/3-4`, *Triggningstest*).
- **Showboat `verify`** kör om alla block i den katalog man står i (#36) och kan starta sig självt (#35). Kör den aldrig på ett dokument någon annan skrivit, och aldrig från repots rot.
- **`SHOWBOAT_REMOTE_URL`** skickar allt, också utdata med kunduppgifter, till en extern adress; lämna den osatt.
- Ingen telemetri hittad i den lästa koden; ingen betalvägg.

## Inloggning
Inget. Design-pluginets kopplingar (Figma, Slack m.fl.) kräver inloggning, men de ska inte användas.
