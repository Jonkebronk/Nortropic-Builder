# Referenser till skelettet

Referenser används när biblioteket och stilkiten tas fram, inte vid varje kundbygge (→ `guide/2-4-skelett.md`, *Vad byrån gör*; `guide/2-5-yta.md`). Johnny strök referens- och kodregeln 2026-10-16: design, layout, struktur, palett, typsnitt och idéer får tas fritt. Lagen gäller ändå, så andra företags texter, bilder, logotyper och kännetecken kopieras inte, och inte kod utan licens (`BESLUT.md` 2026-10-16, Claudes anmärkning; ⚖️ tolkning, inte juridisk rådgivning). Referensen namnges i kitets `design.md`.

Metoden är destillerad ur Referos `refero-design` ([referodesign/refero_skill](https://github.com/referodesign/refero_skill), MIT, v1.0.3). Skillen installeras inte: den kallar sig "Primary/default skill" och skulle konkurrera med lagerskillsen (`guide/3-3-sakerhet-och-installningar.md`). *(en källa – bänken, utom där annat anges)*

## Research före layout

- **Djupet följer risken.** En liten förbättring: två till tre referenser. En ny sektion eller variant: tre till fem referenser och skärmar för just den sektionen.
- **Tre lager:** stil (riktningen), skärmar (konkreta sektioner) och flöden (vägen från sökning till handling – hör till skillen `struktur`).
- **Förebilderna i måttstocken först** (`mattstock/mattstock.md`), eftersom Johnny har dömt dem.

## Referenslås

Innan en sektion eller variant byggs skrivs ett lås med sju fält:

| Fält | Innehåll |
|---|---|
| Huvudreferens | En dominerande riktning |
| Bevara | Tre till fem drag som ska överleva bygget |
| Låna bara | En till två smala detaljer ur andra referenser |
| Rollregler | Till exempel: accenten bara på handlingar (→ `guide/2-5-yta.md`, G3) |
| Bilder | Vilka bilder platsen kräver och vad som görs om de saknas – platsen behålls med fast bildförhållande |
| Avvisat | Standardval och genomsnitt som skulle slå sönder riktningen |
| Tokens | Vilka kittokens riktningen binder sig till |

**Inget genomsnitt.** Flera referenser får inte slätas ut till en säker mitt: välj en riktning och låna smalt. Signaturdragen mjukas inte upp till säkrare färger, radier eller typsnitt.

## Beslutslogg

Varje större val i en sektion eller variant har en rad: *beslut, källa, regel eller roll i källan, varför*. Ett val utan källa byggs inte – det forskas vidare om, knyts till briefen eller stryks. Loggen hör till kitets `design.md` eller bibliotekets anteckningar och visas för Johnny med provsidan.

## Konvention mot särprägel

Referos regel "undvik generisk hero → funktioner → pris → vanliga frågor → avslut" står mot Jakobs lag: besökare vill att en sajt fungerar som de andra de känner (NN/g, [Jakob's Law](https://www.nngroup.com/videos/jakobs-law-internet-ux/), 2017). För en lokal tjänst är en konventionell ordning ofta rätt, och mallarnas standardordning gäller (→ `guide/2-4-skelett.md`, *Mallarna*). Läs Referos regel som *inte utan skäl i beslutsloggen*. Karaktären kommer från kitet och kundens egna bilder och ord, inte från en ovanlig sektionsordning (→ `guide/2-4-skelett.md`, *Vad byrån gör*).

## Mäta en referens

När en referenssajts layout studeras skiljer vi på tre nivåer *(Krehel, `explain-interface`, MIT)*:

- **Mätt:** avläst i webbläsaren och reproducerbart (beräknade värden i en viss bredd och ett visst tillstånd).
- **Härlett:** uträknat ur mätningar (till exempel en skala ur tre avstånd).
- **Tolkat:** en bedömning av avsikt, aldrig fakta.

Detta motsvarar guidens *sett, härlett, okänt* (→ `guide/README.md`). Mät i 375 och 1280 px med Playwright; påstå inget om bredder och tillstånd som inte besöktes.

## Kataloger som kräver konto

| Katalog | Ger | Kräver |
|---|---|---|
| Mobbin MCP | Sektioner (`search_sections`: hero, pris, sidfot) och flöden från riktiga sajter och appar | Betald plan (Pro från 10 USD i månaden vid årsbetalning) |
| Refero MCP | Stilar, skärmar och flöden | Betald plan (Pro, Team eller Lifetime), 8 000 anrop i månaden |
| 21st.dev | Marknadsföringsblock att jämföra varianter mot | API-nyckel för koden; sökning och förhandsvisning är publika |

Ingen av katalogerna är prövad mot svenska småföretagsbranscher ⚠️. Johnny avgör om något konto skaffas.
