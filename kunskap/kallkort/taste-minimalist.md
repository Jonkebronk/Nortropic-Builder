# taste-minimalist

**Källa:** https://github.com/Leonxlnx/taste-skill, sökvägen `skills/minimalist-skill/SKILL.md` (installationsnamn `minimalist-ui`). Läst 2026-10-16 vid commit `f624f37a8c65` (2026-10-14). Lästa filer: `SKILL.md` (hela, 8,2 KB – skillens enda fil), repots `README.md`.

**Licens:** MIT, © 2026 Leonxlnx. Kräver att licenstexten följer med vid kopiering; vi destillerar.

**Vad det är:** En stilskill för redaktionell, "dokumentlik" minimalism i Notion/Linear-anda: varm monokrom, serif i rubriker, platta bento-kort med 1px-ram och dämpade pasteller som enda färg.

**Hur det fungerar:**
- **Förbud:** Inter, Roboto, Open Sans; Lucide, Feather och vanliga Heroicons; Tailwinds tunga skuggor (bara ultradiffusa under 0,05 opacitet); stora färgade sektioner; gradienter, neon, glas; helt runda kort och primärknappar; emoji; "John Doe", "Acme", lorem ipsum; klichéord ("Elevate", "Seamless", "Unleash", "Next-Gen", "Delve").
- **Typ:** sans för bröd och knappar (SF Pro Display, Geist, Helvetica Neue, Switzer), redaktionell serif för rubriker och citat (Lyon Text, Newsreader, Playfair Display, Instrument Serif) med −0,02 till −0,04em spärrning och radavstånd 1,1; monospace för kod och metadata. Bröd aldrig #000 – #111 eller #2F3437 med radavstånd 1,6; sekundär text #787774.
- **Färg:** bakgrund #FFFFFF eller benvit #F7F6F3/#FBFBFA; kortyta #FFFFFF/#F9F9F8; kanter #EAEAEA eller `rgba(0,0,0,0.06)`; fyra pastellpar för taggar (t.ex. ljusröd #FDEBEC med text #9F2F2D, ljusgul #FBF3DB med #956400).
- **Komponenter:** asymmetrisk bento med exakt `1px solid #EAEAEA`, radie 8–12px, utfyllnad 24–40px; primärknapp #111 med vit text, radie 4–6px, ingen skugga, hover till #333 eller `scale(0.98)`; taggar som små piller i versaler med 0,05em spärrning; FAQ utan lådor, bara en underkant och +/−; kortkommandon som `<kbd>`; mjukvaruskärmar i en minimal "macOS-ram" med tre grå prickar.
- **Ikoner och bild:** Phosphor (Bold/Fill) eller Radix, enhetligt streck; illustrationer som grova bläcklinjer med en pastellform; foton avmättade och varma med korn 0,04; `picsum.photos` som platshållare; svaga radiella ljusfläckar (opacitet 0,03) eller linjemönster så att sektioner inte blir "platta".
- **Rörelse:** entré vid rullning `translateY(12px)` + opacitet över 600ms med `cubic-bezier(0.16,1,0.3,1)`, kaskad 80ms per element, en långsam bakgrundsblob (20s+), allt bakom `prefers-reduced-motion: no-preference`.

**Kvalitet och underhåll:**
- Repot: 97 719 stjärnor, 20 bidragsgivare, push 2026-10-14. Filen har ingen version eller test och följer inte v2:s husregler.
- Inga ärenden om just denna skill hittades.
- **Egna stickprov (WCAG 2.x-kontrast, räknat med skript):** sekundärtexten #787774 når **4,48:1 på vitt och 4,14:1 på #F7F6F3 – under 4,5:1**, alltså underkänd för brödtext. Pastellparen klarar sig: #9F2F2D på #FDEBEC 6,26:1, #956400 på #FBF3DB 4,62:1. Huvudtexten #2F3437 på #F7F6F3 ger 11,65:1.
- Paletten (#F7F6F3, #2F3437, #787774 och pastellparen) ser ut att vara Notions egna gränssnittsfärger ⚠️ (inte verifierat mot Notion). Färger får lånas fritt (BESLUT 2026-10-16), men kitet ska då namnge referensen.

**Det bästa vi kan ta:**
- Färgrollerna och pastellparen med egen textfärg (taggar och statusmärken där färgen inte är accent).
- FAQ utan lådor (en underkant och +/−) och `<kbd>`-stilen.
- Knappens enkelhet: en fyllning, liten radie, ingen skugga, `:active` 0,98.
- Rörelsens värden (12px, 600ms, kurvan) som en mild, sparsam entré – en gång, inte på allt.

**Var det hamnar hos oss:**
- **Bibliotek:** underlag för kitet Lugn och luftig (eller ett framtida stramt kit) när kiten tas fram – en stil per agent, aldrig i byggaren. Sekundärfärgen måste mörkas till minst 4,5:1 först.
- `.claude/skills/yta/farg.md`: pastellparen som exempel på status/taggar utanför accenten (G3).

**Passar vår stack?**
- Skriven för Tailwind och React men med exakta CSS-värden, så den översätts lätt till `--k-*` (t.ex. `--k-dampad: #787774` → mörkare). Tailwind är tillåtet sedan BESLUT 2026-10-16 men behövs inte.
- **JavaScript per sida:** entréer och kaskad kräver IntersectionObserver (litet skript); bakgrundsbloben kräver bara CSS. Kaskad på alla block krockar med sparsam rörelse och med *ingen text som börjar osynlig* – tas upp med Johnny.
- `picsum.photos` är slumpbilder från tredje part och passar inte ärlighetsregeln eller licenslistan.

**Risker och flaggor:**
- Licens: MIT. Typsnittsförslagen Lyon Text och SF Pro är kommersiella eller plattformslåsta; bara OFL via Fontsource hos oss.
- Ingen telemetri, betalvägg eller inloggning.
- **Krockar med Nortropic (vi vinner):** förbudet mot Lucide (kitet väljer); kontrasten på sekundärtext (WCAG 2.2 AA är grind); slumpade platshållarbilder; "sektioner får inte se platta ut" med ljusfläckar och korn mot G3 och rena ytor.
- **Krockar med andra skills:** macOS-ramen är hallmarks grind 47 ("omritad krom"); 1px-kanterna och versaltaggarna förbjuds av taste v2; kornet förbjuds av taste v2 och impeccable (codex-regeln om `feTurbulence`); bento med likadana kort ligger nära impeccables "identical card grids".
