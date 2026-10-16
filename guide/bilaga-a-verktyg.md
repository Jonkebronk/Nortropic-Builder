# Bilaga A – Verktyg och kandidater

**Status:** konsoliderad v1.0, 2026-10-15; nivåerna ommärkta samma dag. Register över tredjepartsverktyg, skills, MCP:er, plugins och tjänster som guiden v0.74 nämnde, sammanfört med inventeringen. Ersätter tabellen i v0.74 §12. Inget är infört, eftersom inget är byggt (`LAGE.md`).

Registret är en katalog att plocka ur när en verklig sajt behöver något, inte en byggplan (`guide/README.md`, princip 8). Egna skills står i `bilaga-b-skills.md`.

**Den första sajten** använder bara verktygen med nivå N1: Inspo när de tre minimala stilkiten tas fram, Astro, Playwright, axe och Lucide (förslag), samt Cloudflare, GitHub och Wrangler om sajten publiceras (`5-byggplan.md`, steg 2–5). Därtill Claude Codes inbyggda delagent för granskaren (steg 4). Allt annat är N2 eller senare.

**Så läses tabellerna**

- **Status:** *kandidat* = inte prövad · *prövas* = används i ett steg på nivå N1 eller N2 enligt guiden · *infört* = finns i flödet (inget än) · *avvisat* = v0.74 eller ett beslut avvisade det; skälet står.
- **Nivå:** när verktyget tidigast blir aktuellt (`README.md`, N1–N4).
- **Var:** filen i `guide/` där regeln som använder verktyget bor. `2-5` = `2-5-yta.md`, `3-2` = `3-2-granskning-och-kalibrering.md`, `4` = `4-foretaget.md`.
- **Inv:** posten i `inventering/inventering.json` (läst 2026-10-15). **B** = `befintligt` (delar ur webb-pro), **K** = `nya` (kandidater), följt av löpnumret i listan. Inventeringens förslag eller dom står i parentes. – = saknas i inventeringen. Inventeringen är inte ändrad, och inget beslut där är fattat.
- **Länk:** bara adresser ur v0.74 eller verifierade i researchen. Utan länk står bara namnet.
- **Källäge:** 🎥 = en video, alltså en källa om inget annat sägs; 📄 = primärkälla eller research; ⚠️ = overifierat. Sponsring och affiliate anges.

## Urvalskriterier

Gäller allt tredjepartsmaterial som tas in utöver N1-verktygen ovan. Kriterierna är instruktioner, inte grindar. 🔧 (idé: advise-project-approach 🎥)

- [N2] **Bygg egna och destillera ur andras.** Externa skills och MCP:er används när egna skills och biblioteket byggs. I kundbygget körs egna skills och den åtkomst som behövs vid körning, till exempel Cloudflare och Google. Varför: Johnnys beslut om egna skills och bibliotek. 📄 `BESLUT.md` 2026-10-13 18:52, `historik/karta/README.md`
- Inspo, Tastemaker och övriga designverktyg används när stilkit tas fram och förnyas, inte vid varje kundbygge (`BESLUT.md` 2026-10-15) → 2-5. I N1 tas de tre minimala kiten fram i `5-byggplan.md`, steg 2.
- [N2] **Passform före popularitet – stjärnor är inte passform.** Stjärnor på GitHub visar att någon gillade projektet en gång, inte att verktyget passar vårt problem och vår skala. Underhåll, licens och läsbara kontroller väger tyngre. Regeln bor här. 🎥 advise-videon; 📄 `kunskap/research/2026-10-15_kompetensluckor-anteckningar/lager-1-2-strategi-omfattning.md` och `lager-8-teknik-kvalitet.md` (stjärnor är en svag kvalitetssignal) (fallgrop 65)
- [N2] **Underhåll, licens och kostnad kontrolleras innan något tas in.** Senaste uppdateringar och öppna ärenden; en licens som tillåter vår användning, utan copyleft i levererad kod; kostnad i tre lägen – vid lansering, i normal drift och om kunden växer (→ `2-2-omfattning.md`). 🎥 advise-videon (fallgrop 66); intagsregeln i `historik/karta/flodet.md`
- [N2] **Ingen överlappning med en befintlig skill.** Två skills som konkurrerar om samma uppgift gör att Claude får gissa. 📄 `historik/karta/flodet.md`; 🎥 skill-ingenjörsvideon (fallgrop 144)
- [N2] **Installera inget ogranskat.** Låt Claude läsa repot före installation. Installera bara från den exakta repo-adressen, aldrig via sökning eller paketnamn: npm-paketet "taste-skill" kommer från en annan upphovsperson än den riktiga skillen. 🎥 Jack Roberts repo-video; 📄 *$10K Website Kit* (fallgrop 127)
- [N2] **Skill Spector vid varje tredjepartsinstallation** – inte som ett krav på allt annat arbete. Båda lägena körs: mönsteranalys och AI-granskning, som kan köras via `claude -p`. Hög risk-poäng: installeras inte. Fynd i mellanregistret granskas för hand. Samma sak för MCP-servrar och plugins så långt verktyget räcker. Varför: dolda instruktioner, falska bokstäver och förgiftade beroenden syns inte för en modell som läser texten. 📄 verktyget verifierat (`kunskap/research/2026-10-14_stitch-och-verktyg.md`); statistiken *mer än en fjärdedel sårbara, ungefär 1 av 20 skadliga* har en källa (🎥 Skill Spector-videon – bänken). Avgränsningen följer konsolideringsanalysen §4.2. (fallgrop 97)
- [N2] **Senaste version och verktygslås** (`BESLUT.md` 2026-10-16, *Senaste version med verktygslås …*; ersätter *Låst version*). Skills, plugins och MCP-servrar följer startsäkringen och går till senaste version (`BESLUT.md` 2026-10-15). Startsäkringen sparar varje MCP-servers verktygslista och instruktioner (`skript/mcp-verktygslas.py`) och rapporterar ändringar, som Johnny ser innan servern används, eftersom en server kan ändra sina verktyg utan ny version (📄 [MCP, Security Best Practices](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices)). En uppdatering skannas som en ny installation. En version låses bara när en uppdatering har gått sönder, med en rad i `BESLUT.md` (fallgrop 98). Det egna byggsystemets versioner → 3-4.
- [N2] **Externa granskningsskills installeras inte fristående.** Deras kriterier arbetas in i den egna granskaren (`bilaga-b-skills.md`, → 3-2).
- [N2] **Ett tillval åt gången,** så att det syns vad som gjorde skillnad. 🔧
- [N2] **Prövat med och utan på en riktig sajt** innan det tas in, eftersom utlovade siffror inte räcker (RTK-raden nedan). Regeln och provet står i 3-2; verktyg för provet är skill-creator, `claude plugin eval` och Caliper (nedan). Fallgrop 33, 128
- [N2] **Krockar inte** med våra hooks, granskarisoleringen eller säkerhetsmodellen (→ 3-1, 3-3). Kod som körs mot okänt innehåll körs i sandlåda (→ 3-3).
- **Find Skills** ([vercel-labs/skills](https://github.com/vercel-labs/skills)) används bara som sökverktyg. Allt den hittar går igenom kriterierna ovan, och inget installeras automatiskt. 🎥 Jack Roberts repo-video

## 1. Design och referenser

Används främst när stilkit och sektionsbibliotek tas fram (→ 2-4, 2-5). I N1 bara Inspo och Lucide. Licens per tillgång → 2-5.

| Verktyg | Vad | Var | Status | Nivå | Källäge och förbehåll | Inv |
|---|---|---|---|---|---|---|
| Stitch-CLI, npm `@google/stitch` | Googles design-CLI: skärmar, varianter, `design.md`, fånga en sida | – | avvisat | – | Struket 2026-10-15 (`BESLUT.md`, *Stitch stryks*). 📄 `2026-10-14_stitch-och-verktyg.md` | – (B56 *taste-stitch*: Släpp) |
| [Googles stitch-skills](https://github.com/google-labs-code/stitch-skills) | 15 skills: `design.md`-mall, Enhanced Prompt, extract-design-md m.fl. | – | avvisat | – | Struket 2026-10-15 (`BESLUT.md`, *Stitch stryks*). 📄 samma rapport | – |
| [davideast/stitch-mcp](https://github.com/davideast/stitch-mcp) | MCP för Stitch från communityn | – | avvisat | – | Inte Google (📄 samma rapport). Stitch är struket 2026-10-15 (`BESLUT.md`, *Stitch stryks*) | – |
| [Inspo](https://github.com/Nutlope/inspo) (MCP) | 832 sajter med dator- och mobilbilder, `design.md` per sajt, branschfilter | 2-5 | prövas | N1, när de tre minimala stilkiten tas fram (steg 2) | 📄 MIT; 🎥 Inspo-videon. Installeras från repo-adressen, i projektscope, inte användarscope | B65 (Byggverktyg) |
| [Tastemaker](https://github.com/codeswithroh/tastemaker) | Exakta designvärden ur referensbilder, med skript | 2-5 | kandidat | N2, stilkitsbygget | 🎥 designskills-videon; ⚠️ licensen inte kontrollerad | – |
| [Hallmark](https://www.usehallmark.com/) | Regler mot AI-utseende; kan granska ett bygge | 2-5, 3-2 | kandidat (destillera) | N2 | 📄 `Nutlope/hallmark`, MIT; innehållet inte granskat; 🎥 Opus 5.5-videon | B37 (Destillera) |
| [Variate](https://github.com/Nutlope/variate) | Välj mellan versioner av en sektion direkt i förhandsvisningen | 3-2, 2-9 | kandidat | N4 | 📄 MIT; bara för utveckling – `end` tar bort allt (stitch-och-verktyg). Får aldrig publiceras (→ 2-8). 🎥 Variate-videon; samma upphovsperson som Hallmark och Inspo | – |
| [design-md-planner](https://github.com/ailabs-393/design-md-planner) | Skriver och validerar `design.md` mot Googles format | 2-5 | kandidat | N2 | 🎥 Claude Design-videon ⚠️ | – |
| [designmd.space](https://designmd.space) | Visar `design.md` som färgprover och typsnitt | 2-5 | kandidat | N2 | 🎥 Claude Design-videon ⚠️ | – |
| Aura.build | Bibliotek med färdiga `design.md` | 2-5 | kandidat | N2 | 🎥 Opus 5.5-videon ⚠️ | – |
| Relume | Sidkarta, wireframes och stilguide med HTML-export | 2-3, 2-4 | kandidat | N2 | 🎥 Jack Roberts-videon 3, sponsrad av Relume; kompetensrapporten: Bevaka | – |
| Refero | Galleri med skärmar ur riktiga produkter | 2-4, 2-5 | kandidat | N2, biblioteksbygget | 🎥 Jack Roberts Motion Design-videon; prenumeration | B43, B63 (Destillera, Byggverktyg) |
| Mobbin | Galleri med skärmar och flöden | 2-4, 2-5 | kandidat | N2, biblioteksbygget | 🎥 samma video. Licensbeskedet i webb-pro har oifyllda platshållare – hämta skriftligt medgivande (📄 `2026-10-15_webb-pro-genomgang.md`) | B64 (Byggverktyg) |
| [21st.dev](https://21st.dev) (MCP) | Enskilda komponenter: hero, CTA, formulär, knappar | 2-4 | kandidat | N2, biblioteksbygget | 🎥 Astra-videon (en persons smak). Licens per komponent | B62 (Extrahera) |
| [godly.design](https://godly.design), Awwwards per kategori | Hela sajter som förebilder | 2-5 | kandidat | N2, stilkitsbygget | 🎥 Astra-videon | – |
| [Land-book](https://land-book.com), [Coolors](https://coolors.co) | Landningssidor; färgpaletter som redan fungerar | 2-5 | kandidat | N2, stilkitsbygget | 🎥 Jack Roberts-videon 4 | – |
| [navbar.gallery](https://navbar.gallery), [footer.design](https://footer.design), [cta.gallery](https://cta.gallery), [404s.design](https://404s.design), [unsection.com](https://unsection.com), [bentogrids.com](https://bentogrids.com) | En förebild per sektion | 2-4 | kandidat | N2, biblioteksbygget | 🎥 Jack Roberts-videon 2 | – |
| [Typewolf](https://www.typewolf.com), [Fonts In Use](https://fontsinuse.com), [WhatTheFont](https://www.myfonts.com/pages/whatthefont), [Fontshare](https://www.fontshare.com) | Inspiration, identifiering och fria typsnitt | 2-5 | kandidat | N2, stilkitsbygget | 🎥 Jack Roberts-videon 2. Fontshare styrs av ITF:s EULA, inte OFL; villkoren för självhostning är olästa (kompetensrapporten, lager 5) | – (jfr K42 OFL-listan) |
| Lucide | Ikonbibliotek, inline-SVG utan JavaScript | 2-5 | prövas | N1, kitet väljer (`BESLUT.md` 2026-10-15; bilaga E 1.10 avgjord) | ISC (inventeringen). v0.74 förbjöd Lucide, Inter och Geist som antimönster på en videos smak (🎥 designnivå-videon – bänken, analysen §4.2). Nu förbjuds sådant bara per kit (→ 2-5) | K43 (Ta in) |
| [frontend-design](https://github.com/anthropics/claude-code/blob/main/plugins/frontend-design/skills/frontend-design/SKILL.md) (Anthropic) | Tvingar fram en riktning före kod; stilförinställningar | 2-5 | kandidat (destillera) | N2 | 🎥 designskills-videon 2 | B35 (Destillera) |
| [Taste](https://www.skills.sh/leonxlnx/taste-skill/minimalist-ui) (Leonxlnx) | Stilförinställningar; reglage 1–10 för variation, rörelse och täthet | 2-5 | kandidat (destillera) | N2 | 🎥 designskills-videon 2; 📄 *$10K Website Kit* om förväxlingspaketet (se urvalet). Samma upphovsperson som Unlazy | B46–B58 (Destillera, Parkera eller Släpp per variant) |
| [UI UX Pro Max](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill) | Palett, typsnitt och layout efter bransch | 2-5 | kandidat | N2 | 🎥 designskills-videon 2; överlappar Inspo och Tastemaker | B60 (Extrahera) |
| [Aceternity UI](https://ui.aceternity.com), [React Bits](https://reactbits.dev) (MCP) | Komponenter och effekter, bland annat shaders | 2-4 | kandidat | N2 | 🎥 Jack Roberts Claude Design 3.0-videon (Higgsfield affiliate). Licens per komponent | – |
| [brandguidelines.net](https://brandguidelines.net) | Förebild för en varumärkesbok | 4 | kandidat | N3 | 🎥 Jack Roberts-videon 2. Logotyper genereras inte | – |
| Astryx (Meta) | Designsystem för agenter, React och StyleX | – | kandidat, villkoret inte uppfyllt | – | Bara om stacken blir React; förslaget är Astro (→ 2-8). 🎥 Astryx-videon; ⚠️ namn, repo och licens overifierade; dess `init` skriver om `CLAUDE.md` (fallgrop 84) | – |
| Claude Design | Anthropics designverktyg | – | avvisat | – | Inte designmotor (`BESLUT.md` 2026-10-14). Idéerna – wireframes först, validering av `design.md`, elementknuten feedback – hör till 2-4, 2-5 och 3-2 | – |
| [garden-skills](https://github.com/ConardLi/garden-skills) | *web design engineer* | – | avvisat | – | Överlappar Inspo och granskaren (v0.74) | – |
| shadcn, dashboard, Material 3, SwiftUI, Expo | Bibliotek för funktionellt UI och mobil | – | avvisat | – | Funktionellt UI drar mot generiskt utseende på en marknadsföringssajt (fallgrop 96) | K44 (bara *shadcn-namnen för tokens*: Ta in) |

### Granskningsskills att destillera

Kriterierna arbetas in i den egna granskaren, en i taget (`bilaga-b-skills.md`, → 3-2).

| Verktyg | Vad | Var | Status | Nivå | Källäge och förbehåll | Inv |
|---|---|---|---|---|---|---|
| [Impeccable](https://github.com/pbakaus/impeccable) | 24 granskningskommandon, främst critique, audit, layout, typeset, polish | 3-2 | kandidat (destillera) | N2 | 📄 *$10K Website Kit* (dokument, en källa) | B39 (Destillera) |
| [Jakub Krehels skills](https://github.com/jakubkrehel/skills) | *better layout* och övriga better-skills; review mot git | 3-2 | kandidat (destillera) | N2 | 🎥 designskills-videon | B3–B13, B15, B45 |
| [designer-skills](https://github.com/Owl-Listener/designer-skills) | *screen critique*, *perception laws* | 3-2 | kandidat (destillera) | N2 | 🎥 designskills-videon | – |
| [Meng To](https://github.com/MengTo/Skills) | *Awwwards quality sites*; *video to super prompt* för referenser | 3-2, 2-1 | kandidat | N2 | 🎥 designskills-videon. Filmisk stil – en stilskill | – |
| [Landing Page Design](https://github.com/elayadesign/ai-design-skills) | Den primära handlingen som kriterium | 3-2 | kandidat (destillera) | N2 | 🎥 designskills-videon | – |
| [web-design-guidelines](https://github.com/vercel-labs/agent-skills/tree/main/skills/web-design-guidelines) (Vercel Labs) | Underhållna riktlinjer för webbgränssnitt | 3-2 | kandidat (destillera) | N2 | 🎥 designnivå-videon; Vercels Web Interface Guidelines är förankring i kompetensrapporten (lager 5) | – |
| [UI Skills](https://github.com/ibelick/ui-skills) (MCP) | Designskills från flera upphovspersoner, väljs automatiskt | 2-6 | avvisat som installation | – | 🎥 Inspo-videon. Laddas utanför vår kontroll; 2-6 installerar den inte | – |
| [ADHD](https://github.com/UditAkhourii/adhd) | Spridd idégenerering med isolerade agenter | 2-5 | kandidat | N2 | 🎥 ADHD-videon. Installeras i `.agents` och måste länkas till `.claude` | – |
| [Arena](https://github.com/Jakeschincariol/arena-skill) | Parvis utslagsturnering mellan alternativ | 2-5 | kandidat (bänken) | N4 | 🎥 Jack Roberts repo-video ⚠️ | – |

## 2. Rörelse

Scrollytelling och Scroll World är tillval (`BESLUT.md` 2026-10-15). Rörelsereglerna → 2-6.

| Verktyg | Vad | Var | Status | Nivå | Källäge och förbehåll | Inv |
|---|---|---|---|---|---|---|
| [scrollytelling](https://github.com/doodledood/claude-code-plugins/blob/HEAD/claude-plugins/frontend-design/skills/scrollytelling/SKILL.md) (doodledood) | Scrollanimationer som berättar en historia | 2-6 | kandidat (tillval) | N2, startsidan som berättelse | 📄 MIT enligt README, ingen licens i pluginmappen (delvis bekräftat) | – |
| [Scroll World](https://github.com/oso95/scroll-world) | Filmisk 3D-resa genom AI-genererade videoklipp | 2-6 | kandidat (tillval) | N4 | 🎥 Opus 5.5-videon; ⚠️ licens och innehåll inte granskade. Kräver videotjänst via MCP. Bryter mot rörelsereglerna (analysen M13) | – |
| [Scrollcraft](https://github.com/nateherkai/scroll-craft) | Scrollmotor som kontrollerar scrollpositioner med skärmdumpar | 2-6 | kandidat | N4 | 🎥 Nate Herk 100-repon-videon; upphovspersonen visar sitt eget verktyg | – |
| [img2threejs](https://github.com/img2threejs/img2threejs) | 3D-modell i kod ur ett objekt på en bild | 2-6 | kandidat | N4 | 🎥 repo-videon. Dyr i tokens och tid | – |
| [Remotion](https://github.com/remotion-dev/remotion/blob/main/LICENSE.md) | Video ur kod; plugin i Claude Code | 2-6 | kandidat | N3 | 📄 licensen kontrollerad 2026-10-15: gratis upp till tre anställda, större företag behöver licens; ändras i version 5.0 (kompetensrapporten). 🎥 Claude Motion-videon, sponsrad av Higgsfield | K65 (Pröva, med faster-whisper) |
| Claude Motion | Animation som kod i Artifacts | 2-6 | kandidat | N4 | 🎥 Claude Motion-videon: beta, bara Team och Enterprise | – |
| [GSAP-skills](https://github.com/greensock/gsap-skills) | Tidslinjer och ScrollTrigger | 2-6 | kandidat (destillera) | N2 | 🎥 loop-nivåvideon: tunga animationer gör sidan långsam | B36 (Extrahera) |
| [Emil Kowalskis skills](https://github.com/emilkowalski/skills) | *Animate*, *animation vocabulary*, *improve-* och *review-animations*, *break-ui*, *Apple design*, *design engineering* | 2-6, 3-2 | kandidat (destillera) | N2 | 🎥 designskills-videon; 📄 *$10K Website Kit*. Emils millisekunder som kontroller står på bänken (analysen §4.2) | B21–B34 (Destillera, Byggverktyg eller Släpp per skill) |
| [LottieFiles](https://lottiefiles.com), [transitions.dev](https://transitions.dev), [60fps.design](https://60fps.design), [Motion Primitives](https://motion-primitives.com) | Mikrointeraktioner vid hover och tryck | 2-6 | kandidat | N2 | 🎥 Jack Roberts-videon 2. Licens per Lottie-fil; kompetensrapporten avstår från dotLottie och lottie-web utom för kundens egna filer | – |

## 3. Bygge, stack och publicering

Stack och publicering → 2-8. Förslaget för en informationssajt är Astro statiskt på Cloudflare Workers (📄 `kunskap/research/2026-10-14_cloudflare-stack.md`).

| Verktyg | Vad | Var | Status | Nivå | Källäge och förbehåll | Inv |
|---|---|---|---|---|---|---|
| Astro | Statisk sajtgenerator | 2-8 | prövas | N1 | 📄 cloudflare-stack (typ A). Bekräftad av Johnny 2026-10-15 (`bilaga-e-oppna-fragor.md` 1.6) | – (K20, K25, K26, K40, K57 och K79 förutsätter Astro) |
| Cloudflare: Workers med statiska tillgångar, Workers Builds och Access | Hosting; bygge och publicering vid push; Access skyddar förhandsadresserna, alltså staging | 2-8 | prövas | N1, om sajten publiceras (`5-byggplan.md`, steg 5; `bilaga-e-oppna-fragor.md`, fråga 1.3) | `BESLUT.md` 2026-10-14; 📄 cloudflare-stack. Access: gratisgränsen för 2026 inte bekräftad (fallgrop 185) | B70 (Behåll) |
| Wrangler | Cloudflares CLI: deploy, rollback, loggar, hemligheter | 2-8 | prövas | N1, om sajten publiceras | 📄 cloudflare-stack. `rollback` återställer kod, inte data | – (K79 nämner `wrangler rollback`) |
| GitHub och GitHub CLI | Privat repo per sajt | 2-8 | prövas | N1, om sajten publiceras | v0.74 fas 7. Inloggningen gör Johnny | – |
| Cloudflare Turnstile | Spamskydd för formulär, kontrolleras på servern | 2-8 | kandidat | N2, med formuläret (→ 2-8) | 📄 cloudflare-stack: gratis | – |
| Cloudflare D1 i EU-jurisdiktion | Sparar formulärinskick | 2-8 | kandidat | N2, med formuläret | 📄 cloudflare-stack (`--jurisdiction=eu` när databasen skapas) | – |
| ~~Resend och resend-mcp~~ | **Struket 2026-10-16:** all e-post går via Cloudflare (`BESLUT.md`, *Resend stryks*; 2-8) | – | struket | – | – | B71 (släpp) |
| [Cloudflare-pluginet](https://github.com/cloudflare/skills) och API-MCP:n `https://mcp.cloudflare.com/mcp` | Cloudflare Skills och Cloudflares MCP-servrar | 2-8, 2-9 | kandidat | N2 | 📄 cloudflare-stack: `/plugin marketplace add cloudflare/skills`; en begränsad token per kundkonto; skillnamnen overifierade | K76 (*cloudflare/mcp*: Ta in) |
| Cloudflare Web Analytics | Analys utan kakor, men med skript i webbläsaren | 2-8 | kandidat | N2 | 📄 dataöverföring: om den slipper samtyckesbanner är osäkert (→ 2-8) | K80 (Ta in villkorat) |
| Durable Objects | Bokningar som inte får krocka (väg D) | 2-8 | kandidat | N3 | 📄 cloudflare-stack; Workers Paid | – |
| Cloudflare Email Sending | Mejl direkt från Workers | 2-8 | kandidat | N4 | 📄 cloudflare-stack: beta, kräver Workers Paid | – |
| [Supabase](https://supabase.com) med [agent-skills](https://github.com/supabase/agent-skills) och [Advisors](https://supabase.com/docs/guides/observability/advisors) | Slutanvändarinloggning och databas med RLS (väg B–D) | 2-8 | kandidat | N3 | 📄 Advisors-dokumentationen. Inte på DPF-listan: egen överföringsbedömning och EU-region (📄 dataöverföring, fallgrop 187). Affiliate i Jack Roberts-videon 4 | – |
| [Stripe Best Practices](https://github.com/stripe/ai/tree/main/skills/stripe-best-practices) | E-handel (väg C) | 2-8 | kandidat | N4 | 🎥 Nate Herk 100-repon-videon | – |
| Vercel och Vercels deployskill | Hosting i videorna | – | avvisat | – | Hosting på Cloudflare (`BESLUT.md` 2026-10-14) | – |
| SingleFile CLI | Fångar en sida med HTML, CSS och bilder | 2-2 | kandidat | N2 | 🎥 4 Ways-videon; ⚠️ kommandona overifierade | – |
| Firecrawl och [firecrawl-mcp-server](https://github.com/firecrawl/firecrawl-mcp-server) | Fångar en befintlig sajt | 2-2 | kandidat | N2 | Kärnan är AGPL-3.0, och Free- och Hobby-planerna saknar biträdesavtal (kompetensrapporten: Bevaka). Bara kundens egen sajt | – |
| [REA](https://github.com/morluto/rea) | MCP som spårar hur en sajt fungerar – skript, nätverk, struktur – med belägg | 2-2, 2-5 | kandidat (pilot) | N4 | 🎥 REA-videon och Jack Roberts repo-video, två oberoende källor för integrationer (analysen §4.3). Sandlåda, bara läsrätt, verktygslås | – |
| [advise-project-approach](https://github.com/AaravKashyap12/advise-project-approach) | Beslut med belägg; bygga eller använda befintligt | 2-2 | kandidat | N2 | 🎥 advise-videon. Innehåller ingen webbdesignmetodik | – |
| [Addy Osmanis agent-skills](https://github.com/addyosmani/agent-skills) | `/spec`, `/plan`, `/build`; frågor om kantfall | 2-1 | kandidat (referens) | N4 | 🎥 Nate Herk 100-repon-videon; frågorna gäller bokning (väg D) | – |

## 4. Test och kvalitet

De tio N1-kontrollerna → `2-8-teknik-och-kvalitet.md`; registret över alla kontroller → `bilaga-c-kontroller.md`; granskningen → 3-2.

| Verktyg | Vad | Var | Status | Nivå | Källäge och förbehåll | Inv |
|---|---|---|---|---|---|---|
| Playwright och [Playwright CLI](https://github.com/microsoft/playwright-cli) | Riktig webbläsare: kontroller, skärmdumpar, nätverk, video | 2-8, 3-2 | prövas | N1, kontrollskriptet (`5-byggplan.md`, steg 3) och granskarens skärmdumpar (steg 4) | Apache-2.0 (inventeringen). 🎥 Nate Herk 100-repon-videon rekommenderar CLI:t, som är lättare på kontexten ⚠️. Skript eller CLI avgörs i första bygget | B69 (Behåll); K70 (Ta in) |
| axe (`@axe-core/playwright`) | Tillgänglighetsfel i riktig webbläsare: kontrast, alt-texter, etiketter, tomma länkar m.m. | 2-8 | prövas | N1, kontrollskriptet (steg 3) | 📄 WCAG 2.2 är normen; taggarna för 2.2 är avstängda som standard och slås på (→ 2-8). MPL-2.0 (inventeringen); körs i kontrollskriptet, ingår inte i levererad kod. Automatiken hittar bara en del av felen (→ 2-8, WCAG-EM) | K70 (Ta in) |
| Lighthouse | Prestanda, tillgänglighet, bästa praxis och SEO | 2-8 | prövas | N1 för kontroll 9 (rapporterar, stoppar inte; `2-8`); N2 som Lighthouse CI | Grunden för tröskeln 90: leverantörens dokumentation; tröskeln vald (en källa – 📄 *$10K Website Kit*). Lighthouses skala visar färgband (90–100 = *Good*) men kräver inte 90. Prestandan mäts men stoppar inte (analysen §4.2, §7.4) | K66 (Lighthouse CI: Ta in) |
| Chrome DevTools MCP | Diagnos i webbläsaren | 2-8 | prövas | N2, för diagnos | v0.74 §14 som alternativ till Playwright; 2-8 använder den för diagnos, med `--no-performance-crux` så att adresser inte skickas till Google (inventeringen) | B67 (Behåll) |
| PageSpeed Insights och CrUX API | Prestanda från riktiga användare | 2-9 | kandidat | N3 | v0.74 fas 8g. CrUX kräver trafik som småsajter sällan når (kompetensrapporten, lager 8) | – |
| [Caliper](https://github.com/edonadei/caliper) | Kör agenten med och utan en skill; nytta mot tokens | 3-2 | kandidat | N4 | 🎥 repo-videon ⚠️. Alternativ: skill-creator och `claude plugin eval` | – (jfr K91, K93) |
| [Reticle](https://github.com/reticlehq/reticle) | Beteendegranskning med tre utfall | 3-2 | kandidat | N4 | 🎥 repo-videon ⚠️. De tre utfallen hör till granskningen (→ 3-2) | – |
| [Anti-Slop](https://github.com/dmmulroy/anti-slop) | Regelbaserad sållning av agentmisstag i JS och TS | 2-8 | kandidat | N4 | 🎥 repo-videon ⚠️ | – |
| [Vizzly](https://github.com/vizzly-testing/cli) | Visuell regression; godkänn eller avvisa per pixeldiff | 2-9 | kandidat | N3 | 🎥 designnivå-videon ⚠️ | – |
| Matt Pococks `codebase-design` och `improve-codebase-architecture` ([mattpocock/skills](https://github.com/mattpocock/skills)) | Arkitekturgranskning av en kodbas | 2-8, 2-9 | kandidat | N3 | 📄 MIT, namnen verifierade (stitch-och-verktyg); tre kanaler nämner skillen (analysen §4.3) | – (B61 *writing-for-agents* ur samma repo: Behåll) |
| Thermonuclear code quality review (Cursor) | Förenklar AI-genererad kod | 2-8 | kandidat | N4 | 🎥 Coding Sloth-videon; ⚠️ namn och repo overifierade | – |
| CodeRabbit | Granskning av PR och hela repot | 2-8 | kandidat | N4 | 🎥 Opus 5.5-videon; betalt efter 14 dagars prov | – |

## 5. Säkerhet

Säkerhetsmodellen, sandlådan och hemligheterna → 3-3. Säkerhetsgranskningen före publicering → 2-8.

| Verktyg | Vad | Var | Status | Nivå | Källäge och förbehåll | Inv |
|---|---|---|---|---|---|---|
| [Skill Spector](https://github.com/NVIDIA/SkillSpector) (NVIDIA) | Skannar skills och MCP-servrar före installation; poäng 0–100 | urvalskriterierna ovan, 3-3 | kandidat | N2, vid första tredjepartsinstallationen utöver N1-verktygen | 📄 Apache-2.0; `uv tool install git+https://github.com/NVIDIA/skillspector.git` (stitch-och-verktyg). Se urvalet | – |
| [Claude Security](https://github.com/anthropics/claude-plugins-official/tree/main/plugins/claude-security) (Anthropic) | Agenter letar säkerhetshål och prövar varandras fynd | 2-8 | kandidat | N3 | 🎥 Nate Herk 100-repon-videon ⚠️ | – |
| [cloudflare/security-audit-skill](https://github.com/cloudflare/security-audit-skill) | Säkerhetsgranskning i sex faser; den som kontrollerar ett fynd har inte hittat det | 2-8 | kandidat | N3 | 📄 Cloudflare, MIT, kontrollerat 2026-10-15. Kräver en sandlåda utan nätverk när målets kod körs (fallgrop 192). `npx skills add https://github.com/cloudflare/security-audit-skill --skill security-audit` | – |
| [Mantis](https://github.com/google/mantis) (Google) | Säkerhetsgranskning per område, också schemalagd | 2-8, 2-9 | kandidat | N3 | 🎥 Hermes-videon ⚠️ | – |
| Claude Code Security Review GitHub Action | Säkerhetsgranskning på varje PR | 2-8 | kandidat | N4 | 🎥 Fable 5-videon ⚠️ | – |
| [Docker Sandbox](https://docs.docker.com/ai/sandboxes/get-started/) | En mikro-VM per agent | 3-3 | kandidat | N4 | 🎥 fleet-videon, sponsrad av Docker ⚠️ | – |
| Bitwarden Secrets Manager | Kassaskåp med en samling per kund | 3-3 | kandidat | N3 | 📄 *Websites for Normal People* (dokument, en källa); ⚠️ valet av kassaskåp är inte gjort | – |
| [Agit](https://github.com/Einsia/agent-git) | Konversationer sparade som git-commits | 3-2 | kandidat | N4 | 🎥 Agit-videon ⚠️; sessioner kan innehålla hemligheter | – |

## 6. Innehåll, bild och kunskap

Faktabas, bildstrategi och AI-märkning → 2-7. Kunskapsbasen → 3-4.

| Verktyg | Vad | Var | Status | Nivå | Källäge och förbehåll | Inv |
|---|---|---|---|---|---|---|
| [Humanizer](https://github.com/blader/humanizer) | Text som inte låter AI-genererad; bygger på Wikipedias guide | 2-7 | kandidat (destillera) | N2 | 🎥 Nate Herk 100-repon-videon. MIT, Wikipedia-underlaget CC BY-SA 4.0. Skrivet för engelska | B38 (Destillera) |
| [Slop Monster](https://github.com/ItsssssJack/SlopMonster) | Gör generiska löften till konkreta detaljer | 2-7 | kandidat | N2 | 🎥 Jack Roberts-videon 2. Skrivet för engelska – prövas på svensk text först | – |
| Higgsfield (MCP) | AI-bild och AI-video | 2-7 | kandidat | N2 | Sponsor eller affiliate i flera videor. Kommersiell användning tillåten, men resultatet är inte garanterat unikt och villkoren om träning är motsägelsefulla (📄 `2026-10-14_ai-forordningen-och-rattigheter.md`). Bara stämning och illustration (→ 2-7) | – |
| Stitchs bildgenerator (Nano Banana) | AI-bilder under designen | – | avvisat | – | Struket 2026-10-15 (`BESLUT.md`, *Stitch stryks*). 🎥 Stitch-skills-videon | – |
| youtube-transcript-api, yt-dlp | Hämtar undertexter till råmaterialet | 3-4 | kandidat | N2 | 🎥 Karpathy-videon | – |
| Karpathys LLM Wiki-gist och `/ingest` | Mönster för en kunskapsbas som växer | 3-4, `bilaga-b-skills.md` | kandidat | N2 | 🎥 Karpathy-videon, länk i videobeskrivningen ⚠️. OKF-videon bygger på samma gist, alltså en källa (analysen §4.4) | – |
| Open Knowledge Format (Google) | En fil per begrepp, `index.md`, frontmatter | 3-4 | kandidat (formatet) | N2 | 🎥 OKF-videon; de officiella verktygen kräver BigQuery | – |

## 7. SEO och synlighet

Lanseringskraven → 2-8; uppföljningen → 2-9.

| Verktyg | Vad | Var | Status | Nivå | Källäge och förbehåll | Inv |
|---|---|---|---|---|---|---|
| Google Search Console, dess API och [mcp-gsc](https://github.com/AminForou/mcp-gsc) | Indexering, sitemap och sökdata | 2-8, 2-9 | prövas | N2 vid lansering, N3 i förvaltningen | 📄 stitch-och-verktyg: roll med begränsad behörighet finns, ingen officiell MCP; mcp-gsc är MIT och körs utan skrivflaggan | K10 (Ta in) |
| Google Business Profile och dess API | Öppettider, omdömen och sökfraser | 2-1, 2-9 | kandidat | N2 i researchen, N3 i förvaltningen; ansökan kan göras nu | 📄 stitch-och-verktyg: ansökan besvaras inom 14 dagar; ingen roll med bara läsrätt. Lång ledtid (`LAGE.md`, *börja nu*) | K4 (Ta in, ansök nu) |
| Google Analytics 4 och [google-analytics-mcp](https://github.com/googleanalytics/google-analytics-mcp) | Analys; officiell MCP som bara läser | 2-8, 2-9 | kandidat (tillval) | N3 | Bara bakom samtycke (→ 2-8). Kompetensrapporten: GA4 avstås som standard; MCP:n är märkt *Experimental* (Bevaka) | – |
| Google Tag Manager och Consent Mode v2 | Taggar och samtyckesläge | 2-8 | kandidat (tillval) | N3 | 📄 *Websites for Normal People*, skrivet för kanadensisk lag; EU-reglerna gäller (→ 2-8) | – |
| [OpenSEO](https://github.com/every-app/open-seo) | Sökorddata, placeringar och bakåtlänkar | 2-9 | kandidat | N3 | 🎥 Nate Herk 100-repon-videon ⚠️. Datan ligger hos dem om man inte driftar själv | – |
| Claude SEO | SEO-skills | 2-3 | kandidat | N2 | 🎥 Jack Roberts-videon 3; ingen länk i v0.74 | K23 (*claude-seo: seo-local*: Pröva), K75 (Pröva) |
| `llms.txt` eller OKF-version av kundens publika fakta | Maskinläsbar kunskap för AI-sökning | 2-9 | **avstå** (`BESLUT.md` 2026-10-16) | – | 📄 Google: *"You don't need to create new machine readable files, AI text files, or markup"*; ingen leverantör har lovat att läsa filen, och loggstudierna visar nästan inga hämtningar (`kunskap/research/2026-10-16_seo-aeo-geo.md`) | – |

## 8. Förvaltning och företaget

| Verktyg | Vad | Var | Status | Nivå | Källäge och förbehåll | Inv |
|---|---|---|---|---|---|---|
| [Google Workspace CLI](https://github.com/googleworkspace/cli) | Rapporter i kundens Docs och Sheets | 2-9 | kandidat | N3 | 🎥 Nate Herk 100-repon-videon ⚠️ | – |
| [Symphony](https://github.com/openai/symphony) och [Claude Code-versionen](https://github.com/gherghett/ClaudeCodePSymphony) | Ändringskön som GitHub-ärenden: en session, gren och PR per ärende | 2-9 | kandidat | N4 | 🎥 fleet-videon ⚠️ | – (jfr K78 claude-code-action) |
| Clay | Hittar och kompletterar företag i kundflödet | 4 | kandidat | N3 | 🎥 Clay-videon, sponsrad av Clay. Personuppgifter: information enligt GDPR artikel 14 och avregistrering (→ 4) | – |
| [Paseo](https://paseo.sh/) | Styr Claude Code från mobilen | 3-1 | kandidat | N4 | 🎥 loop-nivåvideon ⚠️. Ger fjärråtkomst till datorn som kör flödet | – |

## 9. Flödet och agenterna

| Verktyg | Vad | Var | Status | Nivå | Källäge och förbehåll | Inv |
|---|---|---|---|---|---|---|
| skill-creator (Anthropic) | Gör en session till ett utkast till skill; prövar mot baslinje | `bilaga-b-skills.md`, 3-4 | prövas | N2, när ett steg gjorts för hand tre gånger | v0.74 §12 (Skillify, steg 2); `historik/karta/flodet.md` | K91 (Ta in) |
| Matt Pococks Grill Me och Handoff ([mattpocock/skills](https://github.com/mattpocock/skills)) | Intervju som grillar planen; komprimerade överlämningar | 2-1, 3-1 | kandidat | Grill Me N2, bara kritiskt som källa till `intervju` – den intervjuar användaren, inte kunden; Handoff N4 | 📄 repot MIT (stitch-och-verktyg); 🎥 gauntlet-videon, fleet-videon | – (B61 ur samma repo) |
| [Task Observer](https://github.com/rebelytics/one-skill-to-rule-them-all) | Löpande lärdomar per skill | 3-4 | kandidat | N4 | 🎥 Variate-videon ⚠️; installeras per projekt | – |
| [Graft](https://trailhq.com/graft) | Kunskapsgraf över koden | 3-1 | kandidat | N4 | 🎥 Graft-videon; tillverkarens siffror. Aldrig aktiv för granskare | – |
| [Chisle](https://github.com/JayPokale/Chisle) | Kortare svar och rensad verktygsoutput via hooks | 3-3 | kandidat | N4 | Upphovspersonens egna siffror 🎥. Kan krocka med våra hooks | – |
| Codeburn | Visar vad tokens går till | 3-2 | kandidat | N4 | 🎥 Nate Herk 100-repon-videon ⚠️ | – |
| Caveman, Ponytail | Tokenbesparare | 3-3 | kandidat | N4 | 🎥 Nate Herk 100-repon-videon (JetBrains test): cirka 8,5 respektive 10 procent mot utlovade 65. Ponytail har en öppen bugg på Windows | – |
| Jev-verktygen: [Jev Belay](https://github.com/valentynkit/jev-belay), [Toolgate](https://github.com/RiskAverseTech/toolgate), [Abide](https://github.com/coldteadotai/abide), [Jev Browser](https://github.com/Ying-Kai-Liao/jev-browser), [Jev Steer or Queue](https://github.com/Larkspur-Wang/Jev_steer_or_queue), [Compact Adviser](https://github.com/kunchenguid/compact-adviser), [Quicksilver](https://github.com/UditAkhourii/quicksilver), [Jev SEO](https://github.com/AgriciDaniel/jev-seo), [fast-jev-compaction](https://github.com/tamaratran/fast-jev-compaction) | En extern beslutsmodell som väljer i stället för att skriva | 3-3 | kandidat | N4 | 🎥 Jev-videorna ⚠️. Små repon; API-nyckel; kod eller konversation skickas ut; TypeSafe tar inte emot nya registreringar. Först när en mätbar regel visat sig otillräcklig | – |
| Codex-pluginet och GPT-6 Astra (OpenAI) | En annan modell som angripare eller byggare i eval | 3-2 | kandidat | N4 | 🎥 Buzz-videon; Astra-videon (en persons smak). Ny leverantör; kundens innehåll skickas dit och kräver kundens godkännande | – |
| Mods ur videorna: Design Picker, Session Monitor, Plain Answers, Prompt Enhancer, Assumption Check, Goal Meter, Cache Keeper, Replay Theater, Recording Mode, Collision Guard, Blast Radius, Next Steps; delade mods på claudemod.com | Tillägg i Claude Codes gränssnitt | 3-5 | kandidat | N4 | 📄 `2026-10-14_claude-code-verifiering.md`: mods kräver 2.1.287 i terminalen; det de ritar syns inte i VS Code | – |
| [Unlazy](https://github.com/Leonxlnx/unlazy) | Bevis per grind, tyst nedskärning, parallella checkpoints | 3-1 | kandidat (idékälla) | – | 🎥 Unlazy-videon; idéerna hör till 3-1 | – |
| marketingskills ([coreyhaines31](https://github.com/coreyhaines31/marketingskills)) | 48 marknadsskills | 2-1, 2-3, 2-7, 2-8 | avvisat som paket; kandidat för destillering | N2 | v0.74 hoppade över paketet. Inventeringen föreslår att fyra skills destilleras, aldrig att hela paketet installeras (breda triggers krockar med våra) | K1, K18, K60, K75 |
| [RTK](https://github.com/rtk-ai/rtk) | Tokenbesparare | – | avvisat | – | Sparade ingenting i JetBrains test och blev dyrare med låg effort (v0.47; fallgrop 128) | – |
| Claude Mem, Context Mode | Minne; kontexthantering | – | avvisat | – | Claude Mem skickar användningsdata som standard; Context Mode har en bugg som kan bränna kvoten (🎥 Nate Herk 100-repon-videon) | – |
| [Planning with Files](https://github.com/OthmanAdi/planning-with-files) | Hook som tvingar in planen i kontexten | – | avvisat | – | Idén byggdes in för orkestreraren i v0.74 (→ 3-1) | – |
| Goal Buddy | Roller med strikt åtkomst, domare, spanare | – | avvisat | – | Referensarkitektur; idéerna hör till 3-1 | – |
| [Ouroboros](https://github.com/Q00/ouroboros) | Självintervju och dolda kontroller | – | avvisat | – | Idéerna hör till 2-1 och 3-1 | – |
| Wayfinder (Matt Pocock) | Dimma, beslutskarta, facit | – | avvisat i första hand | – | Idéerna hör till 2-1; originalet anropar flera andra skills | – |
| [Karpathy-reglerna](https://github.com/multica-ai/andrej-karpathy-skills) | Fyra arbetsregler | – | avvisat | – | Reglerna finns redan i guiden | – |
| Buzz (Block) | Gruppchatt för agenter | – | avvisat | – | Dubbel kontext (cirka 31 000 mot 4 000 tokens för en hälsning), allt i tur och ordning, ingen kryptering, agenter kan inte begränsas | – |
| Delegate Skills, Agent Reach, Skill Retriever | Tillägg för Hermes | – | avvisat | – | Vi kör bara Claude Code; gratis plattformsåtkomst riskerar villkorsbrott; få skills gör urval onödigt | – |
| [OpenCLI](https://github.com/jackwener/opencli) | Inloggade Chrome-konton som agentkommandon | – | avvisat | – | Går emot minsta behörighet (→ 2-9) | – |
| [neuroarxiv](https://github.com/UditAkhourii/neuroarxiv) | Söker forskningsartiklar | – | avvisat | – | Söker forskning för sådant ingen byggt än; småföretagssajter kräver inte det | – |
| Hyperframes, Apify, Expo | Video, skrapning, mobil | – | avvisat | – | Utanför uppdraget; skrapning riskerar villkorsbrott | – |

## 10. Inbyggt i Claude Code

Inget att installera; nivån anger när funktionen tas i bruk. Verifierat i 📄 `kunskap/research/2026-10-14_claude-code-verifiering.md` om inget annat sägs. Lokalt installerad version vid kontrollen: 2.1.281.

| Funktion | Används till | Var | Nivå | Förbehåll | Inv |
|---|---|---|---|---|---|
| Delagent med ren kontext | Granskaren (`5-byggplan.md`, steg 4) | 3-1 | N1 | 📄 Anthropic, *Prompting Claude Fable 5* | K88 |
| `/goal` och `/loop` | Driva orkestreraren; schemalagda kontroller | 3-1, 2-9 | N2 | `/goal` bedömer konversationen, inte arbetet | K88 |
| `/code-review` och `/simplify` | Kodgranskning en gång före publicering | 2-8, 3-2 | N2 | – | – |
| `/security-review` | Säkerhetsgranskning | 2-8 | N2 | Kräver en `origin`-remote | – |
| `/doctor`, `prompt-audit`, `/skill-doctor` | Hälsorapport och rensning av instruktioner och skills | 3-4 | N2 | `prompt-audit` kräver 2.1.283 | – |
| Safe mode och `claude -p` | Baslinje utan uppsättning; obevakad körning | 3-2, 3-4 | N2 | – | – |
| Djupresearch | Inbyggt arbetsflöde för utredningar | 2-1 | N2 | 🎥 OS-videon | – |
| Ultra review | Djup granskning i molnet som Johnny startar | 3-2 | N3 | Debiteras | – |
| Monitor | Bevakar dev-serverns utdata och andra processer under bygget | 3-3 | N2 | Kräver Git Bash på Windows | – |
| Advisor | En svagare modell rådfrågar en starkare | 3-1 | N4 | Experimentell; kräver Anthropic API | – |
| `/batch` och dynamiska arbetsflöden | Parallella delar med en worktree per agent | 3-1 | N4 | `/batch` kräver git; arbetsflöden i `.claude/workflows/`, högst 16 agenter samtidigt som standard | – |
| Agent teams | Sessioner som pratar med varandra | 3-2 | N4 | 🎥 funktionsvideon ⚠️; experimentellt | – |
| `claude agents` och `--bg` | Översikt över sessioner i bakgrunden | 3-5 | N4 | Research preview | – |
| Plugin och egen marknadsplats | Byggsystemet som versionerat plugin | 3-4 | N4 | Hooks i pluginets agentdefinitioner ignoreras (fallgrop 189) | – (jfr K93 `claude plugin eval`) |
| Mods och `/plugin-authoring` | Live-visning av flödet | 3-5 | N4 | Kräver 2.1.287 (fallgrop 190) | – |
| Build eval och Hillclimb (`claude api`) | Testsvit för appar som anropar en modell | 3-2 | N4 | 🎥 inställningsvideon ⚠️; byggt för appar, inte för vårt flöde | – |

## Nämnda bara i förbigående

Behöver ingen rad i registret: Node.js och npm (förutsättning för Astro), tmux (agent teams), Next.js och StyleX (stacktabellen i v0.74), Google Fonts (exempel på ett antagande; typsnitt laddas från egen domän → 2-8), Sendbird och Stream (kostnadsexempel för bygga eller använda befintligt → 2-2), Lovables connector-katalog (idékälla till kopplingarna per kund → 2-9), OpenRouter och Vercel AI Gateway (åtkomst till Jev), Manus och Runway (videotjänster i Scroll World), ChatGPT, Claude och Perplexity (AEO-frågor → 2-9), Linearity (sponsor i en källa), Linear (förebild i en jämförelse), C2PA (metadata för AI-bilder → 2-7) och ASD-STE100 (förenklad teknisk engelska; svensk motsvarighet är klarspråk → 4).

## Avstå och Bevaka enligt kompetensrapporten

Kandidater som rapporten bedömde som *Avstå* eller *Bevaka* står inte i inventeringen. Domen är Claudes, inte Johnnys beslut. Skälen per kandidat står i `kunskap/research/2026-10-15_kompetensluckor-och-kandidater-per-lager.md`, under respektive lager.

- **Lager 1.** Avstå: deanpeters/Product-Manager-Skills, mattpocock/ai-interviewer, Typebot, community-MCP:er för Business Profile, HasData, små registerwrappers, automatisk insamling från Hitta och Eniro. Bevaka: Anthropic Interviewer, cablate/mcp-google-map, DataForSEO:s recensionsdata, Reco.se.
- **Lager 2.** Avstå: Astros `redirects` som huvudmekanism, migTool, gbp-industry-categories, cohnen/mcp-google-ads. Bevaka: Firecrawl, Google Trends API.
- **Lager 3.** Avstå: astro-breadcrumbs, kort, Optimal Workshop, Maze, Firecrawl för struktur. Bevaka: cardsort, markmap, Relume, marketingskills `programmatic-seo`, browser-use, UXAgent.
- **Lager 4.** Avstå: Astroplate, ScrewFast, Preline, Flowbite, Starlight, Headless UI, Pico. Bevaka: Tailwind Plus, Starwind UI, bejamas/ui, daisyUI (bara tokenmodellen), Radix, React Aria, Base UI, polyfills för popover och invokers.
- **Lager 5.** Avstå: website-builder-setup, Tokens Studio, sd-tailwindv4, style-dictionary-utils, culori, apcach, Huetone, tints.dev, subfont, glyphhanger, fluid-tailwind, Heroicons, unplugin-icons, Radix Themes; ikonset ur Iconify med GPL- eller CC BY-licens. Bevaka: Style Dictionary, Penpot.
- **Lager 6.** Avstå: ClientRouter som standard, astro-vtbot, scroll-timeline-polyfillen, dotLottie, lottie-web, animate.css, AOS, Lenis, auto-animate, Rive.
- **Lager 7.** Avstå: LanguageTools publika API och MCP:er, textstat, cspell:s svenska ordlista, nspell, hela marketingskills-paketet, openai/whisper, @imgly/background-removal, FLUX [dev], smartcrop.js, MiniMax-MCP, gflow-cli, Unsplash-MCP:er i en autonom kedja, stockbilder på personer, alt-textgeneratorer. Bevaka: claude-humanizer-svenska, Mailchimps röstguide, Sparv, WhisperX, Bloom-MCP:n.
- **Lager 8.** Avstå: sitespeed.io, webhint, linkinator, hyperlink, structured-data-testing-tool, schemarama, humanmade-validatorn, shcheck, DrHeader, observatory-cli, BackstopJS, lost-pixel, Sa11y, a11y- och Lighthouse-MCP:er, Deques axe-MCP, geo-seo-claude, open-seo-mcp-skills, Klaro, blacklight-collector. Bevaka: Pa11y, Siteimprove Alfa, reg-suit, Argos, PageSpeed Insights och CrUX, c15t.
- **Lager 9.** Avstå: ahonn/mcp-server-gsc, Ryzes hostade MCP, community-MCP:er för Business Profile, Upptime, Cloudflare Health Checks, UptimeRobots gratisplan, Plausible- och Umami-MCP:er, GA4 som standard, Dependabot för versionsuppdateringar, Keystatic, Decap, TinaCMS, 46elks-MCP:n. Bevaka: Google Analytics-MCP:n, Google Ads-MCP:n, Gatus, OpenStatus, octodns, cf-terraforming, Sveltia CMS, Resend Inboxes, gh-aw, n8n.
- **Flödet.** Avstå: evo, frankbria/ralph-claude-code, ralph-orchestrator, Inspect AI, DeepEval, OpenAI Evals, Braintrust, LangSmith, Rodney, wandb/openui, Webstudio, llamacoder, fragments, bolt.new, ComposioHQ/awesome-claude-skills, travisvn, VoltAgents subagenter, Open Design som plattform. Bevaka: promptfoo, darwin-skill, dynamic workflows, Agent SDK, Dyad, json-render, open-lovable, Onlook, UI-Bench.

## Guidens verktyg som saknas i inventeringen

`LAGE.md` räknar med cirka 60 verktyg ur guiden som inte är införda i inventeringen. Registret ovan har 98 rader med – i kolumnen Inv, varav 20 avvisade, utöver de inbyggda funktionerna; en rad samlar ibland flera verktyg. Skillnaden mot 60 är att registret också tar med tjänster, länkkällor och avvisade verktyg. De förs in i `inventering.json` när Johnny beslutar det; den här bilagan ändrar inte inventeringen.

- **Design och referenser:** Stitch-CLI, Googles stitch-skills, davideast/stitch-mcp, Tastemaker, Variate, design-md-planner, designmd.space, Aura.build, Relume, godly.design och Awwwards, Land-book, Coolors, sektionsgallerierna, typsnittskällorna, Aceternity UI och React Bits, brandguidelines.net, Astryx, Claude Design, garden-skills, designer-skills, Meng To, Landing Page Design, web-design-guidelines, UI Skills, ADHD, Arena.
- **Rörelse:** scrollytelling, Scroll World, Scrollcraft, img2threejs, Claude Motion, mikrointeraktionskällorna.
- **Bygge och publicering:** Astro (som eget verktyg), Wrangler, GitHub CLI, Cloudflare Access, Turnstile, D1, Durable Objects, Email Sending, Supabase, Stripe Best Practices, Vercel, SingleFile, Firecrawl, REA, advise-project-approach, Addy Osmanis agent-skills.
- **Test och kvalitet:** PageSpeed Insights och CrUX, Caliper, Reticle, Anti-Slop, Vizzly, Pococks arkitekturskills, Thermonuclear, CodeRabbit.
- **Säkerhet:** Skill Spector, Claude Security, cloudflare/security-audit-skill, Mantis, Security Review GitHub Action, Docker Sandbox, Bitwarden Secrets Manager, Agit.
- **Innehåll och kunskap:** Slop Monster, Higgsfield, Stitchs bildgenerator, youtube-transcript-api och yt-dlp, LLM Wiki-gisten, Open Knowledge Format.
- **SEO och synlighet:** Google Analytics 4 och dess MCP, Tag Manager och Consent Mode, OpenSEO.
- **Förvaltning och företaget:** Google Workspace CLI, Symphony, Clay, Paseo.
- **Flödet:** Find Skills, Grill Me och Handoff, Task Observer, Graft, Chisle, Codeburn, Caveman och Ponytail, Jev-verktygen, Codex och Astra, mods, Unlazy, RTK, Claude Mem och Context Mode, Planning with Files, Goal Buddy, Ouroboros, Wayfinder, Karpathy-reglerna, Buzz, Delegate Skills m.fl., OpenCLI, neuroarxiv, Hyperframes, Apify och Expo; och de inbyggda funktionerna utom delagenten och `/goal` (K88).

## Inventeringens kandidater som v0.74 inte nämnde

Kandidater ur `inventering.json` → `nya` som v0.74 inte nämner. Domen (Ta in eller Pröva) står i inventeringen; inget är beslutat i inventeringen. De flesta har nu en plats i lagerfilerna, som anger nivå och användning: lager 1 → 2-1, lager 2 → 2-2 och så vidare, flödet → 3-1 till 3-4. Till exempel används axe (K70) i N1-kontrollerna (→ 2-8).

- **Lager 1:** K1 customer-research (v0.74 nämner bara paketet), K2 JTBD och obviously-awesome, K3 smb-onboard m.fl., K5 Bolagsverkets API, K6 Google Maps Grounding Lite, K7 interview-script, K8 Geiecke och Jaravels intervjuplattform.
- **Lager 2:** K9 crawl4ai, K11 ai-website-cloner-template, K12 innehållsinventering och flyttregler, K13 Cloudflare Browser Rendering, K14 SiteOne och advertools, K15 Screaming Frog, K16 PolyFuzz, K17 DataForSEO MCP.
- **Lager 3:** K18 site-architecture, K19 Mermaid, K20 `@astrojs/sitemap` och schema-dts, K21 seo-graph, K22 astro-seo-schema, K24 trädtest med UXtweak eller Lyssna.
- **Lager 4:** K25 AstroWind, K26 Accessible Astro, K27 `<details name>`, K28 Every Layout, K29 GOV.UK Frontend, K30 Popover och Invoker Commands, K31 Fulldev UI, K32 HyperUI, K33 Basecoat, K34 CodeStitch, K35 Zag.
- **Lager 5:** K36 DTCG 2025.10, K37 Terrazzo, K38 Leonardo, K39 Color.js och Radix, K40 Astro Fonts och Fontsource, K41 Utopia och Capsize, K42 OFL-typsnitt, K45 Go, Flowbite och daisyUI, K46 Tabler, Phosphor och Simple Icons, K47 Harmony, tweakcn, Hyperglot. (K43 Lucide och K44 shadcn-namnen nämns i v0.74 bara som förbjudna eller avvisade.)
- **Lager 6:** K48 `@view-transition`, K49 rörelsepolicy ur WCAG och NN/g, K50 scroll-drivna animationer, K51 Open Props.
- **Lager 7:** K52 Vale med Nortropic-sv, K53 Hunspell sv_SE, K54 llepafils-metoden, K55 KB-Whisper och whisper.cpp, K56 röstprofilen, K57 Astro Picture och sharp, K58 fotoguide och alt-textskill, K59 FFmpeg, K60 copywriting och brand-review, K61 LanguageTool, K62 vale agent-tools, K63 rembg, K64 nanobanana-mcp-server; faster-whisper i K65.
- **Lager 8:** K66 Lighthouse CI (v0.74 nämner bara Lighthouse), K67 lychee, K68 Astro `security.csp` och `_headers`, K69 MDN HTTP Observatory, K70 skärpt axe (Playwright nämns), K71 Rich Results Test, K72 IBM Equal Access, K73 Unlighthouse m.fl., K74 WCAG-EM Report Tool och web-vitals, K75 seo-audit.
- **Lager 9:** K77 Renovate, K78 claude-code-action och Email Routing, K79 content collections (`wrangler rollback` nämns), K81 förvaltningsskill och månadsrapport, K82 seo-monster, K83 UptimeFlare och Uptime Kuma, K84 Checkly, K85 Plausible eller Umami, K86 46elks, Pages CMS, Changesets, DNSControl, K87 frappe/builder.
- **Flödet:** K89 långkörningsmönstret, K90 den kalibrerade bedömaren (v0.74 har kalibreringen men inte kartans metod), K92 karpathy/autoresearch (v0.74 nämner Karpathys loop som idé), K93 `claude plugin eval`, K94 ralph-loop, K95 hookify och claude-md-management, K96 superpowers, K97 Showboat och design-critique, K98 bolt.diy och screenshot-to-code, K99 open-design.

**Finns i båda men med olika omdöme:** Inspo (B65), Hallmark (B37), Impeccable (B39), Humanizer (B38), Emils skills, frontend-design (B35), Taste, UI UX Pro Max (B60), 21st.dev (B62), Refero, Mobbin, GSAP (B36), Playwright (B69), Chrome DevTools (B67) och mcp-gsc (K10). Kartan-mot-guiden §4 har jämförelsen (`kunskap/research/2026-10-15_karta-mot-guide.md`).
