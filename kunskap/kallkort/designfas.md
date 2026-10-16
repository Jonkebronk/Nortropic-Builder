# designfas

**Källa:** Nortropics egen skill i webb-pro (github.com/Nortropic/nortropic-webb-pro, publikt), läst lokalt 2026-10-16 vid HEAD `668b03c`.
- `.claude/skills/designfas/SKILL.md`: 135 rader, läst i sin helhet. 13 commits mellan 2026-10-12 19:05 (`909be93`) och 2026-10-13 10:21 (`6409bd7`).
- Skriptet skillen driver, `kontroller/designfas.py`: 2 971 rader och 32 commits, senast `77f0438` (2026-10-13 11:30). Läst: docstringen, funktionslistan, `insats()` och `autogodkann()`.
- Bandets avsnitt med tabellen och *Avvikelser och hypoteser* i `kunskap/metodkarta.md:1042–1176`.
- Jämförd med `guide/2-5-yta.md`, *Tre riktningar till Johnny och kunden*, och `bilaga-b-skills.md`, utkastet `riktningar`.
- Inventeringen: B20, 0 krockar. Krockgranskningen gjordes 2026-10-05, före skillen.

**Licens:** egen text och kod, ingen licensfil. Inga villkor.

## Vad det är
Webb-pros sista designväg, en dag gammal när projektet lades ned. Tre riktningar byggs som riktiga Astro-projekt och går ett "produktionsband" med fjorton stationer. Varje station har en fråga och sina egna skills, och dess insats ska synas på sidan. Varje version visas för Johnny i en privat artefakt. En drivare kunde köra bandet hela vägen till helbygget utan honom.

## Hur det fungerar
- **Stationerna** (`metodkarta.md:1142–1155`): underlag, innehåll och struktur, art direction, komposition och detaljer före valet. Efter valet: typografi, responsiv, rörelse, formulär, kritik, tillgänglighet och polish, plus jämförelse och överlämning. Varje station är en tabellrad med indata, fråga, skills, synlig utdata och kontroll.
- **Tre riktningar som skiljer sig på riktigt** (SKILL.md:67–76). De ska skilja sig i minst två av *makrostruktur, bildstrategi, typografisk hierarki, innehållsordning och ton*, "aldrig bara i färg och typsnitt". Det var Johnnys beslut i webb-pro 2026-10-12.
- **Jämförelsestationen:** "Vilka par är samma struktur och berättelse med andra färger, typsnitt eller bilder?" Är två riktningar för lika görs den svagare om innan Johnny ser dem.
- **Kritiken körs samlat och sida vid sida** när alla tre finns, inte en riktning i taget. Grunden är Dow m.fl. 2010 (parallell återkoppling bättre än seriell). Metodkartan erkänner själv att talet tre inte kommer ur studien (`metodkarta.md:1110–1111`, `:1168–1171`).
- **Insatsen räknas, inte läsningen.** Insatsen mäts som en pixeljämförelse mot förra versionen, och funktionen säger själv att den "Mäter förändring, inte kvalitet" (`designfas.py:806–809`).
- **Hypoteserna redovisas öppet.** Sju punkter där bandet avviker från källorna är märkta som husets hypoteser, bland annat att bandet inte prövar riktningarna med människor (`metodkarta.md:1157–1176`).
- **Den autonoma godkännaren** (`designfas.py:1334–`; SKILL.md:77–83, 85–100) godkände en riktning när jämförelsen valt den och kritiken svarat "premium" på C5. Den byggde på Johnnys val av alternativet "Autonomous to build (Recommended)" i en flervalsfråga som agenten hade skrivit (webb-pro `BESLUT.md:5905`).

## Kvalitet och underhåll
- Skriven på ett dygn och aldrig körd skarpt: "Mekaniken prövad (…); ingen autonom körning är gjord" (webb-pro `BESLUT.md:5900–5901`). Johnny dömde aldrig något band.
- Genomgången använder just den autonoma godkännaren som exempel på att *agenterna formulerade alternativen* (`2026-10-15_webb-pro-genomgang.md` §2, hypotes 4).
- Före valet går varje riktning fem stationer, och varje station läser sina egna skills. Det är den läsmängd och de skillkrockar som guiden vill bort från (`guide/3-4`, *Skills: tak*).

## Det bästa vi kan ta
1. **Jämförelsefrågan om riktningarna.** Guiden har N2-regeln *Kiten måste skilja sig* (fallgrop 77) men ingen konkret fråga. Frågan från jämförelsestationen ("samma struktur och berättelse med andra färger?") och de fem axlarna gör regeln prövbar.
2. **Kritik sida vid sida när alla tre finns.** Guiden visar redan riktningarna sida vid sida för Johnny (`2-5`, N1), men inte för granskaren. En källa (Dow m.fl., via webb-pro; inte läst här ⚠️), alltså bänken.
3. **Ärligheten i "Avvikelser och hypoteser":** att skriva ut var det egna flödet går längre än källorna, och att förändring inte är kvalitet. Det är ett mönster för larande, inte en regel.

Redan taget: tre riktningar, mobilen först, startsidan med verkligt innehåll och Johnny först, sedan kunden (`2-5`, N1); stationstanken som lager 4–6 (inventeringens kommentar) motsvaras av lagerskillsen `skelett`, `yta` och `rorelse`.

## Var det hamnar hos oss
**Släpp som skill, drivare och band** – håller med förslaget. Men jag föreslår att punkt 1 inte släpps: **en fråga till skill: granskare** (granskaren dömer också riktningar enligt `granskare/SKILL.md`) eller till **skill: yta**, där riktningarna tas fram. Frågan blir: skiljer sig de tre riktningarna i mer än kit – i bildstrategi, typografisk hierarki eller ton?

**Krock med guiden, som Johnny bör avgöra:** guidens N1 bygger riktningarna som *samma sektioner i tre kit*, "så att valet gäller ytan" (`2-5`, 4 Ways-videon). Då skiljer de sig per definition mest i färg, typsnitt, avstånd och radie – det som webb-pros beslut 2026-10-12 kallade otillräckligt. Båda är Johnnys beslut, i olika projekt. Frågan förs in först om han vill det, till exempel om riktningarna i övningssajterna upplevs som för lika.

## Passar vår stack?
Astro-projekt per riktning stämmer med vår stack. Allt runt om finns inte här och översätts inte: `design.sh`, `designfas.py`, kandidatflödet, sigillet, artefaktpaketen med `FILER.json`, specialistpassen med `claude -p`, kundvakten och metodkartan. Det som tas är en fråga och en princip.

## Risker och flaggor
- **Autonomt godkännande av design:** krockar med `guide/3-2` (*Ett stopp släpps ett i taget, och bara när Johnny säger det*; *Bedömaren fattar bara de grova besluten*) och med webb-pro-genomgångens risk 3.
- **Läsmängd och skillkrockar:** bandets tabell pekar på 40 olika skills och fem MCP-tjänster (`metodkarta.md:1142–1155`). Webb-pro hade 61 skills med 67 krockar (`guide/3-4`).
- **Rörelse och 21st-block före valet** (stationen detaljer) krockar med sparsam rörelse och Lighthouse 100. Det tas upp med Johnny när det uppstår (`BESLUT.md` 2026-10-16).
- **Artefakter med kundmaterial:** privata, men kundens bilder och texter laddades upp till claude.ai. För övningssajterna gäller att inget syns utåt (`5-byggplan.md`).
- Licens, telemetri och betalvägg: inga.

## Inloggning
Inget för det som tas in. Webb-pros visning krävde claude.ai-artefakter, alltså inloggning, och designtjänsterna i stationerna (Refero, Mobbin, 21st, Figma) krävde konton. Inget av det behövs för jämförelsefrågan.
