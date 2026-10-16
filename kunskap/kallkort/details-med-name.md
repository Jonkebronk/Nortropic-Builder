# details med name

**Källa:** MDN <https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/details>; Baseline-data ur `web-features` 3.43.0 (W3C WebDX Community Group, `kallor/web-features/data.json`); GOV.UK Design System, Details <https://design-system.service.gov.uk/components/details/> och Accordion <https://design-system.service.gov.uk/components/accordion/>; Scott O'Hara <https://scottohara.me/blog/2018/09/03/details-and-summary.html> (uppdaterad 2021). Läst 2026-10-16 (MDN och GOV.UK via lager-3-4-anteckningarna och web-features direkt).

**Licens:** webbstandard (WHATWG HTML). MDN:s text är CC-BY-SA 2.5, kodexemplen CC0. Inga krav för att använda elementet.

**Vad det är:** HTML-elementet `<details>` med `<summary>` visar och döljer innehåll utan skript. Attributet `name` binder ihop flera `<details>` så att bara ett är öppet åt gången – ett dragspel utan JavaScript.

**Hur det fungerar:**
- Baseline (web-features): `<details>` "high" sedan 2020-01-15 (brett sedan 2022-07-15); `name` (exklusiva grupper) "low" sedan 2024-09-03; `::details-content` (stil och animation av innehållet) "low" sedan 2025-09-16; `interpolate-size` och `hidden="until-found"` är ännu inte Baseline.
- Innehållet i ett stängt `<details>` går att hitta med webbläsarens sökfunktion i Chromium (det öppnas) ⚠️ beteendet i Safari och Firefox är inte verifierat här.
- GOV.UK: använd Details för information som bara några behöver, aldrig för det de flesta behöver; använd Accordion bara när det finns belägg, inte för innehåll alla behöver, och inte dragspel i dragspel.
- O'Hara: rubriker inuti `<summary>` annonserades inte av JAWS och TalkBack i hans prov ⚠️ (data från 2018–2021).

**Kvalitet och underhåll:** standard i alla stora webbläsare; `name` i Chrome 120, Firefox 130 och Safari 17.2 (lager-3-4-anteckningarna, web.dev september 2024).

**Det bästa vi kan ta:** vanliga frågor och utfällbar fördjupning med `<details name>`, en grupp per sektion (unikt `name` per grupp), och CSS-animation med `::details-content` bakom `prefers-reduced-motion`.

**Var det hamnar hos oss:** `skill: skelett`, delfilen `interaktion.md`. Regeln finns redan i `guide/2-4-skelett.md` (primitiverna); skillen hänvisar dit och lägger till kantfallen.

**Passar vår stack?** Ja, 0 kB JavaScript. Med den öppnade stacken finns Radix-dragspel som alternativ, men de döljer innehållet utan JavaScript och kostar React-körtiden; `<details name>` är bättre på varje punkt utom animationen i äldre webbläsare.

**Risker och flaggor:** samma `name` på två grupper på samma sida kopplar ihop dem (övningssajten använder `name="fragor"` fast i komponenten); exklusiv grupp gör att man inte kan jämföra två svar; rubrik i `<summary>` kan försvinna för vissa skärmläsare.

**Inloggning:** krävs inte.
