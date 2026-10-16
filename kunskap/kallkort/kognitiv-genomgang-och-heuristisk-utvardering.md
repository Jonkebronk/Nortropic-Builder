# Kognitiv genomgång och heuristisk utvärdering

**Källa:** två inspektionsmetoder, inget repo. Lästa 2026-10-16:
- **Spencer 2000**, *The Streamlined Cognitive Walkthrough Method, Working Around Social Constraints Encountered in a Software Development Company*, CHI 2000, s. 353–359, [doi:10.1145/332040.332456](https://doi.org/10.1145/332040.332456). Hela artikeln läst som PDF ([Fluid Projects kopia](https://fluidproject.atlassian.net/wiki/download/attachments/11606775/p353-spencer.pdf?api=v2)).
- **Wharton, Rieman, Lewis och Polson 1994**, *The Cognitive Walkthrough Method: A Practitioner's Guide*, i Nielsen och Mack (red.), *Usability Inspection Methods* (Wiley). ⚠️ Kapitlet är inte läst; de fyra frågorna står ordagrant i Spencers tabell 1.
- **Nielsen**, [10 Usability Heuristics for User Interface Design](https://www.nngroup.com/articles/ten-usability-heuristics/) (1994-04-24, granskad 2024-01-30), och Moran och Gordon, [How to Conduct a Heuristic Evaluation](https://www.nngroup.com/articles/how-to-conduct-a-heuristic-evaluation/) (NN/g, 2023-06-25).
- [Wikipedia, *Cognitive walkthrough*](https://en.wikipedia.org/wiki/Cognitive_walkthrough), för metodens kritik. Rapport: `andra-varvet/flodet-jamforelse.md` (provet med Playwright, fynden F6, F15 och F16).

**Licens:** metoderna är fria att använda. Texterna är upphovsrättsskyddade: Spencers artikel får kopieras för personligt bruk och undervisning (ACM:s notis på s. 353), och NN/g vill ha *"credit Jakob Nielsen"* och adressen. Vi beskriver med egna ord och anger källan.

## Vad det är
- **Kognitiv genomgång:** en granskare går en uppgift steg för steg som en förstagångsanvändare och frågar vid varje steg om användaren kommer att lyckas. Metoden mäter hur lätt något är att lära sig, inte allt annat.
- **Heuristisk utvärdering:** granskare jämför gränssnittet med allmänna principer, oftast Nielsens tio. Nielsen kallar dem *"broad rules of thumb and not specific usability guidelines"*.
- Skillnaden: *"A cognitive walkthrough is task-specific, whereas heuristic evaluation takes a holistic view"* (Wikipedia).

## Hur det fungerar
- **Wharton m.fl.:s fyra frågor** (Spencer, tabell 1): *"Will the user try to achieve the right effect?"*, *"Will the user notice that the correct action is available?"*, *"Will the user associate the correct action with the effect that user is trying to achieve?"* och *"If the correct action is performed, will the user see that progress is being made toward the solution of the task?"*
- **Spencers förenkling** till två frågor: *"Will the user know what to do at this step?"* och *"If the user does the right thing, will they know that they did the right thing, and are making progress towards their goal?"* Fyra grundregler: *"No designing"*, *"No defending a design"*, *"No debating cognitive theory"* och att användbarhetsexperten leder. Skälet: team i tidsbrist fastnar i designdiskussioner och försvarar sina lösningar.
- **Nielsens tio:** synlig status, systemet talar användarens språk, kontroll och frihet, konsekvens och standarder, förebygg fel, känna igen hellre än minnas, flexibilitet, estetisk och minimalistisk design, hjälp att förstå och rätta fel, hjälp och dokumentation.
- **NN/g om antalet:** *"Ideally, three to five people should independently evaluate the same interface"*, och de ser inte varandras resultat förrän alla är klara.

## Kvalitet och underhåll
- Wharton 1994 är metodens praktiska handledning, och Spencer 2000 en förenkling för utvecklingsteam i tidsbrist. Ingen av dem uppdateras.
- Nielsens heuristiker: *"have remained relevant and unchanged since 1994"*; språket förfinades 2020.
- **Kända svagheter:** genomgången mäter bara inlärning vid första användningen; Gray och Salzman ifrågasatte 1998 de studier som jämför inspektionsmetoder (via Wikipedia ⚠️, artikeln är inte läst). Spencers egen validering är grov: av nio problem som ett senare användartest hittade hade genomgången fångat sex (*External validity*, ett enda team och en enda uppgift).
- **Provet i andra varvet:** genomgången med Playwright hittade fynd som vår låsta checklista missade: bokningsknappen lämnar sajten utan att säga det (F15) och samma sida med två namn på 404-sidan (F6). Tre metoder hittade oberoende av varandra att startsidan inte svarar den akuta besökaren (`andra-varvet/flodet-jamforelse.md`, rad 9).

## Det bästa vi kan ta
**Redan taget:** de fyra frågorna som PU1 i `.claude/skills/granskare/premium.md:15`, med det egna tillägget att ett steg som lämnar sajten slutar vid länken. Klart-villkoret står i `granskare/SKILL.md:72` och underlaget i `granskare/underlag.md:18`. `guide/3-4:92` säger att heuristik inte är användartest.

**Inte taget:**
1. **Spencers grundregler** för granskaren: ingen design under genomgången (fynd först, åtgärder efteråt) och inget försvar från den som byggt. Det stöder *Den som bygger dömer inte* (`guide/README.md`, princip 5).
2. **Oberoende granskare som inte ser varandras resultat** (NN/g). Det stöder `guide/2-4-skelett.md:101` (isolerade agenter med ett perspektiv var) och provet ovan. `guide/3-2:27` avvisar en panel av 3–5 *likadana* granskare; NN/g:s poäng är olika ögon, och det är specialisterna i N2.
3. **Heuristisk utvärdering av kundens befintliga sajt** som del av diagnosen vid en ombyggnad (spår B). Webb-pros `bygg-sajt` gjorde det i steg 2–3 (källkortet `bygg-sajt.md`); `omfattning/inventering.md` har före-måttet men ingen sådan diagnos.

## Var det hamnar hos oss
**Skill: granskare** – beslutad placering (fältet `beslut`, Johnny 2026-10-16 omkring 17.40: *"Ja på alla"*). Kortet håller med för den kognitiva genomgången (PU1). Postens andra metod, den heuristiska utvärderingen, är inte placerad: Nielsens tio är skrivna för program, och det som gäller en liten sajt (status efter skick, fel i formulär, konsekvens) finns redan i `kvalitet/formular.md` och PF8. Förslag till huvudsessionen: punkt 3 som N2-instruktion i `omfattning/inventering.md` *(en källa – bänken)*; punkt 1 som en rad i `granskare/SKILL.md`.

## Passar vår stack?
Ja. Metoderna är oberoende av teknik. Genomgången körs med Playwright i 375 × 667 med en fönsterbild per steg (`granskare/underlag.md:18`).

## Risker och flaggor
- **En agent är ingen förstagångsbesökare.** Genomgången är en inspektion, inte ett användartest (`guide/3-4:92`); verkliga besökare väger tyngre.
- Svaren är *härledda*, inte *sedda* (`guide/README.md`, *Sett, härlett, okänt*). Fynden går till Johnny, inte rakt in som regler.
- Licens, telemetri, betalvägg och inloggning: inga.

## Inloggning
Inget.
