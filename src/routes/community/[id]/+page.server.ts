import type { PageServerLoad } from '../$types';

export const load: PageServerLoad = async ({ depends, params, locals: { supabase } }) => {
	const paramsObject = params as { id: string };
	const id = paramsObject.id;
	depends(`supabase:db:notes:${id}`);
	const { data: profile } = await supabase
		.from('profiles')
		.select('user_id, description, pokemon_ids, username')
		.filter('user_id', 'eq', id)
		.single();
	const typedProfile = profile as {
		user_id: string;
		description: string;
		pokemon_ids: number[];
		username: string;
	};
	return { profile: typedProfile };
};
