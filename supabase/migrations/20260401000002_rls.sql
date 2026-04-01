-- =================================================================
-- ManaCup — Row Level Security (RLS)
-- =================================================================
-- Lectura pública per a tothom (és un web públic).
-- Escriptura (INSERT/UPDATE) restringida:
--   - partides: qualsevol pot actualitzar el resultat d'una partida
--     (la validació de negoci es fa a l'Edge Function si cal)
--   - assistents_trobada: qualsevol pot confirmar assistència
--   - jugadors / rondes / trobades / campionat: només rol service_role
--     (gestionat des del tauler de Supabase o scripts d'importació)
-- =================================================================

-- -------------------------
-- campionat
-- -------------------------
ALTER TABLE campionat ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Lectura pública de campionat"
  ON campionat FOR SELECT
  USING (true);

-- -------------------------
-- jugadors
-- -------------------------
ALTER TABLE jugadors ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Lectura pública de jugadors"
  ON jugadors FOR SELECT
  USING (true);

-- -------------------------
-- rondes
-- -------------------------
ALTER TABLE rondes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Lectura pública de rondes"
  ON rondes FOR SELECT
  USING (true);

-- -------------------------
-- partides
-- -------------------------
ALTER TABLE partides ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Lectura pública de partides"
  ON partides FOR SELECT
  USING (true);

-- Qualsevol visitant pot actualitzar el resultat d'una partida pendent.
-- Nota: per a producció considera afegir autenticació de jugador.
CREATE POLICY "Actualitzar resultat d'una partida"
  ON partides FOR UPDATE
  USING (estat IN ('pendent', 'Nova ronda', 'En curs'))
  WITH CHECK (true);

-- -------------------------
-- trobades
-- -------------------------
ALTER TABLE trobades ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Lectura pública de trobades"
  ON trobades FOR SELECT
  USING (true);

-- -------------------------
-- assistents_trobada
-- -------------------------
ALTER TABLE assistents_trobada ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Lectura pública d'assistents"
  ON assistents_trobada FOR SELECT
  USING (true);

CREATE POLICY "Qualsevol pot confirmar assistència (insert)"
  ON assistents_trobada FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Qualsevol pot modificar la seva assistència (update)"
  ON assistents_trobada FOR UPDATE
  USING (true)
  WITH CHECK (true);

-- -------------------------
-- Storage: imatges-partides
-- -------------------------
CREATE POLICY "Lectura pública d'imatges"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'imatges-partides');

CREATE POLICY "Qualsevol pot pujar imatges de partides"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'imatges-partides');

CREATE POLICY "Qualsevol pot substituir imatges de partides"
  ON storage.objects FOR UPDATE
  USING (bucket_id = 'imatges-partides')
  WITH CHECK (bucket_id = 'imatges-partides');
