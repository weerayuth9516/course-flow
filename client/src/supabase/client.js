import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://qlxsggpxpucbrqcywrkm.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFseHNnZ3B4cHVjYnJxY3l3cmttIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTM1NjU0NDUsImV4cCI6MjAwOTE0MTQ0NX0.gS7XuMR9SQl5nHByeGq0zCWw7IptdKY5hboStmynkzs";
export const supabase = createClient(supabaseUrl, supabaseKey);
