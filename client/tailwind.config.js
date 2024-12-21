/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class'],
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      colors: {
        background: 'hsl(0 0% 100%)',
        foreground: 'hsl(0 0% 3.9%)',
        card: {
          DEFAULT: 'hsl(0 0% 100%)',
          foreground: 'hsl(0 0% 3.9%)',
        },
        popover: {
          DEFAULT: 'hsl(0 0% 100%)',
          foreground: 'hsl(0 0% 3.9%)',
        },
        // dành cho text
        primary: {
          DEFAULT: '#F9AFD7',
          foreground: '#FFE1FF',
        },
        // dành cho các button hoặc link, các đường dẫn
        secondary: {
          DEFAULT: '#7E60BF',
          foreground: '#433878', //khi hover
        },
        muted: {
          DEFAULT: 'hsl(0 0% 96.1%)',
          foreground: 'hsl(0 0% 45.1%)',
        },
        accent: {
          DEFAULT: 'hsl(0 0% 96.1%)',
          foreground: 'hsl(0 0% 9%)',
        },
        destructive: {
          DEFAULT: 'hsl(0 84.2% 60.2%)',
          foreground: 'hsl(0 0% 98%)',
        },
        border: 'hsl(0 0% 89.8%)',
        input: 'hsl(0 0% 89.8%)',
        ring: 'hsl(0 0% 3.9%)',
        chart: {
          1: 'hsl(12 76% 61%)',
          2: 'hsl(173 58% 39%)',
          3: 'hsl(197 37% 24%)',
          4: 'hsl(43 74% 66%)',
          5: 'hsl(27 87% 67%)',
        },
      },
      fontFamily: {
        sans: ['YourCustomFont', 'sans-serif'],
        serif: ['YourCustomFontSerif', 'serif'],
        mono: ['YourCustomFontMono', 'monospace'],
      },
      keyframes: {
        'accordion-down': {
          from: {
            height: '0',
          },
          to: {
            height: 'var(--radix-accordion-content-height)',
          },
        },
        'accordion-up': {
          from: {
            height: 'var(--radix-accordion-content-height)',
          },
          to: {
            height: '0',
          },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
      width: {
        112: '28rem', // 448px
        144: '36rem', // 576px
        192: '48rem', // 768px
      },
      height: {
        'screen-plus': '150vh',
      },
    },
  },
  plugins: [import('tailwindcss-animate')],
};
