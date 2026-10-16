# Screaming Frog

- **Källa:** Screaming Frog, [SEO Spider: priser](https://www.screamingfrog.co.uk/seo-spider/pricing/), läst 2026-10-16; handledningarna [How To Audit Redirects In A Site Migration](https://www.screamingfrog.co.uk/seo-spider/tutorials/audit-redirects/), [How To Use List Mode](https://www.screamingfrog.co.uk/seo-spider/tutorials/how-to-use-list-mode/) och [How To Use The SEO Spider In A Site Migration](https://www.screamingfrog.co.uk/seo-spider/tutorials/how-to-use-the-seo-spider-in-a-site-migration/), sammanfattade ur en webbsökning 2026-10-16 (⚠️ inte lästa sida för sida; handledningarna är ett till fem år gamla och menyerna kan ha flyttat).
- **Licens:** kommersiell, sluten kod. Gratisversionen crawlar upp till 500 adresser; licensen kostar 245 euro per år och licens (prissidan 2026-10-16).
- **Vad det är:** ett skrivbordsprogram för Mac, Windows och Linux som crawlar en sajt som en sökmotor och visar statuskoder, omdirigeringar, titlar, rubriker, klickdjup och interna länkar.
- **Hur det fungerar:** i listläget laddar man upp en lista med adresser i stället för att crawla. Med *Always Follow Redirects* följer programmet varje omdirigering till slutmålet och rapporterar antal steg, slingor och tillfälliga omdirigeringar i kedjan. Exporten *All Redirects* har varje uppladdad adress och dess svar. Leverantören råder att kontrollera för hand att varje slutmål är rätt sida.
- **Kvalitet och underhåll:** branschstandard sedan länge. Inget öppet ärendesystem att läsa.
- **Det bästa vi kan ta:** listläget mot den publicerade sajten med den gamla adresslistan, som andra kontroll efter `kontrollera_omdirigeringar.py`: det prövar de verkliga svaren hos Cloudflare, också 307 vid snedstreck och `www`.
- **Var det hamnar hos oss:** manuellt verktyg vid den första riktiga flytten, beskrivet i skillen `omfattning`, `verktyg.md` och `flyttregler.md`. Inte i N1.
- **Passar vår stack?** Ja för småsajter: 500 adresser räcker för de flesta. Det är ett grafiskt program som Johnny kör, inte något agenten kör.
- **Risker och flaggor:** ⚠️ prissidans tabell gick inte att läsa säkert, så det är oklart vilka funktioner gratisversionen saknar utöver gränsen på 500 adresser. Sluten kod; ingen data skickas enligt det som lästs (⚠️ inte kontrollerat).
- **Inloggning:** nej för gratisversionen. Licensen köps med konto.
