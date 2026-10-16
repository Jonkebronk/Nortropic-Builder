# refero-design

**Källa:** https://github.com/referodesign/refero_skill, sökvägen `skills/refero-design/`.
- Läst 2026-10-16 vid commit `2382e51` (2026-10-12, v1.0.3, enligt `VERSION`).
- Skillen flyttades till mappen i `c2f45ec` (2026-08-04). Lokal klon: `kallor/refero-skill/repo`.
- Lästa filer: `SKILL.md` (534 rader) och alla nio referensfiler (`mcp-tools`, `visual-workflow`, `example-workflow`, `craft-details`, `anti-ai-slop`, `typography`, `color`, `motion`, `icons`, `copywriting`; de fyra sista bara översiktligt). Dessutom `README.md`, `mcp.json` och [doc.refero.design/skill/overview](https://doc.refero.design/skill/overview).

**Licens:** MIT, © 2026 Refero. Licenstexten följer med vid kopiering.

**Vad det är:**
- En metod som sätter research först. Varje designbeslut ska förankras i referenser före bygget, med låsta referenser, en beslutslogg och spärrar mot att referenserna slätas ut till ett genomsnitt.
- Skillen fungerar fristående som metod och hantverksguide. Livesökningen kräver Refero MCP och en betald plan.

**Hur det fungerar:**
- **Tre forskningslager:** styles (visuell riktning), screens (konkreta mönster) och flows (flerstegsresor). Djupet väljs efter risk: 2–3 sökningar för en snabb förbättring, 3–5 sökningar och 3–4 hela stilar för en ny landningssida.
- **Mot genomsnitt.**
  - "Do not average references into a safe middle". Välj en dominerande riktning och låna 1–2 smala detaljer.
  - Token- och komponentroller bevaras (CTA-färg bara på CTA).
- **Referenslås** med sju fält: Primary, Preserve (3–5 drag), Borrow only (1–2), Role rules, Media strategy, Reject och Token commitments.
- **Beslutslogg.** Tabellen `Decision | Source | Source rule / role | Why`. Ett stort val utan källa skeppas inte.
- **Kvalitetsgrind** med 15 frågor. Efter bygget följer visuell QA mot låset med nivåerna P0–P3 (`visual-workflow.md`).
- **Hantverk som rör skelettet:**
  - Undvik hero → funktioner → priser → FAQ → CTA om research inte stöder det.
  - Kort-testet: "Default is NO cards".
  - Rubrikordning utan hopp.
  - `scroll-margin-top` för ankare.
  - Riktiga länkar.

**Kvalitet och underhåll:**
- 311★, 27 forkar, 1 bidragsgivare, push 2026-10-15. Ungt och litet.
- Issue #1 (öppen, 2026-05-01) säger att dokumentationen beskrev ett äldre API. Dagens `mcp-tools.md` och [doc.refero.design/mcp/tools](https://doc.refero.design/mcp/tools) är i stort sett i fas. Verktygslistan i docs har dock tio verktyg, bland annat `refero_search_site` och `refero_search_app`, som SKILL.md inte nämner.

**Det bästa vi kan ta:**
- Mallen för referenslåset och beslutsloggen (*Research Workflow*, *Present Findings*) i sajtens `design.md`.
- Kvalitetsgrindens frågor om spårbarhet (*Quality Gate*).
- Kort-testet (`anti-ai-slop.md`, *#2 Cards everywhere*).
- Visuell QA med P0–P3 (`visual-workflow.md`).

**Var det hamnar hos oss:**
- `skill: skelett`, delfil `skelett/sektioner.md` (förslag): beslutslogg för sektionsval och sektionsordning, kort-testet och spärren mot genomsnitt.
- Färg och typ går till yta-skillen.
- Skillen installeras inte som den är (se risker).

**Passar vår stack?** Reviderat efter BESLUT 2026-10-16, *React, Tailwind och JavaScript tillåts*.
- Metoden ja. Den kostar 0 kB, eftersom den är en arbetsgång.
- React-exemplen i hantverksfilerna gäller nu för öar. Next-specifika delar (`<Link>`, nuqs) motsvaras i Astro av vanliga `<a href>` och URL-parametrar.
- Kod- och komponentexempel ur Refero-stilar får tas med licens per komponent. ⚠️ Referos villkor är inte lästa.
- Den globala `* { touch-action: manipulation }` är fortfarande överflödig med viewport-taggen.
- Krock att ta upp med Johnny: Referos krav på "minst en minnesvärd detalj" leder lätt till JS-effekter som påverkar Lighthouse 100 och rörelsereglerna.
- Exempelsökningarna gäller SaaS och fintech. ⚠️ Hur väl katalogen täcker svenska kliniker och hantverkare är okänt.
- Förbudet mot konventionell sektionsordning ska vägas mot NN/g:s Jakobs lag ("users prefer your site to work the same way as all the other sites they already know") och göras villkorat: avvikelser kräver skäl i loggen.

**Risker och flaggor:**
- **Anspråk på företräde.** Beskrivningen säger "Primary/default skill" och "Prefer over … craft-only skills", och kroppen förbjuder andra designskills som "parallel design authority". Installerad skulle den trycka undan våra egna lagerskills, så den ska destilleras, inte installeras.
- Spänning med BESLUT 2026-10-16: referensregeln är struken, men Claudes anmärkning om upphovsrätt står kvar. Referos "Do not copy one reference" stämmer med anmärkningen.
- Ingen telemetri i skillen.
- Små faktafel i hantverksfilerna (härlett). `color.md` anger stor text som "18px+ bold". WCAG:s gräns är 14 pt fet, cirka 18,66 px, samma rättelse som Krehels PR #21. Siffror ur referensfilerna ska därför kontrolleras mot WCAG innan de används.

**Inloggning:**
- Skillen kräver ingen.
- Livesökning (styles, screens, flows) kräver Refero MCP med betald plan och OAuth. Se refero-mcp-kortet.

**Slutligt förslag (skelett-struktur-beslut.json, 2026-10-16):** `skill: skelett`; referenslås, beslutslogg och spärren mot genomsnitt i `.claude/skills/skelett/referenser.md`, kort-testet i `skelett/layout.md`.
