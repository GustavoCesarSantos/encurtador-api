import {
	GenerateCode,
	IGenerateCode,
} from '@modules/shortenedUrls/useCases/generateCode';
import { EventManagerDummy } from '../../../testDoubles/dummy/eventManager';

let generateCode: IGenerateCode;

const makeSut = (): GenerateCode => {
	const eventManagerDummy = new EventManagerDummy();
	return new GenerateCode(eventManagerDummy);
};

describe('Generate code', () => {
	beforeEach(() => {
		generateCode = makeSut();
	});

	test('Should generate a code with five characters long', () => {
		expect(generateCode.execute()).toHaveLength(5);
	});
});
