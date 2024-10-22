module.exports = {
	clearMocks: true,
	transform: {
		'^.+\\.ts?$': 'ts-jest',
	},
	testEnvironment: 'node',
	testRegex: './__tests__/.*\\.(test|spec)?\\.(ts|ts)$',
	moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
	roots: ['<rootDir>/__tests__'],
	moduleNameMapper: {
		'@/__tests__/(.*)': '<rootDir>/__tests__/$1',
		'@modules/(.*)': '<rootDir>/src/modules/$1',
		'@infra/(.*)': '<rootDir>/src/infra/$1',
		'@utils/(.*)': '<rootDir>/src/utils/$1',
		'@shared/(.*)': '<rootDir>/src/shared/$1',
	},
};
