// Worker för en publicerad sajt: de statiska sidorna ur dist, och /api/samtycke som sparar besökarens val i D1.
// GDPR art. 7.1: den personuppgiftsansvarige ska kunna visa att den registrerade har samtyckt. Googles policy för användarsamtycke:
// "Keep records of consent". Loggen får ett slumpat id, versionen, valen och sidan, men ingen IP-adress (dataminimering, art. 5.1 c).
// Raderna rensas efter LAGRING_DAGAR dagar av ett schemalagt jobb. Mallen kopieras till sajtens worker/index.ts (guide/2-8-teknik-och-kvalitet.md).
interface Env { ASSETS: Fetcher; DB: D1Database; LAGRING_DAGAR?: string }

const svar = (status: number, text?: string) => new Response(text ?? null, { status, headers: { 'cache-control': 'no-store' } });

export default {
  async fetch(req: Request, env: Env): Promise<Response> {
    const url = new URL(req.url);
    if (url.pathname !== '/api/samtycke') return env.ASSETS.fetch(req);
    if (req.method !== 'POST') return new Response('Metoden stöds inte', { status: 405, headers: { allow: 'POST' } });
    const ursprung = req.headers.get('origin');
    if (ursprung && new URL(ursprung).host !== url.host) return svar(403, 'Fel ursprung');
    if (Number(req.headers.get('content-length') ?? 0) > 2000) return svar(413, 'För stort');
    let d: { id?: unknown; version?: unknown; val?: Record<string, unknown>; sida?: unknown };
    try { d = await req.json(); } catch { return svar(400, 'Ogiltig JSON'); }
    const id = typeof d.id === 'string' && /^[0-9a-z-]{8,40}$/i.test(d.id) ? d.id : null;
    const version = Number.isInteger(d.version) ? (d.version as number) : null;
    if (!id || version === null || !d.val || typeof d.val !== 'object') return svar(400, 'Ofullständigt');
    const sida = typeof d.sida === 'string' ? d.sida.slice(0, 200) : '';
    await env.DB.prepare('INSERT INTO samtycke (id, tid, version, statistik, marknadsforing, sida) VALUES (?, ?, ?, ?, ?, ?)')
      .bind(id, new Date().toISOString(), version, d.val.statistik === true ? 1 : 0, d.val.marknadsforing === true ? 1 : 0, sida).run();
    return svar(204);
  },
  async scheduled(_: ScheduledController, env: Env): Promise<void> {
    const dagar = Number(env.LAGRING_DAGAR ?? 730);
    await env.DB.prepare(`DELETE FROM samtycke WHERE tid < datetime('now', ?)`).bind(`-${dagar} days`).run();
  },
} satisfies ExportedHandler<Env>;
