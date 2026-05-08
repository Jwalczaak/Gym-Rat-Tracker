import { createClient } from '@supabase/supabase-js';
import env from '../config/env';
import type { Database } from '@/types/database.types';

if (!env.supabaseUrl || !env.supabaseKey) {
  console.log(env.supabaseUrl, env.supabaseKey);
  throw new Error('Supabase environment variables are missing or invalid.');
}

console.log(env.supabaseUrl, env.supabaseKey);

export const supabase = createClient<Database>(
  env.supabaseUrl,
  env.supabaseKey,
);
