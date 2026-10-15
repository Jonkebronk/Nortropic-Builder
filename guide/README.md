# Nortropic-Builder – guiden

**Status:** v1.0, konsoliderad 2026-10-15. Ersätter implementeringsguiden v0.74 (`historik/IMPLEMENTERINGSGUIDE-v0.74.md`). Johnny läser igenom och rättar. **Genomläst 2026-10-15** i sin helhet: README, kundens väg, byggplanen, alla nio lagren, flödet, företaget och bilagorna (bilaga E avsnitt 1–2 avgjort utom det som väntar till den första riktiga kunden). Rättelserna står i `BESLUT.md`.

## Vad det här är

En autonom webbyrå för **otekniska småföretagare som betalar för hemsida och förvaltning så att de slipper tänka på det** (`BESLUT.md` 2026-10-13). Claude Code gör arbetet, Johnny är art director och beslutar. **Förvaltningen är produkten:** en sajt byggs en gång men förvaltas varje månad. Kvaliteten mäts i det kunden behöver – en seriös sajt som syns, gör det lätt att höra av sig och stämmer också om ett år.

Guiden beskriver hur byrån bygger och förvaltar en sajt, lager för lager, och hur flödet som gör arbetet är uppbyggt.

**Guiden bygger på kunskapen om hur man bygger och förvaltar webbplatser för kunder och användare** – etablerade metoder, teori och litteratur, normer och lagar, leverantörernas egen dokumentation och forskning. Johnnys utgångspunkt (`BESLUT.md` 2026-10-13): *"utifrån metoder, principer och litteratur, hur bygger man hemsidor och förvaltar de på bästa sätt för kunder och användare"*. Några exempel:

- **Hur en sajt är uppbyggd:** Jesse James Garretts fem plan och Brad Frosts *Atomic Design*.
- **Användbarhet:** Nielsen, Krug och Nielsen Norman Groups forskning; GOV.UK:s designsystem för formulär och tjänster.
- **Tillgänglighet:** WCAG 2.2 och EN 301 549.
- **Sökbarhet:** Googles Search Central och Core Web Vitals.
- **Förvaltning:** ITIL, SRE och DORA.
- **Lag:** tillgänglighetslagen, GDPR, lagen om elektronisk kommunikation och EU:s AI-förordning.

**Praktikernas erfarenhet prövas mot den grunden:** 74 videotranskript, två dokument och lärdomarna från webb-pro. En regel blir krav först när den har en norm eller två oberoende primärkällor (*Grind eller instruktion* nedan). Kartan som togs fram med Johnny 13–15 oktober ordnar allt efter hur en webbyrå arbetar, lager för lager.

## Målsättning

Johnnys skäl att börja om (`BESLUT.md` 2026-10-13): *"tiden det tar att bygga en hemsida är alldeles för lång och sen har vi fortfarande inte skapat en sida jag är nöjd med ännu"*. Projektet lyckas när byrån levererar:

1. **Sajter som Johnny anser är bra.** **Måttstocken** för vad som är bra är Johnnys, godkänd 2026-10-15 ur hans domar över 39 sajter (`mattstock/mattstock.md`). Den består av tre frågor: förstår och når kunden företaget på mobilens första skärm, är det äkta, håller utförandet. Den är grunden för granskarens kalibrering och för eval (`3-2-granskning-och-kalibrering.md`). Johnnys dom över varje sajt avgör fortfarande.
2. **Kunder som betalar för förvaltningen och stannar kvar** – förvaltningen är produkten (`4-foretaget.md`, `2-9-drift-och-forvaltning.md`).
3. **Rimlig tid per sajt** – men först när kvaliteten sitter: ingen tidsbudget förrän Johnny är nöjd med det som byggs. Tiden mäts bara som underlag (`1-kundens-vag.md`).

Kundens behov – en seriös sajt som syns, gör det lätt att höra av sig och stämmer också om ett år – är det måttstocken och kontrollerna ska svara mot.

## Innehåll

| Del | Fil |
|---|---|
| Läs först (den här filen) | `README.md` |
| N1 – det som gäller den första sajten (genererad) | `n1-forsta-sajten.md` |
| 1. Kundens väg | `1-kundens-vag.md` |
| 2. De nio lagren | |
| 2.1 Strategi | `2-1-strategi.md` |
| 2.2 Omfattning | `2-2-omfattning.md` |
| 2.3 Struktur | `2-3-struktur.md` |
| 2.4 Skelett | `2-4-skelett.md` |
| 2.5 Yta | `2-5-yta.md` |
| 2.6 Rörelse | `2-6-rorelse.md` |
| 2.7 Innehåll | `2-7-innehall.md` |
| 2.8 Teknik och kvalitet | `2-8-teknik-och-kvalitet.md` |
| 2.9 Drift och förvaltning | `2-9-drift-och-forvaltning.md` |
| 3. Flödet | |
| 3.1 Orkestrering och roller | `3-1-orkestrering-och-roller.md` |
| 3.2 Granskning och kalibrering | `3-2-granskning-och-kalibrering.md` |
| 3.3 Säkerhet och inställningar | `3-3-sakerhet-och-installningar.md` |
| 3.4 Lärande och underhåll | `3-4-larande-och-underhall.md` |
| 3.5 Live-visning | `3-5-live-visning.md` |
| 4. Företaget | `4-foretaget.md` |
| 5. Byggplanen | `5-byggplan.md` |
| Bilaga A – verktyg och kandidater | `bilaga-a-verktyg.md` |
| Bilaga B – egna skills | `bilaga-b-skills.md` |
| Bilaga C – kontrollregister | `bilaga-c-kontroller.md` |
| Bilaga D – fallgropar | `bilaga-d-fallgropar.md` |
| Bilaga E – öppna frågor | `bilaga-e-oppna-fragor.md` |
| Bilaga F – projektstruktur | `bilaga-f-projektstruktur.md` |

Lager 1–5 följer Jesse James Garretts fem plan i *The Elements of User Experience*; lager 6–9 är det en webbyrå också levererar. Lager 4 och 5 byggs enligt Brad Frosts *Atomic Design*: tokens, komponenter, sektioner, mallar och sidor. Varje lagerfil har samma fem rubriker: *vad byrån gör, vad som kommer ut, kompetens och källor, kontroll, hur självgående*.

## Besluten som styr

Johnnys beslut står ordagrant i `BESLUT.md` och väger tyngst. De som formar guiden:

- **Börja om i små steg** (2026-10-13).
- **Nisch och produkt:** otekniska småföretagare; förvaltningen är produkten (2026-10-13).
- **Kundens väg:** intervju, research, tre riktningar, kundens val, bygge, Johnnys granskning, lansering (2026-10-13).
- **Intervjun** tar fram underlaget med kunden – Johnny intervjuar tillsammans med sin AI (2026-10-13, preciserat 2026-10-15).
- **Två spår:** det finns inte alltid en befintlig sajt (2026-10-13).
- **Eget bibliotek** av skills, komponenter, teman och animationer, byggt ur en inventering (2026-10-13).
- **Förvaltningen ingår**, **Claude Design är inte designmotor**, **hosting på Cloudflare** (2026-10-14).
- **Flödet först; Stitch inom stilkit; Johnny ser riktningarna först, sedan kunden; vanlig flersidig sajt som standard** (2026-10-15).
- **Johnny tar fram måttstocken för vad som är bra; ingen tidsbudget förrän han är nöjd; Johnny intervjuar kunden tillsammans med AI** (2026-10-15).

Det som fortfarande är öppet står i `bilaga-e-oppna-fragor.md`.

## Principer

Claudes sammanfattning av källorna och lärdomarna, inte Johnnys beslut. Ursprungligen `historik/principer.md` (2026-10-13), här kompletterad med konsolideringens lärdomar.

1. **Synligt i varje steg.** Flödet byggs först, men varje steg slutar med något Johnny kan se och döma: en brief, ett stilkit, tre riktningar, en sajt i webbläsaren. Ett steg är klart när Johnny dömt resultatet, inte när kontrollerna går igenom. 🔧 (beslut 2026-10-15 + webb-pro)
2. **Vattnet, inte bara rören.** Kontroller av mekanik räcker inte. Måttet är Johnnys dom över sajten. Webb-pro hade många kontroller och domar som mätte golvet (kontrast, px) – två dagar senare kallade Johnny allt "generiskt" (`kunskap/research/2026-10-15_webb-pro-genomgang.md`).
3. **Loopen är enheten.** Varje steg är försök, kontroll och nästa drag: klart, nytt försök eller vidare till Johnny.
4. **Verifiering är den största hävstången.** Ge Claude ett sätt att kontrollera sitt arbete – mot en referens, med belägg utanför utkastet.
5. **Den som bygger dömer inte.** Generator och bedömare hålls isär; agenter bedömer sitt eget arbete för positivt (`3-1-orkestrering-och-roller.md`).
6. **Bedömaren kalibreras av Johnny** med exempel han själv har bedömt, och avgör bara de grova fallen (`3-2-granskning-och-kalibrering.md`).
7. **Full autonomi bara med entydigt mått** – fast budget, ett mått, behåll eller kasta. Autonomi förtjänas steg för steg: ett steg blir självgående när det har levererat några gånger i rad utan att Johnny behövt rätta (`historik/principer.md`).
8. **Börja enkelt.** Komplexa system som fungerar växer ur enkla system som har fungerat (Galls lag). Lägg bara till komplexitet när den mätbart förbättrar resultatet; varje ny mekanism ska kunna peka på den sajt som behövde den. Bara det som gjorts för hand tre gånger automatiseras.
9. **Agenten föreslår, Johnny beslutar, sedan låses det.** Det gäller arbetssätt, granskarkriterier, kontroller, `design.md` och `CLAUDE.md`.
10. **Johnnys ord blir inte mekanik på egen hand.** En kommentar blir regel först när Johnny sagt att den ska vara det, och då skrivs den ordagrant i `BESLUT.md`. Johnny skriver uppdragen med egna ord i stället för att välja i agenternas numrerade listor. (webb-pro: "detaljer, detaljer, detaljer" blev samma morgon en station och ett kriterium.)
11. **Liten kontext och tydlig mappstruktur.** Få men träffsäkra tokens, filer som hämtas när de behövs, anteckningar utanför kontexten, en karta i roten och en överlämning vid varje sessions slut (`LAGE.md`).
12. **Systemet ger konsekvens, kunden ger karaktären.** Sektionsbiblioteket och stilkiten byggs en gång med full designkompetens, så som de etablerade AI-byggarna (Wix ADI, Squarespace Blueprint, GoDaddys Go-tema) låter AI:n välja och fylla i ett system som designers byggt. **Det som gör sajten till kundens kommer från kundens egna bilder, ord och lokala belägg.** Stock- och AI-bilder är tillåtna men bär inte karaktären. Det som gör en sajt generisk är en första skärm som inte säger vad, var och hur, och innehåll som kunde höra till vem som helst (`mattstock/mattstock.md`, fråga 1 och 2; `BESLUT.md` 2026-10-15; `historik/principer.md`).

Källor för principerna: Anthropic – [Building effective agents](https://www.anthropic.com/research/building-effective-agents), [Effective context engineering for AI agents](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents), [Effective harnesses for long-running agents](https://www.anthropic.com/engineering/effective-harnesses-for-long-running-agents), [Harness design for long-running application development](https://www.anthropic.com/engineering/harness-design-long-running-apps); Boris Cherny – [InfoQ](https://infoq.com/news/2026/01/claude-code-creator-workflow/); Andrej Karpathy – [Software 3.0](https://www.latent.space/p/s3), [autoresearch](https://themenonlab.blog/blog/karpathy-autoresearch-autonomous-ml-experiments); Hamel Husain – [Using LLM-as-a-judge](https://hamel.dev/blog/posts/llm-judge/); [Ralph-loopen](https://shipyard.build/blog/claude-code-ralph-loop/); AI-byggarna [Wix ADI](https://www.fastcompany.com/3060934/can-you-teach-ai-to-design-wix-is-trying), [Squarespace Blueprint](https://ecomm.design/using-squarespace-blueprint-ai/), [GoDaddys Go-tema](https://github.com/godaddy-wordpress/go).

## Hur guiden läses

### Nivåer

Varje regel är märkt med när den behövs.

| Märke | Nivå | Betyder |
|---|---|---|
| `[N1]` | Första sajten | Behövs för att flödet ska ge en första sajt Johnny kan döma. |
| `[N2]` | Sajt 2–5 | När mönster syns och tillsynen minskar. |
| `[N3]` | Förvaltning | När det finns betalande kunder. |
| `[N4]` | Skala | Många sajter, obevakat. |

Läs N1 först – samlat i `n1-forsta-sajten.md`, som genereras ur märkningen med `python konsolidering/bygg_n1.py`. Allt annat väntar tills en verklig sajt behöver det (princip 8).

**Taket:** N1 har högst cirka 60 regler och högst tio automatiska kontroller. En ny N1-punkt kräver att en annan flyttas till N2. Den första sajten byggs interaktivt i huvudsessionen medan Johnny tittar (`5-byggplan.md`); bra hantverk som en kunnig byggare gör ändå står som N2 eller i skillens kunskap, inte som N1-regler.

### Grind eller instruktion

En regel är en **låst kontroll** eller en grind bara om den har en **norm** (WCAG, lag, leverantörens egen dokumentation, standard) **eller två oberoende primärkällor**. Allt annat är en **instruktion** eller ett **granskningskriterium** och märks *(en källa – bänken)*. Alla kontroller och deras grund står i `bilaga-c-kontroller.md`.

### Bänken

En regel med en källa står på bänken; den lyfts när en andra **oberoende primärkälla** bekräftar den. Bänken räknas **per primärkälla, inte per kanal**: två kanaler som återger samma person (Boris Cherny via AI LABS och via Nate Herk) eller samma metod (Jack Roberts *design loop* = gauntlet-loopen) är en källa. Två videor från samma kanal är en källa. Källäget: 44 av 74 transkript kommer från AI LABS (`kunskap/kallor.md`).

### Sett, härlett, okänt

Varje påstående om omvärlden märks: **sett** (läst i källan eller observerat), **härlett** (slutsats ur det sedda) eller **okänt**. Bara *sett* räknas som besvarat **fakta**. Ett *härlett* svar om fakta går till kunden, domaren eller Johnny och byggs aldrig på som fakta. Små *härledda* val som inte är fakta (till exempel ordningen på sektioner) går som antaganden och loggas.

### Källmärkning

🎥 video (kort namn; titel, datum och adress i `kunskap/kallor.md`) · 📄 dokument eller primärkälla (sökväg eller URL) · 🔧 eget förslag · ⚠️ overifierat. Juridiska läsningar är tolkningar, inte juridisk rådgivning.

## Var saker finns

| Fil eller mapp | Innehåll |
|---|---|
| `CLAUDE.md` | Arbetsregler för varje session |
| `LAGE.md` | Läget, nästa steg och det som väntar på Johnny; uppdateras vid varje sessions slut |
| `BESLUT.md` | Johnnys beslut, ordagrant |
| `guide/` | Den här guiden |
| `kunskap/kallor.md` | Källistan |
| `kunskap/raw/` | Videotranskript och dokumentsammanfattningar (bara internt underlag) |
| `kunskap/research/` | Researchrapporter med primärkällor |
| `inventering/` | Kompetensinventeringen: 72 delar ur webb-pro och 99 kandidater |
| `historik/` | Guiden v0.74, ändringsloggen, kartan och principerna före konsolideringen, webb-pros historik |
| `konsolidering/` | Skrivreglerna och spårbarheten för v1.0: var varje del av v0.74 tog vägen |

## Ändringar

- **v1.0 (2026-10-15):** konsoliderad ur v0.74 och kartan. Kartans nio lager blev ryggraden; varje regel bor på ett ställe och är märkt N1–N4; regler med en källa blev instruktioner; besluten 2026-10-15 är inarbetade (stilkit, flersidig sajt, riktningen, flödet först med synligt resultat i varje steg). Spårbarheten står i `konsolidering/sparbarhet/`.
- Ändringar före v1.0: `historik/guide-andringslogg.md`. Från v1.0 förs ändringar i git-historiken och kort här.
