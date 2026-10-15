"""Bygger mattstock.html ur mall.html, urval.json och fangst-logg.json.

Bara sajter med lyckad fångst i både dator och mobil tas med. Ordningen blandas
med ett fast frö så att den är densamma vid varje bygge. Skriver också
files.json: kartan över skärmbilderna som ska publiceras med sidan.
"""
import json
import random
from pathlib import Path

HAR = Path(__file__).parent
urval = json.loads((HAR.parent / "urval.json").read_text(encoding="utf-8"))
logg = json.loads((HAR / "fangst-logg.json").read_text(encoding="utf-8"))

random.Random(20261015).shuffle(urval)
med, utan = [], []
for s in urval:
    l = logg.get(s["id"], {})
    filer = [HAR / "skarmar" / f"{s['id']}-{t}.jpg" for t in ("d", "hel", "m")]
    ok = l.get("dator", {}).get("status") == "ok" and l.get("mobil", {}).get("status") == "ok"
    if ok and all(f.exists() for f in filer):
        med.append(s)
    else:
        utan.append(s["id"])

def bransch(b):
    b = b.split("/")[-1].strip()
    return b[:1].upper() + b[1:]


# Bara det Johnny behöver: kategori och Claudes förväntan visas inte.
sajter = [{"id": s["id"], "namn": s["namn"], "url": s["url"],
           "bransch": bransch(s.get("bransch", "")), "ort": s.get("ort", "")} for s in med]
data = json.dumps(sajter, ensure_ascii=False).replace("</", "<\\/")
html = (HAR / "mall.html").read_text(encoding="utf-8").replace("/*SAJTER*/", data)
(HAR / "mattstock.html").write_text(html, encoding="utf-8", newline="\n")

files = {}
for s in sajter:
    for t in ("d", "hel", "m"):
        files[f"skarmar/{s['id']}-{t}.jpg"] = str((HAR / "skarmar" / f"{s['id']}-{t}.jpg").resolve())
(HAR / "files.json").write_text(json.dumps(files, indent=1), encoding="utf-8")

storlek = sum(Path(p).stat().st_size for p in files.values())
print(f"{len(sajter)} sajter med, {len(utan)} utan: {utan}")
print(f"{len(files)} bilder, {storlek / 1e6:.1f} MB")
