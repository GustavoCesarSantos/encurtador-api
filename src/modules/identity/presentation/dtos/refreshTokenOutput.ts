import { z } from 'zod';

export const RefreshTokenOutput = z.object({
	accessToken: z.string(),
});
