import { z } from 'zod';

export const roles = ['Soft Engine', 'Rust Dopeiner', 'C++ Chad'];

export const formSchema = z.object({
	username: z.string().min(2).max(50),
	password: z.string().min(8).max(50),
	rememberMe: z.boolean(),
	email: z.string().email(),
	age: z.number().int().positive(),
	terms: z.boolean().refine((value) => value === true, {
		message: 'You must agree to the terms and conditions'
	}),
	role: z.string().refine((value) => roles.includes(value), {
		message: `Role must be one of: ${roles.join(', ')}`
	})
});

export type FormSchema = typeof formSchema;
