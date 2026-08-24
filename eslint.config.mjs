import coreWebVitals from 'eslint-config-next/core-web-vitals'
import typescript from 'eslint-config-next/typescript'

/**
 * eslint-config-next 16 ships native flat config, so the `@eslint/eslintrc`
 * FlatCompat shim the Payload template used is no longer needed — and in fact
 * crashes ("Converting circular structure to JSON") when asked to wrap it.
 */
const eslintConfig = [
  ...coreWebVitals,
  ...typescript,
  {
    rules: {
      '@typescript-eslint/ban-ts-comment': 'warn',
      '@typescript-eslint/no-empty-object-type': 'warn',
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          vars: 'all',
          args: 'after-used',
          ignoreRestSiblings: false,
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          destructuredArrayIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^(_|ignore)',
        },
      ],
    },
  },
  {
    ignores: [
      '.next/',
      'node_modules/',
      'playwright-report/',
      'test-results/',
      'src/app/(payload)/admin/importMap.js',
      'src/payload-types.ts',
      'src/payload-generated-schema.ts',
    ],
  },
]

export default eslintConfig
