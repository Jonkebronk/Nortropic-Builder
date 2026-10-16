---
name: omfattning
description: Avgör vad sajten ska innehålla och vad som väntar – toppuppgifter, sidor och funktioner med inte nu-listan, och när en befintlig sajt byggs om också innehållsinventering, omdirigeringskarta i _redirects och före-mått – använd när sidorna ska bestämmas, när kunden har en gammal sajt som ska ersättas, när _redirects ska skrivas eller granskas, eller när någon frågar vad som ska med och vad som kan vänta.
---

# Omfattning – lager 2

Omfattningen är Garretts andra plan: vilka sidor, funktioner och vilket innehåll sajten ska ha, och vad den inte ska ha. Reglerna bor i `guide/2-2-omfattning.md`. Den här skillen säger vad som ska uppnås och vad som är förbjudet, och samlar kunskapen ur källorna. Arbetsgången kommer ur körningen.

Lagret har två spår: A utan sajt och B med en sajt som ska ersättas (`BESLUT.md` 2026-10-13, 18:43). Sidkartans form, menyn, namnen och ortssidorna bor i `guide/2-3-struktur.md`. Lagkrav, onboarding och avtal per kund bor i `guide/2-2-omfattning.md` och skrivs inte om här.

## Syfte

En omfattning som täcker besökarnas viktigaste uppgifter och inget mer, och, vid ombyggnad, en flytt där ingen adress, placering, integration eller sanning försvinner.

## När den används och när inte

- **Används:** när sidor och funktioner ska bestämmas, när *inte nu*-listan skrivs, när en gammal sajt ska inventeras, när `_redirects` skrivs eller granskas, före och efter en lansering som ersätter en sajt, och när konkurrenternas sajter ska läsas för att se vad som brukar finnas.
- **Inte:** intervjun och briefen (skillen `strategi`). Sidkartans tabell, sökord och menyn (`guide/2-3-struktur.md`). Hur sektionerna ser ut (`guide/2-4-skelett.md`). Hur publiceringen går till (`guide/2-8-teknik-och-kvalitet.md`).

## In

- Briefen och faktabasen, särskilt besökarna och ägarens toppuppgifter (skillen `strategi`).
- Branschprofilen i `bibliotek/branscher/`, om den finns (→ `guide/2-2-omfattning.md`, *Två spår*).
- Spår B: den gamla sajten, dess sitemaps, en crawl och, när åtkomst finns, Search Console, analysdata och kundens länkar från Google-profilen och sociala medier.

## Ut

- Toppuppgifterna i briefen och kopplingen uppgift → sida eller sektion i sidkartan (→ `guide/2-2-omfattning.md`, *Toppuppgifter*).
- *Inte nu*-listan under sidtabellen i `sites/<namn>/sidkarta.md`.
- Från N2: MoSCoW per sida, sektion och funktion, och beslut om funktioner med kostnad i tre lägen (→ `prioritering.md`).
- Spår B: `sites/<namn>/befintlig/urler.md` med ett beslut per adress, `befintlig/integrationer.md`, före-måttet och omdirigeringskartan i `public/_redirects` (→ `inventering.md`, `flyttregler.md`).

## Det som ska uppnås

1. **Varje toppuppgift har en sida eller en sektion, och varje sida finns för en uppgift.** → `guide/2-2-omfattning.md`, *Toppuppgifter* (N1). 📄 McGovern, Top Tasks (metoden). Från N2 trianguleras uppgifterna (→ `prioritering.md`).
2. **Det som inte byggs står på *inte nu*-listan, med skäl.** Listan är byggarens gräns. → `guide/2-2-omfattning.md` (N1, fallgrop 43).
3. **Måste testas med frågan "vad händer om det saknas?"** → `guide/2-2-omfattning.md` (N2). 📄 DSDM, MoSCoW.
4. **En funktion utreds först mot en befintlig tjänst, helst den kunden redan använder.** Kostnaden skrivs i tre lägen: vid lansering, i drift och om kunden växer. → `guide/2-2-omfattning.md`, *Funktioner* (N2).
5. **Branschprofilen är startpunkten, och sajten rättar den.** En ny bransch skriver eller rättar profilen i genomgången efter sajten. → `guide/2-2-omfattning.md` (`BESLUT.md` 2026-10-15 och 2026-10-16).
6. **Sidkartan och briefen följer sajten.** Ett beslut som lägger till, tar bort eller döper om en sida rättar sidkartan i samma varv. → `BESLUT.md` 2026-10-16, G7 (`guide/3-1-orkestrering-och-roller.md`); G4: en sida har samma namn överallt (`guide/2-3-struktur.md`).
7. **Spår B: allt den gamla sajten har inventeras innan något tas bort.** Varje adress och varje innehåll får ett beslut: behåll, uppdatera, slå ihop eller ta bort. Crawlern gör listan, en människa eller agent med omdöme gör bedömningen. → `guide/2-2-omfattning.md`, *Spår B*. 📄 NN/g, Kaley 2020. Schemat → `inventering.md`.
8. **Spår B: varje gammal adress med värde får en 301 direkt till sin närmaste motsvarighet, eller ett skrivet beslut att den ska ge 404.** Inga kedjor, inte många adresser till startsidan, och omdirigeringarna ligger kvar minst ett år. → `guide/2-2-omfattning.md` (N1 när kundens domän byts). 📄 Google Search Central, *Site moves with URL changes* (uppdaterad 2026-08-20). Detaljer, Cloudflares fällor och flytten i Search Console → `flyttregler.md`.
9. **Flytten gäller också värdnamnen.** `www` och `http` som i dag leder till sajten ska fortsätta göra det med en 301. Det görs i Cloudflares zon, eftersom `_redirects` inte kan omdirigera på domännivå. 📄 Cloudflare, [Redirects](https://developers.cloudflare.com/workers/static-assets/redirects/) ("Domain-level redirects" stöds inte) och [Redirect www to root](https://developers.cloudflare.com/rules/url-forwarding/examples/redirect-www-to-root/). → `flyttregler.md`.
10. **Integrationer och formulärmottagare följer med.** Bokning, chatt, betalning, nyhetsbrev och vart formulären skickar sina data kartläggs innan bygget. → `guide/2-2-omfattning.md` (N2; två oberoende källor). → `inventering.md`.
11. **Före-måttet tas innan den gamla sajten stängs,** och efter lanseringen följs trafiken, indexeringen och 404-felen tills de gamla adresserna försvunnit ur sökresultaten. → `guide/2-2-omfattning.md`, *Före-mått*. 📄 Google, *Site moves with URL changes* (följ båda sitemaps, indexeringen och sökfrågorna; räkna med tillfälliga svängningar).
12. **Konkurrensläget visar vad besökarna jämför med, inte vad som ska kopieras.** Läs tre till fem lokala alternativ: vilka tjänster de lyfter, vilka uppgifter de svarar på först och vad som saknas. → `prioritering.md`, *Konkurrensläget*.

## Förbud

- Bygga det som står på *inte nu*-listan eller som ingen bett om (fallgrop 43, `guide/2-2-omfattning.md`).
- Ta bort en sida med trafik utan ett loggat beslut (`guide/2-2-omfattning.md`, *Hur självgående*).
- Skicka många gamla adresser till startsidan eller till en sida utan samband. Google kan läsa det som soft 404. 📄 Google, *Site moves with URL changes*.
- Skriva en regel i `_redirects` utan statuskod. Standard är 302, som är tillfällig. 📄 Cloudflare, *Redirects*.
- Använda Astros `redirects` för flytten. I en statisk build blir de en meta refresh utan statuskod (→ `guide/2-2-omfattning.md`).
- Kedja omdirigeringar: varje regel pekar på slutmålet. 📄 Google.
- Ta kundens gamla innehåll som fakta. Det blir förslag till faktabasen och bekräftas av kunden (→ `guide/2-2-omfattning.md`; fallgrop 103).
- Fånga och analysera en presumtiv kunds sajt innan kunden gett uppdraget, utom i övningssajterna (→ `guide/2-2-omfattning.md`, *Fånga bara kundens egen sajt*).
- Kopiera andra företags texter, bilder eller kännetecken när konkurrenterna läses (upphovsrättslagen 1 §, marknadsföringslagen 14 §; `BESLUT.md` 2026-10-16, Claudes anmärkning; ⚖️ tolkning).
- Använda Places-data för konkurrentanalys (→ `guide/2-1-strategi.md`, *Rättsflaggor*).
- Slå på verktyg som kan ändra kundens Search Console (lägga till eller ta bort egendomar eller sitemaps) utan Johnny (→ `verktyg.md`, mcp-gsc).
- Låta ett crawlverktyg ladda upp en rapport om kundens sajt till en tredje part (→ `verktyg.md`, SiteOne).

## Kontrollista

Körs mot `brief.md`, `sidkarta.md`, `public/_redirects`, `dist/` och den körande sajten. Varje punkt ger *ja*, *nej* eller *okänt* med belägg.

1. Har varje toppuppgift i briefen en sida eller sektion i sidkartan, och finns den på sajten?
2. Finns varje sida i `dist/` i sidkartan med samma namn som i menyn och sidfoten, och tvärtom?
3. Har varje sida en primär handling som nästa steg, och är det samma handling som briefen anger för besökaren?
4. Står det kunden önskat men inte får nu på *inte nu*-listan, med skäl?
5. Spår B: täcker inventeringen sitemaps, en crawl, de interna länkarna och, när åtkomst finns, Search Console, analysdata och bakåtlänkar?
6. Spår B: har varje gammal adress ett av tre utfall – samma adress, 301 till en sida som finns, eller ett skrivet beslut om 404? Kör `kontrollera_omdirigeringar.py`.
7. Har varje regel i `_redirects` en uttrycklig statuskod, ett mål som finns och ingen kedja? Pekar högst ett fåtal regler på startsidan?
8. Är värdnamnen (`www`, `http`) och den gamla sitemapen med i flyttplanen, och står Search Console-stegen i checklistan för publiceringen?
9. Finns före-måttet: trafik, förfrågningar och de mest besökta sidorna?
10. Är integrationerna på den gamla sajten kartlagda, och har var och en en motsvarighet eller ett beslut?
11. Finns branschprofilens register och kataloger med i *Kundens lyft* (`guide/2-2-omfattning.md`, *Branschprofilen*)?
12. Uppdaterar kunden sina länkar till sajten där de pekar på gamla adresser: Google-profilens webbplats och bokningslänk, sociala medier och kataloger?

## Delfiler

- `prioritering.md` – toppuppgifter med triangulering, MoSCoW, funktioner, branschprofilen och konkurrensläget.
- `inventering.md` – inventeringsschemat, källorna till gamla adresser, beslut per sida, integrationer och före-mått.
- `flyttregler.md` – Googles regler, `_redirects` i Cloudflare och dess fällor, värdnamn, Search Console och uppföljning.
- `verktyg.md` – crawlers, Search Console-MCP, matchning av adresser och sökvolymer: vad de ger, kräver och riskerar.
- `kallor.md` – varje källa med version, licens, vad som togs och vad som lämnades.
- `kontrollera_omdirigeringar.py` – prövar att varje gammal adress har ett utfall och att reglerna håller. Läser bara.
