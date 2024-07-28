import { redirect } from '@sveltejs/kit';

import type { Actions } from './$types';

export const actions: Actions = {
	login: async ({ locals: { supabase }, url }) => {
		const baseUrl = `${url.protocol}//${url.host}`;
		const { error, data } = await supabase.auth.signInWithOAuth({
			provider: 'discord',
			options: {
				redirectTo: `${baseUrl}/auth/callback`
			}
		});
		if (data.url) {
			redirect(303, data.url);
		}
		if (error) {
			redirect(303, '/auth/error');
		}
	}
};
