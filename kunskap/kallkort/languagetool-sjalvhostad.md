# LanguageTool självhostad

**Källa:** https://github.com/languagetool-org/languagetool (senaste tagg v6.8, commit 2026-05-05; grenen pushad 2026-10-16); https://dev.languagetool.org/languages (tabellen avser LanguageTool 6.6, daterad 2025-03-27); https://dev.languagetool.org/http-server; https://dev.languagetool.org/public-http-api; svenska regelfilen `languagetool-language-modules/sv/src/main/resources/org/languagetool/rules/sv/grammar.xml`. Läst 2026-10-16. Inget installerat eller kört (uppdraget).

**Licens:** LGPL-2.1 (GitHub). Att köra servern lokalt som separat tjänst ställer inga krav på vår kod. Sprider vi den, eller en ändrad version, gäller LGPL:s krav på källkod och licenstext.

**Vad det är:** En regelbaserad stavnings- och grammatikgranskare i Java för över 30 språk, med en inbyggd HTTP-server. Det publika API:t och den betalda molntjänsten har fler regler (AI-baserade) än öppen källkod.

**Hur det fungerar:**
- **Lokalt:** ladda ner `LanguageTool-latest-snapshot.zip`, och starta med `java -cp languagetool-server.jar org.languagetool.server.HTTPServer --config server.properties --port 8081 --allow-origin`. Kräver Java 8 eller senare. Utan fastText-modell blir språkigenkänningen sämre (vi anger ändå `language=sv`). Servern lyssnar bara lokalt utan `--public`. Anrop: `POST /v2/check` med `language` och `text`.
- **Svenska i 6.6:** 32 XML-regler och 2 Java-regler, stavning finns, 0 förväxlingspar, aktivitet 0 (inga regeländringar på ett halvår). Som jämförelse har katalanska 8 251 XML-regler och engelska 6 074.
- **Svenska i dag:** `grammar.xml` har 31 `<rule>` – särskrivning och sammanskrivning, förkortningar med punkt, adjektiv- och artikelkongruens, förväxlade ord, kontamination m.fl. Ändringar i modulen 2026: förkortningar i meningsdelningen (2026-09-10, 2026-09-07).
- **Publika API:t** (`api.languagetool.org/v2/check`): inga automatiserade anrop (kör egen server eller köp Enterprise), bara POST, 20 anrop per IP och minut, 75 kB per minut, 20 kB per anrop, förslag för högst 30 felstavade ord. Versionen byts utan förvarning, och regler som inte finns i öppen källkod kan vara aktiva. Användaren ska få veta hur texten hanteras, och en länk till languagetool.org utan `nofollow` krävs.

**Kvalitet och underhåll:** 15 143 stjärnor, 1 587 forkar, cirka 276 bidragsgivare (inklusive anonyma), 2 154 öppna ärenden, push 2026-10-16. Svenska ärenden som är öppna:
- #1953 (2019): *En hus* och *Ett hund* hittas inte – kongruens fångas dåligt.
- #11285 (2025): falsklarm om gemen meningsstart efter *p.g.a.*, *m.fl.* och *t.ex.*
- #9042 (2023): ngram-stöd för svenska, inte infört.
- #12159 (2026, PR): sammansättningskontroll för *käll kod*.
- #234 (2015): "Looking for maintainers" fortfarande öppet.

**Det bästa vi kan ta:** Ett andra pass för grammatik och särskrivning, som Vale och Hunspell inte ser (*rygg behandling* missades av Vale i provet). Värdet för svenska är okänt ⚠️ tills korpusen körts mot en lokal server.

**Var det hamnar hos oss:** Senare (N2), bara om korpusmätningen visar att den fångar mer än den stör. Provet talar inte emot det: Vale missade bara särskrivning och en *inte X utan Y*-variant i korpusen, och det är just där LanguageTools svenska regler finns.

**Passar vår stack?** Delvis. Den kräver Java och en lokal serverprocess i bygget – mer än Vales enda binär. Den tar ren text, så HTML och `.ts` måste först göras om till text (t.ex. med Vales View eller ett eget extraktionssteg). Inget på sajten eller Cloudflare påverkas.

**Risker och flaggor:**
- Publika API:t får inte användas för kundtext: automatiserade anrop är förbjudna, och texten lämnar datorn.
- Java i bygget är ett nytt beroende som ska uppdateras.
- Den svenska regeluppsättningen är liten och ändras sällan; utan mätning är det okänt hur många falsklarm den ger på kundtext.
- Den självhostade versionen saknar molnets AI-regler.
- dev.languagetool.org:s tabell är från 6.6 (2025); nyare siffror per språk ⚠️ inte hittade.
