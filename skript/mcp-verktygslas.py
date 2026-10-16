# Verktygslåset för MCP-servrar (BESLUT.md 2026-10-16, Senaste version med verktygslås …; guide/bilaga-a-verktyg.md).
# En server kan ändra sina verktyg och instruktioner utan ny version, och Claude Code hämtar en ny lista utan att fråga
# (MCP, Security Best Practices; Claude Code, MCP). Skriptet läser initialize och tools/list från varje server i
# inventering/mcp-servrar.json, sparar dem i inventering/mcp-verktyg/<namn>.json och rapporterar vad som har ändrats sedan
# förra körningen: verktyg som tillkommit, försvunnit eller fått ny beskrivning, och ändrade instruktioner. Johnny ser
# ändringarna innan servern används. Servrar som kräver inloggning hoppas över tills de har en token.
# Användning från repots rot: python3 -I skript/mcp-verktygslas.py [--uppdatera]
#   utan --uppdatera jämförs bara, och sparade listor skrivs inte över; med --uppdatera godtas de nya listorna.
# Bygger på utkastet från andra varvets MCP-grupp (verktygslista.py, prövat på fem servrar).
import hashlib, json, os, subprocess, sys, urllib.request

ROT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
LISTA = os.path.join(ROT, 'inventering', 'mcp-servrar.json')
UT = os.path.join(ROT, 'inventering', 'mcp-verktyg')
INIT = {'jsonrpc': '2.0', 'id': 1, 'method': 'initialize',
        'params': {'protocolVersion': '2025-06-18', 'capabilities': {}, 'clientInfo': {'name': 'nortropic-verktygslas', 'version': '1'}}}
KLAR = {'jsonrpc': '2.0', 'method': 'notifications/initialized'}
VERKTYG = {'jsonrpc': '2.0', 'id': 2, 'method': 'tools/list', 'params': {}}


def http(url, huvud):
    bas = {'content-type': 'application/json', 'accept': 'application/json, text/event-stream', 'user-agent': 'nortropic-verktygslas/1', **huvud}
    def post(kropp, sid=None):
        h = dict(bas)
        if sid: h['mcp-session-id'] = sid
        req = urllib.request.Request(url, data=json.dumps(kropp).encode(), headers=h, method='POST')
        with urllib.request.urlopen(req, timeout=30) as r:
            sid2 = r.headers.get('mcp-session-id') or sid
            raw = r.read().decode('utf-8', 'replace')
        if raw.lstrip().startswith('{'): return json.loads(raw), sid2
        rader = [json.loads(l[5:]) for l in raw.splitlines() if l.startswith('data:') and l[5:].strip()]
        return (rader[-1] if rader else {}), sid2
    init, sid = post(INIT)
    try: post(KLAR, sid)
    except Exception: pass
    lista, _ = post(VERKTYG, sid)
    return init, lista


def stdio(kommando):
    p = subprocess.Popen(kommando, stdin=subprocess.PIPE, stdout=subprocess.PIPE, stderr=subprocess.DEVNULL, text=True)
    def skicka(m): p.stdin.write(json.dumps(m) + '\n'); p.stdin.flush()
    def vanta(id_):
        while True:
            rad = p.stdout.readline()
            if not rad: raise RuntimeError('servern stängde utan svar')
            try: m = json.loads(rad)
            except ValueError: continue
            if m.get('id') == id_: return m
    try:
        skicka(INIT); init = vanta(1)
        skicka(KLAR); skicka(VERKTYG); lista = vanta(2)
        return init, lista
    finally:
        p.kill()


def las(server):
    if server.get('inloggning'): return None
    init, lista = http(server['url'], server.get('huvud', {})) if 'url' in server else stdio(server['kommando'])
    res = init.get('result', {})
    verktyg = sorted(({'namn': t.get('name'), 'beskrivning': t.get('description'), 'indata': t.get('inputSchema'), 'annoteringar': t.get('annotations')}
                      for t in lista.get('result', {}).get('tools', [])), key=lambda t: t['namn'] or '')
    return {'server': (res.get('serverInfo') or {}).get('name'), 'instruktioner': res.get('instructions'), 'verktyg': verktyg}


def jamfor(fore, efter):
    andrat = []
    f = {t['namn']: t for t in fore['verktyg']}; e = {t['namn']: t for t in efter['verktyg']}
    for n in sorted(set(e) - set(f)): andrat.append(f'nytt verktyg: {n}')
    for n in sorted(set(f) - set(e)): andrat.append(f'borttaget verktyg: {n}')
    for n in sorted(set(f) & set(e)):
        if f[n]['beskrivning'] != e[n]['beskrivning']: andrat.append(f'ny beskrivning: {n}')
        if f[n]['indata'] != e[n]['indata']: andrat.append(f'nya parametrar: {n}')
        if f[n]['annoteringar'] != e[n]['annoteringar']: andrat.append(f'nya annoteringar: {n}')
    if fore.get('instruktioner') != efter.get('instruktioner'): andrat.append('nya instruktioner till modellen')
    return andrat


def main():
    uppdatera = '--uppdatera' in sys.argv
    os.makedirs(UT, exist_ok=True)
    andrade = 0
    for s in json.load(open(LISTA)):
        namn = s['namn']; fil = os.path.join(UT, f'{namn}.json')
        try: ny = las(s)
        except Exception as fel:
            print(f'⚠️ {namn}: gick inte att läsa ({str(fel)[:120]})'); continue
        if ny is None:
            print(f'{namn}: kräver inloggning, låses vid första körningen med token'); continue
        hash_ = hashlib.sha256(json.dumps(ny, ensure_ascii=False, sort_keys=True).encode()).hexdigest()[:16]
        if not os.path.exists(fil):
            json.dump(ny, open(fil, 'w'), ensure_ascii=False, indent=1, sort_keys=True)
            print(f'{namn}: låst första gången, {len(ny["verktyg"])} verktyg, {hash_}'); continue
        fore = json.load(open(fil))
        diff = jamfor(fore, ny)
        if not diff:
            print(f'{namn}: oförändrad, {len(ny["verktyg"])} verktyg, {hash_}'); continue
        andrade += 1
        print(f'⚠️ {namn}: ÄNDRAD sedan låsningen – ' + '; '.join(diff))
        if uppdatera:
            json.dump(ny, open(fil, 'w'), ensure_ascii=False, indent=1, sort_keys=True); print(f'   {namn}: den nya listan är godtagen')
    if andrade and not uppdatera:
        print(f'{andrade} servrar har ändrats. Läs ändringarna; godta dem med: python3 -I skript/mcp-verktygslas.py --uppdatera')


if __name__ == '__main__':
    main()
