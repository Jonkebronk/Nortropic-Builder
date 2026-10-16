# Längder och kurvor

Delfil till `SKILL.md`. Måtten här är utgångsvärden. Det slutliga värdet sätts i kitet och prövas på video.

## Längder per element

| Rörelse | Längd | Källor |
|---|---|---|
| Färgbyte vid hover | 100–150 ms | 📄 NN/g, Laubheimer 2020: cirka 100 ms för enkel återkoppling; 📄 Material 3, `duration-short2`–`short3` (100–150 ms) |
| Fokusring | Direkt, 0 ms | 🔧 Fokus visar var besökaren är; en fördröjd ring döljer läget (→ `guide/2-8-teknik-och-kvalitet.md`, WCAG 2.4.7) |
| Tryck med skala 0,97 | 100–160 ms | 📄 Kowalski, `animate`, *Duration*, och `mobile-native` §5 (MIT) |
| Ikon som vänds, till exempel FAQ-chevronen, och små popupfönster | 150–200 ms | 📄 Kowalski: små popupfönster 125–200 ms |
| Rullgardinsmeny | 150–250 ms | 📄 Kowalski |
| Panel eller meny från kanten, dialog | In 200–300 ms, ut cirka 70 % av det | 📄 NN/g: 200–300 ms för en modal, och *"a popup window may take 300ms to appear, but only 200 or 250ms to disappear"*; 📄 Material 3, `duration-medium1`–`medium2` (250–300 ms); 📄 Kowalski: modaler och lådor 200–500 ms |
| Sidhuvud och knapplist som visas och göms vid scroll | 200–250 ms | 🔧 Härlett ur panelerna. De är små och upprepas ofta, så de ska vara kortare |
| Korstoning vid sidbyte | Specens standard är 250 ms; hos oss högst 200 ms, och bara efter Johnnys dom | 📄 W3C, CSS View Transitions 1, UA-stilen (`animation-duration: 0.25s`); 🔧 |
| In-animation i måttlig | 300–450 ms, från minst 70 % opacitet; 30–80 ms mellan element i en grupp | 📄 NN/g: övre gräns 500 ms; Johnnys 70 % (`BESLUT.md` 2026-10-15); 📄 Kowalski, *Stagger* |
| Ankarrullning | Webbläsarens egen med `scroll-behavior: smooth` | Mätt i Chromium 2026-10-16: 2 400 px på cirka 550 ms |

**Gränserna:**
- De flesta animationer ligger på 100–500 ms: *"At 500ms, animations start to feel like a real drag for users."* 400 ms är för stora förflyttningar över stora skärmar. 📄 NN/g, Laubheimer 2020.
- Gränssnittets animationer ligger under 300 ms. 📄 Kowalski, `review-animations` standard 4. Det stämmer med NN/g:s spann för små element.
- Längre än 500 ms bara för marknadsförande eller förklarande rörelse i budgeten expressiv. Material 3 har tokens upp till 1 000 ms (`duration-extra-long4`), men de gäller stora ytor i appar.
- För långt är vanligare än för kort. 📄 NN/g: *"It is far more common for animations to be too long than too short."*

## Kurvor

| Roll | Värde | Källor |
|---|---|---|
| Entré och färg | Stark ease-out: `cubic-bezier(0.23, 1, 0.32, 1)` eller kitets egen ease-out | 📄 Kowalski, `--ease-out`; samma kurva heter `--ease-quint-out` i Open Props (`props.easing.js`, MIT); 📄 NN/g: ease-out för det som kommer in; 📄 Material 3, *emphasized decelerate* `cubic-bezier(0.05, 0.7, 0.1, 1)` |
| Utgång | Accelererande och kort: `cubic-bezier(0.3, 0, 0.8, 0.15)` | 📄 Material 3, *emphasized accelerate*; 📄 NN/g: ease-in används ibland för det som lämnar skärmen |
| Förflyttning på skärmen | `cubic-bezier(0.77, 0, 0.175, 1)` | 📄 Kowalski, `--ease-in-out`; Open Props `--ease-quart-in-out`. Sällan aktuell i sparsam |
| Lådor och paneler, iOS-likt | `cubic-bezier(0.32, 0.72, 0, 1)` | 📄 Kowalski, `--ease-drawer` (efter Ionic) |
| Konstant rörelse, som en laddningsindikator | `linear` | 📄 Kowalski. NN/g varnar för linjär rörelse i övrigt: *"Completely linear motion looks weird"* |

- **Material 3:** namnen och värdena kommer ur `md.sys.motion` i material-web (Apache-2.0). Materials text om när paren används gick inte att läsa, eftersom sidan kräver JavaScript ⚠️.
- **Konflikten vid utgång:** Kowalski säger aldrig ease-in i gränssnitt, eftersom en långsam start fördröjer det besökaren tittar på. NN/g och Material använder en accelererande kurva vid utgång. Guiden låter NN/g gå före (→ `guide/2-6-rorelse.md`, *Små interaktioner*). Båda sidor är överens om att utgången ska vara kort, och vid 150–200 ms märks skillnaden knappt. Pröva på video om det känns trögt.
- **Hitta inte på kurvor.** Välj ur tabellen eller ur kitet. En kurva som "ser bekant ut" är ett fynd. 📄 Kowalski, `animate`, *Hard Rules* 2.
- **Studs och fjädrar:** en kurva med y över 1, som Djärvs `cubic-bezier(0.3, 0.9, 0.3, 1.2)`, studsar. Den passar en lekfull personlighet (📄 Val Head 2016, kap. 9: *"springy bounces can seem friendly"*) men inte en seriös sajt (📄 Motion, `best-practices/index.md`). Därför ingen studs i sparsam. En fjäder kan efterliknas i CSS med `linear()`, till exempel Open Props `--ease-spring-1`–`5`, men en riktig fjäder som kan avbrytas kräver Motion (📄 Motion, `css-spring/index.md`). Fjädrar hör till gester och måttlig eller expressiv budget.

## Asymmetri

- Utgången är kortare än entrén. 📄 NN/g, Laubheimer 2020; 📄 Material 3.
- Det besökaren gör med avsikt, som att hålla inne en knapp, får vara långsamt. Systemets svar ska vara snabbt. 📄 Kowalski, `review-animations` standard 9. Sällan aktuellt på en företagssajt.

## Förslag: rörelsetokens per kit

🔧 **Förslag till Johnny, inte beslutat.** Kiten är godkända av Johnny, så ändringen går genom honom.

I dag har varje kit en längd och en kurva: Lugn 400 ms, Varm 350 ms och Djärv 220 ms med studs (`bibliotek/stilkit/*/kit.css`, avsnittet *Rörelse*). En enda längd kan inte passa både ett färgbyte (100–150 ms) och en panel (200–300 ms). Följden syns på övningssajten: knapparnas färg har 400 ms, och menyn, sidhuvudet och knapplisten har egna längder skrivna direkt i komponenterna (260, 300 och 320 ms). Val Head rekommenderar duration-tokens och tre egna kurvor – ease-out, ease-in och ease-in-out – som start (📄 Smashing 2019). Material 3 delar längderna i korta, medellånga och långa.

| Token | Lugn | Varm | Djärv | Används till |
|---|---|---|---|---|
| `--k-tid-snabb` | 150 ms | 140 ms | 110 ms | Färg vid hover, tryck |
| `--k-tid` | 240 ms | 220 ms | 180 ms | Ikon som vänds, knapplist, sidhuvud |
| `--k-tid-panel` | 300 ms | 280 ms | 240 ms | Meny och dialog. Utgången får cirka 0,7 gånger längden |
| `--k-tid-in` | 450 ms | 400 ms | 320 ms | Bara måttlig: in-animationer |
| `--k-kurva-in` | `cubic-bezier(0.2, 0.7, 0.2, 1)` (dagens) | `cubic-bezier(0.25, 0.8, 0.25, 1)` (dagens) | `cubic-bezier(0.23, 1, 0.32, 1)` | Entré och färg |
| `--k-kurva-ut` | `cubic-bezier(0.3, 0, 0.8, 0.15)` | samma | samma | Utgång |
| `--k-kurva-studs` | – | – | `cubic-bezier(0.3, 0.9, 0.3, 1.2)` (dagens) | Bara måttlig |

- Ordningen Lugn, Varm och Djärv står kvar: långsamma och mjuka i Lugn och snabbare i Djärv (`BESLUT.md` 2026-10-15, → `guide/2-6-rorelse.md`). Alla värden ligger inom NN/g:s och Kowalskis spann.
- `--k-tid` behåller namnet, så att bibliotekets regler fortsätter att fungera.
- Varje kit får sin rad *Rörelse* i `design.md` uppdaterad med de tre längderna.
