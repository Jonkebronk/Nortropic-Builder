# Johnnys fem länkar: AI-byggare och webbyggare på GitHub

Kontrollerat 2026-10-15 via GitHubs API (stjärnor, licens, senaste push) och projektens README-filer. Gäller främst Flödet, lager 2 (spåret med befintlig sajt), lager 4–5 (när biblioteket byggs) och lager 9 (ändringsagenten i förvaltningen).

## Fråga: Vad tillför de fem länkarna, och vad ska Nortropic ta in?

### Takeaway

Två av länkarna tillför något nytt. **ai-website-cloner-template** (MIT, 36 807 stjärnor) ger en färdig metod i fyra steg (kartlägg, observera, bygg, jämför) som passar spåret där kunden redan har en sajt och som verifieringsloop när biblioteket byggs; metoden ska destilleras och flyttas från Next.js till Astro. **Frappe Builders AI-agent** (MIT, 2 434 stjärnor) ger principer för en ändringsagent i förvaltningen: läs befintliga sidor och följ deras designspråk, återanvänd komponenter och tokens, hitta inte på fakta, låt känsliga ändringar vänta på godkännande och gör varje ändring reversibel. **Open Design** (Apache-2.0, 101 249 stjärnor) är en källa att hämta format och granskningskriterier ur, inte en plattform att bygga Nortropic på. **website-builder-setup** installerar samma tre verktyg som webb-pro redan hade (UI/UX Pro Max, Motion och 21st) och tillför inget. Stjärnsökningen på "website builder" visar mest visuella dra-och-släpp-redigerare för människor, som inte passar ett flöde där agenter arbetar i kod.

### Cited Findings

**1. tenfoldmarc/website-builder-setup** — https://github.com/tenfoldmarc/website-builder-setup
- 356 stjärnor, 59 forks, skapad 2026-03-18, senaste push 2026-06-11. GitHubs metadata anger ingen licens.
- README: "This skill installs three tools that turn Claude into a full web design studio." Verktygen: "UI/UX Pro Max — 50+ design styles, 161 color palettes, 57 font pairings. Your sites look designed, not AI-generated", "Framer Motion — … The difference between a $500 site and a $10,000 site", "21st.dev Magic — 100+ production-ready React components."
- Repot består av README och en SKILL.md (4,8 kB).

**2. frappe/builder** — https://github.com/frappe/builder
- 2 434 stjärnor, 558 forks, MIT, senaste push 2026-10-15. Python och Vue, byggt på Frappe Framework.
- README om AI-agenten Bob: "an agent that grounds itself in your site instead of guessing. It reads your existing pages and follows their design language by default, reuses your components and theme tokens, fits new pages into your route structure …, wires forms and data-driven sections to real doctypes, and researches facts online rather than inventing them. Reads respect your permissions, sensitive changes wait for your approval, and every AI edit is revertable."
- Har en skill för kodagenter: `skills/frappe-builder/SKILL.md` ("lets your own coding agent (Claude Code, Codex, OpenCode and others) edit, build and publish Builder pages … through frappectl").
- Motivering i README: sidor från andra verktyg var "bloated with unnecessary scripts and styles"; prestanda prioriteras från start.

**3. GitHub-sökningen "website builder", sorterad på stjärnor** — https://github.com/search?q=website+builder&type=repositories&s=stars&o=desc (15 515 träffar)
- webstudio-is/webstudio: 9 072 stjärnor, **AGPL-3.0**, visuell byggare och Webflow-alternativ, kan köras på Cloudflare Workers.
- plasmicapp/plasmic: 7 103 stjärnor, MIT, visuell byggare för React.
- elementor/elementor: 7 090 stjärnor, **GPL-3.0**, WordPress-sidbyggare.
- blocks/blocks: 5 095 stjärnor, MIT, JSX-baserad sidbyggare.
- microweber/microweber: 3 437 stjärnor, MIT, PHP och Laravel.
- frappe/builder: 2 434 stjärnor, MIT (se ovan).
- Mobirise/Mobirise: 984 stjärnor, ingen licens angiven.
- chaibuilder/core: 486 stjärnor, BSD-3-Clause, AI-stödd visuell byggare för Next.js.
- ycode/ycode: 324 stjärnor, MIT, skapad 2026-02.
- De mest relevanta AI-projekten syns inte i sökningen eftersom de inte använder frasen "website builder": nexu-io/open-design (101 249 stjärnor), JCodesMore/ai-website-cloner-template (36 807) och coreyhaines31/marketingskills (54 500, se lager 1–2).

**4. nexu-io/open-design** — https://github.com/nexu-io/open-design
- 101 249 stjärnor, 11 650 forks, Apache-2.0, skapad 2026-04-28, senaste push 2026-10-15, 1 165 öppna ärenden.
- README: "the 1st collaborative AI design agent workspace … create a prototype that follows your design system." "We don't ship an agent. The claude / codex / … already on your PATH are the design engine."
- "Every render reads the active package's DESIGN.md as the core brand contract. 151 design-system packages ship with the repo; … newer packages can add manifest.json, tokens.css, components, assets, and provenance."
- Katalogen består till stor del av stora varumärken (bl.a. apple, nike, stripe, airbnb, tesla), härledda ur VoltAgent/awesome-design-md; startpaketen är "default (Neutral Modern)" och "warm-editorial".
- "100+ functional skills ship in skills/"; designmallen `critique` är en "Five-dimensional self-critique scoresheet". Ursprung enligt README: alchaincyf/huashu-design ("junior-designer workflow, brand-asset protocol, anti-AI-slop checklist, five-dimensional critique") och bergside/awesome-design-skills (57 designskills).
- "Product analytics and session replay are consent-gated; scrubbed safety and reliability telemetry is always on."
- Har import från Claude Design (`/api/import/claude-design`) och körs som en lokal tjänst (Express och SQLite) som startar agentens kommandorad med en skill eller designmall plus DESIGN.md.
- Licens: Apache-2.0; medföljande skills och mallar med egen LICENSE behåller sin licens.

**5. JCodesMore/ai-website-cloner-template** — https://github.com/JCodesMore/ai-website-cloner-template
- 36 807 stjärnor, 5 413 forks, MIT, skapad 2026-03-13, senaste push 2026-10-05.
- Stack: Next.js 16, React 19, shadcn/ui, Tailwind CSS v4 med oklch-tokens, Lucide.
- Skillen `/clone-website` har fyra steg: "Map — map source URLs to local routes and preserve existing work. Observe — inspect desktop/mobile pages, extract real assets and fonts, and exercise alternate states. Build — implement editable components and working interactions … Compare — review source and local pages at matched sizes/states, repair visible differences, and run the production check."
- Leverans: "route mappings, run instructions, comparison screenshots, and any remaining gaps."
- Användningsfall enligt README: "Platform migration — rebuild a site you own …", "Lost source code …", "Learning — deconstruct how production sites achieve specific layouts, animations, and responsive behavior."
- Inte avsett för: "Passing off someone's design as your own — logos, brand assets, and original copy belong to their owners", och "Violating terms of service".
- Skillen ligger portabelt i `.agents/skills/clone-website/` med en tunn kommandobrygga för Claude Code.

### Inferences

- **website-builder-setup (Avstå):** verktygen är exakt de som webb-pro redan hade, och webb-pros byggen bedömdes som generiska (BESLUT.md, tillägget 2026-10-06: "inget bygge hittills har varit bra nog, allt har varit generiskt"). Repot representerar alltså arbetssättet Nortropic lämnar: fler verktyg i varje bygge i stället för ett eget, sammanhängande system. Utan licens får det inte heller kopieras.
- **ai-website-cloner-template (Ta in, destilleras):**
  - Lager 2, spåret med befintlig sajt: när kunden äger sajten ger steget Map en URL-karta, som blir underlag för 301-omdirigeringar, och steget Observe en inventering av innehåll och tillgångar.
  - Lager 4–5: när biblioteket byggs kan metoden plocka isär hur referenssajter löser layout och rörelse, inom Johnnys regel från 2026-10-03 (layout, palett och typsnitt får lånas; identitet, texter och bilder kopieras aldrig). Det stämmer med projektets egen gräns.
  - Flödet: steget Compare är en konkret verifieringsloop (sida mot sida i samma storlek och tillstånd, rätta synliga skillnader), samma princip som Anthropics generator och bedömare.
  - Metoden flyttas till Astro; koden (Next.js och React) passar inte Nortropics stack.
- **frappe/builder (Pröva som källa, Avstå som plattform):** Bobs principer motsvarar en ändringsagent i lager 9 och ITIL:s ändringstyper: standardändringar som följer befintligt designspråk och komponenter, känsliga ändringar som väntar på Johnny, och reversibilitet (Cloudflare sparar de senaste 100 versionerna, enligt anteckningarna för lager 9). Frappe-stacken passar inte.
- **open-design (Pröva som källa, Avstå som plattform):**
  - DESIGN.md som varumärkeskontrakt per paket motsvarar Nortropics stilkit. Formatet och kriterierna i `critique` och huashu-designs checklista mot AI-slop kan ingå i underlaget till den kalibrerade bedömaren.
  - Paket som härletts ur stora varumärken är identiteter, inte stilkit för småföretag i Norrbotten, och identitet ska enligt Johnnys regel inte kopieras.
  - Som plattform är det ett stort och nytt system (fem och en halv månad gammalt, 1 165 öppna ärenden, över 100 skills och 151 designsystem). Det liknar webb-pros tillvägagångssätt och går emot principen att börja enkelt.
  - Telemetrin som alltid är på bör vägas in om kunddata hanteras i verktyget.
  - 101 000 stjärnor på fem och en halv månad mäter uppmärksamhet, inte belagd kvalitet.
- **Stjärnsökningen:** visuella redigerare för människor passar inte, eftersom Nortropics kunder inte ska redigera själva och agenterna arbetar i kod. Två har copyleft-licens (Webstudio AGPL, Elementor GPL). Att söka på frasen "website builder" är en svag signal; ämnestaggar (till exempel agent-skills, claude-code, design-systems) och de kurerade listorna i anteckningarna om Flödet fångar de relevanta projekten bättre.

### Gaps

- SKILL.md-filerna i website-builder-setup, frappe-builder och clone-website är inte lästa; bedömningarna bygger på README-filerna.
- Licenserna för enskilda skills och designsystem i open-design är inte kontrollerade, och inte heller ursprunget för de 151 paketen.
- Inget av projekten är provkört.
