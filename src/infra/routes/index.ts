import { Router } from 'express';

import { shortUrl } from './shortUrl';

export const routes = (router: Router) => {
	shortUrl(router);
};
