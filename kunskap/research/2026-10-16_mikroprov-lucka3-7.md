# Mikroprov: luckorna 3–7 i skillsen

**Datum:** 2026-10-16, natt. **Uppdrag:** skillsen steg 3, luckorna 3–7 i översynen (`kunskap/research/2026-10-16_verktyg-och-skills-full-potential.md`). **Metod:** `.claude/skills/larande/skills.md`, *Mikroprov av formuleringen*, med kontrollen först (`BESLUT.md` 2026-10-16, *Skillsen steg 3, lucka 1*). Kontrollen är skillsen i `HEAD` 5d5036b. Uppgiften var en plan utan körning mot webbläsaren. Felet per prov skrevs ner innan svaren lästes.

## Utfallet

| Lucka | Prov | Skill | Felet | Kontrollen | Ny text |
|---|---|---|---|---|---|
| 3 seo-monster | S1 | struktur | seo-monster körs mot förhandsvisningen | 0 av 5 | – |
| 3 seo-monster | S2 | innehåll | seo-monsters ordverktyg som underlag för svensk text | 0 av 5 | – |
| 4 Developer Knowledge | L1 | strategi | `answer_query` citeras som källa, eller nyckeln står i adressen | 0 av 5 | – |
| 5 Astro Docs | A1 | kvalitet | En Astro-fråga besvaras utan primärkälla | 0 av 5 | – |
| 6 Video | V1 | rörelse | Videon till Johnny går inte att spela utan anvisning | 0 av 5 | – |
| 7 kontroll.mjs | K1 | skelett | Kontrollistan prövas för hand utan kontrollskriptets resultat | **2 av 5** | **0 av 5** |
| 7 kontroll.mjs | K2 | rörelse | Samma | 0 av 5 | – |
| 7 kontroll.mjs | K3 | struktur | Samma | **4 av 5** | **0 av 5** |

**Luckorna 3–6:** kontrollen visade inte felen. Agenterna hittade reglerna i `BESLUT.md` (domarna 21.37), `guide/3-3`, `drift/verktyg.md`, övningssajtens `mcp-prov.md` och `kvalitet/webblasarverktyg.md` från lucka 1. Inga pekare förs in.

**Lucka 7:** skelett och struktur får var sin rad före kontrollistan, som säger att det kontrollskriptet redan prövar tas ur skriptet och vilken kontroll som hör till vilken punkt. I den nya armen körde alla tio om skriptet, eftersom `senaste.json` var äldre än bygget, och läste de kopplade kontrollerna. Rörelse visade inte felet, eftersom dess kontrollista redan nämner C56–C58. Granskaren prövades inte: den har redan *Vad granskningen inte dömer* med pekare till kontrollskriptet.

**Gränsen för "delvis":** ett svar som tog skriptets resultat för en enda punkt räknades som fel, och två punkter eller fler som rätt (K1 d1e972, K3 9b1880). Regeln skrevs före bedömningen av K2 och K3 (`kriterier.md`).

## Sidoiakttagelser

- **Förhandsvisningen kan bara visa sparsam rörelse.** Alla fem V1-svar såg att bygget har `data-rorelse="sparsam"`, att `?rorelse=` inte gör något och att `rorelse-mattlig.css` inte importeras. Menyns rörelse står i `Sidhuvud.astro` och är densamma i båda budgetarna. En video av måttlig rörelse kräver ett eget bygge eller bibliotekets provsida (`/prov/lugn?rorelse=mattlig`).
- **Kontrollskriptets resultat var äldre än bygget** (`senaste.json` 19.17, `dist` 22.20).
- **`kvalitet/sakerhet.md`:** Astro 7.1 lade till fältet `kind` för `script-src-elem` och `-attr`. Det är infört efter Astros dokumentation (Astro Docs-MCP:n, 2026-10-16).
- **Strukturen:** övningssajten har fyra tjänstesidor men ingen översiktssida (redan i premiumpassets grupp B); `dist/provtaggar/` är samtyckesverktygets provskript, ingen sida.
- **Menyns längder** står som millisekunder i `Sidhuvud.astro`, inte som kitets tokens (rörelsens princip 7). Det har setts förut.

## Kostnad

- 50 körningar, cirka 5,3 miljoner token, 1,5–4 minuter per körning.
- Kontrollen först sparade 30 körningar: sex prov utan fel behövde ingen ny arm.

Svaren, kriterierna och bedömningen ligger i sessionens scratch (`mp5/`) och följer inte med repot.
