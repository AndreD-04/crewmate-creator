import { createClient } from '@supabase/supabase-js'

const URL = 'https://pexatqmudtotsidwxvad.supabase.co'
const KEY = 'sb_publishable_VUfuRbN5ZGbfRIdGX7sx-Q_PX6t0qax'

export const supabase = createClient(URL, KEY)