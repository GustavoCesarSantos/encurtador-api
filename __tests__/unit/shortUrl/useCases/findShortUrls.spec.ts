import { FindShortUrls } from '@modules/shortUrls/useCases/findShortUrls';
import { ShortUrlRepositoryStub } from '../../../testDoubles/stub/shortUrlRepository';

let findShortUrls: FindShortUrls;

const makeSut = () => {
	const shortUrlRepositoryStub = new ShortUrlRepositoryStub();
	return new FindShortUrls(shortUrlRepositoryStub);
};

describe('Find short urls', () => {
	beforeEach(() => {
		findShortUrls = makeSut();
	});

	test('Should return an array', async () => {
		const ownerId = 1;
		const result = await findShortUrls.execute(ownerId);
		expect(Array.isArray(result)).toBe(true);
	});
});
