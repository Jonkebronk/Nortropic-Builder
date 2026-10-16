# Mikroprov: lucka 1 i skillsen, Chrome DevTools

**Datum:** 2026-10-16, kväll. **Uppdrag:** skillsen steg 3, lucka 1 i översynen (`kunskap/research/2026-10-16_verktyg-och-skills-full-potential.md`): Chrome DevTools i granskare, innehåll, rörelse, skelett och yta. **Metod:** `.claude/skills/larande/skills.md`, *Mikroprov av formuleringen*.

- Fem prov, ett per skill, med fem körningar per arm i ny kontext. Kontrollen är skillen ur `HEAD` och den nya armen samma skill med utkastet. Båda armarna läste ur kopior i scratch med neutrala katalognamn och samma uppdrag; Skill-verktyget och repots `.claude/skills/` var avstängda i uppdraget.
- Uppgiften var en plan utan körning mot webbläsaren, eftersom alla delagenter delar en Chrome DevTools-server.
- Felet per prov skrevs ner innan svaren lästes (kl. 22.33). Svaren fick slumpade id och lästes i blandad ordning med katalognamnen maskerade; nyckeln öppnades efter bedömningen.
- **Blindningen var inte hel:** delagenternas återrapporter kom in i huvudsessionen och avslöjade ibland armen (katalognamn, "princip 13"). Kriterierna tillämpades därför ordagrant.

## Utfallet

| Prov | Skill | Felet | Gammal text | Ny text |
|---|---|---|---|---|
| M1 | granskare | Mobilens tillstånd fångas utan tryck | 0 av 5 | 0 av 5 |
| M2 | rörelse | "Menyn känns seg": längd eller kurva ändras utan att ändringen beror på en mätning av svaret | **3 av 5** | **0 av 5** |
| M3 | yta | Kaskaden i den körande sidan läses inte, bara källan eller `getComputedStyle` | 0 av 5 | 0 av 5 |
| M4 | skelett | Punkterna 6 och 14 prövas utan tryck | 0 av 5 | 0 av 5 |
| M5 | innehåll | Namnen tas ur källan i stället för tillgänglighetsträdet | 0 av 5 | 0 av 5 |

**M2:** alla tio mätte svaret (INP eller spårning) innan de föreslog något. Skillnaden låg i förslagen. Tre gamla svar föreslog en kortare panel, en annan kurva eller båda att jämföra på video, utan att förslaget berodde på vad mätningen visade. Alla fem nya gjorde rörelsens ändring villkorad: *"bara om videon visar att den är det sega"*.

**M1, M3, M4 och M5:** kontrollen visade inte felet, så det finns inget att rätta. Raderna stryks enligt `larande/skills.md` (*Stryk det modellen redan gör*).

## Sidoiakttagelser (inte förhandskriterier)

- **M1: den nya texten gjorde det sämre på en punkt.** Fyra av fem nya svar tog trycket på knappen med Chrome DevTools `click` eller Playwright-MCP:ns musklick. Inget gammalt svar gjorde det; de använde biblioteket med `tap()` eller CDP-tryck. `click` är ett musklick också i en emulerad mobil med tryck (prövat samma kväll: `pointerdown:mouse`, ingen `touchstart`, i båda MCP:erna). Två av de fyra misstänkte det själva. Raden i granskaren stryks, och den gemensamma filen säger nu att ett riktigt tryck kräver biblioteket.
- **M3:** fyra av fem gamla svar räknade med att `get_css_styles` ger fil och rad. På det byggda resultatet ger den `index:1`, eftersom Astro lägger CSS:en i sidan (prövat). Alla fem nya hade det rätt, eftersom de läste den gemensamma filen. Det var inget förhandskriterium och belägger inte raden i ytan.
- **Inaktuella uppgifter styrde flera agenter:** `LAGE.md` sa att omstarten väntade och att Playwright körde Chromium utan tryck, och övningssajtens `mcp-prov.md` sa detsamma. Fem agenter valde bort Playwright-MCP:n av det skälet.
- **Fynd på övningssajten** som agenterna såg i källan:
  - `bibliotek/src/styles/bas.css:47` ger `:focus-visible` radien 4 px, mot `yta/detaljer.md` (*Fokusringen följer elementets radie*).
  - Menylänkarna `.meny__lankar a` saknar `:active`.
  - Texterna säger *klickar* på tre ställen och *nedan* i 404-ingressen.
  - Ring-länkens namn börjar inte med den synliga texten.

## Det som behålls

- `rorelse/SKILL.md`, princip 13, och `rorelse/granskning.md`, *Mätning*. Belagt för den lokala rättelsen; att sajterna blir bättre avgör Johnny (`guide/3-2`, *En ändring i taget*).
- `kvalitet/webblasarverktyg.md` som faktafil (formprov), med pekare från `kvalitet/SKILL.md` och `kvalitet/kontroller.md`. Fakta prövade mot övningssajten 2026-10-16 med chrome-devtools-mcp 1.11.0 och @playwright/mcp 0.0.83.
- Guidens rader om Chrome DevTools (`2-8`, bilaga A) följer domen 21.37.

## Kostnad

- 50 körningar, 4,74 miljoner token, i snitt 95 000 per körning (70 000–126 000).
- 1,2–4 minuter per körning; högst 20 delagenter åt gången.

Svaren, nyckeln och bedömningen ligger i sessionens scratch (`mp3/`) och följer inte med repot.
