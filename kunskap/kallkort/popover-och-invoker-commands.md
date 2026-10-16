# Popover API och dialog med Invoker Commands

**Källa:** MDN, Using the Popover API <https://developer.mozilla.org/en-US/docs/Web/API/Popover_API/Using>; MDN Invoker Commands <https://developer.mozilla.org/en-US/docs/Web/API/Invoker_Commands_API>; MDN `<dialog>` <https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/dialog>; Baseline ur `web-features` 3.43.0 (`kallor/web-features/data.json`); W3C APG Disclosure Navigation <https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/examples/disclosure-navigation/>. Läst 2026-10-16.

**Licens:** webbstandarder (WHATWG HTML). MDN-text CC-BY-SA 2.5, kodexempel CC0.

**Vad det är:** HTML-attribut som öppnar och stänger paneler och dialoger utan skript. `popover` + `popovertarget` ger en icke-modal panel i det översta lagret; `command` + `commandfor` (Invoker Commands) styr bland annat `<dialog>` (`show-modal`, `close`) och popovers deklarativt.

**Hur det fungerar:**
- Baseline: Popover "low" sedan 2025-01-27; Invoker Commands "low" sedan 2025-12-12; `<dialog>` "high" sedan 2022-03-14; `<dialog closedby>`, `popover="hint"` och anchor positioning ännu inte Baseline (web-features 3.43.0).
- `popover="auto"` (standard): ljus stängning genom klick utanför och Esc, bara en auto-popover öppen åt gången utom när de är nästlade. `manual`: ingen ljus stängning.
- Fokus: när panelen visas blir den nästa i tabbordningen efter knappen (fokus flyttas inte in); stängs den med tangentbordet (Esc) går fokus tillbaka till knappen. Med `popovertarget` sätts implicit `aria-expanded` och `aria-details` (MDN). Sett i övningssajten: Chromium exponerar `expanded=false` på menyknappen.
- Popovers är alltid icke-modala; sidan bakom går att nå med Tab. En modal kräver `<dialog>` med `showModal()` eller `command="show-modal"`.
- Animation: `@starting-style`, och `display` och `overlay` i transition med `allow-discrete`.
- APG: webbplatsnavigering ska byggas som disclosure, inte med rollen `menu`.

**Kvalitet och underhåll:** standarder; Popover är Baseline i alla stora webbläsare, Invoker Commands sedan december 2025 (nyare webbläsare krävs).

**Det bästa vi kan ta:** mobilmenyn som popover (vi har den), ljuslåda och bildförstoring med `<dialog>` + `command="show-modal"` ovanpå en vanlig länk till bilden, och stängknappar med `command="close"`.

**Var det hamnar hos oss:** `skill: skelett`, delfilen `interaktion.md`; regeln och primitivtabellen står redan i `guide/2-4-skelett.md`.

**Passar vår stack?** Ja, 0 kB JavaScript. Med den öppnade stacken är Radix Dialog eller Sheet ett alternativ, men de kostar React-körtiden och fungerar inte utan JavaScript.

**Risker och flaggor:**
- Bara ovanpå en länkbaserad grund (inventeringens flagga): äldre webbläsare utan Popover visar en knapp som inget gör; övningssajten döljer därför menyknappen med `@supports not selector(:popover-open)` och låter sidfoten bära sidorna.
- Invoker Commands är bara "low" sedan december 2025; en polyfill (keithamus/invokers-polyfill, MIT) hjälper bara med JavaScript.
- En helskärmspanel med `::backdrop` ser modal ut men är det inte; Tab kan gå ut ur den. Övningssajten stänger panelen när fokus lämnar den.

**Inloggning:** krävs inte.
