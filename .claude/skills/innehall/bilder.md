# Bilder: alt-text, bildtext, fotolista och bearbetning

Delfil till `innehall`. Reglerna om samtycke, källa och licens per bild, ärlighetsregeln, AI-märkning, text i bild, GPS och stockbilder står i `guide/2-7-innehall.md`, *Bilder*, och gäller före allt här. Format, storlek och laddning står i `guide/2-8-teknik-och-kvalitet.md`; hur stort en bild får visas i `guide/2-5-yta.md` (G1, högst cirka 1,4 gångers förstoring).

## Alt-text

**Först frågan om bilden behöver en.** W3C WAI:s beslutsträd, i ordning: 📄 [W3C WAI, An alt Decision Tree](https://www.w3.org/WAI/tutorials/images/decision-tree/); WCAG 2.2, 1.1.1

1. **Innehåller bilden text?** Står texten också intill bilden: `alt=""`. Annars står texten i `alt`. Text i bild är bara tillåten i logotyper och skyltar (→ 2-7).
2. **Är bilden en länk eller knapp?** Då säger `alt` vart länken går eller vad som händer, inte hur bilden ser ut. En logotyp i en länk där företagsnamnet också står i text får `alt=""`.
3. **Bär bilden information?** Då en kort text om informationen.
4. **Är den dekoration eller upprepar den texten intill?** `alt=""`.
5. **Är den komplex**, som en karta eller ett schema? Kort `alt` om vad den visar, och informationen i text på sidan: adressen, vägen, hållplatsen. W3C påpekar själva att trädet inte täcker alla fall.
6. **Visar flera bilder en enda uppgift**, som stjärnorna i ett betyg? En av dem bär texten (*4,8 av 5*), resten får `alt=""`. I ett galleri får varje bild sin egen. 📄 [W3C WAI, Groups of Images](https://www.w3.org/WAI/tutorials/images/groups/)

`alt` utelämnas aldrig helt; då läser vissa skärmläsare upp filnamnet. 📄 W3C WAI, *Decorative Images*; [DIGG, Beskriv med text allt innehåll som inte är text](https://www.digg.se/webbriktlinjer/alla-webbriktlinjer/beskriv-med-text-allt-innehall-som-inte-ar-text)

**Sedan formen.** 📄 [1177, Riktlinjer för alt-texter och bildtexter](https://www.1177.se/riktlinjer-och-material/riktlinjer-for-bild-och-video/riktlinjer-for-alt-texter-och-bildtexter/)

- En kort, tydlig mening som slutar med punkt. Sikta på cirka 80 tecken.
- Skriv vad bilden ger besökaren, inte hur den ser ut.
- Nämn inte kön, ålder, funktionsvariation, kläder eller annat utseende om det inte hör till innehållet.
- Skriv *foto* eller *illustration* bara när det spelar roll, och aldrig *bild på* eller *foto av*: skärmläsaren säger redan att det är en bild. Det viktigaste står först. 📄 1177; DIGG; [W3C WAI, Tips and Tricks](https://www.w3.org/WAI/tutorials/images/tips/)
- Inga omdömen: *en svart bil*, inte *en snygg bil*. 📄 DIGG
- Upprepa inte bildtexten eller texten intill. 📄 DIGG
- Säg inte mer än bilden visar. En person på en behandlingsbrits kallas inte *patient* i alt-texten; det är en uppgift om hälsa som kräver samtycke (→ 2-7, *Bilder av personer kräver samtycke*).

**Och sökbarheten.** Google använder alt-texten, filnamnet och texten runt bilden för att förstå den. Alt-texten ska vara beskrivande och passa sammanhanget, inte en lista med sökord; tjänst och ort får komma med där de hör hemma. Filnamnet är kort och beskrivande, till exempel `klinkergolv_badrum.jpg`, inte `IMG_4711.jpg`. Bilden ligger i `<img>` eller `<picture>`, inte som CSS-bakgrund, för att synas i bildsök. Tekniken i övrigt → 2-8. 📄 [Google Search Central, Image SEO best practices](https://developers.google.com/search/docs/appearance/google-images) (uppdaterad 2026-03-02); 1177, *Riktlinjer för namngivning av bilder*

Alt-texten skrivs när bilden läggs in, och kunden bekräftar den (→ 2-7, *Kontroll*). Astro kräver `alt` på `<Image>` och `<Picture>` (📄 [Astro, Images](https://docs.astro.build/en/guides/images/)).

## Bildtext

- Bildtexten syns för alla och hjälper besökaren att tolka bilden. Den bär sammanhanget som alt-texten inte ska upprepa: var, när, vilket jobb. 📄 1177, samma sida
- En AI-genererad eller fotorealistisk illustration märks i den synliga bildtexten, inte bara i `alt` (→ 2-7, ärlighetsregeln; AI-förordningen art. 50.4).
- Upprepa inte bildtexten i `alt`; skärmläsaren läser båda.

## Fotolistan (bildbeställningen)

Det som saknas blir en beställning med plats och syfte (→ 2-7, *Det som saknas blir en bildbeställning*). Listan följer Googles kategorier för företagsprofilen, så att en fotosession täcker både sajten och profilen. 📄 [Google Business Profile, tips for business-specific photos](https://support.google.com/business/answer/6123536?hl=en); [photo guidelines](https://support.google.com/business/answer/6103862?hl=en)

| Kategori | Minst | Exempel för en mottagning eller verkstad |
|---|---|---|
| Exteriör | 3 | Entrén från de håll besökare kommer, skylten, porten eller hissen |
| Interiör | 3 | Väntrum, behandlingsrum eller verkstad |
| Produkter eller utrustning | 3 | Det besökaren möter: britsen, verktygen, materialet |
| I arbete | 3 | Ägaren som utför de tjänster sajten säljer |
| Team | 3 | Ägaren och personalen, gärna mindre formellt |

Per bild står i beställningen:

- **Plats och syfte** på sajten, till exempel *första vyn, startsidan* eller *Hitta hit, den andra mottagningen*.
- **Format:** både liggande och stående av samma motiv, med luft runt motivet så att det går att beskära för mobil och dator utan att kapa en hand eller ett huvud (`mallar/granskning.md`: ett foto som kapas fäller).
- **Storlek och format:** minst dubbla bredden av den största visningen, så att bilden inte förstoras mer än cirka 1,4 gånger på en skärm med dubbel upplösning (→ 2-5, G1). En telefon räcker; ett foto som skickats i en chatt är ofta för litet, så originalfilen begärs. iPhones HEIC läses inte av sharps förbyggda version och görs om till JPEG först. 📄 [sharp, Installation](https://sharp.pixelplumbing.com/install) (format som stöds); [sharp#1105](https://github.com/lovell/sharp/issues/1105)
- **Video till profilen:** högst 30 sekunder, minst 720p. 📄 Google, *photo guidelines*
- **Ljus och äkthet:** skarpt, väl belyst, utan tunga filter eller AI-ändringar (Google). Telefontekniken (dagsljus, ren lins, ingen digital zoom) är rimlig men inte belagd ⚠️.
- **Personer:** skriftligt samtycke som gäller webben och går att ta tillbaka (→ 2-7). För en bild *i arbete* är en kollega eller anhörig som ställer upp enklare än en kund eller patient.
- **Det som inte får synas:** husnummer hos kunder, registreringsskyltar, skärmar och papper med kunduppgifter (→ 2-7, *GPS och annan platsdata*).

## Bearbetning

- **Frilägga:** rembg lokalt med modellen vald uttryckligen, `birefnet-portrait`, och med färgsanering (`-dc`) mot ljusa fransar. 📄 [rembg](https://github.com/danielgatis/rembg) (MIT för koden, inte för modellerna, enligt underhållaren i [#837](https://github.com/danielgatis/rembg/issues/837)); [BiRefNet-portrait](https://huggingface.co/ZhengPeng7/BiRefNet-portrait) (MIT, tränad på P3M-10k och en Apache-licensierad mängd)
  - Standardmodellen `bria-rmbg` (sedan augusti 2026) får inte användas: vikterna är CC BY-NC 4.0 och kräver kommersiellt avtal med BRIA. 📄 [briaai/RMBG-2.0](https://huggingface.co/briaai/RMBG-2.0)
  - `birefnet-general`, `-lite`, `-dis` och `-massive` är MIT-märkta men tränade på DIS5K, vars villkor bara tillåter forskning och undervisning. Om villkoren följer med vikterna är oprövat ⚠️; de används inte förrän Johnny avgjort det.
  - Molnmodellerna `withoutbg` och `atlascloud` skickar bilden ut och får inte användas.
  - Prövat 2026-10-16 på ett porträtt och ett behandlingsfoto som redan var frilagda mot vitt: med `-dc` blev kanterna rena mot både ljus och mörk bakgrund, där en kopia med vitt gjort genomskinligt hade en vit kant mot mörkt. Frilägget ändrar inte upplösningen, och en gammal kontur i originalet följer med. Cirka 3–6 minuter per bild på CPU under minnestryck.
- **Frilägg från originalet,** inte från en kopia där bakgrunden redan är bortklippt eller vitmålad; då följer gamla kanter och JPEG-brus med.
- **Granska kanterna** i dubbel förstoring mot både ljus och mörk bakgrund: hår, fingrar och kläder mot bakgrunden. En frilagd bild med kvar vit kant ser inklippt ut.
- **Visa inte en bild med vit bakgrund som en ruta på en färgad yta** när den kan friläggas eller få sektionens bakgrundsfärg; den vita rektangeln läses som urklipp.
- **Beskärning** sker i Astro eller med sharps `attention`, som väljer området med mest kontrast, färg och hudtoner. 📄 [sharp, resize](https://sharp.pixelplumbing.com/api-resize). Granska alltid resultatet; ingen strategi vet var handen slutar.
- **Metadata:** Astros bildkedja tar bort all metadata, också GPS, i de varianter den gör. Filer i `public/` och original som länkas direkt publiceras som de är och rensas för hand. AI-metadata som C2PA överlever troligen inte kedjan ⚠️ (inte provat); regeln om att behålla den står i 2-7. 📄 [sharp, Output](https://sharp.pixelplumbing.com/api-output) (*By default all metadata will be removed*)

## Förbjudet

- Alt-text som säger *bild av*, upprepar bildtexten, radar upp sökord eller påstår något bilden inte visar.
- Tomt `alt` på en bild som bär information, och beskrivande `alt` på ren dekoration.
- En bild som ser ut att visa kundens personal, lokal eller arbete utan att vara kundens (→ 2-7, ärlighetsregeln).
- Bakgrundsborttagning med standardmodellen eller i en molntjänst med kundens foton.
