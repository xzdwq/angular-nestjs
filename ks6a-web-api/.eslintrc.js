const defaultRules = {
  'no-console': process.env.NODE_ENV !== 'development' ? 'error' : 'off',
  'no-debugger': process.env.NODE_ENV !== 'development' ? 'error' : 'off',
  'no-undef': 'off',
  'no-unused-vars': 0,
  'comma-dangle': ['error', 'always-multiline'],
  'space-before-function-paren': ['error', 'always'],
  '@typescript-eslint/promise-function-async': 'off',
  '@typescript-eslint/strict-boolean-expressions': 'off',
  '@typescript-eslint/no-unused-vars': 1,
  '@typescript-eslint/interface-name-prefix': 'off',
  '@typescript-eslint/explicit-function-return-type': ['error'],
  '@typescript-eslint/explicit-module-boundary-types': ['error'],
  '@typescript-eslint/no-explicit-any': ['error'],
};

module.exports = {
  root: true,
  env: {
    node: true,
    jest: true,
  },
  plugins: ['@typescript-eslint/eslint-plugin'],
  rules: defaultRules,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2020,
    project: ['./tsconfig.json'],
    sourceType: 'module',
    tsconfigRootDir: __dirname,
  },
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  ignorePatterns: ['.eslintrc.js'],
};
