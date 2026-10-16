# Källor

Delfil till `SKILL.md`. Varje källa med licens och var den används. Allt är destillerat med egna ord; inga längre stycken är kopierade. Externa skills installeras inte: de lästes 2026-10-16 och destillerades hit. Källkort per inventeringspost finns i premiumpassets underlag.

## Normer och standarder

| Källa | Licens | Används i |
|---|---|---|
| WCAG 2.2: [1.4.1](https://www.w3.org/WAI/WCAG22/Understanding/use-of-color.html), [1.4.3](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html), [1.4.4](https://www.w3.org/WAI/WCAG22/Understanding/resize-text.html), [1.4.11](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html), [1.4.12](https://www.w3.org/WAI/WCAG22/Understanding/text-spacing.html), [2.4.7](https://www.w3.org/WAI/WCAG22/Understanding/focus-visible.html), [2.4.11](https://www.w3.org/WAI/WCAG22/Understanding/focus-not-obscured-minimum.html), [2.4.13](https://www.w3.org/WAI/WCAG22/Understanding/focus-appearance.html), [2.5.8](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html) | W3C Document License | `farg.md`, `typografi.md`, `detaljer.md` |
| [CSS Color 4](https://www.w3.org/TR/css-color-4/), [CSS Fonts 4](https://www.w3.org/TR/css-fonts-4/), [Media Queries 5](https://www.w3.org/TR/mediaqueries-5/) | W3C | `farg.md`, `typografi.md`, `detaljer.md` |
| [Design Tokens 2025.10 (DTCG)](https://www.designtokens.org/tr/2025.10/) – Community Group-rapport, ingen W3C-standard | W3C Community Final Specification Agreement | `tokens.md` |
| WCAG 2.2: [1.4.10 Reflow](https://www.w3.org/WAI/WCAG22/Understanding/reflow.html) (320 CSS-px); Understanding 1.4.3 om platshållartext; [Technique C40](https://www.w3.org/WAI/WCAG22/Techniques/css/C40) (tvåfärgad fokusring) | W3C Document License | `typografi.md`, `farg.md`, `SKILL.md` |
| MDN Web Docs (text-wrap, text-box, hanging-punctuation, hyphens, font-variant-numeric, color-mix, outline, mix-blend-mode, forced-colors, overflow, overflow-wrap) och webbläsarstöd ur `@mdn/browser-compat-data` 8.1.6 och `web-features` 3.43.0 | CC BY-SA 2.5 (text); CC0 (data) | `typografi.md`, `detaljer.md`, `farg.md` |
| ISOF (Språkrådet), [Snabba skrivregler](https://www.isof.se/) | myndighetstext | `typografi.md` (hårt mellanslag); resten → `guide/2-7-innehall.md` |

## Litteratur

| Källa | Licens | Används i |
|---|---|---|
| GOV.UK Design System, [Table](https://design-system.service.gov.uk/components/table/) (tal högerställs) | Open Government Licence | `typografi.md` |
| Matthew Butterick, [Practical Typography](https://practicaltypography.com/summary-of-key-rules.html), också [Space between paragraphs](https://practicaltypography.com/space-between-paragraphs.html) | upphovsrättsskyddad, läsbar fritt; destilleras | `typografi.md` |
| Robert Bringhurst, *The Elements of Typographic Style* (4:e uppl.) | bok; reglerna lästa i andra hand via Richard Rutters [webtypography.net](http://webtypography.net/) ⚠️ | `typografi.md` |
| Adam Wathan och Steve Schoger, [Refactoring UI](https://www.refactoringui.com/) | kommersiell; bara egna ord | `farg.md`, `typografi.md`, `detaljer.md` |
| Brad Frost, [The many faces of themeable design systems](https://bradfrost.com/blog/post/the-many-faces-of-themeable-design-systems/) | blogg | `tokens.md` |
| NN/g: [Icon Usability](https://www.nngroup.com/articles/icon-usability/), [Photos as Web Content](https://www.nngroup.com/articles/photos-as-web-content/), [Beyond Blue Links](https://www.nngroup.com/articles/clickable-elements/), aesthetic-usability effect | artiklar | `detaljer.md` |
| Vercel, [Web Interface Guidelines](https://vercel.com/design/guidelines) | MIT (repot vercel-labs/web-interface-guidelines) | `farg.md`, `typografi.md`, `detaljer.md` |
| Material Design 3 (state layers, formskala, elevation): värdena ur tokenfilerna i [material-web](https://github.com/material-components/material-web) 34.0.21, eftersom m3.material.io inte gick att läsa utan JavaScript; [Material Color Utilities](https://github.com/material-foundation/material-color-utilities) (HCT-tonregeln) | Apache-2.0 | `farg.md`, `detaljer.md` |
| Apple Human Interface Guidelines: [Accessibility](https://developer.apple.com/design/human-interface-guidelines/accessibility) (44 pt standard, minst 28 pt), Typography (*avoid light font weights*), Color; hela läsningen för webben (lästa som JSON 2026-10-16) står i `apple-hig.md` | dokumentation | `detaljer.md`, `typografi.md`, `apple-hig.md` |

## Externa skills (destillerade, inte installerade)

| Skill | Repo | Licens | Används i |
|---|---|---|---|
| better-colors, better-typography, better-ui (Jakub Krehel) | [jakubkrehel/skills](https://github.com/jakubkrehel/skills) | MIT | `farg.md`, `typografi.md`, `detaljer.md`, `tokens.md` |
| emil-design-eng, apple-design (Emil Kowalski) | [emilkowalski/skills](https://github.com/emilkowalski/skills) | MIT | `detaljer.md` (genomskinliga ytor), `typografi.md` (spärrning); rörelsen → rörelseskillen |
| impeccable (Paul Bakaus) | [pbakaus/impeccable](https://github.com/pbakaus/impeccable): webb-pros kopia 4.5.2 (`d631a88`) läst i sin helhet 2026-10-16, ändringarna till 4.6.0 (`6af45ac`) och detektorns regellista `crates/live/assets/antipatterns.json` (59 regler) med trösklarna i Rust-källan, läst som data | Apache-2.0; laddar ned en binär och har telemetri på – installeras inte, och detektorn körs inte | `generiskt.md`, `typografi.md`, `farg.md`, `detaljer.md`, `tokens.md` |
| frontend-design (Anthropic) | [anthropics/skills](https://github.com/anthropics/skills), oförändrad uppströms (`dbd4588`) | Apache-2.0 | `generiskt.md`; som perspektiv när kit tas fram (→ `guide/2-5-yta.md`, *Spridd idégenerering*) |
| hallmark | [Nutlope/hallmark](https://github.com/Nutlope/hallmark) `13ac0ec` (senaste), läst i sin helhet 2026-10-16 | MIT | `generiskt.md`, `detaljer.md`, `typografi.md`, `farg.md`, `tokens.md` |
| design (Next Level Builder) | samma repo som ui-ux-pro-max | MIT | bara prövningen av egna ikoner i `detaljer.md`; resten släpps (AI-logotyper, egna API-nycklar) |
| Flowbite v4, daisyUI 5, GoDaddy Go | [themesberg/flowbite](https://github.com/themesberg/flowbite), [saadeghi/daisyui](https://github.com/saadeghi/daisyui), [godaddy-wordpress/go](https://github.com/godaddy-wordpress/go) | MIT, MIT, GPL-2.0 (bara parametrar) | `tokens.md` (*Kitets axlar*), `detaljer.md` (djupväxeln) |
| taste v2.0.0 med referenser och riktningsbibliotek, taste-skill-v2-experimental (webb-pros `taste`), soft, minimalist, redesign, brutalist, gpt, stitch, v1, brandkit, output, image-to-code och imagegen-frontend-web/-mobile (Leonxlnx) | [Leonxlnx/taste-skill](https://github.com/Leonxlnx/taste-skill), commit `f624f37` | MIT; studien bakom v2 är 247 galleri-sajter bedömda av modeller | `generiskt.md`, `stilriktningar.md`; som perspektiv när kit tas fram |
| design-system och ui-styling (Next Level Builder / ClaudeKit), lästa i sin helhet 2026-10-16, oförändrade uppströms (`56ea9cf`) | [nextlevelbuilder/ui-ux-pro-max-skill](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill) | MIT (ui-stylings `LICENSE.txt` är Apache-2.0 utan upphov) | `tokens.md` (nivåerna, namngrammatiken, lagerordningen), `detaljer.md` (tillståndsprioriteten); exempelvärdena underkänns ofta och Tailwind-delen är v3 |
| ui-ux-pro-max, lästa i sin helhet 2026-10-16 (SKILL.md, referenserna och de regelbärande CSV:erna; oförändrad uppströms) | samma repo | MIT | `detaljer.md` (ikonkontrast, andras logotyper), `typografi.md` (radlängd i mobilen, `break-all`), `SKILL.md` kontroll 22 (brytpunkterna); typsnittslicenserna (google/fonts vid låst revision). Paletterna, stilarna och astro.csv har fel i stickprov |

## Verktyg

Licenser och nivå per verktyg → `tokens.md`, *Verktyg*. Fakta och stjärnor: 📄 `kunskap/research/2026-10-15_kompetensluckor-anteckningar/lager-5-yta.md`.

## Hur källorna vägs

- Ett beslut i `BESLUT.md` eller en regel i guiden går före en källa. Konflikter skrivs som förslag till Johnny (`SKILL.md`).
- En regel blir låst kontroll bara med en norm eller två oberoende primärkällor (`guide/README.md`, *Grind eller instruktion*). Värden ur en enda skill eller bok är instruktioner *(en källa – bänken)*.
- Externa skills motsäger varandra om smak (→ `generiskt.md`). Där de är eniga och har ett hantverksskäl står regeln här; där de är oense väljer kitet.
