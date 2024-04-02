const { NxWebpackPlugin } = require('@nx/webpack');
const { join } = require('path');

module.exports = {
  output: {
    path: join(__dirname, '../../../dist/apps/backend/bar-catalogue'),
  },
  plugins: [
    new NxWebpackPlugin({
      target: 'node',
      compiler: 'tsc',
      main: './src/main.ts',
      tsConfig: './tsconfig.app.json',
      optimization: false,
      sourceMap: true,
      outputHashing: 'none',
      transformers: [
        {
          name: '@nestjs/graphql/plugin',
          options: ['.entity.ts', '.value-object.ts', '.dto.ts', '.args.ts'],
        },
      ],
    }),
  ],
};
