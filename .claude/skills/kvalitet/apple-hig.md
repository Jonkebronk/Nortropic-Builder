# Apples HIG för kvaliteten: Safari på iPhone

Delfil till `SKILL.md`. Hur Apples *Human Interface Guidelines* (HIG) och WebKits egna råd prövas på en sajt som mest besöks i Safari på iPhone: vilka av iPhonens tillgänglighetsinställningar som når en webbsida, vad som går att pröva i Playwrights WebKit och vad som kräver en riktig iPhone. WCAG 2.2 AA är fortfarande golvet (→ `tillganglighet.md`); HIG ger nivån över golvet och plattformens egenheter.

Källa: 📄 Apple, [Human Interface Guidelines](https://developer.apple.com/design/human-interface-guidelines/), sidorna *Accessibility* (ändrad 2025-06-09), *Typography*, *Layout*, *VoiceOver*, *Dark Mode* och *Color*, lästa som JSON 2026-10-16; WebKits blogg (artiklar nedan); MDN browser-compat-data 8.1.6 (2026-10-15) för stödet i Safari.

## iPhonens inställningar och webbens motsvarighet

| Inställning i iOS | Vad HIG begär | På webben | Stöd i Safari | Så prövas det |
|---|---|---|---|---|
| Större text (Dynamic Type) | Text som går att förstora minst 200 % utan att layouten går sönder | Storlekar i `rem`, brytpunkter i `rem` eller `em` | iOS-inställningen når inte vanliga webbsidor; bara WebKits egna `font: -apple-system-body` följer den, och det nollställer `font-family` 📄 [CSSWG, env(preferred-text-scale)](https://drafts.csswg.org/css-env-1/explainers/env-preferred-text-scale.html) | Rotens storlek 200 % i 375 px, och 188 px bredd (nedan) |
| Safaris textstorlek (aA, 50–300 %) | – | Samma som ovan | Finns; om den skalar bara text eller hela sidan är inte belagt ⚠️ | Båda proven nedan |
| Öka kontrast | Ett läge med högre kontrast om standardläget inte räcker | `@media (prefers-contrast: more)` | Safari 14.1, iOS 14.5 | Playwright `contrast: 'more'` |
| Minska genomskinlighet | Täckande ytor | `prefers-reduced-transparency` | **Saknas** i Safari | Standardläget måste vara täckande (→ `../yta/apple-hig.md`) |
| Minska rörelse | Mindre rörelse, toning i stället för förflyttning | `prefers-reduced-motion` | Finns | Playwright `reducedMotion: 'reduce'` (→ `../rorelse/reducerad.md`) |
| Mörkt läge | Följ systemets val | `prefers-color-scheme`, `color-scheme` | Finns | Bara om kitet har mörkt läge |
| Fet text, Knappformer | Egna typsnitt följer *Fet text* | Ingen motsvarighet ⚠️ | – | Länkar är understrukna ändå |
| VoiceOver och rotorn | Etiketter, unika titlar, rubriker | Semantisk HTML, `<title>`, rubriker, landmärken | Finns | VoiceOver på iPhone vid lansering (→ `tillganglighet.md`) |
| Röststyrning | Synliga etiketter | Synlig text i det tillgängliga namnet (WCAG 2.5.3) | Finns | axe och genomläsning |
| Full tangentbordsåtkomst | Tangentbordet räcker | Fokusordning och synligt fokus | Safari tabbar bara till fält som standard (→ `tillganglighet.md`) | Alt+Tab i WebKit |

## Prov som HIG lägger till

1. **Text 200 % i 375 px.** Sätt rotens storlek till 200 % (32 px) i WebKit: ingen sidledsscroll, inget namn eller ord som bryts per bokstav, ingen text som kapas. HIG: *"Ideally, give people the option to enlarge text by at least 200 percent."* Provlistan prövar i dag 150 % (24 px, → `prov.md`, punkt 14). Rapport, inget stopp: WCAG 1.4.4 klaras redan med webbläsarens zoom. 📄 HIG *Accessibility* och *Typography*.
   - Proven sätter rotens storlek med en stil på sidan. Då följer inte mediefrågor i `rem` med, eftersom de räknar på webbläsarens grundstorlek. Det är värsta fallet; en riktig inställning av grundstorleken slår också på de smala brytpunkterna.
2. **Smal bredd: 188 × 334 CSS-px.** Safaris sidzoom 200 % på en telefon som är 375 px bred ger, om den fungerar som zoom på datorn, ett fönster på cirka 188 px ⚠️ (antagande, inte belagt i Apples dokumentation). Pröva att sidan går att använda; under WCAG:s 320 px är det en rapport, inget stopp.
3. **44 × 44 CSS-px för fristående mål** (knappar, menyknappen, länkar i listor som sidfoten). HIG:s standard i iOS är 44 × 44 pt och minimum 28 × 28 pt; WCAG 2.5.5 (AAA) säger 44 px. Två oberoende primärkällor för guidens granskningskriterium, så det kan bli en rapporterande kontroll; 2.5.8 (24 px eller avstånd) är golvet. 📄 HIG *Accessibility* och *Buttons*; → `guide/2-4-skelett.md`, N2.
4. **Första målningen står still.** Logga fasta och klistrade element per bildruta från första målningen till en sekund efter: inget ska byta läge eller opacitet utan att besökaren gjort något. 📄 HIG *Launching*; → `../rorelse/apple-hig.md`.
5. **Huvudet för Safari på iPhone**, sökt i den byggda sidan:
   - `viewport` med `width=device-width`, utan `user-scalable=no` och `maximum-scale` (→ förbuden i `SKILL.md`).
   - Har `viewport` värdet `viewport-fit=cover` måste stilarna använda `env(safe-area-inset-left)` och `env(safe-area-inset-right)` där innehåll når sidkanten, inte bara `-bottom`. 📄 [WebKit, Designing Websites for iPhone X](https://webkit.org/blog/7929/designing-websites-for-iphone-x/).
   - Bakgrundsfärgen står på `html` eller `body`, eftersom Safari färgar kanterna och, sedan iOS 26, sitt eget fält efter den ⚠️. 📄 samma artikel; WebKit bugg [301756](https://bugs.webkit.org/show_bug.cgi?id=301756).
   - `apple-touch-icon` på 180 × 180 px och täckande (genomskinliga delar har enligt många utvecklare blivit svarta på iOS; inte prövat i iOS 26 ⚠️), och ett kort namn för hemskärmen (`apple-mobile-web-app-title` eller `name` i ett manifest). Sedan iOS 26 öppnas varje sajt på hemskärmen som webbapp. 📄 [WebKit Features in Safari 26.0](https://webkit.org/blog/17333/webkit-features-in-safari-26-0/); Apple, *Configuring Web Applications* (arkiverat).
   - `-webkit-text-size-adjust: 100%`, aldrig `none`, som kan hindra textförstoring. 📄 Apple, *Safari Web Content Guide*, *Adjusting the Text Size* (arkiverat); 456 Berea Street, [Beware of -webkit-text-size-adjust:none](https://www.456bereastreet.com/archive/201011/beware_of_-webkit-text-size-adjustnone) (2010).
   - `theme-color` får finnas för Chrome på Android och äldre Safari, men kontrollen förutsätter inte att den färgar Safari i iOS 26.
6. **Kontrast med WCAG:s tabell, inte HIG:s.** HIG:s gräns *18 pt* betyder 18 CSS-px på en iPhone, medan WCAG:s stora text börjar på 24 CSS-px (18,7 i fetstil). 📄 HIG *Accessibility*; WCAG 2.2 (→ `../yta/apple-hig.md`).

## Det som inte går att pröva i Playwrights WebKit

Playwrights WebKit är samma motor som Safari men inte Safari på iPhone. Det här kräver Xcodes simulator eller en riktig iPhone, vid lansering och när biblioteket ändrar sidhuvud, knapplist eller samtyckesruta:

- **Säkra ytor.** `env(safe-area-inset-*)` är 0 i Playwright. Pröva liggande läge på en iPhone med Dynamic Island.
- **Safaris eget fält i iOS 26:** var adressfältet ligger, hur det färgas och om en fast list nere på sidan krockar med det.
- **Webbappen på hemskärmen:** ikon, namn och att sajten går att använda utan bakåtknapp.
- **Telefonnummer som Safari själv gör till länkar** (`format-detection`).
- **Dynamic Type, VoiceOver och Röststyrning** på riktigt.
- **Haptik:** finns inte på webben i Safari (`Navigator.vibrate` saknas, MDN browser-compat-data 8.1.6).

## Förbjudet

- Att godkänna en sajt för Safari på iPhone enbart på Playwrights WebKit; det som står ovan prövas på riktig enhet eller i simulatorn.
- Att använda HIG:s kontrasttabell i stället för WCAG:s.
- `-webkit-text-size-adjust: none` och zoomspärr.
