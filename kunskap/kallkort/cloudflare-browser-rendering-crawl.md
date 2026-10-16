# Cloudflare Browser Rendering /crawl

- **Källa:** Cloudflare, [Browser Rendering: /crawl endpoint](https://developers.cloudflare.com/browser-rendering/rest-api/crawl-endpoint/), läst 2026-10-16; [changelog 2026-03-10](https://developers.cloudflare.com/changelog/2026-03-10-br-crawl-endpoint) och [priser](https://developers.cloudflare.com/browser-rendering/pricing/) via `kunskap/research/2026-10-15_kompetensluckor-anteckningar/lager-1-2-strategi-omfattning.md`, W1.
- **Licens:** Cloudflares tjänst under deras villkor, betald per webbläsartid. Gratisplanen ger 10 minuter webbläsartid per dag; Paid 10 timmar i månaden och sedan 0,09 dollar per timme (lästa 2026-10-13).
- **Vad det är:** ett REST-anrop i Cloudflares Browser Rendering som crawlar en hel sajt från en startadress som ett jobb och ger sidorna som HTML, Markdown eller JSON.
- **Hur det fungerar:** hittar adresser ur sitemaps, länkar eller båda; `limit` högst 100 000 sidor (standard 10); ett jobb får köra i högst sju dagar; resultaten finns i 14 dagar. Följer robots.txt och `crawl-delay`, annars en halv sekund per domän; adresser som inte får crawlas listas som "disallowed". Kan inte ta sig förbi bot-skydd eller CAPTCHA. Under betan debiteras crawl utan rendering (`render: false`) inte. Gratiskonton har dessutom särskilda gränser för crawl.
- **Kvalitet och underhåll:** Cloudflares tjänst; lanserad i öppen beta 10 mars 2026. Sidan säger inte längre att hela tjänsten är beta, bara faktureringen.
- **Det bästa vi kan ta:** en crawl av kundens gamla sajt till inventeringen utan att installera något, hos samma leverantör som hostingen, med robots.txt respekterad.
- **Var det hamnar hos oss:** ett av verktygen att pröva i spår B, beskrivet i skillen `omfattning`, `verktyg.md`. Inte i N1.
- **Passar vår stack?** Ja: Cloudflare är vår hosting, och kundens konto finns redan när sajten publiceras. Kräver en API-nyckel med rätt behörighet.
- **Risker och flaggor:** gratisnivåns 10 minuter om dagen räcker för en liten sajt men inte för branschprofilernas 10–20 sajter. Kundens data lagras hos Cloudflare i 14 dagar; Cloudflare är redan underbiträde (`guide/2-2-omfattning.md`, *Avtal*). Resultat från Workers AI-driven Markdown kan avvika från sidan; jämför mot källan.
- **Inloggning:** kräver ett Cloudflare-konto och en API-nyckel. Dokumentationen är publik.
