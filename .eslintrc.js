module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'airbnb-base',
    'airbnb-typescript/base',
  ],
  settings: {
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true,
        project: './tsconfig.json',
      }
    },
  },
  plugins: [
    '@typescript-eslint',
  ],
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
    'arrow-body-style': 'off',

    'class-methods-use-this': 'off',

    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': ['error', { 'args': 'none' }],

    // except empty line after atrribute scope variable declarations
    '@typescript-eslint/lines-between-class-members': [
      'error',
      'always',
      { exceptAfterSingleLine: true },
    ],
  },
};
