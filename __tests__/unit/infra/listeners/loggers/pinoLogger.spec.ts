import { EventNames } from '@helpers/eventNames';
import { PinoLogger } from '@infra/listeners/loggers/pinoLogger';

describe('Pino Logger', () => {
	test('Should call error log method when invalid type is passed in info event payload', () => {
		const logger = PinoLogger.create();
		const spy = jest.spyOn(logger, 'error');
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		/**@ts-ignore */
		logger.update(EventNames.info, 1);
		expect(spy).toHaveBeenCalled();
	});

	test('Should call error log method when invalid type is passed in error event payload', () => {
		const logger = PinoLogger.create();
		const spy = jest.spyOn(logger, 'error');
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		/**@ts-ignore */
		logger.update(EventNames.error, 1);
		expect(spy).toHaveBeenCalled();
	});

	test('Should call error log method when invalid an event name is passed', () => {
		const logger = PinoLogger.create();
		const spy = jest.spyOn(logger, 'error');
		logger.update('fail', 'fail');
		expect(spy).toHaveBeenCalled();
	});

	test('Should call info log method when event type is info and payload type is a string', () => {
		const logger = PinoLogger.create();
		const spy = jest.spyOn(logger, 'info');
		logger.update(EventNames.info, 'success');
		expect(spy).toHaveBeenCalled();
	});

	test('Should call error log method when event type is error and payload type is a string', () => {
		const logger = PinoLogger.create();
		const spy = jest.spyOn(logger, 'error');
		logger.update(EventNames.error, 'some error');
		expect(spy).toHaveBeenCalled();
	});

	test('Should call error log method when event type is error and payload is a instance of error', () => {
		const logger = PinoLogger.create();
		const spy = jest.spyOn(logger, 'error');
		logger.update(EventNames.error, new Error('some error'));
		expect(spy).toHaveBeenCalled();
	});
});
