# Verktygslåset för MCP-servrar (BESLUT.md 2026-10-16, Senaste version med verktygslås …; guide/bilaga-a-verktyg.md).
# En server kan byta verktyg utan ny version (MCP-specifikationen, server/tools.mdx, List Changed Notification), Claude Code
# hämtar den nya listan utan att fråga (Claude Code, MCP), och en server kan skriva om en beskrivning efter att klienten har
# godkänt den (Invariant Labs, Tool Poisoning Attacks). Skriptet läser initialize och tools/list från varje server i
# inventering/mcp-servrar.json, sparar dem i inventering/mcp-verktyg/<namn>.json och rapporterar vad som har ändrats sedan
# förra körningen: verktyg som tillkommit, försvunnit eller fått ny beskrivning, och ändrade instruktioner. Johnny ser
# ändringarna innan servern används.
# Adress, kommando, huvuden och miljövariabler läses också ur byggsessionens egen konfiguration (~/.claude-bygg/.claude.json,
# lokal scope för repot), så att en server med nyckel kan låsas. Nycklarna stannar i minnet: de skrivs aldrig ut och sparas
# aldrig. Servrar med OAuth (token i macOS nyckelring) och claude.ai-connectorer når skriptet inte; de står som olåsta.
# Användning från repots rot: python3 -I skript/mcp-verktygslas.py [--uppdatera]
#   utan --uppdatera jämförs bara, och sparade listor skrivs inte över; med --uppdatera godtas de nya listorna.
# Bygger på utkastet från andra varvets MCP-grupp (verktygslista.py, prövat på fem servrar).
import hashlib, json, os, subprocess, sys, threading, urllib.error, urllib.request

ROT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
LISTA = os.path.join(ROT, 'inventering', 'mcp-servrar.json')
UT = os.path.join(ROT, 'inventering', 'mcp-verktyg')
KONFIG = os.path.join(os.environ.get('CLAUDE_CONFIG_DIR') or os.path.expanduser('~/.claude-bygg'), '.claude.json')
TID_HTTP, TID_STDIO = 30, 120  # sekunder; stdio får längre tid, eftersom npx och uvx kan behöva hämta paketet först
INIT = {'jsonrpc': '2.0', 'id': 1, 'method': 'initialize',
        'params': {'protocolVersion': '2025-06-18', 'capabilities': {}, 'clientInfo': {'name': 'nortropic-verktygslas', 'version': '1'}}}
KLAR = {'jsonrpc': '2.0', 'method': 'notifications/initialized'}
VERKTYG = {'jsonrpc': '2.0', 'id': 2, 'method': 'tools/list', 'params': {}}


class Olast(Exception):
    """Servern går inte att låsa av ett känt skäl (inloggning, inte tillagd). Inget fel i servern."""


def konfiguration():
    try: return json.load(open(KONFIG)).get('projects', {}).get(ROT, {}).get('mcpServers', {}) or {}
    except (OSError, ValueError): return {}


def http(url, huvud):
    bas = {'content-type': 'application/json', 'accept': 'application/json, text/event-stream', 'user-agent': 'nortropic-verktygslas/1', **huvud}
    def post(kropp, sid=None):
        h = dict(bas)
        if sid: h['mcp-session-id'] = sid
        req = urllib.request.Request(url, data=json.dumps(kropp).encode(), headers=h, method='POST')
        try:
            with urllib.request.urlopen(req, timeout=TID_HTTP) as r:
                sid2 = r.headers.get('mcp-session-id') or sid
                raw = r.read().decode('utf-8', 'replace')
        except urllib.error.HTTPError as fel:
            if fel.code in (401, 403): raise Olast(f'kräver inloggning (HTTP {fel.code})')
            raise RuntimeError(f'HTTP {fel.code}')
        if raw.lstrip().startswith('{'): return json.loads(raw), sid2
        rader = [json.loads(l[5:]) for l in raw.splitlines() if l.startswith('data:') and l[5:].strip()]
        return (rader[-1] if rader else {}), sid2
    init, sid = post(INIT)
    try: post(KLAR, sid)
    except Exception: pass
    lista, _ = post(VERKTYG, sid)
    return init, lista


def stdio(kommando, miljo):
    p = subprocess.Popen(kommando, stdin=subprocess.PIPE, stdout=subprocess.PIPE, stderr=subprocess.DEVNULL, text=True,
                         env={**os.environ, **miljo})
    klocka = threading.Timer(TID_STDIO, p.kill); klocka.start()
    def skicka(m): p.stdin.write(json.dumps(m) + '\n'); p.stdin.flush()
    def vanta(id_):
        while True:
            rad = p.stdout.readline()
            if not rad:
                raise RuntimeError(f'inget svar inom {TID_STDIO} s' if not klocka.is_alive() else 'servern stängde utan svar')
            try: m = json.loads(rad)
            except ValueError: continue
            if m.get('id') == id_: return m
    try:
        skicka(INIT); init = vanta(1)
        skicka(KLAR); skicka(VERKTYG); lista = vanta(2)
        return init, lista
    finally:
        klocka.cancel(); p.kill()


def las(server, privat):
    # Listan i repot är publik och har aldrig nycklar; huvuden och miljövariabler med värden kommer ur byggsessionens konfiguration.
    if server.get('connector'): raise Olast('claude.ai-connector, låset når den inte')
    url = server.get('url') or privat.get('url')
    kommando = server.get('kommando') or ([privat['command'], *privat.get('args', [])] if privat.get('command') else None)
    if not (url or kommando): raise Olast('inte tillagd i byggsessionen')
    if url: init, lista = http(url, {**server.get('huvud', {}), **(privat.get('headers') or {})})
    else: init, lista = stdio(kommando, privat.get('env') or {})
    if 'error' in lista: raise RuntimeError(f"tools/list gav fel {lista['error'].get('code')}")
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
    lista, konf = json.load(open(LISTA)), konfiguration()
    andrade, olasta = 0, []
    for s in lista:
        namn = s['namn']; fil = os.path.join(UT, f'{namn}.json')
        try: ny = las(s, konf.get(namn, {}))
        except Olast as skal:
            olasta.append(f'{namn}: {skal}'); continue
        except Exception as fel:
            print(f'⚠️ {namn}: gick inte att läsa ({str(fel)[:120]})'); continue
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
    if olasta:
        print(f'Olåsta, {len(olasta)} av {len(lista)}: ' + '; '.join(olasta))
    # Listan i repot och byggsessionens konfiguration ska ha samma servrar (claude.ai-connectorer står bara i listan).
    i_listan = {s['namn'] for s in lista if not s.get('connector')}
    for n in sorted(set(konf) - i_listan): print(f'⚠️ {n}: finns i byggsessionen men inte i inventering/mcp-servrar.json')
    if andrade and not uppdatera:
        print(f'{andrade} ' + ('server har' if andrade == 1 else 'servrar har') + ' ändrats. Läs ändringarna; godta dem med: python3 -I skript/mcp-verktygslas.py --uppdatera')


if __name__ == '__main__':
    main()
