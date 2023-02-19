import { Router } from 'express';

import { adaptRoute } from '@infra/adapters/expressRouteAdapter';
import { ShortenedUrlControllerFactory } from '@infra/factories/controllers/shortenedUrl';
import { rateLimit } from '@infra/factories/middlewares/rateLimit';

const shortUrlControllerFactory = new ShortenedUrlControllerFactory();

export const shortenedUrl = (router: Router): void => {
	router.get(
		'/shortenedUrls/:code',
		rateLimit,
		adaptRoute(shortUrlControllerFactory.makeAccessRootUrl()),
	);
	router.post(
		'/shortenedUrls',
		rateLimit,
		adaptRoute(shortUrlControllerFactory.makeCreateShortenedUrl()),
	);
};
