const colors = require('tailwindcss/colors')
var flattenColorPalette = require('tailwindcss/lib/util/flattenColorPalette').default;


module.exports = {
  mode: 'jit', // ← OJO
  purge: [ // ← OJO
    './index.html',
    './resources/**/*.html',
    './resources/**/*.js'
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      sans: ['Graphik', 'sans-serif'],
      serif: ['Merriweather', 'serif'],
      mi: ['Arial', 'Helvetica', 'sans-serif'],
    },
    extend: { // https://tailwindcss.com/docs/customizing-colors#color-palette-reference
      colors: {
        teal: colors.teal, 
        'light-blue': colors.lightBlue,
        'orange': colors.orange,
        gray: {
          light: 'var(--gray-light)',
          DEFAULT: 'var(--gray-default)',
          dark: 'var(--gray-dark)'
        },
        primary: {
          light: 'var(--primary-light)',
          DEFAULT: 'var(--primary-default)',
          dark: 'var(--primary-dark)'
        },
        secondary: {
          light: 'var(--secondary-light)',
          DEFAULT: 'var(--secondary-default)',
          dark: 'var(--secondary-dark)'
        },
        success: {
          light: 'var(--success-light)',
          DEFAULT: 'var(--success-default)',
          dark: 'var(--success-dark)'
        },
        info: {
          light: 'var(--info-light)',
          DEFAULT: 'var(--info-default)',
          dark: 'var(--info-dark)'
        },
        warning: {
          light: 'var(--warning-light)',
          DEFAULT: 'var(--warning-default)',
          dark: 'var(--warning-dark)'
        },
        danger: {
          light: 'var(--danger-light)',
          DEFAULT: 'var(--danger-default)',
          dark: 'var(--danger-dark)'
        },
        mi: {
          DEFAULT: 'var(--mi-default)',
          light: 'var(--mi-light)',
          dark: 'var(--mi-dark)',
          middle: 'var(--mi-middle)',
          form: 'var(--mi-form)',
          btnCancel: 'var(--mi-btnCancel)',
          letraNav: 'var(--letra-nav)',
          borderBottom: 'var(--border-bottom)',
          menuDesplega: 'var(--menu-desplega)',
          menuOver: 'var(--menu-over)',
          letra: 'var(--mi-letra)',
          formEdge: 'var(--mi-formEdge)',
          letraLabel: 'var(--color-label)',
          letraCancel: 'var(--letra-cancel)',

        }
        
      }
    }
  },
  variants: {
    extend: {},
  },
  plugins: [
    ({ addUtilities, e, theme, variants }) => {
        let colors = flattenColorPalette(theme('borderColor'));
        delete colors['default'];

        // Replace or Add custom colors
        if(this.theme?.extend?.colors !== undefined){
            colors = Object.assign(colors, this.theme.extend.colors);
        }

        const colorMap = Object.keys(colors)
            .map(color => ({
                [`.border-t-${color}`]: {borderTopColor: colors[color]},
                [`.border-r-${color}`]: {borderRightColor: colors[color]},
                [`.border-b-${color}`]: {borderBottomColor: colors[color]},
                [`.border-l-${color}`]: {borderLeftColor: colors[color]},
            }));
        const utilities = Object.assign({}, ...colorMap);

        addUtilities(utilities, variants('borderColor'));
    },
]
}