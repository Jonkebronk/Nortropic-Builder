# Terrazzo

**Källa:** https://github.com/terrazzoapp/terrazzo, commit ea15d7e (2026-10-14). npm: `@terrazzo/cli`, `@terrazzo/parser`, `@terrazzo/plugin-css` och `@terrazzo/plugin-tailwind`, alla 2.9.0 (2026-10-14) (https://www.npmjs.com/package/@terrazzo/cli). Dokumentation: https://terrazzo.app/docs/, https://terrazzo.app/docs/integrations/css/, https://terrazzo.app/docs/integrations/tailwind/, https://terrazzo.app/docs/linting/. Källkod läst: `packages/plugin-css/src/lib.ts` (alternativen) och `packages/plugin-css/CHANGELOG.md`. Läst 2026-10-16.

**Licens:** MIT (GitHub och npm). Kräver att licenstexten följer med om koden distribueras; vi kör den bara vid byggtid.

**Vad det är:** Ett CLI som läser DTCG-tokens och skriver kod via insticksprogram (CSS, Sass, JS/TS, Swift, Tailwind med flera). Det hette tidigare Cobalt UI och är samma projekt och samma personer. Det har också en inbyggd linter för tokens.

**Hur det fungerar:**
- Kommandon: `tz init`, `tz build` ("Build tokens with your plugins and also run linting"), `tz lint` (bara lint), `tz check [fil]` (validerar mot DTCG) och `tz bundle` (slår ihop en resolver med flera filer) (https://terrazzo.app/docs/).
- `plugin-css` skriver vanliga CSS-variabler. Alternativet `permutations` är en lista med `input` (resolverns val, till exempel `{ kit: "lugn" }`) och `prepare(contents)`, en funktion som lindar variablerna i valfri selektor. Docs: plugin-css "can map resolver contexts into CSS media queries, classnames, or any CSS selector", och "Terrazzo will then combine all the permutations in declaration order, into one `.css` file". Exemplen använder `[data-theme="light"]` och `@media (prefers-color-scheme: dark)`.
- Andra alternativ i `lib.ts`: `variableName` (eget variabelnamn), `transform` (skriv över värdet per token), `include`/`exclude`, `legacyHex`, `utility`, `propertyDefinitions` (`@property`) och `skipBuild`. `baseSelector` och `modeSelectors` är markerade `@deprecated` till förmån för `permutations`.
- `plugin-tailwind` kräver `plugin-css` och en mallfil (`template: "tailwind.template.css"`) där `@tz (theme: "light");` injicerar värden i ett `@theme`-block. Varje permutation i mallen måste också finnas i plugin-css, annars "plugin-tailwind will throw an error". Utdata är `tokens/tailwind-theme.css` med literala värden.
- Lintern har 27 regler. `a11y/min-contrast` ("Enforce colors meet minimum contrast checks for WCAG 2") testar deklarerade par: `level` (`AA` eller `AAA`), `pairs` med `foreground`, `background` och valfri `largeText`. `a11y/min-font-size` har `minSizePx`/`minSizeRem`. Regler slås på i `lint.rules` med `"error"`, `"warn"` eller `"off"`.

**Kvalitet och underhåll:** 476 stjärnor, 55 bidragsgivare, 62 öppna ärenden och PR:er, senaste commit och release 2026-10-14. Releaser kommer tätt (2.0 RC 2026-03-08, nu 2.9.0). Kända problem och luckor:
- #692 "TailwindCSS Reference Variables Option" (öppen, 2026-03-16): plugin-tailwind kan inte skriva `var(--…)`-referenser, bara värden.
- 2.9.0 rättade att sammansatta värden kunde skriva en variabel som läser sig själv (`--heading-font-size: var(--heading-font-size)`) (CHANGELOG, #858).
- Dokumentationen släpar: startsidan säger fortfarande "support for resolvers and other 2025.10 features coming in 2.0!" fast 2.x är släppt, och README:n för plugin-tailwind visar en äldre `tailwind.js`-konfiguration i v3-stil medan docs visar mallen med `@tz`.
- Lint-dokumentationen beskriver `background` som "Token ID of the foreground" (skrivfel).

**Det bästa vi kan ta:**
- `permutations` med `prepare: (c) => \`[data-kit="lugn"] {\n${c}\n}\`` och `input: { kit: "lugn" }` – ger exakt dagens kitväljare i vanlig CSS. Det besvarar den öppna frågan "Terrazzo och `[data-kit]`" i guiden 2-5 och bilaga E: ja, enligt dokumentationen och källkoden. ⚠️ Inte provkört.
- `variableName` så att utdata heter `--k-*` som i dagens kit.
- `transform` för att bygga `clamp()` ur min/max-tokens (DTCG saknar flytande mått).
- `a11y/min-contrast` på alla rollpar (text/bakgrund, accent/text på accent, fokus/yta) som spärr i `tz build`.

**Var det hamnar hos oss:** Ytskillen `tokens.md` (hur kiten byggs och lintas) och kontroll (kontrastspärren i token-bygget, guiden 2-5 "Kontrasten spärras också i token-bygget"). Bibliotek vid byggtid i `bibliotek/`, med låst version. Ingenting skeppas utom den genererade CSS:en.

**Passar vår stack?** Ja, och bättre efter `BESLUT.md` 2026-10-16 (kl. 12.28, Tailwind tillåtet). 0 byte JavaScript per sida. Två utdata ur samma källa:
1. `plugin-css` → `[data-kit="…"] { --k-…: … }` (vanlig CSS, som i dag).
2. Tailwind 4: eftersom plugin-tailwind bara ger värden (#692) är det enklast att skriva shadcn-mönstret för hand en gång – `@theme inline { --color-primary: var(--k-accent); … }` – så att utilities följer kitväljaren. plugin-tailwind behövs då bara om vi vill ha Tailwinds egna skalor genererade.
Översättning: kiten skrivs om till DTCG-JSON, och `clamp()` kräver en egen transform. CLI:t drar in Vite och vite-node som byggberoenden.

**Risker och flaggor:**
- Litet community (476 stjärnor) och tät release-takt: lås versionen och läs CHANGELOG vid uppgradering.
- Ingen telemetri syns i beroendelistan (npm-metadata för `@terrazzo/cli` 2.9.0); källan granskades inte för nätverksanrop ⚠️.
- Ingen betalvägg eller inloggning. "Token Lab" är aviserat men inte släppt.
- Kontrastregeln är WCAG 2 – samma norm som guiden. APCA nämns inte.
