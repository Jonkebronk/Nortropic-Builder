# Röst, ton och budskap

Delfil till `innehall`. Regeln om röstprofilen står i `guide/2-7-innehall.md`, *Röstprofil `rost.md`* (N2), och regeln om kort text i företagets röst är N1 (→ 2-7, *Texterna*; `BESLUT.md` 2026-10-15, *Innehållslagret*). Här står vad profilen ska innehålla och hur den används.

## Röst och ton

- **Rösten ligger fast, tonen följer läget.** Rösten är företagets personlighet; tonen skruvas efter vad besökaren är med om. 📄 NN/g, [The Four Dimensions of Tone of Voice](https://www.nngroup.com/articles/tone-of-voice-dimensions/) (Moran 2016); Anthropics `brand-review` (Apache-2.0), *Tone Spectrum*
- **Tonen följer insatsen:** varm och gärna lätt i tack och tomma lägen, neutral i rutin och inställningar, lugn och rak utan skämt i fel och vid något som inte går att ångra, allvarlig vid hälsa, pengar och säkerhet. 📄 better-writing (Jakub Krehel, MIT), *Tone by stakes*
- **Mikrotexten följer en röst, löptexten kundens.** Löptexten får låta som ägaren, med *vi* eller *jag*. Knappar, fel och kvitton tilltalar besökaren med *du* och skyller aldrig på henne. 📄 better-writing, *Address*; marketingskills `copywriting/SKILL.md`, *Diagnose*
- **Svenska läsare** möter understatement bättre än superlativ. *(En källa – bänken: claude-humanizer-svenska, saknar licens, läst. Ingen svensk primärkälla hittades ⚠️.)*

## Profilen `sites/<namn>/rost.md`

Byggs ur intervjun, kundens gamla texter och omdömena, aldrig ur branschresearch (→ 2-7, *Faktabasen*).

1. **Placering på NN/g:s fyra dimensioner,** med en mening om varför: formell–vardaglig, allvarlig–skämtsam, respektfull–respektlös, saklig–entusiastisk. I NN/g:s test med 100 amerikanska användare och texter från försäkring, bank, hemlarm och sjukhus fungerade en vardaglig, samtalsmässig och måttligt entusiastisk ton bäst, och upplevd pålitlighet förutsade rekommendation starkare än vänlighet. En helt allvarlig ton fungerade ändå för bank. 📄 NN/g, [The Impact of Tone of Voice on Users' Brand Perception](https://www.nngroup.com/articles/tone-voice-users/) (Moran 2016)
2. **Tre till fem attribut med fyra fält var:**
   - *Vi är*: vad attributet betyder i praktiken.
   - *Vi är inte*: den vanliga feltolkningen, till exempel *lugn, inte långsam*.
   - *Låter så här*: en mening i kundens stil.
   - *Låter inte så här*: en mening som bryter mot attributet.
   📄 `brand-review`, *Brand Voice Documentation Framework*; brand (Next Level Builder, MIT), `references/voice-framework.md`
3. **Ordlistan:** kundens egna ord för jobbet, besvären och kunderna, och ord som undviks med skäl, till exempel *patient* eller *kund*, *behandling* eller *session*. 📄 brand, *Prohibited Terms* (Avoid, Reason); marketingskills `customer-research/SKILL.md`, *Language and Vocabulary*
4. **Citatbanken:** ordagranna citat ur intervjun och omdömena, med källa, datum och konfidens: *hög* med tre eller fler oberoende källor, *medel* med två, *låg* med en. Parafraser är inte citat. Omdömen på sajten följer 2-7 (ordagrant, plattform och datum, namn bara med samtycke). 📄 marketingskills `customer-research/SKILL.md`, *Extraction Framework*, *Confidence*
5. **Budskapen:** ett huvudbudskap i en mening och tre till fem stödbudskap, vart och ett med sitt belägg i `fakta.md`. Ett budskap utan belägg är en fråga till kunden. 📄 brand, `references/messaging-framework.md` (*Proof Points*); marketingskills `copywriting/SKILL.md`, *Claims Must Be Supportable*
6. **Tonen per läge** för den här sajten: första skärmen, tjänstesidor, pris, fel, kvitto efter bokning, bekräftelsemejl (→ 2-7, *Bekräftelsemejlets innehåll*).

Mailchimps röst- och tonguide är en bra förebild men licensierad CC BY-NC 4.0: principerna får läras, texten får inte kopieras (`kunskap/research/2026-10-15_kompetensluckor-anteckningar/lager-6-7-rorelse-innehall.md`, avsnitt 3).

## Rösttestet

En mening klarar rösten när den svarar ja på tre frågor:

1. Kan besökaren se det framför sig? (konkret)
2. Går det att visa att det är sant? (belägg i `fakta.md`)
3. Skulle en konkurrent *inte* kunna skriva exakt samma mening? (bytestestet, → 2-7)

Tre ja: behåll. Två: vässa. Ett eller inget: skriv om eller gör en platshållare. 📄 marketingskills `copywriting/SKILL.md` (grinden med tre frågor, lånad från Profound `improved-copywriting`, MIT); brand, *voice test* (*Would a competitor say this?*). Bytestestet står på bänken (→ 2-7).

## Förbjudet

- Att hitta på en röst som inte finns i underlaget: saknas kundens ord blir det en fråga, inte en gissning (→ 2-7).
- Effektlöften i kundens egen text för vård och liknande (`BESLUT.md` 2026-10-15, *Omdömen*).
- Att låta ett attribut bli ett adjektiv i texten. *Vi är personliga* visar ingenting; en detalj ur faktabasen visar det. 📄 → 2-7, *Konkret i stället för generiskt*
