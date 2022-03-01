/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
export = {
	preset: 'ts-jest',
	testEnvironment: 'node',
	moduleNameMapper: {
		'@/(.*)': '<rootDir>/src/modules/$1',
	},
};
