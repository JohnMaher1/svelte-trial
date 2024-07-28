// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces

import { SupabaseClient, type Session, type User } from '@supabase/supabase-js';
import type { U } from 'vitest/dist/reporters-yx5ZTtEV.js';
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			supabase: SupabaseClient;
			safeGetSession: () => Promise<{ session: Session | null; user: User | null }>;
			session: Session | null;
			user: User | null;
		}
		interface PageData {
			session: Session | null;
		}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
