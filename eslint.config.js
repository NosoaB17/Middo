import eslint from '@eslint/js';
import airbnbBase from 'eslint-config-airbnb-base';
import globals from 'globals';

export default [
  eslint.configs.recommended,
  {
    files: ['**/*.{js,jsx,mjs,cjs,ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.es2021,
      },
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    rules: {
      ...airbnbBase.rules,
      // General rules
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      'no-unused-vars': 'warn',
      'import/prefer-default-export': 'off',

      // Basic rules for React (no plugin needed)
      'react/jsx-uses-react': 'off',
      'react/react-in-jsx-scope': 'off',

      // Rules for comments
      'multiline-comment-style': ['warn', 'starred-block'],
      'lines-around-comment': ['warn', { beforeBlockComment: true }],

      // Rules for mobile-first development
      'no-restricted-syntax': [
        'error',
        {
          selector:
            "CallExpression[callee.object.name='window'][callee.property.name='matchMedia'] > Literal[value=/^\\(min-width:/]",
          message: 'Use max-width media queries for mobile-first approach',
        },
      ],

      // Disable import/no-extraneous-dependencies for config files
      'import/no-extraneous-dependencies': [
        'error',
        { devDependencies: ['**/*.config.js', 'vite.config.js'] },
      ],
    },
    settings: {
      'import/resolver': {
        node: {
          extensions: ['.js', '.jsx', '.ts', '.tsx'],
        },
      },
    },
  },
];
