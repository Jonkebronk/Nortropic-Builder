# Tailwind

Delfil till `SKILL.md`. Den gäller hur kitet styr Tailwind-klasserna i React-öar och i komponenter från shadcn, 21st.dev och liknande, och vad som är förbjudet. Namnen och aliaslagret står i [tokens.md](tokens.md). Underlaget med citat och mätningar finns i `kunskap/research/2026-10-16_tailwind-och-motion-i-astro.md` (*researchen* nedan).

**Utkast 2026-10-16.** Allt nedan är förslag till Johnny tills han sagt ja.

## Redan beslutat (→ guiden)

- React, Tailwind och Motion är tillåtna. Astro står kvar, och React används som öar. Krockar tas upp när de uppstår (`BESLUT.md` 2026-10-16, *React, Tailwind och JavaScript tillåts*).
- Ytan kommer ur kitet, och inga värden utanför kitet används (→ `guide/2-5-yta.md`, *Grundregeln* och *Kontroll*).
- Komponenter har licens per komponent. Komponenter som bara finns på 21st.dev får en minimal kreditering (`BESLUT.md` 2026-10-16).

## Vad som ska uppnås

1. **Ett kitbyte styr både vår CSS och Tailwind.** Tailwind får namn som pekar på `--k-*`, aldrig egna värden, och kopplingen skrivs `@theme inline`. Utan `inline` räknas värdet ut i `:root` och följer inte kitet. 📄 tailwindcss.com/docs/theme; researchen §2.2, §3.2. Krehel (`better-colors/token-naming.md`) råder till `@theme` utan `inline`, men det gäller när temavariablerna själva pekas om; vi pekar om `--k-*` under `[data-kit]`, längre ned i trädet, och då kräver Tailwind `inline` (kontrollerat mot tailwindcss.com/docs/theme 2026-10-16, via yta-2).
2. **En klass med ett värde utanför kitet ger ingen CSS.** Standardpaletten, skuggorna, radierna, kurvorna och animationerna töms med `initial`. Då syns `bg-zinc-900` och `shadow-md` i lintningen i stället för på sidan. 🔧 researchen §3.2.
3. **En Tailwind-klass kan alltid ändra en av våra klasser.** All CSS ligger i lagren `kit, theme, base, components, utilities`, och `bas.css` och `rorelse.css` ligger i `components`. CSS utan lager vinner annars över alla lager. 📄 MDN, `@layer`; researchen §3.3. En `@import` står först i filen, före alla regler utom `@charset` och `@layer`-satser; annars ignoreras den utan varning och kitets typsnitt eller tokens försvinner. Kitets tokens läggs i den befintliga ingångsfilen, aldrig som en parallell uppsättning. 📄 MDN, [@import](https://developer.mozilla.org/en-US/docs/Web/CSS/@import); Hallmark, `export-formats.md`.
4. **Länkar, listor och rubriker ser likadana ut överallt.** Tailwinds Preflight tas inte med, eftersom den tar bort understrykningen på länkar och punkterna i listor. Två regler ur den används: `[hidden]` döljer alltid, och formulärdelar ärver typsnitt och färg. 📄 tailwindcss.com/docs/preflight; researchen §3.3.
5. **En komponent följer ett sätt.** Bibliotekets Astro-sektioner behåller sina klasser i CSS. React-öar och importerade komponenter skrivs med Tailwind-klasser. Båda läser samma kit. 📄 tailwindcss.com/docs/compatibility (*"avoiding `<style>` blocks"*).
6. **Varianter är props.** En komponents varianter samlas med CVA. Klasser slås ihop med `cn()`, alltså clsx plus en tailwind-merge som känner kitets namn för `text`, `spacing` och `radius`. Utan dem tappar `cn("text-h1 text-text")` rubrikstorleken. 🔧 researchen §4.3–4.4.
7. **Klasserna är sorterade och kontrollerade.**
   - `prettier-plugin-tailwindcss` sorterar. Den står sist bland pluginen, med `tailwindStylesheet` och `tailwindFunctions: ["cn", "cva", "clsx"]`.
   - `eslint-plugin-better-tailwindcss` kontrollerar med reglerna för korrekthet, och dess egen sortering och radbrytning är avstängda.
   - 📄 deras README; researchen §4.1–4.2.

## En komponent från shadcn, 21st.dev, Aceternity eller Magic UI

Den går in i biblioteket först (→ `guide/2-5-yta.md`, licenstabellen). Innan den används ska detta vara sant:

- Färger, skuggor, radier och typsnitt kommer ur kitets roller. Inga palettklasser, och ingen `cssVariables: false` i shadcn.
- Fokus syns som kontur i alla lägen, också i forced colors. shadcn:s ring är en `box-shadow` på 50 % opacitet: den försvinner i forced colors och ger cirka 2:1 i kitet Lugn. 📄 MDN, `forced-colors`; researchen §4.5.
- Övergångarna anger egenskaper, inte `transition-all`. Längd och kurva kommer ur kitet (`transition` ger `--k-tid` och `--k-kurva`).
- Knappar och fält har kitets höjd (`.knapp` har 48 px) och minst 24 × 24 px. shadcn:s standardknapp är 36 px. 📄 WCAG 2.5.8; shadcn `button.tsx`.
- Tal och datum formateras med `sv-SE`. Magic UI:s NumberTicker använder `en-US`. 📄 källkoden.
- Klassnamnen är Tailwind 4:s. I v3 betyder `shadow-sm`, `rounded`, `ring` och `outline-none` något annat. 📄 tailwindcss.com/docs/upgrade-guide.
- Accenten används bara på handlingar (G3, → `guide/2-5-yta.md`). shadcn använder `primary` också på märken och reglage.
- Rörelsen ryms i budgeten, och inget börjar osynligt (→ rörelseskillen, `motion.md`).
- Komponenten renderas utan `client:*` om ingen interaktion kräver JavaScript. 📄 Astro, *Framework components*.
- Licensen och en eventuell kreditering står i sajtens licenslista.

## Förbud

- Ingen koppling till kitet med vanlig `@theme`. Den skrivs alltid `@theme inline`.
- Inga fasta färger, skuggor, radier eller typsnitt i temat eller som godtyckliga värden (`bg-[#…]`, `shadow-[…]`, `rounded-[…]`, `font-[…]`).
- Inga ihopbyggda klassnamn (`bg-${färg}`). Klasserna skrivs hela. 📄 tailwindcss.com/docs/detecting-classes-in-source-files.
- Ingen `outline-none` eller `outline-hidden`, och ingen fokus som bara är `ring`.
- Ingen `transition-all`.
- Ingen Preflight, och ingen CSS utan lager i biblioteket.
- Inget `@apply` som återskapar en komponent (`.knapp`). `@apply` används bara för markup vi inte styr, som text från Markdown eller ett CMS. 📄 tailwindcss.com/docs/functions-and-directives.
- Ingen `var()` i `--breakpoint-*` eller `--container-*`. Villkor i mediafrågor och containerfrågor kan inte läsa variabler. 📄 MDN, `var()`.
- Ingen `dark:` förrän ett kit har ett mörkt läge. Mörka sektioner skrivs med varianten `pa-mork:`.
- Ingen `client:only` för innehåll (→ `guide/2-4-skelett.md`, HTML först).
- Inga komponenter genererade med 21st MCP eller Aceternitys MCP i ett kundbygge. De används bara när biblioteket byggs (→ `guide/2-5-yta.md`, *Grundregeln*).

## Kontroller

Lägg dem i kontrollistan i `SKILL.md` när Johnny sagt ja.

| Kontroll | Hur |
|---|---|
| Inga okända klasser | M: `better-tailwindcss/no-unknown-classes` med `entryPoint` |
| Inga förbjudna klasser | M: `no-restricted-classes` med mönster för `outline-(none\|hidden)`, `transition-all`, `animate-`, `\[#` och `shadow-\[` |
| Kitbytet når Tailwind | M: provsidan med två kit sida vid sida; en ö byter färg och radie med kitet |
| Fokus i forced colors | M: Playwright med `forcedColors: 'active'`; tabba igenom en ö |
| Kontrastparen | M: varje par `X` / `X-foreground` i aliaslagret (→ [farg.md](farg.md)) |
| Länkar och listor | Ö: understrukna länkar och punktlistor finns kvar i löptext |

## Källor

- Tailwind CSS: [Theme](https://tailwindcss.com/docs/theme), [Functions and directives](https://tailwindcss.com/docs/functions-and-directives), [Adding custom styles](https://tailwindcss.com/docs/adding-custom-styles), [Styling with utility classes](https://tailwindcss.com/docs/styling-with-utility-classes), [Detecting classes](https://tailwindcss.com/docs/detecting-classes-in-source-files), [Preflight](https://tailwindcss.com/docs/preflight), [Compatibility](https://tailwindcss.com/docs/compatibility), [Upgrade guide](https://tailwindcss.com/docs/upgrade-guide), [States](https://tailwindcss.com/docs/hover-focus-and-other-states), [Outline style](https://tailwindcss.com/docs/outline-style) (MIT, lästa 2026-10-16; version 4.3.3).
- [prettier-plugin-tailwindcss](https://github.com/tailwindlabs/prettier-plugin-tailwindcss) 0.8.1, [eslint-plugin-better-tailwindcss](https://github.com/schoero/eslint-plugin-better-tailwindcss) 4.9.1, [tailwind-merge](https://github.com/dcastil/tailwind-merge) 3.7.0, [CVA](https://cva.style/docs) 0.7.1 (MIT och Apache-2.0).
- shadcn/ui: [Theming](https://ui.shadcn.com/docs/theming) och `apps/v4/registry/new-york-v4/ui/button.tsx` (MIT, commit 2026-10-16).
- MDN: [@layer](https://developer.mozilla.org/en-US/docs/Web/CSS/@layer), [forced-colors](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/forced-colors), [var()](https://developer.mozilla.org/en-US/docs/Web/CSS/var).
- Utkastet till temat: `tailwind-tema-lugn.css` i premiumpassets scratch-katalog, provkompilerat med Tailwind 4.3.3 (researchen §3.2).
