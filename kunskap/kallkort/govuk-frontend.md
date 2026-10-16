# GOV.UK Frontend

**Källa:** <https://github.com/alphagov/govuk-frontend>, release v6.6.0 (2026-10-15); README (licens, webbläsarstöd) och komponenten Service navigation (`packages/govuk-frontend/src/govuk/components/service-navigation/template.njk`) via GitHub-API, läst 2026-10-16. GOV.UK Design System: Navigate a service, Details, Accordion, Validation och Service Manual om progressive enhancement (via lager-3-4-anteckningarna, fråga 2).

**Licens:** koden MIT; dokumentationen © Crown copyright under Open Government Licence 3.0. Kronan, typsnittet GDS Transport och varumärket får inte användas utanför statens tjänster (inventeringens flagga: bara beteenden och texter).

**Vad det är:** det brittiska regeringskansliets komponentbibliotek i HTML, Sass och lite JavaScript, och designsystemet med mönster som bygger på användartester. Det är den mest genomprövade källan för formulär, navigation och HTML först.

**Hur det fungerar:**
- Webbläsare delas i grader; bara grad A–C kör JavaScript-förbättringarna. Grad X (äldre) får HTML och CSS.
- Service navigation: menyknappen har `hidden` och `aria-controls` från början. Utan JavaScript syns alltså alla länkar och ingen knapp; skriptet visar knappen och fäller ihop menyn på smala skärmar. Navigationen är ett `<nav aria-label>`.
- Mönster (sett i anteckningarna): navigationen är ingen sidkarta och behöver inte lista allt; brödsmulor före `<main>`; Details bara för det som några behöver; dragspel bara med belägg; validering på servern med felsammanfattning överst, fokus dit och "Fel: " i sidtiteln, `novalidate` och inget `required`.

**Kvalitet och underhåll:** 1 474 stjärnor, push 2026-10-16, 447 öppna ärenden, 109 bidragsgivare (GitHub-API 2026-10-16). Många ärenden eftersom det är ett aktivt statligt projekt; releaser varje månad.

**Det bästa vi kan ta:**
- Menyn som är synlig utan JavaScript och fälls ihop av skriptet – ett alternativ till vår popover för sajter med få sidor.
- Formulärens felhantering och texter (redan i `guide/2-8`).
- Mönstret för kontaktsida (Contact a department) och Details/Accordion-reglerna.

**Var det hamnar hos oss:** `skill: skelett`, delfilen `interaktion.md` (meny utan JavaScript, utfällbart, formulärets beteende hänvisas till `2-8`).

**Passar vår stack?** Beteendena ja; koden behövs inte. 0 kB om vi bara tar mönstren.

**Risker och flaggor:** varumärket och typsnittet får inte följa med; mönstren är gjorda för statliga tjänster med formulär, inte för marknadsföring.

**Inloggning:** krävs inte.
