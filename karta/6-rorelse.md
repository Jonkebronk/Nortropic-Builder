# Lager 6: Rörelse

**Status:** utkast ur rapporten, inte genomgånget med Johnny.

## Vad byrån gör

Lägger till övergångar, hover och rörelse vid scroll som stöder innehållet i stället för att stjäla uppmärksamhet.

## Vad som kommer ut

En rörelsepolicy och ett litet antal färdiga rörelser i biblioteket.

## Policyn

- Innehållet är synligt utan JavaScript, och all rörelse är progressiv förbättring.
- Övergångar mellan sidor görs med CSS `@view-transition`. Firefox visar vanlig navigering.
- In-animationer görs med Motions vanilla-API (`animate` och `inView`), 100–500 ms och ease-out vid entré (NN/g).
- Scroll-drivna animationer används bara inom `@supports`, eftersom de inte är Baseline.
- `prefers-reduced-motion` respekteras, och rörelse som pågår längre än fem sekunder kan pausas (WCAG 2.2.2).

## Kompetens

- **Egen skill:** rörelseskillen, destillerad ur emil-animate, emil-review-animations, motion och gsap, med policyn ovan.
- **Eget bibliotek:** färdiga rörelser och easing-tokens, till exempel ur Open Props.
- **Förankring:** WCAG 2.2.2 och 2.3.3 med tekniken C39, NN/g om animationslängd och MDN:s kompatibilitetsdata.

## Kontroll

Sidan prövas med JavaScript avstängt och med reducerad rörelse. Inget rör sig längre än fem sekunder utan en kontroll för att pausa.

## Autonomi

Helt självgående inom policyn och biblioteket.

## Underlag

Rapporten, lager 6, `kunskap/research/2026-10-15_kompetensluckor-anteckningar/lager-6-7-rorelse-innehall.md` och inventeringen, lager 6.
