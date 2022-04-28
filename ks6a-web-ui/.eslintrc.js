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
};

module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  plugins: ['@typescript-eslint'],
  rules: defaultRules,
  parserOptions: {
    ecmaVersion: 2020,
    project: ['./tsconfig.json'],
    sourceType: 'module',
    tsconfigRootDir: __dirname,
  },
  overrides: [
    {
      parser: '@typescript-eslint/parser',
      plugins: ['@typescript-eslint'],
      files: ['./src/**/*.ts'],
      rules: {
        ...defaultRules,
        '@typescript-eslint/no-non-null-assertion': 'off',
        '@typescript-eslint/no-unnecessary-type-assertion': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
      },
    },
  ],
  ignorePatterns: ['.eslintrc.js', 'tailwind.config.js', 'karma.conf.js', 'src/test.ts'],
};
