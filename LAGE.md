# Läget

Uppdaterad 2026-10-15, sen kväll. Överlämning till byggsessionerna på Johnnys Mac.

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

## Nästa steg – på Macen

1. **Klona repot** och läs `LAGE.md`, `BESLUT.md`, `guide/README.md`, `guide/n1-forsta-sajten.md`, `guide/5-byggplan.md` och `mattstock/mattstock.md`.
2. **Avgränsa byggsessionen** (`guide/3-3`, N1):
   - Inventera användarnivån på Macen (`~/.claude`: skills, agenter, plugins, hooks, `CLAUDE.md`).
   - Avgränsa byggsessionen. Förslaget är en egen konfigurationskatalog med `CLAUDE_CONFIG_DIR` och en engångsinloggning. Det är inte prövat på macOS.
   - Verifiera med `/context`, `/skills`, `/agents`, `/mcp` och `/status`, och spara utdata som belägg.
3. **Pröva versionsberoende fakta.** Guiden verifierades på Claude Code 2.1.281 på Windows. Till exempel kräver mods 2.1.287 (`guide/3-5-live-visning.md`).
4. **Förberedelserna** i `guide/5-byggplan.md`:
   - en kort `CLAUDE.md`
   - `.claude/settings.json` med `permissions.deny` för push, deploy och `.env`
   - kärnfrågorna och briefmallen
5. **Johnny väljer den första firman.** Förslaget är en av måttstockens underkända svenska firmor, eftersom hans *För godkänt:* redan säger vad sajten måste klara. Exempel är MB Bygg, Torsokliniken, Gustafsbro och Eriksbergs Cykel.
6. **Byggplanens steg 1–6**, med en genomgång efter sajten.

## Väntar på Johnny

- **Ansökan om API-åtkomst för Google Business Profile.** Bara Johnny kan ansöka, och svaret tar upp till 14 dagar.
- **Ett Cloudflare-konto för byrån** inför steg 5. Det är ett mänskligt klick, och övningssajterna ligger på byråns konto.
- **Bilaga E:** avsnitt 1 och 2 är avgjorda. 1.8 (integritetspolicy) och 1.9 (betalning) väntar till den första riktiga kunden, och 2.4, 2.7 och 2.8 till förvaltningen. Avsnitt 3 gäller senare nivåer. Avsnitt 4 verifieras under bygget.
- **Repot är publikt** (Johnny: "det ändrar vi sen"). Måttstockens domar över namngivna firmor pushades med Johnnys godkännande.

## Verktyg i repot

- `mattstock/verktyg/` innehåller fångsten med Playwright (helsidesbilder i mobil och dator), bedömningssidan och analysen. De används för nya omgångar, till exempel för att kalibrera på systemets egna utkast.
- `konsolidering/bygg_n1.py` genererar N1-sammanfattningen.
- Bedömningssidan med Johnnys domar finns som privat artefakt på claude.ai: <https://claude.ai/artifact/16Cz4NeibCYDDsKGD3sdsq>. Domarna finns också i `mattstock/domar.jsonl`.
