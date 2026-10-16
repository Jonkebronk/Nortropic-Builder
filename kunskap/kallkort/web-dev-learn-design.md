# web.dev Learn Responsive Design

**Källa:** https://web.dev/learn/design/, läst 2026-10-16. Kursen heter i dag *Learn Responsive Design* och har 17 artiklar och ett quiz (WebFetch av indexet). Andra varvet sparade alla 17 (`byggguider/nng-baymard-govuk-webdev/webdev-design-*.txt`). I dag lästa direkt: indexet, [User interface patterns](https://web.dev/learn/design/ui-patterns) (uppdaterad 2021-12-23) och [Theming](https://web.dev/learn/design/theming) (2021-12-09) med `curl`. Datum per kapitel ur nedladdningen: de flesta 2021-10-14 till 2021-12-23; *Media queries* och *Media features* 2025-08-23; *The picture element* 2026-07-16.
⚠️ Inte lästa i dag i sin helhet: kapitlen om layout, typografi, bilder, ikoner, interaktion och tillgänglighet (bara sökta i nedladdningen), och quizet.

**Licens:** *"Except as otherwise noted, the content of this page is licensed under the Creative Commons Attribution 4.0 License, and code samples are licensed under the Apache 2.0 License."* (sidfoten, `curl` 2026-10-16). CC BY 4.0 kräver erkännande om bearbetad text sprids, men ingen delning på lika villkor. Vi destillerar med egna ord och länkar.

## Vad det är
En gratiskurs från Googles web.dev om responsiv design: media queries, internationalisering, makro- och mikrolayout, typografi, responsiva bilder, `<picture>`, ikoner, teman, tillgänglighet, interaktion, gränssnittsmönster, media features och skärmkonfigurationer. *"This course was written by Jeremy Keith, with input and review from Rachel Andrew, Una Kravets, Adam Argyle, and Camden Bickel."* (välkomstkapitlet).

## Hur det fungerar
- Varje kapitel är en artikel med exempel i CSS och HTML och ibland en övning.
- **Navigeringen** (User interface patterns): *"Try to find a strategy that avoids hiding your navigation. If you have a relatively small number of items, you can style the navigation to look good on small screens."* Därefter ett mönster där länkarna ligger på en rad som scrollar i sidled med en markering att fler finns. Att dölja menyn kommer sist: *"As a last resort you could choose to have your navigation hidden by default and provide a toggle mechanism for users to show and hide the contents."* Knappen ska ha text: *"Make sure the button that toggles the display of the navigation is labeled. Don't rely on an icon to be understood."*
- **Karuseller:** *"What's true of navigation is also true of other content: try not to hide anything anyway."*
- **Lokala tjänstesajter** nämns inte. Kursen är allmän.

## Kvalitet och underhåll
Utgivare: Google (web.dev). Skriven 2021; tre kapitel uppdaterade 2025–2026, resten orörda sedan 2021. Ingen ändringslogg för kursen hittad.

**Fel i källan:** *Theming* föreslår `<meta name="supported-color-schemes" content="light dark">` (fortfarande så 2026-10-16). MDN dokumenterar `<meta name="color-scheme">` ([MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/meta/name/color-scheme)). Vår `kvalitet/modern-html-css.md:72` använder redan `color-scheme`.

## Det bästa vi kan ta
1. **Andra källan till synlig meny,** efter NN/g. web.dev säger *få val*, inget tal. Därför har *principen* – dölj inte menyn när valen är få – nu två oberoende källor, medan *gränsen fyra* fortfarande bara har NN/g (*Hamburger Menus*, 2016). Andra varvets formulering *"Regeln om fyra synliga val har nu två oberoende källor"* (`andra-varvet/byggguider-jamforelse.md`, *Luckor i luckfilen*, 3.1) säger mer än källan.
2. **Menyknappen har text,** inte bara en ikon. Stöder "Meny" som etikett (`BESLUT.md` 2026-10-15).
3. **Göm inget innehåll** i karuseller. Stöder N1-regeln mot automatiska bildspel.
4. **`theme-color` per färgschema** (Theming) finns redan i `skelett/mobil.md:25`.

## Var det hamnar hos oss
**Beslutad:** skill: skelett (fältet `beslut`; Johnny 2026-10-16 omkring 17.40, *"Ja på alla"*). Skelettskillen citerar i dag en annan web.dev-artikel, *Responsive web design basics* (`skelett/SKILL.md:37`), och NN/g för menyn (`skelett/interaktion.md:16`, `skelett/sektioner.md:9`). Learn Design nämns inte i `guide/` eller `.claude/skills/` (sökning 2026-10-16).

**Förslag till Johnny:** stycket om navigering hör också till där menyregeln står: `guide/2-3-struktur.md:53` (N2, i dag *"en källa – bänken"*) och `struktur/navigation.md`. Där kan web.dev läggas till som andra källa till principen, med NN/g ensam för talet fyra. Det rör beslutet om "Meny" och luckfilen 3.1, så Johnny avgör.

## Passar vår stack?
Ja. Ren HTML och CSS, inget ramverk.

## Risker och flaggor
- **Ålder:** det mesta skrevs 2021. Kontrollera stöd i webbläsare med MDN och Baseline innan något tas in.
- **Föråldrat metanamn** i Theming (ovan).
- **Mönstret med menylänkar som scrollar i sidled** går emot andan i `skelett/SKILL.md:55` (inga rader i sidled för tjänster, priser och kontakt; NN/g). Det tas inte in utan Johnny.
- Ingen telemetri eller betalvägg. Sajten har Googles kakinställningar.

## Inloggning
Inget. Sidan har en frivillig inloggning (*Sign in*); vad den sparar är inte prövat ⚠️.
