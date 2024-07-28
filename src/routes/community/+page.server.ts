import type { PageServerLoad } from '../about/$types';

export const load: PageServerLoad = async ({ depends, locals: { supabase } }) => {
	depends('supabase:db:notes');
	const { data: profiles } = await supabase
		.from('profiles')
		.select('user_id, description, pokemon_ids, username');
	return { profiles: profiles ?? [] };
};
