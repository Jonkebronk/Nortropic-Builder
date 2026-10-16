# Stanford Web Credibility Guidelines

**Källa:** B.J. Fogg, *Stanford Guidelines for Web Credibility*, Stanford Persuasive Technology Lab, https://credibility.stanford.edu/guidelines/ (sidan säger *"Updated June, 2002"* och *"Copyright © Stanford Persuasive Technology Lab, 2004"*). Läst i sin helhet 2026-10-16, både nedladdningen från andra varvet och sidan i dag: de tio riktlinjerna, kommentarerna och listan över de sex studierna. ⚠️ Studierna själva är inte lästa: länkarna går till `captology.stanford.edu`, som inte längre finns i DNS (NXDOMAIN 2026-10-16).
**Licens:** ingen licens; upphovsrätten gäller. Vi refererar och citerar kort med källa.

## Vad det är
Tio riktlinjer för hur en webbplats blir trovärdig, sammanfattade ur labbets forskning: *"based on three years of research that included over 4,500 people"*. Det är en forskningssammanfattning från 2002, inte en norm.

## Hur det fungerar
Varje riktlinje har en mening, en kommentar och hänvisningar till labbets studier:
1. Gör det lätt att kontrollera att uppgifterna stämmer: källor och länkar till belägg, *"Even if people don't follow these links, you've shown confidence in your material."*
2. Visa att en verklig organisation står bakom, enklast med en fysisk adress.
3. Lyft fram expertisen och meriterna; länka inte till sajter som inte är trovärdiga.
4. Visa att det finns ärliga, verkliga människor bakom sajten.
5. Gör det lätt att kontakta er: telefon, adress och e-post.
6. En design som ser professionell ut, eller passar syftet.
7. Lätt att använda och användbar.
8. *"Update your site's content often (at least show it's been reviewed recently)."*
9. Återhållsamhet med reklam och erbjudanden; skriv *"clear, direct, and sincere"*.
10. *"Avoid errors of all types, no matter how small they seem."* Stavfel och trasiga länkar skadar mer än man tror, och sajten ska vara uppe.

## Kvalitet och underhåll
- Utgivare: Stanford Persuasive Technology Lab. Föreslagen citering: Fogg, B.J. (maj 2002). Inte uppdaterad sedan juni 2002.
- Grunden är sex studier 1999–2002 och opublicerad forskning. En av dem, Stanford-Makovsky 2002, är enligt sidan själv *"not peer reviewed"*.
- Länkarna har förfallit. Forskningsrapporterna på `captology.stanford.edu` går inte att nå, `www.captology.org` skickar till `127.0.0.1`, och citeringsadressen `www.webcredibility.org/guidelines` skickar till en orelaterad domän (provat med `curl` 2026-10-16).
- Riktlinjerna är från webben före smarttelefonen. Principerna står sig: NN/g, [Trustworthiness in Web Design](https://www.nngroup.com/articles/trustworthy-design/) (Harley 2016), finner samma fyra faktorer som Nielsen 1999, bland dem *"Comprehensive, Correct, and Current"*. Detaljerna (reklam, popup-annonser) är mindre aktuella i dag.

## Det bästa vi kan ta
1. **Visa att sajten sköts (8).** Två oberoende källor nu: Stanford 8 och NN/g:s *"Current"*. Det räcker för ett granskningskriterium, inte för en låst kontroll, eftersom ingen norm finns (`guide/README.md`, *Grind eller instruktion*). Datumet sätts bara när uppgifterna faktiskt kontrollerats, och `dateModified` ändras bara när innehållet ändrats (→ `google-helpful-content.md`, punkt 1).
2. **Kontaktuppgifterna och adressen (2, 5)** står redan som N1-regel.
3. **Verkliga människor (4)** stöder Om-sidan med ägaren och kundens egna ord. Stanfords exempel med anställdas familj och fritid kräver samtycke och hör till intervjun, inte till gissningar.
4. **Inga fel (10)** stöder länkkontrollen (lychee) och språkgrinden, och att sajten övervakas.
5. **Återhållsamhet (9)** stöder regeln om inga popup-rutor vid ankomst (`guide/2-4-skelett.md`, N1).

## Var det hamnar hos oss
Placeringen **skill: innehall** (lager 7, även 3) är beslutad: fältet `beslut` säger *"Johnny 2026-10-16 omkring 17.40: 'Ja på alla'"*. Stanford citeras redan i `guide/2-3-struktur.md:38` (N1: telefon, adress och mejl på varje sida) och samma text i `guide/n1-forsta-sajten.md:51`, och i underlaget `kunskap/research/2026-10-15_kompetensluckor-anteckningar/lager-5-yta.md:306` och `:453`. Riktlinje 8 saknar regel (sökt i `guide/` och `.claude/skills/` 2026-10-16).

Förslag till Johnny: riktlinjerna hör till olika lager. 2, 4 och 5 till struktur (finns), 1, 3 och 4 till innehåll, 8 och 10 till drift (`guide/2-9-drift-och-forvaltning.md`, *Rapporten*), 9 till skelettet. Fältet `aven` blir då "3, 9". Riktlinje 8 är redan en fråga till Johnny i andra varvet (`andra-varvet/byggguider-jamforelse.md`, lucka 3).

## Passar vår stack?
Ja. Inget verktyg. Riktlinje 10 körs redan med lychee och Vale; riktlinje 8 blir en rad i texten och ett fält i faktabasen.

## Risker och flaggor
- **Krock med ett beslut:** riktlinje 1 och 3 talar för att länka till belägg och visa anknytning. Sajten nämner inte lagen för yrket och inte registret (`BESLUT.md` 2026-10-16, *Företagsuppgifter som praxis, inte mer*). Beslutet gäller; Stanford är en källa från 2002.
- **Länka inte till citeringsadressen** `www.webcredibility.org`; den går till en orelaterad domän. Använd `credibility.stanford.edu/guidelines/`.
- Ålder: forskningen är 24 år gammal. Används som stöd tillsammans med nyare källor, aldrig ensam för en kontroll.
- Licens, telemetri och betalvägg: inga problem.

## Inloggning
Inget.
