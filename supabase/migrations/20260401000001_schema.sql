-- =================================================================
-- ManaCup — Migració de Google Apps Script + Sheets a Supabase
-- =================================================================
-- Schema principal: jugadors, partides, rondes, trobades, assistents
-- =================================================================

-- -------------------------
-- Taula: campionat
-- -------------------------
CREATE TABLE IF NOT EXISTS campionat (
  id        SERIAL PRIMARY KEY,
  nom       TEXT NOT NULL,
  temporada TEXT NOT NULL
);

INSERT INTO campionat (nom, temporada) VALUES ('XII ManaCup', '2025-26')
  ON CONFLICT DO NOTHING;

-- -------------------------
-- Taula: jugadors
-- -------------------------
CREATE TABLE IF NOT EXISTS jugadors (
  id         INTEGER PRIMARY KEY,
  nom        TEXT    NOT NULL,
  malnom2    TEXT    DEFAULT '',
  imatge     TEXT    DEFAULT '',
  telefon    TEXT    DEFAULT '',
  baixa      BOOLEAN DEFAULT FALSE,
  barruf     TEXT    DEFAULT '',
  brf        TEXT    DEFAULT '',
  barruf_r20 TEXT    DEFAULT '',
  pos_brf    TEXT    DEFAULT '',
  cat_brf    TEXT    DEFAULT '',
  vd         TEXT    DEFAULT '',
  atp        TEXT    DEFAULT '',
  campionats TEXT    DEFAULT '',
  podis      TEXT    DEFAULT '',
  diplomes   TEXT    DEFAULT '',
  descripcio TEXT    DEFAULT '',
  etiqueta   TEXT    DEFAULT '',
  semafor    TEXT    DEFAULT 'primary',
  grup       TEXT    DEFAULT ''
);

-- -------------------------
-- Taula: rondes (calendari)
-- -------------------------
CREATE TABLE IF NOT EXISTS rondes (
  id          INTEGER PRIMARY KEY,
  ronda       INTEGER NOT NULL,
  data_inici  TEXT    DEFAULT '',
  data_fi     TEXT    DEFAULT '',
  inici_rnd   BOOLEAN DEFAULT FALSE,
  fi_rnd      BOOLEAN DEFAULT FALSE,
  estat       TEXT    DEFAULT 'pendent',
  programades INTEGER DEFAULT 0,
  jugades     INTEGER DEFAULT 0
);

-- -------------------------
-- Taula: partides (aparellaments)
-- Cada fila = 1 partida completa (les dades de tots dos jugadors)
-- -------------------------
CREATE TABLE IF NOT EXISTS partides (
  id            BIGINT  PRIMARY KEY,
  ronda         INTEGER NOT NULL,
  jugador1_id   INTEGER REFERENCES jugadors(id),
  jugador2_id   INTEGER REFERENCES jugadors(id),
  jugador1_nom  TEXT    NOT NULL DEFAULT '',
  jugador2_nom  TEXT    NOT NULL DEFAULT '',
  puntuacio_1   NUMERIC,
  puntuacio_2   NUMERIC,
  mot_1         TEXT    DEFAULT '',
  puntsmot_1    NUMERIC DEFAULT 0,
  scrabbles_1   INTEGER DEFAULT 0,
  mot_2         TEXT    DEFAULT '',
  puntsmot_2    NUMERIC DEFAULT 0,
  scrabbles_2   INTEGER DEFAULT 0,
  lletra_1      TEXT    DEFAULT '',
  punts_lletra_1 NUMERIC DEFAULT 0,
  lletra_2      TEXT    DEFAULT '',
  punts_lletra_2 NUMERIC DEFAULT 0,
  comentaris    TEXT    DEFAULT '',
  full_img      TEXT    DEFAULT '',
  tauler_img    TEXT    DEFAULT '',
  data_partida  TEXT    DEFAULT '',
  punts_social  INTEGER DEFAULT 0,
  lloc_partida  TEXT    DEFAULT '',
  estat         TEXT    DEFAULT 'pendent',
  taula         INTEGER,
  pos_conjunta  INTEGER,
  punts_velocitat NUMERIC DEFAULT 0,
  created_at    TIMESTAMPTZ DEFAULT now(),
  updated_at    TIMESTAMPTZ DEFAULT now()
);

-- Trigger per actualitzar updated_at automàticament
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER partides_updated_at
  BEFORE UPDATE ON partides
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- -------------------------
-- Taula: trobades
-- -------------------------
CREATE TABLE IF NOT EXISTS trobades (
  id             INTEGER PRIMARY KEY,
  trobada        TEXT    DEFAULT '',
  data_hora      TEXT    DEFAULT '',
  data_text      TEXT    DEFAULT '',
  hora           TEXT    DEFAULT '',
  hora_utc       TEXT    DEFAULT '',
  lloc           TEXT    DEFAULT '',
  adreca         TEXT    DEFAULT '',
  maps           TEXT    DEFAULT '',
  sopar          BOOLEAN DEFAULT FALSE,
  mostra         BOOLEAN DEFAULT FALSE,
  confirmat      BOOLEAN DEFAULT FALSE,
  telegram       TEXT    DEFAULT '',
  enviat         BOOLEAN DEFAULT FALSE,
  max_ronda      INTEGER DEFAULT 0,
  rondes_a_jugar INTEGER DEFAULT 1
);

-- -------------------------
-- Taula: assistents_trobada
-- Upsert per (id_trobada, nom) — un jugador pot modificar la seva resposta
-- -------------------------
CREATE TABLE IF NOT EXISTS assistents_trobada (
  id          SERIAL PRIMARY KEY,
  id_trobada  INTEGER REFERENCES trobades(id) ON DELETE CASCADE,
  nom         TEXT    NOT NULL,
  assistencia TEXT    DEFAULT '',
  primera_partida TEXT DEFAULT '',
  adv1        TEXT    DEFAULT '',
  segona_partida  TEXT DEFAULT '',
  adv2        TEXT    DEFAULT '',
  joc         TEXT    DEFAULT '',
  sopar       TEXT    DEFAULT '',
  data        TEXT    DEFAULT '',
  created_at  TIMESTAMPTZ DEFAULT now(),
  UNIQUE (id_trobada, nom)
);

-- -------------------------
-- Supabase Storage: bucket per a imatges de partides
-- -------------------------
INSERT INTO storage.buckets (id, name, public)
VALUES ('imatges-partides', 'imatges-partides', TRUE)
ON CONFLICT (id) DO NOTHING;
