import { z } from 'zod';

export const ShortenUrlOutput = z.object({
	code: z.string().max(5),
});
