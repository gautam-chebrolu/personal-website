module.exports = {
  testEnvironment: 'jsdom',
  roots: ['<rootDir>/tests'],
  testMatch: ['**/*.test.js'],
  setupFiles: ['<rootDir>/tests/setup.js'],
  collectCoverageFrom: [
    'router.js',
    'projects.js',
    'visuals.js',
    'utils.js'
  ],
  coverageDirectory: 'coverage',
  coverageReporters: ['text', 'text-summary']
};
