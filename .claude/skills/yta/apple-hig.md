# Apples HIG för ytan

Delfil till `SKILL.md`. Det Apples *Human Interface Guidelines* (HIG) säger om färg, typografi, material, ikoner, bilder, mörkt läge och varumärke, översatt till en webbsajt som mest besöks i Safari på iPhone. HIG skrivs för appar på Apples plattformar. Här står bara det som håller på webben, och det som inte går att översätta står sist. Guidens regler och besluten går före (`guide/2-5-yta.md`, `BESLUT.md`).

Källa: 📄 Apple, [Human Interface Guidelines](https://developer.apple.com/design/human-interface-guidelines/), sidorna *Color*, *Typography*, *Materials*, *Icons*, *Images*, *Dark Mode*, *Branding*, *SF Symbols*, *Accessibility* och *Design principles*, lästa som JSON 2026-10-16. Sidornas ändringsloggar visar att *Branding* och *Layout* skrevs om 2026-09-09 och att *Design principles* kom tillbaka 2026-06-08.

## Översättningen: pt blir CSS-px

- **1 pt i HIG motsvarar 1 CSS-px i Safari på iPhone** när sidan har `width=device-width`, eftersom den logiska bredden i punkter blir fönstrets bredd i CSS-px (en iPhone SE är 375 × 667 i båda). 🔧 härlett ur Apples *Using the Viewport* (arkiverat 2016) och HIG *Images* (punkter mot pixlar).
- **HIG:s kontrasttabell får inte läsas rakt av.** Den säger 4,5:1 upp till 17 pt och 3:1 från 18 pt eller i fetstil. WCAG:s *stor text* är 18 *typografiska* punkter, alltså 24 CSS-px, eller 14 punkter fet, alltså cirka 18,7 CSS-px. En rubrik på 18 CSS-px i normal vikt kräver därför 4,5:1 hos oss. Normen är WCAG 2.2 AA (→ C45). 📄 HIG *Accessibility*; [WCAG 2.2, large scale](https://www.w3.org/TR/WCAG22/#dfn-large-scale).
- **Apples systemfärger klarar inte AA på vitt.** Standardblått (0, 136, 255) ger 3,5:1 mot vitt, också som bakgrund under vit text; grönt 2,2:1 och orange 2,3:1. Bara blått i läget *ökad kontrast* (30, 110, 244) når 4,6:1. Ta Apples färgroller, inte Apples värden. 🔧 beräknat med WCAG-formeln på värdena i HIG *Color*, *Specifications*.

## Färg

- **En färg har en betydelse.** Används varumärkesfärgen för att visa att något går att trycka på, ska samma eller en liknande färg inte färga text som inte gör något. 📄 HIG *Color* (*"using the same or similar color to stylize noninteractive text is confusing"*). Det är en andra källa för G3 (→ `guide/2-5-yta.md`).
- **Accenten används sparsamt: till primära handlingar och statusmarkeringar,** och hellre som knappens bakgrund än som färg på text eller ikon. Färga inte bakgrunden på flera kontroller i samma vy. 📄 HIG *Branding* (2026-09-09: *"Minimize its use on controls and instead use it intentionally for primary actions or status indicators"*); HIG *Color*, *Liquid Glass color*.
- **Färg bär aldrig betydelsen ensam,** och ett tillstånd syns också på form, text eller ikon. 📄 HIG *Accessibility*, *Color*; WCAG 1.4.1 (→ `farg.md`).
- **Varje färg i kitet fungerar i de lägen kitet stöder,** och ett kit med mörkt läge får egna värden för ljust, mörkt och ökad kontrast. Mörka färger är inte inverterade ljusa. 📄 HIG *Color* och *Dark Mode*.
- **Pröva färgerna i starkt och svagt ljus.** I solljus ser färger mörkare och dämpade ut, i mörker ljusa och mättade. En accent som bara fungerar på en kalibrerad skärm inomhus är fel accent. 📄 HIG *Color*. Instruktion (en källa – bänken).

## Typografi

- **Brödtexten ligger kring 17 CSS-px, och ingen text understiger 11 px.** HIG:s standard i iOS är 17 pt och minimum 11 pt. Vår skala börjar på 16 px för brödtext (→ `typografi.md`), så 16–18 px håller. 📄 HIG *Typography* och *Accessibility* (tabellen *Default size / Minimum size*).
- **Tunna vikter undviks i liten text.** Regular, Medium, Semibold eller Bold; aldrig Ultralight, Thin eller Light i brödtext. Ett tunt typsnitt behöver större storlek än rekommendationen. 📄 HIG *Typography* (→ `typografi.md`, *Under 18 px vikt minst 400*).
- **Få typsnitt, och hierarkin byggs med vikt, storlek och färg tillsammans.** Hierarkin ska bestå när texten förstoras. 📄 HIG *Typography* (*Minimize the number of typefaces*); → `typografi.md`, högst två familjer.
- **Spärrningen kommer från typsnittets egen tabell, inte från en allmän regel.** Apples tabell för SF Pro har *negativ* spärrning kring brödtextstorlek (−0,026 em vid 17 pt) och *positiv* från 24 pt (+0,012 em vid 34 pt), eftersom typsnittet byter optisk storlek vid 20 pt. Regeln *stor text får negativ spärrning* gäller många typsnitt utan optiska storlekar men inte alla. Följ typsnittets egna mått eller pröva i 200 % mot provsidan. 📄 HIG *Typography*, *Tracking values*; jfr `typografi.md`, *Spärrning*, där regeln har Krehel och Emil Kowalski som källa.
- **Radavståndet följer textens uppgift.** HIG ger tät radhöjd i korta listrader och *loose leading* i långa stycken, och aldrig tät radhöjd i tre rader eller fler. Apples egen brödtext (17/22 pt, cirka 1,3) är satt för korta rader i appar; en webbsida med stycken behåller 1,45–1,7. 📄 HIG *Typography* (*Modify the built-in text styles*); → `typografi.md`, *Radhöjd*.
- **Ett eget typsnitt kan bära rubrikerna medan systemtypsnittet bär brödtexten.** HIG föreslår det för varumärken, eftersom systemtypsnitten är byggda för läsbarhet i liten storlek. På webben ger det också en typsnittsfil mindre. Kitet väljer (`BESLUT.md` 2026-10-15). 📄 HIG *Branding* (*"use a custom font for headlines and subheadings while using system fonts for body copy"*). Det prövas när ett nytt kit tas fram, och dagens kit ändras inte (`BESLUT.md` 2026-10-16, *Frågelistan efter tredje varvet avgörs*, punkt 22).

## Material och genomskinlighet

- **Genomskinligt material hör till kontrollerna, inte till innehållet.** HIG förbjuder Liquid Glass i innehållslagret och säger att effekten används sparsamt, bara på de viktigaste funktionsdelarna. På webben: `backdrop-filter` bara på ett fast sidhuvud eller en list, aldrig på kort, sektioner eller rubriker. 📄 HIG *Materials* (*"Don't use Liquid Glass in the content layer"*, *"Use Liquid Glass effects sparingly"*); → `generiskt.md` (ingen glaseffekt som dekor).
- **Ett genomskinligt sidhuvud är läsbart mot det ljusaste och mörkaste som kan scrolla under,** och har en nästan täckande bakgrund som standard. Safari stöder inte `prefers-reduced-transparency`, så det täckande läget kan inte vara något som slås på av frågan. 📄 HIG *Materials*; → `detaljer.md`, *Ytor*; källkortet `emil-apple-design` (caniuse 2026-10-16).
- **Kontroller över ett ljust foto får ett dämpande lager,** som HIG anger till 35 % svart för genomskinliga kontroller över ljus media. Text direkt på ett foto får en bakgrund eller skugga och mäts mot det ljusaste i fotot. 📄 HIG *Materials* (*"consider adding a dark dimming layer of 35% opacity"*) och *Image views* (*"Take care when overlaying text on images"*).

## Ikoner

- **En ikon uttrycker ett begrepp, förenklat och igenkännbart,** med en välkänd metafor för det den gör eller visar. 📄 HIG *Icons* (→ G2 i `guide/2-5-yta.md`, *ikoner är sakliga*).
- **Alla ikoner på sajten har samma storlek, detaljnivå, linjetjocklek och perspektiv,** och linjen följer vikten i texten bredvid. 📄 HIG *Icons* (*"match the weights of interface icons and adjacent text"*); → `detaljer.md`, *Ikoner*. HIG är en andra källa till Krehels regel om strecket.
- **Asymmetriska ikoner centreras optiskt,** med luften inbyggd i SVG:ns `viewBox` så att ikonen kan centreras geometriskt. 📄 HIG *Icons*; → `detaljer.md`, *Optisk linjering*.
- **Ikoner är vektorer (SVG)** och har en textetikett eller en tillgänglig beskrivning. 📄 HIG *Icons*.
- **Människofigurer i ikoner är könsneutrala.** 📄 HIG *Icons* och *Inclusion*.
- **Apples hårdvara ritas inte av.** Måste en iPhone synas används Apples egna bilder från Apple Design Resources (med deras villkor). 📄 HIG *Icons* (*"Avoid using replicas of Apple hardware products"*).

## Bilder

- **Bilder levereras i den upplösning skärmen har.** HIG kräver @2x och @3x i iOS; på webben blir det `srcset` med bredder upp till tre gånger visningsbredden för små bilder som logotyp och porträtt, och G1 gäller för foton (→ `guide/2-5-yta.md`). 📄 HIG *Images* (*Scale factors*).
- **Färgen ska bli rätt i varje webbläsare.** Ett foto från en iPhone är oftast HEIC i Display P3. Astros bildkedja (sharp) gör om till sRGB och tar sedan bort profilen, vilket är rätt för webben. En fil som läggs direkt i `public/` eller görs om för hand behåller eller konverterar sin profil, och tar aldrig bort en P3-profil utan att konvertera. 📄 HIG *Color*, *Color management* (*"Apply color profiles to your images"*); [sharp, Output](https://sharp.pixelplumbing.com/api-output) (*"convert to the device-independent sRGB colour space and strip all metadata, including the removal of any ICC profile"*); → innehållsskillens `bilder.md`.
- **Pröva bilderna på riktiga skärmar.** 📄 HIG *Images*.

## Mörkt läge (när ett kit får det)

Inget kit har mörkt läge, och inget får det nu (`BESLUT.md` 2026-10-16, *Frågelistan efter tredje varvet avgörs*, punkt 22; → `farg.md`). Om ett kit får det senare gäller:

- **Sajten följer systemets inställning med `prefers-color-scheme` och `color-scheme`,** och har ingen egen växel för ljust och mörkt. 📄 HIG *Dark Mode* (*"Avoid offering an app-specific appearance setting"*); [WebKit, Dark Mode Support in WebKit](https://webkit.org/blog/8840/dark-mode-support-in-webkit/) (2019).
- **Mörka färger är egna värden, inte inverteringar.** Upphöjda ytor (meny, dialog) är ljusare än bakgrunden. 📄 HIG *Dark Mode* (*base* och *elevated*).
- **Liten text siktar på 7:1** i egna färgpar, och golvet är 4,5:1. 📄 HIG *Dark Mode* (*"strive for a contrast ratio of 7:1, especially in small text"*). Instruktion; normen är fortfarande AA.
- **Foton med vit bakgrund dämpas** så att de inte lyser i den mörka sidan. 📄 HIG *Dark Mode*.

## Varumärket

- **Varumärket står tillbaka för innehållet.** Ingen yta som bara visar logotypen, ingen logotyp utspridd över sidan och ingen startskärm eller laddningsskärm för varumärkets skull. 📄 HIG *Branding* (*"Ensure branding always defers to content"*, *"Avoid using a launch screen as a branding opportunity"*).
- **Varumärket uttrycks genom välkända komponenter.** När en komponent kläs i kitet behåller den storlek, placering och beteende som besökaren känner igen. 📄 HIG *Branding* (*"Express your brand with familiar components"*); → `guide/2-5-yta.md`, *Kiten varierar ytan, inte konventionen*. HIG är en andra källa till den regeln.

## Licenser: Apples typsnitt, symboler och bilder

⚖️ Tolkning, inte juridisk rådgivning. Licenstexterna är lästa 2026-10-16 och ligger i scratch (`andra-varvet/kallor/apple-licenser/`).

- **SF Pro, SF Compact, SF Mono och New York får inte laddas som webbtypsnitt.** Licensen tillåter bara skisser av gränssnitt för Apples plattformar och säger uttryckligen: *"you may not use the Apple Font to, create, develop, display or otherwise distribute any documentation, artwork, website content or any other work product."* 📄 [Apple, Fonts](https://developer.apple.com/fonts/), *License Agreement for the Apple San Francisco Font*.
- **`system-ui` och `-apple-system` i `font-family` är tillåtet.** Det skickar inget typsnitt, utan besökarens eget system ritar texten, och WebKit beskriver det som det avsedda sättet. På en iPhone blir det SF Pro, på Windows Segoe UI och på Android Roboto. `ui-serif` ger New York på Apples system. 📄 [WebKit, Using the System Font in Web Content](https://webkit.org/blog/3709/using-the-system-font-in-web-content/) (2015); [WebKit, Safari 13.1](https://webkit.org/blog/10247/new-webkit-features-in-safari-13-1/) (`ui-serif`, `ui-sans-serif`, `ui-monospace`, `ui-rounded`).
- **SF Symbols används inte på sajterna,** varken som SVG eller som typsnitt. Symbolerna är *System-Provided Images*, licensierade *"solely for the purpose of developing Applications for Apple-branded products"*, och får aldrig ingå i logotyper eller annan varumärkesanvändning. 📄 Apple, *Xcode and Apple SDKs Agreement* § 2.10 (EA2002, 2026-06-08, [xcode.pdf](https://www.apple.com/legal/sla/docs/xcode.pdf)); HIG *SF Symbols*. Lucide, Tabler och Phosphor ersätter dem (→ `guide/2-5-yta.md`).
- **Apples logotyp och grafiska symboler visas inte,** inte heller bredvid en länk till Apple Kartor. Ordet *Apple Kartor* får stå i en länktext som hänvisning. 📄 Apple, [Guidelines for Using Apple Trademarks and Copyrights](https://www.apple.com/legal/intellectual-property/guidelinesfor3rdparties.html) (*Unauthorized Use* 2: *"You may not use the Apple Logo or any other Apple-owned graphic symbol, logo, or icon on or in connection with web sites"*).
- **En sajt härmar inte Apples egen webbdesign.** Samma riktlinjer: *"You may not imitate the distinctive Apple packaging, web site design, logos, or typefaces."* Att lära av HIG:s principer är något annat än att kopiera apple.com. Beslutet att referenser får användas fritt (`BESLUT.md` 2026-10-16) ändrar inte varumärkesrätten, som Claudes anmärkning i samma beslut säger.

## Det som inte går att översätta

- **Liquid Glass** är ett systemmaterial med ljusbrytning och rörelse. `backdrop-filter` ger oskärpa men ingen ljusbrytning, kostar renderingstid och går inte att stänga av med Safaris *Minska genomskinlighet*. Härma det inte.
- **Systemets dynamiska färger** (`label`, `secondaryLabel`, `systemBackground`) finns inte i CSS, utom de få systemfärgerna i CSS Color 4 (`Canvas`, `CanvasText`, `LinkText`), som inte bär kitets uttryck.
- **SF Symbols och systemtypsnittets optiska storlekar och spärrningstabeller** följer bara med när texten faktiskt står i `system-ui` på en Apple-enhet.
- **Inställningen *Fet text*** i iOS når inte webbsidor ⚠️ (inget webbgränssnitt hittat).

## Förbud och förslag

**Förbjudet:**
- SF Pro, New York eller SF Symbols på en sajt (licens, ovan).
- Apples logotyp, apparater ritade efter Apples produkter, eller en kopia av apple.com:s utseende.
- Apples systemfärger som värden i ett kit utan kontrastmätning.
- Glaseffekt i innehållslagret.

**Beslutat** (`BESLUT.md` 2026-10-16, *Frågelistan efter tredje varvet avgörs*, punkt 22; Claudes rekommendation, delegerat av Johnny):
- **`prefers-contrast: more` i alla kit.** Dämpad text får textfärgen och kanterna blir tydligare, med kitets egna tokens (`--k-dampad` blir `--k-text`; i Lugn och Varm blir `--k-linje` 60 % textfärg, minst 3:1 mot bakgrund, yta och dekor enligt WCAG 2.2, 1.4.11). Blocket står sist i varje `kit.css` och nämns i kitets `design.md`. HIG ber appar som inte klarar kontrasten som standard att åtminstone ge ett läge med högre kontrast (📄 HIG *Accessibility*). Safari stöder frågan från 14.1 och iOS 14.5 (📄 MDN browser-compat-data 8.1.6, via `../kvalitet/apple-hig.md`), och Playwright prövar den med `contrast: 'more'`.
- **Mörkt läge:** inte nu.
- **Systemtypsnittet som brödtext,** med kitets eget typsnitt för rubrikerna, prövas när ett nytt kit tas fram; dagens kit ändras inte. Det sparar en typsnittsfil och ger Apples läsbarhet i liten text på iPhone, men samma sajt ser olika ut på iPhone, Android och Windows.
