import { EventNames } from '@helpers/eventNames';
import { PinoLogger } from '@infra/listeners/loggers/pinoLogger';

describe('Pino Logger', () => {
	test('Should call error log method when invalid an event name is passed', () => {
		const logger = PinoLogger.create();
		const spy = jest.spyOn(logger, 'error');
		logger.update({
			eventName: 'fail',
			message: { where: 'fail', what: 'fail' },
		});
		expect(spy).toHaveBeenCalled();
	});

	test('Should call info log method when event type is info', () => {
		const logger = PinoLogger.create();
		const spy = jest.spyOn(logger, 'info');
		logger.update({
			eventName: EventNames.info,
			message: { where: 'success', what: 'success' },
		});
		expect(spy).toHaveBeenCalled();
	});

	test('Should call warn log method when event type is warn', () => {
		const logger = PinoLogger.create();
		const spy = jest.spyOn(logger, 'warn');
		logger.update({
			eventName: EventNames.warn,
			message: { where: 'success', what: 'success' },
		});
		expect(spy).toHaveBeenCalled();
	});

	test('Should call error log method when event type is error', () => {
		const logger = PinoLogger.create();
		const spy = jest.spyOn(logger, 'error');
		logger.update({
			eventName: EventNames.error,
			message: { where: 'success', what: 'success' },
		});
		expect(spy).toHaveBeenCalled();
	});
});
