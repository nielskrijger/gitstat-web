module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: [
    '@typescript-eslint',
    'react-hooks'
  ],
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  env: {
    browser: true
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
    project: './tsconfig.json'
  },
  rules: {
    'import/prefer-default-export': 0,
    'react/prop-types': 0,
    'react/jsx-one-expression-per-line': 0,
    'react/jsx-props-no-spreading': 0,
    '@typescript-eslint/indent': ['error', 2],
    '@typescript-eslint/no-unnecessary-type-assertion': 1,
    '@typescript-eslint/no-unnecessary-qualifier': 1,
    '@typescript-eslint/no-for-in-array': 1,
    '@typescript-eslint/no-non-null-assertion': 0,
    '@typescript-eslint/explicit-function-return-type': ['error'],
    '@typescript-eslint/no-use-before-define': 0,
    'react-hooks/rules-of-hooks': 1,
    'react-hooks/exhaustive-deps': 1,
    'lines-between-class-members': ['error', 'always', { exceptAfterSingleLine: true }],
  },
  settings: {
    react: {
      version: 'detect' // Tells eslint-plugin-react to automatically detect the version of React to use
    },
  }
};
