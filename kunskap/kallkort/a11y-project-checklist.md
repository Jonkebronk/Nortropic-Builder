# The A11Y Project Checklist

**Källa:** https://www.a11yproject.com/checklist/ och repot https://github.com/a11yproject/a11yproject.com, HEAD `27de226845bb7729fd0c28a7652b3e47deae53b1` (2026-08-31, *"Update resources.json"*), läst 2026-10-16. Datafilen är `src/_data/checklists.json`, senast ändrad i commit `803708f5f074a6f242100730bc1fab8cde9935b6` (2026-02-13, *"replace dead link #1638"*); innehållet ändrades senast 2023-10-10 (`2c852a6`, länkarna till WCAG 2.2). Lästa: hela datafilen (identisk med andra varvets nedladdning), mallen `src/checklist.njk`, den publicerade sidan med `curl` och öppna ärenden som innehåller "checklist" (20 träffar).
⚠️ Inte lästa: sajtens artiklar och resurser utanför checklistan.

**Licens:** Apache-2.0 (repot; sidfoten säger *"APLv2"* och *"© 2013–2024 The Accessibility Project"*). Kräver licens och upphovsrättsnotis om text sprids vidare och att ändringar märks. Vi destillerar med egna ord, så inget krav utlöses.

## Vad det är
*"A beginner's guide to digital accessibility"*: en lista att bocka av, där varje punkt har en titel, ett WCAG-kriterium med länk till Understanding och en kort förklaring. Datafilen har 68 punkter i 18 grupper. Sidan visar 64, eftersom mallen hoppar över gruppen om SVG: *"6 May 2021: We don't publish our guidelines about SVGs"* (`src/checklist.njk:88`).

## Hur det fungerar
- Varje punkt pekar på *"the one most relevant"* kriterium. Sidan säger: *"This checklist targets many, but not all level A and AA concerns."*
- Sidan svarar själv nej på frågan om listan garanterar en tillgänglig sajt.
- **Lokala tjänstesajter** nämns inte. Listan är allmän; grupperna om tabeller, sessioner, ljud och video gäller sällan en liten sajt.

## Kvalitet och underhåll
- 3 901 stjärnor, 618 forkar, cirka 268 bidragsgivare, skapad 2013, senaste push 2026-08-31, 107 öppna ärenden (GitHubs API 2026-10-16).
- Kända problem: [#1277](https://github.com/a11yproject/a11yproject.com/issues/1277) (öppet sedan 2021) säger att WCAG-hänvisningarna bör bli mer exakta; [#1658](https://github.com/a11yproject/a11yproject.com/issues/1658) och [#1641](https://github.com/a11yproject/a11yproject.com/issues/1641) (2026) ber att sidan anger WCAG-versionen.
- **Fel mot WCAG 2.2, kontrollerade i dag:**
  - Fyra punkter pekar på nivå AAA: 3.1.5 (lättläst), 1.4.8 (visuell presentation), 2.3.3 (animation vid interaktion) och 2.5.5 (träffyta, utökad). AA-kriteriet 2.5.8 (24 × 24 px) saknas.
  - Två punkter pekar på 4.1.1, som W3C skriver *"has been removed from WCAG 2.2"* ([Understanding 4.1.1](https://www.w3.org/WAI/WCAG22/Understanding/parsing.html), uppdaterad 2026-03-09).
  - Felkopplingar: etiketter till 3.2.2 (vid inmatning), luft för att kunna scrolla till 2.4.1 (hoppa förbi block), en `h1` och obrutna rubriknivåer till 2.4.6. De två sista är inga WCAG-krav, vilket `kvalitet/tillganglighet.md` redan säger.

## Det bästa vi kan ta
1. **Nya flikar:** punkten bygger på teknik G201 och säger *"Ideally, avoid links that open in a new tab or window."* och *"While this technique is technically not required for compliance, it is an often-cited area of frustration for many different kinds of assistive technology users."* Kontroll 2b (Johnnys beslut, `BESLUT.md` 2026-10-16) öppnar kartor, recensioner och sociala medier i ny flik på datorn och förvarnar skärmläsaren, vilket G201 godtar. Ingen ändring; nyansen hör hemma i kontrollens källa.
2. **Små tillägg** som inte står i `kvalitet/tillganglighet.md`: inget `autofocus`, inga verktygstips med `title`, kontrast i en egen `::selection`-färg, och luft mellan tryckytor så att den som har darrhänta händer kan scrolla förbi dem.
3. Resten finns redan och ofta strängare: tabellen över kriterier i `kvalitet/tillganglighet.md`, felsammanfattningen i `kvalitet/formular.md:45`, forced-colors (kontroll 8h) och reducerad rörelse (`rorelse/reducerad.md`).

## Var det hamnar hos oss
**Beslutad:** skill: kvalitet (fältet `beslut`; Johnny 2026-10-16 omkring 17.40, *"Ja på alla"*), som kort lista för den manuella kontrollen vid lansering. Listan nämns i dag inte i `guide/` eller `.claude/skills/` (sökning 2026-10-16).

**Förslag till Johnny:** använd listan bara som korskontroll för punkt 2. Den manuella kontrollen vid lansering följer `kvalitet/tillganglighet.md` och WCAG-EM (`guide/2-8-teknik-och-kvalitet.md`, N3), som utgår från WCAG 2.2 AA och är mer exakta. Inventeringens rad *"68 punkter på WCAG A/AA"* bör läsas som 64 publicerade punkter (68 i datafilen), de flesta A och AA men fyra AAA och två mot det borttagna 4.1.1.

## Passar vår stack?
Ja. Listan är text. Allt går att pröva i webbläsaren eller med Playwright och axe.

## Risker och flaggor
- **AAA och 4.1.1:** ett fynd ur listan blir inte `hög` hos oss utan ett numrerat A- eller AA-kriterium i WCAG 2.2 (`kvalitet/tillganglighet.md`, *Två varv och allvar*).
- **Träffytan:** listans 2.5.5 är AAA. Vårt krav är 2.5.8 med 24 × 24 px, och 44–56 px är tumregler.
- Licens, telemetri, betalvägg: inga problem. Sidan sparar bockarna i webbläsaren (`src/js/checklist.js`).

## Inloggning
Inget.
