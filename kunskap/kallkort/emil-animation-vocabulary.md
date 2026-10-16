# emil-animation-vocabulary

**Källa:** https://github.com/emilkowalski/skills, `skills/animation-vocabulary/SKILL.md` (181 rader, den enda filen). Läst 2026-10-16 vid repots commit `2d228630ba14` (2026-10-11). Senaste ändring i skillen är `85e8e2363b` (2026-09-15); skillen skapades 2026-06-29 och har tre commits. Filen säger att listan speglar sidan `/vocabulary` på Emils webbplats. Den sidan lästes inte ⚠️, eftersom skillfilen är ögonblicksbilden.

**Licens:** MIT, © 2026 Emil Kowalski. Skillen kräver att ordlistans förklaringar citeras ordagrant. Vi skriver i stället egna svenska förklaringar och anger källan, så inget behöver följa med.

**Vad det är:** en omvänd ordlista. Den gör en vag beskrivning av en rörelse ("det studsiga när en popup öppnas") till rätt term (*Pop in*), så att användaren kan beställa effekten av en designer eller en AI. Den namnger bara; den bygger inte.

**Hur det fungerar:**
- Läs efter avsikt, inte nyckelord. Ge den bästa termen först och en eller två alternativ med skillnaden.
- **Tolv grupper med cirka 90 termer:**
  - in och ut
  - ordning och tid
  - förflyttning
  - mellan tillstånd
  - scroll
  - återkoppling
  - kurvor
  - fjädrar
  - loopar
  - detaljer
  - prestanda
  - principer.
- Hittar den ingen term säger den det, i stället för att hitta på.

**Kvalitet och underhåll:** samma repo som `emil-animate`: 46 586 stjärnor, tre bidragsgivare och senaste push 2026-10-11. Inga ärenden gäller just den här skillen. Ärende #31 (öppet) gäller `animate`, inte ordlistan: att Tailwind-klasser som `tw-animate-css` ska räknas till de billiga verktygen.

**Det bästa vi kan ta:**
- Indelningen och urvalet av termer. → `rorelse/ordlista.md`, med svenska ord, engelska inom parentes och egna förklaringar.
- Formen för en exakt beskrivning, där vi lägger till parametrar: vad, utlösare, egenskaper, längd, kurva och vad som händer med `reduce`. Det fyller guidens krav att en effekt från en referens beskrivs i ord och parametrar (`guide/2-6-rorelse.md`, *Effekter från referenser*).

**Var det hamnar hos oss:** delfilen `ordlista.md` i skillen `rorelse`. Ingen egen skill, eftersom en ordlista inte är ett jobb (`guide/bilaga-b-skills.md`, ett jobb per skill).

**Passar vår stack?** Ja, den är oberoende av stack. Den måste översättas till svenska, och flera termer saknar etablerade svenska ord; där behålls det engelska ordet inom parentes.

**Risker och flaggor:**
- Kravet på ordagranna citat krockar med vårt sätt att destillera med egna ord. Vi följer vårt eget.
- Ordlistan beskriver också effekter vi förbjuder, som loopar, parallax och skakning. I vår ordlista står förbudet vid termen.
- Ingen telemetri, ingen betalvägg och ingen inloggning.
