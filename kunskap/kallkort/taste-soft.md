# taste-soft

**Källa:** https://github.com/Leonxlnx/taste-skill, sökvägen `skills/soft-skill/SKILL.md` (installationsnamn `high-end-visual-design`). Läst 2026-10-16 vid commit `f624f37a8c65` (2026-10-14). Lästa filer: `SKILL.md` (hela, 10,5 KB – skillens enda fil), repots `README.md` och `CHANGELOG.md`. Webbsidan tasteskill.dev lästes inte ⚠️.

**Licens:** MIT, © 2026 Leonxlnx. Kräver att licenstexten följer med vid kopiering; vi destillerar.

**Vad det är:** En stilskill för en "dyr", mjuk yta i Apple/Linear-anda: stora luftmängder, nästlade kort, pillerknappar och fjädrande rörelse. Den låter modellen slå en tärning mellan tre stämningar och tre layouter.

**Hur det fungerar:**
- **Förbud:** Inter, Roboto, Arial, Open Sans, Helvetica; tjocka Lucide-, FontAwesome- och Material-ikoner (bara tunna linjer, t.ex. Phosphor Light); grå 1px-kanter och hårda skuggor; navigeringsfält klistrade mot överkanten; symmetriska tre-kolumnsrutnät; `linear` och `ease-in-out`.
- **Tre stämningar:** *Ethereal Glass* (OLED-svart #050505, lila/smaragd-orbs, glas med `backdrop-blur-2xl`), *Editorial Luxury* (krämvit #FDFBF7, dämpad salvia eller espresso, variabel serif, filmkorn med opacitet 0,03), *Soft Structuralism* (silvergrå eller vit, fet grotesk, mycket diffusa skuggor).
- **Tre layouter:** asymmetrisk bento, överlappande "Z-kaskad" med lätt rotation, redaktionell delning. Allt faller till en kolumn under 768px; `min-h-[100dvh]` i stället för `h-screen`.
- **"Double-Bezel":** varje kort är ett yttre skal (svag bakgrund, hårlinje, 6–8px utfyllnad, radie 2rem) runt en inre kärna med ljus innerskugga och radien *yttre minus utfyllnad*, så att hörnen blir koncentriska.
- **Knappar:** helt runda piller; en pil får aldrig stå naken utan ligger i en egen cirkel i knappen; tryck skalar till 0,98, pilcirkeln flyttar sig snett vid hover.
- **Rytm:** sektioner `py-24` till `py-40`; små pillerformade överrader (10px, versaler, 0,2em spärrning) före varje stor rubrik.
- **Rörelse:** allt kommer in vid rullning (`translate-y-16 blur-md opacity-0` → synligt, 800ms+), menyn öppnas som helskärmsglas med förskjutna länkar, `transition-all` med egen bezier.
- **Prestandaräcken:** animera bara `transform` och `opacity`; `backdrop-blur` bara på fasta element; korn bara på ett fast pseudo-element med `pointer-events: none`; inga rullningslyssnare; z-index bara för systemlager.

**Kvalitet och underhåll:**
- Repot: 97 719 stjärnor, 20 bidragsgivare, 1 öppet ärende, push 2026-10-14. Själva filen har inga versioner eller tester; den är äldre än v2 och följer inte v2:s regler.
- Inga ärenden om just denna skill hittades.
- Egna stickprov: skillen förutsätter att "premiumtypsnitt som Geist, Clash Display, PP Editorial New eller Plus Jakarta Sans finns". PP Editorial New är ett kommersiellt Pangram Pangram-typsnitt och Clash Display kommer från Fontshare, vars villkor är en öppen fråga hos oss. Skillen motsäger sig själv: förbjuder `ease-in-out` men föreskriver `transition-all`, som hallmark och impeccable kallar ett AI-tecken.

**Det bästa vi kan ta:**
- Koncentriska radier (*Double-Bezel*, inre radie = yttre − utfyllnad) som detaljregel – oavsett om vi nästlar.
- Prestandaräckena (§6) rakt av.
- Mobilkollapsen och `100dvh` (§3).
- Tryckåterkopplingen `scale(0.98)` på `:active`.
- Stämningen *Soft Structuralism* (och delar av *Editorial Luxury*) som underlag när kitet Lugn och luftig förfinas – en stil per agent.

**Var det hamnar hos oss:**
- **Bibliotek:** som underlag för stilkitet Lugn och luftig (luft, diffusa skuggor, radier) när kitet tas fram eller förnyas – aldrig laddat i kundbygget.
- `.claude/skills/yta/detaljer.md`: koncentriska radier, prestandaräcken, tryckåterkoppling.
- Allt övrigt (överradspiller, glas, rörelse överallt) stannar i källan.

**Passar vår stack?**
- Skillen är skriven helt i Tailwind-klasser och för React/Framer Motion. Med BESLUT 2026-10-16 kan klasserna tas nästan som de är i Tailwind 4; utan Tailwind översätts de till `--k-*` (t.ex. `rounded-[2rem]` → `--k-radie-kort`, `py-24..py-40` → `--k-sektion`).
- **JavaScript per sida:** rullningsentréer på varje element (IntersectionObserver eller Motions `whileInView`), hamburgermorf och helskärmsmeny kräver skript; med Motion som React-ö tillkommer React-runtime och Motion på sidan ⚠️ (storlek inte mätt här).
- **Krockar som tas upp med Johnny:** blur-entréer på allt (CPU/GPU på svaga mobiler → Lighthouse), "inget element syns statiskt" (krockar med *ingen text som börjar osynlig* och *HTML först*), sparsam rörelse.

**Risker och flaggor:**
- Licens: MIT; typsnittsförslagen har egna licenser (se ovan) – bara OFL-typsnitt via Fontsource hos oss.
- Ingen telemetri, betalvägg eller inloggning.
- **Krockar med Nortropic (vi vinner):** förbud mot Lucide (hos oss väljer kitet, BESLUT 2026-10-15); överradspiller på varje rubrik; glas och mesh-gradienter; fjädrande rörelse överallt; "rulla tärningen" per sajt mot grundregeln att ytan kommer ur kitet.
- **Krockar med andra skills:** Double-Bezel är "kort i kort", som hallmark (grind 4), impeccable (nested-cards) och taste v2 förbjuder; överrader förbjuds av impeccable och taste; glas förbjuds av taste v2; "dyr" krämvit + serif är frontend-designs kluster 1.
