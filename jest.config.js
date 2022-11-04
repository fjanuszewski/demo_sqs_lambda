module.exports = {
  modulePaths: ['layers/utils'],
  injectGlobals: true,
  verbose: true,
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: -10,
    },
  },
  collectCoverage: true,
  coverageReporters: ['text'],
  collectCoverageFrom: ['./src/functions/**/*.{js,jsx}'],
  setupFiles: ['./tests/setEnvVars.js'],
};
