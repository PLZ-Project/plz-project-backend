import globals from 'globals';

import stylisticJs from '@stylistic/eslint-plugin-js';
import eslintPluginPrettier from 'eslint-plugin-prettier';

const settingArgs = {
  languageOptions: {
    globals: {
      ...globals.node,
      ...globals.es2021,
      ...globals.commonjs,
      ...globals.builtin.Atomics,
      ...globals.builtin.SharedArrayBuffer
    },
    parserOptions: {
      ecmaVersion: 'latest'
    }
  },

  plugins: {
    prettier: eslintPluginPrettier,
    '@stylistic/js': stylisticJs
  },
  rules: {
    'comma-dangle': 0,
    'import/order': 0,
    'no-param-reassign': 0,
    'no-nested-ternary': 0,
    'consistent-return': 0,
    'prefer-destructuring': 0,
    'no-unused-expressions': 0,
    'import/no-unresolved': 0,
    'import/prefer-default-export': 0,
    '@stylistic/js/linebreak-style': 0,
    'no-unused-vars': [
      'warn',
      {
        vars: 'all',
        args: 'after-used',
        caughtErrors: 'all',
        ignoreRestSiblings: false
      }
    ],
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto',
      }
    ],
    'eslint-plugin-import/no-extraneous-dependencies': [
      'off',
      {
        devDependencies: false,
        peerDependencies: false,
        optionalDependencies: false
      }
    ],
    'import/no-extraneous-dependencies': [
      'off',
      {
        devDependencies: ['**/*.test.js', '**/*.spec.js'],
        peerDependencies: false,
        bundledDependencies: false,
        optionalDependencies: false
      }
    ]
  }
};

export default settingArgs;
