import { z } from 'zod';

export const RegisterUserInput = z.object({
	name: z.string(),
	email: z.string(),
	password: z.string(),
});

export type RegisterUserInput = z.infer<typeof RegisterUserInput>;
