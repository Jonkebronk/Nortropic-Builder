---
titel: "The $10K Website Kit: How Claude Builds an Agency-Quality Site for Your Business"
typ: dokument (Google Docs)
url: https://docs.google.com/document/u/0/d/1j0YZ7NpPmAE780Pr3NElacKrN0OsV6QTdr9tYYbOEH8/mobilebasic
hamtad: 2026-10-14
kalla: "SAMMANFATTNING gjord vid hämtning (WebFetch) — INTE originaltexten. Kontrollera mot originalet innan något citeras."
---

# The $10K Website Kit — sammanfattning

## Grundidé
"Claude is like a brilliant junior developer with zero design taste." Lösningen är fem komponenter:
1. Claude Code (CLI)
2. Taste Skill (Leonxlnx) — art director, designriktning
3. Impeccable (Paul Bakaus) — senior designer, 24 granskningskommandon
4. Emil Kowalskis skills — rörelse (14 skills)
5. Figma MCP + Playwright MCP — designintegration och QA

## Installation (enligt dokumentet)
- Taste: `npx skills add https://github.com/Leonxlnx/taste-skill --skill "design-taste-frontend" -g -a claude-code`
- Impeccable: `npx impeccable install`, verifiera med `/impeccable init`
- Emil: `npx skills add emilkowalski/skills --skill emil-design-eng --skill animate --skill review-animations --skill improve-animations --skill break-ui -g -a claude-code`
- Figma: `claude plugin install figma@claude-plugins-official` (gratisplan: 6 verktygsanrop/månad)
- Playwright: `claude mcp add --scope user playwright -- npx @playwright/mcp@latest`

## Nio prompter
1. Designriktning (Taste): brief → tre riktningar med typsnitt, färger, layout, rörelsenivå → `DIRECTION.md`
2. Hela bygget: Home, About, Services, Contact; ren HTML/CSS/JS; 375–1440 px; Netlify Forms; rörelse under 300 ms, respekterar reduced motion; platshållare för bilder med mått
3. Revideringar med före/efter-skärmdumpar (Playwright)
4. Designgranskning (Impeccable): critique, audit, layout, typeset, polish
5. Rörelsegranskning: improve-animations, sedan review-animations
6. Playwright-testloop: skärmdumpar 1440 och 375 px, klicka allt, testa formulär, konsolfel, `break-ui` för värsta innehåll, upprepa tills noll fel
7. SEO-grunder: unik titel och metabeskrivning per sida, delningsbild, sitemap.xml, robots.txt, LocalBusiness-schema, alt-texter
8. Byt platshållare: beskär, WebP under 200 KB, alt-text
9. Figma (valfritt)

Autopilot: en prompt som kör hela kedjan med git-commit efter varje steg.

## Lansering
Netlify Drop (dra mappen), aktivera formulärdetektering, egen domän.

## Emils animationsregler
1. Ease-out för in- och utgångar
2. Under 300 ms
3. Knappar skalas till ca 0,97 vid tryck
4. Popup-fönster börjar på 0,9–0,95, aldrig noll
5. Animera från klickpunkten
6. Animera inte element som används ofta
7. 2 px blur för att dölja grova övergångar

## Tips och vanliga misstag
- Referera till specifika sajter snarare än adjektiv; Taste har reglage (variation, rörelseintensitet, visuell täthet 1–10)
- Kör critique före polish; spara beslut i `DIRECTION.md` och `PRODUCT.md`; månatlig hälsokontroll med Playwright
- Installera bara från exakta GitHub-adresser — npm-paketet "taste-skill" är från en annan upphovsperson
- Inga studsande eller elastiska kurvor; glöm inte testa kontaktformuläret
