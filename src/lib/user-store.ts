import type { UserResponse } from '@supabase/supabase-js';
import { writable } from 'svelte/store';

const localStorageUser = localStorage.getItem('user');
export const user = writable<UserResponse | null>(
	localStorageUser ? JSON.parse(localStorageUser) : null
);
