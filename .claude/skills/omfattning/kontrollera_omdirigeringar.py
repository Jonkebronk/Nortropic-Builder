"""Prövar omdirigeringskartan inför en flytt. Läser bara, ändrar inget.

Användning:
    python3 kontrollera_omdirigeringar.py <sajtkatalog> --gamla <fil eller katalog> [--gamla ...]

<sajtkatalog> ska ha public/_redirects och dist/ (kör bygget först).
--gamla tar sitemaps (.xml), listor med en adress per rad (.txt) och sparade sidor (.html),
där länkar till samma värd som i sitemaps räknas som gamla adresser.

Utfall per gammal adress: samma adress finns, 301 till en sida som finns, eller medvetet 404
(adressen nämns på en kommentarsrad i _redirects). Allt annat är ett fel.
Regler (guide/2-2-omfattning.md; Google, Site moves with URL changes; Cloudflare, Redirects):
statuskod uttryckligen 301 eller 308, målet finns, ingen kedja, inga dubbletter, högst 2 000 statiska regler,
inga källor på domännivå, och varning när fler än tre regler pekar på startsidan.
Avslutas med kod 1 om något fel hittas.
"""
import argparse
import os
import re
import sys
from urllib.parse import urlparse

HOPPA = ('/wp-content/', '/wp-includes/', '/wp-json', '/xmlrpc.php', '/feed', '/comments/feed')


def adress(u):
    # Frågesträngen följer med: _redirects matchar den inte, så den måste synas i utfallet (flyttregler.md).
    return (u.path or '/') + (f'?{u.query}' if u.query else '')


def las_gamla(kallor):
    adresser, varder = set(), set()
    filer = []
    for k in kallor:
        if os.path.isdir(k):
            filer += [os.path.join(k, f) for f in sorted(os.listdir(k))]
        else:
            filer.append(k)
    for f in filer:
        if f.endswith('.xml'):
            for loc in re.findall(r'<loc>\s*([^<\s]+)\s*</loc>', open(f, encoding='utf-8', errors='replace').read()):
                u = urlparse(loc)
                varder.add(u.netloc)
                if not u.path.endswith('.xml'):
                    adresser.add(adress(u))
                else:
                    adresser.add(u.path)
        elif f.endswith('.txt'):
            for rad in open(f, encoding='utf-8', errors='replace'):
                rad = rad.strip()
                if rad and not rad.startswith('#'):
                    adresser.add(adress(urlparse(rad)) if '://' in rad else rad)
    for f in filer:
        if f.endswith('.html') and varder:
            text = open(f, encoding='utf-8', errors='replace').read()
            for vard in varder:
                for p in re.findall(r'href="https?://' + re.escape(vard) + r'(/[^"#?]*)', text):
                    if not p.startswith(HOPPA):
                        adresser.add(p)
    return adresser


def las_regler(sokvag):
    regler, kommentarer, fel = {}, '', []
    for nr, rad in enumerate(open(sokvag, encoding='utf-8'), 1):
        rad = rad.strip()
        if not rad:
            continue
        if rad.startswith('#'):
            kommentarer += ' ' + rad + ' '
            continue
        delar = rad.split()
        if len(delar) < 2:
            fel.append(f'rad {nr}: följer inte formatet och ignoreras av Cloudflare: {rad}')
            continue
        kalla, mal = delar[0], delar[1]
        kod = delar[2] if len(delar) > 2 else None
        if kod is None:
            fel.append(f'rad {nr}: {kalla} saknar statuskod (standard är 302)')
        elif kod not in ('301', '308', '200'):
            fel.append(f'rad {nr}: {kalla} har {kod}, inte en permanent omdirigering')
        if not kalla.startswith('/'):
            fel.append(f'rad {nr}: {kalla} är en källa på domännivå, som _redirects inte stöder')
        if kalla in regler:
            fel.append(f'rad {nr}: {kalla} finns redan; den översta regeln gäller')
            continue
        regler[kalla] = (mal, kod, nr)
    return regler, kommentarer, fel


def finns(dist, p):
    if '://' in p:
        return None  # extern adress, prövas inte här
    p = p.split('#')[0].split('?')[0]
    rel = p.lstrip('/')
    if p.endswith('/'):
        return os.path.isfile(os.path.join(dist, rel, 'index.html'))
    return os.path.isfile(os.path.join(dist, rel)) or os.path.isfile(os.path.join(dist, rel + '.html'))


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('sajt')
    ap.add_argument('--gamla', action='append', required=True)
    a = ap.parse_args()
    dist = os.path.join(a.sajt, 'dist')
    regler, kommentarer, fel = las_regler(os.path.join(a.sajt, 'public', '_redirects'))
    varningar = []

    statiska = [k for k in regler if '*' not in k and ':' not in k]
    if len(statiska) > 2000 or len(regler) - len(statiska) > 100:
        fel.append(f'för många regler: {len(statiska)} statiska, {len(regler) - len(statiska)} dynamiska')
    till_start = [k for k, (m, _, _) in regler.items() if m == '/']
    if len(till_start) > 3:
        varningar.append(f'{len(till_start)} regler pekar på startsidan: {" ".join(till_start)} (Google: soft 404)')

    print(f'Regler: {len(regler)}')
    for kalla, (mal, kod, nr) in regler.items():
        mal_finns = finns(dist, mal)
        kedja = mal in regler or mal.rstrip('/') in regler
        if mal_finns is False:
            fel.append(f'rad {nr}: målet {mal} finns inte i dist/')
        if kedja:
            fel.append(f'rad {nr}: {kalla} → {mal} är en kedja')
        print(f'  {kalla:34} → {mal:24} {kod or "302?":4}  mål {"externt" if mal_finns is None else ("finns" if mal_finns else "SAKNAS")}{"  KEDJA" if kedja else ""}')

    gamla = las_gamla(a.gamla)
    print(f'\nGamla adresser: {len(gamla)}')
    for p in sorted(gamla):
        if '?' in p:
            vag = p.split('?')[0] or '/'
            if re.search(r'[\s(]' + re.escape(p) + r'[\s),]', kommentarer):
                utfall = f'medvetet: frågesträngen matchas inte, landar på {vag} (kommentar i _redirects)'
            else:
                utfall = f'frågesträng: _redirects matchar den inte, landar på {vag}'
                varningar.append(f'{p}: frågesträngen matchas inte av _redirects och landar på {vag}; skriv utfallet som ett medvetet beslut (flyttregler.md)')
            print(f'  {p:40} {utfall}')
            continue
        if p in regler:
            utfall = f'{regler[p][1] or "302?"} → {regler[p][0]}'
        elif finns(dist, p):
            utfall = 'samma adress finns'
        elif re.search(r'[\s(]' + re.escape(p) + r'[\s),]', kommentarer):
            utfall = 'medvetet 404 (kommentar i _redirects)'
        else:
            utfall = 'FEL: ger 404 utan beslut'
            fel.append(f'{p} ger 404 utan beslut')
        print(f'  {p:40} {utfall}')
        utan = p.rstrip('/')
        if p.endswith('/') and p != '/' and p in regler and utan not in regler and not finns(dist, utan + '/'):
            varningar.append(f'{utan} (utan snedstreck) har ingen regel och ger 404; WordPress och liknande svarade ofta med 301 till {p}')

    samma = [p for p in gamla if p.endswith('/') and p != '/' and p not in regler and finns(dist, p)]
    if samma:
        print(f'\nINFO: {len(samma)} sidor har samma adress. Utan snedstreck får de Cloudflares 307 (tillfällig) till adressen med snedstreck;'
              ' lägg till en 301-regel för dem som har länkar eller trafik (Cloudflare, HTML handling).')

    for v in varningar:
        print('VARNING:', v)
    for f in fel:
        print('FEL:', f)
    print(f'\n{len(fel)} fel, {len(varningar)} varningar')
    sys.exit(1 if fel else 0)


if __name__ == '__main__':
    main()
