# Baslinjen: ger våra skills bättre resultat än utan dem?

Lagerskillsen byggdes 2026-10-16 innan någon av dem prövats med och utan (`guide/bilaga-b-skills.md`, *Skillsen 2026-10-16*). Här står hur det mäts, skill för skill. Metoden i stort står i [skills.md](skills.md), *Så prövas den*; regeln om en ändring i taget i `guide/3-2`, *En ändring i taget*.

## Provet

| Del | Så gör vi | Källa |
|---|---|---|
| Armarna | **Utan:** samma uppgift i ny kontext, utan skillen. **Med:** skillen som den laddas. För en ändrad skill är baslinjen den gamla versionen, sparad som kopia före ändringen. Armarna startas samtidigt | 📄 Anthropic, `skill-creator` (Apache-2.0) |
| Uppgifterna | Två eller tre verkliga uppgifter per skill, valda så att de frestar till felen skillen ska hindra. De hämtas ur det som faktiskt gick fel: Johnnys rättelser, granskarens missar och kvalitetsgranskningens fynd i den första övningssajten | 📄 Anthropic, [Skill authoring best practices](https://platform.claude.com/docs/en/agents-and-tools/agent-skills/best-practices) (*Build evaluations first*) |
| Påståendena | Skrivs innan skillen läses, ur guiden, `BESLUT.md` och primärkällor, och märks P (källa utanför guiden) eller G (guiden eller ett beslut). Låses med SHA-256 och dateras innan någon körning startar. Rapporten anger andelen för P och G var för sig. Ett påstående som bara står i skillen visar att kunskapen når fram, inte att den behövs | Provet på `drift` (förbehållet); proven 2026-10-16 (`kunskap/research/2026-10-16_baslinjer-1.md`, `-2.md`) |
| Den blinda bedömaren | Påståenden som kräver läsning döms av en delagent med ren kontext, på avidentifierade och omkastade svar, efter regler skrivna i förväg. Några domar stäms av för hand | 📄 `skill-creator` (blinda jämförelser); proven 2026-10-16 |
| Skillens version | Skillens katalog kopieras eller dess commit noteras innan körningarna startar, eftersom andra kan ändra den under provet | Proven 2026-10-16 |
| Underlaget | Bilder och sidor prövas innan körningarna startar: titta på varje beskuren del (`sips --cropOffset` räknar från bildens mitt; beskär med sharp, `extract` med `top`) | Proven 2026-10-16 (fyra ogiltiga körningar) |
| Körningarna | Tre per arm och uppgift, eftersom körningarna skiljer sig | 📄 `skill-creator`; 📄 [Test plugins with evals](https://code.claude.com/docs/en/plugin-evals) |
| Bedömningen | Binära påståenden som ett skript prövar där svaret är känt: regex på texten, kontrollskriptet, axe eller beräknade stilar i Playwright. Design och text döms av Johnny eller den kalibrerade granskaren, blint och i båda ordningarna, aldrig på en skala | 📄 `skill-creator` (*Subjective skills … better evaluated qualitatively*); → [matning.md](matning.md) |
| Rapporten | Andel godkända påståenden per arm (medel och spridning), skillnaden, en tabell per påstående, tid och tokens. Transkripten läses | 📄 `skill-creator` (`benchmark.json`); 📄 Anthropic, *Demystifying evals* |
| Analysen | Påståenden som går igenom i båda armarna skiljer inte och skärps eller stryks. Påståenden som bara går igenom med skillen visar vad skillen tillför. Ett avsnitt i skillen som inte flyttar något påstående är en kandidat att stryka | 📄 `skill-creator`, `agents/analyzer.md` |
| Beslutet | Skillen, eller avsnittet, behålls när med-armen inte är sämre. Johnny beslutar | → `guide/3-4`, *En ny skill tas in bara om* |

**Utan-armen utan att ändra konfigurationen:** en delagent i ny kontext som får uppgiften och uttryckligen inte läser skillens katalog och inte använder Skill-verktyget, och som avslutar med en lista över filerna den läste. Det renaste är att stänga av skillen i inställningarna (`skillOverrides`), men det är en ändring av konfigurationen och avgörs av Johnny. 📄 [Claude Code: Skills](https://code.claude.com/docs/en/skills) (*Evaluate and iterate on a skill*).

**Utan-armen har repots `CLAUDE.md`.** Den laddas i varje delagent, också utan skill. Regler som står där mäts alltså inte av provet; ett påstående om dem skiljer inte armarna.

**Vad provet inte visar:** att sajterna blev bättre. Det avgör Johnny på provsajten (*Benchy*) och på nästa riktiga sajt (→ `guide/3-2`).

## Uppgift och mått per skill

| Skill | Uppgift som frestar till felet | Påståenden som ett skript prövar | Dömer resten |
|---|---|---|---|
| `strategi` | En intervjuanteckning med luckor och en motsägelse blir brief och `fakta.md` | Briefens sex rubriker; varje faktum har en källa; motsägelsen blir en fråga, inte ett val | Johnny |
| `omfattning` | En befintlig sajts adresslista ska flyttas | Varje gammal adress har ett mål; inga kedjor eller slingor (skillens eget `kontrollera_omdirigeringar.py`) | – |
| `struktur` | Sidkarta och meny för en firma med två orter och fyra tjänster | En sida har samma namn överallt (G4); ortssidorna klarar bytestestet; menyns antal val | Johnny |
| `skelett` | Förstavyn och *Det praktiska* för en hantverkare | I 375 × 667: vad, var och en tryckbar kontaktväg i första skärmen; ingen vågrät scroll; tryckytor minst 24 px | Granskaren (blickprovet) |
| `yta` | Knappar, kort och accent i ett givet kit | Bara kitets tokens; accentfärg bara på interaktiva element; kontrast enligt axe | Johnny |
| `rorelse` | Hover, tryck och mobilmeny i sparsam budget | Hover under `@media (hover: hover)`; bara `transform` och `opacity`; under 300 ms; `reduce` hanteras; första skärmens text animeras inte in (`BESLUT.md` 2026-10-15) | – |
| `innehall` | Om oss-texten ur en faktabas med ett tomt fält | Inga tal eller namn utanför faktabasen; språkgrinden (cookies, klockslag, tankstreck); AI-mönstren | Johnny (rösten) |
| `kvalitet` | En byggd sida med inplanterade fel | Andelen inplanterade fel som hittas, och falska larm | – |
| `drift` | `wrangler.jsonc` och driftberedskapen för en kund med D1 | Arton påståenden, bland dem `observability`, `workers_dev: false`, D1 i EU, migreringar, att rollback inte återställer data, att ägaren publicerar | – |
| `granskare` | Sajter ur måttstocken där Claudes förväntan före domarna var fel (`mattstock/forvantan.json`), med `mattstock/` spärrad i båda armarna, eftersom `mattstock.md` nämner domarna | Andelen kända fel som hittas, falska fynd och att domen inte rörs av premiumpasset | Johnny (domarna) |
| `larande` | Ett utdrag ur en session med Johnnys rättelser | Varje rättelse har räckvidd, orsak och hemvist; inget skrivs i `CLAUDE.md`, en skill eller en låst fil | Johnny |

**Ordningen:** först de skills där ett skript kan döma (`drift`, `rorelse`, `kvalitet`, `omfattning`), sedan de som kräver Johnny. Varje körning är ett verkligt modellanrop: elva skills med två uppgifter, två armar och tre körningar blir 132 körningar. Budgeten sätts innan sviten körs (→ `guide/3-2`, *Testsvit*, N4).

## Det första provet

`drift`, 2026-10-16. Uppgiften var `wrangler.jsonc` och driftberedskapen för en kund med statiska sidor, en Worker som skriver i D1 och ett nattligt jobb; bedömaren var 18 regex-påståenden; tre körningar per arm.

- **Utfall:** med skillen 18 av 18 i alla tre körningarna, utan skillen 12, 12 och 13 av 18 (68,5 %).
- **Skiljer:** fem påståenden gick bara igenom med skillen: Workers Issues, `security.txt` med `Expires`, låst Node-version, DNSSEC före namnserverbytet och ett statiskt nyckelord för vakten. Det är det nya och det byråegna, inte grunderna.
- **Skiljer inte:** elva påståenden klarade modellen redan, bland dem `workers_dev: false`, 404-sidan och att rollback inte återställer data. Raderna om dem i skillen är kandidater att korta, efter ett prov på en andra uppgift.
- **Förbehåll:** påståendena skrevs ur skillens egen kontrollista, så provet visar att kunskapen når fram, inte att den är rätt, och med-armen når taket. Nästa prov behöver påståenden som någon annan har skrivit.
- **Kostnad:** cirka 81 000–91 000 tokens per körning med skillen och 66 000 utan.

## Det andra provet

`strategi`, `omfattning`, `struktur`, `skelett` och `yta`, 2026-10-16. En uppgift per skill, tre körningar per arm. Påståendena skrevs innan skillsen lästes, ur guiden (G) och primärkällor (P), och tolv av dem dömdes av en blind bedömare. Rapporten: `kunskap/research/2026-10-16_baslinjer-1.md`.

- **Utfall:** med skillen 87, 98, 96, 100 och 98 %, utan 58, 98, 80, 81 och 90 %.
- **Skiljer:** byråns egna regler (märkningen, sidkartans tabell, "Meny", knapplisten, G3) och två normer (inga hypotetiska frågor, 44 px). På P-påståendena låg utan-armen på 87–100 % i fyra skills av fem.
- **Sämre med skillen:** tre gånger, varje gång efter en rad i skillen: adressbytet vid www (`omfattning`, rättat samma kväll ur Search Console-hjälpen), platssidans rubrik (`struktur`) och nya färger i kitet (`yta`).
- **Kostnad:** 13–96 % fler tokens per körning.

## Det tredje provet

`rorelse`, `innehall`, `kvalitet`, `granskare` och `larande`, 2026-10-16 (→ `kunskap/research/2026-10-16_baslinjer-2.md`). Påståendena skrevs ur guiden, `BESLUT.md`, måttstockens domar och primärkällor innan skillen lästes. Tre körningar per arm.

| Skill | Uppgift | Med | Utan | Bara med skillen |
|---|---|---|---|---|
| `rorelse` | Tillstånd och meny, sparsam | 100 % | 100 % | inget |
| `rorelse` | In-animationer, måttlig | 100 % | 88,9 % | startopacitet minst 70 % (`BESLUT.md` 2026-10-15) |
| `innehall` | Om oss med luckor och ett omdöme | 100 % | 75,9 % | platshållaren i byråns form; omdömet ordagrant med plattform, datum och kontrollrad |
| `kvalitet` | 22 inplanterade fel före publicering | 87,9 % | 90,9 % | inget; taket på 15 fynd sköt ut ett N1-fynd i två körningar. Omprov efter beslutet 19.09 (taket, cookies och spamskydd i kontrollistan): 100 % med skillen, ett falsklarm med allvaret låg; tilläggen skrevs efter uppgiften, så en andra uppgift behövs |
| `granskare` | s30 och s01 ur måttstocken | 94,4 % | 66,7 % | rätt dom på s01; *För godkänt*, allvar och tre utfall |
| `larande` | Genomgång med fem rättelser | 83,3 % | 83,3 % | inget |

- **Läsning:** skillsen tillför byråns egna regler och format, inte grunderna. Det som modellen klarar utan skillen är kandidater att korta, efter en andra uppgift.
- **En uppgift där båda armarna når taket säger inget.** Byt till en uppgift där en regel ur `BESLUT.md` eller guidens format avgör (`rorelse`, uppgift 1 och 2).
- **Bedömaren rättas öppet:** när en regex dömer fel sparas den första versionen, alla körningar bedöms om och båda utfallen redovisas. Åtta rättelser i proven; en av dem (sektionerna i granskarens svar) vände utfallet, och domarna lästes därför också för hand.
- **Tokens per körning** står i delagentens slutnotis (`subagent_tokens`). Med skillen kostade en körning 1,3–2,2 gånger så mycket som utan.
