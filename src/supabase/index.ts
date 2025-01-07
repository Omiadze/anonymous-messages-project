import { createClient } from '@supabase/supabase-js';
import { Database } from './supabase.types';

export const supabase = createClient<Database>(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

// supabase.from("")

// npx supabase gen types typescript --project-id mlmjihguhyezmjhiijgz --schema public > src/supabase/supabase.types.ts
