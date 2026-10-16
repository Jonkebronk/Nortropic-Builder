# Sidbyten, scroll-drivna animationer och in-animationer

Delfil till `SKILL.md`. Reglerna står i guiden (→ `guide/2-6-rorelse.md`, *Sidövergångar och in-animationer*). Här står hur tekniken fungerar i dag, vad provet på övningssajten visade och vad som måste vara uppfyllt.

## Sidbyten med `@view-transition`

**Läget 2026-10-16** (📄 MDN browser-compat-data, commit `078588a`):
- `@view-transition` för byten mellan dokument finns i Chrome 126 och Safari 18.2. Firefox saknar stöd (bugg 1860854) och visar en vanlig navigering. Funktionen är inte Baseline.
- Övergångar inom samma dokument (`view-transition-name`) finns i Chrome 111, Safari 18 och Firefox 144.

**Så fungerar det** (📄 MDN; Chrome for Developers, *Cross-document view transitions*; W3C, CSS View Transitions 1):
- Båda sidorna måste ha `@view-transition { navigation: auto; }`, och de måste ha samma ursprung, utan omdirigering till ett annat ursprung.
- Övergången körs bara när besökaren navigerar inne i sidan, med en länk eller med bakåt och framåt. Adressfältet, bokmärken och omladdning ger ingen övergång.
- Tar navigeringen mer än fyra sekunder hoppar Chrome över övergången.
- Standarden är en korstoning på 250 ms (`::view-transition-group(*) { animation-duration: 0.25s }`): den gamla sidan tonas ut medan den nya tonas in.
- Ett element med ett eget `view-transition-name`, till exempel sidhuvudet, står stilla medan resten tonas. Namnet måste vara unikt på sidan, annars hoppas övergången över.
- `<link rel="expect" blocking="render">` håller tillbaka första målningen. Chrome avråder från det om effekten inte mäts.

**Vad provet på övningssajten visade** (Playwright i Chromium, 2026-10-16; CSS:en lades bara in i testwebbläsaren):
- Övergången kördes (`pagereveal` gav ett `viewTransition`), och med `reduce` kördes den inte, eftersom regeln låg inom `no-preference`.
- **Efter 70 ms syntes båda sidornas text samtidigt**, den gamla sidans rubrik och knappar genom den nya. Det krockar med Johnnys princip att texten ska vara läsbar i samma ögonblick den syns.
- LCP på målsidan gick inte att jämföra lokalt: spridningen var 84–440 ms utan övergång och 104–548 ms med. Lighthouse mäter en sidladdning i taget och ser inte övergången, så effekten syns bara i fältdata ⚠️.
- Sajtens innehållspolicy (CSP) stoppar `<style>` som läggs in i efterhand. Regeln ska därför ligga i bibliotekets CSS, som Astro lägger in och hashar.

**Därför:**
- Sidbyten slås inte på i sparsam förrän Johnny har sett dem på video. Guidens tabell räknar dem till sparsam från sajt 2, men det är ett förslag och en öppen fråga (→ `guide/2-6-rorelse.md`; `guide/bilaga-e-oppna-fragor.md`).
- Om Johnny säger ja: regeln står inom `@media (prefers-reduced-motion: no-preference)`, sidhuvudet får ett eget `view-transition-name` och står stilla, korstoningen är högst 200 ms, och prefetch vid hover (Astros `prefetch`) håller väntan kort.
- Inte Astros `<ClientRouter />` (→ `guide/2-6-rorelse.md`).
- Riktningsberoende övergångar, där sidan glider åt ett håll framåt och åt andra hållet bakåt, är en förflyttning över hela skärmen. De hör till expressiv budget. 📄 Val Head 2015: stora rörelser i förhållande till skärmen kan utlösa besvär.

## Scroll-drivna animationer

**Läget 2026-10-16:** `animation-timeline` med `scroll()` och `view()` finns i Chrome 115 och Safari 26. Firefox får det i version 159, som enligt MDN släpps 2026-10-27 och i dag är beta. Efter det finns funktionen i alla tre motorerna. Guiden skriver *inte Baseline* (→ `guide/2-6-rorelse.md`), vilket blir inaktuellt den dagen; förslag till Johnny 2026-10-16 att uppdatera texten. 📄 MDN browser-compat-data.

- Används bara i måttlig och expressiv budget, inom `@supports (animation-timeline: view())` och `@media (prefers-reduced-motion: no-preference)`, med synligt innehåll som grundläge (→ `guide/2-6-rorelse.md`).
- Animationen kan gå utanför huvudtråden och klarar sig då när sidan är upptagen. 📄 Chrome for Developers, *Scroll-driven animations*. Det gäller transform och opacitet. En skugga (`box-shadow`) som ändras med scrollen målas om i varje bildruta; lägg skuggan på ett pseudoelement och ändra dess opacitet i stället. 📄 Kowalski, `animation-performance`, *What You Animate* (MIT).
- En scroll-driven animation pågår så länge besökaren scrollar och slutar när scrollen slutar. Den följer besökarens rörelse och är ingen scroll-kapning, så länge scrollens fart och riktning inte ändras. 📄 NN/g, *Scrolljacking 101* (2023).

### Den byggda CSS:en

- **Krav:** `animation-timeline` står som en egen deklaration i den CSS som når besökaren. Enligt specen ingår den i förkortningen `animation`, men *"if an `<animation-timeline>` value is included, but the user-agent doesn't support `<animation-timeline>` values within the shorthand, the entire `animation` declaration is invalid and ignored"*. 📄 MDN, *animation*.
- **Varför det behöver kontrolleras:** Lightning CSS 1.33, som Vite 8 och därmed Astro 7 minifierar CSS med, slår utan angivna webbläsarmål ihop raderna till `animation: linear both namn view()`. Chromium 156 avvisar den (`CSS.supports('animation', 'linear both namn view()')` ger `false`), och animationen körs aldrig. Med webbläsarmål behåller Lightning CSS raderna. Uppmätt 2026-10-16 på bibliotekets provsida med måttlig rörelse: sektionernas in-animation och sidhuvudets skugga körs inte i bygget men fungerar när samma regel läggs in som den står i källan. 🔧 egna prov.
- **Kontrollen:** sök i den byggda HTML:en efter `view()` eller `scroll()` inne i en `animation:`-deklaration, och läs `getComputedStyle(element).animationName` i sidan. I utvecklingsservern minifieras inget, så felet syns bara i bygget.

## In-animationer i måttlig budget

Bara när briefen anger måttlig. Villkoren står i guiden (→ `guide/2-6-rorelse.md`, *Måttlig*):
- **Aldrig på första skärmen**, varken text eller bild. Förstavyns bild är ofta sidans LCP-element.
- **Från minst 70 % opacitet** och en kort förskjutning, cirka 8–24 px, på 300–450 ms med entrékurvan. Johnnys dom (`BESLUT.md` 2026-10-15).
- **En gång.** En sektion som animeras varje gång den passerar motarbetar läsaren. 📄 Kowalski, *RECIPES.md* (*Scroll reveal*). Det gäller in-animationer som startar på tid. En scroll-driven animation med `view()` följer scrollen åt båda hållen: när besökaren scrollar tillbaka uppåt tonas sektionerna under skärmen ner till 0,7 igen, och de animeras på nytt nedåt. Om det stör den som läser om avgörs på video (C61). 🔧
- **Hover-lyft i måttlig** ligger inom `@media (hover: hover) and (pointer: fine)` som all annan hover. Uppmätt på provsidan 2026-10-16: ett kort som trycks på i mobilen står kvar lyft med skugga tills besökaren trycker någon annanstans. 📄 Kowalski, `mobile-native` §1.
- **Grupper förskjuts 30–80 ms** per element och blockerar aldrig ett klick under tiden. 📄 Kowalski, *Stagger*.
- **Text som visas och försvinner under scrollen** tvingar besökaren att minnas den, och avslöjanden kan få sidan att se slut ut för tidigt. 📄 NN/g, *Scrolljacking 101*.

**Teknik, billigast först** (→ [verktyg.md](verktyg.md)):
1. CSS med `animation-timeline: view()` – ingen JavaScript, men följer scrollen åt båda hållen och måste kontrolleras i bygget (*Den byggda CSS:en* ovan).
2. `IntersectionObserver`, som sätter ett attribut, och en CSS-övergång – några rader JavaScript.
3. Motions `inView` (0,5 kB) och `animate` i mini-bygget (3,2 kB enligt motion.dev 2026-10-16; guiden anger 2,3 kB från 2026-10-13) – när en sekvens eller en fjäder behövs.
