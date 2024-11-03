import { Router } from 'express';

import { healthCheck } from './healthCheck';
import { shortenedUrl } from './shortenedUrl';
import { user } from './user';
import { authenticate } from './auth';
import { bugReport } from './bugReport';

export const routes = (router: Router) => {
	authenticate(router);
	healthCheck(router);
	bugReport(router);
	shortenedUrl(router);
	user(router);
};
