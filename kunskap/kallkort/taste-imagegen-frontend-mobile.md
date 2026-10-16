# taste-imagegen-frontend-mobile

**Källa:** https://github.com/Leonxlnx/taste-skill, sökvägen `skills/imagegen-frontend-mobile/`. Jag läste den 2026-10-16 vid commit `f624f37` (repot, 2026-10-14). Skillen ändrades senast i `edb8d32` (2026-04-28, *Move image-gen skills under skills/ for npx discovery*).

Lästa filer: `SKILL.md` (1 465 rader). Jag läste frontmatter och direktiv, regel 1 (grundinställningar), 21 (AI-tecken i mobil-UI) och 29 (textstorlek) i sin helhet och gick igenom alla 38 rubriker. Dessutom repots `README.md`.

**Licens:** MIT, © 2026 Leonxlnx. Licenstexten följer med om text kopieras.

**Vad det är:** en skill för bildgenerering som gör skisser av mobilappar för iOS och Android: skärmar och flöden som bilder, i en telefonram som standard. Den skriver ingen kod.

**Hur det fungerar:**
- **Grundinställningar på skalan 1–10:** variation 8, täthet 3, konstnärlig riktning 9, plattformskänsla 9, läsbarhet och minsta textstorlek 10 och så vidare. Användarens ord justerar dem ("clean" ger lägre täthet, "fintech" ger mer lugn).
- **38 regler:** skärmen först, tillräckligt många skärmar, ett gemensamt "app design bible", konsekvens mellan skärmar, logiskt flöde, telefonram, onboarding, säkra ytor, navigation, bildriktning, ytor och textur, ikoner, AI-tecken, en variationsmotor, färger, text, typografi, täthet, bias per kategori, regenerering, kvalitetskontroll och svarsbeteende.
- **AI-tecken som ska undvikas** (regel 21):
  - lila och blå toningar, glaskort utan syfte, kopierade widgetar och dashboards fulla av falska diagram
  - fyllnadsfraser som *"elevate your life"*, *"seamless control"*
  - påhittade varumärken som *Acme*, *NovaCore*.

**Kvalitet och underhåll:**
- Samma repo som `taste-brandkit`: 97 717 stjärnor och omkring 20 bidragsgivare.
- Skillen har inte ändrats sedan 2026-04-28.
- Inga ärenden om just den här skillen hittades.
- Inga källor. Reglerna är upphovsmannens egna.

**Det bästa vi kan ta:** inget för mobilappar. Listan över AI-tecken i text och layout (regel 21) överlappar `2-7-innehall.md` (AI-signaturer) och webbvarianten `taste-imagegen-frontend-web`, som har en egen post i ytlagret och bedöms där.

**Var det hamnar hos oss:** ingenstans (`släpp`). Nortropic säljer inga appar, och sajterna byggs i kod, inte ur genererade skisser.

**Passar vår stack?** Nej.
- Resultatet är bilder av appar, inte webbsidor.
- Claude Code har ingen inbyggd bildgenerering, så skillen kräver ett externt bildverktyg.

**Risker och flaggor:**
- Kräver ett bildverktyg med konto, till exempel ChatGPT Images eller Codex.
- Ingen telemetri i skillen. `npx skills add` har telemetri.
- Ingen betalvägg för att läsa.
- **Krockar med Nortropic** (rättat 2026-10-16; kortet sade "inga", fyndet kom från yta 2 i andra varvet):
  - **Ikoner** (§20): skillen avråder från *"bland Lucide-like icon vibes"* och *"open-source-default"*-ikoner. Hos oss väljs Lucide per kit och är varken standard eller förbjudet (`BESLUT.md` 2026-10-15, *Astro statiskt; Inter och Lucide väljs per kit*).
  - **Telefonramen** (§9–§10): ramen ska vara med som standard (*"Do not omit the device frame by default"*). Ritade mobilramar är ett fynd hos oss när de visas som kundens egna eller döljer att material saknas (`.claude/skills/yta/generiskt.md`).
  - **Rörelseantydningar** (§22, *Motion-Implied Language*, "välj exakt två"): fjädrande kort, staplade listor som tonas in, parallax. Skillen kallar dem bildanvisningar, inte kod, men förs de vidare till ett bygge krockar de med sparsam rörelse som standard (`BESLUT.md` 2026-10-15, *Rörelse – sparsam som standard*).
