-- Create app_role enum for user roles
CREATE TYPE public.app_role AS ENUM ('admin', 'moderator', 'user');

-- Create user_roles table
CREATE TABLE public.user_roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    role app_role NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    UNIQUE (user_id, role)
);

-- Enable RLS on user_roles
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Create security definer function to check roles (prevents recursive RLS)
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- RLS policy for user_roles - only admins can read roles
CREATE POLICY "Admins can read all roles"
ON public.user_roles
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Users can see their own roles
CREATE POLICY "Users can read own roles"
ON public.user_roles
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

-- Only admins can manage roles
CREATE POLICY "Admins can manage roles"
ON public.user_roles
FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Create registration rate limiting table
CREATE TABLE public.registration_rate_limit (
    ip_hash TEXT PRIMARY KEY,
    request_count INT DEFAULT 1,
    window_start TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS on rate limit table
ALTER TABLE public.registration_rate_limit ENABLE ROW LEVEL SECURITY;

-- Only service role can access rate limit table
CREATE POLICY "Service role only"
ON public.registration_rate_limit
FOR ALL
TO service_role
USING (true)
WITH CHECK (true);

-- Fix elderly table: Drop overly permissive policies
DROP POLICY IF EXISTS "Allow reading elderly records" ON public.elderly;
DROP POLICY IF EXISTS "Anyone can register as elderly" ON public.elderly;

-- Add database-level validation constraints to elderly table
ALTER TABLE public.elderly
  ADD CONSTRAINT first_name_length CHECK (length(first_name) BETWEEN 1 AND 100),
  ADD CONSTRAINT last_name_length CHECK (length(last_name) BETWEEN 1 AND 100),
  ADD CONSTRAINT address_length CHECK (address IS NULL OR length(address) <= 500),
  ADD CONSTRAINT email_format CHECK (email IS NULL OR email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$'),
  ADD CONSTRAINT phone_format CHECK (phone IS NULL OR phone ~* '^[0-9\-\+\s\(\)]+$');

-- Create new secure RLS policies for elderly table
-- Only authenticated admins can read elderly records
CREATE POLICY "Admins can read elderly records"
ON public.elderly
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Allow authenticated users to read their own record (if they have one linked)
CREATE POLICY "Users can read own elderly record"
ON public.elderly
FOR SELECT
TO authenticated
USING (email = (SELECT email FROM auth.users WHERE id = auth.uid()));

-- Only allow inserts through authenticated service or Edge Function
CREATE POLICY "Service role can insert elderly"
ON public.elderly
FOR INSERT
TO service_role
WITH CHECK (true);

-- Allow authenticated users to insert (for account creation flow)
CREATE POLICY "Authenticated can register elderly"
ON public.elderly
FOR INSERT
TO authenticated
WITH CHECK (true);

-- Admins can update elderly records
CREATE POLICY "Admins can update elderly"
ON public.elderly
FOR UPDATE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Admins can delete elderly records
CREATE POLICY "Admins can delete elderly"
ON public.elderly
FOR DELETE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));