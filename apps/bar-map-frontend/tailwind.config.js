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
    extend: {
      screens: {
        '2xl': '1536px',
        '3xl': '1920px',
        '4xl': '2560px',
        // => @media (min-width: 1536px) { ... }
      },
    },
  },
  plugins: [],
});
