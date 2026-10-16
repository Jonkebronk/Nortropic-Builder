# taste-v1

**Källa:** https://github.com/Leonxlnx/taste-skill, sökvägen `skills/taste-skill-v1/SKILL.md` (installationsnamn `design-taste-frontend-v1`). Läst 2026-10-16 vid commit `f624f37a8c65` (2026-10-14). Lästa filer: `SKILL.md` (21,2 KB): §1–§8 och rubrikerna för §9–§10; repots `README.md` och `CHANGELOG.md` (som beskriver att v1 lämnats orörd).
⚠️ §9 (Motion-Engine Bento) och §10 (slutkontroll) lästes bara som rubriker.

**Licens:** MIT, © 2026 Leonxlnx. Kräver att licenstexten följer med vid kopiering; vi destillerar.

**Vad det är:** Den ursprungliga taste-skillen, sparad för projekt som är beroende av den. Den styrs av tre reglage högst upp och förutsätter React/Next.js med Tailwind.

**Hur det fungerar:**
- **Tre reglage (1–10):** DESIGN_VARIANCE 8 (symmetri → konstnärligt kaos), MOTION_INTENSITY 6 (statiskt → filmisk fysik), VISUAL_DENSITY 4 (galleri → cockpit). Varje nivå har konkreta tekniker.
- **Arkitektur:** React/Next.js med serverkomponenter, Tailwind för 90 %, ikoner bara från Phosphor eller Radix, kontrollera `package.json` före varje import, `min-h-[100dvh]`, Grid hellre än flex-procent.
- **Typ:** display `text-4xl md:text-6xl tracking-tighter leading-none`; Inter avråds för "premium"; serif förbjuden i instrumentpaneler; bröd `text-base text-gray-600 leading-relaxed max-w-[65ch]`.
- **Färg:** högst en accent, under 80 % mättnad, ingen lila/blå AI-estetik, en gråfamilj.
- **Layout:** centrerad hero förbjuden vid variation över 4; inga tre lika kort; kort bara när höjd betyder något, tonade skuggor.
- **Tillstånd:** skelett, tomma lägen, fel i formulär, `:active` med `scale(0.98)` eller 1px nedåt; etikett ovanför fält.
- **"Kreativ arsenal":** glas med innerkant, magnetiska knappar, ständigt pågående mikroanimationer (puls, skrivmaskin, skimmer), Framer Motion-layoutövergångar, kaskadentréer, dussintals effekter (dock-förstoring, gooey-meny, holografiska kort, rullningskapning, partikelexplosion).
- **AI-tecken:** neonglöd, ren svart, övermättade accenter, gradienttext, egna muspekare, Inter, för stora H1, tre kolumnkort, "Jane Doe", generiska avatarer, "falska runda siffror" (använd "organiska" som 47,2 %), Unsplash (använd picsum), oanpassad shadcn/ui.

**Kvalitet och underhåll:**
- Repot: 97 719 stjärnor, 20 bidragsgivare, push 2026-10-14. v1 är ersatt av v2 (2026-10-13) och ändras inte längre; v2-experimental ligger kvar mellan dem.
- Inga ärenden om just v1 hittades.
- Egna iakttagelser: "organiska" påhittade siffror är fortfarande påhittade; arsenalen med ständiga animationer motsäger senare versioners hållning.

**Det bästa vi kan ta:**
- Reglagen som parametrar i spridd idégenerering – guiden nämner redan "Tastes reglage för variation, rörelse och täthet" (2-5). De finns också i `taste-skill-v2-experimental`, som är nyare.
- Prestandaräckena (§5): korn bara på fasta pseudo-element, bara `transform`/`opacity`, z-index bara för systemlager.

**Var det hamnar hos oss:**
- Ingenstans som skill – ersatt. Om reglagen behövs vid N2 tas de ur `taste-skill-v2-experimental`, inte ur v1.

**Passar vår stack?**
- Skriven för React/Next.js och Tailwind. Astro med React-öar och Tailwind 4 är tillåtet sedan BESLUT 2026-10-16, men Next.js-specifika delar (serverkomponenter, `'use client'`) måste översättas till Astros öar (`client:visible`).
- **JavaScript per sida:** Framer Motion, magnetiska knappar och ständiga mikroanimationer kräver React-runtime och Motion på varje sida med en ö ⚠️ (storlek inte mätt här) – krockar med Lighthouse 100 och sparsam rörelse, tas upp med Johnny.

**Risker och flaggor:**
- Licens: MIT. Ingen telemetri, betalvägg eller inloggning.
- **Krockar med Nortropic (vi vinner):** påhittade "organiska" siffror (ärlighetsregeln); picsum-platshållare (licenslistan); Inter-avrådan (kitet väljer); ikoner bara Phosphor/Radix (kitet väljer Lucide, Tabler eller Phosphor).
- **Krockar med andra skills:** ersatt av taste v2 i samma repo, som förbjuder glas, glöd och rörelse utan syfte.
