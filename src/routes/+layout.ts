import { PUBLIC_SUPABASE_ANON_KEY, PUBLIC_SUPABASE_URL } from '$env/static/public';
import {
	createBrowserClient,
	createServerClient,
	isBrowser,
	parseCookieHeader
} from '@supabase/ssr';
import { type Session, type SupabaseClient, type User } from '@supabase/supabase-js';
import type { LayoutLoad } from './$types';

export const ssr = false;

export type SessionProps = {
	supabase: SupabaseClient<any, 'public', any>;
	session: Session | null;
	user: User | null;
};

export interface SessionData {
	data: SessionProps;
}

export const load: LayoutLoad = async ({ fetch, data, depends }) => {
	depends('supabase:auth');

	const supabase = isBrowser()
		? createBrowserClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY, {
				global: {
					fetch
				}
			})
		: createServerClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY, {
				global: {
					fetch
				},
				cookies: {
					getAll: () => {
						return data.cookies;
					}
				}
			});

	const {
		data: { session }
	} = await supabase.auth.getSession();

	const {
		data: { user }
	} = await supabase.auth.getUser();

	return { session: session, supabase, user };
};
