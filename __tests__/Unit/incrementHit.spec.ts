import { IIncrementHit, IncrementHit } from '@/shortUrls/useCases/incrementHit';

let incrementHit: IIncrementHit;

const makeSut = () => {
	return new IncrementHit();
};

describe('Increment hit', () => {
	beforeEach(() => {
		incrementHit = makeSut();
	});

	test('Should increment hit property', async () => {
		const hit = 2;
		const result = incrementHit.execute(hit);
		expect(result).toEqual(3);
	});
});
