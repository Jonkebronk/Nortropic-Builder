# CodeStitch

**Källa:** <https://codestitch.app/>, <https://codestitch.app/terms-of-service/> ("Last updated June 17, 2023"), <https://codestitch.app/faq/>, <https://codestitch.app/pricing>; Astro-kiten <https://github.com/CodeStitchOfficial/Intermediate-Astro-Decap-CMS> (CC0-1.0 enligt GitHub-API 2026-10-13). Läst 2026-10-16. ⚠️ Själva stitch-katalogen kräver konto för koden; jag har inte loggat in.

**Licens:** kommersiell prenumeration för stitch-biblioteket; startkiten på GitHub är CC0-1.0 (inga krav).
- Villkoren (avsnitt 2): kunden får bygga "Websites or applications for your clients, where the client is the end-user", får ta betalt och får "integrate our templates into the final product". Licensen kallas "revocable".
- Avsnitt 8 förbjuder att "Directly resell the HTML templates", att lägga upp mallarna på en marknadsplats och att "Copy or adapt the Services' software … HTML, JavaScript, or other code" för att bygga ett verktyg som paketerar om mallarna "for resale or distribution to third parties".
- FAQ: "Use code stitch for anything!" och "There's no restrictions on how you use CodeStitch"; premium-stitches får inte delas med andra.
- **Inte reglerat:** om stitches får ligga i ett internt bibliotek som återanvänds för många kunder, och vad som gäller efter uppsägning. ⚖️ Tolkning: ett internt bibliotek som bara används för kundsajter liknar tillåten användning, men att AI:n i kundbygget väljer ur biblioteket kan läsas som ett "verktyg" som paketerar om mallarna. Frågan bör ställas skriftligt till CodeStitch innan något tas in.

**Vad det är:** ett kommersiellt bibliotek med fler än 1 300 handskrivna sektioner och mallar i HTML och CSS (LESS/SCSS), mobilen först, gjort för frilansare som bygger sajter åt lokala småföretag. Alla stitches delar ett designsystem och finns i Figma med fyra brytpunkter.

**Hur det fungerar:** man kopierar en stitch (HTML + CSS) in i sitt projekt; det finns Astro-startkit med Decap CMS. Priser (`pricing`): Basic 0 USD med begränsad åtkomst, Pro 30 USD i månaden eller 324 USD per år, Freelancer 50 USD i månaden eller 540 USD per år.

**Kvalitet och underhåll:** stitch-katalogen är inte öppen och har inga publika ärenden. Astro-kitet hade 115 stjärnor och push 2026-10-13 (lager-3-4-anteckningarna). Villkoren är från 2023.

**Det bästa vi kan ta:** målgruppens sektioner – hantverkare, städ, tak, VVS, kliniker – som referens för vad en lokal tjänstesajt visar och i vilken ordning. Mobilen-först-CSS utan ramverk ligger nära vårt arbetssätt.

**Var det hamnar hos oss:** `senare: N2`. Först när de öppna källorna (AstroWind, Fulldev, HyperUI, Tailark) inte räcker och villkoren är klarlagda skriftligt.

**Passar vår stack?** Ja tekniskt: ren HTML och CSS, 0 kB JavaScript, går att lägga i Astro. Klasserna och värdena måste pekas om till kitets tokens.

**Risker och flaggor:** licensen är återkallelig; internt bibliotek och tiden efter uppsägning är oreglerade; betalvägg för koden.

**Inloggning:** koden till stitches syns bara inloggad med betald plan. Johnny behöver bestämma om en prenumeration ska prövas och ställa licensfrågan till CodeStitch.
