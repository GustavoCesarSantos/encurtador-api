import { ShortenedUrl } from '@modules/shortenedUrls/shortenedUrl';
import { ShortenedUrlMapper } from '@utils/mappers/shortenedUrlMapper';

describe('Shortened Url Mapper', () => {
	describe('toDomain', () => {
		afterEach(() => {
			jest.restoreAllMocks();
		});

		test('Should return null when an error occurs in shortened url creation', () => {
			jest.spyOn(ShortenedUrl, 'create').mockImplementation(() => {
				return new Error();
			});
			const mapper = new ShortenedUrlMapper();
			const result = mapper.toDomain({});
			expect(result).toBeNull();
		});

		test('Should return a valid shortened url when an error not occurs in creation', () => {
			const mapper = new ShortenedUrlMapper();
			const result = mapper.toDomain({ url: 'test', code: 'test' });
			expect(result).toBeInstanceOf(ShortenedUrl);
		});
	});

	describe('toPersistence', () => {
		test('Should return a valid shortened url to persist in db', () => {
			jest.spyOn(ShortenedUrl.prototype, 'getUUID').mockImplementation(
				() => {
					return 'teste';
				},
			);
			jest.spyOn(ShortenedUrl.prototype, 'getRootUrl').mockImplementation(
				() => {
					return 'teste';
				},
			);
			jest.spyOn(ShortenedUrl.prototype, 'getCode').mockImplementation(
				() => {
					return 'teste';
				},
			);
			jest.spyOn(ShortenedUrl.prototype, 'getHits').mockImplementation(
				() => {
					return 0;
				},
			);
			jest.spyOn(
				ShortenedUrl.prototype,
				'getCreatedDate',
			).mockImplementation(() => {
				return new Date('December 17, 1995 03:24:00');
			});
			jest.spyOn(ShortenedUrl.prototype, 'getOwnerId').mockImplementation(
				() => {
					return 0;
				},
			);
			const shortenedUrl = ShortenedUrl.create({
				url: 'test',
				code: 'test',
			}) as ShortenedUrl;
			const mapper = new ShortenedUrlMapper();
			const result = mapper.toPersistence(shortenedUrl);
			expect(result.toString()).toBe(
				`${{
					code: 'teste',
					createdat: '1995-12-17T05:24:00.000Z',
					hits: 0,
					ownerid: 0,
					url: 'teste',
					uuid: 'teste',
				}}`,
			);
		});
	});
});
