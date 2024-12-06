/** @type {import('tailwindcss').Config} */

const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    fontFamily: {
      sans: ['var(--font-main)'],
      serif: ['Garamond', 'serif'],
      mono: ['Courier New', 'monospace'],
    },
    screens: {
      all: '1px',
      xs: '480px',
      ...defaultTheme.screens,
    },
    extend: {
      colors: {
        black: '#010101',
        white: '#ffffff',
        gray: {
          50: '#ffffff',
          100: '#f8fafb',
          150: '#f5f8fa',
          200: '#eef3f6',
          250: '#dee7ed',
          300: '#cddae4',
          350: '#bdcedb',
          400: '#acc2d2',
          450: '#9cb6c9',
          500: '#8ba9c1',
          550: '#7a9db8',
          600: '#6a91af',
          650: '#5985a6',
          700: '#507795',
          750: '#476a85',
          800: '#3e5d74',
          850: '#365063',
          900: '#2d4253',
          950: '#243542',
          1000: '#1b2832',
          1050: '#121b21',
        },
        primary: {
          50: '#ffeff2',
          100: '#ffe0e7',
          200: '#ffc6d6',
          300: '#ff97b3',
          400: '#ff5d8c',
          500: '#ff246a',
          600: '#fe005b',
          700: '#d7004d',
          800: '#b40049',
          900: '#990245',
          950: '#570020',
        },
        red: {
          400: '#f5bcbc',
          500: '#ef8f8f',
          600: '#e96363',
          700: '#e23636',
        },
        green: {
          400: '#c3efce',
          500: '#9be4ad',
          600: '#6bd686',
          700: '#47cd68',
          800: '#31b452',
        },
      },
      fontSize: {
        xxs: '0.7rem',
        xs: '0.775rem',
        sm: '0.85rem',
        md: '0.95rem',
      },
      spacing: {
        88: '22rem',
        100: '26rem',
        112: '28rem',
        128: '32rem',
        144: '36rem',
      },
      borderRadius: {
        none: '0',
        sm: '0.20rem',
        DEFAULT: '0.30rem',
        md: '0.40rem',
        lg: '0.50rem',
        full: '9999px',
      },
      blur: {
        xs: '3px',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite;',
      },
      transitionProperty: {
        height: 'height, max-height',
        spacing: 'margin, padding',
      },
      maxWidth: {
        'xl-1': '39.5rem',
      },
    },
  },
  plugins: [],
};
