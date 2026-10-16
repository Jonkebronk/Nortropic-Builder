# Bevakar Googles sidor som guiden och skillsen citerar (översynens punkt 17,
# kunskap/research/2026-10-16_verktyg-och-skills-full-potential.md; BESLUT.md 2026-10-16, 23.34 och 23.45).
# Varje citerad adress på developers.google.com, web.dev och developer.chrome.com slås upp i Developer Knowledge
# (REST, documents:batchGet med DOCUMENT_VIEW_BASIC; högst 20 namn per anrop). Ett namn som saknas ger 404 för hela
# anropet, så den satsen slås upp en i taget. NOT_FOUND betyder att sidan har flyttat eller tagits bort: WebFetch
# följer omdirigeringar tyst och ser det inte. updateTime är *"when the content or metadata of the document was last
# updated"* (REST-referensen, Document); en ny tid betyder att regeln vi citerar ska läsas om.
# Tiderna sparas i inventering/google-sidor.json. Nya citat sparas direkt; en ändrad tid rapporteras vid varje körning
# tills den godtas med --godta, efter att regeln är omläst.
# Nyckeln läses ur byggsessionens konfiguration (~/.claude-bygg/.claude.json, lokal scope), skickas bara i huvudet
# X-Goog-Api-Key, aldrig i adressen, och skrivs aldrig ut. Kvoten är 100 hämtningar per minut (Quota & limits).
# Skills från andra repon (skills-lock.json) läses inte: de är inte våra citat.
# Användning från repots rot: python3 -I skript/google-sidor.py [--godta]
import json, os, re, sys, urllib.error, urllib.parse, urllib.request

ROT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
KONFIG = os.path.join(os.environ.get('CLAUDE_CONFIG_DIR') or os.path.expanduser('~/.claude-bygg'), '.claude.json')
TILLSTAND = os.path.join(ROT, 'inventering', 'google-sidor.json')
API = 'https://developerknowledge.googleapis.com/v1/documents:batchGet'
MAPPAR = ['guide', os.path.join('.claude', 'skills')]
ADRESS = re.compile(r'https?://(?:developers\.google\.com|web\.dev|developer\.chrome\.com)/[^\s)"\'<>`\]|]*')
SATS = 20


class Kvot(Exception):
    pass


def nyckel():
    try:
        servrar = json.load(open(KONFIG)).get('projects', {}).get(ROT, {}).get('mcpServers', {})
        return (servrar.get('google-developer-knowledge', {}).get('headers') or {}).get('X-Goog-Api-Key')
    except (OSError, ValueError):
        return None


def citat():
    andras = set()
    try: andras = set(json.load(open(os.path.join(ROT, 'skills-lock.json'))).get('skills', {}))
    except (OSError, ValueError): pass
    sidor = {}
    for mapp in MAPPAR:
        for rot, kataloger, filer in os.walk(os.path.join(ROT, mapp)):
            kataloger[:] = sorted(k for k in kataloger if k not in andras)
            for fil in sorted(filer):
                if not fil.endswith('.md'): continue
                sokvag = os.path.join(rot, fil)
                for nr, rad in enumerate(open(sokvag, encoding='utf-8'), 1):
                    for traff in ADRESS.findall(rad):
                        url = re.split(r'[#?]', traff.rstrip('.,;:*_'))[0].rstrip('/')
                        sidor.setdefault(url, []).append(f'{os.path.relpath(sokvag, ROT)}:{nr}')
    return sidor


def hamta(namn, huvud):
    fraga = urllib.parse.urlencode([('names', n) for n in namn] + [('view', 'DOCUMENT_VIEW_BASIC')])
    req = urllib.request.Request(f'{API}?{fraga}', headers=huvud)
    try:
        with urllib.request.urlopen(req, timeout=30) as svar:
            return {d['name']: d for d in json.loads(svar.read()).get('documents', [])}
    except urllib.error.HTTPError as fel:
        if fel.code == 404: return None
        if fel.code == 429: raise Kvot()
        raise RuntimeError(f'HTTP {fel.code}')


def sla_upp(urls, huvud):
    # url -> dokument, eller None om sidan saknas
    namn = {u: 'documents/' + re.sub(r'^https?://', '', u) for u in urls}
    ut, lista = {}, sorted(urls)
    for i in range(0, len(lista), SATS):
        sats = lista[i:i + SATS]
        svar = hamta([namn[u] for u in sats], huvud)
        if svar is not None:
            for u in sats: ut[u] = svar.get(namn[u])
            continue
        for u in sats:
            enskild = hamta([namn[u]], huvud)
            ut[u] = (enskild or {}).get(namn[u])
    return ut


def main():
    godta = '--godta' in sys.argv
    sidor = citat()
    k = nyckel()
    if not k:
        print(f'{len(sidor)} citerade Google-sidor; Developer Knowledge saknar nyckel i byggsessionen, så de kontrolleras inte')
        return
    try: dok = sla_upp(sidor, {'X-Goog-Api-Key': k, 'user-agent': 'nortropic-google-sidor/1'})
    except Kvot:
        print('⚠️ Google-sidorna: Developer Knowledge-kvoten är slut (429); kör igen om en minut'); return
    except Exception as fel:
        print(f'⚠️ Google-sidorna gick inte att kontrollera ({str(fel)[:120]})'); return
    try: fore = json.load(open(TILLSTAND))
    except (OSError, ValueError): fore = {}
    nytt, saknas, andrade = {}, [], []
    for url in sorted(sidor):
        d = dok.get(url)
        if d is None:
            saknas.append(url)
            if url in fore: nytt[url] = fore[url]
            continue
        tid = d.get('updateTime')
        if url in fore and fore[url]['uppdaterad'] != tid and not godta:
            andrade.append((url, fore[url]['uppdaterad'], tid)); nytt[url] = fore[url]
        else:
            nytt[url] = {'titel': d.get('title'), 'uppdaterad': tid}
    for url in saknas:
        print(f'⚠️ Google-sidan finns inte i Developer Knowledge (flyttad eller borttagen): {url} – citeras i ' + ', '.join(sidor[url][:4]))
    for url, fran, till in andrade:
        print(f'ändrad sedan den lästes: {url} ({fran[:10]} -> {till[:10]}) – läs om regeln i ' + ', '.join(sidor[url][:4]))
    json.dump(nytt, open(TILLSTAND, 'w'), ensure_ascii=False, indent=1, sort_keys=True)
    print(f'{len(sidor)} citerade Google-sidor i guiden och skillsen: {len(sidor) - len(saknas)} finns, {len(saknas)} saknas, {len(andrade)} ändrade'
          + ('; godta efter omläsning med: python3 -I skript/google-sidor.py --godta' if andrade else ''))


if __name__ == '__main__':
    main()
