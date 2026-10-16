# React i Astro

Delfil till `SKILL.md` (utkast 2026-10-16, förslag tills Johnny sagt ja). När en React-komponent får användas, vad en ö får kosta och vad den aldrig får göra. Underlaget, mätningarna och källorna står i `kunskap/research/2026-10-16_react-och-javascript-i-astro.md` (nedan *researchen*). Vad som syns och rör sig hör till `yta` och `rorelse`; huvuden och CSP-bedömningen till `kvalitet`.

## Redan beslutat (→ guiden)

- React, Tailwind, Motion och annat JavaScript är tillåtna som öar i Astro; krockar tas upp med Johnny och stoppar inte (`BESLUT.md` 2026-10-16, *React, Tailwind och JavaScript tillåts*).
- HTML först: innehåll och navigation fungerar utan JavaScript, också i öar (→ `guide/2-4-skelett.md`, N1).
- Ingen text börjar på `opacity: 0`, och första skärmens text animeras aldrig in (→ `guide/2-6-rorelse.md`, N1).
- Lighthouse 100 är målet (→ `guide/2-8-teknik-och-kvalitet.md`, kontroll 9).
- CSP med hashar ur Astros `security.csp`, utan `<ClientRouter />` (→ `guide/2-8-teknik-och-kvalitet.md`, N2).

## Vad som ska uppnås

1. **Astro först.** Innehåll, rubriker, bilder, länkar, navigation och formulärens HTML skrivs i `.astro`. 📄 [Astro, Islands](https://docs.astro.build/en/concepts/islands/)
2. **Plattformen före React.** `<details name>`, `popover`, `<dialog>` och små `<script>` i Astro används när de räcker. → `interaktion.md`; `guide/2-4-skelett.md`, primitiverna
3. **React utan direktiv är fritt.** En `.tsx` utan hooks och händelser blir HTML vid bygget och kostar 0 kB. 📄 [Astro, directives](https://docs.astro.build/en/reference/directives-reference/#client-directives); 🔧 mätt (researchen §10)
4. **En ö bara för verkligt tillstånd:** bokningskalender, prisräknare, filter, flerstegsformulär som förbättring, eller ett licensierat block som Johnny har godkänt på provsidan.
5. **Ön sätts av en Astro-sektion** som ger den innehållet som serialiserbara props. Ingen text och inga kunduppgifter i `.tsx`. 📄 [Astro, framework components](https://docs.astro.build/en/guides/framework-components/); → `guide/2-4-skelett.md`, *Hur sektionerna byggs*
6. **Direktiv efter läge:** `client:visible` under första skärmen, `client:idle` med `timeout` för det som behövs snart, `client:media` för det som bara finns vid en bredd. `client:load` bara när ön syns direkt och måste svara direkt; det motiveras och mäts. 📄 Astro, directives
7. **JavaScript-budget, komprimerat:** högst 75 kB före första interaktion och 100 kB för hela sidan, öar som laddas vid scroll inräknade. React-körtiden är 60 kB brotli (69 kB gzip); Motion med `m` och `LazyMotion` lägger till 27 kB. 📄 Russell, [Performance Inequality Gap 2024](https://infrequently.org/2024/01/performance-inequality-gap-2024/); 🔧 mätt (researchen §10)
8. **TBT under 90 ms på mobilen** i Lighthouse, villkoret för 100 när allt annat är perfekt. 🔧 härlett ur Lighthouse 13.5.0 (researchen §10)
9. **Ön är ren och hydrerar utan fel:** samma props ger samma HTML vid bygget och i webbläsaren. Tid, datum och slump räknas vid bygget och skickas som props; webbläsarens värden läses med `useSyncExternalStore` eller `use(browser())`. 📄 [Rules of React](https://react.dev/reference/rules), [hydrateRoot](https://react.dev/reference/react-dom/client/hydrateRoot)
10. **Ingen effekt för det som kan räknas fram;** varje effekt har städning. 📄 [You Might Not Need an Effect](https://react.dev/learn/you-might-not-need-an-effect)
11. **Etiketter och ARIA-id från `useId`;** knapp är `<button>`, länk är `<a href>`; fokus tillbaka efter dialog; kitets fokusring. 📄 [useId](https://react.dev/reference/react/useId); → `guide/2-8-teknik-och-kvalitet.md`, *Kodstandard*
12. **Bas för öar: Base UI;** React Aria för datum och tid med `sv-SE`. 📄 [shadcn, Base UI default](https://ui.shadcn.com/docs/changelog/2026-07-base-ui-default), [React Aria](https://react-aria.adobe.com/quality); researchen §5
13. **Motion bara i en ö som ändå behövs:** `m` med `LazyMotion` och `domAnimation`, `MotionConfig reducedMotion="user"` i varje ö, och bara interaktion efter hydrering (`whileHover`, `whileTap`). 📄 [Motion, bundle size](https://motion.dev/docs/react-reduce-bundle-size), [MotionConfig](https://motion.dev/docs/react-motion-config)
14. **Tokens ur kitet:** Tailwind-klasser pekar på `--k-*` via `@theme inline`; hårdkodade färger och mått byts mot kitets steg. 📄 [Tailwind, theme](https://tailwindcss.com/docs/theme); → `yta`
15. **Ön är provad** med JavaScript av och på mot `astro preview`, med axe i varje tillstånd och med tangentbord, och har ett test med Testing Library bredvid sig. 📄 [Testing Library](https://testing-library.com/docs/queries/about/), [Astro testing](https://docs.astro.build/en/guides/testing/)

## Förbud

- **Ingen `client:only` för innehåll, navigation, länkar eller strukturerad data.** Den ger ingen HTML. 📄 Astro, directives
- **Ingen `server:defer`** på statiska sajter; server islands kräver adapter. 📄 [Astro](https://docs.astro.build/en/reference/errors/no-adapter-installed-server-islands/)
- **Inga `style`-attribut från en ö i serverns HTML:** ingen `style={{…}}`, ingen Motion `initial` eller `animate` på element som renderas på servern. De spärras av Astros CSP och ger konsolfel (kontroll 2); utan CSP döljer `initial={{ opacity: 0 }}` texten tills JavaScript körts. 🔧 prövat i Chromium (researchen §4); 📄 [MDN, style-src-attr](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Content-Security-Policy/style-src-attr). Undantag (`style-src-attr 'unsafe-inline'`) bara efter Johnnys beslut per sajt.
- **Ingen intoning av text i React.** Text som tonas in görs i CSS ur kitets rörelser. → `guide/2-6-rorelse.md`
- **Inget Radix Accordion, Collapsible eller NavigationMenu för innehåll som ska synas utan JavaScript.** Stängt innehåll och portaler finns inte i HTML:en. 📄 [radix-ui/primitives](https://github.com/radix-ui/primitives), `presence.tsx` och `portal.tsx`
- **Inga inline-skript från öar** (`dangerouslySetInnerHTML` med skript) och ingen `AnimatePresence mode="popLayout"`. Inline-skript går bara via `inlineskript.mjs`. 📄 [Astro #16678](https://github.com/withastro/astro/issues/16678)
- **Ingen React-`action` med klientfunktion** för något som måste fungera utan JavaScript; formuläret har ett riktigt `action`. 📄 [React, form](https://react.dev/reference/react-dom/components/form)
- **Ingen `motion`-komponent** (43 kB) och ingen `domMax` utan skäl. 📄 Motion, bundle size
- **Ingen `npx shadcn add`** mot tredje part i biblioteket; registerposten läses som data. Ingen kod med licensen "unknown". 📄 [shadcn, namespaces](https://ui.shadcn.com/docs/registry/namespace); källkortet `kunskap/kallkort/21st.md`. shadcn-MCP:n startas i `~/.claude-bygg/shadcn/`, med registren `@tailark-oss` och `@magicui` i en components.json utanför repot, och används för att läsa (`BESLUT.md` 2026-10-16, *Domarna över MCP-servrarna …*, 21.37). `@tailark` kräver Pro, men `@tailark-oss` är öppet (`kunskap/kallkort/shadcn-cli-tailark-magicui.md`).
- **Inga barrel-importer** av ikon- och komponentbibliotek i en ö. 📄 vercel-labs/agent-skills, `bundle-barrel-imports`
- **Ingen `useMemo`, `useCallback` eller `memo` utan uppmätt behov,** och React Compiler slås inte på förrän en sajt visar behov. 📄 [React Compiler 1.0](https://react.dev/blog/2025/10/07/react-compiler-1)

## Var filerna ligger

`bibliotek/src/react/oar/` (en fil per ö, test bredvid), `react/ui/` (inkopierade primitiver utan innehåll), `react/lib/` (`cn`, delat tillstånd). Källa, författare, licens och commit står först i filen och i `bibliotek/licenser.md`. Förslag 🔧; researchen §11.

## Kontroll vid granskning

- Varje ö har en rad: komponent, källa och licens, direktiv, JavaScript före första interaktion och totalt, Lighthouse före och efter (→ `SKILL.md`, *Ut*).
- `dist/` har inga `style=` från öar, och konsolen är tom med och utan JavaScript.
- Sidan med JavaScript av visar allt innehåll, och menyn och kontaktvägarna fungerar.
- `eslint .` och `astro check` ger 0 fel (uppsättningen i researchen §11).

Intaget av ett block från 21st eller shadcn följer listan i researchen §11, *Så tas en 21st- eller shadcn-komponent in och granskas*. Siffran för React-körtiden i `interaktion.md` (cirka 56 kB gzip, extern mätning) ersätts av mätningen här.
