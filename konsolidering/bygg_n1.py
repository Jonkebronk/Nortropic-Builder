"""Bygger guide/n1-forsta-sajten.md ur [N1]-märkningen i guidens filer.

Kör från repots rot: python konsolidering/bygg_n1.py
Filen är genererad – ändra i källfilerna, inte i sammanfattningen.

Läser listrader som börjar med [N1] (punktlistor och numrerade listor) och
tabellrader som har en cell med N1 eller [N1]. Hoppar över kodblock.
"""
import re
from pathlib import Path

GUIDE = Path("guide")
ORDNING = [
    "1-kundens-vag.md",
    "2-1-strategi.md", "2-2-omfattning.md", "2-3-struktur.md", "2-4-skelett.md",
    "2-5-yta.md", "2-6-rorelse.md", "2-7-innehall.md", "2-8-teknik-och-kvalitet.md",
    "2-9-drift-och-forvaltning.md",
    "3-1-orkestrering-och-roller.md", "3-2-granskning-och-kalibrering.md",
    "3-3-sakerhet-och-installningar.md", "3-4-larande-och-underhall.md", "3-5-live-visning.md",
    "4-foretaget.md", "5-byggplan.md", "bilaga-b-skills.md",
]
KONTROLLER = ("2-8-teknik-och-kvalitet.md", "### N1")
VERKTYG = "bilaga-a-verktyg.md"
LISTA = re.compile(r"^\s*(?:-|\d+\.)\s*\[N1[^\]]*\]\s*(.*)$")
CELL_N1 = re.compile(r"^\s*\[?N1\b")


def tabellrad(rad):
    if not rad.lstrip().startswith("|"):
        return None
    celler = [c.strip() for c in rad.strip().strip("|").split("|")]
    if any(CELL_N1.match(c) for c in celler):
        return " · ".join(c for c in celler if c and not CELL_N1.match(c))
    return None


def main():
    delar = []
    totalt = 0
    for namn in ORDNING:
        fil = GUIDE / namn
        if not fil.exists():
            continue
        rader = fil.read_text(encoding="utf-8").splitlines()
        titel = next((r[2:] for r in rader if r.startswith("# ")), namn)
        avsnitt, i_kod, punkter = None, False, []
        for rad in rader:
            if rad.lstrip().startswith("```"):
                i_kod = not i_kod
                continue
            if i_kod:
                continue
            if rad.startswith("## "):
                avsnitt = rad[3:].strip()
                continue
            m = LISTA.match(rad)
            if m:
                punkter.append((avsnitt, m.group(1).strip()))
                continue
            t = tabellrad(rad)
            if t:
                punkter.append((avsnitt, t))
        if not punkter:
            continue
        totalt += len(punkter)
        delar.append(f"## {titel} (`{namn}`)")
        delar.append("")
        senaste = object()
        for avs, text in punkter:
            if avs and avs != senaste:
                if delar[-1] != "":
                    delar.append("")
                delar.append(f"*{avs}*")
                delar.append("")
                senaste = avs
            delar.append(f"- {text}")
        delar.append("")
    # De tio N1-kontrollerna, ordagrant ur 2-8
    rader = (GUIDE / KONTROLLER[0]).read_text(encoding="utf-8").splitlines()
    try:
        a = next(i for i, r in enumerate(rader) if r.startswith(KONTROLLER[1]))
        b = next(i for i in range(a + 1, len(rader)) if rader[i].startswith("#"))
        delar += [f"## De tio N1-kontrollerna (`{KONTROLLER[0]}`)", ""] + rader[a + 1:b] + [""]
    except StopIteration:
        pass
    # N1-verktyg ur bilaga A: bara namnen
    namn = []
    for rad in (GUIDE / VERKTYG).read_text(encoding="utf-8").splitlines():
        if rad.lstrip().startswith("|"):
            celler = [c.strip() for c in rad.strip().strip("|").split("|")]
            if any(CELL_N1.match(c) for c in celler[1:]) and celler and not set(celler[0]) <= set("-: "):
                namn.append(celler[0])
    if namn:
        delar += [f"## N1-verktyg (`{VERKTYG}`)", "", ", ".join(namn), ""]
    huvud = [
        "# N1 – det som gäller den första sajten",
        "",
        "**Genererad** av `konsolidering/bygg_n1.py` ur `[N1]`-märkningen i guidens filer. "
        "Ändra i källfilerna, inte här. Varje punkt står i sin helhet, med källor, i filen under rubriken. "
        "Taket är cirka 60 regler och tio automatiska kontroller (`README.md`, *Nivåer*).",
        "",
        f"{totalt} regler och tabellrader, plus de tio kontrollerna och verktygen nedan.",
        "",
    ]
    (GUIDE / "n1-forsta-sajten.md").write_text("\n".join(huvud + delar) + "\n", encoding="utf-8", newline="\n")
    print(totalt, "N1-punkter")


if __name__ == "__main__":
    main()
