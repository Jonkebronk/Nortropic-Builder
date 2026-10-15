# Lager 9: Drift och förvaltning

**Status:** utkast ur rapporten, inte genomgånget med Johnny.

Förvaltningen är produkten (`BESLUT.md`, 2026-10-13). En sajt byggs en gång men förvaltas varje månad för varje kund. Står alla kunder på samma grund når en rättelse alla på en gång.

## Delarna

- **Dataåtkomst:** Cloudflares officiella MCP `cloudflare/mcp`, med en läs-token för rapport och övervakning och en smal token för DNS och deploy. Search Console via mcp-gsc. Google Business Profile via en egen tunn klient mot det officiella API:t.
- **Övervakning:** UptimeFlare på Workers plus en extern vakt, Uptime Kuma, som också bevakar när domänen går ut. Formuläret testas dagligen hela vägen till inkorgen.
- **Analys:** Cloudflare Web Analytics, efter en integritetsbedömning per kund.
- **Uppdateringar:** Renovate med ett delat preset, gruppering, automatisk merge bakom gröna kontroller och sju dagars karenstid. Säkerhetsuppdateringar går igenom direkt.
- **Ändringsflödet:** kundens mejl eller SMS blir ett ärende, claude-code-action gör en PR, Workers Builds visar en förhandsversion bakom Cloudflare Access, och Johnny godkänner. Innehållet ligger i Astros content collections med scheman, och `wrangler rollback` återställer.
- **Månadsrapporten:** den 4:e varje månad, på klarspråk. Huvudmåttet är kontakter från Google-profilen, och rapporten tar också upp drifttid, ändringar och synlighet i sök.

## Förvaltningsmodellen

- Varje kundsajt är ett förvaltningsobjekt. Kunden är objektägare, Johnny förvaltningsledare och agenterna förvaltningsgrupp (pm3, via offentliga anpassningar).
- Standardändringar är förhandsgodkända och godkänns av kontrollerna. Normala ändringar godkänns av Johnny, och akuta ändringar får en snabbare väg (ITIL 4).
- Få tjänstenivåer och bara larm som kräver åtgärd (SRE). Lätta godkännanden och automation i stället för tunga godkännandesteg (DORA).
- Föreslagna nivåer: tillgänglighet på minst 99,9 procent per månad, dagligt formulärtest och standardändringar och kritiska säkerhetsuppdateringar inom två arbetsdagar.

## Autonomi

Övervakning, uppdateringar och standardändringar går självgående. Normala ändringar och allt som kunden ser först väntar på Johnny.

## Öppet

Flaggor (tolkning, inte juridisk rådgivning):

- Nortropic är sannolikt personuppgiftsbiträde åt kunderna, med Cloudflare, GitHub, Anthropic, Resend och 46elks som underbiträden.
- Kundmejl, SMS och omdömen är otrustad indata. Skydden är en avsändarlista, att ändringar bara får göras i `src/content/`, och Johnnys godkännande för allt utanför standardkatalogen.

## Underlag

Rapporten, lager 9, `kunskap/research/2026-10-15_kompetensluckor-anteckningar/lager-9-drift-forvaltning.md` och inventeringen, lager 9.
