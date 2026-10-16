# NN/g: Homepage Design och 113 Design Guidelines

**Källa:** två artiklar från Nielsen Norman Group, lästa 2026-10-16 med WebFetch och i andra varvets nedladdning (`byggguider/awwwards-nng-hem/`).
- Huei-Hsin Wang, [Homepage Design: 5 Fundamental Principles](https://www.nngroup.com/articles/homepage-design-principles/), 2024-03-15. Inget uppdateringsdatum på sidan. Läst i sin helhet.
- Jakob Nielsen, [113 Design Guidelines for Homepage Usability](https://www.nngroup.com/articles/113-design-guidelines-homepage-usability/), 2001-10-31, ur boken *Homepage Usability: 50 Websites Deconstructed*. Inget uppdateringsdatum. Läst i sin helhet.
- NN/g, [Copyright & Reprint Policy](https://www.nngroup.com/copyright-and-reprint-info/).
- Blickprovet mot övningssajten: `andra-varvet/byggguider-jamforelse.md`, *Blickprovet*, avsnitt A.

⚠️ Inte lästa: boken och de 50 genomgångarna, NN/g:s betalrapporter och studien bakom 2024 års påstående om scrollstyrd text.

**Licens:** © Nielsen Norman Group, alla rättigheter förbehållna. Sidan tillåter att man citerar *"a few words or lines"* och länkar fritt. Att kopiera en artikel till en egen sajt kostar 250 dollar per artikel, och *"Translations are only allowed after paying a license fee which currently is $250 per article."* Vi destillerar med egna ord, citerar kort och länkar. En svensk översättning av hela listan publiceras inte i repot, eftersom repot är publikt (⚖️ tolkning, inte juridisk rådgivning).

## Vad det är
NN/g:s två checklistor för startsidor. 2024 års artikel har fem principer med 15 riktlinjer: lätt att nå startsidan, säg vem ni är och vad ni gör, visa innehållet med exempel, led till handling och navigering, håll startsidan enkel. 2001 års artikel har 113 riktlinjer i 24 avsnitt, från sajtens syfte och länkar till aktiekurser och annonser. 2024 skriver NN/g om de 113: *"Most of these guidelines remain true today"*.

## Hur det fungerar
- **Checklista att gå igenom.** NN/g uppmuntrar att listan används som checklista men skriver att den är förkortad; exemplen står i boken.
- **2024 års riktlinjer** är numrerade (1.1–5.4) och har exempel med ✅ och ❌ från riktiga sajter.
- **Lokala tjänstesajter nämns inte.** Ingen av artiklarna handlar om lokala, små eller tjänsteföretag. 2001 avgränsar uttryckligen bort branscher: *"We don't address special design considerations for vertical industry segments, such as homepages for software companies, conferences, or dentists."* och *"The only way to generate vertical design guidelines is to study each industry's users and their tasks."* Att listan gäller en klinik eller en hantverkare är alltså vår överföring (🔧 härlett), inte NN/g:s.

## Kvalitet och underhåll
- Utgivare: NN/g. 2024 års artikel bygger enligt texten på egen forskning, men studien redovisas inte ⚠️.
- 2001 års lista uppdateras inte. Delar är föråldrade: aktiekurser, `www.company.com` som enda form, titlar som bokmärken och *liquid layout*.
- Ingen ändringslogg och inga ärenden.

## Det bästa vi kan ta
Urvalet på cirka 25 riktlinjer står i blickprovet. Det som inte redan är regel hos oss:
1. **2.3 skillnaden mot konkurrenterna i första skärmen:** *"Emphasize the unique value your site brings to your users, as well as how it differentiates from competitors."* Det är andra varvets lucka 1. Den rör måttstockens fråga 1 och är Johnnys beslut.
2. **Besökta länkar syns** (2001: *"Allow link colors to show visited and unvisited states."*). En kontroll kan inte läsa färgen med `getComputedStyle`, eftersom webbläsaren alltid svarar som om länken är obesökt. Kontrollen läser i stället om stilmallarna har en regel för `:visited` (📄 [MDN, Privacy and the :visited selector](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Selectors/Privacy_and_:visited)).
3. **Uttalad länk till startsidan** (2024, 1.1) och **ingen aktiv startsideslänk på startsidan** (2001: *"Don't include an active link to the homepage on the homepage."*). Låg vikt.
4. **Domännamn i stavningsvarianter** (2001, *URLs*). Hör till luckfilen 9.5 om å, ä och ö.
5. **Startsidans titel börjar med företagsnamnet** (2001, *Window Titles*). Övningssajten gör så, men ingen regel säger det. `kvalitet/tillganglighet.md` (2.4.2) säger ämnet först och företaget sist, vilket gäller undersidorna. NN/g:s gräns på 64 tecken gällde bokmärken 2001; Google sätter ingen gräns (`kvalitet/seo-teknik.md:22`).

**Redan hos oss, nu med NN/g som källa:**
- Ingen animerad rubrik. 2024, 5.3: *"avoid animating crucial page elements like the logo, tagline, or main headline"* och *"Our research indicated that scroll-triggered text animations delay users."* 2001: *"Never animate critical elements of the page, such as the logo, tag line, or main headline."* Det stöder Johnnys beslut om sparsam rörelse (`BESLUT.md` 2026-10-15).
- Inga popup-rutor utom samtycke (5.4: bara när sajten är *"legally obligated to request consent from users to accept the use of cookies or verify their age"*). Länkar som börjar med det bärande ordet (4.1; `innehall/mikrotext.md`). Hårt mellanslag (granskarens PF4). Sidan visar att den fortsätter (3.1; `skelett/SKILL.md:35` citerar redan 2024 års artikel).

## Var det hamnar hos oss
**Beslutad:** skill: granskare (fältet `beslut`; Johnny 2026-10-16 omkring 17.40, *"Ja på alla"*). I dag nämner granskarens filer (`granskare/SKILL.md`, `premium.md`, `underlag.md`) inte listan. 2024 års artikel citeras bara i `skelett/SKILL.md:35`.

**Förslag till Johnny** (bänken, en källa per punkt om inget annat sägs):
- Granskaren får en kort lista på cirka tio frågor i `premium.md`, med egna ord. Det som redan är regel i `skelett/`, `innehall/mikrotext.md` och `guide/2-3` står inte där en gång till.
- Två punkter mäts bäst av en maskin, inte av granskaren: att `h1` och ingressen inte animeras in (NN/g och Smashing, två oberoende källor) och att stilmallen har `:visited`. De hör till `kvalitet/kontroller.md` som rapportkontroller.
- Punkt 1 går genom måttstocken och `guide/2-4-skelett.md`, *Mobilens första skärm*.

## Passar vår stack?
Ja. Det är en metod, ingen kod. Allt i urvalet går att pröva på skärmbilder och i DOM med Playwright.

## Risker och flaggor
- **Upphovsrätt:** översätt inte listorna i repot (licensvillkoren ovan).
- **Ålder:** 2001 års lista gäller datorskärmar från 2001. Lyft bara det som 2024 bekräftar eller det som har en andra källa.
- **Krock med ett beslut:** 2024, 4.3, kritiserar en meny dold bakom MENU. Det berör `BESLUT.md` 2026-10-15 ("Meny" i mobilen) och luckfilen 3.1. Beslutet står tills Johnny säger annat.
- **Branschgränsen:** NN/g säger själv att branschregler kräver egna studier. Använd listan som grund, inte som bevis för vad en vårdsajt behöver.
- Ingen telemetri, ingen betalvägg för artiklarna.

## Inloggning
Inget. Böckerna och rapporterna kostar pengar.
