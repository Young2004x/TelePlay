// Supabase configuration
// NEVER put a service_role/secret key in this file.

const SUPABASE_URL = "https://eczddyyupiyxsgqqghqs.supabase.co";
const SUPABASE_ANON_KEY = "YOUR_PUBLISHABLE_KEY";

const supabaseReady =
  SUPABASE_URL.startsWith("http") &&
  !SUPABASE_URL.includes("YOUR_");

const sb = supabaseReady
  ? window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
  : null;
