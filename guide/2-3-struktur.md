# 2.3 Struktur

**Status:** konsoliderad v1.0, 2026-10-15; ommärkt samma dag efter granskningen (fyra N1-punkter). Genomgånget med Johnny 2026-10-13 (`historik/karta/3-struktur.md`). **Genomläst med Johnny 2026-10-15**; rättelserna står i `BESLUT.md`.

Garretts strukturplan har två halvor. **Informationsarkitekturen** bestämmer vilka sidor som finns, hur de hänger ihop och vad de heter. **Interaktionsdesignen** bestämmer vägarna genom sajten: vad besökaren kan göra på varje sida och vad som händer då. Hur sidorna ser ut och vilka sektioner de har hör till skelettet (`2-4-skelett.md`). Vilka sidor och funktioner som ingår i paketet avgörs i omfattningen (`2-2-omfattning.md`).

## Vad byrån gör

### Standardsajten

Standardprodukten är en vanlig flersidig företagssajt; scrollytelling och Scroll World är tillval (`BESLUT.md` 2026-10-15, → `2-6-rorelse.md`).

- [N1] **Varje sajt utgår från standarduppsättningen: start, tjänst eller tjänster, om oss, kontakt och en designad 404-sida. Tacksida och integritetspolicy ingår bara när sajten har formulär.** Avvikelser motiveras i sidkartan. En sajt med bara en startsida räcker inte: "no one just buys a page" (fallgrop 179, 🎥 *Jack Roberts-videon 3*, sponsrad av Relume). En sida per huvudtjänst: expertenkäten Whitespark 2026 rankar "Dedicated Page for Each Service" som lokal organisk faktor nummer 1 – en enkät, inte ett experiment 📄 [Whitespark](https://whitespark.ca/local-search-ranking-factors). Ramverkets standardsida för 404 signalerar slarv med resten (fallgrop 178) *(en källa – bänken: 🎥 Jack Roberts-videon 2)*. Behövs integritetspolicyn också utan formulär? Webbserverns loggar hos Cloudflare innehåller IP-adresser. Frågan väntar till den första riktiga kunden, eftersom övningssajterna inte är publika (`bilaga-e-oppna-fragor.md`, fråga 1.8; `BESLUT.md` 2026-10-15). Uppsättningen 🔧

| Sida | Adress | Besökarens fråga | Primär handling |
|---|---|---|---|
| Start | `/` | Vad gör ni, var och för vem? | Kontaktvägen ur briefen |
| Tjänster | `/tjanster/` | Vad kan ni hjälpa mig med? Behövs bara vid fler än en tjänstesida. | Vidare till rätt tjänst |
| En sida per huvudtjänst | `/tjanster/<tjanst>/` | Gör ni det här, hur och till vilket pris? | Förfrågan om just den tjänsten |
| Om oss | `/om-oss/` | Vilka är ni, kan jag lita på er? | Kontaktvägen |
| Kontakt | `/kontakt/` | Hur når jag er, när och var? | Ring eller skicka förfrågan |
| Sidan finns inte (404) | – | Var hamnade jag? Har sidhuvud, meny och kontaktväg och visar vägar vidare; `noindex` → `2-8-teknik-och-kvalitet.md`. | Till start, tjänster eller kontakt |
| Tack – bara med formulär | `/tack/` | Kom min förfrågan fram, och vad händer nu? `noindex`, inte i sitemap. | – |
| Integritetspolicy – med formulär; utan formulär avgörs vid första riktiga kunden | `/integritetspolicy/` | Vad händer med mina uppgifter? Länkas från sidfoten och formuläret; innehållet → `2-8`. | – |

Blogg, ortssidor (nedan) och sidor för funktioner som bokning eller betalning ingår inte. De är tillval och prissätts i paketet (`2-2-omfattning.md`, `4-foretaget.md`).

- [N2] **Utförda jobb** (`/utforda-jobb/`) blir en egen sida när faktabasen har egna bilder och beskrivningar från flera jobb; annars är det en sektion på startsidan eller utelämnas (bildregler → `2-7-innehall.md`). 🔧

### Sidkartan

- [N1] **Sidkartan är en tabell i `sites/<namn>/sidkarta.md`, inte en del av briefen. Den listar varje sida med adress, besökarens fråga, söksträngar och primär handling, och varje sida slutar med sin primära handling som nästa steg.** Sidkartan är "the step that everyone misses" 🎥 *Jack Roberts-videon 3*. En sida som ser bra ut men inte leder till handlingen har misslyckats (fallgrop 50) 🔧. Sajtens primära handling och processen efter klicket bestäms i strategin (`2-1-strategi.md`). Johnny ser sidkartan tillsammans med briefen (`5-byggplan.md`, steg 1).
- [N2] **Sidkartan får två kolumner till:** innehållskälla i faktabasen och vilken handling på sidan som för mot nordstjärnan. Nordstjärnan själv → `2-1-strategi.md`. 🔧
- [N2] **Mermaid-diagram av sidkartan** när sajten har fler nivåer än standardsajten, så att strukturen syns i GitHub och artefakter. 📄 [mermaid-js/mermaid](https://github.com/mermaid-js/mermaid) (MIT; `kunskap/research/2026-10-15_kompetensluckor-anteckningar/lager-3-4-struktur-skelett.md`)
- [N1] **Branschens kontaktväg finns på varje sida. På datorn ligger den i sidhuvudet. På mobilen ligger den i en knapplist i tumzonen, som visas när förstavyns knappar har scrollats bort. Sidhuvudet är där smalt, med namnet och knappen "Meny", och göms vid scroll nedåt** (`BESLUT.md` 2026-10-15, *Kontaktvägen nere på mobilen*; 📄 NN/g, Sticky Headers; Hoober, tumzonen; WCAG 2.2, 2.4.11). Telefonen är en klickbar `tel:`-länk, och kontaktvägen hämtas ur branschprofilen (`2-2-omfattning.md`). Då är kontaktvägen ett tryck bort var besökaren än landar. Tre av Johnnys fyra förebilder i måttstocken har en sådan list: *"Jourtelefonen ligger i en list allra högst upp på mobilen"* (Jursla Rör), *"offertknapp och telefonnummer som klistrad list överst på mobilen"* (Plomberie 5 Étoiles) och *"en fast list med 'Boka online' / 'Ring nu' på mobilen"* (Citykiropraktikern). Den fasta listen får inte täcka första skärmens knappar: hos Citykiropraktikern *"täcker hero-knapparna när man scrollat lite"*. 📄 `mattstock/mattstock.md`; 🔧 webb-pros byggstandard 9.2 (`BESLUT.md` 2026-10-15)

### Sökord före bygget

- [N1] **Söksträngarna tas fram före sidkartan, och varje viktig söksträng får en sida eller en sektion som svarar på den.** Källor i första varvet: kundens egna ord i intervjun (`2-1-strategi.md`), konkurrenternas tjänstesidor och, vid ombyggnad, Search Console. Rangordna efter relevans för den primära handlingen, inte efter volym. Sökord som tas fram efter lanseringen kan bara följa upp, inte forma sajten (fallgrop 182). 🎥 *Jack Roberts-videon 3* / 🔧
- [N2] **Sökvolymer** via DataForSEO (Pröva; volymerna i små orter är troligen låga, så de används relativt) 📄 `kunskap/research/2026-10-15_kompetensluckor-anteckningar/lager-1-2-strategi-omfattning.md`.
- [N3] **Google-profilens sökfraser** (Performance API, `searchkeywords`) när Nortropic förvaltar profilen; kräver API-åtkomst som Johnny ansöker om (`2-9-drift-och-forvaltning.md`).

Linsen *sökmotor och AI-assistent* i branschresearchen → `2-1-strategi.md`. Toppuppgifterna → `2-2-omfattning.md`. Uppföljning av sökord efter lansering → `2-9-drift-och-forvaltning.md`.

### Namn, adresser och meny

- [N2] **Sidor och menyval heter det besökarna söker och säger**, inte branschens eller byråns ord: *Trädfällning*, inte *Arboristtjänster*, om kunderna säger så. Källan är söksträngarna och intervjun. 📄 Rosenfeld, Morville och Arango, *Information Architecture*, kap. 7 ([O'Reilly](https://www.oreilly.com/library/view/-/9781491913529))
- [N2] **Adresserna är svenska ord, gemener och bindestreck, högst två nivåer.** å, ä och ö skrivs a, a och o; det är ett val, inget krav, eftersom Google tillåter både translittererade och procentkodade ord. 📄 [Google, URL-struktur](https://developers.google.com/search/docs/crawling-indexing/url-structure). Kataloger hjälper främst sajter med tusentals adresser 📄 [Google, SEO Starter Guide](https://developers.google.com/search/docs/fundamentals/seo-starter-guide).
- [N2] **Huvudmenyn har få länkar. Med fyra eller färre toppnivålänkar visas de synligt även i mobil**, inte bakom en menyknapp. I NN/g:s test användes dold meny i 27 % av fallen mot 48 % för synlig (på dator), och upptäckbarheten sjönk med mer än 20 %. Regeln om 4–7 menyval saknar belägg och används inte. *(en källa – bänken: 📄 [NN/g, Hamburger Menus](https://www.nngroup.com/articles/hamburger-menus/))*
- [N2] **Sidfoten har kontaktuppgifter, öppettider eller telefontid, serviceområde, organisationsnummer och länk till integritetspolicyn** (när sajten har en). Menyn är ingen sidkarta och behöver inte lista allt; sidfoten tar resten. 📄 [GOV.UK, Navigate a service](https://design-system.service.gov.uk/patterns/navigate-a-service/). Uppgifterna kommer ur faktabasen (`2-7-innehall.md`).
- [N2] **Varje sida länkas från minst en annan sida med en vanlig `<a href>` och beskrivande länktext.** Tjänstesidorna länkar till varandra där det är naturligt och till kontakt. Google följer bara `<a>`-element med `href`. 📄 [Google, crawlbara länkar](https://developers.google.com/search/docs/crawling-indexing/links-crawlable)
- [N2] **Brödsmulor på andra nivån visar den typiska vägen** (Start › Tjänster › Trädfällning), inte adressen. På en platt sajt sammanfaller de oftast. De placeras före `<main>` i ett `nav` med namn och `aria-current="page"`. 📄 [Google, brödsmulor](https://developers.google.com/search/docs/appearance/structured-data/breadcrumb), [W3C APG Breadcrumb](https://www.w3.org/WAI/ARIA/apg/patterns/breadcrumb/), [GOV.UK](https://design-system.service.gov.uk/patterns/navigate-a-service/). Komponenten → `2-4-skelett.md`.

### Ortssidor och serviceområde

Spåren sa emot varandra: v0.74 föreslog "vid behov en sida per tjänst och ort", kartan bara ortssidor med eget innehåll. Googles spampolicy avgör: som *doorway abuse* räknas uttryckligen "pages targeted at specific regions or cities that funnel users to one page" och "substantially similar pages", och som *scaled content abuse* att generera många sidor med AI "without adding value for users". 📄 [Google, spampolicyer](https://developers.google.com/search/docs/essentials/spam-policies)

Standardsajten har därför inga ortssidor (ovan). Serviceområdet visas som en sektion (`2-4-skelett.md`) och i strukturerad data med `areaServed` (`2-8-teknik-och-kvalitet.md`).

- [N2] **En ortssida görs bara när orten har eget innehåll**: jobb utförda där, omdömen därifrån, lokala förhållanden eller ett annat erbjudande. Ortssidor genereras aldrig med AI ur samma mall. Johnny beslutar om varje sajts första ortssidor; Google anger ingen gräns för hur unikt innehållet måste vara.
- [N2] **Granskningskriterium: bytestestet.** Går ortnamnet att byta mot ett annat utan att texten blir fel, är sidan en dörrsida. *(en källa – bänken: 📄 [claude-seo `seo-local`](https://github.com/AgriciDaniel/claude-seo/blob/main/skills/seo-local/SKILL.md), metoden återgiven, inte verifierad)*

### Struktursidan av SEO

Det tekniska (titlar, metadata, `sitemap.xml`, `robots.txt`, strukturerad data, kontroll av trasiga länkar) bor i `2-8-teknik-och-kvalitet.md`. En sida per huvudtjänst står i standarduppsättningen ovan. Strukturen avgör också:

- [N2] **Sidans ämne och viktigaste söksträng styr dess `h1` och titel** (texten → `2-7-innehall.md`, kontrollen av titel och `h1` → `2-8`).
- [N2] **Strukturerad data följer sidkartan:** LocalBusiness på start- och kontaktsidan, Service på varje tjänstesida, BreadcrumbList bara där brödsmulor syns. Typer och format → `2-8`.
- [N2] **Vanliga frågor motiveras av besökarnas frågor, inte av sökresultaten.** FAQ-rich results visas inte i Google sedan juni 2026. 📄 [Google, FAQPage](https://developers.google.com/search/docs/appearance/structured-data/faqpage)

### Vägar och tillstånd

- [N1] **En nyckelresa skrivs i besökarens ord, från sökning till primär handling, och körs i webbläsaren som N1-kontroll 4 i `2-8-teknik-och-kvalitet.md`** (telefonlänken har numret ur faktabasen, eller formuläret sparar och mejlar). Exempel ur kartan: *en privatperson i Boden söker på trädfällning, hittar tjänstesidan och begär offert.* Kontroller kan gå igenom fast funktionen inte är inkopplad, till exempel när menyn pekar fel eller knappen inte når formuläret (fallgrop 16). Två källor för körbara kontroller: 🎥 *loop-videon* (AI LABS) och 🎥 *Coding Sloth-videon*; resorna är egen tillämpning 🔧.
- **Inga lekfulla hinder före den primära handlingen** – kriteriet står i granskarens N1-checklista → `3-2-granskning-och-kalibrering.md` (fallgrop 120).
- [N2] **Sajtens interaktiva delar kommer ur biblioteket:** meny, vanliga frågor, formulär, telefon- och bokningslänk. Deras tillstånd (meny öppen och stängd, formulär oskickat, med fel och skickat) definieras en gång per komponent i biblioteket (`2-4-skelett.md`). Formulärets beteende och felhantering → `2-8`.
- [N2] **En funktionsspecifikation per sajt skrivs bara för det som avviker från biblioteket**, till exempel en bokningsvy eller ett prisverktyg. Utan facit för tillstånd gissar granskaren vad som är rätt beteende (fallgrop 56). 🎥 *loop-nivåvideon* / 🔧

Vid ombyggnad bygger sidkartan på inventeringen av den gamla sajten, och varje gammal adress får en ny adress eller ett beslut att den tas bort. Inventering och omdirigeringar → `2-2-omfattning.md`.

## Vad som kommer ut

**Första sajten:** sidkartan som tabell i `sites/<namn>/sidkarta.md`, med söksträngarna, och en nyckelresa. Meny och sidfot följer av sidkartan.

**Från sajt 2:** söksträngslistan som egen rangordnad lista med den sida eller sektion som svarar på varje sträng; sidkartan med innehållskälla och nordstjärna per sida, som Mermaid vid fler nivåer; meny och sidfot med innehåll och ordning; två till fyra nyckelresor.

Johnny ser sidkartan och söksträngarna med briefen (`5-byggplan.md`, steg 1; i kundens väg steg 2, `1-kundens-vag.md`). Kunden ser strukturen i riktningarna och godkänner ingen separat sidkarta.

## Kompetens och källor

I första sajten gör Claude strukturen för hand efter N1-punkterna ovan. Det som gjorts för hand tre gånger blir en skill (`guide/README.md`, princip 8).

- [N2] **Strukturskillen** destilleras sedan ur marketingskills `site-architecture` (MIT) och de första sajternas sidkartor (`bilaga-b-skills.md`). Tre av dess regler byts mot primärkällor: tre-klicksregeln (NN/g), brödsmulor som speglar adressen (Google) och 4–7 menyval (NN/g). 📄 [SKILL.md](https://github.com/coreyhaines31/marketingskills/blob/main/skills/site-architecture/SKILL.md)
- [N2] **Verktyg:** Mermaid (Ta in); Screaming Frog Free för klickdjup och trädgraf, UXtweak eller Lyssna Free för trädtest, claude-seo `seo-local` som granskningslista (Pröva). Playwright kör nyckelresan redan i första sajten (→ `2-8`). Övriga kandidater och det som avstås (bland annat astro-breadcrumbs, GPL-3.0) → `bilaga-a-verktyg.md`.

**Eget bibliotek:** standarduppsättningen ovan är den första sidkartsmallen. Branschprofilernas sidkartor → `2-2-omfattning.md`. Mönstren för meny, sidfot och brödsmulor → `2-4-skelett.md`.

**Åtkomst vid kundbygget:** Search Console vid ombyggnad (ovan); Google-profilens sökfraser från N3.

**Förankring:** Garrett, *The Elements of User Experience*; Rosenfeld, Morville och Arango, *Information Architecture*, kap. 6–8, 11 och 13; Krug, *Don't Make Me Think* (trunk test) ([sensible.com](https://sensible.com/dont-make-me-think/)); Google Search Central (spampolicyer, brödsmulor, URL-struktur, crawlbara länkar); NN/g om trädtest, tre-klicksregeln och dold navigation.

## Kontroll

Alla kontroller, deras grund och visningsbredderna står i `bilaga-c-kontroller.md`; skriptet → `2-8-teknik-och-kvalitet.md`. I första sajten har strukturen ingen egen automatisk kontroll: nyckelresan ovan är N1-kontroll 4 i `2-8`, och Johnny ser sidkartan och sajten.

- [N2] **Låst kontroll: ingen föräldralös sida.** En genomsökning från startsidan når varje publik sida via `<a href>`. 📄 [Google, crawlbara länkar](https://developers.google.com/search/docs/crawling-indexing/links-crawlable)
- [N2] **Låst kontroll: två till fyra nyckelresor körs i webbläsaren** med Playwright, i mobil- och datorbredd, och minst en går hela vägen till den primära handlingen. Två källor för körbara kontroller: 🎥 *loop-videon* (AI LABS) och 🎥 *Coding Sloth-videon*; resorna är egen tillämpning 🔧. Att formuläret når fram → `2-8`.
- [N2] **Kontroll som rapporterar, stoppar inte: sidkartan stäms av mot faktabasen.** Varje huvudtjänst har en sida, och varje sida har en primär handling och en besökarfråga eller söksträng. 🔧
- [N2] **Kontroll som flaggar: klickdjupet.** Varje sida nås med högst två klick från startsidan. Det är en egenskap hos platta småföretagssajter, ingen allmän regel: tre-klicksregeln saknar belägg, och det som räknas är *information scent* och tydliga etiketter (📄 [NN/g](https://www.nngroup.com/articles/3-click-rule/)). *(en källa – bänken: Muellers uttalande 2018, [Search Engine Journal](https://searchenginejournal.com/google-click-depth-matters-seo-url-structure/256779/))*
- [N2] **Trädtest med AI som rök-test:** trädet som ren text, 6–10 uppgifter i kundens ord utan menyns ord, minst fem körningar med slumpad ordning mellan syskon, inga personaprompter. Misslyckanden rapporteras som röda flaggor. Testet validerar aldrig: ChatGPT löste 9–10 av 10 uppgifter mot cirka 51 % för människor, och personas gör syntetiska svar trovärdigare men inte träffsäkrare. 📄 [MeasuringU](https://measuringu.com/chatgpt4-tree-test/), [NN/g, syntetiska användare](https://www.nngroup.com/articles/synthetic-users/), [Kuric m.fl. 2026](https://arxiv.org/abs/2605.18302)
- [N2] **Trunk test per sidmall:** syns sajtens namn, sidans namn, huvudavsnitten, den lokala navigeringen och "du är här" inom några sekunder? Krugs sjätte fråga, sök, utgår på sajter utan sökfunktion. *(en källa – bänken: Krug)*
- [N2] **Ett mänskligt trädtest per branschprofil**, inte per kund, med en gratisnivå (UXtweak 30 svar i månaden). 📄 [NN/g, Tree Testing](https://www.nngroup.com/articles/tree-testing/)

## Hur självgående

**Första sajten:** Claude gör strukturen interaktivt medan Johnny tittar. Johnny ser sidkartan och söksträngarna med briefen och beslutar om avvikelser från standarduppsättningen.

- [N2] **Självgående i kundbygget.** Strukturen följer standarduppsättningen och kända mönster och kontrolleras automatiskt. Johnny beslutar om avvikelser från standarduppsättningen och om ortssidor.

Kunden godkänner bara sidor och tillval som påverkar priset (`2-2-omfattning.md`).
