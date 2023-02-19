import { Router } from 'express';

import { shortenedUrl } from './shortenedUrl';
import { healthCheck } from './healthCheck';

export const routes = (router: Router) => {
	shortenedUrl(router);
	healthCheck(router);
};
