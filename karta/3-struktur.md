# Lager 3: Struktur

**Status:** genomgånget med Johnny 2026-10-13.

## Vad byrån gör

Ordnar sidorna i en hierarki, bestämmer menyn och sidfoten och namnger sidorna med besökarnas ord. Planerar besökarens vägar, till exempel från en sökning på Google till rätt tjänstesida och vidare till kontakt, så att varje sida slutar med ett tydligt nästa steg.

## Vad som kommer ut

En sidkarta med adresser, menyns innehåll och ordning, och två till fyra nyckelresor. Exempel: en privatperson i Boden söker på trädfällning, hittar tjänstesidan och begär offert.

## Lokal synlighet

En sida per tjänst, tydliga adresser på svenska och interna länkar mellan sidorna. Ortssidor görs bara när de har eget innehåll, annars räknas de som dörrsidor enligt Googles spampolicy. Strukturerad data för LocalBusiness använder den mest specifika typen. FAQ-schema visas inte längre som rich result sedan juni 2026.

## Kompetens

- **Egen skill:** strukturskillen, med marketingskills `site-architecture` som skelett. Tre regler rättas mot primärkällor: tre-klicksregeln saknar belägg (NN/g), brödsmulor ska visa en typisk väg och inte spegla adressen (Google), och mobilmenyn visar högst fyra länkar (NN/g) i stället för 4–7.
- **Eget bibliotek:** mönster för meny, sidfot och adresser, och branschmallarnas sidkartor.
- **Åtkomst vid kundbygget:** sökdata från Google Business Profile och Search Console.
- **Förankring:** Rosenfeld, Morville och Arango (*Information Architecture*), Steve Krug (*Don't Make Me Think*, trunk test), Google Search Central (spampolicy, brödsmulor, LocalBusiness och URL-struktur) och NN/g om trädtest.

## Kontroll

- Nyckelresorna körs automatiskt i webbläsaren med Playwright.
- Varje sida nås från startsidan eller menyn med högst två klick. Det är en egenskap hos platta småföretagssajter, ingen allmän regel.
- En AI kör ett trädtest som rök-test: trädet som text, 6–10 uppgifter i kundens ord och minst fem körningar med slumpad ordning. Den flaggar problem men validerar aldrig, eftersom AI löser sådana uppgifter mycket oftare än människor (MeasuringU).
- Ett mänskligt trädtest görs per branschmall, inte per kund.

## Autonomi

Helt självgående. Strukturen följer kända mönster och kontrolleras automatiskt. Kunden ser strukturen i riktningarna och behöver inte godkänna en separat sidkarta.

## Underlag

Rapporten, lager 3, `kunskap/research/2026-10-15_kompetensluckor-anteckningar/lager-3-4-struktur-skelett.md` och inventeringen, lager 3.
