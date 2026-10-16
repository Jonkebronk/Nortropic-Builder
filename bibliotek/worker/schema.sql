-- Loggen över samtycken (worker/samtyckeslogg.ts). Ingen IP-adress, bara ett slumpat id, versionen, valen och sidan.
CREATE TABLE IF NOT EXISTS samtycke (
  id TEXT NOT NULL,
  tid TEXT NOT NULL,
  version INTEGER NOT NULL,
  statistik INTEGER NOT NULL,
  marknadsforing INTEGER NOT NULL,
  sida TEXT
);
CREATE INDEX IF NOT EXISTS samtycke_id ON samtycke (id);
CREATE INDEX IF NOT EXISTS samtycke_tid ON samtycke (tid);
