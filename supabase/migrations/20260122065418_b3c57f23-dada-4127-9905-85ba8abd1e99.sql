-- Add phone and email columns to elderly table
ALTER TABLE public.elderly 
ADD COLUMN phone text,
ADD COLUMN email text;

-- Add index for email for faster lookups
CREATE INDEX idx_elderly_email ON public.elderly(email) WHERE email IS NOT NULL;