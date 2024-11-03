import { createClient } from 'redis';

import { variables } from '@shared/envs';

export const redis = createClient({
	url: variables.cacheUrl,
});
