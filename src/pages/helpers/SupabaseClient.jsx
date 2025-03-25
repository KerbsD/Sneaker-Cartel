import { createClient } from '@supabase/supabase-js';

const supabaseUrl = "https://begpetjiutjcxrwmwdof.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJlZ3BldGppdXRqY3hyd213ZG9mIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI2NDAwMTcsImV4cCI6MjA1ODIxNjAxN30._ZzohpSg4SgjQmD98ZKVkPkOP5UJXBHCfUOJTNbAhvc";

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default supabase;