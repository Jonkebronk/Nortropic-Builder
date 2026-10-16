# Röstprofilen

Kortet beskriver en **metod** byggd av tre källor, inte ett enskilt verktyg. Metoden ger mallen för `rost.md` per sajt.

**Källa:**
1. **marketingskills customer-research**: https://github.com/coreyhaines31/marketingskills, `skills/customer-research/SKILL.md` och `references/interviews-and-surveys.md`. Commit `365b412152b9` (main, 2026-10-15). Skillen ändrades senast i `a8ac2636ec` (2026-10-03). Läst 2026-10-16. Från `references/source-guides.md` läste jag bara rubrikerna ⚠️; den handlar om amerikanska plattformar som vi inte använder.
2. **NN/g, "The Four Dimensions of Tone of Voice"** av Kate Moran: https://www.nngroup.com/articles/tone-of-voice-dimensions/. Publicerad 2016-07-17. Sidan anger "Last reviewed Aug. 16, 2023"; strukturerad data anger `dateModified` 2024-01-30. Läst 2026-10-16. Jag sparade sidan i `kallor/nngroup-tone/page.html` och kontrollerade siffrorna nedan direkt i texten.
3. **brand-review** (Anthropic): https://github.com/anthropics/knowledge-work-plugins, `marketing/skills/brand-review/SKILL.md`, avsnitten "Brand Voice Documentation Framework", "Voice Attribute Spectrums" och "Tone Adaptation". Commit `33eeda1e8fd8` (2026-10-16). Skillen ändrades senast i `2d6f7e22dd` (2026-03-13). Läst 2026-10-16.

**Licens:**
- customer-research: MIT, © 2025 Corey Haines. Behåll upphovsrätts- och licenstexten vid kopiering.
- NN/g: upphovsrättsskyddad artikel utan öppen licens (tolkning; jag hittade ingen licenstext). Får citeras kort med källa men inte kopieras.
- brand-review: Apache-2.0. Licensen följer med vid vidarespridning och ändringar anges.
- Vi parafraserar alla tre på svenska och kopierar ingen text.

**Vad det är:** En arbetsgång för att ta fram en sajts röst ur belägg i stället för ur smak:
1. samla kundens och ägarens egna ord (customer-research)
2. placera rösten på fyra tonskalor (NN/g)
3. skriv varje röstdrag med "Vi är", "Vi är inte" och exempel som visar och bryter draget (brand-review)

Resultatet är en `rost.md` per sajt som texten i lager 7 skrivs och granskas mot.

**Hur det fungerar:**
- **Steg 1, samla orden** (customer-research, "Extraction Framework", "Research Quality Guardrails", "Persona Anti-Patterns").
  - Ur varje underlag tas uppdraget kunden vill få gjort (funktionellt, känslomässigt, socialt), smärtpunkter (helst sådana som nämns utan att man frågat), utlösande händelser, önskat resultat med egna ord, kundens ordförråd och alternativen kunden övervägde (även att göra inget).
  - Citat sparas ordagrant med källa och datum.
  - Teman rangordnas efter hur ofta och hur starkt de förekommer.
  - Konfidens: Hög vid tre eller fler oberoende källor, Medel vid två, Låg vid en. Minst fem datapunkter per segment. Hitta aldrig på detaljer.
  - Börja med att observera där kunderna redan pratar ("Sales Safari") innan du frågar. Fråga "varför" i flera led. Försök motbevisa dina antaganden, inte bekräfta dem (`interviews-and-surveys.md`).
- **Steg 2, placera tonen** (NN/g). Fyra skalor:
  - formell–ledig
  - allvarlig–rolig (gäller försöket till humor, inte om det lyckas)
  - respektfull–respektlös (gäller ämnet, inte läsaren)
  - saklig–entusiastisk
  NN/g:s råd:
  - välj en position på varje skala innan du väljer tonord
  - välj även ord för det man *inte* ska låta som
  - undvik ytterlägen
  - låt tonen variera med läsarens läge och ämnet medan personligheten ligger fast
  - testa genom att låta läsare välja tonord eller gradera texten mellan polerna
  Skalorna togs fram ur en lista med tonord som rensades till 37 ord för webbplatser. En enkät med 50 amerikanska deltagare visade signifikanta men små skillnader i hur vänlig och formell texten upplevdes: "around 0.5–1 point on a 5-point scale" (p < 0,05). Kontrollerat i sidans text.
- **Steg 3, skriv dragen** (brand-review). 3–5 attribut. Varje attribut får fyra fält:
  - **Vi är**: vad det betyder i praktiken
  - **Vi är inte**: den vanliga feltolkningen
  - **Så här låter det**: en exempelmening
  - **Så här låter det inte**: en mening som bryter mot draget
  Till det kommer målgrupp, budskapspelare, stilregler och terminologi med föredragna och undvikna ord. Regeln: attributen ligger fast och tonen skruvas upp eller ned efter situation.
- **Mallförslag för `rost.md` per sajt** (förslag; Johnny beslutar):
  1. **Underlag:** lista med källor (samtal med ägaren, recensioner, kundmejl), datum och konfidens.
  2. **Kundens ord:** 10–20 ordagranna uttryck med källa, och de ord kunden *inte* använder.
  3. **Tonläge:** de fyra NN/g-skalorna med en markering på varje skala.
  4. **Röstdrag:** 3–5 drag med de fyra fälten.
  5. **Tilltal:** du eller ni, vi eller firmans namn.
  6. **Ton per sidtyp:** startsida, tjänst, om oss, kontakt och bokning, fel.
  7. **Förbjudna och föredragna ord**, med skäl.
  8. **Budskap:** ett huvudbudskap och tre stödbudskap med belägg. Saknat belägg märks `[BEHÖVS: …]`.

**Kvalitet och underhåll:**
- customer-research: del av ett repo med 54 998 stjärnor och 53 bidragsgivare (huvudsakligen en författare). Uppdateras ofta. Jag hittade inga ärenden om skillen.
- NN/g: etablerad UX-forskningsorganisation. Artikeln är tio år gammal men granskades 2023. Belägget är en liten amerikansk enkät och en ordanalys, inte en svensk studie.
- brand-review: repo med 29 839 stjärnor och 32 bidragsgivare. Skillen har inte ändrats sedan 2026-03-13 och jag hittade inga ärenden om den.
- **Två oberoende källor** för själva idén att röst ska dokumenteras som skalor plus drag med motsats: NN/g (skalor och "anti-tone words") och brand-review (sju skalor och "Vi är inte"). ui-ux-pro-max:s `brand`-skill har samma idé men är inte oberoende av marknadspraxis i övrigt. Formen är god praxis, inte norm.

**Det bästa vi kan ta:**
- NN/g:s fyra skalor som tonläge. De är färre och bättre belagda än brand-reviews sju och brands fyra, och NN/g har ett tydligt exempel med samma felmeddelande i fyra toner.
- brand-reviews fyra fält per drag.
- customer-researchs konfidensnivåer, kravet på ordagranna citat och förbudet mot att hitta på.
- NN/g:s testmetod (läsaren väljer tonord) som en enkel kontroll Johnny kan se och döma.

**Var det hamnar hos oss:** Skillen `innehall`, delfilen `rost.md` (mallen för `rost.md` per sajt).

**Passar vår stack?**
- Ja. Metoden är oberoende av teknik och ger en Markdown-fil per sajt, som läggs i `sites/` utanför git, eftersom den innehåller kunduppgifter.
- För svenska småföretag:
  - Underlaget är litet: en ägare, några tiotal recensioner, några mejl. Kravet på fem datapunkter per segment går sällan att nå. Konfidensen redovisas därför ärligt, ofta Låg eller Medel, i stället för att sänka kravet tyst.
  - Amerikanska källor (Reddit, G2, Capterra, SparkToro, PMF-enkät, intervjuer betalda med presentkort) byts mot samtalet med ägaren, Google-recensioner, omdömen i bokningstjänsten, offertförfrågningar och lokala Facebook-grupper. Det är förslag, inte prövat.
  - Tilltalet (du eller ni) saknas i alla tre källorna och läggs till. Det är svenskt.
  - NN/g:s skala allvarlig–rolig är sällan relevant för en kiropraktor (vård) men kan vara det för en hantverkare. Ytterlägen undviks enligt NN/g.
  - brand-reviews kanaler (LinkedIn, X, pressmeddelande) byts mot sidtyperna ovan.

**Risker och flaggor:**
- **Personuppgifter:** ordagranna citat från recensioner och mejl är personuppgifter. De förvaras utanför repot (`sites/`) och publiceras inte utan samtycke. Tolkning, inte juridisk rådgivning.
- **NN/g** är upphovsrättsskyddad, så vi citerar kort. Studien är liten och amerikansk; skalorna är ett verktyg, inte en norm.
- Ingen telemetri, inget konto och ingen installation, eftersom vi bara tar metoden. brand-review ingår i ett plugin som tar med tio MCP-servrar med inloggning, så det installeras inte.
- **Risk för överbyggnad.** Mallen ska vara lätt nog för en enmansfirma. "Börja enkelt": åtta fält, flera av dem korta.
