# Flödet: lagret ovanpå

**Status:** utkast ur rapporten, inte genomgånget med Johnny. Principerna står i `principer.md`.

## Vad flödet är

Hur agenterna arbetar sig igenom lagren: loopar, verifiering, bedömning, kontext och lärande över tid.

## Delarna

- **Loopen.** Varje steg är försök och kontroll, följt av klart, nytt försök eller eskalering. Nivå 1 är en Stop-hook som kör bygge, Playwright, axe och Lighthouse; hook-skriptet räknar varven och lämnar över till Johnny efter ett tak. Nivå 2, för designsteg, är en granskare i ren kontext.
- **Tillståndet i filer.** En funktionslista där bara fältet `passes` får ändras, en progressfil för överlämning och en commit per lyckat varv, enligt Anthropics mönster för långkörande agenter. Generatorn får inte skriva i kriterie- och evalfiler.
- **Den kalibrerade bedömaren.** En domare per kriterium, med godkänt eller underkänt och skriftlig kritik, parvisa jämförelser med bytt ordning och skärmbilder i minst tre storlekar. Den kalibreras på 30–40 skärmdumpar som Johnny har bedömt: 10–20 procent blir exempel, och på resten mäts andelen rätt godkända och rätt underkända. Bedömaren fattar de grova besluten, och finjusteringen stannar hos Johnny.
- **Lärande.** Varje ändring av en skill körs med skill-creator mot en baslinje utan skillen. Full autonomi bara där måttet är entydigt, i autoresearch-läge.
- **Kontext.** En kort CLAUDE.md, en karta i roten, en lägesfil för överlämning och skills som bara laddas när de behövs. `/skill-doctor` körs innan nya skills läggs till.
- **Bevakning.** Sex källor: claude-plugins-official, anthropics/skills, Claude Code-dokumentationen, Anthropics engineering-blogg, Simon Willisons guide och awesome-claude-code. Intagsregel: officiellt eller över tröskeln, licens utan copyleft i levererad kod, ingen överlappning med en befintlig skill, och "ta in" kräver uppmätt förbättring.

## Förankring

Anthropic om agenter, harnesses, kontext och evals, Zheng m.fl. 2023 och senare forskning om LLM-domare, Husain om kalibrering, Karpathys autoresearch, Design Science Research (Hevner, Peffers) och DORA 2025.

## Öppet

- LLM-domare ligger nära slumpen när skillnaderna är subtila, så bedömaren avgör bara de grova fallen.
- Ingen studie mäter domare mot människor för småföretagssajters design.

## Underlag

Rapporten, avsnittet Flödet, `kunskap/research/2026-10-15_kompetensluckor-anteckningar/flodet-loopar-bedomare.md` och inventeringen, Flödet.
