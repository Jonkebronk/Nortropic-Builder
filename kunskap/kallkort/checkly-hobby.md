# Checkly Hobby

**Källa (läst 2026-10-16):**
- https://www.checklyhq.com/pricing/
- https://github.com/checkly/checkly-cli, HEAD `bcc2b92` (2026-10-16), tagg `v10.0.0-rc.2`, med `README.md`.
- Dokumentationen om browser checks, via anteckningarna för lager 9 (2026-10-13).

**Licens:**
- Tjänsten har Checklys villkor ⚠️ (villkoren och biträdesavtalet är inte lästa).
- checkly-cli: Apache-2.0. Licens- och NOTICE-text följer med vid spridning.

**Vad det är:** En SaaS-tjänst för syntetisk övervakning, med API-kontroller och webbläsarkontroller i riktiga webbläsare via Playwright, från flera platser. Kontrollerna kan skrivas som kod i repot (*monitoring as code*) med CLI:t.

**Hur det fungerar:**
- **Hobby, gratis:**
  - 10 monitorer för drifttid, som tätast varannan minut.
  - 1 000 webbläsarkörningar och 10 000 API-körningar per månad, med hårt tak: övervakningen stannar när krediterna tar slut.
  - 6 publika platser, högst 3 per kontroll.
  - Ett nytt försök innan larm.
  - Larm via e-post, Slack och webhook. SMS och telefon ingår inte.
  - Rådata sparas i 7 dagar och aggregerad data i 30.
  - 1 användare.
- **Starter:** 24 USD i månaden vid årsbetalning.
- **CLI:**
  - Kontroller som TypeScript-konstruktioner (`ApiCheck`) och vanliga `*.spec.ts`-filer för `@playwright/test`.
  - Körs i molnet eller på egna platser.

**Kvalitet och underhåll:**
- checkly-cli: 96 ★, 1 024 commits, cirka 49 författare, 313 commits sedan årsskiftet. Version 10 är på väg (rc.2).
- Tjänsten är kommersiell och aktiv.
- Inga kända problem är sökta ⚠️.

**Det bästa vi kan ta:**
- **Extern vakt hos en annan leverantör** för startsidan med statiskt nyckelord, bokningslänken och certifikatet.
- **Dagligt formulärtest** med Playwright när sajten har formulär. Ett test om dagen för cirka 30 sajter ryms i 1 000 körningar.
- Kontrollskriptets prov (Playwright) kan bli spec-filer.
- Ett nytt försök innan larm.

**Var det hamnar hos oss:**
- Beslut: **senare: N3**.
- Förstahandsval när den första kundsajten publiceras.
- Står i `drift/verktyg.md` och `drift/overvakning.md`.

**Passar vår stack?** Ja. Playwright används redan i kontrollskriptet. Kontrollerna ska inte skriva i riktiga loggar: formulärtest märks och `/api/samtycke` prövas med ett anrop som inte skriver. Det kräver översättning från skriptets lokala server till produktionsadressen.

**Risker och flaggor:**
- Var datan lagras (EU eller USA) och om biträdesavtal finns är inte kontrollerat ⚠️.
- Hårt tak på gratisnivån: övervakningen stannar tyst när krediterna tar slut, och det måste i sig larma.
- Kommersiell tjänst som kan ändra villkoren.

**Inloggning:**
- Prissidan, CLI:t och dokumentationen är publika och lästa.
- Instrumentpanelen, larminställningarna och användningen syns bara inloggad.
- Johnny skapar kontot.
