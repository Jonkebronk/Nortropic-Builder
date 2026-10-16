# better-typography

**Källa:** https://github.com/jakubkrehel/skills, sökvägen `skills/better-typography/`. Läst 2026-10-16 vid commit `4c66b1fa86e9` (repot, 2026-10-12); senaste ändring i skillen är `4650b9c030` (2026-10-06). Pluginversion 1.13.2. Det finns ingen ändringslogg och inga releaser. Lästa filer: `SKILL.md`, `spacing-and-sizing.md`, `wrapping-and-punctuation.md`, `choosing-fonts.md`, `details-and-accessibility.md`, `variable-fonts-and-opentype.md`, `css-cheat-sheet.md`, repots `README.md` och `AGENTS.md`. Sidan https://jakub.kr/skills länkar ingen egen dokumentation för skillen.

**Licens:** MIT, © 2026 Jakub Krehel (ur `LICENSE`). Upphovsrätts- och licenstexten ska följa med vid kopiering; vi skriver med egna ord och anger källan.

**Vad det är:** En kunskapsskill för hur text renderas: typskala, radhöjd, spärrning, typsnittsfunktioner, radbrytning, trunkering och skiljetecken. Den skiljer på exakta krav (fel när de saknas) och riktvärden (fel bara när de bryter projektets egen skala).

**Hur det fungerar:**
- **Exakta krav** (`SKILL.md`, *Measured, not preferred*):
  - enhetslös radhöjd
  - vikt minst 400 under 18px (100–300 först från 28px)
  - 60–75 tecken per rad
  - 16px i inmatningsfält på mobil (iOS zoomar annars)
  - `tabular-nums` på värden som ändras.
- **Riktvärden:**
  - radhöjd: display 1,1, rubriker 1,2–1,3, brödtext 1,5–1,6, och minst 1,4 för text som bryts till tre rader eller fler
  - spärrning: rubriker från 24px −0,01 till −0,02em, versaletiketter på högst 14px +0,05em, brödtext 0, alltid i em
  - högst tre typsnitt, parade för kontrast.
- **Skala** (`spacing-and-sizing.md`). Storlek, radhöjd och vikt sätts som en roll. Startskala för app-gränssnitt: 13/16/18/24/36px. Betoning inom en roll är ett viktsteg upp, inte en större storlek. Rubriknivåer går nedåt i storlek.
- **Egenskaper före råa taggar** (`variable-fonts-and-opentype.md`):
  - `font-weight` i stället för `"wght"`, och `font-variant-numeric` i stället för `"tnum"`/`"zero"`
  - `font-optical-sizing: auto` lämnas
  - `font-feature-settings` bara för stilset (`ss01`, `cv11`).
  - Ladda varje snitt som används, annars syntetiserar webbläsaren. Stäng av syntes smalt, med longhand.
- **Radbrytning** (`SKILL.md`):
  - `text-wrap: balance` på rubriker (aldrig på stycken, och Chromium ignorerar den över sex rader)
  - `text-wrap: pretty` på stycken
  - `overflow-wrap: break-word` där långa ord och länkar kan spräcka layouten
  - `white-space: nowrap` på etiketter
  - `text-align: start`.
- **Trunkering:** en rad (overflow, ellipsis, nowrap) eller flera (`-webkit-line-clamp`), alltid med en väg till hela texten.
- **Detaljer** (`details-and-accessibility.md`):
  - understrykning från typsnittet (`from-font`), eller 1px tjock med `text-underline-offset: 3px`; prickad för förkortningar
  - `text-box: trim-both cap alphabetic` i knappar som progressiv förbättring
  - dekorativ text i CSS, inte som bild
  - text ska gå att markera
  - `lang` styr citattecken och avstavning.
- **Skiljetecken** (`wrapping-and-punctuation.md`): en tabell med engelska typografiska tecken (krokiga citattecken, långt tankstreck för inskott, ellipstecken, hårt mellanslag i ”10 km”).

**Kvalitet och underhåll:**
- Samma repo som better-colors: 7 968 stjärnor, två bidragsgivare, aktivt underhållet (senaste ändring i skillen 2026-10-06).
- Kända problem:
  - #40, punkt 1 (stängt, rättat i PR #41): receptet för 16px-fält tog bort fokusringen och krympte i flex. Dagens `details-and-accessibility.md` har rättningen (`shrink-0`, fokusring på omslaget).
  - #22 (öppet, 2026-09-03): skillen utlöses bara i hälften av fallen när en prompt ber om ”en namngiven skala som CSS custom properties”. Det spelar ingen roll för oss, eftersom vi destillerar och inte installerar.
  - PR #21 (öppen): dess typografirelaterade punkter är redan rättade i main.
- ⚠️ Inte verifierat mot primärkälla (källans egna uppgifter):
  - att iOS zoomar fält under 16px
  - sexradersgränsen för `balance` i Chromium
  - webbläsarstödet för `text-box` (Chromium 133+, Safari 18.2+)
  - Inters stilset (`ss01` = öppna siffror, `cv11` = a med en våning).

**Det bästa vi kan ta:**
- De fem exakta kraven och storleksgolven (`SKILL.md`: *Measured, not preferred*, *Size floors*).
- Radhöjd och spärrning per roll (`SKILL.md`: *Line-height by role*, *Letter-spacing by size*). Lugn-kitet ligger redan inom ramarna: rubrikspärrning −0,015em, radlängd 34rem (cirka 66 tecken), brödtextens radhöjd 1,7.
- Egenskaper före taggar och smal syntesavstängning (`variable-fonts-and-opentype.md`).
- Reglerna för radbrytning, trunkering och `tabular-nums`. `tabular-nums` behövs på småföretagens öppettider, prislistor och telefonnummer i tabeller.
- Understrykning från typsnittet och `text-box` i knappar (`details-and-accessibility.md`, `spacing-and-sizing.md`).
- Tabellen *Before you finish* som sökmönster:
  - `line-height` eller `letter-spacing` i px
  - vikt 100–300 under 18px
  - `balance` på `p`
  - `...` eller `--` i text
  - `font-feature-settings: "tnum"`
  - `user-select: none` på textcontainer.

**Var det hamnar hos oss:**
- `.claude/skills/yta/typografi.md`: kraven, radhöjd, spärrning, egenskaper, radbrytning och trunkering.
  - Svensk mikrotypografi ersätter källans engelska tabell, med hänvisning till 2-7: ”…”, kort tankstreck – med mellanslag vid inskott och utan vid intervall, aldrig långt tankstreck, decimalkomma, hårt mellanslag mellan tal och enhet.
  - Kitets flytande skala (Utopia, max högst 2,5 × min, 2-5 [N2]) ersätter källans fasta app-skala.
- `.claude/skills/yta/tokens.md`: att varje textroll bär storlek, radhöjd och vikt som en enhet. Kiten har i dag `--k-h1`–`--k-h3`, `--k-brod`, `--k-liten`, `--k-mindre`, `--k-storre` och `--k-radhojd`, men radhöjd och vikt per roll saknas.
- **Kontroll:** sökmönstren går till designregelvakten som rapport, inte grind.

**Passar vår stack?**
- **Utan översättning (noll JavaScript):** allt är CSS och fungerar i Astro direkt. Kiten använder redan Fontsource och `size-adjust`-reservfonter, vilket källan inte tar upp men som stöder den.
- **Tailwind 4** är nu tillåtet. Kolumnen i `css-cheat-sheet.md` kan då tas som den är (`text-balance`, `text-pretty`, `tabular-nums`, `truncate`, `line-clamp-*`), och receptet för 16px-fält finns skrivet för Tailwind. Ingen JavaScript i webbläsaren.
- **Behöver översättas:** skiljeteckenstabellen till svenska; app-skalan till kitets `clamp()`-skala. Typsnittsexemplen (Helvetica, Inter, Geist som ”standard”) tas inte med, eftersom kitet väljer.
- **Krockar med Lighthouse 100, *HTML först* eller rörelsereglerna:** inga. `text-wrap` och `text-box` är progressiv förbättring utan kostnad.

**Risker och flaggor:**
- Licens: ingen risk.
- Telemetri gäller bara installation via `npx skills add` (skills.sh, avstängbart med `DISABLE_TELEMETRY=1`); vi installerar inte.
- Ingen betalvägg och ingen inloggning.
- Krockar med Nortropic, där vi vinner:
  - Engelska skiljetecken mot svenska (2-7 [N2]).
  - Fast skala mot flytande (2-5 [N2]).
  - Versaletiketter: källans 0,05em är nedre kanten av 2-5:s 5–12 % (Butterick). Lugn-kitets överrad har 0,12em, i övre kanten. Förenligt.
  - Fontutjämning (`-webkit-font-smoothing: antialiased`) på roten är smak och påverkar bara macOS. Kitet avgör.
- Krock med andra skills: Emils `apple-design` vill ha lätt positiv spärrning på liten text och systemtypsnitt som standard; källan har 0 på brödtext, och hos oss väljer kitet typsnitt. Ta källans regel och låt kitet avgöra per typsnitt.
