/* eslint-env node */
module.exports = {
  root: true,
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    'plugin:vue/recommended',
    'airbnb-base',
    'plugin:jest/recommended',
  ],
  parserOptions: {
    parser: '@babel/eslint-parser',
    sourceType: 'module',
  },
  settings: {
    'import/resolver': {
      node: {
        paths: ['src'],
      },
      alias: {
        map: [
          ['@', './src'],
        ],
        extensions: ['.js', '.vue'],
      },
    },
  },
  plugins: [
    'jest',
  ],
  overrides: [
    {
      files: [
        'cypress/e2e/**.{cy,spec}.{js,ts,jsx,tsx}',
      ],
      extends: [
        'plugin:cypress/recommended',
      ],
    },
  ],
};
