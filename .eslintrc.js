module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: [
      './http-api-gateway/tsconfig.json',
      './users-microservice/tsconfig.json',
      './products-microservice/tsconfig.json',
      './orders-microservice/tsconfig.json',
      './payments-microservice/tsconfig.json',
      './inventory-microservice/tsconfig.json',
      './notifications-microservice/tsconfig.json',
      './files-upload-microservice/tsconfig.json',
      './email-sms-microservice/tsconfig.json',
    ],
    tsconfigRootDir: __dirname,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint/eslint-plugin'],
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  root: true,
  env: {
    node: true,
    jest: true,
    es2021: true,
  },
  ignorePatterns: [
    '.eslintrc.js',
    'dist/',
    'node_modules/',
    '*.js',
    'prisma/migrations/',
    'coverage/',
    'build/',
  ],
  rules: {
    // TypeScript rules
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'warn',
    '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    '@typescript-eslint/no-inferrable-types': 'off',
  },
  overrides: [
    {
      files: ['*.spec.ts', '*.test.ts'],
      rules: {
        '@typescript-eslint/no-explicit-any': 'off',
        'no-console': 'off',
      },
    },
  ],
};
