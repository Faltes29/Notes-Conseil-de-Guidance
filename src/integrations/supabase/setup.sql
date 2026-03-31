-- Ajout de la contrainte d'unicité pour permettre l'upsert sur l'élève et la période
ALTER TABLE public.reports 
ADD CONSTRAINT reports_student_id_period_key UNIQUE (student_id, period);