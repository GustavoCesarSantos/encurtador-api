import { Router } from 'express';

import { shortUrl } from './shortUrl';
import { healthCheck } from './healthCheck';

export const routes = (router: Router) => {
	shortUrl(router);
	healthCheck(router);
};
