-- Add user_id column to elderly table for proper foreign key relationship
ALTER TABLE public.elderly 
ADD COLUMN user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL;

-- Create index for faster lookups
CREATE INDEX idx_elderly_user_id ON public.elderly(user_id);

-- Drop the fragile email-based policy
DROP POLICY IF EXISTS "Users can read own elderly record" ON public.elderly;

-- Create a robust user_id-based policy
CREATE POLICY "Users can read own elderly record" 
ON public.elderly 
FOR SELECT 
USING (auth.uid() = user_id);