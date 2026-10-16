# taste-gpt

**Källa:** https://github.com/Leonxlnx/taste-skill, sökvägen `skills/gpt-tasteskill/SKILL.md` (installationsnamn `gpt-taste`). Läst 2026-10-16 vid commit `f624f37a8c65` (2026-10-14). Lästa filer: `SKILL.md` (hela, 8,4 KB – skillens enda fil), repots `README.md` och `skills/llms.txt`.

**Licens:** MIT, © 2026 Leonxlnx. Kräver att licenstexten följer med vid kopiering; vi destillerar.

**Vad det är:** En strängare variant för GPT och Codex: "Awwwards-nivå" med GSAP, påtvingad layoutvariation genom en låtsad Python-slump och en fast AIDA-sidordning.

**Hur det fungerar:**
- **Låtsad slump:** modellen ska skriva ut en påhittad Python-körning (frö = promptens teckenantal) som väljer en hero, ett typsnitt (Satoshi, Cabinet Grotesk, Outfit eller Geist – aldrig Inter), tre komponenter och två GSAP-tekniker.
- **AIDA:** navigering (t.ex. svävande glaspiller) → Attention (hero) → Interest (bento) → Desire (GSAP-rullning) → Action (sidfot/pris). Sektioner `py-32 md:py-48`.
- **Hero:** H1 högst 2–3 rader genom bred behållare (`max-w-5xl/6xl`) och `clamp(3rem,5vw,5.5rem)`; tre alternativ, där "Cinematic Center" är "starkt föredraget": centrerad text, **exakt två knappar**, helbildsfoto med mörk radiell tona. Förbjudet: stämplar, piller och siffror i hero.
- **Bento:** `grid-auto-flow: dense`, inga tomma celler, 3–5 kort.
- **GSAP:** hover-skala 1,05 på varje klickbart kort och bild; fäst sektionstitel medan galleri rullar; bilder som växer från 0,8 och tonar till 0,2 när de lämnar; **ord som börjar på 0,1 opacitet och skrubbas fram** vid rullning; kort som staplas. `prefers-reduced-motion` obligatoriskt.
- **Komponenter:** små pillerbilder inne i rubriker, horisontella dragspel, oändlig marquee med logotyper, karusell för omdömen.
- **Bilder och bakgrund:** `picsum.photos` med filter (gråskala, luminositet, kontrast); djupa radiella oskärpor, korniga mesh-gradienter.
- **Förbud:** meta-etiketter som "SECTION 01", "QUESTION 05", "ABOUT US"; emoji.

**Kvalitet och underhåll:**
- Repot: 97 719 stjärnor, 20 bidragsgivare, push 2026-10-14. Filen har ingen version eller test och motsäger v2.
- Inga ärenden om just denna skill hittades.
- Egna iakttagelser: "Cinematic Center med exakt två knappar" är just den centrerade hero med två knappar som taste v2 (`tells.md`, första vågen) och hallmark (grind 6) kallar AI-typisk – samma repo motsäger sig självt. "Python-slumpen" är text modellen skriver, ingen riktig slump.

**Det bästa vi kan ta:**
- Regeln att H1 hålls på 2–3 rader genom bredare behållare i stället för mindre storlek (`SKILL.md` §3) – samma tanke som taste v2:s tvåradersregel.
- Förbudet mot påhittade meta-etiketter ("SECTION 01").
- Kravet på `prefers-reduced-motion` med `gsap.matchMedia()`.

**Var det hamnar hos oss:**
- Ingenstans. Rubrikregeln finns bättre i taste v2 och etikettförbudet i impeccable; rörelserna hör till lager 6 och strider mot sparsam rörelse.

**Passar vår stack?**
- Skriven för React (`@gsap/react`), Tailwind och `@phosphor-icons/react`. Tekniskt möjligt sedan BESLUT 2026-10-16 (React som ö, Tailwind 4), men varje sida skulle ladda React-runtime, GSAP och ScrollTrigger ⚠️ (storlek inte mätt här).
- **Krockar som tas upp med Johnny:** text som börjar på 0,1 opacitet (krockar med *ingen text som börjar osynlig* och *HTML först*), fästa och staplade sektioner och hover-skala överallt (sparsam rörelse, Lighthouse 100 på mobil).

**Risker och flaggor:**
- Licens: MIT. GSAP har numera en egen licens (fri även kommersiellt sedan Webflow-köpet) ⚠️ – inte kontrollerad här; ska stå i licenslistan om GSAP någonsin används.
- Ingen telemetri, betalvägg eller inloggning.
- **Krockar med Nortropic (vi vinner):** slump per sajt mot grundregeln (ytan ur kitet); slumpbilder från picsum mot ärlighetsregeln och licenslistan; logotyp-marquee (påhittade samarbetspartner är förbjudna hos hallmark och taste v2 – och hos oss).
- **Krockar med andra skills:** marquee förbjuds av impeccable; glaspiller-navigering av taste v2; hover-skala överallt och `transition-all` av hallmark.
