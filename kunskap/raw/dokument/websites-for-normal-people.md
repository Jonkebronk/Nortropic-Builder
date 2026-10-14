---
titel: "Websites for Normal People – genomgång av flödet"
typ: dokument (Google Docs) — svensk genomgång av Sebastian Konings guide (2026)
url: https://docs.google.com/document/d/1JCZ9XB3wpij6xP1fMPOuX0hANezDWJeYLUy1sHy_brc/edit?tab=t.0
hamtad: 2026-10-14
kalla: "SAMMANFATTNING gjord vid hämtning (WebFetch, mobilvy) — INTE originaltexten. Kontrollera mot originalet innan något citeras."
---

# Websites for Normal People — sammanfattning av genomgången

## Grundprincip
Agenten gör allt; människan agerar bara där ett företag kräver en människa: betala (domän, Claude, Cloudflare), godkänna villkor (Google Analytics, Stripe), bevisa identitet (inloggning, auktorisering). DNS, databaser, e-postautentisering och analys är agentens uppgifter.

## Struktur
Fem delar, kapitel 00–14 plus 10½: Setup · Välj väg · Lansering · Efter lansering · De 14 klicken.

## Setup och kostnader
Claude Code (Opus 5.5), domän via Cloudflare Registrar, GitHub, Bitwarden Secrets Manager (nyckelvalv), bootstrap-token via Cloudflare API, en setup-prompt (65 rader). Kostnad ungefär: Claude 20 USD/mån, domän 10–15 USD/år, Cloudflare Workers 0 eller 5 USD/mån.

## Fyra vägar
A grundsajt (formulär, e-post, analys) · B med CMS (Payload) · C e-handel (Stripe Checkout) · D egna funktioner (bokning, evenemang, medlemskap, databaser).

## Arkitekturbeslut
1. Hemligheter i valv (Bitwarden); agenten läser och skriver utan att värdena syns i chatten
2. Bootstrap-mönster: kortlivad token skapar permanenta nycklar; deploy-token skild från token med full åtkomst (som stannar i valvet)
3. Innehåll skilt från design (markdown/datafiler) — omdesign utan att röra innehållet
4. Staging först (workers.dev); produktion kräver uttryckligt godkännande

## De 14 klicken (bilaga A)
Cloudflare + 2FA · domänköp · GitHub + 2FA · Claude Pro · Bitwarden-organisation · åtkomsttoken i systemets nyckelring · bootstrap-token till valvet · läget utan behörighetsfrågor · GitHub-auktorisering · e-postverifiering · Google-inloggning för analys · GA4-konto och villkor · Tag Manager och robotbehörighet · Stripe-konto och verifiering. Valfritt: Gmail-svar, Search Console.

## Kapitel i urval
- Formulär och e-post: Turnstile (spam), D1 (spara inskick först), Email Routing (ta emot), Email Service (skicka), SPF/DKIM/DMARC automatiskt
- CMS: Payload i sajten, blockbaserad redigering, utkast/publicera, D1 + R2
- E-handel: Stripe Checkout, produkter via API, webhook bekräftar betalning, ordrar i D1
- Egna funktioner: databas för bokningar, Durable Objects, köer, cron, Access för inloggning
- Analys före lansering: Google Cloud-projekt, servicekonto, GA4 + GTM (människan godkänner villkor), Search Console via DNS, Consent Mode v2 (banner bara i strikta regioner: EU/EES/UK/Schweiz/Québec), tag gateway på egen domän
- Lansering: egna domäner, HTTPS, checklista (trasiga länkar, titlar, Open Graph, Lighthouse 90+, schema.org), sitemap, 301 från gammal sajt
- Efter lansering: små ändringar med medium effort, omdesign med hög effort + ny brief + staging, CMS via admin, buggar: hitta grundorsaken först

## Jämförelser
Wix/Squarespace (brief slår mallar) · WordPress (CMS bara om någon redigerar) · Shopify mot Stripe Checkout (bevisa köpflödet: riktig betalning, nekat kort, avbruten kassa, lager, bekräftelse).

## Erbjudandet i guiden
2 000 USD för allt; en revideringsrunda; kod och konton i kundens namn; 500 USD per extra runda.

## Styrkor enligt genomgången
Hemligheter skilda från chatten · bootstrap-token minimerar exponering · CLAUDE.md gör kunskap beständig · staging som ritual · "spara först, mejla sedan" · innehåll skilt från design · ärlig grindvakt ("behöver du verkligen ett CMS?") · öppen om begränsningar · balanserade jämförelser.

## Förbehåll enligt genomgången
Beroende av en leverantör (Cloudflare) · beroende av en modellversion · bootstrap-token och bred redigeringsrätt kräver läget utan behörighetsfrågor · **ingen modell för att hålla isär hemligheter mellan flera personer eller sajter** · Gmail-svar osignerade (kräver lös DMARC) · samtyckesmodellen är kanadensisk (PIPEDA, Law 25) · priser och gränser ändras · "0 kr/mån" exkluderar Claude-prenumerationen.
