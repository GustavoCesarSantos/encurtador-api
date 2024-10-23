import { Router } from 'express';

import { adaptRoute } from '@infra/adapters/expressRouteAdapter';
import { rateLimit } from '@infra/factories/middlewares/rateLimit';
import { HandlerFactory } from '@modules/shortenedUrls/utils/factory/handler/handlerFactory';
import { auth } from '@infra/factories/middlewares/auth';

const controllerFactory = new HandlerFactory();

export const shortenedUrl = (router: Router): void => {
	router.get(
		'/shortenedUrls/:code',
		// rateLimit,
		adaptRoute(controllerFactory.makeAccessOriginalUrl()),
	);
	router.post(
		'/shortenedUrls',
		// rateLimit,
		auth,
		adaptRoute(controllerFactory.makeShortenUrl()),
	);
};
