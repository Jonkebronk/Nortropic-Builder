# frontend-design

**Källa:** https://github.com/anthropics/skills, sökvägen `skills/frontend-design/`. Läst 2026-10-16 vid repots commit `dbd4588f9e10` (2026-10-09); senaste ändring i skillen är PR #1713 (2026-09-03, "Update frontend-design skill to avoid generic design defaults"). Repot har inga releaser. Lästa filer: `SKILL.md` (hela, 9,4 KB, skillens enda innehållsfil), `LICENSE.txt`, issues och PR:er som nämner skillen via GitHubs API.

**Licens:** Apache-2.0 (ur `skills/frontend-design/LICENSE.txt`; repot som helhet har ingen SPDX-licens i API:t). Kräver att licensen följer med vid vidarespridning och att ändringar märks. Vi destillerar med egna ord.

**Vad det är:** Anthropics korta skill för särpräglad visuell riktning. Den låter modellen spela designchef på en studio vars kunder redan avvisat mallartade förslag, planera en riktning i två varv och sedan bygga.

**Hur det fungerar:**
- **Ämnet först:** saknas ämne, publik och sidans uppgift föreslår modellen dem. Branschens material och språk är källan till särprägel. Första skärmen öppnar med det mest typiska i ämnets värld.
- **Typografi:** en eller två familjer, tydligt olika om två; medveten skala enligt *The Elements of Typographic Style*; radlängd under 80 tecken, serif lite längre och med mer radavstånd.
- **Tre typografiska standardgrepp att undvika:** ett enda ord framhävt i rubriken (kursiv, fet, annan färg), versaler i etiketter, onödiga etiketter ovanför innehåll.
- **Struktur är information:** linjer, numrering, överrader och avdelare ska bära innehåll. 01/02/03 bara när innehållet faktiskt är en följd.
- **Rörelse:** sparsam, ett samlat ögonblick i stället för fade-and-slide på varje sektion; rörelse som svar på användarens handling är välkommen.
- **Fem AI-kluster att kalibrera mot:** (1) krämvit bakgrund (~#F4F1EA) + kontrastrik serif + terrakotta (~#D97757, Anthropics egen accent); (2) nästan svart med en syragrön eller cinnoberröd accent; (3) tidningsuppslag med hårfina linjer, radie 0 och täta spalter; (4) SaaS-kortkitet: likadana rundade kort, en radie på allt, samma grå skugga `rgba(0,0,0,.1)`, gradienter som dekor; (5) mallkrom: spärrad VERSALÖVERRAD, metarader med mittpunkter "A · B · C", "ORD — fragment", tonad nästan-svart (#0B0B0B, #111) i stället för svart, monospace i små etiketter, "→" efter länk- och knapptext. Alla är legitima när briefen ber om dem.
- **Två varv:** först en kompakt plan (4–6 namngivna hexvärden, typsnitt och roller, layout i en mening plus ASCII-skiss, principer), sedan granskning mot briefen: liknar något standardsvaret ska det göras om, med motivering.
- **Återhållsamhet:** djärvhet på ett ställe; ta bort ett smycke före avfärd (Chanel). Kvalitetsgolv: responsivt, synligt tangentbordsfokus, reducerad rörelse, tillgängligt.
- **Text i design:** användarens ord, aktiv form, knappen säger vad som händer ("Spara ändringar"), samma ord genom flödet, fel förklarar och anger lösning utan att be om ursäkt, meningsversaler.

**Kvalitet och underhåll:**
- Repot: 181 487 stjärnor, 21 497 forkar, 1 423 öppna ärenden (hela repot), 16 bidragsgivare enligt API:t; push 2026-10-09. Skillen ändras sällan men medvetet.
- Kända problem och öppna förslag:
  - #1808: i ett litet test (7 briefar × 3 körningar) fick 10 av 21 sidor pillerformade knappar – ett standardgrepp skillen inte nämner.
  - #1561, #1663: skillen saknar vägledning för att arbeta *inom* ett befintligt designsystem – exakt vår situation med kit.
  - #210, #2026: förslag om tydligare, mer imperativ struktur.

**Det bästa vi kan ta:**
- Kalibreringslistan med de fem klustren (*Process*, punkt 1–5) – som igenkänning när kit tas fram, så att tre kit inte blir samma kluster.
- Tvåvarvsplanen (4–6 namngivna hex, roller, layoutskiss, principer) som format för en kitbrief, och granskningen "skulle jag hamna här för vilken liknande brief som helst?".
- Regeln *struktur är information* (numrering bara för verkliga följder).
- Textavsnittet (*More on writing in design*) – knappar som namnger handlingen, felmeddelanden, meningsversaler.
- Varningen om CSS-specificitet mellan sektions- och elementklasser – relevant för vårt bibliotek.

**Var det hamnar hos oss:**
- `.claude/skills/yta/generiskt.md`: de fem klustren som igenkänning, uttryckligen *inte* som förbud – två av dem liknar kit Johnny godkänt.
- Kitframtagningen (2-5, *Spridd idégenerering*): skillen är redan utpekad som en av perspektivkällorna, en stil per agent. Den laddas aldrig av byggaren.
- Textreglerna hör till lager 7 (2-7-innehall), inte ytan.

**Passar vår stack?**
- Helt ramverksoberoende text, noll JavaScript. Fungerar lika i Astro, med eller utan React och Tailwind (tillåtna sedan BESLUT 2026-10-16).
- Rörelseregeln (ett ögonblick, inte fade på varje sektion) stämmer med sparsam rörelse och med "ingen text som börjar osynlig".
- Inget behöver översättas tekniskt; däremot måste "avvisa allt som liknar standardsvaret" översättas till vår regel att kiten varierar ytan men inte konventionen.

**Risker och flaggor:**
- Licens: ingen risk. Ingen telemetri, ingen betalvägg, ingen inloggning.
- **Krockar med Nortropic (vi vinner):**
  - Förbudet mot versaler i etiketter krockar med 2-5: "Versaler bara där kitet anger det, då med 5–12 % spärrning; ett allmänt förbud har en källa."
  - Förbudet mot ett framhävt ord i rubriken krockar med kitet Varm och välkomnande, där Johnny lyfte "den handskrivna accenten".
  - Kluster 1 (krämvit + serif + terrakotta/orange) liknar Varm (grön/beige) och Djärv (orange/serif-identiteten). Johnny godkände dem – AI-utseende i sig är inget fynd.
  - Grundhållningen "ta estetisk risk, bli inte förväxlad" krockar med att besökare föredrar välbekanta sidor (2-5 [N2]); hos oss bor risken i kitet, inte i varje sida.
- Krockar med andra skills: soft-skill kräver pillerknappar med pilikon i egen cirkel (frontend-design-kluster 5: "→" efter knapptext); impeccable och taste delar listan men går längre (absoluta förbud).
