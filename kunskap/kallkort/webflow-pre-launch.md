# Webflow University: Pre-launch checklist

**Källa:** https://university.webflow.com/resources/pre-launch-checklist, som i dag leder vidare till https://university.webflow.com/resources/checklists/pre-launch-checklist. Hämtad med `curl` 2026-10-16 och läst i sin helhet; filen är byte för byte lika med andra varvets nedladdning (`byggguider/lovable-framer-webflow/webflow-university-pre-launch-checklist.html`). Sidan har inget datum och är märkt *"Research preview"*.
⚠️ Inte lästa: listan som markdown och CSV (länken skapas av skript), Webflows hjälpartiklar som varje punkt länkar till, och Webflows checklistor för SEO och designsystem. Tillgänglighetschecklistans index lästes av andra varvet.

**Licens:** *"© 2026 Webflow, Inc. All rights reserved"*. Ingen öppen licens. Vi destillerar med egna ord och citerar kort.

## Vad det är
Webflows lista att gå igenom före publicering, i fem grupper: design och innehåll (5 punkter), funktion och test (5), SEO, tillgänglighet och prestanda (8), externa verktyg (4), staging och publicering (4). **Det är 26 punkter med cirka 80 tips.** Räknaren *"0 / 99"* och *"0/9"* i varje grupp står fast i HTML:en och stämmer inte med listan; inventeringens "99 punkter" kommer därifrån. Sidan erbjuder listan som `.md`, *"Ready for Claude, Cursor, or ChatGPT."*

## Hur det fungerar
- Varje punkt har ett varför, *Pro tips* och en länk till Webflows hjälp. Många tips gäller Webflows verktyg: Navigator, Audit-panelen, *health scan*, kvasten som tar bort oanvända klasser och staging på `webflow.io`.
- **Lokala tjänstesajter:** en punkt, Google Business Profile: *"If your site represents a business with a physical location or service area, make sure your business profile is accurate and linked to your site."* Samma mening står av misstag också under Search Console.

## Kvalitet och underhåll
Utgivare: Webflow, Inc. Inget datum, ingen ändringslogg, märkt som förhandsversion. Tipsen anger sällan källa. Webflows egen tillgänglighetschecklista bygger på WCAG 2.1 AA, inte 2.2 (andra varvets nedladdning, `webflow-accessibility-checklist-index.txt:157`).

## Det bästa vi kan ta
Det mesta finns redan, ofta strängare:
- 404-sidan (`guide/2-8-teknik-och-kvalitet.md`, *Publicering*, `404-page`), formulär, länkkontroll, rubriker, alt-text, titlar och Open Graph (kontroll 12b), förhandsadress bakom Access, HSTS, 301 för ändrade adresser, föredragen domän (`omfattning/flyttregler.md:53`), Search Console (`guide/2-8`, N2), Google-profilen (`struktur/platser.md`) och vem som får publicera (Johnny godkänner, `guide/2-8`, N1; tokens i `drift/publicering.md`).
- Kvarlämnad platshållartext (*"lorem ipsum"*) fångas av kontroll 6.

Det som tillför något:
1. **En samlad lista före den första publiceringen.** `drift/publicering.md` har *Efter det första dygnet ska detta vara sant*, men ingen motsvarande lista före. Reglerna är spridda över `guide/2-8`, *Publicering*, och `guide/5-byggplan.md`, steg 5.
2. **Favicon i punkten om hur sajten syns** i sök och flikar. Andra varvets lucka 7: ingen regel för favicon och webbmanifest i SEO-tabellen i `guide/2-8`.
3. **Låt någon annan titta på stagingadressen** – en svag källa till mjuklanseringen i luckfilen F.1.

## Var det hamnar hos oss
**Beslutad:** skill: drift (fältet `beslut`; Johnny 2026-10-16 omkring 17.40, *"Ja på alla"*). Webflows checklista nämns i dag inte i `guide/` eller `.claude/skills/` (sökning 2026-10-16).

**Förslag till Johnny:** ett kort avsnitt *Före den första publiceringen* i `drift/publicering.md` som bara pekar på regler som redan finns, med Webflow som en av källorna till listans form. Inga nya regler ur Webflow ensam.

## Passar vår stack?
Principerna passar Astro och Cloudflare. Verktygstipsen gäller bara Webflow och tas inte in.

## Risker och flaggor
- **Google Analytics:** listan räknar med analys från start. Vi har statistik ur Cloudflare Pro och Google Analytics bara som tillval med samtycke (`BESLUT.md` 2026-10-16, *Kakor och samtycke vid behov*).
- **Träffytor:** *"Tap targets should be at least 44x44 pixels"* saknar källa. WCAG 2.2 AA kräver 24 × 24 px (2.5.8); 44 px är AAA (2.5.5). Vår regel står i `kvalitet/tillganglighet.md`.
- **Titlar och beskrivningar:** *"Keep titles under 60 characters and descriptions under 160"*. Google sätter ingen gräns; hos oss är det varningar (`kvalitet/seo-teknik.md:22` och `:32`).
- **Staging:** listan stänger av indexeringen för stagingdomänen. Hos oss räcker inte `noindex`; förhandsadressen skyddas med Access (`guide/2-8`, N1).
- **Nya flikar:** *"Make sure external links open in new tabs (if appropriate)"*. Hos oss avgör kontroll 2b vilka länkar (`BESLUT.md` 2026-10-16).
- **Leverantörstext** med Webflows egna produkter i varje punkt.

## Inloggning
Inget. Sidan är fri att läsa utan konto.
