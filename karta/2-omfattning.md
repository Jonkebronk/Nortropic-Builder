# Lager 2: Omfattning

**Status:** genomgånget med Johnny 2026-10-13.

## Vad byrån gör

Bestämmer vilka sidor och funktioner sajten ska ha, vilket innehåll som finns och vad som saknas, och vad som ryms i paketet.

## Vad som kommer ut

En sidkarta där varje sida har sitt innehåll och sina funktioner, prioriterad i måste, bör, kan och inte nu (MoSCoW). Tillvalen syns tydligt.

## Två spår

Alla verksamheter har inte en befintlig sajt (`BESLUT.md`, 2026-10-13). Intervjun väljer spår själv.

- **Utan sajt.** Underlaget kommer från intervjun, Google-profilen om den finns, Facebook eller Instagram, omdömen och Bolagsverket. Omfattningen utgår från en branschmall, justerad efter intervjun och de lokala konkurrenterna. Intervjun samlar mer råmaterial: bilder, ägarens egna ord och exempel på utförda jobb. Saknas en Google-profil skapas den vid lanseringen.
- **Med sajt.** Det som finns crawlas och inventeras, och det som fungerar behålls. Gamla adresser pekas om med 301 direkt till slutmålet, ligger kvar i minst ett år och skrivs i Cloudflares `_redirects`.

Toppuppgifterna tas fram genom triangulering, eftersom en enmansfirma inte kan låta hundratals kunder rösta: sökfraser i Google-profilen, teman i omdömena, konkurrenternas framlyfta tjänster och Search Console. Ägaren rangordnar sedan en kortlista på 10–15 uppgifter.

## Kompetens

- **Egen skill:** omfattningsskillen. Den bygger på Top Tasks med triangulering, MoSCoW enligt DSDM (Must sällan mer än 60 procent), NN/g:s innehållsinventering och Googles flyttregler, och för spåret med sajt på stegen Map och Observe ur ai-website-cloner-template.
- **Eget bibliotek:** branschmallarna, som måste byggas själva med nyckeln SNI 2025, Google-kategori, Places-typ och schema.org. Dessutom mallfunktionerna från webb-pro: förfrågan, bokning, hitta hit, nyhetsbrev, betallänk och språkväxlare.
- **Åtkomst vid kundbygget:** crawl4ai (självhostad), mcp-gsc för Search Console och sökfraser ur Google Business Profile.
- **Förankring:** McGovern (Top Tasks), Halvorson och Rach samt NN/g (innehållsinventering), DSDM (MoSCoW) och Google Search Central (flytt med URL-ändringar).

## Kontroll

Varje viktig besökaruppgift från strategin har en sida eller funktion. Varje sida har en källa till sitt innehåll. Omdirigeringskartan täcker alla gamla adresser med trafik. Allt detta kan kontrolleras automatiskt.

## Autonomi

AI:n föreslår omfattningen själv utifrån briefen. Kunden godkänner sidorna och tillvalen när de påverkar priset.

## Öppet

- Vilka branscher får mall först?
- Astros `redirects` blir meta refresh utan statuskod på en statisk sajt, så omdirigeringarna går via Cloudflare.

## Underlag

Rapporten, lager 2, `kunskap/research/2026-10-15_kompetensluckor-anteckningar/lager-1-2-strategi-omfattning.md`, `kunskap/research/2026-10-15_kompetensluckor-anteckningar/johnnys-lankar-ai-byggare.md` och inventeringen, lager 2.
