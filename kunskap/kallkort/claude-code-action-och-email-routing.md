# claude-code-action och Email Routing

**Källa:**
- https://github.com/anthropics/claude-code-action, HEAD `374f254` (2026-10-15), tagg `v1.0.251`. Läst 2026-10-16:
  - `README.md`
  - `docs/security.md` i sin helhet
  - `docs/usage.md`
  - `docs/capabilities-and-limitations.md`
  - de mest kommenterade öppna ärendena
- GitHub Docs, *Triggering a workflow*.
- Cloudflare Email Workers, via anteckningarna för lager 9 (2026-10-13) ⚠️. Sidan är inte omläst i dag.

**Licens:**
- claude-code-action: MIT. Upphovsrätts- och licenstexten följer med vid kopiering.
- Email Routing är en Cloudflare-tjänst.

**Vad det är:** En GitHub Action som kör Claude Code i ett repo när någon skriver `@claude`, när ett ärende tilldelas eller när ett flöde har en `prompt`. Tillsammans med Cloudflare Email Routing och en Email Worker kan kundens mejl bli ett GitHub-ärende, ärendet en gren med ändringen och grenen en förhandsversion som Johnny godkänner.

**Hur det fungerar:**
- **Lägen:** interaktivt (`@claude`) och automation (`prompt`, även schemalagt). Inställningar ges med `claude_args`, till exempel `--max-turns`, `--allowedTools` och `--model`.
- **Åtkomst:**
  - Bara användare med skrivrätt startar aktionen.
  - Botar startar den bara om de står i `allowed_bots`. Bot-namnen kontrolleras inte mot repots behörigheter.
  - `allowed_non_write_users` är märkt *RISKY*.
- **PR:**
  - I standardläget skapar aktionen en gren och en länk till PR:en, och en människa öppnar den.
  - Aktionen kan inte godkänna eller slå ihop en PR.
- **Konfiguration från basgrenen:** vid PR återställs `.claude/`, `CLAUDE.md`, `.mcp.json` och några till från basgrenen. Allt annat kommer från PR-grenen.
- **Ärendetext:** HTML-kommentarer, osynliga tecken och dolda attribut rensas, men *"new bypass techniques may emerge"*.
- **CI:** händelser från standard-`GITHUB_TOKEN` startar inga nya flöden, utom `workflow_dispatch` och `repository_dispatch`. Använd en token från en GitHub App (GitHub Docs).
- **Email Routing:**
  - En Email Worker tar emot mejl i `email()`.
  - Gratis på alla planer enligt researchen.
  - Kräver att domänens MX pekar på Cloudflare ⚠️ (härlett).

**Kvalitet och underhåll:**
- 9 530 ★, 821 commits, cirka 151 författare, 423 commits sedan årsskiftet.
- 477 öppna ärenden. De mest kommenterade är:
  - #443: valideringsfel i återanvända flöden
  - #892, #853: SDK-krascher före första API-anropet
  - #591: botkommentarer startar inte aktionen
  - #46: fel gren vid PR från fork
  - #944: tomma granskningar.
- Stabiliteten i automationsläget är alltså en risk.

**Det bästa vi kan ta:**
- Säkerhetsmodellen i `docs/security.md`: botar med namn, inte `allowed_non_write_users`, minimala `permissions`, inte `show_full_output`, inga obetrodda grenar i arbetskatalogen och nyckeln som hemlighet.
- Att aktionen inte kan godkänna sin egen ändring.
- Att CI kräver en GitHub App-token.

**Var det hamnar hos oss:**
- Skillen `drift`, `andringar.md` (*Det automatiska intaget*).
- Beslut: **senare: N4**. Det automatiska intaget är N4 i `guide/2-9-drift-och-forvaltning.md`.

**Passar vår stack?** Ja: GitHub, Workers Builds och Access. Men intaget kräver en egen mejladress som inte krockar med kundens mejl, en avsändarkontroll och en verktygsbegränsning till innehållsfilerna. Att begränsa med en sökvägsregel är inte prövat ⚠️.

**Risker och flaggor:**
- Prompt injection via kundens mejl. Spärrarna är avsändarkontrollen, verktygsbegränsningen och Johnnys grind.
- Kostnad: Actions-minuter plus API-tokens.
- En OAuth-token hänger på den som skapade den, så API-nyckel rekommenderas för organisationshemligheter (researchen).
- `show_full_output` kan läcka hemligheter i loggen.
- Krockar med regeln i `guide/bilaga-e-oppna-fragor.md`, fråga 2.8: ingen automatisk sammanslagning.

**Inloggning:**
- Repo och dokumentation är publika och lästa.
- Installationen kräver att Johnny installerar GitHub-appen och lägger in en Anthropic-nyckel som hemlighet.
- Email Routing kräver kundens Cloudflare-konto.
