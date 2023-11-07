module.exports = {
  extends: [
    'next/core-web-vitals',
    'airbnb',
  ],
  rules: {
    'max-len': [
      'error',
      {
        code: 180,
        tabWidth: 4,
      },
    ],
    'react/require-default-props': 'off',
    'react/jsx-filename-extension': 'off',
    'react/prop-types': 'off',
    'import/no-unresolved': 'off',
    'import/extensions': 'off',
  },
};
