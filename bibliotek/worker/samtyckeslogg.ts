// Worker för en publicerad sajt: de statiska sidorna ur dist, och /api/samtycke som sparar besökarens val i D1.
// GDPR art. 7.1: den personuppgiftsansvarige ska kunna visa att den registrerade har samtyckt. Googles policy för användarsamtycke:
// "Keep records of consent". Loggen får ett slumpat id, versionen, valen och sidan, men ingen IP-adress (dataminimering, art. 5.1 c).
// Klienten loggar när ett ja ges och när ett ja återkallas; Workern godtar alla kombinationer av valen.
// Raderna rensas efter LAGRING_DAGAR dagar av ett schemalagt jobb. Mallen kopieras till sajtens worker/index.ts (guide/2-8-teknik-och-kvalitet.md).
// Indata prövas till längd, format och typ (OWASP REST Security Cheat Sheet, Input validation), och anropstakten begränsas per klient
// (OWASP API4:2023). IP-adressen är bara nyckel i Cloudflares Rate Limiting-bindning och sparas inte.
// _headers gäller inte svar som Workern skapar, så de får sina huvuden här (Cloudflare, Static assets headers).
interface Env { ASSETS: Fetcher; DB: D1Database; LAGRING_DAGAR?: string; RATE_LIMITER?: RateLimit }

const MAX_BYTE = 2000;
// Tiden sparas och jämförs i samma format, ISO 8601 i UTC med millisekunder ('2026-10-16T09:00:00.000Z'), eftersom SQLite jämför TEXT
// tecken för tecken och datetime() skriver mellanslag i stället för T (sqlite.org/lang_datefunc.html).
const ISO_NU = `strftime('%Y-%m-%dT%H:%M:%fZ', 'now')`;

const svar = (status: number, text?: string, extra: Record<string, string> = {}) => new Response(text ?? null, {
  status,
  headers: { 'x-content-type-options': 'nosniff', 'cache-control': 'no-store', ...(text ? { 'content-type': 'text/plain; charset=utf-8' } : {}), ...extra },
});

const arObjekt = (v: unknown): v is Record<string, unknown> => typeof v === 'object' && v !== null && !Array.isArray(v);

// Kroppen läses som ström och räknas i byte, så att gränsen gäller också utan content-length (chunked). null betyder för stor.
async function lasKropp(req: Request): Promise<string | null> {
  if (!req.body) return '';
  const lasare = req.body.getReader();
  const delar: Uint8Array[] = [];
  let storlek = 0;
  for (;;) {
    const { done, value } = await lasare.read();
    if (done) break;
    storlek += value.byteLength;
    if (storlek > MAX_BYTE) { await lasare.cancel(); return null; }
    delar.push(value);
  }
  const allt = new Uint8Array(storlek);
  let plats = 0;
  for (const del of delar) { allt.set(del, plats); plats += del.byteLength; }
  return new TextDecoder('utf-8', { fatal: true, ignoreBOM: false }).decode(allt);
}

async function samtycke(req: Request, env: Env, url: URL): Promise<Response> {
  // Fetch Metadata först: ett anrop som webbläsaren märker som från en annan sajt avvisas innan något annat prövas
  // (W3C Fetch Metadata Request Headers; OWASP CSRF Prevention Cheat Sheet; guide/2-8, Formulär, mönster 0; kontroll 10f).
  if (req.headers.get('sec-fetch-site') === 'cross-site') return svar(403, 'Från en annan sajt');
  if (req.method !== 'POST') return svar(405, 'Metoden stöds inte', { allow: 'POST' });
  // Webbläsare skickar Origin vid POST (MDN Origin). Strängen jämförs direkt: 'null' och ogiltiga värden blir 403, inte ett fel.
  if (req.headers.get('origin') !== url.origin) return svar(403, 'Fel ursprung');
  // OWASP ASVS 4.0.3 V13.2.5: kontrollera Content-Type.
  if (!/^application\/json\s*(;|$)/i.test(req.headers.get('content-type') ?? '')) return svar(415, 'Kräver application/json');
  // Rate Limiting-bindningen (developers.cloudflare.com/workers/runtime-apis/bindings/rate-limit/). Saknas den hoppas steget över.
  // Den är tillåtande och räknar per Cloudflare-plats; ett fel i den släpper igenom anropet hellre än att tappa ett samtycke.
  if (env.RATE_LIMITER) {
    const { success } = await env.RATE_LIMITER.limit({ key: req.headers.get('cf-connecting-ip') ?? 'okand' }).catch(() => ({ success: true }));
    if (!success) return svar(429, 'För många anrop', { 'retry-after': '60' });
  }
  if (Number(req.headers.get('content-length') ?? 0) > MAX_BYTE) return svar(413, 'För stort');
  let text: string | null;
  try { text = await lasKropp(req); } catch { return svar(400, 'Ogiltig kropp'); }
  if (text === null) return svar(413, 'För stort');
  let d: unknown;
  try { d = JSON.parse(text); } catch { return svar(400, 'Ogiltig JSON'); }
  if (!arObjekt(d)) return svar(400, 'Ofullständigt');
  const { id, version, val, sida } = d;
  // Valen ska ha exakt de kategorier som tabellen har kolumner för (schema.sql), med booleska värden.
  const valOk = arObjekt(val) && Object.keys(val).sort().join() === 'marknadsforing,statistik'
    && typeof val.statistik === 'boolean' && typeof val.marknadsforing === 'boolean';
  if (typeof id !== 'string' || !/^[0-9a-z-]{8,40}$/i.test(id) || typeof version !== 'number' || !Number.isInteger(version)
    || version < 1 || version > 1000 || !valOk) return svar(400, 'Ofullständigt');
  const sidaOk = typeof sida === 'string' && /^\/[a-z0-9/-]{0,100}$/.test(sida) ? sida : '';
  try {
    await env.DB.prepare(`INSERT INTO samtycke (id, tid, version, statistik, marknadsforing, sida) VALUES (?, ${ISO_NU}, ?, ?, ?, ?)`)
      .bind(id, version, val.statistik ? 1 : 0, val.marknadsforing ? 1 : 0, sidaOk).run();
  } catch (e) {
    console.error('samtycke: D1', e instanceof Error ? e.message : String(e));
    return svar(503, 'Tillfälligt fel', { 'retry-after': '60' });
  }
  return svar(204);
}

export default {
  async fetch(req: Request, env: Env): Promise<Response> {
    const url = new URL(req.url);
    if (url.pathname !== '/api/samtycke') return env.ASSETS.fetch(req);
    // Inga 500 med stackspår till klienten: oväntade fel blir 503 och loggas utan IP-adress.
    try { return await samtycke(req, env, url); } catch (e) {
      console.error('samtycke', e instanceof Error ? e.message : String(e));
      return svar(503, 'Tillfälligt fel');
    }
  },
  async scheduled(_: ScheduledController, env: Env): Promise<void> {
    const dagar = Number(env.LAGRING_DAGAR ?? 730);
    // '-NaN days' ger NULL i SQLite och raderar tyst ingenting, så värdet prövas först (GDPR art. 5.1 e).
    if (!Number.isInteger(dagar) || dagar < 1 || dagar > 3650) {
      console.error(`samtycke: LAGRING_DAGAR '${env.LAGRING_DAGAR}' är inget heltal 1–3650; ingen rensning`);
      return;
    }
    try {
      const r = await env.DB.prepare(`DELETE FROM samtycke WHERE tid < strftime('%Y-%m-%dT%H:%M:%fZ', 'now', ?)`).bind(`-${dagar} days`).run();
      console.log(`samtycke: rensade ${r.meta.changes} rader äldre än ${dagar} dagar`);
    } catch (e) {
      console.error('samtycke: rensningen misslyckades', e instanceof Error ? e.message : String(e));
      throw e;
    }
  },
} satisfies ExportedHandler<Env>;
