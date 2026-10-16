# FFmpeg

**Källa:** [ffmpeg.org/legal.html](https://ffmpeg.org/legal.html), [github.com/FFmpeg/FFmpeg](https://github.com/FFmpeg/FFmpeg) (senaste commit 3e6cd5e, 2026-10-16), Homebrews formel [`Formula/f/ffmpeg.rb`](https://github.com/Homebrew/homebrew-core/blob/master/Formula/f/ffmpeg.rb) (FFmpeg 9.0.2). Läst 2026-10-16. ⚠️ Själva kommandoreferensen (ffmpeg.org/ffmpeg.html) har jag inte läst i sin helhet; kommandona nedan bygger på whisper.cpp:s README och vedertagna flaggor och prövas innan de skrivs in i ett skript.

**Licens:**
- FFmpeg är LGPL 2.1 eller senare som standard. Valfria delar är GPL, och används de gäller GPL för hela FFmpeg (legal.html).
- Homebrews ffmpeg byggs med `--enable-gpl`, `--enable-version3`, libx264 och libx265 och är därför **GPL-3.0-or-later**.
- Vad det kräver av oss: GPL och LGPL gäller den som *sprider* FFmpeg. Vi kör programmet lokalt och publicerar bara utdata (videofiler), och då ställer licensen inga krav på sajterna. ⚖️ Tolkning, inte juridisk rådgivning.
- Patent: legal.html säger att H.264 och liknande standarder kan omfattas av patent och att kommersiell användning kan kräva licens. ⚠️ Inte utrett för vårt bruk (korta klipp på kundens egen sajt).

**Vad det är:** Kommandoradsverktyget och biblioteken som nästan all videobehandling bygger på. Det läser telefonens format (MOV, HEVC) och skriver webbvänliga MP4 och WebM, stillbilder och ljud.

**Hur det fungerar (det vi behöver):**
- Ljud till transkribering: `ffmpeg -i klipp.mov -ar 16000 -ac 1 -c:a pcm_s16le ljud.wav` (whisper.cpp README).
- Webbklipp: H.264 i MP4 med `-movflags +faststart` så att uppspelningen börjar innan filen laddats klart; ljudlös loop med `-an`; en posterbild som en enskild bildruta (`-frames:v 1`). ⚠️ Exakta värden för kvalitet och storlek prövas på det första klippet.
- Undertexter läggs som en separat WebVTT-fil (`<track>`), inte inbrända i bilden: inbränd text når inte skärmläsare och kan inte rättas (WCAG 2.2, 1.4.5; → `guide/2-7-innehall.md`).

**Kvalitet och underhåll:** 65 267 stjärnor på GitHub-spegeln, cirka 2 770 bidragsgivare, commits dagligen. Ärenden förs i FFmpegs egen Trac, inte på GitHub. Mycket moget; inga kända problem som rör vårt bruk.

**Det bästa vi kan ta:** omkodningen till en kort, ljudlös MP4 under Cloudflares gräns på 25 MiB per fil (→ `kunskap/research/...lager-6-7-rorelse-innehall.md`, avsnitt 6), posterbilden och ljudet till KB-Whisper.

**Var det hamnar hos oss:** verktyg lokalt, när den första kunden har ett klipp (N2). Reglerna för klipp, undertexter och posterbild står i skillen `innehall`, delfilen `video.md`; autouppspelning och paus i `guide/2-6-rorelse.md`.

**Passar vår stack?** Ja. Utdata är statiska filer som Astro serverar från `public/` eller `src/assets/`. Cloudflare Workers tar högst 25 MiB per fil. Inget behöver översättas.

**Risker och flaggor:** GPL-bygget från Homebrew ska aldrig följa med i något vi sprider. Ingen telemetri, inget konto. Telefonklipp kan bära platsdata i metadata; den tas bort, som för foton (→ `guide/2-7-innehall.md`, *GPS och annan platsdata*). ⚠️ Vilken flagga som säkrast tar bort metadata (`-map_metadata -1`) prövas på ett riktigt klipp.
