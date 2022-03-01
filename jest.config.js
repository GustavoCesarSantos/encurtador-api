// /** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
// export = {
// 	preset: 'ts-jest',
// 	testEnvironment: 'node',
// 	moduleNameMapper: {
// 		'@/(.*)': '<rootDir>/src/modules/$1',
// 	},
// };

module.exports = {
	transform: {
		'^.+\\.ts?$': 'ts-jest',
	},
	testEnvironment: 'node',
	testRegex: './__tests__/.*\\.(test|spec)?\\.(ts|ts)$',
	moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
	roots: ['<rootDir>/__tests__'],
	moduleNameMapper: {
		'@/__tests__/(.*)': '<rootDir>/__tests__/$1',
		'@/(.*)': '<rootDir>/src/modules/$1',
	},
};
