// src/supabaseClient.ts
import { createClient } from '@supabase/supabase-js';

// Substitua esses valores com as suas credenciais do Supabase
const supabaseUrl = 'https://qaopsepekpiliysrdcem.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFhb3BzZXBla3BpbGl5c3JkY2VtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzA5ODQ2NDIsImV4cCI6MjA0NjU2MDY0Mn0.lfg0TlvGCldBtrf8jj8dstskUlE0q836Dp6YJ-0odDE';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
