import { z } from 'zod';

export const SignInInput = z.object({
	email: z.string(),
	password: z.string(),
});

export type SignInInput = z.infer<typeof SignInInput>;
