module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  transform: {
    '^.+\\.vue$': 'vue3-jest',
    "\\.diff$": "jest-raw-loader"
  },
  moduleFileExtensions: ['json', 'js', 'jsx', 'ts', 'tsx', 'vue']
};
