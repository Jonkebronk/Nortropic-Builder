# Hunspell sv_SE

**Källa:** https://github.com/LibreOffice/dictionaries, katalogen `sv_SE/` (`dictionaries/sv_SE.aff`, `dictionaries/sv_SE.dic`, `LICENSE_sv_SE.txt`, `LICENSE_en_US.txt`, `description.xml`, `dictionaries.xcu`). Version 2.42 enligt `description.xml`, införd i commit `44f958e577` (författare Parag Nemade, 2026-06-01, hämtad från `extensions.libreoffice.org/.../ooo-swedish-dict-2-42.oxt`). Senaste ändring i katalogen: `25d7793000` (2026-07-04, rättade sökvägen till .aff efter uppdateringen). Läst 2026-10-16. Upphovsmannens webbplats https://www.dsso.se svarade 403 ⚠️ (inte läst).

**Licens:** GNU LGPL version 3 (ur `LICENSE_sv_SE.txt`: *"tillgänglig under licensen GNU Lesser General Public License Version 3"*). © 2003–19 Göran Andersson, som underhåller ordlistan (Den stora svenska ordlistan, DSSO). ⚖️ Tolkning, inte juridisk rådgivning: används filerna bara i bygget och följer aldrig med sajterna sker ingen spridning till besökare. Checkas de in i ett repo som delas (t.ex. byggrepot på GitHub) sprids de, och då ska licenstexten ligga bredvid och ändringar i filerna redovisas. Vi ändrar dem inte.

**Vad det är:** Den svenska stavningsordlistan i Hunspell-format som LibreOffice, Firefox m.fl. använder: 153 714 grundord med böjningsflaggor och ett .aff med böjnings- och sammansättningsregler. Katalogen har också sv_FI, avstavning och synonymer.

**Hur det fungerar:**
- `.dic` har grundord med flaggor (t.ex. `stava/ADjmMN`), och `.aff` beskriver suffix, prefix och vilka ord som får börja, stå mitt i eller sluta en sammansättning (`COMPOUNDBEGIN X`, `COMPOUNDMIDDLE U`, `COMPOUNDEND Y`, `ONLYINCOMPOUND Z`, tretton `COMPOUNDRULE`).
- `CHECKCOMPOUNDTRIPLE` och `SIMPLIFIEDTRIPLE` hanterar trippelkonsonant (*fall + lucka*). `WORDCHARS -0123456789.:` gör att förkortningar med punkt (*t.ex.*, *inkl.*) finns som ord.
- Ordlistan har många ortnamn och förnamn: Torsö, Skurup, Vellinge, Höllviken, Trelleborg, Malmö, Lindqvist och Anna finns.

**Kvalitet och underhåll:** LibreOffice/dictionaries är en spegel av LibreOffices eget git (Gerrit): 564 stjärnor, 322 forkar, 187 bidragsgivare, senaste push 2026-10-13. Repot har ingen gemensam licensfil – licensen står per ordlista. Fel rapporteras i LibreOffices Bugzilla ⚠️ (inte genomsökt). Mätt i provet (Vale 3.24.0):
- Rätt flaggade: *behandlingrum*, *Kiropraktorsklinik*, *nackespärr*, *Ryggskotttet*, *sjukgymnastt* och alla åtta stavfel i korpusen.
- Luckor: *stavad* saknas (bara *felstavad*), *hälsporrebehandlingen* underkänns, *plantar fasciit* flaggas ⚠️ (oklart om felet är vårt eller ordlistans – *plantarfasciit* och *plantar fasciit* förekommer båda i vården).
- Förkortningar: ordlistan har *inkl.*, men Vale tar bort slutpunkten och prövar *inkl* – behöver en ignorera-lista.
- Särskrivning (*rygg behandling*) syns inte, eftersom båda orden finns.

**Det bästa vi kan ta:** Filerna `sv_SE.aff` och `sv_SE.dic` oförändrade, i `styles/config/dictionaries/`, med licensfilen bredvid. En egen ignorera-lista för förkortningar utan inre punkt (`config/ignore/sv-forkortningar.txt`: inkl, exkl, osv, dvs, tel, leg, dipl, vån, mån–sön m.fl.).

**Var det hamnar hos oss:** Ordlista för Vales stavning i bygget; distribueras inte till sajterna. Provet stöder det. Lägg till: en vokabulär per sajt som byggs ur `fakta.md` (namn, gator, firmanamn), eftersom 190 av 193 stavningslarm på den första övningssajtens sidor var namn och förkortningar.

**Passar vår stack?** Ja. Ordlistan läses av Vale i bygget och påverkar varken Astro, CSS eller Cloudflare. Inget att översätta.

**Risker och flaggor:**
- LGPL-3: licenstexten ska följa med om filerna checkas in i ett delat repo (tolkning).
- Senaste ändring av upphovsmannen 2019 enligt copyrightraden; version 2.42 kom in i LibreOffice 2026 ⚠️ – okänt hur aktivt DSSO underhålls nu.
- Ordlistan kan inte se särskrivning eller fel ordval; den är bara en del av en språkgrind.
