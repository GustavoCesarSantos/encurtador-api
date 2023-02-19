import { FindShortenedUrls } from '@modules/shortenedUrls/useCases/findShortenedUrls';
import { ShortenedUrlRepositoryStub } from '../../../testDoubles/stub/shortUrlRepository';

let findShortenedUrls: FindShortenedUrls;

const makeSut = () => {
	const shortUrlRepositoryStub = new ShortenedUrlRepositoryStub();
	return new FindShortenedUrls(shortUrlRepositoryStub);
};

describe('Find short urls', () => {
	beforeEach(() => {
		findShortenedUrls = makeSut();
	});

	test('Should return an array', async () => {
		const ownerId = 1;
		const result = await findShortenedUrls.execute(ownerId);
		expect(Array.isArray(result)).toBe(true);
	});
});
