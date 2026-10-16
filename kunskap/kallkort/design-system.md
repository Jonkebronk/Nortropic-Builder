# design-system

**Källa:** https://github.com/nextlevelbuilder/ui-ux-pro-max-skill, sökvägen `.claude/skills/design-system/` (kopia i `cli/assets/skills/design-system/`). Läst 2026-10-16 vid repots commit `56ea9cf174ed` (2026-10-15). Skillens metadata: `author: claudekit`, `version: 1.0.0` – den kommer alltså från ClaudeKit och följer med i Next Level Builders repo. Lästa filer: `SKILL.md` (början), `references/token-architecture.md` (hela), `semantic-tokens.md` (början), `component-tokens.md` (knappar), `states-and-variants.md` (tillstånd, fokus, inaktiv), rubrikerna i `primitive-tokens.md`.
⚠️ Inte lästa: `component-specs.md`, `tailwind-integration.md`, resten av `primitive-tokens.md`, mallen `templates/design-tokens-starter.json`, skripten (`generate-tokens.cjs`, `validate-tokens.cjs`, `html-token-validator.py` – inte körda) och presentationsdelen (`slide-*.csv`, `generate-slide.py`), som ligger utanför ytan.

**Licens:** MIT enligt skillens frontmatter och repots `LICENSE` (© 2024 Next Level Builder). Kräver att licenstexten följer med vid kopiering; vi destillerar.

**Vad det är:** En skill för tokenarkitektur, komponentspecar och – oväntat – presentationsgenerering. Kärnan är ett tokensystem i tre lager: primitiva värden, semantiska roller och komponenttokens.

**Hur det fungerar:**
- **Tre lager:** *primitiva* (råvärden: `--color-blue-600`, `--space-4`, `--radius-lg`, `--shadow-sm`) ändras sällan; *semantiska* (`--color-primary`, `--color-background`, `--spacing-section`) pekar på primitiva och byts vid tema; *komponent* (`--button-bg`, `--card-padding`) pekar på semantiska och används för undantag per komponent.
- **Mörkt läge:** bara de semantiska tokens skrivs om i `.dark`.
- **Namngrammatik:** `--{kategori}-{sak}-{variant}-{tillstånd}`, t.ex. `--color-primary-hover`, `--button-bg-hover`. Kategorier: color, space, font-size, radius, shadow, duration.
- **Semantiska roller (shadcn-namn):** background/foreground, card, popover, primary (+ hover, active, foreground), secondary, muted (+ muted-foreground), accent, destructive, success m.fl.
- **Komponenttokens:** knappvarianter (primary, secondary, outline, ghost, destructive) och storlekar, inmatning, kort.
- **Tillstånd:** default, hover, focus, active, disabled, loading med prioritetsordning (disabled > loading > active > focus > hover); övergångar per egenskap (färg 150ms, transform 200ms); fokusring 2px med 2px avstånd; inaktiv = 50 % opacitet.
- **Format:** en fil per lager eller en fil med lagerkommentarer; JSON enligt W3C DTCG (`$value`, `$type`); skript genererar CSS och validerar att komponenter bara använder tokens.

**Kvalitet och underhåll:**
- Repot: 136 403 stjärnor, cirka 101 bidragsgivare, push 2026-10-15; själva skillen är version 1.0.0 och verkar inte ändras ofta ⚠️ (historiken inte genomgången, klonen är grund).
- Inga ärenden om just denna skill hittades bland de mest kommenterade.
- **Egna stickprov:**
  - Primitiverna är Tailwinds standardpalett (#F9FAFB, #111827, #3B82F6, #2563EB) och primärfärgen är blue-600 – exempelvärden, men just det standardval andra källor kallar generiskt.
  - `--color-accent` är här en ljusgrå hover-yta (gray-100), som i shadcn – inte en handlingsfärg.
  - Fokusringen byggs med `outline: none` + `box-shadow`; box-shadow ritas inte i Windows tvingade färger (forced-colors), så ringen kan försvinna. En genomskinlig `outline` som reserv behövs.
  - Inaktiv-regeln kombinerar `pointer-events: none` med `cursor: not-allowed` – markören syns då aldrig.

**Det bästa vi kan ta:**
- Lagermodellen och regeln att ett tema bara skriver om det semantiska lagret (`token-architecture.md`).
- Namngrammatiken och rollinventeringen som checklista för vilka roller ett kit måste ha (yta, text, dämpad, primär + hover/active/text, kant, fokus, fara, klar).
- Tillståndsprioriteten och övergångar per egenskap (`states-and-variants.md`) – inte `transition: all`.
- DTCG-formatet, som 2-5 redan pekar på för att linta kit.

**Var det hamnar hos oss:**
- `.claude/skills/yta/tokens.md`: lagermodellen översatt till `--k-*`. I dag har biblioteket i praktiken en nivå (`--k-bg`, `--k-yta`, `--k-text`, `--k-dampad`, `--k-linje`, `--k-accent`, `--k-pa-accent`, `--k-fokus`, `--k-radie-kort`, `--k-radie-knapp` …), och 2-5 beskriver två nivåer (grundvärden + roller). Komponentlagret föreslås bara där en sektion verkligen behöver ett undantag.
- `detaljer.md`: tillståndsprioriteten, fokusringen med `outline`-reserv.

**Passar vår stack?**
- Ren CSS med custom properties, noll JavaScript – fungerar i Astro direkt.
- Med Tailwind 4 tillåtet (BESLUT 2026-10-16) kan shadcn-namnen och `@theme`-mappningen (`tailwind-integration.md`) tas nästan som de är, och shadcn-komponenter från 21st.dev eller liknande läser då samma roller. Kostnad: bara byggsteget.
- **Översätt noga:** vår *accent* (handlingsfärgen enligt G3, `--k-accent`) motsvarar shadcn:s `--primary`, **inte** shadcn:s `--accent`. Blandas namnen ihop hamnar handlingsfärgen på hover-ytor.

**Risker och flaggor:**
- Licens: MIT, ingen risk. Ingen telemetri, betalvägg eller inloggning i skillen; premiumversionen av ui-ux-pro-max lovar "mer omfattande tokenarkitektur" bakom betalvägg (#156 i det repot).
- Skripten är Node och Python; vi kör dem inte.
- **Krockar med Nortropic (vi vinner):** tre lager mot guidens två nivåer – komponentlagret läggs till bara när en verklig sektion behöver det (princip 8); engelska namn mot våra svenska `--k-*`; standardblå primär mot kitets accent.
- **Krockar med andra skills:** ingen i sak; impeccable, hallmark och taste kräver alla att komponenter bara läser tokens, vilket lagermodellen ger.
