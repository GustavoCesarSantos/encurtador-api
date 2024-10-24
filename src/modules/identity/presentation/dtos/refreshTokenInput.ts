import { z } from 'zod';

export const RefreshTokenInput = z.object({
	refreshToken: z.string(),
});
