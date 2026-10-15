"""Mäter granskaren mot Johnnys domar (byggplanens steg 4). Kör: python matning.py ../granskare/matning-<datum>.jsonl

Mått: andelen rätt bland Johnnys godkända (TPR) och bland hans underkända (TNR), var för sig (guide/3-2).
Som jämförelse visas Claudes förväntan från före domarna (forvantan.json) på samma sajter."""
import json
import sys
from collections import Counter
from pathlib import Path

M = Path(__file__).parent.parent
forv = {s["id"]: s for s in json.loads((M / "forvantan.json").read_text(encoding="utf-8"))["sajter"]}
domar = {d["id"]: d for d in map(json.loads, (M / "domar.jsonl").read_text(encoding="utf-8").splitlines())}
granskare = {g["id"]: g for g in map(json.loads, Path(sys.argv[1]).read_text(encoding="utf-8").splitlines()) if g}
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
