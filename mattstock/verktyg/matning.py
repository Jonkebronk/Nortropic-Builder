"""Mäter granskaren mot Johnnys domar (byggplanens steg 4). Kör: python matning.py ../granskare/matning-<datum>.jsonl
  [--egna ../../sites/<sajt>/granskare-egna-<datum>.jsonl ...]

Med --egna räknas också granskarens domar över Nortropics egna utkast. Johnnys domar över dem läses lokalt ur samma sajts
domar.jsonl, matchade på steg och objekt, eftersom allt om firman stannar i sites/ (BESLUT.md 2026-10-16, G11).
Utskriften visar bara id, steg och objekt för de egna utkasten, aldrig sajtens namn.

Mått: andelen rätt bland Johnnys godkända (TPR) och bland hans underkända (TNR), var för sig (guide/3-2).
Som jämförelse visas Claudes förväntan från före domarna (forvantan.json) på samma sajter."""
import json
import sys
from collections import Counter
from pathlib import Path

M = Path(__file__).parent.parent
forv = {s["id"]: s for s in json.loads((M / "forvantan.json").read_text(encoding="utf-8"))["sajter"]}
domar = {d["id"]: d for d in map(json.loads, (M / "domar.jsonl").read_text(encoding="utf-8").splitlines())}
args = sys.argv[1:]
egna_filer = [args[i + 1] for i, a in enumerate(args) if a == "--egna"]
mattfil = next(a for i, a in enumerate(args) if a != "--egna" and (i == 0 or args[i - 1] != "--egna"))
granskare = {g["id"]: g for g in map(json.loads, Path(mattfil).read_text(encoding="utf-8").splitlines()) if g}
vant = lambda f: "godkand" if f in ("stark", "medel") else "underkand"

saknas = sorted(set(granskare) - set(domar))
if saknas:
    sys.exit(f"Okända id: {saknas}")

print(len(granskare), "sajter. Johnny:", dict(Counter(domar[i]["dom"] for i in granskare)),
      "Granskaren:", dict(Counter(g["dom"] for g in granskare.values())))
for dom, namn in (("godkand", "TPR, rätt bland Johnnys godkända"), ("underkand", "TNR, rätt bland Johnnys underkända")):
    del_ = [i for i in granskare if domar[i]["dom"] == dom]
    ratt = sum(granskare[i]["dom"] == dom for i in del_)
    forv_ratt = sum(vant(forv[i]["claude_forvantan"]) == dom for i in del_)
    print(f"{namn}: granskaren {ratt} av {len(del_)} ({ratt / len(del_):.0%}); Claudes förväntan {forv_ratt} av {len(del_)}")

ratt_alla = sum(g["dom"] == domar[i]["dom"] for i, g in granskare.items())
print(f"Överens totalt: {ratt_alla} av {len(granskare)}")
osakra = [i for i, g in granskare.items() if g.get("osaker")]
print(f"Osäkra: {len(osakra)}, av dem rätt {sum(granskare[i]['dom'] == domar[i]['dom'] for i in osakra)}")
# Bedömaren fattar bara de grova besluten och jämna fall går till Johnny (guide/3-2): så här träffar de säkra domarna.
for dom, namn in (("godkand", "TPR"), ("underkand", "TNR")):
    del_ = [i for i in granskare if domar[i]["dom"] == dom and not granskare[i].get("osaker")]
    ratt = sum(granskare[i]["dom"] == dom for i in del_)
    print(f"{namn} bland säkra domar: {ratt} av {len(del_)}")
print("Avvikelser:")
for i, g in granskare.items():
    if g["dom"] != domar[i]["dom"]:
        print(f"  {i} {domar[i]['namn']}: Johnny {domar[i]['dom']}, granskaren {g['dom']}"
              f"{' (osäker)' if g.get('osaker') else ''}; frågor {g.get('fragor')}")

# Egna utkast (G11): granskarens domar i sites/<sajt>/granskare-egna-*.jsonl mot Johnnys domar i samma sajts domar.jsonl.
egna = []
for fil in egna_filer:
    fil = Path(fil)
    johnny = [json.loads(r) for r in (fil.parent / "domar.jsonl").read_text(encoding="utf-8").splitlines() if r.strip()]
    for g in map(json.loads, filter(str.strip, fil.read_text(encoding="utf-8").splitlines())):
        traff = [d for d in johnny if str(d.get("steg")) == str(g["steg"]) and d.get("objekt") == g["objekt"] and d.get("dom") in ("godkand", "underkand")]
        if len(traff) != 1:
            sys.exit(f"Egna utkast: hittade {len(traff)} domar för steg {g['steg']}, {g['objekt']} i {fil.parent.name}/domar.jsonl")
        egna.append((g, traff[0]["dom"]))
if egna:
    print(f"Egna utkast: {len(egna)}. Johnny: {dict(Counter(j for _, j in egna))}, granskaren: {dict(Counter(g['dom'] for g, _ in egna))}")
    for dom, namn in (("godkand", "TPR"), ("underkand", "TNR")):
        del_ = [(g, j) for g, j in egna if j == dom]
        if del_:
            print(f"  {namn} egna utkast: {sum(g['dom'] == dom for g, _ in del_)} av {len(del_)}")
    for g, j in egna:
        if g["dom"] != j:
            print(f"  Avvikelse {g['id']} (steg {g['steg']}, {g['objekt']}): Johnny {j}, granskaren {g['dom']}{' (osäker)' if g.get('osaker') else ''}; frågor {g.get('fragor')}")
    alla = [(granskare[i]["dom"], domar[i]["dom"]) for i in granskare] + [(g["dom"], j) for g, j in egna]
    for dom, namn in (("godkand", "TPR"), ("underkand", "TNR")):
        del_ = [x for x in alla if x[1] == dom]
        print(f"{namn} tillsammans med måttstocken: {sum(a == b for a, b in del_)} av {len(del_)}")
