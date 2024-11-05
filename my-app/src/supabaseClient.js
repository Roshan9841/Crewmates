import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://vxrhnbtmyuhzjczvrioe.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ4cmhuYnRteXVoempjenZyaW9lIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzA3NTIzMjYsImV4cCI6MjA0NjMyODMyNn0.QajNAx-d8wfg0hHZiGe5zNAkEiwi6scIl1z9sk8wROg';
export const supabase = createClient(supabaseUrl, supabaseKey);