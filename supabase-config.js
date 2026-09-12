// Create a Supabase project, then paste its Project URL and anon/publishable key here.
// NEVER put a service_role key in this file.
const SUPABASE_URL = "YOUR_SUPABASE_URL";
const SUPABASE_ANON_KEY = "YOUR_SUPABASE_ANON_KEY";
const supabaseReady = SUPABASE_URL.startsWith("http") && !SUPABASE_URL.includes("YOUR_");
const sb = supabaseReady ? window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY) : null;
