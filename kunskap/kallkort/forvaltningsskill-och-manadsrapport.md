# Förvaltningsskill och månadsrapport

**Källa (lästa 2026-10-16 om inget annat anges):**
- Googles *Site Reliability Engineering* (sre.google/sre-book), kapitlen *Monitoring Distributed Systems*, *Postmortem Culture* och *Service Level Objectives*. *Eliminating Toil* är bara läst via anteckningarna.
- *The Site Reliability Workbook*, *Error Budget Policy*.
- DORA, *DORA's software delivery performance metrics* (sidan uppdaterad 2026-01-05) och *Streamlining change approval* (via anteckningarna).
- ITIL 4 Change Enablement via AWS whitepaper och ITSM.tools, och pm3 via offentliga adaptioner. Båda bara via anteckningarna för lager 9 (2026-10-13) ⚠️.
- InstaWP och ManageWP om förvaltningsrapporter (via anteckningarna).
- Övningssajtens rapport för oktober och ögonblicksbilden.

**Licens:**
- SRE-böckerna: CC BY-NC-ND 4.0. De får citeras och refereras med källa, men inte bearbetas och spridas. Vi skriver med egna ord.
- dora.dev: Apache-2.0.
- ITIL är PeopleCerts varumärke och upphovsrätt, och primärtexten är inte läst.
- pm3 ägs av På i Sverige AB, och modellbeskrivningen är kommersiell.

**Vad det är:** Ingen färdig skill eller kod, utan en metod: ändringstyper ur ITIL 4, förvaltningsobjekt och förvaltningsplan ur pm3, larm, tjänstenivåer, felbudget och efterhandsgranskning ur SRE, och fem mått ur DORA. Inventeringen säger att månadsrapporten måste byggas själva.

**Hur det fungerar:**
- **ITIL 4:**
  - Standardändringar är förhandsgodkända, med låg risk och upprepbara.
  - Normala ändringar kräver riskbedömning och godkännande.
  - Akuta ändringar är brådskande.
  - Godkännandet (*change authority*) kan vara en person eller en automatisk mekanism, och tilldelas efter risk.
- **SRE:**
  - De fyra signalerna är latens, trafik, fel och mättnad.
  - Larma på symptom. Varje larm ska gå att agera på.
  - Få tjänstenivåer, och ett internt mål som är strängare än det utlovade.
  - Felbudget: när budgeten är slut stoppas allt utom rättningar och säkerhetsfixar. En incident som tar mer än 20 % av budgeten kräver efterhandsgranskning.
  - Efterhandsgranskningen är skuldfri och granskas av någon annan.
- **DORA:**
  - Fem mått i två grupper. Genomflöde: change lead time, deployment frequency, failed deployment recovery time. Instabilitet: change fail rate, deployment rework rate.
  - Måtten gäller en tjänst i taget och ska inte bli mål.
  - Tunga externa godkännanden sänker inte andelen misslyckade ändringar.
- **pm3:** förvaltningsobjekt, objektägare (kunden), förvaltningsledare (Johnny) och en årlig förvaltningsplan.
- **Rapport:** översätt måtten till affärsutfall. Ta med drifttid, uppdateringar, säkerhet, ändringar och kontakter (InstaWP, ManageWP).

**Kvalitet och underhåll:**
- SRE-boken är från 2016 men grundläggande, och workbooken från 2018.
- DORA uppdateras årligen. Rapporten 2025 beskriver AI som en förstärkare.
- ITIL 4 är från 2019, med årliga praktikguider.
- Inga kända fel, men primärkällorna för ITIL och pm3 är olästa ⚠️.

**Det bästa vi kan ta:**
- Felbudgeten och utlösarna för efterhandsgranskning, anpassade till en enmansbyrå (`drift/overvakning.md`).
- DORA:s definitioner, med vårt tillägg ärende → produktion (`drift/rapport.md`).
- Ögonblicksbildens fält: schema, version som mättes, källa och hämtningstid per siffra.
- Kontrollen att varje siffra i texten finns i JSON-filen.
- Kunddelen och den interna delen i skilda filer (revisionen M3 och M4).

**Var det hamnar hos oss:**
- Skillen `drift`, hela skillen. I `guide/bilaga-b-skills.md` heter den `forvaltning`.
- Typerna, katalogen och rapportens form står redan i `guide/2-9-drift-och-forvaltning.md` och refereras.
- Beslut: **skill: drift**.

**Passar vår stack?** Ja, som metod. Det som måste översättas:
- SRE är skrivet för stora team med jour. Hos oss är det en person, och därför behövs en kontinuitetsplan (luckan 3).
- DORA:s ledtid börjar vid commit. Hos oss är kundens väntetid från ärende viktigare.

**Risker och flaggor:**
- SRE-textens licens förbjuder bearbetningar, så inga stycken kopieras.
- ITIL- och pm3-begreppen bygger på sekundärkällor.
- Felbudgeten är ett förslag med en källa, och därmed på bänken.

**Inloggning:**
- SRE-böckerna och DORA är fritt publika.
- ITIL 4:s praktikguider kräver köp eller PeopleCert-konto.
- pm3:s modellbeskrivning kräver beställning.
- Johnny behöver inte logga in någonstans. Köp är förslag i luckan 12.
