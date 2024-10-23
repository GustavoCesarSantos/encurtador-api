import { z } from 'zod';

export const SignInOutput = z.object({
	accessToken: z.string(),
});
