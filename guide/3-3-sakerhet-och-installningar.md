# 3.3 Säkerhet och inställningar

**Status:** konsoliderad v1.0, 2026-10-15; ommärkt efter granskningen samma dag. Utkast, inte genomgånget med Johnny.

Hur flödet hindras från att göra skada, och vilka inställningar, modeller och promptregler det körs med. Behörigheter per roll står i `3-1-orkestrering-och-roller.md`, säkerhetsgranskningen av sajten i `2-8-teknik-och-kvalitet.md`. Nycklar och kommandon är kontrollerade i 📄 `kunskap/research/2026-10-14_claude-code-verifiering.md` (*verifieringen*) om inget annat anges.

## Första sajten: tre saker

- [N1] **Bevakad körning.** Johnny följer bygget, och Claude Codes behörighetsfrågor är på – inget auto mode, inget läge som hoppar över frågorna, inga hooks. Skyddshook, designregelvakt och bevakning kommer i N2–N4. Varför: Bash-regler är enligt dokumentationen ingen säkerhetsgräns; `sh -c '…'` matchas inte av `Bash(rm *)` (verifieringen §7). Spärren i N1 är att Johnny ser vad som händer. Små steg (`BESLUT.md` 2026-10-13); webb-pro slutade med 61 skills och 67 krockar.
- [N1] **`permissions.deny` för push, publicering och `.env`** i projektets `.claude/settings.json`. Reglerna gäller huvudsessionen och alla delagenter. Push till huvudgrenen publicerar via Workers Builds, så push-förbudet är också ett publiceringsförbud (📄 `2026-10-14_cloudflare-stack.md`). Johnny loggar in med verktygens egna kommandon (`gh auth login`, `wrangler login`) och publicerar efter sitt godkännande (`5-byggplan.md`, steg 5). `.env` står i `.gitignore`, och inget hemligt får nå webbläsaren – det fångas av N1-kontroll 10 (`2-8-teknik-och-kvalitet.md`; fallgrop 141).

```json
{ "permissions": { "deny": [
  "Bash(git push *)",
  "Bash(wrangler deploy *)", "Bash(npx wrangler deploy *)",
  "Bash(wrangler versions deploy *)", "Bash(npx wrangler versions deploy *)",
  "Read(./.env)", "Read(./.env.*)"
] } }
```

  ` *` på slutet matchar också kommandot utan argument. En `Read`-regel spärrar även `Edit` och `Write` på sökvägen, men inte `grep -r` eller ett skript (verifieringen §7).
- [N1] **Byggsessionen avgränsas från användarnivån.** Byggets inställningar och skills ligger i projektets `.claude/`, inte i Johnnys globala, som påverkar alla hans projekt. Före första sajten kontrolleras med `/doctor` vilka skills, plugins och `CLAUDE.md` som laddas, och en körning med `claude --safe-mode` blir baslinje – det läget stänger av allt anpassat, också projektets egna skills och `CLAUDE.md` (verifieringen §9). Varför: `~/.claude/skills/` har i dag 292 skills plus plugins som laddas i alla projekt, bland dem gamla Nortropic- och webb-pro-skills; `nortropic-stack` föreskriver till exempel Next.js och Vercel, medan guiden bygger med Astro och Cloudflare. Johnnys `~/.claude/CLAUDE.md` har en regel för ett annat projekt (båda sett 2026-10-15). Användarnivån har också egna delagenter från det gamla Nortropic-flödet – bland dem `stack-builder` (Next.js 15 och Vercel), `design-reviewer`, `content-designer`, `qa-launcher`, `project-planner`, `seo-optimizer` och `nortropic-steward` – som erbjöds i sessionerna 2026-10-15. Ärvda `CLAUDE.md` laddas osynligt i varje tur (context-videon; fallgrop 132), och skillistan får 1 % av kontexten (`3-4-larande-och-underhall.md`, *Skills*). ⚠️ Hur användarnivåns skills och plugins stängs av för just byggsessionen, och om `/doctor` visar vilka som laddas, är inte verifierat – öppet, se `bilaga-e-oppna-fragor.md`, avsnitt 4.

## Hemligheter

I N1 räcker deny-reglerna, `.gitignore` och N1-kontroll 10 (ovan). Sajten har inga nycklar förrän formulär och kopplingar kommer (N2 och senare).

- [N2] **Hemligheter skrivs aldrig i flödets filer** – tillståndsfil, loggar, rapporter, brief, faktabas, källkod. Nycklar som sajten behöver sätts med `wrangler secret put` (📄 `2026-10-14_cloudflare-stack.md`); Stitch-inloggningen → `2-5-yta.md`. Varför: flödet committar utan att någon läser varje fil, och mönstersökning missar ett lösenord av vanliga ord (Agit-videon; fallgrop 26).
- [N2] **En API-nyckel per kund, begränsad till kundens eget Cloudflare-konto.** Kunden äger kontot, och byrån är inbjuden medlem med obligatorisk 2FA (📄 `2026-10-14_cloudflare-stack.md`; kontot → `2-8`, onboarding → `2-2-omfattning.md`). Nyckeln ligger utanför repot.
- [N2] **Inget hemligt i det som når webbläsaren** – allt i klientkoden går att inspektera (Ebbelaar-intervjun; fallgrop 141). Kontrollen är N1-kontroll 10 (`2-8`); regeln blir verklig när sajten får formulär och kopplingar.
- [N2] **Sökning efter nyckelformat före varje automatisk commit.** Träff ger ingen commit, och flödet stannar. Ett extra lager; huvudskyddet är reglerna ovan.
- [N3] **Nycklar per kund och syfte.** Ett kassaskåp med en samling per kund, så att en agent för kund A bara når kund A:s nycklar (fallgrop 124). En bred bootstrap-nyckel skapar avgränsade nycklar (publicering, Search Console, formulärmejl) och lämnar aldrig kassaskåpet. Ett skript skickar värdet direkt till verktyget, så att det aldrig syns i chatt, logg eller fil. 📄 *Websites for Normal People* (en källa – bänken); ⚠️ kassaskåpet är inte valt.

## Extern text är data

- [N2] **Instruktioner i externt innehåll följs inte** – referenssajter, konkurrenter, kundens dokument, allt i researchen. En dold rad som "ignorera dina instruktioner" rapporteras som fynd. Kundmaterial går in i brief och faktabas via intervjun och bekräftas (`2-1-strategi.md`, `2-7-innehall.md`), aldrig rakt in i agentinstruktioner. Varför: dold text, osynliga tecken och kodad text kan finnas i allt externt (Skill Spector-videon; fallgrop 99). Instruktion *(en källa – bänken)*. I N1 är spärren att Johnny tittar.
- [N2] Roller som läser externt skriver bara sin rapport och når inga hemligheter (`3-1`).

## Skyddshook

- [N2] **En `PreToolUse`-hook (`skydd.mjs`) blockerar det deny-reglerna inte kan uttrycka.** Exit 2 blockerar anropet och stderr blir skälet Claude får; deny-reglerna gäller vad hooken än svarar (verifieringen §6). Den är ett extra lager, inte en gräns – verklig isolering kräver sandlåda (nedan).

| Blockeras | Varför |
|---|---|
| Radering utanför den aktiva sajtens mapp | En mapp raderades innan innehållet kopierats (Jev-videon). Inuti mappen tillåts radering (fallgrop 10). |
| Skrivning utanför projektmappen | Arbete utanför uppgiften |
| Anrop som skickar data (`curl -X POST`, `curl -d`) till okända domäner | Dataläckage |
| Publicering, deploy, `git push` | Kräver Johnny |
| Bash-kommandon som skriver till låsta sökvägar (`echo > fil`) | Annars kringgås deny-regeln för `Edit` (låsningen → `3-1`) |
| Okända kommandon som kan ändra Git-historik, radera eller publicera | En osäker agent ska fråga, inte anta (CLAUDE.md-videon; fallgrop 115). Bara kända säkra varianter släpps. |
| [N3] Skrivande anrop mot kundens Google Business Profile | Det finns ingen roll med bara läsrätt (📄 `2026-10-14_stitch-och-verktyg.md`); ändringar går som förslag (`2-9`) |

- [N2] **Hooken ligger i projektets `.claude/settings.json`**, aldrig i ett plugins agentfiler: där ignoreras hooks (verifieringen §4; fallgrop 189). Plugin → `3-4`.
- [N2] **Läsförbud sätts med `permissions.deny`, inte med ignore-filer.** `.claudeignore` har ingen effekt och `.agentignore` finns inte (verifieringen §7; analysen M5). Byggarna läser aldrig kundens gamla sajt, referenserna, de dolda kontrollerna (var de ligger → `3-1`), `node_modules/` eller byggmappar.

## Designregelvakt

- [N2] **När sajtens `design.md` är låst kontrollerar skyddshooken varje skrivning i `src/`.** Färger (`#hex`, `rgb()`, `hsl()`) och typsnitt som inte finns i `design.md` blockeras, och Claude får veta vilket värde som bröt och vilka som är tillåtna. Variabler (`var(--…)`) släpps igenom; undantag för `transparent`, `currentColor` och SVG. Varför: modellen glider tillbaka till sina egna färger och typsnitt (Opus 5.5-videon; fallgrop 18). `design.md` kommer från det valda stilkitet (`2-5`). Slås på först efter prov på en verklig sajt. 🔧
- [N2] **Vakten blockerar bara det sajtens `design.md` listar under *Antimönster*** – ett typsnitt, ett ikonbibliotek, glassmorfism (designnivå-videon; fallgrop 109). Vakten har inga egna, globala förbud. Vilka antimönster ett kit har → `2-5-yta.md`; om Inter och Lucide ska vara standard i kiten är öppet – se `bilaga-e-oppna-fragor.md`, fråga 1.10. Det som inte går att söka fram blir granskningskriterier (`3-2`).
- [N2] **En `design.md` som byggaren själv fyller på kringgår vakten** (fallgrop 111); nya värden är förslag till Johnny (`3-4`).

## Sandlåda

- [N4] **Obevakade körningar går i en sandlåda**, en isolerad och kasserbar kopia av miljön som begränsar skadan av det ingen förutsåg: körningar över natten, parallella byggare (grenar, portar, beroenden), schemalagda förvaltningsagenter (`2-9`) och verktyg som läser externt innehåll och kod (REA, `bilaga-a-verktyg.md`). Varför: dokumentationen hänvisar till sandlåda för verklig isolering (verifieringen §7), och Simon Willison kör agentloopar i sandlåda (📄 `2026-10-15_kompetensluckor-anteckningar/flodet-loopar-bedomare.md` §5).
- [N2] **En granskning som kör målets kod gör det i en sandlåda utan nätverk** (📄 README för `cloudflare/security-audit-skill`; fallgrop 192). Granskningen → `2-8`.
- [N4] ⚠️ **Sandlådan är inte vald.** Fleet-videon (sponsrad av Docker) visar Docker Sandbox: en mikro-VM per sandlåda, och *clone mode* arbetar på en kopia av projektet.

## Meddelanden under bygget

- [N2] **Ett meddelande mitt i ett steg klassas:** *avbryt* ("stopp") – avsluta steget och vänta; *styr om* (rör det pågående steget) – tillämpa och logga; *köa* ("lägg till en kontaktsida senare") – lägg i tillståndsfilens inkorg till nästa kontrollpunkt. Varför: annars kan Claude börja arbeta på två saker samtidigt (Jev-videon; fallgrop 11). Instruktion *(en källa – bänken)*. I N1 pratar Johnny direkt med sessionen.

## Jev-verktygen

- [N4] **Ett Jev-verktyg prövas först när en mätbar regel visat sig otillräcklig**, och repot granskas före installation. Jev väljer (ja/nej, alternativ eller poäng, med säkerhetsvärde) men skriver ingen kod. Alla kräver en API-nyckel och skickar kod, åtgärder eller hela konversationen till en extern tjänst. 🎥 ⚠️ Kandidater (länkar i `bilaga-a-verktyg.md`): Jev Belay (stoppar "klar" utan bevis), Toolgate (riskbedömer åtgärder), Abide (`CLAUDE.md` som ja/nej-lista), Jev Browser, Jev Steer or Queue (klassar meddelanden), Compact Adviser, Quicksilver, Jev SEO. Jevs mönster – en snabb, billig domare före den dyra – går ofta att göra med ett skript.

## Monitor

- [N2] **Monitor bevakar dev-serverns utdata under ett byggsteg**, så att kompileringsfel och konsolfel syns direkt. Monitor kör ett kommando i bakgrunden och matar varje rad till Claude, har Bashs behörighetsregler, slutar efter 5 minuter som standard och högst 30 (10 icke-interaktivt) och kräver Git Bash på Windows (verifieringen §3). Finns i 2.1.281.
- [N4] **Avvikelser i obevakade körningar ger en varning, inte ett stopp:** skrivförsök utanför tillåtna filer, upprepade misslyckade verktygsanrop, rundor som inte tar slut, ovanlig tokenåtgång, konsolfel och modellbyte. Varningen går till Johnny och flödespanelen (`3-5-live-visning.md`); stoppet sköts av kontrollerna och rundtaket (`3-1`). Funktionsvideon (en källa); fallgrop 91. Tidsgränsen gör att längre bevakning måste startas om (härlett).

## Inställningar

Projektets settings används där det går (*Första sajten* ovan). Vissa nycklar verkar bara i användarens `~/.claude/settings.json` (analysen M6). Johnnys användarinställning i dag: `model: "opus[1m]"`, `effortLevel: "xhigh"`, inga `permissions` (verifieringen §8).

| Inställning | Nyckel och scope | Nivå och värde |
|---|---|---|
| Timeout för frågor | `askUserQuestionTimeout`: `"60s"`, `"5m"`, `"10m"`, `"never"` (standard). **Bara användar- eller organisationsscope**; per session `CLAUDE_AFK_TIMEOUT_MS`. Behörighetsfrågor löses aldrig automatiskt. | Förslag: standardvärdet `never` så länge Johnny tittar – inget ställs in. [N4] förslag: kort värde obevakat, valet loggas som antagande. Öppet – se `bilaga-e-oppna-fragor.md`, avsnitt 3. Planens godkännande går aldrig på timeout (`3-2`). Fallgrop 14. |
| Auto mode | `permissions.defaultMode: "auto"` **bara i användarens settings**; `autoMode` användar- eller organisationsscope | [N2] förslag: efter några bevakade sajter. Öppet – se `bilaga-e-oppna-fragor.md`, avsnitt 3. |
| Effort | `effortLevel`, `maxEffortLevel`, `modelSettings`, `/effort`; per agent `effort` i frontmatter; `CLAUDE_CODE_EFFORT_LEVEL` går före allt | Nedan |
| Modell | `model`, `fallbackModel`, `advisorModel`; per agent `model` (`sonnet`, `opus`, `haiku`, `fable`, id, `inherit`); `CLAUDE_CODE_SUBAGENT_MODEL` och `…_FORCE` tvingar alla delagenter | [N2] Tvinga inte alla delagenter till en billig modell – det försvagar granskarna |
| Säkert läge | `claude --safe-mode` stänger av `CLAUDE.md`, skills, plugins, hooks och MCP | Baslinje för avgränsningen (*Första sajten*) och vid rensning (`3-4`) |
| Lokala notiser | `/config` 🎥 | [N2] på |
| Färre frågor | Skillen `fewer-permission-prompts` (sett i skillistan 2026-10-15) tillåter läsande kommandon i projektets settings | [N2]; ersätter inte deny-reglerna |
| Plan på stark modell, bygge på billigare | "Opus plan" i `/model` 🎥 ⚠️ | [N2]; två källor (analysen §4.3) |
| Stäng av claude.ai-connectors och artifacts, spara planer i projektet; sessioner som pratar med varandra, *fork*, *branch* | 🎥 ⚠️ ej verifierade | [N2] respektive [N4] |

## Effort och modeller

I N1 körs huvudsessionen och granskaren med Johnnys standardinställning; inget ställs in per roll. Reglerna nedan gäller när rollerna blir fler.

- [N2] **Börja på high och sänk en roll först när en mätning visar att kvaliteten håller** (📄 Anthropic, *Effort*: "Start with high, the default"). Rättar v0.74:s "låg effort för alla", som byggde på en CodeRabbit-siffra via Fable-videon (analysen M2).
- [N2] **Taket prövas, det antas inte.** Fable 5-videon: xhigh och max ger samma som high på Fable 5 (fallgrop 39, 88). 4 Ways-videon kör xhigh för animationer, för färre rundor. Båda är en källa; mät rundor, kostnad och Johnnys dom per roll.
- [N4] Effort kan bytas per meddelande med cachen kvar på bl.a. Fable 5.1 och Opus 5.5 (📄 *Effort*). ⚠️ Beta; hur det syns i Claude Code är inte verifierat.

| Roll | Nivå | Modell | Effort | Källa |
|---|---|---|---|---|
| Byggare (huvudsessionen) | N2 | Johnnys standard | high; Johnnys inställning är xhigh tills han ändrar den | 📄 *Effort* |
| Granskare | N2 | Som byggaren eller starkare (smak) | high | 🔧 |
| Roller som söker: intervju, research, spanare, faktakontroll, lagkrav | N2 | Spanaren billigare | aldrig under medium; under high med sökinstruktionen | 📄 *Prompting Claude Fable 5.1*; fallgrop 146 |
| Rättare | N2 | Billigare (+ advisor) | high, sänks efter mätning | 🔧 |
| Säkerhetsgranskare | N2 | Starkaste | high | Fable 5-videon (instruktion); fallgrop 89 |
| Förvaltningens ändringar | N3 | – | medium för små, high för omdesign | 📄 *Websites for Normal People* (en källa) |
| Domare för riskbeslut | N4 | Stark | high | Goal Buddy-videon |

- [N2] **Modell efter förmåga:** smak (riktningar, stilkit, designgranskning), intelligens (kod, kontroller, säkerhet), billigt (rutin). Fable 5-videon; instruktion, en källa.
- [N4] **Advisor.** En byggare eller rättare som kört fast frågar först en starkare modell och går till Johnny bara om det inte hjälper; frågan loggas med rollen `advisor` (fallgrop 90). `/advisor [modell|off]`, `advisorModel`, av med `CLAUDE_CODE_DISABLE_ADVISOR_TOOL=1`. Experimentell, kräver Anthropics API och en rådgivare minst lika kapabel som huvudmodellen (verifieringen §9).
- [N4] **Astra är en eval-kandidat, inget mer.** "Den nya designkungen" (Astra-videon) är en persons smak utan jämförelse på lika villkor; samma kanal utsåg Fable 5.1 veckor tidigare. Prövas för byggande och animering när eval finns (`3-2`), efter kontroll av OpenAI:s villkor, dataskydd och kostnad. Fallgrop 165.
- [N2] **Modellbyte loggas och varnar – blockerar inte.** Fable-videon säger att Claude Code tyst byter till en svagare modell när en säkerhetsspärr slår till; det är en andrahandsanekdot ⚠️ (analysen §4.2; fallgrop 37). Modellen loggas per varv i resultatloggen (`3-2`), en `PostModelSwitch`-hook kan lägga en varning i kontexten (verifieringen §6), och Monitor varnar. Risken är störst i ämnen som spärrarna täcker (vård, säkerhet, biologi); notera det i briefen.
- [N2] **Kostnaden mäts.** Fable-videon: cacheläsning 75 % billigare men ~1,7 gånger mer utdata, ~20 % dyrare per uppgift (Artificial Analysis) ⚠️. Tid och kostnad per steg → `1-kundens-vag.md`.

## Promptregler

Standardtext till byggare, rättare och orkestrerare när de blir delagenter, inte till granskare. I N1 pratar Johnny direkt med huvudsessionen. Fable-videon om inget annat anges.

| Nivå | Regel | Varför |
|---|---|---|
| [N2] | "Ändra bara filerna i uppdraget. Ser du ett problem utanför, nämn det i slutet." | Modellen rättar annars sådant i närheten (fallgrop 35). |
| [N2] | "Bygg inte mer än uppdraget kräver. Välj den enklaste lösningen som fungerar." | Karpathys regler (Variate-videon) och 📄 Anthropic, *Prompting Claude Fable 5*: "Don't add features, refactor, or introduce abstractions beyond what the task requires". Fallgrop 43. |
| [N2] | "Innan du rapporterar framsteg: granska varje påstående mot ett verktygsresultat från den här sessionen. Rapportera bara det du kan belägga, och säg vad som inte är verifierat." | Tog nästan helt bort påhittade statusrapporter i Anthropics tester (📄 *Prompting Claude Fable 5*). Mekanismen → `3-1`. |
| [N2] | "Redigera den del som behöver ändras; skriv inte om hela filen." | Sparar utdatatokens och håller diffen liten (fallgrop 36). |
| [N2] | "Skriv vad du förväntar dig innan du kör kontrollerna; jämför sedan." | *Förutsäg, kör, jämför* (Karpathy-videon). Instruktion, en källa. |
| [N2] | "Känner du inte säkert igen ett namn, eller känner igen det från ett område som ändras snabbt: sök innan du svarar." | För sökande roller under high (📄 *Prompting Claude Fable 5.1*). |
| [N4] | "Ingen övervakar den här körningen. Fortsätt med allt som täcks av uppdraget, så länge det går att ångra." | Bara obevakat: modellen stannar annars och frågar (fallgrop 34). Med Johnny närvarande är den fel. |

Faktaregeln, tillgjord prosa och AI-signaturer i text → `2-7-innehall.md`.

## Versioner och installation

Claude Code 2.1.281 räcker för första sajten (senaste 2.1.300 vid kontrollen 2026-10-14). `claude update` behövs för `/doctor prompt-audit` (2.1.283) och mods (2.1.287); `LAGE.md` tar upp det. Astro, Playwright och Wrangler → `2-8`. Stitch-CLI:t (Node ≥ 20, inloggning) när stilkit tas fram → `2-5`. Skills, `/init` och `CLAUDE.md` → `3-4-larande-och-underhall.md`.
