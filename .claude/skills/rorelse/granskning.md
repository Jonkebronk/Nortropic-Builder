# Granskning av rörelse

Delfil till `SKILL.md`. Hur granskningen går till, isoleringen och allvarsgraderna står i guiden och i granskarskillen (→ `guide/3-2-granskning-och-kalibrering.md`; `.claude/skills/granskare/SKILL.md`). Här står vad rörelsen bedöms mot. Grunden är Emil Kowalskis `review-animations`, `improve-animations` och `find-animation-opportunities` (MIT), destillerade och anpassade till budgeten.

## Grinden: ska det röra sig?

Varje rörelse, och varje förslag på ny rörelse, prövas mot fyra frågor i ordning. Svaren skrivs i fyndet. 📄 Kowalski, `find-animation-opportunities`, *The Gate*.

1. **Frekvens.** Hur ofta ser besökaren den? På en företagssajt ses menyn, knapparna och sidhuvudet många gånger per besök: kort och svag rörelse eller ingen. En tackruta ses en gång: där får rörelsen vara lite mer.
2. **Syfte.** Återkoppling, tillståndsbyte, rumslig koppling, att mildra ett ryck eller förklaring. Glädje bara vid sällsynta tillfällen och bara i måttlig eller expressiv budget. Utan namngivet syfte: ta bort.
3. **Tempo.** Ryms den i längderna i [matt.md](matt.md)? En rörelse som bara fungerar långsam och iögonfallande klarar inte grinden.
4. **Funktion.** Hjälper den eller stör den? Det besökaren läser eller ska använda, som pris, öppettider och telefonnummer, rör sig aldrig för stilens skull.
5. **Budget** (vårt tillägg). Ryms den i briefens budget (→ [SKILL.md](SKILL.md), *Budgetarna i praktiken*)?

## Vad som bedöms

Efter Kowalskis tio standarder (📄 `review-animations`), anpassade:

| # | Standard | Fynd när |
|---|---|---|
| 1 | Motiverad | Syftet kan inte namnges |
| 2 | Rätt för frekvensen | Ofta använda delar har lång eller iögonfallande rörelse |
| 3 | Rätt kurva | Entré utan ease-out, studs i sparsam, eller kurvor skrivna direkt i komponenten |
| 4 | Rätt längd | Gränssnittsdelar över 300 ms utan skäl, återkoppling över 160 ms |
| 5 | Rätt ursprung | Popup som växer från mitten i stället för från sin knapp, eller entré från `scale(0)` |
| 6 | Avbrytbar | `@keyframes` på något som kan utlösas igen |
| 7 | Billiga egenskaper | Layoutegenskaper, `transition: all`, skugga eller oskärpa som animeras ofta |
| 8 | Tillgänglig | Förflyttning med `reduce`, hover-rörelse utan `(hover: hover)`, eller `reduce` som också tar bort färgbytet |
| 9 | Asymmetrisk | Utgången är lika lång som entrén |
| 10 | Sammanhållen | Rörelsen passar inte kitets personlighet, eller två delar rör sig på olika sätt utan skäl |

Till det kommer guidens kriterier: passar rörelsen målgruppen och budgeten (C60), tjänar den innehållet (C62), och den granskas på video (C61) (→ `guide/bilaga-c-kontroller.md`).

## Åtgärden – billigast först

📄 Kowalski, `review-animations`, *Remedial Preference Hierarchy*. Samma ordning står i granskarskillen.

1. Ta bort rörelsen.
2. Minska den: kortare längd, mindre förflyttning, färre egenskaper.
3. Byt kurva.
4. Rätta ursprunget, till exempel `transform-origin` vid utlösaren eller 0,95 i stället för 0.
5. Gör den avbrytbar: `transition` i stället för `@keyframes`.
6. Flytta den till billiga egenskaper.
7. Gör utgången kortare än entrén.
8. Putsa: tona bakgrunden med panelen, förskjut en grupp och använd `@starting-style`.
9. Lägg till reducerad rörelse och hover-spärr, och stäm av mot kitets personlighet.

## Fyndens form

- Varje fynd har sida, element, vad, varför med källa, åtgärd med fil och rad, vad det ger besökaren och allvar. Det är granskarens form (→ `guide/3-2-granskning-och-kalibrering.md`).
- Ett fynd mot en regel med en källa, som Kowalskis längder ensamma, får högst allvaret `medel` (→ `guide/bilaga-b-skills.md`, *granska*). Där NN/g, Material eller WCAG säger samma sak gäller det inte.
- **Avvisade kandidater:** två till fem rörelser som prövades och valdes bort, med frågan i grinden som stoppade dem. Den listan visar att granskningen inte är en önskelista. 📄 Kowalski, `find-animation-opportunities`, *Part 2*.
- **Det som beror på känsla** – en korstoning, en fjäders studs eller hur tät en grupp är – avgörs inte ur koden. Skriv hur det ska provas: spela upp i 2–5 gångers långsammare takt i webbläsarens animationsverktyg, stega bildruta för bildruta, prova gester på en riktig telefon och titta igen nästa dag. 📄 Kowalski, `review-animations/STANDARDS.md`, *Debugging*.
- Det som inte syns på bilder eller video märks *för lite information* (→ C61).

## Mätning med Playwright

- Följ en övergång bildruta för bildruta med `requestAnimationFrame` i sidan och läs `getBoundingClientRect()` och `getComputedStyle()`. Samplingar från testskriptet med `setTimeout` missar korta övergångar.
- Prova hover och tryck med musen (`hover()`, `mouse.down()`) på datorn och `tap()` med `hasTouch` på mobilen. Stoppa navigeringen med en klicklyssnare som anropar `preventDefault()`, annars lämnar knappen Boka sidan.
- Sajtens innehållspolicy (CSP) stoppar `addStyleTag`. Ett förslag provas därför i en egen testkontext med `bypassCSP: true`, eller genom att HTML-svaret ändras med `route`. Sajten ändras aldrig för ett prov.
