import { createClient } from '@supabase/supabase-js';
import env from '../config/env';

if (!env.supabaseUrl || !env.supabaseKey) {
  console.log(env.supabaseUrl, env.supabaseKey);
  throw new Error('Supabase environment variables are missing or invalid.');
}

console.log(env.supabaseUrl, env.supabaseKey);

export const supabase = createClient(env.supabaseUrl, env.supabaseKey);
