/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Custom Brand Colors
        'gsu-black': {
          50: '#e8eaec',
          100: '#d1d4d9',
          200: '#a3a9b3',
          300: '#757e8d',
          400: '#475367',
          500: '#1B2430', // Primary black
          600: '#161d27',
          700: '#11161d',
          800: '#0c0f14',
          900: '#06080a',
        },
        'gsu-blue': {
          50: '#e6e7f0',
          100: '#cccfe1',
          200: '#999fc3',
          300: '#666fa5',
          400: '#333f87',
          500: '#0C134F', // Primary deep blue
          600: '#0a0f3f',
          700: '#070b2f',
          800: '#050720',
          900: '#020310',
        },
        'gsu-purple': {
          50: '#ede7f5',
          100: '#dbcfeb',
          200: '#b79fd7',
          300: '#936fc3',
          400: '#6f3faf',
          500: '#471396', // Primary purple
          600: '#390f78',
          700: '#2b0b5a',
          800: '#1c073c',
          900: '#0e041e',
        },
        'gsu-lime': {
          50: '#fdfef5',
          100: '#fbfdeb',
          200: '#f7fbd7',
          300: '#f3f9c3',
          400: '#eff7af',
          500: '#BEF992', // Primary lime green
          600: '#98c775',
          700: '#729558',
          800: '#4c643a',
          900: '#26321d',
        },
        'gsu-gold': {
          50: '#fee9eb',
          100: '#fdd3d7',
          200: '#fba7af',
          300: '#f97b87',
          400: '#f74f5f',
          500: '#F7374F', // Primary red accent
          600: '#c62c3f',
          700: '#94212f',
          800: '#631620',
          900: '#310b10',
        },
        'gsu-white': {
          DEFAULT: '#F6F6F6', // Primary off-white
          50: '#ffffff',
          100: '#fefefe',
          200: '#fdfdfd',
          300: '#fbfbfb',
          400: '#f9f9f9',
          500: '#F6F6F6',
          600: '#c5c5c5',
          700: '#949494',
          800: '#626262',
          900: '#313131',
        }
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'Noto Sans', 'sans-serif'],
        heading: ['var(--font-poppins)', 'ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'Noto Sans', 'sans-serif'],
      },
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1rem' }],
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],
        'base': ['1rem', { lineHeight: '1.5rem' }],
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        '5xl': ['3rem', { lineHeight: '1' }],
        '6xl': ['3.75rem', { lineHeight: '1' }],
        '7xl': ['4.5rem', { lineHeight: '1' }],
        '8xl': ['6rem', { lineHeight: '1' }],
        '9xl': ['8rem', { lineHeight: '1' }],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      borderRadius: {
        '4xl': '2rem',
      },
      boxShadow: {
        'soft': '0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)',
        'medium': '0 4px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        'large': '0 10px 40px -10px rgba(0, 0, 0, 0.1), 0 2px 10px -2px rgba(0, 0, 0, 0.04)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'slide-down': 'slideDown 0.5s ease-out',
        'scale-in': 'scaleIn 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}