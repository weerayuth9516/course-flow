import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://qlxsggpxpucbrqcywrkm.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFseHNnZ3B4cHVjYnJxY3l3cmttIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY5MzU2NTQ0NSwiZXhwIjoyMDA5MTQxNDQ1fQ.CF05LZryrmToFj-4CNcO6mYKJNpWr9zgkhdjqUNZAuQ";
export const supabase = createClient(supabaseUrl, supabaseKey);
