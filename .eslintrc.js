module.exports = {
  parserOptions: {
    project: ['./tsconfig.json'],
    tsconfigRootDir: __dirname,
  },
  rules: {
    'max-len': [
      'error',
      {
        code: 180,
        tabWidth: 4,
      },
    ],
  },
  extends: ['next/core-web-vitals', 'airbnb-base', 'airbnb-typescript/base']
};
