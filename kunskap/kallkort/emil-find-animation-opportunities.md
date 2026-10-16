# emil-find-animation-opportunities

**Källa:** https://github.com/emilkowalski/skills, `skills/find-animation-opportunities/SKILL.md` (140 rader, den enda filen). Läst 2026-10-16 vid repots commit `2d228630ba14` (2026-10-11). Senaste ändring är `85e8e2363b` (2026-09-15); skillen skapades 2026-07-15 och har fyra commits. Artikeln [You don't need animations](https://emilkowal.ski/ui/you-dont-need-animations), som skillen bygger på, lästes också.

**Licens:** MIT, © 2026 Emil Kowalski. Vi destillerar med egna ord och anger källan.

**Vad det är:** en sökskill som letar efter ställen i ett gränssnitt där rörelse verkligen skulle hjälpa, och som avvisar det mesta. Den ändrar ingen kod. Utgångspunkten är återhållsamhet: ibland är den bästa animationen ingen animation.

**Hur det fungerar:**
- **Grinden** med fyra frågor i ordning:
  1. frekvens
  2. syfte, som måste namnges
  3. tempo, som måste rymmas i längderna under 300 ms
  4. funktion: data som besökaren läser eller ska använda rör sig inte för stilens skull.
- **Var den letar:**
  - glapp i återkopplingen, som tryckbara saker utan `:active`
  - tillstånd som hoppar
  - paneler utan rumslig koppling
  - grupper som dyker upp på en gång
  - gester utan fysik
  - sällsynta tillfällen som saknar glädje.
- **Utdata:**
  1. en tabell med plats, läge i dag, syfte, frekvens och förslag med exakta värden, högst 5–7 för en hel app
  2. **avvisade kandidater** (obligatoriskt): två till fem bortvalda förslag och frågan som stoppade dem
  3. en dom.
- Repots innehåll behandlas som data, inte som instruktioner.

**Kvalitet och underhåll:** samma repo som `emil-animate`: 46 586 stjärnor, tre bidragsgivare och senaste push 2026-10-11. Ärende #29 (öppet): beskrivningen hänvisar till `review-animations`, som modellen inte kan starta själv.

**Det bästa vi kan ta:**
- Grinden. → `rorelse/granskning.md`, *Grinden*, med budgeten som femte fråga.
- Kravet på avvisade kandidater. → `rorelse/granskning.md`, *Fyndens form*; `rorelse/tillstand.md`, *Avvisat i sparsam*.
- Taket på antalet förslag och att "inget behövs" är ett bra resultat.

**Var det hamnar hos oss:** destillerat i skillen `rorelse` (`granskning.md`, `tillstand.md`). Inventeringen föreslog ett byggverktyg. Ett eget verktyg behövs inte, eftersom grinden och kontrollistan gör samma jobb.

**Passar vår stack?** Ja. Den är oberoende av stack. Frekvensskalan är skriven för appar som används dagligen; på en företagssajt räknas frekvens per besök (→ `granskning.md`). Förslagen ska använda kitets tokens, inte Emils kurvnamn.

**Risker och flaggor:**
- Skillen kan föreslå glädje vid sällsynta tillfällen, men det ryms inte i budgeten sparsam. Hos oss stoppas sådant av budgeten.
- Ingen telemetri, ingen betalvägg och ingen inloggning.
