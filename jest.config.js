const nextJest = require('next/jest');

const createJestConfig = nextJest({
  dir: './',
});
const customJestConfig = {
  moduleNameMapper: {
    '^@/components/(.*)$': '<rootDir>/components/$1',
    '^react-typist-component$': '<rootDir>/node_modules/react-typist-component/dist/index.js',
  },
  testEnvironment: 'jest-environment-jsdom',
};

module.exports = async () => {
  const jestConfig = await createJestConfig(customJestConfig)();
  // Modify the first transformIgnorePatterns to also allow ESM packages
  const esmPackages = 'react-intl|@formatjs|intl-messageformat|react-cookie-consent|react-icons|react-typist-component';
  jestConfig.transformIgnorePatterns = [
    `/node_modules/(?!.pnpm)(?!(${esmPackages}|geist|next/dist/client|next/dist/shared/lib|next/src/client|next/src/shared/lib)/)`,
    '^.+\\.module\\.(css|sass|scss)$',
  ];
  return jestConfig;
};
