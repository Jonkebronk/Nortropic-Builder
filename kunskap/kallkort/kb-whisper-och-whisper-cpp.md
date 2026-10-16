# KB-Whisper och whisper.cpp

**Källa:**
- KB-Whisper: [huggingface.co/KBLab/kb-whisper-large](https://huggingface.co/KBLab/kb-whisper-large), modellkortet ändrat 2025-08-27, och syskonen tiny, base, small och medium. Läst 2026-10-16.
- whisper.cpp: [github.com/ggml-org/whisper.cpp](https://github.com/ggml-org/whisper.cpp), README och `examples/cli/README.md`, release v1.9.5 (2026-10-06), senaste commit 0c7be69 (2026-10-12). Läst 2026-10-16.

**Licens:**
- KB-Whisper: Apache-2.0 (modellkortets `license`). Kräver att licensen och eventuella NOTICE följer med om vikterna sprids vidare, och att ändringar anges. Att köra modellen och använda utdata kräver inget.
- whisper.cpp: MIT. Upphovsrättsraden följer med om koden sprids. Vi sprider den inte.
- ⚠️ Träningsdatan (undertexter, Riksdagen, Isof, NST) har egna villkor. Det påverkar inte modellicensen enligt kortet, men har inte prövats juridiskt.

**Vad det är:** KB-Whisper är Kungliga bibliotekets Whisper-modeller, tränade vidare på över 50 000 timmar svenskt tal. whisper.cpp är en C/C++-motor som kör Whisper-modeller lokalt, också på Apple Silicon via Metal. Tillsammans ger de svensk transkribering och undertexter utan att ljudet lämnar datorn.

**Hur det fungerar:**
- KB-Whisper finns i fem storlekar (tiny–large-v3) och i formaten Hugging Face, GGML för whisper.cpp, ONNX och CTranslate2 (faster-whisper, WhisperX). GGML-filen för large är 1,1 GB kvantiserad (`ggml-model-q5_0.bin`) och 3,1 GB okvantiserad.
- Ordfelfrekvens (WER, %, KBLab mot OpenAI): large 5,4 mot 7,8 (FLEURS), 4,1 mot 9,5 (CommonVoice), 5,2 mot 11,3 (NST). Snittet är cirka 47 % lägre, som inventeringen säger. Medium ger 6,6/5,4/5,8.
- Tre stilar sedan maj 2025: *standard*, *subtitle* (kortare, för undertexter) och *strict* (närmare ordagrant, för intervjucitat). Valet görs med `revision` i Hugging Face-gränssnittet. GGML-filer finns för standard och *strict*, men inte för *subtitle* (enligt Hugging Face-API:t för large, kontrollerat av en annan agent samma dag). För undertexter med whisper.cpp används alltså standard.
- whisper.cpp: `whisper-cli -m ggml-model-q5_0.bin -l sv -ovtt -f intervju.wav` ger en WebVTT-fil (`-ovtt`; `-osrt` ger SRT). `-l` är engelska som standard och måste sättas till `sv`. `-ml` sätter radlängd och `-sow` delar på ord. Indata ska vara 16-bitars WAV: `ffmpeg -i in.m4a -ar 16000 -ac 1 -c:a pcm_s16le ut.wav` (README).
- `--vad` med Silero-VAD-modellen skickar bara tal till Whisper, vilket minskar text i tystnad och sparar tid.

**Kvalitet och underhåll:**
- whisper.cpp: 54 432 stjärnor, cirka 1 070 bidragsgivare, release v1.9.5 2026-10-06. Kända problem: [text i tystnad](https://github.com/ggml-org/whisper.cpp/issues/1724) (öppet, också för andra språk än engelska, [#2539](https://github.com/ggml-org/whisper.cpp/issues/2539)) och en [hallucinationsregression i 1.6.2 på CUDA](https://github.com/ggml-org/whisper.cpp/issues/2191) (stängd).
- KB-Whisper large: 74 gillanden och cirka 45 000 nedladdningar i månaden enligt Hugging Face-API:t; utgivare är KBLab, Kungliga biblioteket. Artikeln publicerades 2025-05-23 (`kunskap/research/...lager-6-7-rorelse-innehall.md`, avsnitt 3).

**Det bästa vi kan ta:**
- Modellkortets tabeller för att välja storlek: medium räcker för utkast, large för citat och undertexter.
- `strict` för intervjun, där kundens exakta ord ska till citatbanken. `subtitle` finns bara i Hugging Face-formatet.
- whisper.cpp:s `-ovtt` och `--vad` (README, *Voice Activity Detection*).

**Var det hamnar hos oss:** verktyg lokalt. Transkriberingen av intervjun hör till lager 1 (`guide/2-7-innehall.md`, *En inspelad intervju transkriberas lokalt*); undertexterna till lager 7. Reglerna står i skillen `innehall`, delfilen `video.md`. Installeras när den första inspelade intervjun eller det första klippet med tal kommer.

**Passar vår stack?** Ja. Allt körs på Johnnys Mac (M1, 8 GB). Large-q5_0 (1,1 GB) ryms i minnet; Metal används automatiskt. Utdata är WebVTT, som Astro lägger som `<track kind="captions" srclang="sv">` intill `<video>`. Inget når Cloudflare utom textfilen. Inget behöver översättas: modellen är svensk.

**Risker och flaggor:**
- Hallucinationer i tystnad och i musik: kör med `--vad` och läs alltid igenom texten. En maskintext är ett utkast, aldrig ett citat förrän den är kontrollerad mot ljudet.
- Personuppgifter: intervjun innehåller kundens röst och ofta andras namn. Den ska stanna lokalt (→ `guide/3-3-sakerhet-och-installningar.md`).
- Ingen telemetri, inget konto. Modellen hämtas från Hugging Face utan inloggning.
- Krockar: ingen skill. Exempelkoden i modellkortet använder CUDA; på Mac är whisper.cpp vägen, inte PyTorch-exemplet.
