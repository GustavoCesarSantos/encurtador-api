import { DeleteShortUrl } from '@modules/shortUrls/useCases/deleteShortUrl';
import { ShortUrlRepositoryDummy } from '../../../testDoubles/dummy/shortUrlRepository';

let deleteShortUrl: DeleteShortUrl;

const makeSut = () => {
	const shortUrlRepositoryDummy = new ShortUrlRepositoryDummy();
	return new DeleteShortUrl(shortUrlRepositoryDummy);
};

describe('Delete short url', () => {
	beforeEach(() => {
		deleteShortUrl = makeSut();
	});

	test('Should delete the short url', async () => {
		const uuid = '1';
		expect(deleteShortUrl.execute(uuid)).resolves.not.toThrow();
	});
});
