ALTER TABLE public.content DROP CONSTRAINT IF EXISTS content_kind_check;
ALTER TABLE public.content ADD CONSTRAINT content_kind_check CHECK (kind IN ('slideshow','services','doctors','gallery','youtube','testimonials','facilities','jobs'));
ALTER TABLE public.website_settings ADD COLUMN IF NOT EXISTS pages jsonb NOT NULL DEFAULT '{}'::jsonb;
ALTER TABLE public.website_settings ADD CONSTRAINT website_settings_pages_object CHECK (jsonb_typeof(pages)='object');

CREATE TABLE public.job_applications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  job_id uuid REFERENCES public.content(id) ON DELETE SET NULL,
  position text NOT NULL CHECK (length(position) BETWEEN 2 AND 180),
  full_name text NOT NULL CHECK (length(full_name) BETWEEN 2 AND 80),
  phone text NOT NULL CHECK (phone ~ '^[0-9]{10,15}$'),
  email text NOT NULL DEFAULT '' CHECK (email='' OR email ~ '^[^@ ]+@[^@ ]+\.[^@ ]+$'),
  qualification text NOT NULL DEFAULT '' CHECK (length(qualification)<=200),
  experience text NOT NULL DEFAULT '' CHECK (length(experience)<=200),
  resume_link text NOT NULL DEFAULT '' CHECK (resume_link='' OR resume_link ~ '^https://'),
  message text NOT NULL DEFAULT '' CHECK (length(message)<=1500),
  status text NOT NULL DEFAULT 'New' CHECK (status IN ('New','Reviewed','Shortlisted','Rejected','Hired')),
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, UPDATE, DELETE ON public.job_applications TO authenticated;
GRANT ALL ON public.job_applications TO service_role;
ALTER TABLE public.job_applications ENABLE ROW LEVEL SECURITY;
CREATE POLICY admin_job_applications ON public.job_applications FOR ALL TO authenticated USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));
CREATE INDEX job_applications_created ON public.job_applications(created_at DESC);

CREATE FUNCTION public.submit_job_application(_job_id uuid, _position text, _name text, _phone text, _email text, _qualification text, _experience text, _resume text, _message text)
RETURNS uuid LANGUAGE plpgsql SECURITY DEFINER SET search_path=public AS $$
DECLARE new_id uuid; valid_job uuid;
BEGIN
  SELECT id INTO valid_job FROM public.content WHERE id=_job_id AND kind='jobs' AND published;
  INSERT INTO public.job_applications(job_id, position, full_name, phone, email, qualification, experience, resume_link, message)
  VALUES (valid_job, _position, _name, _phone, _email, _qualification, _experience, _resume, _message) RETURNING id INTO new_id;
  RETURN new_id;
END $$;
REVOKE ALL ON FUNCTION public.submit_job_application(uuid,text,text,text,text,text,text,text,text) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.submit_job_application(uuid,text,text,text,text,text,text,text,text) TO service_role;