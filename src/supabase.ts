import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://ukyxzsossrwgnfddbqqe.supabase.co";
const supabaseKey =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVreXh6c29zc3J3Z25mZGRicXFlIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzAwOTcwOTEsImV4cCI6MTk4NTY3MzA5MX0.qbzcRVUvWH5wvYOTRIQsbHrw4i3SPTy2dBFtyXQ6e3c";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
