// eslint-disable-next-line no-undef
const config = require('tailwindcss/defaultTheme')

// eslint-disable-next-line no-undef
module.exports = {
  content: ['./components/**/*.js', './pages/**/*.js'],
  theme: {
    extend: {
      fontFamily: {
        sans: 'Mulish',
        sansserif: 'Montserrat, sans-serif',
      },
      colors: {
        gray: {
          ...config.colors.gray,
          90: '#F0F0FA',
          100: '#C4C4C4',
          200: '#F4F4F4',
          300: '#FFEEE9',
          400: '#E8E3E3',
          600: '#928983',
        },
        blue: {
          ...config.colors.blue,
          100: '#C4C4C4',
        },
        red: {
          ...config.colors.red,
          500: '#E34337',
        },
        orange: {
          ...config.colors.orange,
          500: '#F37202',
        },
        pink: {
          ...config.colors.pink,
          500: '#E3366B',
        },
      },
    },
  },
  corePlugins: {
    container: false,
  },
  plugins: [
    // eslint-disable-next-line no-undef
    require('tailwind-bootstrap-grid')({
      gridGutterWidth: '32px',
      containerMaxWidths: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1280px',
      },
    }),
    // eslint-disable-next-line no-undef
    require('tailwindcss-debug-screens'),
  ],
}
