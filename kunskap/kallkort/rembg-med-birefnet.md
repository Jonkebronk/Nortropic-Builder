# rembg med BiRefNet

**Källa:** lästa 2026-10-16.
- **rembg:** https://github.com/danielgatis/rembg, commit cd8f3665dd (2026-10-10), PyPI-version 2.0.85 (release 2026-09-20).
  - Lästa delar: README i sin helhet, `rembg/commands/i_command.py`, `rembg/session_factory.py`, `rembg/sessions/*` och `rembg/matting.py`.
- **BiRefNet:** https://github.com/ZhengPeng7/BiRefNet, commit c4d649666c (2026-10-11).
  - Lästa delar: README med modellzoo och träningsmängder, release `v1` (ONNX-filer) och HF-kort och API för ZhengPeng7/* på https://huggingface.co/ZhengPeng7.
- **DIS5K:** villkor i https://github.com/xuebinqin/DIS/blob/main/DIS5K-Dataset-Terms-of-Use.pdf.
- **P3M-10k:** avtal på https://jizhizili.github.io/files/p3m_dataset_agreement/P3M-10k_Dataset_Release_Agreement.pdf.
- **BRIA:** HF-API för briaai/RMBG-2.0 och RMBG-1.4.

**Licens:**
- **rembg-koden:** MIT. Underhållaren skriver i [#837](https://github.com/danielgatis/rembg/issues/837) att MIT "covers the source code in this repository only. It does not cover the model files". Releasen `v0.0.0` är bara "a hosting convenience".
- **Per modell:**
  - **birefnet-general, -general-lite, -portrait, -hrsod, -dis, -cod och -massive:** vikterna är MIT enligt BiRefNet-repot och HF-korten (`license: mit` på BiRefNet, BiRefNet_lite, -portrait, -HRSOD, -DIS5K, -COD, _HR, -matting och _dynamic). Massive finns inte på HF, bara i GitHub-releasen.
    - **Träningsdata, osäkert:** general, general-lite, DIS och massive är tränade på bland annat **DIS5K**. DIS5K:s villkor säger "available for non-commercial use in research or educational purpose" och att kommersiell användning är förbjuden "even after copying, editing, processing".
    - General tränas också på DUTS, HRSOD, UHRSD, HRS10K, P3M-10k och humans.
    - HRSOD-varianten bygger på DUTS, HRSOD och UHRSD. ⚠️ Licenserna för de mängderna lästes inte.
    - **Portrait:** P3M-10k och humans. P3M-avtalet säger "The Dataset is under MIT license", och schirrmacher/humans är Apache-2.0 på HF.
    - Om datamängdens villkor följer med till vikterna är en juridisk tolkning, inte juridisk rådgivning. Portrait har den renaste kedjan.
  - **bria-rmbg (RMBG-2.0), standardmodellen:** HF anger licensen "bria-rmbg-2.0" med länk till CC BY-NC 4.0. Modellen är gated. BiRefNet-README:n säger att BRIA:s vikter är "for only non-commercial use". RMBG-1.4 är "source-available model for non-commercial use".
  - **u2net, u2netp, u2net_human_seg, silueta:** U-2-Net är Apache-2.0 enligt #837. Underhållaren saknar konverteringsunderlag för u2net.onnx.
  - **isnet-general-use:** koden i xuebinqin/DIS är Apache-2.0, men modellen är tränad på DIS5K, som har samma villkor som ovan.
  - **ViTMatte (`-vm`):** HF-korten för hustvl/vitmatte-* anger Apache-2.0. ⚠️ Licenserna för träningsmängderna Distinctions-646 och Composition-1k lästes inte.
  - **withoutbg och atlascloud:** molntjänster där bilden lämnar datorn. De kräver API-nyckel och har egna villkor.

**Vad det är:** rembg är ett Python-verktyg (CLI, bibliotek och HTTP-server) som tar bort bakgrunden i foton med ONNX-modeller via onnxruntime. BiRefNet är en segmenteringsmodell från ZhengPeng7 som rembg kör i flera tränade varianter.

**Hur det fungerar:**
- **Installation:** `pip install "rembg[cpu,cli]"`. Kräver Python ^3.11 enligt `pyproject.toml`.
- **Körning:** `rembg i -m birefnet-portrait in.jpg ut.png`. Mappar körs med `rembg p` och HTTP-servern med `rembg s`.
- **Standardmodellen** är `bria-rmbg` sedan [#845](https://github.com/danielgatis/rembg/issues/845) (2026-08-17). Tidigare var det u2net. En kommentar i ärendet invänder att det är fel att göra en modell med icke-tillåtande licens till standard. **Därför ska `-m` alltid anges.**
- **Kantlägen** (README, "Choosing an edge mode"):
  - Utan flagga (naive): för hårda kanter, som produkter och bilar.
  - `-dc` (decontaminate): färgade glorior, billigt.
  - `-a` (alpha matting): fel form på masken, långsamt och kan misslyckas att konvergera.
  - `-vm` (ViTMatte): finast hår, extra nedladdning.
  - `-ppm` gör masken helt binär. Den ska inte kombineras med `-dc`.
  - `-om` ger bara masken.
  - README:n rekommenderar `birefnet-portrait` med `-dc` för porträtt.
- **Vikter:** laddas ner vid första körningen från `https://github.com/danielgatis/rembg/releases/download/v0.0.0/<fil>.onnx` till `$REMBG_HOME`, `~/.rembg/models` eller `$XDG_DATA_HOME/rembg`. md5 kontrolleras.
  - Filnamn och storlek är identiska med ZhengPeng7:s release `v1`, till exempel `BiRefNet-general-epoch_244.onnx` på 972 666 916 byte och `BiRefNet-portrait-epoch_150.onnx` på 972 666 916 byte. ZhengPeng7 konverterade själv från `.pth` till ONNX enligt sin README.
  - Sannolikt är rembg:s filer kopior av ZhengPeng7:s ONNX-filer. ⚠️ Det är inte verifierat med hash.
- **Storlek:** birefnet-general, -portrait och -massive är cirka 0,97 GB vardera. general-lite är cirka 224 MB. bria-rmbg är cirka 1,02 GB.

**Kvalitet och underhåll:**
- **rembg:** 25 100 stjärnor, cirka 86 bidragsgivare, 2 öppna ärenden och täta releaser (v2.0.80–85 under augusti och september 2026).
- **BiRefNet:** 4 293 stjärnor och cirka 11 bidragsgivare.
- **Kända problem:**
  - Minnesläcka i servern `rembg s` under last, ungefär 500 MB per bild i CPU-läge enligt en kommentar. Ärendet stängdes som inaktivt utan fix ([#752](https://github.com/danielgatis/rembg/issues/752)).
  - Servern drog CPU även i vila. Fixad ([#824](https://github.com/danielgatis/rembg/issues/824)).
  - Modellen hölls inte kvar i minnet ([#816](https://github.com/danielgatis/rembg/issues/816)).
  - BiRefNet är långsammare i rembg än i källkoden ([#687](https://github.com/danielgatis/rembg/issues/687)), och resultaten skiljer sig från `.pth`-versionen ([#686](https://github.com/danielgatis/rembg/issues/686)).
  - Alpha matting är mycket långsam ([#535](https://github.com/danielgatis/rembg/issues/535)).
  - GPU-varianten faller tyst tillbaka på CPU ([#841](https://github.com/danielgatis/rembg/issues/841)).
  - Frågan om BRIA får användas kommersiellt stängdes utan svar ([#775](https://github.com/danielgatis/rembg/issues/775)).

**Det bästa vi kan ta:**
- CLI-raden med uttryckligt `-m birefnet-portrait` för personer och `-m birefnet-general` eller `-general-lite` för föremål, kombinerat med `-dc`.
- Tabellen över kantlägen i README:n som beslutsregel.
- Batch med `rembg p`. Servern behövs inte, vilket undviker #752.
- `MODEL_CHECKSUM_DISABLED` behövs bara om vi konverterar vikterna själva.
- Underhållarens råd i #837: konvertera själv från uppströmscheckpointen om vi behöver en verifierbar ursprungskedja.

**Var det hamnar hos oss:** bekräftar det preliminära. rembg blir ett verktyg i bildkedjan, körs lokalt på Johnnys Mac och aldrig på sajten, och modellen väljs alltid uttryckligen. Två justeringar:
- **birefnet-portrait** bör vara förstahandsvalet även för icke-porträtt tills licensfrågan om DIS5K är prövad. birefnet-general och -general-lite bygger på DIS5K. Det är ett förslag.
- Gör en regel eller kontroll i bildskriptet som vägrar köra utan `-m`.

**Passar vår stack?** Ja som förbyggsverktyg. Det rör inte Astro eller sajten, och utdata blir PNG med alfa som läggs i `src/assets/` och sedan går genom sharp. Det som måste översättas är bara instruktionen. Python ^3.11 och cirka 1 GB modell per variant kräver diskutrymme.

**Risker och flaggor:**
- **[LICENS]** Standardmodellen bria-rmbg är icke-kommersiell. Träningsdatan i DIS5K är icke-kommersiell för BiRefNet general, lite, DIS och massive samt isnet. Licensen för träningsdatan bakom ViTMatte är okänd.
- **[GDPR]** `withoutbg` och `atlascloud` skickar bilden till tredje part. Använd dem aldrig för kundfoton.
- Nedladdning sker vid första körningen från GitHub, så nätverk krävs en gång.
- Inga konton behövs för de lokala modellerna. Telemetri: gradio i `rembg s` har `analytics_enabled=False`, och ingen annan telemetri hittades i koden.
- ⚠️ Provkörningen görs av en annan agent. Kvaliteten är inte bedömd här.

## Provkörning 2026-10-16 (tillägg från lager 7)

- **Uppsättning:** rembg 2.0.85 från PyPI i en egen venv (Python 3.12) i scratch, `U2NET_HOME` i scratch, modellen `birefnet-portrait` vald uttryckligen (973 MB ONNX, md5 kontrollerad av rembg). `birefnet-general` laddades inte ner (DIS5K). Ingen kod ur nedladdade repon kördes.
- **Indata:** övningssajtens två foton som redan var frilagda mot vitt (326 × 508 och 529 × 720 px), bara lästa.
- **Tid:** 3,5–6,5 minuter per bild på M1 med 8 GB, med swap nästan full av andra processer. Att ladda modellen första gången tog 11 minuter, mest nedladdning.
- **Resultat:** utan `decontaminate` blev det en grå kant runt ljusa föremål mot ljus bakgrund; med `decontaminate` (`-dc`) rena kanter mot både ljus och mörkgrön bakgrund. Dagens kopia, där vitt gjorts genomskinligt, har en vit kant som syns mot mörk bakgrund. Upplösningen ändras inte, och en mörk kontur från en tidigare frilägning följer med.
- **Bilder:** `scratchpad/premium/rembg-prov/ut/` (`*_jamforelse.png`, `*_detalj.png`).
- **Slutsats:** ta in med `birefnet-portrait` och `-dc` som standard; prövas igen på ett riktigt original när kundens nya foton kommer.
