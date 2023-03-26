import { variables } from '@helpers/envs';
import { Redis } from '@upstash/redis';

export const redis = new Redis({
	url: variables.upstashUrl,
	token: variables.upstashToken,
});
