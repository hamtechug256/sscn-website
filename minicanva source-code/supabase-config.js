
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

const supabaseUrl = 'https://ovfcizhlunntbkujuhuz.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im92ZmNpemhsdW5udGJrdWp1aHV6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTMwMDQ0OTUsImV4cCI6MjA2ODU4MDQ5NX0.VW2lh478cuwbbdkr8pRp7c5ru3TRPKKzGbxS4L-l7jg';

export const supabase = createClient(supabaseUrl, supabaseKey);
