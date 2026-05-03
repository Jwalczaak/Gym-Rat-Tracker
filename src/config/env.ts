interface Env {
  supabaseUrl: string;
  supabaseKey: string;
}

const env: Env = {
  supabaseUrl: import.meta.env.VITE_SUPABASE_URL,
  supabaseKey: import.meta.env.VITE_SUPABASE_ANON_KEY,
};

export default env;
