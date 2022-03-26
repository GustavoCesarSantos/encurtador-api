import { Router } from 'express';

import { expressRouteAdapter } from '@infra/adapters/expressRouteAdapter';
import { ShortUrlControllerFactory } from '@infra/factories/controllers/shortUrl';

const shortUrlControllerFactory = new ShortUrlControllerFactory();

export const shortUrl = (router: Router): void => {
	router.get(
		'/:code',
		expressRouteAdapter(shortUrlControllerFactory.makeAccessRootUrl()),
	);
	router.post(
		'/',
		expressRouteAdapter(shortUrlControllerFactory.makeCreateShortUrl()),
	);
};
