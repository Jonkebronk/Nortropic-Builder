# Formulär

Formuläret är den primära handlingen när en sajt har ett, och den del som oftast är sårbar. Mönstret med Worker, Turnstile, D1 och mejl står i `guide/2-8-teknik-och-kvalitet.md`, *Formulär* (N2), och komponenten i biblioteket byggs efter webb-pros `Forfragan.astro` (samma ställe). Här står vad som ska vara sant i HTML:en och för besökaren, och hur det prövas. Gäller också React-öar med formulär.

Källorna: Krehel, better-accessibility `forms.md` (MIT); Vercel, [Web Interface Guidelines](https://vercel.com/design/guidelines), *Forms* (MIT); Googles modern-web-guidance, `forms/` (Apache-2.0); [GOV.UK Design System](https://design-system.service.gov.uk/) och WCAG 2.2. Där källorna säger emot varandra står det.

## Fälten

- **Varje fält har en synlig etikett** kopplad med `for` eller ett omslutande `<label>`, och etikett och fält delar träffyta. En platshållare är aldrig etikett: den försvinner när besökaren skriver och har sällan kontrast. 📄 WCAG 2.2, 1.3.1, 3.3.2 och 4.1.2 [norm]
- **Det syns före ifyllning vilka fält som måste fyllas i.** Valfria fält märks "(valfritt)", eller obligatoriska med en förklarad markering, en gång per formulär. 📄 WCAG 2.2, 3.3.2; GOV.UK *Question pages* [norm]
- **Ledtext står mellan etiketten och fältet** och kopplas med `aria-describedby`. 📄 GOV.UK; MWG [tumregel]
- **`type`, `inputmode` och `autocomplete` passar ihop,** och `autocomplete="off"` används aldrig på kontaktfält. Besökarens uppgifter kräver en giltig token (1.3.5):

| Fält | Attribut |
|---|---|
| Namn | `autocomplete="name"`, ett enda fält |
| E-post | `type="email"`, `autocomplete="email"`, `spellcheck="false"` |
| Telefon | `type="tel"`, `autocomplete="tel"`; mellanslag och bindestreck godtas |
| Gatuadress | `autocomplete="street-address"` |
| Postnummer | `inputmode="numeric"`, `autocomplete="postal-code"` |
| Ort | `autocomplete="address-level2"` |
| Företag | `autocomplete="organization"` |
| Meddelande | `<textarea>` som behåller `resize`; `field-sizing: content` med `min-block-size` där det stöds |

📄 WCAG 2.2, 1.3.5; HTML-standarden, *Autofill*; Krehel; MWG [norm för tokens]

- **Telefon och postnummer har aldrig `type="number"`.** Den typen tar bort inledande nollor och har stegknappar. 📄 HTML-standarden; MWG [tumregel]
- **Namnfältet godtar alla bokstäver,** också å, ä, ö, bindestreck, apostrof och andra skriftsystem. Inget mönster godtar bara a–z. 📄 W3C i18n, [Personal names around the world](https://www.w3.org/International/questions/qa-personal-names); MWG [tumregel]
- **Inmatning blockeras aldrig och klistra in är alltid tillåtet.** Ett fält som bara tar siffror tar emot allt och förklarar felet efteråt. Värden trimmas före kontrollen, eftersom autofyll och textersättning lägger till mellanslag. 📄 Krehel; Vercel [tumregel]
- **Få val visas som radioknappar i en `fieldset` med `legend`;** `<select>` används sist. Får ett `<select>` egen stil sätts både `background-color` och `color`, annars kan det bli oläsligt i Windows mörka läge. 📄 GOV.UK *Select*; MWG; Vercel [tumregel]
- **Sista fältet kan ha `enterkeyhint="send"`.** Enter i ett ensamt textfält skickar formuläret; i `<textarea>` ger Enter en ny rad. 📄 MWG; Vercel [tumregel]
- **Fälten har minst 16 px text i mobilen,** annars zoomar iOS in när fältet får fokus. ⚠️ Ingen primärkälla från Apple är funnen; regeln står också i `skelett/mobil.md`.

## Skicka

- **Skicka-knappen är aldrig inaktiverad i väntan på giltiga fält.** Besökaren ska kunna skicka och få veta vad som saknas. En inaktiv knapp lämnar tabbordningen och förklarar ingenting. 📄 Krehel; Vercel; GOV.UK *Button* [tumregel, tre källor]
- **Medan inskicket pågår** har knappen `aria-disabled="true"`, upprepade tryck ignoreras i koden, och en indikator står bredvid den ursprungliga texten ("Skicka" med snurra, aldrig bara en snurra). Inbyggt `disabled` på den fokuserade knappen skickar fokus till `body`. Dubbla inskick stoppas också på servern med inskicks-id (→ `guide/2-8-teknik-och-kvalitet.md`, *Formulär*). 📄 Krehel; Vercel (*idempotency key*)
- **"Skickar …" skrivs i en statusbehållare som fanns före inskicket,** och byts mot beskedet (→ `tillganglighet.md`, *Statusbesked*).
- **Har besökaren skrivit i meddelandefältet varnar sidan före navigering,** med en `beforeunload`-lyssnare som läggs till först när fältet har text och tas bort efter skick, så att bfcache inte stoppas i onödan. 📄 Krehel; Vercel; [web.dev, bfcache](https://web.dev/articles/bfcache) [tumregel]
- **Formuläret fungerar utan JavaScript** som vanlig POST, och en hydrerad ö tappar aldrig ett ifyllt värde eller fokus (→ `guide/2-8-teknik-och-kvalitet.md`; Vercel, *Hydration-safe inputs*).

## Fel

- **Felen visas efter skick, inte medan besökaren skriver eller lämnar fältet.** GOV.UK avråder från både validering vid blur och webbläsarens `required`; modern-web-guidance föreslår validering vid blur. Vi följer GOV.UK och servern (`novalidate`). `:user-invalid`, aldrig `:invalid`, används bara som stil om Johnny väljer webbläsarens validering. 📄 GOV.UK *Validation*; MDN `:user-invalid`
- **Efter ett skick med fel:** en felsammanfattning överst får fokus och länkar till varje fält, varje fel står i text vid fältet med ett dolt "Fel:", fältet har `aria-invalid="true"` och `aria-describedby` till felet, och sidans titel börjar med "Fel:". Krehel flyttar i stället fokus till första felaktiga fältet; båda klarar 3.3.1, och vi följer GOV.UK (→ `guide/2-4-skelett.md`). 📄 WCAG 2.2, 3.3.1 och 3.3.3; [WCAG-teknik ARIA21](https://www.w3.org/WAI/WCAG22/Techniques/aria/ARIA21); GOV.UK *Error message* [norm för 3.3.1]
- **Felet säger hur det rättas,** aldrig bara att något är fel, och bärs aldrig av en röd kant ensam (1.4.1). Orden → `innehall/mikrotext.md`.

## Integritet

- Bara de uppgifter som behövs, och vid formuläret står varför de behövs och en länk till integritetspolicyn (→ `guide/2-8-teknik-och-kvalitet.md`).
- **Workern loggar aldrig fältvärden,** bara id, status och fel utan diagnostik. 📄 GDPR art. 5.1 c; [OWASP Logging Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Logging_Cheat_Sheet.html)

## Pröva

Med Playwright, med och utan JavaScript, i 375 och 1280 px, när komponenten tas in i biblioteket och när en sajt får formulär:

1. axe 0 fel i tomt läge och med felen framkallade (kontroll 8d).
2. Tomt skick: fokus på sammanfattningen, varje fält har `aria-invalid` och en beskrivning som syns, titeln börjar med "Fel:" (förslaget 8j i `kontroller.md`).
3. Tangentbordet hela vägen, Enter skickar, och statusbeskedet läses upp (namnet i tillgänglighetsträdet efter skick).
4. Autofyll i Chromium och WebKit fyller rätt fält.
5. Värstafallsdata ur `prov.md`: långt namn, lång e-post, emoji och 2 000 tecken i meddelandet.
6. Ett märkt testinskick hela vägen mot staging (→ `guide/2-8-teknik-och-kvalitet.md`, N2-tabellen). Workerns svar kommer inom cirka 500 ms 🔧 (Vercel, *Network latency budgets*; en källa).
