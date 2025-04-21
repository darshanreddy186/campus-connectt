/** @type {import('jest').Config} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  moduleFileExtensions: ['ts', 'tsx', 'js'],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  setupFilesAfterEnv: [
    '/home/runner/work/campus-connectt/campus-connectt/jest.setup.js'
  ],
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.json',
    },
  }, // ✅ Use your own setup file
};
