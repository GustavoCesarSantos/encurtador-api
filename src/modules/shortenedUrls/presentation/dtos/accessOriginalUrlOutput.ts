import { z } from 'zod';

export const AccessOriginalUrlOutput = z.object({
	originalUrl: z.string(),
});
