# Tokens

Delfil till `SKILL.md`. Hur ett stilkit är byggt som tokens, hur namnen fungerar både i vanlig CSS och i Tailwind och React, och vilka verktyg som används när kiten tas fram.

## Redan beslutat (→ guiden)

- Ett stilkit är ett tokenset över bibliotekets sektioner plus en `design.md`; komponenter, sektioner och layoutlogik är gemensamma (→ `guide/2-5-yta.md`, *Vad ett stilkit är*).
- Minimala kit i N1, kitets elva axlar från N2, tokens i två nivåer med shadcn-namn och formatet DTCG 2025.10 med Terrazzo i N2 (→ `guide/2-5-yta.md`).
- React, Tailwind och Motion är tillåtna i biblioteket och på sajterna; Astro står kvar och React används som öar (`BESLUT.md` 2026-10-16, *React, Tailwind och JavaScript tillåts*).

## Nivåerna

| Nivå | Vad | Exempel | Vem läser den |
|---|---|---|---|
| Grundvärden | Råa värden utan betydelse, delade av alla kit | `oklch(0.52 0.15 40)`, `1rem`, `14px` | bara nivån under |
| Roller | Vad värdet används till, per kit | `--k-accent`, `--k-yta`, `--k-radie-kort` | sektioner och komponenter |
| Komponent | Bara som dokumenterat undantag | `--knapp-hojd` | en komponent |

- **Sektioner läser bara roller.** Byts kitet ändras ingen sektion. Varför: annars är ett kit bara en ny hårdkodad design. 📄 Brad Frost, [The many faces of themeable design systems](https://bradfrost.com/blog/post/the-many-faces-of-themeable-design-systems/); Krehel, `better-colors/token-naming.md` (MIT).
- **De minimala kiten i N1 har bara roller.** Grundvärdena bryts ut när ett andra kit behöver samma värde (N2). 📄 `guide/README.md`, princip 8.
- **En ny token börjar med rollen, sedan värdet.** Finns rollen redan, används den. 📄 Krehel, `token-naming.md`.
- **Namnen följer en grammatik: `--k-{roll}-{variant}-{tillstånd}`**, rollen först och tillståndet sist (`--k-accent-hover`, `--k-radie-knapp`, `--k-fokus-pa-mork`). Text på en fyllning heter `--k-pa-{fyllning}`, och ett namn säger rollen, inte ordningen (`--k-dekor-2` blir till exempel `--k-handstil`). Varför: `--k-accent-text` (accenten som text) och `--k-pa-accent` (text på accenten) förväxlas lätt. 📄 Next Level Builder, `design-system/references/token-architecture.md`; Krehel, `token-naming.md` (två skills – instruktion).
- **Lagerordningen har namn på ett ställe** (sidhuvud, knapplist, samtyckesruta, hoppa-länk, dialog) i stigande ordning, i stället för lösa `z-index` (i dag 45, 50, 60 och 100 i tre filer). 📄 Next Level Builder, `primitive-tokens.md`; Hallmark, `layout-and-space.md` (två skills – instruktion).
- **Ett värde blir en roll först när det används på minst tre ställen med samma avsikt.** Före det är det ett dokumenterat undantag i sektionen. Två knappar som liknar varandra men har olika syfte hålls isär. Varför: en för tidig abstraktion är svårare att ändra än en dubblett. 📄 impeccable, `reference/extract.md` (Apache-2.0); jfr `guide/README.md`, princip 8 (tre gånger för hand).

## Namnen: `--k-*` och shadcn

Biblioteket använder `--k-*` under `[data-kit="…"]`. React-öar, Tailwind och komponenter från shadcn/ui, 21st.dev och liknande förväntar sig shadcn-namnen. Därför har varje kit ett aliaslager, så att samma kit styr båda.

| shadcn-namn | Pekar på | Anmärkning |
|---|---|---|
| `--background` / `--foreground` | `--k-bg` / `--k-text` | |
| `--card` / `--card-foreground` | `--k-yta` / `--k-text` | |
| `--popover` / `--popover-foreground` | `--k-yta` / `--k-text` | menyer, dialoger |
| `--primary` / `--primary-foreground` | `--k-accent` / `--k-pa-accent` | bara handlingar (G3) |
| `--secondary` / `--secondary-foreground` | `--k-dekor` / `--k-text` | |
| `--muted` / `--muted-foreground` | `--k-dekor` / `--k-dampad` | |
| `--accent` / `--accent-foreground` | subtil accentbakgrund / `--k-text` | shadcn:s `accent` är hover-ytan i menyer, inte varumärket |
| `--destructive` / `--destructive-foreground` | felfärg (saknas i kiten) / text på den | minst 15° från accenten (`farg.md`). shadcn:s standardtema har tagit bort `destructive-foreground`, men vi behåller paret, eftersom paret är vårt kontrasttest |
| `--border`, `--input`, `--ring` | `--k-linje`, fältets kant, `--k-fokus` | `--input` 3:1 mot ytan |
| `--radius` | `--k-radie-kort` | shadcn räknar de andra radierna som multiplar av den (`sm` 0,6 ×, `md` 0,8 ×, `xl` 1,4 ×), medan registrets äldre Tailwind 3-väg drar av px. Skriv därför `--radius-sm`, `--radius-md` och `--radius-lg` uttryckligen i `@theme inline` till kitets egna radier (fält, knapp, kort) |
| `--chart-*`, `--sidebar-*` | – | behövs inte på en företagssajt; mappas till närmaste roll bara om en komponent kräver dem |

📄 shadcn/ui, [Theming](https://ui.shadcn.com/docs/theming) och `packages/shadcn/src/tailwind.css` (MIT; källkortet *shadcn-namnen för tokens*). Varje par `X` / `X-foreground` är ett kontrasttest (→ `farg.md`). Ta namnen, inte shadcn:s standardvärden: fältkanten ger 1,26:1, fokusringen 2,59:1 och `muted-foreground` på `muted` 4,34:1, alltså under golvet i WCAG 1.4.3 och 1.4.11. Kopiera aldrig shadcn:s `:root`-block som ett kit.

- **Tailwind 4 läser rollerna med `@theme inline`**, till exempel `--color-primary: var(--primary)`, så att `bg-primary` följer kitet också när `[data-kit]` byts på sidan. Med vanlig `@theme` bakas värdet in och kitbytet slutar fungera. 📄 Tailwind CSS, [Theme variables](https://tailwindcss.com/docs/theme) (MIT).
- **En komponent från 21st.dev, Aceternity, React Bits eller shadcn går in i biblioteket först**, med licens per komponent, och kläs om till kitets roller innan den används: hårdkodade palettklasser (`bg-zinc-900`, `text-white`), egna skuggor, radier och typsnitt byts mot tokens. 📄 → `guide/2-5-yta.md`, licenstabellen; → C48 i `guide/bilaga-c-kontroller.md` (N2).
- **JavaScript kostar.** En React-ö som bara visar något renderas till HTML vid bygget; `client:*` bara där interaktionen kräver det. Kostnaden per sida och krockar med Lighthouse 100 tas upp med Johnny (`BESLUT.md` 2026-10-16). Hör till kvalitetsskillen.

## Kitets axlar

Axlarna står i `guide/2-5-yta.md` (*Kitets elva axlar*). Varje axel är en eller flera roller: typsnitt och vikter · typskala och radhöjd · avståndsskala · radie per elementklass och kantbredd · skuggor i minst två lager · färgroller, neutralton och accent med steg · versaler och spärrning · navigationsstil · ikonfamilj och streck · bildbehandling · rörelsebudget. Startvärden och parametrar kan lånas ur Flowbite v4 och daisyUI 5 (MIT); GoDaddy Go är GPL-2.0, så därifrån tas bara parametrarna. 📄 `kunskap/research/2026-10-15_kompetensluckor-anteckningar/lager-5-yta.md` §5.

**Startvärden när Johnny säger "stramare" eller "mjukare".** Ett referensband, inte en regel; varje värde mäts och prövas på provsidan.

| Personlighet | Radie fält och knapp · kort | Skugga | Skalförhållande | Knapptext | Förebild |
|---|---|---|---|---|---|
| Stram | 1–4 px · 4 px | standard eller ingen | 1,25–1,3 | versaler med cirka 0,1 em spärrning går | Flowbite *mono*, *enterprise*; Go *modern* |
| Minimal | 2–6 px · 8 px | ingen (djup 0) | 1,2–1,25 | gemener | Flowbite *minimal*; daisyUI *corporate* |
| Standard | 4–8 px · 12–16 px | två lager (djup 1) | 1,2–1,25 | gemener | Flowbite *default*; daisyUI *light* |
| Mjuk och lekfull | 10 px–piller · 20–28 px | mjuk | 1,2 | gemener | Flowbite *playful*; Go *playful* |

- **Djupet kan vara en växel per kit:** 0 ger platta ytor och knappar, 1 ger kitets skuggor och en svag inre kant. Samma komponent ser då platt eller upphöjd ut utan att ändras. 📄 daisyUI 5, `--depth` (MIT).
- **Fältets storlek är ett grundmått:** knapp- och fälthöjd räknas ur en token (daisyUI: `--size-field` × 10), så att fält och knappar alltid är lika höga. Hos oss har `.knapp` 48 px, och ett fält bredvid en knapp får samma höjd. 📄 daisyUI 5; Hallmark, `interaction-and-states.md` (fält = knapp, golv 44 px).
- **Färgstrategin är en egen axel** (→ `farg.md`, *Färgstrategi*).
- **Go sätter brödtextens radhöjd till 1,8–1,9**, högre än vår regel 1,45–1,6 (→ `typografi.md`). Go är ett tema, inte en primärkälla; vår regel står kvar, och ett luftigt kit får luften ur avstånden. 📄 källkortet *Go-stilarna, Flowbite v4 och daisyUI*.
- **Varningen:** färgerna i Go och daisyUI klarar inte WCAG 2 AA rakt av (Go *Apricot* 3,84:1 mot vitt, daisyUI *corporate* vit på primär 4,14:1). Inga färgvärden tas utan att mätas. 📄 samma källkort, egen beräkning.

## Formatet (N2)

- **DTCG 2025.10** som källformat: en fil med grundvärden, en per kit och en resolver med modifiern `kit` – ett system, flera kit. Det är en stabil Community Group-rapport, ingen W3C-standard. Dimensioner får bara vara `px` eller `rem`, så flytande `clamp()`-skalor lagras som min och max och byggs med en egen transform. 📄 [Design Tokens 2025.10](https://www.designtokens.org/tr/2025.10/).
- **Terrazzo** bygger både vanliga CSS-variabler och Tailwind 4 `@theme` ur samma källa och spärrar låg kontrast med `a11y/min-contrast`. Versionen låses (2.9.0 den 14 oktober 2026). Enligt dokumentationen mappar `plugin-css` varje resolver-kontext till valfri selektor (`permutations` med `prepare`), så `[data-kit="lugn"]` går att få, och `variableName` kan ge `--k-*`-namn; inte provkört ⚠️. `plugin-tailwind` skriver värden och inte `var()` (ärende #692), så bryggan med `@theme inline` skrivs för hand. 📄 [Terrazzo, CSS](https://terrazzo.app/docs/integrations/css/) (MIT).
- **Bara CSS skeppas.** Inga färgmotorer, typsnittsverktyg eller tokenbibliotek följer med till sajten.

## Verktyg

Körs när kit tas fram eller kontrolleras, aldrig i kundbygget.

| Verktyg | Används till | Licens | Nivå |
|---|---|---|---|
| Color.js | OKLCH, gamut och WCAG-kontrast (`contrast(a, b, "WCAG21")`) i ett kitskript som mäter alla rollpar | MIT | nu |
| Adobe Leonardo | Accent- och neutralsteg mot målkvoter (`wcag2`); som bibliotek eller som lokal MCP-server utan konto (`@adobe/leonardo-mcp`) | Apache-2.0; beror på `apca-w3`, vars licens är restriktiv, och har sårbara beroenden (ärende #202) – körs bara lokalt | nu, när ett kit tas fram |
| Radix Colors | Rollerna per steg, inte värdena: Radix färger klarar inte WCAG 2 AA rakt av (→ `farg.md`) | MIT | nu (rollerna) |
| Utopia | Flytande typ- och avståndsskalor (`clamp()`) | metod; `utopia-core` ISC | nu, när en skala byggs |
| Capsize | Typsnittsmått för reservtypsnitt och trimning. Astros Fonts API använder redan `@capsizecss/unpack`, och `text-box` gör trimningen i CSS | MIT | bara för typsnitt utanför Fonts API |
| Fontsource och Astros Fonts API | Självhostade typsnitt, reservtypsnitt, förladdning. Fonts API är stabilt sedan Astro 6; `fontProviders.npm({ remote: false })` läser de Fontsource-paket som redan finns | MIT; Astro | Fontsource nu, Fonts API när biblioteket flyttar dit |
| Lucide (`lucide-static`, `@lucide/astro`) | Ikoner som inline-SVG. Egna SVG kan importeras som komponent i Astro, så astro-icon behövs först för en andra familj ur Iconify | ISC, plus MIT för ikoner ur Feather | nu |
| Tabler, Phosphor | Andra ikonfamiljer per kit | MIT | när ett kit väljer dem |
| Simple Icons | Sociala logotyper | CC0; varumärkesägarens regler gäller | när sidfoten behöver logotyper |
| Hyperglot | Språkstöd per typsnitt (svenska, nordsamiska); version 0.8.1 eller senare, körs på TTF eller OTF, inte WOFF2 | Apache-2.0 från 0.8.0, äldre GPLv3 | när ett typsnitt tas in |
| DTCG 2025.10 och Terrazzo | Källformat, bygge och kontrastlint | – / MIT | N2 |
| tweakcn | Finjustering av shadcn-teman i webbläsaren | Apache-2.0; webbtjänsten har analys (PostHog), konto och en betald nivå | används inte |

Källor och kvalitet per verktyg: källkorten i premiumpassets underlag och 📄 `kunskap/research/2026-10-15_kompetensluckor-anteckningar/lager-5-yta.md` §1–4.
