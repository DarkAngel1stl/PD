import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./source/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        primary: '#e30613',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};

export default config;
