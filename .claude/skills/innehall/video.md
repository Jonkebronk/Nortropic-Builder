# Video, ljud och undertexter

Delfil till `innehall`. Regeln om undertexter och om lokal transkribering står i `guide/2-7-innehall.md` (N2). Autouppspelning, paus och `prefers-reduced-motion` står i `guide/2-6-rorelse.md`. Filstorlek och laddning står i `guide/2-8-teknik-och-kvalitet.md`.

## Vad som ska uppnås

- **Klipp med tal har undertexter** som en WebVTT-fil i ett `<track kind="captions" srclang="sv">`, aldrig inbrända i bilden. Undertexter krävs för förinspelad video med ljud (WCAG 2.2, 1.2.2, nivå A), och inbränd text når inte skärmläsare och går inte att rätta (1.4.5). 📄 [W3C, Understanding 1.2.2](https://www.w3.org/WAI/WCAG22/Understanding/captions-prerecorded.html)
- **Ett klipp utan ljud** som bara visar en stämning behöver inga undertexter, men det som är viktigt i bilden står också i text på sidan. Ett klipp som spelas automatiskt och längre än fem sekunder kan pausas (WCAG 2.2.2; → 2-6).
- **Kundens egna klipp först**, som för foton (→ 2-7, *Kundens egna foton först*): tio till trettio sekunder från telefonen säger mer än en stockfilm. *(Härlett, `kunskap/research/2026-10-15_kompetensluckor-anteckningar/lager-6-7-rorelse-innehall.md`, avsnitt 6.)*
- **Ljudet lämnar aldrig datorn.** Intervjun och kundens klipp transkriberas lokalt (→ 2-7, *En inspelad intervju transkriberas lokalt*).

## Verktygen

- **Transkribering:** KB-Whisper i whisper.cpp. KB-Whisper large har cirka 47 % lägre ordfelfrekvens än OpenAI:s large-v3 på svenska (5,4 mot 7,8 % på FLEURS). Stilen *strict* ger närmare ordagrann text för intervjucitat. Stilen *subtitle*, som ger kortare text, finns inte i GGML-format för whisper.cpp; där används standard eller *strict*. 📄 [KBLab/kb-whisper-large](https://huggingface.co/KBLab/kb-whisper-large) (Apache-2.0); [whisper.cpp](https://github.com/ggml-org/whisper.cpp) (MIT, v1.9.5)
  - Språket sätts uttryckligen till svenska (`-l sv`); standard är engelska.
  - `-ovtt` ger WebVTT direkt. `--vad` med Silero-modellen skickar bara tal till modellen och minskar text som hittas på i tystnad, ett känt problem ([whisper.cpp #1724](https://github.com/ggml-org/whisper.cpp/issues/1724)).
  - Indata är 16-bitars WAV i 16 kHz mono, som FFmpeg gör om från telefonens format.
- **Omkodning:** FFmpeg lokalt: en kort MP4 som börjar spela innan den laddats klart, ljudlös när den är dekor, och en posterbild. Varje fil under 25 MiB, Cloudflares gräns för statiska filer. 📄 [FFmpeg legal](https://ffmpeg.org/legal.html); Cloudflare Workers limits (→ researchen ovan, avsnitt 6)
- Licenser och versioner står i `kallor.md`. faster-whisper behövs inte bredvid whisper.cpp på en Mac: den saknar stöd för Apple Silicons grafikprocessor. Remotion (egen licens, ändras i 5.0) prövas först när en videomall ska återanvändas för många kunder.

## Undertexternas form

- Maskintexten är ett utkast. Den läses mot ljudet innan den publiceras, och ett citat i texten på sajten kontrolleras ord för ord (→ 2-7, *Faktakontrollen*).
- Namn, ortnamn och fackord rättas efter `fakta.md` och kundens ordlista i `rost.md`.
- Högst två rader per bild och radbrytning vid naturliga pauser. ⚠️ Teckenantal per rad och läshastighet är inte belagda här; normen för svensk tv-textning är inte läst. Se `kallor.md`, *Kända luckor*.

## Förbjudet

- Att ladda upp kundens ljud eller video till en molntjänst för transkribering.
- Inbrända undertexter i stället för en textfil.
- Att publicera en maskintranskribering som citat utan att ha lyssnat.
- Att sprida Homebrews FFmpeg, som är byggd med GPL-delar. Att köra den lokalt och publicera utdata påverkar inte sajterna (⚖️ tolkning, inte juridisk rådgivning).
