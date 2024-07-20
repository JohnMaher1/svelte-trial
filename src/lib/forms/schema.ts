import { z } from 'zod';

export const formSchema = z.object({
	username: z.string().min(2).max(50),
	password: z.string().min(8).max(50),
	rememberMe: z.boolean(),
	email: z.string().email(),
	age: z.number().int().positive(),
	terms: z.boolean().refine((value) => value === true, {
		message: 'You must agree to the terms and conditions'
	})
});

export type FormSchema = typeof formSchema;
