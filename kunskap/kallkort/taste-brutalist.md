# taste-brutalist

**Källa:** https://github.com/Leonxlnx/taste-skill, sökvägen `skills/brutalist-skill/SKILL.md` (installationsnamn `industrial-brutalist-ui`, märkt Beta i `llms.txt`). Läst 2026-10-16 vid commit `f624f37a8c65` (2026-10-14). Lästa filer: `SKILL.md` (hela, 92 rader, 8,4 KB – skillens enda fil), repots `README.md` och `skills/llms.txt`.

**Licens:** MIT, © 2026 Leonxlnx. Kräver att licenstexten följer med vid kopiering; vi destillerar.

**Vad det är:** En stilskill för "industriell brutalism": schweizisk tryckteknisk typografi eller militär terminal/CRT-estetik, hårda raster, extrem typskala och simulerad analog nedbrytning.

**Hur det fungerar:**
- **Två lägen, välj ett:** *Swiss Industrial Print* (ljust, tidningspapper #F4F4F0/#EAE8E3, kolsvart bläck #050505–#111111) eller *Tactical Telemetry* (bara mörkt, #0A0A0A/#121212, fosforvit #EAEAEA). Samma enda accent i båda: varningsröd #E61919/#FF2A2A; terminalgrön #4AF626 högst på ett element.
- **Typ:** tunga neo-groteskar (Neue Haas Grotesk Black, Inter Extra Bold/Black, Archivo Black, Monument Extended) i `clamp(4rem,10vw,15rem)`, spärrning −0,03 till −0,06em, radavstånd 0,85–0,95, bara versaler. Mikrotext i monospace 10–14px, versaler, spärrning 0,05–0,1em. Serif (Playfair, EB Garamond) sparsamt och rastrerad.
- **Layout:** strikt CSS Grid, synliga 1–2px-linjer och heltäckande `<hr>`, radie 0, växling mellan extrem täthet och stora tomrum. Tips: `gap: 1px` mot kontrasterande bakgrund ger hårfina linjer utan kanter.
- **Dekor:** ASCII-ramar (`[ DELIVERY SYSTEMS ]`, `>>>`), ®/©/™ som geometri, hårkors i rutnätskorsningar, streckkoder, varningsränder och **slumpade "tekniska" strängar** (`REV 2.6`, `UNIT / D-01`).
- **Textur:** rastrering och 1-bitsdithering, CRT-svepslinjer med `repeating-linear-gradient`, globalt brusfilter på roten.
- **Semantik:** `<data>`, `<samp>`, `<kbd>`, `<output>`, `<dl>` för "telemetri".

**Kvalitet och underhåll:**
- Repot: 97 719 stjärnor, 20 bidragsgivare, push 2026-10-14. Filen är märkt Beta, har ingen version eller test och följer inte v2:s husregler.
- Inga ärenden om just denna skill hittades.
- Egna iakttagelser: mikrotext på 10px i versaler underskrider impeccables och hallmarks golv (12px bröd, 11px funktionstext) och gör sidan svårläst för målgruppen. Neue Haas Grotesk och Monument Extended är kommersiella.

**Det bästa vi kan ta:**
- Tekniken `gap: 1px` mot bakgrundsfärg för exakta avdelare.
- Semantiska taggar för data (`<data>`, `<dl>`, `<output>`) – gäller också öppettider och prislistor.
- Idén "en accent, en enda funktion" stämmer med G3.

**Var det hamnar hos oss:**
- Ingenstans nu. Inget av de tre kiten (Lugn och luftig, Varm och välkomnande, Djärv och egen) bygger på brutalism; Djärvs referenser (Lamanna's, Bernice, Rendezvous) är färgstarka och rundade, inte industriella. Avdelartekniken kan nämnas i `detaljer.md` om den behövs.

**Passar vår stack?**
- Ren CSS och HTML, noll JavaScript; fungerar i Astro med eller utan Tailwind (tillåtet sedan BESLUT 2026-10-16).
- Globalt SVG-brusfilter och svepslinjer över hela sidan kostar målning på svaga mobiler – möjlig krock med Lighthouse 100.

**Risker och flaggor:**
- Licens: MIT; föreslagna typsnitt delvis kommersiella – bara OFL via Fontsource hos oss.
- Ingen telemetri, betalvägg eller inloggning.
- **Krockar med Nortropic (vi vinner):** slumpade "tekniska" strängar är påhittat innehåll (ärlighetsregeln); 10px versalmikrotext (läsbarhet, WCAG 1.4.4 vid förstoring); fel ton för vård, hantverk och café; ett kit som bara är mörkt.
- **Krockar med andra skills:** monospace som kostym, hårlinjer och indexnummer förbjuds av taste v2; impeccable förbjuder rutnätsbakgrunder och ränder utan verkligt underlag och monospace som "teknisk" kostym.
