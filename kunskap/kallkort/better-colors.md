# better-colors

**Källa:** https://github.com/jakubkrehel/skills, sökvägen `skills/better-colors/`. Läst 2026-10-16 vid commit `4c66b1fa86e9` (repot, 2026-10-12); senaste ändring i skillen är `9b03828ccb` (2026-10-06). Pluginversion 1.13.2 i `.claude-plugin/plugin.json` – repot har inga releaser, taggar eller ändringslogg, så versionsnumret är den enda versionssignalen. Lästa filer: `SKILL.md`, `palette-structure.md`, `palette-generation.md`, `color-usage.md`, `contrast.md`, `token-naming.md`, `color-formats.md`, `agents/openai.yaml`, repots `README.md`, `AGENTS.md` och `.claude-plugin/plugin.json`. Webbsidan https://jakub.kr/skills lästes också; den beskriver skillen som en OKLCH-konverterare, vilket är inaktuellt sedan PR #13 (2026-08-14, ”improve /better-colors to not only use oklch”).

**Licens:** MIT, © 2026 Jakub Krehel (ur `LICENSE`). Kräver att upphovsrätts- och licenstexten följer med när text kopieras. Vi destillerar med egna ord och kopierar ingen text, så kravet slår inte till; källan anges ändå i delfilen.

**Vad det är:** En kunskapsskill som bygger och granskar färgsystem: ramper, roller per steg, tokennamn, notation, gamut och kontrast mätt på det renderade paret. Den slutar varje granskning med en tabell och domen Block eller Approve.

**Hur det fungerar:**
- **Ramper, inte färger** (`palette-structure.md`). En neutral ramp (bär 80–90 % av gränssnittet), en accent och 0–4 statusramper, bara för tillstånd sajten visar. Varje steg har en roll: sidbakgrund, komponentbakgrund, hover, vald, subtil kant och avdelare, kant och fokusring, fylld yta, fylld hover, lågkontrasttext, högkontrasttext (Radix 1–12 eller Tailwind 50–950).
- **Neutraler.** Ren grå är fullgott; toning mot accenten är ett stilval med kroma 0,005–0,02 på accentens nyans. Samma ton genom hela rampen.
- **Status.** Minst 15° nyansavstånd i OKLCH från accenten; annars får en destruktiv handling egen form (konturknapp med ikon).
- **Rampens egenskaper** (`palette-generation.md`). Konstant nyans, kroma som toppar i mitten, finare steg i ljusa änden (50–200 cirka 0,04–0,05 i OKLCH L, mitten 0,07–0,10), grannsteg aldrig närmare än 0,03, aldrig rent svart eller vitt. Räknas med bibliotek (culori, colorjs.io, chroma.js) i oklab, aldrig för ögat.
- **Varumärkesfärgen** ligger på fyllningssteget om den bär knappar. Klarar den inte vit text ligger den kvar på sitt steg, och knappar fylls med ett mörkare – ”mörka aldrig varumärket i smyg”.
- **Mörkt läge.** Peka om rollerna, sänk accentens mättnad ett eller två steg, ge mörka änden mer separation och mät om varje par. En enda växlingsmekanism. Ökad kontrast (`prefers-contrast: more`) får ett eget block per läge och minst 0,15 större L-avstånd.
- **Användning** (`color-usage.md`). En färg, en betydelse – nyanser inom 15° räknas som samma färg. Accent betyder interaktivt; rubriker är neutrala. En fylld primärhandling per vy. Färg bär aldrig betydelse ensam. Gradienter i `oklab` som standard, `oklch` om mitten blir grå.
- **Kontrast** (`contrast.md`). Mät mot bakgrunden som faktiskt renderas; halvgenomskinligt mot ljusaste och mörkaste bakom. WCAG 2: 4,5:1, stor text (minst 24px eller 18,67px fet) 3:1, UI och grafik 3:1. APCA-tabell bredvid. Ett underkänt par rapporteras och lagas bara på begäran, genom att ändra L och behålla nyansen.
- **Tokens** (`token-naming.md`). Primitiver (namngivna efter nyans och steg) och semantiska tokens (namngivna efter roll); komponenter läser bara de semantiska. Rollinventering: ytor, text, kanter, accent, status. Avdelare och kant är skilda roller.
- **Gamut** (`color-formats.md`). Ramper byggs mot sRGB; P3 läggs till med sRGB-värdet först och `@media (color-gamut: p3)`.

**Kvalitet och underhåll:**
- 7 968 stjärnor, 303 forkar, skapat 2026-07-10, senaste push 2026-10-13. Två bidragsgivare: jakubkrehel (122 bidrag) och kontot ”claude” (6). Aktivt: skillen ändrades senast 2026-10-06.
- Repot har egna skrivregler i `AGENTS.md`: varje regel på ett ställe, exakta värden, och projektets befintliga stil (Tailwind eller vanlig CSS) ska matchas.
- Kända problem:
  - #40 (stängt 2026-10-07, rättat i PR #41): brytpunkten för svart eller vit text var ett APCA-värde (73 %) men såg ut att gälla WCAG. WCAG 2:s brytpunkt ligger nära L 56 %. Rättningen finns i dagens `contrast.md`, och jag har räknat om exemplet (svart 6,49:1, vit 3,23:1 på `oklch(65% 0 0)`).
  - PR #21 (öppen sedan 2026-08-27): fem fel i dokumentationen. De två som rör färg – Tailwind-namnet `text-text-secondary` och gränsen 18,67px för fet stor text – är redan rättade i main.
  - PR #14 (öppen): en ”anti-ui-slop”-grind som inte slagits ihop.
- ✔ Två egna kontroller med skript: Tailwinds blå ramp har stegen 0,039 och 0,050 i L i ljusa änden och 0,073–0,095 i mitten, och vit text klarar 3,68:1 på 500 och 5,17:1 på 600 – som källan säger. Rampen vandrar dock cirka 16° i nyans, alltså över källans egen 15°-gräns.

**Det bästa vi kan ta:**
- Rolltabellen och rollinventeringen (`palette-structure.md`, `token-naming.md`) som checklista för vilka roller ett kit måste ha.
- Rampreglerna med värden (`palette-generation.md`, *What a correct ramp looks like*, *Several hues at once*).
- Mörkt läge och ökad kontrast per läge (`palette-generation.md`, *Dark mode*; `color-usage.md`, *Light, dark and increased contrast*).
- Mätreglerna (`contrast.md`, *What to check*): renderad bakgrund, halvgenomskinliga ytor, `color-mix()`, text på bild.
- Tabellen *Before you finish* i `SKILL.md` som sökmönster: färgliteraler i komponentfiler, kanttoken använd som textfärg, statusnyans inom 15° från accenten, text på färg med alfa.

**Var det hamnar hos oss:**
- `.claude/skills/yta/farg.md`: ramper, neutraltoning, status, accent som handling, mörkt läge och kontrastmätning. WCAG 2.2 AA är grind och APCA bara rådgivande.
- `.claude/skills/yta/tokens.md`: rollinventeringen översatt till våra `--k-*`-namn.
  - Det som redan finns: `--k-bg` (sida), `--k-yta`, `--k-text`, `--k-dampad`, `--k-linje`, `--k-accent`, `--k-pa-accent`, `--k-accent-text`, `--k-fokus`, `--k-mork`/`--k-pa-mork`.
  - Det som saknas enligt källan: hover på fyllning, separat avdelare och kant, inaktiv text och status för formulärfel.
- **Kontroll:** sökmönstren går till designregelvakten som rapport (2-5, *Inga värden utanför kitet*); kontrastparen finns redan som grind.
- **Inte i kundbygget:** byggaren väljer inga färger (2-5 [N2]). Skillen används när kit tas fram och granskas.

**Passar vår stack?**
- **Utan översättning (noll JavaScript):** reglerna är ren CSS, och det mesta tas som det är. `oklch()`, `light-dark()`, `@media (prefers-contrast: more)` och `@media (color-gamut: p3)` fungerar i Astro och i vanlig CSS.
- **Tailwind 4** är nu tillåtet (BESLUT 2026-10-16). Då kan `@theme`-avsnittet i `token-naming.md` tas nästan som det är, med `--k-*` som semantisk nivå. Det kostar ingen JavaScript i webbläsaren, bara byggsteget. Observera att Tailwind 4 dubblerar prefixet: `--color-text-…` blir `text-text-…`.
- **Behöver översättas:**
  - Krehels namngrammatik (`--color-bg-surface` osv.) mot våra svenska rollnamn `--k-*`. Varningen om att `primary` får dubbel betydelse blir ett ickeproblem eftersom vi inte använder ordet.
  - Kiten har i dag bara en nivå (värden direkt i `[data-kit]`). Källans tvånivåmodell (primitiver plus roller) behövs först när ett kit får mörkt läge eller fler accentsteg.
- **Krockar med Lighthouse 100, *HTML först* eller rörelsereglerna:** inga.

**Risker och flaggor:**
- Licens: ingen risk (MIT, inget kopieras).
- Telemetri: skillen är text. Installerad via `npx skills add` skickar CLI:t anonym telemetri (skillnamn, filer, tidsstämpel) till skills.sh, avstängbart med `DISABLE_TELEMETRY=1`. Vi destillerar och installerar inte, så det berör oss inte.
- Ingen betalvägg och ingen inloggning.
- Krockar med Nortropic, där vi vinner:
  - Neutraler är tonade mot accenten hos oss (2-5 [N2]); källan har ren grå som standard.
  - Accentens subtila bakgrund och kant får bara användas för handlingar och tillstånd (G3), aldrig för dekor.
  - APCA är bara rådgivande.
  - 2-5 [N2] säger shadcn-namn, men kiten använder `--k-*`. Den avvikelsen i vår egen guide bör rättas oberoende av källan.
- Krock med andra skills: källan förutsätter syskonet `better-accessibility` för frågan om ett par *måste* klara kravet. Hos oss avgör WCAG 2.2 AA i 2-5 det.
