import { EventManagerDummy } from '../../../testDoubles/dummy/eventManager';
import {
	IReturnShortenedUrl,
	ReturnShortenedUrl,
} from '@modules/shortenedUrls/useCases/returnShortenedUrl';
import { variables } from '@helpers/envs';

let returnShortenedUrl: IReturnShortenedUrl;

const makeSut = () => {
	const eventManagerDummy = new EventManagerDummy();
	return new ReturnShortenedUrl(eventManagerDummy);
};

describe('Return short url', () => {
	beforeEach(() => {
		returnShortenedUrl = makeSut();
	});

	test('Should return a valid domain in url', () => {
		const code = '12345';
		const result = returnShortenedUrl.execute(code);
		expect(result.split(`/${code}`)[0]).toBe(variables.domainUrl);
	});

	test('Should return a valid code in url', () => {
		const code = '12345';
		const result = returnShortenedUrl.execute(code);
		expect(result.split('v1/')[1]).toBe(code);
	});
});
