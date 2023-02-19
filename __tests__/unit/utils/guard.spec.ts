import { Guard } from '@utils/guard';

const propName = 'Teste';

describe('Shortened url', () => {
	test('Should return an error when an empty value is passed', () => {
		const value = '';
		const result = Guard.againstEmptyOrUndefined([{ propName, value }]);
		expect(result.isSuccess).toBe(false);
		expect(result.isError).toEqual([propName]);
	});

	test('Should return an error when an undefined value is passed', () => {
		const value = undefined;
		const result = Guard.againstEmptyOrUndefined([{ propName, value }]);
		expect(result.isSuccess).toBe(false);
		expect(result.isError).toEqual([propName]);
	});

	test('Should return an error when a null value is passed', () => {
		const value = null;
		const result = Guard.againstEmptyOrUndefined([{ propName, value }]);
		expect(result.isSuccess).toBe(false);
		expect(result.isError).toEqual([propName]);
	});

	test('Should return success when all values passed is valid', () => {
		const value = 'isValid';
		const result = Guard.againstEmptyOrUndefined([{ propName, value }]);
		expect(result.isSuccess).toBe(true);
		expect(result.isError).toEqual([]);
	});
});
