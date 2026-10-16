# Mermaid

**Källa:** <https://github.com/mermaid-js/mermaid> (GitHub-API 2026-10-16), dokumentationen för flödesscheman <https://mermaid.js.org/syntax/flowchart.html>, GitHubs stöd för Mermaid i Markdown <https://github.blog/developer-skills/github/include-diagrams-markdown-files-mermaid/> (2022). Mallarna i marketingskills `site-architecture/references/mermaid-templates.md` (via `anteckningar-skelett-struktur/A-skills.md`). Läst 2026-10-16. Ett eget exempel på en sidkarta renderades med mermaid 11.4.1 i Playwright: 11 noder utan fel (`revision-skelett-struktur/sidkarta.mmd`).

**Licens:** MIT. Kräver att licenstexten följer med om koden sprids; diagrammen vi skriver är våra.

**Vad det är:** ett JavaScript-bibliotek som ritar diagram ur text. Flödesscheman (`flowchart TD`) med `subgraph` passar en sidkarta: en nod per sida, en grupp per navigationszon.

**Hur det fungerar:** text i ett kodblock märkt `mermaid` ritas direkt i GitHub och i många Markdown-visare. Noder: `id["Text"]`, kanter `-->` (länk) och `-.->` (sekundär väg), grupper `subgraph namn["Rubrik"] … end`, flera kanter på en rad med `&`, klickbara noder med `click id "url"`. `securityLevel: 'strict'` stänger av skript i etiketter.

**Kvalitet och underhåll:** 90 697 stjärnor, push 2026-10-16, 1 895 öppna ärenden, 856 bidragsgivare (GitHub-API 2026-10-16). Många öppna ärenden, men det gäller ovanliga diagramtyper; flödesscheman är stabila.

**Det bästa vi kan ta:** sidkartan som Mermaid bredvid tabellen i `sites/<namn>/sidkarta.md`, med en grupp per zon (huvudmeny, tjänstesidor, platser, bara i sidfoten) och den primära handlingen som slutnod, så att det syns att varje sida leder dit.

**Var det hamnar hos oss:** `skill: struktur`, delfilen `sidkarta.md` (mall och exempel). Regeln står redan i `guide/2-3-struktur.md` (N2, vid fler nivåer än standardsajten).

**Passar vår stack?** Ja. Diagrammen ritas i GitHub och i artefakter; inget följer med till kundsajten (0 kB JavaScript på sajten).

**Risker och flaggor:** layouten blir rörig med fler än cirka 15 noder; en sidkarta i två källor (tabell och diagram) kan glida isär – tabellen är sanningen och diagrammet genereras eller kontrolleras mot den.

**Inloggning:** krävs inte.
