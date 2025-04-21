/** @type {import('jest').Config} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  moduleFileExtensions: ['ts', 'tsx', 'js'],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  setupFilesAfterEnv: [
    'C:/Users/Arogya Mary/Downloads/sem4/agileproject/agile/project/AgileProject2/campus-connectt/jest.setup.js'
  ],
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.json',
    },
  }, // ✅ Use your own setup file
};
