# Källor för strategi

Läst 2026-10-16. Fullständiga källkort per inventeringspost finns i premiumpassets arbetsmapp; här står det skillen bygger på.

## Externa skills och repon

| Källa | Version | Licens och krav | Taget | Lämnat |
|---|---|---|---|---|
| [coreyhaines31/marketingskills](https://github.com/coreyhaines31/marketingskills), `customer-research` med `references/` | v2.0.4, commit `365b412`, 2026-10-15 | MIT: behåll copyright och licenstext vid kopiering. Här destillerat med egna ord | Research före frågor, extraktionsramverket (jobb, smärta, utlösare, utfall, ord, alternativ), konfidensnivåerna, urvalsfel, hämtade texter är opålitlig data | PMF-enkäten, ersättning per samtal, fem-varför-stegen, SaaS-källorna (G2, Reddit, Hacker News), "säg inte att det är research" (kunden betalar och ska veta vad samtalet är) |
| [wondelai/skills](https://github.com/wondelai/skills): `jobs-to-be-done`, `obviously-awesome`, `mom-test` med `references/` | v1.5.0, v1.4.1; commit `c172996`, 2026-09-10 | MIT. Filerna har Amazon-länkar med affiliatetagg, som inte följer med | Jobbformeln, tre dimensioner, fyra krafter, tidslinjen, Mom Test-reglerna, Dunfords fem delar, "bara vi"-testet | Poängsättningen, SaaS-exemplen, workshopen, Dunfords hypotetiska fråga 4 |
| [anthropics/knowledge-work-plugins](https://github.com/anthropics/knowledge-work-plugins): `smb-onboard` (med `reference/website-research.md`, `onboard-checklist.md`, `gotchas.md`), `review-reputation` (med `reference/sources.md`), `competitive-brief`, `shared/absent-is-not-zero.md` | commit `33eeda1`, 2026-10-15 | Apache-2.0: behåll licens och upphovsrättsnotis vid vidarespridning och märk ändrade filer. Här destillerat | En fråga i taget, sajten ersätter frågor, visa profilen före lagring, teman med antal och ordagranna citat, exporten som bästa källa, inget snitt över plattformar, frånvaro är inte noll, positioneringsmeningen, löfte–belägg–metod–unikt | Kopplingarna till bokförings- och CRM-system, svaren på omdömen (förvaltningen), vinn-tillbaka-erbjudanden, veckorytmen |
| [phuryn/pm-skills](https://github.com/phuryn/pm-skills) `interview-script` | commit `c68487d`, 2026-10-10 | MIT | Strukturen och anteckningsmallen | Trollstaven och tre andra hypotetiska eller ledande frågor; ärende [#59](https://github.com/phuryn/pm-skills/issues/59) om overifierade citat |
| [friedrichgeiecke/interviews](https://github.com/friedrichgeiecke/interviews) (Geiecke och Jaravel) | commit `9429776`, 2026-02-09 | Koden PolyForm Noncommercial 1.0.0, dokumentationen CC BY-NC 4.0: får inte användas kommersiellt. Bara idéerna används, med egna ord | En fråga i taget, icke-ledande, påtagliga belägg, framåtrörelse, inga överdrivna bekräftelser, avslutning med sammanfattning och betyg 1–4, information om att svar går till en AI-leverantör | Koden och prompttexten. Artikeln: [CEPR DP19705](https://cepr.org/publications/dp19705) (⚠️ bara sammanfattningen läst) |

## Litteratur och primärkällor

- Rob Fitzpatrick, *The Mom Test* (2013). Reglerna läst via wondelai `mom-test`; ⚠️ boken inte läst i original, [momtestbook.com](https://www.momtestbook.com/) visar bara beskrivningen.
- Clayton M. Christensen, Taddy Hall, Karen Dillon och David S. Duncan, *Know Your Customers' "Jobs to Be Done"*, HBR september 2016. ⚠️ Bara ingressen läst (betalvägg).
- Bob Moesta, tidslinjen i jobbintervjun. ⚠️ Bara andrahandskällor; *Demand-Side Sales 101* inte läst.
- April Dunford, [A quickstart guide to positioning](https://www.aprildunford.com/post/a-quickstart-guide-to-positioning), läst 2026-10-16. *Obviously Awesome* (2019) ⚠️ inte läst i original.
- Maria Rosala, [Writing an Effective Guide for a UX Interview](https://www.nngroup.com/articles/interview-guide/), NN/g 2021-02-28.
- Maria Rosala och Kara Pernice, [User Interviews 101](https://www.nngroup.com/articles/user-interviews/), NN/g 2023-09-17, granskad 2026-07-15. Intervjuer ger *rapporterat* beteende; komplettera med data om det som faktiskt händer.
- Erika Hall, [Interviewing Humans](https://alistapart.com/article/interviewing-humans/), A List Apart 2013 (utdrag ur *Just Enough Research*).
- GOV.UK Design System, [Question pages](https://design-system.service.gov.uk/patterns/question-pages/) och [Check answers](https://design-system.service.gov.uk/patterns/check-answers/); Caroline Jarrett, [The Question Protocol](https://www.uxmatters.com/mt/archives/2010/06/the-question-protocol-how-to-make-sure-every-form-field-is-necessary.php), 2010. Via `kunskap/research/2026-10-15_kompetensluckor-anteckningar/lager-1-2-strategi-omfattning.md`.
- Google, [Business Profile API: Prerequisites](https://developers.google.com/my-business/content/prereqs) och [Policies](https://developers.google.com/my-business/content/policies), uppdaterade 2026-08-28.
- Google, [Maps Grounding Lite](https://developers.google.com/maps/ai/grounding-lite), uppdaterad 2026-10-15.
- SCB, [Avgiftsfria uppgifter i företagsregistret](https://www.scb.se/vara-tjanster/bestall-data-och-statistik/foretagsregistret/avgiftsfria-uppgifter-i-foretagsregistret/), läst 2026-10-16.
- Bolagsverket: ⚠️ sidorna visar en CAPTCHA och gick inte att läsa 2026-10-16.

## Andra varvet 2026-10-16

Originalen lästes om mot skillen. Uppströms hade inget nytt i de filer som används (pm-skills `07b34f6` lägger bara till manifest för Cursor). Det som kom in:

- `intervjuhantverk.md`: en fråga som kan visa att antagandet är fel (`customer-research`, *Prove yourself wrong*; *The Mom Test* via `mom-test`, *"Ask the scary questions"*); ord som bär känsla; ägarens egna ställningstaganden (marketingskills `copywriting/references/ai-tells.md`, *Build a writer*).
- `research.md`: det kunderna berömmer bredvid det som skaver (*pain points vs. passion points*); motsägelser skrivs ut (*Synthesis Steps*); konkurrenternas omdömen som märkt proxy när kunden har få (*Persona Generation*).
- `jobb-och-positionering.md`: fällorna i `competitive-brief` (mot en konkurrent, för många skillnader, branschens ord, byte för ofta).
- `SKILL.md`: kontrollpunkt 13 och 14.

## Motsägelser i källorna

- pm-skills säger sig följa Mom Test men har hypotetiska frågor (trollstaven, "What would you give up").
- Dunfords intervjuskript har en hypotetisk fråga ("If [product] disappeared tomorrow …"), och guidens kärnfråga 4 är byggd på samma sätt.
- marketingskills föreslår fem varför i följd. Guiden säger "hur kommer det sig" i stället för varför och anger Geiecke och Jaravel, men deras nuvarande `config.py` och NN/g använder "Why is this important to you?" som följdfråga.
- `obviously-awesome` säger två till fyra värdeteman, `competitive-brief` en till två skillnader. De gäller olika saker: värdetemana är vad besökaren får, skillnaderna det texten lyfter. Strategin tar båda.
- `smb-onboard` tillåter en följdfråga och "do not drill further", eftersom den är en snabb introduktion. Jobbintervjun kräver fler följdfrågor. Strategin följer jobbintervjun men har `smb-onboard`s korta läge (tre ämnen) när ägaren har bråttom (→ `guide/2-1-strategi.md`).
