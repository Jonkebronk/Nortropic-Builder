# faster-whisper och Remotion

**Källa:**
- faster-whisper: [github.com/SYSTRAN/faster-whisper](https://github.com/SYSTRAN/faster-whisper), README, senaste commit c45e173 (2026-10-15), release v1.2.1 (2025-10-31). Läst 2026-10-16.
- Remotion: [github.com/remotion-dev/remotion](https://github.com/remotion-dev/remotion), `LICENSE.md` och PR [#3750](https://github.com/remotion-dev/remotion/pull/3750) (*Prepare Remotion 5.0*, öppen), release v4.0.536 (2026-10-16). [remotion-dev/skills](https://github.com/remotion-dev/skills), README (senaste commit 1441a11, 2026-10-16). Läst 2026-10-16. ⚠️ remotion.dev/docs/license och remotion.pro/terms lästes inte; licenstexten i repot räckte för slutsatsen.

**Licens:**
- faster-whisper: MIT.
- Remotion: egen licens. Gratis för en enskild person, för ett vinstdrivande företag med högst tre anställda, för ideella organisationer och vid utvärdering. Andra behöver *Company License*. Det är förbjudet att sälja eller licensiera en egen variant av Remotion.
- **Ändringen i 5.0** (PR #3750): konsulter räknas in i företagets storlek, och företagslicensen knyts till nya villkor. Ett företag som i dag arbetar med underkonsulter kan alltså behöva licens från 5.0.
- remotion-dev/skills: GitHub visar ingen licens ⚠️. Utan licens får skillsen bara läsas.

**Vad det är:** faster-whisper kör Whisper-modeller med CTranslate2 och är enligt README upp till fyra gånger snabbare än OpenAI:s Whisper. Remotion gör video av React-komponenter, så att samma videomall kan fyllas med nytt innehåll.

**Hur det fungerar:**
- faster-whisper är ett Python-bibliotek. KB-Whisper finns i CTranslate2-format och laddas direkt. Snabbheten bygger på CUDA; på Mac körs den på processorn med `int8`. Apple Silicon och Metal stöds inte ([#911](https://github.com/SYSTRAN/faster-whisper/issues/911), [#515](https://github.com/SYSTRAN/faster-whisper/issues/515)).
- Remotion renderar en React-komposition bildruta för bildruta till MP4. Skillsen (`/remotion-best-practices` med flera) lär en agent att skriva kompositionerna.

**Kvalitet och underhåll:** faster-whisper 25 890 stjärnor, cirka 50 bidragsgivare, aktivt. Remotion 64 499 stjärnor, cirka 460 bidragsgivare, release varje vecka; 5.0 planeras i ärende [#3310](https://github.com/remotion-dev/remotion/issues/3310). remotion-dev/skills 5 229 stjärnor.

**Det bästa vi kan ta:** ingenting nu. faster-whisper behövs inte när whisper.cpp kör KB-Whisper med Metal på samma Mac. Remotion blir intressant först när en videomall ska återanvändas för många kunder, till exempel ett kort klipp med tre jobb på en ort.

**Var det hamnar hos oss:** ingenstans nu. faster-whisper släpps till förmån för whisper.cpp (kortet *KB-Whisper och whisper.cpp*). Remotion prövas först i N4, när videomallar för många kunder är aktuella, och licensen läses då på nytt mot 5.0 och Nortropics storlek med konsulter.

**Passar vår stack?** faster-whisper: dåligt på en Mac utan NVIDIA. Remotion: React tillåts nu (`BESLUT.md` 2026-10-16, *React, Tailwind och JavaScript tillåts*), men Remotion körs vid bygget och levererar en videofil; den rör inte sajtens kod. Videon måste ändå ha undertexter och följa rörelsereglerna (→ `guide/2-6-rorelse.md`).

**Risker och flaggor:** Remotions licens ändras i 5.0 och räknar då konsulter. remotion-dev/skills saknar licens. faster-whisper drar in CTranslate2 och PyAV, utan vinst på Mac. Ingen telemetri känd ⚠️ (inte granskat i koden).
