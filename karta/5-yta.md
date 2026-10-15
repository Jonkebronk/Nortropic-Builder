# Lager 5: Yta

**Status:** utkast ur rapporten, inte genomgånget med Johnny.

## Vad byrån gör

Bestämmer typografi, färg, avstånd, ikoner och bildbehandling, alltså den visuella identiteten inom systemet.

## Vad som kommer ut

Ett stilkit per riktning: ett tokenset över samma sektioner. Biblioteket har 3–5 kit, till exempel Trygg och traditionell, Stram och modern, Varm och välkomnande och valfritt Lekfull.

## Kompetens

- **Egen skill:** ytskillen, destillerad ur better-colors, better-typography, better-ui, emil-design-eng, frontend-design och smakskillsen, med *Refactoring UI*, Butterick och Vercels Web Interface Guidelines.
- **Eget bibliotek:** kiten i DTCG 2025.10, byggda med Terrazzo till Tailwind 4, paletter med Adobe Leonardo och Radix tolv steg, kuraterade OFL-typsnitt via Astros Fonts API och Fontsource, flytande skalor med Utopia, och ikoner från Lucide.
- **Förankring:** DTCG 2025.10, WCAG 2.2 AA (1.4.3, 1.4.11 och 1.4.4), *Refactoring UI*, Butterick och Språkrådets skrivregler för siffror och citattecken. Om trovärdighet: utseendet var det som oftast nämndes i kommentarerna i Consumer WebWatch-studien, och estetik förlåter små brister men inte stora (NN/g).

## Kontroll

Kontrasten spärras redan i token-bygget. WCAG 2.2 AA är hård spärr och APCA bara rådgivande. Flytande typ får ha ett maxvärde på högst 2,5 gånger minvärdet. En checklista med 26 punkter skiljer premium från basic. Det mesta kontrolleras automatiskt, och resten bedöms av bedömaren.

## Autonomi

Valet av kit per kund är självgående. Kiten byggs och godkänns av Johnny.

## Öppet

- Vilka kit, och hur många?
- Kan Terrazzo ge kit som byts med `[data-kit]`? Inte provat.
- Go-temats designstilar är GPL-2.0, så bara parametrarna studeras.

## Underlag

Rapporten, lager 5, `kunskap/research/2026-10-15_kompetensluckor-anteckningar/lager-5-yta.md` och inventeringen, lager 5.
