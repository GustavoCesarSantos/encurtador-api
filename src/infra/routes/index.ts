import { Router } from 'express';

import { healthCheck } from './healthCheck';
import { shortenedUrl } from './shortenedUrl';

export const routes = (router: Router) => {
	shortenedUrl(router);
	healthCheck(router);
};
