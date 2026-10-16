# W3C Web Sustainability Guidelines (WSG)

**Källa:** W3C Sustainable Web Interest Group, [Web Sustainability Guidelines](https://www.w3.org/TR/web-sustainability-guidelines/), *"W3C Group Note Draft 24 September 2026"*, redaktörer Alexander Dawson och Rose Newell. Sidan i dag (2026-10-16 17.43) är identisk med nedladdningen från andra varvet (`cmp`). Lästa: status, inledningen (1.3 mätning, 1.4 överensstämmelse och grönmålning, 1.5 relationer), innehållsförteckningen med alla 70 riktlinjer, och 2.6, 2.7–2.9, 3.13, 3.14, 4.1, 5.4 och 5.5 i sin helhet. Versionshistoriken på [W3C](https://www.w3.org/standards/history/web-sustainability-guidelines/) och repot [w3c/sustainableweb-wsg](https://github.com/w3c/sustainableweb-wsg) via GitHubs API. ⚠️ Inte lästa: övriga riktlinjer i detalj, de inbäddade avsnitten *Additional information* och bilagan *WSG Impact Ratings*.
**Licens:** sidhuvudet säger att W3C:s *"liability, trademark and permissive document license rules apply"* ⚠️ (licenstexten inte läst i dag). Vi citerar kort med källa och skriver med egna ord.

## Vad det är
Rekommendationer för hållbar webb i tre dimensioner, *planet, people, prosperity*. 70 riktlinjer i fyra avsnitt: användarupplevelse (17), webbutveckling (16), drift och infrastruktur (12) och affärsstrategi (25). Varje riktlinje har ett eller flera framgångskriterier, i texten cirka 196 (räknat).

## Hur det fungerar
- Varje riktlinje har en kort beskrivning, framgångskriterier, taggar och en betygsättning av effekt i bilagan.
- **Överensstämmelse** kan gälla ett kriterium, en riktlinje, ett avsnitt eller allt. Avsnittet är märkt *"work in progress"*.
- **1.4.3 Grönmålning:** påstå inte att WSG betyder total hållbarhet, visa inte delförbättringar som bevis på hållbarhet, och *"only making verifiable claims alongside supporting evidence"*.
- **2.6** *"Avoid being manipulative or deceptive"*: inga vilseledande mönster som *"fake scarcity"*, märkt reklam, ingen onödig spårning och SEO för användaren, inte för manipulation.
- **3.13** förväntade filer: `favicon.ico`, `robots.txt`, `opensearch.xml`, `site.webmanifest` och `sitemap.xml`; dessutom `security.txt`, `carbon.txt` och `humans.txt` som nyttiga.
- **3.14** *"Deliver static content in place of dynamic content wherever possible"* och statiska sajtgeneratorer.
- **4.1** hållbar drift: välj leverantör efter redovisade nyckeltal (PUE, WUE, CUE, förnybar el).

## Kvalitet och underhåll
- **Status:** utkast. *"Group Note Drafts are not endorsed by W3C nor its Members"* och *"It is inappropriate to cite this document as other than a work in progress."*
- 36 versioner mellan 2025-10-02 och 2026-09-24, ibland flera på en vecka (W3C:s historiksida, läst 2026-10-16). Allt kan ändras.
- Repot w3c/sustainableweb-wsg: 44 stjärnor, 41 öppna ärenden, senaste push 2026-09-24, licensen anges inte i GitHubs API (`NOASSERTION`), HEAD `c794dbc23cc20299d460ef2e6d1cce4c31456c32` (`git ls-remote` 2026-10-16). Ärendena är inte lästa ⚠️.
- Mätningen är svag enligt dokumentet självt (1.3.1): data saknas för servrar, nät och enheter.

## Det bästa vi kan ta
1. **2.6 som andra källa** mot falsk brådska och knapphet. Andra varvet föreslog regeln med WSG som källa (`andra-varvet/byggguider-jamforelse.md`, lucka 4 och *Förslag till text* 3). Förslaget har också Lovable och marknadsföringslagen 10 § som källor (⚖️ tolkning, inte juridisk rådgivning); WSG citeras som utkast.
2. **3.13** som stöd för `site.webmanifest` (lucka 7 i samma rapport). `security.txt` finns redan (`guide/2-8-teknik-och-kvalitet.md`, RFC 9116).
3. **3.14** stöder vår stack: statisk Astro.
4. **Grönmålning (1.4.3)** som regel för försäljning och rapport: Nortropic och kunderna påstår aldrig att en sajt är *klimatsmart* eller *grön* utan belägg som går att kontrollera. ⚖️ EU-direktiv 2024/825 förbjuder allmänna miljöpåståenden utan belägg från 27 september 2026 enligt en sammanfattning från advokatbyrån [CMS](https://cms.law/en/int/legal-updates/recent-publication-of-directive-2024-825-on-empowering-consumers-for-the-green-transition); direktivet och den svenska lagen är inte lästa ⚠️. Tolkning, inte juridisk rådgivning.

## Var det hamnar hos oss
Placeringen **senare: N3** är beslutad: fältet `beslut` säger *"Johnny 2026-10-16 omkring 17.40: 'Ja på alla'"*. Inget i `guide/` eller `.claude/skills/` gäller hållbarhet (sökt 2026-10-16).

Förslag till Johnny: N3 gäller hållbarhetsdelen (mätning, rapport, val av drift). Men två kriterier används redan som stödkällor i andra varvets förslag (2.6 och 3.13). De citeras som utkast och bär aldrig ensamma en regel. Punkt 4 (grönmålning) passar i `guide/4-foretaget.md` när säljtexterna skrivs.

## Passar vår stack?
Ja, i riktningen: statiskt, lätt och självhostat ligger nära WSG. Sidorna väger 12–79 kB i blickprovet (`andra-varvet/byggguider-jamforelse.md`). Cloudflares redovisning mot 4.1 är inte prövad ⚠️.

## Risker och flaggor
- **Utkast, ingen norm:** kan aldrig bära en låst kontroll (`guide/README.md`, *Grind eller instruktion*).
- **Inte allt passar småsajter:** `opensearch.xml` som *"expected"* fil förutsätter en sökfunktion, som sajterna saknar (tolkning). `carbon.txt` och `humans.txt` är inga standarder.
- **Grönmålning** är en juridisk risk om hållbarhet används i säljtexter (punkt 4).
- Ingen telemetri, betalvägg eller inloggning för att läsa. Ärenden kräver GitHub-konto.

## Inloggning
Inget.
