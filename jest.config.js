"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    clearMocks: true,
    collectCoverage: true,
    collectCoverageFrom: ['src/**/*.ts', '!src/**/index.ts'],
    coverageDirectory: "coverage",
    coverageProvider: "v8",
    preset: 'ts-jest',
    testMatch: ["**/__tests__/**/*.ts"],
    transformIgnorePatterns: ['node_modules'],
    watchPathIgnorePatterns: ['node_modules'],
};
