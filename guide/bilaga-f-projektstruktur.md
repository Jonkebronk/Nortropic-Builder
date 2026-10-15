# Bilaga F – projektstruktur

**Status:** konsoliderad v1.0, 2026-10-15. Sammanställd ur sökvägarna i guidens filer; ersätter v0.74 §3. Det som inte finns än är märkt med nivå. Förslag 🔧 tills första sajten byggts.

## Två slags repon

1. **Byggrepot** (det här, Nortropic-Builder): guiden, biblioteket, stilkiten, skills och företagets filer. Inga kunduppgifter och inga hemligheter (`CLAUDE.md`).
2. **Ett privat repo per kundsajt**: sajtens kod och dess arbetsfiler. Det kopplas till kundens eget Cloudflare-konto med Workers Builds (`2-8-teknik-och-kvalitet.md`). Lokalt klonas det till `sites/<namn>/`, som byggrepots `.gitignore` utesluter – kunduppgifter hamnar aldrig i byggrepot.

## Byggrepot

```
Nortropic-Builder/
├── CLAUDE.md                 arbetsregler för sessioner som utvecklar byggsystemet
├── LAGE.md                   läget och överlämningen
├── BESLUT.md                 Johnnys beslut, ordagrant
├── README.md
├── guide/                    guiden v1.0
├── bibliotek/                [N1] eget Astro-projekt: komponenter, layout, sektioner, mallar,
│   │                         provsida (2-4-skelett.md)
│   └── stilkit/              [N1] stilkiten med tokens, design.md och wireframe-kitet (2-5-yta.md)
├── mallar/                   [N1] briefmall och kärnfrågor (2-1-strategi.md), fakta.md-mall
│                             (2-7-innehall.md), granskningsmall från steg 4 (3-2)
├── skript/                   [N1] kontrollskriptet (Playwright) med N1-kontrollerna, byggs i steg 3
│                             (2-8-teknik-och-kvalitet.md, bilaga-c-kontroller.md)
├── foretag/                  [N2] erbjudande.md, profil, kvitton.md, vanliga frågor (4-foretaget.md)
├── kunskap/
│   ├── kallor.md             källistan
│   ├── raw/                  videotranskript och dokumentsammanfattningar (bara internt)
│   ├── research/             researchrapporter
│   └── wiki/                 [N2] kunskapsbasen, en fil per begrepp (3-4-larande-och-underhall.md)
├── inventering/              kompetensinventeringen
├── historik/                 v0.74, ändringsloggen, kartan och principerna före v1.0, webb-pro
├── konsolidering/            skrivregler och spårbarhet för v1.0
├── mattstock/                Johnnys måttstock: metod, urval, domar och måttstocken (3-2)
├── .claude/
│   ├── settings.json         [N1] permissions.deny för push, deploy och .env (3-3)
│   ├── skills/               [N1] egna skills (bilaga B); Stitchs agent-skills skriver till
│   │                         .agents/skills – kopieras hit (3-4)
│   ├── hooks/                [N2] grind-stopp.mjs m.fl. (3-1)
│   └── workflows/            [N4] arbetsflöden (3-1)
└── .gitignore                bl.a. sites/, .env, nycklar
```

## En kundsajt (`sites/<namn>/`, eget privat repo)

```
sites/<namn>/
├── CLAUDE.md                 [N2] bara det sajtspecifika (3-4)
├── brief.md                  [N1] briefen (2-1-strategi.md)
├── fakta.md                  [N1] faktabasen med källa per faktum; från N3 en mapp fakta/ med en fil per faktum (2-7)
├── sidkarta.md               [N1] sidkartan som tabell (2-3-struktur.md)
├── design.md                 [N1] valt stilkit och eventuella sajtregler (2-5)
├── onboarding.md             [N1] konton, avtal och lagkrav (2-2-omfattning.md)
├── progress.md               [N1] läget och tid per steg (1-kundens-vag.md, 3-1)
├── state.json                [N2] flödets läge i maskinläsbar form: steg, varv, blocked, bevis (3-1)
├── overlamning/<steg>.md     [N2] överlämning mellan steg (3-1)
├── kontroller/               [N2] sajtspecifika körbara kontroller; N1-kontrollerna körs med skript/ (3-1, 3-2)
├── reviews/                  [N1] granskarens rapporter, från byggplanens steg 4 (3-2)
├── domar.jsonl               [N1] Johnnys domar med motivering – kalibreringsdata (3-2)
├── src/                      [N1] sajtens kod: kopia av biblioteket (med versionen i state.json)
│                             och sajtens sidor och innehåll (2-4, 2-8)
├── public/_headers           [N1] säkerhetsheaders för statiska sidor (2-8)
├── checkpoints.json          [N2] funktionslistan där bara passes och bevis ändras (3-1)
├── resultat.jsonl            [N2] resultatlogg per runda (3-2)
├── beslutskarta.md           [N2] beslut med motivering (2-1)
├── larande-forslag.md        [N2] förslag till lärdomar, ändrar inget (3-4)
├── befintlig/                [N1 vid ombyggnad] fångad sajt, urler.md, integrationer.md (2-2)
├── andringar/ko.md           [N3] ändringskön (2-9-drift-och-forvaltning.md)
└── forvaltning/              [N3] rapporter och schemalagda kontroller (2-9)
```

**Dolda kontroller** [N4] ligger inte i kundsajtens repo utan utanför byggarens arbetskatalog och körs av orkestreraren (`3-1-orkestrering-och-roller.md`).

Öppet: var flödets egen `CLAUDE.md` för sajtbyggande agenter ska ligga (`bilaga-e-oppna-fragor.md`).
