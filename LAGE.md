# Läget

Uppdaterad 2026-10-15 kl. 21.42 på Johnnys Mac, i den första byggsessionen (`claude-bygg`).

## Kort

- **Guiden v1.0 är genomläst med Johnny** 2026-10-15 i sin helhet: README, kundens väg, byggplanen, alla nio lagren, flödet 3.1–3.5, företaget och bilagorna. Varje rättelse står ordagrant i `BESLUT.md` med datumet 2026-10-15.
- **Måttstocken är godkänd:** `mattstock/mattstock.md`. Den har tre frågor, mobilen först: förstår och når kunden företaget på mobilens första skärm, är det äkta, håller utförandet. Den bygger på Johnnys domar över 39 sajter (`mattstock/domar.jsonl`).
- **N1 har 76 regler och tio automatiska kontroller.** Johnny godtog att taket på cirka 60 överskreds. Sammanfattningen genereras till `guide/n1-forsta-sajten.md` med `python konsolidering/bygg_n1.py`.

## Det viktigaste som beslutades 2026-10-15

Detaljerna står i `BESLUT.md`.

| Beslut | Var |
|---|---|
| **Övningssajter för verkliga lokala firmor**, en i taget, tills Johnny är nöjd. Firman har inte beställt sajten och kontaktas inte. Övningssajterna publiceras inte och visas bara lokalt (ändrat kl. 21.35), och allt om firman finns bara i `sites/` | `guide/5-byggplan.md`, *Övningssajterna*; `2-1-strategi.md`, *Övningsläget* |
| **Bygget görs på Johnnys Mac** med den nyaste Claude Code | `guide/3-3-sakerhet-och-installningar.md` |
| **De tre första kiten** tas fram ur måttstocken: Lugn och luftig, Varm och välkomnande, Djärv och egen | `guide/2-5-yta.md` |
| **Mobilens första skärm** svarar på vad, var och hur. Därefter följer *Det praktiska*. Sidhuvudet har kontaktvägen, fast i toppen på mobilen | `guide/2-4-skelett.md`, `2-3-struktur.md` |
| **Rörelse:** den första övningssajten byggs i två versioner, sparsam och måttlig, som Johnny dömer på video | `guide/2-6-rorelse.md` |
| **Stock- och AI-bilder är tillåtna, även av personer.** De visas aldrig som kundens personal, och fotorealistiska AI-personer märks | `guide/2-7-innehall.md` |
| **Granskaren** börjar med måttstocken och mäts först på måttstockens 31 sajter i steg 4 | `guide/3-2-granskning-och-kalibrering.md`, `5-byggplan.md` |
| **Provsajt ("Benchy"), branschprofiler och blickprov i steg 2**, efter jämförelsen med en 3D-skrivare | `guide/3-2`, `2-2-omfattning.md`, `2-4` |
| Astro statiskt är bekräftat. Inter och Lucide väljs per kit | `guide/2-8-teknik-och-kvalitet.md`, `2-5` |
| **Läge, modell och effort är Johnnys inställningar, inte regler.** Byggsessionen körs i auto mode med Opus 5.5 på xhigh (kl. 20.13–20.14) | `BESLUT.md`; `guide/3-3` |
| **Fritt mandat för förberedelserna:** mallarna i `mallar/` (kl. 20.30) | `BESLUT.md`; `guide/5-byggplan.md`, bilaga F |
| **Inget Cloudflare eller Google-API för övningssajterna.** Steg 5 övas inte förrän den första riktiga kunden (kl. 21.35) | `BESLUT.md`; `guide/5-byggplan.md` |
| **Inga spärrar.** Allt arbete med Nortropic-Builder, också sajtarbetet, görs från en session i repots rot i auto mode (kl. 21.16–21.20) | `BESLUT.md`; `guide/3-3` |

## Gjort på Macen 2026-10-15

- **Repot är klonat** till `~/nortropic-repos/nortropic-builder`. Det ligger nu på <https://github.com/Nortropic/Nortropic-Builder>.
- **Användarnivån är inventerad.** Krockarna med guiden är listade, avgränsningen är prövad och de versionsberoende fakta är kontrollerade mot 2.1.296. Allt står i `kunskap/research/2026-10-15_mac-avgransning.md`. Inget i Johnnys globala konfiguration är ändrat.
- **Johnny sa ja till allt** kl. 19.45 (`BESLUT.md`):
  - Byggsessionen avgränsas med `~/.claude-bygg`, och katalogens `settings.json` är skapad.
  - Claude Code är uppdaterad till 2.1.300.
  - Rättelserna är införda i `guide/3-3`, `3-5`, `5-byggplan` och bilaga E.
  - Före inloggningen är det prövat att bara repots `CLAUDE.md` och inbyggda skills laddas, utan MCP-servrar.
- **Johnny har loggat in i byggsessionen.** Efter inloggningen visade `claude -p "/context"` och init-provet med `~/.claude-bygg` att bara repots `CLAUDE.md` och inbyggda plugins, skills och delagenter laddas. Det fanns inga MCP-servrar, inga claude.ai-connectorer och ingen auto memory (`kunskap/research/2026-10-15_mac-avgransning.md`, *Tillägg kl. 20.15*).
- **Johnny valde auto mode och Opus 5.5 på xhigh** och sa att det inte ska vara regelstyrt (`BESLUT.md`). Bevakad körning är struken ur `guide/3-3`, och C165 i bilaga C gäller nu bara att N1 inte har några hooks.
- **Byggsessionen är verifierad och har tagit över** (kl. 20.26).
  - Inifrån laddade den interaktiva sessionen också `claude-in-chrome` och `ide`, vilket `-p` inte hade visat.
  - Chrome-verktygen spärrades kl. 20.25 och släpptes igen kl. 21.16 (*Inga spärrar*).
  - `ide` publicerar ingenting och får vara kvar.
  - Johnny körde `/status`, `/skills` och `/mcp`: *"allt är grönt"*.
  - Arbetet med byggsystemet görs från och med nu i `claude-bygg`. En session är byggsessionen bara om `CLAUDE_CONFIG_DIR` är `~/.claude-bygg`.
  - Detaljerna står i `kunskap/research/2026-10-15_mac-avgransning.md`, *Sett inifrån byggsessionen*.
- **Inga spärrar** (Johnny 21:16–21:20, `BESLUT.md`). Inga `permissions.deny` finns kvar någonstans, och Chrome-verktygen är tillbaka. Allt görs från en session i repots rot i auto mode, också sajtarbetet. Publicering efter Johnnys godkännande och hemligheter utanför repot står kvar som instruktioner i `CLAUDE.md`.
- **Förberedelserna är klara** (kl. 20.30–20.45, med Johnnys fria mandat, `BESLUT.md`):
  - **Mallen `mallar/sajt/`** kopieras till varje sajt. Den innehåller `CLAUDE.md` (39 rader) och `.gitignore`.
  - **`mallar/karnfragor.md`, `mallar/brief.md` och `mallar/fakta.md`** är tagna ur `guide/2-1` och `2-7`.
- **De största krockarna:**
  - Auto memory laddar webb-pros gamla ägarbeslut i varje session.
  - `superpowers` har en hook som styr arbetssättet.
  - MCP-verktyg kan publicera.
  - `~/.claude/CLAUDE.md` säger åt Claude att använda `cf`.
  - `~/.claude/CLAUDE.md` laddas också med en egen `CLAUDE_CONFIG_DIR`, eftersom hemkatalogen är en överordnad katalog till repot.
- **Det guiden såg på Windows finns inte på Macen:** 292 skills, `nortropic-stack` och de gamla delagenterna.

## Nästa steg – på Macen

1. **Den första övningssajten är vald och skapad** i `sites/` ur mallen (Johnny 21:10, `BESLUT.md`). Firmans namn står bara där, i sajtens `progress.md`, som också håller läget.
2. **Steg 1 är klart för Johnnys dom** (fullt mandat, Johnny 21:25; Claude svarade i kundens ställe, 21:40, `BESLUT.md`). Briefen, faktabasen och sidkartan är klara kl. 21.42. Steg 2 är klart för Johnnys dom (kl. 22.08): startsidan i tre kit, blickprovet godkänt. Läget och fynden står i sajtens `progress.md`.
3. **Byggplanens steg 1–6**, med en genomgång efter sajten.

## Väntar på Johnny

- **Stitch:** MCP-servern är tillagd och ansluten (Johnny omkring 21:34, `BESLUT.md`). Nyckeln ligger i `~/.claude-bygg/.claude.json`. Den byts inte (Johnny 21:40). Stitch-CLI:t är inte inloggat, och om MCP-servern räcker i steg 2 är inte prövat.
- **Läsa sajtens `CLAUDE.md`** i `mallar/sajt/CLAUDE.md`. Claude skrev den med mandatet, och Johnny godkänner ändringar i `CLAUDE.md` (bilaga E 2.3).
- **Bilaga E:** avsnitt 1 och 2 är avgjorda. 1.8 (integritetspolicy) och 1.9 (betalning) väntar till den första riktiga kunden, och 2.4, 2.7 och 2.8 till förvaltningen. Avsnitt 3 gäller senare nivåer. Avsnitt 4 verifieras under bygget.
- **Repot är publikt** (Johnny: "det ändrar vi sen"). Måttstockens domar över namngivna firmor pushades med Johnnys godkännande.

## Verktyg i repot

- `mattstock/verktyg/` innehåller fångsten med Playwright (helsidesbilder i mobil och dator), bedömningssidan och analysen. De används för nya omgångar, till exempel för att kalibrera på systemets egna utkast.
- **Push från Macen:** git har `osxkeychain` som inloggning och kan hänga på en behörighetsruta i nyckelringen. `gh` är inloggat som Jonkebronk och fungerar. Pusha med `git -c credential.helper= -c 'credential.helper=!gh auth git-credential' push origin main`, eller låt Johnny köra `gh auth setup-git` en gång, vilket ändrar hans globala git-konfiguration.
- **Stitch:** CLI:t 0.11.1 är installerat globalt men inte inloggat. MCP-servern `stitch` (HTTP, lokal scope i `~/.claude-bygg`) är ansluten.
- **Prov och ändringar av byggsessionens egen konfiguration:** i auto mode stoppade klassaren proven som *Auto-Mode Bypass*, läsningen av `.claude.json` som *Credential Exploration* och en ändring av `~/.claude-bygg/settings.json` som *Self-Modification*. Ändringen gick igenom när Johnny hade sagt till uttryckligen. Prov kan köras från en session i den vanliga konfigurationen.
- **Chrome-verktygen styr webbläsaren på Johnnys Windows-dator, inte på Macen.** Lokala sidor visas på Macen med `open http://127.0.0.1:<port>/`.
- **Astro 7 kör `astro dev` och `astro preview` som bakgrundsprocesser.** Stoppa dem med `npx astro dev stop` eller `npx astro preview stop` i projektets katalog.
- **Startsäkringen** `skript/startsakring.sh` körs först i varje session (`CLAUDE.md`). Den uppdaterar allt till senaste version och skriver vad som ändrades.
- `konsolidering/bygg_n1.py` genererar N1-sammanfattningen. Skriptet kräver Python 3.10 eller senare. På Macen är `python3` version 3.9, så kör det med `/opt/homebrew/bin/python3.12`.
- Bedömningssidan med Johnnys domar finns som privat artefakt på claude.ai: <https://claude.ai/artifact/16Cz4NeibCYDDsKGD3sdsq>. Domarna finns också i `mattstock/domar.jsonl`.
