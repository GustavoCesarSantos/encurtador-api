import { DeleteShortenedUrl } from '@modules/shortenedUrls/useCases/deleteShortenedUrl';
import { ShortenedUrlRepositoryDummy } from '../../../testDoubles/dummy/shortenedUrlRepository';

let deleteShortenedUrl: DeleteShortenedUrl;

const makeSut = () => {
	const shortUrlRepositoryDummy = new ShortenedUrlRepositoryDummy();
	return new DeleteShortenedUrl(shortUrlRepositoryDummy);
};

describe('Delete short url', () => {
	beforeEach(() => {
		deleteShortenedUrl = makeSut();
	});

	test('Should delete the short url', async () => {
		const uuid = '1';
		expect(deleteShortenedUrl.execute(uuid)).resolves.not.toThrow();
	});
});
