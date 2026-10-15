#!/usr/bin/env bash
# Startsäkringen: allt som byggsessionen använder uppdateras till senaste version innan arbetet börjar
# (BESLUT.md 2026-10-15, *Startsäkringen*). Körs från repots rot i byggsessionen: skript/startsakring.sh
# Skriptet skriver vad som ändrades, så att en uppdatering som förstör något går att spåra.

set -uo pipefail
ROT="$(cd "$(dirname "$0")/.." && pwd)"
andrat=()

rubrik() { printf '\n== %s\n' "$1"; }

# 1. Claude Code
rubrik "Claude Code"
fore="$(claude --version 2>/dev/null | awk '{print $1}')"
senaste="$(npm view @anthropic-ai/claude-code version 2>/dev/null)"
if [[ -n "$senaste" && "$fore" != "$senaste" ]]; then
  claude update >/dev/null 2>&1
  efter="$(claude --version 2>/dev/null | awk '{print $1}')"
  echo "uppdaterad: $fore -> $efter (gäller från nästa session)"
  andrat+=("Claude Code $fore -> $efter")
else
  echo "senaste: $fore"
fi

# 2. npm-projekten: biblioteket och varje sajt
for dir in "$ROT/bibliotek" "$ROT/skript" "$ROT"/sites/*/; do
  dir="${dir%/}"
  [[ -f "$dir/package.json" ]] || continue
  rubrik "npm: ${dir#"$ROT"/}"
  paket="$(node -e 'const p=require(process.argv[1]); console.log(Object.keys({...p.dependencies,...p.devDependencies}).join(" "))' "$dir/package.json")"
  [[ -n "$paket" ]] || { echo "inga beroenden"; continue; }
  fore_json="$(cd "$dir" && npm ls --depth=0 --json 2>/dev/null)"
  (cd "$dir" && npm install --save-exact --no-audit --no-fund $(for p in $paket; do printf '%s@latest ' "$p"; done) >/dev/null 2>&1) \
    || echo "⚠️ npm install misslyckades i $dir"
  efter_json="$(cd "$dir" && npm ls --depth=0 --json 2>/dev/null)"
  while IFS= read -r rad; do [[ -n "$rad" ]] && { echo "uppdaterad: $rad"; andrat+=("${dir#"$ROT"/}: $rad"); }; done < <(
    node -e '
      const a = JSON.parse(process.argv[1] || "{}").dependencies || {}, b = JSON.parse(process.argv[2] || "{}").dependencies || {};
      for (const k of Object.keys(b)) { const f = a[k] && a[k].version, e = b[k].version; if (f !== e) console.log(`${k} ${f || "ny"} -> ${e}`); }
    ' "$fore_json" "$efter_json")
  # Playwrights webbläsare följer Playwright-versionen
  if [[ -d "$dir/node_modules/playwright" ]]; then
    (cd "$dir" && npx --no-install playwright install chromium >/dev/null 2>&1) && echo "Playwrights Chromium: aktuell"
  fi
done

# 3. MCP-servrar
rubrik "MCP-servrar"
claude mcp list 2>&1 | sed -E 's/(Key|key|token|Token)[^ ]*:? *[^ ]+/\1 <dold>/g' | grep -v '^Checking' || true

# 4. Plugins och marknadsplatser
rubrik "Plugins"
if claude plugin list 2>&1 | grep -q 'No plugins installed'; then
  echo "inga plugins installerade"
else
  claude plugin marketplace update >/dev/null 2>&1 && echo "marknadsplatserna uppdaterade"
  claude plugin list 2>&1
  echo "⚠️ uppdatera varje plugin med: claude plugin update <namn>"
fi

# 5. Node
rubrik "Node"
echo "node $(node --version), npm $(npm --version)"

rubrik "Sammanfattning"
if ((${#andrat[@]})); then printf '%s\n' "${andrat[@]}"; else echo "allt var redan senaste version"; fi
