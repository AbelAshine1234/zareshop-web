import { createClient } from '@supabase/supabase-js';


// Initialize Supabase client
// Using direct values from project configuration
const supabaseUrl = 'https://bpvqefrgwgbbqurogava.supabase.co';
const supabaseKey = 'sb_publishable_1kRsVnbOgd3hqFpYUqlm_g_AI_jVFwQ';
const supabase = createClient(supabaseUrl, supabaseKey);


export { supabase };