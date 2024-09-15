module.exports = {
  preset: 'ts-jest', // for TypeScript support
  testEnvironment: 'jest-environment-jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'], // points to your Jest setup file
  moduleNameMapper: {
    '^@/components/(.*)$': '<rootDir>/src/_components/$1',
    '^@/pages/(.*)$': '<rootDir>/src/app/$1',
    '\\.(css|scss)$': 'identity-obj-proxy', // mock CSS imports
  },
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest', // use ts-jest for transforming TypeScript files
  },
  transformIgnorePatterns: ['/node_modules/'],
}
