#!/usr/bin/env bash
# Startsäkringen: allt som byggsessionen använder uppdateras till senaste version innan arbetet börjar
# (BESLUT.md 2026-10-15, *Startsäkringen*; utökad 2026-10-16 efter Johnnys "allt ska ju ingå i vår startsäkring också").
# Körs från repots rot i byggsessionen: skript/startsakring.sh
# TORRT=1 skript/startsakring.sh visar vad som skulle uppdateras utan att ändra något.
# Skriptet skriver vad som ändrades, så att en uppdatering som förstör något går att spåra, och bygger
# biblioteket och sajterna efteråt, så att ett trasigt beroende syns direkt och inte mitt i arbetet.

set -uo pipefail
ROT="$(cd "$(dirname "$0")/.." && pwd)"
TORRT="${TORRT:-}"
andrat=()
varningar=()

rubrik() { printf '\n== %s\n' "$1"; }
varna() { echo "⚠️ $1"; varningar+=("$1"); }

# 1. Claude Code
rubrik "Claude Code"
fore="$(claude --version 2>/dev/null | awk '{print $1}')"
senaste="$(npm view @anthropic-ai/claude-code version 2>/dev/null)"
if [[ -n "$senaste" && "$fore" != "$senaste" ]]; then
  if [[ -n "$TORRT" ]]; then echo "skulle uppdateras: $fore -> $senaste"
  else
    claude update >/dev/null 2>&1
    efter="$(claude --version 2>/dev/null | awk '{print $1}')"
    echo "uppdaterad: $fore -> $efter (gäller från nästa session)"
    andrat+=("Claude Code $fore -> $efter")
  fi
else
  echo "senaste: $fore"
fi

# 2. Verktygen i Homebrew som skripten använder: gh (push), git, Node (LTS-linjen), Python och poppler (pdftotext).
#    Node hålls på den LTS-linje som är installerad (node@<major>), eftersom bygget och Cloudflare följer LTS;
#    en nyare LTS-linje rapporteras och byts efter beslut.
rubrik "Homebrew"
if command -v brew >/dev/null 2>&1; then
  formler="gh git poppler python@3.12 uv $(brew list --formula 2>/dev/null | grep -E '^node@[0-9]+$' | tr '\n' ' ')"
  brew update >/dev/null 2>&1
  gamla="$(brew outdated --formula --quiet $formler 2>/dev/null)"
  if [[ -z "$gamla" ]]; then echo "senaste: $formler"
  elif [[ -n "$TORRT" ]]; then echo "skulle uppdateras: $(echo "$gamla" | tr '\n' ' ')"
  else
    brew upgrade $formler >/dev/null 2>&1
    # brew kan avsluta med fel trots att formlerna uppgraderades (t.ex. vid länkning), så resultatet läses av igen.
    kvar="$(brew outdated --formula --quiet $formler 2>/dev/null)"
    while IFS= read -r f; do
      [[ -z "$f" ]] && continue
      if grep -qx "$f" <<< "$kvar"; then varna "brew upgrade misslyckades för $f"; else echo "uppdaterad: $f"; andrat+=("brew: $f"); fi
    done <<< "$gamla"
  fi
  nodmajor="$(node --version | sed -E 's/^v([0-9]+).*/\1/')"
  lts="$(curl -s --max-time 10 https://nodejs.org/dist/index.json | node -e 'let s="";process.stdin.on("data",d=>s+=d).on("end",()=>{try{const v=JSON.parse(s).find(x=>x.lts);console.log(v?v.version.replace(/^v(\d+).*/,"$1"):"")}catch{console.log("")}})')"
  [[ -n "$lts" && "$lts" -gt "$nodmajor" ]] && varna "Node $nodmajor används, men LTS är nu $lts. Byt till node@$lts efter beslut."
else
  echo "Homebrew saknas, hoppar över"
fi

# 3. npm-projekten: biblioteket, skripten, måttstockens verktyg och varje sajt.
#    Alla paket försöker gå till @latest på en gång. Krockar peer-kraven (till exempel TypeScript som är nyare än
#    vad @astrojs/check godtar) uppdateras paketen ett i taget, och det som inte går står kvar och rapporteras.
#    @types/node följer Node-versionen som används, inte den senaste.
for dir in "$ROT/bibliotek" "$ROT/skript" "$ROT/mattstock/verktyg" "$ROT"/sites/*/; do
  dir="${dir%/}"
  [[ -f "$dir/package.json" ]] || continue
  rubrik "npm: ${dir#"$ROT"/}"
  paket="$(node -e 'const p=require(process.argv[1]); console.log(Object.keys({...p.dependencies,...p.devDependencies}).join(" "))' "$dir/package.json")"
  [[ -n "$paket" ]] || { echo "inga beroenden"; continue; }
  # Paket som hålls på en huvudversion tills ett annat paket stöder nästa. Skälet rapporteras vid varje körning, så att det
  # inte glöms bort. TypeScript 7 stöds inte av astro check (startsäkringen 2026-10-16: bygget föll med typescript 7.0.2).
  hall() { case "$1" in typescript) echo 6 ;; esac; }
  hallskal() { case "$1" in typescript) echo "astro check stöder inte TypeScript 7" ;; esac; }
  mal() { if [[ "$1" == "@types/node" ]]; then printf '@types/node@%s' "$(node --version | sed -E 's/^v([0-9]+).*/\1/')"; elif [[ -n "$(hall "$1")" ]]; then printf '%s@%s' "$1" "$(hall "$1")"; else printf '%s@latest' "$1"; fi; }
  for p in $paket; do [[ -n "$(hall "$p")" ]] && varna "${dir#"$ROT"/}: $p hålls på version $(hall "$p") ($(hallskal "$p")); senaste är $(npm view "$p" version 2>/dev/null)"; done
  if [[ -n "$TORRT" ]]; then (cd "$dir" && npm outdated 2>/dev/null) || true; continue; fi
  [[ -d "$dir/node_modules" ]] || (cd "$dir" && npm install --no-audit --no-fund >/dev/null 2>&1)
  fore_json="$(cd "$dir" && npm ls --depth=0 --json 2>/dev/null)"
  if ! (cd "$dir" && npm install --save-exact --no-audit --no-fund $(for p in $paket; do mal "$p"; printf ' '; done) >/dev/null 2>&1); then
    for p in $paket; do
      (cd "$dir" && npm install --save-exact --no-audit --no-fund "$(mal "$p")" >/dev/null 2>&1) \
        || varna "${dir#"$ROT"/}: $p kan inte gå till senaste version (krav från ett annat paket); står kvar"
    done
  fi
  efter_json="$(cd "$dir" && npm ls --depth=0 --json 2>/dev/null)"
  while IFS= read -r rad; do [[ -n "$rad" ]] && { echo "uppdaterad: $rad"; andrat+=("${dir#"$ROT"/}: $rad"); }; done < <(
    node -e '
      const a = JSON.parse(process.argv[1] || "{}").dependencies || {}, b = JSON.parse(process.argv[2] || "{}").dependencies || {};
      for (const k of Object.keys(b)) { const f = a[k] && a[k].version, e = b[k].version; if (f !== e) console.log(`${k} ${f || "ny"} -> ${e}`); }
    ' "$fore_json" "$efter_json")
  # Playwrights webbläsare följer Playwright-versionen: Chromium för proven och WebKit för Safari-proven.
  if [[ -d "$dir/node_modules/playwright" ]]; then
    (cd "$dir" && npx --no-install playwright install chromium webkit >/dev/null 2>&1) && echo "Playwrights Chromium och WebKit: aktuella" || varna "Playwrights webbläsare kunde inte installeras i ${dir#"$ROT"/}"
  fi
done

# 4. MCP-servrar. Servrar som startas med npx och @latest hämtar senaste version vid varje start; versionen visas här.
#    Fjärrservrar (http) är alltid senaste hos leverantören. Nycklar och token döljs i utskriften.
rubrik "MCP-servrar"
claude mcp list 2>&1 | sed -E 's/(Key|key|token|Token|Bearer)[^ ]*:? *[^ ]+/\1 <dold>/g' | grep -v '^Checking' || true
for p in $(claude mcp list 2>/dev/null | grep -oE 'npx -y [^ ]+@latest' | awk '{print $3}' | sed 's/@latest$//' | sort -u); do
  echo "$p: senaste är $(npm view "$p" version 2>/dev/null)"
done
# Verktygslåset: varje servers verktygslista och instruktioner jämförs med den låsta (BESLUT.md 2026-10-16, Senaste version
# med verktygslås …). En ändring rapporteras och godtas av Johnny med: python3 -I skript/mcp-verktygslas.py --uppdatera
# Servrar som låset inte når (OAuth, claude.ai-connector, inte tillagd) står på en rad som olåsta.
while IFS= read -r rad; do
  echo "$rad"; [[ "$rad" == ⚠️* ]] && varningar+=("MCP: ${rad#⚠️ }")
done < <(python3 -I "$ROT/skript/mcp-verktygslas.py" 2>&1)

# 5. Plugins och marknadsplatser
rubrik "Plugins"
if claude plugin list 2>&1 | grep -q 'No plugins installed'; then
  echo "inga plugins installerade"
else
  [[ -n "$TORRT" ]] || { claude plugin marketplace update >/dev/null 2>&1 && echo "marknadsplatserna uppdaterade"; }
  claude plugin list 2>&1
  echo "⚠️ uppdatera varje plugin med: claude plugin update <namn>"
fi

# 5b. Skills från andra repon, listade i skills-lock.json (BESLUT.md 2026-10-16, *Svar från answer_query är härledda …*).
#     `npx skills update` installerar om utan --copy och lägger .agents/ och symlänkar i repot, så varje skill
#     installeras i stället om med samma flaggor som första gången: bara Claude Code och kopierade filer.
#     En ny version syns som en ny hash i skills-lock.json; läs ändringen innan den committas.
rubrik "Skills från andra repon"
las="$ROT/skills-lock.json"
lashash() { node -e 'const l=JSON.parse(require("node:fs").readFileSync(process.argv[1],"utf8")); console.log((l.skills||{})[process.argv[2]]?.computedHash||"")' "$las" "$1"; }
if [[ -f "$las" ]]; then
  while IFS=$'\t' read -r namn kalla; do
    if [[ -n "$TORRT" ]]; then echo "skulle installeras om: $namn ur $kalla"; continue; fi
    fore="$(lashash "$namn")"
    if (cd "$ROT" && DISABLE_TELEMETRY=1 DO_NOT_TRACK=1 npx -y skills@latest add "$kalla" --skill "$namn" --agent claude-code --copy -y >/dev/null 2>&1); then
      if [[ "$(lashash "$namn")" != "$fore" ]]; then
        echo "uppdaterad: $namn (läs ändringen: git diff -- .claude/skills/$namn)"; andrat+=("skill $namn ur $kalla")
      else echo "senaste: $namn"; fi
    else varna "skillen $namn gick inte att installera om ur $kalla"; fi
  done < <(node -e 'const l=JSON.parse(require("node:fs").readFileSync(process.argv[1],"utf8")); for (const [n,s] of Object.entries(l.skills||{})) console.log(n+"\t"+s.source)' "$las")
  [[ -e "$ROT/.agents" ]] && varna ".agents/ finns i repot; skills ska ligga kopierade i .claude/skills/"
else
  echo "inga skills från andra repon"
fi

# 6. Källorna vi destillerar ur. inventering/kallor-bevakning.json listar repon med den commit vi läste
#    ({"namn", "repo", "commit"}). Har ett repo fått nya commits rapporteras det, så att källkortet och skillen
#    kan läsas om. Inget ändras automatiskt.
rubrik "Bevakade källor"
bev="$ROT/inventering/kallor-bevakning.json"
if [[ -f "$bev" ]]; then
  node -e '
    const { execFileSync } = require("node:child_process");
    const lista = JSON.parse(require("node:fs").readFileSync(process.argv[1], "utf8"));
    let nya = 0;
    for (const k of lista) {
      if (!k.repo) continue;
      let huvud = "";
      try { huvud = execFileSync("git", ["ls-remote", k.repo, "HEAD"], { encoding: "utf8", timeout: 15000 }).split("\t")[0]; } catch { console.log(`⚠️ ${k.namn}: gick inte att läsa ${k.repo}`); continue; }
      if (k.commit && huvud && !huvud.startsWith(k.commit) && !k.commit.startsWith(huvud.slice(0, k.commit.length))) { nya++; console.log(`nytt sedan källkortet: ${k.namn} (${k.repo}) ${k.commit.slice(0, 7)} -> ${huvud.slice(0, 7)}`); }
    }
    console.log(nya ? `${nya} av ${lista.length} källor har ändrats; läs om källkorten` : `${lista.length} källor, inga ändringar`);
  ' "$bev"
else
  echo "inga källor bevakas än (inventering/kallor-bevakning.json saknas)"
fi

# 7. Node
rubrik "Node"
echo "node $(node --version), npm $(npm --version)"

# 8. Bygget efter uppdateringen: biblioteket och varje sajt (sajtens build kör astro check först).
if [[ -z "$TORRT" ]]; then
  rubrik "Bygget efter uppdateringen"
  logg="$(mktemp -t startsakring-bygg)"
  for dir in "$ROT/bibliotek" "$ROT"/sites/*/; do
    dir="${dir%/}"
    [[ -f "$dir/package.json" ]] || continue
    if (cd "$dir" && npm run --silent build >"$logg" 2>&1); then echo "bygger: ${dir#"$ROT"/}"
    else varna "${dir#"$ROT"/} bygger inte efter uppdateringen; se $logg, och återställ med git checkout -- package.json package-lock.json"; fi
  done
fi

rubrik "Sammanfattning"
if [[ -n "$TORRT" ]]; then echo "torrkörning: inget ändrades"
elif ((${#andrat[@]})); then printf '%s\n' "${andrat[@]}"; else echo "allt var redan senaste version"; fi
if ((${#varningar[@]})); then printf '\n⚠️ %s\n' "${varningar[@]}"; fi
