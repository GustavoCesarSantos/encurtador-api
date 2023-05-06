import { createClient } from 'redis';

import { variables } from '@helpers/envs';

export const redis = createClient({
	url: variables.cacheUrl,
});
