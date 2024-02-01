module.exports = {
  parser: '@typescript-eslint/parser', // Define o parser do ESLint para TypeScript
  extends: [
    'airbnb-typescript/base', // Usa as regras do Airbnb para TypeScript
    'plugin:@typescript-eslint/recommended', // Usa as recomendações do plugin @typescript-eslint/eslint-plugin
    'plugin:prettier/recommended', // Ativa as recomendações do ESLint plugin para Prettier
  ],
  parserOptions: {
    project: './tsconfig.json', // Especifica o arquivo de configuração do TypeScript
  },
  rules: {
    'no-console': 0,
    'import/no-extraneous-dependencies': 0,
    'import/extensions': 0,
    '@typescript-eslint/naming-convention': 0,
    'prettier/prettier': 0,
    '@typescript-eslint/no-explicit-any': 0,
    '@typescript-eslint/no-unused-vars': 0,
    '@typescript-eslint/no-unused-expressions': 0,
    'prefer-const': 0,
  },
};
