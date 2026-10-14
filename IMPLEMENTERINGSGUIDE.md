# Implementeringsguide: AI-webbsidebyggare med Claude Code + Google Stitch

> **Status:** Utkast v0.59 (2026-10-14) — levande dokument som vi bygger vidare på.
> **Planerat:** konsolideringsrunda (slå ihop dubbletter, t.ex. granskarisolering i §5.2/fas 4/fas 6b; skilj grindar från instruktioner och flytta regler enligt placeringsordningen i §8.7; gör **"agenten föreslår, du beslutar"** till en egen princip — den återkommer för `arbetssatt.md`, granskarkriterier, kontroller, `design.md` och `CLAUDE.md`; en möjlig disposition är OS-liknelsen ur OS-videon — `CLAUDE.md` som kärna, MCP som drivrutiner, skills som program, loopar/rutiner som schemaläggare, arbetsflöden som binder ihop) **när videogenomgången är klar** — inte före. **Metod för konsolideringen (Karpathy-videon):** guiden byggs om som wiki ur råmaterialet i `kunskap/raw/` — varje regel spårbar till ett citat, regler med en källa på bänken (§11.11), och motsägelser mellan videor synliga som konflikter. **Tillägg (STORM-videon, §11.12):** motsägelserna tas fram med linser — byggaren, kunden, säkerheten, ekonomin och skeptikern — och en karta över motsägelser, och varje citat kontrolleras mot sin källa (*bekräftad, rättad, nedgraderad*).
> **Källor:**
> - AI LABS, *"Google Just Fixed AI Design By Releasing This"* (2026-10-13), https://www.youtube.com/watch?v=au2TI8sdq8E — flödet (§1–5)
> - AI LABS, *"Claude Mods Are Insane… You Need To Try These Right Now"* (2026-10-09), https://www.youtube.com/watch?v=ERNqRK6sMJY — live-visning (§6)
> - AI LABS, *"This Just Fixed Your Claude Code Setup's Biggest Flaw"* (2026-10-07), https://www.youtube.com/watch?v=jlEMo6Dsh9E — säkerhet och kvalitetsvakter (§7)
> - AI LABS, *"You Need To Add This In Your Claude Code Setup Right Now"* (2026-10-05), https://www.youtube.com/watch?v=i6Q7bXnWGlM — grundinställningar och eval (§8–9)
> - AI LABS, *"He Finally 10x Claude Code With This Method"* (2026-10-02), https://www.youtube.com/watch?v=qLfSDQ5NGh0 — låsta kontroller och självförbättring (§10)
> - AI LABS, *"How To Use Claude Code To Build Amazing Sites With Opus 5.5"* (2026-09-30), https://www.youtube.com/watch?v=DP7mgLUKN_U — design.md, Hallmark, Scroll World, publicering (§4 fas 2, 4, 5, 7)
> - AI LABS, *"Insane Jev Use Cases You Need To Use Right Now"* (2026-09-28), https://www.youtube.com/watch?v=2nc_QMuNp18 — designregelvakt, granskningsdjup, utforskningstest (§7.3, §7.5, §7.6, §10.3)
> - AI LABS, *"Shopify Just Released The Greatest AI Coding Workflow Ever"* (2026-09-24), https://www.youtube.com/watch?v=bBMp5tLxShQ — två stopp, checkpoints, parallella granskare, kodgranskning (§4, §5.2, §5.4, §10.5). Originalkälla: https://shopify.engineering/helix
> - AI LABS, *"This New Open Source Tool Just Fixed Your Claude Code Workflow"* (2026-09-22), https://www.youtube.com/watch?v=CHHEjuNBxoQ — hemligheter i flödets filer, Agit (§7.3, §9.3)
> - AI LABS, *"Github #1 Trending Skill's Author Just Fixed Claude's Design Problem"* (2026-09-18), https://www.youtube.com/watch?v=Ow_z94c3wKk — Inspo, designriktningar, originalitet (§4 fas 1, 1b, 2, 4, 5)
> - AI LABS, *"Insane GitHub Repos That 10x Your Codex And Claude Code Setup"* (2026-09-14), https://www.youtube.com/watch?v=Ua0APTMVcb8 — självintervju, dolda kontroller, tre utfall, Caliper, Anti-Slop (§4, §9.5, §10.2)
> - AI LABS, *"Github Top Trending Tool Just Fixed The AI Agent's Biggest Problem"* (2026-09-08), https://www.youtube.com/watch?v=cyIWQHYoUg8 — Graft (§12)
> - AI LABS, *"You Are Using Fable 5.1 Wrong (Do This Instead)"* (2026-09-05), https://www.youtube.com/watch?v=7au4tWVG8a0 — promptregler, effort, modellrisker (§8.6, fas 3, fas 6)
> - AI LABS, *"Grok Bot Use Cases That Are Actually Insane"* (2026-09-03), https://www.youtube.com/watch?v=90pwPVrydHg — förvaltning: AEO, ny besökare, bevis i rapporter (fas 8)
> - AI LABS, *"These New Claude Skills Are Actually Insane"* (2026-09-01), https://www.youtube.com/watch?v=jyLKRN36-Dc — Variate, Task Observer, Karpathys regler (§6.8, §8.1, §8.6, §10.5)
> - AI LABS, *"Hermes Agent Skills That Make It 10x More Powerful"* (2026-08-30), https://www.youtube.com/watch?v=WJgxX0Eib6k — orkestrerarens påminnelse, Mantis (§5.1, fas 7, fas 8a)
> - AI LABS, *"Insane Claude Design Skills You Need To Actually Build Beautiful Sites"* (2026-08-24), https://www.youtube.com/watch?v=Ysr7oNDajJI — designskills per fas och roll (§4 fas 1–6, §12)
> - AI LABS, *"GitHub's #1 Trending Author's New Claude Skill Is Insane"* (2026-08-20), https://www.youtube.com/watch?v=c47uqR7XB_c — Unlazy: bevis per grind, tyst nedskärning, parallella checkpoints (fas 1b, fas 3, §7.2). Repo: https://github.com/Leonxlnx/unlazy
> - AI LABS, *"Every Level Of Claude Code Loop Engineering Explained"* (2026-08-18), https://www.youtube.com/watch?v=PLyRe6Zk--8 — funktionsspecifikation, video för rörelse, prototyplänk, ändringskö, `/goal` (fas 1b, 5, 6, 8b, §5.1)
> - AI LABS, *"This Claude Skill Just Fixed Loop Engineering"* (2026-08-14), https://www.youtube.com/watch?v=D_uojDHkbw4 — blind jämförelse, granskare utan rundnummer, dimma och beslutskarta (fas 1, fas 6, §5.2)
> - AI LABS, *"How To Use Claude Design To Build Beautiful Sites"* (2026-08-12), https://www.youtube.com/watch?v=bBlY5YOsKN8 — wireframes först, validering av `design.md`, elementknuten feedback (fas 2, stopp 2, fas 8b)
> - AI LABS, *"This Claude Code Skill make Building 10x Faster"* (2026-08-10), https://www.youtube.com/watch?v=b9k-AE4v5yI — advise-project-approach: belägg, bygga eller använda befintligt, kostnad i tre lägen (§11, §12)
> - AI LABS, *"This Is How Forward Deployed Engineering Is Actually Done"* (2026-08-07), https://www.youtube.com/watch?v=AD-EmZ3v6-g — processen bakom primär handling, pilotfas, värdemått (fas 1, §5.4, §9.3, fas 8a)
> - AI LABS, *"Buzz Just Fixed AI Agents... But It Has A Serious Flaw"* (2026-08-04), https://www.youtube.com/watch?v=a8tLTd4q-fU — adversarial granskning av planen, spårbarhet per agent (fas 1b, §10.4)
> - AI LABS, *"Claude Code Setup Guide By The Creator Himself"* (2026-07-31), https://www.youtube.com/watch?v=pGro_uKt-_M — Boris Cherny: rensa vid ny modell, kontroller som kan säga nej, beskriv i stället för att visa (§8.5, §8.7, §10.3, fas 2, fas 3, fas 8f)
> - AI LABS, *"This New Skill Finally Solves Thinking For AI Agents"* (2026-07-22), https://www.youtube.com/watch?v=m6IXL_YGqBQ — spridd idégenerering, kantfall, löften mot resultat (§11.7, fas 1b, fas 2, fas 7)
> - AI LABS, *"Fleet Engineering Is Insane... The Next Evolution Of Vibe Coding"* (2026-07-20), https://www.youtube.com/watch?v=qxjII6x2yPY — parallella sessioner: worktrees, portar, beroenden, överlämning, sandlåda (fas 3, §6.6, §7.3, fas 8b, fas 8d)
> - AI LABS, *"All The Types Of Claude Loops Explained In 13 Minutes"* (2026-07-09), https://www.youtube.com/watch?v=8wsM0euQOvc — specialister per aspekt, förbättringsjournal (fas 6, §10.5, §9)
> - AI LABS, *"Facebook's Release Just Gave Claude Code A New Design System"* (2026-07-03), https://www.youtube.com/watch?v=-HEdqzzYKco — låst `CLAUDE.md`, verktygsmanifest, komponentbibliotek som stackalternativ (§2, §10.1, §12, §14)
> - AI LABS, *"How To Use Claude Fable 5 Better Than 90% Of The People"* (2026-07-06), https://www.youtube.com/watch?v=GM7-ei-4Xc8 — effort-tak, modellval efter smak, säkerhet med starkaste modellen, förhör före sammanslagning (§8.6, fas 7, fas 8b, stopp 2)
> - AI LABS, *"The Top Claude Code Features We Use"* (2026-06-29), https://www.youtube.com/watch?v=ECQA6oOyfIk — advisor, Monitor, `/simplify`, agent teams, Ultra review (§5.3, §6.3, §7.7, fas 6b, stopp 2)
> - AI LABS, *"Google Replaced The Karpathy's LLM Wiki"* (2026-06-26), https://www.youtube.com/watch?v=k4sMSsMzX2g — Open Knowledge Format: struktur för kunskapsbaser, kundfakta (§10.5, §11.6, §11.8, fas 8a)
> - AI LABS, *"Insane Claude Design Skills You Need To Build Beautiful Websites"* (2026-06-23), https://www.youtube.com/watch?v=Ot582-E61ac — stilförinställningar, marknadsförings-UI, bildkällor (§11.7, §11.9, §12, §14)
> - AI LABS, *"They Finally Fixed Claude Code's Biggest Problem"* (2026-06-17), https://www.youtube.com/watch?v=KiTmBtyaeXg — Skill Spector: säkerhetsskanning av skills, låsta versioner, extern text som data (§7.3, §8.7, §12)
> - AI LABS, *"Loop Engineering Totally 10x Hermes agents"* (2026-06-15), https://www.youtube.com/watch?v=AQRDjI5owZI — feedbackens kvalitet, granskare som lär sig av missar, fem delar i en loop (§5, fas 4, §10.5)
> - AI LABS, *"4 Ways to Actually Build Stunning Websites with Claude Code"* (2026-06-13), https://www.youtube.com/watch?v=HqD5a2Cae60 — ombyggnad av befintlig sajt, äldre promptguider, gallerivy (fas 0b, fas 7, §8.5, §8.6, fas 1b)
> - AI LABS, *"These Claude Workflows Turn Claude Code Into A Whole OS"* (2026-06-03), https://www.youtube.com/watch?v=5LnwJyi1il4 — dynamiska arbetsflöden: bred/djup, scheman, återupptagning, avgränsning (§5.1, fas 1, fas 3, fas 4)
> - AI LABS, *"The Greatest AI Coding System I've Ever Used, Forget Codex Vs Claude Code"* (2026-05-31), https://www.youtube.com/watch?v=q7Am0pV6FjQ — Goal Buddy: roller med strikt åtkomst, domare, spanare, orakel (§5.2, §5.3, fas 3, §12)
> - AI LABS, *"3 Design Levels For a Free Claude Code Boost (People Stop At Level 1)"* (2026-05-24), https://www.youtube.com/watch?v=5lycYTOYbPM — antimönster som tester, OKLCH, visuell regression (§7.3, fas 2, fas 7, fas 8b, §10.1)
> - AI LABS, *"Anthropic Just Revealed The Best Claude Code Setup"* (2026-05-21), https://www.youtube.com/watch?v=lGalJmyI78w — plugin, `CLAUDE.md` per nivå, ignore-filer (§7.3, §8.7, §8.8). Bygger på Anthropics artikel: https://claude.com/blog/how-claude-code-works-in-large-codebases-best-practices-and-where-to-start
> - AI LABS, *"ADLC: Claude Code's New Lifecycle for AI Coding"* (2026-05-18), https://www.youtube.com/watch?v=aMBQB_IJ0dQ — stegvis lansering, ansvar hos människan (§5.4, §8.8)
> - AI LABS, *"Knowing This Gives You An Unfair Advantage With AI Coding"* (2026-04-28), https://www.youtube.com/watch?v=fMY5Sdj2DMk — mall för `CLAUDE.md`, okänt destruktivt kommando blockeras (§7.3, §8.7)
> - AI LABS, *"The Claude Code Skill Boris Cherny Runs on Every Project"* (2026-04-03), https://www.youtube.com/watch?v=AhXfI1rSUPc — `/batch`, Skillify-metoden för egna skills, dedupe (fas 3, fas 8b, §12)
> - AI LABS, *"How to Use Google Stitch to Make Sites 10X More Beautiful"* (2026-03-28), https://www.youtube.com/watch?v=b0lwCDNOFUY — Googles Stitch-skills, redesign, import av designsystem (§2, fas 0b, fas 2, §11.9, §12)
> - Jack Roberts, *"Claude Motion Design Just Destroyed Website Builders ($10,000 Websites)"* (2026-10-08), https://www.youtube.com/watch?v=fq3wx-AR6B0 — rörlig grafik ovanpå video, sömlösa loopar, lekfulla hinder (fas 5, fas 6)
> - Dokument: *"The $10K Website Kit: How Claude Builds an Agency-Quality Site for Your Business"* (Google Docs) — SEO-grunder, Emils animationsregler, bildkrav, Impeccable, förväxlingspaket (fas 1b, 5, 6c, §11.9, §12)
> - Dokument: *"Websites for Normal People – genomgång av flödet"* (Google Docs; genomgång av Sebastian Konings guide) — hemligheter per kund, staging, formulär, samtycke, vägar A–D, människans klick (fas 0, 3, 6c, 7, 8b, §7.3, §11.10, §14)
> - Märkningen 📄 = från ett av dessa dokument
> - Nate Herk, *"I Tried 100+ Github Repos for Claude. These 6 Are the Best"* (2026-10-11), https://www.youtube.com/watch?v=HhZdNYI4pJs — Playwright CLI, Humanizer, Scrollcraft, Claude Security, uppmätta tokenbesparingar (fas 5, 6, 7, 8a, §11.3, §12, §14)
> - Nate Herk, *"I Tested the Viral Reverse Engineer Anything Skill. What You Need to Know."* (2026-10-13), https://www.youtube.com/watch?v=rL5tw6h78zo — REA, sett/härlett/okänt, teknikbeskrivningar (fas 0b, 1, 2, §11.11, §12)
> - Nate Herk, *"Anthropic Engineers Just 10x'd Everyone's Claude Code"* (2026-10-08), https://www.youtube.com/watch?v=oz2CwrPV2Rg — minsta möjliga kontext, `/doctor`, vad men inte hur (§8.1, §8.5, §8.8, fas 8f, §12)
> - Nate Herk, *"I Built Another Andrej Karpathy Using Claude"* (2026-10-05), https://www.youtube.com/watch?v=bvGptCLDhyo — expertmetoden för kunskapsbaser, bänken, förutsäg-kör-jämför (§8.6, §11.4, §11.6, §11.11)
> - Nate Herk, *"Claude Code Mods Are Game Changers. Set Up These 5 NOW."* (2026-10-02), https://www.youtube.com/watch?v=9hetShMMp2s — mods: andra källan, Goal Meter, Cache Keeper, Collision Guard, Recording Mode (§6.2, §6.4, §6.9)
> - Nate Herk med Dave Ebbelaar, *"How to Actually Build & Sell Software with AI as a Non-Techie"* (2026-10-02), https://www.youtube.com/watch?v=l8ywUsEJ2XQ — kalibrering av LLM-domare, trappan av insatser, planering mot att se resultatet, säkerhet, arkitektur (§5.4, §9.6, fas 0, 1b, 3, 6b, 6c, 8f, §14)
> - Nate Herk, *"Anthropic Engineer Explains: What to Build Instead of AI Agents"* (2026-09-13), https://www.youtube.com/watch?v=HIRDzMtuWFk — återger Barry Zhang och Mahesh Murag (Anthropic) ⚠️ i andra hand: skills i stället för agenter, skript i skillen, beskrivningar som utlöser rätt skill, orsaksklassning, yttre bevis (fas 3, §8.8, §10.5, §12)
> - Nate Herk, *"How Anthropic ACTUALLY Prompts Fable 5.1"* (2026-09-02), https://www.youtube.com/watch?v=FBVNS1l5Vb8 — fyra promptvanor ur Anthropics dokumentation (§5.2, §8.6, fas 4, §12)
> - Nate Herk, *"Anthropic’s CEO: How to Build a 1 Person Business with Claude"* (2026-09-18), https://www.youtube.com/watch?v=QDsenEcAJIk — automatiserad försäljning och support, standardiserat erbjudande, riskklassade ärenden, utkast i stället för utskick, smal nisch, enhetsekonomi (§15, fas 8b) ⚠️ Darios filter i Nates tolkning
> - Nate Herk, *"Everything Goldman Sachs Taught Me About AI (In 10 minutes)"* (2026-08-24), https://www.youtube.com/watch?v=ZzHsJW10iq4 — VAULT: verifiera, förstärk, förstå varför, människan i loopen, transparens; tillsyn efter konsekvens, rabattkodsincidenten (§5.2, fas 8a, 8b, 8d, §11.11, §15.2) ⚠️ Goldmans CIO citeras i andra hand
> - Nate Herk, *"I Deleted All My Claude Skills... And Claude Got Smarter"* (2026-08-12), https://www.youtube.com/watch?v=XNQBCRcwXV4 — klipp ur Boris Chernys intervju hos Y Combinator: rensa var sjätte månad, unhobbling, högre nivå i prompter, verifiering; Nates test utan skills (§8.5, fas 8f, §11.11)
> - Nate Herk, *"5000 Hours of Building AI in Just 17 Minutes"* (2026-08-04), https://www.youtube.com/watch?v=7WZ6XldxX0U — tolv lärdomar: kvitton, förbud i prompter, verifiering, behörighet i verktygen, eval, stoppet eller läckan, nordstjärna, modellroutning (fas 0, 0b, 8a, 8d, §12, §15.3)
> - Nate Herk, *"Stanford's Method Turns Claude Into a PHD Level Research Team"* (2026-06-29), https://www.youtube.com/watch?v=Tj3018n5MVg — research med fem linser, karta över motsägelser, källkontroll, saknad lins (§11.12) ⚠️ egen tolkning av STORM
> - 📄 Shao, Jiang, Kanell, Xu, Khattab & Lam, *"Assisting in Writing Wikipedia-like Articles From Scratch with Large Language Models"* (NAACL 2024), https://arxiv.org/abs/2402.14207 — STORM (§11.12)
> - 📄 Anthropic, *Prompting Claude Fable 5.1*, *Prompting Claude Fable 5* och *Effort* (Claude Platform Docs, hämtade 2026-10-14): https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/prompting-claude-fable-5-1 · https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/prompting-claude-fable-5 · https://platform.claude.com/docs/en/build-with-claude/effort
> **Märkning i dokumentet:**
> - 🎥 = beskrivet i videon
> - 🔧 = eget förslag/utfyllnad (inte från videon)
> - ⚠️ = overifierat — kontrollera innan det låses

---

## 1. Mål

Ett autonomt flöde där Claude Code tar en sajt från idé till färdig, granskad webbplats:

```
Intervju → brief.md → Låsta kontroller → Stitch-designer → Bygge → Designgranskning → Animationer → Berättelsegranskning → Kodgranskning → SEO och lanseringskrav → Din slutgranskning → Staging → Publicering → Förvaltning
```

Kärnidén 🎥: **Claude Code styr Stitch via dess CLI** i stället för att människan promptar Stitch. Då kan hela flödet använda skills, en gemensam brief och automatiska granskningssteg — något Stitch inte kan på egen hand.

### Varför det fungerar
| Problem | Lösning i flödet |
|---|---|
| AI-designer ser likadana ut | Stitch (Gemini + bildmodell) ger mer förfinade designer än kodmodellen själv 🎥 |
| Stitch byter stil mellan designer | Alla prompter utgår från samma `brief.md` 🎥 |
| Generatorn ser inte sina egna fel | Separata granskningsskills som jämför mot en referens 🎥 |
| MCP äter kontext | CLI + skill laddas bara när det behövs 🎥 |

---

## 2. Förutsättningar

| Krav | Kommentar |
|---|---|
| Node.js ≥ 20 | Krävs av Stitch-CLI:t ⚠️ (enligt stitchprompt.com) |
| Claude Code | Projektlokala skills i `.claude/skills/` |
| Google-konto | Stitch kräver inloggning via webbläsare 🎥 |
| Headless webbläsare | För skärmdumpar i granskningsstegen — t.ex. Playwright 🔧 |

### Installation ⚠️
Kommandona nedan kommer från stitchprompt.com (länkad i videon), inte från Googles officiella dokumentation. Verifiera med `stitch --help` efter installation.

```bash
npm install -g @google/stitch
stitch login                      # öppnar webbläsare för Google-inloggning
stitch agent-skills add --user    # installerar Stitch-skillen
```

**Fallgrop 🎥:** Skill-installationen lägger inte skillen där Claude Code letar. Skillen måste hamna i projektets `.claude/skills/`, annars laddas den inte automatiskt. Kontrollera efter installation och flytta/ange målmapp vid behov. ⚠️ Exakt flagga för målmapp är okänd — se `stitch agent-skills add --help`.

### Googles officiella Stitch-skills 🎥 (Stitch-skills-videon)
[google-labs-code/stitch-skills](https://github.com/google-labs-code/stitch-skills) innehåller 🎥:
| Skill | Används hos oss 🔧 |
|---|---|
| **Mall för `design.md`**, optimerad för Stitch | Underlag för valideringen av `design.md` i fas 2 |
| **design.md-skill** — tar ut `design.md` ur befintliga Stitch-projekt | Fas 2 |
| **Enhanced Prompt** — gör vaga prompter Stitch-anpassade; *Stitch använder adjektiv för att förstå stämning*, inte exakta beskrivningar | Fas 2: prompterna byggs av **stämningsadjektiv** ur den valda riktningen |
| **Stitch Loop** — bygger en hel sajt självständigt med Chrome DevTools | Referens; vi har vår egen loop med grindar |
| **React Component** / **shadcn** — delar upp Stitchs stora HTML-fil i komponenter med validering via skript | Beror på stackvalet (§14) |
Videon använder Stitch via **MCP** ([davideast/stitch-mcp](https://github.com/davideast/stitch-mcp)) 🎥; vi föredrar **CLI:t** (första videon), som tar mindre kontext. ⚠️ Kontrollera att skillsen fungerar med CLI:t.

### Stitch-CLI — kända kommandon ⚠️
| Kommando | Syfte |
|---|---|
| `stitch create project` | Skapa projekt |
| `stitch generate screen --device DESKTOP\|MOBILE` | Generera skärm |
| `stitch generate variants --creative-range REFINE\|EXPLORE\|REIMAGINE` | Varianter: förfina / närliggande / nytänk |
| `stitch serve` | Förhandsgranska lokalt |

**Verktygsmanifest i stället för gissningar 🎥 idé (Astryx-videon) / 🔧:** Astryx Max-skillen kör designsystemets `manifest`-kommando för att ge modellen en fil över *allt som finns* — alla kommandon och flaggor — så att den inte gissar eller missar sådant den inte visste fanns 🎥. Samma princip för våra CLI:er:
- För varje verktyg (Stitch, GitHub CLI, Vercel CLI, våra egna skript) genereras ett **manifest** ur verktygets egen hjälp (`stitch --help` och varje underkommandos hjälp) och läggs i respektive skill.
- Agenten använder bara kommandon och flaggor som finns i manifestet — från fakta, inte från minnet.
- Manifestet **är verifieringen** av kommandotabellen ovan: när det genererats ersätts ⚠️ med de faktiska kommandona.
- Manifestet genereras om när verktyget uppdateras (en underhållsrutin, fas 8f).

🔧 **Viktigt för oss:** Generera **både DESKTOP och MOBILE** från början. Videons största fel var att Stitch bara designat för dator och sajten gick sönder på mobil.

---

## 3. Projektstruktur 🔧

```
ai-webbyggare/
├── CLAUDE.md                     # Flödesregler, faser, pekare till skills (rot-filen, helst under ~300 rader, §8.7)
├── .agentignore / .gitignore     # 🔧 det agenterna aldrig ska läsa eller röra (§7.3)
├── plugin/                       # 🔧 byggsystemet paketerat som versionerat plugin (§8.8)
├── IMPLEMENTERINGSGUIDE.md       # Detta dokument
├── arbetssatt.md                 # 🔧 "Hur vi arbetar" — enda filen auto loopen får skriva om (§10.5)
├── scripts/
│   └── godkann-kontroller.mjs    # 🎥 idé (approve checks), 🔧 låser kontroller (§10.2)
├── .claude/
│   ├── settings.json             # 🔧 hooks + permissions (§7)
│   ├── aktiv-sajt                # 🔧 namnet på sajten som byggs just nu (§7.2)
│   ├── hooks/
│   │   ├── grind-stopp.mjs       # 🔧 Stop-hook: grindkontroll
│   │   └── skydd.mjs             # 🔧 PreToolUse-hook: farliga åtgärder
│   ├── skills/
│   │   ├── stitch/               # 🎥 installeras via Stitch-CLI
│   │   ├── scrollytelling/       # 🎥 tredjepart (se §12)
│   │   ├── brief-interview/      # 🔧 fas 1
│   │   ├── write-checks/         # 🎥 idé, 🔧 körbara tester före bygget (§10.3)
│   │   ├── auto-loop/            # 🎥 idé, 🔧 förbättrar arbetssatt.md mellan sajter (§10.5)
│   │   ├── stitch-review/        # 🎥 idé, 🔧 vår egen implementation
│   │   └── story-review/         # 🎥 idé, 🔧 vår egen implementation
│   ├── commands/
│   │   └── bygg-sajt.md          # 🔧 orkestrerar hela flödet
│   └── mods/                     # ⚠️ placering okänd — se §6
│       ├── flodespanel/          # 🔧 fas, grindar, granskningar
│       └── antaganden/           # 🎥 idé (Assumption Check), 🔧 vår variant
├── kunskap/                      # 🔒 kurerad kunskapsbas med källor (§11)
│   ├── raw/                      # råmaterial som aldrig rörs (videotranskript, dokument)
│   └── wiki/                     # kompilerad wiki: index, logg, källsidor, regler med citat (§11.6)
├── evals/                        # 🔧 testsvit för flödet (§9)
│   ├── briefs/                   # fasta testbriefs
│   ├── kor-eval.mjs              # kör flödet obevakat per brief
│   └── resultat/                 # en rad per körning: version, mått, kostnad
└── sites/<sajtnamn>/
    ├── brief.md                  # Enda källan till sanning
    ├── design.md                 # 🎥 Stitch-skillens färger/typsnitt
    ├── state.json                # 🔧 fas, iterationer, beslut
    ├── kontroller/               # 🔒 låsta körbara tester (§10.2)
    ├── checkpoints.json          # 🎥 idé (Shopify), 🔧 delar av fas 3, enklast först
    ├── overlamning/              # 🔧 ett överlämningsdokument per checkpoint (fas 3)
    ├── design.functional.md      # 🔒 klickbara delar och tillstånd (fas 1b)
    ├── beslutskarta.md           # 🔧 alla beslut i fas 1 med motivering
    ├── fakta/                    # 🔧 kundens faktabas, ett faktum per fil (§11.8)
    ├── befintlig/                # 🔧 fångad befintlig sajt och URL-inventering (fas 0b)
    ├── CLAUDE.md                 # 🔧 bara sajtspecifikt; laddas bara när agenten arbetar här (§8.7)
    ├── resultat.jsonl            # 🔧 en rad per runda (§10.4)
    ├── forvaltning/              # 🔧 rapporter från schemalagda kontroller (fas 8)
    ├── andringar/                # 🔧 ändringsbriefs efter lansering (fas 8)
    ├── designs/                  # nedladdade Stitch-skärmar (HTML + bild)
    ├── reviews/                  # granskningsrapporter per runda
    └── src/                      # själva sajten
```

---

## 4. Flödet steg för steg

Varje fas har: **input → åtgärd → output → grind** (villkor för att gå vidare).

### Fas 0 — Setup
- **Input:** tomt projekt
- **Åtgärd:** installera Stitch-CLI, logga in, installera `stitch`- och `scrollytelling`-skills i `.claude/skills/`
- **Grind:** `stitch --help` fungerar, båda skills syns för Claude, inloggning giltig

**Onboarding per kund — människans klick 📄 ("Websites for Normal People") / 🔧:** principen i dokumentet: *agenten gör allt; människan agerar bara där ett företag kräver en människa* 📄 — **betala**, **godkänna villkor** och **bevisa identitet** (inloggning, auktoriseringsklick). Allt annat — DNS, databaser, e-postautentisering, analysuppsättning — är agentens uppgifter. Dokumentet räknar 14 sådana klick 📄. Hos oss blir det en **checklista per kund** i `sites/<namn>/onboarding.md`, t.ex.:
- domän (köp eller tillgång till kundens befintliga), hosting-konto, e-postdomän
- Google-konto för Search Console, GA4 (villkor), ev. Tag Manager och Business Profile (fas 8g)
- formulärtjänst och eventuell betalning (villkor, verifiering)
- personuppgiftsbiträdesavtal med kunden (§11.10)
- **kundavtal:** ansvar, förvaltningens omfattning, vad som händer vid fel (§5.4, trappan)
- **starka lösenord och tvåfaktorsautentisering** på alla konton — hosting, GitHub, domänregistrator, Cloudflare, Google 🎥 (Ebbelaar-intervjun)
Varje punkt är ett `blocked` med en tydlig instruktion; resten gör agenten.

### Fas 0b — Befintlig sajt (vid ombyggnad) 🎥 idé (kloningsdelen i "4 Ways"-videon) / 🔧
Guiden har hittills förutsatt **nybygge**. Många kunder har redan en sajt — och en ombyggnad har problem som ett nybygge saknar. Fasen körs före intervjun när kunden har en befintlig sajt.

**1. Fånga sajten.** Videon fångar en sida med HTML, CSS och bilder med CLI-verktyget **SingleFile**, och hittar övriga sidor via **`sitemap.xml`** 🎥. Sidor bakom inloggning fångas med noggranna skärmdumpar av varje tillstånd 🎥. Resultatet sparas i `sites/<namn>/befintlig/`. ⚠️ Verifiera SingleFile CLI:s kommandon via verktygsmanifest (§2).

**1b. Integrationer, spårare och formulärmottagare 🎥 idé (REA, Nate Herk-videon) / 🔧:** SingleFile och Firecrawl fångar *innehållet*; en analys av sidans **skript och nätverksanrop** visar det som annars upptäcks *efter* lanseringen:
- **Integrationer som måste följa med** — bokningswidget, chatt, betalning, nyhetsbrev. Missas de slutar kundens bokningar fungera.
- **Var formuläret faktiskt skickar sina data.**
- **Vilka spårare och tredjepartstjänster som laddas**, och om det sker före samtycke — direkt underlag för samtyckeskontrollen och integritetspolicyn (§11.10).
Verktyg: REA:s webbläge (§11.11) eller Playwright CLI:s nätverksfångst. Allt förs in i `befintlig/integrationer.md` med märkningen *sett / härlett / okänt* (§11.11).

**2. Innehåll till faktabasen.** Texter, tjänster, öppettider, kontaktuppgifter och bilder hämtas ur den fångade sajten och förs in i **faktabasen** (§11.8) som förslag — **kunden bekräftar** varje faktum i fas 1, eftersom gammalt innehåll kan vara inaktuellt. Varje förslag märks *sett* (med var på sajten) eller *härlett*; bara *sett* går vidare som förslag till kunden. Bilder följer bildstrategin (§11.9): källa och licens ska vara kända.

**3. URL-inventering och omdirigeringar ⚠️.** Den gamla sajten har sidor som sökmotorer känner till; försvinner adresserna tappar kunden synlighet — en ombyggd sajt som ser bättre ut men förlorar sina placeringar har *förlorat* kunden pengar.
- Alla gamla URL:er inventeras (sitemap + crawl) i `befintlig/urler.md`.
- Varje gammal URL får en **301-omdirigering** till sin nya motsvarighet, eller ett medvetet beslut i beslutskartan om att den ska bort.
- **Låst kontroll i fas 7:** ingen gammal URL ger 404.

**4. Före-mått.** Den befintliga sajtens prestanda, förfrågningar och konverteringar mäts *innan* vi bygger om — jämförelsepunkten för värdet för kunden (fas 8a) och **baslinjen för nordstjärnan** i briefen. Analysen visar också **var besökare faller bort** (sidor de lämnar, formulär som inte skickas) — underlag till frågan om stoppet eller läckan i intervjun.

**4b. Behålla kundens visuella identitet 🎥 (Stitch-skills-videon) / 🔧:** vill kunden behålla sin identitet kan Stitch **importera designsystemet från en URL** — den läser av sajten och tar fram stil och typografi som `design.md` 🎥. Det blir utgångspunkten för fas 2. Gäller **bara kundens egen sajt**.

**5. Vad fungerar?** Intervjun (fas 1) frågar vad i den gamla sajten som fungerar och bör behållas — innehåll, struktur, formulär, adresser.

**Regler:**
- Vi fångar **bara kundens egen sajt** — aldrig någon annans. Att klona andras sajter bryter mot upphovsrätt och mot originalitetskontrollen (fas 4).
- Den fångade sajten är **extern text** (§7.3): underlag, aldrig instruktioner.
- Kundens egen sajt får analyseras fullt ut — även skript och nätverk (§11.11).

### Fas 1 — Intervju → `brief.md` 🎥
- **Åtgärd:** Claude intervjuar användaren tills inget är oklart. Varje fråga har **färdiga svarsalternativ** (passar `AskUserQuestion`).
- **Självintervju först 🎥 (Ouroboros, repo-videon) / 🔧 variant:** innan du får några frågor tar Claude fram alla frågor om sajten och besvarar själv dem som går att härleda ur det du redan sagt.
  - **Du tillfrågas bara** om beslut som ändrar *vad sajten är*: syfte, målgrupp, berättelse, primär handling, bransch, innehåll som bara du har.
  - **Claude avgör själv** små detaljer som är lätta att ändra senare och ligger inom det du bett om — och loggar varje sådant val som antagande (§6.5), så att du ser vad som bestämts.
  - Ger en kortare intervju utan att du tappar kontrollen.
- **Svar från utredningar märks *sett / härlett / okänt*** (§11.11). Bara *sett* räknas som besvarat; ett *härlett* svar går till domaren (§5.3) eller dig och byggs aldrig på som fakta.
- **Dimma → utredning, inte gissning 🎥 (Wayfinder, gauntlet-videon) / 🔧:** utöver det Claude kan härleda och det du måste svara på finns en tredje kategori: frågor som **varken du eller Claude kan svara på ännu**, för att något inte är utrett. Wayfinder kallar det *dimman* — agenten fyller annars luckan med ett eget antagande och planerar vidare som om saken var avgjord 🎥.
  - Exempel: *går kundens bokningssystem att bädda in?*, *vilken formulärtjänst klarar kraven?*, *finns bilderna i tillräcklig upplösning?*
  - Varje sådan fråga blir en **utredningsuppgift** innan briefen godkänns: läsa dokumentation, bygga en grov prototyp, eller göra en verklig uppgift som att registrera ett testkonto för att kunna bedöma en tjänst 🎥. Svaret förs in och låser upp de beslut som väntade på det. Större utredningar och branschresearch kan använda Claude Codes inbyggda arbetsflöde för **djupresearch** (fem faser) 🎥 (OS-videon) — källorna behandlas som extern text (§7.3).
  - Frågor som kräver kunden (t.ex. inloggning hos kundens leverantör) blir `blocked` med en tydlig fråga — inte en gissning.
- **Beslutskarta 🎥 (Wayfinder) / 🔧:** varje beslut i fas 1 sparas med **motivering** i `sites/<namn>/beslutskarta.md`. Den används i förvaltningen (fas 8) när någon frågar *varför* sajten ser ut som den gör, och av auto loopen (§10.5) för att se vilka beslut som ledde till fel. Besluten hänvisar till källor i kunskapsbasen (§11).
- **Bygga eller använda befintligt:** funktioner i briefen (bokning, chatt, betalning m.m.) utreds först mot befintliga tjänster, med kostnad i tre lägen — se §11.5.
- **Stoppet eller läckan — inte bara beställningen 🎥 (5000-timmarsvideon) / 🔧:** *det kunden ber om är nästan aldrig den verkliga begränsningen* 🎥. Kunden säger "vi behöver en ny hemsida", men problemet kan vara att förfrågningar försvinner, att ingen svarar i tid eller att telefonnumret inte syns på mobilen. Intervjun börjar därför med **"Var tappar ni kunder i dag?"** och följer kundens väg från första kontakt till affär. Svaret avgör den primära handlingen och nordstjärnan (nedan). Vid ombyggnad stöds det av fas 0b, steg 4.
- **Processen bakom den primära handlingen 🎥 (FDE-videon) / 🔧:** en sajt konverterar inte bättre än det som händer *efter* klicket. Intervjun frågar därför också:
  - Vem tar emot formuläret eller bokningen, och hur snabbt svarar de?
  - Vilket system används idag (bokningssystem, CRM, e-post, telefon)? **Bygg på det kunden redan använder** och ändra inte deras arbetssätt mer än nödvändigt 🎥 — en ny tjänst som ingen hos kunden tar till sig ger ingen effekt.
  - **Finns det oskrivna regler?** Videons exempel: en AI-agent följde den skrivna återbetalningspolicyn perfekt men företaget förlorade lojala kunder, eftersom den som tidigare gjorde jobbet hade en oskriven regel — allt som betalats med företagskort godkändes 🎥. För en sajt kan det vara "vi tar inte uppdrag under X kr" eller "stamkunder ringer direkt". Fråga *varför* varje steg finns.
  - Svaren förs in i briefen och beslutskartan; okända svar blir dimma-frågor till kunden.
- **Frågeområden 🎥:** vilken berättelse sajten ska berätta, hur den ska kännas, vad den egentligen är till för.
- **Frågeområden 🔧 (tillägg):** **bransch** (styr Inspos filter, se fas 1b), målgrupp, primär handling (CTA), innehåll/texter som finns, tonläge, referenssajter, *anti-referenser*, ljust eller mörkt tema, enhetsfördelning (mobil/dator), tillgänglighetskrav, tekniska ramar.
- **Referenser som bild eller video 🎥 (designskills-videon) / 🔧:** kunden kan ge referenser som skärmdumpar eller som en **skärminspelning** av en sajt hen gillar. Meng Tos skill *video to super prompt* gör en inspelning till en prompt 🎥. Referenserna sparas i `sites/<namn>/referenser/` och används i fas 1b (Tastemaker) och fas 2.
- **Bilder 🔧:** intervjun frågar vilka bilder kunden har (foton av personal, lokaler, produkter, arbeten) och vad som saknas. Bildstrategin i §11.9 avgör sedan källa per bild.
- **Output — struktur för `brief.md`:**
  1. Kort sammanfattning (3–5 meningar) 🎥
  2. Berättelsen steg för steg — kapitel i scrollordning 🎥
  3. Känsla & visuell riktning 🔧
  4. Målgrupp & primär handling 🔧
  4b. **Nordstjärna 🎥 (5000-timmarsvideon) / 🔧:** *ett* mått med **baslinje, mål och tidsram**, t.ex. *"från 5 till 15 förfrågningar i veckan inom två månader"*, som **kunden godkänner** innan bygget 🎥. Det är projektets mållinje i affärstermer — motsvarigheten till acceptanskriterierna — och det förvaltningsrapporten följer (fas 8a). Baslinjen kommer från fas 0b, steg 4, eller från kundens egna siffror; saknas den mäts den första månaden efter lansering.
  5. Innehåll per kapitel 🔧
  6. Krav: responsivitet, tillgänglighet, prestanda 🔧
  7. Acceptanskriterier — det granskarna mäter mot 🔧
- **Grind:** briefen är komplett. **Godkännandet sker tillsammans med kontrollerna i slutet av fas 1b** (Shopify-videon 🎥: flödet stannar bara två gånger för dig).

**Promptmall 🎥:**
> Jag vill bygga [beskrivning]. Intervjua mig om sajten. Fortsätt ställa frågor tills du helt förstår idén och inte har något kvar att fråga. Ge några svarsalternativ för varje fråga. Skriv sedan allt till `brief.md`.

### Fas 1b — Låsta kontroller 🎥 idé / 🔧 variant
- **Åtgärd:** `write-checks` gör om briefens mätbara acceptanskriterier till körbara tester. Detaljer i §10.3.
- **⚠️ Är planeringen för tung? 🎥 (Ebbelaar-intervjun):** Dave Ebbelaar: *för ett år sedan var specdriven utveckling standard, men allt eftersom modellerna blir bättre blir planeringen mindre viktig* — han bygger direkt, *ser* resultatet och reagerar, och menar att även Anthropic-ingenjörer sagt att plan mode knappt behövs 🎥. Hans skäl: *man kan inte ge bra feedback förrän man ser resultatet* 🎥. 🔧 Vår bedömning:
  - Vår planering finns inte främst för att *modellen* behöver en plan, utan för att vi kör **utan att du tittar**: grindar, fakta och kontroller måste finnas *innan* bygget — liksom juridik och kundens godkännande.
  - Men delar som beskriver *hur* modellen ska bygga kan vara överflödiga (jfr *vad men inte hur*, §12). Och Daves skäl talar för att **få fram något synligt tidigt** — prototyplänken och wireframes prioriteras framför längre specifikationer.
  - **Avgörs med eval (§9.2):** samma testbriefs körs med full fas 1b och med en **smal variant** (bara syfte, fakta, kontroller och en prototyp); resultat, rundor och kostnad jämförs.
- **Spritt pass för kantfall 🎥 (ADHD-videon) / 🔧:** agenter hoppar över kantfall och prestandavägar 🎥. Innan kontrollerna visas för dig kör isolerade agenter — var och en med **ett** perspektiv och utan att se de andras resultat — ett pass var: långa texter och tomma tillstånd · långsamt nät · skärmläsare och tangentbord · ovanliga skärmbredder · felaktig inmatning i formulär · reducerad rörelse · **innehåll i värsta fall** (Emils skill `break-ui` 📄: extremt långa namn, saknade bilder, tomma listor). En kritiker sållar förslagen; de som håller blir kontroller du godkänner i stopp 1. (Se §11.7 för metoden.)
- **Planvy 🎥 idé / 🔧 variant:** orkestreraren öppnar en lokal webbsida som visar **briefen, kapitlen, checkpoints för fas 3 och varje kontroll i en mening** — i enkelt språk, inte som JSON. Shopify-videon 🎥 byggde en sådan vy eftersom en planfil är svår för en människa att läsa.
- **Tre designriktningar med Inspo 🎥 (Inspo-videon) / 🔧 variant:** innan planvyn öppnas skickar orkestreraren briefen till Inspos `recommend` med **branschfilter** och tema från briefen. Planvyn visar **tre riktningar**, var och en med skärmdumpar från riktiga sajter (dator + mobil), föreslagen palett och typiska komponenter. Du väljer riktning i samma stopp.
  - **Gallerivy 🎥 ("4 Ways"-videon):** alla varianter — riktningar här, wireframes i fas 2, versioner i Variate (§6.8) — öppnas **sida vid sida i en vy** i stället för att försvinna bland filer 🎥. Med `design.md` på plats håller varianterna samma visuella språk medan de prövar olika upplägg 🎥.
  - **Riktningarna måste verkligen skilja sig 🎥 (ADHD-videon) / 🔧:** ber man en agent om varianter i samma kontext får man *samma idé formulerad på fem sätt* 🎥 — och då är ditt val inget riktigt val. Riktningarna tas därför fram av **isolerade agenter med olika vinklar** (t.ex. minimalistisk, redaktionell, filmisk — valda utifrån briefen). En kritiker poängsätter varje riktning på **nyhet, genomförbarhet och passform** mot briefen och **kontrollerar att de skiljer sig**; för lika riktningar ersätts. Se §11.7.
  - Detta är i praktiken videons *Design Picker*-mod (§6.6) utan att någon mod behöver byggas.
  - Agenten studerar bara ett fåtal referenser i detalj — varje extra sökning kostar kontext 🎥.
  - Den valda riktningens referens-URL:er sparas i `state.json` → `referenser` (används i fas 4).
  - **Exakta värden ur referensbilder 🎥 (Tastemaker, designskills-videon):** när en riktning valts — eller kunden lämnat egna referensbilder — plockar [Tastemaker](https://github.com/codeswithroh/tastemaker) ut de exakta designvärdena ur **pixlarna** med skript och sparar dem strukturerat, i stället för att modellen gör en textsammanfattning där detaljer går förlorade 🎥. Värdena blir underlag för `design.md` i fas 2. ⚠️
  - Se även Inspo i §12.
- **Täckningstabell 🔧** (mot *tyst nedskärning*, Unlazy-videon 🎥: agenten bygger de lätta delarna, hoppar över den svåra och nämner det inte): planvyn visar en tabell där **varje del av briefen** — varje kapitel, innehållselement, den primära handlingen, varje krav — kopplas till minst en låst kontroll eller ett granskningskriterium. En del utan koppling markeras rött. Det vi inte kontrollerar märks inte när det saknas — därför ska luckan synas *innan* bygget börjar.
- **Funktionsspecifikation `design.functional.md` 🎥 (loop-nivåvideon) / 🔧:** `design.md` beskriver bara *utseende*, och Stitch-exporten är statisk. Därför skrivs i fas 1b en specifikation för **alla klickbara delar och deras tillstånd**: meny öppen/stängd, formulär oskickat/skickat/fel, valideringsmeddelanden, hover och fokus, laddningstillstånd, tomma tillstånd. Den blir beteendegranskarens facit (fas 4) och låses tillsammans med kontrollerna (§10.1). Utan den *gissar* granskaren vad som är rätt beteende.
- **Prototyplänk i mobilen 🎥 (loop-nivåvideon, *mobile preview*) / 🔧:** planvyn och en klickbar prototyp (Stitch-exporten + tillstånden ur `design.functional.md`) kan läggas upp som en förhandsvisningslänk, så att du kan klicka igenom den i telefonen — och **så att kunden kan godkänna prototypen innan något byggs**, det billigaste stället att fånga missförstånd.
  - ⚠️ Länkarna innehåller kundens opublicerade innehåll: skydda dem (lösenord eller åtkomstskydd, `noindex`), ge dem kort livslängd och ta bort dem efter godkännandet.
  - Kundens godkännande ersätter inte ditt — stopp 1 är fortfarande ditt beslut.
- **Adversarial granskning av planen 🎥 idé (Buzz-videon) / 🔧:** vi granskar koden adversarialt (fas 6b) men har hittills skickat planen rakt till dig. Täckningstabellen visar *om* varje del av briefen har en kontroll — inte om briefen själv har motsägelser, luckor eller orealistiska krav. Och en motsägelse i briefen klarar varje grind, eftersom grindarna mäter mot briefen.
  - En **angripare** med ny kontext utgår från att planen är fel och angriper den: motsägelser i briefen, kontroller som inte mäter det de påstår, checkpoints i fel ordning eller med fel beroenden, dimma som inte är utredd, krav som inte går att uppfylla.
  - **Orkestreraren försvarar** punkt för punkt och åtgärdar det som håller. Angriparen ser svaren och kan svara igen; max 3 omgångar.
  - **Kvarstående oenigheter** visas i planvyn som en egen lista — det är precis de punkter som kräver ditt beslut i stopp 1.
  - Videons bästa exempel: GPT fick anta att kravdokumentet var fel och angripa det medan Claude försvarade det, i en tråd båda såg 🎥.
  - **Tillval — annan modell som angripare:** två modeller har olika blinda fläckar; alla våra granskare är annars Claude. Kan göras via det officiella Codex-pluginet i Claude Code som videon nämner 🎥. ⚠️ Innebär ytterligare en leverantör, kostnad och att planen (med kundens innehåll) skickas dit — prövas med Caliper (§9.5) och kräver kundens samtycke.
- **🛑 Stopp 1 av 2:** du godkänner brief, kontroller, täckning och funktionsspecifikation **i ett steg** — med kvarstående oenigheter från den adversariala granskningen synliga — eller ber om ändringar. Därefter låser `godkann-kontroller.mjs` och committar.
- **Grind:** brief och kontroller godkända och låsta. Kontrollerna *ska* fallera nu — sajten finns ännu inte.

### Fas 2 — Designer i Stitch 🎥
- **Åtgärd:** Claude laddar Stitch-skillen, skapar projekt, skickar briefen, ber om flera varianter och **granskar varje variant mot briefen**. Vid fel promptas Stitch igen.
- 🎥 I videon blev det 8 varianter innan designen var tillräckligt bra. Steget tar lång tid.
- **Wireframes först 🎥 (Claude Design-videon) / 🔧:** att generera full design direkt betyder lång väntan och en fullständig omgörning om layouten är fel 🎥. Fasen börjar därför med **wireframes**: flera layoutvarianter i låg detaljnivå, i dator- och mobilbredd, utifrån den valda riktningen från fas 1b. Bästa wireframe väljs (av granskaren mot briefen, eller av dig om designvalet inte är automatiserat, §5.4) — först därefter genereras full design, och bara för den valda layouten, med samma layout, avstånd och hierarki. ⚠️ Kontrollera hur wireframes bäst tas fram med Stitch-CLI:t. **Layoutvarianterna tas fram med samma spridda metod som riktningarna** (§11.7), så att de skiljer sig på riktigt.
- 🔧 **Strategi för varianter:** börja med `EXPLORE` för bredd → välj bästa → `REFINE` för att rätta fel. `REIMAGINE` bara om ingen variant är nära.
- 🔧 **Generera DESKTOP + MOBILE** för varje vald design.
- 🔧 **Tak:** max N varianter (förslag: 10) — därefter eskalera till människan med de 2–3 bästa.
- **Output:** vald design i Stitch-projektet + `design.md` (färger/typsnitt, synkas av Stitch-skillen 🎥)
- **Modellernas standardval 🎥 (Opus 5.5-videon):** designskills ändrar layout, men modellen faller tillbaka på sina egna färger och typsnitt — Opus väljer enligt videon nästan alltid varma krämfärger eller benvitt. Det är `design.md` som styr färger, typsnitt och avstånd.
- 🔧 **`design.md` låses** (§10.1) när du godkänt designen. Annars kan byggaren långsamt glida tillbaka mot modellens standardval i senare faser.
- 🔧 **Tillval — Hallmark:** lägg till Hallmark-skillens regler mot "AI-utseende" i Stitch-prompterna (§12).
- 🔧 **Alternativ källa för `design.md` 🎥:** Aura.build har ett bibliotek med färdiga `design.md`-filer att utgå från.
- 🔧 **Riktningen från fas 1b styr Stitch:** den valda Inspo-riktningens layout och palett går in i Stitch-prompterna, och referensernas `design.md` (exakta färger, typsnitt, textstorlekar, avstånd 🎥) — eller Tastemakers uttagna värden — blir utgångspunkt för vår `design.md`. Inspo visar *vad som fungerar* på riktiga sajter; Stitch *genererar* en ny design. Eftersom värdena tas ut med skript är de mätbara, och designregelvakten (§7.3) fångar sedan varje avvikelse från dem.
- **Teknikbeskrivningar av beteende 🔧 (§11.11):** det som skiljer en premiumsajt från en generisk är ofta *mekaniken* — fastlåsta sektioner, rörelse kopplad till scrollen, förskjutna starter, kurvor och tider — inte färgerna. En skärmdump visar inget av det, och en video visar bara *att* något rör sig. För en enskild effekt på en referenssajt tas en **teknikbeskrivning** fram — i ord och parametrar, aldrig kod — som går till `design.functional.md` och fas 5. Tastemaker tar fram hur referensen *ser ut*; teknikbeskrivningen hur den *beter sig*.
- **Beskrivningar och värden till generatorn — inte bilder 🎥 (Boris Cherny-videon) / 🔧:** *ger man en agent en inspirationsbild får man nästan en kopia; beskriv i stället* stilen och känslan, så hittar modellen själv vägen dit 🎥. Allt konkret modellen får behandlas som något att kopiera. Därför:
  - **Stitch och byggarna får** en **beskrivning** av riktningen (stil, känsla, layoutprinciper) och de **exakta värdena** ur `design.md` (Tastemaker) — **inte** referensbilderna eller skärmdumparna.
  - **Bilderna går bara till** dig (planvyn, stopp 1) och till **granskarna** (originalitetskontroll i fas 4, blind jämförelse i fas 6).
  - Originalitetskontrollen blir då ett skyddsnät snarare än en ständig rättning.
  - **Stitchs redesign-funktion 🎥 (Stitch-skills-videon) / 🔧:** Stitch kan använda en skärmdump som **stilguide, inte som mall att kopiera** — mönster, placering och designspråk förs över till en egen sajt 🎥. Regeln: **kundens egen sajt** (fas 0b) → redesign med skärmdump är tillåten. **Andras sajter** som referens → beskrivningar och värden gäller fortfarande, och originalitetskontrollen (fas 4) står kvar. Eval får visa om det kan släppas. Gränsen går vid äganderätt, inte vid teknik.
- **Annoteringar i Stitch 🎥 (Stitch-skills-videon):** gör du designvalet själv (t.ex. i pilotfasen, §5.4) kan du markera en del av designen i Stitch, beskriva ändringen och tillämpa den direkt 🎥 — eller ladda upp en skiss eller wireframe — innan `design.md` låses.
- **Prompter till Stitch** byggs med Googles Enhanced Prompt-skill av stämningsadjektiv ur riktningen (§2).
- **Validering av `design.md` 🎥 (Claude Design-videon) / 🔧:** `design.md` är ett format som Google startade 🎥, och filen läses nu maskinellt av designregelvakten (§7.3), Tastemaker-flödet och granskarna. Innan låsning kontrolleras **formatet** med skript (alla obligatoriska delar finns, färgvärden och typsnitt är giltiga och entydiga). En felformaterad fil kan få vakten att släppa igenom fel färger eller stoppa rätt. Skillen [design-md-planner](https://github.com/ailabs-393/design-md-planner) 🎥 validerar mot Googles standard och kan användas här ⚠️.
- **Färger i OKLCH och beräknade kontrastpar 🎥 (designnivå-videon) / 🔧:** färgerna i `design.md` anges i **OKLCH** (ljushet, kroma, nyans) — den beskriver färg så som ögat uppfattar den och ger jämnare övergångar och bättre kontroll över kontrast än RGB/HSL/hex 🎥; hex som reserv. Varje par av text- och bakgrundsfärg som används får ett **beräknat kontrastvärde** i filen. Då kontrolleras WCAG-kontrasten (§11.3) mot själva designsystemet *innan* något byggs, inte först i fas 6b. `design.md` innehåller också en rubrik **Antimönster** (§7.3).
- **Visualisering av `design.md` 🎥 / 🔧:** filen är lätt för en modell att läsa men svår för en människa att föreställa sig 🎥. När den ska godkännas visas den **visuellt** — färgprover, typsnittsexempel, textstorlekar och avstånd — i samma vy (planvyn/förhandsvisningen). Videon använder [designmd.space](https://designmd.space) för detta 🎥 ⚠️.
- **Grind:** designen uppfyller briefens acceptanskriterier för utseende; finns för båda enhetstyperna; `design.md` validerad, godkänd och låst

**Promptmall 🎥:**
> Använd Stitch-skillen. Skapa designer för sajten med `brief.md` som guide. Gör flera olika versioner så att vi kan välja den som ligger närmast. Granska varje design och prompta Stitch igen om du hittar problem.

### Fas 3 — Bygge 🎥
- **Åtgärd:** Claude hämtar varje design via Stitch-CLI (HTML + bild, inkl. bilder och typsnitt) och bygger sajten.
- 🎥 Claude lägger ofta till småanimationer på eget initiativ (t.ex. bilder som zoomar). 🔧 Förbjud det i denna fas — animationer hör till fas 5.
- 🔧 **Stack:** öppet beslut (se §14).
- **Innehåll skilt från design 📄 ("Websites for Normal People"):** texter och data ligger i egna innehållsfiler (markdown/data), inte inbakade i komponenterna — då blir en omdesign en enda prompt utan att innehållet rörs 📄. Hos oss byggs innehållsfilerna ur faktabasen (§11.8).
- **Säkerhetsgrunder för vägarna B–D (med databas och backend) 🎥 (Ebbelaar-intervjun):** databas med **radnivåsäkerhet (RLS)** påslagen (videon rekommenderar Supabase för de flesta); hemligheter i miljövariabler, aldrig i koden; **brandvägg eller IP-vitlista** så att backend och databas bara tar emot anrop från den egna frontenden 🎥. ⚠️ Detaljerna beror på stack och hosting — utreds per sajt.
- **Formulär som inte tappar inskick 📄 ("Websites for Normal People") / 🔧:** formuläret är den primära handlingen; ett tappat inskick är en tappad kund.
  - **Spara först, mejla sedan:** inskicket sparas (databas eller formulärtjänst) *innan* e-post skickas — går e-posten fel finns inskicket kvar 📄.
  - **Spam-skydd** (t.ex. Cloudflare Turnstile 📄 eller motsvarande) — utan att lägga hinder för riktiga besökare.
  - **E-postautentisering:** SPF, DKIM och DMARC för domänen som skickar, så att bekräftelser inte hamnar i skräpposten 📄.
  - Personuppgifter i formuläret hanteras enligt §11.10.
- 🔧 **Bilder:** byggarna använder bara bilder med känd källa och licens enligt bildstrategin (§11.9); alt-texter skrivs samtidigt.
- **Checkpoints 🎥 (Shopify-videon) / 🔧 variant:** bygget delas upp i små delar, sorterade **från enklast till mest komplex** — t.ex. grundlayout och typografi → enkla kapitel → navigering → formulär och primär handling. Varje checkpoint bygger på den förra, så ett felaktigt tidigt beslut upptäcks medan det är litet och billigt att rätta.
  - Planeras i fas 1b och visas i planvyn.
  - Sparas i `sites/<namn>/checkpoints.json` med status per checkpoint, en lista över **tillåtna filer** (§8.6) och **beroenden** (vilka checkpoints som måste vara klara först).
  - Varje checkpoint byggs av en **ny byggagent** med egen kontext och måste klara sina låsta kontroller innan den räknas som klar.
  - **Överlämningsdokument per checkpoint 🎥 (Handoff, fleet-videon) / 🔧:** byggaren får inte orkestrerarens chatt utan ett **kort överlämningsdokument** som *pekar på* befintliga filer i stället för att kopiera in dem 🎥: brief och relevanta kapitel, `design.md`, `design.functional.md`, checkpointens tillåtna filer, **namnen** på kontrollerna som ska gå igenom (inte testkoden, §10.2), beroenden som redan är klara, och vilka skills som ska användas. Sparas i `sites/<namn>/overlamning/<checkpoint>.md`. Agenten börjar ren och fokuserad.
    - **Spanaren skriver dokumentet 🎥 (Goal Buddy-videon) / 🔧:** i stället för orkestreraren skriver en **spanare** — bara läsrätt, låg effort — överlämningsdokumentet. Den kartlägger checkpointens filer, beroenden och utgångsläge och lägger till ett kompakt **bevis-kvitto** (vilka filer finns, vilka kontroller som fallerar nu) 🎥. Billigt, kan inte ändra något, och håller orkestrerarens kontext ren.
  - **Status skrivs bara av orkestreraren 🎥 (Unlazy-videon) / 🔧:** byggaren får **aldrig** sätta status. När byggaren säger att den är klar kör orkestreraren checkpointens kontroller själv och skriver `klar` **tillsammans med bevis** (andra oberoende källan, skills-videon 🎥: *verifiering är inte att Claude läser sitt eget arbete och säger att det ser bra ut* — det kräver bevis utanför utkastet: skärmdump, testresultat, källa; och *din första titt ska vara agentens femte eller sjätte*) (§7.2). Status utan bevis räknas som underkänd.
  - **Storlek 🔧:** Fable-videon 🎥 visar att Fable 5.1 presterar bäst när den får slutföra en hel sak, inte många små steg — vilket krockar med Shopifys uppdelning. Mellanväg: en checkpoint är en **hel meningsfull enhet** (t.ex. ett kapitel eller hela navigeringen), aldrig ett mikrosteg. **Startvärde 🎥 (Unlazy):** varje checkpoint ska motsvara **minst cirka 10 minuters verkligt arbete** — blir delarna mindre är uppdelningen för fin. Eval (§9) justerar gränsen.
  - **Parallellt arbete 🎥 (Unlazy-videon) / 🔧:** Unlazy delade ursprungligen ut en uppgift i taget — efter 3–4 timmar fanns bara en inloggningssida; med tio parallella agenter blev hela appen klar på cirka 2 timmar 🎥. Hos oss: checkpoints vars beroenden är klara och vars **listor över tillåtna filer inte överlappar** körs samtidigt. Typiskt: grundlayouten först (ensam), därefter kapitlen parallellt, sist navigering och formulär. Överlappande fillistor → körs i följd, så att agenterna inte skriver över varandra.
  - **Inga obegränsade agentflottor 🎥 (Boris Cherny-videon) — men avgränsade arbetsflöden är tillåtna 🎥 (OS-videon):** Anthropics Bun-omskrivning med dynamiska arbetsflöden — hundratals agenter i två veckor — kostade cirka 165 000 dollar i API-pris och levererades med 19 trasiga saker som ingen kontroll fångat 🎥. När hundratals agenter går fel förlorar man hela körningen och kan inte se var felet började. Varningen gäller **obegränsade flottor**. Ett **avgränsat** arbetsflöde — fast struktur i kod, strikta scheman, tak för antal agenter, sammanslagning i tur och ordning med kontroller emellan — är tvärtom *mer* förutsägbart än en orkestrerare som bestämmer nästa steg i farten (§5.1). Hos oss: ett fast tak för antal samtidiga agenter (§14), ingen `ultracode` för byggen, och varje agent loggas med roll och startare (§10.4).
  - **Isolering av miljön, inte bara filerna 🎥 (fleet-videon) / 🔧:** listorna över tillåtna filer hindrar att agenter skriver i samma fil, men parallella sessioner krockar även på tre andra sätt 🎥:
    | Krock | Lösning |
    |---|---|
    | **Git-grenar** — en agent byter gren medan en annan skickar upp kod | **En git worktree per parallell checkpoint** — egen gren och egen mapp 🎥. Orkestreraren slår ihop dem **i tur och ordning** och kör de låsta kontrollerna efter *varje* sammanslagning, så att det syns direkt vilken checkpoint som förstörde något. |
    | **Portar** — alla vill starta på `localhost:3000` och stänger av varandra 🎥 | **Fast port per agent**, tilldelad av orkestreraren; förhandsvisningen (§6.3) behåller sin. Agenter får aldrig avsluta andras processer (skyddshooken, §7.3). |
    | **Delade beroenden** — en agent byter ett paket eller ändrar bygget, de andra går sönder utan att veta varför 🎥 | Ändringar i `package.json`, låsfiler och byggkonfiguration görs **bara i grundlayout-checkpointen**, som körs ensam och först. Parallella byggare får inte röra dem — filerna står aldrig i deras listor och skyddshooken blockerar installationskommandon för dem. Behövs ett nytt paket senare blir det en egen serie-checkpoint. |
  - **Full isolering — tillval:** en sandlåda per agent (§7.3) löser alla tre på en gång.
  - **Implementationsalternativ: `/batch` 🎥 (Boris-skills-videon):** Claude Codes inbyggda `/batch` går i plan mode, delar upp arbetet i enheter (nuläge, enheter, tillägg, hur hela flödet verifieras), och startar efter ditt godkännande en agent per enhet — **var och en i en egen worktree** 🎥. Nästan exakt vårt upplägg för den breda delen av fas 3. Sammanslagning i tur och ordning med kontroller emellan, fasta portar och regeln om beroenden måste vi fortfarande styra själva. ⚠️ Pröva mot ett eget arbetsflödesskript (§5.1).
- **Grind:** sajten startar lokalt utan fel; alla checkpoints klara

### Fas 4 — Designgranskning (`stitch-review`) 🎥
Jämför bygget mot Stitch-designen **och** kontrollerar alla skärmstorlekar.
- **Åtgärd 🎥:** hämta originaldesignen från Stitch → ta skärmdumpar i flera bredder → rapport sorterad med värst först → Claude rättar.
- 🎥 Lägg en pekare till skillen och Stitch-projektets id i `CLAUDE.md` så att granskningen vet vilket projekt den ska jämföra mot.
- 🔧 **Bredder:** 375 (mobil), 768 (surfplatta), 1280 och 1920 (dator).
- **Stitch-exporten är prototypen 🔧:** Shopify-videon 🎥 bygger först en HTML-prototyp att jämföra mot. Vi får den från fas 2 — Stitch-exporten (HTML + bild).
- **Två granskare parallellt 🎥:** en för **utseende** (jämför mot prototypen och `design.md`) och en för **beteende** (meny, länkar, formulär, hover, fokus). Orkestreraren slår ihop resultaten till en rapport.
- **Originalitetskontroll 🔧** (idé: Inspo-videon 🎥, där de kontrollerade varje referens manuellt): utseendegranskaren öppnar referens-URL:erna i `state.json` → `referenser` och kontrollerar att ingen sektion är en kopia — inspiration ja, avbild nej. En sektion som är för lik en referens är ett `hög`-fynd.
- **Layout på pixelnivå 🎥 (Jakub Krehels *better layout*, designskills-videon):** utseendegranskaren kontrollerar avstånd, placering och linjering i detalj — i videon fångades att ett datum behövde fler pixlar än det fått, med exakt antal. Sådana fynd är oftast `medel`/`låg` men samlas och rättas i samma runda. Krehels *review*-skill jämför före och efter via Git och pekar ut vilken ändring som förstörde något 🎥 — det har vi redan genom commits per runda och `resultat.jsonl` (§10.4).
- **Perceptionslagar 🎥 (designer-skills):** granskningen tar också med vad ögat ser först, typografi och avstånd utifrån etablerade designlagar ([designer-skills](https://github.com/Owl-Listener/designer-skills): *screen critique*, *perception laws*). Kriterierna läggs in i den låsta granskarskillen (§10.1) — inte som en fristående skill.
- **Beskär och zooma — inte bara helsidesbild 📄 (Anthropic, *Prompting Claude Fable 5.1*) / 🔧:** på täta visuella underlag gör Fable 5.1 sitt bästa arbete när den *iterativt får analysera, beskära och visuellt verifiera* det den ser; ett verktyg som returnerar ett valt område beskuret och förstorat ger det mesta av vinsten 📄 ([crop tool recipe](https://platform.claude.com/cookbook/multimodal-crop-tool)). Utseendegranskaren får därför ett beskärningsverktyg och går **sektion för sektion i full upplösning** — i stället för att bedöma en nedskalad skärmdump av hela sidan, där avstånd och linjering på pixelnivå inte syns.
- **Samma tillstånd före jämförelse 🎥:** prototyp och sajt måste visa samma tillstånd innan de jämförs — t.ex. formulär oskickat, meny stängd. Stitch-exporten är statisk; tillstånd som inte finns i den (öppen meny, skickat formulär, hover) granskas **bara** av beteendegranskaren, aldrig mot prototypen — men **mot `design.functional.md`** (fas 1b), så att även tillstånden har ett facit.
- 🔧 **Allvarlighetsgrader:** `kritisk` (trasigt/oläsligt) · `hög` (tydlig avvikelse från design) · `medel` · `låg`.
- **Fasta fält för varje fynd 🎥 idé (Hermes-loopvideon: *feedbackens kvalitet*) / 🔧:** en byggare kan bara rätta det den förstår; ett vagt fynd ("layouten känns rörig") ger gissningar och fler rundor. Varje fynd i granskarnas JSON — i fas 4, 6 och 6b — har därför:
  ```json
  {"element": "<selektor>", "skarmdump": "reviews/…png", "forvantat": "…", "faktiskt": "…",
   "kriterium": "<id i kunskap/ eller design.functional.md>", "allvar": "hog", "utfall": "fungerar inte",
   "forslag": "…"}
  ```
  Fynd utan element, förväntat/faktiskt eller kriterium räknas som ofullständiga och skickas tillbaka till granskaren — de går inte vidare till byggaren. **Upprätthålls med strikta scheman** när granskningen körs som arbetsflöde (§5.1): granskaren arbetar tills svaret stämmer med schemat 🎥 (OS-videon).
- **Tre utfall per kontrollpunkt 🎥 (Reticle, repo-videon) / 🔧:** `fungerar` · `fungerar inte` · `för lite information`. Granskaren ska inte gissa när underlaget är tunt. `för lite information` är ett eget utfall som orkestreraren måste hantera — t.ex. med nya skärmdumpar, fler tillstånd eller en annan bredd — och räknas aldrig som godkänt i grinden.
- **Grind 🔧:** inga `kritisk`/`hög` kvar. Max 3 rättningsrundor, sedan eskalering.
- **Begränsning 🎥:** granskar bara *utseende*, inte *beteende*.
- 🔧 **Granskningsdjup:** rättningsrundor kan få snabb granskning beroende på ändringens storlek; sista rundan är alltid full (§7.6).
- 🔧 **Tillval — Hallmark-kontroll:** Hallmark kan granska ett befintligt bygge mot sina regler 🎥 och fånga generiska AI-mönster som `stitch-review` inte letar efter. Resultatet förs in i samma rapport med samma allvarlighetsgrader.

### Fas 5 — Scrollanimationer (`scrollytelling`) 🎥
- **Åtgärd:** Claude använder scrollytelling-skillen och gör den statiska sajten rörlig så att berättelsen avslöjas steg för steg.
- 🎥 Exempel ur videon: skakning i starten, stjärnor som drar förbi vid scroll, kapitelmarkör, horisontell tidslinje i en annars vertikal sida.
- 🎥 Eftersom responsiviteten redan är rättad i fas 4 fungerar animationerna även på mobil/surfplatta.
- **Regler från scrollytelling-skillen** (sammanfattning av tredjepartskällan):
  - Berättelsen först — varje animation ska tjäna historien; återhållsamhet före spektakel
  - `prefers-reduced-motion` respekteras — hoppa över animationer helt
  - Animera bara `transform` och `opacity`; sparsamt med `will-change`
  - `svh` i stället för `vh` på mobil
  - Ingen scroll-jacking; högst en diskret parallaxeffekt, med fallback
  - Teknikval: CSS Scroll-Timeline / IntersectionObserver först, GSAP ScrollTrigger för komplexa tidslinjer
- 🔧 **Egen gren 🎥 (Opus 5.5-videon):** fas 5 är det mest riskfyllda steget och görs på en egen Git-gren. Den godkända sajten från fas 4 ligger orörd på huvudgrenen tills fas 6 är godkänd; då slås grenarna ihop. Passar med behåll/ångra i §10.4.
- **Grind:** sajten bygger, inga konsolfel, reduced-motion fungerar

**Alternativ — Scroll World 🎥 (Opus 5.5-videon):** gör sajten till en filmisk 3D-resa där scrollningen för kameran genom AI-genererade videoklipp, ett per steg i berättelsen.
- Skillen planerar klippen själv utifrån briefen och `CLAUDE.md`; frågar om världens utseende och kamerarörelse.
- **Separata mobilklipp** i stället för beskärning av datorversionen. I videon: 9 klipp för dator + 9 för mobil.
- Klippen hämtas från en videotjänst **via MCP**: Higgsfield som standard, Manus som reserv; i videon användes Runway.
- 🔧 Avvägning: mer slagkraftigt resultat, men kostnad per klipp, konto hos en videotjänst och tyngre sidor (prestanda i fas 6).
- 🔧 Valet mellan scrollytelling och Scroll World görs i briefen (fas 1).
- Källa: https://github.com/oso95/scroll-world ⚠️ licens och innehåll ej granskade.

**Alternativ — Scrollcraft 🎥 (Nate Herk-videon):** [Scrollcraft](https://github.com/nateherkai/scroll-craft) ger en scrollmotor och designregler, och har en **inbyggd kontroll som tar skärmdumpar av scrollningen och kontrollerar positioner**, så att fel rättas innan någon påpekar dem 🎥. 🔧 Alternativ till scrollytelling-skillen; kontrollen av positioner är mätbar och kompletterar videogranskningen i fas 6. ⚠️ Videoskaparen marknadsför sitt eget verktyg — prövas med Caliper.

**Variant — rörlig grafik i kod ovanpå video 🎥 (Jack Roberts-videon, *Claude Motion Design*):** genererad video och bilder (t.ex. via Higgsfield) läggs i botten, och **rörlig grafik i kod** — interaktiva sidfötter, en morfande meny, en figur som följer scrollen — läggs ovanpå 🎥. Principer ur videon: *varje rörlig del har ett jobb*, en renderingsfunktion per sektion, och **sömlösa loopar där sista bildrutan är densamma som den första** 🎥.
- 🔧 **X-ray-läge** — en växel som visar vad som är video och vad som är kod 🎥 — är ett bra arbetsverktyg för granskning och bildstrategin (§11.9), men **får aldrig publiceras** (fas 7, punkt 6).
- 🔧 Referenskällor i videon: **Refero** och **Mobbin** 🎥 — samma regler som Inspo: beskrivningar till generatorn, originalitetskontroll.

**Tillval — UI Skills-MCP 🎥 (Inspo-videon):** ett bibliotek med designskills från olika upphovspersoner ([ibelick/ui-skills](https://github.com/ibelick/ui-skills)). Agenten hittar själv de skills som passar prompten. I videon laddades Emil Kowalskis animationsskill och Meng Tos skill för scrollanimationer. 🔧 Kan komplettera scrollytelling-skillen. ⚠️ Skills som laddas automatiskt utanför vår kontroll gör flödet mindre förutsägbart — välj hellre ut specifika skills och lås dem. (Repo-videon 🎥: som MCP finns verktygen alltid i sessionen; från terminalen måste agenten uttryckligen få veta när den ska använda dem.)

**Tillval — 3D-objekt med [img2threejs](https://github.com/img2threejs/img2threejs) 🎥 (repo-videon):** gör om ett objekt på en bild till en 3D-modell i kod, som kan animeras och som besökaren kan interagera med. Byggs stegvis och jämförs mot bilden. 🔧 Passar t.ex. en produktsida. Avvägning: kostar mycket tokens och tar lång tid 🎥; första försöket blir sällan tillräckligt detaljerat. Kräver prestandakontroll i fas 6. ⚠️

**Små interaktioner — eget steg efter scrollanimationerna 🎥 (Emil Kowalskis *Animate*, designskills-videon) / 🔧:**
Scrollytelling berättar historien; små interaktioner gör att sajten *känns* bra att använda. Det är två olika saker, och vi har hittills bara haft det första.
- [Emil Kowalskis Animate](https://github.com/emilkowalski/skills) förfinar animationer på en **redan byggd** sajt: den avgör vad som ska röra sig och vad som inte ska det, och synkar rörelsen med scrollen 🎥.
- På en restaurangsajt i videon gjorde det mest skillnad i de funktionella delarna: återkoppling när formuläret skickas, grafik som dyker upp vid hover 🎥.
- 🔧 Körs **efter** scrollytelling i samma fas, på samma gren. Samma regler gäller: `prefers-reduced-motion`, bara `transform`/`opacity`, ingen överlast — story-review i fas 6 bedömer helheten.
- **Emils animationsregler som mätbara kontroller 📄 ("$10K Website Kit") / 🔧:**
  | Regel 📄 | Kontroll 🔧 |
  |---|---|
  | Ease-out för in- och utgångar | Statisk sökning efter easing-värden |
  | Under 300 ms för små interaktioner | Statisk sökning efter durationer |
  | Knappar skalas till ca 0,97 vid tryck | Statisk sökning |
  | Popup-fönster börjar på 0,9–0,95, aldrig på noll | Statisk sökning |
  | Animationen utgår från klickpunkten | Granskning (beteende) |
  | Inga animationer på element som används ofta | Granskning |
  | Inga studsande eller elastiska kurvor | Statisk sökning (förbjudet antimönster, §7.3) |
  Scrollytelling-animationer får längre durationer — regeln om 300 ms gäller små interaktioner. Emils skills `improve-animations` och `review-animations` 📄 kan användas för granskningen ⚠️.

**Optimering efter animationerna 🎥 (loop-nivåvideon):** tunga animationer (t.ex. med GSAP-skillen) gör sidan långsam. Videon kör en optimeringsskill efteråt som tar tillbaka hastigheten utan att ta bort animationerna 🎥. 🔧 Sista steget i fas 5, innan grinden: optimera, mät prestanda, och behåll bara ändringar som inte försämrar rörelsen (story-review bedömer).
- Emils skill *animation vocabulary* kan användas när du beskriver önskad rörelse: den gör vaga beskrivningar till exakta ord som modellen förstår 🎥.
- ⚠️ Overifierat; Emils samling har 9 skills — välj bara de som behövs (§12).

### Fas 6 — Berättelsegranskning (`story-review`) 🎥
Kontrollerar om sajten faktiskt är **bra**, inte bara korrekt.

**Specialister per aspekt 🎥 (loop-typvideon) / 🔧:** kriterierna nedan har vuxit video för video; i *en* granskare blir bedömningen ytlig på allt. Videon delar en granskning på fyra specialister — fakta, domän, säkerhet och stil — likt Karpathys *LLM Council* 🎥, och Anthropics Bun-omskrivning använde åtta granskare som letade efter *en sorts* fel var (Boris Cherny-videon 🎥). Fas 6 körs därför som fyra specialister, var och en med ny kontext, smala kriterier och utan att se de andras resultat:
| Specialist | Bedömer | Underlag |
|---|---|---|
| **Berättelse och tempo** | Flöde mellan kapitlen, animationer som tjänar historien, tempo, överlast, **sömlösa loopar** (inget hack där sista bildrutan möter den första — syns bara på video) | Video eller bildsekvenser av scrollningen |
| **Fakta och språk** | Faktapåståenden mot faktabasen, tillgjord prosa, läsbarhet, **AI-signaturer i texten** (enligt Wikipedia-guiden i `kunskap/`, §11.3) | Sajtens texter + faktabasen |
| **Konvertering** | Primär handling, perceptionslagar, Awwwards-kriterier | Skärmdumpar i alla bredder + briefen |
| **Jämförelse** | Blind jämförelse mot referenser | Sektioner utan etiketter |

Orkestreraren avslutar med frågan **vilket perspektiv saknas?** (§11.12) 🎥 (STORM-videon).

Orkestreraren slår ihop resultaten till `story-review-<runda>.json`. Två sätt att använda flera granskare kombineras: **specialister per aspekt** fångar fler *sorters* fel; **flera oberoende granskare med samma kriterier** (§11.4) fångar fler fel *av samma sort* — det senare kan köras inom en specialist som behöver det.
- **Kriterier 🎥:** berättelsen flyter mellan kapitlen · varje animation hjälper berättelsen · tempot vid scroll · texterna läses bra · allt bedöms mot `brief.md`
- **Ton 🎥:** sträng — bedöm som en jury för webbdesignpriser.
- **Output 🎥:** per kapitel: *fungerar* / *behöver arbete* + problem sorterade efter allvar.
- 🔧 **Tredje utfall:** även här kan ett kapitel få `för lite information` (se fas 4). Det räknas aldrig som *fungerar*.
- 🎥 Exempel: stjärnorna blev för många vid snabb scroll → färre stjärnor, mjukare animationer.
- 🔧 **Tillägg:** mät även prestanda (bildfrekvens vid scroll, CLS) och testa snabb scroll uttryckligen.
- **Video i stället för skärmdumpar för rörelse 🎥 (loop-nivåvideon) / 🔧:** *en skärmdump fångar bara ett ögonblick*. I videon körde loopen 38 minuter utan tillsyn men missade en maskot som blinkade fel — tiden mellan blinkningarna var för kort för två skärmdumpar 🎥. Story-review bedömer just tempo, ryck och överlast, och det går inte att se på stillbilder.
  - Granskaren får **videoinspelningar** (t.ex. Playwrights videoinspelning) eller **täta bildsekvenser** av scrollningen — i normal och snabb takt, i dator- och mobilbredd, och med `prefers-reduced-motion`.
  - Det som ändå undgår automatiken (t.ex. exakt tajming i små animationer) fångas i ditt stopp 2 — granskaren markerar sådana kapitel med `för lite information` (fas 4) i stället för att gissa.
- 🔧 **Faktakontroll:** varje faktapåstående i sajtens texter (årtal, siffror, priser, utmärkelser, kundnamn, citat, öppettider) ska finnas i **kundens faktabas** (§11.8). Påstående som saknas där = `kritisk`. Bakgrund: modeller hittar på svar när de inte vet (§8.6). **Gäller även bilder:** en genererad bild som föreställer verkliga personer, lokaler, produkter eller resultat som om de vore äkta är ett påhittat faktum = `kritisk` (§11.9).
- 🔧 **Språk:** ingen tillgjord prosa — krystade fraser, metaforer i stället för klartext, långa meningar utan styckebrytningar (§8.6).
- **Text som inte låter AI-genererad 🎥 (Nate Herk-videon):** [Humanizer](https://github.com/blader/humanizer) gör om text så att den slutar låta som AI, utan att ändra innehållet — den bygger på Wikipedia-redaktörernas guide för att känna igen AI-text 🎥. 🔧 Tillval för texterna i fas 3 (efter faktakontrollen, så att inga fakta ändras); guiden används som källa för språkspecialistens kriterier (§11.3). Ändrade texter körs genom faktakontrollen igen. ⚠️ Prövas med Caliper (§9.5); texterna är svenska — kontrollera att mönstren gäller.
- **Primär handling 🎥 (Landing Page Design-skillen, designskills-videon) / 🔧:** en landningssida är inte en startsida — den har *ett* jobb: få besökaren att agera, och hela sidan byggs kring den handlingen 🎥. Nytt kriterium per kapitel: *drar det här kapitlet mot den primära handlingen i briefen, eller distraherar det?* Plus perceptionslagarna (fas 4): *är den primära handlingen det ögat ser först där den ska synas?* Hittills testades handlingen bara tekniskt (§10.3) — nu bedöms också om designen leder dit.
  - **⚠️ Lekfulla hinder:** Jack Roberts-videon visar t.ex. att besökaren måste *vinna ett spel för att få lämna sin e-post* 🎥. Varje extra steg före den primära handlingen är ett hinder — konverteringsspecialisten flaggar sådant som `hög`, oavsett hur roligt det är.
- **Awwwards-kriterier 🎥 (Meng To):** story-review bedömer redan som en jury för webbdesignpriser. Meng Tos skill *Awwwards quality sites* listar principer och tekniker från vinnande sajter 🎥 och kan ge juryn konkreta kriterier — läggs i den låsta granskarskillen, inte som fristående skill. ⚠️
- **Heuristisk utvärdering med 3–5 oberoende granskare 🔧 (§11.4):** kriterierna (Nielsens heuristiker, perceptionslagar, primär handling m.m.) har källhänvisningar till `kunskap/`. Fynd som flera granskare hittat oberoende väger tyngre.
- **Blind jämförelse mot referenser 🎥 (gauntlet-videon) / 🔧:** gauntlet-loopens kritiker jämförde spelet **blint** med Call of Duty — utan att veta vilket som var vilket — och valde det bättre 🎥. Videon påpekar att metoden fungerar just där det finns något att jämföra med, som en landningssida 🎥 — och det har vi alltid: Inspo-riktningen och kundens referenssajter (fas 1b).
  - En separat granskare får **vår sektion och en referenssektion av samma typ** (hjälteyta mot hjälteyta, prissektion mot prissektion), utan etiketter och i slumpad ordning, och väljer den bättre med motivering. Görs i dator- och mobilbredd.
  - Förlorar vår sektion → `hög`-fynd med granskarens motivering som underlag för rättningen.
  - Gör designkvalitet — tidigare vår mest subjektiva grind — till en jämförelse med ett tydligt utfall.
  - **Motvikt:** originalitetskontrollen (fas 4) hindrar att "vinna" genom att kopiera referensen.
  - ⚠️ Kräver att referensen inte känns igen (granskaren ska inte kunna se varumärken eller adresser) — beskär eller dölj sådant.
- 🔧 **Granskningsdjup:** som i fas 4 (§7.6).
- **Grind 🔧:** alla kapitel *fungerar*, inga `kritisk`/`hög`. Max 3 rundor.

### Fas 6b — Kodgranskning (adversarial) 🎥 idé / 🔧 variant
Grindarna i fas 4–6 kontrollerar utseende, beteende och berättelse — men ingen granskar **koden**. En sajt kan se rätt ut och fungera medan koden har brister som syns först senare.

- **Shopify 🎥:** två agenter granskar koden mot en nedskriven standard; båda måste godkänna. **Videons variant 🎥:** en **kritiker** som utgår från att koden är fel och letar problem, och en **rättare** som åtgärdar dem. De växlar tills kritikern godkänner.
- **Vår variant 🔧:** kritiker + rättare, båda som delagenter med ny kontext. Kritikern ser bara koden, briefen och standarden — inte byggarens logg (§5.2).
- **Mätbar första sållning 🎥 (Anti-Slop, repo-videon) / 🔧:** innan kritikern startar körs regelbaserade kontroller (linter + [Anti-Slop](https://github.com/dmmulroy/anti-slop) för JS/TS ⚠️) som fångar typiska agentmisstag. Rättaren åtgärdar dem först, så att kritikern inte lägger tid på sådant en fast regel kan hitta. Samma princip som i §7.6: billig kontroll först, dyr sedan.
- **Arkitektur på projektnivå 🎥 (Ebbelaar-intervjun):** kritikern bedömer också **mappstruktur och moduler** — inga kvarlämnade experiment, ingen logik gömd i kod som ser oanvänd ut. Dave rekommenderar **Matt Pococks skill för kodbasarkitektur** (djupa moduler, lokalitet, sömmar), skriven *för att motverka AI-slop och göra kodbaser lättare för AI att navigera* 🎥. Andra oberoende källan till Pococks skills (de tidigare kom från AI LABS). ⚠️ Skillens aktuella namn verifieras ([mattpocock/skills](https://github.com/mattpocock/skills)).
  - **`/simplify` 🎥 (funktionsvideon):** Claude Codes inbyggda kommando granskar återanvändning, förenkling och effektivitet och tar bort kod som inte längre används 🎥. Körs i samma första pass, före kritikern. `/code-review` kan användas som del av kritikerns underlag.
- **Agent teams — tillval 🎥 (funktionsvideon):** sessioner som **pratar med varandra** (till skillnad från delagenter), körs i tmux bakom en dold flagga 🎥. Kritiker och rättare kan då utbyta fynd och rättningar parallellt i stället för via dokument. Kritikern kommunicerar bara med rättaren — aldrig med byggaren eller dess logg (§5.2). Samma sak går att använda för angripare och försvarare i fas 1b. ⚠️ Drar många tokens; experimentellt.
- **Standarden** (låst, §10.1) 🔧:
  - semantisk HTML: rubrikordning, landmärken, knappar som är knappar
  - tillgänglighet: alt-texter, fokusordning, synligt fokus, kontrast, `prefers-reduced-motion`
  - prestanda: bildstorlekar och format, inga onödiga bibliotek, lat laddning under första skärmen
  - ingen död kod, inga kvarlämnade testvärden eller hårdkodade färger utanför designvariablerna (§7.3)
  - formulär: validering och skydd (förberedelse för säkerhetsgranskningen i fas 7)
- **Efter varje rättning:** de låsta kontrollerna körs igen och en snabbgranskning av utseendet görs (§7.6), så att rättaren inte förstör det fas 4–6 godkänt.
- **Tak:** max 3 rundor kritiker ↔ rättare, därefter eskalering.
- **Grind:** kritikern godkänner · alla låsta kontroller går igenom.

### Fas 6c — SEO och lanseringskrav 📄 ("$10K Website Kit", "Websites for Normal People") / 🔧
Guiden har hittills saknat grundläggande sökmotoroptimering. Allt nedan blir **låsta kontroller** (§10.3), skrivna i fas 1b:
| Krav 📄 | Kontroll 🔧 |
|---|---|
| Unik titel och metabeskrivning per sida | Statisk kontroll: finns, unik, rimlig längd |
| Delningsbild och Open Graph-taggar | Statisk kontroll per sida |
| `sitemap.xml` och `robots.txt` | Finns, giltiga, sitemap innehåller alla publika sidor |
| **LocalBusiness-schema** (namn, adress, telefon, öppettider) | Giltig schema.org-markering; värdena stämmer med **faktabasen** (§11.8) |
| Beskrivande alt-texter | Finns på alla meningsbärande bilder (§11.9) |
| Inga trasiga länkar | Crawl av hela sajten |
| **Inga hemligheter i klientkoden** 🎥 (Ebbelaar-intervjun: allt i webbläsaren går att inspektera) | Det byggda paketet (HTML, JS, källkartor) söks igenom efter nyckelformat före publicering; träff = `kritisk` |
| **Lighthouse 90+** 📄 | Prestanda, tillgänglighet, bästa praxis och SEO ≥ 90 i mobil och dator |
| Rubrikstruktur | En `h1` per sida, logisk ordning |
- **Grind:** alla SEO-kontroller går igenom.
- Inskick av sitemap till Search Console görs i fas 7 (fas 8g).

### Fas 7 — Publicering (tillval) 🎥 idé / 🔧 variant
⚠️ Tillval tills frågan om publicering i §14 är avgjord. **Kräver alltid ditt godkännande** (§5.4) — skyddshooken blockerar deploy och `git push` för agenten (§7.3).

1. **Säkerhetsgranskning** av hela repot. I Opus 5.5-videon hittade en skanning av hela projektet en säkerhetsrisk i formulärets e-postfält 🎥 — formulär är den del av en landningssida som oftast är sårbar. Alternativ: CodeRabbit (PR-granskning + skanning av hela repot; betalt efter 14 dagars provperiod 🎥) eller Claude Codes egen `/security-review` 🔧, eller **[Mantis](https://github.com/google/mantis)** — Googles skills för säkerhetsgranskning, uppdelade efter område, för webb- och mobilappar 🎥 (Hermes-videon) ⚠️, eller **Claude Code Security Review GitHub Action**, som videon byggde sin säkerhetsgranskare på 🎥 (Fable 5-videon) ⚠️.
   - **Den starkaste modellen** används här, oavsett effortregeln (§8.6).
   - **Officiellt alternativ: [Claude Security](https://github.com/anthropics/claude-plugins-official/tree/main/plugins/claude-security)** (Anthropic) — ett team av agenter letar säkerhetshål och separata agenter försöker motbevisa varandras fynd; rapporten innehåller det som håller 🎥 (Nate Herk-videon) ⚠️.
   - **Som GitHub Action körs granskningen automatiskt på varje PR** — även på förvaltningens ändringar (fas 8b), där varje ändring blir en PR.
   - Kan köras som **flera parallella säkerhetsagenter per område** (formulär, beroenden, rubriker och inställningar, tredjepartsskript) 🎥.
2. **Rätta** fynd av allvarlighetsgrad `kritisk`/`hög`.
3. **Git → GitHub → Vercel 🎥:** privat repo via GitHub CLI; Vercel kopplas till repot och publicerar varje ny commit på huvudgrenen.
3b. **Staging är ett fast steg 📄 ("Websites for Normal People"):** varje publicering går **först till en staging-adress**; produktion kräver uttryckligt godkännande 📄. Låsta kontroller, SEO-kontroller, samtyckeskontroll (§11.10) och formulärtest körs mot staging innan du godkänner. Gäller även förvaltningens ändringar (fas 8b).
3c. **Kopplingar och samtycke:** Search Console-egendom verifieras (DNS) och sitemap skickas in; GA4 och eventuell Tag Manager kopplas in bakom samtyckesbannern (§11.10, fas 8g).
4. **Vercel CLI 🎥:** så att Claude kan läsa byggloggar och rätta fel i deployen.
5. **Röktest** mot den publicerade adressen 🔧: kör de låsta kontrollerna (§10.3) mot den riktiga URL:en.
6. **Inga arbetsverktyg i produktion 🔧:** låst kontroll att varken Variate-menyn (§6.8) eller andra utvecklingsverktyg finns i produktionsbygget.
7. **Avstämning mellan löften och resultat 🎥 idé (ADHD-videon) / 🔧:** en isolerad agent läser briefen, beslutskartan och den **färdiga sajten** och listar allt som utlovats men saknas eller avviker. I videon hittade en sådan genomgång funktioner som utlovats i PRD:n men aldrig byggts 🎥. Täckningstabellen (fas 1b) fångar luckor *innan* bygget; detta är det sista skyddsnätet mot tyst nedskärning *efter* bygget. Fynd blir `blocked` tills du tagit ställning.
8. **Omdirigeringar vid ombyggnad 🔧 (fas 0b):** låst kontroll att varje URL i `befintlig/urler.md` antingen svarar eller omdirigeras (301) — **ingen gammal URL ger 404**, utom de som medvetet tagits bort enligt beslutskartan. Körs igen som röktest mot den publicerade adressen.
9. **Baslinje för visuell regression 🔧:** skärmdumparna från stopp 2 sparas som baslinje (alla bredder) och används i förvaltningen (fas 8b).
- **Grind 🔧:** inga `kritisk`/`hög` i säkerhetsgranskningen · deploy lyckad · låsta kontroller går igenom mot den publicerade sajten.

### Fas 8 — Förvaltning 🔧 (idéer delvis ur Grok Bot-videon 🎥)
Vi förvaltar sajterna efter lansering. Byggflödet slutar inte vid publicering — sajten går över i en löpande fas med schemalagda kontroller, ändringar och lärdomar.

**8a. Schemalagda kontroller**
| Intervall | Kontroll |
|---|---|
| Dagligen | **Röktest:** de låsta kontrollerna (§10.3) mot produktionsadressen — inklusive hela användarflödet. Konsolfel, trasiga länkar, att sajten svarar. |
| Veckovis | Prestanda (Core Web Vitals), beroenden med kända säkerhetshål, certifikat och domänens utgångsdatum. |
| Månadsvis | **Säkerhetsgranskning** mot den publicerade sajten, t.ex. med Mantis. Hermes-videon 🎥 kör hela granskningen schemalagt mot den publicerade appen och larmar vid fynd. 🔧 Granskningen körs med läsrätt (8d), och fynd blir ändringar på en egen gren (8c). |
| Månadsvis | **AEO 🎥:** fråga AI-assistenter (ChatGPT, Claude, Perplexity) det en köpare i kundens bransch skulle fråga — **utan** att nämna kunden — och logga om och var sajten nämns. *Spekulativt tillval (OKF-videon 🎥):* om strukturerad, maskinläsbar kunskap blir viktig för AI-sökning kan kundsajterna publicera en sådan version av sina publika fakta (i stil med `llms.txt` eller OKF), byggd ur faktabasen (§11.8) — bara publika fakta. ⚠️ Prövas och mäts med AEO-kontrollen innan det införs. |
| Månadsvis | **Värde för kunden 🔧** (idé: FDE-videon 🎥, *sätt en siffra på det*): antal förfrågningar, bokningar eller andra primära handlingar, och konverteringsgrad — jämfört med före lanseringen (vid ombyggnad: före-måttet från fas 0b) och över tid. **Nordstjärnan** från briefen står först i rapporten: baslinje, mål, utfall 🎥 (5000-timmarsvideon). Det är det som visar att sajten gör sitt jobb och som motiverar förvaltningen. Rapporten har bevis (länk eller skärmdump) som övriga rapporter. ⚠️ Kräver statistikverktyg och kundens samtycke; ingen personinformation i rapporten. *Tillval 🎥 (Nate Herk-videon):* rapporten kan skapas i kundens Docs eller Sheets med [Google Workspace CLI](https://github.com/googleworkspace/cli) (fungerar i Claude Code, över 40 skills) ⚠️. |
| Månadsvis | **Sökord och placeringar — tillval 🎥 (Nate Herk-videon):** [OpenSEO](https://github.com/every-app/open-seo) ger riktiga sökorddata, placeringar och bakåtlänkar 🎥. ⚠️ Datan ligger på deras server om man inte driftar verktyget själv — vägs mot kundens integritet (§11.10). Search Console (fas 8g) ger kundens egna sökdata utan tredje part. |
| Månadsvis | **Ny besökare 🎥:** utforskningstestet (§10.3) körs från början som om sajten vore okänd — döda sidor, trasiga knappar, otydliga instruktioner fotograferas. |

- **Bevis för varje påstående 🎥:** varje fynd i en rapport ska ha en länk eller skärmdump. Annars får man en rapport som inte går att kontrollera (Grok Bot-videon). **De siffror kunden fattar beslut på** (t.ex. antal förfrågningar, besök och placering i sökningar) markeras särskilt, med källa, så att du kan stickprova just dem innan rapporten skickas 🎥 (VAULT-videon: *kanske är det bara två eller tre siffror som kan ändra beslutet*).
- **AEO som trend 🔧:** AI-assistenternas svar varierar från dag till dag. Bedöm utvecklingen över flera månader, inte en enskild mätning.
- **Formulärtest utan att störa kunden 🔧:** testinskick märks som test (t.ex. ett dolt fält eller en testadress) och filtreras bort innan de når kunden. ⚠️ Lösningen beror på formulärtjänsten.
- **Schemaläggning:** Claude Codes schemalagda agenter eller cron. ⚠️ Molnkörda agenter behöver åtkomst till repot och eventuella nycklar — se behörigheter nedan.

**8b. Ändringar**
- **Ärenden kommer in via ärendeagenten (§15.2)**, som klassar dem: rutinändringar går hit, frågor besvaras ur kundens hjälpguide och högriskärenden går till dig.
- Kundens önskemål blir en **ändringsbrief** → nya checkpoints → **samma grindar** som vid bygget (§7.2), inklusive de låsta kontrollerna.
- **Ändrade fakta** (öppettider, priser, personal) uppdateras i kundens faktabas (§11.8) — en fil per faktum. Faktakontrollen hittar sedan varje sida som inte följt med.
- **Visuell regression mot godkänd baslinje 🎥 (designnivå-videon) / 🔧:** när du godkänt sajten i stopp 2 blir skärmdumparna i alla bredder **baslinjen**. Varje ändring jämförs mot den, och **oavsiktliga visuella förändringar** syns direkt — t.ex. att sidhuvudet flyttat sig när bara öppettiderna skulle ändras. Videon använder Playwright för visuell regression och CLI:t [Vizzly](https://github.com/vizzly-testing/cli), som visar exakt vilka pixlar som ändrats och låter dig **godkänna eller avvisa** varje ändring; avvisade ändringar blir feedback till agenten 🎥 ⚠️. Godkända ändringar uppdaterar baslinjen.
- **Versioner att välja mellan:** för ändringar av en sektion kan kunden (eller du) välja bland flera versioner med Variate (§6.8).
- **Feedback knuten till element, samlad i en runda:** som i stopp 2 (§10.5).
- **Små textändringar** kan få snabbgranskning (§7.6), men låsta kontroller och faktakontrollen (fas 6) körs alltid.
- **Effort efter ändringens storlek 📄 ("Websites for Normal People"):** små ändringar (text, datum) med medium effort; större omdesign med hög effort, **ny brief** och staging först 📄. Buggar: hitta grundorsaken innan något ändras 📄.
- Ändringar som berör **låsta filer** — brief, `design.md`, kontroller — kräver ditt godkännande och ny låsning (🛑 stopp), precis som i fas 1b.
- Ändringar byggs på en **egen gren**. Publicering kräver ditt godkännande (§5.4) — en förvaltningsagent publicerar aldrig själv.
- **Kö för ändringar 🎥 (loop-nivåvideon, *feature batch*) / 🔧:** ändringsbriefs samlas i `sites/<namn>/andringar/ko.md` — en tabell med status *att göra / byggs / klar*. Kön körs som en batch, t.ex. över natten, tills inget står i *att göra* eller *byggs*. Varje ändring blir en **egen gren och en egen PR med skärmdumpar som bevis** 🎥, så att du kan godkänna dem en och en. Videons kö med två funktioner tog cirka 3 timmar 🎥.
  - **En otydlig ändringsbrief byggs inte 🎥 idé (VAULT-videon) / 🔧:** kan briefen tolkas på mer än ett sätt får den utfallet *för lite information* (fas 4) och blir en fråga till kunden via ärendeagenten (§15.2). Agenten gissar inte — kön körs utan tillsyn, och en felaktig tolkning byggs annars ut över natten.
  - **Dubbletter slås ihop först 🎥 idé (dedupe-skillen, Boris-skills-videon):** ändringsönskemål som säger samma sak slås ihop innan kön körs, så att samma ändring inte byggs två gånger.
- **Tillval — kön som GitHub-ärenden 🎥 (fleet-videon, Symphony):** OpenAI:s Symphony, och en version för Claude Code, kör en bakgrundsprocess som bevakar ärenden med en viss etikett och för varje ärende startar en session, skapar en gren och öppnar en PR 🎥. Kan ersätta `ko.md` om ändringsönskemål ändå hanteras som ärenden. ⚠️ Overifierat; publicering kräver fortfarande ditt godkännande.
- **Förhör före sammanslagning 🎥 (Fable 5-videon, Thariqs fältguide) / 🔧:** låt modellen *ställa frågor till dig* innan du slår ihop en ändring, så att du faktiskt vet vad som ändrats 🎥. När kön körs över natten och genererar många PR:er riskerar ditt godkännande att bli ett klick utan förståelse — **slentriangodkännande**. Varje PR får därför en kort sammanfattning och **2–3 frågor** om ändringen (t.ex. *"den här ändringen påverkar formuläret — vad händer om fältet lämnas tomt?"*).
  - **Förvalt** för ändringar som rör formulär, betalning, säkerhetsfynd eller låsta filer; **frivilligt** för små textändringar.
  - Ett felaktigt svar stoppar inte sammanslagningen, men visar dig vad du behöver titta närmare på.

**8c. Larm och rättning**
- Fel i en schemalagd kontroll → notis till dig (§8.2) och en rad i `sites/<namn>/forvaltning/`.
- Agenten får **föreslå** en rättning på en gren, men aldrig publicera den.

**8d. Behörigheter 🔧**
Grok Bot-videon 🎥 bygger på att alla bottar delar samma dator och samma inloggningar. Vi gör tvärtom: övervakande agenter får **bara läsrätt** till det de kontrollerar (statistik, felloggar, hosting), inga delade inloggningar och ingen rätt att publicera. Samma princip som §5.2 och §7.3. Förvaltningsagenter som kör schemalagt utan tillsyn är förstahandskandidater för en **sandlåda** (§7.3).
- **Tillsyn efter konsekvens och räckvidd 🎥 (VAULT-videon) / 🔧:** *tillsynen ska motsvara konsekvensen* 🎥, och *ju fler en handling kan påverka, desto viktigare är stoppet* 🎥. AI fungerar som en megafon: en otydlig instruktion ger ett fel svar i en chatt, men i en självgående agent kan den skicka fel mejl till en hel lista 🎥.
  | Handling | Räckvidd | Går att ångra? | Tillsyn |
  |---|---|---|---|
  | Läsa statistik, köra kontroller | Ingen | Ja | Fritt |
  | Ändring på staging | Bara du | Ja | Fritt; granskas i grindarna |
  | Publicering till produktion | Alla besökare | Ja, med återställning | Ditt godkännande (fas 7) |
  | Svar till en kund | En kund | Nej | Utkast som du godkänner (§15.2) |
  | Mejl till kundens kundlista, nyhetsbrev | Tusentals | **Nej** | **Aldrig av agent.** Agenten har ingen behörighet till kundens utskickstjänster |
  - *Rabattkoden 🎥 (VAULT-videon, 5000-timmarsvideon):* i Nates team tog en självgående agent själv en uppgift från en lista, tolkade den fel och skickade en rabattkod till hela e-postlistan 🎥. ⚠️ Siffran skiljer sig mellan videorna — *nästan 200 000* respektive *cirka 150 000* — och båda är från samma kanal, alltså *en* källa. Lärdomen enligt 5000-timmarsvideon: *en regel i prompten är ett förslag; en regel i verktygen är en verklig begränsning* — säg inte "skicka aldrig", ge agenten en nyckel som bara kan skapa utkast 🎥.

**8g. Kopplingar per kund 🔧 (idé: Lovables connector-katalog, som visar t.ex. Google Search Console, Google Maps, Resend och Firecrawl)**
Förvaltningen blir mätbar på riktigt när den kan läsa kundens data — inte bara att sajten *fungerar*, utan att den *hittas*. I Claude Code motsvaras Lovables connectors av **MCP-servrar, connectors i claude.ai eller direkta API-anrop från skript**.
| Koppling | Användning |
|---|---|
| **Google Search Console** | Fas 0b: före-mått (klick, visningar, placeringar). Fas 7: skicka in sitemap, kontrollera indexering, verifiera omdirigeringarna vid ombyggnad. Fas 8a (veckovis): indexeringsfel, nya 404:or, utveckling i sök |
| **Google Analytics** | Värdet för kunden (fas 8a): förfrågningar och konverteringar |
| **Google Business Profile** | Lokala företag: öppettider och uppgifter i synk med faktabasen (§11.8) |
| **PageSpeed Insights / CrUX** | Prestanda från riktiga användare (fas 8a) |
| **Resend** (e-post-API) | Formulärleverans och märkta testinskick (fas 8a) |
| **Firecrawl** | Fånga befintlig sajt i fas 0b (alternativ till SingleFile) |

**Principer:**
1. **Skript mot officiella API:er för schemalagda kontroller; MCP för interaktiv analys.** Kontrollerna i fas 8a ska ge samma svar varje gång — ett skript mot t.ex. Search Console-API:t är billigare, mer förutsägbart och tar ingen kontext. MCP/connectors passar när någon vill *undersöka*, t.ex. varför en sida tappat i sök.
2. **Minsta behörighet per kund** (fas 8d, §5.2): varje kund har egna egendomar; förvaltningsagenterna får **bara läsrätt** och åtkomsten delas aldrig mellan kunder. Nycklar ligger utanför flödets filer (§7.3).
3. **Kopplingarna prövas som andra tillval** (§12): säkerhetsskanning, låst version, tredjeparts-MCP:er bara efter granskning.
**Utredning 2026-10-14 — vad som finns 🔧** (uppgifter märkta *overifierat* kunde inte bekräftas i primärkälla; claude.ai:s connector-katalog gick inte att läsa direkt):
| Koppling | Officiell claude.ai-connector | MCP | API för skript | Minsta behörighet per kund |
|---|---|---|---|---|
| **Search Console** | Ingen officiell från Google (tredjepartsconnectors finns enligt andrahandskällor — overifierat) | Ingen officiell. Community: [AminForou/mcp-gsc](https://github.com/AminForou/mcp-gsc) (MIT, aktiv; läser search analytics och URL-inspektion; sitemap-inskick bara med uttrycklig flagga) | Search Console API: search analytics, URL Inspection, sitemaps. Kvoter bl.a. 2 000 URL-inspektioner/dygn per egendom | **Begränsad användare** för läsning. Sitemap-inskick kräver *Fullständig* — görs i fas 7 av dig eller med tillfälligt utökad behörighet. Om ett servicekonto kan läggas till som begränsad användare: overifierat |
| **Analytics 4** | Ingen officiell (overifierat) | **Officiell från Google:** [googleanalytics/google-analytics-mcp](https://github.com/googleanalytics/google-analytics-mcp) — **endast läsning**, körs lokalt, auth via ADC/OAuth/servicekonto (`analytics.readonly`) | GA4 Data API (`runReport`, realtid). Kvoter per egendom | **Läsare** (Viewer) per egendom |
| **Business Profile** | Ingen officiell | Ingen officiell; bara community-servrar, ej granskade | Business Profile-API:erna **kräver ansökan och godkännande** (kvot 0 tills dess); OAuth med `business.manage`; **max 10 ändringar/minut per profil** | **Det finns ingen läsroll** — lägsta är Manager. Läsbegränsningen måste därför ligga i vårt skript/vår hook, inte i Google. Nya managers väntar 7 dagar på full åtkomst |
| **PageSpeed / CrUX** | Ingen officiell | Community (läsning) | PageSpeed Insights API och **CrUX API** (fältdata, p75 över 28 dagar; 150 anrop/min per projekt). Google planerar att ta bort CrUX-fältdata ur PSI — använd CrUX API för fältdata | Publika data — en API-nyckel, ingen kundåtkomst behövs |
| **Resend** | — | **Officiell:** [resend/resend-mcp](https://github.com/resend/resend-mcp) — kan skicka (skrivbehörighet) | Resend API | Egen nyckel per kund/domän; skrivrätt — bara för formulärtester enligt fas 8a |
| **Firecrawl** | — | **Officiell:** [firecrawl/firecrawl-mcp-server](https://github.com/firecrawl/firecrawl-mcp-server) | Firecrawl API | API-nyckel; bara kundens egen sajt (fas 0b) |

**Slutsatser 🔧:**
- **Schemalagda kontroller (fas 8a) körs som skript mot de officiella API:erna** med en separat inloggning per kund: Search Console som begränsad användare, GA4 som läsare, CrUX/PSI med API-nyckel.
- **GA4:s officiella MCP** (bara läsning) är förstahandsval för interaktiv analys. Search Console-MCP:n från community prövas enligt §12 (säkerhetsskanning, låst version) och körs **utan** flaggan för skrivoperationer.
- **Business Profile är flaskhalsen:** ansök om API-åtkomst tidigt, och eftersom det saknas läsroll ska skrivoperationer blockeras av skyddshooken (§7.3) — ändringar i kundens profil (t.ex. öppettider) går som förslag till dig.
- Search Console-egendomar och GA4-egendomar läggs upp per kund i fas 7 med DNS-verifiering; kundens godkännande av villkor och identitet är mänskliga steg.

**8e. Lärdomar tillbaka till bygget**
Ett fel som hittas i drift men som byggflödet borde ha fångat är en lucka i flödet. Det loggas och matas in i auto loopen (§10.5): oftast blir det en ny standardkontroll i fas 1b för framtida sajter — eller, om det är något en granskare borde ha sett, ett **förslag till nytt granskningskriterium** (§10.5, *missade fynd*).

**8f. Underhållsrutiner för byggsystemet 🎥 (Boris Cherny-videon) / 🔧**
Anthropic kör 20–30 *rutiner* om dagen: återkommande molnjobb på en mening som fortsätter när datorn är stängd 🎥. Samma sak för vårt eget byggsystem (detta repo), t.ex. veckovis:
- **Städa** bort oanvända filer, skills och kvarlevor från borttagna funktioner — agenten läser dem annars varje gång den letar i projektet 🎥.
- **Slå ihop dubbletter** — det som byggts två gånger för att modellen glömt att det redan fanns 🎥.
- **Tester för det som saknar tester**, t.ex. hooks och skript, så att *vi* märker när något går sönder.
- Rutinerna följer samma regler som allt annat: egen gren, PR, ditt godkännande; de ändrar aldrig låsta filer (§10.1).
- **Byggsystemet som versionerat plugin (§8.8):** en ändring i byggsystemet blir en ny pluginversion, prövas med eval (§9) och rullas sedan ut.
- **Arkitekturgranskning av förvaltade sajter 🎥 (Ebbelaar-intervjun):** spaghettikod växer i det tysta — experiment lämnar rester, senare raderas en funktion som innehöll logik något annat behövde, och allt slutar fungera efter tre månader 🎥. Hos oss är det **förvaltningens ändringar** som är risken. Varje kvartal (och efter större omdesign) granskas varje sajts kodbas med Pococks arkitekturskill; fynd blir ändringar i kön (fas 8b).
- **Halvårsvis rensningsprov 🎥 (radera-skills-videon):** baslinjen med och utan uppsättning (§8.5, steg 1–4) körs var sjätte månad, även utan ny modell.
- **Schemalagd `/doctor` 🎥 (context-videon):** varje månad (oftare om uppsättningen ändras ofta, annars varje kvartal) och **alltid vid ny modell** 🎥. Rekommendationerna läggs fram som förslag som du godkänner eller avslår.

---

## 5. Autonomi och orkestrering 🔧

Videon kör stegen manuellt med en prompt per steg. För ett autonomt flöde behövs:

**Avstämning: de fem delarna i en självgående loop 🎥 (Hermes-loopvideon)** — videon räknar upp fem delar som varje loop behöver för att köra på egen hand 🎥. Så täcks de i guiden:
| Del | Hos oss |
|---|---|
| Hantering av kontext | Ny kontext per agent (§5.2), överlämningsdokument (fas 3), påminnelse om tillståndet (§5.1), OKF-struktur (§11.6) |
| Feedbackens kvalitet | Fasta fält för granskarnas fynd (fas 4), elementknuten feedback från dig (§10.5) |
| Verifieringsgrindar | Stop-hook (§7.2), låsta och dolda kontroller (§10), bevis per grind |
| Villkor för att avsluta | Rundtak, `blocked`, övergivna grindar (§5.3, §7.2) |
| Tillstånd mellan turer | `state.json`, `checkpoints.json`, `resultat.jsonl` (§5.1, §10.4) |

### 5.1 Orkestrerare
Ett slash-kommando `/bygg-sajt <namn>` som läser `state.json` och kör nästa fas. Det gör flödet **återupptagbart** om en session avbryts.

```json
{
  "site": "exempel",
  "phase": 4,
  "stitchProjectId": "…",
  "iterations": { "designVariants": 6, "stitchReview": 2, "storyReview": 0 },
  "decisions": [ { "phase": 2, "what": "Valde variant 4", "why": "…" } ],
  "blocked": null
}
```

**Påminnelse om tillståndet i varje tur 🎥 idé (Planning with Files, Hermes-videon) / 🔧:**
Delagenterna börjar alltid med ny kontext och läser sina filer. **Orkestreraren** är undantaget — den lever länge i samma session och riskerar att tappa bort var flödet är; videon påpekar att agenter glömmer detaljer i långa samtal, och snabbare med Opus 🎥. Planning with Files löser det med en hook som tvingar in planfilerna i kontexten så att agenten inte kan ignorera planen 🎥.
- En hook (`UserPromptSubmit` och vid sessionsstart) läser `state.json` och lägger in en **kort sammanfattning** i orkestrerarens kontext: aktiv sajt, fas, runda, `blocked`, antal meddelanden i `inbox` och nästa steg.
- Sammanfattningen hämtas alltid från `state.json` — den enda sanningen — och skrivs aldrig av orkestreraren själv.
- Bara för orkestreraren: granskare ska inte få den (§5.2), och byggare får sin kontext från checkpointen.
- Håll den kort (några rader), annars äter den själv kontexten den ska skydda.
- ⚠️ Kontrollera att hooktypen kan lägga till kontext i den Claude Code-version vi använder.

**Bred eller djup: arbetsflöde eller goal 🎥 (OS-videon) / 🔧:**
Claude Codes **dynamiska arbetsflöden** skrivs som ett **JavaScript-skript** i `.claude/workflows/` — planen ligger i kod, inte i kontextfönstret, och koden bestämmer exakt vilka delagenter som anropas i vilken ordning 🎥. Varje delagent får sin prompt och ett **strikt schema** som svaret måste uppfylla; den arbetar tills svaret stämmer 🎥. Arbetsflöden kan köras i bakgrunden och **återupptas med arbetsflödets id** 🎥. **Goal är icke-deterministiskt** (systemet väljer nästa steg); **arbetsflöden är deterministiska** (koden väljer) 🎥.

Videons kriterier för arbetsflöde: uppgiften är **bred** (går att dela i oberoende delar), stor nog att behöva separata kontextfönster, **värd att korsverifiera** (säkerhetsfynd, buggar, migreringar), och har en fast struktur 🎥. *Djupa* uppgifter — ett steg i taget — passar `/goal` eller vår Stop-hook.

Vårt flöde är **deterministisk struktur med icke-deterministiska steg** — och innehåller båda sorterna:
| Bred → arbetsflöde | Djup → goal / Stop-hook |
|---|---|
| Designriktningar och kantfall (§11.7) · parallella checkpoints (fas 3) · fyra specialister i fas 6 · 3–5 heuristikgranskare (§11.4) · parallella säkerhetsagenter (fas 7) · adversarial granskning av planen (fas 1b) | Rättningsloopen per checkpoint · granskning ↔ rättning tills grinden går igenom · kritiker ↔ rättare (fas 6b) |

- 🔧 Orkestreraren kan därför implementeras som ett **arbetsflödesskript** för de breda delarna, med de djupa looparna styrda av Stop-hooken (§7.2).
- **Scheman** upprätthåller våra JSON-format: granskarnas fynd (fas 4), `checkpoints.json`, överlämningsdokument och bevis (§7.2). Scheman är grindar för *form*; hooks är grindar för *innehåll*.
- **Återupptagning:** arbetsflödets id kompletterar `state.json` — en avbruten körning fortsätter där den slutade.
- Avgränsning gäller alltid: tak för antal agenter, inga obegränsade flottor (fas 3).
- ⚠️ Kontrollera arbetsflödesfunktionens format och kostnad i den Claude Code-version vi använder; videon påpekar att arbetsflöden drar många tokens.

**`/goal` som drivare — inte som grind 🎥 (loop-nivåvideon) / 🔧:**
- Claude Code har två kommandon som lätt förväxlas 🎥: **`/loop`** kör en prompt på timer, oavsett om något ändrats (passar schemalagda kontroller i fas 8a). **`/goal`** kör tills ett villkor är uppfyllt; efter varje tur läser en mindre modell konversationen och avgör om agenten ska fortsätta.
- 🔧 Orkestreraren kan köras under `/goal` med villkoret *"flödet är klart eller `blocked`"* — det håller den igång över många turer.
- Men `/goal` bedömer **konversationen**, inte arbetet — samma svaghet som Unlazy-videon pekade ut. Grinden är därför alltid vår Stop-hook (§7.2), som kör kontrollerna själv.
- ⚠️ Kontrollera att `/goal` finns i den Claude Code-version vi använder.

**Styra från mobilen 🎥 (loop-nivåvideon) — tillval:** [Paseo](https://paseo.sh/) kör Claude Code på din egen dator och ger ett fönster till den från telefonen; skills, slash-kommandon och inloggade CLI:er fungerar som vanligt 🎥. Videon valde bort Claude Codes inbyggda fjärrstyrning eftersom skillmenyn saknas där 🎥. 🔧 Användning: svara på `blocked`, godkänna planen (stopp 1) eller en liten ändring från telefonen. ⚠️ Overifierat; ger fjärråtkomst till datorn som kör flödet — granska säkerheten innan användning.

### 5.2 Generatorn ≠ granskaren
Låt granskningsskills köras i en **separat delagent** med färsk kontext. En granskare som delar kontext med byggaren tenderar att godkänna det som byggts. Anthropic skriver detsamma: *separata verifierande delagenter med färsk kontext presterar ofta bättre än självkritik* 📄 (Anthropic, *Prompting Claude Fable 5*). Granskaren får bara: referensen (design / brief), skärmdumparna och kriterierna.

**Granskaren ser inte projektets instruktioner 🎥 (Shopify-videon):** UI-granskarna bedömer *bara* mot prototypen och `design.md`. Hos oss 🔧 läser granskarna varken `CLAUDE.md`, `arbetssatt.md` eller byggarens logg. En granskare som läser instruktionerna bedömer *om byggaren följde dem*; en granskare som bara ser referensen bedömer *om resultatet blev rätt* — och bara det senare är det du bryr dig om.

**Granskaren vet inte vilken runda det är 🎥 (gauntlet-videon) / 🔧:** gauntlet-loopens kritiker saknar minne — den vet inte vem som gjort arbetet eller hur många gånger det redan skickats tillbaka 🎥. En granskare som vet att det är runda 3 av 3 känner trycket att godkänna. Granskaren får därför **varken rundnummer, rundtak eller tidigare granskningsresultat** — bara referensen, kriterierna och det som ska granskas. Rundtaket hanteras av orkestreraren och grindhooken, inte av granskaren.

**Kan agenten göra det, anta att den gör det 🎥 (VAULT-videon):** *"999 gånger gör den det du vill, men den tusende kan bli dålig"* 🎥. Tabellen nedan beskriver därför inte vad en roll *bör* göra, utan vad den *kan* göra. Allt en roll inte behöver ska den inte kunna.

**Behörigheter och modell per roll 🎥 idé (Goal Buddy-videon) / 🔧:** Goal Buddy definierar varje roll med strikt **åtkomstnivå** och **resonemangsnivå** — domaren och spanaren har bara läsrätt, bara arbetaren får skriva, och bara projektledaren får markera något som klart 🎥. Hos oss har reglerna vuxit fram på många ställen; tabellen samlar dem och är facit för agentdefinitionerna:
| Roll | Läser | Skriver | Modell / effort | Källa i guiden |
|---|---|---|---|---|
| **Orkestrerare** | `state.json`, rapporter, bevis | `state.json`, status (enda som markerar klart) | Stark för planering | §5.1, fas 3 |
| **Spanare** | Projektets filer | Bara överlämningsdokument | Billig, låg effort | fas 3 |
| **Byggare** | Överlämningsdokument, brief, `design.md`, faktabas — **inte** `kontroller/` | Bara tillåtna filer för checkpointen | Billig + advisor | §8.6, §10.2, §5.3 |
| **Rättare** | Fynd, tillåtna filer | Bara tillåtna filer | Billig + advisor | fas 4, 6b |
| **Granskare / specialister** | Referens, kriterier, skärmdumpar/video — **inte** `CLAUDE.md`, logg, rundnummer | Bara egen rapport | Efter förmåga (smak/intelligens) | §5.2, fas 4, 6 |
| **Kodkritiker** | Kod, brief, låst standard | Bara egen rapport | Intelligens | fas 6b |
| **Säkerhetsgranskare** | Kod, beroenden | Bara egen rapport | **Starkaste modellen** | fas 7, §8.6 |
| **Domare** (riskbeslut) | Beslutet och underlaget | Bara beslut med motivering | **Hög resonemangsnivå** | §5.3 |
| **Advisor** | Byggarens problem | Inget — råd | Starkaste modellen | §5.3 |
| **Roller som läser externt** (referenser, kundmaterial, AEO) | Externt innehåll | Bara egen rapport, inga hemligheter | Efter uppgift | §7.3 |
| **Förvaltningsagenter** | Läsrätt till statistik, loggar, hosting och kundens kopplingar (Search Console, Analytics m.fl., fas 8g) — bara den aktuella kundens | Bara rapporter och grenar — publicerar aldrig | Efter uppgift | fas 8d, 8g |

Effort börjar lågt för alla roller (§8.6) utom där tabellen säger annat — och utom roller som måste söka i källor, som kör lägst medium (§8.6); eval (§9.5) justerar.

### 5.3 Stoppvillkor
| Situation | Åtgärd |
|---|---|
| Grind uppfylld | Nästa fas |
| Tak för iterationer nått | Stoppa, skriv `blocked` med de bästa alternativen, fråga människan |
| Stitch-inloggning ogiltig | Stoppa, be användaren köra `! stitch login` |
| Samma fel återkommer 2 rundor | **Först: rådfråga en starkare modell (advisor, se nedan).** Hjälper inte det: byt strategi (t.ex. `REIMAGINE`) eller eskalera |

**Advisor — ett steg mellan "försök igen" och "fråga dig" 🎥 (funktionsvideon) / 🔧:** Claude Codes *advisor* låter en svagare modell rådfråga en starkare när den kör fast. Videon kör Sonnet som huvudagent och Opus som rådgivare: rådgivaren ser framåt, pekar ut sådant som kan bli problem och föreslår en väg, och den svagare modellen genomför 🎥.
- Hos oss rådfrågar en byggare eller rättare som kört fast **först advisorn**, och eskalerar till dig bara om inte heller det hjälper. Rådfrågningen loggas i `resultat.jsonl` (`roll: advisor`).
- Gör billiga byggare möjliga (§8.6) utan att flödet fastnar oftare — man betalar för den starka modellen **bara när den behövs**.
- ⚠️ Experimentell funktion som drar många tokens enligt videon; kontrollera tillgänglighet och inställning i den Claude Code-version vi använder.

**Domare för riskfyllda beslut — mellan antagande och `blocked` 🎥 idé (Goal Buddy-videon) / 🔧:** hittills finns två vägar när en agent står inför ett beslut: *små antaganden* loggas (§6.5), *stora frågor* blir `blocked` och väntar på dig. Goal Buddys domare — bara läsrätt, högsta resonemangsnivå — analyserar svåra beslut skeptiskt (riskfylld omfattning, motsägande källor) och returnerar godkända och avslagna beslut med motivering 🎥. Det ger en tredje väg:
| Beslut | Exempel | Väg |
|---|---|---|
| Litet, lätt att ändra senare | Avstånd, ordval i en rubrik | Antagande (§6.5) |
| **Riskfyllt men inom briefens ramar** | Briefen säger X men kundens gamla sajt säger Y · byta tredjepartstjänst · utöka omfattningen för en checkpoint | **Domare** |
| Ändrar vad sajten är, eller kräver kunden | Ny målgrupp, nytt pris, kundens inloggning | `blocked` → dig |
- Domaren godkänner eller avslår med motivering, loggat i `beslutskarta.md` och `resultat.jsonl` (`roll: domare`).
- **Är domaren osäker eller avslår** → `blocked` → dig. Färre stopp, men inga gissningar.
- Domaren rör aldrig låsta filer eller grindar — ett beslut som kräver det går alltid till dig.

### 5.4 Mänskliga kontrollpunkter
Shopify-videon 🎥: orkestreraren stannar bara **två gånger** — när planen ska godkännas och när resultatet ska testas. Vi följer samma princip 🔧:
- **🛑 Stopp 1 — plan:** brief + kontroller + checkpoints godkänns i ett steg via planvyn (fas 1b).
- **🛑 Stopp 2 — slutgranskning:** du testar sajten själv (§10.5 Gate 4).
- **Valfritt:** val av design (fas 2) — kan automatiseras när granskaren är pålitlig.
- **Publicering** (fas 7) kräver alltid ett eget godkännande, men ligger utanför byggflödet.
- Därutöver stannar flödet bara vid `blocked` (§5.3).
- **Ansvaret ligger hos människan 🎥 (ADLC-videon):** man kan inte skylla på modellen när något går fel — ansvaret mot kunden ligger hos dig 🎥. Därför kräver planen, publicering och låsta filer alltid ditt godkännande, och därför loggas varje agent med roll och startare (§10.4).

**Pilotfas 🎥 (FDE-videon) / 🔧:** förtroende tar längre tid än bygget — i videons bankexempel tog bygget 6–8 veckor och piloten ytterligare fyra månader 🎥. De **första sajterna** körs därför med **alla valfria stopp påslagna** (t.ex. designval i fas 2, godkännande av varje rättningsrunda) och med full granskning i varje runda (inget snabbspår, §7.6). Stoppen släpps ett i taget, först när eval (§9) och resultatloggen visar att just det steget är pålitligt. Samma princip gäller redan för auto loopen (§10.5). **För granskare av smak är villkoret mätbart:** överensstämmelsen med dina bedömningar över tröskeln (§9.6).

**Trappan av insatser 🎥 (Ebbelaar-intervjun):** Dave Ebbelaar delar in det man bygger i fyra steg där risken ökar: (1) för dig själv, (2) för ditt team eller din organisation, (3) **säljs till företag** — då tillkommer avtal, villkor och skyldigheter kring dataskydd, (4) konsumentprodukt 🎥. *Hoppa inte över steg* 🎥. Arkitekturfel märks och går att rätta, men **ett dataintrång går inte att ta tillbaka** 🎥.
- 🔧 **Vi står på steg 3** — vi bygger och förvaltar åt företag.
- **Pilotfasen börjar lägre i trappan:** de första sajterna är dina egna eller pilotsajter utan betalning, innan betalande kunder förlitar sig på flödet.
- **Kundavtal** utöver biträdesavtalet (§11.10): ansvar, förvaltningens omfattning, vad som händer vid fel (fas 0, onboarding). ⚠️ Inte juridisk rådgivning.
- Säkerheten är det enda som inte får lösas på rutin (fas 3, fas 6c).

**Uppdelningen människa / modell / regel 🎥 (FDE-videon):** videons steg 2 — *fasta regler blir vanlig mjukvara, omdömesfrågor går till modellen, dyra misstag stannar hos en människa* — är exakt guidens uppdelning: skript och hooks för det mätbara (§7, §10), granskare för omdöme (§5.2), och du för planen, slutgranskningen och publicering. I videons exempel med åtta steg körde fyra självständigt, tre med en människa som kontrollerade och ett förblev mänskligt 🎥.

---

## 6. Live-visning — bygget framför ögonen

**Mål:** användaren ska kunna se sajten växa fram och följa vad flödet gör, utan att läsa loggar.

### 6.1 Två ytor 🔧
| Yta | Visar | Teknik |
|---|---|---|
| **Webbläsaren** | Själva sajten, uppdaterad vid varje filändring | Dev-server med automatisk omladdning (HMR) |
| **Terminalen (Claude Code)** | Flödets tillstånd: fas, grindar, granskningar, antaganden | Claude mods ⚠️ |

En terminal kan rita text, knappar och listor men inte rendera en webbsida. Även videons *Design Picker* öppnar en webbsida i stället för att rita i terminalen 🎥. Därför delas ansvaret upp: **webbläsaren visar resultatet, moden visar processen.**

### 6.2 Vad Claude mods är 🎥
- Tillägg som körs **inuti** Claude Code och kan ändra både utseende och beteende.
- Kan rita en **panel bredvid chatten**, en **list med knappar ovanför promptrutan**, eller rita om delar av Claude Codes egen skärm (t.ex. raden per verktygsanrop).
- **Alltid igång**, som en inbyggd funktion — till skillnad från skills och plugins, som bara laddas eller anropas vid behov och inte kan ändra skärmen.
- **Skapas via prompt:** Claude laddar den inbyggda skillen *plugin authoring* och skriver koden.
- **Hot reload:** tillåt det när Claude frågar, så laddas moden direkt efter varje ändring.
- **Tillfällig tills den installeras:** en ny mod finns bara i sessionen där den skapades. Be Claude installera den för att den ska finnas i nya sessioner.
- **Bara i terminalen:** mods som ändrar gränssnittet syns inte i VS Code-tillägget.
- Inbyggda exempel: `diff` och *You Should Know* (avstängd från början). Delade mods finns på claudemod.com.

**Lyft från bänken (v0.51) 🎥:** mods har nu **två oberoende källor** (§11.11) — AI LABS och Nate Herks *"Claude Code Mods Are Game Changers"*, som visar Claude-teamets officiella lanseringstweet 🎥. Nytt från den andra källan:
- Mods **levereras inuti plugins** och installeras med `/plugin` 🎥 — flödespanelen och våra andra mods kan alltså ingå i det versionerade pluginet (§8.8).
- Mods syns i **Claude Desktop-appen** 🎥. AI LABS sa *terminalen men inte VS Code-tillägget* 🎥. Sammantaget: terminalen och desktop-appen, inte VS Code-tillägget.
- Mods byggs med vanligt språk; *"hur slår jag på och av den?"* går att fråga efteråt 🎥.

⚠️ **Kvar att kontrollera:** att mods finns i *användarens* version. Användaren körde Claude Code 2.1.281, och i en session på den versionen fanns ingen skill med namnet *plugin authoring*. **Första steget är att verifiera det** (se §15).

**Vilka mods vi bygger — utgå från sessionsloggarna 🎥:** be Claude läsa dina sessionsloggar och föreslå de fem mods som skulle hjälpa dig mest — utifrån vad du faktiskt gör och upprepar 🎥. Samma mönster som auto mode setup och Skillify.

### 6.3 Förhandsvisning i webbläsaren 🔧
- Fas 3 startar en dev-server med automatisk omladdning **innan** Claude börjar skriva sajtens filer, och öppnar sidan i webbläsaren. Då syns varje sektion när den skapas.
- **Bevakning av loggarna under bygget 🎥 (Monitor, funktionsvideon) / 🔧:** Claude Codes *Monitor* bevakar loggar eller processer i bakgrunden och hör bara av sig vid avvikelser 🎥. Under fas 3 och 5 bevakas dev-serverns och webbläsarens konsolloggar: kompileringsfel, konsolfel och misslyckade nätverksanrop syns **direkt** — i flödespanelen och som notis — i stället för först vid grinden. Se även §7.7.
- Servern körs bara lokalt (`127.0.0.1`).
- Fas 2: Stitch-designerna kan visas med `stitch serve` ⚠️, så att varianterna syns medan de genereras.
- Fas 4 och 6: granskningsskärmdumparna sparas i `reviews/` och länkas från panelen — man ser *vad* granskaren såg.
- Valfritt: ett galleri (`reviews/index.html`) som visar varje rättningsrunda före/efter sida vid sida.

### 6.4 Mod 1 — Flödespanel 🔧
Visar flödets tillstånd i en panel bredvid chatten. Läser `state.json` (§5.1) och uppdateras när filen ändras.

```
┌ bygg-sajt: exempel ─────────────────────┐
│ ✔ 0 Setup                               │
│ ✔ 1 Brief            godkänd 14:02      │
│ ✔ 2 Design           variant 4 av 8     │
│ ✔ 3 Bygge                               │
│ ▶ 4 Designgranskning runda 2/3          │
│     kritisk 0 · hög 1 · medel 3         │
│ · 5 Animationer                         │
│ · 6 Berättelsegranskning                │
│                                         │
│ [Öppna förhandsvisning] [Senaste rapport]│
│ Antaganden att granska: 4               │
└─────────────────────────────────────────┘
```

- **Krav på `state.json`:** fältnamn och faser måste vara stabila. Bestäm formatet *innan* moden byggs — moden är en vy av tillståndet, inte en egen källa.
- **Status `blocked`:** panelen ska tydligt visa när flödet väntar på användaren (t.ex. godkänd brief, ny Stitch-inloggning).
- **Fallback utan mods:** samma information i Claude Codes statusrad eller som en lokal HTML-sida som läser `state.json`.
- **Förebild — Goal Meter 🎥 (mods-videon 2):** en mod som för `/goal` visar fas, uppgiftslista, **procent klart**, förfluten tid och alla sessioner med pågående mål på ett ställe 🎥 — i praktiken vår flödespanel, byggd av någon annan. Bekräftar att idén fungerar.
- **Kontext, gränser och kostnad 🎥 (Cache Keeper):** panelen visar också kontextens storlek, **5-timmars- och veckogränsen**, kostnaden omräknad till API-pris och **cacheklockan** — efter 60 minuter utan nytt meddelande måste kontexten läsas om till fullt pris 🎥. Fem minuter innan cachen kallnar kommer en varning 🎥. 🔧 För orkestreraren, som lever länge: **gör en överlämning (fas 3, överlämningsdokument) i stället för att låta cachen kallna** mitt i en lång körning.

### 6.5 Mod 2 — Antagandegranskning 🎥 idé / 🔧 variant
Videons *Assumption Check* 🎥 visar de små antaganden Claude gör under en uppgift. Användaren markerar varje antagande som rätt eller fel; de felaktiga skickas tillbaka till Claude som en ny prompt, och de rätta behålls. Man kan också skriva en kommentar per antagande.

Varför den passar ett självgående flöde 🔧: flödet frågar bara vid stora beslut (§5.4). Små antaganden samlas i stället i `state.json` under `assumptions` och granskas i efterhand — användaren behåller kontrollen utan att flödet stannar vid varje detalj.

```json
"assumptions": [
  { "id": 1, "phase": 3, "text": "Typsnittet laddas från Google Fonts", "status": "open" }
]
```

- **Regel i `CLAUDE.md` 🔧:** varje fas loggar sina antaganden här i stället för att fråga. Riskfyllda beslut går i stället till domaren (§5.3).
- **Grind 🔧:** inga antaganden med status `wrong` får vara orättade när flödet markeras som klart.

### 6.6 Andra mods ur videon 🎥
| Mod | Användning hos oss 🔧 |
|---|---|
| **Design Picker** — visar designstilar visuellt när Claude ber dig välja | Fas 1b: ersätts av Inspo-riktningarna i planvyn. Fas 2: välj mellan Stitch-varianterna |
| **Session Monitor** — visar vilka sessioner som väntar, arbetar eller är klara | Om faser eller sajter körs parallellt |
| **Plain Answers** — enkla svar, all text i slutsammanfattningen, statusrad | Statusraden kan vara fallback för flödespanelen |
| **Prompt Enhancer** — skriver om grova prompter så att de nämner rätt skills | Valfri, för manuell styrning |

**Inbyggd vy: agent dashboard 🎥 (fleet-videon):** `claude agents` öppnar en vy i terminalen med alla sessioner som körs i bakgrunden — man kan gå mellan dem och öppna valfri för att se vad den gör. Sessioner startas i bakgrunden med `claude --bg "<prompt>"`, och en pågående session flyttas dit med `/bg` 🎥. 🔧 Det är en inbyggd vy för att se **byggarna arbeta parallellt** i fas 3, och en fallback om mods inte finns (§6.2). ⚠️ Kontrollera kommandona i den Claude Code-version vi använder.

### 6.9 Fler mods: efterhand, kundmöten och krockar 🎥 (mods-videon 2) / 🔧
| Mod 🎥 | Vad den gör | Hos oss 🔧 |
|---|---|---|
| **Replay Theater** (officiellt exempel) | Spelar upp agentens ändringar steg för steg med diffar | **Live-visning i efterhand.** Det mesta av bygget sker när du inte tittar — över natten, i kön, i förvaltningen. Uppspelningen bygger på commits per runda och `resultat.jsonl` som vi redan sparar |
| **Recording Mode** | Döljer känsliga uppgifter (e-post, ekonomi) i gränssnittet vid inspelning eller skärmdelning; arbetet påverkas inte 🎥 | **Visningsläge för kundmöten:** när du visar bygget för en kund döljs andra kunders data, personuppgifter i faktabasen och hemligheter. Kopplat till regeln om åtkomst per kund (§7.3, fas 8d) |
| **Collision Guard** | Före varje ändring: har en **annan chatt rört filen de senaste 30 minuterna**? I så fall väljer du fortsätt, flytta till worktree eller avbryt 🎥 | Extra skydd när du och en förvaltningsagent — eller flera sessioner — arbetar med samma sajt. **Självgående läge:** en hook som blockerar och loggar. **Interaktivt:** mod-frågan |
| **Blast Radius** (officiellt exempel) | Visar vad som skulle raderas **innan** det raderas 🎥 | Kompletterar skyddshooken (§7.3) i interaktivt arbete |
| *Next Steps* (Thariq, Anthropic) | Tre förslag på nästa steg efter varje tur 🎥 | Låg relevans för ett självgående flöde |

### 6.8 Välj mellan versioner direkt i förhandsvisningen — Variate 🎥 (Skills-videon) / 🔧
[Variate](https://github.com/Nutlope/variate) (samma upphovsperson som Hallmark och Inspo) lägger till en **meny på sidan** där man tar fram flera versioner av **en** sektion, växlar mellan dem medan resten av sidan står still, och skickar sitt val **direkt till agenten** 🎥. Versioner av olika sektioner kan blandas, t.ex. hjälteyta 2 med knapp 3. Fungerar i både Next.js och ren HTML; videon rekommenderar den främst för landningssidor.

**Användning hos oss 🔧:**
- **Stopp 2 (din slutgranskning, §10.5):** i stället för att *beskriva* ändringar i text väljer du mellan versioner i förhandsvisningen. Valet blir en checkpoint som går igenom samma grindar.
- **Förvaltning (fas 8b):** en kund som vill förnya en sektion får tre versioner att välja mellan.
- Det är det närmaste vi kommer målet "bygget framför ögonen": du ser alternativen på den riktiga sajten, inte i en beskrivning.

**Får aldrig publiceras:** menyn är ett arbetsverktyg. En låst kontroll i fas 7 säkerställer att Variate-koden inte finns i produktionsbygget. ⚠️ Overifierat — granska hur Variate kopplas in och tas bort innan den används.

### 6.7 Prompt för att skapa flödespanelen 🔧
> Skapa en Claude-mod som visar en panel bredvid chatten. Den läser `sites/<namn>/state.json` och visar alla faser med status (klar / pågår / väntar), aktuell rättningsrunda, antal fel per allvarlighetsgrad från senaste granskningen och antal öppna antaganden. Visa tydligt när `blocked` är satt. Lägg till knappar som öppnar förhandsvisningen och senaste rapporten i `reviews/`. Uppdatera panelen när filen ändras.

---

## 7. Säkerhet och kvalitetsvakter

Ett självgående flöde har två risker som en människa annars fångar:
1. **Claude säger "klar" för tidigt** och flödet går vidare med halvfärdigt arbete.
2. **Claude gör något farligt** — raderar, läcker data eller arbetar utanför uppgiften — när ingen godkänner varje steg.

Jev-videon 🎥 löser båda med en extern beslutsmodell. Vi bygger en **grundnivå med Claude Codes egna hooks** 🔧 och behandlar Jev-verktygen som tillval.

### 7.1 Princip: mätbart före bedömt 🔧
| Typ av villkor | Exempel | Vem avgör |
|---|---|---|
| **Mätbart** | Sajten bygger · inga konsolfel · `kritisk` = 0 i senaste granskningen · rundtak ej nått | Skript (hook) — samma svar varje gång, gratis, ingen data lämnar datorn |
| **Bedömt** | Flyter berättelsen? Tjänar animationen historien? | Separat granskande delagent (§5.2) — skriver resultatet som mätbara fält |

Granskarna skriver därför sina rapporter **även som JSON** (`reviews/<typ>-<runda>.json` med antal fel per allvarlighetsgrad). Då kan skriptet läsa resultatet utan att tolka text.

⚠️ **Gräns:** skriptet litar på granskarens JSON. Det skyddar mot att *byggaren* säger klar för tidigt, men inte mot en slarvig granskare. Därför körs granskaren med färsk kontext och strikt skill.

### 7.2 Hook 1 — Grindkontroll (`Stop`) 🔧
Motsvarar Jev Belay 🎥 men deterministisk.

**Funktion:** när Claude försöker avsluta sin tur kontrollerar hooken om grinden för aktuell fas är uppfylld. Om inte blockeras avslutet och Claude får besked om vad som saknas.

**Logik:**
1. Läs `.claude/aktiv-sajt`. Finns ingen aktiv sajt → tillåt avslut (vanlig session, inte flöde).
2. Läs `sites/<namn>/state.json`.
3. **Tillåt avslut** om något av följande gäller — annars fastnar flödet i en loop:
   - `blocked` är satt (flödet väntar på människan)
   - rundtaket för fasen är nått (eskalering enligt §5.3)
   - flödet är klart (sista fasen godkänd)
   - hookens indata har `stop_hook_active: true` *och* samma grind har blockerats 3 gånger i rad (säkerhetsventil — skriv `blocked` med orsak)
4. Kör fasens kontroller (bygg-kommando, läs senaste review-JSON, kontrollera att filer finns).
5. Alla godkända → tillåt avslut. Annars blockera med en lista över det som saknas.

**Registrering** i `.claude/settings.json`:
```json
{
  "hooks": {
    "Stop": [
      { "hooks": [ { "type": "command", "command": "node .claude/hooks/grind-stopp.mjs" } ] }
    ]
  }
}
```
Blockering sker genom att skriptet avslutar med kod 2 och skriver orsaken på stderr — den texten får Claude som instruktion att fortsätta. ⚠️ Verifiera aktuellt hookformat mot Claude Codes dokumentation när vi implementerar. (Shopify-videon 🎥 beskriver samma mekanism — en Stop-hook som avslutar med exit code 2 — vilket stärker antagandet men ersätter inte dokumentationen.)

**Grindar per fas** (från §4, i mätbar form). Från v0.5 gäller dessutom för fas 3–6: inga låsta filer ändrade sedan godkännandet, och de låsta kontrollerna (§10.3) som hör till fasen går igenom.
| Fas | Kontroller |
|---|---|
| 1 Brief | `brief.md` finns med alla 7 rubriker |
| 1b Kontroller | `state.json` har `planApproved: true` (sätts bara efter användarens svar, aldrig på timeout) · brief och kontroller committade |
| 2 Design | Stitch-projekt-id finns · vald design finns för DESKTOP och MOBILE i `designs/` |
| 3 Bygge | Bygg-kommandot avslutas med kod 0 · alla checkpoints i `checkpoints.json` har status `klar` **med bevis** — hooken kör dessutom om kontrollerna själv i stället för att lita på statusen |
| 4 Designgranskning | Senaste `stitch-review-*.json`: `kritisk` = 0 och `hög` = 0 |
| 5 Animationer | Bygget OK · inga konsolfel · reduced-motion-test godkänt |
| 6 Berättelsegranskning | Senaste `story-review-*.json`: alla kapitel `fungerar` · `kritisk` = 0 och `hög` = 0 (inkl. faktakontrollen) · inga antaganden med status `wrong` (§6.5) |
| Alla faser | Samma modell har kört alla rundor i fasen (`resultat.jsonl` → `modell`) — annars `blocked` (§8.6) |
| 6b Kodgranskning | Senaste `kod-review-*.json`: kritikern har godkänt · alla låsta kontroller går fortfarande igenom efter rättningarna |
| Alla faser | Inga **övergivna grindar** utan ditt ställningstagande (se nedan) |

**Bevis per grind 🎥 (Unlazy-videon) / 🔧:**
Unlazys grindfil har för varje grind ett resultat som måste vara sant, **kommandot** som bevisar det, **de exakta ord** kommandot ska returnera och en **bevisrad** som börjar som `pending`. En kontrollant kör kommandona och ersätter `pending` med den del av svaret som avgjorde. **En ikryssad ruta med `pending` kvar räknas som sämre än en tom ruta** — det betyder att agenten kryssade i själv 🎥.
- Hos oss sparar grindhooken för varje godkänd grind ett **bevis** i `state.json` → `bevis`: vilket kommando eller vilken rapport som avgjorde, och ett kort utdrag av utdata.
- Status utan bevis = underkänd. Det gäller grindar, checkpoints och kontroller.
- Bevisen visas i flödespanelen (§6.4) och i slutrapporten, och samma princip gäller förvaltningsrapporterna (fas 8a).

**Övergivna grindar 🎥 (Unlazy) / 🔧:** ibland visar sig en grind omöjlig. Då får agenten **inte** släppa den i det tysta. Den skriver en rad i `state.json` → `overgivna` med grindens namn och orsaken, flödet sätts `blocked`, och raden står i slutrapporten. Du avgör: ändra briefen, ändra kontrollen (ny låsning) eller acceptera.

### 7.3 Hook 2 — Skydd mot farliga åtgärder (`PreToolUse`) 🔧
Motsvarar Toolgate 🎥 men regelbaserad.

**Lager 1 — permissions** i `.claude/settings.json` (enklast, inget skript): neka t.ex. `git push --force`, publicering/deploy och läsning av `.env`-filer.

**Lager 2 — skriptet `skydd.mjs`** för det som inte går att uttrycka som enkla regler:
| Blockeras | Varför |
|---|---|
| Radering (`rm -rf`, `Remove-Item -Recurse`) **utanför** `sites/<aktiv-sajt>/` | Toolgates exempel: en mapp raderades innan innehållet kopierats 🎥 |
| Skrivning (Write/Edit) utanför projektmappen | Arbete utanför uppgiften |
| Nätverksanrop som skickar data (`curl -X POST`, `curl -d`) till okända domäner | Dataläckage via nedladdade verktyg |
| Publicering, deploy, `git push` | Kräver människa enligt §5.4 |
| **Okänt kommando som kan ändra Git-historik, radera eller publicera** (t.ex. `push --force`, `reset --hard`, sammanslagning, `rm -rf` i okänd sökväg) | **Okänt = blockerat** 🎥 (CLAUDE.md-videon: *är agenten osäker på om ett kommando är destruktivt ska den fråga, inte anta*). Kommandon i den här kategorin släpps bara igenom om de finns på en lista över kända säkra varianter; annars blockeras de och blir en fråga till domaren (§5.3) eller dig |

Radering **inuti** den aktiva sajtens mapp tillåts — det löser Toolgates kända problem att även nödvändiga raderingar stoppas 🎥.

Blockering: avsluta med kod 2 och skriv orsaken på stderr.

**Designregelvakt 🔧** (idé: Jevs regelvakt per fil 🎥, men helt mätbar):
Opus 5.5-videon visade att modellen glider tillbaka till sina egna färger och typsnitt 🎥. När `design.md` är låst (efter fas 2) kontrollerar `skydd.mjs` varje Write/Edit i `src/`:
| Blockeras | Kontroll |
|---|---|
| Färgkod som inte finns i `design.md` (`#hex`, `rgb()`, `hsl()`) | Textsökning i den nya texten mot färgerna i `design.md` |
| Typsnitt som inte finns i `design.md` (`font-family`, typsnittsimport) | Textsökning mot typsnitten i `design.md` |

Claude får veta exakt vilket värde som bröt regeln och vilka värden som är tillåtna. Designvariabler (t.ex. `var(--farg-primar)`) släpps igenom — de pekar på värden som redan kontrollerats.
⚠️ Undantag behövs för t.ex. `transparent`, `currentColor` och färger i bilder/SVG från Stitch-exporten. Testa på en verklig Stitch-export innan vakten slås på.

**Antimönster som statiska kontroller 🎥 (designnivå-videon) / 🔧:** *"varje antimönster i `design.md` blir ett testfall"* 🎥. Utöver att blockera värden som *inte finns* i `design.md` kontrollerar vakten en lista över **förbjudna mönster** som står i `design.md` under rubriken *Antimönster*:
| Antimönster 🎥 | Kontroll |
|---|---|
| Typsnitt som avslöjar AI-slop (videon: Inter, Geist) eller som riktningen utesluter | Textsökning efter `font-family` och typsnittsimporter |
| Förbjudna ikonbibliotek (videon: Lucide) | Sökning efter importer och paketnamn |
| Glassmorfism med gradienter | Sökning efter `backdrop-filter` i kombination med gradientbakgrunder |
| Övriga AI-signaturer som går att söka fram i koden | Läggs till i listan efter hand (via förslag, §10.5) |
Antimönster som inte går att söka fram (t.ex. en centrerad CTA utan sammanhang) blir granskningskriterier för konverteringsspecialisten i fas 6.

**Hemligheter i flödets filer 🔧** (idé: Agit-videon 🎥):
Flödet committar automatiskt efter varje runda (§10.4) — utan att en människa granskar vad som skickas. Samtidigt hanteras inloggningar i fas 0 (Stitch) och fas 7 (GitHub, Vercel).
- **Regel i `CLAUDE.md`:** hemligheter skrivs **aldrig** i flödets filer (`state.json`, `resultat.jsonl`, `reviews/`, `brief.md`, sajtens källkod). Inloggningsuppgifter ligger i miljövariabler eller i verktygens egna inloggningar (`stitch login`, `gh auth login`, `vercel login`), som du kör själv.
- **Kontroll före varje automatisk commit:** sök efter kända nyckelformat (API-nycklar, tokens, privata nycklar) i det som ska committas. Träff → ingen commit, flödet sätts `blocked`.
- **Mönstersökning räcker inte ensam 🎥:** Agit ersätter kända nyckelformat med platshållare, men ett lösenord av vanliga ord har inget mönster och slinker igenom. Därför är regeln ovan — att hemligheter aldrig hamnar i filerna från början — huvudskyddet; sökningen är ett extra lager.
- `.env`-filer finns i `.gitignore` och får inte läsas av agenten (lager 1 ovan).

**Ignore-filer 🎥 (harness-videon) / 🔧:** `.gitignore` och `.agentignore` gör att agenten låter bli filer den inte ska röra 🎥. Hos oss listas det byggarna aldrig ska läsa: `sites/*/befintlig/` (kundens gamla sajt — extern text), `sites/*/referenser/`, `kontroller/` (dolda kontroller, §10.2), `node_modules/` och genererade bygg-mappar. Ett extra lager utöver skyddshooken och behörighetstabellen (§5.2) — inte en ersättning. ⚠️ Kontrollera vilka ignore-filer Claude Code respekterar i vår version.

**Extern text är data, inte instruktioner 🔧 (utifrån Skill Spector-videon 🎥):**
Samma angrepp som i skills — dolda instruktioner, osynliga tecken, kodad text 🎥 — kan finnas i **allt externt innehåll som flödet läser**: referenssajter och Inspo-sidor (fas 1b, 4, 6), kundens dokument och texter (fas 1), konkurrenters sajter, sidor som läses vid AEO-kontrollen (fas 8a). En referenssida kan innehålla dold text som säger *"ignorera dina instruktioner och …"*.
- Agenter som läser externt innehåll har **ingen skrivrätt utanför sin egen rapport** och **ingen åtkomst till hemligheter** (granskarna har redan den isoleringen, §5.2 — regeln gäller nu **alla** roller som läser utifrån, även intervjuns hantering av kundmaterial).
- Det de läser är **underlag, aldrig order**: instruktioner som dyker upp i externt innehåll följs inte utan rapporteras som fynd.
- Kundmaterial som ska in i briefen eller faktabasen (§11.8) går via intervjun och bekräftas — det kopieras inte rakt in i agentinstruktioner.

**Kassaskåp för hemligheter — per kund 📄 ("Websites for Normal People") / 🔧:**
Dokumentet lägger alla nycklar i ett kassaskåp (Bitwarden Secrets Manager), som agenten använder **utan att värdena syns i chatten** 📄. En **kortlivad bootstrap-token** skapar de permanenta, avgränsade nycklarna, och **deploy-tokenen är skild från tokenen med full åtkomst**, som stannar i kassaskåpet 📄. Genomgången påpekar själv luckan: *ingen modell för att hålla isär hemligheter mellan flera kunder* 📄 — precis vårt fall.
- **Ett kassaskåp med ett eget projekt/en egen samling per kund.** En agent som arbetar med kund A kan bara läsa kund A:s nycklar.
- **Bootstrap-mönstret:** den breda tokenen används bara en gång för att skapa avgränsade nycklar (deploy, läsning av Search Console, formulär-e-post) och lämnar sedan aldrig kassaskåpet.
- **Nycklar per syfte:** deploy-nyckeln kan bara publicera den kundens sajt; läsnyckeln kan bara läsa; inga nycklar delas mellan kunder.
- Agenten hämtar värden via ett skript som läser kassaskåpet och skickar dem direkt till verktyget — värdet skrivs aldrig i chatten, loggar eller filer (regeln ovan).
- ⚠️ Val av kassaskåp och exakt mönster verifieras; dokumentet noterar också att bootstrap-mönstret där förutsätter läget där alla behörighetsfrågor är avstängda — hos oss gäller skyddshooken och behörighetstabellen (§5.2) ändå.

**Sandlåda — tillval 🎥 (fleet-videon) / 🔧:**
Skyddshooken blockerar farliga åtgärder vi kunnat räkna upp. En **sandlåda** begränsar skadan av det vi *inte* förutsåg: agenten körs i en isolerad, kasserbar kopia av utvecklingsmiljön.
- Videon visar **Docker Sandbox**: varje sandlåda är en egen mikro-VM med hård säkerhetsgräns; paket, byggen och servrar stannar där inne. Med *clone mode* arbetar agenten på en kopia av projektet i stället för på de riktiga filerna 🎥.
- 🔧 Förstahandskandidater: **körningar över natten utan tillsyn**, **parallella byggare** i fas 3 (löser krockar om grenar, portar och beroenden på en gång) och **förvaltningsagenter** (fas 8d).
- Orkestreraren kan själv skapa en sandlåda per deluppgift, hämta in ändringarna och ta bort sandlådan när uppgiften är bekräftad klar 🎥 — med samma sammanslagning i tur och ordning och kontroller emellan som i fas 3.
- ⚠️ Videon är sponsrad av Docker. Overifierat; prövas mot urvalskriterierna (§12) och för kostnad och prestanda innan det tas in. Andra sandlåde-lösningar kan fungera lika bra.

### 7.4 Meddelanden under pågående bygge 🔧
Inspirerat av Jev Steer or Queue 🎥. När du ser bygget live (§6) kommer du att vilja säga till mitt i arbetet. Claude Code levererar redan ett nytt meddelande när det aktuella steget är klart; risken är att Claude då börjar arbeta på två saker samtidigt.

**Regel i `CLAUDE.md`:** varje meddelande som kommer under ett pågående flöde klassas som:
| Klass | Exempel | Hantering |
|---|---|---|
| **Avbryt** | "stopp", "vänta" | Avsluta steget, sätt `blocked`, vänta på användaren |
| **Styr om** | "byt till mörkt tema" (rör aktuell fas) | Tillämpa direkt, logga i `decisions` |
| **Köa** | "lägg till en kontaktsida senare" | Lägg i `state.json` → `inbox`; tas upp vid nästa grind |

Flödespanelen (§6.4) visar antal meddelanden i `inbox`.

### 7.5 Tillval — Jev-verktygen 🎥 ⚠️
Overifierade: uppgifterna kommer bara från videorna, repona är små och från tredje part. Alla kräver en API-nyckel, och kod, åtgärder eller hela konversationen skickas till en extern tjänst.

**Om Jev 🎥** (från uppföljningsvideon 2026-09-28):
- Skriver ingen text utan **väljer**: ja/nej, ett alternativ ur en lista eller en poäng — med ett säkerhetsvärde för varje val.
- Ett beslut tar en bråkdel av en sekund. Man betalar bara för det man skickar in; svaret är gratis.
- Kan inte skriva kod eller använda verktyg — ersätter inte Claude utan fattar beslut åt Claude.
- **TypeSafe tar för närvarande inte emot nya registreringar.** Åtkomst via OpenRouter eller Vercel AI Gateway. Nyckeln sparas som miljövariabel i terminalen innan `claude` startas.

**Verktyg ur första Jev-videon:**

| Verktyg | Vad det gör 🎥 | Tänkbar användning 🔧 |
|---|---|---|
| [Jev Belay](https://github.com/valentynkit/jev-belay) | Stoppar "klar" utan bevis; inställbar säkerhetsgräns (de använde 75 %) | Extra vakt utöver §7.2 för grindar som inte går att mäta |
| [Toolgate](https://github.com/RiskAverseTech/toolgate) | Strängare än auto mode; gav en mappradering 77 % risk och blockerade den | Ersätter/kompletterar §7.3 om regellistan blir ohanterlig |
| [Abide](https://github.com/coldteadotai/abide) | Gör om CLAUDE.md till ja/nej-checklista och kontrollerar varje ändring | Upprätthåller fasreglerna i `CLAUDE.md` |
| [Jev Browser](https://github.com/Ying-Kai-Liao/jev-browser) | Webbläsartester med buggrapport; körs som MCP | Alternativ motor för fas 4 och 6 |
| [Jev Steer or Queue](https://github.com/Larkspur-Wang/Jev_steer_or_queue) | Avgör styr om / köa / avbryt; agerar bara vid ≥ 90 % säkerhet | Ersätter regeln i §7.4 med automatisk klassning |
| [Compact Adviser](https://github.com/kunchenguid/compact-adviser) | Säger till när det är säkert att komprimera | Långa sessioner (fas 2 och 5) |
| [Quicksilver](https://github.com/UditAkhourii/quicksilver) | Förhandssållar filer; sparade ~67 000 tokens i ett test | Mindre relevant — sajterna är små |
| [Jev SEO](https://github.com/AgriciDaniel/jev-seo) | SEO-rapport (PDF + Excel) inkl. beredskap för AI-sökning | Möjligt slutsteg före publicering |

**Användningar ur uppföljningsvideon 🎥:**
| Användning | Vad den gör | Hos oss 🔧 |
|---|---|---|
| Sållning före granskning | 7 ja/nej-frågor om en ändring; små ändringar får snabb granskning, riskfyllda full | Mätbar variant i §7.6 |
| Målstyrd webbläsartestning | Listar knappar/länkar, Jev väljer nästa klick mot ett mål | Agentvariant i §10.3 |
| Regelvakt per fil | Blockerar en ändring om Jev är ≥ 80 % säker på att en regel för filen bryts | Mätbar designvakt i §7.3 |
| Domare för dokumentation | Kontrollerar att varje regel i dokumentationen har ett test | Liknar §10.3 |
| Väljare av skill | Väljer en skill, eller ingen, per prompt | Behövs inte — orkestreraren anger skills |
| Snabb filsökning / [snabb komprimering](https://github.com/tamaratran/fast-jev-compaction) | 35 filer rankade på 1,6 s / komprimering på under en sekund | Mindre relevant — sajterna är små |

**Ordning 🔧:** bygg §7.2–7.4 och §7.6 först. Lägg till ett Jev-verktyg först när en mätbar regel visat sig otillräcklig — och granska då repot innan installation. Jevs *mönster* — en snabb, billig domare före den dyra — går ofta att återskapa med skript.

### 7.6 Granskningsdjup efter risk 🔧
Idé: Jevs sållning före granskning 🎥. Rättningsrundorna i fas 4 och 6 kör annars full granskning varje gång, även när bara en marginal ändrats.

Ett skript läser rundans `git diff` innan granskaren startas:
| Ändringen | Granskning |
|---|---|
| Bara CSS-värden i en eller två sektioner, inga nya element | **Snabb:** skärmdumpar av de berörda sektionerna, i alla bredder |
| Ny komponent, ändrad layout, fler än två sektioner, ändrad navigering eller ändrade animationer | **Full:** hela sajten enligt skillen |
| Skriptet kan inte avgöra | **Full** |

- **Sista rundan i varje fas är alltid full**, så att grinden aldrig vilar på en snabbgranskning.
- Valet loggas i `resultat.jsonl` (§10.4), så att eval (§9) kan visa om snabbgranskningar släpper igenom fel.

### 7.7 Bevakning av flödet medan det kör 🎥 (Monitor, funktionsvideon) / 🔧
Grindhooken upptäcker fel **när en agent försöker avsluta**. En byggare som fastnat i en loop kan bränna tokens länge innan dess. Claude Codes *Monitor* bevakar i bakgrunden och hör bara av sig vid avvikelser; den tar först reda på *vilka avvikelser som kan uppstå* och bevakar sedan tyst 🎥. I videon fångade den en agent som avvek från sitt arbetsflöde, misslyckade verktygsanrop och problem med rollbaserade behörigheter 🎥.

**Avvikelser vi bevakar 🔧:**
| Avvikelse | Källa |
|---|---|
| Agent skriver (eller försöker skriva) utanför sina tillåtna filer | Skyddshookens blockeringar (§7.3) |
| Upprepade misslyckade verktygsanrop | Sessionsloggar |
| Rundor som inte tar slut, eller tokenåtgång långt över det normala för fasen | `resultat.jsonl` jämfört med tidigare sajter (§9.3) |
| Konsol- och kompileringsfel under bygget | Dev-server och webbläsare (§6.3) |
| Modellbyte mitt i en fas | `resultat.jsonl` → `modell` (§8.6) |

- Vid avvikelse: notis till dig och en rad i flödespanelen (§6.4). Monitor **stoppar inte** själv — det gör grindhooken och rundtaket. Den ger en tidig varning.
- ⚠️ Kontrollera Monitor-funktionens tillgänglighet och format i den Claude Code-version vi använder.

---

## 8. Grundinställningar för självgående körning

⚠️ **Gäller hela avsnittet:** inställningsnamnen återges som de uttalas i videon. De exakta nycklarna i `settings.json` och miljövariablerna ska kontrolleras mot Claude Codes dokumentation eller `/config` innan de skrivs in.

### 8.1 Starta projektet med ny init 🎥
Sätt miljövariabeln `CLAUDE_CODE_NEW_INIT=1` **innan** `claude` startas och kör `/init`. Den nya init-varianten:
1. frågar om du vill förbättra en befintlig uppsättning eller börja om, och om skills och hooks ska skapas
2. frågar hur du använder Git och hur appen ska publiceras
3. gör en plan som du godkänner
4. skriver `CLAUDE.md`, skills och hooks

🔧 Init ger grundstrukturen; guiden fyller sedan i flödesspecifika regler. Gamla `/init` skriver ned allt den läser i koden — men `CLAUDE.md` ska bara innehålla det agenten inte kan lära sig av koden själv 🎥.

**Ärvda regler 🎥 (Skills-videon):** Claude Code läser `CLAUDE.md` i projektet **och** i mapparna ovanför. Videon lägger gemensamma regler i en `CLAUDE.md` i mappen som innehåller alla projekt, så att varje nytt projekt ärver dem. 🔧 Om varje sajt får ett eget repo kan flödets gemensamma regler (standardtexten i §8.6, hemlighetsregeln i §7.3) ligga där, medan sajtspecifikt stannar i sajtens repo. ⚠️ Regler ovanför projektet syns inte i projektets Git-historik — de måste versioneras separat. ⚠️ **Dold kostnad 🎥 (context-videon):** `CLAUDE.md` från andra mappar laddas utan att man ser det och kostar tokens i varje tur — i videon hittade `/doctor` en sådan fil från ett annat projekt på cirka 2 000 tokens 🎥. Kontrollera med `/doctor` exakt vilka `CLAUDE.md` som laddas för varje sajt.

### 8.2 Inställningar
| Inställning | Vad den gör 🎥 | Vårt värde / användning 🔧 |
|---|---|---|
| **Timeout för AskUserQuestion** | När tiden gått ut väljer Claude det föreslagna svaret och fortsätter. Frågor som Claude inte kan komma förbi utan dig väntar ändå. | T.ex. 120 s. Valet loggas som antagande (§6.5) så att du kan granska det i efterhand. **Godkännandet av planen (brief + kontroller) ska aldrig gå på timeout** — det sätts bara efter ett verkligt svar (§7.2). |
| **Lokala notiser** (`/config`) | Terminalpip eller systemnotis när en session är klar eller behöver dig | På. Ger signal när flödet sätter `blocked` (§5.3) |
| **Auto mode setup** | Läser projektet och tidigare sessioner och anpassar auto modes regler efter vad du brukar tillåta | Köra efter några manuella körningar, när mönstret finns |
| **`fewer-permission-prompts`** | Lägger kommandon som bara läser på en lista över tillåtna kommandon, i projektets inställningar | Färre avbrott. Kompletterar — ersätter inte — skyddshooken i §7.3 |
| **Opus plan** (`/model`) | Opus i plan mode, Sonnet för resten | Planering av sajten på stark modell, bygget på billigare |
| **Modell för delagenter** (+ "force") | Tvingar alla delagenter till en modell; utan "force" kan en agentfil välja egen | Se varning nedan |
| **Stäng av claude.ai-connectors** | Notion, Slack m.fl. från Claude-appen laddas inte i sessionerna | På — frigör kontext för långa faser |
| **Stäng av artifacts** | Verktyget för artifacts laddas inte | På, om förhandsvisningen sker via dev-server (§6.3) |
| **Spara planer i projektet** | Planer sparas i en projektmapp i stället för den globala `.claude/plans` | Valfritt: `docs/planer/` så att planer följer med projektet |

⚠️ **Omfattning:** videon lägger flera inställningar i den globala `settings.json`. Då påverkas **alla** dina projekt — även de som behöver connectors. Lägg dem i projektets `.claude/settings.json` där det stöds.

⚠️ **Modell för delagenter:** att tvinga *alla* delagenter till en liten modell sparar pengar men försvagar **granskarna** — de är flödets kvalitetskontroll. Tvinga inte modell globalt; ange modell per agent i stället: billig modell för enkla uppgifter, stark modell för `stitch-review` och `story-review`.

### 8.3 Använd inte i flödet 🔧
| Funktion | Varför inte |
|---|---|
| **`subtask` för granskare** | Ger delagenten hela chatten i kontexten 🎥. Granskarna ska ha **ny kontext** (§5.2) — använd vanliga delagenter |
| **Fokusläge under bygget** | Döljer alla steg när Claude är klar 🎥. Bra när du lämnar datorn, men krockar med att se bygget framför dig (§6) |

### 8.4 Användbart vid parallellt arbete 🎥
- **Sessioner som skickar meddelanden till varandra** (`list agents`): en session kan fråga en annan, även medan den andra arbetar.
- **Fork:** kör en sidouppgift i bakgrunden i en ny session som avslutas själv när den är klar.
- **Branch:** kopierar chatten till en ny session för att pröva en alternativ idé.

### 8.5 Underhåll 🎥
| Kommando | När |
|---|---|
| **Skill doctor** — visar hur ofta varje skill används och vad den kostar i tokens | Månadsvis: ta bort skills som inte används |
| **`/skills` + T** — sorterar skills efter tokenkostnad | Vid behov |
| **Prompt audit** (`claude api`) — granskar instruktionsfiler och skills med delagenter, föreslår rättningar | Efter varje ny modell — då blir flest instruktioner inaktuella. Kör eval (§9) före och efter. Ändrar inget själv — du godkänner varje förslag 🎥 (Fable-videon) |
| **`/doctor`** — rensar efter regeln *skulle Claude ha listat ut det här själv?*; behåller det modellen gjort fel på, motiveringar och det som skiljer sig från verktygens standard 🎥 (Boris Cherny-videon) | Efter varje ny modell; hälsorapport med förslag, inget ändras förrän du godkänner ⚠️ |

**Rutin vid ny modell 🎥 (Boris Cherny-videon) / 🔧:**
Boris Cherny, som skapade Claude Code: *de flesta använder kapabla modeller på samma sätt som de använde Sonnet 3.5* — och bär med sig dödvikt 🎥. Anthropic strök cirka 80 % av Claude Codes egen systemprompt när Opus 5 släpptes 🎥.
1. **Baslinje med safe mode:** kör eval-sviten (§9) i *safe mode* — utan CLAUDE.md, skills och plugins — och med full uppsättning. Jämför.
2. **Pröva varje instruktion** mot regeln *skulle Claude ha listat ut det här själv?* — gäller särskilt standardtexten i §8.6 och reglerna i `CLAUDE.md`. Behåll det modellen fortfarande gör fel på och det som skiljer sig från verktygens standard (t.ex. vilket testverktyg vi använder).
3. **Rensa** med `/doctor` och prompt audit; godkänn ändringarna en och en.
4. **Kör eval igen.** Behåll rensningen bara om måtten inte blivit sämre.
   - **Äldre guider gäller fortfarande 🎥 ("4 Ways"-videon):** Opus 4.8-guiden hade en lösning — be om flera designriktningar först — som *togs bort* i Fable 5-guiden. Problemet fanns ändå kvar: enligt videon föll ungefär två av tre genererade sajter tillbaka på samma stil 🎥. En instruktion rensas alltså inte för att en ny guide säger att den inte behövs, utan **bara när eval visar det**.
4b. **Skriv om skills utifrån den nya modellens promptguide 🎥 ("4 Ways"-videon):** varje modell släpps med en promptguide. Ge Claude guiden och skillen och låt den skriva om skillen för den nya modellen 🎥 — särskilt designskills. Kör eval före och efter; behåll bara om måtten förbättras.
5. **Grindar rensas aldrig på detta sätt** — de förnyas i stället (§10.3). Se skillnaden i §8.7.

**Vad som behålls och vad som prövas 🎥 (radera-skills-videon) / 🔧:** Nate Herk körde en kopia av sitt repo utan skills och `CLAUDE.md`. Resultatet fick **bättre innehåll** men **tappade varumärket** (sidhuvud, länkar, färger) 🎥. Han tog därför inte bort skillen utan skrev om den: *gör det som du tycker, men med den här bilden i sidhuvudet och de här länkarna* 🎥. Samma utfall som i context-videon (rätt varumärke men sämre struktur med skills, och tvärtom utan), alltså en oberoende iakttagelse av samma sak. Rensningen gör därför skillnad på:
| Behålls | Prövas att ta bort |
|---|---|
| Var saker finns (sökvägar, projekt-id, kundens filer) | Arbetsgången steg för steg |
| Varumärke, `design.md` och kundens fakta (§11.8) | Formatregler som modellen redan följer |
| Standarden för vad som är bra (kriterier, referenser) | Korrigeringar för fel som den nya modellen inte längre gör |
| Hur arbetet verifieras (kontroller, grindar) | |

**Även utan modellbyte — halvårsvis 🎥 (radera-skills-videon):** Boris Cherny: *ta bort din CLAUDE.md, dina skills och dina hooks var sjätte månad och se vad modellen gör — det kan överraska dig* 🎥. Harness och verktyg ändras också mellan modellbyten. Steg 1–4 körs därför **halvårsvis** även utan ny modell (fas 8f).

**Underlag för rensningen 🎥 (context-videon):**
- Källan är Thariqs artikel *"The New Rules of Context Engineering for Claude 5 generation models"*: Anthropic strök över 80 % av systemprompten **utan mätbar försämring i sina evals**. Principen är *minsta möjliga kontext som ger resultatet* — men **minimal betyder inte kort**: det modellen behöver ska vara kvar 🎥.
- En studie från 2025 fann att prestandan sjönk med **13,9–85 %** när indata blev längre, även när modellerna kunde hitta den relevanta informationen 🎥.
- När Anthropic laddade **MCP-verktygsdefinitioner först när de behövdes** blev det **85 % färre tokens**, och MCP-evals steg från 49 till 74 % för Opus 4 och från 79,5 till 88,1 % för Opus 4.5 🎥 — stöd för CLI före MCP (§2).
- **Vad `/doctor` gör enligt videon 🎥:** listar varje skill med antal användningar och tokenkostnaden för dess frontmatter; flaggar oanvända skills med hänsyn till deras ålder; hittar dubbletter mellan filer; hittar `CLAUDE.md` som laddas från andra mappar; hittar **trasiga skills** (fel filnamn, felformaterad frontmatter — då ser Claude aldrig beskrivningen). Allt läggs fram som förslag som du godkänner.
- ⚠️ Siffrorna kommer från videon; artikeln och studien bör läsas i original innan de citeras vidare.

### 8.7 Grindar och instruktioner åldras olika 🔧 (utifrån Boris Cherny-videon 🎥)
Guiden innehåller två sorters regler:
| Sort | Exempel | Vid ny modell |
|---|---|---|
| **Grindar** — kontroller som kan säga nej | Låsta kontroller, Stop-hooken, designregelvakten, granskarnas kriterier | **Behålls och förnyas** när de slutat kunna underkänna (§10.3). Boris: *en kontroll som inte kan säga nej är ingen kontroll* 🎥 |
| **Instruktioner** — handledning | Standardtexten i §8.6, arbetssätt i `arbetssatt.md`, regler i `CLAUDE.md` | **Prövas och rensas** (§8.5). På en kapabel modell kan handledning stå i vägen 🎥 |

**Var saker hör hemma — från billigast till dyrast 🎥:**
1. **Prompten** — när instruktionen bara var otydlig. Kostar inget.
2. **`CLAUDE.md`** — kort; bara det som gäller *varje* session och som agenten inte kan se själv. Laddas i varje tur.
3. **Skill** — det du förklarat för femte gången; laddas bara när det behövs. Långa skills delas i flera filer.
4. **MCP** — bara när informationen inte går att nå på annat sätt.
5. 🔧 **Hook** — när regeln *måste* gälla varje gång (inte "oftast").

Notering till konsolideringen: flera regler i guiden pekar idag mot `CLAUDE.md`; vid konsolideringen flyttas allt utom det kortaste till skills eller hooks enligt ordningen ovan.

**Mall för `CLAUDE.md` 🎥 (CLAUDE.md-videon) / 🔧** — ordning efter prioritet:
1. **Projektbeskrivning först** — vad byggsystemet (eller sajten) är och hur det hänger ihop, så att agenten förstår helheten innan den läser reglerna 🎥.
2. **Hårda regler** — aldrig förhandlingsbara, inga undantag 🎥. Hos oss nästan alltid regler som *också* upprätthålls av en hook (låsta filer, hemligheter, publicering, tillåtna filer) — det som *måste* gälla ska inte bara stå i text.
3. **Medelprioritet** — viktiga men förhandlingsbara arbetsregler.
4. **Låg prioritet** — referenser och pekare (till skills, `kunskap/`, faktabasen) 🎥.

Dessutom: ta bara med **verktyg som avviker från standard** (t.ex. `gh` i stället för `git`, `pnpm` i stället för `npm`, vårt testverktyg) — det Claude redan vet, som `npm run dev`, är dödvikt 🎥. Håll filen under ~300 rader 🎥. Mallen speglar §8.7: hårda regler överst är grindar, resten är instruktioner som prövas och rensas vid ny modell.

**`CLAUDE.md` per nivå 🎥 (harness-videon, efter Anthropics artikel om stora kodbaser) / 🔧:**
- **Rot-filen** innehåller flödets gemensamma regler och hålls kort — *helst runt 300 rader* 🎥. Allt den inte behöver i varje tur ligger i skills.
- **`sites/<namn>/CLAUDE.md`** innehåller bara det sajtspecifika: kundens särdrag, undantag från standardreglerna, pekare till faktabasen. Claude Code laddar en underkatalogs `CLAUDE.md` först när agenten arbetar där 🎥 — så en byggare för sajt A ser aldrig sajt B:s särdrag.
- **Skills kan avgränsas till sökvägar** så att de bara laddas för vissa mappar 🎥 — t.ex. en skill för ombyggnad som bara gäller `befintlig/`.
- Båda nivåerna är låsta (§10.1).

**Stop-hook som skriver lärdomar i `CLAUDE.md` — används inte 🔧:** videon beskriver en Stop-hook som efter varje session låter Claude skriva in sina lärdomar i `CLAUDE.md` 🎥. Det strider mot låsningen av agentinstruktionerna (§10.1). Lärdomar blir förslag (§10.5).

**Reservation 🔧:** videon återger Boris som att skills från andra numera kan installeras utan risk, eftersom modellen upptäcker dold promptinjektion — videons eget exempel: Claude upptäckte och vägrade en dold instruktion i en skill att skicka data till en extern adress 🎥. Men det är ett enskilt fall, och vårt flöde kör utan tillsyn. Urvalskriterierna (§12) och skyddshooken (§7.3) står kvar. **Stöd i data (Skill Spector-videon 🎥):** av över 30 000 skannade skills hade mer än en fjärdedel en sårbarhet och ungefär 1 av 20 tecken på att vara skadlig — och flera angreppstyper (osynliga tecken, falska bokstäver) syns inte för en modell som läser texten. Därför skannas varje skill före installation (§12, kriterium 7).

### 8.6 Promptregler och modellrisker 🎥 (Fable-videon) / 🔧
Varje ny modell beter sig annorlunda i långa körningar utan tillsyn. Uppgifterna nedan gäller Fable 5.1 enligt videon; ⚠️ siffrorna är videons och dess källors (eget test, CodeRabbit, Artificial Analysis) och har inte verifierats. Reglerna är skrivna så att de gäller oavsett modell.

**Standardtext i varje byggarprompt 🔧** (byggare, rättare, orkestrerare — inte granskare):
| Regel | Varför 🎥 |
|---|---|
| **"Ingen övervakar den här körningen. Fortsätt med allt som redan täcks av uppdraget, så länge det går att ångra."** | Modellen antar annars att någon arbetar bredvid och stannar för att fråga. Utan någon som svarar är väntan detsamma som att stoppa. Rekommenderas i Anthropics promptguide för Fable 5.1 enligt videon. "Går att ångra" stämmer med våra commits och behåll/ångra-regeln (§10.4). |
| **"Ändra bara filerna i den här checkpointens lista. Ser du ett problem utanför, nämn det i slutet."** | Modellen rättar annars sådant i närheten — i videon ändrade den testfiler ingen bett den röra. Listan finns i `checkpoints.json`; det låsta skyddas dessutom av §10. |
| **"Redigera den del som behöver ändras; skriv inte om hela filen."** | Omskrivning kostar utdatatokens för oförändrade rader. 🔧 Gör också `git diff` missvisande stor, vilket får granskningsdjupet (§7.6) att alltid välja full granskning. |
| **"Ingen tillgjord prosa."** (gäller sajtens texter och rapporter) | Fable 5.1 använder mindre av det än Opus 5 och Fable 5, men skriver längre meningar med färre styckebrytningar. Instruktionen åtgärdar båda enligt videon. |
| **"Skriv bara fakta som finns i kundens faktabas (§11.8). Saknas något — lämna platshållare och logga ett antagande."** | Fable 5.1 hittar på ett svar i 72,6 % av fallen när den inte vet (Fable 5: 63,6 %). Kontrolleras i fas 6. |
| **"Skriv vad du förväntar dig innan du kör kontrollerna; jämför sedan."** | En av Karpathys regler i Karpathy-videon 🎥 — *förutsäg, kör, jämför*. Skiljer sig utfallet från förväntan är det en signal även när kontrollen går igenom: *oftast fungerar det, men lite sämre utan att något säger ifrån* 🎥. Avvikelsen loggas i `resultat.jsonl`. |
| **"Innan du rapporterar framsteg: granska varje påstående mot ett verktygsresultat från den här sessionen. Rapportera bara arbete du kan peka på belägg för; är något inte verifierat ännu, säg det uttryckligen."** (Anthropics formulering, fritt översatt) | I Anthropics tester **eliminerade instruktionen nästan helt påhittade statusrapporter** i långa körningar, även i uppgifter byggda för att framkalla dem 📄 (Anthropic, *Prompting Claude Fable 5*; vidareförmedlat av Nate Herks prompting-video 🎥). Gäller orkestrerarens status (fas 3), slutrapporten i stopp 2 och förvaltningsrapporterna till kunden (fas 8). Officiell källa till regeln *status med bevis*. |
| **Roller som måste söka: "Känner du inte säkert igen ett namn — eller känner igen det från ett område som ändras snabbt — är det namnet som ska verifieras: sök innan du svarar."** (förkortat) | Vid **låg effort** är Fable 5.1 *mindre benägen än Fable 5 att anropa ett sök- eller hämtningsverktyg och mer benägen att svara ur minnet* 📄 (Anthropic, *Prompting Claude Fable 5.1*). Anthropic föreslår antingen högre effort för de berörda turerna eller den här instruktionen 📄. Gäller spanaren och researchen (fas 0b), faktakontrollen och granskningen av lagkrav (fas 6). |
| **"Bygg inte mer än uppdraget kräver. Välj den enklaste lösningen som fungerar — inga extra funktioner, inställningar eller system för problem som inte finns."** | En av Karpathys fyra regler (Skills-videon 🎥). De övriga tre — gissa inte, rör inget utanför uppdraget, bestäm kontrollen innan du börjar — täcks redan av §6.5, raden ovan om tillåtna filer och fas 1b. |

**Effort per roll 🔧:** CodeRabbit fann 61 % av felen med låg effort mot 57,1 % med hög, och låg var snabbare 🎥; i videons eget test fastnade hög effort i att gå fram och tillbaka. Börja med **låg effort** för alla roller och höj bara för en roll där eval (§9.5) visar att det lönar sig. Effort sparas per roll i agentdefinitionerna.
- **Tak 🎥 (Fable 5-videon):** på Fable 5 ger *xhigh* och *max* samma resultat som *high* — att höja är en användningsfälla, inte en kvalitetshöjning 🎥. Håll effort mellan låg och hög. ⚠️ Gäller enligt videon Fable 5; pröva på nya modeller.
  - **⚠️ Motsägelse:** "4 Ways"-videon kör **xhigh för animationer**, eftersom det ger färre rättningsrundor 🎥 — tvärtemot Fable 5-videons påstående. Båda kan stämma för olika uppgifter. **Eval per roll avgör** (§9.5): animationsbyggaren i fas 5 prövas med både high och xhigh, och antal rundor och kostnad jämförs.
- **Undantag — roller som måste gå till källorna 📄 (Anthropic, *Prompting Claude Fable 5.1*; Nate Herks prompting-video 🎥):** låg effort minskar sökningarna (se tabellen ovan). Spanaren och researchen (fas 0b), faktakontrollen och granskningen av lagkrav (fas 6) kör därför **lägst medium** och har sökinstruktionen i prompten; eval (§9.5) avgör den slutliga nivån. Fable 5.1 hittar redan på svar i 72,6 % av fallen när den inte vet — låg effort som också minskar sökningarna förvärrar det.
- **Byt effort per meddelande, inte per anrop 📄 (Anthropic, *Effort*):** på bl.a. Fable 5.1 och Opus 5.5 kan effort ändras mitt i en konversation med ett effort-meddelande; **promptcachen behålls** 📄. Att i stället byta effort på hela anropet startar om cachen och styr dessutom Fable 5.1 sämre, eftersom den håller sig till nivån i sina tidigare svar 📄. Orkestreraren kan alltså höja effort bara för de svåra turerna i en lång session. ⚠️ Funktionen är i beta i API:t; hur den syns i Claude Code verifieras.
- **Undantag — säkerhetsgranskning:** säkerhetsgranskaren (fas 7 och 8a) kör den **starkaste modellen**. Ett missat säkerhetsfel kostar mer än dyra granskningar. Anthropic beskrev Mythos/Fable som ovanligt stark på att hitta säkerhetsrisker, och videon körde sex säkerhetsagenter parallellt över en plattform och hittade verkliga buggar 🎥.

**Modellval efter kostnad, intelligens och smak 🎥 (Fable 5-videon) / 🔧:** videon routar delagenter med en modellgraf i `CLAUDE.md` (efter Theo) som rangordnar modeller på **kostnad, intelligens och smak** 🎥. Hos oss är *smak* en egen dimension: designriktningar, Stitch-prompter, wireframes och berättelsegranskning kräver smak; kodrättning, kontroller och säkerhet kräver intelligens; rutinuppgifter ska vara billiga. Modellvalet per roll utgår från vilken *sorts* förmåga rollen behöver — och avgörs med eval (§9.5). **Billiga byggare + advisor:** byggare och rättare kan köra en billigare modell och rådfråga en starkare när de kör fast (§5.3) — man betalar för den starka modellen bara när den behövs.

**Tyst modellbyte 🎥:** säkerhetsspärrarna avbryter cirka 60 % mer sällan, men när en spärr slår till byter Claude Code **utan att säga något** till en svagare modell för resten av sessionen. I videon räckte ordet "biological" i en skämtfil i ett spelprojekt. Det finns ingen inställning som undviker det.
- 🔧 Logga vilken modell som körde varje runda i `resultat.jsonl` (fält `modell`, §10.4).
- 🔧 Grindhooken (§7.2): om modellen bytts under en fas → **godkänn inte**, sätt `blocked` med orsak. Arbete från en svagare modell ska inte gå vidare obemärkt.
- 🔧 Risken är störst för kunder inom ämnen som spärrarna täcker (t.ex. säkerhet, vård, biologi). Notera det i briefen.

**Kostnad 🎥:** läsningar från cachen blev 75 % billigare, men modellen skriver ~1,7 gånger mer — enligt Artificial Analysis ~20 % dyrare per uppgift. Mät kostnaden i eval (§9.3), lita inte på prislistan.

### 8.8 Byggsystemet som versionerat plugin 🎥 (harness-videon) / 🔧
Claude Code-plugins paketerar **skills, hooks och MCP:er** i ett installerbart paket; den som installerar det får exakt samma kontext och konfiguration, och paket kan synkas via ett GitHub-repo och en egen marknadsplats 🎥.

När vi bygger och förvaltar många sajter måste byggsystemet vara **identiskt överallt** och varje ändring gå att spåra och ångra. Därför:
- Våra skills, hooks, agentdefinitioner (§5.2), standardkontroller och inställningar paketeras som **ett plugin i ett eget repo**, med versionsnummer.
- Varje maskin och varje sajtrepo installerar **en angiven version**. En sajt i förvaltning kan ligga kvar på den version den byggdes med tills en uppgradering är prövad.
- **En ändring i byggsystemet är en ny version** — prövad med eval (§9) innan den rullas ut, och möjlig att rulla tillbaka.
- **Test av skills före utrullning 🎥 idé (context-videon) / 🔧:** varje version testas automatiskt: varje skill har giltig frontmatter, ett unikt namn och en beskrivning; inga trasiga sökvägar. En skill med felformaterad frontmatter syns aldrig för Claude — och ingen märker det 🎥.
- **Test av att rätt skill utlöses 🎥 (skills-videon, Nate Herk om Anthropics skill-skapare) / 🔧:** Claude läser bara namn och beskrivning för varje skill tills uppgiften matchar (progressive disclosure); överlappar två beskrivningar får Claude gissa 🎥. *En skill som Claude inte hittar är en skill du inte har* 🎥. Därför ingår i testet av varje version:
  - **tre testfrågor per skill** 🎥 — en självklar som ska utlösa den, en annorlunda formulerad som också ska det, och en orelaterad som inte får det,
  - en **överlappskontroll** där alla beskrivningar jämförs parvis; två skills som konkurrerar om samma begäran underkänner versionen,
  - 🔧 i flödet anropar orkestreraren våra skills med namn, så testet gäller främst skills som ska utlösas av dig eller av en agents fria begäran.
- **Upprepad kod lyfts till låsta skript 🎥 (skills-videon) / 🔧:** Anthropic-teamet såg Claude skriva i stort sett samma Python-skript varje gång en presentation skulle formateras — dyrt, och resultatet varierade mellan körningar. Skriptet sparades i skillen som *ett verktyg för sitt framtida jag* 🎥 (DRY). Hos oss:
  - Kod som byggagenten skriver på nytt i varje bygge — konvertering av Stitch-exporten, bildoptimering, formulärkoppling, sitemap, strukturerad data — lyfts in i pluginets `scripts/` och körs i stället för att genereras.
  - Auto loopen (§10.5) letar efter **liknande kod som återkommer mellan sajter** och föreslår vad som ska lyftas; du godkänner, skriptet låses och skillen pekar på det.
  - Skillen körs sedan igen och prövas: den ska anropa skriptet, inte skriva ett nytt 🎥. Agentens kreativa arbete läggs på innehåll och design — inte på att lösa samma tekniska problem igen.
- **Stegvis lansering 🎥 (ADLC-videon) / 🔧:** en ny version körs först på eval-sviten, sedan på **en** riktig sajt (canary), och först därefter på övriga förvaltade sajter. Det skyddar alla sajter från ett fel som eval missat.
- Samma princip som låsta versioner för andras skills (§12, kriterium 7): vi låser även vår egen.
- ⚠️ Kontrollera pluginformatet och marknadsplatsfunktionen i den Claude Code-version vi använder.

---

## 9. Kvalitet över tid — eval för flödet

§7 kontrollerar att **en** sajt är bra. Det här avsnittet kontrollerar att **flödet** producerar bra sajter, och att varje ändring av en skill eller regel gör det bättre — inte bara annorlunda. 🔧

### 9.1 Vad videon visar 🎥
- **Build eval** (`claude api`) skriver en fast testsvit **en gång**, så att varje ny version prövas mot samma tester.
- **Hillclimb** ändrar appen, kör testerna efter varje ändring och behåller bara ändringar som ger högre poäng.
- Båda **kostar API-pengar** per körning, eftersom varje test anropar modellen. För appar utan AI-anrop planerar build eval tester utan att använda API:t.

⚠️ Videons kommandon är byggda för appar som *anropar* en modell. Vårt flöde *är* Claude Code. Troligen behöver vi ett eget skript som kör flödet obevakat (`claude -p`) — prova build eval först och se om det går att rikta mot flödet.

### 9.2 Testsvit 🔧
3–5 fasta testbriefs i `evals/briefs/`, valda för att täcka olika svårigheter:
| Brief | Prövar |
|---|---|
| Kort scrollytelling-sajt, 4 kapitel | Normalfallet |
| Mycket text, få bilder | Läsbarhet och tempo i story-review |
| Brief med motstridiga krav | Att flödet sätter `blocked` i stället för att gissa |
| Mobil först | Att fas 2 och 4 faktiskt fångar mobilfel |

Fas 1 (intervjun) hoppas över — briefen är redan skriven. Briefen märks som godkänd i testsvitens `state.json`.

### 9.3 Mått per körning 🔧
| Mått | Källa |
|---|---|
| Nådde flödet fas 6 utan eskalering? | `state.json` |
| Antal rättningsrundor per fas | `state.json` → `iterations` |
| Antal `kritisk`/`hög` vid **första** granskningen | `reviews/*-1.json` — mäter byggarens kvalitet, inte granskarens tålamod |
| Antal antaganden | `state.json` → `assumptions` |
| Tid och kostnad | Körningens loggar — tillval: Codeburn för att se vad tokens går till (§12) |
| **Antal ingrepp från dig** (utöver de två stoppen) | `state.json` → `blocked`-händelser och `inbox` |

**Sätt en siffra på värdet 🎥 (FDE-videon) / 🔧:** videon avslutar FDE-färdplanen med att värdet måste mätas — Cursor fick en kund att sluta klaga på att en agent kostade 2 000 dollar om dagen när de frågade vad det kostade att skicka fel tekniker 🎥. För oss: tid, kostnad och antal ingrepp **per sajt** över tid, jämfört med vad samma sajt hade krävt manuellt. Det är underlaget för prissättning och för att avgöra när pilotfasen (§5.4) kan släppas.

Resultatet sparas som en rad per körning i `evals/resultat/` med guidens version och datum.

**Felsökning 🔧:** när ett mått blir sämre behöver man se *vad agenten faktiskt gjorde*. Claude Codes egna sessionsloggar räcker troligen. Tillval: Agit ([Einsia/agent-git](https://github.com/Einsia/agent-git)) 🎥 sparar konversationer som Git-commits med grenar, tillbakaspolning och cherry-pick — men flödets tillstånd ligger redan i filer, så det behövs bara för djupare felsökning. ⚠️ Overifierat; delade sessioner kan innehålla hemligheter (§7.3).

### 9.4 Arbetssätt 🔧
1. Kör sviten och spara som **baslinje**.
2. Ändra **en** sak (en skill, en regel, en modell).
3. Kör sviten igen och jämför med baslinjen.
4. Behåll ändringen bara om måtten blivit bättre — samma princip som hillclimb, men med människan som beslutar.

⚠️ **Slumpvariation:** Stitch och Claude ger olika resultat vid varje körning. Kör varje brief minst 2 gånger innan slutsatser dras, och lita inte på små skillnader.

⚠️ **Kostnad:** en hel svit kör flödet många gånger, inklusive Stitch-genereringar. Sätt ett budgettak per svitkörning. Referenspunkt 🎥 (gauntlet-videon): ett HR-system byggt med en flotta parallella delagenter tog 1 h 33 min, drog cirka 40 % av en sessionskvot och hade kostat runt 116 dollar via API:t. Ytterligare referens 🎥 (loop-typvideon): en enda tillståndslös loop (tester först, sedan "alla gröna") tog cirka 39 minuter och drog mer än 200 000 tokens. Automatisk hillclimb kan bli dyr — använd den bara på avgränsade delar, t.ex. en enskild skills instruktioner.

### 9.5 Eval per tillval 🎥 (Caliper, repo-videon) / 🔧
§9.2–9.4 mäter **hela flödet**. Många tillval i guiden — Hallmark, UI Skills, Inspo, Scroll World — står som öppna frågor med "ta med?" (§14). De avgörs bäst med data, inte med videornas påståenden.
- **[Caliper](https://github.com/edonadei/caliper) 🎥** kör agenten **med och utan** en skill och visar vilka uppgifter skillen klarar pålitligt och om den är värd sina extra tokens. Fungerar även för MCP-servrar och andra instruktioner. Skill doctor (§8.5) visar bara *kostnaden*; Caliper visar *nyttan* 🎥.
- Ingår två skills: en som intervjuar dig om vad skillen ska åstadkomma och en som skriver och kör testerna. Resultaten sparas i `.caliper/`.
- **Vår användning 🔧:** innan ett tillval tas in permanent körs en jämförelse med och utan det på en avgränsad uppgift, t.ex. "Hallmark i fas 4: hittar granskningen fler verkliga generiska mönster?". Tillvalet tas bara in om nyttan syns och är värd tokens.
- ⚠️ Overifierat; kostar API-anrop per körning.

### 9.6 Kalibrering av granskare mot din smak 🎥 (Ebbelaar-intervjun) / 🔧
Våra viktigaste grindar för **smak** är LLM-domare: berättelsegranskningen, konverteringsspecialisten, den blinda jämförelsen och originalitetskontrollen. Vi har låst deras kriterier och isolerat dem — men **aldrig mätt om de bedömer som du**. En granskare som godkänner det du hade underkänt släpper igenom fel, oavsett isolering.

**Metoden — en LLM som domare, kalibrerad mot en människa 🎥** (Dave Ebbelaar, *"så görs det i verkliga projekt"*):
1. En människa bedömer ett antal exempel (videon: cirka 100) som bra eller dåligt, med motivering. Tråkigt manuellt arbete — men *det är där smaken fångas* 🎥.
2. LLM-domaren bedömer samma exempel. **Överensstämmelsen mäts** — t.ex. 50 eller 80 % — som baslinje 🎥.
3. En loop förbättrar domarens prompt utifrån var den och människan skiljer sig: 75, 80, 90, 95, 99 % 🎥.
4. **Kalibreringen görs om då och då** mot modelldrift 🎥 — och **alltid vid modellbyte**, eftersom en ny modell kan tolka samma domarprompt annorlunda (Nate Herk i samma samtal 🎥).

**Datan finns redan, utan extra arbete 🔧** — varje beslut du fattar är ett märkt exempel:
| Ditt beslut | Kalibrerar |
|---|---|
| Riktningen du väljer i stopp 1 | Kritikern i spridd idégenerering (§11.7) |
| Godkännanden och avvisningar i stopp 2 | Specialisterna i fas 6 |
| Variate-versionen du väljer (§6.8) | Konverterings- och berättelsespecialisten |
| Visuella diffar du avvisar (fas 8b) | Utseendegranskaren (fas 4) |
| Missade fynd (§10.5) | Den specialist som missade |
Besluten sparas med granskarens bedömning av samma sak i `kalibrering/<granskare>.jsonl`.

**Loopen följer våra principer:** förbättringen av en granskares kriterier är ett **förslag** — du godkänner, kriteriet låses på nytt (§10.1). Överensstämmelsen mäts på exempel som inte användes vid förbättringen, så att granskaren inte bara lär sig de exempel den prövats på.

**Villkor för pilotfasen (§5.4):** en granskare får köra **utan ditt stopp** först när överensstämmelsen med dina bedömningar ligger **över en tröskel** (förslag: 90 %) på tillräckligt många exempel. Hittills har det stått "när eval visar att steget är pålitligt" — nu finns ett mått.

---

## 10. Låsta kontroller och självförbättring

### 10.1 Grundprincip: den som bedöms får inte kunna ändra domaren 🎥
Karpathys loop 🎥: agenten får ändra **en** fil; en **annan** fil, som agenten aldrig får röra, poängsätter resultatet; ändringen behålls bara om poängen blir bättre. En instruktionsfil på vanlig engelska (`program.md`) styr varje runda. Om agenten kunde ändra poängfilen skulle den göra poängen lättare att slå i stället för att göra arbetet bättre.

**Lucka i vår guide fram till v0.4 🔧:** grindhooken (§7.2) hindrar Claude från att säga "klar" för tidigt — men Claude kan i princip ändra själva grinden, acceptanskriterierna i `brief.md` eller granskarnas kriterier.

**"Domare" som ska låsas 🔧:**
| Vad | Var |
|---|---|
| Körbara kontroller | `sites/<namn>/kontroller/` |
| Godkänd brief (särskilt acceptanskriterierna) | `sites/<namn>/brief.md` |
| Godkänd designspecifikation (färger, typsnitt, avstånd) | `sites/<namn>/design.md` — låses efter fas 2 |
| Godkänd funktionsspecifikation (klickbara delar och tillstånd) | `sites/<namn>/design.functional.md` — låses i fas 1b |
| Kunskapsbasen som kriterierna hänvisar till | `kunskap/` (§11) |
| **Agentinstruktionerna** — det som *styr* alla agenter | `CLAUDE.md`, `AGENTS.md` |

**Varför `CLAUDE.md` låses 🎥 idé (Astryx-videon) / 🔧:** i videon skrev designsystemets `init`-kommando om `CLAUDE.md` och `AGENTS.md` utan att fråga 🎥. Varje tredjepartsverktyg med ett `init`-kommando kan göra samma sak — och så kan en byggaragent med god avsikt. `CLAUDE.md` läses av varje agent i varje tur; ändras den, ändras spelreglerna för hela flödet. Låsprincipen gäller därför det som *styr* agenterna, inte bara det som *bedömer* dem.

**`design.md` förfinar sig inte själv 🔧 (medvetet avsteg från designnivå-videon 🎥):** videon låter agenten lägga till nya designvärden i `design.md` så att varje session börjar från ett mer förfinat system 🎥. Hos oss är `design.md` låst: en byggare som kan lägga till en färg kan lägga till just den färg den nyss använt — och då släpper designregelvakten igenom den. Idén att designsystemet växer är bra, men nya värden blir **förslag** som du godkänner (samma mönster som för `arbetssatt.md`, kriterier och kontroller, §10.5).
- Ändringar av `CLAUDE.md`/`AGENTS.md` sker bara via dig (ny låsning).
- `init`-kommandon från tredje part körs **på en egen gren**; ändringarna i agentinstruktionerna granskas och arbetas in manuellt innan sammanslagning.
| Hooks | `.claude/hooks/` |
| Inställningar (annars kan `deny`-reglerna tas bort) | `.claude/settings.json` |
| Granskarnas kriterier | `.claude/skills/stitch-review/`, `.claude/skills/story-review/` |
| Kodstandarden för kritikern (fas 6b) | `.claude/skills/kod-kritiker/standard.md` |
| Eval-sviten | `evals/briefs/`, `evals/kor-eval.mjs` |

### 10.2 Låsning i fyra lager 🎥 + 🔧
Videon 🎥: programmet *approve checks* flyttar kontrollerna till en låst mapp, en regel i Claude Codes inställningar hindrar agenten från att ändra mappen, och kontrollerna committas.

Vår variant 🔧:
1. **`deny`-regler** i `.claude/settings.json` för Edit/Write på alla sökvägar i tabellen ovan — inklusive `settings.json` själv.
2. **Skyddshooken** (§7.3) blockerar även Bash-kommandon som skriver till de låsta sökvägarna. Utan det går `deny` för Edit att kringgå med t.ex. `echo > fil`.
3. **Commit + kontroll av ändringar:** `scripts/godkann-kontroller.mjs` körs **av dig** efter godkännande och committar brief och kontroller. Grindhooken (§7.2) kör sedan `git diff --quiet HEAD -- <låsta sökvägar>` före varje grind. Har något ändrats sedan godkännandet → grinden fallerar och flödet sätts `blocked`.

Lager 3 är det enda som också fångar ändringar via vägar vi inte förutsett — skriptet jämför bara filernas innehåll mot den godkända versionen.

**Lager 4 — dolda kontroller 🎥 (Ouroboros, repo-videon) / 🔧 variant:** lager 1–3 hindrar byggaren från att *ändra* kontrollerna, men den kan fortfarande *läsa* dem och bygga för att klara testet i stället för att göra det rätt. Ouroboros låter aldrig byggarens instruktioner innehålla hur kontrollerna körs eller vilket resultat de förväntar sig 🎥.
- **Byggaragenterna** (fas 3, 5 och rättare) nekas **läsrätt** till `kontroller/` — via agentdefinitionens verktygsbegränsning och skyddshooken (§7.3).
- När en kontroll fallerar får byggaren **bara** kontrollens namn, en mening om vad den kontrollerar och felmeddelandet — inte testkoden.
- Grindhooken och orkestreraren kör kontrollerna som vanligt; ingenting går förlorat.
- Med låsta **och** dolda kontroller kan byggaren varken göra testet lättare eller bygga mot det. Den måste göra det briefen beskriver.
- ⚠️ Kontrollera att det går att begränsa läsrätten per agent i den Claude Code-version vi använder.

⚠️ Exakt syntax för `deny`-regler ska verifieras mot dokumentationen.

### 10.3 Körbara kontroller skrivs före bygget 🎥 + 🔧

**Kontroller åldras 🎥 (Boris Cherny-videon) / 🔧:** *en kontroll som inte kan säga nej är ingen kontroll* — och kontroller håller enligt Boris i 2–3 modellgenerationer; sedan börjar allt gå igenom 🎥. Gäller standardkontrollerna i fas 1b och eval-sviten (§9), inte en enskild sajts låsta kontroller. När en standardkontroll **inte har underkänt något på länge** (t.ex. inga fall i resultatloggen över flera sajter) prövas den: kan den fortfarande säga nej? Om inte skrivs en ny utifrån där modellen *nu* har svårt — det syns i resultatloggen och granskningsrapporterna. Byte av standardkontroller kräver ditt godkännande och ny låsning.
Videon 🎥: skillen `write-checks` skriver kontrollerna **innan** funktionen byggs, så att agenten har något att verifiera mot i stället för att bedöma sin egen kod. Agenten listar vad varje kontroll testar i enkla ord; användaren lägger till eller ändrar (i videon lades en kontroll av e-postadress till, 10 → 11 kontroller).

**Ny fas 1b — Kontroller 🔧** (mellan brief och design):
1. `write-checks` gör om briefens **mätbara** acceptanskriterier till körbara tester (t.ex. Playwright).
2. Claude listar varje kontroll i en mening.
3. Du godkänner eller ändrar → `godkann-kontroller.mjs` låser.
4. Grindarna i §7.2 för fas 3–6 kräver därefter att **alla låsta kontroller går igenom**, utöver granskarnas resultat.

**Typiska kontroller för en webbsida 🔧:**
| Kontroll | Fångar |
|---|---|
| Alla kapitel i briefen finns, i rätt ordning | Saknade delar av berättelsen |
| Ingen horisontell scroll i 375 px | Mobilfel (videon om Stitch 🎥) |
| Inga konsolfel, alla bilder laddas | Trasigt bygge |
| `prefers-reduced-motion` → inga animationer | Tillgänglighet (§4 fas 5) |
| **Hela användarflödet** (se nedan) | "Godkänd men inte inkopplad" |

**"Godkänd men inte inkopplad" 🎥:** i videon klarade en databas 10 av 10 kontroller men appen sparade aldrig något i den; en beställningsfunktion hade reglerna men inget formulär. För webbsidor 🔧 motsvaras det av sektioner som ser rätt ut medan menyn pekar fel, ankarlänkar inte når sitt kapitel eller CTA-formuläret inte skickar något. Därför ska minst en kontroll gå **hela vägen** som besökaren: öppna startsidan → scrolla genom alla kapitel → använd menyn → genomför den primära handlingen från briefen.

**Vad som inte kan låsas som kontroll:** design och berättelse — de bedöms fortfarande av granskarna (§4 fas 4 och 6). Granskarnas *kriterier* låses däremot (§10.1).

**Målstyrt utforskningstest 🎥 idé / 🔧 variant:**
De låsta kontrollerna testar det vi *förutsåg*. Ett utforskningstest hittar det vi *inte* förutsåg.
- **Videon 🎥:** en skill listar alla knappar och länkar på sidan, Jev väljer det klick som tar den närmare målet, och upprepar tills målet nås eller sidan blockerar. I videon testades att admin, chef och anställd bara nådde sina egna sidor.
- **Vår variant 🔧:** en delagent med webbläsarverktyg och ny kontext får mål ur briefen, t.ex. "ta dig från startsidan till kontaktformuläret och skicka det" eller "hitta kapitel 3 via menyn" — i både mobil- och datorbredd. Ingen Jev behövs; Claude väljer klicken.
- **Rapport, inte grind:** samma klickväg går inte att upprepa exakt, så resultatet förs in i fas 4- och fas 6-rapporterna som fynd med allvarlighetsgrad. Fynd som visar sig verkliga kan göras om till nya låsta kontroller — men bara efter ditt godkännande.
- Körs efter fas 3 och efter fas 5.

### 10.4 Resultatlogg per runda 🎥 + 🔧
Videon 🎥 sparar resultatet av varje runda i en fil — det är den auto loopen läser.

Vi 🔧 skriver en rad per runda till `sites/<namn>/resultat.jsonl`:
```json
{"fas": 4, "runda": 2, "provat": "Flyttade kapitelmarkören till höger kant i mobilbredd", "kontrollerFallna": ["ingen-horisontell-scroll-375"], "granskning": {"kritisk": 0, "hog": 1}, "beslut": "behallen", "modell": "<modell-id>", "roll": "rattare", "startad_av": "orkestrerare", "tid": "2026-10-14T14:31:00Z"}
```

**Spårbarhet 🎥 idé (Buzz-videon) / 🔧:** `roll` (byggare, granskare, rättare, kritiker, orkestrerare …) och `startad_av` (orkestrerare, hook, du) gör att man i efterhand kan se **vilken agent som gjorde vad och vem som satte igång den** — Buzz bästa egenskap 🎥, utan Buzz.

**Behåll eller ångra 🎥 + 🔧:** varje runda committas. Om en runda ger **fler** fallerade kontroller än före rundan ångras den (`git revert`) och loggas som `"beslut": "angrad"` — samma princip som Karpathys loop. I videon ångrades en runda som råkade förstöra en äldre funktion 🎥.

### 10.5 Auto loop — flödet lär sig mellan sajter 🎥 + 🔧
**Problemet 🎥:** varje runda börjar med en ny agent och samma instruktioner. Ett misstag i en runda upprepas därför i nästa — agenten "minns" inte.

**Videons lösning 🎥:** en loop ovanpå loopen läser resultatfilen, letar efter återkommande problem (samma misstag, samma lucka i två funktioner) och skriver om avsnittet *How to work* i `program.md`. Den får **aldrig** ändra kontrollerna. Exempel ur videon: efter databasfallet lade den till vanan "koppla in varje funktion i appen i samma runda som kontrollerna går igenom"; efter ett mentions-fall lade den till "hitta varje ställe där appen redan gör samma jobb och få dem att följa de nya reglerna".

**Vår variant 🔧:** körs **efter varje färdig sajt** (inte efter varje runda).
1. Läs `resultat.jsonl` och `reviews/` från de senaste sajterna.
2. Hitta mönster: samma fel i ≥ 2 sajter, eller samma fel som krävt ≥ 2 rundor.
3. Skriv varje mönster som en vana, med hänvisning till rundorna som visar det.
4. Föreslå ändring av **`arbetssatt.md`** — den enda fil auto loopen får skriva i. Byggarskills och `CLAUDE.md` hänvisar dit.
5. **Kör eval-sviten (§9)** med ändringen. Behåll den bara om måtten inte blivit sämre; annars ångra.
6. Till en början: du godkänner varje ändring av `arbetssatt.md`. Släpp på det först när eval-resultaten visat sig pålitliga.
7. **Förbättringsjournal med misslyckade försök 🎥 (loop-typvideon) / 🔧:** videons lärande loop har en `learning.md` inuti skillen — en journal över vad som prövats och vad som fungerat, runda för runda 🎥. Hos oss loggas **varje** prövad förbättring i `arbetssatt-journal.md` — även de som **ångrades** efter eval, med orsak och mätvärden. Auto loopen läser journalen innan den föreslår något, så att den inte föreslår samma misslyckade förbättring igen och betalar för en ny eval-körning varje gång.

**Struktur för `arbetssatt.md` 🎥 idé (Task Observer, Skills-videon) / 🔧:**
- **En sektion per roll eller skill** (byggare, `stitch-review`, `story-review`, kodkritiker …) i stället för en enda lista. Varje agent läser bara sin egen sektion plus de gemensamma reglerna — byggaren ser inte granskarens lärdomar och tvärtom (§5.2).
- **Gemensamma regler** som gäller alla roller i en egen sektion — Task Observer har en motsvarande fil, med exemplet att ingen skill någonsin får skriva en verklig kunds namn i en fil 🎥.
- **Lärdomar loggas löpande som förslag**, inte bara efter varje sajt: när en agent stöter på något under arbetet skrivs det till `sites/<namn>/larande-forslag.md` under rätt roll. Förslagen ändrar **ingenting** förrän auto loopen har sett samma mönster i ≥ 2 sajter och eval bekräftat det — så att *ett enda dåligt resultat inte blir en regel för alltid* 🎥.
- [Task Observer](https://github.com/rebelytics/one-skill-to-rule-them-all) kan användas för den löpande loggningen ⚠️; videon rekommenderar installation per projekt.
- **Struktur när lärdomarna växer 🔧 (OKF-videon 🎥):** beslutskartor, `arbetssatt.md`, förbättringsjournalen och resultatloggar växer med varje sajt. De organiseras som `kunskap/` (§11.6) — en lärdom per fil, `index.md`, frontmatter med roll, fas och vilka sajter som visar mönstret — så att auto loopen hittar mönster utan att läsa allt.

**Gate 4 — din slutgranskning 🎥 (Shopify-videon) / 🔧 variant:** agenter kan inte bedöma sajten ur en människas perspektiv. När fas 6b är klar (🛑 stopp 2) testar du sajten själv.
- Önskade ändringar blir **nya checkpoints** som går igenom samma grindar som allt annat. För ändringar av en sektion kan du välja mellan versioner direkt i förhandsvisningen med Variate (§6.8).
- **Förhör före slutgodkännande:** som i fas 8b — en kort sammanfattning av vad som byggts och några frågor om de riskfyllda delarna (formulär, primär handling, tredjepartstjänster), så att ditt slutgodkännande bygger på förståelse. *Lägg ut tänkandet, aldrig förståelsen* 🎥 (radera-skills-videon) — andra formuleringen av principen efter Thariqs fältguide.
- **Ultra review — manuellt tillval 🎥 (funktionsvideon):** Claude Codes *ultra review* körs i molnet, delas upp i flera grenar med oberoende verifiering av var och en och hittar djupare fel än de lokala granskningarna 🎥. **Den startas av dig och debiteras** — agenten kan inte starta den själv. Passar i stopp 2 eller före publicering för större sajter, inte i det självgående flödet.
- **Feedback knuten till element, samlad i en runda 🎥 (Claude Design-videon) / 🔧:** Claude Designs kommentarsfunktion skickar **exakt det element** man pekar på tillsammans med kommentaren, och kommentarerna **grupperas** så att allt rättas i en enda omgång 🎥. Hos oss: varje kommentar i slutgranskningen sparas med en **elementreferens** (selektor + skärmdump av elementet) och samlas i en lista; först när du är klar blir hela listan **en** ändringsomgång — inte en runda per kommentar. Det ger exakta ändringar och färre rundor genom grindarna.
- Din feedback skrivs **direkt** till `arbetssatt.md` under en egen rubrik, *Från slutgranskningar*, och läses av alla agenter innan de börjar arbeta. Den behöver inte vänta på auto loopen — en lärdom från dig är redan bekräftad.
- Auto loopen får inte ta bort eller skriva om lärdomar under den rubriken.

**Missade fynd blir förslag till kriterier 🎥 idé (Hermes-loopvideon) / 🔧:** i videon blir granskaren bättre varje gång man påpekar något den missat 🎥. Hos oss är granskarnas kriterier låsta (§10.1), så de kan inte ändras automatiskt — men lärdomen ska inte gå förlorad:
- När du (stopp 2, fas 8b) eller driften (fas 8e) hittar något som en granskare **borde ha fångat**, loggas det som **missat fynd** med vilken specialist som missade det och varför.
- Auto loopen gör om missade fynd till **förslag till nya eller skärpta kriterier**, med källa i kunskapsbasen (§11) där det finns.
- Du godkänner förslaget → kriteriet arbetas in i den låsta granskarskillen → ny låsning. Samma mönster som för `arbetssatt.md`: lärdomen *föreslås* automatiskt, men *beslutas* av dig.
- Kontroller som missats på samma sätt blir nya standardkontroller i fas 1b (fas 8e).

**Orsaksklassning — rätta processen, inte bara utfallet 🎥 (skills-videon) / 🔧:** säger man bara *"rätta det"* blir utfallet rätt men processen förblir trasig 🎥. Varje missat fynd och varje rättelse du gör klassas därför först:
| Orsak 🎥 | Rättas på minsta hållbara stället 🎥 |
|---|---|
| **Processen** var fel | Stegen i skillens `SKILL.md` |
| **Kontext** saknades (röst, varumärke, exempel) | En referensfil eller kundens faktabas (§11.8) |
| En **regel** var svag eller saknades | Ett skärpt kriterium eller en kontroll (enligt placeringsordningen, §8.7) |
| **Koden** var opålitlig | Ett låst skript (§8.8) |
- **Backa först 🎥:** när en agent missar något — t.ex. inte hittar en fil som finns — ges den inte bara rätt svar. Den ska visa *var den letade och varför den missade*, så att orsaken går att klassa 🎥.
  - ⚠️ **Handlingar, inte tänkande 📄 (Anthropic, *Prompting Claude Fable 5*):** instruktioner som ber modellen återge sitt interna resonemang som svarstext kan utlösa en vägran (`reasoning_extraction`) på Fable 5 📄. Att backa betyder därför att redovisa **handlingarna** — sökningar, sökvägar, verktygsanrop och deras resultat — vilket dokumentationen tillåter 📄. Granska även våra skills efter *visa ditt tänkande*-formuleringar vid modellbyte.
- Rättelsen är ett förslag som du godkänner (§10.1); samma uppgift körs sedan igen för att pröva rättelsen 🎥.

Auto loopen **föreslår** ett bättre arbetssätt; evalen **visar** om det blev bättre. Utan eval kan en självförbättrande loop gå åt fel håll utan att någon märker det.

### 10.6 Fler lärdomar ur videon 🎥
- **Ny byggagent per funktion** så att varje funktion får ren kontext. 🔧 För oss: valfritt en ny byggagent per kapitel i fas 3 och 5.
- **En liten bit i taget:** de kör aldrig en hel app i en enda loop, bara en funktion åt gången. 🔧 Våra faser följer redan det.
- **`project-context`-skill som minne:** bara skillens korta beskrivning ligger i kontexten; detaljerna laddas vid behov. 🔧 För oss fyller `brief.md` och `design.md` den rollen per sajt.
- **När lönar sig en loop?** Uppgiften upprepas ofta · användningsgränsen klarar tokenkostnaden · arbetet kan kontrolleras utan människa med ett tydligt mått · agenten kan köra det den byggt och se vad som går sönder. 🔧 Vårt flöde uppfyller alla fyra utom att design och berättelse bara delvis går att mäta.

---

## 11. Kunskapsbas och metodik 🔧

Kriterierna i guiden kommer hittills från **videor och skills** — från vad andra *tycker* fungerar. Det här avsnittet ger dem en **grund i etablerad litteratur**, och tar arbetssättet från [advise-project-approach](https://github.com/AaravKashyap12/advise-project-approach) 🎥 (*"AI agents should not give project advice from vibes"*): varje beslut och varje kriterium ska ha en källa.

### 11.1 Varför
1. **Kriterierna blir förklarbara.** I stället för *"tillgänglighet"* står det t.ex. *"Nielsen heuristik 5, felförebyggande: formuläret validerar innan det skickas"*. Det går att kontrollera, följa upp och förklara för kunden — viktigt eftersom vi förvaltar sajterna och får frågor om varför något ser ut som det gör.
2. **Litteraturen avgör när källorna krockar.** Videorna drar åt olika håll — t.ex. filmisk scroll (Meng To, Awwwards) mot varningar för scroll-jacking (scrollytelling-skillen, användbarhetslitteraturen).
3. **Nielsens metod passar vår arkitektur.** Heuristisk utvärdering bygger på att **flera oberoende utvärderare** hittar mer än en ensam — enligt Nielsen hittar en utvärderare runt en tredjedel av problemen och fem runt tre fjärdedelar. Det motsvarar våra isolerade granskare med ny kontext (§5.2). ⚠️ Siffrorna ska verifieras mot originalkällan när kunskapsbasen skrivs.

### 11.2 Tre villkor
1. **Källorna ligger i projektet, inte i modellens minne.** Modeller hittar ibland på citat och sidnummer (§8.6: 72,6 % påhittade svar när modellen inte vet). Därför en **kurerad kunskapsbas** i `kunskap/` med korta sammanfattningar och källhänvisningar som vi själva kontrollerat. Agenterna hänvisar *dit* — aldrig till något ur minnet. Kunskapsbasen är låst (§10.1).
2. **Heuristik är inte användartest.** En agent som gör heuristisk utvärdering hittar *troliga* problem; den ersätter inte riktiga användare. Det ska heta *heuristisk utvärdering* i rapporterna, och **verkliga besöksdata från förvaltningen (fas 8) väger tyngst** när de finns.
3. **Mätbara kriterier där det går.** Fitts lag blir *"primärknappen har minst 44 × 44 px klickyta och ligger inom tummens räckvidd i 375 px"* — inte *"tänk på Fitts lag"*. Det som går att mäta flyttas till låsta kontroller (§10.3) eller designregelvakten (§7.3); resten blir granskningskriterier med källhänvisning.

### 11.3 Kunskapsområden
| Område | Källor | Används i |
|---|---|---|
| Användbarhet | **Nielsens 10 heuristiker**; Krug, *Don't Make Me Think* | Fas 4 (beteende), fas 6 |
| Perception och layout | Gestaltlagarna; **Laws of UX** (Yablonski): Fitts, Hick, Jakobs lag, kognitiv belastning | Fas 2 (wireframes), fas 4 |
| Läsning och innehåll | Nielsen Norman Groups forskning om läsmönster och skumläsning; klarspråk; **Wikipedia-redaktörernas guide för att känna igen AI-genererad text** (Nate Herk-videon 🎥, via Humanizer) — t.ex. *"inte X utan Y"*, saker i grupper om tre, överdrivna superlativ ⚠️ verifiera aktuell version av guiden | Fas 3 (text), fas 6 (språk) |
| Tillgänglighet | **WCAG 2.2 nivå AA** | Fas 6b — förslag till svar på frågan om kodstandard i §14 |
| Formulär och konvertering | Baymard Institute (formulär); principen om en primär handling (Landing Page Design-skillen) | Fas 6, fas 7 |
| Rörelse | WCAG om rörelse och animation; `prefers-reduced-motion` | Fas 5, fas 6 |
| Projektbeslut | **advise-project-approach**: förstå målet → granska belägg → studera jämförbara lösningar → väg avvägningar → rekommendera | Fas 1 (dimma, bygga eller använda befintligt) |

### 11.4 Hur det kopplas in
- **Varje kriterium** i de låsta granskarskillsen får en **källhänvisning** till `kunskap/`.
- **Fas 6 körs som heuristisk utvärdering med 3–5 oberoende granskare**, var och en med ny kontext och utan att se de andras resultat. Orkestreraren slår ihop fynden; ett fynd som flera hittat oberoende väger tyngre.
- **Expertgranskare 🎥 idé (Karpathy-videon) / 🔧:** med expertmetoden (§11.6) byggs granskare ur en källas material — t.ex. en **Nielsen-granskare** ur NN/g:s artiklar, med en checklista där varje rad är en heuristik med citat. Specialisterna i fas 6 får på så sätt en grund i källan i stället för i modellens minne.
- **Beslutskartan** (fas 1) hänvisar till källor för sina beslut.
- **Konfliktordning:** **brief → litteratur → skill**. När två skills säger emot varandra avgör briefen; säger briefen inget, avgör litteraturen; först därefter skillen.

### 11.5 Bygga eller använda befintligt — med kostnad i tre lägen 🎥 (advise-project-approach) / 🔧
När briefen innehåller en **funktion** — bokning, chatt, nyhetsbrev, betalning, recensioner, karta — undersöks i fas 1 (dimma-steget) först om en befintlig tjänst eller ett open source-projekt redan löser den, innan något byggs.
- **Stjärnor är inte passform 🎥:** stjärnor på GitHub är ett bokmärkesantal som bara växer; de visar att någon gillade projektet en gång, inte att det passar oss. Stora projekt är stora på grund av sitt team och sina användare — skilj det som gäller oss från det som bara beror på deras storlek.
- **Kostnad i tre lägen 🎥:** vid lansering, vid normal drift och om kunden växer. Videons exempel: chattjänsten Sendbird är gratis för cirka 100 användare, Stream kostar runt 500 dollar i månaden för 10 000, och båda tar betalt per extra användare därutöver 🎥. Skillen skiljer på *gratis att börja* och *billigt att driva*.
- Beslutet och kostnaden i alla tre lägen sparas i **beslutskartan** — det är en förvaltningsfråga (fas 8), eftersom det är vi som märker när kunden växer.

### 11.6 Innehållet i `kunskap/` är ett eget arbetssteg
Sammanfattningarna kan **inte** hämtas ur modellens minne. De skrivs utifrån originalkällorna, kontrolleras av en människa och låses. Varje fil har: källa (författare, titel, år, länk), en kort sammanfattning, och de **mätbara kriterier** som följer av den. Se §15.

**Struktur enligt Open Knowledge Format 🎥 (OKF-videon) / 🔧:** en kunskapsbas som växer blir svår för agenter att hitta i — Claude söker då på nyckelord och filnamn, slösar tokens, hamnar i fel mapp och skapar dubbletter 🎥. Googles *Open Knowledge Format* (OKF), byggt på Karpathys mönster *LLM Wiki*, är en standard för hur basen organiseras 🎥:
- **En fil per begrepp** — en heuristik, ett WCAG-kriterium, en lag (minimalism 🎥).
- **`index.md` i varje mapp** som beskriver vad mappen innehåller, så att agenten vet var den ska leta innan den öppnar något 🎥.
- **YAML-frontmatter** i varje fil så att agenten bara laddar det den behöver 🎥. Hos oss 🔧: `källa`, `kriterier` (mätbara), `roller` (t.ex. konverteringsspecialisten i fas 6) och `faser`.
- Granskarna laddar då **bara sina egna filer** — specialisten för konvertering läser inte hela WCAG. Mindre tokens och mindre risk att kriterier blandas ihop.
- **En kort rad i `CLAUDE.md`:** *"Navigera kunskapsbaser via `index.md` och frontmatter — sök inte på nyckelord."* I videon var det den ändringen som fick Claude att använda strukturen i stället för att falla tillbaka på nyckelordssökning 🎥.
- Samma struktur används för kundfakta (§11.8) och för lärdomar mellan sajter (§10.5).

**Så byggs `kunskap/` — expertmetoden 🎥 (Karpathy-videon, Nate Herk) / 🔧:** videon bygger en agent ur över 700 000 ord från Andrej Karpathy i fyra steg 🎥. Samma metod används för vår kunskapsbas:
1. **Samla in råmaterial** — en agent per källa, parallellt. YouTube-undertexter hämtas med `youtube-transcript-api` och yt-dlp 🎥. Råmaterialet sparas i `kunskap/raw/<källa>/` och **rörs aldrig** — det är facit.
2. **Kompilera en wiki** enligt Karpathys *LLM Wiki*-gist (länkad i videons beskrivning) 🎥: modellen läser råmaterialet och skapar en sida per källa, sidor för ämnen, principer och metoder, länkar mellan dem, ett **index** och en **logg**. Samma struktur som OKF ovan.
3. **Ta fram regler med citat:** varje regel kopplas till **ett exakt citat och var det kommer ifrån** (med tidsstämpel för video); saknas källa måste det uttryckligen stå att regeln är *härledd* 🎥 (§11.11).
4. **Gör reglerna körbara:** en delagent med reglerna och en skill som bedömer mot en **checklista med en rad per regel** 🎥 — så byggs våra expertgranskare (§11.4).
- **Ny källa → `/ingest <länk>`** 🎥: lägger till råmaterialet, skriver en källsida och uppdaterar alla sidor källan berör — basen växer utan att skrivas om.
- **Bänken 🎥:** en regel med **bara en källa står på bänken**; den blir en riktig regel — och får bli en grind — först när en **andra oberoende källa** bekräftar den 🎥. Se §11.11.
- ⚠️ Material från andra (artiklar, transkript) används bara internt som underlag för kriterier och publiceras inte.

**Råmaterialet finns redan:** transkripten från alla videor guiden bygger på ligger i `kunskap/raw/videor/` (med index), och sammanfattningar av de två dokumenten i `kunskap/raw/dokument/` (märkta som sammanfattningar, inte originaltext).
- ⚠️ De officiella OKF-verktygen fungerade enligt videon bara med Google BigQuery; själva formatet — markdown, index och frontmatter — kan vi följa utan dem.

### 11.11 Underlag med belägg: sett, härlett, okänt — och att förstå referenser 🎥 (REA, Nate Herk-videon) / 🔧

**Principen 🎥:** i videons arbetsgång märks varje fynd som **sett** (hittat, med hänvisning), **härlett** (troligt utifrån datan, men en gissning) eller **okänt** 🎥. *Bygger man vidare på gissningar som om de vore fakta blir det rörigt* 🎥. Hos oss gäller det **allt underlag**, oavsett verktyg:
| Var | Hur |
|---|---|
| Fakta från kundens gamla sajt (fas 0b) | Bara *sett* går vidare som förslag till kunden |
| Integrationer och spårare (fas 0b) | *Härlett* kontrolleras innan bygget planeras kring det |
| Svar i dimma-steget (fas 1) | *Härlett* → domaren (§5.3) eller dig; aldrig fakta |
| Teknikbeskrivningar av referenser | *Härledda* parametrar prövas i bygget innan de låses |
Samma princip som bevis per grind (§7.2) och faktabasen (§11.8) — nu för det vi *bygger på*, inte bara det vi levererar.

**Bänken — två oberoende källor 🎥 (Karpathy-videon) / 🔧:** en regel eller ett kriterium med **en** källa står **på bänken**. Den får användas som instruktion eller granskningsförslag, men blir en **grind** (låst kontroll, låst kriterium) först när en **andra oberoende källa** bekräftar den 🎥. Gäller:
- påståenden från videor — de flesta ⚠️ i guiden är regler på bänken,
- lärdomar i auto loopen (redan ≥ 2 sajter, §10.5),
- missade fynd som föreslås bli kriterier (§10.5),
- regler i `kunskap/`.
Två videor från samma kanal räknas som *en* källa om den ena bygger på den andra.
- **Källans sammanhang 🎥 (radera-skills-videon) / 🔧:** *ta inte råd rakt av* — Boris Cherny och Karpathy talar som personer som bygger harness och arbetar i stora kodbaser, och det gäller inte automatiskt för den som gör kunskapsarbete 🎥. Varje källa märks därför med **sitt sammanhang** (t.ex. *bygger mjukvara*, *kunskapsarbete*, *byrå*, *forskning*), och ett råd väger tyngre när sammanhanget liknar vårt: vi bygger och förvaltar mjukvara åt företag. Används i konsolideringen.
- **På bänken — emotionell prompting 🎥 (radera-skills-videon):** Nate avslutar mål med *"inte en prototyp, utan testad tio gånger och redo för marknaden i morgon"* och menar att det *verkar* fungera ibland 🎥. En anekdot; prövas i eval innan den används.
- **Nya andra källor (v0.56, VAULT-videon):** *deterministisk automation där svaret är känt, AI där omdöme behövs* 🎥 (stöder §8.7 och §8.8); *transparens betyder belägg som går att granska — källor, indata, handlingar, antaganden, kontroller — inte modellens dolda tankeprocess* 🎥 (oberoende av Anthropics dokumentation i §10.5).

**REA — Reverse Engineer Anything 🎥:** [morluto/rea](https://github.com/morluto/rea) är en MCP-server som låter agenten inspektera befintlig programvara och spåra hur en funktion fungerar, och svarar **med belägg**. För webbplatser läser den **sidstruktur, skript, nätverksanrop och skärmdumpar** via en Chrome-baserad webbläsare. Installeras med `npx rea-agents setup` (Node 22+). Arbetsgång enligt videon: peka på **en funktion** — välj verktyg efter vad målet är byggt med — läs **sammanfattningen först** (Loom-analysen var över 1 GB) — märk sett/härlett/okänt — bygg om och testa 🎥. Agenten med REA blev i videon *alltid klar senare men gav bättre resultat* 🎥.

**Användning hos oss:**
1. **Kundens egen sajt (fas 0b) — full analys:** integrationer, formulärmottagare, spårare (§11.10). Inga juridiska frågetecken.
2. **Referenssajter — bara teknikbeskrivningar av enskilda effekter** (fas 1b, 2, 5): *hur* en effekt fungerar, i ord och parametrar (t.ex. *"sektionen låses i ~3 skärmhöjder, rörelsen följer scrollen, rubrikerna startar förskjutet, mjuk inbromsning"*). **Aldrig kod, grafik eller hela sidor.** Originalitetskontrollen (fas 4) gäller resultatet.
3. **Dimma-utredningar (fas 1):** t.ex. hur ett bokningssystem beter sig när det bäddas in.

**Regler och risker:**
- ⚠️ **Juridik:** kod som körs i besökarens webbläsare är synlig, men att *kopiera* kod, grafik eller skyddad design är intrång. REA:s egen ansvarsfriskrivning: för laglig forskning, interoperabilitet och programvara man äger eller har tillstånd att analysera 🎥. Inte juridisk rådgivning.
- **Säkerhet:** REA läser externt innehåll och kod — ett ställe där dold text och promptinjektion kan komma in (§7.3). Körs i **sandlåda**, med en roll med **bara läsrätt** och ingen åtkomst till hemligheter, efter **Skill Spector** och med **låst version** (§12).
- **Mer än vi behöver:** dekompilatorer och binäranalys är irrelevanta — bara webbläget används.
- **Kostnad:** analyserna kan bli stora — en funktion i taget, sammanfattningen först.
- **Pilot före införande:** REA jämförs med bara Playwright CLI (DOM, beräknade stilar, nätverk, animationer) på samma uppgift, prövat med Caliper (§9.5). REA tas in permanent bara om den strukturerade arbetsgången ger mätbart bättre underlag.

### 11.7 Spridd idégenerering 🎥 (ADHD-videon) / 🔧
Isolering har hittills bara använts för **granskning**. Den behövs också för **idégenerering**: varje val du gör (riktningar i stopp 1, wireframes, Variate-versioner) är bara meningsfullt om alternativen verkligen skiljer sig.

**Problemet 🎥:** agenter delar upp byggjobb på delagenter, men när de ska ta fram idéer gör de det i en enda kontext. Modellen tar det mönster som var vanligast i träningsdatan, och resultatet blir samma idé i flera formuleringar.

**Metoden** (efter [ADHD-skillen](https://github.com/UditAkhourii/adhd) 🎥):
1. **Förkontroll:** har problemet bara ett rätt svar (ett hexvärde, en rubrikordning)? Då körs ingen idégenerering — det vore bortkastade tokens 🎥.
2. **Isolerade agenter** får var sitt perspektiv ur ett bibliotek av vinklar och delar ingen kontext, så att idéerna inte smittar varandra 🎥.
   - **Bibliotek av perspektiv för designriktningar 🎥 (designskills-videon 2) / 🔧:** stilförinställningarna i Anthropics *frontend-design*-skill (t.ex. redaktionell, brutalistisk, lyxig) och i *Taste* (minimalistisk, industriellt brutalistisk, premium) 🎥 blir vårt bibliotek. Varje agent får **en** förinställning — tre olika förinställningar ger tre olika utgångspunkter per konstruktion. Förinställningarna väljs utifrån briefen (bransch, tonläge), och kritikern kontrollerar att resultaten fortfarande skiljer sig.
3. Varje agent tvingas **förbi sina tre första svar** — de är de som vilken seniorutvecklare som helst kommer på direkt 🎥.
4. En **kritiker** poängsätter allt på **nyhet, genomförbarhet och passform** (förkortat t.ex. N9 V8 F10), med en skeptisk hållning och en lista över vanliga fällor, och prioriterar det som inte är självklart 🎥. 🔧 Hos oss bedöms passform mot **briefen** och kunskapsbasen (§11), och kritikern kontrollerar dessutom att de valda alternativen **skiljer sig från varandra**.
5. Metoden **planerar, den bygger inte** 🎥 — det valda alternativet går tillbaka in i flödet.

**Används i:** designriktningar (fas 1b), kantfall till kontroller (fas 1b), wireframes (fas 2) och versioner i Variate (§6.8).

### 11.8 Kundfakta per sajt 🔧 (struktur efter OKF-videon 🎥)
Faktakontrollen (fas 6) har hittills kontrollerat påståenden mot **briefen**. Men briefen är ett planeringsdokument, inte en faktabas — och i förvaltningen ändras fakta: öppettider, priser, personal, tjänster, adresser.

**`sites/<namn>/fakta/`** — en faktabas per kund, strukturerad som `kunskap/` (§11.6):
- **Ett faktum per fil** med frontmatter: `kalla` (kunden, datum, hur det bekräftades), `giltigt_fran`, och `anvands_pa` (vilka sidor eller kapitel som visar det).
- `index.md` med en översikt.
- Skapas i fas 1 utifrån intervjun och kundens material; varje faktum bekräftas av kunden.

**Används av:**
- **Byggarna** (fas 3): texter får bara innehålla fakta som finns här — regeln i §8.6 gäller nu faktabasen, inte bara briefen.
- **Faktakontrollen** (fas 6): varje påstående på sajten jämförs med faktabasen; saknas det = `kritisk`.
- **Förvaltningen** (fas 8b): en ändrad öppettid uppdaterar **en fil**; kontrollen hittar sedan varje sida som inte följt med.
- **Skydd mot påhittade fakta** (§8.6): en agent kan bara hänvisa till fakta som finns.

Faktabasen är kundens innehåll och kan innehålla personuppgifter (t.ex. namn på personal) — den hanteras enligt hemlighets- och behörighetsreglerna (§7.3, fas 8d) och publiceras aldrig som den är.

### 11.9 Bildstrategi 🔧 (utifrån designskills-videon 2 🎥)
Guiden har hittills inte sagt något om **var sajternas bilder kommer ifrån**. Källorna finns: Stitch har en inbyggd bildgenerator (Stitch-videon 🎥), verktyg som Higgsfield ger AI-bilder och video direkt från agenten (designskills-videon 2 🎥), och kunden har ofta egna foton.

**1. Källa per bild** — dokumenteras i faktabasen (§11.8), en post per bild: `kalla` (kundens foto / licensierad / AI-genererad), `licens`, `foreställer`, `anvands_pa`. Stitch genererar själv bilder under designen (Nano Banana) 🎥 (Stitch-skills-videon) — de räknas som AI-genererade och följer ärlighetsregeln nedan.

**2. Ärlighetsregel ⚠️:** genererade bilder får **aldrig föreställa verkliga personer, lokaler, produkter eller resultat som om de vore äkta**. Ett genererat "vårt team", "vår salong" eller "före och efter" är ett påhittat faktum — samma sak som en påhittad kundsiffra (§8.6). Genererade bilder får användas för **stämning, illustration och abstrakta motiv**. Fångas av faktakontrollen i fas 6.

**3. Licens:** varje bild har en känd rätt att användas. Bilder utan dokumenterad licens används inte.

**4. Tillgänglighet och prestanda:** alt-texter enligt WCAG (§11.3) skrivs när bilden läggs in; bildformat, storlek och lat laddning kontrolleras i fas 6b. **Mätbart krav 📄 ("$10K Website Kit"):** bilder beskurna till sin visade storlek och konverterade till **WebP under 200 KB** — en låst kontroll.

**5. Saknas bilder** som bara kunden kan ta (personal, lokal, arbeten): platshållare + `blocked`-fråga till kunden — inte en genererad ersättare.

---

### 11.10 Samtycke och integritet (EU/Sverige) 📄 ("Websites for Normal People") / 🔧
⚠️ **Inte juridisk rådgivning.** Avsnittet beskriver vad flödet ska hantera; tolkningen kontrolleras mot Integritetsskyddsmyndighetens (IMY) vägledning och vid behov med jurist innan första kundleverans.

Dokumentet tar upp Consent Mode v2 och samtyckesbanners, men utgår från kanadensisk lag 📄. Våra kunder är svenska, så **EU:s dataskyddsförordning (GDPR)** och de svenska reglerna om kakor (lagen om elektronisk kommunikation) gäller. Guiden har hittills saknat detta helt.

| Område | Vad flödet gör 🔧 |
|---|---|
| **Kakor och spårning** | Statistik- och marknadsföringskakor (t.ex. GA4) laddas **först efter samtycke**. Samtyckesbanner med lika lätta val att godkänna och neka. **Consent Mode v2** för Google-taggar 📄. Nödvändiga kakor kräver inte samtycke |
| **Integritetspolicy** | Varje sajt får en integritetspolicy byggd ur faktabasen: vem som är personuppgiftsansvarig (kunden), vilka uppgifter som samlas in (formulär, statistik), varför, hur länge, mottagare, och den registrerades rättigheter |
| **Formulär** | Bara de uppgifter som behövs; information om behandlingen vid formuläret; lagringstid bestämd; inskick lagras säkert (fas 3) |
| **Personuppgiftsbiträdesavtal** | Vi behandlar personuppgifter för kundens räkning (formulärinskick, statistik) — ett **biträdesavtal** med kunden ingår i onboardingen (fas 0) |
| **Tredjepartstjänster** | Varje tjänst som tar emot besökardata (formulärtjänst, analys, karta, typsnitt från extern server) listas i integritetspolicyn; överföringar utanför EU/EES bedöms |

**Låsta kontroller (fas 6c, fas 7):**
- Inga statistik- eller marknadsföringskakor sätts och inga sådana anrop görs **innan** samtycke (testas i webbläsare utan samtycke).
- Banner finns med neka-val på samma nivå som godkänn-val.
- Integritetspolicy finns och länkas från alla sidor och från formulären.
- Typsnitt och andra resurser laddas helst från egen domän, så att besökares IP-adresser inte skickas till tredje part i onödan.

### 11.12 Research med linser 📄 (STORM, Shao m.fl., NAACL 2024) / 🎥 (STORM-videon) / 🔧
Byggflödet har många granskare, men researchen — om branschen, konkurrenterna och vad kunderna söker — har hittills saknat metod. En enda prompt ger en enda vinkel med dess blinda fläckar 🎥.

**Källan:** STORM från Stanford ([arXiv 2402.14207](https://arxiv.org/abs/2402.14207)) skriver Wikipedia-liknande artiklar genom att först hitta **flera perspektiv** och sedan låta dem ställa frågor som besvaras ur källor. I artikelns utvärdering bedömdes en **25 % (absolut) större andel** av STORMs artiklar som välorganiserade, och bredden var 10 % bättre, jämfört med baslinjer 📄 (Shao m.fl., NAACL 2024). ⚠️ Nates skill är **inte** STORM utan en egen tolkning: fem fasta linser, en karta över motsägelser och en granskning efteråt 🎥. Artikelns resultat gäller alltså inte hans variant, och hans jämförelse med Claudes Deep Research är en enda körning med Codex som domare 🎥.

**Vår variant 🔧** — används för branschresearch inför intervjun (fas 0), för nischen (§15.4) och vid ombyggnad (fas 0b):
1. **Avgränsa ämnet** — är det för vagt ställer skillen först några frågor 🎥.
2. **Linser parallellt**, var och en som delagent med ny kontext: **slutkunden** som söker tjänsten, **ägaren**, **konkurrenten**, **sökmotorn och AI-assistenten** (SEO/AEO) och **skeptikern**. Linserna anpassas per bransch.
3. **Karta över motsägelser 🎥:** var är linserna oense, och vilken har starkast belägg?
4. **Sammanställning** med **tillförlitlighet per slutsats** och vilka linser som stöder respektive ifrågasätter den 🎥.
5. **Kontroll av varje källa** mot originalet, märkt *bekräftad*, *rättad* eller *nedgraderad* 🎥 — samma märkning som §11.11 (*sett, härlett, okänt*).
6. **Vilken lins saknas? 🎥** I Nates körning påpekade rapporten själv att *alla fem linser såg saken från ägarens stol — ingen från kundens eller den anställdas* 🎥. Den saknade linsen körs i en ny version.

**Gräns:** researchen ger **sammanhang om branschen**. **Fakta om kunden** — tjänster, priser, personal, öppettider — kommer bara från kunden och faktabasen (§11.8). En slutsats ur researchen förs aldrig in i faktabasen.

**Vilken lins saknas — som allmän regel 🎥 (STORM-videon) / 🔧:** varje granskning med flera perspektiv avslutas med frågan *vilket perspektiv saknas?* — specialisterna i fas 6, spridd idégenerering (§11.7) och granskningen av planen (fas 1b). Svaret loggas; återkommer samma saknade lins kan den bli en ny specialist, via förslag och ditt beslut.

---

## 12. Skills att skapa

**Granskningsverktyg ur "$10K Website Kit" 📄:** [Impeccable](https://github.com/pbakaus/impeccable) (Paul Bakaus) har 24 granskningskommandon — de vanligaste är *critique, audit, layout, typeset, polish* 📄 — och Emils skills `improve-animations`, `review-animations` och `break-ui` 📄. Tillval vars kriterier arbetas in i de låsta granskarskillsen (princip 1 nedan) ⚠️. Dokumentet nämner också att Taste-skillen har **reglage** för variation, rörelseintensitet och visuell täthet (1–10) 📄 — de kan användas som parametrar i perspektivbiblioteket (§11.7).

**Så skapar vi våra egna skills 🎥 idé (Skillify, Boris-skills-videon) / 🔧:** guiden listar ett trettiotal egna skills men inte *hur* de skrivs. Skillify — en intern Anthropic-skill — gör om en hel session till en återanvändbar skill: den identifierar processen, verktygen, behörigheterna och agenterna, ställer följdfrågor och tar fram ett utkast till `SKILL.md` som du granskar 🎥. Vår metod:
1. **Kör processen manuellt tillsammans med Claude** första gången (t.ex. den första sajten, den första ombyggnaden, den första granskningen).
2. Låt Claude göra om sessionen till ett **utkast till skill** (med den publika *skill-creator*).
3. **Du granskar** utkastet.
4. **Prövas med eval / Caliper** (§9, §9.5).
5. **Läggs in i det versionerade pluginet** (§8.8) och rullas ut stegvis.
Samma princip som allt annat: *agenten föreslår, du beslutar, sedan låses det*. Skills grundas i hur vi faktiskt arbetar i stället för i hur vi tror att vi arbetar.

**Förbud är erfarenhet i skriftlig form 🎥 (5000-timmarsvideon) / 📄 (Anthropic):** Nate skriver många *"gör inte"* i sina skills — *listan är mina misslyckanden nedskrivna, sådant en nybörjare inte vet att lägga till* 🎥 — och Anthropics dokumentation gör detsamma (*"Don't add features, refactor, or introduce abstractions beyond what the task requires"* 📄, *Prompting Claude Fable 5*). Det krockar inte med *vad, men inte hur* nedan: förbud är **begränsningar** och behålls; det är **arbetsgången** som prövas. Vid konsolideringen blir fallgroparna i §13 en källa till förbud i rätt skill.

**Vad, men inte hur 🎥 (context-videon) / 📄 (Anthropic) / 🔧 — lyft från bänken (v0.54):** andra oberoende källan är Anthropics egen dokumentation: *skills som utvecklats för tidigare modeller är ofta för föreskrivande för Claude Fable 5 och kan försämra kvaliteten; se över dem och överväg att ta bort äldre instruktioner om standardbeteendet är bättre* 📄 (Anthropic, *Prompting Claude Fable 5*). Regeln gäller därmed fullt ut. — i videon kördes samma uppgift med full uppsättning och helt utan. Den fulla gav rätt *varumärke* men sämre *struktur*; den tomma gav bättre struktur och bättre detaljer 🎥. Slutsats: en skill anger **syfte, identitet och begränsningar** (röst, mål, målgrupp, varumärke, vad som inte får hända) — men inte arbetsgången steg för steg, som en kapabel modell ofta klarar bättre själv. Det är samma gräns som mellan grindar och instruktioner (§8.7): brief, faktabas, `design.md` och kriterier är *vad* och behövs; detaljerade procedurer är *hur* och prövas. Testa genom att köra samma uppgift med och utan skillen (safe mode, Caliper).

**Så skrivs beskrivningen 🎥 (skills-videon) / 🔧:** en skill gör **ett** jobb. Beskrivningen säger både *vad* den gör och *när* den ska användas, med de ord en verklig person skulle använda — inte "hjälper med innehåll" utan t.ex. *"Skriver om-oss-texten utifrån kundens faktabas. Använd när sidan Om oss ska skrivas eller uppdateras."* 🎥. Prövas med testet i §8.8.

**Förbehåll 🔧:** videon bygger delvis på systemprompter ur **läckt källkod** för interna Anthropic-skills (Verify, Skillify) 🎥. Sådant material används inte — vi bygger egna varianter utifrån publika verktyg och dokumentation.

**Urvalskriterier för tillval 🔧** (idé: advise-project-approach 🎥 — stjärnor är inte passform). Ett tredjepartsverktyg tas bara in om:
1. det **passar vårt problem och vår skala** — inte bara är populärt,
2. det **underhålls** (senaste uppdateringar, öppna ärenden),
3. **licensen** tillåter vår användning,
4. **kostnaden i tre lägen** (§11.5) är rimlig,
5. **Caliper (§9.5) visar nytta** som är värd tokens,
6. det inte krockar med våra hooks, granskarisoleringen (§5.2) eller säkerhetsmodellen (§7.3, fas 8d),
7. **det har säkerhetsskannats och versionen är låst 🎥 (Skill Spector-videon) / 🔧.** Forskare skannade över 30 000 skills: mer än **en fjärdedel hade en säkerhetssårbarhet** och ungefär **1 av 20 visade tecken på att vara rent skadlig** 🎥.
   - **Skill Spector** (NVIDIA; ⚠️ videon anger ingen länk — repo-adressen ska tas fram och verifieras) skannar en skill före installation, ger en risk-poäng och pekar ut fil och rad 🎥. Den letar efter sex sorters angrepp: **dolda instruktioner** (kommentarer, osynliga tecken, kodad text), **imitation av verktyg** (t.ex. ett `read` där "a" är en kyrillisk bokstav), **skills som ljuger** om vad de gör, **stöld av inloggningsuppgifter**, **skadlig kod** (t.ex. reverse shell) och **förgiftade beroenden** (paketnamn med ett stavfel) 🎥.
   - **Båda lägena körs:** mönstermatchning *och* AI-skanning. AI-läget är avstängt från början och fångar skills som ljuger; det kräver normalt en OpenAI-nyckel, men videon kör det via **Claude Codes headless-läge** (`claude -p`) i stället 🎥.
   - Hög poäng → installeras inte. Fynd i mellanregistret granskas manuellt.
   - **Låsta versioner:** en installerad skill fixeras till en version (commit). En **uppdatering är en ny installation** och skannas igen — annars kan en ofarlig skill bli skadlig vid nästa uppdatering.
   - Samma krav för **MCP-servrar och plugins**, så långt verktyget klarar det.
   - **Exakta adresser, aldrig sökningar 📄 ("$10K Website Kit"):** installera bara från den exakta repo-adressen. Dokumentet varnar för att npm-paketet "taste-skill" kommer från *en annan* upphovsperson än den riktiga skillen 📄 — förväxlingspaket är en klassisk attack (förgiftade beroenden, Skill Spector-videon).

**Princip: en designskill per roll 🔧** (designskills-videon 🎥 visar sju samlingar med dussintals skills — fler än något flöde tål):
1. **Byggarskills och granskarskills hålls isär.** Granskarnas kriterier är låsta (§10.1); en extern granskningsskill kontrolleras och arbetas in i den låsta granskarskillen *innan* den används — den installeras inte fristående.
2. **Ett tillval åt gången**, prövat med Caliper (§9.5).
3. **Stilen kommer från briefen och den valda riktningen** (fas 1b), inte från en skill. Skills med stark egen stil (t.ex. Meng Tos filmiska mot Emils minimalistiska) används bara när briefen vill ha just den stilen — aldrig flera stilskills samtidigt.

| Skill | Källa | Status |
|---|---|---|
| `stitch` | Installeras via Stitch-CLI 🎥 | Att installera |
| `scrollytelling` | [doodledood/claude-code-plugins](https://github.com/doodledood/claude-code-plugins/blob/HEAD/claude-plugins/frontend-design/skills/scrollytelling/SKILL.md) 🎥 | Granska licens + innehåll före användning |
| `brief-interview` | Egen 🔧 | Att skriva |
| `stitch-review` | Egen — videons version ligger bakom betalvägg 🎥 | Att skriva |
| `story-review` | Egen — videons version ligger bakom betalvägg 🎥 | Att skriva |
| `write-checks` | Egen — idé ur loop-videon 🎥 (§10.3) | Att skriva |
| `auto-loop` | Egen — idé ur loop-videon 🎥 (§10.5) | Att skriva när 2–3 sajter finns |
| `checkpoint-planner` | Egen — idé ur Shopify-videon 🎥 | Planerar checkpoints för fas 3 i fas 1b |
| `planvy` | Egen — idé ur Shopify-videon 🎥 | Lokal webbsida som visar brief, kontroller och checkpoints läsbart |
| `kod-kritiker` + `kod-rattare` | Egna — idé ur Shopify-videon 🎥 | Fas 6b. Standarden låses (§10.1) |
| `hallmark` | Tredjepart — [usehallmark.com](https://www.usehallmark.com/) 🎥 | Tillval för fas 2 och 4. Granska innan installation ⚠️ |
| **Inspo** (MCP, inte skill) | Tredjepart — [Nutlope/inspo](https://github.com/Nutlope/inspo) 🎥, samma upphovsperson som Hallmark | Fas 1b och 2. Gratis, inget konto. 832 sajter / 2 320 sidor med dator- och mobilbilder, 68 komponenter, en `design.md` per sajt, 15 verktyg. Installeras enligt videon i användarscope — **lägg den i projektscope** (§8.2) ⚠️ |
| **UI Skills** (MCP) | Tredjepart — [ibelick/ui-skills](https://github.com/ibelick/ui-skills) 🎥 | Tillval fas 5 ⚠️ |
| **Caliper** | Tredjepart — [edonadei/caliper](https://github.com/edonadei/caliper) 🎥 | Eval per tillval (§9.5) ⚠️ |
| **Reticle** | Tredjepart — [reticlehq/reticle](https://github.com/reticlehq/reticle) 🎥 | Tillval: motor för beteendegranskning i fas 4 och utforskningstestet (§10.3). Ger tre utfall och kan visa vad som händer inuti sajten när något fallerar ⚠️ |
| **Anti-Slop** | Tredjepart — [dmmulroy/anti-slop](https://github.com/dmmulroy/anti-slop) 🎥 | Första sållning i fas 6b, JS/TS ⚠️ |
| **img2threejs** | Tredjepart — [img2threejs/img2threejs](https://github.com/img2threejs/img2threejs) 🎥 | Tillval fas 5 ⚠️ |
| **Chisle** | Tredjepart — [JayPokale/Chisle](https://github.com/JayPokale/Chisle) 🎥 | Tillval: kortare svar och rensad verktygsoutput via hooks (upphovspersonens test: ~1 500 → ~600 tokens). ⚠️ Kan krocka med våra egna hooks — testa tillsammans. Upphovspersonens egna siffror — se JetBrains test av liknande verktyg nedan innan det tas in |
| **Mantis** | Tredjepart — [google/mantis](https://github.com/google/mantis) 🎥 | Säkerhetsgranskning i fas 7 och schemalagt i fas 8a ⚠️ |
| ~~**RTK**~~ | Tredjepart — [rtk-ai/rtk](https://github.com/rtk-ai/rtk) 🎥 | **Nedgraderad (v0.47):** Hermes-videon lovade ~90 % mindre brus, men i JetBrains test på riktiga kodningsuppgifter **sparade RTK ingenting, och med låg effort blev uppgifterna dyrare** (Nate Herk-videon 🎥). Används inte |
| *Tokenbesparare — uppmätt* | JetBrains test enligt Nate Herk-videon 🎥 | **Caveman** sparade ~8,5 % output-tokens (utlovat 65 %). **Ponytail** sparade ~10 % per uppgift, men har en **öppen bugg på Windows** som kan stoppa varje meddelande i flera sekunder. Skillnaden mellan utlovat och uppmätt är skälet till kriterium 5 (Caliper) |
| **Codeburn** | 🎥 (Nate Herk-videon; länk saknas) | Tillval för kostnadsmätningen i eval (§9.3): visar vad tokens går till och pekar ut slöseri, t.ex. en MCP som laddas i varje meddelande men aldrig används ⚠️ |
| *Claude Mem, Context Mode* | 🎥 | **Avråds tills vidare** enligt videon: Claude Mem skickar användningsdata som standard; Context Mode har en bugg som kan bränna kvoten |
| *LLM Wiki-gist + `/ingest`* | Karpathys gist (länkad i Karpathy-videons beskrivning) 🎥 | Mönster för att bygga och uppdatera `kunskap/` (§11.6). Byggs som egen skill med Skillify-metoden ovan ⚠️ |
| **REA** | [morluto/rea](https://github.com/morluto/rea) 🎥 | Pilot: webbläget för fas 0b (integrationer, spårare) och teknikbeskrivningar av referenseffekter (§11.11). Sandlåda, läsrätt, Skill Spector, låst version; jämförs med Playwright CLI via Caliper ⚠️ |
| **Playwright CLI** | [microsoft/playwright-cli](https://github.com/microsoft/playwright-cli) 🎥 | **Rekommenderat** test- och skärmdumpsverktyg (§14): riktig webbläsare, tester som går att köra om, och som CLI dumpas inte hela sidan i kontexten 🎥 ⚠️ |
| **Humanizer** | [blader/humanizer](https://github.com/blader/humanizer) 🎥 | Tillval: texter som inte låter AI-genererade (fas 6); guiden bakom blir källa i `kunskap/` (§11.3) ⚠️ |
| **Scrollcraft** | [nateherkai/scroll-craft](https://github.com/nateherkai/scroll-craft) 🎥 | Alternativ i fas 5, med mätbar kontroll av scrollpositioner ⚠️ |
| **Claude Security** | [anthropics/claude-plugins-official … claude-security](https://github.com/anthropics/claude-plugins-official/tree/main/plugins/claude-security) 🎥 | Officiellt alternativ för säkerhetsgranskningen i fas 7 ⚠️ |
| **Addy Osmanis Agent Skills** | [addyosmani/agent-skills](https://github.com/addyosmani/agent-skills) 🎥 | Referens: `/spec`, `/plan`, `/build`. Specen frågar om kantfall som dubbelbokningar, återbetalningar och tidszoner 🎥 — frågorna tas med för **väg D** (bokning) i fas 1 |
| **Stripe Best Practices** | [stripe/ai … stripe-best-practices](https://github.com/stripe/ai/tree/main/skills/stripe-best-practices) 🎥 | För **väg C** (e-handel), om den blir aktuell ⚠️ |
| **OpenSEO**, **Google Workspace CLI** | Se fas 8a 🎥 | Tillval i förvaltningen ⚠️ |
| *Hyperframes, Apify, Expo, Supabase* | 🎥 | Hoppas över — video, scraping med risk för brott mot villkor, mobil, databas |
| *Planning with Files* | [OthmanAdi/planning-with-files](https://github.com/OthmanAdi/planning-with-files) 🎥 | **Installeras inte** — idén (hook som tvingar in planen i kontexten) är inbyggd för orkestreraren i §5.1 |
| *Delegate Skills, Agent Reach, Skill Retriever* | Hermes-videon 🎥 | Används inte: vi kör bara Claude Code; plattformsåtkomst via gratismetoder riskerar att bryta mot villkor; få skills i projektscope gör urval onödigt |
| **Emil Kowalski** (9 skills) | [emilkowalski/skills](https://github.com/emilkowalski/skills) 🎥 | *Animate* för små interaktioner i fas 5; *animation vocabulary* för att beskriva rörelse. Övriga (t.ex. *Apple design*, *design engineering*) bara om briefen motiverar ⚠️ |
| **advise-project-approach** | [AaravKashyap12/advise-project-approach](https://github.com/AaravKashyap12/advise-project-approach) 🎥 | Tillval fas 1: arbetssättet för beslut med belägg och bygga eller använda befintligt (§11.5). Innehåller ingen webbdesignmetodik — den kommer från kunskapsbasen (§11) ⚠️ |
| *neuroarxiv* | [UditAkhourii/neuroarxiv](https://github.com/UditAkhourii/neuroarxiv) 🎥 | Används inte — söker forskningsartiklar för sådant ingen byggt än; landningssidor kräver inte det |
| **Googles Stitch-skills** | [google-labs-code/stitch-skills](https://github.com/google-labs-code/stitch-skills) 🎥 | **Förstahandsval** för fas 2: `design.md`-mall, Enhanced Prompt, design.md-skill; React/shadcn beroende på stack (§2) ⚠️ |
| **design-md-planner** | [ailabs-393/design-md-planner](https://github.com/ailabs-393/design-md-planner) 🎥 | Tillval fas 2: intervjuar, planerar visuell identitet, skriver och **validerar** `design.md` mot Googles format, med referenser mot AI-slop ⚠️ |
| *Claude Design* | Anthropic 🎥 | **Används inte som designmotor** — beslut 2026-10-14. Stitch förblir designmotorn. Idéerna ur videon (wireframes först, validering och visualisering av `design.md`, elementknuten feedback) är inbyggda i fas 2 och stopp 2 |
| **Tastemaker** | [codeswithroh/tastemaker](https://github.com/codeswithroh/tastemaker) 🎥 | Fas 1b/2: exakta designvärden ur referensbilder via skript ⚠️ |
| **Landing Page Design** | [elayadesign/ai-design-skills](https://github.com/elayadesign/ai-design-skills) 🎥 | Kriteriet för primär handling i fas 6 (inarbetat i den låsta granskarskillen) ⚠️ |
| **Jakub Krehel** | [jakubkrehel/skills](https://github.com/jakubkrehel/skills) 🎥 | *Better layout*-kriterier i fas 4 (inarbetade i granskarskillen) ⚠️ |
| **designer-skills** | [Owl-Listener/designer-skills](https://github.com/Owl-Listener/designer-skills) 🎥 | *Screen critique* och *perception laws* som kriterier i fas 4 och 6 (inarbetade) ⚠️ |
| **Meng To** | [MengTo/Skills](https://github.com/MengTo/Skills) 🎥 | *Awwwards quality sites* som kriterier i fas 6; *video to super prompt* för referenser i fas 1 ⚠️ |
| *garden-skills* | [ConardLi/garden-skills](https://github.com/ConardLi/garden-skills) 🎥 | Hoppas över — *web design engineer* överlappar Inspo och våra granskare |
| **Paseo** (app) | [paseo.sh](https://paseo.sh/) 🎥 | Tillval: styra flödet från mobilen (§5.1) ⚠️ |
| **Vizzly** | [vizzly-testing/cli](https://github.com/vizzly-testing/cli) 🎥 | Tillval: visuell regression med pixeldiffar och godkänn/avvisa (fas 8b) ⚠️ |
| **web-design-guidelines** (Vercel Labs) | [vercel-labs/agent-skills](https://github.com/vercel-labs/agent-skills/tree/main/skills/web-design-guidelines) 🎥 | Tillval: granskning mot underhållna webbdesignriktlinjer — kriterierna arbetas in i den låsta granskarskillen (fas 4) ⚠️ |
| *Goal Buddy* | 🎥 (länk saknas i videon) | **Installeras inte** — referensarkitektur. Tillstånd i `state.yaml`, orakel, slices, roller med strikt åtkomst (domare, spanare, arbetare, projektledare) och slutrevision motsvarar redan guiden; domaren och spanaren är inbyggda i §5.3 och fas 3 |
| **Skill Spector** (NVIDIA) | 🎥 — verifiera repo-adressen | **Obligatorisk** säkerhetsskanning före varje installation och uppdatering av en skill (kriterium 7 ovan). AI-läget via `claude -p` ⚠️ |
| **frontend-design** (Anthropic) | [anthropics/claude-code … frontend-design](https://github.com/anthropics/claude-code/blob/main/plugins/frontend-design/skills/frontend-design/SKILL.md) 🎥 | Tillval: tvingar fram en riktning före kod; dess stilförinställningar ingår i perspektivbiblioteket (§11.7) ⚠️ |
| **Taste-förinställningar** | [skills.sh/leonxlnx/taste-skill](https://www.skills.sh/leonxlnx/taste-skill/minimalist-ui) 🎥 | Tillval: minimalistisk, industriellt brutalistisk m.fl. som perspektiv (§11.7). Samma upphovsperson som Unlazy ⚠️ |
| **UI UX Pro Max** | [nextlevelbuilder/ui-ux-pro-max-skill](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill) 🎥 | Tillval: palett, typsnitt och layout efter bransch — överlappar Inspo och Tastemaker; prövas med Caliper ⚠️ |
| *Higgsfield* | 🎥 | Bild- och videokälla inom bildstrategin (§11.9) — bara för stämning och illustration, aldrig för motiv som ska föreställa något verkligt ⚠️ |
| *shadcn, dashboard, Material 3, SwiftUI, Expo* | 🎥 | Hoppas över — funktionellt UI och mobil, inte marknadsförings-UI |
| *Astryx* (Meta) | Ingen länk i videon 🎥 | Kandidat om stacken blir React (§14): designsystem byggt för agenter, React + StyleX, 150+ komponenter, CLI med `manifest`, *vägledning före tvång*. Direkt ur lådan generiskt utseende och 16 min för en enkel sajt 🎥. `init` skriver om `CLAUDE.md` — kör på egen gren (§10.1). ⚠️ **Namnet osäkert** (beskrivningen skriver *Astryx*, undertexterna "Asterisk"/"Astrix"); verifiera namn, repo och licens |
| **Handoff** | [mattpocock/skills](https://github.com/mattpocock/skills) 🎥 | Tillval: komprimerade överlämningsdokument som pekar på filer (fas 3). Vi kan också skriva vårt eget format direkt i orkestreraren ⚠️ |
| **Docker Sandbox** | [docs.docker.com/ai/sandboxes](https://docs.docker.com/ai/sandboxes/get-started/) 🎥 | Tillval: isolering av agenter (§7.3). Videon sponsrad av Docker ⚠️ |
| *Symphony* (Claude Code-version) | [openai/symphony](https://github.com/openai/symphony), [gherghett/ClaudeCodePSymphony](https://github.com/gherghett/ClaudeCodePSymphony) 🎥 | Tillval: ändringskön som GitHub-ärenden (fas 8b) ⚠️ |
| **ADHD** | [UditAkhourii/adhd](https://github.com/UditAkhourii/adhd) 🎥 | Tillval: spridd idégenerering (§11.7). Installationen hamnar i mappen `.agents` — den behöver döpas om till (eller länkas från) `.claude` för att Claude Code ska hitta skillen 🎥 ⚠️ |
| *Buzz* (Block) | 🎥 | **Används inte** — gruppchatt för agenter. Kontexten hamnar dubbelt (ett svar på en hälsning: ~31 000 tokens mot ~4 000 i terminalen 🎥), allt körs i tur och ordning, ingen kryptering och agenter kan inte begränsas. Idéerna (adversarial granskning av planen, spårbarhet per agent) är inbyggda i fas 1b och §10.4 |
| *Wayfinder* | [mattpocock/skills](https://github.com/mattpocock/skills) 🎥 | **Installeras inte i första hand** — idéerna (dimma → utredning, beslutskarta, facit) är inbyggda i fas 1 och 1b. Originalet är omfattande och anropar flera andra skills (bl.a. Grill Me); videon gjorde en egen, enklare variant ⚠️ |
| *Grill Me, GSAP, Vercel, Supabase* | [mattpocock/skills](https://github.com/mattpocock/skills), [greensock/gsap-skills](https://github.com/greensock/gsap-skills), [vercel-labs/agent-skills](https://github.com/vercel-labs/agent-skills), [supabase/agent-skills](https://github.com/supabase/agent-skills) 🎥 | Grill Me ≈ vår intervju i fas 1. GSAP-skillen kan bli aktuell i fas 5 (prövas med Caliper). Vercels deployskill passar fas 7. Supabase behövs inte för statiska sajter ⚠️ |
| **Variate** | Tredjepart — [Nutlope/variate](https://github.com/Nutlope/variate) 🎥 | Stopp 2 och fas 8b (§6.8). Får aldrig publiceras ⚠️ |
| **Task Observer** | Tredjepart — [rebelytics/one-skill-to-rule-them-all](https://github.com/rebelytics/one-skill-to-rule-them-all) 🎥 | Tillval: löpande loggning av lärdomar per skill (§10.5). Installera per projekt ⚠️ |
| *Karpathy-reglerna* | [multica-ai/andrej-karpathy-skills](https://github.com/multica-ai/andrej-karpathy-skills) 🎥 | **Installeras inte** — de fyra reglerna finns redan i §8.6, §6.5 och fas 1b |
| *Marknadsskills* | [coreyhaines31/marketingskills](https://github.com/coreyhaines31/marketingskills) 🎥 | Hoppas över tills vidare — onboarding/betalvägg/kundbortfall gäller appar. 48 skills; någon CRO- eller copyskill kan bli aktuell |
| *OpenCLI* | [jackwener/opencli](https://github.com/jackwener/opencli) 🎥 | **Används inte** — gör inloggade Chrome-konton till agentkommandon, vilket går emot fas 8d |
| **Graft** | Tredjepart — [trailhq.com/graft](https://trailhq.com/graft) 🎥 | Tillval: kunskapsgraf över koden som minskar agentens sökningar (tillverkarens test: −42 % tokens, −60 % tid). Liten nytta för små sajter, och kartlägger bara kod, inte brief/planer. Prövas med Caliper (§9.5) om fas 3 eller 5 drar mycket tokens på kodsökning. **Aldrig aktiv för granskare** — en av dess hooks lägger till kodplatser i varje prompt (§5.2) ⚠️ |
| *Ouroboros* | [Q00/ouroboros](https://github.com/Q00/ouroboros) 🎥 | **Installeras inte** — idéerna (självintervju, dolda kontroller) är redan inbyggda i fas 1 och §10.2 |
| `scroll-world` | Tredjepart — [oso95/scroll-world](https://github.com/oso95/scroll-world) 🎥 | Alternativ till scrollytelling i fas 5. Kräver videotjänst med MCP ⚠️ |

### Skelett: `stitch-review/SKILL.md` 🔧
```markdown
---
name: stitch-review
description: Jämför den byggda sajten mot Stitch-designen i alla skärmbredder. Använd efter bygget och efter varje rättningsrunda.
---
1. Läs Stitch-projektets id från CLAUDE.md och hämta designerna (DESKTOP + MOBILE).
2. Starta sajten lokalt och ta helsidesskärmdumpar i 375, 768, 1280, 1920 px.
3. Jämför per sektion: layout, avstånd, typsnitt, färger, bilder, text.
4. Kontrollera dessutom: horisontell scroll, överlappande element, avklippt text, klickytor ≥ 44 px.
5. Skriv reviews/stitch-review-<runda>.md: en tabell per bredd, fel sorterade kritisk → låg, med skärmdump-referens.
   Skriv också reviews/stitch-review-<runda>.json med antal fel per allvarlighetsgrad (läses av grindhooken, §7.2).
   Varje fynd har fälten element, skärmdump, förväntat, faktiskt, kriterium, allvar, utfall och förslag (§4 fas 4).
6. Bedöm inte animationer eller berättelse — det gör story-review.
```

### Skelett: `story-review/SKILL.md` 🔧
```markdown
---
name: story-review
description: Sträng berättelsegranskning av en scrollytelling-sajt mot brief.md. Använd efter att animationer lagts till.
---
Du är jurymedlem för ett webbdesignpris. Var sträng.
1. Läs brief.md — särskilt berättelsen och acceptanskriterierna.
2. Scrolla igenom sajten i normal och snabb takt, i dator- och mobilbredd. Testa även prefers-reduced-motion.
3. Bedöm per kapitel: flyter berättelsen härifrån till nästa? Tjänar varje animation historien? Är tempot rätt? Läses texten bra?
4. Leta särskilt efter animationsöverlast — för många samtidiga rörelser, flimmer vid snabb scroll.
5. Skriv reviews/story-review-<runda>.md: kapitel → fungerar / behöver arbete, sedan alla problem sorterade efter allvar.
   Skriv också reviews/story-review-<runda>.json med status per kapitel och antal fel per allvarlighetsgrad (läses av grindhooken, §7.2).
   Varje fynd har samma fasta fält som i stitch-review (§4 fas 4).
```

---

## 13. Fallgropar från videorna 🎥

1. **Skills i fel mapp** — Claude laddar bara från `.claude/`.
2. **Stilbyten mellan Stitch-designer** — lös med en gemensam brief.
3. **Bara datordesign** — sajten gick sönder på mobil. Granska alla bredder (🔧 och generera mobil från början).
4. **Oönskade småanimationer** från Claude under bygget.
5. **För mycket animation** — varje effekt kan se bra ut men helheten blir jobbig för ögonen.
6. **Långa körtider** — både designvarianter och animationssteget tar lång tid.
7. **Mods syns inte i VS Code-tillägget** — kör flödet i terminalen för att se panelerna. (Mod-videon)
8. **Ny mod försvinner** efter sessionen om den inte installeras. (Mod-videon)
9. **Claude säger "klar" för tidigt** — grindar måste kontrolleras utanför Claude. (Jev-videon)
10. **Skyddsvakter kan stoppa nödvändiga raderingar** — avgränsa till projektets egen mapp. (Jev-videon)
11. **Nya meddelanden mitt i arbetet** kan få Claude att jobba på två saker samtidigt. (Jev-videon)
12. **Gamla `/init` fyller `CLAUDE.md`** med sådant agenten kan läsa i koden. (Inställningsvideon)
13. **Instruktioner blir inaktuella** när nya modeller kommer och försämrar då svaren. (Inställningsvideon)
14. **En väntande fråga stoppar en obevakad session** tills någon svarar. (Inställningsvideon)
15. **Agenten kan göra sina egna kontroller lättare** om de inte är låsta. (Loop-videon)
16. **Kontrollerna går igenom men funktionen är inte inkopplad.** (Loop-videon)
17. **Samma misstag upprepas** när varje runda börjar med ny agent och samma instruktioner. (Loop-videon)
18. **Modellen återgår till sina egna färger och typsnitt** trots designskills — styr dem med `design.md`. (Opus 5.5-videon)
19. **Beskuren datorversion på mobil** — planera mobilt innehåll separat. (Opus 5.5-videon)
20. **Formulär är den vanligaste säkerhetsrisken** på en landningssida. (Opus 5.5-videon)
21. **Full granskning av varje liten ändring** gör rättningsloopar långsamma och dyra. (Jev-uppföljningen)
22. **Instruktioner i CLAUDE.md följs oftast men inte alltid** — regler som måste gälla varje gång hör hemma i en hook. (Jev-uppföljningen)
23. **Lång kontext försämrar kvaliteten** — agenten glömmer viktiga saker. Ny delagent per uppgift. (Shopify-videon)
24. **Planfiler i JSON är svåra för människor att granska** — visa planen i en läsbar vy. (Shopify-videon)
25. **Sajten ser rätt ut men koden är bristfällig** — kräver en egen kodgranskning. (Shopify-videon)
26. **Automatiska commits kan skicka med hemligheter** som ingen granskat — och mönstersökning missar lösenord av vanliga ord. (Agit-videon)
27. **Designskills är bara text** — de kan inte visa hur en hel sida ser ut. Ge agenten riktiga referenser. (Inspo-videon)
28. **Referenser från fel bransch** — en kaffebrief gav hälso- och företagssajter; branschfiltret löste det. (Inspo-videon)
29. **Cookie-rutor i referensbilder** täcker delar av designen, och agenten gissar då på egen hand. (Inspo-videon)
30. **Riktiga referenser ger risk för kopiering** — kontrollera originaliteten. (Inspo-videon)
31. **Byggaren bygger mot testet** om den kan läsa kontrollerna. (Repo-videon, Ouroboros)
32. **Granskaren gissar** när den bara kan välja godkänd eller underkänd. (Repo-videon, Reticle)
33. **En skill kan kosta tokens utan att hjälpa** — särskilt efter en ny modell. Skill doctor visar bara kostnaden. (Repo-videon, Caliper)
34. **Modellen stannar och frågar** i en obevakad körning om den inte får veta att ingen tittar. (Fable-videon)
35. **Modellen rättar sådant den inte ombetts röra.** (Fable-videon)
36. **Hela filer skrivs om** för små ändringar. (Fable-videon)
37. **Tyst byte till en svagare modell** när en säkerhetsspärr slår till. (Fable-videon)
38. **Påhittade fakta** när modellen inte vet. (Fable-videon)
39. **Hög effort är inte alltid bättre.** (Fable-videon)
40. **Rapporter utan länk eller skärmdump** går inte att kontrollera. (Grok Bot-videon)
41. **Delade inloggningar mellan agenter** ger varje agent åtkomst till allt. (Grok Bot-videon)
42. **Automatiska formulärtester** kan skicka testmeddelanden till kunden. (Förvaltning)
43. **Agenten bygger mer än du bett om** — extra funktioner och system för problem som inte finns. (Skills-videon, Karpathy)
44. **Ett enda dåligt resultat blir en permanent regel** om lärdomar skrivs in direkt. (Skills-videon, Task Observer)
45. **Arbetsverktyg som Variate-menyn följer med till produktion.** (Skills-videon)
46. **Orkestreraren glömmer var flödet är** i långa sessioner. (Hermes-videon)
47. **Fler skills är inte bättre** — varje skill tar kontext i varje meddelande. (Hermes-videon)
48. **Designskills med olika stil krockar** när flera används samtidigt. (Designskills-videon)
49. **Referensbilder som tolkas till text tappar detaljer** — ta ut exakta värden med skript. (Designskills-videon, Tastemaker)
50. **Sidan ser bra ut men leder inte till den primära handlingen.** (Designskills-videon)
51. **Tyst nedskärning** — agenten bygger de lätta delarna och hoppar över den svåra utan att säga det. (Unlazy-videon)
52. **Agenten kryssar i sin egen ruta** — status utan bevis. (Unlazy-videon)
53. **Uppgifter delas ut en i taget** fast de kunde köras parallellt. (Unlazy-videon)
54. **Instruktionen "var noggrann" tappas först** i en lång session — lägg kraven i filer. (Unlazy-videon)
55. **Skärmdumpar kan inte granska rörelse** — ett blinkande fel syns inte på två stillbilder. (Loop-nivåvideon)
56. **Beteendegranskaren saknar facit för tillstånd** som inte finns i den statiska designen. (Loop-nivåvideon)
57. **`/loop` och `/goal` förväxlas** — timer respektive tills-klart. (Loop-nivåvideon)
58. **Förhandsvisningslänkar läcker opublicerat innehåll** om de inte skyddas. (Loop-nivåvideon)
59. **En granskare som vet rundnumret** känner trycket att godkänna. (Gauntlet-videon)
60. **Planen ser färdig ut men har påhittade delar** där agenten gissade i stället för att utreda. (Gauntlet-videon, Wayfinder)
61. **Utan förebild hittar kritikern på en egen standard.** (Gauntlet-videon)
62. **Full design innan layouten är vald** ger lång väntan och full omgörning om den är fel. (Claude Design-videon)
63. **En felformaterad `design.md`** får vakter och granskare att läsa fel. (Claude Design-videon)
64. **En rättningsrunda per kommentar** i stället för en samlad runda. (Claude Design-videon)
65. **Popularitet tas för passform** — stjärnor på GitHub säger inget om att verktyget passar oss. (Advise-videon)
66. **"Gratis att börja" blir dyrt att driva** när kunden växer. (Advise-videon)
67. **Litteratur citerad ur minnet** kan vara påhittad — hänvisa bara till den kurerade kunskapsbasen. (§11)
68. **Oskrivna regler hos kunden** syns inte i briefen om ingen frågar varför. (FDE-videon)
69. **En sajt som konverterar till en process som inte fungerar** ger ingen effekt. (FDE-videon)
70. **Autonomi innan förtroende** — släpp stoppen först när måtten visar att steget är pålitligt. (FDE-videon)
71. **Fel i planen klarar alla grindar**, eftersom grindarna mäter mot planen. (Buzz-videon)
72. **Agenter med generiska prompter väntar på varandra** — ge varje agent en namngiven roll. (Buzz-videon)
73. **Gammal handledning står i vägen** för en ny modell. (Boris Cherny-videon)
74. **Kontroller som aldrig underkänner** har slutat vara kontroller. (Boris Cherny-videon)
75. **En inspirationsbild till generatorn ger en kopia** — beskriv i stället. (Boris Cherny-videon)
76. **Hundratals agenter som går fel** kostar hela körningen och går inte att spåra. (Boris Cherny-videon)
77. **Varianter från samma kontext är samma idé** i olika formuleringar — då är valet en illusion. (ADHD-videon)
78. **Utlovat men aldrig byggt** upptäcks inte om ingen jämför briefen med den färdiga sajten. (ADHD-videon)
79. **Parallella agenter krockar på grenar, portar och beroenden** — även när de aldrig rör samma fil. (Fleet-videon)
80. **Hela chatten som överlämning** ger nästa agent rörig och långsam kontext. (Fleet-videon)
81. **Allt slås ihop på en gång** — då syns inte vilken checkpoint som förstörde något. (Fleet-videon)
82. **En granskare med för många kriterier** blir ytlig på allt — dela på specialister. (Loop-typvideon)
83. **Misslyckade förbättringar som inte loggas** föreslås igen och igen. (Loop-typvideon)
84. **Ett `init`-kommando från tredje part skriver om `CLAUDE.md`** — och därmed reglerna för hela flödet. (Astryx-videon)
85. **Ett designsystem ger konsekvens, inte karaktär** — sajten kan följa alla regler och ändå se AI-genererad ut. (Astryx-videon)
86. **Agenten gissar kommandon och flaggor** den inte vet finns — ge den ett manifest. (Astryx-videon)
87. **Slentriangodkännande** — många PR:er gör ditt godkännande till ett klick utan förståelse. (Fable 5-videon)
88. **Högsta effort ger inget mer** än hög, men kostar mer. (Fable 5-videon)
89. **Billig modell för säkerhetsgranskning** — där kostar ett missat fel mest. (Fable 5-videon)
90. **Billiga modeller kör fast** och eskalerar till dig i onödan — låt dem rådfråga en starkare först. (Funktionsvideon)
91. **Fel upptäcks först vid grinden** medan en agent bränner tokens i en loop — bevaka under tiden. (Funktionsvideon)
92. **En växande kunskapsbas utan struktur** får agenten att söka på nyckelord, hamna fel och skapa dubbletter. (OKF-videon)
93. **Briefen som faktabas** — fakta ändras i förvaltningen, och då finns sanningen utspridd i sajtens kod. (OKF-videon)
94. **Genererade bilder som ser äkta ut** — ett AI-genererat "vårt team" är ett påhittat faktum. (Designskills-videon 2)
95. **Bilder utan känd källa eller licens.** (Designskills-videon 2)
96. **Komponentbibliotek för funktionellt UI på en marknadsföringssajt** drar mot generiskt utseende. (Designskills-videon 2)
97. **Skills installeras utan säkerhetskontroll** — mer än en fjärdedel har sårbarheter, ~1 av 20 är skadliga. (Skill Spector-videon)
98. **En skill som uppdateras automatiskt** kan bli skadlig i det tysta — lås versionen. (Skill Spector-videon)
99. **Instruktioner i externt innehåll** (referenssajter, kunddokument) följs som om de vore order. (Skill Spector-videon)
100. **Vaga fynd från granskarna** ger gissningar och fler rättningsrundor. (Hermes-loopvideon)
101. **Det granskarna missar glöms bort** om det inte blir förslag till nya kriterier. (Hermes-loopvideon)
102. **Ombyggnad som tappar gamla URL:er** — sajten blir snyggare men förlorar sina sökplaceringar. ("4 Ways"-videon)
103. **Gammalt innehåll förs över obekräftat** — det kan vara inaktuellt. ("4 Ways"-videon)
104. **Instruktioner rensas för att en ny guide säger det** — fast problemet finns kvar. ("4 Ways"-videon)
105. **Arbetsflöde för en djup uppgift** — eller goal för en bred — slösar tokens eller tappar parallellitet. (OS-videon)
106. **Planen i kontextfönstret** kan glömmas; planen i kod kan det inte. (OS-videon)
107. **Behörighetsregler utspridda över guiden** — svåra att följa och lätta att missa i en agentdefinition. Samla dem i en tabell. (Goal Buddy-videon)
108. **Riskfyllda beslut gissas** eller stoppar flödet i onödan — låt en domare avgöra dem. (Goal Buddy-videon)
109. **Antimönster som bara står som text** — gör dem till kontroller. (Designnivå-videon)
110. **En ändring i förvaltningen flyttar något ingen bett om** — jämför mot godkänd baslinje. (Designnivå-videon)
111. **En `design.md` som agenten själv fyller på** kringgår designregelvakten. (Designnivå-videon)
112. **Olika versioner av byggsystemet på olika maskiner** — paketera det som versionerat plugin. (Harness-videon)
113. **Sajtspecifika regler i rot-`CLAUDE.md`** läses av alla agenter för alla sajter. (Harness-videon)
114. **En ny version av byggsystemet rullas ut till alla sajter på en gång.** (ADLC-videon)
115. **Agenten antar att ett okänt kommando är ofarligt.** (CLAUDE.md-videon)
116. **Hårda regler begravda mitt i `CLAUDE.md`** — ordna efter prioritet. (CLAUDE.md-videon)
117. **Skills skrivna utifrån hur man tror att man arbetar** i stället för utifrån en verklig körning. (Boris-skills-videon)
118. **Exakta beskrivningar till Stitch** — den förstår stämning genom adjektiv. (Stitch-skills-videon)
119. **Redesign med andras sajter som stilguide** — risk för kopiering; bara kundens egen sajt. (Stitch-skills-videon)
120. **Lekfulla hinder före den primära handlingen.** (Jack Roberts-videon)
121. **Förvaltning som bara ser om sajten fungerar** — inte om den hittas. Koppla in Search Console. (Connectors)
122. **Ingen grundläggande SEO** — titlar, metabeskrivningar, schema och sitemap glöms bort. ("$10K Website Kit")
123. **Statistik som laddas före samtycke** — strider mot reglerna om kakor. ("Websites for Normal People")
124. **Kunders hemligheter i ett gemensamt förråd** — en agent för kund A kan nå kund B. ("Websites for Normal People")
125. **Formulär som mejlar utan att spara** — går e-posten fel är inskicket borta. ("Websites for Normal People")
126. **Publicering direkt till produktion** utan staging. ("Websites for Normal People")
127. **Förväxlingspaket** med samma namn som en känd skill. ("$10K Website Kit")
128. **Tillval tas in på utlovade siffror** — RTK lovade ~90 %, uppmätt ingen besparing. (Nate Herk-videon)
129. **Text som avslöjar AI** — "inte X utan Y", grupper om tre, superlativ. (Nate Herk-videon)
130. **Att bygga på härledda fynd som om de vore fakta.** (REA-videon)
131. **Integrationer som missas vid ombyggnad** — bokningarna slutar komma in efter lanseringen. (REA-videon)
132. **`CLAUDE.md` från andra mappar** laddas utan att någon ser det. (Context-videon)
133. **En skill med trasig frontmatter** syns aldrig för Claude — och ingen märker det. (Context-videon)
134. **Skills som styr *hur* i detalj** begränsar en kapabel modell. (Context-videon)
135. **En regel med en enda källa behandlas som säker.** (Karpathy-videon)
136. **Råmaterialet sparas inte** — då går det inte att spåra en regel tillbaka till källan. (Karpathy-videon)
137. **Cachen kallnar mitt i en lång körning** — hela kontexten måste läsas om till fullt pris. (Mods-videon 2)
138. **Kundmöte med andra kunders data synlig** på skärmen. (Mods-videon 2)
139. **Granskare av smak som aldrig kalibrerats mot din bedömning.** (Ebbelaar-intervjun)
140. **Att hoppa över steg i trappan** — sälja till företag innan flödet prövats på egna sajter. (Ebbelaar-intervjun)
141. **Hemligheter i klientkoden** — allt i webbläsaren går att inspektera. (Ebbelaar-intervjun)
142. **Spaghettikod som växer genom förvaltningens ändringar.** (Ebbelaar-intervjun)
143. **Samma kod genereras på nytt i varje bygge** — dyrt och olika varje gång. (Skills-videon)
144. **Överlappande beskrivningar av skills** — Claude gissar vilken som gäller. (Skills-videon)
145. **Att rätta utfallet men inte processen** — samma fel kommer tillbaka nästa körning. (Skills-videon)
146. **Låg effort för roller som måste söka** — modellen svarar ur minnet i stället. (Anthropics Fable 5.1-guide)
147. **Visuell granskning av en nedskalad helsidesbild** — detaljfel syns inte utan beskärning. (Anthropics Fable 5.1-guide)
148. **Statusrapporter utan belägg** i långa körningar. (Anthropics Fable 5-guide)
149. **Att be modellen återge sitt tänkande** — kan utlösa en vägran; be om handlingar och resultat. (Anthropics Fable 5-guide)
150. **Skräddarsydda åtaganden som flödet inte klarar** — varje anpassning minskar det som går att återanvända och testa. (1-person-videon)
151. **En agent som gör återbetalningar, raderingar eller avtalsändringar** i stället för att lämna ett utkast. (1-person-videon)
152. **Säljutskick utan godkännande**, eller med påståenden utan källa. (1-person-videon)
153. **En demosajt av en presumtiv kunds sajt** utan deras avtal. (1-person-videon)
154. **En självgående agent som själv tar och tolkar en uppgift med stor räckvidd** — rabattkoden till hela e-postlistan. (VAULT-videon)
155. **Massutskick via agent** till kundens kundlista. (VAULT-videon)
156. **Ändrade priser eller villkor publicerade utan godkännande.** (VAULT-videon)
157. **Att ta bort hela skills** så att varumärke och kontext försvinner — i stället för bara arbetsgången. (radera-skills-videon)
158. **Att bygga det kunden beställer utan att leta efter läckan.** (5000-timmarsvideon)
159. **Att mäta värde utan ett mål som kunden godkänt i förväg** — då finns ingen mållinje att jämföra med. (5000-timmarsvideon)
160. **Research med en enda prompt** — en vinkel, dess blinda fläckar. (STORM-videon)
161. **Research som blir kundfakta** — branschsammanhang är inte fakta om kunden. (STORM-videon)
162. **Att aldrig fråga vilket perspektiv som saknas.** (STORM-videon)
163. **Att tillskriva en tolkning originalets forskningsresultat** — Nates skill är inte STORM. (STORM-videon)

---

## 14. Öppna frågor (att bestämma tillsammans)

- [ ] **Stack för den byggda sajten:** ren HTML/CSS/JS (närmast Stitch-exporten) eller ett ramverk (t.ex. Astro/Next.js), eventuellt med komponentbibliotek? **Välj efter belägg, inte efter vana** 🎥 (Ebbelaar-intervjun: Glido fick byta stack för att de valde det de kände till; att byta språk i efterhand vill man undvika). Underlag (Astryx-videon 🎥 / 🔧):
  | | Ren HTML/CSS (Stitch-export) | Ramverk + komponentbibliotek (t.ex. Astryx, shadcn) |
  |---|---|---|
  | Närhet till designen | Hög — exporten används nästan direkt | Lägre — designen översätts till bibliotekets komponenter |
  | Tillgänglighet och tillstånd | Byggs och kontrolleras själv | Testade komponenter med tillstånd och tillgänglighet inbyggt |
  | Generiskt utseende | Styrs av Stitch och `design.md` | **Risk:** biblioteket drar mot sitt eget utseende — Astryx gav en typisk blå-svart AI-palett direkt ur lådan 🎥 |
  | Förvaltning | Enkel, inga beroenden | Biblioteksuppdateringar måste följas |
  | Ramverksfällor | — | T.ex. Astryx mall i `pages/` som krockar med Next.js `app/` 🎥 |
  | **Sorts UI** | Passar **marknadsförings-UI** — sajter som ska övertyga, där riktning och karaktär betyder mest | Byggt för **funktionellt UI** — dashboards och appar 🎥 (designskills-videon 2) |

  *Vi bygger marknadsförings-UI* (landningssidor, företagssajter). Det talar emot att låta ett komponentbibliotek styra utseendet — samma slutsats som Astryx-erfarenheten.
- [ ] **Sajttyper:** bara scrollytelling-sajter, eller även vanliga flersidiga sajter? (Då behövs fas 5–6 i alternativ variant.) Underlag 📄 ("Websites for Normal People") — fyra vägar: **A** grundsajt (formulär, e-post, analys) · **B** med CMS för kunder som själva redigerar · **C** med e-handel (Stripe Checkout) · **D** egna funktioner (bokning, evenemang, medlemskap). Med kontrollfrågan **"behöver kunden verkligen ett CMS?"** — bara om någon faktiskt kommer att redigera innehållet 📄. Vid e-handel: bevisa flödet med riktig betalning, nekat kort, avbruten kassa och kundbekräftelse 📄.
- [ ] **Nivå av autonomi:** ska designvalet i fas 2 vara automatiskt?
- [ ] **Skärmdumpsverktyg:** Playwright-skript, Chrome DevTools MCP eller annat? *Förslag (v0.47): **Playwright CLI** — CLI i stället för MCP, lättare på kontexten (§12).*
- [ ] **Stitch-autentisering i obevakat läge:** hur länge håller inloggningen? Behövs annan lösning?
- [ ] **Kostnad/kvoter i Stitch:** finns gränser för antal genereringar?
- [ ] **Publicering:** ingår deploy (fas 7) i flödet eller slutar det vid lokal sajt? Vercel eller annat?
- [ ] **Scrollytelling eller Scroll World:** båda, valbart i briefen? Vilken videotjänst och vilken budget per sajt?
- [ ] **Säkerhetsgranskning:** CodeRabbit (betalt) eller `/security-review`?
- [ ] **Hallmark:** ta med, efter granskning av skillen?
- [ ] **Inspo:** ta med i fas 1b? Vilken gräns för hur många referenser som studeras i detalj?
- [ ] **Tillval generellt:** ska varje tillval prövas med Caliper (§9.5) innan det tas in?
- [ ] **Checkpointstorlek:** hur stor är en "hel meningsfull enhet" — ett kapitel, flera kapitel? Startvärde: minst ~10 minuters verkligt arbete (Unlazy). (Fas 3, justeras med eval.)
- [ ] **Parallellitet:** hur många byggagenter samtidigt? (Kostnad och användningsgräns mot tid.)
- [ ] **Kundens godkännande av prototyp:** ska kunden alltid godkänna prototyplänken i fas 1b, eller bara vid större sajter? Var läggs förhandsvisningarna upp?
- [ ] **Förvaltning — var körs kontrollerna?** Lokalt (cron), Claude Codes schemalagda molnagenter eller annan tjänst?
- [ ] **Förvaltning — larm:** vart ska notiser gå (terminal, e-post, chatt)?
- [ ] **Förvaltning — ändringsflöde:** hur kommer kundens önskemål in, och vem skriver ändringsbriefen?
- [ ] **Förvaltning — formulärtester:** hur märks testinskick så att de inte når kunden?
- [ ] **Förvaltning — nivå:** vad ingår per kund (svarstider, antal ändringar, rapportfrekvens)?
- [ ] **Kodstandarden för fas 6b:** räcker punkterna i §4, eller ska den utgå från en etablerad standard (t.ex. WCAG 2.2 AA)? *Förslag i §11.3: WCAG 2.2 AA.*
- [ ] **Kunskapsbasen:** vilka källor ska med från start, och vem kontrollerar sammanfattningarna? (§11.6)
- [ ] **Planvyn:** egen HTML-sida, eller samma sida som flödespanelens fallback (§6.4)?
- [ ] **Licens:** granska scrollytelling-skillens licens innan vi kopierar in den.
- [ ] **Mods:** finns funktionen i användarens version, eller krävs uppdatering? Var lagras installerade mods?
- [ ] **Arbetsmiljö:** körs flödet i terminalen (krävs för mod-panelerna) eller i VS Code?
- [ ] **Förhandsvisning:** egen webbläsarflik, eller visas den inbäddad någonstans?
- [ ] **Bygg-kommando för grinden i fas 3:** beror på stackvalet.
- [ ] **Behörighetsläge:** körs flödet i auto mode eller med alla behörigheter förbigångna? Avgör hur mycket §7.3 måste bära.
- [ ] **Jev:** är en extern beslutsmodell aktuell alls, med tanke på kostnad och att data lämnar datorn?
- [ ] **Timeout-värde** för AskUserQuestion: hur länge ska flödet vänta på dig innan det väljer själv?
- [ ] **Eval-budget:** hur mycket får en svitkörning kosta? Hur ofta körs den?
- [ ] **Modeller per roll:** vilken modell för planering, bygge respektive granskning?
- [ ] **Testverktyg för kontrollerna:** Playwright eller annat? (Hänger ihop med skärmdumpsverktyget.) *Förslag (v0.47): **Playwright CLI** för låsta kontroller, utforskningstest, skärmdumpar, visuell regression och video av scrollning.*
- [ ] **Auto loopens frihet:** hur länge ska du godkänna varje ändring av `arbetssatt.md`?
- [ ] **Nisch och paket (§15):** vilken bransch och vilka kunder (smärta, person, löfte i `foretag/erbjudande.md`)? Vilka fasta paket, vad ingår i vart och ett och till vilket pris?

---

## 15. Företaget runt flödet 🎥 (1-person-videon) / 🔧

§1–14 beskriver **maskinen**: hur sajter byggs och förvaltas. Det här avsnittet beskriver **företaget runt maskinen**: erbjudandet, hur kunder och ärenden kommer in, och om ekonomin går ihop. Utgångspunkt: Nate Herks tolkning av ett intervjusvar från Anthropics vd Dario Amodei om enmansföretag. ⚠️ Nate påpekar själv att det inte är en officiell lista utan hans tolkning av exemplen i svaret 🎥.

**Filtret som berör oss 🎥:** *försäljning och kundsupport måste kunna automatiseras utan att upplevelsen blir sämre för kunden*. Det kräver ett erbjudande som är **upprepbart och nästan inte behöver anpassas**, som kunden förstår och får resultat av snabbt 🎥.

### 15.1 Standardiserade paket 🔧
Ju mer varje kund anpassas, desto mindre av flödet återanvänds: standardkontroller (fas 1b), eval (§9), kunskapsbas (§11), låsta skript (§8.8) och referenssajter. **Ett självgående flöde förutsätter ett standardiserat erbjudande.**
- Erbjudandet består av **fasta paket** med tydliga gränser för vad som ingår, t.ex. en enkel sajt, en sajt med scrollytelling och förvaltning per månad. ⚠️ Paketens innehåll och priser bestäms av dig (§14).
- Varje paket har **egna testbriefs i eval-sviten** (§9.2). Ett paket som inte går att eval-testa är inte standardiserat nog.
- **Önskemål utanför paketen blir offertärenden till dig** (§15.2), inte nya grenar i flödet. Visar samma önskemål sig hos flera kunder kan det bli en del av ett paket, via samma väg som allt annat: förslag, ditt beslut, eval, låsning.
- Hänger ihop med trappan (§5.4): vi säljer till företag, och ett löfte vi inte kan hålla är värre än ett smalt löfte.

### 15.2 Ärendeagenten — rutin går vidare, risk går till dig 🎥 / 🔧
I videon svarar supportagenten på rutinfrågor ur produktguiden. Ärenden om **återbetalning och permanent radering av konto** får ett utkast till svar och skickas till grundaren, **utan att något görs** 🎥. *Rutinfrågor flyter på; beslut om pengar och kunddata stannar hos människan* 🎥. Hos oss klassar ärendeagenten varje inkommande ärende från en förvaltningskund:
| Klass | Exempel | Vad agenten gör |
|---|---|---|
| **Rutinändring** | Ny text, ny bild, ändrade öppettider eller priser | Skriver en ändringsbrief i kön (fas 8b); ändrade fakta går till faktabasen (§11.8) |
| **Fråga** | "Hur ser jag mina besökssiffror?" | Svarar ur **kundens hjälpguide**, en låst sida per paket |
| **Hög risk** | **Priser, erbjudanden, kampanjer, rabatter och juridiska texter på sajten** (villkor, integritetspolicy; VAULT-videon 🎥), fakturor, avtal, uppsägning, begäran om radering eller utdrag av personuppgifter (§11.10), klagomål, ny funktion utanför paketet, stor omdesign | **Utkast till svar + ärendet till dig. Ingen åtgärd.** |
- **Priser, erbjudanden och juridiska texter publiceras aldrig utan ditt godkännande** — inte heller när andra stopp har släppts i pilotfasen (§5.4). Ett fel där når alla besökare och kan bli bindande.
- **Agenten skickar aldrig svar själv** till kunden i pilotfasen; varje svar är ett utkast du godkänner. Rutinsvar kan släppas fritt först enligt samma villkor som stoppen (§5.4, §9.6): mätt överensstämmelse med dina beslut.
- **Agenten har inga behörigheter** till fakturering, avtal, radering eller kundens konton (§5.2, fas 8d). Riskklassningen är alltså inte bara en instruktion utan en behörighetsgräns (§8.7).
- Ärendet sparas med klass och ditt beslut, så att klassningen kan kalibreras (§9.6).
- **Ärendet är kundens innehåll** och kan innehålla personuppgifter; det hanteras enligt §7.3 och §11.10.

### 15.3 Kundflödet — att hitta nya kunder 🎥 / 🔧
I videon hittar Clay företag som passar, Claude kontrollerar offentliga källor, förklarar varför företaget kan vara relevant och skriver ett utkast som **förblir markerat "ej skickat"** tills grundaren godkänt 🎥. *Att hitta ett relevant företag och skriva ett bra meddelande är inte detsamma som att få en kund* 🎥. Hos oss:
- **Utkast, aldrig utskick.** Agenten skickar inget; varje meddelande godkänns av dig. Samma regel som för all publicering.
- **Kvitton, inte portfolio 🎥 (5000-timmarsvideon):** *en portfolio säger "jag byggde det här"; ett kvitto säger vad det gjorde för verksamheten* 🎥. Säljmaterialet bygger på **uppmätta nordstjärnor** — baslinje och utfall — från kundsajter (**med kundens samtycke**) och från våra egna exempelsajter. Skärmdumpar av vackra sajter räcker inte; alla bygger dem nu 🎥.
- **Inga demosajter av en presumtiv kunds sajt.** Redesign görs bara av kundens *egen* sajt efter avtal (fas 0). En säljdemo visar i stället **våra egna exempelsajter**, byggda med flödet.
- **Varje påstående i utkastet har en källa** (samma regel som för rapporter, §8.6). Ett utskick som påstår något felaktigt om mottagarens sajt skadar förtroendet direkt.
- ⚠️ **Lagar:** kalla utskick regleras av bl.a. marknadsföringslagen, och kontaktuppgifter till personer är personuppgifter enligt GDPR (§11.10). Vilka utskick som är tillåtna utreds innan flödet används. Inte juridisk rådgivning.
- ⚠️ Clay är ett tredjepartsverktyg som videon har en sponsrad länk till 🎥. Prövas enligt urvalskriterierna (§12) som allt annat.

### 15.4 Smärta, person, löfte 🎥 / 🔧
Nates mall för att bestämma vad som säljs: **smärta** (det mycket specifika problemet), **person** (exakt vem som har det) och **löfte** (hur erbjudandet löser just det problemet för just den personen) 🎥. Han väljer medvetet en **smal nisch**: ett brett löfte blir generiskt, och etablerade konkurrenter har redan kunder och kapital 🎥.
- 🔧 För oss gör en nisch flödet bättre: kunskapsbasen (§11), standardkontrollerna, referenssajterna och faktafrågorna i intervjun (fas 0) blir djupare för en bransch än för alla.
- **Vilken nisch är ditt beslut** (§14). Mallen fylls i i `foretag/erbjudande.md`, och paketen (§15.1) och ärendeagentens hjälpguide utgår från den.

### 15.5 Enhetsekonomi 🎥 / 🔧
Videons räkneexempel: 499 dollar i månaden kräver 168 betalande kunder för en årlig intäkt över 1 miljon dollar, och det första målet är **fem betalande kunder** som ger återkoppling 🎥. 🔧 Hos oss:
- **Kostnad per byggd sajt och per förvaltningsmånad** mäts ur samma data som eval (§9.3): tokens, antal rundor och tredjepartstjänster. Lägg till hosting och din egen tid i stoppen.
- Kostnaden ställs mot priset per paket (§15.1). Det visar var marginalen finns och vilka steg som är värda att effektivisera, t.ex. genom att lyfta kod till skript (§8.8) eller sänka effort där eval visar att kvaliteten håller (§8.6).
- **Värdet för kunden** mäts enligt §9 (*sätt en siffra på värdet*); i förvaltningen är det rapporten med bevis (fas 8a) som kunden betalar för. Videon uttrycker samma sak: *kunden betalar inte för instrumentpanelen utan för beviset* 🎥.

---

## 16. Nästa steg

1. Skapa projektet med ny init (§8.1) och git-initiera det.
2. Verifiera Stitch-CLI:t (och vid behov Hallmark/Scroll World — läs igenom skills innan installation): installera, kör `stitch --help`, dokumentera de faktiska kommandona här (ersätt ⚠️).
3. Verifiera mods: uppdatera Claude Code vid behov, be Claude skapa en minimal testmod (t.ex. en list ovanför promptrutan med texten "hej") och bekräfta att den syns.
4. Besluta om de öppna frågorna i §14.
5. Verifiera inställningsnycklarna i §8.2 och lägg in dem i projektets `.claude/settings.json`; slå på notiser.
6. Lås formatet för `state.json` (§5.1 + `assumptions` från §6.5 + `inbox` från §7.4) och för granskarnas JSON-rapporter (§7.1).
7. Skriv `CLAUDE.md` för projektet med fasregler, stoppvillkor och regeln för meddelanden (§7.4).
8. Bygg skyddshooken (§7.3) **före** första självgående körningen, inklusive blockering av skrivning till låsta sökvägar (§10.2). Testa med ett ofarligt raderingsförsök utanför sajtmappen och ett skrivförsök till `kontroller/`.
9. Skriv den första kunskapsbasen i `kunskap/` (§11.6) — minst Nielsens heuristiker, Laws of UX och WCAG 2.2 AA — utifrån originalkällorna, kontrollera och lås.
10. Skapa `brief-interview` och testa fas 1 på en exempelsajt.
11. Skapa `write-checks` och `godkann-kontroller.mjs` (fas 1b, §10.3) och lägg in `deny`-reglerna (§10.2).
12. Skapa `checkpoint-planner` och planvyn (fas 1b), och testa stopp 1 — godkänn brief, kontroller och checkpoints i ett steg.
13. Bygg resten av skillsen i flödesordning och testa varje fas separat.
14. Lägg till designregelvakten (§7.3) när en verklig Stitch-export finns att testa undantagen mot. Bygg skriptet för granskningsdjup (§7.6) och utforskningstestet (§10.3).
15. Bygg grindhooken (§7.2) med kontroll av låsta filer (§10.2) och koppla på orkestreraren. Testa att hooken blockerar en ofullständig fas, släpper igenom vid `blocked` och fallerar om en låst fil ändrats.
16. Lägg till resultatloggen och behåll/ångra-regeln (§10.4).
17. Skriv kodstandarden och skapa `kod-kritiker` + `kod-rattare` (fas 6b). Testa att låsta kontroller körs om efter varje rättning.
18. Skriv testbriefs (§9.2) och kör första eval-svit som baslinje.
19. Bygg auto loopen (§10.5) när minst 2–3 sajter har resultatloggar.
20. Om publicering ingår: sätt upp GitHub CLI och Vercel CLI (inloggning görs av dig), och testa fas 7 på en exempelsajt med säkerhetsgranskning före deploy.
21. Bygg flödespanelen och antagandemoden när `state.json` fylls av ett verkligt flöde.

---

## Ändringslogg
| Datum | Version | Ändring |
|---|---|---|
| 2026-10-14 | 0.1 | Första utkast utifrån videon + stitchprompt.com + scrollytelling-skillen |
| 2026-10-14 | 0.2 | Nytt §6 Live-visning utifrån mod-videon; omnumrering §7–10; nya öppna frågor och steg |
| 2026-10-14 | 0.3 | Nytt §7 Säkerhet och kvalitetsvakter utifrån Jev-videon (hooks som grundnivå, Jev som tillval); omnumrering §8–11 |
| 2026-10-14 | 0.4 | Nya §8 Grundinställningar och §9 Eval för flödet utifrån inställningsvideon; omnumrering §10–13 |
| 2026-10-14 | 0.5 | Nytt §10 Låsta kontroller och självförbättring utifrån loop-videon (låsning i tre lager, fas 1b, resultatlogg, auto loop); omnumrering §11–14 |
| 2026-10-14 | 0.6 | Utifrån Opus 5.5-videon: `design.md` låses efter fas 2, Hallmark som tillval, Scroll World som alternativ i fas 5, egen gren för fas 5, ny fas 7 Publicering med säkerhetsgranskning |
| 2026-10-14 | 0.7 | Utifrån Jev-uppföljningen: designregelvakt (§7.3), nya Jev-uppgifter (§7.5), nytt §7.6 Granskningsdjup efter risk, målstyrt utforskningstest (§10.3) |
| 2026-10-14 | 0.8 | Utifrån Shopify-videon: två stopp (planvy i fas 1b + slutgranskning), checkpoints i fas 3, parallella granskare och tillståndsmatchning i fas 4, granskare utan projektinstruktioner (§5.2), ny fas 6b Kodgranskning, lärdomar från slutgranskning (§10.5) |
| 2026-10-14 | 0.9 | Utifrån Agit-videon: regel och kontroll för hemligheter i flödets filer (§7.3), Agit som tillval för felsökning (§9.3) |
| 2026-10-14 | 0.10 | Utifrån Inspo-videon: bransch i intervjun, tre designriktningar med riktiga referenser i planvyn (fas 1b), riktningen styr Stitch och `design.md` (fas 2), originalitetskontroll (fas 4), UI Skills som tillval (fas 5) |
| 2026-10-14 | 0.11 | Utifrån repo-videon: självintervju (fas 1), tre utfall i granskningar (fas 4, 6), Anti-Slop före kodkritikern (fas 6b), img2threejs (fas 5), lager 4 dolda kontroller (§10.2), nytt §9.5 Eval per tillval (Caliper), nya repon i §12 |
| 2026-10-14 | 0.12 | Utifrån Graft-videon: Graft som tillval i §12 (Caliper-prövning, aldrig för granskare) |
| 2026-10-14 | 0.13 | Utifrån Fable-videon: nytt §8.6 Promptregler och modellrisker (standardtext i byggarprompter, effort per roll, tyst modellbyte stoppar flödet, kostnad), tillåtna filer och storlek per checkpoint (fas 3), fakta- och språkkontroll (fas 6), `modell` i resultatloggen |
| 2026-10-14 | 0.14 | Ny fas 8 Förvaltning (schemalagda kontroller inkl. AEO, ändringar genom samma grindar, larm, minsta behörighet, lärdomar tillbaka till bygget); idéer delvis ur Grok Bot-videon |
| 2026-10-14 | 0.15 | Utifrån Skills-videon: nytt §6.8 Variate (stopp 2, fas 8b, får aldrig publiceras), struktur per roll och löpande förslag i `arbetssatt.md` (§10.5), regeln "bygg inte mer än uppdraget kräver" (§8.6), ärvda regler (§8.1), nya rader i §12 |
| 2026-10-14 | 0.16 | Utifrån Hermes-videon: påminnelse om tillståndet i varje tur för orkestreraren (§5.1), Mantis i fas 7 och som månatlig säkerhetsgranskning i fas 8a, RTK m.fl. i §12 |
| 2026-10-14 | 0.17 | Utifrån designskills-videon: referenser som bild/video (fas 1), Tastemaker (fas 1b/2), layout på pixelnivå och perceptionslagar (fas 4), små interaktioner med Animate (fas 5), primär handling och Awwwards-kriterier (fas 6), princip "en designskill per roll" och sju samlingar i §12 |
| 2026-10-14 | 0.18 | Utifrån Unlazy-videon: status skrivs bara av orkestreraren, bevis per grind (§7.2), övergivna grindar, täckningstabell i planvyn (fas 1b), checkpointstorlek ≥ ~10 min, beroenden och parallellt arbete med icke-överlappande fillistor (fas 3) |
| 2026-10-14 | 0.19 | Utifrån loop-nivåvideon: `design.functional.md` (fas 1b, låst), prototyplänk i mobilen och kundens godkännande, video i stället för skärmdumpar för rörelse (fas 6), optimering efter animationer (fas 5), kö för ändringar (fas 8b), `/goal` som drivare men inte grind och Paseo som tillval (§5.1) |
| 2026-10-14 | 0.20 | Utifrån gauntlet-videon: blind jämförelse mot referenser (fas 6), granskare utan rundnummer (§5.2), dimma → utredning och beslutskarta (fas 1), kostnadsreferens (§9), Wayfinder i §12 |
| 2026-10-14 | 0.21 | Utifrån Claude Design-videon: wireframes först, validering och visualisering av `design.md` (fas 2), elementknuten och samlad feedback (stopp 2, fas 8b), design-md-planner i §12. Beslut: Claude Design används inte som designmotor |
| 2026-10-14 | 0.22 | Nytt §11 Kunskapsbas och metodik (Nielsen, Laws of UX, WCAG 2.2 AA m.fl.; kurerad kunskapsbas, heuristisk utvärdering med 3–5 granskare, konfliktordning brief → litteratur → skill, bygga eller använda befintligt med kostnad i tre lägen); urvalskriterier för tillval i §12; omnumrering §12–15 |
| 2026-10-14 | 0.23 | Utifrån FDE-videon: processen bakom den primära handlingen och oskrivna regler (fas 1), pilotfas och uppdelningen människa/modell/regel (§5.4), värdemått för oss (§9.3) och för kunden (fas 8a) |
| 2026-10-14 | 0.24 | Utifrån Buzz-videon: adversarial granskning av planen före stopp 1 med annan modell som tillval (fas 1b), `roll` och `startad_av` i resultatloggen (§10.4), Buzz används inte (§12) |
| 2026-10-14 | 0.25 | Utifrån Boris Cherny-videon: rutin vid ny modell med safe mode och `/doctor` (§8.5), nytt §8.7 Grindar och instruktioner åldras olika + placeringsordning prompt → CLAUDE.md → skill → MCP → hook, kontroller åldras och förnyas (§10.3), beskrivningar i stället för bilder till generatorn (fas 2), inga dynamiska arbetsflöden för byggen (fas 3), underhållsrutiner för byggsystemet (fas 8f), reservation om promptinjektion |
| 2026-10-14 | 0.26 | Utifrån ADHD-videon: nytt §11.7 Spridd idégenerering, riktningar som verkligen skiljer sig (fas 1b), spritt pass för kantfall (fas 1b), spridda wireframes (fas 2), avstämning mellan löften och resultat före publicering (fas 7), ADHD i §12 |
| 2026-10-14 | 0.27 | Utifrån fleet-videon: isolering av miljön vid parallella checkpoints — worktree per agent, sammanslagning i tur och ordning, fast port per agent, beroenden bara i första checkpointen (fas 3); överlämningsdokument per checkpoint; agent dashboard (§6.6); sandlåda som tillval (§7.3, fas 8d); Symphony för ändringskön (fas 8b); Handoff, Docker Sandbox och Symphony i §12 |
| 2026-10-14 | 0.28 | Utifrån loop-typvideon: fas 6 som fyra specialister per aspekt, förbättringsjournal med misslyckade försök (§10.5), tokenreferens (§9) |
| 2026-10-14 | 0.29 | Utifrån Astryx-videon: `CLAUDE.md`/`AGENTS.md` låses och tredjeparts-`init` körs på egen gren (§10.1), verktygsmanifest för CLI:er som också verifierar Stitch-kommandona (§2), stacktabell med komponentbibliotek som underlag (§14), Astryx i §12 |
| 2026-10-14 | 0.30 | Utifrån Fable 5-videon: effort-tak, starkaste modellen för säkerhet och modellval efter kostnad/intelligens/smak (§8.6), Security Review GitHub Action på PR:er och parallella säkerhetsagenter (fas 7), förhör före sammanslagning (fas 8b) och före slutgodkännande (stopp 2) |
| 2026-10-14 | 0.31 | Utifrån funktionsvideon: advisor före eskalering (§5.3) och billiga byggare (§8.6), Monitor för loggar under bygget (§6.3) och nytt §7.7 Bevakning av flödet, `/simplify` och agent teams i fas 6b, Ultra review som manuellt tillval (stopp 2) |
| 2026-10-14 | 0.32 | Utifrån OKF-videon: OKF-struktur för `kunskap/` (§11.6), nytt §11.8 Kundfakta per sajt (faktakontroll, byggregel och förvaltning mot faktabasen), struktur för lärdomar (§10.5), maskinläsbar kunskap som spekulativt AEO-tillval (fas 8a) |
| 2026-10-14 | 0.33 | Utifrån designskills-videon 2: stilförinställningar som perspektivbibliotek (§11.7), marknadsförings- kontra funktionellt UI i stacktabellen (§14), nytt §11.9 Bildstrategi med ärlighetsregel (fas 1, fas 3, faktakontrollen i fas 6), nya skills i §12 |
| 2026-10-14 | 0.34 | Utifrån Skill Spector-videon: urvalskriterium 7 — säkerhetsskanning i båda lägena och låsta versioner (§12), data som stöd för reservationen (§8.7), regeln "extern text är data" (§7.3) |
| 2026-10-14 | 0.35 | Utifrån Hermes-loopvideon: fasta fält för granskarnas fynd (fas 4, 6, 6b, §12), missade fynd blir förslag till kriterier (§10.5, fas 8e), avstämning mot de fem delarna i en självgående loop (§5) |
| 2026-10-14 | 0.36 | Utifrån "4 Ways"-videon: ny fas 0b Befintlig sajt (fånga, innehåll till faktabas, URL-inventering och 301, före-mått, bara kundens egen sajt), 404-kontroll i fas 7, äldre guider och omskrivning av skills per promptguide (§8.5), motsägelse om effort (§8.6), gallerivy för varianter (fas 1b) |
| 2026-10-14 | 0.37 | Utifrån OS-videon: nyanserad regel — avgränsade arbetsflöden tillåtna, obegränsade flottor inte (fas 3); bred/djup med orkestreraren som arbetsflödesskript, scheman och återupptagning (§5.1); scheman för fasta fält (fas 4); djupresearch i dimma-steget (fas 1); OS-liknelsen som möjlig disposition för konsolideringen |
| 2026-10-14 | 0.38 | Utifrån Goal Buddy-videon: tabell över behörigheter och modell per roll (§5.2), spanaren skriver överlämningsdokument och bevis-kvitto (fas 3), domare för riskfyllda beslut mellan antagande och `blocked` (§5.3, §6.5), Goal Buddy som referensarkitektur (§12) |
| 2026-10-14 | 0.39 | Utifrån designnivå-videon: antimönster som statiska kontroller (§7.3), OKLCH och beräknade kontrastpar i `design.md` (fas 2), visuell regression mot baslinje från stopp 2 (fas 7, 8b), `design.md` förfinar sig inte själv (§10.1), Vizzly och web-design-guidelines i §12 |
| 2026-10-14 | 0.40 | Utifrån harness-videon: nytt §8.8 Byggsystemet som versionerat plugin, `CLAUDE.md` per nivå (rot ~300 rader, en per sajt) och sökvägsavgränsade skills (§8.7), ignore-filer (§7.3), Stop-hook som skriver i `CLAUDE.md` används inte, "agenten föreslår, du beslutar" som princip i konsolideringsplanen |
| 2026-10-14 | 0.41 | Utifrån ADLC-videon: stegvis lansering av pluginversioner (§8.8), ansvaret ligger hos människan (§5.4) |
| 2026-10-14 | 0.42 | Utifrån CLAUDE.md-videon: mall för `CLAUDE.md` ordnad efter prioritet (§8.7), okänt destruktivt kommando = blockerat (§7.3) |
| 2026-10-14 | 0.43 | Utifrån Boris-skills-videon: `/batch` som implementationsalternativ för parallella checkpoints (fas 3), metod för att skapa egna skills via manuell körning → utkast → granskning → eval → plugin (§12), dubbletter i ändringskön (fas 8b), förbehåll om läckt material |
| 2026-10-14 | 0.44 | Utifrån Stitch-skills-videon: Googles officiella Stitch-skills (§2, §12), Enhanced Prompt med stämningsadjektiv, redesign-regel (kundens egen sajt ja, andras nej) och annoteringar (fas 2), import av kundens designsystem (fas 0b), Stitchs bildgenerering under §11.9 |
| 2026-10-14 | 0.45 | Utifrån Jack Roberts-videon: rörlig grafik ovanpå video, X-ray som arbetsverktyg, Refero/Mobbin (fas 5), sömlösa loopar (fas 6), lekfulla hinder (fas 6). Nytt fas 8g Kopplingar per kund (Search Console, Analytics, Business Profile, PageSpeed, Resend, Firecrawl) med utredda uppgifter om officiella MCP:er, API:er och minsta behörighet |
| 2026-10-14 | 0.46 | Utifrån dokumenten "$10K Website Kit" och "Websites for Normal People": ny fas 6c SEO och lanseringskrav (Lighthouse 90+, schema, sitemap m.m.), nytt §11.10 Samtycke och integritet (EU/Sverige), kassaskåp för hemligheter per kund med bootstrap-token (§7.3), staging som fast steg (fas 7), formulär som inte tappar inskick och innehåll skilt från design (fas 3), Emils animationsregler som kontroller (fas 5), WebP < 200 KB (§11.9), `break-ui` i kantfall (fas 1b), onboarding med människans klick (fas 0), effort efter ändringsstorlek (fas 8b), vägar A–D (§14), Impeccable och förväxlingspaket (§12) |
| 2026-10-14 | 0.47 | Utifrån Nate Herk-videon: Playwright CLI som föreslaget test- och skärmdumpsverktyg (§12, §14), Humanizer och Wikipedias guide för AI-text (fas 6, §11.3), Scrollcraft (fas 5), Claude Security (fas 7), OpenSEO och Workspace CLI (fas 8a), Addys kantfallsfrågor och Stripe-skill (§12), korrigering av tokenbesparare — RTK nedgraderad, Ponytails Windows-bugg, Codeburn, Claude Mem/Context Mode avråds |
| 2026-10-14 | 0.48 | Utifrån REA-videon: nytt §11.11 Underlag med belägg (sett/härlett/okänt) och REA för att förstå referenser; integrationer, spårare och formulärmottagare vid ombyggnad (fas 0b); teknikbeskrivningar av beteende (fas 2); pilot mot Playwright CLI (§12) |
| 2026-10-14 | 0.49 | Utifrån context-videon: underlag för rensningen (Thariqs artikel, studien om längre indata, MCP vid behov) och vad `/doctor` gör (§8.5), varning för ärvda `CLAUDE.md` (§8.1), test av skills före utrullning (§8.8), schemalagd `/doctor` (fas 8f), "vad men inte hur" för egna skills (§12) |
| 2026-10-14 | 0.50 | Utifrån Karpathy-videon: expertmetoden för att bygga `kunskap/` (råmaterial → wiki → regler med citat → körbara granskare, `/ingest`), bänken med krav på två oberoende källor (§11.11), expertgranskare (§11.4), "förutsäg, kör, jämför" (§8.6), metod för konsolideringen. Råmaterialet sparat: 49 videotranskript i `kunskap/raw/videor/` och sammanfattningar av två dokument i `kunskap/raw/dokument/`. Repo: Nortropic-Builder |
| 2026-10-14 | 0.51 | Utifrån mods-videon 2 (Nate Herk): mods lyfta från bänken med två oberoende källor, levereras i plugins, syns i desktop-appen (§6.2); Goal Meter som förebild och kontext/gränser/kostnad/cacheklocka i flödespanelen (§6.4); nytt §6.9 med Replay Theater, visningsläge för kundmöten, Collision Guard och Blast Radius |
| 2026-10-14 | 0.52 | Utifrån Ebbelaar-intervjun (Nate Herk): nytt §9.6 Kalibrering av granskare mot din smak (dina beslut som data, mätt överensstämmelse, tröskel som villkor för att släppa stopp); trappan av insatser — vi står på steg 3, pilot på egna sajter, kundavtal (§5.4, fas 0); eval av full mot smal fas 1b; säkerhetsgrunder (inga hemligheter i klientkoden, 2FA, RLS och brandvägg för B–D); arkitekturgranskning med Pococks skill (fas 6b, 8f); stack efter belägg (§14) |
| 2026-10-14 | 0.53 | Utifrån skills-videon (Nate Herk om Anthropics skill-skapare): test av att rätt skill utlöses med tre testfrågor och överlappskontroll, upprepad kod lyfts till låsta skript (§8.8); regel för hur beskrivningar skrivs (§12); orsaksklassning process/kontext/regel/kod och att backa först (§10.5); andra källan för yttre bevis vid verifiering (fas 3); fallgropar 143–145 |
| 2026-10-14 | 0.54 | Utifrån Nate Herks prompting-video, med citaten kontrollerade mot Anthropics dokumentation: promptregel om belägg för varje påstående i rapporter; roller som måste söka kör lägst medium effort och har sökinstruktion (§5.2, §8.6); effortbyte per meddelande behåller cachen; beskärning i utseendegranskningen (fas 4); Anthropic som officiell källa för isolerade granskare (§5.2); *vad, men inte hur* lyft från bänken (§12); att backa = handlingar, inte tänkande (§10.5); fallgropar 146–149 |
| 2026-10-14 | 0.55 | Utifrån 1-person-videon (Nate Herk): nytt §15 Företaget runt flödet — standardiserade paket som förutsättning för självgående flöde, ärendeagent med riskklassning (rutin, fråga, hög risk; ingen åtgärd vid pengar eller data), kundflöde med utkast och utan demosajter av andras sajter, smärta–person–löfte och smal nisch, enhetsekonomi; ärendeagenten kopplad till fas 8b; Nästa steg blir §16; fallgropar 150–153 |
| 2026-10-14 | 0.56 | Utifrån VAULT-videon (Nate Herk, Goldman Sachs): principen *kan agenten göra det, anta att den gör det* (§5.2); tillsyn efter konsekvens och räckvidd med tabell, inga massutskick av agent (fas 8d); priser, erbjudanden och juridiska texter som hög risk som aldrig publiceras utan godkännande (§15.2); otydliga ändringsbriefs byggs inte (fas 8b); beslutssiffror att stickprova i rapporter (fas 8a); två nya andra källor på bänken (§11.11); fallgropar 154–156 |
| 2026-10-14 | 0.57 | Utifrån radera-skills-videon (Nate Herk, Boris Cherny hos Y Combinator): tabell över vad som behålls och vad som prövas vid rensning, halvårsvis rensningsprov även utan modellbyte (§8.5, fas 8f); *lägg ut tänkandet, aldrig förståelsen* (stopp 2); källans sammanhang och emotionell prompting på bänken (§11.11); fallgrop 157 |
| 2026-10-14 | 0.58 | Utifrån 5000-timmarsvideon (Nate Herk): stoppet eller läckan i intervjun och var besökare faller bort i fas 0b; nordstjärna med baslinje, mål och tidsram som kunden godkänner (brief 4b, fas 8a); kvitton i stället för portfolio (§15.3); förbud som begränsningar vid sidan av *vad, men inte hur* (§12); rabattkodens siffra rättad och markerad som en källa (fas 8d); fallgropar 158–159 |
| 2026-10-14 | 0.59 | Utifrån STORM-videon (Nate Herk) och STORM-artikeln (Shao m.fl., NAACL 2024, kontrollerad): nytt §11.12 Research med linser — parallella linser, karta över motsägelser, tillförlitlighet per slutsats, källkontroll, gräns mot kundfakta; *vilket perspektiv saknas?* som allmän regel (fas 6, §11.7, fas 1b); linser i konsolideringsmetoden; fallgropar 160–163 |
