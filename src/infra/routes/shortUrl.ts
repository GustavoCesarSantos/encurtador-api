import { Router } from 'express';

import { adaptRoute } from '@infra/adapters/expressRouteAdapter';
import { ShortUrlControllerFactory } from '@infra/factories/controllers/shortUrl';

const shortUrlControllerFactory = new ShortUrlControllerFactory();

export const shortUrl = (router: Router): void => {
	router.get(
		'/shortenedUrls/:code',
		adaptRoute(shortUrlControllerFactory.makeAccessRootUrl()),
	);
	router.post(
		'/shortenedUrls',
		adaptRoute(shortUrlControllerFactory.makeCreateShortUrl()),
	);
};
