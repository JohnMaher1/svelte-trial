import { PUBLIC_SUPABASE_ANON_KEY, PUBLIC_SUPABASE_URL } from "$env/static/public";
import { supabase } from "$lib/supabaseClient";
import type { LayoutLoad } from "./$types";
import { createBrowserClient, isBrowser, parseCookieHeader} from '@supabase/ssr'

export const ssr = false;

export const load = async () => {
    const {data} = await supabase.from("countries").select();
    return {
        countries: data ?? []
    }
}

// https://smapkpkgajfynseisctt.supabase.co/auth/v1/callback