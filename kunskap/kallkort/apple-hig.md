# Apple Human Interface Guidelines

**Källa:** Apple, [Human Interface Guidelines](https://developer.apple.com/design/human-interface-guidelines/) (HIG), inget git-repo. Sidorna hämtades som DocC-JSON (`https://developer.apple.com/tutorials/data/design/human-interface-guidelines/<sida>.json`) i andra varvet och igen 2026-10-16 för det här kortet: 56 sidor och 15 översikter (bland dem *Design principles* och *Designing for iOS*). **Alla 71 filer är byte för byte lika** med andra varvets nedladdning (`andra-varvet/kallor/apple-hig/`; text i `andra-varvet/hig-text/`, iOS-filtrerat i `hig-ios/`). Licenserna och varumärkesreglerna ligger i `andra-varvet/kallor/apple-licenser/` och Apples och WebKits webbdokument i `kallor/apple-webb/`. Rapport: `andra-varvet/apple-hig-jamforelse.md`. Nytt för kortet: [What's new](https://developer.apple.com/design/whats-new/) och sidan *Designing for iPhone Duo*, lästa 2026-10-16. ⚠️ Apples allmänna användarvillkor för webbplatsen ([site terms](https://www.apple.com/legal/internet-services/terms/site.html)) är inte lästa.
**Licens:** *"Copyright © 2026 Apple Inc. All rights reserved"* (`legalNotices` i varje JSON). Fritt att läsa; vi destillerar med egna ord och kopierar inga bilder. Typsnitten, SF Symbols och Apples märken har egna villkor, se *Risker*. ⚖️ Tolkning, inte juridisk rådgivning.

## Vad det är
Apples riktlinjer för appar på iPhone, iPad, Mac, Apple TV, Apple Watch och Vision Pro: principer, grunder (färg, typografi, layout, tillgänglighet, rörelse, skrivande), mönster och komponenter. HIG är skriven för appar, men ungefär hälften går att översätta till en sajt i Safari på iPhone, där de flesta av våra besökare är (`andra-varvet/apple-hig-jamforelse.md`, *Sammanfattning*).

## Hur det fungerar
- **Översättningen** (`.claude/skills/yta/apple-hig.md`, *pt blir CSS-px*): 1 pt motsvarar 1 CSS-px med `width=device-width`; Dynamic Type blir `rem`; säkra ytor blir `env(safe-area-inset-*)`; *Öka kontrast* blir `prefers-contrast: more`.
- **Fällan i kontrasttabellen:** HIG säger 3:1 från 18 pt, men WCAG:s stora text är 18 *typografiska* punkter, alltså 24 CSS-px. Normen är WCAG 2.2 AA.
- **Apples systemfärger klarar inte AA på vitt:** standardblått `R-0,G-136,B-255` (bildtexten i *Color*) ger 3,5:1; bara det tillgängliga blå `R-30,G-110,B-244` når 4,6:1. Kontrollräknat 2026-10-16.
- **Det som inte går att översätta:** Liquid Glass, haptik, SF Symbols, ark med lägen, systemets dynamiska färger och inställningen *Fet text*.

## Kvalitet och underhåll
- **Utgivare:** Apple. Varje sida har en ändringslogg, och varje JSON har `metadata.customMetadata.alert-date` med senaste ändringen.
- **What's new 2026-10-16:** senaste posterna är 2026-10-13 (*Widgets* och *Live Activities*, inte för webben). Av sidorna vi läser ändrades *Branding* och *Layout* senast, 2026-09-09.
- **Ändringsloggarnas senaste datum, 2026-10-16:** *Branding* och *Layout* 2026-09-09; *App icons*, *Menus*, *Scroll views*, *Search fields*, *Searching*, *Tab bars* och *Design principles* 2026-06-08; *Sheets* 2026-03-24; *Buttons*, *Color*, *Images*, *Toolbars*, *Typography* och *Writing* 2025-12-16; *Materials* och *Motion* 2025-09-09; *SF Symbols* 2025-07-28; *Accessibility*, *Icons*, *Keyboards*, *Loading* och *Virtual keyboards* 2025-06-09; *VoiceOver* 2025-03-07 (ny sida); *Gestures* 2024-09-09; *Dark mode* 2024-08-06; *Launching*, *Onboarding* och *Settings* 2024-06-10; 18 sidor senast 2023-06-05–2024-05-07; 9 sidor saknar ändringslogg (*Action sheets*, *Collections*, *Disclosure controls*, *Feedback*, *Inclusion*, *Managing accounts*, *Popovers*, *Right to left* och *Web views*). Datumen är desamma som i andra varvets nedladdning.
- **Ny sida som andra varvet inte läste:** *Designing for iPhone Duo* (2026-09-09), om Apples vikbara iPhone. Ytterdisplayen är *"wider and shorter"* än andra iPhone, och systemet lägger verktygsfält och flikfält *på sidan*; *"Use safe areas to make sure controls don't cover your content"*. Den fanns bara som länk i översikterna.
- **Föråldrat hos oss före andra varvet**, nu rättat i skillsen: `theme-color` färgar inte Safari i iOS 26, säkra ytor stod bara nedtill och regeln om negativ spärrning i stor text motsägs av Apples tabell för SF Pro (`andra-varvet/apple-hig-jamforelse.md`, *Sammanfattning*).

## Det bästa vi kan ta
**Redan taget** i fem delfiler (52–92 rader var), med HIG som andra oberoende primärkälla där vi redan hade en regel:
- `.claude/skills/yta/apple-hig.md`: pt till px, kontrastfällan, accenten bara till handlingar och status (andra källa för G3), typografin, materialet, ikonerna, bilderna, varumärket och licenserna.
- `.claude/skills/skelett/apple-hig.md`: säkra ytor på alla fyra sidor, 44 × 44 och avstånd, knappar, modala vyer, start utan rörelse eller rutor, webbappen på hemskärmen i iOS 26 och `format-detection`.
- `.claude/skills/rorelse/apple-hig.md`: rörelse aldrig ensam bärare av information, samma väg in och ut, inget rör sig vid laddning.
- `.claude/skills/innehall/apple-hig.md`: verb på knappar, inget *vi* i fel, inkluderande text och bilder.
- `.claude/skills/kvalitet/apple-hig.md`: iPhonens inställningar mot webben, prov i 200 % och 188 px, och det som kräver riktig iPhone.

**Inte taget:** *Designing for iPhone Duo*. Den ger en andra anledning till säkra ytor till vänster och höger (`skelett/apple-hig.md`, *Säkra ytor*) och stöder *"Avoid fixed widths"* och samma funktioner i alla bredder (`skelett/apple-hig.md:12–13`). Om Safari ger webbsidor säkra ytor eller vikningsdata på iPhone Duo är inte verifierat ⚠️.

## Var det hamnar hos oss
**Skill: yta, skelett, rorelse, innehall, kvalitet** – beslutad placering (fältet `beslut`, Johnny 2026-10-16 omkring 17.40: *"Ja på alla"*), och kortet håller med. HIG installeras inte; den läses om när datumen ändras. Förslag till huvudsessionen:
1. **Bevakningen:** HIG har inget repo och hör därför inte till `inventering/kallor-bevakning.json` som commit. Startsäkringen kan i stället läsa `alert-date` för de bevakade sidorna (rapporten föreslår *Accessibility*, *Typography*, *Layout*, *Color*, *Branding*, *Writing*, *Motion* och *Buttons*) och lägga till *Designing for iPhone Duo*.
2. **iPhone Duo** som en rad i `skelett/apple-hig.md`, *Säkra ytor*, märkt ⚠️ tills den prövats i Safari.

## Passar vår stack?
Ja, genom översättningen ovan. Astro ger statisk HTML och CSS, så det mesta blir CSS-regler och prov i Playwright. Det Playwrights WebKit inte visar – säkra ytor (`env()` blir 0), Safaris fält i iOS 26, webbappen på hemskärmen och Dynamic Type – kräver riktig iPhone (`kvalitet/apple-hig.md`, *Det som inte går att pröva*); enligt `BESLUT.md` 2026-10-16 (sista avsnittet) prövas riktiga iPhone via BrowserStacks MCP när Johnny har lagt in nyckeln.

## Risker och flaggor
- **Typsnitt:** SF Pro, SF Compact, SF Mono och New York får inte laddas som webbtypsnitt (licensen nämner *"website content"*). `system-ui` är tillåtet. ⚖️ Tolkning.
- **SF Symbols** får bara användas i appar för Apples produkter (Xcode-avtalet § 2.10); inte på sajterna. ⚖️ Tolkning.
- **Apples märken:** ingen Apple-logotyp vid en länk till Apple Kartor, och ingen härmning av apple.com (*Guidelines for Using Apple Trademarks*). ⚖️ Tolkning.
- **Appregler läses inte rakt av:** kontrasttabellen i pt, Apples färgvärden och tät radhöjd för korta apprader är fel för en webbsida med stycken.
- **JSON-vägen är odokumenterad** – det är filerna som HIG-sidan själv laddar. Den kan ändras utan förvarning ⚠️.
- Telemetri, betalvägg och inloggning: inga.

## Inloggning
Inget.
