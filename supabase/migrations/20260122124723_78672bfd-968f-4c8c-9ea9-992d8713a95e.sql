-- Drop the overly permissive policy on registration_rate_limit
DROP POLICY IF EXISTS "Service role only" ON public.registration_rate_limit;

-- Create a policy that denies ALL access to regular users
-- The service role bypasses RLS entirely, so it will still work for the Edge Function
CREATE POLICY "Deny all access to users" 
ON public.registration_rate_limit 
FOR ALL 
USING (false)
WITH CHECK (false);