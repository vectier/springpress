module.exports = {
  root: true,
  plugins: [
    '@typescript-eslint',
  ],
  extends: [
    'airbnb-base',
    'airbnb-typescript/base',
  ],
  env: {
    node: true,
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
  },
  rules: {
    // allow console logging for nodejs
    'no-console': 'off',

    'import/prefer-default-export': 'off',

    'padded-blocks': [
      'error',
      { classes: 'always' },
    ],

    // except empty line after atrribute scope variable declarations
    '@typescript-eslint/lines-between-class-members': [
      'error',
      'always',
      { exceptAfterSingleLine: true },
    ],
  },
};
