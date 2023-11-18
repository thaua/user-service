/**
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

import type { Config } from 'jest';

const config: Config = {
  clearMocks: true,
  collectCoverage: true,
  collectCoverageFrom: [
    'src/**/*.{js,jsx,ts,tsx}',
    '!**/*.interface.ts',
    '!**/*.type.ts',
    '!src/index.ts',
    '!src/infrastructure/web/**/*.ts',
  ],
  coverageDirectory: './coverage',
  coveragePathIgnorePatterns: ['/node_modules/'],
  coverageProvider: 'v8',
  coverageThreshold: {
    global: {
      branches: 90,
      functions: 90,
      lines: 90,
      statements: 90,
    },
  },
  moduleNameMapper: {
    '@application/(.*)': ['<rootDir>/src/core/application/$1'],
    '@domain/(.*)': ['<rootDir>/src/core/domain/$1'],
    '@infrastructure/(.*)': ['<rootDir>/src/infrastructure/$1'],
    '@presentation/(.*)': ['<rootDir>/src/presentation/$1'],
  },
  preset: 'ts-jest',
  rootDir: '.',
};

export default config;
