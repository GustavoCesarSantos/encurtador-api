import {
	IIncrementHit,
	IncrementHit,
} from '@modules/shortUrls/useCases/incrementHit';
import { EventManagerDummy } from '../../../testDoubles/dummy/eventManager';

let incrementHit: IIncrementHit;

const makeSut = () => {
	const eventManagerDummy = new EventManagerDummy();
	return new IncrementHit(eventManagerDummy);
};

describe('Increment hit', () => {
	beforeEach(() => {
		incrementHit = makeSut();
	});

	test('Should increment hit property', async () => {
		const hit = 2;
		const result = incrementHit.execute(hit);
		expect(result).toBe(3);
	});
});
