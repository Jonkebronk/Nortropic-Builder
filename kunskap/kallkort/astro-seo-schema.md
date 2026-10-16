# astro-seo-schema

**Källa:** <https://github.com/codiume/orbit>, paketet `packages/astro-seo-schema/` (README och `package.json`, version 7.0.1), läst via GitHub-API 2026-10-16. Repot: push 2026-10-15.

**Licens:** MIT. Kräver att licenstexten följer med.

**Vad det är:** en Astro-komponent, `<Schema item={...} />`, som skriver ut JSON-LD i `<head>` med typkontroll från `schema-dts` och escaping av datan.

**Hur det fungerar:** man installerar `schema-dts` och `astro-seo-schema` och lägger `<Schema>` i sidans `<head>`; komponenten skriver `<script type="application/ld+json">` med datan escapad.

**Kvalitet och underhåll:** orbit-monorepot har 619 stjärnor, 1 öppet ärende och 22 bidragsgivare (GitHub-API 2026-10-16). README har ett stavfel i exemplet (`type="type="application/ld+json"`), men det gäller bara texten.

**Det bästa vi kan ta:** idén att typkontrollera JSON-LD med `schema-dts` vid bygget. Övningssajten escapar redan `<` i `Sida.astro` (rad 46) och behöver inte komponenten.

**Var det hamnar hos oss:** `släpp`. En egen komponent på några rader gör samma sak (inventeringens flagga), och övningssajten har den redan.

**Passar vår stack?** Ja, 0 kB JavaScript i webbläsaren.

**Risker och flaggor:** `peerDependencies` kräver `schema-dts` `^1.1.0`, medan senaste `schema-dts` är 2.1.0 (2026-10-02) – en versionskonflikt om vi tar in schema-dts 2 ⚠️ (inte prövad med npm).

**Inloggning:** krävs inte.
