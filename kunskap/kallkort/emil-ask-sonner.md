# emil-ask-sonner

**Källa:** https://github.com/emilkowalski/skills, sökvägen `skills/ask-sonner/`. Jag läste den 2026-10-16 vid commit `2d22863` (repot, 2026-10-11). Skillen ändrades senast i `85e8e23` (2026-09-15).

Lästa filer: `SKILL.md` (88 rader) och `API.md` (64 rader), båda i sin helhet, samt ärende #26. Jag jämförde påståendena med Sonner 2.0.8 från npm (senast publicerad 2026-08-09): `dist/index.d.ts` och `dist/index.mjs`, hämtade från unpkg till `kallor/sonner-npm/`.

**Licens:** MIT, © 2026 Emil Kowalski. Sonner själv har också MIT.

**Vad det är:** en guide till Sonner, upphovsmannens React-bibliotek för toastnotiser: installation, rätt `toast()`-anrop, uppdatering och stängning, en trappa för styling, teman och felsökning.

**Hur det fungerar:**
- **Uppsättning:** en `<Toaster />` monteras en gång nära roten, och `toast()` anropas bara från klientkod.
- **En tabell för val av anrop:** `toast`, `toast.success` med flera, `loading`, `promise`, `action` och `custom` (huvudlöst).
- **Stylingtrappan:** standard, inline, klasser med `!important` och sist huvudlöst med `toast.custom()`, som rekommenderas för ett eget designsystem.
- **Felsökningstabell,** bland annat *"Toasts render completely unstyled (common in Astro, view transitions)"*: importera `sonner/dist/styles.css` uttryckligen.
- `API.md` har proptabeller för `<Toaster />` och `toast()`.

**Kvalitet och underhåll:**
- Repot har 46 586 stjärnor och omkring 3 bidragsgivare.
- **Kända fel, kontrollerade av mig mot Sonner 2.0.8:**
  - `toast.getActiveToasts()` finns inte. Typfilen har `getHistory()` och `getToasts()`.
  - Standardvärdet för `offset` är `'24px'` (`VIEWPORT_OFFSET` i `index.mjs`), inte `'32px'` som skillen säger.
  - `hotkey` har typen `string[]`, inte `string`.

  Felen rapporterades i #26, som stängdes 2026-08-14, men filerna i `main` är inte rättade.
- Skillen har inga källhänvisningar utöver Sonners webbplats.

**Det bästa vi kan ta:** inget för sajterna. Om biblioteket någon gång får en React-ö med notiser finns två användbara iakttagelser: Sonners stilmall kan tappas i Astro (felsökningstabellen), och en egen toast bör byggas huvudlöst ovanpå biblioteket. Valet av bibliotek hör till posten `emil-pick-ui-library` i skelettlagret.

**Var det hamnar hos oss:** ingenstans (`släpp`).
- React är tillåtet som öar i Astro sedan BESLUT 2026-10-16 (*React, Tailwind och JavaScript tillåts*), men en småföretagarsajt har inga handlingar i appen som behöver notiser.
- Formulärets kvitto är en tacksida (`guide/2-8-teknik-och-kvalitet.md`, Formulär), som fungerar utan JavaScript.

**Passar vår stack?** Sonner kräver React och JavaScript i webbläsaren (`client:*`-ö i Astro). Det är tillåtet men kostar JavaScript på en sida som i dag har noll. Felsökningstabellen nämner just Astro som en plats där stilarna tappas.

**Risker och flaggor:**
- Felaktiga API-uppgifter, se ovan. En agent som följer skillen skriver kod som kastar `TypeError`.
- Ingen telemetri i skillen. Om den installeras via `npx skills add` gäller samma telemetri som för `emil-animate-expo`.
- Ingen betalvägg och ingen inloggning.
- Krockar: inga enligt inventeringen.
