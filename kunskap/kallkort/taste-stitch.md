# taste-stitch

**Källa:** https://github.com/Leonxlnx/taste-skill, sökvägen `skills/stitch-skill/` (installationsnamn `stitch-design-taste`). Läst 2026-10-16 vid commit `f624f37a8c65` (2026-10-14). Lästa filer: `SKILL.md` (11,9 KB, hela) och `DESIGN.md` (12,1 KB, rubriker, palett, typ, komponenter, antimönster), repots `README.md`.

**Licens:** MIT, © 2026 Leonxlnx. Kräver att licenstexten följer med vid kopiering; vi destillerar.

**Vad det är:** En skill som skriver en `DESIGN.md` för Google Stitch med tastes anti-slop-regler omsatta i Stitchs beskrivande språk, plus en färdig exempelfil ("Taste Standard").

**Hur det fungerar:**
- **Nio delar i DESIGN.md:** atmosfär (täthet, variation, rörelse på 1–10 med namn som "Art Gallery Airy"), palett med namn + hex + roll, typregler, hero, komponenter, layout, responsivitet, rörelsefilosofi, antimönster.
- **Färg:** högst en accent under 80 % mättnad; neutrala Zinc/Slate-baser; aldrig #000; ingen lila/blå neon.
- **Typ:** Inter förbjudet; Geist, Outfit, Cabinet Grotesk eller Satoshi; generiska serifer (Times, Georgia, Garamond, Palatino) förbjudna – bara "distinkta moderna" som Fraunces; brödtext högst 65 tecken.
- **Hero:** små bilder inne i rubriken som "signatur"; centrerad hero förbjuden vid variation över 4; högst en primärknapp; inga "Scroll to explore" eller studsande pilar.
- **Komponenter:** taktil tryckåterkoppling, kort bara när höjd betyder något, etikett ovanför fält och fel under, skelett i stället för snurror.
- **Exempelfilen:** canvas #F9FAFB, kort #FFFFFF, bläck #18181B, sekundär #71717A, tertiär #94A3B8; fyra accentval (smaragd #10B981, blå #3B82F6, ros #E11D48, bärnsten #F59E0B); kortradie 2,5rem med 1px kant och diffus skugga.

**Kvalitet och underhåll:**
- Repot: 97 719 stjärnor, 20 bidragsgivare, push 2026-10-14. Ingen version eller test.
- Inga ärenden om just denna skill hittades.
- **Egna stickprov (WCAG 2.x-kontrast, räknat med skript):** tertiärtexten #94A3B8 når 2,56:1 på vitt – underkänd. Vit text på tre av fyra accenter underkänns för normal text: smaragd 2,54:1, blå 3,68:1, bärnsten 2,15:1 (bara ros 4,70:1 klarar sig). Sekundärtexten #71717A på #F9FAFB klarar 4,62:1.
- Kortradien 2,5rem med kant *och* skugga är det impeccable kallar "ghost card" och över-rundning.

**Det bästa vi kan ta:**
- DESIGN.md-strukturen med namn + hex + roll per färg – kan jämföras med vår `design.md` per kit, men vår mall (2-5, *Full design.md per kit*) täcker redan detta.
- Regeln "kort bara när höjden betyder något".

**Var det hamnar hos oss:**
- Ingenstans. Stitch ströks av Johnny 2026-10-15 (`BESLUT.md`, *Stitch stryks*), och vår `design.md`-mall finns redan.

**Passar vår stack?**
- Ingen kod; DESIGN.md är text. Exempelfilens rörelsedel förutsätter Framer Motion och "perpetual micro-interactions" – tillåtet tekniskt sedan BESLUT 2026-10-16 men i strid med sparsam rörelse.

**Risker och flaggor:**
- Licens: MIT. Kräver ett Google-konto för Stitch (labs.google/stitch) – inte aktuellt eftersom Stitch är struket.
- **Krockar med Nortropic (vi vinner):** Stitch är struket; Inter-förbudet (kitet väljer); kontrastfelen ovan (WCAG 2.2 AA är grind); förbudet mot centrerad hero mot välbekanta sidor.
- **Krockar med andra skills:** rekommenderar Fraunces, som impeccable kallar reflex; små bilder inne i rubriken är samma grepp som taste-gpt men saknas i v2.
