# Inventeringen

Alla skills, MCP:er, verktyg och tjänster ur nortropic-webb-pro (72) och nya kandidater från omvärldsbevakningen (99), sorterade på de nio lagren och flödet.

- `inventering.json` innehåller datan och besluten. Ändringar görs här.
- `bygg.py` bygger sidan. Kör `python3 inventering/bygg.py` från repots rot.
- `kompetensinventering.html` är sidan, publicerad som privat artefakt: https://claude.ai/artifact/ASZcbmg8qc9ThMusGjRZpe

## Fälten

- **`befintligt`:** `forslag` är Claudes förslag: Destillera, Extrahera, Byggverktyg, Behåll, Ompröva, Parkera eller Släpp. Antalet krockar kommer ur webb-pros `kunskap/skillkrockar.md` vid commit 66db152.
- **`nya`:** `dom` är rapportens dom, Ta in eller Pröva. Kandidater med domen Bevaka eller Avstå står bara i rapporten, `kunskap/research/2026-10-15_kompetensluckor-och-kandidater-per-lager.md`.
- **`beslut`:** Johnnys beslut. Värdet är "ej fattat" tills han har avgjort, och sidan visar det på varje rad.

Stjärnor och licenser kontrollerades 13–15 oktober 2026 och ändras över tid.
