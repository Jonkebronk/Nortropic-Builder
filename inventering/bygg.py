"""Bygger kompetensinventering.html ur inventering.json.

Kör från repots rot:  python3 inventering/bygg.py
Ändra data, beslut och texter i inventering.json, aldrig i HTML-filen.
"""
import collections
import html
import json
import pathlib
import re

HAR = pathlib.Path(__file__).resolve().parent
DATA = json.loads((HAR / "inventering.json").read_text(encoding="utf-8"))
UT = HAR / "kompetensinventering.html"

LAGER = [(l["kod"], l["namn"]) for l in DATA["lager"]]
items = DATA["befintligt"]
nya = DATA["nya"]
FORANKRING = DATA["forankring"]

GRUPP = {"Destillera": "in", "Extrahera": "in", "Byggverktyg": "verktyg", "Behåll": "verktyg", "Ompröva": "verktyg",
         "Parkera": "ut", "Släpp": "ut", "Ta in": "tain", "Pröva": "prova", "Avstå": "ut"}
ORDNING = ["Destillera", "Extrahera", "Byggverktyg", "Behåll", "Ompröva", "Parkera", "Släpp"]
NYA_ORDNING = ["Ta in", "Pröva", "Avstå"]
FORKLARING = {
    "Destillera": "befintligt: kunskapen skrivs in i en egen skill per lager",
    "Extrahera": "befintligt: materialet anpassas in i det egna biblioteket",
    "Byggverktyg": "befintligt: används när biblioteket byggs, inte i kundbyggen",
    "Behåll": "befintligt: används som verktyg eller åtkomst",
    "Ompröva": "befintligt: Nortropics gamla delar, prövas mot nya flödet",
    "Parkera": "befintligt: hör till en senare tjänst",
    "Släpp": "befintligt: behövs inte",
    "Ta in": "ny kandidat: in i biblioteket eller driften nu",
    "Pröva": "ny kandidat: tidsbegränsat test innan beslut",
    "Avstå": "ny kandidat: granskad och bortvald, med skälet i förslaget",
}

e = html.escape


def slug(s):
    return re.sub(r"[^a-z0-9]+", "-", s.lower().replace("å", "a").replace("ä", "a").replace("ö", "o")).strip("-")


def plac(x):
    """Claudes förslag till placering och länken till källkortet (2026-10-16)."""
    if not x.get("placering"):
        return ""
    kort = f' · <a href="{e(x["kallkort"])}" target="_blank" rel="noopener">källkort</a>' if x.get("kallkort") else ""
    return f'<span class="beslut forslag">Förslag: {e(x["placering"])}{kort}</span>'


def chip(f):
    return f'<span class="chip chip-{GRUPP[f]}">{e(f)}</span>'


per_lager_skills = collections.Counter(it["lager"] for it in items if it["typ"] == "Skill")
per_lager_nya = collections.Counter(n["lager"] for n in nya)
per_forslag = collections.Counter(it["forslag"] for it in items)
per_dom = collections.Counter(n["dom"] for n in nya)
maxv = max(per_lager_skills.values())

CSS = """<title>Nortropics kompetensinventering</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Familjen+Grotesk:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500&display=swap">
<style>
/* Layout: en smal arbetslista, åtgärder och sammanfattning först, sedan en sektion per lager med befintligt och nya kandidater */
:root{
  --bg:#f1f3f6; --surface:#ffffff; --ink:#18202c; --muted:#596373; --line:#d8dde5;
  --accent:#a3552a; --accent-soft:#f5e9e1; --bar:#7c8697; --bar-hot:#a3552a;
  --f-text:"Familjen Grotesk","Helvetica Neue",Arial,sans-serif;
  --f-mono:"IBM Plex Mono",ui-monospace,SFMono-Regular,Menlo,monospace;
}
@media (prefers-color-scheme: dark){:root:not([data-theme="light"]){
  --bg:#0f131a; --surface:#161c26; --ink:#e6eaf0; --muted:#9ba4b3; --line:#29313e;
  --accent:#e2905b; --accent-soft:#2c2019; --bar:#6c7687; --bar-hot:#e2905b; color-scheme:dark}}
:root[data-theme="dark"]{
  --bg:#0f131a; --surface:#161c26; --ink:#e6eaf0; --muted:#9ba4b3; --line:#29313e;
  --accent:#e2905b; --accent-soft:#2c2019; --bar:#6c7687; --bar-hot:#e2905b; color-scheme:dark}
*{box-sizing:border-box}
body{background:var(--bg);color:var(--ink);font-family:var(--f-text);font-size:15px;line-height:1.55;padding-inline:16px;padding-block:28px 56px}
.wrap{max-width:860px;margin:0 auto;display:flex;flex-direction:column;gap:28px}
h1{font-size:30px;line-height:1.15;font-weight:600;margin:0;text-wrap:balance;letter-spacing:-0.01em}
h2{font-size:18px;font-weight:600;margin:0;text-wrap:balance}
.lead{color:var(--muted);max-width:62ch;margin:6px 0 0}
.meta-top{font-family:var(--f-mono);font-size:12px;color:var(--muted);letter-spacing:.02em;margin-top:10px}
.panel{background:var(--surface);border:1px solid var(--line);border-radius:10px;padding:18px 18px 20px;display:flex;flex-direction:column;gap:14px}
.panel.prio{border-color:var(--accent)}
.eyebrow{font-size:12px;text-transform:uppercase;letter-spacing:.08em;color:var(--muted);font-weight:500;margin:0}
.prio .eyebrow{color:var(--accent)}
.bars{display:grid;grid-template-columns:minmax(0,11.5em) minmax(0,1fr) 2.2em;gap:6px 10px;align-items:center;font-size:13.5px}
.bars .lbl{color:var(--ink);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.bars .num{font-family:var(--f-mono);font-variant-numeric:tabular-nums;text-align:right;color:var(--muted)}
.track{height:10px;background:var(--bg);border-radius:2px;overflow:hidden}
.fill{height:100%;background:var(--bar)}
.fill.hot{background:var(--bar-hot)}
.note{font-size:13.5px;color:var(--muted);margin:0;max-width:66ch}
.lista{display:flex;flex-direction:column;gap:10px;margin:0;padding:0;list-style:none}
.lista li{display:grid;grid-template-columns:minmax(0,12em) minmax(0,1fr);gap:10px;font-size:14px;border-top:1px solid var(--line);padding-top:10px}
.lista li:first-child{border-top:0;padding-top:0}
.lista b{font-weight:500}
.lista .sub{color:var(--muted)}
.lista .nr{font-family:var(--f-mono);font-size:12px;color:var(--accent);margin-left:6px}
ol.steg{margin:0;padding-left:1.4em;display:flex;flex-direction:column;gap:8px;font-size:14.5px}
ol.steg span{color:var(--muted)}
.lankrad{display:flex;flex-wrap:wrap;gap:6px 10px;align-items:baseline}
.filters{display:flex;flex-wrap:wrap;gap:8px}
.filters button{font:inherit;font-size:13px;color:var(--ink);background:var(--surface);border:1px solid var(--line);border-radius:999px;padding:5px 12px;cursor:pointer;display:inline-flex;gap:6px;align-items:center}
.filters button .n{font-family:var(--f-mono);font-size:12px;color:var(--muted)}
.filters button[aria-pressed="true"]{border-color:var(--ink);background:var(--ink);color:var(--surface)}
.filters button[aria-pressed="true"] .n{color:var(--surface)}
.filters button:focus-visible{outline:2px solid var(--accent);outline-offset:2px}
.legend{display:flex;flex-direction:column;gap:4px;margin:0;padding:0;list-style:none;font-size:13px;color:var(--muted)}
.legend li{display:flex;gap:8px;align-items:baseline;flex-wrap:wrap}
section.lager{display:flex;flex-direction:column;gap:0}
.lager-head{display:flex;align-items:baseline;gap:10px;padding-bottom:8px;border-bottom:2px solid var(--ink);flex-wrap:wrap}
.lager-head .nr{font-family:var(--f-mono);font-size:13px;color:var(--accent);font-weight:500}
.lager-head .cnt{margin-left:auto;font-family:var(--f-mono);font-size:12px;color:var(--muted)}
.tom{font-size:14px;color:var(--muted);padding:12px 0;margin:0}
.ny-head{display:flex;align-items:baseline;gap:8px;margin-top:18px;padding-bottom:6px;border-bottom:1px solid var(--accent)}
.ny-head h3{font-size:12.5px;text-transform:uppercase;letter-spacing:.08em;color:var(--accent);font-weight:600;margin:0}
.ny-head .cnt{margin-left:auto;font-family:var(--f-mono);font-size:12px;color:var(--muted)}
.forankring{font-size:13px;color:var(--muted);margin:8px 0 2px;max-width:72ch}
.forankring b{font-weight:500;color:var(--ink)}
.rad{display:flex;flex-direction:column;gap:4px;padding:12px 0;border-bottom:1px solid var(--line)}
.rad-top{display:flex;align-items:center;gap:8px;flex-wrap:wrap}
.namn{font-family:var(--f-mono);font-size:14.5px;font-weight:500;min-width:0;overflow-wrap:anywhere}
.typ{font-size:11px;text-transform:uppercase;letter-spacing:.07em;color:var(--muted);border:1px solid var(--line);border-radius:4px;padding:1px 6px}
.lank{font-size:11px;text-transform:uppercase;letter-spacing:.07em;color:var(--accent);border:1px solid var(--accent);border-radius:4px;padding:1px 6px}
.rad-top .chip{margin-left:auto}
.chip{font-size:12.5px;font-weight:500;border-radius:999px;padding:2px 10px;white-space:nowrap}
.chip-in{color:var(--accent);background:var(--accent-soft);border:1px solid var(--accent)}
.chip-tain{color:var(--surface);background:var(--accent);border:1px solid var(--accent)}
.chip-prova{color:var(--accent);border:1px solid var(--accent)}
.chip-verktyg{color:var(--ink);border:1px solid var(--ink)}
.chip-ut{color:var(--muted);border:1px dashed var(--muted)}
.vad{margin:0;font-size:14.5px;max-width:68ch}
.fakta{margin:0;font-size:12.5px;color:var(--muted);display:flex;flex-wrap:wrap;gap:2px 14px}
.fakta span{white-space:nowrap}
.fakta .krock{color:var(--ink)}
.kom{margin:0;font-size:13px;color:var(--muted)}
.beslut{font-family:var(--f-mono);font-size:12px;color:var(--muted);display:block}
.beslut.forslag a{color:inherit}
@media (max-width:520px){
  h1{font-size:25px}
  .bars{grid-template-columns:minmax(0,8.5em) minmax(0,1fr) 2em}
  .lista li{grid-template-columns:minmax(0,1fr)}
  .fakta span{white-space:normal}
}
@media (prefers-reduced-motion:no-preference){.filters button{transition:background .15s,color .15s,border-color .15s}}
</style>
"""

SCRIPT = """<script>
(function(){
  var knappar = Array.prototype.slice.call(document.querySelectorAll('.filters button'));
  var rader = Array.prototype.slice.call(document.querySelectorAll('.rad'));
  var sektioner = Array.prototype.slice.call(document.querySelectorAll('section.lager'));
  var nyblock = Array.prototype.slice.call(document.querySelectorAll('.ny'));
  function visa(f){
    knappar.forEach(function(b){ b.setAttribute('aria-pressed', String(b.getAttribute('data-f') === f)); });
    rader.forEach(function(r){ r.hidden = !(f === 'alla' || r.getAttribute('data-f') === f); });
    nyblock.forEach(function(n){ n.hidden = n.querySelectorAll('.rad:not([hidden])').length === 0; });
    sektioner.forEach(function(s){
      var synliga = s.querySelectorAll('.rad:not([hidden])').length;
      var tom = s.querySelector('.tom');
      s.hidden = (f !== 'alla') && synliga === 0;
      if (tom) tom.hidden = (f !== 'alla');
    });
    try { localStorage.setItem('inventering-filter', f); } catch (err) {}
  }
  knappar.forEach(function(b){ b.addEventListener('click', function(){ visa(b.getAttribute('data-f')); }); });
  var sparat = null;
  try { sparat = localStorage.getItem('inventering-filter'); } catch (err) {}
  if (sparat && knappar.some(function(b){ return b.getAttribute('data-f') === sparat; })) visa(sparat);
})();
</script>"""

parts = [CSS]
totalt_skills = sum(1 for it in items if it["typ"] == "Skill")
totalt_ovr = len(items) - totalt_skills
parts.append('<main class="wrap">')
parts.append(f'''<header>
<h1>Kompetensinventering</h1>
<p class="lead">{totalt_skills} skills och {totalt_ovr} MCP:er, verktyg och tjänster ur nortropic-webb-pro, och {len(nya)} nya kandidater från omvärldsbevakningen, sorterade på webbyråns nio lager och flödet. Förslagen och domarna är underlag. Besluten fattar vi lager för lager. Källorna står i rapporten Kompetensluckor och kandidater per lager.</p>
<p class="meta-top">16 OKT 2026 · STJÄRNOR OCH LICENSER KONTROLLERADE 13–15 OKT · ORIGINALEN JÄMFÖRDA REGEL FÖR REGEL 16 OKT (WEBB-PRO 668B03C)</p>
</header>''')

steg = "".join(f'<li>{e(b["vad"])} <span>{e(b["varfor"])}</span></li>' for b in DATA["borja_nu"])
parts.append(f'''<section class="panel prio" aria-labelledby="borja">
<p class="eyebrow" id="borja">Börja nu, lång ledtid</p>
<ol class="steg">{steg}</ol>
</section>''')

bar_rows = []
for kod, namn in LAGER:
    v = per_lager_skills.get(kod, 0)
    w = 0 if maxv == 0 else round(100 * v / maxv, 1)
    hot = " hot" if kod in ("4", "5", "6") else ""
    lbl = f"{kod} {namn}" if kod not in ("F", "U") else namn
    bar_rows.append(f'<span class="lbl">{e(lbl)}</span><span class="track"><span class="fill{hot}" style="width:{w}%;display:block"></span></span><span class="num">{v}</span>')
yta = sum(per_lager_skills.get(k, 0) for k in ("4", "5", "6"))
borjan = sum(per_lager_skills.get(k, 0) for k in ("1", "2", "3"))
nya_borjan = sum(per_lager_nya.get(k, 0) for k in ("1", "2", "3"))
nya_drift = per_lager_nya.get("9", 0)
parts.append(f'''<section class="panel" aria-labelledby="fordelning">
<p class="eyebrow" id="fordelning">Befintliga skills per lager</p>
<div class="bars">{"".join(bar_rows)}</div>
<p class="note">{yta} av {totalt_skills} skills ligger i skelett, yta och rörelse. Strategi, omfattning och struktur har {borjan}, och drift och förvaltning har inga. Omvärldsbevakningen fyller just de lagren: {nya_borjan} nya kandidater i lager 1–3 och {nya_drift} i lager 9.</p>
</section>''')

bygga_rows = "".join(
    f'<li><b>{e(b["vad"])}<span class="nr">{"flödet" if b["lager"] == "F" else "lager " + b["lager"]}</span></b><span class="sub">{e(b["varfor"])}</span></li>'
    for b in DATA["bygga_sjalva"])
parts.append(f'''<section class="panel" aria-labelledby="bygga">
<p class="eyebrow" id="bygga">Det vi måste bygga själva</p>
<ul class="lista">{bygga_rows}</ul>
<p class="note">Det finns inte på GitHub. Det är också det som kommer att skilja Nortropic från byggare som delar samma stack och komponenter.</p>
</section>''')

lank_rows = "".join(f'<li><b>{e(l["namn"])}</b><span class="lankrad">{chip(l["dom"])}<span class="sub">{e(l["kommentar"])}</span></span></li>' for l in DATA["lankar"])
parts.append(f'''<section class="panel" aria-labelledby="lankar">
<p class="eyebrow" id="lankar">Dina fem länkar</p>
<ul class="lista">{lank_rows}</ul>
</section>''')

knappar = [f'<button type="button" id="f-alla" data-f="alla" aria-pressed="true">Alla <span class="n">{len(items) + len(nya)}</span></button>']
for f in NYA_ORDNING:
    knappar.append(f'<button type="button" id="f-{slug(f)}" data-f="{e(f)}" aria-pressed="false">{e(f)} <span class="n">{per_dom.get(f, 0)}</span></button>')
for f in ORDNING:
    knappar.append(f'<button type="button" id="f-{slug(f)}" data-f="{e(f)}" aria-pressed="false">{e(f)} <span class="n">{per_forslag.get(f, 0)}</span></button>')
legend = "".join(f'<li>{chip(f)}<span>{e(FORKLARING[f])}</span></li>' for f in NYA_ORDNING + ORDNING)
parts.append(f'''<section class="panel" aria-labelledby="forslag">
<p class="eyebrow" id="forslag">Domar och förslag</p>
<div class="filters" role="group" aria-label="Visa efter dom eller förslag">{"".join(knappar)}</div>
<ul class="legend">{legend}</ul>
</section>''')

for kod, namn in LAGER:
    rader = [it for it in items if it["lager"] == kod]
    rader.sort(key=lambda it: (ORDNING.index(it["forslag"]), it["typ"] != "Skill", it["namn"]))
    nyrader = [n for n in nya if n["lager"] == kod]
    nyrader.sort(key=lambda n: (NYA_ORDNING.index(n["dom"]),))
    rubrik_nr = kod if kod not in ("F", "U") else ("↑" if kod == "F" else "–")
    cnt = f"{len(rader)} befintliga" + (f" · {len(nyrader)} nya" if nyrader else "")
    parts.append(f'<section class="lager" data-lager="{kod}" aria-labelledby="l-{kod}">')
    parts.append(f'<div class="lager-head"><span class="nr">{e(rubrik_nr)}</span><h2 id="l-{kod}">{e(namn)}</h2><span class="cnt">{e(cnt)}</span></div>')
    if not rader:
        parts.append('<p class="tom">Inget i webb-pro hör hit.</p>')
    for it in rader:
        fakta = [f'<span>{e(it["ursprung"])}</span>', f'<span>{e(it["licens"])}</span>', f'<span>{e(it["sort"])}</span>']
        if it["typ"] == "Skill":
            if it.get("krockar"):
                fakta.append(f'<span class="krock">{it["krockar"]} krockar, {it["hoga_krockar"]} höga</span>')
            else:
                fakta.append('<span>Inga krockar</span>')
        if it["aven"]:
            fakta.append(f'<span>Även lager {e(it["aven"])}</span>')
        kom = f'<p class="kom">{e(it["kommentar"])}</p>' if it["kommentar"] else ""
        parts.append(f'''<article class="rad" data-f="{e(it["forslag"])}">
<div class="rad-top"><span class="namn">{e(it["namn"])}</span><span class="typ">{e(it["typ"])}</span>{chip(it["forslag"])}</div>
<p class="vad">{e(it["vad"])}</p>
<p class="fakta">{"".join(fakta)}</p>
{kom}<span class="beslut">Beslut: {e(it["beslut"])}</span>{plac(it)}
</article>''')
    if nyrader:
        parts.append('<div class="ny">')
        parts.append(f'<div class="ny-head"><h3>Nya kandidater</h3><span class="cnt">{per_lager_nya[kod]}</span></div>')
        if kod in FORANKRING:
            parts.append(f'<p class="forankring"><b>Förankring:</b> {e(FORANKRING[kod])}</p>')
        for n in nyrader:
            fakta = []
            if n["lage"]:
                fakta.append(f'<span>{e(n["lage"][0].upper() + n["lage"][1:])}</span>')
            fakta.append(f'<span>{e(n["fakta"])}</span>')
            if n["aven"]:
                fakta.append(f'<span>Även {"" if n["aven"].startswith("flödet") else "lager "}{e(n["aven"])}</span>')
            lank = '<span class="lank">Din länk</span>' if n["din_lank"] else ""
            flagga = f'<p class="kom">{e(n["flagga"])}</p>' if n["flagga"] else ""
            parts.append(f'''<article class="rad" data-f="{e(n["dom"])}">
<div class="rad-top"><span class="namn">{e(n["namn"])}</span><span class="typ">{e(n["typ"])}</span>{lank}{chip(n["dom"])}</div>
<p class="vad">{e(n["roll"])}</p>
<p class="fakta">{"".join(fakta)}</p>
{flagga}<span class="beslut">Beslut: {e(n["beslut"])}</span>{plac(n)}
</article>''')
        parts.append('</div>')
    parts.append('</section>')

parts.append('</main>')
parts.append(SCRIPT)
UT.write_text("\n".join(parts), encoding="utf-8")
print(f"{UT.name}: {len(items)} befintliga, {len(nya)} nya ({per_dom.get('Ta in', 0)} Ta in, {per_dom.get('Pröva', 0)} Pröva)")
