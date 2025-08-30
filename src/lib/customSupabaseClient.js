import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://sdfkxxrfvehkzgfwgqeo.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNkZmt4eHJmdmVoa3pnZndncWVvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTY1ODA2MjksImV4cCI6MjA3MjE1NjYyOX0.TTofX8K7K56dfMYUtfKsbHosn_FG9DWO-xb9Zd6VjLc';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);