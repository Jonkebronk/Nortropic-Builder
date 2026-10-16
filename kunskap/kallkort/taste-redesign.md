# taste-redesign

**Källa:** https://github.com/Leonxlnx/taste-skill, sökvägen `skills/redesign-skill/SKILL.md` (installationsnamn `redesign-existing-projects`). Läst 2026-10-16 vid commit `f624f37a8c65` (2026-10-14). Lästa filer: `SKILL.md` (hela, 16,3 KB – skillens enda fil), repots `README.md`.

**Licens:** MIT, © 2026 Leonxlnx. Kräver att licenstexten följer med vid kopiering; vi destillerar.

**Vad det är:** En granskningslista för befintliga sajter: skanna kodbasen, diagnostisera mot ett 80-punkters protokoll och laga i en fast prioritetsordning utan att byta ramverk.

**Hur det fungerar:**
- **Tre steg:** skanna (ramverk, stilmetod, mönster), diagnostisera (lista varje generiskt mönster, svag punkt och saknat tillstånd), laga riktat – ingen omskrivning från noll.
- **Typografi:** standardtypsnitt eller "Inter överallt", rubriker utan pondus, brödtext bredare än ~65 tecken, bara 400 och 700 (lägg till 500/600), proportionella siffror i data, ingen spärrning på stora rubriker, versaler överallt, ensamma ord på sista raden (`text-wrap: balance/pretty`).
- **Färg och ytor:** ren #000, övermättade accenter (under 80 % mättnad), mer än en accent, blandade varma och kalla grå, lila–blå AI-gradient, generisk svart skugga (tona skuggan), enstaka mörk sektion mitt i en ljus sida, inkonsekvent ljusriktning.
- **Layout:** allt centrerat, tre lika kort, `100vh` i stället för `100dvh`, ingen maxbredd (cirka 1200–1440px), samma radie överallt, symmetrisk vertikal utfyllnad, **knappar som inte linjerar i underkant i kortgrupper**, **funktionslistor som börjar på olika höjd**, **optisk justering 1–2px** för ikoner bredvid text och spelknappar i cirklar.
- **Tillstånd:** saknad hover, aktiv, fokusring, laddning (skelett i stället för snurra), tomt läge, felmeddelanden i formulär (aldrig `alert()`), döda länkar (`#`), ingen markering av aktuell sida, ikonnavigering utan namn eller med små träffytor (minst 44×44px).
- **Innehåll:** "John Doe", "Acme", lorem ipsum, klichéord, utropstecken i bekräftelser, "Oops!", passiv form, Title Case på rubriker (använd meningsversaler).
- **Det AI glömmer:** juridiska länkar, väg tillbaka, egen 404, formulärvalidering, hopplänk till huvudinnehåll, cookiebanner där lag kräver, favicon, `<title>`, beskrivning och `og:image`.
- **Prioritetsordning:** typsnitt → palett → hover/aktiv → layout och avstånd → byt generiska komponenter → laddning/tom/fel → finputsa typskala.

**Kvalitet och underhåll:**
- Repot: 97 719 stjärnor, 20 bidragsgivare, push 2026-10-14. Filen har ingen version eller test; den är äldre än v2 och motsäger v2 på flera punkter.
- Inga ärenden om just denna skill hittades.
- **Egna stickprov – fel och risker i listan:**
  - Innehållsavsnittet uppmanar till påhittad data: "organiska, röriga siffror" (47,2 %), uppfunna trovärdiga namn och **"slumpa datum så att de ser verkliga ut"**. Det är vilseledande och krockar med ärlighetsregeln – och med v2 i samma repo, som förbjuder påhittade bevis.
  - "Lucide eller Feather är AI:s standardval – byt" krockar med vårt beslut att kitet väljer.
  - Uppgraderingsteknikerna (glas med innerkant, spotlight-kanter, korn, färgade skuggor, parallax, tröghetsrullning, "smooth scroll") går emot sparsam rörelse och mot v2:s förbud.
  - "Ersätt FAQ-dragspel" och "avatarer som squircles" är smak utan källa.

**Det bästa vi kan ta:**
- Linjeringspunkterna (knappar i underkant, listor på samma höjd, optisk justering 1–2px, delade baslinjer i sidoställda element).
- Tillståndslistan och *Strategic Omissions* (juridiska länkar, 404, hopplänk, validering, favicon, metataggar, aktiv sida i navigeringen).
- Färgpunkterna: en accent, en gråfamilj, tonade skuggor i stället för ren svart, inga ensamma mörka sektioner.
- Prioritetsordningen som arbetsordning vid ombyggnad.

**Var det hamnar hos oss:**
- **Kontroll:** den filtrerade listan blir granskningskriterier för granskaren (2-5 *Granskningskriterier*, 3-2), och de mätbara punkterna (aktiv sida, hopplänk, 404, döda `#`-länkar, metataggar, träffytor, `100dvh`) blir Playwright-kontroller där de inte redan finns.
- `.claude/skills/yta/detaljer.md`: linjering och optisk justering.
- `generiskt.md`: färg- och layoutpunkterna som hantverksfrågor, inte som domar över AI-utseende.
- Innehållsavsnittet tas **inte** med.

**Passar vår stack?**
- Listan är ramverksoberoende och säger själv "arbeta med befintlig stack, byt inte ramverk". Den nämner Tailwind v3/v4-kontroller, som blir relevanta nu när Tailwind är tillåtet (BESLUT 2026-10-16).
- JavaScript per sida: noll för granskningen. Flera "uppgraderingar" (tröghetsrullning, parallax, spotlight-kanter) kräver skript och krockar med Lighthouse 100 och sparsam rörelse – tas upp med Johnny om någon vill ha dem.

**Risker och flaggor:**
- Licens: MIT, ingen risk. Ingen telemetri, betalvägg eller inloggning.
- **Krockar med Nortropic (vi vinner):** påhittad data och slumpade datum (ärlighetsregeln, 2-7); Lucide-förbudet; korn, glas och parallax (sparsam rörelse, G3); "typsnittsbyte först" – hos oss byts typsnitt bara via kitet.
- **Krockar med andra skills:** taste v2 och hallmark förbjuder påhittade siffror; impeccable och taste v2 förbjuder korn och glas som dekor.
