# canvas-design

**Källa:** https://github.com/anthropics/skills, sökvägen `skills/canvas-design/`. Jag läste den 2026-10-16 vid commit `dbd4588` (repot, 2026-10-09). Skillen ändrades senast i `b9e19e6` (2026-04-20, en commit som bara fyllde i upphovsrättsraden i licensfilerna).

Lästa filer: `SKILL.md` (129 rader, hela), `LICENSE.txt`, listan över `canvas-fonts/` (81 filer: typsnitt i TTF och en OFL-licens per familj) och repots `README.md`. Jag sökte efter ärenden om skillen.

**Licens:** Apache-2.0 för skillen. Licensen kräver att licenstexten och NOTICE följer med vid vidarespridning, och ändrade filer ska märkas. Typsnitten i `canvas-fonts/` har SIL Open Font License, som kräver att licensen följer med typsnittet och att typsnittet inte säljs separat.

**Vad det är:** Anthropics exempelskill för bildkonst. Claude skriver först en *designfilosofi* i form av ett manifest för en påhittad konströrelse och uttrycker den sedan som en enda affisch- eller konstbild i PNG eller PDF.

**Hur det fungerar:**
- **Två steg:** en filosofi på 4–6 stycken i `.md` (form, rum, färg, skala, komposition) och sedan ett *canvas*. Bilden är ett "konstobjekt" med 90 % bild och 10 % text, och ämnet vävs in som en subtil referens.
- **Upprepade krav på hantverk:** texten säger gång på gång att verket ska se ut att ha tagit *"countless hours"*. Sista steget utgår från att användaren redan sagt att det inte är perfekt, och modellen ska förfina i stället för att lägga till.
- **Typsnitt** hämtas ur `./canvas-fonts`. Texten ska aldrig överlappa och aldrig gå utanför ytan.
- Ingen kod följer med. Skillen förutsätter att Claude ritar med valfritt bibliotek.

**Kvalitet och underhåll:**
- Repot har 181 487 stjärnor, 21 497 forkar och omkring 16 bidragsgivare. 1 423 ärenden och PR är öppna.
- README kallar skillsen *"for demonstration and educational purposes only"*.
- Inga ärenden handlar om just canvas-design. Repoövergripande problem: #189, #919 och #1087 (pluginerna `document-skills` och `example-skills` laddar samma 17 skills två gånger) och #667 (avvikande katalognamn).

**Det bästa vi kan ta:**
- Inget till sajtbygget. Idén att formulera en riktning i ord innan något ritas finns redan i våra stilkit (`design.md` per kit, → `guide/2-5-yta.md`).
- Kontrollen att text aldrig går utanför ytan eller överlappar finns redan som kontroll av spill i lager 8.

**Var det hamnar hos oss:** ingenstans (`släpp`). Ingen tjänst i `guide/4-foretaget.md` säljer bildkonst. Varumärkesboken (tillval i N3) byggs ur stilkitets värden och kundens logotyp, inte som konst.

**Passar vår stack?** Nej. Resultatet är PNG eller PDF, inte HTML, och text i bild går emot C65 (WCAG 1.4.5) på sajten. Typsnitten är TTF, medan biblioteket använder Fontsource och WOFF2.

**Risker och flaggor:**
- Licens: Apache och OFL, ingen risk om vi inte sprider filerna.
- Ingen telemetri, ingen betalvägg och ingen inloggning.
- Krockar: inga enligt inventeringen.
- Skillen ligger i Anthropics plugin `example-skills`. Byggsessionen laddar inte användarnivåns plugins (`guide/3-3-sakerhet-och-installningar.md`), så den aktiveras inte av misstag.
