import { Router } from 'express';

import { adaptRoute } from '@infra/adapters/expressRouteAdapter';
import { ShortUrlControllerFactory } from '@infra/factories/controllers/shortUrl';
import { rateLimit } from '@infra/factories/middlewares/rateLimit';

const shortUrlControllerFactory = new ShortUrlControllerFactory();

export const shortUrl = (router: Router): void => {
	router.get(
		'/shortenedUrls/:code',
		rateLimit,
		adaptRoute(shortUrlControllerFactory.makeAccessRootUrl()),
	);
	router.post(
		'/shortenedUrls',
		rateLimit,
		adaptRoute(shortUrlControllerFactory.makeCreateShortUrl()),
	);
};
