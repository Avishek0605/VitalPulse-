// lib/supabase/client.ts
// Browser-side Supabase client — use in 'use client' components

import { createClient } from '@supabase/supabase-js';

const url  = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const key  = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// Singleton pattern — one client instance for the browser
export const supabase = createClient(url, key, {
  realtime: {
    params: { eventsPerSecond: 10 },
  },
});
