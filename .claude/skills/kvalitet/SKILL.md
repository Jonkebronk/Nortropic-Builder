---
name: kvalitet
description: Säkrar och granskar en sajts tekniska kvalitet – tillgänglighet enligt WCAG 2.2 AA, prestanda och Core Web Vitals, säkerhetshuvuden och CSP, teknisk SEO och strukturerad data, modern HTML och CSS och JavaScript-kostnaden i React-öar – och säger vilka kontroller som ska köras och vad de inte ser; använd när en sajt ska kontrolleras före Johnnys dom eller före publicering, när kontrollskriptet ska byggas ut, när en sektion, komponent eller React-ö ska in i biblioteket, eller när någon frågar om axe, Lighthouse, INP, CLS, CSP, huvuden, JSON-LD, sitemap, tangentbordet eller skärmläsare.
---

# Kvalitet – teknik och kvalitet (lager 8)

Regelboken är `guide/2-8-teknik-och-kvalitet.md`. Där står stacken, kodstandarden, publiceringen och de tio N1-kontrollerna, som `skript/kontroll.mjs` kör (1–10c). Den här skillen är kunskapen bakom: vad som ska uppnås, vad automatiken missar, vilka kontroller som saknas och vad som är förbjudet. Detaljer, mått och tabeller står i delfilerna.

## Syfte

Sajten ska fungera för alla besökare och i alla vanliga webbläsare, utan att kunden behöver förstå koden:

- **tillgänglig:** WCAG 2.2 AA är golvet (→ `guide/2-8-teknik-och-kvalitet.md`, *Kodstandard*)
- **snabb:** Core Web Vitals inom *good* vid 75:e percentilen och Lighthouse 100 som mål (`BESLUT.md` 2026-10-16, *Lighthouse 100 är målet*)
- **säker:** huvuden och en strikt CSP, också för React-öar
- **hittbar:** det Google själv kräver, inte tumregler
- **byggd på plattformen:** inbyggd HTML före ARIA och JavaScript

Skillen gör också skillnaden mellan "0 fel i axe" och "tillgänglig" synlig. I GDS:s prov hittade det bästa verktyget 40 % av de avsiktliga hindren och axe 29 % (📄 [GDS](https://alphagov.github.io/accessibility-tool-audit/), 2018). Deques egen siffra är 57 % av ärendevolymen (leverantörsstudie, 📄 [Deque](https://www.deque.com/blog/automated-testing-study-identifies-57-percent-of-digital-accessibility-issues/)). W3C skriver att de flesta kontroller inte går att automatisera helt (📄 [WCAG-EM 2.0](https://www.w3.org/TR/WCAG-EM/)).

## När skillen används

- När en sajt kontrolleras före Johnnys dom, före publicering och efter förvaltningens ändringar.
- När kontrollskriptet byggs ut, när ett verktyg prövas, eller när ett fynd i `kontroller/senaste.json` ska tolkas.
- När en sektion, komponent eller React-ö ska in i biblioteket. Då körs provlistan i `prov.md`.
- När en ändring i biblioteket granskas för fel den inför (`kontroller.md`, *Vid ändring*).

**Inte för:**
- designdomen och måttstocken → granskarskillen och `guide/3-2-granskning-och-kalibrering.md`
- texter → innehållsskillen och `guide/2-7-innehall.md`
- rörelsens utformning → rörelseskillen och `guide/2-6-rorelse.md`
- publiceringens mekanik och förvaltningens schema → driftskillen och `guide/2-9-drift-och-forvaltning.md`

## In

- Det byggda paketet `dist/` och förhandsvisningen. Kontrollerna körs mot bygget, aldrig mot dev-servern, eftersom Astros CSP inte gäller i `dev` (📄 lager-8-anteckningarna §1e).
- `sites/<namn>/kontroller/senaste.json`, med datum. Ett resultat från `SNABB=1` saknar Lighthouse.
- `fakta.md` (namn, adress, telefon och öppettider), briefens primära handling och sidkartan.
- Bibliotekets källkod (`bibliotek/src/`) och sajtens (`sites/<namn>/src/`), för fil och rad i åtgärderna.

## Ut

- **En revision** med fynd per sida och element: vad, varför (källa), åtgärd med fil och rad, vad det ger besökaren och allvar (hög, medel, låg). Ett fynd mot ett kriterium med en källa får högst `medel` (`guide/bilaga-b-skills.md`).
- **Täckningen:** vad som prövades automatiskt, halvautomatiskt och för hand, i vilka webbläsare och bredder, och vad som inte gick att pröva. Det som inte kunde prövas är "ej verifierat" och inget fynd (📄 Krehel, better-interface).
- **Förslag på kontroller**, med grunden. En norm eller två oberoende primärkällor krävs för *stopp*, annars blir det *rapport* (`guide/README.md`, *Grind eller instruktion*).

## Principer

1. **Koden avgör där svaret är känt; omdömet går till Johnny.** Deterministiska kontroller körs utan tillsyn, och visuella och juridiska bedömningar går till honom (→ `guide/2-8-teknik-och-kvalitet.md`, *Hur självgående*).
2. **Norm före tumregel.** WCAG, Googles Search Central, web.dev, MDN och OWASP bär regler. Titel på 50–60 tecken, 44 px och radlängd är varningar (📄 [Google, title links](https://developers.google.com/search/docs/appearance/title-link): ingen gräns).
3. **Läs det automatiken lämnar.** axe:s `incomplete` är noder som inte gick att avgöra, och en grind på bara `violations` släpper igenom dem tyst (📄 [axe-core API](https://github.com/dequelabs/axe-core/blob/v4.14.0/doc/API.md)).
4. **Pröva som besökaren.** Chromium och WebKit, 375 och 1280 px, tangentbord, menyn öppen och tillstånden efter interaktion, med och utan JavaScript (→ `tillganglighet.md`).
5. **Mät brusiga värden rätt.** Uppvärmning och median (`BESLUT.md` 2026-10-16), en vilande maskin och en kalibrering för INP (→ `prestanda.md`).
6. **Plattformen först.** Inbyggd HTML före ARIA, och ARIA före skript: *"No ARIA is better than Bad ARIA"* (📄 [W3C APG, Read Me First](https://www.w3.org/WAI/ARIA/apg/practices/read-me-first/)). Nya funktioner används efter Baseline-status med en reserv (→ `modern-html-css.md`).
7. **JavaScript har ett pris som mäts per sida.** En ö hydreras bara där interaktionen kräver det, och kostnaden syns i TBT, INP och bytes (→ `prestanda.md`, *React-öar*; `BESLUT.md` 2026-10-16, *React, Tailwind och JavaScript tillåts*).
8. **Bevis, inte intryck.** Varje fynd pekar på ett element och en fil, och ett påstående om rendering kräver att renderingen setts (📄 Krehel, better-interface).

## Förbud

- Skriv aldrig att en sajt är "tillgänglig" eller "lagenlig" för att axe gav 0 fel (→ `guide/2-8-teknik-och-kvalitet.md`, *Kodstandard*; fallgrop 188).
- Ingen `outline: none` utan synlig ersättning, och fokus får aldrig döljas helt (📄 WCAG 2.2, 2.4.7 och 2.4.11).
- Ingen ARIA-roll `menu` för sajtnavigering (📄 [APG, Disclosure Navigation](https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/examples/disclosure-navigation/); → `guide/2-4-skelett.md`). Ingen klickbar `div` eller `span` i stället för `<button>` eller `<a href>`, inte heller i JSX.
- Ingen `loading="lazy"` på den största bilden i första vyn, och ingen bild utan `width` och `height` (📄 [web.dev, Optimize LCP](https://web.dev/articles/optimize-lcp); [web.dev, Optimize CLS](https://web.dev/articles/optimize-cls)).
- Ingen `'unsafe-inline'` eller `'unsafe-eval'` i `script-src`. `frame-ancestors` står aldrig bara i en meta-tagg (📄 [OWASP CSP Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Content_Security_Policy_Cheat_Sheet.html); → `guide/2-8-teknik-och-kvalitet.md`, *Publicering*).
- Ingen `user-scalable=no` eller `maximum-scale`, eftersom de hindrar zoom (📄 WCAG 2.2, 1.4.4).
- Ingen strukturerad data för det som inte syns på sidan, och inga egna betyg i `LocalBusiness` (📄 [Google, riktlinjer för strukturerad data](https://developers.google.com/search/docs/appearance/structured-data/sd-policies); → `guide/2-8-teknik-och-kvalitet.md`).
- Inga hemligheter till externa skannrar: aldrig Access-token i Observatorys `--headers`, aldrig Lighthouse-rapporter till `temporary-public-storage` (→ `guide/2-8-teknik-och-kvalitet.md`, *Kompetens och källor*).
- chrome-devtools-mcp körs bara med `--no-usage-statistics` och `--no-performance-crux`. Användningsstatistiken till Google är annars påslagen (📄 [chrome-devtools-mcp, configuration](https://github.com/ChromeDevTools/chrome-devtools-mcp/blob/main/docs/configuration.md)).
- Den som orsakade en avvikelse ändrar inte baslinjen eller undantagslistan för att få kontrollen grön (→ `guide/2-8-teknik-och-kvalitet.md`, *Hur självgående*).
- Externa skills och SEO-plugin installeras inte i kundbygget; de destilleras hit. Skript ur nedladdade repon körs aldrig (→ `guide/bilaga-a-verktyg.md`). claude-seo registrerar en hook som kör Python efter varje redigering (📄 [claude-seo](https://github.com/AgriciDaniel/claude-seo)).
- Teckengränser för titel och metabeskrivning stoppar aldrig (→ `guide/2-8-teknik-och-kvalitet.md`, N2).

## Kontrollista mot en sajt

Varje punkt säger vad som ska vara sant. Hur det prövas, och med vilken källa, står i delfilen.

**Läs först**
1. `kontroller/senaste.json` är från det aktuella bygget och har Lighthouse, inte `SNABB=1`. Alla stoppande kontroller går igenom (→ `guide/2-8-teknik-och-kvalitet.md`, *Kontroll*).

**Tillgänglighet** (`tillganglighet.md`)

2. axe med WCAG 2.2-taggarna ger 0 fel i Chromium **och** WebKit, i 375 och 1280 px, också med menyn öppen.
3. Varje `incomplete` från axe är läst och avgjord.
4. Tabbordningen följer läsordningen, och hopplänken leder in i `main`. Escape stänger menyn, och fokus går tillbaka till knappen. I WebKit prövas det med Alt+Tab.
5. Varje länk och knapp har ett begripligt namn i tillgänglighetsträdet, och den synliga texten ingår i namnet (2.5.3).
6. Ingen text klipps med WCAG:s textavstånd (1.4.12), och i forced-colors syns knappar, fält och fokus.
7. De kriterier som kräver en människa är prövade eller listade som ej prövade.

**Prestanda** (`prestanda.md`)

8. LCP, CLS och TBT är inom *good* i labbet, uppmätt på en vilande maskin, och LCP-elementet laddas inte lat.
9. INP vid sajtens interaktioner (meny, frågor, karta, samtycke) är under 200 ms. Inmatningsfördröjning och bearbetningstid läses för sig.
10. Sidorna kan sparas i bfcache, och JavaScript per sida ligger inom budgeten.

**Säkerhet** (`sakerhet.md`)

11. Huvudena i *Publicering* finns, och CSP:n i meta och huvud ger tillsammans 0 HIGH och 0 SYNTAX med csp-evaluators regler.
12. Svar som Workern skapar har egna huvuden och felbesked utan diagnostik.

**Teknisk SEO** (`seo-teknik.md`)

13. Varje sida svarar 200 med en kanonisk https-adress till sig själv, och sitemapen innehåller bara de sidorna. 404-sidan svarar 404.
14. JSON-LD använder typer och egenskaper som finns i schema.org och gäller typen. Namn, adress, telefon och öppettider stämmer med `fakta.md` och syns i texten.
15. Inga trasiga interna länkar eller ankare. De externa länkarna svarar.

**Modern HTML och CSS** (`modern-html-css.md`)

16. Mönstren använder plattformens element (`popover`, `<details name>`, `<dialog>`, `inert`), och varje funktion som inte är *Widely available* har en reserv.

**Biblioteket** (`prov.md`)

17. En ny eller ändrad sektion har klarat provlistan med värsta data, 320 px, zoom, forced-colors och tangentbord.

## Delfiler

| Fil | Innehåll |
|---|---|
| `tillganglighet.md` | axe i två motorer, `incomplete`, kriterierna som kräver människa, tangentbord, namn, forced-colors, textavstånd, React-komponenter |
| `prestanda.md` | Core Web Vitals, LCP, CLS, INP i labbet med kalibrering, mäthygien, bfcache, JavaScript-budget och hydrering |
| `sakerhet.md` | Huvuden mot OWASP, strikt CSP i meta och huvud, csp-evaluators regler, Observatorys poäng, CSP för öar, Workerns svar mot ASVS |
| `seo-teknik.md` | Prioritetsordningen, Googles regler, JSON-LD mot vokabulären och faktabasen, lokala kontroller, tumregler som varningar |
| `modern-html-css.md` | Policy för webbläsarstöd, mönster med Baseline-status och reserv |
| `prov.md` | Provlistan för sektioner och komponenter, ur break och break-ui |
| `kontroller.md` | Vad kontrollskriptet täcker och inte, förslagen på nya kontroller, verktygen och hur de körs, granskning vid ändring |
| `kallor.md` | Källor, versioner och licenser |
