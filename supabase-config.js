// Supabase configuration
// NEVER put a service_role/secret key in this file.

const SUPABASE_URL = "https://eczddyyupiyxsgqqghqs.supabase.co/rest/v1/";
const SUPABASE_ANON_KEY = "sb_publishable_J2mVmmen2oAdjXfRatGw5w_ZL0kWMbr";

const supabaseReady =
  SUPABASE_URL.startsWith("http") &&
  !SUPABASE_URL.includes("YOUR_");

const sb = supabaseReady
  ? window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
  : null;
