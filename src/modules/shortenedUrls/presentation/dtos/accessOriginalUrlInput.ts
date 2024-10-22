import { z } from 'zod';

export const AccessOriginalUrlInput = z.object({
	code: z.string().max(5),
});
