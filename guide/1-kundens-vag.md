# 1. Kundens väg

**Status:** konsoliderad v1.0, 2026-10-15. Kundens väg är Johnnys beslut 2026-10-13 18:05; ordningen för riktningarna är beslutet 2026-10-15.

Johnny, 2026-10-13:

> Jag har hittat en fiktiv kund, jag intervjuar han utifrån min lokala AI som ställer de frågor som behövs för det kundunderlag vi behöver för att påbörja researchen och presentera 3 riktningar på hur hens hemsida kan se ut. Dessa presenteras, han tycker riktning 2 var bra, vi går vidare och bygger den, jag som human in the loop kommer in för granskning. Godkänner bygget och det går till klart med allt vad det innebär, seo etc

## Stegen

| # | Steg | Vad som händer | Vad Johnny ser och dömer | Lager |
|---|---|---|---|---|
| 1 | **Intervju** | En intervjuande AI samtalar med kunden med öppna frågor och fyller briefen och faktabasen. Saknas svar blir det frågor tillbaka till kunden, inte gissningar. | Briefen: stämmer bilden av verksamheten? | `2-1-strategi.md`, `2-7-innehall.md` |
| 2 | **Research** | Bransch, konkurrenter, vad kunderna söker, sidkarta (`sites/<namn>/sidkarta.md`) och sökord. Vid ombyggnad: den befintliga sajten fångas och mäts. | Sidkartan och söksträngarna | `2-1`, `2-2-omfattning.md`, `2-3-struktur.md` |
| 3 | **Tre riktningar** | Startsidan i tre stilkit, ur det egna sektionsbiblioteket. | **Johnny ser riktningarna först och kan stryka** (beslut 2026-10-15) | `2-4-skelett.md`, `2-5-yta.md` |
| 4 | **Kunden väljer** | Kunden ser de riktningar Johnny släppt och väljer en. | – | `2-5` |
| 5 | **Bygge** | Sajten byggs i Astro med biblioteket och det valda stilkitet; kontrollerna körs. Granskaren körs från byggplanens steg 4 (`5-byggplan.md`); i det första bygget dömer Johnny direkt. | Sajten i webbläsaren | `2-8-teknik-och-kvalitet.md`, `3-1`, `3-2` |
| 6 | **Johnnys granskning** | Johnny granskar och godkänner eller avvisar, med en kort motivering per avvisning. | Hela sajten | `3-2-granskning-och-kalibrering.md` |
| 7 | **Lansering** | Publicering på Cloudflare, SEO och lanseringskraven, kopplingar. Alltid efter Johnnys godkännande. | Den publicerade sajten | `2-8` |
| – | **Förvaltning, varje månad** | Schemalagda kontroller, ändringar, rapport till kunden med nordstjärnan. Det är det kunden betalar för. | Rapporten | `2-9-drift-och-forvaltning.md`, `4-foretaget.md` |

**Två spår** (beslut 2026-10-13 18:43): det finns inte alltid en befintlig sajt. Vid ombyggnad läggs fångst, före-mått och omdirigeringar till i steg 2 (`2-2-omfattning.md`).

## Vem gör vad

- **Kunden:** svarar i intervjun, väljer riktning, godkänner fakta och bilder som bara kunden kan ge, gör de mänskliga klicken (konton, avtal, betalning – `2-2-omfattning.md`).
- **Johnny:** art director från första minuten. Läser briefen, stryker riktningar, granskar bygget, godkänner publicering, beslutar om nya regler. Alla tillfällen där Johnny behövs står i `3-2-granskning-och-kalibrering.md`.
- **Claude:** allt annat – intervju, research, bygge, kontroller, granskning, publicering efter godkännande, förvaltning.

Claudes förslag 2026-10-13, inte beslutat: i första varvet svarar **en människa som verkligen känner verksamheten** på intervjun, inte en AI som spelar kund. Öppet – se `bilaga-e-oppna-fragor.md`.

## Tidsbudget

Johnnys skäl att börja om var att *"tiden det tar att bygga en hemsida är alldeles för lång"* (2026-10-13). Ingen tidigare plan hade en tidsbudget.

- [N1] **Tiden mäts per steg** – klocktid för hela steget och Johnnys egen tid för sig – i `sites/<namn>/progress.md` (`3-1-orkestrering-och-roller.md`). Johnny sätter budgeten efter den första sajten; till dess stannar flödet och frågar om ett steg tar mer än dubbelt så lång tid som Claude uppskattade innan steget började. 🔧
- [N2] **Budgeten per steg blir ett stoppvillkor** (`3-1`) och en del av eval: en sajt som blir bra men tar för lång tid är inte klar som produkt (`3-2`). 🔧

Öppet: budgeten per sajt – se `bilaga-e-oppna-fragor.md`.
