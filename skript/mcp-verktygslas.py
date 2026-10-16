# Verktygslåset för MCP-servrar (BESLUT.md 2026-10-16, Senaste version med verktygslås …; guide/bilaga-a-verktyg.md).
# En server kan byta verktyg utan ny version (MCP-specifikationen, server/tools.mdx, List Changed Notification), Claude Code
# hämtar den nya listan utan att fråga (Claude Code, MCP), och en server kan skriva om en beskrivning efter att klienten har
# godkänt den (Invariant Labs, Tool Poisoning Attacks). Skriptet läser varje server i inventering/mcp-servrar.json hel:
# initialize (instruktioner, flaggor, namn och beskrivning), tools/list, och prompts/list, resources/list och
# resources/templates/list när servern anger flaggorna prompts och resources. Alla sidor hämtas (nextCursor). Allt sparas i
# inventering/mcp-verktyg/<namn>.json, och skriptet rapporterar vad som har ändrats sedan förra körningen. Johnny ser
# ändringarna innan servern används. Fälten följer MCP-schemat 2025-11-25 (Tool: title, outputSchema, execution; Prompt;
# Resource; ResourceTemplate; ServerCapabilities); översynens punkt 11 (kunskap/research/2026-10-16_verktyg-och-skills-full-potential.md).
# En låsfil från före utökningen (utan "format") jämförs i de delar den har; de nya delarna låses första gången utan --uppdatera.
# MCP 2026-07-28 tar bort initialize och inför server/discover (schema/2026-07-28/schema.ts). En server som bara talar den
# versionen står som "gick inte att läsa (initialize gav fel …)"; då byggs låset ut för den, inte förr.
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
FORMAT = 2
SIDOR = 50  # högst så många sidor per lista
INIT = {'protocolVersion': '2025-06-18', 'capabilities': {}, 'clientInfo': {'name': 'nortropic-verktygslas', 'version': '2'}}
# Fälten i låsfilen och var de kommer ifrån. Ikoner sparas inte: de når inte modellen och kan vara stora data-URI:er.
VERKTYG_FALT = {'namn': 'name', 'titel': 'title', 'beskrivning': 'description', 'indata': 'inputSchema',
                'utdata': 'outputSchema', 'annoteringar': 'annotations', 'utforande': 'execution', 'meta': '_meta'}
PROMPT_FALT = {'namn': 'name', 'titel': 'title', 'beskrivning': 'description', 'argument': 'arguments', 'meta': '_meta'}
RESURS_FALT = {'uri': 'uri', 'namn': 'name', 'titel': 'title', 'beskrivning': 'description', 'mimetyp': 'mimeType',
               'annoteringar': 'annotations', 'meta': '_meta'}
MALL_FALT = {'mall': 'uriTemplate', 'namn': 'name', 'titel': 'title', 'beskrivning': 'description', 'mimetyp': 'mimeType',
             'annoteringar': 'annotations', 'meta': '_meta'}
# Listorna utöver verktygen: nyckel i låsfilen, metod, fält i svaret, flagga som krävs, fältkarta och fältet som identifierar posten.
LISTOR = [('promptar', 'prompts/list', 'prompts', 'prompts', PROMPT_FALT, 'namn'),
          ('resurser', 'resources/list', 'resources', 'resources', RESURS_FALT, 'uri'),
          ('resursmallar', 'resources/templates/list', 'resourceTemplates', 'resources', MALL_FALT, 'mall')]
NAMN = {'promptar': ('prompt', 'prompten'), 'resurser': ('resurs', 'resursen'), 'resursmallar': ('resursmall', 'resursmallen')}


class Olast(Exception):
    """Servern går inte att låsa av ett känt skäl (inloggning, inte tillagd). Inget fel i servern."""


class Svarsfel(Exception):
    """Servern svarade med ett JSON-RPC-fel."""


def konfiguration():
    try: return json.load(open(KONFIG)).get('projects', {}).get(ROT, {}).get('mcpServers', {}) or {}
    except (OSError, ValueError): return {}


def http(url, huvud):
    bas = {'content-type': 'application/json', 'accept': 'application/json, text/event-stream', 'user-agent': 'nortropic-verktygslas/2', **huvud}
    sid = None
    def post(kropp):
        nonlocal sid
        h = dict(bas)
        if sid: h['mcp-session-id'] = sid
        req = urllib.request.Request(url, data=json.dumps(kropp).encode(), headers=h, method='POST')
        try:
            with urllib.request.urlopen(req, timeout=TID_HTTP) as r:
                sid = r.headers.get('mcp-session-id') or sid
                raw = r.read().decode('utf-8', 'replace')
        except urllib.error.HTTPError as fel:
            if fel.code in (401, 403): raise Olast(f'kräver inloggning (HTTP {fel.code})')
            raise RuntimeError(f'HTTP {fel.code}')
        if raw.lstrip().startswith('{'): return json.loads(raw)
        rader = [json.loads(l[5:]) for l in raw.splitlines() if l.startswith('data:') and l[5:].strip()]
        svar = [m for m in rader if m.get('id') == kropp.get('id')]
        return (svar or rader or [{}])[-1]
    def notis(metod):
        try: post({'jsonrpc': '2.0', 'method': metod})
        except Exception: pass
    return post, notis, lambda: None


def stdio(kommando, miljo):
    p = subprocess.Popen(kommando, stdin=subprocess.PIPE, stdout=subprocess.PIPE, stderr=subprocess.DEVNULL, text=True,
                         env={**os.environ, **miljo})
    klocka = threading.Timer(TID_STDIO, p.kill); klocka.start()
    def skicka(m): p.stdin.write(json.dumps(m) + '\n'); p.stdin.flush()
    def post(kropp):
        skicka(kropp)
        while True:
            rad = p.stdout.readline()
            if not rad:
                raise RuntimeError(f'inget svar inom {TID_STDIO} s' if not klocka.is_alive() else 'servern stängde utan svar')
            try: m = json.loads(rad)
            except ValueError: continue
            if m.get('id') == kropp['id']: return m
    def stang(): klocka.cancel(); p.kill()
    return post, lambda metod: skicka({'jsonrpc': '2.0', 'method': metod}), stang


def falt(post, karta):
    return {ut: post.get(in_) for ut, in_ in karta.items()}


def las(server, privat):
    # Listan i repot är publik och har aldrig nycklar; huvuden och miljövariabler med värden kommer ur byggsessionens konfiguration.
    if server.get('connector'): raise Olast('claude.ai-connector, låset når den inte')
    url = server.get('url') or privat.get('url')
    kommando = server.get('kommando') or ([privat['command'], *privat.get('args', [])] if privat.get('command') else None)
    if not (url or kommando): raise Olast('inte tillagd i byggsessionen')
    post, notis, stang = http(url, {**server.get('huvud', {}), **(privat.get('headers') or {})}) if url else stdio(kommando, privat.get('env') or {})
    nasta_id = iter(range(1, 10_000))
    def fraga(metod, params):
        svar = post({'jsonrpc': '2.0', 'id': next(nasta_id), 'method': metod, 'params': params})
        if 'error' in svar: raise Svarsfel(f"{metod} gav fel {svar['error'].get('code')}")
        return svar.get('result') or {}
    def alla(metod, nyckel):
        poster, markor = [], None
        for _ in range(SIDOR):
            res = fraga(metod, {'cursor': markor} if markor else {})
            poster += res.get(nyckel) or []
            markor = res.get('nextCursor')
            if not markor: return poster
        raise RuntimeError(f'{metod}: fler än {SIDOR} sidor')
    try:
        init = fraga('initialize', INIT)
        notis('notifications/initialized')
        try: verktyg = alla('tools/list', 'tools')
        except Svarsfel as fel: raise RuntimeError(str(fel))
        flaggor = init.get('capabilities') or {}
        info = init.get('serverInfo') or {}
        ny = {'format': FORMAT, 'server': info.get('name'), 'servertitel': info.get('title'), 'serverbeskrivning': info.get('description'),
              'instruktioner': init.get('instructions'), 'flaggor': flaggor,
              'verktyg': sorted((falt(t, VERKTYG_FALT) for t in verktyg), key=lambda t: t['namn'] or '')}
        for nyckel, metod, svarsfalt, flagga, karta, id_ in LISTOR:
            if flagga not in flaggor: ny[nyckel] = None; continue
            try: ny[nyckel] = sorted((falt(x, karta) for x in alla(metod, svarsfalt)), key=lambda x: x[id_] or '')
            except Svarsfel as fel: ny[nyckel] = {'fel': str(fel)}
        return ny
    finally:
        stang()


def jamfor_listor(fore, efter, id_, ord_):
    # Poster som tillkommit, försvunnit eller ändrats; fält som saknas i den gamla posten låses första gången och räknas inte.
    andrat = []
    if not isinstance(fore, list) or not isinstance(efter, list):
        return [] if fore == efter else [f'{ord_[0]}listan ändrad ({kort(fore)} → {kort(efter)})']
    f = {x[id_]: x for x in fore}; e = {x[id_]: x for x in efter}
    for n in sorted(set(e) - set(f)): andrat.append(f'ny {ord_[0]}: {n}')
    for n in sorted(set(f) - set(e)): andrat.append(f'borttagen {ord_[0]}: {n}')
    for n in sorted(set(f) & set(e)):
        nya = [k for k in e[n] if k in f[n] and f[n][k] != e[n][k]]
        if nya: andrat.append(f'{ord_[1]} {n}: nytt i ' + ', '.join(nya))
    return andrat


def kort(v):
    if v is None: return 'ingen flagga'
    if isinstance(v, list): return f'{len(v)} st'
    return v.get('fel', '?') if isinstance(v, dict) else str(v)


def jamfor(fore, efter):
    andrat = []
    f = {t['namn']: t for t in fore['verktyg']}; e = {t['namn']: t for t in efter['verktyg']}
    for n in sorted(set(e) - set(f)): andrat.append(f'nytt verktyg: {n}')
    for n in sorted(set(f) - set(e)): andrat.append(f'borttaget verktyg: {n}')
    for n in sorted(set(f) & set(e)):
        if f[n]['beskrivning'] != e[n]['beskrivning']: andrat.append(f'ny beskrivning: {n}')
        if f[n]['indata'] != e[n]['indata']: andrat.append(f'nya parametrar: {n}')
        if f[n]['annoteringar'] != e[n]['annoteringar']: andrat.append(f'nya annoteringar: {n}')
        for k, ord_ in (('titel', 'ny titel'), ('utdata', 'nytt utdataschema'), ('utforande', 'nytt utförande'), ('meta', 'nytt _meta')):
            if k in f[n] and f[n][k] != e[n][k]: andrat.append(f'{ord_}: {n}')
    if fore.get('instruktioner') != efter.get('instruktioner'): andrat.append('nya instruktioner till modellen')
    for k, ord_ in (('flaggor', 'nya flaggor'), ('servertitel', 'ny servertitel'), ('serverbeskrivning', 'ny serverbeskrivning')):
        if k in fore and fore[k] != efter[k]: andrat.append(ord_)
    for nyckel, *_, id_ in LISTOR:
        if nyckel in fore: andrat += jamfor_listor(fore[nyckel], efter[nyckel], id_, NAMN[nyckel])
    return andrat


def sammanfattning(ny):
    delar = [f'{len(ny["verktyg"])} verktyg']
    for nyckel, *_ in LISTOR:
        if ny[nyckel] is not None: delar.append(f'{len(ny[nyckel])} {nyckel}' if isinstance(ny[nyckel], list) else f'{nyckel}: {kort(ny[nyckel])}')
    if ny.get('instruktioner'): delar.append('instruktioner')
    return ', '.join(delar)


def spara(ny, fil):
    json.dump(ny, open(fil, 'w'), ensure_ascii=False, indent=1, sort_keys=True)


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
            spara(ny, fil); print(f'{namn}: låst första gången, {sammanfattning(ny)}, {hash_}'); continue
        fore = json.load(open(fil))
        diff = jamfor(fore, ny)
        if not diff:
            if fore.get('format') != FORMAT:
                spara(ny, fil); print(f'{namn}: oförändrad, och låset utökat: {sammanfattning(ny)}, {hash_}')
            else:
                print(f'{namn}: oförändrad, {sammanfattning(ny)}, {hash_}')
            continue
        andrade += 1
        print(f'⚠️ {namn}: ÄNDRAD sedan låsningen – ' + '; '.join(diff))
        if uppdatera:
            spara(ny, fil); print(f'   {namn}: den nya listan är godtagen')
    if olasta:
        print(f'Olåsta, {len(olasta)} av {len(lista)}: ' + '; '.join(olasta))
    # Listan i repot och byggsessionens konfiguration ska ha samma servrar (claude.ai-connectorer står bara i listan).
    i_listan = {s['namn'] for s in lista if not s.get('connector')}
    for n in sorted(set(konf) - i_listan): print(f'⚠️ {n}: finns i byggsessionen men inte i inventering/mcp-servrar.json')
    if andrade and not uppdatera:
        print(f'{andrade} ' + ('server har' if andrade == 1 else 'servrar har') + ' ändrats. Läs ändringarna; godta dem med: python3 -I skript/mcp-verktygslas.py --uppdatera')


if __name__ == '__main__':
    main()
