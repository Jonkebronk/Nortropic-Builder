# emil-pick-ui-library

**Källa:** https://github.com/emilkowalski/skills, sökvägen `skills/pick-ui-library/`.
- Läst 2026-10-16 vid commit `2d22863` (2026-10-11).
- Skillen har 4 commits, den senaste är `85e8e23` (2026-09-15).
- Lästa filer: `SKILL.md` (85 rader) och repots `README.md`.

**Licens:** MIT, © 2026 Emil Kowalski.

**Vad det är:**
- En uppslagsskill (user-invoked, `disable-model-invocation: true`) som väljer bibliotek för en frontenduppgift ur Emils kuraterade lista.
- README: "libraries I use and trust, instead of letting AI hand-roll a toast component".

**Hur det fungerar:**
- **Arbetsgång.** Identifiera uppgiften, inte biblioteket. Läs `package.json` först. Rekommendera ett bibliotek med en mening. Säg tydligt när uppgiften ligger utanför listan.
- **Listan:**
  - Primitiver: base-ui
  - Kommandomeny: cmdk
  - Toasts: Sonner (Emils eget)
  - OTP: input-otp
  - Kontrollpaneler: Leva / dialkit
  - Animation: motion
  - Siffror: NumberFlow
  - Animerad text: torph
  - Glob: Cobe
  - OG-bilder: Satori
  - Syntaxfärgning: shiki
  - Diagram: recharts / Liveline
  - Dra och släpp: dnd kit
  - Virtualisering: Virtuoso
  - State: zustand
  - Klasser: clsx / cva
  - Tema: next-themes
- **Vanliga felval:** handbyggda toasts, div-dialoger, nummer som renderas om, långa listor utan virtualisering och djupa ternärer i className.

**Kvalitet och underhåll:**
- 46 586★, 3 bidragsgivare. Skillen ändras sällan.
- Inga ärenden rör pick-ui-library. Issue #29 gäller att andra skills lämnar över till skills som inte kan anropas av modellen, vilket indirekt gäller även denna.

**Det bästa vi kan ta** (reviderat efter stackbeslutet):
- Principen "kontrollera vad som redan finns, rekommendera ett, säg när du lämnar listan".
- Valen som nu blir aktuella för biblioteket:
  - **motion**: rörelse i öar (Johnnys beslut nämner Motion uttryckligen).
  - **base-ui**: tillgängliga dialoger, popovers och menyer i en React-ö när native `<dialog>` eller popover inte räcker.
  - **clsx och cva**: typade sektionsvarianter (storlek, ton) om biblioteket skrivs med Tailwind.
  - **Sonner**: kvittens efter formulär, om en toast väljs i stället för ett meddelande på sidan.
  - **NumberFlow**: siffror som räknas upp.
  - **Satori och shiki**: vid byggtid, 0 kB i webbläsaren.
- Inte aktuellt för statiska småföretagssajter: zustand, Virtuoso, dnd kit, cmdk, Leva, Cobe och Liveline. next-themes är Next-specifik.

**Var det hamnar hos oss:** ändrat från `släpp` till **`bibliotek`**.
- Listan blir underlag för bibliotekets beroendeval, med två regler ovanpå:
  1. Native HTML först (`<details name>`, popover, `<dialog>`), enligt primitivmatrisen i `lager-3-4-struktur-skelett.md`, avsnitt 2.
  2. Varje beroende redovisar sin kostnad i kB.
- Skillen installeras inte. Den är user-invoked och smakbaserad utan källor.

**Passar vår stack?** Reviderat efter BESLUT 2026-10-16, *React, Tailwind och JavaScript tillåts*.
- Ja för React-öar. Varje val har en kostnad i JavaScript per sida:
  - React-körtiden: cirka 56 kB gzip för den första ön (⚠️ en mätning, bejamas/ui-benchmark).
  - Motion: 43 kB med `motion`, eller drygt 5 + 24 kB med `m`/`LazyMotion`/`domAnimation` ([motion.dev](https://motion.dev/docs/react-reduce-bundle-size)).
  - ⚠️ Storleken för base-ui, Sonner och NumberFlow är inte mätt.
- clsx och cva kostar nästan inget och används vid rendering. Utan `client:` blir det 0 kB.
- **Krockar att ta upp med Johnny:**
  - NumberFlow och uppräknande siffror kan visa fel eller tom siffra innan JavaScript körts, vilket krockar med "ingen text som börjar osynlig" och *HTML först*.
  - Toasts kräver JavaScript, medan ett formulärsvar på sidan fungerar utan.

**Risker och flaggor:**
- Smakbaserad lista utan källor ("deliberate, taste-driven picks").
- Sonner är upphovspersonens eget bibliotek. Det är ingen fara i sig, men det är ett jäv att känna till.
- Ingen telemetri.

**Inloggning:** behövs inte.
