# Principer

Hur flödet byggs, sammanställt 2026-10-13 ur källorna längst ned. Det här är Claudes sammanfattning, inte Johnnys beslut. Johnnys beslut står i `BESLUT.md`.

## Vad de bästa AI-byggarna gör

De etablerade byggarna låter AI:n välja och fylla i ett system som designers har byggt, i stället för att uppfinna designen:

- **Wix ADI** blandade stilpaket som designers tagit fram per yrke med fasta layoutregler. Företagets uppgifter och omdömen hämtades bland annat från Google.
- **Squarespace Blueprint** låter kunden välja en personlighet och sedan bara bland färdiga paletter och typsnittspar.
- **GoDaddys öppna Go-tema** har fem designstilar. Var och en är en fil med variabler över samma komponenter, och CoBlocks är sektionsbiblioteket.
- **Svagheten går igen:** guiderna säger att AI-texten och bilderna måste ses över eller bytas ut, annars blir sajten generisk.

För Nortropic betyder det ett sektionsbibliotek och 3–5 stilkit som byggs en gång med full designkompetens. Det specifika kommer från kundens egna bilder, ord och lokala belägg.

## Sex principer för flödet

1. **Loopen är enheten.** Varje steg är försök, kontroll och nästa drag: klart, nytt försök eller vidare till Johnny.
2. **Verifiering är den största hävstången.** Ge Claude ett sätt att kontrollera sitt arbete. Enligt InfoQ:s återgivning av Boris Cherny blir slutkvaliteten två till tre gånger bättre.
3. **Den som bygger dömer inte.** Generator och bedömare hålls isär, eftersom agenter bedömer sitt eget arbete för positivt.
4. **Bedömaren kalibreras av Johnny,** med exempel han själv har bedömt. I Anthropics försök hittade Claude fel och pratade sedan sig själv till att godkänna dem.
5. **Full autonomi bara med entydigt mått.** Fast budget, ett mått, behåll eller kasta, som i Karpathys autoresearch.
6. **Liten kontext och tydlig mappstruktur.** Få men träffsäkra tokens, filer som hämtas när de behövs, anteckningar utanför kontexten, en karta i roten och en överlämning vid varje sessions slut.

Över allt: börja enkelt, och lägg bara till komplexitet när den mätbart förbättrar resultatet.

## Ordningen (Claudes förslag, 2026-10-13)

Först en sajt Johnny är stolt över, sedan byrån och sist maskinen. Johnny är art director från första minuten, inte bara domare i slutet. Autonomi förtjänas steg för steg: ett steg blir självgående när det har levererat några gånger i rad utan att Johnny behövt rätta.

## Arbetsregler (Claudes förslag, 2026-10-13, inte beslutade)

- Framsteg mäts i sajter Johnny är nöjd med, inte i commits.
- Varje ny mekanism ska kunna peka på den sajt som behövde den.
- Johnny skriver uppdragen själv, korta och med egna ord, i stället för att välja i agenternas listor.
- Bara det som gjorts för hand tre gånger automatiseras.

## Källor

- Anthropic: [Building effective agents](https://www.anthropic.com/research/building-effective-agents), [Effective context engineering for AI agents](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents), [Effective harnesses for long-running agents](https://www.anthropic.com/engineering/effective-harnesses-for-long-running-agents), [Harness design for long-running application development](https://www.anthropic.com/engineering/harness-design-long-running-apps)
- Boris Cherny: [InfoQ om hans arbetsflöde](https://infoq.com/news/2026/01/claude-code-creator-workflow/), [YouMind om loop engineering](https://youmind.com/landing/x-viral-articles/claude-code-loop-engineering-guide)
- Andrej Karpathy: [Software 3.0 (Latent Space)](https://www.latent.space/p/s3), [The Decoder om agentkodning 2026](https://the-decoder.com/former-tesla-ai-chief-andrej-karpathy-now-codes-mostly-in-english-just-three-months-after-calling-ai-agents-useless/), [autoresearch](https://themenonlab.blog/blog/karpathy-autoresearch-autonomous-ml-experiments)
- Jake Van Clief: [Clief Notes](https://aifunnelinsider.com/clief-notes-review-2026/), [sammanfattning av mappsystemet](https://videohighlight.com/v/KPVaUuBkPz8)
- [Ralph-loopen (Shipyard)](https://shipyard.build/blog/claude-code-ralph-loop/)
- Hamel Husain: [Using LLM-as-a-judge](https://hamel.dev/blog/posts/llm-judge/)
- AI-byggarna: [Fast Company om Wix ADI](https://www.fastcompany.com/3060934/can-you-teach-ai-to-design-wix-is-trying), [guide till Squarespace Blueprint](https://ecomm.design/using-squarespace-blueprint-ai/), [GoDaddys Go-tema](https://github.com/godaddy-wordpress/go), [ThemeIsle om 10Web](https://themeisle.com/blog/10web-ai-builder-review/)
