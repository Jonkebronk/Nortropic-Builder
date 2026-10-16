# React och JavaScript i Astro

Research 2026-10-16 på Johnnys uppdrag: *"Det finns väl jättemycket dokumentation, best pratices för react, tailwind, java och hur vi bör arbeta med dessa, websearcha, läs dokumentation, open source/github"*. Ramen är beslutet *React, Tailwind och JavaScript tillåts* (`BESLUT.md` 2026-10-16): Astro står kvar, React används som öar, och krockar tas upp med Johnny. Det som står här är underlag och förslag. Besluten är Johnnys.

**Märkning:**
- 📄 primärkälla: dokumentationen, källkoden eller npm-registret
- 🔧 eget: mätt i provbygget eller härlett ur källkod
- ⚠️ overifierat: andrahandskälla, källor som går isär eller inte prövat
- ⚖️ tolkning av licens, inte juridisk rådgivning

**Metod:** primärkällor först, lästa med WebFetch och i grunda kloner där inga skript kördes. Alla källor är lästa 2026-10-16; listan står sist. Versioner är kontrollerade med `npm view` samma dag. De viktigaste påståendena prövades i ett **provbygge** utanför repot (sessionens scratch): Astro 7.4.0, `@astrojs/react` 7.1.0, React 19.3.1 och Motion 14.3.0 med `security.csp` på. Där mättes JavaScript per ö, sidorna kördes i Chromium med och utan JavaScript, och Lighthouse 13.5.0 ur `skript/` kördes tre gånger per sida. ESLint-, TypeScript- och Vitest-förslagen nedan kördes också där.

## Sammanfattning

1. **En React-komponent utan `client:`-direktiv kostar 0 kB JavaScript.** Astro renderar den till HTML vid bygget (📄 Astro, directives). Det är det säkraste sättet att använda React och kan användas fritt.
2. **Den första ön på en sida kostar cirka 60 kB JavaScript (brotli) eller 69 kB (gzip).** Det är React-körtiden; varje ö därefter kostar bara sin egen kod. Motion lägger till 27 kB med `m` och `LazyMotion` eller 38 kB med `motion`-komponenten (🔧 mätt).
3. **En liten ö ger fortfarande Lighthouse 100**, också i första skärmen på mobilen: total blocking time (TBT) blev 0–9 ms på provsidorna (🔧 mätt, median av tre). Marginalen är liten. Med Lighthouse 13.5.0 kräver 100 en TBT under cirka 90 ms på mobilen om allt annat är perfekt (🔧 härlett ur källkoden).
4. **Astros CSP klarar öarna.** Astro 7.4 hashar själv öns körtid och direktivskripten, och hydreringen fungerade under strikt CSP (📄 källkoden; 🔧 prövat).
5. **`style`-attribut i serverns HTML krockar med CSP.** Motions `initial` och `animate` blir `style="…"`, som Astros CSP spärrar. Det ger ett CSP-fel i konsolen på varje sidladdning (🔧 prövat), alltså fynd i kontroll 2. Radix, Base UI och React Aria skriver också sådana attribut (📄 källkoden).
6. **Motion bryter mot *ingen text som börjar osynlig*** när `initial` har `opacity: 0`: värdet skrivs i HTML:en och gäller tills JavaScript har körts (📄 Motion; 🔧 sett i bygget). Hover och tryck utan `initial` skriver inget attribut och är säkra.
7. **Radix döljer mer än vi trodde.** Ett stängt Accordion- eller Collapsible-innehåll finns inte alls i HTML:en, och innehåll i portaler (Dialog, Popover) saknas också (📄 källkoden). shadcn/ui har sedan 2026-07-02 Base UI som standardbas, och React Aria finns som tredje bas (📄 shadcn).
8. **Startsäkringen krockar med två verktyg.** TypeScript 7 stöds varken av `@astrojs/check` eller `typescript-eslint` (📄 peer-kraven). ESLint 9 är EOL, men `eslint-plugin-jsx-a11y` och `eslint-plugin-react` stöder inte ESLint 10. Ersättarna `eslint-plugin-jsx-a11y-x` och `@eslint-react/eslint-plugin` fungerar (🔧 prövat).
9. **Förslaget i korthet:** Astro först och plattformen före React; öar bara för verkligt tillstånd; `client:visible` som standard och aldrig `client:only` för innehåll; högst 75 kB JavaScript före första interaktion och 100 kB för hela sidan; Base UI som bas; inga `style`-attribut från öarna; rörelse som visar text görs i CSS. Detaljerna står i *Så arbetar vi* (avsnitt 11) och krockarna i avsnitt 12.

## 1. Versioner och underhåll

Senaste stabila version enligt `npm view` 2026-10-16.

| Paket | Version | Licens | Anmärkning |
|---|---|---|---|
| react, react-dom | 19.3.1 | MIT | Ingen React 20. 19.3 gjorde `<ViewTransition>` och Fragment refs stabila 📄 |
| @astrojs/react | 7.1.0 | MIT | Oxc i stället för Babel; `babel`-optionen borttagen i 7.0 📄 |
| astro | 7.4.0 | MIT | Vite 8 och Rolldown; Node 22.22 eller senare 📄 |
| typescript | 7.0.2 (latest), 6.0.3 | Apache-2.0 | `@astrojs/check` 0.9.10 kräver `^5 \|\| ^6`, `typescript-eslint` 8.71.2 kräver `<6.1.0` 📄 |
| eslint | 10.12.0 | MIT | v9 EOL sedan 2026-08-06 📄 |
| motion | 14.3.0 | MIT | Motion+ är betalt och behövs inte |
| tailwindcss, @tailwindcss/vite | 4.3.3 | MIT | `@astrojs/tailwind` gäller bara Tailwind 3 📄 |
| @base-ui/react | 1.9.0 | MIT | Stabil sedan v1.0.0, 2025-12-11 📄 |
| radix-ui | 1.8.1 | MIT | Aktivt men långsamt underhåll (WorkOS) 📄 |
| react-aria-components | 1.22.1 | Apache-2.0 | Svenska (`sv-SE`) bland 36 lokaler 📄 |
| shadcn (CLI) | 4.21.5 | MIT | |
| cn | 0.4.0 | MIT | shadcn:s nya `cn` sedan 2026-09-03 📄 |
| class-variance-authority | 0.7.1 | Apache-2.0 | Stabil sedan 2024; v1 är beta (`cva` 1.0.0-beta.12) |
| nanostores, @nanostores/react | 1.5.5, 2.0.1 | MIT | Astros recept för delat tillstånd 📄 |
| babel-plugin-react-compiler | 1.0.0 | MIT | Stabil sedan 2025-10-07 📄 |

Repona: react/react 251 153 ★, shadcn-ui/ui 125 737 ★, motiondivision/motion 34 188 ★, radix-ui/primitives 19 399 ★, adobe/react-spectrum 15 953 ★, mui/base-ui 11 156 ★. Alla har commits från oktober 2026 (GitHub-API).

## 2. React: reglerna som gäller en ö

- **Rendering är ren:** samma props ger samma JSX. `Math.random()`, `Date`, `crypto.randomUUID()`, `window` och `localStorage` hör inte hemma i rendering. *"React assumes that every component you write is a pure function."* 📄 [Keeping components pure](https://react.dev/learn/keeping-components-pure), [Components and hooks must be pure](https://react.dev/reference/rules/components-and-hooks-must-be-pure)
- **Det som kan räknas fram behöver ingen effekt:** *"If you can calculate something during render, you don't need an Effect."* En effekt är till för att synka med ett externt system, och den ska ha städning. 📄 [You Might Not Need an Effect](https://react.dev/learn/you-might-not-need-an-effect), [Synchronizing with Effects](https://react.dev/learn/synchronizing-with-effects)
- **Beroendelistan beskriver koden:** *"We recommend treating the dependency lint error as a compilation error."* 📄 [Removing Effect Dependencies](https://react.dev/learn/removing-effect-dependencies)
- **Minimal state:** ingen redundant state och inga props som speglas i state. 📄 [Choosing the State Structure](https://react.dev/learn/choosing-the-state-structure); Kent C. Dodds, [Don't sync state. Derive it!](https://kentcdodds.com/blog/dont-sync-state-derive-it)
- **Nycklar kommer från datan,** aldrig från `Math.random()`, och komponenter definieras inte inuti andra komponenter. 📄 [Rendering Lists](https://react.dev/learn/rendering-lists), [Preserving and Resetting State](https://react.dev/learn/preserving-and-resetting-state)
- **Hydrering kräver identisk HTML:** *"You should treat mismatches as bugs and fix them."* Tid och datum formateras därför vid bygget och skickas som props. Värden från webbläsaren läses med `useSyncExternalStore` och en `getServerSnapshot`. 📄 [hydrateRoot](https://react.dev/reference/react-dom/client/hydrateRoot), [useSyncExternalStore](https://react.dev/reference/react/useSyncExternalStore)
- **19.3 har `use(browser())`** för en komponent som bara kan köras i webbläsaren; servern visar då närmaste `<Suspense>`-reserv. Det ersätter mönstret med `isClient` i en effekt. 📄 [browser](https://react.dev/reference/react-dom/browser)
- **Id för etiketter och ARIA tas från `useId`.** Astro sätter ett eget prefix per ö, så id:n krockar inte mellan öar (📄 `@astrojs/react` 7.1.0, `dist/server.js` och `dist/client.js`; 🔧 sett i bygget: `id="_r1R_0_"`). 📄 [useId](https://react.dev/reference/react/useId)
- **Ett React-formulär med en funktion som `action` fungerar utan JavaScript bara med Server Functions,** och dem har en statisk sajt inte: *"Passing a Server Function to `<form action>` allow users to submit forms without JavaScript enabled."* En ö med formulär behöver därför ett riktigt `action` mot en URL och `onSubmit` som förbättring. 📄 [form](https://react.dev/reference/react-dom/components/form)
- **Tillgänglighet:** react.dev har ingen egen sida; den gamla är arkiverad men gäller som princip: etikett på varje kontroll, allt med tangentbord, fokus tillbaka efter dialog. `tabIndex` hålls till -1 och 0. 📄 [legacy: Accessibility](https://legacy.reactjs.org/docs/accessibility.html), [Common components](https://react.dev/reference/react-dom/components/common), [Manipulating the DOM with refs](https://react.dev/learn/manipulating-the-dom-with-refs)
- **React 19-idiom:** `ref` är en vanlig prop (ingen `forwardRef`), `propTypes` och `defaultProps` på funktioner är borta, och `<Context value>` ersätter `.Provider`. 📄 [React 19](https://react.dev/blog/2024/12/05/react-19), [React 19.2](https://react.dev/blog/2025/10/01/react-19-2), [React 19.3](https://react.dev/blog/2026/09/09/react-19-3)
- **Strict Mode:** React rekommenderar Strict Mode med lint-pluginet. Astro lindar inte öarna i `<StrictMode>` (📄 `@astrojs/react` 7.1.0, `dist/client.js`), så ön får göra det själv. Det kostar inget i produktion. 📄 [Rules of React](https://react.dev/reference/rules)
- **React Compiler** memoiserar automatiskt och gör `useMemo`, `useCallback` och `memo` onödiga i ny kod. Den är stabil sedan 1.0, och versionen ska låsas exakt. I Astro finns `react({ compiler: true })`, som bygger på Oxc:s experimentella port; den ska inte köras ihop med Babel-varianten. Lint-reglerna fungerar utan kompilatorn. 📄 [React Compiler 1.0](https://react.dev/blog/2025/10/07/react-compiler-1), [Astros React-guide](https://docs.astro.build/en/guides/integrations-guide/react/), [Oxc](https://oxc.rs/docs/guide/usage/transformer/react-compiler.html). För små öar vinner vi troligen inget (🔧 härlett).

## 3. Astro: öar, direktiv och gränser

- **Utan direktiv blir komponenten HTML:** *"If no `client:*` directive is provided, its HTML is rendered onto the page without JavaScript."* 📄 [Directives](https://docs.astro.build/en/reference/directives-reference/#client-directives)
- **Direktiven:** `client:load` hydrerar direkt; `client:idle` väntar på `requestIdleCallback` och kan få `timeout`; `client:visible` väntar tills ön syns och kan få `rootMargin`; `client:media` väntar på en mediefråga; `client:only` *"skips HTML server rendering"*. 📄 samma sida
- **Ramverket skickas en gång per sida,** hur många öar den än har. 📄 [Framework components](https://docs.astro.build/en/guides/framework-components/)
- **Direktiv fungerar bara på komponenter som importeras direkt i en `.astro`-fil.** En ö sätts alltså alltid av en Astro-sektion. 📄 Directives
- **Props till en ö serialiseras:** objekt, tal, strängar, listor, `Date`, `Map`, `Set`, `URL` med flera, men inga funktioner och inga render props. Barn från Astro kommer in som en HTML-sträng, inte som React-noder. 📄 Framework components; [React-guiden](https://docs.astro.build/en/guides/integrations-guide/react/)
- **Ingen React-kontext över ögränser:** *"you can't use these context wrappers"*. Delat tillstånd görs med Nano Stores (*"less than 1 KB"*) eller egna händelser. Leverantörer som `MotionConfig` och `I18nProvider` måste ligga i varje ö. 📄 [Sharing state](https://docs.astro.build/en/recipes/sharing-state-islands/)
- **Server islands kräver adapter** och går inte att använda på en statisk sajt utan Worker-rendering. 📄 [No adapter for server islands](https://docs.astro.build/en/reference/errors/no-adapter-installed-server-islands/)
- **`<Image>` och `<Picture>` går inte att använda i `.tsx`.** Bilden renderas i `.astro` och skickas in som barn eller slot, eller som färdig `src` från `getImage()`. 📄 [Images in UI framework components](https://docs.astro.build/en/guides/images/#images-in-ui-framework-components)
- **Astro 7 tar bort mellanslag mellan inline-element** (`compressHTML: 'jsx'`). Skriv `{" "}` där ett mellanslag behövs. 📄 [Upgrade to v7](https://docs.astro.build/en/guides/upgrade-to/v7/)

## 4. CSP med öar

- **Astro hashar öarna själv.** När en renderare som React finns lägger Astro 7.4 till hashar för öns körtid, stilen `astro-island{display:contents}`, direktivskripten och klientens filer. 📄 [`core/csp/common.ts`](https://github.com/withastro/astro/blob/astro@7.4.0/packages/astro/src/core/csp/common.ts), rad 124–163. Dokumentationen säger det bara allmänt. 🔧 Prövat: `script-src 'self'` plus sju hashar, och ön hydrerade utan konsolfel.
- **Öns kod laddas från `/_astro/` och täcks av `'self'`.** Sätts `scriptDirective.resources` försvinner `'self'` och måste läggas till igen. 📄 [Configuration: security.csp](https://docs.astro.build/en/reference/configuration-reference/#securitycsp)
- **`is:inline` hashas inte,** och det gäller också skript med andra attribut än `src` och `define:vars`. Därför är `bibliotek/src/komponenter/inlineskript.mjs` rätt väg. 📄 [#16678](https://github.com/withastro/astro/issues/16678); Directives
- **`style`-attribut spärras.** Astros egna hashar hamnar aldrig i `style-src-attr`. Undantaget är `{ resource: "'unsafe-inline'", kind: "attribute" }`, som bara gäller attribut och inte rör skripten. 📄 Configuration: security.csp. Stilar som JavaScript sätter via CSSOM spärras inte: *"Style properties that are set directly on the element's style property will not be blocked"*. 📄 [MDN, style-src-attr](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Content-Security-Policy/style-src-attr)
- 🔧 **Prövat i Chromium:** Motions `initial={{ opacity: 0, y: 16 }}` blev `style="opacity:0;transform:translateY(16px)"` i HTML:en. Under Astros CSP spärrades attributet, så texten syntes utan JavaScript, men konsolen visade *"Applying inline style violates the following Content Security Policy directive"* både med och utan JavaScript. Samma sak med `initial={false}`, som gav `style="opacity:1"`. En `m.a` med bara `whileHover` gav inget attribut. Efter hydreringen satte Motion stilen via CSSOM utan fel.
- ⚠️ **Härlett, inte sett:** med CSP syns texten först, döljs när Motion hydrerar och tonas sedan in, alltså ett blink.
- **`<ClientRouter />`, Shiki och dev-läget stöds inte med CSP.** CSP-prov körs mot `astro build` och `astro preview`. 📄 Configuration: security.csp

## 5. Tillgängliga primitiver och shadcn/ui

- **React Aria (Adobe):** komponenter och hooks utan egen stil, testade med VoiceOver, JAWS, NVDA och TalkBack, med `sv-SE` och datum efter lokalen. React 18 och senare behöver ingen `SSRProvider`. Disclosure lägger innehållet i HTML:en, dolt, och använder `hidden="until-found"` efter hydrering. Apache-2.0. 📄 [react-aria.adobe.com](https://react-aria.adobe.com/), [Quality](https://react-aria.adobe.com/quality), [SSRProvider](https://react-aria.adobe.com/SSRProvider)
- **Radix (WorkOS):** sköter ARIA, fokus och tangentbord, men *"it's up to you to provide those labels"*. Ett stängt dragspel renderar inget (`Presence` ger `null`), och `Portal` renderar inget på servern. 24 källfiler sätter `style`. Förslaget om `hidden=until-found` (#1660, sedan 2022) är inte genomfört. 📄 [Radix accessibility](https://www.radix-ui.com/primitives/docs/overview/accessibility); `packages/react/presence/src/presence.tsx`, `portal/src/portal.tsx` i [radix-ui/primitives](https://github.com/radix-ui/primitives)
- **Base UI (MUI):** stabil v1, följer APG, trädskakbar, MIT. Dragspelet kan behålla innehållet med `hiddenUntilFound` eller `keepMounted`; båda är av som standard. `CSPProvider` täcker egna `<style>`-taggar men inte `style`-attribut. 📄 [Releases](https://base-ui.com/react/overview/releases), [Accordion](https://base-ui.com/react/components/accordion), [CSPProvider](https://base-ui.com/react/utils/csp-provider)
- **shadcn/ui:** *"This is not a component library. It is how you build your component library."* Koden kopieras in och ägs av projektet. Base UI är standardbas sedan 2026-07-02, Radix väljs med `-b radix`, och React Aria med `--base aria`. `cn` kommer sedan 2026-09-03 från paketet `cn`; äldre block använder `@/lib/utils` med clsx och tailwind-merge. CVA styr varianterna. Varken `tw-animate-css` eller shadcns stilfiler villkorar rörelse med `prefers-reduced-motion` (sett). 📄 [shadcn docs](https://ui.shadcn.com/docs), [Base UI default](https://ui.shadcn.com/docs/changelog/2026-07-base-ui-default), [React Aria](https://ui.shadcn.com/docs/changelog/2026-07-react-aria), [cn](https://ui.shadcn.com/docs/changelog/2026-09-cn), [Tailwind v4](https://ui.shadcn.com/docs/tailwind-v4)
- **Registret:** `npx shadcn add <url>` kan skriva filer var som helst i projektroten (`~/`, men inte utanför), lägga till global CSS och CSS-variabler, skriva `.env` och installera npm-paket utan `--ignore-scripts`. CLI:n kör ingen kod ur själva posten, men beroendenas installationsskript körs. 📄 [registry-item.json](https://ui.shadcn.com/docs/registry/registry-item-json), [Namespaces](https://ui.shadcn.com/docs/registry/namespace); schemat i [shadcn-ui/ui](https://github.com/shadcn-ui/ui) (`packages/registry/src/registry/schema.ts`)
- **Native HTML täcker det mesta:** `<details name>` (Baseline 2024), `popover` (Baseline 2025), `<dialog>` som kan öppnas med `command="show-modal"` utan eget skript (Baseline 2025-12-12) och `@starting-style`. 📄 web-features 3.43.0; `guide/2-4-skelett.md`, primitiverna

## 6. Motion och Tailwind 4

- **Storlek:** `motion`-komponenten går inte att trädskaka under 43 kB; `m` är drygt 5 kB, `domAnimation` plus 24 kB och `domMax` plus 38 kB. 📄 [Reduce bundle size](https://motion.dev/docs/react-reduce-bundle-size). 🔧 Mätt i provbygget: ön med `m`, `LazyMotion` och `domAnimation` 29,3 kB gzip (26,8 kB brotli); med `motion` 42,7 kB gzip (38,5 kB brotli).
- **Reducerad rörelse är avstängd som standard** (`reducedMotion: "never"`). Med `"user"` stängs transform- och layoutanimationer av, men opacitet och färg animeras fortfarande. 📄 [MotionConfig](https://motion.dev/docs/react-motion-config), [Accessibility](https://motion.dev/docs/react-accessibility)
- **`initial` hamnar i serverns HTML:** *"Server will output `translateX(100px)`"*. 📄 [motion component](https://motion.dev/docs/react-motion-component); [#1727](https://github.com/motiondivision/motion/issues/1727): *"this library relies on style attributes"*.
- **Tailwind 4 i Astro:** `@tailwindcss/vite` i `vite.plugins` och `@import "tailwindcss"`. Kitets tokens mappas med `@theme inline`, och `--color-*: initial` tar bort standardpaletten, så att bara kitets färger finns. Tailwind har `motion-safe:`, `motion-reduce:`, `forced-colors:` och `sr-only`. 📄 [Tailwind och Astro](https://tailwindcss.com/docs/installation/framework-guides/astro), [Theme](https://tailwindcss.com/docs/theme), [Hover, focus and other states](https://tailwindcss.com/docs/hover-focus-and-other-states)

## 7. 21st.dev

- **Byggsätt:** *"React + Tailwind CSS + TypeScript, shadcn/ui-compatible."* Komponenterna installeras med shadcn-CLI:n från `https://21st.dev/r/<författare>/<komponent>` och kräver API-nyckel för koden. 📄 [21st.dev/llms.txt](https://21st.dev/llms.txt)
- **Licens per komponent,** och villkoren kräver en synlig länk tillbaka när komponenter kopieras till andra webbplatser. Det är oklart om det gäller en kundsajt ⚖️. Därför hämtas MIT-block från ursprungsrepot (Tailark, Magic UI) när ett sådant finns. Utredningen och premiummönstren står i premiumpassets källkort *21st* och *21st – premiummönster*.
- **Vanliga mönster i blocken:** `'use client'` med `useState`, Radix-dragspel, Motion-intoningar från `opacity: 0`, marquee och `next/link`. Det mesta går att ta in som HTML utan direktiv (0 kB). Det som kräver en ö krockar oftast med besluten i avsnitt 12.

## 8. Verktyg: typer, lint och formattering

- **tsconfig:** `"extends": "astro/tsconfigs/strict"` plus `"jsx": "react-jsx"` och `"jsxImportSource": "react"`. Astro rekommenderar `strict` eller `strictest`. 📄 [React-guiden](https://docs.astro.build/en/guides/integrations-guide/react/), [TypeScript](https://docs.astro.build/en/guides/typescript/). `astro check` med TypeScript 6.0.3 gav 0 fel i provbygget 🔧.
- **ESLint 10 är den enda underhållna versionen:** *"ESLint v9.x reached end-of-life on 2026-08-06"*. 📄 [Version support](https://eslint.org/version-support/)
- **`eslint-plugin-jsx-a11y` stöder inte ESLint 10** (ärendet [#1075](https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/issues/1075) är öppet sedan 2026-02-09; senaste version 2024-10-26). Ersättaren är [`eslint-plugin-jsx-a11y-x`](https://github.com/eslint-community/eslint-plugin-jsx-a11y-x) i eslint-community (MIT, `recommended` och `strict`), som `eslint-plugin-astro` 3 också godtar. 📄 npm peer-krav
- **`eslint-plugin-react` stöder bara ESLint till 9.7** (📄 npm). [`@eslint-react/eslint-plugin`](https://eslint-react.xyz/docs/getting-started/typescript) (MIT, aktivt) ersätter det med `recommended-typescript`.
- **`eslint-plugin-react-hooks` 7.1.1** har kompilatorns regler (`purity`, `refs`, `set-state-in-effect`, `immutability`, `static-components` med flera) i `recommended`: 16 regler. `recommended-latest` lägger bara till `void-use-memo` (🔧 läst i paketet). *"can be used even if your app hasn't adopted the compiler yet"*. 📄 [eslint-plugin-react-hooks](https://react.dev/reference/eslint-plugin-react-hooks)
- **`eslint-plugin-astro` 3** kräver ESLint 10 och ger a11y-regler för `.astro` (`jsx-a11y-recommended`, `jsx-a11y-strict`). 📄 [User guide](https://ota-meshi.github.io/eslint-plugin-astro/user-guide/)
- **Typad lint** (`recommendedTypeChecked` med `projectService: true`) är långsammare men billig i små projekt. 📄 [typescript-eslint](https://typescript-eslint.io/getting-started/typed-linting/)
- 🔧 **Prövat:** uppsättningen i avsnitt 11 fångade på en dålig fil `Math.random()` i rendering, `setState` i en effekt, `div` med `onClick`, `img` utan `alt` och saknad `key`, i både `.tsx` och `.astro`, och gav 0 fel på de rena filerna. `@eslint-react` och `react-hooks` dubblerar två varningar (`purity`, `set-state-in-effect`).
- **Prettier** med `prettier-plugin-astro` och `prettier-plugin-tailwindcss`, som *"must be loaded last"* och med Tailwind 4 behöver `tailwindStylesheet`. `tailwindFunctions` sorterar klasser i `cn` och `cva`. 📄 [prettier-plugin-tailwindcss](https://github.com/tailwindlabs/prettier-plugin-tailwindcss)
- **Biome är inget alternativ än:** `.astro` är *"experimental"* för parsning, formattering och lint. 📄 [Language support](https://biomejs.dev/internals/language-support/). Oxlint och oxfmt används av mallen area44 (avsnitt 9) och bevakas.

## 9. Testning och öppen källkod att lära av

- **Testing Library:** *"your test should resemble how users interact with your code"*; `getByRole` först, `getByTestId` sist; `user-event` före `fireEvent`. 📄 [Queries](https://testing-library.com/docs/queries/about/); Kent C. Dodds, [Common mistakes](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library), [Write tests](https://kentcdodds.com/blog/write-tests) (*"Mostly integration."*)
- **Vitest 5** med `getViteConfig()` från `astro/config`. Browser Mode kör i riktig webbläsare med Playwright som leverantör. Container API:t (experimentellt) renderar `.astro` med React-renderaren från `@astrojs/react/container-renderer`. 📄 [Astro testing](https://docs.astro.build/en/guides/testing/), [Container API](https://docs.astro.build/en/reference/container-reference/), [Vitest Browser Mode](https://vitest.dev/guide/browser/). 🔧 Prövat: ett Testing Library-test i jsdom och ett container-test (med `// @vitest-environment node`) gick igenom.
- **Playwright och axe:** *"automated testing cannot detect all types of WCAG violations"*. 📄 [Playwright, accessibility testing](https://playwright.dev/docs/accessibility-testing)
- **vercel-labs/agent-skills, `react-best-practices`** (32 507 ★; MIT enligt README, ingen licensfil): 70 regler. Serverreglerna och `next/dynamic` gäller Next.js. För en ö gäller direkta importer i stället för barrel-filer, villkorlig laddning, inga komponenter i komponenter och `? :` i stället för `&&` när värdet kan vara 0. Regeln `rendering-hydration-no-flicker` bygger på ett inline-skript som Astros CSP spärrar. 📄 [repot](https://github.com/vercel-labs/agent-skills)
- **bulletproof-react** (35 982 ★, MIT): samlokalisering, inga barrel-filer, lokal state och Testing Library passar oss. Features-arkitektur, globala stores, react-query, MSW och Storybook är för stort för en småföretagssajt. Exempelappen ligger kvar på React 18 och ESLint 8. 📄 [repot](https://github.com/alan2207/bulletproof-react)
- **Astros exempel:** `framework-react` (strict, `react-jsx`, `client:visible`) och `container-with-vitest`. `with-nanostores` använder numera Preact. Inget exempel slår på CSP. 📄 [withastro/astro/examples](https://github.com/withastro/astro/tree/main/examples)
- **Mallar:** [area44/astro-shadcn-ui-template](https://github.com/area44/astro-shadcn-ui-template) (MIT, 210 ★) har shadcn med Base UI, oxlint och nästan allt i React, men ett `is:inline`-skript som CSP spärrar. [sudeep2003/AstroFlow](https://github.com/sudeep2003/AstroFlow) (MIT, 45 ★) har en tydlig mapp `components/react/`, men `client:load` överallt och Motion från `opacity: 0` utan reducerad rörelse. Båda är exempel på det vi ska undvika lika mycket som förebilder.
- **Josh W. Comeau:** hydrering är inte rendering, och reducerad rörelse ska vara startläget: *"start **without animations**, and enable them if the user wishes."* 📄 [The Perils of Rehydration](https://www.joshwcomeau.com/react/the-perils-of-rehydration/), [prefers-reduced-motion](https://www.joshwcomeau.com/react/prefers-reduced-motion/)

## 10. Prestanda och JavaScript-budget

- **JavaScript kostar mest per byte:** nedladdning och körning på huvudtråden. *"if a bundle exceeds ~50–100 kB, split it up"*. 📄 Osmani och Bynens, [The Cost of JavaScript 2019](https://v8.dev/blog/cost-of-javascript-2019)
- **Statisk rendering ger låg TBT och INP** *"as long as you limit the amount of client-side JavaScript"*; *"It's fine to mostly ship HTML with minimal JavaScript"*. 📄 Osmani och Miller, [Rendering on the Web](https://web.dev/articles/rendering-on-the-web) (uppdaterad 2026-01-05)
- **Russells budgetar:** 2024 för innehållssajter: 75 KiB JavaScript för 3 sekunder och 100 KiB för 5 sekunder, på en telefon för cirka 350 USD. 2026 för JS-lätta sidor: 0,3 MiB på 3 sekunder (Galaxy A24 4G, 9 Mbit/s, P75); ⚠️ texten säger inte om siffrorna är komprimerade. 📄 [2024](https://infrequently.org/2024/01/performance-inequality-gap-2024/), [2026](https://infrequently.org/2025/11/performance-inequality-gap-2026/)
- **INP:** bra är högst 200 ms vid 75:e percentilen. TBT *"may be a reasonable proxy metric for INP, but it's not a substitute"*. 📄 [INP](https://web.dev/articles/inp), [Optimize INP](https://web.dev/articles/optimize-inp)
- **TBT i Lighthouse:** en lång uppgift är över 50 ms, och grönt på mobilen är 0–200 ms. 📄 [TBT](https://developer.chrome.com/docs/lighthouse/performance/lighthouse-total-blocking-time). 🔧 Härlett ur Lighthouse 13.5.0 (`total-blocking-time.js`, `scoring.js`): TBT väger 30 %, varje mått och kategorin avrundas till två decimaler, så 100 kräver en TBT-poäng på 0,99. Det motsvarar TBT under cirka 93 ms på mobilen och 83 ms på datorn, och LCP under cirka 1 800 ms på mobilen, om allt annat är perfekt.
- **Budget-audits finns inte längre i Lighthouse 13.** `resource-summary` finns kvar och kan påstås i Lighthouse CI (`resource-summary:script:size`, i byte). 📄 [LHCI configuration](https://github.com/GoogleChrome/lighthouse-ci/blob/main/docs/configuration.md); 🔧 sett i `skript/node_modules/lighthouse`
- **Bundle-analys:** `rollup-plugin-visualizer` i `vite.plugins` skriver `stats.html` i roten av `dist/`. Rapporten visar hela sajten, inte per sida, och den får inte publiceras. 📄 [Astro, analyze bundle size](https://docs.astro.build/en/recipes/analyze-bundle-size/), [rollup-plugin-visualizer](https://github.com/btd/rollup-plugin-visualizer) (MIT, 2 426 ★)
- **Tredje part:** `async` eller `defer`, lat laddning av inbäddningar, självhosting. 📄 [Load third-party JavaScript](https://web.dev/articles/optimizing-content-efficiency-loading-third-party-javascript). Det gäller redan genom samtyckesreglerna i `guide/2-8-teknik-och-kvalitet.md`.

🔧 **Mätt i provbygget** (komprimerat som Cloudflare skickar det; brotli -q 11 och gzip -9):

| Sida | JavaScript | Lighthouse mobil, median av tre |
|---|---|---|
| Bara Astro | 0 | 100, TBT 5 ms |
| React utan direktiv | 0 (HTML:en växte med 59 byte) | 100, TBT 0 ms |
| En ö (`client:visible`, i första skärmen) | 60 kB br / 69 kB gz: React-körtiden 57/66, ön 0,3; plus ö-körtiden inline i HTML:en, cirka 2,3 kB gz | 100, TBT 0 ms, JS-körtid 81 ms |
| Ö med `m` och `LazyMotion` | 87 kB br / 99 kB gz | 100, TBT 0 ms, JS-körtid 145 ms |
| Ö med `motion` | 98 kB br / 112 kB gz | 100, TBT 9 ms, JS-körtid 171 ms |

Provsidorna är minimala. En riktig sida har mer CSS, bilder och typsnitt, så marginalen är mindre ⚠️. På datorn blev alla 100 med TBT 0 ms.

## 11. Så arbetar vi – förslag

Allt i det här avsnittet är **förslag** tills Johnny sagt ja. Reglerna gäller från den första sajten som får en ö; testerna och kontrollerna i skriptet från N2 (nivåerna i `guide/README.md`). Kortversionen för byggaren står i skelettskillens delfil `react-i-astro.md` (utkast i premiumpasset).

### När React och när Astro

- **Astro är standard.** Innehåll, rubriker, bilder, navigation och formulärens HTML skrivs i `.astro`. Varför: allt i `.astro` blir HTML utan JavaScript (📄 Islands).
- **Plattformen före React:** `<details name>`, `popover`, `<dialog>` med `command`, `@starting-style` och små `<script>` i Astro-komponenter, som Astro hashar själv. Varför: 0 kB och fungerar utan JavaScript (`guide/2-4-skelett.md`).
- **React utan direktiv är fritt.** En komponent i `.tsx` som saknar hooks och händelser renderas till HTML vid bygget. Varför: 0 kB (🔧 mätt).
- **En ö (React med direktiv) används bara för verkligt tillstånd** som en plattformsprimitiv eller ett litet skript inte klarar: bokningskalender, prisräknare, filter, flerstegsformulär som förbättring eller ett licensierat block som är värt sin kostnad.
- **Ön sätts av en Astro-sektion** som ger den innehållet som serialiserbara props. Innehållet ligger kvar i innehållsfilerna (`guide/2-4-skelett.md`, *Hur sektionerna byggs*).

### Client-direktiven

| Direktiv | När |
|---|---|
| inget | standard; komponenten blir HTML |
| `client:visible` | ön under första skärmen; `rootMargin: "200px"` när den ska vara redo när den syns |
| `client:idle` | ön behövs snart men inte direkt; med `timeout` |
| `client:media` | ön finns bara vid en viss bredd |
| `client:load` | ön syns direkt och måste svara direkt; motiveras i sektionen och mäts med kontroll 9 |
| `client:only` | **aldrig för innehåll**; bara för en ren webbläsarfunktion med `slot="fallback"` som fungerar utan JavaScript, med Johnnys ja |
| `server:defer` | inte på typ A, som saknar adapter |

### JavaScript-budget per sida

JavaScript räknas komprimerat, så som det överförs.

| Mått | Tak | Grund |
|---|---|---|
| Sida utan ö | inget ramverks-JS; bara bibliotekets egna småskript | Rendering on the Web 📄 |
| Före första interaktion (det som laddas utan scroll) | **högst 75 kB** | Russell 2024: 75 KiB för en innehållssajt på 3 s 📄 |
| Hela sidan, också öar som laddas vid scroll | **högst 100 kB** | Russell 2024: 100 KiB på 5 s 📄; Osmani: dela över 50–100 kB 📄 |
| TBT, Lighthouse mobil | under 90 ms | villkoret för 100 ur Lighthouse 13.5.0 🔧 |
| Lång uppgift vid interaktion | ingen över 50 ms från en ö | TBT-definitionen; INP 200 ms 📄 |

- **Vad det betyder:** React-körtiden (60 kB brotli, 69 kB gzip) ryms före första interaktion. En ö med Motion (87 kB brotli med `m` och `LazyMotion`) gör det inte och läggs under första skärmen med `client:visible`; det stämmer med regeln att första skärmens text aldrig animeras in (`guide/2-6-rorelse.md`). Med `motion`-komponenten ligger sidan vid totaltaket (98 kB). En andra tung beroendekedja, till exempel Radix-popover (23,5 kB gzip enligt Bundlephobia ⚠️), spräcker budgeten.
- **Kvalitetsskillen** (`.claude/skills/kvalitet/prestanda.md`) har ett eget startvärde utan källa: rapport över 50 kB gzip före första interaktion. Förslaget är att byta det mot 75 och 100 kB ovan, som har källa. Med 50 kB får ingen React-ö alls laddas i första skärmen. Skelettskillens siffra för React-körtiden (`interaktion.md`: cirka 56 kB gzip ur en extern mätning) ersätts av mätningen här.
- **Mäts så här:** summan av `/_astro/`-filerna som en sida kan ladda (öns fil, renderaren och deras importer), komprimerad, i bygget; det som laddas före första interaktion mäts med Playwright utan scroll; Lighthouse enligt kontroll 9. Ett analysbygge med `rollup-plugin-visualizer` görs vid behov och publiceras aldrig (`stats.html` i `dist/`).
- **Över budget** rapporteras till Johnny som en krock, enligt beslutet 2026-10-16.

### Mappstrukturen i biblioteket

```
bibliotek/src/
  komponenter/      Astro: atomer och molekyler (som i dag)
  sektioner/        Astro: sektionerna; den sektion som behöver en ö importerar den och sätter direktivet
  react/
    oar/            en fil per ö, till exempel Bokning.tsx, med test bredvid (Bokning.test.tsx)
    ui/             inkopierade primitiver i shadcn-stil, utan innehåll och utan egna värden
    lib/            cn och små hjälpfunktioner; delat tillstånd (Nano Stores) när två öar behöver det
bibliotek/licenser.md   källa, författare, licens och commit per inkopierad komponent
```

Varför: Astro kräver att direktivet sätts i `.astro` (📄 Directives), och samlokaliserade tester och filer utan barrel-index följer bulletproof-react och Kent C. Dodds (📄 [Colocation](https://kentcdodds.com/blog/colocation)). En mapp för React gör att lint och tsconfig kan rikta in sig på den. `components.json` behövs bara om shadcn-CLI:n används (📄 [components.json](https://ui.shadcn.com/docs/components-json)).

### Linting och typer

- **tsconfig:** `astro/tsconfigs/strict` plus `"jsx": "react-jsx"` och `"jsxImportSource": "react"`. `strictest` prövas när biblioteket har öar (N2).
- **TypeScript 6.0.x** tills `@astrojs/check` och `typescript-eslint` stöder 7. Startsäkringen rapporterar det redan (`BESLUT.md` 2026-10-16).
- **ESLint 10** med flat config, prövad i provbygget:

```js
// eslint.config.js – förslag, prövat 2026-10-16
import js from '@eslint/js';
import { defineConfig } from 'eslint/config';
import tseslint from 'typescript-eslint';
import reactHooks from 'eslint-plugin-react-hooks';
import eslintReact from '@eslint-react/eslint-plugin';
import jsxA11y from 'eslint-plugin-jsx-a11y-x';
import astro from 'eslint-plugin-astro';
import globals from 'globals';

export default defineConfig([
  { ignores: ['dist/', '.astro/'] },
  js.configs.recommended,
  tseslint.configs.recommended,
  {
    files: ['src/**/*.{ts,tsx}'],
    extends: [
      tseslint.configs.recommendedTypeChecked,
      reactHooks.configs.flat.recommended,
      eslintReact.configs['recommended-typescript'],
      jsxA11y.configs.strict,
    ],
    languageOptions: {
      parserOptions: { projectService: true, tsconfigRootDir: import.meta.dirname },
      globals: globals.browser,
    },
  },
  astro.configs.recommended,
  astro.configs['jsx-a11y-strict'],
]);
```

- **`eslint .` och `astro check` ger 0 fel** innan Johnny ser något (N2; rapport som kontroll 1b).
- **Prettier** med `prettier-plugin-astro` och sist `prettier-plugin-tailwindcss`, med `tailwindStylesheet` och `tailwindFunctions: ["cn", "cva", "clsx"]`.
- **Inte:** `eslint-plugin-react`, `eslint-plugin-jsx-a11y` (ingen ESLint 10), Biome (Astro experimentellt).

### Tester

- **Varje ö har ett test bredvid sig** med Vitest och Testing Library: `getByRole` och `getByLabelText`, `user-event`, mest integration. jsdom räcker; Browser Mode med Playwright när ön beror på layout eller fokus.
- **Ett container-test visar att ön finns som HTML** före JavaScript (Container API, `// @vitest-environment node`). API:t är experimentellt och låses mot Astros version.
- **Playwright mot `astro preview`:** sidan med JavaScript avstängt (innehållet syns, `guide/2-8`, N2-tabellen), hydreringen utan konsolfel (CSP-fel räknas, kontroll 2), axe i öns tillstånd (öppen, stängd, fel framkallat) och tangentbordet genom ön.

### Tillgänglighet

- **Native element först:** knapp är `<button>`, länk är `<a href>`, och `div` med `onClick` stoppas av lint.
- **Bas för öar: Base UI.** React Aria för datum och tid (bokning) med `I18nProvider locale="sv-SE"` i ön. Radix bara i ett befintligt block som inte döljer innehåll. Zag och Ariakit väljs inte. Varför: stabil v1, MIT, shadcns standardbas, och innehållet kan stanna i DOM (avsnitt 5).
- **Varje fält har en `<label>`;** id kommer från `useId`. Fokus går tillbaka till knappen när en dialog stängs. Kitets fokusring ersätter blockens (`focus-visible:ring-1` är för svag).
- **`MotionConfig reducedMotion="user"` i varje ö med Motion,** eftersom standard är `"never"` och kontext inte delas mellan öar. CSS-rörelse ligger under `motion-safe:` eller `prefers-reduced-motion: no-preference` (`guide/2-6-rorelse.md`).
- **Kontroll:** jsx-a11y-x i lint, axe i öns tillstånd och ett manuellt prov med tangentbord och skärmläsare. 0 axe-fel betyder inte tillgängligt (📄 Playwright).

### CSP

- **`security.csp` på,** utan `'unsafe-inline'` för skript och utan `<ClientRouter />`. Astro hashar öarna.
- **Inga `style`-attribut från öarna i serverns HTML:** inga `style={{…}}`, ingen Motion `initial` eller `animate` på element som renderas på servern, inga primitiver som skriver attribut i HTML:en. Motion används till interaktion efter hydrering (`whileHover`, `whileTap`), som går via CSSOM.
- **Undantaget `style-src-attr 'unsafe-inline'`** (`kind: "attribute"`) rör inte skripten men släpper in alla stilattribut. Det är ett beslut för Johnny per sajt, inte en standard.
- **Inline-skript bara via `inlineskript.mjs`;** ingen `dangerouslySetInnerHTML` med skript och ingen `AnimatePresence mode="popLayout"`. Behåll `'self'` om `scriptDirective.resources` sätts.
- **Prövas mot `astro build` och `astro preview`,** aldrig i dev.

### Så tas en 21st- eller shadcn-komponent in och granskas

1. **Licens:** MIT, ISC eller Apache-2.0 (Apache kräver licenstexten och märkta ändringar ⚖️). "Unknown" används som mönster, inte som kod. Källa, författare, licens och commit skrivs först i filen och i `licenser.md`.
2. **Källa:** ursprungsrepot före 21st:s kopia. Registerposten läses som JSON; `npx shadcn add` körs inte mot tredje part. `files`, `target`, `css`, `cssVars` och `envVars` granskas.
3. **Beroenden:** varje paket med licens, version och installationsskript (`npm view <paket> scripts`). `@radix-ui/*` byts mot Base UI eller native HTML, `framer-motion` mot `motion`, `@/lib/utils` mot `cn`.
4. **Ö eller inte:** inga hooks och inga händelser betyder inget direktiv. Annars direktiv enligt tabellen ovan.
5. **Next-specifikt bort:** `next/link` blir `<a>`, `next/image` blir Astros `<Image>` som skickas in, `next/font` blir kitets typsnitt, `"use server"` blir formulär mot vår Worker.
6. **Astro-gränser:** serialiserbara props, barn som HTML-sträng, leverantörer inuti ön.
7. **Tokens:** `@theme inline` mot kitets `--k-*`, `--color-*: initial`, och hårdkodade mått pekas om till kitets steg.
8. **Demoinnehåll bort:** engelsk text, påhittade siffror, logotyper och avatarer utan samtycke.
9. **Tillgänglighet:** axe, tangentbord, skärmläsare, kitets fokusring, landmärken och rubrikordning.
10. **Rörelse:** sök efter `opacity-0`, `initial=`, `animate-in`, `fade-in-0`, `zoom-in-95`, marquee och autoplay. Ingen text börjar under kitets lägsta opacitet; all rörelse villkoras.
11. **JavaScript:** mät sidan mot budgeten och kör kontroll 9 före och efter.
12. **CSP:** bygg med CSP och sök efter `style=` och `<style` i `dist/`; konsolen ska vara tom.
13. **Utan JavaScript:** Playwright med JavaScript avstängt. Allt innehåll syns, länkar och formulär fungerar, och sidans sökfunktion hittar svaren.
14. **Johnny godkänner** komponenten på provsidan innan den används i en sajt (`guide/2-4-skelett.md`).

## 12. Krockar med tidigare beslut

Beslutet 2026-10-16 säger att krockar tas upp tillsammans. Här är de som researchen hittade, med förslag på hantering.

| Beslut | Krock | Förslag |
|---|---|---|
| **Lighthouse 100** (`BESLUT.md` 2026-10-16, kontroll 9) | En ö kostar 60 kB och 80–170 ms JavaScript-körning på mobilen. Provsidorna fick 100, men TBT-marginalen till 100 är bara cirka 90 ms, och `client:load` i första skärmen eller flera öar äter den. | Budgeten ovan; `client:visible` som standard; varje ö mäts med kontroll 9 före och efter; under 100 går till Johnny. |
| **HTML först** (`guide/2-4-skelett.md`, N1) | `client:only` ger ingen HTML. Radix renderar inte stängt innehåll eller portaler. Block från 21st gör ofta menyn till en ö som inte öppnas utan JavaScript. | Aldrig `client:only` för innehåll; `<details name>`, `popover` och `<dialog>` för dragspel, meny och dialog; Base UI med `keepMounted` eller `hiddenUntilFound` när en ö behövs; Playwright utan JavaScript i intaget. |
| **Ingen text som börjar osynlig** (`guide/2-6-rorelse.md`, N1; `BESLUT.md` 2026-10-15) | Motions `initial={{ opacity: 0 }}` skrivs i HTML:en. Utan CSP är texten osynlig tills JavaScript körts; med CSP blir det ett konsolfel och troligen ett blink. Kitets 70 % i den måttliga versionen ger också ett attribut. | Intoning av text görs i CSS (`rorelse-mattlig.css`, `@starting-style`); Motion bara för interaktion efter hydrering. |
| **CSP med hashar** (`guide/2-8`, N2) | Base UI, Radix, React Aria och Motion skriver `style`-attribut (dold text, höjdvariabler, startvärden). | Johnny väljer: (a) `style-src-attr 'unsafe-inline'` per sajt eller (b) förbud och fynd vid varje `style=` i `dist/`. Claudes förslag är (b) som standard. |
| **Sparsam rörelse** (`BESLUT.md` 2026-10-15) | Motion respekterar inte reducerad rörelse som standard; `tw-animate-css` och shadcns animationer villkoras inte. | `reducedMotion="user"` i varje ö; rörelsen hämtas ur kitet, inte ur blocket. |
| **Bara tokens ur stilkitet** (`guide/2-4`, N1) | Tailwind-klasser i blocken har egna färger och mått (`py-36`, `rounded-2xl`). | `@theme inline` mot `--k-*`, `--color-*: initial`; hårdkodade mått byts mot kitets steg. |
| **Startsäkringen** (`BESLUT.md` 2026-10-15 och 2026-10-16) | TypeScript 7 går inte med `@astrojs/check` och `typescript-eslint`; `eslint-plugin-jsx-a11y` och `eslint-plugin-react` går inte med ESLint 10. | TypeScript 6.0.x tills vidare; `jsx-a11y-x` och `@eslint-react` i stället. Kompilatorn, om den slås på, låses exakt. |
| **Formulär** (`guide/2-8`, N1–N2) | En React-`action` med en klientfunktion skickar inget utan JavaScript. | Riktigt `action` mot Workern och `onSubmit` som förbättring. |
| **Inga arbetsverktyg i produktion** (`guide/2-8`, N4) | `rollup-plugin-visualizer` skriver `stats.html` i `dist/`. | Bara i ett separat analysbygge. |

## Det som inte gick att verifiera

- ⚠️ Att texten blinkar när Motion hydrerar under CSP är härlett, inte sett i video.
- ⚠️ Hur Base UI:s, Radix och React Arias dolda text (VisuallyHidden) ser ut när CSP spärrar dess `style`-attribut. Kan synas innan JavaScript har körts. Prövas i piloten.
- ⚠️ Storleken i kB för Base UI och React Aria per komponent är inte mätt.
- ⚠️ Om Russells siffror för 2026 är komprimerade framgår inte.
- ⚠️ Mätningarna gäller minimala sidor. TBT och JavaScript-körtid på en riktig sajt med öar måste mätas i en pilot.
- ⚠️ Om 21st:s krav på länk tillbaka gäller en kundsajt ⚖️.
- ⚠️ Vad React Aria använder en nonce till står inte i dokumentationen.

## Källor

Alla lästa 2026-10-16.

- **React:** [Learn](https://react.dev/learn), [Keeping components pure](https://react.dev/learn/keeping-components-pure), [Choosing the state structure](https://react.dev/learn/choosing-the-state-structure), [You Might Not Need an Effect](https://react.dev/learn/you-might-not-need-an-effect), [Synchronizing with Effects](https://react.dev/learn/synchronizing-with-effects), [Removing Effect Dependencies](https://react.dev/learn/removing-effect-dependencies), [Rendering lists](https://react.dev/learn/rendering-lists), [Preserving and resetting state](https://react.dev/learn/preserving-and-resetting-state), [Manipulating the DOM with refs](https://react.dev/learn/manipulating-the-dom-with-refs), [Rules of React](https://react.dev/reference/rules), [Components and hooks must be pure](https://react.dev/reference/rules/components-and-hooks-must-be-pure), [eslint-plugin-react-hooks](https://react.dev/reference/eslint-plugin-react-hooks), [React Compiler](https://react.dev/learn/react-compiler), [React Compiler 1.0](https://react.dev/blog/2025/10/07/react-compiler-1), [React 19](https://react.dev/blog/2024/12/05/react-19), [React 19.2](https://react.dev/blog/2025/10/01/react-19-2), [React 19.3](https://react.dev/blog/2026/09/09/react-19-3), [hydrateRoot](https://react.dev/reference/react-dom/client/hydrateRoot), [useId](https://react.dev/reference/react/useId), [useSyncExternalStore](https://react.dev/reference/react/useSyncExternalStore), [browser](https://react.dev/reference/react-dom/browser), [form](https://react.dev/reference/react-dom/components/form), [Common components](https://react.dev/reference/react-dom/components/common), [legacy: Accessibility](https://legacy.reactjs.org/docs/accessibility.html)
- **Astro:** [@astrojs/react](https://docs.astro.build/en/guides/integrations-guide/react/), [Islands](https://docs.astro.build/en/concepts/islands/), [Directives](https://docs.astro.build/en/reference/directives-reference/), [Framework components](https://docs.astro.build/en/guides/framework-components/), [Server islands](https://docs.astro.build/en/guides/server-islands/), [Sharing state](https://docs.astro.build/en/recipes/sharing-state-islands/), [security.csp](https://docs.astro.build/en/reference/configuration-reference/#securitycsp), [`core/csp/common.ts` @ 7.4.0](https://github.com/withastro/astro/blob/astro@7.4.0/packages/astro/src/core/csp/common.ts), [#16678](https://github.com/withastro/astro/issues/16678), [Images](https://docs.astro.build/en/guides/images/), [TypeScript](https://docs.astro.build/en/guides/typescript/), [Testing](https://docs.astro.build/en/guides/testing/), [Container API](https://docs.astro.build/en/reference/container-reference/), [Upgrade to v7](https://docs.astro.build/en/guides/upgrade-to/v7/), [Styling: Tailwind 4](https://docs.astro.build/en/guides/styling/#add-tailwind-4), [Analyze bundle size](https://docs.astro.build/en/recipes/analyze-bundle-size/), [examples](https://github.com/withastro/astro/tree/main/examples)
- **Webbplattformen:** [MDN, style-src-attr](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Content-Security-Policy/style-src-attr)
- **Primitiver och komponenter:** [React Aria](https://react-aria.adobe.com/), [Radix](https://www.radix-ui.com/primitives/docs/overview/introduction), [radix-ui/primitives](https://github.com/radix-ui/primitives), [Base UI](https://base-ui.com/react/overview/releases), [shadcn/ui](https://ui.shadcn.com/docs), [shadcn-ui/ui](https://github.com/shadcn-ui/ui), [21st.dev/llms.txt](https://21st.dev/llms.txt), [Motion](https://motion.dev/docs/react-reduce-bundle-size), [Motion #1727](https://github.com/motiondivision/motion/issues/1727), [Tailwind](https://tailwindcss.com/docs/theme)
- **Verktyg:** [ESLint version support](https://eslint.org/version-support/), [jsx-a11y #1075](https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/issues/1075), [eslint-plugin-jsx-a11y-x](https://github.com/eslint-community/eslint-plugin-jsx-a11y-x), [eslint-plugin-astro](https://ota-meshi.github.io/eslint-plugin-astro/user-guide/), [ESLint React](https://eslint-react.xyz/docs/getting-started/typescript), [typescript-eslint](https://typescript-eslint.io/getting-started/typed-linting/), [prettier-plugin-tailwindcss](https://github.com/tailwindlabs/prettier-plugin-tailwindcss), [Biome](https://biomejs.dev/internals/language-support/), [Testing Library](https://testing-library.com/docs/queries/about/), [Vitest Browser Mode](https://vitest.dev/guide/browser/), [Playwright](https://playwright.dev/docs/accessibility-testing)
- **Prestanda:** [Cost of JavaScript 2019](https://v8.dev/blog/cost-of-javascript-2019), [Performance Inequality Gap 2024](https://infrequently.org/2024/01/performance-inequality-gap-2024/) och [2026](https://infrequently.org/2025/11/performance-inequality-gap-2026/), [Rendering on the Web](https://web.dev/articles/rendering-on-the-web), [INP](https://web.dev/articles/inp), [Optimize INP](https://web.dev/articles/optimize-inp), [Performance budgets 101](https://web.dev/articles/performance-budgets-101), [Code splitting](https://web.dev/articles/reduce-javascript-payloads-with-code-splitting), [Third-party JavaScript](https://web.dev/articles/optimizing-content-efficiency-loading-third-party-javascript), [TBT](https://developer.chrome.com/docs/lighthouse/performance/lighthouse-total-blocking-time), [Performance scoring](https://developer.chrome.com/docs/lighthouse/performance/performance-scoring), [LHCI configuration](https://github.com/GoogleChrome/lighthouse-ci/blob/main/docs/configuration.md), [rollup-plugin-visualizer](https://github.com/btd/rollup-plugin-visualizer)
- **Att lära av:** [vercel-labs/agent-skills](https://github.com/vercel-labs/agent-skills), [bulletproof-react](https://github.com/alan2207/bulletproof-react), [area44/astro-shadcn-ui-template](https://github.com/area44/astro-shadcn-ui-template), [AstroFlow](https://github.com/sudeep2003/AstroFlow), Kent C. Dodds ([Write tests](https://kentcdodds.com/blog/write-tests), [Colocation](https://kentcdodds.com/blog/colocation), [AHA](https://kentcdodds.com/blog/aha-programming), [Common mistakes](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)), Josh W. Comeau ([Perils of Rehydration](https://www.joshwcomeau.com/react/the-perils-of-rehydration/), [prefers-reduced-motion](https://www.joshwcomeau.com/react/prefers-reduced-motion/))
