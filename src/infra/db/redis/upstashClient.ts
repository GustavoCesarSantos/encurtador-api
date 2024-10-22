import { Redis } from '@upstash/redis';

import { variables } from '@shared/envs';

export const redis = new Redis({
	url: variables.upstashUrl,
	token: variables.upstashToken,
});
