import { EventManagerDummy } from '../../../testDoubles/dummy/eventManager';
import {
	IReturnShortUrl,
	ReturnShortUrl,
} from '@modules/shortUrls/useCases/returnShortUrl';
import { variables } from '@helpers/envs';

let returnShortUrl: IReturnShortUrl;

const makeSut = () => {
	const eventManagerDummy = new EventManagerDummy();
	return new ReturnShortUrl(eventManagerDummy);
};

describe('Return short url', () => {
	beforeEach(() => {
		returnShortUrl = makeSut();
	});

	test('Should return a valid domain in url', () => {
		const code = '12345';
		const result = returnShortUrl.execute(code);
		expect(result.split(`/${code}`)[0]).toBe(variables.domainUrl);
	});

	test('Should return a valid code in url', () => {
		const code = '12345';
		const result = returnShortUrl.execute(code);
		expect(result.split('v1/')[1]).toBe(code);
	});
});
