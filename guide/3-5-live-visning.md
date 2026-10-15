# 3.5 Live-visning

**Status:** konsoliderad v1.0, 2026-10-15; ommärkt efter granskningen samma dag. Utkast, inte genomgånget med Johnny.

Johnny ska se sajten växa fram och följa vad flödet gör utan att läsa loggar – varje steg slutar med något han kan se och döma (`guide/README.md`, princip 1). Webbläsaren visar resultatet och terminalen processen; en terminal kan rita listor och knappar men inte rendera en webbsida. Förhandsvisningen hör till första sajten, planvyn till N2 och det mesta annat till N4.

## Förhandsvisning i webbläsaren

- [N1] **Sajten syns i webbläsaren medan den byggs, och bara lokalt.** Dev-servern startas innan Claude skriver sajtens filer, med automatisk omladdning, och sidan öppnas i webbläsaren, så att varje sektion syns när den skapas. Servern lyssnar bara på `127.0.0.1`. Förhandsadresser på Cloudflare är publika som standard och skyddas med Access → `2-8-teknik-och-kvalitet.md` (fallgrop 58, 185). 🔧
- [N2] **Fokusläget är av under bygget** – det döljer stegen (inställningsvideon) ⚠️.
- [N2] **Antagandena syns.** I slutet av varje steg listar Claude de små antaganden det gjort i stället för att fråga, t.ex. "typsnittet laddas från Google Fonts". Johnny markerar de som är fel, och de rättas. Riskbeslut → `3-1-orkestrering-och-roller.md`. 🔧 (idé: *Assumption Check*, mods-videon)
- [N2] **Antagandena loggas med status** i tillståndsfilen (`3-1`), och flödet markeras inte klart så länge ett som Johnny markerat fel är orättat. Det är Johnnys markering, inte ett kvalitetskriterium. 🔧
- [N2] **Granskarens skärmdumpar sparas i `reviews/` och länkas**, så att Johnny ser vad granskaren såg.
- [N4] **Ett galleri visar varje rättningsrunda före och efter.**

Monitor på dev-serverns loggar → `3-3-sakerhet-och-installningar.md`. Stitch-förhandsvisning när stilkit tas fram → `2-5-yta.md`.

## Planvyn

- [N2] **Planvyn är en lokal HTML-sida där Johnny ser och godkänner planen – briefen, sidkartan, varje kontroll i en mening och checkpoints – i ett steg**, i klarspråk och inte som JSON. Den behövs när kontroller och checkpoints låses före bygget (låsningen och funktionslistan → `3-1`; stoppet för sidkarta och kontroller → `3-2-granskning-och-kalibrering.md`, *Stoppen*). I första sajten läser Johnny briefen och sidkartan som filer (`5-byggplan.md`, steg 1), och kontrollskriptet byggs först i steg 3. Varför: en plan i JSON är svår för en människa att granska (fallgrop 24); Shopify-videon byggde en sådan vy av samma skäl. 🎥 idé / 🔧
- [N2] **Planvyn visar täckningen:** varje del av briefen – sida, innehållselement, den primära handlingen, varje krav – kopplas till minst en kontroll eller ett granskningskriterium, och en del utan koppling markeras. Varför: det som inte kontrolleras märks inte när det saknas, och agenten bygger annars det lätta och hoppar över det svåra (Unlazy-videon, en källa – bänken; jfr *Inget släpps tyst* i `3-1`). 🔧
Om planvyn blir en egen sida eller samma sida som reservläget utan mods (nedan) är öppet – se `bilaga-e-oppna-fragor.md`, avsnitt 3.

## Variate

- [N4] **I sin granskning väljer Johnny mellan versioner av en sektion på den riktiga sajten** i stället för att beskriva ändringen i text, och valet går igenom samma kontroller (Variate-videon). En kund som vill förnya en sektion kan välja mellan tre. Verktyget → `2-5-yta.md`, `bilaga-a-verktyg.md`. Om sådana verktyg används i kundbygget eller bara när biblioteket och kiten tas fram är öppet – se `bilaga-e-oppna-fragor.md`, fråga 2.9.
- [N4] **Variate-koden får aldrig nå produktionsbygget** (fallgrop 45). Den är bara för utveckling: `up` lägger en markerad rad i entry-filen eller injicerar koden vid servering, `end` tar bort allt (📄 `kunskap/research/2026-10-14_stitch-och-verktyg.md`). Kontrollen efter markören → `2-8`.

## Mods

En mod är ett plugin vars `hooks/hooks.json` har nyckeln `modules`, som pekar på en `.js`- eller `.ts`-fil. Den kan rita en panel bredvid chatten eller en ram ovanför prompten, och rita om delar av skärmen. Mods installeras som plugins och kan ingå i byggsystemets plugin (`3-4-larande-och-underhall.md`). Källor: AI LABS, Nate Herk och dokumentationen (📄 `2026-10-14_claude-code-verifiering.md` §1).

- [N4] **Mods kräver Claude Code 2.1.287 i terminalen, 2.1.286 i Desktop.** Lokalt finns 2.1.281, med mods bara som avstängd early access. Kör `claude update`; använd inte early access-flaggan i stället (fallgrop 190). Mods skrivs på begäran med `/plugin-authoring`, som också kräver 2.1.287.
- [N4] **Ritningen syns i terminalen och i Desktop-appens Code-flik** (inte WSL). I VS Code-tilläggets chattpanel körs koden men ritningen syns inte, och inte heller i `claude -p` eller molnsessioner (fallgrop 7). `--safe-mode`, `--bare` och `disableAllHooks` stänger av mods.
- [N4] **En mod som Claude skriver ligger i `~/.claude/dev-mods/<sessions-id>/` och försvinner med sessionen om den inte installeras** (fallgrop 8).
- [N4] **Utgå från sessionsloggarna:** be Claude föreslå de fem mods som skulle hjälpa mest utifrån vad Johnny faktiskt gör och upprepar (mods-videon 2). Johnny väljer.
- [N4] **Flödespanelen** visar steg med status, aktuell runda, fynd per allvarlighetsgrad, öppna antaganden, inkorgen och tydligt när flödet väntar på Johnny, med knappar till förhandsvisningen och senaste rapporten. Den är en vy av tillståndsfilen, aldrig en egen källa; formatet bestäms först (`3-1`). Förebild: *Goal Meter* (mods-videon 2). Prompt: *"Skapa en Claude-mod som visar en panel bredvid chatten. Den läser `<tillståndsfilen>` och visar alla steg med status, aktuell rättningsrunda, antal fel per allvarlighetsgrad och antal öppna antaganden. Visa tydligt när flödet väntar på Johnny. Lägg till knappar till förhandsvisningen och senaste rapporten. Uppdatera när filen ändras."*
- [N2] **Utan mods:** samma information i statusraden eller en lokal HTML-sida som läser tillståndsfilen.
- [N4] **Cachen:** *Cache Keeper* (mods-videon 2) visar kontext, 5-timmars- och veckogräns, kostnad och cacheklocka; enligt videon läses kontexten om till fullt pris efter 60 minuter utan nytt meddelande ⚠️. En långlivad orkestrerare gör en överlämning i stället för att låta cachen kallna (fallgrop 137).

| Fler mods 🎥 | Användning |
|---|---|
| *Assumption Check* | [N4] Antaganden markeras rätt eller fel i en panel; ersätter listan under *Förhandsvisning*. |
| *Replay Theater* (officiellt exempel) | [N4] Spelar upp ändringarna steg för steg – live-visning i efterhand av det som byggdes när ingen tittade. |
| *Recording Mode* | [N3] Döljer andra kunders data, personuppgifter och hemligheter när Johnny visar bygget för en kund (fallgrop 138). |
| *Collision Guard* | [N4] Varnar om en annan session rört filen de senaste 30 minuterna. |
| *Blast Radius* (officiellt exempel) | [N4] Visar vad som skulle raderas innan det raderas (jfr skyddshooken, `3-3`). |
| *Session Monitor*, *Plain Answers* | [N4] Sessionernas status vid parallellt arbete; statusraden som reserv. |
| *Prompt Enhancer*, *Next Steps*, *Design Picker* | Låg relevans: flödet anger skills själv, och riktningarna visas som riktiga sidor (`2-5`). |

- [N4] **Agentvyn fungerar utan mods:** `claude agents` visar bakgrundssessionerna, `claude --bg "<prompt>"` startar en, `/bg` flyttar en pågående dit, `claude attach|logs|stop|rm <id>` hanterar dem. Research preview i 2.1.281 (📄 `2026-10-14_claude-code-verifiering.md` §9).
