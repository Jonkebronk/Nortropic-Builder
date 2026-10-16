---
name: struktur
description: Bestämmer och granskar en Nortropic-sajts struktur – vilka sidor som finns, vad de heter och var de ligger (sidkarta och adresser), menyn, sidfoten och brödsmulorna, internlänkarna, sidor per ort eller mottagning och den strukturerade datan som följer sidkartan; använd när sidkartan ska göras eller ändras, när en sida läggs till, tas bort eller byter namn, när menyn eller länkarna ska ses över, när en kund vill ha sidor per ort, eller när strukturen ska granskas.
---

# Struktur

Lager 3. Garretts strukturplan har två halvor: informationsarkitekturen (vilka sidor som finns, hur de hänger ihop och vad de heter) och interaktionsdesignen (vägarna från sökning till handling). Hur sidorna ser ut hör till skelettet (skillen `skelett`); vilka sidor och funktioner som ingår i paketet avgörs i omfattningen (→ `guide/2-2-omfattning.md`). Skillen säger vad strukturen ska uppnå och vad som är förbjudet. Reglerna som redan står i guiden refereras och skrivs inte om (→ `guide/2-3-struktur.md`).

## Syfte

En besökare som landar var som helst på sajten – oftast från en sökning i mobilen – ska förstå var hon är, hitta det hon söker utan att gissa och nå den primära handlingen. En sökmotor ska nå varje sida genom vanliga länkar och förstå vad varje sida handlar om och vilket företag och vilken plats den hör till.

## In

- Briefen med besökare, toppuppgifter och primär handling, och faktabasen (→ `guide/2-1-strategi.md`, `guide/2-7-innehall.md`).
- Söksträngarna, rangordnade efter närhet till den primära handlingen (→ `guide/2-3-struktur.md`, *Sökord före bygget*).
- Branschprofilen (→ `guide/2-2-omfattning.md`) och vid ombyggnad inventeringen av den gamla sajten med varje gammal adress.
- Den körande sajten, när strukturen granskas.

## Ut

- **Sidkartan** i `sites/<namn>/sidkarta.md`: tabellen med adress, besökarens fråga, söksträngar och primär handling per sida (→ `guide/2-3-struktur.md`, N1), och från sajt 2 de övriga formaten – träd, Mermaid, navigationsspec och internlänkplan ([sidkarta.md](sidkarta.md)).
- **Nyckelresan** i besökarens ord, körbar som kontroll 4 (→ `guide/2-3-struktur.md`, *Vägar och tillstånd*).
- **När strukturen granskas:** fynd med sida, element, förväntat, faktiskt, allvar och källa, och länkgrafen (vilka sidor som länkar till vilka, i huvudinnehållet och totalt).

## Principer

1. **Standardsajten är utgångspunkten** – start, en sida per huvudtjänst, om oss, kontakt, *Integritet och cookies* och en designad 404 – och avvikelser motiveras i sidkartan (→ `guide/2-3-struktur.md`, N1; Whitespark 2026, "Dedicated Page for Each Service").
2. **Varje sida svarar på en fråga besökaren har och slutar med sin primära handling** (→ `guide/2-3-struktur.md`, N1, *Sidkartan*).
3. **Sidor och menyval heter det besökarna söker och säger, och en sida har samma namn överallt** – i menyn på dator och mobil, i sidfoten, i rubriken och i titeln (→ `guide/2-3-struktur.md`, N1, G4, och N2; Rosenfeld, Morville och Arango, kap. 7).
4. **Ett menyval leder till en sida, inte till ett avsnitt på en annan sida.** När flera tjänstesidor finns får de en översiktssida (`/tjanster/` eller kundens ord), som standardsajten anger, och menyvalet pekar dit. 🔧 härlett ur standarduppsättningen i `guide/2-3-struktur.md` och information scent (NN/g, [3-click rule](https://www.nngroup.com/articles/3-click-rule/)) → [navigation.md](navigation.md).
5. **Menyn har få val; sidfoten tar resten.** Menyn är ingen sidkarta (GOV.UK, *Navigate a service*). Med högst fyra toppval kan de stå synliga också i mobilen (NN/g, *Hamburger Menus*, 2016); Nortropics standard är "Meny" i ett smalt sidhuvud (`BESLUT.md` 2026-10-15). Regeln om 4–7 menyval saknar belägg och används inte → [navigation.md](navigation.md).
6. **Varje sida nås med en vanlig `<a href>` från minst en annan sida, med beskrivande länktext, och närliggande sidor länkar till varandra i texten** (→ `guide/2-3-struktur.md`, N2; 📄 Google, [Link best practices](https://developers.google.com/search/docs/crawling-indexing/links-crawlable)). Navigation, länkar och strukturerad data finns i HTML:en från bygget, aldrig bara i en ö som renderas i webbläsaren → [navigation.md](navigation.md).
7. **Platt struktur:** varje sida nås med högst två klick från start, adresser med högst två nivåer. Tre-klicksregeln saknar belägg; det som räknas är information scent och tydliga etiketter (→ `guide/2-3-struktur.md`, N2; NN/g 2019).
8. **Brödsmulor visar sidans plats längs den typiska vägen dit – inte adressen – med aktuell sida sist** (→ `guide/2-3-struktur.md`, N2; 📄 Google, *Breadcrumb*; NN/g, *Breadcrumbs: 11 Design Guidelines*). NN/g säger att platta sajter med en eller två nivåer inte behöver dem, vilket gäller standardsajten; om de ska finnas på tjänstesidorna är ett förslag till Johnny → [navigation.md](navigation.md).
9. **En sida per ort eller mottagning bara med eget innehåll.** En verklig mottagning får en egen sida med sin adress, sina tider och sin väg dit; en ort utan eget innehåll listas i serviceområdet. Bytestestet avgör (→ `guide/2-3-struktur.md`, *Ortssidor och serviceområde*; 📄 Google, spampolicyer, *doorway abuse*) → [platser.md](platser.md).
10. **Den strukturerade datan följer sidkartan och visar bara det som syns:** organisation och webbplats på start, en lokal verksamhet per mottagning på dess sida, tjänst på varje tjänstesida, brödsmulor bara där de syns – sammanbundna med `@id` (→ `guide/2-3-struktur.md`, N2; 📄 Google, riktlinjer för strukturerad data) → [strukturerad-data.md](strukturerad-data.md).
11. **Strukturen prövas, inte bara ritas:** nyckelresan körs, länkgrafen genomsöks och trädet testas (→ `guide/2-3-struktur.md`, *Kontroll*) → [utvardering.md](utvardering.md).

## Förbud

- Inga dörrsidor: inga sidor per ort som bara byter ortnamnet, inga sidor genererade med AI ur samma mall, och inga ortslistor i sidfoten som ska fånga sökningar (📄 Google, spampolicyer, *doorway* och *scaled content abuse*).
- Ingen tre-klicksregel, ingen gräns på 4–7 menyval och inga brödsmulor som speglar adressen som regel – de tre reglerna i marketingskills `site-architecture` som saknar belägg (NN/g; Google).
- Inga ordgränser per sidtyp och inga siffror för antal länkar per tusen ord (📄 Google, *Creating helpful content*: "(No, we don't.)"; marketingskills och claude-seo motsäger varandra).
- Ingen navigation, inga länkar och ingen strukturerad data som bara finns efter att JavaScript körts (📄 Google, crawlbara länkar).
- Ingen strukturerad data om något som inte syns på sidan, inget eget stjärnbetyg och ingen `FAQPage` (→ `guide/2-3-struktur.md`, N2; `BESLUT.md` 2026-10-15 och 2026-10-16, *Lokal SEO, AEO och GEO*).
- Ingen ny sida, sidtyp eller ortssida utanför standarduppsättningen utan att den motiveras i sidkartan och, för ortssidor, Johnnys beslut (→ `guide/2-3-struktur.md`).
- Inga ändrade adresser vid ombyggnad utan omdirigering eller beslut att sidan tas bort (→ `guide/2-2-omfattning.md`).
- Ingen gatuadress på sajten eller i datan för en verksamhet som inte tar emot kunder där (→ [platser.md](platser.md)).

## Kontrollista mot en sajt

1. **Standarduppsättningen:** finns varje sida i sidkartan på sajten, och varje sida på sajten i sidkartan? Har varje huvudtjänst en sida, och finns en översiktssida när de är fler än en?
2. **Namnen:** samma namn i menyn (dator och mobil), sidfoten, `h1` och `<title>` för varje sida (G4).
3. **Menyn:** syns den alltid på datorn? Leder varje menyval till en sida? Är aktuell sida markerad synligt och med `aria-current`? Är menyn samma, i samma ordning, på alla sidor (📄 WCAG 2.2, 3.2.3)? Börjar varje val med det bärande ordet?
4. **Länkgrafen:** genomsök från start med vanliga `<a href>`: når vi varje sida, med högst två klick? Vilka sidor har inga kontextuella länkar in eller ut i huvudinnehållet?
5. **Länktexterna:** beskriver de målet utan sammanhanget? Inga "Läs mer" eller "Klicka här" ensamma.
6. **Kontaktvägen och företagsuppgifterna** på varje sida, som guiden kräver (→ `guide/2-3-struktur.md`, N1).
7. **Brödsmulor:** om de finns – typisk väg, aktuell sida sist och olänkad, samma som i `BreadcrumbList`?
8. **Ortssidor:** klarar varje sida bytestestet, och har den adress, tider, väg dit och länk till de andra mottagningarna, också i mobilen?
9. **Strukturerad data:** stämmer namn, adress och telefon med det som syns och med Google-profilen? En lokal verksamhet per mottagning på rätt sida, sammanbunden med organisationen? Validerad i Rich Results Test?
10. **Nyckelresan:** går den hela vägen från sökningen till den primära handlingen i mobil och dator (kontroll 4)?
11. **404 och omdirigeringar:** visar 404 vägar vidare, och leder gamla adresser rätt (→ `guide/2-3-struktur.md`; kontroll 10b och 10c)?

## Delfiler

| Fil | Innehåll |
|---|---|
| [sidkarta.md](sidkarta.md) | Sidkartans format: tabell, träd, Mermaid, adresstabell, navigationsspec och internlänkplan, med mall |
| [navigation.md](navigation.md) | Meny, sidfot, brödsmulor, internlänkar och länktext, klickdjup och adresser |
| [platser.md](platser.md) | Sidor per mottagning och ort, serviceområdet, bytestestet och företag utan besöksadress |
| [strukturerad-data.md](strukturerad-data.md) | Grafen med `@id`, typer per sida, NAP och verktygen |
| [utvardering.md](utvardering.md) | Länkgrafen, trädtest med AI och människor, trunk test och nyckelresor |

## Källor

Garrett, *The Elements of User Experience*; Rosenfeld, Morville och Arango, *Information Architecture*, 4:e uppl. ([O'Reilly](https://www.oreilly.com/library/view/-/9781491913529)); Krug, *Don't Make Me Think, Revisited* ([sensible.com](https://sensible.com/dont-make-me-think/)); NN/g om navigation, brödsmulor, tre-klicksregeln, dold navigation och trädtest; Google Search Central (spampolicyer, länkar, brödsmulor, URL-struktur, LocalBusiness, strukturerad data, sitemaps); W3C WCAG 2.2 och APG; GOV.UK Design System. Externa skills, destillerade och inte installerade, jämförda regel för regel 2026-10-16: marketingskills `site-architecture` ([coreyhaines31/marketingskills](https://github.com/coreyhaines31/marketingskills), MIT, v2.1.0, commit 365b412) med rättelser mot NN/g, Google och APG, och claude-seo `seo-local` ([AgriciDaniel/claude-seo](https://github.com/AgriciDaniel/claude-seo), MIT, v2.4.2) med USA-delarna, de obelagda siffrorna och rådet att länka Google-profilen till en annan sida än platsens egen (Sterling Sky, ⚠️ mot Googles egna riktlinjer) strukna.
