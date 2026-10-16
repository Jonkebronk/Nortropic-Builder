# Ordlista för rörelse

Delfil till `SKILL.md`. Med rätt ord kan en effekt på en referenssajt beskrivas exakt, i ord och parametrar (→ `guide/2-6-rorelse.md`, *Effekter från referenser*). Det engelska ordet står inom parentes, eftersom dokumentation och verktyg använder det. Urvalet och indelningen bygger på Emil Kowalskis `animation-vocabulary` (MIT). Förklaringarna är skrivna med egna ord.

Skriv en effekt så här: **vad** som rör sig, **utlösare**, **egenskaper**, **längd**, **kurva** och **vad som händer med `reduce`**. Till exempel: *"Menypanelen glider in från höger (slide in) när Meny trycks, translateX 100 % → 0, 280 ms, ease-out; med reduce syns den direkt."*

## In och ut

- **Tona in, tona ut** (*fade in/out*) – elementet visas eller försvinner genom att opaciteten ändras.
- **Glida in** (*slide in*) – elementet kommer in från en kant.
- **Skala in** (*scale in*) – elementet växer till full storlek, ofta samtidigt som det tonas in. Börjar på 0,95–0,97, aldrig på noll.
- **Poppa in** (*pop in*) – skala in med en liten överskjutning. Studs; inte i sparsam.
- **Avslöja** (*reveal*) – innehållet blottas gradvis, oftast med `clip-path` eller en mask.
- **Entré och utgång** (*enter/exit*) – rörelsen när ett element läggs till eller tas bort.

## Ordning och tid

- **Längd** (*duration*) och **fördröjning** (*delay*).
- **Förskjutning** (*stagger*) – flera element startar efter varandra med en kort fördröjning, 30–80 ms.
- **Samordning** (*orchestration*) – flera rörelser tajmas så att de upplevs som en.
- **Nyckelbilder** (*keyframes*) – fasta punkter som webbläsaren fyller i mellan.
- **Fyllnadsläge** (*fill mode*) – om elementet behåller första eller sista bildens stil före och efter animationen.

## Förflyttning

- **Förflytta** (*translate*), **skala** (*scale*), **rotera** (*rotate*), **snedvrida** (*skew*).
- **Ursprung** (*transform origin*) – punkten som något växer eller roterar från.
- **Ursprungsmedveten** (*origin-aware*) – en popup växer från knappen som öppnade den, inte från sin egen mitt.
- **Vändning i 3D** (*3D tilt, flip*) och **perspektiv** (*perspective*).

## Mellan tillstånd

- **Korstoning** (*crossfade*) – ett element tonas ut medan ett annat tonas in på samma plats.
- **Delat element** (*shared element transition*) – ett element färdas och formas om från ett läge till ett annat, som en miniatyr som blir ett kort.
- **Layoutanimation** (*layout animation*) – ett element som ändrar storlek eller läge glider dit i stället för att hoppa.
- **Dragspel** (*accordion, collapse*) – en sektion fälls ut och ihop.
- **Riktningsberoende övergång** (*direction-aware transition*) – innehållet glider åt ett håll framåt och åt andra hållet bakåt.
- **Morf** (*morph*) – en form övergår mjukt i en annan.

## Scroll och sidor

- **Avslöjande vid scroll** (*scroll reveal*) – element tonas eller glider på plats när de kommer in i bild.
- **Scroll-driven animation** (*scroll-driven animation*) – animationens förlopp följer scrollens läge.
- **Parallax** – förgrund och bakgrund rör sig i olika fart.
- **Scroll-kapning** (*scrolljacking*) – sajten ändrar scrollens fart eller riktning. Förbjuden.
- **Sidövergång** (*page transition, view transition*) – en rörelse när besökaren byter sida.

## Återkoppling

- **Hover-effekt** – synlig ändring när pekaren är över något.
- **Tryckkvittens** (*press/tap feedback*) – en liten nedskalning när något trycks, så att det känns fysiskt.
- **Håll för att bekräfta** (*hold to confirm*) – en fyllning som växer medan knappen hålls inne.
- **Dra, dra för att stänga, gummiband** (*drag, swipe to dismiss, rubber-banding*) – gester med fart och motstånd vid kanten.
- **Skakning** (*shake*) – snabb skakning som signalerar fel. Inte hos oss; felet sägs i text.
- **Krusning** (*ripple*) – en cirkel som växer från trycket.

## Kurvor

- **Kurva** (*easing*) – hur farten ändras under rörelsen.
- **Inbromsning** (*ease-out*) – snabb start och mjukt slut. Standard för det som kommer in och för det som svarar på besökaren.
- **Acceleration** (*ease-in*) – långsam start och snabbt slut. Bara för korta utgångar.
- **Mjuk start och mjukt slut** (*ease-in-out*) – för det som flyttar sig på skärmen.
- **Linjär** (*linear*) – jämn fart. Bara för laddningsindikatorer och band som rullar.
- **Kubisk Bézier** (*cubic-bezier*) – en egen kurva med fyra tal. Y över 1 ger studs.
- **Fjäder** (*spring*) – rörelse som styrs av fysik: styvhet, dämpning och massa i stället för en fast längd. Behåller farten om den avbryts.
- **Överskjutning, studs** (*overshoot, bounce*) – går förbi målet och fjädrar tillbaka.
- **Upplevd längd** (*perceptual duration*) – hur lång en fjäder känns, fast den fortsätter att sätta sig.

## Rörelse som går av sig själv

- **Loop**, **pendling** (*alternate, yoyo*), **puls** (*pulse*), **sväva** (*float*), **viloanimation** (*idle animation*), **rullande band** (*marquee*). Alla är förbjudna i sparsam, och över fem sekunder kräver de paus (WCAG 2.2.2).

## Detaljer

- **Oskärpa** (*blur*) – räknas som rörelse i WCAG 2.3.3.
- **Klippning och mask** (*clip-path, mask*) – döljer eller avslöjar delar av ett element.
- **Linjeteckning** (*line drawing*) – en SVG-linje som ritar sig själv.
- **Räknare** (*number ticker*) – siffror som räknas upp. Inte i sparsam.
- **Tabellsiffror** (*tabular numbers*) – siffror med samma bredd, så att de inte hoppar.
- **Skelett och skimmer** (*skeleton, shimmer*) – platshållare med ett glänsande svep medan något laddas.

## Prestanda

- **Bildfrekvens** (*FPS*) – 60 bilder per sekund ger 16,7 ms per bild, och 120 Hz ger 8 ms.
- **Hack** (*jank*) och **tappad bildruta** (*dropped frame*).
- **Sammansättning** (*compositing*) – grafikkortet flyttar eller tonar ett lager utan att räkna om layouten. Gäller transform och opacitet.
- **Layoutstorm** (*layout thrashing*) – layouten räknas om i varje bild, till exempel när `width` eller `top` animeras.
- **`will-change`** – en signal om att något ska röra sig. Används bara när ett ryck syns.

## Principer

- **Syftesstyrd rörelse** (*purposeful animation*), **användningsfrekvens** (*frequency of use*), **rumslig konsekvens** (*spatial consistency*), **upplevd prestanda** (*perceived performance*) och **reducerad rörelse** (*reduced motion*).
