# PolyFuzz

- **Källa:** [MaartenGr/PolyFuzz](https://github.com/MaartenGr/PolyFuzz), commit `9d4814b`, 2025-07-10. Läst 2026-10-16 ur en klon: README i sin helhet; ärendena via GitHub. Den fullständiga dokumentationen på maartengr.github.io/PolyFuzz är inte läst (⚠️).
- **Licens:** MIT.
- **Vad det är:** ett Python-bibliotek för ungefärlig strängmatchning och gruppering, som samlar flera metoder i ett gränssnitt.
- **Hur det fungerar:** två listor, en att matcha från och en att matcha till. Metoderna är redigeringsavstånd, TF-IDF på teckennivå med cosinuslikhet och inbäddningar (FastText, GloVe, transformers). `get_matches()` ger varje par med ett likhetsvärde. Extra paket för inbäddningar installeras separat.
- **Kvalitet och underhåll:** 804 ★, åtta bidragsgivare, senaste push 2025-07-10 (15 månader), 32 öppna ärenden och PR. Öppna installationsfel: #79 `get_cmap` är borttaget i matplotlib 3.9, #72 SBERT installeras inte med Python 3.12, #61 och #56 för snäva versionskrav på torch.
- **Det bästa vi kan ta:** idén att para ihop gamla och nya adresser eller titlar efter likhet och låta en människa granska förslagen.
- **Var det hamnar hos oss:** ingenstans. En småföretagssajt har oftast färre än 50 gamla adresser, och en agent som läser sidornas innehåll parar ihop dem bättre än ett likhetsvärde på adressen. Prövas igen om en kund har hundratals adresser.
- **Passar vår stack?** Tekniskt ja som lokalt Python-verktyg, men behovet saknas.
- **Risker och flaggor:** inaktivt i 15 månader och installationsfel med aktuella versioner av matplotlib och Python.
- **Inloggning:** nej.
