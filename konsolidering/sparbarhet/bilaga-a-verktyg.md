# Spårbarhet: `guide/bilaga-a-verktyg.md`

Var varje del av v0.74 som rör tredjepartsverktyg tog vägen. Radnummer avser `historik/IMPLEMENTERINGSGUIDE-v0.74.md`. "A §n" = avsnitt n i bilaga A. Regler i samma stycken som inte gäller verktygen själva hör till lagerfilerna och flödesfilerna och spåras där.

## §12 Skills att skapa (rad 1783–1936)

| v0.74 (rader) | Var det hamnade | Struket och varför | Flyttat till annan fil |
|---|---|---|---|
| Granskningsverktyg ur *$10K Website Kit* (1785): Impeccable, Emils `improve-animations`, `review-animations`, `break-ui`, Tastes reglage | A §1 (Impeccable i *Granskningsskills att destillera*, Taste), A §2 (Emil) | – | Att kriterierna arbetas in i granskaren → `bilaga-b-skills.md` |
| Skillify-metoden (1787–1793) | – | – | `bilaga-b-skills.md` |
| Förbud är erfarenhet (1795) | – | – | `bilaga-b-skills.md` |
| Vad, men inte hur (1797) | – | – | Skrivregeln → `bilaga-b-skills.md`; rensning vid ny modell → `3-4` |
| Så skrivs beskrivningen (1799) | – | – | `bilaga-b-skills.md`; testet → `3-4` |
| Förbehåll om läckt källkod (1801) | – | – | `bilaga-b-skills.md` |
| Find Skills (1803) | A, urvalskriterierna (sista punkten) | – | – |
| Urvalskriterierna 1–7 (1805–1818) | A, urvalskriterierna: passform (1), underhåll, licens och kostnad (2–4), prövat med och utan (5, kort med hänvisning), krockar inte (6), Skill Spector, låst version, exakta adresser (7) | Skill Spector är inte längre ett generellt processkrav utan gäller vid tredjepartsinstallation (analysen §4.2). Caliper är inte längre det enda provverktyget; skill-creator och `claude plugin eval` står bredvid | Kostnad i tre lägen → `2-2` |
| Princip: en designskill per roll (1820–1823) | Punkt 2 (ett tillval åt gången) → A, urvalet | Punkt 3 ändrad efter beslutet 2026-10-15: stilen kommer från stilkitet, inte från "briefen och den valda riktningen" | Punkt 1 och 3 → `bilaga-b-skills.md` |
| Tabellraderna 1827 `stitch` | A §1 (Stitch-CLI, Googles stitch-skills) | Stitch per sajt ersatt av Stitch när stilkit tas fram (beslut 2026-10-15) | – |
| 1828 `scrollytelling` | A §2 | – | – |
| 1829–1836 `brief-interview`, `stitch-review`, `story-review`, `write-checks`, `auto-loop`, `checkpoint-planner`, `planvy`, `kod-kritiker` + `kod-rattare` | – | – | `bilaga-b-skills.md` (tabellen *Vart v0.74:s planerade skills tog vägen*) |
| 1837 Hallmark | A §1 | – | – |
| 1838 Inspo | A §1 | – | – |
| 1839 UI Skills | A §1, granskningsskills: avvisat som installation | Tillvalet installeras inte, i linje med `2-6` | – |
| 1840 Caliper | A §4 | – | – |
| 1841 Reticle | A §4 | – | – |
| 1842 Anti-Slop | A §4 | – | – |
| 1843 img2threejs | A §2 | – | – |
| 1844 Chisle | A §9 | – | – |
| 1845 Mantis | A §5 | – | – |
| 1846 RTK | A §9, avvisat | – | – |
| 1847 Tokenbesparare uppmätta (Caveman, Ponytail) | A §9 | – | – |
| 1848 Codeburn | A §9 | – | – |
| 1849 Claude Mem, Context Mode | A §9, avvisat | – | – |
| 1850 LLM Wiki-gist och `/ingest` | A §6 | – | Den egna skillen → `bilaga-b-skills.md` (`kunskap`) |
| 1851 REA | A §3 | – | Användningen och reglerna → `2-2`, `2-5` |
| 1852 Playwright CLI | A §4 | – | – |
| 1853 Humanizer | A §6 | – | – |
| 1854 Slop Monster | A §6 | – | – |
| 1855 Scrollcraft | A §2 | – | – |
| 1856 Claude Security | A §5 | – | – |
| 1857 Addy Osmanis agent-skills | A §3 | – | Kantfallsfrågorna för bokning → `2-1` |
| 1858 Stripe Best Practices | A §3 | – | – |
| 1859 OpenSEO, Google Workspace CLI | A §7, A §8 | – | – |
| 1860 Hyperframes, Apify, Expo | A §9, avvisat | – | – |
| 1861 Supabase | A §3 | – | – |
| 1862 Planning with Files | A §9, avvisat | – | – |
| 1863 Delegate Skills, Agent Reach, Skill Retriever | A §9, avvisat | – | – |
| 1864 Emil Kowalski | A §2 | – | – |
| 1865 advise-project-approach | A §3; idén bakom urvalet | – | – |
| 1866 neuroarxiv | A §9, avvisat | – | – |
| 1867 Googles Stitch-skills | A §1 | "Förstahandsval för fas 2" gäller inte längre; Stitch används bara när stilkit tas fram | – |
| 1868 design-md-planner | A §1 | – | – |
| 1869 Claude Design | A §1, avvisat | – | – |
| 1870 Tastemaker | A §1 | – | – |
| 1871 Landing Page Design | A §1, granskningsskills | – | – |
| 1872 Jakub Krehel | A §1, granskningsskills | – | – |
| 1873 designer-skills | A §1, granskningsskills | – | – |
| 1874 Meng To | A §1, granskningsskills | – | – |
| 1875 garden-skills | A §1, avvisat | – | – |
| 1876 Paseo | A §8 | – | – |
| 1877 Vizzly | A §4 | – | – |
| 1878 web-design-guidelines | A §1, granskningsskills | – | – |
| 1879 Goal Buddy | A §9, avvisat | – | Idéerna (roller, domare, spanare) → `3-1` |
| 1880 Skill Spector | A §5 och urvalet | Obligatorisk före *varje* installation och uppdatering → vid tredjepartsinstallation (analysen §4.2) | – |
| 1881 frontend-design | A §1 | – | Perspektivbiblioteket → `3-2` |
| 1882 Taste-förinställningar | A §1 | – | – |
| 1883 UI UX Pro Max | A §1 | – | – |
| 1884 Higgsfield | A §6 | – | Bildstrategin → `2-7` |
| 1885 shadcn, dashboard, Material 3, SwiftUI, Expo | A §1, avvisat | – | – |
| 1886 Astryx | A §1 | – | `init` på egen gren → `3-4` |
| 1887 Handoff | A §9 | – | Överlämningsdokumentet → `3-1` |
| 1888 Docker Sandbox | A §5 | – | Sandlådan → `3-3` |
| 1889 Symphony | A §8 | – | – |
| 1890 ADHD | A §1, granskningsskills | – | Spridd idégenerering → `3-2` |
| 1891 Buzz | A §9, avvisat | – | Idéerna → `3-1`, `3-2` |
| 1892 Wayfinder | A §9, avvisat | – | Idéerna (dimma, beslutskarta) → `2-1` |
| 1893 Grill Me, GSAP, Vercel, Supabase | A §9 (Grill Me), A §2 (GSAP), A §3 (Vercel avvisat, Supabase) | – | Grill Me som källa → `bilaga-b-skills.md` (`intervju`) |
| 1894 Variate | A §1 | – | Får aldrig publiceras → `2-8`; användningen → `3-2`, `2-9` |
| 1895 Task Observer | A §9 | – | – |
| 1896 Karpathy-reglerna | A §9, avvisat | – | – |
| 1897 Marknadsskills | A §9: avvisat som paket, kandidat för destillering | Ändrat: inventeringen föreslår destillering av fyra skills (K1, K18, K60, K75) | – |
| 1898 OpenCLI | A §9, avvisat | – | – |
| 1899 Graft | A §9 | – | – |
| 1900 Ouroboros | A §9, avvisat | – | – |
| 1901 `scroll-world` | A §2 | – | – |
| 1903–1933 Skeletten `stitch-review` och `story-review` | – | **Strukna** (analysen M11): helsidesskärmdumpar mot regeln *beskär och zooma*, scrollytelling som grundantagande, Stitch-id via `CLAUDE.md` (M7, rättat i v0.74) | Ersatta av `granska` → `bilaga-b-skills.md`. Bredderna, fasta fält, tre utfall och JSON för grinden → `3-2`; horisontell scroll i 375 px och reducerad rörelse → `bilaga-c-kontroller.md` |

## Verktyg som nämns i övriga avsnitt

| v0.74 (rader) | Verktyg | Var i A | Anmärkning |
|---|---|---|---|
| §1 (94–108) | Stitch som kärnidé | §1 | Stitch per sajt ersatt (beslut 2026-10-15) |
| §2 (112–162) | Node, Playwright, Stitch-CLI, Googles stitch-skills, davideast/stitch-mcp | §1, §4; Node i *Nämnda* | Kommandotabellen och verktygsmanifestet är inte register; källan är `kunskap/research/2026-10-14_stitch-och-verktyg.md` |
| §3 (166–221) | Skillmappar i projektstrukturen | – | → `bilaga-f-projektstruktur.md` |
| Fas 0 (229–244) | Cloudflare-konto, Search Console, GA4, Tag Manager, Business Profile | §3, §7 | – |
| Fas 0b (246–273) | SingleFile, Firecrawl, REA, Playwright CLI, Stitchs import av designsystem | §1, §3, §4 | – |
| Fas 1 (275–317) | Ouroboros, Wayfinder, djupresearch, OpenSEO, Claude SEO, Meng Tos *video to super prompt*, Tastemaker, `AskUserQuestion` | §1, §7, §9, §10 | `AskUserQuestion` är en inställning → `3-3`; intervjun utan svarsalternativ → `2-1` |
| Fas 1b (319–347) | Inspo `recommend`, Tastemaker, ADHD, Emils `break-ui`, gallerivy, Codex-pluginet, Buzz, Unlazy | §1, §9 | Riktningar ur Inspo ersatta av stilkit (beslut 2026-10-15) |
| Fas 2 (349–377) | Stitch, Hallmark, Aura.build, Relume, design-md-planner, designmd.space, Enhanced Prompt | §1 | – |
| Fas 3 (379–410) | Supabase, Turnstile, D1, Resend, Cloudflare Email Sending, Handoff, `/batch`, sandlåda | §3, §5, §9, §10 | – |
| Fas 4 (412–435) | Krehels skills, designer-skills, Reticle, Hallmark, Anthropics *crop tool recipe* | §1, §4 | Beskärningsverktyget är ett recept, inget verktyg → `3-2` |
| Fas 5 (437–498) | scrollytelling, GSAP ScrollTrigger, Scroll World (Higgsfield, Manus, Runway), Scrollcraft, Remotion, Claude Motion, Refero, Mobbin, Land-book, Coolors, sektionsgallerier, typsnittskällor, mikrointeraktionskällor, Aceternity UI, React Bits, godly.design, 21st.dev, Awwwards, UI Skills, img2threejs, Emils *Animate* och *animation vocabulary* | §1, §2, §6; Manus och Runway i *Nämnda* | Designkällorna i fas 5 låg på fel ställe (analysen §6.1); de står nu under design |
| Fas 6 (500–558) | Humanizer, Slop Monster, Landing Page Design, Meng To, Variate, Playwright, Wikipedias guide för AI-text, Linear | §1, §4, §6; Linear i *Nämnda* | Wikipedias guide är en kunskapskälla → `2-7` |
| Fas 6b (560–577) | Anti-Slop, Pococks arkitekturskills, Thermonuclear, `/simplify`, `/code-review`, agent teams | §4, §10 | – |
| Fas 6c (579–595) | Supabase Advisors, Lighthouse | §3, §4 | – |
| Fas 7 (597–619) | CodeRabbit, `/security-review`, Mantis, Security Review GitHub Action, Claude Security, cloudflare/security-audit-skill, GitHub CLI, Workers, Workers Builds, Access, Wrangler, Cloudflare-pluginet, API-MCP:n, Variate | §1, §3, §4, §5, §10 | – |
| Fas 8 (621–718) | Mantis, AI-assistenter för AEO, `llms.txt` och OKF, Google Workspace CLI, OpenSEO, Vizzly, Symphony, dedupe-skillen; 8g: Search Console, GA4, Business Profile, PageSpeed och CrUX, Resend, Firecrawl, mcp-gsc, google-analytics-mcp, resend-mcp, firecrawl-mcp-server, Lovables katalog; 8f: Pococks `improve-codebase-architecture`, `/doctor` | §3, §4, §5, §7, §8, §10; AI-assistenter och Lovable i *Nämnda* | dedupe-skillen saknas i A: den är en idé ur Boris-skills-videon, ingen namngiven tredjepartsskill. Idén → `2-9`. Utredningen i 8g → `2-9` |
| §5 (722–852) | Paseo, `/goal`, `/loop`, arbetsflöden, Planning with Files, advisor, Goal Buddy | §8, §9, §10 | – |
| §6 (856–964) | Mods och modexempel, claudemod.com, Variate, Monitor, `claude agents` | §1, §9, §10 | – |
| §7 (968–1176) | Jev-verktygen, Toolgate, Agit, Bitwarden Secrets Manager, Docker Sandbox, Monitor, OpenRouter och Vercel AI Gateway | §5, §9, §10; OpenRouter och Vercel AI Gateway i *Nämnda* | – |
| §8 (1179–1343) | `/init`, Skill doctor, `/skills`, prompt audit, `/doctor`, safe mode, Codex-pluginet, GPT-6 Astra, plugin och marknadsplats | §9, §10 | Inställningarna (`fewer-permission-prompts`, auto mode setup, Opus plan m.fl.) är inga verktyg → `3-3` |
| §9 (1346–1422) | Build eval, Hillclimb, `claude -p`, Codeburn, Agit, Caliper | §4, §5, §9, §10 | – |
| §10 (1426–1567) | Task Observer, Karpathys loop, `project-context`-skill | §9 | `project-context` → `bilaga-b-skills.md`; Karpathys loop jämförs med K92 i A |
| §11 (1571–1776) | advise-project-approach, youtube-transcript-api, yt-dlp, LLM Wiki-gisten, OKF, REA, ADHD, frontend-design, Taste, Arena, Higgsfield, Stitchs bildgenerator, Sendbird, Stream, GA4, Consent Mode, Cloudflare Web Analytics, Supabase, Resend | §1, §3, §6, §7; Sendbird och Stream i *Nämnda* | – |
| §14 (2138–2189) | Astro, Durable Objects, Supabase Auth, Next.js, Astryx, shadcn, Playwright CLI, Chrome DevTools MCP, Stripe Checkout, Jev | §1, §3, §4, §9; Next.js i *Nämnda* | Öppna frågor om tillval (Hallmark, Inspo, Caliper, säkerhetsgranskning, Jev) → statuskolumnen i A och `bilaga-e-oppna-fragor.md` |
| §15 (2193–2263) | Clay, brandguidelines.net, ASD-STE100 | §1, §8; ASD-STE100 i *Nämnda* | – |
| §16 (2266–2289) | Steg för Stitch, Hallmark, Scroll World, GitHub CLI, Wrangler | – | → `5-byggplan.md` |
| Källistan (5–88) | Unlazy-repot, Linearity | §9; Linearity i *Nämnda* | Källistan → `kunskap/kallor.md` |

## ⚠️ som ersattes med 📄 (analysen §5.1)

Stitch-CLI (Node, licens, kommandon, `.agents/skills`), Googles stitch-skills (installation, kräver MCP), davideast/stitch-mcp, Hallmark, Inspo, Variate, Skill Spector, scrollytelling (delvis), Pococks skills, mods (version), `/goal`, Monitor, advisor, `/batch`, `/doctor`, `claude agents`, arbetsflöden, plugin och versionslåsning (`2026-10-14_stitch-och-verktyg.md`, `2026-10-14_claude-code-verifiering.md`); Cloudflare-pluginet och API-MCP:n, Workers, Access, Turnstile, D1 (`2026-10-14_cloudflare-stack.md`); Business Profile och Search Console (stitch-och-verktyg); Resend och Supabase (`2026-10-14_dataoverforing-och-analys.md`); Higgsfield (`2026-10-14_ai-forordningen-och-rattigheter.md`); Remotion och cloudflare/security-audit-skill (kontrollerade 2026-10-15 i v0.74). Kvar som ⚠️: allt som bara har en video som källa och inte är kontrollerat.

## Fallgropar

| Nr | Var |
|---|---|
| 1 | Stitch-CLI-raden (`.agents/skills`) |
| 33, 128 | Urvalet: prövat med och utan; RTK-raden |
| 65, 66 | Urvalet: passform; underhåll, licens och kostnad |
| 84 | Astryx-raden |
| 96 | Raden shadcn, dashboard m.fl. |
| 97, 98, 127 | Urvalet: Skill Spector, låst version, exakta adresser |
| 144 | Urvalet: ingen överlappning |
| 185, 187, 189, 190, 192 | Raderna Access, Supabase, plugin, mods, cloudflare/security-audit-skill |

## Underlag som användes

- `BESLUT.md` (2026-10-13 18:47, 18:52; 2026-10-14; 2026-10-15), `LAGE.md`, `principer.md`, `karta/README.md`, `karta/flodet.md`.
- Konsolideringsanalysen §4.2 (Skill Spector, Emils regler, Lucide och Inter, Lighthouse), §4.3, §4.4, §5.1, §6.1, §7.3, §7.4, M13.
- `2026-10-15_karta-mot-guide.md` §4 (glappet mot inventeringen, konflikt 14).
- `2026-10-15_kompetensluckor-och-kandidater-per-lager.md` (Firecrawl, Relume, GA4-MCP:n, Fontshare, Remotion, Lottie, CrUX).
- `2026-10-15_webb-pro-genomgang.md` (licensbeskedet för Mobbin).
- Researchen 2026-10-14: stitch-och-verktyg, cloudflare-stack, claude-code-verifiering, dataöverföring och analys, AI-förordningen och rättigheter.
- `inventering/inventering.json` (läst, inte ändrad): id för B1–B72 och K1–K99.

## Avstämning mot de andra filerna

Bilagan skrevs samtidigt med lagerfilerna och flödesfilerna och stämdes av mot dem 2026-10-15. Avsnittet beskriver läget före ommärkningen; det som ändrats står i *Ommärkning 2026-10-15* nedan. Nivå och status följer regelns hemvist:

- Nivåer ändrade efter lagerfilerna: skill-creator N2, när ett steg gjorts för hand tre gånger (`5-byggplan.md`, `3-4`); Tastemaker kandidat i N2 (`2-5`, steg 4); Cloudflare Access och Search Console N1 vid publicering (`2-8`); Chrome DevTools MCP prövas i N1 för diagnos (`2-8`); scrollytelling N2 som tillval (`2-6`); Remotion N3 (`2-6`); Supabase och Durable Objects N3 (`2-8`); ADHD N2 under `2-5`; Claude Security, cloudflare/security-audit-skill och Mantis N3, Security Review GitHub Action och CodeRabbit N4 (`2-8`); Business Profile N2 i researchen (`2-1`).
- Lucide prövas i N1 som standard i kiten; förbudet i v0.74 gäller nu bara per kit (`2-5`). Därför står Lucide inte som öppen fråga.
- UI Skills avvisat som installation (`2-6`).
- Kriteriet *prövat med och utan* är kort här; regeln bor i `3-2`. Regeln om Stitch, Inspo och Tastemaker bara när kit tas fram är en hänvisning; den bor i `2-5`.
- Avsnittet *Avstå och Bevaka enligt kompetensrapporten* lades till eftersom `2-3`, `2-4` och `2-7` hänvisar hit för det som avstås. Listorna är rapportens, per lager.
- Avsnittet om inventeringens kandidater fick rubriken *som v0.74 inte nämnde*, eftersom lagerfilerna nu tar in många av dem (till exempel axe och Lighthouse CI i N1-kontrollerna, `2-8`).

## Ommärkning 2026-10-15

Efter granskningen (`konsolidering/granskning-v1.0.md`) och tillägget kl. 14.30 i `konsolidering/skrivregler.md`. N1-verktygen är nu de som skrivreglerna räknar upp: Stitch-CLI, Inspo, Astro, Playwright, axe, Lucide (förslag, öppet) samt Cloudflare, GitHub och Wrangler om sajten publiceras. Därtill den inbyggda delagenten för granskaren (byggplanens steg 4). Bilagan har inga N1-regler längre: urvalskriterierna gäller det som tas in utöver N1-verktygen. Inget är struket; allt nedan är flyttat till N2 eller senare.

### Flyttat från N1

| Vad | Före | Efter | Skäl |
|---|---|---|---|
| Urvalskriterierna: bygg egna, passform, underhåll/licens/kostnad, ingen överlappning, installera inget ogranskat, Skill Spector, låst version, externa granskningsskills, ett tillval åt gången | 9 × [N1] | [N2] | Taket på cirka 60 N1-punkter; bilaga A har ingen N1-kvot i skrivreglerna. Första sajten använder en fast lista verktyg |
| Googles stitch-skills | N1, stilkitsbygget | N2 | Granskningen 1.1 (risk 5, verktygsladdning) |
| Refero, Mobbin, 21st.dev | N1, biblioteksbygget | N2 | Samma |
| godly.design och Awwwards, Land-book och Coolors, sektionsgallerierna, typsnittskällorna | N1, stilkits- eller biblioteksbygget | N2 | Samma |
| Stitchs bildgenerator | N1, stilkitsbygget | N2 | Samma |
| Chrome DevTools MCP | N1, för diagnos | N2 | Granskningen 1.1 (`2-8` 116) |
| Lighthouse | N1, kontrollskriptet | N2 som Lighthouse CI; om kontroll 9 kör Lighthouse redan i N1 avgörs i `2-8` | Inte i skrivreglernas N1-lista; granskningen 1.1 flyttar Lighthouse CI ur N1 |
| Skill Spector | N1, vid första tredjepartsinstallationen | N2 | Ingen tredjepartsinstallation utöver N1-listan i första sajten |
| Turnstile, D1, Resend | N2, N1 om sajten har formulär | N2, med formuläret | Formulär är N2 (granskningen 1.2, `2-8` 43) |
| Google Search Console | N1 vid lansering (om sajten publiceras) | N2 vid lansering, N3 i förvaltningen | Inte i skrivreglernas N1-lista |
| Grill Me | N1 som källa till `intervju` | N2, bara kritiskt | Granskningen 3.2: skillen intervjuar användaren, inte kunden |

### Granskningsfynd som åtgärdats

| Fynd | Åtgärd |
|---|---|
| 1.2 `/security-review`: `2-8` 88 N1 mot A och `3-3` N2 | A behåller N2, i linje med N2-raden i `5-byggplan.md` |
| 1.2 Monitor: A N4 med Var `3-1`, regeln i `3-3` N2 | N2, Var = `3-3` |
| 1.2 Stjärnor och kostnad i tre lägen: A N1, `2-2` N2 | N2. *Stjärnor är inte passform* bor nu i A, urvalskriterierna (granskningen 2.2), sammanslagen med *passform före popularitet* och med källorna ur `2-2` (anteckningarna för lager 1–2 och 8). Kostnad i tre lägen har hemvist i `2-2`; A hänvisar |
| 1.3 punkt 5, Lucide: A "N1, standard i kiten" mot `3-3` "öppet" | "N1, förslag"; öppet – `bilaga-e-oppna-fragor.md`, fråga 1.10. Ersätter avstämningens rad om att Lucide inte är en öppen fråga |
| 2.1 punkt 1, Lighthouse ≥ 90 | Grunden skriven som "leverantörens dokumentation; tröskeln vald (en källa)"; skalan visar färgband men kräver inte 90 |
| 2.3 punkt 1, `bilaga-c-kontroller.md` saknades | Finns nu; §4 hänvisar också till de tio N1-kontrollerna i `2-8` |
| 3.2 Grill Me | N2, bara kritiskt, med skälet i raden |
| 3.2 `principer.md` och "README, princip 8" | "`guide/README.md`, princip 8" |
| Hänvisningar (skrivreglerna) | `karta/README.md` och `karta/flodet.md` → `historik/karta/…`; "bilaga B" i kolumnen Var → `bilaga-b-skills.md`; Skill Spectors Var "bilaga A" → "urvalskriterierna ovan"; öppna frågor med nummer (1.3, 1.6, 1.10) |

### Övriga ändringar

- **Ny rad för axe** (`@axe-core/playwright`, K70) i §4. axe är ett N1-verktyg men nämndes bara under inventeringens kandidater. Licensen (MPL-2.0) och flaggan om att automatiken bara hittar en del av felen kommer ur inventeringen. Meningen om axe och Lighthouse CI i N1-kontrollerna (avsnittet om inventeringens kandidater) gäller nu bara axe.
- **Cloudflare på en rad:** Workers, Workers Builds och Access är sammanslagna, så att "Cloudflare" är ett N1-verktyg. Access-radens förbehåll (fallgrop 185) står kvar i den. Räkningen i *Guidens verktyg som saknas i inventeringen* blev därför 98 rader med – (99 före), varav 17 avvisade.
- **Stitch-CLI och Inspo:** nivån preciserad till byggplanens steg 2, när de tre minimala kiten tas fram; Stitch på provsidan i dator och mobil, aldrig med kundinnehåll. Inspo-raden säger att den installeras från repo-adressen, eftersom urvalskriteriet nu är N2.
- **Introduktionen** fick ett stycke om vilka verktyg den första sajten använder.

### Att stämma av mot andra filer

- `2-8-teknik-och-kvalitet.md` hade vid ommärkningen Lighthouse som N1-kontroll 9, Lighthouse CI och Chrome DevTools MCP på N1 i verktygsraden (rad 116), `/security-review` som N1 (rad 88) och Search Console som N1 vid lansering (rad 79). A följer skrivreglernas N1-lista; nivåerna för reglerna avgörs i `2-8`.
- `2-9-drift-och-forvaltning.md` rad 34 (N1): den första rapporten görs "när Search Console visar data". Med Search Console i N2 behöver raden stämmas av.
- `2-2-omfattning.md` rad 35 och `3-4-larande-och-underhall.md` rad 83 har stjärnregeln fullt utskriven; de bör hänvisa till A.
