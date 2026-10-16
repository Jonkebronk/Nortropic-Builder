# Wikipedia: Signs of AI writing

**Källa:** https://en.wikipedia.org/wiki/Wikipedia:Signs_of_AI_writing, revision `1380310647` (2026-10-15 00:31 UTC), lästa som wikitext (227 966 byte). Wikipedias API visar 2026-10-16 att det fortfarande är den senaste revisionen. Lästa: inledningen, *Caveats*, *Content* (betydelse, säljspråk, vaga samband), rubrikerna under *Language and grammar* och *Style*, *Signs of human writing*, *Ineffective indicators* och *Historical indicators* (tankstreck, ordvariation). Dessutom sidhistoriken via API:t. ⚠️ Inte lästa i detalj: *Markup*, *Citations*, *Comment-specific indicators* och *Edit summaries*, som gäller Wikipedias egen wikitext. ⚠️ Studierna sidan citerar är inte lästa; *The Economist* (2026-07-30) svarar 403.
**Licens:** CC BY-SA 4.0. Den som översätter eller bearbetar texten eller exemplen måste licensiera resultatet likadant och ange källan (tolkning, inte juridisk rådgivning). Vi tar bara idéer och kategorier, skriver egna svenska exempel och översätter inga exempel.

## Vad det är
En fältguide från WikiProject AI Cleanup för att känna igen AI-skriven text på Wikipedia, med verkliga exempel ur artiklar, utkast och diskussioner. Sidan är rådgivning från ett wikiprojekt (`{{WikiProject advice}}`), inte en policy eller riktlinje. Den är grundkällan för humanizer.

## Hur det fungerar
- **Beskrivande, inte föreskrivande:** *"it consists of observations, not rules"*. Och: *"Please do not merely treat these signs as the problems to be fixed; that could just make detection harder."*
- **Förklaringen:** modellen drar mot medelvärdet och byter ut ovanliga, specifika fakta mot allmänna, positiva beskrivningar. Texten blir *"simultaneously less specific and more exaggerated"*.
- **Kategorier:** innehåll (uppblåst betydelse, ytlig analys, säljspråk, vaga samband, vaga auktoriteter, generiska slutsatser), språk (AI-ord, undviker *is* och *are*, kontrastfigur, tretal), stil (Title Case, fetstil, rubriker inne i listor, emoji, typografiska citattecken), kommunikation till användaren, wikitext och källhänvisningar.
- **Förbehåll:** detektorer har *"non-trivial error rates"*, och människor känner enligt en studie från 2025 inte igen AI-text bättre än slumpen.
- **Signs of human writing:** enkla *is/has*-satser, vardagliga ord, superlativ och bestämda påståenden, förbehåll och förstärkningsord, och enstaka omständliga uttryck (*"in order to"*, *"the fact that"*) är vanligare i text som människor skrivit.
- **Ineffective indicators:** perfekt grammatik, formell prosa, övergångsord ensamma och text utan källor visar inte att AI skrivit.
- **Historical indicators:** tecken som nyare modeller slutat med, bland dem långt tankstreck (*"2022–September 2026"*).

## Kvalitet och underhåll
- Skapad 2023-12-04. 2 167 redigeringar av 279 redaktörer, 499 bevakare, halvskyddad till 2027-09-12 (Wikipedias API 2026-10-16). 31 redigeringar 7–15 oktober 2026: sidan ändras ibland flera gånger samma dag.
- **Tankstrecket flyttades till de historiska tecknen 2026-10-07** i [revision 1379098040](https://en.wikipedia.org/w/index.php?oldid=1379098040), av en registrerad redaktör med skälet att nyare modeller inte använder tankstreck alls, men utan källa för det. Påståendet att nyare modeller i stället överanvänder komma och punkt har *"citation needed"*. Studien om att Claude använder långt tankstreck oftare än professionella skribenter har bara en källa på sidan: en artikel i *The Economist* (2026-07-30). Artikeln svarar 403, och själva studien är inte identifierad ⚠️.
- Ingen svensk version; sidan finns på tyska, finska, franska, hebreiska, portugisiska, ryska, thailändska och kinesiska.
- Sidan säger själv att den gäller informationstext på Wikipedia och att *"some may not apply in a non-Wikipedia context"*. Säljspråk är ett tecken i ett uppslagsverk, men genren på en företagssajt.

## Det bästa vi kan ta
**Redan taget** (`.claude/skills/innehall/ai-monster.md`): mönstren med Wikipedia som källa (1, 5–7, 9, 11–15, 21–23, 28), vikten och att flera tecken krävs (rad 8), att superlativ inte är ett AI-tecken (mönster 16), tankstrecket (rad 59–60) och licensregeln (rad 65).

**Inte taget:**
1. **Syftet:** sidan varnar för att rätta tecknen i stället för problemen. Vår regel *Rätta från fakta, inte med synonymer* (`ai-monster.md:7`) gör just det rätta; skriv i `ai-monster.md` att målet är text som hjälper besökaren, inte text som döljer att AI skrivit den.
2. **Mänskliga tecken som spärr:** ett enstaka *i syfte att*, *kanske* eller *det faktum att* är inget AI-tecken. Mönster 4 och 25 bör säga det (förslag nedan).
3. **Verkningslösa tecken:** felfri grammatik och formell ton flaggas aldrig som AI.

## Var det hamnar hos oss
Placeringen **skill: innehall** är beslutad: fältet `beslut` säger *"Johnny 2026-10-16 omkring 17.40: 'Ja på alla'"*. Källan står i `ai-monster.md` (ovan), `innehall/kallor.md` (*Normer och litteratur* och förslag 8–9) och `guide/2-7-innehall.md` (*Kort tankstreck*, *AI-signaturer i text* och *Förankring*). Varningen *⚠️ guiden inte läst* i 2-7 är redan ersatt i arbetskopian (ändrad av en annan session, inte incheckad när kortet skrevs).

Förslag till Johnny, med exakt text:
- `ai-monster.md:59`: byt *"Wikipedia räknar sedan september 2026 det långa tankstrecket som ett *historiskt* AI-tecken"* mot *"Wikipedia flyttade 7 oktober 2026 det långa tankstrecket till de *historiska* AI-tecknen (rubriken säger 2022–september 2026)"*.
- `ai-monster.md`, mönster 4 och 25, kolumnen *Källor*: lägg till *"Ett enstaka omständligt uttryck eller förbehåll är inget AI-tecken; Wikipedia finner dem oftare i mänsklig text (*Signs of human writing*, *Syntax*)."*

## Passar vår stack?
Ja, som förankring för granskningen och språkgrinden. Inget verktyg. Wikitext- och källmönstren gäller inte våra sajter.

## Risker och flaggor
- **CC BY-SA:** inga exempel översätts, inte heller via humanizer, vars före-exempel delvis är Wikipedias text.
- **Rörlig källa:** revisions-id:t ska stå vid varje hänvisning. Bevakningen av repon fångar inte en wikisida; revisionen kan läsas med `action=query&prop=revisions` (förslag till startsäkringen).
- **Svag grund för enskilda tecken:** den viktigaste ändringen (tankstrecket) bygger på en redigering utan källa.
- Ingen telemetri, betalvägg eller inloggning.

## Inloggning
Inget.
