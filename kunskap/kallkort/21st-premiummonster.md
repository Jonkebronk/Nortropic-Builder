# 21st – premiummönster till biblioteket

**Källa:** 21st.dev:s publika sidor och dokumentation (se `21st.md`), läst 2026-10-16. Koden är läst i de öppna ursprungsrepona i stället för via 21st, eftersom koden på 21st kräver API-nyckel och villkoren förbjuder automatisk insamling: Tailark (<https://github.com/tailark/blocks>, MIT, commit `8139698`, 2026-07-29; temat `mist`, Radix-basen; Tailark är ett av de stora marknadsföringsbiblioteken på 21st, 42 komponenter under @meschacirung) och Magic UI (<https://github.com/magicuidesign/magicui>, MIT). Lokalt: `kallor/tailark-blocks/registry/bases/radix/mist/`.
**Rättat 2026-10-16 efter översynen (`kunskap/research/2026-10-16_verktyg-och-skills-full-potential.md`):** samlingarna läses via MCP:n, och Johnnys konto är betalt (→ `21st.md`).
**Sett eller härlett:** klassnamnen och beroendena nedan är sett i koden. Varför något ger premiumkänsla är härlett. ⚠️ Förhandsvisningarna på 21st.dev har jag inte öppnat i Playwright: villkoren (avsnitt 3) förbjuder insamling med bottar. Johnny tittar inloggad (sist i filen).
**Ramen:** React, Tailwind och Motion är tillåtna som öar i Astro (BESLUT 2026-10-16, *React, Tailwind och JavaScript tillåts*). Blocken tas därför in nästan som de är. Krockar med Lighthouse 100, *HTML först* och rörelsereglerna tas upp med Johnny och stoppar inte.

## Så tas ett block in

1. **Hämta från ursprunget med licens.** Ett MIT-block från ett öppet repo (Tailark, Magic UI) läses som registerpost från ursprunget, till exempel `https://oss.tailark.com/r/<namn>.json` (namnrymden `@tailark-oss` i Tailarks `components.json`). `npx shadcn add` körs inte mot tredje part (`.claude/skills/skelett/react-i-astro.md`). **Rättat 2026-10-16 (tredje varvet):** Tailarks README anger `https://oss-tailark.com/r/{name}`, en domän som inte finns (NXDOMAIN, kontrollerat med `dig` 2026-10-16). Den som registrerar den kan leverera kod till alla som följer README; `oss.tailark.com` svarar 200 (→ `shadcn-cli-tailark-magicui.md`). Block som bara finns på 21st hämtas med 21st:s CLI och Johnnys nyckel, och bara om licensen är uttalad. Källadress, författare och licens skrivs i filens första rad och i `licenser.md`.
2. **Lägg det som en `.tsx` i biblioteket** under `src/sektioner/react/` och anropa det från en Astro-sektion som ger det innehållet som props. Innehållet ligger kvar i innehållsfilerna (`guide/2-4-skelett.md`, *Hur sektionerna byggs*).
3. **Byt det Next-specifika:** `next/link` blir `<a>`, `next/image` blir Astros `<Image>` som skickas in som barn eller som en färdig `src`. Demotext, falska logotyper och engelska etiketter tas bort.
4. **Peka om tokens:** shadcn-namnen (`--background`, `--foreground`, `--muted`, `--primary`, `--ring`, `--radius`) sätts i Tailwind 4:s `@theme` per stilkit till kitets värden (`--k-bg`, `--k-text`, `--k-dampad`, `--k-accent`, `--k-radie-kort`). Hårdkodade mått i klasserna (`py-36`, `max-w-5xl`, `rounded-2xl`) byts mot kitets avstånd och radier, så att tre kit fortfarande ger tre riktningar.
5. **Välj rendering per block:**
   - Ingen `'use client'` och inga hooks: ingen `client:`-direktiv. Astro renderar HTML vid bygget. **0 kB JavaScript.**
   - Interaktion krävs: `client:visible` (laddas när blocket syns) eller `client:idle`. Den första ön på en sida drar in React-körtiden, cirka **56 kB gzip**, och Astros ö-körtid, cirka **4 kB** (en mätning: bejamas/ui-benchmark, ⚠️ mät i piloten). Varje ö därefter kostar bara sin egen kod.
   - Motion: `motion`-komponenten kostar **43 kB**; `m` med `LazyMotion` drygt **5 kB** plus **24 kB** för `domAnimation` ([motion.dev, Reduce bundle size](https://motion.dev/docs/react-reduce-bundle-size)).
6. **Mät:** Lighthouse på sidan före och efter, med kontroll 9 (median av tre). Utfallet går till Johnny.

## Premiummönstren per sektion

### Knappar, kort och ytor (gäller alla block)
- **Hårfin ring i stället för ram.** Kort och sekundärknappar har `border border-transparent ring-1 ring-foreground/10` och en svag skugga `shadow-sm shadow-black/15` (Tailark `ui/button.tsx`, variant `outline`). Kanten blir en halvgenomskinlig linje som fungerar på både ljus och mörk bakgrund. Kostnad: 0 kB.
- **Koncentriska radier.** En ram runt en bild har radien `calc(var(--radius) + 1rem)` när den inre har `var(--radius)` (Tailark `hero-section/one`). Inre och yttre hörn följer varandra; ett vanligt AI-fel är samma radie på båda. Kostnad: 0 kB.
- **Ikonen i knappen är dämpad** (`opacity-50` på chevronen) och knappen har lite mindre utfyllnad på ikonsidan (`pr-4.5`). Kostnad: 0 kB.
- **Hover är en ton, inte en effekt:** `hover:brightness-95` på primärknappen och `hover:bg-muted/50` på sekundärknappen, `duration-150` till `200`. Kostnad: 0 kB.
- **Ta inte:** fokusringen `focus-visible:ring-1`. Den är för svag mot vårt golv (WCAG 2.2, 2.4.7, och kitets fokusstil); behåll kitets fokusring.

### Sidhuvud och meny
- **Mönstret:** sidhuvudet är genomskinligt överst och får `bg-background/75 border-b border-black/5 backdrop-blur-lg` efter 50 px scroll; menyikonen morfar till ett kryss med `rotate-180 scale-0 opacity-0` under 200 ms (Tailark `hero-section/one/header.tsx`).
- **Kostnad som det är:** `'use client'` med `useState` och en scrollyssnare: React-körtiden (cirka 56 kB) måste laddas direkt (`client:load`), annars fungerar inte menyn på mobilen. Utan JavaScript går mobilmenyn inte att öppna.
- **Krock:** *HTML först* och vår popovermeny (`guide/2-4-skelett.md`, primitiverna; BESLUT 2026-10-15 om "Meny"). Förslag till Johnny: behåll Astro-sidhuvudet med `popover` och ta bara in utseendet – genomskinlighet efter scroll med en `scroll()`-tidslinje eller vår lilla befintliga scrollkod, och ikonmorfen i ren CSS (`[popover]:popover-open` + `transition`). Det ger samma känsla för 0 kB React.

### Första vyn
- **Mönstret:** rubriken med `text-balance` och `max-w-md`, ingressen dämpad (`text-muted-foreground`, `text-xl`), två knappar där den sekundära är ringad, en svag gradient från bakgrunden till `muted`, och bilden i en lutad ram (`skew-x-6`, `perspective-near`) med en extra ytterram bakom (Tailark `hero-section/one`).
- **Kostnad:** 0 kB; komponenten har inga hooks och renderas vid bygget.
- **Ta in:** `text-balance`, den dämpade ingressen och ramen med koncentriska radier. **Ta inte:** "Trusted by"-logotyper utan riktiga kunder, appskärmar som bild för en tjänst och den lutade ramen kring ett porträtt (känns som SaaS och inte som en klinik; fallgropen *stil som läses som en annan bransch*, BESLUT G13).
- **Rörelse:** Prism UI:s hero (@Codehagen på 21st, MIT) använder Motion för en in-animation. Kostnad cirka 56 + 43 kB. Krockar med "ingen text som börjar osynlig" (`guide/2-6-rorelse.md`). Förslag: samma intryck med CSS `@starting-style` och `prefers-reduced-motion`, för 0 kB.

### Tjänster (features)
- **Mönstret:** ett rutnät med `container queries` (`@container` och `@lg:grid-cols-2 @3xl:grid-cols-3`), så att korten anpassar sig efter sektionens bredd och inte skärmens; kort med en illustration upptill i `aspect-video` och rubrik plus dämpad text under (Tailark `features/two.tsx`).
- **Kostnad:** 0 kB.
- **Ta in:** container queries (Baseline) i Tjänster och Det praktiska. **Ta inte:** illustrationerna av gränssnitt; för en småföretagare blir det ikon eller foto.

### Omdömen
- **Mönstret:** citatet i en pratbubbla, `rounded-2xl rounded-bl` (ett hörn nästan rakt, som en bubbla), `ring-1 ring-foreground/10`, `px-4 py-3`, och under bubblan en liten avatar `size-6` med egen ring och namnet i `text-sm font-medium` (Tailark `testimonials/two.tsx`). Sektionen ligger på `bg-muted`.
- **Kostnad:** 0 kB.
- **Ta in:** bubblan och den lilla avsändarraden passar vårt krav på källa och datum per omdöme (`2-7-innehall.md`). Avataren bara med samtycke och riktig bild; annars initial eller ingen.
- **Ta inte:** Magic UI:s `Marquee` med omdömen som rullar av sig själva. Krockar med "inga automatiska bildspel" (`guide/2-4-skelett.md`) och WCAG 2.2.2 om det rör sig längre än fem sekunder utan paus.

### Pris
- ⚠️ Prisblocken (Tailark `pricing/`) bygger på SaaS-planer med månadsväxlare. För en klinik eller hantverkare är det ett pris per besök eller ett från-pris; ta bara typografin (stort belopp, dämpad enhet) och kortets ring. Vi har redan priset i *Det praktiska*.

### Så går det till
- Tailark har inget stegblock i `mist`; AstroWinds `Steps` och `Steps2` är förebilden (se källkortet för AstroWind). Premiumdetaljen att ta: en tunn tidslinje med numrerade punkter i stället för stora kort, vilket halverar höjden på mobilen. 0 kB.

### Vanliga frågor
- **Mönstret:** två spalter på datorn – rubrik, ingress och "Hittar du inte svaret? Kontakta oss" till vänster (`md:col-span-2`), frågorna till höger (`md:col-span-3`); på mobilen kommer kontaktlänken efter frågorna (Tailark `faqs/two.tsx`). Frågorna avgränsas med en linje (`not-last:border-b`), inte med kort, och chevronen är dämpad och roterar 180° på 200 ms.
- **Kostnad som det är:** `'use client'` och Radix Accordion: React-körtiden plus Radix, och utan JavaScript är svaren dolda (`hidden`) och går inte att hitta med sökfunktionen.
- **Förslag:** ta layouten och linjestilen, men behåll `<details name>` (0 kB, fungerar utan JavaScript, `guide/2-4-skelett.md`). Öppningen kan animeras i CSS med `::details-content` och `interpolate-size` under `prefers-reduced-motion: no-preference` (som Accessible Astro gör).

### Kontakt
- **Mönstret:** en luftig sida där kontaktvägarna står som korta block med rubrik och en stor länk (`text-lg`, `text-primary`) bredvid ett formulärkort med `p-8 sm:p-12`; fälten ligger två och två i en container query (`@md:grid-cols-2`) (Tailark `contact/one.tsx`).
- **Kostnad:** 0 kB för layouten. Formulärets `Select` är Radix och kräver en ö; byt mot `<select>`.
- **Ta in:** de stora kontaktlänkarna och luften. Formuläret följer `2-8` (GOV.UK-validering).

### Sidfot
- **Mönstret:** fem spalter på datorn (namn och kort text över två, länkgrupper över tre), länkarna dämpade med `hover:text-primary`, och en sista rad efter en linje med upphovsrätt och sociala ikoner `size-6`; på mobilen byter raderna ordning (`order-first`/`order-last`) (Tailark `footer/two.tsx`).
- **Kostnad:** 0 kB.
- **Ta in:** den dämpade länkfärgen och den avslutande raden. Vår sidfot har redan innehållet (`2-3`).

## Vad som inte ska tas

- Rörelse som döljer innehåll tills JavaScript har körts (in-animationer från `opacity: 0`), karuseller och marquee som rör sig av sig själva, partiklar och skrivmaskinsrubriker (`2-6-rorelse.md`; Johnnys måttstock om lekfulla hinder).
- Glasytor med `backdrop-blur` över bild eller text när kontrasten då inte går att mäta (WCAG 1.4.3).
- Demoinnehåll: engelsk text, påhittade siffror och logotyper ("Trusted by …").
- Komponenter med licensen "unknown".

## Det som kräver Johnnys inloggning

- **Se förhandsvisningarna och välja block** på 21st.dev: publikt, men topplistor, bokmärken och samlingar kräver konto. Det Johnny sparar kan sedan läsas via MCP:n med verktygen för bokmärken och listor (`get_bookmark_list`; listorna var tomma 2026-10-16), utan att någon agent loggar in. Förslag: Johnny väljer 5–10 block i 375 och 1280 px och sparar dem i en samling, så att vi hämtar just dem.
- **API-nyckeln** för CLI:n och MCP:n skapas inloggad på <https://21st.dev/mcp>. Gratisnivån ger 2 kopior per dag; Builder (6–8 USD i månaden) ger obegränsat. Johnnys konto är betalt utan dagsgräns (`get_usage` 2026-10-16, → `21st.md`).
- **21st AI** (`generate`) kräver Builder + AI. Behövs inte: vi bygger biblioteket själva.
