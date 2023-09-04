import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://meqgpeqynxwckwtvwgwr.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1lcWdwZXF5bnh3Y2t3dHZ3Z3dyIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY5MzQ1Mzk4MiwiZXhwIjoyMDA5MDI5OTgyfQ.h4jqi6X7oSRI0cQmvyRR4Ih4GWWiCJdCUjRzkB504_I";
export const supabase = createClient(supabaseUrl, supabaseKey);
