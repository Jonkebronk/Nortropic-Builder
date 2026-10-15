# Lager 4: Skelett

**Status:** genomgånget med Johnny 2026-10-13. Johnny svarade med frågan om egna skills och bibliotek, som blev beslutet om inventeringen (`BESLUT.md`).

## Vad byrån gör

Bestämmer vilka sektioner varje sida får, i vilken ordning och med vilken layout. Bestämmer rutnät och avstånd, hur komponenterna beter sig i olika lägen och vad ögat ska landa på först. Mobilen kommer först.

## Vad som kommer ut

En skelettplan per sida, ännu utan färger och typsnitt: sektionerna, deras layoutvarianter och vilket innehåll varje plats ska få.

## Kompetens

- **Egen skill:** skelettskillen, destillerad ur better-layout, emil-mobile-native och refero-design, med Atomic Design, mobile first och *Refactoring UI*.
- **Eget bibliotek:** sektionsbiblioteket med 2–3 layouter per sektion, delade tokens och primitiver som fungerar utan JavaScript (`<details name>`, popover och `<dialog>`). Sektionen för serviceområde finns inte i något granskat bibliotek och designas från grunden.
- **Byggverktyg, inte i kundbygget:** AstroWind och Accessible Astro som referens, Fulldev UI, HyperUI och Basecoat för varianter, 21st, Refero, Mobbin och Inspo för mönster, better-variant och emil-prototype för att ta fram varianter, och ai-website-cloner-template för att plocka isär referenssajter.
- **Förankring:** W3C:s ARIA Authoring Practices (navigering som disclosure-mönster, inte som ARIA-meny), GOV.UK Design System (HTML först), Brad Frost (*Atomic Design*), Every Layout och Luke Wroblewski (*Mobile First*).

## Kontroll

Sidan visas automatiskt i mobil, surfplatta och dator. Inget sticker ut över kanten, klickytorna är minst 44 px (Nortropics nivå; WCAG 2.2 AA kräver 24 px), fokus syns och layouten hoppar inte när sidan laddar. Innehållet är synligt utan JavaScript. En separat AI gör ett femsekunderstest på en skärmbild: vad ser man först, och är det rätt sak?

## Autonomi

Helt självgående i kundbygget, eftersom AI:n bara väljer bland granskade sektioner. Biblioteket byggs av Johnny och Claude med full designkompetens. Det är där Johnnys smak läggs in, en gång.

## Utkast: kärnsektioner för en hantverkarsajt (inte beslutat)

Varje sektion besvarar en fråga som besökaren har: sidhuvud (ring direkt), första vyn (vad gör ni, och var?), tjänster, utfört arbete, omdömen, så går det till, om oss, område, vanliga frågor (pris, ROT-avdrag, tid), kontakt och sidfot. Tillval per bransch: bokning, prislista, meny, jour, öppettider och vägbeskrivning.

## Underlag

Rapporten, lager 4, `kunskap/research/2026-10-15_kompetensluckor-anteckningar/lager-3-4-struktur-skelett.md` och inventeringen, lager 4.
