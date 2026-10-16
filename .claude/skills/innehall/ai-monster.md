# AI-mönster i svensk webbtext

Delfil till `innehall`. Kriteriet och nivån står i `guide/2-7-innehall.md`, *AI-signaturer i text* (granskningskriterium, N2). Här står mönstren, hur de vägs och hur de rättas.

## Så används listan

- **Rätta från fakta, inte med synonymer.** Ett mönster försvinner när meningen säger något konkret ur `fakta.md`. Byter man bara ord står mönstret kvar. Saknas fakta blir det en platshållare och en fråga till kunden (→ `guide/2-7-innehall.md`, *Platshållare*). 📄 humanizer `SKILL.md`, *How to work*; marketingskills `copywriting/SKILL.md`, *Claims Must Be Supportable*
- **Väg mönstren.** Mönster märkta *ensam* räcker för en ändring vid första träffen. Övriga är svaga var för sig och kräver flera träffar i samma stycke. En människa kan skriva vart och ett av dem. 📄 humanizer `SKILL.md`, *When not to act*; Wikipedia, *Signs of AI writing* (rev. 1380310647), *Ineffective indicators*
- **Rör aldrig citat, omdömen, namn eller kundens egna formuleringar.** De återges ordagrant (→ `guide/2-7-innehall.md`, *Faktabasen*). En fras som låter som ett mönster kan vara rätt i kundens röst; då motiveras den i stället för att rättas (→ 2-7, *Svenska copyfynd*).
- **Ändrad text faktakontrolleras igen** (→ 2-7, *Humanizer och Slop Monster är kandidater*).
- **Ett skrivprov från kunden väger tyngre än listan** (`rost.md`, citatbanken). 📄 humanizer `SKILL.md`, *Voice*; marketingskills `copywriting/SKILL.md`, *Diagnose*

## Mönstren

Exemplen är egna. Kolumnen *Källor* säger vem som bär mönstret; *två* betyder två oberoende källor, *en* betyder bänken (→ `guide/README.md`, *Bänken*).

| # | Mönster | Svenskt exempel | Vikt | Källor |
|---|---|---|---|---|
| 1 | Kontrastfigur: motsäger något ingen påstått | *Det handlar inte om att knäcka leder, utan om att hitta orsaken.* | ensam | två: Wikipedia (*Negative parallelisms*); marketingskills (*Never write these* 1) |
| 2 | Negationslista | *Ingen bindningstid, inga dolda avgifter, inget krångel.* | svag | en: marketingskills (*Never write these* 2) |
| 3 | Retorisk fråga eller kolon som avslöjar | *Resultatet? Färre missade samtal.* / *Det bästa av allt: …* | svag | en: marketingskills; humanizer §4. En fråga besökaren själv ställer, som i en FAQ, är rätt |
| 4 | Iscensatt upptakt och utfyllnad | *Låt oss dyka ner i …*, *Det är viktigt att notera att …*, *i syfte att* | svag | humanizer §4; marketingskills; claude-humanizer-svenska (läst, ingen licens) |
| 5 | Omvärldsöppning | *I en alltmer digital värld behöver alla en hemsida.* | ensam | två: Wikipedia; marketingskills (*openers*) |
| 6 | Uppblåst betydelse | *spelar en avgörande roll*, *en hörnsten i*, *markerar en milstolpe* | svag | två: Wikipedia (*Undue emphasis*); humanizer §13 |
| 7 | Generisk avslutning | *Hos oss är du alltid i trygga händer.* *Framtiden ser ljus ut.* | svag | två: Wikipedia (*Outline-like conclusions*); marketingskills (*tidy closers*) |
| 8 | Slutkläm eller visdomsmening | *Det är det som gör skillnaden.* | svag | humanizer §2–3; marketingskills (*second-generation tells*) |
| 9 | Tretal av reflex | *snabbt, enkelt och tryggt* | svag | två: Wikipedia (*Rule of three*); marketingskills (tak: ett tretal per avsnitt) |
| 10 | Fragmenttrumma och jämn rytm | *Enkelt. Snabbt. Klart.* Lika långa stycken i varje sektion | svag | humanizer §2; marketingskills (*staccato*, *perfect balance*) |
| 11 | Säljspråk | *belägen i hjärtat av*, *unik*, *passion för*, *skräddarsydda lösningar*, *kvalitet i fokus* | ensam | två: Wikipedia (*Promotional language*); webb-pro `kunskap/copy-kontroll.md` (→ 2-7, *Svenska copyfynd*) |
| 12 | AI-ord | *avgörande*, *sömlös*, *holistisk*, *navigera*, *landskap*, *belysa*, *möjliggöra*, *robust* | svag | Engelska listan: två (Wikipedia; Kobak m.fl. 2024). Den svenska listan har bara en källa ⚠️ |
| 13 | Undviker *är* och *har* | *utgör*, *fungerar som*, *erbjuder*, *har förmågan att* | svag | två: Wikipedia (*Avoidance of copulatives*); humanizer §18 |
| 14 | Svans som spelar analys | *…, vilket understryker vikten av god hållning.* | svag | två: Wikipedia (*Superficial analyses*); marketingskills (*trailing pile-on*) |
| 15 | Vaga auktoriteter | *experter menar*, *studier visar*, *branschledande* | ensam | två: Wikipedia (*Vague attributions*); Anthropics `brand-review` (*Unsubstantiated claims*) |
| 16 | Superlativ eller jämförelse utan belägg | *bäst i stan*, *länets största*, *den bästa behandlingen för ryggen* | ensam | två: marketingskills (*Claims Must Be Supportable*); `brand-review` (*Legal and Compliance Flags*). Kan också vara vilseledande marknadsföring ⚖️ tolkning |
| 17 | Påhittad specificitet | runda siffror, *över 1 000 nöjda kunder*, för snygga kundcitat | ensam | två: marketingskills (*reflexive specificity*); humanizer (*hitta aldrig på*). Faktakontrollen fångar det (→ 2-7) |
| 18 | Nominaliseringar | *genomförandet av behandlingen*, *säkerställandet av kvaliteten* | svag | Som klarspråksregel: Myndigheternas skrivregler; som AI-tecken bara en källa ⚠️ |
| 19 | Det-konstruktion och passiv som döljer vem som gör något | *Det kan konstateras att …*, *Offerten skickas när underlaget har granskats.* | svag | Klarspråk: Språkrådet (aktiva verb); humanizer §11 (svag) |
| 20 | Kalkerade anglicismer | *ta ägarskap*, *leverera värde*, *göra skillnad*, *skala upp*, *på daglig basis* | svag | en: claude-humanizer-svenska ⚠️ (saknar licens; läst, inte kopierat) |
| 21 | Engelsk typografi | långt tankstreck (—), “raka” eller engelska citattecken, Rubrik Med Versaler, *30%*, flera utropstecken | ensam | norm: Språkrådet, *Snabba skrivregler* (Isof 2024), avsnitt 1.10 och 1.13; Wikipedia (*Title case*, *Curly quotes*) |
| 22 | Fet etikett på varje punkt, emoji som struktur | **Snabbt:** …, **Tryggt:** … | ensam | två: Wikipedia (*Inline-header lists*, *Emoji*); humanizer §19–20 |
| 23 | Chattrester och brasklappar | *Hoppas det hjälper!*, *Baserat på tillgänglig information …* | ensam | två: Wikipedia (*Collaborative communication*); humanizer §22–23 |
| 24 | Text om texten, rubriken upprepad i första meningen | *På den här sidan berättar vi om …*; rubriken *Akupunktur* följd av *Akupunktur är …* | svag | humanizer §24–25; Språkrådet: rubrik och text ska stå var för sig |
| 25 | Staplade reservationer och falsk balans | *kan eventuellt i vissa fall*, *å ena sidan … å andra sidan* utan ställningstagande | svag | humanizer §9; claude-humanizer-svenska |

Svenska företagsfraser som inte är AI-mönster men ger samma intryck – *vår nya hemsida*, *Välkommen till*, tre stycken i rad som börjar med *Vi* – står i `guide/2-7-innehall.md`, *Svenska copyfynd*.

## Tankstrecket

- Svensk text har ett tankstreck, det korta (–): utan mellanslag i intervall (*9–18*), med mellanslag vid inskott och tillägg. Det långa (—) finns inte i de svenska reglerna och tyder på en engelsk förlaga. 📄 Språkrådet, *Snabba skrivregler* (Isof 2024), 1.10, läst i en kopia hos Chalmers ⚠️
- Regeln i guiden (→ 2-7, *Kort tankstreck*) står på bänken tills *Svenska skrivregler* är läst. Se *Förslag till Johnny* i `kallor.md`.
- Wikipedia räknar sedan september 2026 det långa tankstrecket som ett *historiskt* AI-tecken, eftersom nya modeller undviker det. Ett tankstreck är alltså inget bevis åt något håll. 📄 Wikipedia, *Signs of AI writing*, rev. 1380310647, *Historical indicators*

## Licens

- Mönstren och kategorierna är idéer och fria att använda. Exemplen ovan är egna.
- Wikipedias text och exempel är CC BY-SA 4.0. Den som översätter eller parafraserar dem nära måste licensiera resultatet likadant. Därför översätts inga exempel ur Wikipedia eller humanizer, där minst åtta före-exempel är Wikipedias text. 📄 [Wikipedia: Signs of AI writing](https://en.wikipedia.org/wiki/Wikipedia:Signs_of_AI_writing); [humanizer](https://github.com/blader/humanizer) (MIT, commit 225a6f3); ⚖️ tolkning, inte juridisk rådgivning
- claude-humanizer-svenska saknar licens och får bara läsas.
