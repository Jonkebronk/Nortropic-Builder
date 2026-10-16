# Källor, luckor och förslag

Delfil till `innehall`. Källorna lästes 2026-10-16. Inget har kopierats i längre stycken; reglerna är destillerade med egna ord. Externa skills installeras inte (→ `guide/bilaga-a-verktyg.md`, urvalskriterierna).

## Normer och litteratur

| Källa | Version, datum | Licens eller villkor | Används i |
|---|---|---|---|
| Språkrådet, *Myndigheternas skrivregler* | 8:e uppl. 2014; [Isofs pdf](https://www.isof.se/utforska/vagledningar/myndigheternas-skrivregler), sidan uppdaterad 26 jan 2026 | © Språkrådet och Norstedts Juridik/Fritzes; korta citat | `text.md`, `mikrotext.md`, `sprakgrind.md` |
| Språkrådet, *Snabba skrivregler* | Isof 2024, läst i en kopia hos Chalmers ⚠️ | © Isof | `text.md`, `ai-monster.md` |
| Isof, [Klarspråkshjälpen](https://www.isof.se/svenska-spraket/klarsprak/klarsprakshjalpen/skriv-klarsprak) | uppdaterad 11 sep 2026 | ingen licens angiven | `text.md` |
| GOV.UK, [Writing to GOV.UK standards](https://guidance.publishing.service.gov.uk/), A to Z, Design System | läst 2026-10-16 | Open Government Licence v3.0 | `text.md`, `mikrotext.md` |
| NN/g: How Users Read (1997), F-Shaped Pattern (2017), Text Scanning Patterns (2019), First 2 Words (2009), Plain Language (2017), Four Dimensions of Tone (2016), Impact of Tone (2016), Headings Are Pick-Up Lines (2015), Error-Message Guidelines (2023), Designing Empty States (2021), 3 I's of Microcopy (2025), Better Link Labels (2019), Photos as Web Content (2010) | se datum | © NN/g; refereras | alla delfiler |
| Ginny Redish, *Letting Go of the Words* | 2:a uppl. 2012 | © Elsevier; läst på rubriknivå ⚠️ | `text.md`, `mikrotext.md` |
| Kinneret Yifrah, *Microcopy: The Complete Guide* | läsprov ur tyska utgåvan (Rheinwerk 2019); kapitel 7–13 på rubriknivå ⚠️ | © författaren | `mikrotext.md` |
| WCAG 2.2 | W3C Recommendation 12 dec 2024 | W3C Document License | `mikrotext.md`, `bilder.md`, `video.md` |
| W3C WAI, [Images Tutorial](https://www.w3.org/WAI/tutorials/images/) | beslutsträdet 2024-05-13 | W3C | `bilder.md` |
| 1177, [riktlinjer för alt-texter och bildtexter](https://www.1177.se/riktlinjer-och-material/riktlinjer-for-bild-och-video/riktlinjer-for-alt-texter-och-bildtexter/) och för film | 2025-12-17 | ingen licens; refereras | `bilder.md`, `video.md` |
| DIGG, [webbriktlinjer](https://www.digg.se/webbriktlinjer) om text för icke-text och textning | 2024 | ingen licens angiven ⚠️ | `bilder.md` |
| Google Search Central, [Image SEO](https://developers.google.com/search/docs/appearance/google-images); Google Business Profile, foton | 2026-03-02 | CC BY 4.0 (text) | `bilder.md` |
| Wikipedia, [Signs of AI writing](https://en.wikipedia.org/wiki/Wikipedia:Signs_of_AI_writing) | rev. 1380310647 | CC BY-SA 4.0; bara idéer används | `ai-monster.md` |

## Skills och metoder (destillerade, inte installerade)

| Källa | Version | Licens | Används i |
|---|---|---|---|
| [humanizer](https://github.com/blader/humanizer) (Siqi Chen) | v3.1.0, commit 225a6f3 | MIT; delar av exemplen är Wikipedias CC BY-SA | `ai-monster.md` |
| [better-writing](https://github.com/jakubkrehel/skills) (Jakub Krehel) | commit 4c66b1f | MIT | `mikrotext.md`, `rost.md` |
| [brand](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill) (Next Level Builder), bara röst och budskap | commit 56ea9cf | MIT | `rost.md` |
| [marketingskills](https://github.com/coreyhaines31/marketingskills): `copywriting`, `copy-editing`, `customer-research` | commit 365b412 | MIT; SaaS-exempel och osourcad statistik (*+81 %*) används inte | `text.md`, `rost.md`, `ai-monster.md` |
| Anthropic [knowledge-work-plugins](https://github.com/anthropics/knowledge-work-plugins), `brand-review` | commit 33eeda1 | Apache-2.0 | `rost.md`, `text.md` |
| [claude-humanizer-svenska](https://github.com/nordefors-max/claude-humanizer-svenska) | commit 81a8768 | saknar licens: bara läst | `ai-monster.md` |
| [llepafils](https://github.com/00spoiler00/llepafils), metoden | commit 95d5c30 | MIT | `sprakgrind.md` |

## Verktyg och modeller

| Verktyg | Version | Licens | Används i |
|---|---|---|---|
| [Vale](https://github.com/vale-cli/vale) | 3.24.0 | MIT; Vale CMS och MCP är betalda och tas inte | `sprakgrind.md` |
| [Hunspell sv_SE](https://github.com/LibreOffice/dictionaries/tree/master/sv_SE) | 2.42 | LGPL-3 | `sprakgrind.md` |
| [LanguageTool](https://github.com/languagetool-org/languagetool), självhostad | 6.8 | LGPL-2.1; publika API:t används aldrig | `sprakgrind.md` (väntar) |
| [vale-cli/agent-tools](https://github.com/vale-cli/agent-tools) | commit 5e8704f | MIT; MCP kräver betalt konto | `sprakgrind.md` (väntar) |
| [KB-Whisper](https://huggingface.co/KBLab/kb-whisper-large) | 2025-08-27 | Apache-2.0 | `video.md` |
| [whisper.cpp](https://github.com/ggml-org/whisper.cpp) | 1.9.5 | MIT | `video.md` |
| [FFmpeg](https://ffmpeg.org/legal.html) | 9.0.2 (Homebrew) | LGPL-2.1+; Homebrews bygge är GPL-3.0+ och sprids inte | `video.md` |
| [rembg](https://github.com/danielgatis/rembg) | 2.0.85 | MIT för koden; modellerna har egna licenser | `bilder.md` |
| [BiRefNet-portrait](https://huggingface.co/ZhengPeng7/BiRefNet-portrait) | release v1 | MIT | `bilder.md` |
| [Astro bilder](https://docs.astro.build/en/guides/images/), [sharp](https://sharp.pixelplumbing.com/) | Astro 7.4, sharp 0.35.5 | MIT, Apache-2.0 | `bilder.md` (tekniken → 2-8) |

## Kända luckor

Det här täcker varken guiden eller skillen än:

- Ingen svensk norm för undertexter (tecken per rad, läshastighet) är läst.
- *Svenska skrivregler* (Språkrådet, Liber) och SS-ISO 24495-1 *Klarspråk* är inte lästa.
- Redish och Yifrah är bara lästa på rubriknivå.
- LIX-tröskeln för webbtext saknar källa och är inte kalibrerad.
- Den svenska listan över AI-ord har bara en källa, och den saknar licens.
- Telefonteknik för ägarens egna foton saknar källa.

## Förslag till Johnny

Där en källa säger något annat än guiden. Förslag, inte beslut.

1. **Långt tankstreck kan bli låst kontroll.** Guiden har regeln på bänken tills *Svenska skrivregler* är läst (2-7). *Myndigheternas skrivregler* 13.8, som är normerande, och *Snabba skrivregler* 1.10 beskriver bara det korta tankstrecket. I provet gav regeln 0 falsklarm.
2. **Inga versaler i rubriker och knappar kan bli granskningskriterium med norm,** med undantaget för stilkitets etiketter kvar: *Myndigheternas skrivregler* 3.4.2 och 3.5.2 och GOV.UK säger detsamma.
3. **LIX via Vales `metric` räknar fel på svenska** (långa ord räknas i byte). 2-7 bör säga LIX via ett eget skript.
4. **llepafils-siffrorna i 2-7, *Kontroll*,** bör nämna att LanguageTool ensam gav fem falsklarm, och att bara sex fragment var rena.
5. **AI-metadata genom bildkedjan (2-7, N2) går inte med Astros standard:** sharp tar bort all metadata i varianterna. Antingen läggs AI-bilder orörda i `public/`, eller så räcker den synliga märkningen. ⚠️ Inte provat.
6. **`imageService: 'compile'`** i inventeringen gäller bara med Cloudflare-adaptern; en statisk sajt behöver ingen adapter enligt Astros dokumentation, och adapterns läge hade tysta fel under 2026.
7. **rembg-modellerna `birefnet-general`, `-lite` och `-massive`** är MIT-märkta men tränade på DIS5K, vars villkor bara tillåter forskning och undervisning. Tills Johnny avgjort det används bara `birefnet-portrait`.
