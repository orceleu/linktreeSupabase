import { createClient } from "@supabase/supabase-js";

import { Database } from "../database.type";
import { QueryResult, QueryData, QueryError } from "@supabase/supabase-js";

const supabase = createClient<Database>(
  "https://otuqsjkpvrkthepuffcs.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im90dXFzamtwdnJrdGhlcHVmZmNzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTE0NjU0NTcsImV4cCI6MjAyNzA0MTQ1N30.ebAshwk3B9i7Vlh99ZiWBa-qIa0q6CzirgCA6NldONg"
);

export { supabase };
