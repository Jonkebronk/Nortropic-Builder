"""Jämför Johnnys domar med Claudes förregistrerade förväntan. Kör: python analys.py"""
import json
from collections import Counter
from pathlib import Path

M = Path(__file__).parent.parent
forv = {s["id"]: s for s in json.loads((M / "forvantan.json").read_text(encoding="utf-8"))["sajter"]}
domar = {d["id"]: d for d in map(json.loads, (M / "domar.jsonl").read_text(encoding="utf-8").splitlines())}
vant = lambda f: "godkand" if f in ("stark", "medel") else "underkand"

print(len(domar), "domar:", Counter(d["dom"] for d in domar.values()))
print("överens:", sum(vant(forv[i]["claude_forvantan"]) == d["dom"] for i, d in domar.items()), "av", len(domar))
for dom in ("godkand", "underkand"):
    del_ = [i for i, d in domar.items() if d["dom"] == dom]
    print(f"Johnny {dom}: Claude väntade samma i", sum(vant(forv[i]["claude_forvantan"]) == dom for i in del_), "av", len(del_))
print(Counter((forv[i]["kategori"], d["dom"]) for i, d in domar.items()))
for i, d in domar.items():
    if vant(forv[i]["claude_forvantan"]) != d["dom"]:
        print(" ", i, d["namn"], forv[i]["claude_forvantan"], "->", d["dom"])
