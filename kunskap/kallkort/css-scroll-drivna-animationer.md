# CSS scroll-drivna animationer

**Källa:** lästa 2026-10-16:
- MDN [browser-compat-data](https://github.com/mdn/browser-compat-data), commit `078588a` (2026-10-16): `css/properties/animation-timeline.json` och `browsers/firefox.json`.
- **Omläst 2026-10-16 (tredje varvet)** vid commit `0416078da7a1` (2026-10-16 11:04 UTC): fyra commits efter `078588a`, som bara ändrade `api/GPUDevice.json` och beroenden (GitHubs jämförelse). Inget i kortet påverkas. Firefox 159 står med `version_added: "159"` utan flagga, alltså påslaget som standard i den versionen.
- [MDN: animation-timeline](https://developer.mozilla.org/en-US/docs/Web/CSS/animation-timeline) via underlaget.
- Chrome for Developers, [Scroll-driven animations](https://developer.chrome.com/docs/css-ui/scroll-driven-animations), via underlaget i `kunskap/research/2026-10-15_kompetensluckor-anteckningar/lager-6-7-rorelse-innehall.md` §7. Sidan lästes inte om i dag ⚠️.
- [web.dev: Interop 2026](https://web.dev/blog/interop-2026), via underlaget.
- Bibliotekets användning i `bibliotek/src/styles/rorelse-mattlig.css:14–27`.
- NN/g, *Scrolljacking 101* (2023).

**Licens:** webbstandard (CSS Scroll-driven Animations, W3C-utkast). BCD är CC0. Inga krav.

**Vad det är:** animationer i CSS vars förlopp följer scrollen i stället för tiden: `animation-timeline: scroll()` för en hel scrollbehållare och `view()` för ett elements väg genom fönstret. Det används för avslöjanden, förloppsindikatorer och effekter som följer scrollen, helt utan JavaScript.

**Hur det fungerar:**
- `animation-timeline` och `animation-range`, till exempel `entry 0% entry 70%`, styr när i scrollen animationen går.
- Kan gå utanför huvudtråden (Chrome for Developers), för transform och opacitet.
- **Stöd 2026-10-16:** Chrome 115 och Safari 26. Firefox kommer i version 159, som är beta i dag och släpps 2026-10-27 enligt BCD. Underlaget 2026-10-13 hade Firefox som *preview*. Efter släppet finns funktionen i alla tre motorerna och blir Baseline *newly available*. Scroll-drivna animationer är ett fokusområde i Interop 2026.

**Kvalitet och underhåll:** en standard med snart tre motorer. Polyfillen `flackr/scroll-timeline` är inaktiv sedan 2024 och ska inte användas (→ `guide/2-6-rorelse.md`, *Avstå*).

**Det bästa vi kan ta:**
- In-animationer och effekter i måttlig och expressiv budget utan en enda rad JavaScript, inom `@supports (animation-timeline: view())` och `no-preference`. → `rorelse/sidbyten-och-scroll.md`.
- En regel för vad som får animeras med scroll: transform och opacitet, inte `box-shadow`. Bibliotekets måttliga sidhuvud animerar skuggan (revisionens fynd R8).

**Var det hamnar hos oss:** kunskap i skillen `rorelse` (`sidbyten-och-scroll.md`) och mönster i bibliotekets måttliga version, som redan använder det (`rorelse-mattlig.css`). Inte i sparsam. Beslut: bibliotek.

**Passar vår stack?** Ja, ren CSS i Astro, utan JavaScript och utan översättning. Det är billigare än Motions `inView` och GSAP ScrollTrigger för samma effekt.

**Risker och flaggor:**
- Guidens *inte Baseline* blir inaktuellt 2026-10-27. Förslag till Johnny att uppdatera texten efter släppet.
- **Scroll-kapning** om scrollens fart eller riktning ändras. Det gör inte `animation-timeline` självt, men långa fästa sektioner gör det (NN/g).
- **Reducerad rörelse:** den globala återställningen tar bort `animation`, men regeln ska ändå skrivas inom `no-preference` (→ `rorelse/reducerad.md`).
- **Innehåll som börjar dolt:** grundläget ska vara synligt, och måttlig startar från minst 70 % opacitet (Johnny 2026-10-15).
- Inga flaggor för licens, telemetri eller inloggning.
