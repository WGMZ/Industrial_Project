/** @type {import('eslint').Linter.Config} */
module.exports = {
  extends: './node_modules/mwts/',
  plugins: ['typeorm-typescript'],
  ignorePatterns: ['node_modules', 'dist', 'test', 'jest.config.js', 'typings'],
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  env: {
    node: true,
    jest: true,
  },
  rules: {
    'no-control-regex': 'off',

    '@typescript-eslint/no-var-requires': 'off',
    '@typescript-eslint/no-unused-vars': 'warn',
    '@typescript-eslint/no-explicit-any': 'warn',

    'typeorm-typescript/enforce-column-types': 'error',
    'typeorm-typescript/enforce-relation-types': 'error',
    'typeorm-typescript/enforce-consistent-nullability': 'error',
  },
};
