import { Router } from 'express';

import { adaptRoute } from '@infra/adapters/expressRouteAdapter';
import { rateLimit } from '@infra/factories/middlewares/rateLimit';
import { HandlerFactory } from '@modules/shortenedUrls/utils/factory/handler/handlerFactory';

const shortUrlControllerFactory = new HandlerFactory();

export const shortenedUrl = (router: Router): void => {
	router.get(
		'/shortenedUrls/:code',
		rateLimit,
		adaptRoute(shortUrlControllerFactory.makeAccessOriginalUrl()),
	);
	router.post(
		'/shortenedUrls',
		rateLimit,
		adaptRoute(shortUrlControllerFactory.makeShortenUrl()),
	);
};
