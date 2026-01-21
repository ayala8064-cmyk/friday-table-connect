-- Create elderly registration table
CREATE TABLE public.elderly (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  birth_date DATE,
  address TEXT,
  origin TEXT CHECK (origin IN ('sephardic', 'ashkenazi')),
  gender TEXT CHECK (gender IN ('male', 'female')),
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'matched', 'met')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.elderly ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert (public registration form)
CREATE POLICY "Anyone can register as elderly" 
ON public.elderly 
FOR INSERT 
WITH CHECK (true);

-- For now, allow reading all records (can be restricted later with admin role)
CREATE POLICY "Allow reading elderly records" 
ON public.elderly 
FOR SELECT 
USING (true);