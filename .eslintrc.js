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
    'react/require-default-props': 'off',
  },
  extends: ['next/core-web-vitals', 'airbnb', 'airbnb-typescript'],
};
