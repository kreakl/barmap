const { createGlobPatternsForDependencies } = require('@nx/react/tailwind');
const { join } = require('path');
const { withTV } = require('tailwind-variants/transformer');


/** @type {import('tailwindcss').Config} */
module.exports = withTV({
  content: [
    join(
      __dirname,
      './src/**/*!(*.stories|*.spec).{ts,tsx,html}',
    ),
    ...createGlobPatternsForDependencies(__dirname),
  ],
  theme: {
    extend: {},
  },
  plugins: [],
});
