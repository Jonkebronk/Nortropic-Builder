# taste-brandkit

**Källa:** https://github.com/Leonxlnx/taste-skill, sökvägen `skills/brandkit/`. Jag läste den 2026-10-16 vid commit `f624f37` (repot, 2026-10-14). Skillen ändrades senast i `6d6096e` (2026-10-11, merge av PR #135 *preserve existing identity before generation*).

Lästa filer: `SKILL.md` (843 rader, hela), repots `README.md` (avsnitten Install, Skills, *Image generation skills* och Sponsors) och `LICENSE`. Ärenden och PR: #19, #109, #135 och #137.

**Licens:** MIT, © 2026 Leonxlnx. Licenstexten följer med om text kopieras.

**Vad det är:** en skill för bildgenerering som gör en översiktsbild för ett varumärkeskit, som standard ett rutnät 3 × 3 med logotyp, logotypens konstruktion, digital tillämpning, kärna, färger, typografi, fysisk tillämpning, bildriktning och detaljer. Enligt README producerar den *"design images only, no code"* och används med ChatGPT Images, Codex bildläge eller en annan agent som kan generera bilder.

**Hur det fungerar:**
- **Intag:** är det ett nytt varumärke, en utbyggnad eller en uppfräschning? Befintlig logotyp, färger och typsnitt återanvänds utan omtolkning. Detta tillkom 2026-10-08 i PR #135, efter ärende #19.
- **Strategi först:** kategori, målgrupp, löfte, metafor och vad varumärket ska undvika. En tabell kopplar kategori till symbollogik.
- **Logotyp:** fem metoder (monogram plus mening, produktens handling, sammansmält metafor, negativ yta och konstruktionsgeometri) och en lista över vad som ska undvikas (blixtar, slumpade djur, falska vapen, kopierade märken).
- **Komposition och visuella lägen** (mörk utvecklare, mörk produkt, mörk natur, säkerhet, ljus redaktionell, lyx, röst, kultur), regler för detaljer, text, slogan, bildriktning, mockupper och färgdisciplin, och en lista mot det generiska.
- **Utdata:** en bild i 4:3 eller 16:10, eller begärda mått (PR #137, 2026-10-08).

**Kvalitet och underhåll:**
- Repot har 97 717 stjärnor, 6 625 forkar och omkring 20 bidragsgivare. 1 ärende är öppet. Aktivt: push 2026-10-14.
- README har en lång sponsorsektion med kommersiella länkar, en av dem med rabattkod.
- Kända problem:
  - #19, åtgärdat i #135: skillen frågade inte om varumärket redan fanns.
  - #109 (öppet): dokumentationen om utdatans mått.
- Inga källor. Kvalitetsribban är *"premium brand-guidelines decks"*, som inte namnges.

**Det bästa vi kan ta:**
- Ordningen i intaget (ny, utbyggnad eller uppfräschning, och återanvänd det som finns utan omtolkning) i *BRAND INTAKE*. Den stämmer med att varumärkesboken utgår från kundens befintliga logotyp (`guide/4-foretaget.md`).
- Frågorna i *CORE PRINCIPLE* (vad varumärket står för, kärnmetaforen, hur systemet skalar) som stöd för tonavsnittet i varumärkesboken. Det är en svag källa utan belägg, så bara som granskningsfrågor.
- Inget av själva bildgenereringen.

**Var det hamnar hos oss:** ingenstans (`släpp`). Varumärkesboken (tillval i N3) blir ett dokument ur stilkitets värden, med [brandguidelines.net](https://brandguidelines.net) som förebild, inte en genererad bild.

**Passar vår stack?** Nej.
- Resultatet är en bild, inte HTML eller tokens. Färgvärden och typsnitt går inte att läsa ut ur den, och texten går inte att rätta.
- Claude Code har ingen inbyggd bildgenerering, så skillen kräver ett externt bildverktyg.

**Risker och flaggor:**
- **Mot beslut:** *"Logotyper genereras inte"* (`guide/2-5-yta.md`) och *"Inga genererade logotyper"* (`guide/4-foretaget.md`). Ren AI-output saknar sannolikt upphovsrättsligt skydd (tolkning, `kunskap/research/2026-10-14_ai-forordningen-och-rattigheter.md` §4).
- **Text i bild** går emot C65 (WCAG 1.4.5) om bilden används på sajten.
- **Inga skript i skillen,** men repot har `install.sh` och `skill.sh` som symlänkar in skills i Claude Code. Vi kör dem inte.
- Ingen telemetri i skillen. `npx skills add` har telemetri.
- Ingen betalvägg och ingen inloggning för att läsa. Bildverktyget kräver konto, till exempel ChatGPT.
- Krockar: 3, varav 1 hög (inventeringen), med `design` och `brand`.
