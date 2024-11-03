import { Router } from 'express';

import { adaptRoute } from '@infra/adapters/expressRouteAdapter';
import { HandlerFactory } from '@modules/monitor/utils/factory/handler/handlerFactory';

const controllerFactory = new HandlerFactory();

export const bugReport = (router: Router): void => {
	router.post('/bugReports', adaptRoute(controllerFactory.makeReportBug()));
};
