import { GenerateCode, IGenerateCode } from '@/shortUrls/useCases/generateCode';

let generateCode: IGenerateCode;

const makeSut = (): GenerateCode => {
	return new GenerateCode();
};

describe('Generate code', () => {
	beforeEach(() => {
		generateCode = makeSut();
	});

	test('Should generate a code with five characters long', () => {
		expect(generateCode.execute()).toHaveLength(5);
	});
});
