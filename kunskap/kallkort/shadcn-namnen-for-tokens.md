# shadcn-namnen för tokens

**Källa:** Läst 2026-10-16.
- [ui.shadcn.com/docs/theming](https://ui.shadcn.com/docs/theming), läst som källfil `apps/v4/content/docs/(root)/theming.mdx` i [shadcn-ui/ui](https://github.com/shadcn-ui/ui), commit `c6bcc126efb9` (2026-10-16). Senaste release är `shadcn@4.21.5` (2026-10-14).
- Samma repo: `apps/v4/content/docs/(root)/tailwind-v4.mdx` (uppgradering och ändringslogg) och `packages/shadcn/src/tailwind.css` (637 rader), som standardtemat importerar.
- Tailwind CSS, [Theme variables](https://tailwindcss.com/docs/theme), avsnitten om `@theme inline` och `@theme static`.
- Ärenden i shadcn-ui/ui, sökta via GitHub-API.
- Egen beräkning av WCAG 2-kontrast för standardtemat: OKLCH → sRGB → relativ luminans, med ett eget skript. Formeln är kontrollerad mot neutral-500, som ger 4,73:1 mot vitt.
- Ytskillens `tokens.md` och `farg.md` som jämförelse.

**Licens:** MIT, för kod och dokumentation i repot. Vi tar namnen och mönstret, inte kod. Kopieras temablocket ordagrant ska MIT-texten följa med. Namnen i sig är ingen upphovsrättsfråga (tolkning).

**Vad det är:** shadcn/ui:s konvention för färg- och radietokens som CSS-variabler. Den har blivit de facto-standard för React-komponenter, temaverktyg som tweakcn och komponentkataloger som 21st.dev. Varje yta har ett par: `X` är ytans färg och `X-foreground` är text och ikoner på den.

**Hur det fungerar:**
- **Alla tokennamn i dagens dokumentation** – 31 färger plus radien:

| Token | Vad den styr enligt shadcn | Används av |
|---|---|---|
| `background` / `foreground` | sidans bakgrund och text | sidan, sektioner |
| `card` / `card-foreground` | upphöjda ytor | `Card`, paneler |
| `popover` / `popover-foreground` | flytande ytor | `Popover`, `DropdownMenu` |
| `primary` / `primary-foreground` | *”High-emphasis actions and brand surfaces”* | standardknapp, valda lägen, badges, *”active accents”* |
| `secondary` / `secondary-foreground` | fyllda handlingar med lägre vikt | sekundärknapp, badges |
| `muted` / `muted-foreground` | dämpade ytor och text | beskrivningar, platshållare, hjälptext |
| `accent` / `accent-foreground` | *”Interactive hover, focus, and active surfaces”* | spökknapp, markerad menyrad, hovrad tabellrad |
| `destructive` | destruktiva handlingar och fel | **inget `destructive-foreground` längre** i standardtemat |
| `border` | kanter och avdelare | kort, menyer, tabeller |
| `input` | formulärfältens kant | `Input`, `Select`, konturknappar |
| `ring` | fokusringar | allt som kan få fokus |
| `chart-1` … `chart-5` | diagrampalett | diagram |
| `sidebar`, `sidebar-foreground`, `sidebar-primary`, `sidebar-primary-foreground`, `sidebar-accent`, `sidebar-accent-foreground`, `sidebar-border`, `sidebar-ring` | sidopanelen | `Sidebar` |
| `radius` | basradien | allt, och de härledda `radius-*` |

- **`--accent` är inte varumärket.** Det är den neutrala hoverytan i menyer och listor. I standardtemat är `--accent` `oklch(0.97 0 0)`, alltså nästan vit grå. Varumärket och huvudhandlingen ligger på `--primary`.
- **`@theme inline`** kopplar tokens till Tailwind: `--color-primary: var(--primary);` ger `bg-primary` och `text-primary-foreground`.
  - Tailwind skriver: *”When defining theme variables that reference other variables, use the `inline` option”*. Annars kan klasserna få oväntade värden, eftersom `var()` löses där variabeln definieras.
  - För oss: utan `inline` löses `var(--primary)` vid `:root`, och ett `[data-kit]` längre ned i trädet slår inte igenom.
  - Utan `static` skrivs bara använda variabler ut.
- **oklch** är standard sedan Tailwind v4-omläggningen (*”HSL colors are now converted to OKLCH”*). Värdena skrivs direkt i `:root` och `.dark`, och mörkt läge byter samma tokens under `.dark` med `@custom-variant dark (&:is(.dark *))`.
- **`--radius` och skalan:** basvärdet är `0.625rem` (10 px), och resten räknas med multiplikation:

| Token | Formel | Med 10 px |
|---|---|---|
| `--radius-sm` | × 0,6 | 6 px |
| `--radius-md` | × 0,8 | 8 px |
| `--radius-lg` | × 1 | 10 px |
| `--radius-xl` | × 1,4 | 14 px |
| `--radius-2xl` / `3xl` / `4xl` | × 1,8 / 2,2 / 2,6 | 18 / 22 / 26 px |

  Registrets Tailwind 3-väg (`packages/registry/src/registry/resolver.ts`) räknar fortfarande med subtraktion: `md` är `calc(var(--radius) - 2px)` och `sm` är `calc(var(--radius) - 4px)`. Komponenter av olika ålder kan alltså ge olika små radier ur samma `--radius`.
- **Nya tokens** definieras i `:root` och `.dark` och exponeras i `@theme inline`. Exemplet är `--warning` / `--warning-foreground`.
- **`@import "shadcn/tailwind.css"`** tar in keyframes för dragspel och anpassade varianter som `data-open` och `data-closed`. Om oanvända keyframes rensas bort i bygget har jag inte kontrollerat ⚠️.
- **Standardtemats kontrast**, egen beräkning med WCAG 2:

| Par | Kontrast | Krav | Resultat |
|---|---|---|---|
| `foreground` på `background` | 19,79:1 | 4,5:1 | klarar |
| `muted-foreground` på `background` | 4,73:1 | 4,5:1 | klarar |
| `muted-foreground` på `muted` | 4,34:1 | 4,5:1 | **underkänt** |
| `primary-foreground` på `primary` | 17,16:1 | 4,5:1 | klarar |
| `input` (kant) mot `background` | 1,26:1 | 3:1 (1.4.11) | **underkänt** om kanten ensam visar fältet |
| `ring` mot `background` | 2,59:1 | 3:1 | **underkänt** |
| `outline-ring/50` (basregeln i temat) | 1,54:1 | 3:1 | **underkänt** |
| mörkt: `input` (vit 15 %) mot `background` | 1,47:1 | 3:1 | **underkänt** |
| mörkt: `ring` mot `background` | 4,18:1 | 3:1 | klarar |

**Kvalitet och underhåll:**
- 125 738 stjärnor, senaste commit 2026-10-16, 469 bidragsgivare (647 med anonyma) och 1 795 öppna ärenden och PR. Mycket aktivt.
- Kända problem som rör tokens och kontrast:
  - **#8773** (öppen PR, 2025-11-11): `--destructive-foreground` var samma röda som `--destructive`, alltså rött på rött.
  - **#10431** (öppet) med PR #10432 och #11145: beskrivningen i destruktiv `Alert` ligger under WCAG AA med standardtemat.
  - **#11674** (öppen PR): `outline-none` ska bli `outline-hidden` så att fokus syns i Windows högkontrastläge.
  - **#7520** (öppet): kant- och input-tokens används inkonsekvent.
  - **#6664** (öppen): stöd för `light-dark()`.
  - **#8165** (öppet): Astro-guiden använder `className` i stället för `class`.
  - **#5476** (öppet): mörkt läge blinkar i Astro.

**Det bästa vi kan ta:**
- **Namnlistan och parprincipen** (`X` / `X-foreground` är ett kontrasttest) till aliaslagret i `tokens.md`. Det finns redan där.
- **`@theme inline`-blocket** som mönster för att koppla `--k-*` → shadcn-namn → Tailwind-klasser.
- **Rättelser och tillägg i vår aliastabell:**
  - `--destructive` saknas i `tokens.md`. Den behövs för formulärfel och är redan en lucka enligt `farg.md`. Vi ger den ett eget `--destructive-foreground` trots att shadcn tagit bort det, eftersom paret är vårt kontrasttest.
  - **Radien:** shadcn räknar `sm` och `md` som 0,6 och 0,8 gånger `--radius`. Om `--radius` pekar på `--k-radie-kort` och kitets fältradie inte råkar vara 0,8 gånger kortets, skrivs `--radius-sm` och `--radius-md` uttryckligen i `@theme inline` till kitets egna radier.
  - **`chart-*` och `sidebar-*`** behövs inte på en småföretagssajt. De mappas till närmaste roll bara om en komponent kräver dem.
- **Kontrasttabellen ovan som varning:** standardvärdena är inga kitvärden. `--input` och `--ring` måste klara 3:1, vilket `tokens.md` redan kräver. Basregeln `outline-ring/50` tas inte med.

**Var det hamnar hos oss:**
- **Ytskillen**, `.claude/skills/yta/tokens.md`, *Namnen*:
  - Aliastabellen kompletteras med `--destructive` / `--destructive-foreground`.
  - Radien skrivs med multiplikationsformeln.
  - En rad om att `primary` hos shadcn också är *”brand surfaces”* men hos oss bara handlingar (G3).
- **Ytskillen**, `farg.md`: kontrasttabellen som exempel på att komponentbibliotekens standardvärden inte klarar golvet.
- **Bibliotek:** aliaslagret läggs i biblioteket när den första React-ön eller Tailwind-komponenten kommer in. Det är redan beslutat i `tokens.md`.
- **Kontroll:** paren går in i den befintliga kontrastgrinden. Ingen ny mekanik.
- **Ingen MCP.**

**Passar vår stack?**
- **Ja, utan JavaScript.** Namnen är CSS-variabler. Aliaslagret kostar några hundra byte CSS per kit.
- **Kitbyte:** `[data-kit="…"]` ersätter shadcn:s `.dark` som selektor. Med `@theme inline` följer Tailwind-klasserna kitet också när `data-kit` byts på en del av sidan.
- **React-öar** från shadcn tar med Radix eller Base UI och kostar JavaScript per sida när de hydreras. Den kostnaden hör till komponenten, inte namnen.
- **Inga krockar** med Lighthouse 100, *HTML först* eller rörelsereglerna.

**Risker och flaggor:**
- **Krock med G3:**
  - shadcn låter `primary` bära varumärkesytor, badges och *”active accents”*. Hos oss är accenten bara för handlingar.
  - En shadcn-`Badge` med `bg-primary` måste kläs om till `secondary` eller `muted` när den går in i biblioteket.
  - Krocken tas upp med Johnny om den gäller en komponent han vill ha.
- **Namnkrock med andra system:**
  - daisyUI:s `--color-accent` är en tredje varumärkesfärg.
  - Flowbites `--radius` är ett fast px-värde.
  - Inget av dem får laddas tillsammans med aliaslagret (se kortet *Go-stilarna, Flowbite v4 och daisyUI*).
- **Kontrast:** standardvärdena underkänns på fyra punkter enligt tabellen. Kopiera aldrig `:root`-blocket som ett kit.
- **Rörlig dokumentation:** `destructive-foreground` finns i äldre teman och i tweakcn men inte i dagens standardtema. Komponenter från olika tidpunkter kan förvänta sig olika namn.
- **Ingen licensrisk, ingen telemetri, ingen inloggning och ingen betalvägg** i namnen. shadcn:s CLI används inte.
