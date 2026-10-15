# Läget

Uppdaterad 2026-10-15 kl. 19.55 på Johnnys Mac, efter den första sessionen där.

## Kort

- **Guiden v1.0 är genomläst med Johnny** 2026-10-15 i sin helhet: README, kundens väg, byggplanen, alla nio lagren, flödet 3.1–3.5, företaget och bilagorna. Varje rättelse står ordagrant i `BESLUT.md` med datumet 2026-10-15.
- **Måttstocken är godkänd:** `mattstock/mattstock.md`. Den har tre frågor, mobilen först: förstår och når kunden företaget på mobilens första skärm, är det äkta, håller utförandet. Den bygger på Johnnys domar över 39 sajter (`mattstock/domar.jsonl`).
- **N1 har 76 regler och tio automatiska kontroller.** Johnny godtog att taket på cirka 60 överskreds. Sammanfattningen genereras till `guide/n1-forsta-sajten.md` med `python konsolidering/bygg_n1.py`.

## Det viktigaste som beslutades 2026-10-15

Detaljerna står i `BESLUT.md`.

| Beslut | Var |
|---|---|
| **Övningssajter för verkliga lokala firmor**, en i taget, tills Johnny är nöjd. Firman har inte beställt sajten och kontaktas inte. Övningssajterna ligger högst på en förhandsadress bakom Access, och allt om firman finns bara i `sites/` | `guide/5-byggplan.md`, *Övningssajterna*; `2-1-strategi.md`, *Övningsläget* |
| **Bygget görs på Johnnys Mac** med den nyaste Claude Code | `guide/3-3-sakerhet-och-installningar.md` |
| **De tre första kiten** tas fram ur måttstocken: Lugn och luftig, Varm och välkomnande, Djärv och egen | `guide/2-5-yta.md` |
| **Mobilens första skärm** svarar på vad, var och hur. Därefter följer *Det praktiska*. Sidhuvudet har kontaktvägen, fast i toppen på mobilen | `guide/2-4-skelett.md`, `2-3-struktur.md` |
| **Rörelse:** den första övningssajten byggs i två versioner, sparsam och måttlig, som Johnny dömer på video | `guide/2-6-rorelse.md` |
| **Stock- och AI-bilder är tillåtna, även av personer.** De visas aldrig som kundens personal, och fotorealistiska AI-personer märks | `guide/2-7-innehall.md` |
| **Granskaren** börjar med måttstocken och mäts först på måttstockens 31 sajter i steg 4 | `guide/3-2-granskning-och-kalibrering.md`, `5-byggplan.md` |
| **Provsajt ("Benchy"), branschprofiler och blickprov i steg 2**, efter jämförelsen med en 3D-skrivare | `guide/3-2`, `2-2-omfattning.md`, `2-4` |
| Astro statiskt är bekräftat. Inter och Lucide väljs per kit | `guide/2-8-teknik-och-kvalitet.md`, `2-5` |

## Gjort på Macen 2026-10-15

- **Repot är klonat** till `~/nortropic-repos/nortropic-builder`. Det ligger nu på <https://github.com/Nortropic/Nortropic-Builder>.
- **Användarnivån är inventerad.** Krockarna med guiden är listade, avgränsningen är prövad och de versionsberoende fakta är kontrollerade mot 2.1.296. Allt står i `kunskap/research/2026-10-15_mac-avgransning.md`. Inget i Johnnys globala konfiguration är ändrat.
- **Johnny sa ja till allt** kl. 19.45 (`BESLUT.md`):
  - Byggsessionen avgränsas med `~/.claude-bygg`, och katalogens `settings.json` är skapad.
  - Claude Code är uppdaterad till 2.1.300.
  - Rättelserna är införda i `guide/3-3`, `3-5`, `5-byggplan` och bilaga E.
  - Före inloggningen är det prövat att bara repots `CLAUDE.md`, inbyggda skills och Manual-läget laddas, utan MCP-servrar.
- **De största krockarna:**
  - Auto memory laddar webb-pros gamla ägarbeslut i varje session.
  - Auto mode är standard, och sedan 2.1.283 även när inget läge är satt.
  - `superpowers` har en hook som styr arbetssättet.
  - MCP-verktyg kan publicera förbi deny-reglerna.
  - `~/.claude/CLAUDE.md` säger åt Claude att använda `cf`.
  - `~/.claude/CLAUDE.md` laddas också med en egen `CLAUDE_CONFIG_DIR`, eftersom hemkatalogen är en överordnad katalog till repot.
- **Det guiden såg på Windows finns inte på Macen:** 292 skills, `nortropic-stack` och de gamla delagenterna.

## Nästa steg – på Macen

1. **Verifiera byggsessionen** (`guide/3-3`, N1). Johnny lägger in genvägen `claude-bygg`, startar den från repots rot och loggar in en gång med `/login`. Därefter:
   - Johnny kör `/status`, `/context`, `/skills` och `/mcp` i byggsessionen.
   - Claude kör `/context` och init-provet med `CLAUDE_CONFIG_DIR=~/.claude-bygg` och sparar utdata som belägg.
   - Det som prövas är att synken, connectorerna och Chrome-verktygen håller sig borta när sessionen är inloggad.
2. **Byggsessionen tar över.** Från och med nu körs arbetet med byggsystemet i `claude-bygg`, inte i den vanliga konfigurationen.
3. **Förberedelserna** i `guide/5-byggplan.md`:
   - en kort `CLAUDE.md`
   - `.claude/settings.json` med `permissions.deny` för push, deploy och `.env`. Förslag: lägg till `cf deploy`, `cf builds` och `cf pages`.
   - kärnfrågorna och briefmallen
4. **Johnny väljer den första firman.** Förslaget är en av måttstockens underkända svenska firmor, eftersom hans *För godkänt:* redan säger vad sajten måste klara. Exempel är MB Bygg, Torsokliniken, Gustafsbro och Eriksbergs Cykel.
5. **Byggplanens steg 1–6**, med en genomgång efter sajten.

## Väntar på Johnny

- **Genvägen och inloggningen i byggsessionen.** Kommandona står i `kunskap/research/2026-10-15_mac-avgransning.md`, avsnitt 3.
- **Ansökan om API-åtkomst för Google Business Profile.** Bara Johnny kan ansöka, och svaret tar upp till 14 dagar.
- **Ett Cloudflare-konto för byrån** inför steg 5. Det är ett mänskligt klick, och övningssajterna ligger på byråns konto.
- **Bilaga E:** avsnitt 1 och 2 är avgjorda. 1.8 (integritetspolicy) och 1.9 (betalning) väntar till den första riktiga kunden, och 2.4, 2.7 och 2.8 till förvaltningen. Avsnitt 3 gäller senare nivåer. Avsnitt 4 verifieras under bygget.
- **Repot är publikt** (Johnny: "det ändrar vi sen"). Måttstockens domar över namngivna firmor pushades med Johnnys godkännande.

## Verktyg i repot

- `mattstock/verktyg/` innehåller fångsten med Playwright (helsidesbilder i mobil och dator), bedömningssidan och analysen. De används för nya omgångar, till exempel för att kalibrera på systemets egna utkast.
- `konsolidering/bygg_n1.py` genererar N1-sammanfattningen. Skriptet kräver Python 3.10 eller senare. På Macen är `python3` version 3.9, så kör det med `/opt/homebrew/bin/python3.12`.
- Bedömningssidan med Johnnys domar finns som privat artefakt på claude.ai: <https://claude.ai/artifact/16Cz4NeibCYDDsKGD3sdsq>. Domarna finns också i `mattstock/domar.jsonl`.
