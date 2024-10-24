import { Router } from 'express';

import { adaptRoute } from '@infra/adapters/expressRouteAdapter';
import { HandlerFactory } from '@modules/identity/utils/factory/handler/handlerFactory';

const controllerFactory = new HandlerFactory();

export const authenticate = (router: Router): void => {
	router.post(
		'/auth/refreshToken',
		adaptRoute(controllerFactory.makeRefreshToken()),
	);
	router.post('/auth/signin', adaptRoute(controllerFactory.makeSignIn()));
	router.post('/auth/signout', adaptRoute(controllerFactory.makeSignOut()));
};
