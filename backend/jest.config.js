/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  clearMocks: true,
  roots: ['<rootDir>', '<rootDir>/../test'],
  moduleDirectories: ['node_modules', '<rootDir>/node_modules'],
  modulePathIgnorePatterns: ['<rootDir>/dist/'],
  setupFilesAfterEnv: ['<rootDir>/src/lib/__mocks__/prisma.ts'],
};
