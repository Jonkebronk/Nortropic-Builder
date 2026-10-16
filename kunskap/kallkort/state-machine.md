# state-machine

**Källa:** https://github.com/jakubkrehel/skills, sökvägen `skills/state-machine/`.
- Läst 2026-10-16 vid commit `4c66b1f` (2026-10-12).
- Skillen kom till i PR #42 (2026-10-05) och fick en grupperad väljare i PR #43 (`8337ed0`, 2026-10-11). Mappen har 8 commits.
- Lästa filer: `SKILL.md` (90 rader), `switcher.md` (205) och `agents/openai.yaml`.

**Licens:** MIT, © 2026 Jakub Krehel.

**Vad det är:**
- En arbetsmetod (user-invoked) som visar varje tillstånd en komponent kan hamna i, på en sida som slängs efteråt.
- Sidan har testdata och en väljare.
- Det är en arbetsbänk, ingen granskning.

**Hur det fungerar:**
- **En komponent per körning.** Formulera i en mening vad den visar, var den renderas och varifrån datan kommer.
- **Tillstånden hittas i koden.**
  - Data: laddar, tom, fel, en post, typisk mängd, lång lista, delvis väntande.
  - Konto: plan och roll.
  - Flaggor och gränser.
  - "A state the code cannot reach is not a state". Lägg aldrig till en gren bara för att kunna visa ett tillstånd.
- **Sidan.** En kladdroute med den riktiga komponenten, oförändrad, och appens egen layout, typsnitt och tokens. Allt ligger i en mapp så att det går att radera i ett steg.
- **Data vid gränsen.** Datan matas in i första hand som props, annars via appens egen datasöm. Komponenten ändras aldrig utan att man frågar. Testdatan ser ut som produktens. Laddningstillstånd står stilla.
- **Väljaren.** Samma specifikation som i variant, med `?__state=`.
- **Bekräfta.** Ladda varje tillstånd. Tom yta eller riktig data i stället för testdata betyder trasig koppling.
- Kontrollera alla tillstånd igen efter varje visuell ändring. Radera bara när användaren säger till.

**Kvalitet och underhåll:**
- Ny skill. Repot har 7 968★ och 2 bidragsgivare och är aktivt.
- Inga ärenden rör state-machine. Issue #29 och #37 gällde `break`, men samma text om kladdroute finns i båda skillsen.

**Det bästa vi kan ta:**
- Idén att lista **tillstånd som koden kan nå**, renderade med realistisk data.
- Regeln "Re-check every state after each change".
- Kravet att testdata ska se ut som produktens.

**Var det hamnar hos oss:** `kontroll`. Ett tillståndsregister per komponent i biblioteket, renderat med skärmbilder i Playwright. Exempel på tillstånd för en statisk småföretagssajt (härlett):
- kontaktformulär: tomt, fältfel, felsammanfattning, skickat, serverfel
- mobilmeny: stängd, öppen, JavaScript av
- FAQ: stängd, öppen
- öppettider: öppet, stängt, helgdag
- bild saknas, lång text, 320 px

Förslag på delfil: `skelett/kontroll.md`. Beslutet `kontroll` står kvar efter stackbeslutet. Väljaren går nu att använda i biblioteket, men det Johnny dömer är skärmbilderna av varje tillstånd.

**Passar vår stack?** Reviderat efter BESLUT 2026-10-16, *React, Tailwind och JavaScript tillåts*.
- Ja, och nu mer direkt.
  - React-öar i biblioteket tar data som props, och det är skillens förstahandsval för att mata in tillstånd.
  - Väljaren och kladdsidan går att använda som de är på en förhandsvisningssida i `bibliotek/`.
  - Next-delarna (`"use client"`) motsvaras i Astro av `client:`-direktiv.
- Kostnad på kundsajten: 0 kB. Harnessen skeppas inte.
- **"JavaScript av" blir viktigare.** Med `client:visible` ska öns HTML från bygget vara begriplig innan JavaScript laddats (*HTML först*). Skillen nämner inte det tillståndet, och vi lägger till det.
- Krock att ta upp med Johnny: en ö som inte renderar något meningsfullt utan JavaScript (till exempel `client:only`) bryter mot *HTML först*.

**Risker och flaggor:**
- Kladdsidor kan bli kvar. Skillen kräver sökning efter route- och fixturnamn efter radering, och det ska vi också göra.
- Ingen telemetri.

**Inloggning:** behövs inte.

**Slutligt förslag (skelett-struktur-beslut.json, 2026-10-16):** `kontroll`; tillståndstabellen per komponent står i `.claude/skills/skelett/interaktion.md`, *Tillstånd per komponent*.
